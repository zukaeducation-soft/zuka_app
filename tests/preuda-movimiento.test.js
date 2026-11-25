// Preuniversitario UdeA · razonamiento: el juego en movimiento de cada lección (spec 2026-11-20-preuda-movimiento).
// Antes casi todas terminaban en vuela-precios o rompe-cambios. Ahora hay seis juegos más (kit MV, js/games/mueve-kit.js),
// cada uno con su mecánica de arrastrar, y el reparto cumple: ninguno en más de seis lecciones del componente, ninguno en
// dos lecciones seguidas del mismo mundo y vuela-precios y rompe-cambios en cinco lecciones o menos cada uno.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = read('sw.js');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), ARCADE = get(ctx, 'GUIDE_ARCADE');
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'razonamiento');
const NEW = ['barco-muelle', 'aro-lanza', 'canica-tablero', 'tren-aguja', 'grua-carga', 'rueda-cabinas'];
const MOVING = /MOVING = \[([\s\S]*?)\];/.exec(read('tests/preuda-razonamiento.test.js'))[1].match(/'[^']+'/g).map(s => s.slice(1, -1));
const motionOf = l => l.ex.at(-4);
const params = { rounds: [{ title: 'Prueba', items: [{ ask: '2 + 2', options: ['4', '5', '3'], answer: 0 }, { ask: '3 · 3', options: ['6', '9', '12'], answer: 1 }] }] };

test('los seis juegos nuevos están registrados, con guía, demostración y vidas', () => {
  assert.ok(html.indexOf('js/games/kit.js') < html.indexOf('js/games/mueve-kit.js'));
  for (const g of NEW) {
    assert.ok(GAMES[g]?.grade && GAMES[g].create, g);
    assert.equal(GAMES[g].demo, true, `${g}: se explica sobre el juego`);
    assert.ok(GUIDES[g], `${g} sin guía`);
    assert.ok(ARCADE.has(g), `${g} no está en GUIDE_ARCADE`);
    assert.ok(MOVING.includes(g), `${g} no está en MOVING de tests/preuda-razonamiento.test.js`);
    assert.ok(html.indexOf('js/games/mueve-kit.js') < html.indexOf(`js/games/${g}.js`), `${g} va después del kit`);
    assert.ok(sw.includes(`'js/games/${g}.js'`), g);
    const src = read(`js/games/${g}.js`);
    assert.match(src, /\n    demo\(G\) \{/, `${g}: define el gesto`);
    assert.match(src, /\n    peek\(G\) \{[\s\S]*solve:/, `${g}: peek con solve para el robot`);
    assert.match(src, /\n    drag\(G/, `${g}: se arrastra`);
  }
  assert.ok(sw.includes("'js/courses/preuda-r-movimiento.js'"));
});

test('grade de los juegos nuevos: gana con todos los retos resueltos y no con menos', () => {
  for (const g of NEW) {
    const G = GAMES[g];
    assert.equal(G.grade({ done: [2] }, params).ok, true, g);
    assert.equal(G.grade({ done: [1] }, params).ok, false, g);
    assert.equal(G.grade({ done: [0] }, params).ok, false, g);
    assert.equal(G.grade(undefined, params).ok, false, g);
    assert.equal(G.grade({}, params).solution, '2 + 2: 4 · 3 · 3: 9', g);
    for (const it of params.rounds[0].items) {
      assert.equal(G.ok(G.answer(it), it), true, `${g}: la respuesta gana`);
      for (let k = 0; k < 3; k++) if (k !== it.answer) assert.equal(G.ok({ pick: k }, it), false, `${g}: la opción ${k} no gana`);
      assert.equal(G.ok({ pick: -1 }, it), false, `${g}: sin elegir no gana`);
    }
  }
});

test('la física de cada juego, pura', () => {
  // Barco: no atraviesa una boya, avanza a lo sumo un paso y atraca en el muelle de su carril.
  const B = GAMES['barco-muelle'], bay = B.bay(328, 100, 392, 3), o = bay.buoys[0];
  const s1 = B.stepBoat(bay, { x: o.x - 40, y: o.y }, { x: o.x + 40, y: o.y }, 200);
  assert.ok(Math.hypot(s1.x - o.x, s1.y - o.y) >= 20, 'la boya empuja al barco');
  const s2 = B.stepBoat(bay, bay.start, { x: bay.start.x + 100, y: bay.start.y }, 10);
  assert.ok(Math.abs(s2.x - bay.start.x - 10) < 1e-9, 'un paso de 10');
  assert.equal(B.dockAt(bay, { x: bay.docks[2].x + 20, y: bay.docks[2].y }), 2);
  assert.equal(B.dockAt(bay, bay.start), -1);
  // Aro: cae K veces más lejos que el dedo y ensarta la estaca que tiene debajo.
  const A = GAMES['aro-lanza'], c = A.court(328, 100, 392, 3), g = c.pegs[2];
  const land = A.landOf(c, { x: c.ring.x + (g.x - c.ring.x) / A.K, y: c.ring.y + (g.y - c.ring.y) / A.K });
  assert.ok(Math.hypot(land.x - g.x, land.y - g.y) < 1e-6);
  assert.equal(A.pegAt(c, land), 2);
  assert.equal(A.pegAt(c, c.ring), -1);
  // Canica: rueda hacia el lado bajo, se queda quieta con el tablero plano y cae solo sobre un hueco.
  const M = GAMES['canica-tablero'];
  assert.ok(M.roll(0.5, -10, 0.1) > 0.5 && M.roll(0.5, 10, 0.1) < 0.5 && M.roll(0.5, 0, 1) === 0.5);
  assert.equal(M.holeAt(M.holeF(1, 3), 3), 1);
  assert.equal(M.holeAt(0.03, 3), -1, 'la canica empieza fuera de los huecos');
  // Tren: avanza por la vía siguiendo al dedo, sin saltos, y la aguja apunta al ramal más cercano al dedo.
  const T = GAMES['tren-aguja'], tr = T.tracks(328, 100, 392, 3);
  assert.equal(T.leverOf(tr, tr.xs, tr.stations[0].y), 0);
  assert.equal(T.leverOf(tr, tr.xs, tr.stations[2].y), 2);
  const d = T.follow(tr.paths[0], 0, { x: 400, y: 0 });
  assert.ok(d > 0 && d <= 60, 'no salta más de lo que alcanza');
  assert.ok(Math.abs(T.at(tr.paths[1], tr.paths[1].total).y - tr.stations[1].y) < 1e-6, 'el ramal termina en su estación');
  // Grúa: el balanceo se apaga solo y la caja cae en el camión que tiene debajo.
  const Gr = GAMES['grua-carga'];
  let sw1 = { phi: 0.4, w: 0 };
  for (let i = 0; i < 400; i++) sw1 = Gr.swing(sw1.phi, sw1.w, 0, 0.02);
  assert.ok(Math.abs(sw1.phi) < 0.02 && Math.abs(sw1.w) < 0.05, 'se queda quieta');
  assert.ok(Gr.swing(0, 0, 2000, 0.05).phi < 0, 'al arrancar el carro, la caja se queda atrás');
  const y = Gr.yard(328, 100, 392, 3);
  assert.equal(Gr.truckAt(y, y.trucks[1].x), 1);
  assert.equal(Gr.truckAt(y, y.home), -1, 'la caja empieza fuera de los camiones');
  // Rueda: se acomoda con una cabina en el andén y empieza sin ninguna ahí.
  const R = GAMES['rueda-cabinas'], th = R.snapOf(1.234, 3), DOWN = Math.PI / 2;
  assert.ok([0, 1, 2].some(k => Math.abs(R.wrap(th + 2 * Math.PI * k / 3 - DOWN)) < 1e-9));
  assert.ok([0, 1, 2].every(k => Math.abs(R.wrap(R.startOf(3) + 2 * Math.PI * k / 3 - DOWN)) > 0.5));
});

test('reparto: ningún juego en movimiento en más de seis lecciones ni en dos seguidas del mismo mundo', () => {
  const count = {};
  for (const u of units) {
    u.lessons.forEach((l, i) => {
      const g = motionOf(l).game;
      assert.ok(MOVING.includes(g), `${l.id}: ${g} no es de movimiento`);
      count[g] = (count[g] || 0) + 1;
      if (i > 0) assert.notEqual(g, motionOf(u.lessons[i - 1]).game, `${u.lessons[i - 1].id} y ${l.id} usan ${g}`);
    });
  }
  for (const [g, n] of Object.entries(count)) assert.ok(n <= 6, `${g} sale en ${n} lecciones`);
  assert.ok((count['vuela-precios'] || 0) <= 5, `vuela-precios en ${count['vuela-precios']}`);
  assert.ok((count['rompe-cambios'] || 0) <= 5, `rompe-cambios en ${count['rompe-cambios']}`);
});

test('los juegos nuevos conservan las preguntas: una ronda de tres preguntas como máximo, con respuesta válida', () => {
  for (const u of units) for (const l of u.lessons) {
    const e = motionOf(l);
    if (!NEW.includes(e.game)) continue;
    const r = e.params.rounds;
    assert.equal(r.length, 1, l.id);
    assert.ok(r[0].items.length >= 1 && r[0].items.length <= 3, l.id);
    for (const it of r[0].items) {
      assert.ok(it.ask && it.options.length >= 2 && it.options.length <= 4, `${l.id}: ${it.ask}`);
      assert.ok(it.answer >= 0 && it.answer < it.options.length, `${l.id}: ${it.ask}`);
      assert.equal(new Set(it.options.map(String)).size, it.options.length, `${l.id}: opciones repetidas en ${it.ask}`);
    }
    assert.ok(e.q.length >= 15 && e.q.length <= 60, `${l.id}: enunciado «${e.q}»`);
    assert.ok(!/planeador|pelota|vuela|volar/i.test(`${e.q} ${e.hint}`), `${l.id}: el texto habla del juego viejo`);
    assert.ok(e.hint.length > 20 && e.explain.length > 20, l.id);
  }
});
