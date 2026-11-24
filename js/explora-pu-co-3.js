// Preuniversitario · pu-co-3 «Combinaciones» (Explora). Los ejemplos no son los de los ejercicios.
{
  const L = 'ABCDEF', par = n => ({ f: n, c: n, filas: [...L].slice(0, n), cols: [...L].slice(0, n), izq: 30, cw: 46, ch: 36, celda: (i, r, c) => (r === c ? '' : L[r] + L[c]), hueco: (i, r, c) => r === c });
  // Las seis ordenaciones de un mismo grupo de tres.
  const seis = (v, K) => {
    const P = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']; let h = '';
    P.forEach((t, i) => { const c = i % 3, r = Math.floor(i / 3), x = K.lerp(62 + c * 108, 170, v.j), y = K.lerp(56 + r * 54, 84, v.j); h += K.f(1 - v.j * 0.6, K.r(x - 42, y - 18, 84, 36, 'fa', 9)) + K.f(1 - v.j, K.t(x, y + 6, t, 'b')); });
    return h + K.f(v.j, K.t(170, 90, '{A, B, C}', 'b ta')) + K.f(v.f, K.t(170, 152, v.p, 'b'));
  };
  const dej = (v, K) => {
    let h = ''; for (let i = 0; i < 9; i++) { const e = i < Math.round(v.k); h += K.c(34 + i * 34, 70, 14, e ? 'fA' : 'fc') + K.t(34 + i * 34, 75, 'ABCDEFGHI'[i], e ? 'tc' : 'tm'); }
    return h + K.t(170, 26, v.p, 'ta') + K.f(v.f, K.t(170, 122, 'los que van se eligen · los que no, también', 's tm'));
  };

  xpLec('pu-co-3', [
    ['El orden no importa',
      xpMira('rejilla', 'Empecemos por la idea: una pareja es la misma **se diga como se diga**.', par(4), [
        ['Cuatro amigos, A, B, C y D. Se eligen dos. La fila es el primero; la columna, el segundo.', {}],
        ['Hay 4 por 3: doce casillas. Pero AB y BA son la misma pareja.', { luz: [1, 4] }, '$4 \\cdot 3 = 12$'],
        ['Tachamos las repetidas: las de abajo de la diagonal.', { x: [4, 8, 9, 12, 13, 14] }],
        ['Quedan la mitad: seis parejas. Se dividió entre 2 porque dos personas se ordenan de 2 maneras.', { on: [1, 2, 3, 6, 7, 11] }, '$\\tfrac{4 \\cdot 3}{2} = 6$'],
      ], 'Si el orden no importa, es una combinación: se cuentan los órdenes y se quitan los repetidos.'),
      xpHaz('rejilla', 'Seis frutas, A a F: un jugo lleva dos, pero A y B no se mezclan. Marca cada pareja una sola vez.', { ...par(6), cw: 42, ch: 32, hueco: (i, r, c) => r === c || r + c === 1, cumple: c => { for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (i + j > 1 && c[i * 6 + j] + c[j * 6 + i] !== 1) return false; return true; }, sol: [2, 3, 4, 5, 8, 9, 10, 11, 15, 16, 17, 22, 23, 29],
        lee: c => `$${c.filter(x => x).length} \\text{ marcadas}$`, dice: c => { for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (c[i * 6 + j] + c[j * 6 + i] > 1) return `${L[i]}${L[j]} y ${L[j]}${L[i]} son el mismo jugo: deja una.`; return 'Cada pareja, una sola vez. Puedes arrastrar.'; } }, '$\\tfrac{6 \\cdot 5}{2} - 1 = 14$ jugos: se quita el de A con B.')],
    ['Dividir entre los órdenes',
      xpMira('dibujo', 'Segunda idea: con **tres** elegidos, cada grupo se repite 6 veces.', { dib: seis, v: { j: 0, f: 0, p: '' }, alto: 170 }, [
        ['De siete personas se eligen tres. Si el orden contara, serían 7 por 6 por 5: 210.', {}, '$7 \\cdot 6 \\cdot 5 = 210$'],
        ['Pero estas seis filas tienen a los mismos tres: A, B y C.', {}, '$3! = 6$'],
        ['Son un solo grupo. Pasa igual con cada trío.', { j: 1 }],
        ['Por eso se divide: 210 entre 6 son 35 grupos.', { f: 1, p: '210 ÷ 6 = 35' }, '$\\tfrac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = 35$'],
        ['Arriba, tantos factores como elegidos; abajo, el factorial de los elegidos.', {}, '$\\binom{7}{3} = 35$'],
      ], 'Combinaciones de n en k: $\\binom{n}{k} = \\tfrac{n (n-1) \\cdots}{k!}$, con k factores arriba.'),
      xpHaz('fichas', 'De 8 canciones se eligen 3 para un viaje, sin orden. Completa la cuenta.', { slots: [{ x: 66, y: 56, w: 84, et: '8 · 7 · 6' }, { x: 170, y: 56, w: 80, et: '3!' }, { x: 276, y: 56, w: 80, et: 'grupos' }], fichas: ['336', '6', '56', '3', '112', '24'], meta: ['336', '6', '56'], alto: 104, fondo: K => K.t(119, 61, '÷', 'b') + K.t(223, 61, '=', 'b'), pista: 'Tres canciones se ordenan de 3 · 2 · 1 maneras.' }, '$\\tfrac{336}{6} = 56$ grupos.')],
    ['Elegir es también dejar',
      xpMira('dibujo', 'Tercera idea: elegir a los que van es elegir a los que **se quedan**.', { dib: dej, v: { k: 2, p: 'van 2, se quedan 7', f: 0 }, alto: 140 }, [
        ['De nueve personas van dos a un paseo: 36 maneras.', {}, '$\\binom92 = \\tfrac{9 \\cdot 8}{2} = 36$'],
        ['¿Y si van siete? La cuenta directa es larga.', { k: 7, p: 'van 7, se quedan 2' }],
        ['Pero cada grupo de siete que va deja a dos por fuera. Basta contar quiénes se quedan.', { f: 1 }],
        ['Se quedan dos: otra vez 36.', {}, '$\\binom97 = \\binom92 = 36$'],
        ['Y elegir a los nueve, o a ninguno, se puede de una sola manera.', { k: 9, p: 'van todos' }, '$\\binom99 = \\binom90 = 1$'],
      ], '$\\binom{n}{k} = \\binom{n}{n-k}$: cuenta el grupo más pequeño, el que va o el que se queda.'),
      xpHaz('fichas', 'De 10 jugadores van 8 a la cancha. Cuenta a los que se quedan: ¿cuántos son y cuántos grupos hay?', { slots: [{ x: 100, y: 56, w: 100, et: 'se quedan' }, { x: 240, y: 56, w: 100, et: 'grupos' }], fichas: ['2', '45', '8', '90', '80'], meta: ['2', '45'], alto: 104, pista: 'Se quedan 2 de 10: diez por nueve, entre dos.' }, '$\\binom{10}{8} = \\binom{10}{2} = \\tfrac{10 \\cdot 9}{2} = 45$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De 5 libros y 4 revistas te llevas 2 libros y 2 revistas. Completa: maneras de elegir libros, revistas y el total.', { slots: [{ x: 60, y: 56, w: 80, et: 'libros' }, { x: 166, y: 56, w: 80, et: 'revistas' }, { x: 276, y: 56, w: 80, et: 'total' }], fichas: ['10', '6', '60', '16', '20', '12'], meta: ['10', '6', '60'], alto: 104, fondo: K => K.t(113, 61, '·', 'b') + K.t(221, 61, '=', 'b'), pista: 'Libros y revistas: se hacen las dos cosas, así que se multiplica.' }, '$\\binom52 \\cdot \\binom42 = 10 \\cdot 6 = 60$.')],
  ], 'El orden no importa: se divide entre los órdenes, y elegir es también dejar.');
}
