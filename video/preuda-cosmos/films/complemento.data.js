// «Complemento e independencia» · Preuniversitario, razonamiento lógico, mundo 16 (Probabilidad), lección pu-pb-2. Datos puros.
// Reto: una pareja con tres hijos; la probabilidad de que haya por lo menos un niño y por lo menos una niña → 1 − 2/8 = 3/4. En medio:
// el complemento (no sacar 6: 5/6), el árbol de tres nacimientos (8 caminos de 1/8), al menos dos caras en tres lanzamientos (1/2),
// dos balotas a la vez del mismo color (4 rojas, 3 azules y 2 verdes → 5/18), con o sin devolver (16/81 frente a 1/6), la condición
// reduce el total (de las 32 familias con perro, 8 con gato → 1/4) y los sucesos independientes (la moneda no tiene memoria).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'TRES HIJOS', dur: 30,
      caps: [[1.0, 9.4, 'Una pareja tiene tres hijos', 'niño o niña, igual de probable'], [10.0, 19.4, 'Por lo menos un niño', 'y por lo menos una niña'], [20.0, 29.4, 'La probabilidad', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una pareja tiene tres hijos, y en cada nacimiento es igual de probable que nazca niño o niña.'], [10.0, 19.4, 'Hay que hallar la probabilidad de que entre los tres haya por lo menos un niño y por lo menos una niña.'], [20.0, 29.4, 'Contar todo lo que sirve es largo. Hay un camino más corto. Al final lo resolvemos.']] },
    { id: 'complemento', name: 'EL COMPLEMENTO', dur: 28,
      caps: [[0.8, 8.4, 'P(no A) = 1 − P(A)', 'lo que no pasa completa lo que pasa'], [9.0, 17.4, 'No sacar 6 en un dado', '1 − 1/6 = 5/6'], [18.0, 26.4, '«Al menos uno» se cuenta al revés', 'todo menos «ninguno»']],
      narr: [[0.8, 8.4, 'La probabilidad de que algo no pase es uno menos la probabilidad de que pase. Entre los dos completan el todo.'], [9.0, 17.4, 'No sacar seis en un dado es uno menos un sexto: cinco sextos.'], [18.0, 26.4, 'Es muy útil con la frase al menos uno: se calcula ninguno, que es un solo caso, y se resta de uno.']] },
    { id: 'arbol', name: 'EL ÁRBOL DE CAMINOS', dur: 28,
      caps: [[0.8, 8.4, 'Cada nacimiento abre dos ramas', 'niño o niña, 1/2 cada una'], [9.0, 17.4, 'Tres nacimientos: 8 caminos', 'cada camino: 1/2 · 1/2 · 1/2 = 1/8'], [18.0, 26.4, 'Por un camino se multiplica', 'entre caminos se suma']],
      narr: [[0.8, 8.4, 'Un árbol ordena los casos. Cada nacimiento abre dos ramas, niño o niña, con probabilidad un medio cada una.'], [9.0, 17.4, 'Con tres nacimientos hay ocho caminos. Cada camino vale un medio por un medio por un medio: un octavo.'], [18.0, 26.4, 'A lo largo de un camino se multiplica; para juntar varios caminos que sirven, se suma.']] },
    { id: 'caras', name: 'AL MENOS DOS CARAS', dur: 30,
      caps: [[0.8, 9.4, 'Una moneda, tres lanzamientos', 'por lo menos dos caras'], [10.0, 19.4, 'Dos caras: CCS, CSC, SCC', 'tres caras: CCC'], [20.0, 29.4, '4 de 8 caminos', 'P = 4/8 = 1/2']],
      narr: [[0.8, 9.4, 'Otro problema: se lanza una moneda tres veces. Hay que hallar la probabilidad de obtener cara por lo menos dos veces.'], [10.0, 19.4, 'Exactamente dos caras sale de tres maneras: cara cara sello, cara sello cara, sello cara cara. Y tres caras, de una.'], [20.0, 29.4, 'Cuatro de los ocho caminos: un medio.']] },
    { id: 'balotas', name: 'DOS BALOTAS DEL MISMO COLOR', dur: 30,
      caps: [[0.8, 9.4, '4 rojas, 3 azules y 2 verdes', 'se sacan dos al mismo tiempo'], [10.0, 19.4, 'Parejas posibles: 9 · 8 ÷ 2 = 36', 'mismo color: 6 + 3 + 1 = 10'], [20.0, 29.4, 'P = 10/36 = 5/18', 'las parejas, sin orden']],
      narr: [[0.8, 9.4, 'Otro problema: en una bolsa hay cuatro balotas rojas, tres azules y dos verdes. Se sacan dos al mismo tiempo, y se quiere que sean del mismo color.'], [10.0, 19.4, 'Con nueve balotas hay treinta y seis parejas. Del mismo color: seis rojas, tres azules y una verde, diez parejas.'], [20.0, 29.4, 'Diez de treinta y seis: cinco dieciochoavos.']] },
    { id: 'reposicion', name: 'CON O SIN DEVOLVER', dur: 28,
      caps: [[0.8, 8.4, 'Dos rojas, devolviendo la primera', '4/9 · 4/9 = 16/81'], [9.0, 17.4, 'Sin devolverla', 'la segunda: 3 rojas de 8'], [18.0, 26.4, '4/9 · 3/8 = 1/6', 'la bolsa cambió']],
      narr: [[0.8, 8.4, 'Importa si la primera balota se devuelve. Para sacar dos rojas devolviéndola, la bolsa no cambia: cuatro novenos por cuatro novenos.'], [9.0, 17.4, 'Sin devolverla, para la segunda quedan tres rojas de ocho balotas.'], [18.0, 26.4, 'Cuatro novenos por tres octavos: un sexto. La segunda probabilidad cambió porque la bolsa cambió.']] },
    { id: 'condicion', name: 'LA CONDICIÓN ACHICA EL TOTAL', dur: 28,
      caps: [[0.8, 8.4, '32 familias tienen perro', '8 de ellas también tienen gato'], [9.0, 17.4, 'Una de las que tienen perro, al azar', 'los posibles son solo esas 32'], [18.0, 26.4, 'P = 8/32 = 1/4', 'no 8/60']],
      narr: [[0.8, 8.4, 'Si se sabe algo, el total se achica. En un barrio, treinta y dos familias tienen perro, y ocho de ellas también tienen gato.'], [9.0, 17.4, 'Si se escoge al azar una de las familias con perro, los casos posibles son solo esas treinta y dos.'], [18.0, 26.4, 'La probabilidad de que tenga gato es ocho de treinta y dos: un cuarto. No ocho de todas las familias.']] },
    { id: 'memoria', name: 'SIN MEMORIA', dur: 28,
      caps: [[0.8, 8.4, 'Salieron 5 caras seguidas', 'la sexta: sigue siendo 1/2'], [9.0, 17.4, 'Independientes: no se afectan', 'la moneda no recuerda'], [18.0, 26.4, 'Dos dados: 6 y 6', '1/6 · 1/6 = 1/36']],
      narr: [[0.8, 8.4, 'Después de cinco caras seguidas, muchos creen que ya toca sello. Pero la sexta sigue siendo un medio.'], [9.0, 17.4, 'Dos sucesos son independientes si uno no cambia la probabilidad del otro. La moneda no recuerda.'], [18.0, 26.4, 'Con sucesos independientes se multiplica: dos seis en dos dados es un sexto por un sexto.']] },
    { id: 'resolver', name: 'LOS HIJOS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, 'Lo contrario: todos del mismo sexo', 'tres niños o tres niñas'], [10.0, 19.4, 'Son 2 caminos de 8', 'P(contrario) = 2/8 = 1/4'], [20.0, 29.4, '1 − 1/4 = 3/4', 'por lo menos uno de cada uno']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Lo contrario de tener al menos un niño y una niña es que los tres sean del mismo sexo: tres niños o tres niñas.'], [10.0, 19.4, 'Son dos caminos de ocho: un cuarto.'], [20.0, 29.4, 'Uno menos un cuarto: tres cuartos. Los seis caminos mezclados son los que sirven.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'La probabilidad es 3/4', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: tres cuartos.'], [11.0, 20.4, 'Uno menos lo contrario, multiplicar por un camino y sumar entre caminos, mirar si se devuelve, y la condición achica el total.'], [21.0, 29.4, 'A veces es más fácil contar lo que no sirve.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 16', TITLE = 'COMPLEMENTO E INDEPENDENCIA', LINE = 'A veces conviene contar lo que no sirve.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-pb-2', KEYS: ['hijos', 'balotas', 'perro', '5/18'] };
})();
if (typeof module !== 'undefined') module.exports = D;
