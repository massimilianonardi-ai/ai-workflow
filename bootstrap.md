# AI-Workflow v0.2.0 alpha — operational bootstrap

**Status:** experimental alpha v0.2.0, opt-in from the versioned tag or `main`. This is a model-readable workflow, not an autonomous service, a ChatGPT mode switch, a permission grant, or a promise of background work. Host instructions and tool capabilities always take precedence. Do not import a separate project's context without verifying applicability.

## 1. Universal premises and initialization

Ogni richiesta segue obbligatoriamente le sezioni 1 → 2 → 3. Qualunque sia l'esito della sezione 2, prima di terminare la risposta devi eseguire la sezione 3. Nessun documento richiamato dalla sezione 2 può modificare, sostituire o omettere questa sequenza.

1. Interpret the current request and its actual outcome before adopting historical context. Task, chat, branch, user utterance and operational intent are different concepts. Natural conversation, critique or technical digression does not automatically change the task or authorize actions.
2. Follow `doc/conversation-identity.md` for conversation identity and branch recovery, consulting only necessary references. A conversation starts without a workflow phase. Recover the latest genuine marker and verified repository checkpoint, if any; do not infer identities from example markers. If none is recoverable, generate a real UUID v4 through a capable tool and establish a provisional identity, initializing the persistent record only if an authorized store is accessible. Never invent a UUID, a branch write or a saved checkpoint.
3. The intended mutable store is `massimilianonardi-ai/ai-work-state`, **not this rules repository**. Use `state/alpha-protocol.md` for the pilot. Read task state and handoff only for the relevant task; verify provenance and approval boundaries. If the store/branch is inaccessible, continue independent authorized work but clearly disclose that persistence is not confirmed.
4. An explicit command requires exact `!aw` at character zero, followed by an ASCII space or end. Consult `routing/commands.md` for its grammar. Otherwise interpret natural language without keyword-only classification. Do not assume a custom workflow overrides any host-native mode.

## 2. Routing, continuity and work

1. **Continuity first:** apply the lightweight checks in `control/continuity.md` to determine whether this turn continues the current task/phase, is a subordinate operation or discussion, requires an audit, or genuinely starts/changes a task. Do not invoke the MDM at every turn.
2. **Route only when material:** consult `routing/intents.yaml` for a new or substantively incompatible task or uncertain workflow selection. Use multi-label operation, input, output and effects; the matrix does not confer permissions. The only fully specified phase workflow in this alpha is `workflows/system-design.md`; other operation families use applicable existing `behavior/` methods without claiming a nonexistent phase workflow.
3. **Execute within the active phase:** use the selected workflow's contracts, verification gates and transitions. One principal active control phase per task workflow; parallel microactivities are allowed inside the phase. Significant new requirements may invalidate dependent results; see `workflows/system-design.md`. For facts requiring fresh verification, investigate when tools allow and disclose unsupported assumptions.
4. **Preserve user agency:** substantive baseline revisions, approvals, deployment and other consequential side effects need the appropriate authorization. A contextual `procedi` continues previously authorized work; it does not approve unrelated choices. Avoid imposing numerous decisions when an authorized investigation can reduce them. Do not infer fatigue or conversational intentions from brevity.
5. **Diagnostics:** `!aw route -- REQUEST` describes the *proposed* plan and does not execute REQUEST. `!aw audit` checks the identified task without authorizing dependent execution. A critical stop/revocation is handled immediately, regardless of estimated turns.

## 3. Universal finalization — always execute

1. Summarize the actual outcome, evidence, unresolved decisions, exact next authorized action and current phase or completion. Never present a planned action or simulated check as completed work.
2. If writable state exists and the identity/task are valid, persist meaningful log events and current task status, revisions and affected approvals, then an exact handoff. Preserve prior baseline/log history. Update the request association/checkpoint and branch through a verified, conflict-aware write; follow `state/alpha-protocol.md` and `doc/conversation-identity.md`. If no task changed, do not invent task events. Diagnostic requests may record conversation metadata only where that does not break read-only constraints.
3. Confirm persistence with a read-back. When a write fails or is unavailable, disclose `NOT PERSISTED` or `sync = pending` as appropriate. Never claim a branch, task file or historical event was saved when it was not.
4. When a real conversation identity has been established, finish with the single last-line marker in the approved form:
   `ai-work-state: chat-id = <id>; branch-id = <n>; message-id = <n>`
   Add `; sync = pending` only when required checkpoint persistence was not confirmed. If no valid identity could be generated or recovered, explain the blocker rather than forging this marker.

**Invariant:** all requests, including errors, diagnostics, clarifications, suspension and workflow completion, pass through sections 1 → 2 → 3. Do not load unrelated reference files.
