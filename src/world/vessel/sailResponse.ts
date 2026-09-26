import { calculateApparentWind, sampleWind } from '../wind.ts'
import type { VesselState } from './kinematics.ts'

export const SAIL_TUNING = {
  minAngle: 8 * Math.PI / 180,
  maxAngle: 85 * Math.PI / 180,
  defaultAngle: 85 * Math.PI / 180,
  trimRate: 25 * Math.PI / 180,
  noGoAngle: 40 * Math.PI / 180,
  trueWindNoGoSoftness: 8 * Math.PI / 180,
  maxDriveAcceleration: 5.8,
  maxLateralAcceleration: 1.6,
  /** Sailing-only helm authority; motor-mode yaw remains VESSEL_TUNING. */
  sailingMaxYawRate: 1.1,
  sailingYawResponse: 6.5,
  stallYawRate: 0.55,
  manualBoostFraction: 0.45,
} as const

export interface SailResponse {
  readonly driveAcceleration: number
  readonly lateralAcceleration: number
  readonly power: number
  readonly suggestedAngle: number
  /** Signed boom yaw relative to the vessel; positive sends the boom toward -X. */
  readonly signedAngle: number
  /** Wind-from angle relative to the bow, positive toward +X. */
  readonly relativeWindAngle: number
  readonly noGo: boolean
}

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function wrapAngle(angle: number): number {
  const wrapped = (angle + Math.PI) % (2 * Math.PI)
  return wrapped < 0 ? wrapped + 2 * Math.PI - Math.PI : wrapped - Math.PI
}

/**
 * Calculate a bounded simplified mainsail response. The sail angle is the
 * absolute boom angle from the bow; the authored default is intentionally
 * eased almost fully out, so a first beam-reach boat waits for trim input.
 */
export function calculateSailResponse(
  state: Pick<VesselState, 'heading' | 'velocityX' | 'velocityZ'>,
  sailAngle = SAIL_TUNING.defaultAngle,
  luff = 0,
): SailResponse {
  const heading = finiteOr(state?.heading ?? 0, 0)
  const apparent = calculateApparentWind(sampleWind(), state?.velocityX ?? 0, state?.velocityZ ?? 0)
  const apparentSpeed = apparent.speed
  const fromX = apparentSpeed > 1e-7 ? -apparent.x / apparentSpeed : 0
  const fromZ = apparentSpeed > 1e-7 ? -apparent.z / apparentSpeed : 1
  const sinHeading = Math.sin(heading)
  const cosHeading = Math.cos(heading)
  const bowX = sinHeading
  const bowZ = cosHeading
  const portX = cosHeading
  const portZ = -sinHeading
  const localFromX = fromX * portX + fromZ * portZ
  const localFromZ = fromX * bowX + fromZ * bowZ
  const relativeWindAngle = Math.atan2(localFromX, localFromZ)
  const windSide = Math.sign(relativeWindAngle) || 1
  const windAngle = Math.abs(relativeWindAngle)
  const trueWind = sampleWind()
  const trueSpeed = trueWind.speed || 1
  const trueFromX = -trueWind.x / trueSpeed
  const trueFromZ = -trueWind.z / trueSpeed
  const trueLocalFromX = trueFromX * portX + trueFromZ * portZ
  const trueLocalFromZ = trueFromX * bowX + trueFromZ * bowZ
  const trueWindAngle = Math.abs(Math.atan2(trueLocalFromX, trueLocalFromZ))
  const hardNoGoAngle = SAIL_TUNING.noGoAngle - SAIL_TUNING.trueWindNoGoSoftness
  const effectiveWindAngle = Math.min(trueWindAngle, windAngle)
  const noGo = effectiveWindAngle < SAIL_TUNING.noGoAngle
  const safeAngle = clamp(finiteOr(sailAngle, SAIL_TUNING.defaultAngle), SAIL_TUNING.minAngle, SAIL_TUNING.maxAngle)
  const idealAngle = clamp(windAngle * 0.5, SAIL_TUNING.minAngle, SAIL_TUNING.maxAngle)
  const trimError = Math.abs(safeAngle - idealAngle)
  const trimEfficiency = Math.max(0, 1 - trimError / (35 * Math.PI / 180))
  const angleEfficiency = 0.35 + 0.65 * Math.sin(clamp(windAngle, 0, Math.PI))
  const trueWindEfficiency = clamp(
    (effectiveWindAngle - hardNoGoAngle)
      / (2 * SAIL_TUNING.trueWindNoGoSoftness),
    0,
    1,
  )
  const noGoBlend = trueWindEfficiency * trueWindEfficiency * (3 - 2 * trueWindEfficiency)
  const speedEfficiency = clamp(apparentSpeed / 9, 0, 1.35)
  const luffFactor = clamp(1 - Math.max(0, finiteOr(luff, 0)), 0, 1)
  const power = clamp(trimEfficiency * angleEfficiency * speedEfficiency * luffFactor * noGoBlend, 0, 1)
  const signedAngle = windSide * safeAngle
  const driveAcceleration = power * SAIL_TUNING.maxDriveAcceleration
  const lateralAcceleration = noGo
    ? 0
    : -windSide * power * SAIL_TUNING.maxLateralAcceleration * 0.5

  return {
    driveAcceleration,
    lateralAcceleration,
    power,
    suggestedAngle: idealAngle,
    signedAngle: wrapAngle(signedAngle),
    relativeWindAngle: wrapAngle(relativeWindAngle),
    noGo,
  }
}
