# Phase 10 — Readable translucent drawers

Date: 2026-09-24. Task: WEB-015.

## Delivered behavior

- The existing semantic content drawer uses 84% warm paper with opaque text,
  revealing the sailing world beneath. No backdrop blur, dependencies, model,
  content or physics changes were introduced.
- On phones/tablets up to 900px, a content-sized bottom sheet is capped at 44%
  of the viewport. The boat remains visible above it during scanner travel.
  Desktop uses the side drawer; short landscape reserves additional room for
  the boat beside it. Drawer insets respect available safe-area values.
- Text and borders are darkened for contrast. Greater contrast and reduced
  transparency preferences use solid paper; forced colors use system surfaces.
  Missing WebGL also selects a solid drawer and retains every category.
- The independently scrolling content region is labelled and keyboard
  focusable. Tab past Close to reach it; Page Up/Down and arrow keys scroll
  without steering. Existing heading focus, Escape/Close return, persistent
  scanner navigation and immediate content access remain.
- Future ideas are saved separately: WEB-019 now includes visible translucent
  wind streams; WEB-020 covers auto-trim/manual boost with foam and sound;
  WEB-021 covers stronger reach heel, shallow rail dip and bow spray.

## Verification

- Strict type checking and production build pass. JS is 564.17 kB / 149.83 kB
  gzip; CSS is 13.28 kB / 3.51 kB gzip. The existing >500 kB bundle warning
  remains. See `build.txt`.
- Existing 101 native tests pass (`native-tests.txt`). New behavior was checked
  in the browser rather than duplicating CSS declarations in unit tests.
- `checks.json`: all four categories at 1440×900, 390×844, 320×568, 360×915,
  844×390 and 2560×1080. Navigation, focus, 44px controls, overflow, scanner
  replacement/arrival/manual handoff, touch, reduced motion and WebGL fallback
  pass without script or console errors.
- `drawer-checks.json`: measured sRGB contrast over the darkest/lightest
  possible underlays; sampled normal text stays at or above 4.53:1. Headings
  and Close text reach 8.54:1. `contrast.json` also checks links (4.52:1),
  borders (3.77:1) and focus (3.92:1). Greater contrast, reduced transparency and
  forced-color emulation select solid/system surfaces. Temporary long content
  scrolls with mouse wheel, PageDown and a real touch swipe; document stays fixed.
- `voyage-checks.json`: projected custom-boat bounds remain clear of the drawer
  in desktop, phone and small-phone captures; short landscape keeps its center
  clear. The boat advances while reading. The storm-edge capture uses the
  actual source world and existing water/boat geometry. Deterministic clock
  and state hooks exist only in the browser QA fixture and are not shipped.
- Root inspected phone, 320px, landscape, desktop and storm captures; Luna
  independently reviewed the final CSS/DOM change without finding a material
  accessibility or navigation regression.

## Publication

Local verification complete. Exact-SHA Pages and public asset/interaction
verification are the remaining release checks.

## Limits and review boundary

Checks use Chromium with SwiftShader in the Ubuntu VM. These validate layout,
rendering and interactions; physical-phone GPU performance and actual iOS
safe-area hardware remain for external review. No new rendering loop or blur
was added. Existing domain/TLS investigation remains separate in WEB-001.
Stop after this phase for review; WEB-016 local submenu harbours is the next
queued candidate. New sailing ideas remain Backlog.
