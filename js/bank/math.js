// Mathematics question generators — FSc Part I & II (NET Engineering/Computing: 100 MCQs).
import { mcq, fmt, frac, near, fromPool, gcd } from './util.js';

const S = 'Mathematics';
const mk = (topic) => (rng, o) => mcq(rng, { ...o, subject: S, topic });
const P = (topic) => (rng, item) => fromPool(rng, item, S, topic);

// ---------- 1. Complex numbers ----------
const T1 = 'Number Systems & Complex Numbers';
const m1 = mk(T1), p1 = P(T1);
const complexPool = [
  { q: 'The conjugate of a complex number z = a + bi is reflected in which axis on the Argand diagram?', a: 'Real axis', w: ['Imaginary axis', 'Line y = x', 'Origin'], e: 'z̄ = a − bi is the mirror image of z in the real (x) axis.' },
  { q: 'For any complex number z, z·z̄ equals:', a: '|z|²', w: ['|z|', '2Re(z)', '0'], e: '(a+bi)(a−bi) = a² + b² = |z|².' },
  { q: 'i⁴ⁿ (n a positive integer) equals:', a: '1', w: ['i', '−1', '−i'], e: 'i⁴ = 1, so i⁴ⁿ = 1.' },
  { q: 'Which of the following is an irrational number?', a: '√2', w: ['0.25', '22/7', '√16'], e: '√2 cannot be written as p/q. 22/7 is rational (it only approximates π).' },
  { q: 'The set of complex numbers is NOT:', a: 'An ordered field', w: ['Closed under addition', 'Closed under multiplication', 'A field'], e: 'Complex numbers form a field but cannot be ordered (we cannot say i > 0 or i < 0).' },
  { q: '|z₁ z₂| is equal to:', a: '|z₁| |z₂|', w: ['|z₁| + |z₂|', '|z₁| − |z₂|', '|z₁|/|z₂|'], e: 'The modulus of a product is the product of the moduli.' },
  { q: 'The additive inverse of 3 − 4i is:', a: '−3 + 4i', w: ['3 + 4i', '−3 − 4i', '(3 + 4i)/25'], e: 'Additive inverse of z is −z.' },
];
const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15]];
const complexGens = [
  (r) => { const [a, b, c] = r.pick(triples); const sa = r.pick([1, -1]), sb = r.pick([1, -1]);
    return m1(r, { q: `The modulus of z = ${sa * a} ${sb > 0 ? '+' : '−'} ${b}i is:`, correct: c, wrong: [a + b, c * c, Math.abs(a - b) || 1, b], expl: `|z| = √(${a}² + ${b}²) = √${c * c} = ${c}.` }); },
  (r) => { const a = r.int(1, 6), b = r.int(1, 6), c = r.int(1, 6), d = r.int(1, 6);
    const re = a * c - b * d, im = a * d + b * c;
    const f = (x, y) => `${x} ${y < 0 ? '−' : '+'} ${Math.abs(y)}i`;
    return m1(r, { q: `(${a} + ${b}i)(${c} + ${d}i) = ?`, correct: f(re, im), wrong: [f(a * c + b * d, im), f(re, a * d - b * c), f(a * c, b * d)], expl: `= ${a * c} + ${a * d}i + ${b * c}i + ${b * d}i² = ${re} + ${im}i (since i² = −1).` }); },
  (r) => { const n = r.int(5, 103); const vals = ['1', 'i', '−1', '−i'];
    return m1(r, { q: `i^${n} = ?`, correct: vals[n % 4], wrong: vals.filter((_, k) => k !== n % 4), expl: `Powers of i repeat every 4. ${n} mod 4 = ${n % 4}, so i^${n} = ${vals[n % 4]}.` }); },
  (r) => { const a = r.int(1, 5), b = r.int(1, 5);
    const re = a * a - b * b, im = 2 * a * b;
    const f = (x, y) => `${x} ${y < 0 ? '−' : '+'} ${Math.abs(y)}i`;
    return m1(r, { q: `(${a} + ${b}i)² = ?`, correct: f(re, im), wrong: [f(a * a + b * b, im), f(re, a * b), f(a * a, b * b)], expl: `(a+bi)² = a² − b² + 2abi = ${re} + ${im}i.` }); },
  (r) => { const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]);
    return m1(r, { q: `The multiplicative inverse of ${a} + ${b}i is:`, correct: `(${a} − ${b}i)/${c * c}`, wrong: [`(${a} + ${b}i)/${c * c}`, `(${a} − ${b}i)/${c}`, `−${a} − ${b}i`], expl: `1/z = z̄/|z|² = (${a} − ${b}i)/${c * c}.` }); },
  (r) => p1(r, r.pick(complexPool)),
  (r) => p1(r, r.pick(complexPool)),
];

// ---------- 2. Matrices & Determinants ----------
const T2 = 'Matrices & Determinants';
const m2 = mk(T2), p2 = P(T2);
const matPool = [
  { q: 'If A is a 2×3 matrix and B is a 3×4 matrix, the order of AB is:', a: '2 × 4', w: ['3 × 3', '4 × 2', 'AB is not defined'], e: '(m×n)(n×p) gives m×p.' },
  { q: 'A square matrix A is singular if:', a: '|A| = 0', w: ['|A| = 1', 'A = Aᵗ', 'A = I'], e: 'A singular matrix has zero determinant and no inverse.' },
  { q: '(AB)ᵗ equals:', a: 'BᵗAᵗ', w: ['AᵗBᵗ', 'AB', 'BA'], e: 'Transpose reverses the order of a product.' },
  { q: 'If two rows of a determinant are identical, its value is:', a: '0', w: ['1', 'Doubled', 'Unchanged sign reversed'], e: 'Identical rows make the determinant zero.' },
  { q: 'A square matrix with Aᵗ = −A is called:', a: 'Skew-symmetric', w: ['Symmetric', 'Hermitian', 'Orthogonal'], e: 'Aᵗ = −A defines a skew-symmetric matrix; its diagonal entries are 0.' },
  { q: 'If A is 3×3 and |A| = k, then |2A| equals:', a: '8k', w: ['2k', '6k', '4k'], e: '|cA| = cⁿ|A| for an n×n matrix: 2³k = 8k.' },
  { q: 'Interchanging two rows of a determinant:', a: 'Changes its sign', w: ['Leaves it unchanged', 'Makes it zero', 'Doubles it'], e: 'Each row interchange multiplies the determinant by −1.' },
  { q: 'A system AX = B has a unique solution when:', a: '|A| ≠ 0', w: ['|A| = 0', 'B = 0', 'A is skew-symmetric'], e: 'Non-singular A gives X = A⁻¹B uniquely.' },
];
const matGens = [
  (r) => { const a = r.int(-5, 7), b = r.int(-5, 7), c = r.int(-5, 7), d = r.int(-5, 7); const det = a * d - b * c;
    return m2(r, { q: `det [[${a}, ${b}], [${c}, ${d}]] = ?`, correct: det, wrong: [a * d + b * c, a * b - c * d, -det === det ? det + 2 : -det], extraWrong: near(r, det), expl: `ad − bc = (${a})(${d}) − (${b})(${c}) = ${det}.` }); },
  (r) => { const b = r.int(1, 6), c = r.int(1, 6); const k = b * c; // [[k? ,b],[c,1]] singular when k = bc
    return m2(r, { q: `For what value of k is the matrix [[k, ${b}], [${c}, 1]] singular?`, correct: k, wrong: [b + c, -k, k + 1], extraWrong: near(r, k), expl: `Singular ⇒ det = k·1 − ${b}·${c} = 0 ⇒ k = ${k}.` }); },
  (r) => { const A = [[r.int(0, 4), r.int(-2, 4)], [r.int(-2, 3), r.int(0, 4)]]; const B = [[r.int(-2, 4), r.int(0, 3)], [r.int(0, 4), r.int(-2, 3)]];
    const e11 = A[0][0] * B[0][0] + A[0][1] * B[1][0];
    return m2(r, { q: `If A = [[${A[0]}], [${A[1]}]] and B = [[${B[0]}], [${B[1]}]], the (1,1) entry of AB is:`, correct: e11, wrong: [A[0][0] * B[0][0], A[0][0] * B[0][0] + A[1][0] * B[0][1], A[0][0] + B[0][0]], extraWrong: near(r, e11), expl: `Row 1 of A · column 1 of B = ${A[0][0]}·${B[0][0]} + ${A[0][1]}·${B[1][0]} = ${e11}.` }); },
  (r) => { const a = r.int(1, 4), b = r.int(0, 3), c = r.int(1, 4), d = r.int(0, 3), e = r.int(1, 4), f = r.int(0, 3);
    // upper triangular-ish: [[a,b,c],[0,d+1,e],[0,0,f+1]]
    const det = a * (d + 1) * (f + 1);
    return m2(r, { q: `det [[${a}, ${b}, ${c}], [0, ${d + 1}, ${e}], [0, 0, ${f + 1}]] = ?`, correct: det, wrong: [a + d + f + 2, det + b * c, a * (d + 1)], extraWrong: near(r, det), expl: `For a triangular matrix the determinant is the product of diagonal entries: ${a}·${d + 1}·${f + 1} = ${det}.` }); },
  (r) => { const [a, b, c, d] = r.pick([[2, 1, 5, 3], [3, 1, 5, 2], [4, 3, 1, 1], [2, 3, 1, 2], [5, 2, 2, 1]]); const det = a * d - b * c;
    const f = (w, x, y, z) => `[[${w}, ${x}], [${y}, ${z}]]`;
    return m2(r, { q: `The inverse of [[${a}, ${b}], [${c}, ${d}]] is:`, correct: f(d / det, -b / det, -c / det, a / det), wrong: [f(d, b, c, a), f(a, b, c, d), f(-d, b, c, -a), f(d, -c, -b, a), f(a, -b, -c, d)], expl: `A⁻¹ = (1/|A|)·adj A, with |A| = ${det}; adj A = [[${d}, ${-b}], [${-c}, ${a}]].` }); },
  (r) => p2(r, r.pick(matPool)),
  (r) => p2(r, r.pick(matPool)),
];

// ---------- 3. Quadratic Equations ----------
const T3 = 'Quadratic Equations';
const m3 = mk(T3), p3 = P(T3);
const quadPool = [
  { q: 'The roots of ax² + bx + c = 0 are real and equal when:', a: 'b² − 4ac = 0', w: ['b² − 4ac > 0', 'b² − 4ac < 0', 'b = 0'], e: 'A zero discriminant gives a repeated real root.' },
  { q: 'The cube roots of unity are 1, ω, ω². What is 1 + ω + ω²?', a: '0', w: ['1', '3', '−1'], e: 'The sum of the cube roots of unity is zero.' },
  { q: 'ω³ (ω a complex cube root of unity) equals:', a: '1', w: ['ω', '−1', '0'], e: 'By definition ω³ = 1.' },
  { q: 'If the discriminant of a quadratic with rational coefficients is a perfect square, the roots are:', a: 'Rational', w: ['Irrational', 'Imaginary', 'Equal'], e: 'A perfect-square discriminant gives rational roots.' },
  { q: 'An equation that remains unchanged when x is replaced by 1/x is called:', a: 'A reciprocal equation', w: ['An exponential equation', 'A radical equation', 'A linear equation'], e: 'That is the definition of a reciprocal equation.' },
];
const quadGens = [
  (r) => { const a = r.nonzero(-6, 6), b = r.nonzero(-6, 6); const S1 = a + b, Pd = a * b;
    return m3(r, { q: `The sum of the roots of x² ${S1 >= 0 ? '−' : '+'} ${Math.abs(S1)}x ${Pd >= 0 ? '+' : '−'} ${Math.abs(Pd)} = 0 is:`, correct: S1, wrong: [-S1 === S1 ? S1 + 1 : -S1, Pd, -Pd === Pd ? Pd + 2 : -Pd], extraWrong: near(r, S1), expl: `Sum of roots = −b/a = ${S1}.` }); },
  (r) => { const a = r.int(2, 5), b = r.int(-9, 9), c = r.nonzero(-12, 12);
    return m3(r, { q: `The product of the roots of ${a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0 is:`, correct: frac(c, a), wrong: [frac(-c, a), frac(-b, a), frac(b, a) === frac(c, a) ? frac(a, c) : frac(b, a), frac(a, c)], expl: `Product of roots = c/a = ${frac(c, a)}.` }); },
  (r) => { const a = r.int(1, 4), b = r.int(-8, 8), c = r.int(-6, 9); const D = b * b - 4 * a * c;
    const nat = D > 0 ? (Number.isInteger(Math.sqrt(D)) ? 'Real, rational and unequal' : 'Real, irrational and unequal') : D === 0 ? 'Real and equal' : 'Complex (imaginary)';
    const all = ['Real, rational and unequal', 'Real, irrational and unequal', 'Real and equal', 'Complex (imaginary)'];
    return m3(r, { q: `The roots of ${a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0 are:`, correct: nat, wrong: all.filter(x => x !== nat), expl: `Discriminant b² − 4ac = ${b * b} − ${4 * a * c} = ${D}.` }); },
  (r) => { const a = r.nonzero(-5, 6); let b = r.nonzero(-5, 6); if (a + b === 0) b = b === 6 ? 5 : b + 1; if (b === 0) b = 2; const S1 = a + b, Pd = a * b;
    const eq = (s, p) => `x² ${s >= 0 ? '−' : '+'} ${Math.abs(s)}x ${p >= 0 ? '+' : '−'} ${Math.abs(p)} = 0`;
    return m3(r, { q: `The quadratic equation whose roots are ${a} and ${b} is:`, correct: eq(S1, Pd), wrong: [eq(-S1, Pd), eq(S1, -Pd), eq(-S1, -Pd)], expl: `x² − (sum)x + product = 0, sum = ${S1}, product = ${Pd}.` }); },
  (r) => { const a = r.nonzero(-4, 5), b = r.nonzero(-4, 5); const S1 = a + b, Pd = a * b; const ans = S1 * S1 - 2 * Pd;
    return m3(r, { q: `If α and β are roots of x² ${S1 >= 0 ? '−' : '+'} ${Math.abs(S1)}x ${Pd >= 0 ? '+' : '−'} ${Math.abs(Pd)} = 0, then α² + β² = ?`, correct: ans, wrong: [S1 * S1, S1 * S1 + 2 * Pd, ans + 4], extraWrong: near(r, ans), expl: `α² + β² = (α+β)² − 2αβ = ${S1 * S1} − ${2 * Pd} = ${ans}.` }); },
  (r) => { const k2 = r.int(2, 8); const k = 2 * k2; // x² + kx + k2² = 0 equal roots
    return m3(r, { q: `For what positive value of k does x² + kx + ${k2 * k2} = 0 have equal roots?`, correct: k, wrong: [k2, k2 * k2, k + 2], expl: `Equal roots ⇒ k² − 4·${k2 * k2} = 0 ⇒ k = ${k}.` }); },
  (r) => p3(r, r.pick(quadPool)),
];

// ---------- 4. Sequences & Series ----------
const T4 = 'Sequences & Series';
const m4 = mk(T4), p4 = P(T4);
const seqPool = [
  { q: 'For two positive unequal numbers, which is true of A (AM), G (GM) and H (HM)?', a: 'A > G > H', w: ['H > G > A', 'G > A > H', 'A = G = H'], e: 'For distinct positive numbers AM > GM > HM.' },
  { q: 'For two positive numbers, G² equals:', a: 'A × H', w: ['A + H', 'A − H', 'A/H'], e: 'The GM is the geometric mean of the AM and HM: G² = AH.' },
  { q: 'An infinite geometric series a + ar + ar² + … converges when:', a: '|r| < 1', w: ['|r| > 1', 'r = 1', 'r = −1'], e: 'Its sum a/(1 − r) exists only for |r| < 1.' },
  { q: 'The reciprocals of the terms of an arithmetic progression form:', a: 'A harmonic progression', w: ['A geometric progression', 'An arithmetic progression', 'A constant sequence'], e: 'That is the definition of an HP.' },
];
const seqGens = [
  (r) => { const a = r.int(-5, 10), d = r.nonzero(-4, 6), n = r.int(8, 30); const t = a + (n - 1) * d;
    return m4(r, { q: `The ${n}th term of the A.P. ${a}, ${a + d}, ${a + 2 * d}, … is:`, correct: t, wrong: [a + n * d, t - d === a + n * d ? t + 2 * d : t - d, a * n], extraWrong: near(r, t), expl: `aₙ = a + (n − 1)d = ${a} + ${n - 1}(${d}) = ${t}.` }); },
  (r) => { const a = r.int(1, 9), d = r.int(1, 6), n = r.int(10, 25); const s = n * (2 * a + (n - 1) * d) / 2;
    return m4(r, { q: `The sum of the first ${n} terms of the A.P. ${a}, ${a + d}, ${a + 2 * d}, … is:`, correct: s, wrong: [n * (a + (n - 1) * d), s + n * d, (n * (2 * a + n * d)) / 2], extraWrong: near(r, s), expl: `Sₙ = n/2 [2a + (n − 1)d] = ${n}/2 [${2 * a} + ${(n - 1) * d}] = ${s}.` }); },
  (r) => { const a = r.int(1, 5), rr = r.pick([2, 3, -2]), n = r.int(4, 7); const t = a * rr ** (n - 1);
    return m4(r, { q: `The ${n}th term of the G.P. ${a}, ${a * rr}, ${a * rr * rr}, … is:`, correct: t, wrong: [a * rr ** n, a * rr ** (n - 2), a * rr * n], extraWrong: near(r, t), expl: `aₙ = a·rⁿ⁻¹ = ${a}·(${rr})^${n - 1} = ${t}.` }); },
  (r) => { const a = r.int(1, 12), [p, q] = r.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [-1, 2]]); const s = frac(a * q, q - p);
    return m4(r, { q: `The sum of the infinite G.P. ${a} + ${a}(${frac(p, q)}) + ${a}(${frac(p, q)})² + … is:`, correct: s, wrong: [frac(a * q, q + p), frac(a * p, q), frac(a * (q - p), q)], expl: `S∞ = a/(1 − r) = ${a}/(1 − ${frac(p, q)}) = ${s}.` }); },
  (r) => { const [a, b] = r.pick([[2, 8], [4, 9], [1, 16], [3, 27], [4, 16], [2, 18], [9, 16]]); const A = (a + b) / 2, G = Math.sqrt(a * b), H = frac(2 * a * b, a + b);
    const which = r.pick(['A', 'G', 'H']);
    const vals = { A: fmt(A), G: fmt(G), H };
    return m4(r, { q: `The ${{ A: 'arithmetic', G: 'geometric', H: 'harmonic' }[which]} mean between ${a} and ${b} is:`, correct: vals[which], wrong: Object.values(vals).filter(v => v !== vals[which]).concat([fmt(a + b)]), expl: `AM = (a+b)/2 = ${fmt(A)}, GM = √(ab) = ${fmt(G)}, HM = 2ab/(a+b) = ${H}.` }); },
  (r) => p4(r, r.pick(seqPool)),
];

// ---------- 5. Permutations, Combinations & Probability ----------
const T5 = 'Permutations, Combinations & Probability';
const m5 = mk(T5), p5 = P(T5);
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const nPr = (n, k) => fact(n) / fact(n - k), nCr = (n, k) => fact(n) / (fact(k) * fact(n - k));
const pcPool = [
  { q: 'Two events A and B are mutually exclusive. Then P(A ∪ B) equals:', a: 'P(A) + P(B)', w: ['P(A)·P(B)', 'P(A) + P(B) − P(A)P(B)', '1'], e: 'For mutually exclusive events P(A ∩ B) = 0.' },
  { q: 'For independent events A and B, P(A ∩ B) equals:', a: 'P(A)·P(B)', w: ['P(A) + P(B)', 'P(A)/P(B)', '0'], e: 'That is the definition of independence.' },
  { q: 'ⁿCᵣ is equal to:', a: 'ⁿCₙ₋ᵣ', w: ['ⁿPᵣ', 'ⁿCᵣ₊₁', 'r!·ⁿPᵣ'], e: 'Choosing r items is the same as leaving out n − r items.' },
  { q: 'The probability of an impossible event is:', a: '0', w: ['1', '0.5', '−1'], e: 'Probabilities lie in [0, 1]; an impossible event has probability 0.' },
  { q: '0! is defined as:', a: '1', w: ['0', 'Undefined', '∞'], e: 'By convention 0! = 1.' },
];
const pcGens = [
  (r) => { const n = r.int(5, 10), k = r.int(2, 4);
    return m5(r, { q: `The value of ${n}P${k} is:`, correct: nPr(n, k), wrong: [nCr(n, k), nPr(n, k - 1), n * k], extraWrong: near(r, nPr(n, k)), expl: `ⁿPᵣ = n!/(n − r)! = ${nPr(n, k)}.` }); },
  (r) => { const n = r.int(6, 12), k = r.int(2, 4);
    return m5(r, { q: `In how many ways can a committee of ${k} be chosen from ${n} people?`, correct: nCr(n, k), wrong: [nPr(n, k), nCr(n, k - 1), n * k], extraWrong: near(r, nCr(n, k)), expl: `Order does not matter: ${n}C${k} = ${nCr(n, k)}.` }); },
  (r) => { const w = r.pick([['LETTER', [2, 2]], ['BALLOON', [2, 2]], ['COMMITTEE', [2, 2, 2]], ['SUCCESS', [3, 2]], ['APPLE', [2]], ['BANANA', [3, 2]], ['PAKISTAN', [2]]]);
    const n = w[0].length; const den = w[1].reduce((s, x) => s * fact(x), 1); const ans = fact(n) / den;
    return m5(r, { q: `The number of distinct arrangements of the letters of the word ${w[0]} is:`, correct: ans, wrong: [fact(n), ans * 2, ans / 2 === Math.floor(ans / 2) ? ans / 2 : ans + 10], expl: `${n}! divided by the factorials of repeated letters = ${fact(n)}/${den} = ${ans}.` }); },
  (r) => { const n = r.int(5, 8);
    return m5(r, { q: `In how many ways can ${n} people be seated around a round table?`, correct: fact(n - 1), wrong: [fact(n), fact(n - 1) / 2, fact(n - 2)], expl: `Circular arrangements of n distinct objects: (n − 1)! = ${fact(n - 1)}.` }); },
  (r) => { const s = r.int(4, 10); let cnt = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) cnt++;
    return m5(r, { q: `Two fair dice are thrown. The probability that the sum is ${s} is:`, correct: frac(cnt, 36), wrong: [frac(cnt + 1, 36), frac(1, 6), frac(cnt, 12) === frac(cnt, 36) ? '1/2' : frac(cnt, 12), frac(Math.max(1, cnt - 1), 36)], expl: `${cnt} favourable outcomes out of 36.` }); },
  (r) => { const c = r.pick([['a king', 4], ['a heart', 13], ['a red card', 26], ['a face card', 12], ['an ace or a king', 8], ['a black queen', 2]]);
    return m5(r, { q: `A card is drawn from a well-shuffled deck of 52. The probability that it is ${c[0]} is:`, correct: frac(c[1], 52), wrong: [frac(c[1] + 1, 52), frac(1, c[1] + 1), frac(c[1], 26) === frac(c[1], 52) ? '1/3' : frac(c[1], 26), '1/52'], expl: `${c[1]} favourable cards out of 52 = ${frac(c[1], 52)}.` }); },
  (r) => p5(r, r.pick(pcPool)),
];

// ---------- 6. Induction & Binomial ----------
const T6 = 'Mathematical Induction & Binomial Theorem';
const m6 = mk(T6), p6 = P(T6);
const binPool = [
  { q: 'Mathematical induction is used to prove statements that hold for:', a: 'All natural numbers n (from a starting value)', w: ['All real numbers', 'Only even numbers', 'Only one particular n'], e: 'Induction proves P(n) for every natural n ≥ n₀.' },
  { q: 'The first step in a proof by mathematical induction is to:', a: 'Verify the statement for the initial value of n', w: ['Assume it for n = k', 'Prove it for n = k + 1', 'Differentiate both sides'], e: 'Base case first, then the inductive step.' },
  { q: 'In the expansion of (a + b)ⁿ, the sum of the binomial coefficients is:', a: '2ⁿ', w: ['n²', 'n!', '2n'], e: 'Put a = b = 1.' },
  { q: 'The sum of the odd-position binomial coefficients in (1 + x)ⁿ equals:', a: '2ⁿ⁻¹', w: ['2ⁿ', 'n', '2ⁿ⁺¹'], e: 'Odd- and even-position coefficients each sum to 2ⁿ⁻¹.' },
  { q: 'The binomial series (1 + x)ⁿ for negative or fractional n is valid when:', a: '|x| < 1', w: ['|x| > 1', 'x = 1', 'x is any real number'], e: 'The infinite binomial series converges for |x| < 1.' },
];
const binGens = [
  (r) => { const n = r.int(5, 15);
    return m6(r, { q: `The number of terms in the expansion of (a + b)^${n} is:`, correct: n + 1, wrong: [n, n + 2, 2 * n], expl: `(a + b)ⁿ has n + 1 terms.` }); },
  (r) => { const n = r.int(4, 8), k = r.int(1, n - 1), a = r.int(1, 3); const c = nCr(n, k) * a ** (n - k);
    return m6(r, { q: `The coefficient of x^${k} in (x + ${a})^${n} is:`, correct: c, wrong: [nCr(n, k), nCr(n, k) * a ** k === c ? c + nCr(n, k) : nCr(n, k) * a ** k, nCr(n, k - 1) * a ** (n - k + 1)], extraWrong: near(r, c), expl: `Term: ${n}C${k} x^${k} · ${a}^${n - k} ⇒ coefficient ${nCr(n, k)}·${a ** (n - k)} = ${c}.` }); },
  (r) => { const n = 2 * r.int(2, 6);
    return m6(r, { q: `In the expansion of (x + y)^${n}, the middle term is the:`, correct: `${n / 2 + 1}th term`, wrong: [`${n / 2}th term`, `${n / 2 + 2}th term`, `${n}th term`], expl: `For even n there is one middle term: (n/2 + 1)th.` }); },
  (r) => { const n = r.int(4, 10);
    return m6(r, { q: `The sum of the coefficients in the expansion of (1 + x)^${n} is:`, correct: 2 ** n, wrong: [n * n, 2 ** (n - 1), n + 1], expl: `Put x = 1: 2^${n} = ${2 ** n}.` }); },
  (r) => { const n = r.int(5, 9), k = r.int(2, 4);
    return m6(r, { q: `The (${k + 1})th term of (1 + x)^${n} is:`, correct: `${nCr(n, k)}x^${k}`, wrong: [`${nCr(n, k + 1)}x^${k + 1}`, `${nCr(n, k - 1)}x^${k - 1}`, `${nCr(n, k)}x^${k + 1}`], expl: `T(r+1) = ⁿCᵣ xʳ with r = ${k}.` }); },
  (r) => p6(r, r.pick(binPool)),
];

// ---------- 7. Trigonometry ----------
const T7 = 'Trigonometry';
const m7 = mk(T7), p7 = P(T7);
const trigVals = [['sin 30°', '1/2'], ['cos 60°', '1/2'], ['tan 45°', '1'], ['sin 90°', '1'], ['cos 0°', '1'], ['sin 60°', '√3/2'], ['cos 30°', '√3/2'], ['tan 60°', '√3'], ['tan 30°', '1/√3'], ['sin 45°', '1/√2'], ['cos 90°', '0'], ['sin 180°', '0'], ['cos 180°', '−1'], ['sin 270°', '−1'], ['cos 120°', '−1/2'], ['sin 150°', '1/2'], ['tan 135°', '−1'], ['sin 210°', '−1/2']];
const trigPool = [
  { q: 'sin²θ + cos²θ equals:', a: '1', w: ['0', '2', 'tan²θ'], e: 'Fundamental Pythagorean identity.' },
  { q: '1 + tan²θ equals:', a: 'sec²θ', w: ['cosec²θ', 'cot²θ', '1'], e: 'Divide sin²θ + cos²θ = 1 by cos²θ.' },
  { q: 'sin 2θ equals:', a: '2 sinθ cosθ', w: ['sin²θ − cos²θ', '2 sinθ', 'cos²θ − sin²θ'], e: 'Double-angle formula.' },
  { q: 'cos 2θ is NOT equal to:', a: '2 sinθ cosθ', w: ['cos²θ − sin²θ', '1 − 2sin²θ', '2cos²θ − 1'], e: 'The other three are all valid forms of cos 2θ.' },
  { q: 'The principal value of sin⁻¹(1/2) is:', a: 'π/6', w: ['π/3', '5π/6', 'π/4'], e: 'sin(π/6) = 1/2 and π/6 lies in [−π/2, π/2].' },
  { q: 'The principal value of cos⁻¹(−1/2) is:', a: '2π/3', w: ['π/3', '−π/3', '4π/3'], e: 'Range of cos⁻¹ is [0, π]; cos(2π/3) = −1/2.' },
  { q: 'tan⁻¹ x + cot⁻¹ x equals:', a: 'π/2', w: ['π', '0', 'π/4'], e: 'Standard inverse-trig identity.' },
  { q: 'In any triangle ABC, a/sin A equals:', a: 'b/sin B', w: ['b/cos B', 'sin B/b', 'a/cos A'], e: 'Law of sines.' },
  { q: 'The radius of the circle passing through the vertices of a triangle is called the:', a: 'Circum-radius', w: ['In-radius', 'Ex-radius', 'Median'], e: 'R = abc/(4Δ).' },
  { q: 'sin(α + β) equals:', a: 'sinα cosβ + cosα sinβ', w: ['sinα cosβ − cosα sinβ', 'cosα cosβ − sinα sinβ', 'sinα + sinβ'], e: 'Addition formula.' },
  { q: '1 radian is approximately:', a: '57.3°', w: ['1°', '3.14°', '90°'], e: '180°/π ≈ 57.3°.' },
];
const trigGens = [
  (r) => { const [t, v] = r.pick(trigVals); const others = ['0', '1', '−1', '1/2', '√3/2', '1/√2', '√3', '−1/2'].filter(x => x !== v);
    return m7(r, { q: `${t} = ?`, correct: v, wrong: r.shuffle(others), expl: `Standard value: ${t} = ${v}.` }); },
  (r) => { const k = r.int(2, 6); const f = r.pick(['sin', 'cos', 'tan']); const per = f === 'tan' ? (k === 1 ? 'π' : `π/${k}`) : frac(2, k) === '1' ? 'π' : `${frac(2, k).replace('/', 'π/').replace(/^1π/, 'π')}`;
    const fixPer = (num, den) => { const g = gcd(num, den); num /= g; den /= g; return `${num === 1 ? '' : num}π${den === 1 ? '' : '/' + den}`; };
    const ans = f === 'tan' ? fixPer(1, k) : fixPer(2, k);
    return m7(r, { q: `The period of ${f}(${k}x) is:`, correct: ans, wrong: [fixPer(2 * k, 1), fixPer(1, 2 * k), f === 'tan' ? fixPer(2, k) : fixPer(1, k)], expl: `Period of ${f} is ${f === 'tan' ? 'π' : '2π'}; dividing by ${k} gives ${ans}.` }); },
  (r) => { const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
    const which = r.pick(['sin2', 'cos2', 'tan']);
    const sin = frac(a, c), cos = frac(b, c);
    const ans = which === 'sin2' ? frac(2 * a * b, c * c) : which === 'cos2' ? frac(b * b - a * a, c * c) : frac(a, b);
    const qtxt = { sin2: 'sin 2θ', cos2: 'cos 2θ', tan: 'tan θ' }[which];
    return m7(r, { q: `If sin θ = ${sin} and θ is acute, then ${qtxt} = ?`, correct: ans, wrong: [frac(2 * a, c), frac(b, a), frac(a * a + b * b, c * c) === ans ? frac(a, c) : frac(c, b), frac(2 * a * b, c)], expl: `cos θ = ${cos}. sin2θ = 2sinθcosθ, cos2θ = cos²θ − sin²θ, tanθ = sinθ/cosθ.` }); },
  (r) => { const a = r.int(3, 9), b = r.int(3, 9), C = r.pick([30, 90, 150]); const area = C === 90 ? (a * b) / 2 : (a * b) / 4;
    return m7(r, { q: `In triangle ABC, a = ${a}, b = ${b} and ∠C = ${C}°. Its area is:`, correct: fmt(area), wrong: [fmt(a * b), fmt(area * 2), fmt(a + b)], expl: `Area = ½ab sin C = ½·${a}·${b}·${C === 90 ? 1 : '½'} = ${fmt(area)}.` }); },
  (r) => { const a = r.int(2, 8), b = r.int(2, 8); const c2 = a * a + b * b - a * b; // C = 60°
    return m7(r, { q: `In triangle ABC, a = ${a}, b = ${b}, ∠C = 60°. Then c² = ?`, correct: c2, wrong: [a * a + b * b, a * a + b * b + a * b, c2 - a * b], extraWrong: near(r, c2), expl: `Law of cosines: c² = a² + b² − 2ab cos60° = ${a * a} + ${b * b} − ${a * b} = ${c2}.` }); },
  (r) => { const deg = r.pick([30, 45, 60, 90, 120, 135, 150, 180, 270, 210, 240, 300, 360]);
    const rad = (() => { const g = gcd(deg, 180); const n = deg / g, d = 180 / g; return `${n === 1 ? '' : n}π${d === 1 ? '' : '/' + d}`; })();
    const alt = (dd) => { const g = gcd(dd, 180); const n = dd / g, d = 180 / g; return `${n === 1 ? '' : n}π${d === 1 ? '' : '/' + d}`; };
    return m7(r, { q: `${deg}° in radians is:`, correct: rad, wrong: [alt(deg + 30), alt(Math.max(15, deg - 15)), alt(deg * 2)], extraWrong: () => alt(r.pick([15, 45, 75, 105, 225, 315, 330])), expl: `Multiply by π/180.` }); },
  (r) => p7(r, r.pick(trigPool)),
  (r) => p7(r, r.pick(trigPool)),
];

// ---------- 8. Functions & Graphs ----------
const T8 = 'Functions & Graphs';
const m8 = mk(T8), p8 = P(T8);
const funcPool = [
  { q: 'A function f is even if:', a: 'f(−x) = f(x)', w: ['f(−x) = −f(x)', 'f(x) = 0', 'f(x + 1) = f(x)'], e: 'Even functions are symmetric about the y-axis.' },
  { q: 'Which function is odd?', a: 'f(x) = x³', w: ['f(x) = x²', 'f(x) = cos x', 'f(x) = |x|'], e: '(−x)³ = −x³.' },
  { q: 'The graph of y = f(x) + 3 is the graph of y = f(x):', a: 'Shifted 3 units up', w: ['Shifted 3 units right', 'Shifted 3 units left', 'Stretched 3 times'], e: 'Adding a constant outside shifts vertically.' },
  { q: 'The graph of y = f(x − 2) is the graph of y = f(x):', a: 'Shifted 2 units right', w: ['Shifted 2 units left', 'Shifted 2 units down', 'Reflected in the x-axis'], e: 'Replacing x by x − h shifts right by h.' },
  { q: 'A function has an inverse only if it is:', a: 'One-to-one (bijective onto its range)', w: ['Even', 'Constant', 'Periodic'], e: 'Each output must come from exactly one input.' },
  { q: 'The domain of f(x) = ln x is:', a: 'x > 0', w: ['x ≥ 0', 'All real x', 'x < 0'], e: 'The logarithm is defined only for positive arguments.' },
  { q: 'The range of f(x) = sin x is:', a: '[−1, 1]', w: ['All real numbers', '[0, 1]', '(−1, 1)'], e: 'sin x oscillates between −1 and 1 inclusive.' },
];
const funcGens = [
  (r) => { const a = r.nonzero(-4, 5), b = r.int(-6, 6), c = r.nonzero(-4, 5), d = r.int(-6, 6); // f(x)=ax+b, g(x)=cx+d -> f(g(x))
    const A = a * c, B = a * d + b; const lin = (m, k) => `${m === 1 ? '' : m === -1 ? '−' : m}x ${k < 0 ? '−' : '+'} ${Math.abs(k)}`.replace(/^-/, '−');
    return m8(r, { q: `If f(x) = ${lin(a, b)} and g(x) = ${lin(c, d)}, then f(g(x)) = ?`, correct: lin(A, B), wrong: [lin(A, c * b + d) === lin(A, B) ? lin(A, B + 1) : lin(A, c * b + d), lin(a + c, b + d), lin(A, b + d) === lin(A, B) ? lin(A, B - 2) : lin(A, b + d)], extraWrong: () => lin(A, B + r.nonzero(-5, 5)), expl: `f(g(x)) = ${a}(${lin(c, d)}) ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${lin(A, B)}.` }); },
  (r) => { const a = r.pick([2, 3, 4, 5]), b = r.int(1, 9);
    return m8(r, { q: `The inverse of f(x) = ${a}x + ${b} is:`, correct: `(x − ${b})/${a}`, wrong: [`(x + ${b})/${a}`, `${a}x − ${b}`, `1/(${a}x + ${b})`], expl: `y = ${a}x + ${b} ⇒ x = (y − ${b})/${a}.` }); },
  (r) => { const a = r.int(1, 9);
    const t = r.pick([{ q: `√(x − ${a})`, a: `x ≥ ${a}`, w: [`x > ${a}`, `x ≤ ${a}`, 'All real x'] }, { q: `1/(x − ${a})`, a: `All real x except ${a}`, w: [`x > ${a}`, 'All real x', `x ≥ ${a}`] }, { q: `√(${a * a} − x²)`, a: `−${a} ≤ x ≤ ${a}`, w: [`x ≥ ${a}`, `−${a} < x < ${a}`, 'All real x'] }]);
    return m8(r, { q: `The domain of f(x) = ${t.q} is:`, correct: t.a, wrong: t.w, expl: 'Square roots need non-negative arguments; denominators cannot be zero.' }); },
  (r) => { const a = r.int(1, 4), b = r.int(-5, 5), c = r.int(-6, 6), x = r.int(-3, 4); const v = a * x * x + b * x + c;
    return m8(r, { q: `If f(x) = ${a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)}, then f(${x}) = ?`, correct: v, wrong: [v + 2 * b * x !== v ? v - 2 * b * x : v + 3, a * x * x + c, v + a], extraWrong: near(r, v), expl: `Substitute x = ${x}: ${a}(${x * x}) ${b < 0 ? '−' : '+'} ${Math.abs(b * x)} ${c < 0 ? '−' : '+'} ${Math.abs(c)} = ${v}.` }); },
  (r) => p8(r, r.pick(funcPool)),
  (r) => p8(r, r.pick(funcPool)),
];

// ---------- 9. Differential Calculus ----------
const T9 = 'Differential Calculus';
const m9 = mk(T9), p9 = P(T9);
const diffPool = [
  { q: 'lim (x→0) (sin x)/x equals:', a: '1', w: ['0', '∞', 'Does not exist'], e: 'Standard limit (x in radians).' },
  { q: 'lim (x→∞) (1 + 1/x)ˣ equals:', a: 'e', w: ['1', '∞', '0'], e: 'Definition of e.' },
  { q: 'd/dx (eˣ) equals:', a: 'eˣ', w: ['x eˣ⁻¹', 'eˣ⁻¹', 'ln x'], e: 'eˣ is its own derivative.' },
  { q: 'd/dx (ln x) equals:', a: '1/x', w: ['ln x', 'x', 'eˣ'], e: 'Standard derivative, x > 0.' },
  { q: 'd/dx (tan x) equals:', a: 'sec²x', w: ['cot x', '−cosec²x', 'sec x tan x'], e: 'Standard derivative.' },
  { q: 'd/dx (cos x) equals:', a: '−sin x', w: ['sin x', '−cos x', 'sec x'], e: 'Standard derivative.' },
  { q: 'If f′(c) = 0 and f″(c) < 0, then f has at x = c a:', a: 'Relative maximum', w: ['Relative minimum', 'Point of inflection', 'Discontinuity'], e: 'Second-derivative test.' },
  { q: 'd/dx (sin⁻¹ x) equals:', a: '1/√(1 − x²)', w: ['−1/√(1 − x²)', '1/(1 + x²)', 'cos⁻¹ x'], e: 'Standard derivative of inverse sine.' },
  { q: 'A function differentiable at x = a must be:', a: 'Continuous at x = a', w: ['Discontinuous at x = a', 'Zero at x = a', 'Increasing at x = a'], e: 'Differentiability implies continuity (not conversely).' },
];
const diffGens = [
  (r) => { const a = r.int(1, 5), n = r.int(2, 5), b = r.int(-6, 6), x = r.int(1, 3); const v = a * n * x ** (n - 1) + b;
    return m9(r, { q: `If y = ${a}x^${n} ${b < 0 ? '−' : '+'} ${Math.abs(b)}x, then dy/dx at x = ${x} is:`, correct: v, wrong: [a * x ** n + b * x, a * n * x ** n + b, v + a], extraWrong: near(r, v), expl: `dy/dx = ${a * n}x^${n - 1} ${b < 0 ? '−' : '+'} ${Math.abs(b)} ⇒ at x = ${x}: ${v}.` }); },
  (r) => { const k = r.int(2, 9); const f = r.pick(['sin', 'cos']);
    const ans = f === 'sin' ? `${k} cos ${k}x` : `−${k} sin ${k}x`;
    return m9(r, { q: `d/dx [${f} ${k}x] = ?`, correct: ans, wrong: [f === 'sin' ? `cos ${k}x` : `${k} sin ${k}x`, f === 'sin' ? `−${k} cos ${k}x` : `−sin ${k}x`, f === 'sin' ? `${k} sin ${k}x` : `${k} cos ${k}x`], expl: 'Chain rule: multiply by the derivative of the inner function.' }); },
  (r) => { const a = r.int(2, 9), b = r.pick([1, 2, 3, 4, 5]);
    return m9(r, { q: `lim (x→0) sin(${a}x)/(${b}x) = ?`, correct: frac(a, b), wrong: [frac(b, a) === frac(a, b) ? '0' : frac(b, a), '1', String(a * b)], expl: `= (${a}/${b})·lim sin(${a}x)/(${a}x) = ${frac(a, b)}.` }); },
  (r) => { const a = r.int(2, 9);
    return m9(r, { q: `lim (x→${a}) (x² − ${a * a})/(x − ${a}) = ?`, correct: 2 * a, wrong: [a, 0, a * a], expl: `Factor: (x − ${a})(x + ${a})/(x − ${a}) → ${2 * a}.` }); },
  (r) => { const a = r.pick([1, 2, 3]), h = r.int(-4, 5), k = r.int(-5, 8); // y = -a(x-h)^2 + k max value k at x=h
    const b = 2 * a * h, c = k - a * h * h;
    return m9(r, { q: `The maximum value of y = −${a === 1 ? '' : a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)} is:`, correct: k, wrong: [h, c, k + a], extraWrong: near(r, k), expl: `dy/dx = 0 at x = ${h}; y(${h}) = ${k}. Since y″ < 0 it is a maximum.` }); },
  (r) => { const k = r.int(2, 7);
    return m9(r, { q: `d/dx [e^(${k}x)] = ?`, correct: `${k}e^(${k}x)`, wrong: [`e^(${k}x)`, `${k}x e^(${k}x − 1)`, `e^(${k}x)/${k}`], expl: 'Chain rule.' }); },
  (r) => { const a = r.int(1, 4), b = r.int(-4, 4), x0 = r.int(-2, 3); const m = 2 * a * x0 + b;
    return m9(r, { q: `The slope of the tangent to y = ${a}x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x at x = ${x0} is:`, correct: m, wrong: [a * x0 * x0 + b * x0, m + 2, -m === m ? m - 3 : -m], extraWrong: near(r, m), expl: `Slope = dy/dx = ${2 * a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${m} at x = ${x0}.` }); },
  (r) => p9(r, r.pick(diffPool)),
  (r) => p9(r, r.pick(diffPool)),
];

// ---------- 10. Integral Calculus ----------
const T10 = 'Integral Calculus';
const m10 = mk(T10), p10 = P(T10);
const intPool = [
  { q: '∫ (1/x) dx equals:', a: 'ln|x| + c', w: ['x⁰ + c', '−1/x² + c', 'eˣ + c'], e: 'Standard integral.' },
  { q: '∫ sec²x dx equals:', a: 'tan x + c', w: ['sec x + c', '−cot x + c', 'sec x tan x + c'], e: 'Reverse of d/dx tan x = sec²x.' },
  { q: '∫ eˣ dx equals:', a: 'eˣ + c', w: ['x eˣ + c', 'eˣ⁺¹/(x + 1) + c', 'ln x + c'], e: 'Standard integral.' },
  { q: '∫ sin x dx equals:', a: '−cos x + c', w: ['cos x + c', 'sin x + c', '−sin x + c'], e: 'd/dx(−cos x) = sin x.' },
  { q: 'If f is an odd function, ∫ from −a to a of f(x) dx equals:', a: '0', w: ['2∫₀ᵃ f(x) dx', 'a', 'f(a)'], e: 'Areas above and below cancel.' },
  { q: '∫ 1/(1 + x²) dx equals:', a: 'tan⁻¹x + c', w: ['ln(1 + x²) + c', 'sin⁻¹x + c', '1/x + c'], e: 'Standard integral.' },
  { q: 'Integration by parts: ∫ u dv equals:', a: 'uv − ∫ v du', w: ['uv + ∫ v du', '∫ u du · ∫ v dv', 'u′v′'], e: 'Product-rule reversal.' },
];
const intGens = [
  (r) => { const a = r.int(1, 4), b = r.int(0, 3), n = r.int(1, 3); // ∫_0^b... use ∫_0^k (n+1) a x^n dx = a k^(n+1)
    const k = r.int(1, 3); const coef = (n + 1) * a; const v = a * k ** (n + 1);
    return m10(r, { q: `∫₀^${k} ${coef}x^${n} dx = ?`, correct: v, wrong: [coef * k ** n, v * (n + 1), v + coef], extraWrong: near(r, v), expl: `= ${a}x^${n + 1} from 0 to ${k} = ${v}.` }); },
  (r) => { const a = r.int(1, 6);
    return m10(r, { q: `The area bounded by y = x², the x-axis, x = 0 and x = ${a} is:`, correct: frac(a ** 3, 3), wrong: [frac(a ** 2, 2), String(a ** 3), frac(a ** 3, 2)], expl: `∫₀^${a} x² dx = ${a}³/3 = ${frac(a ** 3, 3)}.` }); },
  (r) => { const k = r.int(2, 7); const f = r.pick(['cos', 'sin', 'e']);
    const ans = f === 'cos' ? `(1/${k}) sin ${k}x + c` : f === 'sin' ? `−(1/${k}) cos ${k}x + c` : `(1/${k}) e^(${k}x) + c`;
    const w = f === 'cos' ? [`${k} sin ${k}x + c`, `−(1/${k}) sin ${k}x + c`, `sin ${k}x + c`] : f === 'sin' ? [`(1/${k}) cos ${k}x + c`, `−${k} cos ${k}x + c`, `cos ${k}x + c`] : [`${k}e^(${k}x) + c`, `e^(${k}x) + c`, `e^(${k}x + 1)/(${k}x + 1) + c`];
    return m10(r, { q: `∫ ${f === 'e' ? `e^(${k}x)` : `${f} ${k}x`} dx = ?`, correct: ans, wrong: w, expl: 'Divide by the coefficient of x (reverse chain rule).' }); },
  (r) => { const k = r.int(2, 6);
    return m10(r, { q: `∫₁^(e^${k}) (1/x) dx = ?`, correct: k, wrong: [`e^${k}`, k - 1, `1/${k}`], expl: `[ln x] from 1 to e^${k} = ${k} − 0 = ${k}.` }); },
  (r) => { const n = r.int(2, 7);
    return m10(r, { q: `∫ x^${n} dx = ?`, correct: `x^${n + 1}/${n + 1} + c`, wrong: [`${n}x^${n - 1} + c`, `x^${n + 1} + c`, `x^${n}/${n} + c`], expl: 'Power rule: xⁿ⁺¹/(n + 1).' }); },
  (r) => { const a = r.int(1, 5);
    return m10(r, { q: `∫₀^(π/2) ${a} cos x dx = ?`, correct: a, wrong: [0, -a, `${a}π/2`], expl: `${a}[sin x] from 0 to π/2 = ${a}.` }); },
  (r) => p10(r, r.pick(intPool)),
  (r) => p10(r, r.pick(intPool)),
];

// ---------- 11. Analytic Geometry ----------
const T11 = 'Analytic Geometry';
const m11 = mk(T11), p11 = P(T11);
const geoPool = [
  { q: 'Two non-vertical lines are perpendicular if the product of their slopes is:', a: '−1', w: ['1', '0', 'Undefined'], e: 'm₁m₂ = −1.' },
  { q: 'The eccentricity of a parabola is:', a: '1', w: ['0', 'Less than 1', 'Greater than 1'], e: 'Parabola: e = 1; ellipse: e < 1; hyperbola: e > 1.' },
  { q: 'The eccentricity of a circle is:', a: '0', w: ['1', 'Greater than 1', 'Undefined'], e: 'A circle is an ellipse with e = 0.' },
  { q: 'The conic with eccentricity greater than 1 is a/an:', a: 'Hyperbola', w: ['Ellipse', 'Parabola', 'Circle'], e: 'e > 1 defines a hyperbola.' },
  { q: 'The focus of the parabola y² = 4ax is:', a: '(a, 0)', w: ['(0, a)', '(−a, 0)', '(4a, 0)'], e: 'Standard form.' },
  { q: 'The slope of a line parallel to the x-axis is:', a: '0', w: ['1', 'Undefined', '−1'], e: 'Horizontal lines have zero slope.' },
  { q: 'The angle in a semicircle is:', a: 'A right angle', w: ['An acute angle', 'An obtuse angle', 'A straight angle'], e: 'Thales\' theorem.' },
  { q: 'The tangent to a circle at a point is ____ to the radius at that point.', a: 'Perpendicular', w: ['Parallel', 'Equal', 'Inclined at 45°'], e: 'Standard property of circles.' },
];
const geoGens = [
  (r) => { const x1 = r.int(-5, 5), y1 = r.int(-5, 5), x2 = x1 + r.nonzero(-5, 5), y2 = r.int(-6, 6);
    return m11(r, { q: `The slope of the line through (${x1}, ${y1}) and (${x2}, ${y2}) is:`, correct: frac(y2 - y1, x2 - x1), wrong: [frac(x2 - x1, (y2 - y1) || 1), frac(y1 - y2 + 1, x2 - x1), frac(y2 + y1, (x2 + x1) || 1)], extraWrong: () => frac(r.int(-9, 9), r.int(1, 5)), expl: `m = (y₂ − y₁)/(x₂ − x₁) = ${y2 - y1}/${x2 - x1}.` }); },
  (r) => { const [a, b, c] = r.pick(triples); const x1 = r.int(-4, 4), y1 = r.int(-4, 4);
    return m11(r, { q: `The distance between (${x1}, ${y1}) and (${x1 + a}, ${y1 + b}) is:`, correct: c, wrong: [a + b, c * c, Math.abs(b - a) + 1], expl: `d = √(${a}² + ${b}²) = ${c}.` }); },
  (r) => { const h = r.int(-6, 6), k = r.int(-6, 6), rad = r.int(1, 7); const c = h * h + k * k - rad * rad;
    const t = (v, s) => (v === 0 ? '' : ` ${v > 0 ? '+' : '−'} ${Math.abs(v)}${s}`);
    const eq = `x² + y²${t(-2 * h, 'x')}${t(-2 * k, 'y')}${t(c, '')} = 0`;
    return m11(r, { q: `The centre and radius of the circle ${eq} are:`, correct: `(${h}, ${k}), ${rad}`, wrong: [`(${-h}, ${-k}), ${rad}`, `(${h}, ${k}), ${rad * rad}`, `(${2 * h}, ${2 * k}), ${rad}`].filter((v, i, arr) => arr.indexOf(v) === i), extraWrong: () => `(${h + r.nonzero(-3, 3)}, ${k + r.nonzero(-3, 3)}), ${rad + r.int(0, 2)}`, expl: `Centre (−g, −f) = (${h}, ${k}); r = √(g² + f² − c) = ${rad}.` }); },
  (r) => { const a = r.int(1, 6); const four = 4 * a;
    return m11(r, { q: `The focus of the parabola y² = ${four}x is:`, correct: `(${a}, 0)`, wrong: [`(0, ${a})`, `(${four}, 0)`, `(−${a}, 0)`], expl: `y² = 4ax with a = ${a}.` }); },
  (r) => { const m = r.nonzero(-5, 5), x1 = r.int(-4, 4), y1 = r.int(-4, 4); const c = y1 - m * x1;
    const line = (mm, cc) => `y = ${mm === 1 ? '' : mm === -1 ? '−' : mm}x ${cc < 0 ? '−' : '+'} ${Math.abs(cc)}`.replace(/= -/, '= −');
    return m11(r, { q: `The line through (${x1}, ${y1}) with slope ${m} is:`, correct: line(m, c), wrong: [line(m, y1 + m * x1), line(-m, c), line(m, -c)], extraWrong: () => line(m, c + r.nonzero(-4, 4)), expl: `y − ${y1} = ${m}(x − ${x1}) ⇒ ${line(m, c)}.` }); },
  (r) => { const [a, b] = r.pick([[5, 3], [5, 4], [13, 5], [13, 12], [10, 6], [10, 8], [25, 7]]); const c = Math.sqrt(a * a - b * b);
    return m11(r, { q: `The eccentricity of the ellipse x²/${a * a} + y²/${b * b} = 1 is:`, correct: frac(c, a), wrong: [frac(b, a), frac(a, c), frac(c, b)], expl: `c = √(a² − b²) = ${c}; e = c/a = ${frac(c, a)}.` }); },
  (r) => { const [A, B, Cc] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]); const x0 = r.int(-3, 3), y0 = r.int(-3, 3), C = r.int(-10, 10); const num = Math.abs(A * x0 + B * y0 + C);
    return m11(r, { q: `The distance of the point (${x0}, ${y0}) from the line ${A}x + ${B}y ${C < 0 ? '−' : '+'} ${Math.abs(C)} = 0 is:`, correct: frac(num, Cc), wrong: [String(num), frac(num, Cc * Cc), frac(num + 1, Cc)], expl: `d = |Ax₀ + By₀ + C|/√(A² + B²) = ${num}/${Cc}.` }); },
  (r) => p11(r, r.pick(geoPool)),
  (r) => p11(r, r.pick(geoPool)),
];

// ---------- 12. Vectors ----------
const T12 = 'Vectors';
const m12 = mk(T12), p12 = P(T12);
const vecPool = [
  { q: 'If a · b = 0 for non-zero vectors a and b, then a and b are:', a: 'Perpendicular', w: ['Parallel', 'Equal', 'Anti-parallel'], e: 'cos θ = 0 ⇒ θ = 90°.' },
  { q: 'If a × b = 0 for non-zero vectors a and b, then a and b are:', a: 'Parallel', w: ['Perpendicular', 'Unit vectors', 'Coplanar but not parallel'], e: 'sin θ = 0 ⇒ θ = 0° or 180°.' },
  { q: 'î × ĵ equals:', a: 'k̂', w: ['−k̂', '0', '1'], e: 'Right-handed system: î × ĵ = k̂.' },
  { q: 'î · î equals:', a: '1', w: ['0', 'î', 'k̂'], e: 'Dot product of a unit vector with itself is 1.' },
  { q: 'a × b equals:', a: '−(b × a)', w: ['b × a', 'a · b', '0'], e: 'The cross product is anti-commutative.' },
  { q: 'The magnitude of a × b equals the area of the:', a: 'Parallelogram with adjacent sides a and b', w: ['Triangle with sides a and b', 'Square on a', 'Circle of radius |a|'], e: '|a × b| = |a||b| sin θ.' },
  { q: 'The scalar triple product a · (b × c) gives the volume of a:', a: 'Parallelepiped', w: ['Tetrahedron', 'Sphere', 'Cone'], e: 'For a tetrahedron it is one-sixth of this.' },
];
const vstr = (x, y, z) => { let s = ''; const t = (v, u) => { if (v === 0) return; s += s === '' ? `${v < 0 ? '−' : ''}${Math.abs(v) === 1 ? '' : Math.abs(v)}${u}` : ` ${v < 0 ? '−' : '+'} ${Math.abs(v) === 1 ? '' : Math.abs(v)}${u}`; }; t(x, 'î'); t(y, 'ĵ'); t(z, 'k̂'); return s || '0'; };
const vecGens = [
  (r) => { const [x, y, z, m] = r.pick([[2, 3, 6, 7], [1, 2, 2, 3], [2, 6, 9, 11], [4, 4, 7, 9], [3, 4, 12, 13], [1, 4, 8, 9]]);
    return m12(r, { q: `The magnitude of ${vstr(x, -y, z)} is:`, correct: m, wrong: [x + y + z, m * m, m + 1], expl: `√(${x}² + ${y}² + ${z}²) = √${m * m} = ${m}.` }); },
  (r) => { const a = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)], b = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)]; const d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    return m12(r, { q: `If a = ${vstr(...a)} and b = ${vstr(...b)}, then a · b = ?`, correct: d, wrong: [a[0] * b[0] - a[1] * b[1] + a[2] * b[2] === d ? d + 2 : a[0] * b[0] - a[1] * b[1] + a[2] * b[2], d + 3, -d === d ? d - 4 : -d], extraWrong: near(r, d), expl: `Sum of products of components = ${d}.` }); },
  (r) => { const a1 = r.nonzero(1, 5), a2 = r.nonzero(-4, 4), b2 = r.nonzero(1, 5); // a=(a1,a2), b=(k,b2), a.b=0 -> k = -a2*b2/a1
    const num = -a2 * b2; const k = frac(num, a1);
    return m12(r, { q: `For what value of λ are ${vstr(a1, a2, 0)} and ${vstr(1, 0, 0).replace('î', 'λî')} ${b2 > 0 ? '+' : '−'} ${Math.abs(b2)}ĵ perpendicular?`, correct: k, wrong: [frac(-num, a1) === k ? '1' : frac(-num, a1), frac(a1, num || 1), frac(num + a1, a1)], expl: `${a1}λ + (${a2})(${b2}) = 0 ⇒ λ = ${k}.` }); },
  (r) => { const a = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)], b = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)];
    const c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    if (c.every(v => v === 0)) { a[0] = 1; b[1] = 1; }
    const c2 = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    return m12(r, { q: `If a = ${vstr(...a)} and b = ${vstr(...b)}, then a × b = ?`, correct: vstr(...c2), wrong: [vstr(-c2[0], -c2[1], -c2[2]), vstr(c2[0], -c2[1], c2[2]), vstr(a[0] * b[0], a[1] * b[1], a[2] * b[2])], extraWrong: () => vstr(r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)), expl: 'Expand the 3×3 determinant with î, ĵ, k̂ in the first row.' }); },
  (r) => { const [x, y, m] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]);
    return m12(r, { q: `The unit vector in the direction of ${x}î + ${y}ĵ is:`, correct: `(${x}î + ${y}ĵ)/${m}`, wrong: [`(${x}î + ${y}ĵ)/${m * m}`, `${x}î + ${y}ĵ`, `(${y}î + ${x}ĵ)/${m}`], expl: `Divide by the magnitude ${m}.` }); },
  (r) => p12(r, r.pick(vecPool)),
  (r) => p12(r, r.pick(vecPool)),
];

export const MATH_TOPICS = [
  { id: 'm-complex', name: T1, book: 'FSc Part I, Ch 1', gens: complexGens, weight: 7,
    notes: ['Number system: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ; properties of real numbers (closure, associativity, inverses).', 'Complex number z = a + bi, i² = −1, powers of i cycle every 4.', 'Conjugate z̄ = a − bi; modulus |z| = √(a² + b²); z·z̄ = |z|².', '1/z = z̄/|z|²; |z₁z₂| = |z₁||z₂|; Argand diagram: real part on x-axis, imaginary on y-axis.'] },
  { id: 'm-matrices', name: T2, book: 'FSc Part I, Ch 3', gens: matGens, weight: 8,
    notes: ['Product AB exists when columns of A = rows of B; (m×n)(n×p) = m×p.', 'det 2×2 = ad − bc; triangular matrix: product of the diagonal.', 'A⁻¹ = adj A / |A| exists only if |A| ≠ 0 (non-singular).', '(AB)ᵗ = BᵗAᵗ, (AB)⁻¹ = B⁻¹A⁻¹, |kA| = kⁿ|A|.', 'Row swap changes sign; identical/proportional rows ⇒ det = 0; Cramer\'s rule for linear systems.'] },
  { id: 'm-quadratic', name: T3, book: 'FSc Part I, Ch 4', gens: quadGens, weight: 8,
    notes: ['Roots: x = [−b ± √(b² − 4ac)]/2a.', 'Sum α + β = −b/a; product αβ = c/a; α² + β² = (α+β)² − 2αβ.', 'Discriminant D: D > 0 real & distinct (rational if perfect square), D = 0 equal, D < 0 complex.', 'Cube roots of unity: 1, ω, ω²; 1 + ω + ω² = 0; ω³ = 1.', 'Equation from roots: x² − (sum)x + product = 0.'] },
  { id: 'm-sequences', name: T4, book: 'FSc Part I, Ch 6', gens: seqGens, weight: 8,
    notes: ['A.P.: aₙ = a + (n−1)d; Sₙ = n/2[2a + (n−1)d].', 'G.P.: aₙ = arⁿ⁻¹; Sₙ = a(1 − rⁿ)/(1 − r); S∞ = a/(1 − r) for |r| < 1.', 'H.P.: reciprocals form an A.P.', 'Means: A = (a+b)/2, G = √(ab), H = 2ab/(a+b); A > G > H and G² = AH.'] },
  { id: 'm-pnc', name: T5, book: 'FSc Part I, Ch 7', gens: pcGens, weight: 8,
    notes: ['ⁿPᵣ = n!/(n−r)! (order matters); ⁿCᵣ = n!/[r!(n−r)!] (order does not).', 'Arrangements with repeats: n!/(p!q!…); circular: (n − 1)!.', 'ⁿCᵣ = ⁿCₙ₋ᵣ; 0! = 1.', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B); independent: P(A ∩ B) = P(A)P(B).'] },
  { id: 'm-binomial', name: T6, book: 'FSc Part I, Ch 8', gens: binGens, weight: 7,
    notes: ['Induction: prove base case, assume P(k), prove P(k + 1).', '(a + b)ⁿ has n + 1 terms; T(r+1) = ⁿCᵣ aⁿ⁻ʳ bʳ.', 'Middle term: (n/2 + 1)th if n even; two middle terms if n odd.', 'Sum of coefficients = 2ⁿ; (1 + x)ⁿ for fractional/negative n valid when |x| < 1.'] },
  { id: 'm-trig', name: T7, book: 'FSc Part I, Ch 9–14', gens: trigGens, weight: 10,
    notes: ['Standard values for 0°, 30°, 45°, 60°, 90° and their quadrant signs (ASTC).', 'Identities: sin² + cos² = 1, 1 + tan² = sec², 1 + cot² = cosec².', 'sin 2θ = 2 sin θ cos θ; cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1.', 'Periods: sin, cos → 2π/k; tan → π/k.', 'Law of sines, law of cosines c² = a² + b² − 2ab cos C, area ½ab sin C.', 'Principal ranges: sin⁻¹ [−π/2, π/2], cos⁻¹ [0, π], tan⁻¹ (−π/2, π/2).'] },
  { id: 'm-functions', name: T8, book: 'FSc Part II, Ch 1', gens: funcGens, weight: 7,
    notes: ['Domain: values where the function is defined (no division by 0, no negative under even root, log of positive only).', 'Composition (f∘g)(x) = f(g(x)); inverse exists only for one-to-one functions.', 'Even f(−x) = f(x); odd f(−x) = −f(x).', 'Transformations: f(x) + k up, f(x − h) right, −f(x) reflect in x-axis.'] },
  { id: 'm-differential', name: T9, book: 'FSc Part II, Ch 1–2', gens: diffGens, weight: 12,
    notes: ['Limits: lim sin x/x = 1; lim (1 + 1/x)ˣ = e; factor to remove 0/0.', 'Rules: power, product, quotient, chain.', 'd/dx: sin → cos, cos → −sin, tan → sec², eˣ → eˣ, ln x → 1/x, sin⁻¹x → 1/√(1−x²).', 'Slope of tangent = f′(x₀).', 'Maxima/minima: f′ = 0; f″ < 0 max, f″ > 0 min.'] },
  { id: 'm-integral', name: T10, book: 'FSc Part II, Ch 3', gens: intGens, weight: 10,
    notes: ['∫xⁿ dx = xⁿ⁺¹/(n + 1) + c (n ≠ −1); ∫1/x dx = ln|x| + c.', '∫sin kx = −cos kx/k; ∫cos kx = sin kx/k; ∫eᵏˣ = eᵏˣ/k.', 'By parts: ∫u dv = uv − ∫v du; substitution for composite functions.', 'Definite integral = F(b) − F(a); area under a curve; odd function over [−a, a] gives 0.'] },
  { id: 'm-geometry', name: T11, book: 'FSc Part II, Ch 4, 6', gens: geoGens, weight: 10,
    notes: ['Distance, midpoint, slope m = (y₂ − y₁)/(x₂ − x₁); parallel m₁ = m₂, perpendicular m₁m₂ = −1.', 'Line forms: y = mx + c, point-slope, intercept; distance from point to line |Ax₀ + By₀ + C|/√(A² + B²).', 'Circle x² + y² + 2gx + 2fy + c = 0: centre (−g, −f), r = √(g² + f² − c).', 'Parabola y² = 4ax: focus (a, 0), directrix x = −a, e = 1.', 'Ellipse e = c/a < 1, c² = a² − b²; hyperbola e > 1, c² = a² + b².'] },
  { id: 'm-vectors', name: T12, book: 'FSc Part II, Ch 7', gens: vecGens, weight: 5,
    notes: ['|a| = √(x² + y² + z²); unit vector â = a/|a|.', 'a · b = |a||b|cos θ = sum of component products; 0 ⇒ perpendicular.', 'a × b = |a||b| sin θ n̂ (determinant); 0 ⇒ parallel; a × b = −b × a.', '|a × b| = area of parallelogram; a·(b × c) = volume of parallelepiped.'] },
];
