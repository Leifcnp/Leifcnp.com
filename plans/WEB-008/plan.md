# WEB-008 — Sailboat, island details, wakes, and final polish

## Goal

Replace approved placeholders with a cohesive stylized low-poly sailing world while preserving the tested data, navigation, accessibility, and physics contracts.

## Dependencies

- Accepted WEB-007 interaction behavior and all prior review gates.
- A final visual direction, performance budget, and approved source/created assets.

## Scope and exclusions

In scope: low-poly sailboat replacement, primitive docks and beacons/lighthouses, wake/foam effects, material/lighting refinements, responsive visual polish, and performance tuning.

Exclude changes to canonical DNS/domain settings, speculative third-party asset licenses, new backend services, and redesigning the tested HUD interaction model unless separately requested.

## Steps

1. Replace the proxy block with a deliberately small low-poly boat assembled from owned primitives or clearly licensed assets. Preserve bow orientation, state pose, and input interfaces.
2. Add sail, mast, hull, and simple color/material hierarchy with readable silhouettes at the isometric camera distance. Keep optional details behind a quality/performance setting if needed.
3. Add docks and beacon/lighthouse primitives to island landmarks without changing their stable IDs, coordinates, or docking radii. Ensure details do not obscure prompt markers.
4. Add a bounded wake/foam effect driven by vessel speed and heading, with pooled geometry or a lightweight shader/mesh approach that disposes correctly. Suppress or simplify under reduced motion and low-power conditions.
5. Tune lighting, palette, fog/background, and water material together; review contrast for HUD, markers, and boat against the field.
6. Profile desktop and mobile rendering, cap pixel ratio, avoid per-frame allocations, and verify that all additions survive resize, pause, scanner movement, and teardown.

## Module boundaries and APIs

- `src/world/vessel/createSailboat.ts`: consumes the existing vessel pose/state adapter and returns a disposable render object.
- `src/world/landmarks/createIslandDetails.ts`: consumes island records and adds owned detail groups without owning interaction state.
- `src/world/effects/createWake.ts`: consumes vessel pose/speed and exposes `update`/`dispose`; honors reduced motion.
- Existing `src/interaction`, `src/ui`, and `src/content` contracts remain stable.

## Acceptance checks

- The sailboat reads clearly as a boat and retains correct heading, heave, pitch, steering, and scanner behavior.
- Islands have docks/beacons/lighthouses that remain legible and do not break docking markers or proximity checks.
- Wake/foam follows movement, is bounded, and degrades or pauses under reduced-motion/low-power conditions.
- HUD/drawer keyboard and mobile behavior remains unchanged and accessible.
- Production build, preview smoke checks, and representative mobile performance meet the agreed budget with no console or disposal errors.
- Any third-party asset has recorded license/provenance; generated output still preserves custom-domain metadata.

## Risks and alternatives

- Extra geometry and transparency can reduce mobile performance; prefer instancing/pooling and a flat-color fallback.
- Visual polish can make docking markers harder to read; keep marker contrast and hierarchy as a design constraint.
- A textured or imported sailboat increases asset and loading complexity; owned primitives are the default fallback.

## Deliverables

- Refined low-poly sailboat and island details.
- Tuned wake/foam effects and world materials/lighting.
- Performance/accessibility verification record and final build output.

## Review gate

Request final visual and interaction review after a production preview pass. Record any accepted visual tuning separately from functional regressions so future content edits remain safe.

## Implementation status

Planned for the final polish phase; explicitly unimplemented during Phase 1.
