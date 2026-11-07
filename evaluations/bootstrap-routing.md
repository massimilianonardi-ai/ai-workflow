# Bootstrap pilot — scenarios and evidence limits

Status: **Expected outcomes for future tests, not end-to-end executed results.**

| Input | Expected route or boundary |
| --- | --- |
| `Ciao` | Natural-language fast path; no context fetch |
| `!aw help` | Exact explicit command; no side effects |
| ` !aw help` | Not a command: leading whitespace |
| `/agent` | Not an ai-workflow command; native interpretation only if host supports it |
| `!aw route -- Progetta e implementa un server` | Diagnostic, design + development; no execution |
| `!aw resume --context task:demo` | Header-first demo state and required workflow refs |
| `!aw resume --context task:missing` | Unresolved ID; do not invent state |
| `!aw deploy -- host1` | Unknown verb; error, never execute |
| `Spiegami come funziona rsudo` | Explanation; do not assume RumiAI development state |
| `Implementa e testa una libreria` | Compound develop + validate; check authorization/context |
| `Crea un'immagine di un server` | Image generation if host supports it |
| `Analizza questa immagine` with an image | Visual understanding, not image generation |
| `Progetta senza modificare file` | Design with read-only constraint |
| `Riprendi il task Keycloak` | Retrieve genuine context, never invent it |

To validate, record actual file fetches, tokens, route errors, unnecessary interruptions, missing important assumptions, early operator-visible outcomes and authority conflicts. Compare with unchanged RumiAI baseline.

The historical Keycloak/rsudo replay requires the *original* operator request, task state and sources available at the time; current corrected contracts must not be projected backward. No such historical replay, deterministic intent classifier, new-chat test or host integration is established by this document.
