# WEB-010 — Stronger boat and water interaction

## Goal and scheduling

User requested more interaction between the boat and the water on 2026-09-24. The user accepted Phase 5 and authorized this next release on 2026-09-24. The baseline has sampled buoyancy and a pooled wake; this task deepens that coupling rather than replacing the completed controls or duplicating the wake task.

## Scope

Use the shared wave sampler for visible water, hull contact, and a small deterministic wave response. Candidate changes include restrained surge/sway from wave slopes, speed-dependent pitch/roll, and contact foam/ripples where the hull displaces water. Select the smallest set that produces a noticeable, controllable improvement. Keep content/HUD and island layout stable. Do not build the offshore storm here.

## Execution steps

1. Capture Phase 5 behavior and user feedback: at rest, forward, reverse, turns, scanner arrival, and shore contact. Establish a visual and input-feel baseline.
2. Extend the wave sampler contract only if needed (height, slopes, optional temporal velocity) with deterministic inputs; make all consumers agree. Avoid a second unrelated buoyancy wave.
3. Add a pure bounded force/response calculation with named tuning values and fixed simulation steps. Apply it before existing collision resolution, preserve manual steering authority, and cap lateral/vertical response.
4. Refine contact foam and wave-height placement through the existing pooled effect API. Avoid per-frame resource creation; suppress nonessential effects under reduced motion.
5. Integrate scanner/manual handoff, pause/resume, reset, tab visibility, and disposal. Instant scanner placement must clear trails and settle the pose without a force spike.
6. Compare the change visually at slow/fast sailing speeds and in portrait/landscape, measure renderer counts/frame time in the same environment, and publish only the reviewed candidate through the established Pages workflow.

## Boundaries and ownership

Physics belongs in a pure module near `src/world/vessel/kinematics.ts`; wave data stays in `src/world/waves.ts`; vessel pose stays in `createVessel`; visual contact effects stay under `src/world/effects/`. UI controls do not mutate meshes. Preserve collisionRadius and scanner route clearance unless every dependent contract is deliberately updated and tested.

## Acceptance and verification

- Side-by-side review shows stronger coherent hull/water contact without a floating hull or an unrelated wave phase.
- Wave response is finite and bounded at all supported time steps, including invalid/long frames. Released input drifts predictably and manual thrust/rudder remain useful.
- Collision resolution still keeps the complete hull clear of land and within the world; scanner travel remains safe.
- Pause is visually still; reset clears force/effect history; hidden tabs do not catch up; reduced motion preserves navigation/content access.
- Tests cover sampler agreement, force signs/bounds, timestep behavior, collision interaction, and scanner handoff. Browser checks cover keyboard/touch, six layouts, and resource disposal. Record physical-device performance separately from VM viewport checks.

## Risks and alternatives

Too much wave force makes a portfolio feel difficult to navigate. Prefer small, tunable forces and readable contact effects. If force coupling harms the approved control feel, improve pose/contact cues first and expose a measured alternative for review. The future storm boundary consumes the same shared model; do not hard-code storm behavior here.

## Review gate

Review improved sailing feel and the motion/performance record before WEB-011 introduces offshore storm forces. This is the active follow-up release; stop after its verified deployment and review handoff.


## Implementation assignments and release checklist

- Luna wave dynamics: shared height/slope/vertical-velocity sample, bounded horizontal wave force before collision resolution, optional simulation-time input, and pure dynamics tests.
- Luna hull response: hull-sized sampling, restrained speed pitch and turn heel, finite smoothing/reset, reduced-motion suppression, and pose verification. Preserve the custom geometry.
- Luna contact effects: speed/turn/swell-sensitive original procedural foam within a fixed instance pool; verify lifecycle/disposal.
- Root integration: simulation clock, scanner arrival hold/manual handoff, reduced-motion policy, browser review, build and Pages publication. No shared-file agent edits.

- [x] Confirm clean reviewed Phase 5 baseline and repository build/deployment contract.
- [x] Move WEB-010 to In progress; retain WEB-011 in Backlog.
- [x] Integrate the three bounded implementation packages.
- [x] Verify wave-force signs/bounds, temporal sampling and frame-rate behavior, collision handling, hull contact, and resource lifecycle.
- [x] Verify all six desktop/mobile layouts, keyboard/multitouch, scanner arrival/cancellation, pause/reset, hidden tabs, reduced motion, and WebGL fallback.
- [x] Inspect desktop/mobile sailing visuals and record renderer cost with VM limitations.
- [x] Build, inspect generated output/domain metadata, commit and push the focused release, verify exact-SHA Pages and public assets/interactions.
- [x] Record verification, update canonical task status, and stop before the storm phase.

## Integration contract

`stepVessel` accepts an optional fifth `waveTimeSeconds` argument representing the start of the step. Omit it for reduced motion; scan paths bypass forces, and a completed scanner arrival remains horizontally moored until helm input. Use active fixed simulation time so pause/visibility changes cannot cause wave-phase jumps or catch-up. The visible surface keeps its existing deterministic wave equation. Additional hull/effect response shares its phase and is suppressed by reduced motion. Instant navigation/reset clear contact history and settle pose.


## Implemented behavior and local evidence — 2026-09-24

- Surface vertical velocity is the derivative of the existing height field. Wave slopes supply capped surge/sway before braking and collision resolution. Legacy motion remains available when wave time is omitted.
- Eight hull support points produce smoothed buoyancy; forward speed adds at most 0.065 radians bow lift and turn rate adds at most 0.12 radians heel. Original boat geometry is unchanged.
- Split bow foam and outer-turn wash react to `abs(surface.velocityY + velocity · surface.gradient)` at the current simulation time. The 96-instance pool, one mesh/material/geometry, and reset/disposal contracts are retained; at most 58 slots were active in the lifecycle fixture.
- Root integrated a shared fixed clock, corrected the floating-point accumulator threshold, and added horizontal mooring for completed scans. Manual input releases mooring; added drift/pose effects/foam are suppressed by reduced motion.
- 52 native tests and strict production build pass. Actual controller/source-world tests cover 5,784 finite, collision-safe states, identical 30/60/120 Hz trajectories, manual handoff, mooring, pause/visibility, reduced motion, reset, and disposal.
- Six-layout production browser checks pass, including real two-finger touch and fallback content. Original art/resource budget remains unchanged at 38 geometries, zero textures, and up to 50 observed draw calls. Full evidence: [Phase 6 verification](../../artifacts/phase6/VERIFICATION.md).

## Publication evidence

Application commit `8544bb8f141d2f836654b3b9d763d5829bddd0e5` passed [exact-SHA Pages run 36072041419](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36072041419). Public HTML, JavaScript, CSS, and favicon match local output byte for byte; the full public six-layout interaction suite passes. See [public assets](../../artifacts/phase6/public-assets.json) and [public checks](../../artifacts/phase6/public-checks.json). WEB-010 is Done; stop for sailing-feel review before WEB-011.
