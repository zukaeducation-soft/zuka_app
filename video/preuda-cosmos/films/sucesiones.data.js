// «Sucesiones numéricas» · Preuniversitario, razonamiento lógico, mundo 7 (Secuencias y patrones), lección pu-se-1. Datos puros.
// Reto: 5, 8, 13, 20, 29, … (término 12: 12² + 4 = 148). En medio: las diferencias, las segundas diferencias, la progresión
// aritmética (tercero 11 y séptimo 27 → vigésimo 79), comparar con los cuadrados, la regla alternada (3, 6, 5, 10, 9, 18, 17 →
// décimo 66), las que se duplican (1, 3, 7, 15, 31: 2ⁿ − 1) y un método.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'CINCO, OCHO, TRECE…', dur: 30,
      caps: [[1.0, 9.4, '5, 8, 13, 20, 29, …', 'la misma regla sigue para siempre'], [10.0, 19.4, 'Falta el término 12', 'escribir doce términos es lento y arriesgado'], [20.0, 29.4, 'Cuatro opciones', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una sucesión empieza cinco, ocho, trece, veinte, veintinueve, y sigue con la misma regla.'], [10.0, 19.4, 'Hay que hallar el término que ocupa la posición doce. Escribir todos los términos es lento y fácil de errar.'], [20.0, 29.4, 'Mejor encontrar una fórmula que dé cualquier término de una vez. Al final lo resolvemos.']] },
    { id: 'diferencias', name: 'LAS DIFERENCIAS', dur: 28,
      caps: [[0.8, 8.4, 'Se resta cada término del siguiente', '8 − 5, 13 − 8, 20 − 13, 29 − 20'], [9.0, 17.4, 'Diferencias: 3, 5, 7, 9', 'no son iguales: no es aritmética'], [18.0, 26.4, 'Si fueran iguales', 'se sumaría siempre lo mismo']],
      narr: [[0.8, 8.4, 'Lo primero es restar cada término del siguiente: ocho menos cinco, trece menos ocho, y así.'], [9.0, 17.4, 'Salen tres, cinco, siete, nueve. No son iguales, así que no se suma siempre lo mismo.'], [18.0, 26.4, 'Si las diferencias fueran iguales, sería una progresión aritmética: sumar el mismo número una y otra vez.']] },
    { id: 'segundas', name: 'SEGUNDAS DIFERENCIAS', dur: 28,
      caps: [[0.8, 8.4, 'Diferencias de las diferencias', '5 − 3, 7 − 5, 9 − 7'], [9.0, 17.4, 'Siempre 2', 'las diferencias crecen de 2 en 2'], [18.0, 26.4, 'Segunda diferencia constante', 'hay un n² escondido']],
      narr: [[0.8, 8.4, 'Se repite el truco con las diferencias: cinco menos tres, siete menos cinco, nueve menos siete.'], [9.0, 17.4, 'Siempre dos. Las diferencias crecen de dos en dos, como entre cuadrados seguidos.'], [18.0, 26.4, 'Cuando la segunda diferencia es constante, en la fórmula hay un ene al cuadrado escondido.']] },
    { id: 'aritmetica', name: 'LA PROGRESIÓN ARITMÉTICA', dur: 30,
      caps: [[0.8, 9.4, 'El tercero es 11 y el séptimo, 27', 'falta el término 20'], [10.0, 19.4, 'Del 3.º al 7.º hay 4 saltos', '27 − 11 = 16: cada salto vale 4'], [20.0, 29.4, 'a₂₀ = a₃ + 17 · 4 = 79', 'diecisiete saltos desde el tercero']],
      narr: [[0.8, 9.4, 'Otro problema: en una progresión aritmética, el tercer término es once y el séptimo es veintisiete. Hay que hallar el término veinte.'], [10.0, 19.4, 'Del tercero al séptimo hay cuatro saltos iguales, que suben dieciséis: cada salto vale cuatro.'], [20.0, 29.4, 'Del tercero al vigésimo hay diecisiete saltos: once más diecisiete por cuatro, setenta y nueve.']] },
    { id: 'cuadrados', name: 'COMPARAR CON LOS CUADRADOS', dur: 28,
      caps: [[0.8, 8.4, 'Cuadrados: 1, 4, 9, 16, 25', 'debajo de 5, 8, 13, 20, 29'], [9.0, 17.4, 'Cada término es el cuadrado + 4', '5 = 1 + 4, 8 = 4 + 4, 13 = 9 + 4'], [18.0, 26.4, 'Término n = n² + 4', 'se comprueba con todos']],
      narr: [[0.8, 8.4, 'Como hay un cuadrado escondido, se escriben los cuadrados debajo: uno, cuatro, nueve, dieciséis, veinticinco.'], [9.0, 17.4, 'Cada término le lleva cuatro a su cuadrado: cinco es uno más cuatro, ocho es cuatro más cuatro, trece es nueve más cuatro.'], [18.0, 26.4, 'El término ene es ene al cuadrado más cuatro. Antes de usar una fórmula, se comprueba con todos los términos dados.']] },
    { id: 'alterna', name: 'DOS REGLAS TURNÁNDOSE', dur: 30,
      caps: [[0.8, 9.4, '3, 6, 5, 10, 9, 18, 17, …', 'sube, baja, sube, baja'], [10.0, 19.4, '× 2, − 1, × 2, − 1', 'dos operaciones que se turnan'], [20.0, 29.4, '17 → 34 → 33 → 66', 'el término 10 es 66']],
      narr: [[0.8, 9.4, 'Otro problema: tres, seis, cinco, diez, nueve, dieciocho, diecisiete. Sube y baja: hay que hallar el término diez.'], [10.0, 19.4, 'No hay una sola operación: se turnan dos. Multiplicar por dos y restar uno.'], [20.0, 29.4, 'Desde diecisiete: treinta y cuatro, treinta y tres, sesenta y seis. El término diez es sesenta y seis.']] },
    { id: 'dobles', name: 'LAS QUE SE DUPLICAN', dur: 28,
      caps: [[0.8, 8.4, '1, 3, 7, 15, 31', 'diferencias 2, 4, 8, 16: se duplican'], [9.0, 17.4, 'Casi potencias de 2', '2 − 1, 4 − 1, 8 − 1, 16 − 1'], [18.0, 26.4, 'Término n = 2ⁿ − 1', 'el 10.º: 1 024 − 1 = 1 023']],
      narr: [[0.8, 8.4, 'Uno, tres, siete, quince, treinta y uno. Las diferencias son dos, cuatro, ocho, dieciséis: se duplican.'], [9.0, 17.4, 'Cada término es una potencia de dos menos uno: dos menos uno, cuatro menos uno, ocho menos uno.'], [18.0, 26.4, 'El término ene es dos a la ene menos uno. El décimo: mil veinticuatro menos uno, mil veintitrés.']] },
    { id: 'metodo', name: 'UN MÉTODO', dur: 28,
      caps: [[0.8, 8.4, '1. Diferencias', 'iguales: aritmética'], [9.0, 17.4, '2. Segundas diferencias o cocientes', 'constantes: cuadrados o potencias'], [18.0, 26.4, '3. Si sube y baja', 'buscar dos reglas turnándose']],
      narr: [[0.8, 8.4, 'Un método: primero, las diferencias. Si son iguales, es aritmética.'], [9.0, 17.4, 'Si no, las segundas diferencias o los cocientes: si son constantes, hay cuadrados o potencias.'], [18.0, 26.4, 'Y si la sucesión sube y baja, probablemente se turnan dos reglas.']] },
    { id: 'resolver', name: 'LA SUCESIÓN, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Término n = n² + 4', 'comprobada con los cinco términos'], [10.0, 19.4, 'n = 12: 12² + 4', '144 + 4'], [20.0, 29.4, 'El término 12 es 148', 'la opción A']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La fórmula ene al cuadrado más cuatro funciona con los cinco términos dados.'], [10.0, 19.4, 'Para el término doce: doce al cuadrado más cuatro, ciento cuarenta y cuatro más cuatro.'], [20.0, 29.4, 'El término doce es ciento cuarenta y ocho, sin escribir los anteriores.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El término 12 es 148', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: ciento cuarenta y ocho. Las segundas diferencias delataron el cuadrado.'], [11.0, 20.4, 'Diferencias iguales, aritmética; segundas diferencias iguales, cuadrados; diferencias que se duplican, potencias.'], [21.0, 29.4, 'Restar dos veces revela la regla.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 7', TITLE = 'SUCESIONES NUMÉRICAS', LINE = 'Restar dos veces revela la regla.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-se-1', KEYS: ['148', '79', '66', '1023'] };
})();
if (typeof module !== 'undefined') module.exports = D;
