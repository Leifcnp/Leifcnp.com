import assert from 'node:assert/strict'
import test from 'node:test'

import {
  calculateVesselPose,
  sampleVesselSurface,
  type VesselSurfaceSamples,
} from '../src/world/vessel/pose.ts'

const FLAT_SURFACE: VesselSurfaceSamples = {
  bow: { height: 0 },
  stern: { height: 0 },
  port: { height: 0 },
  starboard: { height: 0 },
  bowPort: { height: 0 },
  bowStarboard: { height: 0 },
  sternPort: { height: 0 },
  sternStarboard: { height: 0 },
}

function finitePose(pose: ReturnType<typeof calculateVesselPose>): void {
  for (const value of Object.values(pose)) assert.ok(Number.isFinite(value))
}

test('surface sampling remains hull aligned and includes coherent corner supports', () => {
  const samples = sampleVesselSurface(10, -4, 0, 5.2, 2.6, (x, z) => ({ height: x * 0.1 + z * 0.2 }))
  assert.ok(samples.bow.height > samples.stern.height)
  assert.ok(samples.bowPort.height < samples.bowStarboard.height)
  assert.ok(samples.sternPort.height < samples.sternStarboard.height)
})

test('speed lift and turn heel are visible, signed, and bounded', () => {
  const still = calculateVesselPose(FLAT_SURFACE)
  const moving = calculateVesselPose(FLAT_SURFACE, { forwardSpeed: 14, yawRate: 0.6 })
  const reduced = calculateVesselPose(FLAT_SURFACE, { forwardSpeed: 14, yawRate: 0.6 }, true)
  assert.ok(moving.pitch < still.pitch, 'forward speed lifts the bow')
  assert.ok(moving.roll < still.roll, 'positive port turn heels toward the outside')
  assert.equal(reduced.pitch, still.pitch)
  assert.equal(reduced.roll, still.roll)
  assert.ok(Math.abs(moving.pitch) <= 0.31)
  assert.ok(Math.abs(moving.roll) <= 0.36)
})

test('steep waves and invalid samples remain finite and bounded', () => {
  const sloped: VesselSurfaceSamples = {
    ...FLAT_SURFACE,
    bow: { height: 1 },
    bowPort: { height: 0.95 },
    bowStarboard: { height: 1.05 },
    stern: { height: -1 },
    sternPort: { height: -1.05 },
    sternStarboard: { height: -0.95 },
  }
  const target = calculateVesselPose(sloped, { forwardSpeed: 7, yawRate: -0.3 })
  finitePose(target)
  assert.ok(Math.abs(target.pitch) <= 0.31)
  assert.ok(Math.abs(target.roll) <= 0.36)

  const invalid = calculateVesselPose(
    {
      bow: { height: Number.NaN },
      stern: { height: Number.POSITIVE_INFINITY },
      port: { height: Number.NEGATIVE_INFINITY },
      starboard: { height: Number.NaN },
      bowPort: { height: Number.NaN },
      bowStarboard: { height: Number.NaN },
      sternPort: { height: Number.NaN },
      sternStarboard: { height: Number.NaN },
    },
    { forwardSpeed: Number.NaN, yawRate: Number.POSITIVE_INFINITY },
  )
  finitePose(invalid)
  assert.ok(Math.abs(invalid.pitch) <= 0.31)
  assert.ok(Math.abs(invalid.roll) <= 0.36)
})
