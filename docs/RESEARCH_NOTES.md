# Nobel Blood Atlas — Research Notes

## Current public release

**Dataset:** v0.5.0  
**Interface:** v1.0.0  
**Release date:** 3 October 2026  
**Evidence access-check date for the core screening ledger:** 23 August 2026

The public GitHub Pages atlas is the durable project presentation. The former ChatGPT Sites / D1 implementation is retained only as a source archive.

## Core dataset

The screening ledger contains 19 named claims: 4 reported_secondary_source, 15 unverified, and 0 confirmed.

Three additional laureates are tracked separately because their public claims conflict.

The denominator snapshot contains 992 person-laureate records. The remaining 970 are now described as a **legacy unresolved pool**, because the historical project documentation does not allow an honest split between not_yet_searched and searched_no_public_record.

## Provenance result

A major methodological finding in v0.5.0 is source concentration:

- ABO Bible compilation family: 11 screening claims
- ABO FAN compilation family: 4 screening claims
- four person-specific source families: 1 claim each

Therefore **15/19 = 78.9%** of the screening set depends on two compilation source families.

This is a stronger and more defensible empirical observation than any biological interpretation of the ABO counts.

## Source-independence distribution

- Score 0 — unsupported / unknown provenance: 15 claims
- Score 1 — one identifiable person-specific source: 4 claims
- Score 2 — independent person-specific corroboration: 0 claims
- Score 3 — direct/medical/first-person confirmation: 0 claims

## Field-level queue

| Field | Denominator | Reported secondary | Unverified | Conflict | Legacy unresolved |
| --- | ---: | ---: | ---: | ---: | ---: |
| Physics | 229 | 0 | 3 | 1 | 225 |
| Chemistry | 198 | 0 | 3 | 1 | 194 |
| Medicine | 232 | 1 | 4 | 0 | 227 |
| Literature | 122 | 0 | 2 | 1 | 119 |
| Peace | 112 | 3 | 2 | 0 | 107 |
| Economics | 99 | 0 | 1 | 0 | 98 |
| **Total** | **992** | **4** | **15** | **3** | **970** |

## Search log introduced

Dataset v0.5.0 introduces data/search-log.csv.

Only search outcomes supported by existing research notes are entered. The project deliberately does **not** backfill undocumented search histories.

Current logged examples include Yoshinori Ohsumi (explicit person-specific report found), Kailash Satyarthi (blood donation documented, ABO type not disclosed), and Han Kang (conflicting public profiles without traceable original confirmation).

## Research findings and useful negative results

### Yoshinori Ohsumi

A named interview profile explicitly reports type O. The project treats this as reported_secondary_source, not independent medical confirmation.

Source: https://www.sandiegoyuyu.com/index.php/features-2/interviews/大隅良典2016

### Kailash Satyarthi

A Times of India report documents a December 2014 blood donation and donor-directory context, but the article does not state his blood type. Donation must not be used to infer ABO type.

Source: https://timesofindia.indiatimes.com/city/bhopal/blood-brother-of-vidisha-creates-donor-directory-of-85k-people/articleshow/54938960.cms

### Han Kang

Public profile pages were found to disagree about her blood type, and the inspected pages did not provide a traceable original source. She therefore remains outside the analytical dataset.

Example profile: https://googlethx.tistory.com/entry/노벨문학상-한강-작가-프로필

## Changelog

### Dataset v0.5.0 / Interface v1.0.0 — 3 October 2026

- separated dataset and interface version numbers;
- added claim IDs and source-family provenance;
- added source-independence scores/classes;
- quantified two-source-family concentration at 78.9%;
- added forward-looking search-state schema;
- added auditable search log without retroactive fabrication;
- added machine-readable research-progress metadata;
- added data dictionary and research agenda;
- added CITATION.cff;
- added research funnel, coverage matrix and provenance/bias lab;
- added deep-linkable laureate evidence dossiers;
- reframed the project around evidence quality, source dependence and missing-not-at-random documentation.

### v0.4.0 — 3 October 2026

- migrated the public presentation to a self-contained GitHub Pages project;
- aligned public terminology with canonical validation categories;
- preserved the screening ledger, contradiction ledger, baselines, research queue, methodology and research notes;
- removed dependence on the server-side evidence-submission database.

### v0.3 — 23 August 2026

- added five population baselines;
- added a complete field-level research queue;
- added an ancestry-aware matching protocol;
- added a predeclared statistical-analysis gate.

### v0.2 — 23 August 2026

- redesigned the evidence model;
- added a stronger-source analytical view;
- added CSV export and sensitivity checks;
- upgraded the Ohsumi record based on a person-specific public profile.

### v0.1 — 20 August 2026

- published the initial 19-claim screening atlas;
- tracked three conflicting records separately;
- added global context and the structured high-school subset.

## Privacy boundary

The former application accepted evidence submissions into a review-only Cloudflare D1 table. The public GitHub Pages release does not reproduce that backend because pending submissions can contain contact information or unreviewed health claims.

This is a publication-quality and privacy boundary, not an attempt to protect the idea.
