// El panel de administración con el mismo diseño de la plataforma de estudio (pedido del 2026-11-26: «el mismo estilo de donde se
// ven los cursos, las rutas, el gimnasio»). Las medidas salen de css/escritorio.css (menú) y css/inicio.css (portada, tarjetas, filtros).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const css = read('admin/bento.css'), app = read('css/escritorio.css'), ini = read('css/inicio.css'), panel = read('admin/panel.js');
const regla = (src, sel) => { const i = src.indexOf(`${sel} {`); assert.ok(i >= 0, `falta ${sel}`); return src.slice(i, src.indexOf('}', i)); };

test('el menú lateral mide lo mismo que el de la app', () => {
  assert.match(app, /--side: 244px/);
  assert.match(css, /body\.admin\.dentro \{[^}]*grid-template-columns: 244px/);
  const a = regla(css, '.admin.dentro .pn-nav a');
  for (const v of ['padding: 13px 14px', 'font-size: 16.5px', 'border-radius: 14px', 'gap: 14px']) assert.ok(a.includes(v), v);
  assert.match(app, /#tabbar button, body\[data-tab=clips\] #tabbar button \{[^}]*padding: 13px 14px; font-size: 16.5px/);
});

test('las tarjetas tienen las esquinas y los títulos de las tarjetas de cursos', () => {
  assert.match(ini, /\.hm \.hc-card \{[^}]*border-radius: 26px/);
  assert.match(regla(css, '.admin :is(.bx-c, .pn-card, .ini-ks)'), /border-radius: 26px/);
  assert.match(regla(css, '.admin :is(.bx-c, .pn-card) h2'), /font: 500 20px\/1\.2 var\(--display\)/);
});

test('la portada del inicio es el mismo bloque de la app (fondo azul y coral, esquinas de 28)', () => {
  assert.match(panel, /<section class="ini-hero">/);
  const h = regla(css, '.ini-hero');
  assert.match(h, /border-radius: 28px/);
  assert.match(h, /radial-gradient\(90% 130% at 100% 0, color-mix\(in srgb, var\(--brand\) 24%, var\(--card\)\)/);
});

test('los filtros son las píldoras de la app: sin borde y la elegida en azul suave', () => {
  const f = regla(css, '.admin .pn-chips span');
  assert.match(f, /border: 0/);
  assert.match(css, /\.admin \.pn-chips input:checked \+ span \{[^}]*background: color-mix\(in srgb, var\(--brand\) 18%, transparent\)/);
});
