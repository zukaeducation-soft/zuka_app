// «Edades, mezclas y monedas» · Preuniversitario, razonamiento lógico, mundo 13 (Ecuaciones), lección pu-ec-2. Datos puros.
// Reto: hace 4 años el padre tenía el triple de la edad del hijo y dentro de 8 tendrá el doble → hoy suman 56 (40 y 16). En medio: la
// diferencia de edades no cambia (Sara 10 y su mamá 38), Marta (en 2030 el triple de su edad en 2000 → nació en 1985), las dos
// soluciones salinas (200 g al 10 % y 300 g al 20 % → 16 %), la mezcla como promedio ponderado, agregar agua al alcohol (40 L al 25 %
// → 10 L para el 20 %), lo que se conserva al evaporar (50 kg al 4 % → 10 kg para el 5 %) y las monedas (20 de 200 y 500 suman 7 000).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL PADRE Y EL HIJO', dur: 30,
      caps: [[1.0, 9.4, 'Hace 4 años: padre = 3 · hijo', 'dentro de 8 años: padre = 2 · hijo'], [10.0, 19.4, 'Dos momentos distintos', 'y dos edades que no se conocen'], [20.0, 29.4, 'La suma de sus edades actuales', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Hace cuatro años, la edad de un padre era el triple de la de su hijo, y dentro de ocho años será el doble.'], [10.0, 19.4, 'Hay dos momentos distintos y dos edades que no se conocen.'], [20.0, 29.4, 'Hay que hallar la suma de las edades de hoy. Al final lo resolvemos.']] },
    { id: 'tabla', name: 'LA TABLA DEL TIEMPO', dur: 28,
      caps: [[0.8, 8.4, 'Una fila por persona', 'una columna por momento: antes, hoy, después'], [9.0, 17.4, 'Sara 10 y su mamá 38', 'en 5 años: 15 y 43'], [18.0, 26.4, 'La diferencia siempre es 28', 'los dos cumplen años al mismo ritmo']],
      narr: [[0.8, 8.4, 'Las edades se ordenan en una tabla: una fila por persona y una columna por momento, antes, hoy y después.'], [9.0, 17.4, 'Sara tiene diez años y su mamá treinta y ocho. En cinco años tendrán quince y cuarenta y tres.'], [18.0, 26.4, 'La diferencia siempre es veintiocho: los dos suman años al mismo ritmo. Ese dato no cambia nunca.']] },
    { id: 'marta', name: 'EL AÑO DE MARTA', dur: 28,
      caps: [[0.8, 8.4, 'En 2030, Marta tendrá el triple', 'de la edad que tenía en 2000'], [9.0, 17.4, 'Edad en 2000: x; en 2030: x + 30', 'x + 30 = 3x → x = 15'], [18.0, 26.4, 'En 2000 tenía 15 años', 'nació en 1985']],
      narr: [[0.8, 8.4, 'En el año dos mil treinta, Marta tendrá el triple de la edad que tenía en el año dos mil.'], [9.0, 17.4, 'Si en el dos mil tenía equis, treinta años después tendrá equis más treinta. Y eso es tres equis: equis es quince.'], [18.0, 26.4, 'En el dos mil tenía quince años, así que nació en mil novecientos ochenta y cinco.']] },
    { id: 'sal', name: 'DOS SOLUCIONES SALINAS', dur: 30,
      caps: [[0.8, 9.4, '200 g al 10 % de sal', 'y 300 g al 20 %'], [10.0, 19.4, 'Sal: 20 g + 60 g = 80 g', 'en 500 g de mezcla'], [20.0, 29.4, '80 ÷ 500 = 16 %', 'se suma lo que se conserva: la sal']],
      narr: [[0.8, 9.4, 'Otro problema: se mezclan doscientos gramos de una solución con diez por ciento de sal y trescientos gramos de otra con veinte por ciento.'], [10.0, 19.4, 'La primera tiene veinte gramos de sal y la segunda sesenta: ochenta gramos de sal en quinientos de mezcla.'], [20.0, 29.4, 'Ochenta de quinientos es el dieciséis por ciento. Los porcentajes no se suman: se suma la sal.']] },
    { id: 'ponderado', name: 'LA MEZCLA ES UN PROMEDIO', dur: 28,
      caps: [[0.8, 8.4, 'El 16 % queda entre 10 % y 20 %', 'pero no en el medio'], [9.0, 17.4, 'Más cerca del 20 %', 'porque de esa hay más: 300 g'], [18.0, 26.4, 'Como un promedio ponderado', 'pesa más lo que más cantidad tiene']],
      narr: [[0.8, 8.4, 'Una mezcla siempre queda entre sus ingredientes: el dieciséis está entre diez y veinte. Pero no en el medio.'], [9.0, 17.4, 'Queda más cerca del veinte, porque de esa solución hay más: trescientos gramos frente a doscientos.'], [18.0, 26.4, 'Es un promedio ponderado: pesa más lo que más cantidad tiene.']] },
    { id: 'alcohol', name: 'AGUA AL ALCOHOL', dur: 30,
      caps: [[0.8, 9.4, '40 L de mezcla con 25 % de alcohol', 'se agrega agua hasta el 20 %'], [10.0, 19.4, 'El alcohol no cambia: 10 L', '10 L serán el 20 % del total'], [20.0, 29.4, 'Total 50 L', 'hay que agregar 10 L de agua']],
      narr: [[0.8, 9.4, 'Otro problema: se tienen cuarenta litros de una mezcla de agua y alcohol con veinticinco por ciento de alcohol. Se agrega agua hasta que quede al veinte por ciento.'], [10.0, 19.4, 'Al agregar agua, el alcohol no cambia: son diez litros. Esos diez litros tendrán que ser el veinte por ciento del total.'], [20.0, 29.4, 'Si diez es el veinte por ciento, el total es cincuenta litros. Hay que agregar diez litros de agua.']] },
    { id: 'conserva', name: 'LO QUE SE CONSERVA', dur: 28,
      caps: [[0.8, 8.4, '50 kg de agua de mar con 4 % de sal', 'se evapora agua hasta el 5 %'], [9.0, 17.4, 'La sal no se evapora: 2 kg', '2 kg = 5 % de 40 kg'], [18.0, 26.4, 'Se evaporan 10 kg de agua', 'busca siempre lo que no cambia']],
      narr: [[0.8, 8.4, 'Al evaporar pasa lo contrario. Cincuenta kilos de agua de mar tienen cuatro por ciento de sal; se evapora agua hasta el cinco.'], [9.0, 17.4, 'La sal no se evapora: son dos kilos, y dos kilos son el cinco por ciento de cuarenta.'], [18.0, 26.4, 'Se evaporan diez kilos de agua. En las mezclas, busca siempre lo que no cambia.']] },
    { id: 'monedas', name: 'LAS MONEDAS', dur: 28,
      caps: [[0.8, 8.4, '20 monedas de 200 y de 500', 'suman 7 000 pesos'], [9.0, 17.4, 'k de 500 y 20 − k de 200', '500k + 200(20 − k) = 7 000'], [18.0, 26.4, '300k = 3 000 → k = 10', '10 de cada una']],
      narr: [[0.8, 8.4, 'Las monedas se plantean igual. Hay veinte monedas de doscientos y de quinientos, y suman siete mil pesos.'], [9.0, 17.4, 'Si hay k de quinientos, las otras veinte menos k son de doscientos. Lo que valen todas: siete mil.'], [18.0, 26.4, 'Queda trescientos k igual a tres mil: k es diez. Hay diez de cada una.']] },
    { id: 'resolver', name: 'LAS EDADES, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'Hace 4: hijo h − 4, padre 3(h − 4)', 'diferencia: 2(h − 4)'], [10.0, 19.4, 'En 8: hijo h + 8, padre 2(h + 8)', 'diferencia: h + 8'], [20.0, 29.4, '2(h − 4) = h + 8 → h = 16', 'padre 40; suman 56']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Hace cuatro años el hijo tenía h menos cuatro y el padre el triple: la diferencia era dos veces h menos cuatro.'], [10.0, 19.4, 'Dentro de ocho, el hijo tendrá h más ocho y el padre el doble: la diferencia será h más ocho.'], [20.0, 29.4, 'Como la diferencia no cambia, las dos son iguales: h es dieciséis. El padre tiene cuarenta, y suman cincuenta y seis.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Las edades suman 56', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cincuenta y seis. El padre tiene cuarenta y el hijo dieciséis.'], [11.0, 20.4, 'La diferencia de edades no cambia, en una mezcla se suma lo que se conserva, y las monedas se cuentan por su valor.'], [21.0, 29.4, 'Busca lo que no cambia.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 13', TITLE = 'EDADES Y MEZCLAS', LINE = 'Busca lo que no cambia.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ec-2', KEYS: ['solución', 'alcohol', 'Marta', 'evapor'] };
})();
if (typeof module !== 'undefined') module.exports = D;
