# AI-Workflow v0.2.0 alpha commands

The namespace `!aw` is **literal text**, not a native UI mode. Match it **only at character zero** followed by ASCII space or end; parse verb case-sensitively. Only one `--context` may appear, with a nonempty whitespace-free logical task ID. `--` separates arguments from payload, including arbitrary line breaks and command-like text. Invalid/unknown verbs or malformed options must produce an explicit syntax error **without guessing an execution route**.

```text
!aw <verb> [--context <logical-id>] [-- <payload>]
```

| Verb | Valid form | Effect |
| --- | --- | --- |
| `help` | `!aw help` | Explain available commands, no target action |
| `route` | `!aw route [--context ID] -- REQUEST` | **Dry-run only:** identify proposed task, MDM, workflow/phase, predicted activities, dependencies, authorization gates and uncertainties; never execute REQUEST |
| `audit` | `!aw audit [--context ID]` | Audit current identified task/phase immediately, including available evidence; report assessment and recommended next step, never grant permission or auto-deploy |
| `resume` | `!aw resume --context ID [-- REQUEST]` | Recover verified task and checkpoint; optional REQUEST interpreted within its permissions |
| `design` | `!aw design [--context ID] -- REQUEST` | Start/continue appropriate design task; uses `system-design` only when applicable |
| `reflect` | `!aw reflect [--context ID] -- REQUEST` | Evaluate or discuss; do not silently rewrite baseline |
| `develop` | `!aw develop [--context ID] -- REQUEST` | Use development methods; authorization for substantive implementation still required |

`route`, `design`, `reflect`, `develop` require nonempty payload. `resume` requires `--context`; `audit` accepts no payload and needs an unambiguous active task if no ID was supplied; `help` accepts no options/payload.

**Dry-run contract:** a diagnostic output describes the intended route and *possible* future actions, not an observed execution. Do not mutate task targets, change the active phase, reserve an implementation job or trigger external side effects. Universal finalization still runs, but conversation checkpoint metadata is handled separately, only with authorized storage; unavailable storage is disclosed, never asserted.

**Audit response:** task and phase, estimates vs observed relevant turns/agent steps when available, latest meaningful progress and source evidence, detected inconsistencies, audit depth reached, decision (`continue`, `correct`, `suspend`, or `re-route proposed`) and the next authorized action. Missing evidence must be identified, not substituted with self-reported log text.

Examples:

```text
!aw route -- Design a local research data platform
!aw audit
!aw audit --context task:research-platform
!aw resume --context task:research-platform
!aw design -- Design a scientific workflow system
```

All commands are subject to the host's actual access, permissions, privacy and safety constraints. For transition and audit procedures see `control/continuity.md`.
