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
  assert.match(f('lectorRuta')({ id: 2, version: 3 }, 7), /^(\d{1,2})\/v(\d{1,10})\/(\d{4})\.webp$/);
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
  const idx = read('index.html'), sw = require('./load').shell();
  for (const x of ['js/tienda.js', 'js/lector.js', 'css/tienda.css']) assert.ok(idx.includes(x) && sw.includes(`'${x}'`), x);
  for (const n of [1, 2, 3, 4]) assert.ok(fs.existsSync(path.join(ROOT, `brand/libros/${n}.webp`)), `portada ${n}`);
  assert.match(read('js/back.js'), /tiendaAtras\(\)\) \{ cover\(\); return; \}/);
  const ad = read('admin/index.html'); assert.ok(ad.indexOf('tienda.js') < ad.indexOf('panel.js'));
  assert.match(read('admin/tienda.js'), /isEvalSupported: false/);
});
test('el QR de pago es el de Zuka y sale al comprar, al pedir y en los pedidos por pagar', () => {
  // Si alguien cambia la imagen (a dónde va el dinero), esta huella lo avisa.
  const h = require('crypto').createHash('sha256').update(fs.readFileSync(path.join(ROOT, 'brand/pago-breb.png'))).digest('hex');
  assert.equal(h, '74fbf1fc117b08c2a3015a2fa61f2f487239088346ff5d346b77f0a91d0c376b');
  assert.equal((read('js/cuenta.js') + read('js/tienda.js')).match(/pagoHTML\((sel\.precio|total|p\.total)\)/g).length, 3);
  assert.match(read('js/tienda.js'), /data-pago=/);
  assert.match(require('./load').shell(), /'brand\/pago-breb\.png'/);
});
test('la tienda es una pestaña con cursos, paquetes, libros, asesorías y pedidos; el pedido va en su capa', () => {
  const s = read('js/tienda.js');
  assert.match(read('index.html'), /<button data-tab="tienda">Tienda<\/button>/);
  assert.match(read('js/app.js'), /tienda: renderTienda,/);
  assert.match(read('js/pwa.js'), /'tienda'/);
  for (const v of ['todo', 'cursos', 'libros', 'asesorias', 'pedidos']) assert.ok(s.includes(`['${v}', `), v);
  assert.match(s, /function tiendaCapa\(paso\)/);
});
test('el ahorro de un paquete es de verdad: suma lo que se vende suelto y, si algo no se vende, no promete nada', () => {
  const t = f('tiendaSuelto');
  const A = [{ id: 'f1', tipo: 'fisico', precio: 60, da: { fisicos: [1] } }, { id: 'f2', tipo: 'fisico', precio: 50, da: { fisicos: [2] } }, { id: 'd1', tipo: 'digital', precio: 20, da: { libros: [1] } }, { id: 'h', tipo: 'asesoria', precio: 45, da: { horas: 1, horas_tipo: 'general' } }];
  const P = [{ curso: 'preuda', dias: 180, activo: true, precio: 140 }];
  assert.equal(t({ id: 'x', da: { cursos: ['preuda'], dias: 180, libros: [1] } }, A, P), 160);
  assert.equal(t({ id: 'x', da: { fisicos: [1, 2], libros: [1, 2] } }, A, P), 110, 'el digital de regalo no infla el ahorro');
  assert.equal(t({ id: 'x', da: { horas: 4, horas_tipo: 'general' } }, A, P), 180);
  assert.equal(t({ id: 'x', da: { cursos: ['preuda'], dias: 90, libros: [1] } }, A, P), 0);
  assert.equal(t({ id: 'x', da: { fisicos: [1] } }, A, P), 0);
});

// ---- tienda viva (spec 2026-11-24-tienda-viva) ----
test('el morral propone el juego solo si de verdad sale mejor que lo suelto', () => {
  const m = f('tiendaMejora'), L = (id, n, p) => ({ id, tipo: 'fisico', precio: p, da: { fisicos: [n] } });
  const arts = [L('a', 1, 60), L('b', 2, 50), { id: 'j', tipo: 'fisico', precio: 90, da: { fisicos: [1, 2], libros: [1, 2] } }, { id: 'p', tipo: 'paquete', precio: 10, da: { cursos: ['x'], fisicos: [1, 2] } }, { id: 'd', tipo: 'digital', precio: 5, da: { libros: [1] } }];
  const it = (...ids) => ids.map(id => ({ id, cantidad: 1 }));
  const r = m(it('a', 'b'), arts, false);
  assert.equal(r.a.id, 'j'); assert.equal(r.quita.join(), 'a,b'); assert.equal(r.ahorro, 20);
  assert.equal(m(it('a'), arts, false), null); assert.equal(m(it('a', 'b', 'j'), arts, false), null, 'ya lo lleva');
  assert.equal(m(it('a', 'b'), arts.map(x => (x.id === 'j' ? { ...x, precio: 200 } : x)), false), null, 'más caro no se propone');
});
test('la rueda no se sale y el reloj cae en la opción más cercana', () => {
  const c = f('tiendaCerca'), h = f('tiendaHoraCerca');
  assert.equal([c(-.6, 5), c(1.6, 5), c(9, 5)].join(), '0,2,4');
  assert.equal([h(.5, [1, 4, 8]), h(3, [1, 4, 8]), h(6.5, [1, 4, 8]), h(12, [1, 4, 8])].join(), '0,1,2,2');
});
test('añadir no redibuja la página y todo se puede hacer sin arrastrar', () => {
  const s = read('js/tienda.js');
  for (const k of ['data-ctl', 'tiendaRefresca', 'data-bolsa', 'ArrowRight', 'data-hora', 'aria-valuetext']) assert.ok(s.includes(k), k);
  assert.match(read('css/tienda.css'), /prefers-reduced-motion: reduce\) \{ \.vt-fondo/);
});
