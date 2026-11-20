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
  'cinta-ecuacion': p => ({ rounds: p.rounds.map(r => {
    const xs = []; for (let x = r.lo; x <= r.hi; x++) if (r.parts.reduce((s, [c, k]) => s + c * x + k, 0) === r.total) xs.push(x);
    assert.equal(xs.length, 1, 'una sola x en el rango'); return { x: xs[0] };
  }) }),
  'despeja-x': p => ({ rounds: p.rounds.map(r => {
    const iPlus = r.cards.findIndex(([op, v]) => op === '+' && v === -r.b), iMul = r.cards.findIndex(([op, v]) => op === '×' && Math.abs(v * r.a - 1) < 1e-9);
    assert.ok(iPlus >= 0 && iMul >= 0, 'faltan tarjetas para despejar'); return { steps: [iPlus, iMul] };
  }) }),
  'edades-barras': p => ({ rounds: p.rounds.map(r => { const s = r.L * (r.k2 - 1) / (r.k1 - r.k2); assert.ok(Number.isInteger(s) && s >= 1 && s <= 20); return { s }; }) }),
  'mezcla-precio': p => ({ rounds: p.rounds.map(r => {
    const ks = []; for (let k = 0; k <= r.total; k += r.step) if (Math.abs((r.a[1] * k + r.b[1] * (r.total - k)) / r.total - r.target) < 1e-9) ks.push(k);
    assert.equal(ks.length, 1); return { ka: ks[0] };
  }) }),
  'balanza-promedio': p => ({ rounds: p.rounds.map(r => {
    const n = r.groups.reduce((a, g) => a + g.n, 0), f = r.groups.reduce((a, g) => a + g.n * g.mean, 0) / n;
    assert.ok(Number.isInteger(f * 2) && f >= r.lo && f <= r.hi, 'apoyo en la rejilla de medios'); return { f };
  }) }),
  'elimina-variable': p => ({ rounds: p.rounds.map(r => {
    const ks = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter(k => r.e1[1] + k * r.e2[1] === 0); assert.equal(ks.length, 1); return { k: ks[0] };
  }) }),
  'dos-compras': p => ({ rounds: p.rounds.map(r => {
    const sols = []; for (let a = 1; a <= r.max; a++) for (let b = 1; b <= r.max; b++) if ([r.e1, r.e2].every(e => e[0] * a + e[1] * b === e[2])) sols.push([a, b]);
    assert.equal(sols.length, 1); return { p: sols[0] };
  }) }),
  'dos-rectas': p => ({ rounds: p.rounds.map(r => {
    const sols = []; for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) if ([r.e1, r.e2].every(e => e[0] * x + e[1] * y === e[2])) sols.push({ x, y });
    assert.equal(sols.length, 1); return sols[0];
  }) }),
  // fichas de un solo uso: cada casilla toma una ficha distinta de la bandeja
  'placas-codigo': p => ({ rounds: p.rounds.map(r => {
    const used = new Set(), put = r.want.map(w => { const i = r.tray.findIndex((t, k) => t === w && !used.has(k)); used.add(i); return i; });
    assert.ok(put.every(i => i >= 0), 'faltan fichas en la bandeja'); return { put };
  }) }),
  // sellos que se pueden repetir
  'complemento-conteo': p => ({ rounds: p.rounds.map(r => {
    const pick = want => want.map(w => r.tray.indexOf(w)); const a = pick(r.all), b = pick(r.none);
    assert.ok([...a, ...b].every(i => i >= 0)); return { a, b };
  }) }),
  'factorial-cajas': p => ({ rounds: p.rounds.map(r => { let f = 1, n = 0; while (f < r.target && n < 7) f *= ++n; assert.equal(f, r.target); return { n }; }) }),
  anagramas: p => ({ rounds: p.rounds.map(r => {
    const cnt = {}; for (const c of r.word) cnt[c] = (cnt[c] || 0) + 1;
    const den = Object.values(cnt).filter(k => k > 1).sort((a, b) => a - b);
    const tray = [2, 2, 3, 3, 4]; assert.ok(den.every(k => den.filter(x => x === k).length <= tray.filter(x => x === k).length), 'fichas k! suficientes');
    return { den };
  }) }),
  'elige-comite': p => ({ rounds: p.rounds.map(r => {
    const C = (n, k) => { let c = 1; for (let i = 0; i < k; i++) c = c * (n - i) / (i + 1); return c; };
    const k = [...Array(r.n + 1).keys()].find(k => C(r.n, k) === r.ways); assert.ok(k !== undefined); return { k };
  }) }),
  'dato-faltante': p => ({ rounds: p.rounds.map(r => {
    const v = r.mean * r.data.length - r.data.reduce((a, b) => a + (b ?? 0), 0);
    assert.ok(v > 0 && v <= r.hi && Math.abs(v / r.step - Math.round(v / r.step)) < 1e-9, 'el dato que falta está en la rejilla'); return { v };
  }) }),
  'nivela-datos': p => ({ rounds: p.rounds.map(r => {
    const h = r.data.reduce((a, b) => a + b, 0) / r.data.length; assert.ok(Number.isInteger(h * 2) && h <= r.hi); return { h };
  }) }),
  'total-original': p => ({ rounds: p.rounds.map(r => {
    const left = t => r.steps.reduce((v, [n, d]) => v * (1 - n / d), t);   // todos los pasos de estos retos se aplican sobre lo que queda
    const ts = []; for (let t = r.step; t <= r.max; t += r.step) if (Math.abs(left(t) - r.left) < 1e-6) ts.push(t);
    assert.equal(ts.length, 1); return { t: ts[0] };
  }) }),
  'precio-original': p => ({ rounds: p.rounds.map(r => { const old = r.now / (1 + r.r / 100); assert.ok(old <= r.max && Number.isInteger(old / r.step)); return { old }; }) }),
};

test('hay retos y cada uno está completo', () => {
  assert.ok(RETOS.length >= 10);
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
    // El resultado del paso: el último número tras el último «=» o «→» de la nota (los miles van con espacio).
    // Una fracción a/b cuenta entera; también se busca su numerador suelto (salvo 1).
    const tail = s.note.split(/[=→]/).pop().replace(/\(.*\)/g, ''), ms = tail.match(/\d+(?: \d{3})*(?:\.\d+)?(?:\/\d+)?/g);
    if (!ms) return;
    const last = ms[ms.length - 1].replace(/ /g, ''), [num] = last.split('/');
    const esc = v => v.replace(/[./]/g, m => `\\${m}`);
    const has = (t, v) => new RegExp(`(^|[^\\d.,/])${esc(v)}(?![\\d/])`).test(t.replace(/(\d) (?=\d{3})/g, '$1'));
    const says = t => has(t, last) || (last.includes('/') && num !== '1' && has(t, num));
    for (const [k, t] of [['entrenador', s.coach], ['ayuda 1', s.hints[0]], ['pista del juego', s.ex.hint]]) {
      assert.ok(!says(t), `${r.id} paso ${i + 1}: la ${k} dice ${last}`);
    }
  });
});

test('cada paso tiene solución alcanzable con los controles del juego', () => {
  for (const r of RETOS) r.steps.forEach((s, i) => {
    // Juegos por rondas que exportan su respuesta: se usa esa (y los de deslizador revisan su rango en SOLVE).
    const own = GAMES[s.ex.game].answer && s.ex.params.rounds ? p => ({ rounds: p.rounds.map(r => GAMES[s.ex.game].answer(r)) }) : null;
    const solve = SOLVE[s.ex.game] || own;
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

test('Clips ya no está en el menú y el gimnasio se abre desde el botón flotante del curso (spec 2026-11-19-inicio-mis-cursos)', () => {
  assert.match(html, /<button data-tab="cursos">Mis cursos<\/button>\s*<button data-tab="tutorias">/);
  assert.doesNotMatch(html, /data-tab="clips"/);
  assert.match(html, /<script defer src="js\/gimnasio.js"><\/script>/);
  assert.match(sw, /'js\/gimnasio.js'/);
  const app = read('js/app.js');
  assert.match(app, /gym: renderGym/);
  assert.match(app, /gym: 'gym'/);
  assert.match(read('js/pwa.js'), /'gym'/);
  assert.match(read('manifest.json'), /tab=gym/);
});

test('Ecuaciones con contexto tiene retos en el Preuniversitario y en Álgebra', () => {
  const pu = COURSES.find(c => c.id === 'preuda'), alg = COURSES.find(c => c.id === 'algebra');
  const ids = c => gymRetos(c).flatMap(g => g.retos.map(r => r.id));
  for (const id of ['gym-hermanas', 'gym-madre', 'gym-cafe', 'gym-recibos']) assert.ok(ids(pu).includes(id), `${id} en el Preuniversitario`);
  for (const id of ['gym-hermanas', 'gym-madre', 'gym-recibos']) assert.ok(ids(alg).includes(id), `${id} en Álgebra`);
});

test('Conteo y combinatoria tiene sus retos en el Preuniversitario', () => {
  const pu = COURSES.find(c => c.id === 'preuda');
  const ids = gymRetos(pu).flatMap(g => g.retos.map(r => r.id));
  for (const id of ['gym-claves', 'gym-papaya', 'gym-comite']) assert.ok(ids.includes(id), id);
});

test('Aritmética y promedios tiene sus retos en el Preuniversitario', () => {
  const ids = gymRetos(COURSES.find(c => c.id === 'preuda')).flatMap(g => g.retos.map(r => r.id));
  for (const id of ['gym-prima', 'gym-examen', 'gym-peor']) assert.ok(ids.includes(id), id);
});

test('Azar y probabilidad tiene sus retos en el Preuniversitario', () => {
  const ids = gymRetos(COURSES.find(c => c.id === 'preuda')).flatMap(g => g.retos.map(r => r.id));
  for (const id of ['gym-dados', 'gym-urna', 'gym-adivina']) assert.ok(ids.includes(id), id);
});
