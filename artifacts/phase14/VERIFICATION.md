# Phase 14 — Varied incoming wave sets

Date: 2026-09-25. Task: WEB-017. Local verification complete; publication pending.

## Delivered behavior

- Six fixed-phase swell components replace the intersecting wave directions.
  All travel toward world −X within 4.42°, aligned with true wind. The primary
  remains a 30-unit, 5.8-second swell; secondary components produce different
  set heights, spacing and arrival intervals without random frame jitter.
  The absolute theoretical bound remains 1.8, or 2.52 offshore.
- The same height/derivative function drives the water, wave forces, wake,
  faceted hull support and spray. Fixed-pool crest ribbons search for nearby
  compound maxima, require both shoulders to fall away and fade before the
  search boundary. Small/cancelling sets carry less foam. Ribbon corners
  sample the already-updated water vertex buffer with the same alternating
  triangles used by hull contact.
- A 3 rad/s limit on visual pitch/roll changes prevents an abrupt storm tack
  revealed by the aligned fronts. Existing heel angles, heave/contact bounds,
  steering, horizontal force tuning, wind, custom hull and controls remain.
- No dependencies, imported art, new animation clocks, harbours, zooming,
  shoreline features, domain or deployment configuration changes.

## Verification

- Strict build and 153 native tests pass (`native-tests.txt`, `build.txt`).
  Tests cover finite-difference slopes, analytical vertical velocity, common
  propagation, three-minute crest size/timing variation and long-time bounds.
  The wave-direction fixture follows/opposes the actual incoming field and
  asserts it never reaches the world boundary. Storm gradient checks request
  an explicit small secant distance, removing an old mismatch between the
  default 0.35-unit secant and an infinitesimal derivative.
- Existing 9,968 actual hull/contact frames retain their original clearance
  and continuity assertions. An additional independent rendered-triangle
  oracle reviews 1,536 reset poses across headings/tacks/turns/calm/storm:
  minimum outer deck −0.06000004, central working area +0.16934, 1,177 actual
  rail-dip poses (`mesh-contact.json`). Analytic height can differ substantially
  from the coarse offshore facets; visible-contact checks use actual triangles.
- `world-checks.json` and `contact-voyage.json`: actual source-world WASD,
  Q/E manual pocket, auto trim, boost, spill, scanner handoff, 30/60/120 Hz
  trajectories, bounded contact spray, wave/crest pause/hidden/reset/reduced
  motion and disposal pass. No runtime/shader errors.
- Six final production layouts pass: 1440×900, 390×844, 320×568, 360×915,
  844×390 and 2560×1080 (`checks.json`). All categories, focus, 44px buttons,
  scanner replacement/arrival, touch, reduced motion and WebGL fallback pass.
- Matched normal-camera desktop/phone frames in `baseline/` and `current/`
  compare water code pinned to `72a9d476` with the new field at 0/2/4 seconds,
  another set at 27 seconds, and offshore water. The harness injects only
  inspection hooks and a controlled animation clock; shipped code has none.

## Variation and cost

- A 31×31 grid sampled every two seconds over 180 seconds gives maximum
  absolute height 2.38494, RMS 0.83181, maximum slope 0.57080 and vertical
  velocity 2.99120 (`wave-metrics.json`; grid includes storm water). Baseline
  values are 2.5115 / 0.8526 / 0.4254 / 2.9019. Aligned faces are steeper,
  remain bounded, and pass the original contact/force/recovery tests.
- Four calm probes sampled at 20 Hz over three minutes show a 1.268-unit
  significant crest-height range and 1.45–7.10-second inter-crest intervals.
  Native tests independently enforce visible amplitude/timing variation.
- 1,801 ocean updates at 10 Hz over 180 seconds retain fixed buffers and
  show no visible crest teleport; maximum visible displacement per 0.1s is
  0.5943 units (`ocean-metrics.json`). Native checks additionally test actual
  compound crest slopes and both shoulders, rather than ribbon geometry alone.
- Water remains 14,641 vertices / 28,800 triangles. Crest quads decrease from
  726 to 442. Matched desktop reset/three-second auto-trim rendering uses 59
  calls, 34,488 triangles, 44 geometries, zero textures: 568 fewer triangles
  with unchanged draw/geometry/texture counts versus Phase 13.
- The initial crest implementation cost 10.731 ms median / 30.445 ms p95 per
  CPU update. Reusing rendered vertices and skipping inactive crest searches
  reduced this to 4.170 / 4.697 ms. The pinned baseline measured 4.921 / 9.329
  ms. These separate Node/VM runs include scheduling variation; they are not
  physical-phone frame-rate claims. Raw measurements are retained.
- Final JS: 588.89 kB / 158.42 kB gzip; CSS 13.67 / 3.60 kB. The existing
  >500 kB bundle warning remains. No texture or dependency was added.
- Luna agents implemented sampler/crest slices and performed independent
  baseline/cost and integration reviews. Root corrected phase/crest coupling,
  strengthened regression fixtures, bounded tilt transitions, optimized cached
  surface sampling and performed browser/release verification.

## Publication and boundary

Pending application commit, exact-SHA successful Pages run, matching public
HTML/JS/CSS/favicon and public desktop/mobile interaction checks. Keep WEB-017
In progress until these complete; then stop for review. WEB-022 shoreline
response remains queued and WEB-016 harbours/zoom remains deferred.

Browser evidence uses Chromium with SwiftShader in the Ubuntu VM. Mobile
layout/touch coverage does not replace testing on a physical phone GPU.
Custom-domain metadata is unchanged; the separate WEB-001 HTTPS investigation
remains outside this phase.
