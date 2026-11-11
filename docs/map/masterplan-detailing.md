> Historical density/detailing baseline. The current artistic direction is [Luxury Botanical Resort Cartography](luxury-cartography.md#botanical-artistic-revision--2026-11-11): fewer, larger botanical silhouettes and stronger district composition supersede the former canopy-count aesthetic. Technical geography and circulation remain valid.

# Luxury Architectural Resort Masterplan — detailing revision

The approved 2D concept, original coastline, canonical ten location anchors, arrival points and eight Paradise Loop stops are retained. This revision enriches the existing map rather than replacing its geography or interface. Every addition remains native SVG, strictly in plan view, using the existing ivory/sand/sage/dark-ocean/champagne palette.

## District composition

The following are **additional drawn architectural masses**, not newly invented searchable POIs, a room inventory or a visitor-capacity calculation. Existing buildings and pools are retained.

| District | Additional architectural masses | Additional basins | Treatment |
| --- | ---: | ---: | --- |
| Grand Hotel & Villas | 19 | 1 | Long hotel wings with room-bay linework, villa courts, pool terraces, private gardens and guest-only walks |
| Adrenaline Peak | 10 | 3 | Launch compounds, equipment houses, multiple plan-view ride channels and landing pools |
| Ocean Bay | 9 | 0 | Natural seawater bay preserved; beach pavilions, loungers, terraces and setback service buildings |
| Atlantis Realm | 7 | 1 | Stepped sanctuary courts, colonnades, water complexes and fragments of ruin architecture |
| Eden Gardens | 9 | 3 | Glazed conservatory roof plans, botanical beds, forest walks, ponds and marked cascades |
| Pirate’s Cove | 11 | 2 | Harbour buildings, fortified courtyards, quays and detailed ship hull/deck plan |
| Serenity Spa | 8 | 2 | Thermal courts, treatment pavilions, cabanas, private planted gardens and quiet terraces |
| Paradise Market | 10 | 2 | Arcaded galleries, restaurant courts, café tables, pergolas and public squares |
| Little Paradise | 9 | 3 | Shallow pools, smaller water-play channels, shelters and family changing/service buildings |
| Paradise Boulevard | 9 | 2 | Gate piers, fountains, open arrival plaza, axial palms and terminal lounges |

Total: **101 additional architectural masses and 19 additional pools/basins**. Their placement is checked against existing architecture, water and circulation, including a road-stroke allowance. New building corners are checked against the actual SVG coast in Chromium. Structural quays and ride channels are architectural symbols rather than new public destinations.

## Landscape and resort scale

- The large green underlays have softer contours and lighter fills. **806 individually varied canopy silhouettes** replace the flat appearance: seeded size, lobes, position and muted colour variation; irregular clustering and open clearings keep the terrain legible.
- **49 plan-view palms** mark alleys, beach promenades and garden courts. Flower beds, villa hedges, mineral outcrops and ridge contours add finer landscape structure.
- Broad natural buffers remain unbuilt. The larger resort character comes from coherent compounds, secondary circulation and service buildings, not covering every available parcel.
- Counts describe cartographic symbols; they do not claim an inventory of trees or literal numbers of rooms on the approximately 6 km² fictional resort.

## Circulation and invariant coordinates

Eight new secondary public links are real walking edges in `map-network.ts` and use the same rounded `pathData` function for base streets and route highlighting. They link existing district/station nodes without adding fake catalogue objects. Primary roads, shuttle ring geometry and stop coordinates are unchanged. Secondary streets are drawn more finely than the primary network.

Six private hotel links have explicit `hotel-guests` access, named internal nodes and geometry in the same network module. They are rendered and clearance-tested but excluded from the public routing graph and catalogue. The existing public hotel approach remains a terminal route to reception; it does not become a shortcut through villas.

Tests freeze the original three arrival coordinates and all eight stop coordinates in addition to checking district anchors directly against v0.4. Public catalogue/filter counts remain unchanged. All 840 distinct public endpoint/mode combinations, equal/unknown endpoints and disconnected/fallback cases still pass.

## Implementation and performance

- `map-detail-plan.ts`: district-specific architectural/pool candidates, accepted geometry and a spatial road-clearance index. It keeps roofs, basins and planting off the public and private circulation.
- `map-landscape.ts`: deterministic one-time canopy, palm, flowering-bed and rock construction. There is no random regeneration while interacting with the map.
- `ResortDistrictDetails.tsx`: differentiated architecture, courtyards, channels, terraces and furnishings for every district.
- `ResortLandscapeLayer.tsx`: batched canopy paths, palm alleys, private gardens, flower beds and rock formations.
- `MapArtwork.tsx`: static SVG is memoized. Pan/zoom changes the shared wrapper transform rather than rebuilding the artwork. Architectural micro-linework and furniture are revealed above 1.4×; detail cards retain their full vector detail.

The 806 tree crowns are combined into four fill batches plus fine vein batches, rather than hundreds of separate React trees. The final base scene has **1,275 SVG descendants**, below the enforced 1,800-element budget.

Local Chromium production profiling used a **390×844 viewport, device scale 2 and 4× CPU throttling**. Observed p50/p95 pan frame intervals were about **16.7/16.8 ms**, JS heap about **9 MiB**, and there were **zero mutations inside the static artwork during zoom/pan**. These are measurements of this emulation run, not a performance guarantee for every physical phone. The repeatable benchmark has a conservative p95 <70 ms and JS heap <80 MiB regression budget.

## Verification

- `npx tsc -b`, scoped ESLint and production build with the `/aqua-paradise-resort/preview/` base.
- Four existing active v0.4 validators and `node scripts/test-map-network.mjs`.
- `node scripts/test-map-browser.cjs` against dev and production: eight viewport configurations, actual SVG coastline/building/pool clearance, detail density, no raster elements, catalogue, filters, cards, walking/shuttle navigation, reset, mouse, keyboard and real touch events.
- `node scripts/profile-map-browser.cjs`, with `MAP_TEST_URL` set to the local production server for the profile above.
- Visual review of the full island at default and enlarged scales, and of all ten selected districts and their vector cards. Screenshots and logs remain in ignored `work/`.

Whole-project ESLint retains its existing six errors on the unchanged Planner/Tickets/Zones pages and one App warning. No source on those pages or `main` is changed. Direct live-host access is restricted by the environment's network policy; local production-browser checks and the existing GitHub Pages deployment workflow are used separately.
