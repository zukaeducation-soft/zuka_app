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
  assert.match(fuera, /^[^{]*\.tb-logo-d, \.tb-admin, \.ls-sides, \.xp-riel, \.dk \{ display: none; \}/m);
  assert.doesNotMatch(fuera.replace(/\.tb-logo-d, \.tb-admin, \.ls-sides, \.xp-riel, \.dk \{ display: none; \}/, '').replace('.tb-pie, .pf-side, .pf-main, .cv-side, .cv-main { display: contents; }', ''), /\{/, 'fuera del bloque de escritorio no hay más reglas');
  assert.match(read('js/escritorio.js'), /const ESCRITORIO_MIN = 1000;/);
});

test('menú de escritorio a la izquierda, con el logo y quien administra; el video con paneles a los lados', () => {
  const css = read('css/escritorio.css'), app = read('js/app.js');
  assert.match(css, /#tabbar, body\[data-tab=clips\] #tabbar \{\s*position: fixed; left: 0; top: 92px; width: var\(--side\);/);
  assert.match(css, /--tabbar-h: 0px !important/);
  assert.match(css, /\.lesson\.clip-mode \{ --clipw: min\(calc\(\(100dvh - 120px\) \* 9 \/ 16\), calc\(100vw - 760px\)\)/);
  assert.match(css, /#app \{[^}]*padding-left: var\(--side\)/);
  assert.match(app, /cuentaEsAdmin\(\) \? `<a class="tb-admin" href="admin\/">/);
  assert.match(app, /class="tb-logo-d"[^`]*data-home/);
  assert.match(app, /<div class="ls-sides"><\/div>/);
  assert.match(app, /leccionLados\(root, c, l, queue, review >= 0 \? reviewPos : pos, n, clips\[n\]\);/);
});

test('en el computador la entrada es una ventana sobre la presentación', () => {
  assert.match(read('js/presentacion.js'), /const encima = esEscritorio\(\);\r?\n    if \(!encima\) presentacionCerrar\(\);/);
  assert.match(read('css/escritorio.css'), /#auth \{ z-index: 37;/);
});

test('va registrado', () => {
  const idx = read('index.html'), sw = require('./load').shell();
  assert.match(idx, /<link rel="stylesheet" href="css\/escritorio\.css">/);
  assert.ok(idx.indexOf('js/escritorio.js') > idx.indexOf('js/presentacion.js') && idx.indexOf('js/escritorio.js') < idx.indexOf('js/app.js'));
  assert.ok(sw.includes("'js/escritorio.js'") && sw.includes("'css/escritorio.css'"));
});

test('arriba va el logo: el cerebro de un trazo y ZUKA (spec 2026-11-24-logo-nuevo)', () => {
  const pz = read('js/presentacion.js');
  assert.match(pz, /const zukaWord = \(\) => logoHTML\(\);/);
  assert.match(pz, /const logo = zukaWord\(\);/);
  assert.match(read('js/cuenta.js'), /<div class="auth-brand">\$\{zukaWord\(\)\}<\/div>/);
  assert.match(read('js/app.js'), /data-home aria-label="Ir al inicio">\$\{zukaWord\(\)\}<\/button>/);
  assert.doesNotMatch(read('css/presentacion.css'), /zk-word/);
});

test('en el computador el juego se dibuja con ancho de celular y se agranda para llenar el espacio', () => {
  const k = loadScripts(['js/games/kit.js']);
  const zoom = get(k, 'zoomScale');
  assert.equal(get(k, 'DESK_W'), 380);
  assert.equal(zoom(480, 400, 800, 1000), 800 / 480);
  assert.equal(zoom(480, 400, 800, 500), 500 / 400);
  assert.equal(zoom(480, 400, 2000, 2000), 2);
  assert.equal(zoom(480, 400, 800, 100), 0.66);
  assert.match(read('css/escritorio.css'), /\.lesson:not\(\.clip-mode\) \.practice > \.ex-area \{ grid-column: 2; grid-row: 1 \/ span 3; \}/);
  assert.match(read('js/games/kit.js'), /k = deskGame\(\) \? zoomScale\(size\.w, size\.h, host\.clientWidth, room\) : fitScale\(size\.h, room\);/);
});

test('Preuniversitario en portátil: «Comprobar» bajo el enunciado y, en lectura, el texto a la izquierda y la actividad a la derecha', () => {
  const css = read('css/escritorio.css');
  assert.match(css, /\.lesson:has\(\.lesson-body > \.practice\):not\(:has\(\.lec\)\):not\(\.clip-mode\) \.lesson-foot \{\s*position: absolute;/);
  assert.match(css, /\.practice:has\(\.lec\) > \.ex-area > \.play, \.lesson:not\(\.clip-mode\) \.practice \.lec \{ display: contents; \}/);
  assert.match(css, /\.practice \.lec-play \{ position: absolute; top: 0; right: 0; bottom: 0;/);
  assert.match(css, /\.ex-area:not\(:has\(canvas\)\):not\(:has\(\.lec\)\) \{ zoom: 1\.18; \}/);
});

// ---- explicación interactiva en computador (spec 2026-11-24-explora-escritorio) ----
test('riel de capítulos: avance de cada uno y a cuáles se puede volver', () => {
  const f = get(ctx, 'exploraCapitulos'), pasos = [{ cap: 0 }, { cap: 0 }, { cap: 1 }, { cap: 2 }];
  assert.equal(JSON.stringify(f(['A', 'B', 'C'], pasos, [true, true])), JSON.stringify([{ t: 'A', hecho: 1, ir: 0 }, { t: 'B', hecho: 0, ir: 2 }, { t: 'C', hecho: 0, ir: null }]));
  assert.equal(f(['A', 'B', 'C'], pasos, [true])[1].ir, null, 'no se salta a un capítulo sin terminar el anterior');
});

test('la escena cabe: su alto nunca pasa de 2/5 de la ventana y no se deforma', () => {
  const w = get(ctx, 'exploraAncho');
  for (const alto of [760, 820, 1000, 1200]) for (const r of [340 / 156, 340 / 224, 340 / 100, 1.2]) {
    const x = w(r, alto);
    assert.ok(x <= 760 && x >= 300, `${r} ${alto}`);
    if (x > 300) assert.ok(x / r <= alto * 0.4 + 1, `${r} ${alto}: ${x / r}`);
  }
});

test('la explicación avisa al riel y el aviso del ejercicio no tapa la escena en computador', () => {
  assert.match(read('js/explora.js'), /exploraRiel\(root, \{/);
  const css = read('css/escritorio.css').replace(/\r\n/g, '\n');
  assert.match(css, /\.explora \{\n\s*max-width: 1240px; display: grid;/);
  assert.match(css, /\.feedback \{\n\s*left: calc\(50% - var\(--pw\) \/ 2 - 12px\); right: auto;/);
});

test('la semana va de lunes a domingo y enciende los días con actividad', () => {
  const c2 = loadScripts(['js/ui.js', 'js/escritorio.js']), semana = get(c2, 'dkSemana'), dayKey = get(c2, 'dayKey');
  const lunes = dayKey(new Date(2026, 10, 16)), s = semana({ has: k => k === lunes }, new Date(2026, 10, 22));
  assert.equal(s.map(x => x.l).join(''), 'LMXJVSD');
  assert.equal(s.map(x => +x.lit).join(''), '1000000');
  assert.equal(s.findIndex(x => x.today), 6);
});

test('el avance va por componente o, sin componentes, por mundos completos', () => {
  const tr = get(ctx, 'dkTramos'), u = (b, ...ids) => ({ block: b, lessons: ids.map(id => ({ id })) }), hecha = l => l.id < 3;
  assert.equal(JSON.stringify(tr({ units: [u(0, 1, 2), u(0, 3)] }, hecha).map(t => [t.d, t.n])), '[[1,2]]');
  assert.equal(JSON.stringify(tr({ blocks: [{ id: 'a', name: 'A' }, { id: 'b', name: 'B' }], units: [u('a', 1), u('b', 2, 3)] }, hecha).map(t => [t.name, t.d, t.n])), '[["A",1,1],["B",1,2]]');
});

test('Inicio, Mis cursos, Tutorías y Tú llevan sus paneles de computador', () => {
  assert.match(read('js/app.js'), /\$\{dkMesHTML\(\)\}\$\{dkCursosHTML\(\)\}/);
});

test('dentro de un curso: portada a un lado y componentes, mundos o lecciones en rejilla (spec 2026-11-24-escritorio-curso)', () => {
  const app = read('js/app.js'), css = read('css/escritorio.css');
  assert.equal(app.match(/<div class="learn cv" /g).length, 2, 'componentes y mapa de mundos');
  assert.equal(app.match(/<div class="cv-side">/g).length, 2);
  for (const t of ['class="learn cv-world"', 'dkMundosHTML(c, b)', 'dkLeccionHTML(l)']) assert.ok(app.includes(t), t);
  assert.match(css, /\.learn\.cv, \.learn\.cv-world \{ display: grid;/);
  const c2 = loadScripts(['js/ui.js', 'js/escritorio.js']);
  Object.assign(c2, { isDone: l => l.ok, WORLDS: { w: { name: 'Cálculo <Mental>' } }, clipSecs: () => 200, EXPLORA: { a: {} } });
  const h = get(c2, 'dkMundosHTML')({ units: [{ block: 'x', world: 'w', lessons: [{ ok: true }] }, { block: 'y', title: 'Otro', lessons: [] }] }, { id: 'x' });
  assert.ok(h.includes('class="ok"') && h.includes('Cálculo &lt;Mental&gt;') && !h.includes('Otro'));
  assert.match(get(c2, 'dkLeccionHTML')({ id: 'a', ex: [1, 2] }), /Explicación interactiva · 2 ejercicios/);
  assert.match(get(c2, 'dkLeccionHTML')({ id: 'b', ex: [1] }), /Video de 3 min/);
});
