# Android Gateway Client — Builder Spec

Copy-paste this entire document into your Android app builder (Cursor, Claude, ChatGPT, Lovable-Android, etc.) to generate a client that syncs reliably with the B-TEXTMAN gateway.

---

## 0. Identity

- **App name:** B-TEXTMAN Gateway
- **Min SDK:** 24 (Android 7.0) · **Target SDK:** 34
- **Language:** Kotlin · **UI:** Jetpack Compose · **HTTP:** OkHttp + kotlinx.serialization
- **Realtime:** `io.github.jan-tennert.supabase:realtime-kt` (or raw `okhttp3.WebSocket`)

## 1. Constants

```kotlin
object Gateway {
  const val BASE_URL  = "https://rtgcrclgmvcmrjpvtpwm.supabase.co/functions/v1"
  const val WSS_URL   = "wss://rtgcrclgmvcmrjpvtpwm.supabase.co/realtime/v1/websocket"
  const val ANON_KEY  = "eyJhbGciOi...JR45nTPTScLaObpXQM-VzQ50ODRJTzakrvPOA3HldCM"   // publishable, ship in APK
}
```

Every HTTPS call MUST send **both**:
- `apikey: <ANON_KEY>` (gateway requirement — without it Supabase returns 401 *"Invalid or missing API key"* before the function runs)
- `Authorization: Bearer <token>` (API key on first run, `dev_…` device token afterwards)
- `Content-Type: application/json`

## 2. Storage

- `EncryptedSharedPreferences` (Jetpack Security):
  - `device_token`  — the `dev_…` returned by `/device-register`
  - `device_id`     — uuid returned by `/device-register`
- Room DB tables: `outbox(message_id, recipient, body, attempts, next_attempt_at)`, `status_queue(message_id, status, error_message, attempts)`, `ack_queue(message_id)`.

Never log the device token. Never write it to plain SharedPreferences.

## 3. Endpoints

### 3.1 `POST /device-register` — first-run only

Request:
```json
{ "device_name": "Samsung-A12-Nairobi-1", "phone_number": "+254700000000",
  "sim_slot": 1, "android_version": "14", "app_version": "1.0" }
```
Auth: `Bearer btx_<API_KEY>`. Response:
```json
{ "device_id": "uuid", "device_token": "dev_…", "client_id": "uuid" }
```
Persist `device_token` and `device_id`. From this point onwards the API key is no longer needed.

### 3.2 `POST /device-heartbeat` — every 15 s foreground / 60 s background

Auth: `Bearer dev_…`. Request:
```json
{ "battery_level": 87, "signal_strength": 4, "internet_type": "wifi",
  "ip_address": "10.0.0.5", "app_version": "1.0",
  "delivered_ids": ["uuid", "uuid"] }
```
`delivered_ids` is the set of message IDs the device has successfully sent/delivered but whose individual `/device-status-update` POSTs have not yet been acknowledged. The server treats this list as authoritative — clear it locally only after the heartbeat returns 2xx.

Response:
```json
{ "pending_sms": [{ "id": "uuid", "phone_number": "+2547…", "content": "…", "sim_slot": 1 }] }
```

### 3.3 `POST /device-status-update` — per message

Auth: `Bearer dev_…`. Request:
```json
{ "message_id": "uuid", "status": "processing|sent|delivered|failed", "error_message": "…or null" }
```
Idempotent on the server — repeated terminal statuses are safe.

### 3.4 Realtime (preferred)

Subscribe to topic `device:<device_token>`. Event name `messages.pending`, payload `{ messages: [...] }`.
Connection lifecycle:
- Open with `?apikey=<ANON_KEY>&vsn=1.0.0`
- If state becomes `CHANNEL_ERROR` / `TIMED_OUT` / `CLOSED`, increment `reconnectAttempt`, sleep `min(30_000, 2_000 * 2^attempt)` ms, retry.
- After 3 consecutive failed reconnects, mark realtime as `fallback` and rely on heartbeat polling.
- On a successful `SUBSCRIBED`, reset `reconnectAttempt` to 0 and drop polling cadence to 60 s.

## 4. Sending loop

For each pending message (from realtime push OR `pending_sms` in a heartbeat response):

1. **De-dupe** against an LRU cache of the last 500 message IDs. If seen, skip.
2. `POST /device-status-update status=processing`.
3. `SmsManager.getDefault().sendMultipartTextMessage(to, null, parts, sentPIs, deliveredPIs)` with one `PendingIntent` per part.
   - `SMS_SENT.<id>` receiver: `RESULT_OK` → `status=sent`; else → `status=failed` with `error_message = resultCodeName(GENERIC_FAILURE | NO_SERVICE | NULL_PDU | RADIO_OFF | …)`.
   - `SMS_DELIVERED.<id>` receiver: `RESULT_OK` → `status=delivered`.
4. If any POST fails (network / 5xx / timeout), enqueue `{message_id, status, error_message}` into `status_queue` and replay before the next heartbeat. On 2xx, remove.
5. Always also add the id to the `ack_queue` so it rides the next heartbeat's `delivered_ids[]` until the server acks.

## 5. Foreground service + WorkManager

- `ForegroundService` runs forever with a persistent notification ("B-TEXTMAN gateway active").
- `PeriodicWorkRequest` every 15 min to re-start the service if killed.
- On boot: `BOOT_COMPLETED` receiver re-starts the service.
- Battery: show an in-app banner if `isIgnoringBatteryOptimizations(packageName)` is false, with a one-tap `ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` intent.

## 6. Manifest permissions

```xml
<uses-permission android:name="android.permission.SEND_SMS" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_NUMBERS" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />
```

Request `SEND_SMS` at runtime with a clear rationale dialog.

## 7. Networking

- OkHttp: `connectTimeout = 15s`, `readTimeout = 30s`, `writeTimeout = 30s`.
- Retry policy: exponential backoff `1, 2, 4, 8, 16, 30 s` (capped) on `IOException` or HTTP 5xx, max 10 attempts.
- HTTP 401 → wipe `device_token` and surface a re-onboard screen.
- HTTP 403 → stop the foreground service and surface "Device disabled — contact admin".

## 8. UI screens

| Screen | Purpose |
|--------|---------|
| **Onboarding** | Step 1: paste API key → POST `/device-register`. Step 2: confirm `device_name` and `phone_number`. Step 3: paste `dev_…` token (or auto-fill if just registered) → POST `/device-heartbeat` to verify → 200 = "Device online ✅". |
| **Dashboard** | Connection chip: `Realtime` (green pulse) · `Connecting…` (amber) · `Polling (fallback)` (red). Today's counters: sent / failed / queued. |
| **Outbox** | Live list of pending and recently-sent messages. Tap a row → status timeline. |
| **Logs** | Ring-buffer of last 200 events: `socket_open`, `socket_error`, `heartbeat`, `picked_up`, `sent`, `delivered`, `failed`, `retry`. |
| **Settings** | Token reset, battery-optimization banner, SIM-slot picker, "Export logs" button. |

## 9. Acceptance test

Send an SMS from the gateway dashboard to the device's number. Expected:

- Within **5 s** (realtime) or **30 s** (polling fallback) the message row in the dashboard flips `queued → processing → sent → delivered`.
- No row stays in `processing` longer than 90 s.
- Killing wifi mid-send → on reconnect the terminal status is replayed exactly once (no duplicates, no regressions to `processing`).
- Force-stopping the app → it re-launches within 15 min via WorkManager and resumes the outbox.
