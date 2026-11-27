// Geometría Vectorial y Analítica rehecha con escenas (spec 2026-11-27-curso-geometria-vectorial). El curso sigue en
// js/courses/geometria.js; cada lección rehecha vive en js/courses/vectorial-geo-N.js y hace GVA.leccion(…). Después de data.js,
// js/courses/vectorial.js pone lo rehecho en COURSE_GEO y arma la evaluación de cada mundo completo. Va después de
// preicfes-base.js: los ejercicios se escriben con los mismos ayudantes (x, sol, err, opc, guion).
const GVA_LEC = {};
const GVA_HECHOS = [];
// Temario: [mundo, nombre en el mapa, [ids de las lecciones]], en el orden del cronograma.
const GVA_TEMARIO = [
  ['sistemas', 'Álgebra Matricial', ['geo-1', 'geo-2', 'geo-3', 'geo-4']],
  ['determinantes', 'Inversión y Determinante', ['geo-5', 'geo-6', 'geo-7', 'geo-8']],
  ['vectores', 'Geometría Vectorial', ['geo-9', 'geo-10', 'geo-11', 'geo-12', 'geo-13']],
  ['productos', 'Productos Vectoriales', ['geo-14', 'geo-15', 'geo-16', 'geo-17', 'geo-18']],
  ['mecanica', 'Fuerza, Trabajo y Momento', ['geo-19', 'geo-20', 'geo-21']],
  ['conicas', 'Secciones Cónicas', ['geo-22', 'geo-23']],
];
const GVA = (() => {
  const KIND = 'Geometría Vectorial';
  // scenes: escenas de respaldo (guion); ex: ejercicios; items: [[nota de repaso, ejercicio]] para la evaluación del mundo.
  const leccion = (id, scenes, ex, items) => { GVA_LEC[id] = { scenes, ex, items }; };
  return { ...ICF, leccion, KIND };
})();
