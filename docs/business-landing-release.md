# Business landing release gate

The approved Business landing is ported from the Vite prototype into this Next.js site. The consumer homepage and dashboard prototype are unchanged. No deployment, DNS, domain registration or production flag changes were made.

## Flag (OFF by default)

Set server-side BUSINESS*LANDING_ENABLED=true only when deliberately enabling the landing. Missing, false, 1 and TRUE all stay off. Do not use NEXT_PUBLIC*. The server page and proxy both enforce the gate. Disabled requests return 404 with no-store and noindex. There is no query-string or local-storage bypass.

## Local visual review

BUSINESS_LANDING_ENABLED=true pnpm dev --port 3002

Open http://localhost:3002/business. Without the flag that path returns 404. Local preview paths are allowed only in development. Restart after changing the flag.

## Later deployment (not performed)

1. Verify hosting supports Next.js 16 proxy and server-runtime environment variables; add business.subsecute.com to the intended site with valid TLS and confirm the host reaches Next unchanged. Ensure no Netlify domain-level canonical redirect forces it onto www. A separate Netlify site using this same repo may be preferable if aliases redirect.
2. Keep BUSINESS_LANDING_ENABLED=false while configuring DNS/hosting. Verify business root returns 404 and consumer root still works.
3. Review copy, pricing, sample-data disclosure and signup routing. The email-first CTA links to the existing Business frontend at `https://business.subsecute.com/signup#email=…`. Deploy its matching email-prefill receiver before releasing this CTA. The landing makes no account-creation request and retains no email in storage. No dashboard/auth flows were migrated into Next. Hosting must send `/signup` and other Business app routes to the Vite frontend before the landing proxy; the Next landing proxy intentionally denies those routes. Do not replace that app's hosting with the landing-only site.
4. Set BUSINESS_LANDING_ENABLED=true in the server/deployment environment and redeploy/restart as required by the host. The business host root internally rewrites to /business. The consumer host cannot expose /business even with the flag on.
5. Verify root, assets, mobile layout and consumer regressions. Search indexing is a second switch: `BUSINESS_SEARCH_INDEXING=true` is required on top of `BUSINESS_LANDING_ENABLED=true` before the page reports `index, follow`, before `/robots.txt` allows crawlers, and before `/sitemap.xml` and `/llms.txt` answer at all. Left unset the page stays noindex and robots.txt returns `Disallow: /`. The business host serves its own crawler files (`src/app/business/{robots.txt,sitemap.xml,llms.txt}/route.ts`, reached through rewrites in `src/proxy.ts`); it never serves the consumer ones.

Rollback: unset or set the flag false, redeploy/restart where required, and purge any platform-level cached HTML. The flag is a release control, not a confidentiality boundary: public assets and compiled browser bundles are not secrets.

## Tests

node --test tests/business-release.test.mjs

Email handoff: `node --test tests/business-signup-link.test.mjs`. Visual/interaction test: `PLAYWRIGHT_FROM=/absolute/path/to/a/package.json/with/playwright node tests/business-landing.browser.mjs`. The browser test stubs the signup destination; it never creates a live account.

The policy covers explicit enablement, disabled/direct-route access, host isolation, local preview, asset paths and consumer routing. Also run pnpm lint and pnpm build, then verify HTTP status/HTML with the flag both on and off.

## Updated launch scope (18 September 2026)

Expense cards ship at first release, per the owner. The three-card subscription limit is not an expense-card limit. Expense-card fees and limits must be confirmed before activation; no unlimited inclusion is promised. Visible prototype labels have been removed while keeping estimated-rate and funding-state disclosures. Components are split by landing section; source artwork and spacing are preserved. The application stays in the existing Vite frontend, not this marketing repository.
