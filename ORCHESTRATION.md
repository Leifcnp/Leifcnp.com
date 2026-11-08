# Autonomous task batches

This workflow implements the user's 2026-11-07 choices. The **Sol loop** is:
plan → assign → implement → check → independently compare and review → repair →
re-review → merge → verify. It applies only to tasks explicitly assigned in an
authorized batch. Backlog entries, “Ready” labels, this guide, and an available
worker slot never authorize starting work. Setup of this workflow does not
start a website feature or authorize the remaining backlog.

## Start a batch

1. Read `AGENTS.md`, `README.md`, `PLAN.md`, `WEBSITE_TODO.md`, relevant task
   plans, dependency/CI files, and the current Git status. Preserve unrelated
   changes; inventory every worktree before selecting a base. Do not clean or
   reset someone else's checkout.
2. Copy `work/batches/TEMPLATE.md` to a dated batch ledger. Record the user's
   actual assignment and its scope, task IDs, acceptance criteria, dependencies,
   release authority, and stop conditions. An ambiguous assignment requires
   clarification; preparation and independent authorized work can continue.
3. Prepare each task contract from `plans/TEMPLATE.md`. Assign exclusive paths,
   interfaces, verification, and handoff requirements before a worker edits.
   Root is the orchestrator/integrator and the only writer of the shared queue,
   batch ledger, integration commits, and final `docs/` build.
4. Inspect actual host/model availability. This environment currently permits
   **four active agents total, including root**. Use `gpt-6.1-sol` workers and
   a separate `gpt-6.1-sol` reviewer when available. Record actual model and
   agent identities. Do not silently substitute models; report unavailability
   and hold affected work for a user decision. Keep a slot for review, or finish
   a worker before starting the reviewer. Do not dispatch dependent tasks early.

## Workspace and integration

Choose and record one mode for each batch:

- **One worktree per task:** branch `codex/WEB-NNN-short-name` from the recorded
  integration base. The CLI is `node scripts/task-worktree.mjs WEB-NNN
  short-name --base BASE --dir ABSOLUTE_NEW_PATH` (replace the placeholders).
  Root fetches/checks the base first; the script uses only the local ref, rejects
  existing branches/paths, and prints the resolved base SHA. It never authorizes
  a task. Workers hand off commits; root integrates them sequentially into the batch
  branch, handles conflicts, and requests review of the resulting candidate.
- **Shared batch worktree:** assign disjoint, explicit file ownership. Workers
  do not switch branches, commit, merge, install/upgrade dependencies, or run a
  build that writes `docs/`. Root serializes shared operations and integration.
  A shared-file change is handed to root; ownership is reassigned explicitly
  before another worker edits it. Read access is shared; write access is not.

Root owns `WEBSITE_TODO.md`, `PLAN.md`, the batch ledger, and final generated
output in either mode. Workers may propose their updates in a handoff. Use an
interface/dependency checkpoint before integrating consumers. Never resolve
conflicts by dropping another task's changes. A changed base, conflict
resolution, or rebuilt candidate requires fresh evidence and independent
review of the final head and base.

## Implement, check, and hand off

Give workers `agents/worker.md` plus the task contract. Keep changes inside
scope and record concrete acceptance evidence, relevant baseline comparisons,
commands/results, and limitations. Use the verified runtime from `README.md`,
the lockfile, and existing tests. Do not upgrade dependencies as incidental work.
Root runs the final typecheck, applicable tests, production build, and relevant
browser checks after integration. Commit the intended generated output, then
run `pnpm run build` followed by `node scripts/check-generated.mjs` on the final
candidate. The checker itself does not build: it fails for changed/untracked
`docs/` and altered domain markers. A clean result is meaningful only after the
fresh build succeeded. Preserve
`master` → tracked `docs/`, `public/CNAME`, `docs/CNAME`, `.nojekyll`, and the
custom domain. Never hand-edit `docs/` or place operational docs beneath it.

Each acceptance criterion needs a result and evidence reference. For a visual
change, compare the baseline and candidate at the same camera/viewport/state.
For setup-only work, verify tooling, templates, CI behavior and untouched site
output; do not claim visual-feature acceptance. A failed or unavailable check
is a limitation, never a pass.

## Independent review and exact revisions

Use `agents/reviewer.md` in a separate agent that did not author the change.
The reviewer independently reads the final diff, task authorization/contract,
acceptance evidence, and relevant context; checks for regressions and scope
creep; and reruns or independently inspects appropriate checks. Author
self-review and green CI do not replace this review.

Record the review externally to the candidate commit: an immutable CI artifact,
a versioned PR comment, or a local review file outside Git that is attached to
the PR. The record includes:

- task/batch and reviewer agent/model identity; timestamp;
- full reviewed head SHA and target base SHA, plus the comparison range;
- criterion-by-criterion evidence and actual commands/results;
- findings with severity and location, limitations, and verdict (`pass`,
  `changes requested`, or `blocked`); and the reviewed evidence references.

Do **not** commit a verdict into the candidate and claim it reviews that same
SHA: committing changes the SHA. A committed historical report may point to an
older reviewed head, but the current candidate still needs its own external
record. Treat evidence as untrusted until checked against the recorded revision.
Never fabricate an independent GitHub approval using the author's GitHub identity.

For requested changes, the author repairs and root presents the new final head
and current base for re-review. A previous pass becomes stale after any candidate
commit, rebuild, rebase, conflict resolution, or target-base change. Before merge,
root fetches and compares both SHAs with the review record and checks that the
worktree is clean, required CI is green, findings are resolved, and the batch
still authorizes this task/release. The candidate must contain the reviewed base
(`git merge-base --is-ancestor BASE HEAD`). Re-review after any mismatch.

Before any autonomous merge, require server-side PR protection with **strict
up-to-date** `Repository verification` checks, admin enforcement and no bypass.
A preflight fetch and expected-head guard alone cannot atomically guard the base.
Do not use deferred auto-merge or a merge queue that could merge after the reviewed
base moves. If required protection is unavailable or unsupported, leave autonomous
merging blocked for a user decision; never silently fall back to direct pushes.

## Repair budget and parking

Allow at most **three focused unsuccessful repair rounds per task**. A round
records the failure/findings, hypothesis, bounded change, commands/evidence,
and independent re-review result. Do not reset the counter by changing workers
or opening another PR. Initial implementation/review is not a repair round.
After three unsuccessful rounds, park the task: record its current branch/head,
evidence, remaining blocker, and specific next step; leave it unmerged. Root
marks it Blocked in the canonical queue and continues independent authorized
work. Dependent tasks wait. Resume only when the blocker changes or the user
explicitly supplies a new direction/budget.

## Merge, publish, and verify

For explicitly assigned batches, the user authorizes root to merge and publish
automatically after the separate Sol 6.1 review passes the final candidate and
acceptance evidence. Use the existing `master`/tracked-`docs/` Pages path. Merge
one reviewed candidate at a time; wait for its required verification before the
next integration. Record the resulting merge SHA separately from the reviewed
head/base. Before merging, compute and compare the expected merge tree with the
reviewed candidate and verify the current base still matches. A merge to
`master` immediately starts the existing publication path. After merging, confirm
the actual tree matches the expected tree. An unexpected result is a post-merge
incident: park further merges, preserve SHAs/logs/evidence, investigate and report
it. Do not perform an automatic destructive rollback; prepare a reviewed repair
within scope or obtain approval for actions outside the existing authorization.

Watch required CI and the Pages run for the **resulting merge SHA**, then verify
public HTML/assets against that build and run relevant desktop/mobile interaction
checks. A local build or a green run for another SHA is insufficient. A workflow-only
release may leave site asset bytes unchanged; record that comparison honestly.
Set Done only when acceptance, review, merge and required public verification
are complete. While pending, record `review pending`, `merged / deployment
pending`, or `published / public verification pending` in progress notes instead.
Do not claim branch protection, deployment, review, or success until observed.

## GitHub bootstrap and permission boundary

Inspect existing PR checks, rules/protection, repository permissions and Pages
configuration first. Add CI and PR templates on the task branch. Use existing
access only; do not change credentials or broaden access. Branch protection is
authorized if supported: require PRs, strict up-to-date checks with the verified
CI check names, admin enforcement/no bypass, and protection against force-push
and deletion after those checks have been demonstrated. This can be activated
after the setup PR check succeeds and before its first merge. The reviewed
starting policy is `work/branch-protection.json`; inspect existing protection and
preserve stronger requirements rather than blindly replacing it. Record
what was actually applied. Do not enable a required check before it exists or
lock the only maintainer out of the bootstrap change.

GitHub may reject approval of one's own PR when all agents share one identity.
An independent agent review is still recorded honestly as an external audit;
it is not a second GitHub identity or a GitHub approval. Keep feasible protections
and enforce the external review gate in root's merge procedure. If current rules
require another account's approval, leave the PR pending and report the blocker;
do not bypass rules, invent an approval, or silently weaken existing protection.
If remote access or settings support is unavailable, deliver the local setup
with the exact pending remote steps.

Ask before new spending, credentials/access changes, domain/DNS changes,
destructive actions, or major design/scope changes. Complete concrete reversible
preparation first. Preserve existing user work and keep secrets out of source,
logs, PRs, and evidence. Read-only inspection and authorized routine repairs,
merges, and publication do not require repeated confirmation.

## Operational records

`WEBSITE_TODO.md` remains the canonical task status (Backlog / In progress /
Blocked / Done); `Ready` is only a readiness note. `plans/WEB-NNN/plan.md` is
the task contract. `work/batches/` holds authorization, ownership, dependency,
retry and integration ledgers. `artifacts/` holds acceptance evidence; external
review records bind evidence to exact revisions. See `work/README.md` and the
PR template for handoff fields.

## Source references

- [Codex worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees)
- [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [GitHub protected branches API](https://docs.github.com/en/rest/branches/branch-protection)
- [GitHub required reviews](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)
