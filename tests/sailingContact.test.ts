import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import { createVessel } from '../src/world/createVessel.ts'
import { createVesselState, stepVessel } from '../src/world/vessel/kinematics.ts'
import { calculateSailResponse } from '../src/world/vessel/sailResponse.ts'
import { sampleWaterHeight } from '../src/world/waves.ts'

interface ContactSummary {
  frames: number
  minDeckClearance: number
  maxDeckClearance: number
  minHullClearance: number
  maxHullClearance: number
}

function clearance(mesh: THREE.Mesh, time: number): { minimum: number; maximum: number } {
  const positions = mesh.geometry.getAttribute('position')
  const point = new THREE.Vector3()
  let minimum = Infinity
  let maximum = -Infinity
  for (let index = 0; index < positions.count; index++) {
    point.fromBufferAttribute(positions, index).applyMatrix4(mesh.matrixWorld)
    const distance = point.y - sampleWaterHeight(point.x, point.z, time)
    minimum = Math.min(minimum, distance)
    maximum = Math.max(maximum, distance)
  }
  return { minimum, maximum }
}

function fixture() {
  const scene = new THREE.Scene()
  const vessel = createVessel(scene)
  const deck = vessel.group.getObjectByName('vessel-warm-wood-deck') as THREE.Mesh
  const hull = vessel.group.getObjectByName('vessel-faceted-hull') as THREE.Mesh
  const summary: ContactSummary = { frames: 0, minDeckClearance: Infinity, maxDeckClearance: -Infinity, minHullClearance: Infinity, maxHullClearance: -Infinity }
  const record = (time: number, context: string) => {
    scene.updateMatrixWorld(true)
    const d = clearance(deck, time)
    const h = clearance(hull, time)
    assert.ok(d.minimum > 0, `Deck under water in ${context}: ${d.minimum}`)
    assert.ok(h.minimum < 0 && h.maximum > 0, `Hull lost water contact in ${context}: ${JSON.stringify(h)}`)
    summary.frames++
    summary.minDeckClearance = Math.min(summary.minDeckClearance, d.minimum)
    summary.maxDeckClearance = Math.max(summary.maxDeckClearance, d.maximum)
    summary.minHullClearance = Math.min(summary.minHullClearance, h.minimum)
    summary.maxHullClearance = Math.max(summary.maxHullClearance, h.maximum)
  }
  return { vessel, record, summary }
}

export function measure(mode: 'loaded' | 'spilled' | 'reduced'): ContactSummary {
  const { vessel, record, summary } = fixture()
  vessel.setReducedMotion(mode === 'reduced')
  for (const radius of [0, 185]) {
    for (let h = 0; h < 8; h++) {
      const heading = h * Math.PI / 4
      for (let t = 0; t < 16; t++) {
        for (const windAngle of [-Math.PI / 2, Math.PI / 2]) {
          for (const yawRate of [-1.1, 0, 1.1]) {
            vessel.setSailLoad(mode === 'spilled' ? 0 : 1, windAngle)
            const state = {
              ...createVesselState(Math.cos(heading) * radius, Math.sin(heading) * radius),
              heading, velocityX: 8 * Math.sin(heading), velocityZ: 8 * Math.cos(heading), yawRate,
            }
            vessel.resetPose(state, t * 1.7)
            record(t * 1.7, `${mode}, radius ${radius}, heading ${h}, time ${t}, wind ${windAngle}, yaw ${yawRate}`)
          }
        }
      }
    }
  }
  vessel.dispose()
  return summary
}

export function measureTrajectories(): ContactSummary {
  const { vessel, record, summary } = fixture()
  const environment = { worldLimit: 220, obstacles: [], sailingEnabled: true, stormEnabled: true }
  for (const heading of [0, Math.PI]) {
    let state = { ...createVesselState(), heading }
    vessel.setSailLoad(0, 0)
    vessel.resetPose(state, 0)
    for (let frame = 0; frame < 960; frame++) {
      const time = (frame + 1) / 120
      const input = { throttle: 0, rudder: frame % 480 < 240 ? 1 : -1, brake: frame > 840, sailAngle: Math.PI / 4 }
      state = stepVessel(state, input, 1 / 120, environment, frame / 120)
      const load = calculateSailResponse(state, input.sailAngle, input.brake ? 1 : 0)
      vessel.setSailLoad(load.power, load.relativeWindAngle)
      vessel.setSailAngle(load.signedAngle)
      vessel.update(state, time, 1 / 120)
      record(time, `sailing trajectory heading ${heading}, frame ${frame}`)
      assert.ok(Object.values(state).every(Number.isFinite))
    }
  }
  vessel.dispose()
  return summary
}

test('each loaded, spilled and reduced-motion frame retains actual hull/water contact', () => {
  for (const mode of ['loaded', 'spilled', 'reduced'] as const) assert.equal(measure(mode).frames, 1536)
})

test('live wind-driven tight turns and spill recovery preserve contact through pose smoothing', () => {
  assert.equal(measureTrajectories().frames, 1920)
})
