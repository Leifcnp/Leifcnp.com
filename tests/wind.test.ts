import assert from 'node:assert/strict'
import test from 'node:test'

import { calculateApparentWind, sampleWind } from '../src/world/wind.ts'
import { calculateSailResponse, SAIL_TUNING } from '../src/world/vessel/sailResponse.ts'
import { createVesselState, stepVessel, type VesselEnvironment } from '../src/world/vessel/kinematics.ts'

const SAILING: VesselEnvironment = { worldLimit: 220, obstacles: [], sailingEnabled: true }
const CALM: VesselEnvironment = { worldLimit: 220, obstacles: [] }

test('wind is stable, finite, and apparent wind subtracts vessel velocity', () => {
  assert.deepEqual(sampleWind(0), { x: -9, z: 0, speed: 9 })
  assert.deepEqual(sampleWind(123), sampleWind(0))
  assert.deepEqual(calculateApparentWind(sampleWind(), 2, -3), { x: -11, z: 3, speed: Math.hypot(11, 3) })
  const invalid = calculateApparentWind({ x: Number.NaN, z: Number.POSITIVE_INFINITY }, Number.NaN, Number.NEGATIVE_INFINITY)
  assert.ok(Object.values(invalid).every(Number.isFinite))
})

test('default eased sail stalls at the initial beam reach while trim powers it', () => {
  const state = createVesselState()
  const eased = calculateSailResponse(state)
  const trimmed = calculateSailResponse(state, Math.PI / 4)
  assert.equal(eased.power, 0)
  assert.ok(trimmed.power > 0.8)
  assert.ok(trimmed.driveAcceleration > eased.driveAcceleration)
  assert.ok(trimmed.suggestedAngle > SAIL_TUNING.minAngle)
})

test('head-to-wind has no drive, while mirrored reaches have finite opposite lift', () => {
  const headToWind = calculateSailResponse({ ...createVesselState(), heading: Math.PI / 2 }, Math.PI / 4)
  assert.equal(headToWind.noGo, true)
  assert.equal(headToWind.power, 0)
  const port = calculateSailResponse({ ...createVesselState(), heading: Math.PI / 4 }, Math.PI / 4)
  const starboard = calculateSailResponse({ ...createVesselState(), heading: 3 * Math.PI / 4 }, Math.PI / 4)
  assert.ok(port.power > 0)
  assert.ok(starboard.power > 0)
  assert.ok(port.lateralAcceleration * starboard.lateralAcceleration < 0)
  for (const value of Object.values(port)) {
    if (typeof value === 'number') assert.ok(Number.isFinite(value))
  }
})

test('sailing replaces motor thrust only when enabled and brake spills drive', () => {
  const state = createVesselState()
  const legacy = stepVessel(state, { throttle: 1, rudder: 0, brake: false }, 1, CALM)
  const sail = stepVessel(state, { throttle: 1, rudder: 0, brake: false, sailAngle: Math.PI / 4 }, 1, SAILING)
  const spilled = stepVessel(state, { throttle: 1, rudder: 0, brake: true, sailAngle: Math.PI / 4 }, 1, SAILING)
  assert.ok(legacy.velocityZ > 0)
  assert.ok(sail.velocityZ > 0)
  assert.ok(Math.hypot(spilled.velocityX, spilled.velocityZ) < Math.hypot(sail.velocityX, sail.velocityZ))
  assert.deepEqual(
    stepVessel(state, { throttle: 1, rudder: 0, brake: false }, 1, CALM),
    legacy,
  )
})

test('rudder can leave irons at bounded stall authority and sailing remains frame-stable', () => {
  const stalled = createVesselState()
  const turned = stepVessel(stalled, { throttle: 0, rudder: 1, brake: false }, 1, SAILING)
  assert.ok(Math.abs(turned.yawRate) <= SAIL_TUNING.stallYawRate + 1e-9)
  assert.ok(Math.abs(turned.heading) > 0)
  const run = (frame: number) => {
    let next = stalled
    for (let elapsed = 0; elapsed < 4 - 1e-12; elapsed += frame) {
      next = stepVessel(next, { throttle: 0, rudder: 0, brake: false, sailAngle: Math.PI / 4 }, Math.min(frame, 4 - elapsed), SAILING, elapsed)
    }
    return next
  }
  const at30 = run(1 / 30)
  const at60 = run(1 / 60)
  const at120 = run(1 / 120)
  assert.ok(Math.hypot(at30.x - at60.x, at30.z - at60.z) < 0.2)
  assert.ok(Math.hypot(at60.x - at120.x, at60.z - at120.z) < 0.2)
})

test('mirrored close reaches make symmetric net progress toward the wind', () => {
  const sail = { throttle: 0, rudder: 0, brake: false, sailAngle: Math.PI / 4 }
  const run = (heading: number) => {
    let state = { ...createVesselState(), heading }
    for (let elapsed = 0; elapsed < 30 - 1e-12; elapsed += 1 / 60) {
      state = stepVessel(state, sail, 1 / 60, SAILING, elapsed)
    }
    return state
  }
  const portTack = run(Math.PI / 4)
  const starboardTack = run(3 * Math.PI / 4)
  assert.ok(portTack.x > 20)
  assert.ok(starboardTack.x > 20)
  assert.ok(portTack.z > 10)
  assert.ok(starboardTack.z < -10)
  assert.ok(Math.abs(portTack.x - starboardTack.x) < 5)
})

test('sequential rudder tack crosses to the opposite reach with net upwind progress', () => {
  let state = { ...createVesselState(), heading: Math.PI / 4 }
  let crossedNoGo = false
  let reachedOppositeTack = false
  for (let elapsed = 0; elapsed < 30 - 1e-12; elapsed += 1 / 60) {
    // Sail the first leg, turn through the wind, then hold the second reach.
    // Ending a tack is a heading decision, not an arbitrary timed circle.
    if (state.heading >= 2.3) reachedOppositeTack = true
    const rudder = elapsed >= 8 && !reachedOppositeTack ? -1 : 0
    state = stepVessel(state, { throttle: 0, rudder, brake: false, sailAngle: Math.PI / 4 }, 1 / 60, SAILING, elapsed)
    if (calculateSailResponse(state, Math.PI / 4).power === 0) crossedNoGo = true
  }
  assert.ok(crossedNoGo && reachedOppositeTack, 'tack crosses the powerless head-to-wind zone')
  assert.ok(state.heading > Math.PI / 2 && state.heading < Math.PI)
  assert.ok(state.velocityZ < 0, 'second reach travels on the opposite diagonal')
  assert.ok(state.x > 20, 'both reaches make net progress toward the wind')
})

test('sailing storm return works with eased or trimmed sail and long invalid frames stay finite', () => {
  for (const sailAngle of [SAIL_TUNING.defaultAngle, Math.PI / 4]) {
    const environment = { ...SAILING, stormEnabled: true }
    let state = { ...createVesselState(185, 0), heading: Math.PI / 2, velocityX: 8 }
    for (let elapsed = 0; elapsed < 40 - 1e-12; elapsed += 1 / 60) {
      state = stepVessel(state, { throttle: 0, rudder: 0, brake: false, sailAngle }, 1 / 60, environment, elapsed)
    }
    assert.ok(Math.hypot(state.x, state.z) < 142)
  }
  const invalid = stepVessel(
    { x: Number.NaN, z: Number.POSITIVE_INFINITY, velocityX: Number.MAX_VALUE, velocityZ: Number.NaN, heading: Number.NaN, yawRate: Number.NaN },
    { throttle: Number.NaN, rudder: Number.POSITIVE_INFINITY, brake: false, sailAngle: Number.NaN },
    1000,
    { ...SAILING, stormEnabled: true },
    Number.NaN,
  )
  for (const value of Object.values(invalid)) assert.ok(Number.isFinite(value))
})

test('small wave drift keeps the same helm direction and recovery authority has no speed cliff', () => {
  const yawAt = (speed: number) => stepVessel(
    { ...createVesselState(), velocityZ: speed },
    { throttle: 0, rudder: 1, brake: false }, 1 / 120, SAILING,
  ).yawRate
  assert.ok(yawAt(-0.05) < 0 && yawAt(0.05) < 0)
  assert.ok(Math.abs(yawAt(0.59) - yawAt(0.61)) < 0.0001)
  assert.ok(yawAt(-2) > 0, 'meaningful reverse drift retains reversed rudder')
})
