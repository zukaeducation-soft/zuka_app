// Foco, toque y desplazamiento (revisión con web-design-guidelines, 2026-11-26).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./load');

const css = fs.readFileSync(path.join(ROOT, 'css/styles.css'), 'utf8').replace(/\r\n/g, '\n').replace(/\/\*[\s\S]*?\*\//g, '');
const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m => ({ sel: m[1].trim(), body: m[2] }));
const bodyOf = sel => rules.filter(r => r.sel.split(',').map(s => s.trim()).includes(sel)).map(r => r.body).join(';');

test('el anillo de foco global cubre enlaces, listas, áreas de texto y lo que lleva tabindex', () => {
  const r = rules.find(x => /button:focus-visible/.test(x.sel) && /input:focus-visible/.test(x.sel));
  assert.ok(r, 'falta la regla global de :focus-visible');
  for (const el of ['a', 'select', 'textarea', '[tabindex]']) assert.ok(r.sel.includes(el), `el anillo no cubre ${el}`);
  assert.match(r.sel, /:where\(/, 'los elementos nuevos van en :where() para no ganarle a las reglas de cada pieza');
  assert.match(r.body, /outline:\s*2px solid/);
});

test('el campo numérico marca el foco en su caja, porque su input no lleva contorno', () => {
  assert.match(bodyOf('.num input'), /outline:\s*0/);
  assert.match(bodyOf('.num:focus-within'), /outline:\s*2px solid/);
});

test('los botones y enlaces no esperan el doble toque', () => {
  const r = rules.find(x => /touch-action:\s*manipulation/.test(x.body));
  assert.ok(r, 'falta touch-action: manipulation');
  for (const el of ['a', 'button']) assert.ok(r.sel.split(',').map(s => s.trim()).includes(el), `falta en ${el}`);
});

test('las hojas y tarjetas que se desplazan no arrastran la página de atrás', () => {
  for (const sel of ['.sheet-card', '.guide-card', '.tour-tip', '#auth']) {
    assert.match(bodyOf(sel), /overflow(-y)?:\s*auto/, `${sel} ya no se desplaza: quitarla de esta lista`);
    assert.match(bodyOf(sel), /overscroll-behavior:\s*contain/, `${sel} sin overscroll-behavior: contain`);
  }
});

// Lo que se mueve seguido se anima con transform (no vuelve a calcular el diseño en cada cuadro).
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');

test('la barra de avance de la lección se llena con transform, no con el ancho', () => {
  for (const [file, sel] of [['css/styles.css', '.pbar i'], ['css/explora.css', '.lesson.xp-lesson .pbar i']]) {
    const m = read(file).match(new RegExp(sel.replace(/[.]/g, '[.]') + ' [{]([^}]*)[}]'));
    assert.ok(m, `${file}: falta ${sel}`);
    assert.doesNotMatch(m[1], /transition:[^;]*width/, `${file}: ${sel} anima el ancho`);
    assert.match(m[1], /transition:[^;]*transform/, `${file}: ${sel}`);
  }
  assert.match(bodyOf('.pbar i'), /transform:\s*translateX\(calc\(var\(--p, 0\) \* 1% - 100%\)\)/);
  const app = read('js/app.js');
  assert.doesNotMatch(app, /bar\.style\.width/);
  assert.match(app, /bar\.style\.setProperty\('--p'/);
});

test('el hueco y la tarjeta del recorrido se colocan con transform', () => {
  const tour = read('js/tour.js');
  assert.doesNotMatch(tour, /(hole|tip)\.style, \{ left:/);
  assert.match(tour, /hole\.style, \{ transform: `translate\(/);
  assert.match(tour, /tip\.style, \{ transform: `translate\(/);
  for (const sel of ['.tour-hole', '.tour-tip']) {
    const t = (bodyOf('.tour.open ' + sel).match(/transition:([^;]*)/) || [])[1] || '';
    assert.doesNotMatch(t, /\b(left|top)\b/, `${sel} anima left o top`);
    assert.match(t, /transform/, sel);
    assert.match(bodyOf(sel), /left:\s*0;\s*top:\s*0/, `${sel} parte de la esquina`);
  }
});

test('en Clips, los controles de abajo suben con transform al pausar', () => {
  assert.doesNotMatch(css, /transition:[^;}]*\bbottom\b/, 'queda una transición de bottom');
  assert.match(bodyOf('body[data-tab=clips] .clip.in-feed.paused .seek'), /transform:\s*translateY/);
  assert.match(bodyOf('.feed-item:has(.clip.paused) .feed-cap'), /transform:\s*translateY/);
});
