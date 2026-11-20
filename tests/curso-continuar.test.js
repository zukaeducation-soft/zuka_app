// «Sigue aprendiendo» solo dentro de cada curso, y la misma letra en Inicio, Mis cursos, Tutorías y Perfil (2026-11-19).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const app = read('js/app.js'), ini = read('js/inicio.js'), css = read('css/styles.css');
const fn = (src, name) => { const a = src.indexOf(`function ${name}(`); return src.slice(a, a + src.slice(a).search(/\r?\n\}\r?\n/)); };

test('la tarjeta va en la portada del curso, en la de sus componentes y en un componente, y abre la lección', () => {
  assert.match(fn(app, 'renderLearn'), /\$\{cur \? continueCardHTML\(c, cur, ls\) : ''\}/);
  const comp = fn(app, 'renderComponents');
  assert.match(comp, /cur = currentLesson\(c\)/);
  assert.match(comp, /continueCardHTML\(c, cur, ls\.filter\(l => blockOf\(c, l\) === blockOf\(c, cur\)\)\)/);
  assert.match(comp, /\[data-continue\][^\n]*startLesson\(c, cur\)/);
  const card = fn(ini, 'continueCardHTML');
  assert.match(card, /Sigue aprendiendo/);
  assert.match(card, /data-continue/);
  assert.doesNotMatch(fn(ini, 'renderHome') + fn(ini, 'renderMyCourses'), /continue/);
});

test('Tutorías y Perfil usan la letra de Inicio y Mis cursos', () => {
  assert.match(css, /\.home-head h1 \{ font-family: var\(--display\); font-weight: 500; font-size: 28px;/);
  assert.match(css, /\.tu-head h1, \.set-head h2 \{ font-family: var\(--display\); font-weight: 500; font-size: 28px;/);
  assert.match(css, /\.tu-pick h2 \{ font-family: var\(--display\); font-weight: 500; font-size: 21px; \}/);
  assert.match(css, /\.tu-mine-card h2, \.profile \.card h3 \{ font-family: var\(--display\); font-weight: 500;/);
  assert.match(css, /\.mc-body b \{ font-size: 17px; font-weight: 600; \}/);
  assert.match(css, /\.tu-course b, \.prog-row \.pr-body b, \.saved-row b \{ font-size: 17px; font-weight: 600; \}/);
  assert.match(css, /\.tutorias, \.profile \{ padding: 10px 16px 56px; gap: 18px; \}/);
  assert.match(css, /\.home, \.mycourses \{ padding: 10px 16px 56px; display: grid; gap: 18px; \}/);
});
