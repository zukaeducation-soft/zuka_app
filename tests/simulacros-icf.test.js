// Simulacros del Preicfes que el estudiante presenta por su cuenta (spec 2026-11-26-simulacros-preicfes): cinco pruebas de 24
// preguntas A–D nuevas, cada una con reloj; con las cinco presentadas sale el puntaje global de 0 a 500.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT, shell } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|conceptos|gimnasio/.test(f));
const sims = [...html.matchAll(/src="(js\/simulacro-icf-\d+\.js)"/g)].map(m => m[1]);
const ctx = loadScripts(['js/art.js', ...all, 'js/simulacros-icf.js', ...sims]);
const g = n => get(ctx, n);
const C = g('COURSES').find(c => c.id === 'preicfes'), SIMS = g('PI_SIMULACROS');
const PRUEBAS = ['lectura', 'matematicas', 'sociales', 'ciencias', 'ingles'];
const SOURCE = /icfes|saber 11|saber11|cuadernillo|simulacro|examen de (estado|admisi)|20(1\d|2\d)-[12]|\b20(19|21|22|24|25)\b/i;
const words = d => d.paras.join(' ').split(/\s+/).filter(Boolean).length;
const norm = s => String(s).toLowerCase().replace(/[^a-záéíóúñü0-9.,\-−]/g, '');

test('puntajes: cada prueba de 0 a 100 y el global de 0 a 500, con Inglés pesando 1 y las demás 3', () => {
  const p = g('simPuntaje'), gl = g('simGlobal');
  assert.equal(p(24, 24), 100); assert.equal(p(0, 24), 0); assert.equal(p(12, 24), 50); assert.equal(p(17, 24), 71);
  assert.equal(gl({ lectura: 100, matematicas: 100, sociales: 100, ciencias: 100, ingles: 100 }), 500);
  assert.equal(gl({ lectura: 60, matematicas: 60, sociales: 60, ciencias: 60, ingles: 60 }), 300);
  assert.equal(gl({ lectura: 50, matematicas: 50, sociales: 50, ciencias: 50, ingles: 100 }), Math.round(5 * (600 + 100) / 13));
  assert.equal(gl({ lectura: 50, matematicas: 50 }), null, 'sin las cinco pruebas no hay global');
});

test('una prueba vencida fuera de la pantalla se califica con lo marcado', () => {
  const src = read('js/simulacros-icf.js');
  assert.match(src, /function simIcfVence\(/); assert.match(src, /simIcfVence\(\);/); assert.match(src, /dismissDialog\(\)/);
});

test('repaso: los mundos con más errores primero, sin contar los acertados', () => {
  const rep = g('simRepaso'), items = [{ m: 'a', r: 0 }, { m: 'b', r: 1 }, { m: 'b', r: 2 }, { m: 'c', r: 3 }];
  assert.deepEqual([...rep(items, [1, 0, 0, 3])].join(), 'b,a');
  assert.deepEqual([...rep(items, [0, 1, 2, 3])].join(), '');
});

test('hay simulacros completos: cinco pruebas de 24 preguntas A–D bien armadas', () => {
  assert.ok(SIMS.length >= 1);
  const ids = new Set();
  for (const s of SIMS) {
    assert.match(s.id, /^icf-sim-\d+$/); assert.ok(!ids.has(s.id)); ids.add(s.id); assert.ok(s.titulo);
    assert.deepEqual(Object.keys(s.pruebas).sort(), [...PRUEBAS].sort(), s.id);
    for (const pr of PRUEBAS) {
      const L = s.pruebas[pr], mundos = new Set(C.units.filter(u => u.block === pr).map(u => u.world));
      assert.equal(L.length, 24, `${s.id} ${pr}`);
      const letras = [0, 0, 0, 0];
      L.forEach((it, i) => {
        const id = `${s.id} ${pr} ${i + 1}`;
        assert.ok(mundos.has(it.m), `${id}: mundo ${it.m}`);
        assert.ok(it.q?.length >= 25, id); assert.equal(it.o.length, 4, id);
        assert.equal(new Set(it.o.map(norm)).size, 4, `${id}: opciones repetidas`); assert.ok(it.o.every(o => o.trim()), id);
        assert.ok(Number.isInteger(it.r) && it.r >= 0 && it.r < 4, id); letras[it.r]++;
        assert.ok(it.e?.length > 30, `${id}: explicación`);
        if (it.d != null) assert.ok(s.textos[it.d], `${id}: texto ${it.d}`);
      });
      assert.ok(letras.every(n => n >= 3 && n <= 9), `${s.id} ${pr}: claves ${letras}`);
      const larga = L.filter(it => { const l = it.o.map(o => o.length), m = Math.max(...l); return l[it.r] === m && l.filter(x => x === m).length === 1; }).length;
      assert.ok(larga <= 7, `${s.id} ${pr}: la correcta es la más larga en ${larga} preguntas`);
    }
    for (const [k, t] of Object.entries(s.textos)) {
      const usado = PRUEBAS.flatMap(p => s.pruebas[p]).filter(it => it.d === k).length;
      assert.ok(usado >= 2, `${s.id}: el texto ${k} sirve a ${usado} preguntas`);
      assert.ok(t.title && t.paras.length >= 1, k);
    }
    const lect = new Set(s.pruebas.lectura.map(it => it.d).filter(Boolean));
    assert.ok(lect.size >= 4, `${s.id}: lectura con ${lect.size} textos`);
    for (const k of lect) assert.ok(words(s.textos[k]) >= 180, `${s.id}: ${k} corto (${words(s.textos[k])})`);
  }
});

test('las preguntas son nuevas, no dicen de dónde salen y no repiten las de los cursos', () => {
  const vistos = new Set();
  for (const c of g('COURSES')) for (const u of c.units) for (const ex of [...u.lessons.flatMap(l => l.ex), ...(u.exam?.items || []).map(i => i.ex)]) if (ex?.q) vistos.add(norm(ex.q));
  for (const q of JSON.parse(read('instituciones/banco.json')).preguntas) vistos.add(norm(q.q));
  const propias = new Set();
  for (const s of SIMS) {
    const txt = [...Object.values(s.textos).flatMap(t => [t.title, ...t.paras])];
    for (const pr of PRUEBAS) for (const it of s.pruebas[pr]) {
      txt.push(it.q, it.e, ...it.o);
      const k = norm(it.q) + norm(it.o.join(''));
      assert.ok(!propias.has(k), `repetida: ${it.q}`); propias.add(k);
      if (it.d == null) assert.ok(!vistos.has(norm(it.q)), `ya está en un curso: ${it.q}`);
    }
    for (const t of txt) assert.ok(!SOURCE.test(t), `${s.id}: «${t.slice(0, 60)}»`);
  }
});

test('el simulacro está registrado y se ve en el curso', () => {
  const at = f => html.indexOf(`src="${f}"`);
  assert.ok(at('js/simulacros-icf.js') > at('js/simulacros.js') && at('js/simulacros-icf.js') > at('js/exam.js'));
  for (const f of sims) assert.ok(at(f) > at('js/simulacros-icf.js'), f);
  const sh = shell();
  for (const f of ['js/simulacros-icf.js', ...sims]) assert.ok(sh.includes(`'${f}'`), `${f} sin SHELL`);
  assert.match(read('js/app.js'), /simIcfHTML\(c\)/);
  assert.match(read('js/app.js'), /simIcfBind\(/);
});
