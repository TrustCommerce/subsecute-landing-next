import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let outcome = "failure";
  let release;
  const bodies = [];
  // No test data reaches the real lead endpoint or triggers confirmation mail.
  await page.route("**/v1/waitlist", async (route) => {
    bodies.push(route.request().postDataJSON());
    if (outcome === "network") return route.abort();
    if (outcome === "pending")
      await new Promise((resolve) => {
        release = resolve;
      });
    await route.fulfill({
      status: outcome === "failure" ? 500 : 200,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.goto(
    `${process.env.LANDING_URL || "http://127.0.0.1:3002"}/business`,
    { waitUntil: "networkidle" },
  );
  const triggers = page.getByRole("button", {
    name: "Request access",
    exact: true,
  });
  assert.equal(await triggers.count(), 3);
  for (let i = 0; i < 3; i++) {
    await triggers.nth(i).click();
    assert.equal(await page.getByRole("dialog").isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").isVisible(), false);
    assert.equal(
      await triggers.nth(i).evaluate((el) => el === document.activeElement),
      true,
    );
  }
  await triggers.first().click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("button", { name: "Request access", exact: true })
    .click();
  assert.equal(bodies.length, 0);
  await page.getByLabel("Your name", { exact: true }).fill("  Test Person  ");
  await page
    .getByLabel("Company name", { exact: true })
    .fill("Example Business");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("test@example.com");
  await page.getByLabel("Phone number", { exact: true }).fill("123");
  await page
    .getByRole("combobox", { name: "Your role", exact: true })
    .selectOption("FINANCE");
  await page
    .getByLabel(/What would you like/)
    .fill("Subscription cards for our team.");
  await dialog
    .getByRole("button", { name: "Request access", exact: true })
    .click();
  await dialog.getByRole("alert").waitFor();
  assert.equal(bodies.length, 0);
  await page
    .getByLabel("Phone number", { exact: true })
    .fill("+234 801 234 5678");
  await dialog
    .getByRole("button", { name: "Request access", exact: true })
    .click();
  await page
    .getByText("We couldn’t submit your request. Please try again shortly.", {
      exact: true,
    })
    .waitFor();
  assert.equal(
    await page.getByLabel("Company name", { exact: true }).inputValue(),
    "Example Business",
  );
  assert.deepEqual(bodies[0], {
    email: "test@example.com",
    metadata: {
      source: "business-access",
      name: "Test Person",
      company: "Example Business",
      role: "FINANCE",
      phoneNumber: "+234 801 234 5678",
      details: "Subscription cards for our team.",
    },
  });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const sizing = await dialog.evaluate((el) => ({
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
      overflow: el.scrollWidth > el.clientWidth,
    }));
    assert.ok(
      sizing.width <= width && sizing.height <= 844 && !sizing.overflow,
    );
    if (width === 390 || width === 1440)
      await dialog.screenshot({ path: `/tmp/business-access-${width}.png` });
  }
  outcome = "network";
  await dialog
    .getByRole("button", { name: "Request access", exact: true })
    .click();
  await page
    .getByText(
      "We couldn’t confirm your request. Check your connection and try again.",
      { exact: true },
    )
    .waitFor();
  outcome = "pending";
  await dialog
    .getByRole("button", { name: "Request access", exact: true })
    .click();
  await page.getByRole("button", { name: "Sending request…" }).waitFor();
  assert.equal(
    await page.getByRole("button", { name: "Sending request…" }).isDisabled(),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(await dialog.isVisible(), true);
  assert.equal(bodies.length, 3);
  release();
  await page.getByRole("heading", { name: "Request received." }).waitFor();
  await page.getByRole("button", { name: "Back to Subsecute" }).click();
  assert.equal(await dialog.isVisible(), false);
  await triggers.first().click();
  assert.equal(
    await page.getByLabel("Email address", { exact: true }).inputValue(),
    "",
  );
  await page.getByRole("button", { name: "Close request form" }).click();
  assert.deepEqual(errors, []);
  console.log(
    "Access request passed: all CTAs, keyboard return, validation, metadata, errors, retry, pending protection, success, four widths. No live requests sent.",
  );
} finally {
  await browser.close();
}
