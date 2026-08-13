import { defineConfig } from "drizzle-kit";

// Migrations are generated with `drizzle-kit generate` and applied to D1 with
// `wrangler d1 migrations apply` (see package.json scripts). We only need dialect,
// schema and out here — no remote credentials required for generation.
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
});
