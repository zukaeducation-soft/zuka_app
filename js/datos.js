// Datos personales del estudiante (spec 2026-11-24-acceso-por-codigo): obligatorios con un curso pagado y vigente. Tres
// pasos cortos en la pantalla #auth. Con `fija` no se puede saltar; desde «Tú» se abre para editarlos.

const DATOS_PASOS = [
  { t: 'Completa tus datos', p: 'Los usamos para tu plan, tu soporte y para recomendarte qué estudiar.', campos: ['nombre', 'correo', 'telefono', 'ciudad'] },
  { t: 'Sobre ti', p: 'Así conocemos a quienes estudian en Zuka.', campos: ['genero', 'edad', 'ocupacion', 'institucion'] },
  { t: 'Tu meta', p: 'Con esto sabemos cómo ayudarte mejor.', campos: ['meta', 'presentacion', 'horas', 'dificultad', 'medio', 'acepta'] },
];
const datosOpc = (k, v) => `<option value="">Elige…</option>${DATOS[k].map(([id, t]) => `<option value="${id}"${id === v ? ' selected' : ''}>${t}</option>`).join('')}`;
function datosCampo(k, d) {
  const inp = (label, type, extra) => `<label class="fld"><span>${label}</span><input name="${k}" type="${type}" value="${esc(d[k] || '')}" ${extra}></label>`;
  const sel = label => `<label class="fld"><span>${label}</span><select name="${k}">${datosOpc(k, d[k])}</select></label>`;
  return ({
    nombre: () => inp('Nombre completo', 'text', 'autocomplete="name" maxlength="80" required'),
    correo: () => inp('Correo', 'email', 'autocomplete="email" inputmode="email" maxlength="120" required'),
    telefono: () => inp('Celular (con WhatsApp)', 'tel', 'autocomplete="tel" inputmode="tel" maxlength="30" required'),
    ciudad: () => inp('Ciudad o municipio', 'text', 'autocomplete="address-level2" maxlength="80" required'),
    genero: () => sel('Género'), edad: () => sel('Rango de edad'), ocupacion: () => sel('¿Qué haces ahora?'),
    institucion: () => inp('Colegio, universidad o institución (opcional)', 'text', 'maxlength="120"'),
    meta: () => inp('¿Qué carrera o meta tienes? (opcional)', 'text', 'maxlength="120" placeholder="Por ejemplo, Medicina en la UdeA"'),
    presentacion: () => sel('¿Cuándo presentas tu próximo examen? (opcional)'),
    horas: () => sel('¿Cuánto puedes estudiar a la semana? (opcional)'),
    dificultad: () => inp('¿Qué tema te cuesta más? (opcional)', 'text', 'maxlength="120"'),
    medio: () => sel('¿Cómo conociste Zuka? (opcional)'),
    acepta: () => `<label class="check"><input type="checkbox" name="acepta"${d.acepta ? ' checked' : ''}><span data-acepta>${datosAcepta(d.edad)}</span></label>
      <label class="check"><input type="checkbox" name="acepta_mensajes"${d.acepta_mensajes ? ' checked' : ''}><span>Quiero recibir novedades y consejos por WhatsApp o correo (opcional).</span></label>`,
  })[k]();
}
const datosAcepta = edad => (esMenor(edad)
  ? 'Soy menor de edad y mi madre, padre o acudiente autoriza que Zuka guarde estos datos para prestar el servicio (Ley 1581 de 2012).'
  : 'Autorizo que Zuka guarde estos datos para prestar el servicio (Ley 1581 de 2012). Puedo pedir que se corrijan o se borren.');

let datosAbierta = false;
// ¿Hay que pedirlos ya? Nunca en medio de una lección.
function datosPide() {
  if (datosAbierta || lessonClose || tourOpen() || Clave.vista || $('#overlay.open') || !datosFaltan(Cuenta.perfil, Cuenta.accesos)) return false;
  datosScreen(true);
  return true;
}
function datosScreen(fija) {
  datosAbierta = true;
  const p = Cuenta.perfil || {};
  const d = { ...Object.fromEntries(DATOS_PASOS.flatMap(x => x.campos).map(k => [k, p[k] || ''])), acepta: !!p.datos_en, acepta_mensajes: !!p.acepta_mensajes };
  let paso = 0;
  let el = $('#auth');
  if (!el) { el = document.createElement('div'); el.id = 'auth'; document.body.appendChild(el); }
  el.onclick = null;
  const toma = () => new FormData($('form', el)).forEach((v, k) => { d[k] = v; });
  const guarda = () => { toma(); ['acepta', 'acepta_mensajes'].forEach(k => { const c = $(`[name=${k}]`, el); if (c) d[k] = c.checked; }); };
  const cierra = () => { datosAbierta = false; authCerrar(); };
  const pinta = (foco = true, aviso = '') => {
    const s = DATOS_PASOS[paso], fin = paso === DATOS_PASOS.length - 1;
    el.innerHTML = `<div class="auth-in clave datos"><div class="auth-brand">${zukaWord()}</div>
      <p class="datos-paso">Paso ${paso + 1} de ${DATOS_PASOS.length}</p><span class="mini-bar" aria-hidden="true"><i style="width:${((paso + 1) / DATOS_PASOS.length) * 100}%"></i></span>
      <h1 tabindex="-1">${fija && !paso ? '¡Tu plan está activo! ' : ''}${s.t}</h1><p class="muted">${s.p}</p>
      <form class="acct-form" novalidate>${s.campos.map(k => datosCampo(k, d)).join('')}
        <p class="form-msg bad" role="alert"${aviso ? '' : ' hidden'}>${aviso}</p>
        <button class="btn main" type="submit">${fin ? 'Guardar' : 'Continuar'}</button></form>
      <div class="form-links">${paso ? '<button type="button" data-atras>Atrás</button>' : ''}${fija ? '<button type="button" data-salir>Cerrar sesión</button>' : '<button type="button" data-cierra>Cancelar</button>'}</div></div>`;
    el.scrollTop = 0;
    const f = $('form', el), msg = $('.form-msg', el), b = $('button[type=submit]', el);
    const error = ({ campo: k, texto }) => {
      const en = DATOS_PASOS.findIndex(x => x.campos.includes(k));
      if (en !== paso) { paso = en; pinta(false, texto); } else { msg.textContent = texto; msg.hidden = false; }
      $(`[name=${k}]`, el)?.focus();
    };
    $('[data-atras]', el)?.addEventListener('click', () => { guarda(); paso--; pinta(); });
    $('[data-cierra]', el)?.addEventListener('click', cierra);
    $('[data-salir]', el)?.addEventListener('click', () => { datosAbierta = false; cuentaSalir(); });
    f.onsubmit = async e => {
      e.preventDefault();
      if (b.disabled) return;
      guarda(); msg.hidden = true;
      const mal = datosError(d);
      if (mal && (fin || s.campos.includes(mal.campo))) return error(mal);
      if (!fin) { paso++; return pinta(); }
      if (sinRed()) return error({ campo: 'acepta', texto: sinRed() });
      b.disabled = true; b.textContent = 'Un momento…';
      let r;
      try { r = await Cuenta.sb.rpc('guardar_datos', { p: d }); } catch (x) { r = { error: x }; }
      if (!f.isConnected) return;
      b.disabled = false; b.textContent = 'Guardar';
      if (r.error) return error({ campo: 'acepta', texto: /fetch|network/i.test(r.error.message || '') ? canjeError('red') : 'No se pudieron guardar. Inténtalo de nuevo.' });
      S.name = d.nombre.trim().split(/\s+/)[0].slice(0, 24); save();
      await cuentaPerfil();
      cierra(); toast('Datos guardados. ¡Gracias!'); cuentaRepinta();
    };
    if (foco) ($('h1', el)).focus({ preventScroll: true });
  };
  pinta();
}
