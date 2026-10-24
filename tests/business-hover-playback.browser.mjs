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
  const preview = page.locator("#workspace-preview");
  await preview.hover();
  // Kills a preview that stops merely because the pointer rests over it while scrolling.
  await page.waitForFunction(
    () =>
      document
        .querySelector("#workspace-tab-1")
        ?.getAttribute("aria-selected") === "true",
    {},
    { timeout: 10000 },
  );
  assert.match(
    await preview.getByRole("tabpanel").innerText(),
    /Nneka Ibrahim/,
  );
  const controls = page.locator("#card-controls");
  await controls.getByRole("button", { name: "Pause", exact: true }).click();
  const first = await controls
    .locator("#controls-panel")
    .getAttribute("data-replay");
  await controls.getByRole("button", { name: "Pause", exact: true }).click();
  // Kills the highlighted initial action doing nothing when clicked a second time.
  assert.notEqual(
    await controls.locator("#controls-panel").getAttribute("data-replay"),
    first,
  );
  // Autoplay resumes after leaving the demo, without a playback button.
  assert.equal(await page.locator(".bt-playback").count(), 0);
  await page.locator("#expense-cards h2").click();
  await controls.scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () =>
      document
        .querySelector("#controls-action-1")
        ?.getAttribute("aria-pressed") === "true",
    {},
    { timeout: 8000 },
  );
  console.log(
    "Preview autoplay continues under the pointer; repeated actions replay their result.",
  );
} finally {
  await browser.close();
}
