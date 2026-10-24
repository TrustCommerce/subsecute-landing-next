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
    `${process.env.LANDING_URL || "http://localhost:3002"}/business#finance-records`,
  );
  const finance = page.locator("#finance-records");
  // Kills the stationary paper frame: the entire document, not only its text, must transition.
  const papers = finance.locator(".bf-paper");
  assert.equal(await papers.count(), 3);
  await finance
    .getByRole("button", { name: "Preview company statement", exact: true })
    .click();
  await page.waitForTimeout(150);
  const moving = await papers.nth(1).evaluate((element) => ({
    transform: getComputedStyle(element).transform,
    transitions: element
      .getAnimations()
      .map((animation) => animation.playState),
  }));
  assert.ok(
    moving.transitions.includes("running"),
    "the document is visibly transitioning",
  );
  assert.notEqual(moving.transform, "none");
  await page.waitForTimeout(650);
  const heights = [];
  for (const label of ["Funding record", "Company statement", "CSV export"]) {
    await finance
      .getByRole("button", {
        name: `Preview ${label.toLowerCase()}`,
        exact: true,
      })
      .click();
    await page.waitForTimeout(800);
    heights.push(
      (await finance.locator(".bf-paper-deck").boundingBox()).height,
    );
    assert.equal(
      await finance.locator('.bf-paper[data-active="true"]').count(),
      1,
    );
  }
  // Kills layout shifts while autoplay or manual document selection changes the content.
  assert.ok(Math.max(...heights) - Math.min(...heights) < 1);
  // Kills animation that ignores the member's OS preference.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await finance
    .getByRole("button", { name: "Preview funding record", exact: true })
    .click();
  assert.equal(
    await papers
      .first()
      .evaluate((element) => getComputedStyle(element).transitionDuration),
    "0s",
  );
  console.log(
    "Finance motion: whole-sheet transition, stable layout and reduced motion passed.",
  );
} finally {
  await browser.close();
}
