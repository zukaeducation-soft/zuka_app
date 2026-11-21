// Curso Preicfes Saber 11 (spec 2026-11-20-curso-preicfes): cinco componentes que se eligen al entrar, el primer mundo de cada
// uno jugable con su evaluación, y dos estándares de lección: el «de diez» en Matemáticas y Ciencias (9 a 11 juegos distintos de
// una ronda, uno en movimiento y la zona de examen) y el de lectura en Lectura Crítica, Sociales e Inglés (un texto original, 7
// juegos LEC distintos y un juego en movimiento al final). Nada dice de qué examen o año sale un problema.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = read('sw.js');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(['js/art.js', ...all]);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), LEC = get(ctx, 'LEC'), EXQ = get(ctx, 'EXQ'), WORLDS = get(ctx, 'WORLDS');
const COURSES = get(ctx, 'COURSES'), DONE = get(ctx, 'PI_HECHOS');
const C = COURSES.find(c => c.id === 'preicfes');
const BLOCKS = ['matematicas', 'lectura', 'sociales', 'ciencias', 'ingles'];
const DIEZ = ['matematicas', 'ciencias'];
const ZONA = ['completa-solucion', 'caza-error', 'opcion-examen'];
const LEC_GAMES = ['anticipa-texto', 'mapa-del-texto', 'resume-parrafo', 'donde-buscar', 'lupa-evidencia', 'intruso-excepto',
  'palabra-a-la-medida', 'hilo-referente', 'conector-bisagra', 'signos-que-hablan', 'quien-lo-dice', 'balanza-argumento',
  'termometro-tono', 'caso-nuevo', 'puente-dos-textos'];
const BORING = ['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'verdadero-falso', 'ordena-terminos', 'detective-pasos'];
const MOVING = /MOVING = \[([\s\S]*?)\];/.exec(read('tests/preuda-razonamiento.test.js'))[1].match(/'[^']+'/g).map(s => s.slice(1, -1));
const words = d => d.paras.join(' ').split(/\s+/).filter(Boolean).length;
const docsOf = p => p.docs || (p.doc ? [p.doc] : []);
const lessons = () => C.units.flatMap(u => u.lessons.map(l => [u, l]));
const SOURCE = /icfes|saber 11|saber11|cuadernillo|simulacro|examen de (estado|admisi)|20(1\d|2\d)-[12]|\b20(19|21|22|24|25)\b/i;

test('el curso está registrado: después del Preuniversitario, con arte, paleta, borrador y archivos en la app', () => {
  assert.ok(C, 'no hay curso preicfes');
  assert.equal(COURSES.indexOf(C), COURSES.findIndex(c => c.id === 'preuda') + 1);
  assert.equal(C.color, '#e879f9');
  assert.ok(/^<svg viewBox="0 0 64 64"/.test(get(ctx, 'COURSE_ART').preicfes || ''), 'sin figura');
  assert.ok(get(ctx, 'ART_PAL').preicfes, 'sin paleta del arte');
  const P = get(ctx, 'COURSE_PALETTES').preicfes;
  assert.ok(P?.dark?.brand && P?.light?.brand, 'sin paleta de juegos');
  assert.ok(get(ctx, 'FLAT_COURSES').has('preicfes'), 'fondo plano como el Preuniversitario');
  assert.match(read('supabase/migrations/20261120000001_curso_preicfes.sql'), /\('preicfes', 'Preicfes Saber 11', \d+, false\)/);
  assert.ok(!get(ctx, 'typeof CURSOS_LISTOS === "undefined" ? [] : CURSOS_LISTOS').includes('preicfes'));
  const at = f => html.indexOf(`src="${f}"`);
  const files = [...html.matchAll(/src="(js\/courses\/preicfes[^"]*)"/g)].map(m => m[1]);
  assert.ok(files.length >= 7, files.join());
  for (const f of files) {
    assert.ok(sw.includes(`'${f}'`), `${f} sin SHELL`);
    if (!/preicfes(-base)?.js$/.test(f)) assert.ok(at(f) > at('js/courses/preicfes-base.js') && at(f) < at('js/data.js'), f);
  }
  assert.ok(at('js/courses/preicfes.js') > at('js/data.js') && at('js/courses/preicfes.js') < at('js/courses/sin-escribir.js'));
  assert.ok(at('js/courses/preicfes-base.js') > at('js/games/lectura-kit.js'));
  assert.match(read('tools/sync-lecciones.js'), /preicfes\.js/);
});

test('cinco componentes, el primer mundo de cada uno terminado, en orden, con lámina y evaluación', () => {
  assert.equal(C.blocks.map(b => b.id).join(), BLOCKS.join());
  for (const b of C.blocks) assert.ok(b.name && b.desc.length > 10, b.id);
  // Los mundos de cada componente van juntos y en el orden de los componentes.
  const order = C.units.map(u => BLOCKS.indexOf(u.block));
  assert.ok(order.every((b, i) => b >= 0 && (i === 0 || b >= order[i - 1])), order.join());
  for (const b of BLOCKS) {
    const u = C.units.find(u => u.block === b);
    assert.ok(u, `${b} sin mundos`);
    assert.ok(DONE.includes(u.world), `${u.world} sin terminar`);
  }
  for (const u of C.units) {
    assert.match(u.world, /^icf-(ma|lc|sc|cn|en)-[a-z]+$/);
    assert.ok(WORLDS[u.world]?.art.includes('data-style="neon"'), `${u.world} sin lámina`);
    assert.equal(WORLDS[u.world].name, u.title);
    assert.ok(u.lessons.length >= 2, u.world);
    assert.ok(u.exam?.items?.length >= 4 && u.exam.minutes >= 8, `${u.world} sin evaluación`);
    assert.equal(u.exam.id, `exam-${u.world}`);
  }
  const ids = lessons().map(([, l]) => l.id);
  assert.equal(new Set(ids).size, ids.length, 'ids repetidos');
  for (const [u, l] of lessons()) {
    assert.ok(l.id.startsWith(u.world.replace('icf-', 'icf-') + '-'), l.id);
    assert.ok(l.clip.scenes.length >= 4, `${l.id}: escenas de respaldo`);
  }
});

test('todo ejercicio usa un juego registrado, con guía, pista y explicación', () => {
  for (const [, l] of lessons()) for (const e of l.ex) {
    assert.equal(e.type, 'play', l.id);
    assert.ok(GAMES[e.game], `${l.id}: no existe ${e.game}`);
    assert.ok(!BORING.includes(e.game), `${l.id}: ${e.game} es de los aburridos`);
    assert.ok(GUIDES[e.game] || GAMES[e.game].demo, `${e.game} sin guía`);
    assert.ok(e.hint?.length > 20 && e.explain?.length > 20, `${l.id}: ${e.game} sin pista o explicación`);
    assert.ok(e.q.length > 8, `${l.id}: ${e.game} sin enunciado`);
  }
});

test('Matemáticas y Ciencias: 9 a 11 juegos distintos de una ronda, movimiento y zona de examen al final', () => {
  for (const [u, l] of lessons().filter(([u]) => DIEZ.includes(u.block))) {
    const games = l.ex.map(e => e.game);
    assert.ok(l.ex.length >= 9 && l.ex.length <= 11, `${l.id}: ${l.ex.length} ejercicios`);
    assert.equal(new Set(games).size, games.length, `${l.id}: juego repetido (${games})`);
    assert.equal(games.slice(-3).join(), ZONA.join(), `${l.id}: termina en ${games.slice(-3)}`);
    assert.ok(MOVING.includes(games.at(-4)), `${l.id}: ${games.at(-4)} no es de movimiento`);
    assert.ok(!games.slice(0, -3).some(g => ZONA.includes(g) || g === 'pregunta-examen'), l.id);
    for (const e of l.ex) {
      const r = e.params.rounds;
      if (Array.isArray(r)) {
        assert.equal(r.length, 1, `${l.id}: ${e.game} tiene ${r.length} rondas`);
        if (r[0].items?.[0]?.options || r[0].items?.[0]?.expr || r[0].items?.[0]?.sign) assert.ok(r[0].items.length <= 3, `${l.id}: ${e.game}`);
      }
      if (Array.isArray(e.params.problems)) assert.equal(e.params.problems.length, 1, `${l.id}: ${e.game}`);
    }
    if (u.block === 'ciencias') assert.ok(l.ex.filter(e => LEC_GAMES.includes(e.game)).length >= 3, `${l.id}: el experimento se lee`);
  }
});

test('Lectura, Sociales e Inglés: un texto original, 7 juegos LEC distintos y un juego en movimiento al final', () => {
  const docIds = new Set();
  for (const [u, l] of lessons().filter(([u]) => !DIEZ.includes(u.block))) {
    const games = l.ex.map(e => e.game);
    assert.equal(l.ex.length, 8, `${l.id}: ${l.ex.length}`);
    assert.equal(new Set(games).size, 8, `${l.id}: repetido (${games})`);
    assert.ok(games.slice(0, 7).every(g => LEC_GAMES.includes(g)), `${l.id}: ${games}`);
    assert.ok(MOVING.includes(games[7]), `${l.id}: termina en ${games[7]}`);
    const main = l.ex[0].params.doc;
    assert.ok(main, `${l.id}: sin texto`);
    assert.ok(l.ex.slice(0, 7).filter(e => e.params.doc?.id === main.id).length >= 6, `${l.id}: el texto no acompaña la lección`);
    assert.ok(!docIds.has(main.id), `${main.id} repetido`);
    docIds.add(main.id);
    const n = words(main), [lo, hi] = u.block === 'ingles' ? [180, 420] : [330, 560];
    assert.ok(n >= lo && n <= hi, `${l.id}: ${n} palabras`);
    assert.ok(main.paras.length >= 4 && main.paras.length <= 7, `${l.id}: ${main.paras.length} párrafos`);
    const r = l.ex[7].params.rounds;
    assert.equal(r.length, 1, l.id);
    assert.equal(r[0].items.length, 3, `${l.id}: tres preguntas en movimiento`);
    for (const it of r[0].items) {
      assert.equal(it.options.length, 3, l.id);
      assert.ok(it.ask.length <= 64, `${l.id}: pregunta larga para el lienzo «${it.ask}»`);
      assert.ok(it.options.every(o => o.length <= 22), `${l.id}: opción larga en «${it.ask}»`);
    }
  }
});

test('las citas y referencias de los juegos LEC están en su párrafo', () => {
  for (const [, l] of lessons()) for (const e of l.ex) {
    const p = e.params, d = p.doc;
    if (!LEC_GAMES.includes(e.game) || !d) continue;
    const P = n => d.paras[n - 1];
    const inRange = n => assert.ok(Number.isInteger(n) && n >= 1 && n <= d.paras.length, `${l.id} ${e.game}: párrafo ${n}`);
    if (e.game === 'palabra-a-la-medida') for (const r of p.rounds) {
      inRange(r.p);
      assert.ok(P(r.p).includes(`${r.before}${r.word}${r.after}`), `${l.id}: «${r.before}${r.word}${r.after}» no está en ¶${r.p}`);
      assert.ok(!r.options.includes(r.word));
      assert.ok(!e.hint.toLowerCase().includes(`«${r.options[r.answer].toLowerCase()}»`), `${l.id}: la pista dice la respuesta`);
    }
    if (e.game === 'hilo-referente') for (const r of p.rounds) {
      inRange(r.p);
      assert.ok(P(r.p).includes(r.text.split('|').join('')), `${l.id}: hilo fuera de ¶${r.p}`);
      assert.notEqual(r.from, r.answer);
    }
    if (e.game === 'signos-que-hablan') for (const r of p.rounds) if (r.p) assert.ok(P(r.p).includes(r.text.split('|').join('')), `${l.id}: signo fuera de ¶${r.p}`);
    if (e.game === 'mapa-del-texto') assert.equal(p.key.length, d.paras.length, `${l.id}: una etiqueta por párrafo`);
    if (e.game === 'resume-parrafo') p.paras.forEach(inRange);
    if (['donde-buscar', 'intruso-excepto'].includes(e.game)) for (const [, ps] of p.cards) for (const n of ps || []) inRange(n);
  }
});

// Estado que pone cada ficha en su primera zona válida (o la deja en la bandeja si sobra).
const solved = (name, params) => ({ rounds: LEC.rounds(name, params).map(r => ({ place: r.key.map(k => k == null ? -1 : [].concat(k)[0]) })) });
const empty = (name, params) => ({ rounds: LEC.rounds(name, params).map(r => ({ place: r.chips.map(() => -1) })) });

test('los juegos de fichas aciertan con su clave, fallan vacíos y no delatan la respuesta por la posición', () => {
  const firstPos = [];
  for (const [, l] of lessons()) for (const e of l.ex) {
    if (!LEC_GAMES.includes(e.game) || e.game === 'hilo-referente' || e.game === 'termometro-tono') continue;
    const g = GAMES[e.game];
    assert.equal(g.grade(solved(e.game, e.params), e.params).ok, true, `${l.id} ${e.game}`);
    assert.equal(g.grade(empty(e.game, e.params), e.params).ok, false, `${l.id} ${e.game} vacío`);
    for (const rr of LEC.rounds(e.game, e.params)) {
      assert.ok(rr.chips.length >= 2, `${l.id} ${e.game}`);
      for (const k of rr.key) for (const z of [].concat(k ?? [])) assert.ok(z >= 0 && z < rr.zones.length, `${l.id} ${e.game}: zona ${z}`);
      if (rr.zones.length === 1) firstPos.push(LEC.mix(rr.chips).indexOf(rr.key.findIndex(k => k != null)));
    }
  }
  assert.ok(firstPos.filter(p => p === 0).length <= firstPos.length / 2, `la respuesta sale primera demasiadas veces (${firstPos})`);
});

test('zona de examen: completa, con una sola respuesta, y las claves A–D repartidas', () => {
  const letters = [0, 0, 0, 0];
  const exs = C.units.flatMap(u => [...u.lessons.flatMap(l => l.ex.map(e => [l.id, e])), ...u.exam.items.map(it => [`examen ${it.lesson}`, it.ex])]);
  for (const [where, e] of exs) {
    const p = e.params;
    if (![...ZONA, 'pregunta-examen'].includes(e.game)) continue;
    assert.ok(p.q.length >= 25, `${where}: enunciado corto en ${e.game}`);
    assert.equal((p.q.match(/\$/g) || []).length % 2, 0, `${where}: $ sin cerrar`);
    if (e.game === 'completa-solucion') {
      const bl = EXQ.blanksOf(p);
      assert.ok(bl.length >= 3 && bl.length <= 6, `${where}: ${bl.length} huecos`);
      assert.ok(p.extra.length >= 2, `${where}: faltan fichas que sobren`);
      for (const x of p.extra) assert.ok(!bl.includes(x), `${where}: «${x}» sobra y es respuesta`);
      for (const ln of p.lines) for (const part of ln.split(/\[\[.+?\]\]/)) assert.equal((part.match(/\$/g) || []).length % 2, 0, `${where}: hueco dentro de una fórmula en «${ln}»`);
      assert.equal(GAMES[e.game].grade(GAMES[e.game].solve(p), p).ok, true, where);
    } else if (e.game === 'caza-error') {
      assert.ok(p.steps.length >= 3 && p.steps.length <= 5, `${where}: ${p.steps.length} pasos`);
      assert.ok(p.wrong >= 0 && p.wrong < p.steps.length && p.fixes.length === 3 && p.fix === 0, where);
      assert.equal(new Set([...p.fixes, p.steps[p.wrong]]).size, 4, `${where}: correcciones repetidas`);
    } else {
      assert.equal(p.options.length, 4, where);
      assert.equal(new Set(p.options.map(String)).size, 4, `${where}: opciones repetidas`);
      assert.ok(p.answer >= 0 && p.answer < 4, where);
      assert.equal(GAMES[e.game].grade({ pick: p.answer }, p).ok, true, where);
      letters[p.answer]++;
    }
  }
  const n = letters.reduce((a, b) => a + b, 0);
  assert.ok(n >= 25, `${n} preguntas A–D`);
  for (const k of letters) assert.ok(k > 0 && k / n <= 0.35, `respuestas mal repartidas entre A–D: ${letters}`);
});

test('evaluaciones: un juego de cada clase por lección en los mundos de diez; preguntas A–D sobre otro texto en los de lectura', () => {
  for (const u of C.units) {
    const diez = DIEZ.includes(u.block);
    const lessonDocs = new Set(u.lessons.flatMap(l => l.ex.flatMap(e => docsOf(e.params).map(d => d.id))));
    for (const l of u.lessons) {
      const mine = u.exam.items.filter(it => it.lesson === l.id);
      assert.ok(mine.length >= (diez ? 3 : 2), `${u.world}: ${l.id} tiene ${mine.length} preguntas`);
      if (diez) assert.equal(mine.filter(it => it.ex.game === 'opcion-examen').length, 1, `${u.world}: ${l.id} sin pregunta A–D`);
    }
    for (const it of u.exam.items) {
      assert.ok(it.review?.length > 15, `${u.world}: sin nota de repaso`);
      assert.ok(it.ex.exam, u.world);
      assert.ok(u.lessons.some(l => l.id === it.lesson), `${u.world}: ${it.lesson}`);
      assert.ok(it.ex.hint?.length > 20 && it.ex.explain?.length > 20, `${u.world}: ${it.ex.game}`);
      assert.ok(!['completa-solucion', 'caza-error', ...BORING].includes(it.ex.game), `${u.world}: ${it.ex.game}`);
      const r = it.ex.params.rounds;
      if (Array.isArray(r)) assert.equal(r.length, 1, `${u.world}: ${it.ex.game}`);
      if (!diez) {
        assert.equal(it.ex.game, 'pregunta-examen', u.world);
        for (const d of docsOf(it.ex.params)) assert.ok(!lessonDocs.has(d.id), `${u.world}: la evaluación repite ${d.id}`);
      }
    }
    if (diez) {
      const g = u.exam.items.map(it => it.ex.game).filter(x => x !== 'opcion-examen');
      assert.equal(new Set(g).size, g.length, `${u.world}: juego repetido en la evaluación`);
    } else {
      const d = u.exam.items[0].ex.params.doc;
      assert.ok(words(d) >= (u.block === 'ingles' ? 150 : 300), `${u.world}: texto de evaluación corto`);
    }
  }
});

test('ningún texto dice de qué examen o año sale', () => {
  const txt = [];
  for (const u of C.units) {
    for (const l of u.lessons) {
      txt.push(l.title, ...l.clip.scenes.map(s => `${s.title || ''} ${s.text}`));
      for (const e of l.ex) txt.push(e.q, e.explain, e.hint, JSON.stringify(e.params));
    }
    for (const it of u.exam.items) txt.push(it.review, it.ex.q, it.ex.explain, it.ex.hint, JSON.stringify(it.ex.params));
  }
  for (const t of txt) assert.doesNotMatch(String(t), SOURCE, String(t).slice(0, 140));
});

test('los juegos de rejilla tienen una posición ganadora (la muestra que representa)', () => {
  const exs = C.units.flatMap(u => [...u.lessons.flatMap(l => l.ex), ...u.exam.items.map(it => it.ex)]).filter(e => e.game === 'muestra-sesgo');
  assert.ok(exs.length >= 1);
  for (const e of exs) for (const r of e.params.rounds) {
    let found = false;
    for (let y = 0; y + r.h <= r.grid.length; y++) for (let x = 0; x + r.w <= r.grid[0].length; x++) if (GAMES['muestra-sesgo'].grade({ rounds: [{ x, y }] }, { rounds: [r] }).ok) found = true;
    assert.ok(found, 'ninguna muestra se parece al pueblo');
  }
});
