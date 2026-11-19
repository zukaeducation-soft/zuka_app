// «Semejanza y escala» · Preuniversitario, razonamiento lógico, mundo 2 (Geometría), lección pu-ge-3. Datos puros.
// Reto: el vaso cónico lleno hasta la mitad de su altura (1/8 del volumen). En medio: misma forma, Tales, sombras (poste de
// 3 m y sombra de 4 m; edificio con sombra de 28 m → 21 m), áreas por k², lado + 30 % → área + 69 %, volúmenes por k³.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL VASO A MEDIAS', dur: 30,
      caps: [[1.0, 9.4, 'Un vaso en forma de cono', 'con la punta hacia abajo'], [10.0, 19.4, 'Agua hasta la mitad de la altura', 'qué fracción del vaso ocupa'], [20.0, 29.4, 'Cuatro opciones', 'la intuición dice un medio; al final se verá']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un vaso tiene forma de cono, con la punta hacia abajo.'], [10.0, 19.4, 'Se llena de agua hasta la mitad de su altura. Hay que decir qué fracción del volumen del vaso ocupa el agua.'], [20.0, 29.4, 'La primera idea es un medio, pero el vaso es angosto abajo y ancho arriba. La clave es la semejanza. Al final lo resolvemos.']] },
    { id: 'forma', name: 'MISMA FORMA, OTRO TAMAÑO', dur: 28,
      caps: [[0.8, 8.4, 'Dos figuras semejantes', 'todas las medidas por el mismo número k'], [9.0, 17.4, 'Estirar solo el ancho deforma', 'eso ya no es semejanza'], [18.0, 26.4, 'Los ángulos no cambian', 'cambian las longitudes, en la misma razón']],
      narr: [[0.8, 8.4, 'Dos figuras son semejantes si una es la otra ampliada o reducida: todas sus longitudes se multiplican por el mismo número, la razón k.'], [9.0, 17.4, 'Si solo se estira el ancho, como una foto mal ajustada, la figura se deforma: ya no es semejante.'], [18.0, 26.4, 'En las semejantes los ángulos se conservan. Solo cambian las longitudes, y todas en la misma razón.']] },
    { id: 'tales', name: 'UN CORTE PARALELO', dur: 30,
      caps: [[0.8, 9.4, 'Un corte paralelo a la base', 'deja un triángulo pequeño adentro'], [10.0, 19.4, 'Los dos son semejantes', 'mismos ángulos, lados proporcionales'], [20.0, 29.4, '6 / 4 = 9 / 6 = 1.5', 'la razón k es la misma en todos los lados']],
      narr: [[0.8, 9.4, 'Si a un triángulo se le hace un corte paralelo a la base, adentro queda un triángulo más pequeño.'], [10.0, 19.4, 'Tiene los mismos ángulos que el grande, así que los dos son semejantes y sus lados son proporcionales.'], [20.0, 29.4, 'Un lado pasa de cuatro a seis; el otro, de seis a nueve. En los dos la razón es uno coma cinco.']] },
    { id: 'sombras', name: 'EL POSTE Y EL EDIFICIO', dur: 30,
      caps: [[0.8, 9.4, 'Poste de 3 m, sombra de 4 m', 'el edificio da una sombra de 28 m'], [10.0, 19.4, 'Los rayos del sol son paralelos', 'los dos triángulos son semejantes'], [20.0, 29.4, '28 es 7 veces 4', 'el edificio mide 7 · 3 = 21 m']],
      narr: [[0.8, 9.4, 'Otro problema: un poste de tres metros da una sombra de cuatro. A la misma hora, un edificio da una sombra de veintiocho. Hay que hallar su altura.'], [10.0, 19.4, 'A la misma hora los rayos del sol llegan paralelos. Poste, sombra y rayo forman un triángulo semejante al del edificio.'], [20.0, 29.4, 'La sombra del edificio es siete veces la del poste, así que su altura también: siete por tres, veintiún metros.']] },
    { id: 'area', name: 'LAS ÁREAS: k²', dur: 28,
      caps: [[0.8, 8.4, 'Se duplica el lado', 'caben cuatro cuadrados, no dos'], [9.0, 17.4, 'Lado por 3: área por 9', 'el área crece a lo largo y a lo ancho'], [18.0, 26.4, 'Longitudes por k, áreas por k²', 'vale para cualquier figura']],
      narr: [[0.8, 8.4, 'Si el lado de un cuadrado se duplica, el cuadrado grande se llena con cuatro de los pequeños, no con dos.'], [9.0, 17.4, 'Si el lado se triplica, caben nueve. El área crece dos veces: a lo largo y a lo ancho.'], [18.0, 26.4, 'Cuando las longitudes se multiplican por k, las áreas se multiplican por k al cuadrado, en cualquier figura.']] },
    { id: 'lado30', name: 'EL LADO CRECE 30 %', dur: 30,
      caps: [[0.8, 9.4, 'El lado aumenta 30 %', 'cuánto aumenta el área'], [10.0, 19.4, '10 × 10 pasa a 13 × 13', '100 casillas pasan a 169'], [20.0, 29.4, '1.3² = 1.69', 'el área aumenta 69 %']],
      narr: [[0.8, 9.4, 'Otro problema: el lado de un cuadrado aumenta en un treinta por ciento. Hay que decir en cuánto aumenta su área.'], [10.0, 19.4, 'Se toma un lado de diez. Con el treinta por ciento más mide trece: el área pasa de cien a ciento sesenta y nueve.'], [20.0, 29.4, 'Se agregaron dos franjas de treinta y una esquina de nueve: sesenta y nueve. Uno coma tres al cuadrado es uno coma sesenta y nueve.']] },
    { id: 'volumen', name: 'LOS VOLÚMENES: k³', dur: 28,
      caps: [[0.8, 8.4, 'Cubo de arista doble', 'caben 2 · 2 · 2 = 8 cubitos'], [9.0, 17.4, 'Arista triple: 27 cubitos', 'largo, ancho y alto crecen a la vez'], [18.0, 26.4, 'Volúmenes por k³', 'y el peso también, si el material es igual']],
      narr: [[0.8, 8.4, 'Si la arista de un cubo se duplica, caben ocho cubitos: dos a lo largo, dos a lo ancho y dos de alto.'], [9.0, 17.4, 'Con la arista triple caben veintisiete. Ahora crecen tres medidas a la vez.'], [18.0, 26.4, 'Los volúmenes se multiplican por k al cubo, y el peso también, si el material es el mismo.']] },
    { id: 'tabla', name: 'k, k² Y k³', dur: 28,
      caps: [[0.8, 8.4, 'Ampliar: k = 2', 'longitud × 2, área × 4, volumen × 8'], [9.0, 17.4, 'Reducir: k = 1/2', 'longitud × 1/2, área × 1/4, volumen × 1/8'], [18.0, 26.4, 'Primero se halla k', 'después se eleva según lo que se mide']],
      narr: [[0.8, 8.4, 'Si una figura se amplía al doble, las longitudes se duplican, el área se multiplica por cuatro y el volumen por ocho.'], [9.0, 17.4, 'Si se reduce a la mitad, las longitudes se dividen entre dos, el área entre cuatro y el volumen entre ocho.'], [18.0, 26.4, 'El método: primero hallar la razón k con dos longitudes, y luego elevarla según lo que se mide.']] },
    { id: 'resolver', name: 'EL VASO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'El agua forma otro cono', 'semejante al vaso'], [10.0, 19.4, 'Altura a la mitad: k = 1/2', 'el radio del agua también es la mitad'], [20.0, 29.4, '(1/2)³ = 1/8', 'el agua ocupa un octavo del vaso']],
      narr: [[0.8, 9.4, 'Volvamos al reto. El agua dentro del vaso forma otro cono, con la misma punta y la misma forma: es semejante al vaso.'], [10.0, 19.4, 'Su altura es la mitad de la del vaso, así que la razón es un medio, y el radio de la superficie del agua también es la mitad.'], [20.0, 29.4, 'Los volúmenes van con k al cubo: un medio al cubo es un octavo. Casi todo el vaso está en su parte ancha, la de arriba.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El agua ocupa 1/8', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: un octavo. La mitad de la altura no es la mitad del volumen.'], [11.0, 20.4, 'Figuras semejantes: longitudes por k, áreas por k al cuadrado y volúmenes por k al cubo.'], [21.0, 29.4, 'Misma forma, otra escala: k, k² y k³.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 2', TITLE = 'SEMEJANZA Y ESCALA', LINE = 'Misma forma, otra escala: k, k² y k³.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ge-3', KEYS: ['28', '21', '69', '1.69', '1/8'] };
})();
if (typeof module !== 'undefined') module.exports = D;
