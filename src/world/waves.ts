/**
 * The original overlapping swell shapes, gently warped by two fixed seeded
 * patterns. Noise is a smooth spatial lookup advected with the water, never a
 * new random draw per frame. Every consumer shares this world-space field.
 */
import { sampleStormField, STORM_TUNING } from './stormField.ts';
import { DEFAULT_WAVE_NOISE_SEED, sampleWaveNoise } from './waveNoise.ts';

export const PRIMARY_WAVE = {
  amplitude: 0.96, waveNumber: (Math.PI * 2) / 30,
  directionX: 0.92, directionZ: 0.39, angularSpeed: (Math.PI * 2) / 5.8,
  phase: 0, kind: 'sine', phaseWarp: 0.8, amplitudeVariation: 0.18,
} as const;
export const SECONDARY_SWELL = {
  amplitude: 0.46, waveNumber: (Math.PI * 2) / 24,
  directionX: -0.38, directionZ: 0.925, angularSpeed: (Math.PI * 2) / 4.6,
  phase: 0, kind: 'cosine', phaseWarp: 0.55, amplitudeVariation: -0.09,
} as const;
export const WAVE_COMPONENTS = [
  PRIMARY_WAVE,
  SECONDARY_SWELL,
  { amplitude: 0.28, waveNumber: (Math.PI * 2) / 34, directionX: 0.74, directionZ: -0.673, angularSpeed: (Math.PI * 2) / 6.8, phase: 0, kind: 'sine', phaseWarp: -0.65, amplitudeVariation: -0.06 },
  { amplitude: 0.1, waveNumber: (Math.PI * 2) / 11, directionX: 0.707, directionZ: 0.707, angularSpeed: (Math.PI * 2) / 3.5, phase: 0, kind: 'cosine', phaseWarp: 0.35, amplitudeVariation: -0.03 },
] as const;

export const WAVE_VARIATION = {
  seed: DEFAULT_WAVE_NOISE_SEED,
  phaseLength: 44, phaseWidth: 27, phaseSpeed: 5.1,
  packetLength: 72, packetWidth: 48, packetSpeed: 4.6,
} as const;

// Packet weights trade energy between long swells and smaller cross waves.
// Their variations sum to zero and all remain positive: the old bound holds.
export const MAX_WAVE_HEIGHT = 1.8;

// Reused only inside synchronous sampling; callers receive independent values.
const phaseNoise = { value: 0, derivativeU: 0, derivativeV: 0 };
const packetNoise = { value: 0, derivativeU: 0, derivativeV: 0 };

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

function sampleVariation(x: number, z: number, time: number, seed: number): void {
  sampleWaveNoise(
    (x + time * WAVE_VARIATION.phaseSpeed) / WAVE_VARIATION.phaseLength + 2.731,
    z / WAVE_VARIATION.phaseWidth - 4.193, seed, phaseNoise,
  );
  sampleWaveNoise(
    (x + time * WAVE_VARIATION.packetSpeed) / WAVE_VARIATION.packetLength - 7.217,
    z / WAVE_VARIATION.packetWidth + 9.431, seed ^ 0x6a09e667, packetNoise,
  );
}

/** Actual phase, including the advected bend of the main swell. */
export function samplePrimaryWavePhase(x: number, z: number, timeSeconds = 0, seed = WAVE_VARIATION.seed): number {
  const worldX = finiteOr(x, 0), worldZ = finiteOr(z, 0), time = finiteOr(timeSeconds, 0);
  sampleVariation(worldX, worldZ, time, seed);
  return (worldX * PRIMARY_WAVE.directionX + worldZ * PRIMARY_WAVE.directionZ) * PRIMARY_WAVE.waveNumber +
    time * PRIMARY_WAVE.angularSpeed + PRIMARY_WAVE.phaseWarp * phaseNoise.value;
}

/** Sample the water shared by visible mesh, hull, spray and wake. */
export function sampleWaterHeight(x: number, z: number, timeSeconds = 0, seed = WAVE_VARIATION.seed): number {
  const worldX = finiteOr(x, 0), worldZ = finiteOr(z, 0), time = finiteOr(timeSeconds, 0);
  sampleVariation(worldX, worldZ, time, seed);
  let height = 0;
  for (const component of WAVE_COMPONENTS) {
    const phase = (worldX * component.directionX + worldZ * component.directionZ) * component.waveNumber +
      time * component.angularSpeed + component.phase + component.phaseWarp * phaseNoise.value;
    const amplitude = component.amplitude + component.amplitudeVariation * packetNoise.value;
    height += amplitude * (component.kind === 'sine' ? Math.sin(phase) : Math.cos(phase));
  }
  const intensity = sampleStormField(worldX, worldZ).intensity;
  return height * (1 + intensity * (STORM_TUNING.maxWaveScale - 1));
}

export interface WaterSample {
  readonly height: number;
  readonly slopeX: number;
  readonly slopeZ: number;
  readonly velocityY: number;
  readonly stormIntensity: number;
}

/**
 * Analytic gradients include phase bending, packet weights and storm scaling.
 * An explicit positive sampleDistance requests exact finite-difference slopes;
 * the default analytic path avoids four extra height evaluations per vertex.
 */
export function sampleWaterSurface(
  x: number,
  z: number,
  timeSeconds = 0,
  sampleDistance = 0,
  seed = WAVE_VARIATION.seed,
): WaterSample {
  const worldX = finiteOr(x, 0), worldZ = finiteOr(z, 0), time = finiteOr(timeSeconds, 0);
  sampleVariation(worldX, worldZ, time, seed);
  const phaseDx = phaseNoise.derivativeU / WAVE_VARIATION.phaseLength;
  const phaseDz = phaseNoise.derivativeV / WAVE_VARIATION.phaseWidth;
  const phaseDt = phaseDx * WAVE_VARIATION.phaseSpeed;
  const packetDx = packetNoise.derivativeU / WAVE_VARIATION.packetLength;
  const packetDz = packetNoise.derivativeV / WAVE_VARIATION.packetWidth;
  const packetDt = packetDx * WAVE_VARIATION.packetSpeed;
  let height = 0, slopeX = 0, slopeZ = 0, velocityY = 0;
  for (const component of WAVE_COMPONENTS) {
    const phase = (worldX * component.directionX + worldZ * component.directionZ) * component.waveNumber +
      time * component.angularSpeed + component.phase + component.phaseWarp * phaseNoise.value;
    const sine = Math.sin(phase), cosine = Math.cos(phase);
    const basis = component.kind === 'sine' ? sine : cosine;
    const derivative = component.kind === 'sine' ? cosine : -sine;
    const amplitude = component.amplitude + component.amplitudeVariation * packetNoise.value;
    const envelopeDerivative = component.amplitudeVariation * basis;
    height += amplitude * basis;
    slopeX += envelopeDerivative * packetDx + amplitude * derivative *
      (component.waveNumber * component.directionX + component.phaseWarp * phaseDx);
    slopeZ += envelopeDerivative * packetDz + amplitude * derivative *
      (component.waveNumber * component.directionZ + component.phaseWarp * phaseDz);
    velocityY += envelopeDerivative * packetDt + amplitude * derivative *
      (component.angularSpeed + component.phaseWarp * phaseDt);
  }
  const storm = sampleStormField(worldX, worldZ);
  const delta = STORM_TUNING.maxWaveScale - 1;
  const scale = 1 + storm.intensity * delta;
  slopeX = slopeX * scale + height * delta * storm.gradientX;
  slopeZ = slopeZ * scale + height * delta * storm.gradientZ;
  velocityY *= scale;
  height *= scale;
  if (Number.isFinite(sampleDistance) && sampleDistance > 0) {
    const distance = Math.max(0.0001, sampleDistance);
    slopeX = (sampleWaterHeight(worldX + distance, worldZ, time, seed) - sampleWaterHeight(worldX - distance, worldZ, time, seed)) / (2 * distance);
    slopeZ = (sampleWaterHeight(worldX, worldZ + distance, time, seed) - sampleWaterHeight(worldX, worldZ - distance, time, seed)) / (2 * distance);
  }
  return { height, slopeX, slopeZ, velocityY, stormIntensity: storm.intensity };
}
