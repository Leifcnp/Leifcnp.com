import * as THREE from 'three'
import { MAX_WAVE_HEIGHT, PRIMARY_WAVE, sampleWaterSurface } from '../waves.ts'
import { STORM_TUNING } from '../stormField.ts'
import { sampleFacetedWaterHeight, sampleRenderedWaterHeight } from '../waterSurfaceGrid.ts'

export interface ShorelineIslandProjection {
  readonly position: { readonly x: number; readonly z: number }
  readonly landCollisionRadius: number
}

export interface ShorelineFoamController {
  readonly mesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>
  update(timeSeconds: number, renderedPositions?: ArrayLike<number>): void
  reset(): void
  setReducedMotion(reduced: boolean): void
  dispose(): void
}

export const SHORELINE_FOAM_CAPACITY = 10
export const SHORELINE_FOAM_VERTEX_COUNT = 100
export const SHORELINE_FOAM_TRIANGLE_COUNT = 80
export const SHORELINE_FOOTPRINT_FACTOR = 0.98
export const SHORELINE_INNER_CLEARANCE = 0.2

const SEGMENTS_PER_FACE = 5
const VERTICES_PER_FACE = SEGMENTS_PER_FACE * 2
const PATCH_MIN_WIDTH = 0.3
const PATCH_MAX_WIDTH = 1.1
const SURFACE_LIFT = 0.04
const WATER_HEIGHT_BOUND = MAX_WAVE_HEIGHT * STORM_TUNING.maxWaveScale
const WAVE_LENGTH = Math.hypot(PRIMARY_WAVE.directionX, PRIMARY_WAVE.directionZ)
const POSITION_COMPONENTS = SHORELINE_FOAM_VERTEX_COUNT * 3
const ALPHA_COMPONENTS = SHORELINE_FOAM_VERTEX_COUNT

function finiteOr(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? value as number : fallback
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = clamp((value - edge0) / Math.max(edge1 - edge0, 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Bounded contact from the shared surface, with no independent phase or clock. */
export function getShorelineFoamIntensity(
  normalX: number,
  normalZ: number,
  height: number,
  velocityY: number,
  stormIntensity = 0,
): number {
  if (!Number.isFinite(height)) return 0
  // Wave phase increases with +time, so propagation is -PRIMARY.direction.
  // An outward normal facing the incoming swell has +PRIMARY.direction dot n.
  const incidence = clamp((PRIMARY_WAVE.directionX * finiteOr(normalX, 0) +
    PRIMARY_WAVE.directionZ * finiteOr(normalZ, 0)) / WAVE_LENGTH, 0, 1)
  const crestGate = smoothstep(-0.15, 0.7, height)
  const velocityGate = 0.6 + 0.4 * smoothstep(-0.2, 1, finiteOr(velocityY, 0))
  const stormGain = 1 + 0.25 * clamp(finiteOr(stormIntensity, 0), 0, 1)
  return clamp(crestGate * velocityGate * incidence * stormGain, 0, 1)
}

function islandRadius(island: ShorelineIslandProjection | undefined): number {
  return Math.max(0.1, finiteOr(island?.landCollisionRadius, 1)) * SHORELINE_FOOTPRINT_FACTOR
}

/** Return the water-side midpoint anchor and outward normal for one decagon face. */
export function getShorelineFoamAnchor(
  island: ShorelineIslandProjection,
  index: number,
): { x: number; z: number; normalX: number; normalZ: number; tangentX: number; tangentZ: number } {
  const side = ((index % SHORELINE_FOAM_CAPACITY) + SHORELINE_FOAM_CAPACITY) % SHORELINE_FOAM_CAPACITY
  const theta = (side + 0.5) * Math.PI * 2 / SHORELINE_FOAM_CAPACITY
  const normalX = Math.sin(theta)
  const normalZ = Math.cos(theta)
  const tangentX = normalZ
  const tangentZ = -normalX
  const radius = islandRadius(island)
  const apothem = radius * Math.cos(Math.PI / SHORELINE_FOAM_CAPACITY)
  const x = finiteOr(island.position?.x, 0) + normalX * (apothem + SHORELINE_INNER_CLEARANCE)
  const z = finiteOr(island.position?.z, 0) + normalZ * (apothem + SHORELINE_INNER_CLEARANCE)
  return { x, z, normalX, normalZ, tangentX, tangentZ }
}

function createIndices(): Uint16Array {
  const indices = new Uint16Array(SHORELINE_FOAM_TRIANGLE_COUNT * 3)
  let cursor = 0
  for (let face = 0; face < SHORELINE_FOAM_CAPACITY; face += 1) {
    const base = face * VERTICES_PER_FACE
    for (let segment = 0; segment < SEGMENTS_PER_FACE - 1; segment += 1) {
      const left = base + segment * 2
      const right = left + 2
      indices[cursor++] = left
      indices[cursor++] = right
      indices[cursor++] = left + 1
      indices[cursor++] = right
      indices[cursor++] = right + 1
      indices[cursor++] = left + 1
    }
  }
  return indices
}

/** One bounded, directional shoreline cue for the first supplied island. */
export function createShorelineFoam(
  scene: THREE.Scene,
  islands: readonly ShorelineIslandProjection[],
): ShorelineFoamController {
  const positions = new Float32Array(POSITION_COMPONENTS)
  const alphas = new Float32Array(ALPHA_COMPONENTS)
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
  geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage))
  geometry.setIndex(new THREE.BufferAttribute(createIndices(), 1))
  const material = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(0xf4fbf7) } },
    vertexShader: 'attribute float aAlpha; varying float vAlpha; void main(){vAlpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'uniform vec3 color; varying float vAlpha; void main(){gl_FragColor=vec4(color,vAlpha);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>}',
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    forceSinglePass: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'phase-fifteen-shoreline-foam'
  mesh.frustumCulled = false
  scene.add(mesh)

  const island = islands[0]
  mesh.visible = Boolean(island)
  const anchors = island
    ? Array.from({ length: SHORELINE_FOAM_CAPACITY }, (_, index) => getShorelineFoamAnchor(island, index))
    : []
  const halfSpan = island
    ? Math.max(0.04, islandRadius(island) * Math.sin(Math.PI / SHORELINE_FOAM_CAPACITY) - 0.18)
    : 0
  let reducedMotion = false
  let disposed = false
  let lastTime = 0

  const writeAll = (timeSeconds: number, renderedPositions?: ArrayLike<number>): void => {
    if (!island || reducedMotion) return
    for (let face = 0; face < SHORELINE_FOAM_CAPACITY; face += 1) {
      const anchor = anchors[face] ?? null
      const phaseSample = anchor ? sampleWaterSurface(anchor.x, anchor.z, timeSeconds) : null
      const renderedHeight = anchor
        ? renderedPositions
          ? sampleRenderedWaterHeight(anchor.x, anchor.z, renderedPositions)
          : sampleFacetedWaterHeight(anchor.x, anchor.z, timeSeconds)
        : 0
      const dockWedge = anchor && anchor.normalX * Math.SQRT1_2 + anchor.normalZ * Math.SQRT1_2 > 0.95 ? 0 : 1
      const activity = anchor && phaseSample
        ? getShorelineFoamIntensity(anchor.normalX, anchor.normalZ, renderedHeight, phaseSample.velocityY, phaseSample.stormIntensity) * dockWedge
        : 0
      const width = PATCH_MIN_WIDTH + (PATCH_MAX_WIDTH - PATCH_MIN_WIDTH) * activity
      for (let segment = 0; segment < SEGMENTS_PER_FACE; segment += 1) {
        const along = (segment / (SEGMENTS_PER_FACE - 1) * 2 - 1) * halfSpan
        const taper = Math.sin(Math.PI * segment / (SEGMENTS_PER_FACE - 1))
        for (let row = 0; row < 2; row += 1) {
          const vertex = face * VERTICES_PER_FACE + segment * 2 + row
          // Keep the inner edge on the water side of the actual polygon;
          // widening only moves the outer edge farther into the water.
          const cross = row * width
          const x = anchor ? anchor.x + anchor.tangentX * along + anchor.normalX * cross : 0
          const z = anchor ? anchor.z + anchor.tangentZ * along + anchor.normalZ * cross : 0
          positions[vertex * 3] = x
          positions[vertex * 3 + 1] = anchor
            ? clamp(finiteOr(renderedPositions ? sampleRenderedWaterHeight(x, z, renderedPositions) : sampleFacetedWaterHeight(x, z, timeSeconds), 0), -WATER_HEIGHT_BOUND, WATER_HEIGHT_BOUND) + SURFACE_LIFT
            : 0
          positions[vertex * 3 + 2] = z
          alphas[vertex] = Math.min(0.6, activity * taper * (0.76 + row * 0.08))
        }
      }
    }
    ;(geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
    ;(geometry.getAttribute('aAlpha') as THREE.BufferAttribute).needsUpdate = true
  }

  const reset = (): void => {
    if (disposed) return
    lastTime = 0
    writeAll(0)
  }
  reset()

  return {
    mesh,
    update: (timeSeconds, renderedPositions): void => {
      if (disposed) return
      lastTime = finiteOr(timeSeconds, lastTime)
      writeAll(reducedMotion ? 0 : lastTime, reducedMotion ? undefined : renderedPositions)
    },
    reset,
    setReducedMotion: (value): void => {
      if (disposed) return
      reducedMotion = value
      mesh.visible = Boolean(island) && !reducedMotion
      if (reducedMotion) {
        alphas.fill(0)
        ;(geometry.getAttribute('aAlpha') as THREE.BufferAttribute).needsUpdate = true
      } else {
        writeAll(lastTime)
      }
    },
    dispose: (): void => {
      if (disposed) return
      disposed = true
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
    },
  }
}
