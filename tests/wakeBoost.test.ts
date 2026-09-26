import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import { createWake } from '../src/world/effects/createWake.ts'
import { createVesselState, type VesselState } from '../src/world/vessel/kinematics.ts'

const movingState = (): VesselState => ({
  ...createVesselState(),
  velocityZ: 8,
})

function maximumFoamScale(scene: THREE.Scene): number {
  const mesh = scene.getObjectByName('phase-five-wake-foam')
  assert.ok(mesh instanceof THREE.InstancedMesh)
  const matrix = new THREE.Matrix4()
  const position = new THREE.Vector3()
  const rotation = new THREE.Quaternion()
  const scale = new THREE.Vector3()
  let maximum = 0
  for (let index = 0; index < mesh.count; index += 1) {
    mesh.getMatrixAt(index, matrix)
    matrix.decompose(position, rotation, scale)
    maximum = Math.max(maximum, scale.x, scale.z)
  }
  return maximum
}

test('trim boost widens pooled stern foam while preserving a bounded resource count', () => {
  const ordinaryScene = new THREE.Scene()
  const ordinary = createWake(ordinaryScene)
  ordinary.setTrimBoost(0)
  ordinary.update(movingState(), 0, 0.2)
  ordinary.update(movingState(), 0.2, 0.1)
  const ordinaryScale = maximumFoamScale(ordinaryScene)

  const boostedScene = new THREE.Scene()
  const boosted = createWake(boostedScene)
  boosted.setTrimBoost(1)
  boosted.update(movingState(), 0, 0.2)
  boosted.update(movingState(), 0.2, 0.1)
  const boostedScale = maximumFoamScale(boostedScene)

  assert.ok(ordinaryScale > 0)
  assert.ok(boostedScale > ordinaryScale * 1.35, 'manual trim should be visible in stern foam')
  assert.equal(boostedScene.getObjectByName('phase-five-wake-foam')?.count, 96)
  assert.equal(boostedScene.getObjectByName('phase-five-wake-ribbon')?.name, 'phase-five-wake-ribbon')
  ordinary.dispose()
  boosted.dispose()
})

test('trim boost clamps invalid values and reduced motion clears transient foam', () => {
  const scene = new THREE.Scene()
  const wake = createWake(scene)
  const state = movingState()

  wake.setTrimBoost(0)
  wake.update(state, 0, 0.2)
  wake.update(state, 0.2, 0.1)
  const ordinaryScale = maximumFoamScale(scene)
  wake.reset()
  wake.setTrimBoost(4)
  wake.update(state, 0, 0.2)
  wake.update(state, 0.2, 0.1)
  const clampedScale = maximumFoamScale(scene)
  assert.ok(clampedScale > ordinaryScale * 1.35)
  wake.reset()
  wake.setTrimBoost(Number.NaN)
  wake.update(state, 1, 0.2)
  wake.update(state, 1.2, 0.1)
  assert.equal(maximumFoamScale(scene), ordinaryScale)
  wake.reset()
  wake.setTrimBoost(1)
  wake.setReducedMotion(true)
  wake.update(state, 1, 0.2)
  assert.equal(maximumFoamScale(scene), 0)
  wake.setReducedMotion(false)
  wake.setTrimBoost(0.8)
  wake.update(state, 2, 0.2)
  wake.update(state, 2.2, 0.1)
  assert.ok(maximumFoamScale(scene) > ordinaryScale)
  wake.dispose()
  wake.dispose()
})
