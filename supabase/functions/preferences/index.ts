// Supabase Edge Function: preferences
// Manages subscriber email preferences (frequency, topics, etc.)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

interface Preferences {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  topics: string[];
  digest_format: 'full' | 'summary';
  pause_until: string | null;
}

// Preference center HTML page
function getPreferencesPage(subscriber: any, preferences: Preferences) {
  const topicOptions = [
    { value: 'automation', label: 'Automation Workflows' },
    { value: 'ai-tools', label: 'AI Tools & Tips' },
    { value: 'productivity', label: 'Productivity Systems' },
    { value: 'case-studies', label: 'Case Studies' },
    { value: 'tutorials', label: 'Step-by-Step Tutorials' },
  ];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Preferences - AI Prod Weekly</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #1a1a1a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 520px;
      width: 100%;
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      overflow: hidden;
    }
    .header {
      background: #1a1a1a;
      color: white;
      padding: 24px;
      text-align: center;
    }
    .header h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .header p { color: #a0a0a0; font-size: 0.875rem; }
    .content { padding: 32px; }
    .email-display {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      font-size: 0.875rem;
      color: #666;
    }
    .section { margin-bottom: 28px; }
    .section-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: #333;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .radio-group, .checkbox-group { display: flex; flex-direction: column; gap: 10px; }
    .radio-option, .checkbox-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: #fafafa;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .radio-option:hover, .checkbox-option:hover { background: #f0f0f0; }
    input[type="radio"], input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #2563eb;
    }
    .option-label { flex: 1; }
    .option-title { font-weight: 500; color: #333; }
    .option-desc { font-size: 0.75rem; color: #888; margin-top: 2px; }
    .btn {
      width: 100%;
      padding: 14px 24px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover { background: #1d4ed8; }
    .btn:disabled { background: #94a3b8; cursor: not-allowed; }
    .pause-section {
      background: #fef3c7;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .pause-title { color: #92400e; font-weight: 600; font-size: 0.875rem; margin-bottom: 8px; }
    .pause-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #fbbf24;
      border-radius: 6px;
      font-size: 0.875rem;
    }
    .success-message {
      background: #d1fae5;
      color: #065f46;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      display: none;
    }
    .footer {
      text-align: center;
      padding: 16px;
      background: #fafafa;
      font-size: 0.75rem;
      color: #888;
    }
    .footer a { color: #2563eb; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Preferences</h1>
      <p>Customize how you receive AI Prod Weekly</p>
    </div>
    <form id="preferencesForm" class="content">
      <div class="success-message" id="successMessage">
        Your preferences have been saved!
      </div>

      <div class="email-display">
        Managing preferences for: <strong>${subscriber.email}</strong>
      </div>

      <div class="section">
        <div class="section-title">Email Frequency</div>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" name="frequency" value="weekly" ${preferences.frequency === 'weekly' ? 'checked' : ''}>
            <div class="option-label">
              <div class="option-title">Weekly</div>
              <div class="option-desc">Get every issue as it's published</div>
            </div>
          </label>
          <label class="radio-option">
            <input type="radio" name="frequency" value="biweekly" ${preferences.frequency === 'biweekly' ? 'checked' : ''}>
            <div class="option-label">
              <div class="option-title">Bi-weekly</div>
              <div class="option-desc">Receive every other issue</div>
            </div>
          </label>
          <label class="radio-option">
            <input type="radio" name="frequency" value="monthly" ${preferences.frequency === 'monthly' ? 'checked' : ''}>
            <div class="option-label">
              <div class="option-title">Monthly Digest</div>
              <div class="option-desc">One email with the month's best content</div>
            </div>
          </label>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Topics of Interest</div>
        <div class="checkbox-group">
          ${topicOptions.map(topic => `
            <label class="checkbox-option">
              <input type="checkbox" name="topics" value="${topic.value}" ${preferences.topics.includes(topic.value) ? 'checked' : ''}>
              <div class="option-label">
                <div class="option-title">${topic.label}</div>
              </div>
            </label>
          `).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Email Format</div>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" name="digest_format" value="full" ${preferences.digest_format === 'full' ? 'checked' : ''}>
            <div class="option-label">
              <div class="option-title">Full Content</div>
              <div class="option-desc">Complete articles in your inbox</div>
            </div>
          </label>
          <label class="radio-option">
            <input type="radio" name="digest_format" value="summary" ${preferences.digest_format === 'summary' ? 'checked' : ''}>
            <div class="option-label">
              <div class="option-title">Summary Only</div>
              <div class="option-desc">Brief summaries with links to full content</div>
            </div>
          </label>
        </div>
      </div>

      <div class="pause-section">
        <div class="pause-title">Take a Break</div>
        <p style="font-size: 0.75rem; color: #92400e; margin-bottom: 8px;">
          Pause emails until a specific date
        </p>
        <input type="date" name="pause_until" class="pause-input" value="${preferences.pause_until || ''}" min="${new Date().toISOString().split('T')[0]}">
      </div>

      <button type="submit" class="btn" id="saveBtn">Save Preferences</button>

      <input type="hidden" name="subscriber_id" value="${subscriber.id}">
    </form>
    <div class="footer">
      <a href="https://aiprodweekly.com">Back to AI Prod Weekly</a> &middot;
      <a href="https://aiprodweekly.com/api/unsubscribe?id=${subscriber.id}">Unsubscribe</a>
    </div>
  </div>
  <script>
    document.getElementById('preferencesForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('saveBtn');
      const form = e.target;
      btn.disabled = true;
      btn.textContent = 'Saving...';

      const formData = new FormData(form);
      const topics = formData.getAll('topics');

      const data = {
        subscriber_id: formData.get('subscriber_id'),
        frequency: formData.get('frequency'),
        topics: topics,
        digest_format: formData.get('digest_format'),
        pause_until: formData.get('pause_until') || null
      };

      try {
        const response = await fetch(window.location.href, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          document.getElementById('successMessage').style.display = 'block';
          setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
          }, 3000);
        }
      } catch (error) {
        alert('Error saving preferences. Please try again.');
      }

      btn.disabled = false;
      btn.textContent = 'Save Preferences';
    });
  </script>
</body>
</html>
`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const url = new URL(req.url);

    // GET - Display preferences form
    if (req.method === "GET") {
      const subscriberId = url.searchParams.get("id");

      if (!subscriberId) {
        return new Response("Missing subscriber ID", {
          status: 400,
          headers: corsHeaders,
        });
      }

      // Get subscriber
      const { data: subscriber, error: subError } = await supabase
        .from("newsletter_subscribers")
        .select("id, email, preferences, status")
        .eq("id", subscriberId)
        .single();

      if (subError || !subscriber) {
        return new Response("Subscriber not found", {
          status: 404,
          headers: corsHeaders,
        });
      }

      // Default preferences
      const defaultPreferences: Preferences = {
        frequency: 'weekly',
        topics: ['automation', 'ai-tools', 'productivity'],
        digest_format: 'full',
        pause_until: null,
      };

      const preferences = { ...defaultPreferences, ...subscriber.preferences };

      return new Response(getPreferencesPage(subscriber, preferences), {
        headers: { ...corsHeaders, "Content-Type": "text/html" },
      });
    }

    // POST - Save preferences
    if (req.method === "POST") {
      const body = await req.json();
      const { subscriber_id, frequency, topics, digest_format, pause_until } = body;

      if (!subscriber_id) {
        return new Response(JSON.stringify({ error: "Missing subscriber ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const preferences: Preferences = {
        frequency: frequency || 'weekly',
        topics: topics || [],
        digest_format: digest_format || 'full',
        pause_until: pause_until || null,
      };

      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({
          preferences,
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscriber_id);

      if (error) {
        console.error("Preferences update error:", error);
        return new Response(JSON.stringify({ error: "Failed to save preferences" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log(`Preferences updated for subscriber: ${subscriber_id}`);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Preferences error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
