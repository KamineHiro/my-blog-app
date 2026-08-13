// Types for the Cloudflare bindings declared in wrangler.jsonc.
// Committed by hand so the project type-checks without running `wrangler types`.
// You can regenerate/extend this with `npm run cf-typegen` once logged in.
/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  ASSETS: Fetcher;
  WORKER_SELF_REFERENCE: Fetcher;
}
