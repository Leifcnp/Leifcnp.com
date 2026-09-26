# WEB-017 — Wider-view wave pattern correction

2026-09-25. Published and publicly verified.

The user still saw repetition in the first correction (`b5b619a`) when viewing
more water. This reopens WEB-017 and stops before shoreline or harbour work.

## Delivered behavior

- Eight overlapping carriers span wavelengths 11–67 units. Broad, rotated
  detail and macro patterns bend each component independently and redistribute
  packet amplitudes. Stronger smooth phase bending breaks repeated interference
  at wide scale while retaining visible travelling crests. All four noise fields
  use fixed seeds; no fresh random draws, reseeding or new clock per frame.
- Every combination of packet envelope extrema keeps positive component weights
  summing to 1.8. Storm height remains bounded by 2.52. Analytical spatial/time
  derivatives include every phase, packet and storm contribution.
- Crest candidates have independently staggered rows, variable 32–58-unit gaps,
  and bounded normal offsets. They still locate supported compound maxima and
  sample the actual rendered water. The pool drops from 726 to 687 quads.
- Stable hashed cell diagonals replace the alternating checkerboard. Mesh
  indices and both water contact samplers share the exact diagonal choice.
  No vertex/grid density, boat art, wind/control tuning, camera behavior,
  dependency, domain or content change was introduced.

## Evidence

- 165 native tests pass (`native-tests.txt`), including multi-direction/scale
  recurrence, independent envelope extrema, analytical derivatives, deterministic
  resets/seeds, triangle parity, real hull/rail contact, storm, foam and sailing.
  The independent triangle test reads mesh indices rather than assuming parity.
- Strict build passes (`build.txt`): JS 592.23 kB / 159.63 kB gzip; CSS unchanged.
  The existing >500 kB chunk warning remains.
- `correlations.json`: Pearson recurrence over 18 angles, 22–100-unit offsets
  and five times falls from a strongest correlation of
  0.891 to 0.332.
  Cases over 0.7 fall from 253 to 0. This diagnoses recurring
  spatial motifs; it is not proof of subjective naturalness. Crosswind slope
  energy remains 0.418, preserving overlapping relief.
- Matched `before/` and `current/` captures include ordinary desktop, phone,
  storm and 0.55-zoom views at multiple timestamps. The wide view is an
  inspection-only camera override, not a shipped zoom feature. Before captures
  use the published correction. Final images show irregular long/short crest
  intersections instead of the repeated rows/checker pattern.
- `mesh-contact.json`: 1536 independent poses sample actual mesh triangles;
  outer deck clearance >= -0.06000004, central clearance >=
  0.11999999, 962 controlled rail dips. Existing hull
  safeguards and angle limits pass unchanged. The coarser rendered facets remain
  the contact authority, not the unmeshed analytic height.
- `world-checks.json`: real auto/manual trim, boost/spill, 30/60/120Hz integration,
  scanner handoff, contact spray, pause/hidden/reset/reduced motion and disposal
  pass. No runtime/shader errors; 59 draws, 34,978 triangles, 44 geometries,
  zero textures. The first run was interrupted by a Vite reload during edits;
  the complete rerun passed after sources were frozen.
- `checks.json`: six built-site layouts (1440×900, 390×844, 320×568, 360×915,
  844×390, 2560×1080), scanner travel/arrival, categories/focus, simultaneous
  touch, reduced motion and WebGL fallback pass with no console errors.
- `performance.json`: 400 interleaved updates per version after warmup in one
  Node/VM process: before median 7.14 ms / p95 11.81, after median
  11.89 ms / p95 19.10. More complex sampling costs CPU; vertex count
  stays 14,641 and crest geometry shrinks. Wall-clock VM results, with browser
  checks running, are not physical-phone frame-rate measurements.

Three Luna agents delivered the initial spectrum implementation, independent
pattern audit and shared hashed triangulation. Root strengthened phase bending
and the spatial/bounds regressions, made crest placement irregular, integrated
and visually reviewed both scales, and verified the complete sailing site.

## Publication

Application commit `2061e581` is published on `origin/master`; [Pages run 36222447849](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36222447849) succeeded for the exact SHA. Public HTML/JS/CSS/favicon match the tested build and public desktop/mobile interactions pass. See `public-assets.json` and `public/checks.json`. WEB-017 is Done and awaits user review. WEB-022 stays queued; WEB-016 harbours/zoom stays deferred.
