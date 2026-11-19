// «Porcentajes» · Preuniversitario, razonamiento lógico, mundo 4 (Proporcionalidad), lección pu-pr-4. Datos puros.
// Reto: la elección (votó el 60 %; el ganador sacó el 55 % de los votos, 6 600 → 20 000 habilitados). En medio: las tres
// preguntas, qué porcentaje es una parte (18 de 24 = 75 %), hallar el total al revés (quedan 26 L tras gastar el 35 % → 40 L),
// el tanque del 40 % al 65 % con 30 L (120 L), el porcentaje de un porcentaje, el grupo en bicicleta (16 %) y los puntos
// porcentuales.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA ELECCIÓN', dur: 30,
      caps: [[1.0, 9.4, 'Votó el 60 % de los habilitados', 'el resto no fue a votar'], [10.0, 19.4, 'El ganador: 55 % de los votos', 'esos fueron 6 600 votos'], [20.0, 29.4, 'Cuántos podían votar', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En una elección votó el sesenta por ciento de las personas habilitadas.'], [10.0, 19.4, 'El candidato ganador obtuvo el cincuenta y cinco por ciento de los votos: seis mil seiscientos.'], [20.0, 29.4, 'Hay que hallar cuántas personas estaban habilitadas. Ojo: hay un porcentaje dentro de otro. Al final lo resolvemos.']] },
    { id: 'tres', name: 'TRES PREGUNTAS', dur: 30,
      caps: [[0.8, 9.4, 'El 30 % de 250', 'se conoce el total: se calcula la parte'], [10.0, 19.4, 'Qué porcentaje es 18 de 24', 'se conocen las dos: se divide'], [20.0, 29.4, 'El 30 % es 45: cuál es el total', 'se conoce la parte: se va al revés']],
      narr: [[0.8, 9.4, 'Con porcentajes hay tres preguntas distintas. Primera: el treinta por ciento de doscientos cincuenta. Se conoce el total y se busca la parte: setenta y cinco.'], [10.0, 19.4, 'Segunda: qué porcentaje es dieciocho de veinticuatro. Se conocen las dos y se divide.'], [20.0, 29.4, 'Tercera: el treinta por ciento de un número es cuarenta y cinco; hallar el número. Se conoce la parte y se va al revés.']] },
    { id: 'parte', name: 'QUÉ PORCENTAJE ES', dur: 28,
      caps: [[0.8, 8.4, '18 de 24', 'se escribe como fracción: 18/24'], [9.0, 17.4, '18/24 = 3/4 = 0.75', 'se simplifica y se divide'], [18.0, 26.4, '0.75 · 100 = 75 %', 'parte entre total, por cien']],
      narr: [[0.8, 8.4, 'Dieciocho de veinticuatro se escribe como una fracción: dieciocho veinticuatroavos.'], [9.0, 17.4, 'Se simplifica a tres cuartos y se divide: cero coma setenta y cinco.'], [18.0, 26.4, 'Por cien da setenta y cinco por ciento. Siempre es la parte entre el total, multiplicado por cien.']] },
    { id: 'reves', name: 'HALLAR EL TOTAL', dur: 30,
      caps: [[0.8, 9.4, 'Se gastó el 35 % del tanque', 'quedan 26 litros'], [10.0, 19.4, 'Lo que queda es el 65 %', '65 % = 26 litros'], [20.0, 29.4, '1 % = 0.4 L · 100 % = 40 L', 'se pasa por el uno por ciento']],
      narr: [[0.8, 9.4, 'Del tanque de un carro se ha gastado el treinta y cinco por ciento, y quedan veintiséis litros. Se busca la capacidad.'], [10.0, 19.4, 'Los veintiséis litros no son el treinta y cinco por ciento: son lo que queda, el sesenta y cinco por ciento.'], [20.0, 29.4, 'El uno por ciento es veintiséis entre sesenta y cinco, cero coma cuatro litros. El cien por ciento son cuarenta litros.']] },
    { id: 'tanque', name: 'DEL 40 % AL 65 %', dur: 30,
      caps: [[0.8, 9.4, 'Un tanque al 40 %', 'se le agregan 30 litros y queda al 65 %'], [10.0, 19.4, 'Los 30 litros son el 25 %', 'lo que subió, no lo que hay'], [20.0, 29.4, '25 % = 30 L → 100 % = 120 L', 'cuatro veces 30']],
      narr: [[0.8, 9.4, 'Otro problema: un tanque está lleno hasta el cuarenta por ciento. Al agregarle treinta litros, queda al sesenta y cinco por ciento.'], [10.0, 19.4, 'Los treinta litros llenaron la diferencia: del cuarenta al sesenta y cinco, el veinticinco por ciento.'], [20.0, 29.4, 'Si el veinticinco por ciento son treinta litros, el cien por ciento son cuatro veces eso: ciento veinte litros.']] },
    { id: 'deun', name: 'UN PORCENTAJE DE OTRO', dur: 28,
      caps: [[0.8, 8.4, 'El 25 % del 40 %', 'una parte de una parte'], [9.0, 17.4, '0.25 · 0.40 = 0.10', 'se multiplican los decimales'], [18.0, 26.4, 'Es el 10 % del total', 'no el 65 %: no se suman']],
      narr: [[0.8, 8.4, 'El veinticinco por ciento del cuarenta por ciento es una parte de una parte.'], [9.0, 17.4, 'Se multiplican como decimales: cero coma veinticinco por cero coma cuarenta, cero coma diez.'], [18.0, 26.4, 'Es el diez por ciento del total. Sumar los porcentajes no tiene sentido: cada uno es de una cosa distinta.']] },
    { id: 'grupo', name: 'LLEGAN EN BICICLETA', dur: 30,
      caps: [[0.8, 9.4, '40 % mujeres, 60 % hombres', 'en bici: 25 % de ellas y 10 % de ellos'], [10.0, 19.4, 'Con 100 personas', '25 % de 40 = 10;  10 % de 60 = 6'], [20.0, 29.4, '10 + 6 = 16 de 100', 'el 16 % del grupo, no el 35 %']],
      narr: [[0.8, 9.4, 'Otro problema: en un grupo el cuarenta por ciento son mujeres. El veinticinco por ciento de ellas y el diez por ciento de los hombres llegan en bicicleta.'], [10.0, 19.4, 'Se imagina un grupo de cien. Hay cuarenta mujeres, de las que diez llegan en bici, y sesenta hombres, de los que seis.'], [20.0, 29.4, 'Son dieciséis de cien: el dieciséis por ciento. Sumar veinticinco y diez daría treinta y cinco, que es la trampa.']] },
    { id: 'puntos', name: 'PUNTOS PORCENTUALES', dur: 28,
      caps: [[0.8, 8.4, 'De 40 % a 50 %', 'subió 10 puntos porcentuales'], [9.0, 17.4, 'Pero creció un 25 %', '10 más sobre 40 de antes'], [18.0, 26.4, 'Dos cosas distintas', 'la diferencia, o la diferencia sobre lo de antes']],
      narr: [[0.8, 8.4, 'Si un porcentaje pasa del cuarenta al cincuenta, subió diez puntos porcentuales: es la resta.'], [9.0, 17.4, 'Pero comparado con lo que había, creció un veinticinco por ciento: diez más sobre cuarenta.'], [18.0, 26.4, 'Son dos cosas distintas: la diferencia, o la diferencia dividida entre lo que había antes.']] },
    { id: 'resolver', name: 'LA ELECCIÓN, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, '55 % de los votos = 6 600', 'votaron 6 600 ÷ 0.55 = 12 000'], [10.0, 19.4, '12 000 son el 60 %', 'de los habilitados'], [20.0, 29.4, '12 000 ÷ 0.6 = 20 000', 'o de una vez: 0.6 · 0.55 = 0.33']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Los seis mil seiscientos votos son el cincuenta y cinco por ciento de los que votaron: votaron doce mil.'], [10.0, 19.4, 'Y esos doce mil son el sesenta por ciento de los habilitados.'], [20.0, 29.4, 'Doce mil entre cero coma seis: veinte mil habilitados. El ganador sacó el treinta y tres por ciento de todos.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Había 20 000 habilitados', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: veinte mil. Cada porcentaje es de algo distinto, y hay que saber de qué.'], [11.0, 20.4, 'La parte, qué porcentaje es, y el total al revés; un porcentaje de otro se multiplica, nunca se suma.'], [21.0, 29.4, 'Todo porcentaje es de algo.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 4', TITLE = 'PORCENTAJES', LINE = 'Todo porcentaje es de algo.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-pr-4', KEYS: ['6600', '20000', '26 L', 'bicicleta'] };
})();
if (typeof module !== 'undefined') module.exports = D;
