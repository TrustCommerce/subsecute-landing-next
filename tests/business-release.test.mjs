import { test } from "node:test";
import assert from "node:assert/strict";
import {
  businessReleased,
  businessIndexable as indexable,
  businessRewriteTarget as rewriteTarget,
  businessRouteAction as route,
} from "../src/lib/business-release.mjs";
test("release is explicit and fails closed", () => {
  for (const flag of [undefined, "", "false", "TRUE", "1"])
    assert.equal(businessReleased(flag), false);
  assert.equal(businessReleased("true"), true);
});
test("disabled business domain and direct route return deny", () => {
  for (const path of [
    "/",
    "/business",
    "/signup",
    "/business/dashboard",
    "/robots.txt",
    "/sitemap.xml",
  ])
    assert.equal(
      route("business.subsecute.com", path, "false", "production"),
      "deny",
    );
  assert.equal(
    route("www.subsecute.com", "/business", undefined, "production"),
    "deny",
  );
});
test("consumer routes stay unchanged", () => {
  for (const path of ["/", "/blog", "/support", "/robots.txt"])
    assert.equal(
      route("www.subsecute.com", path, "true", "production"),
      "pass",
    );
});
test("enabled business root rewrites, internal path canonicalizes", () => {
  assert.equal(
    route("business.subsecute.com", "/", "true", "production"),
    "rewrite",
  );
  assert.equal(
    route("business.subsecute.com", "/business", "true", "production"),
    "redirect",
  );
});
test("business host does not leak consumer pages", () => {
  for (const path of ["/blog", "/signup", "/dashboard", "/support", "/quiz"])
    assert.equal(
      route("business.subsecute.com", path, "true", "production"),
      "deny",
    );
});
test("business host serves its own crawler files, never the consumer ones", () => {
  // robots.txt is per-host and the consumer sitemap lists consumer URLs, so
  // each of these maps to a handler under the one segment this host may read.
  for (const [requested, target] of [
    ["/robots.txt", "/business/robots.txt"],
    ["/sitemap.xml", "/business/sitemap.xml"],
    ["/llms.txt", "/business/llms.txt"],
  ]) {
    assert.equal(
      route("business.subsecute.com", requested, "true", "production"),
      "rewrite",
    );
    assert.equal(rewriteTarget(requested), target);
  }
  // Still gated: nothing is served before the release flag is on.
  for (const path of ["/robots.txt", "/sitemap.xml", "/llms.txt"])
    assert.equal(
      route("business.subsecute.com", path, "false", "production"),
      "deny",
    );
});
test("the share image is reachable on both the business host and local preview", () => {
  assert.equal(
    route(
      "business.subsecute.com",
      "/business/opengraph-image",
      "true",
      "production",
    ),
    "pass",
  );
  assert.equal(
    route("localhost:3002", "/business/opengraph-image", "true", "development"),
    "pass",
  );
  assert.equal(
    route(
      "localhost:3002",
      "/business/opengraph-image",
      "false",
      "development",
    ),
    "deny",
  );
});
test("search indexing is a second switch on top of the release flag", () => {
  assert.equal(indexable("true", "true"), true);
  for (const [flag, index] of [
    ["true", undefined],
    ["true", "false"],
    ["true", "1"],
    ["false", "true"],
    [undefined, "true"],
  ])
    assert.equal(indexable(flag, index), false);
});
test("no production preview path or lookalike-host bypass", () => {
  for (const host of [
    "www.subsecute.com",
    "localhost:3000",
    "business.subsecute.com.evil.test",
  ])
    assert.equal(route(host, "/business", "true", "production"), "deny");
});
test("local development preview still requires flag", () => {
  assert.equal(
    route("localhost:3002", "/business", "true", "development"),
    "pass",
  );
  assert.equal(
    route("localhost:3002", "/business", "false", "development"),
    "deny",
  );
});
test("enabled business assets can load", () => {
  for (const path of ["/_next/static/a.js", "/business-assets/studio.jpg"])
    assert.equal(
      route("business.subsecute.com", path, "true", "production"),
      "pass",
    );
});

test("the CloudFront mark counts as the business host, whatever Host says", () => {
  // CloudFront forwards no Host header, so Netlify sees its own default name.
  const netlifyName = "statuesque-marigold-a15072.netlify.app";
  assert.equal(route(netlifyName, "/", "true", "production", "1"), "rewrite");
  assert.equal(route(netlifyName, "/business", "true", "production", "1"), "redirect");
  assert.equal(route(netlifyName, "/pricing", "true", "production", "1"), "deny");
  assert.equal(route(netlifyName, "/", "false", "production", "1"), "deny");
  // Without the mark the default name is just the consumer site.
  assert.equal(route(netlifyName, "/", "true", "production", null), "pass");
});
