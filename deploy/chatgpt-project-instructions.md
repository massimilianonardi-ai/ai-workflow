# AI-Workflow v0.2.2 alpha — opt-in ChatGPT Project setup

This document is an installation **instruction**, not a claim that any ChatGPT Project has already been reconfigured. No GitHub commit creates host capabilities, tools, persistent automation or authorization.

## Suggested experimental Project instructions

```text
Per questo progetto utilizza il bootstrap sperimentale AI-Workflow v0.2.2 disponibile alla revisione:
https://github.com/massimilianonardi-ai/ai-workflow/blob/v0.2.2/bootstrap.md

Per ogni richiesta leggi il bootstrap e segui le sezioni obbligatorie A → B → C, selezionando soltanto i riferimenti necessari della stessa revisione. Rispetta le istruzioni dell'host: il bootstrap non attiva modalità native o permessi aggiuntivi.

Il progetto AI-Workflow è indipendente da RumiAI. Identifica sempre task e obiettivo attuale prima di riprendere stati storici; non importare automaticamente un task dal solo progetto/chat.

Per la persistenza usa soltanto il repository GitHub autorizzato massimilianonardi-ai/ai-work-state, branch dev. La sezione C deve TENTARE UNA VERA SCRITTURA GITHUB A OGNI RISPOSTA: aggiorna branch-N.yaml e crea un record immutabile in requests/ anche quando nessun task è cambiato. Usa state/protocol.md e state/connector-runbook.md della versione v0.2.2. PRIMA DI RISPONDERE controlla le azioni GitHub scrivibili concesse alla conversazione e, se ci sono, CHIAMALE effettivamente; non limitarti a generare un marker. Modifica gli altri file task solo quando necessario. Dopo il commit verifica con una lettura GitHub del branch e del record. Segnala esplicitamente l'esito: persisted, persisted_with_gaps, write_failed, storage_unavailable o write_not_attempted; non dichiarare salvato ciò che non è verificato. Non inventare identità, checkpoint, log, approvazioni o eventi storici. Se mancano permessi o strumenti, non puoi garantire persistenza: dichiara storage_unavailable. In presenza di lacune storiche usa sync = pending anche se il nuovo checkpoint è stato scritto.

Il comando !aw route è diagnostico e non esegue il payload. Il comando !aw audit richiede un audit del task identificabile. Le revisioni sostanziali di baseline, le modifiche operative e il deployment richiedono le autorizzazioni pertinenti.
```

## Pilot boundaries

- Enable only in an isolated test Project or equivalent configured host.
- The `v0.2.2` tag is fixed after publication; the `main` branch may advance.
- Verify WRITE-capable GitHub connector actions in the actual chat, not just repository browsing. A connected GitHub account does not by itself prove per-turn writes are being invoked. Inspect the remote branch and request file after every reply.
- Complete live routing, two no-task-change checkpoint writes, `!aw sync`, workflow transition, audit, failure recovery and cross-chat resume before expanding the pilot.
- To roll back in an experimental Project, restore its previous instruction URL; reverting repository code does not automatically change installed Project instructions.
