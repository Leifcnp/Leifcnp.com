# Phase 12 — Reach heel and hull-contact spray

Date: 2026-09-25. Task: WEB-021. Local verification complete; publication pending.

## Delivered behavior

- Sail-only heel reaches 20° under full beam load. A nonlinear power/crosswind
  curve makes ordinary powered reaches lean visibly; both tacks mirror and
  spilling wind removes this load. Waves and turn heel combine under the
  existing 0.4-radian (22.9°) roll cap. Horizontal steering, trim, boost, wind
  forces, collision bounds and original boat geometry are unchanged.
- The contact helper transforms actual authored bow/chine and top-rail points
  using the boat's YXZ pose. Its support interval allows shallow outer-edge
  wash (at most 0.06 units) while maintaining 0.12 units at working-deck,
  cockpit-corner and mast-base guards, and retaining an immersed hull.
  Heave corrections use the current target base, avoiding feedback against
  the previous frame's heave. Tilt and heave remain smoothed.
- Hull supports, contacts and spray now sample the visible water triangles.
  The old continuous formula can differ by over one unit from the twelve-unit
  offshore faces. The shared axis/alternating-triangle helper fixes that
  mismatch without changing ocean geometry, vertices, wave components or
  horizontal wave forces. Analytic-vs-rendered comparisons in the evidence
  intentionally differ: the rendered surface is the contact reference.
- One original 48-particle instanced pool provides bow droplets when forward
  motion meets closing water, plus wash at the moving, loaded leeward rail.
  Launch and re-entry use current visible water height. Existing 96-particle
  wake and boost foam remain. No downloaded art, textures or dependencies.
- Scanner travel/mooring, pause, hiding, reset and reduced motion clear spray.
  No emission at idle/reverse. The shared simulation clock discards paused
  wall time; disposal is idempotent. Harbours/zoom remain deferred.

## Verification

- Strict type check and Vite build pass. JavaScript 582.27 kB / 155.89 kB gzip;
  CSS 13.67 kB / 3.60 kB gzip. Existing >500 kB bundle warning remains.
- 137 native tests pass (`native-tests.txt`), including all previous controls,
  navigation, wind/boost/audio, wave/storm and geometry regressions. New cases
  check rendered-triangle interpolation, actual contact transforms, rail dip,
  spray gating/pooling/re-entry/disposal and mirrored bounded heel.
- Actual-mesh contact tests retain the historical 6,528 loaded/spilled/reduced
  and live-turn frames, plus 3,360 calm/offshore transition frames at
  30/60/120 Hz and 80 rail-dip samples: 9,968 contact frames. Every recorded
  frame retains hull intersection and the dry working-area/outer-edge bounds.
  Maximum measured heave steps at 30/60/120 Hz were 0.227/0.125/0.066 units;
  roll steps were 0.088/0.047/0.024 radians. Rate-scaled bounds and reset-zero
  derivative history pass (the final focused sailing-contact suite: 5/5).
- An independent 1,536-case probe interpolates actual ocean mesh triangles,
  rather than using the new helper as its oracle (`mesh-contact.json`). Worst
  outer-deck clearance is −0.06000004 (float precision); centre deck/mast/
  cockpit-centre clearance is +0.169. The true top rail dips in 944 cases.
- Same real W/Q/E input, times and horizontal states before/after:
  auto sailing roll changes from −5.55° to −13.84°; the manual surge changes
  from −11.04° to −18.98°. See `before/` and `after/`. These snapshots include
  wave opposition; 15–20° is the powered reach target, not a constant roll.
  Baselines are pinned to Phase 11 application commit `e2f8f4f`.
- `world-checks.json`: actual keyboard auto/manual/boost/spill, manual latching,
  30/60/120 Hz horizontal trajectories, scanner reading/handoff, pause/hidden
  clock behavior, reduced motion and idempotent disposal pass without errors.
  `contact-voyage.json` records spray in 100 of 150 sampled sailing frames,
  at most 11 visible particles, within the fixed 48-particle pool; pause,
  scanner, reset and reduced-motion spray clearing are checked directly.
- Normal-camera desktop/mobile captures cover both tacks, broad reach and
  storm contact (`contact-scenes.json` and corresponding images). Detail
  captures crop the unchanged camera image; they do not enlarge the boat in
  the product. The bow accents are restrained alongside the existing wake.
- Production preview passes six sizes: 1440×900, 390×844, 320×568, 360×915,
  844×390 and 2560×1080 (`checks.json`). All four categories, focus/reading,
  44px touch targets, scanner replacement/arrival, F/Explore, simultaneous
  touches, reduced motion and WebGL fallback pass with no runtime errors.
- Measured resources: 55 calls, 34,920 triangles, 40 geometries, zero textures
  versus 53/33,000/39/0 previously. The transparent double-sided spray adds
  two bounded passes, one geometry and no textures. No extra animation loop.
- Luna agents implemented pose/contact, pooled spray and the shared surface
  helper, and reviewed integration. Root corrected true rail placement,
  support continuity and visible-water sampling and performed release QA.

## Publication

Pending the existing master/docs GitHub Pages release and exact-SHA/public
asset checks. The domain metadata remains `leifcnp.com`; no DNS/TLS changes.

## Review boundary and limits

Stop after this phase for user sailing-feel review. WEB-019 wind streams/flags
is the next candidate; wave variation and shoreline interaction remain queued,
and harbours/zoom remain deferred. Chromium/SwiftShader validates behavior and
mobile layouts in this VM; physical-phone GPU performance and subjective feel
still need external testing. The baseline analytic sampler records remain
historical evidence, not a claim of rendered-surface clearance.
