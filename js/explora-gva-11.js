// Geometría Vectorial · explicación de geo-11 «Vectores geométricos y vectores coordenados» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(Math.round(n * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h + K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
  };
  const fl = (K, P, a, b, cls) => { const A = P2(P, a), B = P2(P, b); return K.ar(A[0], A[1], B[0], B[1], cls); };
  const dot = (K, P, q, s, cls = 'fk', lado = 1) => { const Q = P2(P, q); return K.c(Q[0], Q[1], 4, cls) + (s ? K.t(Q[0] + 9 * lado, Q[1] + 4, s, 's', lado > 0 ? 'start' : 'end') : ''); };
  // Tramo de la recta Pt + t·d dentro del papel P (en unidades), o null.
  const corta = (Pt, d, P) => {
    let t0 = -1e9, t1 = 1e9;
    for (const [p0, dd, lo, hi] of [[Pt[0], d[0], P.x0, P.x1], [Pt[1], d[1], P.y0, P.y1]]) {
      if (Math.abs(dd) < 1e-12) { if (p0 < lo || p0 > hi) return null; continue; }
      const a = (lo - p0) / dd, b = (hi - p0) / dd; t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
    }
    return t1 > t0 ? [[Pt[0] + t0 * d[0], Pt[1] + t0 * d[1]], [Pt[0] + t1 * d[0], Pt[1] + t1 * d[1]]] : null;
  };
  // Proyección del espacio: x hacia el frente, y a la derecha, z hacia arriba.
  const pr = (o, U, x, y, z) => [o[0] + U * y - 0.5 * U * x, o[1] + 0.45 * U * x - U * z];

  // Capítulo 1: î, ĵ, w = 3î + 2ĵ y AB = B − A.  v { k }
  const C1 = plano({ x0: -3, x1: 5, y0: -2, y1: 4 }, 144, 134, 26);
  const canonica = (v, K) => {
    const q = k(v), O = P2(C1, [0, 0]);
    let h = papel(K, C1) + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end');
    if (q <= 3) h += fl(K, C1, [0, 0], [1, 0], 'lg gr') + fl(K, C1, [0, 0], [0, 1], 'lg gr') + K.t(O[0] + 13, O[1] + 16, 'î', 's tg') + K.t(O[0] - 8, O[1] - 10, 'ĵ', 's tg', 'end');
    if (q === 0) return h + K.t(170, 16, 'î y ĵ: largo 1, perpendiculares', 's ta');
    if (q <= 3) {
      for (let i = 1; i < 3; i++) h += fl(K, C1, [i, 0], [i + 1, 0], 'lg');
      for (let j = 0; j < 2; j++) h += fl(K, C1, [3, j], [3, j + 1], 'lg');
      h += fl(K, C1, [0, 0], [3, 2], 'la gr');
      if (q === 3) h += dot(K, C1, [3, 2], '(3, 2)', 'fA');
      return h + K.t(170, 16, ['', 'w = 3î + 2ĵ', 'w = aî + bĵ, con a = 3 y b = 2', 'vector, par y punto: (3, 2)'][q], 's ta');
    }
    h += dot(K, C1, [-2, 1], 'A', 'fk', -1) + dot(K, C1, [1, 3], 'B') + fl(K, C1, [-2, 1], [1, 1], 'lm d') + fl(K, C1, [1, 1], [1, 3], 'lm d') + fl(K, C1, [-2, 1], [1, 3], 'lf gr');
    return h + K.t(170, 16, q === 4 ? 'de A a B: 3 a la derecha y 2 arriba' : 'B − A = (1 − (−2), 3 − 1) = (3, 2)', 's ta');
  };
  // Capítulo 1, tu turno: A = (2, −1) y AB = (−4, 3).  v { x, y }
  const ponB = (v, K) => {
    let h = papel(K, C1) + dot(K, C1, [2, -1], 'A') + (v.x !== 2 || v.y !== -1 ? fl(K, C1, [2, -1], [v.x, v.y], 'la gr') : '');
    return h + K.t(170, 16, 'A = (2, −1); se busca B con AB = (−4, 3)', 's tm');
  };

  // Capítulo 2: u = (−1, √3): largo 2, dirección 120°, unitario.  v { k }
  const RO = [200, 150], RS = 50, U2 = [-1, Math.sqrt(3)];
  const rumbo = (v, K) => {
    const q = k(v), T = [RO[0] + U2[0] * RS, RO[1] - U2[1] * RS], C = [T[0], RO[1]];
    let h = K.l(40, RO[1], 320, RO[1], 'lm') + K.l(RO[0], 30, RO[0], 205, 'lm') + K.c(RO[0], RO[1], 4, 'fk');
    h += K.l(RO[0], RO[1], C[0], C[1], 'lf d') + K.l(C[0], C[1], T[0], T[1], 'lf d') + K.ar(RO[0], RO[1], T[0], T[1], 'la gr')
      + K.t((RO[0] + C[0]) / 2, RO[1] + 16, '1', 's tf') + K.t(C[0] - 8, (C[1] + T[1]) / 2 + 4, '√3', 's tf', 'end') + K.t(T[0] - 6, T[1] - 6, 'u', 's ta', 'end');
    if (q >= 1) h += K.t((RO[0] + T[0]) / 2 + 12, (RO[1] + T[1]) / 2, '2', 's ta', 'start');
    if (q >= 2) h += K.arc(RO[0], RO[1], 22, 0, 120, 'la') + K.t(RO[0] + 22, RO[1] - 26, 'θ', 's ta', 'start');
    if (q === 3) { const E = K.at(RO[0], RO[1], 50, -60); h += K.ar(RO[0], RO[1], E[0], E[1], 'lm d') + K.t(E[0] + 6, E[1], '−60°', 's tm', 'start'); }
    if (q >= 4) { const E = [RO[0] + U2[0] * RS / 2, RO[1] - U2[1] * RS / 2]; h += K.arc(RO[0], RO[1], RS / 2, 0, 360, 'lm') + K.c(E[0], E[1], 5, 'fo'); }
    return h + K.t(170, 16, ['u = (−1, √3)', '‖u‖ = √(1 + 3) = 2', 'tan θ = √3 ÷ (−1) = −√3', 'la calculadora: −60°; u está en el II: 120°', 'û = u ÷ 2 = (−1/2, √3/2)'][Math.min(q, 4)], 's ta');
  };
  // Capítulo 2, tu turno: la dirección de (2, −2).  v { g }
  const AG = [170, 110], AR = 80;
  const aguja = (v, K) => {
    let h = K.arc(AG[0], AG[1], AR, 0, 360, 'lm') + K.l(AG[0] - AR, AG[1], AG[0] + AR, AG[1], 'ls') + K.l(AG[0], AG[1] - AR, AG[0], AG[1] + AR, 'ls');
    h += K.t(AG[0] + AR + 6, AG[1] + 4, '0°', 's tm', 'start') + K.t(AG[0] - AR - 6, AG[1] + 4, '180°', 's tm', 'end');
    const T = K.at(AG[0], AG[1], AR, v.g);
    return h + K.arc(AG[0], AG[1], 20, 0, v.g, 'lm') + K.l(AG[0], AG[1], T[0], T[1], 'la gr') + K.c(AG[0], AG[1], 4, 'fk') + K.t(8, 16, 'v = (2, −2)', 's ta', 'start') + K.t(332, 16, `θ = ${v.g}°`, 's', 'end');
  };

  // Capítulo 3: de magnitud y dirección a componentes; la suma por componentes.  v { k }
  const C3 = plano({ x0: -1, x1: 5, y0: -2, y1: 4 }, 118, 134, 26);
  const polar = (v, K) => {
    const q = k(v);
    if (q <= 2) {
      const O = [210, 80], T = K.at(O[0], O[1], 80, 210), C = [T[0], O[1]];
      let h = K.l(60, O[1], 320, O[1], 'lm') + K.l(O[0], 30, O[0], 190, 'lm') + K.c(O[0], O[1], 4, 'fk') + K.ar(O[0], O[1], T[0], T[1], 'la gr') + K.arc(O[0], O[1], 20, 0, 210, 'lm')
        + K.t(O[0] + 24, O[1] - 18, '210°', 's tm', 'start') + K.t(T[0] - 6, T[1] + 14, '10 km', 's ta', 'end');
      if (q >= 1) h += K.l(O[0], O[1], C[0], C[1], 'lf d') + K.l(C[0], C[1], T[0], T[1], 'lf d') + K.t((O[0] + C[0]) / 2, O[1] - 8, '10·cos 210°', 's tf') + K.t(C[0] - 8, (C[1] + T[1]) / 2 + 4, '10·sen 210°', 's tf', 'end');
      return h + K.t(170, 16, ['un avión: 10 km con dirección 210°', 'x = r·cos θ, y = r·sen θ', '(−5√3, −5): al oeste y al sur'][q], 's ta') + (q === 2 ? K.t(170, 160, 'cos 210° = −√3/2, sen 210° = −1/2', 's tm') : '');
    }
    let h = papel(K, C3) + K.c(C3.ox, C3.oy, 4, 'fk') + fl(K, C3, [0, 0], [1, 2], 'lg gr') + K.t(C3.X(0.5) - 6, C3.Y(1), 'u', 's tg', 'end');
    if (q === 3 || q === 4) {
      h += fl(K, C3, [0, 0], [3, -1], 'lf gr') + K.t(C3.X(1.5), C3.Y(-0.5) + 14, 'v', 's tf');
      if (q === 4) h += fl(K, C3, [1, 2], [4, 1], 'lf gr d') + fl(K, C3, [0, 0], [4, 1], 'la gr');
      return h + dot(K, C3, [4, 1], '(4, 1)', 'fA') + K.t(170, 16, q === 3 ? '(1, 2) + (3, −1) = (4, 1)' : 'cola de v en la punta de u: llega a (4, 1)', 's ta');
    }
    return h + fl(K, C3, [0, 0], [2, 4], 'la gr d') + dot(K, C3, [2, 4], '2u = (2, 4)', 'fA') + K.t(170, 16, 'el doble de cada componente: el doble de largo', 's ta');
  };
  // Capítulo 3, tu turno: p + 3q con p = (−2, 1) y q = (1, −1).  v { x, y }
  const C3b = plano({ x0: -3, x1: 5, y0: -3, y1: 3 }, 144, 108, 26);
  const ponSuma = (v, K) => {
    let h = papel(K, C3b) + K.c(C3b.ox, C3b.oy, 4, 'fk') + fl(K, C3b, [0, 0], [-2, 1], 'lg gr') + fl(K, C3b, [0, 0], [1, -1], 'lf gr')
      + K.t(C3b.X(-1) - 4, C3b.Y(0.5) - 6, 'p', 's tg', 'end') + K.t(C3b.X(0.5) + 6, C3b.Y(-0.5) + 12, 'q', 's tf', 'start');
    if (v.x || v.y) h += fl(K, C3b, [0, 0], [v.x, v.y], 'la gr');
    return h + K.t(170, 16, 'p = (−2, 1), q = (1, −1): ¿dónde termina p + 3q?', 's tm');
  };

  // Capítulo 4: el espacio (k̂, octantes, distancia) y otra base del plano.  v { k }
  const E4 = [120, 150], U4 = 24, B4 = plano({ x0: -2, x1: 5, y0: -1, y1: 4 }, 126, 150, 26);
  const espacio = (v, K) => {
    const q = k(v);
    if (q >= 4) {
      let h = '';
      for (let t = -8; t <= 8; t++) for (const [Pt, d] of [[[-t, t], [2, 1]], [[2 * t, t], [-1, 1]]]) {
        const s = corta(Pt, d, B4); if (s) { const A = P2(B4, s[0]), B = P2(B4, s[1]); h += K.l(A[0], A[1], B[0], B[1], 'ls'); }
      }
      h +=K.l(B4.X(-2), B4.oy, B4.X(5), B4.oy, 'lm') + K.l(B4.ox, B4.Y(-1), B4.ox, B4.Y(4), 'lm') + K.c(B4.ox, B4.oy, 4, 'fk');
      h += fl(K, B4, [0, 0], [2, 1], 'lg gr') + fl(K, B4, [2, 1], [4, 2], 'lg gr') + fl(K, B4, [4, 2], [3, 3], 'lf gr') + dot(K, B4, [3, 3], 'Q = (3, 3)', 'fA');
      return h + K.t(170, 16, q === 4 ? 'e₁ = (2, 1), e₂ = (−1, 1): Q = 2e₁ + 1e₂' : 'en esa base Q es (2, 1); con î y ĵ, (3, 3)', 's ta');
    }
    const Pp = (x, y, z) => pr(E4, U4, x, y, z), O = Pp(0, 0, 0), X1 = Pp(4, 0, 0), Y1 = Pp(0, 5, 0), Z1 = Pp(0, 0, 5);
    let h = K.ar(O[0], O[1], X1[0], X1[1], 'lm') + K.ar(O[0], O[1], Y1[0], Y1[1], 'lm') + K.ar(O[0], O[1], Z1[0], Z1[1], 'lm')
      + K.t(X1[0] - 8, X1[1], 'x', 's tm', 'end') + K.t(Y1[0] + 6, Y1[1] + 4, 'y', 's tm', 'start') + K.t(Z1[0] + 8, Z1[1] + 4, 'z', 's tm', 'start');
    if (q === 0) {
      const a = Pp(1, 0, 0), b = Pp(0, 1, 0), c = Pp(0, 0, 1);
      return h + K.ar(O[0], O[1], a[0], a[1], 'lg gr') + K.ar(O[0], O[1], b[0], b[1], 'lg gr') + K.ar(O[0], O[1], c[0], c[1], 'la gr')
        + K.t(c[0] - 8, c[1], 'k̂', 's ta', 'end') + K.t(170, 16, 'î, ĵ y ahora k̂: tres flechas de largo 1', 's ta');
    }
    const S = Pp(2, 3, 0), T = Pp(2, 3, 4), Sx = Pp(2, 0, 0), Sy = Pp(0, 3, 0);
    h += K.l(S[0], S[1], Sx[0], Sx[1], 'lm d') + K.l(S[0], S[1], Sy[0], Sy[1], 'lm d') + K.l(S[0], S[1], T[0], T[1], 'lm d') + K.c(T[0], T[1], 5, 'fA') + K.t(T[0] + 8, T[1] - 4, '(2, 3, 4)', 's', 'start');
    if (q === 3) h += K.l(O[0], O[1], S[0], S[1], 'lf gr') + K.ar(O[0], O[1], T[0], T[1], 'la gr');
    return h + K.t(170, 16, ['', '2î + 3ĵ + 4k̂: 2 en x, 3 en y, sube 4', 'tres planos: ocho octantes; aquí todo +', '√(2² + 3² + 4²) = √29'][q], 's ta');
  };
  // Capítulo 4, tu turno: Q = (5, 4) en la base e₁ = (1, 2), e₂ = (1, −1).  v { a, b }
  const B4b = plano({ x0: -2, x1: 6, y0: -2, y1: 6 }, 132, 116, 16);
  const otraBase = (v, K) => {
    let h = papel(K, B4b) + K.c(B4b.ox, B4b.oy, 3, 'fk') + fl(K, B4b, [0, 0], [1, 2], 'lg gr') + fl(K, B4b, [0, 0], [1, -1], 'lg gr') + dot(K, B4b, [5, 4], 'Q', 'fk');
    const A = [v.a, 2 * v.a], E = [v.a + v.b, 2 * v.a - v.b];
    if (v.a) h += fl(K, B4b, [0, 0], A, 'la gr');
    if (v.b) h += fl(K, B4b, A, E, 'lf gr');
    return h + K.t(240, 40, 'e₁ = (1, 2)', 's ta', 'start') + K.t(240, 60, 'e₂ = (1, −1)', 's ta', 'start') + K.t(240, 80, 'Q = (5, 4)', 's', 'start')
      + K.t(240, 110, `llega a (${sg(E[0])}, ${sg(E[1])})`, 's tm', 'start');
  };

  // Problema: el dron de rescate, de (2, 1, 0) a (3, 5, 8).  v { d }
  const E5 = [140, 170], U5 = 16, BA = [2, 1, 0], RF = [3, 5, 8];
  const rescate = (v, K) => {
    const Pp = q => pr(E5, U5, ...q), A = Pp(BA), B = Pp(RF);
    let h = K.pl([A, Pp([3, 1, 0]), Pp([3, 5, 0]), B], 'ls d') + K.l(A[0], A[1], B[0], B[1], 'lm d') + K.c(A[0], A[1], 5, 'fk') + K.c(B[0], B[1], 6, 'fn')
      + K.t(A[0] - 10, A[1] + 4, 'base (2, 1, 0)', 's', 'end') + K.t(B[0] + 10, B[1] + 4, 'refugio (3, 5, 8)', 's', 'start');
    const t = Math.min(v.d / 9, 1.3), D = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
    return h + (v.d ? K.l(A[0], A[1], D[0], D[1], 'la gr') + K.c(D[0], D[1], 6, 'fA') : '') + K.t(8, 16, 'en km', 's tm', 'start');
  };

  xpLec('geo-11', [
    ['Dos flechas para todo',
      xpMira('dibujo', 'Con dos flechas de largo 1 se **escribe** cualquier otra.', { dib: canonica, v: { k: 0 }, alto: 200 }, [
        ['Se eligen î, una unidad a la derecha, y ĵ, una unidad hacia arriba. Son perpendiculares y miden 1.', {}],
        ['Tres pasos de î y luego dos de ĵ: la flecha w que sale de O es 3î + 2ĵ.', { k: 1 }],
        ['Cada flecha que sale de O se escribe así de una sola forma. a y b son sus componentes.', { k: 2 }, '$\\vec w = a\\,\\hat\\imath + b\\,\\hat\\jmath$'],
        ['La punta de w cae en el punto (3, 2). Vector, par y punto: tres nombres para lo mismo.', { k: 3 }],
        ['Esta flecha va de A a B, no sale de O. Pero avanza 3 y sube 2: es otra vez (3, 2).', { k: 4 }],
        ['Por eso el vector de A a B es punta menos cola: cada coordenada de B menos la de A.', { k: 5 }, '$\\overrightarrow{AB} = B - A$'],
      ], 'Con $\\hat\\imath$ y $\\hat\\jmath$, cada vector es un par $(a, b)$ y un punto; el de A a B es $B - A$.'),
      xpHaz('dibujo', 'A está en (2, −1). Arrastra B para que el vector de A a B sea (−4, 3).', {
        dib: ponB, v: { x: 2, y: -1 }, metas: { x: -2, y: 2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-3, -2], max: [5, 4], paso: 1, en: v => P2(C1, [v.x, v.y]), de: (x, y) => [(x - C1.ox) / C1.u, (C1.oy - y) / C1.u] }],
        lee: v => `$B - A = (${v.x} - 2,\\ ${v.y} + 1) = (${v.x - 2}, ${v.y + 1})$`, pista: 'B = A + (−4, 3): desde A, 4 a la izquierda y 3 hacia arriba.' },
      '$B = A + (-4, 3) = (-2, 2)$, porque $B - A = (-2 - 2,\\ 2 + 1) = (-4, 3)$.')],
    ['Largo, rumbo y unitario',
      xpMira('dibujo', 'Dentro de cada vector hay un **triángulo rectángulo**.', { dib: rumbo, v: { k: 0 }, alto: 212 }, [
        ['El vector u = (−1, √3) esconde un triángulo: 1 hacia la izquierda y √3 hacia arriba.', {}],
        ['Su largo es la hipotenusa del triángulo: la raíz de la suma de los cuadrados. Aquí da 2.', { k: 1 }, '$\\|(a, b)\\| = \\sqrt{a^2 + b^2}$'],
        ['La dirección es el ángulo θ desde 0°, contra las agujas del reloj. Cumple tan θ = b/a.', { k: 2 }],
        ['La calculadora da −60°, que apunta abajo a la derecha. Pero u está en el segundo cuadrante: 120°.', { k: 3 }],
        ['Al dividir u entre su largo queda una flecha de largo 1 con el mismo rumbo: el unitario.', { k: 4 }, '$\\hat u = \\tfrac{\\vec u}{\\|\\vec u\\|} = \\left(-\\tfrac12, \\tfrac{\\sqrt3}{2}\\right)$'],
      ], 'Largo $\\sqrt{a^2 + b^2}$; dirección con $\\tan\\theta = \\tfrac{b}{a}$ y los signos; unitario $\\tfrac{\\vec u}{\\|\\vec u\\|}$.'),
      xpHaz('dibujo', 'Gira la aguja hasta la dirección de v = (2, −2). Fíjate primero en el cuadrante.', {
        dib: aguja, v: { g: 0 }, metas: { g: 315 }, alto: 200,
        manijas: [{ k: 'g', min: 0, max: 345, paso: 15, en: v => XPK.at(AG[0], AG[1], AR, v.g), de: (x, y) => { let g = (Math.atan2(AG[1] - y, x - AG[0]) * 180 / Math.PI + 360) % 360; if (g > 352.5) g = 0; return g; } }],
        lee: v => `$\\theta = ${v.g}^{\\circ}$`, pista: 'x positiva e y negativa: cuarto cuadrante. El ángulo de referencia tiene tangente 1.' },
      '$\\tan\\theta = -1$ con $x > 0$, $y < 0$: cuarto cuadrante, $\\theta = 360^{\\circ} - 45^{\\circ} = 315^{\\circ}$.')],
    ['Del rumbo a las componentes',
      xpMira('dibujo', 'Con magnitud y dirección se sacan las **componentes**; y se opera con ellas.', { dib: polar, v: { k: 0 }, alto: 200 }, [
        ['Un avión vuela 10 km con dirección 210°. ¿Cuánto avanzó en x y cuánto en y?', {}],
        ['Las sombras sobre los ejes miden r·cos θ y r·sen θ.', { k: 1 }, '$\\vec u = (r\\cos\\theta,\\ r\\operatorname{sen}\\theta)$'],
        ['cos 210° = −√3/2 y sen 210° = −1/2: el avión fue (−5√3, −5). Los signos dicen oeste y sur.', { k: 2 }],
        ['Sumar es sumar componente a componente: (1, 2) + (3, −1) = (4, 1).', { k: 3 }],
        ['Y coincide con las flechas: la cola de v en la punta de u llega al mismo punto (4, 1).', { k: 4 }],
        ['Con un número pasa igual: 2·(1, 2) = (2, 4) es la flecha estirada al doble.', { k: 5 }, '$c\\,(a, b) = (ca, cb)$'],
      ], 'Con magnitud $r$ y dirección $\\theta$, $\\vec u = (r\\cos\\theta, r\\operatorname{sen}\\theta)$; sumar y escalar va por componentes.'),
      xpHaz('dibujo', 'Con p = (−2, 1) y q = (1, −1), arrastra P a donde termina p + 3q desde O.', {
        dib: ponSuma, v: { x: 0, y: 0 }, metas: { x: 1, y: -2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-3, -3], max: [5, 3], paso: 1, en: v => P2(C3b, [v.x, v.y]), de: (x, y) => [(x - C3b.ox) / C3b.u, (C3b.oy - y) / C3b.u] }],
        lee: v => `$P = (${v.x}, ${v.y})$`, pista: 'Primero 3q = (3, −3); luego suma cada componente con la de p.' },
      '$\\vec p + 3\\vec q = (-2 + 3,\\ 1 - 3) = (1, -2)$.')],
    ['El espacio y otras bases',
      xpMira('dibujo', 'En el espacio hace falta una **tercera** flecha; y en el plano sirven otras dos.', { dib: espacio, v: { k: 0 }, alto: 210 }, [
        ['En el espacio se añade k̂, hacia arriba. Un punto lleva tres números: (x, y, z).', {}],
        ['Para llegar a (2, 3, 4) se avanza en x, luego en y, y al final se sube.', { k: 1 }],
        ['Los tres planos de coordenadas parten el espacio en ocho octantes, según los signos de x, y, z.', { k: 2 }],
        ['La distancia es Pitágoras dos veces: la diagonal del piso y luego con la altura.', { k: 3 }, '$\\|(a, b, c)\\| = \\sqrt{a^2 + b^2 + c^2}$'],
        ['En el plano, dos flechas e₁ y e₂ no paralelas también sirven: Q es 2e₁ + 1e₂.', { k: 4 }],
        ['En esa base sus coordenadas son (2, 1). Las coordenadas cambian con la base; el punto, no.', { k: 5 }],
      ], 'En el espacio, $(a, b, c) = a\\hat\\imath + b\\hat\\jmath + c\\hat k$; dos vectores no paralelos son otra base del plano.'),
      xpHaz('dibujo', 'Con e₁ = (1, 2) y e₂ = (1, −1), ajusta a y b para que a·e₁ + b·e₂ llegue a Q = (5, 4).', {
        dib: otraBase, v: { a: 0, b: 0 }, metas: { a: 3, b: 2 }, alto: 250,
        manijas: [{ k: 'a', min: -4, max: 4, paso: 1, et: 'a' }, { k: 'b', min: -4, max: 4, paso: 1, et: 'b' }],
        lee: v => `$${v.a}\\,\\vec e_1 + ${v.b < 0 ? `(${v.b})` : v.b}\\,\\vec e_2 = (${v.a + v.b}, ${2 * v.a - v.b})$`, pista: 'Iguala: a + b = 5 con las x y 2a − b = 4 con las y. Suma las dos ecuaciones.' },
      '$a + b = 5$ y $2a - b = 4$ dan $3a = 9$: $a = 3$, $b = 2$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un dron de rescate sale de la base (2, 1, 0) hacia un refugio en (3, 5, 8), en km. Ajusta la distancia que debe volar en línea recta para llegar justo.', {
        dib: rescate, v: { d: 0 }, metas: { d: 9 }, alto: 250, manijas: [{ k: 'd', min: 0, max: 15, paso: 1, et: 'distancia en km' }],
        lee: v => `$d = ${v.d}$ km`, pista: 'Resta refugio menos base y saca la raíz de la suma de los tres cuadrados.' },
      'El desplazamiento es $(1, 4, 8)$ y $\\sqrt{1 + 16 + 64} = \\sqrt{81} = 9$ km.')],
  ], 'Cada vector es un par o una terna: $Q - P$, largo, dirección con su cuadrante, unitario y componentes; otra base, otras coordenadas.');
}
