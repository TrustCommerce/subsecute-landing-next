import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Set PLAYWRIGHT_FROM to a package.json in an environment with Playwright installed.
const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(
    `${process.env.LANDING_URL || "http://localhost:3002"}/business`,
  );

  // All examples remain readable without selecting a tab or waiting for autoplay.
  for (const [selector, expected] of [
    [".bl-subscription-ledger li", ["ChatGPT", "Notion", "Figma"]],
    [
      ".bl-funding-timeline li",
      ["US$60 requested", "Admin approved", "US$60 added"],
    ],
  ]) {
    const rows = page.locator(selector);
    assert.equal(await rows.count(), expected.length);
    for (let index = 0; index < expected.length; index++) {
      assert.equal(await rows.nth(index).isVisible(), true);
      assert.ok((await rows.nth(index).innerText()).includes(expected[index]));
    }
  }
  const setup = page.locator("#how-it-works");
  assert.equal(await setup.locator(".bc-setup-list li p:visible").count(), 4);
  for (const label of [
    "Verify your business",
    "Fund your company wallet",
    "Create the right card",
    "Use it at the merchant",
  ]) {
    const button = setup.getByRole("button", { name: new RegExp(label) });
    await button.click();
    await page.waitForFunction(
      (name) =>
        [...document.querySelectorAll("#how-it-works button")].some(
          (button) =>
            button.textContent.includes(name) &&
            button.getAttribute("aria-pressed") === "true",
        ),
      label,
    );
    assert.equal(await button.getAttribute("aria-pressed"), "true");
    assert.ok((await setup.locator("#setup-panel").innerText()).length > 50);
  }

  const controls = page.locator("#card-controls");
  // Kills competing tours: expense-card permissions must be readable without more tabs.
  assert.equal(await page.getByRole("tablist").count(), 1);
  assert.equal(await controls.getByRole("tablist").count(), 0);
  assert.equal(await controls.locator("aside button").count(), 0);
  assert.match(await controls.locator("aside").innerText(), /Admin’s freeze/);
  await controls.getByRole("button", { name: "Pause", exact: true }).click();
  assert.match(
    await controls.locator("#controls-panel").innerText(),
    /monthly card fee/i,
  );
  await controls.getByRole("button", { name: "Resume", exact: true }).click();
  await page.waitForFunction(() =>
    document
      .querySelector("#controls-panel")
      .textContent.includes("does not charge"),
  );
  assert.match(
    await controls.locator("#controls-panel").innerText(),
    /does not charge/i,
  );
  await controls.getByRole("button", { name: "Cancel", exact: true }).click();
  await page.waitForFunction(() =>
    document.querySelector("#controls-panel").textContent.includes("merchant"),
  );
  assert.match(
    await controls.locator("#controls-panel").innerText(),
    /merchant/i,
  );
  await controls
    .getByRole("group", { name: "Subscription controls", exact: true })
    .getByRole("button", { name: "Add money", exact: true })
    .click();
  await page.waitForFunction(() =>
    document
      .querySelector("#controls-panel")
      .textContent.includes("does not itself pay"),
  );
  assert.match(
    await controls.locator("#controls-panel").innerText(),
    /does not itself pay/i,
  );

  const workspace = page.locator("#workspace-preview");
  await workspace
    .getByRole("tab", { name: "Expense cards", exact: true })
    .click();
  await workspace.getByText("Nneka Ibrahim", { exact: true }).waitFor();
  await workspace
    .getByRole("tab", { name: "Subscriptions", exact: true })
    .click();
  await workspace.getByText("Notion", { exact: true }).waitFor();

  const finance = page.locator("#finance-records");
  await finance
    .getByRole("button", { name: "Preview company statement", exact: true })
    .click();
  await finance
    .getByRole("region", { name: "Preview company statement", exact: true })
    .waitFor();
  await finance
    .locator('.bf-paper[data-active="true"]')
    .waitFor({ state: "visible" });
  assert.match(
    await finance.locator('.bf-paper[data-active="true"]').innerText(),
    /Closing balance/,
  );
  await finance
    .getByRole("button", { name: "Preview csv export", exact: true })
    .click();
  await finance
    .getByRole("region", { name: "Preview csv export", exact: true })
    .waitFor();
  await finance
    .locator('.bf-paper[data-active="true"]')
    .waitFor({ state: "visible" });
  assert.match(
    await finance.locator('.bf-paper[data-active="true"]').innerText(),
    /Total naira cost/,
  );
  await finance
    .getByRole("button", { name: "Preview funding record", exact: true })
    .click();
  await finance
    .getByRole("region", { name: "Preview funding record", exact: true })
    .waitFor();
  await finance
    .locator('.bf-paper[data-active="true"]')
    .waitFor({ state: "visible" });
  assert.match(
    await finance.locator('.bf-paper[data-active="true"]').innerText(),
    /78,000/,
  );

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const selector of [
      ".b-landing-hero-copy",
      "#how-it-works",
      "#card-controls",
      "#finance-records",
    ]) {
      const bounds = await page.locator(selector).boundingBox();
      assert.ok(
        bounds && bounds.x >= -1 && bounds.x + bounds.width <= width + 1,
        `${selector} fits ${width}px`,
      );
    }
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
  }

  // Every local in-page CTA must lead somewhere, not a missing route or self-link.
  const anchors = await page
    .locator(".b-landing a[href^='#']")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  for (const anchor of anchors)
    assert.equal(await page.locator(anchor).count(), 1, `target ${anchor}`);
  await page.setViewportSize({ width: 390, height: 950 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  assert.equal(await page.locator("#business-navigation").isVisible(), true);
  await page
    .locator("#business-navigation")
    .getByRole("link", { name: "Records", exact: true })
    .click();
  assert.equal(await page.locator("#business-navigation").isVisible(), false);

  // Access requests open in-page without navigating to email or signup.
  const access = page
    .getByRole("button", { name: "Request access", exact: true })
    .first();
  await access.click();
  assert.equal(await page.getByRole("dialog").isVisible(), true);
  assert.equal(
    await page.getByLabel("Email address", { exact: true }).isVisible(),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").isVisible(), false);
  assert.deepEqual(errors, []);
  console.log(
    "Business landing: setup, controls, example records, anchors and five widths passed.",
  );
} finally {
  await browser.close();
}
