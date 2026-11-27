// Cuenta del estudiante: entrada con código de acceso, «Mi plan», compra, progreso en la nube, candados por curso y
// enlaces de video (spec 2026-11-24-acceso-por-codigo). La lógica pura está en js/acceso.js.
// Sin conexión (o si no carga la librería de Supabase) la app sigue con lo guardado en el celular.

const Cuenta = {
  sb: null,        // cliente de Supabase (null sin conexión)
  user: null,      // usuario con sesión
  perfil: null,    // fila de `perfiles` (se guarda en S.cuenta para abrir sin conexión)
  accesos: [],     // filas de `accesos`: los cursos de esta cuenta (y los que abre su institución, con `institucion`)
  inst: { nombres: [], metas: [] },   // institución del estudiante: quién ve su avance y sus metas
  codigo: '',      // el código con el que se entra
  productos: null, // planes a la venta (tabla `productos`)
  ajustes: {},     // tabla `ajustes`: whatsapp, pago_info…
  recursos: {},    // id de lección o recurso → { curso, prueba, tipo }
  cursos: null,    // id de curso → publicado (tabla `cursos`); null si aún no se sabe
  bases: new Map() // id de video → { base, hasta }
};

// En el computador de desarrollo no hay candados (para revisar contenido y correr los robots);
// con ?candados en la dirección sí se ven, y también al pedir la entrada (?entrar, ?admin, ?portal: spec 2026-11-26-entrada-unica).
const SIN_CANDADOS = typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  && !/[?&](candados|entrar|admin|portal)\b/.test(location.search);

// Motivo por el que algo está cerrado para quien usa la app ahora (null = abierto).
function planMotivo(id) {
  if (SIN_CANDADOS) return null;
  return motivoBloqueo({ perfil: Cuenta.user ? Cuenta.perfil : null, accesos: Cuenta.accesos, horas: typeof Tienda === 'undefined' ? 0 : Tienda.saldo.general + Tienda.saldo.universidad }, Cuenta.recursos[id] || { tipo: 'leccion' });
}

function cuentaCache() {
  // uid = cuenta cuyo avance está en este celular; solo cambia cuando la sincronización termina bien.
  S.cuenta = { uid: (S.cuenta || {}).uid || null, perfil: Cuenta.perfil, accesos: Cuenta.accesos, inst: Cuenta.inst, codigo: Cuenta.codigo, sesion: !!Cuenta.user };
  save();
}
// Repinta la pestaña abierta (no durante una lección ni sobre el feed de clips, que se reiniciaría).
function cuentaRepinta() {
  if (typeof go !== 'function' || lessonClose || $('#overlay.open')) return;
  if (tab !== 'clips') go(tab);
}

// Qué es cada cosa (curso, si la abre un código de prueba). Va al cargar el archivo, antes de que app.js pinte.
if (typeof COURSES !== 'undefined') {
  catalogo(COURSES, typeof CURIOS === 'undefined' ? [] : CURIOS, typeof summaryOf === 'function' ? summaryOf : undefined)
    .forEach(r => { Cuenta.recursos[r.id] = { curso: r.curso, prueba: r.prueba, tipo: r.tipo }; });
  try { const t = JSON.parse(localStorage.getItem('zuka-tienda')) || {}; Cuenta.productos = t.productos || null; Cuenta.ajustes = t.ajustes || {}; } catch (e) { /* sin copia */ }
}

// ---------- quién ve todo abierto ----------
// Esconde lo que no es suyo (css/acceso.css, `.de-colegio`) y, si estaba en una de esas pestañas, lo lleva a Inicio.
function colegioMarca() {
  document.body.classList.toggle('de-colegio', cuentaDeColegio());
  if (cuentaDeColegio() && typeof tab !== 'undefined' && ['tienda', 'tutorias'].includes(tab) && !lessonClose) go('home');
}
// Estudiante de un colegio (o su gestor): solo Inicio, Mis cursos y Tú; no compra (spec 2026-11-25-estudiante-colegio).
const cuentaDeColegio = () => !!Cuenta.user && instManda({ perfil: Cuenta.perfil, accesos: Cuenta.accesos, inst: Cuenta.inst, horas: typeof Tienda === 'undefined' ? 0 : Tienda.saldo.general + Tienda.saldo.universidad });
const cuentaFija = () => !!Cuenta.user && (typeof Cuenta.inst.fija === 'boolean' && (Cuenta.perfil || {}).rol !== 'admin' ? Cuenta.inst.fija : instFija({ perfil: Cuenta.perfil, accesos: Cuenta.accesos, inst: Cuenta.inst }));   // lo dice la base; con una copia vieja, la misma regla
const colegioAvisa = () => toast('Tu institución maneja tus cursos. Si necesitas algo, pídelo a tu docente.');
const cuentaEsAdmin = () => !!(Cuenta.user && Cuenta.perfil && Cuenta.perfil.rol === 'admin');
// El administrador tiene siempre todo abierto (S.unlockAll: cursos, mundos, lecciones, jefes y
// evaluaciones, sin perder vidas); no se puede apagar. A los demás las lecciones y los mundos se les
// abren uno tras otro, al completar el anterior. En el computador de desarrollo no se toca (allí el
// interruptor «Modo revisión» de Ajustes decide).
function cuentaRol() {
  if (SIN_CANDADOS) return;
  S.unlockAll = cuentaEsAdmin() || (Cuenta.perfil || {}).rol === 'gestor';   // quien enseña mira cualquier lección, sin vidas ni orden
  save();
}

// ---------- pantalla de entrada ----------
// Sale al abrir la app sin sesión (y al cerrar sesión): se entra con el código de acceso. El correo queda para la
// administración y para cuentas creadas antes de los códigos.
// Se llegó desde /admin (sin sesión de administración): al entrar como administración, de vuelta al panel.
let entradaAdmin = typeof location !== 'undefined' && /[?&]admin\b/.test(location.search || '');
// ?admin=/instituciones/portal/?i=… vuelve ahí; cualquier otra cosa, al panel.
const entradaVuelta = (q => { const m = /[?&]admin=([^&]+)/.exec(q || ''); let v = ''; try { v = m ? decodeURIComponent(m[1]) : ''; } catch (e) { /* mal escrita */ }
  return /^\/(admin|instituciones\/portal)\/[^\\]*$/.test(v) && !v.startsWith('//') ? v : '/admin/'; })(typeof location !== 'undefined' ? location.search : '');
let entrando = false;   // se envió la pantalla de entrada: la sesión que llegue es una entrada nueva
function cuentaPideEntrar() {
  if (!Cuenta.sb || Cuenta.user || SIN_CANDADOS) return false;
  authScreen();
  return true;
}
function authCerrar() {
  const el = $('#auth'), pz = $('#landing');   // también la presentación (js/presentacion.js), si seguía abierta
  if (!el && !pz) return;
  el?.remove(); if (pz) presentacionCerrar(); else if (typeof applyTheme === 'function') applyTheme();
  if (!datosFaltan(Cuenta.perfil, Cuenta.accesos) && (Cuenta.perfil || {}).rol !== 'gestor' && typeof tourShouldStart === 'function' && tourShouldStart(S)) startTour();   // el recorrido de bienvenida esperaba (los datos van antes)
}
const waBoton = (texto, rotulo, cls = 'ghost') => {
  const u = waLink(Cuenta.ajustes.whatsapp, texto);
  return u ? `<a class="btn ${cls} wa" href="${esc(u)}" target="_blank" rel="noopener">${rotulo}</a>` : '';
};
// Entrada única (spec 2026-11-26-entrada-unica): estudiantes, colegios, docentes, gestores y administración entran aquí. Un
// solo campo: un código entra con entrar-codigo; un correo (lleva «@») abre la contraseña en el mismo formulario. Al entrar,
// tipoCuenta decide adónde va cada uno (cuentaSesion). modo 'correo' abre la contraseña desde el principio.
function authScreen(modo = 'codigo', aviso = '') {
  let el = $('#auth');
  if (!el) { el = document.createElement('div'); el.id = 'auth'; document.body.appendChild(el); }
  const volver = typeof pzDesde !== 'undefined' && pzDesde;   // se llegó desde la presentación: se puede volver a ella
  const pedir = waBoton(WA.prueba(), 'Pedir un código de prueba');
  el.innerHTML = `<div class="auth-in">
    ${volver ? `<button class="link-btn auth-volver" type="button" data-pz-volver>${ICON.back} Conocer Zuka</button>` : ''}
    <div class="auth-brand">${zukaWord()}</div>
    <h1>Entra a Zuka</h1>
    <p class="muted">Con tu código entras siempre y la app te lleva a lo tuyo: tus cursos, el portal de tu institución o el panel.</p>
    <form class="acct-form" novalidate>
      ${campo('codigo', 'Código o correo', 'text', 'autocomplete="username" autocapitalize="off" spellcheck="false" maxlength="120" placeholder="ABCDE-FGH23" required')}
      <div class="auth-clave"${modo === 'correo' ? '' : ' hidden'}>${campo('clave', 'Contraseña', 'password', 'autocomplete="current-password"')}
        <button class="link-btn" type="button" data-olvide>Olvidé mi contraseña</button></div>
      <p class="form-msg${aviso ? ' bad' : ''}" role="alert"${aviso ? '' : ' hidden'}>${aviso}</p>
      <button class="btn main" type="submit">Entrar</button>
    </form>
    <div class="auth-guest">${pedir || '<p class="muted">Si aún no tienes código, pídelo por el WhatsApp de Zuka.</p>'}</div>
  </div>`;
  const f = $('form', el), msg = $('.form-msg', el), b = $('button[type=submit]', el), clave = $('.auth-clave', el), quien = f.codigo;
  const esCorreo = () => quien.value.includes('@');
  quien.oninput = () => {
    quien.classList.toggle('es-correo', esCorreo());   // un correo se ve como se escribe (el código va en mayúsculas)
    if (esCorreo() && clave.hidden) clave.hidden = false; else if (!esCorreo() && modo !== 'correo') clave.hidden = true;
  };
  $('[data-olvide]', el).addEventListener('click', openOlvide);
  $('[data-pz-volver]', el)?.addEventListener('click', () => pzVolver());
  // En el computador es una ventana sobre la presentación: tocar afuera la cierra y vuelve a ella.
  el.onclick = e => { if (e.target === el && $('#landing')) pzVolver(); };
  const error = t => { msg.textContent = t; msg.className = 'form-msg bad'; msg.hidden = false; };
  f.onsubmit = async e => {
    e.preventDefault();
    if (b.disabled) return;
    const d = Object.fromEntries(new FormData(f)), cod = !esCorreo();
    d.correo = d.codigo;
    if (sinRed()) return error(sinRed());
    if (cod && !codigoValido(limpiaCodigo(d.codigo))) return error(canjeError('formato'));
    if (!cod && (!/^\S+@\S+\.\S+$/.test(d.correo.trim()) || !d.clave)) { clave.hidden = false; return error('Escribe tu correo y tu contraseña.'); }
    msg.hidden = true; b.disabled = true; b.textContent = 'Un momento…';
    let mal = null;
    try {
      entrando = true;
      if (cod) mal = await entrarConCodigo(limpiaCodigo(d.codigo));
      else {
        const r = await Cuenta.sb.auth.signInWithPassword({ email: d.correo.trim(), password: d.clave });
        mal = r.error ? authError(r.error) : null;
      }
    } catch (x) { mal = authError(x); }
    if (!f.isConnected) return;
    b.disabled = false; b.textContent = 'Entrar';
    if (mal) { entrando = false; error(mal); }   // con sesión, la pantalla la cierra cuentaSesion
  };
}
// Este navegador, para el límite de dispositivos por código.
function dispositivoId() {
  let id = null;
  try { id = localStorage.getItem('zuka-dispositivo'); } catch (e) { /* sin almacenamiento */ }
  if (!id) {
    id = [...crypto.getRandomValues(new Uint8Array(16))].map(x => x.toString(16).padStart(2, '0')).join('');
    try { localStorage.setItem('zuka-dispositivo', id); } catch (e) { /* idem */ }
  }
  return id;
}
function dispositivoNombre() {
  const u = navigator.userAgent;
  const so = /android/i.test(u) ? 'Android' : /iphone|ipad/i.test(u) ? 'iPhone o iPad' : /windows/i.test(u) ? 'Windows' : /mac/i.test(u) ? 'Mac' : 'Otro';
  const nav = /edg\//i.test(u) ? 'Edge' : /firefox/i.test(u) ? 'Firefox' : /chrome|crios/i.test(u) ? 'Chrome' : /safari/i.test(u) ? 'Safari' : 'Navegador';
  return `${so} · ${nav}${isStandalone() ? ' (app)' : ''}`;
}
// Devuelve un texto de error o null si quedó la sesión abierta.
async function entrarConCodigo(codigo) {
  const { data, error } = await Cuenta.sb.functions.invoke('entrar-codigo', { body: { codigo, dispositivo: dispositivoId(), nombre: dispositivoNombre() } });
  if (error) return /fetch|network|failed to send/i.test(`${error.name} ${error.message}`) && !navigator.onLine ? canjeError('red') : canjeError('');
  if (!data || !data.ok) return canjeError(data && data.error);
  const v = await Cuenta.sb.auth.verifyOtp({ token_hash: data.token_hash, type: 'magiclink' });
  return v.error ? authError(v.error) : null;
}

// ---------- cursos habilitados ----------
// El estudiante ve los cursos de su cuenta y, para comprarlos, los que el administrador publicó (tabla `cursos`).
// El administrador los ve todos, con la marca «Borrador» en los que aún no habilita. Sin datos del servidor valen los
// de CURSOS_LISTOS.
const CURSOS_LISTOS = ['algebra', 'trig'];
try { Cuenta.cursos = JSON.parse(localStorage.getItem('zuka-cursos')) || null; } catch (e) { /* sin copia */ }
const cursoBorrador = c => (Cuenta.cursos ? Cuenta.cursos[c.id] !== true : !CURSOS_LISTOS.includes(c.id));
const cursoVisible = c => (portalMios() ? c.id === 'preicfes' : SIN_CANDADOS || cuentaEsAdmin() || (Cuenta.accesos || []).some(a => a.curso === c.id) || (!cuentaDeColegio() && !cursoBorrador(c)));
// «Mis cursos», el perfil y las asesorías: solo lo comprado (pedido del 2026-11-24). La prueba se abre desde Inicio.
const cursoComprado = (c, alDia = false) => SIN_CANDADOS || cuentaEsAdmin() || comprado(Cuenta.accesos, c.id, alDia);
const accesoCursoFila = id => (Cuenta.accesos || []).find(a => a.curso === id);
const cursosConAcceso = () => cursosVisibles().filter(c => SIN_CANDADOS || cuentaEsAdmin() || (Cuenta.accesos || []).some(a => a.curso === c.id));
function cursosVisibles() {
  const v = COURSES.filter(cursoVisible);
  return v.length ? v : COURSES.slice(0, 1);
}

// ---------- uso diario ----------
// Tiempo con la app abierta y a la vista, lecciones completadas y ejercicios respondidos: se envían
// cada minuto (registrar_uso) y alimentan las estadísticas del panel. Solo con sesión.
// Cuenta mientras hay alguien: un toque o una tecla en los últimos tres minutos (lo que dura leer un texto), o algo que se mira o se oye
// hasta el final (video, escenas, voz de Explora: usoVivo). Los clips en bucle no cuentan solos.
// Sin eso, dejar la app abierta sumaba horas (se vio en los datos: 4 horas sin un solo ejercicio).
const uso = { seg: 0, t: Date.now(), lec: 0, ans: null, ok: null, act: Date.now() };
const USO_QUIETO = 180000;
const usoHayAlguien = now => now - uso.act < USO_QUIETO || [...document.querySelectorAll('video')].some(v => !v.paused && !v.ended && !v.loop);
function usoVivo(seg = 0) { uso.act = Math.max(uso.act, Date.now() + seg * 1000); }
function usoTick(visible = !document.hidden) {
  const now = Date.now(), dt = (now - uso.t) / 1000;
  uso.t = now;
  if (visible && usoHayAlguien(now) && dt > 0 && dt < 40 && Cuenta.user && !Cuenta.user.offline) uso.seg += dt;
  if (uso.seg >= 60) usoEnvia();
}
function usoEnvia() {
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline || typeof S === 'undefined') return;
  if (uso.ans == null) { uso.ans = S.answered; uso.ok = S.correct; }
  const seg = Math.round(uso.seg), ej = Math.max(0, S.answered - uso.ans), ac = Math.max(0, S.correct - uso.ok), lec = uso.lec;
  if (!seg && !ej && !lec) return;
  uso.seg = 0; uso.lec = 0; uso.ans = S.answered; uso.ok = S.correct;
  Cuenta.sb.rpc('registrar_uso', { p_segundos: seg, p_lecciones: lec, p_ejercicios: ej, p_aciertos: Math.min(ac, ej), p_xp: S.xp, p_racha: streakNow() })
    .then(() => {}, () => {});
}
if (typeof document !== 'undefined') {
  setInterval(() => usoTick(), 15000);
  ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchmove'].forEach(k => addEventListener(k, () => { uso.act = Date.now(); }, { passive: true, capture: true }));
  // Al esconder la app se cuenta lo que iba y se envía; al volver, el reloj arranca de nuevo.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { usoTick(true); usoEnvia(); } else uso.t = uso.act = Date.now();
  });
}

function cuentaInit() {
  if (typeof S === 'undefined') return;
  // Lo último que se supo de la cuenta: sirve para abrir sin conexión.
  if (S.cuenta && S.cuenta.sesion && S.cuenta.perfil) {
    Cuenta.user = { id: S.cuenta.perfil.id, offline: true }; Cuenta.perfil = S.cuenta.perfil;
    Cuenta.accesos = S.cuenta.accesos || []; Cuenta.inst = S.cuenta.inst || { nombres: [], metas: [] }; Cuenta.codigo = S.cuenta.codigo || '';
  }
  cuentaRol();
  if (!window.supabase || !window.supabase.createClient) return;
  Cuenta.sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);
  // Dentro del aviso de Supabase no se le puede volver a llamar: se sale primero con setTimeout.
  Cuenta.sb.auth.onAuthStateChange((ev, session) => setTimeout(() => cuentaSesion(ev, session), 0));
  // Al llegar el WhatsApp por primera vez, la entrada lo muestra (sin borrar lo que ya se estaba escribiendo).
  cuentaTienda().then(() => { const i = $('#auth input[name="codigo"]'); if (i && !i.value && !$('#auth .wa')) authScreen(); }, () => {});
  Cuenta.sb.from('cursos').select('id,publicado').then(({ data }) => {
    if (!data || !data.length) return;
    const m = {}; data.forEach(r => { m[r.id] = r.publicado; });
    const cambio = JSON.stringify(m) !== JSON.stringify(Cuenta.cursos);
    Cuenta.cursos = m;
    try { localStorage.setItem('zuka-cursos', JSON.stringify(m)); } catch (e) { /* sin espacio */ }
    if (cambio) { cuentaRepinta(); if (typeof presentacionRefresca === 'function') presentacionRefresca(); }
  });
}

async function cuentaSesion(ev, session) {
  const antes = Cuenta.user && !Cuenta.user.offline ? Cuenta.user.id : null;
  if (!session) {
    if (ev === 'INITIAL_SESSION' && !navigator.onLine) return;   // sin red: vale lo guardado
    Cuenta.user = null; Cuenta.perfil = null; Cuenta.accesos = []; Cuenta.inst = { nombres: [], metas: [] }; Cuenta.codigo = ''; tiendaFuera(); Cuenta.bases.clear(); cuentaCola.clear();
    cuentaCache(); cuentaRol(); cuentaRepinta();
    if (!SIN_CANDADOS && !Clave.vista) { const tapa = datosAbierta; datosAbierta = false; if (tapa || (!$('#auth') && !$('#landing') && !lessonClose)) authScreen(); }
    return;
  }
  const uidPrevio = (S.cuenta || {}).uid || null, perfilPrevio = cuentaHuella();
  Cuenta.user = session.user;
  if (ev === 'PASSWORD_RECOVERY') claveRecupera();   // js/clave.js
  if (antes === session.user.id && ev === 'TOKEN_REFRESHED') return;
  const recien = entrando && !Clave.vista;   // acaba de entrar con la pantalla de entrada (no al abrir con una sesión guardada)
  entrando = false;
  await cuentaPerfil();
  cuentaRol();
  // Entrada única: cada cuenta va a lo suyo (tipoCuenta, js/acceso.js). La administración, a su panel; gestores y docentes, al portal.
  const quien = tipoCuenta(Cuenta.perfil, Cuenta.inst);
  if (quien && quien.destino === 'admin' && (recien || entradaAdmin)) { location.replace(entradaVuelta); return; }
  entradaAdmin = false;
  if (recien && quien && quien.destino === 'portal') portalPend = true;
  if (portalPend && quien && quien.destino === 'app') {   // llegó por «Entrar al portal» con una cuenta de estudiante
    portalPend = false; try { history.replaceState(history.state, '', location.pathname); } catch (e) { /* da igual */ }
    toast('Esta cuenta no tiene portal. Para entrar como docente o gestor, cierra sesión en Tú y escribe tu código.');
  }
  if (recien && bienvenidaCuenta(quien)) toast(bienvenidaCuenta(quien));
  if (datosAbierta) { /* los datos personales se quedan a la vista */ } else if (!Clave.vista) authCerrar(); else if (typeof presentacionCerrar === 'function') presentacionCerrar();   // la contraseña nueva se queda a la vista
  // Supabase repite el aviso de sesión cada vez que se vuelve a la pestaña: solo se repinta si algo cambió.
  if (antes === session.user.id) { if (cuentaHuella() !== perfilPrevio) cuentaRepinta(); datosPide(); return; }
  Cuenta.bases.clear(); cuentaCola.clear();   // nada pendiente de otra cuenta sube a esta
  uso.seg = 0; uso.lec = 0; uso.ans = S.answered; uso.ok = S.correct; uso.t = Date.now();
  if (await cuentaSyncProgreso(uidPrevio)) await estadoSync();
  await Promise.all([tiendaCarga().catch(() => {}), asesoriasCarga().catch(() => {})]);
  cuentaRepinta(); portalAbre();
  datosPide();
}
// Si la primera sincronización falló (sin red), se vuelve a intentar.
async function cuentaReintenta() {
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline || lessonClose || (S.cuenta || {}).uid === Cuenta.user.id) return;
  if (await cuentaSyncProgreso((S.cuenta || {}).uid || null)) { await estadoSync(); cuentaRepinta(); }
}
if (typeof document !== 'undefined') setInterval(() => { if (!document.hidden) cuentaReintenta().catch(() => {}); }, 60000);
const cuentaHuella = () => JSON.stringify([Cuenta.perfil, Cuenta.accesos, Cuenta.inst, Tienda.mios, Tienda.saldo]);
// Al volver a la app se pregunta si cambió el acceso (el administrador acaba de confirmar un pago…).
let cuentaVista = 0;
async function cuentaRevisa() {
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline || Date.now() - cuentaVista < 30000) return;
  cuentaVista = Date.now();
  await cuentaReintenta();
  const antes = cuentaHuella(), pagos = new Set(Cuenta.accesos.filter(a => a.tipo === 'pago' && vigente(a.hasta, Date.now())).map(a => a.curso));
  await Promise.all([cuentaPerfil(), tiendaMios().catch(() => {}), asesoriasCarga().catch(() => {})]);
  if (tab === 'tienda' && !$('#tienda')) tiendaPinta('', false);
  if (cuentaHuella() === antes) return;
  const nuevo = Cuenta.accesos.find(a => a.tipo === 'pago' && vigente(a.hasta, Date.now()) && !pagos.has(a.curso));
  if (nuevo) toast(`¡Listo! Tu acceso a ${cursoNombre(nuevo.curso)} está activo.`);
  Cuenta.bases.clear(); cuentaRepinta(); datosPide();
}
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (!document.hidden) cuentaRevisa(); });

const nombreFijo = () => { const n = ((Cuenta.inst.persona || (Cuenta.inst.equipo || [])[0] || {}).nombre || (Cuenta.perfil || {}).nombre || '').trim(); return n.split(/\s+/)[0].slice(0, 24); };
const primerNombre = p => ((p && p.nombre) || '').trim().split(/\s+/)[0].slice(0, 24);
async function cuentaPerfil() {
  if (!Cuenta.sb || !Cuenta.user) return null;
  const uid = Cuenta.user.id;
  const [{ data }, acc, cod, ins] = await Promise.all([Cuenta.sb.from('perfiles').select('*').eq('id', uid).maybeSingle(),
    Cuenta.sb.from('accesos').select('curso,tipo,desde,hasta').eq('usuario', uid), Cuenta.sb.rpc('mi_codigo'), Cuenta.sb.rpc('mi_institucion')]);
  if (!Cuenta.user || Cuenta.user.id !== uid) return null;   // mientras tanto cambió de cuenta
  if (Cuenta.perfil && Cuenta.perfil.id !== uid) Cuenta.inst = { nombres: [], metas: [] };   // otra cuenta
  const deInst = ins.data ? ins.data.accesos : (Cuenta.perfil?.id === uid ? Cuenta.accesos || [] : []).filter(a => a.institucion);
  if (acc.data) Cuenta.accesos = instJunta(acc.data, deInst);
  if (ins.data) Cuenta.inst = { nombres: ins.data.instituciones || [], metas: ins.data.metas || [], simulacros: ins.data.simulacros || [], avisos: ins.data.avisos || [], equipo: ins.data.equipo || [], persona: ins.data.persona || null, fija: ins.data.fija };
  if (!cod.error) Cuenta.codigo = cod.data || '';
  if (data) {
    Cuenta.perfil = data;
    if (!S.name) S.name = primerNombre(data);
    if (cuentaFija()) { const n = nombreFijo(); if (n && n !== S.name) { S.name = n; save(); } }   // el que puso su institución
    cuentaCache(); colegioMarca();
  }
  return data;
}

// Junta el avance del celular con el de la nube. Si en este celular estudiaba otra cuenta, su avance
// local no se le pasa a la nueva: se reemplaza por el de la nube.
async function cuentaSyncProgreso(uidPrevio) {
  if (!Cuenta.sb || !Cuenta.user) return false;
  const uid = Cuenta.user.id, otro = uidPrevio && uidPrevio !== uid;
  // Se aparta lo de la otra cuenta antes de nada: aunque falle la red, esta no estudia encima de lo ajeno.
  if (otro) { estadoAparta(uidPrevio); S.done = {}; S.secs = {}; estadoLimpia(); S.tourDone = true; S.name = primerNombre(Cuenta.perfil); }   // tampoco XP, racha, evaluaciones… de la cuenta anterior
  S.secs = S.secs || {};
  if (otro) { S.cuenta = Object.assign(S.cuenta || {}, { uid: null }); save(); }
  estadoRecupera(uid);
  const { data, error } = await Cuenta.sb.from('progreso').select('leccion,completada,segundos_vistos').eq('usuario', uid);
  if (error || !data || !Cuenta.user || Cuenta.user.id !== uid) return false;
  const nube = new Map(data.map(r => [r.leccion, r]));
  data.forEach(r => {
    if (r.completada) S.done[r.leccion] = true;
    S.secs[r.leccion] = Math.max(S.secs[r.leccion] || 0, r.segundos_vistos || 0);
  });
  const faltan = [...new Set([...Object.keys(S.done).filter(id => S.done[id]), ...Object.keys(S.secs)])]
    .filter(id => { const r = nube.get(id); return !r || (!!S.done[id] && !r.completada) || (S.secs[id] || 0) > (r.segundos_vistos || 0); })
    .map(id => ({ leccion: id, completada: !!S.done[id], segundos: Math.round(S.secs[id] || 0) }));
  S.cuenta = Object.assign(S.cuenta || {}, { uid: Cuenta.user.id });   // desde aquí el avance del celular es de esta cuenta
  save();
  for (let i = 0; i < faltan.length; i += 400) await Cuenta.sb.rpc('guardar_progreso', { p_filas: faltan.slice(i, i + 400) });
  return true;
}

// Guarda el avance de una lección (al completarla y mientras se ve su video). Lo que no alcanza a
// subir queda en S.done / S.secs y sube en el siguiente inicio de sesión.
const cuentaCola = new Map();
let cuentaTimer = null;
function cuentaProgreso(id, { completada = false, segundos = 0 } = {}) {
  S.secs = S.secs || {};
  if (segundos > (S.secs[id] || 0)) S.secs[id] = Math.round(segundos);
  const q = cuentaCola.get(id) || { leccion: id, completada: false, segundos: 0 };
  if (completada && !q.completada) uso.lec++;
  q.completada = q.completada || completada; q.segundos = Math.max(q.segundos, Math.round(S.secs[id] || 0));
  cuentaCola.set(id, q);
  clearTimeout(cuentaTimer);
  if (completada) { cuentaEnvia(); estadoPronto(); } else cuentaTimer = setTimeout(cuentaEnvia, 15000);
}
function cuentaEnvia() {
  clearTimeout(cuentaTimer);
  if (!cuentaCola.size) return;
  save();
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline) return;
  // Solo sube si lo que hay en el celular es de esta cuenta (ya se sincronizó con ella).
  if ((S.cuenta || {}).uid !== Cuenta.user.id) return;
  const filas = [...cuentaCola.values()], uid = Cuenta.user.id; cuentaCola.clear();
  Cuenta.sb.rpc('guardar_progreso', { p_filas: filas }).then(({ error }) => {
    if (error && Cuenta.user && Cuenta.user.id === uid) filas.forEach(f => { if (!cuentaCola.has(f.leccion)) cuentaCola.set(f.leccion, f); });
  }, () => {});
}
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (document.hidden) cuentaEnvia(); });

// Dirección de la carpeta de un video de Bunny (sin la barra final). La firma el servidor y solo si
// la cuenta puede verlo. Si el servidor no contesta se prueba la dirección sin firma, que sirve
// mientras Bunny no exija token.
// La dirección ya pedida y aún vigente, o null: deja adjuntar el video en el mismo toque que abre la lección.
function cuentaVideoBaseYa(id) {
  const hit = Cuenta.bases.get(id);
  return hit && hit.hasta > Date.now() ? hit.base : null;
}
function cuentaVideoBase(id, reintento = false) {
  const libre = `https://${bunnyHost(id)}/${id}`;
  // Biblioteca nueva (sin token): el servidor solo dice si la cuenta puede verlo; la dirección es la libre.
  const vieja = BUNNY_VIEJOS.has(id);
  const ya = cuentaVideoBaseYa(id);
  if (ya) return Promise.resolve(ya);
  if (!Cuenta.sb) return Promise.resolve(libre);
  return Cuenta.sb.functions.invoke('video-url', { body: { video: id } }).then(({ data, error }) => {
    if (data && data.ok && data.base) {
      const base = vieja ? data.base : libre;
      Cuenta.bases.set(id, { base, hasta: vieja && data.expira ? data.expira * 1000 - 600000 : Date.now() + 3600000 });
      return base;
    }
    const status = error && error.context && error.context.status;
    // 401: la sesión venció mientras la app estaba en segundo plano. Se renueva y se pide otra vez.
    if (status === 401 && !reintento) return Cuenta.sb.auth.refreshSession().then(() => cuentaVideoBase(id, true), () => cuentaVideoBase(id, true));
    if ((status === 403 || status === 401) && !SIN_CANDADOS) throw new Error('sin_acceso');
    return libre;
  }, () => libre);
}

// ---------- formularios (hojas inferiores) ----------
const campo = (name, label, type = 'text', extra = '') =>
  `<label class="fld"><span>${label}</span><input name="${name}" type="${type}" aria-label="${label}" ${extra}></label>`;
const CAMPO_CODIGO = campo('codigo', 'Código de acceso', 'text', 'autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="14" placeholder="ABCDE-FGH23" required');

// Hoja con un formulario: `enviar(datos)` devuelve un texto de error o nada si salió bien.
function hojaForm({ title, intro = '', campos, ok, pie = '', enviar }) {
  openSheet(`<form class="acct-form" novalidate><h3 class="sheet-title">${title}</h3>
    ${intro ? `<p class="muted">${intro}</p>` : ''}${campos}
    <p class="form-msg" role="alert" hidden></p>
    <button class="btn main" type="submit">${ok}</button>${pie}</form>`, sh => {
    const f = $('form', sh), msg = $('.form-msg', sh), b = $('button[type=submit]', sh);
    f.onsubmit = async e => {
      e.preventDefault();
      if (b.disabled) return;
      msg.hidden = true; b.disabled = true; const txt = b.textContent; b.textContent = 'Un momento…';
      let err = null;
      try { err = await enviar(Object.fromEntries(new FormData(f)), sh); } catch (x) { err = authError(x); }
      b.disabled = false; b.textContent = b.dataset.txt || txt;
      if (err) { msg.textContent = err; msg.hidden = false; msg.className = 'form-msg bad'; }
    };
    setTimeout(() => $('input', f)?.focus({ preventScroll: true }), 250);
  });
}
const sinRed = () => (!Cuenta.sb ? 'No hay conexión. Revisa tu internet e inténtalo de nuevo.' : null);
const cursoNombre = id => (COURSES.find(c => c.id === id) || {}).name || id;
function openEntrar() { closeSheet(false); authScreen(); }

// Otro código para esta misma cuenta: añade lo que trae (debe estar sin estrenar); el avance no cambia.
function openCanje() {
  if (cuentaDeColegio()) return colegioAvisa();
  if (!Cuenta.user) return openEntrar();
  hojaForm({
    title: 'Añadir un código',
    intro: 'Si te dieron otro código, lo que trae se suma a tu cuenta. Sigues entrando con el de siempre y tu avance no cambia.',
    campos: CAMPO_CODIGO, ok: 'Añadir',
    enviar: async (d, sh) => {
      const c = limpiaCodigo(d.codigo);
      if (!codigoValido(c)) return canjeError('formato');
      if (sinRed()) return canjeError('red');
      const { data, error } = await Cuenta.sb.rpc('canjear_codigo', { p_codigo: c });
      if (error) return canjeError(/fetch|network/i.test(error.message || '') ? 'red' : '');
      if (!data || !data.ok) return canjeError(data && data.error);
      await cuentaPerfil(); Cuenta.bases.clear();
      $('.sheet-card', sh).innerHTML = `<div class="grabber"></div><div class="acct-form canje-ok"><span class="canje-check">${ICON.check}</span>
        <h3 class="sheet-title">Código añadido</h3>
        <p class="muted">${(data.concede || []).map(x => `${esc(cursoNombre(x.curso))} (${x.tipo === 'pago' ? 'completo' : 'prueba'})`).join(', ')}.</p>
        <button class="btn main" type="button" data-ok>Entendido</button></div>`;
      $('[data-ok]', sh).onclick = () => { closeSheet(); cuentaRepinta(); if (!datosPide()) go('home'); };
    },
  });
}

// ---------- pagar con el QR de Bre-B ----------
// brand/pago-breb.png: el QR de Zuka Education redibujado con el mismo contenido (tests/tienda.test.js lo vigila). No trae el
// valor: el estudiante lo escribe. Desde el mismo celular se guarda la imagen y se sube en la app del banco.
const PAGO_QR = 'brand/pago-breb.png';
const pagoHTML = total => `<section class="pago"><h3>Paga con Bre-B</h3>${total != null ? `<p class="pago-valor">${cop(total)}</p>` : ''}
  <img src="${PAGO_QR}" width="260" height="260" alt="Código QR de Bre-B para pagar a Zuka Education"><b>Zuka Education</b>
  <ol><li>Escanéalo desde Nequi o la app de tu banco. Si estás en este celular, guarda la imagen y súbela en la opción de leer QR.</li>
    <li>Revisa que diga <b>Zuka Education</b>${total != null ? ` y escribe <b>${cop(total)}</b>` : ' y escribe el valor'}.</li><li>Envíanos el comprobante por WhatsApp.</li></ol>
  <a class="btn ghost" href="${PAGO_QR}" download="Zuka-pago-BreB.png">Guardar QR</a></section>`;
const openPago = (total, texto) => openSheet(`<div class="acct-form">${pagoHTML(total)}${waBoton(texto, 'Enviar comprobante', 'main brand')}</div>`);

// ---------- comprar ----------
// Se elige cuánto tiempo; queda la solicitud en el panel y se abre WhatsApp con el mensaje escrito. El acceso se activa
// en el mismo código cuando el administrador confirma el pago.
const productosDe = id => (Cuenta.productos || []).filter(p => p.curso === id && p.activo).sort((a, b) => a.meses - b.meses);
async function cuentaTienda() {
  if (!Cuenta.sb) return;
  const [pr, aj] = await Promise.all([Cuenta.sb.from('productos').select('*'), Cuenta.sb.from('ajustes').select('*')]);
  if (pr.data) Cuenta.productos = pr.data;
  if (aj.data) Cuenta.ajustes = Object.fromEntries(aj.data.map(x => [x.clave, x.valor]));
  try { localStorage.setItem('zuka-tienda', JSON.stringify({ productos: Cuenta.productos, ajustes: Cuenta.ajustes })); } catch (e) { /* sin espacio */ }
}
async function openComprar(id, elegido) {
  if (!Cuenta.user) return openEntrar();
  if (cuentaDeColegio()) return colegioAvisa();
  const a = accesoCurso(Cuenta.accesos, id), renueva = !accesoCursoFila(id)?.institucion && (a.estado === 'pago' || a.estado === 'vencido'), curso = cursoNombre(id);
  openSheet(`<div class="acct-form compra"><h3 class="sheet-title">${renueva ? 'Renovar' : 'Comprar'} ${esc(curso)}</h3>
    <p class="muted">${a.estado === 'pago' ? `Te quedan ${diasTexto(a.dias)}: los que compres se suman.` : 'Se activa en tu mismo código y sigues donde vas: no pierdes nada de tu avance.'}</p>
    <div class="compra-lista" role="radiogroup" aria-label="Duración">${silueta('opciones', 3)}</div>
    <p class="form-msg" role="alert" hidden></p></div>`);
  if (!Cuenta.productos) await cuentaTienda().catch(() => {});
  const box = $('#sheet .compra'), lista = $('#sheet .compra-lista');
  if (!box) return;
  const ps = productosDe(id);
  if (!ps.length) { lista.outerHTML = `<p class="muted">Escríbenos y te contamos cómo comprarlo.</p>${waBoton(WA.ayuda(Cuenta.codigo), 'Escribir por WhatsApp', 'main brand')}`; return; }
  let sel = ps.find(p => p.id === elegido) || ps[ps.length - 1];
  const mes = ps[0].meses === 1 ? ps[0].precio : null;
  lista.innerHTML = ps.map(p => `<button type="button" role="radio" class="compra-op" data-p="${esc(p.id)}" aria-checked="${p === sel}" tabindex="${p === sel ? 0 : -1}">
    <span><b>${mesesTexto(p.meses)}</b><small>${mes && p.precio && p.meses > 1 ? `${cop(p.precio / p.meses)} al mes` : diasTexto(p.dias)}</small></span>
    <strong>${p.precio != null ? cop(p.precio) : 'Precio por WhatsApp'}</strong></button>`).join('');
  const ops = [...lista.querySelectorAll('.compra-op')];
  const elige = i => { sel = ps[i]; ops.forEach((o, k) => { o.setAttribute('aria-checked', k === i); o.tabIndex = k === i ? 0 : -1; }); pinta(); };
  ops.forEach((o, i) => {
    o.onclick = () => elige(i);
    o.onkeydown = e => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); const j = (i + d + ops.length) % ops.length; elige(j); ops[j].focus(); } };
  });
  box.insertAdjacentHTML('beforeend', `${Cuenta.ajustes.pago_info ? `<p class="muted compra-info">${esc(Cuenta.ajustes.pago_info)}</p>` : ''}<div class="compra-pie"></div><details class="pago-mas"><summary>Ver QR para pagar</summary><div></div></details>`);
  // Enlace de verdad (no window.open tras una espera): así ningún navegador lo bloquea.
  const pinta = () => {
    const u = waLink(Cuenta.ajustes.whatsapp, WA.compra({ curso, meses: sel.meses, precio: sel.precio, codigo: Cuenta.codigo, nombre: (Cuenta.perfil || {}).nombre }));
    const mas = $('.pago-mas', box);
    mas.hidden = sel.precio == null; $('div', mas).innerHTML = sel.precio == null ? '' : pagoHTML(sel.precio);
    $('.compra-pie', box).innerHTML = u ? `<a class="btn main brand" href="${esc(u)}" target="_blank" rel="noopener" data-pide>Pedir por WhatsApp</a>` : '<button class="btn main brand" type="button" data-pide>Solicitar</button>';
    $('[data-pide]', box).onclick = async () => {
      const msg = $('.form-msg', box);
      const r = await Cuenta.sb?.rpc('pedir_compra', { p_producto: sel.id }).then(x => x, x => ({ error: x }));
      if (!box.isConnected) return;
      msg.hidden = false;
      if (!r || r.error) { msg.className = 'form-msg bad'; msg.textContent = u ? 'No quedó registrada aquí, pero puedes enviar el mensaje de WhatsApp.' : 'No se pudo enviar. Inténtalo de nuevo.'; return; }
      msg.className = 'form-msg ok'; msg.textContent = 'Solicitud enviada. Cuando confirmemos tu pago, el curso se abre aquí mismo.';
    };
  };
  pinta();
}
// Hoja que sale al tocar algo con candado: dice por qué y qué hacer.
function openBloqueo(id) {
  const motivo = planMotivo(id), rec = Cuenta.recursos[id] || {}, t = textoBloqueo(motivo, cursoNombre(rec.curso));
  if (!t) return;
  if (cuentaDeColegio() && motivo !== 'bloqueado' && motivo !== 'sesion') return openSheet(`<div class="acct-form lock-sheet"><span class="lock-ico">${ICON.lock}</span><h3 class="sheet-title">No está en tus cursos</h3><p class="muted">Tu institución elige los cursos que tienes. Si lo necesitas, pídelo a tu docente.</p><button class="btn main" type="button" data-a>Entendido</button></div>`, sh => { $('[data-a]', sh).onclick = () => closeSheet(); });
  const compra = rec.curso && ['ninguno', 'prueba', 'prueba_vencida', 'vencido'].includes(motivo);
  openSheet(`<div class="acct-form lock-sheet"><span class="lock-ico">${ICON.lock}</span>
    <h3 class="sheet-title">${esc(t.title)}</h3><p class="muted">${esc(t.text)}</p>
    ${motivo === 'sesion' ? '<button class="btn main" type="button" data-a="entrar">Entrar con mi código</button>'
    : motivo === 'bloqueado' ? waBoton(WA.ayuda(Cuenta.codigo), 'Escribir por WhatsApp', 'main')
    : `<button class="btn main" type="button" data-a="compra">${motivo === 'vencido' ? 'Renovar' : compra ? 'Comprar acceso' : 'Comprar horas'}</button>
      ${motivo === 'tutorias' ? '' : '<button class="btn ghost" type="button" data-a="paquetes">Ver paquetes y libros</button><button class="link-btn" type="button" data-a="canje">Ya tengo otro código</button>'}`}</div>`,
  sh => sh.querySelectorAll('[data-a]').forEach(b => { b.onclick = () => ({ entrar: openEntrar, canje: openCanje, paquetes: () => openTienda(), compra: () => (compra ? openComprar(rec.curso) : openTienda('asesorias')) })[b.dataset.a](); }));
}
// Aviso dentro del curso (portada): prueba, plan por vencer o vencido, con su botón.
function accesoAvisoHTML(c) {
  if (SIN_CANDADOS || cuentaEsAdmin() || !Cuenta.user || accesoCursoFila(c.id)?.institucion) return '';   // renueva la institución, no el estudiante
  const a = accesoCurso(Cuenta.accesos, c.id);
  const t = {
    prueba: `Estás en la <b>prueba</b>: se abre el primer mundo${c.blocks ? ' de cada componente' : ''}${a.dias != null ? ` (${a.dias === 1 ? 'queda' : 'quedan'} ${diasTexto(a.dias)})` : ''}.`,
    prueba_vencida: 'Tu prueba terminó. Tu avance sigue guardado.', vencido: 'Tu plan venció. Conservas el primer mundo y tu avance.',
    ninguno: 'Este curso no está en tu plan.', pago: a.dias != null && a.dias <= 7 ? `Tu plan vence en <b>${diasTexto(a.dias)}</b>. Si renuevas ya, los días se suman.` : '',
  }[a.estado];
  return t ? `<section class="acc-aviso"><p>${t}</p><button class="btn sm main brand" type="button" data-comprar="${esc(c.id)}">${a.estado === 'pago' || a.estado === 'vencido' ? 'Renovar' : 'Comprar'}</button></section>` : '';
}
const bindAccesoAviso = () => $('[data-comprar]', view)?.addEventListener('click', e => openComprar(e.currentTarget.dataset.comprar));

// ---------- tarjeta «Mi plan» de la pestaña Tú ----------
const accesoPill = a => ({ pago: '<span class="pill ok">Activo</span>', prueba: '<span class="pill warn">Prueba</span>', vencido: '<span class="pill bad">Vencido</span>', prueba_vencida: '<span class="pill bad">Prueba terminada</span>' })[a.estado] || '';
function cuentaCard() {
  if (!Cuenta.user) {
    return `<section class="card acct-card"><h3>Mi plan</h3><p class="muted">Entra con tu código de acceso para ver tus cursos y guardar tu avance.</p>
      <button class="btn brand" data-acct="entrar">Entrar con mi código</button></section>`;
  }
  const p = Cuenta.perfil || {}, admin = p.rol === 'admin', mios = Cuenta.accesos || [], gestor = p.rol === 'gestor', de = Cuenta.inst.nombres;
  return `<section class="card acct-card"><div class="acct-head"><h3>${admin ? 'Administración' : 'Mi plan'}</h3></div>
    ${gestor ? '<p class="muted">Esta es una cuenta de gestión. En el portal registras a tus estudiantes y sigues su avance.</p><button class="btn brand" type="button" data-acct="portal">Abrir el portal</button>' : de.length ? `<p class="acct-inst">Estudias con <b>${esc(de.join(' y '))}</b>. Sus docentes ven tu avance y tu tiempo de estudio.</p>` : ''}
    ${admin ? '<p class="muted">Tienes todo el contenido abierto. Entra directo a lo que necesites:</p>'
    : mios.length ? `<ul class="plan-cursos">${mios.map(x => {
      const a = accesoCurso(mios, x.curso);
      const cu = COURSES.find(k => k.id === x.curso);
      return `<li style="--c:${cu?.color || 'var(--brand)'}">${cu ? aroHTML(pfQueda(x, a), courseArt(cu, 'md')) : ''}<div class="acct-head"><b>${esc(cursoNombre(x.curso))}</b>${accesoPill(a)}</div>
        <p class="muted">${a.estado === 'pago' ? `Del ${fechaCorta(a.desde)} al ${fechaCorta(a.hasta)} · <b class="${a.dias <= 7 ? 'warn' : ''}">${a.dias === 1 ? 'queda' : 'quedan'} ${diasTexto(a.dias)}</b>`
        : a.estado === 'prueba' ? `Primer mundo abierto${a.hasta ? ` hasta el ${fechaCorta(a.hasta)}` : ''}.` : `Terminó el ${fechaCorta(a.hasta)}. Tu avance sigue guardado.`}</p>
        ${x.institucion ? `<p class="muted">Con ${esc(x.institucion)}</p>` : `<button class="btn sm ${a.estado === 'pago' ? 'ghost' : 'main brand'}" type="button" data-acct="comprar" data-curso="${esc(x.curso)}">${x.tipo === 'pago' ? 'Renovar' : 'Comprar acceso'}</button>`}</li>`;
    }).join('')}</ul>` : '<p class="muted">Aún no tienes cursos en tu cuenta.</p>'}
    ${admin ? `<nav class="adm-atajos" aria-label="Administración">${[['estudiantes', 'Estudiantes', 'user'], ['codigos', 'Códigos', 'lock'], ['solicitudes', 'Solicitudes', 'bag'], ['pedidos', 'Pedidos', 'doc'], ['asesorias', 'Asesorías', 'calendar'], ['ventas', 'Ventas', 'trophy']].map(([h, t, i]) => `<a href="admin/#${h}">${ICON[i]}<span>${t}</span></a>`).join('')}</nav><a class="btn brand" href="admin/">Panel de administración</a>` : `<div class="acct-actions"><button class="btn brand" data-acct="tienda">Tienda</button><button class="btn ghost" data-acct="canje">Añadir código</button></div>`}
    <div class="acct-foot">${admin || cuentaFija() ? '<span></span>' : '<button class="link-btn" data-acct="datos">Mis datos</button>'}<button class="link-btn" data-acct="salir">Cerrar sesión</button></div></section>`;
}
async function cuentaSalir() {
  cuentaEnvia(); usoEnvia();
  await estadoEnvia().catch(() => {});   // nada de lo ganado se queda sin subir
  if (Cuenta.sb) await Cuenta.sb.auth.signOut({ scope: 'local' }).catch(() => {});
  portalVe(false); Cuenta.user = null; Cuenta.perfil = null; Cuenta.accesos = []; Cuenta.inst = { nombres: [], metas: [] }; Cuenta.codigo = ''; tiendaFuera(); cuentaCache(); cuentaRol(); toast('Sesión cerrada.'); cuentaRepinta();
  if (!SIN_CANDADOS) authScreen();
}
function cuentaBind(root) {
  const acts = { portal: () => go('portal'), entrar: openEntrar, tienda: () => openTienda(), canje: openCanje, datos: () => datosScreen(false),
    comprar: b => openComprar(b.dataset.curso),
    copia: () => navigator.clipboard?.writeText(muestraCodigo(Cuenta.codigo)).then(() => toast('Código copiado.'), () => toast(muestraCodigo(Cuenta.codigo))),
    salir: () => ask({ title: '¿Cerrar sesión?', text: Cuenta.codigo ? `Para volver necesitarás tu código: ${muestraCodigo(Cuenta.codigo)}. Guárdalo antes.` : 'Tu avance queda guardado en tu cuenta.', ok: 'Cerrar sesión', cancel: 'Quedarme' })
      .then(si => { if (si) cuentaSalir(); }) };
  root.querySelectorAll('[data-acct]').forEach(b => { b.onclick = () => acts[b.dataset.acct](b); });
}
