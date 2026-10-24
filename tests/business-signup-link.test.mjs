import assert from "node:assert/strict";
import test from "node:test";
import { businessSignupLink } from "../src/lib/business-signup-link.mjs";

test("signup carries a validated email only in the fragment", () => {
  const url = new URL(businessSignupLink(" finance+team@example.com "));
  assert.equal(url.origin, "https://business.subsecute.com");
  assert.equal(url.pathname, "/signup");
  assert.equal(url.search, "");
  assert.equal(
    new URLSearchParams(url.hash.slice(1)).get("email"),
    "finance+team@example.com",
  );
});

test("invalid input cannot produce a signup navigation", () => {
  for (const value of [
    "",
    "not-an-email",
    "a@b",
    "a b@example.com",
    `${"a".repeat(255)}@example.com`,
  ]) {
    assert.equal(businessSignupLink(value), null);
  }
});
