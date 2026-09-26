import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'
import { createOceanSurface } from '../src/world/createOceanSurface.ts'
import { createWaterSurfaceAxis, OCEAN_SURFACE_TUNING, sampleFacetedWaterHeight } from '../src/world/waterSurfaceGrid.ts'
import { sampleWaterHeight } from '../src/world/waves.ts'

function triangleHeight(mesh: THREE.Mesh, x: number, z: number, time: number): number {
  const position = mesh.geometry.getAttribute('position')
  const index = mesh.geometry.getIndex()!
  const axis = createWaterSurfaceAxis()
  const row = axis.slice(0, -1).findIndex((value, i) => z >= value && z <= axis[i + 1])
  const column = axis.slice(0, -1).findIndex((value, i) => x >= value && x <= axis[i + 1])
  const side = axis.length
  const cell = row * (side - 1) + column
  const u = (x - axis[column]) / (axis[column + 1] - axis[column])
  const v = (z - axis[row]) / (axis[row + 1] - axis[row])
  const firstTriangle = (row + column) % 2 === 0 ? u + v <= 1 : v >= u
  const triangle = cell * 2 + (firstTriangle ? 0 : 1)
  const a = index.getX(triangle * 3); const b = index.getX(triangle * 3 + 1); const c = index.getX(triangle * 3 + 2)
  const pa = new THREE.Vector3().fromBufferAttribute(position, a); const pb = new THREE.Vector3().fromBufferAttribute(position, b); const pc = new THREE.Vector3().fromBufferAttribute(position, c)
  const denominator = (pb.z - pc.z) * (pa.x - pc.x) + (pc.x - pb.x) * (pa.z - pc.z)
  const wa = ((pb.z - pc.z) * (x - pc.x) + (pc.x - pb.x) * (z - pc.z)) / denominator
  const wb = ((pc.z - pa.z) * (x - pc.x) + (pa.x - pc.x) * (z - pc.z)) / denominator
  return wa * pa.y + wb * pb.y + (1 - wa - wb) * pc.y
}

test('shared axis preserves central and outer lattice spacing', () => {
  const axis = createWaterSurfaceAxis()
  assert.equal(axis[0], -360)
  assert.equal(axis.at(-1), 360)
  const central = axis.indexOf(-180)
  assert.equal(axis[central + 1] - axis[central], OCEAN_SURFACE_TUNING.centralStep)
  assert.equal(axis[central] - axis[central - 1], OCEAN_SURFACE_TUNING.outerStep)
})

test('faceted sampler matches actual rendered triangles in calm and storm cells', () => {
  const scene = new THREE.Scene(); const surface = createOceanSurface(scene)
  for (const time of [0, 12.75, 25.5]) {
    surface.update(time)
    for (const point of [[-179.2, -178.4], [-176.1, -172.7], [-185, 0], [185, 0], [359.1, -352.4]] as const) {
      const [x, z] = point
      assert.ok(Math.abs(sampleFacetedWaterHeight(x, z, time) - triangleHeight(surface.mesh, x, z, time)) < 1e-6)
    }
  }
  surface.dispose()
})

test('clamps non-finite and out-of-bounds coordinates to bounded water edges', () => {
  for (const time of [0, 25.5]) {
    assert.equal(sampleFacetedWaterHeight(-Infinity, 0, time), sampleFacetedWaterHeight(0, 0, time))
    assert.equal(sampleFacetedWaterHeight(Infinity, 0, time), sampleFacetedWaterHeight(0, 0, time))
    assert.equal(sampleFacetedWaterHeight(0, -Infinity, time), sampleFacetedWaterHeight(0, 0, time))
    assert.equal(sampleFacetedWaterHeight(0, Infinity, time), sampleFacetedWaterHeight(0, 0, time))
    assert.equal(sampleFacetedWaterHeight(-999, 999, time), sampleFacetedWaterHeight(-360, 360, time))
  }
})

test('selected cell edges and alternating diagonal boundaries remain finite', () => {
  const axis = createWaterSurfaceAxis()
  for (const row of [0, 1, 44, 89, axis.length - 3]) for (const column of [0, 1, 44, 89, axis.length - 3]) {
    const x0 = axis[column]; const x1 = axis[column + 1]; const z0 = axis[row]; const z1 = axis[row + 1]
    for (const [u, v] of [[0, 0], [1, 0], [0, 1], [1, 1], [0.5, 0.5], [0.01, 0.99], [0.99, 0.01]] as const) {
      const value = sampleFacetedWaterHeight(x0 + (x1 - x0) * u, z0 + (z1 - z0) * v, 12.4)
      assert.ok(Number.isFinite(value))
    }
    assert.ok(Number.isFinite(sampleWaterHeight(x0, z0, 12.4)))
  }
})
