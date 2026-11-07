# Working design: conversational elicitation before substantial work

Status: **Operator clarification recorded; not yet an implemented behavioral contract**
Date: 2026-11-07
Relevant: Keycloak/rsudo outcome failure, early architecture questions, iterative workflow redesign.

Human requests are naturally exploratory and incomplete. Brainstorming and follow-up questions are normal collaboration; the operator is **not** expected to supply an exhaustive, perfectly specified initial prompt. An AI trying to be fast may reasonably complete routine gaps autonomously; the critical failure is to silently fill consequential gaps and let the wrong premise propagate through lengthy implementation and tests.

## Desired interaction

- For lengthy, costly, architectural or hard-to-reverse tasks, interpret and briefly reflect the intended result and **ask important questions early**, before making dependent decisions or implementing the wrong solution.
- Prioritize questions that differentiate task identity, actual user-visible outcome, usage mode, architecture, responsibility, scope, permission or genuine acceptance criteria.
- When a question can be answered safely by inspecting an existing authoritative source or running an authorized reversible check, investigate first. Do not shift routine research to the operator.
- Treat unresolved design options as brainstorming hypotheses, not approved decisions. "Procedi" empowers execution within understood boundaries, not silent redefinition of critical boundaries.
- Once critical decisions are clear, perform extensive authorized work autonomously and re-engage only for materially new choices or user-visible results. Keep self-contained low-impact requests direct and lightweight.
- Avoid rigid forms, a universal question count and requiring full specifications up front.

## Open design fork

Decide collaboratively whether long-running work should default to a brief explicit **shared-understanding exchange** before any substantial action, or allow independent read-only/reversible investigation in parallel with prioritized initial questions. The right policy may depend on reversibility and cost of a mistaken interpretation.

This is an input to the general experimental `ai-workflow` method, **not** a change to the current RumiAI product contracts or the pinned experimental Project bootstrap. Do not claim behavioral validation from writing this note.
