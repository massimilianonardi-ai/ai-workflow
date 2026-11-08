# AI Workflow — experimental lab

Status: **Experimental / not activated**

This repository is an isolated design and evaluation space for a provider-agnostic
AI workflow bootstrap, separated from individual project and task state.

It is **not** an adopted agent instruction set, an executable bootstrap, or a
replacement for any project's current authority. In particular, the existing
RumiAI bootstrap in `rumiai-dev` remains the active baseline. No ChatGPT Project
Instructions, agent configurations, runtime products or memory services are
changed by material in this repository.

## Experimental bootstrap pilot (opt-in only)

The operator accepted this **first experimental implementation** of the
command/natural-language dispatcher. It is not active in existing ChatGPT
Projects and does not replace RumiAI's bootstrap.

- [Bootstrap](bootstrap.md): short two-level selective-disclosure router.
- [Interactive design/development specification method](behavior/specification.md) and [task-specification template](templates/task-specification.md): mandatory task-owned draft, user-approved use cases and concrete acceptance scenarios before dependent implementation.
- [Commands](routing/commands.md): `!aw` grammar and diagnostic `route`.
- [Intents](routing/intents.yaml): open-set, multi-intent and modality-aware catalog.
- [Context index](routing/index.yaml) and [reference resolution](routing/resolution.md).
- [Project-scope example definitions](contexts/example/project-boundaries.md): contrasting single-infrastructure and multi-cluster scopes; these are optional project context, not a global hierarchy.
- [Example state](contexts/example/demo-state.md): isolated header-first fixture.
- [Acceptance scenarios](evaluations/bootstrap-routing.md): early examples.
- [Reproducible evaluation protocol](evaluations/test-protocol.md) and [structured test cases](evaluations/test-cases.json): clean-chat trials, outcome oracles and scoring. Selected responses have been reported by the operator; the full repeated pilot remains incomplete.
- [Task-identity and contradiction regression runbook](evaluations/context-identity-runbook.md): same-chat cases; `out-08`/`out-09` produced observed critical failures. See [finding and proposed applicability method](evaluations/lessons/task-identity-contradictions.md).
- [Cross-chat context identity runbook](evaluations/cross-chat-identity-runbook.md): `out-11` produced an observed critical failure; `out-12` and named-project control `out-13` remain unrun. The operator ended this focused test series in favor of a systemic revision.
- [Earlier routing comparison](evaluations/routing-protocols.md): exploratory alternatives.

Reusable method documents live in `behavior/`; mutable task/project state
belongs in `contexts/`. Folder nesting does not determine logical hierarchy.
The pilot consists of model-readable instructions and fixtures, **not** a
deterministic resolver, validated classifier or portable host integration.

## Design intent under evaluation

- Keep relatively stable **workflow behavior** documents separate from mutable,
  structured **context/state** documents.
- Let each state document start with references to the applicable workflow
  and relevant state, so direct state resumption is possible.
- Select context by declared identifiers, relationships and evidence rather
  than fixed project/task/chat directory nesting.
- Keep source relevance, source authority and decision authorization distinct.
- Verify first operator-visible outcomes, not merely internal task progress.
- Compare with an unchanged RumiAI baseline before any opt-in pilot.

A GitHub URL is only a document location, not proof that an agent can fetch,
interpret or enforce the protocol. Any such claim requires client-specific tests.

## Newly implemented experimental design/development path

The same **multidimensional, multi-intent matrix** remains the routing model. When an actual task includes design/development, the agent creates or updates **one task-scoped `task-specification.md`**, refines the user's request interactively, and establishes concrete use cases and directly linked verification scenarios. The agent cannot treat its own assumptions as approval: the user accepts the sufficiently complete specification before dependent implementation begins. After approval, execution is autonomous inside the established boundaries. Ordinary direct requests remain free of this process; compound tasks can combine methods.

Acceptance is derived **only from the current task's agreed use cases**, not from automatic inheritance of any unrelated historical testing/validation apparatus. Verification has an explicit completion condition; a perpetually growing test backlog is not the product. The template and behavior documents are experimental; their publication **does not configure any existing ChatGPT Project** or prove actual model compliance.

## Current direction

An **experimental successor** now checks both the *scope of a project* and the *identity of the current task* before applying earlier state. It treats explicit contradictions as evidence about applicability, not as facts to explain away. The user elected to stop the highly repetitive network/server-count test series and develop this general method instead. Earlier observed results remain attributable to the previously pinned `c9d12ce` bootstrap; they are not validation of the successor.

Project owners must define whether their project describes one stable managed subject, a family of independent task instances, or another explicit scope. The examples are optional aids, not automatic Project Instructions. No connected ChatGPT Project configuration or RumiAI production contract is changed by these repository edits.
