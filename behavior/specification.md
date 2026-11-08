# Interactive task specification — design and development

Status: experimental method. This document governs **design** and **develop** intents wherever they occur in the multidimensional request; it is not an exclusive mode or a new classification system.

## Principle

The first user request may be exploratory, incomplete or ambiguous. Defining the requested result is part of the work, not an error in the prompt. For an actual design/development task, **do not silently turn consequential assumptions into implementation decisions**. Refine the request *with the user* and maintain **one task-owned `task-specification.md`** until use cases and their outcome checks are clear enough to proceed.

The universal `task-state.md`, `task-log.md` and `handoff.md` records are required by `behavior/task-records.md` **regardless of task type**. For design/development, keep `task-specification.md` as a fourth file in the **same task directory**. Use `templates/task-specification.md` as its initial structure. Reuse and update the existing document for the **same task**, not a new document for every chat, turn or idea. Keep project-wide reusable facts separate from task-local decisions; resolve task identity before adopting earlier artifacts. A specification's contents have the authority actually granted by its user and sources, not by the file's existence.

## Refinement loop

1. **Understand the requested outcome:** determine who will use the result, for what purpose, in which environment, what is in/out of scope and which constraints are nonnegotiable. Identify the current task and whether relevant earlier decisions truly apply.
2. **Create or update the draft:** write the smallest useful `task-specification.md` with clearly labeled confirmed requirements, hypotheses, open decisions and provenance. When file writing is unavailable, show the current Markdown draft and explicitly report that it has not been persisted. Do not pretend to have created a file.
3. **Ask relevant questions early and interactively:** prioritize omissions that can change the outcome, user interaction, target system, architecture, public contract or cost of errors. Explain the real alternative briefly when it helps; ask only the most consequential question(s) for the next turn. Do not offload independently verifiable facts to the user. The goal is **shared understanding**, not a rigid questionnaire.
4. **Model use cases:** for every important user-facing capability, specify the actor, trigger, relevant conditions, normal path and directly observable expected outcome. Include material failure/edge scenarios; avoid speculative exhaustive permutations.
5. **Define verification from those use cases:** attach at least one executable or otherwise observable scenario to each principal use case: setup, action/input, expected result and how evidence will actually be obtained. Include important failure paths where consequence warrants it. Verifications must be **owned by this task and derived from its use cases**. Do not automatically import an unrelated project's test suites, quality gates, validation pipelines, manuals or previous test outcomes as acceptance requirements. Internal checks are supporting evidence, not a substitute for the operator-visible result.
6. **Assess readiness together:** the specification is ready only when the primary objective, scope, decisive architectural boundaries, principal use cases, linked verification scenarios and the means of observing them are clear; no unresolved choice can materially redirect the dependent implementation. The user decides whether the intended coverage is sufficient and provides **explicit approval for the identified specification revision and transition to substantive implementation**; record the actual approval evidence in both task specification and current state. A general prior authorization to discuss or refine requirements is not enough. Never silently mark a draft approved because the agent thinks it is detailed enough.
7. **Revise instead of restarting:** document material answers and decisions in the same file, update use cases/verification together and indicate anything left intentionally out of scope. A change of objective or fundamental assumptions during execution reopens the affected part for discussion before dependent changes continue.

## Execution boundary

- **Design intent:** after refinement, deliver the design and its use-case/verification model; do not implicitly implement or deploy.
- **Develop intent:** before substantive implementation, require the user-approved `task-specification.md`. Read `behavior/execution.md` and `behavior/evidence.md`; then implement, diagnose and verify as autonomously as possible within approved boundaries. Do not keep asking for routine permission.
- **Compound intents:** a task may require research, design, development and verification together. Compose relevant methods using the existing matrix; do not force a single exclusive route. Research that materially informs an open design choice may proceed without prematurely approving that choice.
- **Resume:** first read the task's `handoff.md`, current `task-state.md` and relevant `task-log.md` evidence, then inspect the existing specification and its actual approval state; do not re-interview the user about already settled decisions unless material evidence conflicts.
- **Fast path:** simple explanations, edits, corrections and exploratory conversations with no actual design/development commitment remain direct. A diagnostic `!aw route` never starts specification or implementation work.

## Bounded verification and completion

Verification exists to decide whether the **approved use cases actually work**. Prefer a representative complete usage path early, then check the agreed significant alternatives and failure paths. Do not grow an endless validation program, expand scope because a tool offers more checks, or hold a delivered outcome hostage to unrelated improvements. Stop when the agreed criteria have sufficient genuine evidence; disclose untested or blocked claims honestly. Any newly discovered issue that changes the expected behavior or architecture returns to focused refinement, not indefinite unstructured retries.

## Operational contract: no design-by-accident

Before the assistant commits to a platform or implementation, the same task specification must explicitly connect **operator and scenario → complete usage path → consequential architecture/integration constraints → expected observable result**. For a service this includes how it is reached, administered, integrated and operated when those are material; a working internal component alone is not acceptance. Capture competing architectural options and their actual user decision, not an agent-selected assumption.

A specification is not a substitute for implementation: after the user explicitly approves its current scope, the assistant must execute the authorized task through the requested artifact and usable outcome under behavior/execution.md. When the operator has already approved that same scope and says procedi/go, do the work without a repeated approval request. On material changes reopen the affected agreement only. An operator expressly ordering implementation of an already agreed method is not authorizing endless re-specification.

The user-facing completion evidence must link back to specific accepted use cases. Do not replace a missing delivery with extra test documents, plans or a newly invented quality program. When the user expressly excludes tests or collateral work, implement the requested product, verify real writes and label runtime behavior as unobserved where necessary without generating a testing project.
