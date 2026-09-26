import { calculateSailResponse, SAIL_TUNING } from './sailResponse.ts'
import type { VesselState } from './kinematics.ts'

export type TrimAssistMode = 'auto' | 'manual'

export interface TrimAssistState {
  readonly sailAngle: number
  readonly mode: TrimAssistMode
  readonly engaged: boolean
  readonly efficiency: number
  readonly sweetSpot: boolean
  /** Normalized active boost amount, 0..1. */
  readonly boost: number
  readonly boostSerial: number
  readonly stableSeconds: number
  readonly cooldownSeconds: number
  readonly boostArmed: boolean
}

export interface TrimAssistInput {
  readonly sheet: number
  readonly engage: boolean
  readonly resumeAuto: boolean
  readonly suppressed: boolean
}

export const TRIM_ASSIST_TUNING = {
  targetEfficiency: 0.75,
  assistRate: 25 * Math.PI / 180,
  boostMinSpeed: 1.5,
  boostStableSeconds: 0.35,
  boostDurationSeconds: 1.4,
  boostCooldownSeconds: 5,
  boostBonusFraction: SAIL_TUNING.manualBoostFraction,
  sweetSpotEnter: 0.9,
  sweetSpotExit: 0.78,
} as const

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function stepToward(value: number, target: number, amount: number): number {
  return value < target ? Math.min(value + amount, target) : Math.max(value - amount, target)
}

function cleanAngle(angle: number): number {
  return clamp(finiteOr(angle, SAIL_TUNING.defaultAngle), SAIL_TUNING.minAngle, SAIL_TUNING.maxAngle)
}

function availableEfficiency(vessel: VesselState): { readonly idealAngle: number; readonly peak: number } {
  const suggested = calculateSailResponse(vessel, SAIL_TUNING.defaultAngle).suggestedAngle
  const response = calculateSailResponse(vessel, suggested)
  return { idealAngle: cleanAngle(suggested), peak: response.power }
}

function assistTarget(vessel: VesselState): { readonly angle: number; readonly efficiency: number } {
  const available = availableEfficiency(vessel)
  if (available.peak <= 1e-6) return { angle: cleanAngle(available.idealAngle), efficiency: 0 }
  const targetPower = available.peak * TRIM_ASSIST_TUNING.targetEfficiency
  let low = available.idealAngle
  let high = SAIL_TUNING.maxAngle
  // Prefer the eased branch, where the boom movement is most readable.
  const easedBranch = calculateSailResponse(vessel, high).power <= targetPower
  if (!easedBranch) {
    low = SAIL_TUNING.minAngle
    high = available.idealAngle
  }
  for (let index = 0; index < 8; index += 1) {
    const middle = (low + high) * 0.5
    const power = calculateSailResponse(vessel, middle).power
    if (easedBranch) {
      if (power > targetPower) low = middle
      else high = middle
    } else if (power > targetPower) high = middle
    else low = middle
  }
  const angle = (low + high) * 0.5
  const power = calculateSailResponse(vessel, angle).power
  return { angle, efficiency: power / available.peak }
}

export function createTrimAssistState(): TrimAssistState {
  return {
    sailAngle: SAIL_TUNING.defaultAngle,
    mode: 'auto',
    engaged: false,
    efficiency: 0,
    sweetSpot: false,
    boost: 0,
    boostSerial: 0,
    stableSeconds: 0,
    cooldownSeconds: 0,
    boostArmed: true,
  }
}

export function clearTrimBoost(state: TrimAssistState): TrimAssistState {
  return {
    ...state,
    boost: 0,
    sweetSpot: false,
    stableSeconds: 0,
    cooldownSeconds: Math.max(
      finiteOr(state?.cooldownSeconds ?? 0, 0),
      TRIM_ASSIST_TUNING.boostCooldownSeconds,
    ),
    boostArmed: false,
  }
}

export function stepTrimAssist(
  state: TrimAssistState,
  vessel: VesselState,
  input: TrimAssistInput,
  dt: number,
): TrimAssistState {
  const safeDt = Number.isFinite(dt) && dt > 0 ? Math.min(dt, 0.25) : 0
  const sheet = clamp(finiteOr(input?.sheet ?? 0, 0), -1, 1)
  const manual = Math.abs(sheet) > 1e-4
  let mode: TrimAssistMode = state?.mode === 'manual' ? 'manual' : 'auto'
  let engaged = state?.engaged === true
  let sailAngle = cleanAngle(state?.sailAngle ?? SAIL_TUNING.defaultAngle)
  let cooldownSeconds = Math.max(0, finiteOr(state?.cooldownSeconds ?? 0, 0) - safeDt)
  let boost = clamp(finiteOr(state?.boost ?? 0, 0), 0, 1)
  let boostSerial = Math.max(0, Math.floor(finiteOr(state?.boostSerial ?? 0, 0)))
  let stableSeconds = Math.max(0, finiteOr(state?.stableSeconds ?? 0, 0))
  let boostArmed = state?.boostArmed !== false

  if (manual) {
    mode = 'manual'
    engaged = true
    sailAngle = cleanAngle(sailAngle + sheet * SAIL_TUNING.trimRate * safeDt)
  } else if (input?.resumeAuto === true) {
    mode = 'auto'
    engaged = true
    boost = 0
    stableSeconds = 0
  } else if (input?.engage === true) {
    engaged = true
  }

  const response = calculateSailResponse(vessel, sailAngle)
  if (input?.suppressed === true) {
    boost = 0
    stableSeconds = 0
  }

  // The assist may optimize a reach, but it never trims itself into irons.
  const available = availableEfficiency(vessel)
  let efficiency = available.peak > 1e-6 ? response.power / available.peak : 0
  let sweetSpot = state?.sweetSpot === true
  if (input?.resumeAuto === true) sweetSpot = false
  if (efficiency < TRIM_ASSIST_TUNING.sweetSpotExit) sweetSpot = false
  else if (efficiency >= TRIM_ASSIST_TUNING.sweetSpotEnter) sweetSpot = true
  if (mode === 'auto' && engaged && input?.suppressed !== true) {
    const target = assistTarget(vessel)
    sailAngle = stepToward(sailAngle, target.angle, TRIM_ASSIST_TUNING.assistRate * safeDt)
    const assistedResponse = calculateSailResponse(vessel, sailAngle)
    efficiency = available.peak > 1e-6 ? assistedResponse.power / available.peak : 0
    sweetSpot = false
    boost = 0
    stableSeconds = 0
  } else {
    if (efficiency < TRIM_ASSIST_TUNING.sweetSpotExit) {
      sweetSpot = false
      boostArmed = true
      stableSeconds = 0
    }
    const heading = finiteOr(vessel.heading, 0)
    const forwardSpeed = vessel.velocityX * Math.sin(heading) + vessel.velocityZ * Math.cos(heading)
    const stable = mode === 'manual' && !input?.suppressed && !response.noGo
      && forwardSpeed >= TRIM_ASSIST_TUNING.boostMinSpeed && sweetSpot
    stableSeconds = stable ? stableSeconds + safeDt : 0
    if (boost > 0) {
      boost = Math.max(0, boost - safeDt / TRIM_ASSIST_TUNING.boostDurationSeconds)
      if (!stable || response.noGo || input?.suppressed) boost = 0
      if (boost === 0) cooldownSeconds = TRIM_ASSIST_TUNING.boostCooldownSeconds
    } else if (stable && boostArmed && stableSeconds >= TRIM_ASSIST_TUNING.boostStableSeconds && cooldownSeconds <= 0) {
      boost = 1
      boostSerial += 1
      stableSeconds = 0
      boostArmed = false
    }
  }

  return {
    sailAngle: cleanAngle(sailAngle),
    mode,
    engaged,
    efficiency: clamp(finiteOr(efficiency, 0), 0, 1),
    sweetSpot,
    boost: clamp(boost, 0, 1),
    boostSerial,
    stableSeconds,
    cooldownSeconds,
    boostArmed,
  }
}
