import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const origin = process.env.LANDING_URL || "http://127.0.0.1:3002";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const money = (text) => Number(text.replace(/[^\d.-]/g, ""));

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const blockedMutations = [];
  // Prevent every mutation, including unexpected endpoints, from leaving the browser.
  await context.route("**/*", async (route) => {
    const request = route.request();
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      blockedMutations.push({ url: request.url(), method: request.method() });
      return route.abort("blockedbyclient");
    }
    return route.continue();
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${origin}/business`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(
    await page
      .locator(".bl-subscription-ledger .meta svg path")
      .getAttribute("fill"),
    "#0866ff",
  );
  assert.equal(
    await page
      .locator('link[rel="icon"][href="/business-assets/logo.svg?v=orange"]')
      .count(),
    1,
  );

  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(),
      "Every company subscription on its own card.",
    );
    const faqCount = await page.locator("#questions details").count();
    assert.ok(faqCount > 0 && faqCount <= 8, `${faqCount} FAQs at ${width}px`);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `page overflows at ${width}px`,
    );
    const deadAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href"))
          .filter(
            (href) =>
              href === "#" ||
              !document.getElementById(decodeURIComponent(href.slice(1))),
          ),
      );
    assert.deepEqual(deadAnchors, [], `dead anchors at ${width}px`);
  }

  const workspace = page.locator("#workspace-preview");
  assert.equal(await workspace.getByRole("tab").count(), 3);
  await workspace
    .getByRole("tab", { name: "Subscriptions", exact: true })
    .click();
  const amounts = await workspace
    .getByRole("tabpanel")
    .locator("li")
    .evaluateAll((rows) =>
      rows.map((row) =>
        Number(row.lastElementChild.textContent.replace(/[^\d.]/g, "")),
      ),
    );
  assert.deepEqual(amounts, [60, 24, 20]);
  assert.equal(
    amounts.reduce((sum, amount) => sum + amount, 0),
    104,
  );
  assert.match(await workspace.locator("dl").innerText(), /US\$104/);
  await workspace
    .getByRole("tab", { name: "Subscriptions", exact: true })
    .press("ArrowRight");
  assert.equal(
    await workspace
      .getByRole("tab", { name: "Usage-based", exact: true })
      .getAttribute("aria-selected"),
    "true",
  );
  assert.match(await workspace.getByRole("tabpanel").innerText(), /Meta Ads/);
  assert.match(
    await workspace.getByRole("tabpanel").innerText(),
    /Tops up below US\$100/,
  );
  await workspace
    .getByRole("tab", { name: "Expense cards", exact: true })
    .click();
  assert.match(await workspace.getByRole("tabpanel").innerText(), /₦50,000.00/);
  assert.match(
    await page.locator("#funding-flow").innerText(),
    /Usage-based cards/,
  );
  assert.match(await page.locator("#funding-flow").innerText(), /Notion/);
  assert.match(await page.locator("#funding-flow").innerText(), /Meta Ads/);
  assert.equal(
    await page
      .locator("#pricing")
      .getByText("Exchange margin", { exact: true })
      .count(),
    0,
  );

  const finance = page.locator("#finance-records");
  async function recordValue(label) {
    const active = finance.locator('.bp-document[data-active="true"]');
    const text = await active
      .getByText(label, { exact: true })
      .evaluate((dt) => dt.nextElementSibling.textContent);
    return money(text.replace("−", "-"));
  }
  await finance
    .getByRole("button", { name: "Preview funding record", exact: true })
    .click();
  const debit = await recordValue("Total wallet debit");
  assert.equal(debit, 84042);
  await finance
    .getByRole("button", { name: "Preview company statement", exact: true })
    .click();
  const opening = await recordValue("Opening balance");
  const funding = await recordValue("Figma card funding");
  const closing = await recordValue("Closing balance");
  assert.equal(funding, -debit);
  assert.equal(closing, 165958);
  assert.equal(
    Math.round((opening + funding) * 100),
    Math.round(closing * 100),
  );
  await finance
    .getByRole("button", { name: "Preview csv export", exact: true })
    .click();
  assert.equal(await recordValue("Total naira cost"), debit);

  await page
    .getByRole("button", { name: "Request access", exact: true })
    .first()
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  assert.equal(
    await dialog
      .locator('input:not([type="hidden"]), select, textarea')
      .count(),
    9,
  );
  for (const [label, value] of [
    ["Full name", "Acceptance Test"],
    ["Company name", "Example Test Company"],
    ["Work email", "acceptance@example.com"],
    ["WhatsApp number", "+2348012345678"],
  ])
    await dialog.getByLabel(label, { exact: true }).fill(value);
  const blockedRequest = page.waitForRequest(
    (request) =>
      request.method() === "POST" &&
      request.url().includes("/waitlist/company"),
  );
  await dialog
    .getByRole("button", { name: "Request access", exact: true })
    .click();
  await blockedRequest;
  await dialog.getByRole("alert").waitFor();
  assert.ok(
    blockedMutations.some(
      ({ url, method }) =>
        method === "POST" && url.includes("/waitlist/company"),
    ),
  );
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });

  await page.setViewportSize({ width: 375, height: 844 });
  const menu = page.getByRole("button", { name: "Open menu", exact: true });
  await menu.click();
  await page
    .getByRole("navigation", { name: "Business navigation", exact: true })
    .getByRole("link", { name: "Pricing", exact: true })
    .click();
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  assert.equal(new URL(page.url()).hash, "#pricing");
  assert.equal(await page.locator("#questions #pricing[open]").count(), 1);
  assert.equal(await page.locator("#pricing table").isVisible(), true);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );

  const robots = await page.request.get(`${origin}/business/robots.txt`);
  assert.equal(robots.status(), 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /User-Agent: \*\s+Allow: \//i);
  assert.match(
    robotsText,
    /Sitemap: https:\/\/business\.subsecute\.com\/sitemap\.xml/,
  );
  assert.doesNotMatch(robotsText, /Disallow:\s*\//i);
  const sitemap = await page.request.get(`${origin}/business/sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  assert.match(
    await sitemap.text(),
    /<loc>https:\/\/business\.subsecute\.com\/<\/loc>/,
  );
  const robotMetadata = await page
    .locator('meta[name="robots"]')
    .getAttribute("content");
  assert.ok(robotMetadata);
  assert.doesNotMatch(robotMetadata, /noindex|nofollow/i);
  assert.deepEqual(errors, []);
  console.log(
    "Landing refresh passed: three widths, workspace, records, request form, mobile navigation and crawler discovery. All mutation requests intercepted.",
  );
} finally {
  await browser.close();
}
