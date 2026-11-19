// «Claves de sustitución» · Preuniversitario, razonamiento lógico, mundo 8 (Codificación), lección pu-cd-1. Datos puros.
// Reto: SOL, LUZ y SUR con sus tres símbolos en desorden; el código de LOROS (○ □ ● □ △). En medio: una letra, un símbolo, el
// desplazamiento +3 (ZUKA → CXND), descifrar retrocediendo (OLEUR → LIBRO), la tabla de fila y columna (H = 23), el mensaje
// 33 11 43 (MAR), las letras que comparten dos palabras y un método.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'SOL, LUZ Y SUR', dur: 30,
      caps: [[1.0, 9.4, 'Cada letra tiene su símbolo', 'SOL, LUZ y SUR, con sus tres símbolos'], [10.0, 19.4, 'Los símbolos van en desorden', 'no se sabe cuál es de cuál letra'], [20.0, 29.4, 'El código de LOROS', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. A cada letra de las palabras SOL, LUZ y SUR se le asignó un símbolo distinto.'], [10.0, 19.4, 'Frente a cada palabra aparecen sus tres símbolos, pero en desorden: no se sabe cuál corresponde a cuál letra.'], [20.0, 29.4, 'Hay que escribir la palabra LOROS con esos símbolos, en orden. Al final lo resolvemos.']] },
    { id: 'sustitucion', name: 'UNA LETRA, UN SÍMBOLO', dur: 28,
      caps: [[0.8, 8.4, 'Una clave de sustitución', 'cada letra se cambia siempre por lo mismo'], [9.0, 17.4, 'La misma letra, el mismo símbolo', 'en cualquier palabra donde aparezca'], [18.0, 26.4, 'Letras distintas, símbolos distintos', 'así el mensaje se puede devolver']],
      narr: [[0.8, 8.4, 'En una clave de sustitución, cada letra se reemplaza siempre por el mismo símbolo, número u otra letra.'], [9.0, 17.4, 'Si la A es una estrella en una palabra, es una estrella en todas.'], [18.0, 26.4, 'Y dos letras distintas nunca comparten símbolo. Por eso el mensaje se puede descifrar sin ambigüedad.']] },
    { id: 'cesar', name: 'CORRER TRES LUGARES', dur: 30,
      caps: [[0.8, 9.4, 'Cada letra avanza 3 lugares', 'A → D, B → E, C → F'], [10.0, 19.4, 'Después de la Z se vuelve a empezar', 'X → A, Y → B, Z → C'], [20.0, 29.4, 'ZUKA → CXND', 'el alfabeto como una rueda']],
      narr: [[0.8, 9.4, 'Otra clave: cada letra se reemplaza por la que está tres lugares más adelante. A se vuelve D, B se vuelve E.'], [10.0, 19.4, 'Cerca del final, el alfabeto da la vuelta: X se vuelve A, Y se vuelve B y Z se vuelve C.'], [20.0, 29.4, 'Así, ZUKA se envía como C, X, N, D. Es mejor pensar el alfabeto como una rueda.']] },
    { id: 'descifrar', name: 'DESCIFRAR', dur: 30,
      caps: [[0.8, 9.4, 'Se recibe OLEUR', 'con la misma clave de +3'], [10.0, 19.4, 'Para descifrar, se retrocede 3', 'O → L, L → I, E → B'], [20.0, 29.4, 'OLEUR → LIBRO', 'la operación al revés']],
      narr: [[0.8, 9.4, 'Otro problema: con la misma clave, se recibe el mensaje OLEUR. Hay que hallar la palabra original.'], [10.0, 19.4, 'Para descifrar se hace lo contrario: retroceder tres lugares. La O pasa a L, la L a I, la E a B.'], [20.0, 29.4, 'La U pasa a R y la R a O. La palabra original es LIBRO.']] },
    { id: 'tabla', name: 'FILA Y COLUMNA', dur: 28,
      caps: [[0.8, 8.4, 'Las letras en una tabla de 5 × 5', 'cada letra: dos cifras'], [9.0, 17.4, 'Primero la fila, después la columna', 'H está en la fila 2, columna 3: 23'], [18.0, 26.4, 'El orden de las cifras importa', '23 es H; 32 es otra letra']],
      narr: [[0.8, 8.4, 'Otra clave: se ponen las letras en una tabla de cinco por cinco, y cada letra se escribe con dos cifras.'], [9.0, 17.4, 'La primera cifra es la fila y la segunda, la columna. La H está en la fila dos, columna tres: veintitrés.'], [18.0, 26.4, 'El orden importa: veintitrés es la H, pero treinta y dos es otra letra, la L.']] },
    { id: 'mensaje', name: 'TRES PARES DE CIFRAS', dur: 30,
      caps: [[0.8, 9.4, 'El mensaje 33 11 43', 'con la tabla de filas y columnas'], [10.0, 19.4, '33: fila 3, columna 3', 'la M'], [20.0, 29.4, '11 es la A y 43 la R', 'el mensaje dice MAR']],
      narr: [[0.8, 9.4, 'Otro problema: con esa tabla llega el mensaje treinta y tres, once, cuarenta y tres. Hay que leerlo.'], [10.0, 19.4, 'Treinta y tres: fila tres, columna tres, la M.'], [20.0, 29.4, 'Once es la A, en la primera fila y la primera columna, y cuarenta y tres es la R. El mensaje dice MAR.']] },
    { id: 'comunes', name: 'LETRAS EN DOS PALABRAS', dur: 28,
      caps: [[0.8, 8.4, 'La L está en SOL y en LUZ', 'su símbolo está en las dos listas'], [9.0, 17.4, 'El único símbolo repetido', 'entre SOL y LUZ es de la L'], [18.0, 26.4, 'Cruzar las listas', 'lo común delata a la letra común']],
      narr: [[0.8, 8.4, 'Cuando no hay regla de desplazamiento, se cruzan palabras. La L aparece en SOL y en LUZ.'], [9.0, 17.4, 'Su símbolo tiene que estar en las dos listas. Si hay un solo símbolo repetido entre ellas, ese es el de la L.'], [18.0, 26.4, 'Así funciona: lo que dos palabras tienen en común delata a la letra que comparten.']] },
    { id: 'metodo', name: 'UN MÉTODO', dur: 28,
      caps: [[0.8, 8.4, '1. Buscar letras repetidas', 'que estén en dos palabras'], [9.0, 17.4, '2. Cruzar sus símbolos', 'el común es el de esa letra'], [18.0, 26.4, '3. Lo que sobra se reparte', 'la última letra de cada palabra']],
      narr: [[0.8, 8.4, 'Un método. Primero, buscar letras que aparezcan en dos palabras.'], [9.0, 17.4, 'Segundo, cruzar los símbolos de esas dos palabras: el que comparten es el de esa letra.'], [18.0, 26.4, 'Tercero, con esas letras resueltas, en cada palabra queda un solo símbolo libre para la letra que falta.']] },
    { id: 'resolver', name: 'LOROS, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'L: el común de SOL y LUZ', 'S: el común de SOL y SUR'], [10.0, 19.4, 'U: el común de LUZ y SUR', 'O, Z y R: el que sobra en cada palabra'], [20.0, 29.4, 'LOROS = ○ □ ● □ △', 'la opción A']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La L está en SOL y LUZ: su símbolo es el círculo. La S está en SOL y SUR: el triángulo.'], [10.0, 19.4, 'La U está en LUZ y SUR: el rombo. Lo que sobra en cada palabra da la O, el cuadrado; la Z, la estrella, y la R, el punto.'], [20.0, 29.4, 'LOROS se escribe círculo, cuadrado, punto, cuadrado, triángulo.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'LOROS = ○ □ ● □ △', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A. Las letras compartidas entre palabras delatan sus símbolos.'], [11.0, 20.4, 'Una letra, un símbolo; correr lugares y retroceder para descifrar; fila y columna; y cruzar palabras.'], [21.0, 29.4, 'Lo que dos palabras comparten, las delata.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 8', TITLE = 'CLAVES DE SUSTITUCIÓN', LINE = 'Lo que dos palabras comparten, las delata.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-cd-1', KEYS: ['LOROS', 'OLEUR', 'CXND', 'MAR'] };
})();
if (typeof module !== 'undefined') module.exports = D;
