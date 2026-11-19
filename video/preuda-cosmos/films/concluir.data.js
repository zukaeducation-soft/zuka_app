// «Concluir de una tabla» · Preuniversitario, razonamiento lógico, mundo 9 (Tablas y gráficas), lección pu-gr-3. Datos puros.
// Reto: las ventas de una librería por género y trimestre; la única afirmación falsa es «el 40 % de los infantiles se vendió en T3
// y T4» (fueron 100 de 300, un 33.3 %). En medio: la tabla de doble entrada (papel o celular, jóvenes y adultos), el mismo 40 como
// 40 %, 80 % o 20 % según el total, los planes de telefonía (250 min: A 45 000, B 47 500, C 60 000), dónde se cruzan (300 y 500
// minutos), el torneo con casillas vacías (Búfalos 19 puntos; Cóndores 2 perdidos) y cómo cae una afirmación.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LAS VENTAS DE LA LIBRERÍA', dur: 30,
      caps: [[1.0, 9.4, 'Libros vendidos en un año', 'por género y por trimestre'], [10.0, 19.4, 'Cuatro afirmaciones', 'solo una es falsa'], [20.0, 29.4, 'Cada una se comprueba con números', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una tabla muestra los libros que vendió una librería en un año, por género y por trimestre.'], [10.0, 19.4, 'Hay cuatro afirmaciones sobre la tabla, y solo una es falsa.'], [20.0, 29.4, 'Ninguna se decide a ojo: cada una se comprueba con los números de la tabla. Al final lo resolvemos.']] },
    { id: 'doble', name: 'LA TABLA DE DOBLE ENTRADA', dur: 28,
      caps: [[0.8, 8.4, '200 personas: papel o celular', 'filas: jóvenes y adultos'], [9.0, 17.4, 'Cada casilla: una fila y una columna', '40 adultos leen en papel'], [18.0, 26.4, 'Los totales cierran la cuenta', 'cada fila y cada columna suman']],
      narr: [[0.8, 8.4, 'Doscientas personas dicen si leen las noticias en papel o en el celular. Las filas separan jóvenes y adultos.'], [9.0, 17.4, 'Cada casilla es el cruce de una fila con una columna: cuarenta personas son adultos y leen en papel.'], [18.0, 26.4, 'Al final de cada fila y de cada columna va su total. Sirven para comprobar y para llenar lo que falte.']] },
    { id: 'deque', name: 'PORCENTAJE DE QUÉ', dur: 28,
      caps: [[0.8, 8.4, '40 de los 100 adultos: 40 %', 'el total es la fila'], [9.0, 17.4, '40 de los 50 que leen en papel: 80 %', 'el total es la columna'], [18.0, 26.4, '40 de las 200 personas: 20 %', 'el mismo 40, tres porcentajes']],
      narr: [[0.8, 8.4, 'El mismo cuarenta da porcentajes distintos. Frente a los cien adultos, es el cuarenta por ciento.'], [9.0, 17.4, 'Frente a los cincuenta que leen en papel, es el ochenta por ciento: la mayoría de quienes leen en papel son adultos.'], [18.0, 26.4, 'Y frente a las doscientas personas, el veinte por ciento. Lo que cambia es el total con el que se compara.']] },
    { id: 'planes', name: 'TRES PLANES DE TELEFONÍA', dur: 30,
      caps: [[0.8, 9.4, 'A: 20 000 + 100 por minuto', 'B: 35 000 + 50 por minuto · C: 60 000'], [10.0, 19.4, 'Para 250 minutos', 'A: 45 000 · B: 47 500 · C: 60 000'], [20.0, 29.4, 'El más económico: el plan A', 'aunque B cobre menos por minuto']],
      narr: [[0.8, 9.4, 'Otro problema: el plan A cobra veinte mil más cien por minuto, el B treinta y cinco mil más cincuenta por minuto, y el C sesenta mil fijos.'], [10.0, 19.4, 'Para doscientos cincuenta minutos: el A cuesta cuarenta y cinco mil, el B cuarenta y siete mil quinientos y el C sesenta mil.'], [20.0, 29.4, 'El más económico es el plan A, aunque el B cobre menos por cada minuto.']] },
    { id: 'cruce', name: 'DÓNDE SE CRUZAN', dur: 28,
      caps: [[0.8, 8.4, 'Cada plan es una recta', 'el costo según los minutos'], [9.0, 17.4, 'A y B se cruzan en 300 minutos', 'B y C, en 500'], [18.0, 26.4, 'Hasta 300 conviene A', 'de 300 a 500, B; desde 500, C']],
      narr: [[0.8, 8.4, 'Si se dibuja el costo de cada plan según los minutos, cada uno es una recta, y el C es plano.'], [9.0, 17.4, 'A y B cuestan lo mismo en trescientos minutos, cincuenta mil. B y C se igualan en quinientos.'], [18.0, 26.4, 'Así se lee la gráfica: hasta trescientos conviene el A, de trescientos a quinientos el B, y desde quinientos el C.']] },
    { id: 'torneo', name: 'EL TORNEO INCOMPLETO', dur: 30,
      caps: [[0.8, 9.4, '10 partidos; ganar 3, empatar 1', 'a la tabla le faltan casillas'], [10.0, 19.4, 'Búfalos: 5 ganados, 1 perdido', 'empatados: 10 − 5 − 1 = 4'], [20.0, 29.4, '5 · 3 + 4 · 1 = 19 puntos', 'la fila se completa con sus reglas']],
      narr: [[0.8, 9.4, 'Otro problema: en un torneo, ganar da tres puntos y empatar uno. Cada equipo jugó diez partidos, pero a la tabla le faltan casillas.'], [10.0, 19.4, 'Los Búfalos ganaron cinco y perdieron uno. Como jugaron diez, empataron cuatro.'], [20.0, 29.4, 'Cinco por tres más cuatro: diecinueve puntos. La fila se completa con las reglas de la tabla.']] },
    { id: 'huecos', name: 'LLENAR LOS HUECOS', dur: 28,
      caps: [[0.8, 8.4, 'Cóndores: 3 empates y 18 puntos', 'faltan ganados y perdidos'], [9.0, 17.4, '3 · G + 3 = 18', 'G = 5 partidos ganados'], [18.0, 26.4, 'Perdidos: 10 − 5 − 3 = 2', 'cada regla es una ecuación']],
      narr: [[0.8, 8.4, 'Los Cóndores empataron tres y tienen dieciocho puntos. Faltan los ganados y los perdidos.'], [9.0, 17.4, 'Los empates dan tres puntos, así que los ganados dan quince: cinco partidos ganados.'], [18.0, 26.4, 'Y perdieron diez menos cinco menos tres: dos. Cada regla de la tabla es una ecuación pequeña.']] },
    { id: 'caer', name: 'CÓMO CAE UNA AFIRMACIÓN', dur: 28,
      caps: [[0.8, 8.4, 'Todos, siempre, cada: un caso basta', 'basta un contraejemplo'], [9.0, 17.4, 'Más de 1/4 no es lo mismo que 1/4', 'exactamente 25 % no es más de 25 %'], [18.0, 26.4, 'El porcentaje, con su total', 'de la fila, de la columna o de todo']],
      narr: [[0.8, 8.4, 'Las palabras todos, siempre o cada uno son peligrosas: una afirmación así cae con un solo caso en contra.'], [9.0, 17.4, 'Hay que leer con lupa: más de la cuarta parte no es lo mismo que exactamente la cuarta parte.'], [18.0, 26.4, 'Y todo porcentaje se calcula con su total: el de la fila, el de la columna o el de toda la tabla.']] },
    { id: 'resolver', name: 'LA LIBRERÍA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'T3: novela 150 de 300 = 50 %', 'poesía: 150 de 1 200 = 12.5 %'], [10.0, 19.4, 'T4: ensayo 60, infantil 50', 'también es cierta'], [20.0, 29.4, 'Infantil en T3 y T4: 100 de 300', 'es el 33.3 %, no el 40 %']],
      narr: [[0.8, 9.4, 'Volvamos al reto. En el tercer trimestre, la novela fue ciento cincuenta de trescientos: la mitad. La poesía, ciento cincuenta de mil doscientos: doce coma cinco por ciento.'], [10.0, 19.4, 'En el cuarto trimestre se vendieron sesenta de ensayo y cincuenta infantiles: también es cierta.'], [20.0, 29.4, 'Infantiles en el segundo semestre: cincuenta más cincuenta, cien de trescientos. Es un tercio, no el cuarenta por ciento.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'La falsa: el 40 % de los infantiles', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: los infantiles del segundo semestre son un tercio, no el cuarenta por ciento.'], [11.0, 20.4, 'Leer filas y columnas, preguntar el total de cada porcentaje, llenar huecos con las reglas y comprobar cada afirmación.'], [21.0, 29.4, 'Una tabla no opina: se comprueba.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 9', TITLE = 'CONCLUIR DE UNA TABLA', LINE = 'Una tabla no opina: se comprueba.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-gr-3', KEYS: ['librería', 'Búfalos', 'minutos'] };
})();
if (typeof module !== 'undefined') module.exports = D;
