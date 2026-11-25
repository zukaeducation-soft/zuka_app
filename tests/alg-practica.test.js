// Álgebra: siete ejercicios con escenas por lección (spec 2026-11-25-explora-algebra-trigonometria, js/alg-practica*.js).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora|alg-practica/.test(f));
const ctx = loadScripts(all), GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), K = get(ctx, 'XPK');
const L = get(ctx, 'COURSE_ALGEBRA').units.flatMap(u => u.lessons);

test('cada lección de Álgebra tiene siete ejercicios con escena, juegos distintos, pista, y cierra en movimiento', () => {
  const vistos = new Set();
  for (const l of L) {
    assert.equal(l.ex.length, 7, l.id);
    assert.equal(l.ex.at(-1).motion, true, l.id); assert.ok(GAMES[l.ex.at(-1).game].tiros, l.id);
    for (const e of l.ex) {
      assert.ok(!vistos.has(e.game), e.game); vistos.add(e.game);
      assert.equal(GAMES[e.game].xp, true, e.game); assert.ok(GUIDES[e.game], e.game);
      assert.ok(e.hint.length >= 20 && e.explain && e.q.length >= 18, e.game);
      for (const t of [e.q, e.explain, e.hint]) assert.equal((t.match(/(?<!\\)\$/g) || []).length % 2, 0, `${e.game}: ${t}`);
    }
  }
});

test('cada ejercicio se resuelve, no nace resuelto y su escena se dibuja', () => {
  for (const l of L) for (const e of l.ex) {
    const g = GAMES[e.game], p = e.params, s = g.solve(p), r = g.grade(s, p);
    assert.equal(r.ok, true, e.game); assert.equal(g.grade(g.ini(p), p).ok, false, e.game); assert.ok(!/undefined|NaN/.test(r.solution), e.game);
    const d = g.rotula ? g.fondo(K, p, 0) + g.fondo(K, p, 1) : g.figura ? g.dib(g.ini(p), K, p, 0) + g.dib(s, K, p, 1) : g.tiros ? p.tiros.map(t => g.dib(t, g.meta(t, p), K, p, 1)).join('') : '';
    assert.ok(!/NaN|undefined|Infinity/.test(d), e.game);
    if (g.figura) for (const [k, a, b, , ps] of p.ks) if (p.meta[k] != null) assert.ok(p.meta[k] >= a && p.meta[k] <= b && Math.abs(Math.round((p.meta[k] - a) / (ps || 1)) - (p.meta[k] - a) / (ps || 1)) < 1e-6, `${e.game} ${k}`);
    if (g.tiros) for (const t of p.tiros) assert.ok(t.r >= t.a && t.r <= t.b && (t.b - t.a) / p.paso <= 41, `${e.game} ${t.q}`);
    if (g.marca) assert.ok(p.casos.some(c => c[1]) && !p.casos.every(c => c[1]), e.game);
  }
});
