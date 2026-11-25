// Tú: carné, nivel, meta, mapa de actividad y logros (spec 2026-11-25-tu).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ctx = loadScripts(['js/ui.js', 'js/perfil.js']);
const f = n => get(ctx, n);

test('el nivel sube con la XP y dice cuánto falta', () => {
  const n = f('pfNivel');
  assert.equal([0, 49, 50, 150, 299, 300].map(x => n(x).n).join(), '1,1,2,3,3,4');
  assert.equal(n(60).falta, 90); assert.ok(Math.abs(n(100).p - .5) < 1e-9);
  assert.equal(n(0).titulo, 'Aprendiz'); assert.equal(n(1e6).titulo, 'Maestro');
});
test('el mapa termina en la semana de hoy y mide cada día contra la meta', () => {
  const m = f('pfMapa')({ '2026-11-25': 30, '2026-11-24': 10 }, new Set(['2026-11-20']), new Date(2026, 10, 25)), F = f('pfFuerza');
  assert.equal(m.length, 126); assert.equal(m.filter(x => x.hoy).length, 1); assert.equal(m.find(x => x.hoy).key, '2026-11-25'); assert.equal(m[0].d.getDay(), 1);
  assert.ok(m.filter(x => x.futuro).every(x => x.key > '2026-11-25'));
  const de = k => F(m.find(x => x.key === k), 30); assert.equal([de('2026-11-25'), de('2026-11-24'), de('2026-11-20'), de('2026-11-10')].join(), '3,1,1,0');
});
test('los logros avanzan sin pasarse', () => {
  const L = f('pfLogros'), x = { hechas: 12, mundos: 1, racha: 2, xp: 10, retos: 0, estrellas: 0, examenes: 0, respondidas: 200, aciertos: 100 }, r = L(x), de = id => r.find(y => y.id === id);
  assert.ok(de('primera').ok && de('diez').ok && !de('cincuenta').ok); assert.equal(de('cincuenta').v, 12); assert.ok(de('punteria').ok);
  assert.equal(new Set(r.map(y => y.id)).size, r.length);
  assert.ok(L({}).every(y => y.v === 0 && !y.ok), 'sin datos no rompe');
});
test('registrado, el carné sobrevive a reiniciar y todo se usa sin arrastrar', () => {
  const html = read('index.html'); assert.ok(html.includes('css/perfil.css') && html.indexOf('js/perfil.js') < html.indexOf('js/app.js'));
  assert.match(read('js/app.js'), /const RESET_KEEP = \['tourDone', 'carne'/);
  for (const k of ['role="slider"', 'ArrowRight', 'aria-expanded', 'data-meta', 'inert']) assert.ok(read('js/perfil.js').includes(k), k);
});
test('el carné solo acepta colores y figuras de la lista, y el aro del plan usa sus fechas', () => {
  const c = f('pfCarne'), q = f('pfQueda');
  assert.equal(JSON.stringify(c({ pose: 'x', color: 'red;background:url(a)' })), '{"pose":"think","color":"#6fd3ff"}');
  assert.equal(c({ pose: 'cheer', color: '#b18cff' }).color, '#b18cff');
  assert.equal(q({ desde: '2026-01-01', hasta: '2026-01-31' }, { dias: 15 }), .5); assert.equal(q({ desde: '2026-01-01', hasta: null }, { dias: null }), 1); assert.equal(q({ desde: '2026-01-01', hasta: '2026-01-31' }, { dias: 0 }), 0);
});
test('el carné viaja con la cuenta y gana el último cambio', () => {
  const e = get(loadScripts(['js/estado.js']), 'estadoMezcla'), A = { carne: { color: 'a', at: 2 } }, B = { carne: { color: 'b', at: 5 } };
  assert.equal(e(A, B).carne.color, 'b'); assert.equal(e(B, A).carne.color, 'b'); assert.equal(e({}, A).carne.color, 'a');
});
