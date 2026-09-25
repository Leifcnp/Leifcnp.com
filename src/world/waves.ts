/**
 * The deterministic travelling water field shared by the renderer and vessel
 * buoyancy. All callers use world-space X/Z coordinates and seconds for time.
 *
 * The first two components are deliberately broad enough to read from the
 * isometric camera: their wavelengths are 30 and 24 world units and their
 * periods are 5.8 and 4.6 seconds. A smaller crossing swell and ripple keep
 * the surface from looking like one translating sine sheet.
 */
export const PRIMARY_WAVE = {
  amplitude: 0.96,
  waveNumber: (Math.PI * 2) / 30,
  directionX: 0.92,
  directionZ: 0.39,
  angularSpeed: (Math.PI * 2) / 5.8,
  kind: 'sine',
} as const;
export const CROSSING_WAVE = {
  amplitude: 0.46,
  waveNumber: (Math.PI * 2) / 24,
  directionX: -0.38,
  directionZ: 0.925,
  angularSpeed: (Math.PI * 2) / 4.6,
  kind: 'cosine',
} as const;
const WAVE_COMPONENTS = [
  PRIMARY_WAVE,
  CROSSING_WAVE,
  { amplitude: 0.28, waveNumber: (Math.PI * 2) / 34, directionX: 0.74, directionZ: -0.673, angularSpeed: (Math.PI * 2) / 6.8, kind: 'sine' },
  { amplitude: 0.1, waveNumber: (Math.PI * 2) / 11, directionX: 0.707, directionZ: 0.707, angularSpeed: (Math.PI * 2) / 3.5, kind: 'cosine' },
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
  ) * PRIMARY_WAVE.waveNumber + finiteOr(timeSeconds, 0) * PRIMARY_WAVE.angularSpeed;
}

/** Return the phase used by the crossing swell. */
export function sampleCrossingWavePhase(x: number, z: number, timeSeconds = 0): number {
  return (
    finiteOr(x, 0) * CROSSING_WAVE.directionX + finiteOr(z, 0) * CROSSING_WAVE.directionZ
  ) * CROSSING_WAVE.waveNumber + finiteOr(timeSeconds, 0) * CROSSING_WAVE.angularSpeed;
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
      time * component.angularSpeed;
    height += component.amplitude * (
      component.kind === 'sine' ? Math.sin(phase) : Math.cos(phase)
    );
  }
  return height;
}

export interface WaterSample {
  readonly height: number;
  readonly slopeX: number;
  readonly slopeZ: number;
  /** Vertical surface velocity, in world units per second. */
  readonly velocityY: number;
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
      time * component.angularSpeed;
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
  return {
    height,
    slopeX,
    slopeZ,
    velocityY,
  };
}
