// Tienda: pestaña con el catálogo (cursos, paquetes, libros, asesorías) y mis pedidos (spec 2026-11-24-tienda-libros). El
// pedido (dirección, total y pago) se hace en una capa propia (#tienda) sobre la app.
// El precio lo pone la base al crear el pedido (crear_pedido); aquí solo se muestra. Se paga por fuera y el administrador
// confirma en el panel.

// ---------- lógica pura ----------
const tiendaPrecio = (a, conPlan) => (conPlan && a.precio_plan != null ? a.precio_plan : a.precio);
const tiendaFisicos = (items, arts) => items.reduce((t, x) => t + ((arts.find(a => a.id === x.id) || { da: {} }).da.fisicos || []).length * x.cantidad, 0);
// Cuentas del carrito: { subtotal, fisicos, envio, total }. `items`: [{ id, cantidad }].
function tiendaCuenta(items, arts, conPlan, zona) {
  const subtotal = items.reduce((t, x) => { const a = arts.find(y => y.id === x.id); return t + (a ? tiendaPrecio(a, conPlan) || 0 : 0) * x.cantidad; }, 0);
  const fisicos = tiendaFisicos(items, arts), envio = fisicos && zona ? zona.precio * Math.ceil(fisicos / 8) : 0;
  return { subtotal, fisicos, envio, total: subtotal + envio };
}
const PEDIDO_ESTADO = { pendiente: ['warn', 'Por pagar'], pagado: ['ok', 'Pagado'], preparando: ['ok', 'En preparación'], enviado: ['ok', 'Enviado'], entregado: ['ok', 'Entregado'], cancelado: ['', 'Cancelado'] };
const pedidoTexto = p => `Hola, hice el pedido ${p.id} en Zuka: ${p.items.map(x => `${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${x.nombre}`).join(', ')}. Total: ${cop(p.total)}${p.envio ? ` (incluye envío a ${p.direccion.ciudad})` : ''}.${p.codigo ? ` Mi código es ${muestraCodigo(p.codigo)}.` : ''}`;
const direccionError = d => [['nombre', 'Escribe quién recibe.'], ['telefono', 'Escribe el celular de quien recibe.'], ['departamento', 'Escribe el departamento.'], ['ciudad', 'Escribe la ciudad o el municipio.'], ['direccion', 'Escribe la dirección.']]
  .map(([campo, texto]) => (String(d[campo] || '').trim() ? null : { campo, texto })).find(Boolean) || null;

// ---------- datos ----------
// Tienda.* se llena al entrar (artículos, envíos y libros son públicos; lo demás es de la cuenta).
const Tienda = { arts: [], envios: [], libros: [], mios: [], saldo: { general: 0, universidad: 0, grupo: 0 }, pedidos: [], carro: {}, vista: 'todo', cargada: false };
async function tiendaCarga() {
  if (!Cuenta.sb) return false;
  const [a, e, l] = await Promise.all([Cuenta.sb.from('articulos').select('*'), Cuenta.sb.from('envios').select('*'), Cuenta.sb.from('libros').select('*')]);
  if (a.error || e.error || l.error) return false;
  const orden = (x, y) => x.orden - y.orden;
  Tienda.libros = l.data.sort((x, y) => x.id - y.id);
  // Lo digital no se vende hasta que sus libros estén subidos y publicados.
  const listo = x => (x.da.libros || []).every(id => Tienda.libros.some(b => b.id === id && libroListo(b)));
  Tienda.arts = a.data.filter(x => x.activo && x.precio != null && listo(x)).sort(orden);
  Tienda.envios = e.data.filter(x => x.activo).sort(orden);
  Tienda.cargada = true;
  return tiendaMios();
}
async function tiendaMios() {
  if (!Cuenta.sb || !Cuenta.user) { Tienda.mios = []; Tienda.pedidos = []; return true; }
  const uid = Cuenta.user.id;
  const [m, s, p] = await Promise.all([Cuenta.sb.from('libros_acceso').select('libro,hasta').eq('usuario', uid), Cuenta.sb.rpc('mi_saldo'), Cuenta.sb.from('pedidos').select('*').eq('usuario', uid)]);
  if (!Cuenta.user || Cuenta.user.id !== uid) return false;
  if (m.data) Tienda.mios = m.data.filter(x => vigente(x.hasta, Date.now()));
  if (s.data) Tienda.saldo = s.data;
  if (p.data) Tienda.pedidos = p.data.sort((x, y) => y.id - x.id);
  return true;
}
const libroMio = id => cuentaEsAdmin() || Tienda.mios.some(x => x.libro === id);
const libroListo = l => l.publicado && l.version > 0 && l.paginas > 0;
const conPlan = () => tienePago(Cuenta.accesos);
const carroItems = () => Object.entries(Tienda.carro).filter(([id]) => Tienda.arts.some(a => a.id === id)).map(([id, cantidad]) => ({ id, cantidad }));

// ---------- pestaña ----------
function tiendaAtras() {   // botón atrás (js/back.js): cierra el libro o el pedido
  if (sheetIsOpen || dialogOpen()) return false;
  if (lectorAtras()) return true;
  const el = $('#tienda');
  if (!el) return false;
  if (el.dataset.paso !== 'enviando') { tiendaCerrar(); if (tab === 'tienda') tiendaPinta(); }   // enviando: se está creando el pedido
  return true;
}
function tiendaCerrar() { const el = $('#tienda'); if (!el) return; el.remove(); tiendaInerte(false); }
function tiendaInerte(on) { ['#topbar', '#view', '#tabbar'].forEach(s => { const x = $(s); if (x) x.inert = on; }); }
function openTienda(vista = 'todo') {
  closeSheet(false); tiendaCerrar();
  Tienda.vista = vista;
  go('tienda'); view.scrollTop = 0;
}
// La pinta go('tienda'); los datos se ponen al día cada vez que se entra.
function renderTienda() {
  tiendaPinta('', false);
  tiendaCarga().catch(() => false).then(ok => {
    if (tab !== 'tienda' || lector || $('#tienda')) return;
    if (ok || Tienda.cargada) tiendaPinta('', false);
    else {
      $('.td-in', view).innerHTML = '<p class="td-vacio">No se pudo cargar la tienda. Revisa tu conexión.</p><button class="btn ghost td-otra" type="button">Reintentar</button>';
      $('.td-otra', view).onclick = renderTienda;
    }
  });
}
const tiendaPortada = (id, cls = '') => `<img class="td-portada ${cls}" src="brand/libros/${id}.webp" alt="" width="180" height="255" loading="lazy">`;
// Las horas son para cursos comprados: se venden a quien tiene uno o lo lleva en el mismo pedido.
const tiendaHorasOk = () => conPlan() || cuentaEsAdmin() || carroItems().some(x => (Tienda.arts.find(a => a.id === x.id).da.cursos || []).length);
const tiendaBoton = a => `<span class="td-ctl" data-ctl="${esc(a.id)}">${tiendaBotonIn(a)}</span>`;
function tiendaBotonIn(a) {
  const n = Tienda.carro[a.id] || 0;
  if (a.tipo === 'asesoria' && !n && !tiendaHorasOk()) return '<small class="td-plan td-solo">Con un curso comprado</small>';
  if (!n) return `<button class="btn sm main brand" type="button" data-mas="${a.id}">Añadir<span class="td-sr"> ${esc(a.nombre)}</span></button>`;
  return a.tipo === 'fisico' || a.tipo === 'asesoria'
    ? `<span class="td-cant" role="group" aria-label="Cantidad de ${esc(a.nombre)}"><button type="button" data-menos="${a.id}" aria-label="Quitar uno">−</button><b>${n}</b><button type="button" data-mas="${a.id}" aria-label="Añadir uno"${n >= 10 ? ' disabled' : ''}>+</button></span>`
    : `<button class="btn sm ghost" type="button" data-menos="${a.id}">Quitar</button>`;
}
function tiendaPrecioHTML(a) {
  const p = tiendaPrecio(a, conPlan());
  return `<strong class="td-precio">${p !== a.precio ? `<s>${cop(a.precio)}</s> ` : ''}${cop(p)}</strong>${a.precio_plan != null && !conPlan() ? `<small class="td-plan">${cop(a.precio_plan)} si ya tienes plan</small>` : ''}`;
}
const tiendaDe = tipo => Tienda.arts.filter(a => a.tipo === tipo);
const tiendaPal = id => (typeof ART_PAL !== 'undefined' && ART_PAL[id]) || { blue: '#4f7cff', deep: '#24419c', soft: '#9db7ff', pale: '#dbe5ff', sun: '#6fd3ff' };
const tiendaColor = id => { const p = tiendaPal(id); return `--a:${p.blue};--b:${p.deep};--d:${p.soft};--e:${p.sun};--f:${p.pale}`; };
// Lo que costaría por separado lo que trae un paquete o un juego (0 si algo no se vende suelto): el ahorro es de verdad.
function tiendaSuelto(a, arts, productos) {
  const d = a.da || {}, uno = (tipo, k, id) => (arts.find(x => x.id !== a.id && x.tipo === tipo && ((x.da || {})[k] || []).length === 1 && x.da[k][0] === id) || {}).precio;
  const partes = [...(d.cursos || []).map(c => (productos || []).filter(p => p.curso === c && p.activo && p.dias === d.dias).map(p => p.precio)[0]),
    ...(d.fisicos || []).map(i => uno('fisico', 'fisicos', i)),
    // Los digitales que acompañan a los mismos impresos van de regalo: no se cuentan.
    ...((d.fisicos || []).length ? [] : (d.libros || []).map(i => uno('digital', 'libros', i))),
    ...(d.horas ? [((arts.find(x => x.id !== a.id && x.tipo === 'asesoria' && x.da.horas === 1 && x.da.horas_tipo === d.horas_tipo) || {}).precio || NaN) * d.horas] : [])];
  return partes.length > 1 || (d.horas > 1) ? (partes.every(Number.isFinite) ? partes.reduce((x, y) => x + y, 0) : 0) : 0;
}
const tiendaAhorro = a => Math.max(0, tiendaSuelto(a, Tienda.arts, Cuenta.productos) - tiendaPrecio(a, conPlan()));
const tiendaAhorroHTML = a => { const n = tiendaAhorro(a); return n >= 1000 ? `<span class="td-ahorro">Ahorras ${cop(n)}</span>` : ''; };
const tiendaCheck = xs => `<ul class="td-check">${xs.filter(Boolean).map(x => `<li>${ICON.check}<span>${x}</span></li>`).join('')}</ul>`;
// Pila de libros en perspectiva.
const tiendaPila = ids => `<span class="td-pila" aria-hidden="true">${ids.map((id, i) => `<span class="td-tomo" style="--i:${i - (ids.length - 1) / 2}">${tiendaPortada(id)}</span>`).join('')}</span>`;

// Paquete: banda de color con lo que trae, lista y precio con su ahorro.
function tiendaPaqHTML(a) {
  const d = a.da || {}, cs = (d.cursos || []).map(id => COURSES.find(c => c.id === id)).filter(Boolean), meses = Math.round((d.dias || 0) / 30);
  return `<article class="td-paq${a.destacado ? ' top' : ''}${Tienda.carro[a.id] ? ' on' : ''}" data-art="${esc(a.id)}" data-lleva="${esc(a.id)}" style="${tiendaColor((cs[0] || {}).id)}">
    <div class="td-escena${(d.libros || d.fisicos || []).length ? '' : ' luz'}">${a.destacado ? '<span class="td-top">Recomendado</span>' : ''}${tiendaAhorroHTML(a)}
      <span class="td-artes">${(d.libros || d.fisicos || []).length ? tiendaPila(d.libros || d.fisicos) : cs.map(c => courseArt(c, 'xl')).join('')}</span></div>
    <div class="td-cont"><h3>${esc(a.nombre)}</h3>
      ${tiendaCheck([...cs.map(c => `${esc(c.name)}${meses ? `, ${mesesTexto(meses)}` : ''}`), (d.fisicos || []).length && `${d.fisicos.length} ${d.fisicos.length === 1 ? 'libro impreso' : 'libros impresos'} a color, en tu casa`,
    (d.libros || []).length && `${d.libros.length} ${d.libros.length === 1 ? 'libro digital' : 'libros digitales'} para leer en la app`, d.horas && `${d.horas === 1 ? '1 hora' : `${d.horas} horas`} de asesoría`])}
      <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></div></article>`;
}
// Curso: su figura en grande sobre su color, qué trae y el tiempo, que se elige en la misma tarjeta.
function tiendaCursoHTML(c) {
  const a = accesoCurso(Cuenta.accesos, c.id), ps = productosDe(c.id), sel = ps.find(p => p.id === (Tienda.plan || {})[c.id]) || ps[ps.length - 1];
  const ex = c.units.reduce((t, u) => t + u.lessons.reduce((n, l) => n + l.ex.length, 0), 0), tiene = a.estado === 'pago' || a.estado === 'vencido';
  return `<article class="td-curso" data-curso="${esc(c.id)}" style="--c:${c.color};${tiendaColor(c.id)}"><div class="td-escena luz">${accesoPill(a)}<span class="td-artes">${courseArt(c, 'xl')}</span></div>
    <div class="td-cont"><h3>${esc(c.name)}</h3><p>${esc(c.tagline || '')}</p>
      <p class="td-datos"><span><b>${c.units.length}</b> ${c.units.length === 1 ? 'mundo' : 'mundos'}</span><span><b>${lessonsOf(c).length}</b> lecciones</span><span><b>${ex}</b> ejercicios</span></p>
      <div class="td-mundos" tabindex="0" role="group" aria-label="Mundos de ${esc(c.name)}">${c.units.slice(0, 14).map(u => { const w = WORLDS[u.world] || { name: u.title }; return `<figure><span class="world-art" aria-hidden="true">${w.art || ''}</span><figcaption>${esc(w.name)}</figcaption></figure>`; }).join('')}${c.units.length > 14 ? `<p>y ${c.units.length - 14} más</p>` : ''}</div>
      ${ps.length > 1 ? `<div class="td-dur" role="radiogroup" aria-label="Duración de ${esc(c.name)}">${ps.map(p => `<button type="button" role="radio" aria-checked="${p === sel}" data-dur="${esc(p.id)}" data-de="${esc(c.id)}">${mesesTexto(p.meses)}</button>`).join('')}</div>` : ''}
      <div class="td-pie"><span><strong class="td-precio" data-v-precio="${sel && sel.precio != null ? sel.precio : ''}">${sel && sel.precio != null ? cop(sel.precio) : 'Por WhatsApp'}</strong><small class="td-plan">${!sel ? '' : sel.precio != null && sel.meses > 1 ? `${mesesTexto(sel.meses)} · ${cop(sel.precio / sel.meses)} al mes` : mesesTexto(sel.meses)}</small></span>
        <button class="btn ${a.estado === 'pago' ? 'ghost' : 'main brand'}" type="button" data-compra="${esc(c.id)}">${tiene ? 'Renovar' : 'Comprar'}</button></div></div></article>`;
}
const tiendaJuegos = tipo => tiendaDe(tipo).filter(a => ((tipo === 'fisico' ? a.da.fisicos : a.da.libros) || []).length > 1);
// Juego de libros: banda ancha con los tomos abiertos en abanico.
const tiendaJuegoHTML = a => `<article class="td-banda${Tienda.carro[a.id] ? ' on' : ''}" data-art="${esc(a.id)}" data-lleva="${esc(a.id)}" style="${tiendaColor('preuda')}"><div class="td-cont"><span class="td-tipo">${a.tipo === 'fisico' ? 'Impresos, con envío' : 'Digitales, en la app'}</span><h3>${esc(a.nombre)}</h3><p>${esc(a.detalle)}</p>${tiendaAhorroHTML(a)}
  <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></div><div class="td-escena">${tiendaPila(Tienda.libros.map(l => l.id))}</div></article>`;
function tiendaLibroHTML(l) {
  const suelto = (tipo, k) => tiendaDe(tipo).find(a => (a.da[k] || []).length === 1 && a.da[k][0] === l.id);
  const fs = [['fisico', 'Impreso', suelto('fisico', 'fisicos')], ['digital', 'Digital', suelto('digital', 'libros')]].filter(x => x[2]), f = fs.find(x => x[0] === (Tienda.fmt || {})[l.id]) || fs[0];
  const ver = libroListo(l) || cuentaEsAdmin();
  return `<article class="td-libro" data-libro="${l.id}"${f ? ` data-art="${esc(f[2].id)}"` : ''}><div class="td-escena">${tiendaTomo3D(l)}<small class="td-gira" aria-hidden="true">Arrastra para girarlo</small></div><div class="td-cont"><span class="td-tipo">${esc(l.subtitulo)}</span><h3>${esc(l.titulo)}</h3><p>${l.paginas ? `${l.paginas} páginas a color` : ''}</p>
    ${ver ? `<button class="btn sm ${libroMio(l.id) ? 'main brand' : 'ghost'}" type="button" data-leer="${l.id}"${l.version ? '' : ' disabled'}>${libroMio(l.id) ? 'Leer' : 'Ver muestra'}</button>` : ''}
    ${fs.length > 1 ? `<div class="td-dur" role="radiogroup" aria-label="Formato de ${esc(l.titulo)}">${fs.map(x => `<button type="button" role="radio" aria-checked="${x === f}" tabindex="${x === f ? 0 : -1}" data-fmt="${x[0]}" data-de="${l.id}">${x[1]}</button>`).join('')}</div>` : ''}
    ${f ? `<div class="td-pie"><span>${fs.length > 1 ? '' : `<small class="td-tipo">${f[1]}</small>`}${tiendaPrecioHTML(f[2])}</span>${tiendaBoton(f[2])}</div>` : ''}</div></article>`;
}
// Libro en tres dimensiones: tapa, lomo, hojas y contratapa; gira con --g.
const tiendaTomo3D = l => `<span class="lb3" data-gira aria-hidden="true"><span class="lb3-in"><span class="lb3-t">${tiendaPortada(l.id)}</span><span class="lb3-l"><i>${esc(l.titulo)}</i></span><span class="lb3-h"></span><span class="lb3-c"><i>ZUKA</i></span></span></span>`;
// Asesoría: las horas en grande y cuánto sale cada una.
function tiendaHoraHTML(a) {
  const h = a.da.horas || 1, p = tiendaPrecio(a, conPlan());
  return `<article class="td-hora${a.destacado ? ' top' : ''}${Tienda.carro[a.id] ? ' on' : ''}" data-art="${esc(a.id)}">${a.destacado ? '<span class="td-top">Recomendado</span>' : ''}
    <div class="td-reloj" aria-hidden="true" style="--h:${Math.min(8, h)}"><b>${h}</b><small>${h === 1 ? 'hora' : 'horas'}</small></div>
    <h3>${esc(a.nombre)}</h3><p>${esc(a.detalle)}</p><small class="td-plan">${h > 1 ? `${cop(p / h)} por hora` : ''}</small>${tiendaAhorroHTML(a)}
    <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></article>`;
}
const tiendaSec = (t, html, v = '', sub = '') => (html ? `<section><div class="td-tit"><div><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${v ? `<button class="link-btn" type="button" data-v="${v}">Ver todo</button>` : ''}</div>${html}</section>` : '');
const tiendaLista = (cls, html) => (html ? `<div class="${cls}">${html}</div>` : '');
const tiendaCursosHTML = () => tiendaLista('td-cursos', cursosVisibles().map(tiendaCursoHTML).join(''));

// ---------- vitrina: los productos en una rueda que se desliza ----------
// Qué sale y en qué orden: el Preuniversitario si no lo tiene, los paquetes, el juego impreso, los demás cursos y las horas.
function tiendaVitrinaItems() {
  const cs = cursosVisibles(), arts = tiendaDe('paquete').concat(tiendaJuegos('fisico')), curso1 = c => {
    const pr = productosDe(c.id).filter(p => p.precio != null).sort((x, y) => x.precio / x.meses - y.precio / y.meses)[0];
    return { k: 'curso', id: c.id, pal: c.id, t: c.name, p: c.tagline || '', fig: courseArt(c, 'xl'), precio: pr ? pr.precio / pr.meses : null, nota: pr ? `al mes, en el plan de ${mesesTexto(pr.meses)}` : '', desde: !!pr };
  };
  const noTiene = cs.filter(c => !comprado(Cuenta.accesos, c.id, true)), primero = noTiene.filter(c => c.id === 'preuda'), otros = noTiene.filter(c => c.id !== 'preuda');
  const libros = ids => tiendaPila(ids.slice(0, 4));
  const art = a => { const c = cs.find(x => x.id === (a.da.cursos || [])[0]), ids = a.da.fisicos || a.da.libros || []; return { k: 'art', id: a.id, a, pal: (c || { id: 'preuda' }).id, t: a.nombre, p: a.detalle, fig: ids.length ? libros(ids) + (c ? `<span class="vt-mini">${courseArt(c, 'xl')}</span>` : '') : (a.da.cursos || []).map(id => cs.find(x => x.id === id)).filter(Boolean).map(x => courseArt(x, 'xl')).join(''), precio: tiendaPrecio(a, conPlan()), nota: '' }; };
  const A = arts.map(art), B = otros.map(curso1), mez = [];   // intercalados: el color cambia de uno a otro
  for (let i = 0; i < Math.max(A.length, B.length); i++) mez.push(...[B[i], A[i]].filter(Boolean));
  return [...primero.map(curso1), ...mez].slice(0, 9);
}
// Índice más cercano de una rueda que no da la vuelta. Pura.
const tiendaCerca = (x, n) => Math.max(0, Math.min(n - 1, Math.round(x)));
function tiendaHeroHTML() {
  const xs = tiendaVitrinaItems();
  if (!xs.length) return '';
  return `<section class="td-hero vt" aria-roledescription="carrusel" aria-label="Destacados"><div class="vt-fondo"></div><div class="vt-rueda" tabindex="0" role="group" aria-label="Desliza o usa las flechas">${xs.map((x, i) => `<div class="vt-it" data-i="${i}" style="${tiendaColor(x.pal)}"><div class="vt-cart">${x.fig}</div><span class="vt-piso"></span></div>`).join('')}</div>
    <div class="vt-txt" aria-live="polite"></div>
    <button class="vt-fl ant" type="button" aria-label="Anterior">${ICON.back}</button><button class="vt-fl sig" type="button" aria-label="Siguiente">${ICON.right}</button>
    <div class="vt-ptos">${xs.map((x, i) => `<button type="button" data-pto="${i}" aria-label="${esc(x.t)}"></button>`).join('')}</div></section>`;
}
function tiendaVitrinaViva(el) {
  const h = $('.vt', el); if (!h) return;
  const xs = tiendaVitrinaItems(), rueda = $('.vt-rueda', h), its = [...h.querySelectorAll('.vt-it')], txt = $('.vt-txt', h), n = its.length, quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let p = tiendaCerca(Tienda.vt || 0, n), meta = p, sel = -1, raf = 0, id = null, x0 = 0, y0 = 0, p0 = 0, movio = false;
  const info = i => {
    if (i === sel) return;
    sel = Tienda.vt = i; const x = xs[i];
    txt.innerHTML = `<h2>${esc(x.t)}</h2><p>${esc(x.p)}</p><div class="vt-acc">${x.precio != null ? `<span>${x.desde ? '<small>Desde</small>' : ''}<strong>${cop(x.precio)}</strong>${x.nota ? `<small>${x.nota}</small>` : ''}</span>` : ''}${x.k === 'curso' ? `<button class="btn main" type="button" data-compra="${esc(x.id)}">Comprar</button>` : tiendaBoton(x.a)}</div>${x.a ? tiendaAhorroHTML(x.a) : ''}`;
    h.style.cssText = tiendaColor(x.pal);
    h.querySelectorAll('[data-pto]').forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    $('.ant', h).disabled = i === 0; $('.sig', h).disabled = i === n - 1;
  };
  const pinta = () => {
    its.forEach((e, i) => { const d = i - p, a = Math.abs(d); e.style.transform = `translateX(${(d * 72).toFixed(1)}%) translateZ(${(-a * 130).toFixed(0)}px) rotateY(${(Math.max(-1, Math.min(1, d)) * -32).toFixed(1)}deg)`; e.style.opacity = Math.max(0, 1 - Math.max(0, a - .4) * .42).toFixed(2); e.style.zIndex = 20 - Math.round(a * 4); e.style.visibility = a > 2.6 ? 'hidden' : ''; });
    info(tiendaCerca(p, n));
  };
  const anda = () => { raf = 0; if (!h.isConnected) return; p += (meta - p) * .16; if (Math.abs(meta - p) < .002) p = meta; else raf = requestAnimationFrame(anda); pinta(); };
  const va = i => { meta = Math.max(0, Math.min(n - 1, i)); if (quieto) { p = meta; pinta(); } else if (!raf) raf = requestAnimationFrame(anda); };
  rueda.onpointerdown = e => { if (e.button) return; id = e.pointerId; x0 = e.clientX; y0 = e.clientY; p0 = p; movio = false; };
  rueda.onpointermove = e => {
    if (e.pointerId !== id) return;
    if (!e.buttons) return suelta(e);
    if (!movio && Math.abs(e.clientX - x0) > 7) { movio = true; rueda.setPointerCapture(id); h.classList.add('mano'); cancelAnimationFrame(raf); raf = 0; }
    if (movio) { p = meta = Math.max(-.35, Math.min(n - .65, p0 - (e.clientX - x0) / (its[0].offsetWidth * .72))); pinta(); }
  };
  const suelta = e => { if (e.pointerId !== id) return; id = null; h.classList.remove('mano'); if (movio) va(tiendaCerca(p + Math.max(-.35, Math.min(.35, (x0 - e.clientX) / 260)), n)); };
  rueda.onpointerup = suelta; rueda.onpointercancel = suelta;
  rueda.onclick = e => { if (movio) { movio = false; return; } const it = e.target.closest('.vt-it'); if (it) va(+it.dataset.i); };
  rueda.onkeydown = e => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); va(tiendaCerca(meta, n) + d); } };
  $('.ant', h).onclick = () => va(tiendaCerca(meta, n) - 1); $('.sig', h).onclick = () => va(tiendaCerca(meta, n) + 1);
  h.querySelectorAll('[data-pto]').forEach(b => { b.onclick = () => va(+b.dataset.pto); });
  pinta();
}

// ---------- horas: el reloj se gira para elegir cuántas ----------
const tiendaHorasGen = () => tiendaDe('asesoria').filter(a => a.da.horas_tipo === 'general' && a.da.horas <= 12).sort((x, y) => x.da.horas - y.da.horas);
// La opción cuyas horas quedan más cerca. Pura.
const tiendaHoraCerca = (h, ops) => ops.reduce((m, o, i) => (Math.abs(o - h) < Math.abs(ops[m] - h) ? i : m), 0);
function tiendaDialHTML() {
  const ops = tiendaHorasGen();
  if (ops.length < 2) return tiendaLista('td-horas', tiendaDe('asesoria').map(tiendaHoraHTML).join(''));
  const i = Math.max(0, ops.findIndex(a => a.id === Tienda.dial) >= 0 ? ops.findIndex(a => a.id === Tienda.dial) : ops.findIndex(a => a.destacado)), a = ops[i], h = a.da.horas, p = tiendaPrecio(a, conPlan());
  return `<div class="td-dialc" data-art="${esc(a.id)}"><div class="td-dial" role="slider" tabindex="0" aria-label="Horas de asesoría" aria-valuemin="${ops[0].da.horas}" aria-valuemax="${ops[ops.length - 1].da.horas}" aria-valuenow="${h}" aria-valuetext="${h} ${h === 1 ? 'hora' : 'horas'}, ${cop(p)}" style="--f:${h / 12}">
      <svg viewBox="0 0 220 220" aria-hidden="true">${Array.from({ length: 12 }, (_, k) => { const t = (k + 1) * Math.PI / 6, r = ops.some(o => o.da.horas === k + 1); return `<circle class="${r ? 'op' : ''}${k + 1 <= h ? ' ll' : ''}" cx="${110 + 86 * Math.sin(t)}" cy="${110 - 86 * Math.cos(t)}" r="${r ? 9 : 4}"/>`; }).join('')}<circle class="riel" cx="110" cy="110" r="86" pathLength="12"/><circle class="arco" cx="110" cy="110" r="86" pathLength="12" style="stroke-dasharray:${h} 12"/><g class="ag" style="transform:rotate(${h * 30}deg)"><path d="M110 110V44"/><circle cx="110" cy="24" r="15"/></g></svg>
      <div class="td-dial-n"><b>${h}</b><small>${h === 1 ? 'hora' : 'horas'}</small></div></div>
    <div class="td-dial-t"><h3>${esc(a.nombre)} con un profe</h3><p>${esc(a.detalle)}</p>
      <div class="td-dur" role="radiogroup" aria-label="Cuántas horas">${ops.map(o => `<button type="button" role="radio" aria-checked="${o === a}" tabindex="${o === a ? 0 : -1}" data-hora="${esc(o.id)}">${o.da.horas} h</button>`).join('')}</div>
      ${h > 1 ? `<p class="td-cada"><b>${cop(p / h)}</b> cada hora</p>` : ''}${tiendaAhorroHTML(a)}<div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></div></div>
    ${tiendaLista('td-horas', tiendaDe('asesoria').filter(x => !ops.includes(x)).map(tiendaHoraHTML).join(''))}`;
}
function tiendaDialVivo(el) {
  const d = $('.td-dial', el); if (!d) return;
  const ops = tiendaHorasGen(), hs = ops.map(o => o.da.horas), i0 = hs.indexOf(+d.getAttribute('aria-valuenow'));
  const pon = (i, foco) => { const k = Math.max(0, Math.min(ops.length - 1, i)); if (ops[k].id === (Tienda.dial || ops[i0].id) && k === i0) return; Tienda.dial = ops[k].id; const c = $('.td-dialhueco', el); c.innerHTML = tiendaDialHTML(); tiendaDialVivo(el); tiendaLigaRadios(c); if (foco) $(foco, c)?.focus({ preventScroll: true }); };
  d.onkeydown = e => { const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]; if (k) { e.preventDefault(); pon(i0 + k, '.td-dial'); } };
  let id = null; const ag = $('.ag', d);
  const hora = e => { const r = d.getBoundingClientRect(); let t = Math.atan2(e.clientX - r.left - r.width / 2, r.top + r.height / 2 - e.clientY) / Math.PI * 6; if (t <= .4) t += 12; return t; };
  d.onpointerdown = e => { if (e.button) return; id = e.pointerId; d.setPointerCapture(id); d.classList.add('mano'); d.onpointermove(e); };
  d.onpointermove = e => { if (e.pointerId !== id) return; const t = hora(e); ag.style.transform = `rotate(${t * 30}deg)`; $('.arco', d).style.strokeDasharray = `${t} 12`; const h = hs[tiendaHoraCerca(t, hs)]; $('.td-dial-n b', d).textContent = h; $('.td-dial-n small', d).textContent = h === 1 ? 'hora' : 'horas'; };
  const fin = e => { if (e.pointerId !== id) return; id = null; d.classList.remove('mano'); const k = e.type === 'pointerup' ? tiendaHoraCerca(hora(e), hs) : i0; if (k !== i0) return pon(k); ag.style.transform = `rotate(${hs[i0] * 30}deg)`; $('.arco', d).style.strokeDasharray = `${hs[i0]} 12`; $('.td-dial-n b', d).textContent = hs[i0]; };
  d.onpointerup = fin; d.onpointercancel = fin;
  d.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
}

// ---------- morral: lo que se lleva ----------
// ¿Sale mejor un juego o paquete que lo que lleva suelto? El que más ahorra: { a, quita: [ids], ahorro } o null. Pura.
function tiendaMejora(items, arts, conPlan) {
  const de = id => arts.find(a => a.id === id), sueltos = items.map(x => ({ ...x, a: de(x.id) })).filter(x => x.a);
  let mejor = null;
  for (const a of arts) {
    const d = a.da || {}, k = (d.fisicos || []).length > 1 ? 'fisicos' : (d.libros || []).length > 1 ? 'libros' : '';
    if (!k || (d.cursos || []).length || d.horas || sueltos.some(x => x.id === a.id)) continue;
    const usa = d[k].map(n => sueltos.find(x => (x.a.da[k] || []).length === 1 && x.a.da[k][0] === n && !(x.a.da.cursos || []).length && x.a.tipo === a.tipo));
    if (usa.some(x => !x)) continue;
    const ahorro = usa.reduce((t, x) => t + tiendaPrecio(x.a, conPlan), 0) - tiendaPrecio(a, conPlan);
    if (ahorro > 0 && (!mejor || ahorro > mejor.ahorro)) mejor = { a, quita: usa.map(x => x.id), ahorro };
  }
  return mejor;
}
const tiendaMini = a => { const d = a.da || {}, id = (d.fisicos || d.libros || [])[0], c = (d.cursos || [])[0]; return id ? tiendaPortada(id) : c && typeof courseArt === 'function' ? courseArt({ id: c }, 'md') : `<b>${d.horas || 1} h</b>`; };
const TD_MORRAL = '<svg class="td-morral" viewBox="0 0 64 64" aria-hidden="true"><path class="a" d="M22 16a10 10 0 0 1 20 0"/><path class="b" d="M12 30a16 16 0 0 1 16-16h8a16 16 0 0 1 16 16v22a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z"/><path class="c" d="M20 38h24v14a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3z"/><path class="d" d="M20 44h24M32 42v5"/></svg>';
function tiendaCarroHTML() {
  const items = carroItems(), n = items.reduce((t, x) => t + x.cantidad, 0), k = tiendaCuenta(items, Tienda.arts, conPlan()), ver = Tienda.vista !== 'pedidos';
  if (!ver || !Tienda.cargada) return '';
  const abierto = n && Tienda.abierto, m = tiendaMejora(items, Tienda.arts, conPlan());
  return `<footer class="td-carro${n ? '' : ' vacio'}${abierto ? ' abierto' : ''}">
    ${abierto ? `<div class="td-dentro"><ul>${items.map(x => { const a = Tienda.arts.find(y => y.id === x.id); return `<li><span class="td-mi">${tiendaMini(a)}</span><span class="td-mn">${esc(a.nombre)}<small>${cop(tiendaPrecio(a, conPlan()) * x.cantidad)}</small></span>${tiendaBoton(a)}</li>`; }).join('')}</ul>
      ${m ? `<p class="td-mejora"><span>Te sale mejor <b>${esc(m.a.nombre)}</b>: ahorras ${cop(m.ahorro)}.</span><button class="btn sm main brand" type="button" data-cambia="${esc(m.a.id)}">Cambiar</button></p>` : ''}</div>` : ''}
    <button class="td-bolsa" type="button" data-bolsa aria-expanded="${!!abierto}"${n ? '' : ' disabled'} aria-label="${n ? `${abierto ? 'Cerrar' : 'Ver'} tu morral, ${n} ${n === 1 ? 'artículo' : 'artículos'}` : 'Tu morral está vacío'}">${TD_MORRAL}${n ? `<b class="td-n">${n}</b>` : ''}</button>
    <span class="td-tot">${n ? `<small>${n} ${n === 1 ? 'artículo' : 'artículos'}${k.fisicos ? ' · envío aparte' : ''}</small><b>${cop(k.subtotal)}</b>` : '<small>Arrastra aquí lo que quieras llevar, o tócalo para añadirlo</small>'}</span>
    ${n ? '<button class="btn main brand" type="button" data-td="pedir">Continuar</button>' : ''}</footer>`;
}
// Suma o resta sin redibujar la página: cambia los huecos de ese artículo, las horas y el morral.
function tiendaCambia(id, delta, desde) {
  const a = Tienda.arts.find(x => x.id === id); if (!a) return;
  if (delta > 0 && a.tipo === 'asesoria' && !Tienda.carro[id] && !tiendaHorasOk()) return toast('Las asesorías son para cursos comprados. Añade primero un curso o un paquete.');
  const n = Math.max(0, Math.min(a.tipo === 'fisico' || a.tipo === 'asesoria' ? 10 : 1, (Tienda.carro[id] || 0) + delta));
  if (n === (Tienda.carro[id] || 0)) return;
  if (n) Tienda.carro[id] = n; else delete Tienda.carro[id];
  if (!carroItems().length) Tienda.abierto = false;
  if (delta > 0) tiendaVuela(a, desde);
  tiendaRefresca(delta > 0);
}
function tiendaRefresca(suma = false) {
  const act = document.activeElement, hueco0 = act?.closest?.('[data-ctl]'), foco = act?.dataset && (act.dataset.mas || act.dataset.menos), enCarro = act?.closest?.('.td-carro'), bolsa = act?.hasAttribute?.('data-bolsa');
  view.querySelectorAll('[data-art]').forEach(x => x.classList.toggle('on', !!Tienda.carro[x.dataset.art]));
  const hueco = $('.td-carrohueco', view); hueco.innerHTML = tiendaCarroHTML();
  view.querySelectorAll('[data-ctl]').forEach(x => { const a = Tienda.arts.find(y => y.id === x.dataset.ctl); if (a) x.innerHTML = tiendaBotonIn(a); });
  if (suma) { const b = $('.td-bolsa', hueco); b?.classList.add('salta'); }
  if (foco) { (enCarro ? hueco.querySelector(`[data-ctl="${CSS.escape(foco)}"] button:not(:disabled)`) : hueco0?.querySelector('button:not(:disabled)') || $('[data-bolsa]:not(:disabled)', hueco) || $('.td-tabs [aria-current]', view))?.focus({ preventScroll: true }); } else if (bolsa) $('[data-bolsa]', hueco)?.focus({ preventScroll: true });
}
// La figura del artículo vuela al morral.
function tiendaVuela(a, desde) {
  const dest = $('.td-bolsa', view);
  if (!desde || !dest || !dest.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = desde.getBoundingClientRect(), d = dest.getBoundingClientRect(), f = document.createElement('span');
  f.className = 'td-vuela'; f.innerHTML = tiendaMini(a); f.style.left = `${r.left + r.width / 2}px`; f.style.top = `${r.top + r.height / 2}px`;
  document.body.append(f);
  const dx = d.left + d.width / 2 - r.left - r.width / 2, dy = d.top + d.height / 2 - r.top - r.height / 2;
  f.animate([{ transform: 'translate(-50%, -50%) scale(1)' }, { transform: `translate(calc(-50% + ${dx * .45}px), calc(-50% + ${dy * .45 - 110}px)) scale(1.15) rotate(-8deg)`, offset: .45 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.25) rotate(14deg)`, opacity: .6 }], { duration: 720, easing: 'cubic-bezier(.4, 0, .3, 1)' }).onfinish = () => f.remove();
  setTimeout(() => f.remove(), 1200);
}
// Con el ratón: una tarjeta se arrastra hasta el morral.
function tiendaArrastra(el) {
  el.querySelectorAll('[data-lleva] .td-escena').forEach(s => {
    let id = null, x0 = 0, y0 = 0, f = null;
    const art = s.closest('[data-lleva]').dataset.lleva, quita = () => { f?.remove(); f = null; view.classList.remove('llevando'); };
    const sobre = e => { const r = $('.td-carro', view)?.getBoundingClientRect(); return r && e.clientY > r.top - 40 && e.clientX > r.left && e.clientX < r.right; };
    s.onpointerdown = e => { if (e.button || e.pointerType !== 'mouse') return; id = e.pointerId; x0 = e.clientX; y0 = e.clientY; e.preventDefault(); s.setPointerCapture(id); };
    s.onpointermove = e => {
      if (e.pointerId !== id) return;
      if (!f && Math.hypot(e.clientX - x0, e.clientY - y0) > 8) { f = document.createElement('span'); f.className = 'td-vuela mano'; f.innerHTML = $('.td-artes, .td-pila', s).outerHTML; document.body.append(f); view.classList.add('llevando'); }
      if (f) { f.style.left = `${e.clientX}px`; f.style.top = `${e.clientY}px`; $('.td-carro', view)?.classList.toggle('sobre', sobre(e)); }
    };
    const fin = e => { if (e.pointerId !== id) return; id = null; const dentro = f && e.type === 'pointerup' && sobre(e), de = f; if (dentro) tiendaCambia(art, 1, de); quita(); $('.td-carro', view)?.classList.remove('sobre'); };
    s.onpointerup = fin; s.onpointercancel = fin;
  });
}
// Los libros giran con el dedo; se quedan donde se sueltan.
function tiendaGira(el) {
  el.querySelectorAll('[data-gira]').forEach(b => {
    const caja = b.closest('.td-escena'); let id = null, x0 = 0, g0 = 0, g = -24;
    caja.onpointerdown = e => { if (e.button) return; id = e.pointerId; x0 = e.clientX; g0 = g; caja.setPointerCapture(id); b.classList.add('mano'); };
    caja.onpointermove = e => { if (e.pointerId !== id) return; g = g0 + (e.clientX - x0) * .7; b.style.setProperty('--g', `${g}deg`); if (Math.abs(e.clientX - x0) > 20) caja.classList.add('giro'); };
    caja.onpointerup = caja.onpointercancel = e => { if (e.pointerId === id) { id = null; b.classList.remove('mano'); } };
  });
}
// Radios en fila: flechas para cambiar.
function tiendaLigaRadios(el) {
  el.querySelectorAll('.td-dur').forEach(d => { d.onkeydown = e => { const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return; e.preventDefault(); const bs = [...d.querySelectorAll('button')], i = bs.findIndex(b => b.getAttribute('aria-checked') === 'true'); bs[(i + k + bs.length) % bs.length].click(); }; });
}
// Cambia una tarjeta en su sitio; `foco`: lo que queda enfocado.
function tiendaTarjeta(sel, html, foco) {
  const v = $(sel, view); if (!v) return;
  const antes = v.querySelector('[data-v-precio]')?.dataset.vPrecio, t = document.createElement('template'); t.innerHTML = html.trim();
  const n = t.content.firstElementChild, sc = $('.td-mundos', v)?.scrollLeft || 0; n.classList.add('quieta'); v.replaceWith(n);
  if ($('.td-mundos', n)) $('.td-mundos', n).scrollLeft = sc;
  tiendaGira(n); tiendaLigaRadios(n); if (n.dataset.art) n.classList.toggle('on', !!Tienda.carro[n.dataset.art]);
  const p = n.querySelector('[data-v-precio]'), a = +antes, b = +(p?.dataset.vPrecio || 0);   // el precio corre de un valor al otro
  if (p && a && b && a !== b && !matchMedia('(prefers-reduced-motion: reduce)').matches) { const t0 = performance.now(); const paso = now => { const u = Math.min(1, (now - t0) / 420); p.textContent = cop(u < 1 ? Math.round((a + (b - a) * (1 - (1 - u) ** 3)) / 100) * 100 : b); if (u < 1 && p.isConnected) requestAnimationFrame(paso); }; requestAnimationFrame(paso); }
  if (foco) n.querySelector(foco)?.focus({ preventScroll: true });
}
const TIENDA_CONFIA = [['lock', 'Pago con QR de Bre-B'], ['bolt', 'Se activa en tu mismo código'], ['check', 'Tu avance no se pierde'], ['download', 'Envíos a todo el país']];
const tiendaConfiaHTML = () => `<ul class="td-confia">${TIENDA_CONFIA.map(([i, t]) => `<li>${ICON[i]}<span>${t}</span></li>`).join('')}</ul>`;

function tiendaVistaHTML() {
  if (Tienda.vista === 'todo') {
    return `${tiendaHeroHTML()}${tiendaConfiaHTML()}${Tienda.cargada ? '' : '<p class="td-vacio">Cargando…</p>'}`
      + tiendaSec('Paquetes', tiendaLista('td-paqs', tiendaDe('paquete').map(tiendaPaqHTML).join('')), '', 'Todo junto sale mejor.')
      + tiendaSec('Cursos', tiendaCursosHTML(), 'cursos', 'Elige el tiempo y empieza hoy.')
      + tiendaSec('Libros', tiendaLista('td-libros', Tienda.libros.map(tiendaLibroHTML).join('')), 'libros', 'Impresos en tu casa o digitales en la app.')
      + tiendaSec('Asesorías', tiendaDe('asesoria').length ? `<div class="td-dialhueco">${tiendaDialHTML()}</div>` : '', 'asesorias', 'Una hora con un profe, sobre lo que más te cuesta.');
  }
  if (Tienda.vista === 'cursos') {
    return tiendaSec('Cursos', tiendaCursosHTML(), '', 'Elige el tiempo y empieza hoy.') + tiendaSec('Paquetes', tiendaLista('td-paqs', tiendaDe('paquete').map(tiendaPaqHTML).join('')), '', 'Todo junto sale mejor.') + tiendaConfiaHTML();
  }
  if (Tienda.vista === 'libros') {
    return `${tiendaLista('td-bandas', [...tiendaJuegos('fisico'), ...tiendaJuegos('digital')].map(tiendaJuegoHTML).join(''))}
      ${tiendaSec('Uno por uno', tiendaLista('td-libros', Tienda.libros.map(tiendaLibroHTML).join('')))}
      <p class="td-nota">Los digitales se leen dentro de la app por 12 meses, con conexión; no se descargan. Los impresos se envían a todo el país.</p>`;
  }
  if (Tienda.vista === 'asesorias') {
    const s = Tienda.saldo, hay = s.general + s.universidad;
    return `<section class="td-saldo"><div><h2>${hay ? `Tienes ${hay} ${hay === 1 ? 'hora' : 'horas'}` : 'Aún no tienes horas'}</h2><p>${hay ? `${s.general} ${s.general === 1 ? 'general' : 'generales'} · ${s.universidad} de universidad${s.grupo ? ` · ${s.grupo} en grupo` : ''}` : 'Elige cuántas quieres y sepáralas cuando las necesites.'}</p></div>
      ${hay && conPlan() ? '<button class="btn main brand td-ir" type="button" data-td="separar">Separar una asesoría</button>' : ''}</section>
      <div class="td-dialhueco">${tiendaDialHTML()}</div>
      <p class="td-nota">Las asesorías son de los cursos que tienes comprados. Cada una es virtual y dura 1 hora. Si cancelas con 12 horas o más de anticipación, la hora vuelve a tu saldo.</p>`;
  }
  return `<section><h2>Mis pedidos</h2>${Tienda.pedidos.length ? `<div class="td-lista">${Tienda.pedidos.map(p => `<article class="td-pedido"><div class="acct-head"><b>Pedido ${p.id}</b><span class="pill ${PEDIDO_ESTADO[p.estado][0]}">${PEDIDO_ESTADO[p.estado][1]}</span></div>
    <p>${p.items.map(x => `${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${esc(x.nombre)}`).join(', ')}</p><p class="muted">${fechaCorta(p.creado_en)} · ${cop(p.total)}${p.envio ? ` (envío ${cop(p.envio)})` : ''}</p>
    ${p.guia ? `<p class="td-guia">${esc(p.transportadora)} · guía <b>${esc(p.guia)}</b></p>` : ''}
    ${p.estado === 'pendiente' ? `<div class="acct-actions"><button class="btn main brand" type="button" data-pago="${p.id}">Pagar</button><button class="btn ghost" type="button" data-cancela="${p.id}">Cancelar pedido</button></div>` : ''}</article>`).join('')}</div>` : '<p class="td-vacio">Aún no tienes pedidos.</p>'}</section>`;
}
const TD_ICO = { todo: 'bag', cursos: 'book', libros: 'doc', asesorias: 'calendar', pedidos: 'check' };
function tiendaPinta(foco = '', mueve = true) {
  if (tab !== 'tienda') return;
  const el = view, y = $('.tienda', el) ? el.scrollTop : 0;
  const porPagar = Tienda.pedidos.filter(p => p.estado === 'pendiente').length;
  const V = [['todo', 'Todo'], ['cursos', 'Cursos'], ['libros', 'Libros'], ['asesorias', 'Asesorías'], ['pedidos', `Mis pedidos${porPagar ? ` (${porPagar})` : ''}`]];
  const tabs = $('.td-tabs', el)?.scrollLeft || 0, FILAS = '.td-paqs, .td-cursos, .td-libros, .td-mundos', corrido = el.dataset.vista === Tienda.vista ? [...el.querySelectorAll(FILAS)].map(x => x.scrollLeft) : [];
  el.dataset.vista = Tienda.vista; el.classList.remove('llevando'); document.querySelectorAll('.td-vuela.mano').forEach(x => x.remove());
  el.innerHTML = `<div class="tienda"><header class="td-head"><h1 tabindex="-1">Tienda</h1></header>
    <nav class="td-tabs" aria-label="Secciones de la tienda">${V.map(([id, t]) => `<button type="button" data-v="${id}"${id === Tienda.vista ? ' aria-current="page"' : ''}>${ICON[TD_ICO[id]] || ''}${t}</button>`).join('')}</nav>
    <div class="td-in">${tiendaVistaHTML()}</div>
    <div class="td-carrohueco">${tiendaCarroHTML()}</div></div>`;
  [...el.querySelectorAll(FILAS)].forEach((x, i) => { if (corrido[i]) x.scrollLeft = corrido[i]; });
  el.scrollTop = y; $('.td-tabs', el).scrollLeft = tabs;
  const A = { pedir: tiendaPedir, separar: () => go('tutorias') };
  // Un solo manejador: los huecos cambian sin volver a ligar nada.
  $('.tienda', el).onclick = e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    const d = b.dataset, esc1 = () => b.closest('article, .td-dialc, .vt')?.querySelector('.td-escena, .td-dial, .vt-rueda') || b;
    if (d.td) return A[d.td]();
    if (d.mas) return tiendaCambia(d.mas, 1, esc1());
    if (d.menos) return tiendaCambia(d.menos, -1);
    if (d.leer) return openLector(+d.leer);
    if (d.compra) return openComprar(d.compra, (Tienda.plan || {})[d.compra]);
    if (d.dur) { Tienda.plan = { ...Tienda.plan, [d.de]: d.dur }; return tiendaTarjeta(`[data-curso="${d.de}"]`, tiendaCursoHTML(courseById(d.de)), '[data-dur][aria-checked="true"]'); }
    if (d.fmt) { Tienda.fmt = { ...Tienda.fmt, [d.de]: d.fmt }; return tiendaTarjeta(`[data-libro="${d.de}"]`, tiendaLibroHTML(Tienda.libros.find(l => l.id === +d.de)), '[data-fmt][aria-checked="true"]'); }
    if (d.hora) { Tienda.dial = d.hora; const c = $('.td-dialhueco', el); c.innerHTML = tiendaDialHTML(); tiendaDialVivo(el); tiendaLigaRadios(c); tiendaRefresca(); return $('[data-hora][aria-checked="true"]', c).focus({ preventScroll: true }); }
    if ('bolsa' in d) { Tienda.abierto = !Tienda.abierto; return tiendaRefresca(); }
    if (d.cambia) { const m = tiendaMejora(carroItems(), Tienda.arts, conPlan()); if (!m) return; m.quita.forEach(id => { if (--Tienda.carro[id] <= 0) delete Tienda.carro[id]; }); Tienda.carro[m.a.id] = 1; tiendaRefresca(true); $('[data-bolsa]', el)?.focus({ preventScroll: true }); return toast(`Cambiado: ahorras ${cop(m.ahorro)}`); }
  };
  tiendaVitrinaViva(el); tiendaDialVivo(el); tiendaArrastra(el); tiendaGira(el); tiendaLigaRadios(el);
  el.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { Tienda.vista = b.dataset.v; tiendaPinta(`.td-tabs [data-v="${b.dataset.v}"]`); el.scrollTop = 0; $('.td-tabs [aria-current]', el)?.scrollIntoView({ inline: 'nearest', block: 'nearest' }); }; });
  el.querySelectorAll('[data-pago]').forEach(b => { b.onclick = () => { const p = Tienda.pedidos.find(x => x.id === +b.dataset.pago); if (p) openPago(p.total, pedidoTexto(p)); }; });
  el.querySelectorAll('[data-cancela]').forEach(b => { b.onclick = () => ask({ title: '¿Cancelar este pedido?', text: 'Si ya pagaste, no lo canceles: envíanos el comprobante.', ok: 'Sí, cancelar', cancel: 'Conservarlo', danger: true }).then(async si => {
    if (!si) return;
    const r = await Cuenta.sb.rpc('cancelar_pedido', { p_id: +b.dataset.cancela });
    toast(r.error ? 'No se pudo cancelar. Inténtalo de nuevo.' : 'Pedido cancelado.'); await tiendaMios(); tiendaPinta();
  }); });
  if (mueve) (foco && el.querySelector(foco) || $('h1', el)).focus({ preventScroll: true });
}

// ---------- pedido: dirección (si hay impresos) → confirmar ----------
const DIR = [['nombre', 'Quién recibe', 'autocomplete="name" maxlength="80"'], ['telefono', 'Celular', 'type="tel" inputmode="tel" autocomplete="tel" maxlength="30"'], ['documento', 'Cédula o documento (opcional)', 'inputmode="numeric" maxlength="20"'],
  ['departamento', 'Departamento', 'autocomplete="address-level1" maxlength="60"'], ['ciudad', 'Ciudad o municipio', 'autocomplete="address-level2" maxlength="80"'], ['direccion', 'Dirección', 'autocomplete="street-address" maxlength="120"'], ['detalle', 'Barrio, apartamento o indicaciones (opcional)', 'maxlength="120"']];
function tiendaCapa(paso) {
  let el = $('#tienda');
  if (!el) {
    el = document.createElement('div'); el.id = 'tienda';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Tu pedido');
    document.body.appendChild(el);
  }
  el.dataset.paso = paso;
  tiendaInerte(true);
  return el;
}
function tiendaPedir() {
  const items = carroItems();
  if (!items.length) return;
  if (!Cuenta.user) return openEntrar();
  if (!tiendaHorasOk() && items.some(x => Tienda.arts.find(a => a.id === x.id).tipo === 'asesoria')) return toast('Las asesorías son para cursos comprados. Añade un curso o quita las horas.');
  const el = tiendaCapa('pedir');
  const p = Cuenta.perfil || {}, d = { nombre: p.nombre || '', telefono: p.telefono || '', ciudad: p.ciudad || '', ...(S.envio || {}) };
  const fis = tiendaFisicos(items, Tienda.arts);
  const clave = [...crypto.getRandomValues(new Uint8Array(12))].map(x => x.toString(16).padStart(2, '0')).join('');   // si se reintenta, es el mismo pedido
  let zona = Tienda.envios.find(z => z.id === (S.envio || {}).zona) || null;
  el.innerHTML = `<header class="td-bar"><button class="icon-btn" type="button" data-td="volver" aria-label="Volver a la tienda">${ICON.back}</button><h1 tabindex="-1">Tu pedido</h1></header>
    <div class="td-cuerpo"><form class="td-in td-form acct-form" novalidate>
      <section><h2>Resumen</h2><ul class="td-res">${items.map(x => { const a = Tienda.arts.find(y => y.id === x.id); return `<li><span>${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${esc(a.nombre)}</span><b>${cop(tiendaPrecio(a, conPlan()) * x.cantidad)}</b></li>`; }).join('')}</ul></section>
      ${fis ? `<section><h2>¿A dónde lo enviamos?</h2><div class="compra-lista" role="radiogroup" aria-label="Zona de envío">${Tienda.envios.map(z => `<button type="button" role="radio" class="compra-op" data-z="${esc(z.id)}" aria-checked="${zona === z}"><span><b>${esc(z.nombre)}</b><small>${esc(z.detalle)}</small></span><strong>${cop(z.precio * Math.ceil(fis / 8))}</strong></button>`).join('')}</div>
        <div class="td-dir">${DIR.map(([k, t, x]) => `<label class="fld"><span>${t}</span><input name="${k}" value="${esc(d[k] || '')}" ${x}></label>`).join('')}</div></section>` : ''}
      <section class="td-total"></section>
      <p class="form-msg bad" role="alert" hidden></p><button class="btn main brand" type="submit">Hacer pedido</button></form></div>`;
  const f = $('form', el), msg = $('.form-msg', el), b = $('[type=submit]', el);
  const cuenta = () => { const k = tiendaCuenta(items, Tienda.arts, conPlan(), zona); $('.td-total', el).innerHTML = `<ul class="td-res">${fis ? `<li><span>Envío</span><b>${zona ? cop(k.envio) : 'Elige la zona'}</b></li>` : ''}<li class="t"><span>Total</span><b>${cop(k.total)}</b></li></ul>`; };
  const guarda = () => { if (!fis) return; DIR.forEach(([k]) => { d[k] = f[k].value; }); S.envio = { ...d, zona: zona ? zona.id : '' }; save(); };
  $('[data-td]', el).onclick = () => { if (b.disabled) return; guarda(); tiendaCerrar(); tiendaPinta(); };
  const zs = [...el.querySelectorAll('[data-z]')];
  const elige = i => { zona = Tienda.envios[i]; zs.forEach((x, k) => x.setAttribute('aria-checked', k === i)); cuenta(); };
  zs.forEach((x, i) => { x.onclick = () => elige(i); });
  const error = (texto, campo) => { msg.textContent = texto; msg.hidden = false; (campo && f[campo] ? f[campo] : msg).focus?.(); msg.scrollIntoView({ block: 'nearest' }); };
  f.onsubmit = async e => {
    e.preventDefault();
    if (b.disabled) return;
    msg.hidden = true; guarda();
    if (fis && !zona) return error('Elige a dónde enviamos.');
    const mal = fis && direccionError(d);
    if (mal) return error(mal.texto, mal.campo);
    if (sinRed()) return error(sinRed());
    b.disabled = true; b.textContent = 'Un momento…'; el.dataset.paso = 'enviando';
    let r;
    try { r = await Cuenta.sb.rpc('crear_pedido', { p: { clave, items, zona: zona ? zona.id : '', direccion: fis ? d : {} } }); } catch (x) { r = { error: x }; }
    if (!r.error) { Tienda.carro = {}; tiendaMios().catch(() => {}); }
    if (!f.isConnected) return;
    el.dataset.paso = 'pedir'; b.disabled = false; b.textContent = 'Hacer pedido';
    if (r.error) return error(/fetch|network/i.test(r.error.message || '') ? canjeError('red') : r.error.message || 'No se pudo hacer el pedido.');
    tiendaListo(r.data);
  };
  cuenta(); $('h1', el).focus({ preventScroll: true });
}
function tiendaListo(p) {
  const el = tiendaCapa('listo');
  el.innerHTML = `<header class="td-bar"><button class="icon-btn" type="button" data-td="cerrar" aria-label="Cerrar">${ICON.x}</button><h1 tabindex="-1">Pedido ${p.id}</h1></header>
    <div class="td-cuerpo"><div class="td-in td-listo"><span class="canje-check">${ICON.check}</span><h2>Pedido recibido</h2>
      <p class="muted">Paga y envíanos el comprobante por WhatsApp. Al confirmarlo, lo digital se abre aquí mismo${p.envio ? ' y te avisamos el envío' : ''}.</p>
      ${Cuenta.ajustes.pago_info ? `<p class="td-info">${esc(Cuenta.ajustes.pago_info)}</p>` : ''}
      ${pagoHTML(p.total)}
      ${waBoton(pedidoTexto(p), 'Enviar comprobante', 'main brand')}<button class="btn ghost" type="button" data-td="pedidos">Ver mis pedidos</button></div></div>`;
  $('[data-td=cerrar]', el).onclick = () => { tiendaCerrar(); tiendaPinta(); };
  $('[data-td=pedidos]', el).onclick = () => openTienda('pedidos');
  $('h1', el).focus({ preventScroll: true });
}

// ---------- libros dentro de la app ----------
// Estante en la portada del Preuniversitario y en «Tú».
function librosHTML(soloMios = false) {
  const ls = Tienda.libros.filter(l => (soloMios ? libroListo(l) && Tienda.mios.some(x => x.libro === l.id) : true));
  if (!ls.length || (!soloMios && !Tienda.arts.length)) return '';
  return `<section class="td-estante"><div class="acct-head"><h2>${soloMios ? 'Mis libros' : 'Libros del Preuniversitario'}</h2>${soloMios ? '' : '<button class="link-btn" type="button" data-tienda="libros">Ver y comprar</button>'}</div>
    <div class="td-fila-libros">${ls.map(l => `<button type="button" class="td-lomo" data-libro="${l.id}" aria-label="${esc(l.titulo)}: ${libroMio(l.id) && libroListo(l) ? 'leer' : 'ver en la tienda'}">${tiendaPortada(l.id)}<b>${esc(l.titulo)}</b><small>${libroMio(l.id) && libroListo(l) ? 'Leer' : esc(l.subtitulo)}</small></button>`).join('')}</div></section>`;
}
function bindLibros(root) {
  root.querySelectorAll('[data-tienda]').forEach(b => { b.onclick = () => openTienda(b.dataset.tienda); });
  root.querySelectorAll('[data-libro]').forEach(b => { b.onclick = () => { const l = Tienda.libros.find(x => x.id === +b.dataset.libro); return l && libroMio(l.id) && libroListo(l) ? openLector(l.id) : openTienda('libros'); }; });
}
// Al cerrar sesión no queda nada de la cuenta.
function tiendaFuera() {
  if (lector) lectorCerrar();
  tiendaCerrar();
  Object.assign(Tienda, { mios: [], pedidos: [], carro: {}, saldo: { general: 0, universidad: 0, grupo: 0 } });
  delete S.envio;
}
