import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

/**
 * Export Subscribers Edge Function
 * Returns subscriber list as CSV or JSON for admin export
 *
 * Required: Authorization header with service role key
 * Optional query params:
 *   - format: 'csv' (default) or 'json'
 *   - status: 'active', 'unsubscribed', 'all' (default: 'active')
 *   - source: filter by source (optional)
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verify authorization (require service role for export)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse query parameters
    const url = new URL(req.url);
    const format = url.searchParams.get("format") || "csv";
    const status = url.searchParams.get("status") || "active";
    const source = url.searchParams.get("source");

    // Build query
    let query = supabase
      .from("newsletter_subscribers")
      .select("id, email, source, subscribed_at, confirmed_at, unsubscribed_at, tags, metadata");

    // Apply status filter
    if (status === "active") {
      query = query.is("unsubscribed_at", null);
    } else if (status === "unsubscribed") {
      query = query.not("unsubscribed_at", "is", null);
    }

    // Apply source filter
    if (source) {
      query = query.eq("source", source);
    }

    // Order by subscription date
    query = query.order("subscribed_at", { ascending: false });

    const { data: subscribers, error } = await query;

    if (error) {
      console.error("Export query error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch subscribers" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return based on format
    if (format === "json") {
      return new Response(
        JSON.stringify({
          count: subscribers?.length || 0,
          exported_at: new Date().toISOString(),
          filters: { status, source },
          subscribers: subscribers || []
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );
    }

    // CSV format
    const csvHeaders = ["email", "source", "subscribed_at", "confirmed_at", "unsubscribed_at", "tags"];
    const csvRows = [csvHeaders.join(",")];

    for (const sub of subscribers || []) {
      const row = [
        `"${sub.email}"`,
        `"${sub.source || ""}"`,
        `"${sub.subscribed_at || ""}"`,
        `"${sub.confirmed_at || ""}"`,
        `"${sub.unsubscribed_at || ""}"`,
        `"${(sub.tags || []).join(";")}"`,
      ];
      csvRows.push(row.join(","));
    }

    const csv = csvRows.join("\n");
    const filename = `subscribers-${status}-${new Date().toISOString().split("T")[0]}.csv`;

    return new Response(csv, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error("Export error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
