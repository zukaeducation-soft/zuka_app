// «Aumentos, descuentos e IVA» · Preuniversitario, razonamiento lógico, mundo 4 (Proporcionalidad), lección pu-pr-5. Datos puros.
// Reto: el salario de Rosa (tras un aumento del 8 % quedó en 1 620 000 → antes 1 500 000). En medio: cada cambio es un factor,
// volver atrás se divide (restar el 8 % da la trampa 1 490 400), el IVA (595 000 con IVA → 500 000), subir 20 % y bajar 20 %
// (−4 %), dos aumentos (+10 % y +20 % = +32 %), la ganancia del comerciante (80 000, +25 %, −10 % → 12.5 %) y el interés compuesto.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL SALARIO DE ROSA', dur: 30,
      caps: [[1.0, 9.4, 'Un aumento del 8 %', 'el salario quedó en 1 620 000'], [10.0, 19.4, 'Cuánto ganaba antes', 'el 8 % se calculó sobre el salario viejo'], [20.0, 29.4, 'Cuatro opciones muy parecidas', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Después de un aumento del ocho por ciento, el salario de Rosa quedó en un millón seiscientos veinte mil pesos.'], [10.0, 19.4, 'Hay que hallar cuánto ganaba antes del aumento. El ocho por ciento se calculó sobre el salario viejo, que no conocemos.'], [20.0, 29.4, 'Las opciones están muy cerca entre sí: una es justamente la trampa. Al final lo resolvemos.']] },
    { id: 'factor', name: 'CADA CAMBIO, UN FACTOR', dur: 28,
      caps: [[0.8, 8.4, 'Subir 8 %: quedar con el 108 %', 'multiplicar por 1.08'], [9.0, 17.4, 'Bajar 8 %: quedar con el 92 %', 'multiplicar por 0.92'], [18.0, 26.4, 'El factor sale de 100 % ± el cambio', 'un solo paso, sin calcular el porcentaje aparte']],
      narr: [[0.8, 8.4, 'Subir un ocho por ciento es quedarse con el ciento ocho por ciento: multiplicar por uno coma cero ocho.'], [9.0, 17.4, 'Bajar un ocho por ciento es quedarse con el noventa y dos: multiplicar por cero coma noventa y dos.'], [18.0, 26.4, 'El factor sale de sumar o restar el cambio al cien por ciento. Así el cálculo es un solo paso.']] },
    { id: 'reves', name: 'VOLVER ATRÁS', dur: 30,
      caps: [[0.8, 9.4, 'Para volver se divide', 'precio nuevo ÷ factor'], [10.0, 19.4, 'Restar el 8 % no devuelve', 'el 8 % del nuevo es más que el 8 % del viejo'], [20.0, 29.4, 'La trampa: 1 490 400', 'el camino: 1 620 000 ÷ 1.08']],
      narr: [[0.8, 9.4, 'Si para subir se multiplicó por un factor, para volver al precio de antes se divide entre el mismo factor.'], [10.0, 19.4, 'Restar el ocho por ciento al valor nuevo no sirve: el ocho por ciento del nuevo es más grande que el ocho por ciento del viejo.'], [20.0, 29.4, 'Por eso una de las opciones es un millón cuatrocientos noventa mil cuatrocientos: es lo que da la resta, y está mal.']] },
    { id: 'iva', name: 'EL IVA', dur: 30,
      caps: [[0.8, 9.4, 'IVA del 19 %', 'precio con IVA = precio · 1.19'], [10.0, 19.4, 'Un artículo cuesta 595 000 con IVA', 'el precio sin IVA se halla dividiendo'], [20.0, 29.4, '595 000 ÷ 1.19 = 500 000', 'el IVA fue de 95 000']],
      narr: [[0.8, 9.4, 'El IVA del diecinueve por ciento se suma al precio: el precio con IVA es el precio por uno coma diecinueve.'], [10.0, 19.4, 'Si un artículo cuesta quinientos noventa y cinco mil con IVA incluido, el precio sin IVA se halla dividiendo.'], [20.0, 29.4, 'Quinientos noventa y cinco mil entre uno coma diecinueve: quinientos mil. El IVA fue de noventa y cinco mil.']] },
    { id: 'subebaja', name: 'SUBE 20 %, BAJA 20 %', dur: 30,
      caps: [[0.8, 9.4, 'Sube 20 % y luego baja 20 %', 'no vuelve al precio inicial'], [10.0, 19.4, '1.2 · 0.8 = 0.96', 'el segundo 20 % es de un precio mayor'], [20.0, 29.4, 'Disminuyó un 4 %', '100 → 120 → 96']],
      narr: [[0.8, 9.4, 'Otro problema: un precio aumentó un veinte por ciento y, un mes después, bajó un veinte por ciento. Hay que decir cómo quedó.'], [10.0, 19.4, 'Los factores se multiplican: uno coma dos por cero coma ocho, cero coma noventa y seis. La bajada se calcula sobre un precio más alto.'], [20.0, 29.4, 'Un precio de cien sube a ciento veinte y baja a noventa y seis: disminuyó un cuatro por ciento.']] },
    { id: 'sucesivos', name: 'DOS AUMENTOS', dur: 28,
      caps: [[0.8, 8.4, 'Sube 10 % y luego 20 %', 'no es 30 %'], [9.0, 17.4, '1.1 · 1.2 = 1.32', 'el segundo aumento crece sobre el primero'], [18.0, 26.4, 'Aumento total: 32 %', 'los cambios seguidos se multiplican']],
      narr: [[0.8, 8.4, 'Un precio sube un diez por ciento un año y un veinte por ciento al siguiente. El aumento total no es treinta.'], [9.0, 17.4, 'Uno coma uno por uno coma dos da uno coma treinta y dos: el veinte por ciento se aplica sobre un precio que ya había subido.'], [18.0, 26.4, 'El aumento total es del treinta y dos por ciento. Los cambios seguidos se multiplican, no se suman.']] },
    { id: 'ganancia', name: 'LA GANANCIA DEL COMERCIANTE', dur: 30,
      caps: [[0.8, 9.4, 'Compra en 80 000, quiere ganar 25 %', 'luego hace un descuento del 10 %'], [10.0, 19.4, '80 000 · 1.25 = 100 000', 'con descuento: 100 000 · 0.9 = 90 000'], [20.0, 29.4, 'Gana 10 000 sobre 80 000', 'un 12.5 % del costo']],
      narr: [[0.8, 9.4, 'Otro problema: un comerciante compra un artículo en ochenta mil y fija un precio para ganar el veinticinco por ciento. Luego hace un descuento del diez por ciento.'], [10.0, 19.4, 'El precio fijado es ochenta mil por uno coma veinticinco: cien mil. Con el descuento lo vende en noventa mil.'], [20.0, 29.4, 'Gana diez mil sobre un costo de ochenta mil: un doce coma cinco por ciento. Cada porcentaje tiene su propia base.']] },
    { id: 'compuesto', name: 'INTERÉS COMPUESTO', dur: 28,
      caps: [[0.8, 8.4, '1 000 000 al 10 % anual', 'el interés se suma al capital'], [9.0, 17.4, 'Cada año, por 1.1', '1 100 000 → 1 210 000 → 1 331 000'], [18.0, 26.4, '3 años: 1.1³ = 1.331', 'no 1 300 000: el interés gana interés']],
      narr: [[0.8, 8.4, 'Un millón al diez por ciento anual, con interés compuesto: cada año el interés se suma al capital.'], [9.0, 17.4, 'Cada año se multiplica por uno coma uno: un millón cien mil, un millón doscientos diez mil, un millón trescientos treinta y un mil.'], [18.0, 26.4, 'En tres años, uno coma uno al cubo: uno coma trescientos treinta y uno. El interés también gana interés.']] },
    { id: 'resolver', name: 'EL SALARIO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Salario viejo · 1.08 = 1 620 000', 'se deshace dividiendo'], [10.0, 19.4, '1 620 000 ÷ 1.08 = 1 500 000', 'el aumento fue de 120 000'], [20.0, 29.4, 'Se comprueba: 8 % de 1 500 000', 'es 120 000, y 1 500 000 + 120 000 = 1 620 000']],
      narr: [[0.8, 9.4, 'Volvamos al reto. El salario viejo multiplicado por uno coma cero ocho dio un millón seiscientos veinte mil.'], [10.0, 19.4, 'Se divide entre uno coma cero ocho: un millón quinientos mil. El aumento fue de ciento veinte mil.'], [20.0, 29.4, 'Se comprueba: el ocho por ciento de un millón quinientos mil son ciento veinte mil, y sumados dan el salario nuevo.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Ganaba 1 500 000', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: un millón quinientos mil. Para deshacer un aumento se divide entre el factor.'], [11.0, 20.4, 'Cada cambio es un factor; los cambios seguidos se multiplican; y cada porcentaje se calcula sobre su propia base.'], [21.0, 29.4, 'Subir es multiplicar; deshacer es dividir.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 4', TITLE = 'AUMENTOS, DESCUENTOS E IVA', LINE = 'Subir es multiplicar; deshacer es dividir.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-pr-5', KEYS: ['1620000', '1.08', '12.5', '595000', '1.331'] };
})();
if (typeof module !== 'undefined') module.exports = D;
