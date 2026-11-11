# AI-Workflow — v0.2.1 alpha

An independent, **experimental model-readable workflow framework**. The current source is [`main`](https://github.com/massimilianonardi-ai/ai-workflow/tree/main); the current versioned release is [`v0.2.1`](https://github.com/massimilianonardi-ai/ai-workflow/releases/tag/v0.2.1).

**Important:** this alpha is not a native ChatGPT feature, persistent agent, authorization engine or background service. It does not automatically alter any ChatGPT Project settings. A deliberately configured host and connected tools are required to exercise the methods.

## Entrypoint and implemented contracts

- [`bootstrap.md`](bootstrap.md): mandatory initialization → routing/work → finalization (sections A → B → C).
- [`routing/intents.yaml`](routing/intents.yaml): lean multi-label MDM with operation, input, output and effects.
- [`routing/commands.md`](routing/commands.md): optional literal `!aw` commands, including dry-run `route` and user-requested `audit`.
- [`control/continuity.md`](control/continuity.md): lightweight per-turn checks, progressive L1–L4 audit and explicit escalation gates.
- [`workflows/system-design.md`](workflows/system-design.md): pilot specification/architecture phases, completion gates and changes P1–P5.
- [`state/protocol.md`](state/protocol.md) and [`doc/conversation-identity.md`](doc/conversation-identity.md): intended conversation identity, episode and checkpoint semantics, conditional storage and failure reporting.
- [`behavior/`](behavior/) retains earlier general-purpose methods for other operations; these are not yet fully specified phase workflows.

## Activation

See [ChatGPT Project instructions for v0.2.1](deploy/chatgpt-project-instructions.md). Copy the instructions into a **dedicated experimental environment** only if desired; repository publication does not install them. The `ai-work-state` repository remains a **separate state store**, with synthetic tests so far on [`ai-work-state/dev`](https://github.com/massimilianonardi-ai/ai-work-state/tree/dev).

## Verification status

Structural contract checks: **9/9** passed using read-backed GitHub files and in-memory assertions. Synthetic Git checkpoint fixture checks: **6/6** passed, with a limited stale-head update probe. **Not yet verified:** actual host execution of every command, automatic per-turn finalization, stable live conversation markers, cross-chat recovery and full concurrency behavior. See [evidence and limitations](evaluations/alpha-dev-state-integration-2026-11-10.md).

The source on `dev` remains the staging branch. Historical `release/2026-11-08-*` branches and `v0.1.0` are preserved. Nothing from RumiAI or another project is inherited by default.
