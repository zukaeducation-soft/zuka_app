// Preuniversitario UdeA · razonamiento lógico: el juego en movimiento de cada lección (spec 2026-11-20-preuda-movimiento).
// Casi todas las lecciones terminaban en vuela-precios o rompe-cambios. Aquí se cambia ese ejercicio (el que va antes de
// la zona de examen) por uno de los seis juegos del kit MV (js/games/mueve-kit.js), que reciben las mismas preguntas:
// se conservan las preguntas, la explicación y la pista; cambia el juego y su enunciado. Ningún juego en movimiento sale
// en más de seis lecciones del componente ni en dos lecciones seguidas del mismo mundo (tests/preuda-movimiento.test.js).
// Va después de los archivos preuda-r-<mundo>.js y antes de preuda-razonamiento-juegos.js.
PU_JUEGOS.push(({ L }) => {
  const FROM = ['vuela-precios', 'rompe-cambios'];
  // lección → [juego, enunciado]
  const MOVIMIENTO = {
    'pu-ge-2': ['aro-lanza', 'Lanza el aro a la estaca del cateto que falta'],
    'pu-ge-4': ['grua-carga', 'Baja la caja en el camión de la medida correcta'],
    'pu-ge-5': ['rueda-cabinas', 'Gira la rueda hasta el área sombreada'],
    'pu-or-1': ['tren-aguja', 'Lleva el tren a la estación de la respuesta'],
    'pu-or-2': ['rueda-cabinas', 'Gira la rueda hasta la silla que piden'],
    'pu-or-4': ['barco-muelle', 'Atraca el barco en lo que se puede afirmar'],
    'pu-co-1': ['canica-tablero', 'Deja caer la canica en el número de casos'],
    'pu-co-2': ['barco-muelle', 'Atraca el barco en el número de ordenamientos'],
    'pu-co-4': ['tren-aguja', 'Lleva el tren a la estación del conteo correcto'],
    'pu-es-2': ['grua-carga', 'Baja la caja en el camión de la respuesta'],
    'pu-es-3': ['aro-lanza', 'Lanza el aro a la cara correcta'],
    'pu-se-2': ['tren-aguja', 'Lleva el tren a la estación de lo que sigue'],
    'pu-se-3': ['rueda-cabinas', 'Gira la rueda hasta el resultado del ciclo'],
    'pu-cd-1': ['barco-muelle', 'Atraca el barco en el código correcto'],
    'pu-cd-2': ['canica-tablero', 'Deja caer la canica en lo que sigue la regla'],
    'pu-gr-1': ['grua-carga', 'Baja la caja en el camión de la lectura correcta'],
    'pu-lo-1': ['rueda-cabinas', 'Gira la rueda hasta el valor de verdad'],
    'pu-lo-2': ['aro-lanza', 'Lanza el aro a la negación correcta'],
    'pu-lo-5': ['canica-tablero', 'Deja caer la canica en la respuesta'],
    'pu-op-1': ['tren-aguja', 'Lleva el tren al resultado del operador'],
    'pu-ar-1': ['barco-muelle', 'Atraca el barco en lo que queda'],
    'pu-ar-2': ['grua-carga', 'Baja la caja en el camión del promedio'],
    'pu-ar-3': ['aro-lanza', 'Lanza el aro a la cifra correcta'],
    'pu-ec-2': ['canica-tablero', 'Deja caer la canica en la respuesta del problema'],
    'pu-cj-2': ['rueda-cabinas', 'Gira la rueda hasta la cuenta de la encuesta'],
    'pu-nu-1': ['tren-aguja', 'Lleva el tren a la estación correcta'],
    'pu-nu-3': ['grua-carga', 'Baja la caja en el camión del residuo'],
    'pu-pb-1': ['aro-lanza', 'Lanza el aro a la probabilidad correcta'],
    'pu-pb-2': ['barco-muelle', 'Atraca el barco en la probabilidad correcta'],
  };
  for (const [id, [game, q]] of Object.entries(MOVIMIENTO)) {
    const ex = L(id).ex, i = ex.length - 4, e = ex[i];
    // Si la lección cambió (otro juego en ese lugar), no se toca: la prueba tests/preuda-movimiento.test.js avisa.
    if (!e || !FROM.includes(e.game)) continue;
    // Las pistas viejas decían «antes de volar» o «antes de lanzar»: ahora el gesto es otro.
    ex[i] = { ...e, game, q, hint: e.hint.replace(/(antes de) (volar|lanzar)/gi, '$1 jugar') };
  }
});
