// Gimnasio del Preuniversitario, razonamiento lógico (spec 2026-11-20-preuda-razonamiento-diez): los conceptos animados que
// el estudiante puede recordar dentro de un paso (CONCEPTOS, motor en js/conceptos.js), los retos guiados de los mundos que
// no tenían y el concepto de cada paso de los retos que ya existían (GYM_CONCEPT_DE). Va después de js/gimnasio.js.
const CONCEPTOS_PU = {
  'fraccion-a-porcentaje': {
    title: 'De fracción a porcentaje',
    scene: { type: 'barra', bars: [
      { label: 'el todo en 5 partes', b: 0, segs: [{ w: .2, t: '1/5', c: 'a' }, { w: .2, t: '1/5', c: 'a' }, { w: .2, t: '', c: 'mute', dim: 1 }, { w: .2, t: '', c: 'mute', dim: 1 }, { w: .2, t: '', c: 'mute', dim: 1 }] },
      { label: 'el mismo todo son 100', b: 1, segs: [{ w: .2, t: '20', c: 'g' }, { w: .2, t: '20', c: 'g' }, { w: .2, t: '20', c: 'mute', dim: 1 }, { w: .2, t: '20', c: 'mute', dim: 1 }, { w: .2, t: '20', c: 'mute', dim: 1 }] },
      { label: '2 partes de 20', b: 2, segs: [{ w: .4, t: '40 %', c: 'ok' }] },
    ] },
    beats: ['$\\tfrac25$ es tomar 2 de 5 partes iguales.', 'Un porcentaje reparte el mismo todo en 100: cada quinto vale 20.', 'Dos quintos son $2 \\cdot 20 = 40$ de cada 100: el 40 %.'],
  },
  'lo-que-queda-de-cien': {
    title: 'Lo que queda del 100 %',
    scene: { type: 'barra', bars: [
      { label: 'el grupo completo', b: 0, segs: [{ w: 1, t: '100 %', c: 'a' }] },
      { label: 'se quitan las partes conocidas', b: 1, segs: [{ w: .4, t: '40 %', c: 'g' }, { w: .25, t: '25 %', c: 'f' }, { w: .35, t: '?', c: 'ok', b: 2 }] },
    ] },
    beats: ['Todo grupo completo es el 100 %.', 'Las partes que ya conoces ocupan su pedazo de la barra.', 'Lo que falta es el resto: $100 - 40 - 25 = 35\\,\\%$.'],
  },
  'porcentaje-por-pedazos': {
    title: 'Un porcentaje por pedazos',
    scene: { type: 'barra', bars: [
      { label: '40 personas', b: 0, segs: [{ w: 1, t: '100 %  →  40', c: 'a' }] },
      { label: 'la décima parte', b: 1, segs: [{ w: .1, t: '4', c: 'g' }, { w: .1, t: '4', c: 'g' }, { w: .1, t: '4', c: 'g' }, { w: .05, t: '2', c: 'f', b: 2 }] },
      { label: '30 % + 5 %', b: 3, segs: [{ w: .35, t: '35 %  →  14', c: 'ok' }] },
    ] },
    beats: ['El 100 % son las 40 personas.', 'El 10 % es la décima parte: 4. Tres pedazos de esos son el 30 %.', 'El 5 % es la mitad del 10 %: 2 personas.', '$35\\,\\% = 30\\,\\% + 5\\,\\%$: $12 + 2 = 14$ personas.'],
  },
  'area-por-resta': {
    title: 'Un área por resta',
    scene: { type: 'figura', shapes: [
      { k: 'rect', at: [110, 18], w: 100, h: 100, c: 'a', fill: 'a', b: 0 },
      { k: 'text', t: '12 · 12 = 144', at: [160, 136], c: 'a', s: 12, b: 0 },
      { k: 'circle', at: [160, 68], r: 33, c: 'g', fill: 'g', k2: 40, b: 1 },
      { k: 'text', t: '16π', at: [160, 73], c: 'ink', s: 13, b: 1 },
      { k: 'text', t: 'pasto = 144 − 16π', at: [160, 160], c: 'ok', s: 14, b: 2 },
    ] },
    beats: ['El jardín completo es un cuadrado: lado por lado.', 'La fuente es un círculo: $\\pi$ por el radio al cuadrado.', 'Lo sombreado no tiene fórmula propia: es el todo menos lo de adentro.'],
  },
};
if (typeof CONCEPTOS !== 'undefined') Object.assign(CONCEPTOS, CONCEPTOS_PU);

GYM_RETOS.push(
  {
    id: 'gym-transporte', after: ['pu-cm-2', 'pu-cm-3'], level: 2,
    title: 'Cómo llega el curso', strategy: 'Todo a porcentaje y después la cantidad',
    problem: 'En un curso de 40 estudiantes, $\\tfrac25$ llegan a pie, el 25 % llega en bus y el resto en bicicleta. ¿Cuántos estudiantes llegan en bicicleta?',
    steps: [
      { title: 'Pasa la fracción a porcentaje', concept: 'fraccion-a-porcentaje',
        coach: 'Los datos vienen en dos idiomas: una fracción y un porcentaje. Para juntarlos, pásalos al mismo. Pinta en la cuadrícula los que llegan a pie.',
        ex: play('cuadricula-cien', 'Pinta la parte del curso que llega a pie', { rounds: [{ ask: '2/5', count: 40 }] },
          '$\\tfrac25 = \\tfrac{40}{100}$: el 40 % del curso llega a pie.', { hint: 'La cuadrícula tiene 100 casillas: ¿cuánto vale un quinto de 100?' }),
        hints: ['Parte las 100 casillas en 5 grupos iguales: cada quinto son 20 casillas.', 'Dos quintos son dos de esos grupos: 40 casillas.'],
        note: 'A pie: 2/5 = 40 %' },
      { title: 'Halla el resto del 100 %', concept: 'lo-que-queda-de-cien',
        coach: 'Ahora todo está en porcentaje. El curso completo es el 100 %: quita lo que ya conoces y lo que queda es la bicicleta.',
        ex: play('estira-barra', 'Deja en la barra solo la parte de la bicicleta', { max: 200, rounds: [{ base: 100, text: 'Lo que queda del 100 % al quitar 40 % y 25 %', pct: 35 }] },
          '$100 - 40 - 25 = 35$: el 35 % llega en bicicleta.', { hint: 'Suma primero lo que ya conoces y quítalo del 100 %.' }),
        hints: ['A pie y en bus suman 40 % + 25 %. ¿Cuánto falta para el 100 %?', 'Juntos son el 65 %. Encoge la barra hasta el 35 %.'],
        note: 'Bicicleta: 100 % − 40 % − 25 % = 35 %' },
      { title: 'Del porcentaje a la cantidad', concept: 'porcentaje-por-pedazos',
        coach: 'Falta lo que pregunta el problema: cuántos estudiantes. Arma el 35 % con pedazos fáciles: el 10 % y su mitad.',
        ex: play('pinta-personas', 'Pinta a los que llegan en bicicleta', { rounds: [{ total: 40, pct: 35, what: 'llegan en bicicleta' }] },
          'El 10 % de 40 es 4; el 30 % son 12 y el 5 % son 2. En total, 14.', { hint: 'Halla el 10 % del curso y arma con él el 35 %.' }),
        hints: ['El 10 % de 40 es 4 estudiantes. ¿Cuántos son el 30 %? ¿Y el 5 %?', 'El 30 % son 12 y el 5 % son 2: pinta 14.'],
        note: '35 % de 40: 12 + 2 = 14 estudiantes' },
    ],
    answer: 'Llegan en bicicleta 14 estudiantes.',
    wrap: 'Cuando un problema mezcla fracciones y porcentajes, pásalos todos a porcentaje, halla el que falta como el resto del 100 % y solo al final conviértelo en cantidad.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-jardin', after: ['pu-ge-4', 'pu-ge-5'], level: 2,
    title: 'El pasto del jardín', strategy: 'El todo menos lo de adentro',
    problem: 'Un jardín cuadrado de 12 m de lado tiene en el centro una fuente circular de 4 m de radio. En el resto se siembra pasto, que cuesta 5 000 pesos por metro cuadrado. Con $\\pi \\approx 3$, ¿cuánto cuesta sembrar el pasto?',
    steps: [
      { title: 'Lo grande menos lo de adentro', concept: 'area-por-resta',
        coach: 'El pasto no tiene una fórmula propia: es el cuadrado completo menos el círculo de la fuente. Arma esa resta en la figura.',
        ex: play('sombreado-resta', 'Halla el área del pasto', { rounds: [{ s: 12, kind: 'circ', target: [144, 16] }] },
          'El cuadrado mide $12 \\cdot 12 = 144$ y la fuente $\\pi \\cdot 4^2 = 16\\pi$: el pasto ocupa $144 - 16\\pi$ m².', { hint: 'Los dos datos que necesitas son el lado del jardín y el radio de la fuente.' }),
        hints: ['El área del cuadrado es lado por lado. La de la fuente es $\\pi$ por el radio al cuadrado.', 'Cuadrado: $12 \\cdot 12$. Fuente: $\\pi \\cdot 4^2$. Lo sombreado es la resta.'],
        note: 'Pasto: cuadrado menos fuente, 144 − 16π m²' },
      { title: 'Pasa a números y cobra',
        coach: 'Ya tienes el área con $\\pi$. Ahora reemplaza $\\pi$ por el valor que da el problema y multiplica por el precio de cada metro cuadrado.',
        ex: play('completa-solucion', 'Completa la cuenta del pasto', { q: 'El pasto ocupa $144 - 16\\pi$ m² y cada metro cuadrado cuesta 5 000 pesos. Con $\\pi \\approx 3$, ¿cuánto cuesta sembrarlo?',
          lines: ['La fuente mide $16 \\cdot 3 =$ [[48]] m²', 'El pasto ocupa $144 - 48 =$ [[96]] m²', 'Costo: $96 \\cdot 5\\,000 =$ [[480 000]] pesos'], extra: ['720 000', '192', '240 000'] },
          'Con $\\pi \\approx 3$ la fuente mide 48 m² y el pasto 96 m². A 5 000 pesos el metro, cuesta 480 000 pesos.', { hint: 'Primero el área de la fuente en números, después la resta y al final el precio.' }),
        hints: ['Reemplaza $\\pi$ por 3 solo en la parte de la fuente y después resta.', 'La fuente son 48 m². Resta eso del jardín completo y multiplica por el precio.'],
        note: 'Costo: 96 · 5 000 = 480 000 pesos' },
    ],
    answer: 'Sembrar el pasto cuesta 480 000 pesos.',
    wrap: 'Cuando una región no tiene fórmula propia, búscala como una resta: la figura grande menos lo que se le quita. Deja $\\pi$ como letra hasta el final y reemplázala una sola vez.',
  },
);

// Concepto de cada paso de los retos que ya existían: { reto: [concepto del paso 1, del paso 2, …] } (null = sin concepto).
const GYM_CONCEPT_DE = {};
for (const r of GYM_RETOS) (GYM_CONCEPT_DE[r.id] || []).forEach((c, i) => { if (c && r.steps[i]) r.steps[i].concept = c; });
