import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(
    `${process.env.LANDING_URL || "http://localhost:3002"}/business`,
  );
  assert.equal(
    await page.locator("h1").textContent(),
    "Every company subscription on its own card.",
  );
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator("#funding-flow").count(), 1);
  assert.equal(await page.locator("#renewal-warnings").count(), 0);
  assert.equal(await page.locator("#pricing").count(), 1);
  await page.locator("#pricing summary").click();
  assert.equal(await page.locator("#pricing tr").count(), 5);
  assert.match(
    await page.locator("#pricing").innerText(),
    /Monthly membership/,
  );
  const deadAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter(
          (href) => href.length > 1 && !document.getElementById(href.slice(1)),
        ),
    );
  assert.deepEqual(
    deadAnchors,
    [],
    "every local navigation link has a destination",
  );
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

  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `${width}px has no page overflow`,
    );
    const hero = await page.locator("h1").boundingBox();
    assert.ok(
      hero && hero.x >= 0 && hero.x + hero.width <= width,
      `hero fits ${width}px`,
    );
    if (width === 375 || width === 1440) {
      await page.locator("h1").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `/tmp/subsecute-business-final-${width}.png`,
      });
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    "Hero, pricing, local links, responsive dashboard, three card types and six responsive widths passed.",
  );
} finally {
  await browser.close();
}
