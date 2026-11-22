import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const source = fs.readFileSync(
  new URL("../src/lib/business-pricing.ts", import.meta.url),
  "utf8",
);
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const {
  FUNDING_EXAMPLE: example,
  BUSINESS_PRICE_ROWS: rows,
  naira,
} = await import(
  `data:text/javascript;base64,${Buffer.from(js).toString("base64")}`
);
test("the standard wallet top-up keeps every charge and balance reconciled", () => {
  assert.equal(naira(example.principal), "₦81,600.00");
  assert.equal(naira(example.issuerFeeNgn), "₦1,224.00");
  assert.equal(naira(example.margin), "₦3,654.00");
  assert.equal(naira(example.fundingFee), "₦4,323.90");
  assert.equal(naira(example.total), "₦90,801.90");
  assert.equal(naira(example.closing), "₦159,198.10");
  assert.equal(
    example.total,
    example.principal +
      example.issuerFeeNgn +
      example.margin +
      example.fundingFee,
  );
  assert.equal(example.opening - example.total, example.closing);
});
test("pricing uses the approved card funding label", () => {
  assert.match(
    rows.find(([label]) => label === "Card funding from the wallet")[1],
    /1.5% card funding fee/,
  );
  assert.match(
    rows.find(([label]) => label === "Naira cards")[1],
    /₦100.00 creation/,
  );
});
