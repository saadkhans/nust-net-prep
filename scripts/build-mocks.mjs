// Builds the 3 fixed mock tests into mocks/*.json and validates the whole bank.
import { writeFileSync } from 'node:fs';
import { buildMock, topicQuiz, ALL_TOPICS } from '../js/bank/index.js';

const problems = [];
function check(q, where) {
  if (!q.q || !Array.isArray(q.options) || q.options.length !== 4) problems.push(`${where}: bad shape`);
  if (new Set(q.options).size !== 4) problems.push(`${where}: duplicate options in "${q.q}"`);
  if (q.answer < 0 || q.answer > 3) problems.push(`${where}: answer index ${q.answer}`);
  if (q.options.some(o => /NaN|undefined|Infinity|null/.test(o))) problems.push(`${where}: bad option ${JSON.stringify(q.options)} in "${q.q}"`);
  if (/NaN|undefined/.test(q.q)) problems.push(`${where}: bad text "${q.q}"`);
}

for (let k = 1; k <= 3; k++) {
  const m = buildMock(k);
  const counts = m.sections.map(s => `${s.subject}:${s.questions.length}`).join(' ');
  m.sections.forEach(s => s.questions.forEach((q, i) => check(q, `mock${k} ${s.subject} #${i + 1}`)));
  const total = m.sections.reduce((a, s) => a + s.questions.length, 0);
  console.log(`mock-${k}: ${total} questions (${counts})`);
  writeFileSync(new URL(`../mocks/mock-${k}.json`, import.meta.url), JSON.stringify(m));
}

// Stress-test every topic's generators across many seeds.
for (const t of ALL_TOPICS) {
  for (let s = 0; s < 40; s++) topicQuiz(t.id, `test${s}`).forEach((q, i) => check(q, `${t.id} seed${s} #${i}`));
}
const uniq = [...new Set(problems)];
console.log(uniq.length ? uniq.slice(0, 40).join('\n') + `\n${uniq.length} problems` : 'All questions valid.');
