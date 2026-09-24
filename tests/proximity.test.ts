import assert from 'node:assert/strict'
import test from 'node:test'

import { portfolioIslands } from '../src/content/islands.ts'
import { getProximityState, isInsideProximityZone, PROXIMITY_EXIT_MARGIN } from '../src/interaction/proximity.ts'

const resume = portfolioIslands.find((island) => island.id === 'island-resume')!
const projects = portfolioIslands.find((island) => island.id === 'island-projects')!

test('proximity enters at the docking radius and returns the matching island', () => {
  const outside = { x: resume.position.x + resume.dockingTriggerRadius + 0.1, z: resume.position.z }
  const inside = { x: resume.position.x + resume.dockingTriggerRadius - 0.1, z: resume.position.z }
  assert.equal(getProximityState(outside, portfolioIslands), null)
  assert.equal(getProximityState(inside, portfolioIslands)?.id, resume.id)
  assert.equal(isInsideProximityZone(inside, resume), true)
  assert.equal(isInsideProximityZone(outside, resume), false)
})

test('previous island remains active in the hysteresis band, then exits cleanly', () => {
  const edge = {
    x: resume.position.x + resume.dockingTriggerRadius + PROXIMITY_EXIT_MARGIN * 0.5,
    z: resume.position.z,
  }
  assert.equal(getProximityState(edge, portfolioIslands, resume.id)?.id, resume.id)

  const left = {
    x: resume.position.x + resume.dockingTriggerRadius + PROXIMITY_EXIT_MARGIN + 0.1,
    z: resume.position.z,
  }
  assert.equal(getProximityState(left, portfolioIslands, resume.id), null)
})

test('nearest entered island wins and malformed positions are ignored', () => {
  const nearProjects = { x: projects.position.x, z: projects.position.z + projects.dockingTriggerRadius * 0.2 }
  assert.equal(getProximityState(nearProjects, portfolioIslands)?.id, projects.id)
  assert.equal(getProximityState({ x: Number.NaN, z: 0 }, portfolioIslands), null)
  assert.equal(getProximityState({ x: 0, z: Number.POSITIVE_INFINITY }, portfolioIslands), null)
})
