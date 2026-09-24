import * as THREE from 'three'
import { sampleWaterHeight } from '../waves'
import { VESSEL_TUNING, type VesselState } from '../vessel/kinematics'

export interface WakeController {
  update(state: Readonly<VesselState>, timeSeconds: number, deltaSeconds: number): void
  reset(): void
  setReducedMotion(reduced: boolean): void
  dispose(): void
}

interface WakeParticle {
  age: number
  life: number
  x: number
  z: number
  heading: number
  driftX: number
  driftZ: number
  size: number
  elongation: number
  active: boolean
}

const POOL_SIZE = 96
const WAKE_POOL_SIZE = 80
const CONTACT_POOL_START = WAKE_POOL_SIZE
const WAKE_SIDES = [-1, 1] as const
const WAKE_LIFETIME = 1.45
const CONTACT_LIFETIME = 0.34
const EMISSION_INTERVAL = 0.055
const CONTACT_INTERVAL = 0.11
const MIN_FORWARD_SPEED = 0.45
// The water is deliberately coarse (roughly 9.5 world units per grid cell),
// so lift the foam slightly above the sampled surface to avoid z-fighting and
// triangle-edge flicker as the boat crosses the low-poly field.
const SURFACE_OFFSET = 0.2

/**
 * A small pooled foam trail for the Phase 5 visual pass. The effect owns one
 * instanced mesh and one geometry/material for its entire lifetime; each
 * particle is only a matrix update, so stopping and restarting the vessel
 * cannot allocate or leave behind transient render resources.
 */
export function createWake(scene: THREE.Scene): WakeController {
  const geometry = new THREE.CircleGeometry(1, 7)
  geometry.rotateX(-Math.PI * 0.5)
  const material = new THREE.MeshBasicMaterial({
    color: 0xf4efe4,
    transparent: true,
    opacity: 0.66,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.InstancedMesh(geometry, material, POOL_SIZE)
  mesh.name = 'phase-five-wake-foam'
  mesh.frustumCulled = false
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  scene.add(mesh)

  const particles: WakeParticle[] = Array.from({ length: POOL_SIZE }, () => ({
    age: Number.POSITIVE_INFINITY,
    life: 0,
    x: 0,
    z: 0,
    heading: 0,
    driftX: 0,
    driftZ: 0,
    size: 0,
    elongation: 1,
    active: false,
  }))
  const dummy = new THREE.Object3D()
  let wakeCursor = 0
  let contactCursor = CONTACT_POOL_START
  let emissionAccumulator = 0
  let contactAccumulator = 0
  let reducedMotion = false
  let disposed = false

  const writeParticle = (index: number, particle: WakeParticle, timeSeconds: number): void => {
    if (!particle.active || particle.age >= particle.life) {
      particle.active = false
      dummy.scale.setScalar(0)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
      return
    }

    const progress = Math.min(1, Math.max(0, particle.age / particle.life))
    // Shrinking provides a quiet fade without requiring a per-instance alpha
    // attribute or a second transparent material.
    const fade = progress < 0.16 ? progress / 0.16 : 1 - (progress - 0.16) / 0.84
    const size = particle.size * Math.max(0, fade)
    const height = sampleWaterHeight(particle.x, particle.z, timeSeconds) + SURFACE_OFFSET
    dummy.position.set(particle.x, height, particle.z)
    // The particle's local X axis is the long axis of the ellipse. Rotate it
    // with the boat so the side wake follows the vessel instead of remaining
    // aligned to world X after a turn.
    dummy.rotation.set(0, particle.heading, 0)
    dummy.scale.set(size * particle.elongation, 1, size)
    dummy.updateMatrix()
    mesh.setMatrixAt(index, dummy.matrix)
  }

  const clearParticle = (particle: WakeParticle): void => {
    particle.active = false
    particle.age = Number.POSITIVE_INFINITY
  }

  const emitWake = (state: Readonly<VesselState>, speed: number): void => {
    const forwardX = Math.sin(state.heading)
    const forwardZ = Math.cos(state.heading)
    const rightX = Math.cos(state.heading)
    const rightZ = -Math.sin(state.heading)
    const sternDistance = VESSEL_TUNING.length * 0.52
    // A pair of diverging ribbons leaves a small V behind the hull. Both
    // sides use the same bounded pool and shared material as the contact foam.
    for (const side of WAKE_SIDES) {
      const index = wakeCursor
      wakeCursor = (wakeCursor + 1) % WAKE_POOL_SIZE
      const particle = particles[index]
      const jitter = (((index * 17) % 11) / 10 - 0.5) * 0.12
      const spread = VESSEL_TUNING.width * 0.32 + jitter
      const outwardDrift = 0.18 + Math.min(0.48, speed * 0.035)
      particle.age = 0
      particle.heading = state.heading
      particle.life = WAKE_LIFETIME * (0.82 + ((index * 13) % 7) * 0.035)
      particle.x = state.x - forwardX * sternDistance + rightX * side * spread
      particle.z = state.z - forwardZ * sternDistance + rightZ * side * spread
      particle.driftX = -forwardX * (0.12 + speed * 0.08) + rightX * side * outwardDrift
      particle.driftZ = -forwardZ * (0.12 + speed * 0.08) + rightZ * side * outwardDrift
      particle.size = 0.16 + Math.min(0.24, speed * 0.02)
      particle.elongation = 1.1 + Math.min(0.45, speed * 0.035)
      particle.active = true
    }
  }

  const emitContact = (state: Readonly<VesselState>, speed: number): void => {
    const forwardX = Math.sin(state.heading)
    const forwardZ = Math.cos(state.heading)
    const index = contactCursor
    contactCursor = CONTACT_POOL_START + ((contactCursor - CONTACT_POOL_START + 1) % (POOL_SIZE - CONTACT_POOL_START))
    const particle = particles[index]
    particle.age = 0
    particle.life = CONTACT_LIFETIME
    particle.heading = state.heading
    particle.x = state.x + forwardX * (VESSEL_TUNING.length * 0.46)
    particle.z = state.z + forwardZ * (VESSEL_TUNING.length * 0.46)
    particle.driftX = forwardX * speed * 0.04
    particle.driftZ = forwardZ * speed * 0.04
    particle.size = 0.12 + Math.min(0.1, speed * 0.01)
    particle.elongation = 1.2
    particle.active = true
  }

  const reset = (): void => {
    if (disposed) return
    emissionAccumulator = 0
    contactAccumulator = 0
    wakeCursor = 0
    contactCursor = CONTACT_POOL_START
    for (const particle of particles) clearParticle(particle)
    for (let index = 0; index < POOL_SIZE; index += 1) writeParticle(index, particles[index], 0)
    mesh.instanceMatrix.needsUpdate = true
  }

  reset()

  return {
    update: (state, timeSeconds, deltaSeconds): void => {
      if (disposed || reducedMotion) return
      const delta = Number.isFinite(deltaSeconds) ? Math.min(0.1, Math.max(0, deltaSeconds)) : 0
      if (delta <= 0) return
      const forwardSpeed = state.velocityX * Math.sin(state.heading) + state.velocityZ * Math.cos(state.heading)
      const speed = Math.max(0, forwardSpeed)
      const movingForward = speed >= MIN_FORWARD_SPEED

      for (const particle of particles) {
        if (!particle.active) continue
        particle.age += delta
        particle.x += particle.driftX * delta
        particle.z += particle.driftZ * delta
        if (particle.age >= particle.life) particle.active = false
      }

      if (movingForward) {
        emissionAccumulator += delta
        while (emissionAccumulator >= EMISSION_INTERVAL) {
          emissionAccumulator -= EMISSION_INTERVAL
          emitWake(state, speed)
        }
        contactAccumulator += delta
        while (contactAccumulator >= CONTACT_INTERVAL) {
          contactAccumulator -= CONTACT_INTERVAL
          emitContact(state, speed)
        }
      } else {
        // Do not retain an old fractional burst through a reverse/stop cycle.
        emissionAccumulator = 0
        contactAccumulator = 0
      }

      for (let index = 0; index < POOL_SIZE; index += 1) writeParticle(index, particles[index], timeSeconds)
      mesh.instanceMatrix.needsUpdate = true
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
