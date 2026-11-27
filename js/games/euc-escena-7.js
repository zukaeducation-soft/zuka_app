// Geometría Euclidiana · mundo 7 «euc-areas»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js,
// conteo-escena.js (XG.cuenta) y proposiciones-escena.js (XG.frases). Se dibujan con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(Math.round(x * 100) / 100), RAD = Math.PI / 180;
  const camino = (d, cls) => `<path class="xf ${cls}" d="${d}"/>`;

  // ---------------------------------------------------------------------------------------------- euc-areas-1 · áreas básicas
  // Fórmula de Herón: semiperímetro, las tres diferencias y el área.  params { t: [base, derecha, izquierda], et, metas, fichas, mira, trampas, ok }
  XG.cuenta('heron-raiz', 112, (K, p, f) => {
    const [a, b, c] = p.t, x = (a * a + c * c - b * b) / (2 * a), y = Math.sqrt(c * c - x * x), u = Math.min(190 / a, 76 / y), X0 = 170 - a * u / 2, Y0 = 92;
    const A = [X0, Y0], B = [X0 + a * u, Y0], C = [X0 + x * u, Y0 - y * u];
    return K.p([A, B, C], 'fa') + K.t((A[0] + B[0]) / 2, Y0 + 16, a, 'ta') + K.t((B[0] + C[0]) / 2 + 9, (B[1] + C[1]) / 2, b, 'ta', 'start') + K.t((A[0] + C[0]) / 2 - 9, (A[1] + C[1]) / 2, c, 'ta', 'end')
      + K.f(f, K.l(C[0], C[1], C[0], Y0, 'lf d') + K.t(C[0] + 6, Y0 - y * u * 0.3, `altura ${N(y)}`, 's tf', 'start'));
  });

  // Hexágono regular de lado l: semiperímetro, apotema y área.  params { l (par), fichas }
  const hexa = p => [`${3 * p.l}`, `${p.l / 2}√3`, `${3 * p.l * p.l / 2}√3`];
  XG.rotula('regular-apotema', {
    slots: () => [{ x: 284, y: 46, w: 92, h: 36 }, { x: 284, y: 112, w: 92, h: 36 }, { x: 284, y: 178, w: 92, h: 36 }],
    fichas: p => p.fichas, metas: hexa,
    texto: p => `semiperímetro $${3 * p.l}$, apotema $${p.l / 2}\\sqrt3$, área $${3 * p.l} \\cdot ${p.l / 2}\\sqrt3 = ${3 * p.l * p.l / 2}\\sqrt3$`,
    alto: () => 206,
    fondo(K, p, f) {
      const C = [76, 104], R = 62, V = Array.from({ length: 6 }, (_, i) => K.at(...C, R, 60 * i)), M = [C[0], C[1] + R * Math.sqrt(3) / 2];
      return K.p(V, 'fa') + K.f(f, V.map((q, i) => (i % 2 ? '' : K.p([C, q, V[(i + 1) % 6]], 'fg')) + K.l(...C, ...q, 'lm')).join('')) + K.l(...C, ...M, 'lf gr') + K.c(...C, 3, 'fk')
        + K.t(C[0], M[1] + 17, p.l, 'ta') + K.t(C[0] + 7, C[1] + 34, 'a', 's tf', 'start')
        + K.t(232, 43, 'semi-', 's', 'end') + K.t(232, 57, 'perímetro', 's', 'end') + K.t(232, 116, 'apotema', 's tf', 'end') + K.t(232, 182, 'área', 's ta', 'end');
    },
    aviso(q, p) {
      const m = hexa(p);
      return q[0][0] === `${6 * p.l}` ? 'Ese es el perímetro entero: la fórmula usa la mitad, el semiperímetro.'
        : q[1][0] !== m[1] ? 'La apotema es la altura de uno de los seis triángulos equiláteros: medio lado por √3.'
          : q[2][0] === `${3 * p.l * p.l}√3` ? 'Multiplicaste el perímetro entero por la apotema: va el semiperímetro.'
            : 'El hexágono son seis triángulos con la apotema por altura: semiperímetro por apotema.';
    },
    bien: () => 'Semiperímetro por apotema: seis triángulos de altura a.',
  });

  // Sector circular de área dada.  v { g }   params { r, area } (área en partes de π)
  const SC = [170, 108];
  XG.figura('sector-area', {
    ini: () => ({ g: 30 }),
    manijas: () => [{ k: 'g', min: 10, max: 350, paso: 10, en: v => XPK.at(...SC, 86, v.g), de: (x, y, v) => { const g = (Math.atan2(SC[1] - y, x - SC[0]) * 180 / Math.PI + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 350 : 10) : g; } }],
    ok: (v, p) => v.g * p.r * p.r === 360 * p.area,
    sol: p => ({ g: 360 * p.area / (p.r * p.r) }),
    texto: p => `$\\tfrac{${p.area}}{${p.r * p.r}} \\cdot 360^\\circ = ${360 * p.area / (p.r * p.r)}^\\circ$`,
    alto: () => 216, pie: 'Arrastra el punto por el borde para abrir el sector.',
    dib: (v, K, p, f) => K.c(...SC, 86, 'fc') + K.sec(...SC, 86, 0, v.g, 'fa') + K.l(...SC, 256, 108) + K.t(214, 126, `r = ${p.r}`, 's tm') + K.t(...K.at(SC[0], SC[1] + 4, 40, Math.max(16, v.g / 2)), `${Math.round(v.g)}°`, 'ta')
      + K.f(f, K.arc(...SC, 95, 0, Math.min(359, 360 * p.area / (p.r * p.r)) * f, 'lo gr') + K.t(8, 20, `círculo: ${p.r * p.r}π`, 's tm', 'start')),
    lee: (v, p) => `$\\tfrac{${Math.round(v.g)}}{360} \\cdot ${p.r * p.r}\\pi = ${N(Math.round(v.g) / 360 * p.r * p.r)}\\pi$`,
    aviso: (v, p) => (v.g * p.r === 180 * p.area ? `Con ese ángulo, ${p.area}π es lo que mide el arco. El área se compara con ${p.r * p.r}π, el círculo entero.` : v.g * p.r * p.r > 360 * p.area ? 'El sector quedó con más área de la pedida.' : 'El sector quedó con menos área de la pedida.'),
    bien: (v, p) => `${p.area} de las ${p.r * p.r} partes del círculo: esa misma parte de la vuelta.`,
  });

  // ---------------------------------------------------------------------------------- euc-areas-2 · relaciones entre áreas
  // El vértice se desliza: mismo triángulo en área, pero isósceles o rectángulo.  v { x, y }   params { a, b, c: [x, y], tipo: 'iso' | 'rect', de?: [x, y] }
  const U = 24, GP = (x, y) => [34 + x * U, 196 - y * U];
  const cumpleTipo = (v, p) => (p.tipo === 'iso' ? 2 * v.x === p.a + p.b : v.x === p.b);
  XG.figura('desliza-paralela', {
    ini: p => ({ x: p.de?.[0] ?? 11, y: p.de?.[1] ?? 2 }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 1], max: [12, 7], paso: [1, 1], en: v => GP(v.x, v.y), de: (x, y) => [(x - 34) / U, (196 - y) / U] }],
    ok: (v, p) => v.y === p.c[1] && cumpleTipo(v, p),
    sol: p => ({ x: p.tipo === 'iso' ? (p.a + p.b) / 2 : p.b, y: p.c[1] }),
    texto: p => `misma base ${p.b - p.a} y misma altura ${p.c[1]}: área $\\tfrac{${p.b - p.a} \\cdot ${p.c[1]}}{2} = ${(p.b - p.a) * p.c[1] / 2}$`,
    alto: () => 212, pie: 'Arrastra el vértice P por la cuadrícula.',
    dib(v, K, p, f) {
      let h = '';
      for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 7), 'ls');
      for (let j = 0; j <= 7; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls');
      const A = GP(p.a, 0), B = GP(p.b, 0), C = GP(...p.c), P = GP(v.x, v.y);
      return h + K.f(f, K.l(...GP(0, p.c[1]), ...GP(12, p.c[1]), 'lo d') + K.l(P[0], P[1], P[0], 196, 'lf d') + K.t(P[0] + 6, (P[1] + 196) / 2 + 4, N(v.y), 's tf', 'start'))
        + K.p([A, B, C], 'fg') + K.p([A, B, P], 'fa') + K.l(...A, ...B, 'gr') + K.t(A[0] - 2, 210, 'A', 's') + K.t(B[0] + 2, 210, 'B', 's') + K.t(P[0] + 10, P[1] - 8, 'P', 's ta', 'start');
    },
    lee: (v, p) => `$\\tfrac{${p.b - p.a} \\cdot ${N(v.y)}}{2} = ${N((p.b - p.a) * v.y / 2)} \\qquad \\text{dorado: } ${(p.b - p.a) * p.c[1] / 2}$`,
    aviso: (v, p) => (v.y > p.c[1] ? 'Subiste el vértice: con más altura sobre la misma base, el área creció.' : v.y < p.c[1] ? 'Bajaste el vértice: con menos altura sobre la misma base, el área se achicó.'
      : p.tipo === 'iso' ? 'El área ya es la misma. Falta que P quede a igual distancia de A y de B.' : 'El área ya es la misma. Falta el ángulo recto en B: P va justo encima de B.'),
    bien: () => 'Misma base y vértice sobre la misma paralela: misma altura, misma área.',
  });

  // Un punto sobre la base parte el triángulo en razón m : n.  v { d }   params { L, m, n, ap?, d0? }
  XG.figura('parte-base', {
    ini: p => ({ d: p.d0 ?? 1 }),
    manijas: p => [{ k: 'd', min: 1, max: p.L - 1, paso: 1, en: v => [30 + v.d * 280 / p.L, 180], de: x => (x - 30) * p.L / 280 }],
    ok: (v, p) => v.d * p.n === (p.L - v.d) * p.m,
    sol: p => ({ d: p.L * p.m / (p.m + p.n) }),
    texto: p => `la base se parte como las áreas: $\\tfrac{${p.m}}{${p.m + p.n}} \\cdot ${p.L} = ${p.L * p.m / (p.m + p.n)}$`,
    alto: () => 214, pie: 'Arrastra el punto D por la base.',
    dib(v, K, p, f) {
      const u = 280 / p.L, A = [30 + (p.ap ?? Math.round(p.L * 0.35)) * u, 36], B = [30, 180], C = [310, 180], D = [30 + v.d * u, 180];
      let h = K.p([A, B, D], 'fa') + K.p([A, D, C], 'fg');
      for (let i = 1; i < p.L; i++) h += K.l(30 + i * u, 176, 30 + i * u, 184, 'lm');
      return h + K.t(A[0], 26, 'A', 's') + K.t(22, 198, 'B', 's') + K.t(318, 198, 'C', 's') + K.t(D[0], 206, 'D', 's ta') + K.t((B[0] + D[0]) / 2, 198, N(v.d), 'ta') + K.t((D[0] + C[0]) / 2, 198, N(p.L - v.d), 'tg')
        + K.f(f, K.l(A[0], A[1], A[0], 180, 'lf d') + K.t(332, 24, `áreas como ${N(v.d)} : ${N(p.L - v.d)}`, 's tf', 'end'));
    },
    lee: (v, p) => `$\\tfrac{\\text{△}ABD}{\\text{△}ADC} = \\tfrac{${Math.round(v.d)}}{${p.L - Math.round(v.d)}}$`,
    aviso: (v, p) => (v.d * p.m === (p.L - v.d) * p.n && p.m !== p.n ? `Quedó al revés: el de la izquierda, △ABD, es el de ${p.m} ${p.m === 1 ? 'parte' : 'partes'}.`
      : v.d === p.m ? `Mediste ${p.m} de base, pero son ${p.m} de cada ${p.m + p.n} partes: la base tiene ${p.L}.`
        : v.d * p.n > (p.L - v.d) * p.m ? 'El triángulo de la izquierda quedó con demasiada base.' : 'El triángulo de la izquierda quedó con muy poca base.'),
    bien: () => 'Con la misma altura, las áreas se reparten como las bases.',
  });

  // Las tres medianas: mitad, sexto y tercio.  params { area (múltiplo de 6), fichas }
  const med = p => [`${p.area / 2}`, `${p.area / 6}`, `${p.area / 3}`];
  XG.rotula('mediana-seis', {
    slots: () => [{ x: 292, y: 50, w: 76, h: 36 }, { x: 292, y: 112, w: 76, h: 36 }, { x: 292, y: 174, w: 76, h: 36 }],
    fichas: p => p.fichas, metas: med,
    texto: p => `$${p.area} \\div 2 = ${p.area / 2}$, $${p.area} \\div 6 = ${p.area / 6}$ y $2 \\cdot ${p.area / 6} = ${p.area / 3}$`,
    alto: () => 214,
    fondo(K, p, f) {
      const A = [100, 24], B = [20, 180], C = [196, 180], M = [108, 180], Q = [148, 102], R = [60, 102], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
      const seis = [[B, G, M], [M, G, C], [C, G, Q], [Q, G, A], [A, G, R], [R, G, B]];
      return K.p([A, B, C], 'fc') + K.f(f, seis.map((t, i) => K.p(t, i % 2 ? 'fg' : 'fa')).join('')) + K.l(...A, ...M, 'la') + K.l(...B, ...Q, 'la') + K.l(...C, ...R, 'la') + K.c(...G, 3.5, 'fk')
        + K.t(100, 16, 'A', 's') + K.t(12, 194, 'B', 's') + K.t(204, 194, 'C', 's') + K.t(108, 196, 'M', 's ta') + K.t(G[0] + 9, G[1] - 6, 'G', 's', 'start') + K.t(108, 211, `△ABC = ${p.area}`, 's ta')
        + K.t(248, 54, '△ABM', 's', 'end') + K.t(248, 116, '△BGM', 's', 'end') + K.t(248, 178, '△BGC', 's', 'end');
    },
    aviso(q, p) {
      const m = med(p);
      return q[0][0] !== m[0] ? 'La mediana AM parte la base en dos trozos congruentes: △ABM es la mitad del triángulo.'
        : q[1][0] === m[2] ? 'Las tres medianas forman seis triángulos equivalentes, no tres.'
          : q[1][0] !== m[1] ? 'Las tres medianas parten el triángulo en seis partes equivalentes: divide entre 6.'
            : '△BGC está hecho de dos de los seis triangulitos: es la tercera parte.';
    },
    bien: () => 'Una mediana, dos mitades; las tres medianas, seis partes equivalentes.',
  });

  XG.frases('equivalentes-o-no');

  // Triángulos semejantes: razón de lados, razón de áreas y área del grande.  params { t: { a, b, s }, et, metas, fichas, mira, trampas, ok }
  XG.cuenta('semejantes-area', 104, (K, p) => {
    const { a, b, s } = p.t, W = 128, w = W * a / b, H = 66, h = H * a / b, y = 82;
    return K.p([[34, y], [34 + w, y], [34 + w * 0.3, y - h]], 'fg') + K.t(34 + w / 2, y + 15, a, 's tg') + K.t(34 + w + 8, y - h / 2, `área ${s}`, 's tg', 'start')
      + K.p([[186, y], [186 + W, y], [186 + W * 0.3, y - H]], 'fa') + K.t(186 + W / 2, y + 15, b, 's ta') + K.t(186 + W * 0.45, y - H * 0.28, 'área ?', 's ta');
  });

  // Triángulos con un ángulo común: razón de áreas = razón de los productos de los lados.  v { e }   params { c (AB), b (AC), d (AD), m, n }
  const AC = [26, 190], UA = 22, CO = Math.cos(50 * RAD), SI = Math.sin(50 * RAD), enAC = e => [AC[0] + e * UA * CO, AC[1] - e * UA * SI];
  XG.figura('angulo-compartido', {
    ini: p => ({ e: p.b }),
    manijas: p => [{ k: 'e', min: 1, max: p.b, paso: 1, en: v => enAC(v.e), de: (x, y) => ((x - AC[0]) * CO + (AC[1] - y) * SI) / UA }],
    ok: (v, p) => v.e * p.d * p.n === p.m * p.b * p.c,
    sol: p => ({ e: p.m * p.b * p.c / (p.n * p.d) }),
    texto: p => `$\\tfrac{${p.d} \\cdot ${p.m * p.b * p.c / (p.n * p.d)}}{${p.c} \\cdot ${p.b}} = \\tfrac{${p.m}}{${p.n}}$`,
    alto: () => 214, pie: 'Arrastra el punto E por el lado AC.',
    dib(v, K, p, f) {
      const B = [AC[0] + p.c * UA, 190], C = enAC(p.b), D = [AC[0] + p.d * UA, 190], E = enAC(v.e), mE = enAC(v.e / 2), mC = enAC((v.e + p.b) / 2);
      return K.p([AC, B, C], 'fg') + K.p([AC, D, E], 'fa') + K.t(16, 204, 'A', 's') + K.t(B[0] + 8, 204, 'B', 's') + K.t(C[0] - 4, C[1] - 8, 'C', 's') + K.t(D[0], 207, 'D', 's ta') + K.t(E[0] - 12, E[1] - 10, 'E', 's ta', 'end')
        + K.t((AC[0] + D[0]) / 2, 207, p.d, 'ta') + K.t((D[0] + B[0]) / 2, 207, p.c - p.d, 'tg') + K.t(mE[0] - 12, mE[1] + 2, N(v.e), 'ta', 'end') + (p.b - v.e > 0.6 ? K.t(mC[0] - 12, mC[1] + 2, N(p.b - v.e), 'tg', 'end') : '')
        + K.f(f, K.t(332, 22, `AD · AE = ${N(p.d * v.e)}`, 's ta', 'end') + K.t(332, 40, `AB · AC = ${p.c * p.b}`, 's tg', 'end'));
    },
    lee: (v, p) => `$\\tfrac{${p.d} \\cdot ${Math.round(v.e)}}{${p.c} \\cdot ${p.b}} = \\tfrac{${p.d * Math.round(v.e)}}{${p.c * p.b}}$`,
    aviso: (v, p) => (v.e * p.n === p.m * p.b ? `Solo partiste el lado AC. Cuenta también que AD es ${p.d} de ${p.c}: se comparan los productos de los dos lados.`
      : v.e * p.d * p.n > p.m * p.b * p.c ? 'El triángulo ADE quedó con más área de la pedida.' : 'El triángulo ADE quedó con menos área de la pedida.'),
    bien: () => 'Con un ángulo común, las áreas son como los productos de los lados que lo forman.',
  });

  // ------------------------------------------------------------------------------------------- euc-areas-3 · áreas sombreadas
  // Cuadrado y círculo, uno dentro del otro.  params { modo: 'inscrito' (círculo en cuadrado de lado l) | 'circunscrito' (cuadrado en círculo de radio r), fichas }
  const cyc = p => (p.modo === 'inscrito' ? [`${p.l * p.l}`, `${p.l * p.l / 4}π`, `${p.l * p.l} − ${p.l * p.l / 4}π`] : [`${p.r * p.r}π`, `${2 * p.r * p.r}`, `${p.r * p.r}π − ${2 * p.r * p.r}`]);
  XG.rotula('cuadrado-circulo', {
    slots: () => [{ x: 284, y: 46, w: 100, h: 36 }, { x: 284, y: 112, w: 100, h: 36 }, { x: 284, y: 178, w: 100, h: 36 }],
    fichas: p => p.fichas, metas: cyc,
    texto(p) { const m = cyc(p); return p.modo === 'inscrito' ? `cuadrado $${m[0]}$, círculo $${p.l * p.l / 4}\\pi$, sombreada $${p.l * p.l} - ${p.l * p.l / 4}\\pi$` : `círculo $${p.r * p.r}\\pi$, cuadrado $${m[1]}$, sombreada $${p.r * p.r}\\pi - ${m[1]}$`; },
    alto: () => 206,
    fondo(K, p, f) {
      const C = [84, 100], ins = p.modo === 'inscrito', et = ins ? ['cuadrado', 'círculo'] : ['círculo', 'cuadrado'];
      const fig = ins
        ? K.r(C[0] - 66, C[1] - 66, 132, 132, 'fa', 0) + K.c(...C, 66, 'fc') + K.t(C[0], C[1] + 84, p.l, 'ta') + K.f(f, K.l(...C, C[0] + 66, C[1], 'lf gr') + K.t(C[0] + 33, C[1] - 7, p.l / 2, 's tf') + K.c(...C, 3, 'fk'))
        : K.c(...C, 70, 'fa') + K.p([45, 135, 225, 315].map(g => K.at(...C, 70, g)), 'fc') + K.l(...C, C[0] + 70, C[1], 'la') + K.t(C[0] + 40, C[1] - 6, p.r, 's ta') + K.c(...C, 3, 'fk')
          + K.f(f, K.l(...K.at(...C, 70, 225), ...K.at(...C, 70, 45), 'lf d') + K.t(C[0] - 30, C[1] + 16, `diagonal ${2 * p.r}`, 's tf'));
      return fig + K.t(228, 50, et[0], 's', 'end') + K.t(228, 116, et[1], 's', 'end') + K.t(228, 182, 'sombreada', 's ta', 'end');
    },
    aviso(q, p) {
      const m = cyc(p);
      if (p.modo === 'inscrito') return q[1][0] === `${p.l * p.l}π` ? 'El radio del círculo inscrito es la mitad del lado, no el lado entero.' : q[1][0] === `${p.l}π` ? 'Ese es el borde del círculo; el área es el radio por el radio, por π.' : q[2][0] !== m[2] && q[0][0] === m[0] && q[1][0] === m[1] ? 'Se sombrea lo que queda del cuadrado: cuadrado menos círculo, en ese orden.' : 'El círculo toca los cuatro lados: su diámetro es el lado del cuadrado.';
      return q[1][0] === `${4 * p.r * p.r}` ? 'El lado del cuadrado no es el diámetro: lo que mide dos radios es su diagonal.' : q[1][0] === `${p.r * p.r}` ? 'Con r por r sale solo un cuarto del cuadrado: mira sus diagonales.' : q[2][0] !== m[2] && q[0][0] === m[0] && q[1][0] === m[1] ? 'Se sombrea lo que queda del círculo: círculo menos cuadrado, en ese orden.' : 'El cuadrado inscrito es un rombo cuyas diagonales son diámetros: semiproducto de las diagonales.';
    },
    bien: p => (p.modo === 'inscrito' ? 'Lo de afuera menos lo de adentro: cuadrado menos círculo.' : 'Lo de afuera menos lo de adentro: círculo menos cuadrado.'),
  });

  // Corona circular: se agranda el círculo de afuera.  v { R }   params { r, area } (área en partes de π)
  XG.figura('corona-borde', {
    ini: p => ({ R: p.r + 0.5 }),
    manijas: p => [{ k: 'R', min: p.r + 0.5, max: 8, paso: 0.5, en: v => [170 + v.R * 12, 106], de: (x, y) => Math.hypot(x - 170, y - 106) / 12 }],
    ok: (v, p) => v.R * v.R - p.r * p.r === p.area,
    sol: p => ({ R: Math.sqrt(p.area + p.r * p.r) }),
    texto: p => `$R^2 = ${p.area} + ${p.r * p.r} = ${p.area + p.r * p.r}$: $R = ${Math.sqrt(p.area + p.r * p.r)}$`,
    alto: () => 212, pie: 'Arrastra el borde de afuera.',
    dib: (v, K, p, f) => K.c(170, 106, v.R * 12, 'fa') + K.c(170, 106, p.r * 12, 'fc') + K.l(170, 106, ...K.at(170, 106, p.r * 12, 90), 'lg') + K.t(176, 106 - p.r * 6 + 4, p.r, 's tg', 'start') + K.c(170, 106, 2.5, 'fk') + K.t(8, 20, `R = ${N(v.R)}`, 'tf', 'start')
      + K.f(f, K.l(170, 106, 170 + v.R * 12, 106, 'lf') + K.t(332, 20, `${N(v.R * v.R)}π − ${p.r * p.r}π`, 's ta', 'end')),
    lee: (v, p) => `$${N(v.R * v.R)}\\pi - ${p.r * p.r}\\pi = ${N(v.R * v.R - p.r * p.r)}\\pi$`,
    aviso: (v, p) => ((v.R - p.r) ** 2 === p.area ? 'Restaste los radios y luego elevaste al cuadrado: se restan las áreas de los dos círculos.' : v.R * v.R - p.r * p.r > p.area ? 'La corona quedó con más área: el borde está muy afuera.' : 'La corona quedó con menos área: el borde está muy adentro.'),
    bien: () => 'Círculo grande menos círculo chico: se restan las áreas, no los radios.',
  });

  // Cuadrado sin cuatro cuartos de círculo en las esquinas: l² − kπ.  v { r }   params { l, k }
  XG.figura('esquinas-cuarto', {
    ini: () => ({ r: 0.5 }),
    manijas: p => [{ k: 'r', min: 0.5, max: p.l / 2, paso: 0.5, en: v => [90 + v.r * 160 / p.l, 18], de: x => (x - 90) * p.l / 160 }],
    ok: (v, p) => v.r * v.r === p.k,
    sol: p => ({ r: Math.sqrt(p.k) }),
    texto: p => `cuatro cuartos hacen un círculo: $r^2 = ${p.k}$, $r = ${Math.sqrt(p.k)}$`,
    alto: () => 200, pie: 'Arrastra el punto para abrir las cuatro esquinas.',
    dib(v, K, p, f) {
      const u = 160 / p.l, x = 90, y = 18, s = 160, r = v.r * u;
      return K.r(x, y, s, s, 'fa', 0) + K.sec(x, y, r, 270, 360, 'fc') + K.sec(x + s, y, r, 180, 270, 'fc') + K.sec(x + s, y + s, r, 90, 180, 'fc') + K.sec(x, y + s, r, 0, 90, 'fc')
        + K.t(x + s / 2, y + s + 17, p.l, 'ta') + K.t(8, 20, `r = ${N(v.r)}`, 'tf', 'start') + K.f(f, K.c(294, 104, Math.min(34, r * 0.6), 'fg') + K.t(294, 154, '4 cuartos', 's tg') + K.t(294, 168, `${N(v.r * v.r)}π`, 's tg'));
    },
    lee: (v, p) => `$${p.l * p.l} - \\pi \\cdot ${N(v.r)}^2 = ${p.l * p.l} - ${N(v.r * v.r)}\\pi$`,
    aviso: (v, p) => (4 * v.r * v.r === p.k ? 'Cada esquina es un cuarto de círculo: las cuatro juntas hacen un solo círculo, no cuatro.' : v.r * v.r > p.k ? 'Quitaste más círculo del pedido: el radio es muy grande.' : 'Quitaste menos círculo del pedido: el radio es muy chico.'),
    bien: () => 'Cuatro cuartos son un círculo entero: cuadrado menos círculo.',
  });

  // Pétalo entre dos cuartos de círculo en un cuadrado de lado l.  params { l (par), fichas }
  const pet = p => { const c = p.l * p.l / 4, t = p.l * p.l / 2; return [`${c}π`, `${t}`, `${c}π − ${t}`, `${2 * c}π − ${2 * t}`]; };
  XG.rotula('petalo-cuartos', {
    slots: () => [{ x: 290, y: 24, w: 88, h: 34 }, { x: 290, y: 74, w: 88, h: 34 }, { x: 290, y: 124, w: 88, h: 34 }, { x: 290, y: 174, w: 88, h: 34 }],
    fichas: p => p.fichas, metas: pet,
    texto(p) { const c = p.l * p.l / 4, t = p.l * p.l / 2; return `segmento $${c}\\pi - ${t}$; pétalo $2(${c}\\pi - ${t}) = ${2 * c}\\pi - ${2 * t}$`; },
    alto: () => 200,
    fondo(K, p, f) {
      const x = 14, y = 28, s = 140, TL = `${x} ${y}`, BR = `${x + s} ${y + s}`;
      return K.r(x, y, s, s, 'fc', 0) + camino(`M${TL} A${s} ${s} 0 0 1 ${BR} A${s} ${s} 0 0 1 ${TL} Z`, 'fa')
        + K.f(f, camino(`M${TL} A${s} ${s} 0 0 1 ${BR} Z`, 'fg') + K.p([[x, y], [x + s, y + s], [x, y + s]], 'fn d') + K.l(x, y, x + s, y + s, 'lf d'))
        + K.t(x + s / 2, y + s + 17, p.l, 'ta') + K.t(x + s / 2, 18, `radio de los arcos: ${p.l}`, 's tm')
        + K.t(240, 28, 'cuarto', 's', 'end') + K.t(240, 78, 'triángulo', 's', 'end') + K.t(240, 128, 'segmento', 's tg', 'end') + K.t(240, 178, 'pétalo', 's ta', 'end');
    },
    aviso(q, p) {
      const m = pet(p);
      return q[0][0] === `${p.l * p.l}π` ? 'Es un cuarto del círculo de radio igual al lado, no el círculo entero.'
        : q[1][0] === `${p.l * p.l}` ? 'El triángulo que corta la diagonal es la mitad del cuadrado.'
          : q[3][0] === m[2] ? 'Ese es un solo segmento: el pétalo tiene dos, uno a cada lado de la diagonal.'
            : 'El segmento es el cuarto de círculo menos el triángulo, y el pétalo son dos segmentos.';
    },
    bien: () => 'Sector menos triángulo da el segmento; dos segmentos, el pétalo.',
  });

  // En movimiento: se lanzan las partes de π de la figura.  tiro { q, f: { t: 'cc' | 'corona' | 'cuartos' | 'sector' | 'medio', … }, r, c, e }
  XG.tiros('pi-lanza', {
    perilla: () => ({ et: 'Partes de π', min: 0, max: 40, lee: v => `${v}π` }),
    meta: t => t.r, alto: 150, ms: 1900,
    dib(t, v, K, p, f) {
      const F = t.f, cx = 84, cy = 68, s = 108; let h = '';
      if (F.t === 'cc') h = K.r(cx - s / 2, cy - s / 2, s, s, 'fa', 0) + K.c(cx, cy, s / 2, 'fc') + K.t(cx, cy + s / 2 + 16, F.l, 's ta');
      else if (F.t === 'cuartos') h = K.r(cx - s / 2, cy - s / 2, s, s, 'fa', 0) + K.sec(cx - s / 2, cy - s / 2, s / 2, 270, 360, 'fc') + K.sec(cx + s / 2, cy - s / 2, s / 2, 180, 270, 'fc') + K.sec(cx + s / 2, cy + s / 2, s / 2, 90, 180, 'fc') + K.sec(cx - s / 2, cy + s / 2, s / 2, 0, 90, 'fc') + K.t(cx, cy + s / 2 + 16, F.l, 's ta');
      else if (F.t === 'corona') { const R0 = 56, r0 = R0 * F.r / F.R; h = K.c(cx, cy, R0, 'fa') + K.c(cx, cy, r0, 'fc') + K.l(cx, cy, cx + r0, cy, 'lf') + K.t(cx + r0 / 2, cy - 5, F.r, 's tf') + K.l(cx, cy, ...K.at(cx, cy, R0, 235), 'la') + K.t(...K.at(cx, cy + 4, R0 + 11, 235), F.R, 's ta') + K.c(cx, cy, 2.5, 'fk'); }
      else if (F.t === 'sector') h = K.c(cx, cy, 56, 'fc') + K.sec(cx, cy, 56, 0, F.g, 'fa') + K.t(cx + 28, cy + 15, `r = ${F.r}`, 's tm') + K.t(...K.at(cx, cy + 4, 30, F.g / 2), `${F.g}°`, 's ta');
      else h = K.r(cx - 64, cy - 32, 128, 64, 'fa', 0) + K.sec(cx, cy + 32, 64, 0, 180, 'fc') + K.t(cx, cy + 48, 2 * F.r, 's ta') + K.t(cx - 70, cy + 4, F.r, 's ta', 'end');
      const c = 15, X = 186, n = v == null ? 0 : Math.floor(v * f + 1e-9);
      for (let i = 0; i < 40; i++) h += K.c(X + (i % 10) * c, 108 - Math.floor(i / 10) * c, 5.5, i < n ? (f >= 1 && v !== t.r ? 'ff' : 'fA') : 'fc');
      return h + K.t(X + 67, 138, v == null ? 'partes de π' : `${n}π`, 's tm');
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Sobraron partes de π.' : 'Faltaron partes de π.')),
    cuenta: t => `$${t.c}$`, pie: 'Estira las partes de π justas y suelta.',
  });
})();
