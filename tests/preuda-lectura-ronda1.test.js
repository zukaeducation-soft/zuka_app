// Preuniversitario · Comprensión lectora · arreglos tras la ronda 1 de la estudiante simulada (docs/evaluacion-curso/respuestas,
// ronda1-cl.json y ronda1-cl-notas.md): verbos de función de las opciones del examen, concesión sin «pero», ironía sutil,
// presupuestos sin palabra pista, un tercero que usa un texto contra el otro y el tipo de respaldo de cada texto, evaluaciones
// con más preguntas A–D y textos más largos, repasos que remiten a la lección que enseña la técnica y pistas de forma que dejaban
// acertar sin leer (la opción correcta siempre era la más larga).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'lectura');
const lessons = units.flatMap(u => u.lessons);
const L = id => lessons.find(l => l.id === id);
const unit = w => units.find(u => u.world === w);
const words = d => d.paras.join(' ').split(/\s+/).filter(Boolean).length;
// Todo lo que la lección enseña con palabras: escenas, enunciados, fichas, zonas, explicaciones y pistas.
const lessonText = l => JSON.stringify([l.clip?.scenes, l.ex.map(e => [e.q, e.explain, e.hint, { ...e.params, doc: undefined, docs: undefined }])]);
const sceneText = l => JSON.stringify(l.clip?.scenes || []);
const exDocs = u => u.exam.items.flatMap(it => it.ex.params.docs || [it.ex.params.doc]).filter((d, i, a) => a.findIndex(x => x.id === d.id) === i);
const uniqLongest = opts => { const n = opts.map(o => o.length), m = Math.max(...n); return n.filter(x => x === m).length === 1 ? n.indexOf(m) : -1; };

test('verbos de función del examen: se enseñan en Función de párrafos y en Tesis y argumentos', () => {
  const both = lessonText(L('pu-cn-2')) + lessonText(L('pu-ag-1'));
  for (const v of ['refut', 'matiz', 'relativiz', 'conced', 'ejemplific', 'ilustr']) assert.match(both, new RegExp(v, 'i'), v);
  for (const v of ['refut', 'matiz', 'conced']) assert.match(lessonText(L('pu-cn-2')), new RegExp(v, 'i'), `pu-cn-2: ${v}`);
  for (const v of ['refut', 'conced', 'relativiz']) assert.match(sceneText(L('pu-ag-1')) + sceneText(L('pu-cn-2')), new RegExp(v, 'i'), `escenas: ${v}`);
});

test('Tesis y argumentos: el texto trae una concesión sin «pero» y la lección la trabaja', () => {
  const l = L('pu-ag-1'), d = l.ex.map(e => e.params.doc).find(d => d?.paras);
  const p = d.paras.findIndex(t => /sin duda|admito|no niego|es verdad que|concedo/i.test(t) && !/\bpero\b|sin embargo|no obstante/i.test(t));
  assert.ok(p >= 0, 'ningún párrafo concede sin un «pero» que lo anuncie');
  assert.match(sceneText(l), /sin .{0,10}«pero»/i, 'la escena explica la concesión sin «pero»');
  assert.ok(l.ex.filter(e => JSON.stringify(e.params).includes(d.paras[p].slice(0, 20)) || /concesi|conced/i.test(JSON.stringify(e.params))).length >= 2,
    'al menos dos juegos trabajan la concesión');
});

test('Ironía: además de antífrasis evidentes, hay ironía sutil dentro de un texto serio', () => {
  const l = L('pu-lf-2');
  assert.match(sceneText(l), /sutil/i);
  assert.match(lessonText(l), /con aire de/i, 'práctica con una ironía de registro («con aire de…»)');
  assert.doesNotMatch(JSON.stringify(l.ex.map(e => e.params.cards || e.params.rounds)), /Qué puntual/, 'la antífrasis de manual ya está en la escena; el juego practica otra cosa');
  const ex = unit('pu-figurado').exam;
  assert.ok(ex.items.some(it => it.lesson === 'pu-lf-2' && /sutil|registro|solemn/i.test(it.ex.explain + it.review)), 'la evaluación pregunta por una ironía sutil');
});

test('Presupuestos: también sin palabra pista, y con la forma «da por sentado»', () => {
  const l = L('pu-in-2'), t = lessonText(l);
  assert.match(sceneText(l), /da por sentado/i);
  assert.match(sceneText(l), /sin (ninguna )?palabra/i);
  assert.match(t, /comparaci/i, 'un presupuesto que sale de una comparación');
  assert.ok(unit('pu-inferencia').exam.items.some(it => it.lesson === 'pu-in-2' && /da por sentado/i.test(it.ex.params.q)));
});

test('Dos textos: un tercero que usa un texto contra el otro y el tipo de respaldo de cada texto', () => {
  const t1 = lessonText(L('pu-dt-1')), t2 = lessonText(L('pu-dt-2'));
  assert.match(t1, /respald/i, 'pu-dt-1 compara cómo respalda cada texto lo que dice');
  assert.match(t1, /experiencia/i);
  assert.match(t2, /defensor|gerente|tercer/i, 'pu-dt-2 pone a un tercero a usar un texto contra el otro');
  const u = unit('pu-dos-textos'), qs = u.exam.items.map(it => it.ex.params.q).join(' | ');
  assert.match(qs, /defensor/i, 'la evaluación pregunta qué tomaría un tercero de un texto contra el otro');
  assert.match(qs, /respald|sosten|sostien|apoya/i, 'la evaluación compara el tipo de respaldo');
  for (const d of exDocs(u)) {
    assert.ok(d.paras.length >= 4, `${d.id}: ${d.paras.length} párrafos`);
    assert.ok(words(d) >= 220, `${d.id}: ${words(d)} palabras`);
  }
});

test('evaluaciones de los mundos con cobertura parcial: más preguntas A–D y textos de examen', () => {
  for (const w of ['pu-inferencia', 'pu-vocabulario', 'pu-argumentacion', 'pu-dos-textos', 'pu-figurado']) {
    const u = unit(w);
    assert.ok(u.exam.items.length >= 8, `${w}: ${u.exam.items.length} preguntas`);
    for (const d of exDocs(u)) assert.ok(d.paras.length >= 4, `${w} ${d.id}: ${d.paras.length} párrafos`);
  }
  for (const w of ['pu-argumentacion', 'pu-figurado']) for (const d of exDocs(unit(w))) assert.ok(words(d) >= 280, `${w}: ${words(d)} palabras`);
});

test('el repaso remite a la lección que enseña la técnica de la pregunta', () => {
  for (const u of units) for (const it of u.exam?.items || []) {
    const l = L(it.lesson), t = lessonText(l), q = it.ex.params.q;
    if (/EXCEPTO/.test(q)) assert.match(t + l.ex.map(e => e.game).join(), /EXCEPTO|intruso-excepto/, `${u.world}: EXCEPTO con repaso en ${l.id}`);
    if (/retórica/i.test(q + it.ex.params.options.join())) assert.match(sceneText(l), /retórica/i, `${u.world}: pregunta retórica con repaso en ${l.id}`);
    if (/__/.test(q)) assert.ok(l.ex.some(e => e.game === 'palabra-a-la-medida'), `${u.world}: vocabulario con repaso en ${l.id}`);
    if (/exagera/i.test(it.review)) assert.match(sceneText(l), /exager|hipérbole/i, `${u.world}: exageración con repaso en ${l.id}`);
  }
});

test('Tiempo y preguntas EXCEPTO: la lectura del examen tiene unas 30 preguntas, no 40', () => {
  assert.doesNotMatch(lessonText(L('pu-el-3')), /40 preguntas/);
  assert.match(sceneText(L('pu-el-3')), /30 preguntas/);
});

test('sin pistas de forma: la opción correcta no es casi siempre la más larga', () => {
  let n = 0, longest = 0;
  for (const l of lessons) for (const e of l.ex) if (e.game === 'palabra-a-la-medida') for (const r of e.params.rounds) {
    n++; if (uniqLongest(r.options) === r.answer) longest++;
  }
  assert.ok(longest <= n / 4, `palabra-a-la-medida: la correcta es la más larga en ${longest} de ${n}`);
  let m = 0, ml = 0;
  for (const u of units) for (const it of u.exam?.items || []) { m++; if (uniqLongest(it.ex.params.options) === it.ex.params.answer) ml++; }
  assert.ok(ml <= m / 2, `evaluaciones: la correcta es la más larga en ${ml} de ${m}`);
});
