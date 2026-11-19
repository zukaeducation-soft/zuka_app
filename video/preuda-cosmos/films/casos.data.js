// «Conteo por casos y complemento» · Preuniversitario, razonamiento lógico, mundo 5 (Conteo), lección pu-co-4. Datos puros.
// Reto: los números del 1 al 100 que son múltiplos de 3 o de 5 (33 + 20 − 6 = 47). En medio: contar por casos (números de tres
// cifras cuyas cifras suman 4: 10), casos que no se pisan, el complemento (Ana y Beto no juntos: 24 − 12 = 12), «al menos
// un 7» (90 − 72 = 18), los pares de tres cifras con 1 a 5 sin repetir (24), contar múltiplos y la inclusión–exclusión.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'MÚLTIPLOS DE 3 O DE 5', dur: 30,
      caps: [[1.0, 9.4, 'Del 1 al 100', 'los múltiplos de 3 o de 5'], [10.0, 19.4, '«O» incluye a los dos', 'el 15 es de los dos y cuenta una vez'], [20.0, 29.4, 'Cuántos son', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Hay que contar los números naturales del uno al cien que son múltiplos de tres o de cinco.'], [10.0, 19.4, 'La palabra o incluye a los que son de los dos, como el quince, pero cada número se cuenta una sola vez.'], [20.0, 29.4, 'Sumar los dos grupos sin cuidado cuenta algunos números dos veces. Al final lo resolvemos.']] },
    { id: 'casos', name: 'CONTAR POR CASOS', dur: 30,
      caps: [[0.8, 9.4, 'Tres cifras que suman 4', 'se separa por la primera cifra'], [10.0, 19.4, 'Empieza en 1: 4 · empieza en 2: 3', 'empieza en 3: 2 · empieza en 4: 1'], [20.0, 29.4, '4 + 3 + 2 + 1 = 10', 'cada caso, fácil de contar']],
      narr: [[0.8, 9.4, 'Se cuentan los números de tres cifras cuyas cifras suman cuatro. Se separan en casos según la primera cifra.'], [10.0, 19.4, 'Si empieza en uno, las otras dos suman tres: cuatro números. Si empieza en dos, tres números; en tres, dos; en cuatro, solo el cuatrocientos.'], [20.0, 29.4, 'En total diez. Un problema difícil se vuelve varios fáciles.']] },
    { id: 'pisan', name: 'CASOS QUE NO SE PISAN', dur: 28,
      caps: [[0.8, 8.4, 'Cada número cae en un solo caso', 'la primera cifra es una sola'], [9.0, 17.4, 'Y ninguno se queda por fuera', 'los casos cubren todo'], [18.0, 26.4, 'Así se puede sumar', 'sin contar dos veces ni olvidar']],
      narr: [[0.8, 8.4, 'Para sumar casos, cada número debe caer en uno solo: un número no puede empezar en uno y en dos a la vez.'], [9.0, 17.4, 'Y ningún número debe quedar por fuera: las primeras cifras posibles van de uno a cuatro, y todas están.'], [18.0, 26.4, 'Si los casos no se pisan y cubren todo, se suman sin contar dos veces ni olvidar ninguno.']] },
    { id: 'complemento', name: 'EL COMPLEMENTO', dur: 30,
      caps: [[0.8, 9.4, 'Cuatro sillas: Ana y Beto separados', 'contar los separados es engorroso'], [10.0, 19.4, 'Total: 4! = 24 · juntos: 3! · 2 = 12', 'se cuentan los que no sirven'], [20.0, 29.4, '24 − 12 = 12', 'lo que sirve = todo − lo que no sirve']],
      narr: [[0.8, 9.4, 'Otro problema: Ana, Beto, Carla y Diego se sientan en cuatro sillas, y Ana y Beto no deben quedar juntos.'], [10.0, 19.4, 'Todas las filas son veinticuatro. Las que tienen a Ana y Beto juntos son doce: el bloque y los otros dos, por dos.'], [20.0, 29.4, 'Veinticuatro menos doce: doce. A veces es más fácil contar lo que no sirve y restarlo del total.']] },
    { id: 'almenos', name: '«AL MENOS UNO»', dur: 28,
      caps: [[0.8, 8.4, 'Números de dos cifras con algún 7', 'uno, o dos: muchos casos'], [9.0, 17.4, 'Sin ningún 7: 8 · 9 = 72', 'la primera ni 0 ni 7; la segunda, no 7'], [18.0, 26.4, '90 − 72 = 18', '«al menos uno» pide complemento']],
      narr: [[0.8, 8.4, 'Se cuentan los números de dos cifras con al menos un siete. Contarlos directo tiene varios casos.'], [9.0, 17.4, 'Mejor contar los que no tienen ningún siete: ocho opciones para la primera cifra y nueve para la segunda, setenta y dos.'], [18.0, 26.4, 'Hay noventa números de dos cifras: noventa menos setenta y dos, dieciocho. La frase al menos uno pide complemento.']] },
    { id: 'pares', name: 'LOS PARES DE TRES CIFRAS', dur: 30,
      caps: [[0.8, 9.4, 'Con 1, 2, 3, 4 y 5, sin repetir', 'números de tres cifras pares'], [10.0, 19.4, 'La última cifra: 2 o 4', 'la casilla más exigente va primero'], [20.0, 29.4, '2 · 4 · 3 = 24', 'después las otras dos, sin repetir']],
      narr: [[0.8, 9.4, 'Otro problema: con los dígitos del uno al cinco, sin repetir, se forman números de tres cifras. Hay que contar los pares.'], [10.0, 19.4, 'Para que sea par, la última cifra debe ser dos o cuatro: se llena primero esa casilla.'], [20.0, 29.4, 'Quedan cuatro dígitos para la primera cifra y tres para la del medio: dos por cuatro por tres, veinticuatro.']] },
    { id: 'multiplos', name: 'CONTAR MÚLTIPLOS', dur: 28,
      caps: [[0.8, 8.4, 'Múltiplos de 3 hasta 100', '3, 6, 9, …, 99'], [9.0, 17.4, '100 ÷ 3 = 33.3…', 'la parte entera: 33 múltiplos'], [18.0, 26.4, 'De 5: 20 · de 15: 6', 'se divide y se quita lo decimal']],
      narr: [[0.8, 8.4, 'Para contar los múltiplos de tres del uno al cien no hace falta escribirlos todos.'], [9.0, 17.4, 'Cien entre tres da treinta y tres coma tres: hay treinta y tres múltiplos, del tres al noventa y nueve.'], [18.0, 26.4, 'De cinco hay veinte, y de quince, seis. Se divide y se toma la parte entera.']] },
    { id: 'doble', name: 'LOS QUE SE CUENTAN DOS VECES', dur: 30,
      caps: [[0.8, 9.4, 'Dos grupos que se cruzan', 'los del cruce están en los dos'], [10.0, 19.4, 'Al sumar, el cruce cuenta doble', 'por eso se resta una vez'], [20.0, 29.4, '|A ∪ B| = |A| + |B| − |A ∩ B|', 'sumar los dos y restar el cruce']],
      narr: [[0.8, 9.4, 'Cuando dos grupos se cruzan, hay elementos que pertenecen a los dos al mismo tiempo.'], [10.0, 19.4, 'Si se suman los dos grupos, esos elementos del cruce se cuentan dos veces. Hay que restarlos una vez.'], [20.0, 29.4, 'El tamaño de la unión es la suma de los dos menos el cruce. Se llama inclusión y exclusión.']] },
    { id: 'resolver', name: 'LOS MÚLTIPLOS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, 'Múltiplos de 3: 33', 'múltiplos de 5: 20'], [10.0, 19.4, 'De los dos: múltiplos de 15', '15, 30, 45, 60, 75, 90: seis'], [20.0, 29.4, '33 + 20 − 6 = 47', 'cada número, una sola vez']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Del uno al cien hay treinta y tres múltiplos de tres y veinte múltiplos de cinco.'], [10.0, 19.4, 'Los que son de los dos son los múltiplos de quince: quince, treinta, cuarenta y cinco, sesenta, setenta y cinco y noventa.'], [20.0, 29.4, 'Treinta y tres más veinte menos seis: cuarenta y siete números.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Son 47 números', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cuarenta y siete. Se suma, y se resta lo que se contó dos veces.'], [11.0, 20.4, 'Separar en casos que no se pisan, restar del total lo que no sirve y cuidar el cruce de dos grupos.'], [21.0, 29.4, 'A veces es más fácil contar lo que sobra.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 5', TITLE = 'CASOS Y COMPLEMENTO', LINE = 'A veces es más fácil contar lo que sobra.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-co-4', KEYS: ['47', 'múltiplos de 3 o de 5', 'algún 7'] };
})();
if (typeof module !== 'undefined') module.exports = D;
