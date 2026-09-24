# WEB-007 — Proximity interaction and fast-path scanner HUD

## Goal

Connect island docking zones to accessible content discovery: local proximity reveals an explore prompt, a persistent top HUD links directly to categories, and a slide-over drawer shows mock content. Scanner Autopilot moves the vessel/camera smoothly to a selected island and opens its drawer immediately.

## Dependencies

- Accepted WEB-006 vessel state and camera rig.
- WEB-005 stable island IDs, coordinates, separate `landCollisionRadius`/`dockingTriggerRadius`, and decoupled content schema.
- An explicit review of interaction copy and input behavior before final content is supplied.

## Scope and exclusions

In scope: distance-based proximity detection, prompt state, persistent DOM HUD, direct category links, drawer rendering, keyboard/focus behavior, and interruptible scanner navigation with safe docking routes.

Exclude final art, real resume/media data, networking, auth, CMS integration, and changes to the established water sampling API. Islands and their obstacle zones already exist in this phase; navigation must consume the approved sampler and landmark contracts rather than rewrite them.

## Steps

1. Implement a pure proximity selector using vessel position and each island’s docking-trigger radius, with hysteresis or a small exit margin to prevent prompt flicker.
2. Build semantic DOM HUD landmarks: a labelled navigation region with one button/link per category, a status/prompt region, and a labelled non-modal `aside` drawer. Keep the Three canvas as a visual layer rather than embedding UI in WebGL. The drawer may slide over the scene visually, but it must not use `aria-modal` or a focus trap that excludes the persistent HUD.
3. Render mock content from the typed records. On open, move managed initial focus to the drawer heading or close control; support close button, `Escape`, keyboard navigation, focus visibility, and focus return to the triggering control. Keep every top HUD navigation button clickable and keyboard reachable while the drawer is open, including on mobile, and announce meaningful state changes through a polite status region.
4. Add a route planner for scanner navigation. Resolve a target docking point inside the target island’s docking-trigger radius but outside its land/collision radius plus vessel clearance. Treat land collision circles, expanded by vessel clearance, as obstacles; do not treat every harmless docking-trigger ring as solid unless a future design decision explicitly opts into that behavior. Check the direct segment for intersections; when blocked, generate deterministic detour waypoints around obstacle tangents or another bounded route strategy, while keeping every waypoint inside finite world bounds. The final leg must approach the target safe point without crossing land or the vessel-clearance boundary.
5. Add scanner navigation as an interruptible state machine: selecting a category resolves an island, opens its drawer immediately, and commands vessel/camera motion along the safe route. A new scanner click or user steering cancels/replaces the current command. If no safe route can be found, stop autopilot, retain the drawer, and announce a recoverable status so the user can steer manually.
6. Clamp autopilot movement to the same finite world bounds used by vessel kinematics and avoid entering island meshes or their vessel-clearance envelopes. Respect reduced motion by shortening or skipping UI/camera transitions while preserving destination state.
6. Add responsive layout and compact mobile controls that remain usable without covering the drawer or canvas. Keep pointer and keyboard paths equivalent.

## Module boundaries and APIs

- `src/interaction/proximity.ts`: pure `getProximityState(position, islands)` with enter/exit behavior.
- `src/ui/Hud.ts` or DOM controller: owns nav, prompt, non-modal labelled aside/drawer, managed initial/return focus, Escape handling, and ARIA state; no Three.js imports.
- `src/navigation/scanner.ts`: interruptible `startScan(islandId)`, `cancelScan(reason)`, and state transitions; consumes a vessel/camera command adapter.
- `src/navigation/routePlanner.ts`: pure `planSafeDockingRoute(start, targetIslandId, islands, bounds, vesselClearance)` routine with land-radius segment/obstacle checks, docking-annulus validation, and bounded detours; no DOM or Three.js imports.
- `src/content/portfolio.ts`: remains the sole mock-content source.
- `src/world/vessel/commands.ts`: narrow movement target API; do not let UI mutate mesh state directly.

## Acceptance checks

- Entering/leaving a docking-trigger radius shows/hides a usable explore prompt without flicker.
- HUD remains accessible at the top while the world runs; every category button opens the matching island drawer.
- Scanner selection opens the drawer immediately, moves the vessel/camera smoothly, and can be interrupted by steering or another scanner selection.
- Scanner routes terminate inside the target docking-trigger radius but outside land plus vessel clearance, avoid other land obstacles and finite-world edges, and report a recoverable failure when no route exists.
- The drawer is a labelled non-modal aside: close and `Escape` work, managed initial/return focus works, no focus trap excludes the HUD, and every top navigation button remains keyboard reachable/clickable while open on desktop and mobile.
- Mobile layout and reduced-motion behavior preserve the same destination/content semantics.
- No interaction code leaks into the data module or requires a Three.js scene query.

## Risks and alternatives

- Auto-moving the vessel may disorient users; show clear active state and cancel on direct input, with a short bounded travel duration.
- A modal focus trap can strand keyboard users or hide the always-accessible scanner HUD; keep the drawer semantically non-modal, manage initial/return focus, and leave HUD controls in the normal tab order.
- Category names may map to multiple future islands; keep scanner resolution by stable `IslandId` and define category selection behavior in data.
- Immediate content open and delayed vessel arrival can feel inconsistent; represent “scanning to” status without blocking the drawer.

## Deliverables

- Proximity detector and explore prompt.
- Persistent semantic HUD and accessible content drawer.
- Interruptible scanner/autopilot controller tied to vessel/camera adapters.

## Review gate

Review interaction flow with keyboard, pointer, mobile viewport, and reduced motion before approving final asset polish. Do not replace placeholders or add wake effects in this task.

## Implementation status

Planned for a later phase; explicitly unimplemented during Phase 1.
