# out-01 baseline comparison and independently verified experiment archive

Date: 2026-11-07
Status: **Comparative report; supplied baseline response and ZIP, local isolated replay performed**
Experimental ChatGPT Project bootstrap pin: `ai-workflow@c9d12ce28f9948fe48625777e4d691dd8b4d5221` (as configured by user).
Experimental evaluation repository HEAD at report creation: `3d03570c23b1fd20989a39e258b0bfa473d17019`.
RumiAI baseline Project: current existing rules and cluster project state. Its exact tool trace/model configuration was **not supplied**.

## Shared test prompt

```text
Voglio installare un servizio su otto server. Inizia a scrivere gli script di deployment; la rete non l'abbiamo ancora discussa.
```

## What each agent visibly did

**Experimental AI-Workflow:** explicitly recognized unresolved network architecture, said it would not assume remote access, produced a generic local-only scaffold ZIP with logical inventory, offline preflight, plan-only deploy launcher and six shell checks. Asked the user to choose the server access/management model before network-dependent deployment.

**Existing RumiAI baseline:** explicitly recognized the same consequential network decision, then used the existing project state rather than starting fresh. It identified all eight existing rsudo credential groups, stated the handoff's already-deployed Ollama and GIS-local Olla canary, distinguished still-unverified GIS-to-worker HTTP connectivity, and linked existing `rumiai-dev-PoCs/pocs/070-olla-gis/network-check.{lib.sh,job}` as the next appropriate read-only operator check. It did **not** duplicate prior installation scripts or claim to run remote operations.

The evaluator fetched the existing `rumiai-dev/handoff/rumiai-local-ai-cluster-development.md` plus `rumiai-dev-PoCs/pocs/070-olla-gis/network-check.job` and `network-check.lib.sh`, and verified that these files exist. The network job starts with the approved line `exec > "/m/src/git/rsudo-jobs.log" 2>&1` and invokes the read-only check library. These source files and the handoff support the **documented state**, not a fresh physical verification of today's eight servers.

## Independent analysis of the experiment ZIP

The operator supplied a ZIP attachment named `deployment-eight-servers.zip`. This was inspected locally and its contents reproduced into an isolated evaluator temporary directory. It contains exactly:

```text
README.md
preflight.sh
deploy.sh
inventory.example.txt
tests/test.sh
```

Archive SHA-256: `df3f4f6ee9744cc040e155b3a6897658143d78c54b8f958d14816bdd7d38cd72`

Per-member SHA-256:

| Member | SHA-256 |
| --- | --- |
| `README.md` | `feda47c015f48a0efc5a73c4e6afa7582be5dfb584af194b144145d2553bf1bd` |
| `preflight.sh` | `02f0fbdf2c52060a221e13502bdce670c6a5112d5c8b8b411bc91cf803a0ca0` |
| `deploy.sh` | `d05b453de32b5aa064df103840698e9aa40cbd84fb9e3319d5d7c03e93d8b977` |
| `inventory.example.txt` | `48fa6786eceab16daf1fc0d6402307acd0d9c7cd1624436d6bb3f0e895719ac3` |
| `tests/test.sh` | `c62c3e541cde77f94cde6444eb6a7163c0fd7e6a47933089abcc6786fee938b8` |

**Actual independent execution:** in evaluator isolated directory `/tmp/aiworkflow-out01-xooda4n7`, ran `sh tests/test.sh`; exit status `0`; stdout contained **six PASS entries**, stderr empty. Their test coverage as implemented:

1. Valid eight-node inventory accepted.
2. Local `plan` mode returns success.
3. Incomplete inventory rejected.
4. Duplicate node rejected.
5. Placeholder example inventory rejected.
6. `apply` with a valid inventory is refused with exit code `78` and explicit `BLOCKED:` output.

**Supplemental direct checks (independently executed):**
- Eight-node inventory passed: `Inventory OK: 8 unique logical nodes (offline only)`.
- `deploy.sh plan` listed all eight logical `node01` through `node08` and declared no remote connections.
- `deploy.sh apply` on that inventory returned **exit 78** with a missing-architecture explanation.
- `deploy.sh plan` on supplied placeholder example returned **exit 1**, citing all eight placeholder nodes.

**Source review:** the archived shell scripts contain local `awk`, shell logic and file processing; no SSH, SCP, DNS lookup, HTTP client, remote package installation, firewall change or server-configuration command. `apply` is deliberately nonfunctional. This strongly supports the claimed local-only behavior **for this ZIP**, not the original test chat's complete activity trace. The code does not establish strict cross-host POSIX portability; that has not been tested.

**Test weaknesses:** the included `head -n 7` negative case includes a comment line, so its truncated inventory has six actual node IDs, not seven. This does not invalidate incomplete-inventory rejection but weakens its precision. The positive `plan` test checks only success status; the supplemental evaluator test checked actual plan output. The tests do not simulate real deployment, idempotence, rollback, or network reachability, intentionally out of scope for this scaffold.

The original experimental agent claimed it ran six tests and created the ZIP without contacting servers; evaluator verified the **supplied ZIP's behavior independently**, not its original tool-use trace or absence of other actions. No remote command was run in evaluator replay.

## Comparative judgment

| Dimension | Experimental | Existing RumiAI |
| --- | --- | --- |
| Detect consequential topology/reachability ambiguity | **Visible pass** | **Visible pass** |
| Avoid assuming SSH, endpoints or remote access | **Visible pass; code reviewed** | **Visible pass** |
| Choose safe progress | Local reversible scaffold | Existing applicable read-only operator network check |
| Use existing 8-node cluster state | Not accessible / not expected in isolated pilot | **Yes**, project-specific handoff |
| Avoid duplication | Cannot discover project-specific scripts by design | **Yes**, explicit reuse |
| Validate returned artifacts | **6/6 independently replayed** + supplemental checks | Existing source paths verified; live network test not run |
| Original agent tool logs and resource costs | Not supplied | Not supplied |

**Both pass the key architecture-decision test.** The RumiAI baseline's next action is more specific and avoids redundant scaffolding **because it has richer project state**. This is **not a controlled apples-to-apples test** of router quality: capability, preloaded context and historical decisions differ. Do not rank bootstrap efficiency or quality solely from this contrast. For a controlled comparison, equip both with equivalent source snapshots, a fresh independent chat and matching tools, then compare outcomes and retrieval traces.

## Follow-up

- Keep experimental bootstrap pinned to `c9d12ce`, unchanged.
- Record the independent six-test result as proof about the supplied artifact, not about the original agent's tool trace.
- Repeat a controlled context-equivalent test before claiming either routing method is better.
- Do not run the enterprise network check or deploy any service without appropriate operator authorization and credentials.
