// Zuka para instituciones (spec 2026-11-25-instituciones): precios, listas, seguimiento y lo que protege los datos.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ctx = loadScripts(['js/instituciones.js']), g = n => get(ctx, n), J = x => JSON.parse(JSON.stringify(x));
const P = [{ curso: 'algebra', meses: 6, precio: 99000, activo: true }, { curso: 'trig', meses: 6, precio: 29900, activo: true }, { curso: 'preicfes', meses: 6, precio: null, activo: true }, { curso: 'calc', meses: 6, precio: 5, activo: false }];

test('el precio baja con la cantidad y con el año, y lo que no tiene precio se cotiza', () => {
  const f = g('instPrecio');
  assert.deepEqual(J(f({ n: 10, meses: 6, cursos: ['algebra'] }, P)), { base: 99000, descuento: 0, anio: 0, unitario: 99000, total: 990000, sinPrecio: [] });
  assert.equal(f({ n: 30, meses: 6, cursos: ['algebra'] }, P).unitario, 89100);
  const a = f({ n: 120, meses: 12, cursos: ['algebra', 'preicfes'] }, P);
  assert.equal(a.base, 198000); assert.equal(a.unitario, 142600); assert.equal(a.total, 142600 * 120); assert.equal(a.sinPrecio.join(), 'preicfes');
  assert.equal(f({ n: 10, meses: 6, cursos: ['calc'] }, P).unitario, 0, 'un plan apagado no da precio');
  assert.equal(J(g('instSiguiente')(25)).join(), '30,10'); assert.equal(g('instSiguiente')(500), null);
});
test('los descuentos del panel se leen y, si están dañados, valen los de siempre', () => {
  const c = g('instConf');
  assert.equal(J(c('{"tramos":[[50,15],[1,0]],"anio":5}')).tramos.join('|'), '1,0|50,15');
  for (const malo of ['', null, 'x', '{"tramos":[]}', '{"tramos":[[1,0]],"anio":200}']) assert.equal(c(malo).anio, 10, String(malo));
});
test('la lista pegada de Excel, con punto y coma o con comas, se entiende y avisa', () => {
  const f = g('instLista');
  const a = f('Nombre\tGrupo\tDocumento\nAna  Ríos\t11A\t100\r\nJuan Mejía\t11A\t\n\n123\t11B\nAna Otra\t10A\t100');
  assert.equal(a.lista.map(x => `${x.nombre}/${x.grupo}/${x.identificador}`).join('|'), 'Ana Ríos/11A/100|Juan Mejía/11A/');
  assert.equal(a.malas.length, 2, 'sin nombre y documento repetido');
  assert.equal(f('"Luisa Cano";"10B"').lista[0].grupo, '10B'); assert.equal(f('Sara Gil, 10A').lista[0].nombre, 'Sara Gil'); assert.equal(f('﻿Nombre completo;Grupo').lista.length, 0);
});
const D = { hoy: '2026-11-25', cursos: [{ id: 'algebra', nombre: 'Álgebra' }], lecciones: [1, 2, 3, 4].map(i => ({ id: `l${i}`, curso: 'algebra', titulo: `L${i}` })),
  estudiantes: [{ id: 1, nombre: 'A', grupo: '10', cursos: ['algebra'], activo: true, entro: true, alta: '2026-10-01' }, { id: 2, nombre: 'B', grupo: '10', cursos: ['algebra'], activo: true, entro: false, alta: '2026-11-01' }, { id: 3, nombre: 'C', grupo: '11', cursos: ['algebra'], activo: true, entro: true, alta: '2026-10-01' }, { id: 4, nombre: 'D', grupo: '11', cursos: ['algebra'], activo: false, entro: true, alta: '2026-10-01' }],
  uso: [[1, '2026-11-24', 600, 20, 18], [1, '2026-10-30', 600, 5, 5], [3, '2026-11-01', 1200, 20, 4], [4, '2026-11-24', 9999, 9, 9]], hechas: [[1, 'l1', '2026-11-24'], [1, 'l2', null], [3, 'l1', '2026-11-01']] };
test('el seguimiento cuenta solo activos, respeta filtros y dice quién necesita una mano', () => {
  const c = g('instCalcula')(D, { dias: 7, grupo: '', curso: '' });
  assert.equal(c.filas.length, 3); assert.equal(c.activos, 1); assert.equal(c.min, 10); assert.equal(c.aciertos, 90); assert.equal(c.nuevas, 1); assert.equal(c.entraron, 2);
  assert.equal(c.filas.find(e => e.id === 1).avance, .5); assert.equal(c.filas.find(e => e.id === 1).alerta, null);
  assert.equal(c.alertas.map(e => e.alerta.k).join(), 'nunca,ausente'); assert.equal(c.serie.length, 7); assert.equal(c.grupos.length, 2);
  assert.equal(c.cursos[0].mapa.map(l => l.n).join(), '2,1,0,0');
  const diez = g('instCalcula')(D, { dias: 90, grupo: '10', curso: '' }); assert.equal(diez.filas.length, 2); assert.equal(diez.min, 20);
});
test('una meta sabe quién la cumplió', () => {
  const c = g('instCalcula')(D, { dias: 28, grupo: '', curso: '' }), m = g('instMeta')({ curso: 'algebra', lecciones: ['l1', 'l2'], grupo: '', hasta: '2026-11-27' }, D.estudiantes, c.hechas, D.hoy);
  assert.equal(`${m.ok}/${m.n}`, '1/3'); assert.equal(m.quedan, 2); assert.equal(m.p, .5);
});
test('lo que da la institución se suma a lo propio sin quitar una compra que dura más', () => {
  const j = g('instJunta'), i = [{ curso: 'algebra', tipo: 'pago', hasta: '2026-12-31', institucion: 'X' }];
  assert.equal(j([{ curso: 'algebra', tipo: 'prueba', hasta: null }], i)[0].institucion, 'X');
  assert.equal(j([{ curso: 'algebra', tipo: 'pago', hasta: '2027-06-01' }], i)[0].institucion, undefined);
  assert.equal(j([{ curso: 'algebra', tipo: 'pago', hasta: '2026-06-01' }, { curso: 'trig', tipo: 'pago', hasta: '2027-01-01' }], i).map(a => a.institucion || a.curso).join(), 'X,trig');
  assert.match(read('js/acceso.js'), /filter\(a => !a\.institucion\)/, 'a ellos no se les pide el formulario de datos');
});
test('las tablas quedan cerradas y las funciones no las llama cualquiera', () => {
  const s = read('supabase/migrations/20261125000001_instituciones.sql');
  for (const t of ['inst_cotizaciones', 'instituciones', 'inst_gestores', 'inst_estudiantes', 'inst_metas', 'inst_registro']) assert.match(s, new RegExp(`alter table public\\.${t} enable row level security`));
  assert.doesNotMatch(s, /create policy/); assert.doesNotMatch(s, /grant select/);
  assert.match(s, /revoke execute[\s\S]+from public, anon, authenticated;/); assert.match(s, /grant execute on function privado\.pedir_cotizacion\(jsonb\), public\.pedir_cotizacion\(jsonb\) to anon, authenticated;/);
  assert.equal((s.match(/security definer/g) || []).length, (s.match(/security definer set search_path = ''/g) || []).length);
  assert.match(s, /where id = i\.id for update/, 'dos altas a la vez no pasan de los cupos');
  const g2 = s.slice(s.indexOf("p_accion = 'panel'"), s.indexOf("elsif p_accion = 'estudiante'")); for (const k of ['telefono', 'correo_contacto', 'pagos']) assert.ok(!g2.slice(g2.indexOf("'estudiantes'"), g2.indexOf("'uso'")).includes(k), k);
});
test('las páginas están enlazadas, no pasan por la caché y cumplen la política de contenido', () => {
  assert.match(read('sw.js'), /\\\/\(admin\|instituciones\)/);
  const idx = read('index.html'); assert.ok(idx.indexOf('js/instituciones.js') > 0 && idx.indexOf('js/metas.js') < idx.indexOf('js/app.js'));
  for (const f of ['instituciones/index.html', 'instituciones/portal/index.html']) {
    const h = read(f); assert.doesNotMatch(h, /<script>/, f); assert.doesNotMatch(h, /\son[a-z]+="/, f);
    for (const m of h.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) { const u = m[1]; assert.ok(u.endsWith('/') ? fs.existsSync(path.join(ROOT, u, 'index.html')) : fs.existsSync(path.join(ROOT, u)), `${f}: ${u}`); }
  }
  assert.match(read('js/presentacion.js'), /id="pz-inst"/); assert.match(read('admin/index.html'), /#instituciones/);
  assert.doesNotMatch(read('instituciones/portal/portal.js'), /sb\.from\(/, 'el portal no lee tablas');
});
