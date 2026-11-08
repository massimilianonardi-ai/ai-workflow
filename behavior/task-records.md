# Universal per-task continuity and traceability

Status: experimental workflow method; applies **to every request type**, independent of the multidimensional intent selection. This method is not a testing pipeline.

## Ownership and storage

Use one stable, scoped logical task ID. Resolve whether the current request **continues the same objective** or starts a materially distinct task; same ChatGPT Project, same subject or same chat does not by itself prove identity. The initial experimental durable store is `contexts/tasks/<task-id>/` in this repository. A path is a storage convention, **not** an inferred hierarchy of scope or authority. Sanitize a task ID into a stable, non-colliding directory name; record the logical ID in the documents. Do not merge distinct tasks, invent historical decisions or overwrite somebody else's task.

For **every task**, keep these three files together:

- **`task-state.md`** — canonical **current** task meaning: outcome, boundaries, clarified distinctions, **accepted** decisions with origin, actual status and current dependencies. Do not copy discarded options, rejected proposals or the complete chat here. It may point to an additional specification when applicable.
- **`task-log.md`** — append-only **chronology** of meaningful user turns, assistant actions, questions/answers, design alternatives (including rejected ones), changes, errors, verifications and observed results. Use monotonic event IDs and source links/commit IDs when available. A log entry is evidence of a claim or event, **not** approval of its proposal.
- **`handoff.md`** — concise **restart checkpoint**: logical task and scope, current phase, latest durable log event and task-state revision, relevant approved specification/revision if any, real blockers, current approval/authorization boundary, **exact next authorized action** and links to sources. It is not a duplicate task state or the event log.

A fourth file, **`task-specification.md`**, is required when work genuinely includes **design or develop**: interactive refinement, principal use cases, checks derived from their expected outcomes and explicit user approval before substantive dependent implementation; see `behavior/specification.md`. Other intents can use this file when genuinely useful, but must not be forced into a design gate for routine work.

## Per-turn lifecycle

1. **Identify the task** from the current request, scope, explicit ID and compatible earlier evidence. If there is no defensible link, create a separate task rather than inheriting context. If a consequential ambiguity makes actions unsafe, clarify before dependent work.
2. **Read, then reconcile** the three existing records when continuing a task; for design/development also read the existing specification and approval evidence. Treat current user corrections as fresh evidence. If documents conflict, diagnose scope, revision, provenance and authority; never silently combine them.
3. **Initialize the three files** from `templates/task-state.md`, `templates/task-log.md`, `templates/handoff.md` on first engagement, keeping concise content for a single-turn or free-form request. User-visible response remains direct; these records are a behind-the-scenes durability concern, not a pretext for a questionnaire or long report.
4. **During a turn**, append material events to the log with a monotonic ID and provenance, including claimed vs actually observed tool outcomes. Update task-state **only** when the current agreed truth changes. Do not promote candidate ideas to accepted decisions without user evidence. In design/development, update the same specification and its use-case checks as clarifications arrive.
5. **At the task boundary / before finishing the turn**, update `handoff.md` last, after the state/log/specification changes are durable. Record exact latest event/revision, last actual outcome, any unresolved dependency and the next actionable step, or `none — task completed` when genuinely finished. For a trivial request the three files may each be a few lines.
6. **On new chat resumption**, use the task ID to retrieve `handoff.md` first, then the referenced `task-state.md`, `task-log.md` entries and `task-specification.md` as needed. The new chat resumes from the last **persisted, verified** checkpoint, not from an imagined unrecorded conversation. If a prior turn was not saved, disclose the gap.

## Provenance and exporter

Use stable IDs and links to exact source message or exporter archive **only if actually available**. Distinguish user approval from assistant interpretation, executed tool results from claims, and prior discarded proposals from current scope. When the user chooses how to integrate the separate chat exporter, it may archive original conversation content and supply immutable references for log entries. **No exporter availability, synchronization, background watcher or automatic chat extraction is assumed or required today.**

## Persistence and failure semantics

A text-only bootstrap **cannot guarantee** that ChatGPT exposes writable storage, intercepts every turn or can fetch previous private chats. Execute document writes only with real authorized capabilities; verify each write/read when possible and never claim completion when an operation failed. If durable writes are unavailable, maintain a clear Markdown fallback that can be handed to the user, label it **not persisted**, and explicitly report the limitation. Do not pretend that a URL, Project memory or a chat response itself constitutes a durable three-file checkpoint.

Do not import any unrelated legacy testing or validation process. Any outcome checks remain task-scoped and driven by user-agreed use cases. Historical documents do not become current authority merely by being linked.

## Mandatory state header and exact checkpoint contract

All new or updated task documents start with a compact YAML header. The canonical task-state.md header includes **id, kind, status, scope, subject, workflow_refs, state_refs and source/revision**; the task log, specification and handoff identify the same task ID and references. workflow_refs identify the methods actually needed for the task; state_refs identify explicit other contexts, with relationship and authority, rather than inferring hierarchy from the path. Existing older files without headers may be read as legacy input, but any substantive update upgrades them to the header contract; never invent a historical revision or an accepted decision.

On every resumption: (a) resolve exact task ID and scope; (b) fetch handoff first; (c) inspect its latest recorded event, source revision and approval boundary; (d) verify these refer to accessible state/log/specification; (e) reconcile with the **current** user request; (f) resume the exact next authorized work rather than repeating a completed step. If the handoff says to do something already done at a later verified revision, correct the checkpoint before using it. Task identity is not established by similar name, server count or Project membership.

Perform actual storage writes when tools permit, and read back or inspect returned write/revision results to avoid false persistence claims. Write current state after meaningful changes and append actual events to the log, then write handoff **last**; the handoff's file/revision pointers must refer to the files that now exist. If an external final action (e.g., creating a branch) happens after the checkpoint, update the task log and handoff again: no future task should be directed to repeat that action. If writes are denied/unavailable, do not silently skip persistence or claim automatic Project memory is sufficient; present a clearly not-persisted compact fallback and its restart limitations.

The routine records are maintenance of this workflow, not permission to modify a target service or execute the payload of !aw route. Administrative metadata for diagnostic !aw help/route is optional and must never violate the diagnostic's no-side-effect guarantee. For other simple requests, perform short record updates without interrupting the user or turning the answer into a specification interview. A task ID, task directory and state record are a stable logical identity, not a directory-derived project hierarchy.
