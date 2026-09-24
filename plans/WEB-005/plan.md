# WEB-005 — Island landmarks, decoupled data, and docking zones

## Goal

Add mock, data-driven island landmarks to the water field and make each island’s docking-trigger radius visible, establishing the world coordinates and content contract needed by later interaction work.

## Dependencies

- Phase 1 published and accepted as the starting point by the user on 2026-09-24.
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

- `src/content/portfolio.ts`: owns serializable mock content payloads; no Three.js imports.
- `src/content/islands.ts`: shared island types, records, content references, and validation helpers; no Three.js imports.
- `src/world/createLandmarks.ts`: `createLandmarks(scene, islands)` returns the group, label anchors, framing bounds, and disposal function; maps records to meshes/markers.
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

Implemented on 2026-09-24; release verification is in progress. The user authorized next steps after confirming the live Phase 1 site. Three Luna agents implemented data/validation, world geometry/framing, and DOM labels/shell, with root integration and release verification.

## Integration decisions

- Separate `src/content/islands.ts` owns `IslandDefinition`, four records, content references, and runtime validation; the existing `portfolio.ts` retains mock content. No Three.js imports in content.
- Pass island records into `createWaterWorld` through options; render land through an isolated `createLandmarks` module. Export projected label coordinates through an optional callback so the DOM does not import Three.js.
- Frame all four fixed-coordinate islands and their rings with a fixed true-isometric orthographic camera, adapting the frustum to viewport and overlay margins. No orbit/zoom controls or vessel tracking.
- Static labels are readable and noninteractive. The top identity/motion shell is compacted, but category navigation remains Phase 4.
- Keep the origin clear, rings non-overlapping, land inside its collision radius, and visible rings defined by the larger docking radius. Water displacement remains unchanged.
- Validate malformed data, content references, geometry bounds and ring radii. Inspect desktop, mobile portrait, short landscape, and wide viewport captures. Verify pause, reduced motion, fallback, and disposal still work.
- Build and publish only after integration checks. Preserve `leifcnp.com`, avoid dependency upgrades, and stop at the Phase 2 review gate.

## Review findings addressed

- Project per-island generated bounds rather than estimated peak heights or one oversized combined box. Correct the camera-space Y inset so content moves below the header.
- Move the camera along the same isometric diagonal and extend the water background to 540 world units while retaining 76 segments (11,552 triangles). This prevents near-plane clipping and exposed field corners on tall phones without increasing triangle count.
- Put labels below the landforms, enlarge small-screen category text, and space Chartroom farther from Logbook to keep its label clear of the adjacent landmass.
- Keep all visible land vertices within the collision radius and every docking-ring sample on the trigger radius. Verify shared geometry/material disposal runs exactly once.
- Preserve the existing water sampler and keep the ±180 playable domain inside the larger decorative water field.
