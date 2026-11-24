// Preuniversitario · pu-ge-2 «Triángulos y Pitágoras» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const U = 6.5, OX = 92, OY = 168;
  let Z = U;
  const P = (x, y) => [OX + x * Z, OY - y * Z];
  const sq = x => Math.round(x * x * 10) / 10;
  // Triángulo rectángulo con los tres cuadrados; los catetos son a (hacia arriba) y b (hacia la derecha).
  const cuad = (v, K) => {
    Z = v.u ?? U;
    const { a, b } = v, m = v.f ?? 1, fc = v.fc ?? m;
    const rej = (x0, y0, n) => { let h = ''; for (let i = 1; i < n; i++) h += K.l(...P(x0 + i, y0), ...P(x0 + i, y0 + n), 'ls') + K.l(...P(x0, y0 + i), ...P(x0 + n, y0 + i), 'ls'); return h; };
    const ent = Number.isInteger(a) && Number.isInteger(b);
    return K.f(m, K.p([P(0, 0), P(b, 0), P(b, -b), P(0, -b)], 'fa') + K.p([P(0, 0), P(0, a), P(-a, a), P(-a, 0)], 'fg') + (ent ? rej(0, -b, b) + rej(-a, 0, a) : '')
      + K.t(...P(b / 2, -b / 2 - 0.7), sq(b), 'ta') + K.t(...P(-a / 2, a / 2 - 0.7), sq(a), 'tg'))
      + K.f(fc, K.p([P(b, 0), P(0, a), P(a, a + b), P(a + b, b)], 'ff') + K.t(...P((a + b) / 2, (a + b) / 2 - 0.7), v.oc ? '?' : sq(Math.hypot(a, b)), 'tf'))
      + K.p([P(0, 0), P(b, 0), P(0, a)], 'fc') + K.pl([P(0, 1), P(1, 1), P(1, 0)], 'lm') + K.pl([P(0, 0), P(b, 0), P(0, a), P(0, 0)]);
  };
  const K1 = x => String(Math.round(x * 100) / 100);
  // Triángulo rectángulo con rótulos, a escala u.
  const tri = (v, K) => {
    const u = v.u ?? 11, A = [60, 185], B = [60 + v.b * u, 185], C = [60, 185 - v.a * u];
    return K.p([A, B, C], 'fa') + K.pl([[60, 175], [70, 175], [70, 185]], 'lm') + K.t((A[0] + B[0]) / 2, 203, v.lb ?? K1(v.b), 'ta') + K.t(50, (A[1] + C[1]) / 2 + 5, v.la ?? K1(v.a), 'tg', 'end')
      + K.t((B[0] + C[0]) / 2 + 10, (B[1] + C[1]) / 2 - 8, v.lc ?? K1(Math.hypot(v.a, v.b)), 'tf', 'start');
  };
  // Los dos especiales: medio cuadrado (m = 0) y medio equilátero (m = 1).
  const esp = (v, K) => {
    if (v.m < 0.5) {
      const S = 130, x = 105, y = 30, Q = [[x, y], [x + S, y], [x + S, y + S], [x, y + S]];
      return K.p(Q, 'fc') + K.f(v.f, K.p([Q[0], Q[2], Q[3]], 'fa') + K.l(...Q[0], ...Q[2], 'lf gr') + K.ang(Q[2], Q[3], Q[0], 28, '45°', 'fg', 's') + K.t(x + S / 2 + 12, y + S / 2 - 10, 'x√2', 'tf', 'start'))
        + K.t(x + S / 2, y + S + 20, 'x') + K.t(x - 12, y + S / 2 + 5, 'x');
    }
    const A = [90, 175], B = [250, 175], C = [170, 175 - 138.6], M = [170, 175];
    return K.p([A, B, C], 'fc') + K.f(v.f, K.p([A, M, C], 'fa') + K.l(...C, ...M, 'lf gr') + K.ang(A, M, C, 26, '60°', 'fg', 's') + K.ang(C, A, M, 34, '30°', 'fg', 's') + K.t(181, 120, 'x√3', 'tf', 'start') + K.t(128, 194, 'x'))
      + K.t(118, 104, '2x', '', 'end') + K.t(222, 104, '2x', '', 'start');
  };
  const V35 = (v, K) => {
    const u = v.u ?? 4.2, k = v.k, A = [90, 190], B = [90 + 4 * k * u, 190], C = [90, 190 - 3 * k * u];
    return K.p([A, B, C], 'fa') + K.t((A[0] + B[0]) / 2, 207, `4 · ${k} = ${4 * k}`, 'ta') + K.t(82, (A[1] + C[1]) / 2 + 5, `3 · ${k} = ${3 * k}`, 'tg', 'end') + K.t((B[0] + C[0]) / 2 + 8, (B[1] + C[1]) / 2 - 6, `5 · ${k} = ${5 * k}`, 'tf', 'start');
  };

  xpLec('pu-ge-2', [
    ['Tres cuadrados',
      xpMira('dibujo', 'Empecemos por la idea: Pitágoras habla de **áreas de cuadrados**.', { dib: cuad, v: { a: 3, b: 4, f: 0, fc: 0, u: 8 }, alto: 225 }, [
        ['Un triángulo rectángulo: sus dos lados cortos, los catetos, forman una esquina recta.', {}],
        ['Sobre cada cateto armamos un cuadrado: uno tiene 9 casillas y el otro 16.', { f: 1 }, '$3^2 = 9 \\quad 4^2 = 16$'],
        ['Sobre el lado largo, la hipotenusa, otro cuadrado. Su área es justo la de los dos juntos: 25.', { fc: 1 }, '$9 + 16 = 25$'],
        ['Si un cuadrado tiene área 25, su lado mide 5: esa es la hipotenusa.', {}, '$c = \\sqrt{25} = 5$'],
        ['Con otros catetos pasa lo mismo: 9 más 36 son 45, y la hipotenusa es la raíz de 45.', { a: 3, b: 6 }, '$c = \\sqrt{45} \\approx 6.7$'],
      ], 'En un triángulo rectángulo, el cuadrado de la hipotenusa vale lo que los dos de los catetos: $c^2 = a^2 + b^2$.'),
      xpHaz('dibujo', 'Arrastra las puntas de los catetos hasta que el cuadrado de la hipotenusa valga 113.', { dib: cuad, v: { a: 4, b: 4 }, alto: 260, cumple: v => v.a * v.a + v.b * v.b === 113, sol: { a: 7, b: 8 },
        manijas: [{ k: 'a', min: 1, max: 12, paso: 1, r: 9, en: v => P(0, v.a), de: (x, y) => (OY - y) / U }, { k: 'b', min: 1, max: 12, paso: 1, r: 9, en: v => P(v.b, 0), de: x => (x - OX) / U }],
        lee: v => `$${v.a}^2 + ${v.b}^2 = ${v.a * v.a} + ${v.b * v.b} = ${v.a * v.a + v.b * v.b}$`, dice: v => (v.a * v.a + v.b * v.b > 113 ? 'Te pasaste: el cuadrado grande es mayor que 113.' : 'Busca dos cuadrados que juntos hagan 113.') }, '$49 + 64 = 113$: catetos 7 y 8, y la hipotenusa mide $\\sqrt{113} \\approx 10.6$.')],
    ['El lado que falta',
      xpMira('dibujo', 'Segunda idea: si falta un **cateto**, los cuadrados se restan.', { dib: tri, v: { a: 20, b: 21, lc: '29', la: '?', u: 8 }, alto: 215 }, [
        ['Aquí conocemos la hipotenusa, 29, y un cateto, 21. Falta el otro.', {}],
        ['El cuadrado grande vale 841: es lo que suman los dos chicos. Uno de ellos es 441.', {}, '$29^2 = 841 \\quad 21^2 = 441$'],
        ['Lo que sobra es el cuadrado que buscamos: 841 menos 441 son 400.', {}, '$841 - 441 = 400$'],
        ['Su lado es la raíz de 400. El cateto mide 20.', { la: '20' }, '$a = \\sqrt{400} = 20$'],
        ['Cuidado: no se restan los lados. 29 menos 21 son 8, y eso no es el cateto.', {}, '$29 - 21 \\neq 20$'],
      ], 'Hipotenusa: se suman los cuadrados. Cateto: se restan. Al final, la raíz.'),
      xpHaz('dibujo', 'La base mide 9 y la hipotenusa debe medir 15. Estira el otro cateto.', { dib: tri, v: { a: 5, b: 9, u: 12 }, metas: { a: 12 }, alto: 215,
        manijas: [{ k: 'a', min: 2, max: 14, paso: 1, en: v => [60, 185 - v.a * 12], de: (x, y) => (185 - y) / 12 }],
        lee: v => `$${v.a}^2 + 9^2 = ${v.a * v.a + 81} \\quad c \\approx ${K1(Math.hypot(v.a, 9))}$`, dice: v => `El cuadrado de la hipotenusa va en ${v.a * v.a + 81}. Debe ser 15 · 15 = 225.` }, '$225 - 81 = 144$ y $\\sqrt{144} = 12$.')],
    ['Triángulos que conviene reconocer',
      xpMira('dibujo', 'Tercera idea: hay triángulos que se **reconocen** y ahorran la cuenta.', { dib: (v, K) => (v.t < 0.5 ? V35({ k: Math.max(1, Math.round(v.k)), u: v.u }, K) : esp(v, K)), v: { t: 0, k: 1, m: 0, f: 0, u: 24 }, alto: 215 }, [
        ['El 3, 4, 5 es el más famoso: 9 más 16 son 25.', {}, '$3^2 + 4^2 = 5^2$'],
        ['Si todos los lados se multiplican por lo mismo, sigue siendo rectángulo: 18, 24 y 30.', { k: 6, u: 6 }, '$3k, \\; 4k, \\; 5k$'],
        ['Otro: cortamos un cuadrado por su diagonal. Quedan dos ángulos de 45° y dos catetos iguales.', { t: 1, m: 0, f: 1 }, '$x^2 + x^2 = 2x^2$'],
        ['La diagonal es siempre el lado por raíz de 2, un poco menos de una vez y media.', {}, '$d = x\\sqrt{2} \\approx 1.41x$'],
        ['Y medio triángulo equilátero tiene ángulos de 30°, 60° y 90°: el cateto corto es la mitad de la hipotenusa.', { m: 1 }, '$x, \\; x\\sqrt{3}, \\; 2x$'],
      ], 'Reconoce 3-4-5 y sus múltiplos, el medio cuadrado $x, x, x\\sqrt2$ y el medio equilátero $x, x\\sqrt3, 2x$.'),
      xpHaz('dibujo', 'Agranda el triángulo 3-4-5 hasta que su hipotenusa mida 35.', { dib: V35, v: { k: 1 }, metas: { k: 7 }, alto: 260, manijas: [{ k: 'k', min: 1, max: 10, paso: 1, et: 'factor' }],
        lee: v => `$${3 * v.k}, \\; ${4 * v.k}, \\; ${5 * v.k}$`, dice: v => `Todos los lados por ${v.k}: el triángulo no cambia de forma.` }, 'El factor es 7: lados 21, 28 y 35.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque rectangular mide 24 m por 18 m. Se cruza por la diagonal. Estira la cinta desde una esquina hasta la opuesta: ¿cuánto mide?', {
        dib: (v, K) => { const A = [58, 190], n = v.c / 30; return K.r(58, 22, 224, 168, 'fc') + K.cota(58, 196, 282, 196, '24 m') + K.t(48, 110, '18 m', 'tm', 'end') + K.l(...A, 58 + n * 224, 190 - n * 168, 'la gr'); },
        v: { c: 5 }, metas: { c: 30 }, alto: 225, manijas: [{ k: 'c', min: 2, max: 32, paso: 1, rot: v => String(v.c), en: v => [58 + v.c / 30 * 224, 190 - v.c / 30 * 168], de: (x, y) => ((x - 58) * 0.8 + (190 - y) * 0.6) / 280 * 30 }],
        lee: v => `$${v.c}^2 = ${v.c * v.c} \\qquad 24^2 + 18^2 = 900$`, dice: v => (v.c < 30 ? 'La cinta aún no llega a la esquina.' : v.c > 30 ? 'La cinta se pasó de la esquina.' : 'Justo hasta la esquina: es un 3-4-5 por 6.') }, 'Es un 3-4-5 por 6: la diagonal mide 30 m, frente a 42 m por el borde.')],
  ], 'Cuadrados que se suman para la hipotenusa, se restan para un cateto, y triángulos que se reconocen de una mirada.');
}
