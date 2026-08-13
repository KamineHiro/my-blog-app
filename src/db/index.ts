import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";
import * as schema from "./schema";

/**
 * Returns a Drizzle client bound to the Cloudflare D1 database (`DB` binding).
 * Wrapped in React `cache()` so it is created once per request.
 *
 * During `next dev`, bindings are injected by `initOpenNextCloudflareForDev()`
 * (see next.config.ts); in production it runs on the Workers runtime.
 */
export const getDb = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
});

export { schema };
