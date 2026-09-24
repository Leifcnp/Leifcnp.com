import type { IslandDefinition } from '../content/islands'

export const PROXIMITY_EXIT_MARGIN = 1.25

export interface ProximityPosition {
  readonly x: number
  readonly z: number
}

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function distanceToIsland(position: ProximityPosition, island: IslandDefinition): number {
  return Math.hypot(position.x - island.position.x, position.z - island.position.z)
}

/**
 * Select the active docking island. A previously active island gets a small
 * hysteresis band so a prompt does not flicker at the edge of its trigger
 * circle. When leaving that band, the nearest newly entered island wins.
 */
export function getProximityState(
  position: ProximityPosition,
  islands: readonly IslandDefinition[],
  previousIslandId?: string | null,
): IslandDefinition | null {
  if (!finite(position?.x) || !finite(position?.z)) return null

  if (previousIslandId) {
    const previous = islands.find((island) => island.id === previousIslandId)
    if (previous && distanceToIsland(position, previous) <= previous.dockingTriggerRadius + PROXIMITY_EXIT_MARGIN) {
      return previous
    }
  }

  let nearest: IslandDefinition | null = null
  let nearestDistance = Number.POSITIVE_INFINITY
  for (const island of islands) {
    if (!finite(island.position.x) || !finite(island.position.z) || !finite(island.dockingTriggerRadius)) continue
    const islandDistance = distanceToIsland(position, island)
    if (islandDistance <= island.dockingTriggerRadius && islandDistance < nearestDistance) {
      nearest = island
      nearestDistance = islandDistance
    }
  }
  return nearest
}

export function isInsideProximityZone(
  position: ProximityPosition,
  island: IslandDefinition,
): boolean {
  return finite(position?.x) && finite(position?.z) && distanceToIsland(position, island) <= island.dockingTriggerRadius
}
