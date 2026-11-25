// Curso Preicfes Saber 11 (spec 2026-11-20-curso-preicfes): cinco componentes que se eligen al entrar, el primer mundo de cada
// uno jugable con su evaluación. Desde la spec 2026-11-25-preicfes-estructura cada lección tiene explicación interactiva, ocho
// ejercicios dibujados (más la zona de examen en Matemáticas y Ciencias) y cada mundo, dos retos del gimnasio. Nada dice de qué
// examen o año sale un problema.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = require('./load').shell();
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|conceptos|gimnasio/.test(f));
const exp = [...html.matchAll(/src="(js\/explora[^"]*)"/g)].map(m => m[1]).filter(f => !/voces/.test(f));
const ctx = loadScripts(['js/art.js', ...all, ...exp]);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), HOJA = get(ctx, 'HOJA'), EXPLORA = get(ctx, 'EXPLORA'), EXQ = get(ctx, 'EXQ'), WORLDS = get(ctx, 'WORLDS');
const COURSES = get(ctx, 'COURSES'), DONE = get(ctx, 'PI_HECHOS');
const C = COURSES.find(c => c.id === 'preicfes');
const BLOCKS = ['matematicas', 'lectura', 'sociales', 'ciencias', 'ingles'];
const DIEZ = ['matematicas', 'ciencias'];
const ZONA = ['completa-solucion', 'caza-error', 'opcion-examen'];
const BORING = ['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'verdadero-falso', 'ordena-terminos', 'detective-pasos'];
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

test('cada lección tiene su explicación y sus ejercicios dibujados: 8 distintos, y zona de examen en Matemáticas y Ciencias', () => {
  for (const [u, l] of lessons()) {
    assert.ok(EXPLORA[l.id], `${l.id} sin explicación`);
    const games = l.ex.map(e => e.game), diez = DIEZ.includes(u.block), base = diez ? l.ex.slice(0, -3) : l.ex;
    assert.equal(new Set(games).size, games.length, `${l.id}: juego repetido (${games})`);
    if (diez) { assert.equal(games.slice(-3).join(), ZONA.join(), l.id); assert.ok(games.length >= 9 && games.length <= 11, l.id); } else assert.equal(games.length, 8, l.id);
    for (const e of base) {
      const g = GAMES[e.game], p = e.params, id = `${l.id} ${e.game}`, s = g.solve(p);
      assert.equal(g.xp, true, id);
      assert.ok(e.hint.length > 40 && e.explain.length > 40, `${id}: pista o explicación corta`);
      assert.equal(g.listo(g.ini(p), p), false, `${id} nace listo`);
      assert.equal(g.listo(s, p), true, id);
      assert.equal(g.grade(s, p).ok, true, id);
      assert.equal(g.grade(g.ini(p), p).ok, false, id);
      assert.ok(!/undefined|NaN|\[object/.test(g.grade(s, p).solution), id);
    }
    if (diez) continue;
    const main = l.ex[0].params.doc; assert.ok(main, `${l.id}: empieza sin texto`);
    const n = words(main), [lo, hi] = u.block === 'ingles' ? [180, 420] : [330, 560];
    assert.ok(n >= lo && n <= hi, `${l.id}: ${n} palabras`);
    assert.ok(main.paras.length >= 4 && main.paras.length <= 7, l.id);
    assert.ok(l.ex.filter(e => e.params.doc?.id === main.id).length >= 7, `${l.id}: el texto no acompaña la lección`);
  }
});

// Lo mismo se le pide a una lección y a un paso del gimnasio.
function revisa(id, e) {
  const g = GAMES[e.game], p = e.params, P = n => p.doc.paras[n - 1] || '';
  for (const [n, t] of p.luz || []) assert.ok(P(n).includes(t), `${id}: «${t}» no está en ¶${n}`);
  for (const [n, a, w, b] of p.frases || []) assert.ok(P(n).includes(a + w + b), `${id}: «${a}${w}${b}»`);
  const k = p.fichas || p.tarjetas || p.lineas;
  if (['zonas', 'hilos', 'pinta'].includes(g.tipo)) {
    assert.equal(p.va.length, k.length, id); assert.equal(p.mira.length, k.length, id); assert.ok(p.mira.every(m => m.length > 12), id);
    assert.equal(new Set(k).size, k.length, id);
  }
  if (g.tipo === 'zonas') {
    const en = p.va.filter(v => v != null).map(HOJA.base);
    if (!g.varias) assert.equal(new Set(en).size, en.length, `${id}: dos fichas en un hueco`);
    for (const z of en) assert.ok(g.rot(p, z), `${id}: zona ${z}`);
  }
  if (g.tipo === 'hilos') for (const d of p.va.flat()) assert.ok(d >= 0 && d < g.destinos(p), `${id}: destino ${d}`);
  if (g.tipo === 'pinta') assert.equal(new Set(p.va).size, p.plumas.length, `${id}: pluma sin usar`);
  if (g.tipo === 'toca') {
    const c = [...g.claves(p)], va = p.va.map(String);
    assert.ok(va.every(x => c.includes(x)), `${id}: ${va}`); assert.equal(p.n, va.length, id);
    for (const x of c.filter(x => !va.includes(x))) assert.ok(p.mira[x]?.length > 12, `${id}: sin aviso en ${x}`);
  }
  if (g.tipo === 'ordena') { assert.equal([...p.ini].sort().join(), p.ini.map((_, i) => i).join(), id); assert.equal(p.mira.length, p.ini.length, id); assert.ok(p.ini.filter((x, i) => x !== i).length >= 2, id); }
  if (g.tipo === 'regla') p.filas.forEach((r, i) => { assert.ok(r.topes.length >= 3, id); assert.notEqual(g.inicio(r), r.va, `${id}: fila ${i} nace resuelta`); });
  if (p.metas && p.fichas) for (const m of p.metas) assert.ok(p.fichas.filter(f => f === m).length >= p.metas.filter(x => x === m).length, `${id}: falta la ficha ${m}`);
}

test('las piezas de los ejercicios están completas y lo que se enciende está en su párrafo', () => {
  for (const [, l] of lessons()) for (const e of l.ex) revisa(`${l.id} ${e.game}`, e);
});

test('temario: cinco componentes, sin repetir mundos, y lo hecho coincide con lo anunciado', () => {
  const T = get(ctx, 'PI_TEMARIO'), todos = Object.values(T).flat();
  assert.equal(Object.keys(T).join(), BLOCKS.join());
  assert.equal(new Set(todos.map(t => t[0])).size, todos.length);
  for (const [w, title, ls, area] of todos) { assert.match(w, /^icf-(ma|lc|sc|cn|en)-[a-z]+$/); assert.ok(title && area && ls.length >= 2, w); }
  for (const u of C.units) {
    const t = T[u.block].find(t => t[0] === u.world);
    assert.ok(t, u.world); assert.equal(t[1], u.title); assert.equal(t[2].join(), u.lessons.map(l => l.title).join(), u.world);
  }
  assert.equal(C.soon.length + C.units.length, todos.length);
  assert.match(read('js/app.js'), /soonHTML\(c, block\)/);
});

test('gimnasio: cada mundo hecho tiene un reto de Fuerza y uno de Élite, con escenas y sin repetir ejercicios', () => {
  const R = get(ctx, 'gymRetos')(C).flatMap(g => g.retos), J = p => JSON.stringify(p), L = new Set(lessons().flatMap(([, l]) => l.ex.map(e => e.game + J(e.params))));
  for (const u of C.units) {
    const ids = u.lessons.map(l => l.id), lv = R.filter(r => r.after.some(a => ids.includes(a))).map(r => r.level);
    assert.ok(lv.includes(2) && lv.includes(3), `${u.world}: ${lv}`);
  }
  for (const r of R) r.steps.forEach((s, i) => {
    const id = `${r.id} paso ${i + 1}`, g = GAMES[s.ex.game], p = s.ex.params;
    assert.equal(g?.xp, true, id); assert.equal(g.grade(g.solve(p), p).ok, true, id); assert.equal(g.grade(g.ini(p), p).ok, false, id);
    assert.ok(!L.has(s.ex.game + J(p)), `${id} repite un ejercicio`);
    revisa(id, s.ex);
  });
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


test('los juegos que muestran siempre su texto lo traen, también en el gimnasio', () => {
  const CON_TEXTO = ['ajusta-alcance', 'comprueba-apuesta', 'subraya-tesis', 'talla-idea', 'tacha-resumen', 'bisagras', 'dice-deduce', 'cambia-palabra', 'pilares'];
  const ex = [...get(ctx, 'GYM_RETOS').filter(r => /^gym-i-/.test(r.id)).flatMap(r => r.steps.map(s => [r.id, s.ex])), ...C.units.flatMap(u => u.lessons.flatMap(l => l.ex.map(e => [l.id, e])))];
  for (const [id, e] of ex) if (CON_TEXTO.includes(e.game)) assert.ok((e.params.docs || [e.params.doc])[0]?.paras, `${id}: ${e.game} sin texto`);
});

test('juegos del plano y las barras: una sola respuesta (o todas las de la recta) y dibujo sin números rotos', () => {
  const K = get(ctx, 'XPK'), malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);
  const U = C.units.find(u => u.world === 'icf-ma-lineal');
  for (const l of U.lessons) for (const e of l.ex) {
    const g = GAMES[e.game], p = e.params;
    if (!g.figura || !['tarifa-recta', 'llega-presupuesto', 'vacia-tanque', 'cruce-planes', 'zona-conviene', 'pendiente-escalon'].includes(e.game)) continue;
    const s = g.solve(p); assert.equal(g.grade(s, p).ok, true, e.game); assert.equal(g.grade(g.ini(p), p).ok, false, e.game);
    if ('x' in s && !('y' in s) && !('d' in s)) assert.equal(Array.from({ length: p.max + 1 }, (_, x) => g.grade({ x }, p).ok).filter(Boolean).length, 1, e.game);
    for (const f of [0, 0.5, 1]) for (const v of [g.ini(p), s]) assert.ok(!malo(g.dib(v, K, p, f)), `${e.game} ${f}`);
  }
});
