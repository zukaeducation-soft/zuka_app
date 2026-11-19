// «Paridad, residuos y última cifra» · Preuniversitario, razonamiento lógico, mundo 15 (Teoría de números), lección pu-nu-3. Datos puros.
// Reto: la cifra de las unidades de 3¹ + 3² + … + 3⁸ → 0. En medio: el ciclo de las unidades de 3ⁿ (3, 9, 7, 1), el residuo dice el
// lugar en el ciclo (3¹⁰ → 9), 7²⁰²⁵ (→ 7), el tablero circular de 8 casillas (la ficha que avanza 3 por turno, tras 10 turnos → 6),
// la paridad (cinco impares no suman 50), los residuos se suman (47 + 38 entre 5 → 0) y la última cifra de un producto (1 237 · 4 569
// → 3).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'UNA SUMA DE POTENCIAS', dur: 30,
      caps: [[1.0, 9.4, '3¹ + 3² + 3³ + … + 3⁸', 'ocho potencias de 3'], [10.0, 19.4, 'Solo se pregunta la última cifra', 'no hace falta el número completo'], [20.0, 29.4, 'La cifra de las unidades', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Se suman ocho potencias de tres: tres a la uno, más tres al cuadrado, y así hasta tres a la ocho.'], [10.0, 19.4, 'Solo se pregunta la cifra de las unidades del resultado. No hace falta calcular el número completo.'], [20.0, 29.4, 'Las unidades tienen un ritmo que se repite. Al final lo resolvemos.']] },
    { id: 'ciclo', name: 'EL CICLO DE LAS UNIDADES', dur: 28,
      caps: [[0.8, 8.4, '3, 9, 27, 81, 243, 729', 'solo importa la última cifra'], [9.0, 17.4, 'Unidades: 3, 9, 7, 1, 3, 9…', 'cada vez se multiplica por 3'], [18.0, 26.4, 'Un ciclo de 4', 'después de 1, vuelve a empezar']],
      narr: [[0.8, 8.4, 'Las potencias de tres son tres, nueve, veintisiete, ochenta y uno, doscientos cuarenta y tres. Solo se mira la última cifra.'], [9.0, 17.4, 'Las unidades son tres, nueve, siete, uno, y otra vez tres, nueve. Cada nueva unidad sale de multiplicar la anterior por tres.'], [18.0, 26.4, 'Es un ciclo de cuatro: después del uno, vuelve a empezar en tres.']] },
    { id: 'lugar', name: 'EL RESIDUO DA EL LUGAR', dur: 28,
      caps: [[0.8, 8.4, 'La unidad de 3¹⁰', 'el ciclo tiene 4 pasos'], [9.0, 17.4, '10 = 4 · 2 + 2', 'dos vueltas completas y 2 pasos más'], [18.0, 26.4, 'El 2.º del ciclo: 9', 'residuo 0 sería el último: 1']],
      narr: [[0.8, 8.4, 'Para hallar la unidad de tres a la diez no hace falta llegar hasta allá: el ciclo tiene cuatro pasos.'], [9.0, 17.4, 'Diez es dos vueltas completas de cuatro, y sobran dos pasos.'], [18.0, 26.4, 'El segundo del ciclo es nueve: tres a la diez termina en nueve. Si el residuo fuera cero, sería el último, el uno.']] },
    { id: 'siete', name: 'LA UNIDAD DE 7²⁰²⁵', dur: 30,
      caps: [[0.8, 9.4, 'Unidades de 7ⁿ: 7, 9, 3, 1', 'también un ciclo de 4'], [10.0, 19.4, '2025 = 4 · 506 + 1', 'residuo 1'], [20.0, 29.4, 'El 1.º del ciclo: 7', '7²⁰²⁵ termina en 7']],
      narr: [[0.8, 9.4, 'Otro problema: la cifra de las unidades de siete a la dos mil veinticinco. Las potencias de siete terminan en siete, nueve, tres, uno: otro ciclo de cuatro.'], [10.0, 19.4, 'Dos mil veinticinco entre cuatro da quinientos seis y sobra uno.'], [20.0, 29.4, 'El primero del ciclo es siete: siete a la dos mil veinticinco termina en siete.']] },
    { id: 'tablero', name: 'EL TABLERO CIRCULAR', dur: 30,
      caps: [[0.8, 9.4, 'Casillas de 0 a 7 en un círculo', 'la ficha avanza 3 por turno'], [10.0, 19.4, 'En 10 turnos avanza 30', 'pero cada 8 casillas vuelve a empezar'], [20.0, 29.4, '30 = 3 · 8 + 6', 'queda en la casilla 6']],
      narr: [[0.8, 9.4, 'Otro problema: un tablero circular tiene ocho casillas, del cero al siete. Una ficha roja sale del cero y avanza tres casillas por turno.'], [10.0, 19.4, 'En diez turnos avanza treinta casillas. Pero cada ocho casillas da una vuelta y vuelve a empezar.'], [20.0, 29.4, 'Treinta es tres vueltas de ocho y sobran seis: la ficha queda en la casilla seis. El residuo es la casilla.']] },
    { id: 'paridad', name: 'PAR E IMPAR', dur: 28,
      caps: [[0.8, 8.4, 'Impar + impar = par', 'par + par = par; par + impar = impar'], [9.0, 17.4, 'Cinco impares que sumen 50', 'cuatro hacen par, el quinto lo vuelve impar'], [18.0, 26.4, 'Imposible: la suma es impar', 'la paridad descarta sin calcular']],
      narr: [[0.8, 8.4, 'La paridad es el residuo al dividir entre dos. Impar más impar da par; par más par, par; y par más impar, impar.'], [9.0, 17.4, 'Si se buscan cinco números impares que sumen cincuenta: cuatro impares suman un par, y el quinto lo vuelve impar.'], [18.0, 26.4, 'Es imposible: la suma de cinco impares siempre es impar. La paridad descarta sin hacer cuentas.']] },
    { id: 'suma', name: 'LOS RESIDUOS SE SUMAN', dur: 28,
      caps: [[0.8, 8.4, '47 deja 2 al dividir entre 5', '38 deja 3'], [9.0, 17.4, 'La suma deja 2 + 3 = 5', 'y 5 entre 5 deja 0'], [18.0, 26.4, '47 + 38 = 85 = 5 · 17', 'se trabaja con los residuos']],
      narr: [[0.8, 8.4, 'Los residuos se pueden sumar. Cuarenta y siete entre cinco deja dos, y treinta y ocho deja tres.'], [9.0, 17.4, 'Su suma deja dos más tres, cinco, que entre cinco deja cero.'], [18.0, 26.4, 'Y es cierto: ochenta y cinco es cinco por diecisiete. Se trabaja con los residuos, que son pequeños.']] },
    { id: 'producto', name: 'LA ÚLTIMA CIFRA DE UN PRODUCTO', dur: 28,
      caps: [[0.8, 8.4, '1 237 · 4 569', 'termina en qué cifra'], [9.0, 17.4, 'Solo importan las unidades', '7 · 9 = 63'], [18.0, 26.4, 'Termina en 3', 'lo demás no toca las unidades']],
      narr: [[0.8, 8.4, 'Con los productos pasa igual. Mil doscientos treinta y siete por cuatro mil quinientos sesenta y nueve termina en alguna cifra.'], [9.0, 17.4, 'Solo importan las unidades: siete por nueve, sesenta y tres.'], [18.0, 26.4, 'El producto termina en tres. Las demás cifras nunca llegan a tocar las unidades.']] },
    { id: 'resolver', name: 'LA SUMA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Unidades: 3, 9, 7, 1, 3, 9, 7, 1', 'dos ciclos completos'], [10.0, 19.4, 'Cada ciclo suma 3 + 9 + 7 + 1 = 20', 'dos ciclos: 40'], [20.0, 29.4, '40 termina en 0', 'la suma termina en 0']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Las unidades de las ocho potencias son tres, nueve, siete, uno, tres, nueve, siete, uno: dos ciclos completos.'], [10.0, 19.4, 'Cada ciclo suma veinte, y los dos, cuarenta.'], [20.0, 29.4, 'Cuarenta termina en cero, así que la suma completa termina en cero.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'La suma termina en 0', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cero.'], [11.0, 20.4, 'Las unidades giran en ciclos, el residuo da el lugar, la paridad descarta, y en sumas y productos solo cuentan los residuos.'], [21.0, 29.4, 'Lo que se repite se cuenta con el residuo.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 15', TITLE = 'RESIDUOS Y ÚLTIMA CIFRA', LINE = 'Lo que se repite, con el residuo.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-nu-3', KEYS: ['2025', 'casilla', '4 569', '47'] };
})();
if (typeof module !== 'undefined') module.exports = D;
