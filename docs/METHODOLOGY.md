# Nobel Blood Atlas — Methodology

## Purpose

Nobel Blood Atlas is a research-methods project about how to present sparse, selectively documented and contradictory public evidence. Its current substantive dataset concerns publicly reported Nobel laureate blood-type claims, but the methodological pattern is intended to generalize to other evidence-mapping projects.

The project does **not** claim that blood type causes, predicts or explains Nobel achievement.

## Evidence states

The public release uses five distinct states.

| State | Definition | Analytical treatment |
| --- | --- | --- |
| `confirmed` | Direct/medical or comparably strong confirmation in the current project | Eligible for a strong-evidence subset |
| `reported_secondary_source` | A person-specific public report that explicitly states a blood type, but is not an independent medical record | Eligible only for a clearly labelled descriptive stronger-source view |
| `unverified` | Compilation or discovery lead without sufficient person-level sourcing | Screening only; never presented as confirmed |
| `conflicting_excluded` | Incompatible public claims | Retained in the contradiction ledger and excluded from calculations |
| `unknown_or_unsearched` | No defensible public claim in the current research snapshot | Explicitly retained as missing/unknown |

Current snapshot: **0 confirmed, 4 reported-secondary-source, 15 unverified, 3 conflicting/excluded, 970 unknown or unsearched, denominator 992.**

## Inclusion rules

A named laureate can enter the screening ledger only if:

1. identity, prize year and category can be crosswalked to an official Nobel record;
2. a source explicitly connects that individual to an ABO blood type;
3. the source URL and source type are preserved;
4. the record is assigned an evidence state;
5. ambiguity or contradiction is documented rather than hidden.

Blood type is never inferred from nationality, ancestry, personality, name, appearance, school country or any other proxy.

## Contradiction protocol

Conflicting claims are not resolved by majority vote. Repeated claims may derive from the same unsourced origin, so repetition does not equal independent corroboration.

When conflict is detected:

- preserve each traceable source trail;
- mark the person as conflicting;
- exclude the person from analytical counts;
- keep the conflict visible in the public research queue;
- reopen the record only when a better source changes the evidence state.

## Population baselines

The project preserves five separate contextual ABO baselines:

- Global
- Japan
- United States
- Canada
- South Korea

They are not pooled. Each remains tied to its original source and source type.

The preferred matching hierarchy is:

1. self-report or medical source;
2. explicitly sourced ancestry/population context;
3. country proxy;
4. global fallback.

Ancestry is never inferred from name, nationality, appearance or school location.

## Expected-count framework

For prize field (f) and blood type (t), a matched expectation can be written as:

[
E_{f,t} = \sum_i p_{i,t}
]

where (p_{i,t}) is the predeclared prevalence of blood type (t) in the matching population assigned to laureate (i).

This framework is descriptive until the evidence and coverage requirements are satisfied.

## Statistical analysis gate

The interface deliberately blocks inferential testing in the current release. Earlier project rules required, at minimum:

- at least 30 stronger-source records per field;
- approximately 70% unique-laureate coverage;
- expected counts of at least 5 in every ABO cell;
- conflict rate below 5%.

The current dataset does not approach those conditions.

## Missingness and selection bias

The observed sample is not random. Public blood-type disclosure varies by country, language, culture, media practice and historical period. Japanese and Korean biographical cultures, for example, can produce more public blood-type references than many Western contexts.

Therefore, an observed-versus-expected difference could reflect documentation practices rather than underlying population composition.

## High-school-country context

The earlier research interface included **224 structured school records covering 193 unique laureates across 17 countries**. This is a separate discovery dataset.

It must not be used as an ancestry variable. School country is a weak social/geographic descriptor and can differ substantially from ancestry or adult residence.

## Sensitivity checks retained from the research prototype

Two heuristic sensitivity checks are displayed because they reveal how fragile the observed pattern is:

- adding 45 non-AB records to the 19-record screening set would reduce the observed AB share to roughly the 6.24% global reference;
- adding 8 non-AB Japanese records to the Japanese subset would reduce its AB share to roughly Japan's 10% reference.

These are not hypothesis tests. They illustrate how quickly a sparse selected sample can change.

## Publication and privacy boundary

The public repository may contain deliberately released public-source claims and aggregate research notes. It must not contain:

- private visitor contact information;
- pending user-submitted evidence that has not been approved for publication;
- credentials or environment secrets;
- live database contents;
- internal moderation material.

Open-sourcing the idea does not justify publishing private operational data.
