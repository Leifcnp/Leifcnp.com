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
import {
  calculateWaveResponse,
  WAVE_RESPONSE_TUNING,
} from '../src/world/vessel/waveResponse.ts'

const EMPTY_WATER: VesselEnvironment = { worldLimit: 180, obstacles: [] }
const NEUTRAL: VesselInput = { throttle: 0, rudder: 0, brake: false }

function advance(
  initial: VesselState,
  input: VesselInput,
  seconds: number,
  frameSeconds: number,
): VesselState {
  let state = initial
  for (let elapsed = 0; elapsed < seconds - 1e-12; elapsed += frameSeconds) {
    const dt = Math.min(frameSeconds, seconds - elapsed)
    state = stepVessel(state, input, dt, EMPTY_WATER, elapsed)
  }
  return state
}

function speed(state: VesselState): number {
  return Math.hypot(state.velocityX, state.velocityZ)
}

test('wave response points downhill and respects local acceleration bounds', () => {
  const ahead = calculateWaveResponse({ slopeX: 0, slopeZ: 1 }, 0)
  assert.equal(ahead.surgeAcceleration, -WAVE_RESPONSE_TUNING.maxSurgeAcceleration)
  assert.ok(Math.abs(ahead.swayAcceleration) < 1e-12)

  const side = calculateWaveResponse({ slopeX: 1, slopeZ: 0 }, 0)
  assert.equal(side.swayAcceleration, -WAVE_RESPONSE_TUNING.maxSwayAcceleration)
  assert.ok(Math.abs(side.surgeAcceleration) < 1e-12)

  for (const heading of [-Math.PI, -1, 0, 1, Math.PI]) {
    const response = calculateWaveResponse({ slopeX: Number.MAX_VALUE, slopeZ: -Number.MAX_VALUE }, heading)
    assert.ok(Math.abs(response.surgeAcceleration) <= WAVE_RESPONSE_TUNING.maxSurgeAcceleration)
    assert.ok(Math.abs(response.swayAcceleration) <= WAVE_RESPONSE_TUNING.maxSwayAcceleration)
    assert.ok(Number.isFinite(response.accelerationX))
    assert.ok(Number.isFinite(response.accelerationZ))
  }
})

test('omitting wave time preserves the legacy kinematics exactly', () => {
  const state = { ...createVesselState(), velocityX: 2.5, velocityZ: -1.25, heading: 0.4 }
  const legacy = stepVessel(state, NEUTRAL, 0.2, EMPTY_WATER)
  const explicitInvalid = stepVessel(state, NEUTRAL, 0.2, EMPTY_WATER, Number.NaN)
  assert.deepEqual(explicitInvalid, legacy)
})

test('wave response is finite, bounded, and stable across frame partitions', () => {
  const initial = createVesselState(11, -23)
  const at60 = advance(initial, NEUTRAL, 3, 1 / 60)
  const at120 = advance(initial, NEUTRAL, 3, 1 / 120)
  for (const state of [at60, at120]) {
    for (const value of Object.values(state)) assert.ok(Number.isFinite(value))
    assert.ok(Math.abs(state.x) <= EMPTY_WATER.worldLimit - VESSEL_TUNING.collisionRadius)
    assert.ok(Math.abs(state.z) <= EMPTY_WATER.worldLimit - VESSEL_TUNING.collisionRadius)
    assert.ok(speed(state) <= Math.hypot(VESSEL_TUNING.maxForwardSpeed, VESSEL_TUNING.maxLateralSpeed))
  }
  assert.ok(Math.hypot(at60.x - at120.x, at60.z - at120.z) < 0.03)
  assert.ok(Math.abs(at60.heading - at120.heading) < 0.001)
})

test('long and invalid wave frames preserve finite collision-safe state', () => {
  const environment: VesselEnvironment = {
    worldLimit: 20,
    obstacles: [{ x: 0, z: 0, radius: 5 }],
  }
  const impact = stepVessel(
    { ...createVesselState(), x: 0, z: 10, velocityZ: -12 },
    NEUTRAL,
    100,
    environment,
    4,
  )
  assert.ok(Math.hypot(impact.x, impact.z) >= 5 + VESSEL_TUNING.collisionRadius - 1e-9)
  assert.ok(Math.abs(impact.x) <= environment.worldLimit - VESSEL_TUNING.collisionRadius)
  assert.ok(Math.abs(impact.z) <= environment.worldLimit - VESSEL_TUNING.collisionRadius)
  for (const value of Object.values(impact)) assert.ok(Number.isFinite(value))

  const invalid = stepVessel(createVesselState(), NEUTRAL, Number.NaN, EMPTY_WATER, Number.POSITIVE_INFINITY)
  assert.deepEqual(invalid, createVesselState())
})

test('manual braking remains stronger than a wave push', () => {
  const moving = advance(createVesselState(), { throttle: 1, rudder: 0, brake: false }, 1.5, 1 / 120)
  const coasting = advance(moving, NEUTRAL, 0.6, 1 / 120)
  const braking = advance(moving, { throttle: 0, rudder: 0, brake: true }, 0.6, 1 / 120)
  assert.ok(speed(braking) < speed(coasting) * 0.35)
})
