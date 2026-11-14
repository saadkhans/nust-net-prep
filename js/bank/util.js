// Shared helpers for question generators. Works in browser and Node (ES modules).

export function makeRng(seed) {
  // mulberry32
  let a = (typeof seed === 'string' ? hashStr(seed) : seed) >>> 0;
  const rng = () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  rng.int = (lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
  rng.pick = (arr) => arr[Math.floor(rng() * arr.length)];
  rng.shuffle = (arr) => {
    const a2 = arr.slice();
    for (let i = a2.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a2[i], a2[j]] = [a2[j], a2[i]];
    }
    return a2;
  };
  rng.sample = (arr, n) => rng.shuffle(arr).slice(0, n);
  rng.nonzero = (lo, hi) => { let v = 0; while (v === 0) v = rng.int(lo, hi); return v; };
  return rng;
}

export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// Format a number: trims float noise, keeps up to 3 decimals.
export function fmt(x) {
  if (typeof x === 'string') return x;
  if (!isFinite(x)) return String(x);
  const r = Math.round(x * 1000) / 1000;
  if (Object.is(r, -0)) return '0';
  return String(r);
}

export function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; }

// Fraction as string "p/q" reduced, or integer.
export function frac(p, q) {
  if (q < 0) { p = -p; q = -q; }
  const g = gcd(p, q); p /= g; q /= g;
  return q === 1 ? String(p) : `${p}/${q}`;
}

// signed term, e.g. coefficient formatting for polynomials: term(3,'x') -> "+ 3x"
export function sgn(n) { return n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`; }

/**
 * Build an MCQ. correct and distractors are display strings (or numbers).
 * Ensures 4 distinct options; fills from `extra` generator if needed.
 */
export function mcq(rng, { q, correct, wrong, expl, topic, subject, extraWrong }) {
  const norm = (x) => pretty(String(typeof x === 'number' ? fmt(x) : x).replace(/(^|[\s(,\[])-(?=\d)/g, '$1−'));
  const c = norm(correct);
  const opts = [c];
  const pool = (wrong || []).map(norm);
  for (const w of pool) { if (opts.length >= 4) break; if (!opts.includes(w)) opts.push(w); }
  let guard = 0;
  while (opts.length < 4 && extraWrong && guard++ < 50) {
    const w = norm(extraWrong());
    if (!opts.includes(w)) opts.push(w);
  }
  // Fallback: perturb a numeric (or fraction) answer, keeping any unit suffix.
  const m = /^([−-]?\d+(?:\.\d+)?)(?:\/(\d+))?(.*)$/.exec(c);
  if (opts.length < 4 && m) {
    const num = parseFloat(m[1].replace('−', '-')), den = m[2] ? parseInt(m[2]) : null, suf = m[3];
    const cands = [1, -1, 2, -2, 3, 5, -3, 10].filter(d => !den || num + d !== 0).map(d => den ? frac(num + d, den) : fmt(num + d))
      .concat(den ? [] : [fmt(num * 2), fmt(num / 2), fmt(num * 10)]).map(s => s.replace(/^-/, '−') + suf);
    for (const w of cands) { if (opts.length >= 4) break; if (!opts.includes(w)) opts.push(w); }
  }
  if (opts.length < 4) throw new Error('Not enough distinct options for: ' + q);
  const shuffled = rng.shuffle(opts);
  return { subject, topic, q: norm(q), options: shuffled, answer: shuffled.indexOf(c), expl: expl || '' };
}

// Numeric distractors near a value.
export function near(rng, v, opts = {}) {
  const { int = Number.isInteger(v), spread = 0.5 } = opts;
  return () => {
    if (int) {
      const d = rng.nonzero(-Math.max(3, Math.round(Math.abs(v) * spread)), Math.max(3, Math.round(Math.abs(v) * spread)));
      return v + d;
    }
    const f = rng.pick([0.5, 2, 1.5, 0.75, 1.25, -1, 0.25, 4]);
    return Math.round(v * f * 1000) / 1000;
  };
}

// Pick from an authored pool of {q, a, w:[...], e} and turn into an MCQ.
export function fromPool(rng, item, subject, topic) {
  return mcq(rng, { q: item.q, correct: item.a, wrong: item.w, expl: item.e || '', subject, topic });
}

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
// x^3 -> x³, "1x" -> "x", "+ 1x" -> "+ x"
export function pretty(s) {
  return s.replace(/\^(\d+)/g, (_, d) => d.split('').map(c => SUP[c]).join(''))
    .replace(/(^|[^\d.⁰¹²³⁴⁵⁶⁷⁸⁹])1x/g, '$1x').replace(/(^|[^\d.])1i(?![a-z])/g, '$1i');
}
