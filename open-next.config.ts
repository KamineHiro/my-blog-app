import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Incremental cache / tag cache can be added later (R2 / D1). Defaults are fine for a blog.
});
