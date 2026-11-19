// «Rejillas y caminos» · Preuniversitario, razonamiento lógico, mundo 6 (Razonamiento espacial), lección pu-es-1. Datos puros.
// Reto: el robot que empieza en (0, 0) mirando al norte y obedece AADAIA (queda en (1, 3)). En medio: coordenadas en la
// cuadrícula, girar a la derecha o a la izquierda según hacia dónde se mira, seguir una secuencia, volver al punto de partida
// (ADADADA), colorear sin vecinas en 3 × 3 (5), el tablero de ajedrez y las fichas de dominó en 2 × 4 (5 maneras).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL ROBOT', dur: 30,
      caps: [[1.0, 9.4, 'Un robot en una cuadrícula', 'empieza en (0, 0) mirando al norte'], [10.0, 19.4, 'A avanza; D e I giran 90°', 'girar no lo mueve de casilla'], [20.0, 29.4, 'Órdenes: A A D A I A', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un robot está en el punto cero, cero de una cuadrícula, mirando hacia el norte.'], [10.0, 19.4, 'Con la orden A avanza una unidad hacia donde mira. Con D gira noventa grados a su derecha, y con I a su izquierda, sin moverse.'], [20.0, 29.4, 'Recibe la secuencia A, A, D, A, I, A. Hay que decir en qué punto queda. Al final lo resolvemos.']] },
    { id: 'plano', name: 'COORDENADAS', dur: 28,
      caps: [[0.8, 8.4, '(x, y): primero este, luego norte', 'la primera cuenta a la derecha'], [9.0, 17.4, '(2, 3): 2 a la derecha, 3 arriba', 'el orden de los números importa'], [18.0, 26.4, '(2, 3) no es (3, 2)', 'son dos puntos distintos']],
      narr: [[0.8, 8.4, 'Cada punto de la cuadrícula tiene dos números: el primero dice cuánto se avanza hacia el este, a la derecha; el segundo, hacia el norte.'], [9.0, 17.4, 'El punto dos, tres está dos unidades a la derecha y tres hacia arriba del origen.'], [18.0, 26.4, 'Dos, tres y tres, dos son puntos distintos: el orden de los números importa.']] },
    { id: 'girar', name: 'DERECHA DE QUIÉN', dur: 30,
      caps: [[0.8, 9.4, 'La derecha depende de adónde mira', 'mirando al norte, la derecha es el este'], [10.0, 19.4, 'Mirando al sur, derecha es oeste', 'se gira con el robot, no con la pantalla'], [20.0, 29.4, 'Cuatro giros iguales: una vuelta', 'D D D D vuelve a mirar igual']],
      narr: [[0.8, 9.4, 'Girar a la derecha depende de hacia dónde mira el robot. Si mira al norte, su derecha es el este.'], [10.0, 19.4, 'Pero si mira al sur, su derecha es el oeste: la izquierda de la pantalla. Hay que girar con el robot, no con la pantalla.'], [20.0, 29.4, 'Cuatro giros a la derecha completan una vuelta: el robot vuelve a mirar hacia donde miraba.']] },
    { id: 'seguir', name: 'SEGUIR LA SECUENCIA', dur: 28,
      caps: [[0.8, 8.4, 'Una orden a la vez', 'anotar posición y dirección'], [9.0, 17.4, 'Una tabla de dos columnas', 'dónde está · hacia dónde mira'], [18.0, 26.4, 'Los giros cambian solo la dirección', 'los avances, solo la posición']],
      narr: [[0.8, 8.4, 'Para seguir una secuencia larga se ejecuta una orden a la vez, anotando dónde está y hacia dónde mira.'], [9.0, 17.4, 'Sirve una tabla de dos columnas: posición y dirección. Cada orden agrega un renglón.'], [18.0, 26.4, 'Los giros solo cambian la dirección, y los avances solo cambian la posición.']] },
    { id: 'vuelve', name: 'VOLVER AL INICIO', dur: 30,
      caps: [[0.8, 9.4, 'Cuál secuencia vuelve al inicio', 'ADADADA, ADAIADA, AIAIADA o ADADAIA'], [10.0, 19.4, 'ADADADA: avanza y gira a la derecha', 'cuatro lados de un cuadrado'], [20.0, 29.4, 'Las otras se escapan', 'un giro al otro lado cambia el camino']],
      narr: [[0.8, 9.4, 'Otro problema: de cuatro secuencias, hay que hallar la única con la que el robot termina donde empezó.'], [10.0, 19.4, 'A, D, A, D, A, D, A: avanza y gira siempre a la derecha. Recorre los cuatro lados de un cuadrado y vuelve al inicio.'], [20.0, 29.4, 'En las otras, un giro hacia el otro lado lo saca del cuadrado y termina en otro punto.']] },
    { id: 'colorear', name: 'COLOREAR SIN VECINAS', dur: 30,
      caps: [[0.8, 9.4, 'Cuadrícula de 3 × 3', 'sin dos casillas pintadas con un lado común'], [10.0, 19.4, 'Las cuatro esquinas y el centro', 'cinco, y ninguna toca a otra por un lado'], [20.0, 29.4, 'Con seis siempre habría vecinas', 'la mayor cantidad es 5']],
      narr: [[0.8, 9.4, 'Otro problema: en una cuadrícula de tres por tres se pintan casillas sin que dos pintadas compartan un lado. Hay que hallar la mayor cantidad posible.'], [10.0, 19.4, 'Las cuatro esquinas y el centro: cinco casillas, y ninguna comparte un lado con otra. Solo se tocan por las puntas.'], [20.0, 29.4, 'Con seis, dos quedarían pegadas sin remedio. La mayor cantidad es cinco.']] },
    { id: 'ajedrez', name: 'EL TABLERO DE AJEDREZ', dur: 28,
      caps: [[0.8, 8.4, 'Se colorea como un tablero', '5 casillas oscuras y 4 claras'], [9.0, 17.4, 'Las oscuras nunca son vecinas', 'por eso las 5 sirven'], [18.0, 26.4, 'Pintar el tablero ayuda a pensar', 'vecinas siempre tienen colores distintos']],
      narr: [[0.8, 8.4, 'Un truco: colorear la cuadrícula como un tablero de ajedrez. En tres por tres quedan cinco casillas oscuras y cuatro claras.'], [9.0, 17.4, 'Dos casillas oscuras nunca comparten un lado, así que las cinco oscuras forman una solución.'], [18.0, 26.4, 'En un tablero de ajedrez, dos casillas vecinas siempre tienen colores distintos. Esa idea resuelve muchos acertijos.']] },
    { id: 'domino', name: 'FICHAS DE DOMINÓ', dur: 30,
      caps: [[0.8, 9.4, 'Cubrir un tablero de 2 × 4', 'con fichas de 1 × 2, sin encimarlas'], [10.0, 19.4, 'Se mira la primera columna', 'una ficha de pie, o dos acostadas'], [20.0, 29.4, '1, 2, 3, 5 maneras', 'cada tablero suma los dos anteriores']],
      narr: [[0.8, 9.4, 'Cuántas maneras hay de cubrir un tablero de dos por cuatro con fichas de dominó de uno por dos, sin encimarlas.'], [10.0, 19.4, 'Se mira la primera columna: o lleva una ficha de pie y queda un tablero de dos por tres, o dos fichas acostadas y queda uno de dos por dos.'], [20.0, 29.4, 'Para dos por uno, dos, tres y cuatro hay una, dos, tres y cinco maneras: cada uno suma los dos anteriores.']] },
    { id: 'resolver', name: 'EL ROBOT, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'A A: sube a (0, 2)', 'sigue mirando al norte'], [10.0, 19.4, 'D: mira al este · A: (1, 2)', 'I: vuelve a mirar al norte'], [20.0, 29.4, 'A: termina en (1, 3)', 'la opción A']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Con A, A, el robot sube dos unidades: queda en cero, dos, mirando al norte.'], [10.0, 19.4, 'Con D gira hacia el este y con A avanza a uno, dos. Con I gira a su izquierda: vuelve a mirar al norte.'], [20.0, 29.4, 'Con la última A sube una unidad: termina en el punto uno, tres.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El robot queda en (1, 3)', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: el punto uno, tres. Una orden a la vez, con posición y dirección.'], [11.0, 20.4, 'Coordenadas en orden, girar con el robot, colorear como un tablero y contar coberturas sumando las anteriores.'], [21.0, 29.4, 'Gira con el robot, no con la pantalla.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 6', TITLE = 'REJILLAS Y CAMINOS', LINE = 'Gira con el robot, no con la pantalla.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-es-1', KEYS: ['AADAIA', 'ADADADA', 'dominó'] };
})();
if (typeof module !== 'undefined') module.exports = D;
