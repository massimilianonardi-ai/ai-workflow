# Task specification — interactive design and development bootstrap

Status: **draft — awaiting user review; experimental implementation exists but is not activated**  
Task ID: `task:ai-workflow-design-development`  
Scope: `ai-workflow` experimental bootstrap, not an external product project  
Updated: 2026-11-08

## 1. Objective and usage

**Outcome:** A capable assistant can receive a vague or incomplete design/development request and collaboratively turn it into an approved, task-scoped specification with clear use cases and observable checks, then work as autonomously as possible within those boundaries. The operator should be able to use this path to continue complex work without repeated failure cycles.

**Scope:** Keep the existing multidimensional/multi-intent matrix, selective bootstrap and task-context separation. Use one `task-specification.md` per task, revising it with user decisions. Include design-only and development requests, including compound intents; maintain direct handling of requests without these intents.

**Exclusions:** No exclusive three-category routing, no project-wide assumption that all chats share one task, and **no imported generalized/legacy testing or validation program**. No change to currently installed Project Instructions or external product runtime.

## 2. Established constraints and decisions

| ID | Requirement | Origin |
| --- | --- | --- |
| C-01 | Multidimensional matrix remains the intent selection model; combine applicable intents. | Prior user correction |
| C-02 | For genuine design/development, refine the prompt interactively; ask relevant consequential questions. | Current user request |
| C-03 | Generate/update one task-owned Markdown specification throughout refinement. | Current user request |
| C-04 | Do not begin dependent implementation until principal use cases and observable checks are clear. | Current user request |
| C-05 | After sufficient refinement, execute inside boundaries with strong autonomy. | Prior and current user direction |
| C-06 | No dependency on legacy/global test and validation machinery; use only checks derived from task use cases. | Current user restriction |
| C-07 | Explicit user go-ahead is mandatory before the substantive implementation phase. | User confirmation, 2026-11-08 |
| C-08 | Every task, of every request type, must have `handoff.md`, `task-log.md`, `task-state.md` with traceability across chats. | User requirement, 2026-11-08 |
| C-09 | `task-state.md` records objectives, current refinements, distinctions, and **accepted** decisions; discarded options remain historical, not current state. | User requirement, 2026-11-08 |
| C-10 | Chat exporter exists and is being reimplemented; integration choice stays **open**. | User statement, 2026-11-08 |

## 3. Current open decisions

| ID | Decision | Consequence | Status |
| --- | --- | --- | --- |
| Q-01 | Explicit approval before substantive design/development execution? | Approval transition | **Decided: required explicit user go-ahead** |
| Q-02 | What is the preferred durable storage location when the active task has no writable repository? | Cross-chat persistence | **Fallback specified: complete Markdown in chat, report not saved** |
| Q-03 | Where should the per-task directory live, and should it be repository-based, external, or dual? | Defines durable persistence and cross-chat access | **Open, requires user decision** |
| Q-04 | What counts as a new task vs continuation when the user sends another message or chat? | Avoids unnecessary fragmentation and context leakage | **Proposed: stable task identity based on actual objective; subject to approval** |
| Q-05 | How/when to integrate the separately reimplemented ChatGPT conversation exporter? | Preserve complete originals without making exporter a precondition for task progress | **Deferred by user; do not bind now** |

## 4. Use cases

| ID | Actor and trigger | Preconditions / input | Observable result |
| --- | --- | --- | --- |
| UC-01 | User asks an ordinary self-contained question/edit | No real design/development task | Direct answer, no compulsory task specification |
| UC-02 | User requests design from a vague prompt | Ambiguous outcome or architectural boundaries | One task specification is drafted; user gets prioritized clarifying question(s); no implementation |
| UC-03 | User refines the same task | Existing draft plus answers | The **same** specification reflects decisions; use cases/checks are updated without duplicates |
| UC-04 | User requests development with incomplete specification | Open consequential decisions | No dependent implementation; safe independent investigation may continue |
| UC-05 | User approves the sufficiently complete specification and requests development | Principal use cases and checks mapped | Autonomous implementation within scope; evidence tied to the agreed outcomes |
| UC-06 | User resumes an already approved task | Reliable matching task identity and specification | Reuse approved state without repeated requirements interrogation |
| UC-07 | Development reaches its agreed outcomes | Actual evidence available per agreed use cases | Stop with a result summary; do not grow an unrelated open-ended test backlog |

## 5. Direct verification scenarios

| ID | Use case | Action/fixture | Expected observable evidence |
| --- | --- | --- | --- |
| V-01 | UC-01 | Ask for a simple text correction | Reply directly without task document |
| V-02 | UC-02 | Ask for an unspecified substantial design | Draft `task-specification.md`, material questions, design implementation not claimed |
| V-03 | UC-03 | Answer a clarification in a follow-up turn | Same task document updated rather than a new unrelated draft |
| V-04 | UC-04 | Ask to start substantial coding while key use case undecided | Relevant dependency blocked; no silently chosen architecture |
| V-05 | UC-05 | Provide approved spec and implementation request | End-to-end use-case result produced and outcome checks reported honestly |
| V-06 | UC-06 | Resume specific approved task | No needless re-interview; identity conflicts still reconciled |
| V-07 | UC-07 | All agreed use cases met | Task completion without importing a broader perpetual validation program |

**Evidence status:** these scenarios are specifications, **not executed runs**. No current tool/model behavior is inferred solely from documentation updates. They are examples for future evidence-driven use, not mandatory legacy framework tests.

## 6. Implementation notes

Current experimental draft is implemented in `bootstrap.md`, `routing/intents.yaml`, `routing/commands.md`, `behavior/specification.md`, `behavior/execution.md`, `behavior/evidence.md` and `templates/task-specification.md`. Use-case acceptance is task-local, and the matrix dimensions are unchanged.

## Proposed task documentation model (awaiting approval)

Every request maps to a task with durable identity; if it genuinely continues the same task, update its three existing files rather than creating a duplicate. Even a one-turn free-form task receives short versions of the three mandatory files. This is a **design proposal**, not yet an implemented router or storage mechanism.

```text
tasks/<task-id>/
  task-state.md          # Current agreed goal/scope, accepted decisions, active work status
  task-log.md            # Chronological append-only factual events, including questions, tests and corrections
  handoff.md             # Minimal restart state: latest relevant revisions, blockers, last event, exact next step
  task-specification.md  # Only for actual design/development requiring use cases + acceptance scenarios
```

To prevent drift, the task-state owns only current accepted intent/decisions; detailed approved design/use cases and verification scenarios remain in task-specification, and state links them rather than duplicating them. Task-log owns history of proposals (including rejected ones), changes, tests and evidence with provenance. Handoff owns *resume mechanics*, not a second timeline. Each references stable task/event IDs and artifact revisions. The exporter, when the operator decides, can contribute immutable source archives linked from the log; **exporter operation is not currently a prerequisite**. No automatic cloud sync/background logging is claimed.

**Implementation status:** proposal only; do not create workflow rules or new task-directory structure until explicitly approved.

## 7. Readiness and approval

- [x] Goal, scope and intended output captured.
- [x] Main use cases and observable checks drafted.
- [x] Architecture boundaries preserved in document-level implementation.
- [x] Operator has decided explicit go-ahead is required for substantial implementation.
- [ ] Operator has accepted this specification for broader usage.

**Approval evidence:** User approved the mandatory explicit go-ahead rule on 2026-11-08; the **new documentation architecture** is still a proposal, not approved for implementation.  
**Permitted next phase:** Refine and seek approval for per-task traceability architecture, while keeping implemented bootstrap in experimental state.  
**Deferred:** Further research-method design and other workflow concerns.

## 8. Execution status

Repository-level candidate prepared; no new ChatGPT Project configuration or independent behavioral validation claimed. Next meaningful action: confirm the task-doc architecture and durable storage boundary; then request explicit implementation go-ahead.
