import { SITE_URL, APP_STORE_URL, PLAY_STORE_URL } from "@/config";
import { CONSUMER_FAQS } from "@/lib/consumer-faqs";
import { getAllPosts } from "@/lib/blog";

// llms.txt is a proposed convention for giving an answer engine a plain-text
// brief on a site. No engine has committed to reading it, so it is cheap
// insurance rather than a lever. What makes it worth keeping is that every
// claim below is generated from the same source the pages render from: the
// FAQ array, the blog index and config. It cannot drift.
export const revalidate = 300;

export function GET() {
  const posts = getAllPosts();

  const body = `# Subsecute

> Subsecute pays recurring bills for Nigerians on autopilot. Each
> international subscription gets its own virtual dollar card, funded from
> naira a few days before the renewal date, so the charge arrives with a name
> on it and the money is already there when the merchant asks.

Subsecute is a product of TrustCommerce Resources Ltd (RC 7131175). It
operates in Nigeria and is used by Nigerians at home and abroad. Apps are
published for iOS and Android.

## What it does

- Issues a separate virtual dollar card for each international subscription,
  such as Netflix, Spotify, ChatGPT Plus or Claude Pro.
- Funds that card from naira a few days before the renewal date, not on the
  day, using a saved card or a direct debit.
- Pays local recurring bills: airtime, data, power and cable.
- Closes a subscription's card when you cancel in Subsecute, so the
  merchant's next charge is declined.
- Runs a plan covering up to 25 people, each with their own monthly limit.
- Issues a shareable gift link so somebody else can cover one of your bills.
- Shows the fee, the exchange rate and the total before you confirm anything.

## What it does not do

- Cancelling in Subsecute closes the card; it does not close your account
  with the service. Cancel there too if you want the service gone for good.
- It is not a general-purpose spending card. It exists for recurring
  payments.

## Questions and answers

${CONSUMER_FAQS.map(([q, a]) => `### ${q}\n\n${a}`).join("\n\n")}

## Articles

${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join("\n")}

## Links

- Home: ${SITE_URL}/
- Articles: ${SITE_URL}/blog
- Subscription cost calculator: ${SITE_URL}/calculator
- Family plan: ${SITE_URL}/family
- Support: ${SITE_URL}/support
- iOS app: ${APP_STORE_URL}
- Android app: ${PLAY_STORE_URL}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
