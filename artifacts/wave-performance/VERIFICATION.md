# WEB-024 wave performance — verification

Verified locally on 2026-11-07. User delivery is an open MR for review, with a separate Sol reviewer and passing mergeability checks; no merge/publication is part of this handoff. WEB-024 remains In progress until later delivery is authorized.

## Change and exactness

Baseline `812e02fc2517d02165241289f31ea58a644e4fc0` includes the published four-island shoreline rollout. Production changes are limited to `waves.ts` and `createOceanSurface.ts`: add a spatial-only projection and reuse one ocean-owned result record. This avoids calculating unused temporal derivatives and allocating 14,641 result records per ocean update. Existing height, phase, full analytic/finite-difference surface and noise implementations, canonical tuning, clocks, topology, contact paths, buffers and render counts are unchanged. The duplicate spatial arithmetic is intentional and covered by projection tests. No cache or new clock was added.

The independent Git-oracle harness passes **1,272,078 exact Object.is comparisons**, including signed zero/NaN semantics, arbitrary seeds, extreme coordinates/times, cell/storm boundaries, both derivative modes, mixed call order, target identity/result lifetime and complete ocean/crest arrays. See [parity](candidate6-parity.json); source SHA-256 values bind this evidence to the candidate. Three new native tests cover projection/storage/interleaving/storm edges.

## CPU result

Chromium 151.0.7922.34 in this Ubuntu VM; warmed alternating AB/BA, 40 rounds, six real complete ocean updates per timed batch. Values below are milliseconds per update; paired changes compare each round, so they differ from a ratio of unpaired medians.

| Run | Base median ms | Candidate median ms | Paired median change | Descriptive 95% interval |
| --- | ---: | ---: | ---: | --- |
| 1 | 8.417 | 8.133 | -3.67% | [-4.17%, -2.58%] |
| 2 | 9.233 | 8.917 | -4.84% | [-5.36%, -2.49%] |
| 3 | 9.233 | 8.850 | -4.11% | [-6.71%, -1.20%] |

The byte-identical baseline browser control is −0.18%, with an interval spanning zero. Public scattered hull/contact timings have no material regression here; browser p95 varies −4.72% to +4.92%. Ocean p95 is noisy (including +3.24% in one repetition): **no guaranteed p95 improvement**. Node results are mixed, and an identical-code Node control itself has bias. No calibration subtraction, broad Node speedup, overall FPS/GPU or physical-device claim. This is a modest, repeatable browser ocean CPU reduction around 4%. Full distributions, hashes and limits: [summary](candidate6-summary.json), [reproduction commands](BENCHMARK.md).

## Build and production behavior

- Frozen locked install, **192/192 native tests**, and strict TypeScript/production build pass: [native log](native-tests.txt), [build log](build.txt). Final clean-tree `pnpm run verify`, hosted CI and exact-head reviewer verdict are recorded on the MR after the candidate commit, so they do not change the reviewed head.
- Six matched production frame pairs at desktop 1440×900, phone 390×844 and wide 2560×1080, phases 8.25/11.75 seconds, are **byte-identical PNGs** (12 captures). Both served production bundles are verified against original Git docs/current built docs; fixed callback stepping preserves simulation/camera while skipping intermediate raster draws. Root visually inspected normal/phone/wide captures.
- Actual motion/pause/resume, trusted W and reset repeatability, scanner arrivals/content, phone resize/drawer/touch-target fit, reduced-motion static scene/category access and forced WebGL fallback pass, with no unexpected console errors. [Browser report](browser-checks.json), [reproducible harness](browser-check.mjs).
- Original CNAME/.nojekyll, asset paths, renderer meshes and disposal/lifecycle contracts stay intact. Bundle size: 593,087 → 594,428 JS bytes; gzip 158,366 → 158,683 bytes. No dependencies changed.

## WEB-016 compatibility

The concurrent harbour team currently owns content, camera, HUD/main/styles, world integration and new harbour markers. Its markers sample the already-updated rendered ocean buffer; original water APIs and ocean-before-foam/marker update order remain stable. This change edits neither their source files nor their worktree.

A stable-hash snapshot of ten current harbour source/test paths was overlaid on the wave candidate in a temporary checkout-equivalent. **205/205 combined native tests and strict build pass**: [snapshot provenance](harbour-compatibility.json), [tests](harbour-native-tests.txt), [build](harbour-build.txt). This is integration evidence for that specific work-in-progress snapshot, not approval of harbour behavior. Target-base SHA and any newer source overlap must be rechecked with the final MR; shared queue/generated-output changes are reconciled by the integration owner.

## Handoff and limits

Open MR, final head/base, hosted checks, independent **gpt-6.1-sol** verdict and mergeability are the remaining review-ready gates, recorded outside their reviewed commit. Leave the MR open per the user's latest request. Source changes have no wave tuning or approximation tradeoff. Browser graphics use SwiftShader; no physical-device, real hidden-tab browser or live deployment claim is made.
