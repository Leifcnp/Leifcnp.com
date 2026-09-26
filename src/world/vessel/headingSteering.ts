import type { VesselState } from './kinematics.ts'

export const HEADING_STEERING_TUNING = {
  gain: 2.5,
  yawDamping: 1.0,
  deadband: 0.01,
} as const

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

/** Convert a desired world heading into the existing rudder sign convention. */
export function calculateHeadingRudder(
  state: Pick<VesselState, 'heading' | 'yawRate'> & Partial<Pick<VesselState, 'velocityX' | 'velocityZ'>>,
  targetHeading: number,
): number {
  const currentHeading = finiteOr(state?.heading ?? 0, 0)
  const error = wrapAngle(finiteOr(targetHeading, currentHeading) - currentHeading)
  if (Math.abs(error) <= HEADING_STEERING_TUNING.deadband) return 0
  const desiredYaw = error * HEADING_STEERING_TUNING.gain
    - finiteOr(state?.yawRate ?? 0, 0) * HEADING_STEERING_TUNING.yawDamping
  const heading = currentHeading
  const forwardSpeed = finiteOr(state?.velocityX ?? 0, 0) * Math.sin(heading)
    + finiteOr(state?.velocityZ ?? 0, 0) * Math.cos(heading)
  const travelDirection = forwardSpeed < -0.6 ? -1 : 1
  // Positive rudder is the existing negative-yaw helm direction.
  return clamp(-desiredYaw / travelDirection, -1, 1)
}
