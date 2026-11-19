// «Volúmenes y superficies» · Preuniversitario, razonamiento lógico, mundo 2 (Geometría), lección pu-ge-6. Datos puros.
// Reto: la vela cilíndrica (r 3, h 8) que se funde en conos (r 1, h 2): 108 velas. En medio: base por altura en capas, el
// cilindro como pila de monedas, el cono es un tercio, la esfera de Arquímedes, la caja de cartón de 20 × 14 con esquinas de 3
// (336 cm³), la superficie de un cubo (150 cm² → arista 5 → 125 cm³) y la piedra que sube el agua 2 cm (200π).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA VELA FUNDIDA', dur: 30,
      caps: [[1.0, 9.4, 'Una vela cilíndrica', 'radio 3 cm y altura 8 cm'], [10.0, 19.4, 'Se funde en velitas de cono', 'radio 1 cm y altura 2 cm, sin perder cera'], [20.0, 29.4, 'Cuatro opciones', 'al final la resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una vela de cera tiene forma de cilindro, con radio tres y altura ocho centímetros.'], [10.0, 19.4, 'Se derrite toda para hacer velitas en forma de cono, de radio uno y altura dos. No se pierde cera. Hay que contar cuántas salen.'], [20.0, 29.4, 'La cera que hay antes es la misma que hay después: es una pregunta de volúmenes. Al final la resolvemos.']] },
    { id: 'capas', name: 'BASE POR ALTURA', dur: 28,
      caps: [[0.8, 8.4, 'Una caja se llena por capas', 'la base de 4 · 3 tiene 12 cubitos'], [9.0, 17.4, 'Cinco capas iguales', '12 · 5 = 60 cubitos'], [18.0, 26.4, 'V = área de la base · altura', 'vale para todo prisma']],
      narr: [[0.8, 8.4, 'Una caja se llena de cubitos por capas. En el fondo, de cuatro por tres, caben doce.'], [9.0, 17.4, 'Si la caja tiene cinco de alto, caben cinco capas iguales: sesenta cubitos.'], [18.0, 26.4, 'El volumen de cualquier prisma es el área de la base por la altura: cuántos caben en una capa, por cuántas capas.']] },
    { id: 'cilindro', name: 'EL CILINDRO', dur: 28,
      caps: [[0.8, 8.4, 'Una pila de monedas', 'cada capa es un círculo'], [9.0, 17.4, 'V = π · r² · h', 'base circular por altura'], [18.0, 26.4, 'Radio 4, altura 3', 'π · 16 · 3 = 48π']],
      narr: [[0.8, 8.4, 'Un cilindro es como una pila de monedas: todas sus capas son círculos iguales.'], [9.0, 17.4, 'Así que su volumen también es base por altura: pi por el radio al cuadrado, por la altura.'], [18.0, 26.4, 'Un cilindro de radio cuatro y altura tres: pi por dieciséis por tres, cuarenta y ocho pi.']] },
    { id: 'tercio', name: 'EL CONO: UN TERCIO', dur: 28,
      caps: [[0.8, 8.4, 'Un cono y un cilindro', 'misma base y misma altura'], [9.0, 17.4, 'Tres conos llenos', 'llenan justo el cilindro'], [18.0, 26.4, 'V = ⅓ · π · r² · h', 'igual para la pirámide frente al prisma']],
      narr: [[0.8, 8.4, 'Un cono y un cilindro con la misma base y la misma altura. El cono se adelgaza hasta la punta.'], [9.0, 17.4, 'Se llena el cono de agua y se vacía en el cilindro. Hacen falta exactamente tres conos para llenarlo.'], [18.0, 26.4, 'El volumen del cono es un tercio de base por altura. Lo mismo vale para una pirámide frente a su prisma.']] },
    { id: 'esfera', name: 'LA ESFERA', dur: 28,
      caps: [[0.8, 8.4, 'Una esfera dentro de un cilindro', 'lo toca arriba, abajo y por los lados'], [9.0, 17.4, 'Ocupa dos tercios del cilindro', 'el descubrimiento de Arquímedes'], [18.0, 26.4, 'V = ⁴⁄₃ · π · r³', 'radio 6: 288π']],
      narr: [[0.8, 8.4, 'Una esfera cabe justa dentro de un cilindro: lo toca arriba, abajo y por los lados.'], [9.0, 17.4, 'Arquímedes descubrió que ocupa exactamente dos tercios del cilindro. Lo consideró su mayor hallazgo.'], [18.0, 26.4, 'De ahí sale la fórmula: cuatro tercios de pi por el radio al cubo. Una esfera de radio seis tiene doscientos ochenta y ocho pi.']] },
    { id: 'caja', name: 'LA CAJA DE CARTÓN', dur: 30,
      caps: [[0.8, 9.4, 'Una lámina de 20 cm por 14 cm', 'se recorta un cuadrado de 3 cm en cada esquina'], [10.0, 19.4, 'Se doblan los bordes', 'base de 14 por 8, altura 3'], [20.0, 29.4, '14 · 8 · 3 = 336', 'el volumen de la caja, en cm³']],
      narr: [[0.8, 9.4, 'Otro problema: de una lámina de cartón de veinte por catorce se recorta un cuadrado de tres en cada esquina, y se doblan los bordes.'], [10.0, 19.4, 'Cada lado pierde dos esquinas: veinte menos seis, catorce; catorce menos seis, ocho. Los bordes doblados dan la altura, tres.'], [20.0, 29.4, 'El volumen es catorce por ocho por tres: trescientos treinta y seis centímetros cúbicos.']] },
    { id: 'superficie', name: 'LA SUPERFICIE', dur: 28,
      caps: [[0.8, 8.4, 'Un cubo se desdobla', 'seis caras cuadradas iguales'], [9.0, 17.4, 'Superficie 150 cm²', 'cada cara: 150 / 6 = 25; arista 5'], [18.0, 26.4, 'Volumen 5 · 5 · 5 = 125', 'superficie se mide en cm², volumen en cm³']],
      narr: [[0.8, 8.4, 'La superficie de un cubo es el papel que lo envuelve. Si se desdobla, quedan seis caras cuadradas iguales.'], [9.0, 17.4, 'Si toda la superficie mide ciento cincuenta, cada cara mide veinticinco, y la arista mide cinco.'], [18.0, 26.4, 'El volumen es cinco por cinco por cinco: ciento veinticinco. La superficie va en centímetros cuadrados; el volumen, en cúbicos.']] },
    { id: 'piedra', name: 'LA PIEDRA EN EL AGUA', dur: 28,
      caps: [[0.8, 8.4, 'Un recipiente de radio 10 cm', 'se sumerge una piedra'], [9.0, 17.4, 'El agua sube 2 cm', 'la piedra ocupa ese espacio'], [18.0, 26.4, 'π · 10² · 2 = 200π', 'el volumen de la piedra, en cm³']],
      narr: [[0.8, 8.4, 'Un recipiente cilíndrico de radio diez tiene agua. Se mete una piedra hasta el fondo.'], [9.0, 17.4, 'El nivel del agua sube dos centímetros: la piedra empujó el agua hacia arriba y ocupa su lugar.'], [18.0, 26.4, 'Ese volumen es un cilindro de radio diez y altura dos: doscientos pi. Así se mide una figura que no tiene fórmula.']] },
    { id: 'resolver', name: 'LA VELA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'La vela: π · 9 · 8 = 72π', 'cilindro de radio 3 y altura 8'], [10.0, 19.4, 'Una velita: ⅓ · π · 1 · 2', 'cada cono tiene 2π/3'], [20.0, 29.4, '72π ÷ (2π/3) = 108', 'π se cancela: 72 · 3 / 2']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La vela es un cilindro de radio tres y altura ocho: pi por nueve por ocho, setenta y dos pi.'], [10.0, 19.4, 'Cada velita es un cono de radio uno y altura dos: un tercio de pi por uno por dos, dos tercios de pi.'], [20.0, 29.4, 'Setenta y dos pi entre dos tercios de pi: pi se cancela y queda setenta y dos por tres medios. Salen ciento ocho velitas.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Salen 108 velitas', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: ciento ocho. La cera no cambia: se reparte en otra forma.'], [11.0, 20.4, 'Base por altura; un tercio para conos y pirámides; cuatro tercios de pi r al cubo para la esfera; y la superficie, cara por cara.'], [21.0, 29.4, 'Se llena por capas; se envuelve por caras.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 2', TITLE = 'VOLÚMENES Y SUPERFICIES', LINE = 'Se llena por capas; se envuelve por caras.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ge-6', KEYS: ['108', '336', '150', '200π', '48π', '288π'] };
})();
if (typeof module !== 'undefined') module.exports = D;
