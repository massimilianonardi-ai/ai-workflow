# AI-Workflow alpha-dev — static contract verification

**Date:** 2026-11-10  
**Scope:** GitHub branch `dev` only, model-readable workflow files. **This is not a host behavioral test.**

## Observed actions

- Created `dev` from the existing `ai-workflow/main` head `8519db3e79a0dd55ee9ffe83945494fe970141a1`.
- Published alpha files with a single Git tree/commit (`0c3cc0cac250163a1898cbc358bdedca64a38a8e`), followed by a small test addition and documentation updates.
- Fetched the resulting `dev` files through GitHub and verified actual blob identities.
- Executed the seven JavaScript test callbacks from `tests/alpha-contract.test.mjs` **in memory** using an ECMAScript runner, with file reads supplied by verified GitHub `dev` contents. This was not a local `node --test` execution.

## Structural results: 7/7 passed

1. Bootstrap declares all three universal sections and exact mandatory sequencing.
2. MDM has four dimensions and the six primary operation families; design links to the existing workflow.
3. Commands include `!aw audit` and read-only `!aw route` semantics.
4. `system-design` contains its two principal phases, optional compositional variant and revision rules P1–P5.
5. Continuity specifies early critical triggers and the four audit levels.
6. Persistence protocol specifies read-back, pending/unavailable behavior and branch checkpoint comparisons.
7. All internal Markdown/YAML references in the alpha files resolve to files present on `dev`.

These checks validate **document structure and references**, not actual model decisions or transactional Git writes. They do not prove that natural-language routing, agent coordination or checkpoint persistence works correctly in ChatGPT.

## Repository isolation

The recorded `main` Git head was `8519db3e79a0dd55ee9ffe83945494fe970141a1`, while `dev` advanced. No mutation to `main` was performed as part of this alpha.

## Outstanding blocker: state repository

`massimilianonardi-ai/ai-work-state` is an **empty Git repository**. Attempting to fork `dev` from `main` returned HTTP 409 `Git Repository is empty`. The user requested work on `dev`; no implicit initialization commit on `main` was made. Until the repository is initialized in an explicitly authorized way and `dev` can be created, remote branch/task persistence cannot be verified.

## Next real tests

1. One-time authorized initialization of the state store followed by `dev` creation.
2. Install dev bootstrap only in a dedicated experimental Project or equivalent supported environment.
3. Execute `!aw route` dry-run, initial task creation, phase transition, requirement revision, manual `!aw audit`, branch divergence and pending/recovery scenarios.
4. Confirm read-back and expected-head conflict behavior; compare model outputs with spec and log failures before widening the alpha.

**No claim of completed real-runtime validation is made.**
