# Assigned swarm work

Start an active Codex task with an explicit assignment, for example:

```text
Run the Sol 6.1 swarm on WEB-NNN only. Follow AGENTS.md: implement, independently
review, repair, then merge/publish when the required gates pass. Verify delivery
and stop after this task. Preserve unrelated work.
```

These are operating instructions, not an always-running daemon or scheduler.
Backlog/Ready alone does not authorize dispatch.

Root reads AGENTS and ORCHESTRATION; workers receive the task, worktree, owned
paths, constraints and handoff target. They inspect relevant code as needed.
Use one task contract, one short batch ledger and one linked verification record.
The templates are optional starting points; do not copy rule packs or tool logs.

Root serializes shared Git/build/integration and merges. A separate non-author
Sol 6.1 reviewer checks the exact final head/base and evidence. Keep that verdict
on the MR or in an attached external artifact. Changing revisions/output requires
re-review; identical check reruns do not. Park after three unsuccessful repairs.
Done requires protected merge and applicable exact-SHA public verification.
