# Wave performance batch — 2026-11-07

User assigned WEB-024 only; unchanged water and careful coexistence with WEB-016.
Base `812e02fc2517d02165241289f31ea58a644e4fc0`; branch `codex/WEB-024-wave-performance`; managed `wave-performance/Leifcnp.com`. Shared worktree with exclusive paths. Root integrates and owns Git/dependencies/build/generated docs/queue/plans, browser/compatibility scripts, reports/screenshots and final verification record.

| Agent / model | Exclusive ownership | Status |
| --- | --- | --- |
| wave_implementation / gpt-6.1-sol | src/world/waves.ts, src/world/createOceanSurface.ts, tests/waves.test.ts | Candidate6 implemented; scoped tests pass |
| wave_validation / gpt-6.1-sol | artifacts/wave-performance benchmark/parity scripts and measurements (except VERIFICATION.md) | Exact parity + repeated Chromium measurements complete |
| wave_review / gpt-6.1-sol | Read-only review; external /tmp report | Interim audits clear; exact-head review after MR creation |

Root respects the other team's shoreline/harbour changes; the shared sampler APIs and world topology stay stable. No editing their worktrees. Latest base already includes MR #10 all-island rollout; inspect new master/harbour diff before merge. Separate-review verdict remains outside its reviewed commit.

Evidence: [verification](../../artifacts/wave-performance/VERIFICATION.md). Repair rounds 0. Next: parity/performance gates, full checks, matched views, target-base reconciliation and protected MR delivery.

Final implementation uses a spatial projection and one per-controller output record; original APIs/noise are unchanged. Micro candidates without reproducible improvement were discarded. Candidate6 has three paired Chromium improvement intervals below zero and exact output parity; Node/control bias is disclosed. Root production frames and combined WEB-016 source snapshot checks pass. User steering requests an open MR + separate Sol review + mergeability, without merge/publication. Final clean verify/CI/head-base review follow the candidate commit.
