// Portada con el lenguaje de holcim.com.co (spec 2026-11-28-portada-holcim): azul noche, títulos en mayúsculas, esquinas rectas.
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const css = fs.readFileSync(path.join(__dirname, '..', 'css/presentacion.css'), 'utf8');
const capa = css.slice(css.indexOf('/* ---- Capa Holcim'));

test('la capa existe y va al final, para mandar sobre lo anterior', () => {
  assert.ok(css.indexOf('/* ---- Capa Holcim') > 0, 'falta la capa');
  assert.match(capa, /--hz-noche: #001634/); assert.match(capa, /--hz-tinta: #002454/);
});

test('barra azul noche con letras blancas y el logo con su palabra blanca', () => {
  assert.match(capa, /\.pz-bar \{[^}]*background: var\(--hz-noche\)/);
  assert.match(capa, /\.pz-nav a \{[^}]*color: #ffffff/);
  assert.match(capa, /\.pz-bar \.logo \{[^}]*color: #ffffff/);
});

test('carrusel: azul noche, foto a todo lo ancho con panel translúcido y pestañas numeradas', () => {
  assert.match(capa, /\.pz-hero \{[^}]*background-color: var\(--hz-noche\) !important/);
  assert.match(capa, /\.pz-lamina:has\(\.pz-foto\) \.pz-lam-fig \{[^}]*position: absolute; inset: 0/);
  assert.match(capa, /\.pz-lamina:has\(\.pz-foto\) \.pz-lam-txt \{[^}]*background: rgb\(0 22 52 \/ \.9\)/);
  assert.match(capa, /counter-increment: pz-pto/);
});

test('títulos en mayúsculas sin peso 800, tarjetas rectas con borde y flecha', () => {
  assert.match(capa, /#landing h2[^{]*\{[^}]*text-transform: uppercase/);
  assert.doesNotMatch(capa, /font-weight:\s*(800|900)/);
  assert.match(capa, /\.pz-prog \{[^}]*border-radius: 0[^}]*border: 2px solid var\(--hz-borde\)/);
  assert.match(capa, /\.pz-prog h3::after \{[^}]*content: ' →'/);
  assert.match(capa, /:root\[data-theme="dark"\] #landing \{[^}]*--hz-titulo: #ffffff/, 'tema oscuro');
});

test('las demás tarjetas grandes también van rectas', () => {
  assert.match(capa, /:is\(\.pz-tres > article, \.pz-ruta, \.pz-panel, \.pz-inst-c, \.pz-inst-v\) \{ border-radius: 0; \}/);
});
