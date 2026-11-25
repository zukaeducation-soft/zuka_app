// Docente responsable y simulacros (spec 2026-11-25-docente-responsable).
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const { loadScripts, get } = require('./load'), read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const ctx = loadScripts(['js/instituciones.js', 'js/simulacros.js']), g = n => get(ctx, n), banco = JSON.parse(read('instituciones/banco.json'));

test('el banco está al día y cada pregunta está completa', () => {
  assert.equal(read('instituciones/banco.json').replace(/\r\n/g, '\n'), require('../tools/banco').banco(), 'corre node tools/banco.js');
  const ks = new Set(), ms = new Map(banco.componentes.flatMap(c => c.mundos.map(m => [m.id, c.id])));
  assert.equal(banco.componentes.map(c => c.id).join(), 'matematicas,lectura,sociales,ciencias,ingles');
  for (const p of banco.preguntas) {
    assert.ok(!ks.has(p.k), p.k); ks.add(p.k); assert.equal(p.o.length, 4, p.q); assert.ok(p.r >= 0 && p.r < 4, p.q); assert.equal(new Set(p.o).size, 4, p.q); assert.equal(ms.get(p.m), p.c, p.q);
    if (p.d != null) assert.ok(banco.textos[p.d].paras.length, p.q);
    if (p.l) assert.ok(p.l.startsWith(banco.componentes.find(c => c.id === p.c).prefijo), p.l);
    assert.ok(p.q.length < 4000 && p.o.every(o => o.length <= 1200) && p.e.length <= 2000, p.q);
  }
  banco.componentes.forEach(c => assert.ok(banco.preguntas.filter(p => p.c === c.id).length >= 40, c.id));
});
test('elegir: reparte entre temas, prefiere las nuevas y deja juntas las de un texto', () => {
  const ps = [...'abcdef'].flatMap((m, j) => [0, 1, 2, 3].map(i => ({ k: m + i, m: m < 'd' ? m : 'x', d: m === 'a' ? i % 2 : null, j })));
  let s = 1; const az = () => (s = (s * 16807) % 2147483647) / 2147483647, el = g('instElige');
  const xs = el(ps, ['a', 'b', 'c'], 6, new Set(), az); assert.equal(xs.length, 6); for (const m of 'abc') assert.equal(xs.filter(p => p.m === m).length, 2);
  const us = new Set(['a0', 'a1', 'b0', 'b1', 'b2', 'c0']); assert.ok(el(ps, ['a', 'b', 'c'], 6, us, az).every(p => !us.has(p.k)), 'mientras queden nuevas');
  assert.equal(el(ps, ['a'], 9, us, az).length, 4, 'no inventa'); assert.equal(el(ps, ['a'], 4, us, az).map(p => p.d).join().replace(/0,0|1,1/g, 'x'), 'x,x');
});
test('resultados: nota, por pregunta, por tema y quién falta', () => {
  const det = { preguntas: [{ m: 'a', l: 'L1', r: 0 }, { m: 'a', l: 'L2', r: 1 }, { m: 'b', l: '', r: 2 }, { m: 'b', l: 'L4', r: 3 }], resultados: [{ estudiante: 1, entregado: true, respuestas: [0, 1, 2, 3], aciertos: 4 }, { estudiante: 2, entregado: true, respuestas: [0, 3, -1, 0], aciertos: 1 }, { estudiante: 3, entregado: false, respuestas: [0, -1, -1, -1], aciertos: 1 }] };
  const r = g('instSimulacro')(det, [{ id: 1, grupo: 'A' }, { id: 2, grupo: 'A' }, { id: 3, grupo: 'B' }, { id: 4, grupo: 'B' }]);
  assert.equal([r.n, r.entregaron, r.curso, r.nota, r.min, r.max].join(), '4,2,1,63,25,100'); assert.equal(r.preguntas[1].acierto, .5); assert.equal(r.preguntas[1].trampa, 3); assert.equal(r.preguntas[2].blanco, 1); assert.equal(r.preguntas[0].trampa, null);
  assert.equal(r.mundos.map(m => m.m + m.acierto).join(), 'b0.5,a0.75'); assert.equal(r.mundos.flatMap(m => m.lecciones).join(), 'L4,L2'); assert.equal(r.grupos.map(x => x.grupo + x.entregaron + x.nota).join(), 'A263,B0null'); assert.equal(r.tramos.map(t => t.n).join(), '0,1,0,0,1');
  const v = g('instSimulacro')({ ...det, resultados: [] }, []); assert.equal(v.nota, null); assert.equal(v.mundos[0].acierto, null);
  assert.equal(g('instPorMundo')([det, det], 2).map(x => `${x.m}${x.ok}/${x.n}:${x.lecciones}`).join(' '), 'b0/4:L4 a2/4:L2'); assert.equal(g('instPorMundo')([det], 3).length, 0, 'sin entregar no cuenta');
});
test('la tarjeta del estudiante dice qué puede hacer', () => {
  const t = g('simTarjeta'), h = Date.parse('2026-11-25T12:00:00Z'), iso = d => new Date(h + d * 36e5).toISOString(), s = { n: 10, estado: 'nuevo', muestra: 'cerrar', abre: iso(-1), cierra: iso(5) };
  assert.equal(t(s, h).hace, 'empezar'); assert.equal(t({ ...s, abre: iso(1) }, h).hace, ''); assert.equal(t({ ...s, cierra: iso(-1) }, h).mal, true); assert.equal(t({ ...s, estado: 'curso', limite: iso(.2) }, h).b, 'Seguir');
  assert.equal(t({ ...s, estado: 'entregado', ver: false }, h).hace, ''); assert.match(t({ ...s, estado: 'entregado', ver: true, aciertos: 7 }, h).t, /70/); assert.equal(t({ ...s, estado: 'entregado', ver: false, cierra: iso(-1) }, h).hace, 'revisar', 'ya cerró aunque la copia sea vieja'); assert.equal(t({ ...s, estado: 'curso', limite: iso(-1) }, h).hace, '', 'se le acabó');
});
test('piezas en su sitio', () => {
  const idx = read('index.html'), po = read('instituciones/portal/index.html'); assert.ok(idx.indexOf('js/metas.js') < idx.indexOf('js/simulacros.js') && idx.indexOf('js/simulacros.js') < idx.indexOf('js/app.js'));
  assert.ok(po.indexOf('portal/docente.js') < po.indexOf('portal/portal.js') && po.includes('katex.min.js'));
  const sql = read('supabase/migrations/20261125000003_docentes_responsables.sql'); for (const f of ['privado.docencia', 'privado.simulacro']) assert.ok(new RegExp(`function ${f.replace('.', '\\.')}\\(p_accion text, p jsonb\\)[^$]*security definer set search_path = ''`).test(sql), f);
  assert.match(read('js/inicio.js'), /simulacrosHTML\(\)/);
});
