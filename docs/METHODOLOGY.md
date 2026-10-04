# Nobel Blood Atlas — Methodology

## 1. Purpose and scope

Nobel Blood Atlas is an evidence-mapping and research-methods project. Its current case study concerns public claims about Nobel laureate ABO blood types, but the methodological problem is broader: how should a researcher work with a sparse, multilingual, selectively documented corpus in which source dependence and missingness are themselves informative?

The project does **not** claim that blood type causes, predicts or explains Nobel achievement.

The primary methodological commitments are explicit provenance, separate evidence-strength and source-independence assessments, visible contradictions, visible missingness, dated negative searches, no inference of sensitive attributes from proxies, and no inferential statistics before predeclared evidence and coverage gates are satisfied.

## 2. Unit of analysis and provenance graph

The preferred data model is:

**Laureate → Claim → Source → Source family → Evidence assessment**

A flat spreadsheet row is not sufficient for mature evidence synthesis because several pages may repeat one underlying claim. The source-family layer prevents derivative repetition from being mistaken for independent corroboration.

Dataset v0.5.0 introduces stable claim IDs and source-cluster IDs in data/evidence-sources.csv.

## 3. Evidence states

| State | Definition | Analytical treatment |
| --- | --- | --- |
| confirmed | Direct/medical/first-person or comparably strong confirmation satisfying the project's confirmation rule | Eligible for strongest-evidence descriptive subset |
| reported_secondary_source | An identifiable public source explicitly states a person's ABO type, but is not independent medical confirmation | Eligible for a clearly labelled descriptive stronger-source view |
| lead_found / unverified | Compilation or discovery lead without sufficient person-level provenance | Screening only |
| conflicting_excluded | Incompatible claims remain unresolved | Retained for audit; excluded from calculations |
| searched_no_public_record | A documented search was conducted and no defensible person-specific public ABO record was found | Explicit negative-search state; excluded from ABO analysis |
| not_yet_searched | No documented systematic search has yet been logged | Research queue |
| legacy_unresolved_pool | Historical aggregate whose search status cannot be reconstructed reliably | Missingness only; never retrospectively labelled searched |

Current snapshot: **0 confirmed, 4 reported-secondary-source, 15 unverified leads, 3 conflicting/excluded, 970 legacy unresolved, denominator 992.**

## 4. Search protocol

Future searches should generate a dated search-log record rather than only changing a final status.

At minimum, log the laureate identifier/name, search date, language(s), name variants, search engines/databases/sites used, blood-type keywords, sources inspected, outcome and researcher note.

The critical distinction is between **not yet searched** and **searched with no defensible record**. Dataset v0.5.0 does not retroactively assign the 970 legacy unresolved cases to either state.

## 5. Inclusion rules

A named laureate can enter the screening ledger only if:

1. identity, prize year and category can be crosswalked to an official Nobel record;
2. a source explicitly connects that person to an ABO type;
3. the source URL and source type are preserved;
4. the claim is assigned an evidence state;
5. source-family dependence is recorded where identifiable;
6. ambiguity or contradiction is documented rather than hidden.

Blood type is never inferred from nationality, ancestry, personality, name, appearance, school country or any other proxy.

## 6. Source-independence scale

Evidence status and source independence are separate dimensions.

| Score | Definition |
| ---: | --- |
| 0 | Unsupported/unknown provenance; compilation-only lead or source chain not traceable |
| 1 | One identifiable person-specific public source |
| 2 | At least two genuinely independent person-specific sources |
| 3 | Direct/medical/first-person primary confirmation satisfying the project rule |

The current 19-claim screening set contains **15 score-0 claims and 4 score-1 claims**. No current claim receives score 2 or 3.

A claim does not gain independence because it appears on multiple derivative pages.

## 7. Contradiction protocol

Conflicting claims are never resolved by majority vote.

When a conflict is detected, preserve each traceable source trail; identify whether apparently separate pages share provenance; mark the person as conflicting; exclude the person from analytical counts; keep the contradiction visible; and reopen the record only when stronger evidence changes the assessment.

## 8. Provenance concentration

The current screening corpus is highly concentrated: **15 of 19 claims (78.9%) come from two compilation source families, ABO Bible and ABO FAN**.

This is substantively important. It means the dominant empirical feature of the current corpus is not an ABO distribution; it is source dependence.

## 9. Population baselines and the null benchmark

Five contextual ABO baselines are preserved separately: Global, Japan, United States, Canada and South Korea.

They are never pooled into a synthetic universal control.

The global baseline is **not** the preferred null expectation for Nobel laureates. Nobel laureates are a selected population whose geographic, historical and population composition differs from humanity as a whole. Because ABO prevalence varies across populations, a direct Nobel-versus-world comparison can confound population composition with any apparent Nobel-associated difference.

Preferred matching hierarchy:

1. person-specific population/ancestry evidence where defensible;
2. appropriate regional or population reference;
3. country proxy when justified;
4. global fallback.

Ancestry is never inferred from name, nationality, appearance or school location. Broad racial categories are also too coarse to serve as a substitute for defensible population matching.

## 10. Expected-count framework

For prize field f and blood type t, a matched descriptive expectation can be written as:

E(f,t) = sum over laureates i of p(i,t)

where p(i,t) is the predeclared prevalence of blood type t in the matching population assigned to laureate i.

This composition-adjusted framework is the intended null benchmark, but it remains descriptive until the evidence, denominator covariates, search coverage and source-independence conditions are satisfied.

The interactive website's selectable Global/Japan/United States/Canada/South Korea views are therefore labelled **contextual references**, not the final adjusted expectation.

## 11. Statistical analysis gate

The interface blocks inferential testing. The current working requirements include:

- at least 30 stronger-source records per field;
- approximately 70% unique-laureate coverage;
- expected counts of at least 5 in every ABO cell;
- conflict rate below 5%;
- a defensible distinction between searched and unsearched denominator records;
- enough source independence that derivative repetition does not drive apparent sample size.

The current corpus does not approach those conditions.

## 12. Two-stage selection and documentation bias

The project recognizes two separate selection mechanisms:

1. **Human population → Nobel laureates.** Nobel laureates are not demographically or institutionally representative of humanity.
2. **Nobel laureates → publicly discoverable ABO records.** Public documentation is itself selective.

Missingness is plausibly **missing not at random**. Public ABO disclosure can vary by language, country, culture, media practice, time period and public prominence.

The correct next model is therefore a **documentation-probability model**, not an ABO-outcome model.

A future logistic model could estimate the probability that a public ABO record exists using predictors such as award decade, Nobel category, living/deceased status, source-language ecosystem, cultural salience of blood type, public/media prominence and internet-era availability.

No such model is estimated in v0.5.0 because search-status and denominator covariates are incomplete.

## 13. High-school-country context

The project retains **224 structured school records covering 193 unique laureates across 17 countries** as a separate discovery dataset.

School country must not be used as ancestry. It is a weak biographical/geographic descriptor and can differ substantially from ancestry or adult residence.

## 14. Sensitivity checks

Two heuristic checks illustrate fragility:

- adding 45 non-AB records to the 19-record screening set would reduce the observed AB share to roughly the 6.24% global reference;
- adding 8 non-AB Japanese records to the Japanese subset would reduce its AB share to roughly Japan's 10% reference.

These are not hypothesis tests.

## 15. Versioning and reproducibility

Dataset and interface versions are maintained separately.

For each material dataset release:

1. update the dataset version;
2. preserve the interface version independently;
3. run validation checks;
4. update the changelog and data dictionary;
5. preserve search-log history rather than overwriting it;
6. create a Git tag/release when appropriate;
7. archive a citable snapshot and optionally connect it to Zenodo for a DOI.

## 16. Publication and privacy boundary

The public repository may contain deliberately released public-source claims and aggregate research notes. It must not contain private visitor contact information, pending user-submitted evidence not approved for publication, credentials or environment secrets, live database contents, or internal moderation material.

Open-sourcing the project does not justify publishing private operational data.
