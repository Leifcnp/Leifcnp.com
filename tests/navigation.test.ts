import assert from 'node:assert/strict'
import test from 'node:test'

import { portfolioIslands } from '../src/content/islands.ts'
import {
  isSafeNavigationSegment,
  planSafeDockingRoute,
  type NavigationPoint,
} from '../src/navigation/routePlanner.ts'
import {
  advanceScan,
  cancelScan,
  createScannerState,
  startScan,
} from '../src/navigation/scanner.ts'

const BOUNDS = { worldLimit: 180, vesselClearance: 3.2 } as const

function assertRouteSafe(points: readonly NavigationPoint[]): void {
  for (let index = 1; index < points.length; index += 1) {
    assert.equal(isSafeNavigationSegment(points[index - 1], points[index], portfolioIslands, BOUNDS), true)
  }
}

test('plans a direct safe route to every portfolio island docking annulus', () => {
  for (const island of portfolioIslands) {
    const result = planSafeDockingRoute({ x: 0, z: 0 }, island.id, portfolioIslands, BOUNDS)
    assert.equal(result.ok, true)
    if (!result.ok) continue
    assertRouteSafe(result.points)
    assert.ok(result.points.length >= 2)
    const finalDistance = Math.hypot(result.target.x - island.position.x, result.target.z - island.position.z)
    assert.ok(finalDistance <= island.dockingTriggerRadius + 1e-8)
    assert.ok(finalDistance >= island.landCollisionRadius + BOUNDS.vesselClearance - 1e-8)
  }
})

test('every safe docking endpoint can become the start of another island route', () => {
  for (const source of portfolioIslands) {
    const sourceRoute = planSafeDockingRoute({ x: 0, z: 0 }, source.id, portfolioIslands, BOUNDS)
    assert.equal(sourceRoute.ok, true)
    if (!sourceRoute.ok) continue
    for (const target of portfolioIslands) {
      if (target.id === source.id) continue
      const result = planSafeDockingRoute(sourceRoute.target, target.id, portfolioIslands, BOUNDS)
      assert.equal(result.ok, true, `${source.id} -> ${target.id}`)
      if (result.ok) assertRouteSafe(result.points)
    }
  }
})

test('a collision-resolved start exactly on land plus vessel clearance is valid', () => {
  const source = portfolioIslands[0]
  const start = {
    x: source.position.x + source.landCollisionRadius + BOUNDS.vesselClearance,
    z: source.position.z,
  }
  const result = planSafeDockingRoute(start, portfolioIslands[1].id, portfolioIslands, BOUNDS)
  assert.equal(result.ok, true)
})

test('routes around a blocking island with bounded visibility-graph detours', () => {
  const result = planSafeDockingRoute(
    { x: -40, z: -18 },
    'island-projects',
    portfolioIslands,
    BOUNDS,
  )
  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.ok(result.points.length >= 3, 'direct line is blocked by Chartroom and needs a detour')
  assertRouteSafe(result.points)
  assert.ok(result.points.every((point) => Math.abs(point.x) <= BOUNDS.worldLimit - BOUNDS.vesselClearance + 1e-8))
  assert.ok(result.points.every((point) => Math.abs(point.z) <= BOUNDS.worldLimit - BOUNDS.vesselClearance + 1e-8))
})

test('route failures are explicit and recoverable', () => {
  const unknown = planSafeDockingRoute({ x: 0, z: 0 }, 'missing', portfolioIslands, BOUNDS)
  assert.deepEqual(unknown.ok, false)
  if (!unknown.ok) assert.equal(unknown.reason, 'unknown-island')

  const outside = planSafeDockingRoute({ x: 1000, z: 0 }, 'island-projects', portfolioIslands, BOUNDS)
  assert.deepEqual(outside.ok, false)
  if (!outside.ok) assert.equal(outside.reason, 'invalid-start')

  const invalidBounds = planSafeDockingRoute({ x: 0, z: 0 }, 'island-projects', portfolioIslands, { worldLimit: 1, vesselClearance: 2 })
  assert.deepEqual(invalidBounds.ok, false)
  if (!invalidBounds.ok) assert.equal(invalidBounds.reason, 'invalid-bounds')

  const narrowIsland = { ...portfolioIslands[0], id: 'narrow', dockingTriggerRadius: portfolioIslands[0].landCollisionRadius + BOUNDS.vesselClearance + 0.1 }
  const narrowResult = planSafeDockingRoute({ x: 0, z: 0 }, narrowIsland.id, [narrowIsland], BOUNDS)
  assert.deepEqual(narrowResult.ok, false)
  if (!narrowResult.ok) assert.equal(narrowResult.reason, 'target-annulus-too-small')
})

test('segment safety rejects land crossings and accepts tangent-safe water', () => {
  const island = portfolioIslands[0]
  const radius = island.landCollisionRadius + BOUNDS.vesselClearance
  assert.equal(
    isSafeNavigationSegment(
      { x: island.position.x - radius - 1, z: island.position.z },
      { x: island.position.x + radius + 1, z: island.position.z },
      portfolioIslands,
      BOUNDS,
    ),
    false,
  )
  assert.equal(
    isSafeNavigationSegment(
      { x: island.position.x - radius, z: island.position.z },
      { x: island.position.x - radius, z: island.position.z + 10 },
      portfolioIslands,
      BOUNDS,
    ),
    true,
  )
})

test('scanner advances with eased motion and settles at zero velocity', () => {
  const route = planSafeDockingRoute({ x: 0, z: 0 }, 'island-media', portfolioIslands, BOUNDS)
  assert.equal(route.ok, true)
  if (!route.ok) return
  let state = startScan(createScannerState({ x: 0, z: 0, heading: 0 }), { islandId: route.islandId, route: route.points }, { duration: 2 })
  assert.equal(state.status, 'active')
  const initial = { x: state.x, z: state.z }
  state = advanceScan(state, Number.POSITIVE_INFINITY)
  assert.deepEqual({ x: state.x, z: state.z }, initial)
  state = advanceScan(state, 0.4)
  assert.equal(state.status, 'active')
  assert.ok(Math.hypot(state.x - initial.x, state.z - initial.z) > 0)
  state = advanceScan(state, 99)
  assert.equal(state.status, 'arrived')
  assert.equal(state.x, route.target.x)
  assert.equal(state.z, route.target.z)
  assert.equal(state.velocityX, 0)
  assert.equal(state.velocityZ, 0)
})

test('scanner cancellation freezes the current pose and a new scan replaces it', () => {
  const route = planSafeDockingRoute({ x: 0, z: 0 }, 'island-resume', portfolioIslands, BOUNDS)
  assert.equal(route.ok, true)
  if (!route.ok) return
  let state = startScan(createScannerState(), { islandId: route.islandId, route: route.points })
  state = advanceScan(state, 0.4)
  const frozen = { x: state.x, z: state.z }
  state = cancelScan(state, 'manual steering')
  assert.equal(state.status, 'cancelled')
  assert.deepEqual({ x: state.x, z: state.z }, frozen)
  assert.equal(advanceScan(state, 1).x, frozen.x)
  const replacement = planSafeDockingRoute(frozen, 'island-writing', portfolioIslands, BOUNDS)
  assert.equal(replacement.ok, true)
  if (!replacement.ok) return
  state = startScan(state, { islandId: replacement.islandId, route: replacement.points })
  assert.equal(state.status, 'active')
  assert.equal(state.islandId, replacement.islandId)
})

test('scanner accepts a stationary one-point route and never teleports a stale route', () => {
  const arrived = startScan(createScannerState({ x: 2, z: 3, heading: 0.5 }), { islandId: 'same', route: [{ x: 2, z: 3 }] })
  assert.equal(arrived.status, 'arrived')
  assert.equal(arrived.x, 2)
  assert.equal(arrived.z, 3)

  const stale = startScan(createScannerState(), { islandId: 'stale', route: [{ x: 20, z: 0 }, { x: 21, z: 0 }] })
  assert.equal(stale.status, 'failed')
  assert.equal(stale.x, 0)
  assert.equal(stale.z, 0)
})

test('routes from playable world edges keep every segment and endpoint clear', () => {
  const edge = BOUNDS.worldLimit - BOUNDS.vesselClearance
  for (const x of [-edge, 0, edge]) {
    for (const z of [-edge, 0, edge]) {
      for (const island of portfolioIslands) {
        const route = planSafeDockingRoute({ x, z }, island.id, portfolioIslands, BOUNDS)
        assert.ok(route.ok, `route from (${x},${z}) to ${island.id}`)
        if (!route.ok) continue
        for (const p of route.points) {
          assert.ok(Math.abs(p.x) <= edge + 1e-7 && Math.abs(p.z) <= edge + 1e-7)
        }
        for (let i = 1; i < route.points.length; i++) {
          const a = route.points[i - 1]
          const b = route.points[i]
          const dx = b.x - a.x
          const dz = b.z - a.z
          const squaredLength = dx * dx + dz * dz
          for (const obstacle of portfolioIslands) {
            const t = squaredLength === 0 ? 0 : Math.max(0, Math.min(1,
              ((obstacle.position.x - a.x) * dx + (obstacle.position.z - a.z) * dz) / squaredLength))
            const separation = Math.hypot(a.x + t * dx - obstacle.position.x, a.z + t * dz - obstacle.position.z)
            assert.ok(separation >= obstacle.landCollisionRadius + BOUNDS.vesselClearance - 1e-7)
          }
        }
        const distance = Math.hypot(route.target.x - island.position.x, route.target.z - island.position.z)
        assert.ok(distance <= island.dockingTriggerRadius)
      }
    }
  }
})

test('an unreachable start inside a different island fails without a partial route', () => {
  const route = planSafeDockingRoute(portfolioIslands[0].position, portfolioIslands[1].id, portfolioIslands, BOUNDS)
  assert.equal(route.ok, false)
  if (!route.ok) assert.equal(route.reason, 'no-safe-route')
})

test('malformed scanner waypoints are rejected without skipping across them', () => {
  const state = createScannerState({ x: 1, z: 2, heading: 0.3 })
  const invalid = startScan(state, { islandId: 'invalid', route: [{ x: 1, z: 2 }, { x: NaN, z: 8 }, { x: 9, z: 9 }] })
  assert.equal(invalid.status, 'failed')
  assert.equal(invalid.x, state.x)
  assert.equal(invalid.z, state.z)
  assert.equal(invalid.velocityX, 0)
  assert.equal(invalid.velocityZ, 0)
})
