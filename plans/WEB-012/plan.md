# WEB-012 — Wind-driven sailing and sail trim

## Goal and scheduling

Phase 9 is authorized on 2026-09-24 by “ok go for the next phase” after the
published WEB-011 storm. Implement and publish one playable wind/trim release,
then stop for review. No dependencies or downloaded art are needed.

## Resolved implementation contract and ownership

- Luna physics: pure `wind.ts`, `vessel/sailResponse.ts`, kinematics and force tests.
  Stable wind velocity (-9, 0) in world X/Z; apparent wind subtracts boat velocity.
  Bounded heading/trim polar, 32–48° smooth no-go transition using true/apparent wind (40° warning),
  leeway, drag and minimal stalled-rudder recovery. Preserve storm/collision bounds.
- Luna controls: input adapter, main DOM and stylesheet, small sailing HUD, input
  tests. W/Up trims in, S/Down eases out, A/D steer, Space spills wind, R resets.
  Simultaneous touch, reading focus, pointer cancellation and 44px targets remain.
- Luna rig: original main/shade/boom pivot about the authored mast, driven by signed
  leeward trim with bounded smoothing. Keep all geometry/material ownership.
- Root: world API, fixed 120Hz sheet integration, telemetry, plans, visual and
  trajectory checks, built/public verification and publishing. No concurrent edits
  to owned files. Agents can propose alternatives before integration.

Mainsail trim spans 8–85 degrees at 25 degrees/second. The initial 85-degree trim
leaves the starting beam reach unpowered until the visitor trims in. Releasing
trim retains its setting; propulsion then continues with the wind. The HUD explains
wind-from relative to the bow, actual/suggested trim and tack/trim guidance.
Scanner travel remains an explicitly labelled assisted safe route with immediate
content access, and preserves the visitor's manual trim for takeover. Docking
holds the boat alongside until helm input; paused/reduced-motion scanner placement
remains instant. The custom rig shows assisted trim during travel. Reset snaps the
rig and clears forces/time/input. Pause/hidden time never advances trim or physics.

The retained legacy pure-physics thrust mode exists for historical regression
fixtures only; the actual world always enables sailing and ignores throttle.
During this phase the user explicitly requested a larger, clearer single main
without a jib and tighter turns. Enlarge the custom main and emphasize its
rotating boom/clew; WEB-014 is now included with measured steering changes.
WEB-015 transparency, WEB-016 subharbours, and WEB-017 random/common-direction
wave sets remain separate backlog work.

## Dependencies and exclusions

Depends on the reviewed vessel, scanner, and storm contracts. The wind field,
boat physics, sail geometry, and controls must remain deterministic and share
one simulation clock. Preserve scanner autopilot, keyboard/mobile input,
pause, reset, reduced-motion behavior, collision bounds, and safe island
routes. Custom sail geometry remains the visual basis.

Exclude multiplayer or live weather, audio, procedural rigging replacement,
damage, resource loss, and punitive control lockouts. Manual sailing must
respect wind and tacking. Keep the fast-path scanner accessible: decide whether
its assisted journey uses visible tacks or a bounded guided route, without
delaying immediate content access. Paused/reduced-motion selection retains
instant safe placement.

## Design rationale

1. Define a smooth deterministic wind vector or direction field for the calm
   portfolio area and document its speed range. If WEB-011 introduces a storm
   field, blend wind changes through the same boundary rather than adding a
   discontinuity.
2. Compute apparent wind from the vessel velocity and wind vector. Sail power
   should depend on the angle between apparent wind, heading, and mainsail
   angle, with bounded drag and lift. Forward progress into the wind must
   require tacking; a narrow no-go zone should prevent unrealistic direct
   upwind propulsion.
3. Choose a readable mainsail control: a bounded trim angle with keyboard and
   touch commands, visible in the HUD or beside the boat. Add a low-friction
   trim assist or suggested angle so first-time users can produce useful
   motion without knowing sailing terminology.
4. Keep the no-go zone accessible. The boat must be able to fall off the wind,
   tack through a controlled turn, or use scanner assistance to reach content;
   stalls should be gradual, recoverable, and explained by visible wind cues.

## Execution steps

1. Record the current WEB-011 movement, scanner, and collision contracts and
   capture baseline routes at rest, under manual thrust, during turns, and at
   scanner handoff. Identify every caller that assumes throttle means direct
   forward/reverse acceleration.
2. Implement a pure wind-field and apparent-wind module with finite outputs,
   bounded sail force, no-go-zone behavior, and named tuning values. Add a
   pure sail-trim response module before changing the live controller.
3. Replace direct longitudinal thrust with sail force while retaining drag,
   rudder authority, lateral limits, obstacle resolution, world bounds, and
   fixed substeps. Preserve a deliberate low-speed maneuvering rule so the
   vessel can turn out of irons.
4. Add a visible wind-direction marker and sail-angle cue using the existing
   DOM/scene ownership boundaries. Keep the custom sail mesh, and make trim
   changes readable at desktop and mobile sizes without obscuring content.
5. Adapt keyboard/mobile controls and scanner autopilot. Scanner routes should
   retain the reviewed fast path, with trim/tack assistance where appropriate;
   manual input must immediately regain authority. Pause, reset, hidden-tab,
   reduced-motion, and WebGL fallback must retain their existing contracts.
6. Tune calm-water sailing at close reach, beam reach, broad reach, and
   upwind headings. Verify that progress toward every island remains possible,
   while speed and trim remain bounded and deterministic.

## Module boundaries

`src/world/wind.ts` owns the deterministic wind vector and apparent-wind
calculation. A pure sail-response module near vessel kinematics owns lift,
drag, trim, no-go behavior, and bounds. `kinematics.ts` integrates those
forces and retains collision resolution. The HUD/input layer exposes trim and
wind cues but does not mutate meshes or physics. Scanner navigation owns route
intent and may request a trim/tack assist through the vessel API.

## Acceptance and verification

- Wind direction and strength are visible, stable, and coherent with vessel
  behavior. Mainsail angle is controllable from keyboard and touch and its
  effect is understandable without opening developer UI.
- Apparent wind and sail trim produce bounded finite forces. The no-go zone
  prevents direct upwind progress, while tacking and falling off the wind make
  every portfolio destination reachable.
- Manual steering remains responsive at low and high speed. Scanner travel
  completes safely, can be cancelled by steering, and never bypasses collision
  or world-bound contracts.
- Pure tests cover wind vectors, apparent-wind signs, sail-force curves,
  trim/no-go bounds, invalid and long frames, frame partitioning, reverse or
  low-speed maneuvering, obstacle/bound collision, and scanner handoff.
- Browser checks cover wind/sail readability, keyboard and simultaneous touch
  input, pause/reset/reduced motion, six layouts, fallback content, and
  resource disposal. Record VM and physical-device performance separately.

## Risks and alternatives

An accurate sailing model can make a portfolio feel inaccessible or strand a
new visitor into the wind. Begin with a simplified lift/drag curve, generous
trim assist, and a soft no-go stall; expose stricter behavior only after a
playability review. If the model harms scanner clarity, keep scanner travel
as a clearly bounded assisted route and improve wind cues before adding more
force detail. Avoid making visual sail animation imply force that the physics
does not apply.

## Review gate

Deliver a playable wind-and-trim candidate for interaction review after
WEB-011. Review reachability, tack clarity, manual feel, scanner handoff, and
mobile readability before adding more realistic sail dynamics or weather
variation.

## In-phase visual review steering

The user wants trim legible on the actual boat. Remove the jib and its accent;
increase original main area by at least 60%, with a taller mast/longer boom,
and use a contrasting original foot/clew panel. Keep hull and collision geometry
unchanged. Inspect both tacks at the ordinary desktop and mobile camera scales;
no downloaded assets or extra floating labels are required.

## Completion — 2026-09-24

Application commit `b73f434` is published on `origin/master`; [Pages run 36083098095](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36083098095) succeeded for the exact SHA.

All combined Phase 9 acceptance checks are recorded in
[the verification record](../../artifacts/phase9/VERIFICATION.md). Public
HTML/assets and browser controls were verified. Stop for user review before
implementing another backlog phase.
