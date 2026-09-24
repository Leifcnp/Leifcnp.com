/**
 * The deterministic water field shared by the renderer and vessel buoyancy.
 * All callers use world-space X/Z coordinates and seconds for time.
 */
export function sampleWaterHeight(x: number, z: number, timeSeconds = 0): number {
  const time = timeSeconds;
  const longSwell = Math.sin(x * 0.075 + time * 0.42) * 0.62;
  const crossSwell = Math.cos(z * 0.1 - time * 0.32) * 0.38;
  const diagonalRipple = Math.sin((x + z) * 0.16 + time * 0.56) * 0.16;
  const counterRipple = Math.cos((x - z) * 0.21 - time * 0.44) * 0.08;

  return longSwell + crossSwell + diagonalRipple + counterRipple;
}

export interface WaterSample {
  readonly height: number;
  readonly slopeX: number;
  readonly slopeZ: number;
  /** Vertical surface velocity, in world units per second. */
  readonly velocityY: number;
}

/** Sample height and finite-difference slopes from the same wave function. */
export function sampleWaterSurface(
  x: number,
  z: number,
  timeSeconds = 0,
  sampleDistance = 0.35,
): WaterSample {
  const distance = Number.isFinite(sampleDistance)
    ? Math.max(0.01, sampleDistance)
    : 0.35;
  const longPhase = x * 0.075 + timeSeconds * 0.42;
  const crossPhase = z * 0.1 - timeSeconds * 0.32;
  const diagonalPhase = (x + z) * 0.16 + timeSeconds * 0.56;
  const counterPhase = (x - z) * 0.21 - timeSeconds * 0.44;
  return {
    height: sampleWaterHeight(x, z, timeSeconds),
    slopeX:
      (sampleWaterHeight(x + distance, z, timeSeconds) -
        sampleWaterHeight(x - distance, z, timeSeconds)) /
      (distance * 2),
    slopeZ:
      (sampleWaterHeight(x, z + distance, timeSeconds) -
        sampleWaterHeight(x, z - distance, timeSeconds)) /
      (distance * 2),
    velocityY:
      0.62 * 0.42 * Math.cos(longPhase) +
      0.38 * 0.32 * Math.sin(crossPhase) +
      0.16 * 0.56 * Math.cos(diagonalPhase) +
      0.08 * 0.44 * Math.sin(counterPhase),
  };
}
