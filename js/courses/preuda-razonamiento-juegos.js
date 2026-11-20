// Preuniversitario UdeA · componente Razonamiento lógico: juegos, ejercicios y evaluaciones de todas las lecciones (spec
// 2026-11-18-preuda-razonamiento-completo). Va después de preuda-razonamiento.js: reemplaza los ejercicios de cada lección
// (7 u 8 juegos distintos, el último en movimiento) y le pone a cada mundo su evaluación. PU_HECHOS lista los mundos
// terminados: la prueba tests/preuda-razonamiento.test.js les exige el estándar.
const PU_HECHOS = [];
// Mundos rehechos con el estándar de diez ejercicios distintos y zona de examen (spec 2026-11-20-preuda-razonamiento-diez).
const PU_DIEZ = [];
(() => {
  const lessons = PU_RAZONAMIENTO.flatMap(u => u.lessons);
  const L = id => { const l = lessons.find(l => l.id === id); if (!l) throw new Error(`no existe ${id}`); return l; };
  // Zona de examen (js/games/examen-kit.js). En `err` la corrección buena va primero en `fixes`: el juego las revuelve.
  const sol = (q, lines, extra, explain, hint) => play('completa-solucion', 'Completa la solución: arrastra cada ficha a su hueco.', { q, lines, extra }, explain, { hint });
  const err = (q, steps, wrong, fixes, explain, hint) => play('caza-error', 'Encuentra el paso equivocado y corrígelo.', { q, steps, wrong, fixes, fix: 0 }, explain, { hint });
  const opc = (q, options, answer, explain, hint) => play('opcion-examen', 'Así sale en el examen.', { q, options, answer }, explain, { hint });
  const diez = world => { if (!PU_DIEZ.includes(world)) PU_DIEZ.push(world); };
  const setLesson = (id, list) => { L(id).ex = list.map((e, i) => ({ ...e, canvasGuide: true, motion: i === list.length - 1 })); };
  // Evaluación del mundo: [lección, nota de repaso, ejercicio]. La pista corta se completa con la nota de repaso.
  const setExam = (world, title, items) => {
    const u = PU_RAZONAMIENTO.find(u => u.world === world), order = u.lessons.map(l => l.id);
    u.exam = { id: `exam-${world}`, title, minutes: 0, items: items.map(([lesson, review, ex]) => ({ lesson, review, ex: { ...ex, hint: ex.hint.length >= 30 ? ex.hint : `${ex.hint} ${review}`, explain: ex.explain.length > 30 ? ex.explain : `${review} ${ex.explain}`, canvasGuide: true, exam: true, params: { ...ex.params, autoDemo: false } } })) };
    u.exam.items.sort((a, b) => order.indexOf(a.lesson) - order.indexOf(b.lesson));
    u.exam.minutes = Math.max(12, Math.round(u.exam.items.length * 1.5));
    PU_HECHOS.push(world);
  };
  PU_JUEGOS.forEach(f => f({ L, setLesson, setExam, sol, err, opc, diez }));
})();
