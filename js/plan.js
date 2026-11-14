// 8-week plan: Mon 16 Nov 2026 → Sun 10 Jan 2027 (lines up with NET Series-2, Jan–Feb 2027).
export const PLAN_START = '2026-11-16';

export const WEEKS = [
  { n: 1, focus: 'Foundations: algebra basics, measurement & motion, core vocabulary',
    modules: ['m-complex', 'm-quadratic', 'p-measure', 'p-kinematics', 'e-vocab'],
    daily: 'Weekdays: ~2 hrs alongside college (1 hr Maths, 45 min Physics, 15 min vocab). Weekend: finish any assessment below 60%.' },
  { n: 2, focus: 'Matrices & series; forces and energy; grammar rules',
    modules: ['m-matrices', 'm-sequences', 'p-dynamics', 'p-wep', 'e-grammar'],
    daily: 'Keep 15–20 new words a day from Week 1. Do the textbook exercises before the assessment.' },
  { n: 3, focus: 'Counting & binomial; circular motion & fluids; sentence completion',
    modules: ['m-pnc', 'm-binomial', 'p-circular', 'p-fluids', 'e-completion'],
    daily: 'Start timing yourself: aim for under 1 minute per MCQ in assessments.' },
  { n: 4, focus: 'Trigonometry & functions; waves & heat; reading — then your first full mock',
    modules: ['m-trig', 'm-functions', 'p-waves', 'p-thermo', 'e-reading'], mock: 1,
    daily: 'Mock 1 on Saturday is a diagnostic — some topics are not covered yet; that is expected.' },
  { n: 5, focus: 'Differential calculus; electrostatics & circuits; analogies',
    modules: ['m-differential', 'p-electrostatics', 'p-current', 'e-analogy'],
    daily: 'Calculus is ~12% of the paper — give it extra time. Review your Mock 1 mistakes first.' },
  { n: 6, focus: 'Integral calculus; electromagnetism & optics — then Mock 2',
    modules: ['m-integral', 'p-em', 'p-optics'], mock: 2,
    daily: 'Mock 2 on Saturday under strict exam conditions: 3 hours, no breaks, no phone.' },
  { n: 7, focus: 'Analytic geometry & vectors; modern physics; English mixed review',
    modules: ['m-geometry', 'm-vectors', 'p-modern'], review: ['e-vocab', 'e-grammar'],
    daily: 'Retake the Vocabulary and Grammar assessments — aim for 80%+.' },
  { n: 8, focus: 'Revision of weak topics + final mock',
    modules: [], weakReview: true, mock: 3,
    daily: 'Retake every topic below 70% (listed below). Mock 3 on Saturday. Register for NET-2 if you haven\'t.' },
];

export function weekDates(n) {
  const start = new Date(PLAN_START + 'T00:00:00');
  start.setDate(start.getDate() + (n - 1) * 7);
  const end = new Date(start); end.setDate(end.getDate() + 6);
  const f = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return { start, end, label: `${f(start)} – ${f(end)}` };
}

export function currentWeek(now = new Date()) {
  const start = new Date(PLAN_START + 'T00:00:00');
  const w = Math.floor((now - start) / (7 * 86400000)) + 1;
  return Math.max(1, Math.min(8, w));
}

export const PASS_PCT = 60;     // module counts as complete
export const MASTERY_PCT = 80;  // module counts as mastered
