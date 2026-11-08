// From repository root: node --experimental-strip-types artifacts/phase16/validation.mjs
// Writes only validation.json; synchronous CPU timings exclude ocean generation and rendering.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import { performance } from 'node:perf_hooks'
import { fileURLToPath } from 'node:url'
import * as THREE from 'three'
import { portfolioIslands as islands, VESSEL_SPAWN } from '../../src/content/islands.ts'
import { portfolioContent } from '../../src/content/portfolio.ts'
import { portfolioHarbours as harbours, getHarbourWorldPosition, validateHarbourDefinitions } from '../../src/content/harbours.ts'
import { createLocalHarbourState, stepLocalHarbour, noteManualHarbourIntent, selectLocalHarbour, zoomOutLocalHarbour, clearLocalHarbourForScan, LOCAL_HARBOUR_TUNING } from '../../src/interaction/localHarbour.ts'
import { createHarbourMarkers } from '../../src/world/createHarbourMarkers.ts'
import { createCameraRig } from '../../src/world/createCameraRig.ts'
import { VESSEL_TUNING, createVesselState, stepVessel } from '../../src/world/vessel/kinematics.ts'
import { createTrimAssistState, stepTrimAssist } from '../../src/world/vessel/trimAssist.ts'
import { vesselInputFromControls } from '../../src/controls/vesselInput.ts'
import { STORM_TUNING } from '../../src/world/stormField.ts'
import { createWaterSurfaceAxis, sampleRenderedWaterHeight } from '../../src/world/waterSurfaceGrid.ts'
import { sampleWaterHeight } from '../../src/world/waves.ts'
import { isSafeNavigationSegment } from '../../src/navigation/routePlanner.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const sourcePaths = ['src/content/islands.ts', 'src/content/portfolio.ts', 'src/content/harbours.ts', 'src/interaction/localHarbour.ts', 'src/world/createHarbourMarkers.ts', 'src/world/createCameraRig.ts', 'src/world/createWaterWorld.ts', 'src/world/vessel/kinematics.ts', 'src/world/vessel/trimAssist.ts', 'src/controls/vesselInput.ts', 'src/navigation/routePlanner.ts', 'src/world/waterSurfaceGrid.ts', 'src/world/waves.ts', 'src/world/stormField.ts']
const hashes = () => Object.fromEntries(sourcePaths.map(path => [path, createHash('sha256').update(readFileSync(root + path)).digest('hex')]))
const initialHashes = hashes()
const safetyMargin = Number(readFileSync(root + 'src/navigation/routePlanner.ts', 'utf8').match(/const SAFETY_MARGIN = ([\d.]+)/)[1])
const harbourSafetyMargin = Number(readFileSync(root + 'src/content/harbours.ts', 'utf8').match(/const safetyMargin = ([\d.]+)/)[1])
assert.equal(safetyMargin, harbourSafetyMargin)
const bounds = { worldLimit: STORM_TUNING.worldLimit, vesselClearance: VESSEL_TUNING.collisionRadius }
validateHarbourDefinitions(harbours, islands, portfolioContent, bounds.vesselClearance, bounds.worldLimit)
const shipyard = islands.find(island => island.id === 'island-projects')
const worldPosition = harbour => getHarbourWorldPosition(harbour, islands)
function segmentDistance(point, start, end) {
  const dx = end.x - start.x, dz = end.z - start.z, length = dx * dx + dz * dz
  const t = length ? Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.z - start.z) * dz) / length)) : 0
  return Math.hypot(point.x - start.x - t * dx, point.z - start.z - t * dz)
}
function segmentClearances(start, end) {
  const rows = islands.map(island => ({ islandId: island.id, marginBeyondLandAndHull: segmentDistance(island.position, start, end) - island.landCollisionRadius - bounds.vesselClearance }))
  return { start, end, minMarginBeyondLandAndHull: Math.min(...rows.map(row => row.marginBeyondLandAndHull)), minMarginBeyondSafety: Math.min(...rows.map(row => row.marginBeyondLandAndHull - safetyMargin)), safe: isSafeNavigationSegment(start, end, islands, bounds, bounds.vesselClearance + safetyMargin), perIsland: rows }
}
const geometry = harbours.map(harbour => {
  const centre = worldPosition(harbour), parent = islands.find(island => island.id === harbour.islandId)
  const captures = islands.map(island => ({ islandId: island.id, marginBeyondLandAndHull: Math.hypot(centre.x - island.position.x, centre.z - island.position.z) - harbour.captureRadius - island.landCollisionRadius - bounds.vesselClearance }))
  const approach = harbour.approachPoints.map(point => ({ x: parent.position.x + point.x, z: parent.position.z + point.z }))
  return { id: harbour.id, centre, captureRadius: harbour.captureRadius, minCaptureMarginBeyondLandAndHull: Math.min(...captures.map(row => row.marginBeyondLandAndHull)), minCaptureMarginBeyondSafety: Math.min(...captures.map(row => row.marginBeyondLandAndHull - safetyMargin)), worldBoundaryMargin: bounds.worldLimit - bounds.vesselClearance - harbour.captureRadius - Math.max(Math.abs(centre.x), Math.abs(centre.z)), capturePerIsland: captures, approach: approach.slice(1).map((end, index) => segmentClearances(approach[index], end)) }
})
const connection = segmentClearances(worldPosition(harbours[0]), worldPosition(harbours[1]))
const mutualCaptureGap = Math.hypot(connection.start.x - connection.end.x, connection.start.z - connection.end.z) - harbours[0].captureRadius - harbours[1].captureRadius

// Same real control/trim/physics path as the production adapters; no teleports or altered forces.
function manualVoyage() {
  let vessel = createVesselState(VESSEL_SPAWN.x, VESSEL_SPAWN.z), trim = createTrimAssistState(), local = createLocalHarbourState()
  const environment = { sailingEnabled: true, stormEnabled: true, worldLimit: bounds.worldLimit, obstacles: islands.map(island => ({ x: island.position.x, z: island.position.z, radius: island.landCollisionRadius })) }
  let minCollisionMargin = Infinity, brakingStartedAt = null, firstInsideAt = null
  for (let frame = 0; frame < 120 * 60; frame++) {
    const time = frame / 120, dt = 1 / 120
    const distance = Math.hypot(vessel.x - shipyard.position.x, vessel.z - shipyard.position.z)
    const input = { ...vesselInputFromControls(['right']), brake: distance < shipyard.dockingTriggerRadius }
    if (input.brake && brakingStartedAt === null) brakingStartedAt = time
    trim = stepTrimAssist(trim, vessel, { sheet: 0, engage: true, resumeAuto: false, suppressed: input.brake }, dt)
    vessel = stepVessel(vessel, { ...input, sailAngle: trim.sailAngle, trimBoost: trim.boost }, dt, environment, time)
    const speed = Math.hypot(vessel.velocityX, vessel.velocityZ)
    local = stepLocalHarbour(local, { position: vessel, speed, deltaSeconds: dt, manualIntent: true, scannerActive: false }, islands, harbours)
    if (Math.hypot(vessel.x - shipyard.position.x, vessel.z - shipyard.position.z) <= shipyard.dockingTriggerRadius && firstInsideAt === null) firstInsideAt = time + dt
    for (const island of islands) minCollisionMargin = Math.min(minCollisionMargin, Math.hypot(vessel.x - island.position.x, vessel.z - island.position.z) - island.landCollisionRadius - bounds.vesselClearance)
    if (local.islandId) return { control: 'Hold screen-right/D; add Spill/brake inside existing parent docking radius', fixedHz: 120, entryActiveSeconds: time + dt, firstInsideAt, brakingStartedAt, minCollisionMargin, speedAtEntry: speed, vesselAtEntry: vessel, localAtEntry: local }
  }
  throw new Error('Real helm voyage did not enter within 60 active seconds')
}
const voyage = manualVoyage(), repeatedVoyage = manualVoyage()
assert.deepEqual(voyage, repeatedVoyage)

const scene = new THREE.Scene(), markers = createHarbourMarkers(scene, harbours, islands)
const lines = markers.group.children[0], lineGeometry = lines.geometry, material = lines.material
const positionAttribute = lineGeometry.getAttribute('position'), colorAttribute = lineGeometry.getAttribute('color')
const positions = positionAttribute.array, colors = colorAttribute.array
const snapshot = () => [...positions, ...colors, ...markers.anchors.flatMap(anchor => anchor.position.toArray())]
const axis = createWaterSurfaceAxis(), cache = new Float32Array(axis.length ** 2 * 3)
function fillWater(time) {
  for (let row = 0; row < axis.length; row++) for (let column = 0; column < axis.length; column++) {
    const index = (row * axis.length + column) * 3
    cache[index] = axis[column]; cache[index + 1] = sampleWaterHeight(axis[column], axis[row], time); cache[index + 2] = axis[row]
  }
}
const local = voyage.localAtEntry, broad = createLocalHarbourState()
let finite = true, minVertexLift = Infinity, maxVertexLift = -Infinity, minLineLift = Infinity, maxLineLift = -Infinity, maxRadiusError = 0
for (let frame = 0; frame <= 96; frame++) {
  fillWater(frame / 4); markers.update(local, cache)
  for (let vertex = 0; vertex < positions.length / 3; vertex++) {
    const x = positions[vertex * 3], y = positions[vertex * 3 + 1], z = positions[vertex * 3 + 2]
    finite &&= [x, y, z].every(Number.isFinite)
    const harbour = harbours[Math.floor(vertex / 64)], centre = worldPosition(harbour)
    maxRadiusError = Math.max(maxRadiusError, Math.abs(Math.hypot(x - centre.x, z - centre.z) - harbour.captureRadius))
    const lift = y - sampleRenderedWaterHeight(x, z, cache)
    minVertexLift = Math.min(minVertexLift, lift); maxVertexLift = Math.max(maxVertexLift, lift)
  }
  for (let first = 0; first < positions.length / 3; first += 2) for (let part = 0; part <= 8; part++) {
    const w = part / 8
    const x = positions[first * 3] * (1 - w) + positions[(first + 1) * 3] * w
    const y = positions[first * 3 + 1] * (1 - w) + positions[(first + 1) * 3 + 1] * w
    const z = positions[first * 3 + 2] * (1 - w) + positions[(first + 1) * 3 + 2] * w
    const lift = y - sampleRenderedWaterHeight(x, z, cache)
    minLineLift = Math.min(minLineLift, lift); maxLineLift = Math.max(maxLineLift, lift)
  }
}
fillWater(4); markers.update(local, cache); const expected = snapshot(); markers.update(local, cache)
const sameSnapshotStable = JSON.stringify(expected) === JSON.stringify(snapshot())
markers.update(broad, cache)
const resetHidesAndRetainsBuffers = !markers.group.visible && JSON.stringify(expected) === JSON.stringify(snapshot())
let reads = 0
const countedCache = new Proxy(cache, { get(target, prop) { if (typeof prop === 'string' && /^\d+$/.test(prop)) reads++; return Reflect.get(target, prop, target) } })
markers.update(local, countedCache); const visibleWaterReads = reads
reads = 0; markers.update(broad, countedCache); const hiddenWaterReads = reads
markers.update(local, cache)
const fixedBuffers = positionAttribute === lineGeometry.getAttribute('position') && colorAttribute === lineGeometry.getAttribute('color')

// Pure state proof for active-time freeze, scanner, selection and explicit suppression.
const pauseHiddenFreeze = stepLocalHarbour(local, { position: worldPosition(harbours[1]), speed: 0, deltaSeconds: 0, manualIntent: true, scannerActive: false }, islands, harbours) === local
const selected = selectLocalHarbour(local, harbours[1].id, harbours)
const zoomedOut = zoomOutLocalHarbour(selected)
const suppressed = stepLocalHarbour(noteManualHarbourIntent(zoomedOut), { position: voyage.vesselAtEntry, speed: 0, deltaSeconds: 1, manualIntent: true, scannerActive: false }, islands, harbours)
const scanner = clearLocalHarbourForScan(local)
const scannerStillBroad = stepLocalHarbour(scanner, { position: voyage.vesselAtEntry, speed: 0, deltaSeconds: 1, manualIntent: false, scannerActive: false }, islands, harbours).islandId === null

const rig = createCameraRig(); rig.resize(1440, 900); rig.snapTo(voyage.vesselAtEntry.x, voyage.vesselAtEntry.z)
rig.setFramingInsets({ top: 160, right: 460, bottom: 180, left: 20 }); rig.setLocalTarget(worldPosition(harbours[0]))
rig.setReducedMotion(true)
const instantCamera = [...rig.camera.position.toArray(), rig.camera.zoom]
rig.update(voyage.vesselAtEntry.x, voyage.vesselAtEntry.z, 0)
const reducedZeroTimeStable = JSON.stringify(instantCamera) === JSON.stringify([...rig.camera.position.toArray(), rig.camera.zoom])
rig.update(voyage.vesselAtEntry.x, voyage.vesselAtEntry.z, 1 / 60)
const reducedAlreadyAtTarget = JSON.stringify(instantCamera) === JSON.stringify([...rig.camera.position.toArray(), rig.camera.zoom])
rig.dispose()

const limits = { visibleWorstBatchMeanMs: 0.5, hiddenWorstBatchMeanMs: 0.05, disposedWorstBatchMeanMs: 0.05 }
function benchmark(state) {
  for (let index = 0; index < 1000; index++) markers.update(state, cache)
  const means = []
  for (let batch = 0; batch < 12; batch++) {
    const start = performance.now()
    for (let index = 0; index < 1000; index++) markers.update(state, cache)
    means.push((performance.now() - start) / 1000)
  }
  means.sort((a, b) => a - b)
  return { batches: 12, updatesPerBatch: 1000, minMs: means[0], medianMs: (means[5] + means[6]) / 2, maxMs: means.at(-1) }
}
const cpu = { visible: benchmark(local), hidden: benchmark(broad) }
let geometryDisposeEvents = 0, materialDisposeEvents = 0
lineGeometry.addEventListener('dispose', () => geometryDisposeEvents++)
material.addEventListener('dispose', () => materialDisposeEvents++)
const beforeDispose = snapshot(); markers.dispose(); markers.dispose()
reads = 0; markers.update(local, countedCache); const disposedWaterReads = reads
cpu.disposed = benchmark(local)
const afterDisposeStable = JSON.stringify(beforeDispose) === JSON.stringify(snapshot())
const finalHashes = hashes(); assert.deepEqual(initialHashes, finalHashes, 'source stable throughout measurement')
const result = {
  generatedAt: new Date().toISOString(), headAtMeasurement: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), sourceSha256: finalHashes,
  runtime: { node: process.version, cpu: os.cpus()[0]?.model, platform: process.platform, architecture: process.arch },
  provenance: { water: 'Full current 121x121 shared rendered grid; 97 snapshots at t=0..24, step .25; line interiors sampled at eighths', timing: 'Warmed synchronous wall-clock update cost only; excludes ocean generation, rendering, UI and driver. No FPS/mobile GPU or heap-allocation claim. Hidden/disposed microbenchmarks are near the JIT/timer noise floor; use their upper batch bound and zero water-read count, not nanosecond values as isolated call latency.', motion: 'Functional markers have no reduced-motion setter; unchanged cached water/snapshot stays deterministic. Camera reduced-motion target applies immediately; world active-time freeze is separately covered by production browser checks.' },
  bounds, safetyMargin, localTuning: LOCAL_HARBOUR_TUNING, geometry, connection, mutualCaptureGap, manualVoyage: voyage,
  resources: { sceneGroups: 1, lineObjects: markers.group.children.length, lineSegments: lines.isLineSegments, vertices: positions.length / 3, segments: positions.length / 6, materials: Array.isArray(material) ? material.length : 1, positionBytes: positions.byteLength, colorBytes: colors.byteLength, depthTest: material.depthTest, depthWrite: material.depthWrite, expectedVisibleDrawCalls: 1, expectedHiddenDrawCalls: 0, drawCallBasis: 'One LineSegments/material in the scene graph; actual renderer draw delta is a browser gate.' },
  surface: { finite, maxRadiusError, minVertexLift, maxVertexLift, minLineLift, maxLineLift },
  lifecycle: { sameSnapshotStable, resetHidesAndRetainsBuffers, fixedBuffers, pauseHiddenFreeze, scannerStillBroad, zoomOutRetainsSelection: zoomedOut.selectedHarbourId === selected.selectedHarbourId, suppressionPreventsImmediateReentry: suppressed.islandId === null && suppressed.suppressed, reducedZeroTimeStable, reducedAlreadyAtTarget, visibleWaterReads, hiddenWaterReads, disposedWaterReads, geometryDisposeEvents, materialDisposeEvents, afterDisposeStable, sceneEmpty: scene.children.length === 0 }, cpu, limits,
}
writeFileSync(new URL('validation.json', import.meta.url), JSON.stringify(result, null, 2) + '\n')
assert.ok(geometry.every(row => row.minCaptureMarginBeyondSafety > 0 && row.worldBoundaryMargin > 0 && row.approach.every(segment => segment.safe)))
assert.ok(connection.safe && mutualCaptureGap > 0 && voyage.minCollisionMargin >= -1e-5 && voyage.speedAtEntry <= LOCAL_HARBOUR_TUNING.maxEntrySpeed)
assert.equal(result.resources.vertices, 128); assert.equal(result.resources.segments, 64); assert.equal(result.resources.materials, 1); assert.equal(result.resources.lineObjects, 1)
assert.ok(lines.isLineSegments && finite && maxRadiusError < 2e-6 && minVertexLift > 0.119998 && maxVertexLift < 0.120002)
assert.ok(sameSnapshotStable && resetHidesAndRetainsBuffers && fixedBuffers && pauseHiddenFreeze && scannerStillBroad && result.lifecycle.zoomOutRetainsSelection && result.lifecycle.suppressionPreventsImmediateReentry && reducedZeroTimeStable && reducedAlreadyAtTarget)
assert.ok(visibleWaterReads > 0 && hiddenWaterReads === 0 && disposedWaterReads === 0 && geometryDisposeEvents === 1 && materialDisposeEvents === 1 && afterDisposeStable && result.lifecycle.sceneEmpty)
assert.ok(cpu.visible.maxMs < limits.visibleWorstBatchMeanMs && cpu.hidden.maxMs < limits.hiddenWorstBatchMeanMs && cpu.disposed.maxMs < limits.disposedWorstBatchMeanMs)
console.log(JSON.stringify({ captures: geometry.map(({id, minCaptureMarginBeyondLandAndHull, minCaptureMarginBeyondSafety}) => ({id, minCaptureMarginBeyondLandAndHull, minCaptureMarginBeyondSafety})), connectionMargin: connection.minMarginBeyondLandAndHull, manualEntry: voyage.entryActiveSeconds, surface: result.surface, lifecycle: result.lifecycle, cpu, resources: result.resources }, null, 2))
