/** Deterministic calm-water wind and apparent-wind calculations. */

export interface WindVector {
  readonly x: number
  readonly z: number
  readonly speed: number
}

export const WIND_TUNING = {
  velocityX: -9,
  velocityZ: 0,
} as const

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback
}

/** Return the stable authored wind. The time argument reserves a shared clock API. */
export function sampleWind(_timeSeconds = 0): WindVector {
  const x = finiteOr(WIND_TUNING.velocityX, 0)
  const z = finiteOr(WIND_TUNING.velocityZ, 0)
  return { x, z, speed: Math.hypot(x, z) }
}

/** Wind as seen by the vessel, after subtracting its world velocity. */
export function calculateApparentWind(
  wind: Pick<WindVector, 'x' | 'z'>,
  velocityX: number,
  velocityZ: number,
): WindVector {
  const x = finiteOr(wind?.x ?? 0, 0) - finiteOr(velocityX, 0)
  const z = finiteOr(wind?.z ?? 0, 0) - finiteOr(velocityZ, 0)
  return { x, z, speed: Math.hypot(x, z) }
}
