// «Cuantificadores y silogismos» · Preuniversitario, razonamiento lógico, mundo 10 (Lógica), lección pu-lo-4. Datos puros.
// Reto: «todos los músicos de la banda leen partituras» y «algunos estudiantes de once son músicos de la banda» → necesariamente,
// algunos estudiantes de once leen partituras. En medio: «todos» (violetas y flores), «ninguno» (triángulos de cuatro lados),
// «algunos» (al menos uno), los gatos de Marta (Tom no es negro → no es uno de ellos), la cadena (bogotanos, colombianos,
// americanos), ningún reptil tiene pelo (algunos del zoológico no son reptiles) y la trampa de «puede ser» frente a «necesariamente».
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LOS MÚSICOS DE LA BANDA', dur: 30,
      caps: [[1.0, 9.4, 'Todos los músicos de la banda', 'leen partituras'], [10.0, 19.4, 'Algunos estudiantes de once', 'son músicos de la banda'], [20.0, 29.4, 'Lo que es necesariamente verdad', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Se sabe que todos los músicos de la banda leen partituras.'], [10.0, 19.4, 'Y que algunos estudiantes de once son músicos de la banda.'], [20.0, 29.4, 'Hay que hallar la afirmación que es verdadera sin falta, no la que podría serlo. Al final lo resolvemos.']] },
    { id: 'todos', name: 'TODOS: UN CÍRCULO DENTRO', dur: 28,
      caps: [[0.8, 8.4, '«Todas las violetas son flores»', 'el círculo de violetas, dentro'], [9.0, 17.4, 'Ninguna violeta queda afuera', 'pero hay flores que no son violetas'], [18.0, 26.4, 'Todo A es B: A dentro de B', 'no dice que todo B sea A']],
      narr: [[0.8, 8.4, 'Los cuantificadores se dibujan con círculos. Todas las violetas son flores: el círculo de las violetas va dentro del de las flores.'], [9.0, 17.4, 'Ninguna violeta queda por fuera. Pero sí hay flores que no son violetas, como las rosas.'], [18.0, 26.4, 'Todo A es B pone a A dentro de B. No dice nada de que todo B sea A.']] },
    { id: 'ninguno', name: 'NINGUNO: SEPARADOS', dur: 28,
      caps: [[0.8, 8.4, 'Ningún triángulo tiene 4 lados', 'los dos círculos no se tocan'], [9.0, 17.4, 'Ninguno funciona en los dos sentidos', 'ninguna figura de cuatro lados es triángulo'], [18.0, 26.4, 'Ningún A es B = ningún B es A', 'no comparten nada']],
      narr: [[0.8, 8.4, 'Ningún triángulo tiene cuatro lados: el círculo de los triángulos y el de las figuras de cuatro lados no se tocan.'], [9.0, 17.4, 'Ninguno se puede leer al revés: ninguna figura de cuatro lados es un triángulo.'], [18.0, 26.4, 'Ningún A es B dice lo mismo que ningún B es A: no comparten ni un elemento.']] },
    { id: 'algunos', name: 'ALGUNOS: AL MENOS UNO', dur: 28,
      caps: [[0.8, 8.4, '«Algunos músicos son zurdos»', 'los círculos se cruzan'], [9.0, 17.4, 'Algunos = al menos uno', 'hay alguien en la parte común'], [18.0, 26.4, 'No dice nada del resto', 'puede haber músicos no zurdos, o no']],
      narr: [[0.8, 8.4, 'Algunos músicos son zurdos: los dos círculos se cruzan, y en la parte común hay alguien.'], [9.0, 17.4, 'En lógica, algunos significa al menos uno. Con uno basta para que sea cierta.'], [18.0, 26.4, 'Y no dice nada del resto: puede que haya músicos que no son zurdos, o puede que no.']] },
    { id: 'gatos', name: 'LOS GATOS DE MARTA', dur: 30,
      caps: [[0.8, 9.4, 'Todos los gatos de Marta son negros', 'y Tom no es negro'], [10.0, 19.4, 'Tom queda fuera de los negros', 'y los gatos de Marta están adentro'], [20.0, 29.4, 'Tom no es un gato de Marta', 'puede ser gato, pero no de ella']],
      narr: [[0.8, 9.4, 'Otro problema: todos los gatos de Marta son negros, y Tom no es negro.'], [10.0, 19.4, 'Tom queda fuera del círculo de los negros. Y los gatos de Marta están todos adentro de ese círculo.'], [20.0, 29.4, 'Así que Tom no es un gato de Marta. Puede ser un gato, pero no de los de ella.']] },
    { id: 'cadena', name: 'LA CADENA', dur: 28,
      caps: [[0.8, 8.4, 'Todos los bogotanos son colombianos', 'todos los colombianos son americanos'], [9.0, 17.4, 'Un círculo dentro del otro', 'como muñecas rusas'], [18.0, 26.4, 'Todos los bogotanos son americanos', 'la conclusión sale sola']],
      narr: [[0.8, 8.4, 'Dos premisas en cadena: todos los bogotanos son colombianos, y todos los colombianos son americanos.'], [9.0, 17.4, 'Un círculo queda dentro del otro, y ese dentro del siguiente, como muñecas rusas.'], [18.0, 26.4, 'Entonces todos los bogotanos son americanos. Esa conclusión es un silogismo: sale sola del dibujo.']] },
    { id: 'reptiles', name: 'NINGÚN REPTIL TIENE PELO', dur: 30,
      caps: [[0.8, 9.4, 'Ningún reptil tiene pelo', 'algunos animales del zoológico tienen pelo'], [10.0, 19.4, 'Los del zoológico con pelo', 'quedan fuera de los reptiles'], [20.0, 29.4, 'Algunos no son reptiles', 'puede haber reptiles, pero no esos']],
      narr: [[0.8, 9.4, 'Otro problema: ningún reptil tiene pelo, y algunos animales del zoológico tienen pelo.'], [10.0, 19.4, 'Los animales del zoológico que tienen pelo están en el círculo del pelo, y ese círculo no toca el de los reptiles.'], [20.0, 29.4, 'Así que algunos animales del zoológico no son reptiles. Puede que haya reptiles en el zoológico, pero no son esos.']] },
    { id: 'trampa', name: 'PUEDE SER NO ES SEGURO', dur: 28,
      caps: [[0.8, 8.4, 'Todos los A son B; algunos B son C', 'se cumple que algunos A son C'], [9.0, 17.4, 'Otro dibujo cumple las premisas', 'y deja a C fuera de A'], [18.0, 26.4, 'Necesariamente: en todos los dibujos', 'si hay uno en contra, no es seguro']],
      narr: [[0.8, 8.4, 'Cuidado con lo que solo puede ser. Si todos los A son B y algunos B son C, parece que algunos A son C.'], [9.0, 17.4, 'Pero hay otro dibujo que cumple las dos premisas y deja a C por fuera de A.'], [18.0, 26.4, 'Una conclusión es necesaria solo si se cumple en todos los dibujos posibles. Si hay uno en contra, no es segura.']] },
    { id: 'resolver', name: 'LA BANDA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Músicos de la banda, dentro', 'del círculo de los que leen partituras'], [10.0, 19.4, 'Los de once que están en la banda', 'quedan dentro de los lectores'], [20.0, 29.4, 'Algunos de once leen partituras', 'en cualquier dibujo posible']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Todos los músicos de la banda leen partituras: su círculo va dentro del de los lectores.'], [10.0, 19.4, 'Algunos de once son músicos: hay alguien en la parte común. Ese alguien queda también dentro de los lectores.'], [20.0, 29.4, 'Por eso algunos estudiantes de once leen partituras, en cualquier dibujo. Que todos los de once lean no es seguro.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Algunos de once leen partituras', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: algunos estudiantes de once leen partituras.'], [11.0, 20.4, 'Todos pone un círculo dentro, ninguno los separa, algunos los cruza, y lo necesario se cumple en todos los dibujos.'], [21.0, 29.4, 'Dibuja las premisas y busca el caso que rompa.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 10', TITLE = 'CUANTIFICADORES', LINE = 'Dibuja y busca el caso que rompa.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-lo-4', KEYS: ['partituras', 'reptil', 'Marta', 'violetas'] };
})();
if (typeof module !== 'undefined') module.exports = D;
