# WEB-021 — Stronger heel, leeward rail wash, and bow spray

## Request and scheduling

The user requested a future visual/physical refinement after WEB-018: make a
loaded beam or broad reach heel to roughly 15–20 degrees, let the leeward rail
sit slightly into the water, and show bow spray. This is planning only. The
current queue remains WEB-015 translucent drawers followed by WEB-016 local
harbours; WEB-021 must not reorder or implement either task.

WEB-018 already supplies bounded wind heel, shared pose smoothing, a small
heel-related buoyancy correction, and 6,528 actual hull-contact samples. This
plan supersedes any future “dry rail” visual-only idea only when WEB-021 is
later selected. It must preserve the completed WEB-018 zero-load, reduced
motion, storm, scanner, and contact evidence.

## Goal and boundaries

Make strong sail loading read as a connected boat/water event: the vessel
leans visibly on a beam or broad reach, the leeward rail may dip below the
surface for a bounded moment, and the bow throws restrained spray where hull,
wave, and forward motion meet. Keep the deck and cockpit readable and safe;
do not change hull dimensions, collision radius, world limits, or the wind
force model solely for appearance.

The target is approximately 15–20 degrees at high power in the beam-to-broad
reach band. Close-hauled/no-go and nearly dead-downwind states should taper
the extra heel. Wave roll, turn heel, and wind heel must combine under an
explicit cap. The existing 0.4-radian pose bound, or a narrowly reviewed
replacement, remains the starting constraint rather than an invitation to
allow uncontrolled caps.

## Contact and visual behavior

1. Extend the pure pose dynamics with a bounded load curve that reaches the
   target only when sail power and crosswind component are both high. Use
   apparent-wind angle and the existing sign convention so both tacks mirror.
   Preserve exponential smoothing through tack, pause, reset, and scanner
   placement.
2. Evaluate the transformed port/starboard rail and deck support points
   against the shared water sampler. A strong load may submerge the leeward
   rail slightly, but the deck, cockpit, mast base, and camera-facing surfaces
   must not disappear below the water. Apply buoyancy/support changes only
   after actual contact measurements justify them, and keep them in the pure
   pose/contact owner.
3. Add a bounded rail-wash cue at the submerged or near-contact leeward rail.
   Reuse the pooled wake/contact lifecycle and shared clock. It should fade
   with rail clearance, sail load, wave slope, and speed; it must not imply a
   separate current or add propulsion.
4. Add restrained bow spray when forward motion meets a rising wave or the
   hull enters the water. Use the same bow samples and wave derivatives that
   drive hull pose. Avoid a constant white bow cap at idle or a full-screen
   particle field.
5. WEB-019 owns directional flags, pennants, apparent-wind cues, and future
   wind-carried spray. WEB-021 owns the stronger hull-contact trigger and
   rail/bow response only if WEB-019 has not supplied a reusable effect helper;
   otherwise call that helper and keep one pooled spray budget. Both tasks use
   the same wind-from convention and simulation clock.
6. Reduced motion removes added heel exaggeration and decorative rail/bow
   spray while retaining stable hull contact and a static wind cue. Pause,
   hidden-tab, reset, scanner travel, and disposal freeze or clear every
   visual effect without wall-time catch-up.

## Dependencies and ownership

- The pose owner updates `vessel/pose.ts` and pure tests, starting from
  WEB-018's `sailPower`, `relativeWindAngle`, support sampling, and bounds.
- The vessel/effects owner updates transformed rail contact and pooled rail/bow
  cues. `createVessel.ts` remains custom geometry only; no downloaded models,
  textures, or hull scaling.
- Root owns integration, shared elapsed time, scanner/mooring behavior,
  lifecycle, browser QA, and release evidence.
- Coordinate incoming-wave variation and common direction with WEB-017, and
  directional wind/spray semantics with WEB-019. The storm field remains a
  multiplier/current boundary, not a second heel or spray clock.

## Implementation sequence

1. Capture WEB-018 baselines at both beam tacks, broad reach, close reach,
   downwind, turning, storm edge, spilled sail, reduced motion, and scanner
   placement. Measure roll angle, rail water clearance, deck clearance, bow
   contact, spray count, and frame cost.
2. Prototype the stronger pure load curve and verify mirrored 15–20-degree
   high-load targets with zero-load and no-go fallbacks. Test combined wave,
   turn, storm, and load extremes before touching effects.
3. Run transformed support/contact sampling across headings and frame rates.
   Tune only the minimum buoyancy correction needed to keep the deck readable
   while allowing the leeward rail wash.
4. Add pooled rail-wash and bow-spray placement using existing wake/contact
   buffers. Verify allocation stability, deterministic timing, quiet idle,
   and coherent wind/wave direction.
5. Review normal camera and mobile layouts at rest, sailing, tack, storm,
   scanner, pause, and reduced-motion states. Record visual evidence and
   resource counts before a phase release.

## Acceptance and tests

- Strong beam/broad reach loading reaches a readable 15–20 degrees at both
  tacks, with smooth recovery through trim release and tack; close-hauled,
  no-go, downwind, spilled, and zero-load cases remain bounded.
- The leeward rail can briefly cross the water surface while the deck/cockpit
  and mast base retain safe visible clearance. Collision radius and island
  routes remain unchanged.
- Bow spray appears only from forward hull/wave contact and rail wash appears
  only near leeward water contact; both are restrained, pooled, deterministic,
  and absent or static under reduced motion.
- Pure tests cover finite/extreme values, mirrored wind, wave and turn
  combinations, storm scaling, pause/reset, reduced motion, scanner instant
  placement, and 30/60/120 Hz partitioning.
- Contact/effects tests sample transformed rails, deck and bow at thousands of
  frames without land penetration, unbounded particles, allocations, or
  non-finite transforms. Disposal remains idempotent.
- Browser checks cover six layouts, normal camera scale, both tacks, broad
  reach, storm water, scanner/drawer reading, pause/visibility, reduced motion,
  WebGL fallback, and mobile interaction targets.

## Risks and review gate

More heel can make a low-poly boat read as capsizing, hide the sail behind the
water, or create false collision impressions. Tune from the existing WEB-018
baseline, cap the combined pose, and let contact measurements decide whether
support changes are needed. Rail wash and bow spray can become white clutter;
prefer small directional accents over continuous foam. Do not duplicate the
WEB-019 spray pool or introduce a new animation loop.

Deliver one bounded heel/contact candidate with before/after evidence at normal
camera scale, then stop for user review before changing wave direction,
weather, sound, or geometry proportions.
