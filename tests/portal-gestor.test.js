// Lo que ve el gestor (spec 2026-11-26-portal-gestor).
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
test('menú por secciones, resumen nuevo y vistas del gestor en su archivo', () => {
  const g = read('instituciones/portal/gestor.js'), p = read('instituciones/portal/portal.js'), h = read('instituciones/portal/index.html');
  for (const s of ['Personas', 'Aprendizaje', 'Preicfes', 'Institución']) assert.ok(g.includes(`['${s}'`), s);
  assert.match(p, /V = \{ resumen: vPanorama,/); assert.doesNotMatch(p, /function vResumen\(|function vContrato\(|function vEquipo\(/);
  assert.match(read('instituciones/portal/vivo.js'), /secciones\(ops\)/); assert.ok(h.indexOf('portal/gestor.js') < h.indexOf('portal/portal.js'));
  assert.match(g, /function pasosGestor\(c\)/);
});
