// «Desarrollos del cubo» · Preuniversitario, razonamiento lógico, mundo 6 (Razonamiento espacial), lección pu-es-3. Datos puros.
// Reto: torre de tres dados con un 4 arriba: las cinco caras ocultas suman 3 + 7 + 7 = 17. En medio: caras opuestas de un dado
// (suman 7), el cubo que se desdobla (11 desarrollos), en línea de tres los extremos son opuestos (en una de cuatro, 1.º–3.º y
// 2.º–4.º), los vecinos nunca son opuestos, el desarrollo de una fila de cuatro con una cara arriba y otra abajo (1 frente a 6),
// los que no cierran, y cada dado de la torre esconde una pareja que suma 7.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA TORRE DE DADOS', dur: 30,
      caps: [[1.0, 9.4, 'Tres dados en una torre', 'sobre una mesa'], [10.0, 19.4, 'Arriba se ve un 4', 'cinco caras quedan ocultas'], [20.0, 29.4, 'Cuánto suman las ocultas', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Tres dados corrientes se apilan en una torre sobre una mesa.'], [10.0, 19.4, 'La cara de arriba muestra un cuatro. Quedan ocultas cinco caras: las que se tocan entre dados y la que toca la mesa.'], [20.0, 29.4, 'Hay que hallar cuánto suman esas cinco caras ocultas, sin ver ninguna. Al final lo resolvemos.']] },
    { id: 'dado', name: 'CARAS OPUESTAS', dur: 28,
      caps: [[0.8, 8.4, 'En un dado, las opuestas suman 7', '1 y 6 · 2 y 5 · 3 y 4'], [9.0, 17.4, 'Si se ve una cara', 'la de enfrente es 7 menos esa'], [18.0, 26.4, 'Las seis caras suman 21', 'tres parejas de 7']],
      narr: [[0.8, 8.4, 'En un dado corriente, las caras opuestas suman siete: el uno con el seis, el dos con el cinco y el tres con el cuatro.'], [9.0, 17.4, 'Si se ve una cara, la de atrás se sabe sin mirar: siete menos esa.'], [18.0, 26.4, 'Y todas las caras juntas suman veintiuno: tres parejas de siete.']] },
    { id: 'desdoblar', name: 'EL CUBO DESDOBLADO', dur: 28,
      caps: [[0.8, 8.4, 'Se corta un cubo por algunas aristas', 'y se extiende sobre la mesa'], [9.0, 17.4, 'Seis cuadrados unidos', 'eso es un desarrollo del cubo'], [18.0, 26.4, 'Hay 11 desarrollos distintos', 'la cruz es solo uno de ellos']],
      narr: [[0.8, 8.4, 'Si se corta una caja cúbica por algunas aristas, se puede extender sobre la mesa sin romperla.'], [9.0, 17.4, 'Quedan seis cuadrados unidos por sus lados: eso se llama un desarrollo del cubo.'], [18.0, 26.4, 'Hay once desarrollos distintos. La cruz es el más conocido, pero no el único.']] },
    { id: 'linea', name: 'EN LÍNEA RECTA', dur: 30,
      caps: [[0.8, 9.4, 'Tres cuadrados en línea', 'al doblar, el primero y el tercero quedan enfrentados'], [10.0, 19.4, 'Cuatro en línea', 'el 1.º con el 3.º y el 2.º con el 4.º'], [20.0, 29.4, 'Un salto de por medio', 'en línea recta, uno sí y uno no']],
      narr: [[0.8, 9.4, 'Tres cuadrados en línea recta: al doblarlos, el del medio queda de piso y los de los extremos suben como paredes enfrentadas.'], [10.0, 19.4, 'Con cuatro en línea, se enrollan como un tubo: el primero queda frente al tercero, y el segundo frente al cuarto.'], [20.0, 29.4, 'La regla: en línea recta, dos cuadrados con uno en medio quedan opuestos.']] },
    { id: 'vecinos', name: 'LOS VECINOS', dur: 28,
      caps: [[0.8, 8.4, 'Dos cuadrados que se tocan', 'comparten una arista: nunca son opuestos'], [9.0, 17.4, 'Cada cara tiene 4 vecinas', 'y una sola opuesta'], [18.0, 26.4, 'Descartar vecinos', 'reduce las opciones rápido']],
      narr: [[0.8, 8.4, 'Dos cuadrados que se tocan por un lado comparten una arista del cubo: son vecinos, nunca opuestos.'], [9.0, 17.4, 'Cada cara del cubo tiene cuatro vecinas y una sola opuesta.'], [18.0, 26.4, 'Por eso, al buscar la opuesta, primero se descartan las vecinas. Quedan pocas opciones.']] },
    { id: 'problema', name: 'LA OPUESTA DEL 1', dur: 30,
      caps: [[0.8, 9.4, 'Una fila de 4: 2, 3, 4 y 5', 'el 1 sobre el 2 y el 6 bajo el 4'], [10.0, 19.4, 'En la fila: 2 con 4 y 3 con 5', 'quedan el 1 y el 6'], [20.0, 29.4, 'Frente al 1 está el 6', 'las dos que sobran forman pareja']],
      narr: [[0.8, 9.4, 'Otro problema: en un desarrollo, del 2 al 5 forman una fila; el 1 va sobre el 2 y el 6 bajo el 4. Falta la opuesta al 1.'], [10.0, 19.4, 'La fila de cuatro se enrolla: el 2 queda frente al 4 y el 3 frente al 5. Esas dos parejas ya están.'], [20.0, 29.4, 'Solo quedan el 1 y el 6, que son la tapa y el fondo del tubo: el 6 está frente al 1.']] },
    { id: 'noarma', name: 'LOS QUE NO CIERRAN', dur: 28,
      caps: [[0.8, 8.4, 'Cinco en línea no sirven', 'al enrollar, dos caras caen en el mismo lugar'], [9.0, 17.4, 'Un bloque de 2 × 3 tampoco', 'cuatro cuadrados juntos se montan'], [18.0, 26.4, 'Revisar que nada se monte', 'cada cara debe caer en un lugar distinto']],
      narr: [[0.8, 8.4, 'No todo grupo de seis cuadrados forma un cubo. Con cinco en línea, al enrollar, el quinto cae encima del primero.'], [9.0, 17.4, 'Un bloque de dos por tres tampoco: un cuadrado de cuatro casillas juntas no se puede doblar sin montarse.'], [18.0, 26.4, 'Para revisar un desarrollo hay que imaginar el doblado y ver que cada cara caiga en un lugar distinto.']] },
    { id: 'pareja', name: 'CADA DADO, UNA PAREJA', dur: 28,
      caps: [[0.8, 8.4, 'En un dado de la torre', 'la cara de arriba y la de abajo son opuestas'], [9.0, 17.4, 'Arriba y abajo suman 7', 'aunque no se vean'], [18.0, 26.4, 'Solo el dado de arriba', 'deja ver una de las dos']],
      narr: [[0.8, 8.4, 'En un dado de la torre, la cara de arriba y la de abajo son opuestas.'], [9.0, 17.4, 'Así que suman siete, aunque ninguna de las dos se vea.'], [18.0, 26.4, 'Solo en el dado de arriba se ve una de las dos, y de ahí sale la otra.']] },
    { id: 'resolver', name: 'LA TORRE, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Dado de arriba: se ve el 4', 'abajo tiene 7 − 4 = 3'], [10.0, 19.4, 'Dados del medio y de abajo', 'arriba y abajo ocultos: 7 cada uno'], [20.0, 29.4, '3 + 7 + 7 = 17', 'las cinco caras ocultas']],
      narr: [[0.8, 9.4, 'Volvamos al reto. El dado de arriba muestra un cuatro, así que su cara de abajo, oculta, es un tres.'], [10.0, 19.4, 'En los otros dos dados, la cara de arriba y la de abajo quedan ocultas, y cada pareja suma siete.'], [20.0, 29.4, 'Tres más siete más siete: diecisiete. No hizo falta ver ninguna cara oculta.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Las ocultas suman 17', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: diecisiete. Cada pareja de caras opuestas suma siete.'], [11.0, 20.4, 'En línea recta, uno sí y uno no; los vecinos nunca son opuestos; y un desarrollo cierra si nada se monta.'], [21.0, 29.4, 'En línea recta, uno sí y uno no.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 6', TITLE = 'DESARROLLOS DEL CUBO', LINE = 'En línea recta, uno sí y uno no.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-es-3', KEYS: ['torre', '17'] };
})();
if (typeof module !== 'undefined') module.exports = D;
