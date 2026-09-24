# WEB-010 — Stronger boat and water interaction

## Goal and scheduling

User requested more interaction between the boat and the water on 2026-09-24. Schedule this after Phase 5 visual review. The baseline already has sampled buoyancy and will gain a pooled wake; this task deepens that coupling rather than replacing the completed controls or duplicating the wake task.

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

Review improved sailing feel and the motion/performance record before WEB-011 introduces offshore storm forces. This task is planned, not part of the current Phase 5 implementation.
