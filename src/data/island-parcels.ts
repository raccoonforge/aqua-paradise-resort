import {
  districtAnchors,
  districtLandHectares,
  islandCoastline,
  OTHER_LAND_HECTARES,
  polygonAreaSquareMetres,
  type DistrictId,
  type Point,
} from './island-geography'

/**
 * Provisional, computer-derived land parcels — NOT a surveyed or approved
 * engineering map. Weighted nearest-site cells partition the whole coastline.
 * Two extra cells represent abstract shared infrastructure and reserve land;
 * their shapes must later be redesigned into actual roads and nature buffers.
 */
export type ParcelId = DistrictId | 'shared-infrastructure' | 'nature-reserve'
export type Parcel = Readonly<{
  id: ParcelId
  anchor: Point
  targetHectares: number
  polygon: readonly Point[]
  actualHectares: number
}>

const districtIds = Object.keys(districtLandHectares) as DistrictId[]
const mean = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })
const anchors: readonly { id: ParcelId; point: Point; hectares: number }[] = [
  ...districtIds.map((id) => ({ id, point: districtAnchors[id], hectares: districtLandHectares[id] })),
  // These 2 seeds are ONLY stand-ins to achieve a complete land partition.
  // Shared roads cannot realistically be modeled as one contiguous polygon.
  { id: 'shared-infrastructure', point: mean(districtAnchors['paradise-market'], districtAnchors['little-paradise']), hectares: OTHER_LAND_HECTARES.sharedInfrastructure },
  { id: 'nature-reserve', point: mean(districtAnchors['atlantis-realm'], districtAnchors['adrenaline-peak']), hectares: OTHER_LAND_HECTARES.protectedNaturalBuffers },
]

/** Clip a polygon to nx*x + ny*y <= limit (Sutherland–Hodgman). */
function clipHalfPlane(vertices: readonly Point[], nx: number, ny: number, limit: number): Point[] {
  const output: Point[] = []
  for (let k = 0; k < vertices.length; k++) {
    const p = vertices[k]
    const q = vertices[(k + 1) % vertices.length]
    const dp = nx * p.x + ny * p.y - limit
    const dq = nx * q.x + ny * q.y - limit
    const inP = dp <= 1e-8
    const inQ = dq <= 1e-8
    if (inP) output.push(p)
    if (inP !== inQ) {
      const t = dp / (dp - dq)
      output.push({ x: p.x + t * (q.x - p.x), y: p.y + t * (q.y - p.y) })
    }
  }
  return output
}

/**
 * Power diagram clipped to the island coastline. For site i the distance
 * score is squared distance to its seed minus weight[i].
 */
function cells(weights: readonly number[]): Point[][] {
  return anchors.map((a, i) => {
    let polygon: Point[] = [...islandCoastline]
    for (let j = 0; j < anchors.length && polygon.length; j++) {
      if (i === j) continue
      const b = anchors[j]
      const nx = 2 * (b.point.x - a.point.x)
      const ny = 2 * (b.point.y - a.point.y)
      const limit = b.point.x ** 2 + b.point.y ** 2
        - a.point.x ** 2 - a.point.y ** 2 + weights[i] - weights[j]
      polygon = clipHalfPlane(polygon, nx, ny, limit)
    }
    return polygon
  })
}

/**
 * Iterative balancing optimizes each power cell toward the agreed land budget.
 * Tolerance and convergence are intentionally exposed; do not call it exact
 * unless validateParcelAreas() returns no errors.
 */
export function createProvisionalParcels(
  iterations = 1400,
  gain = 0.8,
): readonly Parcel[] {
  const weights = anchors.map(() => 0)
  let polygons: Point[][] = []
  for (let step = 0; step < iterations; step++) {
    polygons = cells(weights)
    let maxError = 0
    for (let i = 0; i < anchors.length; i++) {
      const goal = anchors[i].hectares * 10_000
      const actual = polygonAreaSquareMetres(polygons[i])
      const error = goal - actual
      maxError = Math.max(maxError, Math.abs(error))
      weights[i] += gain * error
    }
    // Remove arbitrary common offset to reduce numeric magnitude.
    const average = weights.reduce((a, b) => a + b, 0) / weights.length
    for (let i = 0; i < weights.length; i++) weights[i] -= average
    if (maxError < 50) break // 0.005 hectares
  }
  polygons = cells(weights)
  return anchors.map((a, i) => ({
    id: a.id,
    anchor: a.point,
    targetHectares: a.hectares,
    polygon: polygons[i],
    actualHectares: polygonAreaSquareMetres(polygons[i]) / 10_000,
  }))
}

export function validateParcelAreas(
  parcels: readonly Parcel[],
  toleranceHectares = 0.05,
): string[] {
  const errors: string[] = []
  if (parcels.length !== 12) errors.push('Expected ten districts plus two land categories')
  for (const parcel of parcels) {
    if (parcel.polygon.length < 3) errors.push(`Parcel ${parcel.id} is empty`)
    if (Math.abs(parcel.actualHectares - parcel.targetHectares) > toleranceHectares) {
      errors.push(`${parcel.id}: ${parcel.actualHectares.toFixed(3)} ha vs ${parcel.targetHectares} ha`)
    }
  }
  const total = parcels.reduce((sum, p) => sum + p.actualHectares, 0)
  if (Math.abs(total - 600) > toleranceHectares) errors.push(`Total land: ${total.toFixed(3)} ha`)
  return errors
}

export const provisionalParcels = createProvisionalParcels()
