// Geometría Vectorial · explicación de geo-19 «Fuerzas coplanarias y concurrentes» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  const pt = q => `(${q.map(N).join(', ')})`;
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const en = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  const rad = g => g * Math.PI / 180;

  // Capítulo 1: una fuerza de 10 N a 53°, con sus componentes (6, 8).  v { k }
  const O1 = [60, 176], U1 = 16, Q1 = en(O1, U1);
  const fuerza = (v, K) => {
    const q = k(v), T = Q1(6, 8);
    let h = rej(K, O1, U1, 0, 7, 0, 9) + K.r(O1[0] - 12, O1[1] - 12, 24, 24, 'fk', 4) + K.ar(...O1, ...T, 'la gr') + K.t(T[0] + 6, T[1], 'F = 10 N', 's ta', 'start');
    if (q >= 1) h += K.arc(...O1, 30, 0, 53, 'la') + K.t(O1[0] + 40, O1[1] - 14, 'θ = 53°', 's ta', 'start');
    if (q >= 2) h += K.l(...O1, ...Q1(6, 0), 'lg gr') + K.l(...Q1(6, 0), ...T, 'lf gr d') + K.t(Q1(3, 0)[0], O1[1] + 16, 'Fx = 6 N', 's tg') + K.t(Q1(6, 4)[0] + 6, Q1(6, 4)[1], 'Fy = 8 N', 's tf', 'start');
    if (q >= 3) h += K.t(334, 110, 'F = F(cos θ, sen θ)', 's', 'end') + K.t(334, 128, '= 10(0.6, 0.8) = (6, 8)', 's tm', 'end');
    if (q >= 4) h += K.c(...O1, 4, 'fo') + K.t(334, 150, 'aplicada en la caja', 's to', 'end');
    return h;
  };
  // Capítulo 1, tu turno: 10 N a 37°.  v { a, b }
  const turno1 = (v, K) => rej(K, O1, U1, 0, 10, 0, 10) + K.r(O1[0] - 12, O1[1] - 12, 24, 24, 'fk', 4) + K.arc(...O1, 30, 0, 37, 'lg') + K.t(O1[0] + 40, O1[1] - 8, '37°', 's tg', 'start')
    + K.ar(...O1, ...Q1(v.a, v.b), 'la gr') + K.t(334, 20, `F = ${pt([v.a, v.b])} N`, 's ta', 'end') + K.t(334, 38, `|F| = ${N(Math.hypot(v.a, v.b))} N`, 's tm', 'end');

  // Capítulo 2: F₁ = (7, 1), F₂ = (−3, 2), R = (4, 3).  v { k }
  const O2 = [120, 160], U2 = 20, Q2 = en(O2, U2), F1 = [7, 1], F2 = [-3, 2], R2 = [4, 3];
  const resultante = (v, K) => {
    const q = k(v);
    let h = rej(K, O2, U2, -5, 10, -1, 6);
    h += K.ar(...O2, ...Q2(...F1), 'lg gr') + K.t(Q2(...F1)[0] - 4, Q2(...F1)[1] + 16, 'F₁', 's tg', 'end');
    h += K.ar(...O2, ...Q2(...F2), 'lf gr') + K.t(Q2(...F2)[0] - 6, Q2(...F2)[1], 'F₂', 's tf', 'end');
    if (q === 1) h += K.l(...Q2(...F1), ...Q2(...R2), 'lm d') + K.l(...Q2(...F2), ...Q2(...R2), 'lm d');
    if (q === 2) h += K.ar(...Q2(...F1), ...Q2(...R2), 'lf d');
    if (q >= 1) h += K.ar(...O2, ...Q2(...R2), 'la gr') + K.t(Q2(...R2)[0] + 6, Q2(...R2)[1] - 4, 'R', 's ta', 'start');
    const dice = ['concurrentes: un mismo punto', 'diagonal del paralelogramo', 'punta con cola', 'R = (7 − 3, 1 + 2) = (4, 3)', '|R| = √(4² + 3²) = 5 · tan θ = 3/4', '√50 + √13 ≈ 10.7, no 5'][q];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  const fondo2 = K => K.t(14, 24, 'F₁ = (5, 2) N y F₂ = (1, 6) N', 'ta', 'start') + K.t(72, 69, 'Rx =', 's', 'end') + K.t(182, 69, 'Ry =', 's', 'end') + K.t(292, 69, '|R| =', 's', 'end') + K.t(14, 104, 'cada R en newtons', 's tm', 'start');

  // Capítulo 3: tres fuerzas en equilibrio, F₁ = (4, 0), F₂ = (−1, 3), F₃ = (−3, −3).  v { k }
  const O3 = [130, 144], U3 = 22, Q3 = en(O3, U3), G = [[4, 0], [-1, 3], [-3, -3]];
  const equilibrio = (v, K) => {
    const q = k(v);
    let h = rej(K, O3, U3, -4, 8, -2, 5), p = [0, 0];
    if (q === 0) G.forEach((F, i) => { h += K.ar(...O3, ...Q3(...F), `${['lg', 'lf', 'lm'][i]} gr`); });
    else G.forEach((F, i) => {
      const n = [p[0] + F[0], p[1] + F[1]];
      if (q >= 3 && i === 2) h += K.ar(...Q3(...p), ...Q3(...n), 'la gr d') + K.t(Q3(1.5, 1.5)[0] - 10, Q3(1.5, 1.5)[1], 'E = −R', 's ta', 'end');
      else h += K.ar(...Q3(...p), ...Q3(...n), `${['lg', 'lf', 'lm'][i]} gr`);
      p = n;
    });
    if (q >= 3) h += K.ar(...O3, ...Q3(3, 3), 'lo') + K.t(Q3(3, 3)[0] + 6, Q3(3, 3)[1] - 4, 'R = (3, 3)', 's to', 'start');
    h += K.c(...O3, 5, 'fk');
    const dice = ['tres fuerzas sobre un aro', 'punta con cola: vuelve al inicio', 'ΣFx = 4 − 1 − 3 = 0 · ΣFy = 0', 'sin F₃, sobra R = (3, 3)', 'la equilibrante es −R = (−3, −3)'][Math.min(q, 4)];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  // Capítulo 3, tu turno: equilibrante de (4, 1) y (−1, 2).  v { a, b }
  const O4 = [150, 120], U4 = 20, Q4 = en(O4, U4);
  const turno3 = (v, K) => {
    let h = rej(K, O4, U4, -6, 8, -4, 4) + K.ar(...O4, ...Q4(4, 1), 'lg gr') + K.ar(...Q4(4, 1), ...Q4(3, 3), 'lf gr');
    return h + K.c(...O4, 5, 'fk') + K.ar(...Q4(3, 3), ...Q4(3 + v.a, 3 + v.b), 'la gr') + K.t(14, 20, `E = ${pt([v.a, v.b])} N`, 's ta', 'start');
  };

  // Capítulo 4: un letrero colgado, una rampa y un cable en el espacio.  v { k }
  const aplicaciones = (v, K) => {
    const q = k(v);
    let h = '';
    if (q <= 2) {
      const P = [200, 120], c = 0.6, s = 0.8, A = [P[0] + 90 * c / s * 0 + 70, P[1] - 70 * s / c];
      h += K.l(40, 20, 40, 190, 'lm gr') + K.l(40, P[1], ...P, 'lm') + K.l(...P, A[0], A[1], 'lm') + K.l(A[0] - 20, A[1], A[0] + 30, A[1], 'lm gr');
      h += K.r(P[0] - 22, P[1] + 4, 44, 26, 'fk', 4) + K.ar(...P, P[0], P[1] + 60, 'lm gr') + K.t(P[0] + 26, P[1] + 56, '40 N', 's', 'start');
      h += K.arc(...P, 22, 0, 53, 'la') + K.t(P[0] + 30, P[1] - 4, '53°', 's ta', 'start');
      if (q >= 1) h += K.ar(...P, P[0] + 50 * c, P[1] - 50 * s, 'la gr') + K.ar(...P, P[0] - 30, P[1], 'lg gr') + K.t(14, 20, 'en x: T cos 53° = H', 's', 'start') + K.t(14, 38, 'en y: T sen 53° = 40', 's', 'start');
      if (q >= 2) h += K.t(14, 58, 'T = 40 / 0.8 = 50 N · H = 30 N', 's ta', 'start');
    } else if (q === 3) {
      const B = [40, 180], c = Math.cos(rad(30)), s = Math.sin(rad(30)), T = [B[0] + 260 * c, B[1] - 260 * s], M = [B[0] + 130 * c, B[1] - 130 * s];
      h += K.p([B, [T[0], B[1]], T], 'fn') + K.l(...B, ...T, 'lm gr') + K.arc(...B, 34, 0, 30, 'la') + K.t(B[0] + 42, B[1] - 6, '30°', 's ta', 'start');
      const C = [M[0] - s * 14, M[1] - c * 14];
      h += K.c(...C, 12, 'fk') + K.ar(...C, C[0], C[1] + 60, 'lm gr') + K.t(C[0] + 8, C[1] + 62, '20 N', 's', 'start');
      h += K.ar(...C, C[0] - 30 * c, C[1] + 30 * s, 'lg gr') + K.t(14, 20, 'a lo largo: 20 sen 30° = 10 N', 's tg', 'start') + K.t(14, 38, 'contra la rampa: 20 cos 30° ≈ 17.3 N', 's tf', 'start');
    } else {
      const o = [110, 176], u = 16, I = (x, y, z) => K.iso(o, u, x, y, z), A = I(0, 0, 6), B = I(2, 3, 0);
      h += K.l(...I(0, 0, 0), ...I(4, 0, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 5, 0), 'lm') + K.l(...I(0, 0, 0), ...A, 'lm gr') + K.l(...A, ...B, 'lg');
      h += K.c(...A, 4, 'fg') + K.t(A[0] + 8, A[1], 'A(0, 0, 6)', 's tg', 'start') + K.c(...B, 4, 'fg') + K.t(B[0] - 6, B[1] - 10, 'B(2, 3, 0)', 's tg', 'end');
      h += K.t(334, 20, 'AB = (2, 3, −6), |AB| = 7', 's', 'end');
      if (q >= 5) h += K.t(334, 40, 'T = 70 · AB / 7 = (20, 30, −60) N', 's ta', 'end');
    }
    return h;
  };
  // Capítulo 4, tu turno: inclinar la rampa hasta que la normal de 60 N sea 30 N.  v { g }
  const rampa = (v, K) => {
    const B = [40, 150], c = Math.cos(rad(v.g)), s = Math.sin(rad(v.g)), L = Math.min(260, 120 / Math.max(s, 0.01)), T = [B[0] + L * c, B[1] - L * s], M = [B[0] + L * 0.5 * c, B[1] - L * 0.5 * s];
    const C = [M[0] - s * 14, M[1] - c * 14];
    let h = K.l(20, B[1], 320, B[1], 'lm') + K.l(...B, ...T, 'lm gr') + K.arc(...B, 30, 0, v.g, 'la') + K.t(B[0] + 4, B[1] + 18, `θ = ${v.g}°`, 's ta', 'start');
    return h + K.c(...C, 12, 'fk') + K.ar(...C, C[0], C[1] + 40, 'lm gr') + K.t(C[0] + 16, C[1] + 6, '60 N', 's', 'start');
  };

  // Problema: maceta de 25 N con una cuerda horizontal y un cable a 30°.  v { T }
  const maceta = (v, K) => {
    const P = [220, 116], c = Math.cos(rad(30)), s = 0.5, A = [P[0] + 92 * c / s * 0.6, P[1] - 92 * 0.6];
    let h = K.l(30, 50, 30, 170, 'lm gr') + K.l(30, P[1], ...P, 'lm') + K.l(...P, ...A, 'lm') + K.l(A[0] - 30, A[1], 336, A[1], 'lm gr');
    h += K.arc(...P, 24, 0, 30, 'la') + K.t(P[0] + 30, P[1] + 4, '30°', 's ta', 'start');
    h += K.r(P[0] - 14, P[1] + 4, 28, 24, 'fk', 6) + K.ar(...P, P[0], P[1] + 50, 'lm gr') + K.t(P[0] + 18, P[1] + 46, '25 N', 's', 'start');
    h += K.ar(...P, P[0] + v.T * 1.1 * c, P[1] - v.T * 1.1 * s, 'la gr') + K.t(44, 20, `T = ${v.T} N`, 's ta', 'start');
    return h + K.t(44, 38, `parte vertical: T sen 30° = ${N(v.T / 2)} N`, 's tm', 'start');
  };

  xpLec('geo-19', [
    ['La fuerza es un vector',
      xpMira('dibujo', 'Una fuerza no es solo un número: tiene **tamaño**, **dirección** y un **punto** donde actúa. Por eso es una flecha, y se escribe por componentes.', { dib: fuerza, v: { k: 0 }, alto: 200 }, [
        ['Una fuerza se mide en newtons. Esta empuja la caja con 10 N: la flecha mide 10.', {}],
        ['Su dirección se da con el ángulo θ desde el eje x positivo: aquí, 53°.', { k: 1 }],
        ['Bajando una perpendicular sale un triángulo: la sombra en x y la altura en y son sus componentes.', { k: 2 }],
        ['Con el triángulo: Fx = F cos θ y Fy = F sen θ. Con 53°, el triángulo es el 6-8-10.', { k: 3 }, '$\\vec F = F(\\cos\\theta, \\sin\\theta)$'],
        ['El punto de aplicación importa: la misma flecha sobre otro cuerpo hace otra cosa.', { k: 4 }],
      ], 'Una fuerza es un vector: $\\vec F = F(\\cos\\theta, \\sin\\theta)$, con magnitud en newtons y punto de aplicación.'),
      xpHaz('dibujo', 'Una cuerda tira de la caja con 10 N a 37° sobre la horizontal. Arrastra la punta de la fuerza a sus componentes (cada cuadro es 1 N).', {
        dib: turno1, v: { a: 2, b: 2 }, metas: { a: 8, b: 6 }, alto: 200,
        manijas: [{ k: ['a', 'b'], min: 0, max: 10, paso: 1, en: v => Q1(v.a, v.b), de: (x, y) => [(x - O1[0]) / U1, (O1[1] - y) / U1] }],
        lee: v => `$\\vec F = (${v.a}, ${v.b})$ N`, pista: 'Con 37° el triángulo es el 3-4-5 agrandado: cos 37° = 0.8 y sen 37° = 0.6.' },
      '$\\vec F = 10(\\cos 37^{\\circ}, \\sin 37^{\\circ}) = (8, 6)$ N.')],
    ['La resultante',
      xpMira('dibujo', 'Si varias fuerzas actúan en un mismo punto, todas juntas hacen lo mismo que **una sola**: la resultante, su suma vectorial.', { dib: resultante, v: { k: 0 }, alto: 200 }, [
        ['Fuerzas concurrentes actúan en un mismo punto; coplanarias, en un mismo plano. Aquí F₁ y F₂ son las dos cosas.', {}],
        ['Gráficamente, la resultante es la diagonal del paralelogramo que forman F₁ y F₂.', { k: 1 }],
        ['O, igual, se pone F₂ a continuación de F₁, punta con cola: R va del inicio al final.', { k: 2 }],
        ['Por componentes es más fácil: se suman las x por un lado y las y por otro.', { k: 3 }, '$R_x = \\sum F_x,\\ R_y = \\sum F_y$'],
        ['La magnitud sale con Pitágoras y la dirección con la tangente, mirando el cuadrante.', { k: 4 }, '$|\\vec R| = \\sqrt{R_x^2 + R_y^2},\\ \\tan\\theta = \\dfrac{R_y}{R_x}$'],
        ['Cuidado: las magnitudes no se suman como números. Las flechas se compensan en parte.', { k: 5 }],
      ], 'La resultante es la suma vectorial: $R_x = \\sum F_x$, $R_y = \\sum F_y$, y su magnitud con Pitágoras.'),
      xpHaz('fichas', 'Halla la resultante de F₁ = (5, 2) N y F₂ = (1, 6) N y su magnitud.', {
        slots: [104, 214, 316].map(x => ({ x, y: 64, w: 44, h: 34 })), alto: 116, fondo: fondo2,
        fichas: ['6', '8', '10', '14', '4'], meta: ['6', '8', '10'], pista: 'Suma por separado las x y las y. Para la magnitud, Pitágoras con esos dos números.' },
      '$\\vec R = (6, 8)$ N y $|\\vec R| = \\sqrt{36 + 64} = 10$ N, no $\\sqrt{29} + \\sqrt{37}$.')],
    ['Equilibrio',
      xpMira('dibujo', 'Un cuerpo queda **quieto** (o sigue igual) cuando las fuerzas se anulan: puestas punta con cola, vuelven al punto de partida.', { dib: equilibrio, v: { k: 0 }, alto: 200 }, [
        ['Tres cuerdas tiran de un aro con F₁ = (4, 0), F₂ = (−1, 3) y F₃ = (−3, −3).', {}],
        ['Puestas punta con cola, la última termina donde empezó la primera: el polígono se cierra.', { k: 1 }],
        ['Eso es el equilibrio: la suma da el vector cero, o sea, cero en x y cero en y.', { k: 2 }, '$\\sum \\vec F = \\vec 0 \\iff \\sum F_x = 0,\\ \\sum F_y = 0$'],
        ['Sin F₃, las otras dos dejan una resultante R = (3, 3): el aro se movería.', { k: 3 }],
        ['La fuerza que lo devuelve al equilibrio es la equilibrante: −R, igual tamaño y sentido contrario.', { k: 4 }, '$\\vec E = -\\vec R$'],
      ], 'Equilibrio: $\\sum \\vec F = \\vec 0$, el polígono de fuerzas se cierra. La equilibrante es $-\\vec R$.'),
      xpHaz('dibujo', 'Dos cuerdas tiran de una argolla con (4, 1) N y (−1, 2) N. Arrastra la punta de E para que la argolla quede en equilibrio.', {
        dib: turno3, v: { a: 1, b: 0 }, metas: { a: -3, b: -3 }, alto: 210,
        manijas: [{ k: ['a', 'b'], min: [-6, -6], max: [4, 2], paso: 1, en: v => Q4(3 + v.a, 3 + v.b), de: (x, y) => [(x - O4[0]) / U4 - 3, (O4[1] - y) / U4 - 3] }],
        lee: v => `$\\vec E = (${v.a}, ${v.b})$ N`, pista: 'La punta de E tiene que caer en la argolla, donde empieza la primera flecha.' },
      'La resultante es $(3, 3)$ N, así que $\\vec E = (-3, -3)$ N.')],
    ['Cuerdas, rampas y el espacio',
      xpMira('dibujo', 'Con las componentes el equilibrio se vuelve **ecuaciones**: sirve para cuerdas, rampas y cables en el espacio.', { dib: aplicaciones, v: { k: 0 }, alto: 200 }, [
        ['Un letrero de 40 N cuelga de una cuerda horizontal y de un cable a 53°.', {}],
        ['Una ecuación por eje: lo horizontal se anula y lo vertical sostiene el peso.', { k: 1 }],
        ['Con sen 53° = 0.8 sale T = 50 N, y la cuerda horizontal tira con 30 N.', { k: 2 }],
        ['En una rampa, el peso se parte: W sen θ a lo largo y W cos θ contra la rampa.', { k: 3 }],
        ['En el espacio, la tensión de un cable va de A hacia B: T por el vector unitario del cable.', { k: 4 }, '$\\vec T = T\\,\\dfrac{\\vec{AB}}{|\\vec{AB}|}$'],
        ['Con T = 70 N y |AB| = 7, cada componente de AB se multiplica por 10.', { k: 5 }],
      ], 'Rampa: $W\\sin\\theta$ a lo largo y $W\\cos\\theta$ normal. Cable: $\\vec T = T\\,\\vec{AB}/|\\vec{AB}|$.'),
      xpHaz('dibujo', 'Una caja de 60 N está en una rampa. Desliza el ángulo hasta que la parte del peso que aprieta contra la rampa sea de 30 N.', {
        dib: rampa, v: { g: 10 }, metas: { g: 60 }, alto: 230, manijas: [{ k: 'g', min: 0, max: 80, paso: 10, et: 'ángulo de la rampa' }],
        lee: v => `$60\\cos ${v.g}^{\\circ} \\approx ${N(60 * Math.cos(rad(v.g)))}$ N`, pista: 'La parte normal es W cos θ: busca el ángulo cuyo coseno es un medio.' },
      '$60\\cos\\theta = 30$ da $\\cos\\theta = \\tfrac{1}{2}$, $\\theta = 60^{\\circ}$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una maceta de 25 N cuelga de una cuerda horizontal y de un cable a 30° sobre la horizontal. Desliza la tensión del cable hasta que la sostenga.', {
        dib: maceta, v: { T: 10 }, metas: { T: 50 }, alto: 230, manijas: [{ k: 'T', min: 0, max: 100, paso: 5, et: 'T del cable (N)' }],
        lee: v => `$T\\sin 30^{\\circ} = ${N(v.T / 2)}$ N`, pista: 'Solo el cable tiene parte vertical: T sen 30° tiene que igualar el peso.' },
      '$T\\sin 30^{\\circ} = 25$ da $T = 50$ N; la cuerda horizontal tira con $50\\cos 30^{\\circ} \\approx 43.3$ N.')],
  ], 'Las fuerzas se suman como vectores; en equilibrio la suma es cero, y eso da una ecuación por cada eje.');
}
