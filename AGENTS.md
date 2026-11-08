# Repository agent guide

## Authority and scope

The user approved this autonomous MR workflow on **2026-11-07**. The root agent
orchestrates the work, delegates implementation to **gpt-6.1-sol** workers, and
uses a separate **gpt-6.1-sol** reviewer. Use the available host concurrency;
do not assume unlimited active agents or silently substitute models.

- Execute the tasks or batch the user assigns. On **2026-11-07**, the user
  expanded this batch: finish WEB-016, continue through the remaining canonical
  todo list, and add/complete focused UI/control simplifications supported by
  observed friction. Record new task IDs, scope and evidence before editing.
  This is the current batch's authority; queue order alone is not a general
  authorization for future unrelated work. Approval boundaries below remain.
- The orchestrator may create branches/worktrees, commit scoped work, open MRs,
  repair findings, merge, and publish assigned work after all merge gates pass.
  On this GitHub repository, **MR means pull request** targeting `master`.
- Ask before new spending, credentials/access changes, domain/DNS changes,
  destructive actions, or major design/scope changes. Continue independent
  authorized work while a decision is pending. Never expose credentials.
- For the current overnight run, the user requests **no questions**. Park any
  action requiring new approval with concrete evidence/proposal in Blocked;
  continue independent authorized tasks. Do not treat silence as approval.
  The user will return with decisions. The HTTPS redirect was explicitly
  approved and enabled before this instruction; no further domain action is implied.
- Branch protection for this MR workflow is explicitly authorized where the
  account supports it; do not widen access, disable existing protections, or
  change domain/Pages configuration to make automation work.
- After three unsuccessful focused repair rounds, park the task with evidence,
  a blocker and next step, and continue independent assigned tasks. Infrastructure
  failure is not a passing check and is not a reason to bypass a gate.

Start with this guide and the assigned task contract. The orchestrator also reads
[ORCHESTRATION.md](ORCHESTRATION.md) and the canonical
[WEBSITE_TODO.md](WEBSITE_TODO.md). Workers/reviewers inspect relevant code,
checks and evidence as needed; do not require them to preload the full delivery
plan, historical guides, every template, or unrelated skills. Keep briefs to the
outcome, owned paths, constraints and handoff. The current user instruction takes
precedence. Current rules supersede historical staffing, direct-push releases
and automatic one-phase user-review stops; product/deferred-scope limits remain.
Earlier instructions and evidence are preserved in
[the historical guide](work/history/AGENTS-2026-09-25.md).

## Ownership and worktrees

- Preserve existing changes. Inspect status, branch, worktrees and base SHA;
  never stash, reset, clean, stage or commit unrelated work. Do not modify or
  remove another agent's or the user's worktree.
- Prefer an isolated worktree and `codex/WEB-NNN-description` branch per task.
  Managed Codex worktrees are preferred when available. The CLI helper is
  `node scripts/task-worktree.mjs --help`; it creates worktrees without copying
  uncommitted changes. Keep them on the Ubuntu guest filesystem.
- Shared batch worktrees are allowed only with an explicit owner for every
  edited path/interface, a single integration owner, and serialized Git/build
  mutations. Subagents share filesystem access; spawning one does not isolate it.
- The orchestrator owns shared queue/plans, final integration, generated `docs/`,
  the final commit, MR creation and merges. Workers report their owned changes
  and evidence; they do not merge. Serialize overlap and dependency merges.
- Record assignments, base SHA, paths, dependencies, branches, worktrees,
  checks, repair rounds, blockers and next steps in a batch ledger. Use
  [work/README.md](work/README.md) and the templates; never use hidden chat state
  as the only handoff record.

## Review and merge gates

Use the Sol loop: scope and assign → implement → check → independently compare
the diff and acceptance evidence → repair → recheck/re-review → merge → verify.

- A reviewer must not be an author of the reviewed changes. Give it the task,
  user requirements, exact head and target-base SHAs, full diff and check evidence.
  Require a written verdict and resolution of all blocking findings. The author
  repairs; the reviewer checks again. The orchestrator cannot waive a blocker.
- Every new commit or change to the target base invalidates approval. Record the
  final SHA-bound verdict outside the reviewed commit (MR discussion or attached
  artifact); committing a verdict changes the head it claims to approve.
- Run `pnpm run verify` from a clean task worktree after committing intended
  generated output. Relevant browser/visual evidence remains a separate gate.
- Require the **Repository verification** GitHub check and current independent
  review before merging. The candidate must contain the reviewed base. Require
  server-side PR protection with strict up-to-date checks, enforcement for admins,
  and no bypass before autonomous merges. If unavailable, leave merging blocked
  for a user decision; a preflight fetch cannot atomically guard a changed base.
  Do not use deferred auto-merge or a merge queue that can outlive the review. Merge one MR at a time using squash by default, verify
  the expected head and base immediately beforehand, and never bypass gates,
  force-push `master`, or fall back to a direct commit/push to `master`.
- Agent independence is not a separate GitHub identity. Do not require a GitHub
  approval that the author's own account cannot supply; use the documented
  independent agent review record plus CI, or an actual separate reviewer
  identity. Do not fabricate an approval or a trusted automated review check.
- Merging `master` publishes tracked `docs/`. For website changes verify the
  Pages run for the resulting merge SHA, public assets and relevant live
  interactions. Do not mark delivery complete from a local build alone.

## Task records

[WEBSITE_TODO.md](WEBSITE_TODO.md) is the canonical queue. Preserve stable
`WEB-NNN` IDs, never renumber/reuse them, and allocate above the highest existing
ID after checking every section for duplicates. Use Backlog, In progress,
Blocked and Done; unchecked until verified, checked only in Done. Listing or
preparing a task is not assignment. Use [plans/TEMPLATE.md](plans/TEMPLATE.md)
for authorization, readiness, scope, evidence, ownership and dependencies.

Only the integration owner moves queue entries. Retain completion dates and
evidence. Record a concrete next step for unfinished tasks; blocked entries also
name the blocker and what enables resumption. Mark Done only after all applicable
review, merge and deployment gates pass. Leave deferred harbours/zoom and the
unassigned shoreline work untouched. WEB-022 is limited to the Shipyard prototype
unless the user explicitly assigns a wider rollout.

## Project constraints

- Bespoke Vite, TypeScript and Three.js sailing portfolio. Build mechanics
  intentionally; no all-in-one game template. Source is `src/`, `index.html`
  and `public/`; portfolio content belongs in `src/content/` data files.
- `docs/` is generated, tracked GitHub Pages output. Never edit it by hand or
  put workflow documentation there. Preserve `public/CNAME`, `docs/CNAME`
  (`leifcnp.com`), `.nojekyll`, relative asset paths and `master`/`docs` publishing.
- The former Hugo site is recoverable at `863b788`; do not reintroduce it.
- Preserve the original custom boat, steering/trim/boost contracts, collision
  safety, bounded buffers, shared clock, disposal, pause/reset, hidden-tab,
  accessible scanner/content, reduced motion and WebGL fallback.
- Current waves use eight overlapping deterministic carriers, four fixed-seed
  smooth fields, analytic phase/envelope/storm derivatives and positive zero-sum
  packet weights. Keep the 1.8/2.52 height bound. Hull/foam contact follows
  rendered triangles; mesh and both samplers share the fixed hashed diagonal
  rule in `waterSurfaceCellUsesTopRightDiagonal`. Update ocean before crests.
- Preserve 20° sail-only / 0.4-radian total heel, 3 rad/s tilt velocity limit,
  rail/deck guards and the 48-particle spray lifecycle. Wind flags/HUD remain;
  **over-water white wind streams were removed by user review and stay removed**.
- Historical known working URL is [http://leifcnp.com/](http://leifcnp.com/).
  HTTPS/canonical-host observations belong to WEB-001. Do not bypass TLS warnings
  or change DNS/domain settings to reconcile them. Recheck before claiming
  current availability; prior sandbox DNS/VM WebGL failures do not prove outage.

## Environment and commands

This is an Ubuntu VirtualBox guest, intentionally isolated for development.
VirtualBox isolation does not override actual command/network sandbox rules.
Keep repositories/output on the guest. Inspect dependency files and CI before
choosing runtimes or upgrades. Use the checked-in lockfile; no upgrades are part
of workflow setup.

Verified runtime: Node **24.22.1**, pnpm **11.25.0**. In this VM:

```sh
export PATH="/home/codex-account/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/home/codex-account/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH"
export PNPM_CONFIG_STORE_DIR="$PWD/.pnpm-store"
export PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=warn
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm test
pnpm run build
pnpm run check:generated
pnpm run verify
pnpm run dev --host 127.0.0.1 --port 5173 --strictPort
pnpm run preview --host 127.0.0.1 --port 4173 --strictPort
```

Build includes type checking. `verify` runs tests, build and generated-output
freshness; inspect/stage the intended build before expecting freshness to pass.
For parallel previews allocate different ports and record them. Binding loopback
or running child tests/build processes may need actual sandbox escalation;
report limitations and do not weaken verification. Chromium software-rendered
checks previously worked; the embedded VM graphics driver failed WebGL creation.
Use a working WebGL browser for visual verification. For relevant website
changes check desktop/mobile, motion controls, reduced motion, resize and fallback.
Do not add tests that merely mirror low-impact text edits.

### Verified Git access (2026-11-07)

This VM's system SSH config owner check and stale internal Codex snapshot refs
needed a per-command workaround. See README's Git section. The verified fetch is
`git -c core.sshCommand='ssh -F /dev/null -o BatchMode=yes' -c fetch.hideRefs=refs/codex/ fetch origin master`.
It retains normal host verification and does not delete refs or change global
configuration. Push only task branches with the same per-command SSH setting.
The GitHub connector can read the repo but MR creation returned 403; authorized
browser writes worked. Do not change app access/credentials without approval.
