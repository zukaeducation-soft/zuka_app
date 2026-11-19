// «Máximos y mínimos» · Preuniversitario, razonamiento lógico, mundo 12 (Aritmética), lección pu-ar-4. Datos puros.
// Reto: el cajón oscuro con 10 medias negras, 8 azules y 6 grises; para tener con certeza tres del mismo color → 7. En medio: la peor
// suerte (13 personas: dos cumplen en el mismo mes), tres en el mismo mes (25), la urna (12 rojas, 9 verdes, 7 azules: una de cada
// color → 22), cinco enteros distintos que suman 30 (el mayor, 20), el mayor producto con suma 21 (110), la pintura en razón 3 : 5
// con 12 L de azul y 15 de amarilla (24 L) y la cuadrícula de 3 × 3 sin vecinas (5).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL CAJÓN OSCURO', dur: 30,
      caps: [[1.0, 9.4, '10 negras, 8 azules y 6 grises', 'medias sueltas en un cajón oscuro'], [10.0, 19.4, 'Se sacan sin mirar', 'hasta tener tres del mismo color'], [20.0, 29.4, 'La menor cantidad que lo asegura', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En un cajón oscuro hay diez medias negras, ocho azules y seis grises, todas sueltas.'], [10.0, 19.4, 'Se sacan sin mirar. Se quiere tener la certeza de obtener por lo menos tres del mismo color.'], [20.0, 29.4, 'Hay que hallar la menor cantidad que lo asegura, pase lo que pase. Al final lo resolvemos.']] },
    { id: 'peor', name: 'PENSAR EN LA PEOR SUERTE', dur: 28,
      caps: [[0.8, 8.4, 'Certeza: tiene que pasar siempre', 'aun con la peor suerte'], [9.0, 17.4, '12 personas, 12 meses distintos', 'una por mes, sin repetir'], [18.0, 26.4, 'La persona 13 repite un mes', 'con 13, dos comparten mes seguro']],
      narr: [[0.8, 8.4, 'Para tener certeza, hay que pensar en la peor suerte posible: lo que se busca tiene que pasar siempre.'], [9.0, 17.4, 'Doce personas pueden cumplir años cada una en un mes distinto. Con doce todavía no es seguro que dos compartan mes.'], [18.0, 26.4, 'Pero la persona trece tiene que caer en un mes ocupado. Con trece, es seguro.']] },
    { id: 'tres', name: 'TRES EN EL MISMO MES', dur: 28,
      caps: [[0.8, 8.4, 'Para tres en el mismo mes', 'la peor suerte llena cada mes con dos'], [9.0, 17.4, '2 · 12 = 24 personas', 'sin ningún mes con tres'], [18.0, 26.4, 'La 25 completa un trío', 'peor caso + 1']],
      narr: [[0.8, 8.4, 'Si se quieren tres personas en el mismo mes, la peor suerte pone dos en cada mes.'], [9.0, 17.4, 'Dos por doce: veinticuatro personas sin que ningún mes tenga tres.'], [18.0, 26.4, 'La persona veinticinco completa un trío. La regla: contar el peor caso y sumar uno.']] },
    { id: 'urna', name: 'UNA DE CADA COLOR', dur: 30,
      caps: [[0.8, 9.4, '12 rojas, 9 verdes y 7 azules', 'se quiere al menos una de cada color'], [10.0, 19.4, 'Peor suerte: salen las 12 rojas', 'y luego las 9 verdes'], [20.0, 29.4, '12 + 9 + 1 = 22', 'la siguiente es azul seguro']],
      narr: [[0.8, 9.4, 'Otro problema: en una urna hay doce bolas rojas, nueve verdes y siete azules. Se quiere tener con certeza por lo menos una de cada color.'], [10.0, 19.4, 'La peor suerte saca primero todas las de los dos colores más abundantes: las doce rojas y las nueve verdes.'], [20.0, 29.4, 'Ya van veintiuna, y la siguiente tiene que ser azul. Hacen falta veintidós.']] },
    { id: 'reparto', name: 'EL MÁS GRANDE POSIBLE', dur: 30,
      caps: [[0.8, 9.4, 'Cinco enteros positivos distintos', 'que suman 30'], [10.0, 19.4, 'Para que uno sea grande', 'los otros cuatro, lo más pequeños: 1, 2, 3, 4'], [20.0, 29.4, '30 − 10 = 20', 'el más grande puede ser 20']],
      narr: [[0.8, 9.4, 'Otro problema: cinco números enteros positivos, todos distintos, suman treinta. Hay que hallar el mayor valor que puede tomar el más grande.'], [10.0, 19.4, 'Para que uno sea lo más grande posible, los otros cuatro deben ser lo más pequeños posible: uno, dos, tres y cuatro.'], [20.0, 29.4, 'Ellos suman diez, así que el más grande puede llegar a veinte.']] },
    { id: 'producto', name: 'EL MAYOR PRODUCTO', dur: 28,
      caps: [[0.8, 8.4, 'Dos enteros que suman 21', 'cuál es su mayor producto'], [9.0, 17.4, '1 · 20 = 20 · 5 · 16 = 80 · 10 · 11', '110: el producto crece al acercarse'], [18.0, 26.4, 'Lo más parejo posible', 'como el rectángulo que se acerca al cuadrado']],
      narr: [[0.8, 8.4, 'Ahora un máximo de otro tipo: dos números enteros positivos suman veintiuno. Se busca el mayor producto.'], [9.0, 17.4, 'Uno por veinte da veinte; cinco por dieciséis, ochenta; diez por once, ciento diez. El producto crece cuando los números se acercan.'], [18.0, 26.4, 'El máximo está en lo más parejo posible, como un rectángulo de perímetro fijo que se acerca al cuadrado.']] },
    { id: 'pintura', name: 'EL INGREDIENTE QUE LIMITA', dur: 28,
      caps: [[0.8, 8.4, 'Azul y amarilla en razón 3 : 5', 'hay 12 L de azul y 15 de amarilla'], [9.0, 17.4, 'La amarilla alcanza para 3 tandas', 'la azul alcanzaría para 4'], [18.0, 26.4, '3 tandas: 9 L azul + 15 L amarilla', 'la mayor cantidad: 24 L']],
      narr: [[0.8, 8.4, 'Para preparar pintura verde se mezclan azul y amarilla en razón tres a cinco. Hay doce litros de azul y quince de amarilla.'], [9.0, 17.4, 'Cada tanda usa tres de azul y cinco de amarilla. La amarilla alcanza para tres tandas; la azul alcanzaría para cuatro.'], [18.0, 26.4, 'Manda la que se acaba primero: tres tandas, nueve litros de azul y quince de amarilla. Veinticuatro litros.']] },
    { id: 'tablero', name: 'SIN CASILLAS VECINAS', dur: 28,
      caps: [[0.8, 8.4, 'Cuadrícula de 3 × 3', 'colorear sin que dos compartan lado'], [9.0, 17.4, 'Las cuatro esquinas y el centro', '5 casillas'], [18.0, 26.4, 'Con 6, dos quedarían vecinas', 'el máximo es 5']],
      narr: [[0.8, 8.4, 'Un máximo con dibujo: en una cuadrícula de tres por tres se colorean casillas sin que dos compartan un lado.'], [9.0, 17.4, 'Como en un tablero de ajedrez: las cuatro esquinas y el centro. Cinco casillas.'], [18.0, 26.4, 'Si se intenta con seis, siempre quedan dos vecinas. El máximo es cinco.']] },
    { id: 'resolver', name: 'EL CAJÓN, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Peor suerte: dos de cada color', '2 negras, 2 azules, 2 grises'], [10.0, 19.4, 'Con 6 medias, todavía no hay tres', 'la séptima repite un color por tercera vez'], [20.0, 29.4, '2 · 3 + 1 = 7', 'no importa cuántas haya de cada color']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La peor suerte saca dos de cada color: dos negras, dos azules y dos grises.'], [10.0, 19.4, 'Con seis medias todavía no hay tres iguales. La séptima tiene que repetir un color por tercera vez.'], [20.0, 29.4, 'Dos por tres más uno: siete. Que haya diez negras u ocho azules no cambia nada.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Hay que sacar 7 medias', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: siete medias.'], [11.0, 20.4, 'Para certeza, el peor caso más uno; para un máximo, los demás al mínimo; lo parejo da el mayor producto, y manda lo que se acaba primero.'], [21.0, 29.4, 'Para estar seguro, imagina la peor suerte.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 12', TITLE = 'MÁXIMOS Y MÍNIMOS', LINE = 'Para estar seguro, imagina la peor suerte.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ar-4', KEYS: ['urna', 'pintura', 'mes', '110'] };
})();
if (typeof module !== 'undefined') module.exports = D;
