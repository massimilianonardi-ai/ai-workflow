# Execution and data flows — L5 / L6

## FLOW-01 — <typical use case>

```text
<entry / caller> → <validation> → <owning component> → <external dependency> → <result / exit>
```

**Inputs / invariants:** <...>  
**Branching and failures:** <meaningful alternate path(s)>  
**State, side effects and ownership:** <who may mutate what>  
**Evidence:** <code ref / proposed design>

Use Mermaid sequence/state diagrams when actual interactions are complex; preserve editable text. A small straightforward function may need no separate diagram. Link `UC-`, `CMP-`, `IF-` and `TEST-`.
