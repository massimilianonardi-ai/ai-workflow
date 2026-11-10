import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => readFileSync(resolve(root, path), "utf8");

test("bootstrap has mandatory 1 → 2 → 3 invariant", () => {
  const b = read("bootstrap.md");
  for (const heading of ["## 1. Universal premises", "## 2. Routing", "## 3. Universal finalization"]) {
    assert.ok(b.includes(heading), heading);
  }
  assert.match(b, /Ogni richiesta segue obbligatoriamente le sezioni 1 → 2 → 3/);
  assert.match(b, /Qualunque sia l'esito della sezione 2/);
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
  const s = read("state/alpha-protocol.md");
  assert.match(s, /read-back/i);
  assert.match(s, /NOT PERSISTED/);
  assert.match(s, /dev.*branch.*has been created/i);
  assert.match(s, /m == h/);
  assert.match(s, /m < h/);
});

test("all internal Markdown/YAML references in alpha files exist", () => {
  const paths = ["bootstrap.md", "routing/commands.md", "routing/intents.yaml", "control/continuity.md",
    "workflows/system-design.md", "state/alpha-protocol.md", "ALPHA-DEV.md", "deploy/chatgpt-project-instructions-dev.md"];
  for (const path of paths) {
    for (const match of read(path).matchAll(/\b(?:behavior|control|doc|routing|workflows|state|deploy)\/[\w./-]+\.(?:md|yaml)/g)) {
      assert.ok(existsSync(resolve(root, match[0])), `${path} references missing ${match[0]}`);
    }
  }
});
