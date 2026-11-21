// Curso Preicfes Saber 11 (spec 2026-11-20-curso-preicfes): ayudantes comunes. Cada mundo vive en su archivo
// js/courses/preicfes-<área>-<mundo>.js y hace PI_MUNDOS.push(ICF.mundo(…)); js/courses/preicfes.js (después de data.js) arma el
// curso en el orden de los componentes. PI_HECHOS lista los mundos terminados (con el estándar de la spec y su evaluación).
const PI_MUNDOS = [];
const PI_HECHOS = [];
const PI_BLOCKS = [
  { id: 'matematicas', name: 'Matemáticas', desc: '50 preguntas · datos, geometría, álgebra y finanzas' },
  { id: 'lectura', name: 'Lectura Crítica', desc: '41 preguntas · textos continuos y discontinuos' },
  { id: 'sociales', name: 'Sociales y Ciudadanas', desc: '50 preguntas · Constitución, historia y ciudadanía' },
  { id: 'ciencias', name: 'Ciencias Naturales', desc: '58 preguntas · biología, química, física e indagación' },
  { id: 'ingles', name: 'Inglés', desc: '55 preguntas · siete partes, del nivel A1 al B1' },
];
const ICF = (() => {
  const KIND = { matematicas: 'Matemáticas', lectura: 'Lectura Crítica', sociales: 'Sociales y Ciudadanas', ciencias: 'Ciencias Naturales', ingles: 'Inglés' };
  // Zona de examen (js/games/examen-kit.js). En `err` la corrección buena va primero en `fixes`: el juego las revuelve.
  const sol = (q, lines, extra, explain, hint) => play('completa-solucion', 'Completa la solución: arrastra cada ficha a su hueco.', { q, lines, extra }, explain, { hint });
  const err = (q, steps, wrong, fixes, explain, hint) => play('caza-error', 'Encuentra el paso equivocado y corrígelo.', { q, steps, wrong, fixes, fix: 0 }, explain, { hint });
  const opc = (q, options, answer, explain, hint) => play('opcion-examen', 'Así sale en el examen.', { q, options, answer }, explain, { hint });
  // Pregunta A–D sobre un texto (evaluaciones de Lectura, Sociales e Inglés).
  const preg = (doc, block) => (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc, q, options, answer }, explain, { hint, kind: KIND[block] });
  // Juego en movimiento al final de una lección de lectura: tres preguntas cortas sobre el texto, tres opciones cada una.
  const mueve = (game, q, title, items, explain, hint) => play(game, q, { rounds: [{ title, items: items.map(([ask, options, answer]) => ({ ask, options, answer })) }] }, explain, { hint });
  // Lección: en los juegos de lienzo la guía va sobre el juego; el juego en movimiento lleva `motion`.
  const leccion = (id, title, scenes, ex) => ({ id, title, clip: { scenes }, ex: ex.map(e => ({ ...e, canvasGuide: true, motion: /^(vuela-precios|rompe-cambios|tanque-porcentaje|resortera-tres|lirios-laguna|corta-proporciones)$/.test(e.game) })) });
  // Mundo con su evaluación: items = [[lección, nota de repaso, ejercicio]]. Tiempo: 1.5 min por juego; 2.25 por pregunta de lectura.
  const mundo = (world, title, block, lessons, items) => {
    const order = lessons.map(l => l.id);
    const exam = { id: `exam-${world}`, title: `Evaluación · ${title}`, minutes: 0, items: items.map(([lesson, review, ex]) => ({ lesson, review,
      ex: { ...ex, kind: ex.kind || KIND[block], canvasGuide: true, exam: true, params: { ...ex.params, autoDemo: false } } })) };
    exam.items.sort((a, b) => order.indexOf(a.lesson) - order.indexOf(b.lesson));
    exam.minutes = Math.max(8, Math.ceil(exam.items.length * (exam.items.every(it => it.ex.game === 'pregunta-examen') ? 2.25 : 1.5)));
    PI_HECHOS.push(world);
    return { world, title, block, lessons, exam };
  };
  return { sol, err, opc, preg, mueve, leccion, mundo, KIND };
})();
