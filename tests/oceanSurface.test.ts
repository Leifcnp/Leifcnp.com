import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import {
  createOceanSurface,
  OCEAN_SURFACE_TUNING,
} from '../src/world/createOceanSurface.ts'

test('ocean surface keeps dense playable water and bounded outer geometry', () => {
  const scene = new THREE.Scene()
  const ocean = createOceanSurface(scene)
  const geometry = ocean.mesh.geometry as THREE.BufferGeometry
  const position = geometry.getAttribute('position')
  const index = geometry.getIndex()

  assert.equal(ocean.mesh.name, 'phase-one-water-field')
  assert.equal(ocean.crestMesh.name, 'phase-one-water-crest-ribbons')
  assert.ok(index)
  assert.ok(index.count / 3 <= 35_000)
  const crestIndex = ocean.crestMesh.geometry.getIndex()
  assert.ok(crestIndex)
  assert.ok(crestIndex.count / 3 <= 2_000)
  assert.ok(crestIndex.count / 3 > 500)
  assert.ok(position.count < 35_000, 'indexed lattice should avoid duplicated face vertices')
  assert.equal(position.getX(0), -OCEAN_SURFACE_TUNING.outerLimit)
  assert.equal(position.getZ(0), -OCEAN_SURFACE_TUNING.outerLimit)
  assert.ok(position.count >= 9_000, 'playable field should retain a visible central lattice')

  const centralSpacing = position.getX(1) - position.getX(0)
  assert.equal(centralSpacing, OCEAN_SURFACE_TUNING.outerStep)
  const firstCentral = Array.from({ length: position.count }, (_, vertex) => position.getX(vertex))
    .findIndex((x) => x === -OCEAN_SURFACE_TUNING.centralLimit)
  assert.ok(firstCentral > 0)
  assert.equal(position.getX(firstCentral + 1) - position.getX(firstCentral), OCEAN_SURFACE_TUNING.centralStep)
  ocean.dispose()
})

test('crest ribbons share the animated surface and remain sparse/tapered', () => {
  const scene = new THREE.Scene()
  const ocean = createOceanSurface(scene)
  const geometry = ocean.crestMesh.geometry as THREE.BufferGeometry
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  const opacity = geometry.getAttribute('crestOpacity') as THREE.BufferAttribute
  const initialY = position.getY(1)
  const initialOpacity = opacity.array.slice()

  ocean.update(2.4)

  assert.ok(Math.abs(position.getY(1) - initialY) > 0.01)
  const visible = Array.from(opacity.array).filter((value) => value > 0.01)
  assert.ok(visible.length > 20)
  assert.ok(visible.length < opacity.count * 0.75)
  assert.notDeepEqual(Array.from(opacity.array), Array.from(initialOpacity))
  ocean.dispose()
  assert.equal(ocean.crestMesh.parent, null)
})

test('recycled crest lines remain visible after long elapsed times', () => {
  const scene = new THREE.Scene()
  const ocean = createOceanSurface(scene)
  const opacity = ocean.crestMesh.geometry.getAttribute('crestOpacity') as THREE.BufferAttribute
  for (const time of [0, 120, 3600]) {
    ocean.update(time)
    const visible = Array.from(opacity.array).filter((value) => value > 0.01)
    assert.ok(visible.length > 20, `expected visible crests at ${time}s`)
    assert.ok(visible.every((value) => Number.isFinite(value)))
  }
  ocean.dispose()
})

test('crest band crosses a wave period continuously instead of jumping a wavelength', () => {
  const scene = new THREE.Scene()
  const ocean = createOceanSurface(scene)
  const position = ocean.crestMesh.geometry.getAttribute('position') as THREE.BufferAttribute
  const period = 5.8
  ocean.update(period - 0.01)
  const before = Array.from(position.array)
  ocean.update(period + 0.01)
  let largeJumps = 0
  for (let vertex = 0; vertex < position.count; vertex += 1) {
    const offset = vertex * 3
    const displacement = Math.hypot(
      position.getX(vertex) - before[offset],
      position.getZ(vertex) - before[offset + 2],
    )
    if (displacement > 1) largeJumps += 1
  }
  assert.ok(largeJumps < position.count * 0.1)
  ocean.dispose()
})

test('ocean update reuses buffers and animates both heights and crest colors', () => {
  const scene = new THREE.Scene()
  const ocean = createOceanSurface(scene)
  const geometry = ocean.mesh.geometry as THREE.BufferGeometry
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  const color = geometry.getAttribute('color') as THREE.BufferAttribute
  const initialY = position.getY(500)
  const initialColor = [color.getX(500), color.getY(500), color.getZ(500)]
  const positionArray = position.array
  const colorArray = color.array
  const positionVersion = position.version
  const colorVersion = color.version

  ocean.update(2.4)

  assert.equal(position.array, positionArray)
  assert.equal(color.array, colorArray)
  assert.ok(Math.abs(position.getY(500) - initialY) > 0.1)
  const updatedColor = [color.getX(500), color.getY(500), color.getZ(500)]
  assert.ok(initialColor.some((value, channel) => Math.abs(updatedColor[channel] - value) > 0.001))
  assert.ok(position.version > positionVersion)
  assert.ok(color.version > colorVersion)
  ocean.dispose()
  assert.equal(ocean.mesh.parent, null)
  ocean.update(8)
})
