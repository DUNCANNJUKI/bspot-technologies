import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, Smartphone, ArrowRight, Loader2, Copy, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo";

const SUPABASE_URL = "https://rtgcrclgmvcmrjpvtpwm.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Z2NyY2xnbXZjbXJqcHZ0cHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU0NTEsImV4cCI6MjA3MDQzMTQ1MX0.JR45nTPTScLaObpXQM-VzQ50ODRJTzakrvPOA3HldCM";
const HEARTBEAT = `${SUPABASE_URL}/functions/v1/device-heartbeat`;
const LS_KEY = "btextman.onboarding.lastToken";

type Result = { ok: boolean; status: number; data: any } | null;

export default function Onboarding() {
  const [token, setToken] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const nav = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setToken(saved);
  }, []);

  const verify = async () => {
    const trimmed = token.trim();
    if (!trimmed.startsWith("dev_")) {
      toast.error("Device token must start with dev_");
      return;
    }
    setChecking(true);
    setResult(null);
    try {
      const res = await fetch(HEARTBEAT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${trimmed}`,
          apikey: ANON_KEY,
        },
        body: JSON.stringify({
          app_version: "onboarding-wizard",
          battery_level: 100,
          signal_strength: 4,
          internet_type: "web",
        }),
      });
      const data = await res.json().catch(() => ({}));
      setResult({ ok: res.ok, status: res.status, data });
      if (res.ok) {
        localStorage.setItem(LS_KEY, trimmed);
        toast.success("Token verified — device is online!");
      } else {
        toast.error(data?.error || `Verification failed (${res.status})`);
      }
    } catch (e: any) {
      setResult({ ok: false, status: 0, data: { error: e?.message || "Network error" } });
      toast.error("Network error during verification");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Seo title="Onboarding — B-TEXTMAN" description="Connect your Android gateway by pasting the device token and verifying it with a heartbeat call." canonical="https://btextman.lovable.app/onboarding" />

      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-md bg-gradient-primary flex items-center justify-center shadow-glow">
          <Smartphone className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Connect your Android gateway</h1>
          <p className="text-sm text-muted-foreground">Three steps to link your phone — takes under a minute.</p>
        </div>
      </div>

      <Card className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="rounded-full h-6 w-6 p-0 flex items-center justify-center">1</Badge>
          <h2 className="font-semibold">Register a device</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          If you don't already have a token, register one in the dashboard. The dialog shows the <code className="text-xs">dev_…</code> token <strong>only once</strong> — copy it before closing.
        </p>
        <div className="flex gap-2">
          <Link to="/devices"><Button variant="outline">Open Devices →</Button></Link>
          <Link to="/api-keys"><Button variant="ghost">…or use an API key</Button></Link>
        </div>
      </Card>

      <Card className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="rounded-full h-6 w-6 p-0 flex items-center justify-center">2</Badge>
          <h2 className="font-semibold">Paste the device token into your Android app</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Open the gateway app on your phone, go to <em>Settings → Gateway</em>, and paste the token. The app will store it in EncryptedSharedPreferences and start the foreground service.
        </p>
        <div className="rounded-md bg-muted p-3 text-xs font-mono space-y-1">
          <div>BASE_URL = {SUPABASE_URL}</div>
          <div>ANON_KEY = {ANON_KEY.slice(0, 24)}…</div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(`BASE_URL=${SUPABASE_URL}\nANON_KEY=${ANON_KEY}`); toast.success("Copied"); }}>
          <Copy className="h-3 w-3 mr-1" /> Copy app config
        </Button>
      </Card>

      <Card className="p-5 space-y-4 border-primary/40">
        <div className="flex items-center gap-2">
          <Badge className="rounded-full h-6 w-6 p-0 flex items-center justify-center">3</Badge>
          <h2 className="font-semibold">Verify with a heartbeat</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Paste your <code className="text-xs">dev_…</code> token below. We'll POST a one-shot heartbeat to confirm the gateway accepts it.
        </p>
        <div className="space-y-2">
          <Label htmlFor="dev-token">Device token</Label>
          <div className="flex gap-2">
            <Input
              id="dev-token"
              placeholder="dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono text-xs"
              autoComplete="off"
              spellCheck={false}
            />
            <Button onClick={verify} disabled={checking || !token.trim()}>
              {checking ? <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Checking…</> : <><ShieldCheck className="h-4 w-4 mr-1" />Verify</>}
            </Button>
          </div>
        </div>

        {result && (
          <div className={`rounded-md border p-3 space-y-2 ${result.ok ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"}`}>
            <div className="flex items-center gap-2 text-sm">
              {result.ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Badge variant="destructive">HTTP {result.status || "ERR"}</Badge>}
              <span className={result.ok ? "text-success font-medium" : "text-destructive font-medium"}>
                {result.ok ? "Token verified — device is online!" : "Verification failed"}
              </span>
            </div>
            <pre className="text-[11px] bg-muted rounded p-2 overflow-auto max-h-48"><code>{JSON.stringify(result.data, null, 2)}</code></pre>
            {result.ok && (
              <Button onClick={() => nav("/devices")} className="mt-2">
                Continue to Devices <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
