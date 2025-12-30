// Supabase Edge Function: resubscribe
// Allows unsubscribed users to resubscribe to the newsletter

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Resubscribe success page
const RESUBSCRIBE_SUCCESS_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Back - AI Prod Weekly</title>
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
      max-width: 480px;
      background: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    .icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
      color: #1a1a1a;
    }
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .highlight {
      background: #f0f7ff;
      border-radius: 8px;
      padding: 1rem;
      margin: 1.5rem 0;
    }
    .highlight p {
      margin: 0;
      color: #2563eb;
      font-weight: 500;
    }
    .home-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }
    .home-link:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">🎉</div>
    <h1>Welcome Back!</h1>
    <p>You've been resubscribed to AI Prod Weekly. We're glad to have you back!</p>
    <div class="highlight">
      <p>Next issue arrives Thursday</p>
    </div>
    <p>Every week: one automation, one insight, one tool to save you time.</p>
    <a href="https://aiprodweekly.com" class="home-link">Back to Home</a>
  </div>
</body>
</html>
`;

// Already subscribed page
const ALREADY_SUBSCRIBED_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Already Subscribed - AI Prod Weekly</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #fafafa;
      color: #1a1a1a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 480px;
      text-align: center;
    }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    p { color: #666; line-height: 1.6; margin-bottom: 1.5rem; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">✅</div>
    <h1>You're Already Subscribed</h1>
    <p>Good news — you're already on the list! No action needed.</p>
    <p><a href="https://aiprodweekly.com">Back to AI Prod Weekly</a></p>
  </div>
</body>
</html>
`;

// Not found page
const NOT_FOUND_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Not Found - AI Prod Weekly</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #fafafa;
      color: #1a1a1a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 480px;
      text-align: center;
    }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; color: #dc2626; }
    p { color: #666; line-height: 1.6; margin-bottom: 1.5rem; }
    .signup-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
    }
    .signup-link:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">🤔</div>
    <h1>Subscriber Not Found</h1>
    <p>We couldn't find that subscription. Want to sign up fresh?</p>
    <a href="https://aiprodweekly.com" class="signup-link">Subscribe to AI Prod Weekly</a>
  </div>
</body>
</html>
`;

// Error page
const ERROR_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error - AI Prod Weekly</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #fafafa;
      color: #1a1a1a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 480px;
      text-align: center;
    }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; color: #dc2626; }
    p { color: #666; line-height: 1.6; margin-bottom: 1.5rem; }
    a { color: #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Something went wrong</h1>
    <p>We couldn't process your request. Please try again or contact us at <a href="mailto:hello@aiprodweekly.com">hello@aiprodweekly.com</a>.</p>
  </div>
</body>
</html>
`;

// Resubscribe form page (shown when no ID provided)
const RESUBSCRIBE_FORM_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resubscribe - AI Prod Weekly</title>
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
      max-width: 400px;
      background: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input[type="email"] {
      padding: 0.875rem 1rem;
      border: 2px solid #e5e5e5;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    input[type="email"]:focus {
      outline: none;
      border-color: #2563eb;
    }
    button {
      padding: 0.875rem 1.5rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover { background: #1d4ed8; }
    .note {
      margin-top: 1.5rem;
      font-size: 0.875rem;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Resubscribe</h1>
    <p class="subtitle">Enter your email to rejoin AI Prod Weekly</p>
    <form method="POST">
      <input type="email" name="email" placeholder="you@example.com" required>
      <button type="submit">Resubscribe</button>
    </form>
    <p class="note">We'll only send you our Thursday newsletter. Unsubscribe anytime.</p>
  </div>
</body>
</html>
`;

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

    // Handle GET request with ID parameter (from unsubscribe page link)
    if (req.method === "GET") {
      const subscriberId = url.searchParams.get("id");

      // If no ID, show resubscribe form
      if (!subscriberId) {
        return new Response(RESUBSCRIBE_FORM_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      // Look up subscriber by ID
      const { data: subscriber, error: fetchError } = await supabase
        .from("newsletter_subscribers")
        .select("id, email, status")
        .eq("id", subscriberId)
        .single();

      if (fetchError || !subscriber) {
        return new Response(NOT_FOUND_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      // Already active
      if (subscriber.status === "active") {
        return new Response(ALREADY_SUBSCRIBED_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      // Resubscribe
      const { error: updateError } = await supabase
        .from("newsletter_subscribers")
        .update({
          status: "active",
          unsubscribed_at: null,
        })
        .eq("id", subscriberId);

      if (updateError) {
        console.error("Resubscribe error:", updateError);
        return new Response(ERROR_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      console.log(`Resubscribed: ${subscriber.email}`);

      return new Response(RESUBSCRIBE_SUCCESS_HTML, {
        headers: { ...corsHeaders, "Content-Type": "text/html" },
        status: 200,
      });
    }

    // Handle POST request (from resubscribe form)
    if (req.method === "POST") {
      const formData = await req.formData();
      const email = formData.get("email")?.toString().toLowerCase().trim();

      if (!email) {
        return new Response(ERROR_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      // Look up subscriber by email
      const { data: subscriber, error: fetchError } = await supabase
        .from("newsletter_subscribers")
        .select("id, status")
        .eq("email", email)
        .single();

      if (fetchError || !subscriber) {
        // Not found - redirect to main signup
        return new Response(NOT_FOUND_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      // Already active
      if (subscriber.status === "active") {
        return new Response(ALREADY_SUBSCRIBED_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      // Resubscribe
      const { error: updateError } = await supabase
        .from("newsletter_subscribers")
        .update({
          status: "active",
          unsubscribed_at: null,
        })
        .eq("id", subscriber.id);

      if (updateError) {
        console.error("Resubscribe error:", updateError);
        return new Response(ERROR_HTML, {
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200,
        });
      }

      console.log(`Resubscribed via form: ${email}`);

      return new Response(RESUBSCRIBE_SUCCESS_HTML, {
        headers: { ...corsHeaders, "Content-Type": "text/html" },
        status: 200,
      });
    }

    // Unsupported method
    return new Response("Method not allowed", {
      headers: corsHeaders,
      status: 405,
    });
  } catch (error) {
    console.error("Resubscribe error:", error);
    return new Response(ERROR_HTML, {
      headers: { ...corsHeaders, "Content-Type": "text/html" },
      status: 200,
    });
  }
});
