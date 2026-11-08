# Autonomous assigned batches

Only an explicit user assignment starts work. Backlog/Ready, an available worker,
or a historical authorization does not select another task. Complete the assigned
batch, including authorized merge/publication, then stop. Ask before new spending,
credentials/access, DNS/domain, destructive actions or major design/scope changes.

## Prepare and delegate

1. Root reads AGENTS, the task contract, queue and relevant dependency/CI files;
   checks status/worktrees and fetches the current base. Preserve unrelated work.
2. Prepare a clean task worktree before assigning writes. Prefer managed worktrees;
   CLI fallback: `node scripts/task-worktree.mjs --help`. Use a `codex/WEB-NNN-name`
   branch and record the full base. Never copy unrelated dirty files or delete,
   stash, reset or clean another checkout. Scoped existing work may be copied when
   the user assigns it; preserve the original and record provenance.
3. Give each gpt-6.1-sol worker a short brief: result, worktree, exclusive paths,
   constraints and acceptance/handoff target. Let it inspect relevant code/docs
   as needed. Do not preload unrelated history, skills or duplicated rule packs.
   Report model unavailability; never silently substitute. Respect the actual
   host concurrency (currently four active agents including root).
4. Use isolated worktrees or a shared batch worktree with exclusive path ownership.
   Root owns Git, dependency operations, shared queue/ledger, integration, final
   build and merges in shared mode. Workers hand off commits in isolated mode.
   Serialize overlapping files and dependency integrations; transfer ownership
   explicitly. A subagent does not automatically get filesystem isolation.

Use one short batch ledger and one task contract. Link acceptance results to a
single verification record instead of copying them into every document. Worker
handoff: outcome, changed files, checks/results, limitations and next step.
Read-only preflight may run while root prepares dependencies; writes wait for
an explicit target/ownership. The templates are prompts, not required boilerplate.

## Check and independently review

Root integrates the smallest complete change, installs locked dependencies and
runs appropriate scoped checks, full `pnpm run verify` and relevant browser QA.
Build intended `docs/`, commit it, then verify a fresh build leaves generated
output/domain markers clean. Never hand-edit generated output. For visual work,
use matched baseline/candidate camera, viewport and known time; record source
hashes/revisions. Old screenshots or a base SHA alone do not prove new behavior.
Report VM/physical-device and missing-check limits honestly.

A separate non-author gpt-6.1-sol reviewer compares the full final diff with the
assignment, acceptance criteria and evidence. Authors repair findings; the
reviewer checks again. No unresolved actionable blocker may be waived by root.

The verdict records full head/base, reviewer identity/model, checked evidence,
findings/limitations and pass/changes-requested/blocked. Keep it outside its own
commit (MR comment or attached artifact). A new head/base or changed build bytes
requires fresh review. Re-running checks with identical revisions/output does
not invalidate review. Do not invent another GitHub identity or self-approval;
an independent agent report is a procedural gate alongside server-enforced CI.

After three unsuccessful focused repair rounds, preserve the branch/evidence,
park the task with blocker/next step and continue independent assigned work.
Do not reset the count by changing workers/MRs. Infrastructure failures are
missing checks, never passes; dependent work waits.

## Merge and verify

Before an autonomous merge, observe PR protection, strict up-to-date required
`Repository verification` from GitHub Actions, admin enforcement/no bypass,
and no force push/deletion. Preserve stronger existing rules. If unavailable,
leave merge blocked for a user decision; do not weaken rules or push to master.

Root merges one MR at a time, squash by default. Immediately verify a clean tree,
passing current CI, resolved findings, matching reviewed head/base and base
ancestry. The expected merged tree must equal the reviewed candidate. Use an
expected-head guard where supported. Do not use deferred auto-merge/merge queues
that may outlive the reviewed base. Use existing permitted access; a connector's
403 is not authorization to widen credentials. Browser fallback is allowed.

Merging master publishes tracked docs. Record the actual merge SHA separately;
check its tree, exact-SHA CI/Pages, matching public assets and relevant live
interactions. Unexpected merge output: park further merges, preserve evidence,
investigate/report and prepare a reviewed repair; no destructive auto-rollback.

Only then mark Done with date/evidence. Record post-merge proof on the MR without
changing its reviewed head. Carry repository status updates into the next already
assigned MR; avoid a separate paperwork MR after every step. If a final batch
closeout is needed, use the same review/check gates once. Never start an
unassigned task after release.

Use the known working GitHub write path promptly. One current preflight and
protected merge are sufficient; do not repeat settings inspections or retry a
known 403 without changed access. Use expected-head guards where available and
retain the required review/CI/base/protection gates. Report a real access blocker
promptly instead of spending repeated cycles on equivalent merge attempts.

## Process review

Observe handoffs, waits, duplicate context and missing evidence during the run.
Change only what those observations justify. Prefer deleting redundant procedure
or shortening a template to adding another policy/skill. Keep ownership, explicit
scope, independent review, checks and protected merge/public verification intact.

See work/README.md, plans/TEMPLATE.md and work/batches/TEMPLATE.md when a template
is useful. Historical release guides are reference, not a mandatory preload.
