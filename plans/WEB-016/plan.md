# WEB-016 — Local harbour zoom and data-driven submenu destinations

## Goal and scheduling

When a visitor manually reaches an island, reveal a closer local view with
smaller dockable harbours for submenu or content subsections. Use a smooth
camera zoom and clear exit hysteresis so the local map feels discoverable
without trapping the vessel or breaking the broader sailing view. This is a
deferred follow-up: on 2026-09-25 the user explicitly put harbours and zoom
aside to focus on boat feel. It is no longer the next task after WEB-015.
Revisit after sailing controls/feedback are reviewed and the user restores it.

## Dependencies and exclusions

Depends on the reviewed storm boundary, island collision/routes, scanner
navigation, content schema, and camera-follow contracts. The data design
must be compatible with WEB-015 selected-harbour popup blocks and WEB-014's
turning safety. Preserve the existing shoreline collision radius and define
any new local harbour clearance deliberately before implementation.

Exclude arbitrary free-orbit controls, a second unrelated world coordinate
system, automatic zoom for scanner-only arrival unless explicitly designed,
and new island art unrelated to local harbour readability. Do not implement
until manual arrival, scanner arrival, mobile camera bounds, and route safety
have a written interaction decision.

## Execution steps

1. Audit each island's current position, land radius, docking radius, content
   categories, scanner destination, and camera footprint. Choose a local
   harbour coordinate frame or explicit world coordinates that remain stable
   in content data and can be validated at load time.
2. Extend the data contract with typed subharbour records: stable ID,
   parent-island ID, world/local coordinates, dockable radius, submenu or
   content subsection ID, display label, and route metadata. Validate that
   subharbours do not overlap land, each other, or unsafe shoreline paths.
3. Define the manual-arrival trigger. Require a deliberate arrival inside an
   island zone, then blend to the local camera framing with a bounded zoom and
   follow target. Use separate enter and exit thresholds so wave motion,
   collision push-out, and small steering corrections do not flicker the
   local view; document what “zoom out” means for the exit transition.
4. Render smaller dockable harbour markers and submenu destinations from the
   same data. Keep labels readable at mobile sizes and preserve the selected
   harbour/content state when the camera returns to the wider map.
5. Define scanner compatibility before coding: scanner routes may target a
   subharbour, arrive at the parent island, or remain at the broader harbour,
   but each choice must use one explicit camera/state transition and must not
   trigger local zoom unexpectedly. Manual helm input cancels scanner travel
   while allowing sailing between local subharbours; it must not immediately
   exit the local view. Leaving the zone or an explicit zoom-out action exits.
6. Verify shoreline collision and route planning through every local harbour,
   including reverse departure, tight turns, storm-adjacent islands, camera
   edges, portrait/landscape framing, reset, pause, hidden tabs, and reduced
   motion. Inspect the visual hierarchy before adding further local detail.

## Module boundaries

Typed island/subharbour records and content subsection IDs remain in
`src/content/` with validation independent of Three.js. Route planning owns
safe points and path clearance. The camera rig owns the smooth local framing,
enter/exit hysteresis, and mobile bounds. Landmarks render markers from data;
HUD/navigation owns submenu and content selection. No module may infer a local
harbour from mesh bounds at runtime.

## Acceptance and verification

- Manual arrival at an island causes one smooth, bounded local camera zoom
  after the documented trigger; leaving through the exit threshold returns to
  the wider view without flicker or camera snapping.
- Every visible small harbour maps to one stable parent island, submenu or
  content subsection, coordinate, dockable radius, and safe route. Data and
  geometry tests prove no land/harbour overlap and preserve shoreline
  collision clearance.
- Scanner navigation, popup/content selection, manual helm cancellation,
  reset, pause, hidden-tab suspension, and reduced motion remain coherent.
  Scanner behaviour must not accidentally trigger the manual-arrival local
  zoom contract.
- Local framing remains usable on desktop, portrait, short landscape, and
  wide screens; camera bounds keep the vessel and selected harbour visible
  without exposing unsafe world edges.
- Pure tests cover data validation, enter/exit hysteresis, camera convergence,
  route clearance, collision interaction, scanner compatibility, and invalid
  inputs. Browser checks cover manual arrival, submenu selection, touch,
  keyboard, six layouts, reset, pause, and reduced motion.
- Record geometry/draw-call and mobile frame-cost changes before adding more
  harbours or decorative shoreline content.

## Risks and alternatives

Local zoom can make the broader portfolio geography unclear; retain a visible
parent-island identity and a reliable zoom-out control. Small dock radii can
conflict with the existing hull collision radius; enlarge or reposition the
harbour and route rather than weakening collision safety. Hysteresis that is
too wide can feel sticky, while a narrow band flickers on waves; tune it from
measured camera and vessel motion. If subharbour routing is not yet safe,
review markers and content selection as a prototype; keep this task unfinished
until the requested smaller harbours are safely dockable.

## Review gate

Deliver the local harbour view as a separate reviewed phase after the storm
and its preceding UI/turn decisions are accepted. Stop before adding further
submenus, local weather, or decorative harbour complexity until manual and
scanner transitions have been reviewed on mobile and desktop.

