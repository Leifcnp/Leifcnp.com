import { VESSEL_TUNING } from './kinematics.ts'
import { MAX_WAVE_HEIGHT } from '../waves.ts'
import { STORM_TUNING } from '../stormField.ts'

/**
 * Pure water-contact and visible pose calculations for the vessel.
 *
 * The renderer owns the Three.js group, while this module owns the sampling
 * contract and the small dynamic cues that make the hull read as connected to
 * the water. Keeping the calculation pure makes its bounds and invalid-input
 * behaviour easy to exercise without a WebGL context.
 */

export interface VesselWaterPoint {
  readonly height: number
}

export interface VesselSurfaceSamples {
  readonly bow: VesselWaterPoint
  readonly stern: VesselWaterPoint
  readonly port: VesselWaterPoint
  readonly starboard: VesselWaterPoint
  readonly bowPort: VesselWaterPoint
  readonly bowStarboard: VesselWaterPoint
  readonly sternPort: VesselWaterPoint
  readonly sternStarboard: VesselWaterPoint
}

export interface VesselPoseDynamics {
  /** Signed speed along the vessel's local +Z bow axis. */
  readonly forwardSpeed?: number
  /** Signed speed along the local +X port axis. */
  readonly lateralSpeed?: number
  /** Signed yaw rate. Positive is the existing port-turn convention. */
  readonly yawRate?: number
  /** Normalized sail loading from the apparent-wind response. */
  readonly sailPower?: number
  /** Apparent wind-from angle in local vessel coordinates. */
  readonly relativeWindAngle?: number
}

export interface VesselPose {
  readonly heave: number
  readonly pitch: number
  readonly roll: number
}

export interface SampledWaterSurface {
  readonly height: number
}

export type VesselWaterSampler = (x: number, z: number) => SampledWaterSurface

/** Visual response tuning. These values intentionally stay below a dramatic arcade tilt. */
export const VESSEL_POSE_TUNING = {
  // The storm scales the authored 1.8-unit sum up to 2.52. Keep the support
  // cap at that shared bound so a full storm crest does not flatten the hull;
  // calm-water values remain unchanged.
  maxHeave: MAX_WAVE_HEIGHT * STORM_TUNING.maxWaveScale,
  maxWavePitch: 0.29,
  maxWaveRoll: 0.3,
  maxSpeedLift: 0.065,
  maxTurnHeel: 0.12,
  /** Beam-wind sail loading produces a readable but comfortable heel. */
  maxWindHeel: 0.26,
  /** Small buoyancy correction preserves leeward freeboard under combined load. */
  maxWindHeelLift: 0.1,
  /** Fast enough to keep hull freeboard close to shorter encounter waves. */
  heaveResponseRate: 15,
  /** Tilt follows the same field with a softer filter for visual comfort. */
  tiltResponseRate: 9,
  maxForwardSpeed: VESSEL_TUNING.maxForwardSpeed,
  maxYawRate: VESSEL_TUNING.maxYawRate,
} as const

const MIN_DIMENSION = 0.01

function finiteOr(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? (value as number) : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function mean(values: readonly number[]): number {
  const total = values.reduce((sum, value) => sum + value, 0)
  return finiteOr(total / values.length, 0)
}

function weightedMean(values: readonly [number, number][]): number {
  const totalWeight = values.reduce((sum, [, weight]) => sum + weight, 0)
  const total = values.reduce((sum, [value, weight]) => sum + value * weight, 0)
  return totalWeight > 0 ? finiteOr(total / totalWeight, 0) : 0
}

function point(height: number): VesselWaterPoint {
  return { height: finiteOr(height, 0) }
}

function samplePoint(sampler: VesselWaterSampler, x: number, z: number): VesselWaterPoint {
  try {
    return point(sampler(x, z)?.height)
  } catch {
    return point(0)
  }
}

/**
 * Sample a hull-aligned set of support points from the same water field used
 * by the visible mesh. The four corner points keep a long hull from pivoting
 * around a single centre line when a short ripple crosses it.
 */
export function sampleVesselSurface(
  x: number,
  z: number,
  heading: number,
  length: number,
  width: number,
  sampler: VesselWaterSampler,
): VesselSurfaceSamples {
  const safeX = finiteOr(x, 0)
  const safeZ = finiteOr(z, 0)
  const safeHeading = finiteOr(heading, 0)
  const halfLength = Math.max(MIN_DIMENSION, Math.abs(finiteOr(length, 1)) * 0.5)
  const halfWidth = Math.max(MIN_DIMENSION, Math.abs(finiteOr(width, 1)) * 0.5)
  const cos = Math.cos(safeHeading)
  const sin = Math.sin(safeHeading)

  const sampleAt = (localX: number, localZ: number): VesselWaterPoint => samplePoint(
    sampler,
    safeX + localX * cos + localZ * sin,
    safeZ - localX * sin + localZ * cos,
  )

  return {
    bow: sampleAt(0, halfLength),
    stern: sampleAt(0, -halfLength),
    port: sampleAt(-halfWidth, 0),
    starboard: sampleAt(halfWidth, 0),
    bowPort: sampleAt(-halfWidth, halfLength),
    bowStarboard: sampleAt(halfWidth, halfLength),
    sternPort: sampleAt(-halfWidth, -halfLength),
    sternStarboard: sampleAt(halfWidth, -halfLength),
  }
}

/** Calculate a finite, bounded visible pose from water supports and vessel motion. */
export function calculateVesselPose(
  surface: VesselSurfaceSamples,
  dynamics: VesselPoseDynamics = {},
  reducedMotion = false,
): VesselPose {
  const bow = finiteOr(surface?.bow?.height, 0)
  const stern = finiteOr(surface?.stern?.height, 0)
  const port = finiteOr(surface?.port?.height, 0)
  const starboard = finiteOr(surface?.starboard?.height, 0)
  const bowPort = finiteOr(surface?.bowPort?.height, 0)
  const bowStarboard = finiteOr(surface?.bowStarboard?.height, 0)
  const sternPort = finiteOr(surface?.sternPort?.height, 0)
  const sternStarboard = finiteOr(surface?.sternStarboard?.height, 0)

  // Rails use both their centre support and the two nearby corners. This
  // keeps pitch and roll coherent when one sample happens to cross a ripple.
  const bowRail = mean([bow, bowPort, bowStarboard])
  const sternRail = mean([stern, sternPort, sternStarboard])
  const portRail = mean([port, bowPort, sternPort])
  const starboardRail = mean([starboard, bowStarboard, sternStarboard])
  const heave = clamp(
    weightedMean([
      [bow, 1],
      [stern, 1],
      [port, 1],
      [starboard, 1],
      [bowPort, 0.5],
      [bowStarboard, 0.5],
      [sternPort, 0.5],
      [sternStarboard, 0.5],
    ]),
    -VESSEL_POSE_TUNING.maxHeave,
    VESSEL_POSE_TUNING.maxHeave,
  )

  const wavePitch = clamp(
    -Math.atan2(finiteOr(bowRail - sternRail, 0), VESSEL_TUNING.length),
    -VESSEL_POSE_TUNING.maxWavePitch,
    VESSEL_POSE_TUNING.maxWavePitch,
  )
  const waveRoll = clamp(
    Math.atan2(finiteOr(starboardRail - portRail, 0), VESSEL_TUNING.width),
    -VESSEL_POSE_TUNING.maxWaveRoll,
    VESSEL_POSE_TUNING.maxWaveRoll,
  )

  const forwardSpeed = finiteOr(dynamics?.forwardSpeed, 0)
  const yawRate = finiteOr(dynamics?.yawRate, 0)
  const sailPower = clamp(finiteOr(dynamics?.sailPower, 0), 0, 1)
  const relativeWindAngle = finiteOr(dynamics?.relativeWindAngle, 0)
  const speedRatio = clamp(forwardSpeed / VESSEL_POSE_TUNING.maxForwardSpeed, 0, 1)
  const turnRatio = clamp(
    (yawRate / VESSEL_POSE_TUNING.maxYawRate) * Math.min(1, Math.abs(forwardSpeed) / VESSEL_POSE_TUNING.maxForwardSpeed),
    -1,
    1,
  )
  const dynamicScale = reducedMotion ? 0 : 1

  // Ahead speed lifts the bow a little; reverse travel does not ask the bow
  // to rise. Positive yaw is a port turn, so the outward starboard side sinks.
  const speedLift = speedRatio * speedRatio * VESSEL_POSE_TUNING.maxSpeedLift * dynamicScale
  const turnHeel = -turnRatio * VESSEL_POSE_TUNING.maxTurnHeel * dynamicScale
  // Positive local +X apparent wind (the repository's port side) rolls the
  // vessel toward -X, represented by positive Z rotation. The crosswind
  // component therefore mirrors cleanly across tacks and fades downwind.
  const windHeel = Math.sin(relativeWindAngle) * sailPower * VESSEL_POSE_TUNING.maxWindHeel * dynamicScale

  const heelLift = Math.abs(windHeel) / VESSEL_POSE_TUNING.maxWindHeel * VESSEL_POSE_TUNING.maxWindHeelLift

  return {
    heave: clamp(heave + heelLift, -VESSEL_POSE_TUNING.maxHeave, VESSEL_POSE_TUNING.maxHeave),
    pitch: clamp(wavePitch - speedLift, -0.36, 0.36),
    roll: clamp(waveRoll + turnHeel + windHeel, -0.4, 0.4),
  }
}
