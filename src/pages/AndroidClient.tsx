import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Smartphone } from "lucide-react";

const SUPABASE_URL = "https://rtgcrclgmvcmrjpvtpwm.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Z2NyY2xnbXZjbXJqcHZ0cHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU0NTEsImV4cCI6MjA3MDQzMTQ1MX0.JR45nTPTScLaObpXQM-VzQ50ODRJTzakrvPOA3HldCM";

const KOTLIN_SAMPLE = `// build.gradle (app)  - add:
//   implementation "io.github.jan-tennert.supabase:realtime-kt:2.6.0"
//   implementation "io.github.jan-tennert.supabase:postgrest-kt:2.6.0"
//   implementation "io.ktor:ktor-client-android:2.3.12"

object BTextman {
  const val URL = "${SUPABASE_URL}"
  const val ANON = "${ANON_KEY}"
}

class GatewayService : Service() {
  private lateinit var supabase: SupabaseClient
  private var deviceToken: String = ""   // saved after /device-register

  override fun onCreate() {
    supabase = createSupabaseClient(BTextman.URL, BTextman.ANON) {
      install(Realtime); install(Postgrest)
    }
    startHeartbeat()
    listenForMessages()
  }

  /** 1. REGISTER (run once with an API key from the dashboard) */
  suspend fun register(apiKey: String, name: String, phone: String) {
    val res = HttpClient(Android).post("\${BTextman.URL}/functions/v1/device-register") {
      header("Authorization", "Bearer \$apiKey")
      contentType(ContentType.Application.Json)
      setBody("""{"device_name":"\$name","phone_number":"\$phone","sim_slot":1}""")
    }
    val json = JSONObject(res.bodyAsText())
    deviceToken = json.getString("device_token")
    prefs.edit().putString("device_token", deviceToken).apply()
  }

  /** 2. HEARTBEAT every 30 seconds */
  private fun startHeartbeat() = scope.launch {
    while (isActive) {
      HttpClient(Android).post("\${BTextman.URL}/functions/v1/device-heartbeat") {
        header("Authorization", "Bearer \$deviceToken")
        contentType(ContentType.Application.Json)
        setBody("""{"battery_level": \${battery()},"signal_strength": \${signal()},"internet_type":"\${netType()}","app_version":"1.0"}""")
      }
      delay(30_000)
    }
  }

  /** 3. REALTIME — listen for new messages and send via SmsManager */
  private fun listenForMessages() = scope.launch {
    val channel = supabase.realtime.channel("device:\$deviceToken")
    channel.postgresChangeFlow<PostgresAction.Insert>(schema = "public") {
      table = "messages"
    }.onEach { change ->
      val row = change.record
      val id = row["id"].toString()
      val to = row["recipient"].toString()
      val text = row["message"].toString()
      try {
        SmsManager.getDefault().sendTextMessage(to, null, text, null, null)
        reportStatus(id, "sent")
      } catch (e: Exception) {
        reportStatus(id, "failed", e.message)
      }
    }.launchIn(this)
    channel.subscribe()
  }

  /** 4. STATUS update back to server */
  suspend fun reportStatus(messageId: String, status: String, err: String? = null) {
    HttpClient(Android).post("\${BTextman.URL}/functions/v1/device-status-update") {
      header("Authorization", "Bearer \$deviceToken")
      contentType(ContentType.Application.Json)
      setBody("""{"message_id":"\$messageId","status":"\$status","error_message":\${err?.let { "\"\$it\"" } ?: "null"}}""")
    }
  }
}`;

export default function AndroidClient() {
  const copy = (s: string) => { navigator.clipboard.writeText(s); toast.success("Copied"); };
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-gradient-primary flex items-center justify-center shadow-glow">
          <Smartphone className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Android Gateway Client</h1>
          <p className="text-sm text-muted-foreground">Connect a physical Android phone with a SIM card as an SMS sender.</p>
        </div>
      </div>

      <Card className="p-5 space-y-4">
        <h2 className="font-semibold">Connection credentials</h2>
        <p className="text-sm text-muted-foreground">Paste these into the Android app — they're public client identifiers (safe to embed in mobile binaries).</p>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Supabase URL</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 rounded-md bg-muted text-sm break-all">{SUPABASE_URL}</code>
              <Button size="sm" variant="outline" onClick={() => copy(SUPABASE_URL)}><Copy className="h-3 w-3" /></Button>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Supabase anon (public) key</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 rounded-md bg-muted text-xs break-all">{ANON_KEY}</code>
              <Button size="sm" variant="outline" onClick={() => copy(ANON_KEY)}><Copy className="h-3 w-3" /></Button>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">API key (Bearer for /device-register)</div>
            <p className="text-sm text-muted-foreground">Create one under <a href="/api-keys" className="underline text-primary">Developer → API Keys</a>. Copy it once — you'll never see it again.</p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Device name & device token</div>
            <p className="text-sm text-muted-foreground">
              <strong>Device name</strong> = any label you choose in the app (e.g. <code>Samsung-A12-Nairobi-1</code>). It's sent in the <code>device_name</code> field of <code>/device-register</code>.
              <br />
              <strong>Device token</strong> = returned by the server in the <code>/device-register</code> response. Save it in SharedPreferences and send it as <code>Authorization: Bearer &lt;token&gt;</code> on every heartbeat and status update.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Setup checklist</h2>
          <Badge>4 steps</Badge>
        </div>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>In the dashboard, create an <strong>API key</strong> (Developer → API Keys).</li>
          <li>Install the gateway APK on the Android phone, grant <code>SEND_SMS</code> &amp; battery-unrestricted.</li>
          <li>Enter the URL, anon key and API key in the app's first-run screen. Tap <em>Register</em>.</li>
          <li>The app starts a foreground service: heartbeats every 30s and listens to realtime <code>messages</code> inserts.</li>
        </ol>
      </Card>

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
