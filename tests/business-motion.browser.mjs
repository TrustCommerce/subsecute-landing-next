import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const base = process.env.LANDING_URL || "http://localhost:3002";
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}/business`);
  const setup = page.locator("#how-it-works");
  await setup.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  // Kills static walkthroughs: advancing must change both the highlighted step and artwork.
  assert.equal(await page.locator(".bt-playback").count(), 0);
  await page.waitForFunction(
    () =>
      document.querySelector("#setup-step-1")?.getAttribute("aria-pressed") ===
      "true",
    {},
    { timeout: 12000 },
  );
  assert.match(
    await setup.locator("#setup-panel").innerText(),
    /Available balance/,
  );
  // Kills autoplay that steals a manually selected step.
  await setup.getByRole("button", { name: /Create the right card/ }).click();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(9000);
  assert.equal(
    await setup
      .getByRole("button", { name: /Create the right card/ })
      .getAttribute("aria-pressed"),
    "true",
  );
  // Native buttons stay in the tab order and activate with Enter or Space.
  const createStep = setup.getByRole("button", {
    name: "Create the right card",
    exact: true,
  });
  const merchantStep = setup.getByRole("button", {
    name: "Use it at the merchant",
    exact: true,
  });
  await createStep.focus();
  await page.keyboard.press("Tab");
  assert.equal(
    await merchantStep.evaluate(
      (element) => element === document.activeElement,
    ),
    true,
  );
  await page.keyboard.press("Enter");
  assert.equal(await merchantStep.getAttribute("aria-pressed"), "true");
  assert.match(await setup.locator("#setup-panel").innerText(), /checkout/);
  await page.keyboard.press("Shift+Tab");
  assert.equal(
    await createStep.evaluate((element) => element === document.activeElement),
    true,
  );
  await page.keyboard.press("Space");
  assert.equal(await createStep.getAttribute("aria-pressed"), "true");
  assert.match(
    await setup.locator("#setup-panel").innerText(),
    /Choose a card type/,
  );
  const finance = page.locator("#finance-records");
  await finance
    .getByRole("button", { name: "Preview csv export", exact: true })
    .click();
  await finance
    .locator('.bf-paper[data-active="true"]')
    .waitFor({ state: "visible" });
  assert.match(
    await finance.locator('.bf-paper[data-active="true"]').innerText(),
    /Total naira cost/,
  );
  const controls = page.locator("#card-controls");
  await controls.getByRole("button", { name: "Cancel", exact: true }).click();
  assert.match(
    await controls.locator("#controls-panel").innerText(),
    /cannot be undone/,
  );
  assert.match(await controls.locator("aside").innerText(), /cardholder/i);
  // Kills offscreen autoplay: no advance while the walkthrough is outside the viewport.
  await page.reload();
  await page.locator("#release-status").scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const before = await setup.getByRole("button", { pressed: true }).innerText();
  await page.waitForTimeout(9000);
  assert.equal(
    await setup.getByRole("button", { pressed: true }).innerText(),
    before,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await setup.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(9000);
  assert.equal(
    await setup
      .getByRole("button", { name: /Verify your business/ })
      .getAttribute("aria-pressed"),
    "true",
  );
  await setup.getByRole("button", { name: /Use it at the merchant/ }).click();
  assert.match(await setup.locator("#setup-panel").innerText(), /checkout/);
  assert.deepEqual(errors, []);
  console.log(
    "Landing motion: autoplay, manual selection, keyboard, example documents, offscreen and reduced-motion checks passed.",
  );
} finally {
  await browser.close();
}
