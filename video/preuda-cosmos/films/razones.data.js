// «Razones, repartos y escalas» · Preuniversitario, razonamiento lógico, mundo 4 (Proporcionalidad), lección pu-pr-1. Datos puros.
// Reto: el salón con hombres y mujeres en razón 3 : 5; llegan 6 hombres y pasa a 3 : 4 (40 mujeres). En medio: qué es una
// razón, las partes, el reparto de 840 000 en 3 : 4, la herencia 2 : 3 : 5 (18 millones de diferencia → 60), la escala
// 1 : 50 000 (6 cm → 3 km), el producto cruzado y razones encadenadas (a/b = 2/3, b/c = 4/5 → a/c = 8/15).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL SALÓN DE CLASE', dur: 30,
      caps: [[1.0, 9.4, 'Hombres y mujeres: 3 : 5', 'por cada 3 hombres hay 5 mujeres'], [10.0, 19.4, 'Llegan 6 hombres más', 'la razón pasa a 3 : 4'], [20.0, 29.4, 'Cuántas mujeres hay', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En un salón, la razón entre hombres y mujeres es tres a cinco.'], [10.0, 19.4, 'Llegan seis hombres más y la razón pasa a ser tres a cuatro. Las mujeres no cambian.'], [20.0, 29.4, 'Hay que hallar cuántas mujeres hay. No se sabe el total, pero las razones bastan. Al final lo resolvemos.']] },
    { id: 'razon', name: 'QUÉ ES UNA RAZÓN', dur: 28,
      caps: [[0.8, 8.4, '2 de agua por cada 3 de harina', 'la razón 2 : 3 compara dos cantidades'], [9.0, 17.4, '4 : 6 y 6 : 9 son la misma razón', 'la mezcla sabe igual, solo hay más'], [18.0, 26.4, 'Una razón no dice cuántos hay', 'dice cómo se reparten']],
      narr: [[0.8, 8.4, 'Una receta lleva dos tazas de agua por cada tres de harina. La razón dos a tres compara las dos cantidades.'], [9.0, 17.4, 'Con cuatro y seis, o seis y nueve, la mezcla es la misma: solo hay más. Son razones iguales.'], [18.0, 26.4, 'Una razón no dice cuántas tazas hay en total: dice cómo se reparten.']] },
    { id: 'partes', name: 'PARTES IGUALES', dur: 28,
      caps: [[0.8, 8.4, '3 : 5 son 8 partes iguales', '3 para unos, 5 para otros'], [9.0, 17.4, 'Cada parte vale lo mismo: k', 'hombres 3k, mujeres 5k'], [18.0, 26.4, 'Si una parte vale 4', 'hay 12 hombres y 20 mujeres']],
      narr: [[0.8, 8.4, 'La razón tres a cinco parte el grupo en ocho partes iguales: tres para los hombres y cinco para las mujeres.'], [9.0, 17.4, 'Cada parte tiene el mismo tamaño, que se llama ka. Los hombres son tres ka y las mujeres cinco ka.'], [18.0, 26.4, 'Si cada parte vale cuatro, hay doce hombres y veinte mujeres: el total siempre es múltiplo de ocho.']] },
    { id: 'reparto', name: 'EL REPARTO', dur: 28,
      caps: [[0.8, 8.4, 'Repartir 840 000 en razón 3 : 4', 'son 3 + 4 = 7 partes'], [9.0, 17.4, 'Cada parte: 840 000 ÷ 7', '120 000'], [18.0, 26.4, '360 000 y 480 000', 'tres partes y cuatro partes']],
      narr: [[0.8, 8.4, 'Dos socios se reparten ochocientos cuarenta mil pesos en razón tres a cuatro. Se cuentan las partes: siete.'], [9.0, 17.4, 'Cada parte vale ochocientos cuarenta mil entre siete: ciento veinte mil.'], [18.0, 26.4, 'Uno recibe tres partes, trescientos sesenta mil; el otro cuatro, cuatrocientos ochenta mil.']] },
    { id: 'herencia', name: 'LA HERENCIA', dur: 30,
      caps: [[0.8, 9.4, 'Tres hermanos, razón 2 : 3 : 5', 'el mayor recibe 18 millones más que el menor'], [10.0, 19.4, 'La diferencia son 3 partes', '5 − 2 = 3 partes = 18 millones'], [20.0, 29.4, 'Cada parte, 6 millones', '10 partes: la herencia es de 60']],
      narr: [[0.8, 9.4, 'Otro problema: tres hermanos se reparten una herencia en razón dos, tres, cinco. El que más recibe obtiene dieciocho millones más que el que menos.'], [10.0, 19.4, 'Entre cinco partes y dos partes hay tres partes de diferencia. Esas tres partes son los dieciocho millones.'], [20.0, 29.4, 'Cada parte vale seis millones. En total hay diez partes: la herencia es de sesenta millones.']] },
    { id: 'escala', name: 'LA ESCALA DE UN MAPA', dur: 28,
      caps: [[0.8, 8.4, 'Escala 1 : 50 000', '1 cm del mapa son 50 000 cm reales'], [9.0, 17.4, 'Dos pueblos a 6 cm', '6 · 50 000 = 300 000 cm'], [18.0, 26.4, '300 000 cm = 3 km', 'cien centímetros por metro, mil metros por km']],
      narr: [[0.8, 8.4, 'Otro problema: un mapa a escala uno a cincuenta mil. Cada centímetro del mapa representa cincuenta mil centímetros de la realidad.'], [9.0, 17.4, 'Si dos pueblos están a seis centímetros en el mapa, en la realidad están a seis por cincuenta mil: trescientos mil centímetros.'], [18.0, 26.4, 'Trescientos mil centímetros son tres mil metros, tres kilómetros. Casi todo el error está en las unidades.']] },
    { id: 'cruzado', name: 'EL PRODUCTO CRUZADO', dur: 28,
      caps: [[0.8, 8.4, 'Dos razones iguales: una proporción', '4 / 6 = 10 / x'], [9.0, 17.4, 'Los productos cruzados son iguales', '4 · x = 6 · 10'], [18.0, 26.4, 'x = 60 ÷ 4 = 15', 'se comprueba: 10 / 15 = 2 / 3']],
      narr: [[0.8, 8.4, 'Dos razones iguales forman una proporción: cuatro es a seis como diez es a equis.'], [9.0, 17.4, 'En una proporción, los productos en cruz son iguales: cuatro por equis es igual a seis por diez.'], [18.0, 26.4, 'Equis vale sesenta entre cuatro, quince. Se comprueba: diez a quince es dos a tres, igual que cuatro a seis.']] },
    { id: 'cadena', name: 'RAZONES ENCADENADAS', dur: 30,
      caps: [[0.8, 9.4, 'a / b = 2 / 3 y b / c = 4 / 5', 'b aparece en las dos'], [10.0, 19.4, 'Se iguala b', 'a : b : c = 8 : 12 : 15'], [20.0, 29.4, 'a / c = 8 / 15', 'o multiplicando: 2/3 · 4/5']],
      narr: [[0.8, 9.4, 'Si a es a b como dos es a tres, y b es a c como cuatro es a cinco, la letra b está en las dos razones.'], [10.0, 19.4, 'Se busca un valor de b que sirva a las dos: doce. Entonces a vale ocho y c vale quince.'], [20.0, 29.4, 'Así a es a c como ocho es a quince. Es lo mismo que multiplicar dos tercios por cuatro quintos.']] },
    { id: 'resolver', name: 'EL SALÓN, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Hombres 3k, mujeres 5k', 'con 6 más: (3k + 6) / 5k = 3 / 4'], [10.0, 19.4, '12k + 24 = 15k', 'k = 8'], [20.0, 29.4, 'Mujeres: 5 · 8 = 40', 'se comprueba: 30 : 40 = 3 : 4']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Hombres tres ka, mujeres cinco ka. Con seis hombres más, tres ka más seis sobre cinco ka es tres cuartos.'], [10.0, 19.4, 'Producto cruzado: doce ka más veinticuatro es igual a quince ka. Entonces tres ka son veinticuatro y ka vale ocho.'], [20.0, 29.4, 'Las mujeres son cinco por ocho, cuarenta. Había veinticuatro hombres; con seis más son treinta: treinta a cuarenta es tres a cuatro.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Hay 40 mujeres', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cuarenta mujeres. Una razón es un reparto en partes iguales.'], [11.0, 20.4, 'Contar partes, hallar cuánto vale una, cuidar las unidades en las escalas y cruzar productos en las proporciones.'], [21.0, 29.4, 'Una razón reparte en partes iguales.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 4', TITLE = 'RAZONES, REPARTOS Y ESCALAS', LINE = 'Una razón reparte en partes iguales.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-pr-1', KEYS: ['840000', '50000', '8/15', '2 : 3 : 5'] };
})();
if (typeof module !== 'undefined') module.exports = D;
