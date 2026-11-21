import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const url = `${process.env.LANDING_URL || "http://127.0.0.1:3002"}/business#funding-flow`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url);
  const section = page.locator("#funding-flow");
  await section.scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    document.querySelector('#funding-flow [data-running="true"]'),
  );
  const svg = section
    .locator("svg")
    .filter({ has: page.locator("animateMotion") });
  assert.equal(await section.locator("[data-flow-node]").count(), 6);
  assert.equal(await svg.locator("animateMotion").count(), 5);
  const packet = svg.locator("circle").first();
  const position = () =>
    packet.evaluate((node) => ({ x: node.getCTM().e, y: node.getCTM().f }));
  const first = await position();
  await page.waitForFunction(({ x, y }) => {
    const node = document.querySelector("#funding-flow svg circle");
    const transform = node?.getCTM();
    return transform && (transform.e !== x || transform.f !== y);
  }, first, { timeout: 5000 });
  assert.notDeepEqual(
    await position(),
    first,
    "funding dots must move along their paths",
  );

  for (const width of [1440, 1024, 860, 850, 768, 390, 375, 360]) {
    await page.setViewportSize({ width, height: 1100 });
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const gap = await section
      .locator('[data-flow-node="subscription"]')
      .evaluate(
        (node) =>
          node.getBoundingClientRect().top -
          node.previousElementSibling.getBoundingClientRect().bottom,
      );
    // Labels and cards must retain breathing room.
    assert.ok(gap >= 8, `subscription heading is too close at ${width}px`);
    assert.equal(await svg.locator('path[d*="NaN"]').count(), 0);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() =>
    document
      .querySelector("#funding-flow svg:has(animateMotion)")
      .animationsPaused(),
  );
  assert.equal(
    await packet.evaluate((node) => getComputedStyle(node).display),
    "none",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForFunction(() =>
    document
      .querySelector("#funding-flow svg:has(animateMotion)")
      .animationsPaused(),
  );

  // Search engines must receive the explanation and card names without running the animation.
  const staticPage = await browser.newPage({ javaScriptEnabled: false });
  await staticPage.goto(url);
  const staticSection = staticPage.locator("#funding-flow");
  assert.equal(await staticSection.locator("h2").count(), 0);
  const summary = await staticSection.innerText();
  for (const phrase of [
    "Payment method",
    "Bank transfer",
    "Saved company card",
    "Company wallet",
    "Subscription cards",
    "Scheduled funding",
    "Usage-based cards",
    "Threshold-based funding",
    "Expense cards",
    "Admin-approved funding",
    "WhatsApp reminders",
    "Figma",
    "Meta Ads",
    "Team travel",
  ])
    assert.ok(
      summary.includes(phrase),
      `missing diagram explanation: ${phrase}`,
    );
  assert.equal(
    await staticSection.getByText("NGN", { exact: true }).count(),
    1,
  );
  assert.equal(
    await staticSection.getByText("USD", { exact: true }).count(),
    3,
  );
  await page.setViewportSize({ width: 375, height: 1100 });
  const tops = await section.locator("[data-flow-node]").evaluateAll((nodes) =>
    nodes.map((node) => ({
      id: node.dataset.flowNode,
      top: node.getBoundingClientRect().top,
    })),
  );
  assert.deepEqual(
    tops.map((node) => node.id),
    ["payment", "wallet", "subscription", "usage", "expense", "reminder"],
  );
  for (let index = 1; index < tops.length; index++)
    assert.ok(
      tops[index].top > tops[index - 1].top,
      "mobile diagram follows funding order",
    );
  for (const asset of ["logo", "figma", "notion", "openai", "framer", "google"])
    assert.equal(
      (
        await page.request.get(
          new URL(`/business-assets/${asset}.svg`, url).href,
        )
      ).status(),
      200,
    );
  assert.deepEqual(errors, []);
  console.log(
    "Funding flow passed: motion, eight widths, label spacing, reduced motion, off-screen pause, server-rendered text and logos.",
  );
} finally {
  await browser.close();
}
