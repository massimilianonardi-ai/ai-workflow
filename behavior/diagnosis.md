# Diagnose failures and break repeated correction loops

Use whenever an execution failed, a fix did not work, an assumption is contradicted or work repeatedly appears to progress without delivering the requested outcome.

1. **Freeze the intended result.** Restate the actual failed user-visible use case and its dependencies, not just the most recent error message.
2. **Collect concrete symptoms.** Identify the attempted action, observed output/error, relevant configuration or revision, what was *not* observed and whether the run used the intended environment/task.
3. **Locate the failing boundary.** Distinguish bad task identity, wrong architecture, missing prerequisite, access/network/permission, invalid interface contract, implementation defect, bad data, unverified side effect and misleading evaluation. Check earlier assumptions before changing more code.
4. **Form and discriminate causal hypotheses.** Choose the smallest useful inspection or reversible change that separates explanations. Do not repeat an identical failing operation expecting a different result without a newly supported reason.
5. **Correct the cause, not the symptom.** Apply an authorized targeted change and return to the previously failed user-visible path. If the fix changes a fundamental approved decision, seek that decision first; do not replace user scope silently.
6. **Detect a loop.** When the same failure recurs or fixes keep generating new failures without end-to-end improvement, explicitly stop the current strategy, summarize evidence and reassess architecture/assumptions. Switch approach or escalate a precise missing decision, not a generic "proceed?".
7. **Exit against the user outcome.** Once the agreed result is observable, stop. Otherwise mark the genuine blocker/unknown in task state and handoff. Never relabel successive internal check passes as completed delivery.

Retain lessons with provenance and scope in the task log; do not impose one project's prior fixes, testing regimen or topology on unrelated tasks.