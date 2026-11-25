// Inicio, Mis cursos y gimnasio flotante (spec 2026-11-19-inicio-mis-cursos, pruebas tests/inicio-mis-cursos.test.js).
// Inicio muestra los cursos en grande y lo que se estudia ahora; Mis cursos, los cursos en que está inscrito el estudiante;
// la vista de un curso (pestaña interna 'learn', en app.js) empieza con una portada limpia, y en todo el curso (portada,
// mapa y mundos) flota el botón del gimnasio con los retos del nivel que lleva el estudiante.

if (typeof ICON !== 'undefined') ICON.book = svg('<path d="M5 5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2z"/><path d="M5 19a2 2 0 0 0 2 2h12v-4"/><path d="M9 7.5h6"/>');

// El mundo que corresponde al nivel que lleva el estudiante en el curso c (y en el componente block, si hay uno abierto):
// el mundo abierto (s.open), o el de la primera lección sin hacer, o el último si ya terminó. Con componentes y ninguno
// abierto, el componente que se estudió por última vez (s.last, id de lección), como «Sigue aquí». s = { done, open, last }.
function courseLevelUi(c, block, s) {
  if (s.open != null && c.units[s.open]) return s.open;
  if (!block && c.blocks) {
    const lastU = c.units.find(u => u.lessons.some(l => l.id === s.last));
    block = c.blocks.find(b => b.id === lastU?.block) || c.blocks[0];
  }
  const idx = c.units.map((u, i) => (!block || u.block === block.id ? i : -1)).filter(i => i >= 0);
  return idx.find(i => c.units[i].lessons.some(l => !(s.done || {})[l.id])) ?? idx[idx.length - 1] ?? 0;
}

// Inscrito: está en S.misCursos o ya tiene alguna lección hecha. En el orden del catálogo, sin cursos que no existen.
function enrolledIds(s, courses) {
  const mine = new Set(s.misCursos || []), done = s.done || {};
  return courses.filter(c => mine.has(c.id) || c.units.some(u => u.lessons.some(l => done[l.id]))).map(c => c.id);
}

// Los retos del gimnasio para el mundo ui del curso c: los de este mundo (abiertos o no) y, para repasar, los abiertos de
// mundos anteriores del mismo componente. pending = abiertos de este mundo que aún no se han superado.
function gymWorld(c, ui, done, unlockAll, mine = {}) {
  const u = c.units[ui], fab = !!u;   // en todos los cursos (spec 2026-11-19-inicio-mis-cursos)
  const groups = typeof gymRetos === 'function' ? gymRetos(c) : [];
  const here = (groups.find(g => g.ui === ui)?.retos || []).map(r => ({ r, open: gymOpen(r, done, unlockAll) }));
  const review = groups.filter(g => g.ui < ui && c.units[g.ui].block === u?.block).flatMap(g => g.retos).filter(r => gymOpen(r, done, unlockAll));
  // Más adelante: los primeros retos de los mundos que siguen (del mismo componente), para que la hoja nunca quede vacía.
  const ahead = groups.filter(g => g.ui > ui && c.units[g.ui].block === u?.block).flatMap(g => g.retos).slice(0, 3)
    .map(r => ({ r, open: gymOpen(r, done, unlockAll) }));
  return { fab, here, review, ahead, pending: here.filter(x => x.open && !mine[x.r.id]).length };
}

const courseExercises = c => c.units.reduce((t, u) => t + u.lessons.reduce((s, l) => s + l.ex.length, 0), 0);
const cursosInscritos = () => { const ids = enrolledIds(S, cursosVisibles()); return cursosVisibles().filter(c => ids.includes(c.id)); };
// Mis cursos: los comprados. En desarrollo y para el administrador (todo abierto), los inscritos.
const myCourses = () => (SIN_CANDADOS || cuentaEsAdmin() ? cursosInscritos() : cursosVisibles().filter(c => cursoComprado(c)));

// Inscribe un curso (sin repetir). renderLearn lo llama: el curso que se ve queda siempre en Mis cursos.
function enroll(id) {
  if ((S.misCursos || []).includes(id)) return;
  S.misCursos = [...(S.misCursos || []), id]; save();
}
// Abre un curso: lo inscribe y muestra su portada (mapa de mundos o, con componentes, la elección de componente).
function openCourse(id) {
  S.course = id; enroll(id);
  openWorld = null; openBlock = null; save();
  go('learn'); view.scrollTop = 0;
}

// ---- Inicio ----
// «Sigue aprendiendo» va dentro de cada curso, no en el Inicio ni en Mis cursos (pedido del 2026-11-19): la lección que toca
// en ese curso (o en su componente), el mundo, el avance y «Continuar». ls: las lecciones que cuenta el avance.
function continueCardHTML(c, cur, ls) {
  const ui = c.units.findIndex(u => u.lessons.includes(cur)), u = c.units[ui], w = WORLDS[u.world] || { name: u.title };
  const blockName = c.blocks?.find(b => b.id === u.block)?.name, d = ls.filter(isDone).length;
  const i = ls.indexOf(cur), nx = ls[i + 1], next = nx && c.units.find(x => x.lessons.includes(nx))?.block === u.block ? nx : null;
  return `<section class="home-continue" aria-label="Sigue aprendiendo">
    <div class="hk-top">${courseArt(c, 'lg')}<div><p class="hk-eyebrow">${d ? 'Sigue aprendiendo' : 'Empieza aquí'}${blockName ? ` · ${esc(blockName)}` : ''}</p>
      <b class="hk-title">${esc(cur.title)}</b><span class="hk-sub">Mundo ${worldNo(c, ui)} · ${esc(w.name)}</span></div></div>
    <div class="hk-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${d}/${ls.length}</small></div>
    ${next ? `<p class="hk-next">Después: ${esc(next.title)}</p>` : ''}
    <button class="btn" data-continue>${d ? 'Continuar' : 'Empezar'} · +10 XP</button>
  </section>`;
}

// Saludo según la hora. Pura.
const hmSaludo = h => (h < 5 ? 'Buenas noches' : h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches');
// Filtros del Inicio: para qué sirve cada curso. Pura.
const HM_FILTROS = [['todos', 'Todos'], ['entrar', 'Entrar a la U', ['preuda', 'preicfes']], ['carrera', 'Para la carrera', ['algebra', 'trig', 'calc', 'geo', 'int', 'lin', 'fis']]];
const hmPasa = (c, f) => { const x = HM_FILTROS.find(y => y[0] === f); return !x || !x[2] || x[2].includes(c.id); };
let hmFiltro = 'todos', hmJuguete = null;
// El juguete del día: un dibujo de la portada que se mueve con el dedo; cambia cada día. Pura: 0 o 1.
const hmDeHoy = d => (d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % 2;
const HM_JUGUETES = [
  { t: '¿Dónde lo cortas?', p: 'Mueve el corte: el cuadrado siempre se arma con las mismas cuatro piezas.', fig: () => PZ_AREA, cls: 'pz-cuenta-area', vive: el => pzAreaViva(el) },
  { t: '¿Dónde se equilibra?', p: 'Corre el peso hasta que la palanca quede quieta.', fig: () => PZ_PALANCA, cls: 'pz-cuenta-pal', vive: el => pzPalancaViva(el) },
];
// Aro de avance alrededor de una figura.
const aroHTML = (p, dentro, cls = '') => `<span class="aro ${cls}" style="--p:${Math.max(0, Math.min(1, p)).toFixed(3)}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" pathLength="1"/><circle class="v" cx="50" cy="50" r="45" pathLength="1"/></svg><span class="aro-in">${dentro}</span></span>`;

function renderHome() {
  const mine = cursosInscritos(), now = new Date(), hoy = todayXP(), goalP = Math.min(1, hoy / S.goal), name = (S.name || '').trim().split(/\s+/)[0], racha = streakNow();
  const y = $('.hm', view) ? view.scrollTop : 0, sem = dkSemana(dkActive(now), now), b = activeTutorias(S.tutorias, +now)[0], nx = b ? null : nextFree(+now, []);
  const tarjeta = c => {
    const ls = lessonsOf(c), d = ls.filter(isDone).length, inscrito = mine.includes(c);
    return `<button class="hc-card" data-open="${c.id}" data-inclina style="--c:${c.color}" aria-label="${esc(c.name)}${inscrito ? `, ${d} de ${ls.length} lecciones` : ''}">
        <span class="hc-esc"><span class="hc-laminas" aria-hidden="true">${c.units.slice(0, 8).map(u => `<span class="world-art">${(WORLDS[u.world] || {}).art || ''}</span>`).join('')}</span><span class="hc-art">${courseArt(c, 'xl')}</span>${inscrito && d ? `<span class="hc-pct">${Math.round((d / ls.length) * 100)} %</span>` : ''}</span>
        <span class="hc-body"><b>${esc(c.name)}</b><span class="hc-tag">${esc(c.tagline || '')}</span>
          <span class="hc-stats">${ICON.book}${ls.length} lecciones<span aria-hidden="true">·</span>${courseExercises(c)} ejercicios</span>
          ${inscrito ? `<span class="hc-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${d}/${ls.length}</small></span>` : ''}
          <span class="hc-go">${inscrito ? 'Entrar' : 'Empezar'} ${ICON.right}</span></span>
      </button>`;
  };
  view.innerHTML = `<div class="home"><div class="hm">
    <section class="hm-hero"><div class="hm-hola"><header class="home-head"><p>${hmSaludo(now.getHours())}${name ? `, ${esc(name)}` : ''}</p><h1>¿Qué aprendemos hoy?</h1></header>
        <p class="hm-meta">${goalP >= 1 ? '<b>¡Meta cumplida!</b> Todo lo que sigue es ganancia.' : hoy ? `Te faltan <b>${S.goal - hoy} XP</b> para tu meta de hoy.` : `Tu meta de hoy: <b>${S.goal} XP</b>, más o menos ${Math.ceil(S.goal / 10)} lecciones.`}</p>
        <ol class="hm-sem" aria-label="Tu semana">${sem.map(x => `<li class="${x.lit ? 'lit' : ''}${x.today ? ' today' : ''}"${x.today ? ' aria-current="date"' : ''}><small>${x.l}</small><span>${x.lit ? ICON.flame : ''}</span><span class="hm-sr">${x.lit ? 'con actividad' : 'sin actividad'}</span></li>`).join('')}</ol>
        <button class="hm-racha" type="button" data-dk="streak">${ICON.flame}<span>${racha ? `<b>${racha} ${racha === 1 ? 'día' : 'días'}</b> de racha` : 'Empieza tu racha hoy'}</span>${ICON.right}</button></div>
      <button class="hm-aro" type="button" data-dk="streak" data-inclina aria-label="Meta de hoy: ${hoy} de ${S.goal} XP. Ver tu actividad">${aroHTML(goalP, goalP >= 1 ? mascotSVG('cheer', 'm-hello') : mascotSVG('think', 'm-hello'), goalP >= 1 ? 'lleno' : '')}<span class="hm-xp"><b>${hoy}</b> / ${S.goal} XP</span></button></section>
    ${installEvt && !S.hideInstall ? `<section class="install-banner">
      <img src="icons/zuka-claro-192.png" alt="" width="44" height="44">
      <div><b>Instala Zuka</b><p>Ábrela como app, incluso sin conexión.</p></div>
      <button class="btn brand sm" data-install>Instalar</button>
      <button class="icon-btn" data-hide-install aria-label="Ocultar">${ICON.x}</button>
    </section>` : ''}
    <section class="hm-cursos"><div class="hm-fila"><h2 class="home-h2">Cursos</h2><div class="hm-filtros" role="group" aria-label="Filtrar cursos">${HM_FILTROS.filter(f => cursosVisibles().some(c => hmPasa(c, f[0]))).map(f => `<button type="button" data-hm="${f[0]}" aria-pressed="${f[0] === hmFiltro}">${f[1]}</button>`).join('')}</div></div>
      <div class="home-courses"></div></section>
    <div class="hm-dos"><section class="hm-jug"><div class="hm-jt"><p class="hm-k">Calienta la mente</p><h2></h2><p class="hm-jp"></p><p class="pz-cuenta"></p><button class="hm-otro" type="button">Otro juguete ${ICON.right}</button></div><div class="hm-fig"></div></section>
      <section class="hm-ase"><span class="hm-cal" aria-hidden="true">${(() => { const d = b ? tuDate(b.date) : nx ? tuDate(nx.date) : now; return `<small>${TU_MON[d.getMonth()]}</small><b>${d.getDate()}</b>`; })()}</span><div><h2>${b ? 'Tu próxima asesoría' : '¿Te enredas con un tema?'}</h2>
        <p>${b ? `<b>${esc(dayLabel(b.date, +now))}, ${hourLabel(b.time)}</b> · ${esc(tuCourse(b.course)?.name || 'Asesoría')}` : nx ? `Hay cupo con un profe: <b>${esc(dayLabel(nx.date, +now))}, ${hourLabel(nx.time)}</b>` : 'No quedan cupos esta semana.'}</p>
        <button class="btn ghost" type="button" data-dk="tutorias">${b ? 'Ver mi asesoría' : 'Separar asesoría'}</button></div></section></div>
  </div></div>`;
  const pintaCursos = () => {
    if (!cursosVisibles().some(c => hmPasa(c, hmFiltro))) hmFiltro = 'todos';
    $('.home-courses', view).innerHTML = cursosVisibles().filter(c => hmPasa(c, hmFiltro)).map(tarjeta).join('');
    view.querySelectorAll('[data-hm]').forEach(k => k.setAttribute('aria-pressed', k.dataset.hm === hmFiltro));
    view.querySelectorAll('[data-open]').forEach(k => k.onclick = () => openCourse(k.dataset.open));
    inclina($('.home-courses', view));
  };
  view.querySelectorAll('[data-hm]').forEach(k => k.onclick = () => { hmFiltro = k.dataset.hm; pintaCursos(); });
  const jug = () => {
    const j = HM_JUGUETES[hmJuguete ?? hmDeHoy(now)], s = $('.hm-jug', view);
    $('h2', s).textContent = j.t; $('.hm-jp', s).textContent = j.p; $('.pz-cuenta', s).className = `pz-cuenta ${j.cls}`; $('.pz-cuenta', s).innerHTML = '';
    $('.hm-fig', s).innerHTML = j.fig(); j.vive(s);
  };
  $('.hm-otro', view).onclick = () => { hmJuguete = ((hmJuguete ?? hmDeHoy(now)) + 1) % HM_JUGUETES.length; jug(); };
  pintaCursos(); jug(); dkBind(view); inclina($('.hm-hero', view));
  $('[data-install]', view)?.addEventListener('click', promptInstall);
  $('[data-hide-install]', view)?.addEventListener('click', () => { S.hideInstall = true; save(); renderHome(); });
  view.scrollTop = y;
}
// Lo que se inclina hacia el puntero (solo ratón; nada con «reducir movimiento»).
function inclina(raiz) {
  if (!raiz || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  raiz.querySelectorAll('[data-inclina]').forEach(e => {
    e.onpointermove = ev => { const r = e.getBoundingClientRect(); e.style.setProperty('--ry', `${((ev.clientX - r.left) / r.width - .5) * 12}deg`); e.style.setProperty('--rx', `${(.5 - (ev.clientY - r.top) / r.height) * 10}deg`); };
    e.onpointerleave = () => { e.style.setProperty('--rx', '0deg'); e.style.setProperty('--ry', '0deg'); };
  });
}

// ---- Mis cursos (spec 2026-11-25-inicio-y-mis-cursos) ----
// Curso, componente y mundo que se miran: se recuerdan al volver.
const mcVe = { c: null, b: {}, u: {}, va: '' };   // va: por dónde iba; si avanzó o cambió de curso, se vuelve a lo que toca
const MC_PASO = 132;   // distancia entre mundos en el sendero
const mcY = i => 92 + 34 * Math.sin(i * 1.15);   // altura del mundo i (admite decimales, para el trazo)
// Trazo del sendero de n mundos. Pura.
const mcTrazo = n => Array.from({ length: (n - 1) * 10 + 1 }, (_, k) => `${k ? 'L' : 'M'}${(70 + k / 10 * MC_PASO).toFixed(1)} ${mcY(k / 10).toFixed(1)}`).join('');
// Hasta dónde va encendido: mundos completos seguidos, más la parte del que va a medias. `av`: avance 0–1 de cada mundo. Pura.
function mcHasta(av) {
  let i = 0; while (i < av.length && av[i] >= 1) i++;
  return Math.min(av.length - 1, i >= av.length ? av.length - 1 : i + av[i] * .999);
}
function renderMyCourses() {
  const mine = myCourses(), y = $('.mc', view) ? view.scrollTop : 0;
  const va = `${S.course}|${S.lastLesson}|${Object.keys(S.done).length}`;
  if (va !== mcVe.va) Object.assign(mcVe, { c: null, b: {}, u: {}, va });
  if (!mine.some(c => c.id === mcVe.c)) mcVe.c = (mine.find(c => c.id === S.course) || mine[0])?.id || null;
  view.innerHTML = `<div class="mycourses"><div class="mc">
    <header class="home-head mc-head"><div><h1>Mis cursos</h1><p>${mine.length ? 'Elige un curso y recorre sus mundos.' : 'Aún no has comprado ningún curso.'}</p></div><button class="btn ${mine.length ? 'ghost' : 'brand'} mc-more" data-home>${mine.length ? 'Comprar más cursos' : 'Ver la tienda'}</button></header>
    ${mine.length ? `<div class="mc-list${mine.length > 1 ? '' : ' solo'}" role="group" aria-label="Tus cursos">${mine.map(c => {
      const ls = lessonsOf(c), d = ls.filter(isDone).length;
      return `<button class="mc-row" type="button" data-ve="${c.id}" style="--c:${c.color}">${aroHTML(d / ls.length, courseArt(c, 'lg'))}<span class="mc-body"><b>${esc(c.name)}</b><small>${d} de ${ls.length}</small></span></button>`;
    }).join('')}</div><section class="mc-esc" aria-live="off"></section>`
    : `<div class="m-empty">${mascotSVG('think')}<p>${cursosConAcceso().length ? 'Tu prueba está en el Inicio. Cuando compres un curso, aparecerá aquí con todos sus mundos.' : 'Cuando compres un curso, aparecerá aquí con todos sus mundos.'}</p></div>`}
  </div></div>`;
  $('[data-home]', view).onclick = () => openTienda('cursos');
  view.querySelectorAll('[data-ve]').forEach(b => b.onclick = () => { mcVe.c = b.dataset.ve; mcPinta(mine); });
  if (mine.length) mcPinta(mine, true);
  view.scrollTop = y;
}
function mcPinta(mine, primera = false) {
  const c = mine.find(x => x.id === mcVe.c), esc0 = $('.mc-esc', view), cur = currentLesson(c), ls = lessonsOf(c), d = ls.filter(isDone).length;
  view.querySelectorAll('[data-ve]').forEach(b => b.setAttribute('aria-pressed', b.dataset.ve === c.id));
  if (primera) $(`[data-ve="${c.id}"]`, view)?.scrollIntoView({ block: 'nearest', inline: 'center' });
  const acc = accesoCurso(Cuenta.accesos, c.id), al = cursoComprado(c, true), donde = cur && c.units.findIndex(u => u.lessons.includes(cur));
  const retos = gymRetos(c).flatMap(g => g.retos), est = Object.entries(S.gym || {}).reduce((t, [id, v]) => t + (retos.some(r => r.id === id) || id.startsWith(`cal-${c.id}-`) ? v.best || 0 : 0), 0);
  const mundos = c.units.filter(u => u.lessons.every(isDone)).length;
  if (c.blocks && !c.blocks.some(b => b.id === mcVe.b[c.id])) mcVe.b[c.id] = (cur && blockOf(c, cur)) || c.blocks[0].id;
  esc0.style.cssText = `--c:${c.color}`;
  esc0.innerHTML = `<div class="mc-cab"><span class="mc-arte" data-inclina>${aroHTML(d / ls.length, courseArt(c, 'xl'), 'gran')}</span>
      <div class="mc-info"><h2>${esc(c.name)}</h2><p>${cur ? `${d ? 'Vas en' : 'Comienza por'} <b>${esc((WORLDS[c.units[donde].world] || { name: c.units[donde].title }).name)}</b>: ${esc(cur.title)}` : '¡Curso completado! Puedes repasar cualquier mundo.'}</p>
        <p class="mc-cifras"><span><b>${Math.round(d / ls.length * 100)} %</b> del curso</span><span><b>${mundos}</b> de ${c.units.length} mundos</span>${est ? `<span><b><i>★</i> ${est}</b> en el gimnasio</span>` : ''}${acc.estado === 'pago' ? `<span class="${acc.dias <= 7 ? 'poco' : ''}"><b>${diasTexto(acc.dias)}</b> de acceso</span>` : ''}</p>
        <div class="mc-acts"><button class="btn" type="button" data-entra>Entrar al curso ${ICON.right}</button>${acc.estado === 'vencido' ? '<button class="btn ghost" type="button" data-renueva>Renovar</button>' : ''}<button class="mc-mini" type="button" data-gim>${ICON.gym || ICON.bolt}<span>Gimnasio</span></button>${al ? `<button class="mc-mini" type="button" data-tut>${ICON.calendar}<span>Asesoría</span></button>` : ''}</div></div></div>
    ${c.blocks ? `<div class="mc-comps" role="group" aria-label="Componentes">${dkTramos(c, isDone).map(t => `<button type="button" data-comp="${t.b.id}">${blockArt(c, t.b)}<span><b>${esc(t.name)}</b><small>${t.d} de ${t.n} lecciones</small></span></button>`).join('')}</div>` : ''}
    <div class="mc-ruta" tabindex="0" role="group" aria-label="Mundos. Desliza de lado para recorrerlos."></div><div class="mc-det" role="status"></div>`;
  $('[data-entra]', esc0).onclick = () => openCourse(c.id);
  const rn = $('[data-renueva]', esc0); if (rn) rn.onclick = () => openComprar(c.id);
  $('[data-gim]', esc0).onclick = () => { S.course = c.id; enroll(c.id); save(); mcVe.va = `${S.course}|${S.lastLesson}|${Object.keys(S.done).length}`; gymFocus = { course: c.id, ui: courseLevelUi(c, c.blocks?.find(b => b.id === mcVe.b[c.id]), { done: S.done, last: S.lastLesson }) }; go('gym'); view.scrollTop = 0; };
  const tt = $('[data-tut]', esc0); if (tt) tt.onclick = () => { tuElige(c); go('tutorias'); };
  esc0.querySelectorAll('[data-comp]').forEach(b => b.onclick = () => { mcVe.b[c.id] = b.dataset.comp; mcRuta(c, cur); });
  inclina(esc0); mcRuta(c, cur);
}
// El sendero: los mundos del curso (o del componente) en una ola que se recorre de lado; tocar uno lo muestra abajo.
function mcRuta(c, cur) {
  const esc0 = $('.mc-esc', view), ruta = $('.mc-ruta', esc0), bid = c.blocks ? mcVe.b[c.id] : null, clave = `${c.id}/${bid || ''}`;
  const idx = c.units.map((u, i) => (!bid || u.block === bid ? i : -1)).filter(i => i >= 0), aqui = bid ? currentLesson(c, bid) : cur, av = idx.map(i => c.units[i].lessons.filter(isDone).length / c.units[i].lessons.length);
  if (!idx.includes(mcVe.u[clave])) mcVe.u[clave] = idx.find(i => aqui && c.units[i].lessons.includes(aqui)) ?? idx[0];
  esc0.querySelectorAll('[data-comp]').forEach(b => b.setAttribute('aria-pressed', b.dataset.comp === bid));
  const W = 140 + (idx.length - 1) * MC_PASO, D = mcTrazo(idx.length), lejos = idx.length > 1 ? mcHasta(av) / (idx.length - 1) : 0;
  ruta.innerHTML = `<div class="mc-lienzo" style="width:${W}px"><svg width="${W}" height="184" aria-hidden="true"><path d="${D}"/><path class="v" d="${D}" pathLength="1" style="--h:${lejos.toFixed(4)}"/></svg>${idx.map((ui, k) => {
    const u = c.units[ui], { w, wDone, all, closed } = worldInfo(c, u), here = !!aqui && u.lessons.includes(aqui);
    return `<button type="button" class="mc-mundo${all ? ' todo' : ''}${closed ? ' cerrado' : ''}${here ? ' aqui' : ''}" data-mu="${ui}" style="left:${70 + k * MC_PASO}px;top:${mcY(k).toFixed(1)}px;--p:${av[k].toFixed(3)}" aria-label="Mundo ${worldNo(c, ui)}: ${esc(w.name)}, ${wDone} de ${u.lessons.length} lecciones${here ? ', aquí vas' : ''}${closed ? ', cerrado' : ''}"><span class="mm-art world-art">${w.art || ''}</span>${all ? `<span class="mm-b">${ICON.star}</span>` : closed ? `<span class="mm-b">${ICON.lock}</span>` : ''}${here ? '<span class="mm-aqui" aria-hidden="true">Aquí vas</span>' : ''}</button>`;
  }).join('')}</div>`;
  const pon = (ui, foco) => {
    mcVe.u[clave] = ui;
    const u = c.units[ui], { w, wDone, closed } = worldInfo(c, u);
    ruta.querySelectorAll('[data-mu]').forEach(b => { const on = +b.dataset.mu === ui; b.setAttribute('aria-pressed', on); b.classList.toggle('on', on); });
    $('.mc-det', esc0).innerHTML = `<span class="md-art world-art" aria-hidden="true">${w.art || ''}</span><div><p class="md-n">Mundo ${worldNo(c, ui)} · ${wDone} de ${u.lessons.length} lecciones</p><h3>${esc(w.name)}</h3><ul class="md-lecs">${u.lessons.map(l => `<li class="${isDone(l) ? 'ok' : l === aqui ? 'ya' : ''}">${isDone(l) ? ICON.check : '<i></i>'}<span>${esc(l.title)}</span></li>`).join('')}</ul>${closed ? '<p class="md-c">Se abre al avanzar por los mundos anteriores.</p>' : ''}<button class="btn ghost" type="button" data-ir>Ir a este mundo ${ICON.right}</button></div>`;
    $('[data-ir]', esc0).onclick = () => { S.course = c.id; enroll(c.id); openBlock = c.blocks ? { course: c.id, id: u.block } : null; openWorld = { course: c.id, i: ui }; save(); go('learn'); };
    const n = $(`[data-mu="${ui}"]`, ruta);
    ruta.scrollTo({ left: n.offsetLeft - ruta.clientWidth / 2, behavior: foco === 'salto' || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (foco === true) n.focus({ preventScroll: true });
  };
  let id = null, x0 = 0, s0 = 0, movio = false;   // con ratón también se arrastra
  ruta.onpointerdown = e => { movio = false; if (e.pointerType !== 'mouse' || e.button) return; id = e.pointerId; x0 = e.clientX; s0 = ruta.scrollLeft; };
  ruta.onpointermove = e => { if (e.pointerId !== id) return; if (!e.buttons) { id = null; ruta.classList.remove('mano'); return; } if (!movio && Math.abs(e.clientX - x0) > 6) { movio = true; ruta.setPointerCapture(id); ruta.classList.add('mano'); } if (movio) ruta.scrollLeft = s0 - (e.clientX - x0) / zk(); };
  ruta.onpointerup = ruta.onpointercancel = e => { if (e.pointerId === id) { id = null; ruta.classList.remove('mano'); } };
  ruta.onclick = e => { if (movio) { movio = false; return; } const b = e.target.closest('[data-mu]'); if (b) pon(+b.dataset.mu); };
  ruta.onkeydown = e => { const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return; e.preventDefault(); const i = Math.max(0, Math.min(idx.length - 1, idx.indexOf(mcVe.u[clave]) + k)); pon(idx[i], true); };
  pon(mcVe.u[clave], 'salto');
}

// Portada limpia de un curso o de un componente: enlace a Mis cursos, dibujo grande, título, descripción y cifras.
function courseHeadHTML(c, block) {
  const ls = block ? lessonsOf(c).filter(l => c.units.find(u => u.lessons.includes(l))?.block === block.id) : lessonsOf(c);
  const units = block ? c.units.filter(u => u.block === block.id) : c.units;
  const ex = units.reduce((t, u) => t + u.lessons.reduce((s, l) => s + l.ex.length, 0), 0), d = ls.filter(isDone).length;
  return `${block ? '' : `<button class="ch-back" data-courses>${ICON.back}<span>Mis cursos</span></button>`}
    <header class="course-head">
      ${courseArt(c, 'xl')}
      ${block ? `<p class="ch-eyebrow">Componente ${c.blocks.indexOf(block) + 1} · ${esc(c.name)}</p>` : c.level ? `<p class="ch-eyebrow">${esc(c.level)}</p>` : ''}
      <h1>${esc(block ? block.name : c.name)}</h1>
      <p class="ch-sub">${esc(block ? block.desc : c.tagline || '')}</p>
      <p class="ch-stats"><span>${ICON.book}${ls.length} lecciones</span><span>${ICON.target}${ex} ejercicios</span></p>
      ${d ? `<div class="ch-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${d}/${ls.length}</small></div>` : ''}
    </header>`;
}
function bindCourseHead() { $('[data-courses]', view)?.addEventListener('click', () => go('cursos')); }

// ---- gimnasio flotante (dentro de un mundo) ----
// Mancuerna en relieve sobre una base (pedido del 2026-11-19): discos con costado y cara, en los colores del curso
// (--g1..--g4, de ART_PAL; ver gymFabColors); la base toma los tonos del tema (--gb*, --gd*, en css/styles.css).
// Se dibuja con el eje horizontal y luego se inclina; la cara visible de los discos mira a la izquierda.
const GYM_3D = (() => {
  const plate = (x0, x1, face) => `<rect x="${Math.min(x0, x1)}" y="-13" width="${Math.abs(x1 - x0)}" height="26" fill="url(#gf-g)"/>
    <rect x="${Math.min(x0, x1)}" y="-13" width="${Math.abs(x1 - x0)}" height="26" fill="url(#gf-s)"/>
    <ellipse cx="${x1}" cy="0" rx="4.6" ry="13" fill="url(#gf-g)"/><ellipse cx="${x1}" cy="0" rx="4.6" ry="13" fill="url(#gf-s)"/>
    <ellipse cx="${x0}" cy="0" rx="4.6" ry="13" fill="url(#gf-g)"/><ellipse cx="${x0}" cy="0" rx="4.6" ry="13" fill="#fff" opacity=".38"/>
    ${face ? `<ellipse cx="${x0 - .3}" cy="0" rx="1.6" ry="3.8" style="fill:var(--g4)" opacity=".5"/>` : ''}`;
  return `<svg class="gf-art" viewBox="0 0 64 64" aria-hidden="true">
  <defs>
    <linearGradient id="gf-g" gradientUnits="userSpaceOnUse" x1="-20" y1="0" x2="20" y2="0">
      <stop offset="0" style="stop-color:var(--g1)"/><stop offset=".5" style="stop-color:var(--g2)"/><stop offset="1" style="stop-color:var(--g3)"/></linearGradient>
    <linearGradient id="gf-s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" style="stop-color:var(--g4)" stop-opacity=".35"/></linearGradient>
    <radialGradient id="gf-b" cx=".5" cy=".35" r=".7">
      <stop offset="0" style="stop-color:var(--gb1)"/><stop offset="1" style="stop-color:var(--gb2)"/></radialGradient>
    <radialGradient id="gf-d" cx=".5" cy=".3" r=".75">
      <stop offset="0" style="stop-color:var(--gd1)"/><stop offset="1" style="stop-color:var(--gd2)"/></radialGradient>
    <radialGradient id="gf-h" cx=".5" cy=".5" r=".5">
      <stop offset="0" style="stop-color:var(--g2)" stop-opacity=".55"/><stop offset=".6" style="stop-color:var(--g3)" stop-opacity=".2"/><stop offset="1" style="stop-color:var(--g3)" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse cx="32" cy="52" rx="30" ry="11" fill="url(#gf-h)"/>
  <ellipse cx="32" cy="48" rx="25" ry="10.5" fill="url(#gf-b)"/>
  <ellipse cx="32" cy="47.2" rx="25" ry="10.5" fill="none" style="stroke:var(--grim)" stroke-width=".8"/>
  <ellipse cx="32" cy="47.5" rx="19" ry="7.4" fill="url(#gf-d)"/>
  <ellipse cx="33" cy="47" rx="12" ry="3.6" style="fill:var(--g4)" opacity=".3"/>
  <g class="gf-db"><g transform="translate(32 28) rotate(-36)">
    ${plate(10, 19, false)}
    <rect x="-10" y="-3.6" width="20" height="7.2" rx="1" fill="url(#gf-g)"/><rect x="-10" y="-3.6" width="20" height="7.2" rx="1" fill="url(#gf-s)"/>
    ${plate(-19, -10, true)}
  </g></g>
</svg>`;
})();

// Degradado de la pesa: tono claro → color del curso → su acento; --g4 es la sombra.
function gymFabColors(c) {
  const p = (typeof ART_PAL !== 'undefined' && ART_PAL[c.id]) || {};
  return `--c:${c.color};--g1:${p.soft || c.color};--g2:${p.blue || c.color};--g3:${p.sun || c.color};--g4:${p.deep || c.color}`;
}
function gymFabHTML(c, ui) {
  const g = gymWorld(c, ui, S.done, S.unlockAll, S.gym || {});
  if (!g.fab) return '';
  return `<button class="gym-fab" data-gym-fab data-ui="${ui}" style="${gymFabColors(c)}" aria-label="Gimnasio: retos guiados de tu nivel${g.pending ? `, ${g.pending} por hacer` : ''}">
    ${GYM_3D}${g.pending ? `<span class="gym-fab-n" aria-hidden="true">${g.pending}</span>` : ''}</button>`;
}
function bindGymFab(c) {
  const b = $('[data-gym-fab]', view);
  if (!b) return;
  b.closest('.learn')?.classList.add('has-fab');   // espacio abajo para el botón (sin depender de :has)
  // Las pesas abren la página del gimnasio en el mundo del nivel del estudiante (spec 2026-11-19-gimnasio-niveles).
  b.addEventListener('click', () => { gymFocus = { course: c.id, ui: +b.dataset.ui }; go('gym'); });
}

