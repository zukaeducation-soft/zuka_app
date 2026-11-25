// Página de presentación en la web, al estilo de la portada de Brilliant (spec 2026-11-20-presentacion).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const ctx = loadScripts(['js/marca.js', 'js/presentacion.js']);
const toca = get(ctx, 'presentacionToca');

test('sale en la web sin instalar y sin sesión; no en la app instalada ni con sesión', () => {
  const base = { standalone: false, user: null, query: '' };
  assert.equal(toca(base), true);
  assert.equal(toca({ ...base, standalone: true }), false);
  assert.equal(toca({ ...base, user: { id: 'x' } }), false);
  assert.equal(toca({ ...base, query: '?app' }), false);
  assert.equal(toca({ ...base, standalone: true, user: { id: 'x' }, query: '?presentacion' }), true);
  assert.equal(toca({ ...base, query: '?tab=clips' }), true);
});

const cursos = [
  { id: 'algebra', name: 'Álgebra', tagline: 'Desde cero.', color: '#a78bfa', units: [{ world: 'w1', title: 'Conjuntos', lessons: [1, 2] }, { title: 'Recta', lessons: [3] }] },
  { id: 'trig', name: 'Trigonometría', tagline: 'Ángulos.', color: '#22d3ee', units: [{ title: 'Ondas', lessons: [1] }] },
];
const html = get(ctx, 'presentacionHTML')(cursos, { worlds: { w1: { name: 'Teoría de Conjuntos' } }, install: '' });

test('la barra de arriba trae «Entrar» antes que todo lo demás', () => {
  const top = html.indexOf('class="pz-bar'), login = html.indexOf('data-pz="login"'), hero = html.indexOf('class="pz-hero');
  assert.ok(top >= 0 && login > top && login < hero);
});

test('cuenta quiénes somos, cómo se aprende, los cursos con sus mundos y cierra con un llamado', () => {
  for (const t of ['Quiénes somos', 'Pide tu código de prueba', 'Ya tengo código', 'Gimnasio cerebral', 'Tutorías',
    'Álgebra', 'Trigonometría', 'Teoría de Conjuntos', 'Recta', 'Ondas', '3 lecciones']) assert.ok(html.includes(t), t);
  assert.doesNotMatch(html, /Brilliant|Koji/);
  assert.equal((html.match(/data-pz="prueba"/g) || []).length >= 2, true);
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

// ---- portada viva (spec 2026-11-24-portada-viva) ----
test('la rueda: ángulo del punto, onda que sale de su altura y reto de sen θ = ½', () => {
  const [ang, onda, reto] = ['pzAngulo', 'pzOnda', 'pzReto'].map(n => get(ctx, n));
  assert.equal(Math.round(ang(1, 0)), 0); assert.equal(Math.round(ang(0, -1)), 90); assert.equal(Math.round(ang(0, 1)), 270);
  for (const d of [0, 30, 90, 200]) {
    const [x, y] = onda(d, { x0: 100, x1: 300, cy: 50, r: 40 }).slice(1).split('L')[0].split(' ').map(Number);
    assert.equal(x, 100); assert.ok(Math.abs(y - (50 - 40 * Math.sin(d * Math.PI / 180))) < .1);
  }
  assert.equal(reto(31.9), 30); assert.equal(reto(148), 150); assert.equal(reto(48), null); assert.equal(reto(210), null);
});

test('el cuadrado suma siempre 100 y la palanca solo se equilibra a 2 pasos', () => {
  const [area, pal] = ['pzArea', 'pzPalanca'].map(n => get(ctx, n));
  for (let a = 1; a < 10; a++) { const m = area(a); assert.equal(m.aa + 2 * m.ab + m.bb, 100); }
  assert.equal([1, 2, 3, 4].filter(d => pal(d).ok).join(), '2');
  assert.ok(pal(1).giro < 0 && pal(2).giro === 0 && pal(4).giro > 0);
});

test('lo que se arrastra también se mueve con el teclado y las pestañas están enlazadas con su panel', () => {
  assert.equal((html.match(/role="slider" tabindex="0" aria-label=/g) || []).length, 3);
  assert.ok(html.includes('aria-controls="pz-panel-1"') && html.includes('id="pz-panel-1"'));
  assert.match(html, /aria-live="polite"/);
  for (const id of html.match(/href="#[^"]+/g)) assert.ok(html.includes(`id="${id.slice(7)}"`), id);
});

// ---- portada aliada (spec 2026-11-24-portada-aliado) ----
test('promete ser aliado para entrar y terminar la universidad y dice qué ofrece; lo no publicado va como «Muy pronto»', () => {
  for (const t of ['aliado', 'universidad', 'Admisión', '¿Te ha pasado?', 'Asesorías', 'libros']) assert.ok(html.includes(t), t);
  const con = get(ctx, 'presentacionHTML')(cursos, { todos: [...cursos, { id: 'calc', name: 'Cálculo Diferencial', color: '#f0f', units: [] }] });
  assert.match(con, /class="pronto">Cálculo Diferencial<small>Muy pronto/);
  assert.doesNotMatch(con, /class="pronto">Álgebra/);
  assert.doesNotMatch(html, /garantiz|\d+ estudiantes|testimoni/i);
});
test('el camino sube del colegio al grado y cada tramo elige la etapa más cercana', () => {
  const [y, en, ps] = ['pzCaminoY', 'pzEtapaEn', 'PZ_PARADAS'].map(n => get(ctx, n));
  assert.equal(ps.map(p => en(p)).join(), '0,1,2,3'); assert.equal(en(0) + ',' + en(1), '0,3');
  for (let i = 1; i < 4; i++) assert.ok(y(ps[i]) < y(ps[i - 1]), `parada ${i}`);
  for (let x = 0; x <= 1; x += .02) assert.ok(y(x) > .03 && y(x) < .97);
});
test('el resorte llega a su meta sin dispararse, aun con cuadros largos', () => {
  const r = get(ctx, 'pzResorte');
  for (const dt of [.008, .016, .2]) { let [x, v] = [0, 0], max = 0; for (let i = 0; i < 400; i++) { [x, v] = r(x, v, 100, dt, 220, 18); max = Math.max(max, x); } assert.ok(Math.abs(x - 100) < .5 && max < 140, `${dt}: ${x} ${max}`); }
});

// ---- portada con programas (spec 2026-11-24-portada-programas) ----
test('una tarjeta por curso publicado, más libros y asesorías; lo demás queda en «Muy pronto»', () => {
  const con = get(ctx, 'presentacionHTML')(cursos, { todos: [...cursos, { id: 'calc', name: 'Cálculo Diferencial', color: '#f0f', units: [] }] });
  assert.equal((con.match(/class="pz-prog /g) || []).length, 3);
  assert.ok(con.includes('data-pz-precio="curso:algebra"') && !con.includes('curso:calc'));
  assert.match(con, /class="pronto"[^>]*>[^\n]*?<b>Cálculo Diferencial<\/b><small>Muy pronto/);
  assert.ok(con.includes('Fundamentación en Ingeniería y Ciencias') && con.includes('brand/ingenieros.webp'));
  for (const x of con.match(/data-pz-ir="#[^"]+/g)) assert.ok(con.includes(`id="${x.slice(13)}"`), x);
  assert.equal((con.match(/class="pz-lamina /g) || []).length, (con.match(/class="pz-pto"/g) || []).length);
});
test('el precio «desde» sale de la tienda: el más bajo activo, o nada', () => {
  const [c, a] = ['pzDesdeCurso', 'pzDesdeArt'].map(n => get(ctx, n));
  const ps = [{ curso: 'x', activo: true, precio: 90, meses: 3 }, { curso: 'x', activo: true, precio: 40, meses: 1 }, { curso: 'x', activo: false, precio: 5, meses: 1 }, { curso: 'y', activo: true, precio: null, meses: 6 }];
  assert.equal(JSON.stringify(c(ps, 'x')), '{"precio":40,"meses":1}'); assert.equal(c(ps, 'y'), null); assert.equal(c(null, 'x'), null);
  const as = [{ tipo: 'asesoria', activo: true, precio: 25, da: { horas: 1, horas_tipo: 'grupo' } }, { tipo: 'asesoria', activo: true, precio: 45, da: { horas: 1, horas_tipo: 'general' } }, { tipo: 'fisico', activo: true, precio: 60, da: {} }];
  assert.equal(a(as, 'asesoria').precio, 45); assert.equal(a(as, 'fisico').precio, 60); assert.equal(a([], 'fisico'), null);
});
test('cada programa con lámina tiene su pantalla real', () => {
  for (const id of Object.keys(get(ctx, 'PZ_PROG'))) assert.ok(fs.existsSync(path.join(ROOT, 'brand/app', `${id}.webp`)), id);
});

test('el mazo de cursos: una carta por curso de fundamentación y se abre solo cerca del puntero', () => {
  const con = get(ctx, 'presentacionHTML')(cursos, { todos: [...cursos, { id: 'calc', name: 'Cálculo Diferencial', color: '#f0f', units: [] }] });
  assert.equal((con.match(/class="pz-carta[ "]/g) || []).length, 3);
  assert.match(con, /class="pz-carta pronto"[^>]*data-pz-ir="\.pz-prog-fund"[^>]*aria-label="Cálculo Diferencial: Muy pronto"/);
  const f = get(ctx, 'pzAbre');
  assert.equal(f(0), 1); assert.equal(f(2), 0); assert.ok(f(.5) > f(1) && f(-1) === f(1));
});

test('los clips de la app existen, con su cuadro fijo, y se pueden pausar', () => {
  for (const [id, , , alt] of get(ctx, 'PZ_CLIPS')) {
    for (const f of [id, `${id}-quieto`]) assert.ok(fs.existsSync(path.join(ROOT, 'brand/clips', `${f}.webp`)), f);
    assert.ok(alt.length > 20 && html.includes(`brand/clips/${id}.webp`));
    assert.ok(fs.statSync(path.join(ROOT, 'brand/clips', `${id}.webp`)).size < 700000, id);
  }
  assert.match(html, /class="pz-clips-p" type="button" aria-pressed="false"/);
});
