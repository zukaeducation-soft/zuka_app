// Panel de administración pulido con la skill unslop (pedido del 2026-11-26): un acento, color solo para estados, sin saludo,
// iniciales neutras, encabezados en minúscula y el código de acceso como firma. Spec 2026-11-26-tableros-compactos, «Pulido unslop».
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const panel = read('admin/panel.js'), css = read('admin/bento.css');
const parte = (desde, hasta) => panel.slice(panel.indexOf(desde), panel.indexOf(hasta, panel.indexOf(desde) + 1));

// El 2026-11-26 el usuario pidió que el panel siga el diseño de la plataforma de estudio, que saluda en pequeño sobre su título:
// el saludo vuelve como antetítulo y el título dice qué se ve.
test('inicio: portada como la de la app, con el saludo pequeño y el título del día', () => {
  const ini = parte('function vInicio', 'const filas = () =>');
  assert.match(ini, /<p>\$\{saludo\}, \$\{hoy\}<\/p><h1>Así va Zuka hoy<\/h1>/);
});

test('iniciales neutras: el color no sale del nombre', () => {
  assert.match(css, /\.admin \.pn-av \{[^}]*background: var\(--card2\)/);
});

test('encabezados de tabla en minúscula, sin espaciado', () => {
  assert.match(css, /\.admin \.bx-t th \{[^}]*text-transform: none[^}]*letter-spacing: 0/);
});

test('el código de acceso es la firma: una tecla con borde fino', () => {
  assert.match(css, /\.admin span\.pn-code \{[^}]*border: 1px solid var\(--line\)/);
  assert.match(parte('function vCodigos', 'function dlgMas'), /<td class="pn-main"><span class="pn-code">/);
});

test('códigos: «Activar» no repite el botón principal en cada fila', () => {
  assert.doesNotMatch(parte('function vCodigos', 'function dlgMas'), /btn small main" type="button" data-act/);
});

test('ventas: cifras en franja y meses con el mes en curso resaltado, sin verde de adorno', () => {
  const v = parte('function vVentas', '// ---------- 7.');
  assert.doesNotMatch(v, /tile\(/);
  assert.match(v, /class="ini-ks c4"/);
  assert.match(v, /iniMeses\(/);
});
