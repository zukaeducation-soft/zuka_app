// «Ángulos y paralelas» · Preuniversitario, razonamiento lógico, mundo 2 (Geometría), lección pu-ge-1. Datos puros.
// Reto: cadena de isósceles AB = BC = CD = DE con el ángulo en A de 17° (se resuelve al final: 51°). En medio: el ángulo
// como giro, paralelas, la suma 180°, el ángulo exterior, los polígonos, un polígono regular de ángulos de 150° y el reloj.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'UNA CADENA DE ISÓSCELES', dur: 30,
      caps: [[1.0, 9.4, 'Una cadena de isósceles', 'cuatro lados iguales, uno tras otro'], [10.0, 19.4, '17° en la punta', 'falta el ángulo marcado en E'], [20.0, 29.4, 'Cuatro opciones', 'al final la resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Tres triángulos isósceles encadenados: los lados AB, BC, CD y DE miden lo mismo.'], [10.0, 19.4, 'El ángulo en el vértice A mide diecisiete grados. Hay que hallar el ángulo marcado en el punto E.'], [20.0, 29.4, 'No hace falta transportador: basta saber qué pasa con los ángulos de un triángulo. Al final lo resolvemos.']] },
    { id: 'vuelta', name: 'UN ÁNGULO ES UN GIRO', dur: 30,
      caps: [[0.8, 9.4, 'Un ángulo es un giro', 'vuelta entera 360°, media 180°, un cuarto 90°'], [10.0, 19.4, 'Vecinos sobre una recta', '40° + 140° = 180°: suplementarios'], [20.0, 29.4, 'Opuestos por el vértice', 'como unas tijeras: siempre iguales']],
      narr: [[0.8, 9.4, 'Un ángulo mide cuánto gira una semirrecta. La vuelta entera son trescientos sesenta grados; media vuelta, ciento ochenta; un cuarto, noventa.'], [10.0, 19.4, 'Dos ángulos vecinos sobre una recta completan media vuelta: suman ciento ochenta. Si uno mide cuarenta, el otro mide ciento cuarenta.'], [20.0, 29.4, 'Cuando dos rectas se cruzan, los ángulos opuestos son iguales, como las hojas de unas tijeras que se abren a la vez.']] },
    { id: 'paralelas', name: 'PARALELAS Y TRANSVERSAL', dur: 30,
      caps: [[0.8, 9.4, 'Dos paralelas y una transversal', 'la recta las corta con la misma inclinación'], [10.0, 19.4, 'Correspondientes y alternos', 'forma de F y forma de Z: iguales'], [20.0, 29.4, 'Conjugados: suman 180°', '55° y 125°, del mismo lado']],
      narr: [[0.8, 9.4, 'Cuando una recta corta dos paralelas, las cruza a las dos con la misma inclinación. Por eso aparecen ángulos repetidos.'], [10.0, 19.4, 'Los correspondientes, en forma de efe, son iguales. Los alternos internos, en forma de zeta, también.'], [20.0, 29.4, 'Y los conjugados, entre las paralelas y del mismo lado, suman ciento ochenta: cincuenta y cinco y ciento veinticinco.']] },
    { id: 'triangulo', name: 'LA SUMA DE UN TRIÁNGULO', dur: 30,
      caps: [[0.8, 9.4, 'Se cortan las tres esquinas', 'y se ponen una al lado de la otra'], [10.0, 19.4, 'Juntas forman media vuelta', 'los tres ángulos suman 180°'], [20.0, 29.4, 'Con dos, sale el tercero', '180° − 50° − 60° = 70°']],
      narr: [[0.8, 9.4, 'Un triángulo de papel: se recortan sus tres esquinas y se ponen juntas, una al lado de la otra.'], [10.0, 19.4, 'Siempre forman una línea recta, media vuelta. Los tres ángulos de cualquier triángulo suman ciento ochenta grados.'], [20.0, 29.4, 'Por eso, si se conocen dos ángulos, el tercero sale solo: ciento ochenta menos cincuenta menos sesenta da setenta.']] },
    { id: 'exterior', name: 'EL ÁNGULO EXTERIOR', dur: 28,
      caps: [[0.8, 8.4, 'Se prolonga un lado', 'aparece el ángulo exterior'], [9.0, 17.4, 'Exterior = suma de los lejanos', '50° + 60° = 110°'], [18.0, 26.4, 'En un isósceles', 'base 17° y 17°: el exterior mide 34°']],
      narr: [[0.8, 8.4, 'Si se prolonga un lado del triángulo, afuera aparece un ángulo nuevo: el ángulo exterior.'], [9.0, 17.4, 'Mide lo mismo que los dos ángulos interiores lejanos juntos, porque ambos completan media vuelta con el mismo vecino.'], [18.0, 26.4, 'En un isósceles los ángulos de la base son iguales. Si cada uno mide diecisiete, el exterior en la punta mide treinta y cuatro.']] },
    { id: 'poligono', name: 'POLÍGONOS', dur: 30,
      caps: [[0.8, 9.4, 'Un pentágono en triángulos', 'desde un vértice salen 3 triángulos'], [10.0, 19.4, '(n − 2) · 180°', 'pentágono 540°; hexágono 720°'], [20.0, 29.4, 'Por fuera, siempre 360°', 'al rodearlo se da una vuelta entera']],
      narr: [[0.8, 9.4, 'Desde un vértice de un pentágono se trazan diagonales, y el pentágono queda partido en tres triángulos.'], [10.0, 19.4, 'Cada triángulo aporta ciento ochenta grados. Con ene lados hay ene menos dos triángulos: un hexágono suma setecientos veinte.'], [20.0, 29.4, 'Por fuera es más sencillo: quien camina alrededor del polígono gira en cada esquina y al final da una vuelta entera, trescientos sesenta.']] },
    { id: 'examen', name: 'ÁNGULOS DE 150°', dur: 30,
      caps: [[0.8, 9.4, 'Un polígono regular', 'cada ángulo interior mide 150°'], [10.0, 19.4, 'En cada esquina se giran 30°', 'el exterior es 180° − 150°'], [20.0, 29.4, '360° ÷ 30° = 12 lados', 'doce giros para dar la vuelta']],
      narr: [[0.8, 9.4, 'Otro problema: en un polígono regular cada ángulo interior mide ciento cincuenta grados. Hay que hallar cuántos lados tiene.'], [10.0, 19.4, 'Quien lo recorre gira en cada esquina lo que le falta al interior para media vuelta: ciento ochenta menos ciento cincuenta, treinta grados.'], [20.0, 29.4, 'Los giros suman una vuelta entera. Trescientos sesenta entre treinta da doce: el polígono tiene doce lados.']] },
    { id: 'reloj', name: 'EL RELOJ', dur: 30,
      caps: [[0.8, 9.4, 'Las 3:30', 'el menor ángulo entre las manecillas'], [10.0, 19.4, 'Cada hora son 30°', 'y el horario avanza mientras pasan los minutos'], [20.0, 29.4, '180° − 105° = 75°', 'a las 3:30 el horario va en 105°']],
      narr: [[0.8, 9.4, 'Otro problema: hallar el menor ángulo que forman las manecillas de un reloj a las tres y media.'], [10.0, 19.4, 'Las doce horas reparten la vuelta: treinta grados cada una. Pero el horario no espera: en media hora avanza la mitad de un espacio, quince grados.'], [20.0, 29.4, 'El minutero está en ciento ochenta y el horario en noventa más quince, ciento cinco. Entre los dos hay setenta y cinco grados.']] },
    { id: 'resolver', name: 'LA CADENA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'ABC: 17° y 17°', 'el exterior en B mide 34°'], [10.0, 19.4, 'BCD: 34° y 34°', 'el exterior en C mide 17° + 34° = 51°'], [20.0, 29.4, 'CDE: 51° y 51°', 'el ángulo en E mide 51°']],
      narr: [[0.8, 9.4, 'Volvamos al reto. ABC es isósceles: en C también hay diecisiete. El exterior en B, la suma de los dos, mide treinta y cuatro.'], [10.0, 19.4, 'BCD es isósceles con base BD: en D también hay treinta y cuatro. El exterior en C suma diecisiete más treinta y cuatro: cincuenta y uno.'], [20.0, 29.4, 'Y CDE es isósceles con base CE: sus ángulos de la base son iguales. El ángulo en E mide cincuenta y uno.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El ángulo en E mide 51°', 'la opción D']],
      narr: [[0.8, 10.4, 'La respuesta era la D: cincuenta y un grados. Cada isósceles copia un ángulo y cada exterior suma los dos lejanos.'], [11.0, 20.4, 'Ángulo es giro; las paralelas repiten ángulos; un triángulo suma ciento ochenta y un polígono, ene menos dos veces eso.'], [21.0, 29.4, 'Un ángulo es un giro; una vuelta, trescientos sesenta.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 2', TITLE = 'ÁNGULOS Y PARALELAS', LINE = 'Un ángulo es un giro; una vuelta, 360°.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  // KEYS: números de los ejemplos del video que no deben salir en los ejercicios de la lección.
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ge-1', KEYS: ['17', '51', '150', '3:30', '140'] };
})();
if (typeof module !== 'undefined') module.exports = D;
