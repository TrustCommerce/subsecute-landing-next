import { BUSINESS_PRICE_ROWS } from "@/lib/business-pricing";
import { BUSINESS_URL } from "@/lib/business-structured-data";
import { BUSINESS_FAQS } from "@/lib/business-faqs";
import { businessIndexable } from "@/lib/business-release.mjs";
import { SITE_URL } from "@/config";

// Served at https://business.subsecute.com/llms.txt via the rewrite in
// src/proxy.ts.
//
// llms.txt is a proposed convention, not a ranking factor, and no engine has
// committed to reading it. It costs one route to publish and the FAQ body is
// generated from the same array the page renders, so it cannot drift from
// what a crawler reads on the page itself. Treat it as cheap insurance.
export const dynamic = "force-dynamic";

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

  const body = `# Subsecute Business

Every company subscription on its own card.
Dollar and naira cards funded from one company naira wallet.
Subscription cards fund fixed bills on a schedule. Usage-based cards top up below a balance threshold. Expense cards are assigned to team members and funded on admin approval.
Admins and the cardholder receive WhatsApp reminders before renewals.

## Standard pricing
${BUSINESS_PRICE_ROWS.map(([label, value]) => `- ${label}: ${value}`).join("\n")}
Fees are shown before confirmation. Launch offers can reduce a quote.

## Questions and answers
${BUSINESS_FAQS.map(([q, a]) => `### ${q}\n\n${a}`).join("\n\n")}

## Links
- Business: ${BUSINESS_URL}/
- Pricing: ${BUSINESS_URL}/#pricing
- Personal: ${SITE_URL}/
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
