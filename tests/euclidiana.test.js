// Curso de Geometría Euclidiana (spec 2026-11-26-curso-euclidiana): ocho mundos, uno por capítulo del libro de referencia.
// Cada lección de un mundo hecho (EUC_HECHOS) tiene explicación interactiva, siete u ocho ejercicios con escena, todos con
// un juego distinto, y la zona de examen; cada mundo, su lámina y su evaluación. Lo que falta sale como «En preparación».
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = require('./load').shell();
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|conceptos|gimnasio/.test(f));
const exp = [...html.matchAll(/src="(js\/explora[^"]*)"/g)].map(m => m[1]).filter(f => !/voces/.test(f));
const ctx = loadScripts(['js/art.js', ...all, ...exp]);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), EXPLORA = get(ctx, 'EXPLORA'), EXQ = get(ctx, 'EXQ'), WORLDS = get(ctx, 'WORLDS');
const COURSES = get(ctx, 'COURSES'), DONE = get(ctx, 'EUC_HECHOS'), TEMARIO = get(ctx, 'EUC_TEMARIO');
const C = COURSES.find(c => c.id === 'euc');
const ZONA = ['completa-solucion', 'caza-error', 'opcion-examen'];
const BORING = ['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'verdadero-falso', 'ordena-terminos', 'detective-pasos'];
const lessons = () => C.units.flatMap(u => u.lessons.map(l => [u, l]));
// Nada dice de dónde sale un problema ni nombra el libro.
const SOURCE = /londo[ñn]o|ude@|del libro|m[óo]dulo \d|cap[íi]tulo \d|examen de admisi/i;

test('el curso está registrado: después de Geometría Vectorial, con arte, paleta, borrador y archivos en la app', () => {
  assert.ok(C, 'no hay curso euc');
  assert.equal(COURSES.indexOf(C), COURSES.findIndex(c => c.id === 'geo') + 1);
  assert.equal(C.color, '#2dd4bf');
  assert.ok(C.tagline.length >= 30 && C.tagline.length <= 90 && !/UdeA|libro/i.test(C.tagline));
  assert.ok(/^<svg viewBox="0 0 64 64"/.test(get(ctx, 'COURSE_ART').euc || ''), 'sin figura');
  assert.ok(get(ctx, 'ART_PAL').euc, 'sin paleta del arte');
  const P = get(ctx, 'COURSE_PALETTES').euc;
  assert.ok(P?.dark?.brand && P?.light?.brand, 'sin paleta de juegos');
  assert.match(read('supabase/migrations/20261126000003_curso_euclidiana.sql'), /\('euc', 'Geometría Euclidiana', \d+, false\)/);
  assert.ok(!get(ctx, 'typeof CURSOS_LISTOS === "undefined" ? [] : CURSOS_LISTOS').includes('euc'));
  const at = f => html.indexOf(`src="${f}"`);
  const files = [...html.matchAll(/src="(js\/courses\/euclidiana[^"]*)"/g)].map(m => m[1]);
  assert.equal(files.length, TEMARIO.length + 2, files.join());
  for (const f of files) {
    assert.ok(fs.existsSync(path.join(ROOT, f)), `${f} no existe`);
    assert.ok(sw.includes(`'${f}'`), `${f} no viene con la app`);
    if (!/euclidiana(-base)?\.js$/.test(f)) assert.ok(at(f) > at('js/courses/euclidiana-base.js') && at(f) < at('js/data.js'), f);
  }
  assert.ok(at('js/courses/euclidiana-base.js') > at('js/courses/preicfes-base.js'));
  assert.ok(at('js/courses/euclidiana.js') > at('js/data.js') && at('js/courses/euclidiana.js') < at('js/courses/sin-escribir.js'));
  assert.match(read('js/inicio.js'), /'geo', 'euc'/);
});

test('temario: ocho mundos como los capítulos del libro, y lo hecho coincide con lo anunciado', () => {
  assert.equal(TEMARIO.length, 8);
  assert.equal(TEMARIO.map(t => t[3]).join(), '1,2,3,4,5,6,7,8');
  assert.equal(new Set(TEMARIO.map(t => t[0])).size, 8);
  for (const [w, title, ls] of TEMARIO) {
    assert.match(w, /^euc-[a-z]+$/);
    assert.ok(title && ls.length >= 2, w);
    assert.ok(WORLDS[w]?.art.includes('data-style="neon"'), `${w} sin lámina`);
    assert.equal(WORLDS[w].name, title);
  }
  assert.equal(C.units.map(u => u.world).join(), TEMARIO.map(t => t[0]).filter(w => DONE.includes(w)).join(), 'en el orden del temario');
  for (const u of C.units) {
    const t = TEMARIO.find(t => t[0] === u.world);
    assert.equal(t[1], u.title); assert.equal(t[2].join(), u.lessons.map(l => l.title).join(), u.world);
    assert.ok(u.exam?.items?.length >= 4 && u.exam.minutes >= 8, `${u.world} sin evaluación`);
    assert.equal(u.exam.id, `exam-${u.world}`);
  }
  assert.equal(C.soon.length + C.units.length, 8);
  assert.ok(C.units.length >= 1, 'ningún mundo hecho');
  const ids = lessons().map(([, l]) => l.id);
  assert.equal(new Set(ids).size, ids.length, 'ids repetidos');
  for (const [u, l] of lessons()) {
    assert.equal(l.id, `${u.world}-${u.lessons.indexOf(l) + 1}`);
    assert.ok(l.clip.scenes.length >= 4, `${l.id}: escenas de respaldo`);
  }
});

test('todo ejercicio usa un juego registrado, con guía, pista y explicación, y no dice de dónde sale', () => {
  for (const [, l] of lessons()) for (const e of l.ex) {
    assert.equal(e.type, 'play', l.id);
    assert.ok(GAMES[e.game], `${l.id}: no existe ${e.game}`);
    assert.ok(!BORING.includes(e.game), `${l.id}: ${e.game} es de los aburridos`);
    assert.ok(GUIDES[e.game] || GAMES[e.game].demo, `${e.game} sin guía`);
    assert.ok(e.hint?.length > 40 && e.explain?.length > 40, `${l.id}: ${e.game} con pista o explicación corta`);
    assert.ok(e.q.length > 8, `${l.id}: ${e.game} sin enunciado`);
    assert.ok(!SOURCE.test(JSON.stringify(e)), `${l.id}: ${e.game} nombra la fuente`);
    for (const s of [e.q, e.hint, e.explain]) assert.equal((s.match(/\$/g) || []).length % 2, 0, `${l.id} ${e.game}: $ sin cerrar en «${s}»`);
  }
});

test('cada lección tiene su explicación y 10 u 11 ejercicios: siete u ocho con escena, todos distintos, y la zona de examen', () => {
  for (const [, l] of lessons()) {
    assert.ok(EXPLORA[l.id], `${l.id} sin explicación`);
    const games = l.ex.map(e => e.game), base = l.ex.slice(0, -3);
    assert.equal(new Set(games).size, games.length, `${l.id}: juego repetido (${games})`);
    assert.equal(games.slice(-3).join(), ZONA.join(), l.id);
    assert.ok(games.length >= 10 && games.length <= 11, `${l.id}: ${games.length} ejercicios`);
    for (const e of base) {
      const g = GAMES[e.game], p = e.params, id = `${l.id} ${e.game}`;
      assert.equal(g.xp, true, `${id}: no es un juego con escena`);
      const s = g.solve(p);
      assert.equal(g.listo(g.ini(p), p), false, `${id} nace listo`);
      assert.equal(g.listo(s, p), true, id);
      assert.equal(g.grade(s, p).ok, true, id);
      assert.equal(g.grade(g.ini(p), p).ok, false, `${id}: nace resuelto`);
      assert.ok(!/undefined|NaN|\[object/.test(g.grade(s, p).solution), `${id}: solución rota`);
      if (p.metas && p.fichas) for (const m of p.metas) assert.ok(p.fichas.filter(f => f === m).length >= p.metas.filter(x => x === m).length, `${id}: falta la ficha ${m}`);
    }
  }
});

test('zona de examen: completa, con una sola respuesta, y las claves A–D repartidas', () => {
  const letters = [0, 0, 0, 0];
  const exs = C.units.flatMap(u => [...u.lessons.flatMap(l => l.ex.map(e => [l.id, e])), ...u.exam.items.map(it => [`examen ${it.lesson}`, it.ex])]);
  for (const [where, e] of exs) {
    const p = e.params;
    if (!ZONA.includes(e.game)) continue;
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
  assert.ok(n >= 2 * lessons().length, `${n} preguntas A–D`);
  for (const k of letters) assert.ok(k > 0 && k / n <= 0.4, `respuestas mal repartidas entre A–D: ${letters}`);
});

test('evaluaciones: tres preguntas por lección, una de ellas A–D, con nota de repaso y sin repetir los ejercicios', () => {
  const J = e => e.game + JSON.stringify({ ...e.params, autoDemo: undefined });
  for (const u of C.units) {
    const vistos = new Set(u.lessons.flatMap(l => l.ex.map(J)));
    for (const l of u.lessons) {
      const mine = u.exam.items.filter(it => it.lesson === l.id);
      assert.equal(mine.length, 3, `${u.world}: ${l.id} tiene ${mine.length} preguntas`);
      assert.equal(mine.filter(it => it.ex.game === 'opcion-examen').length, 1, `${u.world}: ${l.id} sin pregunta A–D`);
      assert.equal(new Set(mine.map(it => it.ex.game)).size, 3, `${u.world}: ${l.id} repite juego en la evaluación`);
    }
    for (const it of u.exam.items) {
      assert.ok(u.lessons.some(l => l.id === it.lesson), `${u.world}: ${it.lesson}`);
      assert.ok(it.review?.length > 15, `${u.world}: sin nota de repaso`);
      assert.ok(it.ex.exam && it.ex.kind === 'Geometría', u.world);
      const g = GAMES[it.ex.game]; assert.ok(g, `${u.world}: no existe ${it.ex.game}`);
      assert.ok(it.ex.hint?.length > 20 && it.ex.explain?.length > 20, `${u.world}: ${it.ex.game}`);
      assert.ok(!vistos.has(J(it.ex)), `${u.world}: la evaluación repite un ejercicio de ${it.lesson} (${it.ex.game})`);
      if (g.xp) { const p = it.ex.params; assert.equal(g.grade(g.solve(p), p).ok, true, `${u.world} ${it.ex.game}`); assert.equal(g.grade(g.ini(p), p).ok, false, `${u.world} ${it.ex.game}`); }
    }
  }
});

test('explicaciones: capítulos que abren mostrando, práctica en cada uno y un problema al final; nada nombra la fuente', () => {
  for (const [, l] of lessons()) {
    const E = EXPLORA[l.id];
    assert.ok(E.caps.length >= 4 && E.caps.length <= 5, `${l.id}: ${E.caps.length} capítulos`);
    assert.equal(E.caps.at(-1), 'Ahora sí, un problema', l.id);
    E.caps.forEach((c, i) => {
      const ps = E.pasos.filter(p => p.cap === i && p.tipo !== 'cierre');
      if (i < E.caps.length - 1) { assert.equal(ps[0].tipo, 'muestra', `${l.id} «${c}» no abre mostrando`); assert.ok(ps.some(p => p.tipo !== 'muestra'), `${l.id} «${c}» sin práctica`); }
      else assert.ok(ps.length >= 1 && ps.every(p => p.tipo !== 'muestra'), `${l.id}: el problema final`);
    });
    assert.ok(!SOURCE.test(JSON.stringify(E)), `${l.id}: la explicación nombra la fuente`);
  }
});

// ---------------------------------------------------------------------------------------------- calidad de las escenas
// Las mismas exigencias de tests/ejercicios-geometria.test.js, para todo juego con escena que use el curso (lecciones y evaluaciones).
const K = get(ctx, 'XPK');
const arr = x => (Array.isArray(x) ? x : [x]);
const malo = s => /NaN|undefined|Infinity|\[object|(width|height|r)="-/.test(s);
const usados = () => C.units.flatMap(u => [...u.lessons.flatMap(l => l.ex.map(e => [l.id, e])), ...u.exam.items.map(it => [`examen ${it.lesson}`, it.ex])])
  .map(([id, e]) => ({ id: `${id} ${e.game}`, e, G: GAMES[e.game], p: e.params })).filter(j => j.G?.xp);
// Todos los estados que se alcanzan con las manijas (hasta 4000: con más, una muestra pareja que incluye la solución).
function estados(G, p) {
  let out = [{ ...G.ini(p) }];
  for (const m of G.manijas(p)) arr(m.k).forEach((k, i) => {
    const mn = arr(m.min)[i] ?? arr(m.min)[0], mx = arr(m.max)[i] ?? arr(m.max)[0], ps = arr(m.paso ?? 1)[i] ?? arr(m.paso ?? 1)[0], vs = [];
    for (let v = mn; v <= mx + 1e-9; v += ps) vs.push(Math.round(v * 1000) / 1000);
    out = out.flatMap(s => vs.map(v => ({ ...s, [k]: v })));
    if (out.length > 4000) { const paso = Math.ceil(out.length / 4000); out = out.filter((_, n) => n % paso === 0); }
  });
  const vistos = new Set(out.map(s => JSON.stringify(s))), sol = G.solve(p);
  return vistos.has(JSON.stringify(sol)) ? out : [...out, sol];
}

test('figuras: pocas respuestas valen, cada error tiene su aviso, la escena se dibuja en todo el recorrido y no regala el resultado', () => {
  for (const { id, G, p } of usados().filter(j => j.G.figura)) {
    const ss = estados(G, p), ok = ss.filter(s => G.grade(s, p).ok);
    assert.ok(ss.length >= 5, `${id}: solo ${ss.length} posiciones`);
    assert.ok(ok.length >= 1 && ok.length / ss.length <= 0.25, `${id}: valen ${ok.length} de ${ss.length}`);
    for (const s of ss) {
      if (G.grade(s, p).ok) assert.ok(G.bien(s, p).length > 10 && !malo(G.bien(s, p)), `${id}: cierre`);
      else { const a = G.aviso(s, p); assert.ok(typeof a === 'string' && a.length > 8 && !malo(a), `${id} ${JSON.stringify(s)}: aviso «${a}»`); }
      for (const q of [0, 0.4, 1]) assert.ok(!malo(G.dib(s, K, p, q)), `${id} ${JSON.stringify(s)} f=${q}: dibujo roto`);
      const lee = G.lee(s, p); assert.ok(!malo(lee) && (lee.match(/\$/g) || []).length % 2 === 0, `${id}: ${lee}`);
    }
    assert.ok(G.alto(p) >= 120 && G.alto(p) <= 300, `${id}: alto ${G.alto(p)}`);
    assert.ok(!malo(G.texto(p)) && G.texto(p).length > 3, `${id}: texto de la solución`);
    assert.notEqual(G.dib(G.solve(p), K, p, 0), G.dib(G.solve(p), K, p, 1), `${id}: al comprobar la figura no cambia`);
  }
});

test('figuras: la manija está dentro del lienzo, y arrastrarla hasta su sitio da ese mismo valor', () => {
  for (const { id, G, p } of usados().filter(j => j.G.figura)) for (const m of G.manijas(p)) {
    if (!m.en) continue;
    for (const s of estados(G, p)) {
      const [x, y] = m.en(s, p);
      assert.ok(x >= 8 && x <= 332 && y >= 4 && y <= G.alto(p) - 4, `${id} ${JSON.stringify(s)}: manija en ${x}, ${y}`);
      arr(m.de(x, y, s, p)).forEach((v, i) => assert.ok(Math.abs(v - s[arr(m.k)[i]]) < 0.26 * Math.max(1, (arr(m.paso ?? 1)[i] ?? arr(m.paso ?? 1)[0])), `${id} ${JSON.stringify(s)} → ${v}`));
    }
  }
});

test('rótulos: las fichas alcanzan, sobran errores, los lugares no se pisan y solo hay una respuesta', () => {
  for (const { id, G, p } of usados().filter(j => j.G.rotula)) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    assert.equal(sl.length, m.length, id);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${id}: falta la ficha ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 1, `${id}: no sobra ninguna ficha`);
    sl.forEach((a, i) => {
      assert.ok(a.x - a.w / 2 >= 2 && a.x + a.w / 2 <= 338 && a.y - a.h / 2 >= 2 && a.y + a.h / 2 <= G.alto(p), `${id}: lugar ${i} fuera`);
      sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${id}: lugares que se pisan`));
    });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)), `${id}: fondo roto`);
    assert.ok(G.bien(p).length > 4 && !malo(G.bien(p)), id);
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false, id); const a = G.aviso(s, p); assert.ok(a.length > 10 && !malo(a), `${id}: aviso`); } });
  }
});

test('tiros: tres por juego, se perdona un fallo, la respuesta cabe en la perilla y cada fallo tiene su aviso', () => {
  for (const { id, G, p } of usados().filter(j => j.G.tiros)) {
    assert.equal(p.tiros.length, 3, id);
    for (const x of p.tiros) {
      const o = G.perilla(x, p), m = G.meta(x, p);
      assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${id}: ${m} no cabe en ${o.min}–${o.max}`);
      for (let v = o.min; v <= o.max; v++) { for (const q of [0, 0.5, 1]) assert.ok(!malo(G.dib(x, v, K, p, q)), `${id} ${v}`); if (v !== m) assert.ok(G.falla(x, v, p).length > 8, id); assert.ok(!malo(o.lee(v)), id); }
      assert.ok(!malo(G.dib(x, null, K, p, 0)), id);
      assert.equal((x.q.match(/\$/g) || []).length % 2, 0, id);
    }
    assert.equal(G.grade({ n: 3, fallos: 1 }, p).ok, true, id); assert.equal(G.grade({ n: 2, fallos: 2 }, p).ok, false, id);
  }
});

test('cada lección termina su parte de escenas con un juego en movimiento cuando el mundo lo tiene, y los juegos propios del curso no usan lienzo', () => {
  for (const f of fs.readdirSync(path.join(ROOT, 'js/games')).filter(f => /^euc-escena-\d\.js$/.test(f))) {
    const t = read(`js/games/${f}`);
    assert.ok(!/createCanvas|mountSketch|p\.fill|#[0-9a-fA-F]{6}\b/.test(t), `${f}: lienzo o colores propios`);
    assert.ok(html.includes(`src="js/games/${f}"`), `${f} sin registrar`);
  }
});

// Estado: los mundos que ya deben estar hechos. Al terminar uno, se añade aquí.
test('mundos terminados', () => {
  assert.equal(DONE.join(), C.units.map(u => u.world).join());
  for (const w of HECHOS) assert.ok(DONE.includes(w), `${w} sin terminar`);
});
const HECHOS = ['euc-demostrar', 'euc-elementos', 'euc-triangulo', 'euc-cuadrilateros', 'euc-circunferencia', 'euc-metricas', 'euc-areas', 'euc-construcciones'];
