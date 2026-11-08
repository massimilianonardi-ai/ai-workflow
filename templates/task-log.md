---
id: "task:<stable-logical-id>"
kind: task_log
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

# Task log — <title>

Task ID: <scoped stable id>  
Log policy: **append-only chronological factual summaries**, not a second current specification.

## Events

### EV-0001 — <timestamp/turn identifier> — <short event type>

- **Source:** <user message, tool output, commit or exporter archive; if absent say unavailable>
- **What happened:** <concise factual summary of user request, Q/A, analysis, change, failure, verification or result>
- **Decision status:** <accepted | proposed | rejected | not applicable>; accepted decisions belong in `task-state.md` too.
- **Evidence:** <link/revision/output or "not observed">
- **Effect:** <what state or action changed; if none say none>

Append `EV-0002`, `EV-0003` etc. Do not rewrite old events when understanding changes: append a correction with a pointer to the earlier entry. Preserve rejected ideas as history **without** promoting them to current task state. Record only meaningful events, not a fabricated transcript or unobserved test claims.
