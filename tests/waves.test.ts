import assert from 'node:assert/strict'
import test from 'node:test'

import { MAX_WAVE_HEIGHT, WAVE_COMPONENTS, WAVE_VARIATION, sampleWaterHeight, sampleWaterSurface } from '../src/world/waves.ts'

test('surface velocityY agrees with temporal derivatives at multiple samples', () => {
  const delta = 1e-5
  for (const [x, z, time] of [[17.25, -29.5, 3.75], [-42, 18, 0], [61, 7, 91.25]]) {
    const numericalVelocity = (
      sampleWaterHeight(x, z, time + delta) - sampleWaterHeight(x, z, time - delta)
    ) / (2 * delta)
    assert.ok(Math.abs(sampleWaterSurface(x, z, time).velocityY - numericalVelocity) < 1e-8)
  }
})

test('surface slopes agree with finite differences at the sampler distance', () => {
  const distance = 0.35
  for (const [x, z, time] of [[-43.5, 12.75, 1.2], [0, 0, 0], [84, -55, 37]]) {
    const sample = sampleWaterSurface(x, z, time, distance)
    const slopeX = (sampleWaterHeight(x + distance, z, time) - sampleWaterHeight(x - distance, z, time)) / (2 * distance)
    const slopeZ = (sampleWaterHeight(x, z + distance, time) - sampleWaterHeight(x, z - distance, time)) / (2 * distance)
    assert.ok(Math.abs(sample.slopeX - slopeX) < 1e-12)
    assert.ok(Math.abs(sample.slopeZ - slopeZ) < 1e-12)
  }
})

test('surface samples remain finite across representative positions and times', () => {
  for (const [x, z, time] of [[0, 0, 0], [180, -180, 0], [-80, 42, 12.5], [4, 9, 3600]]) {
    const sample = sampleWaterSurface(x, z, time)
    for (const value of Object.values(sample)) assert.ok(Number.isFinite(value))
  }
})

test('travelling swells visibly change height over a short review interval', () => {
  const points = [[0, 0], [15, -22], [-48, 31], [84, 76]] as const
  const changes = points.map(([x, z]) => Math.abs(
    sampleWaterHeight(x, z, 2.4) - sampleWaterHeight(x, z, 0),
  ))
  assert.ok(changes.some((change) => change > 0.45))
  assert.ok(changes.every((change) => Number.isFinite(change)))
})

test('storm modulation preserves calm water and grows smoothly offshore', () => {
  const calm = sampleWaterSurface(0, 0, 1.7)
  const edge = sampleWaterSurface(157, 0, 1.7)
  const outer = sampleWaterSurface(220, 0, 1.7)
  assert.equal(calm.stormIntensity, 0)
  assert.ok(edge.stormIntensity > 0 && edge.stormIntensity < 1)
  assert.equal(outer.stormIntensity, 1)
  assert.ok(Math.abs(outer.height) <= 2.52)
  for (const value of Object.values(outer)) assert.ok(Number.isFinite(value))
})

test('storm-aware slopes agree with finite differences through the transition', () => {
  const distance = 0.01
  for (const [x, z, time] of [[154, 36, 2.3], [160, -42, 11], [178, 0, 67]]) {
    const sample = sampleWaterSurface(x, z, time, distance)
    const slopeX = (sampleWaterHeight(x + distance, z, time) - sampleWaterHeight(x - distance, z, time)) / (2 * distance)
    const slopeZ = (sampleWaterHeight(x, z + distance, time) - sampleWaterHeight(x, z - distance, time)) / (2 * distance)
    assert.ok(Math.abs(sample.slopeX - slopeX) < 1e-5)
    assert.ok(Math.abs(sample.slopeZ - slopeZ) < 1e-5)
  }
})

test('original overlapping swell mix keeps bounded positive packet weights', () => {
  assert.equal(WAVE_COMPONENTS.length, 4)
  for (const packet of [-1, -0.5, 0, 0.5, 1]) {
    const amplitudes = WAVE_COMPONENTS.map(c => c.amplitude + c.amplitudeVariation * packet)
    assert.ok(amplitudes.every(a => a > 0))
    assert.ok(Math.abs(amplitudes.reduce((sum, a) => sum + a, 0) - MAX_WAVE_HEIGHT) < 1e-12)
    assert.ok(amplitudes[0] ** 2 / amplitudes.reduce((sum, a) => sum + a ** 2, 0) > 0.5,
      'The original main swell remains dominant while smaller waves overlap it')
  }
})

// Phase 14's +/-5-degree fan passed temporal variance tests but became stripes.
// Check actual spatial relief, not just different heights at different times.
test('overlapping water retains crosswind relief rather than parallel bands', () => {
  let crossEnergy = 0
  let totalEnergy = 0
  for (const time of [0, 17, 41, 83, 121]) {
    for (let x = -80; x <= 80; x += 10) for (let z = -80; z <= 80; z += 10) {
      const sample = sampleWaterSurface(x, z, time)
      crossEnergy += sample.slopeZ ** 2
      totalEnergy += sample.slopeX ** 2 + sample.slopeZ ** 2
    }
  }
  assert.ok(crossEnergy / totalEnergy > 0.2, 'Crosswind shape was flattened into stripes')
  assert.ok(crossEnergy / totalEnergy < 0.6, 'The primary swell lost its prevailing direction')
})

test('seeded layer changes the real surface while reset and evaluation order repeat exactly', () => {
  const points = [[-70, -21, 0], [0, 0, 12.3], [32, -43, 97.1], [166, 12, 180]]
  const sample = (seed: number) => points.map(([x, z, time]) => sampleWaterHeight(x, z, time, seed))
  const first = sample(WAVE_VARIATION.seed)
  const alternate = sample(WAVE_VARIATION.seed + 1)
  assert.ok(first.some((value, i) => Math.abs(value - alternate[i]) > 0.05))
  const reverse = points.toReversed().map(([x, z, time]) => sampleWaterHeight(x, z, time)).toReversed()
  assert.deepEqual(reverse, first)
  assert.deepEqual(sample(WAVE_VARIATION.seed), first)
})

test('phase and packet derivatives match the same surface across noise-cell and storm boundaries', () => {
  const epsilon = 1e-5
  const times = [0, 7.1, 29.3, 91]
  for (const time of times) {
    const cellX = (3 - 2.731) * WAVE_VARIATION.phaseLength - time * WAVE_VARIATION.phaseSpeed
    const cellZ = (2 + 4.193) * WAVE_VARIATION.phaseWidth
    for (const [x, z] of [[-70, -31], [0, 0], [154, 36], [172, 0], [cellX - epsilon, cellZ], [cellX + epsilon, cellZ]]) {
      const surface = sampleWaterSurface(x, z, time)
      const dx = (sampleWaterHeight(x + epsilon, z, time) - sampleWaterHeight(x - epsilon, z, time)) / (2 * epsilon)
      const dz = (sampleWaterHeight(x, z + epsilon, time) - sampleWaterHeight(x, z - epsilon, time)) / (2 * epsilon)
      const dt = (sampleWaterHeight(x, z, time + epsilon) - sampleWaterHeight(x, z, time - epsilon)) / (2 * epsilon)
      assert.ok(Math.abs(surface.slopeX - dx) < 1e-7)
      assert.ok(Math.abs(surface.slopeZ - dz) < 1e-7)
      assert.ok(Math.abs(surface.velocityY - dt) < 1e-7)
    }
  }
})

test('fixed wave sets vary crest size and timing over three minutes', () => {
  const probes = [[-35, -24], [0, 0], [32, 18], [76, -41]] as const
  const crestAmplitudes: number[] = []
  const crestIntervals: number[] = []
  const step = 0.05
  for (const [x, z] of probes) {
    const heights = Array.from({ length: 3601 }, (_, index) => sampleWaterHeight(x, z, index * step))
    const peaks: Array<{ time: number; height: number }> = []
    for (let index = 1; index < heights.length - 1; index += 1) {
      if (heights[index] > heights[index - 1] && heights[index] >= heights[index + 1]) peaks.push({ time: index * step, height: heights[index] })
    }
    const values = heights.slice(100, -100)
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length
    const significantPeaks = peaks.filter((peak) => peak.height > mean + 0.2)
    for (const peak of significantPeaks.slice(1, -1)) crestAmplitudes.push(peak.height - mean)
    for (let index = 1; index < significantPeaks.length; index += 1) crestIntervals.push(significantPeaks[index].time - significantPeaks[index - 1].time)
  }
  assert.ok(Math.max(...crestAmplitudes) - Math.min(...crestAmplitudes) > 0.12)
  assert.ok(Math.max(...crestIntervals) - Math.min(...crestIntervals) > 0.8)
  assert.ok(crestIntervals.every((interval) => interval > 1.2 && interval < 15))
})

test('wave height remains bounded and deterministic at long times', () => {
  for (const time of [0, 123.456, 3600, 1e6]) {
    const first = sampleWaterHeight(187.25, -93.5, time)
    const second = sampleWaterHeight(187.25, -93.5, time)
    assert.equal(first, second)
    assert.ok(Math.abs(first) <= MAX_WAVE_HEIGHT * 1.4 + 1e-9)
  }
})
