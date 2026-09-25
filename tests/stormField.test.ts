import assert from 'node:assert/strict'
import test from 'node:test'

import { sampleStormField, STORM_TUNING } from '../src/world/stormField.ts'
import {
  createVesselState,
  stepVessel,
  type VesselEnvironment,
  type VesselInput,
  type VesselState,
} from '../src/world/vessel/kinematics.ts'

const STORM: VesselEnvironment = { worldLimit: STORM_TUNING.worldLimit, obstacles: [], stormEnabled: true }
const CALM: VesselEnvironment = { worldLimit: STORM_TUNING.worldLimit, obstacles: [] }
const RELEASED: VesselInput = { throttle: 0, rudder: 0, brake: false }

function advance(state: VesselState, input: VesselInput, seconds: number, frame = 1 / 60, environment = STORM, waves = false): VesselState {
  let next = state
  for (let elapsed = 0; elapsed < seconds - 1e-12; elapsed += frame) {
    const dt = Math.min(frame, seconds - elapsed)
    next = stepVessel(next, input, dt, environment, waves ? elapsed : undefined)
    assert.ok(Object.values(next).every(Number.isFinite), 'every trajectory sample stays finite')
    assert.ok(Math.max(Math.abs(next.x), Math.abs(next.z)) < environment.worldLimit - 3.2 - 1e-6,
      'soft recovery must never touch the hard boundary')
  }
  return next
}

function radialSpeed(state: VesselState): number {
  const dx = state.x - STORM_TUNING.centerX
  const dz = state.z - STORM_TUNING.centerZ
  const radius = Math.hypot(dx, dz) || 1
  return (state.velocityX * dx + state.velocityZ * dz) / radius
}

test('storm intensity is calm, smooth, monotonic, and bounded', () => {
  assert.equal(sampleStormField(STORM_TUNING.centerX, STORM_TUNING.centerZ).intensity, 0)
  assert.equal(sampleStormField(STORM_TUNING.centerX + STORM_TUNING.calmRadius, STORM_TUNING.centerZ).intensity, 0)
  assert.equal(sampleStormField(STORM_TUNING.centerX + STORM_TUNING.fullRadius, STORM_TUNING.centerZ).intensity, 1)
  const values = [142, 149.5, 157, 164.5, 172].map((radius) => sampleStormField(STORM_TUNING.centerX + radius, STORM_TUNING.centerZ).intensity)
  for (let index = 1; index < values.length; index += 1) assert.ok(values[index] >= values[index - 1])
  assert.ok(sampleStormField(STORM_TUNING.centerX + 230, STORM_TUNING.centerZ).intensity <= 1)
  const before = sampleStormField(STORM_TUNING.centerX + STORM_TUNING.calmRadius - 1e-5, STORM_TUNING.centerZ)
  const after = sampleStormField(STORM_TUNING.centerX + STORM_TUNING.calmRadius + 1e-5, STORM_TUNING.centerZ)
  assert.ok(Math.abs(after.intensity - before.intensity) < 1e-8)
})

test('inward direction and gradient are correct on cardinals and diagonals', () => {
  for (const [x, z] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    const sample = sampleStormField(STORM_TUNING.centerX + x * 190, STORM_TUNING.centerZ + z * 190)
    const length = Math.hypot(x, z)
    assert.ok(Math.abs(sample.inwardX + x / length) < 1e-12)
    assert.ok(Math.abs(sample.inwardZ + z / length) < 1e-12)
    assert.ok(sample.gradientX * x + sample.gradientZ * z >= 0)
  }
})

test('storm is opt-in and calm fixtures remain invariant', () => {
  const state = { ...createVesselState(STORM_TUNING.centerX + 80, STORM_TUNING.centerZ), velocityZ: 5 }
  assert.deepEqual(stepVessel(state, RELEASED, 0.5, CALM), stepVessel(state, RELEASED, 0.5, { ...CALM, stormEnabled: false }))
  assert.deepEqual(stepVessel(createVesselState(), RELEASED, 1, STORM), createVesselState())
})

test('released outward motion turns inward before the finite edge at 30/60/120Hz', () => {
  for (const frame of [1 / 30, 1 / 60, 1 / 120]) {
    const state = { ...createVesselState(STORM_TUNING.centerX + 185, STORM_TUNING.centerZ), velocityX: 12 }
    const result = advance(state, RELEASED, 6, frame)
    assert.ok(result.x < state.x, `frame ${frame} should recover toward center`)
    assert.ok(result.x < STORM_TUNING.worldLimit - 3.2)
    assert.ok(radialSpeed(result) < 0)
  }
})

test('all radial headings recover from the offshore band under release and powered outward travel', () => {
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]] as const
  for (const [directionX, directionZ] of directions) {
    const length = Math.hypot(directionX, directionZ)
    const x = directionX / length * 185
    const z = directionZ / length * 185
    const outwardHeading = Math.atan2(directionX, directionZ)
    const outwardVelocity = { velocityX: 14 * Math.sin(outwardHeading), velocityZ: 14 * Math.cos(outwardHeading) }
    const initial = { ...createVesselState(x, z), heading: outwardHeading, ...outwardVelocity }
    const released = advance(initial, RELEASED, 12, 1 / 60, STORM, true)
    const powered = advance(initial, { throttle: 1, rudder: 0, brake: false }, 12, 1 / 60, STORM, true)
    assert.ok(Math.hypot(released.x, released.z) < 185, `released ${directionX},${directionZ} should move inward`)
    assert.ok(Math.hypot(powered.x, powered.z) < 185, `powered ${directionX},${directionZ} should initially recover`)
    assert.ok(Math.hypot(powered.x, powered.z) < STORM.worldLimit - 3.2)
  }
})

test('inward heading and neutral recovery return through the calm radius', () => {
  const outboundHeading = Math.PI / 2
  const state = { ...createVesselState(185, 0), heading: outboundHeading, velocityX: 14 }
  const inward = advance({ ...state, heading: outboundHeading + Math.PI }, { throttle: 1, rudder: 0, brake: false }, 8, 1 / 60, STORM, true)
  assert.ok(inward.x < 185 - 20, 'inward steering should retain strong control')

  const released = advance(state, RELEASED, 180, 1 / 60, STORM)
  assert.ok(Math.hypot(released.x, released.z) < STORM_TUNING.calmRadius)
})

test('storm trajectories remain frame-rate stable and malicious velocity inputs stay bounded', () => {
  const initial = { ...createVesselState(185, 0), heading: Math.PI / 2, velocityX: 14 }
  const at30 = advance(initial, { throttle: 1, rudder: 0.2, brake: false }, 8, 1 / 30, STORM, true)
  const at60 = advance(initial, { throttle: 1, rudder: 0.2, brake: false }, 8, 1 / 60, STORM, true)
  const at120 = advance(initial, { throttle: 1, rudder: 0.2, brake: false }, 8, 1 / 120, STORM, true)
  for (const state of [at30, at60, at120]) {
    assert.ok(Number.isFinite(state.x) && Number.isFinite(state.z))
    assert.ok(Math.abs(state.x) <= STORM.worldLimit - 3.2)
    assert.ok(Math.abs(state.z) <= STORM.worldLimit - 3.2)
  }
  for (const key of Object.keys(at30) as Array<keyof VesselState>) {
    assert.ok(Math.abs(at30[key] - at60[key]) < 1e-6, `${key}: 30/60 Hz drift`)
    assert.ok(Math.abs(at60[key] - at120[key]) < 1e-6, `${key}: 60/120 Hz drift`)
  }

  const malicious = stepVessel(
    { ...createVesselState(185, 0), velocityX: Number.MAX_VALUE, velocityZ: -Number.MAX_VALUE },
    { throttle: 1, rudder: 0, brake: false },
    1 / 60,
    STORM,
    0,
  )
  for (const value of Object.values(malicious)) assert.ok(Number.isFinite(value))
  assert.ok(Math.hypot(malicious.velocityX, malicious.velocityZ) <= Math.hypot(14, 6) + 1e-9)
})

test('reverse, inward control, and brake remain responsive in storm water', () => {
  const outward = { ...createVesselState(STORM_TUNING.centerX + 185, STORM_TUNING.centerZ), velocityX: 8 }
  const reversed = advance(outward, { throttle: -1, rudder: 0, brake: false }, 1.5)
  const inward = advance(outward, { throttle: 1, rudder: 0, brake: false }, 1.5)
  const braked = advance(outward, { throttle: 0, rudder: 0, brake: true }, 1.5)
  assert.ok(reversed.x < outward.x)
  assert.ok(inward.x < outward.x)
  assert.ok(Math.hypot(braked.velocityX, braked.velocityZ) < Math.hypot(outward.velocityX, outward.velocityZ))
})
