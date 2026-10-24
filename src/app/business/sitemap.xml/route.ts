import { BUSINESS_URL } from "@/lib/business-structured-data";
import { businessIndexable } from "@/lib/business-release.mjs";

// Served at https://business.subsecute.com/sitemap.xml via the rewrite in
// src/proxy.ts. One URL today because the property is one page; it exists so
// that adding the second does not also mean discovering the file is missing.
export const dynamic = "force-dynamic";

const PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
];

export function GET() {
  if (
    !businessIndexable(
      process.env.BUSINESS_LANDING_ENABLED,
      process.env.BUSINESS_SEARCH_INDEXING,
    )
  )
    return new Response("Not found", {
      status: 404,
      headers: { "Cache-Control": "private, no-store" },
    });

  const entries = PAGES.map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${BUSINESS_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    },
  );
}
