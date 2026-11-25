// Preuniversitario · Comprensión lectora · variedad de juegos (pedido del 2026-11-21): «mapa-del-texto» salía en 23 lecciones y
// «donde-buscar» en 16, y una estudiante simulada resolvía «donde-buscar» sin leer porque las preguntas venían en el orden de los
// párrafos. Cinco juegos nuevos del kit LEC (ordena-parrafos, subraya-prueba, resumen-esencial, trampa-opcion, cadena-causas)
// toman su lugar. Límites: mapa en 8 lecciones o menos, donde-buscar en 6 o menos y ningún juego en más de 13. (Con 33 lecciones
// de 7 juegos hay 231 casillas; con 20 juegos, el tope de 10 es imposible: 20 × 10 = 200. Con mapa ≤ 8, donde ≤ 6 y el puente
// solo en las 2 lecciones de dos textos, los 17 juegos restantes cubren 215 casillas: el tope más bajo posible es 13.)
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const html = read('index.html'), sw = require('./load').shell();
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), LEC = get(ctx, 'LEC');
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'lectura');
const EXPL = get(ctx, 'PU_LEC_EXPLORA');   // esos mundos siguen otro estándar (tests/lectura-explora.test.js)
const lessons = units.filter(u => !EXPL.includes(u.world)).flatMap(u => u.lessons);
const NUEVOS = ['ordena-parrafos', 'subraya-prueba', 'resumen-esencial', 'trampa-opcion', 'cadena-causas'];
const uses = g => lessons.filter(l => l.ex.some(e => e.game === g));
const exOf = g => lessons.flatMap(l => l.ex.filter(e => e.game === g).map(e => [l, e]));
const solved = (name, params) => ({ rounds: LEC.rounds(name, params).map(r => ({ place: r.key.map(k => k == null ? -1 : [].concat(k)[0]) })) });
const sorted = a => a.every((x, i) => i === 0 || a[i - 1] <= x);

test('cuántas lecciones usa cada juego: mapa ≤ 8, donde-buscar ≤ 6 y ninguno en más de 13', () => {
  const count = {};
  for (const l of lessons) for (const g of new Set(l.ex.map(e => e.game))) count[g] = (count[g] || 0) + 1;
  assert.equal(units.flatMap(u => u.lessons).length, 33);
  assert.ok(count['mapa-del-texto'] <= 8, `mapa-del-texto en ${count['mapa-del-texto']} lecciones`);
  assert.ok(count['donde-buscar'] <= 6, `donde-buscar en ${count['donde-buscar']} lecciones`);
  for (const [g, n] of Object.entries(count)) assert.ok(n <= 13, `${g} en ${n} lecciones`);
  for (const g of NUEVOS) assert.ok(count[g] >= lessons.length / 4, `${g} solo en ${count[g] || 0} lecciones`);
  // El tope de 10 que se pidió no cabe: lo deja escrito la aritmética.
  assert.ok(33 * 7 > Object.keys(count).length * 10);
});

test('cada lección conserva 7 juegos distintos y los que ocultan el texto van primero', () => {
  for (const l of lessons) {
    const g = l.ex.map(e => e.game);
    assert.equal(g.length, 7, l.id);
    assert.equal(new Set(g).size, 7, `${l.id}: ${g}`);
    const hide = g.filter(x => x === 'ordena-parrafos' || x === 'anticipa-texto');
    assert.ok(hide.length <= 1, `${l.id}: dos juegos que esconden el texto`);
    if (hide.length) assert.equal(g[0], hide[0], `${l.id}: ${hide[0]} debe ser el primer ejercicio (si no, el texto ya se leyó en orden)`);
  }
});

test('donde-buscar no se resuelve por el orden: ni los datos ni la bandeja siguen los párrafos', () => {
  const ds = exOf('donde-buscar');
  assert.ok(ds.length >= 1);
  for (const [l, e] of ds) {
    const firsts = e.params.cards.map(c => c[1][0]);
    assert.ok(!sorted(firsts), `${l.id}: las preguntas están en el orden de los párrafos (${firsts})`);
    const r = LEC.rounds('donde-buscar', e.params)[0], shown = LEC.mix(r.chips).map(c => r.key[c][0]);
    assert.ok(!sorted(shown) && !sorted([...shown].reverse()), `${l.id}: la bandeja muestra las preguntas en orden (${shown})`);
  }
});

test('los cinco juegos nuevos: registrados, con guía y estilos propios, sin buscar [data-…] con closest', () => {
  const at = f => html.indexOf(`src="${f}"`);
  for (const g of NUEVOS) {
    assert.ok(GAMES[g]?.grade && GAMES[g]?.create, g);
    assert.ok(at(`js/games/${g}.js`) > at('js/games/lectura-kit.js'), `${g} después del kit`);
    assert.ok(sw.includes(`'js/games/${g}.js'`), `${g} en SHELL`);
    assert.ok(GUIDES[g]?.length >= 1, `${g} sin guía`);
    const src = read(`js/games/${g}.js`);
    assert.match(src, /LEC\.drop\(/, g);
    assert.match(src, /LEC\.css\(/, `${g} sin estilos`);
    assert.doesNotMatch(src, /closest\('\[data-/, g);
  }
});

test('LEC.sentences parte por oraciones sin cortar comillas, incisos ni cifras', () => {
  const s = LEC.sentences('«Uno cree que se acostumbra. En realidad, no», dice. El precio subió 1.5 veces. ¿Por qué? —Porque sí.');
  assert.equal(s.join(' | '), '«Uno cree que se acostumbra. | En realidad, no», dice. | El precio subió 1.5 veces. | ¿Por qué? | —Porque sí.');
  assert.match(read('js/games/lectura-kit.js'), /hideMsg/);
  assert.doesNotMatch(read('js/games/lectura-kit.js'), /\(\?<[=!]/, 'sin lookbehind: Safari viejo no lo entiende');
});

test('ordena-parrafos: el primer párrafo fijo, la clave es el orden del texto y la bandeja no lo delata', () => {
  const g = GAMES['ordena-parrafos'];
  for (const [l, e] of exOf('ordena-parrafos')) {
    assert.ok(!e.params.docs, `${l.id}: no va en lectura de dos textos`);
    const r = LEC.rounds('ordena-parrafos', e.params)[0], n = e.params.doc.paras.length;
    assert.equal(r.zones.length, n - 1);
    assert.equal(g.grade(solved('ordena-parrafos', e.params), e.params).ok, true, l.id);
    const s = solved('ordena-parrafos', e.params);
    [s.rounds[0].place[0], s.rounds[0].place[1]] = [s.rounds[0].place[1], s.rounds[0].place[0]];
    assert.equal(g.grade(s, e.params).ok, false, `${l.id}: dos párrafos cambiados`);
    assert.notEqual(LEC.mix(r.chips).join(), r.chips.map((_, i) => i).join(), `${l.id}: la bandeja trae el orden del texto`);
    assert.match(g.grade(s, e.params).solution, /^Orden del texto: 1 «/);
  }
});

test('subraya-prueba: cada conclusión tiene una oración que la prueba y no se copia del texto', () => {
  const g = GAMES['subraya-prueba'];
  const p = { doc: { id: 'd', title: 't', paras: ['Ana llegó tarde. Nadie la esperó. Se fue sola a casa.'] }, rounds: [{ claim: 'Ana estaba sola.', p: 1, answer: 1 }] };
  assert.equal(g.grade({ rounds: [{ place: [1] }] }, p).ok, true);
  assert.equal(g.grade({ rounds: [{ place: [2] }] }, p).ok, false);
  assert.equal(g.grade({ rounds: [{ place: [-1] }] }, p).ok, false);
  assert.match(g.grade({ rounds: [{ place: [2] }] }, p).solution, /Nadie la esperó/);
  for (const [l, e] of exOf('subraya-prueba')) {
    assert.ok(e.params.rounds.length >= 2, l.id);
    for (const r of LEC.rounds('subraya-prueba', e.params)) {
      for (const n of [].concat(r.src.p)) assert.ok(n >= 1 && n <= e.params.doc.paras.length, `${l.id}: párrafo ${n}`);
      assert.ok(r.zones.length >= 3, `${l.id}: muy pocas oraciones para escoger`);
      assert.ok(r.src.answer >= 0 && r.src.answer < r.zones.length, `${l.id}: oración ${r.src.answer}`);
      assert.ok(!e.params.doc.paras.join(' ').includes(r.src.claim.replace(/\.$/, '')), `${l.id}: la conclusión está copiada del texto`);
    }
  }
});

test('resumen-esencial: solo caben las esenciales; un detalle en un renglón o una esencial afuera falla', () => {
  const g = GAMES['resumen-esencial'];
  const p = { doc: { id: 'd', title: 't', paras: ['x'] }, ideas: [['A', true], ['B', true], ['c', false], ['d', false]] };
  assert.equal(g.grade({ rounds: [{ place: [1, 0, -1, -1] }] }, p).ok, true, 'el orden de los renglones no importa');
  assert.equal(g.grade({ rounds: [{ place: [0, -1, 1, -1] }] }, p).ok, false, 'un detalle en el resumen');
  assert.equal(g.grade({ rounds: [{ place: [0, 1, -1, -1] }] }, p).solution, 'Resumen: «A» + «B»');
  for (const [l, e] of exOf('resumen-esencial')) {
    const main = e.params.ideas.filter(i => i[1]).length, det = e.params.ideas.length - main;
    assert.ok(main >= 3 && main <= 4 && det >= 3, `${l.id}: ${main} esenciales y ${det} detalles`);
    assert.equal(g.grade(solved('resumen-esencial', e.params), e.params).ok, true, l.id);
  }
});

test('trampa-opcion: cuatro opciones con trampas distintas, una sola respuesta, y la respuesta cambia de letra', () => {
  const g = GAMES['trampa-opcion'];
  const p = { doc: { id: 'd', title: 't', paras: ['x'] }, q: '¿?', options: [['a', 2], ['b', 0], ['c', 3], ['d', 1]] };
  const ok = { rounds: [{ place: [1, 3, 0, 2, -1] }] };
  assert.equal(g.grade(ok, p).ok, true);
  assert.equal(g.grade({ rounds: [{ place: [3, 1, 0, 2, -1] }] }, p).ok, false, 'dos sellos cambiados');
  assert.equal(g.grade({ rounds: [{ place: [1, 3, 0, 2, 2] }] }, p).ok, false, 'el sello que sobra no va en ninguna opción');
  assert.match(g.grade(ok, p).solution, /^A: Dice lo contrario · B: Es la respuesta/);
  const letters = new Set();
  for (const [l, e] of exOf('trampa-opcion')) {
    const t = e.params.options.map(o => o[1]);
    assert.equal(t.length, 4, l.id);
    assert.equal(new Set(t).size, 4, `${l.id}: trampas repetidas`);
    assert.ok(t.every(x => x >= 0 && x <= 4) && t.filter(x => x === 0).length === 1, `${l.id}: ${t}`);
    assert.ok(e.explain.includes('Sobra el sello'), `${l.id}: la explicación dice qué sello sobra`);
    letters.add(t.indexOf(0));
    assert.equal(g.grade(solved('trampa-opcion', e.params), e.params).ok, true, l.id);
  }
  assert.equal(letters.size, 4, 'la respuesta debe caer en A, B, C y D a lo largo del componente');
});

test('cadena-causas: el orden importa, lo que sobra se queda abajo y la bandeja no trae la cadena armada', () => {
  const g = GAMES['cadena-causas'];
  const p = { doc: { id: 'd', title: 't', paras: ['x'] }, chain: ['a', 'b', 'c'], extra: ['x', 'y'] };
  assert.equal(g.grade({ rounds: [{ place: [0, 1, 2, -1, -1] }] }, p).ok, true);
  assert.equal(g.grade({ rounds: [{ place: [1, 0, 2, -1, -1] }] }, p).ok, false, 'dos eslabones cambiados');
  assert.equal(g.grade({ rounds: [{ place: [0, 1, -1, 2, -1] }] }, p).ok, false, 'un hecho que no es de la cadena');
  assert.equal(g.grade({ rounds: [{ place: [0, 1, 2, -1, -1] }] }, p).solution, '«a» → «b» → «c»');
  for (const [l, e] of exOf('cadena-causas')) {
    assert.ok(e.params.chain.length >= 3 && e.params.chain.length <= 4 && e.params.extra.length >= 2, l.id);
    const r = LEC.rounds('cadena-causas', e.params)[0], shown = LEC.mix(r.chips).filter(c => c < e.params.chain.length);
    assert.ok(!sorted(shown), `${l.id}: la bandeja muestra la cadena en orden (${shown})`);
  }
});

test('juegos nuevos con pista, explicación y el texto de la lección (en dos textos, también los dos documentos)', () => {
  for (const g of NUEVOS) for (const [l, e] of exOf(g)) {
    assert.ok(e.hint?.length > 20 && e.explain?.length > 40, `${l.id} ${g}`);
    const main = l.ex.find(x => x.params.doc)?.params.doc;
    assert.equal(e.params.doc?.id, main.id, `${l.id} ${g}: otro texto`);
    if (l.ex.some(x => x.params.docs)) assert.equal(e.params.docs?.length, 2, `${l.id} ${g}: faltan los dos textos`);
  }
});
