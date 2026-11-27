// Geometría Vectorial · explicación de geo-20 «Cinemática» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: la posición es una flecha; el desplazamiento solo mira la salida y la llegada, y el camino puede ser más largo;
// la velocidad media reparte Δr en el tiempo. Con velocidad constante la posición recorre una recta con reloj; dos móviles se
// encuentran si coinciden con el mismo t, y si no, están más cerca en el pie de la perpendicular. Lo que se ve desde tierra es la
// velocidad propia más la del medio, y desde un carro se resta la del carro. El tiro parabólico suma tres flechas. Los ejemplos no
// son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  const r2 = x => Math.round(x * 100) / 100;
  const pl = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h + K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
  };
  const rot = (K, A, B, s, cls, lado = 1) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * 12, (A[1] + B[1]) / 2 - lado * dx / L * 12 + 4, s, `s ${cls}`);
  };
  const vec = q => `(${q.map(x => sg(r2(x))).join(', ')})`;

  // 1 · el gato: 4 m al norte y 3 m al este, en 5 s
  const P1 = pl({ x0: -5, x1: 4, y0: -3, y1: 5 }, 180, 140, 22);
  const gato = (v, K) => {
    const O = [P1.ox, P1.oy], S = P2(P1, [-3, -1]), M = P2(P1, [-3, 3]), E = P2(P1, [0, 3]);
    let h = pap(K, P1) + K.c(O[0], O[1], 3, 'fk') + K.t(O[0] + 6, O[1] + 14, 'O', 's tm', 'start');
    h += K.f(v.pos, K.ar(O[0], O[1], S[0], S[1], 'lg') + rot(K, O, S, 'r₁', 'tg', 1));
    h += K.f(v.camino, K.pl([S, M, E], 'lm gr') + K.t(M[0] - 8, (S[1] + M[1]) / 2, '4 m', 's tm', 'end') + K.t((M[0] + E[0]) / 2, M[1] - 8, '3 m', 's tm') + K.ar(O[0], O[1], E[0], E[1], 'lg') + rot(K, O, E, 'r₂', 'tg', -1));
    h += K.f(v.dr, K.ar(S[0], S[1], E[0], E[1], 'la gr') + rot(K, S, E, 'Δr', 'ta', -1));
    h += K.f(v.largo, K.t(332, 18, '‖Δr‖ = 5 m · camino 7 m', 's ta', 'end'));
    h += K.f(v.vm, K.t(8, 18, 'en 5 s: vₘ = (0.6, 0.8) m/s', 's ta', 'start'));
    h += K.f(v.vuelta, K.l(E[0], E[1] + 3, S[0] + 3, S[1], 'lf d') + K.t(332, 218, 'si vuelve: Δr = (0, 0)', 's tf', 'end'));
    return h + K.c(S[0], S[1], 5, 'fG') + K.f(v.camino, K.c(E[0], E[1], 5, 'fG'));
  };
  const P1b = pl({ x0: -5, x1: 3, y0: -3, y1: 4 }, 200, 124, 24);
  const hazDesp = (v, K) => {
    const O = [P1b.ox, P1b.oy], A = P2(P1b, [1, -2]), B = P2(P1b, [-3, 1]), D = P2(P1b, [v.x, v.y]);
    let h = pap(K, P1b) + K.ar(O[0], O[1], A[0], A[1], 'lg') + K.t(A[0] + 8, A[1] + 4, 'r₁ = (1, −2)', 's tg', 'start') + K.ar(O[0], O[1], B[0], B[1], 'lg') + K.t(B[0] - 8, B[1] - 6, 'r₂ = (−3, 1)', 's tg', 'end');
    if (v.x || v.y) h += K.ar(O[0], O[1], D[0], D[1], 'la gr');
    return h + K.t(8, 18, `Δr = ${vec([v.x, v.y])}`, 's ta', 'start');
  };

  // 2 · la recta con reloj: A = (−4, −2) + t(2, 1) y B = (2, −4) + t(−1, 2); luego B sale un segundo tarde
  const P2a = pl({ x0: -5, x1: 5, y0: -5, y1: 4 }, 170, 112, 20);
  const enA = t => [-4 + 2 * t, -2 + t], enB = (t, tarde) => { const s = Math.max(0, t - tarde); return [2 - s, -4 + 2 * s]; };
  const reloj = (v, K) => {
    const tarde = v.tarde > 0.5 ? 1 : 0, A = P2(P2a, enA(v.t)), A0 = P2(P2a, enA(0)), A4 = P2(P2a, enA(4.4));
    let h = pap(K, P2a) + K.l(A0[0], A0[1], A4[0], A4[1], 'lg d');
    for (let t = 0; t <= 4; t++) { const q = P2(P2a, enA(t)); h += K.f(v.marcas, K.c(q[0], q[1], 2.5, 'fM') + K.t(q[0] + 2, q[1] + 15, `${t} s`, 's tm')); }
    h += K.c(A[0], A[1], 6, 'fG') + K.t(A[0] - 9, A[1] - 7, 'A', 's tg', 'end') + K.t(8, 18, `t = ${r2(v.t)} s · A = ${vec(enA(v.t))}`, 's ta', 'start');
    if (v.B > 0.01) {
      const B0 = P2(P2a, enB(0, 0)), B4 = P2(P2a, enB(4.2, 0)), B = P2(P2a, enB(v.t, tarde));
      h += K.f(v.B, K.l(B0[0], B0[1], B4[0], B4[1], 'lf d') + K.c(B[0], B[1], 6, 'fF') + K.t(B[0] + 9, B[1] + 4, 'B', 's tf', 'start'));
    }
    h += K.f(v.tarde, K.t(332, 218, 'B sale 1 s tarde', 's tf', 'end'));
    if (v.rel > 0.01) { const B = P2(P2a, enB(v.t, 1)); h += K.f(v.rel, K.l(A[0], A[1], B[0], B[1], 'lo gr') + K.t(332, 36, 'lo más cerca: d ⟂ v_B − v_A', 's to', 'end')); }
    return h;
  };
  const P2b = pl({ x0: -4, x1: 5, y0: -5, y1: 4 }, 136, 112, 22);
  const hazReloj = (v, K) => {
    const S = P2(P2b, [-3, 2]), V = P2(P2b, [-1, 0]), Q = P2(P2b, [v.x, v.y]);
    return pap(K, P2b) + K.c(S[0], S[1], 5, 'fG') + K.t(S[0] - 8, S[1] - 8, 'r₀', 's tg', 'end') + K.ar(S[0], S[1], V[0], V[1], 'lg gr') + K.t(V[0] + 8, V[1] - 6, 'v (1 s)', 's tg', 'start')
      + K.c(Q[0], Q[1], 4, 'fk') + K.t(8, 18, `a los 2.5 s: ${vec([v.x, v.y])}`, 's ta', 'start');
  };

  // 3 · el río de 30 m que corre a (4, 0), con un bote de 5 m/s; al final, la lluvia vista desde un carro
  const RB = [110, 190], LJ = 40, UV = 14;
  const rio = (v, K) => {
    const m = Math.round(v.modo);
    if (m === 4) {   // la lluvia (0, −12) vista desde un carro (5, 0)
      const O = [150, 40], L = [O[0], O[1] + 12 * 12], R = [O[0] - 5 * 12, O[1] + 12 * 12];
      let h = '';
      [40, 70, 260, 290].forEach((x, i) => { h += K.l(x, 30 + 8 * i, x, 90 + 8 * i, 'lr'); });
      h += K.ar(O[0], O[1], L[0], L[1], 'lg gr') + K.t(L[0] + 8, L[1], 'suelo (0, −12)', 's tg', 'start') + K.l(L[0], L[1], R[0], R[1], 'lf d') + K.t((L[0] + R[0]) / 2, L[1] + 16, '− carro (5, 0)', 's tf');
      h += K.ar(O[0], O[1], R[0], R[1], 'la gr') + K.t(R[0] - 8, (O[1] + R[1]) / 2, 'desde el carro', 's ta', 'end') + K.c(O[0], O[1], 4, 'fk');
      return h + K.t(8, 18, '(0, −12) − (5, 0) = (−5, −12): 13 m/s', 's ta', 'start');
    }
    const w = m === 2 || m === 3 ? [-4, 3] : [0, 5], g = [w[0] + 4, w[1]], W = [RB[0] + w[0] * UV, RB[1] - w[1] * UV], G = [RB[0] + g[0] * UV, RB[1] - g[1] * UV];
    let h = K.r(8, LJ, 324, RB[1] - LJ, 'fc', 0) + K.l(8, LJ, 332, LJ, 'lm gr') + K.l(8, RB[1], 332, RB[1], 'lm gr') + K.t(14, RB[1] + 18, 'el río mide 30 m', 's tm', 'start');
    [[220, 70], [240, 120], [200, 165]].forEach(([x, y]) => { h += K.ar(x, y, x + 4 * UV, y, 'lr'); });
    h += K.t(254, 62, 'corriente (4, 0)', 's tf', 'middle') + K.ar(RB[0], RB[1], W[0], W[1], 'la gr') + K.t(W[0] + (w[0] < 0 ? 0 : 8), W[1] - 10, `proa ${vec(w)}`, 's ta', w[0] < 0 ? 'middle' : 'start');
    if (m >= 1) {
      const L = [RB[0] + g[0] / g[1] * (RB[1] - LJ), LJ];
      h += K.l(W[0], W[1], G[0], G[1], 'lm d') + K.ar(RB[0], RB[1], G[0], G[1], 'lo gr') + K.t(G[0] + 8, G[1] + 14, `tierra ${vec(g)}`, 's to', 'start');
      h += K.l(RB[0], RB[1], L[0], L[1], 'lo d') + K.c(L[0], L[1], 5, 'fo');
      h += K.t(8, 18, m === 1 ? 'cruza en 6 s y baja 24 m' : 'cruza derecho', 's to', 'start');
    }
    h += K.f(v.tiempo, K.t(332, 18, 'tarda 30 / 3 = 10 s', 's ta', 'end'));
    h += K.f(m === 3 ? 1 : 0, K.t(332, 36, 'avión: aire + viento = tierra', 's tm', 'end'));
    return h + K.p([[RB[0] - 9, RB[1] + 2], [RB[0] + 9, RB[1] + 2], [RB[0] + 5, RB[1] + 9], [RB[0] - 5, RB[1] + 9]], 'fk');
  };
  // Tu turno: un río de 40 m que corre a (2, 0); el bote apunta derecho a (0, 4). ¿Dónde llega?
  const hazDeriva = (v, K) => {
    const s = 6, x0 = 50, near = 160, far = 40, L = [x0 + v.d * s, far];
    let h = K.r(8, far, 324, near - far, 'fc', 0) + K.l(8, far, 332, far, 'lm gr') + K.l(8, near, 332, near, 'lm gr') + K.t(332, near + 16, 'el río mide 40 m', 's tm', 'end');
    for (let d = 0; d <= 40; d += 10) h += K.l(x0 + d * s, far - 4, x0 + d * s, far + 4, 'lm') + K.t(x0 + d * s, far - 8, `${d}`, 's tm');
    h += K.ar(240, 100, 268, 100, 'lr') + K.t(254, 92, 'corriente (2, 0)', 's tf') + K.ar(x0, near, x0, near - 4 * 12, 'la gr') + K.t(x0 + 8, near - 30, 'proa (0, 4)', 's ta', 'start');
    return h + K.c(x0, near, 5, 'fk') + K.c(L[0], L[1], 5, 'fA') + K.t(332, 18, `llega ${v.d} m río abajo`, 's ta', 'end');
  };

  // 4 · el tiro con v₀ = (6, 15): escalas distintas en x y en y (la suma de flechas no cambia)
  const GT = 214, XT = 50, SX = 12, SY = 4;
  const pT = q => [XT + q[0] * SX, GT - q[1] * SY];
  const en4 = t => [6 * t, 15 * t - 5 * t * t];
  const tiro = (v, K) => {
    let h = K.l(8, GT, 332, GT, 'lm gr');
    for (let m = 0; m <= 20; m += 5) h += K.l(XT + m * SX, GT, XT + m * SX, GT + 5, 'lm') + K.t(XT + m * SX, GT + 16, `${m} m`, 's tm');
    const t = v.t, pts = [];
    for (let k = 0; k <= 30; k++) pts.push(pT(en4(t * k / 30)));
    const O = pT([0, 0]), A = pT([6 * t, 15 * t]), B = pT(en4(t));
    const g = Math.min(1, v.g), Bv = [A[0] + (B[0] - A[0]) * g, A[1] + (B[1] - A[1]) * g];
    h += K.f(g, K.pl(pts, 'la d')) + K.f(v.sin, K.ar(O[0], O[1], A[0], A[1], 'lg gr') + K.t(A[0] - 8, A[1] - 4, 't·v₀', 's tg', 'end'));
    h += K.f(v.g, K.ar(A[0], A[1], B[0], B[1], 'lf gr') + K.t(A[0] + 8, (A[1] + B[1]) / 2, '½t²·g', 's tf', 'start'));
    h += K.c(Bv[0], Bv[1], 6, 'fA') + K.t(8, 18, `t = ${r2(t)} s · r = ${vec(g > 0.99 ? en4(t) : [6 * t, 15 * t - 5 * t * t * g])}`, 's ta', 'start');
    h += K.f(v.top, K.l(8, pT([0, 11.25])[1], 332, pT([0, 11.25])[1], 'lo d') + K.t(330, pT([0, 11.25])[1] - 5, 'cima: 11.25 m', 's to', 'end'));
    return h;
  };
  const G2 = 190;   // suelo de las escenas con regla abajo
  const hazTiro = (v, K) => {
    let h = K.l(8, G2, 332, G2, 'lm gr');
    for (let m = 0; m <= 14; m += 2) h += K.l(XT + m * 18, G2, XT + m * 18, G2 + 5, 'lm') + K.t(XT + m * 18, G2 + 16, `${m}`, 's tm');
    const F = XT + v.x * 18;
    return h + K.c(XT, G2, 4, 'fk') + K.ar(XT, G2, XT + 7 * 6, G2 - 5 * 6, 'lg gr') + K.t(XT + 48, G2 - 34, 'v₀ = (7, 5)', 's tg', 'start')
      + K.l(F, G2, F, G2 - 26, 'la') + K.p([[F, G2 - 26], [F + 12, G2 - 21], [F, G2 - 16]], 'fA') + K.t(332, 18, `bandera a ${v.x} m`, 's ta', 'end');
  };

  // Problema: la manguera con v₀ = (10, 10) m/s y la pared a 10 m
  const manguera = (v, K) => {
    const s = 12, x0 = 60, W = x0 + 10 * s, H = G2 - v.h * s;
    let h = K.l(8, G2, 332, G2, 'lm gr') + K.r(W, 30, 16, G2 - 30, 'fc', 0) + K.t(W + 22, 44, 'pared a 10 m', 's tm', 'start');
    for (let y = 0; y <= 15; y += 5) h += K.l(W - 4, G2 - y * s, W, G2 - y * s, 'lm') + K.t(W - 7, G2 - y * s + 4, `${y}`, 's tm', 'end');
    h += K.c(x0, G2, 5, 'fk') + K.ar(x0, G2, x0 + 40, G2 - 40, 'lg gr') + K.t(x0 + 46, G2 - 42, 'v₀ = (10, 10)', 's tg', 'start');
    return h + K.l(W - 14, H, W + 16, H, 'la gr') + K.c(W, H, 5, 'fA') + K.t(8, 18, `pega a ${v.h} m`, 's ta', 'start');
  };

  xpLec('geo-20', [
    ['Dónde está y cuánto se movió',
      xpMira('dibujo', 'La **posición** es una flecha desde el origen. El **desplazamiento** solo mira la salida y la llegada; el camino puede ser más largo.', { dib: gato, v: { pos: 0, camino: 0, dr: 0, largo: 0, vm: 0, vuelta: 0 }, alto: 226 }, [
        ['La posición es la flecha r del origen al móvil. Si el móvil se mueve, la punta se corre.', { pos: 1 }],
        ['Un gato camina 4 m al norte y luego 3 m al este: recorre 4 + 3 = 7 m.', { camino: 1 }],
        ['El desplazamiento solo mira la salida y la llegada: es la flecha r₂ − r₁.', { dr: 1 }, '$\\Delta\\vec r = \\vec r_2 - \\vec r_1 = (0, 3) - (-3, -1) = (3, 4)$'],
        ['Su largo es 5 m, menos que los 7 m del camino: la recta es el atajo.', { largo: 1 }, '$\\|\\Delta\\vec r\\| = 5 \\le 7$'],
        ['Si tardó 5 s, la velocidad media reparte Δr entre el tiempo y apunta como Δr.', { vm: 1 }, '$\\vec v_m = \\dfrac{\\Delta\\vec r}{\\Delta t} = \\tfrac15\\,(3, 4) = (0.6, 0.8)$ m/s'],
        ['Si el gato vuelve a donde salió, Δr y la velocidad media son nulos, aunque caminó 14 m.', { vuelta: 1 }],
      ], 'Δr = r₂ − r₁ solo depende de la salida y la llegada; la distancia recorrida suma el camino. La velocidad media es Δr / Δt.'),
      xpHaz('dibujo', 'Un ciclista sale de $\\vec r_1 = (1, -2)$ y llega a $\\vec r_2 = (-3, 1)$. Arrastra la punta de $\\Delta\\vec r$, dibujada desde el origen.', { dib: hazDesp, v: { x: 0, y: 2 }, metas: { x: -4, y: 3 }, alto: 206,
        manijas: [{ k: ['x', 'y'], min: [-5, -3], max: [3, 4], paso: 1, en: v => P2(P1b, [v.x, v.y]), de: (x, y) => [(x - P1b.ox) / P1b.u, (P1b.oy - y) / P1b.u] }],
        lee: v => `Tu $\\Delta\\vec r = (${v.x}, ${v.y})$`,
        dice: v => (v.x === -4 && v.y === 3 ? 'Justo: (−3, 1) − (1, −2) = (−4, 3), de largo 5.' : v.x === 4 && v.y === -3 ? 'Restaste al revés: va de la llegada a la salida.'
          : v.x === -2 && v.y === -1 ? 'Sumaste las posiciones; el desplazamiento es una resta.' : 'Resta coordenada a coordenada: llegada menos salida.') },
        'Δr = (−3, 1) − (1, −2) = (−4, 3): mide 5, sea cual sea el camino.')],
    ['Velocidad constante: una recta con reloj',
      xpMira('dibujo', 'Con velocidad constante la posición recorre una **recta**, y el tiempo hace de parámetro. Dos móviles se encuentran si coinciden con el **mismo** t.', { dib: reloj, v: { t: 0, marcas: 0, B: 0, tarde: 0, rel: 0 }, alto: 226 }, [
        ['Con velocidad constante, cada segundo se suma la misma flecha v: las marcas quedan parejas.', { marcas: 1, t: 1 }],
        ['A los t segundos, r = r₀ + t·v: una recta cuyo parámetro es el tiempo.', { t: 3 }, '$\\vec r(3) = (-4, -2) + 3\\,(2, 1) = (2, 1)$'],
        ['Otro móvil B sale a la vez. ¿Se encuentran? Se igualan las posiciones con el mismo t.', { B: 1, t: 1 }, '$-4 + 2t = 2 - t \\;\\Rightarrow\\; t = 2$'],
        ['A los 2 s los dos están en (0, 0), y la otra coordenada da el mismo t.', { t: 2 }, '$-2 + t = -4 + 2t \\;\\Rightarrow\\; t = 2$'],
        ['Si B saliera un segundo tarde, llegaría al cruce cuando A ya pasó: cortarse no basta.', { tarde: 1, t: 2 }],
        ['¿Cuándo están más cerca? B − A recorre una recta: lo más cerca es el pie de la perpendicular.', { rel: 1, t: 2.5 }, '$\\vec d(t)\\cdot(\\vec v_B - \\vec v_A) = 0 \\;\\Rightarrow\\; t = 2.5$ s'],
      ], 'r(t) = r₀ + t·v es una recta con reloj; dos móviles se encuentran si r_A(t) = r_B(t) con el mismo t.'),
      xpHaz('dibujo', 'Un patinador parte de $\\vec r_0 = (-3, 2)$ con $\\vec v = (2, -2)$ m/s. Arrastra el punto a su posición a los **2.5 s**.', { dib: hazReloj, v: { x: 0, y: 0 }, metas: { x: 2, y: -3 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [-4, -5], max: [5, 4], paso: 1, en: v => P2(P2b, [v.x, v.y]), de: (x, y) => [(x - P2b.ox) / P2b.u, (P2b.oy - y) / P2b.u] }],
        lee: v => `Tu punto: $(${v.x}, ${v.y})$`,
        dice: v => (v.x === 2 && v.y === -3 ? 'Justo: (−3, 2) + 2.5·(2, −2) = (2, −3).' : v.x === 1 && v.y === -2 ? 'Ahí está a los 2 s; falta medio segundo.'
          : v.x === -1 && v.y === 0 ? 'Ese es r₀ + v, al primer segundo.' : 'Suma a r₀ la flecha v multiplicada por 2.5.') },
        'r(2.5) = (−3, 2) + 2.5·(2, −2) = (−3 + 5, 2 − 5) = (2, −3).')],
    ['Velocidad relativa: el medio también se mueve',
      xpMira('dibujo', 'Desde la orilla se ve la velocidad del bote **más** la del agua. Desde un carro, a todo se le **resta** la velocidad del carro.', { dib: rio, v: { modo: 0, tiempo: 0 }, alto: 226 }, [
        ['Un bote va a 5 m/s respecto al agua; el río de 30 m corre a 4 m/s.', { modo: 0 }],
        ['Si apunta derecho, ve (4, 5) desde la orilla: cruza en 6 s y el río lo baja 24 m.', { modo: 1 }, '$\\vec v_{\\text{tierra}} = \\vec v_{\\text{propia}} + \\vec v_{\\text{río}} = (0, 5) + (4, 0)$'],
        ['Para llegar enfrente, gira la proa río arriba hasta que la suma no tenga parte este.', { modo: 2 }, '$(-4, 3) + (4, 0) = (0, 3)$'],
        ['Cruza derecho pero más lento: el tiempo lo decide la parte que apunta a la otra orilla.', { tiempo: 1 }, '$t = \\tfrac{30}{3} = 10$ s'],
        ['Con un avión es igual: velocidad respecto al aire más viento da la velocidad respecto a tierra.', { modo: 3, tiempo: 0 }],
        ['Lo que ve B de A es v_A − v_B: desde un carro, la lluvia vertical se ve inclinada.', { modo: 4 }, '$\\vec v_{L/C} = \\vec v_L - \\vec v_C = (0, -12) - (5, 0) = (-5, -12)$'],
      ], 'Desde tierra: velocidad propia + velocidad del medio. Lo que ve B de A: v_A − v_B.'),
      xpHaz('dibujo', 'Un bote apunta derecho a $(0, 4)$ m/s en un río de **40 m** que corre a $(2, 0)$ m/s. Arrastra la marca a donde **llega**, en metros río abajo.', { dib: hazDeriva, v: { d: 0 }, metas: { d: 20 }, alto: 226,
        manijas: [{ k: 'd', min: 0, max: 40, paso: 5, et: 'metros río abajo' }],
        lee: v => `Tarda $40 / 4 = 10$ s; tu marca: $${v.d}$ m`,
        dice: v => (v.d === 20 ? 'Justo: cruza en 40 / 4 = 10 s y el agua lo baja 2 · 10 = 20 m.' : v.d === 40 ? 'Ese es el ancho del río; lo que lo baja es la corriente durante el cruce.'
          : v.d === 10 ? 'Ese es el tiempo, 10 s; el río lo baja 2 m cada segundo.' : 'Primero el tiempo de cruce con la parte que apunta a la orilla; luego multiplica por la corriente.') },
        'Cruza en 40 / 4 = 10 s, y en ese tiempo la corriente lo baja 2 · 10 = 20 m.')],
    ['El tiro parabólico: tres flechas',
      xpMira('dibujo', 'Con la gravedad la posición es la **suma de tres flechas**: dónde salió, lo que avanzaría derecho y lo que la gravedad la baja.', { dib: tiro, v: { t: 2, sin: 0, g: 0, top: 0 }, alto: 232 }, [
        ['Sin gravedad, la pelota lanzada con v₀ = (6, 15) seguiría la recta r₀ + t·v₀.', { sin: 1 }],
        ['La gravedad suma otra flecha, siempre hacia abajo, que crece con el cuadrado del tiempo.', { g: 1 }, '$\\tfrac12 t^2\\,\\vec g = (0, -5t^2)$ con $\\vec g = (0, -10)$'],
        ['La posición es la suma de las tres flechas: a los 2 s va en (12, 10).', {}, '$\\vec r(t) = \\vec r_0 + t\\,\\vec v_0 + \\tfrac12 t^2\\,\\vec g$'],
        ['En x no hay aceleración: avanza 6 m cada segundo. En y sube, se frena y cae.', { t: 1 }],
        ['Cae cuando la altura vuelve a 0: 15t − 5t² = 0 da t = 3 s, a 18 m.', { t: 3 }, '$5t\\,(3 - t) = 0$, $x = 6 \\cdot 3 = 18$'],
        ['Lo más alto llega cuando la velocidad vertical 15 − 10t se anula, a los 1.5 s.', { t: 1.5, top: 1 }, '$y(1.5) = 22.5 - 11.25 = 11.25$ m'],
      ], 'r(t) = r₀ + t·v₀ + ½t²·g: la parte horizontal avanza parejo y la vertical es 15t − 5t².'),
      xpHaz('dibujo', 'Una pelota sale del suelo con $\\vec v_0 = (7, 5)$ m/s y $\\vec g = (0, -10)$. Arrastra la bandera a donde **cae**.', { dib: hazTiro, v: { x: 0 }, metas: { x: 7 }, alto: 262,
        manijas: [{ k: 'x', min: 0, max: 14, paso: 1, et: 'metros desde la salida' }],
        lee: v => `Tu bandera: $${v.x}$ m`,
        dice: v => (v.x === 7 ? 'Justo: 5t − 5t² = 0 da t = 1 s, y en 1 s avanza 7 m.' : v.x === 14 ? 'Contaste 2 s de vuelo: con ½t²·g, la altura vuelve a 0 en 1 s.'
          : 'Busca cuándo la altura 5t − 5t² vuelve a 0 y mira cuánto avanzó en x.') },
        'La altura 5t − 5t² vuelve a 0 a t = 1 s; en ese segundo avanza 7 m.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una manguera en el piso lanza agua con $\\vec v_0 = (10, 10)$ m/s hacia una pared que está a **10 m**. Con $\\vec g = (0, -10)$, ¿a qué **altura** pega el chorro en la pared?', { dib: manguera, v: { h: 0 }, metas: { h: 5 }, alto: 262,
        manijas: [{ k: 'h', min: 0, max: 15, paso: 1, et: 'altura en la pared, m' }],
        lee: v => `Llega a la pared a $t = 1$ s; tu altura: $${v.h}$ m`,
        dice: v => (v.h === 5 ? 'Justo: llega a x = 10 al segundo, y en ese segundo y = 10 − 5 = 5 m.' : v.h === 10 ? 'Así sería sin gravedad; en 1 s la gravedad lo baja ½·10·1² = 5 m.'
          : 'Primero el tiempo para llegar a x = 10; luego la altura 10t − 5t² en ese instante.') },
        'En x avanza 10 m cada segundo: llega a la pared a t = 1 s, cuando y = 10 · 1 − 5 · 1² = 5 m.')],
  ], 'La posición es una flecha r(t): con velocidad constante recorre una recta, desde tierra se suma el medio y la gravedad añade ½t²·g.');
}
