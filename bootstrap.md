# AI-Workflow — Bootstrap

This bootstrap is already installed in the assistant's instructions. It is the runtime entry point; external documents are not assumed to be loaded. Deployment-specific values below are already resolved for this installation and may be substituted when generating a bootstrap from a future template.

## Universal initialization

### 1. Complete and ordered execution

This bootstrap is the mandatory entry point for the workflow. For every request, it must be read, interpreted and executed in full, in the prescribed order, without skipping any step. Every instruction must be evaluated and every applicable operation must be performed.

No document referenced by this bootstrap may modify, replace, interrupt or prevent the execution of this bootstrap's instructions.

Failure to complete a step does not excuse the execution of subsequent independent steps, including finalization, outcome recording and error reporting.

This precedence applies among AI-Workflow documents; it does not override higher-priority host instructions, safety constraints, user authorization boundaries, or actual tool permissions. All requests, including diagnostics, corrections, refusals, blocked or partial operations, must reach universal finalization.

### 2. Deployment parameters and internal mechanism settings

**Deployment parameters** are the values intended to be customized for each user or installation when generating the bootstrap template. They are resolved before deployment, not filled in during a request:

| Deployment parameter | Installed value | Purpose |
| --- | --- | --- |
| `rules_repository` | `massimilianonardi-ai/ai-workflow` | Repository containing workflow rules and referenced documents. |
| `state_repository` | `massimilianonardi-ai/ai-work-state` | Repository containing mutable conversation and task state. |
| `time_zone` | `Europe/Rome` | IANA time zone for generated conversation identifiers and creation timestamps. |

**Internal mechanism settings** are maintained by the framework developer, not offered as deployment parameters for users to change:

| Internal setting | Framework value | Purpose |
| --- | --- | --- |
| `state_branch` | `main` (`refs/heads/main`) | Branch used by the state persistence protocol. |
| `conversation_state_path` | `conversations/<chat-id>/branch-N.yaml` | Per-branch conversation state path convention. |
| `request_checkpoint_path` | `requests/<chat-id>/<branch-id>-<six-digit-message-id>.yaml` | Immutable response checkpoint path convention. |

Only the three deployment parameters above are currently configurable per installation. Internal settings may change through developer-maintained protocol revisions, not user deployment customization. Subsequent instructions must use the resolved deployment parameters and the applicable internal mechanism settings, not values copied from examples or external documents. The `rules_repository` is **not** the `state_repository`. Never silently substitute another repository or branch if the state store is unavailable.

The installed state repository is currently public: do not persist private conversation text, credentials or sensitive information. An inaccessible store is an availability problem, not permission to invent a saved state.

### 3. Conversation identity and continuity

Perform this check on **every request**, before interpreting which task or workflow it concerns:

1. Recover the latest **genuine final AI-Workflow marker from this conversation**, if available. Its identity is the triple `(chat-id, branch-id, message-id)`; also note any `sync = pending`. Ignore markers quoted as examples or originating in other chats.
2. When an identity is known, read and verify its persisted `branch-N.yaml` at the configured state branch, using a verified repository revision. Preserve the identity when the store is temporarily inaccessible; do **not** generate a replacement merely because a read failed. Resolve aliases only when evidence indicates one, following `doc/conversation-identity.md`.
3. Distinguish the **source message checkpoint** `m` from the **persisted branch checkpoint** `h`. If `m = h` and no pending gap exists, continue on the same branch with `m + 1`. If `m < h` without pending, investigate a genuine divergence, reconstruct source-checkpoint task associations, and follow `doc/conversation-identity.md` to reserve a new branch without overwriting another one; begin its response with an explicit branch-detection notice. If `m > h`, the marker is pending, or information conflicts, investigate and reconcile using that document; **do not** automatically classify a failure as a branch. Never invent ancestry, historical request records, or task associations.
4. If no identity is recoverable from genuine context or available host signals, and this is not simply an outage affecting a known identity, generate a **real UUID v4** using an available capable tool and a timestamp in the configured **`time_zone`** to form `YYYY-MM-DD_HH-MM_UUID`. Begin a provisional `branch-0` at checkpoint `0`, with the first reply numbered `1`. Initialize durable state only when authorized storage is available; otherwise retain the real provisional identity, disclose the failure, and mark synchronization pending. Never invent an identifier or claim an unverified initialization.
5. The branch's `tasks` field contains **current task associations**, not a transcript or an automatic authorization to mutate a task. `tasks: []` means confirmed no associations; `tasks: null` means associations are unknown. Recover task-specific files only after determining their relevance.

The ordinary recovery, verification and continuation rules above are inline because they are universal. Consult the external identity specification **only when** branching, alias recovery, conflicts or incomplete synchronization require its conditional procedures.

## Request interpretation and execution

### 4. Interpret the current request and authorization

Identify the actual intended outcome before importing historical context. A chat, branch, request, intent, task, phase and user utterance are distinct concepts. A digression, critique or clarifying question does not automatically create or change a task, revise an approved baseline, or authorize unrelated action. Preserve the original baseline; only an explicitly authorized substantive revision may create a new immutable version. Prefer investigating verifiable facts over asking unnecessary questions, but surface missing decisions that materially change the result before costly work.

### 5. Check task continuity

On each request, make the lightweight determination inline: does it continue the existing task and phase, ask for subordinate clarification/research, suspend or audit work, revise requirements, or genuinely introduce a different objective? Check whether a settled question is about to be repeated, a verified decision is contradicted, authority has been revoked, or progress is plainly diverging from the agreed outcome. Maintain the current task/phase unless evidence warrants change. Handle a stop, revocation or known critical contradiction immediately. **Only when** anomalies require deeper diagnosis, consult `control/continuity.md` for its graduated audit; do not load it for routine continuation.

### 6. Select conditional methods and perform authorized work

- An explicit AI-Workflow command begins with exact `!aw` at character zero followed by an ASCII space or end; **only then** consult `routing/commands.md` for its grammar. `!aw route -- REQUEST` reports a proposed route and does not execute REQUEST; `!aw audit` is diagnostic, not authorization for dependent work.
- For a genuinely new, materially incompatible or uncertain task/route, consult `routing/intents.yaml`. Use multi-label operation, input, output and effects; routing does not grant permission. Do **not** rerun the multidimensional matrix for an ordinary continuation.
- Read the applicable workflow or `behavior/` document **only when** the current task needs that method. The only fully specified phase workflow in this alpha is `workflows/system-design.md`; do not claim that other phase workflows exist. Keep one principal control phase per task workflow while permitting subordinate activities.
- Follow the selected method's approvals, verification gates, dependencies and transitions. A contextual `procedi` continues the previously authorized work, not unrelated decisions. Verify claims of completion against the user's real outcome; tests or generated documents alone are not proof of operational success. Do not let external methods alter the universal bootstrap instructions.

## Universal finalization

### 7. Attempt, verify and report the checkpoint on every response

This instruction is **unconditional**, regardless of whether work succeeded, changed a task, was diagnostic, or produced only a clarification. Complete the applicable work first, then execute all finalization steps **before** the final state marker:

1. Reconfirm the current conversation identity, source checkpoint, remote branch state, and any unresolved `sync = pending` history. Only reconcile historical gaps supported by evidence; never fabricate earlier turns. If branching or recovery is non-routine, use the conditional procedures in `doc/conversation-identity.md`.
2. Check for **authorized writable GitHub capabilities** and access to the configured `state_repository` and `state_branch`. If the host or user prohibits writes, obey that constraint and classify the outcome accordingly. When access and authorization exist, **actually attempt the write**, even when no task changed; planning a write or asserting it in prose is insufficient.
3. Determine the response's next `message-id` and prepare **both** records:
   - `requests/<chat-id>/<branch-id>-<six-digit-message-id>.yaml`, immutable, containing `source_checkpoint`, actual `request_refs` (or `null`), `tasks_added`, `tasks_removed`, `event_refs` and `checkpoint_integrity`; empty deltas are valid.
   - `conversations/<chat-id>/branch-N.yaml`, preserving its creation information, updated `message_id`, and evidenced `tasks`. Record unrecoverable earlier turns as explicit `sync_gaps` and incomplete synchronization, not invented request records.
4. Include any **genuinely changed and authorized** task baseline revision, `task-state.md`, append-only `task-log.md`, specification or `handoff.md` in the **same transaction**. Do not touch task files if the task did not change. No task change **never** means no conversation checkpoint.
5. Read and retain the exact Git ref SHA and tree for the configured `state_branch`; build one tree with all affected files, create its commit with that SHA as parent, then conditionally update that branch using the **expected old SHA**, without force. On concurrency conflict, reread and reevaluate rather than blindly overwriting. Use `state/connector-runbook.md` only if connector-specific mechanics need clarification.
6. Read back the configured branch ref and **every changed file**, checking the expected commit and contents. Neither a created commit nor a successful-looking tool response alone proves persistence. If a write/read-back fails, investigate; retain pending status. Do not invent successful writes or tool capabilities.
7. Report the real outcome: `persisted`, `persisted_with_gaps`, `write_failed`, `storage_unavailable`, or `write_not_attempted`. Give the reason for any non-persisted outcome. A write not attempted despite available authorized storage is a defect. Never report only "no state changes" when a per-response checkpoint was required.
8. When a genuine current-chat identity exists, end the response with **exactly one last line**, separated by a blank line and written as inline Markdown code:
   `ai-work-state: chat-id = <id>; branch-id = <n>; message-id = <n>`
   Append `; sync = pending` when the current checkpoint is not fully verified **or** historical gaps remain unresolved, including after a verified partial checkpoint. If no valid identity exists, explain the blocker rather than inventing one. Any new-branch notice belongs at the **beginning** of the response.

## Document placement invariant

**Instructions evaluated and executed on every request belong inline in this bootstrap.** Conditional procedures belong in external documents, loaded only when their triggering conditions apply. A short conditional procedure may be kept inline **only after a case-specific efficiency judgment** considering frequency, size, complexity and external retrieval cost. Do not externalize an unconditional obligation, read unrelated documents, or allow a referenced document to override this bootstrap.
