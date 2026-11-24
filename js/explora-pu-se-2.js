// Preuniversitario · pu-se-2 «Letras y figuras» (Explora). Los ejemplos no son los de los ejercicios.
{
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', LX = i => 22 + (i % 13) * 24.6, LY = i => (i < 13 ? 70 : 132);
  // Alfabeto en dos filas con las letras marcadas.
  const abc = (v, K) => [...ABC].map((l, i) => { const on = v.m.includes(l); return K.c(LX(i), LY(i), 11.5, on ? 'fA' : 'fc') + K.t(LX(i), LY(i) + 5, l, on ? 'tc s' : 's') + K.f(v.num, K.t(LX(i), LY(i) + 27, i + 1, 's tm')); }).join('') + K.t(170, 30, v.p || '', 'b ta');
  // Cruz de brazos n: 4n + 1 puntos.
  const cruz = (v, K) => { const n = Math.round(v.n), u = Math.min(22, 90 / n); let h = K.c(170, 110, u * 0.4, 'fG'); for (let k = 1; k <= n; k++) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) h += K.c(170 + a * k * u, 110 + b * k * u, u * 0.4, 'fA'); return h + K.t(40, 30, `figura ${n}`, 'tm', 'start') + K.t(300, 30, 4 * n + 1, 'b ta'); };
  // Marco de puntos alrededor de un cuadrado de lado n: 4n + 4.
  const marco = (v, K) => { const n = v.n, s = n + 2, u = Math.min(22, 168 / s); let h = ''; for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) { const b = i === 0 || j === 0 || i === s - 1 || j === s - 1; h += K.c(170 + (i - (s - 1) / 2) * u, 100 + (j - (s - 1) / 2) * u, u * 0.36, b ? 'fA' : 'fc'); } return h + K.t(20, 28, `figura ${n}`, 'tm', 'start') + K.t(316, 28, 4 * n + 4, 'b ta', 'end'); };
  // n mesas cuadradas en fila con sus sillas.
  const mesas = (v, K) => { const n = v.n, u = Math.min(40, 270 / n), x0 = 170 - n * u / 2; let h = ''; for (let i = 0; i < n; i++) h += K.r(x0 + i * u, 80, u, u, 'fg') + K.c(x0 + (i + 0.5) * u, 80 - u * 0.4, u * 0.24, 'fA') + K.c(x0 + (i + 0.5) * u, 80 + u * 1.4, u * 0.24, 'fA'); return h + K.c(x0 - u * 0.4, 80 + u / 2, u * 0.24, 'fA') + K.c(x0 + n * u + u * 0.4, 80 + u / 2, u * 0.24, 'fA') + K.t(170, 34, `${n} ${n === 1 ? 'mesa' : 'mesas'} · ${2 * n + 2} sillas`, 'ta'); };

  xpLec('pu-se-2', [
    ['Las letras son números',
      xpMira('dibujo', 'Empecemos por la idea: cada letra tiene su **lugar** en el alfabeto.', { dib: abc, v: { m: '', num: 0, p: '' }, alto: 172 }, [
        ['El alfabeto de 26 letras, sin Ñ. Cada letra tiene un número: A es 1, B es 2…', { num: 1 }],
        ['La secuencia A, C, F, J parece rara con letras.', { m: 'ACFJ', p: 'A · C · F · J' }],
        ['Con números se ve mejor: 1, 3, 6, 10.', { p: '1 · 3 · 6 · 10' }],
        ['Los saltos son 2, 3 y 4. El que sigue es 5: 10 más 5 son 15.', { p: '+2, +3, +4, +5' }, '$10 + 5 = 15$'],
        ['La letra 15 es la O.', { m: 'ACFJO', p: 'A · C · F · J · O' }],
      ], 'Cambia las letras por su lugar en el alfabeto y busca la regla de los números.'),
      xpHaz('dibujo', 'La secuencia es B, D, G, K. Lleva el señalador hasta la letra que sigue.', { dib: (v, K) => abc({ m: 'BDGK', num: 1, p: 'B · D · G · K · ?' }, K), v: { i: 12 }, metas: { i: 15 }, alto: 172,
        manijas: [{ k: 'i', min: 0, max: 25, paso: 1, r: 13, rot: v => ABC[v.i], en: v => [LX(Math.round(v.i)), LY(Math.round(v.i))], de: (x, y) => xpClamp(Math.round((x - 22) / 24.6), 0, 12) + (y > 101 ? 13 : 0) }],
        lee: v => `$2, \\; 4, \\; 7, \\; 11, \\; ${v.i + 1}$`, dice: v => `La ${ABC[v.i]} es la letra ${v.i + 1}. De K a ${ABC[v.i]} hay un salto de ${v.i - 10}.` }, 'Los saltos son 2, 3, 4 y 5: $11 + 5 = 16$, la P.')],
    ['Figuras que crecen',
      xpMira('dibujo', 'Segunda idea: en las figuras, cuenta lo que se **agrega** cada vez.', { dib: cruz, v: { n: 1 }, alto: 210 }, [
        ['La figura 1 es una cruz de 5 puntos: uno en el centro y 4 alrededor.', {}, '$5$'],
        ['La figura 2 alarga cada brazo un punto: agrega 4.', { n: 2 }, '$5 + 4 = 9$'],
        ['La 3 agrega otros 4: trece.', { n: 3 }, '$9 + 4 = 13$'],
        ['El centro es 1 y cada figura tiene 4 brazos de n puntos: 4n + 1.', {}, '$4n + 1$'],
        ['La figura 6 tiene 4 por 6, más 1: veinticinco.', { n: 6 }, '$4 \\cdot 6 + 1 = 25$'],
      ], 'Busca la parte fija y la que crece: aquí 1 fijo y 4 más en cada figura, $4n + 1$.'),
      xpHaz('dibujo', 'Un marco de puntos rodea un cuadrado. Agranda la figura hasta que el marco tenga 36 puntos.', { dib: marco, v: { n: 1 }, metas: { n: 8 }, alto: 245, manijas: [{ k: 'n', min: 1, max: 10, paso: 1, et: 'figura' }],
        lee: v => `$4 \\cdot ${v.n} + 4 = ${4 * v.n + 4}$`, dice: v => `Cuatro lados de ${v.n} y cuatro esquinas: ${4 * v.n + 4}.` }, '$4n + 4 = 36$ cuando $n = 8$.')],
    ['Dos reglas a la vez',
      xpMira('dibujo', 'Tercera idea: si hay **letras y números** juntos, son dos reglas aparte.', { dib: (v, K) => v.l.map((l, i) => K.r(22 + i * 62, 60, 54, 48, 'fc', 10) + K.t(38 + i * 62, 92, l, 'b ta') + K.t(60 + i * 62, 92, v.n[i], 'b tg')).join('') + K.f(v.a, K.t(170, 40, 'letras: +1', 'ta')) + K.f(v.b, K.t(170, 136, 'números: ×2', 'tg')), v: { l: ['K', 'L', 'M', 'N'], n: ['5', '10', '20', '40'], a: 0, b: 0 }, alto: 150 }, [
        ['K5, L10, M20, N40. No las mires juntas.', {}],
        ['Primero solo las letras: K, L, M, N. Avanzan de a una.', { a: 1 }],
        ['Ahora solo los números: 5, 10, 20, 40. Se duplican.', { b: 1 }],
        ['La que sigue junta las dos respuestas: O80.', { l: ['K', 'L', 'M', 'N', 'O'], n: ['5', '10', '20', '40', '80'] }, '$40 \\cdot 2 = 80$'],
      ], 'Separa las letras de los números, resuelve cada regla y junta las respuestas.'),
      xpHaz('fichas', 'Pon lo que sigue en Z1, X3, V6, T10: la letra y el número.', { slots: [{ x: 120, y: 58, w: 84, et: 'letra' }, { x: 220, y: 58, w: 84, et: 'número' }], fichas: ['R', 'S', 'Q', '15', '14', '20'], meta: ['R', '15'], alto: 106, pista: 'Las letras van hacia atrás de 2 en 2; los números suman 2, 3, 4…' }, 'Z, X, V, T, **R**; y 1, 3, 6, 10, **15** (se suma 5).')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una mesa cuadrada tiene 4 sillas; dos juntas en fila, 6; tres, 8. Arrastra: ¿cuántas mesas en fila hacen falta para 22 sillas?', { dib: mesas, v: { n: 1 }, metas: { n: 10 }, alto: 190, manijas: [{ k: 'n', min: 1, max: 13, paso: 1, et: 'mesas' }],
        lee: v => `$2 \\cdot ${v.n} + 2 = ${2 * v.n + 2}$`, dice: () => 'Cada mesa pone 2 sillas, y las dos puntas siempre están.' }, '$2n + 2 = 22$: diez mesas.')],
  ], 'Letras como números, figuras con una parte fija y otra que crece, y dos reglas por separado.');
}
