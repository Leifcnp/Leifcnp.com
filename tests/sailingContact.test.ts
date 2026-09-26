import assert from 'node:assert/strict'
import test from 'node:test'
import * as THREE from 'three'

import { createVessel } from '../src/world/createVessel.ts'
import { createVesselState, stepVessel } from '../src/world/vessel/kinematics.ts'
import { calculateSailResponse } from '../src/world/vessel/sailResponse.ts'
import { sampleFacetedWaterHeight } from '../src/world/waterSurfaceGrid.ts'
import { sampleVesselWaterContact, VESSEL_CONTACT_POINTS } from '../src/world/vessel/hullContact.ts'

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
    const distance = point.y - sampleFacetedWaterHeight(point.x, point.z, time)
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
    assert.ok(d.minimum >= -0.060001, `Outer deck wash too deep in ${context}: ${d.minimum}`)
    assert.ok(h.minimum < 0 && h.maximum > 0, `Hull lost water contact in ${context}: ${JSON.stringify(h)}`)
    for (const local of [[0, 0.47, -0.18], [0, 0.465, -0.34], [-0.51, 0.47, -1.24], [0.51, 0.47, -1.24], [-0.51, 0.47, -0.4], [0.51, 0.47, -0.4]]) {
      const p = new THREE.Vector3(...local).applyMatrix4(vessel.group.matrixWorld)
      assert.ok(p.y - sampleFacetedWaterHeight(p.x, p.z, time) >= 0.119999, `Working deck wet in ${context}`)
    }
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

test('contact points match actual Three.js YXZ hull transform on both tacks', () => {
  for (const heading of [-2.4, 0.9]) for (const roll of [-0.34, 0.3]) {
    const pose = { heave: 0.2, pitch: -0.17, roll }
    const result = sampleVesselWaterContact(4, -3, heading, pose, 5.2, 2.6, 0.2, 3, 1, () => 0, undefined, 0.8, Math.sign(roll) * Math.PI / 2)
    const group = new THREE.Group()
    group.position.set(4, 0.4, -3)
    group.rotation.set(pose.pitch, heading, roll, 'YXZ')
    group.updateMatrixWorld(true)
    const points = [[VESSEL_CONTACT_POINTS.bowPort, result.contact.bowPort], [VESSEL_CONTACT_POINTS.bowStarboard, result.contact.bowStarboard]] as const
    for (const [local, actual] of points) {
      const expected = new THREE.Vector3(local.x, local.y, local.z).applyMatrix4(group.matrixWorld)
      assert.ok(expected.distanceTo(new THREE.Vector3(actual.x, actual.y, actual.z)) < 1e-9)
    }
    const side = roll > 0 ? -1 : 1
    const expectedRail = new THREE.Vector3(side * 1.235, 0.45, -0.494).applyMatrix4(group.matrixWorld)
    const rail = result.contact.leewardRail
    assert.ok(expectedRail.distanceTo(new THREE.Vector3(rail.x, rail.y, rail.z)) < 1e-9)
    assert.equal(result.contact.heelLoad, 0.8)
  }
})

test('loaded support allows actual rail wash while preserving working deck clearance', () => {
  const { vessel, record } = fixture()
  const state = createVesselState(-30, -30)
  vessel.setSailLoad(0.75, Math.PI / 2)
  let dips = 0
  for (let time = 0; time < 20; time += 0.25) {
    vessel.resetPose(state, time)
    record(time, `rail wash at ${time}`)
    const contact = vessel.getWaterContact()
    if (contact.leewardRail.clearance < 0) dips++
    assert.ok(contact.leewardRail.clearance >= -0.055001)
  }
  assert.ok(dips > 0, 'The authored top rail must actually dip, not a lower proxy point')
  vessel.dispose()
})

test('live support stays continuous across 30, 60 and 120 Hz tack and spill transitions', () => {
  const environment = { worldLimit: 220, obstacles: [], sailingEnabled: true, stormEnabled: true }
  for (const rate of [30, 60, 120]) {
    for (const [initialX, initialZ] of [[-18, -22], [185, 0]]) {
      const { vessel, record } = fixture()
      const dt = 1 / rate
      let state = { ...createVesselState(initialX, initialZ), heading: 0 }
      vessel.resetPose(state, 0)
      let previousPose = vessel.getPose()
      let maximumHeaveStep = 0
      let maximumRollStep = 0
      for (let frame = 0; frame < rate * 8; frame += 1) {
        const time = (frame + 1) * dt
        const segment = Math.floor(time / 2) % 4
        vessel.setReducedMotion(segment === 3)
        vessel.setSailLoad(segment === 1 ? 0 : 0.75, segment === 2 ? -Math.PI / 2 : Math.PI / 2)
        state = stepVessel(
          state,
          { throttle: 0, rudder: segment === 2 ? -0.7 : 0.7, brake: segment === 1, sailAngle: Math.PI / 4 },
          dt,
          environment,
          frame * dt,
        )
        vessel.update(state, time, dt)
        record(time, `support continuity ${rate}Hz frame ${frame}`)
        const pose = vessel.getPose()
        maximumHeaveStep = Math.max(maximumHeaveStep, Math.abs(pose.heave - previousPose.heave))
        maximumRollStep = Math.max(maximumRollStep, Math.abs(pose.roll - previousPose.roll))
        assert.ok(Object.values(pose).every(Number.isFinite))
        const contact = vessel.getWaterContact()
        const contactNumbers = [
          contact.heelLoad,
          contact.forwardSpeed,
          contact.sailPower,
          contact.relativeWindAngle,
          contact.bowPort.x,
          contact.bowPort.y,
          contact.bowPort.z,
          contact.bowPort.clearance,
          contact.bowPort.closingSpeed,
          contact.bowStarboard.x,
          contact.bowStarboard.y,
          contact.bowStarboard.z,
          contact.bowStarboard.clearance,
          contact.bowStarboard.closingSpeed,
          contact.leewardRail.clearance,
          contact.leewardRail.closingSpeed,
        ]
        assert.ok(contactNumbers.every(Number.isFinite))
        previousPose = pose
      }
      // The support interval is bounded and filtered; no frame may jump by a
      // visible hull height; the bound tightens with smaller frame durations.
      assert.ok(maximumHeaveStep < 8.5 / rate, `${rate}Hz ${initialX},${initialZ} heave step ${maximumHeaveStep}`)
      assert.ok(maximumRollStep < 3.1 / rate, `${rate}Hz ${initialX},${initialZ} roll step ${maximumRollStep}`)
      vessel.resetPose(state, 12)
      assert.equal(vessel.getWaterContact().bowPort.closingSpeed, 0)
      assert.equal(vessel.getWaterContact().bowStarboard.closingSpeed, 0)
      vessel.dispose()
    }
  }
})
