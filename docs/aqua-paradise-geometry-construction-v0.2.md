# Aqua Paradise — geometry construction specification v0.2

**Status:** in progress. Do not use as a finished map.

The first shoreline draft is stored in `docs/data/island-geometry-concept-v0.1.json`. Its computed land area is approximately 6,000,003 m² (rounding to centimetres), matching the 600-ha target to within 0.00005%.

## Geometry invariants

- Local Cartesian coordinates, metres; +Y points north, +X east. This is not a surveyed or GPS-referenced coast.
- Ten large named polygons are needed: nine visitor zones (426 ha) and Grand Hotel/Villas (52 ha).
- Remaining 122 ha are **not two arbitrary contiguous neighbourhoods**: 52 ha is distributed shared roads/transport/engineering, 70 ha is distributed landscape conservation, coastal headlands, safety buffers, and expansion.
- Each resulting district polygon must be contained in the island land polygon, must not overlap other categories, and must retain the planned acreage to an agreed tolerance.
- Avoid deriving hectare boundaries from visual SVG coordinates; preserve one canonical geographic dataset.
- The lagoon/open water of Ocean Bay is excluded from the onshore district's 52 ha.
- Public paths may not traverse the secluded hotel property; northern peaks must have terrain buffers.
- Do not assert attraction distances, shuttle arrival times, ride dimensions, GPS coordinates or exact accessibility until corresponding site engineering is defined.

## Recommended geometry pipeline

1. Retain coastline as the one valid closed polygon, confirm winding, simplicity and actual shoreline feasibility.
2. Draw the shared circulation **network first** as a narrow contiguous corridor along the island, plus access to Gateway, ferry dock, cableway terminal, hotel service road, and Paradise Loop.
3. Allocate that **corridor and its technical plots** to the 52-ha shared-infrastructure layer; avoid a fictitious block of infrastructure in Eden Gardens.
4. Allocate the 70-ha protected/buffer layer as disjoint polygons near northern headlands, slopes and coast; reserve feasible unbuilt land.
5. Partition the **remaining exactly 478 ha** into the 10 named site polygons (nine thematic districts + hotel), using locality anchors as a starting point; adjust shapes manually to follow contour and paths.
6. Validate all polygon rings, holes, multipolygon assignments, overlap, coverage and areas programmatically.
7. Represent named rides as points or approximate footprints inside the correct district, with an uncertainty flag; keep Crystal Passage away from thrill-ride service access.
8. Only after geometry validation, add walkable edges and shuttle stops and compute network distances.

## Acceptance tests

- Sum 600 ha, within agreed numeric tolerance.
- Nine thematic land areas add to 426 ha.
- Hotel 52 ha, roads and technical 52 ha, landscape/buffer 70 ha.
- Adrenaline Peak northern inland; Grand Hotel northwestern secluded bay; Ocean Bay northeastern shore; Eden Gardens remains substantial central destination.
- Paradise Gateway on southern tip; no empty central void; no public transit through hotel grounds.
- All zones reachable via planned public circulation without crossing service-only polygons.
- Zones' safety and service buffers separate major attractions and public crowds.
- Reviewer visually approves the resulting scaled geometry before changing UI.

**Deliberate limitation:** Provisional anchors do not define boundaries; a naive weighted Voronoi cannot allocate distributed infrastructure and natural buffers realistically. This spec records the next geometric operation without marking unbuilt polygons as completed.
