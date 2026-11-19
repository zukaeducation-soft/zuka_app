// «Primos y divisibilidad» · Preuniversitario, razonamiento lógico, mundo 15 (Teoría de números), lección pu-nu-1. Datos puros.
// Reto: cuántos divisores positivos tiene 72 → 12. En medio: qué es un primo (exactamente dos divisores; el 1 no lo es; el 2 es el único
// par), el árbol de 90 = 2 · 3² · 5, contar divisores (18 = 2 · 3² → 6), los criterios de divisibilidad, los números del 1 al 60 sin
// divisor común con 60 (16), probar hasta la raíz (119 = 7 · 17) y los divisores primos de 2 310 (5).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LOS DIVISORES DE 72', dur: 30,
      caps: [[1.0, 9.4, 'Cuántos divisores positivos tiene 72', 'los números que lo dividen exacto'], [10.0, 19.4, 'Listarlos uno por uno es lento', 'y es fácil que se escape alguno'], [20.0, 29.4, 'Hay una forma de contarlos', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Hay que contar cuántos divisores positivos tiene el número setenta y dos: los números que lo dividen exacto.'], [10.0, 19.4, 'Se podrían listar uno por uno, pero es lento y es fácil que se escape alguno.'], [20.0, 29.4, 'Hay una forma de contarlos sin listarlos. Al final lo resolvemos.']] },
    { id: 'primo', name: 'QUÉ ES UN PRIMO', dur: 28,
      caps: [[0.8, 8.4, 'Primo: exactamente dos divisores', 'el 1 y él mismo'], [9.0, 17.4, '7 es primo; 9 = 3 · 3 no lo es', 'los no primos se llaman compuestos'], [18.0, 26.4, 'El 1 no es primo: tiene un divisor', 'el 2 es el único primo par']],
      narr: [[0.8, 8.4, 'Un número primo tiene exactamente dos divisores: el uno y él mismo.'], [9.0, 17.4, 'Siete es primo. Nueve no, porque también lo divide el tres. Los que no son primos se llaman compuestos.'], [18.0, 26.4, 'El uno no es primo: tiene un solo divisor. Y el dos es el único primo par; todos los demás pares son múltiplos de dos.']] },
    { id: 'arbol', name: 'EL ÁRBOL DE FACTORES', dur: 28,
      caps: [[0.8, 8.4, '90 se parte en dos factores', '90 = 9 · 10'], [9.0, 17.4, 'Cada rama se parte hasta los primos', '9 = 3 · 3 y 10 = 2 · 5'], [18.0, 26.4, '90 = 2 · 3² · 5', 'los primos son los ladrillos']],
      narr: [[0.8, 8.4, 'Todo número compuesto se puede partir en primos con un árbol. Noventa es nueve por diez.'], [9.0, 17.4, 'Cada rama se sigue partiendo hasta que solo quedan primos: nueve es tres por tres, y diez es dos por cinco.'], [18.0, 26.4, 'Noventa es dos por tres al cuadrado por cinco. Los primos son los ladrillos de todos los números.']] },
    { id: 'contar', name: 'CONTAR SIN LISTAR', dur: 28,
      caps: [[0.8, 8.4, '18 = 2 · 3²', 'cada divisor usa 2⁰ o 2¹, y 3⁰, 3¹ o 3²'], [9.0, 17.4, '2 opciones por 3 opciones', '2 · 3 = 6 divisores'], [18.0, 26.4, '1, 2, 3, 6, 9, 18', 'exponente + 1, y se multiplica']],
      narr: [[0.8, 8.4, 'Con la factorización se cuentan. Dieciocho es dos por tres al cuadrado: cada divisor usa el dos hasta una vez y el tres hasta dos.'], [9.0, 17.4, 'Son dos opciones por tres opciones: seis divisores.'], [18.0, 26.4, 'Uno, dos, tres, seis, nueve y dieciocho. La regla: a cada exponente se le suma uno, y se multiplican.']] },
    { id: 'criterios', name: 'LOS CRITERIOS', dur: 28,
      caps: [[0.8, 8.4, 'Por 2: termina en par; por 5: 0 o 5', 'por 10: termina en 0'], [9.0, 17.4, 'Por 3 y por 9: la suma de las cifras', '4 851: 4 + 8 + 5 + 1 = 18'], [18.0, 26.4, 'Por 4: las dos últimas cifras', '7 316: 16 es múltiplo de 4']],
      narr: [[0.8, 8.4, 'Para saber si un número es divisible sin dividir: por dos, termina en cifra par; por cinco, en cero o cinco; por diez, en cero.'], [9.0, 17.4, 'Por tres y por nueve se suman las cifras. Cuatro mil ochocientos cincuenta y uno suma dieciocho: es divisible por tres y por nueve.'], [18.0, 26.4, 'Por cuatro, basta mirar las dos últimas cifras: siete mil trescientos dieciséis termina en dieciséis, que es múltiplo de cuatro.']] },
    { id: 'coprimos', name: 'SIN DIVISOR COMÚN CON 60', dur: 30,
      caps: [[0.8, 9.4, 'Del 1 al 60, sin divisores con 60', 'aparte del 1'], [10.0, 19.4, '60 = 2² · 3 · 5', 'se quitan múltiplos de 2, de 3 y de 5'], [20.0, 29.4, '60 · 1/2 · 2/3 · 4/5 = 16', 'quedan 16 números']],
      narr: [[0.8, 9.4, 'Otro problema: hay que contar los números del uno al sesenta que no tienen ningún divisor común con sesenta, aparte del uno.'], [10.0, 19.4, 'Sesenta es dos al cuadrado por tres por cinco. Hay que quitar los múltiplos de dos, de tres y de cinco.'], [20.0, 29.4, 'La mitad no es par; de esos, dos tercios no son múltiplos de tres; y de esos, cuatro quintos no son de cinco: dieciséis.']] },
    { id: 'raiz', name: 'HASTA LA RAÍZ', dur: 28,
      caps: [[0.8, 8.4, 'Es 119 primo', 'parece, pero hay que probar'], [9.0, 17.4, 'Basta probar hasta √119 ≈ 10.9', '2, 3, 5 y 7'], [18.0, 26.4, '119 = 7 · 17', 'no es primo']],
      narr: [[0.8, 8.4, 'Para saber si un número es primo, como ciento diecinueve, hay que probar divisores. Parece primo, pero no basta parecer.'], [9.0, 17.4, 'Si tuviera un divisor, uno de los dos factores sería menor que su raíz, casi once. Basta probar dos, tres, cinco y siete.'], [18.0, 26.4, 'Siete lo divide: ciento diecinueve es siete por diecisiete. No es primo.']] },
    { id: 'dosmil', name: 'LOS PRIMOS DE 2 310', dur: 30,
      caps: [[0.8, 9.4, 'Divisores primos distintos de 2 310', 'cuántos son'], [10.0, 19.4, '2 310 = 2 · 1 155 = 2 · 3 · 385', '385 = 5 · 77 = 5 · 7 · 11'], [20.0, 29.4, '2 · 3 · 5 · 7 · 11', '5 divisores primos']],
      narr: [[0.8, 9.4, 'Otro problema: hay que contar los divisores primos distintos de dos mil trescientos diez.'], [10.0, 19.4, 'Termina en cero: es dos por mil ciento cincuenta y cinco. Sus cifras suman doce: entre tres da trescientos ochenta y cinco, que es cinco por setenta y siete.'], [20.0, 29.4, 'Setenta y siete es siete por once. Dos, tres, cinco, siete y once: cinco primos distintos.']] },
    { id: 'resolver', name: 'LOS DIVISORES, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, '72 = 8 · 9 = 2³ · 3²', 'la factorización'], [10.0, 19.4, '2⁰, 2¹, 2², 2³: 4 opciones', '3⁰, 3¹, 3²: 3 opciones'], [20.0, 29.4, '4 · 3 = 12 divisores', '1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Setenta y dos es ocho por nueve: dos al cubo por tres al cuadrado.'], [10.0, 19.4, 'Cada divisor usa el dos de cero a tres veces, cuatro opciones, y el tres de cero a dos veces, tres opciones.'], [20.0, 29.4, 'Cuatro por tres: doce divisores. Uno, dos, tres, cuatro, seis, ocho, nueve, doce, dieciocho, veinticuatro, treinta y seis y setenta y dos.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, '72 tiene 12 divisores', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: doce divisores.'], [11.0, 20.4, 'Primo es tener dos divisores; todo número se parte en primos; los divisores se cuentan con los exponentes, y se prueba hasta la raíz.'], [21.0, 29.4, 'Los primos son los ladrillos de los números.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 15', TITLE = 'PRIMOS Y DIVISIBILIDAD', LINE = 'Los primos son los ladrillos.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-nu-1', KEYS: ['119', '2 310', '4 851', '90'] };
})();
if (typeof module !== 'undefined') module.exports = D;
