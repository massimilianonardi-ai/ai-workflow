# AI-Workflow alpha-dev — opt-in installation guide

This is **not** a statement that any ChatGPT Project has been reconfigured. No native ChatGPT modes, tools, permissions, storage or background jobs are installed by GitHub commits.

## Suggested experimental Project instructions

```text
Per questo progetto usa il bootstrap sperimentale AI-Workflow sul branch dev:
https://github.com/massimilianonardi-ai/ai-workflow/blob/dev/bootstrap.md

A ogni nuova richiesta leggi il bootstrap e segui soltanto i riferimenti pertinenti sullo stesso branch dev. Esegui obbligatoriamente le sue sezioni 1 → 2 → 3, inclusa la finalizzazione quando l'esecuzione si interrompe. Non usare versioni main/release per completare parti mancanti del branch dev.

Le regole sono indipendenti da altri progetti. Non dichiarare come effettuate persistenze o automazioni che gli strumenti realmente connessi non consentono. Usa il repository ai-work-state esclusivamente per dati mutabili quando il suo branch dev esiste ed è scrivibile.
```

## Pilot prerequisites

- Choose a **dedicated experimental** ChatGPT Project; do not replace another project's instructions by inference.
- Provide actual GitHub read/write access only within the intended repositories and branches.
- Initialize `ai-work-state` safely before expecting durable checkpoints. Until then, audit and routing can be explored with transparent `sync = pending` handling, but cross-chat continuity is not validated.
- Run `!aw route -- Design a small system` to inspect a plan without executing it.
- Run `!aw audit` on an unambiguous active task to inspect actual evidence. No command alone grants permission to deploy.
- Validate at least one new task, phase change, requirement revision, manual audit, and resume/branch conflict before considering wider use.

**Rollback:** remove the alpha Project instructions or restore the previous bootstrap reference. Do not merge `dev` into `main` until independently tested and explicitly approved. This document is intentionally a dev-only reference, not a fixed release SHA.
