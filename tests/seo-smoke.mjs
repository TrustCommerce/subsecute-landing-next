import assert from "node:assert/strict";

// Run against a local production server or the deployed site; no credentials needed.
const origin = process.env.SEO_BASE_URL || "http://127.0.0.1:3004";
const canonical = "https://www.subsecute.com";
const get = async (path) => {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path}: expected 200`);
  return response;
};
const html = await (await get("/")).text();
assert.match(html, /The Recurring Money App for Nigerians/);
assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
assert.match(html, /rel="canonical" href="https:\/\/www\.subsecute\.com\/?"/);
assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/);
assert.match(html, /id="spending-insights"/);
assert.match(html, /href="\/blog"/);
assert.match(html, /href="\/privacy-policy\.html"/);
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
assert.equal(schemas.length, 4);
assert.deepEqual(schemas.map(s => s["@type"]).sort(), ["FAQPage", "Organization", "SoftwareApplication", "WebSite"]);
const app = schemas.find(s => s["@type"] === "SoftwareApplication");
assert.equal(app.url, canonical);
assert.equal(app.offers, undefined, "Do not invent free pricing or preorder availability");
const faq = schemas.find(s => s["@type"] === "FAQPage");
assert.equal(faq.mainEntity.length, 6);
const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, "").replace(/<!--.*?-->/g, "");
for (const item of faq.mainEntity) {
  assert.ok(text.includes(item.name), `Missing visible FAQ: ${item.name}`);
  assert.ok(text.includes(item.acceptedAnswer.text), `FAQ answer not visible: ${item.name}`);
}
const robots = await (await get("/robots.txt")).text();
assert.ok(robots.includes(`Sitemap: ${canonical}/sitemap.xml`));
assert.match(robots, /User-Agent: OAI-SearchBot/i);
assert.match(robots, /User-Agent: Claude-SearchBot/i);
assert.doesNotMatch(robots, /Disallow: \/\s*$/m);
const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length > 10);
assert.ok(urls.every(url => url.startsWith(`${canonical}/`)));
assert.ok(urls.every(url => !/\/(new|business)(\/|$)/.test(url)));
const share = await get("/social/home");
assert.match(share.headers.get("content-type"), /image\/png/);
assert.ok((await share.arrayBuffer()).byteLength > 1000);
for (const path of ["/blog", "/support", "/privacy-policy.html", "/terms-of-service.html"]) await get(path);
console.log(`SEO smoke passed: ${origin} — indexable homepage, canonical, schemas, matching FAQs, sitemap, crawlers, social image and public links.`);
