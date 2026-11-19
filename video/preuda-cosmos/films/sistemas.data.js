// «Sistemas y desigualdades» · Preuniversitario, razonamiento lógico, mundo 13 (Ecuaciones), lección pu-ec-3. Datos puros.
// Reto: la balanza (2 cubos pesan como 3 esferas; 1 esfera y 1 pirámide, como 1 cubo) → 1 cubo pesa como 3 pirámides. En medio: dos
// incógnitas piden dos pistas (x + y = 12, x − y = 2 → 7 y 5), sustituir (y = 2x, x + y = 18 → 6 y 12), las entradas del teatro (50
// entradas de 12 000 y 7 000 por 450 000 → 20 adultos), cada ecuación es una recta (se cruzan en (7, 5)), la desigualdad que se voltea
// (4 − 2x > −6 → x < 5), 3x − 7 < 20 (8 enteros positivos) y dos desigualdades a la vez (−1 < 2x + 3 ≤ 9 → 5 enteros).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA BALANZA DE FORMAS', dur: 30,
      caps: [[1.0, 9.4, '2 cubos pesan como 3 esferas', 'cada forma tiene su propio peso'], [10.0, 19.4, '1 esfera y 1 pirámide, como 1 cubo', 'dos balanzas en equilibrio'], [20.0, 29.4, 'Cuántas pirámides pesan como 1 cubo', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En una balanza, dos cubos pesan lo mismo que tres esferas. Todos los objetos de una misma forma pesan igual.'], [10.0, 19.4, 'Y una esfera con una pirámide pesan lo mismo que un cubo.'], [20.0, 29.4, 'Hay que hallar cuántas pirámides pesan lo mismo que un cubo. Al final lo resolvemos.']] },
    { id: 'dos', name: 'DOS INCÓGNITAS, DOS PISTAS', dur: 28,
      caps: [[0.8, 8.4, 'x + y = 12 tiene muchas soluciones', '1 y 11, 5 y 7, 7 y 5…'], [9.0, 17.4, 'Una segunda pista: x − y = 2', 'se suman: 2x = 14'], [18.0, 26.4, 'x = 7 y y = 5', 'dos incógnitas necesitan dos pistas']],
      narr: [[0.8, 8.4, 'Con dos incógnitas, una sola ecuación no basta: equis más ye igual a doce tiene muchísimas soluciones.'], [9.0, 17.4, 'Una segunda pista, equis menos ye igual a dos, deja una sola. Si se suman las dos ecuaciones, ye desaparece: dos equis es catorce.'], [18.0, 26.4, 'Equis es siete y ye es cinco. Dos incógnitas necesitan dos pistas.']] },
    { id: 'sustituir', name: 'SUSTITUIR', dur: 28,
      caps: [[0.8, 8.4, 'y = 2x y x + y = 18', 'una ya dice cuánto vale y'], [9.0, 17.4, 'Se reemplaza: x + 2x = 18', '3x = 18 → x = 6'], [18.0, 26.4, 'y = 2 · 6 = 12', 'comprobación: 6 + 12 = 18']],
      narr: [[0.8, 8.4, 'Otra forma es sustituir. Si una ecuación dice que ye es dos equis, y la otra que equis más ye es dieciocho...'], [9.0, 17.4, 'Se reemplaza ye por dos equis: equis más dos equis es dieciocho, así que equis es seis.'], [18.0, 26.4, 'Entonces ye es doce. Y seis más doce da dieciocho: cumple.']] },
    { id: 'entradas', name: 'LAS ENTRADAS DEL TEATRO', dur: 30,
      caps: [[0.8, 9.4, 'Adulto 12 000, niño 7 000', 'se vendieron 50 entradas por 450 000'], [10.0, 19.4, 'a + n = 50', '12 000a + 7 000n = 450 000'], [20.0, 29.4, '5 000a = 100 000 → a = 20', '20 adultos y 30 niños']],
      narr: [[0.8, 9.4, 'Otro problema: en un teatro, la entrada de adulto cuesta doce mil y la de niño siete mil. Se vendieron cincuenta entradas por cuatrocientos cincuenta mil.'], [10.0, 19.4, 'Hay dos pistas: los adultos más los niños son cincuenta, y lo que pagaron todos suma cuatrocientos cincuenta mil.'], [20.0, 29.4, 'Si todos fueran niños, se pagarían trescientos cincuenta mil. Cada adulto suma cinco mil más, y faltan cien mil: veinte adultos.']] },
    { id: 'recta', name: 'DOS RECTAS QUE SE CRUZAN', dur: 28,
      caps: [[0.8, 8.4, 'Cada ecuación es una recta', 'todos sus puntos la cumplen'], [9.0, 17.4, 'x + y = 12 y x − y = 2', 'se cruzan en un solo punto'], [18.0, 26.4, 'El cruce: (7, 5)', 'la solución del sistema']],
      narr: [[0.8, 8.4, 'En el plano, cada ecuación con dos incógnitas es una recta: todos sus puntos la cumplen.'], [9.0, 17.4, 'Las rectas equis más ye igual a doce y equis menos ye igual a dos se cruzan en un solo punto.'], [18.0, 26.4, 'Ese punto, siete y cinco, cumple las dos: es la solución del sistema.']] },
    { id: 'voltea', name: 'EL SIGNO SE VOLTEA', dur: 28,
      caps: [[0.8, 8.4, '4 − 2x > −6', 'se resuelve casi como una ecuación'], [9.0, 17.4, '−2x > −10', 'al dividir entre −2, el signo se voltea'], [18.0, 26.4, 'x < 5', '3 < 5, pero −3 > −5']],
      narr: [[0.8, 8.4, 'Una desigualdad se resuelve casi como una ecuación. Cuatro menos dos equis es mayor que menos seis.'], [9.0, 17.4, 'Se resta cuatro: menos dos equis es mayor que menos diez. Al dividir entre un número negativo, el signo se voltea.'], [18.0, 26.4, 'Queda equis menor que cinco. La razón: tres es menor que cinco, pero menos tres es mayor que menos cinco.']] },
    { id: 'enteros', name: 'CUÁNTOS ENTEROS', dur: 30,
      caps: [[0.8, 9.4, '3x − 7 < 20', 'enteros positivos que la cumplen'], [10.0, 19.4, '3x < 27 → x < 9', 'el 9 no entra: es menor estricto'], [20.0, 29.4, '1, 2, 3, …, 8', 'son 8 enteros positivos']],
      narr: [[0.8, 9.4, 'Otro problema: hay que contar los enteros positivos que cumplen tres equis menos siete, menor que veinte.'], [10.0, 19.4, 'Se suma siete: tres equis menor que veintisiete, equis menor que nueve. El nueve no entra: es menor, no menor o igual.'], [20.0, 29.4, 'Quedan uno, dos, tres, hasta ocho: ocho enteros positivos.']] },
    { id: 'doble', name: 'DOS DESIGUALDADES A LA VEZ', dur: 28,
      caps: [[0.8, 8.4, '−1 < 2x + 3 ≤ 9', 'tres partes: se opera en todas'], [9.0, 17.4, '−4 < 2x ≤ 6 → −2 < x ≤ 3', 'el −2 no entra; el 3 sí'], [18.0, 26.4, '−1, 0, 1, 2, 3', 'cinco enteros']],
      narr: [[0.8, 8.4, 'A veces hay dos desigualdades juntas: menos uno es menor que dos equis más tres, que es menor o igual que nueve.'], [9.0, 17.4, 'Se resta tres y se divide entre dos en las tres partes. Equis queda entre menos dos, que no entra, y tres, que sí.'], [18.0, 26.4, 'Los enteros son menos uno, cero, uno, dos y tres: cinco.']] },
    { id: 'resolver', name: 'LA BALANZA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Se duplica la segunda balanza', '2 esferas + 2 pirámides = 2 cubos'], [10.0, 19.4, '2 cubos = 3 esferas', 'así que 2 pirámides = 1 esfera'], [20.0, 29.4, '1 cubo = 1 esfera + 1 pirámide', '= 2 pirámides + 1 = 3 pirámides']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Se duplica la segunda balanza: dos esferas y dos pirámides pesan como dos cubos.'], [10.0, 19.4, 'Pero dos cubos pesan como tres esferas. Quitando dos esferas de cada lado: dos pirámides pesan como una esfera.'], [20.0, 29.4, 'Un cubo es una esfera más una pirámide: dos pirámides más una. Tres pirámides.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Un cubo pesa como 3 pirámides', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: tres pirámides.'], [11.0, 20.4, 'Dos incógnitas piden dos pistas; se suman o se sustituyen; y en una desigualdad, el signo se voltea con los negativos.'], [21.0, 29.4, 'Cada pista nueva quita una incógnita.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 13', TITLE = 'SISTEMAS Y DESIGUALDADES', LINE = 'Cada pista nueva quita una incógnita.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ec-3', KEYS: ['pirámide', 'teatro', '450', 'esfera'] };
})();
if (typeof module !== 'undefined') module.exports = D;
