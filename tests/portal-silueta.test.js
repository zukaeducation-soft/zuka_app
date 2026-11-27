// Silueta de carga en el portal de instituciones (2026-11-26), como en el panel de Zuka: mientras llegan los datos se ve la forma
// de lo que viene, no el texto «Cargando…» (que queda solo para los lectores de pantalla).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const H = read('instituciones/portal/index.html'), P = read('instituciones/portal/portal.js'), D = read('instituciones/portal/docente.js');
// «Cargando…» a la vista: dentro de un párrafo o como texto suelto, no dentro de .pn-oculto.
const visible = t => { const s = t.replace(/^\s*\/\/.*$/gm, ''); return (s.match(/Cargando…/g) || []).length - (s.match(/<span class=\\?"pn-oculto\\?">Cargando…<\/span>/g) || []).length; };

test('el portal abre con la silueta del resumen', () => {
  assert.match(H, /<main id="pn-view"[^>]*><div class="sk" aria-busy="true">/);
  assert.match(H, /class="bx"><div class="sk-c s8">/);
  assert.equal(visible(H), 0);
});

test('portal y docente no muestran «Cargando…» como texto', () => {
  assert.equal(visible(P), 0, 'portal.js');
  assert.equal(visible(D), 0, 'docente.js');
  assert.match(P, /const skFilas = /);
  assert.match(D, /skFilas\(/);
});

test('el portal carga la versión de bento.css que trae la silueta', () => {
  assert.match(read('admin/bento.css'), /@keyframes sk-late/);
  const v = H.match(/admin\/bento\.css\?v=(\d+)/)[1], va = read('admin/index.html').match(/bento\.css\?v=(\d+)/)[1];
  assert.equal(v, va);
});
