import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The blog routes read markdown from content/blog at runtime (ISR
  // revalidation reveals date-gated posts on their day). Bundle those files
  // into the serverless functions so the reads work in production, not just
  // at build time.
  outputFileTracingIncludes: {
    "/blog": ["content/blog/**/*"],
    "/blog/**": ["content/blog/**/*"],
    "/sitemap.xml": ["content/blog/**/*"],
  },
};

export default nextConfig;
