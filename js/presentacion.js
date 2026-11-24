// Página de presentación en la web (spec 2026-11-20-presentacion; referencia: la portada de Brilliant).
// Quien abre Zuka en el navegador sin tenerla instalada y sin sesión ve primero quiénes somos, con «Iniciar sesión»
// arriba. Va como capa propia (#landing) sobre la app; los botones de cuenta abren la pantalla de entrada (js/cuenta.js).

// ¿Sale? Pura: se prueba en Node.
function presentacionToca({ standalone, user, guest, query = '' }) {
  const q = k => new RegExp(`[?&]${k}(=|&|$)`).test(query);
  if (q('presentacion')) return true;
  if (q('app')) return false;
  return !standalone && !user && !guest;
}

// El nombre en letra (pedido del 2026-11-20: sin el cerebro de puntos): barra de la presentación, entrada y barra de
// escritorio. Estilo .zk-word en css/presentacion.css.
const zukaWord = () => '<span class="zk-word">Zuka</span>';

const pzEsc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const pzLessons = c => (c.units || []).reduce((n, u) => n + ((u.lessons || []).length), 0);

// Dibujos de los bloques «cómo se aprende» (SVG con las variables del tema).
const PZ_VIDEO = `<svg viewBox="0 0 160 120" aria-hidden="true"><rect x="2" y="2" width="156" height="116" rx="14" class="pz-s-card"/>
  <circle cx="64" cy="58" r="30" class="pz-s-a"/><circle cx="96" cy="58" r="30" class="pz-s-b"/>
  <text x="44" y="62" class="pz-s-t">A</text><text x="109" y="62" class="pz-s-t">B</text>
  <rect x="14" y="102" width="132" height="4" rx="2" class="pz-s-track"/><rect x="14" y="102" width="58" height="4" rx="2" class="pz-s-prog"/>
  <circle cx="80" cy="58" r="13" class="pz-s-play"/><path d="M76 51l11 7-11 7z" class="pz-s-tri"/></svg>`;
const PZ_JUEGO = `<svg viewBox="0 0 160 120" aria-hidden="true"><rect x="2" y="2" width="156" height="116" rx="14" class="pz-s-card"/>
  <path d="M80 100V52M64 104h32" class="pz-s-line"/>
  <g class="pz-beam"><path d="M30 52h100" class="pz-s-line"/>
    <path d="M30 52l-12 22h24zM130 52l-12 22h24z" class="pz-s-pan"/>
    <rect x="22" y="58" width="16" height="13" rx="3" class="pz-s-a"/><rect x="113" y="62" width="11" height="9" rx="2.5" class="pz-s-b"/>
    <rect x="125" y="62" width="11" height="9" rx="2.5" class="pz-s-b"/></g>
  <circle cx="80" cy="52" r="4" class="pz-s-dot"/>
  <path class="pz-hand" d="M118 96c0-6 2-9 5-9s4 3 4 6v-12c0-3 2-4 4-4s4 1 4 4v14c4-1 8 0 8 5 0 6-4 12-12 12h-4c-6 0-9-6-9-16z"/></svg>`;
const PZ_TUTOR = `<svg viewBox="0 0 160 120" aria-hidden="true"><rect x="2" y="2" width="156" height="116" rx="14" class="pz-s-card"/>
  ${[0, 1, 2, 3, 4].map(i => `<rect x="${16 + i * 27}" y="18" width="21" height="28" rx="6" class="${i === 2 ? 'pz-s-on' : 'pz-s-day'}"/>`).join('')}
  ${['8:00', '10:00', '4:00 p. m.'].map((h, i) => `<rect x="16" y="${56 + i * 18}" width="${i === 2 ? 128 : 92}" height="13" rx="6.5" class="${i === 2 ? 'pz-s-a' : 'pz-s-day'}"/>`).join('')}</svg>`;

function presentacionHTML(cursos, { worlds = {}, install = '' } = {}) {
  const logo = zukaWord();
  const mascot = pose => (typeof mascotSVG === 'function' ? mascotSVG(pose) : '');
  const art = c => (typeof courseArt === 'function' ? courseArt(c, 'xl') : `<span class="pz-dot" style="background:${c.color}"></span>`);
  const empieza = (cls = '') => `<button class="btn main brand ${cls}" type="button" data-pz="registro">Empieza gratis</button>`;
  const world = u => pzEsc((worlds[u.world] || {}).name || u.title);
  const gymC = cursos[0];
  const gymArt = typeof GYM_3D === 'string' && gymC
    ? `<span class="pz-gymart" style="${typeof gymFabColors === 'function' ? gymFabColors(gymC) : `--c:${gymC.color}`}">${GYM_3D}</span>` : '';
  const plates = n => (typeof gymPlates === 'function' ? gymPlates(n) : '');
  const bloque = (eyebrow, h, p, fig, extra = '') => `<section class="pz-feat pz-rev">
      <div class="pz-feat-txt"><p class="pz-eyebrow">${eyebrow}</p><h3>${h}</h3><p>${p}</p>${extra}</div>
      <div class="pz-feat-fig">${fig}</div></section>`;
  return `<header class="pz-bar"><span class="pz-logo">${logo}</span>
      <span class="pz-bar-acts"><button class="btn brand sm pz-bar-go" type="button" data-pz="registro" tabindex="-1">Empieza gratis</button>
      <button class="btn ghost sm" type="button" data-pz="login">Iniciar sesión</button></span></header>
    <main class="pz-main">
    <section class="pz-hero">
      <div class="pz-hero-art">${mascot('cheer')}</div>
      <h1>Matemáticas que se <em>entienden</em>, ejercicios que se <em>juegan</em></h1>
      <p class="pz-lead">Videos cortos que explican con intuición, juegos para arrastrar y un gimnasio cerebral. Del álgebra y la
        trigonometría a la preparación para entrar a la universidad.</p>
      <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz="login">Ya tengo cuenta</button></div>
      <ul class="pz-seals"><li>Gratis para empezar</li><li>100 % en español</li><li>En tu celular o computador</li></ul>
    </section>
    <section class="pz-fan" aria-label="Cursos">
      ${cursos.map((c, i) => `<article class="pz-card pz-rev" style="--c:${c.color};--i:${i}">${art(c)}<b>${pzEsc(c.name)}</b>
        <small>${pzLessons(c)} ${pzLessons(c) === 1 ? 'lección' : 'lecciones'}</small></article>`).join('')}
    </section>
    <section class="pz-about pz-rev">
      <p class="pz-eyebrow">Quiénes somos</p>
      <h2>Somos Zuka: tu entrenador de matemáticas</h2>
      <p>Zuka es una app colombiana para aprender matemáticas a tu ritmo, pensada para quienes terminan el colegio, se preparan
        para entrar a la universidad o cursan sus primeros semestres.</p>
      <p>Creemos que nadie es «malo para las matemáticas»: casi siempre faltó ver la idea. Por eso cada tema empieza por la
        intuición, sigue con ejemplos resueltos con calma y termina en juegos donde tú mueves las piezas. Los contenidos siguen el
        programa de Álgebra y Trigonometría de la Universidad de Antioquia.</p>
      <ul class="pz-pillars">
        <li><b>Entender, no memorizar</b><span>La idea primero; la fórmula, después.</span></li>
        <li><b>Sin prisa</b><span>Ningún juego te apura con un cronómetro.</span></li>
        <li><b>Siempre una pista</b><span>Te orienta sin regalarte la respuesta.</span></li>
      </ul>
    </section>
    <h2 class="pz-h2 pz-rev">Cómo se aprende en Zuka</h2>
    ${bloque('Primero la intuición', 'Videos cortos que explican la idea antes que la fórmula',
      'Cada lección abre con un video de pocos minutos: una historia real, la idea dibujada y ejemplos resueltos paso a paso.', PZ_VIDEO)}
    ${bloque('Ejercicios que se juegan', 'Arrastras, deslizas y la escena reacciona',
      'Nada de llenar casillas: inclinas una balanza, llenas una jarra, giras un ángulo. El juego hace las cuentas y tú ves por qué funciona.', PZ_JUEGO)}
    ${bloque('Gimnasio cerebral', 'Entrena por niveles, como en el gimnasio',
      'Retos guiados de lo que ya aprendiste. Empiezas suave y subes cuando estés listo.', gymArt,
      `<ul class="pz-levels"><li class="lv1">${plates(1)}Calentamiento</li><li class="lv2">${plates(2)}Fuerza</li><li class="lv3">${plates(3)}Élite</li></ul>`)}
    ${bloque('Tutorías', 'Y si lo necesitas, un profe en vivo',
      'Separa una asesoría virtual: eliges la materia, los temas, el día y la hora.', PZ_TUTOR)}
    <section class="pz-topics pz-rev">
      <h2 class="pz-h2">Lo que vas a aprender</h2>
      <div class="pz-tabs" role="tablist" aria-label="Cursos">${cursos.map((c, i) => `<button type="button" role="tab" data-pz-tab="${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" style="--c:${c.color}">${pzEsc(c.name)}</button>`).join('')}</div>
      ${cursos.map((c, i) => `<div class="pz-panel" role="tabpanel" data-pz-panel="${i}" style="--c:${c.color}"${i ? ' hidden' : ''}>
        <p>${pzEsc(c.tagline || '')}</p><ul class="pz-chips">${(c.units || []).map(u => `<li>${world(u)}</li>`).join('')}</ul></div>`).join('')}
    </section>
    <section class="pz-install pz-rev">
      <div><h2 class="pz-h2">Llévala en tu celular</h2>
        <p>Zuka se instala como una app más, sin pasar por la tienda, y abre al instante.</p>${install}</div>
      <div class="pz-install-art">${mascot('think')}</div>
    </section>
    <section class="pz-final pz-rev">
      <h2>Tu mente, más fuerte cada día</h2>
      <p>Empieza hoy con la primera lección de cada curso, gratis.</p>${empieza()}
    </section>
    </main>
    <footer class="pz-foot"><span class="pz-logo">${logo}</span>
      <button class="link-btn" type="button" data-pz="guest">Explorar sin cuenta</button>
      <small>© 2026 Zuka · Potencia tu mente</small></footer>`;
}

// ---- en la página ----
let pzDesde = false;   // la pantalla de entrada se abrió desde aquí: muestra «Volver» (js/cuenta.js)
function presentacionPide() {
  if (claveAlAbrir()) return true;   // se vuelve del correo de la contraseña (js/clave.js)
  const ok = presentacionToca({ standalone: isStandalone(), user: Cuenta.user, guest: S.guest, query: location.search });
  if (ok) presentacionAbrir();
  return ok;
}
function presentacionCerrar() {
  pzDesde = false;
  document.getElementById('landing')?.remove();
  pzInerte(false);
}
// Mientras se ve, lo de atrás no se alcanza con Tab ni con el lector de pantalla.
const PZ_DETRAS = ['#topbar', '#view', '#tabbar', '#overlay'];
function pzInerte(on) {
  PZ_DETRAS.forEach(s => { const x = document.querySelector(s); if (x) x.inert = on && !!document.getElementById('landing'); });
}
// Botón atrás del celular (js/back.js): desde la pantalla de entrada abierta aquí, vuelve a la presentación.
function presentacionAtras() {
  if (!document.getElementById('auth') || !pzDesde) return false;
  pzVolver();
  return true;
}
// De la pantalla de entrada a la presentación: la ventana se cierra (escritorio) o la presentación vuelve (celular).
function pzVolver() {
  document.getElementById('auth')?.remove();
  const lz = document.getElementById('landing');
  if (!lz) return presentacionAbrir();
  lz.inert = false; pzDesde = false;
  lz.querySelector('h1')?.focus({ preventScroll: true });
}
function presentacionInstall() {
  if (isStandalone()) return '';
  if (installEvt) return '<button class="btn main brand" type="button" data-pz="install">Instalar Zuka</button>';
  return `<p class="pz-help">${installHelp()}</p>`;
}
function presentacionAbrir() {
  let el = document.getElementById('landing');
  if (!el) {
    el = document.createElement('div'); el.id = 'landing';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Conoce Zuka');
    document.body.appendChild(el);
  }
  el.innerHTML = presentacionHTML(cursosVisibles(), { worlds: typeof WORLDS === 'undefined' ? {} : WORLDS, install: presentacionInstall() });
  el.scrollTop = 0;
  pzInerte(true);
  el.querySelector('h1').tabIndex = -1; el.querySelector('h1').focus({ preventScroll: true });
  el.querySelectorAll('[data-pz]').forEach(b => b.onclick = () => {
    const m = b.dataset.pz;
    if (m === 'install') return promptInstall().then(() => presentacionAbrir());
    // authCerrar quita también la presentación y abre el recorrido si toca
    if (m === 'guest' || !Cuenta.sb) { S.guest = m === 'guest' || S.guest; save(); pzDesde = false; return authCerrar(); }
    // En el computador la entrada es una ventana sobre la presentación (css/escritorio.css); en el celular la reemplaza.
    const encima = esEscritorio();
    if (!encima) presentacionCerrar();
    pzDesde = true; authScreen(m);
    const auth = document.getElementById('auth'), h1 = auth.querySelector('h1');
    h1.tabIndex = -1;
    if (encima) {
      el.inert = true; h1.focus();   // la presentación de atrás no se alcanza con Tab; Escape cierra la ventana
      if (!auth.dataset.pzEsc) { auth.dataset.pzEsc = '1'; auth.addEventListener('keydown', e => { if (e.key === 'Escape') pzVolver(); }); }
    }
  });
  // Pestañas de cursos (con flechas, foco itinerante).
  const tabs = [...el.querySelectorAll('[data-pz-tab]')];
  const pick = i => tabs.forEach((t, k) => {
    t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1;
    el.querySelector(`[data-pz-panel="${k}"]`).hidden = k !== i;
  });
  tabs.forEach((t, i) => {
    t.onclick = () => pick(i);
    t.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault(); const j = (i + d + tabs.length) % tabs.length; pick(j); tabs[j].focus();
    };
  });
  // Al bajar, la barra se asienta y muestra también «Empieza gratis».
  const bar = el.querySelector('.pz-bar'), go = el.querySelector('.pz-bar-go');
  el.onscroll = () => {
    const on = el.scrollTop > 280;
    bar.classList.toggle('lit', el.scrollTop > 8); bar.classList.toggle('on', on); go.tabIndex = on ? 0 : -1;
  };
  // Cada bloque aparece suave al entrar en pantalla.
  const rev = el.querySelectorAll('.pz-rev');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) rev.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { root: el, threshold: .12 });
    rev.forEach(r => io.observe(r));
  }
}
