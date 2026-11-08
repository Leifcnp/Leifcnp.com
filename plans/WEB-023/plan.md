# WEB-023 — Autonomous MR workflow setup

- Status: Done (implementation MR #7 verified 2026-11-07; this MR records closeout).
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
- [x] Independent Sol 6.1 reviewer checks the final diff/head/base and evidence.
- [x] Setup is delivered by MR; check merge/publication and configure available branch
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

## Completion

Completed 2026-11-07 through [MR #7](https://github.com/Leifcnp/Leifcnp.com/pull/7),
squash merge `fd6ea26551b49c797a9a895962501a26b527aa99`.
[Independent review](https://github.com/Leifcnp/Leifcnp.com/pull/7#issuecomment-6716934491)
passes implementation head `8bc2fd245fe211352d8909127ddc9305417211f5` against
base `97902baf0e82c77e88e3417b8b44e051ddff5683`. All 175 tests, strict build,
generated/domain checks, merge-SHA CI/Pages and matching public files passed.
Strict up-to-date PR protection applies to everyone, including administrators;
GitHub Actions is the required check provider. No bypass/force push/deletion.

The owner signed into the browser; root applied settings and merged there after
the connector rejected PR creation403. No credentials were collected or access
expanded. A non-destructive fetch workaround is documented in AGENTS/README.
All 20 original changed/untracked files remain preserved. No feature batch is
assigned. This documentation/evidence closeout uses another reviewed MR, not a
direct commit to master; its final review remains external to its own commit.
