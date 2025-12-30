// Supabase Edge Function: broadcast
// Sends weekly newsletter to all active subscribers
// Trigger: Manual call or scheduled via pg_cron

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { renderTemplate, getTemplateNames, TemplateVariables } from "./templates.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const BROADCAST_SECRET = Deno.env.get("BROADCAST_SECRET"); // Prevents unauthorized sends

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-broadcast-secret",
};

interface BroadcastRequest {
  subject: string;
  html?: string; // Raw HTML (optional if using template)
  template?: string; // Template name: weekly_issue, announcement, notification, digest
  variables?: TemplateVariables; // Variables to pass to template
  text?: string;
  test_email?: string; // If provided, only send to this email (for testing)
  source_filter?: string; // Optional: only send to subscribers from this source
  secret?: string; // Required for non-test sends
}

interface SendResult {
  email: string;
  success: boolean;
  error?: string;
}

async function sendEmail(to: string, subject: string, html: string, text?: string) {
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

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    const body: BroadcastRequest = await req.json();
    const { subject, html, template, variables, text, test_email, source_filter, secret } = body;

    if (!subject) {
      throw new Error("Missing required field: subject");
    }

    if (!html && !template) {
      throw new Error("Must provide either 'html' or 'template'. Available templates: " + getTemplateNames().join(", "));
    }

    // Render template if specified, otherwise use raw HTML
    let emailHtml: string;
    if (template) {
      try {
        emailHtml = renderTemplate(template, variables || {});
      } catch (error) {
        throw new Error(`Template error: ${error.message}`);
      }
    } else {
      emailHtml = html!;
    }

    // Security check: require secret for non-test sends
    if (!test_email && secret !== BROADCAST_SECRET) {
      throw new Error("Invalid or missing broadcast secret");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Test mode: send to single email
    if (test_email) {
      // Replace subscriber_id placeholder for test
      const testHtml = emailHtml.replace(/{{subscriber_id}}/g, "test-subscriber-id");
      const result = await sendEmail(test_email, `[TEST] ${subject}`, testHtml, text);
      return new Response(
        JSON.stringify({
          success: true,
          mode: "test",
          sent_to: test_email,
          email_id: result.id,
          template_used: template || null,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Fetch all active subscribers
    let query = supabase
      .from("newsletter_subscribers")
      .select("id, email")
      .eq("status", "active");

    if (source_filter) {
      query = query.eq("source", source_filter);
    }

    const { data: subscribers, error: fetchError } = await query;

    if (fetchError) {
      throw new Error(`Failed to fetch subscribers: ${fetchError.message}`);
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          mode: "broadcast",
          sent: 0,
          message: "No active subscribers found",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Send to all subscribers with rate limiting
    const results: SendResult[] = [];
    const BATCH_SIZE = 10; // Resend rate limit: 10 emails/second on free tier
    const BATCH_DELAY = 1100; // ms between batches

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(async (subscriber) => {
        try {
          // Replace subscriber_id placeholder and legacy unsubscribe_url
          const unsubscribeUrl = `https://aiprodweekly.com/api/unsubscribe?id=${subscriber.id}`;
          let personalizedHtml = emailHtml
            .replace(/{{subscriber_id}}/g, subscriber.id)
            .replace(/{{unsubscribe_url}}/g, unsubscribeUrl);

          await sendEmail(subscriber.email, subject, personalizedHtml, text);
          return { email: subscriber.email, success: true };
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          return {
            email: subscriber.email,
            success: false,
            error: error.message,
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Rate limit between batches
      if (i + BATCH_SIZE < subscribers.length) {
        await delay(BATCH_DELAY);
      }
    }

    // Log broadcast to database
    await supabase.from("newsletter_broadcasts").insert({
      subject,
      sent_count: results.filter((r) => r.success).length,
      failed_count: results.filter((r) => !r.success).length,
      source_filter: source_filter || null,
      template_used: template || null,
    });

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return new Response(
      JSON.stringify({
        success: true,
        mode: "broadcast",
        template_used: template || null,
        total_subscribers: subscribers.length,
        sent: successful.length,
        failed: failed.length,
        failures: failed.length > 0 ? failed : undefined,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Broadcast error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
