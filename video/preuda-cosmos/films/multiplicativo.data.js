// «Principio multiplicativo y árboles» · Preuniversitario, razonamiento lógico, mundo 5 (Conteo), lección pu-co-1. Datos puros.
// Reto: la bandera de tres franjas con cuatro colores, sin vecinas iguales (4 · 3 · 3 = 36). En medio: el árbol (2 camisas y
// 3 pantalones), el principio multiplicativo (el menú), las casillas (código de tres letras y dos dígitos impares distintos:
// 540), la clave de 4 cifras con 1, 2 y 3 sin vecinos iguales (24), empezar por la restricción (sin el 5: 648), los capicúas
// de cuatro cifras (90) y «y» multiplica, «o» suma.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA BANDERA DE TRES FRANJAS', dur: 30,
      caps: [[1.0, 9.4, 'Tres franjas, cuatro colores', 'se puede repetir color'], [10.0, 19.4, 'Dos franjas vecinas, distintas', 'arriba y abajo sí pueden coincidir'], [20.0, 29.4, 'Cuántas banderas distintas', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una bandera de tres franjas horizontales se pinta con cuatro colores disponibles.'], [10.0, 19.4, 'La única condición: dos franjas vecinas no pueden tener el mismo color. La de arriba y la de abajo sí pueden coincidir.'], [20.0, 29.4, 'Hay que contar cuántas banderas distintas se pueden diseñar, sin dibujarlas todas. Al final lo resolvemos.']] },
    { id: 'arbol', name: 'EL ÁRBOL', dur: 28,
      caps: [[0.8, 8.4, '2 camisas y 3 pantalones', 'cuántas pintas distintas'], [9.0, 17.4, 'Cada camisa abre 3 ramas', 'el árbol muestra todas las parejas'], [18.0, 26.4, '2 · 3 = 6 pintas', 'cada hoja es una pinta']],
      narr: [[0.8, 8.4, 'Sara tiene dos camisas y tres pantalones. Quiere saber cuántas pintas distintas puede armar.'], [9.0, 17.4, 'Se dibuja un árbol: de cada camisa salen tres ramas, una por pantalón.'], [18.0, 26.4, 'Al final hay seis hojas: dos por tres. Cada hoja es una pinta distinta.']] },
    { id: 'regla', name: 'EL PRINCIPIO MULTIPLICATIVO', dur: 28,
      caps: [[0.8, 8.4, '3 entradas, 4 platos, 2 postres', 'un menú: se escoge uno de cada cosa'], [9.0, 17.4, '3 · 4 · 2 = 24 menús', 'un árbol de tres niveles'], [18.0, 26.4, 'Decisiones seguidas se multiplican', 'sin dibujar el árbol entero']],
      narr: [[0.8, 8.4, 'Un restaurante ofrece tres entradas, cuatro platos fuertes y dos postres, y se escoge uno de cada cosa.'], [9.0, 17.4, 'Sería un árbol de tres niveles: tres, por cuatro, por dos. Veinticuatro menús distintos.'], [18.0, 26.4, 'Cuando una elección se hace en pasos seguidos, se multiplican las opciones de cada paso. No hace falta dibujar el árbol.']] },
    { id: 'casillas', name: 'LAS CASILLAS', dur: 30,
      caps: [[0.8, 9.4, 'Tres letras y dos dígitos', 'letras A, B o C; dígitos impares distintos'], [10.0, 19.4, 'Una casilla por decisión', '3 · 3 · 3 · 5 · 4'], [20.0, 29.4, '540 códigos', 'el cuarto dígito ya no puede repetir']],
      narr: [[0.8, 9.4, 'Otro problema: un código tiene tres letras y luego dos dígitos. Las letras son A, B o C y pueden repetirse; los dígitos son impares y distintos.'], [10.0, 19.4, 'Se dibuja una casilla por cada decisión y en cada una se escribe cuántas opciones hay: tres, tres, tres, cinco y cuatro.'], [20.0, 29.4, 'El último dígito tiene cuatro opciones porque no puede repetir el anterior. En total, quinientos cuarenta códigos.']] },
    { id: 'clave', name: 'LA CLAVE DE CAMILO', dur: 30,
      caps: [[0.8, 9.4, 'Clave de 4 cifras con 1, 2 y 3', 'nunca dos iguales juntos'], [10.0, 19.4, 'La primera: 3 opciones', 'cada siguiente: 2, la que no repite'], [20.0, 29.4, '3 · 2 · 2 · 2 = 24', 'no 81: eso sería sin la condición']],
      narr: [[0.8, 9.4, 'Otro problema: Camilo arma una clave de cuatro cifras con los dígitos uno, dos y tres, sin que queden dos iguales juntos.'], [10.0, 19.4, 'La primera cifra tiene tres opciones. Cada una de las siguientes tiene dos: cualquiera menos la que acaba de usar.'], [20.0, 29.4, 'Tres por dos por dos por dos: veinticuatro claves. Ochenta y uno serían todas, sin la condición.']] },
    { id: 'restriccion', name: 'PRIMERO LA RESTRICCIÓN', dur: 28,
      caps: [[0.8, 8.4, 'Números de tres cifras sin el 5', 'la primera cifra no puede ser 0'], [9.0, 17.4, 'Primera: 8 opciones', 'ni 0 ni 5; las otras dos: 9 cada una'], [18.0, 26.4, '8 · 9 · 9 = 648', 'se empieza por la casilla más exigente']],
      narr: [[0.8, 8.4, 'Ahora se cuentan los números de tres cifras que no usan el cinco. La primera cifra, además, no puede ser cero.'], [9.0, 17.4, 'La primera cifra tiene ocho opciones, ni cero ni cinco. Las otras dos, nueve cada una.'], [18.0, 26.4, 'Ocho por nueve por nueve: seiscientos cuarenta y ocho. Siempre se llena primero la casilla con más condiciones.']] },
    { id: 'capicua', name: 'LOS CAPICÚAS', dur: 28,
      caps: [[0.8, 8.4, 'Capicúa: se lee igual al revés', '3443, 5005, 7117'], [9.0, 17.4, 'Forma a b b a', 'solo se eligen a y b'], [18.0, 26.4, '9 · 10 = 90', 'a no puede ser 0; las otras dos se copian']],
      narr: [[0.8, 8.4, 'Un número capicúa se lee igual de izquierda a derecha que al revés, como tres mil cuatrocientos cuarenta y tres.'], [9.0, 17.4, 'Uno de cuatro cifras tiene la forma a, be, be, a: las dos últimas cifras copian a las dos primeras.'], [18.0, 26.4, 'Solo se eligen a y be: nueve opciones para a, que no puede ser cero, y diez para be. Hay noventa.']] },
    { id: 'yo', name: '«Y» MULTIPLICA, «O» SUMA', dur: 28,
      caps: [[0.8, 8.4, 'De A a C pasando por B', '3 caminos y luego 2: 3 · 2 = 6'], [9.0, 17.4, 'O directo de A a C', '2 caminos más'], [18.0, 26.4, '6 + 2 = 8 caminos', 'pasos seguidos: ×; caminos distintos: +']],
      narr: [[0.8, 8.4, 'De A a B hay tres caminos y de B a C, dos. Por B se hace una cosa y luego la otra: seis.'], [9.0, 17.4, 'Pero también hay dos caminos directos de A a C, que no pasan por B.'], [18.0, 26.4, 'En total, seis más dos: ocho. Una cosa y luego otra se multiplica; una cosa o la otra se suma.']] },
    { id: 'resolver', name: 'LA BANDERA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Franja de arriba: 4 colores', 'cualquiera'], [10.0, 19.4, 'Del medio: 3; de abajo: 3', 'cada una evita solo a su vecina de arriba'], [20.0, 29.4, '4 · 3 · 3 = 36 banderas', 'la de abajo puede repetir la de arriba']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La franja de arriba puede tener cualquiera de los cuatro colores.'], [10.0, 19.4, 'La del medio, tres: todos menos el de arriba. La de abajo, también tres: todos menos el del medio.'], [20.0, 29.4, 'Cuatro por tres por tres: treinta y seis banderas. La de abajo puede repetir la de arriba, porque no son vecinas.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Hay 36 banderas', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: treinta y seis. Una casilla por franja y en cada una, cuántas opciones quedan.'], [11.0, 20.4, 'El árbol, el principio multiplicativo, empezar por la restricción, y la diferencia entre y, que multiplica, y o, que suma.'], [21.0, 29.4, 'Una casilla por decisión; se multiplican.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 5', TITLE = 'PRINCIPIO MULTIPLICATIVO', LINE = 'Una casilla por decisión; se multiplican.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-co-1', KEYS: ['bandera', '540', '648', 'capicúa'] };
})();
if (typeof module !== 'undefined') module.exports = D;
