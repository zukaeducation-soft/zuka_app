// Preuniversitario UdeA · mundo 2 «Geometría», lecciones 1 y 2 (spec 2026-11-18-preuda-geometria): 7 u 8 ejercicios
// distintos, todos gráficos y de arrastrar, con un juego en movimiento al final; y la lógica pura de los juegos nuevos.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = require('./load').shell();
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.lessons.some(l => l.id === 'pu-ge-1'));
const L = id => U.lessons.find(l => l.id === id);
// La lección lleva una ronda por juego (spec 2026-11-20-preuda-razonamiento-diez): las variantes se prueban con estas.
const FULL = {
  'tijera-angulos': [{ kind: 'opp', given: 65 }, { kind: 'sup', given: 50 }, { kind: 'comp', given: 35 }, { kind: 'ratio', k: 2 }, { kind: 'sup', given: 105 }],
  'paralelas-gira': [{ t: 65, top: 0, pair: 'corr' }, { t: 70, top: 10, pair: 'alt' }, { t: 60, top: -15, pair: 'corr' }, { t: 75, top: 5, pair: 'conj' }],
  'suma-poligono': [{ n: 4 }, { n: 5 }, { n: 7 }, { n: 8 }],
};
// Las lecciones usan ahora los juegos de la escena (tests/ejercicios-explora.test.js); estos quedan para evaluación y biblioteca.
Object.assign(FULL, {
  'apice-triangulo': [{ mode: 'falta', A: 35, C: 90 }, { mode: 'tipo', tipo: 'rectangulo', y: 'isosceles', A: 45 }],
  'cuadrados-pitagoras': [{ c2: 100 }, { c2: 145 }], 'escalera-pared': [{ L: 17, h: 8 }, { L: 25, h: 24 }],
});
const ex = (id, game) => ({ params: { max: 12, rounds: FULL[game] } });
const ZONA = ['completa-solucion', 'caza-error', 'opcion-examen'];
const NEW = ['tijera-angulos', 'paralelas-gira', 'apice-triangulo', 'suma-poligono', 'cuadrados-pitagoras', 'escalera-pared', 'billar-rebote'];
// pu-ge-2 terminaba en vuela-precios; desde la spec 2026-11-20-preuda-movimiento, en aro-lanza (mismas preguntas).
const MOVING = ['lanza-angulo', 'lanza-cuerda'];
const BORING = ['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'verdadero-falso', 'ordena-terminos'];
// El estado con que se gana cada ronda de un juego por rondas.
const win = (game, params, state) => GAMES[game].grade({ rounds: state }, params).ok;

test('pu-ge-1 y pu-ge-2: 7 u 8 juegos distintos, gráficos, con pista, y uno en movimiento al final', () => {
  for (const id of ['pu-ge-1', 'pu-ge-2']) {
    const l = L(id), games = l.ex.slice(0, -3).map(e => e.game);
    assert.equal(l.ex.slice(-3).map(e => e.game).join(), ZONA.join(), `${id}: zona de examen`);
    assert.ok(games.length >= 7 && games.length <= 8, `${id}: ${games.length}`);
    assert.equal(new Set(games).size, games.length, `${id}: repetido (${games})`);
    for (const e of l.ex) {
      assert.equal(e.type, 'play');
      assert.ok(GAMES[e.game], `${id}: no existe ${e.game}`);
      assert.ok(!BORING.includes(e.game), e.game);
      assert.ok(GUIDES[e.game] || GAMES[e.game].demo, `${e.game} sin explicación`);
      assert.ok(e.hint?.length > 20 && e.explain?.length > 20, `${e.game} sin pista`);
    }
    assert.ok(MOVING.includes(games.at(-1)), `${id} termina en ${games.at(-1)}`);
    assert.ok(!games.slice(0, -1).some(g => MOVING.includes(g)));
  }
});

test('los juegos nuevos están registrados, con su guía y su demostración sobre el lienzo', () => {
  assert.ok(html.indexOf('js/games/geo-kit.js') < html.indexOf('js/games/tijera-angulos.js'));
  assert.ok(html.indexOf('js/games/kit.js') < html.indexOf('js/games/geo-kit.js'));
  for (const g of [...NEW, 'geo-kit']) { assert.ok(html.includes(`js/games/${g}.js`), g); assert.ok(sw.includes(`js/games/${g}.js`), g); }
  for (const g of NEW) { assert.ok(GUIDES[g], g); assert.equal(GAMES[g].demo, true, `${g} sin demo`); }
});

test('tijera-angulos: opuestos iguales, vecinos suman 180°, complementarios 90° y el vecino doble', () => {
  const g = GAMES['tijera-angulos'], P = ex('pu-ge-1', 'tijera-angulos').params;
  assert.equal(P.rounds.map(g.want).join(), '65,130,55,60,75');
  for (const r of P.rounds) { const w = g.want(r); assert.ok(w % 5 === 0 && w >= 5 && w <= 175 && w !== 100, JSON.stringify(r)); }
  assert.ok(win('tijera-angulos', P, P.rounds.map(r => ({ a: g.want(r) }))));
  assert.ok(!win('tijera-angulos', P, P.rounds.map((r, i) => ({ a: g.want(r) + (i === 1 ? 5 : 0) }))));
});

test('paralelas-gira: se gana solo con la misma inclinación, y se puede llegar a ella', () => {
  const P = ex('pu-ge-1', 'paralelas-gira').params;
  for (const r of P.rounds) { assert.ok(r.top % 5 === 0 && Math.abs(r.top) <= 35 && r.t - r.top > 20 && r.t - r.top < 160, JSON.stringify(r)); }
  assert.deepEqual([...new Set(P.rounds.map(r => r.pair))].sort().join(), 'alt,conj,corr');
  assert.ok(win('paralelas-gira', P, P.rounds.map(r => ({ b: r.top }))));
  assert.ok(!win('paralelas-gira', P, P.rounds.map(r => ({ b: r.top + 5 }))));
});

test('apice-triangulo: el ángulo que falta y los tipos de triángulo', () => {
  const g = GAMES['apice-triangulo'];
  for (const id of ['pu-ge-1', 'pu-ge-2']) {
    const P = ex(id, 'apice-triangulo').params, ans = P.rounds.map(g.answer);
    for (const [i, a] of ans.entries()) {
      assert.ok(a, `${id} ronda ${i} sin solución`);
      assert.ok(a.A % 5 === 0 && a.B % 5 === 0 && a.A >= 10 && a.B >= 10 && a.A + a.B <= 170, JSON.stringify(a));
      assert.ok(!(a.A === 50 && a.B === 25), 'la ronda no puede empezar resuelta');
      // El vértice se arrastra con el dedo: no puede quedar más alto que el lienzo (alto ≤ 0.87 de la base).
      const ta = Math.tan(a.A * Math.PI / 180), tb = Math.tan(a.B * Math.PI / 180);
      assert.ok(a.A === 90 || a.B === 90 ? Math.min(ta, tb) <= 0.87 : ta * tb / (ta + tb) <= 0.87, `${id} ronda ${i}: triángulo muy alto`);
    }
    assert.ok(win('apice-triangulo', P, ans));
  }
  assert.ok(g.okOf({ A: 50, B: 60 }, { mode: 'falta', A: 50, C: 70 }));
  assert.ok(!g.okOf({ A: 50, B: 55 }, { mode: 'falta', A: 50, C: 70 }));
  assert.ok(g.okOf({ A: 45, B: 90 }, { mode: 'tipo', tipo: 'rectangulo', y: 'isosceles', A: 45 }));
  assert.ok(!g.okOf({ A: 45, B: 60 }, { mode: 'tipo', tipo: 'rectangulo', y: 'isosceles', A: 45 }));
  assert.ok(!g.okOf({ A: 60, B: 50 }, { mode: 'tipo', tipo: 'equilatero', A: 60 }));
});

test('suma-poligono: hay que trazar las n − 3 diagonales; quedan n − 2 triángulos', () => {
  const P = ex('pu-ge-1', 'suma-poligono').params;
  for (const r of P.rounds) assert.ok(r.n >= 4 && r.n <= 8);
  assert.ok(win('suma-poligono', P, P.rounds.map(r => ({ d: Array.from({ length: r.n - 3 }, (_, i) => i + 2) }))));
  assert.ok(!win('suma-poligono', P, P.rounds.map(r => ({ d: [] }))));
  assert.match(GAMES['suma-poligono'].grade({ rounds: P.rounds.map(() => ({ d: [] })) }, P).solution, /540°/);
});

test('cuadrados-pitagoras: cada ronda tiene catetos enteros dentro de la cuadrícula', () => {
  const P = ex('pu-ge-2', 'cuadrados-pitagoras').params;
  // La cuadrícula de cada ronda es más pequeña que la máxima: los catetos tienen que caber en ella.
  const sol = P.rounds.map(r => { const m = GAMES['cuadrados-pitagoras'].size(r, P); for (let a = 1; a <= m; a++) for (let b = 1; b <= m; b++) if (a * a + b * b === r.c2) return { a, b }; return null; });
  assert.ok(sol.every(Boolean));
  assert.ok(P.rounds.every(r => r.c2 !== 5), 'no puede empezar resuelta (2 y 1)');
  assert.ok(win('cuadrados-pitagoras', P, sol));
  assert.ok(!win('cuadrados-pitagoras', P, sol.map(s => ({ a: s.a, b: s.b + 1 }))));
});

test('escalera-pared: el pie queda a una distancia entera, distinta de la del inicio', () => {
  const g = GAMES['escalera-pared'], P = ex('pu-ge-2', 'escalera-pared').params;
  for (const r of P.rounds) { const d = g.need(r); assert.ok(Number.isInteger(d) && d > 1 && d < r.L, JSON.stringify(r)); }
  assert.ok(win('escalera-pared', P, P.rounds.map(r => ({ d: g.need(r) }))));
  assert.ok(!win('escalera-pared', P, P.rounds.map(r => ({ d: g.need(r) - 1 }))));
});

