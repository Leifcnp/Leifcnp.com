import * as THREE from 'three'
import { sampleWaterHeight, sampleWaterSurface } from '../waves'
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
  /** 0 is trailing wash, 1 is bow contact, 2 is turn-side wash. */
  kind: number
  /** Signed side of the hull, retained for deterministic contact drift. */
  side: number
  /** Bounded multiplier for the local wave-slope response. */
  waveResponse: number
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
const MIN_TURN_RATE = 0.055
// The water is deliberately coarse (roughly 9.5 world units per grid cell),
// so lift the foam slightly above the sampled surface to avoid z-fighting and
// triangle-edge flicker as the boat crosses the low-poly field.
const SURFACE_OFFSET = 0.2

/**
 * Pooled stern foam and wave-sensitive hull contact. The effect owns one
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
    kind: 0,
    side: 0,
    waveResponse: 0,
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
    // Contact pieces sample the shared water slope,
    // so a bow hit on a rising wave gets a restrained, coherent swell. The
    // longer wake ribbon uses the cheaper height-only sample for the same
    // fixed resource budget.
    let height = sampleWaterHeight(particle.x, particle.z, timeSeconds)
    let waveMagnitude = 0
    if (particle.kind !== 0) {
      const surface = sampleWaterSurface(particle.x, particle.z, timeSeconds)
      height = surface.height
      waveMagnitude = Math.min(0.45, Math.hypot(surface.slopeX, surface.slopeZ))
    }
    const waveScale = 1 + particle.waveResponse * waveMagnitude
    dummy.position.set(particle.x, height + SURFACE_OFFSET, particle.z)
    // The particle's local X axis is the long axis of the ellipse. Rotate it
    // with the boat so the side wake follows the vessel instead of remaining
    // aligned to world X after a turn.
    dummy.rotation.set(0, particle.heading, 0)
    dummy.scale.set(size * particle.elongation * waveScale, 1, size * waveScale)
    dummy.updateMatrix()
    mesh.setMatrixAt(index, dummy.matrix)
  }

  const clearParticle = (particle: WakeParticle): void => {
    particle.active = false
    particle.age = Number.POSITIVE_INFINITY
    particle.kind = 0
    particle.side = 0
    particle.waveResponse = 0
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
      particle.kind = 0
      particle.side = side
      particle.waveResponse = 0.45
      particle.active = true
    }
  }

  const nextContactParticle = (): WakeParticle => {
    const index = contactCursor
    contactCursor = CONTACT_POOL_START + ((contactCursor - CONTACT_POOL_START + 1) % (POOL_SIZE - CONTACT_POOL_START))
    return particles[index]
  }

  const emitBowContact = (
    state: Readonly<VesselState>,
    speed: number,
    side: number,
    waveMagnitude: number,
    encounterStrength: number,
  ): void => {
    const forwardX = Math.sin(state.heading)
    const forwardZ = Math.cos(state.heading)
    const rightX = Math.cos(state.heading)
    const rightZ = -Math.sin(state.heading)
    const particle = nextContactParticle()
    particle.age = 0
    particle.life = CONTACT_LIFETIME * (0.92 + waveMagnitude * 0.35 + encounterStrength * 0.22)
    // Two small crescents split around the bow. A slight cant keeps the
    // contact shapes reading as displacement instead of a second straight
    // wake ribbon.
    particle.heading = state.heading + side * 0.16
    particle.x = state.x + forwardX * (VESSEL_TUNING.length * 0.48) + rightX * side * VESSEL_TUNING.width * 0.28
    particle.z = state.z + forwardZ * (VESSEL_TUNING.length * 0.48) + rightZ * side * VESSEL_TUNING.width * 0.28
    particle.driftX = forwardX * (0.08 + speed * 0.035) + rightX * side * (0.2 + waveMagnitude * 0.24 + encounterStrength * 0.12)
    particle.driftZ = forwardZ * (0.08 + speed * 0.035) + rightZ * side * (0.2 + waveMagnitude * 0.24 + encounterStrength * 0.12)
    particle.size = 0.13 + Math.min(0.12, speed * 0.012) + waveMagnitude * 0.05 + encounterStrength * 0.1
    particle.elongation = 1.35 + Math.min(0.4, speed * 0.025) + encounterStrength * 0.18
    particle.kind = 1
    particle.side = side
    particle.waveResponse = 1.25
    particle.active = true
  }

  const emitTurnWash = (
    state: Readonly<VesselState>,
    speed: number,
    waveMagnitude: number,
    encounterStrength: number,
  ): void => {
    const turnSide = Math.sign(state.yawRate)
    if (turnSide === 0) return
    const forwardX = Math.sin(state.heading)
    const forwardZ = Math.cos(state.heading)
    const rightX = Math.cos(state.heading)
    const rightZ = -Math.sin(state.heading)
    const particle = nextContactParticle()
    const turnStrength = Math.min(1, Math.abs(state.yawRate) / 0.6)
    particle.age = 0
    particle.life = CONTACT_LIFETIME * (1.05 + turnStrength * 0.3 + encounterStrength * 0.18)
    particle.heading = state.heading + turnSide * 0.32
    particle.x = state.x - forwardX * (VESSEL_TUNING.length * 0.08) + rightX * turnSide * (VESSEL_TUNING.width * 0.58)
    particle.z = state.z - forwardZ * (VESSEL_TUNING.length * 0.08) + rightZ * turnSide * (VESSEL_TUNING.width * 0.58)
    particle.driftX = rightX * turnSide * (0.22 + speed * 0.035) - forwardX * 0.06
    particle.driftZ = rightZ * turnSide * (0.22 + speed * 0.035) - forwardZ * 0.06
    particle.size = 0.13 + turnStrength * 0.1 + waveMagnitude * 0.04 + encounterStrength * 0.08
    particle.elongation = 1.5 + turnStrength * 0.45 + encounterStrength * 0.12
    particle.kind = 2
    particle.side = turnSide
    particle.waveResponse = 1.1
    particle.active = true
  }

  const emitContact = (state: Readonly<VesselState>, speed: number, timeSeconds: number): void => {
    const bowX = state.x + Math.sin(state.heading) * VESSEL_TUNING.length * 0.48
    const bowZ = state.z + Math.cos(state.heading) * VESSEL_TUNING.length * 0.48
    const bowSurface = sampleWaterSurface(bowX, bowZ, timeSeconds)
    const waveMagnitude = Math.min(0.45, Math.hypot(bowSurface.slopeX, bowSurface.slopeZ))
    // Relative vertical speed combines the surface's own motion with the
    // hull's movement across its slope. It gives bow contact a little more
    // presence on a head swell without changing the vessel's physics.
    const encounterRate = Math.abs(
      bowSurface.velocityY + state.velocityX * bowSurface.slopeX + state.velocityZ * bowSurface.slopeZ,
    )
    const encounterStrength = Math.min(0.9, encounterRate * 0.26)
    emitBowContact(state, speed, -1, waveMagnitude, encounterStrength)
    emitBowContact(state, speed, 1, waveMagnitude, encounterStrength)
    if (Math.abs(state.yawRate) >= MIN_TURN_RATE) emitTurnWash(state, speed, waveMagnitude, encounterStrength)
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
      const time = Number.isFinite(timeSeconds) ? timeSeconds : 0
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
          emitContact(state, speed, time)
        }
      } else {
        // Do not retain an old fractional burst through a reverse/stop cycle.
        emissionAccumulator = 0
        contactAccumulator = 0
      }

      for (let index = 0; index < POOL_SIZE; index += 1) writeParticle(index, particles[index], time)
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
