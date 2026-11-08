---
id: "task:<stable-logical-id>"
kind: handoff
status: draft
scope: "<declared project / subject scope>"
subject: "<specific task subject>"
workflow_refs:
  - behavior/task-records.md
state_refs: []
source:
  authority: "<verified operator/source>"
  revision: "unverified until written"
---

# Handoff — <title>

Task ID: <scoped stable id>  
Status: <current phase and actual blocker/completion>  
Checkpoint: <timestamp or revision>

## Resume pointers

- **Task state:** `task-state.md` @ <observed revision or "unverified">
- **Latest log event:** `task-log.md#EV-0001` @ <observed revision or "unverified">
- **Specification (when applicable):** `task-specification.md` @ <revision and actual approval status>
- **Source/implementation revisions:** <exact repository/commit or accessible artifact ID>

## Where the work stopped

<One short paragraph describing the last **verified** action/result and the current phase, not a restatement of the entire task history.>

## Unresolved blockers or operator decisions

- <specific blocker, its effect and authority needed, or none>

## Next authorized action

<One concrete next step with prerequisites and execution/approval boundary, or "None — task completed".>

## Resume note

The next chat must read this checkpoint and the referenced task documents. If refs cannot be accessed or the latest turn was not persisted, disclose the gap and do not infer completion. An unapproved design/development specification does **not** authorize dependent implementation.

## Restart correctness

This file is written **after** the other task documents and after the last external action represented as completed. Before resuming, compare the stated next action and revisions with current authoritative sources; correct a stale checkpoint rather than repeating completed work. When verification is impossible, label the checkpoint unverified.
