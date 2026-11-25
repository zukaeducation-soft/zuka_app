// Personaje de Zuka (spec 2026-11-20-personaje): SVG con poses, ubicado donde la app le habla al estudiante.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

test('tres poses, SVG decorativo con colores en variables y borde para el tema oscuro', () => {
  const ctx = loadScripts(['js/mascota.js']), m = get(ctx, 'mascotSVG');
  for (const p of ['think', 'cheer', 'sad']) {
    const s = m(p, 'x');
    assert.match(s, /^<svg class="mascot /);
    assert.match(s, new RegExp(`class="mascot ${p} x"`));
    assert.match(s, /aria-hidden="true"/);
    assert.match(s, /var\(--mb, #fa7a6c\)/);
    assert.match(s, /filter="url\(#m-ol\)"/);
  }
  assert.match(m('nada'), /class="mascot think"/, 'una pose desconocida usa la de la imagen');
});

test('registrado y ubicado: inicio, Mis cursos vacío, gimnasio, final de lección y de reto, sin vidas y recorrido', () => {
  assert.match(read('index.html'), /<script defer src="js\/mascota.js"><\/script>/);
  assert.match(require('./load').shell(), /'js\/mascota.js'/);
  assert.match(read('js/inicio.js'), /mascotSVG\('think', 'm-hello'\)/);
  assert.match(read('js/inicio.js'), /class="m-empty">\$\{mascotSVG\('think'\)\}/);
  const gym = read('js/gimnasio.js');
  assert.match(gym, /<span class="coach-av">\$\{mascotSVG\('think'\)\}<\/span>/);
  assert.match(gym, /gb-win lv${r.level} sube">.*mascotSVG('cheer')/);
  assert.match(gym, /mascotSVG\('think', 'm-soon'\)/);
  const app = read('js/app.js');
  assert.match(app, /mascotSVG\('cheer', 'm-win'\)/);
  assert.match(app, /mascotSVG\('sad', 'm-win'\)/);
  assert.match(read('js/tour.js'), /mascot: \(\) => mascotSVG\('cheer', 'tour-mascot'\)/);
});

test('se mueve poco y se queda quieto con «reducir movimiento»', () => {
  const css = read('css/styles.css');
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{ \.mascot, \.mascot \* \{ animation: none !important; \} \}/);
  assert.match(css, /\.m-hello \{ width: 72px;/);
});
