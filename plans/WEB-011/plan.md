# WEB-011 — Offshore storm water and inward recovery

## Goal and scheduling

User requested an off-screen storm area on 2026-09-24: darker storm water with larger waves that push the boat back into the play area. Phase 8 is active after the user accepted WEB-013 swells and authorized the next obvious step. Use its reviewed shared wave model. Keep the normal portfolio route calm and approachable.

## Dependencies and exclusions

Depends on reviewed Phase 5 art, WEB-010 coupling and accepted WEB-013 visible waves/wake. Preserve scanner/content interaction and custom-domain configuration. Do not add lightning flashes, sound, weather networking, or random punitive control loss as incidental scope.

## Execution steps

1. Measure sea-plane camera footprints at the starting position for supported portrait, landscape, desktop, and wide layouts. Choose a calm play region and offshore transition band that begin beyond the ordinary starting view, fit within the rendered field, and leave safe room before the finite boundary. Document any ultra-wide tradeoff.
2. Implement a pure smooth storm-intensity field from position. Use it to blend water color, swell amplitude/steepness, and physical forcing continuously, with no ring seam or abrupt force step.
3. Share the same storm-modulated sampler with the visible water, vessel pose, and foam placement. Increase roughness locally without increasing geometry or per-frame work unboundedly.
4. Add a bounded inward current/wave force toward the calm region, rising through the storm band. Preserve enough manual control to turn around; damp outward momentum before the final safety edge. Never teleport the boat or allow outward thrust to strand it beyond the playable field.
5. Keep all portfolio islands and scanner routes in calm water. If a scan begins in the storm, plan a safe return and hand off cleanly. Pause/reduced-motion/reset and hidden-tab behavior must remain consistent.
6. Verify trajectories entering the storm at different speeds/headings and near corners, visualize intensity/force curves during development, then remove debugging overlays from the release. Inspect visuals and mobile cost before publication.

## Module boundaries

A pure `stormField` module owns region/intensity/inward-direction calculations. The shared wave sampler consumes intensity; pure kinematics consumes the force; the renderer only colors/displaces water from that same field. Camera, UI, and content modules do not own storm physics.

## Acceptance and verification

- Starting portfolio views show calm water; the darker rough-water region becomes visible as the vessel explores offshore.
- Intensity and force are continuous at both edges of the transition band. Wave geometry and hull response stay in phase.
- Inward response reliably returns released or outward-moving boats toward safe water, while deliberate inward steering remains responsive. No trapping, land overlap, non-finite state, or teleportation.
- Final finite bounds remain a last safety net; camera corner rays still see water throughout supported travel.
- Pure tests cover zero intensity inside, smooth monotonic transition, correct inward force on all sides/corners, bounded dynamics, frame-rate stability, and recovery trajectories. Browser checks cover the visible transition, return navigation, scanner recovery, pause/reset/reduced motion, and mobile layouts.
- Record desktop/VM performance and obtain external physical-device feedback before increasing wave/effect complexity.

## Risks and alternatives

A storm that is too close crowds the navigation map; too far away makes the feature difficult to discover. Resolve placement from camera footprints and reviewed boat speed. A broad soft current with visible swell is the initial implementation; reserve abrupt breaking waves or severe steering penalties for an explicit later request.

## Review gate

Verify and publish this storm phase through the established master/docs GitHub Pages workflow, record exact-SHA/public evidence, and stop for user review before implementing another backlog task. WEB-017 incoming-wave variation and common direction remains low-priority planning only.


## Active contracts and placement

- Storm center is the actual spawn `(0,0)`. A C1 radial field is exactly calm through radius 142 and reaches full intensity at 172 world units.
- Existing supported camera views at startup fit wholly inside the calm disk, including calm crest/trough heights. The existing 4-unit water grid covers the entire transition; no additional geometry is needed.
- Manual/scanner finite safety bounds expand from ±180 to ±220, leaving a broad recovery margin outside the storm band. The rendered water remains ±360, and camera corner rays at the expanded bounds, including 2.52-unit crest/trough heights, must stay inside it. The island data's existing ±180 validation is retained independently.
- `stormField.ts` owns intensity/inward direction/gradient and tuning. `waves.ts` scales the existing authored wave sum by up to 1.4, with consistent slopes/vertical velocity. `createOceanSurface.ts` blends storm colors and crest emphasis. Hull pose supports the enlarged height bound; no boat art changes.
- Kinematics opts into bounded inward current plus outward momentum damping before the brake/collision resolution. It stays active during explicitly resumed reduced-motion sailing as boundary assistance. Reduced motion continues to suppress optional wave forces/foam; pause/hidden time freezes everything. Scanner routing owns travel while active and can always return from the storm.
- Sustained outward thrust may balance the current within the soft band; it must not reach the hard edge or become trapped. Releasing thrust or steering inward must reliably return to calm. No automatic steering, bouncing, teleportation or abrupt control lock.

## Team ownership and completion checklist

- Luna storm physics: `stormField.ts`, kinematics and field/recovery tests.
- Luna storm water: shared sampler, water shading/crest emphasis, hull support and related tests.
- Root: camera/route tests, world/scanner wiring, normal-camera browser review, lifecycle/contact verification, docs and publication.

- [x] Read the accepted baseline and preserve existing source/dependencies/domain metadata.
- [x] Save low-priority WEB-017 with its own acceptance criteria and plan.
- [x] Verify supported opening camera footprints and expanded boundary coverage; verify calm island routes and offshore return paths.
- [x] Integrate shared storm sampling, visible transition, hull support and bounded return forces.
- [x] Verify heading/speed/reverse/brake recovery, fixed-step determinism, finite collision-safe paths and actual hull contact.
- [x] Inspect desktop/mobile storm visuals, scanner escape, pause/reset/hidden/reduced motion and resource budgets.
- [ ] Run native/build/browser checks, publish and verify exact-SHA Pages/public files/public interactions.
- [ ] Mark WEB-011 Done with evidence and stop for review.


## Root review findings

- The first palette change blended only 30% toward storm colors and was too close to ordinary turquoise. The revised full navy/slate palette now clearly communicates the offshore zone while retaining a continuous transition.
- Hull heave had to increase from 1.85 to the shared 2.52 maximum; otherwise it clipped storm crests. Actual transformed deck/hull trajectories at four headings and 30/60/120 Hz retain a dry deck and submerged hull contact.
- Strengthened recovery checks inspect every trajectory sample for hard-edge contact and compare every state component across frame rates. Powered outward travel settles within the soft band; neutral/inward control returns to calm.
- The camera checks cover six supported layouts up to 2560×1080 and the tall 360×915 view. The minimum opening calm margin is 4.08 units and finite-water margin is 10.14 units. More extreme aspect ratios can expose the distant storm at startup; keep this tradeoff explicit instead of rescaling the approved camera in this phase.
