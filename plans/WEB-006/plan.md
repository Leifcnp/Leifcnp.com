# WEB-006 — Primitive vessel kinematics, steering, buoyancy, and camera tracking

## Goal

Introduce a clearly oriented temporary vessel and predictable movement over the wave field, including thrust, reverse/braking, rudder yaw, hydrodynamic drag, smooth heave/pitch, and a camera that follows the vessel.

## Dependencies

- Accepted WEB-005 island layout and docking radii.
- WEB-003 deterministic wave sample with height and slope information.
- Input support and a reserved spawn position that does not begin inside a docking zone.

## Scope and exclusions

In scope: primitive block or hull proxy with explicit bow indicator, deterministic fixed-step or clamped-delta kinematics, keyboard controls, heading/velocity state, water-following pose, and smooth orthographic camera tracking. Touch controls are a later responsive input layer after desktop steering feel is reviewed.

Exclude proximity prompts, content drawer, persistent HUD navigation, scanner autopilot, final sailboat mesh, wake/foam, and final collision/shore physics.

## Steps

1. Define a vessel state (`position`, horizontal velocity, heading, angular velocity, throttle/rudder input) and constants for forward thrust, reverse/braking, yaw torque, linear drag, and angular drag.
2. Consume keyboard input into intent values, clamp them, and integrate with a deterministic fixed-step accumulator (or a clamped `dt` fallback). Apply finite world bounds so the vessel cannot leave the playable water region or tunnel through the edge on a long frame. Derive `PLAYABLE_BOUNDS` from the approved scene/water scale; leave the numeric tuning explicit and adjustable rather than inventing a second coordinate system.
3. Sample the shared water function at the vessel position and nearby bow/stern points. Smoothly set heave from height and pitch/roll from local slopes, with damping that prevents jitter.
4. Render a primitive block with a high-contrast bow/forward marker. Orient the marker to heading and expose enough visual feedback to judge reverse and rudder behavior.
5. Spring the orthographic camera target and position toward the vessel with bounded smoothing; preserve the chosen isometric angle and avoid sudden zoom or rotation.
6. Establish one bow-forward convention at the state/renderer boundary: the proxy’s local `+Z` points toward the bow, heading `0` points along world `+Z`, and positive yaw is right-handed about world `+Y`. Ensure input listeners, animation, and geometry dispose cleanly. Defer touch controls until this convention and keyboard steering are reviewed.

## Module boundaries and APIs

- `src/world/vessel/types.ts`: serializable vessel state and tuning constants.
- `src/world/vessel/input.ts`: maps keyboard intent to normalized controls and has `dispose`; a later touch adapter must feed the same intent shape.
- `src/world/vessel/kinematics.ts`: pure `stepVessel(state, input, dt, sampleWave)` with deterministic output.
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
- Touch controls can obscure the scene; ship keyboard/gamepad first and add compact mobile controls only after a viewport review.

## Deliverables

- Testable vessel state integrator and input adapter.
- Temporary primitive vessel with water-following pose.
- Smooth camera-follow rig with preserved isometric view.

## Review gate

Stop for a steering/feel review on desktop and mobile before adding any proximity or content interaction. Record tuning changes as constants rather than scattering magic numbers.

## Implementation status

Planned for a later phase; explicitly unimplemented during Phase 1.
