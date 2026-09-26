import * as THREE from 'three'
import { sampleWaterHeight, sampleWaterSurface } from '../waves.ts'
import { VESSEL_TUNING, type VesselState } from '../vessel/kinematics.ts'

export interface WakeController {
  update(state: Readonly<VesselState>, timeSeconds: number, deltaSeconds: number): void
  reset(): void
  setTrimBoost(amount: number): void
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
  /** Manual trim reward captured when this wake element was emitted. */
  trimBoost: number
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
const HISTORY_POINTS = 32
const HISTORY_INTERVAL = 0.06
const HISTORY_LIFETIME = 2.2
const RIBBON_SURFACE_OFFSET = 0.24
const BOW_ARC_POINTS = 18
const BOW_ARC_SURFACE_OFFSET = 0.27
// The water uses a faceted grid, so lift foam above the sampled surface to avoid z-fighting and
// triangle-edge flicker as the boat crosses the low-poly field.
const SURFACE_OFFSET = 0.2
const MAX_TRIM_BOOST = 1

/**
 * Pooled stern foam, travelled-path ribbons, and wave-sensitive hull contact.
 * Three fixed meshes own their geometry/materials for the entire lifetime;
 * particle matrices and ribbon buffers update without new render resources.
 */
export function createWake(scene: THREE.Scene): WakeController {
  const geometry = new THREE.CircleGeometry(1, 7)
  geometry.rotateX(-Math.PI * 0.5)
  const material = new THREE.MeshBasicMaterial({
    color: 0xf4efe4,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.InstancedMesh(geometry, material, POOL_SIZE)
  mesh.name = 'phase-five-wake-foam'
  mesh.frustumCulled = false
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  scene.add(mesh)

  // A fixed two-sided strip turns the sampled boat path into a continuous V
  // instead of a row of disconnected ellipses. Two ribbons × 32 samples × 2
  // edges is 124 triangles, leaving the complete effect comfortably below the
  // visual-phase budget while remaining readable at the tracked camera scale.
  const ribbonPositions = new Float32Array(HISTORY_POINTS * 2 * 2 * 3)
  const ribbonColors = new Float32Array(HISTORY_POINTS * 2 * 2 * 4)
  const ribbonIndices = new Uint16Array((HISTORY_POINTS - 1) * 2 * 6)
  let ribbonIndex = 0
  for (let sideIndex = 0; sideIndex < 2; sideIndex += 1) {
    const sideOffset = sideIndex * HISTORY_POINTS * 2
    for (let sampleIndex = 0; sampleIndex < HISTORY_POINTS - 1; sampleIndex += 1) {
      const first = sideOffset + sampleIndex * 2
      const next = first + 2
      ribbonIndices[ribbonIndex++] = first
      ribbonIndices[ribbonIndex++] = next
      ribbonIndices[ribbonIndex++] = first + 1
      ribbonIndices[ribbonIndex++] = first + 1
      ribbonIndices[ribbonIndex++] = next
      ribbonIndices[ribbonIndex++] = next + 1
    }
  }
  const ribbonGeometry = new THREE.BufferGeometry()
  const ribbonPositionAttribute = new THREE.BufferAttribute(ribbonPositions, 3)
  const ribbonColorAttribute = new THREE.BufferAttribute(ribbonColors, 4)
  ribbonPositionAttribute.setUsage(THREE.DynamicDrawUsage)
  ribbonColorAttribute.setUsage(THREE.DynamicDrawUsage)
  ribbonGeometry.setAttribute('position', ribbonPositionAttribute)
  ribbonGeometry.setAttribute('color', ribbonColorAttribute)
  ribbonGeometry.setIndex(new THREE.BufferAttribute(ribbonIndices, 1))
  const ribbonMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const ribbonMesh = new THREE.Mesh(ribbonGeometry, ribbonMaterial)
  ribbonMesh.name = 'phase-five-wake-ribbon'
  ribbonMesh.frustumCulled = false
  scene.add(ribbonMesh)

  // A short concentric arc at the bow makes the hull's first contact readable
  // at the camera distance even when the stern trail is between history ticks.
  // It is a fixed 34-triangle strip, sampled onto the same water surface each
  // frame and cleared whenever the boat is stationary.
  const bowArcPositions = new Float32Array(BOW_ARC_POINTS * 2 * 3)
  const bowArcColors = new Float32Array(BOW_ARC_POINTS * 2 * 4)
  const bowArcIndices = new Uint16Array((BOW_ARC_POINTS - 1) * 6)
  let bowArcIndex = 0
  for (let point = 0; point < BOW_ARC_POINTS - 1; point += 1) {
    const first = point * 2
    const next = first + 2
    bowArcIndices[bowArcIndex++] = first
    bowArcIndices[bowArcIndex++] = next
    bowArcIndices[bowArcIndex++] = first + 1
    bowArcIndices[bowArcIndex++] = first + 1
    bowArcIndices[bowArcIndex++] = next
    bowArcIndices[bowArcIndex++] = next + 1
  }
  const bowArcGeometry = new THREE.BufferGeometry()
  const bowArcPositionAttribute = new THREE.BufferAttribute(bowArcPositions, 3)
  const bowArcColorAttribute = new THREE.BufferAttribute(bowArcColors, 4)
  bowArcPositionAttribute.setUsage(THREE.DynamicDrawUsage)
  bowArcColorAttribute.setUsage(THREE.DynamicDrawUsage)
  bowArcGeometry.setAttribute('position', bowArcPositionAttribute)
  bowArcGeometry.setAttribute('color', bowArcColorAttribute)
  bowArcGeometry.setIndex(new THREE.BufferAttribute(bowArcIndices, 1))
  const bowArcMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const bowArcMesh = new THREE.Mesh(bowArcGeometry, bowArcMaterial)
  bowArcMesh.name = 'phase-five-bow-wave'
  bowArcMesh.frustumCulled = false
  scene.add(bowArcMesh)

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
    trimBoost: 0,
    active: false,
  }))
  const dummy = new THREE.Object3D()
  interface HistoryPoint {
    age: number
    x: number
    z: number
    heading: number
    speed: number
    yawRate: number
    trimBoost: number
    active: boolean
  }
  const history: HistoryPoint[] = Array.from({ length: HISTORY_POINTS }, () => ({
    age: Number.POSITIVE_INFINITY,
    x: 0,
    z: 0,
    heading: 0,
    speed: 0,
    yawRate: 0,
    trimBoost: 0,
    active: false,
  }))
  let wakeCursor = 0
  let contactCursor = CONTACT_POOL_START
  let emissionAccumulator = 0
  let contactAccumulator = 0
  let historyHead = 0
  let historyCount = 0
  let historyAccumulator = 0
  let trimBoost = 0
  let reducedMotion = false
  let disposed = false

  const writeParticle = (
    index: number,
    particle: WakeParticle,
    timeSeconds: number,
    boostEnabled: boolean,
  ): void => {
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
    const boost = boostEnabled ? Math.min(particle.trimBoost, trimBoost) : 0
    const size = particle.size * (1 + boost * 0.85) * Math.max(0, fade)
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
    dummy.scale.set(
      size * particle.elongation * (1 + boost * 0.24) * waveScale,
      1,
      size * (1 + boost * 0.12) * waveScale,
    )
    dummy.updateMatrix()
    mesh.setMatrixAt(index, dummy.matrix)
  }

  const clearParticle = (particle: WakeParticle): void => {
    particle.active = false
    particle.age = Number.POSITIVE_INFINITY
    particle.kind = 0
    particle.side = 0
    particle.waveResponse = 0
    particle.trimBoost = 0
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
      particle.size = 0.13 + Math.min(0.2, speed * 0.017)
      particle.elongation = 1.1 + Math.min(0.45, speed * 0.035)
      particle.kind = 0
      particle.side = side
      particle.waveResponse = 0.45
      particle.trimBoost = trimBoost
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

  const pushHistory = (state: Readonly<VesselState>, speed: number): void => {
    const point = history[historyHead]
    point.age = 0
    point.x = Number.isFinite(state.x) ? state.x : 0
    point.z = Number.isFinite(state.z) ? state.z : 0
    point.heading = Number.isFinite(state.heading) ? state.heading : 0
    point.speed = speed
    point.yawRate = Number.isFinite(state.yawRate) ? state.yawRate : 0
    point.trimBoost = trimBoost
    point.active = true
    historyHead = (historyHead + 1) % HISTORY_POINTS
    historyCount = Math.min(HISTORY_POINTS, historyCount + 1)
  }

  const writeRibbon = (timeSeconds: number, boostEnabled: boolean): void => {
    const activeStart = HISTORY_POINTS - historyCount
    for (let sideIndex = 0; sideIndex < 2; sideIndex += 1) {
      const side = sideIndex === 0 ? -1 : 1
      const sideOffset = sideIndex * HISTORY_POINTS * 2
      let firstValid = HISTORY_POINTS
      let lastValid = -1
      // History ages out from the oldest end, but a reset or a long pause can
      // leave holes. Keep the fixed index buffer and mark the samples that
      // have real positions so inactive vertices can collapse onto a nearby
      // valid sample below instead of tethering the strip to the origin.
      for (let sampleIndex = 0; sampleIndex < HISTORY_POINTS; sampleIndex += 1) {
        const isActive = sampleIndex >= activeStart
        const historyOffset = sampleIndex - activeStart
        const historyIndex = isActive
          ? (historyHead - historyCount + historyOffset + HISTORY_POINTS) % HISTORY_POINTS
          : 0
        const point = history[historyIndex]
        const valid = isActive && point.active && point.age < HISTORY_LIFETIME
        if (valid) {
          if (firstValid === HISTORY_POINTS) firstValid = sampleIndex
          lastValid = sampleIndex
        }
      }
      for (let sampleIndex = 0; sampleIndex < HISTORY_POINTS; sampleIndex += 1) {
        const vertexOffset = (sideOffset + sampleIndex * 2) * 3
        const colorOffset = (sideOffset + sampleIndex * 2) * 4
        const isActive = sampleIndex >= activeStart
        const historyOffset = sampleIndex - activeStart
        const historyIndex = isActive
          ? (historyHead - historyCount + historyOffset + HISTORY_POINTS) % HISTORY_POINTS
          : 0
        const point = history[historyIndex]
        if (!isActive || !point.active || point.age >= HISTORY_LIFETIME) {
          for (let component = 0; component < 8; component += 1) ribbonColors[colorOffset + component] = 0
          continue
        }

        const ageFade = Math.max(0, 1 - point.age / HISTORY_LIFETIME)
        const boost = boostEnabled ? Math.min(point.trimBoost, trimBoost) : 0
        const speedRatio = Math.min(1, Math.max(0, point.speed / VESSEL_TUNING.maxForwardSpeed))
        const trailProgress = historyCount > 1 ? historyOffset / (historyCount - 1) : 1
        // Taper the fresh end behind the stern as well as the aged end. This
        // prevents a hard rectangular cut where the continuous strip meets
        // the hull and lets the foam accents carry the immediate contact cue.
        const endpointTaper = 0.18 + Math.min(1, Math.max(0, 1 - trailProgress) * 5) * 0.82
        const visualFade = ageFade * ageFade * (0.72 + speedRatio * 0.28) * (0.55 + endpointTaper * 0.45) * (1 + boost * 0.16)
        const forwardX = Math.sin(point.heading)
        const forwardZ = Math.cos(point.heading)
        const sideX = Math.cos(point.heading)
        const sideZ = -Math.sin(point.heading)
        const sternDistance = VESSEL_TUNING.length * (0.52 + speedRatio * 0.08)
        const baseX = point.x - forwardX * sternDistance
        const baseZ = point.z - forwardZ * sternDistance
        const innerWidth = VESSEL_TUNING.width * (0.34 + speedRatio * 0.1) * (1 + boost * 0.2) * endpointTaper
        const outerWidth = innerWidth + (0.62 + speedRatio * 1.05 + Math.min(0.45, Math.abs(point.yawRate) * 0.72)) * (0.32 + ageFade * 0.68) * (1 + boost * 0.82) * endpointTaper
        const innerX = baseX + sideX * side * innerWidth
        const innerZ = baseZ + sideZ * side * innerWidth
        const outerX = baseX + sideX * side * outerWidth
        const outerZ = baseZ + sideZ * side * outerWidth
        const innerHeight = sampleWaterHeight(innerX, innerZ, timeSeconds) + RIBBON_SURFACE_OFFSET
        const outerHeight = sampleWaterHeight(outerX, outerZ, timeSeconds) + RIBBON_SURFACE_OFFSET
        ribbonPositions[vertexOffset] = innerX
        ribbonPositions[vertexOffset + 1] = innerHeight
        ribbonPositions[vertexOffset + 2] = innerZ
        ribbonPositions[vertexOffset + 3] = outerX
        ribbonPositions[vertexOffset + 4] = outerHeight
        ribbonPositions[vertexOffset + 5] = outerZ
        // Keep RGB white and put the lifetime fade in vertex alpha. RGB
        // darkening would blend the wake toward black instead of fading it
        // over the water when the material is transparent.
        ribbonColors[colorOffset] = 1
        ribbonColors[colorOffset + 1] = 1
        ribbonColors[colorOffset + 2] = 1
        ribbonColors[colorOffset + 3] = visualFade
        ribbonColors[colorOffset + 4] = 1
        ribbonColors[colorOffset + 5] = 1
        ribbonColors[colorOffset + 6] = 1
        ribbonColors[colorOffset + 7] = visualFade
      }
      if (lastValid < 0) {
        for (let sampleIndex = 0; sampleIndex < HISTORY_POINTS; sampleIndex += 1) {
          const vertexOffset = (sideOffset + sampleIndex * 2) * 3
          for (let component = 0; component < 6; component += 1) ribbonPositions[vertexOffset + component] = 0
        }
      } else {
        // Degenerate every inactive segment at the nearest valid position.
        // The zero alpha on these vertices keeps the fixed index buffer
        // drawable while preventing a visible triangle from stretching from
        // an inactive prefix (which used to be written at world origin).
        for (let sampleIndex = 0; sampleIndex < HISTORY_POINTS; sampleIndex += 1) {
          const isActive = sampleIndex >= activeStart
          const historyOffset = sampleIndex - activeStart
          const historyIndex = isActive
            ? (historyHead - historyCount + historyOffset + HISTORY_POINTS) % HISTORY_POINTS
            : 0
          const point = history[historyIndex]
          if (isActive && point.active && point.age < HISTORY_LIFETIME) continue

          let fallback = sampleIndex <= firstValid ? firstValid : sampleIndex - 1
          while (fallback >= firstValid) {
            const fallbackActive = fallback >= activeStart
            const fallbackOffset = fallback - activeStart
            const fallbackHistoryIndex = fallbackActive
              ? (historyHead - historyCount + fallbackOffset + HISTORY_POINTS) % HISTORY_POINTS
              : 0
            const fallbackPoint = history[fallbackHistoryIndex]
            if (fallbackActive && fallbackPoint.active && fallbackPoint.age < HISTORY_LIFETIME) break
            fallback -= 1
          }
          if (fallback < firstValid) fallback = firstValid
          const targetOffset = (sideOffset + sampleIndex * 2) * 3
          const fallbackOffset = (sideOffset + fallback * 2) * 3
          for (let component = 0; component < 6; component += 1) {
            ribbonPositions[targetOffset + component] = ribbonPositions[fallbackOffset + component]
          }
        }
      }
    }
    ribbonGeometry.getAttribute('position').needsUpdate = true
    ribbonGeometry.getAttribute('color').needsUpdate = true
  }

  const writeBowArc = (
    state: Readonly<VesselState>,
    speed: number,
    timeSeconds: number,
    movingForward: boolean,
  ): void => {
    if (!movingForward) {
      bowArcPositions.fill(0)
      bowArcColors.fill(0)
      bowArcPositionAttribute.needsUpdate = true
      bowArcColorAttribute.needsUpdate = true
      return
    }

    const forwardX = Math.sin(state.heading)
    const forwardZ = Math.cos(state.heading)
    const sideX = Math.cos(state.heading)
    const sideZ = -Math.sin(state.heading)
    const bowX = state.x + forwardX * VESSEL_TUNING.length * 0.48
    const bowZ = state.z + forwardZ * VESSEL_TUNING.length * 0.48
    // Center the arc just behind the bow so its crest meets the hull rather
    // than reading as a detached horseshoe ahead of it. Keep the water
    // encounter sample at the true bow position below.
    const arcCenterX = bowX - forwardX * 0.78
    const arcCenterZ = bowZ - forwardZ * 0.78
    const surface = sampleWaterSurface(bowX, bowZ, timeSeconds)
    const waveMagnitude = Math.min(0.5, Math.hypot(surface.slopeX, surface.slopeZ))
    const encounterRate = Math.abs(
      surface.velocityY + state.velocityX * surface.slopeX + state.velocityZ * surface.slopeZ,
    )
    const encounterStrength = Math.min(0.9, encounterRate * 0.26)
    const speedRatio = Math.min(1, Math.max(0, speed / VESSEL_TUNING.maxForwardSpeed))
    const innerRadius = 0.9 + speedRatio * 0.22 + encounterStrength * 0.14
    const arcWidth = 0.18 + speedRatio * 0.12 + waveMagnitude * 0.1 + encounterStrength * 0.08
    const alpha = Math.min(0.92, 0.28 + speedRatio * 0.48 + encounterStrength * 0.18)

    for (let point = 0; point < BOW_ARC_POINTS; point += 1) {
      const angle = Math.PI - (point / (BOW_ARC_POINTS - 1)) * Math.PI
      const cosine = Math.cos(angle)
      const sine = Math.sin(angle)
      for (let edge = 0; edge < 2; edge += 1) {
        const radius = innerRadius + edge * arcWidth
        const localX = cosine * radius
        const localZ = sine * radius
        const vertex = (point * 2 + edge) * 3
        const color = (point * 2 + edge) * 4
        const worldX = arcCenterX + sideX * localX + forwardX * localZ
        const worldZ = arcCenterZ + sideZ * localX + forwardZ * localZ
        bowArcPositions[vertex] = worldX
        bowArcPositions[vertex + 1] = sampleWaterHeight(worldX, worldZ, timeSeconds) + BOW_ARC_SURFACE_OFFSET
        bowArcPositions[vertex + 2] = worldZ
        bowArcColors[color] = 1
        bowArcColors[color + 1] = 1
        bowArcColors[color + 2] = 1
        bowArcColors[color + 3] = alpha * (edge === 0 ? 1 : 0.78)
      }
    }
    bowArcPositionAttribute.needsUpdate = true
    bowArcColorAttribute.needsUpdate = true
  }

  const reset = (): void => {
    if (disposed) return
    emissionAccumulator = 0
    contactAccumulator = 0
    wakeCursor = 0
    contactCursor = CONTACT_POOL_START
    historyHead = 0
    historyCount = 0
    historyAccumulator = 0
    trimBoost = 0
    for (const particle of particles) clearParticle(particle)
    for (const point of history) {
      point.trimBoost = 0
      point.active = false
    }
    for (let index = 0; index < POOL_SIZE; index += 1) writeParticle(index, particles[index], 0, false)
    writeRibbon(0, false)
    writeBowArc({ x: 0, z: 0, velocityX: 0, velocityZ: 0, heading: 0, yawRate: 0 }, 0, 0, false)
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

      let hasActiveHistory = false
      for (const point of history) {
        if (!point.active) continue
        point.age += delta
        if (point.age >= HISTORY_LIFETIME) point.active = false
        else hasActiveHistory = true
      }
      if (!hasActiveHistory && historyCount > 0) {
        historyCount = 0
        historyHead = 0
      }

      if (movingForward) {
        if (historyCount === 0) pushHistory(state, speed)
        historyAccumulator += delta
        while (historyAccumulator >= HISTORY_INTERVAL) {
          historyAccumulator -= HISTORY_INTERVAL
          pushHistory(state, speed)
        }
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
        historyAccumulator = 0
      }

      const boostEnabled = movingForward && trimBoost > 0
      for (let index = 0; index < POOL_SIZE; index += 1) writeParticle(index, particles[index], time, boostEnabled)
      writeRibbon(time, boostEnabled)
      writeBowArc(state, speed, time, movingForward)
      mesh.instanceMatrix.needsUpdate = true
    },
    reset,
    setTrimBoost: (amount): void => {
      if (disposed) return
      trimBoost = Number.isFinite(amount) ? Math.min(MAX_TRIM_BOOST, Math.max(0, amount)) : 0
      if (trimBoost === 0) {
        // A consumed boost is transient. Prevent already emitted pieces from
        // regaining the old multiplier if a later boost is engaged.
        for (const particle of particles) particle.trimBoost = 0
        for (const point of history) point.trimBoost = 0
      }
      if (reducedMotion) trimBoost = 0
    },
    setReducedMotion: (reduced): void => {
      if (disposed || reducedMotion === reduced) return
      reducedMotion = reduced
      if (reduced) {
        trimBoost = 0
        reset()
      }
    },
    dispose: (): void => {
      if (disposed) return
      disposed = true
      mesh.removeFromParent()
      mesh.dispose()
      geometry.dispose()
      material.dispose()
      ribbonMesh.removeFromParent()
      ribbonGeometry.dispose()
      ribbonMaterial.dispose()
      bowArcMesh.removeFromParent()
      bowArcGeometry.dispose()
      bowArcMaterial.dispose()
      dummy.clear()
    },
  }
}
