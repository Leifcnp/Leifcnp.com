import * as THREE from 'three'
import type { IslandDefinition } from '../content/islands.ts'
import { getHarbourWorldPosition, type HarbourDefinition } from '../content/harbours.ts'
import type { HarbourSnapshot } from '../interaction/localHarbour.ts'
import { sampleRenderedWaterHeight } from './waterSurfaceGrid.ts'

const SEGMENTS = 32
const SURFACE_LIFT = 0.12

export interface HarbourMarkersController {
  readonly group: THREE.Group
  readonly anchors: readonly { readonly id: string; readonly position: THREE.Vector3 }[]
  update(snapshot: HarbourSnapshot, waterPositions: ArrayLike<number>): void
  dispose(): void
}

/** Two fixed functional capture outlines in one draw; no particles or separate clock. */
export function createHarbourMarkers(
  scene: THREE.Scene,
  harbours: readonly HarbourDefinition[],
  islands: readonly IslandDefinition[],
): HarbourMarkersController {
  const entries = harbours.map(harbour => ({ harbour, centre: getHarbourWorldPosition(harbour, islands) }))
    .filter((entry): entry is { harbour: HarbourDefinition; centre: { x: number; z: number } } => entry.centre !== null)
  const positions = new Float32Array(entries.length * SEGMENTS * 2 * 3)
  const colors = new Float32Array(positions.length)
  const geometry = new THREE.BufferGeometry()
  const position = new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
  const color = new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
  geometry.setAttribute('position', position)
  geometry.setAttribute('color', color)
  const material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.88, depthWrite: false })
  const lines = new THREE.LineSegments(geometry, material)
  lines.frustumCulled = false
  const group = new THREE.Group()
  group.name = 'shipyard-local-harbour-markers'
  group.visible = false
  group.add(lines)
  scene.add(group)
  const anchors = entries.map(({ harbour, centre }) => ({ id: harbour.id, position: new THREE.Vector3(centre.x, 0, centre.z) }))
  const activeColor = new THREE.Color(0xffe8b8)
  const selectedColor = new THREE.Color(0xf0ad83)
  const idleColor = new THREE.Color(0xa9d8d3)
  let disposed = false
  return {
    group,
    anchors,
    update(snapshot, waterPositions): void {
      if (disposed) return
      group.visible = entries.length > 0 && snapshot.islandId !== null
      if (!group.visible) return
      for (let harbourIndex = 0; harbourIndex < entries.length; harbourIndex += 1) {
        const { harbour, centre } = entries[harbourIndex]
        const tint = snapshot.nearbyHarbourId === harbour.id ? activeColor : snapshot.selectedHarbourId === harbour.id ? selectedColor : idleColor
        for (let segment = 0; segment < SEGMENTS; segment += 1) {
          for (let endpoint = 0; endpoint < 2; endpoint += 1) {
            const vertex = harbourIndex * SEGMENTS * 2 + segment * 2 + endpoint
            const angle = (segment + endpoint) / SEGMENTS * Math.PI * 2
            const x = centre.x + Math.sin(angle) * harbour.captureRadius
            const z = centre.z + Math.cos(angle) * harbour.captureRadius
            const height = sampleRenderedWaterHeight(x, z, waterPositions)
            position.setXYZ(vertex, x, (Number.isFinite(height) ? height : 0) + SURFACE_LIFT, z)
            color.setXYZ(vertex, tint.r, tint.g, tint.b)
          }
        }
        const height = sampleRenderedWaterHeight(centre.x, centre.z, waterPositions)
        anchors[harbourIndex].position.y = (Number.isFinite(height) ? height : 0) + SURFACE_LIFT
      }
      position.needsUpdate = true
      color.needsUpdate = true
    },
    dispose(): void {
      if (disposed) return
      disposed = true
      group.removeFromParent()
      geometry.dispose()
      material.dispose()
    },
  }
}
