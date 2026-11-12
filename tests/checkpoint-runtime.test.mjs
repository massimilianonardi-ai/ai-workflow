import test from "node:test";
import assert from "node:assert/strict";
import {planCheckpoint,persistCheckpoint,parseBranch} from "../state/checkpoint-runtime.mjs";

const chatId="2026-11-12_12-41_a41346d3-3357-425f-9474-19786574a71c"; // test-only
const createdAt="2026-11-12T12:41:00+01:00";
const input=(sourceMessageId,sourcePending=false,extra={})=>
  ({chatId,branchId:0,sourceMessageId,sourcePending,createdAt,requestRefs:[],...extra});
class MockGit {
  constructor(){this.head="H0";this.files={};this.counter=0;this.writes=0;this.repositoryFullName="massimilianonardi-ai/ai-work-state";this.branch="main"}
  async getHead(){return this.head}
  async getFile(p){return this.files[p]??null}
  async atomicCommit(expected,updates){
    assert.equal(expected,this.head,"A stale revision must not overwrite another writer");
    this.writes++;Object.assign(this.files,updates);this.head="H"+(++this.counter);return this.head;
  }
}
const branch=()=>`conversations/${chatId}/branch-0.yaml`;

test("first response persists checkpoint without any task changes",async()=>{
  const db=new MockGit();
  const r=await persistCheckpoint(db,input(0,false,{tasks:[]}));
  assert.equal(r.status,"persisted");
  assert.equal(r.messageId,1);
  assert.equal(db.writes,1);
  assert.match(db.files[branch()],/message_id: 1/);
  assert.match(db.files[`requests/${chatId}/0-000001.yaml`],/tasks_added: \[\]/);
});

test("every subsequent message advances checkpoint, even without task changes",async()=>{
  const db=new MockGit();
  for(let n=0;n<4;n++)await persistCheckpoint(db,input(n,false,n===0?{tasks:[]}:{}));
  assert.equal(db.writes,4);
  assert.equal(Object.keys(db.files).filter(x=>x.startsWith("requests/")).length,4);
  assert.match(db.files[branch()],/message_id: 4/);
});

test("pending messages 1-4 are not fabricated when current message 5 is persisted",async()=>{
  const db=new MockGit();
  const r=await persistCheckpoint(db,input(4,true));
  assert.equal(r.status,"persisted_with_gaps");
  assert.equal(r.syncPending,true);
  assert.deepEqual(r.gaps,[[1,4]]);
  assert.match(db.files[branch()],/tasks: null/);
  assert.match(db.files[branch()],/sync_gaps:.*\n  - \[1, 4\]/);
  assert.equal(db.files[`requests/${chatId}/0-000001.yaml`],undefined);
  const stored=parseBranch(db.files[branch()]);
  assert.deepEqual(stored.gaps,[[1,4]]);
  assert.equal(stored.messageId,5);
  const later=await persistCheckpoint(db,input(5));
  assert.equal(later.status,"persisted_with_gaps"); // gap preserved
  assert.deepEqual(later.gaps,[[1,4]]);
});

test("parser preserves nonempty task association list",()=>{
  const state='created_at: "2026-11-12T12:41:00+01:00"\nmessage_id: 3\ntasks: \n  - "task:known"\nsync_gaps: []\nsynchronization: complete\n';
  assert.deepEqual(parseBranch(state).tasks,["task:known"]);
  const p=planCheckpoint(input(3),state);
  assert.match(p.branchContent,/- "task:known"/);
});

test("unverified previous responses without pending are a hard error",()=>{
  assert.throws(()=>planCheckpoint(input(4,false),null),e=>e.code==="UNKNOWN_HISTORY");
});

test("a stale source requires verified branch detection",async()=>{
  const db=new MockGit();
  await persistCheckpoint(db,input(0,false,{tasks:[]}));
  await assert.rejects(persistCheckpoint(db,input(0)),e=>e.code==="FORK_REQUIRED");
  assert.equal(db.writes,1);
});

test("remote behind without pending is not treated as a branch",()=>{
  const b={messageId:1,createdAt,tasks:[],gaps:[]};
  assert.throws(()=>planCheckpoint(input(4,false),b),e=>e.code==="REMOTE_BEHIND");
});

test("a returned commit without confirmed ref/readback never counts as saved",async()=>{
  const db=new MockGit();
  db.atomicCommit=async function(expected,updates){this.writes++;Object.assign(this.files,updates);return "H-not-published"};
  await assert.rejects(persistCheckpoint(db,input(0,false,{tasks:[]})),e=>e.code==="READBACK_FAILED");
});

test("unsupported task mutations are refused rather than lost",async()=>{
  const db=new MockGit();
  await assert.rejects(persistCheckpoint(db,input(0,false,{tasksAdded:["task:a"]})),e=>e.code==="TASK_CHANGE_REQUIRES_ATOMIC_UPDATE");
  assert.equal(db.writes,0);
});

test("valid identity is mandatory, never replace it with a fabricated one",()=>{
  assert.throws(()=>planCheckpoint({...input(0),chatId:"chat-id-placeholder"},null),e=>e.code==="BAD_CHAT_ID");
});

test("runtime refuses dev branch and wrong repository even if adapter is writable",async()=>{
  const db=new MockGit();
  db.branch="dev";
  await assert.rejects(persistCheckpoint(db,input(0,false,{tasks:[]})),e=>e.code==="WRONG_STATE_TARGET");
  assert.equal(db.writes,0);
  db.branch="main";db.repositoryFullName="massimilianonardi-ai/ai-workflow";
  await assert.rejects(persistCheckpoint(db,input(0,false,{tasks:[]})),e=>e.code==="WRONG_STATE_TARGET");
  assert.equal(db.writes,0);
});
