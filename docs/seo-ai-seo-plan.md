# SEO and AI SEO plan

Written 2026-10-24. The goal set for this work: be what an answer engine names
first when someone asks about cards or virtual cards, whether they ask from
Lagos or from anywhere else.

## The honest read

Two things came out of the research that should shape everything below.

The first is about tactics. A 2026 arXiv survey of generative-engine
optimization work from 2023 onward found that the reproducible levers are
topical relevance and simply being retrievable. Generic GEO heuristics
transfer badly between engines, and rewriting a page to bait citations can
make it *less* likely to be retrieved in the first place. So there is no trick
layer to buy here. What works is being genuinely the best document for a
question, and being visible enough to be pulled in at all.

The second is about where the answers actually come from. Searching "best
virtual dollar card Nigeria 2026" returns almost nothing from the card
providers themselves. It returns nairaCompare, NaijaTechGuide, Techeconomy,
TechCabal and PhotonPay. Cardtonic and Geegpay are the names an engine gives
back because *those* pages say so. Then I searched for Subsecute and found
nothing at all: no mention anywhere on the open web. To an answer engine the
brand does not currently exist as an entity.

That reframes the target. "Best virtual dollar card in Nigeria" is a
general-purpose question, and the honest answer to it is Cardtonic at $1.50
once with no monthly fee, against Subsecute at US$1 to open plus US$1 a month.
Subsecute loses that comparison on price and should not pick that fight
head-on. What Subsecute wins, and wins uncontested, is every version of the
question that carries the word *subscription*: a card that funds itself before
a renewal, dies when you cancel, and tells you before it is charged. Nobody
else in the Nigerian market is answering that.

So the strategy is to own the subscription qualifier completely, and to earn a
place in the general listicles as the subscription specialist rather than as a
cheaper Cardtonic.

## Phase 0 — shipped in this pass

All of this is in the working tree now, verified against a clean
`pnpm build` and 14 passing node tests.

**The business property had nothing.** It now has:

- Four JSON-LD graphs (`src/lib/business-structured-data.ts`): `WebSite`,
  `PaymentCard` with the three real offers, `FAQPage`, and the consumer
  `Organization` node imported rather than redeclared. Because both properties
  emit `@id: https://www.subsecute.com/#organization`, an engine building an
  entity graph merges them into one company instead of treating the subdomain
  as a stranger with a similar name.
- The nine FAQ answers extracted to `src/lib/business-faqs.ts`, feeding both
  the rendered `<details>` and the `FAQPage` from one array. Rendered output
  diffed byte-identical before and after. This is the same drift guard
  `consumer-faqs.ts` exists for.
- Its own `robots.txt`, `sitemap.xml` and `llms.txt`, served on the business
  host through rewrites in `src/proxy.ts`. These could not come from the
  consumer files: robots.txt is per-host, so the AI-crawler allowlist in
  `src/app/robots.ts` does not cover that domain at all, and serving the
  consumer sitemap there would point crawlers at the wrong host.
- A generated 1200×630 Open Graph image (`opengraph-image.tsx`) and
  `summary_large_image`. Previously every share of this link rendered as a bare
  text stub.
- `og:locale`, `og:type`, keywords, geo meta, and `twitter:site`.

**Indexing is now a switch, not an edit.** `businessIndexable()` requires both
`BUSINESS_LANDING_ENABLED=true` and `BUSINESS_SEARCH_INDEXING=true`, fails
closed on anything else, and controls the robots meta tag, the robots.txt body
and whether the sitemap and llms.txt answer at all. Before approval
robots.txt returns `Disallow: /` rather than 404, because a missing robots file
reads as "no rules", which is an invitation. The release note in
`docs/business-landing-release.md` is satisfied by default.

**On the consumer side:**

- A `PaymentCard` node (`CARD_SCHEMA`) describing the card as its own entity,
  separate from the `SoftwareApplication` node describing the app. "What is
  this app" and "what card is this" are different questions.
- `sameAs` on the Organization, linking both app store listings and the four
  social profiles. For a brand with no web presence this is the single
  cheapest entity signal available.
- `BreadcrumbList` on every article.
- `/llms.txt`, generated from the FAQ array, the blog index and config, so it
  cannot drift from what a crawler reads on the pages themselves.

A caveat worth recording: llms.txt is a proposed convention and no engine has
committed to reading it. It is cheap insurance, not a lever. Do not expect
anything from it.

## Phase 1 — exist as an entity (do this first, it is the bottleneck)

Nothing in Phase 2 compounds until the brand is a known thing. None of this is
code.

1. **Google Search Console and Bing Webmaster Tools**, as separate properties
   for `www.subsecute.com` and `business.subsecute.com`. Submit both sitemaps.
   Bing matters out of proportion to its search share because ChatGPT's search
   mode runs on Bing's index.
2. **Claim the entity surfaces**: Crunchbase, a LinkedIn company page,
   Wikidata, Product Hunt, G2 and Capterra. These are the pages an engine reads
   to decide a company is real, and most are free.
3. **App store listings are retrievable documents.** Nigerian card apps showed
   up in my searches via their `apps.apple.com` pages. Treat both listings as
   SEO surfaces: the description's first two lines, the keyword field, the
   screenshots' captions.
4. **Earn real reviews.** `STORE_RATING` is still 0, so the rating block stays
   hidden and `AggregateRating` cannot ship. Review count is one of the
   strongest signals a listicle uses to rank providers. This gates a real
   schema improvement.
5. **Link the two properties together.** The consumer site currently links to
   `business.subsecute.com` zero times, from anywhere. A subdomain with no
   inbound links from a domain Google already trusts has no crawl path at all.
   A footer link is the minimum. This one is user-facing, so it needs your
   call on placement.

On the subdomain itself: Google treats subdomains as largely separate for
authority. `www.subsecute.com/business` would have inherited everything the
blog has earned. The CloudFront routing is built around the subdomain now and
moving it is not worth the breakage, but it does mean every business-topic
article should live on `www.subsecute.com/blog` and link across, rather than
on the subdomain where it would start from zero.

## Phase 2 — content, organised by what someone actually types

Fifteen posts exist. They are good and they already cover the strongest
cluster. Here is what is missing, in priority order.

### A. Service × country (highest value, lowest risk)

Four exist: Netflix, Spotify, ChatGPT Plus, Claude. Each is a real long-tail
query that Subsecute legitimately answers, and the format is proven. Extend it
to roughly twenty more, in rough order of Nigerian search demand:

YouTube Premium, Apple Music, Amazon Prime Video, Canva Pro, Adobe Creative
Cloud, Microsoft 365, Google One, iCloud+, Notion, Figma, Grammarly, Coursera,
Udemy, LinkedIn Premium, GitHub Copilot, Cursor, Midjourney, Perplexity Pro,
Steam, PlayStation Plus, Xbox Game Pass, Disney+.

These are cheap to write because the mechanism is identical each time, and
each one carries a `HowTo` graph, which is what lets an engine lift the steps
out as a structured answer.

### B. The head term, approached honestly

One pillar page: *Virtual dollar cards in Nigeria — how they work, what they
cost, and which to use for what.* It has to name Cardtonic, Geegpay, Chipper
Cash, Eversend, Raenest and Klasha, with current fees, and it has to say
plainly where each beats Subsecute. A comparison that only flatters the
publisher does not get cited, and the research is clear that comparison pages
are where engines pull provider recommendations from.

This sends some readers to competitors. That is the price of entry to the
query, and the Grey post already set the precedent for the voice.

### C. Failure and troubleshooting (most under-served, highest intent)

Nobody is writing these well and they are exactly where the product *is* the
answer:

- Why was my card declined on Netflix / ChatGPT / Spotify
- My Nigerian card worked once and then stopped
- Naira card declined for an international payment
- Why a subscription charge shows up as an unrecognisable merchant code
- What happens when a renewal fails and the service cuts you off

### D. Diaspora — the "around the world" half

One post exists for Canada. The same shape works for the UK, the US, Germany,
Italy, South Africa, the UAE, Australia and Ireland, plus a pillar: *paying
Nigerian bills from abroad*. These queries are asked in English, from outside
Nigeria, by people with money and a recurring obligation at home. It is the
strongest commercial segment on the consumer side.

### E. Business topics, hosted on the consumer domain

Nothing exists. Write these on `www.subsecute.com/blog`, where the authority
is, and link each one across to the business landing:

- How Nigerian companies pay for AWS, Google Workspace and Slack
- What a Nigerian startup actually spends on software in a year
- Giving each team its own card without sharing one company card
- What your accountant needs from a dollar card, and what a statement is not

### F. Comparisons

One exists (Grey). Each of these is narrow, honest and winnable because the
framing — *for subscriptions* — is both true and a qualifier nobody else is
competing on: Cardtonic, Geegpay, Chipper Cash, Eversend, Raenest, Klasha,
Vesti, Payday, ALAT by Wema, Moniepoint, Kuda.

## Phase 3 — get named by other people

This is the part that actually decides the outcome, and almost none of it is
on the site.

The publications that currently own these answers are nairaCompare,
NaijaTechGuide, Techeconomy, TechCabal, Nairametrics, Technext and
Benjamindada. Some take paid placement, some take pitches, NaijaTechGuide
discloses affiliate relationships. A press kit with verified numbers, the
founding story and the subscription angle is the asking price.

Beyond that: Nairaland and the Nigerian subreddits carry real weight in what
models retrieve, so a genuine presence there is worth more than it looks —
answering the "my card got declined" threads as a person, not as an ad.

## Phase 4 — measure the thing you are actually targeting

Rankings are the wrong metric for this goal. Once a month, run a fixed set of
prompts against ChatGPT, Perplexity, Claude and Gemini and record whether
Subsecute appears and in what position:

- best virtual dollar card in Nigeria
- how do I pay for ChatGPT from Nigeria
- card for paying Netflix in Nigeria
- how do Nigerian companies pay for software subscriptions
- virtual card that renews automatically
- pay my family's DSTV bill from the UK

Run it from a signed-out session. Engines vary run to run, so the trend over
months is the signal, not any single answer. Today the honest baseline is
zero appearances on all six.

## Sequence

Phase 1 unblocks everything and is mostly form-filling. Cluster A and
Cluster C in Phase 2 are the fastest compounding content. Phase 3 is slow and
needs a person, so start the outreach early even though it lands late. Flip
`BUSINESS_SEARCH_INDEXING=true` only once the business landing is out from
behind its password and the copy is final.
