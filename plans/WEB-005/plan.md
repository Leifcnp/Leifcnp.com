# WEB-005 — Island landmarks, decoupled data, and docking zones

## Goal

Add mock, data-driven island landmarks to the water field and make each island’s docking-trigger radius visible, establishing the world coordinates and content contract needed by later interaction work.

## Dependencies

- Accepted WEB-004 Phase 1 review.
- WEB-002’s separate typed content module and WEB-003’s deterministic wave sampler.

## Scope and exclusions

In scope: typed mock island records with name, coordinates, separate land/collision radius and larger docking-trigger radius, category, and placeholder resume/project/writing/media content; low-poly island meshes; visible boundary rings/markers; stable island IDs and world-to-content mapping.

Exclude boat movement, collision response, proximity prompts, drawer/HUD interaction, scanner autopilot, final art, and real personal media. Markers are visual in this phase; they do not trigger actions.

## Steps

1. Define a content schema independent of Three.js: `IslandId`, category union, world position, `landCollisionRadius`, larger `dockingTriggerRadius`, display metadata, and placeholder entries. Validate IDs, positive radii, and `dockingTriggerRadius > landCollisionRadius` at load time.
2. Place a small, intentionally spaced set of mock islands within the water bounds; avoid overlapping docking circles and reserve a clear spawn area for WEB-006.
3. Create simple low-poly landforms from primitive geometry with a restrained palette. Keep all island creation behind a world/landmarks module that accepts island records.
4. Add ring or marker geometry at each docking-trigger radius, visually distinguishable and accessible to later proximity logic. Keep both radii in world units as the single source of truth: the docking ring is an interaction boundary, while the land radius is the physical obstacle boundary.
5. Dispose all landmark geometry/materials and marker resources with the world lifecycle. Keep the existing orthographic camera static until WEB-006.

## Module boundaries and APIs

- `src/content/portfolio.ts`: owns serializable mock island records and content payloads; no Three.js imports.
- `src/world/createLandmarks.ts`: `createLandmarks(scene, islands)` returns `{ group, dispose }` and maps records to meshes/markers.
- `src/world/islandTypes.ts`: shared types and validation helpers.
- `createWaterWorld` or an explicit scene composition layer owns adding/removing the landmark group, while the water module remains ignorant of content semantics.

## Acceptance checks

- Every mock island record renders at its declared coordinates and has a visible marker whose radius matches its docking-trigger radius; the land/collision radius remains a separate documented value.
- IDs, categories, and placeholder content are stable and decoupled from mesh construction.
- Orthographic water framing remains usable and the field remains free of a vessel.
- Markers are visual only: no input, proximity, drawer, or navigation behavior exists yet.
- Landmark resources cleanly dispose and production build still passes.

## Risks and alternatives

- Overly small islands disappear at the isometric scale; tune primitive footprint while preserving coordinate/radius contracts.
- Ring lines can alias on low-resolution screens; use a low-poly torus or simple translucent disc, with a clear fallback.
- Future content may outgrow a single file; keep the schema serializable so it can move to JSON/Markdown without changing world APIs.

## Deliverables

- Mock island/content data module.
- Low-poly island and visible docking-zone landmark renderer.
- Updated scene composition and disposal path.

## Review gate

Pause after visual and data-contract review. Do not add vessel controls or trigger behavior until the user accepts island placement, labels, and marker readability.

## Implementation status

Planned for a later phase; explicitly unimplemented during Phase 1.
