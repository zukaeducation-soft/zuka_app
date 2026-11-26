// Silueta de carga del panel (2026-11-26, pendiente de la auditoría Hallmark): mientras llega la respuesta se ve la forma
// de la vista (portada, franja de cifras y tarjetas en el inicio; encabezado y filas en las listas), no el texto «Cargando…».
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const P = read('admin/panel.js'), CSS = read('admin/bento.css');

test('carga() pinta la silueta de la vista y no el texto «Cargando…»', () => {
  const c = P.slice(P.indexOf('async function carga('), P.indexOf('async function base('));
  assert.match(c, /silueta\(/);
  assert.doesNotMatch(c, /Cargando…<\/p>/);
});

test('hay silueta de inicio (portada, cifras y tarjetas) y de lista (filas)', () => {
  const s = P.slice(P.indexOf('function silueta('), P.indexOf('async function carga('));
  assert.ok(s.length > 0, 'falta silueta()');
  for (const k of ['sk-hero', 'sk-ks', 'sk-c', 'sk-fila']) assert.ok(s.includes(k), k);
  assert.match(s, /aria-busy="true"/);
  assert.match(s, /Cargando/); // el texto queda para los lectores de pantalla
});

test('la silueta late solo con opacidad y se queda quieta con «reducir movimiento»', () => {
  assert.match(CSS, /@keyframes sk-late \{[^}]*opacity/);
  assert.doesNotMatch(CSS.slice(CSS.indexOf('@keyframes sk-late')), /@keyframes sk-late \{[^}]*(width|height|transform)/);
  assert.match(CSS, /prefers-reduced-motion: reduce\) \{[^}]*\.sk[^}]*animation: none/);
});

test('la primera pantalla del panel también abre con la silueta', () => {
  assert.match(read('admin/index.html'), /<main id="pn-view"[^>]*>.*class="sk/);
});
