// Avance completo en la nube (tabla `estado_app`, spec 2026-11-24-acceso-por-codigo): XP, racha, evaluaciones, gimnasio,
// guardados… para que el mismo código muestre lo mismo en cualquier dispositivo. Las lecciones van aparte (`progreso`).
// Se junta con lo que haya en la nube: ningún dispositivo borra lo que hizo otro.

const ESTADO_MAPAS = ['saved', 'likes', 'watched', 'guides'];
const ESTADO_CAMPOS = ['name', 'xp', 'correct', 'answered', 'streak', 'maxStreak', 'lastDay', 'goal', 'course', 'lastLesson', 'misCursos',
  'tutorias', 'today', 'tourDone', 'days', 'exams', 'gym', ...ESTADO_MAPAS];

const estadoToma = s => Object.fromEntries(ESTADO_CAMPOS.filter(k => s[k] !== undefined && s[k] !== null).map(k => [k, s[k]]));

// `local` manda en las preferencias; en lo ganado, lo mejor de los dos. Pura.
function estadoMezcla(local, nube) {
  const a = local || {}, b = nube || {}, r = { ...b, ...a };
  const max = k => { const v = Math.max(Number(a[k]) || 0, Number(b[k]) || 0); if (a[k] !== undefined || b[k] !== undefined) r[k] = v; };
  ['xp', 'maxStreak'].forEach(max);
  const mas = (Number(b.answered) || 0) > (Number(a.answered) || 0) ? b : a;   // aciertos y respuestas van juntos
  if (mas.answered !== undefined) { r.answered = mas.answered; r.correct = mas.correct || 0; }
  const la = a.lastDay || '', lb = b.lastDay || '', rac = lb > la || (lb === la && (b.streak || 0) > (a.streak || 0)) ? b : a;
  if (rac.lastDay) { r.lastDay = rac.lastDay; r.streak = rac.streak || 0; }
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
  if ((b.tutorias || []).length && !(a.tutorias || []).length) r.tutorias = b.tutorias;
  if (!a.name && b.name) r.name = b.name;
  if (!a.answered && b.answered && b.goal) r.goal = b.goal;
  if (!a.lastLesson && b.lastLesson) { r.lastLesson = b.lastLesson; if (b.course) r.course = b.course; }
  r.tourDone = !!(a.tourDone || b.tourDone);
  return r;
}

// ---------- subir y bajar ----------
let estadoSubido = '', estadoTimer = null, estadoEnCurso = null;
const estadoTexto = () => JSON.stringify(estadoToma(S));
const estadoListo = () => Cuenta.sb && Cuenta.user && !Cuenta.user.offline && (S.cuenta || {}).uid === Cuenta.user.id;

// Junta y guarda. Tras «Reiniciar progreso» (S.estadoNuevo) lo local reemplaza a lo de la nube.
async function estadoSync() {
  if (!estadoListo()) return false;
  if (estadoEnCurso) return estadoEnCurso;
  estadoEnCurso = (async () => {
    const uid = Cuenta.user.id;
    try {
      const { data, error } = await Cuenta.sb.from('estado_app').select('datos').eq('usuario', uid).maybeSingle();
      if (error || !estadoListo() || Cuenta.user.id !== uid) return false;
      const datos = S.estadoNuevo || !data ? estadoToma(S) : estadoMezcla(estadoToma(S), data.datos);
      Object.assign(S, datos); save();
      const up = await Cuenta.sb.from('estado_app').upsert({ usuario: uid, datos, actualizado_en: new Date().toISOString() });
      if (up.error) return false;
      if (Cuenta.user && Cuenta.user.id === uid) { delete S.estadoNuevo; save(); estadoSubido = JSON.stringify(datos); }
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
  if (estadoListo() && (S.estadoNuevo || estadoTexto() !== estadoSubido)) return estadoSync();
  return Promise.resolve(true);
}
function estadoPronto() { clearTimeout(estadoTimer); estadoTimer = setTimeout(estadoEnvia, 4000); }
// Otra cuenta entra en este dispositivo: lo ganado por la anterior no se le pasa.
function estadoLimpia() {
  const d = DEFAULTS();
  ESTADO_CAMPOS.forEach(k => { if (k in d) S[k] = d[k]; else delete S[k]; });
  delete S.estadoNuevo;
  estadoSubido = '';
}
if (typeof document !== 'undefined' && document.addEventListener) {
  setInterval(() => { if (!document.hidden) estadoEnvia(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) estadoEnvia(); });
}
