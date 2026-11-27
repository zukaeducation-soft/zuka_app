// Láminas de la portada (2026-11-27, pedido del usuario): sin las fichas blancas que flotaban y con la lámina del Preicfes
// aunque el curso siga en borrador (entonces dice que abre pronto y no ofrece la prueba gratis).
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const { loadScripts, get } = require('./load'), read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const ctx = loadScripts(['js/marca.js', 'js/presentacion.js']), html = get(ctx, 'presentacionHTML');
const u = n => Array.from({ length: n }, () => ({ title: 'm', lessons: [1, 2] }));
const preuda = { id: 'preuda', name: 'Preuniversitario UdeA', color: '#a3e635', units: u(3) }, preicfes = { id: 'preicfes', name: 'Preicfes Saber 11', color: '#e879f9', units: u(2) };
const lamina = (h, n) => (h.match(new RegExp(`<div class="pz-lamina [^"]*"[^>]*aria-label="${n}">[\\s\\S]*?(?=<div class="pz-lamina |<div class="pz-in pz-controles)`)) || [''])[0];

test('las láminas no traen fichas flotantes', () => {
  assert.doesNotMatch(html([preuda], { todos: [preuda, preicfes] }), /pz-fichas/);
  assert.doesNotMatch(read('css/presentacion.css'), /pz-fichas/);
});

test('el Preicfes tiene su lámina y su pestaña aunque esté en borrador', () => {
  const h = html([preuda], { todos: [preuda, preicfes] }), l = lamina(h, 'Preicfes Saber 11');
  assert.ok(l, 'falta la lámina del Preicfes');
  assert.match(h, /class="pz-pto" aria-label="Saber 11, lámina/);
  assert.match(l, /Abre muy pronto/); assert.doesNotMatch(l, /Probar gratis/); assert.match(l, /Quiero inscribirme/);
  assert.match(lamina(h, 'Preuniversitario UdeA'), /Probar gratis/, 'el curso abierto sigue con la prueba');
});

test('publicado, el Preicfes queda como los demás', () => {
  const l = lamina(html([preuda, preicfes], { todos: [preuda, preicfes] }), 'Preicfes Saber 11');
  assert.match(l, /Probar gratis/); assert.doesNotMatch(l, /Abre muy pronto/);
});
