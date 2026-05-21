// Sends a webhook payload to all matching webhooks for a client.
// Internal endpoint — called from other edge functions with the service role key.
import { corsHeaders, json, errorRes, adminClient } from "../_shared/utils.ts";

async function hmacSha256Hex(secret: string, body: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function dispatchEvent(client_id: string, event_type: string, payload: Record<string, unknown>, message_id?: string) {
  const sb = adminClient();
  const { data: hooks } = await sb.from("webhooks").select("*").eq("client_id", client_id).eq("active", true);
  if (!hooks?.length) return;
  const body = JSON.stringify({ event: event_type, data: payload, timestamp: new Date().toISOString() });

  await Promise.all(hooks.filter(h => (h.events ?? []).includes(event_type)).map(async (h) => {
    let status = 0; let respText = ""; let ok = false;
    try {
      const sig = await hmacSha256Hex(h.secret, body);
      const r = await fetch(h.url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-BTextman-Signature": sig, "X-BTextman-Event": event_type },
        body,
      });
      status = r.status;
      respText = (await r.text()).slice(0, 2000);
      ok = r.ok;
    } catch (e) {
      respText = String((e as Error).message ?? e).slice(0, 2000);
    }
    await sb.from("webhook_deliveries").insert({
      webhook_id: h.id, message_id: message_id ?? null, event_type, payload,
      response_status: status, response_body: respText, succeeded: ok, delivered_at: new Date().toISOString(),
    });
    await sb.from("webhooks").update({
      last_status: status,
      failure_count: ok ? 0 : (h.failure_count ?? 0) + 1,
      active: ok ? true : ((h.failure_count ?? 0) + 1 < 10),
    }).eq("id", h.id);
  }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return errorRes("Method not allowed", 405);
  const internalKey = req.headers.get("x-internal-key");
  if (internalKey !== Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) return errorRes("Forbidden", 403);
  const body = await req.json().catch(() => ({}));
  const { client_id, event_type, payload, message_id } = body;
  if (!client_id || !event_type || !payload) return errorRes("client_id, event_type, payload required");
  await dispatchEvent(client_id, event_type, payload, message_id);
  return json({ ok: true });
});
