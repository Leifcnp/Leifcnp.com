# WEB-006 — Primitive vessel kinematics, steering, buoyancy, and camera tracking

## Goal

Introduce a clearly oriented temporary vessel and predictable movement over the wave field, including thrust, reverse/braking, rudder yaw, hydrodynamic drag, smooth heave/pitch, and a camera that follows the vessel.

## Dependencies

- WEB-005 island layout and docking radii accepted for continuation on 2026-09-24.
- WEB-003 deterministic wave height sample; derive slope from bow/stern and port/starboard samples.
- Input support and a reserved spawn position that does not begin inside a docking zone.

## Scope and exclusions

In scope: primitive block with explicit bow indicator, deterministic fixed-step kinematics, keyboard and touch controls, heading/velocity state, water-following pose, smooth orthographic camera tracking, reset to the clear origin, and conservative circular shoreline/world boundaries. Touch is included now because the user is testing the published site on both mobile and desktop.

Exclude proximity prompts, content drawer, persistent HUD navigation, scanner autopilot, final sailboat mesh, wake/foam, and final collision/shore physics.

## Steps

1. Define a vessel state (`position`, horizontal velocity, heading, angular velocity, throttle/rudder input) and constants for forward thrust, reverse/braking, yaw torque, linear drag, and angular drag.
2. Consume keyboard input into intent values, clamp them, and integrate with a deterministic fixed-step accumulator (or a clamped `dt` fallback). Apply finite world bounds so the vessel cannot leave the playable water region or tunnel through the edge on a long frame. Derive `PLAYABLE_BOUNDS` from the approved scene/water scale; leave the numeric tuning explicit and adjustable rather than inventing a second coordinate system.
3. Sample the shared water function at the vessel position and nearby bow/stern points. Smoothly set heave from height and pitch/roll from local slopes, with damping that prevents jitter.
4. Render a primitive block with a high-contrast bow/forward marker. Orient the marker to heading and expose enough visual feedback to judge reverse and rudder behavior.
5. Spring the orthographic camera target and position toward the vessel with bounded smoothing; preserve the chosen isometric angle and avoid sudden zoom or rotation.
6. Establish one bow-forward convention at the state/renderer boundary: the proxy’s local `+Z` points toward the bow, heading `0` points along world `+Z`, and positive yaw rotates toward world `+X` about world `+Y`. With this convention, starboard/right input applies negative yaw while moving forward and reverses while backing. Ensure input listeners, animation, and geometry dispose cleanly.

## Module boundaries and APIs

- `src/world/vessel/kinematics.ts`: serializable state, input, environment, tuning, and pure `stepVessel(state, input, dt, environment)`. Keep physics independent of Three.js and wave animation; visual pose samples waves separately.
- `src/controls/vesselInput.ts`: keyboard and pointer inputs feed the same normalized intent, with cancellation/reset/disposal.
- `src/world/waves.ts`: shared deterministic height function, extracted unchanged from the water renderer.
- `src/world/createVessel.ts`: visual proxy and water pose application.
- `src/world/createCameraRig.ts`: smooth follow while retaining orthographic isometric projection.

Keep the pure integrator independent of Three.js so it can be checked with edge-case examples: zero input, braking, full rudder, and boundary contact.

## Acceptance checks

- The bow indicator remains aligned with heading; forward, reverse/braking, rudder yaw, and drag are visibly distinct and responsive.
- Movement is stable across frame rates and long frames; state stays within world boundaries.
- Vessel heave and pitch follow waves smoothly without snapping or accumulating roll.
- The camera follows with bounded smoothing and remains orthographic/isometric.
- Input and render resources dispose cleanly; no Phase 4 prompt, HUD, or autopilot appears.

## Risks and alternatives

- Directly setting pose from raw wave height can jitter; use filtered height/slope targets and damped response.
- A fully physical boat model is unnecessary at this stage; keep the integrator kinematic and tunable, then refine feel after review.
- Touch controls can obscure the scene; reserve bottom-screen space, test portrait/short landscape, and keep at least 44px targets. Gamepad support is outside this phase.

## Deliverables

- Testable vessel state integrator and input adapter.
- Temporary primitive vessel with water-following pose.
- Smooth camera-follow rig with preserved isometric view.

## Review gate

Stop for a steering/feel review on desktop and mobile before adding any proximity or content interaction. Record tuning changes as constants rather than scattering magic numbers.

## Implementation status

Completed and published on 2026-09-24 after the user's “ok go for next.” Three Luna agents implemented physics, world rendering, and input/UI with separate file ownership; root integrated, reviewed, tested, documented, and published application commit `8548207`.

## Integration contract

- Input: `{ throttle: number, rudder: number, brake: boolean }`; clamp axes to −1…1. Positive rudder means the user asks to turn right.
- State: `{ x, z, velocityX, velocityZ, heading, yawRate }`. `createVesselState(x = 0, z = 0)` produces a resting state. `stepVessel` returns a new state.
- Environment: `{ worldLimit, obstacles: [{ x, z, radius }] }`. Use `ISLAND_WORLD_LIMIT` and each data record's `landCollisionRadius`, not its larger interaction ring. Conservative vessel radius prevents the rectangular block entering a landmass. No bounce simulation is needed.
- World controller adds `setInput`, `resetVessel`, and read-only `getVesselState` to the existing pause/dispose API. Optional telemetry stays separate from DOM input.
- The scene advances the integrator at 1/120 second with a bounded frame accumulator; long hidden-tab gaps cannot teleport the vessel. Exponential damping is elapsed-time based.
- Pause freezes waves, vessel, and camera; clear held inputs. Hidden/blurred pages release controls. Reduced motion starts paused and allows explicit Resume.
- Reset clears velocity/input and returns vessel and camera to the reserved origin. Shared wave samples drive smooth vertical position and pitch/roll, while camera follows horizontal motion only.
- Camera retains the true isometric angle, follows with bounded smoothing, and uses a useful boat scale on phones. Islands may leave the viewport as the boat moves; labels are projected every rendered frame and hidden outside usable screen space.
- Input supports WASD/arrows, Space brake, R reset, the existing P pause, plus accessible hold buttons. Pointer capture supports simultaneous thrust and rudder; pointer cancellation, lost capture, key release, focus changes, reset, and disposal must not leave input held.

## Detailed delivery checklist

- [x] Pure integrator and tunable constants: thrust, reverse, braking, longitudinal/lateral drag, yaw damping, and speed limits.
- [x] Pure behavior tests: coasting vs braking, reverse transition, forward/reverse rudder direction, stable frame subdivisions, long frames, finite state, island/world contacts.
- [x] Primitive block and high-contrast bow; shared wave sampling with damped heave/pitch/roll; resource disposal.
- [x] Fixed-step scene lifecycle, responsive isometric follow camera, moving label projection, and reset.
- [x] Keyboard and multi-pointer controls with correct focus/cancellation; compact 44px touch targets and readable instructions/fallback.
- [x] Integration QA: supported WebGL, motion/pause/reduced motion, keyboard and touch thrust/turn/release/brake/reset, camera tracking, bounds/collision, no console errors, responsive captures.
- [x] Production build and custom-domain metadata verified; commit/push to existing Pages path, verify exact deployment SHA and public output, update WEB-006 evidence, then stop for review.

## Integration verification

The 25-test suite, strict production build, and local browser checks pass. Evidence is in [artifacts/phase3/VERIFICATION.md](../../artifacts/phase3/VERIFICATION.md). [Pages run 36065708258](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36065708258) succeeded for application commit `8548207`; public assets match the build and all public browser checks pass. Await steering review before Phase 4.
