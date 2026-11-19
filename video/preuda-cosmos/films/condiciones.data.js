// «Condiciones: tiene que, podría, no puede» · Preuniversitario, razonamiento lógico, mundo 3, lección pu-or-4. Datos puros.
// Reto: la bibliotecaria (seis libros en tres estantes; con C en el 1 y F en el 2, E queda con certeza en el 3: seis acomodos
// posibles). En medio: leer un «si…», tiene que · podría · no puede, juntos y separados, «número mayor», el equipo de cuatro
// (ACDE, ACDF, BCDE, BCDF: C y D siempre) y la carrera de cuatro (Pablo, Juan, Carlos y Luis: tres órdenes).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LOS LIBROS DE LA BIBLIOTECA', dur: 30,
      caps: [[1.0, 9.4, 'Seis libros, tres estantes', 'de uno a tres libros por estante'], [10.0, 19.4, 'Tres reglas y una condición', 'C en el estante 1 y F en el 2'], [20.0, 29.4, 'Qué es seguro', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una bibliotecaria ubica seis libros, de la A a la F, en tres estantes, con uno a tres libros en cada uno.'], [10.0, 19.4, 'A y B no van juntos; C y D sí; E va en un estante mayor que el de F. Además, C queda en el uno y F en el dos.'], [20.0, 29.4, 'Hay que hallar la afirmación de la que se tiene certeza. Primero, cómo leer condiciones. Al final lo resolvemos.']] },
    { id: 'si', name: 'LEER UN «SI…»', dur: 30,
      caps: [[0.8, 9.4, '«Si A participa, B no»', 'solo habla del caso en que A está'], [10.0, 19.4, 'Cuatro casos, uno prohibido', 'A y B juntos: lo único que no puede pasar'], [20.0, 29.4, 'Si A no está, B es libre', 'puede estar o no estar']],
      narr: [[0.8, 9.4, 'La regla si A participa, B no, solo dice algo cuando A está. Es como una promesa que solo se rompe en un caso.'], [10.0, 19.4, 'Con A y B hay cuatro casos: los dos, solo A, solo B o ninguno. La regla solo prohíbe uno: que estén los dos.'], [20.0, 29.4, 'Si A no está, la regla no dice nada: B puede estar o no. Es el error más común: leer la regla al revés.']] },
    { id: 'tres', name: 'TIENE QUE · PODRÍA · NO PUEDE', dur: 30,
      caps: [[0.8, 9.4, 'Se listan los casos posibles', 'los que cumplen todas las reglas'], [10.0, 19.4, 'Tiene que: en todos', 'podría: en al menos uno'], [20.0, 29.4, 'No puede: en ninguno', 'cada palabra es una cuenta distinta']],
      narr: [[0.8, 9.4, 'Para responder con seguridad se listan todos los casos que cumplen las reglas.'], [10.0, 19.4, 'Una afirmación tiene que ser cierta si se cumple en todos los casos. Podría ser cierta si se cumple en al menos uno.'], [20.0, 29.4, 'Y no puede ser cierta si no se cumple en ninguno. Cada pregunta pide una de estas tres cuentas: hay que leer cuál.']] },
    { id: 'juntos', name: 'JUNTOS Y SEPARADOS', dur: 28,
      caps: [[0.8, 8.4, '«C y D van juntos»', 'se mueven como un solo paquete'], [9.0, 17.4, '«A y B no van juntos»', 'cada uno busca su propio estante'], [18.0, 26.4, '«E en un estante mayor que F»', 'F nunca en el 3; E nunca en el 1']],
      narr: [[0.8, 8.4, 'C y D van juntos: se amarran como un paquete de dos libros que ocupa lugar en un mismo estante.'], [9.0, 17.4, 'A y B no van juntos: siempre quedan en estantes distintos.'], [18.0, 26.4, 'E en un estante de número mayor que F: F no puede estar en el tres, ni E en el uno. Una comparación tacha extremos.']] },
    { id: 'carrera', name: 'LA CARRERA DE CUATRO', dur: 30,
      caps: [[0.8, 9.4, 'Cuatro corredores, sin empates', 'Juan llega después de Pablo y de Carlos'], [10.0, 19.4, 'Tres órdenes posibles', 'Juan siempre es el último'], [20.0, 29.4, 'Si Carlos va después de Pablo…', 'solo queda L P C J: Carlos es tercero']],
      narr: [[0.8, 9.4, 'Otro problema: Pablo llegó antes que Juan, Carlos antes que Juan y Luis antes que Pablo. Hay que hallar la afirmación segura.'], [10.0, 19.4, 'Juan llega después de todos: es el último. Arriba quedan tres órdenes: Luis, Pablo, Carlos; Luis, Carlos, Pablo; o Carlos, Luis, Pablo.'], [20.0, 29.4, 'La opción con si se revisa solo en los casos donde se cumple la primera parte: si Carlos llegó después de Pablo, el único caso lo deja tercero.']] },
    { id: 'equipo', name: 'EL EQUIPO DE CUATRO', dur: 30,
      caps: [[0.8, 9.4, 'Cuatro de seis candidatos', 'A o B, no ambos; si C, también D'], [10.0, 19.4, 'Exactamente uno de E y F', 'quedan dos lugares para C y D'], [20.0, 29.4, 'Cuatro equipos posibles', 'C y D están en todos']],
      narr: [[0.8, 9.4, 'Otro problema: escoger cuatro de seis jugadores. A y B no van los dos; si va C, va D; y va exactamente uno de E y F.'], [10.0, 19.4, 'De A y B entra a lo sumo uno, y de E y F, uno. Para completar cuatro faltan dos, y solo pueden ser C y D, que van juntos.'], [20.0, 29.4, 'Quedan cuatro equipos: A o B, con C, D, y E o F. Lo único seguro es que C y D están.']] },
    { id: 'hipotesis', name: '«SI ADEMÁS…»', dur: 28,
      caps: [[0.8, 8.4, 'Una pregunta trae un dato extra', '«si C queda en el estante 1…»'], [9.0, 17.4, 'Se vale solo para esa pregunta', 'la siguiente vuelve a las reglas de base'], [18.0, 26.4, 'El dato extra recorta la lista', 'menos casos, más certezas']],
      narr: [[0.8, 8.4, 'Muchas preguntas agregan un dato: si además C queda en el estante uno. Ese dato es parte de esa pregunta.'], [9.0, 17.4, 'No se arrastra a la siguiente pregunta: cada una vuelve a las reglas de base.'], [18.0, 26.4, 'El dato extra recorta la lista de casos. Con menos casos, aparecen más cosas que tienen que ser ciertas.']] },
    { id: 'lista', name: 'LISTAR CON ORDEN', dur: 28,
      caps: [[0.8, 8.4, 'Primero lo que ya está fijo', 'C y D en el 1; F en el 2'], [9.0, 17.4, 'Luego la regla más fuerte', 'E en el 3: mayor que el 2'], [18.0, 26.4, 'Al final lo que queda libre', 'A y B se reparten sin juntarse']],
      narr: [[0.8, 8.4, 'Para listar sin perder casos, se empieza por lo fijo: C en el estante uno arrastra a D, y F está en el dos.'], [9.0, 17.4, 'Después, la regla más fuerte: E tiene que estar en un estante mayor que el dos: solo puede ser el tres.'], [18.0, 26.4, 'Por último, lo libre: A y B se reparten en estantes distintos sin pasarse de tres libros por estante.']] },
    { id: 'resolver', name: 'LOS LIBROS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, 'Seis acomodos posibles', 'C, D en el 1; F en el 2; E en el 3'], [10.0, 19.4, 'A y B cambian de estante', 'y el estante 2 tiene uno o dos libros'], [20.0, 29.4, 'E en el estante 3: en los seis', 'esa es la certeza']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Con C y D en el uno, F en el dos y E en el tres, A y B se reparten de seis maneras posibles.'], [10.0, 19.4, 'A puede estar en cualquier estante, y B también, siempre separados. El estante dos tiene a veces uno y a veces dos libros.'], [20.0, 29.4, 'Lo único que se cumple en los seis acomodos es que E queda en el estante tres.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'E queda en el estante 3', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: E queda en el estante tres. Lo seguro es lo que sobrevive en todos los casos.'], [11.0, 20.4, 'Un si solo habla cuando se cumple; tiene que es en todos, podría en alguno y no puede en ninguno.'], [21.0, 29.4, 'Tiene que: en todos. Podría: en alguno.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 3', TITLE = 'TIENE QUE, PODRÍA, NO PUEDE', LINE = 'Tiene que: en todos. Podría: en alguno.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-or-4', KEYS: ['estante', 'Pablo', 'entrenador'] };
})();
if (typeof module !== 'undefined') module.exports = D;
