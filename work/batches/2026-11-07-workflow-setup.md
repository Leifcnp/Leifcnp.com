# Batch 2026-11-07 — Autonomous MR workflow setup

## Explicit assignment

The user assigned repository setup only and answered eight policy questions on
2026-11-07. Only explicitly assigned batches may run. Automatic merge and
publication follow separate Sol 6.1 review and required checks. Ask before new
spending, credentials/access changes, DNS/domain changes, destructive actions,
and major design/scope changes. Three unsuccessful repairs park a task.

- Assigned ID: WEB-023 only. No website feature implementation is assigned.
- Root orchestrator: this chat, `/root`.
- Workspace mode: managed clean batch worktree, exclusive paths, one integrator.
- Branch: `codex/WEB-023-autonomous-mr-workflow`.
- Base: `97902baf0e82c77e88e3417b8b44e051ddff5683`.
- Host limit: four active agents total including root; workers/reviewer use gpt-6.1-sol.

## Ownership and handoff

| Agent | Model | Exclusive responsibility | Result |
| --- | --- | --- | --- |
| workflow_audit | gpt-6.1-sol | Read-only CI/GitHub/deployment audit | Completed; identified missing CI and self-approval restriction |
| autonomy_audit | gpt-6.1-sol | Read-only task/ownership/policy audit | Completed; identified conflicting historical scheduling |
| workflow_docs | gpt-6.1-sol | ORCHESTRATION, templates, role prompts, work README, MR template | Completed; root owns later integration repairs |
| workflow_tooling | gpt-6.1-sol | scripts, fixture tests, CI, package scripts | Completed; 15 fixture cases pass |
| root | orchestrator | Root policies/plans/queue/history, integration, runtime pins, evidence, commits/MR/settings | Full verification passed; remote setup pending |
| independent_review | gpt-6.1-sol | Read-only full diff and acceptance review | Preparatory findings returned; final SHA-bound review pending |

Workers did not commit, switch branches or build generated output in parallel.
Root installed locked dependencies and performed the final build. Tooling and
documentation development were parallel; audits completed before workers began.
No website source, public asset or generated site changes belong to the batch.

## Checks and repair rounds

- Frozen install: passed on installed pnpm 11.25.0 after offline metadata-cache miss.
- Full `pnpm run verify`: 175 native cases pass; strict build and unchanged-output/domain checks pass.
- Original checkout: all 20 changed/untracked file SHA-256 values preserved.
- Repair round 1: reviewer found target-base race, stale queue text and archive
  links. Root added mandatory strict up-to-date server protection and reviewed-base
  ancestry, prohibited deferred merge, removed stale text and repaired archive
  links. Independent re-review pending. Two further unsuccessful rounds remain
  if this round fails; initial preparatory review was not itself a repair.

## Remote and release ledger

GitHub connector now authenticates the repository owner; repository metadata
reports admin permission. SSH read confirms the base. Public branch metadata
reports `master` is currently unprotected. The connector exposes PR operations
but no branch-protection write operation. The available browser is signed out
of GitHub settings. No credentials/access settings were changed by agents.

- MR: pending creation after final candidate.
- Final head/current base and external review: pending; keep review outside the candidate commit.
- Required CI run: pending remote MR.
- Protection: reviewed configuration in `work/branch-protection.json`; apply after
  the actual check is demonstrated. Existing stronger rules must be preserved.
- Merge/Pages/public verification: pending; automatic merge waits for strict protection.

## Next step

Commit the checked candidate, re-review the exact head/base, open its MR, observe
CI, activate/confirm required protection and merge/verify. If setting access
remains unavailable, leave the reviewed MR unmerged with precise user action;
do not change website backlog scope or bypass the new merge gate.

## Completed implementation release / closeout

MR #7 merged as `fd6ea26551b49c797a9a895962501a26b527aa99` after exact-head/base
independent review, passing PR CI and applied strict admin-enforced protection.
CI 42444724579 and Pages 42444724516 passed for that merge SHA; four public
files match the build. Review artifact is MR #7 comment 6716934491. Repair round 1
passed; no unresolved findings. The connector's MR write was rejected 403; the
signed-in browser completed writes without expanding app access. Fetch succeeded
with the documented per-command internal-ref exclusion; no refs were deleted.

Root creates an evidence-only closeout MR from this verified merge SHA. Owned
paths: AGENTS, README, PLAN, WEBSITE_TODO, WEB-023 plan, this ledger and workflow
artifacts. Separate Sol 6.1 review and required CI apply again. Implementation
WEB-023 is Done; no website task is assigned. Further closeout review/merge/CI
outcomes belong on its MR so the final SHA remains stable.
