// Public test endpoint to send a sample webhook to all active hooks for the caller's client.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, json, errorRes, adminClient, dispatchEvent } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return errorRes("Method not allowed", 405);
  const auth = req.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return errorRes("Unauthorized", 401);
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: auth } } });
  const { data } = await sb.auth.getClaims(auth.replace("Bearer ", ""));
  if (!data?.claims?.sub) return errorRes("Unauthorized", 401);

  const body = await req.json().catch(() => ({}));
  const { webhook_id } = body;
  const a = adminClient();
  const { data: hook } = await a.from("webhooks").select("*").eq("id", webhook_id).maybeSingle();
  if (!hook) return errorRes("Webhook not found", 404);
  await dispatchEvent(hook.client_id, "test.ping", { message: "Hello from B TEXTMAN", at: new Date().toISOString() });
  return json({ ok: true });
});
