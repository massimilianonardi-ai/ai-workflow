# Progressive design — level contracts (L1–L11)

**Purpose:** operationalize progressively deeper, verifiable design and delivery. Apply in `workflows/system-design.md` or `workflows/develop.md` as appropriate. A level is a **formalization checkpoint**, not automatically a phase, document, task, Git commit or request for operator permission.

## Contract shared by every level

`Purpose → verified inputs → decisions (approved / proposed / unresolved, source) → compact schema/artifact → verifiable exit criterion → next level`.

Read and reference actual code/docs for claims about existing systems. Make consequential *inferred* decisions visible; an example or legacy implementation is not approval to clone its architecture. A level may need several small documents. Product documentation is distinct from workflow state; use [product-documentation](../behavior/product-documentation.md) and the [artifact templates](../templates/product-docs/README.md).

| Level | Inputs and concrete deliverables | Exit check and decision owner |
| --- | --- | --- |
| **L1 — Objectives** | Request, actor/context → `objectives.md`: desired observable outcome, scope, exclusions, priorities and authority. | User confirms materially consequential goal and limits; assistant identifies unsupported assumptions. |
| **L2 — Requirements** | L1, real environment/interfaces → `requirements.md`: numbered functional/nonfunctional requirements, compatibility, risks, invariants, origin. | No material conflict or unknown silently resolved; user answers only consequential alternatives. |
| **L3 — Use cases** | L1–L2 → `use-cases.md`, `acceptance.md`: representative normal/error inputs, observable results, acceptance IDs; initial characteristic tests. | User confirms *what success means*, not test implementation mechanics. Each main use case has an observable check. |
| **L4 — System architecture** | Accepted requirements, inspected systems → `architecture.md`, `decisions.md`: boundary diagram, reused products vs new components, alternatives, why, security/deployment. | Present one complete material choice synthesis; clarify incompatible interpretations; user approves substantive architecture before dependent implementation. |
| **L5 — Component design** | L4, actual code → `components.md`, `interfaces.md`, relevant `flows.md`: ownership/exclusions, callers, dependencies, state, effects, contracts and failures. | Assistant proves each responsibility belongs to one appropriate owner and interfaces compose; reopen L4 only for a major contract change. |
| **L6 — Code design** | L5 → `code-design.md`, focused flow/algorithm diagrams: actual files/classes/functions, signatures, invariants, branching, errors, required reuse. | Assistant checks no unneeded public API, misplaced logic, or unjustified complexity; no microapprovals. |
| **L7 — Test design** | L3/L5/L6 → `tests.md`: named test cases, use-case links, fixture/environment, action, assertion, result status; include a minimal typical end-to-end path. | Assistant confirms characteristic success/failure coverage and distinguishes mock/CI from actual remote acceptance. |
| **L8 — Execution plan** | L1–L7 → `execution-plan.md` and optional immutable task plan: milestone, dependency, artifact, check, done condition, risk and first vertical slice. | Assistant checks executable sequencing and actual access; user only approves new scope, external effects or significant costs. |
| **L9 — Implement** | Approved architecture, authorized writes, L6–L8 → working product, tests and updated docs in product repo. | Assistant verifies code ownership, relevant checks, real writes and traceability; fixes ordinary defects independently. |
| **L10 — Supervise** | Pinned plan/spec/product revisions → `supervision.md`: plan vs actual, evidence, drift, quality and recommended correction. | `continue / correct / suspend`; reviewer may be a separate read-only chat. No invented transcript or approval. |
| **L11 — Accept / handoff** | Accepted use cases, actual test/runtime evidence, product/docs → `operations.md`, current `acceptance.md`, overview. | Operator-visible behavior supported or explicitly labeled untested/blocked; accurate handoff and remaining limits. |

## Adaptive depth, no loss of substance

- **Small task:** all relevant levels still considered; combine closely related material into shorter artifacts when the distinctions remain easy to find. One technical diagram may cover the full flow. Do not manufacture empty files.
- **Medium task:** separate documents for responsibilities, interfaces, key data/control flows, named tests and milestones.
- **Complex or high-risk task:** repeat L4–L7 recursively at subsystem/module/function scale as needed. Elaborate high-risk flows, invariants, state changes and failure paths. Split artifacts by component/use case.
- Increase depth because of integration count, novelty, irreversible effects, security or uncertainty—not line count. Prefer many **small, complete, navigable** documents over a monolith. Do not minimize documentation file count merely for convenience.

## Approval, dependencies and revisions

1. **Operator gates**: outcomes/boundaries, acceptance behavior, material architecture/contract, and out-of-scope or external-effect authorization. Combine related decisions in one concise review. Approved unchanged decisions are not asked again.
2. **Assistant technical gates**: L5–L9 component ownership, code flow, tests, reviews and implementation choices. The assistant resolves these without asking the operator how to code.
3. **Supervision gates**: at a material milestone, unexpected drift, repeated failed attempts or before acceptance, compare evidence with approved revisions. A second chat may assess a *pinned* snapshot/commit independently.
4. If evidence invalidates a choice, return to the **lowest affected** level, revise dependent docs and plans, preserve approval provenance and redo only affected tests. Do not silently apply a changed product contract.
5. A `procedi` continues previously approved/authorized work; a design approval does not itself authorize writing to an unrelated system or deploying a service.
6. A formalization checkpoint and the per-response Git conversation checkpoint serve different purposes. Both follow their respective rules; more technical checkpoints do not require more Git conversation commits.

## Traceability without duplication

Use stable IDs where useful: `REQ-`, `UC-`, `ADR-`, `CMP-`, `IF-`, `TEST-`, `STEP-`. Links connect requirements → use cases → architecture/interfaces → tests → evidence. Canonical descriptions live in their own document; other artifacts use short links and deltas. Scope-specific templates guide content, not volume quotas.
