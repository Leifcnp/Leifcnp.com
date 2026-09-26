import type { VesselPose } from './pose.ts'

export interface VesselContactPoint {
  readonly x: number
  readonly y: number
  readonly z: number
  readonly waterHeight: number
  readonly clearance: number
  /** Positive when the sampled water surface is closing on the hull. */
  readonly closingSpeed: number
}

export interface VesselWaterContact {
  readonly bowPort: VesselContactPoint
  readonly bowStarboard: VesselContactPoint
  readonly leewardRail: VesselContactPoint
  readonly leewardSide: 'port' | 'starboard'
  readonly heelLoad: number
  readonly forwardSpeed: number
  readonly sailPower: number
  readonly relativeWindAngle: number
}

export interface VesselContactHistory {
  readonly timeSeconds: number
  readonly points: Readonly<Record<string, VesselContactPoint>>
}

export type VesselContactSampler = (x: number, z: number) => number

/** Authored hull vertices, shared by contact sampling and mesh tests. */
export const VESSEL_CONTACT_POINTS = {
  sternPort: { x: -1.3, y: 0.45, z: -2.6 },
  sternStarboard: { x: 1.3, y: 0.45, z: -2.6 },
  shoulderPort: { x: -1.17, y: 0.45, z: 1.612 },
  shoulderStarboard: { x: 1.17, y: 0.45, z: 1.612 },
  // Cutwater/chine points are the first immersed authored side vertices.
  bowPort: { x: -0.585, y: -0.55, z: 1.352 },
  bowStarboard: { x: 0.585, y: -0.55, z: 1.352 },
} as const

const DECK_EDGE_POINTS = [
  { x: -1.209, y: 0.47, z: -2.496 }, { x: 1.209, y: 0.47, z: -2.496 },
  { x: 1.16064, y: 0.47, z: 1.54752 }, { x: 0, y: 0.47, z: 2.496 },
  { x: -1.16064, y: 0.47, z: 1.54752 },
] as const
const WORKING_DECK_POINTS = [
  { x: 0, y: 0.47, z: -0.18 }, { x: 0, y: 0.465, z: -0.34 },
  { x: -0.51, y: 0.47, z: -1.24 }, { x: 0.51, y: 0.47, z: -1.24 },
  { x: -0.51, y: 0.47, z: -0.4 }, { x: 0.51, y: 0.47, z: -0.4 },
] as const
const HULL_BOTTOM_POINTS = [
  { x: -0.884, y: -0.55, z: -2.132 }, { x: 0.884, y: -0.55, z: -2.132 },
  VESSEL_CONTACT_POINTS.bowPort, VESSEL_CONTACT_POINTS.bowStarboard,
  { x: 0, y: -0.37, z: 2.236 }, { x: 0, y: -0.63, z: -0.312 },
] as const

/**
 * A vertical support interval for the currently visible pitch and roll.
 * Permit only shallow outer-edge wash, keep the working deck dry, and retain
 * an immersed hull. Calculate relative to the supplied base heave, never the
 * previous frame's heave; otherwise smoothing creates a feedback oscillator.
 */
export function calculateHullSupport(
  contact: VesselWaterContact,
  pose: VesselPose,
  waterOffset: number,
  waterSampler: VesselContactSampler,
  x: number,
  z: number,
  heading: number,
): { minimumHeave: number; maximumHeave: number; targetHeave: number } {
  const clearance = (point: LocalPoint): number => {
    const transformed = transformPoint(point, x, z, heading, pose, waterOffset)
    let water = 0
    try { water = finiteOr(waterSampler(transformed.x, transformed.z), 0) } catch { /* calm fallback */ }
    return transformed.y - water
  }
  const minimumEdge = Math.min(...DECK_EDGE_POINTS.map(clearance))
  const minimumWorkingDeck = Math.min(...WORKING_DECK_POINTS.map(clearance))
  const minimumHull = Math.min(...HULL_BOTTOM_POINTS.map(clearance))
  const rail = finiteOr(contact.leewardRail.clearance, 0)
  const minimumAdjustment = Math.max(-0.06 - minimumEdge, 0.12 - minimumWorkingDeck, -0.055 - rail)
  const maximumAdjustment = -0.025 - minimumHull
  const load = clamp(contact.heelLoad / 0.5, 0, 1)
  const easedLoad = load * load * (3 - 2 * load)
  const desiredAdjustment = -clamp(rail + 0.035, 0, 0.6) * easedLoad
  const minimumHeave = pose.heave + minimumAdjustment
  const maximumHeave = Math.max(minimumHeave, pose.heave + maximumAdjustment)
  return {
    minimumHeave,
    maximumHeave,
    targetHeave: clamp(pose.heave + desiredAdjustment, minimumHeave, maximumHeave),
  }
}

interface LocalPoint {
  readonly x: number
  readonly y: number
  readonly z: number
}

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function transformPoint(
  point: LocalPoint,
  x: number,
  z: number,
  heading: number,
  pose: VesselPose,
  waterOffset: number,
): Omit<VesselContactPoint, 'waterHeight' | 'clearance' | 'closingSpeed'> {
  const roll = finiteOr(pose?.roll, 0)
  const pitch = finiteOr(pose?.pitch, 0)
  const yaw = finiteOr(heading, 0)
  const cr = Math.cos(roll)
  const sr = Math.sin(roll)
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const xRoll = cr * point.x - sr * point.y
  const yRoll = sr * point.x + cr * point.y
  const zRoll = point.z
  const xPitch = xRoll
  const yPitch = cp * yRoll - sp * zRoll
  const zPitch = sp * yRoll + cp * zRoll
  return {
    x: finiteOr(x, 0) + cy * xPitch + sy * zPitch,
    y: finiteOr(waterOffset, 0) + finiteOr(pose?.heave, 0) + yPitch,
    z: finiteOr(z, 0) - sy * xPitch + cy * zPitch,
  }
}

/** Sample transformed rail contact against the same water field as the hull. */
export function sampleVesselWaterContact(
  x: number,
  z: number,
  heading: number,
  pose: VesselPose,
  length: number,
  width: number,
  waterOffset: number,
  forwardSpeed: number,
  timeSeconds: number,
  sampler: VesselContactSampler,
  previous?: VesselContactHistory,
  sailPower = 0,
  relativeWindAngle = 0,
): { readonly contact: VesselWaterContact; readonly history: VesselContactHistory } {
  // Keep dimensions in the signature for callers, but use the actual authored
  // vertices (the pointed bow is outside a rectangular half-width sample).
  const scaleX = Math.max(0.01, Math.abs(finiteOr(width, 2.6)) / 2.6)
  const scaleZ = Math.max(0.01, Math.abs(finiteOr(length, 5.2)) / 5.2)
  const points: Record<string, VesselContactPoint> = {}
  const safeTime = finiteOr(timeSeconds, 0)
  const delta = previous ? Math.max(0, safeTime - finiteOr(previous.timeSeconds, safeTime)) : 0
  const makePoint = (name: string, local: LocalPoint): VesselContactPoint => {
    const transformed = transformPoint(local, x, z, heading, pose, waterOffset)
    let waterHeight = 0
    try {
      waterHeight = finiteOr(sampler(transformed.x, transformed.z), 0)
    } catch {
      waterHeight = 0
    }
    const prior = previous?.points[name]
    const closingSpeed = prior && delta > 1e-6
      ? ((waterHeight - prior.waterHeight) - (transformed.y - prior.y)) / delta
      : 0
    const contact = {
      ...transformed,
      waterHeight,
      clearance: transformed.y - waterHeight,
      closingSpeed: finiteOr(closingSpeed, 0),
    }
    points[name] = contact
    return contact
  }

  const bowPort = makePoint('bowPort', { x: VESSEL_CONTACT_POINTS.bowPort.x * scaleX, y: VESSEL_CONTACT_POINTS.bowPort.y, z: VESSEL_CONTACT_POINTS.bowPort.z * scaleZ })
  const bowStarboard = makePoint('bowStarboard', { x: VESSEL_CONTACT_POINTS.bowStarboard.x * scaleX, y: VESSEL_CONTACT_POINTS.bowStarboard.y, z: VESSEL_CONTACT_POINTS.bowStarboard.z * scaleZ })
  const portRail = makePoint('portRail', {
    x: (VESSEL_CONTACT_POINTS.sternPort.x + VESSEL_CONTACT_POINTS.shoulderPort.x) * 0.5 * scaleX,
    y: 0.45,
    z: (VESSEL_CONTACT_POINTS.sternPort.z + VESSEL_CONTACT_POINTS.shoulderPort.z) * 0.5 * scaleZ,
  })
  const starboardRail = makePoint('starboardRail', {
    x: (VESSEL_CONTACT_POINTS.sternStarboard.x + VESSEL_CONTACT_POINTS.shoulderStarboard.x) * 0.5 * scaleX,
    y: 0.45,
    z: (VESSEL_CONTACT_POINTS.sternStarboard.z + VESSEL_CONTACT_POINTS.shoulderStarboard.z) * 0.5 * scaleZ,
  })
  const safePower = clamp(finiteOr(sailPower, 0), 0, 1)
  const safeWindAngle = finiteOr(relativeWindAngle, 0)
  const crosswindLoad = safePower * Math.abs(Math.sin(safeWindAngle))
  const leewardSide = Math.sin(safeWindAngle) >= 0 ? 'port' : 'starboard'
  const leewardRail = leewardSide === 'port' ? portRail : starboardRail

  return {
    contact: {
      bowPort,
      bowStarboard,
      leewardRail,
      leewardSide,
      heelLoad: clamp(crosswindLoad, 0, 1),
      forwardSpeed: finiteOr(forwardSpeed, 0),
      sailPower: safePower,
      relativeWindAngle: safeWindAngle,
    },
    history: { timeSeconds: safeTime, points },
  }
}
