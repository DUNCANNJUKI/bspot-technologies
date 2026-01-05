// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Max-Age": "86400",
};

// In-memory rate limit tracking (will reset on cold starts)
// Each IP gets one increment per hour
const incrementTracker = new Map<string, number>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const entries = Array.from(incrementTracker.entries());
  for (const [key, timestamp] of entries) {
    if (timestamp < oneHourAgo) {
      incrementTracker.delete(key);
    }
  }
}, 10 * 60 * 1000);

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") ||
                     "unknown";
    
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    
    // Check if this IP has already incremented within the last hour
    const lastIncrement = incrementTracker.get(clientIp);
    if (lastIncrement && lastIncrement > oneHourAgo) {
      const remainingMs = lastIncrement + 60 * 60 * 1000 - now;
      const remainingMinutes = Math.ceil(remainingMs / 60000);
      console.log(`Rate limited IP: ${clientIp} - already incremented within the hour`);
      
      // Still return current count but don't increment
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? ""
      );
      
      const { data: visitors } = await supabase
        .from("site_visitors")
        .select("count")
        .limit(1)
        .single();
      
      return new Response(
        JSON.stringify({ 
          count: visitors?.count ?? 0,
          incremented: false,
          message: `Already counted. Try again in ${remainingMinutes} minutes.`
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client with service role for secure access
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Increment the visitor count
    const { data, error } = await supabase.rpc("increment_visitor_count");

    if (error) {
      console.error("Error incrementing visitor count:", error);
      
      // Fallback: just fetch the current count
      const { data: visitors } = await supabase
        .from("site_visitors")
        .select("count")
        .limit(1)
        .single();
      
      return new Response(
        JSON.stringify({ 
          count: visitors?.count ?? 0,
          incremented: false,
          error: "Failed to increment"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Track this IP's increment
    incrementTracker.set(clientIp, now);
    console.log(`Visitor count incremented by IP: ${clientIp}, new count: ${data}`);

    return new Response(
      JSON.stringify({ 
        count: data,
        incremented: true
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in increment-visitor function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
