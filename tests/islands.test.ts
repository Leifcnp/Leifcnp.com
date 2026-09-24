import assert from 'node:assert/strict'
import test from 'node:test'

import { portfolioContent } from '../src/content/portfolio.ts'
import {
  portfolioIslands,
  validateIslandDefinitions,
  type IslandDefinition,
} from '../src/content/islands.ts'

test('ships four spaced landmarks with category-aligned content', () => {
  assert.equal(portfolioIslands.length, 4)
  assert.deepEqual(
    portfolioIslands.map((island) => island.category),
    ['resume', 'projects', 'writing', 'media'],
  )
  assert.doesNotThrow(() => validateIslandDefinitions(portfolioIslands, portfolioContent))

  const ids = new Set(portfolioIslands.map((island) => island.id))
  assert.equal(ids.size, portfolioIslands.length)
  for (const island of portfolioIslands) {
    assert.ok(island.landCollisionRadius < island.dockingTriggerRadius)
    assert.ok(Math.hypot(island.position.x, island.position.z) > island.dockingTriggerRadius)
  }
})

function withIslandChange(
  index: number,
  change: (island: IslandDefinition) => IslandDefinition,
): readonly IslandDefinition[] {
  return portfolioIslands.map((island, islandIndex) => (islandIndex === index ? change(island) : island))
}

test('rejects duplicate IDs and overlapping docking zones', () => {
  assert.throws(
    () =>
      validateIslandDefinitions(
        withIslandChange(1, (island) => ({ ...island, id: portfolioIslands[0].id })),
        portfolioContent,
      ),
    /duplicate id/,
  )

  assert.throws(
    () =>
      validateIslandDefinitions(
        withIslandChange(1, (island) => ({ ...island, position: portfolioIslands[0].position })),
        portfolioContent,
      ),
    /docking zones overlap/,
  )
})

test('rejects invalid bounds, radius ordering, and category content references', () => {
  assert.throws(
    () =>
      validateIslandDefinitions(
        withIslandChange(0, (island) => ({ ...island, position: { x: 181, z: 0 } })),
        portfolioContent,
      ),
    /docking zone must remain within ±180/,
  )
  assert.throws(
    () =>
      validateIslandDefinitions(
        withIslandChange(0, (island) => ({ ...island, dockingTriggerRadius: island.landCollisionRadius })),
        portfolioContent,
      ),
    /greater than landCollisionRadius/,
  )
  assert.throws(
    () =>
      validateIslandDefinitions(
        withIslandChange(0, (island) => ({ ...island, contentIds: ['project-01'] })),
        portfolioContent,
      ),
    /missing from category "resume"/,
  )
})

test('rejects a docking circle that crosses the world bound', () => {
  assert.throws(
    () =>
      validateIslandDefinitions(
        withIslandChange(0, (island) => ({
          ...island,
          position: { x: 175, z: 0 },
          dockingTriggerRadius: 6,
          landCollisionRadius: 4,
        })),
        portfolioContent,
      ),
    /docking zone must remain within ±180/,
  )
})

test('rejects duplicate IDs inside a category content list', () => {
  const duplicateContent = {
    ...portfolioContent,
    resume: [portfolioContent.resume[0], { ...portfolioContent.resume[0] }],
  }

  assert.throws(
    () => validateIslandDefinitions(portfolioIslands, duplicateContent),
    /Invalid portfolio content at resume\[1\]: duplicate id "resume-01"/,
  )
})
