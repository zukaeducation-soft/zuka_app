// Geometría Vectorial y Analítica rehecha con escenas (spec 2026-11-27-curso-geometria-vectorial). El curso sigue en
// js/courses/geometria.js; cada lección rehecha vive en js/courses/vectorial-geo-N.js y hace GVA.leccion(…). Después de data.js,
// js/courses/vectorial.js pone lo rehecho en COURSE_GEO y arma la evaluación de cada mundo completo. Va después de
// preicfes-base.js: los ejercicios se escriben con los mismos ayudantes (x, sol, err, opc, guion).
const GVA_LEC = {};
const GVA_HECHOS = [];
// Simulacros de los cuatro parciales y de los cuatro quices del cronograma (js/courses/vectorial-pruebas-N.js).
const GVA_PRUEBAS = [];
// Cortes del cronograma: [n, lecciones del parcial, tema del quiz, lecciones del quiz].
const GVA_CORTES = [
  [1, ['geo-1', 'geo-2', 'geo-3', 'geo-4'], 'Sistemas de ecuaciones y álgebra de matrices', ['geo-1', 'geo-2', 'geo-3']],
  [2, ['geo-5', 'geo-6', 'geo-7', 'geo-8', 'geo-9'], 'Determinantes y matriz inversa', ['geo-5', 'geo-6', 'geo-7', 'geo-8']],
  [3, ['geo-10', 'geo-11', 'geo-12', 'geo-13', 'geo-14', 'geo-15', 'geo-16', 'geo-17', 'geo-18'], 'Intersección entre lugares geométricos', ['geo-12', 'geo-13', 'geo-16']],
  [4, ['geo-19', 'geo-20', 'geo-21', 'geo-22', 'geo-23'], 'Aplicaciones a la física', ['geo-19', 'geo-20', 'geo-21']],
];
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
  // Simulacro de parcial o de quiz: items = [[lección, nota de repaso, ejercicio]]. Parcial: 1 h 40 min; quiz: 3 min por pregunta.
  const prueba = (tipo, n, items) => {
    const corte = GVA_CORTES.find(c => c[0] === n);
    GVA_PRUEBAS.push({ id: `geo-${tipo}-${n}`, tipo, n, title: tipo === 'parcial' ? `Simulacro del parcial ${n}` : `Quiz ${n} · ${corte[2]}`,
      lessons: tipo === 'parcial' ? corte[1] : corte[3], minutes: tipo === 'parcial' ? 100 : Math.max(10, items.length * 3),
      items: items.map(([lesson, review, ex]) => ({ lesson, review, ex: { ...ex, kind: ex.kind || KIND, canvasGuide: true, exam: true, params: { ...ex.params, autoDemo: false } } })) });
  };
  return { ...ICF, leccion, prueba, KIND };
})();
