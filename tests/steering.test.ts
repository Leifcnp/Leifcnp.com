import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createVesselState,
  stepVessel,
  VESSEL_TUNING,
  type VesselEnvironment,
} from '../src/world/vessel/kinematics.ts'
import { SAIL_TUNING } from '../src/world/vessel/sailResponse.ts'

const SAILING: VesselEnvironment = { worldLimit: 220, obstacles: [], sailingEnabled: true }
const MOTOR: VesselEnvironment = { worldLimit: 180, obstacles: [] }

function run(seconds: number, frame: number, environment: VesselEnvironment, input: { throttle: number; rudder: number; brake: boolean; sailAngle?: number }, state = createVesselState()) {
  let next = state
  for (let elapsed = 0; elapsed < seconds - 1e-12; elapsed += frame) {
    next = stepVessel(next, input, Math.min(frame, seconds - elapsed), environment, elapsed)
  }
  return next
}

test('sailing helm is tighter but bounded, smooth, and gradual from rest', () => {
  const first = stepVessel(createVesselState(), { throttle: 0, rudder: 1, brake: false, sailAngle: Math.PI / 4 }, 1 / 120, SAILING)
  const turned = run(6, 1 / 60, SAILING, { throttle: 0, rudder: 1, brake: false, sailAngle: Math.PI / 4 })
  assert.ok(Math.abs(first.yawRate) < 0.1, 'first frame must not instant-spin')
  assert.ok(Math.abs(turned.yawRate) <= SAIL_TUNING.sailingMaxYawRate)
  assert.ok(Math.abs(turned.heading) > Math.PI / 2)
  assert.ok(Math.abs(turned.heading) < Math.PI * 2)
})

test('sailing 90/180 degree response improves at low and cruising speeds', () => {
  for (const speed of [0.6, 8]) {
    const state = { ...createVesselState(), velocityZ: speed }
    const turned = run(6, 1 / 60, SAILING, { throttle: 0, rudder: 1, brake: false, sailAngle: Math.PI / 4 }, state)
    assert.ok(Math.abs(turned.heading) > Math.PI / 2)
    assert.ok(Math.abs(turned.yawRate) <= SAIL_TUNING.sailingMaxYawRate)
  }
})

test('rapid rudder reversal converges without a yaw spike and release settles', () => {
  let state = createVesselState()
  let maximum = 0
  for (let index = 0; index < 240; index += 1) {
    const rudder = index < 90 ? 1 : index < 150 ? -1 : 0
    state = stepVessel(state, { throttle: 0, rudder, brake: false, sailAngle: Math.PI / 4 }, 1 / 60, SAILING)
    maximum = Math.max(maximum, Math.abs(state.yawRate))
  }
  assert.ok(maximum <= SAIL_TUNING.sailingMaxYawRate + 1e-9)
  assert.ok(Math.abs(state.yawRate) < 0.1)
})

test('legacy motor yaw contract remains unchanged and frame partitions agree', () => {
  const input = { throttle: 1, rudder: 1, brake: false }
  const at30 = run(3, 1 / 30, MOTOR, input)
  const at60 = run(3, 1 / 60, MOTOR, input)
  const at120 = run(3, 1 / 120, MOTOR, input)
  assert.ok(Math.abs(at30.yawRate) <= VESSEL_TUNING.maxYawRate)
  assert.ok(Math.hypot(at30.x - at60.x, at30.z - at60.z) < 0.05)
  assert.ok(Math.hypot(at60.x - at120.x, at60.z - at120.z) < 0.05)
})

test('tight sailing turns remain finite and respect storm/obstacle bounds', () => {
  const environment: VesselEnvironment = {
    worldLimit: 220,
    stormEnabled: true,
    sailingEnabled: true,
    obstacles: [{ x: 0, z: 0, radius: 7 }],
  }
  const state = run(8, 1 / 60, environment, { throttle: 0, rudder: -1, brake: false, sailAngle: Math.PI / 4 }, { ...createVesselState(12, 0), velocityX: -2 })
  assert.ok(Number.isFinite(state.x) && Number.isFinite(state.z) && Number.isFinite(state.heading))
  assert.ok(Math.abs(state.x) <= environment.worldLimit - VESSEL_TUNING.collisionRadius)
  assert.ok(Math.abs(state.z) <= environment.worldLimit - VESSEL_TUNING.collisionRadius)
  assert.ok(Math.hypot(state.x, state.z) >= 7 + VESSEL_TUNING.collisionRadius - 1e-9)
})
