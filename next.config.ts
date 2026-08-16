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
  async redirects() {
    return [
      {
        // Renamed: the old slug claimed we ask you to fund a balance before a
        // renewal. We charge your saved payment method instead.
        source: "/blog/why-we-ask-you-to-fund-before-a-renewal",
        destination: "/blog/how-subsecute-pays-a-renewal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
