// Supabase Edge Function: unsubscribe
// Handles one-click unsubscribe from newsletter emails

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple unsubscribe confirmation page
const UNSUBSCRIBE_SUCCESS_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed - AI Prod Weekly</title>
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
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    p { color: #666; line-height: 1.6; margin-bottom: 1.5rem; }
    .resubscribe {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
    }
    .resubscribe:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>You've been unsubscribed</h1>
    <p>We're sorry to see you go. You won't receive any more emails from AI Prod Weekly.</p>
    <p>Changed your mind?</p>
    <a href="https://aiprodweekly.com" class="resubscribe">Resubscribe</a>
  </div>
</body>
</html>
`;

const UNSUBSCRIBE_ERROR_HTML = `
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
    <p>We couldn't process your unsubscribe request. Please try again or contact us at <a href="mailto:hello@aiprodweekly.com">hello@aiprodweekly.com</a>.</p>
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

    const url = new URL(req.url);
    const subscriberId = url.searchParams.get("id");

    if (!subscriberId) {
      throw new Error("Missing subscriber ID");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Update subscriber status to unsubscribed
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
      })
      .eq("id", subscriberId)
      .select("email")
      .single();

    if (error) {
      console.error("Unsubscribe error:", error);
      // Don't expose internal errors to user
      return new Response(UNSUBSCRIBE_SUCCESS_HTML, {
        headers: { ...corsHeaders, "Content-Type": "text/html" },
        status: 200,
      });
    }

    // Log the unsubscribe for analytics
    console.log(`Unsubscribed: ${data?.email || subscriberId}`);

    // Return success page
    return new Response(UNSUBSCRIBE_SUCCESS_HTML, {
      headers: { ...corsHeaders, "Content-Type": "text/html" },
      status: 200,
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return new Response(UNSUBSCRIBE_ERROR_HTML, {
      headers: { ...corsHeaders, "Content-Type": "text/html" },
      status: 200, // Return 200 to show error page properly
    });
  }
});
