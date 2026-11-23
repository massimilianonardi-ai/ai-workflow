# Workflow: develop — progressive delivery

**Route:** `operation: develop`. Goal: deliver a usable, verified product and its concise but sufficient design/usage documentation, with operator control over consequential decisions and autonomous technical realization. This is the complete development-phase workflow. The universal bootstrap remains authoritative for identity, permissions, branching and persistence.

**Conditional references (load when the current phase needs them):** [level contracts](progressive-levels.md), [task specification](../behavior/specification.md), [decisions](../behavior/decisions.md), [execution](../behavior/execution.md), [evidence](../behavior/evidence.md), [product documentation](../behavior/product-documentation.md). Read [supervision](../behavior/execution-supervision.md) only when monitoring or drift warrants it. Do not fetch every linked document merely because this workflow was selected. Use [system-design](system-design.md) for a standalone design-only task; its completion is not an implementation authorization.

## Principal control phases

**Five principal phases; L1–L11 are nested formalization levels, not 11 phases.** One principal phase is active at a time, with L10 supervision cross-cutting. Subordinate research, diagnosis, review or testing do not require rerouting.

| Phase | Levels | Entry, work, exit and authorized transition |
| --- | --- | --- |
| **specification** | L1–L3 | From user outcome, verify current context/code, produce precise objectives/requirements/representative use cases and acceptance. Resolve only materially different product interpretations. Exit when desired result, scope and observable acceptance are understood and user-approved. |
| **architecture** | L4–L8 | From approved requirements, inspect actual repository and dependencies, produce coherent architecture and component/contract/code-flow/test/plan artifacts at risk-appropriate depth. Present **one complete consequential decision synthesis before first substantive code write**; label explicit vs inferred, approved vs proposed, reference vs binding, alternatives/exclusions. Operator approves material architecture; assistant self-checks L5–L8. Verify write authority separately. Exit when no unresolved contract-level ambiguity blocks execution. |
| **implementation** | L9 (+L10) | From approved design and authorized product writes, perform ordered milestones without repeated `procedi`; implement the earliest end-to-end vertical slice, then remaining scope, with relevant tests and updated product docs. Technical choices and ordinary debugging are assistant-owned. Compare milestones/evidence; audit drift when triggered. Exit with actual committed artifacts and relevant tests, or a precise real blocker. |
| **verification** | L7, L10–L11 | Check agreed use-case observations against actual revision, distinguish unit/mocks, CI/package checks, integration and live environment. Correct within approved boundaries; if solution requires a different architecture, reopen the affected level for operator decision. Exit only when acceptance evidence is sufficient or remaining unverified capabilities are explicitly identified. |
| **delivery** | L11 | Verify code and documentation readback, current operator instructions, acceptance status, provenance and handoff. Report delivered vs observed vs untested; link code and docs. Mark complete only when the agreed user-visible result is substantiated, or report partial. |

**Transitions:** `specification → architecture → implementation → verification → delivery → complete`. Local corrections can loop within a phase; material invalidation returns to the lowest affected level and its principal phase, then resumes forward from verified artifacts. A previously approved and evidenced specification/design may be reused; do not artificially hold the operator in preliminary phases. A design-only route remains in `system-design` and ends after approved design.

## Before implementation: visible synthesis

The assistant produces a single compact, **exhaustive for consequential choices** view covering outcome, accepted scope/use cases, public API, module responsibility map, real inspected source, selected/rejected architecture, legacy/reference-code usage, significant flows, security/error/compatibility implications, deliberate exclusions, representative tests, execution sequence and actual operator approvals. Link supporting small documents. If two plausible choices would materially change public contract, product complexity or operational behavior, recommend one and ask the operator; do not code a silent interpretation. Do not ask about ordinary function organization, quoting or test scaffolding.

**No duplicate approval gates**: previously approved unchanged choices stand. Implementation authorization must actually cover the intended artifact, branch and effects; architecture agreement alone does not grant deployment or destructive scope.

## Execution discipline and evidence

1. Resolve task identity and current approved revision. Read actual source and affected callers; never adopt stale snapshots as code truth.
2. Choose the least-complex complete solution against product requirements, boundaries, security and lifetime maintenance. Respect existing module ownership and public interfaces.
3. Plan milestones by real dependencies; for a complex durable task use an immutable `plans/plan-NNN.yaml` with descriptive milestones plus an independently readable product `execution-plan.md`. Tiny tasks can use a concise in-response plan.
4. Execute actual code/artifact writes. At each meaningful milestone verify changed files, applicable tests and documentation updates; use real test results and source SHAs. Do not generate a generic test program not justified by use cases.
5. L10 supervision is **event-driven**, not a constant second agent. Trigger on major milestone/phase gate, unexpected growth in public functions/components, broken module boundary, multiple failed corrections, unexplained delay, or user request. Compare plan to independent evidence; verdict `continue`, `correct` or `suspend`. For an independent review, pin target chat/branch/checkpoint and product SHA. It cannot silently update the target.
6. Before delivery review actual code for unnecessary abstractions, duplicated responsibilities, complex control flow, missing edge handling and stale external documentation. Correct locally; request an operator decision only if a material contract or authorization changes.
7. No artificial stop at a documentation or CI milestone. If live environment is inaccessible, declare the exact unobserved acceptance and permitted remaining actions; do not falsely claim operational delivery.

## Product-documentation deliverable

Create/maintain **many concise, specialized, independently useful artifacts** as justified by the product: objectives, requirements, use cases, acceptance, architecture, component responsibilities, interfaces, flows, code design, tests, plan, supervision, operations and decisions. Store primarily **with the product**, in an approved doc area, with navigable index, accurate current code paths and source revision. Different concerns should be separate and complete, rather than collapsed into the task handoff. Use the [artifact selection guide](../behavior/product-documentation.md) and [templates](../templates/product-docs/README.md). Update directly affected docs with corresponding code, not at an undefined later time.

## Task-state integration

For a durable task, reuse its canonical specification, task log, state and handoff. An execution plan may reference existing child task IDs; descriptive milestones do not fabricate new task identities. Maintain operator approval provenance, plan revision, actual evidence and next authorized action. The separate conversation checkpoint runs unconditionally per bootstrap; technical/formalization checkpoints are not additional per-turn store files.

## Completion gate

Evidence establishes the **operator's requested result**, not only produced code or green internal tests. Product docs reflect the final revision, examples work or are clearly labeled unverified, errors and limitations are disclosed. No unnecessary operator microdecisions or premature claims. If incomplete, retain an accurate resumable plan and distinguish what was produced, observed, blocked and still outstanding.
