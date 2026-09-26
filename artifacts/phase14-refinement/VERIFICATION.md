# WEB-017 correction — Earlier water character with smooth variation

Date: 2026-09-25. Published and publicly verified.

## User feedback and delivered correction

The user rejected Phase 14's long parallel bands and preferred the previous
water's overlapping pattern and feel. Their clarification allows some linear
wave fronts and asks for added structured complexity without fresh random
motion every frame. This corrects WEB-017; it does not advance to shorelines.

- Restored the exact original four base wave directions, wavelengths, periods
  and amplitudes from `72a9d476`. The main swell dominates; smaller crossing
  waves recover the old broken/interfering shapes.
- Two small fixed-seed smooth spatial fields gently bend phase and redistribute
  packet weights. Values come from integer lattice hashes and quintic
  interpolation, advected through the world. No per-frame random draws,
  textures, new RAF or growing cache. Shared scratch storage avoids allocations
  for the two noise samples. All component weights stay positive and sum to
  1.8; full storm remains bounded by 2.52.
- Exact chain-rule phase/packet/storm gradients and vertical velocity drive
  the same height function. Default samples use these analytical derivatives;
  explicit positive distances still return exact finite-difference slopes.
  The hull, wake, spray and crest mesh remain synchronized with visible water.
- Crest accents now have stable varied positions/lengths/widths, still finding
  nearby compound maxima and reading the existing rendered vertex buffer.
- Fixed a real spray bug discovered during review: bow/rail launch height was
  sampled before assigning the particle's new Z, so a reused pool entry could
  sample its old location. Both coordinates are now assigned first.
- No boat model, control or horizontal-force tuning, domain setting, dependency,
  harbour, zoom or shoreline feature changed. Original artwork remains owned.

## Verification and cost

- 162 native tests and strict production build pass (`native-tests.txt`,
  `build.txt`). Coverage includes seed determinism and alternate fields,
  noise-cell continuity and gradients, all phase/envelope/temporal derivatives,
  original hull/contact/rail/steering/storm tests, crest shoulders/continuity,
  and spray launch/reentry through pool reuse. A former spray fixture assumed
  water rose at 0.5s; it now observes an actual trough and rising surface,
  testing water reentry before particle lifetime can expire.
- Existing 9,968 actual hull/contact frames retain unchanged limits. An
  independent 1,536-pose triangle oracle gives minimum rendered outer deck
  −0.06000005 and central working area +0.17448, with 937 actual rail dips
  (`mesh-contact.json`). Actual rendered facets remain the contact authority.
- `world-checks.json`: real WASD, auto/manual trim and boost/spill, scanner
  handoff, 30/60/120Hz trajectories, contact spray, wave/crest pause/hidden/reset/
  reduced-motion and disposal pass without runtime/shader errors.
- Matched ordinary-camera desktop/phone images under `current/` restore the
  old broken water appearance. `rejected/` captures the striped release;
  the earlier approved-look comparison remains in `../phase14/baseline/`.
  Comparison captures use route-only inspection hooks and a controlled clock;
  these are not shipped.
- `spatial-comparison.json` / `independent-audit.md`: crosswind slope energy
  is 0.3534 corrected, 0.3519 original, 0.00134 rejected. Cross-Z correlation
  at 20/30/40 units changes from 0.987/0.969/0.946 in the bands to
  −0.051/−0.457/−0.818, close to the old interference pattern. Numeric checks
  guard against banding; they do not prove subjective realism.
- Alternate seed changes all 961 sampled heights at t=37 (mean absolute
  difference 0.2507). It is a real deterministic field, not merely an animated
  uniform offset. Sampled height range −2.359 to +2.343, maximum slope 0.4441
  and vertical velocity 2.8284 remain bounded in the 180-second audit.
- Water stays at 14,641 vertices. Crest quads return to the old 726, with
  fixed geometry. Three-minute 10Hz review finds no jumps over eight units;
  max visible center step is 1.45 units. Native tests additionally check actual
  field crest slope and both shoulders at shorter steps.
- CPU water update: 5.474 ms median / 6.067 ms p95 versus the original
  3.895 / 4.276 in separate Node/VM measurements (`ocean-current.json`,
  `ocean-baseline.json`). This is modest absolute overhead, not free work.
  It is not a physical-mobile frame-rate claim. Matched browser resources:
  59 calls, 35,056 triangles, 44 geometries, zero textures, equal to Phase 13.
- Final JS 590.15 kB / 158.99 kB gzip; CSS 13.67 / 3.60. The existing
  >500 kB bundle warning remains. No dependency/texture was added.
- Luna agents implemented the smooth noise helper, varied crest slice and
  independent spatial/cost audit. Root integrated derivatives, strengthened
  spatial/contact regressions, fixed spray and reviewed browser output.

## Publication and review boundary

Application commit `b5b619a5` is published on `origin/master`; [Pages run 36221055155](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36221055155) succeeded for the exact SHA. Public HTML, JavaScript, CSS and favicon match the tested build (`public-assets.json`). Six final production viewports and the unmodified public desktop/mobile site pass sailing/trim, scanner travel/arrival, content/focus, simultaneous touch, reduced motion and WebGL fallback without script/console errors (`checks.json`, `public/checks.json`). WEB-017 is Done. Stop for user review; WEB-022 stays queued and WEB-016 harbours/zoom stays deferred.

Browser evidence uses Chromium/SwiftShader in the Ubuntu VM. Layout and touch
coverage does not replace performance/feel testing on a physical phone.
