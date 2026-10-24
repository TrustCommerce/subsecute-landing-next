import { AI_BOTS } from "@/app/robots";
import { BUSINESS_URL } from "@/lib/business-structured-data";
import { businessIndexable } from "@/lib/business-release.mjs";

// Served at https://business.subsecute.com/robots.txt via the rewrite in
// src/proxy.ts. robots.txt is per-host, so the consumer file at
// src/app/robots.ts does not cover this domain and its AI-crawler allowlist
// does not apply here. This is that allowlist for the business host, plus a
// sitemap line pointing at this host's own sitemap rather than the consumer's.
export const dynamic = "force-dynamic";

export function GET() {
  const indexable = businessIndexable(
    process.env.BUSINESS_LANDING_ENABLED,
    process.env.BUSINESS_SEARCH_INDEXING,
  );

  // Before indexing is approved the file still answers, but it closes the
  // door. A 404 here would read as "no rules", which is an invitation.
  const body = indexable
    ? [
        "User-Agent: *",
        "Allow: /",
        "",
        ...AI_BOTS.flatMap((bot) => [`User-Agent: ${bot}`, "Allow: /", ""]),
        `Host: ${BUSINESS_URL}`,
        `Sitemap: ${BUSINESS_URL}/sitemap.xml`,
        "",
      ].join("\n")
    : ["User-Agent: *", "Disallow: /", ""].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": indexable
        ? "public, max-age=0, must-revalidate"
        : "private, no-store",
    },
  });
}
