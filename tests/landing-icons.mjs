import assert from "node:assert/strict";
import test from "node:test";

test("landing arrows cannot fall back to platform emoji fonts", async () => {
  const response = await fetch(
    process.env.SEO_BASE_URL || "http://127.0.0.1:3004",
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  const visibleMarkup = html.replace(/<script[\s\S]*?<\/script>/g, "");
  const textArrows = visibleMarkup.match(/[↗↳↓✳]/gu) || [];
  assert.equal(
    textArrows.length,
    0,
    "Decorative arrows must be SVGs, not emoji-capable text glyphs",
  );
  assert.ok(
    (visibleMarkup.match(/stroke-linecap="round"/g) || []).length >= 10,
    "Expected reusable outlined arrow icons throughout the landing page",
  );
  assert.equal(
    (visibleMarkup.match(/https:\/\/img\.logo\.dev\/openai\.com\?/g) || [])
      .length,
    3,
    "All ChatGPT placements must use the real logo",
  );
  assert.match(visibleMarkup, /aria-label="YouTube, Twitch and ChatGPT"/);
});
