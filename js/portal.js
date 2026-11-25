// El portal de la institución dentro de la app (spec 2026-11-25-portal-en-la-app): es una sección más del menú («Portal»). Se abre en un
// marco propio, a pantalla completa, que trae el mismo menú con sus opciones; desde él se vuelve a Inicio, Mis cursos o Tú sin recargar.
// También recorta, para un docente responsable, los componentes del Preicfes que no dirige.
const enEquipo = () => Cuenta.inst.equipo || [];
const portalPuede = () => !!Cuenta.user && ((Cuenta.perfil || {}).rol === 'gestor' || enEquipo().length > 0);
// Componentes de un docente responsable; null: no se recorta (gestor, administración, estudiante o docente sin asignar). Pura.
function portalComps(perfil, equipo) {
  if (!perfil || perfil.rol !== 'gestor' || !equipo.length || equipo.some(e => e.papel !== 'docente')) return null;
  const cs = [...new Set(equipo.flatMap(e => e.componentes || []))];
  return cs.length ? cs : null;
}
const portalMios = () => (Cuenta.user ? portalComps(Cuenta.perfil, enEquipo()) : null);
// Deja en el curso solo esos componentes (y lo devuelve entero si cambia la cuenta): así todas las pantallas lo respetan.
let portalClave = '';
function portalRecorta(cs = portalMios(), c = COURSES.find(x => x.id === 'preicfes')) {
  const clave = cs ? [...cs].sort().join() : '';
  if (!c || !c.blocks || clave === portalClave) return;
  portalClave = clave;
  if (!c.entero) c.entero = { blocks: c.blocks, units: c.units };
  c.blocks = cs ? c.entero.blocks.filter(b => cs.includes(b.id)) : c.entero.blocks;
  c.units = cs ? c.entero.units.filter(u => cs.includes(u.block)) : c.entero.units;
  if (typeof openWorld !== 'undefined') { openWorld = null; openBlock = null; }
  if (typeof gymFocus !== 'undefined') gymFocus = null;
}
function portalMarca() {
  const b = document.querySelector('#tabbar [data-tab="portal"]'); if (b) b.hidden = !portalPuede();
  portalRecorta();
  const f = document.querySelector('#portal'); if (f && f.dataset.de !== (Cuenta.user || {}).id) f.remove();   // otra cuenta: nada de la anterior
}
// El marco solo tapa la app cuando el portal ya está listo: si no carga, la app y su menú siguen ahí.
const portalListo = f => !!f && f.dataset.listo === '1';
function portalVe(si) {
  const f = document.querySelector('#portal'), ve = si && portalListo(f);
  document.body.classList.toggle('en-portal', ve); $('#app').inert = ve;
  if (f) f.hidden = portalListo(f) ? !si : false;
  if (f && !si && !portalListo(f)) f.remove();   // se fue antes de que cargara
}
function portalDice(html) { view.innerHTML = `<div class="portal-espera">${html}</div>`; const b = $('[data-otra]', view); if (b) b.onclick = renderPortal; }
function portalFalla(t) { document.querySelector('#portal')?.remove(); if (tab !== 'portal') return; portalVe(false); portalDice(`<p>${esc(t)}</p><button class="btn" type="button" data-otra>Reintentar</button>`); }
function renderPortal() {
  let f = document.querySelector('#portal');
  if (f && !portalListo(f)) { f.remove(); f = null; }
  if (f) { view.innerHTML = ''; portalVe(true); f.focus(); try { f.contentWindow.portalRefresca(); } catch (e) { /* sigue con lo que tiene */ } return; }
  if (!navigator.onLine) return portalFalla('Para abrir el portal necesitas conexión.');
  portalDice('<p>Abriendo tu portal…</p>');
  f = document.createElement('iframe'); f.id = 'portal'; f.title = 'Portal de tu institución'; f.src = 'instituciones/portal/'; f.dataset.de = Cuenta.user.id;
  document.documentElement.appendChild(f);   // fuera de <body>, que en computador lleva zoom: el portal trae el suyo
  setTimeout(() => { if (f.isConnected && !portalListo(f)) portalFalla('El portal tarda en responder.'); }, 20000);
}
// Lo que el portal le pide a la app (mismo origen).
if (typeof window !== 'undefined') {
  window.zukaIr = t => { if (!['home', 'cursos', 'profile'].includes(t)) return; profileSub = null; go(t); document.querySelector(`#tabbar [data-tab="${t}"]`)?.focus({ preventScroll: true }); };
  window.zukaListo = () => { const f = document.querySelector('#portal'); if (!f) return; f.dataset.listo = '1'; if (tab === 'portal') { view.innerHTML = ''; portalVe(true); f.focus(); } else f.hidden = true; };
  window.zukaFalla = portalFalla;
  try { localStorage.setItem('zuka-portal', '1'); } catch (e) { /* el portal se queda en su página */ }   // esta app ya lo trae dentro
}
// Atrás del celular con el portal abierto: lo consume el portal si tiene algo que cerrar o una vista anterior (js/back.js).
function portalAtras() { const f = document.querySelector('#portal'); if (tab !== 'portal' || !portalListo(f)) return false; try { return f.contentWindow.portalVuelve(); } catch (e) { return false; } }
// Al entrar con su código, o al llegar de /instituciones/portal, se abre el portal.
let portalPend = typeof location !== 'undefined' && /[?&]portal\b/.test(location.search || '');
function portalAbre() {
  if (!portalPend || !portalPuede()) return;
  // Nada se tapa: ni una lección, ni una hoja, ni los datos o la contraseña que se están escribiendo.
  if (lessonClose || Clave.vista || datosAbierta || $('#auth') || $('#sheet').classList.contains('open') || document.querySelector('.dialog, .tour')) { setTimeout(portalAbre, 1500); return; }
  portalPend = false;
  try { history.replaceState(history.state, '', location.pathname); } catch (e) { /* da igual */ }
  go('portal');
}
