# WEB-021 — Stronger heel, leeward rail wash, and bow spray

## Request and scheduling

The user requested a future visual/physical refinement after WEB-018: make a
loaded beam or broad reach heel to roughly 15–20 degrees, let the leeward rail
sit slightly into the water, and show bow spray. This is active Phase 12:
on 2026-09-25 the user requested the next task after the published WEB-020
controls phase. Harbours/zoom remain deferred. Complete and publish this
bounded hull-contact phase through the existing master/docs workflow, then stop.

WEB-018 already supplies bounded wind heel, shared pose smoothing, a small
heel-related buoyancy correction, and 6,528 actual hull-contact samples. This
authorized plan supersedes the earlier completely dry outer-rail constraint. It must preserve the completed WEB-018 zero-load, reduced
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

## Active implementation contract

- Pose/contact owns the actual Three.js-transformed bow and leeward-rail points,
  water heights/clearances and relative closing speed against the shared sampler.
  Contact records are refreshed after the smoothed visible pose, never inferred
  from a second flat boat or independent clock. Reset drops derivative history.
- Distinguish the shallow outer leeward margin from the central working deck.
  Quantify any relaxed outer-edge bound; retain dry central deck/cockpit/mast
  checks and continuous hull/water intersection across thousands of frames.
- Extend heel based on real automatic/manual sailing loads, not only an
  artificial full-power fixture. Preserve a 0.4-radian combined roll cap and
  smooth changes through tacks/spill. No horizontal dynamics or hull scaling.
- The spray helper owns one fixed pool, initially 48 particles and one original
  instanced mesh, shared by airborne bow accents and rail wash. Existing 96
  wake particles and boost feedback remain. No textures, new RAF or audio.
- Root calls spray after vessel/contact updates with the same elapsed time;
  clears it on scanner takeover/arrival/reset, and freezes or clears it during
  pause/hidden/reduced-motion lifecycle. No emission at idle/reverse or without
  the corresponding hull/water contact. Browser review decides final size/count.
- Root owns createWaterWorld.ts and documentation. Physics owns pose.ts,
  createVessel.ts, contact helper and pose/contact tests. Feedback owns the new
  createHullSpray.ts and its tests. Audit owns temporary QA harness/evidence.

## Contact sampling correction found during integration

The original analytic height can differ substantially from the rendered
triangles in the twelve-unit offshore grid. A measured case at (−185, 0), time 25.5
had positive analytic central-deck clearance yet intersected the visible
water. Share the existing grid axis/tuning and alternating triangle layout
between the renderer and a pure faceted-height sampler. The hull pose, contact
and spray re-entry use this same visible surface. Wave components, vertex
positions, water geometry budgets, horizontal forces and storm current stay
unchanged. Compare sampler output against actual rendered triangle vertices
before re-running contact and visual tests.

## Implemented candidate and local evidence

The original geometry remains. Sail-only heel now caps at 20° with a nonlinear
load/crosswind response and the existing 0.4-radian total cap. The actual top
rail midpoint can dip to −0.055 units; outer deck guards limit wash to −0.06
and working deck/cockpit/mast guards retain +0.12. Support is calculated from
the current target base and constrained after smoothing. All visible contacts
and spray use the shared rendered-triangle sampler; horizontal forces and
water mesh geometry remain unchanged.

The 48-particle pool renders in two transparent passes. Forward closing bow
contact emits droplets; steady moving loaded rail contact can sustain wash.
No extra RAF/audio/assets. Review of real auto/manual loads, 137 native tests,
9,968 contact frames, independent actual-ocean triangle checks, world lifecycle,
six production layouts and normal-camera desktop/mobile storm/tack scenes is
recorded in [verification](../../artifacts/phase12/VERIFICATION.md). Publish
through master/docs, verify exact-SHA/public resources and interactions, then
stop for user review.

## Release and review gate

Application commit `d7dac1c` is published on `origin/master`. [Pages run 36217578595](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36217578595) succeeded for the exact SHA. Public HTML, JavaScript, CSS and favicon match the tested build byte for byte (`public-assets.json`). The unmodified public bundle passes desktop/mobile controls, auto/manual trim, sound toggling, all categories, scanner travel/arrival, touch, reduced motion and WebGL fallback (`public/checks.json`) without console or script errors. WEB-021 is Done and awaits user review.

Stop here; WEB-019 and all other backlog tasks remain unstarted.
