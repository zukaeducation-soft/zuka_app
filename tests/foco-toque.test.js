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
