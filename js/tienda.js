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
function tiendaBoton(a) {
  const n = Tienda.carro[a.id] || 0;
  if (a.tipo === 'asesoria' && !n && !tiendaHorasOk()) return '<small class="td-plan td-solo">Con un curso comprado</small>';
  if (!n) return `<button class="btn sm main brand" type="button" data-mas="${a.id}">Añadir</button>`;
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
  return `<article class="td-paq${a.destacado ? ' top' : ''}${Tienda.carro[a.id] ? ' on' : ''}" style="${tiendaColor((cs[0] || {}).id)}">
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
  return `<article class="td-curso" style="--c:${c.color};${tiendaColor(c.id)}"><div class="td-escena luz">${accesoPill(a)}<span class="td-artes">${courseArt(c, 'xl')}</span></div>
    <div class="td-cont"><h3>${esc(c.name)}</h3><p>${esc(c.tagline || '')}</p>
      <p class="td-datos"><span><b>${c.units.length}</b> ${c.units.length === 1 ? 'mundo' : 'mundos'}</span><span><b>${lessonsOf(c).length}</b> lecciones</span><span><b>${ex}</b> ejercicios</span></p>
      ${ps.length > 1 ? `<div class="td-dur" role="radiogroup" aria-label="Duración de ${esc(c.name)}">${ps.map(p => `<button type="button" role="radio" aria-checked="${p === sel}" data-dur="${esc(p.id)}" data-de="${esc(c.id)}">${mesesTexto(p.meses)}</button>`).join('')}</div>` : ''}
      <div class="td-pie"><span><strong class="td-precio">${sel && sel.precio != null ? cop(sel.precio) : 'Por WhatsApp'}</strong><small class="td-plan">${!sel ? '' : sel.precio != null && sel.meses > 1 ? `${mesesTexto(sel.meses)} · ${cop(sel.precio / sel.meses)} al mes` : mesesTexto(sel.meses)}</small></span>
        <button class="btn ${a.estado === 'pago' ? 'ghost' : 'main brand'}" type="button" data-compra="${esc(c.id)}">${tiene ? 'Renovar' : 'Comprar'}</button></div></div></article>`;
}
const tiendaJuegos = tipo => tiendaDe(tipo).filter(a => ((tipo === 'fisico' ? a.da.fisicos : a.da.libros) || []).length > 1);
// Juego de libros: banda ancha con los tomos abiertos en abanico.
const tiendaJuegoHTML = a => `<article class="td-banda${Tienda.carro[a.id] ? ' on' : ''}" style="${tiendaColor('preuda')}"><div class="td-cont"><span class="td-tipo">${a.tipo === 'fisico' ? 'Impresos, con envío' : 'Digitales, en la app'}</span><h3>${esc(a.nombre)}</h3><p>${esc(a.detalle)}</p>${tiendaAhorroHTML(a)}
  <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></div><div class="td-escena">${tiendaPila(Tienda.libros.map(l => l.id))}</div></article>`;
function tiendaLibroHTML(l) {
  const suelto = (tipo, k) => tiendaDe(tipo).find(a => (a.da[k] || []).length === 1 && a.da[k][0] === l.id);
  const fila = (a, rot) => (a ? `<div class="td-op${Tienda.carro[a.id] ? ' on' : ''}"><span><small>${rot}</small>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div>` : '');
  const ver = libroListo(l) || cuentaEsAdmin();
  return `<article class="td-libro"><div class="td-escena"><span class="td-tomo solo">${tiendaPortada(l.id)}</span></div><div class="td-cont"><span class="td-tipo">${esc(l.subtitulo)}</span><h3>${esc(l.titulo)}</h3><p>${l.paginas ? `${l.paginas} páginas a color` : ''}</p>
    ${ver ? `<button class="btn sm ${libroMio(l.id) ? 'main brand' : 'ghost'}" type="button" data-leer="${l.id}"${l.version ? '' : ' disabled'}>${libroMio(l.id) ? 'Leer' : 'Ver muestra'}</button>` : ''}
    ${fila(suelto('fisico', 'fisicos'), 'Impreso')}${fila(suelto('digital', 'libros'), 'Digital')}</div></article>`;
}
// Asesoría: las horas en grande y cuánto sale cada una.
function tiendaHoraHTML(a) {
  const h = a.da.horas || 1, p = tiendaPrecio(a, conPlan());
  return `<article class="td-hora${a.destacado ? ' top' : ''}${Tienda.carro[a.id] ? ' on' : ''}">${a.destacado ? '<span class="td-top">Recomendado</span>' : ''}
    <div class="td-reloj" aria-hidden="true" style="--h:${Math.min(8, h)}"><b>${h}</b><small>${h === 1 ? 'hora' : 'horas'}</small></div>
    <h3>${esc(a.nombre)}</h3><p>${esc(a.detalle)}</p><small class="td-plan">${h > 1 ? `${cop(p / h)} por hora` : ''}</small>${tiendaAhorroHTML(a)}
    <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></article>`;
}
const tiendaSec = (t, html, v = '', sub = '') => (html ? `<section><div class="td-tit"><div><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${v ? `<button class="link-btn" type="button" data-v="${v}">Ver todo</button>` : ''}</div>${html}</section>` : '');
const tiendaLista = (cls, html) => (html ? `<div class="${cls}">${html}</div>` : '');
const tiendaCursosHTML = () => tiendaLista('td-cursos', cursosVisibles().map(tiendaCursoHTML).join(''));

// Portada: lo que más le sirve a esta cuenta (el Preuniversitario si no lo tiene; si ya, los libros).
function tiendaHeroHTML() {
  const c = cursosVisibles().find(x => x.id === 'preuda'), tiene = c && comprado(Cuenta.accesos, 'preuda', true);
  if (c && !tiene) {
    const pr = productosDe('preuda').filter(p => p.precio != null).sort((x, y) => x.precio / x.meses - y.precio / y.meses)[0];
    return `<section class="td-hero" style="${tiendaColor('preuda')}"><div class="td-hero-t"><span class="td-tipo">Preuniversitario UdeA</span><h2>Llega al examen entrenado, no adivinando</h2>
      <p>${c.units.length} mundos, ${lessonsOf(c).length} lecciones y ${c.units.reduce((t, u) => t + u.lessons.reduce((n, l) => n + l.ex.length, 0), 0)} ejercicios que se juegan, en un solo lugar.</p>
      <div class="td-hero-a">${pr ? `<span><small>Desde</small><strong>${cop(pr.precio / pr.meses)}</strong><small>al mes, en el plan de ${mesesTexto(pr.meses)}</small></span>` : ''}<button class="btn main" type="button" data-compra="preuda">Comprar ahora</button></div></div>
      <div class="td-hero-v" aria-hidden="true">${courseArt(c, 'xl')}${Tienda.libros.length ? tiendaPila(Tienda.libros.map(l => l.id)) : ''}</div></section>`;
  }
  if (!Tienda.libros.length) return '';
  return `<section class="td-hero" style="${tiendaColor('preuda')}"><div class="td-hero-t"><span class="td-tipo">Libros del Preuniversitario</span><h2>Cuatro libros para estudiar con lápiz en mano</h2>
    <p>${Tienda.libros.reduce((t, l) => t + l.paginas, 0)} páginas a color con retos, ejemplos resueltos y las claves al final.</p>
    <div class="td-hero-a"><button class="btn main" type="button" data-v="libros">Ver los libros</button></div></div><div class="td-hero-v" aria-hidden="true">${tiendaPila(Tienda.libros.map(l => l.id))}</div></section>`;
}
const TIENDA_CONFIA = [['lock', 'Pago con QR de Bre-B'], ['bolt', 'Se activa en tu mismo código'], ['check', 'Tu avance no se pierde'], ['download', 'Envíos a todo el país']];
const tiendaConfiaHTML = () => `<ul class="td-confia">${TIENDA_CONFIA.map(([i, t]) => `<li>${ICON[i]}<span>${t}</span></li>`).join('')}</ul>`;

function tiendaVistaHTML() {
  if (Tienda.vista === 'todo') {
    return `${tiendaHeroHTML()}${tiendaConfiaHTML()}${Tienda.cargada ? '' : '<p class="td-vacio">Cargando…</p>'}`
      + tiendaSec('Paquetes', tiendaLista('td-paqs', tiendaDe('paquete').map(tiendaPaqHTML).join('')), '', 'Todo junto sale mejor.')
      + tiendaSec('Cursos', tiendaCursosHTML(), 'cursos', 'Elige el tiempo y empieza hoy.')
      + tiendaSec('Libros', tiendaLista('td-libros', Tienda.libros.map(tiendaLibroHTML).join('')), 'libros', 'Impresos en tu casa o digitales en la app.')
      + tiendaSec('Asesorías', tiendaLista('td-horas', tiendaDe('asesoria').slice(0, 3).map(tiendaHoraHTML).join('')), 'asesorias', 'Una hora con un profe, sobre lo que más te cuesta.');
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
      ${tiendaLista('td-horas', tiendaDe('asesoria').map(tiendaHoraHTML).join(''))}
      <p class="td-nota">Las asesorías son de los cursos que tienes comprados. Cada una es virtual y dura 1 hora. Si cancelas con 12 horas o más de anticipación, la hora vuelve a tu saldo.</p>`;
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
  el.innerHTML = `<div class="tienda"><header class="td-head"><h1 tabindex="-1">Tienda</h1></header>
    <nav class="td-tabs" aria-label="Secciones de la tienda">${V.map(([id, t]) => `<button type="button" data-v="${id}"${id === Tienda.vista ? ' aria-current="page"' : ''}>${t}</button>`).join('')}</nav>
    <div class="td-in">${tiendaVistaHTML()}</div>
    ${n && Tienda.vista !== 'pedidos' ? `<footer class="td-carro"><span><small>${n} ${n === 1 ? 'artículo' : 'artículos'}${k.fisicos ? ' · envío aparte' : ''}</small><b>${cop(k.subtotal)}</b></span><button class="btn main brand" type="button" data-td="pedir">Continuar</button></footer>` : ''}</div>`;
  el.scrollTop = y; $('.td-tabs', el).scrollLeft = tabs;
  const A = { pedir: tiendaPedir, separar: () => go('tutorias') };
  el.querySelectorAll('[data-td]').forEach(b => { b.onclick = () => A[b.dataset.td](); });
  el.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { Tienda.vista = b.dataset.v; tiendaPinta(`.td-tabs [data-v="${b.dataset.v}"]`); el.scrollTop = 0; $('.td-tabs [aria-current]', el)?.scrollIntoView({ inline: 'nearest', block: 'nearest' }); }; });
  el.querySelectorAll('[data-mas]').forEach(b => { b.onclick = () => { const id = b.dataset.mas; Tienda.carro[id] = Math.min(10, (Tienda.carro[id] || 0) + 1); tiendaPinta(`[data-mas="${id}"], [data-menos="${id}"]`); }; });
  el.querySelectorAll('[data-menos]').forEach(b => { b.onclick = () => { const id = b.dataset.menos; if (--Tienda.carro[id] <= 0) delete Tienda.carro[id]; tiendaPinta(`[data-menos="${id}"], [data-mas="${id}"]`); }; });
  el.querySelectorAll('[data-compra]').forEach(b => { b.onclick = () => openComprar(b.dataset.compra, (Tienda.plan || {})[b.dataset.compra]); });
  el.querySelectorAll('[data-dur]').forEach(b => { b.onclick = () => { Tienda.plan = { ...Tienda.plan, [b.dataset.de]: b.dataset.dur }; tiendaPinta(`[data-dur="${b.dataset.dur}"]`); }; });
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
