// Interfaz compacta en computador (spec 2026-11-25-interfaz-compacta).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const css = read('css/styles.css');

test('se reduce solo en computador y la landing queda a tamaño completo', () => {
  assert.match(css, /@media \(min-width: 1200px\) \{ :root\[data-compacta\] \{ --z: \.8; \} \}/);
  assert.match(css, /body \{ zoom: var\(--z\); \}/);
  assert.match(css, /#boot, #landing, .tour, .*zoom: calc\(1 \/ var\(--z\)\)/);
});
test('los estilos de la app usan --dvh y --dvw, no la pantalla sin reducir', () => {
  for (const f of ['escritorio', 'explora', 'styles', 'tienda', 'tutorias', 'inicio', 'perfil', 'acceso', 'examen', 'clave']) {
    const t = read(`css/${f}.css`).replace(/\/\*[\s\S]*?\*\//g, '').replace(/:root \{ --z: 1;.*|--dvh: [^;]*;|--dvw: [^;]*;/g, '');
    assert.doesNotMatch(t, /\b\d+(d|s|l)?vh\b|\b100d?vw\b/, f);
  }
});
test('lo que sigue al dedo se escribe en píxeles de la interfaz', () => {
  for (const f of fs.readdirSync(path.join(ROOT, 'js')).filter(x => x.endsWith('.js') && x !== 'presentacion.js').map(x => `js/${x}`).concat(fs.readdirSync(path.join(ROOT, 'js/games')).map(x => `js/games/${x}`)))
    assert.doesNotMatch(read(f), /style\.(left|top) = `\$\{\(?e\.client[XY](?![^`]*zk\(\))/, f);
});
