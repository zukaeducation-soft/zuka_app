// Explicación interactiva de alg-0a (¿Qué es un conjunto?) en el formato Explora (spec 2026-11-23-explora-leccion-interactiva):
// la escena «conjunto» (lógica pura) y el contenido: primero se explica, después se practica y el problema va al final.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = read('sw.js');
const ctx = loadScripts(['js/explora.js', 'js/explora-alg-0a.js']);
const XP = get(ctx, 'XP'), L = get(ctx, 'EXPLORA')['alg-0a'];
const K = XP.conjunto;

test('el contenido de alg-0a está en index.html (antes de player.js) y en el service worker', () => {
  assert.ok(html.includes('src="js/explora-alg-0a.js"') && sw.includes("'js/explora-alg-0a.js'"));
  assert.ok(html.indexOf('js/explora-alg-0a.js') < html.indexOf('js/player.js'));
});

test('conjunto: las fichas repetidas son un solo elemento y el orden no importa', () => {
  const p = { nombre: 'M', items: ['T', 'O', 'M', 'A', 'T', 'E'], meta: ['T', 'O', 'M', 'A', 'E'], cardinal: true };
  assert.equal(K.ok({ en: [0, 1, 2, 3, 4, 5] }, p), true, 'con las dos T adentro sigue siendo el mismo conjunto');
  assert.equal(K.ok({ en: [5, 3, 2, 1, 0] }, p), true, 'en otro orden también');
  assert.equal(K.ok({ en: [0, 1, 2, 3] }, p), false, 'falta la E');
  assert.equal(K.elems({ en: [0, 4, 1] }, p).join(), 'T,O');
  assert.match(K.lee({ en: [0, 1, 4] }, p), /M = \\\{T, O\\\}.*n\(M\) = 2/);
  assert.match(K.lee({ en: [] }, p), /\\\{\\,\\\}/, 'el conjunto vacío se ve como { }');
  assert.match(K.lee({ en: [0] }, { nombre: 'S', items: ['rojo'], meta: ['rojo'] }), /\\text\{rojo\}/);
});

test('conjunto: la frase responde a lo que acaba de pasar', () => {
  const p = { nombre: 'D', items: ['4', '5', '6'], meta: ['5', '6'] };
  assert.match(K.dice({ en: [], ult: null }, p), /Arrastra/);
  assert.match(K.dice({ en: [1], ult: { lab: '5', que: 'in' } }, p), /5 ∈ D/);
  assert.match(K.dice({ en: [0], ult: { lab: '4', que: 'in' } }, p), /no cumple/);
  assert.match(K.dice({ en: [1], ult: { lab: '5', que: 'dup' } }, p), /nada se repite/);
  assert.match(K.dice({ en: [], ult: { lab: '5', que: 'out' } }, p), /5 ∉ D/);
});

test('primero se explica y después se pide: cada capítulo abre con su explicación y el problema va al final', () => {
  assert.ok(L.caps.length >= 4);
  L.caps.slice(0, -1).forEach((c, k) => assert.equal(L.pasos.find(p => p.cap === k).tipo, 'muestra', `«${c}» abre explicando`));
  const ult = L.pasos.filter(p => p.cap === L.caps.length - 1);
  assert.ok(ult[0].tipo === 'conjunto' && /heladería/.test(ult[0].texto), 'el problema de contexto va al final');
  assert.equal(L.pasos.at(-1).tipo, 'cierre');
  const caps = L.pasos.map(p => p.cap);
  assert.equal(caps.join(), [...caps].sort((a, b) => a - b).join());
});

test('cada paso es corto, se puede cumplir y no nace cumplido', () => {
  for (const p of L.pasos) {
    const t = XP[p.tipo];
    assert.ok(t, p.tipo);
    assert.ok(p.texto.replace(/[$*\\]/g, '').length <= 170, `texto largo: ${p.texto}`);
    assert.ok(p.idea && p.idea.length <= 130, `idea larga: ${p.idea}`);
    if (p.tipo !== 'cierre') assert.equal(t.ok(t.ini(p), p), false, `${p.tipo} nace cumplido`);
    assert.equal(t.ok(t.sol(p), p), true, `${p.tipo} no se puede cumplir`);
    if (p.tipo === 'conjunto') {
      for (const m of p.meta) assert.ok(p.items.includes(m), `${m} no está entre las fichas`);
      assert.ok(p.items.some(x => !p.meta.includes(x)), 'hay algo que dejar afuera: no se resuelve metiéndolo todo');
      assert.ok(!p.meta.includes(p.nombre) && !p.meta.includes(p.nombre.toLowerCase()), 'el conjunto no se llama como uno de sus elementos');
      assert.ok(t.dice(t.ini(p), p).length <= 90);
    }
  }
});

test('explicaciones: momentos que se pueden leer y que solo usan fichas de su escena', () => {
  for (const p of L.pasos.filter(p => p.tipo === 'muestra')) {
    assert.equal(p.escena, 'conjunto');
    assert.ok(p.momentos.length >= 4 && p.momentos.length <= 7);
    const libres = [...p.en.items];
    for (const m of p.momentos) {
      assert.ok(m.dice.length <= 115, m.dice);
      const t = XP.muestra.pausa(m);
      assert.ok(t >= 1500 && t <= 5600, `${m.dice}: ${t} ms`);
      for (const lab of m.pon || []) { const k = libres.indexOf(lab); assert.ok(k >= 0, `no queda ficha ${lab}`); libres.splice(k, 1); }
      if (m.marca != null) assert.ok(p.en.items.includes(m.marca), m.marca);
    }
  }
  for (const p of L.pasos.filter(p => p.en)) assert.ok(!p.en.items.includes(p.en.nombre), `ni «${p.en.nombre} ∈ ${p.en.nombre}»`);
  const col = L.pasos.find(p => p.en && /COLOMBIA/.test(JSON.stringify(p)));
  const fin = new Set(col.momentos.flatMap(m => m.pon || []));
  assert.equal(fin.size, 7, 'COLOMBIA: ocho letras, siete elementos');
  assert.ok(col.momentos.some(m => m.cuenta === '$n(K) = 7$'));
});

test('los ejemplos de la explicación no salen en los ejercicios de la lección', () => {
  const lc = loadScripts([...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f)));
  const l = get(lc, 'COURSES').find(c => c.id === 'algebra').units[0].lessons[0];
  assert.equal(l.id, 'alg-0a');
  const ex = JSON.stringify(l.ex).toLowerCase();
  for (const w of ['bandera', 'semáforo', 'vocal', 'dado', 'múltiplo', 'colombia', 'tomate', 'heladería', 'vainilla']) assert.ok(!ex.includes(w), w);
});

test('revisión: fichas usables con teclado y con estado, un solo dedo, cancelar no cuenta como soltar', () => {
  const src = read('js/explora.js');
  const b = src.slice(src.indexOf('XPD.conjunto ='), src.indexOf('XPD.apuesta ='));
  assert.match(b, /box\.onclick/, 'Enter o espacio meten y sacan');
  assert.match(b, /aria-pressed/);
  assert.match(b, /if \(arr\) return/);
  assert.match(b, /box\.onpointercancel = \(\) => \{ if \(!arr\) return; arr\.el\.classList\.remove\('drag'\); arr = null; layout\(\); \}/);
  assert.match(read('css/explora.css'), /\.xc \{[^}]*touch-action: pan-y/);
});
