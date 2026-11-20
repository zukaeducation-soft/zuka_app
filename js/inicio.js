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
const myCourses = () => { const ids = enrolledIds(S, cursosVisibles()); return cursosVisibles().filter(c => ids.includes(c.id)); };

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

function renderHome() {
  const mine = myCourses();
  const goalP = Math.min(1, todayXP() / S.goal), name = (S.name || '').trim().split(/\s+/)[0];
  view.innerHTML = `<div class="home">
    <header class="home-head"><p>${name ? `Hola, ${esc(name)}` : 'Hola'}</p><h1>¿Qué aprendemos hoy?</h1></header>
    ${installEvt && !S.hideInstall ? `<section class="install-banner">
      <img src="icons/icon-192.png" alt="" width="44" height="44">
      <div><b>Instala Zuka</b><p>Ábrela como app, incluso sin conexión.</p></div>
      <button class="btn brand sm" data-install>Instalar</button>
      <button class="icon-btn" data-hide-install aria-label="Ocultar">${ICON.x}</button>
    </section>` : ''}
    <section class="home-goal">${ICON.target}<div><p><b>Meta de hoy</b><span>${todayXP()} / ${S.goal} XP</span></p>
      <div class="bar"><i style="width:${goalP * 100}%"></i></div></div></section>
    <h2 class="home-h2">Cursos</h2>
    <div class="home-courses">${cursosVisibles().map(c => {
      const ls = lessonsOf(c), d = ls.filter(isDone).length, inscrito = mine.includes(c);
      return `<button class="hc-card" data-open="${c.id}" style="--c:${c.color}" aria-label="${esc(c.name)}${inscrito ? `, ${d} de ${ls.length} lecciones` : ''}">
        <span class="hc-art">${courseArt(c, 'xl')}</span>
        <span class="hc-body"><small>${esc(c.level || '')}</small><b>${esc(c.name)}</b><span class="hc-tag">${esc(c.tagline || '')}</span>
          <span class="hc-stats">${ICON.book}${ls.length} lecciones<span aria-hidden="true">·</span>${courseExercises(c)} ejercicios</span>
          ${inscrito ? `<span class="hc-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${Math.round((d / ls.length) * 100)} %</small></span>`
            : '<span class="hc-go">Empezar ' + ICON.right + '</span>'}</span>
      </button>`;
    }).join('')}</div>
  </div>`;
  view.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openCourse(b.dataset.open));
  $('[data-install]', view)?.addEventListener('click', promptInstall);
  $('[data-hide-install]', view)?.addEventListener('click', () => { S.hideInstall = true; save(); renderHome(); });
  view.scrollTop = 0;
}

// ---- Mis cursos ----
function renderMyCourses() {
  const mine = myCourses();
  view.innerHTML = `<div class="mycourses">
    <header class="home-head"><h1>Mis cursos</h1><p>${mine.length ? 'Los cursos en que estás inscrito.' : 'Aún no te has inscrito en ningún curso.'}</p></header>
    ${mine.length ? `<div class="mc-list">${mine.map(c => {
      const ls = lessonsOf(c), d = ls.filter(isDone).length, nxt = currentLesson(c);
      return `<button class="mc-row" data-open="${c.id}" style="--c:${c.color}">
        ${courseArt(c, 'xl')}
        <span class="mc-body"><b>${esc(c.name)}</b>
          <span class="hc-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${d}/${ls.length}</small></span>
          <span class="mc-next">${nxt ? `${d ? 'Sigue' : 'Empieza'}: ${esc(nxt.title)}` : '¡Curso completado!'}</span></span>
        ${ICON.right}</button>`;
    }).join('')}</div>` : ''}
    <button class="btn ${mine.length ? 'ghost' : ''} mc-more" data-home>${mine.length ? 'Explorar más cursos' : 'Ver los cursos'}</button>
  </div>`;
  view.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openCourse(b.dataset.open));
  $('[data-home]', view).onclick = () => go('home');
  view.scrollTop = 0;
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

