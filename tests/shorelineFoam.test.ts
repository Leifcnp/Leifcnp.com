import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import {
  createShorelineFoam,
  getShorelineFoamAnchor,
  getShorelineFoamIntensity,
  SHORELINE_FOAM_TRIANGLE_COUNT,
  SHORELINE_FOAM_VERTICES_PER_ISLAND,
  SHORELINE_FOAM_TRIANGLES_PER_ISLAND,
  SHORELINE_FOAM_VERTEX_COUNT,
  SHORELINE_FOOTPRINT_FACTOR,
  SHORELINE_INNER_CLEARANCE,
} from '../src/world/effects/createShorelineFoam.ts'
import { portfolioIslands } from '../src/content/islands.ts'
import { MAX_WAVE_HEIGHT, PRIMARY_WAVE, sampleWaterHeight } from '../src/world/waves.ts'
import { STORM_TUNING } from '../src/world/stormField.ts'
import { createWaterSurfaceAxis, sampleRenderedWaterHeight } from '../src/world/waterSurfaceGrid.ts'

const island = { id: 'island-projects', position: { x: 16, z: -24 }, landCollisionRadius: 6 }

function cachedPositions(value = 0.9): Float32Array {
  const positions = new Float32Array(createWaterSurfaceAxis().length ** 2 * 3)
  for (let index = 1; index < positions.length; index += 3) positions[index] = value
  return positions
}

function alphaValues(mesh: THREE.Mesh): Float32Array {
  return mesh.geometry.getAttribute('aAlpha').array as Float32Array
}

test('anchors use actual decagon face midpoints and remain water-side', () => {
  const radius = island.landCollisionRadius * SHORELINE_FOOTPRINT_FACTOR
  const apothem = radius * Math.cos(Math.PI / 10)
  const decagon = new THREE.CylinderGeometry(radius, radius, 1, 10)
  const vertices = decagon.getAttribute('position')
  for (let index = 0; index < 10; index += 1) {
    const anchor = getShorelineFoamAnchor(island, index)
    const midX = (vertices.getX(index) + vertices.getX(index + 1)) / 2
    const midZ = (vertices.getZ(index) + vertices.getZ(index + 1)) / 2
    assert.ok(Math.abs(midX / apothem - anchor.normalX) < 1e-6)
    assert.ok(Math.abs(midZ / apothem - anchor.normalZ) < 1e-6)
    const localX = anchor.x - island.position.x
    const localZ = anchor.z - island.position.z
    assert.ok(Math.abs(Math.hypot(localX, localZ) - (apothem + SHORELINE_INNER_CLEARANCE)) < 1e-6)
    assert.ok(Number.isFinite(anchor.x) && Number.isFinite(anchor.z))
  }
  decagon.dispose()
})

test('dynamic mesh has fixed 400-vertex/320-triangle capacity with no full ring', () => {
  const scene = new THREE.Scene()
  const foam = createShorelineFoam(scene, [island])
  assert.equal(foam.mesh.geometry.getAttribute('position').count, SHORELINE_FOAM_VERTEX_COUNT)
  assert.equal(foam.mesh.geometry.index?.count, SHORELINE_FOAM_TRIANGLE_COUNT * 3)
  foam.update(0, cachedPositions())
  const alpha = alphaValues(foam.mesh)
  assert.ok(alpha.some((value) => value > 0))
  assert.ok(alpha.some((value) => value === 0))
  assert.ok(alpha.every((value) => value >= 0 && value <= 0.600001))
  foam.dispose()
})

test('strips use cached water height and preserve face clearance and corner gaps', () => {
  const scene = new THREE.Scene()
  const foam = createShorelineFoam(scene, [island])
  const cached = cachedPositions(0.9)
  foam.update(0, cached)
  const positions = foam.mesh.geometry.getAttribute('position').array as Float32Array
  const alpha = alphaValues(foam.mesh)
  const radius = island.landCollisionRadius * SHORELINE_FOOTPRINT_FACTOR
  const apothem = radius * Math.cos(Math.PI / 10)
  let visible = 0
  for (let index = 0; index < SHORELINE_FOAM_VERTICES_PER_ISLAND; index += 1) {
    const x = positions[index * 3]
    const y = positions[index * 3 + 1]
    const z = positions[index * 3 + 2]
    assert.ok(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z))
    assert.ok(Math.abs(y - 0.94) < 1e-5)
    const anchor = getShorelineFoamAnchor(island, Math.floor(index / 10))
    const dx = x - island.position.x
    const dz = z - island.position.z
    const normalDistance = dx * anchor.normalX + dz * anchor.normalZ - apothem
    const tangentDistance = Math.abs(dx * anchor.tangentX + dz * anchor.tangentZ)
    assert.ok(normalDistance >= SHORELINE_INNER_CLEARANCE - 1e-5)
    assert.ok(normalDistance <= SHORELINE_INNER_CLEARANCE + 1.1 + 1e-5)
    assert.ok(tangentDistance <= radius * Math.sin(Math.PI / 10) - 0.18 + 1e-5)
    if (alpha[index] > 0) visible += 1
  }
  assert.ok(visible > 0)
  foam.dispose()
})

test('windward incidence activates while opposite faces remain silent', () => {
  const scene = new THREE.Scene()
  const foam = createShorelineFoam(scene, [island])
  foam.update(0, cachedPositions())
  const alpha = alphaValues(foam.mesh)
  const directionLength = Math.hypot(PRIMARY_WAVE.directionX, PRIMARY_WAVE.directionZ)
  let windward = 0
  let leeward = 0
  for (let face = 0; face < 10; face += 1) {
    const theta = (face + 0.5) * Math.PI * 2 / 10
    const incidence = (PRIMARY_WAVE.directionX * Math.sin(theta) + PRIMARY_WAVE.directionZ * Math.cos(theta)) / directionLength
    const faceAlpha = Math.max(...alpha.slice(face * 10, face * 10 + 10))
    if (incidence > 0.2) windward = Math.max(windward, faceAlpha)
    if (incidence <= 0) leeward = Math.max(leeward, faceAlpha)
  }
  assert.ok(windward > 0)
  assert.equal(leeward, 0)
  foam.dispose()
})

test('reduced motion hides alpha, reset returns to time zero, and buffers are reused', () => {
  const scene = new THREE.Scene()
  const foam = createShorelineFoam(scene, [island])
  const positionAttribute = foam.mesh.geometry.getAttribute('position')
  const alphaAttribute = foam.mesh.geometry.getAttribute('aAlpha')
  const cached = cachedPositions()
  foam.update(3, cached)
  foam.setReducedMotion(true)
  assert.ok(alphaValues(foam.mesh).every((value) => value === 0))
  foam.update(300, cached)
  assert.ok(alphaValues(foam.mesh).every((value) => value === 0))
  foam.setReducedMotion(false)
  foam.reset()
  foam.update(0, cached)
  const reset = new Float32Array(positionAttribute.array as Float32Array)
  foam.update(3, cached)
  foam.reset()
  foam.update(0, cached)
  assert.deepEqual(Array.from(positionAttribute.array as Float32Array), Array.from(reset))
  assert.strictEqual(foam.mesh.geometry.getAttribute('position'), positionAttribute)
  assert.strictEqual(foam.mesh.geometry.getAttribute('aAlpha'), alphaAttribute)
  foam.dispose()
  assert.equal(scene.getObjectByName('phase-fifteen-shoreline-foam'), undefined)
})


test('pure contact handles height, incoming velocity, storm gain and invalid samples', () => {
  const nx = PRIMARY_WAVE.directionX / Math.hypot(PRIMARY_WAVE.directionX, PRIMARY_WAVE.directionZ)
  const nz = PRIMARY_WAVE.directionZ / Math.hypot(PRIMARY_WAVE.directionX, PRIMARY_WAVE.directionZ)
  const calm = getShorelineFoamIntensity(nx, nz, 0.3, 0)
  assert.ok(calm > 0 && calm < 1)
  assert.ok(getShorelineFoamIntensity(nx, nz, 0.3, 1) > calm)
  assert.ok(getShorelineFoamIntensity(nx, nz, 0.3, 0, 1) > calm)
  assert.equal(getShorelineFoamIntensity(-nx, -nz, 2, 1, 1), 0)
  assert.equal(getShorelineFoamIntensity(nx, nz, -2.52, 1, 1), 0)
  for (const height of [-1e30, -2.52, 0, 2.52, 1e30, NaN, Infinity, -Infinity]) {
    for (const velocity of [-1e30, 0, 1e30, NaN, Infinity]) {
      const intensity = getShorelineFoamIntensity(nx, nz, height, velocity, Infinity)
      assert.ok(Number.isFinite(intensity) && intensity >= 0 && intensity <= 1)
      if (!Number.isFinite(height)) assert.equal(intensity, 0)
    }
  }
})

test('dock face and leeward shore stay silent through crest cycles', () => {
  const foam = createShorelineFoam(new THREE.Scene(), [island])
  let smallest = Infinity
  let largest = 0
  for (let time = 0; time <= 18; time += 0.25) {
    foam.update(time)
    const alphas = alphaValues(foam.mesh)
    const dockFace = 1 // actual decagon normal 54 degrees, nearest the +X/+Z dock
    assert.ok(alphas.slice(dockFace * 10, dockFace * 10 + 10).every(value => value === 0))
    const total = alphas.reduce((sum, value) => sum + value, 0)
    smallest = Math.min(smallest, total)
    largest = Math.max(largest, total)
    for (let face = 0; face < 10; face += 1) {
      const anchor = getShorelineFoamAnchor(island, face)
      if (PRIMARY_WAVE.directionX * anchor.normalX + PRIMARY_WAVE.directionZ * anchor.normalZ <= 0) {
        assert.ok(alphas.slice(face * 10, face * 10 + 10).every(value => value === 0))
      }
    }
  }
  assert.ok(largest > 0.5 && largest - smallest > 0.5, 'contact varies with the shared crests')
  assert.equal(foam.mesh.material.depthTest, true)
  assert.equal(foam.mesh.material.depthWrite, false)
  foam.dispose()
})

test('cached and analytic facet samples agree at every foam vertex', () => {
  const foam = createShorelineFoam(new THREE.Scene(), portfolioIslands)
  const axis = createWaterSurfaceAxis()
  const cached = cachedPositions(0)
  const time = 4.25
  for (let row = 0; row < axis.length; row += 1) {
    for (let column = 0; column < axis.length; column += 1) {
      cached[(row * axis.length + column) * 3 + 1] = sampleWaterHeight(axis[column], axis[row], time)
    }
  }
  foam.update(time)
  const analyticPositions = new Float32Array(foam.mesh.geometry.getAttribute('position').array)
  const analyticAlpha = new Float32Array(alphaValues(foam.mesh))
  foam.update(time, cached)
  const positions = foam.mesh.geometry.getAttribute('position')
  for (let vertex = 0; vertex < positions.count; vertex += 1) {
    const x = positions.getX(vertex), y = positions.getY(vertex), z = positions.getZ(vertex)
    assert.ok(Math.abs(y - sampleRenderedWaterHeight(x, z, cached) - 0.04) < 1e-5)
    assert.ok(Math.abs(y - analyticPositions[vertex * 3 + 1]) < 1e-5)
    assert.ok(Math.abs(alphaValues(foam.mesh)[vertex] - analyticAlpha[vertex]) < 1e-5)
  }
  foam.dispose()
})

test('shared elapsed time gives identical 30/60/120 Hz, frozen and resumed output', () => {
  const snapshots = []
  for (const hz of [30, 60, 120]) {
    const foam = createShorelineFoam(new THREE.Scene(), portfolioIslands)
    for (let frame = 0; frame <= hz * 2; frame += 1) foam.update(frame / hz)
    const positions = foam.mesh.geometry.getAttribute('position')
    const frozen = Array.from(positions.array)
    const frozenAlpha = Array.from(alphaValues(foam.mesh))
    for (let pausedFrame = 0; pausedFrame < 20; pausedFrame += 1) foam.update(2)
    assert.deepEqual(Array.from(positions.array), frozen)
    assert.deepEqual(Array.from(alphaValues(foam.mesh)), frozenAlpha)
    // Hidden/paused wall time is deliberately absent from the shared clock.
    foam.update(2 + 1 / 120)
    snapshots.push([Array.from(positions.array), Array.from(alphaValues(foam.mesh))])
    foam.dispose()
  }
  assert.deepEqual(snapshots[0], snapshots[1])
  assert.deepEqual(snapshots[1], snapshots[2])
})

test('invalid time and rendered caches keep fixed buffers finite and bounded', () => {
  const foam = createShorelineFoam(new THREE.Scene(), portfolioIslands)
  const positionAttribute = foam.mesh.geometry.getAttribute('position')
  const alphaAttribute = foam.mesh.geometry.getAttribute('aAlpha')
  for (const time of [NaN, Infinity, -Infinity, 0, 10000]) {
    for (const cached of [new Float32Array(0), cachedPositions(NaN), cachedPositions(Infinity), cachedPositions(1e30)]) {
      foam.update(time, cached)
      assert.ok(Array.from(positionAttribute.array).every(Number.isFinite))
      assert.ok(Array.from(alphaAttribute.array).every(value => Number.isFinite(value) && value >= 0 && value <= 0.600001))
      for (let vertex = 0; vertex < positionAttribute.count; vertex += 1) {
        assert.ok(Math.abs(positionAttribute.getY(vertex)) <= MAX_WAVE_HEIGHT * STORM_TUNING.maxWaveScale + 0.040001)
      }
    }
  }
  assert.strictEqual(foam.mesh.geometry.getAttribute('position'), positionAttribute)
  assert.strictEqual(foam.mesh.geometry.getAttribute('aAlpha'), alphaAttribute)
  foam.dispose()
})

test('empty and reduced-motion shorelines hide without sampling; disposal is idempotent', () => {
  const scene = new THREE.Scene()
  for (const islands of [[], [island], portfolioIslands]) {
    const foam = createShorelineFoam(scene, islands)
    const geometry = foam.mesh.geometry
    const material = foam.mesh.material
    let geometryDisposals = 0, materialDisposals = 0
    geometry.addEventListener('dispose', () => geometryDisposals += 1)
    material.addEventListener('dispose', () => materialDisposals += 1)
    foam.setReducedMotion(true)
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute
    const version = positions.version
    foam.update(50, new Proxy({ length: 0 }, { get() { throw new Error('hidden foam must not read water') } }))
    foam.reset()
    assert.equal(positions.version, version)
    assert.equal(foam.mesh.visible, false)
    assert.ok(alphaValues(foam.mesh).every(value => value === 0))
    foam.setReducedMotion(false)
    assert.equal(foam.mesh.visible, islands.length > 0)
    if (islands.length === 0) assert.ok(alphaValues(foam.mesh).every(value => value === 0))
    foam.dispose()
    const finalVersion = positions.version
    foam.dispose()
    foam.update(2)
    foam.reset()
    foam.setReducedMotion(true)
    assert.equal(positions.version, finalVersion)
    assert.equal(geometryDisposals, 1)
    assert.equal(materialDisposals, 1)
  }
  assert.equal(scene.children.length, 0)
})


test('all four shoreline slots follow exact faces with only Shipyard dock masked', () => {
  const scene = new THREE.Scene()
  const foam = createShorelineFoam(scene, portfolioIslands)
  assert.equal(scene.children.length, 1)
  assert.equal(foam.mesh.geometry.getAttribute('position').count, 400)
  assert.equal(foam.mesh.geometry.index?.count, 320 * 3)
  assert.ok(foam.mesh.geometry.index?.array instanceof Uint16Array)
  const cached = cachedPositions(0.9)
  for (const time of [0, 4, 12, 23]) {
    foam.update(time, cached)
    const positions = foam.mesh.geometry.getAttribute('position')
    const alphas = alphaValues(foam.mesh)
    for (const [islandIndex, island] of portfolioIslands.entries()) {
      const radius = island.landCollisionRadius * SHORELINE_FOOTPRINT_FACTOR
      const apothem = radius * Math.cos(Math.PI / 10)
      const decagon = new THREE.CylinderGeometry(radius, radius, 1, 10)
      const corners = decagon.getAttribute('position')
      let visibleFaces = 0
      for (let face = 0; face < 10; face += 1) {
        const midX = (corners.getX(face) + corners.getX(face + 1)) * 0.5
        const midZ = (corners.getZ(face) + corners.getZ(face + 1)) * 0.5
        const normalLength = Math.hypot(midX, midZ)
        const nx = midX / normalLength, nz = midZ / normalLength
        const base = islandIndex * SHORELINE_FOAM_VERTICES_PER_ISLAND + face * 10
        const faceAlpha = alphas.slice(base, base + 10)
        if (faceAlpha.some(value => value > 0)) visibleFaces += 1
        const incoming = PRIMARY_WAVE.directionX * nx + PRIMARY_WAVE.directionZ * nz
        if (incoming <= 0 || (island.id === 'island-projects' && face === 1)) {
          assert.ok(faceAlpha.every(value => value === 0))
        } else {
          assert.ok(faceAlpha.some(value => value > 0), `${island.id} windward face ${face} active`)
        }
        for (let sample = 0; sample < 10; sample += 1) {
          const vertex = base + sample
          const x = positions.getX(vertex) - island.position.x
          const z = positions.getZ(vertex) - island.position.z
          const clearance = x * nx + z * nz - apothem
          const along = Math.abs(x * nz - z * nx)
          assert.ok(clearance >= SHORELINE_INNER_CLEARANCE - 1e-5)
          assert.ok(along <= radius * Math.sin(Math.PI / 10) - 0.18 + 1e-5)
          assert.ok(Math.abs(positions.getY(vertex) - 0.94) < 1e-5)
        }
      }
      assert.ok(visibleFaces > 0 && visibleFaces <= 5, 'sparse windward accents, never a full ring')
      decagon.dispose()
    }
  }
  // The index buffer never connects different island slots.
  const index = foam.mesh.geometry.index!
  for (let triangle = 0; triangle < index.count / 3; triangle += 1) {
    const slot = Math.floor(triangle / SHORELINE_FOAM_TRIANGLES_PER_ISLAND)
    for (let corner = 0; corner < 3; corner += 1) {
      assert.equal(Math.floor(index.getX(triangle * 3 + corner) / SHORELINE_FOAM_VERTICES_PER_ISLAND), slot)
    }
  }
  foam.dispose()
})

test('aggregate slots match independent islands and keep inactive capacity quiet', () => {
  const aggregate = createShorelineFoam(new THREE.Scene(), portfolioIslands)
  const cached = cachedPositions()
  aggregate.update(4.25, cached)
  const positions = aggregate.mesh.geometry.getAttribute('position')
  const alphas = alphaValues(aggregate.mesh)
  for (const [slot, island] of portfolioIslands.entries()) {
    const single = createShorelineFoam(new THREE.Scene(), [island])
    single.update(4.25, cached)
    assert.deepEqual(
      Array.from(single.mesh.geometry.getAttribute('position').array).slice(0, SHORELINE_FOAM_VERTICES_PER_ISLAND * 3),
      Array.from(positions.array).slice(slot * SHORELINE_FOAM_VERTICES_PER_ISLAND * 3, (slot + 1) * SHORELINE_FOAM_VERTICES_PER_ISLAND * 3),
    )
    assert.deepEqual(
      Array.from(alphaValues(single.mesh)).slice(0, SHORELINE_FOAM_VERTICES_PER_ISLAND),
      Array.from(alphas).slice(slot * SHORELINE_FOAM_VERTICES_PER_ISLAND, (slot + 1) * SHORELINE_FOAM_VERTICES_PER_ISLAND),
    )
    assert.ok(alphaValues(single.mesh).slice(SHORELINE_FOAM_VERTICES_PER_ISLAND).every(value => value === 0))
    single.dispose()
  }
  aggregate.dispose()
})
