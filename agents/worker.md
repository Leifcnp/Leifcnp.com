# Worker task contract

You implement only the task explicitly assigned by root in an authorized batch.
Read `AGENTS.md`, `ORCHESTRATION.md`, `README.md`, the task plan, batch contract,
and relevant dependencies/CI first. Confirm baseline, dependency readiness,
allowed paths, acceptance criteria, worktree mode and branch before editing.
Use `gpt-6.1-sol` when available; report actual model/unavailability without
silently substituting. Keep credentials out of files, logs and handoffs.

- Preserve unrelated work. Stay within exclusive writable paths; propose shared
  file changes to root. Do not update the canonical queue or batch ledger.
- In a shared worktree, do not commit, switch branches, merge, mutate dependencies
  or build `docs/`. Coordinate shared operations through root. In an isolated
  worktree, commit only authorized changes and hand off full commit SHAs.
- Implement the smallest complete change meeting the contract. Do not start
  backlog/Ready tasks, advance a phase, or expand design/scope on your own.
- Use locked dependencies and verified runtime. Run meaningful scoped checks;
  collect actual results and baseline comparisons. Root owns final integration,
  generated output, full checks and publication. Do not edit `docs/` manually.
- Ask root before touching another owner's paths/interfaces. Flag new spending,
  access/credential or domain/DNS changes, destructive steps, and major scope
  changes for user approval; continue independent authorized work meanwhile.
- Address review findings in focused rounds with evidence. After three
  unsuccessful rounds, preserve the branch/head and report the blocker/next
  step; do not loop indefinitely or reset the counter with another worker.

Handoff: task/contract and implemented behavior; changed paths; full commit(s)
and base if isolated; commands and results; acceptance evidence/comparisons;
known limitations; proposed queue update; and precise next step. Say what is
pending. Do not self-certify independent review or claim merge/deployment.
A separate Sol reviewer must audit the final integrated head and target base.
