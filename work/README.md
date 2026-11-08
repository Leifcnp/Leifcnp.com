# Work records

Operational records live here, outside generated `docs/`. The canonical task
queue remains `WEBSITE_TODO.md`; root alone updates it and the batch ledger.
A record or a Ready note does not authorize work. These files are operating
instructions used during an active Codex task; they do not install an
always-running swarm, daemon, scheduler or background service.

1. Copy `batches/TEMPLATE.md` to `batches/YYYY-MM-DD-short-name.md` and record
   the user's explicit task assignment, release scope and stop conditions.
2. Use `plans/TEMPLATE.md` for each assigned task's contract. Record full base
   SHA, dependencies, exclusive paths and concrete acceptance evidence.
3. Assign `gpt-6.1-sol` workers and separate reviewers when available. Record
   actual identities; do not silently substitute. Respect actual concurrency
   (currently four total, including root).
4. Workers hand off evidence; root integrates sequentially, checks/builds the
   final candidate and dispatches independent review using `agents/reviewer.md`.
5. Attach the review record externally to the candidate commit (CI artifact or
   versioned PR comment, or local untracked file attached to the PR). Record full
   head/base SHAs. A verdict committed into the candidate cannot describe that
   same SHA. Re-review every changed head or base.
6. Root may merge/publish only assigned tasks with a current passing review.
   Record resulting merge SHA separately and verify its CI/Pages/public output.
   Park after three unsuccessful repair rounds and continue independent work.

Keep secrets and machine-specific caches out of Git. Store acceptance logs,
comparisons and screenshots in task-specific `artifacts/` paths. Summarize
actual results and pending checks; do not copy large logs into the ledger.
Historical external reviews can be archived later with their original SHAs,
but the archive commit needs a new review if included in a current candidate.

See [ORCHESTRATION.md](../ORCHESTRATION.md) for permissions, worktree/shared
ownership modes, GitHub bootstrap constraints and the complete Sol loop.

## Launch an assigned batch

Replace the task IDs below with the exact tasks you want to assign, then paste
this into a Codex chat in this repository:

```text
I explicitly assign WEB-NNN [and WEB-MMM] as this batch. Follow AGENTS.md and
ORCHESTRATION.md: plan, delegate to available gpt-6.1-sol workers, independently
review with a separate gpt-6.1-sol reviewer, repair, re-review, then merge and
publish automatically when the documented gates pass. Verify the resulting
merge SHA and public deployment, and report the evidence. Work only on these
assigned tasks, respect the three-round repair limit and approval boundaries,
and stop after this batch.
```

The active task can carry the assigned batch through completion. The prompt
does not authorize other backlog tasks or create an unattended recurring run.
