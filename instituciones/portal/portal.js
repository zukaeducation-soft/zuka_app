// Portal de gestores y docentes (spec 2026-11-25-instituciones). Todo pasa por la función institucion(p_accion, p) de la base, que
// comprueba quién llama y qué grupos ve: esta página no guarda nada. Vistas por ancla. Con ?demo, datos inventados (demo.js).
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)], view = $('#pn-view');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const Q = new URLSearchParams(location.search), DEMO = Q.has('demo'), INST = Q.get('i') || '';
const sb = !DEMO && window.supabase ? window.supabase.createClient(SUPA_URL, SUPA_KEY) : null, BANCO = fetch('/instituciones/banco.json?v=1').then(r => (r.ok ? r.json() : null)).catch(() => null), demo = DEMO ? BANCO.then(b => portalDemo(b, Q.get('rol') === 'docente')) : null;
const APP = location.origin + '/', plural = (n, u, v) => `${n} ${n === 1 ? u : v}`, pc = x => `${Math.round(x * 100)} %`;
let D = null, C = null;
const SIN = '(sin grupo)';   // valor del filtro para quienes no tienen
const F = { dias: 28, grupo: '', curso: '' }, L = { q: '', grupo: '', estado: 'activos', orden: 'nombre', el: new Set() };
const ICO = { resumen: '<path d="M4 13h6V4H4zM14 20h6V4h-6zM4 20h6v-4H4z"/>', estudiantes: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c0-3.500 3-5.500 6.500-5.500s6.500 2 6.500 5.500M16 5a3.500 3.500 0 0 1 0 6.500M18 15c2.200.7 3.500 2.500 3.500 5"/>', contenido: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>', metas: '<circle cx="12" cy="12" r="8.500"/><circle cx="12" cy="12" r="3.500"/>', equipo: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.500-6 8-6s8 2 8 6"/>', contrato: '<path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3"/>', app: '<path d="M14 5h5v5M19 5l-8 8M11 6H5v13h13v-6"/>', avisa: '<path d="M12 4l9 16H3zM12 10v4M12 17v.01"/>', mas: '<path d="M12 5v14M5 12h14"/>' };
const ico = k => `<svg class="pn-i" viewBox="0 0 24 24" aria-hidden="true">${ICO[k] || ''}</svg>`;
Object.assign(ICO, { componente: '<path d="M4 19V5M4 19h16M8 15l4-5 3 3 5-7"/>', simulacros: '<path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h3"/>', responsables: '<circle cx="8" cy="8" r="3.500"/><path d="M2 20c0-3.500 2.500-5.500 6-5.500 1.500 0 2.800.4 3.800 1M14 17l2.500 2.500L22 14"/>', avisos: '<path d="M4 10v4l3 .5V9.500zM7 9.500L18 5v14L7 14.500M9 15l1 5h2l-1-4.500"/>' });
const NAV = [['resumen', 'Resumen'], ['componente', 'Mi componente'], ['estudiantes', 'Estudiantes'], ['contenido', 'Cursos y lecciones'], ['simulacros', 'Simulacros'], ['avisos', 'Avisos'], ['metas', 'Metas'], ['responsables', 'Docentes responsables'], ['equipo', 'Equipo'], ['contrato', 'Contrato']];
const gestor = () => D.yo.papel !== 'docente', puede = () => gestor() && (D.institucion.vigente || D.yo.papel === 'zuka');
let tT = null;
function toast(m, mal) { const t = $('#pn-toast'); t.textContent = m; t.classList.toggle('bad', !!mal); t.hidden = false; if (t.showPopover) { t.popover = 'manual'; if (t.matches(':popover-open')) t.hidePopover(); t.showPopover(); }   // por encima de las ventanas
  clearTimeout(tT); tT = setTimeout(() => { t.hidden = true; }, mal ? 6000 : 2800); }
const errT = e => (e?.code === '42501' ? 'No tienes permiso para esto.' : /fetch|network/i.test(e?.message || '') ? 'No hay conexión. Inténtalo de nuevo.' : e?.message || 'No se pudo completar.');
async function api(a, p = {}) { if (demo) return (await demo)(a, p); const { data, error } = await sb.rpc('institucion', { p_accion: a, p: INST ? { ...p, institucion: INST } : p }); if (error) throw error; return data; }
async function ocupado(b, fn) { if (b.disabled) return; const t = b.textContent; b.disabled = true; b.textContent = 'Un momento…'; try { await fn(); } catch (e) { toast(errT(e), true); } b.disabled = false; b.textContent = t; }
async function copiar(t) { try { await navigator.clipboard.writeText(t); toast('Copiado'); } catch (e) { toast('No se pudo copiar', true); } }
function csv(nombre, filas) {
  const q = v => { const s = String(v ?? ''); return `"${(/^[=+\-@\t]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`; };
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([`﻿${filas.map(f => f.map(q).join(';')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' })); a.download = `zuka-${nombre}-${D.hoy}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
function ventana(html, bind) { const d = document.createElement('dialog'); d.className = 'pn-dialog'; d.innerHTML = html; document.body.appendChild(d); d.addEventListener('close', () => d.remove()); d.addEventListener('click', e => { if (e.target === d) d.close(); }); $$('[data-cerrar]', d).forEach(b => { b.onclick = () => d.close(); }); bind?.(d); d.showModal(); return d; }
const confirma = ({ t, p, ok, peligro }) => new Promise(res => { let si = false; const d = ventana(`<form method="dialog" class="pn-form1"><h2>${t}</h2><p>${p}</p><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main${peligro ? ' peligro' : ''}" type="submit">${ok}</button></div></form>`, x => { $('form', x).onsubmit = () => { si = true; }; }); d.addEventListener('close', () => res(si)); });
const avatar = n => `<span class="pn-av" aria-hidden="true" style="--h:${[...String(n)].reduce((t, c) => (t * 31 + c.charCodeAt(0)) % 360, 7)}">${esc(n.split(/\s+/).slice(0, 2).map(x => [...x][0] || '').join('').toUpperCase())}</span>`;
const barra = (p, cls = '') => `<span class="po-bar ${cls}" role="img" aria-label="${pc(p)}"><i style="width:${Math.round(p * 100)}%"></i></span>`;
const aro = (p, t, s) => `<span class="po-aro" style="--p:${Math.min(1, p).toFixed(3)}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="43" pathLength="1"/><circle class="v" cx="50" cy="50" r="43" pathLength="1"/></svg><span><b>${t}</b><small>${s}</small></span></span>`;
const fecha = d => new Date(`${d}T12:00:00Z`).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', timeZone: 'UTC' }), larga = d => new Date(`${d}T12:00:00Z`).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const ultima = e => (!e.entro ? 'Aún no entra' : e.sin == null ? 'Sin actividad' : e.sin === 0 ? 'Hoy' : e.sin === 1 ? 'Ayer' : `Hace ${e.sin} días`);
const cNom = id => (D.cursos.find(c => c.id === id) || { nombre: id }).nombre, gNom = g => g || 'Sin grupo';
const grupos = () => [...new Set(D.estudiantes.filter(e => e.activo).map(e => e.grupo))].sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));
const mensaje = (n, c) => `Hola ${n.split(' ')[0]}, este es tu código para entrar a Zuka: *${muestraCodigo(c)}*\n\nÁbrelo en ${APP} y escríbelo. Con ese código entras siempre.`;
const checks = (sel, xs = D.cursos.map(c => [c.id, c.nombre]), name = 'cursos', leg = 'Cursos') => `<fieldset class="pn-checks"><legend>${leg}</legend>${xs.map(([v, t]) => `<label class="check"><input type="checkbox" name="${name}" value="${esc(v)}"${sel.includes(v) ? ' checked' : ''}><span>${esc(t)}</span></label>`).join('')}</fieldset>`;
const marcados = (f, n = 'cursos') => $$(`[name="${n}"]:checked`, f).map(x => x.value);
const datalist = () => `<datalist id="po-gr">${grupos().filter(Boolean).map(g => `<option value="${esc(g)}">`).join('')}</datalist>`;
async function carga() { D = instAbre(await api('panel')); await cargaDocencia(); }
// Guarda, vuelve a leer y repinta donde estaba.
async function cambia(a, p, dice) { const r = await api(a, p); await carga(); marco(); ruta(false); if (dice) toast(dice); return r; }

// ---------- entrada ----------
async function entrar() {
  if (!DEMO && !sb) { view.innerHTML = '<p class="pn-state bad">No se pudo cargar el portal. Revisa tu conexión y recarga.</p>'; return; }
  if (!DEMO) { const { data: { session } } = await sb.auth.getSession(); if (!session) return login(); }
  try { await carga(); } catch (e) {
    const sin = e.code === '42501';
    view.innerHTML = `<div class="pn-state bad"><p>${sin ? 'Esta cuenta no administra una institución.' : esc(errT(e))}</p><button class="btn ghost" type="button">${sin ? 'Entrar con otro código' : 'Reintentar'}</button></div>`;
    $('button', view).onclick = async () => { if (sin) { await sb.auth.signOut({ scope: 'local' }); login(); } else entrar(); }; return;
  }
  document.body.classList.add('dentro'); marco();
  removeEventListener('hashchange', ruta); addEventListener('hashchange', ruta); ruta();
}
function login() {
  document.body.classList.remove('dentro'); $('.pn-nav').hidden = true; $('.pn-user').hidden = true;
  view.innerHTML = `<form class="pn-card pn-login acct-form po-login" novalidate><h1>Portal de instituciones</h1><p>Escribe tu código de gestor o docente.</p><label class="fld"><span>Código</span><input name="codigo" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="14" placeholder="ABCDE-FGHJK" required></label>
    <p class="form-msg bad" role="alert" hidden></p><button class="btn main" type="submit">Entrar</button><a class="btn ghost" href="?demo">Ver el portal de ejemplo</a></form>`;
  const f = $('form', view), msg = $('.form-msg', view);
  f.onsubmit = e => {
    e.preventDefault(); const c = limpiaCodigo(f.codigo.value), mal = t => { msg.textContent = t; msg.hidden = false; f.codigo.focus(); };
    if (!codigoValido(c)) return mal(CANJE_ERRORES.formato);
    ocupado($('button', f), async () => {
      msg.hidden = true;
      let id = null; try { id = localStorage.getItem('zuka-dispositivo'); if (!id) { id = [...crypto.getRandomValues(new Uint8Array(16))].map(x => x.toString(16).padStart(2, '0')).join(''); localStorage.setItem('zuka-dispositivo', id); } } catch (x) { id = id || crypto.randomUUID(); }
      const { data, error } = await sb.functions.invoke('entrar-codigo', { body: { codigo: c, dispositivo: id, nombre: 'Portal de instituciones' } });
      if (error || !data?.ok) return mal((data && CANJE_ERRORES[data.error]) || 'No se pudo entrar. Revisa el código y tu conexión.');
      const v = await sb.auth.verifyOtp({ token_hash: data.token_hash, type: 'magiclink' });
      if (v.error) return mal('No se pudo entrar. Inténtalo de nuevo.');
      await entrar();
    });
  };
}
$('[data-salir]').onclick = async () => { if (DEMO) return location.assign('/instituciones/'); await sb.auth.signOut({ scope: 'local' }); location.replace(location.pathname); };   // recarga: nada de una cuenta queda para la otra
function marco() {
  $('[data-inst]').textContent = D.institucion.nombre; $('.pn-user').hidden = false; $('.pn-mail').textContent = `${D.yo.nombre}${gestor() ? '' : ` · ${X && X.asignaciones.length ? compsMios().map(c => c.nombre).join(', ') : 'Docente'}`}`;
  const n = $('.pn-nav'); n.hidden = false;
  n.innerHTML = NAV.filter(([k]) => vistaOk(k)).map(([k, t]) => `<a href="#${k}">${ico(k)}${k === 'componente' && gestor() ? 'Preicfes' : t}</a>`).join('');
  const a = $('.pn-app'); if (!$('svg', a)) a.insertAdjacentHTML('afterbegin', ico('app'));
}
function ruta(arriba) {
  const ini = vistaOk('resumen') ? 'resumen' : 'componente', [k, arg] = (location.hash.slice(1) || ini).split('/'), V = { resumen: vResumen, estudiantes: vEstudiantes, estudiante: () => vEstudiante(+arg), contenido: vContenido, metas: vMetas, equipo: vEquipo, contrato: vContrato, componente: vComponente, alumno: () => vAlumno(+arg), simulacros: vSimulacros, simulacro: () => vSimulacro(+arg), nuevo: vNuevo, avisos: vAvisos, responsables: vResponsables };
  const va = V[k] && vistaOk(k) ? k : ini, menu = { estudiante: 'estudiantes', alumno: vistaOk('componente') ? 'componente' : 'estudiantes', simulacro: 'simulacros', nuevo: 'simulacros' }[va] || va; clearInterval(vivo);
  $$('.pn-nav a').forEach(a => { const on = a.getAttribute('href') === `#${menu}`; a.classList.toggle('on', on); if (on && innerWidth < 900) a.scrollIntoView({ inline: 'center', block: 'nearest' }); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  C = instCalcula(D, { dias: 28, grupo: '', curso: '' }); V[va]();
  if (arriba !== false) scrollTo(0, 0);
}
const avisos = () => `${DEMO ? `<p class="po-aviso">Portal de ejemplo: los datos son inventados y los cambios no se guardan. ${gestor() ? '<a href="?demo&rol=docente">Ver como docente</a>' : '<a href="?demo">Ver como gestor</a>'}</p>` : ''}${D.institucion.vigente ? '' : `<p class="po-aviso mal">El contrato no está vigente (${fecha(D.institucion.desde)} a ${larga(D.institucion.hasta)}${D.institucion.estado === 'pausa' ? ', en pausa' : ''}). Puedes consultar, pero los cursos están cerrados para los estudiantes.</p>`}`;

// ---------- resumen ----------
function vResumen() {
  const c = C = instCalcula(D, F), i = D.institucion, quedan = instEntre(D.hoy, i.hasta), dif = (a, b) => (b ? `<em class="${a >= b ? 'up' : 'dn'}">${a >= b ? '+' : '−'}${Math.abs(Math.round(100 * (a - b) / b))} % frente al periodo anterior</em>` : '');
  const opc = (n, xs) => `<label class="fld"><span>${n}</span><select data-f="${n}">${xs.map(([v, t]) => `<option value="${esc(v)}"${String(F[n.toLowerCase()] ?? F.dias) === String(v) ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`;
  view.innerHTML = `${avisos()}<div class="pn-head"><div><h1>Así va ${esc(gestor() ? i.nombre : 'tu clase')}</h1><p class="pn-hoy">${new Date(`${D.hoy}T12:00:00Z`).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })}</p></div>
      <div class="po-filtros">${opc('Grupo', [['', 'Todos'], ...grupos().map(g => [g || SIN, gNom(g)])])}${opc('Curso', [['', 'Todos'], ...D.cursos.map(x => [x.id, x.nombre])])}<label class="fld"><span>Periodo</span><select data-f="Dias">${[[7, '7 días'], [28, '28 días'], [90, '90 días']].map(([v, t]) => `<option value="${v}"${F.dias === v ? ' selected' : ''}>${t}</option>`).join('')}</select></label></div></div>
    ${!D.estudiantes.some(e => e.activo) ? `<section class="po-vacio">${ico('estudiantes')}<h2>Empieza por registrar a tus estudiantes</h2><p>Pega la lista desde Excel y cada uno queda con su código.</p>${puede() ? '<button class="btn main" type="button" data-alta>Registrar estudiantes</button>' : ''}</section>` : `
    <div class="po-kpis">${gestor() ? `<section class="pn-card po-cupos">${aro(i.usados / i.cupos, i.usados, `de ${i.cupos} cupos`)}<div><p><b>${c.entraron}</b> ya entraron</p><p><b>${Math.max(0, i.cupos - i.usados)}</b> cupos libres</p><p><b>${Math.max(0, quedan)}</b> ${quedan === 1 ? 'día' : 'días'} de contrato</p></div></section>` : ''}
      <section class="pn-card po-k"><span>Estudiaron</span><b>${c.activos}<small> de ${c.filas.length}</small></b>${dif(c.activos, c.activosAntes)}</section><section class="pn-card po-k"><span>Minutos por estudiante</span><b>${c.filas.length ? Math.round(c.min / c.filas.length) : 0}</b>${dif(c.min, c.minAntes)}</section>
      <section class="pn-card po-k"><span>Lecciones nuevas</span><b>${c.nuevas}</b><em>en ${F.dias} días</em></section></div>
    <div class="pn-dash"><section class="pn-card"><div class="pn-head"><h2>Actividad por día</h2><p class="po-lee" aria-live="polite"></p></div>${grafica(c.serie)}</section>
      <section class="pn-card po-ayuda"><div class="pn-head"><h2>Necesitan una mano</h2><span class="pn-count">${c.alertas.length}</span></div>${c.alertas.length ? `<ul>${c.alertas.slice(0, 7).map(e => `<li>${avatar(e.nombre)}<span><a href="#estudiante/${e.id}">${esc(e.nombre)}</a><small>${esc(gNom(e.grupo))} · ${e.alerta.t}</small></span></li>`).join('')}</ul>${c.alertas.length > 7 ? '<button class="link-btn" type="button" data-verayuda>Ver todos</button>' : ''}` : '<p class="pn-count">Todos van bien.</p>'}</section></div>
    <div class="pn-dash"><section class="pn-card"><h2>Grupos</h2><ul class="po-grupos">${c.grupos.map(g => `<li><button type="button" data-grupo="${esc(g.grupo || SIN)}" aria-pressed="${F.grupo === (g.grupo || SIN)}"><span><b>${esc(gNom(g.grupo))}</b><small>${plural(g.n, 'estudiante', 'estudiantes')} · ${g.activos} activos · ${g.min} min</small></span>${barra(g.avance)}<b>${pc(g.avance)}</b></button></li>`).join('')}</ul></section>
      <section class="pn-card"><h2>Avance por curso</h2><ul class="po-grupos">${c.cursos.map(x => `<li><a href="#contenido"><span><b>${esc(x.nombre)}</b><small>${plural(x.n, 'estudiante', 'estudiantes')} · ${x.total} lecciones</small></span>${barra(x.avance)}<b>${pc(x.avance)}</b></a></li>`).join('')}</ul><h2>Los que más avanzaron</h2><ol class="po-top">${[...c.filas].sort((a, b) => b.nuevas - a.nuevas || b.min - a.min).filter(e => e.nuevas).slice(0, 5).map(e => `<li>${avatar(e.nombre)}<a href="#estudiante/${e.id}">${esc(e.nombre)}</a><b>${plural(e.nuevas, 'lección', 'lecciones')}</b></li>`).join('') || '<li class="pn-count">Todavía nadie en este periodo.</li>'}</ol></section></div>`}`;
  $$('[data-f]', view).forEach(s => { s.onchange = () => { const k = s.dataset.f.toLowerCase(); F[k] = k === 'dias' ? +s.value : s.value; vResumen(); $(`[data-f="${s.dataset.f}"]`, view).focus(); }; });
  $$('[data-grupo]', view).forEach(b => { b.onclick = () => { F.grupo = F.grupo === b.dataset.grupo ? '' : b.dataset.grupo; vResumen(); $(`[data-grupo="${CSS.escape(b.dataset.grupo)}"]`, view)?.focus(); }; });
  $('[data-alta]', view)?.addEventListener('click', dlgAlta);
  $('[data-verayuda]', view)?.addEventListener('click', () => { Object.assign(L, { q: '', grupo: F.grupo, estado: 'ayuda' }); location.hash = 'estudiantes'; });
  ligaGrafica(c.serie);
}
// Minutos por día; al pasar el puntero (o con las flechas) se lee cada día.
function grafica(s) {
  const m = Math.max(1, ...s.map(x => x.min));
  return `<div class="po-gra" tabindex="0" role="group" aria-label="Minutos por día. Usa las flechas para leer cada día" style="--n:${s.length}">${s.map((x, i) => `<i data-i="${i}" style="--h:${(x.min / m * 100).toFixed(1)}%"${x.min ? '' : ' class="cero"'}></i>`).join('')}</div><div class="po-eje"><span>${fecha(s[0].d)}</span><span>${fecha(s[s.length - 1].d)}</span></div>`;
}
function ligaGrafica(s) {
  const g = $('.po-gra', view), lee = $('.po-lee', view); if (!g) return;
  let k = -1; const pon = i => { k = Math.max(0, Math.min(s.length - 1, i)); $$('i', g).forEach((b, j) => b.classList.toggle('on', j === k)); lee.innerHTML = `<b>${fecha(s[k].d)}</b>: ${s[k].min} min, ${plural(s[k].activos, 'estudiante', 'estudiantes')}`; };
  g.onpointermove = g.onpointerdown = e => { const r = g.getBoundingClientRect(); pon(Math.floor((e.clientX - r.left) / r.width * s.length)); };
  g.onkeydown = e => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); pon(k < 0 ? s.length - 1 : k + d); } };
  pon(s.length - 1);
}

// ---------- estudiantes ----------
const ESTADOS = [['activos', 'Activos'], ['ayuda', 'Necesitan una mano'], ['sin', 'Sin entrar'], ['retirados', 'Retirados']];
function vEstudiantes() {
  const por = new Map(C.filas.map(e => [e.id, e])), todos = D.estudiantes.map(e => por.get(e.id) || { ...e, avance: 0, min: 0, aciertos: null, sin: null });
  const en = { activos: e => e.activo, ayuda: e => e.activo && e.alerta, sin: e => e.activo && !e.entro, retirados: e => !e.activo };
  view.innerHTML = `${avisos()}<div class="pn-head"><h1>Estudiantes</h1><div class="pn-acc"><button class="btn ghost" type="button" data-csv>Descargar Excel</button>${puede() ? `<button class="btn main" type="button" data-alta>Registrar estudiantes</button>` : ''}</div></div>
    ${gestor() ? `<p class="po-cupo">${barra(D.institucion.usados / D.institucion.cupos)}<span><b>${D.institucion.usados}</b> de ${D.institucion.cupos} cupos. ${D.institucion.usados >= D.institucion.cupos ? '<a href="#contrato">Pedir más</a>' : `Quedan ${D.institucion.cupos - D.institucion.usados}.`}</span></p>` : ''}
    <div class="pn-chips" role="radiogroup" aria-label="Estado">${ESTADOS.map(([k, t]) => `<label><input type="radio" name="estado" value="${k}"${L.estado === k ? ' checked' : ''}><span>${t}<b>${todos.filter(en[k]).length}</b></span></label>`).join('')}</div>
    <div class="pn-filters tres"><label class="fld"><span>Buscar</span><input name="q" type="search" value="${esc(L.q)}" placeholder="Nombre, documento o código"></label><label class="fld"><span>Grupo</span><select name="grupo"><option value="">Todos</option>${grupos().map(g => `<option value="${esc(g || SIN)}"${L.grupo === (g || SIN) ? ' selected' : ''}>${esc(gNom(g))}</option>`).join('')}</select></label><label class="fld"><span>Ordenar por</span><select name="orden">${[['nombre', 'Nombre'], ['avance', 'Más avance'], ['menos', 'Menos avance'], ['min', 'Más tiempo'], ['sin', 'Más días sin entrar']].map(([v, t]) => `<option value="${v}"${L.orden === v ? ' selected' : ''}>${t}</option>`).join('')}</select></label></div>
    <div class="pn-lote" hidden><b></b><span class="pn-acc"><button class="btn small main" type="button" data-l="codigos">Códigos para imprimir</button><button class="btn small ghost" type="button" data-l="editar">Cambiar grupo o cursos</button><button class="btn small ghost danger" type="button" data-l="retirar">Retirar</button><button class="btn small ghost" type="button" data-l="reactivar">Reactivar</button><button class="link-btn" type="button" data-l="nada">Quitar selección</button></span></div>
    <p class="pn-count" role="status"></p><div class="pn-list"></div>`;
  L.el = new Set([...L.el].filter(id => todos.some(e => e.id === id)));
  const ven = () => { const q = L.q.trim().toLowerCase(), cod = limpiaCodigo(q); return todos.filter(e => en[L.estado](e) && (!L.grupo || e.grupo === (L.grupo === SIN ? '' : L.grupo)) && (!q || `${e.nombre} ${e.identificador}`.toLowerCase().includes(q) || (cod.length >= 3 && (e.codigo || '').includes(cod)))).sort({ nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es'), avance: (a, b) => b.avance - a.avance, menos: (a, b) => a.avance - b.avance, min: (a, b) => b.min - a.min, sin: (a, b) => (b.sin ?? 999) - (a.sin ?? 999) }[L.orden]); };
  const lote = () => { const l = $('.pn-lote', view); l.hidden = !L.el.size; $('b', l).textContent = plural(L.el.size, 'elegido', 'elegidos'); const ret = L.estado === 'retirados'; $$('[data-l]', l).forEach(b => { b.hidden = { codigos: ret, editar: ret, retirar: ret, reactivar: !ret }[b.dataset.l] || false; }); };
  const pinta = () => {
    const xs = ven(), el = puede(); $('.pn-count', view).textContent = plural(xs.length, 'estudiante', 'estudiantes');
    $('.pn-list', view).innerHTML = xs.length ? `<div class="pn-tabla"><table class="pn-table"><thead><tr>${el ? '<th class="pn-check"><input type="checkbox" data-todos aria-label="Elegir todos"></th>' : ''}<th>Estudiante</th><th>Grupo</th><th>Última vez</th><th>Avance</th><th class="pn-num">Minutos (28 días)</th><th class="pn-num">Aciertos</th>${gestor() ? '<th>Código</th>' : ''}</tr></thead><tbody>${xs.map(e => `<tr data-id="${e.id}">${el ? `<td data-l="Elegir" class="pn-check"><input type="checkbox" data-el="${e.id}" aria-label="Elegir a ${esc(e.nombre)}"${L.el.has(e.id) ? ' checked' : ''}></td>` : ''}<td class="pn-main"><span class="pn-per">${avatar(e.nombre)}<span><a href="#estudiante/${e.id}">${esc(e.nombre)}</a><span class="pn-sub">${e.alerta ? `<span class="po-al">${e.alerta.t}</span>` : esc(e.cursos.map(cNom).join(', '))}</span></span></span></td>
      <td data-l="Grupo">${esc(gNom(e.grupo))}</td><td data-l="Última vez">${ultima(e)}</td><td data-l="Avance"><span class="po-av">${barra(e.avance)}<b>${pc(e.avance)}</b></span></td><td data-l="Minutos" class="pn-num">${e.min}</td><td data-l="Aciertos" class="pn-num">${e.aciertos == null ? '—' : `${e.aciertos} %`}</td>${gestor() ? `<td data-l="Código">${e.codigo ? `<button class="po-cod" type="button" data-cod="${e.codigo}" aria-label="Copiar el código de ${esc(e.nombre)}">${muestraCodigo(e.codigo)}</button>` : '—'}</td>` : ''}</tr>`).join('')}</tbody></table></div>` : `<p class="pn-state">${D.estudiantes.length ? 'Nadie coincide con el filtro.' : 'Aún no hay estudiantes.'}</p>`;
    $$('tr[data-id]', view).forEach(r => { r.onclick = e => { if (!e.target.closest('a, input, button')) location.hash = `estudiante/${r.dataset.id}`; }; });
    $$('[data-el]', view).forEach(c => { c.onchange = () => { c.checked ? L.el.add(+c.dataset.el) : L.el.delete(+c.dataset.el); lote(); }; });
    $$('[data-cod]', view).forEach(b => { b.onclick = () => copiar(muestraCodigo(b.dataset.cod)); });
    const t = $('[data-todos]', view); if (t) t.onchange = () => { xs.forEach(e => (t.checked ? L.el.add(e.id) : L.el.delete(e.id))); pinta(); $('[data-todos]', view).checked = t.checked; };
    lote();
  };
  $$('.pn-filters [name], .pn-chips [name]', view).forEach(x => { x.oninput = () => { L[x.name] = x.value; if (x.name === 'estado') L.el.clear(); pinta(); }; });
  $('[data-alta]', view)?.addEventListener('click', dlgAlta);
  $('[data-csv]', view).onclick = () => csv('estudiantes', [['Nombre', 'Grupo', 'Documento', 'Cursos', 'Última vez', 'Avance %', 'Lecciones', 'Minutos 28 días', 'Aciertos %', ...(gestor() ? ['Código'] : [])], ...ven().map(e => [e.nombre, e.grupo, e.identificador, e.cursos.map(cNom).join(', '), e.ult || '', Math.round(e.avance * 100), e.hechas ?? 0, e.min, e.aciertos ?? '', ...(gestor() ? [e.codigo ? muestraCodigo(e.codigo) : ''] : [])])]);
  $$('[data-l]', view).filter(b => b.tagName === 'BUTTON').forEach(b => { b.onclick = async () => {
    const ids = [...L.el], xs = todos.filter(e => L.el.has(e.id)), n = plural(ids.length, 'estudiante', 'estudiantes');
    if (b.dataset.l === 'nada') { L.el.clear(); return pinta(); }
    if (b.dataset.l === 'codigos') return tarjetas(xs);
    if (b.dataset.l === 'editar') return dlgEditar(xs);
    if (b.dataset.l === 'retirar' && !(await confirma({ t: `¿Retirar ${n}?`, p: 'Se les cierran los cursos y sus cupos quedan libres. Su avance se conserva y los puedes reactivar.', ok: 'Retirar', peligro: true }))) return;
    ocupado(b, async () => { await cambia(b.dataset.l, { ids }, b.dataset.l === 'retirar' ? `${n}: cupos liberados` : `${n} de vuelta`); L.el.clear(); vEstudiantes(); });
  }; });
  pinta();
}
// Registrar: uno por uno, pegando de Excel o con un archivo. Muestra lo que entendió antes de guardar.
function dlgAlta() {
  const libres = D.institucion.cupos - D.institucion.usados;
  ventana(`<form class="pn-form1" novalidate><h2>Registrar estudiantes</h2><p>Pega la lista desde Excel o escríbela: un estudiante por renglón, con <b>nombre, grupo y documento</b> (los dos últimos son opcionales).</p>
    <label class="fld"><span>Lista</span><textarea name="lista" rows="7" spellcheck="false" placeholder="Ana Ríos, 11A, 1020304050&#10;Juan Mejía, 11A"></textarea></label><label class="po-arch"><input type="file" accept=".csv,.txt,text/csv,text/plain"><span>Subir un archivo CSV</span></label>
    <label class="fld"><span>Grupo para quienes no lo traen (opcional)</span><input name="grupo" maxlength="40" list="po-gr"></label>${datalist()}${checks(D.cursos.map(c => c.id))}
    <div class="po-prev" role="status"></div><label class="check"><input type="checkbox" name="ok"><span>La institución tiene la autorización del representante legal de cada menor, dada después de escuchar al estudiante, y la de los mayores de edad, para registrarlos y ver su avance (Ley 1581 de 2012; Decreto 1074 de 2015, art. 2.2.2.25.2.9).</span></label>
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit" disabled>Registrar</button></div></form>`, d => {
    const f = $('form', d), b = $('[type=submit]', d); let r = { lista: [], malas: [] };
    const pinta = () => {
      r = instLista(f.lista.value); const n = r.lista.length;
      const ya = new Set(D.estudiantes.filter(e => e.activo && e.identificador).map(e => e.identificador.toLowerCase())), rep = r.lista.filter(x => ya.has(x.identificador.toLowerCase())).length;
      $('.po-prev', d).innerHTML = !n && !r.malas.length ? `<p>Quedan <b>${libres}</b> cupos.</p>` : `<p><b>${n}</b> ${n === 1 ? 'estudiante listo' : 'estudiantes listos'} · quedan ${libres} cupos</p>${n ? `<ul>${r.lista.slice(0, 5).map(x => `<li>${esc(x.nombre)}<small>${esc(x.grupo || f.grupo.value || 'Sin grupo')}${x.identificador ? ` · ${esc(x.identificador)}` : ''}</small></li>`).join('')}${n > 5 ? `<li>y ${n - 5} más</li>` : ''}</ul>` : ''}${rep ? `<p class="po-mal">${plural(rep, 'ya está registrado', 'ya están registrados')} (mismo documento): no se repiten.</p>` : ''}${n - rep > libres ? `<p class="po-mal">No alcanzan los cupos: sobran ${n - rep - libres}.</p>` : ''}${n > 500 ? '<p class="po-mal">Máximo 500 a la vez.</p>' : ''}${r.ignora?.length ? `<p class="pn-count">No se usan estas columnas: ${esc(r.ignora.slice(0, 6).join(', '))}.</p>` : ''}${r.raro ? '<p class="po-mal">La segunda columna parece traer apellidos, no grupos. Pon una primera fila con los títulos (Nombres, Apellidos, Grupo, Documento) y los leemos bien.</p>' : ''}${r.malas.slice(0, 4).map(m => `<p class="po-mal">Renglón ${m.linea}: ${m.por}. «${esc(m.texto.slice(0, 40))}»</p>`).join('')}`;
      b.disabled = !n || n - rep > libres || n > 500 || !f.ok.checked || !marcados(f).length;
    };
    f.oninput = pinta;
    $('[type=file]', d).onchange = async e => { const a = e.target.files[0]; if (!a) return; if (/\.xlsx?$/i.test(a.name)) return toast('Es un archivo de Excel: cópialo y pégalo, o guárdalo como CSV', true); if (a.size > 500000) return toast('El archivo es muy grande', true); const buf = await a.arrayBuffer(); let t; try { t = new TextDecoder('utf-8', { fatal: true }).decode(buf); } catch (x) { t = new TextDecoder('windows-1252').decode(buf); } f.lista.value = t; pinta(); };
    f.onsubmit = e => { e.preventDefault(); ocupado(b, async () => {
      const x = await cambia('alta', { lista: r.lista.map(y => ({ ...y, grupo: y.grupo || f.grupo.value.trim() })), cursos: marcados(f), acepta: f.ok.checked });
      d.close();
      ventana(`<div class="pn-form1"><h2>${plural(x.nuevos.length, 'estudiante registrado', 'estudiantes registrados')}</h2><p>Cada uno entra en <b>${esc(location.host)}</b> con su código.</p>${x.repetidos.length ? `<p class="po-mal">No se repitieron: ${esc(x.repetidos.slice(0, 8).join(', '))}${x.repetidos.length > 8 ? '…' : ''}</p>` : ''}<ul class="po-nuevos">${x.nuevos.slice(0, 60).map(y => `<li><span>${esc(y.nombre)}<small>${esc(gNom(y.grupo))}</small></span><code>${muestraCodigo(y.codigo)}</code></li>`).join('')}</ul><div class="pn-pie"><button class="btn ghost" type="button" data-x>Descargar Excel</button><button class="btn main" type="button" data-t>Imprimir tarjetas</button><button class="btn ghost" type="button" data-cerrar>Cerrar</button></div></div>`, w => {
        $('[data-x]', w).onclick = () => csv('codigos', [['Nombre', 'Grupo', 'Código'], ...x.nuevos.map(y => [y.nombre, y.grupo, muestraCodigo(y.codigo)])]); $('[data-t]', w).onclick = () => tarjetas(x.nuevos);
      });
    }); };
    pinta();
  });
}
function dlgEditar(xs) {
  const uno = xs.length === 1 ? xs[0] : null, comun = D.cursos.map(c => c.id).filter(c => xs.every(e => e.cursos.includes(c)));
  ventana(`<form class="pn-form1" novalidate><h2>${uno ? 'Editar estudiante' : `Cambiar ${xs.length} estudiantes`}</h2>${uno ? `<label class="fld"><span>Nombre</span><input name="nombre" maxlength="80" value="${esc(uno.nombre)}"></label><label class="fld"><span>Documento (opcional)</span><input name="identificador" maxlength="40" value="${esc(uno.identificador)}"></label>` : ''}
    <label class="fld"><span>${uno ? 'Grupo' : 'Grupo (vacío: no cambia)'}</span><input name="grupo" maxlength="40" list="po-gr" value="${esc(uno ? uno.grupo : '')}"></label>${datalist()}${uno ? '' : '<label class="check"><input type="checkbox" name="cc"><span>Cambiar también los cursos</span></label>'}${checks(uno ? uno.cursos : comun)}
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Guardar</button></div></form>`, d => {
    const f = $('form', d), fs = $('fieldset', d); if (!uno) { fs.hidden = true; f.cc.onchange = () => { fs.hidden = !f.cc.checked; }; }
    f.onsubmit = e => { e.preventDefault(); const p = { ids: xs.map(x => x.id) };
      if (uno) { p.nombre = f.nombre.value.trim(); p.identificador = f.identificador.value.trim(); if (p.nombre.length < 2) return toast('Escribe el nombre', true); }
      if (uno || f.grupo.value.trim()) p.grupo = f.grupo.value.trim();
      if (uno || f.cc.checked) { p.cursos = marcados(f); if (!p.cursos.length) return toast('Elige al menos un curso', true); }
      ocupado($('[type=submit]', d), async () => { await cambia('editar', p, 'Guardado'); d.close(); }); };
  });
}
// Tarjetas para recortar, con el código de cada uno.
function tarjetas(xs) {
  const con = xs.filter(e => e.codigo); if (!con.length) return toast('No hay códigos para imprimir', true);
  $('#po-hoja').className = ''; $('#po-hoja').innerHTML = con.map(e => `<article><img src="/brand/logo-light.svg" alt="" width="70" height="26"><b>${esc(e.nombre)}</b><small>${esc(D.institucion.nombre)}${e.grupo ? ` · ${esc(e.grupo)}` : ''}</small><code>${muestraCodigo(e.codigo)}</code><small>Entra en ${esc(location.host)} y escribe tu código. Es personal.</small></article>`).join('');
  $('#po-hoja').hidden = false; print(); $('#po-hoja').hidden = true;
}

// ---------- un estudiante ----------
async function vEstudiante(id) {
  const base = D.estudiantes.find(x => x.id === id); if (!base) { view.innerHTML = '<a class="pn-back" href="#estudiantes">← Estudiantes</a><p class="pn-state">No existe ese estudiante.</p>'; return; }
  const e = C.filas.find(x => x.id === id) || { ...base, avance: 0, hechas: 0, total: 0, min: 0, aciertos: null, sin: null, dias: 0 };
  const hs = C.hechas.get(id) || new Map(), us = new Map(D.uso.filter(u => u[0] === id).map(u => [u[1], u])), lun = instDia(D.hoy, -((new Date(`${D.hoy}T00:00:00Z`).getUTCDay() + 6) % 7) - 77);
  const dias = Array.from({ length: 84 }, (_, k) => instDia(lun, k)), fza = d => { const s = us.get(d)?.[2] || 0; return s >= 1800 ? 4 : s >= 900 ? 3 : s >= 300 ? 2 : s ? 1 : 0; };
  const metas = D.metas.filter(m => (!m.grupo || m.grupo === e.grupo) && e.cursos.includes(m.curso)).map(m => ({ m, n: m.lecciones.filter(l => hs.has(l)).length }));
  view.innerHTML = `<a class="pn-back" href="#estudiantes">← Estudiantes</a><div class="pn-head"><div class="pn-quien">${avatar(e.nombre)}<div><h1>${esc(e.nombre)}</h1><p class="pn-count">${esc(gNom(e.grupo))}${e.identificador ? ` · ${esc(e.identificador)}` : ''} · ${ultima(e)}${e.activo ? '' : ' · Retirado'}</p></div></div>${puede() ? `<div class="pn-acc">${X && e.cursos.includes('preicfes') && e.activo && e.grupo ? `<a class="btn ghost" href="#alumno/${id}">Preicfes</a>` : ''}<button class="btn ghost" type="button" data-ed>Editar</button>${e.activo ? '<button class="btn ghost danger" type="button" data-ret>Retirar</button>' : '<button class="btn main" type="button" data-rea>Reactivar</button>'}</div>` : ''}</div>
    ${e.alerta ? `<p class="po-aviso mal">${e.alerta.t}.</p>` : ''}
    <div class="po-kpis"><section class="pn-card po-cupos">${aro(e.avance, pc(e.avance), 'de avance')}<div><p><b>${e.hechas}</b> de ${e.total} lecciones</p><p><b>${e.nuevas || 0}</b> en 28 días</p></div></section><section class="pn-card po-k"><span>Tiempo (28 días)</span><b>${e.min}<small> min</small></b><em>${plural(e.dias || 0, 'día', 'días')} de estudio</em></section><section class="pn-card po-k"><span>Aciertos</span><b>${e.aciertos == null ? '—' : `${e.aciertos} %`}</b><em>${e.ejercicios || 0} ejercicios</em></section><section class="pn-card po-k"><span>Promedio de todos</span><b>${pc(C.prom)}</b><em>de avance</em></section></div>
    <div class="pn-dash"><section class="pn-card"><h2>Días de estudio</h2><div class="po-cal" role="img" aria-label="${plural(dias.filter(d => fza(d)).length, 'día', 'días')} con actividad en 12 semanas">${dias.map(d => (d > D.hoy ? '<i class="no"></i>' : `<i class="f${fza(d)}" title="${fecha(d)}: ${Math.round((us.get(d)?.[2] || 0) / 60)} min"></i>`)).join('')}</div><p class="pn-count">Últimas 12 semanas. Más intenso, más minutos.</p></section>
      <section class="pn-card"><h2>Metas</h2>${metas.length ? `<ul class="po-grupos">${metas.map(({ m, n }) => `<li><div><span><b>${esc(m.titulo)}</b><small>${esc(cNom(m.curso))} · hasta el ${fecha(m.hasta)}</small></span>${barra(n / m.lecciones.length)}<b>${n}/${m.lecciones.length}</b></div></li>`).join('')}</ul>` : '<p class="pn-count">Sin metas.</p>'}<h2>Evaluaciones</h2><div data-ev><p class="pn-count">Cargando…</p></div></section></div>
    ${D.cursos.filter(c => e.cursos.includes(c.id)).map(c => { const ls = D.lecciones.filter(l => l.curso === c.id), n = ls.filter(l => hs.has(l.id)).length; return `<section class="pn-card"><div class="pn-head"><h2>${esc(c.nombre)}</h2><span class="pn-count">${n} de ${ls.length}</span></div><ol class="po-ls">${ls.map(l => `<li class="${hs.has(l.id) ? 'ok' : ''}" title="${hs.has(l.id) ? `Hecha${hs.get(l.id) ? ` el ${fecha(hs.get(l.id))}` : ''}` : 'Pendiente'}">${esc(l.titulo)}</li>`).join('')}</ol></section>`; }).join('')}
    ${gestor() ? `<div class="pn-cols"><section class="pn-card"><h2>Código de acceso</h2><p class="pn-code grande">${e.codigo ? muestraCodigo(e.codigo) : e.propia ? 'Usa su cuenta personal' : e.activo ? 'Sin código' : 'Retirado'}</p><div class="pn-acc">${e.codigo ? '<button class="btn small main" type="button" data-co>Copiar código</button><button class="btn small ghost" type="button" data-me>Copiar mensaje</button><button class="btn small ghost" type="button" data-im>Imprimir tarjeta</button>' : ''}${puede() && e.activo && !e.propia ? `<button class="btn small ghost" type="button" data-nu>${e.codigo ? 'Cambiar código' : 'Crear código'}</button><button class="btn small ghost" type="button" data-di>Liberar dispositivos</button>` : ''}</div></section>${puede() ? '<section class="pn-card"><h2>Nota del equipo</h2><form data-nota><label class="fld"><span>Solo la ven los gestores</span><textarea name="nota" rows="3" maxlength="400"></textarea></label><div class="pn-pie"><button class="btn small main" type="submit" disabled>Guardar nota</button></div></form></section>' : ''}</div>` : ''}`;
  const on = (s, fn) => { const b = $(s, view); if (b) b.onclick = () => fn(b); };
  on('[data-ed]', () => dlgEditar([e])); on('[data-co]', () => copiar(muestraCodigo(e.codigo))); on('[data-me]', () => copiar(mensaje(e.nombre, e.codigo))); on('[data-im]', () => tarjetas([e]));
  on('[data-ret]', async b => { if (await confirma({ t: '¿Retirar a este estudiante?', p: 'Se le cierran los cursos y su cupo queda libre. Su avance se conserva.', ok: 'Retirar', peligro: true })) ocupado(b, () => cambia('retirar', { ids: [id] }, 'Cupo liberado')); });
  on('[data-rea]', b => ocupado(b, () => cambia('reactivar', { ids: [id] }, 'Está de vuelta')));
  on('[data-nu]', async b => { if (!e.codigo || await confirma({ t: '¿Cambiar el código?', p: 'El anterior deja de servir y se cierran sus sesiones. El avance no cambia.', ok: 'Cambiar' })) ocupado(b, async () => { const r = await cambia('codigo', { ids: [id] }); toast(`Código nuevo: ${muestraCodigo(r.codigo)}`); }); });
  on('[data-di]', b => ocupado(b, async () => { await api('dispositivos', { ids: [id] }); toast('Listo: ya puede entrar en otro dispositivo'); }));
  const nf = $('[data-nota]', view); if (nf) nf.onsubmit = ev => ev.preventDefault();   // hasta que cargue la nota guardada
  try {
    const x = await api('estudiante', { id }); if (location.hash !== `#estudiante/${id}`) return;
    $('[data-ev]', view).innerHTML = x.evaluaciones.length ? `<ul class="po-grupos">${x.evaluaciones.map(v => `<li><div><span><b>${esc(v.titulo)}</b><small>${esc(cNom(v.curso))}</small></span>${barra(v.nota / 100)}<b>${v.nota} %</b></div></li>`).join('')}</ul>` : '<p class="pn-count">Aún no presenta ninguna.</p>';
    const f = $('[data-nota]', view); if (f) { f.nota.value = x.nota; $('button', f).disabled = false; f.onsubmit = ev => { ev.preventDefault(); ocupado($('button', f), async () => { await api('editar', { ids: [id], nota: f.nota.value }); toast('Nota guardada'); }); }; }
  } catch (x) { const v = $('[data-ev]', view); if (v) v.innerHTML = '<p class="po-mal">No se pudieron cargar las evaluaciones.</p>'; }
}

// ---------- cursos y lecciones ----------
function vContenido() {
  const c = instCalcula(D, { ...F, dias: 28, curso: '' });
  view.innerHTML = `${avisos()}<div class="pn-head"><div><h1>Cursos y lecciones</h1><p class="pn-hoy">Cuántos ya hicieron cada lección. Toca una para ver quién falta.</p></div><label class="fld po-fg"><span>Grupo</span><select data-g><option value="">Todos</option>${grupos().map(g => `<option value="${esc(g || SIN)}"${F.grupo === (g || SIN) ? ' selected' : ''}>${esc(gNom(g))}</option>`).join('')}</select></label></div>
    ${c.cursos.map(x => `<section class="pn-card"><div class="pn-head"><h2>${esc(x.nombre)}</h2><span class="pn-count">${plural(x.n, 'estudiante', 'estudiantes')} · ${pc(x.avance)} de avance</span></div><ol class="po-mapa">${x.mapa.map((l, i) => `<li><button type="button" data-l="${esc(l.id)}" style="--p:${x.n ? (l.n / x.n).toFixed(2) : 0}"><small>${i + 1}</small><span>${esc(l.titulo)}</span><b>${l.n}/${x.n}</b></button></li>`).join('')}</ol></section>`).join('')}`;
  $('[data-g]', view).onchange = e => { F.grupo = e.target.value; vContenido(); $('[data-g]', view).focus(); };
  $$('[data-l]', view).forEach(b => { b.onclick = () => { const l = D.lecciones.find(x => x.id === b.dataset.l), xs = c.filas.filter(e => e.cursos.includes(l.curso)), no = xs.filter(e => !c.hechas.get(e.id)?.has(l.id)); ventana(`<div class="pn-form1"><h2>${esc(l.titulo)}</h2><p>${plural(xs.length - no.length, 'la hizo', 'la hicieron')} de ${xs.length}.</p>${no.length ? `<h3>Falta${no.length === 1 ? '' : 'n'}</h3><ul class="po-nuevos">${no.map(e => `<li><span>${esc(e.nombre)}<small>${esc(gNom(e.grupo))}</small></span><a href="#estudiante/${e.id}" data-cerrar>Ver</a></li>`).join('')}</ul>` : '<p>Ya la hicieron todos.</p>'}<div class="pn-pie">${no.length ? '<button class="btn ghost" type="button" data-cp>Copiar nombres</button>' : ''}<button class="btn main" type="button" data-cerrar>Cerrar</button></div></div>`, d => { const k = $('[data-cp]', d); if (k) k.onclick = () => copiar(no.map(e => e.nombre).join('\n')); }); }; });
}

// ---------- metas ----------
function vMetas() {
  const xs = D.metas.map(m => ({ m, r: instMeta(m, D.estudiantes, C.hechas, D.hoy) })), vivas = xs.filter(x => x.r.quedan >= 0).sort((a, b) => a.r.quedan - b.r.quedan), viejas = xs.filter(x => x.r.quedan < 0), ok = D.institucion.vigente || D.yo.papel === 'zuka';
  const t = ({ m, r }) => `<article class="pn-card po-meta">${aro(r.p, pc(r.p), `${r.ok} de ${r.n}`)}<div><h2>${esc(m.titulo)}</h2><p class="pn-count">${esc(cNom(m.curso))} · ${plural(m.lecciones.length, 'lección', 'lecciones')} · ${m.grupo ? esc(m.grupo) : 'Todos'} · ${r.quedan < 0 ? `terminó el ${fecha(m.hasta)}` : r.quedan === 0 ? 'es para hoy' : r.quedan === 1 ? 'queda 1 día' : `quedan ${r.quedan} días`}</p><div class="pn-acc"><button class="btn small ghost" type="button" data-v="${m.id}">Ver quién falta</button>${ok && (gestor() || D.yo.grupos.includes(m.grupo)) ? `<button class="btn small ghost danger" type="button" data-b="${m.id}">Borrar</button>` : ''}</div></div></article>`;
  view.innerHTML = `${avisos()}<div class="pn-head"><div><h1>Metas</h1><p class="pn-hoy">El estudiante las ve en Inicio y sabe cuánto le queda.</p></div>${ok ? '<button class="btn main" type="button" data-n>Nueva meta</button>' : ''}</div>${vivas.length ? `<div class="po-metas">${vivas.map(t).join('')}</div>` : `<section class="po-vacio">${ico('metas')}<h2>Aún no hay metas</h2><p>Por ejemplo: «Terminar Conjuntos antes del viernes», para 10A.</p></section>`}${viejas.length ? `<h2>Anteriores</h2><div class="po-metas">${viejas.map(t).join('')}</div>` : ''}`;
  $('[data-n]', view)?.addEventListener('click', () => dlgMeta());
  $$('[data-b]', view).forEach(b => { b.onclick = async () => { if (await confirma({ t: '¿Borrar esta meta?', p: 'Desaparece para los estudiantes. Su avance no cambia.', ok: 'Borrar', peligro: true })) ocupado(b, () => cambia('meta_borrar', { id: +b.dataset.b }, 'Meta borrada')); }; });
  $$('[data-v]', view).forEach(b => { b.onclick = () => { const { m, r } = xs.find(x => x.m.id === +b.dataset.v), no = r.filas.filter(x => !x.ok).sort((a, c) => a.n - c.n); ventana(`<div class="pn-form1"><h2>${esc(m.titulo)}</h2><p>${r.ok} de ${r.n} ya la cumplieron.</p>${no.length ? `<ul class="po-nuevos">${no.map(x => `<li><span>${esc(x.e.nombre)}<small>${esc(gNom(x.e.grupo))}</small></span><b>${x.n}/${m.lecciones.length}</b></li>`).join('')}</ul>` : ''}<div class="pn-pie">${no.length ? '<button class="btn ghost" type="button" data-cp>Copiar nombres</button>' : ''}<button class="btn main" type="button" data-cerrar>Cerrar</button></div></div>`, d => { const k = $('[data-cp]', d); if (k) k.onclick = () => copiar(no.map(x => x.e.nombre).join('\n')); }); }; });
}
function dlgMeta(pre = {}) {
  const gs = gestor() ? [['', 'Todos los estudiantes'], ...grupos().filter(Boolean).map(g => [g, g])] : D.yo.grupos.map(g => [g, g]);
  ventana(`<form class="pn-form1" novalidate><h2>Nueva meta</h2><label class="fld"><span>Nombre</span><input name="titulo" maxlength="100" placeholder="Terminar Conjuntos" value="${esc(pre.titulo || '')}"></label><div class="pn-dos"><label class="fld"><span>Para</span><select name="grupo">${gs.map(([v, t]) => `<option value="${esc(v)}"${pre.grupo === v ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label><label class="fld"><span>Hasta</span><input name="hasta" type="date" min="${D.hoy}" value="${instDia(D.hoy, 7)}"></label></div><label class="fld"><span>Curso</span><select name="curso">${D.cursos.map(c => `<option value="${c.id}"${pre.curso === c.id ? ' selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select></label>
    <fieldset class="pn-checks po-lec"><legend>Lecciones</legend></fieldset><p class="pn-count" data-n></p><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Crear meta</button></div></form>`, d => {
    const f = $('form', d), fs = $('.po-lec', d), cuenta = () => { $('[data-n]', d).textContent = plural(marcados(f, 'lec').length, 'lección elegida', 'lecciones elegidas'); };
    const pinta = () => { $$('label', fs).forEach(x => x.remove()); fs.insertAdjacentHTML('beforeend', D.lecciones.filter(l => l.curso === f.curso.value && (!pre.prefijo || l.curso !== pre.curso || l.id.startsWith(pre.prefijo))).map((l, i) => `<label class="check"><input type="checkbox" name="lec" value="${esc(l.id)}"${(pre.lecciones ? pre.lecciones.includes(l.id) : i < 3) ? ' checked' : ''}><span>${i + 1}. ${esc(l.titulo)}</span></label>`).join('')); cuenta(); };
    f.curso.onchange = pinta; fs.onchange = cuenta; pinta();
    f.onsubmit = e => { e.preventDefault(); const lecciones = marcados(f, 'lec'); if (f.titulo.value.trim().length < 2) { toast('Escribe el nombre de la meta', true); return f.titulo.focus(); } if (!lecciones.length) return toast('Elige al menos una lección', true); if (!f.hasta.value) return toast('Elige la fecha', true);
      ocupado($('[type=submit]', d), async () => { await cambia('meta_guardar', { titulo: f.titulo.value.trim(), curso: f.curso.value, lecciones, grupo: f.grupo.value, hasta: f.hasta.value }, 'Meta creada'); d.close(); }); };
  });
}

// ---------- equipo ----------
function vEquipo() {
  view.innerHTML = `${avisos()}<div class="pn-head"><div><h1>Equipo</h1><p class="pn-hoy">Los gestores administran todo. Los docentes ven sus grupos y ponen metas. No gastan cupo.</p></div>${puede() ? '<div class="pn-acc"><button class="btn ghost" type="button" data-im>Imprimir códigos</button><button class="btn main" type="button" data-n>Crear código</button></div>' : ''}</div>
    <ul class="po-equipo">${D.equipo.map(x => `<li class="pn-card${x.activo ? '' : ' off'}">${avatar(x.nombre)}<div><b>${esc(x.nombre)}${x.yo ? ' (tú)' : ''}</b><p class="pn-count">${x.papel === 'gestor' ? 'Gestor' : `Docente · ${esc(x.grupos.join(', ') || 'sin grupos')}`}${deQuien(x.id)} · ${x.activo ? (x.entro ? (x.ultima ? `última vez ${fecha(instBogota(x.ultima))}` : 'ya entró') : 'aún no entra') : 'sin acceso'}</p>${x.codigo && x.activo ? `<p><button class="po-cod" type="button" data-cod="${x.codigo}">${muestraCodigo(x.codigo)}</button></p>` : ''}</div>
      ${puede() ? `<div class="pn-acc"><button class="btn small ghost" type="button" data-e="${x.id}">Editar</button>${x.activo ? `<button class="btn small ghost" type="button" data-c="${x.id}">Código nuevo</button>` : ''}${x.yo ? '' : `<button class="btn small ghost${x.activo ? ' danger' : ''}" type="button" data-a="${x.id}">${x.activo ? 'Quitar acceso' : 'Devolver acceso'}</button>`}</div>` : ''}</li>`).join('')}</ul>
    <section class="pn-card"><h2>Grupos</h2><ul class="po-grupos">${grupos().map(g => `<li><div><span><b>${esc(gNom(g))}</b><small>${plural(D.estudiantes.filter(e => e.activo && e.grupo === g).length, 'estudiante', 'estudiantes')}</small></span>${puede() && g ? `<button class="btn small ghost" type="button" data-g="${esc(g)}">Cambiar nombre</button>` : ''}</div></li>`).join('') || '<li class="pn-count">Los grupos salen de la lista de estudiantes.</li>'}</ul></section>
    <section class="pn-card"><h2>Últimos cambios</h2><ul class="po-reg">${D.registro.map(r => `<li><span>${esc(r.quien)} ${ACC[r.accion] || esc(r.accion)}${r.detalle?.cuantos ? ` (${r.detalle.cuantos})` : r.detalle?.nombre ? `: ${esc(r.detalle.nombre)}` : ''}</span><small>${new Date(r.en).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Bogota' })}</small></li>`).join('') || '<li class="pn-count">Sin cambios todavía.</li>'}</ul></section>`;
  const de = id => D.equipo.find(x => x.id === +id);
  $('[data-im]', view)?.addEventListener('click', () => tarjetasEquipo(D.equipo.filter(x => x.activo && x.codigo)));
  $('[data-n]', view)?.addEventListener('click', () => dlgEquipo());
  $$('[data-cod]', view).forEach(b => { b.onclick = () => copiar(muestraCodigo(b.dataset.cod)); });
  $$('[data-e]', view).forEach(b => { b.onclick = () => dlgEquipo(de(b.dataset.e)); });
  $$('[data-c]', view).forEach(b => { b.onclick = async () => { const x = de(b.dataset.c); if (await confirma({ t: `¿Código nuevo para ${esc(x.nombre)}?`, p: x.yo ? 'Es el tuyo: se cerrará esta sesión y entrarás con el nuevo. Cópialo antes de salir.' : 'El anterior deja de servir y se cierran sus sesiones.', ok: 'Crear código' })) ocupado(b, async () => { const r = await api('equipo_codigo', { id: x.id }); verCodigo(x.nombre, r.codigo, x.yo); if (!x.yo) { await carga(); vEquipo(); } }); }; });
  $$('[data-a]', view).forEach(b => { b.onclick = async () => { const x = de(b.dataset.a); if (!x.activo || await confirma({ t: `¿Quitar el acceso a ${esc(x.nombre)}?`, p: 'Ya no podrá entrar al portal. Puedes devolvérselo cuando quieras.', ok: 'Quitar acceso', peligro: true })) ocupado(b, () => cambia('equipo_estado', { id: x.id, si: !x.activo }, x.activo ? 'Acceso retirado' : 'Acceso devuelto')); }; });
  $$('[data-g]', view).forEach(b => { b.onclick = () => ventana(`<form class="pn-form1"><h2>Cambiar nombre de ${esc(b.dataset.g)}</h2><label class="fld"><span>Nombre nuevo</span><input name="n" maxlength="40" value="${esc(b.dataset.g)}" required></label><p>Si ya existe otro grupo con ese nombre, quedan juntos.</p><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">Guardar</button></div></form>`, d => { $('form', d).onsubmit = e => { e.preventDefault(); const n = e.target.n.value.trim(); if (n) ocupado($('[type=submit]', d), async () => { await cambia('grupo_renombrar', { grupo: b.dataset.g, nuevo: n }, 'Grupo actualizado'); d.close(); }); }; }); });
}
const ACC = { alta: 'registró estudiantes', editar: 'editó estudiantes', retirar: 'retiró estudiantes', reactivar: 'reactivó estudiantes', codigo: 'cambió un código', dispositivos: 'liberó dispositivos', meta_guardar: 'creó una meta', meta_borrar: 'borró una meta', equipo_guardar: 'cambió el equipo', equipo_estado: 'cambió un acceso del equipo', equipo_codigo: 'renovó un código del equipo', grupo_renombrar: 'cambió el nombre de un grupo', pedir_cupos: 'pidió más cupos', asignar: 'cambió un responsable', simulacro_crear: 'asignó un simulacro', simulacro_editar: 'cambió un simulacro', simulacro_borrar: 'borró un simulacro', intento_nuevo: 'dio otro intento en un simulacro', aviso_guardar: 'publicó un aviso', aviso_borrar: 'borró un aviso' };
const verCodigo = (n, c, yo) => ventana(`<div class="pn-form1"><h2>Código de ${esc(n)}</h2><p class="pn-code grande">${muestraCodigo(c)}</p><p>${yo ? 'Guárdalo: lo necesitas para volver a entrar.' : `Entra en ${esc(location.host)}/instituciones/portal con este código. Solo se muestra hasta que lo use.`}</p><div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cerrar</button><button class="btn main" type="button" data-cp>Copiar</button></div></div>`, d => { $('[data-cp]', d).onclick = () => copiar(muestraCodigo(c)); });
function dlgEquipo(x) {
  const gs = grupos().filter(Boolean), todos = [...new Set([...gs, ...(x?.grupos || [])])];
  ventana(`<form class="pn-form1" novalidate><h2>${x ? 'Editar' : 'Crear código para el equipo'}</h2><label class="fld"><span>Nombre</span><input name="nombre" maxlength="80" value="${esc(x?.nombre || '')}"></label><label class="fld"><span>Correo (opcional)</span><input name="correo" type="email" maxlength="120" value="${esc(x?.correo || '')}"></label>
    <div class="pn-seg" role="radiogroup" aria-label="Papel">${[['docente', 'Docente', 've sus grupos'], ['gestor', 'Gestor', 'administra todo']].map(([v, t, s]) => `<label><input type="radio" name="papel" value="${v}"${(x?.papel || 'docente') === v ? ' checked' : ''}><span>${t}<small>${s}</small></span></label>`).join('')}</div>${todos.length ? checks(x?.grupos || [], todos.map(g => [g, g]), 'grupos', 'Grupos del docente') : '<p class="po-mal" data-sg>Primero registra estudiantes con grupo, para asignarlos a un docente.</p>'}
    <div class="pn-pie"><button class="btn ghost" type="button" data-cerrar>Cancelar</button><button class="btn main" type="submit">${x ? 'Guardar' : 'Crear código'}</button></div></form>`, d => {
    const f = $('form', d), ve = () => { const e = $('fieldset, [data-sg]', d); if (e) e.hidden = f.papel.value === 'gestor'; }; f.onchange = ve; ve();
    f.onsubmit = e => { e.preventDefault(); const p = { nombre: f.nombre.value.trim(), correo: f.correo.value.trim(), papel: f.papel.value, grupos: marcados(f, 'grupos') }; if (x) p.id = x.id; if (p.nombre.length < 2) return toast('Escribe el nombre', true); if (p.papel === 'docente' && !p.grupos.length) return toast('Elige al menos un grupo', true);
      ocupado($('[type=submit]', d), async () => { const r = await cambia('equipo_guardar', p, x ? 'Guardado' : ''); d.close(); if (!x) verCodigo(p.nombre, r.codigo); }); };
  });
}

// ---------- contrato ----------
function vContrato() {
  const i = D.institucion, tot = Math.max(1, instEntre(i.desde, i.hasta)), van = Math.max(0, Math.min(tot, instEntre(i.desde, D.hoy)));
  view.innerHTML = `${avisos()}<h1>Contrato</h1><div class="pn-cols"><section class="pn-card"><div class="pn-head"><h2>${esc(i.nombre)}</h2><span class="pill ${i.vigente ? 'ok' : 'bad'}">${i.vigente ? 'Vigente' : 'No vigente'}</span></div><p>Del ${larga(i.desde)} al ${larga(i.hasta)}</p>${barra(van / tot)}<p class="pn-count">${Math.max(0, instEntre(D.hoy, i.hasta))} días por delante</p><h2>Cupos</h2>${barra(i.usados / i.cupos)}<p class="pn-count">${i.usados} en uso de ${i.cupos}</p><h2>Cursos contratados</h2><ul class="po-cur">${D.cursos.map(c => `<li>${esc(c.nombre)}</li>`).join('')}</ul></section>
    <section class="pn-card"><h2>Pedir más cupos o renovar</h2><p>Nos llega la solicitud y te escribimos con la propuesta.</p><form data-p novalidate><div class="pn-dos"><label class="fld"><span>Cupos</span><input name="estudiantes" type="number" min="1" max="20000" value="10" inputmode="numeric"></label><label class="fld"><span>Duración</span><select name="meses"><option value="6">6 meses</option><option value="12">1 año</option></select></label></div><label class="fld"><span>Mensaje (opcional)</span><textarea name="mensaje" rows="3" maxlength="800"></textarea></label><div class="pn-pie"><button class="btn main" type="submit"${puede() ? '' : ' disabled'}>Enviar solicitud</button></div></form></section></div>`;
  const f = $('[data-p]', view); f.onsubmit = e => { e.preventDefault(); const n = +f.estudiantes.value; if (!(n >= 1)) return toast('Escribe cuántos cupos', true); ocupado($('button', f), async () => { await api('pedir_cupos', { estudiantes: n, meses: +f.meses.value, mensaje: f.mensaje.value }); f.reset(); toast('Solicitud enviada: te escribimos pronto'); }); };
}
entrar();
