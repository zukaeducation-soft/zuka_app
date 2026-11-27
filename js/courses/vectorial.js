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
