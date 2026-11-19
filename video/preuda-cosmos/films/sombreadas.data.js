// «Áreas sombreadas y cuadrícula» · Preuniversitario, razonamiento lógico, mundo 2 (Geometría), lección pu-ge-5. Datos puros.
// Reto: cuadrado de lado 8 con cuatro cuartos de círculo de radio 4 en las esquinas (64 − 16π). En medio: sumar piezas o
// restar lo que falta, el octágono de las esquinas cortadas, el rectángulo que encierra una figura de la cuadrícula, el
// pentágono de la cuadrícula (21), mover piezas sin cambiar el área, cuartos que forman un círculo y estimar con π.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'CUATRO CUARTOS DE CÍRCULO', dur: 30,
      caps: [[1.0, 9.4, 'Un cuadrado de lado 8', 'con un cuarto de círculo en cada esquina'], [10.0, 19.4, 'Radios de 4', 'falta el área de lo sombreado, en el centro'], [20.0, 29.4, 'Cuatro opciones con π', 'al final la resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En un cuadrado de ocho centímetros de lado se traza un cuarto de círculo con centro en cada esquina.'], [10.0, 19.4, 'Cada cuarto tiene radio cuatro. Hay que hallar el área de la región sombreada, la estrella curva que queda en el centro.'], [20.0, 29.4, 'Las cuatro opciones traen pi. Hay una idea que lo vuelve sencillo; antes, algunas herramientas. Al final lo resolvemos.']] },
    { id: 'piezas', name: 'SUMAR O RESTAR', dur: 28,
      caps: [[0.8, 8.4, 'Sumar piezas', '9 · 3 + 4 · 4 = 27 + 16 = 43'], [9.0, 17.4, 'O restar lo que falta', '9 · 7 − 5 · 4 = 63 − 20 = 43'], [18.0, 26.4, 'Dos caminos, el mismo resultado', 'se elige el que tenga menos cuentas']],
      narr: [[0.8, 8.4, 'Una figura en forma de ele se parte en dos rectángulos: nueve por tres y cuatro por cuatro. Juntos dan cuarenta y tres.'], [9.0, 17.4, 'También se puede ver como un rectángulo grande de nueve por siete al que le falta una esquina de cinco por cuatro: sesenta y tres menos veinte.'], [18.0, 26.4, 'Los dos caminos dan lo mismo. Casi toda área sombreada es eso: sumar piezas conocidas o restarle a una figura grande lo que no está.']] },
    { id: 'resta', name: 'ESQUINAS CORTADAS', dur: 28,
      caps: [[0.8, 8.4, 'Un cuadrado de lado 6', 'se le cortan las cuatro esquinas'], [9.0, 17.4, 'Cada esquina: catetos de 2', 'área de cada una: 2 · 2 / 2 = 2'], [18.0, 26.4, '36 − 4 · 2 = 28', 'el octágono es lo que queda']],
      narr: [[0.8, 8.4, 'A un cuadrado de seis por seis se le recortan las cuatro esquinas y queda un octágono.'], [9.0, 17.4, 'Cada esquina es un triángulo rectángulo de catetos dos: su área es dos por dos sobre dos, dos.'], [18.0, 26.4, 'El octágono es el cuadrado menos las cuatro esquinas: treinta y seis menos ocho, veintiocho.']] },
    { id: 'caja', name: 'EL RECTÁNGULO QUE ENCIERRA', dur: 30,
      caps: [[0.8, 9.4, 'Un triángulo torcido', 'ningún lado sigue las líneas de la cuadrícula'], [10.0, 19.4, 'Se encierra en un rectángulo', '6 · 5 = 30, con tres triángulos de sobra'], [20.0, 29.4, '30 − 6 − 6 − 5 = 13', 'cada triángulo de sobra es fácil']],
      narr: [[0.8, 9.4, 'En la cuadrícula hay un triángulo torcido: ningún lado va por las líneas y no se ve su altura.'], [10.0, 19.4, 'Se encierra en el rectángulo más pequeño que lo contiene, seis por cinco. Sobran tres triángulos rectángulos.'], [20.0, 29.4, 'Esos sí son fáciles: seis, seis y cinco. Treinta menos diecisiete deja trece unidades cuadradas.']] },
    { id: 'examen', name: 'EL PENTÁGONO', dur: 30,
      caps: [[0.8, 9.4, 'Un pentágono en la cuadrícula', 'cada cuadrito tiene 1 unidad de lado'], [10.0, 19.4, 'Rectángulo de 6 · 5 = 30', 'sobran tres esquinas: 3, 4 y 2'], [20.0, 29.4, '30 − 9 = 21', 'el área sombreada es 21']],
      narr: [[0.8, 9.4, 'Otro problema: un pentágono sombreado en una cuadrícula de cuadritos de una unidad. Hay que hallar su área.'], [10.0, 19.4, 'Se encierra en un rectángulo de seis por cinco. Sobran tres triángulos en las esquinas: de áreas tres, cuatro y dos.'], [20.0, 29.4, 'Treinta menos nueve: el pentágono mide veintiuna unidades cuadradas.']] },
    { id: 'mover', name: 'MOVER SIN CAMBIAR', dur: 28,
      caps: [[0.8, 8.4, 'Una figura con un mordisco', 'y una joroba igual del otro lado'], [9.0, 17.4, 'La joroba tapa el mordisco', 'mover una pieza no cambia el área'], [18.0, 26.4, 'Queda un rectángulo', '6 · 4 = 24, sin usar π']],
      narr: [[0.8, 8.4, 'Esta figura tiene un mordisco en forma de medio círculo a la izquierda y una joroba idéntica a la derecha.'], [9.0, 17.4, 'Si la joroba se corta y se pone en el mordisco, encaja perfecto. Mover una pieza no cambia el área.'], [18.0, 26.4, 'Queda un rectángulo de seis por cuatro: veinticuatro. Las curvas se cancelaron y pi ni apareció.']] },
    { id: 'cuartos', name: 'CUARTOS QUE SE JUNTAN', dur: 28,
      caps: [[0.8, 8.4, 'Cuatro cuartos de círculo', 'del mismo radio, en lugares distintos'], [9.0, 17.4, 'Juntos forman un círculo', 'cuatro esquinas de 90°: 360°'], [18.0, 26.4, 'Su área: π · r²', 'dos medios círculos también hacen uno']],
      narr: [[0.8, 8.4, 'Cuatro cuartos de círculo del mismo radio pueden estar en lugares distintos de una figura.'], [9.0, 17.4, 'Si se juntan por sus puntas, los cuatro ángulos de noventa grados completan trescientos sesenta: forman un círculo entero.'], [18.0, 26.4, 'Así, su área total es pi por el radio al cuadrado. Lo mismo pasa con dos medios círculos.']] },
    { id: 'estimar', name: 'ESTIMAR CON π', dur: 28,
      caps: [[0.8, 8.4, 'Un círculo dentro de un cuadrado', 'lado 4, radio 2'], [9.0, 17.4, 'Afuera queda 16 − 4π', 'con π ≈ 3.14: unas 3.4 unidades'], [18.0, 26.4, 'Estimar descarta opciones', 'lo sombreado debe verse de ese tamaño']],
      narr: [[0.8, 8.4, 'Un círculo dentro de un cuadrado de lado cuatro: el radio es dos.'], [9.0, 17.4, 'Lo que queda afuera es dieciséis menos cuatro pi. Con pi casi tres coma catorce, son unas tres coma cuatro unidades cuadradas.'], [18.0, 26.4, 'Estimar sirve para revisar: si una opción da negativo o más que el cuadrado entero, se descarta sin más cuentas.']] },
    { id: 'resolver', name: 'LOS CUARTOS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, 'Los cuatro cuartos: un círculo', 'radio 4: área 16π'], [10.0, 19.4, 'El cuadrado mide 8 · 8 = 64', 'lo sombreado es lo que sobra'], [20.0, 29.4, '64 − 16π ≈ 13.7', 'cerca de 14 cuadritos de 64']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Los cuatro cuartos de círculo tienen radio cuatro: juntos forman un círculo de área dieciséis pi.'], [10.0, 19.4, 'El cuadrado mide ocho por ocho, sesenta y cuatro. Lo sombreado es lo que no cubren los cuartos.'], [20.0, 29.4, 'Sesenta y cuatro menos dieciséis pi, unas trece coma siete unidades: se ve bien, unos catorce cuadritos de los sesenta y cuatro.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Lo sombreado mide 64 − 16π', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: sesenta y cuatro menos dieciséis pi. Cuatro cuartos, un círculo.'], [11.0, 20.4, 'Sumar piezas, restar lo que falta, encerrar en un rectángulo, mover sin cambiar y estimar con pi.'], [21.0, 29.4, 'Lo sombreado es lo grande menos lo que falta.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 2', TITLE = 'ÁREAS SOMBREADAS', LINE = 'Lo sombreado es lo grande menos lo que falta.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ge-5', KEYS: ['64 − 16π', '43', '21', '13.7'] };
})();
if (typeof module !== 'undefined') module.exports = D;
