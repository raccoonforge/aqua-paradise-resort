# Aqua Paradise — Luxury Botanical Resort Cartography

Current `/map` artistic direction, 2026-11-11. The orthographic technical foundation remains intact; the former engineering-style visual treatment is superseded. This explicitly supersedes the earlier isometric/raster art direction for this page. The older production pack and illustrated implementation notes are retained as history.

## Identity and geography

The map is original code-authored **orthographic SVG**: deep ocean teal `#15494c`, sage land cover, ivory ground, sand beaches and champagne architectural linework. There are no raster image backgrounds, image fills, generated illustrations, perspective transforms, 3D buildings, filters or drop shadows in the artwork. The previous PNG and WebP are retained in the repository but are not requested or displayed by `/map`, including its detail cards.

All ten district/hotel anchors are derived directly from `src/data/island-map-v0.4.json`, not copied from the previous painted illustration. Projection is isotropic: **x = 50 + east × 0.028; y = 48 − north × 0.028**. East is right, north is up. Tests independently compare this with the documented v0.4 marker JSON. The northern ridge, northwest hotel, northeast sea bay, central gardens, southwest spa, southeast family district and southern arrival hub retain their documented relationships. Coastline and landscape are a new authored visitor plan, not a claim that its hand-drawn perimeter reproduces the metric parcel boundaries or area of the v0.4 land-use grid.

The hotel route terminates at reception; private villas do not become a public shortcut. The eight documented loop stops serve Boulevard, Market, Pirate’s Cove, Ocean Bay, Peak, Atlantis, Eden and Spa. Little Paradise has pedestrian access. The cable-car terminal and marine jetty stay at the southern gateway; a drawn deck carries the final pedestrian segment to the jetty.

## Layers and source files

- `src/data/map-network.ts`: canonical-anchor projection, searchable places, station nodes, shared pedestrian/shuttle edge geometry and Dijkstra routing. `pathData` rounds polyline corners and is shared by the base roads and route overlays.
- `src/data/map-plan.ts`: original coastline, landscape patches, flat architectural footprints and water-body geometry. Physical footprints and pools are also obstacle inputs for tests.
- `src/components/map/MapArtwork.tsx`: `GeographyLayer`, `InfrastructureLayer`, `ArchitectureLayer`. The same SVG renderer supplies map detail cards with a local viewBox. Each instance receives a unique clip ID.
- `src/components/map/MapObjectsLayer.tsx`: accessible React object controls positioned in the same 100×100 world; the catalogue supplies the full textual alternative. Symbols stay readable while their coordinates follow zoom/pan.
- `src/components/map/MapRouteLayer.tsx`: loop visibility, selected route and origin/destination entrance circles. Every highlighted segment uses exactly the same path generator and edge coordinates as a rendered road.
- `src/MapPage.tsx`: catalogue, filters, detail/navigator panels and pointer/keyboard interaction.
- `src/components/map/premium-map.css`: scoped map styling, square world fitting, small-screen bottom panel and reduced-motion behavior.

SVG is resolution independent, so this direction needs neither a bitmap master nor raster detail tiles. Labels remain actual interface text. There are no synthetic cafés, services or attraction pins with unverified positions. No geodetic distance, ETA or operating schedule is fabricated from drawing units.

## Interaction and responsive behavior

Search and categories use the existing destination descriptions. Catalogue and map selection share state. Selecting a place centres it; cards use a vector detail of that same location. Back retains search/category and map state. Native selects include zones, hotel, arrival infrastructure and loop stops. Route changes clear stale instructions; equal endpoints and unavailable connections are handled explicitly. Shuttle instructions include pedestrian access, boarding, intermediate stations, exit and transfer count.

Mouse drag, anchored Ctrl/Meta-wheel, two-finger pinch, single-finger pan, cancellation, keyboard arrows/+/-/Home and reset are retained. Viewport resizing scales the stored translation so selected places remain centred. Mobile panels allocate space rather than cover the island. Short phone/landscape layouts reserve room for the map; all panels scroll internally. At small viewports, full names are available in the catalogue and on selected/focused markers instead of overlapping every label.

## Verification

- TypeScript and production build at `/aqua-paradise-resort/preview/`.
- ESLint for all changed React/data/test modules.
- Four existing active v0.4 validators, preserving the original canonical planning dataset.
- `node scripts/test-map-network.mjs`: 840 distinct origin/destination/mode combinations, identical and unknown endpoints, disconnected graph, walking fallback, reverse geometry, eight documented station names, canonical anchor projection and hotel access policy. Dense samples test road clearance against building footprints and water, including the stroke allowance.
- `node scripts/test-map-browser.cjs`: Chromium at 360×900, 390×900, 768×900, 1280×900, 1440×900, 1920×900, 844×390 and 390×600. Tests cover search/filter parity, empty results, cards, hotel access, shuttle boarding/exit, reset, equal endpoints, keyboard, pointer-centred wheel, mouse drag suppression, direct marker selection, real touch pinch/pan and reduced motion. They assert zero raster map elements and sample the **actual rounded SVG paths** against the coastline, building footprints and water. The jetty deck is the explicit shoreline exception.
- The same browser scenarios run against the production preview build. Screenshots and logs are kept in ignored `work/`.

Whole-project lint still reports the existing six errors in the unchanged Planner/Tickets/Zones pages and one App warning. Those pages are outside this task. The historical v0.3 validator still targets an archived dataset; active v0.4 checks and the new rendered-plan checks are the current acceptance suite.

The existing branch preview workflow builds production from `main` and the new map under `/preview/`. No other website page or `main` source is edited. This environment's network policy blocks direct requests to the public GitHub Pages host; local production-browser checks and GitHub Actions deployment status are reported separately.

## Architectural detailing revision

The same approved plan now has district-specific compounds, pools, private gardens, dense varied forest canopy and secondary circulation. Sources, access rules, preserved coordinates and measured mobile-emulation performance are recorded in [Masterplan detailing](masterplan-detailing.md). This remains the same orthographic SVG map and interactive UI.


## Botanical artistic revision — 2026-11-11

This is a change of visual language, not a density increase. The coastline, all place and station coordinates, physical footprints and the complete public/private circulation model are unchanged. No new source or asset files are introduced.

- Ten softly shaped garden estates replace the empty beige field. Celadon, moss, jade, limestone, warm sand and restrained coral distinguish the areas without bright categorical blocks. Warm coastline bands, organic garden-pond shorelines, mineral ridge lines and a light native-SVG ink-grain pattern give the island an illustrated-atlas surface.
- The former 806 small canopy marks are replaced by **156 larger botanical compositions**: heliconia/banana leaves, feather palms and split philodendron leaves, with readable venation, varied orientation and six pigment batches. Existing palm alleys remain. These are artistic foliage symbols, not a literal tree inventory.
- Each district has a dedicated `data-signature` composition: hotel wings and pool courts; ridge/flume gardens; a natural crescent beach; Atlantis colonnades; a petal-plan botanical conservatory; harbour/deck silhouettes; thermal courts; warm gallery arcades; shallow family water gardens; and the formal arrival sequence. Garden ponds use clipped organic silhouettes inside the retained conservative water-clearance envelopes. Smaller roof masses recede at overview scale and strengthen on zoom, creating hierarchy rather than visual clutter.
- Number-disc pins and boxed engineering labels are replaced by custom vector crests and unboxed serif atlas lettering. Every icon has the same underlying place coordinate, accessible button label, focus/selection state and inverse-zoom anchoring as before. Station, cable-car, entrance and jetty symbols use the same visual family.

Implementation changes stay in the existing artwork, landscape, district, marker, page and scoped-CSS files. The three independent SVG/React layers for scenery, route geometry and interactive objects remain separate. There are no raster backgrounds, perspective transforms or new catalogue objects.

Verification: TypeScript, scoped ESLint, production preview build, all 840 route combinations, four v0.4 checks, and eight Chromium viewport configurations against both dev and production. Rendered road/building/water/shore clearance, gestures, keyboard, search, cards, filters, reset and stop selection remain covered. Tests now verify ten distinct district signatures and garden estates and bounded botanical variety instead of enforcing hundreds of tree dots.

Local production profiling at 390×844, device scale 2 and CPU throttling ×4 observed about **16.7 ms p95** during pan, **7 MiB JS heap**, **1,346 SVG descendants** and **zero mutations inside the memoized artwork** during zoom/pan. These describe that emulation run, not every physical phone. Existing full-project lint failures on unchanged pages remain outside this map change. Public GitHub Pages publication is verified through its deployment workflow; live-host visual checking is restricted by this environment's network policy.
