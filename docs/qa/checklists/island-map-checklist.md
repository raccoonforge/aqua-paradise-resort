# /map implementation and QA — 2026-10-27

## Implementation

- Runtime land-use and pins: `src/data/island-map-v0.4.json`, validated against the canonical v0.4 files. No archived geography/transport modules imported.
- `src/components/map/geometry.ts` traces cell boundaries, including holes, then applies a single affine oblique projection to land and district anchors. Boundaries remain the v0.4 grid; no new coastline is substituted.
- `ResortArtwork.tsx` contains original SVG architectural miniatures. They are decorative district-level illustrations, not surveyed footprints or precise ride markers. This is a lightweight 2.5D illustration, not a photorealistic 3D renderer.
- `IslandMap.tsx`: pointer drag, two-pointer pinch, bounded cursor-centred Ctrl-wheel zoom, buttons, keyboard arrows/+/-/Home, accessible numbered markers, category/search intersection, single catalogue/detail panel, return preserving query/filters/view, mobile lower sheet, optional boundary layer.
- UI reduced motion disables camera transitions. Desktop uses a single side panel; mobile uses a collapsible overlay and moves the camera above it.
- Zone/hotel links retain canonical target URLs; destination pages are outside this task and are not implemented in this repository yet. UI explicitly indicates this.
- Route action explains the missing verified road/Paradise Loop graph. No invented path, distance, ETA, stops, ride coordinates or accessible-route guarantee is shown.

## Automated checks

| Check | Result |
| --- | --- |
| `npm run build` (TypeScript + Vite) | Passed |
| `npm run lint` | Passed |
| `node scripts/validate-island-map-v0.4.mjs` | Passed: 15,001 cells, contiguous visitor zones, source area tolerances |
| `node scripts/validate-map-page.mjs` | Passed: runtime/canonical geometry match; all ten pins in their zones |
| `node scripts/test-map-geometry.mjs` | Passed: projected coast and all 12 class areas match cell union, ten pins within viewport, north orientation |

## Browser checks

Chromium desktop and a 390 × 844 embedded viewport using the same `/map` page:

| Scenario | Result |
| --- | --- |
| Desktop overview and district illustrations render | Passed |
| Direct map marker opens and centres Atlantis | Passed |
| Case/space-insensitive search (`  ATLANTIS  `) | Passed: one result |
| Catalogue selection opens detail in same panel | Passed |
| Route action explains unavailable navigation | Passed |
| Back preserves query and zoom | Passed |
| Family filter + Atlantis query | Passed: empty state, other markers removed from tab order |
| Reset search and filters | Passed: ten destinations restored |
| Mouse drag and reset | Passed: camera translation changes and resets |
| Keyboard arrow/+ and Home | Passed: pan/120% zoom and return to 100% |
| Mobile overview and larger numbered markers | Passed |
| Mobile bottom sheet expand/collapse | Passed |
| Mobile catalogue selection centres Atlantis above sheet | Passed |

Physical multi-touch pinch, Safari/iOS/Android devices and low-end-device profiling still need real-device checks. Pointer handlers support two fingers but this environment does not provide physical multi-touch input. Reduced-motion behaviour is implemented in CSS; an OS-level reduced-motion/browser/device pass remains pending.

## Preview build

`VITE_MAP_PREVIEW=true npm run build` makes all paths render the map for a standalone map preview. The regular `npm run build` preserves the original home/map split. This avoids implying the other resort pages have been completed. The preview uses the existing smaller brand asset as a loading fallback; original large GitHub image blobs are preserved in the GitHub commit.

Desktop visual evidence: [map-desktop.jpg](../map-desktop.jpg).
