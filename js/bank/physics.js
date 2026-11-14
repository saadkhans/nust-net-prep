// Physics question generators — FSc Part I & II (NET Engineering/Computing: 60 MCQs). Take g = 10 m/s² where stated.
import { mcq, fmt, frac, near, fromPool } from './util.js';

const S = 'Physics';
const mk = (topic) => (rng, o) => mcq(rng, { ...o, subject: S, topic });
const P = (topic) => (rng, item) => fromPool(rng, item, S, topic);
const u = (v, unit) => `${fmt(v)} ${unit}`;
const opts = (vals, unit) => vals.map(v => u(v, unit));

// ---------- 1. Measurements & Vectors ----------
const T1 = 'Measurements & Vectors';
const m1 = mk(T1), p1 = P(T1);
const measPool = [
  { q: 'The dimensions of force are:', a: '[MLT⁻²]', w: ['[MLT⁻¹]', '[ML²T⁻²]', '[MLT²]'], e: 'F = ma ⇒ kg·m·s⁻².' },
  { q: 'The dimensions of work (energy) are:', a: '[ML²T⁻²]', w: ['[MLT⁻²]', '[ML²T⁻¹]', '[ML⁻¹T⁻²]'], e: 'W = F·d.' },
  { q: 'Which of these is NOT an SI base unit?', a: 'Newton', w: ['Kelvin', 'Ampere', 'Mole'], e: 'The newton is a derived unit (kg m s⁻²).' },
  { q: 'The SI unit of luminous intensity is the:', a: 'Candela', w: ['Lumen', 'Lux', 'Watt'], e: 'Candela is one of the seven base units.' },
  { q: 'The dimensions of pressure are:', a: '[ML⁻¹T⁻²]', w: ['[MLT⁻²]', '[ML²T⁻²]', '[ML⁻²T⁻²]'], e: 'P = F/A.' },
  { q: 'Plane angle (radian) is classified in SI as a:', a: 'Dimensionless derived unit', w: ['Base unit', 'Unit of length', 'Vector quantity'], e: 'Radian and steradian are dimensionless derived units.' },
  { q: 'Errors that occur due to a faulty instrument (e.g. zero error) are:', a: 'Systematic errors', w: ['Random errors', 'Human errors only', 'Gross errors'], e: 'Systematic errors shift every reading in the same direction.' },
  { q: 'The precision of a measurement is decided by the:', a: 'Least count of the instrument', w: ['Size of the object', 'Number of observers', 'Accepted value'], e: 'Smaller least count ⇒ more precise.' },
  { q: 'A vector is multiplied by −1. Its direction:', a: 'Reverses', w: ['Stays the same', 'Rotates by 90°', 'Becomes zero'], e: 'Negative of a vector is anti-parallel.' },
  { q: 'Two vectors give maximum resultant when the angle between them is:', a: '0°', w: ['90°', '180°', '45°'], e: 'Parallel vectors add directly.' },
];
const measGens = [
  (r) => { const v = r.pick([['0.00450', 3], ['2.030', 4], ['1200', 2], ['3.0040', 5], ['0.0102', 3], ['5.60 × 10³', 3], ['100.0', 4], ['0.250', 3]]);
    return m1(r, { q: `The number of significant figures in ${v[0]} is:`, correct: v[1], wrong: [v[1] + 1, v[1] - 1, v[1] + 2], expl: 'Leading zeros never count; zeros between digits and trailing zeros after a decimal point do count.' }); },
  (r) => { const a = r.int(1, 4), b = r.int(1, 4), n = r.pick([1, 2, 3]);
    const tot = a + n * b;
    return m1(r, { q: `In Z = X·Y^${n}, X has ${a}% uncertainty and Y has ${b}%. The percentage uncertainty in Z is:`, correct: `${tot}%`, wrong: [`${a + b}%`, `${a * n * b}%`, `${Math.abs(n * b - a) || tot + 1}%`], expl: `Percentage uncertainties add, multiplied by the power: ${a} + ${n}×${b} = ${tot}%.` }); },
  (r) => { const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
    return m1(r, { q: `Two forces of ${a} N and ${b} N act at right angles. The magnitude of their resultant is:`, correct: u(c, 'N'), wrong: opts([a + b, b - a, c * c], 'N'), expl: `R = √(${a}² + ${b}²) = ${c} N.` }); },
  (r) => { const F = r.int(2, 10) * 10; const ang = r.pick([30, 60]);
    const comp = r.pick(['x', 'y']); const val = (comp === 'x') === (ang === 60) ? F / 2 : `${F / 2}√3`;
    const other = (comp === 'x') === (ang === 60) ? `${F / 2}√3` : F / 2;
    return m1(r, { q: `A force of ${F} N makes ${ang}° with the x-axis. Its ${comp}-component is:`, correct: `${val} N`, wrong: [`${other} N`, `${F} N`, `${F / 4} N`], expl: `Fx = F cos θ, Fy = F sin θ.` }); },
  (r) => { const A = r.int(3, 9), B = r.int(3, 9);
    return m1(r, { q: `Two vectors of magnitudes ${A} and ${B} are added. Which resultant is NOT possible?`, correct: String(A + B + 1), wrong: [String(A + B), String(Math.abs(A - B)), String(Math.max(A, B))], expl: `Resultant lies between |A − B| = ${Math.abs(A - B)} and A + B = ${A + B}.` }); },
  (r) => p1(r, r.pick(measPool)),
  (r) => p1(r, r.pick(measPool)),
];

// ---------- 2. Kinematics ----------
const T2 = 'Kinematics';
const m2 = mk(T2), p2 = P(T2);
const kinPool = [
  { q: 'The slope of a velocity–time graph gives:', a: 'Acceleration', w: ['Displacement', 'Speed', 'Jerk'], e: 'a = dv/dt.' },
  { q: 'The area under a velocity–time graph gives:', a: 'Displacement', w: ['Acceleration', 'Force', 'Momentum'], e: 'Area = ∫v dt.' },
  { q: 'For a projectile launched at angle θ, the range is maximum when θ is:', a: '45°', w: ['30°', '60°', '90°'], e: 'R = v² sin 2θ/g is maximum at sin 2θ = 1.' },
  { q: 'At the highest point of a projectile\'s path, its velocity is:', a: 'Horizontal and non-zero', w: ['Zero', 'Vertical', 'Maximum'], e: 'Only the vertical component becomes zero.' },
  { q: 'Projectiles launched at 30° and 60° with the same speed have:', a: 'Equal ranges', w: ['Equal maximum heights', 'Equal times of flight', 'Equal ranges only if g = 10 m/s²'], e: 'Complementary angles give equal range.' },
  { q: 'The horizontal component of a projectile\'s velocity (ignoring air resistance):', a: 'Remains constant', w: ['Increases', 'Decreases', 'Becomes zero at the top'], e: 'No horizontal force acts.' },
];
const kinGens = [
  (r) => { const u0 = r.int(0, 10), a = r.int(1, 5), t = r.int(2, 10); const v = u0 + a * t;
    return m2(r, { q: `A car starts at ${u0} m/s and accelerates uniformly at ${a} m/s² for ${t} s. Its final velocity is:`, correct: u(v, 'm/s'), wrong: opts([a * t, u0 + a * t * t, v + a], 'm/s'), expl: `v = u + at = ${u0} + ${a}×${t} = ${v} m/s.` }); },
  (r) => { const u0 = r.int(0, 10), a = r.int(1, 4) * 2, t = r.int(2, 6); const s = u0 * t + a * t * t / 2;
    return m2(r, { q: `A body moving at ${u0} m/s accelerates at ${a} m/s². Distance covered in ${t} s:`, correct: u(s, 'm'), wrong: opts([u0 * t + a * t * t, u0 * t, s + a * t], 'm'), expl: `s = ut + ½at² = ${u0 * t} + ${a * t * t / 2} = ${s} m.` }); },
  (r) => { const h = r.pick([5, 20, 45, 80, 125, 180]); const t = Math.sqrt(2 * h / 10);
    return m2(r, { q: `A stone is dropped from a height of ${h} m (g = 10 m/s²). Time to reach the ground:`, correct: u(t, 's'), wrong: opts([t * 2, h / 10, t + 1], 's'), expl: `h = ½gt² ⇒ t = √(2h/g) = ${t} s.` }); },
  (r) => { const v = r.pick([10, 20, 30, 40]); const h = v * v / 20;
    return m2(r, { q: `A ball is thrown vertically up at ${v} m/s (g = 10 m/s²). Maximum height reached:`, correct: u(h, 'm'), wrong: opts([v * v / 10, h / 2, v], 'm'), expl: `H = u²/2g = ${v * v}/20 = ${h} m.` }); },
  (r) => { const v = r.pick([10, 20, 30, 40, 50]); const R = v * v / 10;
    return m2(r, { q: `A projectile is launched at ${v} m/s at 45° (g = 10 m/s²). Its horizontal range is:`, correct: u(R, 'm'), wrong: opts([R / 2, R * 2, v * 4.5], 'm'), expl: `R = v² sin 90°/g = ${v * v}/10 = ${R} m.` }); },
  (r) => { const v = r.pick([20, 40, 60]); const T = 2 * v * 0.5 / 10;
    return m2(r, { q: `A projectile is fired at ${v} m/s at 30° above the horizontal (g = 10 m/s²). Time of flight:`, correct: u(T, 's'), wrong: opts([T * 2, T / 2, v / 10 * 0.866], 's'), expl: `T = 2v sin θ/g = 2×${v}×0.5/10 = ${T} s.` }); },
  (r) => { const a = r.int(10, 30), b = r.int(5, 25); const same = r.pick([true, false]); const v = same ? Math.abs(a - b) : a + b;
    return m2(r, { q: `Two trains move on parallel tracks at ${a} m/s and ${b} m/s in ${same ? 'the same' : 'opposite'} direction${same ? '' : 's'}. Their relative speed is:`, correct: u(v, 'm/s'), wrong: opts([same ? a + b : Math.abs(a - b) || 1, (a + b) / 2, a], 'm/s'), expl: same ? 'Same direction: subtract.' : 'Opposite directions: add.' }); },
  (r) => p2(r, r.pick(kinPool)),
];

// ---------- 3. Dynamics ----------
const T3 = 'Dynamics';
const m3 = mk(T3), p3 = P(T3);
const dynPool = [
  { q: 'Newton\'s first law is also called the law of:', a: 'Inertia', w: ['Momentum', 'Action and reaction', 'Gravitation'], e: 'A body resists change in its state of motion.' },
  { q: 'Rate of change of momentum equals:', a: 'Net force', w: ['Impulse', 'Work', 'Power'], e: 'Newton\'s second law: F = dp/dt.' },
  { q: 'Impulse is equal to:', a: 'Change in momentum', w: ['Change in kinetic energy', 'Force × distance', 'Mass × acceleration'], e: 'J = FΔt = Δp.' },
  { q: 'A gun recoils when fired because of conservation of:', a: 'Linear momentum', w: ['Energy only', 'Angular momentum', 'Mass'], e: 'Total momentum remains zero.' },
  { q: 'Action and reaction forces:', a: 'Act on different bodies', w: ['Act on the same body', 'Cancel each other', 'Are unequal in magnitude'], e: 'Newton\'s third law pairs act on different bodies, so they don\'t cancel.' },
  { q: 'The coefficient of kinetic friction is usually ____ the coefficient of static friction.', a: 'Less than', w: ['Greater than', 'Equal to', 'Twice'], e: 'It is easier to keep a body moving than to start it.' },
  { q: 'In an elastic collision, which is conserved?', a: 'Both momentum and kinetic energy', w: ['Only momentum', 'Only kinetic energy', 'Neither'], e: 'Elastic: both conserved; inelastic: only momentum.' },
];
const dynGens = [
  (r) => { const m = r.int(2, 20), a = r.int(1, 8); return m3(r, { q: `A net force acts on a ${m} kg body producing an acceleration of ${a} m/s². The force is:`, correct: u(m * a, 'N'), wrong: opts([m + a, m * a * 2, m / a === Math.floor(m / a) && m / a !== m * a ? m / a : m * a + 5], 'N'), expl: `F = ma = ${m * a} N.` }); },
  (r) => { const m = r.int(2, 10), v1 = r.int(2, 10), v2 = v1 + r.int(2, 10), t = r.pick([0.1, 0.2, 0.5, 1, 2]); const F = m * (v2 - v1) / t;
    return m3(r, { q: `The velocity of a ${m} kg body changes from ${v1} m/s to ${v2} m/s in ${t} s. Average force:`, correct: u(F, 'N'), wrong: opts([m * (v2 - v1), m * v2 / t, F / 2], 'N'), expl: `F = Δp/Δt = ${m}×${v2 - v1}/${t} = ${fmt(F)} N.` }); },
  (r) => { const mb = r.pick([0.01, 0.02, 0.05]), vb = r.pick([200, 300, 400, 500]), M = r.pick([2, 4, 5, 10]); const V = mb * vb / M;
    return m3(r, { q: `A ${mb * 1000} g bullet leaves a ${M} kg gun at ${vb} m/s. The recoil speed of the gun is:`, correct: u(V, 'm/s'), wrong: opts([V * 10, V / 2, mb * vb], 'm/s'), expl: `MV = mv ⇒ V = ${mb}×${vb}/${M} = ${fmt(V)} m/s.` }); },
  (r) => { const m1v = r.int(1, 5), m2v = r.int(1, 5), v = r.int(2, 10) * (m1v + m2v); const V = m1v * v / (m1v + m2v);
    return m3(r, { q: `A ${m1v} kg ball at ${v} m/s collides with a stationary ${m2v} kg ball and they stick together. Their common velocity:`, correct: u(V, 'm/s'), wrong: opts([v / 2 === V ? V + 2 : v / 2, m1v * v / m2v, v], 'm/s'), expl: `m₁v = (m₁ + m₂)V ⇒ V = ${V} m/s.` }); },
  (r) => { const m = r.int(2, 20), mu = r.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]); const f = mu * m * 10;
    return m3(r, { q: `A ${m} kg block rests on a horizontal surface with μ = ${mu} (g = 10 m/s²). The limiting friction is:`, correct: u(f, 'N'), wrong: opts([mu * m, m * 10, f * 2], 'N'), expl: `f = μmg = ${mu}×${m}×10 = ${fmt(f)} N.` }); },
  (r) => { const [a, b] = r.pick([[3, 2], [4, 1], [6, 4], [5, 3], [3, 1], [7, 3]]); const acc = (a - b) * 10 / (a + b); const T = 2 * a * b * 10 / (a + b);
    const which = r.pick(['a', 'T']);
    return which === 'a' ? m3(r, { q: `Masses of ${a} kg and ${b} kg hang over a frictionless pulley (Atwood machine, g = 10 m/s²). Their acceleration is:`, correct: u(acc, 'm/s²'), wrong: opts([10, (a - b) * 10 / a, acc * 2], 'm/s²'), expl: `a = (m₁ − m₂)g/(m₁ + m₂) = ${fmt(acc)} m/s².` })
      : m3(r, { q: `Masses of ${a} kg and ${b} kg hang over a frictionless pulley (g = 10 m/s²). The tension in the string is:`, correct: u(T, 'N'), wrong: opts([a * 10, b * 10, (a + b) * 5 === T ? T + 4 : (a + b) * 5], 'N'), expl: `T = 2m₁m₂g/(m₁ + m₂) = ${fmt(T)} N.` }); },
  (r) => p3(r, r.pick(dynPool)),
];

// ---------- 4. Work, Energy & Power ----------
const T4 = 'Work, Energy & Power';
const m4 = mk(T4), p4 = P(T4);
const wepPool = [
  { q: 'If the speed of a body is doubled, its kinetic energy becomes:', a: 'Four times', w: ['Double', 'Half', 'Unchanged'], e: 'KE ∝ v².' },
  { q: 'Work done by a centripetal force on a body in uniform circular motion is:', a: 'Zero', w: ['Maximum', 'Negative', 'Equal to its KE'], e: 'Force is perpendicular to displacement.' },
  { q: 'The work done by a conservative force around a closed path is:', a: 'Zero', w: ['Positive', 'Negative', 'Infinite'], e: 'Defining property of a conservative force.' },
  { q: '1 kilowatt-hour equals:', a: '3.6 × 10⁶ J', w: ['3.6 × 10³ J', '1000 J', '3600 J'], e: '1000 W × 3600 s.' },
  { q: 'Power is the dot product of force and:', a: 'Velocity', w: ['Displacement', 'Acceleration', 'Momentum'], e: 'P = F·v.' },
  { q: 'The work–energy theorem states that work done by the net force equals the change in:', a: 'Kinetic energy', w: ['Potential energy', 'Momentum', 'Power'], e: 'W_net = ΔKE.' },
];
const wepGens = [
  (r) => { const F = r.int(2, 10) * 10, d = r.int(2, 10), th = r.pick([0, 60, 90]); const W = th === 0 ? F * d : th === 60 ? F * d / 2 : 0;
    return m4(r, { q: `A force of ${F} N moves a body ${d} m at ${th}° to the force. Work done:`, correct: u(W, 'J'), wrong: opts([F * d === W ? F * d / 2 : F * d, F + d, W + F], 'J'), expl: `W = Fd cos θ = ${W} J.` }); },
  (r) => { const m = r.int(1, 10) * 2, v = r.int(2, 10); const K = m * v * v / 2;
    return m4(r, { q: `The kinetic energy of a ${m} kg body moving at ${v} m/s is:`, correct: u(K, 'J'), wrong: opts([m * v * v, m * v, K / 2], 'J'), expl: `KE = ½mv² = ${K} J.` }); },
  (r) => { const m = r.int(1, 10), h = r.int(2, 20); const U = m * 10 * h;
    return m4(r, { q: `A ${m} kg mass is lifted ${h} m (g = 10 m/s²). Gain in potential energy:`, correct: u(U, 'J'), wrong: opts([m * h, U / 2, U * 2], 'J'), expl: `PE = mgh = ${U} J.` }); },
  (r) => { const W = r.int(2, 20) * 100, t = r.pick([2, 4, 5, 10, 20]); const Pw = W / t;
    return m4(r, { q: `A motor does ${W} J of work in ${t} s. Its power is:`, correct: u(Pw, 'W'), wrong: opts([W * t, Pw * 2, Pw / 2], 'W'), expl: `P = W/t = ${fmt(Pw)} W.` }); },
  (r) => { const h = r.pick([5, 20, 45, 80]); const v = Math.sqrt(20 * h);
    return m4(r, { q: `A body falls freely from ${h} m (g = 10 m/s²). Using energy conservation, its speed on reaching the ground is:`, correct: u(v, 'm/s'), wrong: opts([v / 2, 10 * h, v * 2], 'm/s'), expl: `mgh = ½mv² ⇒ v = √(2gh) = ${v} m/s.` }); },
  (r) => { const v = r.pick([10, 15, 20]), F = r.pick([500, 800, 1000, 1200, 1500]); const Pw = F * v; // P = Fv
    return m4(r, { q: `A car moves at a constant ${v} m/s against a resistive force of ${F} N. The power delivered by the engine is:`, correct: u(Pw / 1000, 'kW'), wrong: opts([F / v / 1000, Pw / 100, Pw / 1000 * 2], 'kW'), expl: `P = Fv = ${F}×${v} = ${Pw} W.` }); },
  (r) => p4(r, r.pick(wepPool)),
];

// ---------- 5. Circular Motion & Gravitation ----------
const T5 = 'Circular Motion & Gravitation';
const m5 = mk(T5), p5 = P(T5);
const circPool = [
  { q: 'The direction of centripetal acceleration is:', a: 'Towards the centre', w: ['Along the tangent', 'Away from the centre', 'Along the axis of rotation'], e: 'It changes the direction, not the speed.' },
  { q: 'The value of g at the height equal to Earth\'s radius above the surface is:', a: 'g/4', w: ['g/2', 'g', '2g'], e: 'g ∝ 1/r²; r doubles ⇒ g/4.' },
  { q: 'Orbital velocity of a satellite close to Earth\'s surface is about:', a: '7.9 km/s', w: ['11.2 km/s', '3 km/s', '30 km/s'], e: 'v₀ = √(gR) ≈ 7.9 km/s.' },
  { q: 'Escape velocity from Earth\'s surface is about:', a: '11.2 km/s', w: ['7.9 km/s', '3 × 10⁸ m/s', '1.6 km/s'], e: 'vₑ = √(2gR) ≈ 11.2 km/s.' },
  { q: 'A geostationary satellite has a time period of:', a: '24 hours', w: ['12 hours', '1 hour', '27 days'], e: 'It rotates with the Earth.' },
  { q: 'Astronauts in an orbiting satellite feel weightless because:', a: 'They and the satellite are in free fall together', w: ['There is no gravity in space', 'The satellite\'s mass cancels gravity', 'They are beyond Earth\'s field'], e: 'Apparent weight is zero in free fall.' },
  { q: 'Angular momentum of a body is conserved when:', a: 'No external torque acts', w: ['No external force acts', 'Velocity is constant', 'It moves in a straight line'], e: 'τ = dL/dt.' },
  { q: 'The moment of inertia depends on:', a: 'Mass distribution about the axis', w: ['Angular velocity only', 'Linear speed', 'Applied torque'], e: 'I = Σmr².' },
];
const circGens = [
  (r) => { const m = r.int(1, 5), v = r.int(2, 10), rad = r.pick([1, 2, 4, 5]); const F = m * v * v / rad;
    return m5(r, { q: `A ${m} kg body moves at ${v} m/s in a circle of radius ${rad} m. The centripetal force is:`, correct: u(F, 'N'), wrong: opts([m * v / rad, m * v * v * rad, F / 2], 'N'), expl: `F = mv²/r = ${fmt(F)} N.` }); },
  (r) => { const rpm = r.pick([30, 60, 120, 300, 600]); const w = rpm / 60 * 2; // in π rad/s
    return m5(r, { q: `A wheel turns at ${rpm} rev/min. Its angular velocity is:`, correct: `${fmt(w)}π rad/s`, wrong: [`${fmt(rpm)}π rad/s`, `${fmt(w / 2)}π rad/s`, `${fmt(rpm / 60)} rad/s`], expl: `ω = 2πf = 2π×${rpm}/60 = ${fmt(w)}π rad/s.` }); },
  (r) => { const w = r.int(2, 10), rad = r.pick([0.5, 1, 2, 3]); const v = w * rad;
    return m5(r, { q: `A point on a disc of radius ${rad} m rotates with ω = ${w} rad/s. Its linear speed is:`, correct: u(v, 'm/s'), wrong: opts([w + rad, w * rad * rad, v + w], 'm/s'), expl: `v = rω = ${fmt(v)} m/s.` }); },
  (r) => { const k = r.pick([2, 3, 4]); const g = r.pick(['distance from centre becomes', 'mass of the planet becomes']);
    const ans = g.startsWith('distance') ? `1/${k * k} times` : `${k} times`;
    return m5(r, { q: `The gravitational force between two bodies when the ${g} ${k} times (others unchanged):`, correct: ans, wrong: g.startsWith('distance') ? [`1/${k} times`, `${k * k} times`, `${k} times`] : [`${k * k} times`, `1/${k} times`, 'Unchanged'], expl: 'F = Gm₁m₂/r².' }); },
  (r) => { const T = r.int(2, 10), rad = r.pick([1, 2, 5]);
    return m5(r, { q: `A body completes one revolution of radius ${rad} m in ${T} s. Its angular speed is:`, correct: `${frac(2, T).replace(/^(\d+)\/(\d+)$/, '$1π/$2').replace(/^(\d+)$/, '$1π')} rad/s`.replace(/^1π/, 'π'), wrong: [`${T}π rad/s`, `${frac(2 * rad, T).replace(/^(\d+)\/(\d+)$/, '$1π/$2').replace(/^(\d+)$/, '$1π')} rad/s`.replace(/^1π/, 'π'), `${frac(1, T).replace(/^(\d+)\/(\d+)$/, '$1π/$2').replace(/^(\d+)$/, '$1π')} rad/s`.replace(/^1π/, 'π')], extraWrong: () => `${r.int(3, 12)}π rad/s`, expl: 'ω = 2π/T.' }); },
  (r) => p5(r, r.pick(circPool)),
  (r) => p5(r, r.pick(circPool)),
];

// ---------- 6. Fluid Mechanics ----------
const T6 = 'Fluid Mechanics';
const m6 = mk(T6), p6 = P(T6);
const fluidPool = [
  { q: 'Bernoulli\'s equation is a statement of conservation of:', a: 'Energy', w: ['Mass', 'Momentum', 'Charge'], e: 'P + ½ρv² + ρgh = constant.' },
  { q: 'The equation of continuity A₁v₁ = A₂v₂ expresses conservation of:', a: 'Mass', w: ['Energy', 'Momentum', 'Pressure'], e: 'Mass flow rate is constant for an incompressible fluid.' },
  { q: 'Where a fluid flows faster in a horizontal pipe, its pressure is:', a: 'Lower', w: ['Higher', 'The same', 'Zero'], e: 'Bernoulli: higher speed ⇒ lower pressure.' },
  { q: 'Stokes\' law F = 6πηrv applies to a sphere moving through a viscous fluid at:', a: 'Low (streamline) speeds', w: ['Supersonic speeds', 'Any speed in turbulent flow', 'Only in vacuum'], e: 'Valid for laminar flow.' },
  { q: 'A body falling through a viscous fluid reaches terminal velocity when:', a: 'Net force on it becomes zero', w: ['Its weight becomes zero', 'Drag exceeds weight', 'Buoyancy disappears'], e: 'Weight = drag + upthrust.' },
  { q: 'The lift on an aeroplane wing is mainly explained by:', a: 'Bernoulli\'s principle', w: ['Archimedes\' principle', 'Pascal\'s law', 'Hooke\'s law'], e: 'Faster air above the wing ⇒ lower pressure.' },
  { q: 'Viscosity of liquids ____ with increase in temperature.', a: 'Decreases', w: ['Increases', 'Stays constant', 'Becomes infinite'], e: 'Liquids flow more easily when warm.' },
];
const fluidGens = [
  (r) => { const h = r.int(2, 20), rho = r.pick([1000, 800, 1200]); const Pv = rho * 10 * h;
    return m6(r, { q: `The pressure due to a ${h} m column of liquid of density ${rho} kg/m³ (g = 10 m/s²) is:`, correct: u(Pv, 'Pa'), wrong: opts([rho * h, Pv / 10, Pv * 2], 'Pa'), expl: `P = ρgh = ${Pv} Pa.` }); },
  (r) => { const A1 = r.int(2, 6) * 4, A2 = r.pick([1, 2, 4]), v1 = r.int(1, 5); const v2 = A1 * v1 / A2;
    return m6(r, { q: `Water flows at ${v1} m/s through a pipe of area ${A1} cm², which narrows to ${A2} cm². The speed in the narrow part is:`, correct: u(v2, 'm/s'), wrong: opts([v1, v1 * A1, v2 * 2], 'm/s'), expl: `A₁v₁ = A₂v₂ ⇒ v₂ = ${fmt(v2)} m/s.` }); },
  (r) => { const V = r.pick([0.001, 0.002, 0.005, 0.01]), rho = 1000; const B = rho * V * 10;
    return m6(r, { q: `A body of volume ${V} m³ is fully immersed in water (ρ = 1000 kg/m³, g = 10 m/s²). The buoyant force is:`, correct: u(B, 'N'), wrong: opts([B / 10, B * 10, rho * V], 'N'), expl: `F = ρVg = ${fmt(B)} N.` }); },
  (r) => { const k = r.pick([2, 3, 4]);
    return m6(r, { q: `The terminal velocity of a small sphere in a viscous fluid (Stokes regime) if its radius is made ${k} times is:`, correct: `${k * k} times`, wrong: [`${k} times`, `${k * k * k} times`, `1/${k} times`], expl: 'vₜ ∝ r².' }); },
  (r) => p6(r, r.pick(fluidPool)),
  (r) => p6(r, r.pick(fluidPool)),
];

// ---------- 7. Waves, Oscillations & Sound ----------
const T7 = 'Waves, Oscillations & Sound';
const m7 = mk(T7), p7 = P(T7);
const wavePool = [
  { q: 'Sound waves in air are:', a: 'Longitudinal', w: ['Transverse', 'Electromagnetic', 'Stationary only'], e: 'Particles vibrate along the direction of propagation.' },
  { q: 'Sound cannot travel through:', a: 'Vacuum', w: ['Water', 'Steel', 'Air'], e: 'Mechanical waves need a medium.' },
  { q: 'The distance between two consecutive nodes of a stationary wave is:', a: 'λ/2', w: ['λ', 'λ/4', '2λ'], e: 'Node to adjacent antinode is λ/4.' },
  { q: 'A pipe closed at one end produces:', a: 'Only odd harmonics', w: ['Only even harmonics', 'All harmonics', 'No harmonics'], e: 'f = nv/4L with n = 1, 3, 5…' },
  { q: 'In SHM, acceleration is maximum at:', a: 'The extreme positions', w: ['The mean position', 'Halfway', 'Nowhere'], e: 'a = −ω²x is largest when |x| is largest.' },
  { q: 'In SHM, velocity is maximum at:', a: 'The mean position', w: ['The extreme positions', 'Halfway', 'All points equally'], e: 'All energy is kinetic at the mean position.' },
  { q: 'Doppler effect: when a source moves towards a stationary listener, the apparent frequency:', a: 'Increases', w: ['Decreases', 'Stays the same', 'Becomes zero'], e: 'Waves are compressed ahead of the source.' },
  { q: 'The speed of sound in air increases with:', a: 'Increase in temperature', w: ['Increase in pressure at constant temperature', 'Decrease in temperature', 'Increase in loudness'], e: 'v ∝ √T.' },
  { q: 'Resonance occurs when the driving frequency equals the:', a: 'Natural frequency of the system', w: ['Beat frequency', 'Double the natural frequency', 'Damping constant'], e: 'Amplitude becomes maximum.' },
];
const waveGens = [
  (r) => { const f = r.pick([100, 200, 250, 340, 500, 680]), lam = r.pick([0.5, 1, 2, 0.25]); const v = f * lam;
    return m7(r, { q: `A wave has frequency ${f} Hz and wavelength ${lam} m. Its speed is:`, correct: u(v, 'm/s'), wrong: opts([f / lam, v * 2, v / 2], 'm/s'), expl: `v = fλ = ${fmt(v)} m/s.` }); },
  (r) => { const f1 = r.int(250, 520), b = r.int(2, 8);
    return m7(r, { q: `Two tuning forks of ${f1} Hz and ${f1 + b} Hz are sounded together. The number of beats per second is:`, correct: b, wrong: [2 * f1 + b, b * 2, f1 / b > 1 ? Math.round((2 * f1 + b) / 2) : b + 1], expl: `Beat frequency = |f₁ − f₂| = ${b} Hz.` }); },
  (r) => { const L = r.pick([0.25, 0.5, 1]), v = 340; const open = r.pick([true, false]); const f = open ? v / (2 * L) : v / (4 * L);
    return m7(r, { q: `The fundamental frequency of a pipe ${open ? 'open at both ends' : 'closed at one end'} of length ${L} m (v = 340 m/s) is:`, correct: u(f, 'Hz'), wrong: opts([open ? v / (4 * L) : v / (2 * L), v / L, f * 3], 'Hz'), expl: open ? 'f = v/2L.' : 'f = v/4L.' }); },
  (r) => { const k = r.pick([4, 9, 16]), m = r.pick([1, 4]); // T = 2π√(m/k)
    const T = `${frac(2 * Math.sqrt(m), Math.sqrt(k)).replace(/^(\d+)\/(\d+)$/, '$1π/$2').replace(/^(\d+)$/, '$1π')}`.replace(/^1π/, 'π');
    return m7(r, { q: `A mass of ${m} kg on a spring of constant ${k} N/m oscillates. Its time period is:`, correct: `${T} s`, wrong: [`${frac(2 * Math.sqrt(k), Math.sqrt(m)).replace(/^(\d+)\/(\d+)$/, '$1π/$2').replace(/^(\d+)$/, '$1π')} s`.replace(/^1π/, 'π'), `${frac(m, k)} s`, `${2 * k * m}π s`], extraWrong: () => `${r.int(3, 9)}π s`, expl: 'T = 2π√(m/k).' }); },
  (r) => { const k = r.pick([4, 9, 16]);
    return m7(r, { q: `If the length of a simple pendulum is made ${k} times, its period becomes:`, correct: `${Math.sqrt(k)} times`, wrong: [`${k} times`, `1/${Math.sqrt(k)} times`, `${k * k} times`], expl: 'T = 2π√(L/g) ⇒ T ∝ √L.' }); },
  (r) => { const v = 340, vs = r.pick([68, 170]), f = r.pick([200, 400, 600]); const fp = f * v / (v - vs);
    return m7(r, { q: `A source of ${f} Hz moves towards a stationary listener at ${vs} m/s (v = 340 m/s). The apparent frequency is:`, correct: u(fp, 'Hz'), wrong: opts([Math.round(f * v / (v + vs)), f, Math.round(f * (v + vs) / v)], 'Hz'), expl: `f′ = fv/(v − vₛ) = ${fmt(fp)} Hz.` }); },
  (r) => { const n = r.pick([1, 2, 3]);
    return m7(r, { q: `If the intensity of sound increases ${10 ** n} times, the intensity level increases by:`, correct: `${10 * n} dB`, wrong: [`${10 ** n} dB`, `${n} dB`, `${20 * n} dB`], expl: 'ΔL = 10 log(I₂/I₁).' }); },
  (r) => p7(r, r.pick(wavePool)),
];

// ---------- 8. Thermodynamics ----------
const T8 = 'Thermodynamics';
const m8 = mk(T8), p8 = P(T8);
const thermoPool = [
  { q: 'In an isothermal process, the change in internal energy of an ideal gas is:', a: 'Zero', w: ['Equal to Q', 'Equal to W', 'Maximum'], e: 'U depends only on T for an ideal gas.' },
  { q: 'In an adiabatic process:', a: 'No heat enters or leaves the system', w: ['Temperature stays constant', 'Pressure stays constant', 'Volume stays constant'], e: 'Q = 0.' },
  { q: 'The first law of thermodynamics is a statement of conservation of:', a: 'Energy', w: ['Momentum', 'Temperature', 'Entropy'], e: 'Q = ΔU + W.' },
  { q: 'Entropy of an isolated system in a natural (irreversible) process:', a: 'Increases', w: ['Decreases', 'Stays zero', 'Always remains constant'], e: 'Second law of thermodynamics.' },
  { q: 'The average kinetic energy of gas molecules is directly proportional to:', a: 'Absolute temperature', w: ['Pressure only', 'Volume', 'Molar mass'], e: 'KE = (3/2)kT.' },
  { q: 'Molar specific heats satisfy Cp − Cv equal to:', a: 'R', w: ['γ', 'Zero', 'Cp/Cv'], e: 'Mayer\'s relation.' },
  { q: 'Absolute zero on the Celsius scale is:', a: '−273 °C', w: ['0 °C', '−100 °C', '273 °C'], e: '0 K = −273.15 °C.' },
  { q: 'Which law gives the concept of temperature?', a: 'Zeroth law', w: ['First law', 'Second law', 'Third law'], e: 'Thermal equilibrium defines temperature.' },
];
const thermoGens = [
  (r) => { const Tc = r.pick([300, 400, 500]), Th = Tc + r.pick([100, 200, 300, 500]); const e = (1 - Tc / Th) * 100;
    return m8(r, { q: `A Carnot engine works between ${Th} K and ${Tc} K. Its efficiency is:`, correct: `${fmt(e)}%`, wrong: [`${fmt(Tc / Th * 100)}%`, `${fmt((Th - Tc) / Tc * 100)}%`, '100%'], expl: `η = 1 − T_c/T_h = ${fmt(e)}%.` }); },
  (r) => { const Q = r.int(2, 10) * 100, W = r.int(1, 9) * 50;
    return m8(r, { q: `A gas absorbs ${Q} J of heat and does ${W} J of work. The change in internal energy is:`, correct: u(Q - W, 'J'), wrong: opts([Q + W, W - Q, Q], 'J'), expl: `ΔU = Q − W = ${Q - W} J.` }); },
  (r) => { const P1 = r.int(1, 4), V1 = r.int(2, 8), k = r.pick([2, 4]); const P2 = P1 * k;
    return m8(r, { q: `At constant temperature, a gas at ${P1} atm occupies ${V1 * k} L. Its volume at ${P2} atm is:`, correct: u(V1, 'L'), wrong: opts([V1 * k * k, V1 * k / 2 === V1 ? V1 + 1 : V1 * k / 2, V1 * 2 * k], 'L'), expl: 'Boyle\'s law: P₁V₁ = P₂V₂.' }); },
  (r) => { const k = r.pick([4, 9, 16]);
    return m8(r, { q: `If the absolute temperature of a gas becomes ${k} times, the rms speed of its molecules becomes:`, correct: `${Math.sqrt(k)} times`, wrong: [`${k} times`, `${k * k} times`, `1/${Math.sqrt(k)} times`], expl: 'v_rms ∝ √T.' }); },
  (r) => { const V1 = r.int(1, 5), T1 = r.pick([300, 200, 250]), T2 = T1 * r.pick([2, 3]); const V2 = V1 * T2 / T1;
    return m8(r, { q: `At constant pressure, ${V1} L of gas at ${T1} K is heated to ${T2} K. New volume:`, correct: u(V2, 'L'), wrong: opts([V1, V2 * 2, V1 + 1], 'L'), expl: 'Charles\'s law: V ∝ T.' }); },
  (r) => p8(r, r.pick(thermoPool)),
  (r) => p8(r, r.pick(thermoPool)),
];

// ---------- 9. Electrostatics ----------
const T9 = 'Electrostatics';
const m9 = mk(T9), p9 = P(T9);
const esPool = [
  { q: 'Electric field inside a charged hollow conducting sphere is:', a: 'Zero', w: ['Maximum', 'Same as on the surface', 'Infinite'], e: 'Charge resides on the outer surface.' },
  { q: 'Electric field lines:', a: 'Never intersect each other', w: ['Form closed loops', 'Start on negative charges', 'Are always straight'], e: 'Two directions at one point is impossible.' },
  { q: 'The SI unit of electric field intensity can be written as:', a: 'V/m', w: ['C/m', 'J/C', 'N·m/C'], e: 'N/C = V/m.' },
  { q: 'Inserting a dielectric between capacitor plates (battery disconnected) makes the capacitance:', a: 'Increase', w: ['Decrease', 'Remain the same', 'Become zero'], e: 'C = εᵣε₀A/d.' },
  { q: 'Electric flux through a closed surface depends on:', a: 'The charge enclosed', w: ['The shape of the surface', 'Charges outside the surface', 'The area only'], e: 'Gauss\'s law: Φ = q/ε₀.' },
  { q: 'The work done in moving a charge along an equipotential surface is:', a: 'Zero', w: ['Positive', 'Negative', 'Depends on the path'], e: 'ΔV = 0.' },
  { q: 'One electron-volt equals:', a: '1.6 × 10⁻¹⁹ J', w: ['1.6 × 10¹⁹ J', '9.1 × 10⁻³¹ J', '1 J'], e: 'Energy gained by an electron through 1 V.' },
];
const esGens = [
  (r) => { const k = r.pick([2, 3, 4]);
    const s = r.pick(['d', 'q', 'both']);
    const ans = s === 'd' ? `1/${k * k} times` : s === 'q' ? `${k} times` : `${k * k} times`;
    const txt = s === 'd' ? `the distance between two charges is made ${k} times` : s === 'q' ? `one of the charges is made ${k} times` : `both charges are made ${k} times`;
    return m9(r, { q: `By Coulomb's law, if ${txt}, the force becomes:`, correct: ans, wrong: [`${k} times`, `1/${k} times`, `${k * k} times`, `1/${k * k} times`].filter(x => x !== ans), expl: 'F = kq₁q₂/r².' }); },
  (r) => { const q = r.int(1, 9), d = r.pick([1, 3]); const E = 9 * q / (d * d); // q in nC? use μC with 10^3 factor: k q / r^2 = 9e9 * q e-6 / d^2 = 9e3 q/d^2
    return m9(r, { q: `The electric field at ${d} m from a point charge of ${q} μC is (k = 9 × 10⁹ N m²/C²):`, correct: `${fmt(E)} × 10³ N/C`, wrong: [`${fmt(E * d)} × 10³ N/C`, `${fmt(E)} × 10⁶ N/C`, `${fmt(E / 9)} × 10³ N/C`], extraWrong: () => `${r.int(2, 90)} × 10³ N/C`, expl: `E = kq/r² = 9×10⁹ × ${q}×10⁻⁶ / ${d * d}.` }); },
  (r) => { const a = r.int(1, 6), b = r.int(1, 6); const ser = r.pick([true, false]);
    const ans = ser ? frac(a * b, a + b) : String(a + b);
    return m9(r, { q: `Capacitors of ${a} μF and ${b} μF are connected in ${ser ? 'series' : 'parallel'}. The equivalent capacitance is:`, correct: `${ans} μF`, wrong: [`${ser ? a + b : frac(a * b, a + b)} μF`, `${a * b} μF`, `${frac(a + b, 2)} μF`].filter(x => x !== `${ans} μF`), extraWrong: () => `${r.int(1, 12)} μF`, expl: ser ? '1/C = 1/C₁ + 1/C₂.' : 'C = C₁ + C₂.' }); },
  (r) => { const C = r.int(1, 10), V = r.pick([10, 20, 50, 100]); const U = C * V * V / 2;
    return m9(r, { q: `A ${C} μF capacitor is charged to ${V} V. The energy stored is:`, correct: `${fmt(U / 1000)} mJ`, wrong: [`${fmt(C * V * V / 1000)} mJ`, `${fmt(C * V / 1000)} mJ`, `${fmt(U)} mJ`], expl: `U = ½CV² = ${fmt(U)} μJ.` }); },
  (r) => { const q = r.int(1, 5), V = r.pick([10, 20, 50, 100]);
    return m9(r, { q: `Work done in moving a ${q} μC charge through a potential difference of ${V} V is:`, correct: `${fmt(q * V)} μJ`, wrong: [`${fmt(V / q)} μJ`, `${fmt(q * V * 2)} μJ`, `${fmt(q + V)} μJ`], expl: 'W = qV.' }); },
  (r) => { const er = r.pick([2, 3, 4, 5]);
    return m9(r, { q: `A capacitor's gap is filled with a dielectric of relative permittivity ${er}. Its capacitance becomes:`, correct: `${er} times`, wrong: [`1/${er} times`, `${er * er} times`, 'Unchanged'], expl: 'C ∝ εᵣ.' }); },
  (r) => p9(r, r.pick(esPool)),
];

// ---------- 10. Current Electricity ----------
const T10 = 'Current Electricity';
const m10 = mk(T10), p10 = P(T10);
const cePool = [
  { q: 'Kirchhoff\'s junction (first) rule is based on conservation of:', a: 'Charge', w: ['Energy', 'Momentum', 'Mass'], e: 'Current in = current out.' },
  { q: 'Kirchhoff\'s loop (second) rule is based on conservation of:', a: 'Energy', w: ['Charge', 'Momentum', 'Current'], e: 'Sum of potential changes around a loop is zero.' },
  { q: 'The resistance of a metallic conductor ____ with temperature.', a: 'Increases', w: ['Decreases', 'Stays constant', 'Becomes zero'], e: 'Positive temperature coefficient.' },
  { q: 'A Wheatstone bridge is balanced when:', a: 'P/Q = R/S', w: ['P + Q = R + S', 'PQ = RS', 'The galvanometer shows maximum deflection'], e: 'No current flows through the galvanometer.' },
  { q: 'An ideal voltmeter should have:', a: 'Infinite resistance', w: ['Zero resistance', 'Low resistance', 'Resistance equal to the circuit'], e: 'It should draw no current.' },
  { q: 'An ammeter is connected in a circuit:', a: 'In series and has low resistance', w: ['In parallel and has high resistance', 'In series and has high resistance', 'In parallel and has low resistance'], e: 'It must not change the current.' },
  { q: 'The resistivity of a wire depends on:', a: 'The material and temperature', w: ['Its length', 'Its cross-section area', 'The current through it'], e: 'Resistance depends on dimensions; resistivity does not.' },
];
const ceGens = [
  (r) => { const a = r.int(2, 12), b = r.int(2, 12), ser = r.pick([true, false]); const ans = ser ? String(a + b) : frac(a * b, a + b);
    return m10(r, { q: `Resistors of ${a} Ω and ${b} Ω are connected in ${ser ? 'series' : 'parallel'}. Equivalent resistance:`, correct: `${ans} Ω`, wrong: [`${ser ? frac(a * b, a + b) : a + b} Ω`, `${a * b} Ω`, `${frac(a + b, 2)} Ω`].filter(x => x !== `${ans} Ω`), extraWrong: () => `${r.int(1, 20)} Ω`, expl: ser ? 'R = R₁ + R₂.' : '1/R = 1/R₁ + 1/R₂.' }); },
  (r) => { const k = r.pick([2, 3]);
    return m10(r, { q: `A wire is stretched to ${k} times its original length (volume constant). Its resistance becomes:`, correct: `${k * k} times`, wrong: [`${k} times`, `1/${k} times`, `${k * k * k} times`], expl: 'R = ρL/A and A falls as L rises ⇒ R ∝ L².' }); },
  (r) => { const V = r.pick([12, 24, 120, 220]), R = r.pick([2, 4, 5, 10, 20]); const Pw = V * V / R;
    return m10(r, { q: `A ${R} Ω resistor is connected across ${V} V. The power dissipated is:`, correct: u(Pw, 'W'), wrong: opts([V * R, V / R, Pw / 2], 'W'), expl: `P = V²/R = ${fmt(Pw)} W.` }); },
  (r) => { const I = r.int(1, 4), rr = r.pick([0.5, 1, 2]), R = r.int(2, 10); const E = I * (R + rr); const Vt = I * R;
    return m10(r, { q: `A cell of emf ${E} V and internal resistance ${rr} Ω is connected to a ${R} Ω resistor. Terminal voltage:`, correct: u(Vt, 'V'), wrong: opts([E, E - rr, I * rr], 'V'), expl: `I = E/(R + r) = ${fmt(I)} A; V = IR = ${fmt(Vt)} V.` }); },
  (r) => { const V = r.int(2, 12) * 2, R = r.pick([2, 4, 8]); const I = V / R;
    return m10(r, { q: `A potential difference of ${V} V is applied across ${R} Ω. The current is:`, correct: u(I, 'A'), wrong: opts([V * R, R / V, I * 2], 'A'), expl: 'I = V/R.' }); },
  (r) => { const Pw = r.pick([100, 500, 1000, 2000]), h = r.pick([2, 5, 10]), d = 30; const kwh = Pw * h * d / 1000;
    return m10(r, { q: `A ${Pw} W appliance runs ${h} h daily for 30 days. Energy consumed:`, correct: `${fmt(kwh)} kWh`, wrong: [`${fmt(Pw * h / 1000)} kWh`, `${fmt(kwh * 1000)} kWh`, `${fmt(kwh / 2)} kWh`], expl: 'E = P × t.' }); },
  (r) => p10(r, r.pick(cePool)),
];

// ---------- 11. Electromagnetism & AC ----------
const T11 = 'Electromagnetism & AC';
const m11 = mk(T11), p11 = P(T11);
const emPool = [
  { q: 'Lenz\'s law is a consequence of conservation of:', a: 'Energy', w: ['Charge', 'Momentum', 'Mass'], e: 'The induced current opposes its cause.' },
  { q: 'The magnetic force on a charge moving parallel to the magnetic field is:', a: 'Zero', w: ['Maximum', 'qvB', 'Infinite'], e: 'F = qvB sin θ with θ = 0.' },
  { q: 'A transformer works on:', a: 'AC only', w: ['DC only', 'Both AC and DC equally', 'Neither'], e: 'It needs a changing flux.' },
  { q: 'The SI unit of magnetic flux is the:', a: 'Weber', w: ['Tesla', 'Henry', 'Gauss'], e: '1 Wb = 1 T m².' },
  { q: 'In a purely inductive AC circuit, the current:', a: 'Lags the voltage by 90°', w: ['Leads the voltage by 90°', 'Is in phase with the voltage', 'Lags by 180°'], e: 'For a capacitor the current leads by 90°.' },
  { q: 'At resonance in a series RLC circuit, the impedance is:', a: 'Minimum and equal to R', w: ['Maximum', 'Zero', 'Equal to X_L + X_C'], e: 'X_L = X_C, so Z = R.' },
  { q: 'Capacitive reactance ____ as frequency increases.', a: 'Decreases', w: ['Increases', 'Stays the same', 'Becomes infinite'], e: 'X_C = 1/(2πfC).' },
  { q: 'Faraday\'s law relates induced emf to the:', a: 'Rate of change of magnetic flux', w: ['Magnetic flux itself', 'Current only', 'Resistance of the coil'], e: 'ε = −N dΦ/dt.' },
  { q: 'A moving-coil galvanometer is converted into an ammeter by connecting a:', a: 'Low resistance in parallel (shunt)', w: ['High resistance in series', 'Low resistance in series', 'High resistance in parallel'], e: 'The shunt bypasses most of the current.' },
];
const emGens = [
  (r) => { const B = r.pick([0.1, 0.2, 0.5, 1]), I = r.int(1, 10), L = r.pick([0.1, 0.2, 0.5, 1]); const F = B * I * L;
    return m11(r, { q: `A wire of length ${L} m carries ${I} A perpendicular to a ${B} T field. The force on it:`, correct: u(F, 'N'), wrong: opts([B * I / L, F * 2, B * L], 'N'), expl: 'F = BIL sin 90°.' }); },
  (r) => { const Np = r.pick([100, 200, 500, 1000]), Ns = r.pick([50, 100, 2000, 4000]), Vp = r.pick([220, 110, 240]); const Vs = Vp * Ns / Np;
    return m11(r, { q: `A transformer has ${Np} primary and ${Ns} secondary turns. With ${Vp} V input, the output voltage is:`, correct: u(Vs, 'V'), wrong: opts([Vp * Np / Ns, Vs * 2, Vp], 'V'), expl: 'Vₛ/Vₚ = Nₛ/Nₚ.' }); },
  (r) => { const B = r.pick([0.2, 0.5, 1]), L = r.pick([0.5, 1, 2]), v = r.int(2, 10); const e = B * L * v;
    return m11(r, { q: `A ${L} m rod moves at ${v} m/s perpendicular to a ${B} T field. The induced emf is:`, correct: u(e, 'V'), wrong: opts([B * v / L, e * 2, B * L], 'V'), expl: 'ε = BLv.' }); },
  (r) => { const q = '1.6 × 10⁻¹⁹'; const v = r.int(1, 9), B = r.int(1, 5); const f = v * B * 1.6;
    return m11(r, { q: `An electron moves at ${v} × 10⁶ m/s perpendicular to a ${B} T field (e = ${q} C). The force on it is:`, correct: `${fmt(f)} × 10⁻¹³ N`, wrong: [`${fmt(f)} × 10⁻¹⁹ N`, `${fmt(v * B)} × 10⁻¹³ N`, `${fmt(f / 2)} × 10⁻¹³ N`], expl: 'F = qvB.' }); },
  (r) => { const k = r.pick([2, 3, 4]);
    const which = r.pick(['L', 'C']);
    return m11(r, { q: `If the AC frequency is made ${k} times, the ${which === 'L' ? 'inductive' : 'capacitive'} reactance becomes:`, correct: which === 'L' ? `${k} times` : `1/${k} times`, wrong: which === 'L' ? [`1/${k} times`, `${k * k} times`, 'Unchanged'] : [`${k} times`, `1/${k * k} times`, 'Unchanged'], expl: 'X_L = 2πfL; X_C = 1/(2πfC).' }); },
  (r) => { const N = r.pick([50, 100, 200]), d = r.pick([0.1, 0.2, 0.5]), t = r.pick([0.1, 0.2, 0.5]); const e = N * d / t;
    return m11(r, { q: `The flux through a ${N}-turn coil changes by ${d} Wb in ${t} s. The average induced emf is:`, correct: u(e, 'V'), wrong: opts([d / t, N * d * t, e / 2], 'V'), expl: 'ε = NΔΦ/Δt.' }); },
  (r) => p11(r, r.pick(emPool)),
  (r) => p11(r, r.pick(emPool)),
];

// ---------- 12. Optics ----------
const T12 = 'Optics';
const m12 = mk(T12), p12 = P(T12);
const optPool = [
  { q: 'Total internal reflection occurs when light travels from:', a: 'A denser to a rarer medium at an angle greater than the critical angle', w: ['A rarer to a denser medium', 'A denser to a rarer medium at any angle', 'Vacuum into glass'], e: 'Both conditions are needed.' },
  { q: 'Light waves can be polarised because they are:', a: 'Transverse', w: ['Longitudinal', 'Mechanical', 'Stationary'], e: 'Only transverse waves can be polarised.' },
  { q: 'Optical fibres work on the principle of:', a: 'Total internal reflection', w: ['Diffraction', 'Polarisation', 'Dispersion'], e: 'Light is trapped in the core.' },
  { q: 'Interference requires two sources that are:', a: 'Coherent', w: ['Of different frequencies', 'Of different colours', 'Very far apart'], e: 'Constant phase difference is needed.' },
  { q: 'The image formed by a convex mirror is always:', a: 'Virtual, erect and diminished', w: ['Real and inverted', 'Virtual and magnified', 'Real and magnified'], e: 'Used as rear-view mirrors.' },
  { q: 'The power of a lens is measured in:', a: 'Dioptres', w: ['Watts', 'Metres', 'Lux'], e: 'P = 1/f with f in metres.' },
  { q: 'In Young\'s double-slit experiment, increasing the slit separation makes the fringe width:', a: 'Decrease', w: ['Increase', 'Stay the same', 'Become zero'], e: 'Fringe width = λL/d.' },
  { q: 'Splitting of white light into colours by a prism is called:', a: 'Dispersion', w: ['Diffraction', 'Polarisation', 'Interference'], e: 'Different colours have different refractive indices.' },
  { q: 'The magnifying power of a compound microscope increases when:', a: 'Focal lengths of both lenses are reduced', w: ['Focal lengths are increased', 'The tube is shortened', 'The objective is removed'], e: 'M ≈ (L/fₒ)(d/fₑ).' },
];
const optGens = [
  (r) => { const f = r.pick([10, 15, 20]), uo = f * r.pick([2, 3, 1.5]); const v = uo * f / (uo - f);
    return m12(r, { q: `An object is ${uo} cm from a convex lens of focal length ${f} cm. The image distance is:`, correct: `${fmt(v)} cm`, wrong: [`${fmt(uo * f / (uo + f))} cm`, `${fmt(uo - f)} cm`, `${fmt(v * 2)} cm`], expl: `1/f = 1/u + 1/v ⇒ v = uf/(u − f) = ${fmt(v)} cm.` }); },
  (r) => { const n = r.pick([1.5, 2, 1.25, 2.5]); const v = 3 / n;
    return m12(r, { q: `The speed of light in a medium of refractive index ${n} is (c = 3 × 10⁸ m/s):`, correct: `${fmt(v)} × 10⁸ m/s`, wrong: [`${fmt(3 * n)} × 10⁸ m/s`, '3 × 10⁸ m/s', `${fmt(v / 2)} × 10⁸ m/s`], expl: 'v = c/n.' }); },
  (r) => { const f = r.pick([0.25, 0.5, 0.2, 0.1, 2]); const conv = r.pick([true, false]); const Pw = (conv ? 1 : -1) / f;
    return m12(r, { q: `The power of a ${conv ? 'convex' : 'concave'} lens of focal length ${fmt(f * 100)} cm is:`, correct: `${fmt(Pw)} D`.replace('-', '−'), wrong: [`${fmt(-Pw)} D`.replace('-', '−'), `${fmt(f * 100)} D`, `${fmt(Pw / 100)} D`.replace('-', '−')], expl: 'P = 1/f (m); concave lenses have negative power.' }); },
  (r) => { const lam = r.pick([400, 500, 600]), L = r.pick([1, 2]), d = r.pick([0.1, 0.2, 0.5]); const y = lam * 1e-9 * L / (d * 1e-3) * 1000; // mm
    return m12(r, { q: `In Young's experiment, λ = ${lam} nm, slit separation ${d} mm and screen distance ${L} m. The fringe width is:`, correct: `${fmt(y)} mm`, wrong: [`${fmt(y * 2)} mm`, `${fmt(y / 2)} mm`, `${fmt(y * 10)} mm`], expl: `Δy = λL/d = ${fmt(y)} mm.` }); },
  (r) => { const ho = r.int(1, 5), m = r.pick([2, 3, 4]);
    return m12(r, { q: `A lens forms a real image ${m} times the size of a ${ho} cm object. If the object is ${10} cm from the lens, the image distance is:`, correct: `${10 * m} cm`, wrong: [`${fmt(10 / m)} cm`, `${10 + m} cm`, `${ho * m} cm`], expl: 'm = v/u.' }); },
  (r) => p12(r, r.pick(optPool)),
  (r) => p12(r, r.pick(optPool)),
];

// ---------- 13. Modern Physics ----------
const T13 = 'Modern & Nuclear Physics';
const m13 = mk(T13), p13 = P(T13);
const modPool = [
  { q: 'In the photoelectric effect, the maximum kinetic energy of emitted electrons depends on:', a: 'The frequency of incident light', w: ['The intensity of light', 'The exposure time', 'The area of the metal'], e: 'Kmax = hf − φ.' },
  { q: 'The number of photoelectrons emitted per second depends on:', a: 'The intensity of light (above threshold)', w: ['The frequency only', 'The work function only', 'The stopping potential'], e: 'More photons ⇒ more electrons.' },
  { q: 'Alpha particles are:', a: 'Helium nuclei', w: ['Electrons', 'Photons', 'Neutrons'], e: '⁴₂He.' },
  { q: 'In β⁻ decay, the atomic number:', a: 'Increases by 1', w: ['Decreases by 1', 'Decreases by 2', 'Stays the same'], e: 'A neutron changes into a proton.' },
  { q: 'Which radiation has the greatest penetrating power?', a: 'Gamma rays', w: ['Alpha particles', 'Beta particles', 'Protons'], e: 'γ-rays are uncharged high-energy photons.' },
  { q: 'Nuclear fusion takes place in the:', a: 'Sun and stars', w: ['Nuclear power plants on Earth', 'Atomic bombs only', 'Radioactive decay of uranium'], e: 'Hydrogen fuses into helium.' },
  { q: 'X-rays are produced when:', a: 'Fast electrons strike a heavy-metal target', w: ['Nuclei undergo alpha decay', 'Light passes through a prism', 'Electrons orbit without changing level'], e: 'Bremsstrahlung and characteristic X-rays.' },
  { q: 'The de Broglie wavelength of a particle is:', a: 'h/p', w: ['p/h', 'hp', 'h/E'], e: 'λ = h/mv.' },
  { q: 'A LASER produces light that is:', a: 'Coherent and monochromatic', w: ['Incoherent and white', 'Unpolarised and diffuse', 'Only infrared'], e: 'Stimulated emission gives coherent light.' },
  { q: 'A p-n junction diode conducts when it is:', a: 'Forward biased', w: ['Reverse biased', 'Unbiased', 'Heated to 0 K'], e: 'Forward bias lowers the potential barrier.' },
];
const modGens = [
  (r) => { const n = r.int(1, 4), T = r.pick([2, 5, 10, 20]); const frac2 = `1/${2 ** n}`;
    return m13(r, { q: `A radioactive sample has a half-life of ${T} days. The fraction remaining after ${n * T} days is:`, correct: frac2, wrong: [`1/${2 * n}`, `1/${2 ** (n + 1)}`, n > 1 ? `1/${2 ** (n - 1)}` : '1/3'], extraWrong: () => `1/${r.pick([3, 6, 10, 12, 32])}`, expl: `${n} half-lives ⇒ (1/2)^${n}.` }); },
  (r) => { const E = r.pick([4, 5, 6]), phi = r.pick([2, 2.5, 3]);
    return m13(r, { q: `Photons of energy ${E} eV fall on a metal of work function ${phi} eV. The maximum KE of photoelectrons is:`, correct: `${fmt(E - phi)} eV`, wrong: [`${fmt(E + phi)} eV`, `${fmt(E)} eV`, `${fmt(phi)} eV`], expl: 'Kmax = E − φ.' }); },
  (r) => { const n = r.int(2, 4); const E = -13.6 / (n * n);
    return m13(r, { q: `The energy of the hydrogen electron in the n = ${n} orbit is:`, correct: `${fmt(E)} eV`.replace('-', '−'), wrong: [`${fmt(-13.6 / n)} eV`.replace('-', '−'), `${fmt(-13.6 * n * n)} eV`.replace('-', '−'), `${fmt(-E)} eV`], expl: 'Eₙ = −13.6/n² eV.' }); },
  (r) => { const nuc = r.pick([['²³⁸₉₂U', 92, 146], ['²³⁵₉₂U', 92, 143], ['¹⁴₆C', 6, 8], ['⁵⁶₂₆Fe', 26, 30], ['²²⁶₈₈Ra', 88, 138], ['⁶⁰₂₇Co', 27, 33]]);
    return m13(r, { q: `The number of neutrons in ${nuc[0]} is:`, correct: nuc[2], wrong: [nuc[1], nuc[1] + nuc[2], nuc[2] - 2], expl: 'N = A − Z.' }); },
  (r) => { const A = r.pick([238, 226, 210, 232]), Z = r.pick([92, 88, 84, 90]); const t = r.pick(['α', 'β⁻']);
    const ans = t === 'α' ? `A = ${A - 4}, Z = ${Z - 2}` : `A = ${A}, Z = ${Z + 1}`;
    return m13(r, { q: `A nucleus with A = ${A}, Z = ${Z} emits one ${t} particle. The new nucleus has:`, correct: ans, wrong: t === 'α' ? [`A = ${A - 2}, Z = ${Z - 4}`, `A = ${A - 4}, Z = ${Z + 2}`, `A = ${A}, Z = ${Z - 2}`] : [`A = ${A}, Z = ${Z - 1}`, `A = ${A - 1}, Z = ${Z + 1}`, `A = ${A + 1}, Z = ${Z}`], expl: t === 'α' ? 'α: A − 4, Z − 2.' : 'β⁻: A same, Z + 1.' }); },
  (r) => { const lam = r.pick([310, 620, 413, 248]); const E = 1240 / lam;
    return m13(r, { q: `The energy of a photon of wavelength ${lam} nm is about (hc ≈ 1240 eV·nm):`, correct: `${fmt(E)} eV`, wrong: [`${fmt(E * 2)} eV`, `${fmt(lam / 1240)} eV`, `${fmt(E / 2)} eV`], expl: 'E = hc/λ.' }); },
  (r) => p13(r, r.pick(modPool)),
  (r) => p13(r, r.pick(modPool)),
];

export const PHYSICS_TOPICS = [
  { id: 'p-measure', name: T1, book: 'FSc Part I, Ch 1–2', gens: measGens, weight: 4, notes: ['7 SI base units: m, kg, s, A, K, mol, cd; everything else is derived.', 'Dimensions: [F] = MLT⁻², [E] = ML²T⁻², [P] = ML⁻¹T⁻².', 'Significant figures: leading zeros don\'t count; trailing zeros after a decimal do.', 'Uncertainty: add % uncertainties for products/quotients; multiply by the power.', 'Vectors: components F cos θ, F sin θ; resultant √(A² + B² + 2AB cos θ); |A − B| ≤ R ≤ A + B.'] },
  { id: 'p-kinematics', name: T2, book: 'FSc Part I, Ch 3', gens: kinGens, weight: 5, notes: ['v = u + at, s = ut + ½at², v² = u² + 2as.', 'v–t graph: slope = acceleration, area = displacement.', 'Projectile: T = 2u sin θ/g, H = u² sin²θ/2g, R = u² sin 2θ/g; Rmax at 45°.', 'Horizontal velocity is constant; vertical velocity is zero at the top.', 'Relative velocity: subtract for same direction, add for opposite.'] },
  { id: 'p-dynamics', name: T3, book: 'FSc Part I, Ch 3', gens: dynGens, weight: 5, notes: ['F = ma = Δp/Δt; impulse = FΔt = Δp.', 'Conservation of momentum: recoil MV = mv; perfectly inelastic V = m₁v/(m₁ + m₂).', 'Friction f = μN; μs > μk.', 'Atwood: a = (m₁ − m₂)g/(m₁ + m₂), T = 2m₁m₂g/(m₁ + m₂).', 'Elastic collision conserves momentum and KE; inelastic conserves only momentum.'] },
  { id: 'p-wep', name: T4, book: 'FSc Part I, Ch 4', gens: wepGens, weight: 5, notes: ['W = Fd cos θ; KE = ½mv²; PE = mgh.', 'Work–energy theorem: W_net = ΔKE.', 'Power P = W/t = Fv; 1 kWh = 3.6 × 10⁶ J.', 'Conservative forces: work around a closed path = 0.'] },
  { id: 'p-circular', name: T5, book: 'FSc Part I, Ch 5', gens: circGens, weight: 5, notes: ['v = rω, ω = 2π/T = 2πf, a = v²/r = rω², F = mv²/r.', 'F = Gm₁m₂/r²; g at height h: g(R/(R+h))².', 'Orbital speed √(gR) ≈ 7.9 km/s; escape speed √(2gR) ≈ 11.2 km/s.', 'Angular momentum L = Iω conserved with no external torque; geostationary period 24 h.'] },
  { id: 'p-fluids', name: T6, book: 'FSc Part I, Ch 6', gens: fluidGens, weight: 4, notes: ['P = ρgh; buoyancy F = ρVg (Archimedes).', 'Continuity A₁v₁ = A₂v₂ (conservation of mass).', 'Bernoulli P + ½ρv² + ρgh = const (energy); faster flow ⇒ lower pressure.', 'Stokes drag F = 6πηrv; terminal velocity ∝ r².'] },
  { id: 'p-waves', name: T7, book: 'FSc Part I, Ch 7–8', gens: waveGens, weight: 5, notes: ['SHM: a = −ω²x; spring T = 2π√(m/k); pendulum T = 2π√(L/g).', 'v = fλ; sound is longitudinal and needs a medium.', 'Stationary waves: node–node = λ/2; open pipe f = nv/2L, closed pipe f = (2n−1)v/4L.', 'Beats = |f₁ − f₂|; Doppler f′ = fv/(v ∓ vₛ).', 'Intensity level: 10 dB per 10× intensity.'] },
  { id: 'p-thermo', name: T8, book: 'FSc Part I, Ch 11', gens: thermoGens, weight: 4, notes: ['Gas laws: Boyle PV = const, Charles V ∝ T, PV = nRT.', 'KE per molecule (3/2)kT; v_rms ∝ √T.', 'First law Q = ΔU + W; isothermal ΔU = 0; adiabatic Q = 0.', 'Carnot efficiency η = 1 − T_c/T_h; entropy of an isolated system increases.', 'Cp − Cv = R; zeroth law defines temperature.'] },
  { id: 'p-electrostatics', name: T9, book: 'FSc Part II, Ch 12', gens: esGens, weight: 5, notes: ['F = kq₁q₂/r², k = 9 × 10⁹; E = kq/r²; V = kq/r.', 'Gauss: Φ = q/ε₀; E inside a conductor = 0.', 'Capacitors: C = εᵣε₀A/d; series 1/C = Σ1/Cᵢ; parallel C = ΣCᵢ.', 'Energy ½CV²; work W = qV; 1 eV = 1.6 × 10⁻¹⁹ J.'] },
  { id: 'p-current', name: T10, book: 'FSc Part II, Ch 13', gens: ceGens, weight: 5, notes: ['V = IR; R = ρL/A; stretching a wire k times ⇒ R × k².', 'Series R = ΣRᵢ; parallel 1/R = Σ1/Rᵢ.', 'P = VI = I²R = V²/R; energy in kWh.', 'Terminal voltage V = E − Ir.', 'Kirchhoff: junction (charge), loop (energy); Wheatstone balance P/Q = R/S.'] },
  { id: 'p-em', name: T11, book: 'FSc Part II, Ch 14–15', gens: emGens, weight: 5, notes: ['F = qvB sin θ, F = BIL sin θ; flux Φ = BA cos θ (weber).', 'Faraday ε = −NΔΦ/Δt; motional emf ε = BLv; Lenz = energy conservation.', 'Transformer Vₛ/Vₚ = Nₛ/Nₚ (AC only).', 'X_L = 2πfL, X_C = 1/2πfC; resonance X_L = X_C ⇒ Z = R.', 'Galvanometer → ammeter (low shunt in parallel), → voltmeter (high series resistance).'] },
  { id: 'p-optics', name: T12, book: 'FSc Part I, Ch 9–10', gens: optGens, weight: 4, notes: ['Lens formula 1/f = 1/u + 1/v; m = v/u; power P = 1/f (m) in dioptres.', 'n = c/v; TIR: denser → rarer and angle > critical angle; sin C = 1/n.', 'Young\'s fringe width Δy = λL/d; coherent sources needed.', 'Polarisation proves light is transverse; dispersion splits white light.'] },
  { id: 'p-modern', name: T13, book: 'FSc Part II, Ch 17–21', gens: modGens, weight: 4, notes: ['Photon E = hf = hc/λ (hc ≈ 1240 eV·nm); photoelectric Kmax = hf − φ.', 'Bohr: Eₙ = −13.6/n² eV; de Broglie λ = h/p.', 'α: A − 4, Z − 2; β⁻: Z + 1; γ: no change. Penetration γ > β > α.', 'Half-life: remaining = (1/2)ⁿ after n half-lives.', 'Fission (U-235 reactors), fusion (stars); X-rays from fast electrons on metal; diodes conduct when forward biased.'] },
];
