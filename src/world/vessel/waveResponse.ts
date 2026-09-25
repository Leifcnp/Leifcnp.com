import type { WaterSample } from '../waves.ts';

/** Conservative bounds for the small horizontal response from a wave slope. */
export const WAVE_RESPONSE_TUNING = {
  /** Maximum acceleration along the vessel's forward axis. */
  maxSurgeAcceleration: 0.9,
  /** Maximum acceleration along the vessel's local lateral axis. */
  maxSwayAcceleration: 0.65,
  /** Slope acceleration before the per-axis bounds are applied. */
  slopeAcceleration: 2.8,
  /** Defensive input bound; the authored water slopes are far below this. */
  maxInputSlope: 8,
  /** Maps uphill surge into a smooth speed-sensitive resistance. */
  uphillResistanceScale: 12,
  /** Bound uphill loading so forward thrust and braking retain authority. */
  maxUphillResistanceAcceleration: 7.2,
} as const;

export interface WaveResponse {
  readonly accelerationX: number;
  readonly accelerationZ: number;
  readonly surgeAcceleration: number;
  readonly swayAcceleration: number;
}

/**
 * Return a bounded resistance for a powered vessel climbing a wave face.
 *
 * This is deliberately separate from downhill wave acceleration: a positive
 * (downhill) surge never slows the vessel, and a released or reverse throttle
 * never receives an invented forward drag. The caller applies this before its
 * existing brake logic so manual braking retains priority.
 */
export function calculateUphillResistance(
  response: Pick<WaveResponse, 'surgeAcceleration'>,
  forwardSpeed: number,
  throttle: number,
  maxForwardSpeed: number,
): number {
  const uphillAcceleration = clamp(
    -finiteOr(response?.surgeAcceleration ?? 0, 0),
    0,
    WAVE_RESPONSE_TUNING.maxSurgeAcceleration,
  )
  const speedLimit = Math.max(0.01, finiteOr(maxForwardSpeed, 14))
  const speedRatio = clamp(finiteOr(forwardSpeed, 0) / speedLimit, 0, 1)
  const throttleRatio = clamp(finiteOr(throttle, 0), 0, 1)
  return -Math.min(
    uphillAcceleration * WAVE_RESPONSE_TUNING.uphillResistanceScale * speedRatio * speedRatio * throttleRatio,
    WAVE_RESPONSE_TUNING.maxUphillResistanceAcceleration,
  )
}

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

/**
 * Calculate a bounded downhill response to the sampled water surface.
 *
 * The slope is a world-space gradient. A vessel moves down that gradient,
 * like a small gravity component on the local water plane. The result is
 * transformed into the vessel's local axes and capped independently so a
 * steep/invalid sample cannot take control away from manual steering.
 */
export function calculateWaveResponse(
  surface: Pick<WaterSample, 'slopeX' | 'slopeZ'>,
  heading: number,
): WaveResponse {
  const safeHeading = finiteOr(heading, 0);
  // Clamp before multiplying. This keeps even Number.MAX_VALUE inputs from
  // overflowing into Infinity and then producing NaN during basis rotation.
  const slopeX = clamp(
    finiteOr(surface?.slopeX ?? 0, 0),
    -WAVE_RESPONSE_TUNING.maxInputSlope,
    WAVE_RESPONSE_TUNING.maxInputSlope,
  );
  const slopeZ = clamp(
    finiteOr(surface?.slopeZ ?? 0, 0),
    -WAVE_RESPONSE_TUNING.maxInputSlope,
    WAVE_RESPONSE_TUNING.maxInputSlope,
  );
  const downhillX = -slopeX * WAVE_RESPONSE_TUNING.slopeAcceleration;
  const downhillZ = -slopeZ * WAVE_RESPONSE_TUNING.slopeAcceleration;
  const sinHeading = Math.sin(safeHeading);
  const cosHeading = Math.cos(safeHeading);

  // Local +Z is the bow direction and local +X is the lateral axis.
  const swayAcceleration = clamp(
    downhillX * cosHeading - downhillZ * sinHeading,
    -WAVE_RESPONSE_TUNING.maxSwayAcceleration,
    WAVE_RESPONSE_TUNING.maxSwayAcceleration,
  );
  const surgeAcceleration = clamp(
    downhillX * sinHeading + downhillZ * cosHeading,
    -WAVE_RESPONSE_TUNING.maxSurgeAcceleration,
    WAVE_RESPONSE_TUNING.maxSurgeAcceleration,
  );

  return {
    accelerationX: surgeAcceleration * sinHeading + swayAcceleration * cosHeading,
    accelerationZ: surgeAcceleration * cosHeading - swayAcceleration * sinHeading,
    surgeAcceleration,
    swayAcceleration,
  };
}
