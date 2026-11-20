// Zuka en computador: barra de navegación arriba, contenido centrado y video vertical con paneles (spec 2026-11-20-escritorio).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const ctx = loadScripts(['js/escritorio.js']);
const tramos = get(ctx, 'leccionTramos'), lados = get(ctx, 'leccionLadosHTML');
const queue = [{ k: 'clip', n: 0 }, { k: 'ex', i: 0 }, { k: 'ex', i: 1 }, { k: 'clip', n: 1 }, { k: 'ex', i: 2 }];

test('el recorrido junta los ejercicios seguidos y marca hecho, actual y siguiente', () => {
  const r = tramos(queue, 3);
  assert.equal(JSON.stringify(r.map(x => [x.k, x.n, x.state])), JSON.stringify([['clip', 1, 'done'], ['ex', 2, 'done'], ['clip', 1, 'now'], ['ex', 1, 'next']]));
  assert.equal(tramos(queue, 0)[0].state, 'now');
});

test('los paneles dicen qué lección es, la parte del video y el recorrido', () => {
  const c = { id: 'algebra', name: 'Álgebra', units: [{ world: 'w', title: 'Mundo', lessons: [] }] };
  const l = { id: 'x', title: 'Conjuntos <y> notación' };
  c.units[0].lessons.push(l);
  const h = lados(c, l, queue, 3, 1, { duration: 212 });
  for (const t of ['Álgebra', 'Conjuntos &lt;y&gt; notación', 'Parte 2 de 2', '4 min', 'Tu recorrido', '2 ejercicios', 'Video · parte 2', 'data-ls-skip']) assert.ok(h.includes(t), t);
});

test('solo cambia desde 1000 px: el celular queda igual', () => {
  const css = read('css/escritorio.css');
  const fuera = css.replace(/@media \(min-width: 1000px\)[^]*$/, '');
  assert.match(fuera, /^[^{]*\.tb-logo-d, \.ls-sides \{ display: none; \}/m);
  assert.doesNotMatch(fuera.replace(/\.tb-logo-d, \.ls-sides \{ display: none; \}/, ''), /\{/, 'fuera del bloque de escritorio no hay más reglas');
  assert.match(read('js/escritorio.js'), /const ESCRITORIO_MIN = 1000;/);
});

test('barra de escritorio con el logo y el menú arriba; el video con paneles a los lados', () => {
  const css = read('css/escritorio.css'), app = read('js/app.js');
  assert.match(css, /#tabbar, body\[data-tab=clips\] #tabbar \{\s*position: fixed; top: 0;/);
  assert.match(css, /--tabbar-h: 0px !important/);
  assert.match(css, /\.lesson\.clip-mode \{ --clipw: min\(calc\(\(100dvh - 120px\) \* 9 \/ 16\), calc\(100vw - 760px\)\)/);
  assert.match(app, /class="tb-logo-d"[^`]*data-home/);
  assert.match(app, /<div class="ls-sides"><\/div>/);
  assert.match(app, /leccionLados\(root, c, l, queue, review >= 0 \? reviewPos : pos, n, clips\[n\]\);/);
});

test('en el computador la entrada es una ventana sobre la presentación', () => {
  assert.match(read('js/presentacion.js'), /const encima = esEscritorio\(\);\r?\n    if \(!encima\) presentacionCerrar\(\);/);
  assert.match(read('css/escritorio.css'), /#auth \{ z-index: 37;/);
});

test('va registrado', () => {
  const idx = read('index.html'), sw = read('sw.js');
  assert.match(idx, /<link rel="stylesheet" href="css\/escritorio\.css">/);
  assert.ok(idx.indexOf('js/escritorio.js') > idx.indexOf('js/presentacion.js') && idx.indexOf('js/escritorio.js') < idx.indexOf('js/app.js'));
  assert.ok(sw.includes("'js/escritorio.js'") && sw.includes("'css/escritorio.css'"));
});

test('arriba va el nombre «Zuka» en letra, sin el cerebro de puntos', () => {
  const pz = read('js/presentacion.js');
  assert.match(pz, /const zukaWord = \(\) => '<span class="zk-word">Zuka<\/span>';/);
  assert.match(pz, /const logo = zukaWord\(\);/);
  assert.match(read('js/cuenta.js'), /<div class="auth-brand">\$\{zukaWord\(\)\}<\/div>/);
  assert.match(read('js/app.js'), /data-home aria-label="Ir al inicio">\$\{zukaWord\(\)\}<\/button>/);
  assert.match(read('css/presentacion.css'), /\.zk-word \{ font-family: var\(--display\); font-weight: 600;/);
});

test('en el computador el juego se dibuja con ancho de celular y se agranda para llenar el espacio', () => {
  const k = loadScripts(['js/games/kit.js']);
  const zoom = get(k, 'zoomScale');
  assert.equal(get(k, 'DESK_W'), 480);
  assert.equal(zoom(480, 400, 800, 1000), 800 / 480);
  assert.equal(zoom(480, 400, 800, 500), 500 / 400);
  assert.equal(zoom(480, 400, 2000, 2000), 2);
  assert.equal(zoom(480, 400, 800, 100), 0.66);
  assert.match(read('css/escritorio.css'), /\.lesson:not\(\.clip-mode\) \.practice > \.ex-area \{ grid-column: 2; grid-row: 1 \/ span 3; \}/);
  assert.match(read('js/games/kit.js'), /k = deskGame\(\) \? zoomScale\(size\.w, size\.h, host\.clientWidth, room\) : fitScale\(size\.h, room\);/);
});
