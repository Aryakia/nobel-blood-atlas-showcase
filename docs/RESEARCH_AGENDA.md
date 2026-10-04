# Research agenda

## Reframed scholarly question

The strongest research question is not:

> Do Nobel laureates have unusual blood types?

The current public corpus cannot answer that question.

The stronger question is:

> **How should researchers collect, grade, model, and visualize a sparse, multilingual, selectively documented public evidence corpus when missingness and source dependence are themselves part of the phenomenon?**

Nobel blood-type reporting is the case study through which that methodological question is explored.

## Workstream 1 — Search coverage

Build a complete person-level search frame for the 992-record denominator. Every research action should be logged with date, language, query strategy, source types inspected, and outcome.

The core distinction is:

- not yet searched;
- searched, no defensible public record;
- evidence found.

This creates the denominator needed to study documentation probability.

## Workstream 2 — Provenance graph

Move from a flat row model to:

**Laureate → Claim → Source → Source family → Evidence assessment**

This makes copied claims visible. A dozen websites repeating one unsourced list should count as one provenance family, not twelve independent confirmations.

## Workstream 3 — Documentation-bias model

Once the denominator has suitable covariates, estimate the probability that a laureate has a public ABO record.

Candidate predictors:

- award decade;
- Nobel category;
- living/deceased status;
- country/region of biographical documentation;
- source-language ecosystem;
- public prominence proxies;
- era of internet availability;
- whether blood type is culturally salient in the relevant media environment.

A logistic model is appropriate only after the covariate dataset and search protocol are sufficiently complete.

## Workstream 4 — Source independence

Use a transparent ordinal score:

- 0: unsupported/unknown provenance;
- 1: one identifiable person-specific public source;
- 2: two or more genuinely independent person-specific sources;
- 3: direct/medical/first-person primary confirmation.

The score should never be increased merely because a claim is repeated across derivative pages.

## Workstream 5 — Reproducible releases

For every material dataset release:

1. update the dataset version;
2. preserve the interface version separately;
3. run validation checks;
4. update the changelog;
5. create a Git tag/release when convenient;
6. archive a citable snapshot;
7. connect the repository to Zenodo if a DOI is desired.

## Workstream 6 — Publication pathway

A publishable methods paper could focus on:

- missing-not-at-random public evidence;
- provenance dependence;
- evidence grading;
- contradiction handling;
- transparent negative searches;
- responsible visualization;
- how user-interface design can prevent overclaiming from sparse data.

The Nobel case is memorable, but the contribution should be methodological and transferable.
