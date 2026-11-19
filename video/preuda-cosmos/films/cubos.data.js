// «Vistas y cubos» · Preuniversitario, razonamiento lógico, mundo 6 (Razonamiento espacial), lección pu-es-2. Datos puros.
// Reto: el cubo de 6 cm pintado y cortado en cubitos de 1 cm: 48 con exactamente dos caras pintadas (el de 4 ya es un juego). En medio: contar por
// capas (la pirámide 9 + 4 + 1), los cubos que no se ven, las tres vistas, el máximo de cubitos con vistas de frente
// 3, 1, 2 y de lado 2, 3, 1 sobre una base de 3 × 3 llena (14), el mínimo (12), el cubo de 3 cortado y la fórmula general.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL CUBO PINTADO', dur: 30,
      caps: [[1.0, 9.4, 'Un cubo de 6 cm de arista', 'se pinta de rojo por fuera'], [10.0, 19.4, 'Se corta en cubitos de 1 cm', '6 · 6 · 6 = 216 cubitos'], [20.0, 29.4, 'Cuántos tienen dos caras rojas', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un cubo de madera de seis centímetros de arista se pinta de rojo por todas sus caras.'], [10.0, 19.4, 'Luego se corta en cubitos de un centímetro: seis por seis por seis, doscientos dieciséis cubitos.'], [20.0, 29.4, 'Hay que contar cuántos quedan con exactamente dos caras pintadas, sin contarlos uno por uno. Al final lo resolvemos.']] },
    { id: 'capas', name: 'CONTAR POR CAPAS', dur: 28,
      caps: [[0.8, 8.4, 'Una pirámide de cubos', 'se cuenta piso por piso'], [9.0, 17.4, 'Abajo 9, en medio 4, arriba 1', '3 · 3 + 2 · 2 + 1 · 1'], [18.0, 26.4, 'En total, 14 cubos', 'aunque solo se vean algunos']],
      narr: [[0.8, 8.4, 'Una pirámide de cubos se cuenta piso por piso, de abajo hacia arriba.'], [9.0, 17.4, 'El piso de abajo es de tres por tres, nueve; el del medio, de dos por dos, cuatro; arriba hay uno.'], [18.0, 26.4, 'En total, catorce cubos, aunque desde afuera no se vean todos.']] },
    { id: 'ocultos', name: 'LOS QUE NO SE VEN', dur: 28,
      caps: [[0.8, 8.4, 'Un cubo no flota', 'si hay uno arriba, hay otro debajo'], [9.0, 17.4, 'Los de adentro también cuentan', 'sostienen a los de arriba'], [18.0, 26.4, 'Contar columnas', 'la altura de cada columna, sumada']],
      narr: [[0.8, 8.4, 'En estas construcciones los cubos no flotan: si se ve uno arriba, debajo hay otro que lo sostiene.'], [9.0, 17.4, 'Los cubos escondidos detrás o debajo también cuentan, aunque no aparezcan en el dibujo.'], [18.0, 26.4, 'Una forma segura es contar columnas: la altura de cada columna, y sumarlas todas.']] },
    { id: 'vistas', name: 'TRES VISTAS', dur: 30,
      caps: [[0.8, 9.4, 'De frente, de lado y desde arriba', 'tres sombras de la misma construcción'], [10.0, 19.4, 'Arriba: qué casillas tienen cubos', 'de frente y de lado: las alturas máximas'], [20.0, 29.4, 'Cada vista: la columna más alta', 'en cada fila de mirada']],
      narr: [[0.8, 9.4, 'Una construcción de cubos se puede mirar de frente, de lado y desde arriba: son como tres sombras.'], [10.0, 19.4, 'Desde arriba se ve qué casillas tienen cubos. De frente y de lado se ve la altura de las columnas.'], [20.0, 29.4, 'Pero cada vista solo muestra la columna más alta de cada fila que se mira: las más bajas quedan tapadas.']] },
    { id: 'maximo', name: 'EL MÁXIMO DE CUBITOS', dur: 30,
      caps: [[0.8, 9.4, 'Base de 3 × 3, todas con cubos', 'frente: 3, 1, 2 · lado: 2, 3, 1'], [10.0, 19.4, 'Cada columna, lo más alta posible', 'el menor de los dos límites que la tocan'], [20.0, 29.4, '5 + 6 + 3 = 14 cubitos', 'la mayor cantidad posible']],
      narr: [[0.8, 9.4, 'Otro problema: sobre una base de tres por tres, todas las casillas tienen cubos. De frente las alturas se ven tres, uno, dos; de lado, dos, tres, uno.'], [10.0, 19.4, 'Cada columna puede ser tan alta como permitan las dos vistas que la atraviesan: el menor de los dos números.'], [20.0, 29.4, 'Sumando fila por fila: cinco, seis y tres. Catorce cubitos es la mayor cantidad posible.']] },
    { id: 'minimo', name: 'Y EL MÍNIMO', dur: 28,
      caps: [[0.8, 8.4, 'Con las mismas vistas, lo menos', 'cada casilla de la base: al menos 1'], [9.0, 17.4, 'Una columna de 3 y una de 2', 'cumplen dos vistas a la vez'], [18.0, 26.4, '9 + 2 + 1 = 12', 'las vistas no fijan una sola construcción']],
      narr: [[0.8, 8.4, 'Con las mismas vistas, se puede usar menos: cada casilla de la base necesita al menos un cubo.'], [9.0, 17.4, 'Una sola columna de tres sirve para el tres del frente y el tres del lado, y una de dos sirve para los dos doses.'], [18.0, 26.4, 'Nueve de la base más dos más uno: doce. Las vistas no dicen exactamente cuántos cubos hay: hay que leer la pregunta.']] },
    { id: 'pintado3', name: 'UN LADRILLO PINTADO', dur: 30,
      caps: [[0.8, 9.4, 'Un ladrillo de 3 × 3 × 2', 'pintado por fuera y cortado: 18 cubitos'], [10.0, 19.4, 'Esquinas: 8 · aristas: 8', 'y el centro de cada cara grande: 2'], [20.0, 29.4, '8 + 8 + 2 = 18', 'tan delgado que ninguno queda sin pintar']],
      narr: [[0.8, 9.4, 'Un ladrillo de tres por tres por dos se pinta por fuera y se corta en dieciocho cubitos. Las caras rojas de cada uno dependen de dónde estaba.'], [10.0, 19.4, 'Las ocho esquinas tienen tres caras. En la mitad de cada arista larga hay un cubito con dos: ocho. El centro de cada cara grande tiene una.'], [20.0, 29.4, 'Ocho más ocho más dos: dieciocho. Como el ladrillo tiene solo dos de grosor, ningún cubito queda sin pintar.']] },
    { id: 'formula', name: 'PARA CUALQUIER CUBO', dur: 28,
      caps: [[0.8, 8.4, 'Esquinas: siempre 8', 'un cubo tiene ocho vértices'], [9.0, 17.4, 'Dos caras: 12 · (n − 2)', 'en cada arista, sin sus dos esquinas'], [18.0, 26.4, 'Una cara: 6(n−2)²; ninguna: (n−2)³', 'el centro de cada cara y el corazón']],
      narr: [[0.8, 8.4, 'Para un cubo de lado ene, las esquinas son siempre ocho, una por vértice.'], [9.0, 17.4, 'Con dos caras están los cubitos de las aristas sin sus esquinas: doce aristas por ene menos dos.'], [18.0, 26.4, 'Con una cara, el centro de cada una de las seis caras; y sin pintura, el cubo de adentro, de lado ene menos dos.']] },
    { id: 'resolver', name: 'EL CUBO DE 6, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'En cada arista hay 6 cubitos', 'los 2 de los extremos son esquinas'], [10.0, 19.4, 'Quedan 4 por arista', 'con exactamente dos caras rojas'], [20.0, 29.4, '12 aristas · 4 = 48', '8 + 48 + 96 + 64 = 216']],
      narr: [[0.8, 9.4, 'Volvamos al reto. En cada arista del cubo de seis hay seis cubitos, y los de los extremos son esquinas, con tres caras.'], [10.0, 19.4, 'Quedan cuatro cubitos por arista con exactamente dos caras pintadas.'], [20.0, 29.4, 'Doce aristas por cuatro: cuarenta y ocho. Y se comprueba: ocho, cuarenta y ocho, noventa y seis y sesenta y cuatro suman doscientos dieciséis.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Son 48 cubitos', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cuarenta y ocho. Cuatro por cada una de las doce aristas.'], [11.0, 20.4, 'Contar por capas o por columnas, leer cada vista como la columna más alta, y clasificar cubitos por su lugar.'], [21.0, 29.4, 'Lo que no se ve también se cuenta.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 6', TITLE = 'VISTAS Y CUBOS', LINE = 'Lo que no se ve también se cuenta.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-es-2', KEYS: ['48', 'ladrillo', 'pirámide'] };
})();
if (typeof module !== 'undefined') module.exports = D;
