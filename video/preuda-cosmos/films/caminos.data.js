// «Contar figuras y caminos» · Preuniversitario, razonamiento lógico, mundo 5 (Conteo), lección pu-co-5. Datos puros.
// Reto: el mensajero en una cuadrícula de 3 × 3 que no puede pasar por el cruce R (20 − 12 = 8). En medio: caminos sumando en
// cada cruce (3 × 2: 10), caminos como palabras de D y N (C(5, 2) = 10), los cuadrados de una cuadrícula de 3 × 3 (14), los
// rectángulos de 3 × 2 (C(3,2) · C(4,2) = 18), los triángulos desde un vértice (C(5, 2) = 10), la escalera de 1 o 2 peldaños
// (8) y los caminos por un punto (a R por desde R).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL MENSAJERO', dur: 30,
      caps: [[1.0, 9.4, 'De P a Q por las calles', 'solo hacia la derecha o hacia arriba'], [10.0, 19.4, 'El cruce R está cerrado', 'no se puede pasar por ahí'], [20.0, 29.4, 'Cuántos caminos quedan', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un mensajero va de P a Q por las calles de una cuadrícula de tres por tres, siempre a la derecha o hacia arriba.'], [10.0, 19.4, 'Pero el cruce R está cerrado: ningún camino puede pasar por ahí.'], [20.0, 29.4, 'Hay que contar cuántos caminos distintos le quedan. Dibujarlos todos sería lento. Al final lo resolvemos.']] },
    { id: 'sumar', name: 'SUMAR EN CADA CRUCE', dur: 30,
      caps: [[0.8, 9.4, 'A cada cruce se llega de dos lados', 'desde la izquierda o desde abajo'], [10.0, 19.4, 'Caminos = izquierda + abajo', 'los bordes tienen un solo camino'], [20.0, 29.4, 'Cuadrícula de 3 × 2: 10 caminos', 'se va sumando cruce por cruce']],
      narr: [[0.8, 9.4, 'A cada cruce solo se llega de dos maneras: desde el cruce de la izquierda o desde el de abajo.'], [10.0, 19.4, 'Así que los caminos a un cruce son la suma de los de esos dos. Por los bordes hay un único camino.'], [20.0, 29.4, 'En una cuadrícula de tres por dos se suma cruce por cruce y en la esquina final aparece diez.']] },
    { id: 'palabras', name: 'CAMINOS COMO PALABRAS', dur: 28,
      caps: [[0.8, 8.4, 'Cada camino: 3 pasos D y 2 pasos N', 'D D N D N, N D D D N…'], [9.0, 17.4, 'Escoger dónde van las 2 N', 'entre 5 lugares'], [18.0, 26.4, 'C(5, 2) = 10', 'el mismo diez de la suma']],
      narr: [[0.8, 8.4, 'Cada camino de esa cuadrícula da tres pasos a la derecha, de, y dos hacia arriba, ene, en algún orden.'], [9.0, 17.4, 'Un camino es como una palabra de cinco letras: basta escoger en qué dos lugares van las ene.'], [18.0, 26.4, 'Escoger dos de cinco: diez. Coincide con la suma de los cruces.']] },
    { id: 'cuadrados', name: 'LOS CUADRADOS', dur: 30,
      caps: [[0.8, 9.4, 'Una cuadrícula de 3 × 3', 'cuántos cuadrados de cualquier tamaño'], [10.0, 19.4, 'Por tamaños: 9 de 1 · 4 de 2', 'y 1 de 3'], [20.0, 29.4, '9 + 4 + 1 = 14', 'los cuadrados perfectos, sumados']],
      narr: [[0.8, 9.4, 'Otro problema: cuántos cuadrados de cualquier tamaño hay en una cuadrícula de tres por tres.'], [10.0, 19.4, 'Se cuentan por tamaño: nueve pequeños, cuatro de lado dos, que se superponen, y uno grande.'], [20.0, 29.4, 'Nueve más cuatro más uno: catorce. Son los cuadrados de tres, dos y uno, sumados.']] },
    { id: 'rectangulos', name: 'LOS RECTÁNGULOS', dur: 28,
      caps: [[0.8, 8.4, 'Cuadrícula de 3 × 2', 'todos los rectángulos, también los cuadrados'], [9.0, 17.4, 'Rectángulo = 2 líneas horizontales', 'y 2 verticales'], [18.0, 26.4, 'C(3, 2) · C(4, 2) = 3 · 6 = 18', 'escoger los bordes']],
      narr: [[0.8, 8.4, 'En una cuadrícula de tres por dos, cuántos rectángulos hay, contando también los cuadrados.'], [9.0, 17.4, 'Cada rectángulo queda definido por dos líneas horizontales, arriba y abajo, y dos verticales, a los lados.'], [18.0, 26.4, 'Hay tres horizontales y cuatro verticales: tres por seis, dieciocho rectángulos.']] },
    { id: 'triangulos', name: 'TRIÁNGULOS DESDE UN VÉRTICE', dur: 28,
      caps: [[0.8, 8.4, 'Del vértice salen 5 líneas', 'los dos lados y tres segmentos'], [9.0, 17.4, 'Dos líneas y la base: un triángulo', 'escoger 2 de 5'], [18.0, 26.4, 'C(5, 2) = 10 triángulos', 'no solo los 4 pequeños']],
      narr: [[0.8, 8.4, 'Desde el vértice de arriba de un triángulo se trazan tres segmentos hasta la base. Del vértice salen cinco líneas.'], [9.0, 17.4, 'Cualquier par de esas líneas, junto con la base, forma un triángulo. Es escoger dos de cinco.'], [18.0, 26.4, 'Diez triángulos, no solo los cuatro pequeños que se ven primero.']] },
    { id: 'escalera', name: 'LA ESCALERA', dur: 30,
      caps: [[0.8, 9.4, 'Subir de a 1 o de a 2 peldaños', 'cuántas maneras para 5 peldaños'], [10.0, 19.4, 'Al último se llega desde el 4 o el 3', 'maneras(5) = maneras(4) + maneras(3)'], [20.0, 29.4, '1, 2, 3, 5, 8', 'se suman las dos anteriores']],
      narr: [[0.8, 9.4, 'Camila sube una escalera de cinco peldaños, de a uno o de a dos en cada paso. Cuántas maneras tiene.'], [10.0, 19.4, 'Al peldaño cinco se llega desde el cuatro, con un paso corto, o desde el tres, con uno largo: se suman sus maneras.'], [20.0, 29.4, 'Para uno, dos, tres, cuatro y cinco peldaños: uno, dos, tres, cinco y ocho. Cada número suma los dos anteriores.']] },
    { id: 'porpunto', name: 'PASAR POR UN PUNTO', dur: 28,
      caps: [[0.8, 8.4, 'Caminos que pasan por R', 'de P a R, y luego de R a Q'], [9.0, 17.4, 'Se multiplican', 'una parte y luego la otra'], [18.0, 26.4, 'Los que evitan R', 'todos menos los que pasan por R']],
      narr: [[0.8, 8.4, 'Para contar los caminos que pasan por un cruce R, se divide el viaje: de P a R, y luego de R a Q.'], [9.0, 17.4, 'Es una cosa y luego otra: se multiplican los caminos de cada parte.'], [18.0, 26.4, 'Y los que evitan R son todos los caminos menos los que pasan por R: el complemento otra vez.']] },
    { id: 'resolver', name: 'EL MENSAJERO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Todos: C(6, 3) = 20', '3 pasos D y 3 pasos N'], [10.0, 19.4, 'Por R: 2 · 6 = 12', 'de P a R hay 2; de R a Q hay 6'], [20.0, 29.4, '20 − 12 = 8 caminos', 'o sumando, con un 0 en R']],
      narr: [[0.8, 9.4, 'Volvamos al reto. En la cuadrícula de tres por tres, cada camino tiene tres pasos de y tres ene: ce de seis, tres, veinte.'], [10.0, 19.4, 'De P a R hay dos caminos, y de R a Q, seis. Por R pasan dos por seis, doce.'], [20.0, 29.4, 'Quedan veinte menos doce: ocho. Lo mismo sale sumando cruce por cruce, poniendo cero en el cruce cerrado.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Quedan 8 caminos', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: ocho caminos. Todos, menos los que pasan por el cruce cerrado.'], [11.0, 20.4, 'Sumar en cada cruce, caminos como palabras, figuras por tamaño o por sus bordes, y la escalera que suma las dos anteriores.'], [21.0, 29.4, 'Cada cruce suma los caminos que llegan.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 5', TITLE = 'FIGURAS Y CAMINOS', LINE = 'Cada cruce suma los caminos que llegan.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-co-5', KEYS: ['mensajero', 'escalera', 'peldaño'] };
})();
if (typeof module !== 'undefined') module.exports = D;
