# AI-Workflow — progressive workflow component map

**Implementation scope:** rules and templates; assistant-executed through authorized connectors. No persistent scheduler, installed code runner, automatic second agent or product-repository write permission is implied by these rules.

```text
bootstrap.md (universal identity, authorization, final checkpoint)
    |
    +-- routing/intents.yaml
          |-- design  → workflows/system-design.md
          |-- develop → workflows/develop.md
                         |-- workflows/progressive-levels.md (L1–L11)
                         |-- behavior/specification.md + decisions.md
                         |-- behavior/execution.md + evidence.md
                         |-- behavior/product-documentation.md
                         |      +-- templates/product-docs/* → product repository/docs
                         |-- behavior/execution-supervision.md (conditional)
                         +-- state/task-model.md + templates/execution-plan.yaml
                                 → state repository task records
```

| Owner | Responsibility | Does not own |
| --- | --- | --- |
| Bootstrap | Every-request continuity, boundaries and verified state write | Product implementation choices |
| Routing | Choose applicable workflow by actual intent | Authorization or task identity |
| Design workflow | L1–L8 design-only outcomes | Code writes/deployments |
| Develop workflow | L1–L11 with principal control phases and delivery | Unapproved product contract changes |
| Progressive levels | Content/exit contract at each abstraction | An independent user approval per level |
| Product documentation | Separate, concise user/maintainer artifacts versioned with product | Branch checkpoint or task permission |
| Task model/plan | Durable owner task, status, dependencies and milestone plan revision | Creating a task per function or pretending milestones are tasks |
| Supervision | Read-only review of pinned target evidence and drift | Silent edits to target chat/product or independent automatic execution |

**Source of truth:** product repository owns actual code and docs; ai-work-state owns conversation/task state and provenance. For a fact about behavior, current code and actual tests outrank a stale snapshot. For scope/authorization, approved operator decisions outrank inferred design. Use stable IDs and links across both.

**Phase transitions:** specification → architecture → implementation → verification → delivery; supervision overlays implementation/verification; local correction returns to lowest affected L-level and its phase. Standalone design exits after its own architecture gate.
