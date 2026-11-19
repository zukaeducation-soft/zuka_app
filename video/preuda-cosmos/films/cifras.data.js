// «Criptoaritmética» · Preuniversitario, razonamiento lógico, mundo 12 (Aritmética), lección pu-ar-3. Datos puros.
// Reto: la edad del padre AB y la del hijo BA, 27 años de diferencia y cifras que suman 9 → 63. En medio: el valor de cada cifra
// (AB = 10A + B), invertir (AB − BA = 9(A − B), AB + BA = 11(A + B)), AB + BA = 165 (cuatro números), el número que es cuatro veces
// la suma de sus cifras (12, 24, 36, 48), letras que esconden cifras (AB + B = BA → 89 + 9 = 98), el mayor número de tres cifras con
// producto 24 y suma 9 (432) y las cifras de 2¹⁰ · 5⁷ (8).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA EDAD AL REVÉS', dur: 30,
      caps: [[1.0, 9.4, 'La edad del padre: dos cifras', 'al invertirlas sale la del hijo'], [10.0, 19.4, 'El padre es 27 años mayor', 'y las dos cifras suman 9'], [20.0, 29.4, 'Qué edad tiene el padre', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. La edad de un padre es un número de dos cifras, y al invertirlas sale la edad de su hijo.'], [10.0, 19.4, 'El padre es veintisiete años mayor que el hijo, y las dos cifras suman nueve.'], [20.0, 29.4, 'Hay que hallar la edad del padre. Al final lo resolvemos.']] },
    { id: 'valor', name: 'CADA CIFRA VALE SU LUGAR', dur: 28,
      caps: [[0.8, 8.4, 'En 47, el 4 vale 40', 'la cifra de las decenas vale diez veces'], [9.0, 17.4, 'AB = 10A + B', 'con letras, igual'], [18.0, 26.4, 'ABC = 100A + 10B + C', 'cada lugar a la izquierda, diez veces más']],
      narr: [[0.8, 8.4, 'En el número cuarenta y siete, el cuatro no vale cuatro: vale cuarenta, porque está en las decenas.'], [9.0, 17.4, 'Con letras pasa igual: el número A B vale diez veces A más B.'], [18.0, 26.4, 'Y uno de tres cifras vale cien veces A, más diez veces B, más C. Cada lugar a la izquierda vale diez veces más.']] },
    { id: 'invertir', name: 'INVERTIR LAS CIFRAS', dur: 28,
      caps: [[0.8, 8.4, 'AB − BA = 9A − 9B = 9(A − B)', 'la resta siempre es múltiplo de 9'], [9.0, 17.4, 'AB + BA = 11A + 11B = 11(A + B)', 'la suma siempre es múltiplo de 11'], [18.0, 26.4, '52 − 25 = 27 = 9 · 3', '52 + 25 = 77 = 11 · 7']],
      narr: [[0.8, 8.4, 'Al invertir las cifras pasa algo útil. A B menos B A es nueve A menos nueve B: siempre un múltiplo de nueve.'], [9.0, 17.4, 'Y A B más B A es once A más once B: siempre un múltiplo de once.'], [18.0, 26.4, 'Por ejemplo, cincuenta y dos menos veinticinco es veintisiete, nueve por tres. Y sumados dan setenta y siete, once por siete.']] },
    { id: 'suma165', name: 'LA SUMA 165', dur: 30,
      caps: [[0.8, 9.4, 'AB + BA = 165', 'cuántos números AB cumplen'], [10.0, 19.4, '11(A + B) = 165', 'A + B = 15'], [20.0, 29.4, '69, 78, 87 y 96', 'son 4 números']],
      narr: [[0.8, 9.4, 'Otro problema: un número de dos cifras y el que resulta de invertirlas suman ciento sesenta y cinco. Hay que contar cuántos cumplen.'], [10.0, 19.4, 'La suma es once por A más B. Once por A más B es ciento sesenta y cinco, así que las cifras suman quince.'], [20.0, 29.4, 'Dos cifras que suman quince: seis y nueve, siete y ocho, ocho y siete, nueve y seis. Son cuatro números.']] },
    { id: 'cuatro', name: 'CUATRO VECES SUS CIFRAS', dur: 28,
      caps: [[0.8, 8.4, 'AB = 4 · (A + B)', 'un número es 4 veces la suma de sus cifras'], [9.0, 17.4, '10A + B = 4A + 4B', '6A = 3B: B = 2A'], [18.0, 26.4, '12, 24, 36 y 48', 'B no pasa de 9: A llega hasta 4']],
      narr: [[0.8, 8.4, 'Ahora, los números de dos cifras que son cuatro veces la suma de sus cifras.'], [9.0, 17.4, 'Diez A más B igual a cuatro A más cuatro B. Queda seis A igual a tres B: la cifra B es el doble de A.'], [18.0, 26.4, 'Doce, veinticuatro, treinta y seis y cuarenta y ocho. Con A igual a cinco, B sería diez: ya no es una cifra.']] },
    { id: 'letras', name: 'LETRAS QUE ESCONDEN CIFRAS', dur: 28,
      caps: [[0.8, 8.4, 'AB + B = BA', 'cada letra es una cifra distinta'], [9.0, 17.4, '10A + 2B = 10B + A', '9A = 8B'], [18.0, 26.4, 'A = 8 y B = 9', '89 + 9 = 98']],
      narr: [[0.8, 8.4, 'En criptoaritmética, cada letra esconde una cifra distinta. Por ejemplo: A B más B es igual a B A.'], [9.0, 17.4, 'Con el valor de cada lugar: diez A más dos B igual a diez B más A. Queda nueve A igual a ocho B.'], [18.0, 26.4, 'Como son cifras, A es ocho y B es nueve: ochenta y nueve más nueve, noventa y ocho.']] },
    { id: 'mayor', name: 'EL MAYOR DE TRES CIFRAS', dur: 30,
      caps: [[0.8, 9.4, 'Producto de las cifras: 24', 'suma de las cifras: 9'], [10.0, 19.4, '2 · 3 · 4 = 24 y 2 + 3 + 4 = 9', 'otras ternas fallan en la suma'], [20.0, 29.4, 'Ordenadas de mayor a menor', 'el número es 432']],
      narr: [[0.8, 9.4, 'Otro problema: el mayor número de tres cifras cuyas cifras multiplican veinticuatro y suman nueve.'], [10.0, 19.4, 'Ternas con producto veinticuatro: uno, tres, ocho suma doce; dos, dos, seis suma diez. Dos, tres, cuatro suma nueve.'], [20.0, 29.4, 'Para que sea el mayor, la cifra más grande va adelante: cuatrocientos treinta y dos.']] },
    { id: 'cuantas', name: 'CUÁNTAS CIFRAS TIENE', dur: 28,
      caps: [[0.8, 8.4, '2¹⁰ · 5⁷: cuántas cifras', 'sin calcularlo todo'], [9.0, 17.4, 'Cada 2 · 5 es un 10', '2¹⁰ · 5⁷ = 2³ · 10⁷'], [18.0, 26.4, '8 · 10⁷ = 80 000 000', 'tiene 8 cifras']],
      narr: [[0.8, 8.4, 'Las cifras también se cuentan sin hacer toda la cuenta. Por ejemplo, cuántas cifras tiene dos a la diez por cinco a la siete.'], [9.0, 17.4, 'Cada dos por cinco forma un diez. Siete parejas forman diez a la siete, y sobran tres doses.'], [18.0, 26.4, 'Queda ocho por diez a la siete: un ocho seguido de siete ceros. Ocho cifras.']] },
    { id: 'resolver', name: 'LA EDAD, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'AB − BA = 9(A − B) = 27', 'A − B = 3'], [10.0, 19.4, 'A + B = 9 y A − B = 3', 'A = 6 y B = 3'], [20.0, 29.4, 'El padre tiene 63 y el hijo 36', '63 − 36 = 27']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La diferencia entre A B y B A es nueve veces A menos B, y vale veintisiete: A menos B es tres.'], [10.0, 19.4, 'Dos cifras que suman nueve y se diferencian en tres: seis y tres.'], [20.0, 29.4, 'El padre tiene sesenta y tres años y el hijo treinta y seis. Sesenta y tres menos treinta y seis: veintisiete.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El padre tiene 63 años', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: sesenta y tres años.'], [11.0, 20.4, 'Cada cifra vale su lugar, invertir da múltiplos de nueve y de once, y las letras se despejan con su valor posicional.'], [21.0, 29.4, 'Cada cifra vale lo que vale su lugar.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 12', TITLE = 'CRIPTOARITMÉTICA', LINE = 'Cada cifra vale lo que vale su lugar.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ar-3', KEYS: ['165', 'padre', '432', '98'] };
})();
if (typeof module !== 'undefined') module.exports = D;
