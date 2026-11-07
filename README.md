# AI Workflow — experimental lab

Status: **Experimental / not activated**

This repository is an isolated design and evaluation space for a provider-agnostic
AI workflow bootstrap, separated from individual project and task state.

It is **not** an adopted agent instruction set, an executable bootstrap, or a
replacement for any project's current authority. In particular, the existing
RumiAI bootstrap in `rumiai-dev` remains the active baseline. No ChatGPT Project
Instructions, agent configurations, runtime products or memory services are
changed by material in this repository.

## Current investigation

- [Routing and authority protocol comparison](evaluations/routing-protocols.md)
  compares alternative progressive-disclosure and context-graph protocols.
  Both are *candidates*, not approved contracts.

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

Agree on a testable candidate and run isolated, source-pinned routing and
clean-chat resumption trials. Until then there is no stable manifest or
universal bootstrap instruction to install.
