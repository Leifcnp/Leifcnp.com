/**
 * Overlapping travelling swells with independently bent crest patterns at
 * multiple scales. Noise is a smooth spatial lookup advected with the water, never a
 * new random draw per frame. Every consumer shares this world-space field.
 */
import { sampleStormField, STORM_TUNING } from './stormField.ts';
import { DEFAULT_WAVE_NOISE_SEED, sampleWaveNoise } from './waveNoise.ts';

export const PRIMARY_WAVE = {
  amplitude: 0.84, waveNumber: (Math.PI * 2) / 30,
  directionX: 0.92, directionZ: 0.39, angularSpeed: (Math.PI * 2) / 5.8,
  phase: 0, kind: 'sine', phaseWarp: 3.2, amplitudeVariation: 0.06,
} as const;
export const SECONDARY_SWELL = {
  amplitude: 0.4, waveNumber: (Math.PI * 2) / 24,
  directionX: -0.38, directionZ: 0.925, angularSpeed: (Math.PI * 2) / 4.6,
  phase: 0, kind: 'cosine', phaseWarp: 2.4, amplitudeVariation: -0.08,
} as const;
export const WAVE_COMPONENTS = [
  PRIMARY_WAVE,
  SECONDARY_SWELL,
  { amplitude: 0.24, waveNumber: (Math.PI * 2) / 34, directionX: 0.74, directionZ: -0.673, angularSpeed: (Math.PI * 2) / 6.8, phase: 0, kind: 'sine', phaseWarp: -2.3, amplitudeVariation: -0.04 },
  { amplitude: 0.06, waveNumber: (Math.PI * 2) / 11, directionX: 0.707, directionZ: 0.707, angularSpeed: (Math.PI * 2) / 3.5, phase: 0, kind: 'cosine', phaseWarp: 1.1, amplitudeVariation: -0.01 },
  { amplitude: 0.11, waveNumber: (Math.PI * 2) / 52, directionX: 0.58, directionZ: -0.815, angularSpeed: (Math.PI * 2) / 8.7, phase: 1.7, kind: 'sine', phaseWarp: 0.42, amplitudeVariation: 0.03 },
  { amplitude: 0.07, waveNumber: (Math.PI * 2) / 67, directionX: -0.7, directionZ: -0.714, angularSpeed: (Math.PI * 2) / 10.9, phase: -0.8, kind: 'cosine', phaseWarp: -0.31, amplitudeVariation: 0.02 },
  { amplitude: 0.05, waveNumber: (Math.PI * 2) / 19, directionX: 0.22, directionZ: 0.975, angularSpeed: (Math.PI * 2) / 4.1, phase: 2.3, kind: 'sine', phaseWarp: 0.27, amplitudeVariation: 0.01 },
  { amplitude: 0.03, waveNumber: (Math.PI * 2) / 43, directionX: -0.91, directionZ: 0.414, angularSpeed: (Math.PI * 2) / 7.6, phase: -2.1, kind: 'cosine', phaseWarp: 0.2, amplitudeVariation: 0.01 },
] as const;

export const WAVE_VARIATION = {
  seed: DEFAULT_WAVE_NOISE_SEED,
  phaseLength: 44, phaseWidth: 27, phaseSpeed: 5.1,
  packetLength: 72, packetWidth: 48, packetSpeed: 4.6,
  detailLength: 23, detailWidth: 41, detailSpeed: 3.35,
  macroLength: 137, macroWidth: 91, macroSpeed: 1.7,
} as const;

// Packet weights trade energy between long swells and smaller cross waves.
// Their variations sum to zero and all remain positive: the old bound holds.
export const MAX_WAVE_HEIGHT = 1.8;

// Reused only inside synchronous sampling; callers receive independent values.
const phaseNoise = { value: 0, derivativeU: 0, derivativeV: 0 };
const packetNoise = { value: 0, derivativeU: 0, derivativeV: 0 };
const detailNoise = { value: 0, derivativeU: 0, derivativeV: 0 };
const macroNoise = { value: 0, derivativeU: 0, derivativeV: 0 };

// Each carrier sees a different mixture of the broad, detail and macro fields.
// Independent phase bends break long-range alignment while keeping smooth
// travelling swells; the dominant carrier alone must not recreate a tiled field. Packet weights sum to zero so
// their fields only redistribute, rather than add, wave energy.
const PHASE_DETAIL = [1.2, -2.1, 1.8, -0.9, 1.1, -0.8, 0.9, -1.3] as const;
const PHASE_MACRO = [0.9, 1.1, -0.8, 0.5, -0.9, 1.2, -0.6, 0.7] as const;
export const PACKET_DETAIL = [0.11, -0.07, -0.025, -0.025, 0.025, 0.018, -0.022, -0.011] as const;
export const PACKET_MACRO = [0.07, -0.045, -0.015, -0.01, -0.014, 0.012, 0.008, -0.006] as const;

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
  sampleWaveNoise(
    (x * 0.81 - z * 0.59 + time * WAVE_VARIATION.detailSpeed) / WAVE_VARIATION.detailLength + 5.173,
    (x * 0.59 + z * 0.81) / WAVE_VARIATION.detailWidth - 2.647, seed ^ 0xbb67ae85, detailNoise,
  );
  sampleWaveNoise(
    (x * 0.93 + z * 0.37 + time * WAVE_VARIATION.macroSpeed) / WAVE_VARIATION.macroLength - 8.319,
    (-x * 0.37 + z * 0.93) / WAVE_VARIATION.macroWidth + 1.427, seed ^ 0x3c6ef372, macroNoise,
  );
}

/** Actual phase, including the advected bend of the main swell. */
export function samplePrimaryWavePhase(x: number, z: number, timeSeconds = 0, seed = WAVE_VARIATION.seed): number {
  const worldX = finiteOr(x, 0), worldZ = finiteOr(z, 0), time = finiteOr(timeSeconds, 0);
  sampleVariation(worldX, worldZ, time, seed);
  return (worldX * PRIMARY_WAVE.directionX + worldZ * PRIMARY_WAVE.directionZ) * PRIMARY_WAVE.waveNumber +
    time * PRIMARY_WAVE.angularSpeed + PRIMARY_WAVE.phaseWarp * phaseNoise.value +
    PHASE_DETAIL[0] * detailNoise.value + PHASE_MACRO[0] * macroNoise.value;
}

/** Sample the water shared by visible mesh, hull, spray and wake. */
export function sampleWaterHeight(x: number, z: number, timeSeconds = 0, seed = WAVE_VARIATION.seed): number {
  const worldX = finiteOr(x, 0), worldZ = finiteOr(z, 0), time = finiteOr(timeSeconds, 0);
  sampleVariation(worldX, worldZ, time, seed);
  let height = 0;
  for (let index = 0; index < WAVE_COMPONENTS.length; index += 1) {
    const component = WAVE_COMPONENTS[index];
    const phase = (worldX * component.directionX + worldZ * component.directionZ) * component.waveNumber +
      time * component.angularSpeed + component.phase + component.phaseWarp * phaseNoise.value +
      PHASE_DETAIL[index] * detailNoise.value +
      PHASE_MACRO[index] * macroNoise.value;
    const amplitude = component.amplitude + component.amplitudeVariation * packetNoise.value +
      PACKET_DETAIL[index] * detailNoise.value + PACKET_MACRO[index] * macroNoise.value;
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
  const detailDx = detailNoise.derivativeU * 0.81 / WAVE_VARIATION.detailLength + detailNoise.derivativeV * 0.59 / WAVE_VARIATION.detailWidth;
  const detailDz = detailNoise.derivativeU * -0.59 / WAVE_VARIATION.detailLength + detailNoise.derivativeV * 0.81 / WAVE_VARIATION.detailWidth;
  const detailDt = detailNoise.derivativeU * WAVE_VARIATION.detailSpeed / WAVE_VARIATION.detailLength;
  const macroDx = macroNoise.derivativeU * 0.93 / WAVE_VARIATION.macroLength + macroNoise.derivativeV * -0.37 / WAVE_VARIATION.macroWidth;
  const macroDz = macroNoise.derivativeU * 0.37 / WAVE_VARIATION.macroLength + macroNoise.derivativeV * 0.93 / WAVE_VARIATION.macroWidth;
  const macroDt = macroNoise.derivativeU * WAVE_VARIATION.macroSpeed / WAVE_VARIATION.macroLength;
  let height = 0, slopeX = 0, slopeZ = 0, velocityY = 0;
  for (let index = 0; index < WAVE_COMPONENTS.length; index += 1) {
    const component = WAVE_COMPONENTS[index];
    const phase = (worldX * component.directionX + worldZ * component.directionZ) * component.waveNumber +
      time * component.angularSpeed + component.phase + component.phaseWarp * phaseNoise.value +
      PHASE_DETAIL[index] * detailNoise.value + PHASE_MACRO[index] * macroNoise.value;
    const sine = Math.sin(phase), cosine = Math.cos(phase);
    const basis = component.kind === 'sine' ? sine : cosine;
    const derivative = component.kind === 'sine' ? cosine : -sine;
    const amplitude = component.amplitude + component.amplitudeVariation * packetNoise.value +
      PACKET_DETAIL[index] * detailNoise.value + PACKET_MACRO[index] * macroNoise.value;
    const envelopeDx = component.amplitudeVariation * packetDx + PACKET_DETAIL[index] * detailDx + PACKET_MACRO[index] * macroDx;
    const envelopeDz = component.amplitudeVariation * packetDz + PACKET_DETAIL[index] * detailDz + PACKET_MACRO[index] * macroDz;
    const envelopeDt = component.amplitudeVariation * packetDt + PACKET_DETAIL[index] * detailDt + PACKET_MACRO[index] * macroDt;
    height += amplitude * basis;
    slopeX += envelopeDx * basis + amplitude * derivative *
      (component.waveNumber * component.directionX + component.phaseWarp * phaseDx + PHASE_DETAIL[index] * detailDx + PHASE_MACRO[index] * macroDx);
    slopeZ += envelopeDz * basis + amplitude * derivative *
      (component.waveNumber * component.directionZ + component.phaseWarp * phaseDz + PHASE_DETAIL[index] * detailDz + PHASE_MACRO[index] * macroDz);
    velocityY += envelopeDt * basis + amplitude * derivative *
      (component.angularSpeed + component.phaseWarp * phaseDt + PHASE_DETAIL[index] * detailDt + PHASE_MACRO[index] * macroDt);
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
