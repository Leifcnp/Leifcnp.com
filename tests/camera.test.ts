import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import { createCameraRig } from '../src/world/createCameraRig.ts'

const CAMERA_OFFSET = 220
const WATER_HALF_EXTENT = 360
const VESSEL_EDGE = 176.8
const EPSILON = 1e-6

function assertNear(actual: number, expected: number, tolerance = EPSILON): void {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  )
}

function assertFiniteCamera(camera: THREE.OrthographicCamera): void {
  for (const value of [
    camera.left,
    camera.right,
    camera.top,
    camera.bottom,
    camera.near,
    camera.far,
    camera.position.x,
    camera.position.y,
    camera.position.z,
  ]) {
    assert.ok(Number.isFinite(value), `camera value ${value} should be finite`)
  }
}

function waterPlaneCorner(camera: THREE.OrthographicCamera, x: number, y: number): THREE.Vector3 {
  const origin = new THREE.Vector3(x, y, -1).unproject(camera)
  const direction = new THREE.Vector3(0, 0, -1).transformDirection(camera.matrixWorld)
  assert.ok(Math.abs(direction.y) > EPSILON, 'camera ray should intersect the water plane')
  const distance = -origin.y / direction.y
  return origin.addScaledVector(direction, distance)
}

test('starts at a fixed diagonal isometric orientation and follows without changing height', () => {
  const rig = createCameraRig()
  const camera = rig.camera

  assertNear(camera.position.x, CAMERA_OFFSET)
  assertNear(camera.position.y, CAMERA_OFFSET)
  assertNear(camera.position.z, CAMERA_OFFSET)
  assertNear(camera.position.x, camera.position.z)

  const forward = new THREE.Vector3(0, 0, -1).transformDirection(camera.matrixWorld)
  const expectedForward = new THREE.Vector3(-1, -1, -1).normalize()
  assert.ok(forward.dot(expectedForward) > 1 - 1e-8, 'camera should look down the +X/+Y/+Z diagonal')

  rig.resize(1440, 900)
  const initialHeight = camera.position.y
  rig.update(80, -35, 0.2)
  assertNear(camera.position.y, initialHeight)
  assertNear(camera.position.x - CAMERA_OFFSET, 80 * (1 - Math.exp(-5.5 * 0.2)), 1e-5)
  assertNear(camera.position.z - CAMERA_OFFSET, -35 * (1 - Math.exp(-5.5 * 0.2)), 1e-5)
  rig.dispose()
})

test('exponential follow is consistent across frame subdivision for a stationary target', () => {
  const oneFrame = createCameraRig()
  const subdivided = createCameraRig()
  oneFrame.resize(1440, 900)
  subdivided.resize(1440, 900)

  const targetX = 123
  const targetZ = -87
  oneFrame.update(targetX, targetZ, 1)
  for (let frame = 0; frame < 120; frame += 1) subdivided.update(targetX, targetZ, 1 / 120)

  assertNear(oneFrame.camera.position.x, subdivided.camera.position.x, 1e-8)
  assertNear(oneFrame.camera.position.y, subdivided.camera.position.y, 1e-8)
  assertNear(oneFrame.camera.position.z, subdivided.camera.position.z, 1e-8)
  assert.ok(Math.abs(oneFrame.camera.position.x - (targetX + CAMERA_OFFSET)) < 2)
  assert.ok(Math.abs(oneFrame.camera.position.z - (targetZ + CAMERA_OFFSET)) < 2)
  oneFrame.dispose()
  subdivided.dispose()
})

test('viewport sizing remains finite, aspect-correct, and useful on six layouts', () => {
  const viewports = [
    [1440, 900],
    [390, 844],
    [320, 568],
    [360, 915],
    [844, 390],
    [2560, 1080],
  ] as const
  const rig = createCameraRig()

  for (const [width, height] of viewports) {
    rig.resize(width, height)
    const camera = rig.camera
    const aspect = width / height
    const expectedWidth = height <= 460 ? 60 * aspect : width <= 600 ? 60 : 90 * aspect
    const expectedHeight = expectedWidth / aspect

    assertNear(camera.right - camera.left, expectedWidth)
    assertNear(camera.top - camera.bottom, expectedHeight)
    assertNear((camera.right - camera.left) / (camera.top - camera.bottom), aspect)
    assertFiniteCamera(camera)
    assert.ok(camera.right - camera.left >= 60, 'viewport should retain enough world width for the boat')
    assert.ok(camera.top - camera.bottom >= 60, 'viewport should retain enough world height for the boat')
  }
  rig.dispose()
})

test('all orthographic corner rays remain over the finite water field at vessel limits', () => {
  const viewports = [
    [1440, 900],
    [390, 844],
    [320, 568],
    [360, 915],
    [844, 390],
    [2560, 1080],
  ] as const
  const positions = [-VESSEL_EDGE, 0, VESSEL_EDGE]
  const corners = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ] as const
  const rig = createCameraRig()

  for (const [width, height] of viewports) {
    rig.resize(width, height)
    for (const x of positions) {
      for (const z of positions) {
        rig.snapTo(x, z)
        for (const [cornerX, cornerY] of corners) {
          const point = waterPlaneCorner(rig.camera, cornerX, cornerY)
          assert.ok(
            Math.abs(point.x) <= WATER_HALF_EXTENT + EPSILON &&
              Math.abs(point.z) <= WATER_HALF_EXTENT + EPSILON,
            `${width}x${height} at (${x},${z}) corner (${cornerX},${cornerY}) reached water (${point.x},${point.z})`,
          )
        }
      }
    }
  }
  rig.dispose()
})

test('disposed camera rigs ignore later resize, follow, and snap calls', () => {
  const rig = createCameraRig()
  rig.resize(390, 844)
  rig.snapTo(44, -32)
  const camera = rig.camera
  const beforePosition = camera.position.clone()
  const beforeProjection = camera.projectionMatrix.clone()

  rig.dispose()
  assert.doesNotThrow(() => {
    rig.resize(2560, 1080)
    rig.update(-176.8, 176.8, 1)
    rig.snapTo(-176.8, -176.8)
  })
  assert.deepEqual(camera.position.toArray(), beforePosition.toArray())
  assert.deepEqual(camera.projectionMatrix.toArray(), beforeProjection.toArray())
})
