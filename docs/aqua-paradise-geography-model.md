# Aqua Paradise — Geography Data Model v0.1

**Created:** 2026-10-27
**Code:** [src/data/island-geography.ts](../src/data/island-geography.ts)
**Authority:** [Island Masterplan](./aqua-paradise-island-masterplan.md) and ten approved district site plans.

## What is implemented

1. A single fictional **local XY metre-based coordinate system** (north = increasing y), without pretending this is real GPS or a surveyed island.
2. An **illustrative coastline polygon** whose total mathematical area is normalized to 6,000,000 square metres (600 ha). This normalization only constrains total area, not engineering realism.
3. Ten **approximate district anchor points** (nine thematic zones and Grand Hotel); land allocations recorded in a strict 600-ha accounting table (426 thematic, 52 hotel, 52 shared infrastructure, 70 reserve).
4. Nine **candidate Paradise Loop stop anchors** in approved clockwise working order. The route is a bidirectional closed ring **in topology only**; no vehicle road geometry or travel time is supplied.
5. Candidate inter-district pedestrian connections, including central cross-links via Eden Gardens; links are conceptual. Hotel visitor paths must end at its public reception and never cut through private villas.
6. Functions for polygon area, budget summation and basic data validation.

## What is NOT yet implemented or approved

- Accurate shore outlines, ocean water polygons, elevations, bathymetry or accessibility compliance.
- Separate **zone parcel polygons** with precisely measured individual hectare areas. The ten current anchor points do **not** satisfy this requirement.
- Paths inside zones, attraction locations, road centerlines, crowd/safety buffers, transfer times and station operating rules.
- Transportation routing or meaningful estimates of walk/shuttle time.
- Map visualization or integration into `/map` and `/planner`.

## Before implementing production itinerary calculations

1. Form non-overlapping **district polygons** contained in the island polygon with exact allocated hectare areas, plus shared/reserve land.
2. Distinguish terrestrial Ocean Bay from its marine water parcels and explicitly map private hotel shoreline.
3. Draw realistic footpaths, accessibility alternatives, a Paradise Loop road and stop nodes (with road crossings).
4. Check connectedness, edge types, permissions, real-world-feasible traversal speeds and closures.
5. Write automated tests of polygon containment, overlaps, hectare budgets, shuttle connectivity and route integrity.
6. Only when graph geometries and assumptions are documented, connect a route engine to the website. Do not use direct anchor Euclidean distances as real walking/driving travel times.

The present model is a **first useful code artifact**, not a finished geographic engineering plan.
