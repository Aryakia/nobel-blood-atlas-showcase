# Contributing to Nobel Blood Atlas

Nobel Blood Atlas is an evidence-mapping project. Contributions should strengthen provenance and search coverage rather than increase the number of speculative claims.

## Preferred submission route

Use the repository's **Public evidence lead** GitHub issue form:

https://github.com/Aryakia/nobel-blood-atlas-showcase/issues/new?template=public-evidence.yml

GitHub issues are public. Submit only information already appropriate for public research review.

## A useful evidence contribution includes

- the laureate's full name;
- the exact public source URL;
- the ABO type explicitly stated by the source, or a clear note that no type is stated;
- the source type;
- where in the source the claim appears;
- any known contradictory source;
- enough provenance information to assess whether the source is original or derivative.

## Do not submit

- private medical records;
- leaked or non-public material;
- personal contact information;
- inferred blood types;
- claims based on nationality, ancestry, personality, name or appearance;
- copied claims presented as independent corroboration when they share one underlying source.

## How evidence is assessed

The project records two related but separate dimensions.

### Evidence status

A contribution may become:

- not yet searched;
- searched, no defensible public record;
- lead found / unverified;
- reported secondary source;
- confirmed;
- conflicting / excluded.

### Source independence

- **0:** unsupported or unknown provenance;
- **1:** one identifiable person-specific public source;
- **2:** at least two genuinely independent person-specific sources;
- **3:** direct/medical/first-person confirmation satisfying the project rule.

Repeated derivative pages do not increase the independence score.

## Negative searches are valuable

If a careful search finds no defensible public ABO record, that outcome is useful research data. The search should be logged with date, language/query scope and sources inspected rather than silently discarded.

## Reproducibility

Public data changes should keep these files synchronized:

- data/laureate-blood-type-claims.csv
- data/evidence-sources.csv
- data/conflicts.csv
- data/search-log.csv
- data/evidence-summary.json
- data/research-progress.json
- data/version.json
- docs/RESEARCH_NOTES.md
- CHANGELOG.md

The repository runs automated validation on pushes and pull requests. A public data change should not be merged if those checks fail.
