// Explicación interactiva en lugar del video (spec 2026-11-23-explora-leccion-interactiva): la lógica de cada tipo de
// paso es pura, cada paso se puede cumplir, no nace cumplido, y la lección piloto pu-cm-1 enseña matemática correcta.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = read('sw.js');
const ctx = loadScripts(['js/explora.js', 'js/explora-pu-cm-1.js']);
const XP = get(ctx, 'XP'), EXPLORA = get(ctx, 'EXPLORA');
const L = EXPLORA['pu-cm-1'];

test('explora.js, su contenido y su hoja de estilo están en index.html y en el service worker', () => {
  for (const f of ['js/explora.js', 'js/explora-pu-cm-1.js']) {
    assert.ok(html.includes(`src="${f}"`), `falta ${f} en index.html`);
    assert.ok(sw.includes(`'${f}'`), `falta ${f} en SHELL`);
  }
  assert.ok(html.includes('href="css/explora.css"') && sw.includes("'css/explora.css'"));
  assert.ok(html.indexOf('js/explora.js') < html.indexOf('js/player.js'), 'explora.js va antes de player.js');
});

test('el reproductor entrega la explicación interactiva en lugar del video', () => {
  assert.match(read('js/player.js'), /exploraPlayer\(/);
});

test('la lección piloto tiene capítulos y entre 12 y 20 pasos cortos, cada uno con su idea', () => {
  assert.ok(L && L.caps.length >= 4);
  assert.ok(L.pasos.length >= 12 && L.pasos.length <= 20, `${L.pasos.length} pasos`);
  L.pasos.forEach((p, i) => {
    assert.ok(XP[p.tipo], `paso ${i}: tipo desconocido ${p.tipo}`);
    assert.ok(p.cap >= 0 && p.cap < L.caps.length, `paso ${i}: capítulo`);
    assert.ok(p.texto && p.texto.replace(/[$*\\]/g, '').length <= 170, `paso ${i}: texto de ${p.texto.length} letras`);
    assert.ok(p.idea && p.idea.length <= 130, `paso ${i}: idea`);
  });
  const caps = L.pasos.map(p => p.cap);
  assert.equal(caps.join(), [...caps].sort((a, b) => a - b).join(), 'los capítulos van en orden');
  assert.equal(new Set(caps).size, L.caps.length, 'ningún capítulo vacío');
  assert.equal(L.pasos[0].tipo, 'apuesta', 'abre con un reto para apostar');
  assert.equal(L.pasos.at(-1).tipo, 'cierre');
});

test('ningún paso nace cumplido (salvo el cierre) y todos se pueden cumplir', () => {
  L.pasos.forEach((p, i) => {
    const t = XP[p.tipo];
    if (p.tipo !== 'cierre') assert.equal(t.ok(t.ini(p), p), false, `paso ${i} (${p.tipo}) ya nace cumplido`);
    assert.equal(t.ok(t.sol(p), p), true, `paso ${i} (${p.tipo}) no se puede cumplir`);
    assert.equal(typeof t.lee(t.sol(p), p), 'string');
  });
});

test('casi todo se hace arrastrando o tocando la escena: a lo sumo dos pasos de fichas', () => {
  assert.ok(L.pasos.filter(p => p.tipo === 'casillas').length <= 2);
  assert.ok(L.pasos.filter(p => p.tipo === 'recta' || p.tipo === 'saltos').length >= 8);
});

test('recta: cada modo mide lo que dice', () => {
  const R = XP.recta;
  assert.equal(R.ok({ v: -5 }, { modo: 'espejo', min: -8, max: 8, desde: 2, meta: 5 }), true);
  assert.equal(R.ok({ v: 5 }, { modo: 'espejo', min: -8, max: 8, desde: 2, meta: 5 }), false);
  assert.match(R.lee({ v: 6 }, { modo: 'distancia', ancla: -2, min: -8, max: 8, desde: -2, meta: 6 }), /= 8\$$/);
  assert.match(R.lee({ v: 2 }, { modo: 'salto', desde: -4, min: -8, max: 8, meta: 2 }), /-4 \+ 6 = 2/);
  assert.match(R.lee({ v: -3 }, { modo: 'salto', desde: 2, min: -8, max: 8, meta: -3 }), /2 \+ \(-5\) = -3/);
  assert.match(R.lee({ v: 6 }, { modo: 'salto', resta: -5, desde: 1, min: -8, max: 8, meta: 6 }), /1 - \(-5\) = 6/);
  const dos = { modo: 'dos', ancla: 1, metas: [-3, 5], min: -8, max: 8 };
  assert.equal(R.ok({ sel: [5, -3] }, dos), true);
  assert.equal(R.ok({ sel: [5] }, dos), false);
  assert.equal(R.ok({ sel: [5, -3, 4] }, dos), false);
});

test('recta: las metas de la lección salen de sus propias cuentas', () => {
  for (const p of L.pasos.filter(p => p.tipo === 'recta')) {
    if (p.modo === 'dos') for (const m of p.metas) assert.equal(Math.abs(m - p.ancla), p.dist);
    if (p.resta != null) assert.equal(p.meta, p.desde - p.resta);
    if (p.suma != null) assert.equal(p.meta, p.desde + p.suma);
    if (p.modo !== 'dos') assert.ok(p.meta >= p.min && p.meta <= p.max && p.desde !== p.meta);
  }
});

test('saltos: la punta cae en múltiplos y el signo de las veces voltea la cadena', () => {
  const T = XP.saltos, p = { a: -3, min: -15, max: 15, meta: 12 };
  assert.equal(T.ok({ b: -4 }, p), true);
  assert.equal(T.ok({ b: 4 }, p), false);
  assert.match(T.lee({ b: -4 }, p), /\(-3\) \\cdot \(-4\) = 12/);
  assert.equal(T.veces(-12.4, p), 4);
  assert.equal(T.veces(40, p), -5, 'no se sale de la recta');
});

test('signos: par de menos da positivo, impar da negativo', () => {
  const G = XP.signos, p = { factores: [2, 3, 1, 2], menos: 3 };
  assert.equal(G.valor({ neg: [true, true, false, false] }, p), 12);
  assert.equal(G.valor({ neg: [true, true, true, false] }, p), -12);
  assert.equal(G.ok({ neg: [true, true, true, false] }, p), true);
  assert.equal(G.ok({ neg: [true, false, false, false] }, p), false);
});

test('capas: el orden es paréntesis, potencias, × y ÷ de izquierda a derecha, + y −', () => {
  const K = XP.capas;
  const run = expr => {
    let s = K.ini({ expr }); const orden = [];
    while (!K.ok(s)) { const i = K.sigue(s.toks); orden.push(s.toks[i]); s = K.aplica(s, i); }
    return { v: s.toks[0], orden: orden.join(' ') };
  };
  assert.deepEqual(run('6 + 2 * ( 1 - 4 ) ^ 2'), { v: 24, orden: '- ^ * +' });
  assert.deepEqual(run('20 / 4 * 5 - 3'), { v: 22, orden: '/ * -' });
  assert.deepEqual(run('( 4 - 9 ) * ( 3 + 1 )'), { v: -20, orden: '- + *' });
  assert.deepEqual(run('2 ^ 3 - ( 7 - ( 1 + 2 ) )'), { v: 4, orden: '+ - ^ -' });
  const s = K.ini({ expr: '6 + 2 * ( 1 - 4 ) ^ 2' });
  assert.equal(K.toca(s, 1).fallo, 'paren', 'tocar el + antes del paréntesis avisa qué capa va primero');
  assert.equal(K.toca(s, 6).fallo, undefined);
});

test('casillas: el menos fuera de la potencia no se eleva', () => {
  const p = L.pasos.find(p => p.tipo === 'casillas');
  const by = Object.fromEntries(p.filas.map(f => [f.tex, f.r]));
  assert.equal(by['$-3^2$'], '−9');
  assert.equal(by['$(-3)^2$'], '9');
  for (const f of p.filas) assert.ok(p.fichas.includes(f.r));
  assert.ok(p.fichas.length > p.filas.length, 'sobran fichas con los errores típicos');
});

test('los ejemplos de la explicación no son los de los ejercicios de la lección', () => {
  const calc = read('js/courses/preuda-r-calculo.js');
  const ex = calc.slice(calc.indexOf("setLesson('pu-cm-1'"), calc.indexOf("setLesson('pu-cm-2'"));
  const capas = L.pasos.find(p => p.tipo === 'capas');
  assert.ok(!ex.includes(capas.expr));
  assert.ok(!/-3\^2|\(-3\)\^2/.test(ex), 'la pareja −3² y (−3)² no sale en los ejercicios');
});
