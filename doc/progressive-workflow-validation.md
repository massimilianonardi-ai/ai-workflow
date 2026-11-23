# Progressive workflow — static integration and scenario acceptance

**Scope:** structural verification of newly published AI-Workflow documents and routing plus a checklist for future live behavior. A structural PASS is **not** evidence that an arbitrary assistant conversation obeys the workflow, nor that user software runs correctly.

## Structural checks (perform against the published rules commit)

| ID | Assertion | Verification mode |
| --- | --- | --- |
| ST-01 | Bootstrap still enforces universal identity, authorized Git checkpoint, exact branch marker and source approvals. | Read bootstrap file at commit |
| ST-02 | `routing/intents.yaml` maps `design` → `workflows/system-design.md` and `develop` → `workflows/develop.md`; files exist. | Read route keys/tree |
| ST-03 | Develop workflow has specification, architecture, implementation, verification and delivery gates; L10 oversight is conditional. | Read workflow |
| ST-04 | L1–L11 contracts cover objective through acceptance with level-specific outputs and escalation, without 11 human approvals. | Read levels |
| ST-05 | Product documentation rule and >1 independent specialized templates exist, separately from task-state. | Read templates and docs rule |
| ST-06 | Immutable plan supports descriptive milestones without fabricating task IDs; no new task-state mandatory files. | Read template/task model |
| ST-07 | Independent review pins target spec/plan/code, separates evidence from report and never silently modifies target. | Read supervision |
| ST-08 | Design-only route does not imply develop or product writes; runtime authorization remains separate. | Read design, develop and bootstrap |
| ST-09 | All new internal Markdown links point to files in the active Git tree. | Resolve relative links |
| ST-10 | Existing conversation branch/event/snapshot paths and finalization rules are unchanged. | Compare bootstrap + state protocol |

## Behavioral scenarios (NOT yet validated on new workflow)

| Scenario | Expected behavior | Live evidence |
| --- | --- | --- |
| **APISIX-style ambiguity** | "Same simplicity as wrapper, inspired by legacy": assistant reads sources, contrasts minimal wrapper vs recreated APIs; asks operator before code; produces modular docs. | pending |
| **Keycloak-style approved wrapper** | Assistant owns code-level details, preserves SSH/sudo responsibility, performs narrow relevant tests and product docs without repeated permissions. | pending |
| **Small function edit** | Uses compact relevant levels and few docs, no 11-step questionnaire or invented task graph. | pending |
| **Complex multi-component project** | Splits architecture/flows/tests into concise specialized docs, stable links; plan milestone gates and optional supervisor. | pending |
| **Cross-chat audit** | Reads pinned chat checkpoint and code SHA, distinguishes self-reports from code/test evidence, reports continue/correct/suspend. | pending |
| **Live acceptance unavailable** | Reports implemented/CI-tested vs real runtime unobserved; no false "fully working" claim. | pending |
| **Architecture correction** | Reopens lowest affected level and updates dependent docs, not the entire task. | pending |

**Acceptance for full activation:** verified repository integration **plus** successful future live scenarios. Do not mark pending scenarios PASS based on this document alone. Do not reopen P4–P6 or change checkpoint cadence as an incidental consequence.

## Structural integration evidence — 23 November 2026

**Status: PASS (static), NOT RUN (behavioral).** Prepublication Git-tree analysis of 51 files checked all relative Markdown links; **0 broken links**. The following structural checks passed on the prepared tree: ST-01 (bootstrap identity/finalization), ST-02 (separate design/develop routes), ST-03 (five develop phases), ST-04 (eleven formalization levels), ST-05 (17 specialized product-documentation templates plus catalog), ST-06 (descriptive milestones distinct from task IDs), ST-07 (pinned independent supervision), ST-08 (design/implementation authorization boundary), ST-10 (unchanged conversation checkpoint paths). The unnumbered compatibility check found no stale declaration that design is the only phase workflow.

**Limitation:** source and link assertions verify declarations, not actual assistant behavior, end-to-end product correctness, task-graph runtime, concurrency handling or live cross-chat supervisory action. The behavioral scenarios above remain `pending` until observed in a separate, real development conversation.
