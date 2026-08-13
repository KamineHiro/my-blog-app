import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Injects Cloudflare bindings (D1, etc.) into `next dev` via wrangler getPlatformProxy.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Keep the config minimal; OpenNext handles the Cloudflare adapter at build time.
};

export default nextConfig;
