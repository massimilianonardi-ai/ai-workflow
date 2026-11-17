# State and checkpoint protocol — active

**Status:** assistant-executed checkpoint protocol through authorized GitHub tools. Former deterministic prototypes have been removed from the active tree and remain recoverable through Git history. The mutable store is `massimilianonardi-ai/ai-work-state` on **`main`**. The framework rules live in `ai-workflow`, and its historical test fixtures are not live checkpoints.

## Mandatory separation: checkpoint vs task state

**Conversation checkpoint: every assistant response.** Attempt one new request record and one branch-head advance for *every* response, including no-task-change answers, diagnostics, clarifications and errors. Do this **before displaying the final marker**. Never interpret "no task modified" as "nothing to persist". The `!aw route` payload remains a dry run; saving administrative metadata does not execute the payload or grant new permissions.

**Task documents: only when genuinely changed.** Follow the [universal task model](task-model.md): every task has a stable identity, optional parent, and independent dependency edges, with no task-type hierarchy. Update the versioned baseline, current `task-state.md`, append-only `task-log.md`, and `handoff.md` only for an authorized change; write them in the same logical Git transaction as the request/branch checkpoint. Validate any affected parent/dependency links, changed `tasks/roots.yaml` or `children.yaml` derived indexes, and any new immutable `plans/plan-NNN.yaml` before writing; do not load or rewrite unrelated tasks. Task progress rollups are computed on demand, not written into parent statuses. No task change means only the request record and branch checkpoint need writing.

**Host capabilities are decisive.** GitHub actions and permissions must exist in the actual chat. A Markdown bootstrap cannot intercept a native ChatGPT turn or force a missing tool to exist. If the user/host prohibits writes, obey that rule and mark the checkpoint as pending, never pretend it was stored.

## Required universal-finalization algorithm

1. Recover the latest **genuine marker from this conversation**, not a quoted marker from another chat. Establish `chat-id`, `branch-id`, source `message-id` and pending status. Generate a fresh UUID v4 and timestamp in the configured `time_zone` through available capabilities only when no identity is recoverable. Never invent either.
2. **Check for an authorized writable GitHub capability** targeting `massimilianonardi-ai/ai-work-state`, branch `main`. Do not use `dev` as a fallback. If unavailable, outcome is `storage_unavailable`. If available, **attempt the write** even when no task changed; do not stop at "no modifications".
3. Read the current configured state-branch commit SHA, the conversation branch YAML (or confirmed absence), and necessary request history. Resolve `m` (source checkpoint) and `h` (persisted head). Apply [conversation identity](../doc/conversation-identity.md), including the branching and pending rules.
4. For current response `m+1`, prepare immutable `requests/<chat-id>/<branch-id>-<six-digit-message-id>.yaml` containing actual `request_refs` (or `null` if host source references are unavailable), `source_checkpoint`, `tasks_added`, `tasks_removed`, `event_refs` and `checkpoint_integrity`. Write this record even if all change lists are empty. Do not invent message references.
5. Prepare `conversations/<chat-id>/branch-N.yaml` with `created_at`, `message_id`, and known `tasks` associations. `tasks: []` means verified empty; `tasks: null` means unknown. To record older unrecoverable `pending` turns, use `sync_gaps: [[first,last]]` plus `synchronization: incomplete` instead of fabricating old request records.
6. If task state really changed, include only the affected authorized task documents, derived root/children indexes, and optional new immutable execution-plan version (handoff prepared logically last) in the **same** Git tree and commit. The active plan pointer is stored on the owning task. Verify integrity and permissions of all referenced task IDs and edges before creating the tree. If not, just branch and request records.
7. Publish via Git tree, commit and **conditional expected-head update** without force, then reread the configured state branch and every changed record. Follow [connector runbook](connector-runbook.md). A dangling commit or an emitted text marker is **not** persistence.
8. Report the actual status and the next message marker. If write or read-back fails, do not claim it succeeded; preserve `sync = pending`.

For `m = h` continue as `m+1`. At the next checkpoint attempt, `m < h` plus verified independent continuation of the same canonical branch establishes **branch divergence**, without requiring continuous synchronization or complete recovery of unrelated missing history. For `m > h`, investigate lag or lost writes rather than overwriting. For `sync = pending`, reconcile enough evidence to distinguish an actual fork from missing persistence; never treat pending or a counter mismatch alone as proof of a branch.

## Required persistence outcomes

| Outcome | Meaning | Final marker |
| --- | --- | --- |
| `persisted` | Git ref and all required files verified, no unresolved historical gap | No `sync = pending` |
| `persisted_with_gaps` | Current checkpoint verified but earlier pending turns unrecovered | Keep `sync = pending` |
| `write_failed` | Git action attempted but rejected, failed or read-back mismatched | Keep `sync = pending` |
| `storage_unavailable` | No authorized writable GitHub capability / branch in this host | Keep `sync = pending` |
| `write_not_attempted` | No write attempted (including explicit user/host no-write instruction) | Keep `sync = pending` |

**`write_not_attempted` when storage is available and authorized is a finalization defect**, not a successful outcome. Never report only "Persistenza: nessuna modifica effettuata"; identify the outcome and its reason. Administrative metadata for a diagnostic is not execution of the diagnostic payload.

## Recovery of an earlier pending checkpoint

If a genuine source marker says `branch-id=0, message-id=4, sync=pending` but the remote branch does not exist, **do not fabricate checkpoints 1–4**.

- Reconstruct historical requests only from actually available evidence. Keep missing history explicit.
- If the marker and identity genuinely belong to this chat, an authorized next response may be checkpoint 5, with `tasks: null`, `sync_gaps: [[1,4]]`, a real request record for message 5 and `synchronization: incomplete`. Its marker **still has `sync = pending`** until the historical gap is resolved.
- If the marker is only **quoted in another conversation** (for example, diagnostic text), do not create that chat-id under live paths.
- A later response must preserve known gaps and avoid treating a higher remote counter as proof of a complete history.

## Execution scope and deferred prototype

The assistant directly applies this protocol using authorized GitHub capabilities. Do not invoke or depend on auxiliary deterministic helper runtimes for current operations. Historical prototypes and tests are available through Git history, not in the active tree; they do not establish live execution, automatic invocation, or branch-handling coverage.

Verify actual GitHub tool access and branch permissions before acting; do not assert that a tool is unavailable without checking the currently exposed capabilities. If authorized write capabilities are genuinely absent, report `storage_unavailable` rather than pretending to persist. A Project instruction alone does not grant connector permissions.

## Authoritative state branch and visibility

The sole active write target is `massimilianonardi-ai/ai-work-state`, ref `refs/heads/main`. Before any actual checkpoint, verify that repository and branch. A Git adapter targeting `dev` or another repository must be rejected rather than silently writing elsewhere. `dev` contains older test fixtures and is not a live persistence destination. All new real conversation branch, request, or task state updates belong on `main`.

**Privacy:** the state repository is currently **public**. Do not persist confidential user data, secrets or sensitive task metadata until private visibility is configured. Repository visibility was not changed by this correction.
