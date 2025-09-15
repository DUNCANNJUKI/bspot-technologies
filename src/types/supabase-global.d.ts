// Global shim to satisfy relative `./types` import used by read-only Supabase client.
declare module "./types" {
  export type Database = any;
}
