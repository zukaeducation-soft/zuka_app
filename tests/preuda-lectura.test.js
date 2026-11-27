// Preuniversitario · Comprensión lectora con textos de verdad (spec 2026-11-19-preuda-lectura-textos): en los mundos terminados
// (PU_LEC_HECHOS) cada lección trabaja un solo texto original de 330 a 560 palabras en 7 juegos distintos de arrastrar, con
// pista y explicación; las referencias a párrafos existen y las citas están en el texto; la evaluación del mundo va en formato
// real (pregunta-examen), con dos o más preguntas por lección. Los 21 juegos del kit LEC califican bien.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = require('./load').htmlRepo(), sw = require('./load').shell(true), css = read('css/styles.css');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), GUIDES = get(ctx, 'GUIDES'), EXPL = get(ctx, 'PU_LEC_EXPLORA'), TODOS = get(ctx, 'PU_LEC_HECHOS'), DONE = TODOS.filter(w => !EXPL.includes(w)), LEC = get(ctx, 'LEC');
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'lectura');
const NEW = ['anticipa-texto', 'mapa-del-texto', 'resume-parrafo', 'donde-buscar', 'lupa-evidencia', 'intruso-excepto',
  'palabra-a-la-medida', 'hilo-referente', 'conector-bisagra', 'signos-que-hablan', 'quien-lo-dice', 'balanza-argumento',
  'termometro-tono', 'caso-nuevo', 'puente-dos-textos', 'pregunta-examen',
  // Juegos de la variedad (tests/preuda-lectura-variedad.test.js).
  'ordena-parrafos', 'subraya-prueba', 'resumen-esencial', 'trampa-opcion', 'cadena-causas'];
const LESSON_GAMES = NEW.filter(g => g !== 'pregunta-examen');
const words = d => d.paras.join(' ').split(/\s+/).filter(Boolean).length;
const docsOf = p => p.docs || (p.doc ? [p.doc] : []);

test('kit y juegos registrados en orden: kit después de kit.js; mundos de lectura antes de su archivo de juegos', () => {
  const at = f => html.indexOf(`src="${f}"`);
  assert.ok(at('js/games/kit.js') >= 0 && at('js/games/kit.js') < at('js/games/lectura-kit.js'));
  for (const g of NEW) {
    assert.ok(at(`js/games/${g}.js`) > at('js/games/lectura-kit.js'), g);
    assert.ok(sw.includes(`'js/games/${g}.js'`), `${g} en SHELL`);
  }
  assert.ok(sw.includes("'js/games/lectura-kit.js'"));
  assert.ok(at('js/courses/preuda-lectura.js') < at('js/courses/preuda-lectura-juegos.js'));
  assert.ok(at('js/courses/preuda-lectura-juegos.js') < at('js/courses/preuda.js'));
  for (const f of [...html.matchAll(/src="(js\/courses\/preuda-l-[^"]+)"/g)].map(m => m[1])) {
    assert.ok(at(f) > at('js/courses/preuda-lectura.js') && at(f) < at('js/courses/preuda-lectura-juegos.js'), f);
    assert.ok(sw.includes(`'${f}'`), f);
  }
});

test('cada juego nuevo tiene guía, estilos y no busca [data-…] con closest (la app pone data-tab en <body>)', () => {
  for (const g of NEW) {
    assert.ok(GAMES[g], g);
    assert.ok(GUIDES[g]?.length >= 1, `${g} sin guía`);
    assert.doesNotMatch(read(`js/games/${g}.js`), /closest\('\[data-/, g);
  }
  assert.doesNotMatch(read('js/games/lectura-kit.js'), /closest\('\[data-/);
  for (const cls of ['.lec-doc', '.lec-chip', '.lec-zone', '.lec-pool', '.lec-opt']) assert.ok(css.includes(cls), cls);
});

// Estado que pone cada ficha en su primera zona válida (o la deja en la bandeja si sobra).
const solved = (name, params) => ({ rounds: LEC.rounds(name, params).map(r => ({ place: r.key.map(k => k == null ? -1 : [].concat(k)[0]) })) });
const empty = (name, params) => ({ rounds: LEC.rounds(name, params).map(r => ({ place: r.chips.map(() => -1) })) });

test('hilo-referente, termometro-tono y pregunta-examen califican su respuesta exacta', () => {
  const h = GAMES['hilo-referente'], p = { rounds: [{ p: 1, text: 'Ana vio a Luis|. |Él|sonrió.', from: 2, answer: 0, ask: '¿A quién?' }] };
  assert.equal(h.grade({ rounds: [{ to: 0 }] }, p).ok, true);
  assert.equal(h.grade({ rounds: [{ to: 3 }] }, p).ok, false);
  assert.equal(h.grade({ rounds: [{ to: -1 }] }, p).ok, false);
  const t = GAMES['termometro-tono'], q = { rounds: [{ frag: 'x', scale: ['irónico', 'neutral', 'entusiasta'], answer: 0 }] };
  assert.equal(t.grade({ rounds: [{ at: 0 }] }, q).ok, true);
  assert.equal(t.grade({ rounds: [{ at: 2 }] }, q).ok, false);
  const x = GAMES['pregunta-examen'], r = { doc: { id: 'd', title: 't', paras: ['a'] }, q: '¿?', options: ['a', 'b', 'c', 'd'], answer: 2 };
  assert.equal(x.grade({ pick: 2 }, r).ok, true);
  assert.equal(x.grade({ pick: 1 }, r).ok, false);
  assert.equal(x.grade({ pick: -1 }, r).ok, false);
  assert.match(x.grade({ pick: 1 }, r).solution, /^C\./);
});

test('hay mundos de lectura terminados y siguen el orden del curso', () => {
  assert.ok(TODOS.length >= 1);
  const order = units.map(u => u.world);
  for (const w of TODOS) assert.ok(order.includes(w), w);
});

test('la pista no regala la respuesta en las preguntas de una sola respuesta', () => {
  for (const u of units.filter(u => DONE.includes(u.world))) for (const l of u.lessons) for (const e of l.ex) {
    if (!['palabra-a-la-medida', 'conector-bisagra', 'signos-que-hablan'].includes(e.game)) continue;
    for (const r of e.params.rounds) assert.ok(!e.hint.toLowerCase().includes(`«${r.options[r.answer].toLowerCase()}»`), `${l.id}: la pista dice la respuesta`);
  }
});

test('evaluación en formato real: pregunta-examen sobre un texto nuevo, dos o más por lección, opciones distintas', () => {
  for (const u of units.filter(u => TODOS.includes(u.world))) {
    assert.ok(u.exam?.items?.length, u.world);
    const lessonDocs = new Set(u.lessons.flatMap(l => l.ex.flatMap(e => docsOf(e.params).map(d => d.id))));
    for (const l of u.lessons) assert.ok(u.exam.items.filter(it => it.lesson === l.id).length >= 2, `${u.world}: ${l.id}`);
    for (const it of u.exam.items) {
      const e = it.ex, p = e.params;
      assert.equal(e.game, 'pregunta-examen', `${u.world}: ${e.game}`);
      assert.ok(it.review?.length > 10, `${u.world}: sin nota de repaso`);
      assert.equal(p.options.length, 4);
      assert.equal(new Set(p.options).size, 4, `${u.world}: opciones repetidas en «${p.q}»`);
      assert.ok(p.answer >= 0 && p.answer < 4);
      for (const d of docsOf(p)) assert.ok(!lessonDocs.has(d.id), `${u.world}: la evaluación repite el texto ${d.id}`);
      assert.ok(e.hint?.length > 20 && e.explain?.length > 20, `${u.world}: ${p.q}`);
    }
    const keys = u.exam.items.map(it => it.ex.params.answer);
    assert.ok(new Set(keys).size >= 3, `${u.world}: las claves no varían (${keys})`);
  }
});

test('revisión: pestañas usables tras comprobar, bandeja enfocable y teclas que no escapan a la lección', () => {
  const kit = read('js/games/lectura-kit.js');
  const click = kit.slice(kit.indexOf("play.addEventListener('click'"));
  assert.ok(click.indexOf("closest('.lec-tab')") < click.indexOf('if (locked'), 'la pestaña se maneja antes de cortar por locked');
  assert.doesNotMatch(kit, /class="lec-pool" role="[^"]+" tabindex="-1"/, 'la bandeja se puede enfocar');
  assert.match(kit, /closest\('\.lec-pool'\) && sel >= 0\) \{\s*e\.preventDefault/, 'Enter en la bandeja devuelve la ficha');
  assert.match(kit, /\|\| drag\) return;/, 'un solo arrastre a la vez');
  for (const g of ['hilo-referente', 'termometro-tono', 'pregunta-examen']) assert.match(read(`js/games/${g}.js`), /LEC\.guardKeys\(box\)/, g);
  assert.match(kit, /guardKeys\(box\);\s*render\(\);/);
  assert.match(read('js/exam.js'), /it\.ex\.kind \|\| EX_KIND/);
});

