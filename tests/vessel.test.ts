import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createVesselState,
  stepVessel,
  VESSEL_TUNING,
  type VesselEnvironment,
  type VesselInput,
  type VesselState,
} from '../src/world/vessel/kinematics.ts'

const EMPTY_WATER: VesselEnvironment = { worldLimit: 180, obstacles: [] }
const FORWARD: VesselInput = { throttle: 1, rudder: 0, brake: false }
const NEUTRAL: VesselInput = { throttle: 0, rudder: 0, brake: false }

function advance(
  state: VesselState,
  input: VesselInput,
  seconds: number,
  frameSeconds = 1 / 120,
  environment = EMPTY_WATER,
): VesselState {
  let next = state
  for (let elapsed = 0; elapsed < seconds - 1e-12; elapsed += frameSeconds) {
    next = stepVessel(next, input, Math.min(frameSeconds, seconds - elapsed), environment)
  }
  return next
}

function speed(state: VesselState): number {
  return Math.hypot(state.velocityX, state.velocityZ)
}

function forwardSpeed(state: VesselState): number {
  return state.velocityX * Math.sin(state.heading) + state.velocityZ * Math.cos(state.heading)
}

function assertFiniteState(state: VesselState): void {
  for (const value of Object.values(state)) assert.ok(Number.isFinite(value), `non-finite state value ${value}`)
}

test('createVesselState is stationary, forward-facing, and supports a spawn point', () => {
  assert.deepEqual(createVesselState(), { x: 0, z: 0, velocityX: 0, velocityZ: 0, heading: 0, yawRate: 0 })
  assert.equal(createVesselState(-3, 8).x, -3)
  assert.equal(createVesselState(-3, 8).z, 8)
  assert.equal(VESSEL_TUNING.length, 5.2)
  assert.equal(VESSEL_TUNING.width, 2.6)
  assert.equal(VESSEL_TUNING.height, 1.2)
  assert.ok(VESSEL_TUNING.collisionRadius > Math.hypot(VESSEL_TUNING.length / 2, VESSEL_TUNING.width / 2))
})

test('released throttle coasts while anisotropic drag reduces lateral slip faster', () => {
  const forward = advance(createVesselState(), FORWARD, 2)
  const released = advance(forward, NEUTRAL, 1)
  assert.ok(forwardSpeed(forward) > 5)
  assert.ok(forwardSpeed(released) < forwardSpeed(forward))

  const sliding: VesselState = { ...createVesselState(), velocityX: 5, velocityZ: 0 }
  const damped = stepVessel(sliding, NEUTRAL, 1, EMPTY_WATER)
  assert.ok(Math.abs(damped.velocityX) < 5)
  assert.equal(damped.velocityZ, 0)
})

test('braking stops a moving vessel faster than coasting', () => {
  const moving = advance(createVesselState(), FORWARD, 1.5)
  const coasted = advance(moving, NEUTRAL, 0.6)
  const braked = advance(moving, { throttle: 0, rudder: 0, brake: true }, 0.6)
  assert.ok(speed(braked) < speed(coasted) * 0.35)
})

test('reverse throttle moves along -Z and starboard rudder reverses yaw response', () => {
  const reverse = advance(createVesselState(), { throttle: -1, rudder: 0, brake: false }, 1.5)
  assert.ok(reverse.z < -1)
  assert.ok(forwardSpeed(reverse) < 0)

  const reverseRight = advance(createVesselState(), { throttle: -1, rudder: 1, brake: false }, 1.5)
  assert.ok(reverseRight.heading > 0)
})

test('rudder signs are starboard-negative and port-positive while moving ahead', () => {
  const right = advance(createVesselState(), { throttle: 1, rudder: 1, brake: false }, 1.5)
  const left = advance(createVesselState(), { throttle: 1, rudder: -1, brake: false }, 1.5)
  assert.ok(right.heading < 0)
  assert.ok(left.heading > 0)
  assert.ok(right.x < 0, 'starboard turn should curve toward -X from +Z')
  assert.ok(left.x > 0, 'port turn should curve toward +X from +Z')
})

test('long, invalid, and extreme frames stay finite, bounded, and immutable', () => {
  const original = createVesselState()
  const longFrame = stepVessel(original, FORWARD, 100, EMPTY_WATER)
  assertFiniteState(longFrame)
  assert.ok(Math.abs(longFrame.x) <= EMPTY_WATER.worldLimit - VESSEL_TUNING.collisionRadius)
  assert.ok(Math.abs(longFrame.z) <= EMPTY_WATER.worldLimit - VESSEL_TUNING.collisionRadius)
  assert.deepEqual(original, createVesselState())

  const invalid = stepVessel(
    { x: Number.NaN, z: Number.POSITIVE_INFINITY, velocityX: Number.NaN, velocityZ: Number.NEGATIVE_INFINITY, heading: Number.NaN, yawRate: Number.NaN },
    { throttle: Number.NaN, rudder: Number.POSITIVE_INFINITY, brake: false },
    Number.NaN,
    { worldLimit: Number.NaN, obstacles: [] },
  )
  assertFiniteState(invalid)
})

test('obstacle collision pushes the hull clear and removes inward velocity', () => {
  const environment: VesselEnvironment = {
    worldLimit: 180,
    obstacles: [{ x: 0, z: 0, radius: 7 }],
  }
  const impact = stepVessel(
    { ...createVesselState(), x: 0, z: 11, velocityX: 0, velocityZ: -12 },
    NEUTRAL,
    0.2,
    environment,
  )
  const distance = Math.hypot(impact.x, impact.z)
  assert.ok(distance >= 7 + VESSEL_TUNING.collisionRadius - 1e-9)
  assert.ok(impact.velocityZ >= -1e-9)
})

test('world edge clamps the center using the full collision radius', () => {
  const environment = { worldLimit: 10, obstacles: [] }
  const state = stepVessel({ ...createVesselState(0, 6.7), velocityZ: 4 }, NEUTRAL, 0.2, environment)
  assert.equal(state.z, 10 - VESSEL_TUNING.collisionRadius)
  assert.equal(state.velocityZ, 0)
})

test('fixed substeps keep 60Hz and 120Hz movement close', () => {
  const at60 = advance(createVesselState(), { throttle: 1, rudder: 0.35, brake: false }, 3, 1 / 60)
  const at120 = advance(createVesselState(), { throttle: 1, rudder: 0.35, brake: false }, 3, 1 / 120)
  assert.ok(Math.hypot(at60.x - at120.x, at60.z - at120.z) < 0.04)
  assert.ok(Math.abs(at60.heading - at120.heading) < 0.01)
})

test('zero and all-control inputs remain finite and bounded', () => {
  const allControls = advance(createVesselState(), { throttle: 1, rudder: 1, brake: true }, 4)
  const zeroControls = advance(createVesselState(), { throttle: 0, rudder: 0, brake: false }, 4)
  assertFiniteState(allControls)
  assertFiniteState(zeroControls)
  assert.ok(speed(allControls) <= Math.hypot(VESSEL_TUNING.maxForwardSpeed, VESSEL_TUNING.maxLateralSpeed))
  assert.deepEqual(zeroControls, createVesselState())
})
