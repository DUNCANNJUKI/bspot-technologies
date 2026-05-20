import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Settings() {
  const { user, clientId, roles } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name").eq("user_id", user.id).maybeSingle().then(({ data }) => setDisplayName(data?.display_name ?? ""));
    if (clientId) supabase.from("clients").select("name").eq("id", clientId).maybeSingle().then(({ data }) => setCompany(data?.name ?? ""));
  }, [user, clientId]);

  const save = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await supabase.from("profiles").upsert({ user_id: user.id, display_name: displayName });
      if (clientId) await supabase.from("clients").update({ name: company }).eq("id", clientId);
      toast.success("Saved");
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div><h1 className="text-2xl font-bold tracking-tight">Settings</h1><p className="text-sm text-muted-foreground">Account & profile</p></div>
      <Card className="p-5 space-y-4">
        <div className="space-y-1"><Label>Email</Label><Input value={user?.email ?? ""} disabled /></div>
        <div className="space-y-1"><Label>Display name</Label><Input value={displayName} onChange={e => setDisplayName(e.target.value)} /></div>
        <div className="space-y-1"><Label>Company / account name</Label><Input value={company} onChange={e => setCompany(e.target.value)} /></div>
        <div className="space-y-1"><Label>Roles</Label><Input value={roles.join(", ") || "client_user"} disabled /></div>
        <Button onClick={save} disabled={loading}>{loading ? "Saving…" : "Save changes"}</Button>
      </Card>
    </div>
  );
}
