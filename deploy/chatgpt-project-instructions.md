# AI-Workflow v0.2.1 alpha — opt-in ChatGPT Project setup

This document is an installation **instruction**, not a claim that any ChatGPT Project has already been reconfigured. No GitHub commit creates host capabilities, tools, persistent automation or authorization.

## Suggested experimental Project instructions

```text
Per questo progetto utilizza il bootstrap sperimentale AI-Workflow v0.2.1 disponibile alla revisione:
https://github.com/massimilianonardi-ai/ai-workflow/blob/v0.2.1/bootstrap.md

Per ogni richiesta leggi il bootstrap e segui le sezioni obbligatorie A → B → C, selezionando soltanto i riferimenti necessari della stessa revisione. Rispetta le istruzioni dell'host: il bootstrap non attiva modalità native o permessi aggiuntivi.

Il progetto AI-Workflow è indipendente da RumiAI. Identifica sempre task e obiettivo attuale prima di riprendere stati storici; non importare automaticamente un task dal solo progetto/chat.

Per i dati persistenti usa soltanto risorse accessibili e autorizzate di ai-work-state, oggi sperimentalmente disponibili su branch dev. Non inventare ID di conversazione, checkpoint, log, commit, prove, risultati o autorizzazioni; indica quando la persistenza non è stata verificata.

Il comando !aw route è diagnostico e non esegue il payload. Il comando !aw audit richiede un audit del task identificabile. Le revisioni sostanziali di baseline, le modifiche operative e il deployment richiedono le autorizzazioni pertinenti.
```

## Pilot boundaries

- Enable only in an isolated test Project or equivalent configured host.
- The `v0.2.1` tag is fixed after publication; the `main` branch may advance.
- Verify both actual GitHub connector permissions and the intended `ai-work-state/dev` store before expecting cross-chat continuity.
- Complete live routing, workflow transition, manual audit, checkpoint, failure and resume tests before use beyond the pilot.
- To roll back in an experimental Project, restore its previous instruction URL; reverting repository code does not automatically change installed Project instructions.
