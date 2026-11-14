import { makeRng } from './util.js';
import { MATH_TOPICS } from './math.js';
import { PHYSICS_TOPICS } from './physics.js';
import { ENGLISH_TOPICS, passageQuestions, PASSAGE_TEXT, PASSAGE_COUNT } from './english.js';

export const SUBJECTS = [
  { id: 'math', name: 'Mathematics', topics: MATH_TOPICS, mcqs: 100 },
  { id: 'physics', name: 'Physics', topics: PHYSICS_TOPICS, mcqs: 60 },
  { id: 'english', name: 'English', topics: ENGLISH_TOPICS, mcqs: 40 },
];
export const ALL_TOPICS = SUBJECTS.flatMap(s => s.topics.map(t => ({ ...t, subjectId: s.id, subject: s.name })));
export const TOPIC = Object.fromEntries(ALL_TOPICS.map(t => [t.id, t]));
export { PASSAGE_TEXT };

function uniqueFrom(rng, gens, n, seen = new Set()) {
  const out = [];
  let tries = 0, order = [];
  while (out.length < n && tries < n * 60) {
    tries++;
    // round-robin over a shuffled order of templates, so one template doesn't dominate
    if (!order.length) order = rng.shuffle(gens);
    const q = order.pop()(rng);
    const key = q.q + '|' + q.options[q.answer];
    if (seen.has(key)) continue;
    seen.add(key); out.push(q);
  }
  if (out.length < n) throw new Error(`Could only make ${out.length}/${n} unique questions`);
  return out;
}

// Topic assessment: fresh questions every attempt (seeded by attempt id).
export function topicQuiz(topicId, seed, n = 15) {
  const t = TOPIC[topicId];
  const rng = makeRng(`${topicId}:${seed}`);
  if (topicId === 'e-reading') {
    const idx = rng.sample([...Array(PASSAGE_COUNT).keys()], 2);
    return idx.flatMap(i => passageQuestions(rng, i, 5));
  }
  return uniqueFrom(rng, t.gens, n);
}

// Full NET-style mock: 100 Maths, 60 Physics, 40 English. Deterministic per mock number.
export function buildMock(k) {
  const rng = makeRng(`nust-net-mock-${k}-v1`);
  const sections = [];
  for (const s of SUBJECTS) {
    let qs = [];
    if (s.id !== 'english') {
      for (const t of s.topics) qs.push(...uniqueFrom(rng, t.gens, t.weight));
      qs = rng.shuffle(qs);
    } else {
      const seen = new Set();
      for (const t of s.topics.filter(t => t.id !== 'e-reading')) qs.push(...uniqueFrom(rng, t.gens, t.weight, seen));
      qs = rng.shuffle(qs);
      const p1 = (2 * (k - 1)) % PASSAGE_COUNT, p2 = (2 * (k - 1) + 1) % PASSAGE_COUNT;
      qs.push(...passageQuestions(rng, p1, 4), ...passageQuestions(rng, p2, 4));
    }
    sections.push({ subject: s.name, questions: qs });
  }
  return { id: `mock-${k}`, title: `NET Mock Test ${k}`, minutes: 180, sections };
}
