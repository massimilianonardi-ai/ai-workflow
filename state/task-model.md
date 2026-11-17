# Task model — universal task identity and relationships

## Scope and approval

This is the approved task model for AI-Workflow persistence. It defines the logical structure, not an autonomous scheduler or a deterministic runtime. The assistant applies it through the authorized GitHub tools and the bootstrap's universal checkpoint protocol.

## One entity, not predefined task levels

- Every independently tracked unit of work is a **task**. A project, workstream or subtask may be described in natural language, but none has a special mandatory entity type or hierarchy level.
- Do **not** add a required `kind`, `type`, `project`, or `subtask` discriminator to task state. A document's purpose is identified by its filename and contract, not by a `kind` field.
- Assign each task a unique, stable, scoped logical `id`; changing its parent or position never changes that ID. Use `tasks/<stable-task-id>/` in the configured state repository, without nested parent directories.
- Persist a new task only when its identity, progress, dependencies or outcome warrants independent tracking. Research steps, tool calls and microactivities otherwise remain events or evidence in an existing task log.

## Two independent sets of relationships

Canonical `task-state.md` fields include:

```yaml
id: task:application
parent: null
depends_on: []
```

- **Composition:** `parent` is either `null` or one existing, verified task ID. A task has at most one direct parent, with no restriction on ancestry depth. Parent links must not contain cycles or refer to self. Direct children are derived by looking up tasks whose `parent` equals the current ID; do not store a competing authoritative children list.
- **Execution dependencies:** `depends_on` lists zero or more verified task IDs, independent of their parentage. No self-dependency or cycle is permitted: dependencies form a directed acyclic graph (DAG). Cross-branch/cross-scope references require explicit verified identity and authority; do not guess targets.
- Both relationship sets must remain valid after a change. Reparenting changes metadata, not the task ID or filesystem path. Persist only affected records/index entries with the current conversation checkpoint in the same atomic Git transaction.

## Execution plan is distinct

An execution plan describes a proposed/revisioned order, concurrency, gates, dependencies and verification for some task IDs. It does not define task identity, parentage, or authority; changing a plan does not automatically restructure tasks. For complex work it may be a separately versioned task artifact referenced from `task-state.md`. No plan file is mandatory for a simple task, and an approved design does not by itself authorize implementation or deployment.

## Lifecycle and completion

- Every task has its own objective, current state, evidence, authorization boundary, history and resume checkpoint under [task-records](../behavior/task-records.md). Existing task status values remain workflow-specific until a lifecycle rule is explicitly approved.
- Completing all children **does not automatically complete the parent**: parent-specific acceptance, integration, review or approval gates may remain. Similarly, dependency completion is not authority to start dependent work.
- A parent's state must not be inferred merely from a child's state, and changes should not trigger wholesale rewrites of other tasks. Read only the relevant task(s) and relationships needed for the current decision.

## Persistence boundary

Task mutations are separate from the mandatory per-assistant-response conversation checkpoint. Record meaningful task changes with actual source and approval evidence, then write the affected task records and request/branch checkpoint atomically; verify the new branch HEAD and every changed record. Never fabricate task IDs, dependencies, completed work, user approvals or historical events. The configured state repository is currently public: do not persist secrets or sensitive task content.

## Remaining decisions

Exact parent-state aggregation policy, indexing strategy for large task graphs, execution-plan revision format, and task reparenting/concurrency conflict UX require further design and end-to-end verification. This model does not pre-approve those mechanisms.
