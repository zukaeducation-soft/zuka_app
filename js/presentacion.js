// Página de presentación en la web (spec 2026-11-20-presentacion; referencia: la portada de Brilliant).
// Quien abre Zuka en el navegador sin tenerla instalada y sin sesión ve primero quiénes somos, con «Iniciar sesión»
// arriba. Va como capa propia (#landing) sobre la app; los botones de cuenta abren la pantalla de entrada (js/cuenta.js).

// ¿Sale? Pura: se prueba en Node.
function presentacionToca({ standalone, user, query = '' }) {
  const q = k => new RegExp(`[?&]${k}(=|&|$)`).test(query);
  if (q('presentacion')) return true;
  if (q('app')) return false;
  return !standalone && !user;
}

// El nombre en letra (pedido del 2026-11-20: sin el cerebro de puntos): barra de la presentación, entrada y barra de
// escritorio. El logo es logoHTML (js/marca.js).
const zukaWord = () => logoHTML();

const pzEsc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const pzLessons = c => (c.units || []).reduce((n, u) => n + ((u.lessons || []).length), 0);

// ---- la portada se juega (spec 2026-11-24-portada-viva): cuentas puras, se prueban en Node ----
// Punto de la rueda: ángulo en grados [0, 360) de un desplazamiento en pantalla (y hacia abajo).
const pzAngulo = (dx, dy) => (Math.atan2(-dy, dx) * 180 / Math.PI + 360) % 360;
// La altura del punto, dibujada hacia la derecha: en x0 vale sen θ y más lejos, lo que valía antes.
function pzOnda(deg, { x0, x1, cy, r, largo = 2.6 }) {
  const t = deg * Math.PI / 180, n = Math.max(24, Math.ceil((x1 - x0) / 7));
  let d = '';
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(cy - r * Math.sin(t - (x - x0) / (r * largo / Math.PI))).toFixed(1)}`;
  }
  return d;
}
// Reto de la portada: que la altura sea ½. Devuelve el ángulo exacto (30 o 150) si quedó cerca; si no, null.
const pzReto = deg => [30, 150].find(a => Math.abs(deg - a) <= 2.5) ?? null;
const PZ_LADO = 10;   // lado del cuadrado de (a + b)²
const pzArea = a => ({ a, b: PZ_LADO - a, aa: a * a, ab: a * (PZ_LADO - a), bb: (PZ_LADO - a) ** 2 });
// Palanca: 2 kg a 3 pasos contra 3 kg a d pasos. Inclinación en grados (positiva: baja la derecha).
const pzPalanca = d => ({ izq: 2 * 3, der: 3 * d, giro: Math.max(-13, Math.min(13, (3 * d - 6) * 2.2)), ok: 3 * d === 6 });

const PZ_RETO = 'Arrastra el punto hasta que su altura sea <b>½</b>.';
const pzRueda = () => `<div class="pz-stage">
    <svg class="pz-rueda" viewBox="0 0 1440 380" preserveAspectRatio="xMinYMid meet">
      <path class="pz-eje"/><path class="pz-meta"/><text class="pz-meta-t">½</text>
      <path class="pz-onda"/><circle class="pz-aro"/><path class="pz-tri"/><path class="pz-arco"/><path class="pz-guia"/><path class="pz-alto"/>
      <circle class="pz-fin" r="5"/>
      <g class="pz-knob" role="slider" tabindex="0" aria-label="Ángulo del punto en la rueda" aria-valuemin="0" aria-valuemax="359" aria-valuenow="48">
        <circle class="pz-hit" r="40"/><circle class="pz-halo" r="20"/><circle class="pz-bola" r="11"/></g>
    </svg>
    <div class="pz-reto">
      <p class="pz-lee"><i>sen</i> <b>48°</b> = <b>0.74</b></p>
      <p class="pz-reto-t" aria-live="polite">${PZ_RETO}</p>
      <button class="pz-reto-go" type="button" data-pz="prueba" hidden>Pide tu código y sigue gratis</button>
    </div></div>`;

const PZ_AREA = `<svg class="pz-area" viewBox="0 0 320 300">
    <rect class="pz-aa"/><rect class="pz-ab"/><rect class="pz-ab pz-ba"/><rect class="pz-bb"/>
    <text class="pz-t-aa"/><text class="pz-t-ab"/><text class="pz-t-ba"/><text class="pz-t-bb"/>
    <text class="pz-l-a"/><text class="pz-l-b"/><path class="pz-corte"/>
    <g class="pz-knob" role="slider" tabindex="0" aria-label="Dónde se parte el lado del cuadrado" aria-valuemin="1" aria-valuemax="9" aria-valuenow="7">
      <circle class="pz-hit" r="30"/><circle class="pz-bola" r="10"/></g></svg>`;
const PZ_PALANCA = `<svg class="pz-pal" viewBox="0 0 360 250">
    <path class="pz-base" d="M180 148l-26 60h52z"/><path class="pz-suelo" d="M96 208h168"/>
    <g class="pz-viga"><path class="pz-brazo" d="M24 144h312"/>
      ${[-4, -3, -2, -1, 1, 2, 3, 4].map(k => `<path class="pz-marca" d="M${180 + k * 36} 144v9"/>`).join('')}
      <g class="pz-izq" transform="translate(72 144)"><rect x="-19" y="-40" width="38" height="38" rx="9"/><text y="-15">2</text></g>
      <g class="pz-knob pz-der" role="slider" tabindex="0" aria-label="Distancia del peso de 3 kilos al apoyo" aria-valuemin="1" aria-valuemax="4" aria-valuenow="4">
        <rect class="pz-hit" x="-32" y="-64" width="64" height="76"/><rect x="-23" y="-48" width="46" height="46" rx="10"/><text y="-18">3</text></g></g>
    <circle class="pz-pivote" cx="180" cy="145" r="6"/></svg>`;
const PZ_TUTOR = `<div class="pz-agenda" aria-hidden="true"><div class="pz-dias">${['L', 'M', 'M', 'J', 'V'].map((d, i) => `<span${i === 2 ? ' class="on"' : ''}><small>${d}</small>${11 + i}</span>`).join('')}</div>
    <div class="pz-horas">${['2:00 p. m.', '3:00 p. m.', '4:00 p. m.'].map((h, i) => `<span${i === 2 ? ' class="on"' : ''}>${h}</span>`).join('')}</div></div>`;
const PZ_MUNDOS = 12;   // mundos a la vista por curso; los demás se cuentan

// ---- tu camino: del colegio al grado (spec 2026-11-24-portada-aliado) ----
// Cada etapa nombra los cursos que la sirven; el que aún no está publicado sale como «Muy pronto».
const PZ_ETAPAS = [
  { id: 'colegio', name: 'Colegio', h: 'Llega con bases', p: 'Cierra los vacíos desde cero, con la idea antes que la fórmula.', cursos: ['algebra', 'trig', 'preicfes'] },
  { id: 'admision', name: 'Admisión', h: 'Presenta el examen sabiendo qué esperar', p: 'Razonamiento lógico y comprensión lectora, explicados paso a paso y con la forma en que se preguntan.', cursos: ['preuda'], mas: [{ t: 'Libros impresos' }, { t: 'Asesorías', si: ['preuda'] }] },
  { id: 'semestres', name: 'Semestres', h: 'Que las matemáticas no te frenen la carrera', p: 'Temas que siguen el programa de la Universidad de Antioquia y ejercicios para llegar preparado al parcial.', cursos: ['algebra', 'trig', 'calc', 'geo'], mas: [{ t: 'Asesorías' }] },
  { id: 'grado', name: 'Grado', h: 'Alguien a quien preguntarle', p: 'Cálculo, Física y Álgebra Lineal, con asesorías virtuales de una hora para cuando una materia se ponga difícil.', cursos: ['int', 'lin', 'fis'], mas: [{ t: 'Asesorías de universidad', si: ['calc', 'fis', 'int', 'lin'] }] },
];
const PZ_PARADAS = [.1, .37, .64, .9];
const pzCaminoY = x => .8 - .62 * x - .09 * Math.sin(x * Math.PI * 3);   // altura del camino, 0 arriba y 1 abajo
const pzEtapaEn = x => PZ_PARADAS.reduce((m, p, i) => (Math.abs(p - x) < Math.abs(PZ_PARADAS[m] - x) ? i : m), 0);
const pzCursosDe = (e, visibles, todos) => e.cursos.map(id => ({ c: visibles.find(c => c.id === id) || todos.find(c => c.id === id), listo: visibles.some(c => c.id === id) })).filter(x => x.c);
// Resorte amortiguado (un paso): devuelve [posición, velocidad].
function pzResorte(x, v, meta, dt, k = 170, c = 24) {
  const h = Math.min(dt, .032), a = k * (meta - x) - c * v;
  return [x + (v + a * h) * h, v + a * h];
}
const pzCaminoD = () => Array.from({ length: 61 }, (_, i) => `${i ? 'L' : 'M'}${(i / 60 * 1000).toFixed(1)} ${(pzCaminoY(i / 60) * 300).toFixed(1)}`).join('');
const PZ_DUDAS = [
  ['En clase lo entiendo, pero en el parcial me bloqueo', 'Mirar no es hacer. Aquí mueves cada idea hasta que puedes reconstruirla sin ayuda, y después la usas en problemas distintos.'],
  ['Me aprendo la fórmula y al mes se me olvida', 'Primero ves de dónde sale. Cuando la idea es tuya, la fórmula se puede volver a armar.'],
  ['No sé por dónde empezar a estudiar', 'Cada curso es un camino desde cero: un mundo después de otro. Abres Zuka y la lección que sigue ya está lista.'],
  ['Me da pena preguntar', 'Te equivocas sin público y pides pistas cuando quieras. Si hace falta, separas una asesoría y lo resuelves con una persona.'],
];
const pzCamino = (cursos, todos) => `<div class="pz-ruta" data-en="1">
      <div class="pz-ruta-map"><svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true"><path class="pz-ruta-b" d="${pzCaminoD()}"/><path class="pz-ruta-l" d="${pzCaminoD()}"/></svg>
        <span class="pz-ruta-yo" aria-hidden="true"></span>
        <div role="tablist" aria-label="Etapas">${PZ_ETAPAS.map((e, i) => `<button type="button" role="tab" id="pz-et-${i}" aria-controls="pz-ep-${i}" aria-selected="${i === 1}" tabindex="${i === 1 ? 0 : -1}" style="left:${PZ_PARADAS[i] * 100}%;top:${(pzCaminoY(PZ_PARADAS[i]) * 100).toFixed(1)}%"><i></i><span>${e.name}</span></button>`).join('')}</div></div>
      <div class="pz-ruta-txt">${PZ_ETAPAS.map((e, i) => `<div role="tabpanel" id="pz-ep-${i}" aria-labelledby="pz-et-${i}" class="pz-ep${i === 1 ? ' on' : ''}"${i === 1 ? '' : ' inert'}><h3>${e.h}</h3><p>${e.p}</p>
        <ul>${pzCursosDe(e, cursos, todos).map(({ c, listo }) => `<li style="--c:${c.color}"${listo ? '' : ' class="pronto"'}>${pzEsc(c.name)}${listo ? '' : '<small>Muy pronto</small>'}</li>`).join('')}${(e.mas || []).map(m => (!m.si || cursos.some(c => m.si.includes(c.id)) ? `<li>${m.t}</li>` : `<li class="pronto">${m.t}<small>Muy pronto</small></li>`)).join('')}</ul></div>`).join('')}</div></div>`;

function presentacionHTML(cursos, { worlds = {}, install = '', todos = cursos } = {}) {
  const logo = zukaWord();
  const mascot = pose => (typeof mascotSVG === 'function' ? mascotSVG(pose) : '');
  const art = c => (typeof courseArt === 'function' ? courseArt(c, 'lg') : `<span class="pz-dot" style="background:${c.color}"></span>`);
  const empieza = (cls = '') => `<button class="btn main brand ${cls}" type="button" data-pz="prueba">Pide tu código de prueba</button>`;
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const mundo = u => {
    const w = worlds[u.world] || {};
    return `<li>${w.art ? `<span class="pz-lam world-art" aria-hidden="true">${w.art}</span>` : ''}<span>${pzEsc(w.name || u.title)}</span></li>`;
  };
  const gymC = cursos[0];
  const gymArt = typeof GYM_3D === 'string' && gymC
    ? `<span class="pz-gymart" data-inclina="14" style="${typeof gymFabColors === 'function' ? gymFabColors(gymC) : `--c:${gymC.color}`}">${GYM_3D}</span>` : '';
  const plates = n => (typeof gymPlates === 'function' ? gymPlates(n) : '');
  const demo = (cls, h, p, fig, pie = '') => `<article class="pz-demo ${cls} pz-rev"><div class="pz-demo-txt"><h3>${h}</h3><p>${p}</p></div>
      <div class="pz-demo-fig">${fig}</div>${pie}</article>`;
  return `<header class="pz-bar"><div class="pz-in"><span class="pz-logo">${logo}</span>
      <nav class="pz-nav" aria-label="Secciones"><a href="#pz-ruta">Tu camino</a><a href="#pz-como">Cómo se aprende</a><a href="#pz-cursos">Cursos</a><a href="#pz-dudas">Preguntas</a></nav>
      <span class="pz-bar-acts"><button class="btn ghost sm" type="button" data-pz="login">Entrar</button>
      <button class="btn brand sm pz-bar-go" type="button" data-pz="prueba">Código de prueba</button></span></div></header>
    <main class="pz-main">
    <section class="pz-hero"><canvas class="pz-campo" aria-hidden="true"></canvas>
      <div class="pz-hero-in pz-in">
        <h1>Tu aliado para <em>entrar</em> a la <br class="pz-br">universidad y <em class="b">terminarla</em></h1>
        <div class="pz-hero-side">
          <p class="pz-lead">Cursos que se juegan, libros y asesorías para preparar la admisión y sacar adelante las matemáticas de la carrera.</p>
          <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz="login">Ya tengo código</button></div>
        </div>
      </div>
      ${pzRueda()}
    </section>
    <section class="pz-sec pz-in" id="pz-ruta">
      <header class="pz-head pz-rev"><h2>Contigo del colegio al grado</h2><p>Recorre el camino y mira qué tienes en cada etapa.</p></header>
      <div class="pz-rev">${pzCamino(cursos, todos)}</div>
    </section>
    <section class="pz-sec pz-in pz-pasa">
      <h2 class="pz-rev">¿Te ha pasado?</h2>
      <ul class="pz-quejas pz-rev">${PZ_DUDAS.map(([q, r], i) => `<li${i ? '' : ' class="on"'}><button type="button" aria-expanded="${!i}" aria-controls="pz-q-${i}">«${q}»</button><div class="pz-resp" id="pz-q-${i}"><p>${r}</p></div></li>`).join('')}</ul>
    </section>
    <section class="pz-sec pz-in" id="pz-como">
      <header class="pz-head pz-rev"><h2>Cómo se aprende en Zuka</h2>
        <p>Primero ves la idea, después la fórmula. Estos dibujos funcionan: pruébalos.</p></header>
      <div class="pz-demos">
        ${demo('pz-d-area', 'La fórmula deja de ser un truco', 'Mueve el corte: el cuadrado siempre se arma con las mismas cuatro piezas.', PZ_AREA,
    '<p class="pz-cuenta pz-cuenta-area"></p>')}
        ${demo('pz-d-pal', 'Practicas jugando', 'Corre el peso hasta equilibrar la palanca. La cuenta se escribe sola.', PZ_PALANCA,
    '<p class="pz-cuenta pz-cuenta-pal"></p>')}
        ${demo('pz-d-gym', 'Gimnasio cerebral', 'Retos guiados de lo que ya aprendiste. Empiezas suave y subes cuando estés listo.', gymArt,
    `<ul class="pz-levels"><li class="lv1">${plates(1)}Calentamiento</li><li class="lv2">${plates(2)}Fuerza</li><li class="lv3">${plates(3)}Élite</li></ul>`)}
        ${demo('pz-d-tut', 'Tutorías en vivo', 'Separa una asesoría virtual: eliges la materia, los temas, el día y la hora. Se compran por horas.', PZ_TUTOR)}
      </div>
    </section>
    <section class="pz-sec pz-in pz-topics" id="pz-cursos">
      <header class="pz-head pz-rev"><h2>Lo que vas a aprender</h2><p>Cada curso es un mapa de mundos, en orden y desde cero.</p></header>
      <div class="pz-cursos pz-rev">
        <div class="pz-tabs" role="tablist" aria-label="Cursos">${cursos.map((c, i) => `<button type="button" role="tab" id="pz-tab-${i}" aria-controls="pz-panel-${i}" data-pz-tab="${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" style="--c:${c.color}">${art(c)}<span><b>${pzEsc(c.name)}</b><small>${plural(pzLessons(c), 'lección', 'lecciones')}</small></span></button>`).join('')}</div>
        ${cursos.map((c, i) => `<div class="pz-panel" role="tabpanel" id="pz-panel-${i}" aria-labelledby="pz-tab-${i}" data-pz-panel="${i}" style="--c:${c.color}"${i ? ' hidden' : ''}>
          <p>${pzEsc(c.tagline || '')}</p><ul class="pz-mundos">${(c.units || []).slice(0, PZ_MUNDOS).map(mundo).join('')}</ul>
          ${(c.units || []).length > PZ_MUNDOS ? `<p class="pz-mas">y ${plural(c.units.length - PZ_MUNDOS, 'mundo más', 'mundos más')}</p>` : ''}</div>`).join('')}
      </div>
    </section>
    <section class="pz-sec pz-in pz-libros">
      <div class="pz-libros-txt pz-rev"><h2>También en papel</h2>
        <p>Cuatro libros para el examen de admisión: dos de razonamiento lógico y dos de comprensión lectora. Ejemplos resueltos, talleres con clave y la forma en que se pregunta cada tema. Impresos a color, con envío.</p></div>
      <div class="pz-estante pz-rev" data-inclina="9">${[['Número y forma', 1], ['Orden, lógica y azar', 2], ['Leer lo que dice', 3], ['Leer lo que quiere decir', 4]].map(([t, n]) => `<span style="--i:${n - 2.5}"><img src="brand/libros/${n}.webp" alt="Libro ${n}: ${t}" loading="lazy" width="340" height="480"></span>`).join('')}</div>
    </section>
    <section class="pz-sec pz-in pz-about">
      <p class="pz-kicker pz-rev">Quiénes somos</p>
      <h2 class="pz-rev">Nadie es «malo para las matemáticas». Casi siempre <em class="b">faltó ver la idea</em>.</h2>
      <div class="pz-about-in pz-rev">
        <p>Zuka es una app colombiana para aprender a tu ritmo, pensada para quienes terminan el colegio, se preparan para entrar a la
          universidad o cursan sus primeros semestres. Los contenidos siguen el programa de Álgebra y Trigonometría de la Universidad de Antioquia.</p>
        <ul class="pz-pillars">
          <li><b>Entender, no memorizar</b><span>La idea primero; la fórmula, después.</span></li>
          <li><b>Sin prisa</b><span>En las lecciones no corre ningún cronómetro.</span></li>
          <li><b>Con pistas</b><span>Te orienta sin regalarte la respuesta.</span></li>
        </ul>
      </div>
    </section>
    <section class="pz-sec pz-in pz-dudas" id="pz-dudas">
      <h2 class="pz-rev">Preguntas frecuentes</h2>
      <div class="pz-faq pz-rev">
        <details open><summary>¿Qué puedo hacer gratis?</summary><p>El primer mundo del curso, con un código de prueba que pides por WhatsApp. Para seguir, compras el curso y se activa en tu mismo código.</p></details>
        <details><summary>¿Necesito saber mucho para empezar?</summary><p>No. Los cursos empiezan desde cero, y casi todos los ejercicios traen una pista.</p></details>
        <details><summary>¿Sirve en el celular y en el computador?</summary><p>Sí. Funciona en el navegador de los dos y también se instala como una app, sin pasar por la tienda.</p>${install}</details>
        <details><summary>¿Cómo entro y qué pasa con mi avance?</summary><p>Escribes tu código y listo. Con ese mismo código entras siempre y conservas tu avance.</p></details>
      </div>
    </section>
    <section class="pz-final pz-rev"><div class="pz-final-art" data-inclina="16">${mascot('cheer')}</div>
      <h2>La universidad empieza hoy</h2>
      <ol class="pz-pasos"><li><b>Pide tu código</b><span>Por WhatsApp, gratis.</span></li><li><b>Juega el primer mundo</b><span>Y decide con calma.</span></li><li><b>Sigue donde vas</b><span>Tu curso se activa en el mismo código.</span></li></ol>${empieza()}</section>
    </main>
    <footer class="pz-foot"><div class="pz-in"><span class="pz-logo">${logo}</span><small>© 2026 Zuka · Potencia tu mente</small></div></footer>`;
}

// ---- dibujos que se mueven ----
// Arrastre directo (dedo, ratón) y flechas del teclado sobre una pieza `role="slider"`.
function pzArrastra(svg, knob, { mueve, tecla, suelta = () => {} }) {
  const punto = e => new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  let id = null;
  knob.addEventListener('pointerdown', e => {
    if (id !== null || e.button) return;
    id = e.pointerId; knob.setPointerCapture(id); knob.classList.add('held'); mueve(punto(e));
  });
  knob.addEventListener('touchstart', e => e.preventDefault(), { passive: false });   // el dedo arrastra, no desplaza
  knob.addEventListener('pointermove', e => { if (e.pointerId === id) mueve(punto(e)); });
  const fin = e => { if (e.pointerId !== id) return; id = null; knob.classList.remove('held'); suelta(); };
  knob.addEventListener('pointerup', fin); knob.addEventListener('pointercancel', fin);
  knob.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (d) { e.preventDefault(); tecla(d); }
  });
}
function pzRuedaViva(el, quieto) {
  const st = el.querySelector('.pz-stage'), svg = st.querySelector('svg'), $q = c => st.querySelector(c), knob = $q('.pz-knob');
  const [lee, dice, go] = [$q('.pz-lee'), $q('.pz-reto-t'), $q('.pz-reto-go')];
  let deg = 48, g, hecho = false, tocado = 0, visible = true, antes = 0, raf = 0;
  const pinta = () => {
    const t = deg * Math.PI / 180, x = g.cx + g.r * Math.cos(t), y = g.cy - g.r * Math.sin(t), n = Math.round(deg) % 360;
    const set = (c, k, v) => $q(c).setAttribute(k, v);
    set('.pz-onda', 'd', pzOnda(deg, g));
    set('.pz-tri', 'd', `M${g.cx} ${g.cy}L${x} ${y}V${g.cy}Z`);
    set('.pz-alto', 'd', `M${x} ${g.cy}V${y}`);
    set('.pz-guia', 'd', `M${x} ${y}H${g.x0}`);
    const q = g.r * .26;
    set('.pz-arco', 'd', `M${g.cx + q} ${g.cy}A${q} ${q} 0 ${deg > 180 ? 1 : 0} 0 ${g.cx + q * Math.cos(t)} ${g.cy - q * Math.sin(t)}`);
    set('.pz-fin', 'cx', g.x0); set('.pz-fin', 'cy', y);
    knob.setAttribute('transform', `translate(${x} ${y})`);
    knob.setAttribute('aria-valuenow', n);
    const v = Math.sin(t);
    knob.setAttribute('aria-valuetext', `${n} grados, altura ${v.toFixed(2)}`);
    lee.innerHTML = `<i>sen</i> <b>${n}°</b> = <b>${(Math.abs(v) < .005 ? 0 : v).toFixed(2).replace('-', '−')}</b>`;
  };
  const mide = () => {
    const W = st.clientWidth || 1440, H = svg.clientHeight || 380, ancho = W >= 760;
    const r = ancho ? Math.min(H * .41, 165) : Math.min(W * .22, H * .4);
    const gut = ancho ? Math.max(32, (W - 1200) / 2) : 16, cx = gut + r + 14;
    g = { r, cx, cy: H / 2, x0: cx + r + (ancho ? 90 : 34), x1: W + 8, largo: ancho ? 2.6 : 1.5 };
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const aro = $q('.pz-aro');
    aro.setAttribute('cx', cx); aro.setAttribute('cy', g.cy); aro.setAttribute('r', r);
    $q('.pz-eje').setAttribute('d', `M0 ${g.cy}H${W}M${cx} ${g.cy - r - 22}V${g.cy + r + 22}`);
    $q('.pz-meta').setAttribute('d', `M${cx - r - 14} ${g.cy - r / 2}H${W}`);
    $q('.pz-meta-t').setAttribute('x', W - (ancho ? 32 : 14)); $q('.pz-meta-t').setAttribute('y', g.cy - r / 2 - 8);
    pinta();
  };
  const revisa = () => {
    const a = pzReto(deg);
    if (a === null) return;
    deg = a; pinta(); hecho = true; st.classList.add('ok');
    dice.innerHTML = `<b>¡Eso es!</b> sen ${a}° = ½. Así se siente una lección.`;
    go.hidden = false;
  };
  const toca = () => {   // se vuelve a mover después de acertar: el reto queda abierto otra vez
    tocado = performance.now(); st.classList.add('tocado');
    if (hecho) { hecho = false; st.classList.remove('ok'); dice.innerHTML = PZ_RETO; go.hidden = true; }
  };
  pzArrastra(svg, knob, {
    mueve: p => { toca(); deg = pzAngulo(p.x - g.cx, p.y - g.cy); pinta(); },
    tecla: d => { toca(); deg = (Math.round(deg / 5) * 5 + 5 * d + 360) % 360; pinta(); revisa(); },
    suelta: () => { tocado = performance.now(); revisa(); },
  });
  mide();
  const ro = new ResizeObserver(() => (st.isConnected ? mide() : ro.disconnect())); ro.observe(st);
  if (quieto) return;
  // Gira sola hasta que alguien la toca; después espera, y tras acertar se queda quieta.
  const paso = t => {
    raf = 0;
    if (!st.isConnected || !visible) return;
    const dt = Math.min(50, t - antes || 0); antes = t;
    if (!knob.classList.contains('held') && !hecho && !knob.matches(':focus-visible') && t - tocado > 6000) { deg = (deg + dt * .022) % 360; pinta(); }
    raf = requestAnimationFrame(paso);
  };
  tocado = -1e9; raf = requestAnimationFrame(paso);
  new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(paso); }, { root: el }).observe(st);
}
// ---- lo que responde al puntero (solo ratón; con «reducir movimiento», nada) ----
function pzPuntero(el) {
  const cosas = [];   // { paso(dt) → ¿sigue en marcha? }
  let raf = 0, antes = 0;
  const bucle = t => {
    raf = 0;
    if (!el.isConnected) return;
    const dt = antes ? (t - antes) / 1000 : .016; antes = t;
    if (cosas.map(c => c.paso(dt)).some(Boolean)) raf = requestAnimationFrame(bucle); else antes = 0;
  };
  const anda = () => { if (!raf) raf = requestAnimationFrame(bucle); };
  // Dos números que persiguen su meta con un resorte y se pintan.
  const sigue = (pinta, k, c) => {
    const s = { x: 0, y: 0, vx: 0, vy: 0, mx: 0, my: 0, paso(dt) {
      [s.x, s.vx] = pzResorte(s.x, s.vx, s.mx, dt, k, c); [s.y, s.vy] = pzResorte(s.y, s.vy, s.my, dt, k, c);
      const vivo = Math.abs(s.mx - s.x) + Math.abs(s.my - s.y) + (Math.abs(s.vx) + Math.abs(s.vy)) * .1 > .02;
      if (!vivo) { s.x = s.mx; s.y = s.my; s.vx = s.vy = 0; }
      pinta(s.x, s.y); return vivo;
    } };
    cosas.push(s); return s;
  };
  const rel = (e, caja) => { const r = caja.getBoundingClientRect(); return [(e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5, r]; };
  // Botones principales: se dejan atraer un poco.
  el.querySelectorAll('.pz-main .btn.brand').forEach(b => {
    const s = sigue((x, y) => { b.style.translate = x || y ? `${x.toFixed(2)}px ${y.toFixed(2)}px` : ''; }, 220, 18);
    b.addEventListener('pointermove', e => { const [x, y] = rel(e, b); s.mx = x * 14; s.my = y * 10; anda(); });
    b.addEventListener('pointerleave', () => { s.mx = s.my = 0; anda(); });
  });
  // Piezas que se inclinan hacia el puntero en 3D (libros, mancuerna, personaje).
  el.querySelectorAll('[data-inclina]').forEach(d => {
    const g = +d.dataset.inclina, zona = d.closest('.pz-demo, .pz-final, .pz-libros') || d;
    const s = sigue((x, y) => { d.style.setProperty('--rx', `${y.toFixed(2)}deg`); d.style.setProperty('--ry', `${x.toFixed(2)}deg`); }, 120, 16);
    zona.addEventListener('pointermove', e => { const [x, y] = rel(e, zona); s.mx = x * 2 * g; s.my = -y * 2 * g; anda(); });
    zona.addEventListener('pointerleave', () => { s.mx = s.my = 0; anda(); });
  });
  // Luz que sigue al puntero en las tarjetas.
  el.querySelectorAll('.pz-demo, .pz-panel, .pz-ruta').forEach(d => {
    d.classList.add('pz-luz');
    d.addEventListener('pointermove', e => { const [x, y] = rel(e, d); d.style.setProperty('--mx', `${((x + .5) * 100).toFixed(1)}%`); d.style.setProperty('--my', `${((y + .5) * 100).toFixed(1)}%`); });
  });
}
// Campo de flechas de la portada: cada una apunta al puntero (o al punto de la rueda si no hay ratón cerca).
function pzCampoVivo(el, quieto) {
  const hero = el.querySelector('.pz-hero'), cv = hero.querySelector('.pz-campo'), cx = cv.getContext('2d'), fin = el.querySelector('.pz-fin');
  if (!cx) return;
  let W = 0, H = 0, dpr = 1, raf = 0, t0 = 0, raton = null, fuerza = 0, col = ['#fff', '#fff'];
  const p = { x: 0, y: 0, vx: 0, vy: 0 };
  const bola = () => { const a = fin.getBoundingClientRect(), b = cv.getBoundingClientRect(); return [a.left + a.width / 2 - b.left, a.top + a.height / 2 - b.top]; };
  const mide = () => {
    W = cv.clientWidth; H = cv.clientHeight; dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; const cs = getComputedStyle(el); col = [cs.getPropertyValue('--brand').trim(), cs.getPropertyValue('--mute').trim()];
    pinta();
  };
  const pinta = () => {
    const paso = W < 700 ? 34 : 44, R = W < 700 ? 150 : 300;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, H); cx.lineCap = 'round'; cx.lineWidth = 1.6;
    for (let y = paso / 2; y < H; y += paso) for (let x = paso / 2 + (W % paso) / 2; x < W; x += paso) {
      const dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy) || 1, cerca = Math.max(0, 1 - d / R) * fuerza;
      const l = 2 + 9 * cerca, ux = dx / d * l, uy = dy / d * l;
      cx.globalAlpha = .12 + .5 * cerca * cerca; cx.strokeStyle = cerca > .04 ? col[0] : col[1];
      cx.beginPath(); cx.moveTo(x - ux, y - uy); cx.lineTo(x + ux, y + uy); cx.stroke();
    }
  };
  const bucle = t => {
    raf = 0;
    if (!el.isConnected) return;
    const dt = t0 ? (t - t0) / 1000 : .016; t0 = t;
    const [mx, my] = raton || [p.x, p.y], meta = raton ? 1 : 0;
    [p.x, p.vx] = pzResorte(p.x, p.vx, mx, dt, 130, 20); [p.y, p.vy] = pzResorte(p.y, p.vy, my, dt, 130, 20);
    fuerza += (meta - fuerza) * Math.min(1, dt * 7);
    pinta();
    if (Math.abs(mx - p.x) + Math.abs(my - p.y) > .3 || Math.abs(meta - fuerza) > .01) raf = requestAnimationFrame(bucle); else t0 = 0;
  };
  const ro = new ResizeObserver(() => (cv.isConnected ? mide() : ro.disconnect())); ro.observe(hero);
  const mo = new MutationObserver(() => (cv.isConnected ? mide() : mo.disconnect())); mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  [p.x, p.y] = bola(); mide();
  if (quieto) return;
  hero.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const r = cv.getBoundingClientRect();
    raton = [e.clientX - r.left, e.clientY - r.top];
    if (fuerza < .02) { [p.x, p.y] = raton; p.vx = p.vy = 0; }
    if (!raf) raf = requestAnimationFrame(bucle);
  });
  hero.addEventListener('pointerleave', () => { raton = null; if (!raf) raf = requestAnimationFrame(bucle); });
}
// El camino: el punto sigue al puntero (o al dedo) y se queda en la etapa elegida.
function pzCaminoVivo(el, quieto) {
  const ruta = el.querySelector('.pz-ruta'), map = ruta.querySelector('.pz-ruta-map'), yo = ruta.querySelector('.pz-ruta-yo'), luz = ruta.querySelector('.pz-ruta-l');
  const tabs = [...ruta.querySelectorAll('[role="tab"]')], eps = [...ruta.querySelectorAll('.pz-ep')];
  let x = PZ_PARADAS[1], v = 0, meta = x, sel = 1, raf = 0, t0 = 0;
  const pinta = () => {
    yo.style.left = `${x * 100}%`; yo.style.top = `${pzCaminoY(x) * 100}%`;
    luz.style.clipPath = `inset(0 ${(1 - x) * 100}% 0 0)`;
  };
  const bucle = t => {
    raf = 0;
    if (!el.isConnected) return;
    const dt = t0 ? (t - t0) / 1000 : .016; t0 = t;
    [x, v] = pzResorte(x, v, meta, dt, 150, 21);
    if (Math.abs(meta - x) < .0005 && Math.abs(v) < .002) { x = meta; v = t0 = 0; } else raf = requestAnimationFrame(bucle);
    pinta();
  };
  const va = m => { meta = Math.max(.02, Math.min(.98, m)); if (quieto) { x = meta; pinta(); } else if (!raf) raf = requestAnimationFrame(bucle); };
  const elige = (i, foco) => {
    if (i !== sel) {
      sel = i;
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      eps.forEach((d, k) => { d.classList.toggle('on', k === i); d.inert = k !== i; });
    }
    if (foco) tabs[i].focus();
  };
  const mueve = e => { const r = map.getBoundingClientRect(), m = (e.clientX - r.left) / r.width; va(m); elige(pzEtapaEn(m)); };
  // con el dedo, solo tras un arrastre de lado: empezar a bajar la página no cambia la etapa
  let x0 = 0, lado = false;
  map.addEventListener('pointerdown', e => { x0 = e.clientX; lado = e.pointerType === 'mouse'; });
  map.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || (lado = lado || Math.abs(e.clientX - x0) > 10)) mueve(e); });
  ['pointerleave', 'pointercancel', 'pointerup'].forEach(n => map.addEventListener(n, () => va(PZ_PARADAS[sel])));
  tabs.forEach((b, i) => {
    b.onclick = () => { elige(i); va(PZ_PARADAS[i]); };
    b.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault(); const j = (i + d + tabs.length) % tabs.length; elige(j, true); va(PZ_PARADAS[j]);
    };
  });
  pinta();
}
// «¿Te ha pasado?»: la frase que se toca (o se señala) muestra cómo ayuda Zuka.
function pzQuejasVivas(el, raton) {
  const lis = [...el.querySelectorAll('.pz-quejas li')];
  const abre = i => lis.forEach((li, k) => { li.classList.toggle('on', k === i); li.firstElementChild.setAttribute('aria-expanded', k === i); });
  lis.forEach((li, i) => {
    li.firstElementChild.onclick = () => abre(!esEscritorio() && li.classList.contains('on') ? -1 : i);   // en el celular, otro toque la cierra
    if (raton) li.firstElementChild.addEventListener('pointerenter', () => { if (esEscritorio()) abre(i); });
  });
}
function pzAreaViva(el) {
  const svg = el.querySelector('.pz-area'), knob = svg.querySelector('.pz-knob'), out = el.querySelector('.pz-cuenta-area');
  const L = 232, X = 52, Y = 44;
  let a = 7;
  const pinta = () => {
    const m = pzArea(a), k = L / PZ_LADO, w = a * k - 2, v = m.b * k - 2, x2 = X + a * k + 2, y2 = Y + a * k + 2;
    const rect = (r, x, y, ww, h) => Object.entries({ x, y, width: ww, height: h, rx: 6 }).forEach(([n, z]) => r.setAttribute(n, z));
    const txt = (c, x, y, t, vis = true) => { const e = svg.querySelector(c); e.setAttribute('x', x); e.setAttribute('y', y + 6); e.textContent = t; e.style.opacity = vis ? 1 : 0; };
    rect(svg.querySelector('.pz-aa'), X, Y, w, w); rect(svg.querySelector('.pz-ab'), x2, Y, v, w);
    rect(svg.querySelector('.pz-ba'), X, y2, w, v); rect(svg.querySelector('.pz-bb'), x2, y2, v, v);
    txt('.pz-t-aa', X + w / 2, Y + w / 2, m.aa, a > 1); txt('.pz-t-ab', x2 + v / 2, Y + w / 2, m.ab, m.b > 1 && a > 1);
    txt('.pz-t-ba', X + w / 2, y2 + v / 2, m.ab, m.b > 1 && a > 1); txt('.pz-t-bb', x2 + v / 2, y2 + v / 2, m.bb, m.b > 1);
    txt('.pz-l-a', X + w / 2, 296 - 8, `a = ${a}`); txt('.pz-l-b', x2 + v / 2, 296 - 8, `b = ${m.b}`);
    svg.querySelector('.pz-corte').setAttribute('d', `M${X + a * k} ${Y - 14}V${Y + L}M${X} ${Y + a * k}H${X + L}`);
    knob.setAttribute('transform', `translate(${X + a * k} ${Y - 18})`);
    knob.setAttribute('aria-valuenow', a); knob.setAttribute('aria-valuetext', `a vale ${a}, b vale ${m.b}`);
    out.innerHTML = `(${a} + ${m.b})² = <b class="a">${m.aa}</b> + 2 · <b class="m">${m.ab}</b> + <b class="b">${m.bb}</b> = ${PZ_LADO ** 2}`;
  };
  const pon = v => { const n = Math.max(1, Math.min(PZ_LADO - 1, v)); if (n !== a) { a = n; pinta(); } };
  pzArrastra(svg, knob, { mueve: p => pon(Math.round((p.x - X) / (L / PZ_LADO))), tecla: d => pon(a + d) });
  pinta();
}
function pzPalancaViva(el) {
  const svg = el.querySelector('.pz-pal'), knob = svg.querySelector('.pz-knob'), out = el.querySelector('.pz-cuenta-pal');
  let d = 4;
  const pinta = () => {
    const m = pzPalanca(d);
    svg.querySelector('.pz-viga').style.transform = `rotate(${m.giro}deg)`;
    knob.style.transform = `translate(${180 + d * 36}px, 144px)`;
    knob.setAttribute('aria-valuenow', d); knob.setAttribute('aria-valuetext', `${d} pasos${m.ok ? ', en equilibrio' : ''}`);
    svg.classList.toggle('ok', m.ok);
    out.innerHTML = `<b class="b">2 × 3</b> ${m.ok ? '=' : m.der > m.izq ? '&lt;' : '&gt;'} <b class="a">3 × ${d}</b><span>${m.ok ? 'En equilibrio' : m.der > m.izq ? 'Pesa más la derecha' : 'Pesa más la izquierda'}</span>`;
  };
  const pon = v => { const n = Math.max(1, Math.min(4, v)); if (n !== d) { d = n; pinta(); } };
  pzArrastra(svg, knob, { mueve: p => pon(Math.round((p.x - 180) / 36)), tecla: k => pon(d + k) });
  pinta();
}

// ---- en la página ----
let pzDesde = false;   // la pantalla de entrada se abrió desde aquí: muestra «Volver» (js/cuenta.js)
function presentacionPide() {
  if (claveAlAbrir()) return true;   // se vuelve del correo de la contraseña (js/clave.js)
  const ok = presentacionToca({ standalone: isStandalone(), user: Cuenta.user, query: location.search });
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
// Llegó la lista de cursos publicados (js/cuenta.js): se redibuja sin perder el sitio.
function presentacionRefresca() {
  const el = document.getElementById('landing');
  if (!el || el.inert) return;
  const y = el.scrollTop; presentacionAbrir(); el.scrollTop = y;
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
  el.innerHTML = presentacionHTML(cursosVisibles(), { worlds: typeof WORLDS === 'undefined' ? {} : WORLDS, install: presentacionInstall(), todos: COURSES });
  el.scrollTop = 0;
  pzInerte(true);
  el.querySelector('h1').tabIndex = -1; el.querySelector('h1').focus({ preventScroll: true });
  el.querySelectorAll('[data-pz]').forEach(b => b.onclick = () => {
    const m = b.dataset.pz;
    if (m === 'install') return promptInstall().then(() => b.remove());
    const wa = m === 'prueba' && waLink(Cuenta.ajustes.whatsapp, WA.prueba());
    if (wa) { window.open(wa, '_blank', 'noopener'); return; }
    // En el computador la entrada es una ventana sobre la presentación (css/escritorio.css); en el celular la reemplaza.
    const encima = esEscritorio();
    if (!encima) presentacionCerrar();
    pzDesde = true; authScreen();
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
  // Al bajar, la barra se asienta; las secciones se alcanzan sin tocar la dirección (#… es de Supabase).
  const bar = el.querySelector('.pz-bar'), quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.onscroll = () => { bar.classList.toggle('lit', el.scrollTop > 8); bar.classList.toggle('on', el.scrollTop > 320); };
  bar.classList.remove('lit', 'on');
  el.querySelectorAll('.pz-nav a').forEach(x => x.onclick = e => {
    e.preventDefault();
    const sec = el.querySelector(x.getAttribute('href'));
    sec.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' });
    const h = sec.querySelector('h2'); h.tabIndex = -1; h.focus({ preventScroll: true });
  });
  pzRuedaViva(el, quieto); pzAreaViva(el); pzPalancaViva(el); pzCaminoVivo(el, quieto); pzCampoVivo(el, quieto);
  const raton = matchMedia('(hover: hover) and (pointer: fine)').matches;
  pzQuejasVivas(el, raton);
  if (raton && !quieto) pzPuntero(el);
  // Cada bloque aparece suave al entrar en pantalla.
  const rev = el.querySelectorAll('.pz-rev');
  if (!('IntersectionObserver' in window) || quieto) rev.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { root: el, threshold: .12 });
    rev.forEach(r => io.observe(r));
  }
}
