// Docentes y gestores en la app (spec 2026-11-25-roles-de-institucion): Inicio con saludo y sus cursos; «Tú» con su institución y sus datos,
// que no se editan aquí. Va después de portal.js.
// 'docente' | 'gestor' | 'equipo' (aún no se sabe cuál) | '' (estudiante, administración o sin sesión). Pura.
function rolDe(perfil, equipo) { return !perfil || perfil.rol !== 'gestor' ? '' : !(equipo || []).length ? 'equipo' : equipo.every(e => e.papel === 'docente') ? 'docente' : 'gestor'; }
const rolEquipo = () => (Cuenta.user ? rolDe(Cuenta.perfil, enEquipo()) : '');
const ROL_T = { docente: 'Docente', gestor: 'Gestor', equipo: '' };
const equipoYo = () => enEquipo()[0] || { nombre: (Cuenta.perfil || {}).nombre || '', institucion: '' };
const equipoNombre = () => (equipoYo().nombre || (Cuenta.perfil || {}).nombre || S.name || '').trim();
function renderHomeEquipo() {
  const rol = rolEquipo(), y = $('.hm', view) ? view.scrollTop : 0, cs = cursosConAcceso(), yo = equipoNombre();
  view.innerHTML = `<div class="home"><div class="hm eq-home"><section class="eq-hola"><div><p>${hmSaludo(new Date().getHours())},</p><h1>${rol === 'docente' || !yo ? `<span>${ROL_T[rol]}</span> ` : ''}${esc(yo)}</h1></div><span class="eq-arte" data-inclina aria-hidden="true">${mascotSVG('cheer', 'm-hello')}</span></section>
    ${cs.length ? `<section class="hm-cursos"><div class="hm-fila"><h2 class="home-h2">${rol === 'gestor' ? 'Cursos de tu institución' : 'Tus cursos'}</h2></div><div class="home-courses">${cs.map(c => `<button class="hc-card" data-open="${c.id}" data-inclina style="--c:${c.color}" aria-label="${esc(c.name)}"><span class="hc-esc"><span class="hc-laminas" aria-hidden="true">${c.units.slice(0, 8).map(u => `<span class="world-art">${(WORLDS[u.world] || {}).art || ''}</span>`).join('')}</span><span class="hc-art">${courseArt(c, 'xl')}</span></span>
      <span class="hc-body"><b>${esc(c.name)}</b>${rol === 'docente' && c.blocks && portalMios() ? `<span class="eq-comps">${c.blocks.map(b => `<i>${esc(b.name)}</i>`).join('')}</span>` : `<span class="hc-tag">${esc(c.tagline || '')}</span>`}<span class="hc-stats">${ICON.book}${lessonsOf(c).length} lecciones<span aria-hidden="true">·</span>${courseExercises(c)} ejercicios</span><span class="hc-go">Entrar ${ICON.right}</span></span></button>`).join('')}</div></section>` : `<p class="eq-nada">${rol === 'gestor' ? 'Tu institución no tiene cursos vigentes.' : 'Tu gestor aún no te asigna cursos.'}</p>`}</div></div>`;
  view.querySelectorAll('[data-open]').forEach(k => { k.onclick = () => openCourse(k.dataset.open); });
  inclina($('.eq-home', view)); view.scrollTop = y;
}
// ---------- Tú ----------
const eqFecha = d => new Date(`${d}T12:00:00Z`).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const eqFicha = xs => `<dl class="eq-dl">${xs.filter(x => x[1]).map(([t, v]) => `<div><dt>${t}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
const eqCurso = id => (COURSES.find(c => c.id === id) || { name: id }).name;
function renderTuEquipo() {
  const rol = rolEquipo(), e = equipoYo(), comps = (e.componentes || []).map(x => SIM_COMP[x] || x), y = $('.eq-tu', view) ? view.scrollTop : 0, hoy = today();
  const dias = e.hasta ? Math.max(0, instEntre(hoy, e.hasta)) : 0, tot = e.hasta ? Math.max(1, instEntre(e.desde, e.hasta)) : 1;
  view.innerHTML = `<div class="profile"><div class="pf eq-tu">
    <section class="pf-c eq-yo"><span class="eq-ini" aria-hidden="true">${esc(equipoNombre().split(/\s+/).slice(0, 2).map(x => [...x][0] || '').join('').toUpperCase() || 'Z')}</span><div><p>${ROL_T[rol]}</p><h1>${esc(equipoNombre() || ROL_T[rol] || 'Tu cuenta')}</h1>${e.institucion ? `<p>${esc(e.institucion)}</p>` : ''}</div><button class="icon-btn" type="button" data-settings aria-label="Ajustes">${ICON.gear}</button></section>
    <section class="pf-c"><div class="pf-cab"><h2>${rol === 'gestor' ? 'Tus datos' : 'Tus datos de docente'}</h2></div>${eqFicha([['Nombre', equipoNombre()], ['Correo', e.correo], ['Componentes', comps.join(', ')], ['Grupos', rol === 'docente' ? (e.grupos || []).join(', ') : ''], ['Código de acceso', Cuenta.codigo ? muestraCodigo(Cuenta.codigo) : '']])}<p class="eq-nota">${rol === 'gestor' ? 'Se cambian en Portal, Equipo.' : 'Solo los puede cambiar el gestor de tu institución.'}</p>${rol === 'gestor' ? '<button class="btn ghost" type="button" data-acct="portal">Abrir el portal</button>' : ''}</section>
    <section class="pf-c"><div class="pf-cab"><h2>Tu institución</h2>${rol === 'gestor' && e.hasta ? `<p>${e.vigente ? 'Contrato vigente' : 'Contrato no vigente'}</p>` : ''}</div>${eqFicha([['Nombre', e.institucion], ['Tipo', e.tipo], ['NIT', e.nit], ['Ciudad', e.ciudad], ['Contacto', e.contacto], ['Correo', e.correo_inst], ['Teléfono', e.telefono]])}
      ${rol === 'gestor' && e.hasta ? `<div class="eq-cifras"><p>${aroHTML(e.cupos ? e.usados / e.cupos : 0, `<b>${e.usados}</b>`)}<span><b>${e.usados} de ${e.cupos}</b>cupos en uso</span></p><p>${aroHTML(dias / tot, `<b>${dias}</b>`)}<span><b>${dias === 1 ? '1 día' : `${dias} días`}</b>hasta el ${eqFecha(e.hasta)}</span></p><p>${aroHTML(1, `<b>${e.docentes}</b>`)}<span><b>${e.docentes === 1 ? '1 docente' : `${e.docentes} docentes`}</b>con acceso</span></p></div><div class="eq-comps">${(e.cursos || []).map(c => `<i>${esc(eqCurso(c))}</i>`).join('')}</div><p class="eq-nota">Los datos de la institución los cambia Zuka.</p>` : ''}</section>
    <div class="pf-cuenta"><button class="btn ghost" type="button" data-acct="salir">Cerrar sesión</button></div></div></div>`;
  cuentaBind(view); $('[data-settings]', view).onclick = () => { profileSub = 'settings'; renderProfile(); view.scrollTop = 0; $('[data-back]', view).focus({ preventScroll: true }); };
  view.scrollTop = y;
}
// En «Tú» de un estudiante de institución: lo que su colegio registró.
function tuInstHTML() {
  const p = Cuenta.user && cuentaFija() ? Cuenta.inst.persona : null;
  return p ? `<section class="pf-c eq-est"><div class="pf-cab"><h2>Tus datos</h2><p>${esc(p.institucion)}</p></div>${eqFicha([['Nombre', p.nombre], ['Grupo', p.grupo], ['Documento', p.documento]])}<p class="eq-nota">Solo los puede cambiar el gestor de tu institución.</p></section>` : '';
}
