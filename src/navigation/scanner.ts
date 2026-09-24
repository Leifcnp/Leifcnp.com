import type { NavigationPoint } from './routePlanner'

export type ScannerStatus = 'idle' | 'active' | 'arrived' | 'cancelled' | 'failed'

export interface ScannerPose extends NavigationPoint {
  readonly heading: number
}

export interface ScannerState extends ScannerPose {
  readonly status: ScannerStatus
  readonly islandId: string | null
  readonly route: readonly NavigationPoint[]
  readonly elapsed: number
  readonly duration: number
  readonly travelledDistance: number
  readonly totalDistance: number
  readonly velocityX: number
  readonly velocityZ: number
  readonly reason: string | null
}

export interface ScannerStartRequest {
  readonly islandId: string
  readonly route: readonly NavigationPoint[]
}

export interface ScannerOptions {
  readonly duration?: number
  readonly maxSpeed?: number
}

const MIN_DURATION = 0.8
const MAX_DURATION = 12
const DEFAULT_MAX_SPEED = 16
// Instant navigation can advance the remaining duration in one bounded update.
// The world adapter supplies fixed active-time steps and discards hidden time.
const MAX_DELTA = 60
const MIN_DISTANCE = 1e-7
const ROUTE_START_TOLERANCE = 0.01

function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function wrapHeading(heading: number): number {
  const wrapped = (heading + Math.PI) % (Math.PI * 2)
  return wrapped < 0 ? wrapped + Math.PI * 2 - Math.PI : wrapped - Math.PI
}

function angleDelta(from: number, to: number): number {
  return wrapHeading(to - from)
}

function distance(first: NavigationPoint, second: NavigationPoint): number {
  return Math.hypot(first.x - second.x, first.z - second.z)
}

function totalDistance(route: readonly NavigationPoint[]): number {
  let total = 0
  for (let index = 1; index < route.length; index += 1) total += distance(route[index - 1], route[index])
  return total
}

function copyPoint(point: NavigationPoint): NavigationPoint {
  return { x: point.x, z: point.z }
}

function safePose(pose: ScannerPose): ScannerPose {
  return {
    x: finite(pose?.x) ? pose.x : 0,
    z: finite(pose?.z) ? pose.z : 0,
    heading: wrapHeading(finite(pose?.heading) ? pose.heading : 0),
  }
}

function snapshotFromPose(pose: ScannerPose): ScannerState {
  const safe = safePose(pose)
  return {
    ...safe,
    status: 'idle',
    islandId: null,
    route: [],
    elapsed: 0,
    duration: 0,
    travelledDistance: 0,
    totalDistance: 0,
    velocityX: 0,
    velocityZ: 0,
    reason: null,
  }
}

export function createScannerState(pose: ScannerPose = { x: 0, z: 0, heading: 0 }): ScannerState {
  return snapshotFromPose(pose)
}

function withReason(state: ScannerState, status: ScannerStatus, reason: string | null): ScannerState {
  return { ...state, status, reason, velocityX: 0, velocityZ: 0 }
}

function routePointAtDistance(route: readonly NavigationPoint[], targetDistance: number): { point: NavigationPoint; heading: number } {
  if (route.length === 0) return { point: { x: 0, z: 0 }, heading: 0 }
  if (route.length === 1) return { point: copyPoint(route[0]), heading: 0 }
  let remaining = Math.max(0, targetDistance)
  for (let index = 1; index < route.length; index += 1) {
    const start = route[index - 1]
    const end = route[index]
    const segmentLength = distance(start, end)
    if (remaining <= segmentLength || index === route.length - 1) {
      const ratio = segmentLength > MIN_DISTANCE ? clamp(remaining / segmentLength, 0, 1) : 1
      return {
        point: { x: start.x + (end.x - start.x) * ratio, z: start.z + (end.z - start.z) * ratio },
        heading: Math.atan2(end.x - start.x, end.z - start.z),
      }
    }
    remaining -= segmentLength
  }
  const last = route[route.length - 1]
  const before = route[route.length - 2]
  return { point: copyPoint(last), heading: Math.atan2(last.x - before.x, last.z - before.z) }
}

function easedProgress(progress: number): number {
  const t = clamp(progress, 0, 1)
  return t * t * (3 - 2 * t)
}

export function startScan(
  state: ScannerState,
  request: ScannerStartRequest,
  options: ScannerOptions = {},
): ScannerState {
  const current = state ?? createScannerState()
  const rawRoute = request?.route
  const routeIsValid = Array.isArray(rawRoute) && rawRoute.every((point) => finite(point?.x) && finite(point?.z))
  const route = routeIsValid ? rawRoute.map(copyPoint) : []
  if (!request?.islandId || !routeIsValid || route.length === 0) {
    return withReason({ ...current, islandId: request?.islandId ?? null, route }, 'failed', 'Scanner route is empty or invalid.')
  }
  if (distance(current, route[0]) > ROUTE_START_TOLERANCE) {
    return withReason({ ...current, islandId: request.islandId, route }, 'failed', 'Scanner route does not start at the vessel position.')
  }
  const total = totalDistance(route)
  if (total <= MIN_DISTANCE) {
    return withReason({ ...current, islandId: request.islandId, route, x: route[route.length - 1].x, z: route[route.length - 1].z }, 'arrived', null)
  }
  const maxSpeed = finite(options.maxSpeed) && options.maxSpeed > 0 ? options.maxSpeed : DEFAULT_MAX_SPEED
  const derivedDuration = clamp(total / maxSpeed, MIN_DURATION, MAX_DURATION)
  const duration = finite(options.duration) && options.duration > 0 ? clamp(options.duration, MIN_DURATION, MAX_DURATION) : derivedDuration
  const start = safePose(current)
  return {
    ...current,
    ...start,
    x: route[0].x,
    z: route[0].z,
    heading: wrapHeading(start.heading),
    status: 'active',
    islandId: request.islandId,
    route,
    elapsed: 0,
    duration,
    travelledDistance: 0,
    totalDistance: total,
    velocityX: 0,
    velocityZ: 0,
    reason: null,
  }
}

/** Cancel/restart is caller-owned; this function only freezes the current pose. */
export function cancelScan(state: ScannerState, reason = 'Scanner cancelled by user.'): ScannerState {
  return withReason({ ...state }, 'cancelled', reason)
}

export function advanceScan(state: ScannerState, deltaSeconds: number): ScannerState {
  if (!state || state.status !== 'active') return state
  const delta = finite(deltaSeconds) ? clamp(deltaSeconds, 0, MAX_DELTA) : 0
  const nextElapsed = Math.min(state.duration, state.elapsed + delta)
  const progress = state.duration > 0 ? nextElapsed / state.duration : 1
  const eased = easedProgress(progress)
  const travelledDistance = state.totalDistance * eased
  const target = routePointAtDistance(state.route, travelledDistance)
  const previous = { x: state.x, z: state.z }
  const velocityX = delta > 0 ? (target.point.x - previous.x) / delta : 0
  const velocityZ = delta > 0 ? (target.point.z - previous.z) / delta : 0
  // Interpolate only the heading; position follows the safe route exactly.
  // This prevents a sharp camera snap at a waypoint while guaranteeing the
  // target segment's bearing by the final frame.
  const headingBlend = progress >= 1 ? 1 : clamp(delta * 5.5, 0, 1)
  const heading = wrapHeading(state.heading + angleDelta(state.heading, target.heading) * headingBlend)
  if (progress >= 1 - Number.EPSILON) {
    return {
      ...state,
      x: state.route[state.route.length - 1].x,
      z: state.route[state.route.length - 1].z,
      heading: wrapHeading(target.heading),
      elapsed: state.duration,
      travelledDistance: state.totalDistance,
      status: 'arrived',
      velocityX: 0,
      velocityZ: 0,
      reason: null,
    }
  }
  return {
    ...state,
    x: target.point.x,
    z: target.point.z,
    heading,
    elapsed: nextElapsed,
    travelledDistance,
    velocityX,
    velocityZ,
  }
}

export function scannerIsActive(state: ScannerState): boolean {
  return state.status === 'active'
}
