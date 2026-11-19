// «Triángulos y Pitágoras» · Preuniversitario, razonamiento lógico, mundo 2 (Geometría), lección pu-ge-2. Datos puros.
// Reto: la escalera de 13 m con la base a 5 m que se aleja 7 m más (la punta baja 7 m). En medio: los cuadrados sobre los
// lados, ternas, agudo / recto / obtuso, la desigualdad triangular (5 y 9 → 9 valores), el rombo de diagonales 10 y 24 y los
// triángulos de 45° y de 30°-60°.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA ESCALERA QUE RESBALA', dur: 30,
      caps: [[1.0, 9.4, 'La escalera que resbala', '13 m de largo, con la base a 5 m de la pared'], [10.0, 19.4, 'La base se aleja 7 m más', 'la punta baja: falta saber cuánto'], [20.0, 29.4, 'Cuatro opciones', 'al final la resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una escalera de trece metros está apoyada en una pared, con la base a cinco metros.'], [10.0, 19.4, 'La base resbala y se aleja siete metros más de la pared. La punta de la escalera baja; hay que saber cuánto.'], [20.0, 29.4, 'La tentación es decir que baja lo mismo que se alejó. Para saberlo de verdad hace falta Pitágoras. Al final lo resolvemos.']] },
    { id: 'cuadrados', name: 'CUADRADOS SOBRE LOS LADOS', dur: 30,
      caps: [[0.8, 9.4, 'Un cuadrado en cada lado', 'catetos 5 y 12; hipotenusa 13'], [10.0, 19.4, '25 + 144 = 169', 'los dos pequeños llenan el grande'], [20.0, 29.4, 'c² = a² + b²', 'solo en triángulos con un ángulo recto']],
      narr: [[0.8, 9.4, 'En un triángulo rectángulo, los lados que forman el ángulo recto se llaman catetos; el lado largo, hipotenusa. Sobre cada lado se dibuja un cuadrado.'], [10.0, 19.4, 'Los cuadrados de los catetos ocupan veinticinco y ciento cuarenta y cuatro. Juntos llenan exactamente el de la hipotenusa: ciento sesenta y nueve.'], [20.0, 29.4, 'Ese es el teorema de Pitágoras: hipotenusa al cuadrado igual a la suma de los cuadrados de los catetos. Vale solo si hay un ángulo recto.']] },
    { id: 'tipos', name: 'AGUDO, RECTO U OBTUSO', dur: 28,
      caps: [[0.8, 8.4, 'Se abre la bisagra', 'los mismos lados 5 y 12, otro ángulo'], [9.0, 17.4, 'Ángulo recto: c² = 169', 'más cerrado, menos; más abierto, más'], [18.0, 26.4, 'El cuadrado delata el ángulo', 'menor: agudo · igual: recto · mayor: obtuso']],
      narr: [[0.8, 8.4, 'Ahora los lados cinco y doce forman una bisagra. Al abrirla, el tercer lado se estira.'], [9.0, 17.4, 'Solo cuando el ángulo es recto el tercer lado al cuadrado da ciento sesenta y nueve. Si se cierra, da menos; si se abre, da más.'], [18.0, 26.4, 'Así se reconoce un triángulo sin medir ángulos: se compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos.']] },
    { id: 'ternas', name: 'TERNAS PITAGÓRICAS', dur: 28,
      caps: [[0.8, 8.4, 'Ternas que conviene reconocer', '3-4-5, 5-12-13, 8-15-17'], [9.0, 17.4, 'Sus múltiplos también sirven', '3-4-5 por 2: 6-8-10; por 3: 9-12-15'], [18.0, 26.4, 'Sumar catetos no da la hipotenusa', '5 + 12 = 17, no 13']],
      narr: [[0.8, 8.4, 'Algunos triángulos rectángulos tienen todos sus lados enteros: tres, cuatro, cinco; cinco, doce, trece; ocho, quince, diecisiete.'], [9.0, 17.4, 'Si se multiplican los tres lados por el mismo número, el triángulo sigue siendo rectángulo: seis, ocho, diez o nueve, doce, quince.'], [18.0, 26.4, 'Y una trampa clásica: la hipotenusa no es la suma de los catetos. El camino recto siempre es más corto que la esquina.']] },
    { id: 'desigualdad', name: 'CERRAR EL TRIÁNGULO', dur: 30,
      caps: [[0.8, 9.4, 'Lados de 5 y 9', 'el tercero es entero: cuántos valores caben'], [10.0, 19.4, 'Entre 9 − 5 y 9 + 5', 'aplastado mide 4 o 14: ahí ya no cierra'], [20.0, 29.4, 'De 5 a 13: nueve valores', 'cada lado, menor que la suma de los otros']],
      narr: [[0.8, 9.4, 'Otro problema: dos lados de un triángulo miden cinco y nueve centímetros, y el tercero es un número entero. Hay que contar cuántos valores puede tener.'], [10.0, 19.4, 'Se gira el lado de cinco. Si queda acostado, el tercer lado mide cuatro o catorce, pero entonces no hay triángulo: se aplasta en una línea.'], [20.0, 29.4, 'El tercer lado está estrictamente entre cuatro y catorce: de cinco a trece hay nueve enteros. Cada lado es menor que la suma de los otros dos.']] },
    { id: 'rombo', name: 'EL ROMBO', dur: 30,
      caps: [[0.8, 9.4, 'Diagonales de 10 y 24', 'falta el perímetro del rombo'], [10.0, 19.4, 'Se cortan a la mitad, en cruz', 'cuatro triángulos de catetos 5 y 12'], [20.0, 29.4, 'Cada lado mide 13', 'perímetro: 4 · 13 = 52 cm']],
      narr: [[0.8, 9.4, 'Otro problema: las diagonales de un rombo miden diez y veinticuatro centímetros. Hay que hallar su perímetro.'], [10.0, 19.4, 'Las diagonales de un rombo se cortan por la mitad y en ángulo recto. Quedan cuatro triángulos rectángulos con catetos cinco y doce.'], [20.0, 29.4, 'Es la terna cinco, doce, trece: cada lado del rombo mide trece. Los cuatro lados suman cincuenta y dos centímetros.']] },
    { id: 'cuarenta', name: 'EL TRIÁNGULO DE 45°', dur: 28,
      caps: [[0.8, 8.4, 'Un cuadrado y su diagonal', 'dos triángulos de 45°, 45° y 90°'], [9.0, 17.4, 'Lados x, x y x√2', 'x² + x² = 2x²'], [18.0, 26.4, 'Cuadrado de lado 7', 'su diagonal mide 7√2 ≈ 9.9']],
      narr: [[0.8, 8.4, 'La diagonal de un cuadrado lo parte en dos triángulos iguales, con ángulos de cuarenta y cinco, cuarenta y cinco y noventa.'], [9.0, 17.4, 'Sus catetos miden lo mismo, equis. La hipotenusa al cuadrado es dos equis al cuadrado: mide equis por raíz de dos.'], [18.0, 26.4, 'Un cuadrado de lado siete tiene diagonal de siete raíz de dos, casi diez. Es un poco menos que una vez y media el lado.']] },
    { id: 'treinta', name: 'EL TRIÁNGULO DE 30° Y 60°', dur: 28,
      caps: [[0.8, 8.4, 'Un equilátero partido a la mitad', 'ángulos de 30°, 60° y 90°'], [9.0, 17.4, 'Lados x, x√3 y 2x', 'el corto es la mitad del largo'], [18.0, 26.4, 'Equilátero de lado 8', 'su altura mide 4√3 ≈ 6.9']],
      narr: [[0.8, 8.4, 'Un triángulo equilátero tiene los tres ángulos de sesenta. Su altura lo parte en dos triángulos de treinta, sesenta y noventa.'], [9.0, 17.4, 'La hipotenusa es el lado del equilátero, dos equis, y el cateto corto, la mitad, equis. Por Pitágoras, la altura mide equis raíz de tres.'], [18.0, 26.4, 'Así, un equilátero de lado ocho tiene altura cuatro raíz de tres, casi siete. No hace falta medirla.']] },
    { id: 'resolver', name: 'LA ESCALERA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Antes: base 5, punta a 12 m', '5² + 12² = 13²'], [10.0, 19.4, 'Después: base 12', '13² − 12² = 25: la punta queda a 5 m'], [20.0, 29.4, 'Baja 12 − 5 = 7 m', 'esta vez coincide con lo que se alejó']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Al principio, con la base a cinco metros, la punta está a doce: es la terna cinco, doce, trece.'], [10.0, 19.4, 'Después, la base queda a cinco más siete, doce metros. Trece al cuadrado menos doce al cuadrado da veinticinco: la punta queda a cinco metros.'], [20.0, 29.4, 'La punta bajó de doce a cinco: siete metros. Coincide con lo que se alejó la base, pero solo porque los números se cambiaron de lugar.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'La punta baja 7 m', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: siete metros. La escalera nunca cambia de largo; cambian los catetos que la sostienen.'], [11.0, 20.4, 'Cuadrados sobre los lados, ternas, la desigualdad triangular y los triángulos de cuarenta y cinco y de treinta y sesenta.'], [21.0, 29.4, 'Dos cuadrados pequeños llenan el grande.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 2', TITLE = 'TRIÁNGULOS Y PITÁGORAS', LINE = 'Dos cuadrados pequeños llenan el grande.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ge-2', KEYS: ['169', '52', '7√2', '4√3'] };
})();
if (typeof module !== 'undefined') module.exports = D;
