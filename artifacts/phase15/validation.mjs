// Run from any directory: node --experimental-strip-types artifacts/phase15/validation.mjs
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

const root = fileURLToPath(new URL('../../', import.meta.url))
const island = { position: { x: 16, z: -24 }, landCollisionRadius: 6 }
const scene = new THREE.Scene()
const foam = createShorelineFoam(scene, [island])
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

// Derive planes from THREE's actual default cylinder vertices, independent of the effect's helper.
const cylinder = new THREE.CylinderGeometry(5.88, 5.88, 4.07, 10, 1, false)
const ring = cylinder.getAttribute('position')
const planes = Array.from({ length: 10 }, (_, face) => {
  const ax = ring.getX(face), az = ring.getZ(face)
  const bx = ring.getX(face + 1), bz = ring.getZ(face + 1)
  const length = Math.hypot(ax + bx, az + bz)
  const nx = (ax + bx) / length, nz = (az + bz) / length
  return { nx, nz, tx: nz, tz: -nx, apothem: nx * ax + nz * az, halfEdge: Math.hypot(ax - bx, az - bz) / 2 }
})
cylinder.dispose()
let minClearance = Infinity, minCornerGap = Infinity, minVertexLift = Infinity, maxVertexLift = -Infinity
let minInteriorLift = Infinity, maxInteriorLift = -Infinity, interiorSamples = 0, submergedSamples = 0
let worstInterior = null, activeFrames = 0, quietFrames = 0, peakAlpha = 0, maxActiveFaces = 0
let leewardPeakAlpha = 0, dockPeakAlpha = 0, finite = true
const facePeakAlphas = Array(10).fill(0)
for (let frame = 0; frame <= 96; frame++) {
  const time = frame / 4
  fillWater(time)
  foam.update(time, cache)
  let activeFaces = 0
  const framePeak = Math.max(...alphas)
  peakAlpha = Math.max(peakAlpha, framePeak)
  if (framePeak > 0.01) activeFrames++; else quietFrames++
  for (let face = 0; face < 10; face++) {
    const p = planes[face]
    const facePeak = Math.max(...alphas.slice(face * 10, face * 10 + 10))
    facePeakAlphas[face] = Math.max(facePeakAlphas[face], facePeak)
    if (facePeak > 0.01) activeFaces++
    if (PRIMARY_WAVE.directionX * p.nx + PRIMARY_WAVE.directionZ * p.nz <= 0) leewardPeakAlpha = Math.max(leewardPeakAlpha, facePeak)
    if ((p.nx + p.nz) * Math.SQRT1_2 > 0.95) dockPeakAlpha = Math.max(dockPeakAlpha, facePeak)
    for (let vertex = face * 10; vertex < face * 10 + 10; vertex++) {
      const x = positions[vertex * 3], y = positions[vertex * 3 + 1], z = positions[vertex * 3 + 2]
      finite &&= [x, y, z, alphas[vertex]].every(Number.isFinite)
      minClearance = Math.min(minClearance, (x - 16) * p.nx + (z + 24) * p.nz - p.apothem)
      minCornerGap = Math.min(minCornerGap, p.halfEdge - Math.abs((x - 16) * p.tx + (z + 24) * p.tz))
      const lift = y - sampleRenderedWaterHeight(x, z, cache)
      minVertexLift = Math.min(minVertexLift, lift); maxVertexLift = Math.max(maxVertexLift, lift)
    }
  }
  maxActiveFaces = Math.max(maxActiveFaces, activeFaces)
  // Includes edges and interiors on a barycentric eighth grid; count only interpolated alpha >= .01.
  for (let triangle = 0; triangle < indices.length; triangle += 3) {
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
      interiorSamples++
      if (lift < 0) submergedSamples++
      if (lift < minInteriorLift) { minInteriorLift = lift; worstInterior = { time, triangle: triangle / 3, x, y, z, alpha } }
      maxInteriorLift = Math.max(maxInteriorLift, lift)
    }
  }
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
const sourcePaths = ['src/world/effects/createShorelineFoam.ts', 'src/world/createLandmarks.ts', 'src/world/createWaterWorld.ts', 'src/world/waterSurfaceGrid.ts', 'src/world/waves.ts']
const sourceSha256 = Object.fromEntries(sourcePaths.map(path => [path, createHash('sha256').update(readFileSync(root + path)).digest('hex')]))
const result = {
  generatedAt: new Date().toISOString(), headAtMeasurement: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), sourceSha256,
  provenance: { fixture: 'Shipyard (16,-24), radius 6; actual shared water grid, t=0..24 in .25s steps', baselineMotionJson: 'Copied historical before/motion.json is unverified: null baseline commit and no capture script; not used for measurements here', limitation: 'Finite sampled time/space coverage; CPU cost is synchronous wall-clock time per update, excludes rendering and ocean updates. No browser or allocation claim.' },
  runtime: { node: process.version, platform: process.platform, architecture: process.arch, cpu: os.cpus()[0]?.model },
  resources: { vertices: positions.length / 3, triangles: indices.length / 3, positionBytes: positions.byteLength, alphaBytes: alphas.byteLength, indexBytes: indices.byteLength, meshCount: 1, materialCount: 1, depthTest: foam.mesh.material.depthTest, forceSinglePass: foam.mesh.material.forceSinglePass },
  geometry: { finite, minNormalClearance: minClearance, minCornerGap, minVertexLift, maxVertexLift },
  contact: { snapshots: 97, activeFrames, quietFrames, peakAlpha, maxActiveFaces, facePeakAlphas, leewardPeakAlpha, dockPeakAlpha, interiorSamples, submergedSamples, minInteriorLift, maxInteriorLift, worstInterior },
  lifecycle: { sameTimeStable, partitions, resetRepeats, reducedHiddenAndFrozen, bufferIdentityStable, geometryDisposeEvents, materialDisposeEvents, afterDisposeUnchanged, sceneEmpty: scene.children.length === 0, emptyFiniteAndHidden }, cpu,
}
writeFileSync(new URL('validation.json', import.meta.url), JSON.stringify(result, null, 2) + '\n')
assert.ok(finite && minClearance >= 0.2 - 3e-6 && minCornerGap >= 0.18 - 3e-6)
assert.ok(activeFrames > 0 && quietFrames > 0 && peakAlpha <= 0.600001 && maxActiveFaces < 10)
assert.equal(leewardPeakAlpha, 0); assert.equal(dockPeakAlpha, 0)
assert.ok(sameTimeStable && partitions.every(row => row.matchesFinalSnapshot) && resetRepeats && reducedHiddenAndFrozen && bufferIdentityStable)
assert.ok(geometryDisposeEvents === 1 && materialDisposeEvents === 1 && afterDisposeUnchanged && result.lifecycle.sceneEmpty && emptyFiniteAndHidden)
assert.ok(cpu.cached.maxMs < 1)
console.log(JSON.stringify({ geometry: result.geometry, contact: result.contact, lifecycle: result.lifecycle, cpu: { cached: cpu.cached.medianMs, analyticFallback: cpu.analyticFallback.medianMs } }, null, 2))
