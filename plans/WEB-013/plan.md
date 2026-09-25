# WEB-013 — Stronger interactive waves, displacement, and wake

## Goal and scheduling

The user explicitly moved this work ahead of the storm on 2026-09-24 because the published interaction was not clearly visible. WEB-013 is now complete, published and awaiting review. Deliver moving swells, readable wake, and coherent hull response at the existing desktop/mobile camera distances. This follows WEB-010's modest baseline and uses the existing publish-and-review workflow; stop after this release.

## Dependencies and exclusions

Depends on the shipped WEB-010 sampler/response. WEB-011 storm is not a prerequisite; it remains deferred by the user’s latest direction. If WEB-012 wind-driven sailing is implemented first, align wave force,
apparent wind, wake direction, and simulation timing with its vessel state.
Preserve scanner/autopilot, keyboard/mobile controls, pause, reset,
reduced-motion, collision safety, fixed-step determinism, and the current
custom geometry/effect ownership.

Exclude unbounded particle systems, per-frame geometry allocation, fluid
simulation, networked weather, audio, and storm redesign. Allow small tuning
prototypes before committing to more complex physics; visual displacement may
ship independently if it gives stronger contact without harming control feel.

## Interaction model to establish first

1. Measure the shared wave phase, hull sample points, current wake pool, and
   shared surface motion across representative speeds and headings. Identify where
   the water appears static because displacement amplitude, lighting, camera
   scale, or hull contact is too weak.
2. Define a bounded local interaction footprint around the hull. Candidate
   effects include short-lived displacement ripples, bow impact foam, stern
   turbulence, and wake broadening with speed and turning. All must sample the
   same water model as the visible surface and pose response.
3. Keep force feedback coherent: local wave/contact response may influence
   surge, sway, heave, pitch, and roll within named caps, while manual
   steering remains useful. Storm intensity may scale the response smoothly.
4. Make the background visibly dynamic at ordinary camera distances through
   layered phase/lighting variation and coherent local disturbances, without
   relying on noise that produces a second unrelated ocean.

## Execution steps

1. Capture the published WEB-010 scene at rest, slow/fast forward travel,
   reverse, sharp/soft turns, scanner arrival, current wave motion, and shore
   contact. Record draw calls, frame time, wake-pool usage, and mobile viewport
   captures as the baseline.
2. Prototype visual-only local displacement and contact effects using the
   existing pooled-effect lifecycle. Compare several bounded radii, decay
   curves, and speed/turn scalars; remove prototypes that do not read at the
   approved camera distance.
3. Extend the shared sampler only where a measured mismatch requires it.
   Expose pure interaction calculations for disturbance amplitude, direction,
   force, and decay. Keep the storm multiplier and any wind alignment as
   inputs instead of hard-coding future weather behavior.
4. Integrate the smallest effective response before collision resolution and
   retain fixed substeps. Ensure contact forces cannot penetrate islands or
   push the vessel outside the finite world. Clear all interaction history on
   reset, instant scanner placement, pause transitions where required, and
   disposal.
5. Refine water shading/displacement so the wider field carries readable
   motion in the current open water. Keep geometry and effect counts bounded;
   suppress nonessential ripples under reduced motion while retaining
   navigation/content access.
6. Verify visual coherence and steering at six layouts, then repeat resource
   and timing measurements in the same VM and record any available physical-device
   feedback separately. Do not mislabel VM viewport results as hardware-mobile
   performance.

## Module boundaries

The shared `waves.ts` sampler remains the sole source for surface phase and
intensity. `waveResponse.ts` owns bounded slope force and powered uphill
resistance; `pose.ts` owns hull support and tilt. `createOceanSurface.ts` owns
water/crest buffers. Storm integration stays deferred. `createWake` or a sibling
pooled effect module owns visual ripples/foam and disposal. Water geometry
consumes sampled displacement; the vessel pose consumes hull samples; UI and
scanner code only receive state and do not mutate effects or meshes.

## Acceptance and verification

- The ordinary background shows clear, coherent motion at the approved camera
  distance. Hull contact, bow disturbance, stern wake, and turn effects are
  visibly tied to sampled water phase, vessel speed, heading, and the shared swell phase.
- Local displacement and force response are finite, bounded, deterministic,
  and frame-rate stable. They cannot cause land penetration, boundary escape,
  scanner failure, or unpredictable manual steering.
- Wake/ripple allocation stays within a fixed pool or documented bounded
  budget. Pause, reset, instant travel, reduced motion, hidden tabs, and
  disposal leave no stale effects or resource leaks.
- Pure tests cover shared-sampler agreement, disturbance sign/decay, force
  caps, invalid/long frames, frame partitioning, collision and
  bounds interaction, brake/manual control precedence, and scanner handoff.
- Browser checks cover ordinary water visuals, slow/fast travel, turns, shore
  contact, keyboard/touch, six layouts, reduced motion, pause/reset, fallback
  content, and renderer/resource disposal. Record VM and physical-device
  performance separately.

## Risks and alternatives

More wave motion can make the portfolio look busy, reduce text readability,
or make the vessel feel unstable. Tune camera-distance readability and local
contact cues before increasing global wave amplitude. If force coupling harms
navigation, ship stronger visual displacement and pooled contact effects as a
measured alternative, retaining the modest WEB-010 force. If pooled ripples
remain too costly on mobile, use a small shader/vertex cue or fewer event
types instead of increasing the pool.

## Review gate

Deliver the stronger waves/wake release for visual and steering review before
WEB-011, with a clear performance record. Require review of calm/background
motion, hull contact, scanner behavior, and mobile cost before implementing
the storm or adding more complex sailing physics.


## Active assignments and review criteria

- Luna water agent: shorter/faster travelling swells, animated crest/trough shading, efficient indexed mesh with finer central water sampling, shared deterministic surface derivatives, geometry/lifecycle tests.
- Luna wake agent: continuous curved V wake and broad stern wash from bounded travel history, readable bow contact, speed/turn/phase response, zero growing GPU resources.
- Luna hull agent: correct weighted heave normalization, align response/freeboard with the stronger shared surface, modest bounded horizontal wave force, finite-state and contact verification.
- Root: world lifecycle integration, plan/TODO priority, baseline/candidate motion captures at normal camera distance, native/build/browser checks, public deployment verification.

- [x] Confirm user priority override and clean published baseline.
- [x] Integrate the water/wake/hull packages without implementing other backlog controls or UI.
- [x] Review multi-frame evidence at normal camera scale: travelling wave highlights must visibly move; the hull must rise/tilt with them; wake must broaden and follow turns rather than read as dotted rails.
- [x] Verify shared surface agreement, hull freeboard, bounded forces/collisions, scanner mooring/handoff, pause/reset/visibility/reduced motion, and fixed resource lifecycle.
- [x] Inspect desktop/mobile production UI, keyboard/touch and fallback regressions; record renderer cost and VM limitations.
- [x] Build, publish through existing Pages setup, confirm exact-SHA deployment and public files/interactions, update task Done and stop for review.

The original custom boat geometry, content, domain, rudder tuning, and top navigation stay in their existing contracts. Storm, wind propulsion, tighter turns, translucent drawers, and submenu harbours are outside this implementation.


## Root review corrections

The first visible candidate established obvious moving swells but had broad pale crest patches and dark wake tails. Root requested narrower restrained crest accents, real vertex-alpha fade, and endpoint taper. Subsequent review corrected inactive wake history connecting to the world origin, repositioned bow foam against the hull, and required crest recycling only outside the water field so accents remain continuous over long sessions. Hull heave now divides by the actual sample weights; powered uphill wave resistance closes the previous full-throttle speed-cap gap.

Normal-camera baseline and final motion frames are retained in the verification artifact. Functional tests alone are not considered evidence of visible improvement; review the travelling crests, changed hull orientation, and curved/dissolving wake on desktop and portrait views.

Final browser review also caught duplicate shader color-space declarations that native compilation cannot detect. Root removed the redundant include and verified the corrected shader with zero WebGL console errors. See [Phase 7 verification](../../artifacts/phase7/VERIFICATION.md).

## Completion — 2026-09-24

Application commit `742a4d4` is live; Pages succeeded for the exact SHA and public files match the build. All 61 native tests and the local/public six-layout browser suites passed. Actual hull contact, deterministic world paths and bounded wake resources were verified. [Release evidence](../../artifacts/phase7/VERIFICATION.md) records the visible before/after and the higher geometry cost/software-VM timing limits. Stop here for user review before WEB-011 or any other backlog implementation.
