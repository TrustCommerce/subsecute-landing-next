import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// A global edge override breaks Netlify's packaging of the Node.js proxy.
test("Netlify lets Next.js select each route's runtime", () => {
  const config = readFileSync(new URL("../netlify.toml", import.meta.url), "utf8");
  assert.doesNotMatch(
    config,
    /^\s*["']?NEXT_RUNTIME["']?\s*=/m,
    "Do not set NEXT_RUNTIME globally. Netlify cannot bundle the Node.js proxy with an edge override.",
  );
});
