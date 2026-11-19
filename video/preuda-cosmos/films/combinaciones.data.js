// «Combinaciones» · Preuniversitario, razonamiento lógico, mundo 5 (Conteo), lección pu-co-3. Datos puros.
// Reto: comité de 3 con exactamente 2 mujeres, de 5 hombres y 4 mujeres (C(4,2) · 5 = 30). En medio: tres sabores de cinco
// (10), la fórmula, escoger es dejar (números crecientes de cuatro cifras con 1 a 6: C(6,4) = 15), triángulos con 6 puntos
// (20), los 45 saludos (10 personas), las diagonales de un decágono (35) y grupos mixtos.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL COMITÉ', dur: 30,
      caps: [[1.0, 9.4, '5 hombres y 4 mujeres', 'se escoge un comité de 3'], [10.0, 19.4, 'Exactamente 2 mujeres', 'y por lo tanto 1 hombre'], [20.0, 29.4, 'Cuántos comités distintos', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. De un grupo de cinco hombres y cuatro mujeres se va a escoger un comité de tres personas.'], [10.0, 19.4, 'En el comité debe haber exactamente dos mujeres, así que el tercer miembro es un hombre.'], [20.0, 29.4, 'Hay que contar cuántos comités distintos se pueden formar. En un comité no hay cargos. Al final lo resolvemos.']] },
    { id: 'grupo', name: 'SIN ORDEN', dur: 30,
      caps: [[0.8, 9.4, '3 sabores de helado entre 5', 'en una copa, sin orden'], [10.0, 19.4, 'Con orden serían 5 · 4 · 3 = 60', 'pero cada copa sale 3! = 6 veces'], [20.0, 29.4, '60 ÷ 6 = 10 copas', 'se divide entre los órdenes repetidos']],
      narr: [[0.8, 9.4, 'Una heladería tiene cinco sabores y la copa lleva tres distintos. En la copa no hay primero ni último: solo importa cuáles.'], [10.0, 19.4, 'Si importara el orden habría cinco por cuatro por tres, sesenta. Pero cada copa aparece seis veces, una por cada orden de sus tres sabores.'], [20.0, 29.4, 'Sesenta entre seis: diez copas distintas. Contar grupos es contar filas y dividir entre las repeticiones.']] },
    { id: 'formula', name: 'LA FÓRMULA', dur: 28,
      caps: [[0.8, 8.4, 'C(n, r): escoger r de n', 'sin importar el orden'], [9.0, 17.4, 'Arriba r factores bajando desde n', 'abajo r!'], [18.0, 26.4, 'C(5, 3) = 5 · 4 · 3 / 3! = 10', 'C(7, 2) = 7 · 6 / 2 = 21']],
      narr: [[0.8, 8.4, 'La cantidad de grupos de ere elementos escogidos de ene se escribe ce de ene, ere, y se lee combinaciones de ene en ere.'], [9.0, 17.4, 'Arriba van ere factores que bajan desde ene; abajo, ere factorial, para quitar los órdenes.'], [18.0, 26.4, 'Ce de cinco, tres: sesenta entre seis, diez. Ce de siete, dos: siete por seis entre dos, veintiuno.']] },
    { id: 'dejar', name: 'ESCOGER ES DEJAR', dur: 30,
      caps: [[0.8, 9.4, 'Números de 4 cifras con 1 a 6', 'cada cifra mayor que la anterior'], [10.0, 19.4, 'Basta escoger las 4 cifras', 'el orden creciente es uno solo'], [20.0, 29.4, 'C(6, 4) = C(6, 2) = 15', 'escoger 4 es lo mismo que dejar 2']],
      narr: [[0.8, 9.4, 'Con los dígitos del uno al seis se forman números de cuatro cifras, cada una mayor que la anterior, como mil trescientos cincuenta y seis.'], [10.0, 19.4, 'Al escoger cuatro dígitos, solo hay una forma de ponerlos en orden creciente. Así que basta escoger cuáles.'], [20.0, 29.4, 'Escoger cuatro de seis es lo mismo que escoger los dos que se dejan por fuera: seis por cinco entre dos, quince.']] },
    { id: 'triangulos', name: 'TRIÁNGULOS EN UN CÍRCULO', dur: 30,
      caps: [[0.8, 9.4, '6 puntos sobre una circunferencia', 'cada tres forman un triángulo'], [10.0, 19.4, 'Un triángulo = 3 puntos, sin orden', 'ABC es el mismo que CAB'], [20.0, 29.4, 'C(6, 3) = 6 · 5 · 4 / 6 = 20', 'veinte triángulos']],
      narr: [[0.8, 9.4, 'Otro problema: sobre una circunferencia se marcan seis puntos. Hay que contar los triángulos con sus tres vértices en esos puntos.'], [10.0, 19.4, 'Tres puntos cualesquiera de una circunferencia nunca están en línea: siempre forman triángulo. Y el orden no importa.'], [20.0, 29.4, 'Es escoger tres de seis: seis por cinco por cuatro, entre seis. Veinte triángulos.']] },
    { id: 'saludos', name: 'LOS 45 SALUDOS', dur: 30,
      caps: [[0.8, 9.4, 'Cada uno saluda una vez a cada otro', 'hubo 45 saludos'], [10.0, 19.4, 'Un saludo = una pareja', 'C(n, 2) = n · (n − 1) / 2'], [20.0, 29.4, 'n · (n − 1) = 90', '10 · 9 = 90: eran 10 personas']],
      narr: [[0.8, 9.4, 'Otro problema: al empezar una reunión, cada asistente saludó de mano una sola vez a cada uno de los demás. Hubo cuarenta y cinco saludos.'], [10.0, 19.4, 'Cada saludo es una pareja de personas, sin orden: hay ene por ene menos uno, entre dos.'], [20.0, 29.4, 'Entonces ene por ene menos uno es noventa. Dos números seguidos que dan noventa: diez y nueve. Eran diez personas.']] },
    { id: 'diagonales', name: 'LAS DIAGONALES', dur: 28,
      caps: [[0.8, 8.4, 'Un decágono: 10 vértices', 'parejas de vértices: C(10, 2) = 45'], [9.0, 17.4, '10 de esas parejas son lados', 'el resto son diagonales'], [18.0, 26.4, '45 − 10 = 35 diagonales', 'o 10 · 7 / 2']],
      narr: [[0.8, 8.4, 'Un polígono de diez lados tiene diez vértices. Las parejas de vértices son ce de diez, dos: cuarenta y cinco.'], [9.0, 17.4, 'Pero diez de esas parejas son vecinas: forman los lados, no diagonales.'], [18.0, 26.4, 'Quedan treinta y cinco diagonales. También sale así: cada vértice lanza siete diagonales, y cada una se cuenta dos veces.']] },
    { id: 'mixtos', name: 'GRUPOS MIXTOS', dur: 28,
      caps: [[0.8, 8.4, 'Dos condiciones a la vez', 'se escoge por separado'], [9.0, 17.4, 'Una parte de cada grupo', 'cada parte con su C(n, r)'], [18.0, 26.4, 'Y se multiplican', 'una elección y luego la otra']],
      narr: [[0.8, 8.4, 'Cuando un grupo pide cierta cantidad de cada clase, se escoge cada clase por separado.'], [9.0, 17.4, 'Las mujeres del comité salen del grupo de mujeres, y los hombres, del grupo de hombres, cada uno con su combinación.'], [18.0, 26.4, 'Luego se multiplican, porque es una elección y después la otra.']] },
    { id: 'resolver', name: 'EL COMITÉ, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, '2 de las 4 mujeres', 'C(4, 2) = 4 · 3 / 2 = 6'], [10.0, 19.4, '1 de los 5 hombres', 'C(5, 1) = 5'], [20.0, 29.4, '6 · 5 = 30 comités', 'no 60: el orden no importa']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Las dos mujeres se escogen entre cuatro: cuatro por tres entre dos, seis parejas.'], [10.0, 19.4, 'El hombre se escoge entre cinco: cinco opciones.'], [20.0, 29.4, 'Seis por cinco: treinta comités. Si se contara el orden saldrían más, pero en un comité no hay cargos.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Hay 30 comités', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: treinta. Dos de un grupo y uno del otro, y se multiplica.'], [11.0, 20.4, 'Sin orden se divide entre los órdenes repetidos; escoger es dejar; saludos, triángulos y diagonales son parejas o tríos.'], [21.0, 29.4, 'Si no importa el orden, se divide.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 5', TITLE = 'COMBINACIONES', LINE = 'Si no importa el orden, se divide.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-co-3', KEYS: ['diagonales', 'helado', '45'] };
})();
if (typeof module !== 'undefined') module.exports = D;
