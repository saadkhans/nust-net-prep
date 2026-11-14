// Progress store: localStorage + GitHub repo file (progress/progress.json) for cross-computer sync.
export const REPO = 'saadkhans/nust-net-prep';
const PATH = 'progress/progress.json';
const LS_DATA = 'netprep.progress.v1';
const LS_TOKEN = 'netprep.ghtoken';
const API = `https://api.github.com/repos/${REPO}/contents/${PATH}`;

const empty = () => ({ version: 1, student: '', events: [] });

export function loadLocal() {
  try { return JSON.parse(localStorage.getItem(LS_DATA)) || empty(); } catch { return empty(); }
}
export function saveLocal(d) { localStorage.setItem(LS_DATA, JSON.stringify(d)); }
export function getToken() { return localStorage.getItem(LS_TOKEN) || ''; }
export function setToken(t) { t ? localStorage.setItem(LS_TOKEN, t.trim()) : localStorage.removeItem(LS_TOKEN); }

const b64enc = (s) => btoa(unescape(encodeURIComponent(s)));
const b64dec = (s) => decodeURIComponent(escape(atob(s.replace(/\n/g, ''))));

function headers() {
  const h = { Accept: 'application/vnd.github+json' };
  const t = getToken(); if (t) h.Authorization = `Bearer ${t}`;
  return h;
}

async function getRemote() {
  const res = await fetch(`${API}?ref=main&t=${Date.now()}`, { headers: headers(), cache: 'no-store' });
  if (res.status === 404) return { sha: null, data: empty() };
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const j = await res.json();
  return { sha: j.sha, data: JSON.parse(b64dec(j.content)) };
}

async function putRemote(data, sha) {
  const body = { message: `progress: ${data.events.length} events`, content: b64enc(JSON.stringify(data, null, 1)), branch: 'main' };
  if (sha) body.sha = sha;
  const res = await fetch(API, { method: 'PUT', headers: { ...headers(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (res.status === 409 || res.status === 422) return 'conflict';
  if (res.status === 401 || res.status === 403) throw new Error('GitHub token rejected — check it has Contents: Read and write on nust-net-prep.');
  if (!res.ok) throw new Error(`GitHub write failed (${res.status})`);
  return 'ok';
}

function merge(a, b) {
  const byId = new Map();
  for (const e of [...a.events, ...b.events]) byId.set(e.id, e);
  const events = [...byId.values()].sort((x, y) => x.at.localeCompare(y.at));
  return { version: 1, student: a.student || b.student || '', events };
}

/** Pull remote, merge with local, push if we have anything new. Returns a status string. */
export async function sync() {
  let local = loadLocal();
  for (let attempt = 0; attempt < 3; attempt++) {
    const { sha, data: remote } = await getRemote();
    const merged = merge(local, remote);
    saveLocal(merged); local = merged;
    const remoteIds = new Set(remote.events.map(e => e.id));
    const needsPush = merged.events.some(e => !remoteIds.has(e.id)) || (merged.student && merged.student !== remote.student);
    if (!needsPush) return 'synced';
    if (!getToken()) return 'local-only';
    const r = await putRemote(merged, sha);
    if (r === 'ok') return 'synced';
  }
  throw new Error('Could not save after 3 tries — another computer may be saving at the same time. Try again.');
}

export function addEvent(ev) {
  const d = loadLocal();
  const e = { id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, at: new Date().toISOString(), ...ev };
  d.events.push(e); saveLocal(d);
  return e;
}

export function setStudent(name) { const d = loadLocal(); d.student = name; saveLocal(d); }
