// Tablero del panel con filtros cruzados (spec 2026-11-24-tablero).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ctx = loadScripts(['admin/tablero.js']);
const g = n => get(ctx, n);
const J = x => JSON.stringify(x);

test('el rango y el de antes tienen el mismo largo y no se pisan', () => {
  const r = g('tbRango')(30, '2026-11-24', '2026-01-01');
  assert.equal(J([r.desde, r.hasta, r.antes.desde, r.antes.hasta]), J(['2026-10-26', '2026-11-24', '2026-09-26', '2026-10-25']));
  assert.equal(g('tbEntre')(r.desde, r.hasta), g('tbEntre')(r.antes.desde, r.antes.hasta));
  assert.equal(g('tbRango')(0, '2026-11-24', '2026-01-05').antes, null);
  assert.equal(g('tbLunes')('2026-11-22'), '2026-11-16');
});
test('los tramos van por día, semana o mes según el largo, sin repetirse', () => {
  const [R, gr, tr] = ['tbRango', 'tbGrano', 'tbTramos'].map(g);
  assert.equal([7, 30, 90, 365].map(n => gr(R(n, '2026-11-24'))).join(), 'dia,dia,semana,mes');
  for (const n of [7, 30, 90, 365]) { const r = R(n, '2026-11-24'), t = tr(r, gr(r)); assert.equal(new Set(t).size, t.length); }
  assert.equal(tr(R(7, '2026-11-24'), 'dia').length, 7);
});
test('una ciudad escrita distinto es la misma', () => {
  assert.equal(['medellín ', 'MEDELLIN', 'Medellín'].map(g('tbCiudad')).join(), 'Medellin,Medellin,Medellin');
  assert.equal(g('tbCiudad')(null), '');
});
test('el eje empieza en 0, cubre el máximo y tiene pocas marcas', () => {
  for (const m of [0, 1, 3, 7, 12, 99, 101, 1289000]) { const e = g('tbEje')(m); assert.equal(e[0], 0); assert.ok(e.at(-1) >= m && e.length <= 6, `${m}: ${e}`); }
});

const P = (id, o = {}) => ({ id, nombre: id, telefono: '', estado: 'pago', cursos: ['algebra'], ocupacion: 'once', edad: '16_17', ciudad: 'Cali', medio: 'amigo', alta: '2026-11-10', ultima: '2026-11-23', vence: '', ...o });
const D = { hoy: '2026-11-24', primero: '2026-11-01', L: new Map(),
  personas: [P('a'), P('b', { estado: 'prueba', cursos: ['preuda'], ciudad: 'Bello' }), P('c', { cursos: ['algebra', 'preuda'], ultima: '2026-11-01' }), P('d', { ultima: '' })],
  uso: [{ u: 'a', dia: '2026-11-20', seg: 600, lec: 1, ej: 10, ac: 8 }, { u: 'a', dia: '2026-11-21', seg: 300, lec: 0, ej: 0, ac: 0 }, { u: 'b', dia: '2026-11-20', seg: 60, lec: 0, ej: 10, ac: 2 }, { u: 'a', dia: '2026-11-12', seg: 60, lec: 0, ej: 0, ac: 0 }, { u: 'c', dia: '2026-11-20', seg: 0, lec: 0, ej: 0, ac: 0 }],
  hechas: [{ u: 'a', l: 'l1', curso: 'algebra', dia: '2026-11-20' }, { u: 'b', l: 'l2', curso: 'preuda', dia: '2026-11-21' }], medias: [{ u: 'c', l: 'l1', curso: 'algebra', dia: '2026-11-22' }],
  pagos: [{ u: 'a', curso: 'algebra', valor: 100, dia: '2026-11-19' }, { u: 'c', curso: 'preuda', valor: 50, dia: '2026-11-20' }, { u: null, curso: 'preuda', valor: 7, dia: '2026-11-20' }, { u: 'a', curso: 'algebra', valor: 40, dia: '2026-11-13' }] };
const calc = f => g('tbCalcula')(D, { dias: 7, ...f });

test('las cifras del periodo y su cambio contra el anterior', () => {
  const m = calc({}).metricas;
  assert.equal(J([m.activos.v, m.minutos.v, m.lecciones.v, m.aciertos.v, m.ventas.v]), J([2, 16, 2, 50, 157]));
  assert.equal(m.activos.antes, 1); assert.equal(m.activos.cambio, 100); assert.equal(m.ventas.antes, 40);
  assert.equal(m.minutos.serie.length, 7); assert.equal(m.ventas.serie.reduce((a, b) => a + b), 157);
  assert.equal(m.ventas.previa.reduce((a, b) => a + b), 40, 'la serie de antes no pierde nada al alinearse');
  assert.equal(m.aciertos.serie[0], null, 'un día sin ejercicios no es 0 %');
});
test('los filtros se cruzan: cada gráfica respeta todos menos el suyo', () => {
  const x = calc({ estado: 'prueba' });
  assert.equal(x.gente.map(p => p.id).join(), 'b'); assert.equal(x.metricas.lecciones.v, 1);
  assert.equal(x.reparto('estado').reduce((t, e) => t + e.n, 0), 4, 'la de estado se ve entera');
  assert.equal(J(x.reparto('curso').map(e => [e.id, e.n])), J([['preuda', 1]]));
  const y = calc({ curso: 'algebra' });
  assert.equal(y.metricas.ventas.v, 100); assert.equal(y.metricas.lecciones.v, 1); assert.equal(y.gente.length, 3);
  assert.equal(J(y.ventasCurso.map(e => e.n)), J([100, 57]), 'ventas por curso se ve entera');
  assert.equal(calc({ ciudad: 'Cali' }).metricas.ventas.v, 150, 'un pago sin cuenta no tiene ciudad');
});
test('embudo, riesgo, retención y calendario', () => {
  const x = calc({});
  assert.equal(x.embudo.map(e => e.n).join(), '4,2,2,0,3');
  assert.equal(x.riesgo.map(p => p.id).join(), 'd,c', 'primero quien nunca entró');
  assert.equal(x.calendario.length, 112); assert.equal(x.calendario.find(c => c.d === '2026-11-20').v, 11); assert.ok(x.calendario.filter(c => c.v === null).every(c => c.d > D.hoy));
  const s = x.retencion.find(r => r.s === '2026-11-09');
  assert.equal(s.n, 4); assert.equal(s.sem[0], 25); assert.equal(s.sem[1], 50); assert.equal(s.sem[3], null, 'las semanas que no han llegado quedan vacías');
});
test('va registrado y solo lee: no escribe en la base', () => {
  const h = read('admin/index.html'), js = read('admin/tablero.js');
  assert.ok(h.indexOf('tablero.js') > 0 && h.indexOf('tablero.js') < h.indexOf('panel.js') && h.includes('tablero.css') && h.includes('href="#tablero"'));
  assert.match(read('admin/panel.js'), /tablero: vTablero/);
  assert.doesNotMatch(js, /\.(insert|update|upsert|delete|rpc)\(/);
  assert.doesNotMatch(read('admin/tablero.css'), /color: ?#fff\b|font-weight: ?800/);
});
