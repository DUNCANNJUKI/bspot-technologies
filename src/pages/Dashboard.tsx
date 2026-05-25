import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, isAdmin } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, MessageSquare, CheckCircle2, XCircle, Clock, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";

type Stats = { sent: number; delivered: number; failed: number; queued: number; devices_online: number; devices_total: number };

export default function Dashboard() {
  const { clientId, roles } = useAuth();
  const admin = isAdmin(roles);
  const [stats, setStats] = useState<Stats>({ sent: 0, delivered: 0, failed: 0, queued: 0, devices_online: 0, devices_total: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [series, setSeries] = useState<{ time: string; count: number }[]>([]);
  const [queueHealth, setQueueHealth] = useState<{ device_id: string | null; device_name: string; status: string; last_seen: string | null; queued: number; processing: number }[]>([]);
  const [unassigned, setUnassigned] = useState<{ queued: number; processing: number }>({ queued: 0, processing: 0 });

  const load = async () => {
    const msgQ = admin ? supabase.from("messages").select("status") : supabase.from("messages").select("status").eq("client_id", clientId ?? "");
    const devQ = admin ? supabase.from("devices").select("status") : supabase.from("devices").select("status").eq("client_id", clientId ?? "");
    const recentQ = admin ? supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(10)
      : supabase.from("messages").select("*").eq("client_id", clientId ?? "").order("created_at", { ascending: false }).limit(10);
    const queueQ = admin
      ? supabase.from("messages").select("status,device_id").in("status", ["queued", "processing"])
      : supabase.from("messages").select("status,device_id").eq("client_id", clientId ?? "").in("status", ["queued", "processing"]);
    const devsFullQ = admin
      ? supabase.from("devices").select("id,device_name,status,last_seen")
      : supabase.from("devices").select("id,device_name,status,last_seen").eq("client_id", clientId ?? "");

    const [{ data: msgs }, { data: devs }, { data: recentMsgs }, { data: queueRows }, { data: devsFull }] =
      await Promise.all([msgQ, devQ, recentQ, queueQ, devsFullQ]);
    const s: Stats = { sent: 0, delivered: 0, failed: 0, queued: 0, devices_online: 0, devices_total: devs?.length ?? 0 };
    (msgs ?? []).forEach((m: any) => {
      if (m.status === "sent") s.sent++;
      else if (m.status === "delivered") s.delivered++;
      else if (m.status === "failed") s.failed++;
      else if (m.status === "queued" || m.status === "processing") s.queued++;
    });
    (devs ?? []).forEach((d: any) => { if (d.status === "online" || d.status === "sending") s.devices_online++; });
    setStats(s);
    setRecent(recentMsgs ?? []);

    // Build last 24h hourly series
    const buckets = new Map<string, number>();
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 3600_000);
      const k = `${d.getHours()}:00`;
      buckets.set(k, 0);
    }
    (msgs ?? []).forEach(() => {});
    // simplified: use recent
    const sinceMs = now.getTime() - 24 * 3600_000;
    (recentMsgs ?? []).forEach((m: any) => {
      const t = new Date(m.created_at).getTime();
      if (t >= sinceMs) {
        const k = `${new Date(t).getHours()}:00`;
        buckets.set(k, (buckets.get(k) ?? 0) + 1);
      }
    });
    setSeries(Array.from(buckets.entries()).map(([time, count]) => ({ time, count })));
  };

  useEffect(() => {
    load();
    const channel = supabase.channel("dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "devices" }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [clientId, admin]);

  const total = stats.sent + stats.delivered + stats.failed;
  const successRate = total ? Math.round(((stats.sent + stats.delivered) / total) * 100) : 0;

  const tiles = [
    { label: "Messages sent", value: stats.sent + stats.delivered, icon: MessageSquare, color: "text-primary" },
    { label: "Delivered", value: stats.delivered, icon: CheckCircle2, color: "text-success" },
    { label: "Failed", value: stats.failed, icon: XCircle, color: "text-destructive" },
    { label: "In queue", value: stats.queued, icon: Clock, color: "text-warning" },
    { label: "Active devices", value: `${stats.devices_online}/${stats.devices_total}`, icon: Smartphone, color: "text-primary" },
    { label: "Success rate", value: `${successRate}%`, icon: Activity, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Realtime view of your SMS gateway</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tiles.map((t) => (
          <Card key={t.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{t.label}</span>
              <t.icon className={`h-4 w-4 ${t.color}`} />
            </div>
            <div className="text-2xl font-bold tabular-nums">{t.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Traffic — last 24 hours</h3>
            <Badge variant="outline" className="text-xs">Realtime</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-4">Recent messages</h3>
          <div className="space-y-2 max-h-64 overflow-auto">
            {recent.length === 0 && <p className="text-sm text-muted-foreground">No messages yet</p>}
            {recent.map((m) => (
              <div key={m.id} className="flex items-center justify-between py-2 border-b border-border/60 text-sm last:border-0">
                <div className="min-w-0">
                  <div className="font-mono text-xs truncate">{m.recipient}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-[180px]">{m.message}</div>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    queued: "bg-warning/15 text-warning border-warning/30",
    processing: "bg-primary/15 text-primary border-primary/30",
    sent: "bg-primary/15 text-primary border-primary/30",
    delivered: "bg-success/15 text-success border-success/30",
    failed: "bg-destructive/15 text-destructive border-destructive/30",
    cancelled: "bg-muted text-muted-foreground border-border",
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded border ${map[status] ?? ""}`}>{status}</span>;
}
