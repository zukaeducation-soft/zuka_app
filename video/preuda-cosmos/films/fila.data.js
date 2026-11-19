// «Orden en línea» · Preuniversitario, razonamiento lógico, mundo 3 (Acertijos de orden), lección pu-or-1. Datos puros.
// Reto: cinco sillas (Ana, Beto, Carla, Diego y Elsa): Elsa queda con certeza en la silla 5. En medio: traducir las pistas a
// dibujos, las estaturas (Esteban, Fabio, Carlos, Diana), el bloque que se mueve junto, el orden vertical, la carrera de cinco
// (Andrés dos puestos antes que Bruno…: dos órdenes posibles) y la diferencia entre «con certeza» y «es posible».
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'CINCO SILLAS', dur: 30,
      caps: [[1.0, 9.4, 'Cinco personas, cinco sillas', 'numeradas de 1 a 5, de izquierda a derecha'], [10.0, 19.4, 'Cuatro pistas', 'una afirmación es cierta con certeza'], [20.0, 29.4, 'Cuatro opciones', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Ana, Beto, Carla, Diego y Elsa se sientan en cinco sillas numeradas de izquierda a derecha.'], [10.0, 19.4, 'Ana no está en un extremo. Beto está justo a la derecha de Carla. Diego tiene un número menor que Elsa, y Elsa no está junto a Ana.'], [20.0, 29.4, 'Hay que encontrar la única afirmación de la que se tiene certeza. Primero, cómo se dibujan las pistas. Al final lo resolvemos.']] },
    { id: 'simbolos', name: 'LAS PISTAS EN DIBUJO', dur: 30,
      caps: [[0.8, 9.4, '«Justo a la derecha»', 'pegados: forman un bloque'], [10.0, 19.4, '«A la derecha» o «menor que»', 'más adelante, pero no necesariamente pegado'], [20.0, 29.4, '«No en un extremo», «no junto a»', 'tachan lugares: dejan menos opciones']],
      narr: [[0.8, 9.4, 'Cada pista se dibuja. Justo a la derecha quiere decir pegado: las dos personas se mueven juntas, como un bloque.'], [10.0, 19.4, 'A la derecha, sin la palabra justo, solo dice que está más adelante: puede haber gente en medio.'], [20.0, 29.4, 'Las pistas con no quitan lugares. No en un extremo tacha la primera y la última silla; no junto a tacha las vecinas.']] },
    { id: 'alturas', name: 'MÁS ALTO, MÁS BAJO', dur: 30,
      caps: [[0.8, 9.4, 'Cuatro estaturas', 'Carlos, Diana, Esteban y Fabio'], [10.0, 19.4, 'Se encadenan las comparaciones', 'Diana < Carlos < Fabio < Esteban'], [20.0, 29.4, 'El segundo más alto: Fabio', 'una sola escalera con todos']],
      narr: [[0.8, 9.4, 'Otro problema: Carlos es más alto que Diana y más bajo que Esteban; Fabio, más alto que Carlos y más bajo que Esteban. Falta el segundo más alto.'], [10.0, 19.4, 'Se ponen en una escalera. Diana debajo de Carlos, Carlos debajo de Esteban, y Fabio entre Carlos y Esteban.'], [20.0, 29.4, 'Queda una sola escalera: Esteban, Fabio, Carlos y Diana. El segundo más alto es Fabio.']] },
    { id: 'bloque', name: 'EL BLOQUE', dur: 28,
      caps: [[0.8, 8.4, 'Un bloque de dos', 'en cinco sillas cabe en 4 lugares'], [9.0, 17.4, 'Se empieza por lo más firme', 'el bloque deja pocos casos'], [18.0, 26.4, 'Cada caso se prueba', 'si choca con una pista, se tacha']],
      narr: [[0.8, 8.4, 'Un bloque de dos personas en una fila de cinco sillas solo cabe en cuatro lugares: uno-dos, dos-tres, tres-cuatro o cuatro-cinco.'], [9.0, 17.4, 'Por eso conviene empezar por la pista más firme: deja pocos casos y los demás se acomodan alrededor.'], [18.0, 26.4, 'Luego cada caso se prueba con las demás pistas. Si choca con alguna, se tacha y se pasa al siguiente.']] },
    { id: 'carrera', name: 'LA CARRERA DE CINCO', dur: 30,
      caps: [[0.8, 9.4, 'Cinco corredores, sin empates', 'Andrés dos puestos antes que Bruno'], [10.0, 19.4, 'Andrés en 1, 2 o 3', 'con Andrés en 2 no cabe el bloque Daniel-Camilo'], [20.0, 29.4, 'Quedan dos órdenes', 'en los dos, Esteban va justo antes que Bruno']],
      narr: [[0.8, 9.4, 'Otro problema: en una carrera de cinco, Andrés llegó dos puestos antes que Bruno, Camilo justo después de Daniel, y Esteban ni primero ni último.'], [10.0, 19.4, 'Andrés puede ser primero, segundo o tercero. Si es segundo, Bruno es cuarto y los puestos libres no dejan sitio para Daniel y Camilo juntos.'], [20.0, 29.4, 'Quedan dos órdenes posibles. En los dos, Esteban llega justo antes que Bruno: esa es la afirmación segura.']] },
    { id: 'certeza', name: 'CERTEZA O POSIBILIDAD', dur: 28,
      caps: [[0.8, 8.4, '«Con certeza»', 'se cumple en todos los órdenes posibles'], [9.0, 17.4, '«Es posible»', 'basta un orden donde se cumpla'], [18.0, 26.4, 'Andrés primero: posible, no seguro', 'en el otro orden llega tercero']],
      narr: [[0.8, 8.4, 'Las preguntas de orden piden algo que se cumple con certeza: tiene que pasar en todos los órdenes que respetan las pistas.'], [9.0, 17.4, 'Si una afirmación se cumple solo en algunos, es posible, pero no segura.'], [18.0, 26.4, 'En la carrera, que Andrés llegó primero es posible: pasa en un orden. Pero en el otro llega tercero, así que no es segura.']] },
    { id: 'pisos', name: 'ORDEN VERTICAL', dur: 28,
      caps: [[0.8, 8.4, 'Un edificio es una fila de pie', 'piso 1 abajo, piso 5 arriba'], [9.0, 17.4, '«Justo encima»: un bloque', '«más alto»: más arriba, pegado o no'], [18.0, 26.4, 'Las mismas reglas', 'se dibuja, se fija lo firme y se prueba']],
      narr: [[0.8, 8.4, 'Un edificio de cinco pisos es la misma fila, pero de pie: el piso uno abajo y el cinco arriba.'], [9.0, 17.4, 'Justo encima forma un bloque, como justo a la derecha. Más alto solo dice que está más arriba, pegado o no.'], [18.0, 26.4, 'Se trabaja igual: dibujar, fijar lo más firme y probar los pocos casos que quedan.']] },
    { id: 'probar', name: 'TRES PASOS', dur: 28,
      caps: [[0.8, 8.4, '1. Dibujar las casillas', 'y cada pista con su símbolo'], [9.0, 17.4, '2. Fijar lo más firme', 'bloques y lugares prohibidos primero'], [18.0, 26.4, '3. Listar los casos que quedan', 'y revisar las opciones contra todos']],
      narr: [[0.8, 8.4, 'Un método de tres pasos. Primero, dibujar las casillas numeradas y escribir cada pista con su símbolo.'], [9.0, 17.4, 'Segundo, fijar lo más firme: los bloques, los extremos prohibidos y las posiciones exactas.'], [18.0, 26.4, 'Tercero, listar los pocos casos que quedan y revisar cada opción contra todos ellos.']] },
    { id: 'resolver', name: 'LAS SILLAS, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'El bloque Carla-Beto', 'cuatro lugares posibles'], [10.0, 19.4, 'Dos casos sobreviven', 'C B A D E  y  D A C B E'], [20.0, 29.4, 'En los dos, Elsa en la silla 5', 'esa es la afirmación segura']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Lo más firme es el bloque Carla-Beto, que cabe en cuatro lugares. Se prueba cada uno.'], [10.0, 19.4, 'Con el bloque en dos-tres o en cuatro-cinco, Elsa siempre queda junto a Ana. Sobreviven dos filas: Carla, Beto, Ana, Diego, Elsa; y Diego, Ana, Carla, Beto, Elsa.'], [20.0, 29.4, 'En las dos, Elsa ocupa la silla cinco. Lo demás cambia de una fila a la otra, así que solo eso es seguro.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Elsa ocupa la silla 5', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: Elsa ocupa la silla cinco. Es lo único que se repite en las dos filas posibles.'], [11.0, 20.4, 'Dibujar las pistas, empezar por los bloques, probar los casos y quedarse con lo que vale en todos.'], [21.0, 29.4, 'Seguro es lo que vale en todos los casos.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 3', TITLE = 'ORDEN EN LÍNEA', LINE = 'Seguro es lo que vale en todos los casos.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-or-1', KEYS: ['Esteban', 'Fabio', 'Bruno'] };
})();
if (typeof module !== 'undefined') module.exports = D;
