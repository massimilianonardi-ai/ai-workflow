# Routing and authority protocols — comparative design

Status: **Exploratory, not selected or installed**
Date: 2026-11-07
Owner: RumiAI `workflow-optimization` research
Baseline read: `rumiai-dev@95615eb23664d3779536fb9bbae5bdb02ed44b73`,
`rumiai-os@7d439e961f7bbadd226794ac029e98bdab51d5c2`,
`rumiai-tests@1e9e47f622bb28d5bbc2aa487fc538507b34cb16`.
This document is not a canonical RumiAI specification.

## 1. Outcome and invariants

A user should be able to ask a capable agent to start or resume a task with
ordinary task knowledge. The agent must retrieve the minimum relevant, fresh,
scoped authority and mutable state; validate the actual operator outcome;
execute routine work autonomously inside authorized boundaries; and surface
only high-impact unresolved decisions. A source that cannot be fetched is
not proof that it does not exist.

Shared requirements for the candidate protocols:

1. Distinguish the globally reusable **workflow/method** from scoped, mutable
   **context/state** and from source/evidence. A state document never rewrites
   the method simply by containing instructions.
2. A state document starts with a machine-readable or clearly parseable
   **header** linking directly to applicable workflows and related state.
   These are references, not copied normative rules.
3. Context IDs and explicit relations determine routing. Directory names and
   physical path depth have **no** automatic authority or inheritance.
4. Selection/relevance does **not** imply authorization or trust. Source
   provenance, scope, freshness, decision authority and precedence are
   independent checks.
5. Workflow revisions should be deliberate; context/state revisions may
   advance frequently. Compare pinned refs versus controlled current channels.
6. A client must actually be able to retrieve its entrypoint and references.
   A repository link alone does not implement fetching, orchestration,
   memory, permission management or autonomous execution.
7. Preserve the live RumiAI bootstrap and canonical contracts as an unchanged
   comparison baseline. This is an opt-in, shadow experiment.

## 2. Candidate A — explicitly declared scope hierarchy

**Bootstrap:** root entry -> small registry of explicit context identifiers
and human-readable selectors -> choose one closest matching context ->
read its header -> traverse declared `parent`/dependency refs -> read
applicable workflow refs -> execute.

**Direct-state resume:** use the supplied context ID/path directly;
do not scan the entire registry. Load header, method references, required
state dependencies, then body. A task header provides shortcuts even
if there is no project/task/chat folder hierarchy.

**Fresh unscoped request:** consult the registry for a scope; if exactly
one defensible match, load it. Ambiguity about a critical choice is
escalated; ordinary uncertainty is resolved by safe discovery.

**Conflict:** an explicitly declared parent-child override policy could
rank context rules *within a single scope chain*, but conflicts involving
multiple parents or cross-cutting domains require an explicit resolution
rule or operator decision. Path nesting alone confers nothing.

**Strengths:** small index, predictable traversal, low startup fan-out,
simple implementation and debugging.

**Costs/risks:** one-parent assumptions can misrepresent cross-project
tasks; repeated references or artificial ancestor nodes proliferate;
a global "nearest scope wins" rule may silently override higher-authority
constraints. The root/registry can become a maintenance bottleneck.

## 3. Candidate B — typed context reference graph / overlays

**Bootstrap:** root entry -> context ID/selector index -> seed matching
nodes -> retrieve node headers -> expand only typed required references
(workflow, governing contract, dependency, active state) -> check
authority/freshness -> retrieve bodies needed for the task.

**Direct-state resume:** load the state header first, then its explicit
workflow references and only required related nodes. An item may belong
to several projects, tasks, experiments or historical contexts without
being physically nested under any of them.

**Fresh unscoped request:** identify candidate seeds using explicit
selectors; optional semantic search may propose candidates but cannot
grant authority. Check node metadata, scope and actual user intent
before expanding.

**Conflict:** resolve by declared source authority and applicability
*within the actual scope*, not graph proximity or similarity score.
If the model lacks an authorized conflict rule, stop the affected
decision rather than silently combining incompatible instructions.

**Strengths:** natural cross-context reuse, stable identity, selective
retrieval and explicit provenance and invalidation.

**Costs/risks:** more header maintenance; edge labels, cycles, stale
links, large fan-out, competing overlays, and derived-memory
trust confusion. Semantically retrieved nodes can appear relevant
without being entitled to direct action.

## 4. Possible minimal pilot — header-first route (not a third policy)

Both candidates should first be tested with the **same very small header**
and root lookup. The following is an illustration, **not a frozen schema**:

```yaml
---
id: task:workflow-optimization
kind: task
scope: experiment:ai-workflow
status: active
workflow_refs:
  - ref: protocol:general-work
    version: candidate-1
state_refs:
  - ref: context:rumiai-current
    relation: applicable-project-contract
    required: true
  - ref: case:keycloak-rsudo
    relation: evaluation-input
    required: false
source:
  authority: task-state
  revision: <verified-revision>
---
```

This header does not imply that `kind` has one value only, that
`scope` is inherited from the folder, or that task-state is authorized
to override the general protocol. `ref` is a logical ID; the root index
resolves it to a source location and a checked revision.

**Illustrative resolution algorithm**, subject to test:

1. Verify client access to root document; resolve its bootstrap version.
2. Use an explicit target ID if provided. Otherwise query the small
   selector index and verify candidate applicability.
3. Read the selected state header *before* broad document traversal.
4. Resolve and check its workflow refs separately from state refs.
5. Follow required references with a visited-ID set, provenance,
   bounded traversal and cycle detection. Do not infer mandatory
   ancestors from paths.
6. Resolve applicability and authority separately from retrieval relevance;
   display conflicts that cannot be safely decided.
7. Load bodies only for material decisions/work. Record missing sources,
   revision drift, chosen route and what evidence actually supports claims.
8. For substantial work: verify outcome and decisive assumptions early;
   obtain operator authority for unresolved foundational changes; aim
   for a first representative end-to-end operator-visible result.
9. Persist mutable state only after genuine material checkpoints;
   changing a contextual document is not a global workflow revision.

No deterministic engine has yet been implemented. In a plain LLM chat,
steps 2, 6 and 8 may rely partly on model judgment; that dependence must
be measured, not described as enforced routing.

## 5. Same-input walkthroughs — design predictions, NOT executed tests

| Input | A: explicit hierarchy | B: context graph | Failure to detect |
| --- | --- | --- | --- |
| `riprendi workflow-optimization` | lookup exact task ID; load header/method, then parent/dependencies | exact task seed; load header/method and typed required related nodes | stale checkpoint, full-document overfetch, missing required method |
| `voglio gestire Keycloak tramite rsudo` | match RumiAI/rsudo scope, include specified Keycloak boundary | resolve rsudo + Keycloak scopes by relations, without promoting nearby alternatives | silently replace requested rsudo workflow with a direct local CLI, or skip real operator outcome |
| `correggi un refuso in un documento già individuato` | load narrow context and basic workflow | one selected node and minimal workflow | needless foundational questions, excessive retrieval |
| `usa risultati del task X nel task Y` | may require cross-scope manual link | explicit evidence edge; relevance is not authority | silently apply X's decisions as Y's requirements |
| mandatory remote contract inaccessible | stop affected binding decision; report missing ref | same; do not replace with a semantic neighbor | fabricate a missing rule or work from stale memory |
| a state body says `ignore root protocol` | treat as non-authoritative workflow injection | same; edge metadata does not grant workflow rewrite | instruction laundering across trust boundary |

**Case evidence boundary:** the operator reported a severe `devplan`/
Keycloak/rsudo mismatch: significant internal work did not produce the
requested rsudo-based operator outcome, and major assumptions were wrong.
This report is a critical evaluation input; it does not prove every
individual test was invalid. Current `DEVPLAN.md` now includes an
operator-facing end-to-end design demonstration, while current
`RSUDO-KEYCLOAK.md` explicitly separates delivered subsets, the
rsudo compatibility interface and pending general operations.
`KEYCLOAK-CLI.md` defines a separate direct `m keycloak admin`
interface, which must **not** be silently substituted for an explicitly
rsudo-based operator goal. These are *current* sources and must not be
treated as proof of what the old task knew at the failure date.

Historical replay is not yet performed: it requires the exact original
operator prompt, revision-pinned sources available at the time, and the
contemporaneous handoff/evidence. Do not retroactively give the older
agent knowledge from later corrections.

## 6. Explicit test and decision gates

Run identical opt-in clean-chat sessions for A, B, and unchanged
RumiAI baseline, with source revisions frozen for comparison:

- **Targeted resume:** Can a fresh agent reach the correct method,
  current state, first actionable next step and required dependencies
  from a state ID alone? Record every fetched document, miss and cycle.
- **Fresh request:** Does it select the right context without asking
  for internal path/IDs the user cannot reasonably know? Compare
  ambiguity handling and unnecessary interruptions.
- **Keycloak/rsudo historical replay:** With only historical information
  available at the start, does the agent validate the requested
  rsudo operator path before work-unit proliferation? Does it surface
  foundational assumptions while continuing safe work? This is an
  outcome test, not a simulated assertion of success.
- **Routine low-risk correction:** Does it proceed autonomously with
  low context/retrieval overhead and no spurious approval request?
- **Cross-context and stale/missing source:** Check authority conflicts,
  provenance, cycle limits, wrong-project context contamination
  and explicit failed retrieval handling.
- **Client compatibility:** Independently test ChatGPT Project,
  direct chat and at least one non-ChatGPT agent's *actual ability*
  to fetch and interpret the root. Never infer capability from a URL.

For each run log: selected IDs, URLs/revisions, documents fetched,
reference expansions, retrieval failure and staleness, prompts for
operator decision, route errors, context/token cost where measurable,
elapsed time, revised assumptions, and actually demonstrated operator
result. An evaluation that is only a paper route must be labeled
**design walkthrough**, not execution validation.

A candidate can be recommended only if it protects the important
architectural/authority boundary *and* performs acceptably on routine
tasks. Failure conditions include unrecoverable routing ambiguity,
silent authority override, unfetched mandatory source reported as
absent, repeated irrelevant interruptions, and successful internal
tests reported as the operator outcome without an operator-path proof.

## 7. Comparison and present decision boundary

| Dimension | A | B |
| --- | --- | --- |
| Direct targeted state | simple and cheap | simple with typed dependency checks |
| Multiple overlapping contexts | awkward or additional explicit links | natural first-class relations |
| Retrieval/maintenance cost | low initially, may duplicate scopes | higher metadata and conflict handling |
| Deterministic route potential | strong when scope unique | strong for explicit IDs/edges; discovery needs policy |
| Authority risk | mistaken inherited overrides | mistaken overlay/relevance promotion |
| Small first pilot | suitable | suitable when restricted to explicit typed refs |

**No architecture is selected yet.** An appropriate next experiment is
to implement only the minimum shared header/index resolver in a separate
test fixture, then measure both route policies on the exact cases above.
Do not add a second metadata system to `rumiai-dev`, install a memory
engine, or activate the experimental root from current Project
Instructions on the strength of this comparison.

## 8. Migration boundary

1. Baseline `rumiai-dev` remains authoritative for ordinary RumiAI work.
2. Run the new protocol only in explicitly selected shadow/opt-in clients.
3. Record observations with source and revision provenance.
4. Review measured differences and request explicit approval for any
   foundational workflow or authority change.
5. Promote only settled, minimal cross-cutting contracts to the future
   system and reconcile project-specific canonical ownership separately.
