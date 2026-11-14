import { makeRng } from '../js/bank/util.js';
import { ALL_TOPICS } from '../js/bank/index.js';
const errs = new Map(); const bad = new Map();
for (const t of ALL_TOPICS) t.gens.forEach((g, gi) => {
  for (let s = 0; s < 400; s++) {
    const r = makeRng(`${t.id}-${gi}-${s}`);
    try { const q = g(r);
      if (new Set(q.options).size !== 4 || q.options.some(o => /NaN|undefined|Infinity/.test(o)) || /NaN|undefined/.test(q.q)) bad.set(`${t.id}#${gi}`, q.q + ' ' + JSON.stringify(q.options));
    } catch (e) { errs.set(`${t.id}#${gi}`, e.message); }
  }
});
console.log('ERRORS:'); for (const [k, v] of errs) console.log(k, v);
console.log('BAD:'); for (const [k, v] of bad) console.log(k, v);
