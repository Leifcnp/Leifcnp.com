# WEB-019 — Wind effects, flags, and wind-carried spray

## Current correction — remove confusing water-level wind streams

2026-09-25: The user finds white wind streams too similar to wave crests and
explicitly requests removal. This supersedes the original breeze-stream
acceptance criterion; keep the earlier release record below as history.

1. Luna removes stream creation, all lifecycle calls, the unused implementation
   and its five dedicated tests. Keep physical wind, flags/pennants, HUD,
   wave crests, wake and hull spray unchanged. Do not replace the effect.
2. Root explains prior measured water-only CPU cost (7.14 to 11.89 ms median,
   +4.75 ms / +66.5% in the VM under browser-check load). Separate this from
   overall FPS, phone performance and the triangle pattern itself.
3. Build a matched visual comparison: identical current waves, timestamp,
   camera and lighting; only the triangle diagonal pattern changes. Include
   a wireframe/diagram view so the term “checkerboard” is concrete. This is
   an inspection artifact, not a new website control or camera feature.
4. Verify removal in live scene, retained flags/crest/wake/spray, motion and
   reset/disposal behavior. Run existing native tests and strict production
   build; check desktop/mobile public interactions and exact published assets.
5. Update current documentation, preserve historical evidence and publish the
   requested removal through master/docs. Stop for review; no shoreline or
   harbour work and no further wave tuning in this task.

## Request and scheduling

The user requested a future clarity pass: show wind direction with flags,
make wind effects visible, add wind-carried spray, and later improve wave
direction and randomness. This is completed Phase 13. On 2026-09-25, after WEB-020 controls and WEB-021 heel/contact were published, the user requested “ok next go ahead”. Harbours/zoom stay deferred. Complete one bounded wind-cue pass and publish through master/docs for review.

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
- The completed bow/hull spray remains restrained, wind-carried, deterministic,
  pooled and tied to contact. Reuse its existing wind drift; no second spray
  pool or crest emitter is needed for this first wind-direction pass.
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

The 2026-09-25 queue review places boat control/feedback ahead of deferred
harbours. The user has selected this task. Deliver one bounded visual pass and stop
for review. Wave changes stay in WEB-017 rather than being silently included.

## Coordination with new sailing ideas

WEB-020 owns automatic/manual trim and the bounded sweet-spot speed/audio
reward. Its white-foam burst should reuse the existing wake/effect lifecycle.
WEB-021 owns stronger 15–20 degree reach heel and controlled leeward rail dip;
coordinate bow/rail spray here rather than adding two competing particle
systems. These later tasks do not authorize implementation during Phase 10.


## Phase 13 concrete implementation contract

1. `effects/createWindStreams.ts` owns one original fixed buffer/instance mesh,
   no more than 32 sparse translucent tapered strokes within about 58 world
   units of the vessel. World-anchored seeded placement and wrap fades avoid
   camera-attached motion. Motion follows the true wind velocity from `wind.ts`;
   faceted water height supplies altitude. Suppress the whole stroke over land
   plus a margin. No textures, runtime geometry creation, RAF or random clock.
2. `effects/createWindFlags.ts` owns one original fixed Shipyard flag/pole and
   one masthead pennant. Root supplies the reviewed island ground anchor; the
   boat anchor is the actual transformed local masthead (0, 5.87, −0.34),
   including hull pitch/heel/yaw. True wind sets land direction; subtract vessel
   velocity for apparent boat wind. Meshes extend downwind, never toward the
   HUD's wind-from bearing. Use bounded segmented flutter and fixed buffers.
3. Root updates both after vessel pose using the shared `elapsed` and `delta`.
   Pause/hidden/offscreen stops clocks. Reset is deterministic. Scanner travel
   may retain true-wind cues and an apparent-wind pennant; content remains
   readable. Reduced motion hides moving streams and retains unfluttering
   directional flags, including instant scanner placement. Dispose all owned
   resources without touching vessel/landmark ownership.
4. Reuse the now-published WEB-021 48-particle contact spray and wind drift.
   No added spray pool, foam, forces, wind variation, wave variation, boat
   scaling, steering changes, HUD expansion or harbour/zoom work.
5. Test direction signs, apparent-wind velocity subtraction, transformed
   anchors, full-stroke land exclusion, stable budgets, deterministic timing,
   pause/reset/reduced mode and disposal. Root checks normal-camera readability
   while idle, sailing both tacks, offshore and reading scanner content; six
   desktop/mobile layouts and public behavior must remain sound.
6. Compare against Phase 12 resources (55 calls, 34,920 triangles, 40 geometries,
   zero textures). Keep added cues within roughly five calls / 500 triangles
   and no textures, subject to measured review. Land-flag placement stays
   inside current island framing bounds; add only the minimum required bound
   metadata if actual geometry proves otherwise.

Owner split: Luna breeze and flag agents own only their new helper and test
files. Luna review is read-only. Root owns all existing files, plans/docs, QA,
generated output and publication. Stop after exact-SHA Pages/public checks.

Phone visual review narrowed the visible field to a 58-unit radius, using 32
streams in a 128-unit periodic pattern. The 44–58 rim fades to zero before
64-unit wrapping. This keeps breeze visible within compact camera framing
without increasing draw calls or covering islands.

## Candidate verification

True/apparent direction, actual masthead and land support, deterministic shared
time, camera-crossing continuity, resource ownership and reduced motion have
focused native coverage. Root world checks exercise sailing, scanner, storm,
pause/hidden, reset and static reduced cues. Production and public verification
are recorded in [the Phase 13 evidence](../../artifacts/phase13/VERIFICATION.md).
No changes to sailing forces, waves, trim/boost, original boat geometry or
existing contact spray belong to this release.

## Release and review gate

Application commit `72a9d476` is published on `origin/master`. [Pages run 36218780257](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36218780257) succeeded for the exact SHA. Public HTML, JavaScript, CSS and favicon match the tested build byte for byte (`public-assets.json`). The unmodified public bundle passes desktop/mobile sailing controls, auto/manual trim, all categories, scanner travel/arrival, touch, reduced motion and WebGL fallback (`public/checks.json`) without console or script errors. WEB-019 is Done and awaits user review.

Stop here; WEB-017, WEB-022 and deferred WEB-016 remain unstarted.

## Wind-stream removal release

Application commit `9a156695` is published on `origin/master`; [Pages run 36223010394](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36223010394) succeeded for the exact SHA. Public files match the tested build, and public desktop/mobile interactions pass. 160 remaining native tests, strict build, scene absence/retained cues and lifecycle checks pass. Controlled triangle comparison and prior CPU timing explanation are in [the review evidence](../../artifacts/water-clarity/VERIFICATION.md). WEB-019 is Done; stop for review.
