// «Verdad y mentira» · Preuniversitario, razonamiento lógico, mundo 10 (Lógica), lección pu-lo-5. Datos puros.
// Reto: Pedro miente lunes, martes y miércoles y dice la verdad los demás días; hoy dijo «ayer mentí» y «dentro de tres días diré la
// verdad» → hoy es jueves. En medio: suponer y buscar el choque (Lucía y Mateo), la isla de veraces y falaces (X: «por lo menos uno
// de los dos es falaz» → X veraz, Y falaz), nadie puede decir «soy falaz», «los dos somos falaces», el vidrio roto con una sola
// verdad (fue Camilo), mentir con una frase compuesta y la fila de la semana para «mañana mentiré» (miércoles o domingo).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA SEMANA DE PEDRO', dur: 30,
      caps: [[1.0, 9.4, 'Pedro miente de lunes a miércoles', 'y dice la verdad los demás días'], [10.0, 19.4, 'Hoy dijo: «Ayer mentí»', 'y «dentro de tres días diré la verdad»'], [20.0, 29.4, 'Qué día es hoy', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Pedro miente todos los lunes, martes y miércoles, y dice la verdad los demás días.'], [10.0, 19.4, 'Hoy dijo dos cosas: ayer mentí, y dentro de tres días diré la verdad.'], [20.0, 29.4, 'Con eso se puede saber qué día es hoy. Al final lo resolvemos.']] },
    { id: 'suponer', name: 'SUPONER Y BUSCAR EL CHOQUE', dur: 28,
      caps: [[0.8, 8.4, 'Lucía: «Mateo miente»', 'Mateo: «Lucía y yo decimos la verdad»'], [9.0, 17.4, 'Si Mateo dijera la verdad...', 'Lucía también, y ella dice que él miente'], [18.0, 26.4, 'Choca: Mateo miente', 'y Lucía dice la verdad']],
      narr: [[0.8, 8.4, 'El método es suponer y buscar el choque. Lucía dice: Mateo miente. Mateo dice: Lucía y yo decimos la verdad.'], [9.0, 17.4, 'Si Mateo dijera la verdad, Lucía también la diría. Pero ella dice que Mateo miente: choca.'], [18.0, 26.4, 'La suposición se descarta: Mateo miente. Y entonces lo que dice Lucía es cierto.']] },
    { id: 'veraces', name: 'LA ISLA DE LOS VERACES', dur: 30,
      caps: [[0.8, 9.4, 'Veraces siempre dicen la verdad', 'falaces siempre mienten'], [10.0, 19.4, 'X: «Al menos uno de los dos miente»', 'si X fuera falaz, la frase sería cierta'], [20.0, 29.4, 'X es veraz', 'y entonces Y es falaz']],
      narr: [[0.8, 9.4, 'Otro problema. En una isla, los veraces siempre dicen la verdad y los falaces siempre mienten. X dice: por lo menos uno de nosotros dos es falaz.'], [10.0, 19.4, 'Si X fuera falaz, ya habría uno falaz entre los dos y su frase sería cierta. Un falaz no dice cosas ciertas: choca.'], [20.0, 29.4, 'Así que X es veraz, su frase es cierta, y el falaz tiene que ser Y.']] },
    { id: 'nadie', name: 'NADIE DICE «SOY FALAZ»', dur: 28,
      caps: [[0.8, 8.4, 'Un veraz no puede decirlo', 'estaría mintiendo'], [9.0, 17.4, 'Un falaz tampoco', 'estaría diciendo la verdad'], [18.0, 26.4, '«Soy veraz» la dicen los dos', 'esa frase no da información']],
      narr: [[0.8, 8.4, 'Un dato útil: en la isla nadie puede decir soy falaz. Un veraz que lo dijera estaría mintiendo.'], [9.0, 17.4, 'Y un falaz que lo dijera estaría diciendo la verdad. Tampoco puede.'], [18.0, 26.4, 'En cambio, cualquiera puede decir soy veraz: el veraz con verdad y el falaz mintiendo. Esa frase no ayuda.']] },
    { id: 'ambos', name: 'LOS DOS SOMOS FALACES', dur: 28,
      caps: [[0.8, 8.4, 'Z: «Los dos somos falaces»', 'Z no puede ser veraz'], [9.0, 17.4, 'Z es falaz: la frase es falsa', 'no son falaces los dos'], [18.0, 26.4, 'Entonces W es veraz', 'una mentira también informa']],
      narr: [[0.8, 8.4, 'Otro caso: Z dice los dos somos falaces. Si Z fuera veraz, se estaría llamando falaz: imposible.'], [9.0, 17.4, 'Así que Z es falaz, y su frase es falsa: no es cierto que los dos sean falaces.'], [18.0, 26.4, 'Como Z sí lo es, el otro, W, tiene que ser veraz. Una mentira también da información.']] },
    { id: 'vidrio', name: 'EL VIDRIO ROTO', dur: 30,
      caps: [[0.8, 9.4, 'Andrés: «Fue Bruno»', 'Bruno: «Yo no fui» · Camilo: «Yo no fui»'], [10.0, 19.4, 'Solo uno dice la verdad', 'se prueba cada culpable posible'], [20.0, 29.4, 'Si fue Camilo, hay una sola verdad', 'fue Camilo']],
      narr: [[0.8, 9.4, 'Otro problema: uno de tres rompió un vidrio. Andrés dice: fue Bruno. Bruno dice: yo no fui. Camilo dice: yo no fui.'], [10.0, 19.4, 'Solo uno dice la verdad. Se prueba cada culpable posible y se cuentan las frases verdaderas.'], [20.0, 29.4, 'Si fue Andrés o Bruno, hay dos verdades. Si fue Camilo, solo Bruno dice la verdad. Fue Camilo.']] },
    { id: 'compuesta', name: 'MENTIR CON DOS PARTES', dur: 28,
      caps: [[0.8, 8.4, 'Un falaz dice: «Llueve y hace frío»', 'la frase completa es falsa'], [9.0, 17.4, 'No llueve, o no hace frío', 'basta que falle una parte'], [18.0, 26.4, 'Mentir es negar toda la frase', 'con las leyes de De Morgan']],
      narr: [[0.8, 8.4, 'Cuidado con las frases compuestas. Un falaz dice: llueve y hace frío. Lo falso es la frase completa.'], [9.0, 17.4, 'Eso no significa que no llueva y no haga frío. Significa que no llueve, o no hace frío: basta que falle una parte.'], [18.0, 26.4, 'Mentir es negar toda la frase, y para eso sirven las leyes de De Morgan.']] },
    { id: 'semana', name: 'LA FILA DE LA SEMANA', dur: 28,
      caps: [[0.8, 8.4, 'Pedro dice: «Mañana mentiré»', 'se prueba día por día'], [9.0, 17.4, 'Día de verdad: frase cierta', 'día de mentira: debe ser falsa'], [18.0, 26.4, 'Encaja el miércoles y el domingo', 'los demás días chocan']],
      narr: [[0.8, 8.4, 'Con días de mentira se arma una fila de la semana. Supongamos que Pedro dice: mañana mentiré.'], [9.0, 17.4, 'Un día de verdad, la frase tiene que ser cierta; un día de mentira, tiene que ser falsa.'], [18.0, 26.4, 'El domingo dice la verdad y el lunes miente: encaja. El miércoles miente y el jueves no: también encaja.']] },
    { id: 'resolver', name: 'LA SEMANA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, '«Ayer mentí»: encaja lunes y jueves', 'lunes mintiendo, jueves con verdad'], [10.0, 19.4, 'Lunes: «en tres días diré la verdad»', 'el jueves sí la dice: sería cierta, choca'], [20.0, 29.4, 'Jueves: el domingo dirá la verdad', 'cierta en día de verdad: hoy es jueves']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Ayer mentí solo encaja el lunes, mintiendo, porque el domingo dijo la verdad, y el jueves, con verdad.'], [10.0, 19.4, 'Si fuera lunes, dentro de tres días sería jueves y diría la verdad: la frase sería cierta en un día de mentira. Choca.'], [20.0, 29.4, 'Si es jueves, dentro de tres días es domingo y dirá la verdad: frase cierta en día de verdad. Hoy es jueves.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Hoy es jueves', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: hoy es jueves. Solo ese día encajan las dos frases.'], [11.0, 20.4, 'Suponer y buscar el choque, probar cada caso, recordar que nadie dice soy falaz y negar la frase completa.'], [21.0, 29.4, 'Una suposición que choca es una pista.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 10', TITLE = 'VERDAD Y MENTIRA', LINE = 'Una suposición que choca es una pista.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-lo-5', KEYS: ['Pedro', 'falaz', 'vidrio'] };
})();
if (typeof module !== 'undefined') module.exports = D;
