# WEB-015 — Transparent resume and content popup blocks

## Goal and scheduling

Let visitors read resume and portfolio content while still seeing the boat
sail toward the selected harbour. Use lightly transparent content blocks so
the world remains part of the interaction, while maintaining readable
contrast, predictable focus, and comfortable scrolling. On 2026-09-24 the
user authorized proceeding with the next task at root discretion. WEB-015 is
active Phase 10, followed by WEB-016 after review. New sailing ideas remain
Backlog. Continue the established build, publish and public-review workflow.

## Dependencies and exclusions

Depends on the reviewed navigation, scanner, HUD, and content contracts, plus
the WEB-011 pause/reduced-motion behaviour. Preserve the existing semantic
DOM, keyboard focus model, touch controls, scanner routes, and content data
separation. Coordinate selected-harbour state with WEB-016's submenu model
without implementing local harbour zoom here.

Exclude a full-screen opaque takeover, expensive backdrop blur by default,
new content services, authentication, real-time networking, and changes to
boat physics. Any transparency must have a solid or high-contrast fallback
when readability, reduced motion, or browser support requires it.

## Execution steps

1. Inventory current drawer, HUD, scanner status, focus, and scroll behaviour
   for resume, projects, writing, and media. Define the selected harbour and
   content-block states that can coexist with visible scanner travel.
2. Apply a slightly translucent treatment to the existing responsive drawer,
   explicit text/background contrast, a readable border or shadow, and a
   no-blur fallback. Establish maximum width/height, safe-area insets, and
   scroll containment for portrait, short landscape, and desktop views.
3. Keep content in the existing data modules. Render headings, metadata,
   links, and close/navigation controls through semantic DOM; do not encode
   portfolio content in the WebGL scene. Ensure the popup does not hide the
   boat's route status or make the selected harbour ambiguous.
4. Define motion policy for opening, switching, and closing blocks. Reduced
   motion should use an immediate or minimal transition while preserving
   navigation access. Pause behaviour must be explicit and consistent with
   the visitor's choice to watch the boat travel.
5. Exercise keyboard focus entry/return, Escape/close, tab order, scrolling,
   touch scrolling, repeated category changes, scanner cancellation, and
   route completion. Verify that the visible scene continues to update when
   appropriate and stops only when the established pause or reduced-motion
   policy requires it.
6. Review contrast and legibility over calm and storm-adjacent water, then
   inspect six layouts and low-power/mobile behaviour before implementation is
   considered ready.

## Module boundaries

Content records remain in `src/content/`; popup state and semantic rendering
remain in the HUD/content UI layer. The scene and vessel modules expose
telemetry or navigation callbacks but do not create DOM blocks. Styling owns
transparency, contrast fallback, safe-area spacing, and responsive scrolling;
it must not add a default backdrop-filter dependency.

## Acceptance and verification

- Resume and content blocks are slightly transparent while keeping body text,
  controls, and selected-harbour status readable against every supported
  scene state. A solid high-contrast fallback is available without blur.
- The boat's selected-harbour travel remains visible and its status is
  understandable while a block is open. Opening content does not corrupt
  scanner handoff, cancellation, reset, or manual helm controls.
- Keyboard users receive focus in the block, can reach all controls and
  scrollable content, close it, and return focus predictably. Touch users can
  scroll and close it without trapping page or scene gestures.
- Reduced motion, pause, hidden-tab suspension, resize, safe-area insets, and
  WebGL fallback retain accessible content access and do not create duplicate
  listeners or render loops.
- Tests cover state transitions, focus/close/scroll contracts, selected
  harbour status, reduced-motion behaviour, and repeated open/close cleanup.
  Browser checks cover contrast/readability and six desktop/mobile layouts.
- Record mobile rendering cost and confirm that transparency does not require
  an expensive full-screen blur or unbounded compositing work.

## Risks and alternatives

Transparency can reduce contrast over bright foam or dark storm water; use a
measured overlay, border, and solid fallback rather than increasing blur.
Keeping the scene moving may distract from long text; expose the established
pause control and make the harbour status persistent. Very tall content can
cover the route; cap the panel and contain its scroll region.

## Review gate

Deliver the popup treatment for visual and accessibility review after its
navigation dependency is stable. Stop before adding local harbour zoom or
submenu-specific scene changes; those belong to WEB-016.


## Phase 10 ownership and release checklist

- Luna CSS owner changes only the existing drawer surface and readability fallbacks.
- Luna independent reviewer checks visibility, scroll/focus and mobile risks.
- Root owns canonical planning, measured contrast, real boat-through-drawer
  captures, six-layout interaction checks, the production build and release.
- Do not add a new animation loop, blur, runtime dependencies, content data or
  physics changes. Use opaque text over translucent paper, with solid surfaces
  for greater contrast, reduced transparency and missing WebGL.
- Validate body, metadata, links and control/focus colors against worst-case
  black/white underlays, plus actual calm/dark water. Exercise overflow with
  temporary long mock content, not extra shipped filler.
- Publish generated `docs/` with the custom domain preserved; confirm exact-SHA
  Pages success and byte-identical public assets before marking Done.
