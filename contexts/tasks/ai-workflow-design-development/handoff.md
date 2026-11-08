# Handoff — AI workflow design/development and continuity

Task ID: `task:ai-workflow-design-development`  
Status: **v0.2.0 release assets prepared; experimental ChatGPT Project not yet changed**  
Checkpoint date: 2026-11-08

## Resume pointers

- **Current task state:** [task-state.md](task-state.md), blob `177a7be8aed0d26305c71f2ad2b62355ed30147f`.
- **Chronology:** [task-log.md](task-log.md), blob `f06dae589a415341d1d4278142d06a573d7c66f0`; latest event **EV-0013**, editorial specification-status correction after the state was finalized.
- **Approved feature specification:** [task-specification.md](task-specification.md), blob `ec5c2082b929d49203830cbce4eab78a5bc01e2d`; contains use cases and task-document decisions, including explicit operator go-ahead.
- **Experimental bootstrap:** [bootstrap.md](../../../bootstrap.md), blob `5ec0aa505efc80e0e2621093086b282331daabbc`.
- **Universal task-record method:** [behavior/task-records.md](../../../behavior/task-records.md), blob `06170cb7c12d77893908c9a7e036a010b0a85244`.
- **Context registry:** [routing/index.yaml](../../../routing/index.yaml), blob `c0b12a685cb6f35c6308d7df3aa7af5a80a1d73d`; this task is registered.
- **Repository snapshot before this handoff refresh:** `0231e5871b2f62eacd0c4c0cb04a6372dd7b4d04`. This handoff's own commit will be later than that snapshot.

## Exact point reached

The user approved the general document architecture and the initial `contexts/tasks/<task-id>/` storage. A model-readable method now requires three separate documents for **every task**, with a fourth `task-specification.md` for real design/development. The prior multidimensional intent matrix remains. The three templates, bootstrap integration, current task state, append-only log and registered task locator are published. Source-level assertions checked 13 relevant invariants successfully (one initial faulty literal matcher was corrected); no end-to-end ChatGPT client behavior was observed.

## Release handoff (2026-11-08)

- **Operator approval:** existing `procedi` confirmed to mean proceed, execute, implement and release; see task log **EV-0011**. No additional permission question is needed.
- **Version:** `v0.2.0`, frozen Git branch intended as `release/2026-11-08-task-continuity`.
- **Release documentation:** [release notes](../../../releases/2026-11-08-task-continuity.md), blob `cf8183763158b099f0aabff8840b5bb4cca93bbe`.
- **Project installation file:** [deployment instructions](../../../deploy/chatgpt-project-instructions.md), blob `9e63aa898b20b9032cc5a2f82c7b90c39eb80e51`.
- **Publication boundary:** this handoff is the final in-task write before the Git release branch is created. The branch must be **created and verified after this write**; it is not yet a proven client installation. GitHub publication does not modify ChatGPT Project settings.

## Current limits and authorization

- **No remaining operator decision is required** to consider the repository-level, user-approved implementation delivered.
- The user has authorized release and experimental activation, but **the available client tools cannot change ChatGPT Project Instructions**; no actual Project has been switched to the new bootstrap. A Markdown convention cannot by itself guarantee automatic per-turn persistence or private-chat retrieval.
- The chat exporter is being reimplemented and its integration remains **deliberately undecided**, with no hidden sync or background work.
- Legacy testing/validation workflows are **not part of** this new method; verification is tied only to this task's approved use cases.

## Next authorized action

**Complete the already authorized release by creating and verifying** frozen branch `release/2026-11-08-task-continuity` at this handoff's resulting commit. The repository-level implementation is complete. If the operator later requests activation, first verify current repository revisions, confirm the target opt-in client/project and only then select/pin the new experimental bootstrap. For real deployment behavior, check a small representative end-to-end task without inheriting unrelated legacy validation programs. If the operator instead opens a new chat to continue designing the wider workflow, resume from this handoff and current task state; ask only genuinely new, consequential questions.

## Resume caveat

Start from these **persisted** files, not claims about unobservable earlier chats. If any cited revision or required file cannot be fetched, report the gap and retrieve the authoritative current source before acting. Do not treat an additional task's documents as this task's state merely because both are in one Project.
