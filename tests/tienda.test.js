// Tienda, lector y asesorías con saldo (spec 2026-11-24-tienda-libros).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ctx = loadScripts(['js/acceso.js', 'js/tienda.js', 'js/lector.js', 'js/tutorias.js']);
const f = n => get(ctx, n);
const arts = [{ id: 'j', precio: 100, precio_plan: null, da: { fisicos: [1, 2, 3, 4] } }, { id: 'd', precio: 60, precio_plan: 40, da: { libros: [1] } }];

test('el carrito usa el precio con plan y cobra el envío por cada 8 libros, solo si hay impresos', () => {
  const c = f('tiendaCuenta'), z = { precio: 20 };
  assert.equal(JSON.stringify(c([{ id: 'd', cantidad: 1 }], arts, false, z)), '{"subtotal":60,"fisicos":0,"envio":0,"total":60}');
  assert.equal(c([{ id: 'd', cantidad: 1 }], arts, true).total, 40);
  assert.equal(c([{ id: 'j', cantidad: 2 }], arts, true, z).total, 220);
  assert.equal(c([{ id: 'j', cantidad: 3 }], arts, true, z).envio, 40);
});
test('la dirección dice el primer dato que falta', () => {
  const e = f('direccionError');
  assert.equal(e({ nombre: 'A', telefono: '3' }).campo, 'departamento');
  assert.equal(e({ nombre: 'A', telefono: '3', departamento: 'A', ciudad: 'B', direccion: 'C' }), null);
});
test('el lector dibuja solo las páginas visibles y una a cada lado, y pide rutas que la base reconoce', () => {
  assert.equal(f('lectorCerca')([1, 2], 10).join(), '1,2,3');
  assert.equal(f('lectorCerca')([10], 10).join(), '9,10');
  assert.match(f('lectorRuta')({ id: 2, version: 3 }, 7), /^(\d{1,2})\/v(\d{1,6})\/(\d{4})\.webp$/);
});
test('el lector no descarga, no imprime y marca cada página', () => {
  const s = read('js/lector.js');
  for (const x of ["oncontextmenu", "['p', 's']", 'fillText', 'globalAlpha']) assert.ok(s.includes(x), x);
  assert.doesNotMatch(s, /createObjectURL|a\.download|<img/);
  assert.match(read('css/tienda.css'), /@media print \{ body\.leyendo/);
});
test('las asesorías de la base se muestran en hora de Colombia', () => {
  const b = f('tuDeFila')({ id: 5, curso: 'preuda', temas: ['a'], inicio: '2026-11-25T02:00:00+00:00', minutos: 60, nota: '', estado: 'confirmada' });
  assert.equal([b.id, b.date, b.time, b.ok].join(), 'srv-5,2026-11-24,21:00,true');
  assert.equal(f('TUTORIAS').mins, 60);
});
test('la base pone precios, guarda las páginas en privado y nadie escribe pedidos, horas ni libros a mano', () => {
  const sql = read('supabase/migrations/20261124000004_tienda.sql');
  for (const t of ['libros', 'articulos', 'envios', 'pedidos', 'libros_acceso', 'asesorias', 'horas']) assert.match(sql, new RegExp(`alter table public\\.${t} enable row level security`), t);
  assert.ok(!/grant (insert|update|delete|all)/.test(sql));
  assert.match(sql, /'libros', 'libros', false/);
  for (const fn of sql.match(/create function[\s\S]*?\$\$/g)) assert.match(fn, /set search_path = ''/, fn.slice(0, 60));
  assert.match(sql, /bucket_id = 'libros' and privado\.puede_leer\(name\)/);
});
test('va registrada en la página, el service worker, el botón atrás y el panel', () => {
  const idx = read('index.html'), sw = read('sw.js');
  for (const x of ['js/tienda.js', 'js/lector.js', 'css/tienda.css']) assert.ok(idx.includes(x) && sw.includes(`'${x}'`), x);
  for (const n of [1, 2, 3, 4]) assert.ok(fs.existsSync(path.join(ROOT, `brand/libros/${n}.webp`)), `portada ${n}`);
  assert.match(read('js/back.js'), /tiendaAtras\(\)\) \{ cover\(\); return; \}/);
  const ad = read('admin/index.html'); assert.ok(ad.indexOf('tienda.js') < ad.indexOf('panel.js'));
  assert.match(read('admin/tienda.js'), /isEvalSupported: false/);
});
