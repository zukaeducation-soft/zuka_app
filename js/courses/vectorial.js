// Geometría Vectorial y Analítica (spec 2026-11-27-curso-geometria-vectorial): pone en COURSE_GEO las lecciones rehechas
// (GVA_LEC, de js/courses/vectorial-geo-N.js) y, cuando un mundo tiene todas sus lecciones rehechas, le arma su evaluación.
// Va después de data.js y antes de sin-escribir.js. El curso sigue en borrador hasta la revisión docente.
(() => {
  for (const u of COURSE_GEO.units) {
    for (const l of u.lessons) {
      const n = GVA_LEC[l.id];
      if (!n) continue;
      l.clip = { ...l.clip, scenes: n.scenes };
      l.ex = n.ex;
    }
    if (!u.lessons.every(l => GVA_LEC[l.id])) continue;
    const items = u.lessons.flatMap(l => GVA_LEC[l.id].items.map(([review, ex]) => ({ lesson: l.id, review,
      ex: { ...ex, kind: ex.kind || GVA.KIND, canvasGuide: true, exam: true, params: { ...ex.params, autoDemo: false } } })));
    const fila = GVA_TEMARIO.find(t => t[0] === u.world);
    u.exam = { id: `exam-geo-${u.world}`, title: `Evaluación · ${fila ? fila[1] : u.title}`, minutes: Math.max(8, Math.ceil(items.length * 1.5)), items };
    GVA_HECHOS.push(u.world);
  }
})();

// Simulacros de los parciales y de los quices (GVA_PRUEBAS): una sección en la pantalla del curso, debajo de los mundos. Cada uno
// se presenta con el motor de las evaluaciones (startExam) sobre una unidad hecha a la medida: sus lecciones son las del corte.
const gvaUnidad = (c, P) => ({ lessons: c.units.flatMap(u => u.lessons).filter(l => P.lessons.includes(l.id)), exam: P });
function gvaPruebasHTML(c) {
  if (c.id !== 'geo' || !GVA_PRUEBAS.length) return '';
  const llave = c.units.find(u => u.exam)?.exam.id, cerrado = typeof planMotivo === 'function' && llave && planMotivo(llave);
  const card = n => {
    const ps = GVA_PRUEBAS.filter(P => P.n === n).sort((a, b) => (a.tipo === 'quiz' ? -1 : 1) - (b.tipo === 'quiz' ? -1 : 1));
    if (!ps.length) return '';
    return `<article class="simi-card"><header><b>Corte ${n}</b><span>${GVA_CORTES[n - 1][1].length} lecciones</span></header>
      <div class="simi-pr">${ps.map(P => { const best = S.exams?.[P.id]?.best;
        return `<button type="button" data-gva-prueba="${P.id}"${cerrado ? ' data-lock="1"' : ''}><span>${esc(P.tipo === 'parcial' ? `Parcial ${n}` : `Quiz ${n}`)}</span><small>${cerrado ? ICON.lock : best != null ? `Mejor: ${best} %` : `${P.items.length} preguntas · ${P.minutes} min`}</small></button>`; }).join('')}</div></article>`;
  };
  return `<section class="simi" aria-label="Simulacros de parciales y quices"><h2 class="comp-title">Parciales y quices</h2><p class="simi-p">Simulacros con reloj de los cuatro cortes del semestre: preguntas nuevas, sin avisos hasta el final y un informe con lo que debes repasar.</p>
    ${[1, 2, 3, 4].map(card).join('')}</section>`;
}
function gvaPruebasBind(root, c) {
  root.querySelectorAll('[data-gva-prueba]').forEach(b => { b.onclick = () => {
    if (b.dataset.lock) return openBloqueo(c.units.find(u => u.exam)?.exam.id);
    const P = GVA_PRUEBAS.find(x => x.id === b.dataset.gvaPrueba);
    if (P) startExam(c, gvaUnidad(c, P));
  }; });
}
