// Restablecer la contraseña (spec 2026-11-24-restablecer-clave): pedir el enlace, poner la contraseña nueva al
// volver del correo, y qué hacer si el enlace ya no sirve. Usa la pantalla de entrada (#auth) de js/cuenta.js.

// Dirección pública de la app: a ella vuelven los enlaces de los correos. Tiene que estar en Supabase →
// Authentication → URL Configuration (Site URL y Redirect URLs); si no está, Supabase manda al Site URL.
const APP_URL = 'https://zukaapp-mu.vercel.app/';
const correoVuelve = (loc = location) =>
  (/^(localhost|127\.0\.0\.1)$|\.localhost$/.test(loc.hostname) ? loc.origin + loc.pathname : APP_URL);

// Qué trae la dirección al volver del correo: 'nueva' (enlace de recuperar), 'vencido' (no sirve) o null.
function claveEnlace(hash = '', search = '') {
  const h = new URLSearchParams(hash.replace(/^#/, '')), q = new URLSearchParams(search);
  if (h.get('error_code') || h.get('error') || q.get('error_code')) return 'vencido';
  return h.get('type') === 'recovery' && h.get('access_token') ? 'nueva' : null;
}

const CLAVE_MIN = 8;
// Estado de los dos campos, para la lista que se va marcando y para el aviso al guardar.
function claveRevisa(clave = '', otra = '') {
  const largo = clave.length >= CLAVE_MIN, igual = !!otra && clave === otra;
  return { largo, igual, error: !largo ? `La contraseña debe tener ${CLAVE_MIN} caracteres o más.` : !igual ? 'Las dos contraseñas no son iguales.' : null };
}

// Vista abierta por un enlace del correo: mientras está, el aviso de sesión de Supabase no la cierra.
// Se lee al cargar el archivo, antes de que Supabase limpie la dirección.
const Clave = { vista: typeof location === 'undefined' ? null : claveEnlace(location.hash, location.search) };
function claveAlAbrir() {
  if (!Clave.vista) return false;
  if (Clave.vista === 'vencido') history.replaceState(history.state, '', location.pathname);
  claveScreen(Clave.vista);
  return true;
}
// Supabase avisó que se entró con el enlace (por si la dirección no lo decía).
function claveRecupera() {
  if (!Clave.vista) claveScreen(Clave.vista = 'nueva');
}
function claveSal() {   // a la pantalla de entrada
  Clave.vista = null;
  if (Cuenta.user) authCerrar(); else authScreen('correo');
}

const claveCampo = (name, label) => `<div class="fld"><label for="cl-${name}">${label}</label>
  <span class="clave-in"><input id="cl-${name}" name="${name}" type="password" autocomplete="new-password" minlength="${CLAVE_MIN}" required aria-describedby="cl-reglas">
  <button type="button" data-ver="cl-${name}" aria-pressed="false" aria-label="Mostrar: ${label.toLowerCase()}">Mostrar</button></span></div>`;

const CLAVE_SOBRE = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>';
const claveForm = (campos, ok) => `<form class="acct-form" novalidate>${campos}
  <p class="form-msg" role="alert" hidden></p><button class="btn main" type="submit">${ok}</button></form>`;

function claveHTML(vista, correo = '') {
  const pedir = () => claveForm(campo('correo', 'Correo', 'email', `autocomplete="email" inputmode="email" value="${esc(correo)}" required`), 'Enviar enlace')
    + `<button class="link-btn" type="button" data-sal>${Cuenta.user ? 'Volver' : 'Volver a iniciar sesión'}</button>`;
  const V = {
    pedir: () => [ICON.lock, 'Recupera tu contraseña', 'Escribe el correo de tu cuenta y te enviamos un enlace para poner una contraseña nueva.', pedir()],
    enviado: () => [CLAVE_SOBRE, 'Revisa tu correo', `Si hay una cuenta con <b>${esc(correo)}</b>, te llegará un enlace. Si no lo ves, mira en correo no deseado.`,
      '<button class="btn main" type="button" data-sal>Entendido</button><button class="link-btn" type="button" data-otro>No me llegó: pedir otro</button>'],
    nueva: () => [ICON.lock, 'Crea tu contraseña nueva', 'Elige una que no uses en otros sitios.', claveForm(
      claveCampo('clave', 'Contraseña nueva') + claveCampo('otra', 'Repite la contraseña')
      + `<ul class="clave-reglas" id="cl-reglas"><li data-r="largo">${ICON.check}${CLAVE_MIN} caracteres o más</li><li data-r="igual">${ICON.check}Las dos son iguales</li></ul>`,
      'Guardar contraseña') + '<button class="link-btn" type="button" data-cancela>Cancelar</button>'],
    vencido: () => [ICON.clock, 'Este enlace ya no sirve', 'Los enlaces se usan una sola vez y vencen pronto. Escribe tu correo y te enviamos otro para entrar.', pedir()],
    lista: () => [ICON.check, 'Contraseña cambiada', 'Ya tienes la sesión abierta aquí. En tus otros dispositivos, entra con la contraseña nueva.',
      '<button class="btn main" type="button" data-empieza>Empezar a estudiar</button>'],
  };
  const [ico, titulo, texto, cuerpo] = V[vista]();
  return `<div class="auth-in clave clave-${vista}"><div class="auth-brand">${zukaWord()}</div>
    <span class="clave-ico">${ico}</span><h1 tabindex="-1">${titulo}</h1><p class="muted">${texto}</p>${cuerpo}</div>`;
}

function claveScreen(vista, correo = '') {
  let el = $('#auth');
  if (!el) { el = document.createElement('div'); el.id = 'auth'; document.body.appendChild(el); }
  el.onclick = null;   // tocar afuera no la cierra: se perdería lo escrito
  el.innerHTML = claveHTML(vista, correo);
  el.scrollTop = 0;
  const f = $('form', el), msg = $('.form-msg', el), b = $('button[type=submit]', el);
  const error = t => { msg.textContent = t; msg.className = 'form-msg bad'; msg.hidden = false; };
  $('[data-sal]', el)?.addEventListener('click', claveSal);
  $('[data-otro]', el)?.addEventListener('click', () => claveScreen('pedir', correo));
  $('[data-empieza]', el)?.addEventListener('click', () => { Clave.vista = null; authCerrar(); go('learn'); });
  // Sin cambiarla no se queda la sesión que abrió el enlace.
  $('[data-cancela]', el)?.addEventListener('click', async () => {
    try { await Cuenta.sb?.auth.signOut({ scope: 'local' }); } catch (e) { /* ya no había sesión */ }
    Cuenta.user = null;
    claveSal();
  });
  el.querySelectorAll('[data-ver]').forEach(x => x.onclick = () => {
    const i = $('#' + x.dataset.ver, el), ver = i.type === 'password';
    i.type = ver ? 'text' : 'password'; x.textContent = ver ? 'Ocultar' : 'Mostrar'; x.setAttribute('aria-pressed', ver);
  });
  if (vista === 'nueva') f.oninput = () => {
    const r = claveRevisa(f.clave.value, f.otra.value);
    el.querySelectorAll('[data-r]').forEach(li => li.classList.toggle('on', r[li.dataset.r]));
  };
  if (f) f.onsubmit = async e => {
    e.preventDefault();
    if (b.disabled) return;
    msg.hidden = true;
    const d = Object.fromEntries(new FormData(f));
    const mal = vista === 'nueva' ? claveRevisa(d.clave, d.otra).error : /^\S+@\S+\.\S+$/.test(d.correo.trim()) ? null : 'Ese correo no parece válido.';
    if (mal || sinRed()) return error(mal || sinRed());
    const txt = b.textContent; b.disabled = true; b.textContent = 'Un momento…';
    let r;
    try {
      r = vista === 'nueva' ? await Cuenta.sb.auth.updateUser({ password: d.clave })
        : await Cuenta.sb.auth.resetPasswordForEmail(d.correo.trim(), { redirectTo: correoVuelve() });
    } catch (x) { r = { error: x }; }
    if (!f.isConnected) return;
    b.disabled = false; b.textContent = txt;
    if (r.error) {
      const t = `${r.error.code || ''} ${r.error.name || ''} ${r.error.message || ''}`;
      if (vista === 'nueva' && /session|jwt|expired/i.test(t)) return claveScreen(Clave.vista = 'vencido');
      return error(/same_password/.test(t) ? 'Esa es tu contraseña actual. Elige otra.' : authError(r.error));
    }
    if (vista !== 'nueva') { Clave.vista = null; return claveScreen('enviado', d.correo.trim()); }
    Cuenta.sb.auth.signOut({ scope: 'others' }).then(() => {}, () => {});   // se cierran las demás sesiones
    claveScreen(Clave.vista = 'lista');
  };
  // El foco va al primer campo, o al título para que el lector de pantalla anuncie la vista.
  ($('input', el) || $('h1', el)).focus({ preventScroll: true });
}

// «Olvidé mi contraseña» (desde la pantalla de entrada o la hoja de iniciar sesión).
function openOlvide() {
  const escrito = ($('#sheet.open input[name="correo"]') || $('#auth input[name="codigo"]'))?.value.trim() || '', correo = escrito.includes('@') ? escrito : '';
  closeSheet(false);
  claveScreen('pedir', correo);
}
