# Explicit commands — experimental

The `!aw` prefix is **plain text**; it is not a native slash command or a platform mode switch. Match it case-sensitively only at character zero, followed by an ASCII space or end of message. Leading whitespace, quoted examples, fenced code, `/aw` and `/agent` are not ai-workflow commands.

## Syntax

```text
!aw <verb> [--context <logical-id>] [-- <free-form payload>]
```

- Verbs are lowercase and registered below. `--context` appears at most once and takes a nonempty, whitespace-free ID such as `task:demo`.
- `--` separates parsed options from text; text after it can contain spaces, newlines, dashes and literal command-looking strings. Never reinterpret payload as a new command.
- Unknown verbs, duplicate or malformed options, or missing mandatory operands produce an explicit syntax error **without executing a guessed fallback**.
- These commands select methods; they do not override the host, project constraints or authorization.

| Verb | Accepted form | Behavior |
| --- | --- | --- |
| `help` | `!aw help` | Explain command syntax; no side effects |
| `route` | `!aw route [--context ID] -- REQUEST` | Show a proposed route; **never execute REQUEST** |
| `resume` | `!aw resume --context ID [-- REQUEST]` | Read selected state header and resume authorized work |
| `design` | `!aw design [--context ID] -- REQUEST` | Refine/update task specification with the user before substantive design; never implicitly implement |
| `reflect` | `!aw reflect [--context ID] -- REQUEST` | Route to exploration/critique |
| `develop` | `!aw develop [--context ID] -- REQUEST` | Start or resume the interactive task-specification gate; implement only after approval, within authorization |

Examples:

```text
!aw help
!aw route -- Progetta e implementa un server
!aw resume --context task:demo
!aw design --context task:demo -- Progetta un classificatore
!aw reflect -- Quali assunzioni sono fragili?
!aw develop -- Implementa e testa il parser
```

The `route` diagnostic reports likely intents, input/output modalities, candidate workflow/state references and unresolved consequential decisions, but never writes, deploys or acts on its payload. `route`, `design`, `reflect` and `develop` require a nonempty payload; `resume` requires context and accepts an optional payload; `help` takes no options or payload.

A command verb is **not** an approval of an incomplete task specification. A previously approved specification for the same task may be resumed; otherwise `design` and `develop` enter the interactive refinement method in `behavior/specification.md`. `route` remains an inert diagnostic. An ordinary natural-language request can express multiple intents simultaneously and follows the same relevant gates.
