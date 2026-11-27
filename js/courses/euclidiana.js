// Curso de Geometría Euclidiana (spec 2026-11-26-curso-euclidiana): ocho mundos, uno por capítulo del libro de referencia,
// en el orden del temario (EUC_TEMARIO). Va después de data.js: arma el curso con los mundos de js/courses/euclidiana-*.js y
// lo pone en COURSES después de Geometría Vectorial. Nace en borrador
// (supabase/migrations/20261126000003_curso_euclidiana.sql) hasta la revisión docente.
const COURSE_EUC = {
  id: 'euc', level: 'Semestre 1', name: 'Geometría Euclidiana', icon: '△', color: '#2dd4bf',
  tagline: 'Figuras, medidas y razones: aprende a demostrar lo que ves.',
  units: EUC_TEMARIO.map(([w]) => EUC_MUNDOS.find(u => u.world === w)).filter(Boolean),
  soon: EUC.pendientes(EUC_MUNDOS),
};
COURSES.splice(COURSES.findIndex(c => c.id === 'geo') + 1, 0, COURSE_EUC);
