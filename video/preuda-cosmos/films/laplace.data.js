// «Espacio muestral y Laplace» · Preuniversitario, razonamiento lógico, mundo 16 (Probabilidad), lección pu-pb-1. Datos puros.
// Reto: los números de dos cifras con los dígitos 1, 2, 3 y 4 (con repetición); la probabilidad de que uno al azar sea múltiplo de 3
// → 5/16. En medio: favorables sobre posibles (un dado, múltiplo de 3 → 1/3), el espacio muestral de dos monedas (una cara y un sello
// → 1/2), un número primo del 1 al 30 (1/3), el club (entre los 10 zurdos, 4 mujeres → 2/5), los resultados que no son igual de
// probables (la suma de dos dados), entre 0 y 1, y las cinco fichas (dos al tiempo, suma par → 2/5).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'NÚMEROS CON 1, 2, 3 Y 4', dur: 30,
      caps: [[1.0, 9.4, 'Dos cifras con los dígitos 1 a 4', 'se pueden repetir dígitos'], [10.0, 19.4, 'Se escoge uno al azar', 'que sea múltiplo de 3'], [20.0, 29.4, 'La probabilidad', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Se escriben todos los números de dos cifras que se pueden formar con los dígitos uno, dos, tres y cuatro, repitiendo si se quiere.'], [10.0, 19.4, 'Se escoge uno de esos números al azar. Hay que hallar la probabilidad de que sea múltiplo de tres.'], [20.0, 29.4, 'Primero hay que saber cuántos números hay, y después cuántos sirven. Al final lo resolvemos.']] },
    { id: 'laplace', name: 'FAVORABLES SOBRE POSIBLES', dur: 28,
      caps: [[0.8, 8.4, 'Un dado: 6 resultados posibles', 'todos igual de probables'], [9.0, 17.4, 'Múltiplo de 3: el 3 y el 6', '2 favorables'], [18.0, 26.4, 'P = 2 / 6 = 1/3', 'favorables ÷ posibles']],
      narr: [[0.8, 8.4, 'La probabilidad clásica se calcula así. Un dado tiene seis resultados posibles, y todos son igual de probables.'], [9.0, 17.4, 'Si se quiere un múltiplo de tres, sirven el tres y el seis: dos resultados favorables.'], [18.0, 26.4, 'La probabilidad es dos de seis, un tercio. Casos favorables sobre casos posibles.']] },
    { id: 'espacio', name: 'EL ESPACIO MUESTRAL', dur: 28,
      caps: [[0.8, 8.4, 'Dos monedas: qué puede salir', 'CC, CS, SC, SS'], [9.0, 17.4, 'CS y SC son distintos', 'la primera moneda y la segunda'], [18.0, 26.4, 'Una cara y un sello: 2 de 4', 'P = 1/2, no 1/3']],
      narr: [[0.8, 8.4, 'El espacio muestral es la lista de todo lo que puede salir. Con dos monedas: cara cara, cara sello, sello cara y sello sello.'], [9.0, 17.4, 'Cara sello y sello cara son distintos: no es lo mismo que la cara salga en la primera moneda que en la segunda.'], [18.0, 26.4, 'Una cara y un sello son dos de los cuatro: un medio. Quien olvida el orden diría un tercio.']] },
    { id: 'primos', name: 'UN PRIMO AL AZAR', dur: 30,
      caps: [[0.8, 9.4, 'Un número del 1 al 30, al azar', 'que sea primo'], [10.0, 19.4, '2, 3, 5, 7, 11, 13, 17, 19, 23, 29', '10 primos'], [20.0, 29.4, 'P = 10 / 30 = 1/3', 'favorables sobre posibles']],
      narr: [[0.8, 9.4, 'Otro problema: se escoge al azar un número entero del uno al treinta. Hay que hallar la probabilidad de que sea primo.'], [10.0, 19.4, 'Los primos hasta treinta son dos, tres, cinco, siete, once, trece, diecisiete, diecinueve, veintitrés y veintinueve: diez.'], [20.0, 29.4, 'Diez de treinta: un tercio.']] },
    { id: 'club', name: 'ENTRE LOS ZURDOS', dur: 30,
      caps: [[0.8, 9.4, 'Club: 10 zurdos, 6 de ellos hombres', 'se escoge un zurdo al azar'], [10.0, 19.4, 'Los posibles ya no son 50', 'son solo los 10 zurdos'], [20.0, 29.4, 'Mujeres zurdas: 4', 'P = 4 / 10 = 2/5']],
      narr: [[0.8, 9.4, 'Otro problema: en un club de cincuenta socios hay diez zurdos, y seis de ellos son hombres. Se escoge al azar uno de los zurdos.'], [10.0, 19.4, 'Cuidado: los casos posibles ya no son los cincuenta socios, sino solo los diez zurdos.'], [20.0, 29.4, 'De esos diez, cuatro son mujeres. La probabilidad de que sea mujer es cuatro décimos: dos quintos.']] },
    { id: 'igual', name: 'IGUAL DE PROBABLES', dur: 28,
      caps: [[0.8, 8.4, 'La suma de dos dados: de 2 a 12', '11 valores'], [9.0, 17.4, 'Pero el 7 sale de 6 maneras', 'y el 2 de una sola'], [18.0, 26.4, 'Se cuentan los 36 pares', 'no las 11 sumas']],
      narr: [[0.8, 8.4, 'La regla solo vale si los resultados son igual de probables. La suma de dos dados va de dos a doce: once valores.'], [9.0, 17.4, 'Pero no son igual de probables: el siete sale de seis maneras, y el dos de una sola.'], [18.0, 26.4, 'Por eso se cuentan los treinta y seis pares de dados, que sí son igual de probables, y no las once sumas.']] },
    { id: 'extremos', name: 'ENTRE 0 Y 1', dur: 28,
      caps: [[0.8, 8.4, 'Imposible: P = 0', 'sacar 7 en un dado'], [9.0, 17.4, 'Seguro: P = 1', 'sacar menos de 7 en un dado'], [18.0, 26.4, 'Toda probabilidad está entre 0 y 1', 'una respuesta de 5/4 está mal']],
      narr: [[0.8, 8.4, 'Una probabilidad siempre está entre cero y uno. Lo imposible, como sacar siete en un dado, tiene probabilidad cero.'], [9.0, 17.4, 'Lo seguro, como sacar menos de siete, tiene probabilidad uno.'], [18.0, 26.4, 'Todo lo demás queda en medio. Si una cuenta da más que uno, hay un error.']] },
    { id: 'fichas', name: 'DOS FICHAS A LA VEZ', dur: 28,
      caps: [[0.8, 8.4, 'Fichas del 1 al 5, se sacan dos', 'parejas posibles: 10'], [9.0, 17.4, 'Suma par: dos impares o dos pares', '1-3, 1-5, 3-5 y 2-4'], [18.0, 26.4, 'P = 4 / 10 = 2/5', 'al mismo tiempo, sin orden']],
      narr: [[0.8, 8.4, 'Si se sacan dos fichas a la vez de cinco numeradas del uno al cinco, las parejas posibles son diez.'], [9.0, 17.4, 'La suma es par si las dos son impares, o las dos pares: uno y tres, uno y cinco, tres y cinco, y dos y cuatro.'], [18.0, 26.4, 'Cuatro de diez: dos quintos. Al sacarlas a la vez no hay orden.']] },
    { id: 'resolver', name: 'LOS NÚMEROS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, 'Posibles: 4 · 4 = 16 números', 'de 11 a 44'], [10.0, 19.4, 'Múltiplo de 3: cifras suman 3 o 6', '12, 21, 24, 42 y 33'], [20.0, 29.4, 'P = 5 / 16', '5 favorables de 16']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La primera cifra tiene cuatro opciones y la segunda también: dieciséis números posibles.'], [10.0, 19.4, 'Un número es múltiplo de tres si sus cifras suman múltiplo de tres: tres o seis. Doce, veintiuno, veinticuatro, cuarenta y dos y treinta y tres.'], [20.0, 29.4, 'Cinco favorables de dieciséis: la probabilidad es cinco dieciseisavos.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'La probabilidad es 5/16', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cinco dieciseisavos.'], [11.0, 20.4, 'Favorables sobre posibles, todos igual de probables, el espacio muestral completo y con orden si importa, y siempre entre cero y uno.'], [21.0, 29.4, 'Primero cuenta lo posible; después, lo que sirve.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 16', TITLE = 'ESPACIO MUESTRAL', LINE = 'Cuenta lo posible; después, lo que sirve.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-pb-1', KEYS: ['zurdos', 'fichas', '5/16', 'monedas'] };
})();
if (typeof module !== 'undefined') module.exports = D;
