import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'
import { createCameraRig } from '../src/world/createCameraRig.ts'
import { STORM_TUNING, sampleStormField } from '../src/world/stormField.ts'
import { portfolioIslands, VESSEL_SPAWN } from '../src/content/islands.ts'
import { isSafeNavigationSegment, planSafeDockingRoute } from '../src/navigation/routePlanner.ts'
import { VESSEL_TUNING } from '../src/world/vessel/kinematics.ts'

const VIEWPORTS = [[1440, 900], [390, 844], [320, 568], [360, 915], [844, 390], [2560, 1080]]
const CORNERS = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
const BOUNDS = { worldLimit: STORM_TUNING.worldLimit, vesselClearance: VESSEL_TUNING.collisionRadius }

function cornerOnPlane(camera: THREE.OrthographicCamera, x: number, y: number, height: number) {
  const origin = new THREE.Vector3(x, y, -1).unproject(camera)
  const direction = new THREE.Vector3(0, 0, -1).transformDirection(camera.matrixWorld)
  return origin.addScaledVector(direction, (height - origin.y) / direction.y)
}

test('storm starts outside every supported opening view, including crest/trough heights', () => {
  const rig = createCameraRig()
  for (const [width, height] of VIEWPORTS) {
    rig.resize(width, height)
    rig.snapTo(VESSEL_SPAWN.x, VESSEL_SPAWN.z)
    for (const [x, y] of CORNERS) {
      for (const waterHeight of [-1.8, 0, 1.8]) {
        const point = cornerOnPlane(rig.camera, x, y, waterHeight)
        assert.equal(sampleStormField(point.x, point.z).intensity, 0, `${width}×${height} opening corner`)
      }
    }
  }
  rig.dispose()
})

test('expanded safety boundary leaves all camera corner rays over the finite water', () => {
  const rig = createCameraRig()
  const bound = BOUNDS.worldLimit - BOUNDS.vesselClearance
  const maxHeight = 1.8 * STORM_TUNING.maxWaveScale
  for (const [width, height] of VIEWPORTS) {
    rig.resize(width, height)
    for (const vesselX of [-bound, 0, bound]) {
      for (const vesselZ of [-bound, 0, bound]) {
        rig.snapTo(vesselX, vesselZ)
        for (const [x, y] of CORNERS) {
          for (const waterHeight of [-maxHeight, 0, maxHeight]) {
            const point = cornerOnPlane(rig.camera, x, y, waterHeight)
            assert.ok(Math.max(Math.abs(point.x), Math.abs(point.z)) < 360,
              `${width}×${height} at (${vesselX},${vesselZ}) sees beyond the finite water`)
          }
        }
      }
    }
  }
  rig.dispose()
})

test('every island and inter-island scanner route remains wholly in calm water', () => {
  const starts = [{ x: VESSEL_SPAWN.x, z: VESSEL_SPAWN.z }]
  for (const island of portfolioIslands) {
    assert.ok(Math.hypot(island.position.x, island.position.z) + island.dockingTriggerRadius < STORM_TUNING.calmRadius)
    const route = planSafeDockingRoute(VESSEL_SPAWN, island.id, portfolioIslands, BOUNDS)
    assert.ok(route.ok)
    if (route.ok) starts.push(route.target)
  }
  for (const start of starts) {
    for (const island of portfolioIslands) {
      const route = planSafeDockingRoute(start, island.id, portfolioIslands, BOUNDS)
      assert.ok(route.ok)
      if (!route.ok) continue
      for (const point of route.points) assert.equal(sampleStormField(point.x, point.z).intensity, 0)
      // A disk is convex: zero-intensity endpoints keep each straight segment calm.
      for (let i = 1; i < route.points.length; i++) {
        assert.ok(isSafeNavigationSegment(route.points[i - 1], route.points[i], portfolioIslands, BOUNDS))
      }
    }
  }
})

test('scanner has a safe route from every offshore side and corner to each island', () => {
  for (const x of [-210, 0, 210]) {
    for (const z of [-210, 0, 210]) {
      if (!x && !z) continue
      assert.ok(sampleStormField(x, z).intensity > 0)
      for (const island of portfolioIslands) {
        const route = planSafeDockingRoute({ x, z }, island.id, portfolioIslands, BOUNDS)
        assert.ok(route.ok, `${x},${z} -> ${island.id}`)
        if (!route.ok) continue
        assert.equal(sampleStormField(route.target.x, route.target.z).intensity, 0)
        for (let i = 1; i < route.points.length; i++) {
          assert.ok(isSafeNavigationSegment(route.points[i - 1], route.points[i], portfolioIslands, BOUNDS))
        }
      }
    }
  }
})
