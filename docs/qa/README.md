# Aqua Paradise — QA documentation

**First manual run:** 2026-10-28. **Environment:** published GitHub Pages prototype (React/Vite/TypeScript); user-reported browser checks: Chrome/Яндекс Браузер, Firefox, Edge; responsive emulation 320/375/768/1440 CSS px. Exact app commit SHA, OS/build and screenshots are not recorded; do not infer them.

**Run summary:** 466 checks across 11 checklists; after agreed review rounds **321 Passed / 116 Failed / 29 Blocked**. These are check outcomes, not a number of unique bugs. Data were recorded from the tester's manual observations, not independently reproduced via automation. See [test report](test-report.md).

Documents:
- [defect register](defect-register.md) — candidate issues with linked checks and preliminary priorities
- [bug reports](bug-reports.md) — reproduction and expected/actual outcomes; unknown evidence explicitly marked
- [test cases](test-cases.md) — reusable manual regression scenarios
- [review log](review-log.md) — agreed changes and unresolved requirements

**Important scope note:** the source-of-truth registry (`docs/source-of-truth.md`) declares `docs/master/website-requirements.md` authoritative for functional rules and `docs/pages/*.md` for page-specific UX. These occasionally conflict (e.g., participant DOB input vs. age-category counters); a discrepancy must be clarified before turning every difference into a bug. This document package changes no application code.
