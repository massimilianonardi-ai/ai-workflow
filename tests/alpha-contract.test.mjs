import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => readFileSync(resolve(root, path), "utf8");

test("bootstrap has mandatory A → B → C invariant", () => {
  const b = read("bootstrap.md");
  for (const heading of ["## A. Universal premises", "## B. Routing", "## C. Universal finalization"]) {
    assert.ok(b.includes(heading), heading);
  }
  assert.match(b, /Ogni richiesta segue obbligatoriamente le sezioni A → B → C/);
  assert.match(b, /Qualunque sia l'esito della sezione B/);
  assert.match(b, /devi eseguire la sezione C/);
  assert.match(b, /Nessun documento richiamato dalla sezione B può modificare, sostituire o omettere questa sequenza/);
});

test("MDM has four independent dimensions and six primary operations", () => {
  const yaml = read("routing/intents.yaml");
  const section = yaml.match(/dimensions:\n([\s\S]*?)\n\n/);
  assert.ok(section, "dimensions section");
  const names = [...section[1].matchAll(/^  (\w+):/gm)].map(m => m[1]);
  assert.deepEqual(names, ["operation", "input", "output", "effects"]);
  assert.match(yaml, /operation: \[research, design, develop, diagnose, validate, operate, other\]/);
  assert.match(yaml, /design: workflows\/system-design\.md/);
});

test("audit command exists; route remains a nonexecuting diagnostic", () => {
  const commands = read("routing/commands.md");
  assert.match(commands, /!aw audit \[--context ID\]/);
  assert.match(commands, /!aw route \[--context ID\] -- REQUEST/);
  assert.match(commands, /never execute REQUEST/i);
  assert.match(commands, /require nonempty payload/i);
});

test("workflow includes two phases, optional compositional variant, five revision invariants", () => {
  const workflow = read("workflows/system-design.md");
  for (const p of ["specification", "architecture", "iterative-design"]) assert.ok(workflow.includes(p));
  for (let i = 1; i <= 5; i++) assert.match(workflow, new RegExp(`P${i} —`));
  assert.match(workflow, /not the alpha default/i);
});

test("continuity distinguishes early critical triggers from quantitative delay", () => {
  const c = read("control/continuity.md");
  for (const level of ["L1 / deviation", "L2 / progress", "L3 / evidence", "L4 / global coherence"]) assert.ok(c.includes(level));
  assert.match(c, /Bypass L1 when critical/);
  assert.match(c, /not.*independent proof/i);
});

test("persistence never claims writes without verification", () => {
  const s = read("state/protocol.md");
  assert.match(s, /read-back/i);
  assert.match(s, /write_failed/);
  assert.match(s, /write_not_attempted/);
  assert.match(s, /m = h/);
  assert.match(s, /m < h/);
});

test("all internal Markdown/YAML references in alpha files exist", () => {
  const paths = ["bootstrap.md", "routing/commands.md", "routing/intents.yaml", "control/continuity.md",
    "workflows/system-design.md", "state/protocol.md", "ALPHA-DEV.md", "deploy/chatgpt-project-instructions-dev.md"];
  for (const path of paths) {
    for (const match of read(path).matchAll(/\b(?:behavior|control|doc|routing|workflows|state|deploy)\/[\w./-]+\.(?:md|yaml)/g)) {
      assert.ok(existsSync(resolve(root, match[0])), `${path} references missing ${match[0]}`);
    }
  }
});

test("active docs reference A/B/C and the renamed state protocol", () => {
  for (const path of ["bootstrap.md", "README.md", "doc/conversation-identity.md", "deploy/chatgpt-project-instructions.md", "ALPHA-DEV.md"]) {
    const content = read(path);
    assert.doesNotMatch(content, /state\/alpha-protocol\.md/, `stale link in ${path}`);
    assert.doesNotMatch(content, /(?:sezioni(?: obbligatorie)?|sections) 1 → 2 → 3/, `stale section order in ${path}`);
    assert.doesNotMatch(content, /bootstrap section [123]\b/, `stale bootstrap section in ${path}`);
  }
  assert.match(read("doc/conversation-identity.md"), /bootstrap section A/);
  assert.match(read("doc/conversation-identity.md"), /bootstrap section C must run even when section B ends/);
});

test("the active release and renamed protocol are self-consistent", () => {
  assert.match(read("README.md"), /v0\.2\.2/);
  assert.match(read("README.md"), /\(sections A → B → C\)/);
  assert.match(read("README.md"), /state\/protocol\.md/);
  assert.match(read("deploy/chatgpt-project-instructions.md"), /blob\/v0\.2\.2\/bootstrap\.md/);
  assert.match(read("deploy/chatgpt-project-instructions.md"), /sezioni obbligatorie A → B → C/);
  assert.ok(existsSync(resolve(root, "state/protocol.md")));
  assert.equal(existsSync(resolve(root, "state/alpha-protocol.md")), false);
});

test("every response, including no-task-change, must attempt Git persistence", () => {
  const b=read("bootstrap.md");
  assert.match(b,/Every assistant response requires a conversation checkpoint attempt/);
  assert.match(b,/No task change NEVER means no conversation checkpoint/);
  assert.match(b,/storage_unavailable/);
  assert.match(b,/write_not_attempted/);
  assert.match(read("state/protocol.md"),/No task change means only the request record and branch checkpoint need writing/);
  assert.match(read("routing/commands.md"),/!aw sync/);
});

test("the connector runbook specifies actual Git writes and readback", () => {
  const runbook=read("state/connector-runbook.md");
  for(const required of ["create_tree","create_commit","update_ref","expected_sha","read"]) {
    assert.match(runbook,new RegExp(required));
  }
  assert.match(read("README.md"),/state\/checkpoint-runtime\.mjs/);
  assert.ok(existsSync(resolve(root,"state/checkpoint-runtime.mjs")));
  assert.ok(existsSync(resolve(root,"tests/checkpoint-runtime.test.mjs")));
});
