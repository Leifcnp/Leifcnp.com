# WEB-022 — Wave interaction with islands and shorelines

## Request and scheduling

The user requested a future task on 2026-09-24: make the waves interact with
the islands. This is planning only. The 2026-09-25 queue review deferred
WEB-016 harbours/zoom and prioritized boat feel. Shoreline response remains
after core controls, boat feedback and WEB-017 wave direction; this queue
review does not start implementation or publication.

## Goal and boundaries

Make the existing shared wave field read as part of the same world as the
islands. Where waves meet a shoreline, add restrained signs of contact such
as crest breakup, swash, foam, or deflection/dissipation. Keep the authored
land geometry and collision contracts intact. Do not create a second wave
simulation, allow water to cut through land visibly, or make the boat harder
to navigate as incidental scope.

The first implementation should use one representative island and one
prevailing wave direction. Extend to the remaining islands only after the
normal-camera result, shoreline clearance, reduced-motion behavior, and
resource cost are reviewed.

## Interaction behavior

1. Define a pure shoreline query from the existing island footprint and
   shared wave sample. It should identify near-shore water, approach direction,
   local depth/clearance, and a bounded contact intensity without changing
   land collision radii.
2. Reuse the same simulation clock and deterministic wave inputs as the water,
   hull, wake, and storm systems. Shoreline cues must remain phase-consistent
   while paused, hidden, reset, or running at different frame rates.
3. Add a small pooled or instanced visual response at selected shoreline
   segments. Breakup, swash, foam, or reflected/damped crest motion should
   follow the island outline and fade with distance, wave height, and incidence
   rather than forming a constant ring.
4. Keep scanner routes, manual steering, docking zones, and the finite world
   safe. A shoreline effect may communicate contact but must not expand or
   silently redefine the land obstacle used by navigation.
5. Under reduced motion, suppress decorative shoreline animation while keeping
   a stable, readable shoreline/land fallback. Dispose all materials,
   geometries, buffers, and pooled instances exactly once.

## Dependencies and ownership

- `src/world/waves.ts` remains the source of wave height, slopes, and timing;
  no independent shoreline wave equation is allowed.
- Island data and geometry continue to own footprint and land-clearance
  contracts. A pure shoreline module may consume those contracts but must not
  mutate them.
- The world/effects owner should reuse the existing wake/contact lifecycle and
  shared renderer budgets where practical. Root owns integration, browser QA,
  and any release decision.
- Coordinate wave direction and seeded variation with WEB-017, wake/contact
  cues with WEB-010/WEB-013, and future wind-carried spray with WEB-019.

## Implementation sequence

1. Capture the current island/wave baseline at rest, sailing, scanner arrival,
   calm/storm transition, pause, reset, reduced motion, and six supported
   viewport layouts.
2. Prototype shoreline sampling around one island using the existing land
   footprint and prevailing wave direction. Verify finite intensity, correct
   side-of-shore signs, and no route/collision changes.
3. Add the smallest convincing contact cue, then measure draw calls, pooled
   instances, allocations, and frame cost on desktop and narrow mobile.
4. Stress-test headings, wave heights, storm multipliers, hidden-tab resume,
   and frame-rate partitioning. Expand to other islands only if the behavior
   remains coherent and bounded.
5. Record before/after captures and verification evidence, then stop for user
   review before combining this with new wave randomness, sound, or stronger
   shoreline geometry.

## Acceptance and tests

- A normal-camera comparison clearly shows waves reaching and responding to
  at least one island shoreline; the cue is directional and tied to the
  shared wave phase rather than a static decorative ring.
- Shoreline response stays inside declared water/land clearance, does not
  penetrate island meshes, and does not change vessel collision or scanner
  route outcomes.
- Pure tests cover finite/extreme wave samples, shoreline normals/clearance,
  incidence signs, calm/storm scaling, deterministic timing, pause/reset,
  reduced motion, and 30/60/120 Hz partitioning.
- Lifecycle tests cover pooled/instanced effects, repeated island creation and
  disposal, hidden-tab resume, bounded resource counts, and no per-frame
  unbounded allocations.
- Browser checks cover desktop/mobile layouts, manual sailing, scanner arrival,
  drawer visibility, pause/reset, reduced motion, WebGL fallback, and console
  cleanliness.

## Risks and review gate

Shoreline foam can look like a permanent outline or obscure island labels;
prefer sparse, directional accents with a quiet idle state. A reflected cue
can accidentally imply a new current or alter the boat’s physical model, so
keep it visual until a later request explicitly expands physics.

Deliver one bounded island shoreline prototype with before/after evidence and
stop for review before applying it globally or changing the wave model.
