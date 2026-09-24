import assert from 'node:assert/strict'
import test from 'node:test'

import { sampleWaterHeight, sampleWaterSurface } from '../src/world/waves.ts'

test('surface velocityY agrees with the temporal derivative of sampled height', () => {
  const x = 17.25
  const z = -29.5
  const time = 3.75
  const delta = 1e-5
  const numericalVelocity = (
    sampleWaterHeight(x, z, time + delta) - sampleWaterHeight(x, z, time - delta)
  ) / (2 * delta)

  assert.ok(Math.abs(sampleWaterSurface(x, z, time).velocityY - numericalVelocity) < 1e-8)
})

test('surface slopes agree with finite differences at the sampler distance', () => {
  const x = -43.5
  const z = 12.75
  const time = 1.2
  const distance = 0.35
  const sample = sampleWaterSurface(x, z, time, distance)
  const slopeX = (
    sampleWaterHeight(x + distance, z, time) - sampleWaterHeight(x - distance, z, time)
  ) / (2 * distance)
  const slopeZ = (
    sampleWaterHeight(x, z + distance, time) - sampleWaterHeight(x, z - distance, time)
  ) / (2 * distance)

  assert.ok(Math.abs(sample.slopeX - slopeX) < 1e-12)
  assert.ok(Math.abs(sample.slopeZ - slopeZ) < 1e-12)
})

test('surface samples remain finite across representative positions and times', () => {
  for (const [x, z, time] of [[0, 0, 0], [180, -180, 0], [-80, 42, 12.5], [4, 9, 3600]]) {
    const sample = sampleWaterSurface(x, z, time)
    for (const value of Object.values(sample)) assert.ok(Number.isFinite(value))
  }
})
