// Zuka en computador (spec 2026-11-20-escritorio; referencia: la versión web de Brilliant). Los estilos viven en
// css/escritorio.css (desde ESCRITORIO_MIN px de ancho); aquí, lo que necesita datos: los paneles a los lados del
// video vertical de una lección (qué lección es y el recorrido de videos y ejercicios).
const ESCRITORIO_MIN = 1000;
const esEscritorio = () => typeof matchMedia === 'function' && matchMedia(`(min-width: ${ESCRITORIO_MIN}px)`).matches;

const esEsc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const esMin = secs => (secs >= 60 ? `${Math.round(secs / 60)} min` : `${Math.round(secs)} s`);

// ---- paneles de Inicio, Mis cursos, Tutorías y Tú (spec 2026-11-24-escritorio-vistas) ----
// Llevan la clase `dk`: en el celular no se ven (css/escritorio.css). Los botones se conectan con dkBind(view).
const dkActive = now => new Set([...Object.keys(S.days || {}), ...streakDays(S.lastDay, streakNow(), now)]);

// Los siete días de esta semana (lunes a domingo), con los que tuvieron actividad encendidos. Pura.
function dkSemana(active, now) {
  const lead = (now.getDay() + 6) % 7;
  return [...'LMXJVSD'].map((l, i) => ({ l, lit: active.has(dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - lead + i))), today: i === lead }));
}
// Avance por tramos de un curso: por componente si los tiene; si no, los mundos. `hecha(l)`: lección hecha. Pura.
function dkTramos(c, hecha) {
  const cuenta = us => { const ls = us.flatMap(u => u.lessons); return { d: ls.filter(hecha).length, n: ls.length }; };
  if (c.blocks) return c.blocks.map(b => ({ b, name: b.name, ...cuenta(c.units.filter(u => u.block === b.id)) }));
  return [{ name: 'Mundos completos', d: c.units.filter(u => u.lessons.every(hecha)).length, n: c.units.length }];
}

function dkSemanaHTML() {
  const now = new Date(), n = streakNow(), sem = dkSemana(dkActive(now), now);
  return `<section class="dk dk-card"><div class="dk-head"><h2>Tu semana</h2><button class="dk-link" type="button" data-dk="streak">Ver actividad</button></div>
    <ol class="dk-week">${sem.map(x => `<li class="${x.lit ? 'lit' : ''}${x.today ? ' today' : ''}"${x.today ? ' aria-current="date"' : ''}><small>${x.l}</small><span>${x.lit ? ICON.check : ''}</span></li>`).join('')}</ol>
    <p class="dk-note">${ICON.flame}<span>${n ? `<b>${n} ${n === 1 ? 'día' : 'días'}</b> de racha` : 'Completa una lección para empezar tu racha.'}</span></p></section>`;
}
function dkAsesoriaHTML() {
  const now = Date.now(), b = activeTutorias(S.tutorias, now)[0], nx = b ? null : nextFree(now, []);
  return `<section class="dk dk-card"><h2>${b ? 'Tu próxima asesoría' : '¿Te enredas con un tema?'}</h2>
    <p class="dk-note">${ICON.calendar}<span>${b ? `<b>${esc(dayLabel(b.date, now))}, ${hourLabel(b.time)}</b><br>${esc(tuCourse(b.course)?.name || 'Asesoría')}`
      : nx ? `Próximo cupo: <b>${esc(dayLabel(nx.date, now))}, ${hourLabel(nx.time)}</b>` : 'No quedan cupos esta semana.'}</span></p>
    <button class="btn ghost" type="button" data-dk="tutorias">${b ? 'Ver mis asesorías' : 'Separar asesoría'}</button></section>`;
}
// Tutorías: los próximos días con cupo y los pasos para separar una.
function dkTutoriasHTML(mine) {
  const now = Date.now(), days = tutoriaDays(now, mine).map(d => ({ date: d.date, n: d.slots.filter(s => s.free).length })).filter(d => d.n).slice(0, 5);
  return `${mine.length ? '' : `<section class="dk dk-card"><h2>Tus asesorías</h2><p class="dk-sub">Aún no tienes ninguna. Cuando separes una, aquí verás el día, la hora y los temas.</p></section>`}
    ${days.length && mine.length < TUTORIAS.max ? `<section class="dk dk-card"><h2>Próximos cupos</h2><ul class="dk-days">${days.map(d => `<li><b>${esc(dayLabel(d.date, now))}</b><span>${d.n} ${d.n === 1 ? 'hora' : 'horas'}</span></li>`).join('')}</ul></section>` : ''}
    <section class="dk dk-card"><h2>Cómo funciona</h2><ol class="dk-steps"><li>Elige la materia y hasta ${TUTORIAS.maxTopics} temas.</li><li>Elige el día y la hora.</li><li>Cuenta qué te cuesta más, si quieres.</li></ol></section>`;
}
// Mis cursos: avance de un curso por componente o por mundos, dentro de su tarjeta.
function dkCursoHTML(c) {
  return `<span class="dk dk-tramos">${dkTramos(c, isDone).map(t => `<span class="dk-tramo">${t.b ? blockArt(c, t.b) : ''}<span><span class="dk-tr"><span>${esc(t.name)}</span><small>${t.d}/${t.n}</small></span>
    <span class="mini-bar"><i style="width:${(t.d / t.n) * 100}%"></i></span></span></span>`).join('')}</span><span class="dk dk-enter">Entrar al curso ${ICON.right}</span>`;
}
// Dentro de un curso: los mundos de un componente, en su tarjeta, y de qué consta cada lección, en su fila.
function dkMundosHTML(c, b) {
  return `<span class="dk cv-mundos" aria-hidden="true">${c.units.filter(u => u.block === b.id).map(u =>
    `<span${u.lessons.every(isDone) ? ' class="ok"' : ''}>${esc((WORLDS[u.world] || {}).name || u.title)}</span>`).join('')}</span>`;
}
function dkLeccionHTML(l) {
  const xp = typeof EXPLORA !== 'undefined' && EXPLORA[l.id];
  return `<span class="dk cv-meta">${xp ? 'Explicación interactiva' : `Video de ${esMin(clipSecs(l))}`} · ${l.ex.length} ejercicios</span>`;
}
// Tú: el mes en calendario y el avance de los cursos en que está inscrito.
function dkMesHTML() {
  const now = new Date();
  return `<section class="dk dk-card dk-mes"><div class="dk-head"><h2>Actividad</h2><button class="dk-link" type="button" data-dk="streak">Ver más</button></div>
    <p class="dk-month">${now.toLocaleDateString('es', { month: 'long', year: 'numeric' })}</p>
    <ol class="act-grid" aria-label="Días con actividad">${[...'LMXJVSD'].map(l => `<li class="act-dow" aria-hidden="true">${l}</li>`).join('')}${
      monthGrid(now.getFullYear(), now.getMonth(), dkActive(now), now).map(x => `<li class="${x.out ? 'out' : ''}${x.lit ? ' lit' : ''}${x.today ? ' today' : ''}"${x.lit ? ` aria-label="${x.d}, con actividad"` : x.today ? ` aria-label="${x.d}, hoy"` : ''}><span>${x.d}</span></li>`).join('')}</ol></section>`;
}
function dkCursosHTML() {
  const mine = myCourses();
  return `<section class="dk dk-card"><h2>Tus cursos</h2>${mine.length ? `<div class="dk-cursos">${mine.map(c => {
    const ls = lessonsOf(c), d = ls.filter(isDone).length;
    return `<button class="dk-curso" type="button" data-dk-open="${c.id}" style="--c:${c.color}">${courseArt(c, 'md')}<span><span class="dk-tr"><b>${esc(c.name)}</b><small>${d}/${ls.length}</small></span><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span></span></button>`;
  }).join('')}</div>` : '<p class="dk-sub">Aún no has comprado ningún curso.</p><button class="btn ghost" type="button" data-dk="tienda">Ver la tienda</button>'}</section>`;
}
function dkBind(root) {
  root.querySelectorAll('[data-dk]').forEach(b => b.onclick = () => (b.dataset.dk === 'streak' ? openStreakSheet() : (go(b.dataset.dk), view.scrollTop = 0)));
  root.querySelectorAll('[data-dk-open]').forEach(b => b.onclick = () => openCourse(b.dataset.dkOpen));
}

// Recorrido de la lección en tramos: cada video es uno; los ejercicios seguidos se juntan en uno. `at`: posición actual.
function leccionTramos(queue, at) {
  const out = [];
  queue.forEach((t, i) => {
    const last = out[out.length - 1];
    if (t.k === 'ex' && last && last.k === 'ex') { last.n++; last.to = i; return; }
    out.push({ k: t.k, part: t.n, n: 1, from: i, to: i });
  });
  return out.map(r => ({ ...r, state: at > r.to ? 'done' : at >= r.from ? 'now' : 'next' }));
}

// Paneles a los lados del video (solo se ven en escritorio). `n`: parte del video que se ve.
function leccionLadosHTML(c, l, queue, at, n, clip) {
  const u = (c.units || []).find(x => (x.lessons || []).includes(l));
  const world = u ? ((typeof WORLDS !== 'undefined' && WORLDS[u.world]) || {}).name || u.title : '';
  const parts = queue.filter(t => t.k === 'clip').length;
  const dur = clip && (clip.duration ?? (clip.scenes || []).reduce((s, x) => s + (x.d || 0), 0));
  const art = typeof courseArt === 'function' ? courseArt(c, 'lg') : '';
  const tramo = r => r.k === 'clip'
    ? `Video${parts > 1 ? ` · parte ${r.part + 1}` : ''}`
    : `${r.n} ${r.n === 1 ? 'ejercicio' : 'ejercicios'}`;
  const icon = r => (r.state === 'done' ? '✓' : r.k === 'clip' ? '▶' : '◆');
  return `<aside class="ls-side ls-l" aria-label="Lección">
      <div class="ls-course">${art}<span>${esEsc(c.name)}${world ? `<small>${esEsc(world)}</small>` : ''}</span></div>
      <h2>${esEsc(l.title)}</h2>
      <p class="ls-meta">${parts > 1 ? `Parte ${n + 1} de ${parts}` : 'Video de la lección'}${dur ? ` · ${esMin(dur)}` : ''}</p>
      <p class="ls-note">Primero la idea, después la fórmula. Míralo con calma: al terminar siguen los ejercicios.</p>
      <ul class="ls-keys"><li><kbd>↓</kbd> seguir</li><li><kbd>↑</kbd> video anterior</li><li><kbd>Enter</kbd> continuar</li></ul>
    </aside>
    <aside class="ls-side ls-r" aria-label="Tu recorrido">
      <p class="ls-eyebrow">Tu recorrido</p>
      <ol class="ls-path">${leccionTramos(queue, at).map(r => `<li class="${r.state}"><i aria-hidden="true">${icon(r)}</i>${tramo(r)}</li>`).join('')}</ol>
      <button class="btn main ls-go" type="button" data-ls-skip>Seguir ↓</button>
    </aside>`;
}

// Lo pinta startLesson (js/app.js) cada vez que muestra un video; el botón hace lo mismo que «Ejercicios ↓».
function leccionLados(root, c, l, queue, at, n, clip) {
  const host = root.querySelector('.ls-sides');
  if (!host) return;
  host.innerHTML = leccionLadosHTML(c, l, queue, at, n, clip);
  const skip = root.querySelector('.clip-skip');
  host.querySelector('[data-ls-skip]').textContent = skip ? skip.textContent : 'Seguir ↓';
  host.querySelector('[data-ls-skip]').onclick = () => skip?.click();
}

// ---- explicación interactiva en computador (spec 2026-11-24-explora-escritorio) ----
// Estado de cada capítulo: fracción hecha y el paso al que se vuelve al tocarlo (null si aún no se ha llegado).
function exploraCapitulos(caps, pasos, hechos) {
  return caps.map((t, c) => {
    const mios = pasos.map((p, k) => (p.cap === c ? k : -1)).filter(k => k >= 0), n = mios.filter(k => hechos[k]).length;
    const llega = mios[0] === 0 || !!hechos[mios[0] - 1];
    const falta = mios.find(k => !hechos[k]);   // a medias, se retoma donde iba
    return { t, hecho: n / mios.length, ir: llega ? falta ?? mios[0] : null };
  });
}
// Ancho de la escena: lo que deja el alto de la ventana según la proporción de su dibujo (el dibujo no se deforma).
const exploraAncho = (ratio, alto) => Math.round(Math.max(300, Math.min(760, ratio * alto * 0.33)));

function exploraRiel(root, d) {
  let el = root.querySelector('.xp-riel');
  if (!el) {
    el = document.createElement('aside');
    el.className = 'xp-riel';
    el.setAttribute('aria-label', 'Capítulos de la lección');
    el.innerHTML = `<div class="xr-top"><span class="xr-curso">${esEsc(d.course?.name || '')}</span><h2>${esEsc(d.lesson.title || '')}</h2></div><ol class="xr-caps"></ol><div class="xr-ideas"><h3>Lo que llevas construido</h3><ul></ul></div>`;
    root.prepend(el);
  }
  const caps = exploraCapitulos(d.caps, d.pasos, d.hechos), ol = el.querySelector('.xr-caps'), ul = el.querySelector('.xr-ideas ul');
  const foco = [...ol.querySelectorAll('button')].indexOf(document.activeElement);
  ol.innerHTML = caps.map((c, k) => `<li class="${k === d.cap ? 'now' : ''}${c.hecho >= 1 ? ' done' : ''}"><button type="button" data-ir="${c.ir ?? ''}"${c.ir == null ? ' disabled' : ''}${k === d.cap ? ' aria-current="step"' : ''}>
    <i style="--p:${c.hecho}">${c.hecho >= 1 ? '✓' : k + 1}</i><span>${esEsc(c.t)}</span></button></li>`).join('');
  if (foco >= 0) ol.querySelectorAll('button')[foco]?.focus({ preventScroll: true });
  ol.onclick = e => { const b = e.target.closest('button[data-ir]'); if (b && b.dataset.ir !== '' && !b.hasAttribute('aria-current')) d.ir(+b.dataset.ir); };
  const antes = el.dataset.n == null ? d.ideas.length : +el.dataset.n;   // al retomar no se animan las viejas
  el.dataset.n = d.ideas.length;
  ul.innerHTML = d.ideas.map((t, k) => `<li${k >= antes ? ' class="nueva"' : ''}>${tex(t)}</li>`).join('') || '<li class="none">Cada idea que ganes queda aquí.</li>';
  if (d.ideas.length > antes) ul.parentElement.scrollTop = ul.parentElement.scrollHeight;
  const stage = root.querySelector('.xp-stage');
  const ajusta = () => {
    const vb = stage.querySelector('.xp-svg')?.viewBox?.baseVal;
    if (vb?.height) stage.style.setProperty('--xp-w', `${exploraAncho(vb.width / vb.height, innerHeight)}px`);
  };
  ajusta();
  if (!root.dataset.ajusta) { root.dataset.ajusta = '1'; new ResizeObserver(ajusta).observe(root); }
}
