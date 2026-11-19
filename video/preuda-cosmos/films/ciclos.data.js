// «Patrones cíclicos» · Preuniversitario, razonamiento lógico, mundo 7 (Secuencias y patrones), lección pu-se-3. Datos puros.
// Reto: ABBCCCD se repite; la letra de la posición 150 (150 = 7 · 21 + 3: la tercera del bloque, B). En medio: encontrar el
// bloque, el residuo, el residuo 0, los días de la semana (mes de 30 días con el 15 en miércoles → el 30 es jueves), el 1 de marzo
// viernes → el 1 de junio sábado (92 = 7 · 13 + 1), el horno de 100 horas (viernes al mediodía) y la última cifra de 2⁹⁹ (8).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'ABBCCCD', dur: 30,
      caps: [[1.0, 9.4, 'ABBCCCD ABBCCCD ABBCCCD…', 'el mismo grupo, repetido sin fin'], [10.0, 19.4, 'La letra de la posición 150', 'escribir 150 letras no es buena idea'], [20.0, 29.4, 'Cuatro opciones', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. El patrón A, B, B, C, C, C, D se repite una y otra vez, sin fin.'], [10.0, 19.4, 'Hay que hallar la letra que ocupa la posición ciento cincuenta. Escribirlas todas tomaría mucho y es fácil equivocarse.'], [20.0, 29.4, 'Los patrones que se repiten tienen un atajo: la división. Al final lo resolvemos.']] },
    { id: 'bloque', name: 'EL BLOQUE', dur: 28,
      caps: [[0.8, 8.4, 'Primero, el grupo que se repite', 'A B B C C C D: 7 letras'], [9.0, 17.4, 'Cada 7 posiciones, todo vuelve', 'la 8.ª es otra vez A'], [18.0, 26.4, 'El largo del bloque', 'es el número que importa']],
      narr: [[0.8, 8.4, 'Lo primero es encontrar el grupo que se repite: A, B, B, C, C, C, D. Tiene siete letras.'], [9.0, 17.4, 'Cada siete posiciones, el patrón vuelve a empezar: la octava es otra vez A, la novena B.'], [18.0, 26.4, 'El largo del bloque, siete, es el número con el que se trabaja.']] },
    { id: 'residuo', name: 'EL RESIDUO', dur: 30,
      caps: [[0.8, 9.4, 'Posición ÷ largo del bloque', '150 ÷ 7 = 21, sobran 3'], [10.0, 19.4, '21 bloques completos', 'no cambian nada: vuelven a empezar'], [20.0, 29.4, 'Lo que sobra decide', 'la posición 150 es la 3.ª del bloque']],
      narr: [[0.8, 9.4, 'Se divide la posición entre el largo del bloque: ciento cincuenta entre siete da veintiuno, y sobran tres.'], [10.0, 19.4, 'Los veintiún bloques completos llegan hasta la posición ciento cuarenta y siete y terminan justo al final del grupo.'], [20.0, 29.4, 'Lo que sobra decide: la posición ciento cincuenta es la tercera dentro del bloque.']] },
    { id: 'cero', name: 'SI SOBRA CERO', dur: 28,
      caps: [[0.8, 8.4, 'Posición 147 = 7 · 21', 'residuo 0'], [9.0, 17.4, 'Residuo 0 no es la «posición 0»', 'es la última del bloque'], [18.0, 26.4, 'La 147 es una D', 'termina el bloque 21']],
      narr: [[0.8, 8.4, 'Si la posición fuera ciento cuarenta y siete, la división sería exacta: siete por veintiuno, residuo cero.'], [9.0, 17.4, 'Residuo cero no quiere decir posición cero: quiere decir que se termina un bloque completo, en su última letra.'], [18.0, 26.4, 'La posición ciento cuarenta y siete es una D, el final del bloque veintiuno.']] },
    { id: 'semana', name: 'LOS DÍAS DE LA SEMANA', dur: 28,
      caps: [[0.8, 8.4, 'La semana es un ciclo de 7', 'cada 7 días, el mismo día'], [9.0, 17.4, 'Mes de 30 días: el 15 es miércoles', 'del 15 al 30 hay 15 días'], [18.0, 26.4, '15 = 2 · 7 + 1', 'el 30 es jueves']],
      narr: [[0.8, 8.4, 'La semana es el ciclo más conocido: cada siete días vuelve el mismo día.'], [9.0, 17.4, 'En un mes de treinta días, el quince fue miércoles. Del quince al treinta pasan quince días.'], [18.0, 26.4, 'Quince días son dos semanas y un día: el treinta es un día después del miércoles, jueves.']] },
    { id: 'fecha', name: 'DE MARZO A JUNIO', dur: 30,
      caps: [[0.8, 9.4, 'El 1 de marzo fue viernes', 'qué día fue el 1 de junio'], [10.0, 19.4, 'Marzo 31 + abril 30 + mayo 31', 'pasan 92 días'], [20.0, 29.4, '92 = 7 · 13 + 1', 'un día después del viernes: sábado']],
      narr: [[0.8, 9.4, 'Otro problema: el uno de marzo de cierto año fue viernes. Hay que saber qué día fue el uno de junio.'], [10.0, 19.4, 'Del uno de marzo al uno de junio pasan marzo, abril y mayo completos: treinta y uno, treinta y treinta y uno, noventa y dos días.'], [20.0, 29.4, 'Noventa y dos son trece semanas y un día. El uno de junio es un día después del viernes: sábado.']] },
    { id: 'horas', name: 'EL HORNO DE 100 HORAS', dur: 28,
      caps: [[0.8, 8.4, 'Encendido: lunes, 8:00 a. m.', 'debe estar 100 horas seguidas'], [9.0, 17.4, '100 = 4 · 24 + 4', 'cuatro días completos y 4 horas'], [18.0, 26.4, 'Viernes 8:00 + 4 horas', 'se apaga el viernes al mediodía']],
      narr: [[0.8, 8.4, 'Un horno se enciende un lunes a las ocho de la mañana y debe quedarse encendido cien horas seguidas.'], [9.0, 17.4, 'El ciclo ahora es el día, de veinticuatro horas: cien horas son cuatro días completos y cuatro horas.'], [18.0, 26.4, 'Cuatro días después del lunes a las ocho es el viernes a las ocho; cuatro horas más, el viernes al mediodía.']] },
    { id: 'cifra', name: 'LA ÚLTIMA CIFRA', dur: 30,
      caps: [[0.8, 9.4, 'Potencias de 2: 2, 4, 8, 16, 32, 64…', 'la última cifra: 2, 4, 8, 6, 2, 4…'], [10.0, 19.4, 'Un ciclo de 4 cifras', '2, 4, 8, 6 y vuelve a empezar'], [20.0, 29.4, '2⁹⁹: 99 = 4 · 24 + 3', 'la 3.ª del ciclo: termina en 8']],
      narr: [[0.8, 9.4, 'Las potencias de dos son dos, cuatro, ocho, dieciséis, treinta y dos, sesenta y cuatro. Sus últimas cifras: dos, cuatro, ocho, seis, dos, cuatro.'], [10.0, 19.4, 'Las últimas cifras forman un ciclo de cuatro: dos, cuatro, ocho, seis, y vuelve a empezar.'], [20.0, 29.4, 'Para dos a la noventa y nueve: noventa y nueve entre cuatro deja residuo tres. Es la tercera del ciclo: termina en ocho.']] },
    { id: 'resolver', name: 'LA LETRA 150, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, '150 = 7 · 21 + 3', '21 bloques completos y 3 letras más'], [10.0, 19.4, 'A, B, B: la 3.ª letra', 'del bloque A B B C C C D'], [20.0, 29.4, 'La posición 150 es una B', 'no una C: la tercera es la segunda B']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Ciento cincuenta es siete por veintiuno más tres: veintiún bloques completos y tres letras más.'], [10.0, 19.4, 'Las tres primeras letras del bloque son A, B, B. La tercera es la segunda B.'], [20.0, 29.4, 'La posición ciento cincuenta es una B. Cuidado: contar desde cero o confundir las B daría otra letra.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'La letra 150 es B', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: la B. Los bloques completos no cuentan; solo el residuo.'], [11.0, 20.4, 'Bloques de letras, semanas, horas y últimas cifras: se divide entre el largo del ciclo y se mira lo que sobra.'], [21.0, 29.4, 'En un ciclo, solo cuenta lo que sobra.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 7', TITLE = 'PATRONES CÍCLICOS', LINE = 'En un ciclo, solo cuenta lo que sobra.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-se-3', KEYS: ['ABBCCCD', '150', '92', 'horno'] };
})();
if (typeof module !== 'undefined') module.exports = D;
