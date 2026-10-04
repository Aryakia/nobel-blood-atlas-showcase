# Nobel Blood Atlas — Research Notes

## Current public release

**Release:** v0.4.0  
**Public migration date:** 3 October 2026  
**Evidence access-check date for the core screening ledger:** 23 August 2026

The public GitHub Pages version supersedes the earlier showcase-only page as the durable public presentation of the project. It is static and does not require the former ChatGPT Sites deployment or the Cloudflare D1 submission workflow.

## Core dataset

The screening ledger contains 19 named claims:

- 4 `reported_secondary_source`
- 15 `unverified`
- 0 `confirmed`

Three additional laureates are tracked separately because their public claims conflict. The denominator snapshot contains 992 person-laureate records, leaving 970 unknown or unsearched after accounting for the 19 screening claims and 3 conflicts.

## Field-level queue

| Field | Denominator | Reported secondary | Unverified | Conflict | Unknown |
| --- | ---: | ---: | ---: | ---: | ---: |
| Physics | 229 | 0 | 3 | 1 | 225 |
| Chemistry | 198 | 0 | 3 | 1 | 194 |
| Medicine | 232 | 1 | 4 | 0 | 227 |
| Literature | 122 | 0 | 2 | 1 | 119 |
| Peace | 112 | 3 | 2 | 0 | 107 |
| Economics | 99 | 0 | 1 | 0 | 98 |
| **Total** | **992** | **4** | **15** | **3** | **970** |

## Research findings and useful negative results

### Yoshinori Ohsumi

A named interview profile explicitly reports type O. The project treats this as `reported_secondary_source`, not independent medical confirmation.

Source: https://www.sandiegoyuyu.com/index.php/features-2/interviews/大隅良典2016

### Kailash Satyarthi

A Times of India report documents a December 2014 blood donation and a donor-directory context, but the article does not state his blood type. Donation must not be used to infer ABO type.

Source: https://timesofindia.indiatimes.com/city/bhopal/blood-brother-of-vidisha-creates-donor-directory-of-85k-people/articleshow/54938960.cms

### Han Kang

Public profile pages were found to disagree about her blood type, and the inspected pages did not provide a traceable original source. She therefore remains outside the analytical dataset.

Example profile: https://googlethx.tistory.com/entry/노벨문학상-한강-작가-프로필

## Changelog

### v0.4.0 — 3 October 2026

- migrated the public presentation to a self-contained GitHub Pages project;
- aligned public terminology with the canonical validation categories;
- changed the stronger records from potentially overstated “confirmed/corroborated” wording to **reported secondary source**;
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

## What was intentionally not migrated

The earlier application accepted evidence submissions into a review-only Cloudflare D1 table. The public GitHub Pages release does not reproduce that backend because:

1. GitHub Pages is static;
2. public submissions can contain contact information or unreviewed health claims;
3. pending submissions should never become public merely because the source repository is public.

This is a privacy and publication-quality boundary, not an attempt to protect the project idea.
