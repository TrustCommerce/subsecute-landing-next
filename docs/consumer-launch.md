# Consumer homepage release

## Scope

Promotes the reviewed consumer redesign to `/`. Includes the actual dashboard and Expenses screenshots, original gifting display, envelope artwork, licensed stock portrait, Twitch example and Blog links. `/new` stays development-only. Business release code and flags are not part of this commit.

## Search foundations

- Canonical host is `https://www.subsecute.com`, matching the existing Netlify apex redirect. No DNS change.
- Server-rendered, indexable homepage with descriptive title, description, H1, navigation, app links and legal links.
- Visible FAQs and FAQ structured data share one data source. Organization, WebSite and SoftwareApplication describe the same product. No invented ratings, free-price offer or preorder status.
- New first-party social image at `/social/home`.
- Sitemap includes canonical public pages and published articles, excludes preview/business, and uses substantive article update dates. Static pages no longer pretend to change on every sitemap request.
- Search crawlers are allowed. Existing training permissions are preserved, not expanded as a prerequisite for search visibility.

Google explicitly says AI Overviews/AI Mode require the same SEO foundations, not special AI files or schema: https://developers.google.com/search/docs/appearance/ai-features . These changes do not guarantee indexing, rankings, rich results or citations.

## Verification

Run `pnpm lint:fix`, `pnpm build`, then `pnpm start --port 3004` and `node tests/seo-smoke.mjs`. For live verification: `SEO_BASE_URL=https://www.subsecute.com node tests/seo-smoke.mjs`.

Browser QA covers 1440, 1024, 768, 390 and 320px: no horizontal overflow, decoded images, keyboard CTAs, navigation, FAQs, WhatsApp prompts, spending section order and Blog links. Existing legacy `<img>` ESLint warnings are not silently suppressed.

## Deployment and rollback

Pre-release commit: `a8256334b9ca3d7be087ecd64e2960f2837498d2`.

The launch audit found vulnerabilities in the previously installed dependency tree. Next.js and eslint-config-next were updated together to 16.3.6, and affected transitive packages were refreshed within supported ranges. The resulting production audit reports no known vulnerabilities; the updated production build passes.

Deploy via the existing repository/Netlify integration. Confirm the live hero and new asset, plus SEO smoke checks; a git push alone is not proof of deployment.

If checks fail after release, restore the previous Netlify deploy or revert the release commit and push. No database or API changes are included. Previous homepage source remains available.

## Follow-up requiring account access / ongoing work

1. In verified Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml` and inspect the homepage. Do not claim submission without account access.
2. Track impressions, clicks and app-store conversions for subscription management Nigeria, recurring bills Nigeria, virtual dollar cards Nigeria, family bill payments and subscription gift links. Monitor branded queries separately.
3. Review actual customer questions and publish sourced, product-tested guides through the existing blog. Maintain real author/review dates; avoid bulk keyword pages, fake reviews or paid-link spam.
4. Track Google/AI citations and referral traffic over time. Third-party coverage and genuine customer reviews are ongoing acquisition work, not a deploy setting.
5. Measure field Core Web Vitals after traffic accumulates; local browser tests cannot establish a field ranking or performance guarantee.

## Copy caveat

The hero's “Cancels them” wording is the owner's requested copy. The FAQ explicitly states that stopping card funding does not cancel a provider subscription. Verify any broader cancellation promise against the actual product before using it in ads or detailed product documentation.
