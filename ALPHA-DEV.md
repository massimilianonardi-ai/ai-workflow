# AI-Workflow experimental alpha on dev

This branch prototypes the approved three-section bootstrap, lean MDM, phase-based `system-design`, progressive continuity audit, manual `!aw audit` and a recoverable state protocol. **It is not installed into any ChatGPT Project and has not passed behavioral tests.**

Start at [bootstrap.md](bootstrap.md); only follow references needed for the request. For an opt-in sandbox see [deploy/chatgpt-project-instructions-dev.md](deploy/chatgpt-project-instructions-dev.md).

**Do not confuse the branches:** `main` preserves the existing operational product, while `dev` is an experimental model-readable implementation. `ai-work-state` has no initial Git commit and therefore its `dev` branch is blocked until explicitly initialized. No persistent conversation/task record is claimed.

## Alpha smoke scenarios (to perform with an actual configured host)

1. `!aw route -- Design a system` reports task, MDM, phases, gates and uncertainties but **does not execute** the design.
2. A new design request selects `system-design/specification`; accepted requirements lead to `architecture` without new MDM.
3. A lateral technical question does not silently change task, phase or baseline.
4. An approved new requirement during `architecture` invalidates dependent results: local repair if spec gate remains valid, otherwise new `specification` episode.
5. Repeated resolved question and revoked permission trigger lightweight controls before turn estimates are exceeded.
6. Long productive phase can continue with verified evidence and a reasoned forecast revision.
7. `!aw audit` summarizes the real log/evidence even when time estimates are normal; ambiguous task selection is not guessed.
8. Every response runs section 3; Git persistence and branch detection are only claimed after real read-back; failed writes are disclosed and marked pending.
9. No automatic deployment, no phantom agent work, no task baselines revised from informal conversation, and no independent-auditor claim.

**Test status:** design-level expectations only; runtime, connector and cross-chat tests remain pending.
