# Phase 13 — Visible wind streams and flags

Date: 2026-09-25. Task: WEB-019. Published and publicly verified.

## Delivered behavior

- One fixed buffer draws 32 original translucent tapered breeze strokes.
  They move toward the existing true wind (world −X) at a readable visual
  speed, using a seeded 128-unit periodic world pattern. Camera tracking
  selects nearby copies without moving live strokes. A 44–58-unit radial
  fade hides each stroke before wrapping at ±64; whole-stroke shoreline
  clearance fades the effect without teleporting it around land.
- A striped coral/cream pennant at the actual transformed boat masthead
  trails apparent wind (true wind minus boat velocity). A Shipyard flag
  trails true wind. The pole is grounded by a raycast against the existing
  mesa at world (17.9799, −22.0201), clear of the dock. The existing boat
  meshes, main, boom and mast are unchanged.
- The HUD keeps wind-from wording. The existing short scene note now explains
  that pennants trail downwind. No extra controls or panels.
- Shared simulation time drives flutter and airflow. Pause/hiding freezes
  both without catch-up; reset restores the same pattern. Reduced motion
  immediately hides streams and removes flutter while retaining directional
  flags. Scanner navigation remains usable and flags follow the actual boat.
- Phase 12's original 48-particle contact spray is reused with its existing
  wind drift. No duplicate pool, crest spray, textures, downloaded assets,
  new RAF, physics changes, wave variation, harbours or zooming.

## Verification

- Strict type check/build and 148 native cases pass (`native-tests.txt`).
  Final JavaScript is 588.07 kB / 158.05 kB gzip; CSS remains 13.67 kB /
  3.60 kB gzip. The existing >500 kB JavaScript warning remains.
  New checks cover visible ribbon bodies, downwind travel, land clearance,
  world-position continuity across camera crossings, shared-time determinism,
  transformed masthead, true/apparent direction reversal, zero apparent wind,
  immediate reduced-motion changes and idempotent resource ownership.
- `wind-world-checks.json`: actual source world verifies airflow −X movement,
  true-vs-apparent flags while sailing, both tacks, offshore/mobile/scanner
  views, pause/resume/hidden freeze, deterministic reset, reduced motion,
  bounded geometry and idempotent disposal without shader or runtime errors.
- Normal camera captures show idle/sailing/other tack, storm, phone, scanner
  travel and reduced-motion cues. Phone review led to a smaller, denser field
  while keeping one draw and fixed capacity; no camera or boat scaling changed.
- Final desktop resource measurement is stored in `desktop-resources.json`,
  using the same reset/three-second auto-trim scenario as Phase 12. Mobile
  counts in the world check differ because of frustum culling; compare like
  viewports. The planned addition is four calls and 136 triangles, four
  geometries, zero textures over the Phase 12 55/34,920/40/0 baseline.
- Six final production layouts pass: 1440×900, 390×844, 320×568, 360×915,
  844×390 and 2560×1080 (`checks.json`). All categories, 44px targets, focus,
  scanner arrival/replacement, touch, reduced motion and WebGL fallback pass
  without console/runtime errors. Public desktop/mobile checks also pass (`public/checks.json`).
- Luna agents implemented flags/streams and reviewed direction/placement.
  Root replaced camera-dependent draft placement with stable periodic world
  positions, tuned phone density, integrated lifecycle and performed QA.

## Publication and boundary

Application commit `72a9d476` is published on `origin/master`. [Pages run 36218780257](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36218780257) succeeded for the exact SHA. Public HTML, JavaScript, CSS and favicon match the tested build byte for byte (`public-assets.json`). The unmodified public bundle passes desktop/mobile sailing controls, auto/manual trim, all categories, scanner travel/arrival, touch, reduced motion and WebGL fallback (`public/checks.json`) without console or script errors. WEB-019 is Done and awaits user review.

Domain configuration is preserved. Stop after this one
wind-cue phase for review; wave variation/direction and shoreline response
remain queued, and harbours/zoom remains deferred.

Browser evidence uses Chromium/SwiftShader in the Ubuntu VM. It checks phone
layouts and interaction, not physical-phone GPU performance or subjective
wind readability during real handheld use.
