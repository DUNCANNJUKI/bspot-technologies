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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Send, Search, Download, RefreshCw } from "lucide-react";

export default function Messages() {
  const { clientId, roles } = useAuth();
  const admin = isAdmin(roles);
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    let q: any = admin ? supabase.from("messages").select("*") : supabase.from("messages").select("*").eq("client_id", clientId ?? "");
    if (status !== "all") q = q.eq("status", status);
    const { data } = await q.order("created_at", { ascending: false }).limit(500);
    setItems(data ?? []);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("msgs-feed").on("postgres_changes", { event: "*", schema: "public", table: "messages" }, load).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [clientId, admin, status]);

  const send = async () => {
    if (!to.trim() || !msg.trim()) return toast.error("Recipient and message required");
    if (!clientId) return toast.error("No client");
    const isUnicode = /[^\u0000-\u007F]/.test(msg);
    const partLen = isUnicode ? 70 : 160;
    const { error } = await supabase.from("messages").insert({
      client_id: clientId, recipient: to.trim(), message: msg, encoding: isUnicode ? "UCS2" : "GSM7",
      parts_count: Math.max(1, Math.ceil(msg.length / partLen)), priority: 5, status: "queued",
    });
    if (error) return toast.error(error.message);
    toast.success("Message queued");
    setTo(""); setMsg(""); setOpen(false);
  };

  const retry = async (id: string) => {
    const { error } = await supabase.from("messages").update({ status: "queued", error_message: null, retry_count: 0 }).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Re-queued");
  };

  const exportCsv = () => {
    const rows = [["id", "recipient", "message", "status", "created_at", "delivered_at"]];
    items.forEach((m) => rows.push([m.id, m.recipient, JSON.stringify(m.message), m.status, m.created_at, m.delivered_at ?? ""]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "messages.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const filtered = items.filter((m) => !search || m.recipient?.includes(search) || m.message?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-bold tracking-tight">Messages</h1><p className="text-sm text-muted-foreground">SMS queue and history</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-1" />Export</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Send className="h-4 w-4 mr-1" />Send SMS</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Send a single SMS</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1"><Label>Recipient (E.164)</Label><Input value={to} onChange={e => setTo(e.target.value)} placeholder="+254700000000" /></div>
                <div className="space-y-1"><Label>Message</Label><Textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} maxLength={1000} />
                  <p className="text-xs text-muted-foreground">{msg.length} chars · {/[^\u0000-\u007F]/.test(msg) ? "UCS2" : "GSM7"}</p>
                </div>
                <DialogFooter><Button onClick={send}>Queue SMS</Button></DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search recipient or content" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="queued">Queued</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border border-border overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Recipient</TableHead><TableHead>Message</TableHead><TableHead>Status</TableHead>
              <TableHead>Parts</TableHead><TableHead>Created</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">No messages</TableCell></TableRow>}
              {filtered.slice(0, 200).map((m) => (
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
      </Card>
    </div>
  );
}
