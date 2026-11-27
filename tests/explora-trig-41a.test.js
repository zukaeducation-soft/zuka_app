// Explicación interactiva de trig-41a (Grados y radianes) en el formato Explora (spec 2026-11-23-explora-leccion-interactiva):
// la escena «angulo» (lógica pura) y el contenido: primero se explica, después se practica y el problema va al final.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = require('./load').shell();
const ctx = loadScripts(['js/explora.js', 'js/explora-angulo.js', 'js/explora-trig-41a.js']);
const XP = get(ctx, 'XP'), L = get(ctx, 'EXPLORA')['trig-41a'], rad = get(ctx, 'xpRad');
const A = XP.angulo;

test('la escena y el contenido están en index.html (después de explora.js, antes de player.js) y en el service worker', () => {
  for (const f of ['js/explora-angulo.js', 'js/explora-trig-41a.js']) {
    assert.ok(html.includes(`src="${f}"`) && sw.includes(`'${f}'`), f);
    assert.ok(html.indexOf('js/explora.js') < html.indexOf(f) && html.indexOf(f) < html.indexOf('js/player.js'), f);
  }
});

test('radianes con π, simplificados', () => {
  const casos = { 0: '0', 45: '\\tfrac{\\pi}{4}', 90: '\\tfrac{\\pi}{2}', 180: '\\pi', 360: '2\\pi', 330: '\\tfrac{11\\pi}{6}', '-120': '-\\tfrac{2\\pi}{3}', '-180': '-\\pi', 225: '\\tfrac{5\\pi}{4}' };
  for (const [d, r] of Object.entries(casos)) assert.equal(rad(+d), r, d);
  assert.equal(rad(-120, false), '−2π/3');
  assert.equal(rad(60, false), 'π/3');
});

test('ángulo: meta exacta, coterminales y frases', () => {
  assert.equal(A.ok({ deg: -60 }, { meta: -60 }), true);
  assert.equal(A.ok({ deg: 300 }, { meta: -60 }), false, 'termina en el mismo lado, pero el giro es otro');
  const cot = { cot: 75 };
  assert.equal(A.ok({ deg: 435 }, cot), true);
  assert.equal(A.ok({ deg: -285 }, cot), true);
  assert.equal(A.ok({ deg: 75 }, cot), false, 'distinto de 75°');
  assert.equal(A.ok({ deg: 90 }, cot), false);
  assert.match(A.lee({ deg: -120 }, { etq: 'ambos' }), /-120\^\\circ = -\\tfrac\{2\\pi\}\{3\}/);
  assert.match(A.lee({ deg: 45 }, { etq: 'rad' }), /\\theta = \\tfrac\{\\pi\}\{4\}\$/);
  assert.match(A.dice({ deg: -60 }), /negativo/);
  assert.match(A.dice({ deg: 120 }), /positivo/);
  assert.match(A.dice({ deg: 450 }), /Una vuelta y 90° más, hacia adelante/);
  assert.match(A.dice({ deg: -720 }), /2 vueltas exactas, hacia atrás/);
  assert.match(A.dice({ deg: 360 }), /Una vuelta exacta, hacia adelante/);
  assert.match(A.dice({ deg: 0 }, { pista: 'Piensa π como 180°.' }), /Piensa/);
  const src = read('js/explora-angulo.js');
  assert.match(src, /role="slider" tabindex="0"/, 'se puede usar con teclado');
  assert.match(src, /aria-valuenow/);
  assert.match(src, /e\.pointerId !== dedo/, 'un solo dedo a la vez');
  assert.ok(L.pasos.filter(p => p.tipo === 'angulo' && (p.cap === 3 || p.cap === 5)).every(p => p.pista), 'conversión y problema con pista');
});

test('primero se explica y después se pide: cada capítulo abre con su explicación y el problema va al final', () => {
  L.caps.slice(0, -1).forEach((c, k) => assert.equal(L.pasos.find(p => p.cap === k).tipo, 'muestra', `«${c}» abre explicando`));
  const ult = L.pasos.filter(p => p.cap === L.caps.length - 1);
  assert.ok(ult[0].tipo === 'angulo' && /reloj/.test(ult[0].texto), 'el problema de contexto va al final');
  assert.equal(L.pasos.at(-1).tipo, 'cierre');
  const caps = L.pasos.map(p => p.cap);
  assert.equal(caps.join(), [...caps].sort((a, b) => a - b).join());
});

test('cada paso es corto, se puede cumplir y no nace cumplido', () => {
  for (const p of L.pasos) {
    const t = XP[p.tipo];
    assert.ok(t, p.tipo);
    assert.ok(p.texto.replace(/[$*\\]/g, '').length <= 170, `texto largo: ${p.texto}`);
    assert.ok(p.idea && p.idea.length <= 130, `idea larga: ${p.idea}`);
    if (p.tipo !== 'cierre') assert.equal(t.ok(t.ini(p), p), false, `${p.tipo} nace cumplido`);
    assert.equal(t.ok(t.sol(p), p), true, `${p.tipo} no se puede cumplir`);
    if (p.tipo === 'angulo') { const g = t.sol(p).deg; assert.ok(g % 15 === 0 && Math.abs(g) <= 720, 'se alcanza con pasos de 15°'); }
  }
});

test('explicaciones: momentos que se pueden leer, giros dentro de la rueda y cuentas verdaderas', () => {
  for (const p of L.pasos.filter(p => p.tipo === 'muestra')) {
    assert.equal(p.escena, 'angulo');
    assert.ok(p.momentos.length >= 4 && p.momentos.length <= 7);
    for (const m of p.momentos) {
      assert.ok(m.dice.length <= 115, m.dice);
      const t = XP.muestra.pausa(m);
      assert.ok(t >= 1500 && t <= 5600, `${m.dice}: ${t} ms`);
      assert.ok(Math.abs(m.de) <= 720 && Math.abs(m.a) <= 720);
    }
  }
  // La ficha termina en el ángulo que dice la cuenta (cuando la cuenta da un ángulo en grados).
  for (const m of L.pasos.filter(p => p.tipo === 'muestra').flatMap(p => p.momentos)) {
    const g = /^\$\\theta = (-?\d+)\^\\circ\$$/.exec(m.cuenta || '') || /^\$(-?\d+)\^\\circ = /.exec(m.cuenta || '');
    if (g) assert.equal(m.a, +g[1], m.cuenta);
  }
  const radian = L.pasos.find(p => p.cap === 2 && p.tipo === 'muestra').momentos[1];
  assert.ok(Math.abs(radian.a * Math.PI / 180 - 1) < 1e-9, 'el radián: arco igual al radio');
});

test('no se dice cuántos grados mide un radián (lo calcula un ejercicio) y los ejemplos no son los de los ejercicios', () => {
  const todo = JSON.stringify(L, (k, v) => (typeof v === 'number' ? undefined : v));   // solo lo que se lee
  assert.ok(!/57[.,]\d/.test(todo), 'nada de 57.3');
  const lc = loadScripts(require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f)));
  const l = get(lc, 'COURSES').find(c => c.id === 'trig').units[0].lessons[0];
  assert.equal(l.id, 'trig-41a');
  // Los ángulos que piden los ejercicios (los valores de referencia como 30°, 45° o 60° salen en sus explicaciones).
  const usados = new Set(l.ex.flatMap(e => (e.params?.rounds || []).flatMap(r => [r.target, ...(r.items || []).map(i => i.deg)])).filter(x => x != null));
  assert.ok(usados.has(150) && usados.has(765), 'lee los ángulos de los ejercicios');
  const metas = L.pasos.filter(p => p.tipo === 'angulo').map(p => p.meta ?? p.cot);
  for (const g of metas) assert.ok(!usados.has(g), `${g}° ya sale en los ejercicios`);
});
