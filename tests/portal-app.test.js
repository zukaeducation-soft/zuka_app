// Portal dentro de la app y docente recortado a sus componentes (spec 2026-11-25-portal-en-la-app).
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const { loadScripts, get } = require('./load'), read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const ctx = loadScripts(['js/portal.js']), comps = get(ctx, 'portalComps'), recorta = get(ctx, 'portalRecorta');
const doc = (...c) => ({ papel: 'docente', componentes: c }), P = { rol: 'gestor' };

test('solo se recorta al docente con componentes', () => {
  assert.equal(comps(P, [doc('lectura', 'ingles')]).join(), 'lectura,ingles'); assert.equal(comps(P, [doc('lectura'), doc('lectura', 'ciencias')]).join(), 'lectura,ciencias');
  for (const [p, e] of [[P, []], [P, [doc()]], [P, [{ papel: 'gestor', componentes: ['lectura'] }]], [P, [doc('lectura'), { papel: 'gestor', componentes: [] }]], [{ rol: 'admin' }, [doc('lectura')]], [{ rol: 'estudiante' }, []], [null, []]]) assert.equal(comps(p, e), null);
});
test('el curso se recorta y vuelve entero', () => {
  const c = { blocks: [{ id: 'a' }, { id: 'b' }], units: [{ block: 'a' }, { block: 'b' }, { block: 'b' }] }, u = c.units[1];
  recorta(['b'], c); assert.equal(c.blocks.map(b => b.id).join(), 'b'); assert.equal(c.units.length, 2); assert.equal(c.units[0], u, 'mismos mundos');
  recorta(['a'], c); assert.equal(c.units.length, 1); recorta(null, c); assert.equal(c.blocks.length + c.units.length, 5);
});
test('piezas: pestaña, marco permitido y orden de carga', () => {
  const idx = read('index.html'), po = read('instituciones/portal/index.html');
  assert.match(idx, /data-tab="cursos">[^<]+<\/button>\s*<button data-tab="portal" hidden>/); assert.ok(idx.indexOf('js/portal.js') < idx.indexOf('js/app.js'));
  assert.match(read('vercel.json'), /frame-src 'self' /); assert.ok(po.indexOf('portal/vivo.js') < po.indexOf('portal/portal.js'));
  assert.match(read('instituciones/portal/portal.js'), /!MARCO && !DEMO && !INST\) \{ location\.replace\('\/\?portal'\)/);
});
