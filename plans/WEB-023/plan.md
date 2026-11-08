# WEB-023 — Autonomous MR workflow setup

- Status: In progress.
- Assigned: 2026-11-07, this user's workflow setup request and eight interview answers.
- Priority: Current explicit assignment; no website feature batch is assigned.
- Dependencies: Existing Vite/TypeScript/Three.js build and master/docs Pages path.
- Base: `97902baf0e82c77e88e3417b8b44e051ddff5683`.
- Branch: `codex/WEB-023-autonomous-mr-workflow`.
- Worktree: Managed `autonomous-mr-workflow/Leifcnp.com`; preserve the original dirty checkout.

## Authorized scope

Repository policies, planning and execution structures, agent role prompts,
MR template, native CI and safe local tooling. Orchestrator may merge/publish
after passing checks and independent Sol 6.1 review; branch protection is
authorized where supported. Only explicitly assigned batches may start.

No website features, shoreline/harbour implementation, dependency upgrades,
DNS/domain changes, credential/access changes or unrelated cleanup.

## Acceptance criteria

- [x] Root AGENTS and README explain the current authority, scope and merge rules.
- [x] Historical release instructions remain available without scheduling future work.
- [x] Task/batch templates cover explicit assignment, dependencies, path ownership,
  worktree/base/head, acceptance evidence, independent review, repair rounds and blockers.
- [x] Worker/reviewer prompts and MR template support implement/check/review/repair loops.
- [x] CI performs exact-runtime locked install, native tests, strict build and generated
  output/domain metadata checks under stable `Repository verification` check.
- [x] Local tools refuse unsafe worktree creation and detect stale generated output,
  including untracked files; meaningful fixture tests pass.
- [ ] Independent Sol 6.1 reviewer checks the final diff/head/base and evidence.
- [ ] Setup is delivered by MR; check merge/publication and configure available branch
  protection, or record concrete access blockers without claiming completion.
- [x] Existing changed/untracked website files retain their recorded SHA-256 hashes;
  no app source, public assets or generated website content changes belong to this MR.

## Ownership

- Orchestrator: AGENTS, README, PLAN, WEBSITE_TODO, this plan, historical guide,
  execution/evidence records, final integration/commit/MR and remote settings.
- Workflow docs worker: ORCHESTRATION, task/batch templates, worker/reviewer prompts,
  MR template and work README.
- Tooling worker: scripts, workflowTools tests, CI, package scripts and gitignore.
- Independent reviewer: read-only final full diff and acceptance/check evidence.

Shared integration worktree is allowed for this setup; paths are exclusive and
Git/build/final commit operations belong to the orchestrator.

## Validation and review

Record actual checks and limitations in `artifacts/workflow-setup/VERIFICATION.md`.
Keep the final head/base-bound review outside the reviewed commit (MR discussion
or external artifact), avoiding a self-referential commit hash. A new commit or
changed target base requires fresh review. Three unsuccessful repair rounds park
the task; do not continue website backlog work.

## Progress / blocker / next step

Implementation and local verification are complete:175 tests, strict build and
generated/domain checks pass. Existing20 changed/untracked files are preserved.
GitHub owner/admin access is connected for MR operations; branch settings require
browser sign-in because the connector has no protection-write operation. No
credentials are stored. Next: final exact-SHA review, MR CI, strict protection,
merge and deployment/public verification. See the batch ledger and evidence.
