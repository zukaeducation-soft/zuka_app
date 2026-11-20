// Pantalla completa en el celular y barra de arriba con racha y experiencia (spec 2026-11-19-pantalla-completa).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const css = read('css/styles.css'), app = read('js/app.js'), html = read('index.html');

test('el celular dibuja hasta los bordes con el fondo de la app', () => {
  assert.match(html, /viewport-fit=cover/);
  assert.match(css, /@media \(max-width: 519px\) \{ html, body, #overlay, #auth \{ background: var\(--bg\); \} \}/);
  assert.match(css, /#tabbar \{[^}]*padding-bottom: env\(safe-area-inset-bottom\)/);
  assert.match(css, /#topbar \{ padding: 6px 16px 4px; padding-top: max\(6px, env\(safe-area-inset-top\)\); \}/);
  // la barra del sistema toma el color del fondo de cada tema
  assert.match(app, /t === 'dark' \? '#07080f' : '#f4f6fb'/);
  assert.match(css, /:root\[data-theme="light"\] \{\s*--bg: #f4f6fb;/);
});

test('arriba solo la racha y la experiencia, más grandes', () => {
  const top = app.slice(app.indexOf('function renderTop'), app.indexOf('// ---- hojas inferiores'));
  assert.match(top, /data-streak/);
  assert.match(top, /tb-stat xp/);
  assert.doesNotMatch(top, /hearts|tb-brand|Zuka/);
  assert.match(css, /#topbar \.tb-stat \{ gap: 6px; padding: 7px 14px 7px 10px; font-size: 17px; \}/);
  assert.match(css, /#topbar \.tb-stat \.i \{ width: 24px; height: 24px; \}/);
});
