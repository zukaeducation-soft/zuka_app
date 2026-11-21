// Curso Preicfes Saber 11 (spec 2026-11-20-curso-preicfes): preparación para el examen de Estado de grado 11, con cinco
// componentes que se estudian por separado (como el Preuniversitario UdeA): al entrar se elige el componente y luego se ven solo
// sus mundos. Va después de data.js: arma el curso con los mundos de js/courses/preicfes-*.js y lo pone en COURSES después del
// Preuniversitario. Nace en borrador (supabase/migrations/20261120000001_curso_preicfes.sql) hasta la revisión docente.
const COURSE_PREICFES = {
  id: 'preicfes', level: 'Saber 11', name: 'Preicfes Saber 11', icon: '11', color: '#e879f9',
  tagline: 'Las cinco pruebas del examen de grado 11, una por una.',
  blocks: PI_BLOCKS,
  units: PI_BLOCKS.flatMap(b => PI_MUNDOS.filter(u => u.block === b.id)),
};
COURSES.splice(COURSES.findIndex(c => c.id === 'preuda') + 1, 0, COURSE_PREICFES);
