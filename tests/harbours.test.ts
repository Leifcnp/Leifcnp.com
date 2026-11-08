import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'
import { portfolioIslands } from '../src/content/islands.ts'
import { portfolioContent } from '../src/content/portfolio.ts'
import { portfolioHarbours, getHarbourWorldPosition, validateHarbourDefinitions, type HarbourDefinition } from '../src/content/harbours.ts'
import { createLocalHarbourState, noteManualHarbourIntent, stepLocalHarbour, zoomOutLocalHarbour, clearLocalHarbourForScan, selectLocalHarbour, type LocalHarbourState } from '../src/interaction/localHarbour.ts'
import { createHarbourMarkers } from '../src/world/createHarbourMarkers.ts'
import { VESSEL_TUNING, createVesselState, stepVessel } from '../src/world/vessel/kinematics.ts'
import { createTrimAssistState, stepTrimAssist } from '../src/world/vessel/trimAssist.ts'
import { vesselInputFromControls } from '../src/controls/vesselInput.ts'
import { createWaterSurfaceAxis, sampleRenderedWaterHeight } from '../src/world/waterSurfaceGrid.ts'

const shipyard = portfolioIslands.find(island => island.id === 'island-projects')!
const enterPosition = { x: shipyard.position.x, z: shipyard.position.z + 9.5 }
function step(state: LocalHarbourState, deltaSeconds = 1 / 120, options: Partial<Parameters<typeof stepLocalHarbour>[1]> = {}): LocalHarbourState {
  return stepLocalHarbour(state, { position: enterPosition, speed: 2, deltaSeconds, manualIntent: false, scannerActive: false, ...options }, portfolioIslands, portfolioHarbours)
}
function enter(): LocalHarbourState {
  return step(noteManualHarbourIntent(createLocalHarbourState()), 0.35)
}

test('harbour data reuses existing Shipyard content and complete safe geometry', () => {
  validateHarbourDefinitions(portfolioHarbours, portfolioIslands, portfolioContent, VESSEL_TUNING.collisionRadius, 180)
  assert.equal(portfolioHarbours.length, 2)
  assert.deepEqual(portfolioHarbours.map(harbour => getHarbourWorldPosition(harbour, portfolioIslands)), [{ x: 28, z: -22 }, { x: 18, z: -12 }])
  for (const harbour of portfolioHarbours) {
    assert.equal(harbour.islandId, shipyard.id)
    assert.ok(Math.hypot(harbour.localPosition.x, harbour.localPosition.z) - harbour.captureRadius - shipyard.landCollisionRadius - VESSEL_TUNING.collisionRadius > 1.21)
  }
  const connectingClearance = 14 / Math.sqrt(2) - shipyard.landCollisionRadius - VESSEL_TUNING.collisionRadius
  assert.ok(connectingClearance > 0.28)
})

test('data rejects unsafe circles, crossed paths, overlapping triggers and unknown content', () => {
  const valid = portfolioHarbours[0]
  const invalid: HarbourDefinition[][] = [
    [valid, valid],
    [{ ...valid, localPosition: { x: 10, z: 0 }, approachPoints: [{ x: 10, z: 0 }] }],
    [{ ...valid, approachPoints: [{ x: -14, z: -2 }, valid.localPosition] }],
    [{ ...valid, contentTarget: { kind: 'project', contentId: 'missing' } }],
    [{ ...valid, islandId: 'missing' }],
    [{ ...valid, captureRadius: Infinity }],
    [{ ...valid, approachPoints: [] }],
    [{ ...valid, approachPoints: [{ x: 15, z: 2 }] }],
    [valid, { ...valid, id: 'overlapping', localPosition: { x: 12.1, z: 2 }, approachPoints: [{ x: 12.1, z: 2 }] }],
    [{ ...valid, localPosition: { x: NaN, z: 2 } }],
  ]
  for (const data of invalid) assert.throws(() => validateHarbourDefinitions(data, portfolioIslands, portfolioContent, VESSEL_TUNING.collisionRadius, 180))
  assert.throws(() => validateHarbourDefinitions([valid], portfolioIslands, portfolioContent, 3.2, 20))
  assert.equal(getHarbourWorldPosition({ ...valid, islandId: 'missing' }, portfolioIslands), null)
})

test('manual dwell requires genuine recent helm, slow speed and the existing docking zone', () => {
  let state = createLocalHarbourState()
  state = selectLocalHarbour(state, portfolioHarbours[1].id, portfolioHarbours)
  assert.equal(step(state, 10).islandId, null, 'UI selection is not manual arrival')
  state = noteManualHarbourIntent(state)
  assert.equal(step(state, 0.35, { speed: 4.01 }).islandId, null)
  assert.equal(step(state, 0.35, { position: { x: shipyard.position.x, z: shipyard.position.z + 10.01 } }).islandId, null)
  state = step(state, 0.34)
  assert.equal(state.islandId, null)
  state = step(state, 0.01)
  assert.equal(state.islandId, shipyard.id)
  assert.equal(state.selectedHarbourId, portfolioHarbours[1].id)
  assert.equal(step(noteManualHarbourIntent(createLocalHarbourState()), 4.01).islandId, null, 'old intent expires')
})

test('exit hysteresis and explicit Zoom out suppression retain selection', () => {
  let state = enter()
  state = step(state, 0.1, { position: { x: shipyard.position.x + 17.99, z: shipyard.position.z }, speed: 7 })
  assert.equal(state.islandId, shipyard.id)
  state = zoomOutLocalHarbour(state)
  assert.equal(state.islandId, null)
  assert.equal(state.selectedHarbourId, portfolioHarbours[0].id)
  assert.equal(state.nearbyHarbourId, null)
  state = step(state, 1, { manualIntent: true })
  assert.equal(state.islandId, null)
  state = step(state, 0.1, { position: { x: shipyard.position.x + 18.01, z: shipyard.position.z } })
  assert.equal(state.suppressed, false)
  state = step(state, 0.35, { manualIntent: true })
  assert.equal(state.islandId, shipyard.id)
  state = step(state, 0.1, { position: { x: shipyard.position.x + 18.01, z: shipyard.position.z } })
  assert.equal(state.islandId, null)
})

test('scanner arrival remains broad; later manual handoff can qualify normally', () => {
  let state = clearLocalHarbourForScan(enter())
  state = step(state, 1, { scannerActive: true, manualIntent: true })
  assert.equal(state.islandId, null)
  state = step(state, 1)
  assert.equal(state.islandId, null)
  state = step(noteManualHarbourIntent(state), 0.35)
  assert.equal(state.islandId, shipyard.id)
  assert.deepEqual(createLocalHarbourState(), { islandId: null, selectedHarbourId: null, nearbyHarbourId: null, dwellSeconds: 0, manualIntentAge: Infinity, suppressed: false })
})

test('child capture only advertises Open and never selects or opens content', () => {
  let state = enter()
  const position = getHarbourWorldPosition(portfolioHarbours[1], portfolioIslands)!
  state = step(state, 0.1, { position })
  assert.equal(state.nearbyHarbourId, portfolioHarbours[1].id)
  assert.equal(state.selectedHarbourId, portfolioHarbours[0].id)
  state = selectLocalHarbour(state, portfolioHarbours[1].id, portfolioHarbours)
  assert.equal(state.selectedHarbourId, portfolioHarbours[1].id)
  assert.strictEqual(selectLocalHarbour(state, 'missing', portfolioHarbours), state)
  state = step(state, 0.1, { position: { x: position.x + 1.751, z: position.z } })
  assert.equal(state.nearbyHarbourId, null)
})

test('30/60/120 Hz dwell matches; pause/hidden zero time and invalid frames cannot enter', () => {
  const results = []
  for (const hz of [30, 60, 120]) {
    let state = createLocalHarbourState()
    for (let frame = 0; frame < hz; frame += 1) state = step(state, 1 / hz, { manualIntent: true })
    results.push({ islandId: state.islandId, selectedHarbourId: state.selectedHarbourId, nearbyHarbourId: state.nearbyHarbourId })
    assert.strictEqual(step(state, 0), state)
    assert.strictEqual(step(state, NaN), state)
  }
  assert.deepEqual(results[0], results[1])
  assert.deepEqual(results[1], results[2])
  assert.equal(step(noteManualHarbourIntent(createLocalHarbourState()), 1, { position: { x: NaN, z: 0 } }).islandId, null)
})

test('real manual sailing can enter Shipyard slowly without changing obstacle clearance', () => {
  let vessel = createVesselState(0, 0)
  let trim = createTrimAssistState()
  let local = createLocalHarbourState()
  const environment = { sailingEnabled: true, worldLimit: 180, stormEnabled: true, obstacles: portfolioIslands.map(island => ({ x: island.position.x, z: island.position.z, radius: island.landCollisionRadius })) }
  let reached = false
  let entryTime = 0
  for (let frame = 0; frame < 120 * 60; frame += 1) {
    const distance = Math.hypot(vessel.x - shipyard.position.x, vessel.z - shipyard.position.z)
    const input = { ...vesselInputFromControls(['right']), brake: distance < 10 }
    trim = stepTrimAssist(trim, vessel, { sheet: 0, engage: true, resumeAuto: false, suppressed: input.brake }, 1 / 120)
    vessel = stepVessel(vessel, { ...input, sailAngle: trim.sailAngle, trimBoost: trim.boost }, 1 / 120, environment, frame / 120)
    local = step(local, 1 / 120, { position: vessel, speed: Math.hypot(vessel.velocityX, vessel.velocityZ), manualIntent: true })
    for (const island of portfolioIslands) assert.ok(Math.hypot(vessel.x - island.position.x, vessel.z - island.position.z) >= island.landCollisionRadius + VESSEL_TUNING.collisionRadius - 1e-5)
    if (local.islandId) { reached = true; entryTime = frame / 120; break }
  }
  assert.ok(reached, 'D toward Shipyard, Spill inside 10 units, produces real manual local entry')
  assert.ok(entryTime > 0)
})

test('capture markers reuse one fixed draw and surface cache; disposal is idempotent', () => {
  const scene = new THREE.Scene()
  const markers = createHarbourMarkers(scene, portfolioHarbours, portfolioIslands)
  const lines = markers.group.children[0] as THREE.LineSegments
  const positions = lines.geometry.getAttribute('position') as THREE.BufferAttribute
  const colors = lines.geometry.getAttribute('color')
  assert.equal(positions.count, 128)
  assert.equal(markers.group.visible, false)
  const cache = new Float32Array(createWaterSurfaceAxis().length ** 2 * 3)
  for (let index = 1; index < cache.length; index += 3) cache[index] = 0.75
  markers.update(enter(), cache)
  assert.equal(markers.group.visible, true)
  for (let vertex = 0; vertex < positions.count; vertex += 1) {
    assert.ok(Math.abs(positions.getY(vertex) - sampleRenderedWaterHeight(positions.getX(vertex), positions.getZ(vertex), cache) - 0.12) < 1e-6)
  }
  markers.update(createLocalHarbourState(), cache)
  assert.equal(markers.group.visible, false)
  assert.strictEqual(lines.geometry.getAttribute('position'), positions)
  assert.strictEqual(lines.geometry.getAttribute('color'), colors)
  let geometries = 0, materials = 0
  lines.geometry.addEventListener('dispose', () => geometries += 1)
  ;(lines.material as THREE.Material).addEventListener('dispose', () => materials += 1)
  markers.dispose(); markers.dispose()
  markers.update(enter(), cache)
  assert.equal(geometries, 1)
  assert.equal(materials, 1)
  assert.equal(scene.children.length, 0)
})
