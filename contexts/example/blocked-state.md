---
id: task:blocked
kind: task
status: active
workflow_refs:
  - behavior/intent.md
state_refs:
  - ref: task:absent-prerequisite
    relation: required-prerequisite
    required: true
source:
  authority: experimental_fixture
  revision: blocked-1
---

# Fictional missing-prerequisite fixture

## Objective
Test a route that must not silently proceed past a required missing context.

## Current state
The prerequisite identified by `task:absent-prerequisite` is deliberately absent from the pilot index.

## Next action
Report the missing dependency; do not invent it, assume it was satisfied or silently substitute another context.
