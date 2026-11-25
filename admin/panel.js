// Panel de administración de Zuka (/admin). Todo lo que muestra o cambia pasa por la función admin(p_accion, p) de la base,
// que comprueba es_admin() y deja rastro: esta página no guarda nada y sin rol admin no recibe datos.
// Vistas por ancla: #inicio, #estudiantes, #estudiante/<id>, #codigos, #solicitudes, #ventas, #cursos, #ajustes.
// Spec: docs/superpowers/specs/2026-11-24-acceso-por-codigo.md

const sb = window.supabase ? window.supabase.createClient(SUPA_URL, SUPA_KEY) : null;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const view = $('#pn-view');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const APP = location.origin + location.pathname.replace(/admin\/?(index\.html)?$/, '');
const METODOS = ['Nequi', 'Bancolombia', 'Daviplata', 'Efectivo', 'Otro'];
const ACCIONES = { generar: 'Generó códigos', activar: 'Activó cursos', acceso_fecha: 'Cambió una fecha', acceso_quitar: 'Quitó un curso', usuario_editar: 'Editó un estudiante',
  usuario_bloquear: 'Pausó o reanudó una cuenta', usuario_borrar: 'Eliminó una cuenta', usuario_unir: 'Unió dos cuentas', dispositivos_borrar: 'Liberó dispositivos', codigo_editar: 'Editó un código',
  codigo_borrar: 'Eliminó un código', codigo_renovar: 'Cambió un código', solicitud_estado: 'Atendió una solicitud', pago_borrar: 'Borró un pago', producto_guardar: 'Cambió un plan', producto_borrar: 'Borró un plan', pedido_pagar: 'Confirmó un pedido', pedido_estado: 'Cambió un pedido', articulo_guardar: 'Cambió un artículo', envio_guardar: 'Cambió un envío', libro_guardar: 'Cambió un libro', libros_dar: 'Dio libros', libro_quitar: 'Quitó un libro', horas_ajustar: 'Ajustó horas', asesoria_estado: 'Cambió una asesoría', ajustes_guardar: 'Cambió ajustes' };
let CURSOS = [], PRODUCTOS = [], AJUSTES = {}, lecciones = null, token = 0;

// ---------- ayudas ----------
let toastT = null;
function toast(msg, mal = false) {
  const t = $('#pn-toast'); t.textContent = msg; t.classList.toggle('bad', mal); t.hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, mal ? 5000 : 2600);
}
async function copiar(texto) {
  try { await navigator.clipboard.writeText(texto); } catch (e) {
    const ta = document.createElement('textarea'); ta.value = texto; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }
  toast('Copiado');
}
async function admin(accion, p = {}) {
  const { data, error } = await sb.rpc('admin', { p_accion: accion, p });
  if (error) throw error;
  return data;
}
const errTexto = e => (e && e.code === '42501' ? 'Esta cuenta no tiene permiso de administración.' : /fetch|network/i.test((e && e.message) || '') ? 'No hay conexión. Inténtalo de nuevo.' : (e && e.message) || 'No se pudo completar.');
async function ocupado(btn, fn) {
  if (btn.disabled) return;
  const txt = btn.textContent; btn.disabled = true; btn.textContent = 'Un momento…';
  try { await fn(); } catch (e) { toast(errTexto(e), true); }
  btn.disabled = false; btn.textContent = txt;
}
const curso = id => CURSOS.find(c => c.id === id) || { id, nombre: id };
const nombres = ids => ids.map(i => curso(i).nombre).join(', ').replace(/, ([^,]*)$/, ' y $1');
const mensaje = (numero, texto) => { const u = waLink(numero, texto); return u || `https://wa.me/?text=${encodeURIComponent(texto)}`; };
const waA = (numero, texto, rot = 'WhatsApp', cls = 'ghost') => `<a class="btn small ${cls}" target="_blank" rel="noopener" href="${esc(mensaje(numero, texto))}">${rot}</a>`;
const pillAcceso = (a, corto = false) => {
  const e = accesoCurso([a], a.curso), n = esc(curso(a.curso).nombre);
  const t = { pago: ['ok', e.dias != null ? diasTexto(e.dias) : 'activo'], prueba: ['warn', 'prueba'], vencido: ['bad', 'vencido'], prueba_vencida: ['bad', 'prueba terminada'] }[e.estado];
  return `<span class="pill ${t[0]}">${corto ? '' : `${n} · `}${t[1]}</span>`;
};
const estadoDe = u => (u.bloqueado ? 'pausa' : tienePago(u.accesos) ? 'pago' : u.accesos.some(a => accesoCurso([a], a.curso).estado === 'vencido') ? 'vencido' : u.accesos.some(a => accesoCurso([a], a.curso).estado === 'prueba') ? 'prueba' : 'nada');
const ESTADO = { pago: ['ok', 'Con plan'], prueba: ['warn', 'En prueba'], vencido: ['bad', 'Vencido'], pausa: ['bad', 'En pausa'], nada: ['', 'Sin acceso'] };
const pillEstado = e => `<span class="pill ${ESTADO[e][0]}">${ESTADO[e][1]}</span>`;
const diaCorto = d => `${Number(d.slice(8))} ${MESES[Number(d.slice(5, 7)) - 1]}`;
const diaMenos = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) - n * DIA_MS).toISOString().slice(0, 10);
const fechaInput = iso => (iso ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }) : '');
const mins = seg => Math.round((seg || 0) / 60);
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : '—');
function hace(iso) {
  if (!iso) return 'Nunca';
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / DIA_MS);
  return d <= 0 ? 'Hoy' : d === 1 ? 'Ayer' : `Hace ${d} días`;
}
const tile = (n, label, cls = '', ir = '') => (ir ? `<a class="pn-tile ${cls}" href="${ir}"><b>${n}</b><span>${label}</span></a>` : `<div class="pn-tile ${cls}"><b>${n}</b><span>${label}</span></div>`);
function barras(serie, unidad) {
  const max = Math.max(1, ...serie.map(x => x.v));
  return `<div class="pn-bars">${serie.map(x => `<div class="pn-bar" title="${x.t}: ${x.v} ${unidad}"><b>${x.m ?? (x.v || '')}</b><i style="height:${Math.round((100 * x.v) / max)}%"></i><small>${x.c}</small><span class="pn-sr">${x.t}: ${x.v} ${unidad}</span></div>`).join('')}</div>`;
}
const tabla = (cols, filas, vacio) => (filas.length ? `<div class="pn-tabla"><table class="pn-table"><thead><tr>${cols.map(c => `<th${c.n ? ' class="pn-num"' : ''}>${c.t}</th>`).join('')}</tr></thead><tbody>${filas.join('')}</tbody></table></div>` : `<p class="pn-state">${vacio}</p>`);
const td = (l, h, cls = '') => `<td data-l="${l}"${cls ? ` class="${cls}"` : ''}>${h}</td>`;
// Excel abre bien el CSV con punto y coma y BOM; lo que empieza como fórmula se protege.
function csv(nombre, cab, filas) {
  const q = v => { const s = String(v ?? ''); return `"${(/^[=+\-@\t]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`; };
  const b = new Blob([`﻿${[cab, ...filas].map(f => f.map(q).join(';')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `${nombre}-${fechaInput(new Date().toISOString())}.csv`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
const ICO = {
  tablero: '<path d="M4 4v16h16M8 15l4-5 3 3 5-7"/>',
  inicio: '<path d="M4 13h6V4H4zM14 20h6V4h-6zM4 20h6v-4H4z"/>', estudiantes: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c0-3.500 3-5.500 6.500-5.500s6.500 2 6.500 5.500M16 5a3.500 3.500 0 0 1 0 6.500M18 15c2.200.7 3.500 2.500 3.500 5"/>',
  codigos: '<circle cx="8" cy="15" r="4.500"/><path d="M11.500 11.500L20 3M17 6l3 3M14 9l2 2"/>', solicitudes: '<path d="M4 5h16v11H9l-5 4zM9 10h6"/>', pedidos: '<path d="M3.500 8L12 3.500 20.500 8v8L12 20.500 3.500 16zM3.500 8L12 12.500 20.500 8M12 12.500v8"/>',
  asesorias: '<rect x="4" y="5" width="16" height="15" rx="2.500"/><path d="M4 10h16M8 3v4M16 3v4"/>', ventas: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>', cursos: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>',
  tienda: '<path d="M5 8h14l1 12H4zM8.500 11V7a3.500 3.500 0 0 1 7 0v4"/>', ajustes: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>', app: '<path d="M14 5h5v5M19 5l-8 8M11 6H5v13h13v-6"/>',
  plan: '<path d="M5 12l5 5 9-10"/>', prueba: '<circle cx="12" cy="12" r="8.500"/><path d="M12 7v5l3 2"/>', vence: '<path d="M12 4l9 16H3zM12 10v4M12 17v.01"/>', uso: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
};
const ico = k => `<svg class="pn-i" viewBox="0 0 24 24" aria-hidden="true">${ICO[k] || ''}</svg>`;
const kpi = (i, n, label, cls = '', ir = '') => `<${ir ? `a href="${ir}"` : 'div'} class="pn-tile pn-kpi ${cls}"><span class="pn-kpi-i">${ico(i)}</span><span><b>${n}</b><span>${label}</span></span></${ir ? 'a' : 'div'}>`;
// Redondel con las iniciales; el color sale del nombre, siempre el mismo.
const iniciales = n => (String(n || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0]).join('') || '?').toUpperCase();
const avatar = n => `<span class="pn-av" aria-hidden="true" style="--h:${[...String(n || '')].reduce((t, c) => (t * 31 + c.charCodeAt(0)) % 360, 7)}">${esc(iniciales(n))}</span>`;
// Carga una vista: muestra «Cargando» solo si tarda y descarta la respuesta si ya se cambió de vista.
async function carga(fn, pinta) {
  const t = ++token, lento = setTimeout(() => { if (t === token) view.innerHTML = '<p class="pn-state">Cargando…</p>'; }, 150);
  try {
    const d = await fn();
    clearTimeout(lento);
    if (t === token) pinta(d);
  } catch (e) {
    clearTimeout(lento);
    if (t !== token) return;
    view.innerHTML = `<div class="pn-state bad"><p>${esc(errTexto(e))}</p><button class="btn ghost" type="button">Reintentar</button></div>`;
    $('button', view).onclick = ruta;
  }
}
async function base() {
  const [c, p, a] = await Promise.all([sb.from('cursos').select('*').order('orden'), sb.from('productos').select('*'), sb.from('ajustes').select('*')]);
  for (const r of [c, p, a]) if (r.error) throw r.error;
  CURSOS = c.data; PRODUCTOS = p.data; AJUSTES = Object.fromEntries(a.data.map(x => [x.clave, x.valor]));
}

// ---------- ventanas ----------
function ventana(html, bind, fija = false) {
  const d = document.createElement('dialog');
  d.className = 'pn-dialog'; d.innerHTML = html;
  document.body.appendChild(d);
  d.addEventListener('close', () => d.remove());
  if (fija) d.addEventListener('cancel', e => e.preventDefault());   // no se cierra con Escape ni tocando afuera
  else d.addEventListener('click', e => { if (e.target === d) d.close(); });
  $$('[data-cerrar]', d).forEach(b => { b.onclick = () => d.close(); });
  bind?.(d);
  d.showModal();
  return d;
}
// Pide confirmación; con `palabra` hay que escribirla (para lo que no tiene vuelta atrás).
function confirma({ titulo, texto, ok, palabra = '', peligro = false }) {
  return new Promise(res => {
    let si = false;
    const d = ventana(`<form method="dialog" class="pn-form1"><h2>${titulo}</h2><p>${texto}</p>
      ${palabra ? `<label class="fld"><span>Escribe ${palabra} para confirmar</span><input name="w" autocomplete="off"></label>` : ''}
      <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main${peligro ? ' peligro' : ''}" type="submit"${palabra ? ' disabled' : ''}>${ok}</button></div></form>`, x => {
      const b = $('[type=submit]', x), w = $('[name=w]', x);
      if (w) w.oninput = () => { b.disabled = w.value.trim().toUpperCase() !== palabra; };
      $('form', x).onsubmit = () => { si = true; };
    });
    d.addEventListener('close', () => res(si));
  });
}
const checksCursos = (sel = []) => `<fieldset class="pn-checks"><legend>Cursos</legend>${CURSOS.map(c => `<label class="check"><input type="checkbox" name="cursos" value="${c.id}"${sel.includes(c.id) ? ' checked' : ''}><span>${esc(c.nombre)}</span></label>`).join('')}</fieldset>`;
const camposAcceso = (tipo, sel, rotulo = 'Valor por persona (COP)') => `
  <div class="pn-seg" role="radiogroup" aria-label="Tipo de acceso"><label><input type="radio" name="tipo" value="prueba"${tipo === 'prueba' ? ' checked' : ''}><span>Prueba<small>primer mundo</small></span></label>
    <label><input type="radio" name="tipo" value="pago"${tipo === 'pago' ? ' checked' : ''}><span>Pagado<small>curso completo</small></span></label></div>
  ${checksCursos(sel)}
  <div class="pn-planes"></div>
  <div class="pn-dos"><label class="fld"><span data-dias>Días</span><input name="dias" type="number" min="1" max="3650" inputmode="numeric"></label>
    <label class="fld solo-pago"><span>${rotulo}</span><input name="valor" type="number" min="0" step="1000" inputmode="numeric"></label>
    <label class="fld solo-pago"><span>Medio de pago</span><select name="metodo">${METODOS.map(m => `<option>${m}</option>`).join('')}</select></label></div>`;
// Botones de 1, 3, 6 meses según los cursos marcados: llenan los días y el valor.
function bindAcceso(f, { meses = null, precio = null, llena = true } = {}) {
  const marca = () => $$('[name=cursos]:checked', f).map(x => x.value);
  let elegido = meses;
  const pinta = () => {
    const pago = $('[name=tipo]:checked', f).value === 'pago', ids = marca();
    $$('.solo-pago', f).forEach(x => { x.hidden = !pago; });
    $('[data-dias]', f).textContent = pago ? 'Días de acceso' : 'Días de prueba (vacío: sin límite)';
    const com = pago && ids.length ? [...new Set(PRODUCTOS.filter(p => (p.activo || p.meses === meses) && ids.includes(p.curso)).map(p => p.meses))].filter(m => ids.every(i => PRODUCTOS.some(p => p.curso === i && (p.activo || m === meses) && p.meses === m))).sort((a, b) => a - b) : [];
    const box = $('.pn-planes', f);
    box.innerHTML = com.map(m => `<button type="button" class="chip${m === elegido ? ' on' : ''}" data-m="${m}" aria-pressed="${m === elegido}">${mesesTexto(m)}</button>`).join('');
    const pone = m => {
      elegido = m;
      const ps = ids.map(i => PRODUCTOS.find(p => p.curso === i && p.meses === m));
      f.dias.value = Math.max(...ps.map(p => p.dias));
      if (llena) f.valor.value = m === meses && precio != null && ids.length === 1 ? precio : ps.every(p => p.precio != null) ? ps.reduce((t, p) => t + p.precio, 0) : '';
    };
    $$('[data-m]', box).forEach(b => { b.onclick = () => { pone(+b.dataset.m); pinta(); }; });
    if (pago && com.length && (!com.includes(elegido))) { pone(com[com.length - 1]); return pinta(); }
    if (pago && com.includes(elegido) && !f.dias.value) pone(elegido);
    if (!pago || !com.length) elegido = null;
    if (pago && !com.length && llena) f.valor.value = '';
  };
  f.addEventListener('change', e => { if (e.target.name === 'tipo') { f.dias.value = ''; elegido = null; } if (['tipo', 'cursos'].includes(e.target.name)) { if (e.target.name === 'cursos') { const m = elegido; f.dias.value = ''; elegido = m; } pinta(); } });
  pinta();
}
const leeAcceso = f => ({ tipo: $('[name=tipo]:checked', f).value, cursos: $$('[name=cursos]:checked', f).map(x => x.value), dias: f.dias.value ? Number(f.dias.value) : null,
  valor: f.valor && f.valor.value ? Math.round(Number(f.valor.value)) : 0, metodo: f.metodo ? f.metodo.value : '' });
// Activa cursos en un código o en estudiantes, y al terminar deja lista la confirmación por WhatsApp.
function dlgActivar({ codigo = '', usuarios = [], nombre = '', celular = '', sel = [], meses = null, precio = null, titulo = 'Activar cursos', tipo = 'pago' }, hecho) {
  ventana(`<form class="pn-form1" novalidate><h2>${titulo}</h2><p class="pn-count">${usuarios.length > 1 ? `${usuarios.length} estudiantes` : esc(nombre || (codigo ? muestraCodigo(codigo) : ''))}. El avance no cambia; si el curso sigue vigente, los días se suman.</p>
    ${camposAcceso(tipo, sel)}<label class="fld"><span>Nota (opcional)</span><input name="nota" maxlength="200"></label>
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Activar</button></div></form>`, d => {
    const f = $('form', d);
    bindAcceso(f, { meses, precio });
    f.onsubmit = e => {
      e.preventDefault();
      const v = leeAcceso(f);
      if (!v.cursos.length) return toast('Elige al menos un curso', true);
      ocupado($('[type=submit]', f), async () => {
        await admin('activar', { ...v, codigo, usuarios, nota: f.nota.value });
        d.close(); hecho?.();
        if (usuarios.length > 1) return toast('Cursos activados');
        const uid = usuarios[0];
        let acc = [];
        try { if (uid) acc = (await admin('usuario', { usuario: uid })).accesos; } catch (e2) { /* ya quedó activo: solo falta la fecha en el mensaje */ }
        const hasta = acc.filter(a => v.cursos.includes(a.curso)).map(a => a.hasta).sort()[0];
        ventana(`<div class="pn-form1"><h2>Listo</h2><p>${esc(nombres(v.cursos))} ${v.tipo === 'pago' ? 'quedó activo' : 'quedó en prueba'}${hasta ? ` hasta el ${fechaCorta(hasta)}` : ''}.</p>
          <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button>${waA(celular, WA.activado({ nombre, codigo, cursos: nombres(v.cursos), hasta, url: APP }), 'Avisar por WhatsApp', 'main')}</div></div>`);
      });
    };
  });
}

// ---------- entrada ----------
async function entrar() {
  if (!sb) { view.innerHTML = '<p class="pn-state bad">No se pudo cargar el panel. Revisa tu conexión y recarga.</p>'; return; }
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return login();
  let es = false;
  try { const r = await sb.rpc('es_admin'); if (r.error) throw r.error; es = r.data; if (es) await base(); } catch (e) {
    view.innerHTML = `<div class="pn-state bad"><p>${esc(errTexto(e))}</p><button class="btn ghost" type="button">Reintentar</button></div>`;
    $('button', view).onclick = entrar; return;
  }
  $('.pn-user').hidden = false; $('.pn-mail').textContent = session.user.email;
  if (!es) { view.innerHTML = '<p class="pn-state bad">Esta cuenta no tiene permiso de administración.<br>Cierra sesión y entra con la cuenta administradora.</p>'; return; }
  document.body.classList.add('dentro');
  $('.pn-nav').hidden = false;
  if (!ruta.lista) { ruta.lista = true; $$('[data-ico]').forEach(a => a.insertAdjacentHTML('afterbegin', ico(a.dataset.ico))); }
  addEventListener('hashchange', ruta);
  ruta(); tiendaConteo();
}
function login() {
  document.body.classList.remove('dentro');
  $('.pn-nav').hidden = true; $('.pn-user').hidden = true;
  view.innerHTML = `<form class="pn-card pn-login acct-form" novalidate><h1>Entrar al panel</h1>
    <label class="fld"><span>Correo</span><input name="correo" type="email" autocomplete="email" required></label>
    <label class="fld"><span>Contraseña</span><input name="clave" type="password" autocomplete="current-password" required></label>
    <p class="form-msg bad" role="alert" hidden></p>
    <button class="btn main" type="submit">Entrar</button></form>`;
  const f = $('form', view), msg = $('.form-msg', view);
  f.onsubmit = e => {
    e.preventDefault();
    ocupado($('button', f), async () => {
      msg.hidden = true;
      const { error } = await sb.auth.signInWithPassword({ email: f.correo.value.trim(), password: f.clave.value });
      if (error) { msg.textContent = authError(error); msg.hidden = false; return; }
      entrar();
    });
  };
}
$('[data-salir]').onclick = async () => { await sb.auth.signOut({ scope: 'local' }); Object.assign(TB, { D: null, x: null, f: { dias: 30 } }); removeEventListener('hashchange', ruta); login(); };
function ruta() {
  const [name, arg] = (location.hash.slice(1) || 'inicio').split('/');
  $$('.pn-nav a').forEach(a => { const on = a.getAttribute('href') === `#${name === 'estudiante' ? 'estudiantes' : name}`; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  ({ inicio: vInicio, tablero: vTablero, estudiantes: vEstudiantes, estudiante: () => vEstudiante(arg), codigos: vCodigos, solicitudes: vSolicitudes, pedidos: vPedidos, asesorias: vAsesorias, tienda: vTienda, ventas: vVentas, cursos: vCursos, ajustes: vAjustes }[name] || vInicio)();
  scrollTo(0, 0);
}
function pendientes(n) { const x = $('.pn-nav [data-n="solicitudes"]'); x.textContent = n || ''; x.hidden = !n; }

// ---------- 1. inicio ----------
function vInicio() {
  carga(async () => { const [r, n] = await Promise.all([admin('resumen'), tiendaAdm('conteo').catch(() => null)]); return { r, n }; }, ({ r, n }) => {
    pendientes(r.solicitudes); if (n) tiendaBadges(n);
    const falta = !waNumero(AJUSTES.whatsapp), hoy = new Date().toLocaleDateString('es-CO', { timeZone: 'America/Bogota', weekday: 'long', day: 'numeric', month: 'long' });
    const haz = [['solicitudes', r.solicitudes, 'solicitud de compra', 'solicitudes de compra'], ['pedidos', n?.pedidos, 'pedido por atender', 'pedidos por atender'], ['asesorias', n?.asesorias, 'asesoría por confirmar', 'asesorías por confirmar']].filter(x => x[1]);
    const tope = Math.max(1, ...r.por_curso.map(c => c.pago + c.prueba)), meses = r.ventas_mes || [];
    view.innerHTML = `<div class="pn-head"><div><h1>Así va Zuka</h1><p class="pn-hoy">${hoy}</p></div><div class="pn-acc"><a class="btn ghost" href="#tablero">Ver tablero</a><button class="btn main" type="button" data-gen>Crear código</button></div></div>
      ${falta ? '<a class="pn-aviso" href="#ajustes">Falta el número de WhatsApp: sin él, la app no puede ofrecer pedir códigos ni comprar. Ponlo en Ajustes.</a>' : ''}
      <section class="pn-haz${haz.length || !n ? '' : ' ok'}" aria-label="Por atender">${haz.length ? haz.map(([k, c, uno, varios]) => `<a href="#${k}">${ico(k)}<span><b>${c}</b> ${c === 1 ? uno : varios}</span><em>Atender</em></a>`).join('') : !n ? `<p>${ico('vence')}<span>No se pudieron consultar los pedidos y las asesorías. Recarga para intentarlo de nuevo.</span></p>` : `<p>${ico('plan')}<span><b>Todo al día.</b> No hay solicitudes, pedidos ni asesorías por atender.</span></p>`}</section>
      <div class="pn-tiles pn-kpis">${kpi('plan', r.pago, 'Con plan activo', 'ok', '#estudiantes')}${kpi('prueba', r.prueba, 'En prueba')}${kpi('vence', r.vencidos, 'Con plan vencido', r.vencidos ? 'bad' : '')}${kpi('ventas', cop(r.ventas_30), `Ventas en 30 días (${r.pagos_30})`, '', '#ventas')}${kpi('codigos', r.codigos_libres, 'Códigos sin estrenar', '', '#codigos')}${kpi('uso', r.usan_hoy, `Entraron hoy · ${r.usan_7} en 7 días`)}</div>
      <div class="pn-dash"><section class="pn-card"><div class="pn-head"><h2>Minutos de estudio por día</h2><span class="pn-count">${r.lecciones_7} lecciones y ${pct(r.aciertos_7, r.ejercicios_7)} de aciertos en 7 días</span></div>
          ${r.serie.some(x => x.minutos) ? barras(r.serie.map(x => ({ t: diaCorto(x.dia), c: Number(x.dia.slice(8)), v: x.minutos })), 'min') : '<p class="pn-state">Aún no hay tiempo de estudio.</p>'}</section>
        <section class="pn-card"><h2>Vencen en 7 días</h2>${r.vencen_7.length ? `<ul class="pn-vence">${r.vencen_7.map(u => `<li>${avatar(u.nombre)}<span><a href="#estudiante/${u.id}">${esc(u.nombre || 'Sin nombre')}</a><small>${esc(curso(u.curso).nombre)} · ${fechaCorta(u.hasta)}</small></span>${waA(u.telefono, WA.vence({ nombre: u.nombre, curso: curso(u.curso).nombre, hasta: u.hasta }), 'Recordar')}</li>`).join('')}</ul>` : '<p class="pn-state">Ningún plan vence esta semana.</p>'}</section>
        <section class="pn-card"><h2>Cursos</h2><ul class="pn-cbar">${r.por_curso.map(c => `<li><span class="pn-cb-t"><b>${esc(c.nombre)}</b>${c.publicado ? '<span class="pill ok">Publicado</span>' : '<span class="pill">Solo asignados</span>'}</span><span class="pn-cb-b" aria-hidden="true"><i style="width:${(100 * c.pago) / tope}%"></i><i class="p" style="width:${(100 * c.prueba) / tope}%"></i></span><small>${c.pago} con plan · ${c.prueba} en prueba · ${c.completadas} lecciones completadas</small></li>`).join('') || '<li class="pn-state">No hay cursos.</li>'}</ul></section>
        <section class="pn-card"><div class="pn-head"><h2>Ventas por mes</h2><a class="pn-count" href="#ventas">Ver ventas</a></div>${meses.length ? barras(meses.map(x => ({ t: `${MESES[Number(x.mes.slice(5)) - 1]} ${x.mes.slice(0, 4)}`, c: MESES[Number(x.mes.slice(5)) - 1], v: x.valor, m: x.valor ? `${Math.round(x.valor / 1000)} k` : '' })), 'COP') : '<p class="pn-state">Aún no hay ventas.</p>'}</section></div>
      <p class="pn-count">Las cifras cuentan estudiantes, no cuentas administradoras.</p>`;
    $('[data-gen]', view).onclick = () => dlgCodigo();
  });
}
const filas = () => $$('tr[data-id]', view).forEach(tr => { tr.onclick = e => { if (!e.target.closest('a, button, input, label')) location.hash = `estudiante/${tr.dataset.id}`; }; });

// ---------- 2. estudiantes ----------
const fil = { q: '', estado: '', curso: '', orden: 'reciente' };
function vEstudiantes() {
  carga(() => admin('usuarios'), us => {
    us.forEach(u => { u.e = estadoDe(u); });
    const el = new Set();
    view.innerHTML = `<div class="pn-head"><h1>Estudiantes</h1><div class="pn-acc"><button class="btn ghost" type="button" data-csv>Descargar Excel</button><button class="btn main" type="button" data-gen>Crear código</button></div></div>
      <div class="pn-chips" role="radiogroup" aria-label="Estado">${[['', 'Todos'], ...Object.entries(ESTADO).map(([k, v]) => [k, v[1]]), ['admin', 'Administradores']].map(([k, t]) => `<label><input type="radio" name="estado" value="${k}"${fil.estado === k ? ' checked' : ''}><span>${t} <b>${us.filter(u => (k === 'admin' ? u.rol === 'admin' : u.rol !== 'admin' && (!k || u.e === k))).length}</b></span></label>`).join('')}</div>
      <div class="pn-filters tres"><label class="fld"><span>Buscar</span><input type="search" name="q" placeholder="Nombre, celular, correo o código" value="${esc(fil.q)}"></label>
        <label class="fld"><span>Curso</span><select name="curso"><option value="">Todos</option>${CURSOS.map(c => `<option value="${c.id}"${fil.curso === c.id ? ' selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select></label>
        <label class="fld"><span>Orden</span><select name="orden">${[['reciente', 'Más nuevos'], ['vence', 'Vence antes'], ['uso', 'Entró hace poco']].map(([k, t]) => `<option value="${k}"${fil.orden === k ? ' selected' : ''}>${t}</option>`).join('')}</select></label></div>
      <div class="pn-lote" hidden><b></b><button class="btn small main" type="button" data-lote>Asignar cursos</button><button class="btn small ghost" type="button" data-nada>Quitar selección</button></div>
      <p class="pn-count"></p><div class="pn-list"></div>`;
    const vence = u => Math.min(...u.accesos.filter(a => a.hasta && vigente(a.hasta, Date.now())).map(a => +new Date(a.hasta)), Infinity);
    const visibles = () => {
      const q = fil.q.trim().toLowerCase(), cod = limpiaCodigo(q);
      return us.filter(u => (fil.estado === 'admin' ? u.rol === 'admin' : u.rol !== 'admin') && (!fil.estado || fil.estado === 'admin' || u.e === fil.estado) && (!fil.curso || u.accesos.some(a => a.curso === fil.curso))
        && (!q || `${u.nombre} ${u.correo} ${u.telefono} ${u.nota}`.toLowerCase().includes(q) || (cod.length >= 3 && (u.codigo || '').includes(cod))))
        .sort((a, b) => (fil.orden === 'vence' ? vence(a) - vence(b) || 0 : fil.orden === 'uso' ? (b.ultima_vez || '').localeCompare(a.ultima_vez || '') : b.creado_en.localeCompare(a.creado_en)));
    };
    const lote = () => { const l = $('.pn-lote', view); l.hidden = !el.size; $('b', l).textContent = `${el.size} ${el.size === 1 ? 'elegido' : 'elegidos'}`; };
    const pinta = () => {
      const rows = visibles();
      $('.pn-count', view).textContent = `${rows.length} ${rows.length === 1 ? 'resultado' : 'resultados'}`;
      $('.pn-list', view).innerHTML = tabla([{ t: '<input type="checkbox" data-todos aria-label="Elegir todos">' }, { t: 'Estudiante' }, { t: 'Código' }, { t: 'Estado' }, { t: 'Cursos' }, { t: 'Último ingreso' }, { t: 'Lecciones', n: 1 }], rows.map(u => `<tr data-id="${u.id}">
        ${td('Elegir', u.rol === 'admin' ? '' : `<input type="checkbox" data-el="${u.id}" aria-label="Elegir a ${esc(u.nombre || 'sin nombre')}"${el.has(u.id) ? ' checked' : ''}>`, 'pn-check')}
        <td class="pn-main"><span class="pn-per">${avatar(u.nombre)}<span><a href="#estudiante/${u.id}">${esc(u.nombre || 'Sin nombre')}</a>${u.rol === 'admin' ? ' <span class="pill">Admin</span>' : ''}<span class="pn-sub">${esc([u.telefono, u.correo].filter(Boolean).join(' · ') || 'Sin datos de contacto')}</span></span></span></td>
        ${td('Código', u.codigo ? `<span class="pn-code">${muestraCodigo(u.codigo)}</span>` : '—')}${td('Estado', u.rol === 'admin' ? '—' : pillEstado(u.e))}${td('Cursos', u.accesos.length ? `<span class="pn-pills">${u.accesos.slice(0, 3).map(a => pillAcceso(a)).join('')}${u.accesos.length > 3 ? `<span class="pill">+${u.accesos.length - 3}</span>` : ''}</span>` : '—')}
        ${td('Último ingreso', hace(u.ultima_vez))}${td('Lecciones', u.lecciones, 'pn-num')}</tr>`), us.length ? 'Nadie coincide con el filtro.' : 'Aún no hay estudiantes. Crea el primer código.');
      filas();
      $$('[data-el]', view).forEach(c => { c.onchange = () => { c.checked ? el.add(c.dataset.el) : el.delete(c.dataset.el); lote(); }; });
      const t = $('[data-todos]', view); if (t) t.onchange = () => { visibles().filter(u => u.rol !== 'admin').forEach(u => (t.checked ? el.add(u.id) : el.delete(u.id))); pinta(); $('[data-todos]', view).checked = t.checked; };
      lote();
    };
    $$('.pn-filters [name], .pn-chips [name]', view).forEach(x => { x.oninput = () => { fil[x.name] = x.value; pinta(); }; });
    $('[data-gen]', view).onclick = () => dlgCodigo({}, vEstudiantes);
    $('[data-nada]', view).onclick = () => { el.clear(); pinta(); };
    $('[data-lote]', view).onclick = () => { const ids = [...el], u = us.find(x => x.id === ids[0]); dlgActivar({ usuarios: ids, nombre: u.nombre, celular: u.telefono, codigo: ids.length === 1 ? '' : '', titulo: 'Asignar cursos' }, vEstudiantes); };
    $('[data-csv]', view).onclick = () => csv('zuka-estudiantes', ['Nombre', 'Celular', 'Correo', 'Código', 'Estado', 'Cursos', 'Género', 'Edad', 'Ciudad', 'Ocupación', 'Institución', 'Meta', 'Presenta examen', 'Horas por semana', 'Le cuesta', 'Cómo nos conoció', 'Acepta mensajes', 'Registro', 'Último ingreso', 'Lecciones', 'Minutos en 7 días', 'Nota'],
      visibles().map(u => [u.nombre, u.telefono, u.correo, u.codigo, ESTADO[u.e][1], u.accesos.map(a => `${curso(a.curso).nombre} (${a.tipo}${a.hasta ? ` hasta ${fechaCorta(a.hasta)}` : ''})`).join(', '), ...['genero', 'edad'].map(k => (u[k] ? datoTexto(k, u[k]) : '')), u.ciudad, u.ocupacion ? datoTexto('ocupacion', u.ocupacion) : '', u.institucion, u.meta, ...['presentacion', 'horas'].map(k => (u[k] ? datoTexto(k, u[k]) : '')), u.dificultad, u.medio ? datoTexto('medio', u.medio) : '', u.acepta_mensajes ? 'Sí' : 'No', fechaCorta(u.creado_en), hace(u.ultima_vez), u.lecciones, u.minutos_7, u.nota]));
    pinta();
  });
}

// ---------- 3. un estudiante ----------
async function cargaLecciones() {
  if (lecciones) return lecciones;
  const r = await sb.from('lecciones').select('id,tipo,curso,titulo');
  if (r.error) throw r.error;
  return (lecciones = r.data);
}
function vEstudiante(id) {
  carga(async () => { const [d] = await Promise.all([admin('usuario', { usuario: id }), cargaLecciones()]); return d; }, d => {
    if (!d || !d.perfil) { view.innerHTML = '<a class="pn-back" href="#estudiantes">← Estudiantes</a><p class="pn-state">No existe esa cuenta.</p>'; return; }
    const p = d.perfil, otra = () => vEstudiante(id), esA = p.rol === 'admin', cod = (d.codigos[0] || {}).codigo || '';
    const correo = d.correo_contacto || (/@codigo\.invalid$/.test(p.correo || '') ? '' : p.correo || '');   // p.correo: el de la sesión
    const u = { accesos: d.accesos, bloqueado: p.bloqueado };
    const hechas = new Set(d.progreso.filter(g => g.completada).map(g => g.leccion)), tocadas = new Map(d.progreso.map(g => [g.leccion, g.actualizado_en]));
    const avance = CURSOS.map(c => { const ls = lecciones.filter(l => l.curso === c.id && l.tipo === 'leccion'); return { c, total: ls.length, n: ls.filter(l => hechas.has(l.id)).length, toca: ls.some(l => tocadas.has(l.id)) }; }).filter(x => x.toca);
    const porDia = new Map(d.uso.map(x => [x.dia, x])), T = d.uso_total;
    const serie = Array.from({ length: 14 }, (_, k) => { const dia = diaMenos(d.hoy, 13 - k); return { t: diaCorto(dia), c: Number(dia.slice(8)), v: mins((porDia.get(dia) || {}).segundos) }; });
    const dato = (l, v) => `<div><dt>${l}</dt><dd>${esc(v || '—')}</dd></div>`, dt = k => (p[k] ? datoTexto(k, p[k]) : '');
    const pend = d.solicitudes.filter(s => s.estado === 'pendiente');
    view.innerHTML = `<a class="pn-back" href="#estudiantes">← Estudiantes</a>
      <div class="pn-head"><div class="pn-quien">${avatar(p.nombre)}<h1>${esc(p.nombre || 'Sin nombre')}</h1>${esA ? '<span class="pill">Administrador</span>' : pillEstado(estadoDe(u))}</div>
        <div class="pn-acc">${waA(p.telefono, `Hola${p.nombre ? ` ${p.nombre}` : ''},`)}${esA ? '' : '<button class="btn main" type="button" data-a="activar">Activar o renovar</button>'}</div></div>
      ${pend.map(s => `<div class="pn-aviso">Pidió comprar <b>${esc(curso(s.curso).nombre)}</b> por ${mesesTexto(s.meses)}. <button class="btn small main" type="button" data-sol="${s.id}">Confirmar pago</button></div>`).join('')}
      <div class="pn-cols"><section class="pn-card"><div class="pn-head"><h2>Cursos</h2>${esA ? '' : '<button class="btn small ghost" type="button" data-a="asignar">Asignar curso</button>'}</div>
        ${tabla([{ t: 'Curso' }, { t: 'Acceso' }, { t: 'Hasta' }, { t: '' }], d.accesos.map(a => `<tr><td class="pn-main">${esc(curso(a.curso).nombre)}<span class="pn-sub">${a.tipo === 'pago' ? `Desde el ${fechaCorta(a.desde)}` : 'Primer mundo'}</span></td>${td('Acceso', pillAcceso(a, true))}
          ${td('Hasta', `<input class="pn-fecha" type="date" min="2024-01-01" max="2100-01-01" data-fecha="${a.curso}" value="${fechaInput(a.hasta)}" aria-label="Fecha de vencimiento de ${esc(curso(a.curso).nombre)}">`)}${td('', `<button class="btn small main" type="button" data-guarda="${a.curso}" hidden>Guardar fecha</button> <button class="btn small ghost" type="button" data-quita="${a.curso}">Quitar</button>`, 'pn-num')}</tr>`), esA ? 'Ve todos los cursos.' : 'No tiene cursos asignados.')}</section>
        <section class="pn-card"><div class="pn-head"><h2>Código y dispositivos</h2></div>
          ${d.codigos.map(k => `<div class="pn-cod"><span class="pn-code">${muestraCodigo(k.codigo)}</span>${k.bloqueado ? '<span class="pill bad">En pausa</span>' : ''}<span class="pn-acc"><button class="btn small ghost" type="button" data-copy="${k.codigo}">Copiar</button>${waA(p.telefono || k.celular, WA.envio({ nombre: p.nombre, codigo: k.codigo, cursos: nombres(d.accesos.map(a => a.curso)) || 'tus cursos', prueba: !tienePago(d.accesos), url: APP }), 'Enviar')}<button class="btn small ghost" type="button" data-renueva="${k.codigo}">Cambiar código</button></span></div>`).join('') || `<p class="pn-state">Entra con correo${correo ? `: ${esc(correo)}` : ''}.</p>`}
          ${d.dispositivos.length ? `<ul class="pn-disp">${d.dispositivos.map(x => `<li><span>${esc(x.nombre || 'Dispositivo')}<small>${hace(x.visto_en)}</small></span><button class="btn small ghost" type="button" data-disp="${esc(x.id)}">Liberar</button></li>`).join('')}</ul>` : ''}</section></div>
      <section class="pn-card"><div class="pn-head"><h2>Datos</h2><button class="btn small ghost" type="button" data-a="editar">Editar</button></div>
        ${p.datos_en ? '' : '<p class="pn-count">Aún no ha completado sus datos: la app se los pide al tener un curso pagado.</p>'}
        <dl class="pn-facts">${dato('Celular', p.telefono)}${dato('Correo', correo)}${dato('Género', dt('genero'))}${dato('Edad', dt('edad'))}${dato('Ciudad', p.ciudad)}${dato('Qué hace', dt('ocupacion'))}${dato('Institución', p.institucion)}${dato('Meta', p.meta)}${dato('Presenta examen', dt('presentacion'))}${dato('Estudia por semana', dt('horas'))}${dato('Le cuesta', p.dificultad)}${dato('Nos conoció por', dt('medio'))}${dato('Acepta mensajes', p.datos_en ? (p.acepta_mensajes ? 'Sí' : 'No') : '')}${dato('Registro', fechaCorta(p.creado_en))}</dl>
        ${d.nota ? `<p class="pn-nota"><b>Nota:</b> ${esc(d.nota)}</p>` : ''}</section>
      <div class="pn-cols"><section class="pn-card"><h2>Uso</h2><div class="pn-tiles chico">${tile(hace(p.ultima_vez), 'Último ingreso')}${tile(hechas.size, 'Lecciones')}${tile(pct(T.aciertos, T.ejercicios), 'Aciertos')}${tile(`${mins(T.segundos)} min`, 'En total')}${tile(p.xp, 'XP')}${tile(diasTexto(p.racha), 'Racha')}</div>
          ${T.dias ? `<h3>Minutos por día</h3>${barras(serie, 'min')}` : '<p class="pn-state">Aún no tiene tiempo de uso.</p>'}</section>
        <section class="pn-card"><h2>Avance</h2>${avance.length ? `<div class="pn-prog">${avance.map(x => `<div><span>${esc(x.c.nombre)}</span><span>${x.n}/${x.total}</span><span class="mini-bar"><i style="width:${(100 * x.n) / x.total}%"></i></span></div>`).join('')}</div>` : '<p class="pn-state">Aún no ha empezado.</p>'}
          <h2>Pagos</h2>${tabla([{ t: 'Fecha' }, { t: 'Curso' }, { t: 'Valor', n: 1 }], d.pagos.map(g => `<tr>${td('Fecha', fechaCorta(g.creado_en))}${td('Curso', `${esc(curso(g.curso).nombre)}${g.dias ? ` · ${diasTexto(g.dias)}` : ''}`)}${td('Valor', `${cop(g.valor)}${g.metodo ? ` <span class="pn-sub">${esc(g.metodo)}</span>` : ''}`, 'pn-num')}</tr>`), 'Sin pagos registrados.')}</section></div>
      ${esA ? '' : '<section class="pn-card" data-tienda><p class="pn-state">Cargando…</p></section>'}
      ${esA ? '' : `<section class="pn-card pn-zona"><h2>Cuenta</h2><div class="pn-acc"><button class="btn ghost" type="button" data-a="unir">Unir con otra cuenta</button><button class="btn ghost" type="button" data-a="pausa">${p.bloqueado ? 'Reanudar acceso' : 'Pausar acceso'}</button><button class="btn ghost danger" type="button" data-a="borrar">Eliminar cuenta</button></div></section>`}`;
    if (!esA) fichaTienda(id, $('[data-tienda]', view));
    const hace1 = (b, fn, msg) => ocupado(b, async () => { await fn(); toast(msg); otra(); });
    const dat = { usuarios: [id], nombre: p.nombre, celular: p.telefono };
    const acts = {
      activar: () => dlgActivar({ ...dat, sel: d.accesos.slice(0, 1).map(a => a.curso), titulo: 'Activar o renovar' }, otra),
      asignar: () => dlgActivar({ ...dat, titulo: 'Asignar curso', tipo: 'prueba' }, otra),
      editar: () => ventana(`<form class="pn-form1"><h2>Editar datos</h2><label class="fld"><span>Nombre</span><input name="nombre" maxlength="80" value="${esc(p.nombre)}"></label><label class="fld"><span>Celular</span><input name="telefono" maxlength="30" value="${esc(p.telefono)}"></label>
        <label class="fld"><span>Correo de contacto</span><input name="correo" type="email" maxlength="120" value="${esc(correo)}"></label><label class="fld"><span>Nota (solo la ve la administración)</span><input name="nota" maxlength="400" value="${esc(d.nota)}"></label>
        <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Guardar</button></div></form>`, x => {
        $('form', x).onsubmit = e => { e.preventDefault(); ocupado($('[type=submit]', x), async () => { await admin('usuario_editar', { usuario: id, ...Object.fromEntries(new FormData(e.target)) }); x.close(); toast('Guardado'); otra(); }); };
      }),
      pausa: async b => { if (p.bloqueado || await confirma({ titulo: '¿Pausar el acceso?', texto: 'Sale de la app y no podrá entrar hasta que lo reanudes. Su avance y sus días se conservan.', ok: 'Pausar' })) hace1(b, () => admin('usuario_bloquear', { usuario: id, si: !p.bloqueado }), p.bloqueado ? 'Acceso reanudado' : 'Acceso en pausa'); },
      borrar: async b => { if (await confirma({ titulo: `¿Eliminar a ${esc(p.nombre || 'este estudiante')}?`, texto: 'Se borran su cuenta, su código, sus cursos, sus datos y todo su avance. No se puede deshacer. Los pagos quedan en Ventas.', ok: 'Eliminar para siempre', palabra: 'ELIMINAR', peligro: true })) ocupado(b, async () => { await admin('usuario_borrar', { usuario: id }); toast('Cuenta eliminada'); location.hash = 'estudiantes'; }); },
      unir: () => dlgUnir(id, p),
    };
    $$('[data-a]', view).forEach(b => { b.onclick = () => acts[b.dataset.a](b); });
    $$('[data-sol]', view).forEach(b => { b.onclick = () => { const s = pend.find(x => String(x.id) === b.dataset.sol); dlgActivar({ ...dat, sel: [s.curso], meses: s.meses, precio: s.precio, titulo: 'Confirmar pago' }, otra); }; });
    // Se guarda con su botón: al teclear el año, el campo pasa por fechas a medias.
    $$('[data-fecha]', view).forEach(i => {
      const b = $(`[data-guarda="${i.dataset.fecha}"]`, view), ini = i.value;
      i.oninput = () => { b.hidden = !i.value || i.value === ini; };
      b.onclick = () => { if (!i.checkValidity()) return toast('Elige una fecha válida', true); hace1(b, () => admin('acceso_fecha', { usuario: id, curso: i.dataset.fecha, hasta: i.value }), 'Fecha guardada'); };
    });
    $$('[data-quita]', view).forEach(b => { b.onclick = async () => { if (await confirma({ titulo: `¿Quitar ${esc(curso(b.dataset.quita).nombre)}?`, texto: 'Deja de tener ese curso y se pierden los días que le quedan. Su avance se conserva.', ok: 'Quitar', peligro: true })) hace1(b, () => admin('acceso_quitar', { usuario: id, curso: b.dataset.quita }), 'Curso quitado'); }; });
    $$('[data-copy]', view).forEach(b => { b.onclick = () => copiar(muestraCodigo(b.dataset.copy)); });
    $$('[data-renueva]', view).forEach(b => { b.onclick = () => renovar(b, b.dataset.renueva, p, otra); });
    $$('[data-disp]', view).forEach(b => { b.onclick = () => hace1(b, () => admin('dispositivos_borrar', { usuario: id, id: b.dataset.disp }), 'Dispositivo liberado: los demás volverán a pedir el código'); });
  });
}
async function renovar(b, codigo, p, hecho) {
  if (!await confirma({ titulo: '¿Cambiar el código?', texto: 'Úsalo si el código se filtró. El actual deja de servir y se cierran sus sesiones; la cuenta y el avance siguen igual.', ok: 'Cambiar código' })) return;
  ocupado(b, async () => {
    const k = await admin('codigo_renovar', { codigo });
    hecho?.();
    ventana(`<div class="pn-form1"><h2>Código nuevo</h2><p class="pn-code grande">${muestraCodigo(k.codigo)}</p><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button>${waA(p.telefono || k.celular, `Hola${p.nombre ? ` ${p.nombre}` : ''}, este es tu nuevo código de Zuka: *${muestraCodigo(k.codigo)}*. El anterior ya no sirve; tu avance sigue igual.`, 'Enviar por WhatsApp', 'main')}</div></div>`);
  });
}
// Dos códigos de la misma persona: el avance y los cursos de esta cuenta pasan a la otra.
async function dlgUnir(id, p) {
  let us; try { us = (await admin('usuarios')).filter(u => u.rol !== 'admin' && u.id !== id); } catch (e) { return toast(errTexto(e), true); }
  const rot = u => `${u.nombre || 'Sin nombre'}${u.codigo ? ` · ${muestraCodigo(u.codigo)}` : ''}${u.telefono ? ` · ${u.telefono}` : ''}`;
  ventana(`<form class="pn-form1"><h2>Unir con otra cuenta</h2><p>El avance, los cursos y el código de <b>${esc(p.nombre || 'esta cuenta')}</b> pasan a la cuenta que elijas, y esta se borra. Sirve si una persona terminó con dos códigos.</p>
    <label class="fld"><span>Cuenta que se conserva</span><select name="hacia" required><option value="">Elige…</option>${us.map(u => `<option value="${u.id}">${esc(rot(u))}</option>`).join('')}</select></label>
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Unir</button></div></form>`, x => {
    $('form', x).onsubmit = async e => {
      e.preventDefault();
      const hacia = e.target.hacia.value; if (!hacia) return;
      if (!await confirma({ titulo: '¿Unir las dos cuentas?', texto: 'Esta cuenta se borra después de pasar todo a la otra. No se puede deshacer.', ok: 'Unir', palabra: 'UNIR', peligro: true })) return;
      ocupado($('[type=submit]', x), async () => { await admin('usuario_unir', { usuario: id, hacia }); x.close(); toast('Cuentas unidas'); location.hash = `estudiante/${hacia}`; });
    };
  });
}

// ---------- 4. códigos ----------
function dlgCodigo(pre = {}, hecho) {
  ventana(`<form class="pn-form1" novalidate><h2>Crear código</h2>
    ${camposAcceso('prueba', CURSOS.some(c => c.id === 'preuda') ? ['preuda'] : [], 'Valor ya pagado por código (vacío: aún no se vende)')}
    <div class="pn-dos"><label class="fld"><span>Nombre</span><input name="nombre" maxlength="80" value="${esc(pre.nombre || '')}" placeholder="A quién se envía"></label><label class="fld"><span>Celular (WhatsApp)</span><input name="celular" type="tel" inputmode="tel" maxlength="30" value="${esc(pre.celular || '')}" placeholder="300 123 4567"></label>
      <label class="fld"><span>Cantidad</span><input name="cantidad" type="number" min="1" max="200" value="1" inputmode="numeric"></label><label class="fld"><span>Nota (opcional)</span><input name="nota" maxlength="200"></label></div>
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Crear</button></div></form>`, d => {
    const f = $('form', d);
    bindAcceso(f, { llena: false });
    f.onsubmit = e => {
      e.preventDefault();
      const v = leeAcceso(f);
      if (!v.cursos.length) return toast('Elige al menos un curso', true);
      ocupado($('[type=submit]', f), async () => {
        const ks = await admin('generar', { ...v, cantidad: Number(f.cantidad.value) || 1, nombre: f.nombre.value.trim(), celular: f.celular.value.trim(), nota: f.nota.value.trim() });
        d.close(); hecho?.();
        const msg = k => WA.envio({ nombre: k.nombre, codigo: k.codigo, cursos: nombres(v.cursos), prueba: v.tipo === 'prueba', dias: v.dias, url: APP });
        ventana(`<div class="pn-form1"><h2>${ks.length === 1 ? 'Código creado' : `${ks.length} códigos creados`}</h2><ul class="pn-nuevos">${ks.map(k => `<li class="pn-code${ks.length === 1 ? ' grande' : ''}">${muestraCodigo(k.codigo)}</li>`).join('')}</ul>
          <div class="pn-pie">${ks.length === 1 ? '<button class="btn ghost" type="button" data-cerrar>Cerrar</button>' : ''}<button class="btn ghost" type="button" data-cp>Copiar ${ks.length === 1 ? 'mensaje' : 'códigos'}</button>${ks.length === 1 ? waA(ks[0].celular, msg(ks[0]), 'Enviar por WhatsApp', 'main') : '<button class="btn main" type="button" data-cerrar>Listo</button>'}</div></div>`, x => {
          $('[data-cp]', x).onclick = () => copiar(ks.length === 1 ? msg(ks[0]) : ks.map(k => muestraCodigo(k.codigo)).join('\n'));
        });
      });
    };
  });
}
const filC = { q: '', estado: '' };
function vCodigos() {
  carga(() => admin('codigos'), ks => {
    const est = k => (k.bloqueado || k.usado_bloqueado ? 'pausa' : k.usado_por ? 'usado' : 'libre');
    const E = { libre: ['ok', 'Sin estrenar'], usado: ['', 'En uso'], pausa: ['bad', 'En pausa'] };
    view.innerHTML = `<div class="pn-head"><h1>Códigos</h1><button class="btn main" type="button" data-gen>Crear código</button></div>
      <p class="pn-count">El código es la cuenta: para vender, activa el curso en el código que la persona ya tiene. Así conserva su avance.</p>
      <div class="pn-filters dos"><label class="fld"><span>Buscar</span><input type="search" name="q" placeholder="Código, nombre, celular o nota" value="${esc(filC.q)}"></label><label class="fld"><span>Estado</span><select name="estado"><option value="">Todos</option>${Object.entries(E).map(([i, v]) => `<option value="${i}"${filC.estado === i ? ' selected' : ''}>${v[1]}</option>`).join('')}</select></label></div><div class="pn-list"></div>`;
    const conc = k => (k.usado_por ? k.accesos.map(a => pillAcceso(a)).join('') : k.concede.map(x => `<span class="pill ${x.tipo === 'pago' ? 'ok' : 'warn'}">${esc(curso(x.curso).nombre)} · ${x.tipo === 'pago' ? diasTexto(x.dias) : `prueba${x.dias ? ` ${diasTexto(x.dias)}` : ''}`}</span>`).join(''));
    const pinta = () => {
      const q = filC.q.trim().toLowerCase(), c = limpiaCodigo(q);
      const rows = ks.filter(k => (!filC.estado || est(k) === filC.estado) && (!q || `${k.nombre} ${k.usado_nombre || ''} ${k.celular} ${k.nota}`.toLowerCase().includes(q) || (c.length >= 3 && k.codigo.includes(c))));
      $('.pn-list', view).innerHTML = tabla([{ t: 'Código' }, { t: 'Estado' }, { t: 'Para' }, { t: 'Cursos' }, { t: 'Creado' }, { t: '' }], rows.map(k => `<tr><td class="pn-main pn-code">${muestraCodigo(k.codigo)}</td>${td('Estado', `<span class="pill ${E[est(k)][0]}">${E[est(k)][1]}</span>`)}
        ${td('Para', `${k.usado_por ? `<a href="#estudiante/${k.usado_por}">${esc(k.usado_nombre || 'Sin nombre')}</a>` : esc(k.nombre || '—')}${k.celular || k.nota ? `<span class="pn-sub">${esc([k.celular, k.nota].filter(Boolean).join(' · '))}</span>` : ''}`)}${td('Cursos', `<span class="pn-pills">${conc(k) || '—'}</span>`)}${td('Creado', fechaCorta(k.creado_en))}
        ${td('', `<span class="pn-acc"><button class="btn small main" type="button" data-act="${k.codigo}">Activar</button><button class="btn small ghost" type="button" data-copy="${k.codigo}">Copiar</button>${k.usado_por ? '' : waA(k.celular, WA.envio({ nombre: k.nombre, codigo: k.codigo, cursos: nombres(k.concede.map(x => x.curso)), prueba: k.concede.every(x => x.tipo === 'prueba'), dias: (k.concede[0] || {}).dias, url: APP }), 'Enviar')}<button class="btn small ghost" type="button" data-mas="${k.codigo}" aria-label="Más opciones de ${muestraCodigo(k.codigo)}">Más</button></span>`, 'pn-num')}</tr>`), ks.length ? 'Ningún código coincide.' : 'Aún no hay códigos. Crea el primero.');
      const de = c2 => ks.find(k => k.codigo === c2);
      $$('[data-copy]', view).forEach(b => { b.onclick = () => copiar(muestraCodigo(b.dataset.copy)); });
      $$('[data-act]', view).forEach(b => { b.onclick = () => { const k = de(b.dataset.act); dlgActivar({ codigo: k.usado_por ? '' : k.codigo, usuarios: k.usado_por ? [k.usado_por] : [], nombre: k.usado_nombre || k.nombre, celular: k.celular, sel: k.concede.map(x => x.curso).slice(0, 1), titulo: 'Activar en este código' }, vCodigos); }; });
      $$('[data-mas]', view).forEach(b => { b.onclick = () => dlgMas(de(b.dataset.mas)); });
    };
    $$('.pn-filters [name]', view).forEach(x => { x.oninput = () => { filC[x.name] = x.value; pinta(); }; });
    $('[data-gen]', view).onclick = () => dlgCodigo({}, vCodigos);
    pinta();
  });
}
function dlgMas(k) {
  ventana(`<form class="pn-form1"><h2 class="pn-code">${muestraCodigo(k.codigo)}</h2><label class="fld"><span>Nombre</span><input name="nombre" maxlength="80" value="${esc(k.nombre)}"></label><label class="fld"><span>Celular</span><input name="celular" maxlength="30" value="${esc(k.celular)}"></label><label class="fld"><span>Nota</span><input name="nota" maxlength="200" value="${esc(k.nota)}"></label>
    <div class="pn-acc"><button class="btn small ghost" type="button" data-p>${k.bloqueado ? 'Reanudar código' : 'Pausar código'}</button><button class="btn small ghost" type="button" data-r>Cambiar código</button>${k.usado_por ? '' : '<button class="btn small ghost danger" type="button" data-b>Eliminar código</button>'}</div>
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button><button class="btn main" type="submit">Guardar</button></div></form>`, d => {
    $('form', d).onsubmit = e => { e.preventDefault(); ocupado($('[type=submit]', d), async () => { await admin('codigo_editar', { codigo: k.codigo, ...Object.fromEntries(new FormData(e.target)) }); d.close(); toast('Guardado'); vCodigos(); }); };
    $('[data-p]', d).onclick = e => ocupado(e.currentTarget, async () => { await admin('codigo_editar', { codigo: k.codigo, bloqueado: !k.bloqueado }); d.close(); toast(k.bloqueado ? 'Código reanudado' : 'Código en pausa'); vCodigos(); });
    $('[data-r]', d).onclick = e => { const b = e.currentTarget; renovar(b, k.codigo, { nombre: k.usado_nombre || k.nombre, telefono: k.celular }, () => { d.close(); vCodigos(); }); };
    $('[data-b]', d)?.addEventListener('click', async e => { const b = e.currentTarget; if (await confirma({ titulo: '¿Eliminar este código?', texto: 'Nadie lo ha estrenado. Si ya lo enviaste, dejará de servir.', ok: 'Eliminar', peligro: true })) ocupado(b, async () => { await admin('codigo_borrar', { codigo: k.codigo }); d.close(); toast('Código eliminado'); vCodigos(); }); });
  });
}

// ---------- 5. solicitudes de compra ----------
function vSolicitudes() {
  carga(() => admin('solicitudes'), ss => {
    pendientes(ss.filter(s => s.estado === 'pendiente').length);
    const E = { pendiente: ['warn', 'Por atender'], pagada: ['ok', 'Pagada'], descartada: ['', 'Descartada'] };
    view.innerHTML = `<h1>Solicitudes</h1><p class="pn-count">Llegan cuando un estudiante toca «Comprar» en la app. Al confirmar el pago, el curso se activa en su mismo código.</p>
      ${tabla([{ t: 'Estudiante' }, { t: 'Quiere' }, { t: 'Precio', n: 1 }, { t: 'Cuándo' }, { t: 'Estado' }, { t: '' }], ss.map(s => `<tr data-id="${s.usuario}"><td class="pn-main">${esc(s.nombre || 'Sin nombre')}<span class="pn-sub">${esc(s.telefono || '')} ${s.codigo ? muestraCodigo(s.codigo) : ''}</span></td>${td('Quiere', `${esc(curso(s.curso).nombre)} · ${mesesTexto(s.meses)}`)}${td('Precio', s.precio != null ? cop(s.precio) : '—', 'pn-num')}${td('Cuándo', hace(s.creado_en))}${td('Estado', `<span class="pill ${E[s.estado][0]}">${E[s.estado][1]}</span>`)}
        ${td('', s.estado === 'pendiente' ? `<span class="pn-acc"><button class="btn small main" type="button" data-ok="${s.id}">Confirmar pago</button>${waA(s.telefono, `Hola${s.nombre ? ` ${s.nombre}` : ''}, vimos que quieres ${curso(s.curso).nombre} por ${mesesTexto(s.meses)}.`)}<button class="btn small ghost" type="button" data-no="${s.id}">Descartar</button></span>` : '', 'pn-num')}</tr>`), 'No hay solicitudes.')}`;
    filas();
    $$('[data-ok]', view).forEach(b => { b.onclick = () => { const s = ss.find(x => String(x.id) === b.dataset.ok); dlgActivar({ usuarios: [s.usuario], nombre: s.nombre, celular: s.telefono, sel: [s.curso], meses: s.meses, precio: s.precio, titulo: 'Confirmar pago' }, vSolicitudes); }; });
    $$('[data-no]', view).forEach(b => { b.onclick = () => ocupado(b, async () => { await admin('solicitud_estado', { id: b.dataset.no, estado: 'descartada' }); toast('Solicitud descartada'); vSolicitudes(); }); });
  });
}

// ---------- 6. ventas ----------
function vVentas() {
  carga(async () => { const [g, r] = await Promise.all([admin('pagos'), admin('resumen')]); return { g, r }; }, ({ g, r }) => {
    const mes = fechaInput(new Date().toISOString()).slice(0, 7), tot = r.ventas_mes.find(x => x.mes === mes);
    view.innerHTML = `<div class="pn-head"><h1>Ventas</h1><button class="btn ghost" type="button" data-csv>Descargar Excel</button></div>
      <div class="pn-tiles">${tile(cop(tot ? tot.valor : 0), 'Este mes', 'ok')}${tile(cop(r.ventas_30), 'Últimos 30 días')}${tile(cop(g.reduce((t, x) => t + x.valor, 0)), 'En total')}${tile(g.filter(x => x.valor > 0).length, 'Pagos')}</div>
      ${r.ventas_mes.length > 1 ? `<section class="pn-card"><h2>Por mes</h2>${barras(r.ventas_mes.map(x => ({ t: `${MESES[Number(x.mes.slice(5)) - 1]} ${x.mes.slice(0, 4)}`, c: MESES[Number(x.mes.slice(5)) - 1], v: x.valor })), 'COP')}</section>` : ''}
      ${tabla([{ t: 'Fecha' }, { t: 'Estudiante' }, { t: 'Curso' }, { t: 'Medio' }, { t: 'Valor', n: 1 }, { t: '' }], g.map(x => `<tr${x.usuario ? ` data-id="${x.usuario}"` : ''}>${td('Fecha', fechaCorta(x.creado_en))}<td class="pn-main">${esc(x.nombre || 'Sin nombre')}<span class="pn-sub">${x.codigo ? muestraCodigo(x.codigo) : ''}${x.nota ? ` · ${esc(x.nota)}` : ''}</span></td>${td('Curso', `${esc(curso(x.curso).nombre)}${x.dias ? ` · ${diasTexto(x.dias)}` : ''}`)}${td('Medio', esc(x.metodo || '—'))}${td('Valor', cop(x.valor), 'pn-num')}${td('', `<button class="btn small ghost" type="button" data-b="${x.id}">Borrar</button>`, 'pn-num')}</tr>`), 'Aún no hay pagos. Se anotan al activar un curso como pagado.')}`;
    filas();
    $('[data-csv]', view).onclick = () => csv('zuka-ventas', ['Fecha', 'Estudiante', 'Código', 'Curso', 'Días', 'Valor', 'Medio', 'Nota'], g.map(x => [fechaCorta(x.creado_en), x.nombre, x.codigo, curso(x.curso).nombre, x.dias, x.valor, x.metodo, x.nota]));
    $$('[data-b]', view).forEach(b => { b.onclick = async () => { if (await confirma({ titulo: '¿Borrar este pago?', texto: 'Solo se quita del registro de ventas; el acceso del estudiante no cambia.', ok: 'Borrar', peligro: true })) ocupado(b, async () => { await admin('pago_borrar', { id: b.dataset.b }); vVentas(); }); }; });
  });
}

// ---------- 7. cursos y precios ----------
function vCursos() {
  carga(base, () => {
    view.innerHTML = `<h1>Cursos y precios</h1><p class="pn-count">Un curso publicado lo ven todos en la app, para comprarlo. Uno sin publicar solo lo ve quien lo tiene asignado. Sin precio, la app dice «Precio por WhatsApp».</p>
      <div class="pn-cursos">${CURSOS.map(c => `<section class="pn-card" data-c="${c.id}"><div class="pn-head"><h2>${esc(c.nombre)}</h2><label class="pn-sw"><input type="checkbox" data-pub${c.publicado ? ' checked' : ''}><span>Publicado</span></label></div>
        <form class="pn-prod">${PRODUCTOS.filter(p => p.curso === c.id).sort((a, b) => a.meses - b.meses).map(p => `<div data-m="${p.meses}"><label class="check"><input type="checkbox" name="activo"${p.activo ? ' checked' : ''}><span>${mesesTexto(p.meses)}</span></label>
          <label class="fld"><span>Días</span><input name="dias" type="number" min="1" max="800" value="${p.dias}"></label><label class="fld"><span>Precio (COP)</span><input name="precio" type="number" min="0" step="1000" value="${p.precio ?? ''}" placeholder="Por WhatsApp"></label><button class="btn small ghost" type="button" data-del="${p.id}" aria-label="Borrar el plan de ${mesesTexto(p.meses)}">Borrar</button></div>`).join('')}
          <div class="pn-pie"><button class="btn small ghost" type="button" data-add>Añadir duración</button><button class="btn small main" type="submit">Guardar</button></div></form></section>`).join('')}</div>`;
    $$('[data-c]', view).forEach(s => {
      const c = s.dataset.c;
      $('[data-pub]', s).onchange = async e => {
        const i = e.target, r = await sb.from('cursos').update({ publicado: i.checked }).eq('id', c).select();
        if (r.error || !r.data.length) { i.checked = !i.checked; return toast('No se pudo cambiar el curso', true); }
        curso(c).publicado = i.checked; toast(i.checked ? 'Publicado: ya lo ven todos' : 'Ahora solo lo ve quien lo tiene asignado');
      };
      $('form', s).onsubmit = e => {
        e.preventDefault();
        ocupado($('[type=submit]', s), async () => {
          for (const row of $$('[data-m]', s)) {
            const v = { meses: Number(row.dataset.m), dias: Number($('[name=dias]', row).value), precio: $('[name=precio]', row).value, activo: $('[name=activo]', row).checked };
            const p = PRODUCTOS.find(x => x.curso === c && x.meses === v.meses) || {};
            if (p.dias === v.dias && String(p.precio ?? '') === v.precio && p.activo === v.activo) continue;
            await admin('producto_guardar', { curso: c, ...v, precio: v.precio === '' ? '' : String(Math.round(Number(v.precio))) });
          }
          toast('Planes guardados'); await base();
        });
      };
      $('[data-add]', s).onclick = () => ventana('<form class="pn-form1"><h2>Añadir duración</h2><label class="fld"><span>Meses</span><input name="meses" type="number" min="1" max="24" value="2" required></label><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Añadir</button></div></form>', d => {
        $('form', d).onsubmit = ev => { ev.preventDefault(); ocupado($('[type=submit]', d), async () => { const m = Number(ev.target.meses.value); if (PRODUCTOS.some(p => p.curso === c && p.meses === m)) throw new Error('Ese plan ya existe'); await admin('producto_guardar', { curso: c, meses: m, activo: true, precio: '' }); d.close(); vCursos(); }); };
      });
      $$('[data-del]', s).forEach(b => { b.onclick = async () => { if (await confirma({ titulo: '¿Borrar esta duración?', texto: 'Deja de ofrecerse. Quienes ya la compraron no pierden nada.', ok: 'Borrar', peligro: true })) ocupado(b, async () => { await admin('producto_borrar', { id: b.dataset.del }); vCursos(); }); }; });
    });
  });
}

// ---------- 8. ajustes ----------
function vAjustes() {
  carga(async () => { await base(); return admin('auditoria'); }, au => {
    const detalle = d => esc([d.nombre, d.codigo ? muestraCodigo(String(d.codigo)) : '', d.curso ? curso(d.curso).nombre : '', Array.isArray(d.cursos) ? nombres(d.cursos) : '', d.tipo, d.dias ? diasTexto(Number(d.dias)) : '', d.valor ? cop(d.valor) : ''].filter(Boolean).join(' · '));
    view.innerHTML = `<h1>Ajustes</h1><form class="pn-card" data-aj><h2>Contacto y pagos</h2>
        <label class="fld"><span>WhatsApp de Zuka (con él se piden códigos y se compra)</span><input name="whatsapp" type="tel" inputmode="tel" maxlength="20" value="${esc(AJUSTES.whatsapp)}" placeholder="300 123 4567"></label>
        <label class="fld"><span>Cómo se paga (sale al comprar en la app)</span><textarea name="pago_info" rows="3" maxlength="600" placeholder="Por ejemplo: pagas por Nequi al número que te enviamos y mandas el comprobante por WhatsApp.">${esc(AJUSTES.pago_info)}</textarea></label>
        <label class="fld"><span>Dispositivos por código (0: sin límite)</span><input name="max_dispositivos" type="number" min="0" max="20" value="${esc(AJUSTES.max_dispositivos)}"></label>
        <div class="pn-pie"><button class="btn main" type="submit">Guardar</button></div></form>
      <section class="pn-card"><h2>Últimos movimientos</h2>${tabla([{ t: 'Cuándo' }, { t: 'Qué' }, { t: 'Detalle' }, { t: 'Quién' }], au.slice(0, 80).map(a => `<tr>${td('Cuándo', `${fechaCorta(a.creado_en)} ${new Date(a.creado_en).toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' })}`)}<td class="pn-main">${ACCIONES[a.accion] || esc(a.accion)}</td>${td('Detalle', detalle(a.detalle) || '—')}${td('Quién', esc(a.quien || '—'))}</tr>`), 'Aún no hay movimientos.')}</section>`;
    const f = $('[data-aj]', view);
    f.onsubmit = e => {
      e.preventDefault();
      const v = Object.fromEntries(new FormData(f)), n = waNumero(v.whatsapp);
      if (v.whatsapp && (n.length < 10 || n.length > 15)) return toast('Revisa el número de WhatsApp', true);
      ocupado($('[type=submit]', f), async () => { await admin('ajustes_guardar', { ...v, whatsapp: n }); await base(); toast('Ajustes guardados'); vAjustes(); });
    };
  });
}

entrar();
