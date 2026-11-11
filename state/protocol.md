# State and checkpoint protocol — v0.2.1 alpha

**Status:** pilot interface and recovery method, not proof that storage exists. The authoritative persistent data belongs in `massimilianonardi-ai/ai-work-state`. Follow the approved `doc/conversation-identity.md` for identity/branch semantics. A one-time technical initialization of that repository's `main` was explicitly authorized and completed. All subsequent experimental records and fixtures belong on `dev`.

## Minimal logical records

- **Conversation branch:** `conversations/<chat-id>/branch-N.yaml`: creation timestamp with Europe/Rome offset, `message_id`, verified source/parent fork metadata if applicable, active task associations. The path carries the chat/branch ID; do not needlessly repeat it in YAML.
- **Request/checkpoint delta:** a unique idempotent record, by chat/branch/message, of request reference(s) genuinely available, task associations added/removed and relevant event references. Required to reconstruct task associations from the *fork point*, not from the parent's current branch head. The physical `requests/` layout is alpha-provisional pending formal approval.
- **Task baseline:** immutable versioned scope, objective and authorization-relevant constraints; new version only after explicit approval.
- **Current task state:** active workflow/phase, current **episode** and microactivity, criteria/status, dependency validity, estimates, accepted decisions and references.
- **Task event log:** append-only events, relevant human turns/actual agent steps, progress/blocker, verification, revision, audit, transition; retain evidence source and original forecast if revised.
- **Handoff:** latest verified source revisions, exact next authorized action/phase and blockers; update last among task documents, not a substitute for state/log.

The minimal proposed pilot layout is `conversations/`, `requests/`, `tasks/` (with baseline, state, log, handoff; specification only when needed). This layout is **dev-only and provisional**: not an approval of the previously deferred complete `ai-work-state` schema. Do not create duplicate registries/cache without a demonstrated need.

## Identity and branch handling

Recover a genuine latest marker in this chat, read canonical branch head and compare source message checkpoint `m` with stored `h`:
- `m == h`, no pending: continue, update to `m+1`.
- `m < h`, no pending: possible divergence; reconstruct task associations at source checkpoint and **conditionally** reserve the next branch ID; notify of the detected divergence at the beginning of the new branch reply.
- `m > h`, pending, missing data or contradictory refs: reconcile; **do not** declare an unrelated new branch or invent lost events.
- No reliable identity: generate a real UUID v4 if a supporting tool is available; set initial branch 0 and checkpoint 0, create conditionally if the remote store permits. If storage cannot be confirmed, retain a provisional identity and mark pending, never assert it was saved.

Use the exact final marker contract in `doc/conversation-identity.md`. A marker is not a verified Git write. Do not use illustrative IDs/UUIDs as if they were real.

## Writes and concurrency

When GitHub supports it, prefer **one Git tree/commit** for all changes in a logical checkpoint and update the `dev` branch with a compare-and-swap/expected-head condition; include request association changes, affected task state/log/handoff and branch checkpoint. An independent multi-file sequence via separate GitHub contents writes is **not atomic**. Use conditional creation for new branch files and immutable baselines; never overwrite on collision.

On conflict reread/recompute from verified checkpoint, do not force-push over another response. On indeterminate write reread to distinguish success from failure. Treat partially saved state as inconsistent, mark pending and disclose the exact gap. Do not silently retry after missing evidence.

Only report persistence complete after read-back of the branch checkpoint and relevant updated task references. If the store's `dev` branch cannot be created/accessed, continue permitted work but label continuity **NOT PERSISTED**, and use `sync = pending` with a legitimately established identity.

## Environment-specific limitation

A model-readable Markdown bootstrap cannot intercept every response, provide an always-on event loop, generate a UUID v4 without a suitable tool, or guarantee persistence across chats. `!aw audit` is a command interpreted by the model when this branch's bootstrap is active; it is not a native ChatGPT command.

**Preparation status:** `ai-work-state/main` now contains only the authorized technical initialization README, and its `dev` branch has been created. Synthetic checkpoint writes, branch reconstruction and read-back have been demonstrated on `dev`. A stale expected-head update failed without moving the branch, but the connector returned a generic error, so full concurrency behavior needs further tests. This does **not** establish real host-wide conversation tracking or automatic persistence.
