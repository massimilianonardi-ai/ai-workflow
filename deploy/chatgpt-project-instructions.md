# ChatGPT Project installation — current AI-Workflow

Use the current [bootstrap](../bootstrap.md) as the installed Project entry point. Installing instructions does not itself grant GitHub permissions or enable background execution.

Suggested Project instruction:

> For every request, read and execute the complete AI-Workflow bootstrap at https://github.com/massimilianonardi-ai/ai-workflow/blob/main/bootstrap.md. Follow its universal initialization, request execution, and finalization rules, and load only the conditional documents needed for the request. Use the configured state repository and verify actual GitHub write/read-back operations. Respect host permissions and never claim unverified persistence.

The deployment parameters currently installed in the bootstrap are `rules_repository=massimilianonardi-ai/ai-workflow`, `state_repository=massimilianonardi-ai/ai-work-state`, and `time_zone=Europe/Rome`.

The state repository is currently public; do not persist confidential conversation text, credentials, or sensitive task metadata.
