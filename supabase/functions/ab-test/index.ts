// Supabase Edge Function: ab-test
// Manages A/B testing for email subject lines
// Includes: create test, send test emails, track opens, determine winner

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const BROADCAST_SECRET = Deno.env.get("BROADCAST_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateTestRequest {
  name: string;
  variants: Array<{
    name: string;
    subject_line: string;
    preview_text?: string;
  }>;
  test_percentage?: number;
  min_sample_size?: number;
  auto_send_winner?: boolean;
}

interface SendTestRequest {
  test_id: string;
  html: string;
  text?: string;
  secret: string;
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<{ id: string }> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "AI Prod Weekly <hello@aiprodweekly.com>",
      to: [to],
      subject,
      html,
      text: text || "",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return response.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Action: Create a new A/B test
    if (action === "create" && req.method === "POST") {
      const body: CreateTestRequest = await req.json();

      if (!body.name || !body.variants || body.variants.length < 2) {
        throw new Error("Must provide name and at least 2 variants");
      }

      // Create the test
      const { data: test, error: testError } = await supabase
        .from("ab_tests")
        .insert({
          name: body.name,
          test_percentage: body.test_percentage || 20,
          min_sample_size: body.min_sample_size || 100,
          auto_send_winner: body.auto_send_winner ?? true,
        })
        .select()
        .single();

      if (testError) throw new Error(`Failed to create test: ${testError.message}`);

      // Create variants
      const variants = body.variants.map((v) => ({
        test_id: test.id,
        name: v.name,
        subject_line: v.subject_line,
        preview_text: v.preview_text,
      }));

      const { data: createdVariants, error: variantError } = await supabase
        .from("ab_test_variants")
        .insert(variants)
        .select();

      if (variantError) throw new Error(`Failed to create variants: ${variantError.message}`);

      return new Response(
        JSON.stringify({
          success: true,
          test: {
            ...test,
            variants: createdVariants,
          },
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Action: Send test emails
    if (action === "send" && req.method === "POST") {
      const body: SendTestRequest = await req.json();

      if (body.secret !== BROADCAST_SECRET) {
        throw new Error("Invalid broadcast secret");
      }

      if (!body.test_id || !body.html) {
        throw new Error("Must provide test_id and html");
      }

      // Get test and variants
      const { data: test, error: testError } = await supabase
        .from("ab_tests")
        .select("*, variants:ab_test_variants(*)")
        .eq("id", body.test_id)
        .single();

      if (testError) throw new Error(`Test not found: ${testError.message}`);
      if (test.status !== "draft") throw new Error("Test already running or completed");

      // Get active subscribers
      const { data: subscribers, error: subError } = await supabase
        .from("newsletter_subscribers")
        .select("id, email")
        .eq("status", "active");

      if (subError) throw new Error(`Failed to fetch subscribers: ${subError.message}`);
      if (!subscribers?.length) throw new Error("No active subscribers");

      // Calculate test sample size
      const testPercentage = test.test_percentage / 100;
      const testSampleSize = Math.floor(subscribers.length * testPercentage);
      const variantCount = test.variants.length;
      const perVariantSize = Math.floor(testSampleSize / variantCount);

      // Shuffle and assign subscribers to variants
      const shuffled = [...subscribers].sort(() => Math.random() - 0.5);
      const assignments: Array<{
        test_id: string;
        variant_id: string;
        subscriber_id: string;
        email: string;
        subject: string;
      }> = [];

      test.variants.forEach((variant: { id: string; subject_line: string }, index: number) => {
        const start = index * perVariantSize;
        const end = index === variantCount - 1 ? testSampleSize : start + perVariantSize;
        const variantSubscribers = shuffled.slice(start, end);

        variantSubscribers.forEach((sub) => {
          assignments.push({
            test_id: test.id,
            variant_id: variant.id,
            subscriber_id: sub.id,
            email: sub.email,
            subject: variant.subject_line,
          });
        });
      });

      // Update test status
      await supabase
        .from("ab_tests")
        .update({ status: "running" })
        .eq("id", test.id);

      // Insert assignments and send emails
      const BATCH_SIZE = 10;
      const BATCH_DELAY = 1100;
      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < assignments.length; i += BATCH_SIZE) {
        const batch = assignments.slice(i, i + BATCH_SIZE);

        await Promise.all(
          batch.map(async (assignment) => {
            try {
              // Add tracking pixel to HTML
              const trackingPixel = `<img src="${SUPABASE_URL}/functions/v1/ab-test?action=track&tid=${test.id}&vid=${assignment.variant_id}&sid=${assignment.subscriber_id}" width="1" height="1" style="display:none" />`;
              const htmlWithTracking = body.html.replace("</body>", `${trackingPixel}</body>`);

              // Send email
              await sendEmail(assignment.email, assignment.subject, htmlWithTracking, body.text);

              // Record assignment
              await supabase.from("ab_test_assignments").insert({
                test_id: assignment.test_id,
                variant_id: assignment.variant_id,
                subscriber_id: assignment.subscriber_id,
              });

              successCount++;
            } catch (error) {
              console.error(`Failed to send to ${assignment.email}:`, error);
              failCount++;
            }
          })
        );

        if (i + BATCH_SIZE < assignments.length) {
          await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          test_id: test.id,
          total_test_subscribers: testSampleSize,
          variants_count: variantCount,
          per_variant: perVariantSize,
          sent: successCount,
          failed: failCount,
          remaining_subscribers: subscribers.length - testSampleSize,
          message: "Test emails sent. Monitor results and call 'winner' action when ready.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Action: Track email open (via pixel)
    if (action === "track" && req.method === "GET") {
      const testId = url.searchParams.get("tid");
      const variantId = url.searchParams.get("vid");
      const subscriberId = url.searchParams.get("sid");

      if (testId && variantId && subscriberId) {
        // Update assignment with open timestamp
        await supabase
          .from("ab_test_assignments")
          .update({ opened_at: new Date().toISOString() })
          .eq("test_id", testId)
          .eq("variant_id", variantId)
          .eq("subscriber_id", subscriberId)
          .is("opened_at", null); // Only update if not already opened
      }

      // Return 1x1 transparent GIF
      const gif = Uint8Array.from([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
        0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00,
        0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
        0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b,
      ]);

      return new Response(gif, {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    // Action: Get test results
    if (action === "results" && req.method === "GET") {
      const testId = url.searchParams.get("test_id");
      if (!testId) throw new Error("test_id required");

      const { data: results, error } = await supabase.rpc("get_ab_test_results", {
        p_test_id: testId,
      });

      if (error) throw new Error(`Failed to get results: ${error.message}`);

      const { data: test } = await supabase
        .from("ab_tests")
        .select("*")
        .eq("id", testId)
        .single();

      return new Response(
        JSON.stringify({
          success: true,
          test,
          results,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Action: Determine winner and optionally send to remaining subscribers
    if (action === "winner" && req.method === "POST") {
      const body = await req.json();
      const { test_id, secret, send_to_remaining, html, text } = body;

      if (secret !== BROADCAST_SECRET) {
        throw new Error("Invalid broadcast secret");
      }

      // Determine winner using database function
      const { data: winnerId, error: winnerError } = await supabase.rpc(
        "determine_ab_winner",
        { p_test_id: test_id }
      );

      if (winnerError) throw new Error(`Failed to determine winner: ${winnerError.message}`);

      // Get winner details
      const { data: winner } = await supabase
        .from("ab_test_variants")
        .select("*")
        .eq("id", winnerId)
        .single();

      const result: {
        success: boolean;
        winner: typeof winner;
        remaining_sent?: number;
      } = {
        success: true,
        winner,
      };

      // Optionally send winner to remaining subscribers
      if (send_to_remaining && html) {
        // Get subscribers who weren't in the test
        const { data: testedIds } = await supabase
          .from("ab_test_assignments")
          .select("subscriber_id")
          .eq("test_id", test_id);

        const testedIdSet = new Set(testedIds?.map((t) => t.subscriber_id) || []);

        const { data: remaining } = await supabase
          .from("newsletter_subscribers")
          .select("id, email")
          .eq("status", "active");

        const remainingSubscribers = remaining?.filter(
          (s) => !testedIdSet.has(s.id)
        ) || [];

        // Send to remaining with winning subject
        let sentCount = 0;
        const BATCH_SIZE = 10;
        const BATCH_DELAY = 1100;

        for (let i = 0; i < remainingSubscribers.length; i += BATCH_SIZE) {
          const batch = remainingSubscribers.slice(i, i + BATCH_SIZE);

          await Promise.all(
            batch.map(async (sub) => {
              try {
                await sendEmail(sub.email, winner.subject_line, html, text);
                sentCount++;
              } catch (error) {
                console.error(`Failed to send to ${sub.email}:`, error);
              }
            })
          );

          if (i + BATCH_SIZE < remainingSubscribers.length) {
            await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
          }
        }

        result.remaining_sent = sentCount;
      }

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    throw new Error(`Unknown action: ${action}. Use: create, send, track, results, winner`);
  } catch (error) {
    console.error("A/B Test error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
