import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, isAdmin } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Send, Search, Download, RefreshCw, ChevronDown } from "lucide-react";

const STATUSES = ["queued", "processing", "sent", "delivered", "failed", "cancelled"];

export default function Messages() {
  const { clientId, roles } = useAuth();
  const admin = isAdmin(roles);
  const [items, setItems] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [deviceId, setDeviceId] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setToDate] = useState<string>("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    let q: any = supabase.from("messages").select("*");
    if (!admin && clientId) q = q.eq("client_id", clientId);
    if (admin && clientFilter !== "all") q = q.eq("client_id", clientFilter);
    if (status !== "all") q = q.eq("status", status);
    if (deviceId !== "all") q = q.eq("device_id", deviceId);
    if (from) q = q.gte("created_at", new Date(from).toISOString());
    if (to) q = q.lte("created_at", new Date(to + "T23:59:59").toISOString());
    const { data } = await q.order("created_at", { ascending: false }).limit(1000);
    setItems(data ?? []);
  };

  const loadMeta = async () => {
    const devQ = admin ? supabase.from("devices").select("id,device_name") : supabase.from("devices").select("id,device_name").eq("client_id", clientId ?? "");
    const [{ data: d }, { data: c }] = await Promise.all([
      devQ,
      admin ? supabase.from("clients").select("id,name") : Promise.resolve({ data: [] as any[] }),
    ]);
    setDevices(d ?? []);
    setClients(c ?? []);
  };

  useEffect(() => { loadMeta(); }, [clientId, admin]);
  useEffect(() => {
    load();
    const ch = supabase.channel("msgs-feed").on("postgres_changes", { event: "*", schema: "public", table: "messages" }, load).subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, admin, status, deviceId, clientFilter, from, to]);

  const send = async () => {
    if (!recipient.trim() || !msg.trim()) return toast.error("Recipient and message required");
    if (!clientId) return toast.error("No client");
    const isUnicode = /[^\u0000-\u007F]/.test(msg);
    const partLen = isUnicode ? 70 : 160;
    const { error } = await supabase.from("messages").insert({
      client_id: clientId, recipient: recipient.trim(), message: msg, encoding: isUnicode ? "UCS2" : "GSM7",
      parts_count: Math.max(1, Math.ceil(msg.length / partLen)), priority: 5, status: "queued",
    });
    if (error) return toast.error(error.message);
    toast.success("Message queued");
    setRecipient(""); setMsg(""); setOpen(false);
  };

  const retry = async (id: string) => {
    const { error } = await supabase.from("messages").update({ status: "queued", error_message: null, retry_count: 0 }).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Re-queued");
  };

  const filtered = items.filter((m) => !search || m.recipient?.includes(search) || m.message?.toLowerCase().includes(search.toLowerCase()));

  const filename = () => {
    const parts = ["delivery-report"];
    if (status !== "all") parts.push(status);
    if (from || to) parts.push(`${from || "any"}_${to || "any"}`);
    return parts.join("_");
  };

  const downloadBlob = (content: string, ext: string, mime: string) => {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    const a = document.createElement("a");
    a.href = url; a.download = `${filename()}.${ext}`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} rows`);
  };

  const exportCsv = () => {
    const cols = ["id", "client_id", "device_id", "recipient", "message", "encoding", "parts_count", "status", "priority", "retry_count", "error_message", "created_at", "processing_at", "sent_at", "delivered_at", "failed_at"];
    const esc = (v: any) => {
      if (v == null) return "";
      const s = typeof v === "string" ? v : JSON.stringify(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [cols.join(",")];
    filtered.forEach((m) => lines.push(cols.map((c) => esc(m[c])).join(",")));
    downloadBlob(lines.join("\n"), "csv", "text/csv");
  };

  const exportJson = () => {
    downloadBlob(JSON.stringify({
      generated_at: new Date().toISOString(),
      filters: { status, device_id: deviceId, client_id: clientFilter, from: from || null, to: to || null },
      count: filtered.length,
      messages: filtered,
    }, null, 2), "json", "application/json");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-bold tracking-tight">Messages</h1><p className="text-sm text-muted-foreground">SMS queue, history and delivery reports</p></div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Download className="h-4 w-4 mr-1" />Export<ChevronDown className="h-3 w-3 ml-1" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportCsv}>Download CSV ({filtered.length})</DropdownMenuItem>
              <DropdownMenuItem onClick={exportJson}>Download JSON ({filtered.length})</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Send className="h-4 w-4 mr-1" />Send SMS</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Send a single SMS</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1"><Label>Recipient (E.164)</Label><Input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="+254700000000" /></div>
                <div className="space-y-1"><Label>Message</Label><Textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} maxLength={1000} />
                  <p className="text-xs text-muted-foreground">{msg.length} chars · {/[^\u0000-\u007F]/.test(msg) ? "UCS2" : "GSM7"}</p>
                </div>
                <DialogFooter><Button onClick={send}>Queue SMS</Button></DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <div className="col-span-2 md:col-span-2 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input placeholder="Search recipient or content" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={deviceId} onValueChange={setDeviceId}>
            <SelectTrigger><SelectValue placeholder="Device" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All devices</SelectItem>
              {devices.map((d) => <SelectItem key={d.id} value={d.id}>{d.device_name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
          <Input type="date" value={to} onChange={(e) => setToDate(e.target.value)} aria-label="To date" />
        </div>
        {admin && (
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">Client</Label>
            <Select value={clientFilter} onValueChange={setClientFilter}>
              <SelectTrigger className="w-60"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All clients</SelectItem>
                {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}
        {(status !== "all" || deviceId !== "all" || from || to || clientFilter !== "all") && (
          <Button size="sm" variant="ghost" onClick={() => { setStatus("all"); setDeviceId("all"); setFrom(""); setToDate(""); setClientFilter("all"); }}>
            Clear filters
          </Button>
        )}
        <div className="rounded-md border border-border overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Recipient</TableHead><TableHead>Message</TableHead><TableHead>Status</TableHead>
              <TableHead>Parts</TableHead><TableHead>Created</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">No messages match filters</TableCell></TableRow>}
              {filtered.slice(0, 300).map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-mono text-xs">{m.recipient}</TableCell>
                  <TableCell className="max-w-[300px] truncate text-sm">{m.message}</TableCell>
                  <TableCell><span className="text-[10px] px-2 py-0.5 rounded border bg-muted">{m.status}</span></TableCell>
                  <TableCell>{m.parts_count}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</TableCell>
                  <TableCell>{m.status === "failed" && <Button variant="ghost" size="sm" onClick={() => retry(m.id)}><RefreshCw className="h-3 w-3 mr-1" />Retry</Button>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filtered.length > 300 && <p className="text-xs text-muted-foreground">Showing 300 of {filtered.length} rows — export to see all.</p>}
      </Card>
    </div>
  );
}
