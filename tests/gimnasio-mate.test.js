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

const CUR = ['algebra', 'trig'].map(id => get(ctx, 'COURSES').find(c => c.id === id));
test('Álgebra y Trigonometría: cada mundo tiene un reto de Fuerza y uno de Élite con escenas, que se resuelven y no repiten un ejercicio', () => {
  for (const C of CUR) {
    const R = gymRetos(C).flatMap(g => g.retos).filter(r => /^gym-m-/.test(r.id)), L = new Set(C.units.flatMap(u => u.lessons.flatMap(l => l.ex.map(e => e.game + JSON.stringify(e.params.metas || e.params.meta || e.params)))));
    for (const u of C.units) { const ids = u.lessons.map(l => l.id), n = R.filter(r => r.after.some(a => ids.includes(a))).map(r => r.level); assert.ok(n.includes(2) && n.includes(3), u.world); }
    for (const r of R) for (const { ex } of r.steps) {
      const g = GAMES[ex.game], p = ex.params;
      assert.equal(g?.xp, true, r.id + ' ' + ex.game); assert.ok(GUIDES[ex.game]);
      assert.equal(g.grade(g.solve(p), p).ok, true, r.id); assert.equal(g.grade(g.ini(p), p).ok, false, r.id);
      assert.ok(!/undefined|NaN/.test(g.grade(g.solve(p), p).solution), r.id);
      assert.ok(!L.has(ex.game + JSON.stringify(p.metas || p.meta)), r.id + ' repite');
    }
  }
});
