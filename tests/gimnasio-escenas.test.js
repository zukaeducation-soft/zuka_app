// Gimnasio del Preuniversitario con escenas (spec 2026-11-25-gimnasio-escenas): todos los mundos de Razonamiento lógico y de
// Comprensión lectora tienen un reto de Fuerza y uno de Élite, y todos sus pasos son ejercicios dibujados (los de las lecciones).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|conceptos|gimnasio/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), gymRetos = get(ctx, 'gymRetos'), HOJA = get(ctx, 'HOJA');
const PU = get(ctx, 'COURSES').find(c => c.id === 'preuda'), grupos = gymRetos(PU), RETOS = grupos.flatMap(g => g.retos);
const PASOS = RETOS.flatMap(r => r.steps.map((s, i) => [`${r.id} paso ${i + 1}`, s.ex]));

test('cada mundo tiene un reto de Fuerza y uno de Élite', () => {
  for (const u of PU.units) {
    const ids = u.lessons.map(l => l.id), n = RETOS.filter(r => r.after.some(a => ids.includes(a))).map(r => r.level);
    assert.ok(n.includes(2) && n.includes(3), `${u.world}: ${n}`);
  }
  assert.equal(RETOS.length, 2 * PU.units.length);
});

test('todos los pasos son ejercicios dibujados, con guía, solución que vale y sin nacer resueltos', () => {
  for (const [id, e] of PASOS) {
    const g = GAMES[e.game], p = e.params;
    assert.equal(g?.xp, true, `${id}: ${e.game}`);
    assert.ok(GUIDES[e.game]?.length, `${id}: sin guía`);
    assert.equal(g.grade(g.solve(p), p).ok, true, id);
    assert.equal(g.grade(g.ini(p), p).ok, false, id);
    const t = g.grade(g.solve(p), p).solution;
    assert.ok(t.length >= 1 && !/undefined|NaN|\[object/.test(t), `${id}: ${t}`);
    if (g.tipo === 'zonas' || g.tipo === 'hilos') { const l = p.fichas || p.tarjetas; assert.equal(p.va.length, l.length, id); assert.equal(p.mira.length, l.length, id); }
    if (g.tipo === 'pinta') { assert.equal(p.va.length, p.lineas.length, id); assert.equal(p.mira.length, p.lineas.length, id); assert.equal(new Set(p.va).size, p.plumas.length, id); }
    for (const [n, t] of p.luz || []) assert.ok((p.doc.paras[n - 1] || '').includes(t), `${id}: «${t}»`);
    for (const [n, a, w, b] of p.frases || []) assert.ok(p.doc.paras[n - 1].includes(a + w + b), `${id}: ${a}${w}${b}`);
    if (p.metas && p.fichas) for (const m of p.metas) assert.ok(p.fichas.filter(f => f === m).length >= p.metas.filter(x => x === m).length, `${id}: falta la ficha ${m}`);
  }
});

test('los pasos no repiten los números de los ejercicios de las lecciones', () => {
  const s = p => JSON.stringify(p, (k, v) => (['mira', 'trampas', 'ok', 'bien'].includes(k) ? undefined : v));
  const L = new Set(PU.units.flatMap(u => u.lessons.flatMap(l => l.ex.map(e => `${e.game}${s(e.params)}`))));
  for (const [id, e] of PASOS) assert.ok(!L.has(`${e.game}${s(e.params)}`), `${id} repite ${e.game}`);
});
