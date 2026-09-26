import * as THREE from 'three'
import type { IslandDefinition } from '../../content/islands.ts'
import { sampleWind } from '../wind.ts'
import { sampleFacetedWaterHeight } from '../waterSurfaceGrid.ts'

export interface WindStreamsController {
  update(center: { x: number; z: number }, timeSeconds: number, deltaSeconds: number): void
  reset(): void
  setReducedMotion(reduced: boolean): void
  dispose(): void
}

export const WIND_STREAM_CAPACITY = 32
const VERTICES_PER_STREAM = 9
const LENGTH = 13
const WIDTH = 0.72
const HEIGHT = 2.15
const SPEED = 2.4
const ISLAND_MARGIN = 2.5
const WORLD_EXTENT = 64
const STREAM_POINTS: readonly [number, number][] = [
  [0, -WIDTH * 0.5], [0, WIDTH * 0.5], [LENGTH * 0.5, WIDTH * 0.14],
  [0, -WIDTH * 0.5], [LENGTH * 0.5, WIDTH * 0.14], [LENGTH * 0.5, -WIDTH * 0.14],
  [LENGTH * 0.5, -WIDTH * 0.14], [LENGTH * 0.5, WIDTH * 0.14], [LENGTH, 0],
]

function finiteOr(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? (value as number) : fallback
}

function fract(value: number): number {
  return value - Math.floor(value)
}

function hash(index: number, salt: number): number {
  return fract(Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453)
}

function smoothUnit(value: number): number {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

/** Fade the entire stroke before any part can cross the shoreline margin. */
function islandVisibility(startX: number, startZ: number, endX: number, endZ: number, islands: readonly IslandDefinition[]): number {
  const dx = endX - startX
  const dz = endZ - startZ
  const squaredLength = dx * dx + dz * dz
  let visibility = 1
  for (const island of islands) {
    const t = Math.min(1, Math.max(0, ((island.position.x - startX) * dx + (island.position.z - startZ) * dz) / Math.max(squaredLength, 1e-9)))
    const distance = Math.hypot(startX + dx * t - island.position.x, startZ + dz * t - island.position.z)
    const clearance = distance - Math.max(0, finiteOr(island.landCollisionRadius, 0)) - ISLAND_MARGIN - WIDTH
    visibility = Math.min(visibility, smoothUnit(clearance / 6))
  }
  return visibility
}

/** Moving the view selects another periodic copy only beyond the invisible rim. */
function nearestCopy(position: number, center: number): number {
  const period = WORLD_EXTENT * 2
  return center + ((position - center + WORLD_EXTENT) % period + period) % period - WORLD_EXTENT
}

/** A single fixed, translucent draw of sparse wind-carried ribbons. */
export function createWindStreams(scene: THREE.Scene, islands: readonly IslandDefinition[]): WindStreamsController {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(WIND_STREAM_CAPACITY * VERTICES_PER_STREAM * 3)
  const alphas = new Float32Array(WIND_STREAM_CAPACITY * VERTICES_PER_STREAM)
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
  geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage))
  const material = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(0x91d8df) } },
    vertexShader: 'attribute float aAlpha; varying float vAlpha; void main(){vAlpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'uniform vec3 color; varying float vAlpha; void main(){gl_FragColor=vec4(color,vAlpha);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    forceSinglePass: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'phase-thirteen-wind-streams'
  mesh.frustumCulled = false
  scene.add(mesh)
  let reducedMotion = false
  let disposed = false
  let lastCenterX = 0
  let lastCenterZ = 0
  let lastTime = 0

  const writeHidden = (): void => {
    for (let i = 0; i < alphas.length; i += 1) alphas[i] = 0
    ;(geometry.getAttribute('aAlpha') as THREE.BufferAttribute).needsUpdate = true
  }

  const update = (center: { x: number; z: number }, timeSeconds: number, _deltaSeconds: number): void => {
    if (disposed) return
    lastCenterX = finiteOr(center?.x, 0)
    lastCenterZ = finiteOr(center?.z, 0)
    lastTime = finiteOr(timeSeconds, 0)
    if (reducedMotion) { writeHidden(); return }
    const wind = sampleWind(lastTime)
    const windLength = Math.hypot(wind.x, wind.z) || 1
    const dirX = wind.x / windLength
    const dirZ = wind.z / windLength
    const sideX = -dirZ
    const sideZ = dirX
    let vertex = 0
    for (let stream = 0; stream < WIND_STREAM_CAPACITY; stream += 1) {
      // A stratified, seeded world pattern. Camera movement never changes a
      // live stream's seed or velocity; offscreen periodic copies fade in.
      const seedX = ((stream % 8) + 0.2 + hash(stream, 7) * 0.6) / 8 * WORLD_EXTENT * 2 - WORLD_EXTENT
      const seedZ = (Math.floor(stream / 8) + 0.2 + hash(stream, 19) * 0.6) / 4 * WORLD_EXTENT * 2 - WORLD_EXTENT
      const midX = nearestCopy(seedX + dirX * SPEED * lastTime, lastCenterX)
      const midZ = nearestCopy(seedZ + dirZ * SPEED * lastTime, lastCenterZ)
      const baseX = midX - dirX * LENGTH * 0.5
      const baseZ = midZ - dirZ * LENGTH * 0.5
      const radius = Math.hypot(midX - lastCenterX, midZ - lastCenterZ)
      const edgeFade = 1 - smoothUnit((radius - 44) / 14)
      const landFade = islandVisibility(baseX, baseZ, baseX + dirX * LENGTH, baseZ + dirZ * LENGTH, islands)
      const visibility = edgeFade * landFade * Math.min(1, windLength / 9)
      for (let local = 0; local < STREAM_POINTS.length; local += 1) {
        const [along, lateral] = STREAM_POINTS[local]
        const x = baseX + dirX * along + sideX * lateral
        const z = baseZ + dirZ * along + sideZ * lateral
        positions[vertex * 3] = x
        positions[vertex * 3 + 1] = sampleFacetedWaterHeight(x, z, lastTime) + HEIGHT
        positions[vertex * 3 + 2] = z
        alphas[vertex] = Math.min(1, along, LENGTH - along) * visibility * 0.42
        vertex += 1
      }
    }
    ;(geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
    ;(geometry.getAttribute('aAlpha') as THREE.BufferAttribute).needsUpdate = true
  }

  const reset = (): void => {
    if (disposed) return
    lastCenterX = 0
    lastCenterZ = 0
    lastTime = 0
    update({ x: 0, z: 0 }, 0, 0)
  }
  reset()
  return {
    update,
    reset,
    setReducedMotion: (value: boolean): void => { reducedMotion = value; update({ x: lastCenterX, z: lastCenterZ }, lastTime, 0) },
    dispose: (): void => {
      if (disposed) return
      disposed = true
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
    },
  }
}
