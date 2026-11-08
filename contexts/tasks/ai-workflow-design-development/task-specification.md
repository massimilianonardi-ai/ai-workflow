# Task specification — interactive design and development bootstrap

Status: **approved for this documentation work — implementation in repository; experimental bootstrap not activated in ChatGPT**  
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

## 3. Resolved decisions and deliberately deferred integration

| ID | Decision | Consequence | Status |
| --- | --- | --- | --- |
| Q-01 | Explicit approval before substantive design/development execution? | Approval transition | **Decided: required explicit user go-ahead** |
| Q-02 | What is the preferred durable storage location when the active task has no writable repository? | Cross-chat persistence | **Fallback specified: complete Markdown in chat, report not saved** |
| Q-03 | Where should the per-task directory live, and should it be repository-based, external, or dual? | Defines durable persistence and cross-chat access | **Resolved: use `ai-workflow/contexts/tasks/<task-id>/`** |
| Q-04 | What counts as a new task vs continuation when the user sends another message or chat? | Avoids unnecessary fragmentation and context leakage | **Approved: stable logical task identity based on actual objective and scope** |
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

## Additional approved task-document use cases

| ID | Actor and trigger | Preconditions / input | Observable result |
| --- | --- | --- | --- |
| UC-08 | User starts a one-turn ordinary task | Scope and identity can be established | Three concise, task-specific durable records without forcing an extended specification dialogue |
| UC-09 | User makes a material refinement or rejects an earlier alternative | Existing task and documents | Chronological log retains the prior branch; current state contains only accepted decisions |
| UC-10 | User resumes in a new chat | Durable records and stable task identity accessible | Handoff identifies last verified point and next allowed action; linked state/log recover context |
| UC-11 | User requests continuation while persistence fails | Write or retrieval unavailable | Assistant reports the gap and does not pretend a checkpoint exists |
| UC-12 | Exporter is not connected | Chat source link absent | Task records can still be updated, with provenance explicitly marked unavailable |

## Additional directly linked verification scenarios

| ID | Use case | Observable condition |
| --- | --- | --- |
| V-08 | UC-08 | New task directory includes precisely the three required records, with minimal but real contents |
| V-09 | UC-09 | Rejected choice recorded as a log event and absent from current accepted decisions |
| V-10 | UC-10 | Handoff points to existing state/log and approved-spec revision; restart does not invent lost work |
| V-11 | UC-11 | Failing write does not produce a success claim; fallback marked not persisted |
| V-12 | UC-12 | Documentation method does not depend on exporter installation, chat URLs or background tasks |

## 6. Implementation notes

Current experimental draft is implemented in `bootstrap.md`, `routing/intents.yaml`, `routing/commands.md`, `behavior/specification.md`, `behavior/execution.md`, `behavior/evidence.md` and `templates/task-specification.md`. Use-case acceptance is task-local, and the matrix dimensions are unchanged.

## Approved universal task documentation model (implementation authorized)

Every request maps to a task with durable identity; if it genuinely continues the same task, update its three existing files rather than creating a duplicate. Even a one-turn free-form task receives short versions of the three mandatory files. The user **approved** this structure and its initial location on 2026-11-08. The experimental repository method is implemented in `behavior/task-records.md`; it remains subject to actual host write/retrieval capability.

```text
tasks/<task-id>/
  task-state.md          # Current agreed goal/scope, accepted decisions, active work status
  task-log.md            # Chronological append-only factual events, including questions, tests and corrections
  handoff.md             # Minimal restart state: latest relevant revisions, blockers, last event, exact next step
  task-specification.md  # Only for actual design/development requiring use cases + acceptance scenarios
```

To prevent drift, the task-state owns only current accepted intent/decisions; detailed approved design/use cases and verification scenarios remain in task-specification, and state links them rather than duplicating them. Task-log owns history of proposals (including rejected ones), changes, tests and evidence with provenance. Handoff owns *resume mechanics*, not a second timeline. Each references stable task/event IDs and artifact revisions. The exporter, when the operator decides, can contribute immutable source archives linked from the log; **exporter operation is not currently a prerequisite**. No automatic cloud sync/background logging is claimed.

**Implementation approval:** explicit user message "si approvo tutto, procedi" on 2026-11-08 authorized implementation of the approved structure in the experimental `ai-workflow` repository.

## 7. Readiness and approval

- [x] Goal, scope and intended output captured.
- [x] Main use cases and observable checks drafted.
- [x] Architecture boundaries preserved in document-level implementation.
- [x] Operator has decided explicit go-ahead is required for substantial implementation.
- [x] Operator explicitly approved the proposed universal task-document structure and initial repository location for implementation in the experimental candidate.

**Approval evidence:** User confirmed explicit approval for substantive implementation, then explicitly accepted the three universal task files, fourth conditional specification and `ai-workflow/contexts/tasks/` storage on 2026-11-08. This does **not** activate a ChatGPT Project.  
**Permitted next phase:** Finish the approved repository-level per-task traceability implementation and independently check its observable file/document relationships; future host deployment requires separate authorization.  
**Deferred:** Further research-method design and other workflow concerns.

## 8. Execution status

Repository-level candidate prepared; no new ChatGPT Project configuration or independent behavioral validation claimed. Next meaningful action: finalize documentation and this task's state/log/handoff, then report observed repository checks and the unresolved host-activation boundary.
