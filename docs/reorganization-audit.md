# Aqua Paradise — inventory and safe consolidation log

**Audit date:** 2026-10-27. **Non-destructive documentation normalization.**

## Completed

- Root `README.md` now provides RU/EN onboarding.
- `docs/README.md` and `docs/README.en.md` provide parallel *human-readable indexes*, not duplicate technical data.
- `docs/source-of-truth.md` selects the current source for features and marks historical experimental models.
- Master Blueprint amended to reflect latest current v0.4 visualization dataset and unchanged conceptual transit limitations.
- Geography model history amended to prevent treating old TypeScript experiments as current map-ready coordinates.
- No source, JSON, test, SVG or original specification has been deleted or moved; links under `docs/` continue to point at the same locations.

## Content groups / future folders

| Potential folder | Files to consolidate later | Protection |
|---|---|---|
| `docs/master/` | `project-bible.md`, `website-requirements.md`, `aqua-paradise-master-blueprint.md` | Cross-reference numerous relative links; must migrate atomically |
| `docs/pages/` | homepage/zones/attractions/map/hotel/visit/tickets/planner blueprint specs | Keep specifications separate: different implementation and test responsibilities |
| `docs/island/` | island masterplan, approved site plans, geography guide | Preserve the contents and review canonical links |
| `docs/archive/` | older land-use experiments v0.1–v0.3 and geometry audit notes | Code and documents may refer to them; do not move until full dependency scan |
| `docs/data/` | **current** visual land-use JSON and map-markers JSON | Preserve one model, do not translate or duplicate datasets |

## Outstanding before physical reorganization

1. Obtain full repository file inventory (not just code-search matches) and scan all Markdown links, TS/JS imports, tests, CI configurations and project references.
2. Identify actual duplicated prose/rules paragraph by paragraph; replacing complete specifications with short indexes would lose domain requirements.
3. Plan a single mapping of old paths to new paths and mechanically rewrite references in one atomic Git commit.
4. Run repository build, all relevant tests, markdown-link checks and map grid validator.
5. Publish a manifest mapping old file paths to new locations; only then declare physical cleanup done.

**Caution:** A cleaner directory tree must not take priority over a buildable, traceable portfolio project. This log does not claim that file relocation, import validation or local build checks have been done.
