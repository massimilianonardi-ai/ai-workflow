# GitHub connector write procedure for section C

**Purpose:** execute a real per-response conversation checkpoint, even if no task changed. This document is an **action recipe**, not a background service. Use the authorized GitHub connector in the *actual* host conversation. Required repo: `massimilianonardi-ai/ai-work-state`, branch `main`.

## Tool capability preflight (mandatory)

Check whether the current host exposes **writable** GitHub tools, not just read-only web browsing. In ChatGPT with the GitHub connector, relevant operations may be named `fetch` / `fetch_file`, `create_tree`, `create_commit` and `update_ref`. Do not assume these tools are present merely because the bootstrap is readable. Check that the connector can actually read `ai-work-state/main` and is authorized to write there.

If write tools are absent, report `storage_unavailable`. Do not report "no task changes" as the reason for missing storage. If tools are present and writes are permitted, invoke them; otherwise `write_not_attempted` must be justified, not silently treated as success.

## Actual transaction (no-task-change example)

1. Read `refs/heads/main`, capturing its exact SHA `H`. Read the commit at `H` and capture its tree SHA.
2. Recover the current chat's genuine marker and read `conversations/<chat-id>/branch-N.yaml` at **exactly `H`**. A 404 from the confirmed repository is different from an unreachable connection. Check any existing immutable request path before creation.
3. Compute the next response checkpoint using `state/checkpoint-runtime.mjs` or equivalent conservative planning, including the `sync_gaps` rule for earlier pending messages. Preserve existing task associations (or mark `tasks: null` when genuinely unknown).
4. **Even if no task changed, include TWO files:**
   - `conversations/<chat-id>/branch-N.yaml`: existing creation date, updated response counter, task associations and gap information.
   - `requests/<chat-id>/N-00000M.yaml`: source counter, actual request refs or null, empty task deltas if unchanged, integrity status.
5. If task state changed, add **all affected task files** in the same transaction; do not use the no-task-change helper to discard such changes.
6. Call the GitHub connector's **create_tree** with `base_tree_sha` from `H` and the intended file contents, then **create_commit** with `parent_sha=H` and the new tree.
7. Call **update_ref** for `ai-work-state/main` using the exact `expected_sha=H` and `force=false`. A create_commit response alone does not publish anything. On collision/rejection, read the new head and reevaluate; do not blindly retry or force overwrite.
8. Read the new `main` ref and both changed files **from that ref**, compare against the intended contents, and inspect task files if changed. Only then report `persisted`, or `persisted_with_gaps` if earlier history remains unrecovered.

Tool signatures can vary between hosts; select available actions matching these operations rather than assuming the model always has a particular connector. Do not expose credentials in chat.

## Diagnostic outcomes

- `persisted` — conditional ref update and content read-back both verified; no unresolved gaps.
- `persisted_with_gaps` — current checkpoint really saved; historical pending gaps still visible. Keep `sync = pending` in the marker.
- `write_failed` — at least one write was attempted but failed, or the result could not be verified. A generic connector error is not proof of a particular conflict type.
- `storage_unavailable` — no writable authorized connector or branch in this host.
- `write_not_attempted` — write was not attempted; disclose the actual reason, particularly if access existed.

Do not invent a missing old event or write a checkpoint under an ID **quoted from a different conversation**. If a marker 0/4 is pending and the remote branch is absent, a *genuine* next response may be saved as 0/5 with `sync_gaps: [[1,4]]` and `tasks: null`. This is partial recovery, **not** proof messages 1–4 were saved.

## Manual verification scenario

In an **experimental ChatGPT conversation** with the v0.2.3 bootstrap **installed as Project instructions** and GitHub write permission, send two ordinary messages with no task changes. For each response expect one new `requests/...` file and an incremented `branch-0.yaml` on `ai-work-state/main`. Confirm the files on GitHub. Then issue `!aw sync` and verify the next checkpoint or an explicit actionable error.

The tests in `tests/checkpoint-runtime.test.mjs` verify the code's deterministic rules. They do **not** prove automatic model invocation. A GitHub repository, Project instructions, and a state model are three separate layers of capability.

**Never fall back to `dev`:** if `refs/heads/main` cannot be read, updated or verified, report `storage_unavailable` or `write_failed`; do not write live state on `dev`. `ai-work-state` is currently public, so real checkpoints must not contain private or sensitive content.
