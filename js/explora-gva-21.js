// Geometría Vectorial · explicación de geo-21 «Trabajo y momento de una fuerza» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: de la fuerza solo trabaja la parte que va por el camino (W = F · d, con su signo); varias fuerzas trabajan lo
// que trabaja su resultante, también en el espacio; el momento es fuerza por brazo de palanca (M = r × F), con su sentido de giro,
// y un balancín queda quieto cuando los momentos se cancelan. Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(Math.round(n * 100) / 100).replace('-', '−');
  const sen = g => Math.sin(g * Math.PI / 180), cos = g => Math.cos(g * Math.PI / 180);
  const r0 = x => (Math.abs(x) < 1e-9 ? 0 : x);

  // 1 · solo trabaja lo que va por el camino: una maleta que se jala con 50 N y avanza 4 m
  const H1 = [96, 132], L1 = 90;
  const maleta = (v, K) => {
    const T = K.at(H1[0], H1[1], L1, v.g), S = [H1[0] + L1 * cos(v.g), H1[1]], W = r0(50 * 4 * cos(v.g));
    let h = K.l(8, 196, 332, 196, 'lm gr') + K.r(34, 140, 56, 46, 'fk', 6) + K.c(44, 190, 5, 'fk') + K.c(80, 190, 5, 'fk') + K.l(84, 142, H1[0], H1[1], 'lm gr');
    h += K.f(v.d, K.ar(30, 206, 300, 206, 'lg gr') + K.t(30, 222, 'd = 4 m', 's tg', 'start'));
    h += K.f(v.F, K.ar(H1[0], H1[1], T[0], T[1], 'la gr') + K.t(T[0] + 6, T[1] - 4, 'F = 50 N', 's ta', 'start') + (v.g > 1 ? K.arc(H1[0], H1[1], 26, 0, v.g, 'lm') + K.t(...K.at(H1[0], H1[1], 40, v.g / 2), `${Math.round(v.g)}°`, 's tm') : ''));
    h += K.f(v.sombra, K.l(T[0], T[1], S[0], S[1], 'lm d') + (Math.abs(S[0] - H1[0]) > 2 ? K.ar(H1[0], H1[1], S[0], S[1], 'lo gr') : '') + K.t(Math.max(H1[0], S[0]) + 8, H1[1] + 18, 'la parte que trabaja', 's to', 'start'));
    return h + K.f(v.cuenta, K.t(332, 18, `W = 50 · 4 · cos ${Math.round(v.g)}° = ${sg(W)} J`, `s ${W < 0 ? 'tf' : 'ta'}`, 'end'));
  };
  const hazMaleta = (v, K) => {
    const H = [96, 132], T = [H[0] + 12 * 6, H[1] - 9 * 6];
    return K.l(8, 196, 332, 196, 'lm gr') + K.r(34, 140, 56, 46, 'fk', 6) + K.c(44, 190, 5, 'fk') + K.c(80, 190, 5, 'fk') + K.l(84, 142, H[0], H[1], 'lm gr')
      + K.ar(H[0], H[1], T[0], T[1], 'la gr') + K.t(T[0] + 6, T[1], 'F = (12, 9) N', 's ta', 'start') + K.ar(30, 206, 300, 206, 'lg gr') + K.t(30, 222, 'd = (5, 0) m', 's tg', 'start')
      + K.t(332, 18, `tu trabajo: ${v.w} J`, 's ta', 'end');
  };

  // 2 · varias fuerzas y el espacio: una caja que avanza 5 m, y un objeto que va de A a B en R³
  const C2 = [110, 132], E2 = 1.2;
  const fz2 = [['tirón', [30, 40], 'la'], ['roce', [-20, 0], 'lf'], ['peso', [0, -60], 'lm'], ['piso', [0, 20], 'lg']];
  const varias = (v, K) => {
    const I = (x, y, z) => XPK.iso([150, 200], 22, x, y, z);
    let h = '';
    if (v.esp < 0.99) {
      let c = K.l(8, 150, 332, 150, 'lm gr') + K.r(C2[0] - 18, C2[1] - 18, 36, 36, 'fn', 4) + K.ar(30, 170, 300, 170, 'lg gr') + K.t(30, 186, 'd = (5, 0) m', 's tg', 'start');
      fz2.forEach(([n, F, cl], i) => { const T = [C2[0] + F[0] * E2, C2[1] - F[1] * E2]; c += K.f(v.fz, K.ar(...C2, ...T, `${cl} gr`) + K.t(T[0] + (F[0] < 0 ? -6 : 6), T[1] + (F[1] < 0 ? 14 : -4), n, 's', F[0] < 0 ? 'end' : 'start'));
        c += K.f(v.w, K.t(332, 18 + 18 * i, `${n}: ${sg(F[0])} · 5 = ${sg(F[0] * 5)} J`, 's tm', 'end')); });
      c += K.f(v.tot, K.t(332, 94, 'total: 150 − 100 + 0 + 0 = 50 J', 's ta', 'end'));
      c += K.f(v.res, K.ar(C2[0], C2[1] + 8, C2[0] + 10 * E2 * 2, C2[1] + 8, 'lo gr') + K.t(C2[0] + 36, C2[1] + 12, 'R = (10, 0)', 's to', 'start') + K.t(332, 112, 'R · d = 10 · 5 = 50 J', 's to', 'end'));
      h += K.f(1 - v.esp, c);
    }
    if (v.esp > 0.01) {
      const O = I(0, 0, 0), A = I(1, 0, 0), B = I(5, 0, 2);
      let e = '';
      [[6, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 4, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); e += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
      e += K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + K.t(A[0] - 8, A[1] + 14, 'A(1, 0, 0)', 's', 'end') + K.t(B[0] + 8, B[1] - 6, 'B(5, 0, 2)', 's', 'start') + K.ar(...A, ...B, 'lg gr');
      e += K.t(8, 18, 'd = B − A = (4, 0, 2) m', 's tg', 'start') + K.f(v.cuenta, K.t(8, 38, 'F = (2, 3, 1) N', 's ta', 'start') + K.t(8, 58, 'W = 2·4 + 3·0 + 1·2 = 10 J', 's ta', 'start'));
      h += K.f(v.esp, e);
    }
    return h;
  };
  const hazDron = (v, K) => {
    const I = (x, y, z) => XPK.iso([150, 214], 20, x, y, z), O = I(0, 0, 0), A = I(0, 1, 2), B = I(3, 1, 6);
    let h = '';
    [[5, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 7, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); h += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
    return h + K.c(...A, 4, 'fk') + K.c(...B, 5, 'fA') + K.l(...A, ...B, 'lg gr d') + K.t(A[0] - 8, A[1] + 4, 'A', 's', 'end') + K.t(B[0] + 8, B[1] + 4, 'B', 's', 'start')
      + K.t(8, 18, 'A(0, 1, 2) → B(3, 1, 6) m', 's tg', 'start') + K.t(8, 36, 'F = (2, 5, 4) N', 's ta', 'start') + K.t(332, 18, `tu trabajo: ${v.w} J`, 's ta', 'end');
  };

  // 3 · el momento: fuerza por brazo de palanca, en una llave vista desde arriba (40 N)
  const O3 = [60, 140], U3 = 600;
  const llave = (v, K) => {
    const H = [O3[0] + v.r * U3, O3[1]], T = K.at(H[0], H[1], 64, v.g), e = [cos(v.g), -sen(v.g)], dx = v.r * U3, Fo = [H[0] - dx * cos(v.g) * e[0], H[1] - dx * cos(v.g) * e[1]];
    const brazo = r0(v.r * sen(v.g)), M = r0(40 * brazo);
    let h = K.p([[O3[0] - 14, O3[1]], [O3[0] - 7, O3[1] - 12], [O3[0] + 7, O3[1] - 12], [O3[0] + 14, O3[1]], [O3[0] + 7, O3[1] + 12], [O3[0] - 7, O3[1] + 12]], 'fk')
      + K.r(O3[0] + 14, O3[1] - 5, 250, 10, 'fn', 4) + K.c(...O3, 3, 'fA') + K.t(O3[0], O3[1] + 30, 'tuerca', 's');
    h += K.c(...H, 4, 'fk') + K.ar(...H, ...T, 'la gr') + K.t(T[0] + 6, T[1] - 4, 'F = 40 N', 's ta', 'start') + K.t(H[0], H[1] + 24, `r = ${sg(v.r)} m`, 's tm');
    if (v.g > 1 && v.g < 179) h += K.arc(...H, 20, 0, v.g, 'lm');
    const ts = [[e[0], H[0], 6, 334], [e[1], H[1], 6, 220]].map(([d, c, a, b]) => (Math.abs(d) < 1e-9 ? [-1e9, 1e9] : [(a - c) / d, (b - c) / d].sort((m, k) => m - k))), t0 = Math.max(ts[0][0], ts[1][0]), t1 = Math.min(ts[0][1], ts[1][1]);
    h += K.f(v.linea, K.l(H[0] + t0 * e[0], H[1] + t0 * e[1], H[0] + t1 * e[0], H[1] + t1 * e[1], 'lm d'));
    if (brazo > 0.001) h += K.f(v.brazo, K.l(...O3, ...Fo, 'lo gr') + K.t((O3[0] + Fo[0]) / 2 + 6, (O3[1] + Fo[1]) / 2 - 4, `brazo ${sg(brazo)} m`, 's to', 'start'));
    h += K.f(v.giro, (M ? K.arc(...O3, 32, 30, 150, 'la') + K.t(O3[0] - 16, O3[1] + 48, 'gira antihorario', 's ta', 'start') : ''));
    return h + K.t(332, 18, `M = 40 · ${sg(brazo)} = ${sg(M)} N·m`, 's ta', 'end');
  };
  const hazLlave = (v, K) => {
    const H = [270, 150], T = K.at(H[0], H[1], 64, 150);
    return K.p([[46, 150], [53, 138], [67, 138], [74, 150], [67, 162], [53, 162]], 'fk') + K.r(74, 145, 210, 10, 'fn', 4) + K.c(...H, 4, 'fk')
      + K.ar(...H, ...T, 'la gr') + K.arc(...H, 22, 150, 180, 'lm') + K.t(H[0] - 34, H[1] - 14, '30°', 's tm', 'end') + K.t(H[0], H[1] + 24, '0.5 m', 's tm')
      + K.t(T[0] - 6, T[1] - 4, 'F = 60 N', 's ta', 'end') + K.t(332, 18, `tu momento: ${v.m} N·m`, 's ta', 'end');
  };

  // 4 · equilibrio de giro (balancín) y el momento en el espacio
  const P4 = [170, 160], S4 = 42;
  const balanza = (v, K) => {
    let h = '';
    if (v.esp < 0.99) {
      const net = 200 * 3 - 400 * v.x, phi = v.tilt * Math.sign(net) * 7 * Math.PI / 180, en = s => [P4[0] + s * S4 * Math.cos(phi), P4[1] - s * S4 * Math.sin(phi)];
      const blo = (s, F) => { const B = en(s); return K.r(B[0] - 13, B[1] - 24, 26, 22, 'fn', 4) + K.t(B[0], B[1] - 29, `${F} N`, 's'); };
      let c = K.p([[P4[0], P4[1]], [P4[0] - 16, P4[1] + 30], [P4[0] + 16, P4[1] + 30]], 'fk') + K.l(20, P4[1] + 30, 320, P4[1] + 30, 'lm') + K.l(...en(-3.4), ...en(3.4), 'lg gr');
      c += blo(-3, 200) + K.f(v.der, blo(v.x, 400));
      c += K.f(v.der, K.t(8, 18, 'izquierda: 200 · 3 = 600 N·m', 's tm', 'start') + K.t(8, 36, `derecha: 400 · ${sg(v.x)} = ${sg(400 * v.x)} N·m`, 's tm', 'start'));
      h += K.f(1 - v.esp, c);
    }
    if (v.esp > 0.01) {
      const I = (x, y, z) => XPK.iso([110, 196], 26, x, y, z), O = I(0, 0, 0), Rr = I(2, 0, 0), F = [Rr[0], Rr[1] - 0];
      let e = '';
      [[3, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 4, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); e += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
      const T = XPK.iso(Rr, 26 / 2, 0, 3, 4);
      e += K.ar(...O, ...Rr, 'lg gr') + K.t(Rr[0] + 4, Rr[1] + 16, 'r = (2, 0, 0)', 's tg', 'start') + K.ar(...F, ...T, 'la gr') + K.t(T[0] + 6, T[1], 'F = (0, 3, 4)', 's ta', 'start');
      const Mv = I(0, -8 / 4, 6 / 4);
      e += K.f(v.M, K.ar(...O, ...Mv, 'lo gr') + K.t(Mv[0] - 6, Mv[1] - 4, 'M = (0, −8, 6)', 's to', 'end'));
      h += K.f(v.esp, e);
    }
    return h;
  };
  const hazEje = (v, K) => {
    const I = (x, y, z) => XPK.iso([120, 200], 24, x, y, z), O = I(0, 0, 0), Rr = I(0, 1, 0), T = XPK.iso(Rr, 24 / 4, 5, 0, 12);
    let h = '';
    [[3, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 4, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); h += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
    return h + K.ar(...O, ...Rr, 'lg gr') + K.ar(...Rr, ...T, 'la gr') + K.t(8, 18, 'r = (0, 1, 0) m', 's tg', 'start') + K.t(8, 36, 'F = (5, 0, 12) N', 's ta', 'start')
      + K.t(332, 18, `tu ‖M‖: ${v.m} N·m`, 's ta', 'end');
  };

  // Problema: el carrito por la rampa
  const rampa = (v, K) => {
    const A = [30, 200], B = [30 + 12 * 22, 200 - 5 * 22];
    return K.p([A, B, [B[0], A[1]]], 'fn') + K.l(...A, ...B, 'lg gr') + K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + K.t(A[0], A[1] + 18, 'A(0, 0)', 's', 'start') + K.t(B[0], B[1] - 10, 'B(12, 5) m', 's', 'end')
      + K.r(120, 140, 30, 20, 'fk', 4) + K.ar(100, 152, 150, 152, 'la gr') + K.t(98, 148, 'F', 's ta', 'end') + K.ar(135, 162, 135, 196, 'lm gr') + K.t(140, 190, 'peso', 's tm', 'start')
      + K.t(8, 18, 'empuje F = (60, 0) N', 's ta', 'start') + K.t(8, 36, 'peso P = (0, −40) N', 's tm', 'start') + K.t(332, 18, `tu trabajo total: ${v.w} J`, 's ta', 'end');
  };

  xpLec('geo-21', [
    ['Solo trabaja lo que va por el camino',
      xpMira('dibujo', 'Empujar no siempre es **trabajar**: el trabajo mide cuánto de la fuerza va en la dirección del movimiento.', { dib: maleta, v: { F: 0, d: 0, sombra: 0, cuenta: 0, g: 60 }, alto: 226 }, [
        ['Jalas una maleta con una fuerza inclinada y la maleta avanza por el piso. ¿Cuánto de tu fuerza la mueve?', { F: 1, d: 1 }],
        ['Solo la parte de la fuerza a lo largo del camino. La parte que tira hacia arriba no la hace avanzar.', { sombra: 1 }],
        ['Esa parte por la distancia recorrida es el trabajo: el producto escalar de la fuerza y el desplazamiento.', { cuenta: 1 }, '$W = \\vec F \\cdot \\vec d = \\|\\vec F\\|\\,\\|\\vec d\\|\\cos\\theta$'],
        ['Con 50 N a 60° y 4 m de avance, la parte útil es 25 N: el trabajo es 100 J.', {}, '$W = 50 \\cdot 4 \\cdot \\cos 60^{\\circ} = 100$ J'],
        ['Si la fuerza es perpendicular al camino, como al cargar una bolsa caminando, no hay parte útil: W = 0.', { g: 90 }, '$\\theta = 90^{\\circ} \\Rightarrow W = 0$'],
        ['Si tiene una parte en contra, como cuando frenas la maleta en una bajada, el trabajo es negativo.', { g: 120 }, '$\\theta > 90^{\\circ} \\Rightarrow W < 0$'],
      ], 'W = F · d: solo trabaja la parte de la fuerza a lo largo del camino; a favor es positivo, perpendicular cero, en contra negativo.'),
      xpHaz('dibujo', 'Una maleta avanza $\\vec d = (5, 0)$ m y la jalas con $\\vec F = (12, 9)$ N. Ajusta el **trabajo** que haces.', { dib: hazMaleta, v: { w: 0 }, metas: { w: 60 }, alto: 226,
        manijas: [{ k: 'w', min: 0, max: 150, paso: 5, et: 'trabajo, en J' }],
        lee: v => `$\\vec F \\cdot \\vec d = 12 \\cdot 5 + 9 \\cdot 0$; tu valor: $${v.w}$ J`,
        dice: v => (v.w === 60 ? 'Justo: 12 · 5 + 9 · 0 = 60 J; los 9 N verticales no trabajan.' : v.w === 75 ? 'Usaste toda la fuerza, ‖F‖ = 15 N: solo trabajan los 12 N horizontales.' : 'Multiplica componente a componente: F · d = 12·5 + 9·0.') },
        'Solo trabaja la componente horizontal: 12 · 5 = 60 J.')],
    ['Varias fuerzas, y en el espacio',
      xpMira('dibujo', 'Casi siempre actúan **varias fuerzas** a la vez. Cada una trabaja por su cuenta, y el total se suma con signos.', { dib: varias, v: { fz: 0, w: 0, tot: 0, res: 0, esp: 0, cuenta: 0 }, alto: 226 }, [
        ['Sobre una caja que avanza 5 m actúan a la vez un tirón, el roce, el peso y el piso.', { fz: 1 }],
        ['Cada una hace su trabajo: el tirón 150 J, el roce −100 J; el peso y el piso, 0, por ser perpendiculares.', { w: 1 }, '$W_i = \\vec F_i \\cdot \\vec d$'],
        ['El trabajo total es la suma, con sus signos: 150 − 100 + 0 + 0 = 50 J.', { tot: 1 }],
        ['Con la resultante sale lo mismo: R = (10, 0) y R · d = 50 J.', { res: 1 }, '$W = \\vec R \\cdot \\vec d, \\quad \\vec R = \\vec F_1 + \\vec F_2 + \\dots$'],
        ['En el espacio es igual: si un objeto va de A a B, su desplazamiento es d = B − A.', { esp: 1 }, '$\\vec d = B - A$'],
        ['Con F = (2, 3, 1) N y d = (4, 0, 2) m, W = 10 J.', { cuenta: 1 }, '$W = F_1d_1 + F_2d_2 + F_3d_3$'],
      ], 'El trabajo de varias fuerzas es la suma de sus trabajos, igual al de la resultante; entre dos puntos, d = B − A, también en R³.'),
      xpHaz('dibujo', 'Un dron lleva un paquete de $A(0, 1, 2)$ a $B(3, 1, 6)$ m y su motor empuja con $\\vec F = (2, 5, 4)$ N. Ajusta el **trabajo** del motor.', { dib: hazDron, v: { w: 0 }, metas: { w: 22 }, alto: 236,
        manijas: [{ k: 'w', min: 0, max: 40, paso: 1, et: 'trabajo, en J' }],
        lee: v => `$\\vec d = B - A$; tu valor: $${v.w}$ J`,
        dice: v => (v.w === 22 ? 'Justo: d = (3, 0, 4) y F · d = 6 + 0 + 16 = 22 J.' : v.w === 35 ? 'Multiplicaste por B y no por el desplazamiento d = B − A.' : 'Primero d = B − A; luego el producto escalar con F.') },
        'd = (3, 0, 4) y W = 2·3 + 5·0 + 4·4 = 22 J.')],
    ['El momento: fuerza por brazo',
      xpMira('dibujo', 'Una fuerza también puede hacer **girar**. Lo que mide ese giro es el **momento** de la fuerza.', { dib: llave, v: { r: 0.2, g: 90, linea: 0, brazo: 0, giro: 0 }, alto: 226 }, [
        ['Para aflojar una tuerca no importa solo cuánta fuerza haces, sino dónde y en qué dirección empujas.', {}],
        ['Empujando perpendicular a la llave, más lejos se gira más fácil: el momento es la fuerza por la distancia.', { r: 0.3 }, '$M = \\|\\vec r\\|\\,\\|\\vec F\\|$'],
        ['Si empujas inclinado, lo que cuenta es la distancia de la tuerca a la línea de la fuerza: el brazo de palanca.', { g: 150, linea: 1, brazo: 1 }, '$\\text{brazo} = \\|\\vec r\\|\\operatorname{sen}\\theta$'],
        ['Por eso el momento es un producto vectorial, con r de la tuerca al punto donde empujas.', {}, '$\\vec M = \\vec r \\times \\vec F, \\quad \\|\\vec M\\| = \\|\\vec r\\|\\,\\|\\vec F\\|\\operatorname{sen}\\theta$'],
        ['En el plano, el signo del momento dice el sentido: positivo si gira antihorario, negativo si gira horario.', { giro: 1 }, '$M = r_1F_2 - r_2F_1$'],
        ['Si empujas a lo largo de la llave, la fuerza pasa por la tuerca: el brazo es cero.', { g: 180, giro: 0 }, '$\\theta = 0^{\\circ} \\text{ o } 180^{\\circ} \\Rightarrow \\vec M = \\vec 0$'],
      ], 'M = r × F: la fuerza por el brazo de palanca, r sen θ; su signo da el sentido y es cero si la fuerza pasa por el punto.'),
      xpHaz('dibujo', 'Empujas una llave con **60 N** a **0.5 m** de la tuerca, formando **30°** con la llave. Ajusta el **momento**.', { dib: hazLlave, v: { m: 0 }, metas: { m: 15 }, alto: 226,
        manijas: [{ k: 'm', min: 0, max: 30, paso: 1, et: 'momento, en N·m' }],
        lee: v => `$M = 0.5 \\cdot 60 \\cdot \\operatorname{sen} 30^{\\circ}$; tu valor: $${v.m}$ N·m`,
        dice: v => (v.m === 15 ? 'Justo: el brazo es 0.5 · sen 30° = 0.25 m y M = 60 · 0.25 = 15 N·m.' : v.m === 30 ? 'Así sería empujando perpendicular a la llave: falta el seno de 30°.' : 'Multiplica la fuerza por el brazo de palanca, 0.5 · sen 30°.') },
        'El brazo es 0.5 · sen 30° = 0.25 m: M = 60 · 0.25 = 15 N·m.')],
    ['Equilibrio de giro y momento en el espacio',
      xpMira('dibujo', 'Cuando dos momentos tiran en sentidos contrarios, gana el más grande; si son iguales, **nada gira**.', { dib: balanza, v: { der: 0, x: 1, tilt: 0, esp: 0, M: 0 }, alto: 226 }, [
        ['Un balancín gira alrededor de su apoyo. Cada peso lo hace girar con un momento: peso por distancia al apoyo.', {}],
        ['Izquierda: 200 N a 3 m, 600 N·m. Derecha: 400 N a 1 m, 400 N·m. Gana la izquierda.', { der: 1, tilt: 1 }],
        ['Si el de 400 N se corre a 1.5 m, los momentos se cancelan y el balancín queda quieto.', { x: 1.5, tilt: 0 }, '$200 \\cdot 3 = 400 \\cdot 1.5$'],
        ['Esa es la condición de equilibrio de giro: la suma de los momentos respecto al apoyo es cero.', {}, '$\\sum \\vec M = \\vec 0$'],
        ['En el espacio el momento es un vector. Se calcula con el determinante, con r y F en las filas.', { esp: 1 }, '$\\vec r \\times \\vec F = \\begin{vmatrix} \\vec i & \\vec j & \\vec k \\\\ r_1 & r_2 & r_3 \\\\ F_1 & F_2 & F_3 \\end{vmatrix}$'],
        ['Con r = (2, 0, 0) y F = (0, 3, 4), M = (0, −8, 6), por el eje de giro.', { M: 1 }, '$\\|\\vec M\\| = \\sqrt{0 + 64 + 36} = 10$'],
      ], 'Hay equilibrio de giro cuando los momentos se cancelan; en el espacio el momento es el vector r × F, por el eje de giro.'),
      xpHaz('dibujo', 'Una mano empuja con $\\vec F = (5, 0, 12)$ N en $\\vec r = (0, 1, 0)$ m desde el eje. Ajusta el tamaño del momento, $\\|\\vec r \\times \\vec F\\|$.', { dib: hazEje, v: { m: 0 }, metas: { m: 13 }, alto: 226,
        manijas: [{ k: 'm', min: 0, max: 30, paso: 1, et: 'tamaño del momento, en N·m' }],
        lee: v => `$\\vec r \\times \\vec F = (12, 0, -5)$; tu valor: $${v.m}$ N·m`,
        dice: v => (v.m === 13 ? 'Justo: r × F = (12, 0, −5) y su norma es √(144 + 25) = 13.' : v.m === 17 ? 'Sumaste las componentes: la norma es la raíz de la suma de sus cuadrados.' : 'Calcula r × F con el determinante y luego su norma.') },
        'r × F = (1·12 − 0·0, 0·5 − 0·12, 0·0 − 1·5) = (12, 0, −5), de norma 13 N·m.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Subes un carrito por una rampa de $A(0, 0)$ a $B(12, 5)$ m con un empuje horizontal $\\vec F = (60, 0)$ N; su peso es $\\vec P = (0, -40)$ N. Ajusta el **trabajo total** de las dos.', { dib: rampa, v: { w: 0 }, metas: { w: 520 }, alto: 226,
        manijas: [{ k: 'w', min: 0, max: 1000, paso: 40, et: 'trabajo total, en J' }],
        lee: v => `$\\vec d = (12, 5)$; tu valor: $${v.w}$ J`,
        dice: v => (v.w === 520 ? 'Justo: 60 · 12 − 40 · 5 = 720 − 200 = 520 J.' : v.w === 920 ? 'Sumaste sin signos: el peso trabaja en contra porque el carrito sube.' : v.w === 720 ? 'Ese es solo el trabajo del empuje; falta el del peso, que es negativo.' : 'Calcula F · d y P · d con d = B − A = (12, 5) y súmalos con signo.') },
        'W = F · d + P · d = 720 − 200 = 520 J: el empuje trabaja a favor y el peso en contra.')],
  ], 'El trabajo es F · d y solo lo hace la parte de la fuerza a lo largo del camino; el momento es r × F, la fuerza por su brazo de palanca.');
}
