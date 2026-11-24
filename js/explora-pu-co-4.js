// Preuniversitario · pu-co-4 «Conteo por casos y complemento» (Explora). Los ejemplos no son los de los ejercicios.
{
  const num = (n, c) => ({ f: Math.ceil(n / c), c, cw: 33, ch: 30, celda: i => (i < n ? String(i + 1) : ''), hueco: i => i >= n });
  const mult = (n, k) => Array.from({ length: n }, (_, i) => i).filter(i => (i + 1) % k === 0);
  const D10 = { f: 10, c: 10, cw: 30, ch: 24, celda: (i, r, c) => `${r}${c}` };
  const dados = { f: 6, c: 6, filas: ['1', '2', '3', '4', '5', '6'], cols: ['1', '2', '3', '4', '5', '6'], izq: 30, cw: 42, ch: 32 };
  const cifras = (dec, uni) => ({ f: dec.length, c: uni.length, filas: dec.map(String), cols: uni.map(String), izq: 40, cw: 60, ch: 38, celda: (i, r, c) => `${dec[r]}${uni[c]}` });
  const con7 = Array.from({ length: 100 }, (_, i) => i).filter(i => Math.floor(i / 10) === 7 || i % 10 === 7);

  xpLec('pu-co-4', [
    ['Sumar sin contar doble',
      xpMira('rejilla', 'Empecemos por la idea: al juntar dos grupos, lo que está **en los dos** se cuenta una vez.', num(30, 10), [
        ['Los números del 1 al 30. ¿Cuántos son múltiplos de 2 o de 5?', {}],
        ['Múltiplos de 2: hay 15.', { on: mult(30, 2) }, '$30 \\div 2 = 15$'],
        ['Múltiplos de 5: hay 6. Mira cuáles no estaban ya pintados.', { luz: mult(30, 5) }, '$30 \\div 5 = 6$'],
        ['El 10, el 20 y el 30 están en los dos grupos: si sumamos 15 y 6, los contamos doble.', { luz: [9, 19, 29] }],
        ['Se quitan una vez: 15 más 6 menos 3, dieciocho números.', { on: mult(30, 5) }, '$15 + 6 - 3 = 18$'],
      ], 'Uno u otro: suma los dos grupos y resta los que están en ambos.'),
      xpHaz('rejilla', 'Pinta los múltiplos de 3 o de 7, del 1 al 30.', { ...num(30, 10), meta: [...new Set([...mult(30, 3), ...mult(30, 7)])], lee: c => `$${c.filter(x => x).length} \\text{ pintados}$`, dice: c => (c[20] ? 'El 21 está en los dos grupos, pero es una sola casilla.' : 'Pinta los de 3 y los de 7.') }, '$10 + 4 - 1 = 13$: el 21 está en los dos y se cuenta una vez.')],
    ['Contar lo contrario',
      xpMira('rejilla', 'Segunda idea: «al menos uno» se cuenta mejor **al revés**.', D10, [
        ['Todas las claves de dos dígitos, del 00 al 99: son cien.', {}, '$10 \\cdot 10 = 100$'],
        ['¿Cuántas tienen al menos un 7? Puede estar adelante, atrás o en los dos lados.', { on: con7 }],
        ['Es más fácil contar las que **no** tienen 7: 9 opciones en cada puesto.', {}, '$9 \\cdot 9 = 81$'],
        ['El resto sí tiene: 100 menos 81 son 19.', {}, '$100 - 81 = 19$'],
        ['No son 20: la clave 77 está en la fila y en la columna, pero es una sola.', { luz: [77] }],
      ], 'Al menos uno = todos − ninguno.'),
      xpHaz('rejilla', 'Se lanzan dos dados (fila y columna). Pinta los resultados en que **al menos uno** es 5.', { ...dados, meta: Array.from({ length: 36 }, (_, i) => i).filter(i => Math.floor(i / 6) === 4 || i % 6 === 4), lee: c => `$${c.filter(x => x).length} \\text{ de } 36$`, dice: () => 'La fila dice el primer dado; la columna, el segundo.' }, '$36 - 5 \\cdot 5 = 11$ resultados.')],
    ['Separar en casos',
      xpMira('rejilla', 'Tercera idea: si una condición **cambia** las opciones, se separan casos.', cifras([1, 2, 3], [0, 1, 2, 3]), [
        ['Con 0, 1, 2 y 3 se forman números de dos cifras distintas. ¿Cuántos son pares?', {}],
        ['Primero, los que repiten cifra no sirven: 11, 22 y 33.', { x: [1, 6, 11] }],
        ['Caso 1: terminan en 0. Adelante puede ir 1, 2 o 3: son 3.', { on: [0, 4, 8] }, '$3$'],
        ['Caso 2: terminan en 2. Adelante no va el 0 ni el 2: quedan 1 y 3, son 2.', { on: [2, 10] }, '$2$'],
        ['Los casos no se cruzan, así que se suman: cinco números.', {}, '$3 + 2 = 5$'],
      ], 'Divide en casos que no se crucen, cuenta cada uno y suma.'),
      xpHaz('rejilla', 'Con 0, 2, 4 y 5 se forman números de dos cifras distintas. Pinta los que son pares.', { ...cifras([2, 4, 5], [0, 2, 4, 5]), meta: [0, 4, 8, 5, 9, 2, 10], lee: c => `$${c.filter(x => x).length} \\text{ números}$`, dice: () => 'Mira por columnas: los que terminan en 0, en 2 y en 4.' }, 'Terminan en 0: 3. En 2: 2. En 4: 2. En total $3 + 2 + 2 = 7$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De 30 familias, 18 tienen perro, 14 tienen gato y 5 no tienen ninguno. Completa: con mascota, suma y los que tienen ambos.', { slots: [{ x: 62, y: 60, w: 92, et: 'con alguna' }, { x: 170, y: 60, w: 92, et: 'perro + gato' }, { x: 278, y: 60, w: 92, et: 'ambos' }], fichas: ['25', '32', '7', '30', '2', '12'], meta: ['25', '32', '7'], alto: 108, pista: 'Con alguna: 30 menos las que no tienen. Lo que sobra en la suma se contó doble.' }, '$30 - 5 = 25$ y $18 + 14 = 32$: sobran $32 - 25 = 7$, las que tienen los dos.')],
  ], 'Sumar sin contar doble, contar lo contrario y separar en casos que no se crucen.');
}
