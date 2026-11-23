# State and checkpoint protocol — active

**Status:** active checkpoint protocol executed by the assistant through authorized GitHub tools. The mutable store is `massimilianonardi-ai/ai-work-state` on **`main`**; framework rules live in `ai-workflow`.

## Mandatory separation: checkpoint vs task state

**Conversation checkpoint: every assistant response.** Attempt one branch-head advance for *every* response, including no-task-change answers, diagnostics, clarifications and errors. Do this **before displaying the final marker**. Never interpret "no task modified" as "nothing to persist". The `!aw route` payload remains a dry run; saving administrative metadata does not execute the payload or grant new permissions.

**Task documents: only when genuinely changed.** Follow the [universal task model](task-model.md): every task has a stable identity, optional parent, and independent dependency edges, with no task-type hierarchy. Update the versioned baseline, current `task-state.md`, append-only `task-log.md`, and `handoff.md` only for an authorized change; write them in the same logical Git transaction as the branch checkpoint and any relevant event/snapshot. Validate any affected parent/dependency links, changed `tasks/roots.yaml` or `children.yaml` derived indexes (including an empty `children.yaml` on task creation), and any new immutable `plans/plan-NNN.yaml` before writing; do not load or rewrite unrelated tasks. Task progress rollups are computed on demand, not written into parent statuses. No task change and no meaningful conversation state change mean only the branch checkpoint needs writing.

**Host capabilities are decisive.** GitHub actions and permissions must exist in the actual chat. A Markdown bootstrap cannot intercept a native ChatGPT turn or force a missing tool to exist. If the user/host prohibits writes, obey that rule and mark the checkpoint as pending, never pretend it was stored.

## Required universal-finalization algorithm

1. Recover the latest **genuine marker from this conversation**, not a quoted marker from another chat. Establish `chat-id`, `branch-id`, source `message-id` and pending status. Generate a fresh UUID v4 and timestamp in the configured `time_zone` through available capabilities only when no identity is recoverable. Never invent either.
2. **Check for an authorized writable GitHub capability** targeting `massimilianonardi-ai/ai-work-state`, branch `main`. If unavailable, outcome is `storage_unavailable`. If available, **attempt the write** even when no task changed; do not stop at "no modifications".
3. Read the current configured state-branch commit SHA, the conversation branch YAML (or confirmed absence), and relevant verified state-change events or snapshots. Resolve `m` (source checkpoint) and `h` (persisted head). Apply [conversation identity](../doc/conversation-identity.md), including the branching and pending rules.
4. For current response `m+1`, prepare `conversations/<chat-id>/branch-N.yaml` with `created_at`, the next `message_id`, and known `tasks` associations, preserving the existing branch semantics. `tasks: []` means verified empty; `tasks: null` means unknown. Represent unrecoverable `pending` turns with `sync_gaps: [[first,last]]` and `synchronization: incomplete`, without inventing missing history.
5. For a verified significant state transition (including task-association changes, confirmed forks, or approved workflow decisions), add an immutable event under `conversations/<chat-id>/events/` tied to the branch and message checkpoint. For a handoff or where continuation needs context not supplied by task documents, save a concise snapshot under `conversations/<chat-id>/snapshots/`. Neither is mandatory for ordinary replies; the full chat transcript is not assumed available.
6. If task state really changed, include the relevant event and only affected authorized task documents, derived root/children indexes, and optional new immutable execution-plan version (handoff prepared logically last) in the **same** Git tree and commit as the branch checkpoint. Verify task IDs and relationships before writing. Otherwise, write only the branch checkpoint and any genuinely needed event or snapshot.
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

- Reconstruct prior state changes only from actually available evidence. Keep missing history explicit.
- If the marker and identity genuinely belong to this chat, an authorized next response may be checkpoint 5, with `tasks: null`, `sync_gaps: [[1,4]]` and `synchronization: incomplete`. Its marker **still has `sync = pending`** until the historical gap is resolved.
- If the marker is only **quoted in another conversation** (for example, diagnostic text), do not create that chat-id under live paths.
- A later response must preserve known gaps and avoid treating a higher remote counter as proof of a complete history.

## Execution capabilities

The assistant applies this protocol through the authorized GitHub capabilities available in the current conversation. Verify tool access and branch permissions before acting. When storage is unavailable, report `storage_unavailable` and preserve the pending marker. Project instructions define behavior; actual host permissions determine available operations.

## Authoritative state branch and visibility

The active write target is `massimilianonardi-ai/ai-work-state`, ref `refs/heads/main`. Verify this exact repository and branch before each checkpoint. All conversation branch, event, snapshot and authorized task-state updates are committed to this ref.

**Privacy:** the state repository is currently **public**. Do not persist confidential user data, secrets or sensitive task metadata until private visibility is configured. Use an appropriately protected repository before saving nonpublic content.
