# ChatGPT Project Instructions — ai-workflow experimental v0.2.0

> **Operator action:** copy the short instruction block below into the **separate experimental ChatGPT Project**, replacing the previous trial bootstrap pointer only after choosing that Project. These are deployment instructions, not evidence that the user’s Project settings have already changed.

## Text to install

```text
Per questo progetto utilizza il bootstrap sperimentale pubblicato in:
https://github.com/massimilianonardi-ai/ai-workflow/blob/release/2026-11-08-task-continuity/bootstrap.md

Leggilo all'inizio del lavoro e applica soltanto i documenti di metodo pertinenti secondo la matrice multidimensionale. Se non riesci ad accedere al bootstrap o ai documenti richiesti, dichiaralo: non inventare di averli letti.

Per ogni task usa i suoi documenti persistenti in ai-workflow/contexts/tasks/<task-id>/ (task-state.md, task-log.md, handoff.md). Per progettazione e sviluppo usa anche task-specification.md, raffinalo interattivamente fino a casi d'uso e verifiche chiare e attendi il mio via libera esplicito sulla specifica prima dell'implementazione sostanziale. Dopo il via libera procedi autonomamente nei confini approvati.

Non considerare le conversazioni dello stesso Project automaticamente lo stesso task; non importare sistemi di test/validazione esterni al task. Non dichiarare salvati documenti senza una scrittura realmente riuscita. Se non hai strumenti per leggere/scrivere su GitHub, segnala il limite e fornisci le versioni Markdown marcate non persistite. L'exporter delle chat resta indipendente.
```

## Release behavior and limitations

- Scope is this **experimental ChatGPT Project** only; it must not silently replace the active RumiAI Project instructions.
- Reference `release/2026-11-08-task-continuity` is intended to be **frozen after publication**; the exact commit SHA must also be recorded on release.
- Connected GitHub read/write capabilities are required for automated durable records. A document instruction does not give a model new tools or permission to bypass connector controls.
- The bootstrap is multi-intent and multidimensional; the universal three task records do not turn ordinary short questions into mandatory design questionnaires.
- `!aw route` remains diagnostic; a request for design alone does not authorize actual implementation, and development requires a specifically approved task specification.
- Separate conversation exporter integration remains pending; no background synchronization, automatic whole-chat capture, or historic test-pipeline inheritance is installed.

## Fast recovery

To resume a task in a new chat within the experimental Project, provide its exact logical ID, e.g. `Riprendi task:ai-workflow-design-development dal relativo handoff.md`. The new chat should retrieve the checkpoint, referenced state/log and approved specification as applicable; if unavailable, it must report the gap rather than reconstructing it by guesswork.
