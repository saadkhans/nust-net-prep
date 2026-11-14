// Builds the progress email from progress/progress.json and progress/email-state.json.
//   node scripts/progress-email.mjs          -> prints JSON {newCount, subject, html, newIds}
//   node scripts/progress-email.mjs --mark   -> records all current event ids as emailed
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { ALL_TOPICS, SUBJECTS, TOPIC } from '../js/bank/index.js';
import { WEEKS, currentWeek, weekDates, PASS_PCT } from '../js/plan.js';

const root = new URL('../', import.meta.url);
const read = (p, d) => (existsSync(new URL(p, root)) ? JSON.parse(readFileSync(new URL(p, root), 'utf8')) : d);
const prog = read('progress/progress.json', { student: '', events: [] });
const state = read('progress/email-state.json', { emailedIds: [], lastSentAt: null });

if (process.argv.includes('--mark')) {
  writeFileSync(new URL('progress/email-state.json', root), JSON.stringify({ emailedIds: prog.events.map(e => e.id), lastSentAt: new Date().toISOString() }, null, 1));
  console.log('marked', prog.events.length);
  process.exit(0);
}

const sent = new Set(state.emailedIds);
const fresh = prog.events.filter(e => !sent.has(e.id) && e.type !== 'studied');
const esc = (s) => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const when = (iso) => new Date(iso).toLocaleString('en-GB', { timeZone: 'Asia/Karachi', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const name = (id) => TOPIC[id]?.name || id;

// snapshot
const completed = new Set(prog.events.filter(e => e.type === 'module_complete').map(e => e.topicId));
const latest = {}; for (const e of prog.events) if (e.type === 'assessment') latest[e.topicId] = e.pct;
const wk = currentWeek();
const plannedSoFar = WEEKS.slice(0, wk - 1).flatMap(w => w.modules);
const behind = plannedSoFar.filter(id => !completed.has(id));
const weak = ALL_TOPICS.filter(t => latest[t.id] != null && latest[t.id] < 70);
const mocks = prog.events.filter(e => e.type === 'mock');

const line = (e) => {
  if (e.type === 'module_complete') return `✅ <b>Module complete:</b> ${esc(name(e.topicId))} (${e.pct}%)`;
  if (e.type === 'assessment') return `📘 Assessment — ${esc(name(e.topicId))}: <b>${e.score}/${e.total} (${e.pct}%)</b>${e.pct < PASS_PCT ? ' — below pass mark' : ''} · ${Math.round(e.seconds / 60)} min`;
  if (e.type === 'mock') return `📝 <b>${e.mockId.replace('mock-', 'Mock Test ')}: ${e.score}/200 (${e.pct}%)</b> — ${Object.entries(e.sections).map(([s, v]) => `${s} ${v}`).join(', ')} · ${Math.round(e.seconds / 60)} min${e.weakTopics?.length ? `<br><span style="color:#667085">Weakest in this mock: ${e.weakTopics.slice(0, 6).map(esc).join(', ')}</span>` : ''}`;
  return esc(e.type);
};

const subjRows = SUBJECTS.map(s => { const d = s.topics.filter(t => completed.has(t.id)).length;
  return `<tr><td style="padding:4px 10px">${s.name}</td><td style="padding:4px 10px">${d}/${s.topics.length}</td></tr>`; }).join('');

const student = prog.student || 'Student';
const nComplete = fresh.filter(e => e.type === 'module_complete').length;
const nMock = fresh.filter(e => e.type === 'mock').length;
const subject = `[NET Prep] ${student}: ${[nComplete && `${nComplete} module${nComplete > 1 ? 's' : ''} completed`, nMock && `${nMock} mock result${nMock > 1 ? 's' : ''}`].filter(Boolean).join(', ') || `${fresh.length} new assessment${fresh.length > 1 ? 's' : ''}`} — ${completed.size}/${ALL_TOPICS.length} overall`;

const html = `<div style="font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:#1d2433;max-width:640px">
<h2 style="margin:0 0 4px">NUST NET prep — progress update</h2>
<p style="color:#667085;margin:0 0 14px">${esc(student)} · Week ${wk} of 8 (${weekDates(wk).label}) · ${new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Karachi', day: 'numeric', month: 'long', year: 'numeric' })}</p>
<h3 style="margin:14px 0 6px">New since last update</h3>
<ul style="padding-left:18px;margin:0">${fresh.map(e => `<li style="margin:4px 0">${line(e)} <span style="color:#98a2b3">· ${when(e.at)} PKT</span></li>`).join('')}</ul>
<h3 style="margin:18px 0 6px">Overall</h3>
<p style="margin:0 0 6px"><b>${completed.size}/${ALL_TOPICS.length}</b> modules complete (${Math.round(completed.size / ALL_TOPICS.length * 100)}%).
${behind.length ? `<span style="color:#b54708">Behind plan by ${behind.length} module${behind.length > 1 ? 's' : ''}: ${behind.map(id => esc(name(id))).join(', ')}.</span>` : '<span style="color:#12805c">On track with the plan.</span>'}</p>
<table style="border-collapse:collapse;border:1px solid #e4e7ec">${subjRows}</table>
${mocks.length ? `<p style="margin:10px 0 0">Mock scores so far: ${mocks.map(m => `${m.mockId.replace('mock-', 'Mock ')} ${m.score}/200`).join(' · ')}</p>` : ''}
${weak.length ? `<p style="margin:10px 0 0">Topics to retake (latest score below 70%): ${weak.map(t => `${esc(t.name)} (${latest[t.id]}%)`).join(', ')}</p>` : ''}
<p style="margin:18px 0 0"><a href="https://saadkhans.github.io/nust-net-prep/">Open the prep site</a></p>
<p style="color:#98a2b3;font-size:12px">Sent automatically from waleed@stech.ink when new progress is synced.</p></div>`;

console.log(JSON.stringify({ newCount: fresh.length, subject, html, newIds: fresh.map(e => e.id) }));
