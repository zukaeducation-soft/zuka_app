// «Deducir la regla» · Preuniversitario, razonamiento lógico, mundo 8 (Codificación), lección pu-cd-2. Datos puros.
// Reto: el dígito de control (residuo de la suma de los cuatro primeros entre 7); en 5 _ 2 8 4 el dígito borrado es 3. En medio:
// leer la regla y comprobarla con el ejemplo (2 5 1 3 4), aplicarla (3 4 6 2 → 1), las máquinas A, B y C (5 → 49), deshacer
// en orden inverso (47 → 5), la numeración antigua (★□□△△△△○○ = 197), escribir con pocos símbolos (318 → 10) y el tablero de
// tres luces (verde, rojo, amarillo → 19).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL DÍGITO BORRADO', dur: 30,
      caps: [[1.0, 9.4, 'Códigos de cinco dígitos', 'el quinto es un dígito de control'], [10.0, 19.4, 'Residuo de la suma ÷ 7', 'de los cuatro primeros dígitos'], [20.0, 29.4, 'Se borró uno: 5 _ 2 8 4', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En una bodega, cada producto tiene un código de cinco dígitos, y el último es un dígito de control.'], [10.0, 19.4, 'El dígito de control es el residuo de dividir entre siete la suma de los cuatro primeros.'], [20.0, 29.4, 'En una etiqueta se borró el segundo dígito y se lee cinco, raya, dos, ocho, cuatro. Al final lo resolvemos.']] },
    { id: 'leer', name: 'LEER LA REGLA', dur: 28,
      caps: [[0.8, 8.4, 'La regla se sigue al pie de la letra', 'no hay que saberla de memoria'], [9.0, 17.4, 'El ejemplo sirve para comprobar', '2 5 1 3 4: 2 + 5 + 1 + 3 = 11'], [18.0, 26.4, '11 ÷ 7 = 1, sobran 4', 'el control es 4: entendido']],
      narr: [[0.8, 8.4, 'Estas preguntas traen la regla escrita: no hay que saberla de antes, sino seguirla al pie de la letra.'], [9.0, 17.4, 'Si el enunciado trae un ejemplo, se usa para comprobar que se entendió: dos, cinco, uno, tres, cuatro. Los cuatro primeros suman once.'], [18.0, 26.4, 'Once entre siete da uno y sobran cuatro: el control es cuatro, como dice el ejemplo. Regla entendida.']] },
    { id: 'aplicar', name: 'APLICAR LA REGLA', dur: 28,
      caps: [[0.8, 8.4, 'Primeros dígitos 3, 4, 6, 2', 'cuál es el control'], [9.0, 17.4, '3 + 4 + 6 + 2 = 15', '15 = 2 · 7 + 1'], [18.0, 26.4, 'El control es 1', 'el código completo: 3 4 6 2 1']],
      narr: [[0.8, 8.4, 'Ahora se aplica: si los cuatro primeros dígitos son tres, cuatro, seis y dos, hay que hallar el de control.'], [9.0, 17.4, 'La suma es quince, y quince es dos veces siete más uno.'], [18.0, 26.4, 'El residuo es uno: el código completo es tres, cuatro, seis, dos, uno.']] },
    { id: 'maquinas', name: 'TRES MÁQUINAS', dur: 30,
      caps: [[0.8, 9.4, 'A: × 2 · B: − 3 · C: al cuadrado', 'un número pasa por varias'], [10.0, 19.4, '5 por A, luego B, luego C', '5 → 10 → 7 → 49'], [20.0, 29.4, 'El orden importa', 'por C, luego A, luego B: 5 → 25 → 50 → 47']],
      narr: [[0.8, 9.4, 'Otro problema: tres máquinas transforman números. La A duplica, la B resta tres y la C eleva al cuadrado.'], [10.0, 19.4, 'Si el cinco pasa por A, luego por B y luego por C: diez, siete, cuarenta y nueve.'], [20.0, 29.4, 'El orden importa: si el mismo cinco pasa por C, luego A y luego B, sale veinticinco, cincuenta, cuarenta y siete.']] },
    { id: 'deshacer', name: 'DESHACER EN ORDEN INVERSO', dur: 28,
      caps: [[0.8, 8.4, 'Salió 47 tras C, A y B', 'qué número entró'], [9.0, 17.4, 'Se deshace de atrás hacia adelante', '+3 → 50 · ÷2 → 25 · raíz → 5'], [18.0, 26.4, 'Cada paso, con su contraria', 'como quitarse los zapatos antes que las medias']],
      narr: [[0.8, 8.4, 'Al revés: un número pasó por C, luego A, luego B, y salió cuarenta y siete. Hay que hallar el que entró.'], [9.0, 17.4, 'Se deshace desde el final: B restó tres, así que se suman tres, cincuenta; A duplicó, se divide, veinticinco; C elevó al cuadrado, raíz, cinco.'], [18.0, 26.4, 'Cada paso con su operación contraria y en orden inverso, como quitarse los zapatos antes que las medias.']] },
    { id: 'simbolos', name: 'UNA NUMERACIÓN ANTIGUA', dur: 30,
      caps: [[0.8, 9.4, '○ = 1, △ = 5, □ = 25, ★ = 125', 'el valor es la suma de los símbolos'], [10.0, 19.4, '★ □□ △△△△ ○○', '125 + 50 + 20 + 2'], [20.0, 29.4, 'Representa el 197', 'se agrupa por símbolo y se suma']],
      narr: [[0.8, 9.4, 'Otro problema: un antiguo sistema usa cuatro símbolos que valen uno, cinco, veinticinco y ciento veinticinco. Un número es la suma de sus símbolos.'], [10.0, 19.4, 'Hay que leer: una estrella, dos cuadrados, cuatro triángulos y dos círculos. Se agrupa por símbolo.'], [20.0, 29.4, 'Ciento veinticinco más cincuenta más veinte más dos: ciento noventa y siete.']] },
    { id: 'pocos', name: 'CON POCOS SÍMBOLOS', dur: 28,
      caps: [[0.8, 8.4, 'Escribir 318 en ese sistema', 'ningún símbolo más de cuatro veces'], [9.0, 17.4, 'Del más grande al más pequeño', '2 · 125 + 2 · 25 + 3 · 5 + 3'], [18.0, 26.4, '2 + 2 + 3 + 3 = 10 símbolos', 'como dar vueltas con pocas monedas']],
      narr: [[0.8, 8.4, 'Para escribir trescientos dieciocho en ese sistema, sin repetir un símbolo más de cuatro veces.'], [9.0, 17.4, 'Se usa primero el símbolo más grande que quepa: dos estrellas, doscientos cincuenta; dos cuadrados, cincuenta; tres triángulos y tres círculos.'], [18.0, 26.4, 'En total, diez símbolos. Es como dar vueltas con pocas monedas: primero las grandes.']] },
    { id: 'luces', name: 'TRES LUCES', dur: 28,
      caps: [[0.8, 8.4, 'Rojo 0, amarillo 1, verde 2', 'izquierda × 9, centro × 3, derecha × 1'], [9.0, 17.4, 'Verde, rojo, amarillo', '2 · 9 + 0 · 3 + 1 · 1 = 19'], [18.0, 26.4, 'El mayor: verde, verde, verde', '18 + 6 + 2 = 26']],
      narr: [[0.8, 8.4, 'Tres luces: rojo vale cero, amarillo uno y verde dos. La izquierda se multiplica por nueve, la del centro por tres, la derecha por uno.'], [9.0, 17.4, 'Verde, rojo, amarillo: dos por nueve, más cero, más uno. Diecinueve.'], [18.0, 26.4, 'El mayor número posible es con las tres verdes: dieciocho más seis más dos, veintiséis.']] },
    { id: 'resolver', name: 'EL DÍGITO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, '5 + x + 2 + 8 = 15 + x', 'debe dejar residuo 4 al dividir entre 7'], [10.0, 19.4, '15 + x = 18 o 25', 'los que dejan residuo 4 cerca'], [20.0, 29.4, 'x = 3', '25 daría x = 10: no es un dígito']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Los cuatro primeros dígitos son cinco, equis, dos y ocho: suman quince más equis. El control es cuatro.'], [10.0, 19.4, 'Así que quince más equis debe dejar residuo cuatro al dividir entre siete: puede ser dieciocho o veinticinco.'], [20.0, 29.4, 'Con dieciocho, equis es tres. Con veinticinco sería diez, que no es un dígito. El dígito borrado es tres.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El dígito borrado es 3', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: tres. La regla dada, aplicada al revés.'], [11.0, 20.4, 'Leer y comprobar con el ejemplo, aplicar paso a paso, deshacer en orden inverso y escribir con las piezas más grandes.'], [21.0, 29.4, 'La regla está en el enunciado: solo hay que seguirla.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 8', TITLE = 'DEDUCIR LA REGLA', LINE = 'La regla está en el enunciado.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-cd-2', KEYS: ['197', '318', 'dígito de control'] };
})();
if (typeof module !== 'undefined') module.exports = D;
