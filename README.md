# AI-Workflow

AI-Workflow is an assistant-executed workflow framework. The **active source** is the `main` branch. This repository contains the current operational instructions, specifications, and templates.

## Entry point

Read and execute [bootstrap.md](bootstrap.md) in full for every request. Its universal identity, continuity, and checkpoint instructions take precedence over conditional framework documents. The only deployment parameters are `rules_repository`, `state_repository`, and `time_zone`.

## Active components

- [bootstrap.md](bootstrap.md): mandatory per-request execution and finalization.
- [doc/conversation-identity.md](doc/conversation-identity.md): conditional branch, alias, and synchronization recovery. Conversation state remains in `conversations/<chat-id>/branch-N.yaml`; meaningful changes and resume context belong in its on-demand `events/` and `snapshots/` subdirectories.
- [state/protocol.md](state/protocol.md) and [state/connector-runbook.md](state/connector-runbook.md): verified GitHub checkpoint semantics and connector operations.
- [state/task-model.md](state/task-model.md): approved recursive task persistence, computed parent rollups, minimal root/child indexes, immutable revisioned execution plans, and safe reparenting.
- [templates/execution-plan.yaml](templates/execution-plan.yaml): optional immutable plan revision template.
- [routing/](routing/): optional `!aw` commands, intent routing, and context resolution.
- [control/continuity.md](control/continuity.md): task continuity and conditional audit.
- [workflows/system-design.md](workflows/system-design.md): the only complete phase workflow at present.
- [behavior/](behavior/) and [templates/](templates/): conditional methods and task-record templates.
- [deploy/chatgpt-project-instructions.md](deploy/chatgpt-project-instructions.md): current installation guidance.

## Runtime policy

The assistant executes workflow and checkpoint operations directly through available, authorized tools. Verify current capabilities and access before acting. The mutable store is [ai-work-state/main](https://github.com/massimilianonardi-ai/ai-work-state/tree/main), separate from this rules repository. Since the state repository is public, store only information suitable for public disclosure.

## Verification status

Publication of instructions is not proof of host execution. Actual checkpoints require successful GitHub writes and read-back verification; full branching, failure, and concurrency behavior still needs end-to-end validation.

