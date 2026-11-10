> Historical illustrated-map implementation. The current native SVG implementation is documented in [Luxury Minimalist Cartography](luxury-cartography.md).

# Interactive illustrated map — implementation and QA

This `/map` implementation supersedes the old PNG-as-interface experiment on `feat/premium-redesign`. Existing blueprints and canonical v0.4 planning datasets are preserved. This page uses an illustrated visitor plan rather than projecting the v0.4 land-use grid onto a different-shaped painting.

## Artwork and registration

`public/map/island.webp` is an original AI edit of the repository's supplied illustration, generated for this task. Embedded labels, sidebar, buttons, compass, scale and drawn shuttle overlay were removed. Physical cable-car infrastructure remains part of the scenery. Source dimensions are **1536 × 1024**, WebP approximately 568 KiB. It is an illustrated resort rendering; it is not a surveyed orthophoto or a 4096px layered architectural master. No invented high-resolution detail tiles or borrowed photographs are loaded. The selected-place image is a CSS crop of the same artwork.

Coordinates in `src/data/map-network.ts` are normalized to the complete image: `x = pixelX / 1536 * 100`, `y = pixelY / 1024 * 100`. The visible canvas crops the empty right-side ocean at x=80, giving a 6:5 scene; SVG uses `viewBox="0 0 80 100"`, HTML marker x is `x / 80 * 100%`. Artwork, graph geometry, route highlights and markers share the same world container and pan/zoom transform. Their aspect ratio never stretches. Fit uses the actual map viewport's container-query height, including when the mobile sheet expands.

Building-centred place labels and public entrance endpoints are deliberately separate; for example, hotel routing terminates at reception on the east perimeter and never traverses the villas. Paths were traced against the clean image's pedestrian corridors. Their visual accuracy is illustrative, not a geodetic guarantee. All coordinates and bends are reviewable in one source file. The historical v0.4 metric geometry remains a planning dataset and is not used to manufacture precise distances for this artwork.

## Network and interaction

One typed graph supplies pedestrian edges, eight boarding nodes, loop edges, route drawing and instructions. Every loop edge has the same corridor geometry as its pedestrian counterpart. There are no straight-line fallback routes for missing edges. Dijkstra state tracks boarding; transport selection produces connected walking access, a loop ride and walking egress, with explicit boarding/exit and calculated transfer count. Edge weights are dimensionless image lengths for choosing a path; the UI exposes **no kilometres, ETA, waiting time or claimed optimal travel time**. This is an authored visitor plan, not operational GPS guidance or a validated accessible-route guarantee.

The catalogue uses the existing ten destination descriptions (nine zones and hotel), the arrival objects documented in the project, and eight loop stops. It does not fabricate cafés, toilets or attractions with unknown positions. Stop marker detail appears on zoom, transport filtering, search, route use or the stop-layer toggle. One filtered result set drives both catalogue and pins.

The single right panel switches between catalogue, detail and navigator. Mobile uses a collapsible lower panel that allocates map space rather than covering the island. Search, category and route selections survive panel transitions. Route field/mode changes clear stale instructions. Equal endpoints produce a clear arrival message. Both selects include hotel, arrival nodes and stops.

Pointer capture handles mouse/touch pan, two-finger pinch anchors to the moving midpoint, lifting one finger resumes panning, drag suppresses accidental selection, and cancellation/lost capture clears gestures. Ctrl/Meta wheel zoom is anchored to the pointer; ordinary wheel leaves page scrolling available. Keyboard supports arrows, +/- and Home. Native controls and the full catalogue provide an alternative to spatial navigation. Reduced motion disables transitions.

## Repeatable checks

- `npm ci --cache /tmp/aqua-npm-cache` (lockfile repaired to include existing declared dependencies).
- `npx tsc -b`, `npm run build`.
- `npx eslint src/MapPage.tsx src/data/map-network.ts scripts/test-map-network.mjs scripts/test-map-browser.cjs`.
- Existing `validate-island-map-v0.4.mjs`, `validate-map-page.mjs`, `validate-premium-map-contract.mjs`, `test-map-geometry.mjs`.
- `node scripts/test-map-network.mjs`: all 840 distinct endpoint/mode cases plus identical/unknown endpoints, connected route geometry, reverse direction, station-only ride edges and terminal-only hotel access.
- With Playwright available and Chromium installed: start Vite, then `node scripts/test-map-browser.cjs`. `MAP_TEST_URL` and `CHROMIUM_PATH` can override defaults. Screenshots are written to ignored scratch directory `work/map-qa/`. Tests cover 360/390/768/1280/1440/1920 widths plus 844×390 landscape and 390×600 short-phone viewports, real touch events, keyboard, Ctrl-wheel, search/filter parity, details, hotel route, shuttle boarding and exit, equal points, reset and browser errors.

Whole-project ESLint currently reports six existing errors in PlannerPage, TicketsPage and ZonesPage, plus one App warning. These unrelated pages were left unchanged as requested. Map-scoped lint must pass. Preview publication is handled by the existing branch workflow; a successful source push alone does not prove deployment succeeded.

The archived v0.3 validator `validate-landuse-grid.mjs` still refers to its pre-archive path and cannot run unchanged; running against the archived file also reports its known fragmented legacy zones. The active v0.4 validations above are used for current planning geometry. No historical dataset was rewritten to mask that failure.

## Verification outcome — 2026-11-10

Clean dependency installation, TypeScript, production build, map-scoped ESLint, four active v0.4 validators, 840 graph combinations and all eight browser viewport configurations passed. Chromium scenarios also passed real pinch/pan, mouse drag suppression, direct marker selection, keyboard controls, reduced motion and runtime-error checks. Short landscape windows fit the island without forcing an oversized minimum page height. Full-project lint retains the six pre-existing errors and one warning described above. Other pages and `main` were not edited. The existing preview workflow successfully built production and preview and deployed them after the code push. Direct requests to `raccoonforge.github.io` are denied by this environment's network policy, so live-host visual verification is not claimed; browser verification used the local application.
