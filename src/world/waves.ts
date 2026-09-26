/**
 * The deterministic travelling water field shared by the renderer and vessel
 * buoyancy. All callers use world-space X/Z coordinates and seconds for time.
 *
 * Six small, fixed-phase components make recognisable wave sets without
 * introducing a second swell direction.  Every phase travels toward -X
 * (the phase convention is `k·x + omega*t`) and is within five degrees of
 * that heading.  Offshore storm intensity scales this authored sum in place
 * so every consumer sees the same water field.
 */
import { sampleStormField, STORM_TUNING } from './stormField.ts';
export const PRIMARY_WAVE = {
  amplitude: 0.96,
  waveNumber: (Math.PI * 2) / 30,
  directionX: 1,
  directionZ: 0,
  angularSpeed: (Math.PI * 2) / 5.8,
  phase: 0.35,
  kind: 'sine',
} as const;
export const SECONDARY_SWELL = {
  amplitude: 0.42,
  waveNumber: (Math.PI * 2) / 24,
  directionX: 0.998,
  directionZ: -0.063,
  angularSpeed: (Math.PI * 2) / 4.6,
  phase: 2.1,
  kind: 'cosine',
} as const;
export const WAVE_COMPONENTS = [
  PRIMARY_WAVE,
  SECONDARY_SWELL,
  { amplitude: 0.18, waveNumber: (Math.PI * 2) / 34, directionX: 0.999, directionZ: 0.045, angularSpeed: (Math.PI * 2) / 6.8, phase: 4.7, kind: 'sine' },
  { amplitude: 0.16, waveNumber: (Math.PI * 2) / 20, directionX: 0.997, directionZ: -0.077, angularSpeed: (Math.PI * 2) / 3.5, phase: 1.25, kind: 'cosine' },
  { amplitude: 0.04, waveNumber: (Math.PI * 2) / 14, directionX: 0.999, directionZ: 0.045, angularSpeed: (Math.PI * 2) / 2.7, phase: 5.4, kind: 'sine' },
  { amplitude: 0.04, waveNumber: (Math.PI * 2) / 42, directionX: 0.999, directionZ: -0.045, angularSpeed: (Math.PI * 2) / 8.9, phase: 3.05, kind: 'cosine' },
] as const;
const DEFAULT_SAMPLE_DISTANCE = 0.35;
const DEFAULT_SLOPE_FACTORS_X = WAVE_COMPONENTS.map(
  (component) => Math.sin(component.waveNumber * component.directionX * DEFAULT_SAMPLE_DISTANCE) / DEFAULT_SAMPLE_DISTANCE,
);
const DEFAULT_SLOPE_FACTORS_Z = WAVE_COMPONENTS.map(
  (component) => Math.sin(component.waveNumber * component.directionZ * DEFAULT_SAMPLE_DISTANCE) / DEFAULT_SAMPLE_DISTANCE,
);

/** The largest possible absolute height of the authored wave sum. */
export const MAX_WAVE_HEIGHT = WAVE_COMPONENTS.reduce(
  (sum, component) => sum + component.amplitude,
  0,
);

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

/** Return the phase used by the primary travelling swell. */
export function samplePrimaryWavePhase(x: number, z: number, timeSeconds = 0): number {
  return (
    finiteOr(x, 0) * PRIMARY_WAVE.directionX + finiteOr(z, 0) * PRIMARY_WAVE.directionZ
  ) * PRIMARY_WAVE.waveNumber + finiteOr(timeSeconds, 0) * PRIMARY_WAVE.angularSpeed + PRIMARY_WAVE.phase;
}

/** Return the phase used by the secondary incoming swell. */
export function sampleSecondaryWavePhase(x: number, z: number, timeSeconds = 0): number {
  return (
    finiteOr(x, 0) * SECONDARY_SWELL.directionX + finiteOr(z, 0) * SECONDARY_SWELL.directionZ
  ) * SECONDARY_SWELL.waveNumber + finiteOr(timeSeconds, 0) * SECONDARY_SWELL.angularSpeed + SECONDARY_SWELL.phase;
}

/** Sample the same travelling swell used by the water mesh and vessel. */
export function sampleWaterHeight(x: number, z: number, timeSeconds = 0): number {
  const worldX = finiteOr(x, 0);
  const worldZ = finiteOr(z, 0);
  const time = finiteOr(timeSeconds, 0);
  let height = 0;
  for (const component of WAVE_COMPONENTS) {
    const phase =
      (worldX * component.directionX + worldZ * component.directionZ) * component.waveNumber +
      time * component.angularSpeed + component.phase;
    height += component.amplitude * (component.kind === 'sine' ? Math.sin(phase) : Math.cos(phase));
  }
  const storm = sampleStormField(worldX, worldZ);
  const intensity = clamp01(finiteOr(storm.intensity, 0));
  return height * (1 + intensity * (STORM_TUNING.maxWaveScale - 1));
}

export interface WaterSample {
  readonly height: number;
  readonly slopeX: number;
  readonly slopeZ: number;
  /** Vertical surface velocity, in world units per second. */
  readonly velocityY: number;
  /** Position-only offshore storm intensity, clamped to [0, 1]. */
  readonly stormIntensity: number;
}

/** Sample height and finite-difference slopes from the same wave function. */
export function sampleWaterSurface(
  x: number,
  z: number,
  timeSeconds = 0,
  sampleDistance = 0.35,
): WaterSample {
  const worldX = finiteOr(x, 0);
  const worldZ = finiteOr(z, 0);
  const time = finiteOr(timeSeconds, 0);
  const distance = Number.isFinite(sampleDistance)
    ? Math.max(0.01, sampleDistance)
    : DEFAULT_SAMPLE_DISTANCE;
  const useDefaultSlopeFactors = distance === DEFAULT_SAMPLE_DISTANCE;
  let height = 0;
  let slopeX = 0;
  let slopeZ = 0;
  let velocityY = 0;
  for (let componentIndex = 0; componentIndex < WAVE_COMPONENTS.length; componentIndex += 1) {
    const component = WAVE_COMPONENTS[componentIndex];
    const phase =
      (worldX * component.directionX + worldZ * component.directionZ) * component.waveNumber +
      time * component.angularSpeed + component.phase;
    const sine = Math.sin(phase);
    const cosine = Math.cos(phase);
    const basis = component.kind === 'sine' ? sine : cosine;
    // Derivative of the component basis with respect to phase. The
    // finite-difference factor below preserves the historical sampler
    // contract while avoiding four additional height evaluations.
    const phaseDerivative = component.kind === 'sine' ? cosine : -sine;
    height += component.amplitude * basis;
    const slopeFactorX = useDefaultSlopeFactors
      ? DEFAULT_SLOPE_FACTORS_X[componentIndex]
      : Math.sin(component.waveNumber * component.directionX * distance) / distance;
    const slopeFactorZ = useDefaultSlopeFactors
      ? DEFAULT_SLOPE_FACTORS_Z[componentIndex]
      : Math.sin(component.waveNumber * component.directionZ * distance) / distance;
    slopeX += component.amplitude * phaseDerivative * slopeFactorX;
    slopeZ += component.amplitude * phaseDerivative * slopeFactorZ;
    velocityY += component.amplitude * component.angularSpeed * phaseDerivative;
  }
  const storm = sampleStormField(worldX, worldZ);
  const intensity = clamp01(finiteOr(storm.intensity, 0));
  const waveScale = 1 + intensity * (STORM_TUNING.maxWaveScale - 1);
  // Scale the same travelling shape and include the intensity derivative in
  // the gradient. This keeps visible facets, hull contact, and wave response
  // coherent across the soft offshore transition.
  const baseHeight = height;
  height = baseHeight * waveScale;
  const stormScaleDelta = STORM_TUNING.maxWaveScale - 1;
  slopeX = slopeX * waveScale + baseHeight * stormScaleDelta * finiteOr(storm.gradientX, 0);
  slopeZ = slopeZ * waveScale + baseHeight * stormScaleDelta * finiteOr(storm.gradientZ, 0);
  velocityY *= waveScale;
  return {
    height,
    slopeX,
    slopeZ,
    velocityY,
    stormIntensity: intensity,
  };
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
