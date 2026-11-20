// Página de presentación en la web, al estilo de la portada de Brilliant (spec 2026-11-20-presentacion).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const ctx = loadScripts(['js/presentacion.js']);
const toca = get(ctx, 'presentacionToca');

test('sale en la web sin instalar y sin sesión; no en la app instalada, con sesión ni tras explorar sin cuenta', () => {
  const base = { standalone: false, user: null, guest: false, query: '' };
  assert.equal(toca(base), true);
  assert.equal(toca({ ...base, standalone: true }), false);
  assert.equal(toca({ ...base, user: { id: 'x' } }), false);
  assert.equal(toca({ ...base, guest: true }), false);
  assert.equal(toca({ ...base, query: '?app' }), false);
  assert.equal(toca({ ...base, standalone: true, user: { id: 'x' }, query: '?presentacion' }), true);
  assert.equal(toca({ ...base, query: '?tab=clips' }), true);
});

const cursos = [
  { id: 'algebra', name: 'Álgebra', tagline: 'Desde cero.', color: '#a78bfa', units: [{ world: 'w1', title: 'Conjuntos', lessons: [1, 2] }, { title: 'Recta', lessons: [3] }] },
  { id: 'trig', name: 'Trigonometría', tagline: 'Ángulos.', color: '#22d3ee', units: [{ title: 'Ondas', lessons: [1] }] },
];
const html = get(ctx, 'presentacionHTML')(cursos, { worlds: { w1: { name: 'Teoría de Conjuntos' } }, install: '' });

test('la barra de arriba trae «Iniciar sesión» antes que todo lo demás', () => {
  const top = html.indexOf('class="pz-bar'), login = html.indexOf('data-pz="login"'), hero = html.indexOf('class="pz-hero');
  assert.ok(top >= 0 && login > top && login < hero);
});

test('cuenta quiénes somos, cómo se aprende, los cursos con sus mundos y cierra con un llamado', () => {
  for (const t of ['Quiénes somos', 'Empieza gratis', 'Ya tengo cuenta', 'Gimnasio cerebral', 'Tutorías', 'Explorar sin cuenta',
    'Álgebra', 'Trigonometría', 'Teoría de Conjuntos', 'Recta', 'Ondas', '3 lecciones']) assert.ok(html.includes(t), t);
  assert.doesNotMatch(html, /Brilliant|Koji/);
  assert.equal((html.match(/data-pz="registro"/g) || []).length >= 2, true);
});

test('va registrada, con su hoja de estilos, y el arranque la pide antes que la pantalla de entrada', () => {
  const idx = read('index.html'), sw = read('sw.js'), app = read('js/app.js');
  assert.match(idx, /<link rel="stylesheet" href="css\/presentacion\.css">/);
  assert.ok(idx.indexOf('js/presentacion.js') > idx.indexOf('js/cuenta.js') && idx.indexOf('js/presentacion.js') < idx.indexOf('js/app.js'));
  assert.ok(sw.includes("'js/presentacion.js'") && sw.includes("'css/presentacion.css'"));
  assert.match(app, /if \(!presentacionPide\(\) && !cuentaPideEntrar\(\) && tourShouldStart\(S\)\) startTour\(\);/);
});

test('la pantalla de entrada ofrece volver a la presentación, también con el botón atrás', () => {
  assert.match(read('js/cuenta.js'), /data-pz-volver/);
  assert.match(read('js/back.js'), /presentacionAtras\(\)\) \{ cover\(\); return; \}/);
  assert.doesNotMatch(read('js/presentacion.js'), /presentacionCerrar\(\); return authCerrar\(\)/, 'authCerrar abre el recorrido');
});

test('los estilos usan las variables del tema y respetan «reducir movimiento»', () => {
  const css = read('css/presentacion.css');
  assert.match(css, /var\(--bg\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /color: ?#fff\b/);
});
