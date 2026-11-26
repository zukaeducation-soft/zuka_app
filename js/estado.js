// Avance completo en la nube (tabla `estado_app`, spec 2026-11-24-acceso-por-codigo): XP, racha, evaluaciones, gimnasio,
// guardados… para que el mismo código muestre lo mismo en cualquier dispositivo. Las lecciones van aparte (`progreso`).
// Se junta con lo que haya en la nube: ningún dispositivo borra lo que hizo otro.

const ESTADO_MAPAS = ['saved', 'likes', 'watched', 'guides'];
const ESTADO_CAMPOS = ['reinicio', 'name', 'xp', 'correct', 'answered', 'streak', 'maxStreak', 'lastDay', 'goal', 'course', 'lastLesson', 'misCursos', 'libros',
  'today', 'tourDone', 'carne', 'days', 'exams', 'gym', ...ESTADO_MAPAS];

const estadoToma = s => Object.fromEntries(ESTADO_CAMPOS.filter(k => s[k] !== undefined && s[k] !== null).map(k => [k, s[k]]));

const estadoDia = d => Math.round(Date.parse(`${d}T00:00:00Z`) / 86400000);
// `local` manda en las preferencias; en lo ganado, lo mejor de los dos. Si uno reinició su progreso después, manda ese.
// Pura.
function estadoMezcla(local, nube) {
  // Solo los campos de hoy: lo que guardó una versión vieja (p. ej. `tutorias`, que ya vive en la base) no vuelve.
  const solo = x => Object.fromEntries(ESTADO_CAMPOS.filter(k => x && x[k] !== undefined).map(k => [k, x[k]]));
  const a = solo(local), b = solo(nube);
  if ((a.reinicio || 0) !== (b.reinicio || 0) && nube && local) return (a.reinicio || 0) > (b.reinicio || 0) ? { ...a } : b;
  const r = { ...b, ...a };
  const max = k => { const v = Math.max(Number(a[k]) || 0, Number(b[k]) || 0); if (a[k] !== undefined || b[k] !== undefined) r[k] = v; };
  ['xp', 'maxStreak'].forEach(max);
  const mas = (Number(b.answered) || 0) > (Number(a.answered) || 0) ? b : a;   // aciertos y respuestas van juntos
  if (mas.answered !== undefined) { r.answered = mas.answered; r.correct = mas.correct || 0; }
  const la = a.lastDay || '', lb = b.lastDay || '', rac = lb > la || (lb === la && (b.streak || 0) > (a.streak || 0)) ? b : a;
  if (rac.lastDay) {
    r.lastDay = rac.lastDay; r.streak = rac.streak || 0;
    // Dos dispositivos: si la racha del otro llega hasta la víspera de esta (o se cruza), es la misma y empieza donde empezó la más vieja.
    const otra = rac === a ? b : a;
    if (otra.lastDay && otra.streak && r.streak) {
      const fin = estadoDia(r.lastDay), ini = fin - r.streak + 1, ini2 = estadoDia(otra.lastDay) - otra.streak + 1;
      if (estadoDia(otra.lastDay) >= ini - 1 && ini2 < ini) r.streak = fin - ini2 + 1;
    }
    r.maxStreak = Math.max(r.maxStreak || 0, r.streak);
  }
  const ta = a.today, tb = b.today;
  if (tb && (!ta || !ta.day || tb.day > ta.day || (tb.day === ta.day && (tb.xp || 0) > (ta.xp || 0)))) r.today = tb;
  ESTADO_MAPAS.forEach(k => { if (a[k] || b[k]) r[k] = { ...b[k], ...a[k] }; });
  if (a.days || b.days) {
    r.days = { ...b.days };
    Object.entries(a.days || {}).forEach(([d, n]) => { r.days[d] = Math.max(n, r.days[d] || 0); });
  }
  ['exams', 'gym'].forEach(k => {
    if (!a[k] && !b[k]) return;
    r[k] = { ...b[k] };
    Object.entries(a[k] || {}).forEach(([id, x]) => {
      const y = r[k][id];
      const nuevo = y && (y.at || 0) > (x.at || 0) ? y : x;
      r[k][id] = y ? { ...nuevo, best: Math.max(x.best || 0, y.best || 0) } : x;
    });
  });
  if (a.misCursos || b.misCursos) r.misCursos = [...new Set([...(a.misCursos || []), ...(b.misCursos || [])])];
  if (!a.name && b.name) r.name = b.name;
  if (((b.carne || {}).at || 0) > ((a.carne || {}).at || 0)) r.carne = b.carne;   // el carné, el que se cambió de último
  if (!a.answered && b.answered && b.goal) r.goal = b.goal;
  if (!a.lastLesson && b.lastLesson) { r.lastLesson = b.lastLesson; if (b.course) r.course = b.course; }
  r.tourDone = !!(a.tourDone || b.tourDone);
  return r;
}

// ---------- subir y bajar ----------
let estadoSubido = '', estadoTimer = null, estadoEnCurso = null;
const estadoTexto = () => JSON.stringify(estadoToma(S));
const estadoListo = () => Cuenta.sb && Cuenta.user && !Cuenta.user.offline && (S.cuenta || {}).uid === Cuenta.user.id;

// Junta y guarda. En `_unir` deja el panel el avance de otra cuenta que se unió a esta.
async function estadoSync() {
  if (!estadoListo()) return false;
  if (estadoEnCurso) return estadoEnCurso;
  estadoEnCurso = (async () => {
    const uid = Cuenta.user.id;
    try {
      const { data, error } = await Cuenta.sb.from('estado_app').select('datos').eq('usuario', uid).maybeSingle();
      if (error || !estadoListo() || Cuenta.user.id !== uid) return false;
      const nube = data && data.datos;
      let datos = nube ? estadoMezcla(estadoToma(S), nube) : estadoToma(S);
      ((nube && nube._unir) || []).forEach(x => { datos = estadoMezcla(datos, { ...x, reinicio: datos.reinicio }); });
      const ans = S.answered || 0, cor = S.correct || 0;
      Object.assign(S, datos); save();
      if (uso.ans != null) { uso.ans += (S.answered || 0) - ans; uso.ok += (S.correct || 0) - cor; }   // lo hecho en otro dispositivo no cuenta como de hoy
      const texto = estadoTexto();
      const up = await Cuenta.sb.from('estado_app').upsert({ usuario: uid, datos, actualizado_en: new Date().toISOString() });
      if (up.error) return false;
      if (Cuenta.user && Cuenta.user.id === uid) estadoSubido = texto;
      return true;
    } catch (e) { return false; }
  })();
  const ok = await estadoEnCurso;
  estadoEnCurso = null;
  return ok;
}
// Sube si algo cambió.
function estadoEnvia() {
  clearTimeout(estadoTimer);
  if (estadoListo() && estadoTexto() !== estadoSubido) return estadoSync();
  return Promise.resolve(true);
}
function estadoPronto() { clearTimeout(estadoTimer); estadoTimer = setTimeout(estadoEnvia, 4000); }
// Lo que quedara sin subir de una cuenta se aparta en el dispositivo y se junta cuando esa cuenta vuelva.
function estadoAparta(uid) {
  try { localStorage.setItem(`zuka-pend-${uid}`, JSON.stringify({ done: S.done, secs: S.secs, estado: estadoToma(S) })); } catch (e) { /* sin espacio */ }
}
function estadoRecupera(uid) {
  try {
    const x = JSON.parse(localStorage.getItem(`zuka-pend-${uid}`));
    if (!x) return;
    Object.assign(S.done, x.done);
    Object.entries(x.secs || {}).forEach(([k, n]) => { S.secs[k] = Math.max(S.secs[k] || 0, n); });
    Object.assign(S, estadoMezcla(estadoToma(S), x.estado));
    localStorage.removeItem(`zuka-pend-${uid}`); save();
  } catch (e) { /* sin copia */ }
}
// Otra pestaña de la misma cuenta guardó (`otro` es lo que dejó en el disco): se junta con lo de esta, para que el
// próximo save() de aquí no borre lo que se hizo allá. Pura, salvo que cambia `s`; false si no había nada que juntar.
function estadoJunta(s, otro) {
  if (!otro || ((otro.cuenta || {}).uid || '') !== ((s.cuenta || {}).uid || '')) return false;
  const ra = s.reinicio || 0, rb = otro.reinicio || 0;
  // Reinició allá: lo que allá ya no existe (gimnasio, última lección…) tampoco se queda aquí.
  if (rb > ra) { s.done = { ...otro.done }; s.secs = { ...otro.secs }; ESTADO_CAMPOS.forEach(k => { if (otro[k] === undefined) delete s[k]; }); }
  else if (rb === ra) {
    s.done = Object.assign(s.done || {}, otro.done);
    s.secs = s.secs || {};
    Object.entries(otro.secs || {}).forEach(([k, n]) => { s.secs[k] = Math.max(s.secs[k] || 0, n); });
  }
  Object.assign(s, estadoMezcla(estadoToma(s), otro));
  return true;
}
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('storage', e => {
    if (e.key !== KEY || !e.newValue) return;
    try {
      const ans = S.answered || 0, cor = S.correct || 0;
      estadoJunta(S, JSON.parse(e.newValue));
      // Lo respondido en la otra pestaña ya lo reporta ella: aquí no cuenta como uso de esta (igual que en estadoSync).
      if (typeof uso !== 'undefined' && uso.ans != null) { uso.ans += (S.answered || 0) - ans; uso.ok += (S.correct || 0) - cor; }
    } catch (err) { /* copia ilegible: se deja lo de esta pestaña */ }
  });
}
// Otra cuenta entra en este dispositivo: lo ganado por la anterior no se le pasa.
function estadoLimpia() {
  const d = DEFAULTS();
  ESTADO_CAMPOS.forEach(k => { if (k in d) S[k] = d[k]; else delete S[k]; });
  S.tutorias = []; delete S.libros;
  estadoSubido = '';
}
if (typeof document !== 'undefined' && document.addEventListener) {
  setInterval(() => { if (!document.hidden) estadoEnvia(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) estadoEnvia(); });
}
