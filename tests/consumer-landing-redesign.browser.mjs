import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const origin = process.env.LANDING_URL || "http://127.0.0.1:3002";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  // Preserve the established fonts and the accessible heading between line breaks.
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(
    await page.locator("h1").textContent(),
    "The recurring money app for Nigerians.",
  );
  assert.match(
    await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily),
    /Space Grotesk/,
  );
  assert.match(
    await page
      .locator("main")
      .evaluate((el) => getComputedStyle(el).fontFamily),
    /Outfit/,
  );
  assert.equal(await page.getByRole("tablist").count(), 0);
  assert.equal(await page.locator("#how-it-works ol > li:visible").count(), 3);

  // A motion declaration must actually move the funding marker in the browser.
  const funding = page.locator("#how-it-works li").nth(1);
  await funding.scrollIntoViewIfNeeded();
  const marker = funding.locator("i");
  await page.waitForFunction(
    () =>
      document.querySelector("#how-it-works li:nth-child(2) i")?.getAnimations()
        .length > 0,
  );
  const before = await marker.evaluate((el) => getComputedStyle(el).left);
  await page.waitForTimeout(1000);
  assert.notEqual(
    await marker.evaluate((el) => getComputedStyle(el).left),
    before,
  );

  // Each prompt must change the answer, not only its selected appearance.
  const prompts = page.getByRole("group", { name: "Try a WhatsApp question" });
  for (const [question, answer] of [
    ["What am I subscribed to?", "Two renew this week"],
    ["What’s coming up next?", "Mum’s electricity bill"],
    ["Can someone help with my bills?", "Share your gift link"],
  ]) {
    const button = prompts.getByRole("button", { name: question, exact: true });
    await button.click();
    assert.equal(await button.getAttribute("aria-pressed"), "true");
    assert.ok(
      (await page.locator("#whatsapp-conversation").innerText()).includes(
        answer,
      ),
    );
    assert.ok((await button.boundingBox()).height >= 44);
  }

  const comparison = page.getByRole("button", {
    name: "Compare with a bank statement",
  });
  await page
    .getByRole("heading", { name: "Which subscription was that?" })
    .scrollIntoViewIfNeeded();
  await comparison.waitFor();
  await comparison.click();
  assert.ok(
    await page
      .getByRole("button", { name: "See the Subsecute view" })
      .isVisible(),
  );
  await page.getByRole("button", { name: "See the Subsecute view" }).click();
  assert.ok(
    await page
      .getByText(
        "Subscription records in Subsecute. Your bank statement stays unchanged.",
      )
      .isVisible(),
  );

  // The actual product and gift assets must load, not leave empty frames.
  for (const selector of [
    "img[alt^='Subsecute home:']",
    "#spending-insights img",
    "#your-people img",
    "#gift-links img",
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForFunction((value) => {
      const img = document.querySelector(value);
      return img?.complete && img.naturalWidth > 0;
    }, selector);
  }

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `${width}px page overflow`,
    );
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  assert.ok(
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .isVisible(),
  );
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "How it works" })
    .click();
  await page.waitForURL((url) => url.hash === "#how-it-works");
  assert.equal(
    await page.getByRole("navigation", { name: "Mobile navigation" }).count(),
    0,
  );
  assert.equal(new URL(page.url()).hash, "#how-it-works");

  // No animation survives the user's reduced-motion preference.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  for (const id of [
    "how-it-works",
    "spending-insights",
    "everyday",
    "whatsapp",
    "your-people",
    "gift-links",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    assert.equal(
      await page
        .locator(`#${id}`)
        .evaluate((el) => el.getAnimations({ subtree: true }).length),
      0,
      `${id} respects reduced motion`,
    );
  }

  // Core copy and product evidence remain visible when JavaScript is unavailable.
  const staticPage = await browser.newPage({ javaScriptEnabled: false });
  await staticPage.goto(origin);
  assert.ok(
    await staticPage
      .getByRole("heading", { name: "The recurring money app for Nigerians." })
      .isVisible(),
  );
  assert.equal(
    await staticPage.locator("#how-it-works ol > li:visible").count(),
    3,
  );
  assert.ok(await staticPage.locator("#gift-links img").isVisible());
  assert.deepEqual(errors, []);
  console.log(
    "Consumer landing browser checks passed: fonts, readable heading, funding motion, chat, comparison, images, four viewport widths, mobile navigation, reduced motion and static content.",
  );
} finally {
  await browser.close();
}
