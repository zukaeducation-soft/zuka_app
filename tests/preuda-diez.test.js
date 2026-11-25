// Preuniversitario UdeA · razonamiento lógico con diez ejercicios distintos por lección (spec 2026-11-20-preuda-razonamiento-diez).
// En los mundos de PU_DIEZ: 9 a 11 ejercicios por lección, ningún juego repetido, una sola ronda por ejercicio, un juego en
// movimiento antes de la zona de examen y la zona de examen al final (completar la solución, cazar el error y la pregunta en
// formato real). La evaluación lleva por lección dos juegos y una pregunta en formato real.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = require('./load').shell();
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), DIEZ = get(ctx, 'PU_DIEZ'), EXQ = get(ctx, 'EXQ');
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'razonamiento' && DIEZ.includes(u.world));
const ZONA = ['completa-solucion', 'caza-error', 'opcion-examen'];
const BORING = ['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'verdadero-falso', 'ordena-terminos', 'detective-pasos', 'pregunta-examen'];
const MOVING = /MOVING = \[([\s\S]*?)\];/.exec(read('tests/preuda-razonamiento.test.js'))[1].match(/'[^']+'/g).map(s => s.slice(1, -1));
const exs = u => [...u.lessons.flatMap(l => l.ex.map(e => [l.id, e])), ...u.exam.items.map(it => [`examen ${it.lesson}`, it.ex])];

test('los tres juegos de la zona de examen están registrados, con guía y estilo', () => {
  for (const g of ZONA) { assert.ok(GAMES[g]?.grade && GAMES[g].create && GAMES[g].solve, g); assert.ok(GUIDES[g], `${g} sin guía`); }
  assert.ok(html.includes('css/examen.css') && sw.includes("'css/examen.css'") && sw.includes("'js/games/examen-kit.js'"));
  assert.ok(html.indexOf('js/games/kit.js') < html.indexOf('js/games/examen-kit.js'));
  const css = read('css/examen.css');
  assert.ok(!/#[0-9a-f]{3,6}\b/i.test(css.replace(/var\(--outer, #000\)/g, '')), 'colores fijos en examen.css: usar las variables de tema');
});

test('la zona de examen califica: la solución gana y un estado vacío o cambiado no', () => {
  const c = { q: 'x', lines: ['a [[2]] b [[3]]', 'c [[5]]'], extra: ['7', '9'] };
  assert.equal(GAMES['completa-solucion'].grade({ fill: ['2', '3', '5'] }, c).ok, true);
  assert.equal(GAMES['completa-solucion'].grade({ fill: ['3', '2', '5'] }, c).ok, false);
  assert.equal(GAMES['completa-solucion'].grade({ fill: ['2', '3', null] }, c).ok, false);
  assert.equal(GAMES['completa-solucion'].grade(undefined, c).ok, false);
  const k = { q: 'x', steps: ['a', 'b', 'c'], wrong: 1, fixes: ['B', 'z', 'y'], fix: 0 };
  assert.equal(GAMES['caza-error'].grade({ line: 1, fix: 0 }, k).ok, true);
  assert.equal(GAMES['caza-error'].grade({ line: 1, fix: 2 }, k).ok, false);
  assert.equal(GAMES['caza-error'].grade({ line: 0, fix: 0 }, k).ok, false);
  assert.match(GAMES['caza-error'].grade({}, k).solution, /paso 2.*B/);
  const o = { q: 'x', options: ['a', 'b', 'c', 'd'], answer: 3 };
  assert.equal(GAMES['opcion-examen'].grade({ pick: 3 }, o).ok, true);
  assert.equal(GAMES['opcion-examen'].grade({ pick: -1 }, o).ok, false);
  assert.match(GAMES['opcion-examen'].grade({}, o).solution, /^D\. d/);
});

test('lecciones: 9 a 11 ejercicios, todos con juegos distintos, de una ronda, con pista y explicación', () => {
  assert.ok(units.length >= 1, 'ningún mundo en PU_DIEZ');
  for (const u of units) for (const l of u.lessons) {
    const games = l.ex.map(e => e.game);
    assert.ok(l.ex.length >= 9 && l.ex.length <= 11, `${l.id}: ${l.ex.length} ejercicios`);
    assert.equal(new Set(games).size, games.length, `${l.id}: juego repetido (${games})`);
    for (const e of l.ex) {
      assert.equal(e.type, 'play', l.id);
      assert.ok(GAMES[e.game], `${l.id}: no existe ${e.game}`);
      assert.ok(!BORING.includes(e.game), `${l.id}: ${e.game}`);
      assert.ok(GUIDES[e.game] || GAMES[e.game].demo, `${e.game} sin explicación`);
      assert.ok(e.hint?.length > 20 && e.explain?.length > 20, `${l.id}: ${e.game} sin pista o explicación`);
      const r = e.params.rounds;
      if (Array.isArray(r)) {
        assert.equal(r.length, 1, `${l.id}: ${e.game} tiene ${r.length} rondas`);
        // Preguntas sueltas dentro de la ronda (los arcades): tres como máximo. Una lista de cosas para ordenar no cuenta.
        if (r[0].items?.[0]?.options || r[0].items?.[0]?.expr || r[0].items?.[0]?.sign) assert.ok(r[0].items.length <= 3, `${l.id}: ${e.game} tiene ${r[0].items.length} preguntas`);
      }
    }
  }
});

test('lecciones: un juego en movimiento y, al final, la zona de examen en su orden', () => {
  for (const u of units) for (const l of u.lessons) {
    const games = l.ex.map(e => e.game);
    assert.equal(games.slice(-3).join(), ZONA.join(), `${l.id}: termina en ${games.slice(-3)}`);
    assert.ok(MOVING.includes(games.at(-4)), `${l.id}: antes de la zona de examen va ${games.at(-4)}, que no es de movimiento`);
    assert.ok(!games.slice(0, -3).some(g => ZONA.includes(g)), l.id);
  }
});

test('zona de examen: datos completos y con una sola respuesta', () => {
  const letters = [0, 0, 0, 0];
  for (const u of units) for (const [where, e] of exs(u)) {
    const p = e.params;
    if (!ZONA.includes(e.game)) continue;
    assert.ok(p.q.length >= 30, `${where}: enunciado corto en ${e.game}`);
    assert.ok(!/examen de admisi|simulacro|udea/i.test(p.q), where);
    assert.equal((p.q.match(/\$/g) || []).length % 2, 0, `${where}: $ sin cerrar`);
    if (e.game === 'completa-solucion') {
      const bl = EXQ.blanksOf(p);
      assert.ok(bl.length >= 3 && bl.length <= 6, `${where}: ${bl.length} huecos`);
      assert.ok(p.lines.length >= 2 && p.lines.length <= 5, where);
      assert.ok(p.extra.length >= 2, `${where}: faltan fichas que sobren`);
      for (const x of p.extra) assert.ok(!bl.includes(x), `${where}: la ficha «${x}» sobra y también es respuesta`);
      for (const l of p.lines) assert.equal((l.replace(/\[\[.+?\]\]/g, '').match(/\$/g) || []).length % 2, 0, `${where}: $ sin cerrar en «${l}»`);
      for (const l of p.lines) for (const part of l.split(/\[\[.+?\]\]/)) assert.equal((part.match(/\$/g) || []).length % 2, 0, `${where}: hueco dentro de una fórmula en «${l}»`);
      assert.equal(GAMES[e.game].grade(GAMES[e.game].solve(p), p).ok, true);
    } else if (e.game === 'caza-error') {
      assert.ok(p.steps.length >= 3 && p.steps.length <= 5, `${where}: ${p.steps.length} pasos`);
      assert.ok(p.wrong >= 0 && p.wrong < p.steps.length && p.fixes.length === 3 && p.fix === 0, where);
      assert.equal(new Set([...p.fixes, p.steps[p.wrong]]).size, 4, `${where}: correcciones repetidas`);
    } else {
      assert.equal(p.options.length, 4, where);
      assert.equal(new Set(p.options.map(String)).size, 4, `${where}: opciones repetidas`);
      assert.ok(p.answer >= 0 && p.answer < 4, where);
      letters[p.answer]++;
    }
  }
  const n = letters.reduce((a, b) => a + b, 0);
  if (n >= 8) for (const k of letters) assert.ok(k / n <= 0.4 && k > 0, `respuestas mal repartidas entre A–D: ${letters}`);
});

test('evaluación: por lección dos juegos y una pregunta en formato real; nada repetido ni con varias rondas', () => {
  for (const u of units) {
    const games = u.exam.items.map(it => it.ex.game).filter(g => g !== 'opcion-examen');
    assert.equal(new Set(games).size, games.length, `${u.world}: juego repetido en la evaluación (${games})`);
    for (const l of u.lessons) {
      const mine = u.exam.items.filter(it => it.lesson === l.id);
      assert.ok(mine.length >= 3, `${u.world}: ${l.id} tiene ${mine.length} preguntas`);
      assert.equal(mine.filter(it => it.ex.game === 'opcion-examen').length, 1, `${u.world}: ${l.id} sin pregunta en formato real`);
    }
    for (const it of u.exam.items) {
      assert.ok(!BORING.includes(it.ex.game) && it.ex.game !== 'completa-solucion' && it.ex.game !== 'caza-error', `${u.world}: ${it.ex.game}`);
      const r = it.ex.params.rounds;
      if (Array.isArray(r)) assert.equal(r.length, 1, `${u.world}: ${it.ex.game} con ${r.length} rondas`);
    }
  }
});
