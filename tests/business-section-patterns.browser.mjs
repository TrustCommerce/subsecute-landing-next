import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.goto(
    `${process.env.LANDING_URL || "http://localhost:3002"}/business`,
  );
  const sample = async (selector, offset, property) => {
    await page.locator(selector).evaluate((element, y) => {
      window.scrollTo({
        top: element.getBoundingClientRect().top + scrollY - y,
        behavior: "instant",
      });
    }, offset);
    await page.waitForTimeout(100);
    return page
      .locator(selector)
      .evaluate((element, key) => getComputedStyle(element)[key], property);
  };
  // Kills section motion that is declared but never responds to scrolling.
  for (const [selector, property] of [
    ["#workspace-preview", "transform"],
    ["#card-controls", "clipPath"],
    [".bf-paper-deck", "transform"],
  ]) {
    const entering = await sample(selector, 880, property);
    const settled = await sample(selector, 50, property);
    assert.notEqual(entering, settled, `${selector} changes as it enters`);
  }
  // Kills replacing every tab with another hidden-content selector.
  assert.equal(await page.getByRole("tablist").count(), 1);
  assert.equal(
    await page.locator(".bl-subscription-ledger li:visible").count(),
    3,
  );
  assert.equal(
    await page.locator(".bl-funding-timeline li:visible").count(),
    3,
  );
  assert.equal(await page.locator(".bc-setup-list p:visible").count(), 4);

  // Kills scroll effects which remain active after reduced motion is selected.
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const selector of [
    "#workspace-preview",
    "#card-controls",
    ".bf-paper-deck",
  ]) {
    assert.equal(
      await page
        .locator(selector)
        .evaluate((element) => getComputedStyle(element).animationName),
      "none",
    );
  }
  // Kills mobile selectors changing an unseen preview far below the reader.
  await page.setViewportSize({ width: 390, height: 900 });
  await page.locator("#setup-step-2").click();
  let bounds = await page.locator("#setup-panel").boundingBox();
  assert.ok(bounds.y >= 0 && bounds.y < 100);
  assert.match(
    await page.locator("#setup-panel").innerText(),
    /Choose a card type/,
  );
  await page
    .getByRole("button", { name: "Preview company statement", exact: true })
    .click();
  bounds = await page.locator("#finance-panel").boundingBox();
  assert.ok(bounds.y >= 0 && bounds.y < 100);
  assert.match(
    await page.locator('.bf-paper[data-active="true"]').innerText(),
    /Closing balance/,
  );
  // Kills a card entrance spent while the mobile reader is still above its artwork.
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await page.locator(".bs-expense-story").evaluate((element) => {
    window.scrollTo({
      top: element.getBoundingClientRect().top + scrollY - 450,
      behavior: "instant",
    });
  });
  await page.waitForTimeout(100);
  assert.equal(
    await page.locator(".bs-expense-story").getAttribute("data-entered"),
    "false",
  );
  await page.locator(".b-spending-card").scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () =>
      document
        .querySelector(".bs-expense-story")
        ?.getAttribute("data-entered") === "true",
  );
  assert.equal(
    await page
      .locator(".b-spending-card")
      .evaluate((element) => getComputedStyle(element).animationName),
    "bs-card-issue",
  );
  console.log(
    "Section patterns: scroll motion, visible content, reduced motion and mobile preview navigation passed.",
  );
} finally {
  await browser.close();
}
