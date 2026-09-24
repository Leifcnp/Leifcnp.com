import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import { portfolioIslands } from '../src/content/islands.ts'
import { createLandmarks } from '../src/world/createLandmarks.ts'

const EPSILON = 1e-5

function islandGroup(scene: THREE.Scene, id: string): THREE.Group {
  const group = scene.getObjectByName(id)
  assert.ok(group instanceof THREE.Group, `expected an island group named ${id}`)
  return group
}

function objectResources(group: THREE.Group): Set<{ dispose(): void }> {
  const resources = new Set<{ dispose(): void }>()
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh || object instanceof THREE.Line)) return

    resources.add(object.geometry)
    if (Array.isArray(object.material)) {
      for (const material of object.material) resources.add(material)
    } else {
      resources.add(object.material)
    }
  })
  return resources
}

function localXZRadius(object: THREE.Object3D, position: THREE.BufferAttribute, index: number): number {
  const point = new THREE.Vector3().fromBufferAttribute(position, index).applyMatrix4(object.matrix)
  return Math.hypot(point.x, point.z)
}

test('keeps every generated land mesh inside its declared collision radius', () => {
  const scene = new THREE.Scene()
  const landmarks = createLandmarks(scene, portfolioIslands)
  landmarks.group.updateMatrixWorld(true)

  for (const island of portfolioIslands) {
    const group = islandGroup(scene, island.id)
    group.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      const positions = object.geometry.getAttribute('position')
      assert.ok(positions, `${island.id}/${object.name} has vertex positions`)
      for (let index = 0; index < positions.count; index += 1) {
        assert.ok(
          localXZRadius(object, positions, index) <= island.landCollisionRadius + EPSILON,
          `${island.id}/${object.name} vertex ${index} exceeds landCollisionRadius`,
        )
      }
    })
  }

  landmarks.dispose()
})

test('uses declared island positions, exact docking radii, and matching anchor IDs', () => {
  const scene = new THREE.Scene()
  const landmarks = createLandmarks(scene, portfolioIslands)
  landmarks.group.updateMatrixWorld(true)

  assert.deepEqual(
    landmarks.anchors.map((anchor) => anchor.id),
    portfolioIslands.map((island) => island.id),
  )

  for (const [index, island] of portfolioIslands.entries()) {
    const group = islandGroup(scene, island.id)
    assert.equal(group.position.x, island.position.x)
    assert.equal(group.position.z, island.position.z)
    assert.deepEqual(group.userData, {
      islandId: island.id,
      landCollisionRadius: island.landCollisionRadius,
      dockingTriggerRadius: island.dockingTriggerRadius,
    })

    const ring = group.getObjectByName('docking-boundary')
    assert.ok(ring instanceof THREE.Line, `${island.id} has a docking boundary`)
    const positions = ring.geometry.getAttribute('position')
    assert.ok(positions, `${island.id} docking boundary has samples`)
    for (let sample = 0; sample < positions.count; sample += 1) {
      assert.ok(
        Math.abs(localXZRadius(ring, positions, sample) - island.dockingTriggerRadius) <= EPSILON,
        `${island.id} docking sample ${sample} differs from dockingTriggerRadius`,
      )
    }

    const anchor = landmarks.anchors[index]
    const anchorOffset = Math.hypot(
      anchor.position.x - island.position.x,
      anchor.position.z - island.position.z,
    )
    assert.ok(anchorOffset > 0, `${island.id} anchor is offset from its island`)
    assert.ok(
      anchorOffset < island.dockingTriggerRadius,
      `${island.id} anchor remains inside its docking boundary`,
    )
  }

  landmarks.dispose()
})

test('disposes every unique geometry and material once, including on repeated dispose', () => {
  const scene = new THREE.Scene()
  const landmarks = createLandmarks(scene, portfolioIslands)
  const resources = objectResources(landmarks.group)
  const disposeCounts = new Map<{ dispose(): void }, number>()

  for (const resource of resources) {
    disposeCounts.set(resource, 0)
    const dispose = resource.dispose.bind(resource)
    resource.dispose = (): void => {
      disposeCounts.set(resource, (disposeCounts.get(resource) ?? 0) + 1)
      dispose()
    }
  }

  landmarks.dispose()
  landmarks.dispose()

  assert.equal(landmarks.group.parent, null)
  assert.equal(landmarks.group.children.length, 0)
  assert.equal(scene.children.includes(landmarks.group), false)
  for (const [resource, count] of disposeCounts) {
    assert.equal(count, 1, 'each unique landmark resource is disposed exactly once')
    void resource
  }
})
