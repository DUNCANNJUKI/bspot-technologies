# B-TEXTMAN — Cloud SMS Gateway

> Programmable SMS gateway that turns Android phones with real SIM cards into a REST API with realtime delivery reports.
>
> Live: <https://btextman.lovable.app>

B-TEXTMAN is a multi-tenant SMS platform. A web dashboard (this repo) manages clients, devices, API keys, webhooks, bulk campaigns, and analytics; companion Android phones run a foreground gateway service that consumes queued messages from Supabase Realtime and reports delivery status back to the server.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Frontend | React 18 · Vite 5 · TypeScript 5 · Tailwind v3 · shadcn-ui |
| Routing | react-router-dom v6 |
| State | React Query + Supabase Realtime |
| Backend | Supabase (Postgres + Edge Functions + Realtime + Auth) |
| Email | Resend (via edge function) |
| Hosting | Lovable / any static host (see Dockerfile + nginx.conf) |

---

## Repository layout

```
src/
  pages/            # route components (Dashboard, Devices, Messages, ApiKeys, Onboarding, …)
  components/       # AppLayout, AppSidebar, Seo, ThemeProvider, shadcn ui/*
  lib/              # auth context, uiPrefs (localStorage), utils
  integrations/
    supabase/       # generated client + types (do not edit types.ts)
supabase/
  config.toml
  functions/
    device-register/        # exchange API key → device_token
    device-heartbeat/       # device → server keepalive + pending_sms response
    device-status-update/   # device → server message status reports
    send-sms/               # client → server enqueue
    bulk-send/              # CSV / template bulk fan-out
    message-status/         # external status fetch
    webhook-dispatch/       # outbound webhook delivery
    webhook-test/
    account-stats/
    bootstrap-superadmin/
    claim-super-admin/
    requeue-stuck-messages/
public/
  My_mysql_db.sql   # MySQL 8 mirror of the public schema (for self-hosting)
  robots.txt sitemap.xml llms.txt
docs/
  ANDROID_APP_BUILDER_PROMPT.md   # copy-paste spec for an Android client builder
  ANDROID_APP_BUILDER_PROMPT.md   # spec for an Android builder LLM
  DEPLOYMENT.md DEVELOPMENT.md LOCAL_SETUP.md TROUBLESHOOTING.md EXPORT_GUIDE.md BACKUP_GUIDE.md
```

---

## Quick start (local dev)

```bash
npm install            # or bun install
cp .env.example .env   # fill VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY
npm run dev            # → http://localhost:8080
```

The Vite dev server reloads on save. Edge functions deploy automatically when changes are pushed to the connected Supabase project — no manual deploy step.

### Production build

```bash
npm run build          # outputs dist/
npm run preview        # smoke-test dist/ locally
docker build -t btextman .   # optional: nginx-served container
```

---

## Auth & roles

- All sign-in is via Supabase Auth (email + password). Reset-password flow at `/reset-password`.
- A new sign-up auto-creates a `profiles` row, a `clients` row (their tenant), and a `user_roles` row with role `client_user`.
- Roles live in `public.user_roles`. Never store roles on `profiles` — the `has_role()` and `is_admin()` security-definer functions are the only safe check.
- First user can self-promote to `super_admin` from Settings → Super admin (one-time).

---

## Device onboarding (Option 1 — fastest)

1. Dashboard → **Devices → Register device** → enter name + phone → Create.
2. Copy the `dev_…` token from the dialog (shown **once**).
3. Open the Android gateway app, paste the token into Settings → Gateway.
4. Web wizard: **/onboarding** — paste the same token and click **Verify** to fire a one-shot `/device-heartbeat`. A 200 confirms the device is online.

## Device onboarding (Option 2 — programmatic)

1. Dashboard → **API Keys → New API key** → copy the `btx_…` key (shown once).
2. From your provisioning system:

```bash
curl -X POST https://rtgcrclgmvcmrjpvtpwm.supabase.co/functions/v1/device-register \
  -H "apikey: <SUPABASE_ANON_KEY>" \
  -H "Authorization: Bearer btx_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"device_name":"Phone-1","phone_number":"+254700000000","sim_slot":1,"android_version":"14","app_version":"1.0"}'
```

3. Response includes `device_token` (`dev_…`) — ship it to the phone (Bluetooth, QR, MDM…).

> **Both headers required.** The Supabase gateway needs `apikey: <anon>` (public, safe to ship in the APK) *and* `Authorization: Bearer <btx_…>`. The function itself runs with `verify_jwt = false` so the JWT is not validated, but the gateway still expects the anon header.

---

## Android client contract

Build instructions for the gateway app live in **[docs/ANDROID_APP_BUILDER_PROMPT.md](docs/ANDROID_APP_BUILDER_PROMPT.md)**. The short version:

| Endpoint | Auth | Purpose |
|----------|------|---------|
| `POST /functions/v1/device-register` | `Bearer btx_…` (API key) | Exchange API key for permanent `dev_…` token. Run once. |
| `POST /functions/v1/device-heartbeat` | `Bearer dev_…` | Every 15–30 s. Body: `{battery_level, signal_strength, internet_type, app_version, delivered_ids[]}`. Returns `{pending_sms: […]}` as a polling fallback. |
| `POST /functions/v1/device-status-update` | `Bearer dev_…` | Per-message report: `{message_id, status: processing\|sent\|delivered\|failed, error_message?}`. |
| Realtime WSS `…/realtime/v1/websocket` | anon key + `Bearer dev_…` | Subscribe topic `device:<device_token>` → event `messages.pending`. Fall back to polling on `CHANNEL_ERROR`/`TIMED_OUT`/`CLOSED` after 3 reconnects (exponential backoff 2s→30s). |

The web dashboard subscribes to the same topic via `device:<device_token>` and de-dupes status rows using a monotonic status rank (`queued < processing < sent < delivered=failed`), so out-of-order realtime + polling updates never regress a row.

---

## Database

The public schema is documented in `public/My_mysql_db.sql` (MySQL 8 mirror) and in the auto-generated `src/integrations/supabase/types.ts` (never edit by hand — re-pulled from the API).

Tables:

`clients` · `profiles` · `user_roles` · `devices` · `device_logs` · `messages` · `message_events` · `bulk_campaigns` · `api_keys` · `api_key_request_logs` · `webhooks` · `webhook_deliveries` · `settings`

All public-schema tables have RLS enabled. Common policy pattern:

```sql
client_id = get_user_client_id(auth.uid()) OR is_admin(auth.uid())
```

Admin-only delete is enforced in UI **and** by RLS. Edge functions use `SUPABASE_SERVICE_ROLE_KEY` internally to bypass RLS where needed.

---

## Webhooks

Configure outbound webhook URLs in **/webhooks**. Events fired:

`message.queued · message.processing · message.sent · message.delivered · message.failed · device.online · device.offline`

Each delivery is signed (HMAC-SHA256 over the JSON body using the webhook's `secret`) and logged in `webhook_deliveries` with full request/response, attempt count, and duration. Failures auto-retry with exponential backoff; after 10 attempts the webhook is auto-disabled.

---

## Security posture

- Every edge function: Zod validation + input sanitization + per-IP rate limit.
- `api_keys` stored as SHA-256 hashes, prefix-indexed; full key shown **once** on creation/rotation.
- `service_role_key` never reaches the browser. Frontend always uses the publishable anon key.
- All admin/destructive operations require an explicit role check via `is_admin()` or `has_role()` SECURITY DEFINER functions.
- See `docs/TROUBLESHOOTING.md` for the security findings checklist.

---

## License

MIT — see `LICENSE`.
