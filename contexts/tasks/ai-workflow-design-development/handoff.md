# Handoff — AI workflow design/development and continuity

Task ID: `task:ai-workflow-design-development`  
Status: **experimental repository implementation delivered; not activated in any ChatGPT Project**  
Checkpoint date: 2026-11-08

## Resume pointers

- **Current task state:** [task-state.md](task-state.md), blob `5e04b3b41b0efb0944a13ef0e2cc2709689e3be7`.
- **Chronology:** [task-log.md](task-log.md), blob `2874805983861da4b92b4964020359d00f10b7f9`; latest event **EV-0009**, state finalized ahead of handoff.
- **Approved feature specification:** [task-specification.md](task-specification.md), blob `add802c3cc0bd76343d840b699a7cc5d6bd8d13d`; contains use cases and task-document decisions, including explicit operator go-ahead.
- **Experimental bootstrap:** [bootstrap.md](../../../bootstrap.md), blob `5ec0aa505efc80e0e2621093086b282331daabbc`.
- **Universal task-record method:** [behavior/task-records.md](../../../behavior/task-records.md), blob `06170cb7c12d77893908c9a7e036a010b0a85244`.
- **Context registry:** [routing/index.yaml](../../../routing/index.yaml), blob `c0b12a685cb6f35c6308d7df3aa7af5a80a1d73d`; this task is registered.
- **Repository snapshot immediately before creating this handoff:** `360f9b85f9fc3bbdb584fee3e127887cc1c941e8`. This handoff's own commit will be later than that snapshot.

## Exact point reached

The user approved the general document architecture and the initial `contexts/tasks/<task-id>/` storage. A model-readable method now requires three separate documents for **every task**, with a fourth `task-specification.md` for real design/development. The prior multidimensional intent matrix remains. The three templates, bootstrap integration, current task state, append-only log and registered task locator are published. Source-level assertions checked 13 relevant invariants successfully (one initial faulty literal matcher was corrected); no end-to-end ChatGPT client behavior was observed.

## Current limits and authorization

- **No remaining operator decision is required** to consider the repository-level, user-approved implementation delivered.
- The ChatGPT Project / any external agent has **not** been switched to the new bootstrap. A Markdown convention cannot by itself guarantee automatic per-turn persistence or private-chat retrieval.
- The chat exporter is being reimplemented and its integration remains **deliberately undecided**, with no hidden sync or background work.
- Legacy testing/validation workflows are **not part of** this new method; verification is tied only to this task's approved use cases.

## Next authorized action

**This repository-level task is complete.** No further write is needed solely to finish it. If the operator later requests activation, first verify current repository revisions, confirm the target opt-in client/project and only then select/pin the new experimental bootstrap. For real deployment behavior, check a small representative end-to-end task without inheriting unrelated legacy validation programs. If the operator instead opens a new chat to continue designing the wider workflow, resume from this handoff and current task state; ask only genuinely new, consequential questions.

## Resume caveat

Start from these **persisted** files, not claims about unobservable earlier chats. If any cited revision or required file cannot be fetched, report the gap and retrieve the authoritative current source before acting. Do not treat an additional task's documents as this task's state merely because both are in one Project.
