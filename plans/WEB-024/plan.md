# WEB-024 — Optimize wave sampling without changing the water

- Assigned: 2026-11-07. User requests a separate-worktree team, unchanged wave appearance/behavior, and careful integration with concurrent WEB-016. Small overlap is acceptable when reviewed.
- Status: In progress.
- Base: `812e02fc2517d02165241289f31ea58a644e4fc0` (includes the published all-island shoreline rollout).
- Branch: `codex/WEB-024-wave-performance`; managed worktree `wave-performance/Leifcnp.com`.
- Scope: CPU optimization inside the existing deterministic sampler; no wave tuning, topology, clock, rendering resolution, dependency or physics changes. Existing public sampler signatures and exact outputs remain stable; one additive spatial-only sampler serves the ocean.
- Dependencies: WEB-016 camera/harbours consume the existing world-space water and rendered-contact APIs. Preserve these; inspect/reconcile target-base changes before final review and regenerate docs only after integration. Root owns shared records/build/Git.

## Acceptance

| ID | Required outcome | Evidence |
| --- | --- | --- |
| AC1 | Identical height, analytic/finite-difference slopes, velocity, phase and noise outputs across seeds, coordinates, times, invalid input, cell/storm boundaries and evaluation order | Independent baseline parity plus existing native regressions |
| AC2 | Repeatable CPU reduction in warmed interleaved real ocean updates; no material p95 or scattered-contact regression | Reproducible Node/browser benchmark with baseline/candidate hashes, distributions and environment |
| AC3 | Unchanged normal/wide/phone water, hull/crest/shoreline contact, render counts, lifecycle and fallback | Matched production scene comparison and browser checks |
| AC4 | Fixed memory, deterministic synchronous sampling, no growing cache or external state/clock; no API or tuning changes | Tests and separate review |
| AC5 | Integrates current master/WEB-016 dependencies safely; strict full verification and generated/domain output pass; open MR has separate Sol review and is mergeable | Reviewed exact head/base, hosted CI, conflict/mergeability state; leave MR open |

## Delivery

Evidence: [artifacts/wave-performance/VERIFICATION.md](../../artifacts/wave-performance/VERIFICATION.md).
Latest steering: user asks for an MR, a Sol subagent review and mergeability; leave the MR open.

Local evidence passes: ~4% repeated Chromium paired ocean CPU reduction, 1,272,078 exact comparisons, six byte-identical production frame pairs, 192 native cases/build, and 205 combined harbour cases/build. No Node/FPS or physical-device claim.

Repair rounds: 0. Next: commit intended output, run clean-tree verify, open MR, obtain exact-head/current-base Sol review and passing CI/mergeability. Do not merge/publish in this handoff. Stop after review-ready delivery.
