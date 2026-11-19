// «Fracciones de lo que queda» · Preuniversitario, razonamiento lógico, mundo 12 (Aritmética), lección pu-ar-1. Datos puros.
// Reto: el testamento (la mitad a la esposa, un tercio de lo restante al hijo mayor y lo que queda en partes iguales a dos hijas; cada
// hija recibe 6 millones) → 36 millones. En medio: «de qué» (12 cuadros: un tercio del total y la mitad de lo que queda), lo que queda
// se multiplica (2/3 · 1/2 = 1/3), la tela (vende 2/5 y luego 1/3 del resto; sobran 24 m → 60 m), ir hacia atrás (Julián: 1/3 y luego
// 1/4 del resto; le quedan 30 000 → 60 000), la biblioteca (25 % en inglés; 30 % del español son novelas; 420 → 200 en inglés), el error
// de restar fracciones de totales distintos y comprobar hacia adelante.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL TESTAMENTO', dur: 30,
      caps: [[1.0, 9.4, 'La mitad a la esposa', 'la tercera parte de lo restante al hijo mayor'], [10.0, 19.4, 'Lo que queda, igual para dos hijas', 'cada hija recibió 6 millones'], [20.0, 29.4, 'Cuánto eran los ahorros', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En su testamento, un señor dejó la mitad de sus ahorros a su esposa y un tercio de lo restante a su hijo mayor.'], [10.0, 19.4, 'Lo que quedaba se repartió en partes iguales entre sus dos hijas, y cada una recibió seis millones de pesos.'], [20.0, 29.4, 'Hay que hallar el total de los ahorros. Al final lo resolvemos.']] },
    { id: 'deque', name: 'FRACCIÓN DE QUÉ', dur: 28,
      caps: [[0.8, 8.4, 'Una barra de 12 cuadros', 'se gasta un tercio del total: 4'], [9.0, 17.4, 'Luego, la mitad de lo que queda', 'la mitad de 8, no de 12: otros 4'], [18.0, 26.4, 'Cada fracción tiene su total', 'el total, o lo que queda en ese momento']],
      narr: [[0.8, 8.4, 'Una barra de doce cuadros. Primero se gasta un tercio del total: cuatro cuadros.'], [9.0, 17.4, 'Después se gasta la mitad de lo que queda. Quedan ocho, así que la mitad son cuatro, no seis.'], [18.0, 26.4, 'Cada fracción tiene su propio total: a veces es todo, y a veces es solo lo que queda en ese momento.']] },
    { id: 'multiplicar', name: 'LO QUE QUEDA SE MULTIPLICA', dur: 28,
      caps: [[0.8, 8.4, 'Gastar 1/3 deja 2/3', 'se mira lo que queda, no lo gastado'], [9.0, 17.4, 'Gastar 1/2 de eso deja 1/2 de 2/3', '2/3 · 1/2 = 1/3'], [18.0, 26.4, 'Queda un tercio del total', 'los 4 cuadros que sobran de 12']],
      narr: [[0.8, 8.4, 'El truco es mirar lo que queda, no lo que se gasta. Gastar un tercio deja dos tercios.'], [9.0, 17.4, 'Gastar la mitad de eso deja la mitad de dos tercios: dos tercios por un medio, un tercio.'], [18.0, 26.4, 'Queda un tercio del total: los cuatro cuadros de doce que sobran en la barra.']] },
    { id: 'tela', name: 'LA PIEZA DE TELA', dur: 30,
      caps: [[0.8, 9.4, 'Vende 2/5 de la tela', 'y luego 1/3 de lo que queda'], [10.0, 19.4, 'Queda 3/5 · 2/3 = 2/5', 'y eso son 24 metros'], [20.0, 29.4, '2/5 de la pieza = 24 m', 'la pieza medía 60 m']],
      narr: [[0.8, 9.4, 'Otro problema: un comerciante vendió dos quintos de una pieza de tela, y después la tercera parte de lo que le quedaba. Le sobraron veinticuatro metros.'], [10.0, 19.4, 'Vender dos quintos deja tres quintos; vender un tercio de eso deja dos tercios. Tres quintos por dos tercios: dos quintos.'], [20.0, 29.4, 'Dos quintos de la pieza son veinticuatro metros: un quinto son doce, y la pieza medía sesenta.']] },
    { id: 'atras', name: 'HACIA ATRÁS', dur: 28,
      caps: [[0.8, 8.4, 'Julián: 1/3 en un libro', 'y 1/4 de lo que le queda en almuerzo'], [9.0, 17.4, 'Queda 2/3 · 3/4 = 1/2', 'y le quedan 30 000'], [18.0, 26.4, 'Si la mitad es 30 000', 'tenía 60 000']],
      narr: [[0.8, 8.4, 'Lo mismo sirve hacia atrás. Julián gastó un tercio de su dinero en un libro, y un cuarto de lo que le quedaba en almuerzo.'], [9.0, 17.4, 'Le queda dos tercios por tres cuartos: la mitad. Y esa mitad son treinta mil pesos.'], [18.0, 26.4, 'Si la mitad son treinta mil, al comienzo tenía sesenta mil. Se divide entre la fracción que queda.']] },
    { id: 'biblioteca', name: 'LA BIBLIOTECA', dur: 30,
      caps: [[0.8, 9.4, '25 % en inglés, el resto en español', 'del español, el 30 % son novelas'], [10.0, 19.4, '420 = 70 % del español', 'en español hay 600 libros'], [20.0, 29.4, '600 son el 75 % del total: 800', 'en inglés hay 200']],
      narr: [[0.8, 9.4, 'Otro problema: en una biblioteca, un cuarto de los libros está en inglés y el resto en español. Del español, el treinta por ciento son novelas; cuatrocientos veinte no.'], [10.0, 19.4, 'Esos cuatrocientos veinte son el setenta por ciento del español: el español tiene seiscientos libros.'], [20.0, 29.4, 'Seiscientos son el setenta y cinco por ciento del total, que es ochocientos. En inglés hay doscientos.']] },
    { id: 'error', name: 'EL ERROR DE RESTAR', dur: 28,
      caps: [[0.8, 8.4, '1 − 1/3 − 1/4 no sirve', 'el 1/4 no es del total'], [9.0, 17.4, 'Daría 5/12 y no 1/2', 'se pierde la parte del cuarto que no se gastó'], [18.0, 26.4, 'Solo se restan fracciones', 'cuando son del mismo total']],
      narr: [[0.8, 8.4, 'Un error muy común: restar uno menos un tercio menos un cuarto. No sirve, porque ese cuarto no es del total.'], [9.0, 17.4, 'Daría cinco doceavos en lugar de un medio: el cuarto se calculó sobre lo que quedaba, que era menos.'], [18.0, 26.4, 'Las fracciones solo se restan cuando son del mismo total. Si no, se multiplica lo que queda.']] },
    { id: 'comprobar', name: 'COMPROBAR HACIA ADELANTE', dur: 28,
      caps: [[0.8, 8.4, 'La tela: 60 m', 'vende 2/5: 24 m; quedan 36'], [9.0, 17.4, 'Vende 1/3 de 36: 12', 'quedan 24 m'], [18.0, 26.4, 'Coincide con el enunciado', 'la respuesta queda comprobada']],
      narr: [[0.8, 8.4, 'Una buena costumbre es comprobar hacia adelante. Con sesenta metros: vender dos quintos son veinticuatro, y quedan treinta y seis.'], [9.0, 17.4, 'Un tercio de treinta y seis son doce. Quedan veinticuatro metros.'], [18.0, 26.4, 'Es lo que decía el enunciado: la respuesta está comprobada.']] },
    { id: 'resolver', name: 'EL TESTAMENTO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Esposa 1/2: queda 1/2', 'hijo 1/3 de 1/2 = 1/6: queda 1/3'], [10.0, 19.4, 'Cada hija, la mitad de 1/3', '1/6 del total = 6 millones'], [20.0, 29.4, 'El total: 6 · 6 = 36 millones', '18 + 6 + 6 + 6 = 36']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La esposa recibe la mitad y queda la mitad. El hijo, un tercio de esa mitad: un sexto del total. Queda un tercio.'], [10.0, 19.4, 'Las hijas se reparten ese tercio: cada una recibe un sexto del total, y un sexto son seis millones.'], [20.0, 29.4, 'El total son seis veces seis: treinta y seis millones. Dieciocho, seis, seis y seis suman treinta y seis.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Los ahorros: 36 millones', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: treinta y seis millones.'], [11.0, 20.4, 'Cada fracción con su total, lo que queda se multiplica, hacia atrás se divide, y siempre se comprueba hacia adelante.'], [21.0, 29.4, 'Mira siempre lo que queda.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 12', TITLE = 'LO QUE QUEDA', LINE = 'Mira siempre lo que queda.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ar-1', KEYS: ['testamento', 'comerciante', 'biblioteca', '420'] };
})();
if (typeof module !== 'undefined') module.exports = D;
