// «Letras y figuras» · Preuniversitario, razonamiento lógico, mundo 7 (Secuencias y patrones), lección pu-se-2. Datos puros.
// Reto: A, C, F, J, O, … (posiciones 1, 3, 6, 10, 15: sigue la 21, U). En medio: cada letra es un número (26 sin la ñ), los saltos
// que crecen, 3C, 6F, 9I, 12L → 15O, figuras que crecen (cuadrados de palitos: 3n + 1), con 100 palitos la figura 33, los
// marcos cuadrados (4n + 4 → figura 15: 64) y contar lo que se agrega.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'A, C, F, J, O…', dur: 30,
      caps: [[1.0, 9.4, 'A, C, F, J, O, …', 'alfabeto de 26 letras, sin la ñ'], [10.0, 19.4, 'Las letras se van separando', 'cada salto es un poco más largo'], [20.0, 29.4, 'Cuál letra sigue', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. La secuencia de letras A, C, F, J, O sigue con alguna regla, en el alfabeto de veintiséis letras sin la eñe.'], [10.0, 19.4, 'Las letras se van separando cada vez más: entre una y otra hay saltos cada vez más largos.'], [20.0, 29.4, 'Hay que decir qué letra sigue. Con letras no se puede restar, así que primero se convierten en números. Al final lo resolvemos.']] },
    { id: 'numerar', name: 'CADA LETRA, UN NÚMERO', dur: 28,
      caps: [[0.8, 8.4, 'A = 1, B = 2, …, Z = 26', 'sin la ñ, como dice el enunciado'], [9.0, 17.4, 'Con números se pueden ver saltos', 'la regla aparece en las posiciones'], [18.0, 26.4, 'Truco: E = 5, J = 10, O = 15, T = 20', 'puntos de referencia para contar rápido']],
      narr: [[0.8, 8.4, 'Se numera el alfabeto: A es uno, B es dos, y así hasta la Z, veintiséis, sin la eñe, como dice el enunciado.'], [9.0, 17.4, 'Con las letras convertidas en posiciones se pueden calcular saltos, y la regla aparece.'], [18.0, 26.4, 'Un truco para contar rápido: la E es cinco, la J diez, la O quince y la T veinte. Desde ahí se cuenta poco.']] },
    { id: 'saltos', name: 'SALTOS QUE CRECEN', dur: 28,
      caps: [[0.8, 8.4, 'Posiciones 1, 3, 6, 10, 15', 'A, C, F, J, O'], [9.0, 17.4, 'Saltos +2, +3, +4, +5', 'cada salto, uno más que el anterior'], [18.0, 26.4, 'Son los números triangulares', 'el siguiente salto: +6']],
      narr: [[0.8, 8.4, 'Las letras A, C, F, J, O ocupan las posiciones uno, tres, seis, diez y quince.'], [9.0, 17.4, 'Los saltos son dos, tres, cuatro y cinco: cada uno es un paso más largo que el anterior.'], [18.0, 26.4, 'Son los números triangulares, los que se forman con puntos en triángulo. El siguiente salto será seis.']] },
    { id: 'mezcla', name: 'NÚMERO Y LETRA', dur: 30,
      caps: [[0.8, 9.4, '3C, 6F, 9I, 12L, …', 'cada término lleva número y letra'], [10.0, 19.4, 'El número sube de 3 en 3', 'y la letra está en esa misma posición'], [20.0, 29.4, 'Sigue 15O', 'la letra 15 es la O']],
      narr: [[0.8, 9.4, 'Otro problema: la secuencia tres C, seis F, nueve I, doce L. Cada término tiene un número y una letra.'], [10.0, 19.4, 'El número sube de tres en tres. Y la letra es justo la que ocupa esa posición: C es la tres, F la seis, I la nueve, L la doce.'], [20.0, 29.4, 'Sigue quince y la letra quince, que es la O: quince O.']] },
    { id: 'figuras', name: 'FIGURAS QUE CRECEN', dur: 28,
      caps: [[0.8, 8.4, 'Cuadrados en fila hechos con palitos', '4, 7, 10 palitos'], [9.0, 17.4, 'Cada cuadrado nuevo pide 3', 'el primero necesita 4'], [18.0, 26.4, 'Figura n: 3n + 1 palitos', 'lo que se agrega dice la regla']],
      narr: [[0.8, 8.4, 'Con palitos se arman cuadrados en fila: uno, dos, tres cuadrados, con cuatro, siete y diez palitos.'], [9.0, 17.4, 'Cada cuadrado nuevo comparte un lado con el anterior, así que solo pide tres palitos más. El primero necesita cuatro.'], [18.0, 26.4, 'La figura ene usa tres por ene más uno palitos. Fijarse en lo que se agrega revela la regla.']] },
    { id: 'palitos', name: 'CIEN PALITOS', dur: 30,
      caps: [[0.8, 9.4, 'Se tienen 100 palitos', 'cuál es la figura más grande posible'], [10.0, 19.4, '3n + 1 ≤ 100', 'n ≤ 33'], [20.0, 29.4, 'La figura 33 usa 100 palitos', 'la 34 pediría 103']],
      narr: [[0.8, 9.4, 'Otro problema: con cien palitos, hay que hallar la figura más grande de esa secuencia que se puede construir.'], [10.0, 19.4, 'La figura ene usa tres ene más uno palitos, y eso no puede pasar de cien: tres ene, como mucho noventa y nueve; ene, como mucho treinta y tres.'], [20.0, 29.4, 'La figura treinta y tres usa justo cien. La treinta y cuatro pediría ciento tres.']] },
    { id: 'marcos', name: 'MARCOS CUADRADOS', dur: 28,
      caps: [[0.8, 8.4, 'Marcos de cuadritos', 'lados 3, 4, 5…'], [9.0, 17.4, 'Figura n: lado n + 2', 'el cuadrado menos el hueco'], [18.0, 26.4, '(n + 2)² − n² = 4n + 4', 'figura 15: 64 cuadritos']],
      narr: [[0.8, 8.4, 'Otra secuencia: marcos cuadrados de cuadritos, de lado tres, cuatro, cinco.'], [9.0, 17.4, 'La figura ene tiene lado ene más dos, y su hueco tiene lado ene. El marco es el cuadrado grande menos el hueco.'], [18.0, 26.4, 'Eso da cuatro ene más cuatro. La figura quince tiene sesenta y cuatro cuadritos.']] },
    { id: 'contar', name: 'QUÉ SE AGREGA', dur: 28,
      caps: [[0.8, 8.4, 'Comparar una figura con la anterior', 'qué pieza nueva aparece'], [9.0, 17.4, 'Si se agrega siempre lo mismo', 'la regla es lineal: a · n + b'], [18.0, 26.4, 'Si lo agregado crece', 'aparece un n²']],
      narr: [[0.8, 8.4, 'En las secuencias de figuras, la clave es comparar cada figura con la anterior y ver qué pieza nueva aparece.'], [9.0, 17.4, 'Si siempre se agrega lo mismo, la regla es de la forma a por ene más be.'], [18.0, 26.4, 'Si lo que se agrega crece de una figura a otra, en la regla aparece un ene al cuadrado.']] },
    { id: 'resolver', name: 'LAS LETRAS, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'O es la 15', 'el último salto fue +5'], [10.0, 19.4, 'El siguiente salto: +6', '15 + 6 = 21'], [20.0, 29.4, 'La letra 21 es la U', 'T es 20; la siguiente, U']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La O es la letra quince, y el último salto fue de cinco.'], [10.0, 19.4, 'El siguiente salto es de seis: quince más seis, veintiuno.'], [20.0, 29.4, 'La T es la veinte, así que la veintiuno es la U. Sigue la U.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Sigue la U', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: la U. Las letras escondían los números triangulares.'], [11.0, 20.4, 'Letras a números, saltos que crecen, número y letra a la vez, y en las figuras, mirar lo que se agrega.'], [21.0, 29.4, 'Toda letra es un número disfrazado.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 7', TITLE = 'LETRAS Y FIGURAS', LINE = 'Toda letra es un número disfrazado.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-se-2', KEYS: ['15O', 'palitos', 'marco'] };
})();
if (typeof module !== 'undefined') module.exports = D;
