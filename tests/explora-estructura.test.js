// Todas las explicaciones Explora siguen el mismo molde (spec 2026-11-23-explora-leccion-interactiva): cada capítulo abre con una
// explicación que corre sola, sigue «tu turno», el problema de contexto va al final y el cierre de último. Cada paso es corto, se
// puede cumplir y no nace cumplido; cada momento se alcanza a leer. Sirve para todas las lecciones nuevas sin escribir otra prueba.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const MOTOR = ['js/explora.js', 'js/explora-angulo.js', 'js/explora-numeros.js', 'js/explora-escenas.js', 'js/explora-lectura.js', 'js/explora-mate.js'];
const contenido = fs.readdirSync(path.join(ROOT, 'js')).filter(f => /^explora-.+\.js$/.test(f) && !MOTOR.includes(`js/${f}`)).map(f => `js/${f}`);
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), sw = require('./load').shell();
contenido.sort((a, b) => html.indexOf(`src="${a}"`) - html.indexOf(`src="${b}"`));   // en el orden de carga de la app
const ctx = loadScripts([...MOTOR, ...contenido]);
const XP = get(ctx, 'XP'), EXPLORA = get(ctx, 'EXPLORA');

test('cada archivo de explicación y de escenas está en index.html (antes de player.js) y en el service worker', () => {
  for (const f of [...MOTOR, ...contenido]) {
    assert.ok(html.includes(`src="${f}"`) && sw.includes(`'${f}'`), f);
    assert.ok(html.indexOf(f) < html.indexOf('js/player.js'), `${f} antes de player.js`);
  }
  for (const f of contenido) assert.ok(html.indexOf(f) > html.indexOf('js/explora-numeros.js'), `${f} después de las escenas`);
});

for (const [id, L] of Object.entries(EXPLORA)) {
  test(`${id}: el molde de la explicación`, () => {
    const caps = L.pasos.map(p => p.cap);
    assert.equal(caps.join(), [...caps].sort((a, b) => a - b).join(), 'capítulos en orden');
    assert.equal(new Set(caps).size, L.caps.length, 'ningún capítulo vacío');
    L.caps.slice(0, -1).forEach((c, k) => assert.equal(L.pasos.find(p => p.cap === k).tipo, 'muestra', `«${c}» abre explicando`));
    const ult = L.pasos.filter(p => p.cap === L.caps.length - 1);
    assert.notEqual(ult[0].tipo, 'muestra', 'el último capítulo es un problema, no otra explicación');
    assert.equal(L.pasos.at(-1).tipo, 'cierre');
  });

  test(`${id}: pasos cortos, que se pueden cumplir y no nacen cumplidos`, () => {
    for (const p of L.pasos) {
      const t = XP[p.tipo];
      assert.ok(t, `tipo ${p.tipo}`);
      assert.ok(p.texto.replace(/[$*\\]/g, '').length <= 170, `texto largo: ${p.texto}`);
      assert.ok(p.idea && p.idea.length <= 135, `idea larga: ${p.idea}`);
      if (p.tipo !== 'cierre') assert.equal(t.ok(t.ini(p), p), false, `${p.tipo} nace cumplido: ${p.texto}`);
      assert.equal(t.ok(t.sol(p), p), true, `${p.tipo} no se puede cumplir: ${p.texto}`);
      if (t.dice && p.tipo !== 'muestra') assert.ok(t.dice(t.ini(p), p).length <= 110, `frase larga en ${p.tipo}`);
    }
  });

  test(`${id}: cada explicación tiene de 4 a 7 momentos que se alcanzan a leer`, () => {
    for (const p of L.pasos.filter(p => p.tipo === 'muestra')) {
      assert.ok(XPD_tiene(p.escena), `escena ${p.escena}`);
      assert.ok(p.momentos.length >= 4 && p.momentos.length <= 7, `${p.texto}: ${p.momentos.length} momentos`);
      for (const m of p.momentos) {
        assert.ok(m.dice.length <= 115, `momento largo: ${m.dice}`);
        const ms = XP.muestra.pausa(m);
        assert.ok(ms >= 1500 && ms <= 5600, `${m.dice}: ${ms} ms`);
      }
    }
  });
}
function XPD_tiene(e) { return typeof get(ctx, 'XPD')[e] === 'function'; }

test('escenas de números: barras, cuadrícula de 100 y potencia', () => {
  const B = XP.barras;
  assert.equal(B.ok({ d: 8, n: 4 }, { meta: [1, 2] }), true, 'cuatro octavos son un medio');
  assert.equal(B.ok({ d: 6, n: 2 }, { meta: [1, 3], dpide: 12 }), false, 'pide doceavos');
  assert.equal(B.ok({ d: 12, n: 4 }, { meta: [1, 3], dpide: 12 }), true);
  assert.match(B.lee({ d: 6, n: 5 }, { total: 42 }), /\\tfrac\{5\}\{6\} \\text\{ de \} 42 = 35/);
  assert.match(B.lee({ d: 12, n: 10 }, {}), /= \\tfrac\{5\}\{6\}/, 'simplifica');
  const K = XP.cien;
  assert.match(K.lee({ k: 35 }, { total: 240 }), /35\\,\\% = \\tfrac\{35\}\{100\} = 0\.35 .*= 84/);
  assert.match(K.dice({ k: 55 }, { total: 600 }), /Cada casilla vale 6/);
  const P = XP.potencia;
  assert.match(P.lee({ e: 3 }, { base: 2 }), /2\^\{3\} = 2 \\cdot 2 \\cdot 2 = 8/);
  assert.match(P.lee({ e: 0 }, { base: 5 }), /5\^0 = 1/);
  assert.match(P.lee({ s: 8 }, { modo: 'lado' }), /\\sqrt\{64\} = 8/);
  assert.equal(P.ok({ e: 5 }, { base: 10, meta: 5 }), true);
});

test('mundo 1: las prácticas no repiten lo que piden los ejercicios', () => {
  const t = id => JSON.stringify(EXPLORA[id]);
  assert.ok(!/pizza/i.test(t('pu-cm-2')), 'la pizza es de un ejercicio');
  assert.ok(!EXPLORA['pu-cm-4'].pasos.some(p => p.base === 3 && p.meta === 4), '3⁴ = 81 es de un ejercicio');
  assert.ok(!EXPLORA['pu-cm-3'].pasos.some(p => p.meta === 75 || p.meta === 40), '75 % y 2/5 son de ejercicios');
});

test('revisión del mundo 1: cortar conserva lo tomado, miles con espacio, alto fijo en las explicaciones', () => {
  const src = fs.readFileSync(path.join(ROOT, 'js/explora-numeros.js'), 'utf8');
  assert.match(src, /n: Math\.round\(f0 \* d\)/, 'el tamaño se toma al empezar a cortar, no se redondea paso a paso');
  assert.ok(!/toLocaleString/.test(src), 'nada de 100.000 con punto');
  assert.equal(get(ctx, 'xpMiles')(100000), '100 000');
  assert.match(XP.potencia.lee({ e: 5 }, { base: 10 }), /= 100\\,000\$/);
  assert.match(fs.readFileSync(path.join(ROOT, 'js/explora.js'), 'utf8'), /const en = \{ \.\.\.p\.en, momentos: p\.momentos \}/);
  assert.equal(XP.barras.dice({ d: 1, n: 0 }, {}).includes('1 partes'), false);
});
