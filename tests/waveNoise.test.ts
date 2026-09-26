import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_WAVE_NOISE_SEED,
  sampleWaveNoise,
} from '../src/world/waveNoise.ts'

test('seeded noise is bounded, deterministic, and order independent', () => {
  const points = [[-4.25, 2.75], [0, 0], [11.1, -8.4], [1e4, -1e4]] as const
  const expected = points.map(([u, v]) => sampleWaveNoise(u, v, DEFAULT_WAVE_NOISE_SEED))
  const reversed = points.toReversed().map(([u, v]) => sampleWaveNoise(u, v, DEFAULT_WAVE_NOISE_SEED)).toReversed()
  for (const [first, second] of expected.map((value, index) => [value, reversed[index]])) {
    assert.deepEqual(first, second)
    assert.ok(first.value >= -1 && first.value <= 1)
    assert.ok(Number.isFinite(first.derivativeU) && Number.isFinite(first.derivativeV))
  }
})

test('different seeds produce different deterministic fields', () => {
  const first = sampleWaveNoise(3.125, -7.75, 17)
  const second = sampleWaveNoise(3.125, -7.75, 18)
  assert.notDeepEqual(first, second)
})

test('analytical gradients agree with finite differences', () => {
  const u = 2.37
  const v = -1.41
  const delta = 1e-5
  const sample = sampleWaveNoise(u, v)
  const derivativeU = (sampleWaveNoise(u + delta, v).value - sampleWaveNoise(u - delta, v).value) / (2 * delta)
  const derivativeV = (sampleWaveNoise(u, v + delta).value - sampleWaveNoise(u, v - delta).value) / (2 * delta)
  assert.ok(Math.abs(sample.derivativeU - derivativeU) < 1e-8)
  assert.ok(Math.abs(sample.derivativeV - derivativeV) < 1e-8)
})

test('value and gradients are continuous across integer cell boundaries', () => {
  const epsilon = 1e-5
  const v = 0.37
  const left = sampleWaveNoise(3 - epsilon, v)
  const right = sampleWaveNoise(3 + epsilon, v)
  assert.ok(Math.abs(left.value - right.value) < 2e-5)
  assert.ok(Math.abs(left.derivativeU - right.derivativeU) < 2e-8)
  assert.ok(Math.abs(left.derivativeV - right.derivativeV) < 2e-5)
})

test('reusable noise storage changes no independent sample or seed sequence', () => {
  const scratch = { value: 0, derivativeU: 0, derivativeV: 0 }
  const saved = sampleWaveNoise(2.37, -1.41, 71)
  const original = { ...saved }
  assert.equal(sampleWaveNoise(2.37, -1.41, 71, scratch), scratch)
  assert.deepEqual(scratch, saved)
  sampleWaveNoise(-6.2, 31.8, 12, scratch)
  assert.deepEqual(saved, original)
  assert.deepEqual(sampleWaveNoise(2.37, -1.41, 71), original)
})
