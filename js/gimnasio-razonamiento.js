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
  'orden-ancla': {
    title: 'Primero el dato fijo',
    scene: { type: 'tabla', hw: 8, cols: ['1.º', '2.º', '3.º', '4.º', '5.º'], rows: [''],
      cells: [[{ t: 'G', b: 2 }, { t: 'H', b: 2 }, { t: 'F', b: 0 }, '', '']],
      hl: [{ r: 0, c: 2, col: 'a', b: 0 }, { r: 0, c: 0, cs: 2, col: 'g', b: 1 }, { r: 0, c: 3, cs: 2, col: 'g', b: 1 }, { r: 0, c: 0, cs: 2, col: 'ok', b: 2 }],
      foot: { t: 'una sola opción sobrevive', b: 2 } },
    beats: ['Empieza por quien tiene puesto seguro: ese dato no se mueve.', 'Una pareja «justo después» ocupa dos casillas seguidas: mira dónde cabe.', 'Las pistas negativas tachan opciones hasta dejar una sola.'],
  },
  'razon-en-partes': {
    title: 'Una razón son partes iguales',
    scene: { type: 'barra', bars: [
      { label: 'razón 1 : 3 : 4', b: 0, segs: [{ w: 1 / 8, t: '1', c: 'a' }, { w: 3 / 8, t: '3', c: 'g' }, { w: 4 / 8, t: '4', c: 'f' }] },
      { label: '8 partes iguales de 60', b: 1, segs: [1, 2, 3, 4, 5, 6, 7, 8].map(() => ({ w: 1 / 8, t: '60', c: 'mute', dim: 1 })) },
      { label: 'cada cantidad', b: 2, segs: [{ w: 1 / 8, t: '60', c: 'a' }, { w: 3 / 8, t: '180', c: 'g' }, { w: 4 / 8, t: '240', c: 'f' }] },
    ] },
    beats: ['Una razón $1 : 3 : 4$ corta el total en $1 + 3 + 4 = 8$ partes iguales.', 'Cada parte vale el total entre 8: $480 \\div 8 = 60$.', 'Cada cantidad es su número de partes: 60, 180 y 240.'],
  },
  'aumento-como-factor': {
    title: 'Un aumento es un factor',
    scene: { type: 'barra', bars: [
      { label: 'antes', b: 0, segs: [{ w: .64, t: '100 %', c: 'a' }] },
      { label: 'se le suma su cuarta parte', b: 1, segs: [{ w: .64, t: '100 %', c: 'a' }, { w: .16, t: '+25 %', c: 'g' }] },
      { label: 'después', b: 2, segs: [{ w: .8, t: '125 %  →  × 1.25', c: 'ok' }] },
    ] },
    beats: ['El valor de antes es siempre el 100 %.', 'Aumentar un 25 % es agregarle su cuarta parte.', 'Queda el 125 %: multiplicar por 1.25. Un descuento del 25 % sería por 0.75.'],
  },
  'cambios-en-cadena': {
    title: 'Dos cambios seguidos',
    scene: { type: 'barra', bars: [
      { label: 'precio inicial', b: 0, segs: [{ w: .66, t: '100', c: 'a' }] },
      { label: 'sube el 20 % de 100', b: 1, segs: [{ w: .792, t: '120', c: 'g' }] },
      { label: 'baja el 20 % de 120', b: 2, segs: [{ w: .634, t: '96', c: 'ok' }, { w: .158, t: '−24', c: 'bad', dim: 1 }] },
    ] },
    beats: ['Empieza con 100: así los porcentajes se leen directo.', 'El aumento del 20 % se calcula sobre 100: sube a 120.', 'El descuento del 20 % se calcula sobre 120: baja 24, no 20. Queda en 96.'],
  },
  'inversa-constante': {
    title: 'Obreros por días no cambia',
    scene: { type: 'pasos', lines: ['6 obreros · 20 días = 120', 'menos días  →  más obreros', '120 ÷ 12 días = 10 obreros'] },
    beats: ['El trabajo que falta se mide en obreros por días: ese producto no cambia.', 'Si el plazo se acorta, el mismo trabajo se reparte entre más obreros.', 'Divide el trabajo entre los días que quedan.'],
  },
  'alcance': {
    title: 'Alcanzar es cerrar la ventaja',
    scene: { type: 'recta', min: 0, max: 270, ticks: [0, 90, 180, 270],
      dots: [{ v: 0, t: 'carro', c: 'a', b: 0 }, { v: 90, t: 'bus', c: 'g', b: 0 }, { v: 270, t: 'km 270', c: 'ok', b: 2 }],
      hops: [{ from: 0, to: 90, t: 'carro +90', c: 'a', b: 1 }, { from: 90, to: 150, t: 'bus +60', c: 'g', b: 1 }] },
    beats: ['Cuando el carro arranca, el bus ya lleva 90 km de ventaja.', 'Cada hora el carro avanza 90 y el bus 60: la ventaja se achica 30 km.', 'La ventaja de 90 se acaba en $90 \\div 30 = 3$ horas, en el kilómetro 270.'],
  },
  'trabajo-por-hora': {
    title: 'Se suma lo que hacen por hora',
    scene: { type: 'barra', bars: [
      { label: 'el muro completo', b: 0, segs: [{ w: 1, t: '1 muro', c: 'mute', dim: 1 }] },
      { label: 'en una hora', b: 1, segs: [{ w: 1 / 6, t: 'Ana', c: 'a' }, { w: 2 / 6, t: 'Beto', c: 'g' }, { w: .5, t: '', c: 'mute', dim: 1 }] },
      { label: 'juntos', b: 2, segs: [{ w: .5, t: '1/2 por hora', c: 'ok' }] },
    ] },
    beats: ['No se suman los tiempos: se suma lo que hace cada uno en una hora.', 'Ana pinta $\\tfrac16$ del muro por hora y Beto $\\tfrac13$.', 'Juntos pintan $\\tfrac16 + \\tfrac13 = \\tfrac12$ del muro cada hora.'],
  },
  'deshacer-porcentaje': {
    title: 'Deshacer un porcentaje',
    scene: { type: 'pasos', lines: ['precio · 0.70 = 70', 'se deshace dividiendo', '70 ÷ 0.70 = 100'] },
    beats: ['Quitar el 30 % fue multiplicar el precio por 0.70.', 'Para volver atrás se hace la operación contraria: dividir entre el mismo factor.', 'Sumarle el 30 % al precio final no sirve: ese 30 % era de otro número.'],
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

GYM_RETOS.push(
  {
    id: 'gym-podio', after: ['pu-or-1', 'pu-or-4'], level: 2,
    title: 'La carrera sin empates', strategy: 'Dato fijo, pareja pegada y descarte',
    problem: 'Dario, Elena, Felipe, Gloria y Hernán corrieron una carrera sin empates. Felipe llegó tercero. Hernán llegó justo después de Gloria. Elena llegó antes que Dario. Hernán no fue el último. ¿Quién ganó la carrera y quién llegó de último?',
    steps: [
      { title: 'Ubica el dato fijo y la pareja', concept: 'orden-ancla',
        coach: 'No pruebes todos los órdenes: son demasiados. Empieza por quien tiene puesto seguro y mira en qué casillas cabe la pareja que llegó seguida.',
        ex: play('completa-solucion', 'Completa el razonamiento', { q: 'Felipe llegó tercero, Hernán llegó justo después de Gloria y Hernán no fue el último. ¿Qué puestos ocupan Gloria y Hernán?',
          lines: ['Felipe ocupa el puesto [[3]]: quedan libres 1, 2, 4 y 5', 'Gloria y Hernán van seguidos: caben en 1 y 2, o en 4 y [[5]]', 'Como Hernán no fue el último, Gloria y Hernán ocupan los puestos 1 y [[2]]'], extra: ['4', '6'] },
          'Con Felipe en el centro, una pareja seguida solo cabe adelante o atrás. Atrás, Hernán sería el último: van adelante.', { hint: 'Dibuja cinco casillas y marca primero la de Felipe.' }),
        hints: ['Con el centro ocupado, dos puestos seguidos solo quedan al comienzo o al final de la fila.', 'Si la pareja fuera al final, Hernán llegaría de último, y eso no puede ser.'],
        note: 'Felipe en el centro; Gloria y Hernán seguidos y adelante' },
      { title: 'Acomoda a todos',
        coach: 'Con la pareja adelante quedan dos casillas atrás para dos personas. La pista que falta dice quién va primero de esas dos.',
        ex: play('carrera-llegada', 'Arma el orden de llegada', { rounds: [{ names: ['Dario', 'Elena', 'Felipe', 'Gloria', 'Hernán'], clues: [
          { t: 'at', a: 'Felipe', i: 2, say: 'Felipe llegó tercero' }, { t: 'justBefore', a: 'Gloria', b: 'Hernán', say: 'Hernán llegó justo después de Gloria' },
          { t: 'before', a: 'Elena', b: 'Dario', say: 'Elena llegó antes que Dario' }, { t: 'notAt', a: 'Hernán', i: 4, say: 'Hernán no fue el último' }] }] },
          'Gloria, Hernán, Felipe, Elena y Dario: cada pista se cumple y no hay otro orden posible.', { hint: 'Pon primero a Felipe y a la pareja; después usa la pista de Elena y Dario.' }),
        hints: ['Atrás quedan dos puestos para Elena y Dario. ¿Cuál de los dos llegó antes?', 'Elena va antes que Dario: ella es cuarta y él quinto.'],
        note: 'Orden de llegada: Gloria, Hernán, Felipe, Elena, Dario' },
    ],
    answer: 'Ganó Gloria y Dario llegó de último.',
    wrap: 'En un acertijo de orden: primero el dato que fija un puesto, después las parejas que van pegadas (ocupan dos casillas seguidas) y al final las pistas negativas, que descartan. Así casi nunca hay que probar todos los casos.',
  },
);

// Concepto de cada paso de los retos que ya existían: { reto: [concepto del paso 1, del paso 2, …] } (null = sin concepto).
const GYM_CONCEPT_DE = {
  'gym-concreto': ['razon-en-partes', 'aumento-como-factor', null],
  'gym-obra': [null, 'inversa-constante'],
  'gym-bus': [null, 'alcance', null],
  'gym-muro': ['trabajo-por-hora', null, null],
  'gym-tele': ['aumento-como-factor', 'cambios-en-cadena', 'deshacer-porcentaje'],
  'gym-chaqueta': ['deshacer-porcentaje', 'deshacer-porcentaje'],
  // (los mundos siguientes añaden aquí)
};
for (const r of GYM_RETOS) (GYM_CONCEPT_DE[r.id] || []).forEach((c, i) => { if (c && r.steps[i]) r.steps[i].concept = c; });
