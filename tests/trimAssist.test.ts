import assert from 'node:assert/strict'
import test from 'node:test'

import { createVesselState, stepVessel } from '../src/world/vessel/kinematics.ts'
import { calculateHeadingRudder } from '../src/world/vessel/headingSteering.ts'
import {
  clearTrimBoost,
  createTrimAssistState,
  stepTrimAssist,
  TRIM_ASSIST_TUNING,
} from '../src/world/vessel/trimAssist.ts'
import { SAIL_TUNING } from '../src/world/vessel/sailResponse.ts'

const ENVIRONMENT = { worldLimit: 220, obstacles: [], sailingEnabled: true }

function stateAt(heading: number, speed = 4) {
  return { ...createVesselState(), heading, velocityX: speed * Math.sin(heading), velocityZ: speed * Math.cos(heading) }
}

test('auto trim converges into the 70–80% available band on mirrored reaches', () => {
  for (const heading of [0, Math.PI, -0.01]) {
    let assist = createTrimAssistState()
    const vessel = stateAt(heading)
    assert.equal(assist.engaged, false)
    for (let index = 0; index < 120; index += 1) {
      assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: true, resumeAuto: false, suppressed: false }, 1 / 60)
    }
    assert.equal(assist.mode, 'auto')
    assert.equal(assist.engaged, true)
    assert.ok(assist.efficiency >= 0.7 && assist.efficiency <= 0.8, `${heading}: ${assist.efficiency}`)
  }
})

test('auto efficiency reports actual current power and does not claim the target before trim arrives', () => {
  const vessel = stateAt(0)
  let assist = createTrimAssistState()
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: true, resumeAuto: false, suppressed: false }, 1 / 60)
  assert.ok(assist.efficiency < TRIM_ASSIST_TUNING.targetEfficiency)
  for (let index = 0; index < 120; index += 1) {
    assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: true, resumeAuto: false, suppressed: false }, 1 / 60)
  }
  assert.ok(assist.efficiency >= 0.7 && assist.efficiency <= 0.8)
})

test('idle auto mode does not move trim; manual sheet latches and auto resumes explicitly', () => {
  const vessel = stateAt(0)
  let assist = createTrimAssistState()
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 1)
  assert.equal(assist.sailAngle, SAIL_TUNING.defaultAngle)
  assist = stepTrimAssist(assist, vessel, { sheet: -1, engage: false, resumeAuto: false, suppressed: false }, 0.5)
  const manualAngle = assist.sailAngle
  assert.equal(assist.mode, 'manual')
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: true, resumeAuto: false, suppressed: false }, 1)
  assert.equal(assist.mode, 'manual')
  assert.equal(assist.sailAngle, manualAngle)
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: true, resumeAuto: true, suppressed: false }, 0)
  assert.equal(assist.mode, 'auto')
  assert.equal(assist.engaged, true)
})

test('no-go and suppression never auto-trim or boost', () => {
  const vessel = stateAt(Math.PI / 2)
  let assist = createTrimAssistState()
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: true, resumeAuto: false, suppressed: false }, 1)
  assert.equal(assist.engaged, true)
  assert.equal(assist.boost, 0)
  assist = { ...assist, mode: 'manual', sailAngle: Math.PI / 6 }
  assist = stepTrimAssist(assist, stateAt(0), { sheet: 0, engage: false, resumeAuto: false, suppressed: true }, 1)
  assert.equal(assist.boost, 0)
  assert.equal(assist.stableSeconds, 0)
})

test('near-perfect manual trim triggers one bounded boost, cooldown prevents jitter retrigger, and clear disarms until quality exits', () => {
  const vessel = stateAt(0)
  let assist = { ...createTrimAssistState(), sailAngle: 30 * Math.PI / 180 }
  assist = stepTrimAssist(assist, vessel, { sheet: 0.01, engage: false, resumeAuto: false, suppressed: false }, 1 / 60)
  for (let index = 0; index < 60 && assist.boost === 0; index += 1) {
    assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 1 / 60)
  }
  assert.equal(assist.boostSerial, 1)
  assert.equal(assist.boost, 1)
  for (let index = 0; index < 120; index += 1) {
    assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 1 / 60)
  }
  assert.ok(assist.boost === 0)
  const serial = assist.boostSerial
  assist = clearTrimBoost(assist)
  assert.equal(assist.boost, 0)
  assert.ok(assist.cooldownSeconds >= TRIM_ASSIST_TUNING.boostCooldownSeconds)
  assert.equal(assist.boostSerial, serial)
})

test('manual quality uses normalized peak on lower-power broad reaches and hysteresis', () => {
  const vessel = stateAt(0.1, 4)
  let assist = { ...createTrimAssistState(), mode: 'manual' as const, engaged: true, sailAngle: 32 * Math.PI / 180 }
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 0)
  assert.ok(assist.efficiency >= 0.9)
  assert.equal(assist.sweetSpot, true)
  const retained = stepTrimAssist({ ...assist, sailAngle: 38 * Math.PI / 180 }, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 0)
  assert.ok(retained.efficiency > TRIM_ASSIST_TUNING.sweetSpotExit && retained.efficiency < TRIM_ASSIST_TUNING.sweetSpotEnter)
  assert.equal(retained.sweetSpot, true)
  const exited = stepTrimAssist({ ...retained, sailAngle: SAIL_TUNING.defaultAngle }, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 0)
  assert.equal(exited.sweetSpot, false)
})

test('suppression preserves engagement and auto return clears a prior boost', () => {
  const vessel = stateAt(0)
  let assist = { ...createTrimAssistState(), mode: 'manual' as const, engaged: true, boost: 1, boostSerial: 3, sailAngle: Math.PI / 6 }
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: true }, 0)
  assert.equal(assist.engaged, true)
  assert.equal(assist.boost, 0)
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: true, resumeAuto: true, suppressed: false }, 0)
  assert.equal(assist.mode, 'auto')
  assert.equal(assist.boost, 0)
  assert.equal(assist.boostSerial, 3)
})

test('perfect trim held for eight seconds fires once until quality leaves and re-enters', () => {
  const vessel = stateAt(0)
  let assist = { ...createTrimAssistState(), sailAngle: 30 * Math.PI / 180 }
  assist = stepTrimAssist(assist, vessel, { sheet: 0.01, engage: false, resumeAuto: false, suppressed: false }, 1 / 60)
  for (let index = 0; index < 480; index += 1) assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 1 / 60)
  assert.equal(assist.boostSerial, 1)
  assist = stepTrimAssist(assist, { ...vessel, velocityZ: -4 }, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 0)
  assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 0)
  for (let index = 0; index < 360; index += 1) assist = stepTrimAssist(assist, vessel, { sheet: 0, engage: false, resumeAuto: false, suppressed: false }, 1 / 60)
  assert.equal(assist.boostSerial, 2)
})

test('boost contributes only a bounded sailing drive bonus and target heading converges', () => {
  const vessel = stateAt(0)
  const normal = stepVessel(vessel, { throttle: 0, rudder: 0, brake: false, sailAngle: 30 * Math.PI / 180 }, 1 / 60, ENVIRONMENT)
  const boosted = stepVessel(vessel, { throttle: 0, rudder: 0, brake: false, sailAngle: 30 * Math.PI / 180, trimBoost: 1 }, 1 / 60, ENVIRONMENT)
  assert.ok(boosted.velocityZ > normal.velocityZ)
  assert.ok(boosted.velocityZ < normal.velocityZ * 1.6)

  let state = createVesselState()
  for (let index = 0; index < 360; index += 1) {
    state = stepVessel(state, { throttle: 0, rudder: 0, brake: false, sailAngle: Math.PI / 4, targetHeading: Math.PI / 2 }, 1 / 60, ENVIRONMENT)
  }
  assert.ok(Math.abs(state.heading - Math.PI / 2) < 0.15)
})

test('target heading settles within 5 degrees by 4.5 seconds at low and cruising speed without overshoot', () => {
  const target = Math.PI / 2
  for (const speed of [0.6, 8]) {
    let state = { ...createVesselState(), velocityZ: speed }
    let settledAt: number | null = null
    let maximumHeading = -Infinity
    for (let index = 0; index < 600; index += 1) {
      const elapsed = index / 60
      state = stepVessel(state, { throttle: 0, rudder: 0, brake: false, sailAngle: Math.PI / 4, targetHeading: target }, 1 / 60, ENVIRONMENT, elapsed)
      const error = Math.abs(Math.atan2(Math.sin(state.heading - target), Math.cos(state.heading - target)))
      if (settledAt === null && error <= 5 * Math.PI / 180) settledAt = elapsed + 1 / 60
      maximumHeading = Math.max(maximumHeading, state.heading)
      assert.ok(Number.isFinite(state.heading) && Number.isFinite(state.yawRate))
    }
    assert.ok(settledAt !== null && settledAt <= 4.5, `${speed} m/s settled at ${settledAt}`)
    assert.ok(maximumHeading <= target + 0.05, `${speed} m/s overshot target`)
    assert.ok(Math.abs(state.yawRate) <= SAIL_TUNING.sailingMaxYawRate)
  }
})

test('rapid target reversal and wrapped headings remain finite and bounded', () => {
  let state = { ...createVesselState(), heading: Math.PI - 0.2, velocityZ: 4 }
  let maximumYaw = 0
  for (let index = 0; index < 480; index += 1) {
    const target = index < 120 ? -Math.PI + 0.2 : index < 240 ? Math.PI / 2 : -Math.PI / 2
    state = stepVessel(state, { throttle: 0, rudder: 0, brake: false, sailAngle: Math.PI / 4, targetHeading: target }, 1 / 60, ENVIRONMENT, index / 60)
    maximumYaw = Math.max(maximumYaw, Math.abs(state.yawRate))
    assert.ok(Number.isFinite(state.heading) && Number.isFinite(state.yawRate))
  }
  assert.ok(maximumYaw <= SAIL_TUNING.sailingMaxYawRate + 1e-9)
})

test('heading steering wraps, damps, and preserves rudder signs', () => {
  const rightTurn = calculateHeadingRudder({ heading: 0, yawRate: 0 }, Math.PI / 2)
  const leftTurn = calculateHeadingRudder({ heading: 0, yawRate: 0 }, -Math.PI / 2)
  assert.ok(rightTurn < 0)
  assert.ok(leftTurn > 0)
  assert.equal(calculateHeadingRudder({ heading: 0, yawRate: 0 }, 2 * Math.PI), 0)
  assert.ok(Math.abs(calculateHeadingRudder({ heading: 0, yawRate: 0.8 }, 0.3)) < Math.abs(rightTurn))
  assert.ok(Number.isFinite(calculateHeadingRudder({ heading: Number.NaN, yawRate: Number.POSITIVE_INFINITY }, Number.NaN)))
})

test('invalid and long trim steps stay finite, bounded, and frame-stable', () => {
  const invalid = stepTrimAssist(
    { ...createTrimAssistState(), sailAngle: Number.NaN, boost: Number.POSITIVE_INFINITY },
    { ...stateAt(0), velocityX: Number.NaN },
    { sheet: Number.NaN, engage: true, resumeAuto: false, suppressed: false },
    Number.NaN,
  )
  assert.ok(Number.isFinite(invalid.sailAngle) && Number.isFinite(invalid.efficiency))
  assert.ok(invalid.boost >= 0 && invalid.boost <= 1)
  let at30 = createTrimAssistState()
  let at120 = createTrimAssistState()
  for (let index = 0; index < 120; index += 1) at30 = stepTrimAssist(at30, stateAt(Math.PI / 4), { sheet: 0, engage: true, resumeAuto: false, suppressed: false }, 1 / 30)
  for (let index = 0; index < 480; index += 1) at120 = stepTrimAssist(at120, stateAt(Math.PI / 4), { sheet: 0, engage: true, resumeAuto: false, suppressed: false }, 1 / 120)
  assert.ok(Math.abs(at30.sailAngle - at120.sailAngle) < 0.1)
})
