/**
 * Pure offshore storm field. The field is radial around the calm play-area
 * center and intentionally has no rendering or simulation dependencies.
 */

export const STORM_TUNING = {
  centerX: 0,
  centerZ: 0,
  calmRadius: 142,
  fullRadius: 172,
  worldLimit: 220,
  maxWaveScale: 1.4,
} as const

export interface StormFieldSample {
  /** 0 in the calm region, 1 beyond the outer transition edge. */
  readonly intensity: number
  /** Unit vector pointing back toward the calm-region center. */
  readonly inwardX: number
  readonly inwardZ: number
  /** World-space gradient of intensity, pointing toward increasing storm. */
  readonly gradientX: number
  readonly gradientZ: number
}

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

/** Sample the continuous storm intensity and its inward recovery direction. */
export function sampleStormField(x: number, z: number): StormFieldSample {
  const offsetX = finiteOr(x, STORM_TUNING.centerX) - STORM_TUNING.centerX
  const offsetZ = finiteOr(z, STORM_TUNING.centerZ) - STORM_TUNING.centerZ
  const radius = Math.hypot(offsetX, offsetZ)
  const safeRadius = Math.max(radius, 1e-9)
  const outwardX = offsetX / safeRadius
  const outwardZ = offsetZ / safeRadius
  const inwardX = -outwardX
  const inwardZ = -outwardZ

  const band = STORM_TUNING.fullRadius - STORM_TUNING.calmRadius
  const normalized = clamp((radius - STORM_TUNING.calmRadius) / band, 0, 1)
  // C1 smoothstep: both intensity and its radial derivative are continuous at
  // the calm/full edges, avoiding a visible or physical ring seam.
  const intensity = normalized * normalized * (3 - 2 * normalized)
  const derivative = normalized > 0 && normalized < 1
    ? (6 * normalized * (1 - normalized)) / band
    : 0

  return {
    intensity,
    inwardX,
    inwardZ,
    gradientX: outwardX * derivative,
    gradientZ: outwardZ * derivative,
  }
}
