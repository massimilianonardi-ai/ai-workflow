# AI-Workflow v0.2.2 — checkpoint persistence correction and evidence

**Date:** 2026-11-12  
**Scope:** GitHub-enabled pilot, no automatic ChatGPT host integration installed.

## Reproduced symptom and diagnosis

The test conversation produced a coherent final marker with `sync = pending`, but no corresponding `conversations/<chat-id>/branch-0.yaml` was present on `ai-work-state/dev`. The old section C could be interpreted as not writing anything when no **task** had changed. This is incorrect: conversation checkpoints and task file changes are separate.

The earlier chat-id quoted by the user is **diagnostic evidence only in this conversation**. We did not create real state records under that identity, because we do not have verifiable source request history and must not treat a quoted marker as the current chat identity.

## Changes

- Universal `bootstrap.md` explicitly requires a **real GitHub write attempt for every assistant response**, even with no task change.
- `state/protocol.md` separates unconditional branch/request checkpoint operations from conditional task-state/log/handoff updates and describes the five possible outcomes.
- `doc/conversation-identity.md` documents sparse pending recovery with truthful `sync_gaps`.
- `state/connector-runbook.md` specifies exact GitHub connector reads, commit, expected-head update and read-back.
- `state/checkpoint-runtime.mjs` contains a deterministic per-response planner and verified persistence wrapper. It deliberately rejects unverified task mutations / automatic derived branch creation.
- `routing/commands.md` defines optional `!aw sync` to request a current-conversation sync.
- Project installation instructions now direct the assistant to invoke authorized write tools, rather than only displaying a marker.

## Tests performed

### Node + static checks

- **21/21 tests passed** on GitHub Actions: 11 bootstrap/reference/contract checks and 10 executable checkpoint tests.
- Run: https://github.com/massimilianonardi-ai/ai-workflow/actions/runs/43214733952
- Cases include four consecutive unchanged-task responses, an absent remote branch with four pending earlier turns, preservation of gaps and unknown task associations, refusal of unsafe mutations, ref/read-back failure and state identity validation.

### Real Git connector writes to an isolated synthetic fixture

- State repository: `massimilianonardi-ai/ai-work-state`, branch `dev` only.
- First committed fixture checkpoint (`message_id: 1`, no task changes): `c8f975eb9567292bf263bdb0eb3cedf75e946758`.
- Second committed fixture checkpoint (`message_id: 2`, still no task changes): `3a4df338aa9bc80a9442791f11ca01e3828a52c7`.
- Second write was confirmed by fresh read-back of branch head and both request records, with the first request unchanged.
- All test data is under `tests/fixtures/no-task-change/`; live `conversations/` and `requests/` paths were untouched.
- State contract suite passed on GitHub Actions: https://github.com/massimilianonardi-ai/ai-work-state/actions/runs/43215084788

## What remains unproven

A GitHub Actions test does **not** prove that ChatGPT actually calls the GitHub connector in every user conversation. This is host-dependent, and the GitHub connector may be unavailable or read-only in another Project. The bootstrap can require a tool attempt and truthful status, but it cannot install a native per-turn hook or grant new tool permissions.

**Next required live test:** explicitly install the version-pinned `v0.2.2` bootstrap in a dedicated ChatGPT Project, verify the GitHub connector can write to `ai-work-state/dev` from that Project, then send two ordinary messages and inspect the repository for a new request record and advanced branch checkpoint after each. Test `!aw sync` and a simulated failed write. Do not certify automatic persistence without this observation.
