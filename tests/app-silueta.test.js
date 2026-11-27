// Silueta de carga en la app de estudio (2026-11-26), como en el panel y el portal: la Tienda y la hoja de compra muestran la
// forma de lo que viene (tarjetas, opciones) en lugar del texto «Cargando…», que queda solo para los lectores de pantalla.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { loadScripts } = require('./load');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const sinComentarios = s => s.replace(/^\s*\/\/.*$/gm, '');
const visible = s => (s.match(/Cargando…/g) || []).length - (s.match(/<span class=\\?"sk-oculto\\?">Cargando…<\/span>/g) || []).length;

test('la Tienda y la compra no muestran «Cargando…» como texto', () => {
  for (const f of ['js/tienda.js', 'js/cuenta.js', 'js/ui.js']) assert.equal(visible(sinComentarios(read(f))), 0, f);
  assert.match(read('js/tienda.js'), /Tienda\.cargada \? '' : silueta\(/);
  assert.match(read('js/cuenta.js'), /class="compra-lista"[^`]*\$\{silueta\('opciones'/);
});

test('silueta() arma tarjetas u opciones, ocupada y con el texto escondido', () => {
  const ctx = loadScripts(['js/ui.js']);
  const t = ctx.silueta('tarjetas', 2), o = ctx.silueta('opciones', 3);
  assert.match(t, /aria-busy="true"/); assert.match(t, /sk-oculto">Cargando…/);
  assert.equal((t.match(/class="sk-tarjeta"/g) || []).length, 2);
  assert.equal((o.match(/class="sk-op"/g) || []).length, 3);
});

test('late con opacidad, quieta con «reducir movimiento», colores del tema', () => {
  const c = read('css/styles.css'), i = c.indexOf('/* Silueta de carga'), s = c.slice(i);
  assert.ok(i > 0);
  assert.match(s, /@keyframes sk-late \{[^}]*opacity/);
  assert.match(s, /prefers-reduced-motion: reduce\) \{[^}]*\.sk[^}]*animation: none/);
  assert.doesNotMatch(s.split('\n').slice(0, 20).join('\n'), /#[0-9a-f]{3,8}\b/i);
});
