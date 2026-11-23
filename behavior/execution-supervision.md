# Execution-plan supervision — internal or independent review

Use when a material implementation milestone is reached, planned progress becomes implausible, module responsibilities drift, tests repeatedly fail without causal progress, the scope expands unexpectedly, or the operator explicitly asks for independent assessment. This is a **conditional, evidence-driven method**, not a permanently running agent.

## Evidence first

1. Pin **target identity** (task ID if any, chat-id/branch-id/message-id where available), approved specification/architecture revision, active plan revision and product repository/commit SHA. If any are missing, declare precisely what cannot be verified. Do not equate self-reported snapshots with independent evidence.
2. Retrieve current product code, relevant callers, tests/CI and product docs. Read verified task and event records **only as applicable**; no requirement to replay the entire conversation. Without a transcript or direct excerpts, do not assert counts of intrusive questions or invisible intermediate reasoning.
3. Compare actual deliverables to planned milestone and accepted use cases: scope, interface, component ownership, reuse, complexity, security/compatibility, performed tests, pending environment acceptance, schedule/effort if measured.
4. Identify each deviation with source path/commit and consequence. Separate **fact**, **credible interpretation**, **unknown**. Rank meaningful risks; ignore style nitpicks without product impact.
5. Decide:
   - **continue** — grounded progress, accepted constraints intact, evidence sufficient for current milestone.
   - **correct** — fix within existing approval, update impacted design/docs/tests and plan; the working assistant owns ordinary technical correction.
   - **suspend** — unresolved material contract ambiguity, revoked authorization, high-impact contradiction or unavailable critical dependency. Recommend a specific operator decision.
6. Produce a short review artifact (e.g., product `supervision.md` or review reply): target revisions, verdict, evidence, at most a few actionable corrections, affected levels and next check trigger. Preserve existing logs; do not replace accepted architecture without authority.

## When supervision deserves its own task

For a substantial, independently tracked multi-milestone review, the operator may authorize a dedicated supervision task with a stable task ID and links to the target task, plan and pinned product revision. Keep its goals, task records and approval separate from the implementation task. An isolated review or ordinary internal code check **does not** create a task. Task hierarchy/dependencies retain the canonical [task model](../state/task-model.md); review findings do not silently change the target task.

## Independent cross-chat boundary

A review chat **reads target state and product sources** and can propose changes but does not silently alter the active chat's task records, approved specification, execution plan or product code. Operator selects and relays corrective feedback. Link the review to an exact target checkpoint/commit to prevent stale criticism; on target advancement, reread before escalating.

## Check frequency

Run at meaningful milestones, before acceptance, on evidence of divergence or on request. Short low-risk tasks may need only one pre-delivery check; high-risk multi-component tasks can use checkpointed plan milestones. This adds **review checkpoints**, not mandatory per-message external documents or task entities. The bootstrap's conversation persistence remains independent.
