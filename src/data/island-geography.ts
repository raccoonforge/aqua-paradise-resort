/**
 * Aqua Paradise — fictional island geography v0.1.
 *
 * Local planar coordinates are in METRES, not latitude/longitude.
 * The coastline is a hand-authored illustrative outline rescaled to 6,000,000 m².
 * District points, paths and stop positions are only provisional anchors.
 * DO NOT interpret these anchors as surveyed distances, accessible routes, land
 * parcel boundaries or actual travel-time data.
 */

export type Point = Readonly<{ x: number; y: number }>
export type DistrictId =
  | 'paradise-boulevard'
  | 'paradise-market'
  | 'eden-gardens'
  | 'little-paradise'
  | 'serenity-spa'
  | 'pirates-cove'
  | 'atlantis-realm'
  | 'adrenaline-peak'
  | 'ocean-bay'
  | 'grand-hotel'

export type StopId =
  | 'gateway'
  | 'spa'
  | 'atlantis'
  | 'hotel'
  | 'peak'
  | 'ocean'
  | 'pirates'
  | 'little'
  | 'market'

type DraftPoint = readonly [number, number]
export const TARGET_LAND_AREA_M2 = 6_000_000

// y increases toward the NORTH. The south gateway is at the pointed narrow end.
// The northwestern coastline includes a secluded hotel cove; the northeastern
// coast encloses the larger public Ocean Bay inlet.
const coastlineDraft: readonly DraftPoint[] = [
  [464, 45], [533, 46], [599, 98], [661, 187], [731, 319],
  [818, 458], [897, 595], [944, 734], [960, 875], [931, 1014],
  [890, 1115], [825, 1162], [753, 1135], [701, 1072],
  [664, 1098], [624, 1171], [558, 1219], [479, 1228],
  [407, 1207], [344, 1172], [300, 1113], [267, 1059],
  [215, 1091], [149, 1101], [102, 1069], [73, 987],
  [51, 874], [59, 738], [108, 610], [174, 482], [251, 336],
  [323, 216], [389, 116],
]

function unsignedPolygonArea(vertices: readonly DraftPoint[]): number {
  let twiceArea = 0
  for (let i = 0; i < vertices.length; i += 1) {
    const a = vertices[i]
    const b = vertices[(i + 1) % vertices.length]
    twiceArea += a[0] * b[1] - b[0] * a[1]
  }
  return Math.abs(twiceArea) / 2
}

const scaleMetresPerDraftUnit = Math.sqrt(
  TARGET_LAND_AREA_M2 / unsignedPolygonArea(coastlineDraft),
)
function toMetres([x, y]: DraftPoint): Point {
  return { x: +(x * scaleMetresPerDraftUnit).toFixed(3), y: +(y * scaleMetresPerDraftUnit).toFixed(3) }
}

export const islandCoastline: readonly Point[] = coastlineDraft.map(toMetres)

export const districtAnchors: Readonly<Record<DistrictId, Point>> = {
  'paradise-boulevard': toMetres([493, 176]),
  'paradise-market': toMetres([485, 332]),
  'eden-gardens': toMetres([478, 564]),
  'little-paradise': toMetres([655, 525]),
  'serenity-spa': toMetres([300, 550]),
  'pirates-cove': toMetres([737, 748]),
  'atlantis-realm': toMetres([285, 790]),
  'adrenaline-peak': toMetres([518, 1043]),
  'ocean-bay': toMetres([801, 984]),
  'grand-hotel': toMetres([180, 954]),
}

export const districtLandHectares: Readonly<Record<DistrictId, number>> = {
  'paradise-boulevard': 35,
  'paradise-market': 25,
  'eden-gardens': 60,
  'little-paradise': 42,
  'serenity-spa': 35,
  'pirates-cove': 52,
  'atlantis-realm': 60,
  'adrenaline-peak': 65,
  'ocean-bay': 52, // terrestrial parcel only; sea excluded
  'grand-hotel': 52,
}

export const OTHER_LAND_HECTARES = {
  sharedInfrastructure: 52,
  protectedNaturalBuffers: 70,
} as const

export const paradiseLoopStops: ReadonlyArray<{
  id: StopId
  district: DistrictId
  location: Point
}> = [
  { id: 'gateway', district: 'paradise-boulevard', location: toMetres([531, 185]) },
  { id: 'spa', district: 'serenity-spa', location: toMetres([265, 506]) },
  { id: 'atlantis', district: 'atlantis-realm', location: toMetres([215, 753]) },
  { id: 'hotel', district: 'grand-hotel', location: toMetres([162, 910]) },
  { id: 'peak', district: 'adrenaline-peak', location: toMetres([519, 1106]) },
  { id: 'ocean', district: 'ocean-bay', location: toMetres([841, 933]) },
  { id: 'pirates', district: 'pirates-cove', location: toMetres([784, 751]) },
  { id: 'little', district: 'little-paradise', location: toMetres([699, 507]) },
  { id: 'market', district: 'paradise-market', location: toMetres([548, 356]) },
]

// The sequence is topological: bidirectional service joins each adjacent pair
// and the last stop returns to Gateway. It is not a surveyed road polyline.
export const paradiseLoopIsBidirectional = true
export const paradiseLoopIsCircular = true

export const proposedPedestrianLinks: readonly (readonly [DistrictId, DistrictId])[] = [
  ['paradise-boulevard', 'paradise-market'],
  ['paradise-market', 'eden-gardens'],
  ['eden-gardens', 'serenity-spa'],
  ['eden-gardens', 'atlantis-realm'],
  ['eden-gardens', 'little-paradise'],
  ['eden-gardens', 'pirates-cove'],
  ['atlantis-realm', 'adrenaline-peak'],
  ['atlantis-realm', 'grand-hotel'], // to public hotel reception ONLY
  ['pirates-cove', 'ocean-bay'],
  ['pirates-cove', 'little-paradise'],
  ['ocean-bay', 'adrenaline-peak'],
] as const

export function polygonAreaSquareMetres(polygon: readonly Point[]): number {
  let twiceArea = 0
  for (let i = 0; i < polygon.length; i += 1) {
    const a = polygon[i]
    const b = polygon[(i + 1) % polygon.length]
    twiceArea += a.x * b.y - b.x * a.y
  }
  return Math.abs(twiceArea) / 2
}

export function landBudgetHectares(): number {
  return Object.values(districtLandHectares).reduce((a, b) => a + b, 0)
    + OTHER_LAND_HECTARES.sharedInfrastructure
    + OTHER_LAND_HECTARES.protectedNaturalBuffers
}

/**
 * Validates the exact conceptual hectare budget and approximate coastline area.
 * District anchors are NOT site polygons and do not establish hectare allocations.
 */
export function validateIslandGeography(): string[] {
  const errors: string[] = []
  if (landBudgetHectares() !== 600) errors.push('Land budget must equal 600 hectares')
  const delta = Math.abs(polygonAreaSquareMetres(islandCoastline) - TARGET_LAND_AREA_M2)
  if (delta > 20) errors.push('Coastline polygon deviates from 6,000,000 m²')
  if (paradiseLoopStops.length !== 9) errors.push('Expected nine candidate Paradise Loop stops')
  return errors
}
