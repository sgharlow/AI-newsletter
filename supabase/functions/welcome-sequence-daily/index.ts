// Supabase Edge Function: welcome-sequence-daily
// Handles Days 2, 4, 6, 7 of the welcome email sequence
// Called by pg_cron job via process_welcome_sequence()

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email templates for each day
const SEQUENCE_EMAILS: Record<number, { subject: string; html: string; text: string }> = {
  2: {
    subject: "Quick tip: Start with email triage",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 20px; }
    .tip-box { background: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Day 2: The quickest AI win</h1>

  <p>Here's the automation I recommend everyone start with:</p>

  <div class="tip-box">
    <strong>Email Triage Classifier</strong><br>
    Paste your unread email subjects into ChatGPT/Claude with this prompt:<br><br>
    <em>"Categorize each as: Act Now / Respond Today / This Week / Archive. Be ruthless."</em>
  </div>

  <p>Takes 2 minutes. Saves 20 minutes of inbox anxiety.</p>

  <p>Thursday's full issue goes deeper into this. Stay tuned.</p>

  <p>— Steve</p>

  <div class="footer">
    <a href="{{unsubscribe_url}}">Unsubscribe</a> | AI Prod Weekly
  </div>
</body>
</html>
    `,
    text: `Day 2: The quickest AI win

Here's the automation I recommend everyone start with:

Email Triage Classifier
Paste your unread email subjects into ChatGPT/Claude with this prompt:
"Categorize each as: Act Now / Respond Today / This Week / Archive. Be ruthless."

Takes 2 minutes. Saves 20 minutes of inbox anxiety.

Thursday's full issue goes deeper into this. Stay tuned.

— Steve

---
Unsubscribe: {{unsubscribe_url}}
AI Prod Weekly`,
  },

  4: {
    subject: "3 AI prompts that actually work",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 20px; }
    h3 { margin-top: 24px; margin-bottom: 8px; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <h1>3 prompts I use every day</h1>

  <p>No fluff. Just copy-paste these:</p>

  <h3>1. Meeting Prep (2 min before any call)</h3>
  <p><code>"I'm meeting with [name] about [topic]. Give me 3 smart questions to ask and 2 potential objections to prepare for."</code></p>

  <h3>2. Quick Summary (for long docs/emails)</h3>
  <p><code>"Summarize this in 3 bullets: what they want, what they're really asking, and the risk if I ignore it."</code></p>

  <h3>3. Reply Draft (for tricky emails)</h3>
  <p><code>"Write a reply that's professional, brief, and leaves the door open for [outcome I want]."</code></p>

  <p>Simple beats clever. Every time.</p>

  <p>— Steve</p>

  <div class="footer">
    <a href="{{unsubscribe_url}}">Unsubscribe</a> | AI Prod Weekly
  </div>
</body>
</html>
    `,
    text: `3 prompts I use every day

No fluff. Just copy-paste these:

1. Meeting Prep (2 min before any call)
"I'm meeting with [name] about [topic]. Give me 3 smart questions to ask and 2 potential objections to prepare for."

2. Quick Summary (for long docs/emails)
"Summarize this in 3 bullets: what they want, what they're really asking, and the risk if I ignore it."

3. Reply Draft (for tricky emails)
"Write a reply that's professional, brief, and leaves the door open for [outcome I want]."

Simple beats clever. Every time.

— Steve

---
Unsubscribe: {{unsubscribe_url}}
AI Prod Weekly`,
  },

  6: {
    subject: "How's it going?",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 20px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Quick check-in</h1>

  <p>You've been subscribed for almost a week now.</p>

  <p>Curious: Have you tried any of the AI tips I've shared?</p>

  <p>If yes — what worked? What didn't?</p>

  <p>If no — what's holding you back?</p>

  <p>Hit reply. I read every response and it genuinely helps me write better content.</p>

  <p>Thursday's issue is a good one. It covers the #1 automation request I get.</p>

  <p>— Steve</p>

  <div class="footer">
    <a href="{{unsubscribe_url}}">Unsubscribe</a> | AI Prod Weekly
  </div>
</body>
</html>
    `,
    text: `Quick check-in

You've been subscribed for almost a week now.

Curious: Have you tried any of the AI tips I've shared?

If yes — what worked? What didn't?

If no — what's holding you back?

Hit reply. I read every response and it genuinely helps me write better content.

Thursday's issue is a good one. It covers the #1 automation request I get.

— Steve

---
Unsubscribe: {{unsubscribe_url}}
AI Prod Weekly`,
  },

  7: {
    subject: "Week 1 complete — here's what's next",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 20px; }
    .highlight { background: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <h1>You made it through Week 1</h1>

  <p>Most newsletter subscribers drop off after 3 days. You're still here.</p>

  <p>That means you're serious about using AI to work smarter.</p>

  <div class="highlight">
    <strong>What's coming:</strong><br>
    Every Thursday, you'll get one practical AI automation. No theory, no hype — just stuff you can implement that week.
  </div>

  <p><strong>Quick favor:</strong></p>

  <p>If you've found any value in these emails, would you forward this to one colleague who'd benefit?</p>

  <p>Word of mouth is how this newsletter grows, and I'd really appreciate it.</p>

  <p>See you Thursday.</p>

  <p>— Steve</p>

  <div class="footer">
    <a href="{{unsubscribe_url}}">Unsubscribe</a> | AI Prod Weekly
  </div>
</body>
</html>
    `,
    text: `You made it through Week 1

Most newsletter subscribers drop off after 3 days. You're still here.

That means you're serious about using AI to work smarter.

What's coming:
Every Thursday, you'll get one practical AI automation. No theory, no hype — just stuff you can implement that week.

Quick favor:

If you've found any value in these emails, would you forward this to one colleague who'd benefit?

Word of mouth is how this newsletter grows, and I'd really appreciate it.

See you Thursday.

— Steve

---
Unsubscribe: {{unsubscribe_url}}
AI Prod Weekly`,
  },
};

async function sendEmail(to: string, subject: string, html: string, text: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Steve at AI Prod Weekly <hello@aiprodweekly.com>",
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

    const { email, subscriber_id, sequence_day } = await req.json();

    if (!email || !sequence_day) {
      throw new Error("Missing email or sequence_day");
    }

    const template = SEQUENCE_EMAILS[sequence_day];
    if (!template) {
      throw new Error(`Invalid sequence_day: ${sequence_day}`);
    }

    // Generate unsubscribe URL (replace placeholder)
    const unsubscribeUrl = `https://aiprodweekly.com/unsubscribe?id=${subscriber_id}`;
    const html = template.html.replace(/{{unsubscribe_url}}/g, unsubscribeUrl);
    const text = template.text.replace(/{{unsubscribe_url}}/g, unsubscribeUrl);

    // Send the email
    const result = await sendEmail(email, template.subject, html, text);

    // Update subscriber record
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && subscriber_id) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const columnName = `sequence_day_${sequence_day}_sent_at`;
      await supabase
        .from("newsletter_subscribers")
        .update({ [columnName]: new Date().toISOString() })
        .eq("id", subscriber_id);
    }

    return new Response(
      JSON.stringify({ success: true, email_id: result.id, day: sequence_day }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Welcome sequence error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
