# Aqua Paradise — Source of Truth Registry

**Status:** Working reference index, 27 Oct 2026. This file does not replace detailed specifications.

## Authoritative by topic

| Topic | Primary file | Scope and precedence |
|---|---|---|
| Site-wide experience | `docs/master/aqua-paradise-master-blueprint.md` | Overview; cross-check later decisions in individual blueprints |
| Ride rules, pricing, operating times | `docs/master/website-requirements.md` | Canonical functionality |
| Page UX | `docs/pages/<page>.md` | Page-specific interaction and display |
| Island arrangement | `docs/island/aqua-paradise-island-masterplan.md` | Approved conceptual neighborhood placement, not actual GIS |
| Display land-use for /map | `docs/data/island-map-landuse-v0.4.json` | **CURRENT illustrative grid**, replaces v0.1-v0.3 for map visuals |
| District map pins | `docs/data/island-map-markers-v0.4.json` | Only current district map pins for the raster |
| Scope of /map readiness | `docs/aqua-paradise-map-readiness-v0.4.md` | Do not invent engineering-grade routing |
| Draft transit network | `docs/archive/data/island-access-graph-draft-v0.2.json` | **Not** ready for pathfinding/ETA; do not import as geometric paths |
| Runtime prototype modules | `src/data/island-geography.ts`, `island-parcels.ts`, `island-transport.ts` | Earlier prototypes; must reconcile with map v0.4 before using in /map |

## Historical, do not import into /map

- `docs/archive/data/island-geometry-concept-v0.1.json` — first shoreline.
- `docs/archive/data/island-zone-partition-experiment-v0.2.json` — area-balanced but unrealistic parcels.
- `docs/archive/data/island-landuse-grid-study-v0.3.json` — disconnected visitor zones.
- `docs/archive/data/island-access-graph-draft-v0.1.json` — older connectivity graph.
- Associated SVG studies and QA audits are historical evidence, not production data.

## Language policy

One source of truth for coordinates, calculation rules, IDs and prices. **Never duplicate code/JSON for Russian and English.** Russian is the main editorial language; English translations of top-level reader documentation can be maintained as separate `.en.md` guides. Future bilingual UI must use locale dictionaries, not parallel implementations. Proper nouns remain consistent.

## Before moving or deleting files

1. Search imports, documentation references and test paths.
2. Reconcile blueprint contradictions (including deprecated `/zones/:slug` versus `/zones?zone=<slug>`).
3. Move only unused historical files and update all referring paths atomically.
4. Run `npm run build`, the relevant tests and `node scripts/validate-island-map-v0.4.mjs` in the repository environment.
5. Do not claim cleanup or application readiness without passing these checks.

**Current organization:** documentation files relocated into `docs/master/`, `docs/pages/`, `docs/island/` and historical datasets into `docs/archive/data/` in commit `0005ce92`. The 30 moved files were content-verified against the previous commit; further full-repository reference and application checks remain separate.
