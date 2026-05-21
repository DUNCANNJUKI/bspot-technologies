import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Send, Eye, EyeOff, Copy } from "lucide-react";
import { z } from "zod";

const EVENTS = ["message.sent", "message.delivered", "message.failed", "test.ping"];
const schema = z.object({ url: z.string().url("Must be a valid https URL").max(500) });

export default function Webhooks() {
  const { clientId } = useAuth();
  const [hooks, setHooks] = useState<any[]>([]);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState<string[]>(["message.sent", "message.delivered", "message.failed"]);
  const [showSecret, setShowSecret] = useState<Record<string, boolean>>({});

  const load = async () => {
    if (!clientId) return;
    const { data } = await supabase.from("webhooks").select("*").eq("client_id", clientId).order("created_at", { ascending: false });
    setHooks(data ?? []);
    const ids = (data ?? []).map((h) => h.id);
    if (ids.length) {
      const { data: d } = await supabase.from("webhook_deliveries").select("*").in("webhook_id", ids).order("created_at", { ascending: false }).limit(50);
      setDeliveries(d ?? []);
    } else setDeliveries([]);
  };

  useEffect(() => { load(); }, [clientId]);

  const create = async () => {
    const v = schema.safeParse({ url });
    if (!v.success) return toast.error(v.error.issues[0].message);
    if (!clientId) return;
    const { error } = await supabase.from("webhooks").insert({ client_id: clientId, url, events });
    if (error) return toast.error(error.message);
    toast.success("Webhook created");
    setUrl(""); setOpen(false); load();
  };

  const toggle = async (h: any) => {
    await supabase.from("webhooks").update({ active: !h.active }).eq("id", h.id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this webhook?")) return;
    await supabase.from("webhooks").delete().eq("id", id); load();
  };
  const test = async (id: string) => {
    const { error } = await supabase.functions.invoke("webhook-test", { body: { webhook_id: id } });
    if (error) return toast.error(error.message);
    toast.success("Test event dispatched");
    setTimeout(load, 1200);
  };
  const copy = (s: string) => { navigator.clipboard.writeText(s); toast.success("Copied"); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Webhooks</h1>
          <p className="text-sm text-muted-foreground">Receive realtime delivery status callbacks. Signed with HMAC-SHA256 via <code>X-BTextman-Signature</code>.</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" />New webhook</Button>
      </div>

      <div className="grid gap-3">
        {hooks.length === 0 && <Card className="p-8 text-center text-muted-foreground">No webhooks yet.</Card>}
        {hooks.map((h) => (
          <Card key={h.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-sm truncate">{h.url}</code>
                  <Badge variant={h.active ? "default" : "secondary"}>{h.active ? "active" : "paused"}</Badge>
                  {h.last_status && <Badge variant={h.last_status < 400 ? "default" : "destructive"}>HTTP {h.last_status}</Badge>}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Events: {(h.events ?? []).join(", ")}</div>
                <div className="text-xs mt-2 flex items-center gap-2">
                  <span className="text-muted-foreground">Secret:</span>
                  <code className="font-mono">{showSecret[h.id] ? h.secret : "•".repeat(24)}</code>
                  <button onClick={() => setShowSecret((s) => ({ ...s, [h.id]: !s[h.id] }))}>
                    {showSecret[h.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                  <button onClick={() => copy(h.secret)}><Copy className="h-3 w-3" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Switch checked={h.active} onCheckedChange={() => toggle(h)} />
                <Button size="sm" variant="outline" onClick={() => test(h.id)}><Send className="h-3 w-3 mr-1" />Test</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(h.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <h2 className="font-semibold mb-3">Recent deliveries</h2>
        <div className="space-y-1 text-xs max-h-80 overflow-auto">
          {deliveries.length === 0 && <div className="text-muted-foreground">No deliveries yet.</div>}
          {deliveries.map((d) => (
            <div key={d.id} className="flex items-center gap-2 py-1 border-b border-border/40">
              <Badge variant={d.succeeded ? "default" : "destructive"} className="shrink-0">{d.response_status || "ERR"}</Badge>
              <span className="font-mono shrink-0">{d.event_type}</span>
              <span className="text-muted-foreground truncate">{d.response_body?.slice(0, 80)}</span>
              <span className="ml-auto text-muted-foreground shrink-0">{new Date(d.created_at).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New webhook</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Endpoint URL</Label><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://your-app.com/webhooks/btextman" /></div>
            <div className="space-y-2">
              <Label>Events</Label>
              <div className="grid grid-cols-2 gap-2">
                {EVENTS.map((ev) => (
                  <label key={ev} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={events.includes(ev)} onChange={(e) => setEvents((arr) => e.target.checked ? [...arr, ev] : arr.filter((x) => x !== ev))} />
                    <code>{ev}</code>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={create}>Create webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
