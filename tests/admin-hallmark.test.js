// Fallos de la auditoría Hallmark del panel (2026-11-26), corregidos: sin «·» uniendo datos (gate 63), colores en variables (48),
// barras sin animar su ancho (10a), el código sin letra espaciada de más (67) y los filtros guardados en la dirección.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const JS = ['admin/panel.js', 'admin/tienda.js', 'admin/instituciones.js', 'admin/tablero.js'];
const CSS = ['admin/admin.css', 'admin/panel.css', 'admin/tablero.css', 'admin/bento.css'];
// Comentarios fuera: solo cuenta el código.
const sinComentarios = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

test('63: ningún dato unido con «·» en el panel', () => {
  for (const f of JS) assert.ok(!sinComentarios(read(f)).includes(' · '), f);
});

test('48: los colores del panel salen de variables declaradas en :root', () => {
  for (const f of CSS) {
    const reglas = sinComentarios(read(f)).replace(/:root[^{]*\{[^}]*\}/g, '');
    const lit = reglas.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/gi) || [];
    assert.deepEqual(lit, [], `${f}: ${lit.join(' ')}`);
  }
  assert.match(read('admin/bento.css'), /:root \{[^}]*--pn-coral:[^}]*--pn-aviso:/);
});

test('10a: las barras del tablero crecen con transform, no con width', () => {
  const t = read('admin/tablero.css');
  assert.doesNotMatch(t, /transition: width/);
  assert.match(t, /\.tb-b i \{[^}]*transform-origin: left/);
});

test('67: el código de acceso no lleva letra espaciada de más', () => {
  for (const f of CSS) for (const m of read(f).matchAll(/letter-spacing: \.(\d+)em/g)) assert.ok(Number(`0.${m[1]}`) <= 0.03, `${f}: .${m[1]}em`);
});

test('los filtros de Estudiantes y Códigos viven en la dirección', () => {
  const p = read('admin/panel.js');
  assert.match(p, /function filtrosDeUrl/);
  assert.match(p, /function filtrosAUrl/);
  assert.match(p, /history\.replaceState/);
});
