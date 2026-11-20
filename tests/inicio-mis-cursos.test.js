// Inicio, Mis cursos y gimnasio flotante (spec 2026-11-19-inicio-mis-cursos).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const html = read('index.html'), sw = read('sw.js'), app = read('js/app.js'), css = read('css/styles.css');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|gimnasio|inicio/.test(f));
const ctx = loadScripts(all);
const COURSES = get(ctx, 'COURSES'), enrolledIds = get(ctx, 'enrolledIds'), gymWorld = get(ctx, 'gymWorld'), GYM_RETOS = get(ctx, 'GYM_RETOS');
const PU = COURSES.find(c => c.id === 'preuda'), ALG = COURSES.find(c => c.id === 'algebra');
const ui = id => PU.units.findIndex(u => u.lessons.some(l => l.id === id));

test('inscrito: los de S.misCursos y los que ya tienen alguna lección hecha, sin repetir y en el orden del catálogo', () => {
  assert.equal(enrolledIds({ misCursos: [], done: {} }, COURSES).length, 0);
  assert.equal(enrolledIds({ misCursos: ['preuda'], done: { 'alg-0a': true } }, COURSES).join(), COURSES.filter(c => ['preuda', 'algebra'].includes(c.id)).map(c => c.id).join());
  assert.equal(enrolledIds({ misCursos: ['algebra', 'algebra'], done: { 'alg-0a': true } }, COURSES).join(), 'algebra');
  assert.equal(enrolledIds({ misCursos: ['no-existe'] }, COURSES).length, 0, 'un id viejo o de un curso oculto no aparece');
});

test('el gimnasio flotante: retos del mundo, repaso de los anteriores y conteo de pendientes', () => {
  const w4 = ui('pu-pr-1');   // mundo 4, Proporcionalidad: tiene retos
  const g = gymWorld(PU, w4, {}, false);
  assert.equal(g.fab, true);
  assert.ok(g.here.length >= 3, 'retos de este mundo');
  assert.ok(g.here.every(x => x.open === false), 'sin lecciones hechas, cerrados');
  assert.equal(g.pending, 0);
  const done = { 'pu-pr-1': true, 'pu-pr-2': true, 'pu-pr-3': true, 'pu-pr-5': true };
  const g2 = gymWorld(PU, w4, done, false);
  assert.ok(g2.here.every(x => x.open) && g2.pending === g2.here.length);
  // en modo revisión, todos abiertos
  assert.ok(gymWorld(PU, w4, {}, true).here.every(x => x.open));
  // el repaso trae retos abiertos de mundos anteriores del mismo componente, no de este
  const w12 = ui('pu-ar-1');
  const g3 = gymWorld(PU, w12, done, false);
  assert.ok(g3.review.length >= 3 && g3.review.every(r => !g3.here.some(x => x.r === r)));
  // un mundo sin retos todavía muestra el botón (con su repaso)
  const w1 = ui('pu-cm-1');
  assert.equal(gymWorld(PU, w1, {}, false).fab, true);
  assert.equal(gymWorld(PU, w1, {}, false).here.length, 0);
});

test('el gimnasio flotante sale en todos los cursos y componentes', () => {
  const lec = PU.units.findIndex(u => u.block === 'lectura');
  assert.equal(gymWorld(PU, lec, {}, true).fab, true);
  for (const c of COURSES) assert.equal(gymWorld(c, 0, {}, true).fab, true, c.id);
  // Álgebra tiene retos (proporciones, ecuaciones): desde su último mundo, el repaso los trae en modo revisión
  assert.ok(gymWorld(ALG, ALG.units.length - 1, {}, true).review.length >= 1);
});

test('el nivel que lleva el estudiante: el mundo abierto, o el de la lección que toca, o el último', () => {
  const courseLevelUi = get(ctx, 'courseLevelUi');
  const s = (done, openWorld = null) => ({ done, open: openWorld });
  assert.equal(courseLevelUi(PU, null, s({})), 0);
  assert.equal(courseLevelUi(PU, null, s({ 'pu-cm-1': true, 'pu-cm-2': true, 'pu-cm-3': true, 'pu-cm-4': true })), 1, 'mundo 1 terminado: el mundo 2');
  assert.equal(courseLevelUi(PU, null, s({}, 5)), 5, 'dentro de un mundo, ese mundo');
  const lec = PU.units.findIndex(u => u.block === 'lectura');
  assert.equal(courseLevelUi(PU, PU.blocks.find(b => b.id === 'lectura'), s({})), lec, 'con un componente abierto, su primer mundo pendiente');
  const all = Object.fromEntries(ALG.units.flatMap(u => u.lessons.map(l => [l.id, true])));
  assert.equal(courseLevelUi(ALG, null, s(all)), ALG.units.length - 1, 'terminado: el último mundo');
});

test('el botón flotante va en la portada, el mapa y los mundos del curso', () => {
  for (const f of ['renderComponents', 'renderLearn', 'renderWorld']) {
    const at = app.indexOf(`function ${f}(`), body = app.slice(at, at + app.slice(at).search(/\r?\n\}\r?\n/));
    assert.match(body, /gymFabHTML\(c, /, f);
    assert.match(body, /bindGymFab\(c\)/, f);
  }
});

test('menú inferior: Inicio, Mis cursos, Tutorías y Perfil (el gimnasio flota en el curso); la app abre en Inicio', () => {
  assert.match(html, /<button data-tab="home">Inicio<\/button>\s*<button data-tab="cursos">Mis cursos<\/button>\s*<button data-tab="tutorias">Tutorías<\/button>\s*<button data-tab="profile">Perfil<\/button>/);
  assert.doesNotMatch(html, /<button data-tab="gym">/);
  assert.match(app, /t === 'learn' \|\| t === 'gym' \? 'cursos' : t/, 'en el gimnasio se marca Mis cursos');
  assert.match(css, /#tabbar button \.i \{[^}]*width: 26px/, 'iconos más grandes');
  assert.match(html, /<body data-tab="home">/);
  assert.match(html, /<script defer src="js\/inicio.js"><\/script>/);
  assert.match(sw, /'js\/inicio.js'/);
  assert.match(app, /home: renderHome/);
  assert.match(app, /cursos: renderMyCourses/);
  const pwa = loadScripts(['js/pwa.js']);
  assert.equal(get(pwa, 'tabFromURL')(''), 'home');
  assert.equal(get(pwa, 'tabFromURL')('?tab=cursos'), 'cursos');
});

test('la barra de arriba ya no trae el selector de curso; el recorrido señala la portada del curso', () => {
  const top = app.slice(app.indexOf('function renderTop'), app.indexOf('// ---- hojas inferiores'));
  assert.doesNotMatch(top, /tb-course/);
  assert.doesNotMatch(top, /tb-brand|hearts/, 'sin marca ni vidas arriba (spec 2026-11-19-pantalla-completa)');
  const tour = loadScripts(['js/tour.js']);
  assert.match(get(tour, 'TOUR_STEPS').find(s => s.id === 'curso').target.join(), /\.course-head/);
});

test('atrás: en un curso vuelve a Mis cursos, en otra pestaña a Inicio y en Inicio pregunta si salir', () => {
  const back = loadScripts(['js/back.js']), backStep = get(back, 'backStep');
  assert.equal(backStep({ tab: 'home' }), 'ask-exit');
  assert.equal(backStep({ tab: 'learn' }), 'tab');
  assert.equal(backStep({ tab: 'cursos' }), 'tab');
  assert.match(read('js/back.js'), /go\(tab === 'learn' \? 'cursos' : tab === 'gym' \? 'learn' : 'home'\)/);
});

test('estilos: portada del curso, tarjetas del inicio y botón flotante en los dos temas', () => {
  for (const sel of ['.course-head', '.hc-card', '.mc-row', '.gym-fab']) assert.ok(css.includes(`${sel} {`) || css.includes(`${sel}{`), sel);
  assert.match(css, /\.gym-fab \{[^}]*position: fixed/);
  assert.match(css, /\.gym-fab \{[^}]*var\(--tabbar-h/, 'flota por encima del menú inferior');
});

test('el curso que se ve queda inscrito, y la vista del curso marca «Mis cursos»', () => {
  assert.match(app, /function renderLearn\(\) \{\s*const c = courseById\(S\.course\);\s*enroll\(c\.id\);/);
  assert.match(app, /b\.dataset\.tab === \(t === 'learn' \|\| t === 'gym' \? 'cursos' : t\)/);
  const ini = loadScripts(['js/inicio.js']);
  ini.S = { misCursos: ['algebra'] }; ini.save = () => {};
  get(ini, 'enroll')('preuda'); get(ini, 'enroll')('preuda');
  assert.equal(ini.S.misCursos.join(), 'algebra,preuda');
});

test('el botón flotante usa la tinta del curso, queda dentro de la columna en escritorio y no se pinta fuera de Razonamiento', () => {
  assert.match(css, /\.gym-fab \{[^}]*color: var\(--c-on\)/);
  assert.match(css, /\.gym-fab \{[^}]*right: max\(18px, calc\(\(100vw - 480px\) \/ 2 \+ 18px\)\)/);
  assert.match(app, /\$\{gymFabHTML\(c, ui\)\}/);
  assert.match(read('js/inicio.js'), /if \(!g\.fab\) return '';/);
});

test('a 300 px: el menú no parte «Mis cursos» y la marca de arriba se recorta o se esconde', () => {
  assert.match(css, /#tabbar button \{ white-space: nowrap;/);
});

test('si el mundo no tiene retos, la hoja ofrece los que vienen más adelante', () => {
  const g = gymWorld(ALG, 0, {}, false);
  assert.equal(g.here.length, 0);
  assert.ok(g.ahead.length >= 1 && g.ahead.length <= 3);
  assert.ok(g.ahead.every(x => x.open === false), 'sin lecciones hechas, cerrados');
});

test('con componentes, el nivel sigue al componente que se estudia; la hoja nunca queda vacía en un curso con retos', () => {
  const courseLevelUi = get(ctx, 'courseLevelUi');
  const lec = PU.units.findIndex(u => u.block === 'lectura');
  assert.equal(courseLevelUi(PU, null, { done: {}, last: PU.units[lec].lessons[0].id }), lec, 'quien va por Lectura recibe un mundo de Lectura');
  assert.equal(courseLevelUi(PU, null, { done: {}, last: null }), 0, 'sin historia: el primer componente');
  // Razonamiento terminado y estudiando Razonamiento: su último mundo, con repaso de lo anterior
  const raz = Object.fromEntries(PU.units.filter(u => u.block === 'razonamiento').flatMap(u => u.lessons.map(l => [l.id, true])));
  const lastRaz = PU.units.map((u, i) => (u.block === 'razonamiento' ? i : -1)).filter(i => i >= 0).pop();
  assert.equal(courseLevelUi(PU, null, { done: raz, last: 'pu-cm-1' }), lastRaz);
  assert.ok(gymWorld(PU, lastRaz, raz, false).review.length >= 1);
  const ini = read('js/inicio.js');
  assert.match(read('js/gimnasio.js'), /Pronto llegan retos de este nivel/, 'un nivel sin retos lleva al calentamiento');
  assert.match(read('js/gimnasio.js'), /data-back-course/, 'la vista completa del gimnasio vuelve al curso');
});

test('el botón flotante es una mancuerna en relieve sobre una base (sin el icono plano)', () => {
  const ini = read('js/inicio.js');
  assert.match(ini, /const GYM_3D = /);
  assert.match(ini, /\$\{GYM_3D\}/);
  assert.match(css, /\.gym-fab \.gf-art \{/);
  assert.match(css, /prefers-reduced-motion: reduce\) \{ \.gym-fab, \.gym-fab \.gf-db \{ animation: none; \} \}/);
});

test('la pesa toma los colores del curso y la base los del tema; «Sigue aprendiendo» va en Mis cursos, no en el Inicio', () => {
  const ini = read('js/inicio.js');
  assert.doesNotMatch(ini, /#b9a4ff|#ff93c9|#ffb35a/, 'sin el degradado fijo');
  assert.match(ini, /stop-color:var\(--g1\)/);
  const art = loadScripts(['js/art.js']);
  const f = loadScripts(['js/inicio.js']); f.ART_PAL = get(art, 'ART_PAL');
  const st = get(f, 'gymFabColors')({ id: 'trig', color: '#22d3ee' });
  assert.match(st, new RegExp(`--g2:${get(art, 'ART_PAL').trig.blue}`));
  assert.match(get(f, 'gymFabColors')({ id: 'nuevo', color: '#123456' }), /--g1:#123456/, 'curso sin paleta: su color');
  assert.match(css, /\.gym-fab \{[^}]*--gb1: color-mix\([^}]*var\(--bg\)/);
  const home = ini.slice(ini.indexOf('function renderHome'), ini.indexOf('function renderMyCourses'));
  assert.doesNotMatch(home, /continueHTML|home-continue/);
  const mis = ini.slice(ini.indexOf('function renderMyCourses'), ini.indexOf('function courseHeadHTML'));
  assert.match(mis, /continueHTML\(mine\)/);
  assert.match(mis, /\[data-continue\][^\n]*startLesson\(k\.last, k\.cur\)/);
});
