import assert from 'node:assert/strict'
import test from 'node:test'

import { vesselInputFromControls, type VesselControl } from '../src/controls/vesselInput.ts'

test('reduces held helm controls to the shared vessel intent', () => {
  assert.deepEqual(vesselInputFromControls([]), { throttle: 0, sheet: 0, rudder: 0, brake: false })
  assert.deepEqual(vesselInputFromControls(['trimIn']), { throttle: 0, sheet: -1, rudder: 0, brake: false })
  assert.deepEqual(vesselInputFromControls(['trimOut', 'left']), { throttle: 0, sheet: 1, rudder: 0, brake: false, targetHeading: -Math.PI / 4 })
  assert.deepEqual(vesselInputFromControls(['trimIn', 'right', 'brake']), {
    throttle: 0,
    sheet: -1,
    rudder: 0,
    brake: true,
    targetHeading: 2.356194490192345,
  })
})

test('opposing holds cancel each other without affecting another axis', () => {
  const controls: VesselControl[] = ['trimIn', 'trimOut', 'left', 'right', 'brake']
  assert.deepEqual(vesselInputFromControls(controls), { throttle: 0, sheet: 0, rudder: 0, brake: true })
})

test('screen headings map to world headings and release keeps course', () => {
  const up = vesselInputFromControls(['up'])
  const right = vesselInputFromControls(['right'])
  const diagonal = vesselInputFromControls(['up', 'right'])
  assert.equal(up.targetHeading, -Math.PI * 3 / 4)
  assert.equal(right.targetHeading, Math.PI * 3 / 4)
  assert.ok(Math.abs((diagonal.targetHeading ?? 0) - Math.PI) < 1e-12)
  assert.equal(vesselInputFromControls([]).targetHeading, undefined)
})
