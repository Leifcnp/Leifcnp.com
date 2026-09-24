import type { IslandDefinition } from '../content/islands'

export interface NavigationPoint {
  readonly x: number
  readonly z: number
}

export interface NavigationBounds {
  /** The water field extends from -worldLimit to +worldLimit. */
  readonly worldLimit: number
  /** The vessel's horizontal clearance from an obstacle or world edge. */
  readonly vesselClearance: number
}

export interface SafeDockingRoute {
  readonly ok: true
  readonly islandId: string
  readonly points: readonly NavigationPoint[]
  readonly target: NavigationPoint
  readonly distance: number
  readonly clearance: number
}

export type RouteFailureReason =
  | 'invalid-start'
  | 'invalid-bounds'
  | 'unknown-island'
  | 'target-annulus-too-small'
  | 'start-in-obstacle'
  | 'target-out-of-bounds'
  | 'no-safe-route'

export interface FailedDockingRoute {
  readonly ok: false
  readonly islandId: string
  readonly reason: RouteFailureReason
  readonly message: string
}

export type SafeDockingRouteResult = SafeDockingRoute | FailedDockingRoute

const EPSILON = 1e-7
const SAFETY_MARGIN = 0.28
const CANDIDATE_COUNT = 20

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function pointIsFinite(point: NavigationPoint): boolean {
  return finite(point?.x) && finite(point?.z)
}

function distance(first: NavigationPoint, second: NavigationPoint): number {
  return Math.hypot(first.x - second.x, first.z - second.z)
}

function failure(islandId: string, reason: RouteFailureReason, message: string): FailedDockingRoute {
  return { ok: false, islandId, reason, message }
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

/** Return the closest distance from a point to a finite line segment. */
function distanceToSegment(point: NavigationPoint, start: NavigationPoint, end: NavigationPoint): number {
  const dx = end.x - start.x
  const dz = end.z - start.z
  const lengthSquared = dx * dx + dz * dz
  if (lengthSquared <= EPSILON) return distance(point, start)
  const projection = clamp(((point.x - start.x) * dx + (point.z - start.z) * dz) / lengthSquared, 0, 1)
  return Math.hypot(point.x - (start.x + dx * projection), point.z - (start.z + dz * projection))
}

function withinBounds(point: NavigationPoint, limit: number, clearance: number): boolean {
  const bound = limit - clearance
  return point.x >= -bound - EPSILON && point.x <= bound + EPSILON && point.z >= -bound - EPSILON && point.z <= bound + EPSILON
}

function segmentIsSafe(
  start: NavigationPoint,
  end: NavigationPoint,
  obstacles: readonly { readonly center: NavigationPoint; readonly radius: number }[],
  limit: number,
  clearance: number,
): boolean {
  if (!withinBounds(start, limit, clearance) || !withinBounds(end, limit, clearance)) return false
  for (const obstacle of obstacles) {
    const required = obstacle.radius + clearance
    // A route point is valid only outside the expanded circle. Checking the
    // complete segment also prevents a detour from clipping an island between
    // two otherwise safe waypoints.
    if (distanceToSegment(obstacle.center, start, end) < required - EPSILON) return false
  }
  return true
}

function routeDistance(points: readonly NavigationPoint[]): number {
  let total = 0
  for (let index = 1; index < points.length; index += 1) total += distance(points[index - 1], points[index])
  return total
}

function pointKey(point: NavigationPoint): string {
  return `${point.x.toFixed(5)}:${point.z.toFixed(5)}`
}

interface GraphNode {
  readonly point: NavigationPoint
  readonly obstacleIndex: number | null
}

/**
 * Plan a short, deterministic route to the target island's docking annulus.
 * The planner is deliberately small and bounded: a visibility graph joins
 * the start, a safe target point, and twenty points around each expanded land
 * circle. This keeps scanner navigation predictable with the current four
 * islands while remaining independent of Three.js and the render loop.
 */
export function planSafeDockingRoute(
  start: NavigationPoint,
  targetIslandId: string,
  islands: readonly IslandDefinition[],
  bounds: NavigationBounds,
  vesselClearance = bounds?.vesselClearance,
): SafeDockingRouteResult {
  const targetIsland = islands.find((island) => island.id === targetIslandId)
  if (!targetIsland) return failure(targetIslandId, 'unknown-island', `Unknown island "${targetIslandId}".`)
  if (!pointIsFinite(start)) return failure(targetIslandId, 'invalid-start', 'The vessel position is not finite.')

  const worldLimit = bounds?.worldLimit
  const clearance = vesselClearance
  if (!finite(worldLimit) || worldLimit <= 0 || !finite(clearance) || clearance < 0 || clearance >= worldLimit) {
    return failure(targetIslandId, 'invalid-bounds', 'Navigation bounds must be finite and leave room for the vessel.')
  }
  if (!withinBounds(start, worldLimit, clearance)) {
    return failure(targetIslandId, 'invalid-start', 'The vessel is outside the navigable water bounds.')
  }

  const obstacles = islands.map((island) => ({
    center: { x: island.position.x, z: island.position.z },
    radius: island.landCollisionRadius,
  }))
  const targetIndex = islands.findIndex((island) => island.id === targetIslandId)
  const expandedTargetRadius = targetIsland.landCollisionRadius + clearance
  const availableAnnulus = targetIsland.dockingTriggerRadius - expandedTargetRadius
  if (!finite(availableAnnulus) || availableAnnulus <= SAFETY_MARGIN * 2) {
    return failure(targetIslandId, 'target-annulus-too-small', 'There is not enough safe water inside the docking zone.')
  }

  const startDistance = distance(start, obstacles[targetIndex].center)
  if (startDistance < expandedTargetRadius - EPSILON) {
    return failure(targetIslandId, 'start-in-obstacle', 'The vessel starts inside an island clearance envelope.')
  }

  // Approach from the current vessel direction where possible. This makes the
  // final target stable across repeated scans while avoiding a land crossing.
  const targetCenter = obstacles[targetIndex].center
  const directionX = start.x - targetCenter.x
  const directionZ = start.z - targetCenter.z
  const directionLength = Math.hypot(directionX, directionZ)
  const targetRadius = expandedTargetRadius + Math.min(SAFETY_MARGIN, availableAnnulus * 0.34)
  const approachX = directionLength > EPSILON ? directionX / directionLength : 1
  const approachZ = directionLength > EPSILON ? directionZ / directionLength : 0
  const target: NavigationPoint = {
    x: targetCenter.x + approachX * targetRadius,
    z: targetCenter.z + approachZ * targetRadius,
  }
  if (!withinBounds(target, worldLimit, clearance)) {
    return failure(targetIslandId, 'target-out-of-bounds', 'The docking point is outside the navigable water bounds.')
  }

  const nodes: GraphNode[] = [
    { point: { x: start.x, z: start.z }, obstacleIndex: null },
    { point: target, obstacleIndex: null },
  ]
  const pointKeys = new Set(nodes.map((node) => pointKey(node.point)))

  islands.forEach((island, obstacleIndex) => {
    const radius = island.landCollisionRadius + clearance + SAFETY_MARGIN
    for (let step = 0; step < CANDIDATE_COUNT; step += 1) {
      const angle = (step / CANDIDATE_COUNT) * Math.PI * 2
      const candidate: NavigationPoint = {
        x: island.position.x + Math.cos(angle) * radius,
        z: island.position.z + Math.sin(angle) * radius,
      }
      if (!withinBounds(candidate, worldLimit, clearance)) continue
      if (islands.some((other, otherIndex) => {
        if (otherIndex === obstacleIndex) return false
        return distance(candidate, { x: other.position.x, z: other.position.z }) < other.landCollisionRadius + clearance - EPSILON
      })) continue
      const key = pointKey(candidate)
      if (!pointKeys.has(key)) {
        pointKeys.add(key)
        nodes.push({ point: candidate, obstacleIndex })
      }
    }
  })

  const adjacency: Array<Array<{ to: number; cost: number }>> = nodes.map(() => [])
  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      if (!segmentIsSafe(nodes[first].point, nodes[second].point, obstacles, worldLimit, clearance)) continue
      const cost = distance(nodes[first].point, nodes[second].point)
      adjacency[first].push({ to: second, cost })
      adjacency[second].push({ to: first, cost })
    }
  }

  const distances = nodes.map(() => Number.POSITIVE_INFINITY)
  const previous = nodes.map(() => -1)
  const visited = nodes.map(() => false)
  distances[0] = 0
  for (let iteration = 0; iteration < nodes.length; iteration += 1) {
    let current = -1
    let best = Number.POSITIVE_INFINITY
    for (let index = 0; index < nodes.length; index += 1) {
      if (!visited[index] && distances[index] < best) {
        best = distances[index]
        current = index
      }
    }
    if (current < 0 || !Number.isFinite(best)) break
    visited[current] = true
    if (current === 1) break
    for (const edge of adjacency[current]) {
      const candidateDistance = best + edge.cost
      if (candidateDistance < distances[edge.to] - EPSILON) {
        distances[edge.to] = candidateDistance
        previous[edge.to] = current
      }
    }
  }

  if (!Number.isFinite(distances[1])) {
    return failure(targetIslandId, 'no-safe-route', 'No bounded safe route to the docking zone could be found.')
  }
  const reversePath: NavigationPoint[] = []
  for (let current = 1; current >= 0; current = previous[current]) {
    reversePath.push(nodes[current].point)
    if (current === 0) break
    if (previous[current] < 0) return failure(targetIslandId, 'no-safe-route', 'The safe route graph is disconnected.')
  }
  reversePath.reverse()
  // Remove accidental duplicate waypoints while preserving the exact start
  // and target coordinates for predictable handoff to the vessel controller.
  const points = reversePath.filter((point, index) => index === 0 || distance(point, reversePath[index - 1]) > EPSILON)
  return { ok: true, islandId: targetIslandId, points, target, distance: routeDistance(points), clearance }
}

/** Exported for focused geometry tests and consumers that need to audit a route. */
export function isSafeNavigationSegment(
  start: NavigationPoint,
  end: NavigationPoint,
  islands: readonly IslandDefinition[],
  bounds: NavigationBounds,
  vesselClearance = bounds?.vesselClearance,
): boolean {
  if (!pointIsFinite(start) || !pointIsFinite(end)) return false
  if (!finite(bounds?.worldLimit) || !finite(vesselClearance)) return false
  return segmentIsSafe(
    start,
    end,
    islands.map((island) => ({ center: { x: island.position.x, z: island.position.z }, radius: island.landCollisionRadius })),
    bounds.worldLimit,
    vesselClearance,
  )
}
