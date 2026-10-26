# Aqua Paradise — readiness handoff for `/map` (conceptual MVP geometry)

**State:** READY FOR FRONTEND IMPLEMENTATION using a **fictional illustrative 20 m land-use grid**. This is not a surveyed, engineering-ready physical site or finished navigable road network.

## Canonical geometry
- `docs/data/island-map-landuse-v0.4.json`: source of truth for conceptual 600-ha land-use.
- Each `runs` entry is `[x,y,classIndex,runLength]`, cells are 20×20 m in local coordinates; render rectangles or extract polygon contours. Coordinates are not GPS.
- Ten visitor destinations (nine zones and the hotel) are **single connected groups** by 4-neighbor grid; no holes/overlaps in occupied raster cells. Coastline is approximated at grid-cell centers.
- Shared infrastructure occupies 52 ha in six pieces; nature reserve occupies 70 ha in two pieces. **Do not interpret their outline as engineered roads or landscape protections.**
- Total raster 600.04 ha; discrepancy from 600.00 ha represents coastal sampling (one cell); all classes within 0.04 ha of agreed target. Do not falsify to 600.00 ha by merely editing metadata.
- Visual preview: `docs/data/island-map-landuse-v0.4.svg`.

## Safe frontend feature boundary
- Drawing the island, pan/zoom, nine zones, hotel, object-selection, sidebar/catalog, category filters, search, zone detail links and focus states: **can implement now**.
- District destinations should use `docs/data/island-access-graph-draft-v0.2.json` for conceptual names only; its old site nodes are not guaranteed to lie within new v0.4 zone cells. Before visible map pins, derive an interior marker position from v0.4 cells per class and connect catalog IDs to those markers.
- Public paths may be shown as **conceptual connections only** with explicit label. Do not present straight lines as walkable engineered routes. Paradise Loop has nine candidate stops, but its road alignments have not been built and are not verified.
- Do not show calculated walking distances or ETA until verified routes and travel model exist. Avoid fake shuttle timing.
- The hotel is **private**; for non-guests allow a public approach to the boundary, but never route general traffic through private grounds. Boundary access points need recomputation from the new v0.4 hotel polygon, not copy-pasting old v0.2 geometry.
- Sea water of Ocean Bay is excluded from 52-ha onshore allocation.
- Geometry model ≠ photorealistic/isometric art asset: isometric imagery can be drawn around the approved abstract position and should not misrepresent physical measurements.

## QA gates completed for canonical conceptual raster
- All grid cell keys unique, matches documented cell count.
- Per-class area calculation agrees with metadata within ±0.04 ha.
- All ten user-facing district classes contain exactly one 4-connected component.
- Automated validator: `node scripts/validate-island-map-v0.4.mjs`.

## Still needed for real navigation functionality
- Corridor centerlines and road width/grade analysis; emergency/accessible route feasibility; verified hotel threshold; pedestrian crossing details.
- Route distance/time graph and Paradise Loop operation model.
- Site artwork and frontend functional tests for touch, keyboard, focus and reduced-motion.

**Decision:** Begin MVP **visual** implementation of `/map` now; do **not** claim navigation ETA or engineering readiness.
