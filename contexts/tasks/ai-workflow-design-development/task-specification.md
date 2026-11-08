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

## 3. Current open decisions

| ID | Decision | Consequence | Status |
| --- | --- | --- | --- |
| Q-01 | Should the user explicitly approve the sufficiently complete specification before implementation, rather than the assistant declaring readiness alone? | Determines exact approval transition | **Provisional default: explicit approval; not yet accepted** |
| Q-02 | What is the preferred durable storage location when the active task has no writable repository? | Cross-chat persistence | **Fallback specified: complete Markdown in chat, report not saved** |

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

## 7. Readiness and approval

- [x] Goal, scope and intended output captured.
- [x] Main use cases and observable checks drafted.
- [x] Architecture boundaries preserved in document-level implementation.
- [ ] Operator has reviewed and accepted the readiness/approval rule.
- [ ] Operator has accepted this specification for broader usage.

**Approval evidence:** Not yet approved.  
**Permitted next phase:** User review and adjustment of the experimental candidate; do not assert activation or end-to-end validation.  
**Deferred:** Further research-method design and other workflow concerns.

## 8. Execution status

Repository-level candidate prepared; no new ChatGPT Project configuration or independent behavioral validation claimed. Next meaningful action: clarify the approval transition if the operator disagrees with the provisional explicit-review default.
