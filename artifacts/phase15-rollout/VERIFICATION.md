# WEB-022 remaining-island shoreline verification

Base `907673941072e59335e9f16e5de97b393c575d53`; candidate working-source hashes in
validation.json and browser-checks.json bind the measured uncommitted source.
headAtMeasurement records the checked-out base, not a claim it contains rollout.
Final exact-SHA review remains outside its own commit, on the MR.

## Implementation and checks

One aggregate fixed foam geometry/material/mesh has 400 vertices/320 triangles and
Uint16 indices for 4 input-order profiles. Chartroom/Logbook/Signal Cove gain the
matching decagonal submerged foundation; Shipyard preserves its only dock gap.
Waves, water grid, vessel/input/camera, routes, content and dependencies unchanged.

Frozen-lockfile install passed. Root integration: 189 native tests, strict
production build pass. Final clean committed-candidate `pnpm run verify` and
hosted required CI remain release gates. Generated bundle: index-CxlYBWZO.js;
CNAME/.nojekyll and relative asset paths preserved. Independent reviewer also
ran 19 scoped tests and diff whitespace checks successfully.

## Quantitative evidence

Run `node artifacts/phase15-rollout/validation.mjs` with the verified project
Node runtime. The report covers 97 actual rendered-grid snapshots t=0..24 at 0.25s.
All 4 islands preserve approximately 0.20 face/0.18 corner minimum gaps within Float32
tolerance; dock mask only Shipyard; leeward alpha 0. Lifecycle/reset/reduced/empty,
30/60/120 Hz partitions, fixed-buffer references and idempotent disposal pass.
Cached update median 0.06111 ms, worst warmed batch 0.07742 ms; analytic fallback median
0.40105 ms. These exclude ocean updates/rendering/allocation and are not FPS claims.

Sampled foam interiors deviate from water facets:

| Island | Height difference | Visible samples below water |
| --- | --- | --- |
| Logbook | −0.10210 to +0.11364 | 1.35% |
| Chartroom | −0.01918 to +0.10976 | 0.208% |
| Signal Cove | −0.02471 to +0.07226 | 0.183% |
| Shipyard | −0.00969 to +0.07907 | 0.024% |

Depth testing hides submerged fragments.
Root and browser QA inspected normal desktop/phone Logbook t=0.25 s worst-phase views:
no obvious hovering, land overlap or distracting hole. Small water-edge occlusion
is visible. Numeric evidence does not imply exact interior facet coincidence.

## Browser evidence

browser-checks.json and its reproducible fixture bind unmodified production
HTML/JS/CSS bytes and 8 matched active 11.75s/quiet 8.25s desktop/phone images. Two
additional Logbook risk views record the measured worst phase. Full normal
camera/scanner framing is preserved. Phone comparisons use actual paused instant
Chartroom scanner framing; actual animated arrival checks separately reach all
3 new islands. Labels/docking areas remain clear; quiet views have no permanent
ring. No new product hooks or input fixes were introduced for the harness.

All 10 functional groups pass: motion/pause/resume, actual W/repeatable reset,
3 animated scanner arrivals/explore prompts, phone resize/drawer/44px controls,
live reduced-motion freeze/all scanner destinations and all fallback categories.
No unexpected console errors; deliberately denied WebGL emits its expected error.
Initial reduced-motion behavior is unchanged and relies on source inspection and
the preceding Shipyard prototype evidence; this rollout fixture switches it live.

Fixture manually steps application rAF callbacks, skips intermediate raster only,
and renders final frames normally; exact final fractional steps retain selected
phase. VM Chromium 151/SwiftShader is not physical-phone GPU or cross-browser
performance evidence. Local browser results do not establish publication.

## Delivery gates

Separate non-author Sol 6.1 exact head/base review, clean final verify, required
hosted CI and protected squash merge, then matching merge tree, exact-SHA CI/Pages,
public asset equality and focused live interactions. Carry verified completion
into assigned WEB-016 MR; no extra per-stage paperwork MR. All 20 original changed
files remain preserved; recheck their recorded hashes at release.
