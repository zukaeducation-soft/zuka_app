// Tú (spec 2026-11-25-tu): carné que se voltea, nivel, meta que se arrastra, mapa de actividad y logros. Lo arma renderProfile
// (js/app.js); aquí, las cuentas puras (tests/perfil.test.js) y cada pieza.

// ---------- cuentas puras ----------
// XP para llegar al nivel n: 0, 50, 150, 300, 500…
const pfXpDe = n => 25 * n * (n - 1);
const PF_TITULOS = ['Aprendiz', 'Explorador', 'Estratega', 'Analista', 'Maestro'];   // cambia cada tres niveles
function pfNivel(xp) {
  let n = 1; while (pfXpDe(n + 1) <= xp) n++;
  const a = pfXpDe(n), b = pfXpDe(n + 1);
  return { n, titulo: PF_TITULOS[Math.min(PF_TITULOS.length - 1, Math.floor((n - 1) / 3))], p: (xp - a) / (b - a), falta: b - xp };
}
// Últimas `semanas` semanas (lunes a domingo): [{ key, xp, hoy, futuro }]. `dias`: XP por día; `activos`: días con actividad sin XP anotado.
function pfMapa(dias, activos, now, semanas = 18) {
  const lead = (now.getDay() + 6) % 7, base = lead + (semanas - 1) * 7;
  return Array.from({ length: semanas * 7 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - base + i), key = dayKey(d);
    return { key, d, xp: (dias || {})[key] || 0, lit: !!(dias || {})[key] || activos.has(key), hoy: i === base, futuro: i > base };
  });
}
// De 0 a 4 según la meta del día.
const pfFuerza = (x, meta) => (!x.lit ? 0 : x.xp >= meta * 2 ? 4 : x.xp >= meta ? 3 : x.xp >= meta / 2 ? 2 : 1);
const PF_METAS = [10, 20, 30, 50];
// Logros: cada uno con su avance. x: { hechas, mundos, racha, xp, retos, estrellas, examenes, respondidas, aciertos, clases }.
const PF_LOGROS = [
  ['primera', 'check', 'Primer paso', 'Termina tu primera lección', 1, x => x.hechas], ['diez', 'book', 'En marcha', 'Termina 10 lecciones', 10, x => x.hechas], ['cincuenta', 'book', 'Imparable', 'Termina 50 lecciones', 50, x => x.hechas],
  ['mundo', 'star', 'Mundo completo', 'Termina todas las lecciones de un mundo', 1, x => x.mundos], ['cinco', 'star', 'Cinco mundos', 'Completa 5 mundos', 5, x => x.mundos],
  ['racha3', 'flame', 'Tres seguidos', 'Estudia 3 días seguidos', 3, x => x.racha], ['racha7', 'flame', 'Semana entera', 'Estudia 7 días seguidos', 7, x => x.racha], ['racha30', 'flame', 'Mes de hierro', 'Estudia 30 días seguidos', 30, x => x.racha],
  ['xp500', 'bolt', '500 XP', 'Junta 500 de experiencia', 500, x => x.xp], ['xp2000', 'bolt', '2.000 XP', 'Junta 2.000 de experiencia', 2000, x => x.xp],
  ['reto', 'gym', 'Primer reto', 'Supera un reto del gimnasio', 1, x => x.retos], ['estrellas', 'gym', 'Treinta estrellas', 'Gana 30 estrellas en el gimnasio', 30, x => x.estrellas],
  ['examen', 'trophy', 'A prueba', 'Saca 60 % o más en una evaluación', 1, x => x.examenes], ['punteria', 'target', 'Puntería', 'Responde bien 100 ejercicios', 100, x => x.aciertos],
];
const pfLogros = x => PF_LOGROS.map(([id, icono, t, p, meta, f]) => { const v = Math.max(0, f(x) || 0); return { id, icono, t, p, meta, v: Math.min(meta, v), ok: v >= meta }; });

// ---------- piezas ----------
const PF_COLORES = ['#6fd3ff', '#a3e635', '#b18cff', '#ff9d8c', '#ffd257', '#5eead4', '#f472b6', '#8fa8ff'];
const PF_POSES = [['think', 'Pensando'], ['cheer', 'Celebrando'], ['letra', 'Tu inicial']];
// Llega de la nube: solo se aceptan los colores y figuras de la lista.
const pfCarne = (k = S.carne || {}) => ({ pose: PF_POSES.some(p => p[0] === k.pose) ? k.pose : 'think', color: PF_COLORES.includes(k.color) ? k.color : PF_COLORES[0] });
// Parte del plan que queda (aro de «Mi plan»). x: acceso { desde, hasta }; a: accesoCurso.
const pfQueda = (x, a) => { if (a.dias === 0) return 0; if (!x.hasta) return 1; const t = (new Date(x.hasta) - new Date(x.desde)) / 86400000; return t > 0 ? Math.min(1, a.dias / t) : 0; };
// Antes de repintar: guarda foco, nombre a medias y desplazamientos; devuelve lo que los repone. Si no se veía Tú o cambió la cuenta, de cero.
function pfGuarda() {
  const uid = Cuenta.user?.id || '', f = document.activeElement, dentro = $('.pf', view) && view.contains(f);
  if (!$('.pf', view) || pfVer.uid !== uid) { pfVer = { atras: false, edita: false, dia: null, uid }; return () => {}; }
  const y = view.scrollTop, x = $('.pm-mapa', view).scrollLeft, nom = $('.name-input', view), en = dentro && f === nom, v = nom.value, cur = en ? [nom.selectionStart, nom.selectionEnd] : null;
  const sel = !dentro || en ? '' : ['.pm-riel', '.pm-mapa', '[data-settings]'].find(s => f.matches(s)) || [...f.attributes].filter(t => t.name.startsWith('data-') && t.value).map(t => `[${t.name}="${CSS.escape(t.value)}"]`).join('');
  const vueltos = [...view.querySelectorAll('[data-logro][aria-expanded="true"]')].map(b => b.dataset.logro);
  return () => {
    vueltos.forEach(id => $(`[data-logro="${id}"]`, view)?.setAttribute('aria-expanded', 'true'));
    $('.pm-mapa', view).scrollLeft = x; view.scrollTop = y;
    if (en) { const n = $('.name-input', view); n.value = v; n.focus({ preventScroll: true }); n.setSelectionRange(...cur); } else if (sel) $(sel, view)?.focus({ preventScroll: true });
  };
}
let pfVer = { atras: false, edita: false, dia: null, uid: null };   // lo que se mira; no se guarda
const pfCara = k => (k.pose === 'letra' ? `<span class="cn-letra">${esc(([...(S.name || 'Z')][0]).toUpperCase())}</span>` : mascotSVG(k.pose));
function pfDatos() {
  const all = cursosConAcceso().flatMap(lessonsOf), gym = Object.values(S.gym || {});
  return { total: all.length, hechas: all.filter(isDone).length, mundos: cursosConAcceso().flatMap(c => c.units).filter(u => u.lessons.length && u.lessons.every(isDone)).length, racha: Math.max(S.maxStreak || 0, streakNow()), xp: S.xp,
    retos: Object.keys(S.gym || {}).filter(id => !id.startsWith('cal-') && S.gym[id].best > 0).length, estrellas: gym.reduce((t, g) => t + (g.best || 0), 0), examenes: Object.values(S.exams || {}).filter(e => e.best >= 60).length, respondidas: S.answered, aciertos: S.correct };
}
function pfCarneHTML() {
  const k = pfCarne(), v = pfNivel(S.xp), cod = typeof Cuenta !== 'undefined' && Cuenta.codigo, desde = typeof Cuenta !== 'undefined' && Cuenta.perfil?.creado_en;
  return `<section class="cn-zona${pfVer.atras ? ' atras' : ''}${pfVer.edita ? ' edita' : ''}" style="--c:${esc(k.color)}"><div class="cn" data-inclina><div class="cn-in">
      <div class="cn-f cn-frente"><span class="cn-marca" aria-hidden="true">ZUKA</span><div class="cn-foto">${pfCara(k)}</div><div class="cn-d"><label class="cn-nom"><span class="hm-sr">Tu nombre</span><input class="name-input" value="${esc(S.name)}" placeholder="Escribe tu nombre" maxlength="24" autocomplete="given-name"></label>
        <p class="cn-niv"><b>Nivel ${v.n}</b> ${v.titulo}</p><span class="cn-barra" role="img" aria-label="Te faltan ${v.falta} XP para el nivel ${v.n + 1}"><i style="width:${(v.p * 100).toFixed(1)}%"></i></span><p class="cn-xp">${S.xp} XP · faltan ${v.falta}</p></div></div>
      <div class="cn-f cn-dorso"><span class="cn-marca" aria-hidden="true">ZUKA</span>${cod ? `<p>Mi código de acceso</p><button class="cn-cod" type="button" data-acct="copia" aria-label="Copiar mi código ${muestraCodigo(cod)}"><b>${muestraCodigo(cod)}</b><span>Copiar</span></button><p class="cn-nota">Con este código entras siempre y conservas tu avance.</p>` : '<p>Tu carné de Zuka</p><p class="cn-nota">Cuando tengas un código de acceso, lo verás aquí.</p>'}${desde ? `<p class="cn-nota">En Zuka desde el ${fechaCorta(desde)}</p>` : ''}</div></div></div>
    <div class="cn-acts"><button class="cn-b" type="button" data-cn="voltea">${ICON.right}<span>${pfVer.atras ? 'Ver el frente' : cod ? 'Ver mi código' : 'Voltear'}</span></button><button class="cn-b" type="button" data-cn="edita" aria-expanded="${pfVer.edita}">${ICON.star}<span>Personalizar</span></button><button class="cn-b prof-gear" type="button" data-settings aria-label="Ajustes">${ICON.gear}<span>Ajustes</span></button></div>
    ${pfVer.edita ? `<div class="cn-edita"><div class="cn-op" role="group" aria-label="Figura">${PF_POSES.map(([p, t]) => `<button type="button" data-pose="${p}" aria-pressed="${p === k.pose}" aria-label="${t}">${pfCara({ pose: p })}</button>`).join('')}</div>
      <div class="cn-op" role="group" aria-label="Color">${PF_COLORES.map((c, i) => `<button type="button" class="col" data-color="${c}" style="--k:${c}" aria-pressed="${c === k.color}" aria-label="Color ${i + 1}"></button>`).join('')}</div></div>` : ''}</section>`;
}
function pfMetaHTML() {
  const hoy = todayXP(), i = Math.max(0, PF_METAS.indexOf(S.goal)), p = PF_METAS.includes(S.goal) ? i / (PF_METAS.length - 1) : 0;
  return `<section class="pf-c pf-meta" style="--p:${p}"><div class="pf-cab"><h2>Meta diaria</h2><p>${hoy} de ${S.goal} XP hoy${hoy >= S.goal ? ' · <b>¡cumplida!</b>' : ''}</p></div>
    <div class="pm-hoy">${aroHTML(hoy / S.goal, hoy >= S.goal ? ICON.check : ICON.bolt)}<p class="pm-n"><b>${S.goal}</b> XP <span>más o menos ${Math.ceil(S.goal / 10)} ${Math.ceil(S.goal / 10) === 1 ? 'lección' : 'lecciones'} al día</span></p></div>
    <div class="pm-riel" role="slider" tabindex="0" aria-label="Meta diaria" aria-valuemin="${PF_METAS[0]}" aria-valuemax="${PF_METAS[PF_METAS.length - 1]}" aria-valuenow="${S.goal}" aria-valuetext="${S.goal} XP al día"><span class="pm-l"></span>${PF_METAS.map((g, k) => `<i style="left:${k / (PF_METAS.length - 1) * 100}%"></i>`).join('')}<span class="pm-k"></span></div>
    <div class="pm-op" aria-hidden="true">${['Suave', 'Normal', 'Firme', 'Intensa'].map((t, k) => `<button type="button" style="left:${k / 3 * 100}%" tabindex="-1" data-meta="${PF_METAS[k]}">${t}</button>`).join('')}</div></section>`;
}
function pfMapaHTML() {
  const now = new Date(), m = pfMapa(S.days, dkActive(now), now), n = streakNow(), dias = m.filter(x => x.lit).length;
  const meses = Array.from({ length: 18 }, (_, s) => { const d = m[s * 7].d, a = s ? m[(s - 1) * 7].d : null; return !a || a.getMonth() !== d.getMonth() ? d.toLocaleDateString('es', { month: 'short' }).replace('.', '') : ''; });
  return `<section class="pf-c pf-mapa"><div class="pf-cab"><h2>Actividad</h2><button class="dk-link pf-mas" type="button" data-dk="streak">Ver el mes</button></div>
    <div class="pm-cifras"><p class="fuego">${ICON.flame}<b>${n}</b> ${n === 1 ? 'día' : 'días'} de racha</p><p>${ICON.trophy}<b>${Math.max(S.maxStreak || 0, n)}</b> la más larga</p><p>${ICON.calendar}<b>${dias}</b> ${dias === 1 ? 'día' : 'días'} en 18 semanas</p></div>
    <div class="pm-mapa" tabindex="0" role="group" aria-label="Actividad por día. Usa las flechas."><div class="pm-meses" aria-hidden="true">${meses.map((t, s) => `<span style="grid-column:${s + 1}">${t}</span>`).join('')}</div><div class="pm-g">${m.map((x, i) => (x.futuro ? '<span class="no"></span>' : `<button type="button" tabindex="-1" data-dia="${i}" class="f${pfFuerza(x, S.goal)}${x.hoy ? ' hoy' : ''}" aria-label="${x.d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}: ${x.lit ? (x.xp ? `${x.xp} XP` : 'con actividad') : 'sin actividad'}"></button>`)).join('')}</div></div>
    <p class="pm-dia" role="status">Toca un día para ver cuánto hiciste.</p></section>`;
}
function pfLogrosHTML() {
  const xs = pfLogros(pfDatos()), ok = xs.filter(x => x.ok).length;
  return `<section class="pf-c pf-logros"><div class="pf-cab"><h2>Logros</h2><p>${ok} de ${xs.length}</p></div><ul class="lg">${xs.map(x => `<li><button type="button" class="lg-b${x.ok ? ' ok' : ''}" data-logro="${x.id}" aria-expanded="false"><span class="lg-in"><span class="lg-f">${aroHTML(x.v / x.meta, ICON[x.icono] || ICON.star)}<b>${x.t}</b><small>${x.ok ? 'Conseguido' : `${x.v} de ${x.meta}`}</small></span><span class="lg-a" aria-hidden="true">${x.p}${x.ok ? '' : `<i>Te ${x.meta - x.v === 1 ? 'falta' : 'faltan'} ${x.meta - x.v}</i>`}</span></span><span class="hm-sr">. ${x.p}</span></button></li>`).join('')}</ul></section>`;
}
function pfCursosHTML() {
  const mine = myCourses();
  return `<section class="pf-c pf-cursos"><div class="pf-cab"><h2>Tus cursos</h2></div>${mine.length ? `<div class="pc-l">${mine.map(c => { const ls = lessonsOf(c), d = ls.filter(isDone).length; return `<button type="button" data-dk-open="${c.id}" style="--c:${c.color}">${aroHTML(d / ls.length, courseArt(c, 'md'))}<span><b>${esc(c.name)}</b><small>${d} de ${ls.length} lecciones</small></span>${ICON.right}</button>`; }).join('')}</div>` : '<p class="pc-no">Aún no has comprado ningún curso.</p><button class="btn ghost" type="button" data-dk="tienda">Ver la tienda</button>'}</section>`;
}
// ---------- vida ----------
function pfBind(root) {
  const zona = () => $('.cn-zona', root), q = s => $(s, root);
  const carne = foco => { const t = document.createElement('template'); t.innerHTML = pfCarneHTML().trim(); const f = t.content.firstElementChild; f.classList.add('quieta'); zona().replaceWith(f); ligaCarne(); if (foco) q(foco)?.focus({ preventScroll: true }); };
  const ligaCarne = () => {
    const z = zona(), nom = $('.name-input', z), dorso = () => { $('.cn-frente', z).inert = pfVer.atras; $('.cn-dorso', z).inert = !pfVer.atras; };
    dorso(); inclina(z); cuentaBind(z);
    nom.oninput = () => { S.name = nom.value.trim(); save(); };
    nom.onchange = () => { S.name = nom.value = nom.value.trim(); save(); if (pfCarne().pose === 'letra') $('.cn-foto', z).innerHTML = pfCara(pfCarne()); };
    nom.onkeydown = e => { if (e.key === 'Enter') nom.blur(); };
    z.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.cn === 'voltea') { pfVer.atras = !pfVer.atras; z.classList.toggle('atras', pfVer.atras); $('span', b).textContent = pfVer.atras ? 'Ver el frente' : Cuenta.codigo ? 'Ver mi código' : 'Voltear'; return dorso(); }
      if (b.dataset.cn === 'edita') { pfVer.edita = !pfVer.edita; return carne('[data-cn="edita"]'); }
      if (b.dataset.pose || b.dataset.color) { S.carne = { ...pfCarne(), ...(b.dataset.pose ? { pose: b.dataset.pose } : { color: b.dataset.color }), at: Date.now() }; save(); carne(b.dataset.pose ? `[data-pose="${b.dataset.pose}"]` : `[data-color="${b.dataset.color}"]`); }
    };
    $('[data-settings]', z).onclick = () => { profileSub = 'settings'; renderProfile(); view.scrollTop = 0; $('[data-back]', view).focus({ preventScroll: true }); };
  };
  ligaCarne();
  // Meta: se arrastra, con flechas o tocando el nombre. La app entera usa S.goal.
  const pon = (g, foco) => { if (g === S.goal) return pintaMeta(); S.goal = g; save(); const t = document.createElement('template'); t.innerHTML = pfMetaHTML().trim(); q('.pf-meta').replaceWith(t.content.firstElementChild); ligaMeta(); if (foco) q('.pm-riel').focus({ preventScroll: true }); pintaMapa(); };
  const pintaMeta = () => q('.pf-meta').style.setProperty('--p', Math.max(0, PF_METAS.indexOf(S.goal)) / (PF_METAS.length - 1));
  const ligaMeta = () => {
    const r = q('.pm-riel'), cerca = e => { const b = r.getBoundingClientRect(), p = Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); return [p, PF_METAS[Math.round(p * (PF_METAS.length - 1))]]; };
    let id = null;
    r.onpointerdown = e => { if (e.button) return; id = e.pointerId; r.setPointerCapture(id); r.classList.add('mano'); r.onpointermove(e); };
    r.onpointermove = e => { if (e.pointerId !== id) return; const [p, g] = cerca(e); q('.pf-meta').style.setProperty('--p', p.toFixed(3)); q('.pm-n b').textContent = g; };
    const fin = e => { if (e.pointerId !== id) return; id = null; r.classList.remove('mano'); if (pfVer.pend) { pfVer.pend = false; setTimeout(() => { if (tab === 'profile' && !profileSub) renderProfile(); }); } if (e.type === 'pointerup') pon(cerca(e)[1], true); else { q('.pm-n b').textContent = S.goal; pintaMeta(); } };
    r.onpointerup = fin; r.onpointercancel = fin;
    r.onkeydown = e => { const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, Home: -9, End: 9 }[e.key]; if (!k) return; e.preventDefault(); pon(PF_METAS[Math.max(0, Math.min(PF_METAS.length - 1, Math.max(0, PF_METAS.indexOf(S.goal)) + k))], true); };
    root.querySelectorAll('[data-meta]').forEach(b => { b.onclick = () => pon(+b.dataset.meta, true); });
  };
  ligaMeta();
  const m = pfMapa(S.days, dkActive(new Date()), new Date()), caja = q('.pm-mapa');
  const pintaMapa = () => caja.querySelectorAll('[data-dia]').forEach(b => { const x = m[+b.dataset.dia]; b.className = `f${pfFuerza(x, S.goal)}${x.hoy ? ' hoy' : ''}${pfVer.dia === x.key ? ' on' : ''}`; });
  const dia = i => { const x = m[i]; if (!x || x.futuro) return; pfVer.dia = x.key; pintaMapa(); $('.pm-dia', root).innerHTML = `<b>${esc(x.d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' }))}</b>: ${x.lit ? (x.xp ? `${x.xp} XP${x.xp >= S.goal ? ', meta cumplida' : ''}` : 'con actividad') : 'sin actividad'}`; caja.querySelector(`[data-dia="${i}"]`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' }); };
  caja.onclick = e => { const b = e.target.closest('[data-dia]'); if (b) dia(+b.dataset.dia); };
  caja.onkeydown = e => { const k = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!k) return; e.preventDefault(); const i = m.findIndex(x => x.key === pfVer.dia); dia(i < 0 ? m.findIndex(x => x.hoy) : i + k); };
  caja.scrollLeft = caja.scrollWidth;
  const sel = m.findIndex(x => x.key === pfVer.dia); if (sel >= 0) dia(sel);
  root.querySelectorAll('[data-logro]').forEach(b => { b.onclick = () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); }; });
}
