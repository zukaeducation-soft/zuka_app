// Menú lateral del panel y del portal en computador (2026-11-26, pedido del usuario): se queda quieto y se desplaza aparte del
// contenido. El body no lleva overflow (el navegador lo pasaba a la ventana y el sticky dejaba de funcionar): desplaza la ventana.
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');

test('la ventana se desplaza, no el body, y el menú es sticky con su propio desplazamiento', () => {
  const a = read('admin/admin.css'), p = read('admin/panel.css');
  assert.match(a, /:root:has\(> body\.admin\) \{ overflow-y: auto; \}/);
  assert.match(a, /body\.admin \{ overflow: visible; height: auto;/);
  assert.match(p, /\.dentro \.pn-side \{ position: sticky; top: 0; height: calc\(100 \* var\(--dvh\)\)/);
  assert.match(p, /\.dentro \.pn-nav \{[^}]*overflow-y: auto/);
});

test('el panel y el portal cargan la misma versión de admin.css', () => {
  const v = f => read(f).match(/admin\.css\?v=(\d+)/)[1];
  assert.equal(v('admin/index.html'), v('instituciones/portal/index.html'));
});
