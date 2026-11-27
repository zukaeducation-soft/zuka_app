// Comprensión lectora con explicación interactiva y ejercicios sobre la hoja (spec 2026-11-24-lectura-explora): en los mundos de
// PU_LEC_EXPLORA cada lección tiene su explicación y 8 ejercicios distintos, de una ronda, en los que el texto es la escena.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT, shell } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), sw = shell();
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const exp = [...html.matchAll(/src="(js\/explora[^"]*)"/g)].map(m => m[1]).filter(f => !/voces/.test(f));
const ctx = loadScripts([...all, ...exp]);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), EXPLORA = get(ctx, 'EXPLORA'), MUNDOS = get(ctx, 'PU_LEC_EXPLORA'), HOJA = get(ctx, 'HOJA');
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => MUNDOS.includes(u.world));
const lecciones = units.flatMap(u => u.lessons), EX = lecciones.flatMap(l => l.ex.map(e => [l, e]));
const ANTES = ['pu-el-1', 'pu-el-2', 'pu-el-3'], TODAS = lecciones.map(l => l.id);
const J = x => JSON.stringify(x);

test('el mundo 1 de lectura está rehecho: explicación y 8 juegos distintos por lección, con pista', () => {
  assert.deepEqual(lecciones.slice(0, 3).map(l => l.id).join(), ANTES.join());
  for (const l of lecciones) {
    assert.ok(EXPLORA[l.id], `${l.id} sin explicación`);
    assert.equal(l.ex.length, 8, l.id);
    assert.equal(new Set(l.ex.map(e => e.game)).size, 8, `${l.id}: juego repetido`);
    for (const e of l.ex) {
      assert.equal(GAMES[e.game]?.xp, true, e.game);
      assert.ok(GUIDES[e.game]?.length, `${e.game} sin guía`);
      assert.ok(e.hint?.length > 40 && e.explain?.length > 40, `${l.id} ${e.game}`);
    }
  }
  for (const f of ['js/games/hoja-kit.js', 'js/games/lectura-escena.js', 'js/explora-lectura.js']) assert.ok(html.includes(`src="${f}"`) && sw.includes(`'${f}'`), f);
});

test('cada ejercicio: no nace listo, su solución vale, un error se puede responder y dice la solución', () => {
  for (const [l, e] of EX) {
    const g = GAMES[e.game], p = e.params, s = g.solve(p), id = `${l.id} ${e.game}`;
    assert.equal(g.listo(g.ini(p), p), false, `${id} nace listo`);
    assert.equal(g.listo(s, p), true, id);
    assert.equal(g.grade(s, p).ok, true, id);
    assert.equal(g.grade(g.ini(p), p).ok, false, id);
    const t = g.grade(s, p).solution;
    assert.ok(t.length > 8 && !/undefined|NaN|\[object/.test(t), `${id}: ${t}`);
    if (g.tipo) assert.ok(p.bien?.length > 10, `${id} sin cierre`);
  }
});

test('zonas e hilos: cada ficha tiene su aviso, la clave existe y cambiar una ficha falla', () => {
  for (const [l, e] of EX) {
    const g = GAMES[e.game], p = e.params, id = `${l.id} ${e.game}`;
    if (!['zonas', 'hilos'].includes(g.tipo)) continue;
    const lista = p.fichas || p.tarjetas;
    assert.equal(p.va.length, lista.length, id);
    assert.equal(p.mira.length, lista.length, `${id}: un aviso por ficha`);
    assert.ok(p.mira.every(m => m.length > 12), id);
    assert.equal(new Set(lista).size, lista.length, id);
    if (g.tipo === 'zonas') {
      const ocupadas = new Set(p.va.filter(v => v != null).map(HOJA.base));
      if (!g.varias) assert.equal(ocupadas.size, p.va.filter(v => v != null).length, `${id}: dos fichas en un hueco`);
      for (const z of ocupadas) assert.ok(g.rot(p, z), `${id}: zona ${z} sin rótulo`);
      const s = g.solve(p); const a = p.va.findIndex(v => v != null), b = p.va.findIndex((v, i) => i !== a && v !== p.va[a]);
      const en = [...s.en]; [en[a], en[b]] = [en[b], en[a]];
      assert.equal(g.grade({ en }, p).ok, false, `${id}: dos fichas cambiadas`);
    } else {
      const n = g.destinos(p);
      p.va.forEach(v => [].concat(v).forEach(d => assert.ok(d >= 0 && d < n, `${id}: destino ${d}`)));
      assert.equal(g.grade({ a: p.va.map(v => (HOJA.base(v) + 1 < n ? HOJA.base(v) + 1 : 0)) }, p).ok, false, id);
    }
  }
});

test('subrayar y tachar: las claves existen, cada trampa tiene su aviso y `n` es cuántas van', () => {
  for (const [l, e] of EX) {
    const g = GAMES[e.game], p = e.params, id = `${l.id} ${e.game}`;
    if (g.tipo !== 'toca') continue;
    const k = [...g.claves(p)], va = p.va.map(String);
    assert.ok(va.every(x => k.includes(x)), `${id}: ${va} en ${k}`);
    assert.equal(p.n, va.length, id);
    assert.ok(k.length >= va.length + 2, `${id}: pocas para escoger`);
    for (const x of k.filter(x => !va.includes(x))) assert.ok(p.mira[x]?.length > 12, `${id}: sin aviso en ${x}`);
  }
});

test('mover tiras: el orden inicial es una permutación que no está resuelta y deja quietas las fijas', () => {
  for (const [l, e] of EX) {
    const g = GAMES[e.game], p = e.params, id = `${l.id} ${e.game}`;
    if (g.tipo !== 'ordena') continue;
    const n = g.tiras(p).length;
    assert.equal([...p.ini].sort((a, b) => a - b).join(), Array.from({ length: n }, (_, i) => i).join(), id);
    for (let i = 0; i < (p.fija || 0); i++) assert.equal(p.ini[i], i, id);
    assert.ok(p.ini.filter((x, i) => x !== i).length >= 3, `${id}: casi resuelto`);
    assert.equal(p.mira.length, n, id);
    for (let i = p.fija || 0; i < n; i++) assert.ok(p.mira[i].length > 12, `${id} ${i}`);
  }
});

test('lo que se enciende y las tiras del texto están literalmente en su párrafo', () => {
  const docs = Object.fromEntries(EX.filter(([, e]) => e.params.doc?.paras).map(([l, e]) => [l.id, e.params.doc]));
  for (const [l, e] of EX) {
    const p = e.params;
    for (const [n, t] of p.luz || []) assert.ok((p.doc.paras[n - 1] || '').includes(t), `${l.id} ${e.game}: «${t}» no está en ¶${n}`);
    if (e.game === 'ordena-texto') p.tiras.forEach((t, i) => t.split(/(?<=\.) /).forEach(o => assert.ok(docs[l.id].paras.join(" ").includes(o.replace(/\.$/, '')), `${l.id}: «${o}»`)));
  }
  for (const id of TODAS) {
    const n = docs[id].paras.join(' ').split(/\s+/).length;
    assert.ok(n >= 330 && n <= 560, `${id}: ${n} palabras`);
  }
});

test('la explicación no usa los textos de los ejercicios ni de la evaluación, y no pone opción múltiple', () => {
  const t = J(TODAS.map(id => EXPLORA[id])).toLowerCase();
  for (const x of ['garza', 'sabaleta', 'guitarra', 'gafas', 'chiva', 'licuadora', 'busetas', 'partera']) assert.ok(!t.includes(x), x);
  for (const x of ['decibel', 'volcán', 'panela', 'fiado', 'armero', 'biblioteca', 'tendero']) assert.ok(!t.includes(x), x);
  for (const [l, e] of EX) assert.ok(!['pregunta-examen', 'opcion-examen'].includes(e.game), l.id);
});

test('lo que evalúan los ejercicios se enseñó: bordes, fuentes, comienzos, conectores, adornos, orden y deducir', () => {
  const t = id => J(EXPLORA[id]);
  assert.match(t('pu-el-1'), /autor/); assert.match(t('pu-el-1'), /informe/i); assert.match(t('pu-el-1'), /comienzo de cada párrafo/);
  for (const c of ['Sin embargo', 'Además', 'Por eso', 'detalle', 'título', 'adorno']) assert.match(t('pu-el-2'), new RegExp(c, 'i'), c);
  for (const c of ['EXCEPTO', 'otro párrafo', 'deduc', 'marca', 'repas']) assert.match(t('pu-el-3'), new RegExp(c, 'i'), c);
});

test('pintar con marcadores: una pluma por línea, con aviso, y se usan todas', () => {
  const P = EX.filter(([, e]) => GAMES[e.game].tipo === 'pinta');
  assert.ok(P.length >= 3);
  for (const [l, e] of P) {
    const p = e.params;
    assert.equal(p.va.length, p.lineas.length, l.id); assert.equal(p.mira.length, p.lineas.length, l.id);
    assert.equal(new Set(p.va).size, p.plumas.length, `${l.id}: pluma sin usar`);
    assert.ok(p.mira.every(m => m.length > 12));
  }
});

test('reglas: cada fila tiene tres topes o más, empieza lejos y trae su aviso', () => {
  for (const [l, e] of EX.filter(([, e]) => GAMES[e.game].tipo === 'regla')) for (const [i, f] of e.params.filas.entries()) {
    assert.ok(f.topes.length >= 3, l.id); assert.notEqual(GAMES[e.game].inicio(f), f.va, l.id); assert.ok(e.params.mira[i].length > 12, l.id);
  }
});

test('cambia-palabra: la frase está literal en su párrafo', () => {
  for (const [l, e] of EX.filter(([, e]) => e.game === 'cambia-palabra')) for (const [n, a, w, b] of e.params.frases)
    assert.ok(e.params.doc.paras[n - 1].includes(a + w + b), `${l.id}: ${a}${w}${b}`);
});

test('mundo 2: las tipologías, los géneros y el testimonio se enseñaron', () => {
  const t = id => J(EXPLORA[id]);
  for (const c of ['narra', 'describ', 'explic', 'argument', 'debería', 'predomina']) assert.match(t('pu-tt-1'), new RegExp(c, 'i'), c);
  for (const c of ['entrevista', 'crónica', 'divulga', 'testimonio', 'opinión', 'raya', 'dos puntos', 'apunta']) assert.match(t('pu-tt-2'), new RegExp(c, 'i'), c);
  for (const c of ['tesis', 'contraargumento', 'oral', 'uno', 'cita', 'retórica']) assert.match(t('pu-tt-3'), new RegExp(c, 'i'), c);
});

test('reparte-tiempo: hay varios repartos buenos y llenar todo el tiempo falla', () => {
  const p = EX.find(([, e]) => e.game === 'reparte-tiempo')[1].params, g = GAMES['reparte-tiempo'];
  for (const [l, q, ok] of [[4, 12, true], [5, 13, true], [6, 12, true], [4, 16, false], [2, 14, false], [6, 13, false], [8, 10, false]]) assert.equal(g.grade({ l, q }, p).ok, ok, `${l}+${q}`);
});

test('escena «hoja» de la explicación: subrayar, tachar y margen', () => {
  const X = get(ctx, 'XP').hoja, m = { modo: 'margen', paras: [['a'], ['b']], rotulos: ['x', 'y'], meta: [1, 0] };
  assert.equal(X.ok({ n: [1, 0] }, m), true); assert.equal(X.ok({ n: [0, 1] }, m), false);
  assert.equal(X.ok({ m: ['t', '2'] }, { modo: 'toca', meta: [2, 't'], paras: [] }), true);
  for (const id of TODAS) for (const p of EXPLORA[id].pasos.filter(p => p.tipo === 'hoja')) {
    const total = p.paras.flat().length;
    if (p.modo !== 'margen') for (const k of p.meta) assert.ok('tafd'.includes(k) || k < total, `${id}: trozo ${k}`);
    assert.ok(p.pista?.length > 30, `${id}: sin pista`);
  }
});
