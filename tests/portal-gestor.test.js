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
test('tableros compactos: una rejilla para Zuka y para el gestor', () => {
  for (const f of ['admin/index.html', 'instituciones/portal/index.html']) assert.match(read(f), /bento\.css/, f);
  assert.match(read('admin/panel.js'), /class="bx-c s8"><header><h2>Instituciones<\/h2>/); assert.match(read('instituciones/portal/gestor.js'), /<div class="bx">/);
  assert.match(read('admin/bento.css'), /@media \(min-width: 1180px\) \{ \.bx \{ grid-template-columns: repeat\(12/);
});
