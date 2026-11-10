# AI-Workflow alpha-dev — state-store integration verification

Date: 2026-11-10
Status: observed GitHub connector operations on synthetic fixtures; not live ChatGPT behavior.

## Repository initialization

- The state repository was empty. With explicit user authorization, main was initialized by a one-time README-only commit: 08d8fc6e719ed280d15341438a41402ac242c05c.
- The dev branch was created from that commit. No later write to main was performed.
- Live state paths remain empty. All example data was placed under tests/fixtures/demo on ai-work-state/dev.

## Observed Git operations

1. Created initial synthetic branch-0 checkpoint 1 with empty task associations, as well as a synthetic request delta.
2. Used a single Git tree and commit to advance the synthetic branch-0 to message 2 and create its request delta and a mock task baseline, state, log and handoff. Commit: e6fb7cbd2c96de753d9ae7a36998c2b0324b73c9.
3. Read back the checkpoint, request delta, state, log and handoff from dev and compared their contents.
4. Created a derived synthetic branch-1 from source checkpoint 0/1. The parent branch had since added mock task fixture-a at checkpoint 0/2; branch-1 correctly retained the empty task associations from checkpoint 0/1. Commit: 5e183d9c2e8129cd0ddcc64a26986dc2ae1abd37.
5. Read back 13 fixture and protocol files. Six dependency-free checks on those retrieved file bytes passed 6/6 by executing JavaScript callbacks in memory. This was not a separately invoked Node CLI.

## Conditional update probe

A deliberately stale expected_sha was supplied to the GitHub update_ref operation for an otherwise valid fast-forward. The call failed and a ref read-back confirmed that dev had not moved. The connector returned a generic GithubGraphQLAPIError UNKNOWN, not a structured conflict result. The same candidate commit succeeded with the observed current expected_sha. This is consistent with guarded updates but not conclusive evidence that all conflicts are correctly classified or recovered.

## What is still unverified

- Actual ChatGPT Project installation of the experimental bootstrap.
- Real conversation identity and message marker generation, cross-chat resumption, and branch detection.
- End-to-end automatic task event logging, checkpoint persistence and finalization for every user turn.
- Independent concurrent writers, loss/recovery during partial failure, and more extensive conflict-retry behavior.
- Manual audit command executing in a genuine configured host.

## Next test

Use a dedicated experimental ChatGPT Project with ai-workflow/dev instructions and GitHub access to ai-work-state/dev. Validate a genuine task from initial routing through specification, architecture, requirement change, audit, and resume, inspecting every persisted checkpoint. Do not promote main or claim wide alpha readiness before this test.

These results prove only observed synthetic Git read/write operations and file contract checks; they do not prove operational deployment or automatic user-conversation persistence.
