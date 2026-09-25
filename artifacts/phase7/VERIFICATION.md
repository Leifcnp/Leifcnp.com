# WEB-013 / Phase 7 — waves and wake verification

Date: 2026-09-24. Node 24.19.0, pnpm 11.19.0, Chromium 151.0.7922.34.
Three Luna agents implemented bounded water, hull, and wake packages; root integrated, reviewed visible motion, corrected defects, and ran the checks below.

## Visible change and implementation

- The previous vertex colors were static and the long low swells were difficult to read at the existing camera distance. The new indexed surface animates trough/crest colors with four travelling wave components and sparse short crest accents. The primary swell has a 30-unit wavelength and 5.8-second period; the total mathematical amplitude bound is 1.8 units.
- Hull support previously divided six total sample weights by eight, reducing heave to 75%. Correct normalization and separate heave/tilt smoothing keep the original custom hull in contact with the stronger shared field. Opposing wave faces add bounded speed-sensitive resistance during powered forward sailing.
- Two continuous wake strips follow 32 samples of actual travelled path, with alpha fade and width taper. A sampled bow arc and the existing 96-instance foam pool react to speed, turning, and wave encounter. All effects share the water sampler. These are authored visual/kinematic effects, not a fluid simulation.
- The custom boat art, dependencies, controls, scanner/content behavior and custom-domain metadata are preserved. Storm, wind propulsion, tighter rudder turning, translucent drawers and submenu harbours remain deferred.

Root rejected overly broad pale highlights, black wake tails, inactive history joining the origin, a detached bow arc, periodic crest teleporting, and duplicate shader declarations. Final screenshots and the browser console check reflect the corrected version.

## Normal-camera visual evidence

[Baseline frames](baseline/motion.json) and [final frames](final/motion.json) use controlled 30 Hz simulation: neutral at 0/1/2 seconds, then three seconds forward and 1.5 seconds forward/right. Compare [before](baseline/rest-0.png), [after at 0s](final/rest-0.png), [after at 1s](final/rest-1.png), and [turning wake](final/sailing-turn.png). The [final portrait view](final/sailing-mobile.png) retains a readable hull and curved wake. The invalid baseline mobile resize capture was discarded; baseline comparison is desktop only.

## Checks

- `pnpm test`: **61 individual tests**, 11 files, zero failures. Covers shared sampler/derivatives, indexed surface agreement, long-session crest coverage and continuity, weighted heave, finite bounded forces, uphill response at full throttle, braking, collision safety and legacy navigation/input/camera behavior.
- `pnpm run build`: strict TypeScript and Vite production build pass. The existing >500 kB chunk warning remains: final JS is 556.21 kB / 146.90 kB gzip. No dependency change. Generated CNAME is `leifcnp.com`; `.nojekyll` is retained.
- [World integration](world-checks.json): exactly matching 30/60/120 Hz trajectories; 5,784 finite, collision-safe samples; neutral drift; pause/resume without catch-up; hidden-document suspension; all four scanner arrivals held safely alongside islands; manual release/cancellation; reduced-motion suppression and idempotent disposal.
- [Actual hull contact](contact-trajectory.json): eight-second forward/turn paths at 30/60/120 Hz sample every transformed hull/deck frame. Every frame retained a submerged hull point and dry deck. Minimum deck freeboard across these paths: 0.265 units. Heave span: approximately 2.92 units; maximum tilt: 0.218 radians. This verifies these representative paths, not every possible ocean pose.
- [Wake lifecycle](wake-checks.json): 1,200 updates with finite stable buffers, no origin tether, real vertex-alpha fade, pause freeze, stop fade, reset/reduced-motion clear, and seven owned resources disposed once. Peak 65 of 96 foam slots. Wake strips: 124 triangles; bow arc: 34 triangles.
- [Production browser checks](checks.json): six viewports (1440×900, 390×844, 320×568, 360×915, 844×390, 2560×1080); all categories/drawer content/focus; navigation replacement and manual cancellation; E/Explore arrival; real simultaneous touch; 44 px targets; reduced motion and WebGL fallback. No script or console errors in WebGL mode.
- [Rendered effects checks](effects-checks.json): corrected crest shader compiles in the browser; pause freezes pixels and matrices; reset/instant scanner placement clears effects; reverse/reduced motion suppress forward wake; scene/canvas teardown succeeds.

## Measured cost and limits

| Viewport | Draw calls | Triangles | Geometries | Textures | Median / p95 frame interval |
| --- | ---: | ---: | ---: | ---: | --- |
| Desktop 1440×900 | 55 | 33,021 | 41 | 0 | 172.2 / 423.2 ms |
| Portrait 390×844 | 47 | 32,785 | 41 | 0 | 29.5 / 154.7 ms |

These short timing samples are software SwiftShader inside VirtualBox at DPR 1. Desktop rendering is slow in this VM; this is not a physical-device frame-rate claim. The previous phase recorded 14,005 desktop triangles, 50 calls and 64.2 ms median in its VM run. The denser water has a real geometry cost and should receive external GPU/mobile feedback before further visual complexity. Resources remain bounded; no textures or per-frame GPU allocations were added.

## Publication

Application commit `742a4d420ed5b875afbeefc24c3cbf450bd814e8` is published on `origin/master`. [Pages run 36076016317](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36076016317) completed successfully for that exact SHA. Public HTML, JavaScript, CSS and favicon all returned HTTP 200 and matched `docs/` byte for byte; see [asset hashes and deployment evidence](public-assets.json). The complete [public browser suite](public-checks.json) passed on [http://leifcnp.com/](http://leifcnp.com/), including all six layouts, touch, scanner/content/focus, reduced motion and fallback. No WebGL script or console errors.

WEB-013 is Done and awaiting user review. No DNS, certificate, or GitHub Pages settings changed. The known HTTPS certificate observation remains WEB-001; use the explicit HTTP link for this review. Storm and other future tasks remain Backlog.
