# WEB-017 — Varied incoming wave sets with a common direction

## Authorization and result

Selected as Phase 14 on 2026-09-25: “ok go for next todo” after the verified
Phase 13 wind-cue release. Complete and publish this one phase through the
existing master/docs workflow, then stop for review. WEB-022 shorelines stays
queued; WEB-016 harbours/zoom stays deferred.

Visitors should see an uneven sequence of larger and smaller swells arriving
from the windward side, with the original boat rising, pitching and leaving
foam on that same surface. Variety must remain smooth and repeatable.

## Model and contracts

- Prefer a small fixed-seed spectral sum over a new fluid solver or stateful
  random spawner. Approximately six incommensurate components create varying
  set heights, spacing and arrival times. All propagate toward world −X,
  aligned with true wind, with at most five degrees of lateral spread to
  retain natural faceting. No crossing/opposing swell trains or frame noise.
- Keep the theoretical height bound at 1.8 world units, 2.52 in full storm.
  Preserve height, finite-difference slope, analytic vertical-velocity and
  storm-gradient contracts. Derivatives must describe the same height field.
- Preserve the current wind/control model, inward storm return, hull geometry,
  20° sail heel, 0.4 rad combined heel and actual deck/rail support guards.
- The existing 121×121 water lattice remains. The renderer, force sampler,
  faceted hull contact, spray and wake consume one function and simulation
  clock. Crest accents follow the compound surface rather than a stale
  crossing-wave phase. Keep them sparse, tapered and continuous.
- Fixed geometry/effect capacity, no extra RAF, remote assets, dependencies,
  weather service or per-frame random allocation. Pause/hidden freezes,
  reset repeats, reduced motion and scanner access remain intact.

## Team and bounded deliverables

1. Luna wave-model agent owns `src/world/waves.ts` and `tests/waves.test.ts`:
   deterministic components, shared direction/phase API, multi-minute
   variation and derivative/direction/bound checks. Coordinate the crest API
   before removing any exported function.
2. Luna crest agent owns `src/world/createOceanSurface.ts` and
   `tests/oceanSurface.test.ts`: shared compound-crest support/placement,
   fixed buffers and continuity/long-time/visible-surface checks.
3. Luna audit agent captures the pinned Phase 13 (`72a9d476`) baseline and
   reviews changed height statistics, propagation, force/contact consumers
   and cost. Read-only source ownership; temporary scripts under `/tmp`.
4. Root owns integration, any justified shared-consumer fixes, docs/TODO,
   actual browser motion and release. Never weaken historical contact tests
   simply because the new waves exercise a difficult hull position.

## Verification and review gates

- Compare at least three minutes of incoming sets: crest amplitude and
  inter-crest intervals, common propagation direction and deterministic
  repeated sampling. Compare maximum/RMS height, slope and vertical speed
  against the published field and explicit safety bounds.
- Run strict types and the full native suite, including existing actual-hull
  contact, rail/deck, storm/navigation, steering, wake/spray and wind tests.
  Check numerical space/time derivatives and coarse/fine update equivalence.
- Review paired normal-camera desktop/mobile frames across several times,
  both tacks and offshore water. Inspect real water triangles against the
  original hull and crest placement, not analytic height alone.
- Verify shared-clock pause/resume/hidden/reset/reduced behavior, scanner
  mooring/manual handoff, accessible content, six responsive layouts and
  fallback. Measure matching-scene draw/triangle/geometry counts; no growth.
- Build tracked `docs/` with unchanged CNAME/.nojekyll, inspect the diff,
  commit/push focused code and output. Require successful Pages for that
  exact application SHA, byte-matching public assets and public desktop/
  mobile interactions before marking Done. Record physical-phone limitations.

## Acceptance

Incoming sets differ recognizably in size and timing, and arrive from one
readable prevailing direction. No jitter, opposing train, detached crest foam,
unbounded force or resource growth. The original boat and existing sailing,
calm/storm, contact, navigation and accessibility contracts remain credible.
Stop after this release for user review.

## Local implementation and evidence

Six fixed-phase components preserve the primary 30-unit/5.8-second swell, with
secondary periods 4.6, 6.8, 3.5, 2.7 and 8.9 seconds and direction spread within
4.42° of −X. Amplitudes total 1.8. Compound crests use a bounded scalar search,
both-shoulder prominence, and fade before search limits; cached water vertices
keep foam on the visible triangles without resampling every wave per corner.

Root review corrected the primary phase offset, strengthened real crest and
multi-minute wave tests, removed redundant/inactive crest calculations, and
added a 3 rad/s visual tilt-rate limit for a storm tack exposed by the new
field. No hull geometry, horizontal force tuning, controls or wind changed.
A historical force fixture now follows/opposes the actual incoming direction
away from the world boundary. Storm derivative checks explicitly request the
small sample distance instead of comparing a broad secant to an infinitesimal
derivative. Existing hull clearances and continuity thresholds remain intact.

Local tests/build, hull/triangle and source-world checks pass. Publication and
public verification are complete; WEB-017 is Done.
See [Phase 14 verification](../../artifacts/phase14/VERIFICATION.md).

## Release

Application commit `cb100d62` is published on `origin/master`; [Pages run 36220109782](https://github.com/Leifcnp/Leifcnp.com/actions/runs/36220109782) succeeded for the exact SHA. Public HTML/JS/CSS/favicon match the tested build, and public desktop/mobile sailing/scanner/content/fallback checks pass. Stop for user review; shoreline work remains queued and harbours remain deferred.
