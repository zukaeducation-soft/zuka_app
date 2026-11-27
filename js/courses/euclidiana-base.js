// Curso de Geometría Euclidiana (spec 2026-11-26-curso-euclidiana): sigue los ocho capítulos de «Geometría Euclidiana» de
// J. R. Londoño (Ude@). Cada mundo vive en js/courses/euclidiana-<mundo>.js y hace EUC_MUNDOS.push(EUC.mundo(…));
// js/courses/euclidiana.js (después de data.js) arma el curso en el orden del temario. Va después de preicfes-base.js: los
// ejercicios se escriben con los mismos ayudantes (x, sol, err, opc, guion, leccion). EUC_HECHOS lista los mundos terminados.
const EUC_MUNDOS = [];
const EUC_HECHOS = [];
// Temario: [mundo, título, [lecciones], capítulo del libro]. Lo que no esté en EUC_MUNDOS sale como «En preparación».
const EUC_TEMARIO = [
  ['euc-demostrar', 'Lógica de la Demostración', ['Hipótesis, tesis y razones', 'Demostración directa e indirecta', 'Condicionales y contraejemplos'], 1],
  ['euc-elementos', 'Puntos, Rectas y Ángulos', ['Puntos, rectas y segmentos', 'Ángulos y su medida', 'Polígonos'], 2],
  ['euc-triangulo', 'Triángulos Congruentes', ['El triángulo y sus elementos', 'Criterios L-A-L, A-L-A y L-L-L', 'Desigualdades en el triángulo', 'L-A-A y triángulos rectángulos'], 3],
  ['euc-cuadrilateros', 'Paralelas y Cuadriláteros', ['Paralelas y perpendiculares', 'Ángulos entre paralelas y en polígonos', 'Paralelogramos y trapecios', 'Rectas y puntos notables'], 4],
  ['euc-circunferencia', 'La Circunferencia', ['Cuerdas, tangentes y posiciones relativas', 'Ángulo central e inscrito', 'Ángulos interiores, exteriores y semiinscritos'], 5],
  ['euc-metricas', 'Semejanza y Métricas', ['Segmentos proporcionales y Tales', 'Semejanza de triángulos', 'Pitágoras y el triángulo rectángulo', 'Potencia de un punto y polígonos regulares'], 6],
  ['euc-areas', 'Áreas de Figuras Planas', ['Áreas básicas', 'Relaciones entre áreas', 'Áreas sombreadas'], 7],
  ['euc-construcciones', 'Regla y Compás', ['Construcciones elementales', 'Lugares geométricos y construcción de triángulos'], 8],
];
const EUC = (() => {
  const KIND = 'Geometría';
  // Mundo con su evaluación: items = [[lección, nota de repaso, ejercicio]]; 1.5 minutos por pregunta.
  const mundo = (world, lessons, items) => {
    const fila = EUC_TEMARIO.find(t => t[0] === world), order = lessons.map(l => l.id);
    const exam = { id: `exam-${world}`, title: `Evaluación · ${fila[1]}`, minutes: 0, items: items.map(([lesson, review, ex]) => ({ lesson, review,
      ex: { ...ex, kind: ex.kind || KIND, canvasGuide: true, exam: true, params: { ...ex.params, autoDemo: false } } })) };
    exam.items.sort((a, b) => order.indexOf(a.lesson) - order.indexOf(b.lesson));
    exam.minutes = Math.max(8, Math.ceil(exam.items.length * 1.5));
    EUC_HECHOS.push(world);
    return { world, title: fila[1], lessons, exam };
  };
  // Los mundos del temario que aún no están escritos.
  const pendientes = hechos => EUC_TEMARIO.filter(([w]) => !hechos.some(u => u.world === w)).map(([world, title, lessons]) => ({ world, title, lessons }));
  return { ...ICF, mundo, pendientes, KIND };
})();
