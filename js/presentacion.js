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
      <button class="pz-reto-go" type="button" data-pz="registro" hidden>Crea tu cuenta gratis y sigue</button>
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
    <div class="pz-horas">${['8:00 a. m.', '10:00 a. m.', '4:00 p. m.'].map((h, i) => `<span${i === 2 ? ' class="on"' : ''}>${h}</span>`).join('')}</div></div>`;
const PZ_MUNDOS = 12;   // mundos a la vista por curso; los demás se cuentan

function presentacionHTML(cursos, { worlds = {}, install = '' } = {}) {
  const logo = zukaWord();
  const mascot = pose => (typeof mascotSVG === 'function' ? mascotSVG(pose) : '');
  const art = c => (typeof courseArt === 'function' ? courseArt(c, 'lg') : `<span class="pz-dot" style="background:${c.color}"></span>`);
  const empieza = (cls = '') => `<button class="btn main brand ${cls}" type="button" data-pz="registro">Empieza gratis</button>`;
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const mundo = u => {
    const w = worlds[u.world] || {};
    return `<li>${w.art ? `<span class="pz-lam world-art" aria-hidden="true">${w.art}</span>` : ''}<span>${pzEsc(w.name || u.title)}</span></li>`;
  };
  const gymC = cursos[0];
  const gymArt = typeof GYM_3D === 'string' && gymC
    ? `<span class="pz-gymart" style="${typeof gymFabColors === 'function' ? gymFabColors(gymC) : `--c:${gymC.color}`}">${GYM_3D}</span>` : '';
  const plates = n => (typeof gymPlates === 'function' ? gymPlates(n) : '');
  const demo = (cls, h, p, fig, pie = '') => `<article class="pz-demo ${cls} pz-rev"><div class="pz-demo-txt"><h3>${h}</h3><p>${p}</p></div>
      <div class="pz-demo-fig">${fig}</div>${pie}</article>`;
  return `<header class="pz-bar"><div class="pz-in"><span class="pz-logo">${logo}</span>
      <nav class="pz-nav" aria-label="Secciones"><a href="#pz-como">Cómo se aprende</a><a href="#pz-cursos">Cursos</a><a href="#pz-dudas">Preguntas</a></nav>
      <span class="pz-bar-acts"><button class="btn ghost sm" type="button" data-pz="login">Iniciar sesión</button>
      <button class="btn brand sm pz-bar-go" type="button" data-pz="registro">Empieza gratis</button></span></div></header>
    <main class="pz-main">
    <section class="pz-hero">
      <div class="pz-hero-in pz-in">
        <h1>Matemáticas que se <em>entienden</em>, <br class="pz-br">ejercicios que se <em class="b">juegan</em></h1>
        <div class="pz-hero-side">
          <p class="pz-lead">Aprende moviendo las ideas con tus manos: álgebra, trigonometría y la preparación para entrar a la universidad.</p>
          <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz="login">Ya tengo cuenta</button></div>
        </div>
      </div>
      ${pzRueda()}
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
        ${demo('pz-d-tut', 'Tutorías en vivo', 'Separa una asesoría virtual: eliges la materia, los temas, el día y la hora. Incluidas en el plan Pro.', PZ_TUTOR)}
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
        <details open><summary>¿Qué puedo hacer gratis?</summary><p>La primera lección de cada curso y los clips de curiosidades. Para seguir hay planes; los ves en tu cuenta antes de pagar nada.</p></details>
        <details><summary>¿Necesito saber mucho para empezar?</summary><p>No. Los cursos empiezan desde cero, y casi todos los ejercicios traen una pista.</p></details>
        <details><summary>¿Sirve en el celular y en el computador?</summary><p>Sí. Funciona en el navegador de los dos y también se instala como una app, sin pasar por la tienda.</p>${install}</details>
        <details><summary>¿Puedo mirarla sin crear una cuenta?</summary><p>Sí. Entras y pruebas las lecciones gratis; con una cuenta, además, tu avance queda guardado.</p>
          <button class="link-btn" type="button" data-pz="guest">Explorar sin cuenta</button></details>
      </div>
    </section>
    <section class="pz-final pz-rev"><div class="pz-final-art">${mascot('cheer')}</div>
      <h2>Tu mente, más fuerte cada día</h2>${empieza()}</section>
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
    if (m === 'install') return promptInstall().then(() => b.remove());
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
  pzRuedaViva(el, quieto); pzAreaViva(el); pzPalancaViva(el);
  // Cada bloque aparece suave al entrar en pantalla.
  const rev = el.querySelectorAll('.pz-rev');
  if (!('IntersectionObserver' in window) || quieto) rev.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { root: el, threshold: .12 });
    rev.forEach(r => io.observe(r));
  }
}
