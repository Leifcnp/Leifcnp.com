# WEB-011 — Offshore storm water and inward recovery

## Goal and scheduling

User requested an off-screen storm area on 2026-09-24: darker storm water with larger waves that push the boat back into the play area. Schedule after WEB-010 so the visual storm and physical response share one proven wave model. Keep the normal portfolio route calm and approachable.

## Dependencies and exclusions

Depends on reviewed Phase 5 art and WEB-010 boat/water coupling. Preserve scanner/content interaction and custom-domain configuration. Do not add lightning flashes, sound, weather networking, or random punitive control loss as incidental scope.

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

Deliver the storm as its own runnable release for review after WEB-010. No implementation is required in Phase 5.
