# Data dictionary

## Release identity

- **Dataset:** v0.5.0
- **Interface:** v1.0.0
- **Release date:** 3 October 2026

Dataset and interface versions are intentionally separate. A design change does not imply a change in the underlying evidence corpus.

## Core files

### `laureate-blood-type-claims.csv`

One row per current screening claim. This preserves the original public screening ledger.

### `evidence-sources.csv`

One row per current claim-source relationship. It adds a provenance-oriented structure:

- `claim_id`: stable local claim identifier;
- `source_cluster_id`: groups claims that rely on the same source family;
- `independence_score`: transparent ordinal source-independence score;
- `independence_class`: human-readable interpretation of the score.

The score is deliberately coarse:

| Score | Meaning |
| ---: | --- |
| 0 | unsupported/unknown provenance, including compilation-only leads |
| 1 | one identifiable person-specific public source |
| 2 | at least two genuinely independent person-specific sources |
| 3 | direct/medical/first-person primary confirmation satisfying the project rule |

No current claim receives score 2 or 3.

### `search-status-schema.csv`

Defines the forward-looking research-state model. The key methodological change is separating **not yet searched** from **searched with no public record**.

The historical 970-record pool remains `legacy_unresolved_pool` until documentary evidence permits a more specific classification. The project does not retroactively invent search history.

### `search-log.csv`

Begins the auditable search-history layer. It records documented search outcomes known from the research notes. Future systematic searches should append dated events rather than overwrite history.

### `research-progress.json`

Machine-readable funnel and provenance-concentration statistics used by the public interface.

## Source independence versus evidence strength

These are related but not identical.

A source can be person-specific and explicit yet still be a single secondary report. Conversely, multiple web pages may repeat one underlying source and therefore should not be treated as independent corroboration.

The public atlas therefore records both:

- **evidence status**: what level of claim support exists;
- **source independence**: whether the apparent support comes from independent provenance.

## Missingness

The project recognizes that missingness is not homogeneous. Future records should distinguish:

1. not yet searched;
2. searched, no defensible record found;
3. lead found;
4. reported secondary source;
5. confirmed;
6. conflicting/excluded.

This distinction is essential before any serious analysis of documentation bias or missing-not-at-random mechanisms.
