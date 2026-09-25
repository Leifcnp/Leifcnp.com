import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import { createVessel } from '../src/world/createVessel.ts'
import { createVesselState } from '../src/world/vessel/kinematics.ts'

function createTestVessel() {
  const scene = new THREE.Scene()
  const vessel = createVessel(scene)
  vessel.resetPose(createVesselState(), 0)
  scene.updateMatrixWorld(true)
  return { scene, vessel }
}

function isolateVesselTransform(vessel: ReturnType<typeof createVessel>): void {
  vessel.group.position.set(0, 0, 0)
  vessel.group.rotation.set(0, 0, 0)
}

function mesh(group: THREE.Group, name: string): THREE.Mesh {
  const found = group.getObjectByName(name)
  assert.ok(found instanceof THREE.Mesh, `${name} should be a mesh`)
  return found
}

function close(actual: number, expected: number, tolerance = 1e-6): void {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should be within ${tolerance} of ${expected}`)
}

function triangleAreaYZ(mesh: THREE.Mesh): number {
  const position = mesh.geometry.getAttribute('position')
  const index = mesh.geometry.getIndex()
  assert.ok(index, 'sail geometry should be indexed')
  let area = 0
  for (let offset = 0; offset < index.count; offset += 3) {
    const a = index.getX(offset)
    const b = index.getX(offset + 1)
    const c = index.getX(offset + 2)
    const ay = position.getY(a)
    const az = position.getZ(a)
    const by = position.getY(b)
    const bz = position.getZ(b)
    const cy = position.getY(c)
    const cz = position.getZ(c)
    area += Math.abs((by - ay) * (cz - az) - (bz - az) * (cy - ay)) * 0.5
  }
  return area
}

test('sail rig preserves the neutral geometry and pivots at the mast axis', () => {
  const { scene, vessel } = createTestVessel()
  isolateVesselTransform(vessel)
  const rig = vessel.group.getObjectByName('sail-rig')
  assert.ok(rig instanceof THREE.Group)
  rig.rotation.y = 0
  scene.updateMatrixWorld(true)
  const boom = mesh(vessel.group, 'vessel-main-boom')
  const sail = mesh(vessel.group, 'vessel-cream-mainsail')
  const shade = mesh(vessel.group, 'vessel-mainsail-facet')
  const clewAccent = mesh(vessel.group, 'vessel-coral-main-clew')
  const mast = mesh(vessel.group, 'vessel-mast')

  close(rig.position.x, 0)
  close(rig.position.z, -0.34)
  close(boom.position.z, -1.555)
  close(sail.position.z, 0.34)
  close(shade.position.z, 0.34)
  close(clewAccent.position.z, 0.34)
  assert.equal(boom.parent, rig)
  assert.equal(sail.parent, rig)
  assert.equal(shade.parent, rig)
  assert.equal(clewAccent.parent, rig)
  assert.equal(vessel.group.getObjectByName('vessel-cream-jib'), undefined)
  assert.equal(vessel.group.getObjectByName('vessel-coral-jib-accent'), undefined)
  assert.equal(vessel.group.getObjectByName('vessel-bowsprit'), undefined)

  mast.geometry.computeBoundingBox()
  const mastBounds = mast.geometry.boundingBox
  assert.ok(mastBounds && mastBounds.max.y - mastBounds.min.y > 5.4)
  const legacyMainArea = (4.46 - 0.74) * (2.22 - 0.39) * 0.5
  assert.ok(triangleAreaYZ(sail) / legacyMainArea >= 1.6, 'main sail area should be at least 1.6x the original')
  const boomMaterial = boom.material as THREE.MeshStandardMaterial
  assert.equal(boomMaterial.color.getHex(), 0xf06f68)
  assert.equal(rig.scale.x, 1)
  const sailPosition = sail.geometry.getAttribute('position')
  close(sailPosition.getX(3), -0.6)

  const neutralBoom = new THREE.Vector3()
  boom.getWorldPosition(neutralBoom)
  close(neutralBoom.x, 0)
  close(neutralBoom.z, -1.895)
  assert.equal(vessel.group.getObjectByName('sail-rig')?.name, 'sail-rig')
  vessel.dispose()
  assert.equal(scene.children.length, 0)
})

test('signed sail angle mirrors the boom and both mainsail meshes together', () => {
  const { scene, vessel } = createTestVessel()
  isolateVesselTransform(vessel)
  const boom = mesh(vessel.group, 'vessel-main-boom')
  const sail = mesh(vessel.group, 'vessel-cream-mainsail')
  const shade = mesh(vessel.group, 'vessel-mainsail-facet')

  vessel.setSailAngle(Math.PI / 2, true)
  scene.updateMatrixWorld(true)
  const starboardWindBoom = new THREE.Vector3()
  boom.getWorldPosition(starboardWindBoom)
  assert.ok(starboardWindBoom.x < -0.8, 'positive angle should swing the boom toward -X')
  close(sail.parent?.rotation.y ?? 0, shade.parent?.rotation.y ?? 0)
  close(vessel.getSailAngle(), 85 * Math.PI / 180)

  vessel.setSailAngle(-Math.PI / 2, true)
  scene.updateMatrixWorld(true)
  const portWindBoom = new THREE.Vector3()
  boom.getWorldPosition(portWindBoom)
  assert.ok(portWindBoom.x > 0.8, 'negative angle should mirror the boom toward +X')
  close(vessel.getSailAngle(), -85 * Math.PI / 180)
  assert.equal(vessel.group.getObjectByName('sail-rig')?.scale.x, -1)
  vessel.dispose()
})

test('sail target smooths with elapsed time, while zero dt and reset preserve intent', () => {
  const first = createTestVessel()
  first.vessel.setSailAngle(Math.PI / 4, true)
  first.vessel.setSailAngle(-Math.PI / 4)
  const before = first.vessel.getSailAngle()
  first.vessel.update(createVesselState(), 0, 0)
  close(first.vessel.getSailAngle(), before)
  first.vessel.update(createVesselState(), 0, 0.1)
  const afterOne = first.vessel.getSailAngle()
  assert.ok(afterOne < before && afterOne > -Math.PI / 4)
  first.vessel.resetPose(createVesselState(4, -3), 2)
  close(first.vessel.getSailAngle(), -Math.PI / 4)
  first.vessel.dispose()

  const partitioned = createTestVessel()
  partitioned.vessel.setSailAngle(Math.PI / 4, true)
  partitioned.vessel.setSailAngle(-Math.PI / 4)
  partitioned.vessel.update(createVesselState(), 0, 0.05)
  partitioned.vessel.update(createVesselState(), 0, 0.05)
  assert.ok(Math.abs(partitioned.vessel.getSailAngle() - afterOne) < 0.01)
  partitioned.vessel.dispose()
})

test('sail angle input is finite, bounded, and reduced motion snaps decoratively', () => {
  const { vessel } = createTestVessel()
  vessel.setSailAngle(Number.NaN, true)
  close(vessel.getSailAngle(), 85 * Math.PI / 180)
  vessel.setSailAngle(0, true)
  close(vessel.getSailAngle(), 8 * Math.PI / 180)
  vessel.setSailAngle(-Math.PI, true)
  close(vessel.getSailAngle(), -85 * Math.PI / 180)
  vessel.setSailLoad(Number.POSITIVE_INFINITY, Number.NaN)
  vessel.update(createVesselState(), 0, 0.1)
  for (const value of Object.values(vessel.getPose())) assert.ok(Number.isFinite(value))
  vessel.setReducedMotion(true)
  vessel.setSailAngle(Math.PI / 4)
  close(vessel.getSailAngle(), Math.PI / 4)
  vessel.dispose()
})

test('sail load supplies a bounded, mirrored heel cue to the hull pose', () => {
  const neutral = createTestVessel()
  neutral.vessel.setSailLoad(0, 0)
  neutral.vessel.update(createVesselState(), 0, 0.1)
  const neutralRoll = neutral.vessel.getPose().roll
  neutral.vessel.dispose()

  const portLoaded = createTestVessel()
  portLoaded.vessel.setSailLoad(1, Math.PI / 2)
  portLoaded.vessel.update(createVesselState(), 0, 0.1)
  assert.ok(portLoaded.vessel.getPose().roll > neutralRoll + 0.05)
  portLoaded.vessel.dispose()

  const starboardLoaded = createTestVessel()
  starboardLoaded.vessel.setSailLoad(1, -Math.PI / 2)
  starboardLoaded.vessel.update(createVesselState(), 0, 0.1)
  assert.ok(starboardLoaded.vessel.getPose().roll < neutralRoll - 0.05)
  starboardLoaded.vessel.dispose()
})

test('vessel disposal disposes each unique material once', () => {
  const { vessel } = createTestVessel()
  const materials = new Set<THREE.Material>()
  vessel.group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      const meshMaterial = object.material
      if (Array.isArray(meshMaterial)) {
        for (const material of meshMaterial) materials.add(material)
      } else {
        materials.add(meshMaterial)
      }
    }
  })
  const disposeCounts = new Map<THREE.Material, number>()
  for (const material of materials) {
    disposeCounts.set(material, 0)
    material.addEventListener('dispose', () => {
      disposeCounts.set(material, (disposeCounts.get(material) ?? 0) + 1)
    })
  }
  vessel.dispose()
  vessel.dispose()
  for (const material of materials) assert.equal(disposeCounts.get(material), 1)
})
