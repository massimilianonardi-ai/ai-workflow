# Component responsibilities — L5

| Component / source path | Owns | Explicitly does not own | Uses / callers | Effects, failures |
| --- | --- | --- | --- | --- |
| CMP-01 | <responsibility> | <other module's work> | <interfaces> | <state/IO/errors> |

Inspect the actual code and callers, distinguishing existing facts from proposed changes. Each substantive responsibility has a clear owner. Avoid duplicating transport, authentication, storage or domain logic in unrelated modules. Link [interfaces](interfaces.md) and [flows](flows.md).
