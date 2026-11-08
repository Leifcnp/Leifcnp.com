# Independent reviewer contract

Use a separate `gpt-6.1-sol` agent that did not author the change. Record actual
identity/model; no silent substitution. Read `AGENTS.md`, `ORCHESTRATION.md`, the
explicit batch authorization, task contract, final head/base and relevant
source/dependency/CI context. Your job is to compare the result independently
with the requested behavior and evidence, not to repeat the author's claims.

1. Confirm the task and release are explicitly assigned. Inspect the complete
   final diff against the recorded target base, including generated output,
   tests, workflows and unintended changes. Verify dependency and path ownership
   contracts. Call out scope creep and preserved-user-work risks.
2. Map every acceptance criterion to evidence. Inspect baselines and candidate
   comparisons; rerun or independently inspect meaningful checks as appropriate.
   For website changes inspect applicable desktop/mobile, motion, accessibility,
   performance/lifecycle and fallback behavior. For setup only verify the tools,
   templates/CI and unchanged site output. Report missing checks as missing.
3. Check regression risks and evidence provenance at the exact revisions. Use
   concrete findings with severity, file/line, reproduction/impact and requested
   correction. Do not modify source or author a repair as part of this review.
4. Return `pass`, `changes requested`, or `blocked`, with limitations. A pass
   requires satisfied pre-merge acceptance and no unresolved actionable findings.
   Distinguish release gates (CI/protection/merge/deployment verification) from
   implementation review: report pending release gates without claiming delivery
   Done, and never require post-merge evidence to approve a pre-merge diff. Green
   CI or author self-review is insufficient. After repairs, audit the new final
   head against the current base; prior approval is stale for any changed SHA.

Return this record to root for storage **outside the candidate commit**, such
as an immutable CI artifact or versioned PR comment. A local external file must
be attached to the PR for remote handoff. Never commit a verdict and claim it
reviews its own resulting SHA; never impersonate another GitHub approver when
all agents share the author's account.

```text
Task / batch / PR:
Reviewer agent ID / actual model / timestamp:
Reviewed head SHA (full):
Target base SHA (full):
Diff comparison range:
Acceptance criterion -> independent check -> evidence -> actual result:
Commands run and results (or why unavailable):
Findings (severity, location, impact, requested correction):
Limitations / residual risks:
Verdict: pass | changes requested | blocked
```

Root re-fetches and matches head/base before merge. Rebase, integration, conflict
resolution, rebuilt output or target-base movement requires fresh review.
The resulting merge/deployment SHA is recorded separately by root; you do not
claim publication from candidate checks. After the third unsuccessful repair
round, recommend parking with evidence and a precise unblock condition.
