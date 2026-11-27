// Un juego de js/games/ va en la app (lista «fuentes» de index.html y, por ella, en un paquete) solo si algún ejercicio,
// evaluación o reto lo usa; los demás se quedan en el repositorio, con sus pruebas, pero no se le mandan a nadie
// (auditoría 2026-11-26, hallazgo 8). «Registrado en la app» = está en index.html; «existe en el repositorio» = el
// archivo está en js/games/ (tests/load.js: retirados(), enRepo(), htmlRepo()).
// Si esta prueba falla: node tools/juegos-en-uso.js dice qué sobra (con --quita lo saca) o qué falta.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, shell, retirados, enRepo } = require('./load');
const { analiza } = require('../tools/juegos-en-uso');

const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = shell();
const games = fs.readdirSync(path.join(ROOT, 'js/games')).filter(f => f.endsWith('.js'));
const r = analiza();
const sinUso = new Set(r.sinUso);

test('todos los scripts de la app cargan en Node sin la página (salvo el arranque de app.js)', () => {
  assert.deepEqual(r.fallos.filter(f => !f.startsWith('js/app.js:') && !sinUso.has(f.split(':')[0])), []);
});

test('cada juego que nombra un ejercicio existe y viene con la app', () => {
  const dueño = {};
  for (const [f, js] of Object.entries(r.registra)) for (const g of js) dueño[g] = f;
  assert.ok(r.usados.size > 1000, `solo ${r.usados.size} juegos en uso: el recorrido no vio los cursos`);
  for (const g of r.usados) {
    assert.ok(dueño[g], `ningún archivo registra el juego «${g}»`);
    assert.ok(index.includes(`src="${dueño[g]}"`), `${dueño[g]} (juego «${g}») falta en index.html`);
    assert.ok(sw.includes(`'${dueño[g]}'`), `${dueño[g]} falta en los paquetes: node tools/empaquetar.js`);
  }
});

test('ningún juego sin uso va en la app (node tools/juegos-en-uso.js --quita)', () => {
  const sobran = r.sinUso.filter(f => index.includes(`src="${f}"`));
  assert.deepEqual(sobran, []);
  assert.ok(!r.sinUso.some(f => sw.includes(`'${f}'`)), 'un juego sin uso sigue dentro de un paquete: node tools/empaquetar.js');
});

test('lo que no está en la app es justo lo que no se usa: un juego nuevo se registra o se usa', () => {
  assert.equal(retirados().join('\n'), [...sinUso].sort((a, b) => retirados().indexOf(a) - retirados().indexOf(b)).join('\n'));
  assert.equal(games.length, games.filter(f => index.includes(`src="js/games/${f}"`)).length + retirados().length);
  assert.ok(retirados().length > 200 && retirados().length < games.length / 2);
});

test('los kits de dibujo siguen en la app aunque no registren juegos', () => {
  for (const k of ['kit', 'formula', 'figura-kit', 'logica-kit', 'marca-mueve', 'rotula-mueve', 'explora-kit', 'hoja-kit', 'examen-kit', 'conjuntos-kit', 'geo-kit', 'recta-kit']) {
    assert.ok(index.includes(`src="js/games/${k}.js"`), k);
  }
});

test('los juegos retirados siguen cargando en Node: sus pruebas no se pierden', () => {
  const lista = enRepo(index);
  assert.equal(lista.filter(f => f.startsWith('js/games/')).length, games.length);
  assert.equal(new Set(lista).size, lista.length);
  for (const f of r.sinUso) assert.ok(r.registra[f].length || /algebra-taller/.test(f), `${f} no registró ningún juego al cargarse`);
});
