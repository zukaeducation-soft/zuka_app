// «Velocidad y trabajo conjunto» · Preuniversitario, razonamiento lógico, mundo 4, lección pu-pr-3. Datos puros.
// Reto: el tanque con dos llaves (6 h y 3 h) y un desagüe (4 h): se llena en 4 h. En medio: d = v · t, los trenes que se
// cruzan (360 km, 70 y 50 km/h → a 210 km de M), el alcance (ciclista a 15 y moto a 45 dos horas después → 1 h), la
// velocidad promedio del bus (60 de ida, 40 de vuelta → 48), la rapidez de un trabajo, dos obreras (10 y 15 días → 6).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'DOS LLAVES Y UN DESAGÜE', dur: 30,
      caps: [[1.0, 9.4, 'Dos llaves: 6 horas y 3 horas', 'cada una llenaría el tanque sola'], [10.0, 19.4, 'Un desagüe: lo vacía en 4 horas', 'se abren las tres a la vez'], [20.0, 29.4, 'Cuánto tarda en llenarse', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un tanque tiene dos llaves: la primera sola lo llena en seis horas; la segunda, en tres.'], [10.0, 19.4, 'Además tiene un desagüe que, con el tanque lleno, lo vacía en cuatro horas. Con el tanque vacío se abren las tres a la vez.'], [20.0, 29.4, 'Hay que hallar cuánto tarda en llenarse. Promediar horas no sirve; hay que pensar en rapideces. Al final lo resolvemos.']] },
    { id: 'dvt', name: 'DISTANCIA, VELOCIDAD, TIEMPO', dur: 28,
      caps: [[0.8, 8.4, 'd = v · t', 'a 80 km/h durante 3 h: 240 km'], [9.0, 17.4, 'Tapar la que se busca', 't = d ÷ v   ·   v = d ÷ t'], [18.0, 26.4, 'Las unidades deben coincidir', 'km con horas; metros con segundos']],
      narr: [[0.8, 8.4, 'Distancia es velocidad por tiempo. Un carro a ochenta kilómetros por hora durante tres horas recorre doscientos cuarenta.'], [9.0, 17.4, 'En un triángulo se tapa lo que se busca: el tiempo es distancia entre velocidad, y la velocidad, distancia entre tiempo.'], [18.0, 26.4, 'Las unidades tienen que coincidir: kilómetros por hora con horas, metros por segundo con segundos.']] },
    { id: 'encuentro', name: 'LOS TRENES QUE SE CRUZAN', dur: 30,
      caps: [[0.8, 9.4, '360 km entre M y N', 'un tren a 70 km/h y otro a 50 km/h'], [10.0, 19.4, 'Se acercan a 70 + 50 = 120 km/h', 'se cruzan a las 3 horas'], [20.0, 29.4, 'A 70 · 3 = 210 km de M', 'y a 150 km de N']],
      narr: [[0.8, 9.4, 'Otro problema: las ciudades M y N están a trescientos sesenta kilómetros. A la misma hora sale un tren de cada una, a setenta y a cincuenta.'], [10.0, 19.4, 'Como van uno hacia el otro, la distancia entre ellos se acorta ciento veinte kilómetros cada hora: se cruzan a las tres horas.'], [20.0, 29.4, 'En tres horas el tren de M recorre doscientos diez kilómetros: se cruzan a doscientos diez de M.']] },
    { id: 'alcance', name: 'EL ALCANCE', dur: 28,
      caps: [[0.8, 8.4, 'Un ciclista a 15 km/h', 'dos horas después sale una moto a 45 km/h'], [9.0, 17.4, 'Ventaja: 30 km', 'la moto la recorta a 45 − 15 = 30 km/h'], [18.0, 26.4, 'La alcanza en 1 hora', 'mismo sentido: las velocidades se restan']],
      narr: [[0.8, 8.4, 'Un ciclista sale a quince kilómetros por hora. Dos horas después, por el mismo camino, sale una moto a cuarenta y cinco.'], [9.0, 17.4, 'El ciclista lleva treinta kilómetros de ventaja. La moto se le acerca cuarenta y cinco menos quince: treinta kilómetros cada hora.'], [18.0, 26.4, 'La alcanza en una hora. Al encontrarse se suman las velocidades; al perseguirse, se restan.']] },
    { id: 'promedio', name: 'EL BUS DE IDA Y VUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Ida a 60 km/h, vuelta a 40 km/h', 'la velocidad promedio no es 50'], [10.0, 19.4, 'Se inventa una distancia: 120 km', 'ida 2 horas, vuelta 3 horas'], [20.0, 29.4, '240 km en 5 horas', 'velocidad promedio: 48 km/h']],
      narr: [[0.8, 9.4, 'Otro problema: un bus va a sesenta kilómetros por hora y regresa por la misma vía a cuarenta. La tentación es decir cincuenta.'], [10.0, 19.4, 'Se elige una distancia cómoda, ciento veinte kilómetros. La ida tarda dos horas y la vuelta, tres: va más tiempo despacio.'], [20.0, 29.4, 'En total, doscientos cuarenta kilómetros en cinco horas: cuarenta y ocho kilómetros por hora. Promedio es distancia total entre tiempo total.']] },
    { id: 'rapidez', name: 'LA RAPIDEZ DE UN TRABAJO', dur: 28,
      caps: [[0.8, 8.4, 'Una llave llena el tanque en 3 h', 'cada hora llena 1/3'], [9.0, 17.4, 'Rapidez = 1 / tiempo', 'en 6 h: 1/6 del tanque por hora'], [18.0, 26.4, 'Lo que se suma son las rapideces', 'los tiempos no se suman ni se promedian']],
      narr: [[0.8, 8.4, 'Si una llave llena un tanque en tres horas, cada hora llena un tercio del tanque.'], [9.0, 17.4, 'Su rapidez es uno entre el tiempo. Una llave de seis horas llena un sexto por hora.'], [18.0, 26.4, 'Cuando trabajan juntas, lo que se suma son las rapideces. Los tiempos no se suman ni se promedian.']] },
    { id: 'juntas', name: 'DOS OBRERAS', dur: 28,
      caps: [[0.8, 8.4, 'Una sola tarda 10 días; otra, 15', 'juntas'], [9.0, 17.4, '1/10 + 1/15 = 3/30 + 2/30 = 1/6', 'juntas hacen un sexto por día'], [18.0, 26.4, 'Terminan en 6 días', 'menos que la más rápida sola']],
      narr: [[0.8, 8.4, 'Una obrera hace un trabajo en diez días y otra en quince. Trabajan juntas, cada una a su ritmo.'], [9.0, 17.4, 'Cada día la primera hace un décimo y la segunda un quinceavo. Juntas: tres treintavos más dos treintavos, un sexto.'], [18.0, 26.4, 'Terminan en seis días. Juntas siempre tardan menos que la más rápida sola: si da más, hay un error.']] },
    { id: 'desague', name: 'LO QUE SE RESTA', dur: 28,
      caps: [[0.8, 8.4, 'Un desagüe trabaja en contra', 'si vacía en 4 h, quita 1/4 por hora'], [9.0, 17.4, 'Se resta su rapidez', 'llave 1/2 − desagüe 1/4 = 1/4'], [18.0, 26.4, 'Si el resultado es negativo', 'el tanque nunca se llena']],
      narr: [[0.8, 8.4, 'Un desagüe trabaja en contra: si vacía el tanque en cuatro horas, quita un cuarto por hora.'], [9.0, 17.4, 'Su rapidez se resta. Una llave que llena medio tanque por hora, contra ese desagüe, llena solo un cuarto por hora.'], [18.0, 26.4, 'Si lo que sale es más de lo que entra, la cuenta da negativa: el tanque nunca se llena.']] },
    { id: 'resolver', name: 'EL TANQUE, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Llaves: 1/6 + 1/3 = 1/2 por hora', 'juntas llenan medio tanque cada hora'], [10.0, 19.4, 'Desagüe: − 1/4 por hora', '1/2 − 1/4 = 1/4 del tanque por hora'], [20.0, 29.4, 'Un cuarto por hora: 4 horas', 'cuatro cuartos llenan el tanque']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Las dos llaves llenan un sexto y un tercio por hora: juntas, medio tanque cada hora.'], [10.0, 19.4, 'El desagüe quita un cuarto por hora. Medio menos un cuarto: el tanque gana un cuarto cada hora.'], [20.0, 29.4, 'Con un cuarto por hora, hacen falta cuatro horas para llenarlo.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Se llena en 4 horas', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cuatro horas. Se suman y se restan rapideces, nunca tiempos.'], [11.0, 20.4, 'Distancia es velocidad por tiempo; al cruzarse se suman, al alcanzarse se restan; el promedio es total entre total.'], [21.0, 29.4, 'Se suman rapideces, no tiempos.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 4', TITLE = 'VELOCIDAD Y TRABAJO CONJUNTO', LINE = 'Se suman rapideces, no tiempos.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-pr-3', KEYS: ['210', '48', '360', 'desagüe'] };
})();
if (typeof module !== 'undefined') module.exports = D;
