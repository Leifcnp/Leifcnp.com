import { sampleWaterHeight } from './waves.ts'

/** Geometry limits and cell sizes shared by the rendered ocean and samplers. */
export const OCEAN_SURFACE_TUNING = {
  centralLimit: 180,
  outerLimit: 360,
  centralStep: 4,
  outerStep: 12,
} as const

/** Return the ordered world-space coordinates used by the ocean mesh. */
export function createWaterSurfaceAxis(): readonly number[] {
  const values: number[] = []
  for (let value = -OCEAN_SURFACE_TUNING.outerLimit; value < -OCEAN_SURFACE_TUNING.centralLimit; value += OCEAN_SURFACE_TUNING.outerStep) {
    values.push(value)
  }
  for (let value = -OCEAN_SURFACE_TUNING.centralLimit; value <= OCEAN_SURFACE_TUNING.centralLimit; value += OCEAN_SURFACE_TUNING.centralStep) {
    values.push(value)
  }
  for (let value = OCEAN_SURFACE_TUNING.centralLimit + OCEAN_SURFACE_TUNING.outerStep; value <= OCEAN_SURFACE_TUNING.outerLimit; value += OCEAN_SURFACE_TUNING.outerStep) {
    values.push(value)
  }
  return values
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback
}

function lowerCellIndex(axis: readonly number[], value: number): number {
  let low = 0
  let high = axis.length - 1
  while (high - low > 1) {
    const middle = Math.floor((low + high) * 0.5)
    if (axis[middle] <= value) low = middle
    else high = middle
  }
  return low
}

const WATER_SURFACE_AXIS = createWaterSurfaceAxis()

/**
 * Sample the rendered low-poly surface rather than the continuous wave field.
 * The mesh uses the same alternating diagonals in every cell, so vessel
 * contacts agree with the visible triangle at the point being sampled.
 */
export function sampleFacetedWaterHeight(x: number, z: number, timeSeconds = 0): number {
  return sampleSurfaceHeight(x, z, timeSeconds)
}

/** Read already-updated interleaved XYZ vertices, using the same triangles. */
export function sampleRenderedWaterHeight(x: number, z: number, positions: ArrayLike<number>): number {
  return sampleSurfaceHeight(x, z, 0, positions)
}

function sampleSurfaceHeight(x: number, z: number, timeSeconds: number, positions?: ArrayLike<number>): number {
  const axis = WATER_SURFACE_AXIS
  const worldX = clamp(finiteOr(x, 0), -OCEAN_SURFACE_TUNING.outerLimit, OCEAN_SURFACE_TUNING.outerLimit)
  const worldZ = clamp(finiteOr(z, 0), -OCEAN_SURFACE_TUNING.outerLimit, OCEAN_SURFACE_TUNING.outerLimit)
  const row = lowerCellIndex(axis, worldZ)
  const column = lowerCellIndex(axis, worldX)
  const x0 = axis[column]
  const x1 = axis[column + 1]
  const z0 = axis[row]
  const z1 = axis[row + 1]
  const u = x1 > x0 ? (worldX - x0) / (x1 - x0) : 0
  const v = z1 > z0 ? (worldZ - z0) / (z1 - z0) : 0
  const vertex = row * axis.length + column
  const topLeft = positions ? positions[vertex * 3 + 1] : sampleWaterHeight(x0, z0, timeSeconds)
  const topRight = positions ? positions[(vertex + 1) * 3 + 1] : sampleWaterHeight(x1, z0, timeSeconds)
  const bottomLeft = positions ? positions[(vertex + axis.length) * 3 + 1] : sampleWaterHeight(x0, z1, timeSeconds)
  const bottomRight = positions ? positions[(vertex + axis.length + 1) * 3 + 1] : sampleWaterHeight(x1, z1, timeSeconds)
  if ((row + column) % 2 === 0) {
    if (u + v <= 1) return topLeft + v * (bottomLeft - topLeft) + u * (topRight - topLeft)
    return bottomRight + (1 - u) * (bottomLeft - bottomRight) + (1 - v) * (topRight - bottomRight)
  }
  if (v >= u) return topLeft + v * (bottomLeft - topLeft) + u * (bottomRight - bottomLeft)
  return topLeft + v * (bottomRight - topRight) + u * (topRight - topLeft)
}
