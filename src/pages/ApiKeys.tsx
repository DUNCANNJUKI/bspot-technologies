import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Copy, KeyRound, Trash2 } from "lucide-react";

async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function ApiKeys() {
  const { clientId } = useAuth();
  const [keys, setKeys] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [created, setCreated] = useState<string | null>(null);

  const load = async () => {
    if (!clientId) return;
    const { data } = await supabase.from("api_keys").select("*").eq("client_id", clientId).order("created_at", { ascending: false });
    setKeys(data ?? []);
  };
  useEffect(() => { load(); }, [clientId]);

  const create = async () => {
    if (!name.trim() || !clientId) return toast.error("Name required");
    const raw = "btx_" + crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
    const hash = await sha256Hex(raw);
    const prefix = raw.slice(0, 10);
    const { error } = await supabase.from("api_keys").insert({ client_id: clientId, name, key_prefix: prefix, key_hash: hash });
    if (error) return toast.error(error.message);
    setCreated(raw); setName(""); load();
  };

  const revoke = async (id: string) => {
    const { error } = await supabase.from("api_keys").update({ status: "revoked" }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Revoked"); load(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-bold tracking-tight">API Keys</h1><p className="text-sm text-muted-foreground">Authenticate external systems</p></div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setCreated(null); }}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-1" />New API key</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{created ? "Copy your key now" : "Create API key"}</DialogTitle></DialogHeader>
            {created ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">This is the only time the full key will be shown.</p>
                <div className="flex gap-2"><Input readOnly value={created} className="font-mono text-xs" />
                  <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(created); toast.success("Copied"); }}><Copy className="h-4 w-4" /></Button></div>
                <DialogFooter><Button onClick={() => { setOpen(false); setCreated(null); }}>Done</Button></DialogFooter>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1"><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Production server" /></div>
                <DialogFooter><Button onClick={create}>Generate</Button></DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="rounded-md border border-border overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Key</TableHead><TableHead>Status</TableHead><TableHead>Usage</TableHead><TableHead>Rate limit</TableHead><TableHead>Last used</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {keys.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">No API keys yet</TableCell></TableRow>}
              {keys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-muted-foreground" />{k.name}</TableCell>
                  <TableCell className="font-mono text-xs">{k.key_prefix}…</TableCell>
                  <TableCell><span className={`text-[10px] px-2 py-0.5 rounded border ${k.status === "active" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"}`}>{k.status}</span></TableCell>
                  <TableCell className="tabular-nums">{k.usage_count}</TableCell>
                  <TableCell>{k.rate_limit}/min</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{k.last_used_at ? new Date(k.last_used_at).toLocaleString() : "never"}</TableCell>
                  <TableCell>{k.status === "active" && <Button variant="ghost" size="sm" onClick={() => revoke(k.id)}><Trash2 className="h-3 w-3 mr-1" />Revoke</Button>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
