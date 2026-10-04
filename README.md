# Nobel Blood Atlas

**Nobel Blood Atlas** is an evidence-first research atlas for publicly reported Nobel laureate blood-type claims. The project is designed around a methodological principle: **sparse evidence should look sparse**.

Public GitHub Pages site: **https://aryakia.github.io/nobel-blood-atlas-showcase/**

## What this repository contains

This repository is now the public, self-contained release of the project. It includes:

- the complete static GitHub Pages website;
- the 19-record public screening ledger and its person-specific source links;
- evidence-state counts and the 992 person-laureate denominator snapshot;
- the three conflicting records excluded from calculations;
- five population ABO reference datasets;
- field-level research-queue accounting;
- high-school-country context from the earlier research interface;
- sensitivity checks and the predeclared statistical-analysis gate;
- methodology, research notes, sourcebook and version history;
- the GitHub Pages deployment workflow.

The site is static by design. It does **not** depend on ChatGPT Sites, Cloudflare D1, a server-side API or a private database.

## Current evidence snapshot

| Evidence state | Count | Meaning |
| --- | ---: | --- |
| Confirmed | 0 | Independent medical or direct confirmation in the current release |
| Reported secondary source | 4 | Explicit person-level public reporting, but not medical confirmation |
| Unverified | 15 | Discovery/compilation leads requiring stronger sourcing |
| Conflicting, excluded | 3 | Contradictory claims retained for audit and excluded from calculations |
| Unknown or unsearched | 970 | No defensible public claim in this snapshot |
| Denominator snapshot | 992 | Person-laureate research frame |

The four reported-secondary records are **not described as medically confirmed**.

## Core research rules

1. Never infer blood type from nationality, ancestry, personality, name, appearance or any proxy.
2. A laureate enters the screening ledger only when a source explicitly links that individual to a blood type.
3. Conflicting claims remain visible and are excluded from calculations until resolved.
4. Unknown is a valid research state and must remain visible.
5. Population distributions are contextual references, not exchangeable control populations.
6. The current observed sample is sparse, selected and non-random; it does not support biological claims about Nobel achievement.

## Repository structure

```text
index.html                         Static GitHub Pages application
assets/
  styles.css                       Responsive visual system
  app.js                           Filters, charts and evidence ledger
data/
  laureate-blood-type-claims.csv  Public screening ledger
  reference-populations.csv       ABO contextual baselines
  evidence-summary.json           Canonical evidence-state counts
  conflicts.csv                   Explicit contradiction ledger
docs/
  METHODOLOGY.md                   Research protocol and interpretation rules
  RESEARCH_NOTES.md                Findings, negative results and version notes
  VISUAL_CASE_STUDY.md             Earlier public evidence-workflow documentation
.github/workflows/pages.yml        GitHub Pages deployment
```

## Why the project matters

The substantive topic is unusual, but the broader research problem is common: public datasets can be incomplete, selectively documented, contradictory and uneven across languages and countries. A conventional dashboard can make those weaknesses disappear. Nobel Blood Atlas instead treats **provenance, evidence quality, contradiction handling and missingness as part of the data model and part of the user interface**.

The transferable workflow is:

**source provenance → evidence state → contradiction handling → explicit missingness → contextual comparison → sensitivity-aware interpretation**

## Public/private boundary

This public release intentionally excludes contact information, pending visitor submissions, credentials, live database contents and deployment secrets. Those are operational/private data, not research outputs. The public analytical material consists only of deliberately released public-source claims and contextual datasets.

## Author

Created by **Arya Kia**.

Evidence mapping · data quality · research visualization
