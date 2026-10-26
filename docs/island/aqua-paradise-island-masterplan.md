# Aqua Paradise — Island Master Site Layout (Concept v1.0)

**Status:** approved as conceptual placement by user on 2026-10-27; **not** a georeferenced, scaled or surveyed map. Existing schematic SVG was shown conversationally; this Markdown records its topology, not pixel geometry.

## Area and land allocation

Island land area: **6 km² = 600 hectares**, separate from the approximately 6 km distance to mainland. Marine bay water is not part of the 600 ha.

| Land allocation | Hectares |
|---|---:|
| Paradise Boulevard | 35 |
| Paradise Market | 25 |
| Eden Gardens | 60 |
| Little Paradise | 42 |
| Serenity Spa | 35 |
| Pirate's Cove | 52 |
| Atlantis Realm | 60 |
| Adrenaline Peak | 65 |
| Ocean Bay **onshore area only** | 52 |
| **Nine theme zones subtotal** | **426** |
| Paradise Grand Hotel & Villas | 52 |
| Shared roads, transport, technical infrastructure | 52 |
| Natural reserve, buffer areas, future growth | 70 |
| **TOTAL LAND** | **600** |

In-zone footpaths and service installations are included in the zone footprints; don't double-count in the shared infrastructure allowance. Precise polygon geometry is not yet calculated.

## Approved macro geography

- Island shape: elongated irregular teardrop; visitor gateway at **southern narrow end**. Entrance includes Ocean Wings cableway, ferry and fast-boat arrival, and tickets/access control.
- South-to-north active spine: **Paradise Gateway → Paradise Boulevard → Paradise Market → Eden Gardens**, with central pedestrian shortcuts and several paths between adjoining zones.
- **Eden Gardens** is an extensive central botanical green core with ponds, water features, bridges, shaded public paths; **not an empty middle**.
- Western inner districts: **Serenity Spa** southwest/intermediate; **Atlantis Realm** northwest/mid-to-north.
- Eastern inner districts: **Little Paradise** southeast/intermediate; **Pirate's Cove** northeast/mid-to-north.
- **Adrenaline Peak** in remote **northern elevated inland area**, with larger extreme-slide installations, hills and buffers; it is not placed at the entrance.
- **Paradise Grand Hotel & Villas** occupies a remote secluded **northwestern coastal bay**, with private accommodation/villas and its own guest/drop-off access, away from transit through private hotel grounds.
- **Ocean Bay** occupies remote **northeastern coast**, a **large protected crescent-shaped natural marine bay** with a wide open-water entrance, broad public sandy beach, managed bathing areas, lifeguard positions, separate shoreline promenade and Paradise Loop access.
- A vegetation-covered rocky headland / natural buffer separates hotel bay from Ocean Bay, so hotel private beach and public beach remain distinct.
- Gentle center hills, relatively flat walkable coastal regions, stronger northern topography at Adrenaline Peak; accessible alternative walking routes and engineering feasibility required.
- Artificial pools at themed zones and natural marine bathing require distinct hygiene, operational and safety constraints.

## Preliminary pedestrian circulation

- Wide, shaded public boulevard from Gateway to Market and Eden Gardens.
- Multiple **diagonal and transverse internal pedestrian paths**, linking Eden to surrounding zones and adjacent zones directly; avoiding mandatory detours to the centre.
- Separate coastal promenade access, staff/service roads, emergency and hotel baggage access, and accessible circulation.
- No public pedestrian shortcut through hotel private villa grounds.

## Paradise Loop — accepted working concept, route geometry provisional

- **Free two-direction continuous ring**, not a shuttle line that stops at each individual attraction.
- Working route direction and nine **candidate** district stops: (1) Paradise Gateway → (2) Serenity Spa → (3) Atlantis Realm → (4) Grand Hotel → (5) Adrenaline Peak → (6) Ocean Bay → (7) Pirate's Cove → (8) Little Paradise → (9) Paradise Market → (1) Paradise Gateway. Reverse route in opposite direction.
- **Eden Gardens has no shuttle stop inside its central protected gardens**; central access relies on surrounding stops and footpaths.
- Stops, exact number, ring alignment and ordering need feasibility check against actual terrain, service access, distance and pedestrian crossings.
- No invented distances, travel times, headways, fleet size, route coordinates, or unsupported accessibility claims. Route graph needs later engineering-level definition for `/map` and `/planner`.

## Boundaries and visual layout

The approved concept is a **connected island with a populated central core and large districts**, not a necklace of small edge zones. Macro blocks: remote NW hotel bay; remote NE Ocean Bay; north inland Peak; northwest Atlantis; northeast Pirate's Cove; central Eden; west/SW Spa; east/SE Little Paradise; south Market and Boulevard/Gateway. Shapes should respond to shoreline/topography rather than be rigid tiles.

The illustrative full-island colored schematic is **non-geometric**: visual relative sizes do not enforce the approved hectare table. Georeferenced/scale-aware polygons, coastal polygons, water/land split, bridges, attraction footprints, actual paths and loop stop position are **next tasks**.

## Planned follow-up

1. Place the known, named attractions and major public facilities in their districts using `docs/website-requirements.md` as sole source of attraction names, operations, restrictions and dimensions where defined. Begin with large high-impact elements of Adrenaline Peak and Atlantis Realm, then other districts.
2. Define scaled land polygons and minimum infrastructure buffers. Reconcile 600-ha allocation.
3. Build consistent pedestrian/shuttle graph with accessibility and emergency/service access.
4. Synchronize `docs/project-bible.md`, `docs/website-requirements.md` and `docs/aqua-paradise-master-blueprint.md` after confirming cross-document conflicts. Preserve original history, do not silently rewrite pending decisions.
5. Only then implement interactive `/map` and time-based routing in `/planner`.

**Caution:** This is a conceptual master plan, not a finalized geographic map or built website.
