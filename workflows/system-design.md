# Workflow: system-design (v0.2.0 alpha)

**Route:** MDM `operation: design` when a substantive system-design task is detected. **Not** automatically applicable to every conversation about technology; straightforward explanations may be answered directly. Goal: produce a traceable specification and a coherent architectural proposal, without implicit code deployment.

## Universal phase contract

Each control phase declares: goal, entry prerequisites, permitted autonomous work, human decision gates, evidence/artifacts, **verifiable completion criteria**, allowed transitions and interruption conditions. One principal control phase is active per task workflow; internal research, review or multiple microactivities do not become other active control phases.

Expose at each meaningful checkpoint: active phase, current microactivity and next observable result, per-episode human-turn estimate and observed count, agent-step estimate/count **if agents actually ran**, last material progress or blocker, missing exit criteria and next authorized action. Keep an event log with verifiable result references and preserve revised estimates.

### Phase `specification` (default entry)

**Goal:** understand system outcome, users, functional/nonfunctional requirements, constraints, integration/deployment boundaries and acceptance criteria.

**Entry:** relevant task and identifiable goal. If an architectural boundary is consequential but unknown, clarify it *before dependent choices*; avoid repeating resolved questions. Gather facts autonomously with authorized tools and distinguish confirmed requirements, hypotheses and proposals.

**Outputs:** requirements and constraints, decision approvals and their provenance, acceptance criteria, blocking vs deferrable open questions, evidence for important external facts.

**Completion gate:** (a) scope matches the task baseline; (b) enough requirements exist for architectural alternatives without invented major decisions; (c) consequential decisions requiring approval have actual approval, with nonblocking unknowns declared; (d) decisive facts are supported or explicitly limited; (e) the spec/checkpoint is reviewable and traceable. If blocked, do not fake a completed phase.

**Transition:** `specification -> architecture` on verified gate, without rerouting MDM and without requesting a redundant `procedi` where already authorized.

### Phase `architecture`

**Goal:** propose and critically verify architecture consistent with current approved requirements.

**Entry:** verified sufficient specification, source decisions and necessary tool permissions.

**Work:** compare meaningful alternatives and trade-offs, design components/interfaces/dependencies, map requirements to design, review risks and evidence. Research remains subordinate. Do not implement, install or deploy merely because architecture is ready.

**Outputs:** inspectable architecture, rationale, requirements traceability, risks, performed vs planned verification, accepted vs outstanding consequential decisions.

**Completion gate:** (a) a coherent inspectable proposal exists; (b) critical requirements are covered or blockers declared; (c) actual verification distinguished from hypotheses and planned tests; (d) needed approvals are scoped to the exact decisions/versions; (e) the record says `ready for review` vs `approved`, with any required final gate satisfied. End **design workflow**, not automatic `develop`.

## Revisions, regression and authority — approved rules P1–P5

**P1 — result validity:** retain each historic completion and result with the requirement/decision version it relied on. After a revision, flag only affected dependents as `needs_revalidation`; do not erase history or pretend prior approval still applies unchanged.

**P2 — phase return vs local correction:** if an approved, clear requirement merely changes architecture, stay in `architecture` and repair affected design. Return to a new episode of `specification` only if its own prerequisite, decision or completion gate is reopened. A material change of core goal needs authorized baseline revision or another task; consider MDM then, not automatically.

**P3 — episodes and cumulative history:** a return creates a new phase episode with new relevant-turn estimates/counts while retaining aggregate history. Re-entering must not reset evidence of a repeated stall.

**P4 — scoped approvals:** approval applies only to identified content, revision and decision. Approving a changed requirement does not approve a changed architecture; a contextual `procedi` cannot authorize deployment or unagreed scope.

**P5 — decisive evidence:** record analyses, actual checks, planned tests and missing evidence separately. No assertion of validated performance based only on a plausible design. If a decisive acceptance check is missing, do not certify completion.

**Allowed transitions:** `specification -> architecture`; `architecture -> specification` when the specification gate reopens; `architecture -> complete` when its gate and any final approval are satisfied. Any early interruption uses the continuity controller; no re-routing merely for an internal return.

## Optional compositional phase `iterative-design`

A workflow may deliberately select a *single* `iterative-design` control phase to coordinate specification and architecture microactivities concurrently. Its joint gate requires both sets of applicable completion criteria. Do not activate two independent phases simultaneously or create this variant by implication. This variant is **not the alpha default** and requires real validation.

## Event logging and audit

Use `control/continuity.md`: progress, blocker, approval, estimate revision, result invalidation, phase entry/exit and audit outcome are meaningful events. Reference actual artifacts or decisions. If a requirement change affects architecture, record the old/new requirement, affected artifact and necessary revalidation. No fabricated agents, test results or checkpoint writes.

**Out of scope:** implementation, production operations, multi-task orchestration and broad human-state inference. Those require separate workflow specifications or later revisions.
