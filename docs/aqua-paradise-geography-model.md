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


## Parcel generator v0.2 (2026-10-27)

New module: [src/data/island-parcels.ts](../src/data/island-parcels.ts).

It clips an iterative **weighted Voronoi / power diagram** to the island coastline. Ten district footprints plus two provisional placeholder parcels together account for the full 600 ha. Each area is optimized toward its approved hectare target. The generator exposes `validateParcelAreas` (default ±0.05 ha) rather than silently declaring an unverified fit. Convergence was checked independently with a Python implementation using the same coastal outline, seeds and update rule; with gain 0.06 the solver reached the validator's hectare tolerance.

**Important:** The two placeholder polygons for 52 ha of shared island infrastructure and 70 ha of nature buffers are **pure mathematical stand-ins**, not proposed actual service-road or conservation corridor shapes. In reality these areas will be distributed across the island. Resulting zone polygons also may not enclose their provisional label anchors or honor physical environmental setbacks and cannot yet serve as approved construction/site boundaries. Provisional stop anchors and ocean routes have not been snapped to paths. Do not claim route distances, travel times or ecological feasibility from these cells.

Follow-up: verify shapes visually and topologically, then manually curate realistic multi-polygons for shared roads and buffer corridors, independently validate the entire allocation, and only then create pedestrian and shuttle path graphs. The generator is **not yet rendered on the website**.
