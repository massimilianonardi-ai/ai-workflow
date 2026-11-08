# Task state — AI workflow design/development and continuity

Task ID: `task:ai-workflow-design-development`  
Status: **experimental repository method implemented; not activated in a ChatGPT client**  
Scope: `massimilianonardi-ai/ai-workflow`, experimental model-readable bootstrap  
Updated: 2026-11-08

## Current objective

Make the existing **multidimensional, multi-intent** AI bootstrap effective for genuine design/development tasks: refine incomplete requests interactively into one approved `task-specification.md` with user-relevant use cases and outcome checks; after explicit user go-ahead, work as autonomously as possible. In addition, preserve enough distinct durable task records for **every request type** to resume correctly across chats.

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

## Actual state and references

- Experimental routing/bootstrap design and interactive specification method exist in the repository.
- The universal task-record method and templates have been committed. The bootstrap, commands, resolver and README now reference them; the selected task is registered for direct resume. Readback and focused structural assertions have been performed (13 checks passed after correcting one faulty matcher).
- Source specification: `task-specification.md`, explicitly approved for implementation of this documentation architecture, **not** a claim of real host enforcement.
- Task chronology: `task-log.md`, persisted with event IDs and commit/source references.
- Resume pointer: `handoff.md`, published **as the final per-task write** after this state and its log are updated.

## Active boundaries

- No general cross-chat background mechanism is installed; Markdown instructions alone cannot guarantee automatic creation or update for each user request.
- No new legacy validation apparatus is to be imported; checks should be small and tied to this task's use cases.
