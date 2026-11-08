# Batch YYYY-MM-DD — Name

## Explicit authorization

- User assignment (date and quote/link):
- Assigned task IDs only:
- Allowed release action and stop/review conditions:
- Excluded backlog / scope boundaries:
- Root orchestrator/integrator:
- Actual available models and active-agent limit (include root):
- Mode: isolated worktree per task / shared batch worktree.
- Integration branch/worktree and initial full base SHA:

Backlog/Ready alone never authorizes dispatch. New spending, credentials/access,
domain/DNS, destructive actions and major design/scope changes require approval.

## Assignment and dependencies

| Task / contract | Depends on / release checkpoint | Worker / model | Branch / worktree | Exclusive paths | Status / next step |
| --- | --- | --- | --- | --- | --- |
| WEB-NNN | Fill | Fill | Fill | Fill | Pending assignment |

Root owns shared queue/ledger, integration and final generated docs. Record
ownership transfers, shared operations and interface decisions below. Reserve
capacity for a separate reviewer; never exceed the host's actual limit.

## Run ledger

| Time | Task | Agent / model | Action / revision | Actual result / evidence | Next step |
| --- | --- | --- | --- | --- | --- |
| Fill | WEB-NNN | Fill | Planned / assigned / implemented / checked | Pending | Fill |

## Repair budget

Initial implementation/review is not a repair round. Count each focused repair
plus recheck/re-review; do not reset by changing workers or PRs. After three
unsuccessful rounds park the task and block its dependents.

| Task | Round (1–3) | Failure / hypothesis | Bounded repair / head | Check + independent review evidence | Outcome / blocker |
| --- | --- | --- | --- | --- | --- |
| WEB-NNN | — | Not started | — | — | Pending |

## Final candidate and independent review

- Task/PR and exact comparison range:
- Full final head SHA and current target base SHA:
- Reviewer agent identity/model (separate from author):
- External artifact URL/path/version and timestamp:
- Acceptance matrix/check/evidence references:
- Verdict, findings and limitations:
- Root's pre-merge re-fetch: matching head/base, clean tree and required CI:

The verdict stays outside the candidate commit. Do not claim a report reviews
its own containing SHA. Any head or base change requires a new review, including
integration, rebuilt output, rebases and conflict resolutions.

## Sequential release ledger

| Task / PR | Reviewed head / base | Resulting merge SHA | CI / Pages run for merge SHA | Public assets + interactions | Actual status |
| --- | --- | --- | --- | --- | --- |
| WEB-NNN | Pending | Pending | Pending | Pending | Not merged |

## Parked tasks and closeout

- Task, preserved branch/head, unsuccessful rounds and evidence:
- Blocker, affected dependents and concrete next step:
- Independent authorized tasks continued:
- Remaining remote setup (checks/protection/access), if any:
- Completion date and accepted outcome, or honest pending status:

Done requires completed acceptance, current independent review, merge and required
public verification. Keep intermediate states in progress notes; do not invent
new canonical queue sections or mark pending remote steps as complete.
