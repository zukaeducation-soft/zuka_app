// Preuniversitario · pu-op-1 «Operaciones nuevas» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Máquina: entran a y b, sale r; arriba la receta y abajo la cuenta.
  const maq = (v, K) => K.t(170, 26, v.re, 'b tg') + K.r(22, 62, 62, 52, 'fa', 10) + K.t(53, 95, v.a, 'B') + K.t(106, 96, v.s, 'b') + K.r(128, 62, 62, 52, 'fa', 10) + K.t(159, 95, v.b, 'B') + K.ar(200, 88, 236, 88, 'lm') + K.r(242, 62, 78, 52, 'fg', 10) + K.t(281, 95, v.r, 'B') + K.t(170, 150, v.c || '', 'ta');
  const G = ['k', 'm', 'n'], TAB = [['k', 'm', 'n'], ['m', 'n', 'k'], ['n', 'k', 'm']];
  const tab = (T, o = {}) => ({ f: 3, c: 3, filas: G, cols: G, izq: 60, cw: 60, ch: 46, celda: (i, r, c) => T[r][c], unoAUno: true, ...o });

  xpLec('pu-op-1', [
    ['Una receta con huecos',
      xpMira('dibujo', 'Empecemos por la idea: un símbolo nuevo es una **receta**.', { dib: maq, v: { re: 'a ◆ b = 2a + 3b', a: 'a', b: 'b', s: '◆', r: '?', c: '' }, alto: 165 }, [
        ['La receta dice: el doble del primero más el triple del segundo.', {}, '$a \\diamond b = 2a + 3b$'],
        ['Para 4 ◆ 1, el 4 entra donde dice a y el 1 donde dice b.', { a: '4', b: '1', c: '2 · 4 + 3 · 1' }],
        ['Ocho más tres: once.', { r: '11' }, '$2 \\cdot 4 + 3 \\cdot 1 = 11$'],
        ['Si los cambiamos de lugar, 1 ◆ 4 da 2 más 12: catorce. El orden importa.', { a: '1', b: '4', r: '14', c: '2 · 1 + 3 · 4' }, '$2 \\cdot 1 + 3 \\cdot 4 = 14$'],
        ['Por eso primero se mira quién es a y quién es b.', {}],
      ], 'Reemplaza cada número en el lugar de su letra. El primero es a; el segundo, b.'),
      xpHaz('dibujo', 'Con $a \\diamond b = a \\cdot b + 2$, cambia la segunda entrada hasta que salga 22.', { dib: (v, K) => maq({ re: 'a ◆ b = a · b + 2', a: '5', b: v.b, s: '◆', r: 5 * v.b + 2, c: '' }, K), v: { b: 1 }, metas: { b: 4 }, alto: 215, manijas: [{ k: 'b', min: 0, max: 8, paso: 1, et: 'segunda entrada' }],
        lee: v => `$5 \\diamond ${v.b} = 5 \\cdot ${v.b} + 2 = ${5 * v.b + 2}$`, dice: v => `Sale ${5 * v.b + 2}.` }, '$5 \\cdot 4 + 2 = 22$.')],
    ['Los negativos, con paréntesis',
      xpMira('dibujo', 'Segunda idea: al reemplazar un negativo, ponle **paréntesis**.', { dib: maq, v: { re: 'a ◆ b = b² − a', a: 'a', b: 'b', s: '◆', r: '?', c: '' }, alto: 165 }, [
        ['Otra receta: el cuadrado del segundo menos el primero.', {}, '$a \\diamond b = b^2 - a$'],
        ['Con 2 ◆ (−3), el segundo es −3.', { a: '2', b: '−3', c: '(−3)² − 2' }],
        ['El cuadrado es de todo el −3, con su signo: 9. Menos 2, queda 7.', { r: '7' }, '$(-3)^2 - 2 = 7$'],
        ['Con (−4) ◆ 1 se resta un negativo: 1 menos menos 4 son 5.', { a: '−4', b: '1', r: '5', c: '1² − (−4)' }, '$1^2 - (-4) = 5$'],
      ], 'Los negativos entran con paréntesis: $(-3)^2 = 9$ y restar $-4$ es sumar 4.'),
      xpHaz('fichas', 'Con $a \\diamond b = b^2 - a$, halla cada resultado.', { slots: [{ x: 66, y: 56, w: 84, et: '1 ◆ (−5)' }, { x: 170, y: 56, w: 84, et: '(−6) ◆ 2' }, { x: 274, y: 56, w: 84, et: '10 ◆ 3' }], fichas: ['24', '10', '−1', '−26', '−2', '1'], meta: ['24', '10', '−1'], alto: 104, pista: 'El segundo se eleva al cuadrado; luego se resta el primero.' }, '$25 - 1 = 24$, $4 - (-6) = 10$ y $9 - 10 = -1$.')],
    ['Operaciones en una tabla',
      xpMira('rejilla', 'Tercera idea: a veces no hay receta, sino una **tabla**.', tab(TAB), [
        ['Una operación entre k, m y n. El primero se busca en las filas y el segundo, en las columnas.', {}],
        ['Para m ✱ n: la fila de m, la columna de n. El resultado es k.', { luz: [3, 4, 5, 2, 8], on: [5] }, '$m \\ast n = k$'],
        ['La fila y la columna de k dejan todo igual. Por eso k es el neutro.', { off: [5], luz: [0, 1, 2, 3, 6] }],
        ['Si la tabla es simétrica por la diagonal, el orden no importa.', { luz: [1, 3, 2, 6, 5, 7] }],
      ], 'Fila del primero, columna del segundo. El neutro no cambia a nadie.'),
      xpHaz('rejilla', 'En esta otra tabla, toca la casilla de **n ✱ m**.', tab([['m', 'k', 'n'], ['n', 'm', 'k'], ['k', 'n', 'm']], { meta: [7], dice: c => (c[5] ? 'Esa es m ✱ n: el primero va en las filas.' : 'El primero, n, está en las filas; el segundo, m, en las columnas.') }), 'Fila de n, columna de m: el resultado es n.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con $a \\circ b = a + b - 7$ hay un neutro: un número que no cambia a los demás. Búscalo.', { dib: (v, K) => [3, 8, 12].map((a, i) => K.t(120, 44 + i * 40, `${a} ∘ ${K.sig(v.e)} = ${K.sig(a + v.e - 7)}`, a + v.e - 7 === a ? 'b to' : 'b') + K.t(250, 44 + i * 40, a + v.e - 7 === a ? 'igual' : 'cambió', a + v.e - 7 === a ? 'to' : 'tf')).join(''), v: { e: 0 }, metas: { e: 7 }, alto: 200, manijas: [{ k: 'e', min: -3, max: 10, paso: 1, et: 'candidato' }],
        lee: v => `$a + ${v.e < 0 ? `(${v.e})` : v.e} - 7 = a ${v.e === 7 ? '' : v.e > 7 ? `+ ${v.e - 7}` : `- ${7 - v.e}`}$`, dice: () => 'Debe dejar igual al 3, al 8 y al 12.' }, 'Con 7, $a + 7 - 7 = a$: no cambia a nadie.')],
  ], 'Reemplazar en la receta, con paréntesis en los negativos, y leer tablas por fila y columna.');
}
