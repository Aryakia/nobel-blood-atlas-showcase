import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const raw = readFileSync(new URL("../data/raw/laureate-blood-type-claims.csv", import.meta.url), "utf8").trim().split("\n");
const verified = readFileSync(new URL("../data/verified/reported-secondary-source.csv", import.meta.url), "utf8").trim().split("\n");
const summary = JSON.parse(readFileSync(new URL("../data/processed/evidence-summary.json", import.meta.url), "utf8"));
const prevalence = readFileSync(new URL("../data/reference-populations/blood-type-prevalence.csv", import.meta.url), "utf8").trim().split("\n");

assert.equal(raw.length - 1, 19, "raw claim count");
assert.equal(verified.length - 1, 4, "reported-secondary count");
assert.equal(summary.confirmed, 0);
assert.equal(summary.reported_secondary_source, 4);
assert.equal(summary.unverified, 15);
assert.equal(summary.conflicting_excluded, 3);
assert.equal(summary.unknown_or_unsearched, 970);

for (const row of prevalence.slice(1)) {
  const columns = row.split(",");
  const sum = columns.slice(1, 5).map(Number).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 100) < 0.01, `ABO percentages must sum to 100: ${columns[0]}`);
}

for (const row of raw.slice(1)) {
  assert.match(row, /(reported_secondary_source|unverified)/, "claim must carry evidence status");
  assert.match(row, /https?:\/\//, "claim must carry source URL");
}

console.log("Research data validation passed: 19 claims, 4 reported-secondary, 15 unverified, 0 confirmed.");
