import {
  districtAnchors,
  paradiseLoopStops,
  proposedPedestrianLinks,
  type DistrictId,
  type Point,
  type StopId,
} from './island-geography'

/**
 * Topological connections (v0.1), NOT constructed footpaths or shuttle roads.
 * The model deliberately stores NO travel durations or walkable distances.
 * Links must be replaced by surveyed/on-site-designed polylines before
 * ETA generation, step-free guarantees or driving instructions are shown.
 */
export type RouteNodeId = DistrictId | `stop:${StopId}`

export type TransportEdge = Readonly<{
  from: RouteNodeId
  to: RouteNodeId
  mode: 'walk' | 'shuttle'
  geometry: 'conceptual'
  bidirectional: true
}>

export const plannedPedestrianEdges: readonly TransportEdge[] =
  proposedPedestrianLinks.map(([from, to]) => ({
    from, to, mode: 'walk', geometry: 'conceptual', bidirectional: true,
  }))

export const plannedShuttleEdges: readonly TransportEdge[] =
  paradiseLoopStops.map((stop, i) => ({
    from: `stop:${stop.id}` as RouteNodeId,
    to: `stop:${paradiseLoopStops[(i + 1) % paradiseLoopStops.length].id}` as RouteNodeId,
    mode: 'shuttle', geometry: 'conceptual', bidirectional: true,
  }))

export const plannedStopAccess: readonly TransportEdge[] =
  paradiseLoopStops.map((stop) => ({
    from: `stop:${stop.id}` as RouteNodeId,
    to: stop.district, mode: 'walk', geometry: 'conceptual', bidirectional: true,
  }))

export const conceptualTransportEdges: readonly TransportEdge[] = [
  ...plannedPedestrianEdges,
  ...plannedShuttleEdges,
  ...plannedStopAccess,
]

/** Pure graph-reachability checker; never treat its hop count as travel time. */
export function isConceptuallyReachable(
  origin: RouteNodeId,
  destination: RouteNodeId,
  modes: readonly ('walk' | 'shuttle')[] = ['walk', 'shuttle'],
): boolean {
  if (origin === destination) return true
  const visited = new Set<RouteNodeId>([origin])
  const queue: RouteNodeId[] = [origin]
  for (let offset = 0; offset < queue.length; offset++) {
    const current = queue[offset]
    for (const edge of conceptualTransportEdges) {
      if (!modes.includes(edge.mode)) continue
      const other = edge.from === current ? edge.to : edge.to === current ? edge.from : null
      if (other === null || visited.has(other)) continue
      if (other === destination) return true
      visited.add(other)
      queue.push(other)
    }
  }
  return false
}

/** Returns only the fewest-EDGE conceptual sequence, not the shortest distance or time. */
export function conceptualRoute(
  origin: RouteNodeId,
  destination: RouteNodeId,
  modes: readonly ('walk' | 'shuttle')[] = ['walk', 'shuttle'],
): RouteNodeId[] | null {
  const parents = new Map<RouteNodeId, RouteNodeId | null>([[origin, null]])
  const queue: RouteNodeId[] = [origin]
  for (let offset = 0; offset < queue.length && !parents.has(destination); offset++) {
    const current = queue[offset]
    for (const edge of conceptualTransportEdges) {
      if (!modes.includes(edge.mode)) continue
      const next = edge.from === current ? edge.to : edge.to === current ? edge.from : null
      if (!next || parents.has(next)) continue
      parents.set(next, current)
      queue.push(next)
    }
  }
  if (!parents.has(destination)) return null
  const reversed: RouteNodeId[] = []
  let current: RouteNodeId | null = destination
  while (current !== null) {
    reversed.push(current)
    current = parents.get(current) ?? null
  }
  return reversed.reverse()
}

export type MapNode = Readonly<{ id: RouteNodeId; location: Point }>

/** Display-only point anchors; edges between them are NOT geographical lines. */
export const conceptualMapNodes: readonly MapNode[] = [
  ...(Object.entries(districtAnchors) as [DistrictId, Point][]).map(([id, location]) => ({ id, location })),
  ...paradiseLoopStops.map(({ id, location }) => ({ id: `stop:${id}` as RouteNodeId, location })),
]

export function validateConceptualTransportGraph(): string[] {
  const errors: string[] = []
  const known = new Set(conceptualMapNodes.map((node) => node.id))
  for (const edge of conceptualTransportEdges) {
    if (!known.has(edge.from) || !known.has(edge.to)) errors.push(`Unknown edge endpoint: ${edge.from} → ${edge.to}`)
    if (edge.from === edge.to) errors.push(`Self-connection: ${edge.from}`)
  }
  for (const id of known) {
    if (!isConceptuallyReachable('paradise-boulevard', id)) errors.push(`Unreachable from south gateway: ${id}`)
  }
  if (!isConceptuallyReachable('stop:gateway', 'stop:hotel', ['shuttle'])) {
    errors.push('Shuttle ring does not connect gateway to hotel')
  }
  if (!isConceptuallyReachable('paradise-boulevard', 'ocean-bay', ['walk'])) {
    errors.push('Walking links do not connect gateway to Ocean Bay')
  }
  return errors
}
