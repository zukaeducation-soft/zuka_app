// Panel: pedidos, asesorías, precios de la tienda, envíos y libros (spec 2026-11-24-tienda-libros). Va antes de panel.js,
// que trae las ayudas ($, esc, tabla, ventana, carga…) y las rutas.

async function tiendaAdm(accion, p = {}) {
  const { data, error } = await sb.rpc('tienda_admin', { p_accion: accion, p });
  if (error) throw error;
  return data;
}
async function tiendaConteo() {
  try {
    const r = await tiendaAdm('conteo');
    [['pedidos', r.pedidos], ['asesorias', r.asesorias]].forEach(([k, n]) => { const x = $(`.pn-nav [data-n="${k}"]`); if (x) { x.textContent = n || ''; x.hidden = !n; } });
  } catch (e) { /* el menú sigue sin número */ }
}
const PED = { pendiente: ['warn', 'Por pagar'], pagado: ['ok', 'Pagado: por preparar'], preparando: ['ok', 'En preparación'], enviado: ['ok', 'Enviado'], entregado: ['', 'Entregado'], cancelado: ['', 'Cancelado'] };
const pedItems = p => p.items.map(x => `${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${esc(x.nombre)}`).join('<br>');
const pedDir = d => (d && d.direccion ? [d.nombre, d.telefono, d.documento, [d.direccion, d.detalle].filter(Boolean).join(', '), [d.ciudad, d.departamento].filter(Boolean).join(', ')].filter(Boolean) : []);

// ---------- pedidos ----------
const filP = { q: '', estado: 'abiertos' };
function vPedidos() {
  carga(() => tiendaAdm('pedidos'), ps => {
    tiendaConteo();
    view.innerHTML = `<div class="pn-head"><h1>Pedidos</h1><button class="btn ghost" type="button" data-csv>Descargar Excel</button></div>
      <p class="pn-count">Al confirmar el pago se abren los cursos y libros digitales y se suman las horas. Lo impreso queda por preparar y enviar.</p>
      <div class="pn-filters dos"><label class="fld"><span>Buscar</span><input type="search" name="q" placeholder="Número, nombre, celular, ciudad o guía" value="${esc(filP.q)}"></label><label class="fld"><span>Estado</span><select name="estado"><option value="abiertos">Por atender</option><option value=""${filP.estado ? '' : ' selected'}>Todos</option>${Object.entries(PED).map(([k, v]) => `<option value="${k}"${filP.estado === k ? ' selected' : ''}>${v[1]}</option>`).join('')}</select></label></div><div class="pn-list"></div>`;
    const visibles = () => { const q = filP.q.trim().toLowerCase(); return ps.filter(p => (!filP.estado || (filP.estado === 'abiertos' ? ['pendiente', 'pagado', 'preparando'].includes(p.estado) : p.estado === filP.estado)) && (!q || `${p.id} ${p.nombre} ${p.telefono} ${p.codigo} ${p.guia} ${pedDir(p.direccion).join(' ')}`.toLowerCase().includes(q))); };
    const pinta = () => {
      $('.pn-list', view).innerHTML = tabla([{ t: 'Pedido' }, { t: 'Estudiante' }, { t: 'Artículos' }, { t: 'Total', n: 1 }, { t: 'Estado' }, { t: '' }], visibles().map(p => `<tr><td class="pn-main">${p.id}<span class="pn-sub">${fechaCorta(p.creado_en)}</span></td>
        ${td('Estudiante', `${p.usuario ? `<a href="#estudiante/${p.usuario}">${esc(p.nombre || 'Sin nombre')}</a>` : esc(p.nombre || 'Cuenta eliminada')}<span class="pn-sub">${esc(p.telefono)}</span>`)}${td('Artículos', `<span>${pedItems(p)}</span>`)}${td('Total', `${cop(p.total)}${p.envio ? `<span class="pn-sub">envío ${cop(p.envio)} · ${esc(p.zona)}</span>` : ''}`, 'pn-num')}
        ${td('Estado', `<span class="pill ${PED[p.estado][0]}">${PED[p.estado][1]}</span>${p.guia ? `<span class="pn-sub">${esc(p.transportadora)} ${esc(p.guia)}</span>` : ''}`)}${td('', `<span class="pn-acc">${p.estado === 'pendiente' ? `<button class="btn small main" type="button" data-pagar="${p.id}">Confirmar pago</button>` : ''}<button class="btn small ghost" type="button" data-ver="${p.id}">Ver</button>${waA((p.direccion || {}).telefono || p.telefono, `Hola${p.nombre ? ` ${p.nombre}` : ''}, te escribimos por tu pedido ${p.id} de Zuka.`)}</span>`, 'pn-num')}</tr>`), ps.length ? 'Ningún pedido con ese filtro.' : 'Aún no hay pedidos.');
      $$('[data-pagar]', view).forEach(b => { b.onclick = () => dlgPagar(ps.find(p => String(p.id) === b.dataset.pagar)); });
      $$('[data-ver]', view).forEach(b => { b.onclick = () => dlgPedido(ps.find(p => String(p.id) === b.dataset.ver)); });
    };
    $$('.pn-filters [name]', view).forEach(x => { x.value = filP[x.name]; x.oninput = () => { filP[x.name] = x.value; pinta(); }; });
    $('[data-csv]', view).onclick = () => csv('zuka-pedidos', ['Pedido', 'Fecha', 'Estado', 'Estudiante', 'Celular', 'Código', 'Artículos', 'Subtotal', 'Envío', 'Total', 'Zona', 'Recibe', 'Celular envío', 'Documento', 'Dirección', 'Detalle', 'Ciudad', 'Departamento', 'Transportadora', 'Guía'],
      visibles().map(p => [p.id, fechaCorta(p.creado_en), PED[p.estado][1], p.nombre, p.telefono, p.codigo, p.items.map(x => `${x.cantidad} × ${x.nombre}`).join(', '), p.subtotal, p.envio, p.total, p.zona, ...['nombre', 'telefono', 'documento', 'direccion', 'detalle', 'ciudad', 'departamento'].map(k => (p.direccion || {})[k]), p.transportadora, p.guia]));
    pinta();
  });
}
function dlgPagar(p) {
  ventana(`<form class="pn-form1"><h2>Confirmar pago del pedido ${p.id}</h2><p>${esc(p.nombre)} · <b>${cop(p.total)}</b></p><p>${pedItems(p)}</p>
    <label class="fld"><span>Medio de pago</span><select name="metodo">${METODOS.map(m => `<option>${m}</option>`).join('')}</select></label>
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Confirmar pago</button></div></form>`, d => {
    $('form', d).onsubmit = e => {
      e.preventDefault();
      ocupado($('[type=submit]', d), async () => {
        await tiendaAdm('pedido_pagar', { id: p.id, metodo: e.target.metodo.value });
        d.close(); vPedidos();
        ventana(`<div class="pn-form1"><h2>Pago confirmado</h2><p>Lo digital ya está abierto${p.envio ? ' y lo impreso quedó por preparar' : ''}.</p><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button>${waA(p.telefono, `Hola${p.nombre ? ` ${p.nombre}` : ''}, confirmamos el pago de tu pedido ${p.id} de Zuka. Lo digital ya está abierto en tu app${p.envio ? '; te avisamos cuando enviemos tus libros' : ''}.`, 'Avisar por WhatsApp', 'main')}</div></div>`);
      });
    };
  });
}
function dlgPedido(p) {
  const fis = p.items.some(x => (x.da.fisicos || []).length), dir = pedDir(p.direccion), sig = { pagado: 'preparando', preparando: 'enviado', enviado: 'entregado' }[p.estado];
  ventana(`<form class="pn-form1"><h2>Pedido ${p.id}</h2><p><span class="pill ${PED[p.estado][0]}">${PED[p.estado][1]}</span></p><p>${pedItems(p)}</p>
    <dl class="pn-facts"><div><dt>Total</dt><dd>${cop(p.total)}</dd></div><div><dt>Pedido</dt><dd>${fechaCorta(p.creado_en)}</dd></div><div><dt>Pagado</dt><dd>${fechaCorta(p.pagado_en)}</dd></div>${fis ? `<div><dt>Enviado</dt><dd>${fechaCorta(p.enviado_en)}</dd></div>` : ''}</dl>
    ${p.estado === 'cancelado' ? '<button class="btn small ghost" type="button" data-abre>Reabrir pedido</button>' : ''}
    ${dir.length ? `<p><b>Enviar a</b><br>${dir.map(esc).join('<br>')}<br>${esc(p.zona)}</p><button class="btn small ghost" type="button" data-cp>Copiar dirección</button>` : ''}
    ${fis && sig ? `<div class="pn-dos"><label class="fld"><span>Transportadora</span><input name="transportadora" maxlength="40" value="${esc(p.transportadora)}"></label><label class="fld"><span>Guía</span><input name="guia" maxlength="60" value="${esc(p.guia)}"></label></div>` : ''}
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button>${p.estado === 'pendiente' ? '<button class="btn ghost danger" type="button" data-no>Cancelar pedido</button>' : ''}${fis && sig ? `<button class="btn main" type="submit">${{ preparando: 'Pasar a preparación', enviado: 'Marcar enviado', entregado: 'Marcar entregado' }[sig]}</button>` : ''}</div></form>`, d => {
    const f = $('form', d);
    $('[data-cp]', d)?.addEventListener('click', () => copiar(dir.join('\n')));
    $('[data-abre]', d)?.addEventListener('click', e => ocupado(e.currentTarget, async () => { await tiendaAdm('pedido_estado', { id: p.id, estado: 'pendiente' }); d.close(); toast('Pedido reabierto: queda por pagar'); vPedidos(); }));
    $('[data-no]', d)?.addEventListener('click', async e => { const b = e.currentTarget; if (await confirma({ titulo: '¿Cancelar este pedido?', texto: 'Solo se cancela si no se ha pagado.', ok: 'Cancelar pedido', peligro: true })) ocupado(b, async () => { await tiendaAdm('pedido_estado', { id: p.id, estado: 'cancelado' }); d.close(); toast('Pedido cancelado'); vPedidos(); }); });
    f.onsubmit = e => {
      e.preventDefault();
      if (sig === 'enviado' && !f.guia.value.trim()) return toast('Escribe el número de guía', true);
      ocupado($('[type=submit]', f), async () => {
        const guia = f.guia.value.trim(), tr = f.transportadora.value.trim();
        await tiendaAdm('pedido_estado', { id: p.id, estado: sig, transportadora: tr, guia });
        d.close(); vPedidos();
        if (sig !== 'enviado') return toast('Pedido actualizado');
        ventana(`<div class="pn-form1"><h2>Pedido enviado</h2><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button>${waA((p.direccion || {}).telefono || p.telefono, `Hola${p.nombre ? ` ${p.nombre}` : ''}, enviamos tus libros de Zuka (pedido ${p.id}). ${tr ? `${tr}, guía` : 'Guía'} ${guia}.`, 'Enviar la guía por WhatsApp', 'main')}</div></div>`);
      });
    };
  });
}

// ---------- asesorías ----------
function vAsesorias() {
  carga(() => tiendaAdm('asesorias'), as => {
    tiendaConteo();
    const E = { pendiente: ['warn', 'Por confirmar'], confirmada: ['ok', 'Confirmada'], hecha: ['', 'Hecha'], cancelada: ['', 'Cancelada'] }, ahora = Date.now();
    const cuando = a => new Date(a.inicio).toLocaleString('es-CO', { timeZone: 'America/Bogota', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
    const orden = as.slice().sort((x, y) => { const px = +new Date(x.inicio) > ahora, py = +new Date(y.inicio) > ahora; return px !== py ? py - px : px ? new Date(x.inicio) - new Date(y.inicio) : new Date(y.inicio) - new Date(x.inicio); });
    view.innerHTML = `<h1>Asesorías</h1><p class="pn-count">Cada una gasta una hora del saldo del estudiante. Si la cancelas tú, la hora vuelve.</p>
      ${tabla([{ t: 'Cuándo' }, { t: 'Estudiante' }, { t: 'Materia' }, { t: 'Estado' }, { t: '' }], orden.map(a => `<tr><td class="pn-main">${cuando(a)}</td>${td('Estudiante', `<a href="#estudiante/${a.usuario}">${esc(a.nombre || 'Sin nombre')}</a><span class="pn-sub">${esc(a.telefono)}</span>`)}${td('Materia', `${esc(curso(a.curso).nombre)}<span class="pn-sub">${esc(a.temas.join(', '))}${a.nota ? ` · «${esc(a.nota)}»` : ''}</span>`)}
        ${td('Estado', `<span class="pill ${E[a.estado][0]}">${E[a.estado][1]}</span>`)}${td('', ['pendiente', 'confirmada'].includes(a.estado) ? `<span class="pn-acc">${a.estado === 'pendiente' ? `<button class="btn small main" type="button" data-ok="${a.id}">Confirmar</button>` : `<button class="btn small main" type="button" data-hecha="${a.id}">Marcar hecha</button>${waA(a.telefono, `Hola${a.nombre ? ` ${a.nombre}` : ''}, te recordamos tu asesoría de ${curso(a.curso).nombre}: ${cuando(a)}.${a.enlace ? ` Enlace: ${a.enlace}` : ''}`)}`}<button class="btn small ghost" type="button" data-no="${a.id}">Cancelar</button></span>` : '', 'pn-num')}</tr>`), 'Aún no hay asesorías.')}`;
    const de = id => as.find(a => String(a.id) === id);
    $$('[data-ok]', view).forEach(b => { b.onclick = () => { const a = de(b.dataset.ok); ventana(`<form class="pn-form1"><h2>Confirmar asesoría</h2><p>${esc(a.nombre)} · ${cuando(a)}</p><label class="fld"><span>Enlace de la reunión</span><input name="enlace" type="url" maxlength="300" placeholder="https://meet.google.com/…"></label><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button><button class="btn main" type="submit">Confirmar</button></div></form>`, d => {
      $('form', d).onsubmit = e => { e.preventDefault(); const enlace = e.target.enlace.value.trim(); ocupado($('[type=submit]', d), async () => { await tiendaAdm('asesoria_estado', { id: a.id, estado: 'confirmada', enlace }); d.close(); vAsesorias(); ventana(`<div class="pn-form1"><h2>Asesoría confirmada</h2><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button>${waA(a.telefono, `Hola${a.nombre ? ` ${a.nombre}` : ''}, tu asesoría de ${curso(a.curso).nombre} quedó confirmada: ${cuando(a)}.${enlace ? ` Enlace: ${enlace}` : ''}`, 'Avisar por WhatsApp', 'main')}</div></div>`); }); };
    }); }; });
    $$('[data-hecha]', view).forEach(b => { b.onclick = () => ocupado(b, async () => { await tiendaAdm('asesoria_estado', { id: b.dataset.hecha, estado: 'hecha' }); vAsesorias(); }); });
    $$('[data-no]', view).forEach(b => { b.onclick = async () => { if (await confirma({ titulo: '¿Cancelar la asesoría?', texto: 'La hora vuelve al saldo del estudiante. Avísale por WhatsApp.', ok: 'Cancelar asesoría', peligro: true })) ocupado(b, async () => { await tiendaAdm('asesoria_estado', { id: b.dataset.no, estado: 'cancelada' }); vAsesorias(); }); }; });
  });
}

// ---------- tienda: precios, envíos y libros ----------
function vTienda() {
  carga(async () => { const r = await Promise.all(['articulos', 'envios', 'libros'].map(t => sb.from(t).select('*'))); r.forEach(x => { if (x.error) throw x.error; }); return r.map(x => x.data); }, ([arts, envs, libros]) => {
    const o = (a, b) => a.orden - b.orden, G = { paquete: 'Paquetes', fisico: 'Libros impresos', digital: 'Libros digitales', asesoria: 'Asesorías' };
    view.innerHTML = `<h1>Tienda</h1><p class="pn-count">Los precios de los cursos solos están en <a href="#cursos">Cursos y precios</a>. Un pedido ya hecho conserva el precio que tenía.</p>
      ${Object.entries(G).map(([t, n]) => `<section class="pn-card"><h2>${n}</h2>${arts.filter(a => a.tipo === t).sort(o).map(a => `<form class="pn-art" data-art="${a.id}"><label class="fld"><span>Nombre</span><input name="nombre" maxlength="80" required value="${esc(a.nombre)}"></label><label class="fld det"><span>Detalle</span><input name="detalle" maxlength="240" value="${esc(a.detalle)}"></label>
        <label class="fld"><span>Precio (COP)</span><input name="precio" type="number" min="0" step="100" value="${a.precio ?? ''}"></label><label class="fld"><span>Precio con plan</span><input name="precio_plan" type="number" min="0" step="100" value="${a.precio_plan ?? ''}" placeholder="Igual"></label>
        <label class="pn-sw"><input type="checkbox" name="activo"${a.activo ? ' checked' : ''}><span>A la venta</span></label><label class="pn-sw"><input type="checkbox" name="destacado"${a.destacado ? ' checked' : ''}><span>Recomendado</span></label><button class="btn small main" type="submit">Guardar</button></form>`).join('')}</section>`).join('')}
      <section class="pn-card"><h2>Envíos</h2>${envs.sort(o).map(z => `<form class="pn-art envio" data-env="${z.id}"><label class="fld"><span>Zona</span><input name="nombre" maxlength="80" required value="${esc(z.nombre)}"></label><label class="fld det"><span>Detalle</span><input name="detalle" maxlength="160" value="${esc(z.detalle)}"></label><label class="fld"><span>Precio (COP)</span><input name="precio" type="number" min="0" step="100" required value="${z.precio}"></label><label class="pn-sw"><input type="checkbox" name="activo"${z.activo ? ' checked' : ''}><span>Activa</span></label><button class="btn small main" type="submit">Guardar</button></form>`).join('')}<p class="pn-count">Cubre hasta 8 libros por pedido; con más, se cobra otra vez.</p></section>
      <section class="pn-card"><h2>Libros</h2><p class="pn-count">Sube el PDF de cada libro: aquí se convierte en páginas protegidas (no se guarda el PDF). Luego publícalo. Subirlo otra vez reemplaza las páginas.</p>${libros.sort((a, b) => a.id - b.id).map(l => `<form class="pn-art libro" data-lib="${l.id}"><label class="fld"><span>Libro ${l.id}</span><input name="titulo" maxlength="80" required value="${esc(l.titulo)}"></label><label class="fld"><span>Componente</span><input name="subtitulo" maxlength="80" value="${esc(l.subtitulo)}"></label><label class="fld"><span>Páginas de muestra</span><input name="muestra" type="number" min="0" max="60" value="${l.muestra}"></label>
        <label class="pn-sw"><input type="checkbox" name="publicado"${l.publicado ? ' checked' : ''}${l.version ? '' : ' disabled'}><span>Publicado</span></label><button class="btn small main" type="submit">Guardar</button><label class="btn small ghost">${l.version ? 'Cambiar PDF' : 'Subir PDF'}<input type="file" accept="application/pdf" hidden></label><span class="pn-count">${l.version ? `${l.paginas} páginas subidas` : 'Sin páginas'}</span></form>`).join('')}</section>`;
    const val = f => ({ ...Object.fromEntries([...f.elements].filter(x => x.name && x.type !== 'checkbox').map(x => [x.name, x.value.trim()])), ...Object.fromEntries([...f.elements].filter(x => x.type === 'checkbox').map(x => [x.name, x.checked])) });
    const guarda = (sel, accion, id) => $$(sel, view).forEach(f => { f.onsubmit = e => { e.preventDefault(); ocupado($('[type=submit]', f), async () => { await tiendaAdm(accion, { id: id(f), ...val(f) }); toast('Guardado'); }); }; });
    guarda('[data-art]', 'articulo_guardar', f => f.dataset.art); guarda('[data-env]', 'envio_guardar', f => f.dataset.env); guarda('[data-lib]', 'libro_guardar', f => Number(f.dataset.lib));
    $$('[data-lib] input[type=file]', view).forEach(i => { i.onchange = () => { const l = libros.find(x => String(x.id) === i.closest('form').dataset.lib); if (i.files[0]) subeLibro(l, i.files[0]); i.value = ''; }; });
  });
}

// pdf.js se carga solo al subir un libro (con huella); su trabajador sale de un blob, como pide la política de contenido.
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
const PDFJS_SRI = { 'pdf.min.js': 'sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e', 'pdf.worker.min.js': 'sha384-SnzOobpRMLXZ52iJvZm/C0fYw0OQemTXzTjIsdsfMcrCtCEe9qgzxTd3RSklO5x2' };
async function cargaPdf() {
  if (!window.pdfjsLib || !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
    if (!window.pdfjsLib) await new Promise((ok, mal) => { const s = document.createElement('script'); s.src = `${PDFJS}pdf.min.js`; s.integrity = PDFJS_SRI['pdf.min.js']; s.crossOrigin = 'anonymous'; s.onload = ok; s.onerror = () => mal(new Error('No se pudo cargar el lector de PDF')); document.head.appendChild(s); });
    const w = await fetch(`${PDFJS}pdf.worker.min.js`, { integrity: PDFJS_SRI['pdf.worker.min.js'] }).then(r => r.blob());
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([w], { type: 'text/javascript' }));
  }
  return window.pdfjsLib;
}
// Índice del PDF como [{ t, p, n }] (título, página, nivel), hasta dos niveles.
async function pdfIndice(pdf) {
  const out = [];
  const anda = async (xs, n) => {
    for (const x of xs || []) {
      try {
        const d = typeof x.dest === 'string' ? await pdf.getDestination(x.dest) : x.dest;
        if (d) out.push({ t: x.title.trim().slice(0, 120), p: (await pdf.getPageIndex(d[0])) + 1, n });
      } catch (e) { /* entrada sin destino */ }
      if (n < 1) await anda(x.items, n + 1);
    }
  };
  await anda(await pdf.getOutline(), 0);
  return out.slice(0, 200);
}
// Borra carpetas de subidas viejas o a medias; se conserva la anterior, por si alguien la tiene abierta.
async function limpiaLibro(id, quedan) {
  const st = sb.storage.from('libros'), { data } = await st.list(String(id), { limit: 100 });
  for (const c of data || []) {
    if (quedan.some(v => c.name === `v${v}`) || !/^v\d+$/.test(c.name)) continue;
    const { data: fs } = await st.list(`${id}/${c.name}`, { limit: 1000 });
    if (fs && fs.length) await st.remove(fs.map(x => `${id}/${c.name}/${x.name}`));
  }
}
const LADO = 1500;   // ancho de cada página en píxeles
function subeLibro(l, archivo) {
  let para = false;
  const d = ventana(`<div class="pn-form1"><h2>Subiendo «${esc(l.titulo)}»</h2><p data-t>Abriendo el PDF…</p><span class="mini-bar"><i style="width:0%"></i></span><p class="pn-count">No cierres esta ventana hasta que termine.</p><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button></div></div>`, null, true);
  d.addEventListener('close', () => { para = true; });
  const t = $('[data-t]', d), barra = $('.mini-bar i', d);
  (async () => {
    const lib = await cargaPdf(), pdf = await lib.getDocument({ data: await archivo.arrayBuffer(), isEvalSupported: false }).promise;
    // Carpeta nueva en cada subida (la hora en segundos): nunca se escribe sobre páginas que alguien esté leyendo.
    const version = Math.floor(Date.now() / 1000), N = pdf.numPages, indice = await pdfIndice(pdf);
    const cv = document.createElement('canvas'), g = cv.getContext('2d');
    for (let n = 1; n <= N; n++) {
      if (para) return;
      const pg = await pdf.getPage(n), v0 = pg.getViewport({ scale: 1 }), vp = pg.getViewport({ scale: LADO / v0.width });
      cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
      g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height);
      await pg.render({ canvasContext: g, viewport: vp }).promise;
      const blob = await new Promise(r => cv.toBlob(r, 'image/webp', .8));
      if (!blob || blob.type !== 'image/webp') throw new Error('Este navegador no crea WebP. Usa Chrome o Edge.');
      for (let k = 0; ; k++) {
        const { error } = await sb.storage.from('libros').upload(`${l.id}/v${version}/${String(n).padStart(4, '0')}.webp`, blob, { contentType: 'image/webp', upsert: true });
        if (!error) break;
        if (k === 2) throw error;
        await new Promise(r => setTimeout(r, 1500));
      }
      pg.cleanup();
      t.textContent = `Página ${n} de ${N}`; barra.style.width = `${(100 * n) / N}%`;
    }
    if (para) return;
    // Solo al terminar se cambia la versión: mientras tanto se sigue leyendo la anterior.
    await tiendaAdm('libro_guardar', { id: l.id, paginas: N, version, indice });
    await limpiaLibro(l.id, [version, l.version]).catch(() => {});
    d.close(); toast(`«${l.titulo}» quedó listo: ${N} páginas`); vTienda();
  })().catch(e => { if (para) return; t.textContent = `No se pudo terminar: ${errTexto(e)}`; t.classList.add('bad'); });
}

// ---------- ficha del estudiante: libros, horas y pedidos ----------
async function fichaTienda(id, caja) {
  let r; try { r = await tiendaAdm('usuario', { usuario: id }); } catch (e) { caja.innerHTML = `<p class="pn-state bad">${esc(errTexto(e))}</p>`; return; }
  const otra = () => fichaTienda(id, caja), H = { general: 'Generales', universidad: 'De universidad', grupo: 'En grupo' };
  caja.innerHTML = `<div class="pn-head"><h2>Libros y asesorías</h2><span class="pn-acc"><button class="btn small ghost" type="button" data-l>Dar libros</button><button class="btn small ghost" type="button" data-h>Ajustar horas</button></span></div>
    <div class="pn-tiles chico">${Object.entries(H).map(([k, t]) => tile(r.saldo[k], `Horas ${t.toLowerCase()}`)).join('')}</div>
    ${tabla([{ t: 'Libro digital' }, { t: 'Hasta' }, { t: '' }], r.libros.map(l => `<tr><td class="pn-main">Libro ${l.libro}</td>${td('Hasta', fechaCorta(l.hasta))}${td('', `<button class="btn small ghost" type="button" data-q="${l.libro}">Quitar</button>`, 'pn-num')}</tr>`), 'No tiene libros digitales.')}
    ${r.pedidos.length ? tabla([{ t: 'Pedido' }, { t: 'Artículos' }, { t: 'Total', n: 1 }, { t: 'Estado' }], r.pedidos.map(p => `<tr><td class="pn-main">${p.id}<span class="pn-sub">${fechaCorta(p.creado_en)}</span></td>${td('Artículos', `<span>${pedItems(p)}</span>`)}${td('Total', cop(p.total), 'pn-num')}${td('Estado', `<span class="pill ${PED[p.estado][0]}">${PED[p.estado][1]}</span>`)}</tr>`), '') : ''}`;
  $$('[data-q]', caja).forEach(b => { b.onclick = async () => { if (await confirma({ titulo: '¿Quitar este libro?', texto: 'Deja de poder leerlo.', ok: 'Quitar', peligro: true })) ocupado(b, async () => { await tiendaAdm('libro_quitar', { usuario: id, libro: Number(b.dataset.q) }); otra(); }); }; });
  $('[data-l]', caja).onclick = () => ventana(`<form class="pn-form1"><h2>Dar libros digitales</h2><fieldset class="pn-checks"><legend>Libros</legend>${[1, 2, 3, 4].map(n => `<label class="check"><input type="checkbox" name="l" value="${n}" checked><span>Libro ${n}</span></label>`).join('')}</fieldset><label class="fld"><span>Días</span><input name="dias" type="number" min="1" max="3650" value="365" required></label><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Dar</button></div></form>`, d => {
    $('form', d).onsubmit = e => { e.preventDefault(); const libros = $$('[name=l]:checked', d).map(x => Number(x.value)); if (!libros.length) return toast('Elige un libro', true); ocupado($('[type=submit]', d), async () => { await tiendaAdm('libros_dar', { usuario: id, libros, dias: Number(e.target.dias.value) }); d.close(); toast('Libros activados'); otra(); }); };
  });
  $('[data-h]', caja).onclick = () => ventana(`<form class="pn-form1"><h2>Ajustar horas</h2><label class="fld"><span>Tipo</span><select name="tipo">${Object.entries(H).map(([k, t]) => `<option value="${k}">${t}</option>`).join('')}</select></label><label class="fld"><span>Horas que suma (o resta, con −)</span><input name="cambio" type="number" min="-100" max="100" value="1" required></label><label class="fld"><span>Motivo</span><input name="motivo" maxlength="120"></label><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Guardar</button></div></form>`, d => {
    $('form', d).onsubmit = e => { e.preventDefault(); const f = e.target; ocupado($('[type=submit]', d), async () => { await tiendaAdm('horas_ajustar', { usuario: id, tipo: f.tipo.value, cambio: Number(f.cambio.value), motivo: f.motivo.value }); d.close(); toast('Horas ajustadas'); otra(); }); };
  });
}
