import * as THREE from 'three'
import { sampleWind } from '../wind.ts'
import type { VesselContactPoint, VesselWaterContact } from '../vessel/hullContact.ts'
import { sampleFacetedWaterHeight } from '../waterSurfaceGrid.ts'

export interface HullSprayController {
  update(contact: Readonly<VesselWaterContact>, timeSeconds: number, deltaSeconds: number): void
  reset(): void
  setReducedMotion(reduced: boolean): void
  dispose(): void
}

interface SprayParticle {
  active: boolean
  age: number
  life: number
  x: number
  y: number
  z: number
  velocityX: number
  velocityY: number
  velocityZ: number
  size: number
  elongation: number
  kind: 0 | 1
}

const POOL_SIZE = 48
const BOW_INTERVAL = 0.065
const RAIL_INTERVAL = 0.09
const MIN_FORWARD_SPEED = 0.65
const MIN_BOW_CLOSING_SPEED = 0.08
const MIN_RAIL_LOAD = 0.12
const MAX_BOW_CLEARANCE = 0.3
const MAX_RAIL_CLEARANCE = 0.06
const MAX_DELTA = 0.1
const GRAVITY = -7.5
const SURFACE_OFFSET = 0.035
const INITIAL_SEED = 0x31a7c9

function finiteOr(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? (value as number) : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function validPoint(point: VesselContactPoint | null | undefined): point is VesselContactPoint {
  return point !== null && point !== undefined
}

/**
 * One deterministic, bounded pool for bow droplets and leeward rail wash.
 * The caller owns the simulation clock and supplies already-transformed
 * contact points, so this effect never guesses where the hull is touching.
 */
export function createHullSpray(scene: THREE.Scene): HullSprayController {
  const geometry = new THREE.IcosahedronGeometry(1, 0)
  const material = new THREE.MeshBasicMaterial({
    color: 0xf4fbf7,
    vertexColors: true,
    transparent: true,
    opacity: 0.76,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.InstancedMesh(geometry, material, POOL_SIZE)
  mesh.name = 'phase-twelve-hull-spray'
  mesh.frustumCulled = false
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(POOL_SIZE * 3), 3)
  mesh.instanceColor.setUsage(THREE.DynamicDrawUsage)
  scene.add(mesh)

  const particles: SprayParticle[] = Array.from({ length: POOL_SIZE }, () => ({
    active: false,
    age: Number.POSITIVE_INFINITY,
    life: 0,
    x: 0,
    y: 0,
    z: 0,
    velocityX: 0,
    velocityY: 0,
    velocityZ: 0,
    size: 0,
    elongation: 1,
    kind: 0,
  }))
  const dummy = new THREE.Object3D()
  const white = new THREE.Color(0xf8fffc)
  const mint = new THREE.Color(0xbfe9e2)
  let cursor = 0
  let bowAccumulator = 0
  let railAccumulator = 0
  let seed = INITIAL_SEED
  let reducedMotion = false
  let disposed = false

  const random = (): number => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 0xffffffff
  }

  const clearParticle = (particle: SprayParticle): void => {
    particle.active = false
    particle.age = Number.POSITIVE_INFINITY
    particle.life = 0
    particle.size = 0
  }

  const writeParticle = (index: number, particle: SprayParticle): void => {
    if (!particle.active || particle.age >= particle.life) {
      clearParticle(particle)
      dummy.scale.setScalar(0)
      dummy.position.set(0, 0, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
      mesh.setColorAt(index, particle.kind === 0 ? white : mint)
      return
    }

    const progress = clamp(particle.age / particle.life, 0, 1)
    const fade = progress < 0.12
      ? progress / 0.12
      : Math.max(0, 1 - (progress - 0.12) / 0.88)
    const size = particle.size * fade
    dummy.position.set(particle.x, particle.y, particle.z)
    dummy.rotation.set(0, 0, 0)
    dummy.scale.set(size * particle.elongation, size, size)
    dummy.updateMatrix()
    mesh.setMatrixAt(index, dummy.matrix)
    mesh.setColorAt(index, particle.kind === 0 ? white : mint)
  }

  const nextParticle = (kind: 0 | 1): SprayParticle => {
    const particle = particles[cursor]
    cursor = (cursor + 1) % POOL_SIZE
    particle.active = true
    particle.age = 0
    particle.kind = kind
    return particle
  }

  const emitBow = (
    point: VesselContactPoint,
    sideSign: number,
    forwardX: number,
    forwardZ: number,
    sideX: number,
    sideZ: number,
    speed: number,
    timeSeconds: number,
  ): void => {
    const wind = sampleWind(timeSeconds)
    const closing = clamp(finiteOr(point.closingSpeed, 0), 0, 4)
    const particle = nextParticle(0)
    const spread = 0.18 + random() * 0.42
    particle.x = finiteOr(point.x, 0) + sideX * sideSign * spread
    particle.z = finiteOr(point.z, 0) + sideZ * sideSign * spread
    const launchWaterY = sampleFacetedWaterHeight(particle.x, particle.z, timeSeconds) + SURFACE_OFFSET
    particle.y = Math.max(finiteOr(point.y, 0), launchWaterY)
    particle.velocityX = forwardX * (0.2 + speed * 0.035) + sideX * sideSign * (0.12 + random() * 0.18) + wind.x * 0.025
    particle.velocityZ = forwardZ * (0.2 + speed * 0.035) + sideZ * sideSign * (0.12 + random() * 0.18) + wind.z * 0.025
    particle.velocityY = 0.62 + random() * 0.65 + closing * 0.22
    particle.life = 0.45 + random() * 0.25
    particle.size = 0.07 + random() * 0.055 + Math.min(0.035, speed * 0.003)
    particle.elongation = 1.2 + random() * 0.55
  }

  const emitRail = (
    point: VesselContactPoint,
    sideSign: number,
    forwardX: number,
    forwardZ: number,
    sideX: number,
    sideZ: number,
    speed: number,
    load: number,
    timeSeconds: number,
  ): void => {
    const wind = sampleWind(timeSeconds)
    const particle = nextParticle(1)
    particle.x = finiteOr(point.x, 0)
    particle.z = finiteOr(point.z, 0)
    const launchWaterY = sampleFacetedWaterHeight(particle.x, particle.z, timeSeconds) + SURFACE_OFFSET
    particle.y = Math.max(finiteOr(point.y, 0), launchWaterY)
    particle.velocityX = forwardX * (0.12 + speed * 0.018) + sideX * sideSign * (0.16 + load * 0.18) + wind.x * 0.018
    particle.velocityZ = forwardZ * (0.12 + speed * 0.018) + sideZ * sideSign * (0.16 + load * 0.18) + wind.z * 0.018
    particle.velocityY = 0.22 + random() * 0.3 + load * 0.25
    particle.life = 0.32 + random() * 0.18
    particle.size = 0.065 + random() * 0.045 + load * 0.025
    particle.elongation = 1.1 + random() * 0.5
  }

  const reset = (): void => {
    if (disposed) return
    cursor = 0
    bowAccumulator = 0
    railAccumulator = 0
    seed = INITIAL_SEED
    for (let index = 0; index < POOL_SIZE; index += 1) {
      clearParticle(particles[index])
      writeParticle(index, particles[index])
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }

  reset()

  return {
    update: (contact, timeSeconds, deltaSeconds): void => {
      if (disposed || reducedMotion) return
      const delta = Number.isFinite(deltaSeconds) ? clamp(deltaSeconds, 0, MAX_DELTA) : 0
      if (delta <= 0) return
      const time = Number.isFinite(timeSeconds) ? timeSeconds : 0
      const forwardSpeed = finiteOr(contact?.forwardSpeed, 0)
      const bowPort = contact?.bowPort
      const bowStarboard = contact?.bowStarboard
      const rail = contact?.leewardRail
      let sideX = finiteOr(bowPort?.x, 0) - finiteOr(bowStarboard?.x, 0)
      let sideZ = finiteOr(bowPort?.z, 0) - finiteOr(bowStarboard?.z, 0)
      const sideLength = Math.hypot(sideX, sideZ)
      if (sideLength < 1e-6) {
        sideX = -1
        sideZ = 0
      } else {
        sideX /= sideLength
        sideZ /= sideLength
      }
      // The bow span is perpendicular to travel. Rotating it 90 degrees in
      // world space avoids a diagonal bias from the rail's lateral offset.
      let forwardX = sideZ
      let forwardZ = -sideX
      const forwardLength = Math.hypot(forwardX, forwardZ)
      if (forwardLength < 1e-6) {
        forwardX = 0
        forwardZ = 1
      } else {
        forwardX /= forwardLength
        forwardZ /= forwardLength
      }
      const bowCandidates: readonly [VesselContactPoint | undefined, number][] = [
        [bowPort, 1],
        [bowStarboard, -1],
      ]
      let bowPoint: VesselContactPoint | undefined
      let bowSide = 1
      for (const [candidate, side] of bowCandidates) {
        if (!validPoint(candidate)) continue
        if (candidate.clearance > MAX_BOW_CLEARANCE || candidate.closingSpeed <= MIN_BOW_CLOSING_SPEED) continue
        if (!bowPoint || candidate.closingSpeed > bowPoint.closingSpeed) {
          bowPoint = candidate
          bowSide = side
        }
      }
      const bowActive = forwardSpeed >= MIN_FORWARD_SPEED && validPoint(bowPoint)
      const railActive = forwardSpeed >= MIN_FORWARD_SPEED
        && validPoint(rail)
        && rail.clearance <= MAX_RAIL_CLEARANCE
        && finiteOr(contact?.heelLoad, 0) >= MIN_RAIL_LOAD

      for (const particle of particles) {
        if (!particle.active) continue
        particle.age += delta
        particle.x += particle.velocityX * delta
        particle.y += particle.velocityY * delta + 0.5 * GRAVITY * delta * delta
        particle.z += particle.velocityZ * delta
        particle.velocityY += GRAVITY * delta
        const currentWaterY = sampleFacetedWaterHeight(particle.x, particle.z, time) + SURFACE_OFFSET
        if (particle.y <= currentWaterY) {
          // Droplets disappear when they re-enter the current visible water
          // plane; a stored launch height would float across moving swells.
          particle.y = currentWaterY
          particle.active = false
          continue
        }
        if (particle.age >= particle.life) particle.active = false
      }

      if (bowActive && bowPoint) {
        bowAccumulator += delta
        let emissions = 0
        while (bowAccumulator >= BOW_INTERVAL && emissions < 2) {
          bowAccumulator -= BOW_INTERVAL
          emitBow(bowPoint, bowSide, forwardX, forwardZ, sideX, sideZ, clamp(forwardSpeed, 0, 20), time)
          emissions += 1
        }
      } else {
        bowAccumulator = 0
      }
      if (railActive && rail) {
        railAccumulator += delta
        let emissions = 0
        while (railAccumulator >= RAIL_INTERVAL && emissions < 2) {
          railAccumulator -= RAIL_INTERVAL
          const railSide = contact.leewardSide === 'port' ? 1 : -1
          emitRail(
            rail,
            railSide,
            forwardX,
            forwardZ,
            sideX,
            sideZ,
            clamp(forwardSpeed, 0, 20),
            clamp(finiteOr(contact?.heelLoad, 0), 0, 1),
            time,
          )
          emissions += 1
        }
      } else {
        railAccumulator = 0
      }

      for (let index = 0; index < POOL_SIZE; index += 1) writeParticle(index, particles[index])
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    },
    reset,
    setReducedMotion: (reduced): void => {
      if (disposed || reducedMotion === reduced) return
      reducedMotion = reduced
      if (reduced) reset()
    },
    dispose: (): void => {
      if (disposed) return
      disposed = true
      mesh.removeFromParent()
      mesh.dispose()
      geometry.dispose()
      material.dispose()
      dummy.clear()
    },
  }
}
