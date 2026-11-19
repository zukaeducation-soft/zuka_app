// Gimnasio (spec 2026-11-19-gimnasio): retos un poco más difíciles, guiados paso a paso por un entrenador que sugiere el
// procedimiento. Reemplaza a Clips en el menú inferior.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const html = read('index.html'), sw = read('sw.js');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|gimnasio/.test(f));
const ctx = loadScripts(all);
const COURSES = get(ctx, 'COURSES'), GAMES = get(ctx, 'GAMES');
const RETOS = get(ctx, 'GYM_RETOS'), gymRetos = get(ctx, 'gymRetos'), gymOpen = get(ctx, 'gymOpen'), gymStars = get(ctx, 'gymStars');
const lessonIds = new Set(COURSES.flatMap(c => c.units.flatMap(u => u.lessons.map(l => l.id))));

// Estado correcto de cada juego que usa el Gimnasio, para ver que el paso tiene solución alcanzable con sus controles.
const SOLVE = {
  reparto: p => { const s = p.parts.reduce((a, b) => a + b, 0); return { cuts: [p.parts[0] / s, (p.parts[0] + p.parts[1]) / s] }; },
  'estira-barra': p => { for (const r of p.rounds) assert.ok(Number.isInteger(r.pct) && r.pct <= (p.max ?? 200)); return { pcts: p.rounds.map(r => r.pct) }; },
  'barra-razon': p => ({ rounds: p.rounds.map(r => { const a = r.T * r.p / (r.p + r.q); assert.ok(Number.isInteger(a) && a > 0 && a < r.T); return { a }; }) }),
  'la-obra': p => {
    const W = p.workers * p.days, w = W / p.askDays;
    assert.ok(Number.isInteger(w) && w <= p.max);
    // el calendario del juego redondea los días: con un obrero más o menos no debe verse el mismo plazo (se pondría verde)
    for (const n of [w - 1, w + 1]) assert.notEqual(Math.round(W / n), p.askDays, `la-obra: con ${n} obreros también se ven ${p.askDays} días`);
    return { workers: w };
  },
  'duplica-magnitud': p => ({ ys: p.rounds.map(r => { assert.ok(r.y1 <= r.ymax && Math.abs(r.y1 / r.step - Math.round(r.y1 / r.step)) < 1e-9); return r.y1; }) }),
  persecucion: p => ({ rounds: p.rounds.map(r => { const t = r.head / (r.v2 - r.v1); assert.ok(t <= 8 && Number.isInteger(t * 2)); return { t }; }) }),
  'trabajo-conjunto': p => ({ rounds: p.rounds.map(r => { const t = r.a * r.b / (r.a + r.b); assert.ok(t <= Math.min(r.a, r.b) && Number.isInteger(t * 2)); return { t }; }) }),
  cascada: p => { const f = p.changes.reduce((x, c) => x * (1 + c / 100), 1), single = 100 * (1 - f); assert.ok(Math.abs(single - Math.round(single)) < 1e-9, 'descuento único entero'); return { applied: p.changes.map((_, i) => i), single: Math.round(single) }; },
  'precio-original': p => ({ rounds: p.rounds.map(r => { const old = r.now / (1 + r.r / 100); assert.ok(old <= r.max && Number.isInteger(old / r.step)); return { old }; }) }),
};

test('hay retos y cada uno está completo', () => {
  assert.ok(RETOS.length >= 6);
  const ids = new Set();
  for (const r of RETOS) {
    assert.match(r.id, /^gym-/); assert.ok(!ids.has(r.id), `id repetido ${r.id}`); ids.add(r.id);
    for (const k of ['title', 'strategy', 'problem', 'answer', 'wrap']) assert.ok(typeof r[k] === 'string' && r[k].length > 4, `${r.id}.${k}`);
    assert.ok([1, 2, 3].includes(r.level), `${r.id}: nivel 1–3`);
    assert.ok(r.after.length && r.after.every(id => lessonIds.has(id)), `${r.id}: after con lecciones que existen`);
    assert.ok(r.steps.length >= 2 && r.steps.length <= 4, `${r.id}: 2 a 4 pasos`);
  }
});

test('cada paso tiene entrenador, dos ayudas, nota y un juego gráfico con pista', () => {
  for (const r of RETOS) r.steps.forEach((s, i) => {
    const w = `${r.id} paso ${i + 1}`;
    for (const k of ['title', 'coach', 'note']) assert.ok(typeof s[k] === 'string' && s[k].length > 3, `${w}.${k}`);
    assert.equal(s.hints.length, 2, `${w}: dos ayudas`);
    assert.equal(s.ex.type, 'play', `${w}: juego, no opción múltiple`);
    assert.ok(GAMES[s.ex.game], `${w}: el juego ${s.ex.game} existe`);
    assert.ok(s.ex.hint, `${w}: pista`);
    assert.ok(!['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'ordena-terminos'].includes(s.ex.game), `${w}: juego aburrido`);
  });
});

test('el entrenador orienta sin regalar el número del paso', () => {
  for (const r of RETOS) r.steps.forEach((s, i) => {
    const nums = (s.note.match(/\d[\d .]*\d|\d/g) || []).map(x => x.replace(/[ .]/g, '')).filter(x => x.length >= 2);
    const last = nums[nums.length - 1];   // la nota termina en el resultado del paso
    if (!last) return;
    const plain = t => t.replace(/[ .]/g, '');
    assert.ok(!plain(s.coach).includes(last) && !plain(s.hints[0]).includes(last), `${r.id} paso ${i + 1}: el entrenador dice ${last}`);
  });
});

test('cada paso tiene solución alcanzable con los controles del juego', () => {
  for (const r of RETOS) r.steps.forEach((s, i) => {
    const solve = SOLVE[s.ex.game];
    assert.ok(solve, `${r.id} paso ${i + 1}: falta el solucionador de ${s.ex.game} en la prueba`);
    const g = GAMES[s.ex.game].grade(solve(s.ex.params), s.ex.params);
    assert.ok(g.ok, `${r.id} paso ${i + 1}: ${s.ex.game} no se puede resolver`);
  });
});

test('los retos del curso salen agrupados y se abren con una lección hecha (o en modo revisión)', () => {
  const alg = COURSES.find(c => c.id === 'algebra');
  const list = gymRetos(alg);
  assert.ok(list.length >= 1, 'Álgebra tiene retos');
  assert.ok(list.every(g => g.unit && g.retos.length));
  const r = list[0].retos[0];
  assert.equal(gymOpen(r, {}, false), false);
  assert.equal(gymOpen(r, { [r.after[0]]: true }, false), true);
  assert.equal(gymOpen(r, {}, true), true);
  assert.equal(gymRetos({ id: 'x', units: [{ lessons: [{ id: 'nada' }] }] }).length, 0);
});

test('estrellas: 3 sin ayudas, 2 con ayudas, 1 si se mostró una solución', () => {
  assert.equal(gymStars([0, 0, 0]), 3);
  assert.equal(gymStars([0, 1, 2]), 2);
  assert.equal(gymStars([0, 3]), 1);
});

test('el menú inferior lleva Gimnasio en lugar de Clips', () => {
  assert.match(html, /<button data-tab="learn">Aprender<\/button>\s*<button data-tab="gym">Gimnasio<\/button>\s*<button data-tab="tutorias">/);
  assert.doesNotMatch(html, /data-tab="clips"/);
  assert.match(html, /<script defer src="js\/gimnasio.js"><\/script>/);
  assert.match(sw, /'js\/gimnasio.js'/);
  const app = read('js/app.js');
  assert.match(app, /gym: renderGym/);
  assert.match(app, /gym: 'gym'/);
  assert.match(read('js/pwa.js'), /'gym'/);
  assert.match(read('manifest.json'), /tab=gym/);
});
