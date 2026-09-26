import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import { createWindFlags } from '../src/world/effects/createWindFlags.ts'

const state = (velocityX = 0, velocityZ = 0) => ({ x: 0, z: 0, velocityX, velocityZ, heading: 0, yawRate: 0 })

function tip(scene: THREE.Scene, name: string): THREE.Vector3 {
  const mesh = scene.getObjectByName(name) as THREE.Mesh
  assert.ok(mesh)
  const attribute = mesh.geometry.getAttribute('position') as THREE.BufferAttribute
  return new THREE.Vector3(attribute.getX(attribute.count - 2), attribute.getY(attribute.count - 2), attribute.getZ(attribute.count - 2))
}

test('land flags trail true wind while boat flags use apparent wind', () => {
  const scene = new THREE.Scene()
  const vessel = new THREE.Group()
  scene.add(vessel)
  const flags = createWindFlags(scene, vessel, [{ x: 0, y: 0, z: 0 }])
  flags.update(state(0, 0), 0, 1 / 60)
  const landTip = tip(scene, 'wind-flag-land-0')
  const boatTip = tip(scene, 'wind-flag-vessel-masthead')
  assert.ok(landTip.x < -1.5, 'true wind travels toward negative X')
  assert.ok(boatTip.x < -1, 'stationary apparent wind matches true wind')
  flags.update(state(-20, 0), 0, 1 / 60)
  assert.ok(tip(scene, 'wind-flag-vessel-masthead').x > 1, 'opposing velocity reverses apparent direction')
  flags.dispose()
})

test('boat masthead follows arbitrary vessel transform and remains finite', () => {
  const scene = new THREE.Scene()
  const vessel = new THREE.Group()
  vessel.position.set(4, 2, -3)
  vessel.rotation.set(0.31, 0.72, -0.22, 'YXZ')
  scene.add(vessel)
  const flags = createWindFlags(scene, vessel, [])
  flags.update(state(), 0, 1 / 60)
  const actual = new THREE.Vector3(0, 5.87, -0.34)
  vessel.localToWorld(actual)
  const position = (scene.getObjectByName('wind-flag-vessel-masthead') as THREE.Mesh).geometry.getAttribute('position') as THREE.BufferAttribute
  const baseMidpoint = new THREE.Vector3(
    (position.getX(0) + position.getX(1)) * 0.5,
    (position.getY(0) + position.getY(1)) * 0.5,
    (position.getZ(0) + position.getZ(1)) * 0.5,
  )
  assert.ok(baseMidpoint.distanceTo(actual) < 1e-5)
  for (let i = 0; i < position.count * 3; i += 1) assert.ok(Number.isFinite(position.array[i]))
  flags.dispose()
})

test('reduced motion freezes flutter while preserving direction and resources stay bounded', () => {
  const scene = new THREE.Scene()
  const vessel = new THREE.Group()
  const flags = createWindFlags(scene, vessel, [{ x: 1, y: 2, z: 3 }])
  flags.setReducedMotion(true)
  flags.update(state(), 0, 0)
  const mesh = scene.getObjectByName('wind-flag-land-0') as THREE.Mesh
  const first = Array.from((mesh.geometry.getAttribute('position') as THREE.BufferAttribute).array)
  flags.update(state(), 99, 2)
  const second = Array.from((mesh.geometry.getAttribute('position') as THREE.BufferAttribute).array)
  assert.deepEqual(second, first)
  flags.reset()
  assert.equal(scene.getObjectByName('wind-flag-land-0') !== undefined, true)
  flags.dispose()
  assert.equal(scene.getObjectByName('wind-flag-land-0'), undefined)
  assert.equal(scene.getObjectByName('wind-flag-land-mast-0'), undefined)
})

test('shared time is partition independent and zero apparent wind retains direction', () => {
  const scene = new THREE.Scene(), repeatScene = new THREE.Scene()
  const vessel = new THREE.Group(), repeatVessel = new THREE.Group()
  const a = createWindFlags(scene, vessel, []), b = createWindFlags(repeatScene, repeatVessel, [])
  for (let frame = 1; frame <= 60; frame++) a.update(state(0, 4), frame / 60, 1 / 60)
  b.update(state(0, 4), 1, 0.1)
  const positions = (s: THREE.Scene) => Array.from((s.getObjectByName('wind-flag-vessel-masthead') as THREE.Mesh).geometry.getAttribute('position').array)
  assert.deepEqual(positions(scene), positions(repeatScene))
  const previous = tip(scene, 'wind-flag-vessel-masthead')
  a.update(state(-9, 0), 1, 0)
  assert.ok(tip(scene, 'wind-flag-vessel-masthead').distanceTo(previous) < 1e-5)
  a.setReducedMotion(true)
  const immediate = positions(scene)
  assert.notDeepEqual(immediate, positions(repeatScene), 'reduced motion must remove flutter immediately, even when paused')
  a.update(state(-9, 0), 8, 0.1)
  assert.deepEqual(positions(scene), immediate)
  a.dispose(); b.dispose()
})

test('flag disposal releases owned resources once and preserves the vessel owner', () => {
  const scene = new THREE.Scene(), vessel = new THREE.Group()
  scene.add(vessel)
  const flags = createWindFlags(scene, vessel, [{x:0,y:2,z:0}])
  const counts: number[] = []
  scene.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return
    for (const resource of [object.geometry, object.material as THREE.Material]) {
      const index = counts.length; counts.push(0)
      resource.addEventListener('dispose', () => counts[index]++)
    }
  })
  flags.dispose(); flags.dispose(); flags.setReducedMotion(true); flags.reset()
  assert.ok(counts.length > 0 && counts.every(count => count === 1))
  assert.equal(vessel.parent, scene)
  assert.equal(scene.children.length, 1)
})
