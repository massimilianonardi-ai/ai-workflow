# Task specification — <short task title>

Status: **draft**  
Task ID / scope: <identifier or explicit unknown>  
Owner / source: <user and directly relevant task sources>  
Last updated: <date or revision>

> This is a **working agreement**, not an automatically approved implementation order. Update this same file as the discussion evolves. Label facts, assumptions and unresolved decisions accurately.

## 1. Objective and usage

- **Desired user-visible result:** <what the user will be able to do>
- **Users/actors and environment:** <who, where and how>
- **In scope:** <essential behaviors>
- **Out of scope:** <intentional limits>

## 2. Established constraints and decisions

| Item | Confirmed requirement or decision | Origin / evidence |
| --- | --- | --- |
| C-01 | <confirmed constraint> | <user/source/revision> |

Do not rewrite a hypothesis as an accepted decision. Distinguish task-local decisions from verified project-wide invariants.

## 3. Open questions and assumptions

| ID | Question / hypothesis | Why it matters | State |
| --- | --- | --- | --- |
| Q-01 | <specific unresolved choice> | <which use case/architecture/verification it affects> | open |

Ask the user only when the answer is a consequential decision that cannot be safely discovered independently.

## 4. Use cases

| ID | Actor and trigger | Preconditions / input | Expected observable result |
| --- | --- | --- | --- |
| UC-01 | <who does what and why> | <required state/input> | <what success looks like for the user> |

Include the primary path and important failures. Do **not** generate a speculative catalog of unrequested features.

## 5. Verification scenarios derived from use cases

| ID | Use case | Setup and action | Expected observation / evidence |
| --- | --- | --- | --- |
| V-01 | UC-01 | <realistic setup + action> | <specific result, how it can be observed> |

Define checks that are feasible in the actual environment. Automated checks, manual observations and isolated demonstrations are all possible; mark which are real and which are unavailable. No unrelated historical test program becomes a task acceptance condition by default.

## 6. Proposed solution and implementation boundaries

<Design alternatives, selected approach and reasoning, interfaces/dependencies, safety/authorization boundaries. Keep uncertain aspects provisional.>

## 7. Readiness and approval

- [ ] Objective and scope are understandable.
- [ ] Main use cases have observable expected results.
- [ ] Each main use case has relevant verification scenario(s).
- [ ] Choices that could redirect implementation are resolved or intentionally excluded.
- [ ] Verification means are available or their limitations are explicitly accepted.
- [ ] **User has reviewed and accepted the current specification for the next phase.**

**Approval evidence:** <user message and version/revision, or "not yet approved">  
**Permitted next phase:** <refine / design only / develop within agreed bounds>  
**Unapproved or deferred items:** <none or references>

## 8. Execution and outcome (populate only after approval)

| Use case | Work/result | Observed evidence | Status / limits |
| --- | --- | --- | --- |
| UC-01 | <implementation> | <actual check/output> | <verified / partial / blocked / not checked> |

**Completion:** <which agreed outcomes have been demonstrated; what remains>  
**Next meaningful action:** <only if ongoing>
