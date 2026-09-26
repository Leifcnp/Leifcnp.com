import * as THREE from 'three'

import { calculateApparentWind, sampleWind } from '../wind.ts'
import type { VesselState } from '../vessel/kinematics.ts'

export interface WindFlagAnchor {
  readonly x: number
  readonly y: number
  readonly z: number
}

export interface WindFlagsController {
  update(state: Readonly<VesselState>, timeSeconds: number, deltaSeconds: number): void
  reset(): void
  setReducedMotion(reduced: boolean): void
  dispose(): void
}

const BOAT_ANCHOR = new THREE.Vector3(0, 5.87, -0.34)
const DEFAULT_DOWNWIND = new THREE.Vector3(1, 0, 0)
const SEGMENTS = 5
const LAND_LENGTH = 2.25
const BOAT_LENGTH = 1.42
const LAND_WIDTH = 0.42
const BOAT_WIDTH = 0.28
const MAX_DELTA = 0.25

interface FlagPart {
  readonly mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  readonly origin: THREE.Vector3
  readonly length: number
  readonly width: number
  readonly phase: number
  readonly direction: THREE.Vector3
}

function finiteOr(value: number, fallback = 0): number {
  return Number.isFinite(value) ? value : fallback
}

function safeWind(x: number, z: number): THREE.Vector3 {
  const vector = new THREE.Vector3(finiteOr(x), 0, finiteOr(z))
  if (vector.lengthSq() < 1e-12) return DEFAULT_DOWNWIND.clone()
  return vector.normalize()
}

function createFlagGeometry(length: number, width: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array((SEGMENTS + 1) * 2 * 3)
  const colors = new Float32Array((SEGMENTS + 1) * 2 * 3)
  const coral = new THREE.Color(0xf06f68)
  const cream = new THREE.Color(0xfff1d6)
  for (let row = 0; row <= SEGMENTS; row += 1) {
    const color = row % 2 === 0 ? coral : cream
    for (let side = 0; side < 2; side += 1) {
      const index = (row * 2 + side) * 3
      color.toArray(colors, index)
    }
  }
  const indices: number[] = []
  for (let row = 0; row < SEGMENTS; row += 1) {
    const a = row * 2
    const b = a + 2
    indices.push(a, b, a + 1, a + 1, b, b + 1)
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setIndex(indices)
  geometry.userData = { length, width, segments: SEGMENTS }
  return geometry
}

function createFlagMesh(name: string, length: number, width: number, phase: number): FlagPart {
  const geometry = createFlagGeometry(length, width)
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    transparent: false,
    opacity: 1,
    depthWrite: true,
    forceSinglePass: true,
    toneMapped: false,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = name
  mesh.userData = { length, width, phase, direction: new THREE.Vector3() }
  return { mesh, origin: new THREE.Vector3(), length, width, phase, direction: DEFAULT_DOWNWIND.clone() }
}

function updateFlag(flag: FlagPart, direction: THREE.Vector3, elapsed: number, reduced: boolean): void {
  const position = flag.mesh.geometry.getAttribute('position') as THREE.BufferAttribute
  flag.direction.copy(direction)
  const meshDirection = flag.mesh.userData.direction as THREE.Vector3
  meshDirection.copy(flag.direction)
  for (let row = 0; row <= SEGMENTS; row += 1) {
    const progress = row / SEGMENTS
    const trailingWidth = flag.width * (1 - progress * 0.76)
    const flutter = reduced ? 0 : Math.sin(elapsed * 5.4 + flag.phase + progress * 3.2) * 0.055 * progress
    const verticalFlutter = reduced ? 0 : Math.cos(elapsed * 4.1 + flag.phase + progress) * 0.035 * progress
    const x = flag.origin.x + direction.x * flag.length * progress - direction.z * flutter
    const y = flag.origin.y + verticalFlutter
    const z = flag.origin.z + direction.z * flag.length * progress + direction.x * flutter
    position.setXYZ(row * 2, x, y + trailingWidth, z)
    position.setXYZ(row * 2 + 1, x, y - trailingWidth, z)
  }
  position.needsUpdate = true
  flag.mesh.geometry.computeBoundingSphere()
}

/** Build small code-authored pennants that make true and apparent wind visible. */
export function createWindFlags(
  scene: THREE.Scene,
  vesselGroup: THREE.Group,
  anchors: readonly WindFlagAnchor[],
): WindFlagsController {
  const resources: Array<THREE.BufferGeometry | THREE.Material> = []
  const flags: FlagPart[] = []
  const masts: THREE.Mesh[] = []
  const landAnchors = Array.isArray(anchors) ? anchors : []

  for (let index = 0; index < landAnchors.length; index += 1) {
    const anchor = landAnchors[index]
    const mastGeometry = new THREE.CylinderGeometry(0.035, 0.055, 3, 5)
    const mastMaterial = new THREE.MeshBasicMaterial({ color: 0x4e4c43, toneMapped: false })
    const mast = new THREE.Mesh(mastGeometry, mastMaterial)
    mast.name = `wind-flag-land-mast-${index}`
    scene.add(mast)
    masts.push(mast)
    resources.push(mastGeometry, mastMaterial)
    const flag = createFlagMesh(`wind-flag-land-${index}`, LAND_LENGTH, LAND_WIDTH, index * 1.7)
    scene.add(flag.mesh)
    flags.push(flag)
    resources.push(flag.mesh.geometry, flag.mesh.material)
  }

  const boatFlag = createFlagMesh('wind-flag-vessel-masthead', BOAT_LENGTH, BOAT_WIDTH, 4.7)
  scene.add(boatFlag.mesh)
  flags.push(boatFlag)
  resources.push(boatFlag.mesh.geometry, boatFlag.mesh.material)

  let elapsed = 0
  let reducedMotion = false
  let disposed = false
  const wind = new THREE.Vector3()
  const boatOrigin = new THREE.Vector3()

  const refreshLandOrigins = (): void => {
    for (let index = 0; index < landAnchors.length; index += 1) {
      const anchor = landAnchors[index]
      const mast = masts[index]
      const flag = flags[index]
      const x = finiteOr(anchor?.x)
      const y = finiteOr(anchor?.y)
      const z = finiteOr(anchor?.z)
      mast.position.set(x, y + 1.5, z)
      flag.origin.set(x, y + 3, z)
    }
  }

  const update = (state: Readonly<VesselState>, timeSeconds: number, deltaSeconds: number): void => {
    if (disposed) return
    const dt = Math.min(MAX_DELTA, Math.max(0, finiteOr(deltaSeconds)))
    if (dt > 0) elapsed = finiteOr(timeSeconds, elapsed)
    refreshLandOrigins()
    const trueWind = sampleWind(finiteOr(timeSeconds))
    wind.set(trueWind.x, 0, trueWind.z)
    const trueDirection = safeWind(wind.x, wind.z)
    for (let index = 0; index < landAnchors.length; index += 1) updateFlag(flags[index], trueDirection, elapsed, reducedMotion)

    vesselGroup.updateMatrixWorld(true)
    boatOrigin.copy(BOAT_ANCHOR)
    vesselGroup.localToWorld(boatOrigin)
    boatFlag.origin.copy(boatOrigin)
    const apparent = calculateApparentWind(
      trueWind,
      finiteOr(state?.velocityX),
      finiteOr(state?.velocityZ),
    )
    const apparentDirection = Math.hypot(apparent.x, apparent.z) < 1e-6
      ? boatFlag.direction
      : safeWind(apparent.x, apparent.z)
    updateFlag(boatFlag, apparentDirection, elapsed, reducedMotion)
  }

  const reset = (): void => {
    if (disposed) return
    elapsed = 0
    refreshLandOrigins()
    update({ x: 0, z: 0, velocityX: 0, velocityZ: 0, heading: 0, yawRate: 0 }, 0, 0)
  }

  return {
    update,
    reset,
    setReducedMotion: (reduced: boolean): void => {
      if (disposed) return
      reducedMotion = reduced === true
      // Rebuild immediately so pausing or reduced-motion changes cannot leave
      // a previously fluttering frame visible until the next simulation tick.
      for (const flag of flags) updateFlag(flag, flag.direction, elapsed, reducedMotion)
    },
    dispose: (): void => {
      if (disposed) return
      disposed = true
      for (const mast of masts) {
        mast.removeFromParent()
        mast.geometry.dispose()
        ;(mast.material as THREE.MeshBasicMaterial).dispose()
      }
      for (const flag of flags) {
        flag.mesh.removeFromParent()
        flag.mesh.geometry.dispose()
        ;(flag.mesh.material as THREE.MeshBasicMaterial).dispose()
      }
      resources.length = 0
    },
  }
}
