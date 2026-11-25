// Metas que pone la institución del estudiante (spec 2026-11-25-instituciones): tarjeta en Inicio. Va después de inicio.js.
const metaEstado = (m, done) => { const n = m.lecciones.filter(l => done[l]).length; return { n, total: m.lecciones.length, sigue: m.lecciones.find(l => !done[l]) || null }; };
const metaPlazo = (hasta, hoy) => { const d = Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${hoy}T00:00:00Z`)) / 86400000); return d < 0 ? 'Ya pasó la fecha' : d === 0 ? 'Es para hoy' : d === 1 ? 'Es para mañana' : `Quedan ${d} días`; };
function metasHTML() {
  const ms = (Cuenta.inst.metas || []).map(m => ({ m, x: metaEstado(m, S.done), c: COURSES.find(c => c.id === m.curso) })).filter(x => x.c && (x.x.sigue || metaPlazo(x.m.hasta, today()) !== 'Ya pasó la fecha'));
  if (!ms.length) return '';
  return `<section class="hm-metas"><h2 class="home-h2">Metas de ${esc(Cuenta.inst.nombres[0] || 'tu institución')}</h2><div class="hm-mt">${ms.map(({ m, x, c }) => `<article style="--c:${c.color}">${aroHTML(x.n / x.total, courseArt(c, 'md'))}<div><b>${esc(m.titulo)}</b><small>${esc(c.name)} · ${x.n} de ${x.total} lecciones</small><small>${x.sigue ? metaPlazo(m.hasta, today()) : '¡Meta cumplida!'}</small></div>
    ${x.sigue ? `<button class="btn ghost sm" type="button" data-meta-ir="${esc(x.sigue)}" data-meta-c="${c.id}">Seguir</button>` : ''}</article>`).join('')}</div></section>`;
}
function metasBind(root) {
  root.querySelectorAll('[data-meta-ir]').forEach(b => { b.onclick = () => { const f = findLesson(b.dataset.metaIr); if (f && isUnlocked(f.c, f.l)) startLesson(f.c, f.l); else openCourse(b.dataset.metaC); }; });
}
