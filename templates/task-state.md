---
id: "task:<stable-logical-id>"
kind: task
status: draft
scope: "<declared project / subject scope>"
subject: "<specific task subject>"
workflow_refs:
  - behavior/intent.md
  - behavior/task-records.md
state_refs: []
source:
  authority: "<verified operator/source>"
  revision: "unverified until written"
---

# Task state — <title>

Task ID: <scoped stable id>  
Status: <new | refining | approved | executing | blocked | completed>  
Scope: <project/subject and any distinctions>  
Updated: <timestamp/revision>

## Current objective

<What the user intends to obtain. Use the user's words when practical.>

## Scope and clarified boundaries

- In scope: <agreed>
- Out of scope: <agreed>
- Important distinctions: <task-specific clarifications and exclusions>

## Accepted decisions

| ID | Current decision | User approval / authoritative source |
| --- | --- | --- |
| D-01 | <confirmed decision> | <message/ref/revision> |

**Only active, accepted decisions belong here.** Rejected alternatives and the discussion leading to decisions stay in `task-log.md`. Do not classify an assistant proposal as approved.

## Actual status

<What has been completed, what is under way, what remains; distinguish plans from observed results.>

## Active dependencies and references

- <blocking question or resource>
- Specification: <relative path/revision, if applicable>
- Latest log event: <EV-...>

## State header rules

Replace all placeholders with the actual scoped identity, current phase and verified source. Include only the workflow_refs genuinely needed for the task, and state_refs to explicitly related contexts with known relation and authority. Header fields are not a reason to infer implicit hierarchy or copy obsolete project assumptions.
