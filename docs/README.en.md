# Aqua Paradise — documentation guide

[Русская версия](./README.md)

This is a navigation index, **not** a replacement specification. Keep the latest validated machine-readable source of truth for each feature.

## Start here

| Purpose | Source | Status |
|---|---|---|
| Site-wide design and pages | [Master Blueprint](./aqua-paradise-master-blueprint.md) | Consolidated overview; later revisions may not be reflected |
| Business rules, tickets, ride restrictions | [Website Requirements](./website-requirements.md) | Detailed source |
| Map UX | [Map Blueprint](./aqua-paradise-map-blueprint.md) | Approved experience concept |
| Conceptual map geometry | [Land-use v0.4 JSON](./data/island-map-landuse-v0.4.json), [SVG preview](./data/island-map-landuse-v0.4.svg) | Contiguous 20 m raster, **not surveyed geography** |
| District pin coordinates | [Map Markers v0.4](./data/island-map-markers-v0.4.json) | Visual map markers |
| Scope and limitations | [Map Readiness](./aqua-paradise-map-readiness-v0.4.md) | Visual map ready to implement; road routing **not** validated |
| Grid checks | [Validation script](../scripts/validate-island-map-v0.4.mjs) | Run locally |

More detailed page UX lives in the page-specific `*-blueprint.md` files; island zoning and facilities in `*-site-plan.md`. The existing `src/data/island-geography.ts`, `island-parcels.ts` and `island-transport.ts` are earlier code experiments and **are not automatically aligned with v0.4**.

Historical models (v0.1/v0.2/v0.3, draft access graphs) should not be imported directly into the new map. Do not delete/move them without checking code and links.

## Language and file policy

- **One shared data model** (coordinates, tickets, IDs and business rules), not duplicated JSON/TypeScript files per language.
- Stable English identifiers and paths; Russian is the principal working documentation and planned site language.
- Translate reader-facing summaries and portfolio onboarding (starting with this document), not every historical spec or machine file.
- Website localization, if needed, should use `ru` / `en` text dictionaries with one shared logic layer.
- Treat existing design/transport modules as legacy experiments until reconciliation and import audit.
- Reorganizing and archiving old files, reconciling spec conflicts, and checking imports remain follow-up tasks.
