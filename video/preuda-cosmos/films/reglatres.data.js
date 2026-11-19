// «Regla de tres simple y compuesta» · Preuniversitario, razonamiento lógico, mundo 4, lección pu-pr-2. Datos puros.
// Reto: seis obreros terminan una obra en 12 días; a los 4 días se retiran 2 (la obra dura 16 días). En medio: directa (la
// receta: 12 galletas con 200 g → 30 con 500 g), inversa (3 pintores en 8 días = 4 en 6), cómo distinguirlas, las ocho
// llaves (8 en 15 h → 12 en 10 h), el trabajo en jornadas, la compuesta (4 máquinas, 600 piezas, 5 h → 6 máquinas, 8 h:
// 1 440) y reducir a la unidad.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LOS OBREROS QUE SE VAN', dur: 30,
      caps: [[1.0, 9.4, 'Seis obreros, doce días', 'todos trabajan al mismo ritmo'], [10.0, 19.4, 'A los 4 días se retiran 2', 'los otros cuatro terminan solos'], [20.0, 29.4, 'Cuántos días duró la obra', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Seis obreros, todos al mismo ritmo, pueden terminar una obra en doce días.'], [10.0, 19.4, 'Después de cuatro días de trabajo se retiran dos obreros, y los otros cuatro siguen hasta terminar.'], [20.0, 29.4, 'Hay que hallar cuántos días duró la obra en total. La clave es medir el trabajo. Al final lo resolvemos.']] },
    { id: 'directa', name: 'DIRECTA', dur: 28,
      caps: [[0.8, 8.4, '12 galletas con 200 g de harina', 'para 30 galletas'], [9.0, 17.4, 'Más galletas, más harina', 'en la misma proporción'], [18.0, 26.4, '200 ÷ 12 · 30 = 500 g', 'el cociente se mantiene']],
      narr: [[0.8, 8.4, 'Una receta da doce galletas con doscientos gramos de harina. Se quieren treinta galletas.'], [9.0, 17.4, 'Si se hacen el doble de galletas, se necesita el doble de harina: crecen juntas. Eso es una proporción directa.'], [18.0, 26.4, 'Treinta es dos veces y media doce: se usan dos veces y media doscientos, quinientos gramos. Harina entre galletas no cambia.']] },
    { id: 'inversa', name: 'INVERSA', dur: 28,
      caps: [[0.8, 8.4, '3 pintores tardan 8 días', 'con 4 pintores'], [9.0, 17.4, 'Más pintores, menos días', 'el trabajo total es el mismo'], [18.0, 26.4, '3 · 8 = 24 = 4 · 6', 'el producto se mantiene: 6 días']],
      narr: [[0.8, 8.4, 'Tres pintores pintan una casa en ocho días. Con cuatro pintores, al mismo ritmo, cambia el tiempo.'], [9.0, 17.4, 'Más pintores terminan en menos días: una crece y la otra decrece. Es una proporción inversa.'], [18.0, 26.4, 'El trabajo total son tres por ocho, veinticuatro días de pintor. Con cuatro pintores son veinticuatro entre cuatro: seis días.']] },
    { id: 'cual', name: 'DIRECTA O INVERSA', dur: 28,
      caps: [[0.8, 8.4, 'La pregunta clave', 'si una se duplica, qué le pasa a la otra'], [9.0, 17.4, 'Se duplica: directa', 'kilos y precio, galletas y harina'], [18.0, 26.4, 'Se reduce a la mitad: inversa', 'obreros y días, velocidad y tiempo']],
      narr: [[0.8, 8.4, 'Para saber cuál es, se pregunta: si una cantidad se duplica, qué le pasa a la otra.'], [9.0, 17.4, 'Si también se duplica, es directa: más kilos, más precio; más galletas, más harina.'], [18.0, 26.4, 'Si se reduce a la mitad, es inversa: más obreros, menos días; más velocidad, menos tiempo para el mismo camino.']] },
    { id: 'llaves', name: 'LAS OCHO LLAVES', dur: 30,
      caps: [[0.8, 9.4, '8 llaves llenan la piscina en 15 h', 'con 12 llaves iguales'], [10.0, 19.4, 'Más llaves, menos horas', 'inversa: 8 · 15 = 120 horas-llave'], [20.0, 29.4, '120 ÷ 12 = 10 horas', 'no 22.5: esa sería la directa']],
      narr: [[0.8, 9.4, 'Otro problema: ocho llaves iguales llenan una piscina en quince horas. Hay que hallar cuánto tardan doce llaves.'], [10.0, 19.4, 'Con más llaves se llena antes: es inversa. El trabajo total son ocho por quince, ciento veinte horas de llave.'], [20.0, 29.4, 'Con doce llaves: ciento veinte entre doce, diez horas. Si se hiciera como directa saldría veintidós y media, que es la trampa.']] },
    { id: 'jornadas', name: 'MEDIR EL TRABAJO', dur: 28,
      caps: [[0.8, 8.4, 'Trabajo = trabajadores · tiempo', 'una casilla por obrero y por día'], [9.0, 17.4, 'Una obra de 72 jornadas', '6 obreros en 12 días'], [18.0, 26.4, 'Si cambia la gente a mitad', 'se resta lo hecho y se reparte lo que falta']],
      narr: [[0.8, 8.4, 'El trabajo se puede medir en jornadas: una casilla por cada obrero y cada día que trabaja.'], [9.0, 17.4, 'Seis obreros durante doce días llenan setenta y dos casillas: la obra completa son setenta y dos jornadas.'], [18.0, 26.4, 'Si la gente cambia a mitad de camino, se cuenta lo que ya se hizo, se resta y se reparte lo que falta entre los que quedan.']] },
    { id: 'compuesta', name: 'LA REGLA DE TRES COMPUESTA', dur: 30,
      caps: [[0.8, 9.4, '4 máquinas: 600 piezas en 5 h', 'cuántas hacen 6 máquinas en 8 h'], [10.0, 19.4, 'Reducir a una máquina y una hora', '600 ÷ 4 ÷ 5 = 30 piezas'], [20.0, 29.4, '30 · 6 · 8 = 1 440', 'más máquinas y más horas: más piezas']],
      narr: [[0.8, 9.4, 'Otro problema: cuatro máquinas iguales producen seiscientas piezas en cinco horas. Hay que saber cuántas producen seis máquinas en ocho horas.'], [10.0, 19.4, 'Se reduce a la unidad: una máquina en una hora hace seiscientas entre cuatro entre cinco, treinta piezas.'], [20.0, 29.4, 'Seis máquinas durante ocho horas hacen treinta por seis por ocho: mil cuatrocientas cuarenta piezas.']] },
    { id: 'unidad', name: 'PASAR POR LA UNIDAD', dur: 28,
      caps: [[0.8, 8.4, 'Siempre funciona', 'cuánto hace uno, en una unidad de tiempo'], [9.0, 17.4, 'Luego se multiplica', 'por lo que pide la pregunta'], [18.0, 26.4, 'Revisar el sentido', 'el resultado debe crecer o bajar como se espera']],
      narr: [[0.8, 8.4, 'Un camino que siempre funciona es pasar por la unidad: cuánto hace un trabajador, una máquina o una llave en una unidad de tiempo.'], [9.0, 17.4, 'Después se multiplica por los trabajadores y el tiempo que pide la pregunta.'], [18.0, 26.4, 'Al final se revisa el sentido: con más máquinas y más horas el resultado tiene que crecer.']] },
    { id: 'resolver', name: 'LOS OBREROS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, 'La obra: 6 · 12 = 72 jornadas', 'en 4 días se hacen 6 · 4 = 24'], [10.0, 19.4, 'Faltan 72 − 24 = 48 jornadas', 'ahora trabajan 4 obreros'], [20.0, 29.4, '48 ÷ 4 = 12 días más', 'en total, 4 + 12 = 16 días']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La obra completa son seis por doce, setenta y dos jornadas. En los primeros cuatro días se hacen veinticuatro.'], [10.0, 19.4, 'Faltan cuarenta y ocho jornadas, y ahora solo trabajan cuatro obreros.'], [20.0, 29.4, 'Cuarenta y ocho entre cuatro son doce días más. La obra dura cuatro más doce: dieciséis días.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'La obra duró 16 días', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: dieciséis días. Medir el trabajo en jornadas lo vuelve una resta y una división.'], [11.0, 20.4, 'Directa: el cociente se mantiene. Inversa: el producto se mantiene. Compuesta: pasar por la unidad.'], [21.0, 29.4, 'Directa: el cociente no cambia; inversa: el producto no cambia.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 4', TITLE = 'REGLA DE TRES', LINE = 'Directa: cociente fijo; inversa: producto fijo.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-pr-2', KEYS: ['1440', '72', '22.5', 'galletas'] };
})();
if (typeof module !== 'undefined') module.exports = D;
