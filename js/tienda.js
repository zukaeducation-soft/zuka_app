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
function tiendaBoton(a) {
  const n = Tienda.carro[a.id] || 0;
  if (!n) return `<button class="btn sm main brand" type="button" data-mas="${a.id}">Añadir</button>`;
  return a.tipo === 'fisico' || a.tipo === 'asesoria'
    ? `<span class="td-cant" role="group" aria-label="Cantidad de ${esc(a.nombre)}"><button type="button" data-menos="${a.id}" aria-label="Quitar uno">−</button><b>${n}</b><button type="button" data-mas="${a.id}" aria-label="Añadir uno"${n >= 10 ? ' disabled' : ''}>+</button></span>`
    : `<button class="btn sm ghost" type="button" data-menos="${a.id}">Quitar</button>`;
}
function tiendaPrecioHTML(a) {
  const p = tiendaPrecio(a, conPlan());
  return `<strong class="td-precio">${p !== a.precio ? `<s>${cop(a.precio)}</s> ` : ''}${cop(p)}</strong>${a.precio_plan != null && !conPlan() ? `<small class="td-plan">${cop(a.precio_plan)} si ya tienes plan</small>` : ''}`;
}
const tiendaCard = (a, extra = '') => `<article class="td-card${a.destacado ? ' top' : ''}${Tienda.carro[a.id] ? ' on' : ''}">${a.destacado ? '<span class="td-top">Recomendado</span>' : ''}
  ${extra}<h3>${esc(a.nombre)}</h3><p>${esc(a.detalle)}</p><div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></article>`;
const tiendaDe = tipo => Tienda.arts.filter(a => a.tipo === tipo);

const tiendaPaqHTML = a => tiendaCard(a, (a.da.libros || []).length ? `<span class="td-mini">${a.da.libros.map(i => tiendaPortada(i, 'mini')).join('')}</span>` : '');
// Un curso del catálogo: qué trae, desde cuánto y cómo lo tiene esta cuenta.
function tiendaCursoHTML(c) {
  const a = accesoCurso(Cuenta.accesos, c.id), ps = productosDe(c.id), pr = ps.map(p => p.precio).filter(p => p != null);
  const ex = c.units.reduce((t, u) => t + u.lessons.reduce((n, l) => n + l.ex.length, 0), 0);
  return `<article class="td-card td-curso" style="--c:${c.color}"><div class="td-curso-top">${courseArt(c, 'lg')}<div><h3>${esc(c.name)}</h3><small>${c.units.length} ${c.units.length === 1 ? 'mundo' : 'mundos'} · ${lessonsOf(c).length} lecciones · ${ex} ejercicios</small></div>${accesoPill(a)}</div>
    <p>${esc(c.tagline || '')}</p><div class="td-pie"><span><strong class="td-precio">${pr.length ? cop(Math.min(...pr)) : 'Por WhatsApp'}</strong><small class="td-plan">${ps.length ? `${pr.length > 1 ? 'desde, ' : ''}${ps.map(p => mesesTexto(p.meses)).join(', ').replace(/, ([^,]*)$/, ' o $1')}` : ''}</small></span>
      <button class="btn sm ${a.estado === 'pago' ? 'ghost' : 'main brand'}" type="button" data-compra="${esc(c.id)}">${a.estado === 'pago' || a.estado === 'vencido' ? 'Renovar' : 'Comprar'}</button></div></article>`;
}
const tiendaJuegos = tipo => tiendaDe(tipo).filter(a => ((tipo === 'fisico' ? a.da.fisicos : a.da.libros) || []).length > 1);
const tiendaJuegoHTML = a => tiendaCard(a, `<span class="td-mini">${Tienda.libros.map(l => tiendaPortada(l.id, 'mini')).join('')}</span>`);
const tiendaSec = (t, html, v = '') => (html ? `<section><div class="acct-head"><h2>${t}</h2>${v ? `<button class="link-btn" type="button" data-v="${v}">Ver todo</button>` : ''}</div>${html}</section>` : '');
const tiendaGrid = html => (html ? `<div class="td-grid">${html}</div>` : '');

function tiendaVistaHTML() {
  if (Tienda.vista === 'todo') {
    const h = tiendaSec('Paquetes', tiendaGrid(tiendaDe('paquete').map(tiendaPaqHTML).join('')))
      + tiendaSec('Cursos', tiendaGrid(cursosVisibles().map(tiendaCursoHTML).join('')), 'cursos')
      + tiendaSec('Libros', tiendaGrid([...tiendaJuegos('fisico'), ...tiendaJuegos('digital')].map(tiendaJuegoHTML).join('')) || (Tienda.libros.length ? '<p class="td-nota">Mira los cuatro libros del Preuniversitario, uno por uno.</p>' : ''), 'libros')
      + tiendaSec('Asesorías', tiendaGrid(tiendaDe('asesoria').slice(0, 3).map(a => tiendaCard(a)).join('')), 'asesorias');
    return Tienda.cargada ? h : `${tiendaSec('Cursos', tiendaGrid(cursosVisibles().map(tiendaCursoHTML).join('')), 'cursos')}<p class="td-vacio">Cargando…</p>`;
  }
  if (Tienda.vista === 'cursos') {
    return tiendaSec('Cursos', tiendaGrid(cursosVisibles().map(tiendaCursoHTML).join(''))) + tiendaSec('Paquetes', tiendaGrid(tiendaDe('paquete').map(tiendaPaqHTML).join('')));
  }
  if (Tienda.vista === 'libros') {
    const suelto = (tipo, id) => tiendaDe(tipo).find(a => (a.da.libros || a.da.fisicos || []).length === 1 && (tipo === 'fisico' ? a.da.fisicos : a.da.libros)[0] === id);
    const fila = (a, rot) => (a ? `<div class="td-op${Tienda.carro[a.id] ? ' on' : ''}"><span><small>${rot}</small>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div>` : '');
    return `${tiendaSec('Los cuatro libros', tiendaGrid([...tiendaJuegos('fisico'), ...tiendaJuegos('digital')].map(tiendaJuegoHTML).join('')))}
      <section><h2>Uno por uno</h2><div class="td-libros">${Tienda.libros.map(l => `<article class="td-libro">${tiendaPortada(l.id)}<div><h3>${esc(l.titulo)}</h3><p>${esc(l.subtitulo)}${l.paginas ? ` · ${l.paginas} páginas` : ''}</p>
        ${libroListo(l) || cuentaEsAdmin() ? `<button class="btn sm ${libroMio(l.id) ? 'main brand' : 'ghost'}" type="button" data-leer="${l.id}"${l.version ? '' : ' disabled'}>${libroMio(l.id) ? 'Leer' : 'Ver muestra'}</button>` : ''}
        ${fila(suelto('fisico', l.id), 'Impreso')}${fila(suelto('digital', l.id), 'Digital, 12 meses')}</div></article>`).join('')}</div>
      <p class="td-nota">Los libros digitales se leen dentro de la app, con conexión; no se descargan. Los impresos se envían a todo el país.</p></section>`;
  }
  if (Tienda.vista === 'asesorias') {
    const s = Tienda.saldo;
    return `<section><h2>Tus horas</h2><div class="td-saldo"><span><b>${s.general}</b>Generales</span><span><b>${s.universidad}</b>De universidad</span>${s.grupo ? `<span><b>${s.grupo}</b>En grupo</span>` : ''}</div>
      ${s.general || s.universidad ? '<button class="btn main brand td-ir" type="button" data-td="separar">Separar una asesoría</button>' : ''}</section>
      <section><h2>Comprar horas</h2><div class="td-grid">${tiendaDe('asesoria').map(a => tiendaCard(a)).join('')}</div>
      <p class="td-nota">Cada asesoría es virtual y dura 1 hora. Si cancelas con 12 horas o más de anticipación, la hora vuelve a tu saldo.</p></section>`;
  }
  return `<section><h2>Mis pedidos</h2>${Tienda.pedidos.length ? `<div class="td-lista">${Tienda.pedidos.map(p => `<article class="td-pedido"><div class="acct-head"><b>Pedido ${p.id}</b><span class="pill ${PEDIDO_ESTADO[p.estado][0]}">${PEDIDO_ESTADO[p.estado][1]}</span></div>
    <p>${p.items.map(x => `${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${esc(x.nombre)}`).join(', ')}</p><p class="muted">${fechaCorta(p.creado_en)} · ${cop(p.total)}${p.envio ? ` (envío ${cop(p.envio)})` : ''}</p>
    ${p.guia ? `<p class="td-guia">${esc(p.transportadora)} · guía <b>${esc(p.guia)}</b></p>` : ''}
    ${p.estado === 'pendiente' ? `<div class="acct-actions"><button class="btn main brand" type="button" data-pago="${p.id}">Pagar</button><button class="btn ghost" type="button" data-cancela="${p.id}">Cancelar pedido</button></div>` : ''}</article>`).join('')}</div>` : '<p class="td-vacio">Aún no tienes pedidos.</p>'}</section>`;
}
function tiendaPinta(foco = '', mueve = true) {
  if (tab !== 'tienda') return;
  const el = view, y = $('.tienda', el) ? el.scrollTop : 0;
  const items = carroItems(), k = tiendaCuenta(items, Tienda.arts, conPlan()), n = items.reduce((t, x) => t + x.cantidad, 0), porPagar = Tienda.pedidos.filter(p => p.estado === 'pendiente').length;
  const V = [['todo', 'Todo'], ['cursos', 'Cursos'], ['libros', 'Libros'], ['asesorias', 'Asesorías'], ['pedidos', `Mis pedidos${porPagar ? ` (${porPagar})` : ''}`]];
  const tabs = $('.td-tabs', el)?.scrollLeft || 0;
  el.innerHTML = `<div class="tienda"><header class="td-head"><h1 tabindex="-1">Tienda</h1><p class="muted">Cursos, libros y asesorías. Pagas con QR y se activa en tu mismo código.</p></header>
    <nav class="td-tabs" aria-label="Secciones de la tienda">${V.map(([id, t]) => `<button type="button" data-v="${id}"${id === Tienda.vista ? ' aria-current="page"' : ''}>${t}</button>`).join('')}</nav>
    <div class="td-in">${tiendaVistaHTML()}</div>
    ${n && Tienda.vista !== 'pedidos' ? `<footer class="td-carro"><span><small>${n} ${n === 1 ? 'artículo' : 'artículos'}${k.fisicos ? ' · envío aparte' : ''}</small><b>${cop(k.subtotal)}</b></span><button class="btn main brand" type="button" data-td="pedir">Continuar</button></footer>` : ''}</div>`;
  el.scrollTop = y; $('.td-tabs', el).scrollLeft = tabs;
  const A = { pedir: tiendaPedir, separar: () => go('tutorias') };
  el.querySelectorAll('[data-td]').forEach(b => { b.onclick = () => A[b.dataset.td](); });
  el.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { Tienda.vista = b.dataset.v; tiendaPinta(`.td-tabs [data-v="${b.dataset.v}"]`); el.scrollTop = 0; $('.td-tabs [aria-current]', el)?.scrollIntoView({ inline: 'nearest', block: 'nearest' }); }; });
  el.querySelectorAll('[data-mas]').forEach(b => { b.onclick = () => { const id = b.dataset.mas; Tienda.carro[id] = Math.min(10, (Tienda.carro[id] || 0) + 1); tiendaPinta(`[data-mas="${id}"], [data-menos="${id}"]`); }; });
  el.querySelectorAll('[data-menos]').forEach(b => { b.onclick = () => { const id = b.dataset.menos; if (--Tienda.carro[id] <= 0) delete Tienda.carro[id]; tiendaPinta(`[data-menos="${id}"], [data-mas="${id}"]`); }; });
  el.querySelectorAll('[data-compra]').forEach(b => { b.onclick = () => openComprar(b.dataset.compra); });
  el.querySelectorAll('[data-pago]').forEach(b => { b.onclick = () => { const p = Tienda.pedidos.find(x => x.id === +b.dataset.pago); if (p) openPago(p.total, pedidoTexto(p)); }; });
  el.querySelectorAll('[data-leer]').forEach(b => { b.onclick = () => openLector(+b.dataset.leer); });
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
