---
id: task:ai-workflow-design-development
kind: task
status: implemented_in_repository
scope: massimilianonardi-ai/ai-workflow
subject: experimental AI workflow
workflow_refs:
  - behavior/intent.md
  - behavior/decisions.md
  - behavior/specification.md
  - behavior/execution.md
  - behavior/evidence.md
  - behavior/task-records.md
  - behavior/research.md
  - behavior/diagnosis.md
  - behavior/review.md
  - routing/resolution.md
state_refs: []
source:
  authority: verified_user_task
  revision: main
---

# Task state — AI workflow design/development and continuity

Task ID: `task:ai-workflow-design-development`  
Status: **implementation delivered on main and fixed experimental release branch; ChatGPT Project settings unchanged**  
Scope: `massimilianonardi-ai/ai-workflow`, experimental model-readable bootstrap  
Updated: 2026-11-08

## Current objective

Deliver the actual ai-workflow method starting at bootstrap.md: resolve intended user outcomes before architecture, identify the right task and prior context, elicit consequential decisions early, execute approved development autonomously to a usable result, investigate/recover from repeated failures, research and review independently, and preserve exact cross-chat continuity. Maintain the existing multidimensional matrix and explicit approval boundary; introduce no unrelated test suites.

## Accepted scope and distinctions

- The multidimensional matrix is the routing model; intent combinations may include design, development, research, validation and other operations. No replacement by an exclusive routing taxonomy.
- For each stable task identity, store `task-state.md`, `task-log.md`, `handoff.md` in `ai-workflow/contexts/tasks/<task-id>/`. Update existing records on continuation; do not silently merge separate tasks.
- `task-state.md` is **current truth** (goal, scope, refinements, accepted decisions); `task-log.md` is **chronological history** (actions, questions, alternatives, corrections, errors and check evidence); `handoff.md` is the **last verified resume checkpoint** and next step.
- A fourth `task-specification.md` applies to genuine design/development, not to every trivial request; its accepted revision requires explicit operator approval before dependent substantive implementation.
- Every task, including simple/free-form/one-turn requests, gets the three core records, with contents proportional to complexity and no unnecessary user questions.
- Task-specific checks come from its own agreed use cases; no dependency on a previous project's generalized tests, verification processes or inherited backlog.
- The chat exporter is being reimplemented and **has no required integration now**. Do not claim automatic archiving, background synchronization or access to unavailable conversations.
- Current work changes **only** the experimental repository; no existing ChatGPT Project settings, production system or RumiAI product contracts are activated by these commits.
- Persist only with real authorized storage capabilities; report missing writes or inaccessible prior state and never invent continuity.

## Accepted decisions

| ID | Current decision | Authority |
| --- | --- | --- |
| D-01 | Preserve the multidimensional multi-intent matrix for all requests. | User correction, current project conversation |
| D-02 | Require conversational refinement to principal use cases and observable checks for genuine design/development. | User directive, 2026-11-08 |
| D-03 | Require **explicit operator go-ahead** for the specific approved specification before substantive implementation. | User confirmation, 2026-11-08 |
| D-04 | For **every task** keep separate `task-state.md`, `task-log.md` and `handoff.md`; use task-specific `task-specification.md` when design/development applies. | User directive, 2026-11-08 |
| D-05 | Use `ai-workflow/contexts/tasks/` as initial experimental task-document store; implement the proposed roles. | User message `si approvo tutto, procedi`, 2026-11-08 |
| D-06 | Leave exporter integration undecided and non-blocking. | User directive, 2026-11-08 |
| D-07 | Earlier `procedi` is authorization to execute, implement and release the approved experimental work; do not ask for redundant permission. | Explicit operator correction, 2026-11-08 |

## Actual state and references

- Experimental routing/bootstrap design and interactive specification method exist in the repository.
- The universal task-record method and templates are implemented. The bootstrap, commands, resolver and README reference them; this task is registered for direct resume. Previous focused readbacks checked 15/15 task references and 10/10 checkpoint pointers; these are document checks, not ChatGPT runtime enforcement.
- Release notes and a ready-to-paste Project Instruction have been published in `releases/2026-11-08-task-continuity.md` and `deploy/chatgpt-project-instructions.md`. Final frozen branch will identify the released snapshot.
- Source specification: `task-specification.md`, explicitly approved for implementation of this documentation architecture, **not** a claim of real host enforcement.
- Task chronology: `task-log.md`, persisted with event IDs and commit/source references.
- Resume pointer: `handoff.md`, published **as the final per-task write** after this state and its log are updated.

## Active boundaries

- The user has authorized release and experimental activation. No available ChatGPT Project-settings write capability exists in this chat; GitHub publication does **not** change that setting. A Markdown instruction alone cannot guarantee automatic creation or update for each user request.
- No new legacy validation apparatus is to be imported; checks should be small and tied to this task's use cases.

## Current operator implementation order — 2026-11-08

- The operator explicitly requested implementation of everything needed from bootstrap.md to address the complaints in the prior conversations, with **no testing program or collateral activities**.
- Existing constraints still apply: retain the multidimensional matrix; do not import legacy project validation; do not equate passing internal checks with delivery; do not ask for another approval for already authorized work.
- Product methods implemented on main in commit 19f23d87db496f9edd09a7fd86995012a5d12bee: outcome-first routing; architectural decision checkpoint; approved specification; autonomous execution; causal diagnosis; effective research; independent review; evidence grounded in user-visible outcomes; stronger continuity rules.
- This task update adds consistent state-document headers, real task context and a restart checkpoint. This remains a **model-readable GitHub workflow product**, not a guarantee of host tool capabilities, automatic writes or client activation.

## Delivery checkpoint

- Core workflow product committed as 19f23d87db496f9edd09a7fd86995012a5d12bee.
- State-header/template, specification, context registry, README and install instructions committed as de4d4bcd283900098ddf3004430f4b76c2cf598c.
- The frozen release branch release/2026-11-08-outcome-first has been created from the implementation and will receive the final log/handoff checkpoint.
- No client settings were changed, and no new tests, evaluations, runtime harnesses or automatic chat-exporter integrations were created.
- Actual output of this task: updated model-readable workflow files and task continuity in the repository. Host-level behavior and automatic execution remain contingent on client tools; those are not represented as installed.
