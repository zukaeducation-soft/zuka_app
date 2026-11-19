// «Negación y De Morgan» · Preuniversitario, razonamiento lógico, mundo 10 (Lógica), lección pu-lo-2. Datos puros.
// Reto: negar «en todos los salones hay algún estudiante que usa gafas» → «en algún salón ningún estudiante usa gafas». En medio:
// negar no es decir lo opuesto (caliente / frío), De Morgan con el «y» (Juan alto y rubio → no alto o no rubio), con el «o» (cine o
// teatro → ni cine ni teatro), «no todos» = «alguno no» (los pájaros), «alguno» se niega con «ninguno» (llegar tarde) y las frases
// anidadas (cada estudiante entregó por lo menos cuatro tareas → alguno entregó menos de cuatro).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LOS SALONES Y LAS GAFAS', dur: 30,
      caps: [[1.0, 9.4, 'En todos los salones', 'hay algún estudiante que usa gafas'], [10.0, 19.4, 'Hay que escribir su negación', 'lo que la hace falsa, ni más ni menos'], [20.0, 29.4, 'Dos palabras para negar', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. La frase dice: en todos los salones hay algún estudiante que usa gafas.'], [10.0, 19.4, 'Hay que escribir su negación: la frase que es verdadera justo cuando la original es falsa.'], [20.0, 29.4, 'La frase tiene dos palabras que mandan, todos y algún, y las dos cambian al negar. Al final lo resolvemos.']] },
    { id: 'opuesto', name: 'NEGAR NO ES LO OPUESTO', dur: 28,
      caps: [[0.8, 8.4, 'Negar: lo que pasa si la frase falla', 'ni más ni menos'], [9.0, 17.4, '«El café está caliente»', 'su negación: «no está caliente»'], [18.0, 26.4, '«Está frío» se pasa de largo', 'el café tibio también la niega']],
      narr: [[0.8, 8.4, 'Negar una frase es decir exactamente lo que pasa cuando la frase falla. Ni más ni menos.'], [9.0, 17.4, 'La negación de el café está caliente es el café no está caliente.'], [18.0, 26.4, 'Decir que está frío es pasarse de largo: un café tibio no está caliente y tampoco está frío.']] },
    { id: 'juan', name: 'ALTO Y RUBIO', dur: 30,
      caps: [[0.8, 9.4, '«Juan es alto y es rubio»', 'cuál es su negación'], [10.0, 19.4, 'El «y» cae con una sola falla', 'basta que no sea alto, o que no sea rubio'], [20.0, 29.4, 'No es alto o no es rubio', 'el «y» se vuelve «o»']],
      narr: [[0.8, 9.4, 'Otro problema: hay que negar la frase Juan es alto y es rubio.'], [10.0, 19.4, 'Un y es falso con que falle una sola parte: basta que Juan no sea alto, o que no sea rubio.'], [20.0, 29.4, 'Por eso la negación es Juan no es alto o no es rubio. Al negar, el y se convierte en o.']] },
    { id: 'morgan', name: 'LAS LEYES DE DE MORGAN', dur: 28,
      caps: [[0.8, 8.4, '¬(p ∧ q) = ¬p ∨ ¬q', 'el «y» negado da un «o»'], [9.0, 17.4, '¬(p ∨ q) = ¬p ∧ ¬q', 'el «o» negado da un «y»'], [18.0, 26.4, '«Voy a cine o a teatro»', 'negada: no voy a cine ni a teatro']],
      narr: [[0.8, 8.4, 'Esas son las leyes de De Morgan. Negar un y da un o de negaciones.'], [9.0, 17.4, 'Y negar un o da un y de negaciones: para que el o falle, tienen que fallar las dos partes.'], [18.0, 26.4, 'Voy a cine o a teatro se niega con no voy a cine y no voy a teatro: ni lo uno ni lo otro.']] },
    { id: 'pajaros', name: 'NO TODOS LOS PÁJAROS', dur: 30,
      caps: [[0.8, 9.4, '«No todos los pájaros vuelan»', 'a qué equivale'], [10.0, 19.4, 'Para tumbar un «todos»', 'basta un pájaro que no vuele'], [20.0, 29.4, 'Algún pájaro no vuela', 'el pingüino, el avestruz']],
      narr: [[0.8, 9.4, 'Otro problema: hay que decir a qué equivale la frase no todos los pájaros vuelan.'], [10.0, 19.4, 'Para que todos los pájaros vuelan sea falsa, basta encontrar un solo pájaro que no vuele.'], [20.0, 29.4, 'Así que equivale a algún pájaro no vuela, como el pingüino. No dice que ninguno vuele.']] },
    { id: 'alguno', name: 'ALGUNO Y NINGUNO', dur: 28,
      caps: [[0.8, 8.4, '«Algún estudiante llegó tarde»', 'basta uno para que sea cierta'], [9.0, 17.4, 'Para que sea falsa', 'no puede haber ni uno'], [18.0, 26.4, 'Ningún estudiante llegó tarde', 'alguno ↔ ninguno']],
      narr: [[0.8, 8.4, 'Al revés: algún estudiante llegó tarde es cierta con que haya uno solo.'], [9.0, 17.4, 'Para que sea falsa, no puede haber ni uno que haya llegado tarde.'], [18.0, 26.4, 'Su negación es ningún estudiante llegó tarde. Todos se niega con alguno no, y alguno se niega con ninguno.']] },
    { id: 'cuadro', name: 'EL CUADRO DE LAS NEGACIONES', dur: 28,
      caps: [[0.8, 8.4, 'Todos ↔ alguno no', 'cada par: uno es cierto y el otro no'], [9.0, 17.4, 'Ninguno ↔ alguno', 'nunca los dos, nunca ninguno'], [18.0, 26.4, 'Todos y ninguno no son negaciones', 'pueden fallar los dos a la vez']],
      narr: [[0.8, 8.4, 'Las parejas de negación quedan en un cuadro. Todos frente a alguno no: siempre uno es cierto y el otro falso.'], [9.0, 17.4, 'Ninguno frente a alguno: lo mismo, nunca los dos a la vez y nunca ninguno de los dos.'], [18.0, 26.4, 'Pero todos y ninguno no son negaciones uno del otro: si unos sí y otros no, los dos son falsos.']] },
    { id: 'anidado', name: 'FRASES ANIDADAS', dur: 28,
      caps: [[0.8, 8.4, 'Cada estudiante entregó', 'por lo menos cuatro tareas'], [9.0, 17.4, 'Se niega de afuera hacia adentro', 'cada → alguno · por lo menos 4 → menos de 4'], [18.0, 26.4, 'Algún estudiante entregó', 'menos de cuatro tareas']],
      narr: [[0.8, 8.4, 'Cuando hay una frase dentro de otra: cada estudiante entregó por lo menos cuatro tareas.'], [9.0, 17.4, 'Se niega de afuera hacia adentro. Cada se vuelve alguno, y por lo menos cuatro se vuelve menos de cuatro.'], [18.0, 26.4, 'La negación es algún estudiante entregó menos de cuatro tareas. Con uno basta para tumbarla.']] },
    { id: 'resolver', name: 'LAS GAFAS, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'Afuera: «todos los salones»', 'se vuelve «algún salón»'], [10.0, 19.4, 'Adentro: «alguno usa gafas»', 'se vuelve «ningún estudiante usa gafas»'], [20.0, 29.4, 'En algún salón', 'ningún estudiante usa gafas']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Se niega de afuera hacia adentro: todos los salones se vuelve algún salón.'], [10.0, 19.4, 'Y adentro, hay algún estudiante que usa gafas se vuelve ningún estudiante usa gafas.'], [20.0, 29.4, 'La negación es: en algún salón ningún estudiante usa gafas. Basta un salón así para tumbar la frase.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'En algún salón, ninguno usa gafas', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: en algún salón ningún estudiante usa gafas.'], [11.0, 20.4, 'El y negado da o, el o negado da y, todos se niega con alguno no, y alguno con ninguno.'], [21.0, 29.4, 'Negar es decir justo lo que pasa cuando la frase falla.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 10', TITLE = 'NEGACIÓN Y DE MORGAN', LINE = 'Negar es decir cuándo falla la frase.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-lo-2', KEYS: ['gafas', 'pájaros', 'rubio', 'tareas'] };
})();
if (typeof module !== 'undefined') module.exports = D;
