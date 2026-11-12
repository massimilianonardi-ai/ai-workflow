/**
 * Deterministic per-response checkpoints. This module is callable by a host;
 * importing it does NOT automatically intercept ChatGPT turns.
 */
export const CHAT_ID_RE = /^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const enc = x => JSON.stringify(x);
const list = xs => xs === null ? "null" : xs.length ? "\n" + xs.map(x => "  - " + enc(x)).join("\n") : "[]";
const gapsYAML = gaps => gaps.length ? "\n" + gaps.map(pair => "  - [" + pair.join(", ") + "]").join("\n") : "[]";
const validStrings = xs => Array.isArray(xs) && xs.every(x => typeof x === "string" && x.length > 0);

export class CheckpointError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}
const requireValid = (condition, code, msg) => { if (!condition) throw new CheckpointError(code, msg); };

export function parseBranch(text) {
  if (text == null) return null;
  requireValid(typeof text === "string", "BAD_STORED_BRANCH", "Branch must be text");
  const m = text.match(/^message_id:\s*(\d+)\s*$/m);
  const t = text.match(/^created_at:\s*["']?([^"'\r\n]+)["']?\s*$/m);
  requireValid(m && t, "BAD_STORED_BRANCH", "Stored branch is missing its checkpoint header");
  const taskBlock=text.split(/^tasks:[ \t]*/m)[1];
  requireValid(taskBlock!==undefined,"BAD_STORED_BRANCH","Stored branch is missing task associations");
  const taskBody=taskBlock.split(/^sync_gaps:/m)[0].split(/^synchronization:/m)[0];
  const value=taskBody.split("\n")[0].trim();
  let tasks;
  if(value==="null") tasks=null;
  else if(value==="[]") tasks=[];
  else if(value==="") {
    const items=[...taskBody.matchAll(/^[ \t]+-[ \t]+(.+)$/gm)];
    requireValid(items.length>0,"BAD_STORED_BRANCH","Cannot parse task associations");
    tasks=items.map(x=>{
      try { return JSON.parse(x[1]); }
      catch { return x[1].replace(/^['"]|['"]$/g,""); }
    });
  } else throw new CheckpointError("BAD_STORED_BRANCH","Unsupported task representation");
  const gapBlock=text.split(/^sync_gaps:[ \t]*/m)[1];
  const gaps=gapBlock && gapBlock.split("\n")[0].trim()!=="[]" ?
    [...gapBlock.split(/^synchronization:/m)[0].matchAll(/^[ \t]+-[ \t]+\[(\d+),[ \t]*(\d+)\]/gm)].map(x=>[Number(x[1]),Number(x[2])]) : [];
  return {messageId:Number(m[1]),createdAt:t[1],tasks,gaps};
}

export function planCheckpoint(input, storedText=null) {
  requireValid(input && typeof input==="object", "BAD_INPUT", "Input object required");
  const {chatId,branchId=0,sourceMessageId,sourcePending=false,createdAt} = input;
  requireValid(CHAT_ID_RE.test(chatId ?? ""), "BAD_CHAT_ID", "Provide a real generated conversation identity");
  requireValid(Number.isSafeInteger(branchId) && branchId>=0, "BAD_BRANCH", "Nonnegative integer branch required");
  requireValid(Number.isSafeInteger(sourceMessageId) && sourceMessageId>=0, "BAD_SOURCE", "A genuine source response ID is required");
  requireValid(typeof sourcePending === "boolean", "BAD_PENDING", "Pending must be Boolean");
  requireValid(typeof createdAt==="string" && !Number.isNaN(Date.parse(createdAt)), "BAD_DATE", "Use real ISO timestamp");
  const stored=typeof storedText==="string" ? parseBranch(storedText) : storedText;
  const old=stored?.messageId;
  if (!stored) {
    requireValid(branchId===0, "DERIVED_BRANCH_UNVERIFIED", "Do not invent a derived branch");
    requireValid(sourceMessageId===0 || sourcePending, "UNKNOWN_HISTORY", "Missing earlier checkpoint without pending source");
  } else {
    requireValid(Number.isSafeInteger(old) && old>=0, "BAD_STORED_BRANCH", "Invalid stored message ID");
    if (sourceMessageId<old) throw new CheckpointError(sourcePending?"PENDING_CONFLICT":"FORK_REQUIRED","Must reconcile source before branch changes");
    if (sourceMessageId>old && !sourcePending) throw new CheckpointError("REMOTE_BEHIND","Repo behind known nonpending checkpoint");
  }
  const gaps=[...(stored?.gaps??[])];
  const firstMissing=stored?old+1:1;
  if(sourceMessageId>=firstMissing)gaps.push([firstMissing,sourceMessageId]);
  const tasks=stored?stored.tasks:input.tasks===undefined?null:input.tasks;
  requireValid(tasks===null||validStrings(tasks),"BAD_TASKS","Tasks must be null or a list of IDs");
  const added=input.tasksAdded??[],removed=input.tasksRemoved??[];
  requireValid(validStrings(added)&&validStrings(removed),"BAD_DELTA","Task deltas must be ID lists");
  requireValid(added.length===0&&removed.length===0,"TASK_CHANGE_REQUIRES_ATOMIC_UPDATE",
   "Use task-aware transaction for task changes; never silently lose a task event");
  const requestRefs=input.requestRefs===undefined?null:input.requestRefs;
  const eventRefs=input.eventRefs??[];
  requireValid(requestRefs===null||validStrings(requestRefs),"BAD_REQUEST_REFS","Request refs must be verified or null");
  requireValid(validStrings(eventRefs),"BAD_EVENT_REFS","Event refs must be verified IDs");
  const next=sourceMessageId+1;
  const branchPath=`conversations/${chatId}/branch-${branchId}.yaml`;
  const requestPath=`requests/${chatId}/${branchId}-${String(next).padStart(6,"0")}.yaml`;
  const branchContent=
    "created_at: "+enc(stored?.createdAt??createdAt)+"\n"+
    "message_id: "+next+"\n"+
    "tasks: "+list(tasks)+"\n"+
    "sync_gaps: "+gapsYAML(gaps)+"\n"+
    "synchronization: "+(gaps.length?"incomplete":"complete")+"\n";
  const requestContent=
    "source_checkpoint: "+sourceMessageId+"\n"+
    "request_refs: "+list(requestRefs)+"\n"+
    "tasks_added: "+list(added)+"\n"+
    "tasks_removed: "+list(removed)+"\n"+
    "event_refs: "+list(eventRefs)+"\n"+
    "checkpoint_integrity: "+(gaps.length?"partial":"complete")+"\n";
  return {branchPath,requestPath,branchContent,requestContent,messageId:next,gaps,complete:gaps.length===0};
}

/**
 * The host must invoke this during section C for EACH response, even if no
 * task changes. API performs an actual CAS commit and readback.
 */
export async function persistCheckpoint(api,input) {
  requireValid(api && ["getHead","getFile","atomicCommit"].every(k=>typeof api[k]==="function"),
     "NO_WRITABLE_STORE","Writable Git adapter required");
  const head=await api.getHead();
  const branchPath=`conversations/${input.chatId}/branch-${input.branchId??0}.yaml`;
  const oldBranch=await api.getFile(branchPath,head);
  const p=planCheckpoint(input,oldBranch);
  const already=await api.getFile(p.requestPath,head);
  requireValid(already===null,"CHECKPOINT_COLLISION","Immutable response checkpoint already exists: investigate before retry");
  const sha=await api.atomicCommit(head,{[p.branchPath]:p.branchContent,[p.requestPath]:p.requestContent});
  const newHead=await api.getHead();
  const [branch,request]=await Promise.all([api.getFile(p.branchPath,newHead),api.getFile(p.requestPath,newHead)]);
  requireValid(newHead===sha && branch===p.branchContent && request===p.requestContent,
     "READBACK_FAILED","A Git response without verified ref and content is not successful persistence");
  return {status:p.complete?"persisted":"persisted_with_gaps",commit:sha,messageId:p.messageId,
          gaps:p.gaps,syncPending:!p.complete};
}
