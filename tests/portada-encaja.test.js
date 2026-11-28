// Portada: cada sección cabe en la pantalla (spec 2026-11-28-portada-encaja).
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const css = read('css/presentacion.css'), capa = css.slice(css.indexOf('/* ---- Capa encaje')), js = read('js/presentacion.js');

test('la capa mide con el alto de la ventana menos la barra', () => {
  assert.ok(css.indexOf('/* ---- Capa encaje') > css.indexOf('/* ---- Capa Holcim'), 'va después de la capa Holcim');
  assert.match(capa, /--pz-alto: calc\(100dvh - var\(--pz-barra\)\)/);
  assert.match(capa, /scroll-padding-top: var\(--pz-barra\)/);
  assert.match(capa, /@media \(min-width: 900px\) and \(max-height: 720px\)/, 'computador bajo');
  assert.match(capa, /@media \(max-width: 899px\) and \(max-height: 860px\)/, 'celular bajo');
});

test('programas es una fila que se desliza, con flechas que la corren', () => {
  assert.match(capa, /#landing \.pz-progs \{[^}]*grid-auto-flow: column[^}]*overflow-x: auto[^}]*scroll-snap-type: x mandatory/);
  assert.match(js, /data-carril-de="programas"/);
  assert.match(js, /data-carril="-1"/); assert.match(js, /data-carril="1"/);
  assert.match(js, /function pzCarriles\(el, quieto\)/); assert.match(js, /pzCarriles\(el, quieto\);/);
  assert.match(js, /fila\.closest\('section'\)\)?\.scrollIntoView|\(fila \? fila\.closest\('section'\) : sec\)\.scrollIntoView/, 'ir a una tarjeta corre la fila y muestra la sección');
});

test('sin las demos ni los mapas de cursos, y nada apunta a ellos', () => {
  for (const x of ['pzRuedaViva', 'pzAreaViva', 'pzPalancaViva', 'id="pz-cursos"', '#pz-cursos', '#pz-d-tut', 'Ahora prueba tú']) assert.ok(!js.includes(x), x);
});

test('en celular, instituciones y quiénes somos se deslizan de lado', () => {
  assert.match(capa, /#landing \.pz-inst-g \{[^}]*grid-auto-flow: column[^}]*overflow-x: auto/);
  assert.match(capa, /#landing \.pz-tres \{[^}]*grid-auto-flow: column[^}]*overflow-x: auto/);
});
