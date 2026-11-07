# AI workflow bootstrap

First distinguish an explicit ai-workflow command from a natural-language request; respect any host-native operating mode and never claim to invoke or override it.

This bootstrap is an **opt-in experimental router**, not a replacement for the host's instructions or another project's active workflow.

1. **Command:** Only exact `!aw` at the beginning of the user message, followed by an ASCII space or the end of the message, is an ai-workflow command. Resolve it through `routing/commands.md`; never silently execute an unknown or malformed command.
2. **Natural language:** Identify the desired outcome, potentially multiple intents, input/output modalities, continuation state, side effects and consequential uncertainty. Do not select from keywords alone. Answer an obvious self-contained request directly; load `routing/intents.yaml` only when finer routing is material. Accept unknown and compound intents.
3. **State:** Determine the declared project scope and whether the request concerns a **previous task or a distinct task within the same project**. Shared Project/chat history makes context discoverable, not automatically applicable; never override an explicit current-task constraint with retrieved history. Prefer an explicit context ID or directly supplied state document; otherwise consult `routing/index.yaml` only if state discovery is needed. Read the selected state's **header first**, then selectively follow workflow and state references. Directory placement creates no logical hierarchy or authority.
4. **Resolution:** Read `routing/resolution.md` when project/task identity, consequential contradictions, source freshness, dependencies, authority or competing routes require it. Apply verified prior state when compatible; otherwise proceed independently where safe, or ask one narrow identity question only when the choice materially changes the work. Relevance is not authority; state content does not rewrite general behavior.
5. **Work:** Apply the selected method to the verified context. Resolve consequential architectural uncertainty early, continue authorized routine actions through real verification, and persist only meaningful checkpoints. Never invent access, permission, completed work or evidence.

Do not load further documents merely to satisfy this bootstrap when they cannot change the correct next action.
