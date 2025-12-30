// Supabase Edge Function: welcome-sequence
// Triggers welcome email sequence for new subscribers

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Welcome email content
const WELCOME_EMAIL = {
  subject: "Welcome to AI Prod Weekly",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 24px; margin-bottom: 20px; }
    p { margin-bottom: 16px; }
    .highlight { background: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Welcome to AI Prod Weekly</h1>

  <p>Hey!</p>

  <p>Thanks for subscribing. You're now part of a growing community of consultants and knowledge workers who are using AI to work smarter, not harder.</p>

  <div class="highlight">
    <strong>What to expect:</strong><br>
    Every Thursday, you'll get one actionable AI automation you can implement in 30 minutes or less. No fluff, no theory — just practical stuff that saves time.
  </div>

  <p><strong>Before your first issue arrives, I have a quick question:</strong></p>

  <p>What's the ONE task that eats up the most of your time each week?</p>

  <p>Just hit reply and tell me. I read every response, and it helps me write content that actually matters to you.</p>

  <p>Talk soon,<br>
  Steve</p>

  <p>P.S. Your first full issue lands Thursday. It covers Gmail triage — the automation I recommend everyone start with.</p>

  <div class="footer">
    <p>AI Prod Weekly<br>
    You're receiving this because you signed up at aiprodweekly.com</p>
  </div>
</body>
</html>
  `,
  text: `Welcome to AI Prod Weekly

Hey!

Thanks for subscribing. You're now part of a growing community of consultants and knowledge workers who are using AI to work smarter, not harder.

What to expect:
Every Thursday, you'll get one actionable AI automation you can implement in 30 minutes or less. No fluff, no theory — just practical stuff that saves time.

Before your first issue arrives, I have a quick question:

What's the ONE task that eats up the most of your time each week?

Just hit reply and tell me. I read every response, and it helps me write content that actually matters to you.

Talk soon,
Steve

P.S. Your first full issue lands Thursday. It covers Gmail triage — the automation I recommend everyone start with.

---
AI Prod Weekly
You're receiving this because you signed up at aiprodweekly.com
  `,
};

async function sendEmail(to: string, subject: string, html: string, text: string) {
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
      text,
    }),
  });

  return response.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const { email, subscriber_id } = await req.json();

    if (!email) {
      throw new Error("Missing email address");
    }

    // Send welcome email immediately
    const result = await sendEmail(
      email,
      WELCOME_EMAIL.subject,
      WELCOME_EMAIL.html,
      WELCOME_EMAIL.text
    );

    // Update subscriber record with welcome_sent timestamp
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && subscriber_id) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      await supabase
        .from("newsletter_subscribers")
        .update({ welcome_sent_at: new Date().toISOString() })
        .eq("id", subscriber_id);
    }

    return new Response(
      JSON.stringify({ success: true, email_id: result.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
