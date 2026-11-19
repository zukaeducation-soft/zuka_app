// «Conectivos y tablas de verdad» · Preuniversitario, razonamiento lógico, mundo 10 (Lógica), lección pu-lo-1. Datos puros.
// Reto: un circuito de bits con los dispositivos Y, O y N (x, y entran a un Y; z a un N; las dos salidas a un O); si la salida es
// 0, lo único seguro es que z vale 1. En medio: qué es una proposición, el «y», el «o», la tabla de verdad, la negación, el objeto
// (negro o rojo, si es rojo es lapicero, si es lapicero es azul: es un marcador negro) y el número del que solo una de tres
// afirmaciones es cierta (9).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL CIRCUITO DE BITS', dur: 30,
      caps: [[1.0, 9.4, 'Tres dispositivos: Y, O y N', 'trabajan con bits, 0 y 1'], [10.0, 19.4, 'x y y van a un Y; z va a un N', 'las dos salidas entran a un O'], [20.0, 29.4, 'La salida del circuito es 0', 'qué se sabe con certeza']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un circuito trabaja con bits, ceros y unos, y tiene tres clases de dispositivos: Y, O y N.'], [10.0, 19.4, 'Las entradas x y y llegan a un Y; la entrada z llega a un N; y las dos salidas entran a un O.'], [20.0, 29.4, 'La salida del circuito es cero. Hay que decir qué se sabe con certeza. Al final lo resolvemos.']] },
    { id: 'proposicion', name: 'QUÉ ES UNA PROPOSICIÓN', dur: 28,
      caps: [[0.8, 8.4, 'Una frase que es verdadera o falsa', 'Medellín está en Antioquia: V'], [9.0, 17.4, 'También cuenta si es falsa', '2 + 2 = 5 es una proposición: F'], [18.0, 26.4, 'Preguntas y órdenes no lo son', 'no tienen valor de verdad']],
      narr: [[0.8, 8.4, 'Una proposición es una frase que es verdadera o falsa. Medellín está en Antioquia: verdadera.'], [9.0, 17.4, 'Dos más dos es cinco también es una proposición: es falsa, pero tiene un valor de verdad.'], [18.0, 26.4, 'Una pregunta o una orden, como cierra la puerta, no es verdadera ni falsa: no es una proposición.']] },
    { id: 'conj', name: 'EL «Y»', dur: 28,
      caps: [[0.8, 8.4, 'p ∧ q: «y»', 'verdadera solo si las dos lo son'], [9.0, 17.4, 'Dos interruptores en fila', 'la luz pide los dos cerrados'], [18.0, 26.4, 'Una sola falsa la tumba', 'V y F da F']],
      narr: [[0.8, 8.4, 'El conectivo y une dos proposiciones. P y q es verdadera solo cuando las dos son verdaderas.'], [9.0, 17.4, 'Es como dos interruptores en fila: la luz prende solo si los dos están cerrados.'], [18.0, 26.4, 'Basta que una sea falsa para que todo el y sea falso.']] },
    { id: 'disy', name: 'EL «O»', dur: 28,
      caps: [[0.8, 8.4, 'p ∨ q: «o»', 'verdadera si al menos una lo es'], [9.0, 17.4, 'Dos interruptores lado a lado', 'la luz prende con cualquiera'], [18.0, 26.4, 'Solo falla si las dos fallan', 'y vale también si son las dos']],
      narr: [[0.8, 8.4, 'El conectivo o es verdadero si al menos una de las dos partes lo es.'], [9.0, 17.4, 'Es como dos interruptores lado a lado: la luz prende con cualquiera de los dos.'], [18.0, 26.4, 'Solo es falso cuando las dos partes son falsas. Y en lógica, el o incluye el caso de las dos.']] },
    { id: 'tabla', name: 'LA TABLA DE VERDAD', dur: 28,
      caps: [[0.8, 8.4, 'Todas las combinaciones de p y q', '2 · 2 = 4 filas'], [9.0, 17.4, 'La columna del «y»', 'V solo en la primera fila'], [18.0, 26.4, 'La columna del «o»', 'F solo en la última']],
      narr: [[0.8, 8.4, 'La tabla de verdad prueba todas las combinaciones: p puede ser verdadera o falsa, y q también. Son cuatro filas.'], [9.0, 17.4, 'En la columna del y, solo la primera fila, verdadera y verdadera, da verdadero.'], [18.0, 26.4, 'En la columna del o pasa lo contrario: solo la última fila, falsa y falsa, da falso.']] },
    { id: 'neg', name: 'LA NEGACIÓN', dur: 28,
      caps: [[0.8, 8.4, '¬p cambia el valor de verdad', 'V pasa a F y F pasa a V'], [9.0, 17.4, 'En bits: el N cambia 0 por 1', 'y 1 por 0'], [18.0, 26.4, 'Y es un «y», O es un «o»', '1 es verdadero, 0 es falso']],
      narr: [[0.8, 8.4, 'La negación cambia el valor de verdad: si p es verdadera, no p es falsa, y al revés.'], [9.0, 17.4, 'Con bits pasa igual: el dispositivo N cambia el cero por uno y el uno por cero.'], [18.0, 26.4, 'Y el dispositivo Y es un y, y el O es un o. Basta leer uno como verdadero y cero como falso.']] },
    { id: 'objeto', name: 'EL OBJETO MISTERIOSO', dur: 30,
      caps: [[0.8, 9.4, 'Es negro o es rojo', 'si es rojo, es un lapicero'], [10.0, 19.4, 'Si fuera rojo, sería lapicero', 'y todo lapicero es azul: choca'], [20.0, 29.4, 'Es negro, y si es negro es marcador', 'un marcador negro']],
      narr: [[0.8, 9.4, 'Otro problema. De un objeto se sabe: es negro o es rojo; si es rojo, es un lapicero; si es lapicero, es azul; si es negro, es un marcador.'], [10.0, 19.4, 'Si fuera rojo, sería un lapicero, y entonces sería azul. Pero no puede ser rojo y azul a la vez.'], [20.0, 29.4, 'Así que el o se cumple por el otro lado: es negro, y por eso es un marcador. Un marcador negro.']] },
    { id: 'tres', name: 'SOLO UNA ES CIERTA', dur: 30,
      caps: [[0.8, 9.4, 'Par · múltiplo de 3 · mayor que 10', 'de las tres, exactamente una es verdadera'], [10.0, 19.4, '6: par y múltiplo de 3, dos', '12: las tres · 14: par y mayor que 10'], [20.0, 29.4, '9: solo múltiplo de 3', 'el número puede ser 9']],
      narr: [[0.8, 9.4, 'Otro problema: de un número se dice que es par, que es múltiplo de tres y que es mayor que diez. Exactamente una de las tres es verdadera.'], [10.0, 19.4, 'Se prueba cada opción. Seis cumple dos; doce cumple las tres; catorce cumple dos.'], [20.0, 29.4, 'Nueve solo es múltiplo de tres: una verdadera y dos falsas. El número puede ser nueve.']] },
    { id: 'resolver', name: 'EL CIRCUITO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'El O dio 0: sus dos entradas son 0', 'un «o» solo falla así'], [10.0, 19.4, 'El N dio 0: entonces z = 1', 'esto es seguro'], [20.0, 29.4, 'El Y dio 0: x o y es 0', 'pero no se sabe cuál']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La salida del O es cero, y un o solo da cero cuando sus dos entradas son cero.'], [10.0, 19.4, 'La salida del N es cero, así que lo que entró al N era uno: z vale uno. Esto es seguro.'], [20.0, 29.4, 'La salida del Y también es cero: al menos una de x y y es cero, pero no se sabe cuál.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Lo seguro: z vale 1', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: z vale uno. Lo demás puede ser o no.'], [11.0, 20.4, 'El y pide las dos verdaderas, el o solo falla con las dos falsas, la negación invierte, y la tabla prueba todas las combinaciones.'], [21.0, 29.4, 'Cada conectivo tiene su regla: basta aplicarla caso por caso.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 10', TITLE = 'CONECTIVOS Y TABLAS', LINE = 'Cada conectivo tiene su regla.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-lo-1', KEYS: ['marcador', 'lapicero', 'Antioquia'] };
})();
if (typeof module !== 'undefined') module.exports = D;
