import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440],
    imageSizes: [96, 160, 240, 320, 420, 560],
  },
  async headers() {
    // Spec site: keep it out of search so it never competes with gottintmd.com.
    // Set SITE_INDEXABLE=true only when this becomes the owner's live site.
    if (process.env.SITE_INDEXABLE === "true") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
