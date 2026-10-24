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

  // A line break must not join two spoken words.
  assert.equal(
    await page.locator("h1").textContent(),
    "Know before your subscriptions renew.",
  );
  const warning = page.locator("#renewal-warnings");
  // Cards stay discoverable without becoming a second H1 or a primary button.
  const cardAddendum = page.getByRole("link", {
    name: "And corporate cards for team expenses.",
  });
  assert.equal(await cardAddendum.getAttribute("href"), "#expense-cards");
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await warning.locator("li").count(), 3);
  await warning.getByRole("checkbox").check();
  assert.equal(await warning.locator("li").count(), 2);
  assert.equal(
    await warning.getByText("Ada Okafor", { exact: true }).count(),
    1,
  );
  assert.equal(
    await warning.getByText("Musa Ibrahim", { exact: true }).count(),
    0,
  );
  assert.match(await warning.innerText(), /Admin · cardholder/);

  // Removing pricing must keep the product summary and its navigation intact.
  assert.equal(await page.locator("#pricing").count(), 0);
  const features = page.locator("#workspace-features");
  assert.deepEqual(await features.locator("li").allTextContents(), [
    "Dedicated subscription cards",
    "WhatsApp reminders for admins and cardholders",
    "Expense cards with named owners",
    "Team requests and Admin approvals",
    "Scheduled subscription funding",
    "Funding history and recorded exchange rates",
  ]);
  assert.equal(await page.locator('a[href="#pricing"]').count(), 0);
  assert.equal(
    await page.locator(".bt-playback, .b-landing-eyebrow").count(),
    0,
  );
  assert.equal(
    await page.getByText(/Vendor receipt|Provider quote/).count(),
    0,
  );

  const order = await page
    .locator(
      "#renewal-warnings, #business-cards, #expense-cards, #finance-records, #workspace-features, #questions",
    )
    .evaluateAll((nodes) => nodes.map((node) => node.id));
  assert.deepEqual(order, [
    "renewal-warnings",
    "business-cards",
    "expense-cards",
    "finance-records",
    "workspace-features",
    "questions",
  ]);

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const addendumBounds = await cardAddendum.boundingBox();
    if (width >= 768)
      assert.equal(
        addendumBounds.height,
        48,
        "desktop addendum stays on one line",
      );
    assert.ok(
      addendumBounds &&
        addendumBounds.height >= 48 &&
        addendumBounds.x >= 0 &&
        addendumBounds.x + addendumBounds.width <= width,
    );
    // Check computed rules, including mobile overrides and inherited small text.
    const rendered = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      small: [...document.querySelectorAll(".b-landing *")]
        .filter(
          (element) =>
            [...element.childNodes].some(
              (node) => node.nodeType === 3 && node.textContent.trim(),
            ) &&
            element.getClientRects().length &&
            getComputedStyle(element).visibility !== "hidden" &&
            parseFloat(getComputedStyle(element).fontSize) < 12,
        )
        .map((element) => element.textContent),
      card: getComputedStyle(document.querySelector(".b-spending-card"))
        .backgroundColor,
      margin: getComputedStyle(document.querySelector("#renewal-warnings h2"))
        .marginTop,
    }));
    assert.equal(rendered.overflow, false, `${width}px has no page overflow`);
    assert.deepEqual(rendered.small, [], `${width}px text floor`);
    assert.equal(rendered.card, "rgb(185, 70, 11)");
    assert.equal(rendered.margin, "24px", "module spacing applies in the DOM");
    if (width === 390 || width === 1440) {
      await page.locator("h1").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `/tmp/subsecute-business-final-${width}.png`,
      });
      await page
        .locator("#expense-cards")
        .screenshot({ path: `/tmp/subsecute-expenses-final-${width}.png` });
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    "Warning routing, feature summary, section order, orange card and computed styles at five widths passed.",
  );
} finally {
  await browser.close();
}
