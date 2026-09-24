# WEB-010 / Phase 6 verification — 2026-09-24

## Release scope

Stronger boat–water interaction is implemented, published, and publicly verified at [http://leifcnp.com/](http://leifcnp.com/). Application commit `8544bb8f141d2f836654b3b9d763d5829bddd0e5` passed [Pages run 36072041419](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36072041419). Three Luna agents supplied the bounded wave force, hull response, and contact effects; root integrated, reviewed, corrected wave-time contact sampling and simulation-clock rounding, and verified the release.

The custom boat geometry remains unchanged. No imported models, textures, or art were added; see [provenance](../../ASSETS.md). The offshore storm stays in WEB-011 for review after this release.

## What changes

- Modest downhill swell forces act on freely sailing boats before braking and collision resolution. Forward/reverse thrust, rudder authority, speed limits, land clearance, and world bounds remain in force.
- Eight hull-aligned water supports give coherent buoyancy. Forward speed adds a small bow lift; turns add restrained outward heel. Reduced motion suppresses these extra dynamic cues and wave-driven drift.
- The existing 96-instance foam pool now splits contact around the bow and adds outer-turn wash. Emission strength follows the current surface velocity plus travel across its slope; no sprite or texture assets are used. Stopping decays foam; reverse suppresses forward wake.
- Scanner routes bypass wave forces and arrivals remain horizontally moored while reading. Helm input releases that hold. Reset/instant navigation clears effects and settles the pose. Pause and visibility suspension freeze active simulation time.

## Verification

- **52 native tests pass** across ten files, including wave derivative/slope agreement, finite extreme input, bounded surge/sway, brake authority, timestep partition, collision resolution, hull pose, and all previous navigation/input/data tests.
- Strict TypeScript and Vite build pass without dependency changes. Vite regenerated `docs/`; CNAME and `.nojekyll` are unchanged. The existing bundle-size warning remains (about 547 kB JS / 144 kB gzip), and does not fail the build.
- Source-world checks sampled **5,784 collision-safe states**, with identical 30/60/120 Hz trajectories after fixed-step rounding correction. Free neutral drift is restrained (about 0.36 world units in the initial five seconds). Animated/instant scanner arrivals, mooring and release, manual cancellation, hidden-tab pause/no catch-up, reset, reduced motion, and disposal pass.
- The actual vessel controller passes directional wave alignment at four headings/three times, damped heave, speed/turn cue suppression under reduced motion, finite invalid-time inputs, identical pose damping across frame rates, immutable snapshots, and exact-once resource disposal.
- The wake fixture ran 1,200 moving updates with turns. At most **58 / 96** slots were active; matrices stayed finite and resources stable. Stop/reverse/reduced-motion/reset paths clear or suppress foam and each GPU resource disposes exactly once. A separate contact check confirms both turning and wave time change foam output.
- Six desktop/mobile viewport checks cover **1440×900, 390×844, 320×568, 360×915, 844×390, and 2560×1080**. Canvas/UI fit, 44px controls, hit testing, accessible drawer focus/navigation, scanner replacement/cancellation, Explore/E, real simultaneous touch steering, paused/reduced-motion scanner access, fallback content, and console/script error checks pass.
- Integrated effects checks confirm paused matrices/pixels are frozen, reset/instant navigation clear trails, explicit reduced-motion sailing still suppresses foam, reverse has no false forward wake, and teardown removes the canvas/scene.

## Rendering and limits

Observed desktop rendering: 50 calls, 14,005 triangles; mobile viewport: 41 calls, 13,769 triangles. Both use 38 geometries and zero textures, unchanged from Phase 5. Sampled SwiftShader median/p95 frame intervals were about 64/133 ms desktop and 32/61 ms mobile viewport. These software-VM timings are diagnostics, not physical-phone performance or a 60 fps claim.

## Evidence

- [Production interface checks](checks.json)
- [World and scanner integration](world-checks.json)
- [Actual vessel pose/controller](pose-checks.json)
- [Wake lifecycle](wake-lifecycle.json) and [wave/turn contact](contact-checks.json)
- [Integrated effects and rendering measurements](effects-checks.json)
- [Build asset hashes](build-assets.json)
- [Exact-SHA deployment and public asset hashes](public-assets.json)
- [Public interface checks](public-checks.json)
- [Desktop sailing](sailing-desktop.png), [mobile sailing](sailing-mobile.png), [small-screen drawer](small-drawer.png)

Publication used the established `master` / tracked `docs/` Pages path. The exact-SHA deployment succeeded; public HTML, JS, CSS, and favicon match local output byte for byte, and the full public browser suite passes. No DNS/domain changes, Hugo files, dependencies, or third-party artwork are involved. WEB-010 is Done. Stop for sailing-feel review before WEB-011.
