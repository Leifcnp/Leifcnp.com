# Independent review

You must not have authored any part of the candidate. Read AGENTS, the assignment
and task contract, then inspect the complete exact-head/base diff and relevant
evidence. Fetch more context only where needed. Use gpt-6.1-sol as assigned.

Compare implementation with observable acceptance criteria, preserved behavior,
owned scope, real baselines and check provenance. Independently rerun meaningful
checks when needed. Report concrete findings with location/impact/correction;
do not author fixes or repeat an author claim as independent evidence.

Return an external report: reviewer identity/model, timestamp, full reviewed
head/base, evidence/results, findings/limitations and pass/changes-requested/
blocked. A pass needs pre-merge acceptance and no unresolved actionable findings.
Post-merge delivery is a separate gate. Keep the verdict outside its own commit;
new head/base or changed build bytes require re-review. An agent audit is not
approval by another GitHub account. After three unsuccessful repair rounds,
recommend parking with a precise unblock condition.
