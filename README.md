# Nobel Blood Atlas

**Nobel Blood Atlas** is an evidence-first research atlas for sparse, selectively documented public data. Its current case study is publicly reported Nobel laureate blood-type claims, but the project's primary contribution is methodological: it makes provenance, missingness, contradiction, source dependence and documentation bias visible rather than allowing a polished chart to hide them.

**Public atlas:** https://aryakia.github.io/nobel-blood-atlas-showcase/

## Release identity

- **Dataset:** v0.5.0
- **Interface:** v1.1.1
- **Release date:** 3 October 2026

Dataset and interface versions are separate. A visual redesign does not imply a change in the evidence corpus.

## Reframed research question

The project does **not** currently ask whether Nobel laureates have unusual blood types; the evidence is far too sparse and selectively documented for that inference.

The project now distinguishes two complementary research questions.

**Substantive question**

> **After accounting for the population composition of Nobel laureates and the non-random documentation of blood type, does the observed ABO distribution differ meaningfully from its expected distribution?**

The current answer is: **not yet testable**.

**Methods question**

> **How should researchers collect, grade, model and visualize a sparse, multilingual, selectively documented public evidence corpus when missingness and source dependence are themselves part of the phenomenon?**

Nobel blood-type reporting is the case study through which that methods question is explored.

## Current evidence snapshot

| Evidence state | Count | Meaning |
| --- | ---: | --- |
| Confirmed | 0 | Direct/medical/first-person confirmation satisfying the project rule |
| Reported secondary source | 4 | Explicit person-level public report, but not medical confirmation |
| Unverified lead | 15 | Compilation/discovery claim requiring stronger provenance |
| Conflicting, excluded | 3 | Incompatible public claims retained for audit and excluded from calculations |
| Legacy unresolved pool | 970 | Historical aggregate that cannot yet be honestly split into not-yet-searched vs searched-with-no-record |
| Denominator snapshot | 992 | Person-laureate research frame |

The four reported-secondary records are **not medically confirmed**.

## What changed in dataset v0.5.0

The 19 ABO claim values are unchanged. The release strengthens the research architecture around them:

- source-level provenance with stable claim IDs;
- source-family clustering;
- a transparent source-independence scale;
- a forward-looking search-state schema;
- an auditable search log;
- machine-readable research-progress metadata;
- an explicit distinction between dataset and interface versions;
- scholarly citation metadata;
- a data dictionary and research agenda.

A key provenance result is that **15 of the 19 screening claims (78.9%) come from only two compilation source families**. That source concentration is a stronger empirical pattern than any defensible ABO pattern in the current sample.

## Interactive interface v1.1.1

The public atlas now includes:

- a research-origin narrative explaining how the question changed;
- a composition-adjusted counterfactual and weighting equation;
- a two-stage selection model separating Nobel selection from documentation selection;
- an explicit distinction between contextual population references and the future adjusted null expectation;
- a locked future-test pathway with three prerequisite research conditions;
- evidence-profile visualization;
- observed-versus-expected descriptive views;
- selectable evidence threshold and five population baselines;
- research evidence funnel;
- field-level coverage matrix;
- source-family concentration visualization;
- source-independence distribution;
- documentation-bias model specification;
- explicit search-state architecture;
- searchable evidence ledger;
- deep-linkable laureate evidence dossiers;
- conflict ledger;
- complete field-level research queue;
- high-school context;
- methodology, sourcebook, version history and downloadable data.

## Core research rules

1. Never infer blood type from nationality, ancestry, personality, name, appearance or any proxy.
2. A laureate enters the screening ledger only when a source explicitly links that individual to a blood type.
3. Conflicting claims remain visible and are excluded from calculations until resolved.
4. Repetition is not independent corroboration: derivative pages should be clustered by provenance.
5. Negative searches are research data and should be logged.
6. Population distributions are contextual references, not exchangeable control populations.
7. The current sample is sparse, selected and non-random; it does not support biological claims about Nobel achievement.

## Source-independence scale

Evidence strength and source independence are tracked separately.

| Score | Meaning |
| ---: | --- |
| 0 | Unsupported / unknown provenance, including compilation-only leads |
| 1 | One identifiable person-specific public source |
| 2 | Two or more genuinely independent person-specific sources |
| 3 | Direct/medical/first-person confirmation satisfying the project rule |

Current distribution: **15 claims at score 0, 4 at score 1, 0 at score 2, 0 at score 3**.

## Search-state model

From v0.5.0 onward, new research should distinguish:

1. not_yet_searched
2. searched_no_public_record
3. lead_found
4. reported_secondary_source
5. confirmed
6. conflicting_excluded

The historical 970-record pool remains legacy_unresolved_pool until documentary evidence exists to classify individual records. The project does not invent retroactive search history.

## Repository structure

~~~text
index.html                         Static GitHub Pages atlas
assets/
  styles.css                       Responsive editorial visual system
  app.js                           Analysis, provenance views and dossiers
  favicon.svg                      Project mark
data/
  laureate-blood-type-claims.csv  Original public screening ledger
  evidence-sources.csv             Claim → source → provenance relationships
  conflicts.csv                    Explicit contradiction ledger
  reference-populations.csv       Contextual ABO baselines
  evidence-summary.json           Canonical evidence-state counts
  research-progress.json          Funnel and provenance concentration metrics
  search-status-schema.csv        Forward-looking research-state definitions
  search-log.csv                  Auditable dated search outcomes
  version.json                    Dataset/UI version separation
  DATA_DICTIONARY.md              Field definitions and interpretation
docs/
  METHODOLOGY.md                   Research protocol
  RESEARCH_AGENDA.md               Documentation-bias and publication roadmap
  RESEARCH_NOTES.md                Findings, negative results and changelog
  VISUAL_CASE_STUDY.md             Evidence-workflow documentation
CITATION.cff                       Scholarly citation metadata
legacy-site-source/                Archived core source of the former Next.js/D1 Site
.github/workflows/pages.yml        GitHub Pages deployment
~~~

## Documentation-bias program

The next empirical target is not an ABO hypothesis test. It is a model of **documentation probability**: what predicts whether a laureate has a publicly discoverable ABO record?

Potential covariates include award decade, Nobel category, living/deceased status, source-language ecosystem, media salience, cultural reporting practices and internet-era availability.

A logistic model should **not** be estimated until the 992-record denominator has a defensible search-status layer and suitable covariates.

## Reproducibility and citation

The repository includes CITATION.cff. For formal scholarly archiving, a future tagged release can be connected to Zenodo to obtain a DOI. No DOI is claimed in the current release.

## Public/private boundary

The public release excludes contact information, pending visitor submissions, credentials, live database contents and deployment secrets. These are operational/private data, not research outputs.

The active site is static and does not depend on ChatGPT Sites, Cloudflare D1, a server-side API or a private database. The core source of the former implementation remains archived under legacy-site-source/.

## Author

Created by **Arya Kia**.

Evidence mapping · provenance · missing-data methods · research visualization
