# AI-Workflow

AI-Workflow is an assistant-executed workflow framework. The **active source** is the `main` branch. This tree contains only current operational instructions, specifications, and templates; older releases, experiments, tests, and deterministic prototypes remain available through Git history.

## Entry point

Read and execute [bootstrap.md](bootstrap.md) in full for every request. Its universal identity, continuity, and checkpoint instructions take precedence over conditional framework documents. The only deployment parameters are `rules_repository`, `state_repository`, and `time_zone`.

## Active components

- [bootstrap.md](bootstrap.md): mandatory per-request execution and finalization.
- [doc/conversation-identity.md](doc/conversation-identity.md): conditional branch, alias, and synchronization recovery.
- [state/protocol.md](state/protocol.md) and [state/connector-runbook.md](state/connector-runbook.md): verified GitHub checkpoint semantics and connector operations.
- [routing/](routing/): optional `!aw` commands, intent routing, and context resolution.
- [control/continuity.md](control/continuity.md): task continuity and conditional audit.
- [workflows/system-design.md](workflows/system-design.md): the only complete phase workflow at present.
- [behavior/](behavior/) and [templates/](templates/): conditional methods and task-record templates.
- [deploy/chatgpt-project-instructions.md](deploy/chatgpt-project-instructions.md): current installation guidance.

## Runtime policy

ChatGPT applies the protocol directly using authorized tools, especially GitHub for persistence. **No auxiliary deterministic script or runtime is part of the active execution path.** Do not assume tools are unavailable without checking current capabilities. The mutable store is [ai-work-state/main](https://github.com/massimilianonardi-ai/ai-work-state/tree/main), separate from this rules repository. Its current public visibility means confidential or sensitive information must not be persisted there.

## Verification status

Publication of instructions is not proof of host execution. Actual checkpoints require successful GitHub writes and read-back verification; full branching, failure, and concurrency behavior still needs end-to-end validation.

## Historical material

Deleted working-tree files remain retrievable from earlier commits and release tags through Git history. They are **not active guidance** and must not be loaded or executed by default.
