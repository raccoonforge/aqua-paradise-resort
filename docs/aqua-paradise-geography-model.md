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


## Conceptual circulation graph v0.3 (2026-10-27)

Code module: [src/data/island-transport.ts](../src/data/island-transport.ts).

This model represents the agreed Paradise Loop **nine-stop bidirectional ring**, walkable links between district anchors, and access links from stops to their associated public-facing districts. It provides `conceptualRoute(origin, destination, modes)` and `isConceptuallyReachable`, plus `validateConceptualTransportGraph()` for checking disconnected nodes and invalid edges.

**Interpretation:** a returned route is the fewest-hop sequence of conceptual links. It is **not the shortest, fastest, safest, wheelchair-accessible or necessarily feasible physical route**. Do not use the straight line between stop coordinates as a walking track or driving alignment. Do not display ETAs from this graph. A connection to the hotel is to **public reception only**, not a private villa shortcut. Eden Gardens remains the central *pedestrian* hub, without a shuttle stop through its protected interior.

### Geometry review: outstanding blocker

The preliminary Voronoi/power cell generator is an exploratory mathematical partition. **Visual/technical geometry approval is NOT yet complete**. In particular, the hand-authored coastline contains concave bays, and the current single-ring Sutherland–Hodgman clipping implementation is not guaranteed to represent split/disconnected intersections as valid polygons; self-crossing or off-shore parcel pieces must be checked and the generator replaced with a robust polygon/multipolygon clipping method if necessary. The island's 52 ha shared infrastructure and 70 ha ecological buffers also require **multiple geographically distributed parcels/corridors**, not two artificial compact tiles. Do not treat the current per-zone geometry as final or render it as a surveyed, coherent masterplan.

### Practical acceptance gates before website map integration

1. Verify coastline validity and area with a robust geometry library.
2. Validate every polygon and multipolygon for **within-island**, no intersection-overlap, 600-ha total and assigned hectares (± suitable numerical tolerance).
3. Enforce each district's approved general position, coherent shoreline access, separation of hotel bay/Ocean Bay, and a traversable central Eden Gardens.
4. Redesign reserve/transport parcels as distributed rights-of-way and planted buffers.
5. Draw real connecting road/path **polylines**, check their crossings, permissions, connectivity and accessibility alternatives.
6. Only then connect graph edges to physical lengths and documented walk/shuttle assumptions and integrate `/map` and `/planner`.


## Current map source — amendment (27 Oct 2026)

This document chronicles earlier code experiments (v0.1–v0.3), **not the current /map illustration source**. The newer [land-use v0.4](./data/island-map-landuse-v0.4.json) has area-matched 20 m raster districts that are individually connected, along with [district markers](./data/island-map-markers-v0.4.json). See [readiness handoff](./aqua-paradise-map-readiness-v0.4.md).

It does not supply engineered transit alignments or proven pedestrian walking corridors. Old TypeScript geography/parcels/transport modules must be reconciled or superseded before importing map geometry; do not merge runtime results with v0.4 without normalization. Do not publish estimated times or accessible-route guarantees based on the drafts.
