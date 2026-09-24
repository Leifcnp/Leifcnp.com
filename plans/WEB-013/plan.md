# WEB-013 — Stronger interactive waves, displacement, and wake

## Goal and scheduling

Future feedback says the current background feels too static and the boat's
impact on the water is too subtle. Deepen the visible and local interaction
between hull, waves, and wake after WEB-011 has been reviewed. This is a new
visual/physics phase beyond WEB-010's shipped modest bounded wave response; it
does not reopen WEB-010 by default.

## Dependencies and exclusions

Depends on the reviewed WEB-010 shared sampler/response and WEB-011 storm
field. If WEB-012 wind-driven sailing is implemented first, align wave force,
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
   storm intensity across representative speeds and headings. Identify where
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

1. Capture the reviewed WEB-011 scene at rest, slow/fast forward travel,
   reverse, sharp/soft turns, scanner arrival, storm entry/exit, and shore
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
   motion in calm and storm bands. Keep geometry and effect counts bounded;
   suppress nonessential ripples under reduced motion while retaining
   navigation/content access.
6. Verify visual coherence and steering at six layouts, then repeat resource
   and timing measurements in the same VM and record any available physical-device
   feedback separately. Do not mislabel VM viewport results as hardware-mobile
   performance.

## Module boundaries

The shared wave sampler and storm field remain the sole sources for surface
phase and intensity. A pure `waveInteraction` module near vessel kinematics
owns local disturbance and force calculations. `createWake` or a sibling
pooled effect module owns visual ripples/foam and disposal. Water geometry
consumes sampled displacement; the vessel pose consumes hull samples; UI and
scanner code only receive state and do not mutate effects or meshes.

## Acceptance and verification

- The ordinary background shows clear, coherent motion at the approved camera
  distance. Hull contact, bow disturbance, stern wake, and turn effects are
  visibly tied to sampled water phase, vessel speed, heading, and storm
  intensity.
- Local displacement and force response are finite, bounded, deterministic,
  and frame-rate stable. They cannot cause land penetration, boundary escape,
  scanner failure, or unpredictable manual steering.
- Wake/ripple allocation stays within a fixed pool or documented bounded
  budget. Pause, reset, instant travel, reduced motion, hidden tabs, and
  disposal leave no stale effects or resource leaks.
- Pure tests cover shared-sampler agreement, disturbance sign/decay, force
  caps, invalid/long frames, frame partitioning, storm blending, collision and
  bounds interaction, brake/manual control precedence, and scanner handoff.
- Browser checks cover calm/storm visuals, slow/fast travel, turns, shore
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

Deliver a bounded interaction prototype for visual and steering review after
WEB-011, with a clear performance record. Require review of calm/background
motion, hull contact, storm coherence, scanner behavior, and mobile cost
before making the response more physically complex or publishing a stronger
wave model.
