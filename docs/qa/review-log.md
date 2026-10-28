# Aqua Paradise — result review log and open questions

## Original first-run totals
466 checks — 325 Passed, 109 Failed, 32 Blocked.

## Agreed review #1
- TICK-056: Passed→Failed (invalid group state does not show explanation).
- RESP-026: Blocked→Failed (mobile edit buttons not visible).
- DOC-040: Blocked→Failed (Visit states unsupported Paradise Loop “10 minutes”).
- DOC-050: Passed→Failed (substantial site/documentation contradictions).
- DOC-021: Passed→Failed (required age/height restrictions not reflected).
- DOC-004: Blocked→Passed (capacity omitted, conditional wording; no contradiction).

After review #1: 323 Passed / 114 Failed / 29 Blocked.

## Agreed review #2
- DOC-032: Passed→Failed (tariff copy absent; purchase conditions not coherently described).
- PLAN-026: Passed→Failed (travel time shown without supported calculation).
- DOC-044: original Failed **retained in historical totals**, requirement flagged Needs clarification (villa scope unclear).

After review #2: **321 Passed / 116 Failed / 29 Blocked**.

## Source-of-truth questions requiring decision
1. **Age entry:** `docs/master/website-requirements.md` mandates individual dates of birth/automatic ages; `docs/pages/tickets.md` documents category counters. The two need reconciliation before adding a new issue for DOB omission.
2. **Hotel villas:** `docs/pages/hotel.md` lists example categories, but descriptive properties of villas are not finalized; distinguish missing approved category from missing unapproved specifications.
3. **Map routing:** `docs/source-of-truth.md` and `docs/aqua-paradise-map-readiness-v0.4.md` distinguish illustrative map from actual routing data. Do not assert accurate walk/vehicle ETA until supported.
4. **Additional activities:** determine approved catalog before marking any new attraction “invented”.
5. **Map consistency:** geographic concepts, visual schematic and detailed paths have different maturity levels; avoid claiming road-level accuracy.

All original checklists remain historical evidence in the conversation; this repo package is a consolidated rendition, **not a verbatim archive of all 466 per-case comments**. Do not label it as one.
