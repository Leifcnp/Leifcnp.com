# WEB-019 — Wind effects, flags, and wind-carried spray

## Request and scheduling

The user requested a future clarity pass: show wind direction with flags,
make wind effects visible, add wind-carried spray, and later improve wave
direction and randomness. This task is planning only. The next queued work
remains WEB-015 translucent content drawers, followed by WEB-016 local
harbour submenus; do not implement WEB-019 ahead of those review gates.

Wave-direction and common seeded randomness belong to WEB-017 and must be
coordinated separately. They are not a reason to change the existing sailing
wind or wave field in this task.

## Goal

Make the existing true wind, apparent wind, and water contact legible at a
glance through small code-built flags, pennants, and restrained spray carried
by the current wind. Preserve the approved wind physics and use the shared
simulation clock so visual cues explain the boat’s behavior instead of adding
another force or animation model. The expanded request adds translucent,
stylized breeze streams crossing the water so wind direction is readable
without interpreting the compass.

## Design constraints

1. Fixed-island flags stream with true wind. Boat-mounted flags/pennants
   use apparent wind, which becomes true wind while stationary. Flags trail
   **toward** the downwind direction; the HUD describes where wind comes **from**.
2. Build flags, pennants, breeze ribbons/particles, and spray from original geometry/materials in code.
   Use bounded pooled ribbons or particles with fixed buffers, no downloaded
   models, textures, or extra asset pipeline.
3. Reuse the existing water sampler, contact points, wake lifecycle, and
   wind/sail response. Spray should appear at meaningful bow, leeward-hull,
   or crest contacts and be carried consistently by wind; it must not create
   propulsion or alter collision response.
4. Keep pause, reset, hidden-tab suspension, reduced motion, scanner travel,
   drawer reading, fallback mode, disposal, and mobile budgets intact. Do not
   add an independent render loop or unbounded allocations. Reduced motion
   should retain a static direction cue while suppressing flutter, moving
   breeze streams and spray.
5. Keep scanner labels and content readable at all supported viewports. Wind
   markers must not obscure island identities, controls, or the sailing HUD.

## Implementation boundaries

- Root owns the integration contract and viewport/browser review.
- A scene-effects owner may add fixed-budget flag/pennant and spray helpers
  under `src/world/`, consuming true/apparent wind and the shared clock.
- Existing `wind.ts`, sail response, wave sampler, and kinematics remain the
  source of physical values; do not change their force tuning as part of this
  visual task.
- Coordinate any wave-direction or seeded-wave proposal with WEB-017 and keep
  it out of this implementation.

## Acceptance and verification

- Flags visibly stream toward the authored true-wind direction and pennants
  respond to boat motion without contradicting the HUD’s wind-from wording.
- Translucent breeze streams cross the water toward the true-wind direction,
  stay visible at the normal isometric camera scale, and do not obscure text
  or resemble waves travelling in a contradictory direction.
- Bow/hull spray and crest spray are restrained, wind-carried, deterministic,
  pooled, and visibly tied to water contact and motion.
- Calm idle water remains visually quiet; sailing, turning, tacking, and storm
  exposure produce readable changes without lightning, rain, or new textures.
- Pause/resume, reset, hidden-tab, reduced-motion, scanner/autopilot,
  drawer/fallback, and disposal checks pass. Six supported viewports retain
  44px controls, legible HUD/labels, and documented geometry/draw budgets.
- Pure lifecycle/placement tests cover finite transforms, wind-direction
  signs, pooled reuse, deterministic timing, reduced-motion suppression, and
  cleanup. Browser review captures stationary, moving, both tacks, storm
  water, mobile, and scanner-reading states.

## Review gate

The current queue places this after WEB-015/WEB-016, unless the user explicitly
reprioritizes it later. When selected, deliver one bounded visual pass and stop
for review. Wave changes stay in WEB-017 rather than being silently included.

## Coordination with new sailing ideas

WEB-020 owns automatic/manual trim and the bounded sweet-spot speed/audio
reward. Its white-foam burst should reuse the existing wake/effect lifecycle.
WEB-021 owns stronger 15–20 degree reach heel and controlled leeward rail dip;
coordinate bow/rail spray here rather than adding two competing particle
systems. These later tasks do not authorize implementation during Phase 10.
