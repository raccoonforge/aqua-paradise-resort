# Aqua Paradise — premium island map production pack

**Stage:** asset-and-implementation contract. **Purpose:** replace the current miniature-looking SVG illustration with a premium, architecturally credible, zoomable island map; keep existing React interactions. Design source: [map specification](../pages/map.md). Geography: [land-use v0.4](../data/island-map-landuse-v0.4.json).

## Creative direction (non-negotiable)

**Architectural visualization, NOT board-game / low-poly amusement-park icons.** Tropical Luxury × Adventure. The island is a **6 km²** resort for 10–15k concurrent visitors: do not depict one small ride per 50–65 ha district. Expansive forest canopy, meandering pedestrian infrastructure, broad water bodies, large attractions, service spaces, elevation and coastal variation should communicate distance and land area.

Camera: consistent oblique aerial / near-isometric perspective at approximately 35–50° down from horizontal, north toward top. Warm midday tropical sunlight from upper left; ambient occlusion, realistic cast shadows, material textures and natural vegetation variation. Legible at desktop ~1100 × 700px and mobile 390px; use a high-resolution source at least 4096 × 4096 for a raster master, ideally layered vector or 3D source. Avoid miniature floating-island trope, visual clutter, obvious repeated palm motifs, giant inconsistent buildings and unsourced borrowed photography.

Palette: deep lagoon #137e89; shallow water #70d2cc; beach #ead9aa; canopy #2b684b / #74a976; limestone #dad1b5; polished stone #f4f1e9; UI ink #193e38; subtle brass #b78c4c. Distinctive district palettes should harmonize with environment, not flat bright color blocks.

## Non-negotiable geographical anchors

| Region | Location / primary hero features |
|---|---|
| Paradise Boulevard | narrow southern gateway, arrival plaza; cable-car terminal AND marine jetty |
| Paradise Market | southern entertainment axis, dining pavilions and terraces |
| Eden Gardens | large coherent central botanical canopy, gardens, trails, shaded ponds |
| Little Paradise | southeast family waterslides and shallow splash pools |
| Serenity Spa | southwest quiet lagoon pools, privacy and cabanas |
| Pirate’s Cove | east/northeast lagoon, pirate ship and themed family slides |
| Atlantis Realm | west/northwest ruin structures and water rides, Crystal Passage only as conceptual POI |
| Adrenaline Peak | northern inland high-relief ridge; dramatic multi-slide towers and distinct elevation |
| Ocean Bay | distant northeast protected **natural seawater** beach with onshore amenities |
| Paradise Grand Hotel & Villas | distant northwest coastal bay; larger hotel complex, villa campus; private perimeter, no public transit through villas |

Area commitments in hectares: Boulevard 35, Market 25, Eden 60, Little 42, Spa 35, Pirate 52, Atlantis 60, Peak 65, Ocean onshore 52, Hotel 52, shared 52, nature buffers 70. Ocean's sea acreage is *not* included in 600ha. Use [v0.4 geometry](../data/island-map-landuse-v0.4.json) for interactivity and exact spatial IDs, and [v0.4 district pins](../data/island-map-markers-v0.4.json). The hand-painted base should follow those relationships rather than replacing them.

## Asset deliverables and file conventions

1. **Master base:** `public/map/aqua-paradise-island-master.webp` (minimum 4096px, preferably 6144+). No labels, pins, UI widgets or text baked into the image.
2. **Fallback preview:** `public/map/aqua-paradise-island-preview.webp` (1200–1600px).
3. **Optional vector source:** `public/map/aqua-paradise-island-source.svg` when authoring natively in SVG; preserve layered editing source separately if available.
4. **District detail tiles:** `public/map/zones/<slug>.webp` (10 files, minimum 1600 × 1600). At scale >1.8, show more structures rather than merely enlarging a blurry master.
5. **Supporting imagery for detail panels:** `public/map/cards/<slug>.webp` (10 files, 3:2 landscape aspect) with distinct photography-quality architectural visualizations.
6. **Map mask:** derived computationally from v0.4 raster/contours. **Never paint hotspots in arbitrary pixel coordinates.** Store a documented affine/calibration mapping between art image and land-use coordinates.

All images should be original/commissioned/licensed with provenance, image alt strategy and approximate size budget. Every raster must be optimized (WebP/AVIF) and keep text outside bitmap for translation and accessibility.

## Implementation architecture

- `src/data/island-map-v0.4.json`: geometry + district pins, single source for the interactive frontend.
- `src/components/map/geometry.ts`: common world-to-screen projection. Treat any artwork as registered to exactly this transform.
- `src/components/map/ResortArtwork.tsx`: **temporary fallback**, not the finished premium visual; may be removed only after visual assets and fallback testing exist.
- `src/components/IslandMap.tsx`: scene composition, current selection/pan/zoom/touch/keyboard/search/filter/sidebar. Preserve behaviors.
- Planned `src/components/map/layers/IslandBaseLayer.tsx`: renders low-res preview then high-res master with graceful loading/failure fallback.
- Planned `src/components/map/layers/DistrictDetailLayer.tsx`: reveal zone detail only at scale threshold; tie to same projection.
- Planned `src/components/map/layers/InteractiveZonesLayer.tsx`: absolute SVG hit regions from canonical geometry, keyboard focus + visually highlighted selected district.
- Planned `src/components/map/layers/InfrastructureLayer.tsx`: show cable car, jetty and **only verified** walking/Paradise Loop geometry. Unverified paths remain decorative and never feed ETA.
- Planned `src/components/map/layers/MapLabelLayer.tsx`: responsive labels, collisions and legends; labels remain HTML/SVG (not baked into image).
- Panel: 70/30 desktop; bottom-sheet catalog and detail on mobile. Use one panel state machine (catalog → detail → route placeholder) and a functional Back action; no second overlapping sidebar.

## Acceptance checklist

- Scene immediately reads as an enormous premium island resort without relying on labels.
- At least 3–5 distinguishable built/landscape structures per major district at detail zoom; obvious elevation at Peak, separate coastal bays, visible arrival hub.
- Landscape varies physically: forest clusters, cleared attractions, terrain slopes, beach gradation, lagoon depth, shadowing.
- Alignment: land mask and imagery reasonably coincide within a documented tolerance; district pins inside relevant polygons; zero public hotel shortcuts.
- Zoom anchored to pointer on ctrl-wheel; two-finger pinch on touch; buttons and reset; selected district recenters while leaving sidebar unobscured.
- Sidebar catalog/search/filter/detail/Back work consistently; no fake ETA; route action explicitly says unavailable until graph passes checks.
- Mobile width 360, 390, 768; desktop 1280, 1440, 1920; keyboard, screen reader, focus visibility and reduced motion.
- Lighthouse/basic profiling: fast preview, lazy high-res tiles, reasonable memory on mid-range mobile; no multi-megabyte duplicated textures per frame.
- `npm run build`, `npm run lint`, `node scripts/validate-island-map-v0.4.mjs` and `node scripts/validate-map-page.mjs` must pass, plus actual browser screenshots at desktop/mobile.

## Honest readiness

**Existing:** layout, interactions, illustrated SVG fallback, canonical v0.4 district geometry and pins. **Missing:** high-quality production art, district detail tiles, calibrated art/map registration, actual transportation polylines and mobile/browser performance signoff. Do not describe the current generated SVG as photorealistic 3D.
