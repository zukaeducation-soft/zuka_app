// Inicio del panel de administración como tablero sobrio (spec 2026-11-26-tableros-compactos, sección «Inicio sobrio»).
// Pedido del 2026-11-26: compactar la información como en un tablero de referencia y que «no parezca hecho por IA».
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');

const panel = read('admin/panel.js');
const ini = panel.slice(panel.indexOf('function vInicio'), panel.indexOf('const filas = () =>'));
const css = read('admin/bento.css');

test('inicio: sin arcoíris de colores ni cuadros de icono rellenos', () => {
  assert.doesNotMatch(ini, /#[0-9a-f]{6}/i, 'ningún color fijo: el acento es --brand y los estados usan ok / bad / gold');
  assert.doesNotMatch(ini, /bx-atajos|bxK\(/, 'ni la fila de atajos de colores ni los indicadores con icono de color');
});

test('inicio: las cifras van en una sola franja partida por líneas finas', () => {
  assert.match(ini, /class="ini-ks s12"/);
  assert.equal((ini.match(/iniK\(/g) || []).length, 6, 'seis cifras');
  assert.match(css, /\.ini-ks \{[^}]*gap: 1px[^}]*background: var\(--line\)/, 'las líneas son el hueco de 1 px sobre el color de línea');
});

test('inicio: «Por atender» es una lista compacta al lado de la gráfica', () => {
  assert.match(ini, /<section class="bx-c s8"><header><h2>Minutos de estudio por día<\/h2>[\s\S]*<section class="bx-c s4 ini-pend"><header><h2>Por atender<\/h2>/);
  for (const k of ['solicitudes', 'pedidos', 'asesorias', 'instituciones']) assert.match(ini, new RegExp(`\\['${k}'`), k);
});

test('inicio: buscador de estudiantes que lleva a la lista con el texto puesto', () => {
  assert.match(ini, /data-buscar/);
  assert.match(ini, /fil\.q = [^;]+; location\.hash = 'estudiantes'/);
});

test('inicio: la gráfica marca hoy y tiene líneas de referencia', () => {
  assert.match(panel, /function iniBarras/);
  assert.match(css, /\.ini-barras i\.hoy/);
  assert.match(css, /\.ini-graf/);
});
