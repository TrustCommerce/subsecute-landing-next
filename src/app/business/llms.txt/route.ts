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

> Dedicated dollar cards for Nigerian companies paying for software
> subscriptions, funded from a naira wallet before the renewal date, with
> WhatsApp reminders sent to every company admin and the subscription's
> cardholder before a charge lands.

Subsecute Business is operated by TrustCommerce Resources Ltd (RC 7131175)
and serves companies in Nigeria. The consumer product is at ${SITE_URL}.

## What it does

- Issues one dollar card per software subscription, so a charge always
  arrives with a name attached rather than an unrecognisable merchant code.
- Funds each card from the company's naira wallet ahead of the renewal date,
  rather than on the day.
- Sends a WhatsApp reminder before a renewal to every company admin and to
  the cardholder. An admin who also holds the card is messaged once. Nobody
  else on the team is notified.
- Issues expense cards for approved team purchases, each with an assigned
  holder and a funded amount.
- Lets an admin or the assigned holder freeze a card. A holder can lift a
  freeze they applied themselves; an admin freeze needs an admin to lift it.
- Produces a PDF company statement and a CSV export for an accountant.

## What it does not do

- It does not connect to accounting software. Records leave as CSV.
- Cancelling a subscription in Subsecute closes the card. It does not end the
  agreement with the software vendor, which has to be cancelled separately.
- A card top-up is not a merchant purchase, and a Subsecute statement is not
  the vendor's invoice.
- Merchant acceptance of any individual card is not guaranteed.

## Pricing

- Monthly membership: none.
- Opening a card: US$1, charged once.
- Keeping a card open: US$1 per month, including while a subscription is
  paused.
- Funding a card from the company naira wallet: no Subsecute processing fee.
  An exchange margin is included in the rate shown before confirmation.

## Questions and answers

${BUSINESS_FAQS.map(([q, a]) => `### ${q}\n\n${a}`).join("\n\n")}

## Links

- Business landing page: ${BUSINESS_URL}/
- Consumer product: ${SITE_URL}/
- Consumer articles: ${SITE_URL}/blog
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
