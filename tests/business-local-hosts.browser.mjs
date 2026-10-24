import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  // Kills a static-only preview when Next blocks dev resources on the loopback IP.
  for (const hostname of ["localhost", "127.0.0.1"]) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`http://${hostname}:3002/business`);
    for (const [selector, state, panel, content] of [
      ["#setup-step-1", "aria-pressed", "#setup-panel", "Available balance"],
      ["#setup-step-2", "aria-pressed", "#setup-panel", "Choose a card type"],
      [
        "#workspace-tab-1",
        "aria-selected",
        "#workspace-panel",
        "Nneka Ibrahim",
      ],
      [
        "#controls-action-1",
        "aria-pressed",
        "#controls-panel",
        "Scheduled funding resumed",
      ],
    ]) {
      await page.locator(selector).click();
      await page.waitForFunction(
        ({ selector, state, panel, content }) =>
          document.querySelector(selector)?.getAttribute(state) === "true" &&
          document.querySelector(panel)?.textContent.includes(content),
        { selector, state, panel, content },
        { timeout: 5000 },
      );
    }
    const timeline = page.locator(".bl-funding-timeline");
    await timeline.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    assert.equal(await timeline.locator("li:visible").count(), 3);
    assert.match(await timeline.innerText(), /Admin approved/);
    assert.match(await timeline.innerText(), /Funds available on the card/);
    // Funding is a readable sequence whose highlight still advances automatically.
    const initialStep = await timeline
      .locator('li[data-active="true"]')
      .innerText();
    await page.waitForFunction(
      (initialStep) =>
        document.querySelector('.bl-funding-timeline li[data-active="true"]')
          ?.innerText !== initialStep,
      initialStep,
      { timeout: 7000 },
    );
    assert.deepEqual(errors, [], `${hostname}: no runtime errors`);
    await context.close();
    console.log(
      `${hostname}: setup, workspace and card controls respond; funding sequence advances.`,
    );
  }
} finally {
  await browser.close();
}
