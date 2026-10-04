import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else {
      if (ch === '"') quoted = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
      else cell += ch;
    }
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
  const [header, ...body] = rows.filter(r => r.some(v => v !== ""));
  return body.map(values => Object.fromEntries(header.map((key, i) => [key, values[i] ?? ""])));
}

const claims = parseCsv(readFileSync(new URL("../data/laureate-blood-type-claims.csv", import.meta.url), "utf8"));
const provenance = parseCsv(readFileSync(new URL("../data/evidence-sources.csv", import.meta.url), "utf8"));
const conflicts = parseCsv(readFileSync(new URL("../data/conflicts.csv", import.meta.url), "utf8"));
const baselines = parseCsv(readFileSync(new URL("../data/reference-populations.csv", import.meta.url), "utf8"));
const statusSchema = parseCsv(readFileSync(new URL("../data/search-status-schema.csv", import.meta.url), "utf8"));
const summary = JSON.parse(readFileSync(new URL("../data/evidence-summary.json", import.meta.url), "utf8"));
const version = JSON.parse(readFileSync(new URL("../data/version.json", import.meta.url), "utf8"));

assert.equal(version.dataset, "0.5.0");
assert.equal(version.interface, "1.1.1");
assert.equal(summary.dataset_version, version.dataset);
assert.equal(summary.interface_version, version.interface);

assert.equal(claims.length, 19, "screening claim count");
assert.equal(provenance.length, 19, "provenance row count");
assert.equal(conflicts.length, 3, "conflict count");

const reported = claims.filter(r => r.evidence_status === "reported_secondary_source").length;
const unverified = claims.filter(r => r.evidence_status === "unverified").length;
assert.equal(reported, 4, "reported-secondary count");
assert.equal(unverified, 15, "unverified count");
assert.equal(summary.reported_secondary_source, reported);
assert.equal(summary.unverified, unverified);
assert.equal(summary.confirmed, 0);
assert.equal(summary.conflicting_excluded, conflicts.length);
assert.equal(summary.legacy_unresolved_pool, 970);
assert.equal(summary.person_laureate_denominator_snapshot, 992);

const score0 = provenance.filter(r => r.independence_score === "0").length;
const score1 = provenance.filter(r => r.independence_score === "1").length;
assert.equal(score0, 15, "independence score 0 count");
assert.equal(score1, 4, "independence score 1 count");
assert.equal(provenance.filter(r => r.independence_score === "2").length, 0);
assert.equal(provenance.filter(r => r.independence_score === "3").length, 0);

const familyCounts = provenance.reduce((acc, row) => {
  acc[row.source_cluster_id] = (acc[row.source_cluster_id] || 0) + 1;
  return acc;
}, {});
assert.equal(familyCounts.abo_bible, 11);
assert.equal(familyCounts.abo_fan, 4);
assert.equal(familyCounts.abo_bible + familyCounts.abo_fan, 15);

for (const row of baselines) {
  const sum = ["A_percent", "B_percent", "AB_percent", "O_percent"]
    .map(key => Number(row[key]))
    .reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 100) < 0.02, `ABO percentages must sum to 100 for ${row.population}`);
}

const requiredStatuses = [
  "not_yet_searched",
  "searched_no_public_record",
  "lead_found",
  "reported_secondary_source",
  "confirmed",
  "conflicting_excluded",
  "legacy_unresolved_pool"
];
for (const status of requiredStatuses) {
  assert.ok(statusSchema.some(row => row.status === status), `Missing status schema: ${status}`);
}

for (const row of claims) {
  assert.match(row.source, /^https?:\/\//, `Missing source URL for ${row.laureate}`);
}
for (const row of provenance) {
  assert.match(row.claim_id, /^NB-\d{3}$/);
  assert.ok(["0", "1", "2", "3"].includes(row.independence_score));
}

console.log("Public data validation passed.");
console.log("Dataset v0.5.0 | UI v1.1.1 | 19 claims | 4 reported-secondary | 15 unverified | 3 conflicts | 970 legacy unresolved.");
