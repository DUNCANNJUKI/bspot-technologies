// Shared helpers for B TEXTMAN edge functions
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

export const errorRes = (msg: string, status = 400, extra: Record<string, unknown> = {}) =>
  json({ error: msg, ...extra }, status);

export const adminClient = () =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Validate Bearer API key. Returns { client_id, api_key_id } or null. */
export async function authApiKey(req: Request) {
  const h = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const raw = m[1].trim();
  const hash = await sha256Hex(raw);
  const sb = adminClient();
  const { data } = await sb.from("api_keys").select("id,client_id,status").eq("key_hash", hash).maybeSingle();
  if (!data || data.status !== "active") return null;
  // increment usage async (fire and forget)
  sb.from("api_keys").update({ usage_count: undefined as any, last_used_at: new Date().toISOString() }).eq("id", data.id).then(() => {});
  // proper atomic increment via SQL-less workaround:
  sb.rpc as any; // noop
  await sb.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", data.id);
  return { client_id: data.client_id as string, api_key_id: data.id as string };
}

/** Validate device token. Returns device row or null. */
export async function authDevice(req: Request) {
  const h = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const token = m[1].trim();
  const sb = adminClient();
  const { data } = await sb.from("devices").select("*").eq("device_token", token).maybeSingle();
  return data;
}

export function detectEncoding(text: string) {
  const isU = /[^\u0000-\u007F]/.test(text);
  return {
    encoding: isU ? "UCS2" : "GSM7",
    parts: Math.max(1, Math.ceil(text.length / (isU ? 70 : 160))),
  };
}
