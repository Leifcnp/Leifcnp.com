// Run from any directory: node --experimental-strip-types artifacts/phase15-rollout/validation.mjs
// Writes only validation.json beside this file. CPU timings exclude water-buffer creation.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import { performance } from 'node:perf_hooks'
import { fileURLToPath } from 'node:url'
import * as THREE from 'three'
import { createShorelineFoam } from '../../src/world/effects/createShorelineFoam.ts'
import { createWaterSurfaceAxis, sampleRenderedWaterHeight } from '../../src/world/waterSurfaceGrid.ts'
import { PRIMARY_WAVE, sampleWaterHeight } from '../../src/world/waves.ts'
import { portfolioIslands as islands } from '../../src/content/islands.ts'

const root = fileURLToPath(new URL('../../', import.meta.url))
const sourcePaths = ['src/world/effects/createShorelineFoam.ts', 'src/world/createLandmarks.ts', 'src/world/createWaterWorld.ts', 'src/world/waterSurfaceGrid.ts', 'src/world/waves.ts', 'src/content/islands.ts']
const hashes = () => Object.fromEntries(sourcePaths.map(path => [path, createHash('sha256').update(readFileSync(root + path)).digest('hex')]))
const initialSourceSha256 = hashes()
const scene = new THREE.Scene()
const foam = createShorelineFoam(scene, islands)
assert.equal(scene.children.length, 1)
assert.strictEqual(scene.children[0], foam.mesh)
const geometry = foam.mesh.geometry
const positionAttribute = geometry.getAttribute('position')
const alphaAttribute = geometry.getAttribute('aAlpha')
const positions = positionAttribute.array
const alphas = alphaAttribute.array
const indices = geometry.index.array
const axis = createWaterSurfaceAxis()
const cache = new Float32Array(axis.length ** 2 * 3)
function fillWater(time) {
  for (let row = 0; row < axis.length; row++) for (let column = 0; column < axis.length; column++) {
    const index = (row * axis.length + column) * 3
    cache[index] = axis[column]
    cache[index + 1] = sampleWaterHeight(axis[column], axis[row], time)
    cache[index + 2] = axis[row]
  }
}
function snapshot() { return [...positions, ...alphas] }

// Independently derive each decagon plane from THREE's real cylinder vertices.
const measurements = islands.map(island => {
  const radius = island.landCollisionRadius * 0.98
  const cylinder = new THREE.CylinderGeometry(radius, radius, 4.07, 10, 1, false)
  const ring = cylinder.getAttribute('position')
  const planes = Array.from({ length: 10 }, (_, face) => {
    const ax = ring.getX(face), az = ring.getZ(face), bx = ring.getX(face + 1), bz = ring.getZ(face + 1)
    const length = Math.hypot(ax + bx, az + bz)
    const nx = (ax + bx) / length, nz = (az + bz) / length
    return { nx, nz, tx: nz, tz: -nx, apothem: nx * ax + nz * az, halfEdge: Math.hypot(ax - bx, az - bz) / 2 }
  })
  cylinder.dispose()
  return {
    id: island.id, centre: island.position, collisionRadius: island.landCollisionRadius, planes,
    geometry: { finite: true, minNormalClearance: Infinity, minCornerGap: Infinity, minVertexLift: Infinity, maxVertexLift: -Infinity },
    contact: { activeFrames: 0, quietFrames: 0, peakAlpha: 0, maxActiveFaces: 0, facePeakAlphas: Array(10).fill(0), leewardPeakAlpha: 0, dockSectorPeakAlpha: 0, interiorSamples: 0, submergedSamples: 0, minInteriorLift: Infinity, maxInteriorLift: -Infinity, worstInterior: null },
    phases: [],
  }
})
const sharedPhases = []
for (let frame = 0; frame <= 96; frame++) {
  const time = frame / 4
  fillWater(time)
  foam.update(time, cache)
  const shared = { time, islandPeakAlphas: {}, visibleFacePeakAlphas: {} }
  for (let islandIndex = 0; islandIndex < islands.length; islandIndex++) {
    const island = islands[islandIndex], m = measurements[islandIndex], g = m.geometry, c = m.contact
    const baseVertex = islandIndex * 100, baseTriangle = islandIndex * 80
    let activeFaces = 0
    const framePeak = Math.max(...alphas.slice(baseVertex, baseVertex + 100))
    c.peakAlpha = Math.max(c.peakAlpha, framePeak)
    if (framePeak > 0.01) c.activeFrames++; else c.quietFrames++
    const facePeaks = []
    for (let face = 0; face < 10; face++) {
      const p = m.planes[face]
      const facePeak = Math.max(...alphas.slice(baseVertex + face * 10, baseVertex + face * 10 + 10))
      facePeaks.push(facePeak)
      c.facePeakAlphas[face] = Math.max(c.facePeakAlphas[face], facePeak)
      if (facePeak > 0.01) activeFaces++
      if (PRIMARY_WAVE.directionX * p.nx + PRIMARY_WAVE.directionZ * p.nz <= 0) c.leewardPeakAlpha = Math.max(c.leewardPeakAlpha, facePeak)
      if ((p.nx + p.nz) * Math.SQRT1_2 > 0.95) c.dockSectorPeakAlpha = Math.max(c.dockSectorPeakAlpha, facePeak)
      for (let vertex = baseVertex + face * 10; vertex < baseVertex + face * 10 + 10; vertex++) {
        const x = positions[vertex * 3], y = positions[vertex * 3 + 1], z = positions[vertex * 3 + 2]
        g.finite &&= [x, y, z, alphas[vertex]].every(Number.isFinite)
        const dx = x - island.position.x, dz = z - island.position.z
        g.minNormalClearance = Math.min(g.minNormalClearance, dx * p.nx + dz * p.nz - p.apothem)
        g.minCornerGap = Math.min(g.minCornerGap, p.halfEdge - Math.abs(dx * p.tx + dz * p.tz))
        const lift = y - sampleRenderedWaterHeight(x, z, cache)
        g.minVertexLift = Math.min(g.minVertexLift, lift); g.maxVertexLift = Math.max(g.maxVertexLift, lift)
      }
    }
    c.maxActiveFaces = Math.max(c.maxActiveFaces, activeFaces)
    const visiblePeak = Math.max(facePeaks[0], facePeaks[2], facePeaks[3])
    m.phases.push({ time, peakAlpha: framePeak, visiblePeak, visibleFaceAlphas: [facePeaks[0], facePeaks[2], facePeaks[3]] })
    shared.islandPeakAlphas[island.id] = framePeak
    shared.visibleFacePeakAlphas[island.id] = visiblePeak
    // Includes edges/interiors on barycentric eighths; only interpolated alpha >= .01.
    for (let triangle = baseTriangle * 3; triangle < (baseTriangle + 80) * 3; triangle += 3) {
      for (let a = 0; a <= 8; a++) for (let b = 0; b <= 8 - a; b++) {
        const weights = [a / 8, b / 8, 1 - (a + b) / 8]
        let x = 0, y = 0, z = 0, alpha = 0
        for (let corner = 0; corner < 3; corner++) {
          const vertex = indices[triangle + corner], w = weights[corner]
          x += positions[vertex * 3] * w; y += positions[vertex * 3 + 1] * w; z += positions[vertex * 3 + 2] * w
          alpha += alphas[vertex] * w
        }
        if (alpha < 0.01) continue
        const lift = y - sampleRenderedWaterHeight(x, z, cache)
        c.interiorSamples++
        if (lift < 0) c.submergedSamples++
        if (lift < c.minInteriorLift) { c.minInteriorLift = lift; c.worstInterior = { time, triangle: triangle / 3 - baseTriangle, x, y, z, alpha } }
        c.maxInteriorLift = Math.max(c.maxInteriorLift, lift)
      }
    }
  }
  shared.minVisiblePeak = Math.min(...Object.values(shared.visibleFacePeakAlphas))
  shared.sumVisiblePeak = Object.values(shared.visibleFacePeakAlphas).reduce((sum, value) => sum + value, 0)
  shared.maxPeak = Math.max(...Object.values(shared.islandPeakAlphas))
  sharedPhases.push(shared)
}
for (const m of measurements) {
  delete m.planes
  m.contact.submergedFraction = m.contact.submergedSamples / m.contact.interiorSamples
  m.phases = { active: m.phases.toSorted((a, b) => b.visiblePeak - a.visiblePeak).slice(0, 4), quiet: m.phases.toSorted((a, b) => a.peakAlpha - b.peakAlpha).slice(0, 2) }
}

fillWater(4)
foam.update(4, cache)
const expected = snapshot()
foam.update(4, cache)
const sameTimeStable = JSON.stringify(expected) === JSON.stringify(snapshot())
const partitions = [30, 60, 120].map(hz => {
  foam.reset()
  for (let tick = 0; tick <= hz * 4; tick++) foam.update(tick / hz, cache)
  return { hz, matchesFinalSnapshot: JSON.stringify(expected) === JSON.stringify(snapshot()), water: 'same final cached buffer; timing partition isolates effect state' }
})
foam.reset(); foam.update(0, cache); const resetExpected = snapshot()
foam.update(9, cache); foam.reset(); foam.update(0, cache)
const resetRepeats = JSON.stringify(resetExpected) === JSON.stringify(snapshot())
foam.setReducedMotion(true); const reducedSnapshot = snapshot(); foam.update(100, cache)
const reducedHiddenAndFrozen = alphas.every(value => value === 0) && JSON.stringify(reducedSnapshot) === JSON.stringify(snapshot())
foam.setReducedMotion(false)
const bufferIdentityStable = positionAttribute === geometry.getAttribute('position') && alphaAttribute === geometry.getAttribute('aAlpha')
for (let index = 0; index < 1000; index++) foam.update(index / 60, cache)
function benchmark(cached) {
  const means = []
  for (let batch = 0; batch < 12; batch++) {
    const start = performance.now()
    for (let index = 0; index < 500; index++) foam.update(index / 60, cached ? cache : undefined)
    means.push((performance.now() - start) / 500)
  }
  means.sort((a, b) => a - b)
  return { batches: 12, updatesPerBatch: 500, minMs: means[0], medianMs: (means[5] + means[6]) / 2, maxMs: means.at(-1), batchMeanMs: means }
}
const cpu = { cached: benchmark(true), analyticFallback: benchmark(false) }
let geometryDisposeEvents = 0, materialDisposeEvents = 0
geometry.addEventListener('dispose', () => geometryDisposeEvents++)
foam.mesh.material.addEventListener('dispose', () => materialDisposeEvents++)
const beforeDispose = snapshot()
foam.dispose(); foam.dispose(); foam.update(200, cache); foam.reset(); foam.setReducedMotion(true)
const afterDisposeUnchanged = JSON.stringify(beforeDispose) === JSON.stringify(snapshot())
const empty = createShorelineFoam(scene, [])
empty.update(Number.NaN, cache)
const emptyFiniteAndHidden = [...empty.mesh.geometry.getAttribute('position').array].every(Number.isFinite) && [...empty.mesh.geometry.getAttribute('aAlpha').array].every(value => value === 0)
empty.dispose()
const sourceSha256 = hashes()
assert.deepEqual(sourceSha256, initialSourceSha256, 'measured source remains unchanged during fixture')
const result = {
  generatedAt: new Date().toISOString(), headAtMeasurement: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), sourceSha256,
  provenance: { fixture: 'All four authored islands in data order; actual shared water grid, t=0..24 in .25s steps', basis: 'Adapted Shipyard numeric fixture; no copied screenshots or historical timing evidence', limitation: 'Finite sampled time/space coverage; CPU cost is synchronous wall-clock time per update, excludes rendering and ocean updates. No browser or allocation claim.' },
  runtime: { node: process.version, platform: process.platform, architecture: process.arch, cpu: os.cpus()[0]?.model },
  resources: { vertices: positions.length / 3, triangles: indices.length / 3, positionBytes: positions.byteLength, alphaBytes: alphas.byteLength, indexBytes: indices.byteLength, meshCount: 1, materialCount: 1, depthTest: foam.mesh.material.depthTest, forceSinglePass: foam.mesh.material.forceSinglePass },
  snapshots: 97, perIsland: measurements, sharedPhases: { active: sharedPhases.toSorted((a, b) => b.minVisiblePeak - a.minVisiblePeak || b.sumVisiblePeak - a.sumVisiblePeak).slice(0, 4), quiet: sharedPhases.toSorted((a, b) => a.maxPeak - b.maxPeak).slice(0, 4) },
  lifecycle: { sameTimeStable, partitions, resetRepeats, reducedHiddenAndFrozen, bufferIdentityStable, geometryDisposeEvents, materialDisposeEvents, afterDisposeUnchanged, sceneEmpty: scene.children.length === 0, emptyFiniteAndHidden }, cpu,
}
writeFileSync(new URL('validation.json', import.meta.url), JSON.stringify(result, null, 2) + '\n')
assert.equal(result.resources.vertices, 400); assert.equal(result.resources.triangles, 320)
assert.equal(indices.BYTES_PER_ELEMENT, 2); assert.equal(scene.children.length, 0)
assert.ok(result.resources.depthTest && result.resources.forceSinglePass)
for (const m of measurements) {
  const g = m.geometry, c = m.contact
  assert.ok(g.finite && g.minNormalClearance >= 0.2 - 4e-6 && g.minCornerGap >= 0.18 - 4e-6, m.id + ' exterior')
  assert.ok(c.activeFrames > 0 && c.quietFrames > 0 && c.peakAlpha <= 0.600001 && c.maxActiveFaces < 10, m.id + ' activity')
  assert.equal(c.leewardPeakAlpha, 0, m.id + ' leeward')
  if (m.id === 'island-projects') assert.equal(c.dockSectorPeakAlpha, 0, 'Shipyard dock gap')
  else assert.ok(c.dockSectorPeakAlpha > 0.01, m.id + ' no accidental Shipyard dock gap')
}
assert.ok(sameTimeStable && partitions.every(row => row.matchesFinalSnapshot) && resetRepeats && reducedHiddenAndFrozen && bufferIdentityStable)
assert.ok(geometryDisposeEvents === 1 && materialDisposeEvents === 1 && afterDisposeUnchanged && result.lifecycle.sceneEmpty && emptyFiniteAndHidden)
assert.ok(cpu.cached.maxMs < 1, 'worst warmed cached batch mean under 1ms')
console.log(JSON.stringify({ perIsland: measurements.map(({id, geometry, contact}) => ({id, geometry, contact})), lifecycle: result.lifecycle, cpu: {cachedMedian: cpu.cached.medianMs, cachedWorst: cpu.cached.maxMs, fallbackMedian: cpu.analyticFallback.medianMs}, phases: result.sharedPhases }, null, 2))
