import type { PortfolioCategory, PortfolioContent } from './portfolio'

/** Island authoring bounds; offshore sailing has a separate storm safety extent. */
export const ISLAND_WORLD_LIMIT = 180

/** The vessel spawn point is kept clear until the movement phase. */
export const VESSEL_SPAWN = { x: 0, z: 0 } as const

export type IslandLandform = 'ridge' | 'mesa' | 'mound' | 'twin-peaks'

export interface IslandDefinition {
  readonly id: string
  readonly name: string
  readonly category: PortfolioCategory
  readonly position: {
    readonly x: number
    readonly z: number
  }
  readonly landCollisionRadius: number
  readonly dockingTriggerRadius: number
  readonly landform: IslandLandform
  readonly palette: {
    readonly sand: string
    readonly land: string
    readonly rock: string
  }
  readonly contentIds: readonly string[]
  readonly description: string
}

const islandCategories: readonly PortfolioCategory[] = [
  'resume',
  'projects',
  'writing',
  'media',
]

const islandLandforms: readonly IslandLandform[] = [
  'ridge',
  'mesa',
  'mound',
  'twin-peaks',
]

const hexColorPattern = /^#[0-9a-f]{6}$/i

/**
 * Mock landmarks are intentionally serializable. Rendering code can consume
 * this list without owning any portfolio copy or knowing about Three.js.
 */
export const portfolioIslands: readonly IslandDefinition[] = [
  {
    id: 'island-resume',
    name: 'Chartroom',
    category: 'resume',
    position: { x: -26, z: -18 },
    landCollisionRadius: 7,
    dockingTriggerRadius: 11,
    landform: 'ridge',
    palette: { sand: '#d8c28d', land: '#7e9a73', rock: '#465d5d' },
    contentIds: ['resume-01'],
    description: 'A quiet chartroom for the route so far and the work behind it.',
  },
  {
    id: 'island-projects',
    name: 'Shipyard',
    category: 'projects',
    position: { x: 16, z: -24 },
    landCollisionRadius: 6,
    dockingTriggerRadius: 10,
    landform: 'mesa',
    palette: { sand: '#d8b878', land: '#b86f4c', rock: '#704b44' },
    contentIds: ['project-01'],
    description: 'A working shipyard for experiments, builds, and field notes.',
  },
  {
    id: 'island-writing',
    name: 'Logbook',
    category: 'writing',
    position: { x: -18, z: 26 },
    landCollisionRadius: 8,
    dockingTriggerRadius: 12,
    landform: 'twin-peaks',
    palette: { sand: '#dfcfaa', land: '#8e806f', rock: '#555968' },
    contentIds: ['writing-01'],
    description: 'A windward logbook for essays, observations, and unfinished thoughts.',
  },
  {
    id: 'island-media',
    name: 'Signal Cove',
    category: 'media',
    position: { x: 24, z: 20 },
    landCollisionRadius: 7,
    dockingTriggerRadius: 11,
    landform: 'mound',
    palette: { sand: '#cbbd98', land: '#5d8c87', rock: '#3f5964' },
    contentIds: ['media-01'],
    description: 'A sheltered cove for images, moving pictures, and sound.',
  },
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isIslandObject(value: unknown): value is IslandDefinition {
  return isRecord(value)
}

function hasContentId(value: unknown): value is { readonly id: string } {
  return isRecord(value) && typeof value.id === 'string' && value.id.length > 0
}

function isPortfolioCategory(value: unknown): value is PortfolioCategory {
  return typeof value === 'string' && islandCategories.includes(value as PortfolioCategory)
}

function isIslandLandform(value: unknown): value is IslandLandform {
  return typeof value === 'string' && islandLandforms.includes(value as IslandLandform)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function fail(islandIndex: number, message: string): never {
  throw new Error(`Invalid island at index ${islandIndex}: ${message}`)
}

/**
 * Validate the serializable island/content contract at application startup.
 * Keeping these checks here makes malformed data fail before any scene code
 * attempts to build geometry from it.
 */
export function validateIslandDefinitions(
  islands: readonly IslandDefinition[],
  content: PortfolioContent,
): void {
  if (!Array.isArray(islands)) {
    throw new Error('Invalid island definitions: expected an array')
  }

  if (!isRecord(content)) {
    throw new Error('Invalid portfolio content: expected an object')
  }

  const islandIds = new Set<string>()
  const dockingZones: Array<{ index: number; island: IslandDefinition }> = []

  islands.forEach((island, index) => {
    if (!isIslandObject(island)) {
      fail(index, 'expected an object')
    }

    if (typeof island.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(island.id)) {
      fail(index, 'id must be a stable non-empty kebab-case string')
    }
    if (islandIds.has(island.id)) {
      fail(index, `duplicate id "${island.id}"`)
    }
    islandIds.add(island.id)

    if (typeof island.name !== 'string' || island.name.trim().length === 0) {
      fail(index, 'name must be a non-empty string')
    }
    if (!isPortfolioCategory(island.category)) {
      fail(index, `category must be one of ${islandCategories.join(', ')}`)
    }
    if (!isIslandLandform(island.landform)) {
      fail(index, `landform must be one of ${islandLandforms.join(', ')}`)
    }
    if (!isRecord(island.position) || !isFiniteNumber(island.position.x) || !isFiniteNumber(island.position.z)) {
      fail(index, 'position.x and position.z must be finite numbers')
    }
    if (!isFiniteNumber(island.landCollisionRadius) || island.landCollisionRadius <= 0) {
      fail(index, 'landCollisionRadius must be a finite positive number')
    }
    if (!isFiniteNumber(island.dockingTriggerRadius) || island.dockingTriggerRadius <= 0) {
      fail(index, 'dockingTriggerRadius must be a finite positive number')
    }
    if (
      Math.abs(island.position.x) + island.dockingTriggerRadius > ISLAND_WORLD_LIMIT ||
      Math.abs(island.position.z) + island.dockingTriggerRadius > ISLAND_WORLD_LIMIT
    ) {
      fail(index, `docking zone must remain within ±${ISLAND_WORLD_LIMIT} world units`)
    }
    if (island.landCollisionRadius >= island.dockingTriggerRadius) {
      fail(index, 'dockingTriggerRadius must be greater than landCollisionRadius')
    }
    if (!isRecord(island.palette)) {
      fail(index, 'palette must contain sand, land, and rock colors')
    }
    for (const colorName of ['sand', 'land', 'rock'] as const) {
      if (typeof island.palette[colorName] !== 'string' || !hexColorPattern.test(island.palette[colorName])) {
        fail(index, `palette.${colorName} must be a six-digit hex color`)
      }
    }
    if (!Array.isArray(island.contentIds) || island.contentIds.length === 0) {
      fail(index, 'contentIds must contain at least one content ID')
    }
    if (typeof island.description !== 'string' || island.description.trim().length === 0) {
      fail(index, 'description must be a non-empty string')
    }

    const categoryContent = content[island.category]
    if (!Array.isArray(categoryContent)) {
      fail(index, `portfolio content category "${island.category}" must be an array`)
    }
    const categoryContentIds = new Set<string>()
    categoryContent.forEach((entry, entryIndex) => {
      if (!hasContentId(entry)) {
        throw new Error(`Invalid portfolio content at ${island.category}[${entryIndex}]: id must be a non-empty string`)
      }
      if (categoryContentIds.has(entry.id)) {
        throw new Error(`Invalid portfolio content at ${island.category}[${entryIndex}]: duplicate id "${entry.id}"`)
      }
      categoryContentIds.add(entry.id)
    })
    const islandContentIds = new Set<string>()
    island.contentIds.forEach((contentId) => {
      if (typeof contentId !== 'string' || contentId.length === 0) {
        fail(index, 'contentIds must contain non-empty strings')
      }
      if (islandContentIds.has(contentId)) {
        fail(index, `duplicate content ID "${contentId}"`)
      }
      if (!categoryContentIds.has(contentId)) {
        fail(index, `content ID "${contentId}" is missing from category "${island.category}"`)
      }
      islandContentIds.add(contentId)
    })

    dockingZones.push({ index, island })
    const distanceFromSpawn = Math.hypot(island.position.x - VESSEL_SPAWN.x, island.position.z - VESSEL_SPAWN.z)
    if (distanceFromSpawn <= island.dockingTriggerRadius) {
      fail(index, 'docking zone must leave the vessel spawn point clear')
    }
  })

  for (let first = 0; first < dockingZones.length; first += 1) {
    for (let second = first + 1; second < dockingZones.length; second += 1) {
      const firstZone = dockingZones[first]
      const secondZone = dockingZones[second]
      const distance = Math.hypot(
        firstZone.island.position.x - secondZone.island.position.x,
        firstZone.island.position.z - secondZone.island.position.z,
      )
      if (distance <= firstZone.island.dockingTriggerRadius + secondZone.island.dockingTriggerRadius) {
        throw new Error(
          `Invalid island definitions: docking zones overlap for "${firstZone.island.id}" and "${secondZone.island.id}"`,
        )
      }
    }
  }
}
