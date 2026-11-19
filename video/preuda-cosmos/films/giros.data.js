// «Giros, espejos y dobleces» · Preuniversitario, razonamiento lógico, mundo 6 (Razonamiento espacial), lección pu-es-4. Datos puros.
// Reto: un reloj de agujas visto en un espejo parece marcar las 8:25 (la hora real es 3:35). En medio: el espejo (misma
// distancia del otro lado), los ejes de simetría de las letras, los giros de 90° y 180°, girar no es reflejar, el reloj en el
// espejo (el 12 se queda, el 3 y el 9 se cambian: real + espejo = 12:00), cada doblez duplica las capas y la tira doblada
// cuatro veces (16 agujeros).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL RELOJ EN EL ESPEJO', dur: 30,
      caps: [[1.0, 9.4, 'Un reloj de agujas, sin números', 'se mira en un espejo'], [10.0, 19.4, 'En el espejo parece 8:25', 'las agujas se ven al revés'], [20.0, 29.4, 'Qué hora es en realidad', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un reloj de agujas, sin números, cuelga frente a un espejo.'], [10.0, 19.4, 'Quien mira el espejo cree ver las ocho y veinticinco. Pero en el espejo las agujas se ven al revés.'], [20.0, 29.4, 'Hay que hallar la hora real. Hay una regla muy sencilla para esto. Al final lo resolvemos.']] },
    { id: 'espejo', name: 'EL ESPEJO', dur: 30,
      caps: [[0.8, 9.4, 'Cada punto se refleja', 'a la misma distancia, del otro lado'], [10.0, 19.4, 'Un espejo vertical', 'cambia izquierda y derecha; arriba y abajo no'], [20.0, 29.4, 'Una flecha a la derecha', 'en el espejo apunta a la izquierda']],
      narr: [[0.8, 9.4, 'En un espejo, cada punto aparece del otro lado, a la misma distancia del espejo, como si se doblara la hoja.'], [10.0, 19.4, 'Un espejo vertical cambia la izquierda por la derecha, pero deja igual lo de arriba y lo de abajo.'], [20.0, 29.4, 'Por eso una flecha que apunta a la derecha, en el espejo apunta a la izquierda.']] },
    { id: 'eje', name: 'LETRAS SIMÉTRICAS', dur: 28,
      caps: [[0.8, 8.4, 'A, H, M, T, U, V, W, X, Y', 'iguales en un espejo vertical'], [9.0, 17.4, 'B, C, D, E, K', 'iguales en un espejo horizontal'], [18.0, 26.4, 'H, I, O, X', 'tienen los dos ejes']],
      narr: [[0.8, 8.4, 'Varias mayúsculas se ven igual en un espejo vertical: A, H, M, T, U, V, W, X y Y.'], [9.0, 17.4, 'Otras se ven igual en un espejo horizontal, puesto debajo: la B, la C, la D, la E y la K.'], [18.0, 26.4, 'Y la H, la I, la O y la X tienen los dos ejes de simetría.']] },
    { id: 'giro', name: 'GIRAR', dur: 28,
      caps: [[0.8, 8.4, 'Un giro de 90° a la derecha', 'arriba pasa a la derecha'], [9.0, 17.4, 'Dos giros de 90°: 180°', 'arriba pasa a abajo'], [18.0, 26.4, 'Cuatro giros: la figura vuelve', 'girar no cambia la forma']],
      narr: [[0.8, 8.4, 'Al girar una figura noventa grados en el sentido del reloj, lo que apuntaba arriba pasa a apuntar a la derecha.'], [9.0, 17.4, 'Dos giros de noventa son ciento ochenta: lo de arriba queda abajo y lo de la izquierda, a la derecha.'], [18.0, 26.4, 'Cuatro giros devuelven la figura a su posición. Girar no cambia la forma, solo hacia dónde mira.']] },
    { id: 'manos', name: 'GIRAR NO ES REFLEJAR', dur: 30,
      caps: [[0.8, 9.4, 'Una L y su reflejo', 'la L y la J de la misma forma'], [10.0, 19.4, 'Por más que se gire la L', 'nunca coincide con su reflejo'], [20.0, 29.4, 'Como la mano izquierda y la derecha', 'iguales, pero no se superponen']],
      narr: [[0.8, 9.4, 'Una L y su imagen en el espejo tienen la misma forma, pero la pata apunta hacia el otro lado.'], [10.0, 19.4, 'Por más que se gire la L sobre la mesa, nunca coincide con su reflejo: para lograrlo habría que darle la vuelta a la hoja.'], [20.0, 29.4, 'Pasa como con las manos: la izquierda y la derecha son iguales, pero no se pueden superponer.']] },
    { id: 'relojes', name: 'RELOJES EN EL ESPEJO', dur: 30,
      caps: [[0.8, 9.4, 'En el espejo, el 12 y el 6 se quedan', 'el 3 y el 9 se cambian de lado'], [10.0, 19.4, 'Cada aguja se refleja en la vertical', 'lo que en uno avanza, en el otro retrocede'], [20.0, 29.4, 'Real + espejo = 12:00', '2:10 en el espejo son las 9:50']],
      narr: [[0.8, 9.4, 'En un reloj visto en el espejo, el doce y el seis se quedan en su lugar, pero el tres y el nueve se cambian de lado.'], [10.0, 19.4, 'Cada aguja se refleja en la línea vertical: lo que en el reloj real avanza a la derecha, en el espejo avanza a la izquierda.'], [20.0, 29.4, 'Por eso la hora real y la del espejo suman doce. Si el espejo muestra las dos y diez, son las nueve y cincuenta.']] },
    { id: 'doblar', name: 'CADA DOBLEZ DUPLICA', dur: 28,
      caps: [[0.8, 8.4, 'Una hoja doblada por la mitad', 'queda con 2 capas'], [9.0, 17.4, 'Otro doblez: 4 capas', 'luego 8, 16…'], [18.0, 26.4, 'Un agujero atraviesa todas', 'un agujero por capa al desdoblar']],
      narr: [[0.8, 8.4, 'Una hoja doblada por la mitad queda con dos capas de papel.'], [9.0, 17.4, 'Si se dobla otra vez, quedan cuatro capas; otra vez, ocho; y así sigue duplicándose.'], [18.0, 26.4, 'Un agujero que atraviesa todas las capas deja, al desdoblar, un agujero por cada capa.']] },
    { id: 'tira', name: 'LA TIRA DOBLADA', dur: 30,
      caps: [[0.8, 9.4, 'Una tira se dobla por la mitad', 'cuatro veces seguidas'], [10.0, 19.4, '2 · 2 · 2 · 2 = 16 capas', 'cada doblez duplica'], [20.0, 29.4, 'Un agujero: 16 agujeros', 'al desdoblar la tira']],
      narr: [[0.8, 9.4, 'Otro problema: una tira de papel se dobla por la mitad cuatro veces seguidas, y se hace un agujero que atraviesa todas las capas.'], [10.0, 19.4, 'Cada doblez duplica las capas: dos, cuatro, ocho, dieciséis.'], [20.0, 29.4, 'Al desdoblarla aparecen dieciséis agujeros, uno por cada capa que atravesó.']] },
    { id: 'resolver', name: 'EL RELOJ, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Espejo: 8:25', 'se refleja cada aguja en la vertical'], [10.0, 19.4, '12:00 − 8:25 = 3:35', 'o 11:60 − 8:25'], [20.0, 29.4, 'Son las 3:35', 'la opción A']],
      narr: [[0.8, 9.4, 'Volvamos al reto. En el espejo se ven las ocho y veinticinco. Cada aguja se refleja en la línea vertical del reloj.'], [10.0, 19.4, 'La hora real es doce menos ocho y veinticinco. Para restar, se escribe doce como once y sesenta: once menos ocho, tres; sesenta menos veinticinco, treinta y cinco.'], [20.0, 29.4, 'Son las tres y treinta y cinco. Se comprueba: tres y treinta y cinco más ocho y veinticinco dan doce.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Son las 3:35', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: las tres y treinta y cinco. Real más espejo, doce.'], [11.0, 20.4, 'El espejo cambia izquierda y derecha, girar no es reflejar, y cada doblez duplica las capas.'], [21.0, 29.4, 'Real más espejo: las doce.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 6', TITLE = 'GIROS, ESPEJOS Y DOBLECES', LINE = 'Real más espejo: las doce.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-es-4', KEYS: ['8:25', '3:35', 'tira', '16'] };
})();
if (typeof module !== 'undefined') module.exports = D;
