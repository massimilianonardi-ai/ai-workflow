# AI Workflow v0.2.0 — Task continuity and approved development

Date: **2026-11-08**  
Delivery: **experimental Git branch** `release/2026-11-08-task-continuity`  
Audience: experimental ChatGPT Project and other opt-in, GitHub-capable clients  
Status: **repository release; client activation remains an explicit separate operation**

## Delivered scope

- Preserve the original **multidimensional multi-intent** classifier. No exclusive path hierarchy replaces the routing matrix.
- For each logical task, three separate durable records in `contexts/tasks/<task-id>/`: `task-state.md` contains only accepted current objectives and decisions; append-only `task-log.md` preserves activity, corrections, rejected alternatives and actual evidence; `handoff.md` is the last-written exact restart checkpoint with linked content revisions.
- For actual design/development, interactively refine one `task-specification.md` containing important use cases, expected outcomes and task-scoped verification scenarios; **explicit operator approval of the relevant specification revision** is required before substantive dependent implementation.
- After approval, proceed autonomously within the established boundaries; verify genuine use-case outcomes, stop at sufficient evidence or a genuine blocker, and do not inherit unrelated testing systems.
- A task's chat/project proximity does not itself prove identical task identity; contradictory task state requires reconciliation.
- The chat exporter stays separate and undecided.
- Persistent writes require actual available read/write tools; failed/unavailable writes must be disclosed, not treated as success.

## Release files

- `bootstrap.md`
- `routing/intents.yaml`, `routing/resolution.md`, `routing/commands.md`, `routing/index.yaml`
- `behavior/task-records.md`, `behavior/specification.md`, `behavior/execution.md`, `behavior/evidence.md`
- `templates/{task-state,task-log,handoff,task-specification}.md`
- `contexts/tasks/ai-workflow-design-development/{task-state,task-log,handoff,task-specification}.md` — a real completed repository task with a durable checkpoint
- `deploy/chatgpt-project-instructions.md` — ready-to-copy opt-in Project bootstrap pointer

## Narrow acceptance evidence

Previous repository readback checked **15/15** task-document references and source invariants, and subsequent readback checked **10/10** cross-file pointers and handoff state on the earlier commit. The release process must confirm the current branch readback and document linkage once more after final changes. These checks are **document-level**, not executed evidence that ChatGPT will consistently create files in every new conversation. No existing ChatGPT Project was remotely reconfigured by repository writes.

## Installation/activation boundary

The connector available in chat can write to GitHub, but cannot modify ChatGPT Project Instructions. To opt in, install the exact content in `deploy/chatgpt-project-instructions.md` in the intended **experimental** Project, with permitted GitHub access. Do not replace the currently active RumiAI Project instructions by inference. A frozen release branch points to the reviewed repository snapshot; its exact SHA is published separately in the delivery report.

## What is intentionally not in this release

- No legacy RumiAI testing/validation machinery, generalized pipeline or indefinite test backlog.
- No automated conversation-exporter integration.
- No background action, invisible Project settings mutation, guaranteed model compliance, or cross-chat persistence without actual supported tools.
- No new exclusive free/develop/research categories.
