# AI-Workflow experimental alpha — dev staging history

This branch prototypes the approved three-section bootstrap, lean MDM, phase-based `system-design`, progressive continuity audit, manual `!aw audit` and a recoverable state protocol. **It is not installed into any ChatGPT Project and has not passed behavioral tests.**

Start at [bootstrap.md](bootstrap.md); only follow references needed for the request. For an opt-in sandbox see [deploy/chatgpt-project-instructions-dev.md](deploy/chatgpt-project-instructions-dev.md).

**Branch note:** the alpha was promoted to `main` for release v0.2.0; v0.2.1 corrected macrosection references; v0.2.2 adds a per-response checkpoint contract and executor on a separate fix branch before promotion. `dev` remains the staging branch; this file preserves the dev-stage validation history. `ai-work-state/main` has been initialized once with a technical README and `ai-work-state/dev` now exists. Only synthetic checkpoint fixtures have been written and tested; no live conversation/task identity is claimed.

## Alpha smoke scenarios (to perform with an actual configured host)

1. `!aw route -- Design a system` reports task, MDM, phases, gates and uncertainties but **does not execute** the design.
2. A new design request selects `system-design/specification`; accepted requirements lead to `architecture` without new MDM.
3. A lateral technical question does not silently change task, phase or baseline.
4. An approved new requirement during `architecture` invalidates dependent results: local repair if spec gate remains valid, otherwise new `specification` episode.
5. Repeated resolved question and revoked permission trigger lightweight controls before turn estimates are exceeded.
6. Long productive phase can continue with verified evidence and a reasoned forecast revision.
7. `!aw audit` summarizes the real log/evidence even when time estimates are normal; ambiguous task selection is not guessed.
8. Every response follows finalization section C in the current release; Git persistence and branch detection are only claimed after real read-back; failed writes are disclosed and marked pending.
9. No automatic deployment, no phantom agent work, no task baselines revised from informal conversation, and no independent-auditor claim.

**Test status:** structural checks passed, and real GitHub writes/read-backs of synthetic state checkpoints were verified on `ai-work-state/dev`. Actual ChatGPT runtime and cross-chat behavioral tests remain pending.

## Structural checks

Run the dependency-free structural suite after checking out the branch locally:

```sh
node --test tests/alpha-contract.test.mjs
```

A read-back of the published `dev` files and an in-memory execution of the seven contract test callbacks passed **7/7** on 2026-11-10. This is a **static contract check**, not an observed ChatGPT routing/audit execution, end-to-end Git persistence test or independently confirmed Node CLI invocation.

See `evaluations/alpha-dev-static-checks-2026-11-10.md` for scope and limitations.

## State-store integration

See [alpha state integration verification](evaluations/alpha-dev-state-integration-2026-11-10.md) and [ai-work-state/dev](https://github.com/massimilianonardi-ai/ai-work-state/tree/dev).

The state repository has a technical README on `main` and a dedicated `dev` branch. In a synthetic fixture only, a multi-file checkpoint was written in one Git commit, and a branch was derived from the historical checkpoint rather than current task associations. A stale expected-head write did not advance the ref, but returned a generic connector error; this is not proof that every concurrency failure is handled.

No experimental Project has been installed, and no live conversation marker or task checkpoint has been established by these tests.
