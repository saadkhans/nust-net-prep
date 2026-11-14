import { SUBJECTS, ALL_TOPICS, TOPIC, topicQuiz, PASSAGE_TEXT } from './bank/index.js';
import { WEEKS, weekDates, currentWeek, PASS_PCT, MASTERY_PCT } from './plan.js';
import { loadLocal, sync, addEvent, getToken, setToken, setStudent, REPO } from './sync.js';

const $ = (s, el = document) => el.querySelector(s);
const app = $('#app');
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const fmtDate = (iso) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

// ---------- derived progress ----------
function derive() {
  const d = loadLocal();
  const studied = new Set(), completed = new Set(), best = {}, attempts = {}, mocks = {};
  for (const e of d.events) {
    if (e.type === 'studied') studied.add(e.topicId);
    if (e.type === 'module_complete') completed.add(e.topicId);
    if (e.type === 'assessment') { (attempts[e.topicId] ||= []).push(e); best[e.topicId] = Math.max(best[e.topicId] ?? 0, e.pct); }
    if (e.type === 'mock') (mocks[e.mockId] ||= []).push(e);
  }
  const latest = {};
  for (const [t, a] of Object.entries(attempts)) latest[t] = a[a.length - 1].pct;
  const weak = ALL_TOPICS.filter(t => latest[t.id] != null && latest[t.id] < 70).map(t => t.id);
  const unattempted = ALL_TOPICS.filter(t => latest[t.id] == null).map(t => t.id);
  return { data: d, studied, completed, best, latest, attempts, mocks, weak, unattempted };
}

function status(p, id) {
  if (p.completed.has(id)) return (p.best[id] ?? 0) >= MASTERY_PCT ? 'mastered' : 'complete';
  if (p.attempts[id] || p.studied.has(id)) return 'started';
  return 'todo';
}
const STATUS_LABEL = { mastered: 'Mastered', complete: 'Complete', started: 'In progress', todo: 'Not started' };

// ---------- sync ----------
let syncState = { msg: '', ok: true };
async function doSync(quiet) {
  syncState = { msg: 'Syncing…', ok: true }; renderSyncBadge();
  try {
    const r = await sync();
    syncState = r === 'synced' ? { msg: `Synced ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`, ok: true }
      : { msg: 'Saved on this computer only — connect GitHub in Settings', ok: false };
  } catch (err) { syncState = { msg: err.message, ok: false }; if (!quiet) toast(err.message, true); }
  renderSyncBadge();
}
function renderSyncBadge() {
  const b = $('#sync'); if (!b) return;
  b.textContent = syncState.msg; b.className = 'sync ' + (syncState.ok ? 'ok' : 'warn');
}
function record(ev) { const e = addEvent(ev); doSync(true); return e; }

function toast(msg, bad) {
  const t = document.createElement('div'); t.className = 'toast' + (bad ? ' bad' : ''); t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 4000);
}

// ---------- layout ----------
function shell(title, body) {
  app.innerHTML = `
  <header class="top">
    <a href="#/" class="brand">NUST NET Prep</a>
    <nav><a href="#/">Dashboard</a><a href="#/plan">8-Week Plan</a><a href="#/mocks">Mock Tests</a><a href="#/progress">Progress</a><a href="#/settings">Settings</a></nav>
    <span id="sync" class="sync"></span>
  </header>
  <main>${title ? `<h1>${title}</h1>` : ''}${body}</main>
  <footer>Engineering / Computing stream · 200 MCQs · Maths 50% · Physics 30% · English 20% · no negative marking</footer>`;
  renderSyncBadge();
  window.scrollTo(0, 0);
}

function bar(p, label) { return `<div class="bar"><span style="width:${p}%"></span></div>${label ? `<div class="small">${label}</div>` : ''}`; }

// ---------- dashboard ----------
function dashboard() {
  const p = derive();
  const total = ALL_TOPICS.length, done = p.completed.size;
  const wk = currentWeek();
  const week = WEEKS[wk - 1];
  const nextUp = [...week.modules, ...(week.review || [])].filter(id => !p.completed.has(id));
  const subj = SUBJECTS.map(s => {
    const d = s.topics.filter(t => p.completed.has(t.id)).length;
    return `<div class="card"><h3>${s.name}</h3>${bar(pct(d, s.topics.length), `${d}/${s.topics.length} modules complete`)}</div>`;
  }).join('');
  const mockRows = [1, 2, 3].map(k => {
    const a = p.mocks[`mock-${k}`]; const last = a?.[a.length - 1];
    return `<tr><td><a href="#/mock/${k}">Mock ${k}</a></td><td>${last ? `${last.score}/200 (${last.pct}%)` : '—'}</td><td>${last ? fmtDate(last.at) : 'Not taken'}</td></tr>`;
  }).join('');
  const recent = [...p.data.events].reverse().slice(0, 6).map(evLine).join('') || '<li class="muted">No activity yet — start with Week 1.</li>';
  shell('', `
    ${p.data.student ? `<p class="hello">Assalam o Alaikum, ${esc(p.data.student)} 👋</p>` : ''}
    <section class="hero card">
      <div><div class="big">${pct(done, total)}%</div><div class="muted">of the syllabus complete (${done}/${total} modules)</div></div>
      <div class="grow">${bar(pct(done, total))}<p>You are in <b>Week ${wk}</b> (${weekDates(wk).label}): ${esc(week.focus)}.</p>
      ${nextUp.length ? `<p>Next up: ${nextUp.map(id => `<a class="chip" href="#/module/${id}">${esc(TOPIC[id].name)}</a>`).join(' ')}</p>` : week.mock ? `<p>Next up: <a class="chip" href="#/mock/${week.mock}">Mock ${week.mock}</a></p>` : ''}</div>
    </section>
    ${getToken() ? '' : `<div class="notice">Progress is saved on this computer only. <a href="#/settings">Connect GitHub</a> to sync between computers and send progress emails.</div>`}
    <div class="grid3">${subj}</div>
    <div class="grid2">
      <div class="card"><h3>Mock tests</h3><table class="tbl"><tr><th>Test</th><th>Last score</th><th>Date</th></tr>${mockRows}</table></div>
      <div class="card"><h3>Recent activity</h3><ul class="feed">${recent}</ul></div>
    </div>`);
}

function evLine(e) {
  const t = e.topicId ? esc(TOPIC[e.topicId]?.name || e.topicId) : '';
  const txt = {
    studied: `Studied notes: ${t}`,
    assessment: `Assessment — ${t}: ${e.score}/${e.total} (${e.pct}%)`,
    module_complete: `✅ Module complete: ${t}`,
    mock: `📝 ${e.mockId?.replace('mock-', 'Mock ')}: ${e.score}/200 (${e.pct}%)`,
  }[e.type] || e.type;
  return `<li><span>${txt}</span><span class="muted small">${fmtDate(e.at)}</span></li>`;
}

// ---------- plan ----------
function plan() {
  const p = derive(); const wk = currentWeek();
  const cards = WEEKS.map(w => {
    const ids = [...w.modules, ...(w.review || [])];
    const done = ids.filter(id => p.completed.has(id)).length;
    const weakList = w.weakReview ? (p.weak.length ? p.weak : []) : [];
    const rows = ids.map(id => {
      const t = TOPIC[id]; const st = status(p, id);
      const isReview = (w.review || []).includes(id);
      return `<li class="mod ${st}"><span class="dot"></span><a href="#/module/${id}">${esc(t.name)}</a><span class="tag">${t.subject}${isReview ? ' · review' : ''}</span>
        <span class="muted small">${p.best[id] != null ? `best ${p.best[id]}%` : ''}</span><span class="st">${STATUS_LABEL[st]}</span></li>`;
    }).join('');
    const weakHtml = w.weakReview ? `<p class="small"><b>Your weak topics (latest assessment below 70%) — retake these:</b></p><ul class="weak">${weakList.map(id => `<li><a href="#/module/${id}">${esc(TOPIC[id].name)}</a> <span class="muted small">${p.latest[id]}%</span></li>`).join('') || '<li class="muted">None yet — this list fills in automatically from your assessment scores.</li>'}</ul>${p.unattempted.length ? `<p class="small">Not attempted yet: ${p.unattempted.map(id => `<a href="#/module/${id}">${esc(TOPIC[id].name)}</a>`).join(', ')}</p>` : ''}` : '';
    const mockHtml = w.mock ? (() => { const a = p.mocks[`mock-${w.mock}`]; return `<li class="mod ${a ? 'complete' : 'todo'}"><span class="dot"></span><a href="#/mock/${w.mock}">Full Mock Test ${w.mock}</a><span class="tag">200 MCQs · 3 hrs · Saturday</span><span class="muted small">${a ? `${a[a.length - 1].score}/200` : ''}</span><span class="st">${a ? 'Taken' : 'Not taken'}</span></li>`; })() : '';
    return `<section class="card week ${w.n === wk ? 'current' : ''}" id="w${w.n}">
      <div class="wkhead"><h2>Week ${w.n}</h2><span class="muted">${weekDates(w.n).label}</span>${w.n === wk ? '<span class="pill">This week</span>' : ''}<span class="grow"></span><span class="small">${ids.length ? `${done}/${ids.length} modules` : ''}</span></div>
      <p class="focus">${esc(w.focus)}</p>
      <ul class="mods">${rows}${mockHtml}</ul>${weakHtml}
      <p class="small muted">${esc(w.daily)}</p></section>`;
  }).join('');
  shell('8-Week Plan', `<p class="muted">16 Nov 2026 – 10 Jan 2027, finishing just before NET Series-2 (Jan–Feb 2027). A module is <b>complete</b> when you score ${PASS_PCT}%+ on its topic assessment, and <b>mastered</b> at ${MASTERY_PCT}%+. Each completion is synced and emailed.</p>${cards}`);
  const cur = document.getElementById('w' + wk); if (cur && wk > 1) cur.scrollIntoView({ block: 'start' });
}

// ---------- module ----------
function moduleView(id) {
  const t = TOPIC[id]; if (!t) return notFound();
  const p = derive(); const st = status(p, id);
  const att = (p.attempts[id] || []).slice().reverse().map(e => `<tr><td>${fmtDate(e.at)}</td><td>${e.score}/${e.total}</td><td>${e.pct}%</td></tr>`).join('');
  const wk = WEEKS.find(w => w.modules.includes(id));
  shell(esc(t.name), `
    <p class="muted">${t.subject} · ${esc(t.book)} · ${wk ? `Week ${wk.n}` : ''} · ~${t.weight} MCQs in the real NET</p>
    <div class="card"><h3>Step 1 — Learn</h3>
      <ol class="steps"><li>Read the chapter in your FBISE textbook (${esc(t.book)}) and solve every exercise and example.</li><li>Review the key points below until you can recall them without looking.</li></ol>
      <h4>Key points & formulas</h4><ul class="notes">${t.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
      ${p.studied.has(id) ? '<p class="okmsg">✓ Marked as studied</p>' : `<button class="btn" id="studied">I've studied this topic</button>`}
    </div>
    <div class="card"><h3>Step 2 — Topic assessment</h3>
      <p>${id === 'e-reading' ? '2 passages, 10 questions' : '15 questions'} · fresh questions every attempt · pass ${PASS_PCT}% to complete the module (${MASTERY_PCT}% = mastered). Aim for under 1 minute per question.</p>
      <p>Status: <b class="st-${st}">${STATUS_LABEL[st]}</b>${p.best[id] != null ? ` · best ${p.best[id]}%` : ''}</p>
      <a class="btn primary" href="#/quiz/${id}">${p.attempts[id] ? 'Retake assessment' : 'Start assessment'}</a>
      ${att ? `<table class="tbl"><tr><th>Attempt</th><th>Score</th><th>%</th></tr>${att}</table>` : ''}
    </div>`);
  const b = $('#studied'); if (b) b.onclick = () => { record({ type: 'studied', topicId: id }); toast('Marked as studied'); moduleView(id); };
}

// ---------- quiz (topic assessment) ----------
function quizView(id) {
  const t = TOPIC[id]; if (!t) return notFound();
  const seed = Date.now();
  const qs = topicQuiz(id, seed);
  const started = Date.now();
  let lastPassage = null;
  const items = qs.map((q, i) => {
    let ph = '';
    if (q.passage && q.passage !== lastPassage) { lastPassage = q.passage; ph = `<div class="passage"><b>${esc(q.passage)}</b><p>${esc(PASSAGE_TEXT[q.passage])}</p></div>`; }
    return `${ph}<div class="q card" data-i="${i}"><div class="qn">Q${i + 1}</div><div class="qt">${esc(q.q)}</div>
      ${q.options.map((o, j) => `<label class="opt"><input type="radio" name="q${i}" value="${j}"> <span>${String.fromCharCode(65 + j)}. ${esc(o)}</span></label>`).join('')}
      <div class="fb"></div></div>`;
  }).join('');
  shell(`Assessment: ${esc(t.name)}`, `<p class="muted">${qs.length} questions · <span id="clock">0:00</span> elapsed</p><form id="quiz">${items}<button class="btn primary" type="submit">Submit answers</button> <a class="btn" href="#/module/${id}">Cancel</a></form>`);
  const clock = setInterval(() => { const el = $('#clock'); if (!el) return clearInterval(clock); const s = Math.floor((Date.now() - started) / 1000); el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 1000);
  $('#quiz').onsubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target; const unanswered = qs.filter((_, i) => !form[`q${i}`].value).length;
    if (unanswered && !form.dataset.warned) { form.dataset.warned = '1'; toast(`${unanswered} unanswered — there is no negative marking, so answer every question. Press Submit again to finish.`, true); return; }
    clearInterval(clock);
    let score = 0;
    qs.forEach((q, i) => {
      const v = form[`q${i}`].value; const card = form.querySelector(`[data-i="${i}"]`);
      const right = v !== '' && +v === q.answer; if (right) score++;
      card.classList.add(right ? 'right' : 'wrong');
      card.querySelector('.fb').innerHTML = `${right ? '✓ Correct' : `✗ Correct answer: <b>${String.fromCharCode(65 + q.answer)}. ${esc(q.options[q.answer])}</b>`}${q.expl ? `<div class="expl">${esc(q.expl)}</div>` : ''}`;
      card.querySelectorAll('label.opt').forEach((l, j) => { if (j === q.answer) l.classList.add('correct'); else if (v !== '' && +v === j) l.classList.add('picked'); });
      card.querySelectorAll('input').forEach(x => (x.disabled = true));
    });
    const p0 = derive(); const pc = pct(score, qs.length);
    const secs = Math.round((Date.now() - started) / 1000);
    record({ type: 'assessment', topicId: id, score, total: qs.length, pct: pc, seconds: secs });
    let msg = `Score: ${score}/${qs.length} (${pc}%) in ${Math.floor(secs / 60)}m ${secs % 60}s.`;
    if (pc >= PASS_PCT && !p0.completed.has(id)) { record({ type: 'module_complete', topicId: id, pct: pc }); msg += ' ✅ Module complete!'; }
    else if (pc < PASS_PCT) msg += ` You need ${PASS_PCT}% to complete this module — review the notes and retake.`;
    form.querySelector('button[type=submit]').remove();
    form.insertAdjacentHTML('afterbegin', `<div class="card result ${pc >= PASS_PCT ? 'pass' : 'fail'}"><h2>${msg}</h2><a class="btn primary" href="#/module/${id}">Back to module</a> <a class="btn" href="#/plan">Plan</a></div>`);
    window.scrollTo(0, 0);
  };
}

// ---------- mocks ----------
const mockCache = {};
async function loadMock(k) {
  if (!mockCache[k]) mockCache[k] = await (await fetch(`mocks/mock-${k}.json`)).json();
  return mockCache[k];
}
const runKey = (k) => `netprep.mockrun.${k}`;

function mocksList() {
  const p = derive();
  shell('Full Mock Tests', `<p class="muted">Each mock mirrors the NET Engineering/Computing paper: 200 MCQs (100 Maths, 60 Physics, 40 English), 180 minutes, no negative marking. Take them in one sitting.</p>
  <div class="grid3">${[1, 2, 3].map(k => { const a = p.mocks[`mock-${k}`] || []; const inProg = localStorage.getItem(runKey(k));
    return `<div class="card"><h3>Mock Test ${k}</h3><p class="muted">Plan: Week ${[4, 6, 8][k - 1]} Saturday</p>
    ${a.length ? `<p>Attempts: ${a.length} · last ${a[a.length - 1].score}/200 (${a[a.length - 1].pct}%)</p>` : '<p>Not taken yet</p>'}
    <a class="btn primary" href="#/mock/${k}">${inProg ? 'Resume' : a.length ? 'Retake' : 'Start'}</a></div>`; }).join('')}</div>`);
}

async function mockView(k) {
  k = +k; if (![1, 2, 3].includes(k)) return notFound();
  const m = await loadMock(k);
  const flat = m.sections.flatMap(s => s.questions.map(q => ({ ...q, section: s.subject })));
  let run = JSON.parse(localStorage.getItem(runKey(k)) || 'null');
  if (!run) {
    shell(`Mock Test ${k}`, `<div class="card"><p>200 questions · 180 minutes · Mathematics (1–100), Physics (101–160), English (161–200).</p>
    <ul><li>The timer keeps running if you close the page — your answers are saved as you go.</li><li>Use <b>Mark for review</b> for questions to revisit.</li><li>No negative marking: answer everything before time runs out.</li><li>The test auto-submits at 0:00.</li></ul>
    <button class="btn primary" id="go">Start the 3-hour test</button></div>`);
    $('#go').onclick = () => { localStorage.setItem(runKey(k), JSON.stringify({ startedAt: Date.now(), answers: {}, flags: {}, cur: 0 })); mockView(k); };
    return;
  }
  const save = () => localStorage.setItem(runKey(k), JSON.stringify(run));
  const end = run.startedAt + m.minutes * 60000;
  app.innerHTML = `<div class="cbt">
    <div class="cbt-top"><b>NET Mock ${k}</b><div class="tabs">${m.sections.map((s, i) => { const st = m.sections.slice(0, i).reduce((a, x) => a + x.questions.length, 0); return `<button data-jump="${st}">${s.subject}</button>`; }).join('')}</div><span id="timer" class="timer"></span><button class="btn danger" id="submit">Submit test</button></div>
    <div class="cbt-body"><div class="cbt-q" id="qpane"></div><aside class="palette" id="pal"></aside></div></div>`;
  const draw = () => {
    const i = run.cur, q = flat[i];
    const passage = q.passage ? `<div class="passage"><b>${esc(q.passage)}</b><p>${esc(PASSAGE_TEXT[q.passage])}</p></div>` : '';
    $('#qpane').innerHTML = `${passage}<div class="muted small">${q.section} · Question ${i + 1} of ${flat.length}</div><div class="qt big-q">${esc(q.q)}</div>
      ${q.options.map((o, j) => `<label class="opt ${run.answers[i] === j ? 'sel' : ''}"><input type="radio" name="o" value="${j}" ${run.answers[i] === j ? 'checked' : ''}> <span>${String.fromCharCode(65 + j)}. ${esc(o)}</span></label>`).join('')}
      <div class="navrow"><button class="btn" id="prev" ${i === 0 ? 'disabled' : ''}>← Previous</button><button class="btn" id="clear">Clear</button><button class="btn ${run.flags[i] ? 'flagged' : ''}" id="flag">${run.flags[i] ? 'Unmark review' : 'Mark for review'}</button><button class="btn primary" id="next" ${i === flat.length - 1 ? 'disabled' : ''}>Save & next →</button></div>`;
    $('#qpane').querySelectorAll('input').forEach(inp => inp.onchange = () => { run.answers[i] = +inp.value; save(); draw(); });
    $('#prev').onclick = () => { run.cur--; save(); draw(); };
    $('#next').onclick = () => { run.cur++; save(); draw(); };
    $('#clear').onclick = () => { delete run.answers[i]; save(); draw(); };
    $('#flag').onclick = () => { run.flags[i] = !run.flags[i]; save(); draw(); };
    const answered = Object.keys(run.answers).length;
    $('#pal').innerHTML = `<div class="small">Answered <b>${answered}</b>/200 · Review <b>${Object.values(run.flags).filter(Boolean).length}</b></div><div class="pgrid">${flat.map((_, j) => `<button class="${run.answers[j] != null ? 'ans' : ''} ${run.flags[j] ? 'flag' : ''} ${j === i ? 'cur' : ''}" data-go="${j}">${j + 1}</button>`).join('')}</div>`;
    $('#pal').querySelectorAll('[data-go]').forEach(b => b.onclick = () => { run.cur = +b.dataset.go; save(); draw(); });
  };
  document.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => { run.cur = +b.dataset.jump; save(); draw(); });
  const finish = () => {
    clearInterval(tick);
    const res = { total: 0, bySection: {}, byTopic: {} };
    flat.forEach((q, i) => {
      const ok = run.answers[i] === q.answer; if (ok) res.total++;
      const s = (res.bySection[q.section] ||= { right: 0, n: 0 }); s.n++; if (ok) s.right++;
      const t = (res.byTopic[q.topic] ||= { right: 0, n: 0, section: q.section }); t.n++; if (ok) t.right++;
    });
    const secs = Math.min(Math.round((Date.now() - run.startedAt) / 1000), m.minutes * 60);
    const ev = record({ type: 'mock', mockId: `mock-${k}`, score: res.total, total: 200, pct: pct(res.total, 200), seconds: secs,
      sections: Object.fromEntries(Object.entries(res.bySection).map(([s, v]) => [s, `${v.right}/${v.n}`])),
      weakTopics: Object.entries(res.byTopic).filter(([, v]) => v.right / v.n < 0.6).map(([t]) => t) });
    localStorage.setItem(`netprep.mockresult.${ev.id}`, JSON.stringify({ k, answers: run.answers }));
    localStorage.removeItem(runKey(k));
    mockResult(k, ev.id);
  };
  $('#submit').onclick = () => {
    const left = 200 - Object.keys(run.answers).length;
    modal(`Submit Mock ${k}?`, left ? `You have <b>${left}</b> unanswered questions. There's no negative marking — a guess can only help.` : 'All questions answered.', 'Submit now', finish);
  };
  const tick = setInterval(() => {
    const el = $('#timer'); if (!el) return clearInterval(tick);
    const ms = end - Date.now(); if (ms <= 0) { toast('Time is up — test submitted.'); return finish(); }
    const s = Math.floor(ms / 1000); el.textContent = `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    el.classList.toggle('low', ms < 10 * 60000);
  }, 1000);
  draw();
}

async function mockResult(k, evId) {
  const m = await loadMock(k);
  const flat = m.sections.flatMap(s => s.questions.map(q => ({ ...q, section: s.subject })));
  const ev = loadLocal().events.find(e => e.id === evId);
  const saved = JSON.parse(localStorage.getItem(`netprep.mockresult.${evId}`) || '{"answers":{}}');
  const byTopic = {};
  flat.forEach((q, i) => { const t = (byTopic[q.topic] ||= { right: 0, n: 0, section: q.section }); t.n++; if (saved.answers[i] === q.answer) t.right++; });
  const topicRows = Object.entries(byTopic).sort((a, b) => a[1].right / a[1].n - b[1].right / b[1].n)
    .map(([t, v]) => `<tr><td>${esc(t)}</td><td>${v.section}</td><td>${v.right}/${v.n}</td><td>${bar(pct(v.right, v.n))}</td></tr>`).join('');
  const wrong = flat.map((q, i) => ({ q, i, a: saved.answers[i] })).filter(x => x.a !== x.q.answer);
  shell(`Mock ${k} — result`, `
    <div class="card result ${ev.pct >= 60 ? 'pass' : 'fail'}"><h2>${ev.score}/200 (${ev.pct}%)</h2>
      <p>${Object.entries(ev.sections).map(([s, v]) => `${s}: <b>${v}</b>`).join(' · ')} · time used ${Math.floor(ev.seconds / 60)} min</p>
      <p class="small muted">This result has been saved and will be included in the next progress email.</p></div>
    <div class="card"><h3>Topic breakdown (weakest first)</h3><table class="tbl">${topicRows}</table></div>
    <div class="card"><h3>Review: ${wrong.length} incorrect or unanswered</h3>
      ${wrong.map(({ q, i, a }) => `<details><summary>Q${i + 1} · ${esc(q.section)} · ${esc(q.topic)}</summary><p>${esc(q.q)}</p><p>Your answer: ${a != null ? esc(q.options[a]) : '<i>none</i>'}<br>Correct: <b>${esc(q.options[q.answer])}</b></p>${q.expl ? `<p class="expl">${esc(q.expl)}</p>` : ''}</details>`).join('')}</div>
    <a class="btn" href="#/mocks">Back to mocks</a>`);
}

function modal(title, html, okText, onOk) {
  const w = document.createElement('div'); w.className = 'modal';
  w.innerHTML = `<div class="card"><h3>${title}</h3><p>${html}</p><button class="btn primary" id="mok">${okText}</button> <button class="btn" id="mcancel">Keep going</button></div>`;
  document.body.appendChild(w);
  $('#mok', w).onclick = () => { w.remove(); onOk(); };
  $('#mcancel', w).onclick = () => w.remove();
}

// ---------- progress ----------
function progressView() {
  const p = derive();
  const rows = ALL_TOPICS.map(t => { const st = status(p, t.id);
    return `<tr><td><a href="#/module/${t.id}">${esc(t.name)}</a></td><td>${t.subject}</td><td>${(p.attempts[t.id] || []).length}</td><td>${p.best[t.id] != null ? p.best[t.id] + '%' : '—'}</td><td>${p.latest[t.id] != null ? p.latest[t.id] + '%' : '—'}</td><td class="st-${st}">${STATUS_LABEL[st]}</td></tr>`; }).join('');
  shell('Progress', `
    <div class="card"><h3>All modules</h3><table class="tbl"><tr><th>Module</th><th>Subject</th><th>Attempts</th><th>Best</th><th>Latest</th><th>Status</th></tr>${rows}</table></div>
    <div class="card"><h3>Activity log</h3><ul class="feed">${[...p.data.events].reverse().map(evLine).join('') || '<li class="muted">Nothing yet.</li>'}</ul></div>
    <button class="btn" id="resync">Sync now</button>`);
  $('#resync').onclick = () => doSync(false).then(() => progressView());
}

// ---------- settings ----------
function settingsView() {
  const d = loadLocal(); const tok = getToken();
  shell('Settings', `
    <div class="card"><h3>Your name</h3><input id="name" value="${esc(d.student)}" placeholder="Shown in progress emails"> <button class="btn" id="savename">Save</button></div>
    <div class="card"><h3>Sync across computers (GitHub)</h3>
      <p>Progress is stored in <code>${REPO}/progress/progress.json</code>. Any computer can <b>read</b> it; to <b>save</b>, each computer needs a GitHub token (one-time setup):</p>
      <ol class="steps">
        <li>Open <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">github.com → Settings → Fine-grained tokens → Generate new token</a> (signed in as <b>saadkhans</b>).</li>
        <li>Name: <i>nust-net-prep</i>. Expiration: 90 days or longer.</li>
        <li>Repository access: <b>Only select repositories</b> → <b>nust-net-prep</b>.</li>
        <li>Permissions → Repository permissions → <b>Contents: Read and write</b>. Nothing else.</li>
        <li>Generate, copy the token, paste it below. It is stored only in this browser.</li>
      </ol>
      <input id="tok" type="password" placeholder="github_pat_…" value="${tok ? '••••••••' : ''}"> <button class="btn primary" id="savetok">Save & test</button> ${tok ? '<button class="btn" id="deltok">Remove token</button>' : ''}
      <p class="small muted">Progress emails: an hourly check sends any new completions and scores from waleed@stech.ink to waleed@stech.ink.</p></div>
    <div class="card"><h3>Data</h3><button class="btn" id="export">Download my progress (JSON)</button></div>`);
  $('#savename').onclick = () => { setStudent($('#name').value.trim()); doSync(true); toast('Saved'); };
  $('#savetok').onclick = async () => { const v = $('#tok').value; if (v && !v.startsWith('•')) setToken(v); await doSync(false); toast(syncState.ok ? 'GitHub connected ✓' : syncState.msg, !syncState.ok); settingsView(); };
  const del = $('#deltok'); if (del) del.onclick = () => { setToken(''); settingsView(); };
  $('#export').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(loadLocal(), null, 1)], { type: 'application/json' })); a.download = 'net-progress.json'; a.click(); };
}

function notFound() { shell('Not found', '<p><a href="#/">Back to dashboard</a></p>'); }

// ---------- router ----------
function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const [page, arg] = h.split('/');
  ({ '': dashboard, plan, mocks: mocksList, progress: progressView, settings: settingsView,
    module: () => moduleView(arg), quiz: () => quizView(arg), mock: () => mockView(arg) }[page] || notFound)();
}
window.addEventListener('hashchange', route);
route();
doSync(true).then(() => { const h = location.hash; if (!/quiz|mock\//.test(h)) route(); });
