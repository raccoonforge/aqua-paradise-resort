# QA Run 2 — defect follow-up and targeted regression

**Created:** 2026-10-30. **Source:** tester-submitted 466 updated cases; see [Run 2 report](test-report-run-2.md).  
**State:** observations confirmed by manual tester, **fixes not yet verified**. New issue IDs are tracking proposals until entered in the consolidated register.

## Priority 1: safety/validity and blocked keyboard flows

| Task | Repro / observed | Expected | Regression |
|---|---|---|---|
| APR-BUG-037 (High) | Select prior date or arbitrary year on Tickets; ticket generated. Empty date blocks submission with no message. | Disallow past dates and invalid dates at final confirmation, explain missing date, do not invent a maximum booking horizon. | TICK2-009,010,041; additionally TICK2-028,029,042 and price/season boundaries |
| APR-BUG-042 (High) | Planner → replace (↻) via keyboard; modal appears but focus remains behind it. | Move focus into dialog, trap Tab/Shift+Tab, Escape close, return focus to invoking control. | RESP2-036; PLAN2-037,038,051 |

## Priority 2: functional completeness

| Task | Observed | Expected | Regression |
|---|---|---|---|
| APR-BUG-039 | Planner offers only walking | Available documented walking, Paradise Loop and optimal modes; model weighted by approved §7.7.12–13 values, not unweighted conceptual hops. | PLAN2-015,027; DOC2-045; MAP2-033; PLAN2-025–028,031–034 |
| APR-BUG-040 | No break/priority-zone settings | Implement approved preferences without invented defaults. | PLAN2-016; DOC2-045; PLAN2-013,014,017,042 |
| APR-BUG-041 | Duration locked at default | Editable within approved activity ranges, recalculate later visits and periods, respect 22:00. | PLAN2-029,030; PLAN2-031,033,035–039; DOC2-047 |
| APR-BUG-035 | Polaroids leave viewport; only F5 restores; cannot Tab/Enter/Space activate | Interact, close and restore without reload; semantic controls and keyboard support. | HOME2-010,012–014; RESP2-026,027,040 |
| APR-BUG-038 | Ticket extras Tab focus but Enter does not select | Ensure semantic checkbox/button behavior; specifically check Space and Enter as appropriate, accessible label. | TICK2-057; RESP2-034,035,045 |
| APR-R2-VISIT-KEYBOARD | Arrival method cards not keyboard actionable | Tab/Enter/Space operation, visible focus and correct expanded state. | VISIT2-012,013,042; RESP2-032 |
| APR-BUG-036 | Zoom and route controls crowd map on 320/375px | Compact responsive controls, preserve access to all actions. | MAP2-038,039; RESP2-004,010; MAP2-021–026 |
| APR-BUG-010 | Nine zone descriptions and infrastructure incomplete | Add only content grounded in approved docs, list missing text separately. | ZONE2-010–018,026; DOC2-011–019 |
| APR-R2-TRANSPORT-CONTENT | No capacity up to 4 in Visit; transport distance/schedule information absent in documentation audit | Populate approved content and label demo parameters; don't conflate map conceptual edges with route weights. | VISIT2-018; DOC2-028–030; PLAN2-026,027 |
| APR-BUG-043 | Guest delete buttons accessible name is «Х» | Name such as «Удалить гостя 2» (context-specific), retain visible focus. | RESP2-038; PLAN2-006–012,051 |

## UX decisions to resolve rather than blindly fix

- NAV2-003 — active page indicator and `aria-current="page"`; requires agreement on visual treatment.
- VISIT2-006 — ease of returning to section navigation; normal scrolling is not automatically a defect.
- MAP2-020 — no single reset button, but if selecting «Все» and clearing text restores the state, classify as enhancement.
- TICK2-052 — Back navigates to previous page while ticket modal is open; may be normal browser history semantics.
- HOTEL2-018,019,022 — missing details, blocked pending approved text.
- MAP2-008 — exact island visualization pending final design; do not invent locations.
- MAP2-033 — blocked visual separation of route modes; may become functional Failed if documentation already requires it.
- Existing NC-HOTEL-DELUXE, NC-SHUTTLE, NC-HOTEL-PACKAGES, NC-EXTREME, NC-OCEAN-WINGS, NC-ZONES-TEXTS remain open until explicitly resolved.

## Result tracking template

`Run2 ID | task ID | fix commit | tested build SHA | date | browser/version | viewport/device | actual result | Passed/Failed/Blocked | screenshot/console evidence`

Do not change the 466 Run 2 results when a subsequent fix passes: create **targeted regression run** with its own date and results.
