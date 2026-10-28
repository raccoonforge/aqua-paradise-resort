# Aqua Paradise — reusable manual regression cases

Cases below are test designs, **not evidence of successful execution**. Expected results follow documented requirements and the agreed QA observations; unresolved requirements are explicitly flagged.

| ID | Priority | Precondition / steps | Expected | Linked finding |
|---|---|---|---|---|
| APR-TC-001 | P0 | Tickets: choose date, 1 adult + 1 child, remove adult, confirm | Confirmation blocked; 18+ explanation | BUG-001 |
| APR-TC-002 | P1 | Tickets: first try to add child with 0 adults | Clear explanatory rule; no invalid checkout | BUG-001 |
| APR-TC-003 | P1 | Tickets: 10 guests including infants; attempt 11th | 10 permitted, 11 denied; infants included | TICK-026/027 |
| APR-TC-004 | P1 | Tickets: test Apr 30/May 1 and Oct 31/Nov 1 | Correct season boundary, totals recalculated | TICK-009–015 |
| APR-TC-005 | P1 | Tickets: switch Day→Premium→Evening with cabana and priority selections | Ineligible extras disabled/reset; totals accurate | TICK-031–039 |
| APR-TC-006 | P1 | Tickets: inspect all three tariff options | Side-by-side comparison, inclusions and exclusions | BUG-009 |
| APR-TC-007 | P1 | Navigation: widths 320, 375, 767, 768, 1440 | Functional mobile menu below breakpoint, desktop above | BUG-002 |
| APR-TC-008 | P1 | Navigation: desktop browser zoom 200% | All main section navigation remains reachable | BUG-002 |
| APR-TC-009 | P1 | Open direct #/zones?zone=... and #/attractions?ride=... URLs; refresh | Correct deep-linked state | BUG-004 |
| APR-TC-010 | P1 | Navigate across pages, use Back/Forward | URL and visible page agree | BUG-004 |
| APR-TC-011 | P1 | Click map-related CTAs from Visit and Planner | Correct map page, relevant object/route state | BUG-003/013 |
| APR-TC-012 | P1 | Planner: build 3-stop Day schedule, move middle stop up/down | Times reorder/recalculate and conflicts are resolved/flagged | BUG-005 |
| APR-TC-013 | P1 | Planner: choose Evening Pass, multiple interests | Only valid 17:00–22:00 activities, no missing eligible options | BUG-007 |
| APR-TC-014 | P1 | Planner: add underage visitor / too short visitor where applicable | Ineligible rides excluded with readable feedback | BUG-006 |
| APR-TC-015 | P1 | Planner: generate no-match plan, delete every stop | Empty-state text and useful next action | BUG-017 |
| APR-TC-016 | P1 | Planner: viewport 375, reorder and delete stop | All action buttons visible and usable | BUG-018 |
| APR-TC-017 | P2 | Planner: export PDF/image and share link, reopen link | Files produced; state restored and revalidated | BUG-015 |
| APR-TC-018 | P1 | Attractions: use Tab to open card, Tab within modal, Escape, verify focus return | Keyboard-only accessible modal lifecycle | BUG-008/019 |
| APR-TC-019 | P2 | Tickets: inspect icon-only buttons in accessibility tree | Descriptive accessible names | BUG-020 |
| APR-TC-020 | P2 | Zones: inspect accessible names for multiple “Подробнее” links | Distinct destination-specific names | BUG-021 |
| APR-TC-021 | P1 | Map: zoom in/out, pan to boundary, toggle available layers | Controls work; map remains recoverable | BUG-014 |
| APR-TC-022 | P2 | Map: search for nonexisting place | Clear no-results state | BUG-028 |
| APR-TC-023 | P2 | Hotel: select category and open “Все удобства” | Only selected item expands; category resets expansion | BUG-023 |
| APR-TC-024 | P2 | Hotel: inspect category list | Deluxe Room exists with agreed properties | BUG-022 |
| APR-TC-025 | P2 | Content cross-check: Stormbreaker, Crystal Passage across Home/Zones/Attractions | Same designated zone everywhere | BUG-011 |
| APR-TC-026 | P2 | Visit: find Paradise Loop description | Unapproved 10-minute frequency not asserted as fact | BUG-030 |
| APR-TC-027 | P2 | Tickets: generate demo QR, inspect subtitle | Approved Easter egg visible | BUG-032 |
| APR-TC-028 | P2 | Review age entry and calculation requirement vs UI blueprint | **Pending product decision**: DOB/auto age or category counters | REQUIREMENTS |

## Execution template
`Case ID | build/commit | date | browser/version | viewport/device | result(Passed/Failed/Blocked/Not Run) | observed output | evidence link | defect ID`.

**Regression note:** re-run affected cases after fixing code, then smoke-test adjacent features. Do not change first-run results retrospectively.
