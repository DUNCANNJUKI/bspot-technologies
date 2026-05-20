import { corsHeaders, json, errorRes, authDevice, adminClient } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return errorRes("Method not allowed", 405);

  const device = await authDevice(req);
  if (!device) return errorRes("Invalid device token", 401);
  if (device.status === "disabled") return errorRes("Device disabled", 403);

  let body: any = {};
  try { body = await req.json(); } catch {}

  const sb = adminClient();
  const update: any = {
    last_seen: new Date().toISOString(),
    status: device.status === "disabled" ? "disabled" : "online",
  };
  if (body.battery_level !== undefined) update.battery_level = Number(body.battery_level);
  if (body.signal_strength !== undefined) update.signal_strength = Number(body.signal_strength);
  if (body.internet_type) update.internet_type = String(body.internet_type);
  if (body.ip_address) update.ip_address = String(body.ip_address);
  if (body.app_version) update.app_version = String(body.app_version);

  await sb.from("devices").update(update).eq("id", device.id);
  await sb.from("device_logs").insert({ device_id: device.id, event_type: "heartbeat", payload: body });

  // return any queued messages assigned (or unassigned) so device can pull
  const { data: pending } = await sb.from("messages")
    .select("id, recipient, message, parts_count, encoding")
    .eq("client_id", device.client_id)
    .in("status", ["queued"])
    .order("priority", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(10);

  return json({ ok: true, pending: pending ?? [] });
});
