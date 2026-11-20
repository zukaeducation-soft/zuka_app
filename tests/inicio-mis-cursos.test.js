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

test('el gimnasio flotante sale en los mundos de Razonamiento lógico', () => {
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

test('fuera de Razonamiento lógico no hay gimnasio flotante (por ahora)', () => {
  const lec = PU.units.findIndex(u => u.block === 'lectura');
  assert.equal(gymWorld(PU, lec, {}, true).fab, false);
  assert.equal(gymWorld(ALG, 0, {}, true).fab, false);
});

test('menú inferior: Inicio, Mis cursos, Gimnasio, Tutorías y Perfil; la app abre en Inicio', () => {
  assert.match(html, /<button data-tab="home">Inicio<\/button>\s*<button data-tab="cursos">Mis cursos<\/button>\s*<button data-tab="gym">Gimnasio<\/button>\s*<button data-tab="tutorias">Tutorías<\/button>\s*<button data-tab="profile">Perfil<\/button>/);
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
  assert.match(top, /tb-brand/);
  const tour = loadScripts(['js/tour.js']);
  assert.match(get(tour, 'TOUR_STEPS').find(s => s.id === 'curso').target.join(), /\.course-head/);
});

test('atrás: en un curso vuelve a Mis cursos, en otra pestaña a Inicio y en Inicio pregunta si salir', () => {
  const back = loadScripts(['js/back.js']), backStep = get(back, 'backStep');
  assert.equal(backStep({ tab: 'home' }), 'ask-exit');
  assert.equal(backStep({ tab: 'learn' }), 'tab');
  assert.equal(backStep({ tab: 'cursos' }), 'tab');
  assert.match(read('js/back.js'), /go\(tab === 'learn' \? 'cursos' : 'home'\)/);
});

test('estilos: portada del curso, tarjetas del inicio y botón flotante en los dos temas', () => {
  for (const sel of ['.course-head', '.hc-card', '.mc-row', '.gym-fab', '.tb-brand']) assert.ok(css.includes(`${sel} {`) || css.includes(`${sel}{`), sel);
  assert.match(css, /\.gym-fab \{[^}]*position: fixed/);
  assert.match(css, /\.gym-fab \{[^}]*var\(--tabbar-h/, 'flota por encima del menú inferior');
});

test('el curso que se ve queda inscrito, y la vista del curso marca «Mis cursos»', () => {
  assert.match(app, /function renderLearn\(\) \{\s*const c = courseById\(S\.course\);\s*enroll\(c\.id\);/);
  assert.match(app, /b\.dataset\.tab === \(t === 'learn' \? 'cursos' : t\)/);
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
  assert.match(css, /#tabbar button \{ white-space: nowrap; \}/);
  assert.match(css, /@media \(max-width: 340px\) \{ \.tb-brand b \{ display: none; \} \}/);
});
