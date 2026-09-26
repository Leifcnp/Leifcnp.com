# WEB-019 review — remove white wind streams

2026-09-25. Published and publicly verified.

## Requested and delivered

The user finds the over-water wind ribbons confusing with wave crests and
requests removal. Luna removed all creation/update/reset/reduced-motion/disposal
calls, the unused effect module and its five dedicated tests. Root verified,
updated documentation and prepared publication. The physical wind/sailing model,
flags, masthead pennant, HUD, wave crests, wake and hull spray are unchanged.
No wave parameters, topology, content, camera, dependencies or domain changed.

## CPU explanation

The previous paired VM benchmark (`../phase14-pattern/performance.json`) recorded
water-update medians of 7.139894 ms before and 11.887481 ms after the stronger
wave-pattern correction: +4.747587 ms / +66.49%. p95 changed 11.81 to 19.10 ms.
It measured the water update routine in Node while browser checks were active,
not overall CPU utilization, whole-site FPS or physical-phone performance.
The more complex wave sampler uses eight rather than four components and four
rather than two smooth fields. The triangle change retains the same vertex and
triangle counts. This task removes the wind-stream CPU updates and one draw;
it does not claim a measured overall speedup or retune the water calculation.

## Controlled visual comparison

`triangle-comparison.png` renders identical current wave heights at t=0 with
the same camera, lighting, colours and material. Only mesh index diagonals
change: previous row/column parity on the left, current fixed hashed choice on
the right. Water crest ribbons are hidden in both panels to isolate the surface.
The diagrams show a top-down sample of each mesh's diagonal rule. There is no
checkerboard texture; repeated triangular facets produce the lighting pattern.
`comparison.html` is the source and allows t=0/2/27 inspection through the local
Vite server. It is not an entry in the published app or a new camera feature.
The final preview loads without console errors (an initial missing favicon was
fixed). The scene/waves shown are actual Three.js output, not a generated mockup.

## Checks and resources

- 160 remaining native tests pass (`native-tests.txt`). The count drops from
  165 because five tests exclusively covered the deleted wind-stream effect.
- Strict typecheck/build passes (`build.txt`). JS 589.64 kB / 158.70 kB gzip;
  unchanged CSS and preserved CNAME/.nojekyll. Existing >500 kB warning remains.
- `scene/motion.json` verifies no wind-stream scene object, with wave crests,
  wake, spray, masthead and land flags retained. Desktop/phone captures are
  included. Pause/reduced motion, reset, instant scanner, resume and disposal
  complete without errors. Rendering drops from 59 to 58 draws, 34,978 to
  34,882 triangles, and 44 to 43 geometries; textures remain zero.
- No live source or test references to the deleted stream implementation remain.
- Browser checks use Chromium/SwiftShader in the VM, not a physical phone.

## Publication

Application commit `9a156695` is published on `origin/master`; [Pages run 36223010394](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36223010394) succeeded for the exact SHA. Public files match the tested build, and public desktop/mobile interactions pass. See `public-assets.json` and `public/checks.json`. WEB-019 is Done. Stop for user review; water settings, shorelines and harbours are unchanged.
