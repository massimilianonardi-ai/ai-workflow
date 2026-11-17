# Task model — universal task persistence and relationships

## Scope and authority

This is the approved task model for AI-Workflow persistence. It defines assistant-executed operations using authorized GitHub tools, not a scheduler or deterministic runtime. The [bootstrap](../bootstrap.md) remains responsible for the unconditional per-response conversation checkpoint; task files change only when work actually changes and is authorized.

## Universal identity, hierarchy and dependencies

- **One entity:** every independently tracked unit of work is a task. Labels such as project, workstream, milestone and subtask are natural-language descriptions, not mandatory types or levels. Do not introduce `kind` or `type` for task or document classification.
- Give each task a stable scoped ID, independent of its position. Store it at `tasks/<stable-task-id>/` in the configured `state_repository`, not within its parent's directory.
- The task's canonical `task-state.md` contains `id`, `parent` (one verified task ID or `null`), `depends_on` (verified task ID list), `status`, and optionally `active_plan`. Scope, objective, workflow, provenance and approvals remain in its records.
- Parent links represent **composition**: at most one parent, unlimited conceptual depth, no self-link or ancestry cycle. Direct children are derived by finding tasks whose canonical parent is this task.
- `depends_on` links represent **execution prerequisites**, independently of parentage: zero or more verified task IDs, no self-link or dependency cycle (DAG). Dependencies can cross branches of the task hierarchy when target identity and permission are verified. A satisfied dependency is not permission to execute.
- Do not turn every user utterance, research step, tool invocation, or microactivity into a task. Persist a separate task only when independently tracking objective, progress, dependencies or completion is useful.

## Task status, readiness and rollups

- The task's own persisted `status` expresses its **actual confirmed lifecycle state**. It is independent of the statuses of its children and is changed only on evidenced, authorized progress or validation.
- Derive a child rollup **on demand** by reading necessary verified children (or their verified relevant descendants). It may report which children are complete, incomplete, blocked or unknown; do not persist an aggregate status or completion percentage on the parent. Missing/unverified children must be reported as unknown, not completed.
- Determine readiness to begin or resume a task from its verified dependencies, relevant plan gates, applicable workflow and actual authorization. Readiness is computed; it is not an automatic state transition or new execution permission.
- Even when every child is `completed`, **do not automatically mark the parent completed**. Parent-specific acceptance, integration, verification or approval may still be outstanding. Completion requires that task's own acceptance evidence and applicable user authority.
- If a change invalidates a previously confirmed outcome, retain the historic evidence and flag the affected work for revalidation; never silently erase completion evidence or automatically rewrite every ancestor. Keep the parent status independently justified.

## Minimal derived navigation indexes

Keep authoritative relationships in each child's `task-state.md`, with **small, derived** lookup files in the configured state repository:

```text
tasks/roots.yaml                      # { roots: [task IDs with parent: null] }
tasks/<stable-task-id>/children.yaml  # { children: [direct task IDs] }
tasks/<stable-task-id>/task-state.md
tasks/<stable-task-id>/task-log.md
tasks/<stable-task-id>/handoff.md
tasks/<stable-task-id>/task-specification.md  # when needed
```

- `tasks/roots.yaml` lists only verified root task IDs. `children.yaml` lists only direct child IDs. Each is a **derived index**, never an independent source of hierarchy truth; check the target tasks' canonical parent fields before consequential action.
- Create/update the relevant index entries on task creation, deletion/retirement (if authorized), and reparenting. Include the affected index files with task state/log/handoff, optional plan revisions, and the current conversation request/branch checkpoint **in one atomic Git transaction**.
- Keep indexes concise (IDs only), not replicas of task details, approval state or percentages. Read only the requested task, necessary ancestors/children, relevant dependency edges and plan. Do not load or rewrite the whole graph by default.
- A missing, stale or contradictory index is an **integrity gap**, not proof that no tasks/children exist. Reconcile it against verified canonical task records before claiming completeness or modifying the graph. `routing/index.yaml` in the rules repository is not a live task registry; live navigation data belongs in the state repository.

## Separately versioned execution plans

- An execution plan describes **how** known tasks may be executed: sequencing, concurrency, readiness/verification gates and revisions. It does not define task identity or hierarchy, rewrite canonical `depends_on`, or authorize otherwise unapproved actions.
- For a complex owning task, store optional immutable files `tasks/<id>/plans/plan-NNN.yaml` (see [execution-plan template](../templates/execution-plan.yaml)); use `active_plan: plans/plan-NNN.yaml` in its canonical task state, or `null` for no plan. A simple task need not have a plan.
- Each plan records an ID, owning task ID, revision, optional `supersedes` pointer, referenced existing task IDs, optional parallel groups and completion gates. The next approved revision creates a **new file**, preserving previous plans and changing only the owning task's active pointer and meaningful log/handoff entries.
- Generate detailed tasks progressively when their independent tracking becomes useful. The plan may describe future work in prose, but must not assert that a not-yet-created task ID already has persisted records.
- A revision or `parallel_groups` entry must not conflict with canonical dependencies or existing authorizations. Plan changes and dependency changes require their own proper approvals. Keep planned vs observed execution distinct.

## Reparenting, concurrent writes and safe persistence

1. Identify the task, old parent, proposed new parent, relevant ancestor chain, and any affected dependency edges from a verified state-repository revision. Confirm the change is authorized, all identifiers exist, and neither parent nor dependency cycles would result.
2. Preserve the task ID, history and directory. Update only its canonical `parent`, the old/new parents' `children.yaml` indexes (and `tasks/roots.yaml` if a root is involved), plus meaningful task-log and handoff entries. Do not needlessly rewrite unrelated parent status files.
3. Publish all changed files **with** the current conversation request record and branch-head change in one Git tree/commit. Update the state branch ref conditionally with the exact old SHA, without force.
4. On concurrent ref rejection, reread the new state and revalidate authorization, ancestry, dependencies and indexes; retry only after reconciling, never blindly overwrite. Read back the committed branch ref and **all affected files**.
5. Inaccessible or inconsistent sources block assertions of completed task mutations. Report the actual persistence outcome without fabricating task history, approvals, ancestry, or successful commits.

## Verification status

The data model, computed parent rollup, derived indexes, immutable plans, progressive decomposition and atomic reparenting rules are **approved and specified**. They are **not yet proven by live end-to-end tests** of task creation, recovery, large-graph traversal, plan revision, reparenting, concurrency, or interrupted writes. No additional runtime or background worker is approved by this specification.
