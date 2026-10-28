# Aqua Paradise — manual QA test report

**Test run:** 2026-10-28 | **Status:** First run completed, defects not fixed

## Scope
Homepage, navigation, zones, attractions, map, hotel, visit, tickets, planner, responsiveness/accessibility, documentation consistency. Manual functional and exploratory testing of the deployed demo site: https://raccoonforge.github.io/aqua-paradise-resort/#/ . No payment processing or real reservation tested.

## Result by checklist

| Checklist | Area | Total | Passed | Failed | Blocked |
|---|---|---:|---:|---:|---:|
| CL-01 | Navigation | 27 | 9 | 15 | 3 |
| CL-02 | Homepage | 35 | 30 | 4 | 1 |
| CL-03 | Zones | 37 | 27 | 10 | 0 |
| CL-04 | Attractions | 36 | 27 | 9 | 0 |
| CL-05 | Map | 43 | 23 | 11 | 9 |
| CL-06 | Hotel | 36 | 30 | 6 | 0 |
| CL-07 | Visit | 43 | 41 | 2 | 0 |
| CL-08 | Tickets | 57 | 47 | 10 | 0 |
| CL-09 | Planner | 52 | 28 | 17 | 7 |
| CL-10 | Responsive & accessibility | 50 | 32 | 10 | 8 |
| CL-11 | Documentation | 50 | 27 | 22 | 1 |
| **TOTAL** | | **466** | **321** | **116** | **29** |

**Calculation:** 321/466 = 68.9% Passed, 116/466 = 24.9% Failed, 29/466 = 6.2% Blocked. Executed-but-unpassed checks should not be described as production readiness. The observed QA result is **not ready for release against the documented scope**. This is a demo prototype, not a live commercial booking service.

## Most significant confirmed user-observed problems
1. Child ticket can be generated without an adult after removing the last adult (APR-BUG-001).
2. On widths below 768px the site header provides no mobile navigation; 200% browser zoom also hides navigation (002).
3. In-page route changes and history/deep links have failures (003–004).
4. Planner schedule time remains unchanged when stops are reordered; no conflict detection (005).
5. Planner does not apply age/height/group constraints; evening-only recommendation coverage is incomplete (006–007).
6. Keyboard cannot open attraction modal; Escape and accessible icon names fail (008, 019–021).
7. Map routing, zoom, object placement and documented hotel/ticket content require further work.

## Blockers and limitations
- Nine map checks were blocked by missing functionality or unavailable direct device validation; some other checks depend on broken links or nonexistent route-sharing.
- Device testing was largely browser emulation; do not claim real-phone verification.
- Images are not yet present: alternative-text checks remain untestable.
- For numerous historical checks, detailed step-by-step raw transcripts or screenshots are not available here. The accompanying defect reports distinguish observed behavior from proposed regression steps.
- Documentation conflict: `docs/master/website-requirements.md` specifies each guest date of birth, category auto-calculation and localStorage; `docs/pages/tickets.md` describes age-category counters. This requires product decision and should not be silently resolved.
- Hotel villas and preliminary packages need clarification; do not invent fixed offerings.

## Recommended gates before a second run
- Fix safety/business-rule validation at final ticket confirmation; regression for changed group state.
- Restore mobile and keyboard navigation and route history.
- Make planner validity/recalculation internally consistent.
- Resolve doc contradictions; then restore missing content, map and export features.
- Capture screenshots, console issues, app commit SHA, browser versions and result evidence during targeted retest.

**Artifacts:** [defect register](defect-register.md), [reproduction reports](bug-reports.md), [manual cases](test-cases.md), [review log](review-log.md).
