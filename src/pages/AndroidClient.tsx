import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Smartphone, CheckCircle2, KeyRound, Radio, Send, Activity, ArrowRight } from "lucide-react";

const SUPABASE_URL = "https://rtgcrclgmvcmrjpvtpwm.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Z2NyY2xnbXZjbXJqcHZ0cHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU0NTEsImV4cCI6MjA3MDQzMTQ1MX0.JR45nTPTScLaObpXQM-VzQ50ODRJTzakrvPOA3HldCM";

const ENDPOINTS = {
  register: `${SUPABASE_URL}/functions/v1/device-register`,
  heartbeat: `${SUPABASE_URL}/functions/v1/device-heartbeat`,
  statusUpdate: `${SUPABASE_URL}/functions/v1/device-status-update`,
  realtime: `${SUPABASE_URL}/realtime/v1/websocket`,
};

const STEPS = [
  { id: 1, title: "Create API key", icon: KeyRound },
  { id: 2, title: "Register device", icon: Radio },
  { id: 3, title: "Heartbeat & realtime", icon: Activity },
  { id: 4, title: "Send & report", icon: Send },
];

export default function AndroidClient() {
  const { clientId } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("Samsung-A12-Nairobi-1");
  const [phone, setPhone] = useState("+254700000000");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (!clientId) return;
    supabase.from("api_keys").select("id").eq("client_id", clientId).eq("status", "active").limit(1)
      .then(({ data }) => setHasKey((data?.length ?? 0) > 0));
  }, [clientId]);

  const copy = (s: string) => { navigator.clipboard.writeText(s); toast.success("Copied"); };

  const KOTLIN_SAMPLE = `// Persistent registration + foreground service
object BTextman {
  const val URL = "${SUPABASE_URL}"
  const val ANON = "${ANON_KEY}"
}

class GatewayService : Service() {
  private val prefs by lazy { getSharedPreferences("btextman", MODE_PRIVATE) }
  private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

  override fun onCreate() {
    super.onCreate()
    startForeground(1, notification())
    val token = prefs.getString("device_token", null) ?: return stopSelf()
    startHeartbeat(token)
    listenForMessages(token)
  }

  /** 1) REGISTER (run from a setup screen with the API key) */
  suspend fun register(apiKey: String) {
    val res = HttpClient(Android).post("${ENDPOINTS.register}") {
      header("Authorization", "Bearer \$apiKey")
      contentType(ContentType.Application.Json)
      setBody("""{"device_name":"${'$'}{Build.MODEL}","phone_number":"\${phone()}","sim_slot":1,"android_version":"${'$'}{Build.VERSION.RELEASE}","app_version":"1.0"}""")
    }
    val token = JSONObject(res.bodyAsText()).getString("device_token")
    prefs.edit().putString("device_token", token).apply()   // <-- persisted
  }

  /** 2) HEARTBEAT every 30 seconds */
  private fun startHeartbeat(token: String) = scope.launch {
    while (isActive) {
      runCatching {
        HttpClient(Android).post("${ENDPOINTS.heartbeat}") {
          header("Authorization", "Bearer \$token")
          contentType(ContentType.Application.Json)
          setBody("""{"battery_level":\${battery()},"signal_strength":\${signal()},"internet_type":"\${netType()}","app_version":"1.0"}""")
        }
      }
      delay(30_000)
    }
  }

  /** 3) REALTIME — listen for new messages and send via SmsManager */
  private fun listenForMessages(token: String) = scope.launch {
    val supabase = createSupabaseClient(BTextman.URL, BTextman.ANON) {
      install(Realtime); install(Postgrest)
    }
    val channel = supabase.realtime.channel("device:\$token")
    channel.postgresChangeFlow<PostgresAction.Insert>(schema = "public") {
      table = "messages"
    }.onEach { change ->
      val row = change.record
      val id = row["id"].toString()
      val to = row["recipient"].toString()
      val text = row["message"].toString()
      try {
        SmsManager.getDefault().sendTextMessage(to, null, text, null, null)
        reportStatus(token, id, "sent")
      } catch (e: Exception) {
        reportStatus(token, id, "failed", e.message)
      }
    }.launchIn(this)
    channel.subscribe()
  }

  /** 4) STATUS update back to server */
  suspend fun reportStatus(token: String, messageId: String, status: String, err: String? = null) {
    HttpClient(Android).post("${ENDPOINTS.statusUpdate}") {
      header("Authorization", "Bearer \$token")
      contentType(ContentType.Application.Json)
      setBody("""{"message_id":"\$messageId","status":"\$status","error_message":\${err?.let { "\\"\$it\\"" } ?: "null"}}""")
    }
  }
}`;

  const ManifestRow = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2">
        <code className="flex-1 px-3 py-2 rounded-md bg-muted text-xs break-all">{value}</code>
        <Button size="icon" variant="outline" onClick={() => copy(value)}><Copy className="h-3 w-3" /></Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-gradient-primary flex items-center justify-center shadow-glow">
          <Smartphone className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Android Gateway Setup</h1>
          <p className="text-sm text-muted-foreground">First-run wizard for connecting a physical Android phone with a SIM card.</p>
        </div>
      </div>

      {/* Stepper */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1 min-w-[140px]">
                <button onClick={() => setStep(s.id)} className={`h-9 w-9 rounded-full flex items-center justify-center border ${done ? "bg-success text-success-foreground border-success" : active ? "bg-primary text-primary-foreground border-primary shadow-glow" : "bg-muted border-border text-muted-foreground"}`}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </button>
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Step {s.id}</div>
                  <div className="text-sm font-medium">{s.title}</div>
                </div>
                {i < STEPS.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground hidden md:block" />}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step content */}
      {step === 1 && (
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-semibold">1. Create an API key</h2>
            {hasKey ? <Badge>You already have an active key</Badge> : <Badge variant="secondary">No active key yet</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">The Android app uses an API key once during first-run to call <code>/device-register</code>. The server returns a permanent <strong>device token</strong> that replaces it for every subsequent call.</p>
          <div className="flex gap-2">
            <a href="/api-keys"><Button><KeyRound className="h-4 w-4 mr-1" />Open API Keys</Button></a>
            <Button variant="outline" onClick={() => setStep(2)}>I have a key — next<ArrowRight className="h-4 w-4 ml-1" /></Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-5 space-y-4">
          <h2 className="font-semibold">2. Register the device</h2>
          <p className="text-sm text-muted-foreground">On first run, the app POSTs to <code>/device-register</code> with the API key as <code>Bearer</code>. The response contains <code>device_token</code> — save it in <code>SharedPreferences</code> and use it for every subsequent call.</p>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Device name (suggestion)</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="space-y-1"><Label>Phone number (E.164)</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          </div>

          <div className="space-y-2">
            <ManifestRow label="Endpoint" value={ENDPOINTS.register} />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Sample cURL</div>
              <pre className="text-[11px] bg-muted rounded p-3 overflow-auto"><code>{`curl -X POST ${ENDPOINTS.register} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify({ device_name: name, phone_number: phone, sim_slot: 1, android_version: "14", app_version: "1.0" })}'`}</code></pre>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Expected response</div>
              <pre className="text-[11px] bg-muted rounded p-3 overflow-auto"><code>{`{
  "device_id": "uuid",
  "device_token": "dt_xxxxxxxxxxxxxxxxxxxxxxxx",   // store this in SharedPreferences
  "client_id": "uuid"
}`}</code></pre>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Next<ArrowRight className="h-4 w-4 ml-1" /></Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-5 space-y-4">
          <h2 className="font-semibold">3. Background heartbeat &amp; realtime subscription</h2>
          <p className="text-sm text-muted-foreground">Run a foreground <code>Service</code> that (a) sends a heartbeat every 30s and (b) subscribes to Realtime <code>postgres_changes</code> on <code>public.messages</code> filtered to this device's channel.</p>

          <ManifestRow label="Heartbeat endpoint (POST, Bearer = device_token)" value={ENDPOINTS.heartbeat} />
          <ManifestRow label="Realtime websocket" value={ENDPOINTS.realtime} />
          <ManifestRow label="Supabase URL" value={SUPABASE_URL} />
          <ManifestRow label="Supabase anon key" value={ANON_KEY} />

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Heartbeat payload</div>
            <pre className="text-[11px] bg-muted rounded p-3 overflow-auto"><code>{`{
  "battery_level": 87,
  "signal_strength": 4,
  "internet_type": "wifi",
  "app_version": "1.0"
}`}</code></pre>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={() => setStep(4)}>Next<ArrowRight className="h-4 w-4 ml-1" /></Button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-5 space-y-4">
          <h2 className="font-semibold">4. Send the SMS &amp; report status</h2>
          <p className="text-sm text-muted-foreground">When the realtime channel fires an <code>INSERT</code> on <code>messages</code>, call <code>SmsManager.sendTextMessage()</code>, then POST the result back so the server can fire <code>message.sent</code> / <code>message.failed</code> webhooks.</p>

          <ManifestRow label="Status update endpoint" value={ENDPOINTS.statusUpdate} />

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Status update payload</div>
            <pre className="text-[11px] bg-muted rounded p-3 overflow-auto"><code>{`{
  "message_id": "uuid-from-realtime-event",
  "status": "sent" | "delivered" | "failed",
  "error_message": null
}`}</code></pre>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <CheckCircle2 className="inline h-4 w-4 text-success mr-1" />
              You're done — open <a href="/devices" className="underline text-primary">Devices</a> to watch the new phone come online.
            </div>
            <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
          </div>
        </Card>
      )}

      {/* Reference Kotlin implementation always visible */}
      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Kotlin reference implementation</h2>
          <Button size="sm" variant="outline" onClick={() => copy(KOTLIN_SAMPLE)}><Copy className="h-3 w-3 mr-1" />Copy</Button>
        </div>
        <pre className="text-xs bg-muted rounded-md p-4 overflow-auto max-h-[480px]"><code>{KOTLIN_SAMPLE}</code></pre>
      </Card>
    </div>
  );
}
