// Foco y teclado (spec 2026-11-18-foco-y-teclado): las pestañas se recorren con flechas (foco itinerante, como el
// patrón «roving focus» de las librerías de UI accesibles) y la hoja inferior se comporta como un diálogo modal: lleva
// el foco adentro, lo atrapa con Tab, se cierra con Escape, deja lo de atrás inerte y devuelve el foco al cerrar.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ui = loadScripts(['js/ui.js']);
const rovingIndex = get(ui, 'rovingIndex'), trapIndex = get(ui, 'trapIndex');

test('rovingIndex: flechas, Inicio y Fin mueven entre pestañas y dan la vuelta', () => {
  assert.equal(rovingIndex('ArrowRight', 0, 3), 1);
  assert.equal(rovingIndex('ArrowRight', 2, 3), 0, 'de la última a la primera');
  assert.equal(rovingIndex('ArrowLeft', 0, 3), 2, 'de la primera a la última');
  assert.equal(rovingIndex('ArrowDown', 1, 3), 2);
  assert.equal(rovingIndex('ArrowUp', 1, 3), 0);
  assert.equal(rovingIndex('Home', 2, 3), 0);
  assert.equal(rovingIndex('End', 0, 3), 2);
  assert.equal(rovingIndex('Enter', 1, 3), -1, 'otras teclas no mueven');
  assert.equal(rovingIndex('a', 1, 3), -1);
});

test('trapIndex: Tab y Mayús+Tab dan la vuelta dentro de la hoja', () => {
  assert.equal(trapIndex(false, 2, 3), 0, 'Tab en el último vuelve al primero');
  assert.equal(trapIndex(true, 0, 3), 2, 'Mayús+Tab en el primero va al último');
  assert.equal(trapIndex(false, 0, 3), -1, 'en medio, el navegador hace lo suyo');
  assert.equal(trapIndex(true, 1, 3), -1);
  assert.equal(trapIndex(false, -1, 3), 0, 'si el foco quedó afuera, entra al primero');
  assert.equal(trapIndex(true, -1, 3), 2);
  assert.equal(trapIndex(false, 0, 0), -2, 'sin nada enfocable, el foco se queda en la tarjeta');
});

test('pestañas: foco itinerante (tabindex 0 solo en la activa) y flechas en el juego de subrayar', () => {
  const sb = read('js/games/subraya-texto.js');
  assert.match(sb, /tabindex="\$\{i === at \? 0 : -1\}"/);
  assert.match(sb, /aria-controls="sb-panel-/);
  assert.match(sb, /rovingIndex\(e\.key, at, params\.rounds\.length\)/);
  // La pantalla de entrada ya no tiene pestañas (spec 2026-11-24-acceso-por-codigo): entra con código.
});

test('hoja inferior: diálogo modal con foco adentro, Tab atrapado, Escape, fondo inerte y foco de vuelta', () => {
  const app = read('js/app.js');
  const open = app.slice(app.indexOf('let sheetOpener'), app.indexOf('function openCoursePicker('));
  assert.match(open, /role="dialog" aria-modal="true"/);
  assert.match(open, /aria-labelledby/);
  assert.match(open, /sheetOpener = document\.activeElement/, 'recuerda quién la abrió');
  assert.match(open, /e\.key === 'Escape'/);
  assert.match(open, /trapIndex\(e\.shiftKey/);
  assert.match(open, /\.inert = true/, 'lo de atrás no se alcanza con Tab ni con el lector de pantalla');
  assert.match(open, /focus\(\{ preventScroll: true \}\)/);
  assert.match(open, /function closeSheet\(restore = true\) \{[\s\S]{0,500}\.inert = false[\s\S]{0,300}sheetOpener[\s\S]{0,120}focus/, 'al cerrar devuelve el foco');
  // Una hoja que reemplaza a otra no pierde a quien abrió la primera; el estado no depende de la animación.
  assert.match(open, /if \(!sheetIsOpen\) \{\s+sheetOpener = document\.activeElement/);
  assert.match(open, /sh\.inert = true;/, 'cerrada, la hoja no se alcanza con Tab');
  assert.match(open, /e\.stopPropagation\(\);\r?\n  if \(e\.key === 'Escape'\)/, 'ninguna tecla sigue a la lección de atrás');
  assert.match(open, /'#overlay'/, 'la lección también queda inerte detrás de la hoja');
  // Las hojas que llevan a una lección, un examen u otra vista no devuelven el foco al mapa de atrás.
  for (const [f, re] of [['js/app.js', /closeSheet\(false\); startLesson\(c, l\)/], ['js/app.js', /closeSheet\(false\); startLesson\(c, b\)/], ['js/exam.js', /closeSheet\(false\); startExam\(c, u\)/]]) assert.match(read(f), re, f);
});

test('el foco de teclado se ve en las pestañas y en la hoja', () => {
  const css = read('css/styles.css');
  assert.match(css, /\.sb-tab:focus-visible/);
  assert.match(css, /button:focus-visible/, 'las pestañas de la entrada usan el foco visible de todos los botones');
  assert.match(css, /\.sheet-card:focus-visible|\.sheet-card:focus \{/);
});
