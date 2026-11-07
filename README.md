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
- [Commands](routing/commands.md): `!aw` grammar and diagnostic `route`.
- [Intents](routing/intents.yaml): open-set, multi-intent and modality-aware catalog.
- [Context index](routing/index.yaml) and [reference resolution](routing/resolution.md).
- [Example state](contexts/example/demo-state.md): isolated header-first fixture.
- [Acceptance scenarios](evaluations/bootstrap-routing.md): early examples.
- [Reproducible evaluation protocol](evaluations/test-protocol.md) and [structured test cases](evaluations/test-cases.json): clean-chat trials, outcome oracles and scoring. Selected responses have been reported by the operator; the full repeated pilot remains incomplete.
- [Task-identity and contradiction regression runbook](evaluations/context-identity-runbook.md): three prepared two-turn tests, **not yet executed**, with a separate [lesson and proposed decision gate](evaluations/lessons/task-identity-contradictions.md).
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

## Next step

Test the accepted experimental candidate in **isolated, clean-chat** runs,
including source-pinned historical Keycloak/rsudo scenarios and a comparison
with the unchanged RumiAI baseline. The prototype bootstrap exists, but it
remains unvalidated, non-active and unsuitable for silent installation.
