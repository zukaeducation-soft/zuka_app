// Preuniversitario · Comprensión lectora · arreglos tras la ronda 2 de la estudiante simulada (docs/evaluacion-curso/respuestas,
// ronda2-cl.json y ronda2-cl-notas.md): opiniones sin palabra pista y datos con palabras que parecen valorar, conectores que
// rectifican («al contrario», «más bien», «antes bien»), tono en adverbios de actitud, prefijos que engañan, una idea de un texto
// que encuentra explicación en el otro, EXCEPTO cuya intrusa está en otro párrafo, testimonio como género o como cita y matizar
// frente a relativizar.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'lectura');
const lessons = units.flatMap(u => u.lessons);
const L = id => lessons.find(l => l.id === id);
const scenes = id => JSON.stringify(L(id).clip?.scenes || []);
const exOf = (id, game) => L(id).ex.filter(e => e.game === game);
const examOf = id => units.flatMap(u => u.exam?.items || []).filter(it => it.lesson === id);
const LISTA = /mejor|peor|debería|lamentable|excelente|a mi juicio|más importante|el más|la más/i;

test('Hechos y opiniones: el criterio es «¿se puede verificar?», no la lista de palabras', () => {
  const s = scenes('pu-ag-3');
  assert.match(s, /verificar|comprobar/i);
  assert.match(s, /sin ninguna palabra|sin palabra/i, 'la escena enseña opiniones sin palabra pista');
  assert.match(s, /es hora de|hace falta/i, 'exigencias sin «debería»');
  assert.match(s, /rico en|rica en/i, 'una palabra que valora en una frase y describe en otra');
  const q = exOf('pu-ag-3', 'quien-lo-dice')[0].params.cards;
  const opin = q.filter(([t, v]) => v === 1 && !LISTA.test(t));
  assert.ok(opin.length >= 2, `opiniones sin palabra de la lista: ${opin.length}`);
  assert.ok(opin.some(([t]) => /es hora de|hace falta|no puede seguir/i.test(t)), 'una exigencia sin «debería»');
  assert.ok(q.some(([t, v]) => v === 0 && /rica|rico|buena parte|fuerte|grande/i.test(t)), 'un dato con una palabra que parece valorar');
  const ex = examOf('pu-ag-3');
  assert.ok(ex.length >= 4, `evaluación: ${ex.length} preguntas de hechos y opiniones`);
  const ans = it => it.ex.params.options[it.ex.params.answer];
  assert.ok(ex.some(it => /opini/i.test(it.ex.params.q) && !LISTA.test(ans(it)) && !/debería/.test(ans(it))), 'opinión correcta sin palabra pista');
  assert.ok(ex.some(it => /hecho/i.test(it.ex.params.q) && /más|rico|buen|grande|fuerte/i.test(ans(it))), 'hecho con palabra que parece valorar');
  for (const it of ex) assert.doesNotMatch(it.ex.hint, /palabra que valore/i, 'la pista no manda a buscar la palabra');
});

test('Conectores: «al contrario», «más bien» y «antes bien» rectifican tras una idea rechazada', () => {
  const s = scenes('pu-cn-1');
  for (const c of ['al contrario', 'más bien', 'antes bien', 'rectific', 'en cambio']) assert.match(s, new RegExp(c, 'i'), c);
  const r = exOf('pu-cn-1', 'conector-bisagra')[0].params.rounds.find(r => /^al contrario/i.test(r.options[r.answer]));
  assert.ok(r && /\bno\b/.test(r.a), 'un «al contrario» después de una negación');
  const cards = JSON.stringify(exOf('pu-cn-1', 'quien-lo-dice')[0]?.params || {});
  assert.match(cards, /más bien/); assert.match(cards, /antes bien/); assert.match(cards, /Rectific/);
  assert.ok(examOf('pu-cn-1').some(it => /al contrario/i.test(it.ex.params.q)), 'la evaluación pregunta por «al contrario»');
});

test('Tono: adverbios y expresiones de actitud, no solo adjetivos', () => {
  assert.match(scenes('pu-ag-2'), /adverbio/i);
  assert.match(scenes('pu-ag-2'), /curiosamente/i);
  const frags = exOf('pu-ag-2', 'termometro-tono')[0].params.rounds.map(r => r.frag).join(' ');
  assert.match(frags, /curiosamente/); assert.match(frags, /por supuesto/);
  const qs = examOf('pu-ag-2').map(it => it.ex.params.q).join(' ');
  assert.match(qs, /por fortuna/); assert.match(qs, /como era de esperarse/);
});

test('Prefijos y raíces: casos en que las piezas engañan y manda el contexto', () => {
  assert.match(scenes('pu-vo-4'), /engañan/i);
  assert.match(scenes('pu-vo-4'), /manda el contexto/i);
  const g = exOf('pu-vo-4', 'genero-o-cita')[0].params;
  assert.ok(g.rot.some(r => /engaña/.test(r)) && g.va.filter(v => v === 1).length >= 2, 'dos palabras con re- que no es «de nuevo»');
  assert.ok(examOf('pu-vo-4').some(it => /contexto manda|manda el contexto/i.test(it.review) && it.ex.params.options.some((o, i) => i !== it.ex.params.answer && /volver a/.test(o))));
});

test('Dos textos: una idea de un texto que encuentra explicación en el otro', () => {
  assert.match(scenes('pu-dt-1'), /encuentra explicación/i);
  assert.ok(L('pu-dt-1').ex.some(e => /explica/i.test(e.params.principle || '') && e.params.docs?.length === 2), 'un juego de explicación entre los dos textos');
  assert.ok(examOf('pu-dt-1').some(it => /encuentra explicación/i.test(it.ex.params.q)), 'la evaluación lo pregunta');
});

test('EXCEPTO: la intrusa puede estar en el texto, pero en otro párrafo', () => {
  assert.match(scenes('pu-el-3'), /otro párrafo/i);
  const q = exOf('pu-el-3', 'dentro-fuera')[0];
  assert.ok(q && q.params.rot.some(v => /otro párrafo/.test(v)) && q.params.va.includes(1), 'práctica con una intrusa de otro párrafo');
  const words = t => t.toLowerCase().match(/[a-záéíóúñ]{4,}/g) || [];
  const hit = examOf('pu-el-3').some(it => {
    const p = it.ex.params, m = p.q.match(/EXCEPTO/) && p.q.match(/párrafo (\d)/);
    if (!m) return false;
    const n = +m[1], w = words(p.options[p.answer]);
    const inPara = i => w.filter(x => p.doc.paras[i].toLowerCase().includes(x)).length / w.length;
    return inPara(n - 1) < 0.5 && p.doc.paras.some((_, i) => i !== n - 1 && inPara(i) >= 0.6);
  });
  assert.ok(hit, 'una EXCEPTO limitada a un párrafo cuya intrusa aparece en otro párrafo');
});

test('Testimonio: género frente a cita testimonial dentro de otro texto', () => {
  assert.match(scenes('pu-tt-3'), /cita testimonial/i);
  assert.match(scenes('pu-tt-3'), /género/i);
  const ex = examOf('pu-tt-3');
  assert.ok(ex.some(it => /cita testimonial/.test(it.ex.params.q + it.ex.params.options.join())), 'la evaluación nombra la cita testimonial');
  assert.ok(!ex.some(it => /se reconocen como un testimonio/.test(it.ex.params.q)), 'no llama testimonio a secas a una cita');
});

test('Función de párrafos: «matizar» y «relativizar» son categorías distintas', () => {
  assert.match(scenes('pu-cn-2'), /se matiza lo propio|matizar.+relativizar/i);
  const g = exOf('pu-cn-2', 'quien-lo-dice')[0].params;
  const mi = g.voices.findIndex(v => /^Matiza/.test(v)), ri = g.voices.findIndex(v => /^Relativiza/.test(v));
  assert.ok(mi >= 0 && ri >= 0 && mi !== ri, 'dos voces separadas');
  assert.ok(g.cards.some(c => c[1] === mi) && g.cards.some(c => c[1] === ri), 'práctica de cada una');
});
