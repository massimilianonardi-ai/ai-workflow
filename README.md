# AI Workflow — independent experimental workflow product

**Current source:** main, beginning at [bootstrap.md](bootstrap.md). The previous **v0.2.0** remains an immutable historical release at [release/2026-11-08-task-continuity](https://github.com/massimilianonardi-ai/ai-workflow/tree/release/2026-11-08-task-continuity). This repository is independent of RumiAI and other project-specific workflows.

This is a **model-readable operational workflow**, not a native ChatGPT feature, background agent, permission engine or automatic persistence service. It requires the host to provide actual source access, tool execution and authorized storage. Repository publication does not change ChatGPT Project Instructions.

## Operational entrypoint and methods

- [Bootstrap](bootstrap.md): outcome-first routing, task identity, decision/approval boundary, autonomous work, recovery, real delivery and truthful continuity.
- [Multidimensional open matrix](routing/intents.yaml) and [context resolution](routing/resolution.md): combine applicable intents, check provenance/contradictions and do not transplant another task's architecture.
- [Intent and usage](behavior/intent.md), [architectural decisions](behavior/decisions.md), [interactive design/development agreement](behavior/specification.md): ask consequential questions early and bind implementation to accepted use cases.
- [Execution](behavior/execution.md), [failure diagnosis](behavior/diagnosis.md), [evidence](behavior/evidence.md): work to the operator-visible outcome, recover from causal failures and stop rather than entering an infinite validation loop.
- [Research](behavior/research.md) and [independent review](behavior/review.md): produce justified conclusions and detect when an apparently correct artifact is solving the wrong task.
- [Task continuity](behavior/task-records.md) and [templates](templates/): state with explicit header/method refs, append-only log, last-written handoff and conditional design/development specification. Actual state lives under contexts/tasks.
- [Explicit commands](routing/commands.md): optional !aw grammar; diagnostic help/route never executes its payload.

## Delivery contract

For substantial design/development: identify the real use case and architectural boundaries, refine a single task-owned specification, obtain the operator's explicit approval of its scope, then **implement and deliver autonomously**. Once approved, procedi/go means continue authorized execution. Verify the actual requested product/result to the extent tools allow; no unrelated inherited test system is a completion requirement.

For all substantive tasks, maintain distinct current truth, historical events and next-step handoff using real verified writes. A missing writable store must be disclosed as **not persisted**. Resolve subject/task identity before using earlier chats or memory as task authority. Short self-contained user requests remain direct; administrative files are not a reason to hold up the answer.

## Installation

See [experimental ChatGPT Project instructions](deploy/chatgpt-project-instructions.md), which target the new opt-in release branch. Install manually in the intended project if desired; no host settings are modified by these repository commits. Source-level implementation alone cannot guarantee consistent model behavior, durable storage, cross-chat recall or automatic execution.

## Historical material

Earlier exploratory routing trials and failures remain under evaluations/ for provenance only; they are **not automatically inherited by current tasks**, are not a production test pipeline, and do not establish the behavior of this revision. Chat-exporter integration remains independent and undecided.
