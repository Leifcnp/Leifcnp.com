import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import {
  createHullSpray,
} from '../src/world/effects/createHullSpray.ts'
import type { VesselContactPoint, VesselWaterContact } from '../src/world/vessel/hullContact.ts'
import { sampleFacetedWaterHeight } from '../src/world/waterSurfaceGrid.ts'

function point(x: number, z: number, clearance = 0.1, closingSpeed = 0.8, timeSeconds = 0): VesselContactPoint {
  const waterHeight = sampleFacetedWaterHeight(x, z, timeSeconds)
  return { x, y: waterHeight + clearance, z, waterHeight, clearance, closingSpeed }
}

function contact(overrides: Partial<VesselWaterContact> = {}, timeSeconds = 0): VesselWaterContact {
  return {
    bowPort: point(-0.5, 2.6, 0.1, 0.8, timeSeconds),
    bowStarboard: point(0.5, 2.6, 0.12, 0.7, timeSeconds),
    leewardRail: point(-1.3, 0, -0.05, 0.2, timeSeconds),
    leewardSide: 'port',
    heelLoad: 0.9,
    forwardSpeed: 8,
    sailPower: 0.9,
    relativeWindAngle: Math.PI / 2,
    ...overrides,
  }
}

function sprayMesh(scene: THREE.Scene): THREE.InstancedMesh {
  const mesh = scene.getObjectByName('phase-twelve-hull-spray')
  assert.ok(mesh instanceof THREE.InstancedMesh)
  return mesh
}

function activeMatrices(scene: THREE.Scene): number[][] {
  const mesh = sprayMesh(scene)
  const matrix = new THREE.Matrix4()
  const values: number[][] = []
  for (let index = 0; index < mesh.count; index += 1) {
    mesh.getMatrixAt(index, matrix)
    const scale = new THREE.Vector3()
    const position = new THREE.Vector3()
    const rotation = new THREE.Quaternion()
    matrix.decompose(position, rotation, scale)
    if (scale.lengthSq() > 1e-10) values.push([position.x, position.y, position.z, scale.x, scale.y, scale.z])
  }
  return values
}

test('bow and loaded leeward rail contact emit bounded pooled spray at transformed origins', () => {
  const scene = new THREE.Scene()
  const spray = createHullSpray(scene)
  spray.update(contact(), 0, 0.1)
  spray.update(contact(), 0, 1 / 60)
  const active = activeMatrices(scene)
  assert.ok(active.length >= 2, 'bow and rail contacts should each contribute a droplet')
  assert.ok(active.length <= 48)
  for (const matrix of active) assert.ok(matrix.every(Number.isFinite))
  assert.ok(active.some(([x, , z]) => x > -1.1 && x < 0.2 && z > 2))
  assert.ok(active.some(([x, , z]) => x < -0.8 && Math.abs(z) < 1))
  assert.equal(sprayMesh(scene).count, 48)
  spray.dispose()
})

test('idle, reverse, and non-closing contacts stay quiet', () => {
  const cases: VesselWaterContact[] = [
    contact({ forwardSpeed: 0 }),
    contact({ forwardSpeed: -3 }),
    contact({ bowPort: point(-0.5, 2.6, 0.1, 0), bowStarboard: point(0.5, 2.6, 0.1, 0), leewardRail: point(-1.3, 0, 0.5, 0) }),
    contact({ bowPort: point(-0.5, 2.6, 0.4, 0.8), bowStarboard: point(0.5, 2.6, 0.4, 0.8), leewardRail: point(-1.3, 0, 0.1, 0.2) }),
  ]
  for (const candidate of cases) {
    const scene = new THREE.Scene()
    const spray = createHullSpray(scene)
    for (let frame = 0; frame < 20; frame++) spray.update(candidate, frame / 60, 1 / 60)
    assert.equal(activeMatrices(scene).length, 0)
    spray.dispose()
  }
})

test('steady loaded submerged rail still emits wash without a new closing wave', () => {
  const scene = new THREE.Scene()
  const spray = createHullSpray(scene)
  const steady = contact({
    bowPort: point(-0.5, 2.6, 0.1, 0),
    bowStarboard: point(0.5, 2.6, 0.1, 0),
    leewardRail: point(-1.3, 0, -0.05, 0),
  })
  spray.update(steady, 0, 0.1)
  spray.update(steady, 0, 1 / 60)
  assert.ok(activeMatrices(scene).some(([, , z]) => Math.abs(z) < 1), 'steady rail contact should produce wash')
  spray.dispose()
})

test('reset and reduced motion clear the pool without wall-time catch-up', () => {
  const scene = new THREE.Scene()
  const spray = createHullSpray(scene)
  spray.update(contact(), 0, 0.1)
  spray.update(contact(), 0, 1 / 60)
  assert.ok(activeMatrices(scene).length > 0)
  spray.reset()
  assert.equal(activeMatrices(scene).length, 0)
  spray.setReducedMotion(true)
  spray.update(contact(), 100, 1)
  assert.equal(activeMatrices(scene).length, 0)
  spray.setReducedMotion(false)
  spray.update(contact(), 0, 0.1)
  spray.update(contact(), 0, 1 / 60)
  assert.ok(activeMatrices(scene).length > 0)
  spray.dispose()
})

test('emission is deterministic and mirrored rail origins remain on their supplied sides', () => {
  const leftScene = new THREE.Scene()
  const rightScene = new THREE.Scene()
  const repeatScene = new THREE.Scene()
  const left = createHullSpray(leftScene)
  const right = createHullSpray(rightScene)
  const repeat = createHullSpray(repeatScene)
  const leftContact = contact()
  const rightContact = contact({
    bowPort: point(-0.5, 2.6, 0.12, 0.7),
    bowStarboard: point(0.5, 2.6),
    leewardRail: point(1.3, 0, -0.05, 0.2),
    leewardSide: 'starboard',
  })
  left.update(leftContact, 3.5, 0.1)
  right.update(rightContact, 3.5, 0.1)
  repeat.update(leftContact, 3.5, 0.1)
  left.update(leftContact, 3.5 + 1 / 60, 1 / 60)
  right.update(rightContact, 3.5 + 1 / 60, 1 / 60)
  repeat.update(leftContact, 3.5 + 1 / 60, 1 / 60)
  assert.deepEqual(activeMatrices(leftScene), activeMatrices(repeatScene))
  const leftRail = activeMatrices(leftScene).find(([, , z]) => Math.abs(z) < 1)
  const rightRail = activeMatrices(rightScene).find(([, , z]) => Math.abs(z) < 1)
  assert.ok(leftRail && rightRail)
  assert.ok(leftRail[0] < 0)
  assert.ok(rightRail[0] > 0)
  left.dispose()
  right.dispose()
  repeat.dispose()
})

test('rotated world-space contacts keep bow spray ahead and rail wash outward', () => {
  const scene = new THREE.Scene()
  const spray = createHullSpray(scene)
  const rotated: VesselWaterContact = {
    bowPort: point(2.6, 0.5),
    bowStarboard: point(2.6, -0.5, 0.12, 0.7),
    leewardRail: point(0, 0, -0.05, 0.2),
    leewardSide: 'port',
    heelLoad: 0.9,
    forwardSpeed: 8,
    sailPower: 0.9,
    relativeWindAngle: Math.PI / 2,
  }
  spray.update(rotated, 0, 0.1)
  spray.update(rotated, 0, 1 / 60)
  const active = activeMatrices(scene)
  assert.ok(active.some(([x, , z]) => x > 2 && Math.abs(z) < 1), 'bow droplets follow supplied transformed bow points')
  assert.ok(active.some(([x, , z]) => x < 0.4 && z > 0), 'port rail wash follows supplied world-space outward side')
  spray.dispose()
})

test('fixed elapsed time keeps partitioned emission counts close', () => {
  const counts: number[] = []
  for (const frameSeconds of [1 / 30, 1 / 60, 1 / 120]) {
    const scene = new THREE.Scene()
    const spray = createHullSpray(scene)
    for (let elapsed = 0; elapsed < 1 - 1e-9; elapsed += frameSeconds) {
      spray.update(contact(), elapsed, Math.min(frameSeconds, 1 - elapsed))
    }
    counts.push(activeMatrices(scene).length)
    spray.dispose()
  }
  assert.ok(Math.max(...counts) - Math.min(...counts) <= 2, `partition counts ${counts.join(', ')}`)
})

test('spray reentry follows the moving visible water surface', () => {
  const scene = new THREE.Scene()
  const spray = createHullSpray(scene)
  spray.update(contact({}, 0), 0, 0.1)
  spray.update(contact({}, 0), 0, 1 / 60)
  assert.ok(activeMatrices(scene).length > 0)
  // At this point the authored faceted surface has risen substantially at
  // the launch coordinates. Keep the hull idle so no fresh droplets mask the
  // reentry result, then let the effect sample the current surface.
  spray.update(contact({ forwardSpeed: 0 }, 0.5), 0.5, 1 / 60)
  assert.equal(activeMatrices(scene).length, 0)
  spray.dispose()
})

test('pool reuse remains finite for long bounded contact sequences and disposal is idempotent', () => {
  const scene = new THREE.Scene()
  const spray = createHullSpray(scene)
  for (let frame = 0; frame < 1200; frame += 1) {
    spray.update(contact(), frame / 60, 1 / 60)
  }
  const mesh = sprayMesh(scene)
  const matrix = new THREE.Matrix4()
  const position = new THREE.Vector3()
  const rotation = new THREE.Quaternion()
  const scale = new THREE.Vector3()
  for (let index = 0; index < mesh.count; index += 1) {
    mesh.getMatrixAt(index, matrix)
    matrix.decompose(position, rotation, scale)
    assert.ok([position.x, position.y, position.z, scale.x, scale.y, scale.z].every(Number.isFinite))
  }
  spray.dispose()
  spray.dispose()
  assert.equal(scene.getObjectByName('phase-twelve-hull-spray'), undefined)
})
