/**
 * Pure horizontal vessel kinematics.
 *
 * The vessel's local +Z axis points toward its bow. Heading zero therefore
 * points along world +Z, and increasing heading rotates the bow toward +X.
 * This module deliberately has no Three.js or rendering dependencies so the
 * movement contract can be exercised independently of the scene.
 */

export interface VesselInput {
  /** -1 is full reverse, +1 is full ahead. */
  readonly throttle: number
  /** -1 is left/port, +1 is right/starboard. */
  readonly rudder: number
  readonly brake: boolean
}

export interface VesselState {
  readonly x: number
  readonly z: number
  readonly velocityX: number
  readonly velocityZ: number
  /** Radians. Zero points toward world +Z; positive rotates toward +X. */
  readonly heading: number
  /** Radians per second about world +Y. */
  readonly yawRate: number
}

export interface VesselObstacle {
  readonly x: number
  readonly z: number
  readonly radius: number
}

export interface VesselEnvironment {
  /** The playable water square extends from -worldLimit to +worldLimit. */
  readonly worldLimit: number
  readonly obstacles: readonly VesselObstacle[]
}

/** Tunable dimensions and coefficients for the temporary block vessel. */
export const VESSEL_TUNING = {
  length: 5.2,
  width: 2.6,
  height: 1.2,
  // Slightly larger than the hull's horizontal half-diagonal (about 2.9).
  collisionRadius: 3.2,
  maxForwardSpeed: 14,
  maxReverseSpeed: 7,
  maxLateralSpeed: 6,
  forwardAcceleration: 9,
  reverseAcceleration: 5,
  brakingAcceleration: 15,
  longitudinalDrag: 0.35,
  lateralDrag: 3.5,
  maxYawRate: 0.6,
  yawResponse: 4,
} as const

const DEFAULT_WORLD_LIMIT = 180
const MAX_SIMULATION_DT = 0.25
const MAX_SUBSTEP = 1 / 120
const MIN_SPEED = 1e-7

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function safeInput(input: VesselInput): VesselInput {
  return {
    throttle: clamp(finiteOr(input?.throttle ?? 0, 0), -1, 1),
    rudder: clamp(finiteOr(input?.rudder ?? 0, 0), -1, 1),
    brake: input?.brake === true,
  }
}

function wrapHeading(heading: number): number {
  const wrapped = (heading + Math.PI) % (Math.PI * 2)
  return wrapped < 0 ? wrapped + Math.PI * 2 - Math.PI : wrapped - Math.PI
}

function safeState(state: VesselState): VesselState {
  return {
    x: finiteOr(state?.x ?? 0, 0),
    z: finiteOr(state?.z ?? 0, 0),
    velocityX: finiteOr(state?.velocityX ?? 0, 0),
    velocityZ: finiteOr(state?.velocityZ ?? 0, 0),
    heading: wrapHeading(finiteOr(state?.heading ?? 0, 0)),
    yawRate: clamp(finiteOr(state?.yawRate ?? 0, 0), -VESSEL_TUNING.maxYawRate, VESSEL_TUNING.maxYawRate),
  }
}

function environmentLimit(environment: VesselEnvironment): number {
  const limit = finiteOr(environment?.worldLimit ?? DEFAULT_WORLD_LIMIT, DEFAULT_WORLD_LIMIT)
  return limit > 0 ? limit : DEFAULT_WORLD_LIMIT
}

function resolveWorldBounds(
  x: number,
  z: number,
  velocityX: number,
  velocityZ: number,
  limit: number,
): [number, number, number, number] {
  const bound = Math.max(0, limit - VESSEL_TUNING.collisionRadius)

  if (x > bound) {
    x = bound
    if (velocityX > 0) velocityX = 0
  } else if (x < -bound) {
    x = -bound
    if (velocityX < 0) velocityX = 0
  }

  if (z > bound) {
    z = bound
    if (velocityZ > 0) velocityZ = 0
  } else if (z < -bound) {
    z = -bound
    if (velocityZ < 0) velocityZ = 0
  }

  return [x, z, velocityX, velocityZ]
}

function resolveObstacles(
  x: number,
  z: number,
  velocityX: number,
  velocityZ: number,
  obstacles: readonly VesselObstacle[],
): [number, number, number, number] {
  for (const obstacle of obstacles) {
    const obstacleX = finiteOr(obstacle?.x ?? 0, 0)
    const obstacleZ = finiteOr(obstacle?.z ?? 0, 0)
    const obstacleRadius = finiteOr(obstacle?.radius ?? 0, 0)
    if (obstacleRadius <= 0) continue

    const minimumDistance = VESSEL_TUNING.collisionRadius + obstacleRadius
    const offsetX = x - obstacleX
    const offsetZ = z - obstacleZ
    const distance = Math.hypot(offsetX, offsetZ)
    if (distance >= minimumDistance) continue

    let normalX: number
    let normalZ: number
    if (distance > MIN_SPEED) {
      normalX = offsetX / distance
      normalZ = offsetZ / distance
    } else {
      // If spawned inside an obstacle, push opposite the current travel
      // direction when possible. A fixed normal keeps the stationary case
      // deterministic and, importantly, finite.
      const velocityMagnitude = Math.hypot(velocityX, velocityZ)
      if (velocityMagnitude > MIN_SPEED) {
        normalX = -velocityX / velocityMagnitude
        normalZ = -velocityZ / velocityMagnitude
      } else {
        normalX = 1
        normalZ = 0
      }
    }

    x = obstacleX + normalX * minimumDistance
    z = obstacleZ + normalZ * minimumDistance

    // Remove only velocity directed into the obstacle; tangential movement
    // remains available for steering along an island edge.
    const inwardVelocity = velocityX * normalX + velocityZ * normalZ
    if (inwardVelocity < 0) {
      velocityX -= inwardVelocity * normalX
      velocityZ -= inwardVelocity * normalZ
    }
  }

  return [x, z, velocityX, velocityZ]
}

function resolveEnvironment(
  x: number,
  z: number,
  velocityX: number,
  velocityZ: number,
  environment: VesselEnvironment,
): [number, number, number, number] {
  const limit = environmentLimit(environment)
  const obstacles = Array.isArray(environment?.obstacles) ? environment.obstacles : []

  // Two passes keep a large island push-out from placing the vessel beyond
  // the playable edge, while also handling an obstacle that touches an edge.
  for (let pass = 0; pass < 2; pass += 1) {
    ;[x, z, velocityX, velocityZ] = resolveWorldBounds(x, z, velocityX, velocityZ, limit)
    ;[x, z, velocityX, velocityZ] = resolveObstacles(x, z, velocityX, velocityZ, obstacles)
  }
  ;[x, z, velocityX, velocityZ] = resolveWorldBounds(x, z, velocityX, velocityZ, limit)
  return [x, z, velocityX, velocityZ]
}

function integrateSubstep(
  state: VesselState,
  input: VesselInput,
  dt: number,
  environment: VesselEnvironment,
): VesselState {
  const sinHeading = Math.sin(state.heading)
  const cosHeading = Math.cos(state.heading)

  // Local +Z is forward. Local +X is the lateral axis; the basis below keeps
  // its world-space sign consistent with the heading convention.
  let longitudinalVelocity = state.velocityX * sinHeading + state.velocityZ * cosHeading
  let lateralVelocity = state.velocityX * cosHeading - state.velocityZ * sinHeading

  longitudinalVelocity *= Math.exp(-VESSEL_TUNING.longitudinalDrag * dt)
  lateralVelocity *= Math.exp(-VESSEL_TUNING.lateralDrag * dt)

  const thrust = input.throttle >= 0
    ? input.throttle * VESSEL_TUNING.forwardAcceleration
    : input.throttle * VESSEL_TUNING.reverseAcceleration
  longitudinalVelocity += thrust * dt

  if (input.brake) {
    const brakingDirection = Math.sign(longitudinalVelocity) || Math.sign(thrust)
    const brakingAmount = VESSEL_TUNING.brakingAcceleration * dt
    if (brakingDirection !== 0) {
      longitudinalVelocity = Math.abs(longitudinalVelocity) <= brakingAmount
        ? 0
        : longitudinalVelocity - brakingDirection * brakingAmount
    }
  }

  longitudinalVelocity = clamp(
    longitudinalVelocity,
    -VESSEL_TUNING.maxReverseSpeed,
    VESSEL_TUNING.maxForwardSpeed,
  )
  lateralVelocity = clamp(lateralVelocity, -VESSEL_TUNING.maxLateralSpeed, VESSEL_TUNING.maxLateralSpeed)

  const nextVelocityX = longitudinalVelocity * sinHeading + lateralVelocity * cosHeading
  const nextVelocityZ = longitudinalVelocity * cosHeading - lateralVelocity * sinHeading

  // A rudder command asks for a target yaw rate. Its sign follows the
  // physical travel direction: starboard rudder is negative yaw ahead and
  // positive yaw while backing. Throttle gives limited low-speed authority.
  const travelDirection = Math.abs(longitudinalVelocity) > MIN_SPEED
    ? Math.sign(longitudinalVelocity)
    : Math.sign(input.throttle)
  const speedReference = travelDirection < 0 ? VESSEL_TUNING.maxReverseSpeed : VESSEL_TUNING.maxForwardSpeed
  const speedResponse = clamp(Math.abs(longitudinalVelocity) / speedReference, 0, 1)
  const lowSpeedAuthority = travelDirection === 0 ? 0 : 0.12 + speedResponse * 0.88
  const targetYawRate = -input.rudder * travelDirection * VESSEL_TUNING.maxYawRate * lowSpeedAuthority
  const yawBlend = 1 - Math.exp(-VESSEL_TUNING.yawResponse * dt)
  const yawRate = clamp(
    state.yawRate + (targetYawRate - state.yawRate) * yawBlend,
    -VESSEL_TUNING.maxYawRate,
    VESSEL_TUNING.maxYawRate,
  )
  const heading = wrapHeading(state.heading + yawRate * dt)

  let [x, z, velocityX, velocityZ] = resolveEnvironment(
    state.x + nextVelocityX * dt,
    state.z + nextVelocityZ * dt,
    nextVelocityX,
    nextVelocityZ,
    environment,
  )

  return { x, z, velocityX, velocityZ, heading, yawRate }
}

/** Create a stationary, forward-facing vessel state. */
export function createVesselState(x = 0, z = 0): VesselState {
  return {
    x: finiteOr(x, 0),
    z: finiteOr(z, 0),
    velocityX: 0,
    velocityZ: 0,
    heading: 0,
    yawRate: 0,
  }
}

/**
 * Advance a vessel without mutating its input state or environment.
 * Invalid/negative dt is treated as zero; very long frames are capped and
 * internally split into fixed-sized substeps for stable feel across rates.
 */
export function stepVessel(
  state: VesselState,
  input: VesselInput,
  dt: number,
  environment: VesselEnvironment,
): VesselState {
  const initial = safeState(state)
  const controls = safeInput(input)
  const validDt = Number.isFinite(dt) && dt > 0 ? Math.min(dt, MAX_SIMULATION_DT) : 0

  let next = resolveEnvironment(initial.x, initial.z, initial.velocityX, initial.velocityZ, environment)
  let integratedState: VesselState = {
    x: next[0],
    z: next[1],
    velocityX: next[2],
    velocityZ: next[3],
    heading: initial.heading,
    yawRate: initial.yawRate,
  }

  let remaining = validDt
  while (remaining > 0) {
    const substep = Math.min(remaining, MAX_SUBSTEP)
    integratedState = integrateSubstep(integratedState, controls, substep, environment)
    remaining -= substep
  }

  return integratedState
}
