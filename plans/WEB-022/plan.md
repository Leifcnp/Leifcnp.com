# WEB-022 — Shipyard shoreline prototype

Assigned 2026-11-07: finish the existing shoreline work, limited to Shipyard,
independently review, then merge and publish through the MR workflow. Observe
this first team run and make small, evidence-based process improvements. Prefer
minimal context/instructions; no wider shoreline rollout or harbour work.

- Status: In progress; implementation/verification pending.
- Base: `e92b7a9735a6ac15ccabaebf4520c5b72a00335c`.
- Branch: `codex/WEB-022-shipyard-prototype`.
- Worktree: managed `web-022-shipyard/Leifcnp.com`.
- Existing work: scoped source/tests and Phase15 evidence copied from the original
  dirty checkout; its 20 changed/untracked files remain untouched.

## Scope and acceptance

| ID | Required outcome | Evidence |
| --- | --- | --- |
| AC1 | Normal-camera Shipyard waves visibly meet a sparse, directional shoreline cue; no constant ring | Matched baseline/candidate frames at known times, desktop/phone/wide |
| AC2 | Exact decagonal footing stays inside radius 6 collision circle; foam outside actual faces by at least 0.20, corner/dock gaps | Geometry tests and deterministic surface measurements |
| AC3 | Use existing shared clock/waves and rendered ocean triangles; preserve all wave/boat/navigation/content contracts | Source diff, cached-buffer contact checks, native regressions, actual scanner/helm checks |
| AC4 | Pause/hidden freeze; reset repeats; reduced motion hides foam; empty scene and repeated disposal safe | Scoped tests plus browser lifecycle/fallback checks |
| AC5 | Fixed buffers/material/mesh, no textures/growing cache; bounded resource/CPU delta | Reproducible warmed measurement, renderer observation and limits |
| AC6 | Frozen install, full tests, strict production build, generated/domain freshness, relevant production browser checks pass | Verification record and required hosted CI |
| AC7 | Separate Sol 6.1 reviewer passes final head/base; protected squash merge, exact merge-SHA CI/Pages and live files/interactions verified | External MR review and release comments |
| AC8 | Team/process observations produce a small simplification without weakening ownership or merge/review gates | Short batch observations and reviewed process diff |

Existing design: Shipyard-only footing y 1.42..-2.65, circumradius 0.98 of collision
radius; default CylinderGeometry decagon orientation. Incoming incidence uses
PRIMARY_WAVE.direction dot outward normal. Ocean updates before foam. Decorative
foam is depth-tested and follows current rendered water; no force/model changes.
Other islands, docking radii, flags/wake/spray and removed wind streams stay put.

## Ownership and handoff

- shoreline_finish: shoreline effect, landmark/world integration and relevant tests.
- shoreline_validation: artifacts/phase15/validation.mjs and validation.json.
- shoreline_browser_qa: browser harness, checks and fresh comparison images.
- Root: task/queue/batch/process docs, dependency install, builds, commits/MRs,
  final integration and deployment verification. Git/build mutations serialize.
- Final reviewer: separate non-author Sol 6.1 agent; exact full diff and evidence.

Workers receive the task, owned paths and acceptance target, then inspect relevant
code as needed. Keep handoffs to result, files, checks, limitations and next step.
Three unsuccessful focused repair rounds park the task with evidence. Final
approval stays outside its own commit. Post-merge delivery remains a separate
gate; do not mark Done or start another task early.

## Progress

Scoped existing work imported into a clean current-master worktree. Locked
install passed. Source, quantitative validation and browser QA are delegated.
Historical before/motion.json lacks useful timing provenance; fresh comparison
evidence will replace it as the acceptance basis. See the batch ledger and
artifacts/phase15/VERIFICATION.md (when created) for actual results.

## Subsequent assignment

The user now explicitly assigns the remaining-island shoreline rollout after
this Shipyard release, followed by WEB-016 one-island harbour/zoom. Root is using
sequential task branches/MRs; read-only planning is parallel. No per-step
paperwork MR: carry verified status forward in the next assigned MR.
