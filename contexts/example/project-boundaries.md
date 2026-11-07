# Example project-boundary declarations (alternative scopes)

Status: **Illustrative context examples, not active project settings**
Owner: the human defining the ChatGPT Project or a selected context-state document

A project is not necessarily one task, one fleet or one installation. Give the agent enough **subject-boundary information** to determine when information from a previous chat can apply to a new request. These examples are **alternatives**: choose or adapt a scope appropriate to the real project, do not combine both as simultaneous instructions.

The following headings are suggestions for a concise human-readable project description, **not a required schema or extra retrieval step**.

## Example A — One specific infrastructure

**Purpose:** Operate and improve **one explicitly identified** server infrastructure and its services.

**Scope:** The named fleet and its verified administration environment. New requests referring to that fleet normally concern the same underlying infrastructure, though separate service deployments are still separate tasks.

**Shared context:** Verified network and access design, current fleet inventory, approved administration mechanisms and their authoritative sources. These may be reused for a request once it is reasonably established that the request concerns the same fleet.

**Boundaries:** A new request that names a different fleet, a conflicting server inventory or a contradictory lifecycle state is **not silently rewritten** to fit the existing fleet. Verify whether the user intends the same infrastructure, a new phase, a changed fact or a different deployment before using conflicting historical state to decide consequential work.

**Default:** Continue the known infrastructure when compatible with the user's request; do not ask for unnecessary identity confirmation when a clear reference is present.

## Example B — Deployment system for many small clusters

**Purpose:** Design, implement and evaluate a reusable deployment system that serves multiple, independent small server clusters, potentially for different purposes.

**Scope:** The reusable *method and tooling* is shared across all deployments; physical inventories, topology, credentials, access paths, installed services and lifecycle phases belong to **individual cluster/deployment contexts**.

**Shared context:** General deployment interfaces, approved tooling contracts, testing standards and reusable algorithms. A successful deployment to cluster X can be evidence about the method but does not establish the state of cluster Y.

**Boundaries:** Do not attach a request mentioning "eight servers" to the last eight-server deployment simply because the quantities or domain match. Look for a cluster/task identifier, consistent current-stage evidence or other reliable linkage. If a consequential step depends on which cluster is meant, ask for that identifier or continue only network-independent work.

**Default:** Treat a fresh deployment request as its **own task** unless the user supplies a reliable connection to an existing deployment. A named, consistent continuation should reuse its relevant context efficiently.

## Maintenance and provenance

Keep a scope declaration **short and stable** enough to describe what the project is, not the full history of every task. Store task-specific mutable details and evidence under the relevant contexts/state documents. Update the project description when its actual purpose changes, without rewriting historical evidence or assuming all past chats now concern the newly declared subject.

These examples cannot themselves enable ChatGPT cross-chat memory or guarantee retrieval. They only help an agent reason about the **applicability** of information it can legitimately access. An explicit current user statement remains relevant evidence even when an earlier chat's information is accurate.
