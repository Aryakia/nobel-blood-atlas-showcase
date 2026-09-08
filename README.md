# Nobel Blood Atlas — Public Showcase

**An evidence-graded research dashboard for exploring publicly reported Nobel laureate blood types while keeping missing data, contradictory claims, and documentation bias visible.**

| | |
|---|---|
| **Project type** | Evidence mapping · data quality · research dashboard |
| **Role** | Creator and developer |
| **Status** | Research prototype |
| **Live application** | https://nobel-blood-atlas.aryakia97.chatgpt.site |
| **Canonical source** | Private application repository |
| **Public disclosure** | Methods, interface design, technology, aggregate scope, and evidence rules only |

---

## Executive summary

Nobel Blood Atlas is an experiment in **responsible analysis of sparse public data**.

Blood-type information for Nobel laureates is rarely disclosed, inconsistently documented, and strongly affected by country, language, and cultural documentation patterns. Rather than presenting the records that can be found as if they were a complete census, the project makes **missingness, provenance, evidence strength, contradictions, and selection bias part of the interface**.

The core design principle is simple: **sparse evidence should look sparse**.

## Coverage and analytical views

The working application supports subject-level filtering across the six Nobel categories:

- Physics
- Chemistry
- Physiology or Medicine
- Literature
- Peace
- Economic Sciences

Selected contextual population baselines include:

- World
- Japan
- United States
- Canada
- South Korea

These baselines are used for contextual observed-versus-expected views—not for making biological claims from the current non-random sample.

## Evidence model

### Explicit evidence grades

Records are not treated as equally reliable. Each claim can retain an evidence grade, source link, and explanatory note.

### Contradictions remain visible

If public sources conflict, the contradiction is preserved for audit instead of selecting whichever claim appears most often. Conflicting records are excluded from analytical calculations until resolved.

### Unknown is a valid state

The research queue distinguishes among:

- corroborated reports
- leads requiring review
- conflicting records
- unknown / no defensible public record found

This prevents missingness from disappearing during data cleaning.

### Screened vs corroborated views

The interface separates broad screening results from stronger corroborated evidence so users can see how conclusions change as the evidence threshold changes.

## Research principles

1. **Never infer blood type** from nationality, ancestry, personality, name, appearance, or any other proxy.
2. A laureate enters the analytical evidence set only when a source explicitly connects that individual to a blood type.
3. Conflicting claims remain visible and are excluded from calculations until resolved.
4. Population comparisons are contextual; the observed sample is sparse and non-random.
5. Documentation bias is treated as a research limitation, not a footnote.

## What I built

- category-level filtering across all Nobel disciplines
- observed-versus-expected ABO comparisons
- separate screened and corroborated evidence views
- searchable and sortable evidence ledger
- explicit evidence grades, notes, and source links
- contradiction tracking and exclusion logic
- selected population-baseline comparisons
- high-school-country exploration with documentation-bias warnings
- full research queue for corroborated, lead, conflicting, and unknown records
- downloadable versioned CSV data
- evidence-submission workflow with review before publication
- methodology, sensitivity guidance, sourcebook, and dataset changelog

## Technical architecture

The working application uses:

- Next.js 16
- React 19
- TypeScript
- Vite-compatible build tooling
- Cloudflare-compatible server output
- Cloudflare D1 for the review-only evidence-submission workflow
- Drizzle ORM
- responsive semantic HTML/CSS

New public submissions do **not** automatically modify the analytical dataset. They enter a review process first, preserving a separation between user-submitted leads and published evidence.

## Why this project matters

The subject is deliberately secondary to the methodological question: **how should an interface behave when the available evidence is incomplete, contradictory, and selectively documented?**

Nobel Blood Atlas demonstrates a pattern that can transfer to other research products:

**source provenance → evidence grade → contradiction handling → explicit missingness → sensitivity-aware interpretation**

## Limitations

The current dataset is a **screening dataset**, not a complete medical dataset of Nobel laureates. Most public profiles do not disclose blood type, disclosure practices vary substantially across countries and languages, and available observations are not a representative sample.

The interface therefore avoids strong statistical or biological conclusions from the current evidence.

## Public/private boundary

This showcase does **not** expose private source code, live database contents, submitted contact information, pending evidence, credentials, deployment bindings, environment configuration, or internal review material. It publishes only deliberately selected project architecture, methods, public interface features, and research safeguards.

## Author

**Arya Kia**  
Evidence mapping · data visualization · research methods
