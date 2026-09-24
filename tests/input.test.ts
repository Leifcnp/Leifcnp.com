import assert from 'node:assert/strict'
import test from 'node:test'

import { vesselInputFromControls, type VesselControl } from '../src/controls/vesselInput.ts'

test('reduces held helm controls to the shared vessel intent', () => {
  assert.deepEqual(vesselInputFromControls([]), { throttle: 0, rudder: 0, brake: false })
  assert.deepEqual(vesselInputFromControls(['forward']), { throttle: 1, rudder: 0, brake: false })
  assert.deepEqual(vesselInputFromControls(['reverse', 'left']), { throttle: -1, rudder: -1, brake: false })
  assert.deepEqual(vesselInputFromControls(['forward', 'right', 'brake']), {
    throttle: 1,
    rudder: 1,
    brake: true,
  })
})

test('opposing holds cancel each other without affecting another axis', () => {
  const controls: VesselControl[] = ['forward', 'reverse', 'left', 'right', 'brake']
  assert.deepEqual(vesselInputFromControls(controls), { throttle: 0, rudder: 0, brake: true })
})
