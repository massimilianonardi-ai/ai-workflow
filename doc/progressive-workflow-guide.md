# Progressive Design & Execution — user and maintainer guide

This is the active **design/develop method** for AI-Workflow. Start with [bootstrap](../bootstrap.md), then route real design work to [system-design](../workflows/system-design.md) and development to [develop](../workflows/develop.md). Formalization levels and approval rules are in [L1–L11](../workflows/progressive-levels.md).

## Practical operating model

1. **Define outcomes and acceptance (L1–L3):** assistant examines accessible facts; operator confirms the desired behavior, scope and material ambiguities. Produce short objectives, requirements, use-case and acceptance artifacts.
2. **Choose boundaries (L4):** assistant presents **one complete synthesis** of consequential explicit/inferred decisions, rejected alternatives, public contract and module owners. Operator decides architecture-changing ambiguity; do not code silently.
3. **Detail without micromanaging (L5–L8):** assistant prepares component/interface contracts, significant function/flow diagrams, characteristic tests and a milestone plan. More diagrams or files are justified for higher complexity; technical decisions are assistant-owned.
4. **Implement and supervise (L9–L10):** after approval and authorized writes, assistant implements, tests, self-reviews modularity and updates product docs. At milestones/drift an internal or second-chat reviewer checks pinned plan/spec and real code evidence; verdict is `continue/correct/suspend`.
5. **Deliver with evidence (L11):** provide actual product revision, docs index, acceptance observations, important limitations and operations guide. A green mock is not a real remote system test.

## Example: minimal remote service adapter (illustrative, not a test result)

**L1–L3:** expose two CLI operations: execute a remote product's standard CLI/API, and read an explicitly named credential location. Desired result includes correct argv/body, no unnecessary public helpers and observed error codes.

**L4:** compare (a) a small wrapper delegating protocol behavior to the existing product and transport to the established transport module, versus (b) recreating many administrative APIs. If a prior module is offered as "inspiration", only relevant patterns may be reused; **ask the operator** which architectural contract to implement if both interpretations are plausible.

**L5:** `transport` owns SSH/sudo; `adapter` owns product-specific validation/request; product's native tool owns the full service API. Diagram `CLI → adapter → transport → native product`. Do not copy transport code into adapter or rebuild the service client.

**L6–L7:** define only the required exported functions, a short validation/quoting/error flow and representative pass/fail tests with explicit mock vs real distinctions.

**L8–L11:** implement one vertical end-to-end path early, build/verify allowed targets, update interface/flow/operations docs with code; report actual CI successes and disclose unavailable live server acceptance.

## Two-chat quality review

The main chat retains approved contracts, code and meaningful state. A review chat pins main chat/branch/checkpoint and exact product SHA, checks source and independent evidence, and reports objective deviations. The operator chooses whether to apply feedback. A snapshot alone cannot prove the number or nature of conversational digressions; reviewing them requires direct excerpts or transcript access.

## Output guide

Product docs belong **with the product** (usually `docs/` or `doc/`) and use the [product-doc templates](../templates/product-docs/README.md). AI-Workflow task-state, plans and chat snapshots provide provenance and resumption rather than replacing public documentation. Prefer many focused, concise, complete artifacts; do not generate empty irrelevant placeholders.
