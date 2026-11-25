// Pestaña Tutorías: el estudiante separa una asesoría virtual eligiendo la materia, los temas que quiere
// reforzar (las lecciones de esa materia en la app), el día y la hora. No hay nombres de tutores.
// Diseño: docs/superpowers/specs/2026-11-12-tutorias.md.
//
// La app no tiene servidor: la reserva se guarda en el celular (S.tutorias). Con `whatsapp` puesto, la
// confirmación ofrece avisar a coordinación con el mensaje ya escrito.
const TUTORIAS = {
  whatsapp: '',    // WhatsApp de coordinación, solo dígitos con indicativo (p. ej. '573001234567'); vacío = sin aviso
  mins: 60,        // duración de una asesoría
  leadMin: 60,     // anticipación mínima para separar, en minutos
  days: 7,         // cuántos días hacia adelante se ofrecen
  max: 3,          // asesorías pendientes a la vez
  maxTopics: 4,    // temas por asesoría
  // Horario de atención: día de la semana (0 = domingo … 6 = sábado) → horas de inicio, hora local del celular.
  hours: {
    1: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    2: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    3: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    4: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    5: ['14:00', '15:00', '16:00', '17:00', '18:00'],
    6: ['09:00', '10:00', '11:00'],
  },
};

// ---- lógica pura (se prueba en Node; `now` es un número de milisegundos) ----
const TU_DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const TU_MON = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const tuPad = n => String(n).padStart(2, '0');
const tuKey = d => `${d.getFullYear()}-${tuPad(d.getMonth() + 1)}-${tuPad(d.getDate())}`;
function tuDate(date, time = '00:00') {
  const [y, m, d] = date.split('-').map(Number), [h, mi] = time.split(':').map(Number);
  return new Date(y, m - 1, d, h, mi);
}
// Los cupos son en hora de Colombia (UTC−5, sin horario de verano), esté donde esté el estudiante.
const tuStart = b => { const [y, m, d] = b.date.split('-').map(Number), [h, mi] = b.time.split(':').map(Number); return Date.UTC(y, m - 1, d, h + 5, mi); };
const tuHoy = now => { const d = new Date(now - 5 * 3600000); return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); };   // el día de hoy en Colombia
const tuEnd = b => tuStart(b) + (b.mins || TUTORIAS.mins) * 60000;
// Lo que venga dañado del almacenamiento (o del formato viejo, sin temas) se descarta en vez de romper la pestaña.
const tuValid = b => !!b && typeof b === 'object' && /^\d{4}-\d\d-\d\d$/.test(b.date) && /^\d\d:\d\d$/.test(b.time)
  && typeof b.course === 'string' && Array.isArray(b.topics) && typeof b.id === 'string'
  && (b.mins == null || (Number.isFinite(b.mins) && b.mins > 0 && b.mins <= 240));
const tuList = mine => (Array.isArray(mine) ? mine.filter(tuValid) : []);

// Asesorías que no han terminado, de la más cercana a la más lejana.
function activeTutorias(mine, now) {
  return tuList(mine).filter(b => tuEnd(b) > now).sort((a, b) => tuStart(a) - tuStart(b));
}

// Los próximos días: [{ date, slots: [{ time, free }] }]. Solo cupos que aún se pueden separar; `free` es
// false si choca con otra asesoría del estudiante.
function tutoriaDays(now, mine, hours = TUTORIAS.hours) {
  const busy = activeTutorias(mine, now), first = tuHoy(now), out = [];
  for (let i = 0; i < TUTORIAS.days; i++) {
    const d = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i), date = tuKey(d);
    const slots = (hours[d.getDay()] || []).map(time => {
      const s = { date, time, mins: TUTORIAS.mins };
      return { time, start: tuStart(s), free: !busy.some(b => tuStart(b) < tuEnd(s) && tuStart(s) < tuEnd(b)) };
    }).filter(s => s.start - now >= TUTORIAS.leadMin * 60000).map(({ time, free }) => ({ time, free }));
    out.push({ date, slots });
  }
  return out;
}

function nextFree(now, mine, hours = TUTORIAS.hours) {
  for (const d of tutoriaDays(now, mine, hours)) {
    const s = d.slots.find(x => x.free);
    if (s) return { date: d.date, time: s.time };
  }
  return null;
}

// Qué temas (ids de lección) tiene cada materia: { algebra: ['alg-0a', …], … }.
function tutoriaCatalog(courses) {
  return Object.fromEntries(courses.map(c => [c.id, c.units.flatMap(u => u.lessons.map(l => l.id))]));
}

// Marca o desmarca un tema; el que pasaría del máximo no entra.
function toggleTopic(topics, id) {
  if (topics.includes(id)) return topics.filter(t => t !== id);
  return topics.length >= TUTORIAS.maxTopics ? topics : [...topics, id];
}

// Separa una asesoría. `req`: { course, topics: [ids de lección], date, time, note }.
// Errores: 'course', 'topics', 'slot' (no existe o ya no se alcanza), 'max', 'busy'.
function bookTutoria(mine, req, now, catalog, hours = TUTORIAS.hours) {
  const list = tuList(mine), lessons = catalog[req.course];
  if (!lessons) return { ok: false, error: 'course' };
  const topics = [...new Set(Array.isArray(req.topics) ? req.topics : [])];
  if (!topics.length || topics.length > TUTORIAS.maxTopics || !topics.every(t => lessons.includes(t))) return { ok: false, error: 'topics' };
  const slot = tutoriaDays(now, list, hours).find(d => d.date === req.date)?.slots.find(s => s.time === req.time);
  if (!slot) return { ok: false, error: 'slot' };
  if (activeTutorias(list, now).length >= TUTORIAS.max) return { ok: false, error: 'max' };
  if (!slot.free) return { ok: false, error: 'busy' };
  const booking = {
    id: `tu-${now.toString(36)}-${list.length}`, course: req.course, topics, date: req.date, time: req.time, mins: TUTORIAS.mins,
    note: String(req.note ?? '').trim().slice(0, 140), made: now,
  };
  return { ok: true, booking, list: [...list, booking] };
}

const cancelTutoria = (mine, id) => (Array.isArray(mine) ? mine : []).filter(b => b && b.id !== id);

// «Hoy», «Mañana» o «lun 16 nov».
function dayLabel(date, now) {
  const d = tuDate(date), diff = Math.round((d - tuHoy(now)) / 86400000);
  return diff === 0 ? 'Hoy' : diff === 1 ? 'Mañana' : `${TU_DOW[d.getDay()]} ${d.getDate()} ${TU_MON[d.getMonth()]}`;
}
// '16:00' → «4:00 p. m.»
function hourLabel(time) {
  const [h, m] = time.split(':').map(Number);
  return `${h % 12 || 12}:${tuPad(m)} ${h < 12 ? 'a. m.' : 'p. m.'}`;
}

// Mensaje para coordinación y su enlace de WhatsApp ('' si no hay número).
function tutoriaText(b, name, courseName, topicTitles, now) {
  return `Hola, soy ${name || 'estudiante de Zuka'}. Quiero una asesoría virtual de ${courseName}: `
    + `${dayLabel(b.date, now)} (${b.date}) a las ${hourLabel(b.time)}, ${b.mins} min. Temas: ${topicTitles.join('; ')}.`
    + (b.note ? ` Nota: ${b.note}.` : '');
}
function tutoriaLink(text, phone = TUTORIAS.whatsapp) {
  const n = String(phone || '').replace(/\D/g, '');
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : '';
}

// ---- interfaz (usa S, view, save, openSheet, ask, toast, esc, ICON, COURSES, courseArt y findLesson de la app) ----
const tuCourse = id => COURSES.find(c => c.id === id);
const tuTitles = b => b.topics.map(id => findLesson(id)?.l.title).filter(Boolean);
const TU_ERRORS = {
  slot: 'Ese cupo ya no está disponible. Elige otra hora.',
  busy: 'Ya tienes una asesoría a esa hora.',
  max: `Puedes tener hasta ${TUTORIAS.max} asesorías pendientes. Cancela una para separar otra.`,
  topics: 'Elige al menos un tema para reforzar.',
  saldo: 'No te quedan horas para esta materia.',
  curso: 'Las asesorías son de los cursos que tienes comprados y vigentes.',
};

// Con cuenta, las asesorías están en la base y gastan horas (spec 2026-11-24-tienda-libros); sin candados (desarrollo) y en la
// cuenta administradora siguen guardadas en el dispositivo, para probar.
const tuServidor = () => typeof Cuenta !== 'undefined' && !!Cuenta.sb && !!Cuenta.user && !Cuenta.user.offline && !SIN_CANDADOS && !cuentaEsAdmin();
const tuTipo = id => (['calc', 'fis', 'int', 'lin'].includes(id) ? 'universidad' : 'general');   // igual que privado.tipo_asesoria
const tuSaldo = id => (typeof Tienda === 'undefined' ? 0 : Tienda.saldo[tuTipo(id)] || 0);
// Fila de la base → asesoría de la app (hora de Colombia).
function tuDeFila(r) {
  const d = new Date(new Date(r.inicio).getTime() - 5 * 3600000).toISOString();
  return { id: `srv-${r.id}`, course: r.curso, topics: r.temas, date: d.slice(0, 10), time: d.slice(11, 16), mins: r.minutos, note: r.nota, enlace: r.enlace, ok: r.estado === 'confirmada' };
}
async function asesoriasCarga() {
  if (!tuServidor()) return false;
  const uid = Cuenta.user.id, { data, error } = await Cuenta.sb.from('asesorias').select('*').eq('usuario', uid);
  if (error || !Cuenta.user || Cuenta.user.id !== uid) return false;
  S.tutorias = data.filter(r => ['pendiente', 'confirmada'].includes(r.estado)).map(tuDeFila); save();
  return true;
}

// ---- arma tu clase (spec 2026-11-25-tutorias-agenda): materia, hora y temas en la misma página, y un boleto que se llena ----
// Lo que falta para una asesoría: { d, h, m } o null si ya empezó. Pura.
function tuFalta(ms) {
  if (ms <= 0) return null;
  const m = Math.ceil(ms / 60000);
  return { d: Math.floor(m / 1440), h: Math.floor(m % 1440 / 60), m: m % 60 };
}
// La semana en rejilla: horas (filas) y días con atención (columnas). Cada casilla: 'libre', 'tuya' o '' (no hay o ya pasó). Pura.
function tuRejilla(days, hours = TUTORIAS.hours) {
  const dias = days.filter(d => (hours[tuDate(d.date).getDay()] || []).length), filas = [...new Set(dias.flatMap(d => hours[tuDate(d.date).getDay()]))].sort();
  return { dias, filas, celda: (d, t) => { const x = d.slots.find(y => y.time === t); return x ? (x.free ? 'libre' : 'tuya') : ''; } };
}
// Enlace para guardarla en Google Calendar (horas en UTC). Pura.
function tuCalendario(b, titulo, detalle) {
  const f = t => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${f(tuStart(b))}/${f(tuEnd(b))}&details=${encodeURIComponent(detalle)}`;
}
// Borrador: se conserva al cambiar de pestaña. `hecha`: la que se acaba de separar.
const tuNuevo = () => ({ c: '', unit: 0, topics: [], date: null, time: null, note: '', hecha: null });
let tuB = tuNuevo(), tuDe = null, tuOcupado = false;   // tuDe: de qué cuenta es el borrador
const tuUid = () => (typeof Cuenta !== 'undefined' && Cuenta.user?.id) || '';
const tuCursos = () => cursosVisibles().filter(c => cursoComprado(c, true)).sort((a, b) => (b.id === S.course) - (a.id === S.course));
function tuElige(c) {
  tuB = { ...tuB, c: c.id, topics: [], hecha: null, unit: Math.max(0, c.units.findIndex(u => u.lessons.some(l => !S.done[l.id]))) };
}
const tuHuso = () => (new Date().getTimezoneOffset() === 300 ? '' : ' · hora de Colombia');

// La próxima, en grande y con cuenta regresiva; las demás, debajo.
function tuProximaHTML(mine, now) {
  if (!mine.length) return '';
  const una = (b, grande) => {
    const c = tuCourse(b.course), titles = tuTitles(b), n = c?.name || 'Asesoría';
    return `<article class="tu-prox${grande ? ' grande' : ''}" style="--c:${c?.color || 'var(--brand)'}">
      ${c ? courseArt(c, grande ? 'xl' : 'lg') : ''}<div class="tp-txt">${grande ? '<p class="tp-eyebrow">Tu próxima clase</p>' : ''}<h2>${esc(n)}</h2><p class="tp-cuando"><b>${esc(dayLabel(b.date, now))}, ${hourLabel(b.time)}</b>${tuHuso()}${b.ok ? '<span class="tu-ok">Confirmada</span>' : ''}</p>
        ${titles.length || b.note ? `<p class="tp-temas">${esc(titles.join(' · '))}${b.note ? `${titles.length ? ' · ' : ''}«${esc(b.note)}»` : ''}</p>` : ''}
        <div class="tp-acts">${/^https:/.test(b.enlace || '') ? `<a class="btn brand" href="${esc(b.enlace)}" target="_blank" rel="noopener">Entrar a la reunión</a>` : ''}<a class="tu-link" href="${esc(tuCalendario(b, `Asesoría Zuka: ${n}`, titles.join('; ')))}" target="_blank" rel="noopener">Guardar en mi calendario</a><button class="tu-link mal" type="button" data-cancel="${esc(b.id)}" aria-label="Cancelar la asesoría de ${esc(n)}">Cancelar</button></div></div>
      ${grande ? `<div class="tp-reloj" data-inicio="${tuStart(b)}" role="timer" aria-label="Lo que falta"></div>` : ''}</article>`;
  };
  return `<section class="tu-mias" aria-label="Tus asesorías">${una(mine[0], true)}${mine.length > 1 ? `<div class="tu-otras">${mine.slice(1).map(b => una(b, false)).join('')}</div>` : ''}</section>`;
}
function tuRelojPinta(el) {
  const f = tuFalta(+el.dataset.inicio - Date.now());
  el.innerHTML = f ? [[f.d, f.d === 1 ? 'día' : 'días'], [f.h, f.h === 1 ? 'hora' : 'horas'], [f.m, 'min']].filter((x, i) => i || x[0]).map(([n, t]) => `<span><b>${n}</b><small>${t}</small></span>`).join('') : '<span class="ya"><b>¡Ya empezó!</b></span>';
}
let tuReloj = 0;

function renderTutorias() {
  const now = Date.now(), mine = activeTutorias(S.tutorias, now);
  if (!Array.isArray(S.tutorias) || mine.length !== S.tutorias.length) { S.tutorias = mine; save(); }   // las que ya pasaron se van
  if (tuDe !== tuUid()) { tuB = tuNuevo(); tuDe = tuUid(); }
  // Un repintado desde afuera (vuelve a la app, llega el pago) no mueve la página ni quita el foco de la nota.
  const nota = $('#tu-nota', view), sel = nota && document.activeElement === nota ? [nota.selectionStart, nota.selectionEnd] : null, y = $('.tu', view) ? view.scrollTop : 0;
  const courses = tuCursos(), srv = tuServidor();
  if (!courses.some(c => c.id === tuB.c)) { if (courses[0]) tuElige(courses[0]); else tuB.c = ''; }
  const fichas = (n, t) => `<span class="tu-saldo"><span aria-hidden="true">${Array.from({ length: Math.min(8, n) }, () => ICON.clock).join('')}</span><b>${n}</b> ${t}</span>`;
  view.innerHTML = `<div class="tutorias"><div class="tu">
    <header class="tu-head"><div><h1>Tutorías</h1><p class="muted">Una hora con un profe, en vivo, sobre lo que más te cuesta.</p></div>
      ${srv && (courses.length || Tienda.saldo.general + Tienda.saldo.universidad) ? `<div class="tu-horas">${fichas(Tienda.saldo.general, Tienda.saldo.general === 1 ? 'hora general' : 'horas generales')}${Tienda.saldo.universidad ? fichas(Tienda.saldo.universidad, 'de universidad') : ''}<button class="btn sm ghost" type="button" data-horas>Comprar horas</button></div>` : ''}</header>
    ${tuProximaHTML(mine, now)}
    ${courses.length ? `<section class="tu-arma" aria-label="Arma tu clase"><h2 class="tu-t">${mine.length ? 'Arma otra clase' : 'Arma tu clase'}</h2><div class="tu-cols"><div class="tu-pasos"></div><aside class="tu-boleto" aria-label="Tu boleto"></aside></div></section>`
    : `<div class="m-empty tu-vacio">${mascotSVG('think')}<p>Las asesorías son de los cursos que tienes comprados. Compra uno y sepáralas aquí.</p><button class="btn brand" type="button" data-cursos>Ver los cursos</button></div>`}
    ${srv || tutoriaLink('x') ? '' : '<p class="tu-note">Por ahora la asesoría se guarda solo en este dispositivo.</p>'}
  </div></div>`;
  $('[data-cursos]', view)?.addEventListener('click', () => openTienda('cursos'));
  $('[data-horas]', view)?.addEventListener('click', () => openTienda('asesorias'));
  clearInterval(tuReloj);
  const reloj = $('.tp-reloj', view);
  if (reloj) { tuRelojPinta(reloj); tuReloj = setInterval(() => (reloj.isConnected ? tuRelojPinta(reloj) : clearInterval(tuReloj)), 15000); }
  view.querySelectorAll('[data-cancel]').forEach(b => b.onclick = () => tuCancela(b.dataset.cancel));
  if (courses.length) tuPinta(courses);
  view.scrollTop = y;
  if (sel && $('#tu-nota', view)) { $('#tu-nota', view).focus({ preventScroll: true }); $('#tu-nota', view).setSelectionRange(...sel); }
}
function tuCancela(id) {
  const bk = S.tutorias.find(x => x.id === id);
  if (!bk) return renderTutorias();
  if (tuServidor() && !bk.id.startsWith('srv-')) return asesoriasCarga().catch(() => false).then(ok => { if (tab === 'tutorias') renderTutorias(); toast(ok ? 'Listo: ya puedes cancelarla.' : 'No se pudo cargar. Revisa tu conexión.'); });
  if (bk.id.startsWith('srv-') && !tuServidor()) return toast('Necesitas conexión para cancelarla.');
  ask({ title: '¿Cancelar esta asesoría?', text: `${tuCourse(bk.course)?.name || 'Asesoría'}: ${dayLabel(bk.date, Date.now())}, ${hourLabel(bk.time)}. ${!tuServidor() ? 'Puedes separar otra cuando quieras.' : tuStart(bk) - Date.now() >= 12 * 3600000 ? 'La hora vuelve a tu saldo.' : 'Faltan menos de 12 horas: la hora no vuelve a tu saldo.'}`, ok: 'Sí, cancelar', cancel: 'Conservarla', danger: true })
    .then(async yes => {
      if (!yes) return;
      if (tuB.hecha?.id === bk.id || tuB.hecha?.date === bk.date && tuB.hecha?.time === bk.time) tuB.hecha = null;
      if (tuServidor()) {
        const r = await Cuenta.sb.rpc('cancelar_asesoria', { p_id: Number(bk.id.slice(4)) }).then(x => x, x => ({ error: x }));
        if (r.error) return toast('No se pudo cancelar. Revisa tu conexión.');
        await Promise.all([asesoriasCarga(), tiendaMios()]); if (tab === 'tutorias') renderTutorias();
        return toast(r.data && r.data.vuelve ? 'Cancelada: la hora volvió a tu saldo.' : 'Asesoría cancelada.');
      }
      S.tutorias = cancelTutoria(S.tutorias, bk.id); save(); if (tab === 'tutorias') renderTutorias(); toast('Asesoría cancelada.');
    });
}
// Los tres pasos y el boleto. Cambiar algo redibuja solo lo suyo.
function tuPinta(courses) {
  const pasos = $('.tu-pasos', view), boleto = $('.tu-boleto', view), now = Date.now(), days = tutoriaDays(now, S.tutorias), R = tuRejilla(days);
  const lleno = activeTutorias(S.tutorias, now).length >= TUTORIAS.max, c = () => tuCourse(tuB.c);
  const dia = () => days.find(d => d.date === tuB.date), sigue = () => dia()?.slots.some(s => s.time === tuB.time && s.free);
  if (!tuB.hecha && tuB.time && !sigue()) { tuB.date = tuB.time = null; }
  const hayCupo = R.dias.some(d => d.slots.some(s => s.free));
  pasos.innerHTML = `<section class="tu-paso"><h3><i>1</i>La materia</h3><div class="tu-materias" role="radiogroup" aria-label="Materia">${courses.map(x => `<button type="button" class="tu-mat" role="radio" data-mat="${x.id}" style="--c:${x.color}">${courseArt(x, 'lg')}<b>${esc(x.name)}</b></button>`).join('')}</div></section>
    <section class="tu-paso"><h3><i>2</i>El día y la hora<small>${tuHuso().slice(3)}</small></h3>${lleno ? `<p class="tu-aviso">Ya tienes ${TUTORIAS.max} asesorías pendientes. Cancela una para separar otra.</p>` : !hayCupo ? '<p class="tu-aviso">No quedan cupos esta semana.</p>' : `<div class="tu-ficha-fila"><span class="tu-ficha" aria-hidden="true"></span><p>Toca una casilla, o arrastra la ficha hasta la hora que te sirva.</p></div>
      <div class="tu-semana" role="group" aria-label="Horas de la semana" style="--n:${R.dias.length}"><span></span>${R.dias.map(d => { const x = tuDate(d.date), l = dayLabel(d.date, now); return `<span class="ts-dia${l === 'Hoy' ? ' hoy' : ''}"><small>${l === 'Hoy' ? 'hoy' : TU_DOW[x.getDay()]}</small><b>${x.getDate()}</b></span>`; }).join('')}
      ${R.filas.map(t => `<span class="ts-hora">${hourLabel(t).replace(':00', '').replace('a. m.', 'am').replace('p. m.', 'pm')}</span>${R.dias.map(d => { const e = R.celda(d, t); return e === 'libre' ? `<button type="button" class="ts-c" data-d="${d.date}" data-t="${t}" aria-label="${esc(dayLabel(d.date, now))}, ${hourLabel(t)}"></button>` : `<span class="ts-c ${e}"${e ? ` title="Ya tienes una asesoría a esa hora"` : ''}></span>`; }).join('')}`).join('')}</div>`}</section>
    <section class="tu-paso"><h3><i>3</i>Los temas<small class="tu-cuenta"></small></h3><div class="tu-unis" role="group" aria-label="Mundo"></div><div class="tu-lecs" role="group" aria-label="Temas"></div>
      <label class="tu-nota" for="tu-nota">¿Algo más que deba saber el profe? (opcional)</label><textarea id="tu-nota" class="ag-topic" rows="2" maxlength="140" placeholder="Ej.: tengo parcial el viernes y me enredo con los signos">${esc(tuB.note)}</textarea></section>`;
  const q = s => $(s, pasos), qa = s => [...pasos.querySelectorAll(s)];
  const pintaMat = () => { qa('[data-mat]').forEach(b => { const on = b.dataset.mat === tuB.c; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; }); $('.tu-arma', view).style.setProperty('--c', c().color); const f = q('.tu-ficha'); if (f) f.innerHTML = courseArt(c(), 'md'); };
  const pintaHora = () => qa('button.ts-c').forEach(b => { const on = !tuB.hecha && b.dataset.d === tuB.date && b.dataset.t === tuB.time; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.innerHTML = on ? courseArt(c(), 'md') : ''; });
  const pintaTemas = () => {
    const us = c().units, x = q('.tu-unis').scrollLeft, lleno4 = tuB.topics.length >= TUTORIAS.maxTopics;
    q('.tu-unis').innerHTML = us.map((u, i) => { const w = WORLDS[u.world] || { name: u.title }, n = u.lessons.filter(l => tuB.topics.includes(l.id)).length; return `<button type="button" class="tu-uni" data-uni="${i}" aria-pressed="${i === tuB.unit}" style="--c:${c().color}"><span class="world-art" aria-hidden="true">${w.art || ''}</span><span>${esc(w.name)}</span>${n ? `<b>${n}<span class="tu-sr"> elegidos</span></b>` : ''}</button>`; }).join('');
    q('.tu-unis').scrollLeft = x;
    q('.tu-lecs').innerHTML = us[tuB.unit].lessons.map(l => { const on = tuB.topics.includes(l.id); return `<button type="button" class="tu-lec" data-lec="${l.id}" aria-pressed="${on}"${!on && lleno4 ? ' disabled' : ''}><i>${on ? ICON.check : ''}</i><span>${esc(l.title)}</span></button>`; }).join('');
    q('.tu-cuenta').textContent = `${tuB.topics.length} de ${TUTORIAS.maxTopics}`;
  };
  const pintaBoleto = (nuevo = '') => {
    if (tuOcupado) { if (!boleto.firstChild) boleto.innerHTML = '<p role="status">Separando tu asesoría…</p>'; return; }   // el boleto no cambia
    const h = tuB.hecha, b = h || tuB, x = h ? tuCourse(h.course) : c(), sin = tuServidor() && !h && tuSaldo(x.id) < 1, ts = h ? tuTitles(h) : tuB.topics.map(id => findLesson(id)?.l.title || '');
    const fecha = b.date && b.time, falta = lleno ? 'Ya tienes el máximo de asesorías.' : sin ? 'No te quedan horas para esta materia.' : !fecha ? 'Elige el día y la hora.' : !tuB.topics.length ? 'Elige al menos un tema.' : '';
    boleto.style.setProperty('--c', x.color); boleto.classList.toggle('listo', !h && !falta); boleto.classList.toggle('hecha', !!h);
    boleto.innerHTML = `<div class="tb-cab">${courseArt(x, 'lg')}<div><small>Asesoría virtual · ${b.mins || TUTORIAS.mins} min</small><b>${esc(x.name)}</b></div></div>
      <div class="tb-corte" aria-hidden="true"></div>
      <dl><div class="${nuevo === 'hora' ? 'pop' : ''}"><dt>Cuándo</dt><dd>${fecha ? `<b>${esc(dayLabel(b.date, now))}</b>, ${hourLabel(b.time)}` : '<i>Por elegir</i>'}</dd></div></dl>
      <ul class="tb-temas" aria-label="Temas">${Array.from({ length: h ? ts.length : TUTORIAS.maxTopics }, (_, i) => (ts[i] ? `<li class="${nuevo === 'tema' && i === ts.length - 1 ? 'pop' : ''}"><span>${esc(ts[i])}</span>${h ? '' : `<button type="button" data-quita="${esc(tuB.topics[i])}" aria-label="Quitar ${esc(ts[i])}">${ICON.x}</button>`}</li>` : `<li class="hueco"><span>${i ? '' : 'Tu primer tema'}</span></li>`)).join('')}</ul>
      ${h ? `<span class="tb-sello" aria-hidden="true">Separada</span><div class="tb-pie" role="status"><p><b class="tu-fin" tabindex="-1">¡Asesoría separada!</b> ${h.wa ? 'Avísale a coordinación por WhatsApp para confirmar tu cupo y recibir el enlace.' : h.srv ? 'Te confirmamos y te enviamos el enlace. Lo verás arriba.' : 'Quedó guardada en este dispositivo. Todavía no le avisa a ningún tutor.'}</p>
        ${h.wa ? `<a class="btn brand" href="${esc(h.wa)}" target="_blank" rel="noopener">Avisar por WhatsApp</a>` : ''}<button class="btn ghost" type="button" data-otra>Armar otra</button></div>`
        : `<div class="tb-pie"><p role="status">${falta || 'Todo listo.'}</p>${sin ? '<button class="btn brand" type="button" data-horas2>Comprar horas</button>' : `<button class="btn brand" type="button" data-ok${falta ? ' disabled' : ''}>Separar asesoría</button>`}</div>`}`;
    const z = s => $(s, boleto);
    boleto.querySelectorAll('[data-quita]').forEach(k => { k.onclick = () => { if (tuOcupado) return; tuB.topics = toggleTopic(tuB.topics, k.dataset.quita); pintaTemas(); pintaBoleto(); (z('[data-quita]') || q('.tu-lec:not(:disabled)'))?.focus({ preventScroll: true }); }; });
    if (z('[data-ok]')) z('[data-ok]').onclick = () => tuSepara();
    if (z('[data-horas2]')) z('[data-horas2]').onclick = () => openTienda('asesorias');
    if (z('[data-otra]')) z('[data-otra]').onclick = () => { tuB = { ...tuB, hecha: null, topics: [], date: null, time: null, note: '' }; renderTutorias(); $('.tu-mat[aria-checked="true"]', view)?.focus({ preventScroll: true }); };
  };
  const limpia = () => { if (tuB.hecha) tuB.hecha = null; };
  const mat = id => { if (tuOcupado) return; tuElige(tuCourse(id)); pintaMat(); pintaHora(); pintaTemas(); pintaBoleto(); q('.tu-unis').scrollLeft = Math.max(0, (q('.tu-uni[aria-pressed="true"]')?.offsetLeft || 0) - q('.tu-unis').offsetLeft - 16); };
  const hora = (d, t) => { if (tuOcupado) return; limpia(); tuB.date = d; tuB.time = t; pintaHora(); pintaBoleto('hora'); };
  pasos.onclick = e => {
    const b = e.target.closest('button'); if (!b || b.disabled || tuOcupado) return;
    const d = b.dataset;
    if (d.mat) return mat(d.mat);
    if (d.t) return hora(d.d, d.t);
    if (d.uni) { tuB.unit = +d.uni; pintaTemas(); return q(`[data-uni="${d.uni}"]`).focus({ preventScroll: true }); }
    if (d.lec) { limpia(); const n = tuB.topics.length; tuB.topics = toggleTopic(tuB.topics, d.lec); pintaTemas(); pintaBoleto(tuB.topics.length > n ? 'tema' : ''); q(`[data-lec="${d.lec}"]`)?.focus({ preventScroll: true }); }
  };
  q('.tu-materias').onkeydown = e => { const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return; e.preventDefault(); const i = (courses.findIndex(x => x.id === tuB.c) + k + courses.length) % courses.length; mat(courses[i].id); q(`[data-mat="${courses[i].id}"]`).focus({ preventScroll: true }); };
  // La semana con flechas: se salta a la casilla libre más cercana en esa dirección.
  const sem = q('.tu-semana');
  if (sem) sem.onkeydown = e => {
    const k = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[e.key], b = e.target.closest('button.ts-c'); if (!k || !b) return;
    e.preventDefault(); let x = R.dias.findIndex(d => d.date === b.dataset.d), y = R.filas.indexOf(b.dataset.t);
    for (let n = 0; n < 12; n++) { x += k[0]; y += k[1]; if (x < 0 || y < 0 || x >= R.dias.length || y >= R.filas.length) return; const o = q(`button.ts-c[data-d="${R.dias[x].date}"][data-t="${R.filas[y]}"]`); if (o) return o.focus(); }
  };
  $('#tu-nota', pasos).oninput = e => { tuB.note = e.target.value; };
  // La ficha se arrastra a una casilla.
  const f = q('.tu-ficha');
  if (f) {
    let id = null, cop = null, sobre = null;
    const marca = o => { if (sobre === o) return; sobre?.classList.remove('sobre'); sobre = o; sobre?.classList.add('sobre'); };
    const fin = e => { if (e.pointerId !== id) return; id = null; cop?.remove(); cop = null; f.classList.remove('fuera'); sem.classList.remove('espera'); const o = e.type === 'pointerup' ? sobre : null; marca(null); if (o) hora(o.dataset.d, o.dataset.t); };
    f.onpointerdown = e => { if (e.button) return; id = e.pointerId; f.setPointerCapture(id); cop = f.cloneNode(true); cop.classList.add('vuela'); document.body.append(cop); f.classList.add('fuera'); sem.classList.add('espera'); f.onpointermove(e); };
    f.onpointermove = e => { if (e.pointerId !== id || !cop) return; if (!f.isConnected) { cop.remove(); cop = null; id = null; return; } cop.style.left = `${e.clientX / zk()}px`; cop.style.top = `${e.clientY / zk()}px`; marca(document.elementFromPoint(e.clientX, e.clientY)?.closest('button.ts-c') || null); };
    f.onpointerup = fin; f.onpointercancel = fin; f.onlostpointercapture = fin;
    f.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
  }
  document.querySelectorAll('body > .tu-ficha').forEach(x => x.remove());
  pintaMat(); pintaHora(); pintaTemas(); pintaBoleto();
  q('.tu-unis').scrollLeft = Math.max(0, (q('.tu-uni[aria-pressed="true"]')?.offsetLeft || 0) - q('.tu-unis').offsetLeft - 16);
}
async function tuSepara() {
  const c = tuCourse(tuB.c), ok = $('.tu-boleto [data-ok]', view), n = Date.now();
  if (!c || !ok || ok.disabled || tuOcupado) return;
  if (!cursoComprado(c, true)) return toast(TU_ERRORS.curso);
  if (typeof planMotivo === 'function' && planMotivo('tutorias')) return openBloqueo('tutorias');   // tutorías: con horas en el saldo
  const req = { course: c.id, topics: tuB.topics, date: tuB.date, time: tuB.time, note: tuB.note }, r = bookTutoria(S.tutorias, req, n, tutoriaCatalog(COURSES));
  if (!r.ok) { toast(TU_ERRORS[r.error] || TU_ERRORS.slot); if (r.error === 'slot' || r.error === 'busy') { tuB.date = tuB.time = null; } return renderTutorias(); }
  const srv = tuServidor(), uid = tuUid();
  if (srv) {
    tuOcupado = true; ok.disabled = true; ok.textContent = 'Un momento…';
    const x = await Cuenta.sb.rpc('separar_asesoria', { p: { curso: req.course, temas: req.topics, fecha: req.date, hora: req.time, nota: req.note } }).then(y => y, y => ({ error: y }));
    const [cargo] = await Promise.all([asesoriasCarga().catch(() => false), tiendaMios().catch(() => {})]);
    tuOcupado = false;
    if (uid !== tuUid()) { if (tab === 'tutorias') renderTutorias(); return; }   // cambió de cuenta mientras tanto
    // Se separó pero no se pudo recargar: queda a la vista hasta la próxima carga.
    if (!x.error && cargo !== true) { S.tutorias = r.list; save(); }
    if (x.error) { toast(TU_ERRORS[x.error.message] || 'No se pudo separar. Revisa tu conexión.'); if (tab === 'tutorias') renderTutorias(); return; }
  } else { S.tutorias = r.list; save(); }
  const b = r.booking, wa = tutoriaLink(tutoriaText(b, S.name, c.name, tuTitles(b), n), (typeof Cuenta !== 'undefined' && Cuenta.ajustes.whatsapp) || TUTORIAS.whatsapp);
  tuB = { ...tuB, hecha: { ...b, wa, srv }, topics: [], date: null, time: null, note: '' };
  if (tab !== 'tutorias') return;
  const y = view.scrollTop; renderTutorias(); view.scrollTop = y;
  $('.tu-fin', view)?.focus(); $('.tu-boleto', view)?.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
