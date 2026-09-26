/**
 * Small deterministic C2-continuous value noise for authored wave variation.
 * The quintic fade has zero first and second derivatives at cell boundaries,
 * so interpolated values and analytical gradients join smoothly.
 */
export const DEFAULT_WAVE_NOISE_SEED = 0x51f15e;
export const WAVE_NOISE_MIN = -1;
export const WAVE_NOISE_MAX = 1;

export interface WaveNoiseSample {
  value: number;
  derivativeU: number;
  derivativeV: number;
}

function hashCorner(x: number, y: number, seed: number): number {
  let hash = Math.imul(x | 0, 0x1f123bb5) ^ Math.imul(y | 0, 0x5f356495) ^ Math.imul(seed | 0, 0x27d4eb2d);
  hash = Math.imul(hash ^ (hash >>> 15), 0x85ebca6b);
  hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35);
  hash ^= hash >>> 16;
  return (hash >>> 0) / 0xffffffff * 2 - 1;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function fadeDerivative(t: number): number {
  return 30 * t * t * (t * (t - 2) + 1);
}

/** Sample deterministic 2D value noise and its analytical cell gradients. */
export function sampleWaveNoise(
  u: number,
  v: number,
  seed = DEFAULT_WAVE_NOISE_SEED,
  target?: WaveNoiseSample,
): WaveNoiseSample {
  const safeU = Number.isFinite(u) ? u : 0;
  const safeV = Number.isFinite(v) ? v : 0;
  const safeSeed = Number.isFinite(seed) ? seed : DEFAULT_WAVE_NOISE_SEED;
  const cellU = Math.floor(safeU);
  const cellV = Math.floor(safeV);
  const localU = safeU - cellU;
  const localV = safeV - cellV;
  const fu = fade(localU);
  const fv = fade(localV);
  const du = fadeDerivative(localU);
  const dv = fadeDerivative(localV);
  const n00 = hashCorner(cellU, cellV, safeSeed);
  const n10 = hashCorner(cellU + 1, cellV, safeSeed);
  const n01 = hashCorner(cellU, cellV + 1, safeSeed);
  const n11 = hashCorner(cellU + 1, cellV + 1, safeSeed);
  const lower = n00 + (n10 - n00) * fu;
  const upper = n01 + (n11 - n01) * fu;
  const result = target ?? { value: 0, derivativeU: 0, derivativeV: 0 };
  result.value = lower + (upper - lower) * fv;
  result.derivativeU = ((n10 - n00) + ((n11 - n01) - (n10 - n00)) * fv) * du;
  result.derivativeV = (upper - lower) * dv;
  return result;
}
