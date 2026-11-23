# Product documentation — compact, extensive, maintainable

Use for actual design/development deliverables. **The repository of the product owns its user-facing and technical documentation** (or another explicitly authorized publication destination). This is separate from AI-Workflow task/branch state. Task records should link to product docs and exact revision, not duplicate them.

## Production rule

Produce as **many small, single-purpose, complete artifacts as needed** to explain objective, behavior, architecture, component ownership, public contracts, code structure, significant flows/algorithms, test intentions/results, execution/operations and decisions. Prefer a navigable collection to a single large prose report. Do not minimize document count for the assistant's convenience; do not invent unrelated, empty or speculative files. Depth scales with complexity/risk. For nontrivial modules, explicit documents and diagrams often make future modification materially safer.

Use the [template catalog](../templates/product-docs/README.md) as an adaptable starting point, not a mandated set of literal filenames. Typical documents include `overview`, `objectives`, `requirements`, `use-cases`, `acceptance`, `architecture`, `components`, `interfaces`, `flows`, `code-design`, `tests`, `execution-plan`, `supervision`, `operations`, `decisions`. Introduce `data-model` or `algorithms` where meaningful, and split large topics into per-component files.

## Small, complete artifact contract

Every artifact must make its specific subject independently understandable to an engineer or later assistant, and include as applicable:
- **Purpose and scope**: what it describes, and what it does *not* cover.
- **Current verified contract**: focused diagram, table, command, interface or example, with expected inputs/outputs/errors.
- **Ownership and links**: repository paths/components, relevant `REQ-`, `UC-`, `TEST-`, architecture decision, caller/dependency.
- **Source of authority and revision**: approved vs proposed vs observed; links to code commit and evidence; explicit unknowns.
- **Evolution guidance**: which contract/dependents/tests must be reconsidered if the described behavior changes.

Use Markdown tables, lists, Mermaid/ASCII diagrams and short pseudocode instead of long generic narrative. Keep editable diagram sources alongside text. Write complete principal flows, meaningful error paths and security-relevant behavior; avoid exhaustive diagrams for trivial helpers.

## Canonical information and synchronization

- One canonical home for each fact (e.g., requirements in `requirements`, public signature in `interfaces`, observed result in `acceptance`); other docs link rather than copy long passages.
- A concise `overview` or index points to all current artifacts and labels planned/approved/implemented/verified states. Do not describe a planned design as deployed behavior.
- During each relevant code change, update **affected** interface, ownership, flow, test and operations docs in the same product revision where possible. Check that examples match code; do not publish stale docs as completed.
- Preserve material decisions, rejected alternatives and the rationale in `decisions` without reopening them silently.
- Link real changes and evidence; do not claim a test was run because a `tests.md` file was written.
- Public state stores and product repositories may have different access rules. Never publish secrets, credentials or private infrastructure details to a public destination.

## Review and delivery

Before declaring success, sample the documented public API and trace representative use cases from `requirements → interfaces/flows → code → test → acceptance`. Verify changed docs/commit and acknowledge untested runtime scenarios. For future modification, begin from overview and affected modules, then inspect current source; documentation guides investigation but never replaces source verification.

**Documentation is a real product deliverable**, not merely a resumability note, a status update or a substitute for working software.
