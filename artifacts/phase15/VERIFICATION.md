# WEB-022 — Shipyard shoreline prototype

Date: 2026-11-07 (America/Vancouver). Pre-merge candidate: local native, quantitative and browser gates pass; final
exact-head/base review and remote delivery gates remain pending.

## Scope and provenance

Current master base `e92b7a9735a6ac15ccabaebf4520c5b72a00335c`;
branch `codex/WEB-022-shipyard-prototype`. Scoped existing source/tests were
copied from the original dirty checkout into managed web-022-shipyard. All 20
original changed/untracked files retain their pre-task hashes, recorded in
preserved-original-work.json. Their original design/images remain there;
this MR uses fresh evidence instead of undocumented historical captures.

Only Shipyard gets a matching decagonal submerged footing and directional
foam. No other island, collision/docking radius, wave/boat/wind/navigation model,
content, domain, dependency or CI configuration changes. Process-only changes
simplify context routing/templates; see PROCESS_REVIEW.md.

## Native and quantitative evidence

- Frozen install passed with Node 24.22.1 / pnpm 11.25.0 and the unchanged lockfile.
- Full native suite: 187 cases pass, no failures/skips/cancellations
  (native-tests.txt). Strict TypeScript/Vite production build passes (build.txt).
  JS 592.94 kB / 159.88 kB gzip; CSS unchanged. Existing >500kB advisory remains.
- validation.mjs is a reproducible fixture over 97 actual cached water snapshots,
  t=0..24 in 0.25s steps. validation.json records source SHA-256 values. Its
  headAtMeasurement is the initial base because the candidate was uncommitted;
  it is not a claim that the base contains the new source. Final hashes must match.
- Actual CylinderGeometry face planes give minimum normal clearance 0.199998876
  and corner gap 0.179998861 (Float32 tolerance around 0.20/0.18).
  Vertex lift is 0.039999575..0.040000384 above rendered triangles.
- 71 active / 26 quiet sampled frames; at most 4 active faces. Dock/leeward alpha 0.
  This is sparse/variable, not a full ring. Cached update median 0.01493ms,
  analytic fallback 0.10199ms in warmed 12×500 batches on this VM; excludes
  ocean/rendering and is not whole-site FPS or physical-phone performance.
- Fixed 100 vertices/80 triangles/one foam material/mesh; footing adds 40 triangles
  and one geometry, using the existing rock material. No textures or growing cache.
  Buffer identities, repeat/reset, reduced/empty behavior and idempotent disposal
  pass. Same final-time effect state matches 30/60/120Hz partitions.
- Surface interior limitation: 14 of 58,218 visible sampled points are below the
  faceted water, worst -0.00969 at alpha 0.0369; maximum lift 0.07907. This arises
  where strip triangles cross ocean facets. Keep depth testing; actual visual
  significance is reviewed in browser images before acceptance.

## Browser evidence

browser-checks.json links six passing runs and 35 SHA-verified images. Chrome
151.0.7922.34 / WebGL2 ANGLE SwiftShader ran the unmodified production bundles.
Baseline served bytes match base docs; candidate bytes match the generated build.
The working-source hashes bind the uncommitted candidate; the base SHA alone does
not identify it. Exact provisioning/reproduction commands are in that summary.
The browser binary is temporary under /tmp; no package or OS/global changes.

Matched desktop, phone and wide captures at t=23 show sparse pale contact absent
from the baseline. Quiet t=4/t=8 frames have no permanent ring. Root and the
separate reviewer inspected the normal desktop frame and paired unscaled clips;
dock/label remain clear. The paired phone-dock-t=23 view uses actual pause,
scanner and resume controls with the normal follow camera to show the shoreline.
Phone spawn framing clips Shipyard at the edge, identically in the baseline.

The corrected 15-group functional suite passes motion/pause/resume, keyboard
steering, exact reset scene pixels/labels, all categories, actual Shipyard scan
arrival/manual handoff, six viewport drawers/44px targets/overflow, initial/live
reduced motion, synthetic visibility suspension/resume, WebGL fallback and
console checks. Only deliberately denied WebGL produces the expected error.

Fixture limits: manually stepped rAF preserves all app CPU callbacks; active
captures skip intermediate draw calls symmetrically, then fully render the
actual final frame. There is no GPU simulation feedback. No performance claim
comes from these captures. Visibility events are synthetic; physical phone GPU,
prolonged GPU lifecycle and cross-browser behavior are not measured.

Fixture corrections addressed HUD hover/fade pixels in canvas screenshot hashes,
missing redraw after controlled-rAF resize, and software GPU queue pressure.
Contextual captures remain separate from isolated scene hashes. None required a
product-code workaround. See PROCESS_REVIEW.md for process lessons.

## Independent review and delivery

A separate non-author Sol 6.1 reviewer has checked source/process so far without
blocking findings; final committed-head/base approval remains external to its
own commit. Full verify/generation freshness, hosted CI, strict protection,
protected squash MR merge and resulting-SHA CI/Pages/public asset/interaction
verification remain required. No wider shoreline rollout is assigned.

## Published Shipyard release

MR #9 squash merge `907673941072e59335e9f16e5de97b393c575d53` has the exact reviewed
candidate tree. Exact-SHA CI run 42448864347 and Pages 42448864190 pass; four public
assets match and desktop/phone motion/helm checks pass. The user subsequently
assigned remaining islands and WEB-016; see the current task/rollout ledger.
