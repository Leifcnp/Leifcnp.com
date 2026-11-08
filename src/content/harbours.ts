import type { IslandDefinition } from './islands.ts'
import type { PortfolioContent } from './portfolio.ts'

export interface HarbourPoint { readonly x: number; readonly z: number }
export type HarbourContentTarget =
  | { readonly kind: 'overview' }
  | { readonly kind: 'project'; readonly contentId: string }

export interface HarbourDefinition {
  readonly id: string
  readonly islandId: string
  readonly label: string
  readonly localPosition: HarbourPoint
  readonly captureRadius: number
  readonly contentTarget: HarbourContentTarget
  /** Authored safe local approach, ending at the capture centre; no autopilot. */
  readonly approachPoints: readonly HarbourPoint[]
}

export const portfolioHarbours: readonly HarbourDefinition[] = [
  {
    id: 'shipyard-overview', islandId: 'island-projects', label: 'Overview',
    localPosition: { x: 12, z: 2 }, captureRadius: 1.75,
    contentTarget: { kind: 'overview' },
    approachPoints: [{ x: 14, z: 2 }, { x: 12, z: 2 }],
  },
  {
    id: 'shipyard-project', islandId: 'island-projects', label: 'Project',
    localPosition: { x: 2, z: 12 }, captureRadius: 1.75,
    contentTarget: { kind: 'project', contentId: 'project-01' },
    approachPoints: [{ x: 2, z: 14 }, { x: 2, z: 12 }],
  },
]

export function getHarbourWorldPosition(
  harbour: HarbourDefinition,
  islands: readonly IslandDefinition[],
): HarbourPoint | null {
  const parent = islands.find(island => island.id === harbour.islandId)
  return parent ? { x: parent.position.x + harbour.localPosition.x, z: parent.position.z + harbour.localPosition.z } : null
}

function distanceToSegment(point: HarbourPoint, start: HarbourPoint, end: HarbourPoint): number {
  const dx = end.x - start.x, dz = end.z - start.z
  const length = dx * dx + dz * dz
  const t = length > 0 ? Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.z - start.z) * dz) / length)) : 0
  return Math.hypot(point.x - start.x - t * dx, point.z - start.z - t * dz)
}

/** Validate complete capture circles and approach/connecting segments, not just centres. */
export function validateHarbourDefinitions(
  harbours: readonly HarbourDefinition[],
  islands: readonly IslandDefinition[],
  content: PortfolioContent,
  vesselClearance: number,
  worldLimit: number,
): void {
  const ids = new Set<string>()
  const safetyMargin = 0.28
  const finitePoint = (point: HarbourPoint): boolean => Number.isFinite(point?.x) && Number.isFinite(point?.z)
  const requireSafePoint = (point: HarbourPoint, radius: number): void => {
    if (!finitePoint(point) || Math.abs(point.x) + radius + vesselClearance > worldLimit || Math.abs(point.z) + radius + vesselClearance > worldLimit) throw new Error('Harbour point is outside safe world bounds')
    for (const island of islands) {
      if (Math.hypot(point.x - island.position.x, point.z - island.position.z) - radius < island.landCollisionRadius + vesselClearance + safetyMargin) throw new Error('Harbour capture/approach overlaps land clearance')
    }
  }
  const requireSafeSegment = (start: HarbourPoint, end: HarbourPoint): void => {
    for (const island of islands) {
      if (distanceToSegment(island.position, start, end) < island.landCollisionRadius + vesselClearance + safetyMargin) throw new Error('Harbour approach/connection crosses land clearance')
    }
  }
  if (!Number.isFinite(vesselClearance) || vesselClearance < 0 || !Number.isFinite(worldLimit) || worldLimit <= vesselClearance) throw new Error('Invalid harbour navigation bounds')
  for (const harbour of harbours) {
    const parent = islands.find(island => island.id === harbour.islandId)
    if (!parent || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(harbour.id) || ids.has(harbour.id) || !harbour.label.trim()) throw new Error('Invalid harbour identity/parent')
    ids.add(harbour.id)
    if (!finitePoint(harbour.localPosition) || !Number.isFinite(harbour.captureRadius) || harbour.captureRadius <= 0) throw new Error('Invalid harbour capture geometry')
    const target = harbour.contentTarget
    if (target.kind !== 'overview' && !(target.kind === 'project' && parent.category === 'projects' && parent.contentIds.includes(target.contentId) && content.projects.some(project => project.id === target.contentId))) throw new Error('Unknown harbour content target')
    const centre = getHarbourWorldPosition(harbour, islands)!
    requireSafePoint(centre, harbour.captureRadius)
    if (harbour.approachPoints.length === 0) throw new Error('Harbour needs a safe approach')
    let previous: HarbourPoint | null = null
    for (const point of harbour.approachPoints) {
      const world = { x: parent.position.x + point.x, z: parent.position.z + point.z }
      requireSafePoint(world, 0)
      if (previous) requireSafeSegment(previous, world)
      previous = world
    }
    if (Math.hypot(previous!.x - centre.x, previous!.z - centre.z) > 1e-6) throw new Error('Harbour approach must reach its centre')
    for (const other of harbours) {
      if (other === harbour || other.islandId !== harbour.islandId) continue
      const target = getHarbourWorldPosition(other, islands)!
      if (Math.hypot(centre.x - target.x, centre.z - target.z) < harbour.captureRadius + other.captureRadius) throw new Error('Harbour capture circles overlap')
      requireSafeSegment(centre, target)
    }
  }
}
