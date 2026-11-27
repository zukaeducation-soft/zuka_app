// Geometría Euclidiana · mundo 7 «euc-areas»: explicaciones Explora (spec 2026-11-26-curso-euclidiana), con las escenas «dibujo» y
// «fichas». Los ejemplos no son los de los ejercicios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const R = Math.round, N = x => String(Math.round(x * 100) / 100);
  const camino = (d, cls) => `<path class="xf ${cls}" d="${d}"/>`;

  // ----------------------------------------------------------------------------------------------------- euc-areas-1
  // Rectángulo de 5 por 3 que se inclina (s), con la pieza que se pasa de lado (m) y la diagonal (dg).
  const base = (v, K) => {
    const u = 30, x = 70, yb = 140, yt = 50, s = v.s * u, W = 5 * u; let g = '';
    for (let i = 1; i < 5; i++) g += K.l(x + i * u, yb, x + i * u, yt, 'lr');
    for (let j = 1; j < 3; j++) g += K.l(x, yb - j * u, x + W, yb - j * u, 'lr');
    return K.p([[x, yb], [x + W, yb], [x + W + s, yt], [x + s, yt]], 'fa') + K.f(1 - v.s * 3, g)
      + K.f(v.m, K.r(x, yt, W, yb - yt, 'fn d', 0) + K.p([[x + W, yb], [x + W + s, yt], [x + W, yt]], 'ff') + K.p([[x, yb], [x + s, yt], [x, yt]], 'fo'))
      + K.f(v.dg, K.p([[x, yb], [x + W, yb], [x + W + s, yt]], 'fg') + K.l(x, yb, x + W + s, yt, 'lf gr'))
      + K.t(x + W / 2, yb + 18, '5', 'ta') + K.l(x - 12, yb, x - 12, yt, 'lm d') + K.t(x - 20, (yb + yt) / 2 + 5, '3', 'ta', 'end');
  };
  const sube = (v, K) => K.p([[66, 180], [274, 180], [170, 180 - v.h * 18]], 'fa') + K.l(170, 180, 170, 180 - v.h * 18, 'lf d') + K.t(170, 198, '8', 'ta') + K.t(182, 180 - v.h * 9 + 5, R(v.h), 'tf', 'start');
  // Rombo en su caja (cual 0), trapecio con su copia (1) y triángulo de lados 5, 5 y 6 (2).
  const romtra = (v, K) => {
    if (v.cual < 0.5) return K.f(v.caja, K.r(82, 34, 176, 132, 'fn d', 0)) + K.p([[82, 100], [170, 34], [258, 100], [170, 166]], 'fa') + K.l(82, 100, 258, 100, 'lg') + K.l(170, 34, 170, 166, 'lf') + K.t(214, 94, '8', 'tg') + K.t(178, 140, '6', 'tf', 'start');
    if (v.cual < 1.5) return K.f(v.cp, K.p([[180, 150], [240, 150], [260, 70], [120, 70]], 'fg') + K.t(210, 168, '3', 'tg') + K.t(190, 62, '7', 'tg'))
      + K.p([[40, 150], [180, 150], [120, 70], [60, 70]], 'fa') + K.t(110, 168, '7', 'ta') + K.t(90, 62, '3', 'ta') + K.l(60, 70, 60, 150, 'lm d') + K.t(52, 115, '4', 'tm', 'end');
    return K.p([[80, 160], [260, 160], [170, 40]], 'fa') + K.t(170, 178, '6', 'ta') + K.t(112, 96, '5', 'ta', 'end') + K.t(228, 96, '5', 'ta', 'start') + K.t(170, 120, 'p = 8', 'tm');
  };
  // Polígono regular de n lados con su apotema; sector, segmento y corona.
  const polcir = (v, K) => {
    const C = [170, 100], Rr = 80, n = R(v.n);
    if (v.cor > 0.5) return K.c(...C, Rr, 'fa') + K.c(...C, 48, 'fc') + K.l(...C, ...K.at(...C, Rr, 30), 'la') + K.t(...K.at(C[0], C[1] + 4, Rr + 12, 30), 'R', 'ta') + K.l(...C, ...K.at(...C, 48, 150), 'lf') + K.t(...K.at(C[0], C[1] - 8, 26, 150), 'r', 'tf') + K.c(...C, 3, 'fk');
    const P = Array.from({ length: n }, (_, i) => K.at(...C, Rr, -90 - 180 / n + i * 360 / n));
    const fig = n >= 24 ? K.c(...C, Rr, 'fa') : K.p(P, 'fa');
    const a = Rr * Math.cos(Math.PI / n);
    return fig + K.f(v.tri, P.map(q => K.l(...C, ...q, 'lm')).join('') + K.p([C, P[0], P[1]], 'fg') + K.l(C[0], C[1], C[0], C[1] + a, 'lf gr') + K.t(C[0] + 8, C[1] + a / 2 + 5, 'a', 'tf', 'start'))
      + (v.sec > 1 ? K.sec(...C, Rr, 0, v.sec, 'fg') + K.t(...K.at(C[0], C[1] + 5, 46, v.sec / 2), `${R(v.sec)}°`, 'tg') : '')
      + K.f(v.seg, K.p([C, K.at(...C, Rr, 0), K.at(...C, Rr, v.sec)], 'fo')) + K.c(...C, 3, 'fk');
  };
  const SC = [170, 104];
  const sect = (v, K) => K.c(...SC, 84, 'fc') + K.sec(...SC, 84, 0, v.g, 'fa') + K.l(...SC, 254, 104) + K.t(214, 122, 'r = 6', 's tm') + K.t(...K.at(SC[0], SC[1] + 4, 40, Math.max(20, v.g / 2)), `${R(v.g)}°`, 'ta');

  xpLec('euc-areas-1', [
    ['De base por altura',
      xpMira('dibujo', 'Medir un área es **contar cuadrados**. De ahí salen todas las fórmulas.', { dib: base, v: { s: 0, m: 0, dg: 0 }, alto: 190 }, [
        ['Medir un área es contar cuántos cuadrados unidad caben. En este rectángulo caben 5 por 3.', {}, '$5 \\cdot 3 = 15$'],
        ['Inclinamos los lados: ahora es un paralelogramo, con la misma base y la misma altura.', { s: 2 }],
        ['El triángulo que sobra a un lado llena el hueco del otro: vale lo mismo que el rectángulo.', { m: 1 }, '$b \\cdot h = 15$'],
        ['Una diagonal parte el paralelogramo en dos triángulos congruentes.', { m: 0, dg: 1 }],
        ['Por eso el triángulo vale la mitad de base por altura.', {}, '$\\tfrac{5 \\cdot 3}{2} = 7.5$'],
      ], 'Rectángulo y paralelogramo: base por altura. Triángulo: la mitad. Figuras con igual área son equivalentes.'),
      xpHaz('dibujo', 'Sube el vértice hasta que el triángulo de base 8 tenga área 20.', { dib: sube, v: { h: 2 }, metas: { h: 5 }, alto: 210,
        manijas: [{ k: 'h', min: 1, max: 8, paso: 1, en: v => [170, 180 - v.h * 18], de: (x, y) => (180 - y) / 18 }],
        lee: v => `$\\tfrac{8 \\cdot ${v.h}}{2} = ${4 * v.h}$`, dice: v => `Base 8 y altura ${v.h}: la mitad de su producto.` }, 'La mitad de base por altura: $\\tfrac{8 \\cdot 5}{2} = 20$.')],
    ['Rombo, trapecio y Herón',
      xpMira('dibujo', 'Otras figuras se convierten en **mitades** de algo conocido.', { dib: romtra, v: { cual: 0, caja: 0, cp: 0 }, alto: 190 }, [
        ['Un rombo de diagonales 8 y 6 cabe justo en la caja que ellas forman.', { caja: 1 }],
        ['Ocupa la mitad de la caja: su área es el semiproducto de las diagonales.', {}, '$\\tfrac{8 \\cdot 6}{2} = 24$'],
        ['Ahora un trapecio de bases 7 y 3 y altura 4.', { cual: 1 }],
        ['Con una copia volteada se arma un paralelogramo de base 7 más 3.', { cp: 1 }],
        ['El trapecio es la mitad: semisuma de las bases por la altura.', {}, '$\\tfrac{(7 + 3) \\cdot 4}{2} = 20$'],
        ['Si de un triángulo solo se conocen los lados, la fórmula de Herón usa el semiperímetro p.', { cual: 2 }, '$\\sqrt{p(p-a)(p-b)(p-c)}$'],
        ['Con lados 5, 5 y 6, p vale 8 y el área sale 12.', {}, '$\\sqrt{8 \\cdot 3 \\cdot 3 \\cdot 2} = 12$'],
      ], 'Rombo: semiproducto de las diagonales. Trapecio: semisuma de las bases por la altura. Herón: con el semiperímetro.'),
      xpHaz('fichas', 'Un triángulo tiene lados 6, 8 y 10. Pon el semiperímetro, el producto que va bajo la raíz de Herón y el área.', { slots: fila('semiperímetro', 'bajo la raíz', 'área'), fichas: ['12', '576', '24', '48', '288', '14'], meta: ['12', '576', '24'], alto: 96, pista: 'El semiperímetro es la mitad de la suma de los lados.' }, '$p = 12$ y $\\sqrt{12 \\cdot 6 \\cdot 4 \\cdot 2} = \\sqrt{576} = 24$.')],
    ['Polígono regular y círculo',
      xpMira('dibujo', 'Del **polígono regular** al círculo solo hay un paso.', { dib: polcir, v: { n: 6, tri: 1, sec: 0, seg: 0, cor: 0 }, alto: 200 }, [
        ['Un polígono regular se parte en triángulos iguales desde el centro. Su altura es la apotema.', {}],
        ['Sumando los triángulos sale el semiperímetro por la apotema.', {}, '$A = p \\cdot a$'],
        ['Con más y más lados, el polígono se parece a un círculo y la apotema al radio.', { n: 24, tri: 0 }],
        ['El semiperímetro del círculo es π por r, así que su área es π por r por r.', {}, '$A = \\pi r^2$'],
        ['Un sector circular es una tajada: le toca la parte del área que su ángulo es de la vuelta.', { sec: 90 }, '$\\tfrac{90}{360} \\cdot \\pi r^2$'],
        ['Si al sector le quitas el triángulo de sus dos radios queda el segmento circular.', { seg: 1 }, '$\\text{sector} - \\text{triángulo}$'],
        ['Y una corona es un círculo grande menos uno chico con el mismo centro.', { cor: 1, sec: 0, seg: 0 }, '$\\pi R^2 - \\pi r^2$'],
      ], 'Polígono regular: semiperímetro por apotema. Círculo: $\\pi r^2$. Sector: su parte de la vuelta.'),
      xpHaz('dibujo', 'En un círculo de radio 6, abre el sector hasta que su área sea $15\\pi$.', { dib: sect, v: { g: 60 }, metas: { g: 150 }, alto: 204,
        manijas: [{ k: 'g', min: 30, max: 330, paso: 30, en: v => XPK.at(...SC, 84, v.g), de: (x, y) => (Math.atan2(SC[1] - y, x - SC[0]) * 180 / Math.PI + 360) % 360 }],
        lee: v => `$\\tfrac{${v.g}}{360} \\cdot 36\\pi = ${N(v.g / 10)}\\pi$`, dice: v => `El círculo entero vale 36π. Tu sector abre ${v.g}°.` }, '$15\\pi$ de $36\\pi$ son $\\tfrac{5}{12}$ del círculo: $\\tfrac{5}{12} \\cdot 360^\\circ = 150^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una pista de baile es un trapecio de bases 12 m y 8 m y altura 5 m, con una tarima circular de radio 2 m adentro. Pon cada área, en m².', { slots: fila('pista', 'tarima', 'queda libre'), fichas: ['50', '4π', '50 − 4π', '100', '2π', '100 − 4π'], meta: ['50', '4π', '50 − 4π'], alto: 96, pista: 'El trapecio usa la semisuma de las bases.' }, 'Trapecio: $\\tfrac{(12 + 8) \\cdot 5}{2} = 50$. Círculo: $4\\pi$. Libre: $50 - 4\\pi$ m².')],
  ], 'Todo sale de base por altura: mitades para triángulo, rombo y trapecio; apotema para los regulares; $\\pi r^2$ para el círculo.');

  // ----------------------------------------------------------------------------------------------------- euc-areas-2
  // Base fija de 6 y vértice que se desliza por la paralela; con d, la base partida en 2 y 4.
  const prl = (v, K) => {
    const A = [70, 170], B = [250, 170], P = [40 + v.x * 30, 50], D = [130, 170];
    return K.l(10, 50, 330, 50, 'lm d') + (v.d > 0.5 ? K.p([A, D, P], 'fa') + K.p([D, B, P], 'fg') + K.t(100, 188, '2', 'ta') + K.t(190, 188, '4', 'tg') : K.p([A, B, P], 'fa') + K.t(160, 188, '6', 'ta'))
      + K.l(P[0], 50, P[0], 170, 'lf d') + K.t(P[0] + 7, 114, '4', 'tf', 'start') + K.l(...A, ...B, 'gr');
  };
  const parte = (v, K) => {
    const A = [140, 40], B = [44, 172], C = [296, 172], D = [44 + v.d * 28, 172]; let h = K.p([A, B, D], 'fa') + K.p([A, D, C], 'fg');
    for (let i = 1; i < 9; i++) h += K.l(44 + i * 28, 168, 44 + i * 28, 176, 'lm');
    return h + K.t((B[0] + D[0]) / 2, 192, R(v.d), 'ta') + K.t((D[0] + C[0]) / 2, 192, 9 - R(v.d), 'tg');
  };
  const medi = (v, K) => {
    const A = [140, 26], B = [60, 176], C = [290, 176], M = [175, 176], Q = [215, 101], S = [100, 101], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    const seis = [[B, G, M], [M, G, C], [C, G, Q], [Q, G, A], [A, G, S], [S, G, B]], dos = Math.max(0, 1 - Math.abs(v.col - 1)), sx = Math.max(0, v.col - 1);
    return K.p([A, B, C], 'fc') + K.f(dos, K.p([A, B, M], 'fa') + K.p([A, M, C], 'fg')) + K.f(sx, seis.map((t, i) => K.p(t, i % 2 ? 'fg' : 'fa')).join(''))
      + K.f(v.m1, K.l(...A, ...M, 'la gr') + K.c(...M, 4, 'fk')) + K.f(v.m3, K.l(...B, ...Q, 'la') + K.l(...C, ...S, 'la') + K.c(...G, 4, 'fk')) + K.t(300, 30, 'área 60', 'tm', 'end');
  };
  // Triángulo semejante hecho de k² copias (cual 0); dos triángulos con un ángulo común (cual 1).
  const copias = (v, K, ux = 50, uy = 40, y0 = 170) => {
    const k = Math.max(1, R(v.k)), O = [40, y0], ex = [ux, 0], ey = [ux * 0.3, -uy], at = (i, j) => [O[0] + i * ex[0] + j * ey[0], O[1] + i * ex[1] + j * ey[1]];
    let h = K.p([at(0, 0), at(k, 0), at(0, k)], 'fa');
    for (let i = 1; i < k; i++) h += K.l(...at(i, 0), ...at(0, i), 'lr') + K.l(...at(i, 0), ...at(i, k - i), 'lr') + K.l(...at(0, i), ...at(k - i, i), 'lr');
    return h + K.p([at(0, 0), at(1, 0), at(0, 1)], 'fg') + K.t(332, 24, `lados por ${k}`, 'tm', 'end') + K.t(332, 46, `${k * k} ${k === 1 ? 'copia' : 'copias'}`, 'ta', 'end');
  };
  const semj = (v, K) => {
    if (v.cual < 0.5) return copias(v, K);
    const A = [40, 170], c = Math.cos(55 * Math.PI / 180), s = Math.sin(55 * Math.PI / 180), u = 34, en = e => [A[0] + e * u * c, A[1] - e * u * s], B = [A[0] + 6 * u, 170], D = [A[0] + 3 * u, 170], E = en(2), C = en(5), m1 = en(1), m2 = en(3.5);
    return K.p([A, B, C], 'fg') + K.p([A, D, E], 'fa') + K.t((A[0] + D[0]) / 2, 188, '3', 'ta') + K.t((D[0] + B[0]) / 2, 188, '3', 'tg') + K.t(m1[0] - 10, m1[1], '2', 'ta', 'end') + K.t(m2[0] - 10, m2[1], '3', 'tg', 'end');
  };

  xpLec('euc-areas-2', [
    ['Misma altura, misma base',
      xpMira('dibujo', 'Para comparar áreas de triángulos basta mirar **base y altura**.', { dib: prl, v: { x: 4, d: 0 }, alto: 200 }, [
        ['Este triángulo tiene la base abajo y el vértice arriba, sobre una paralela a la base.', {}],
        ['Deslizamos el vértice por la paralela: la forma cambia, la altura no.', { x: 9 }],
        ['Misma base y misma altura: todos estos triángulos son equivalentes.', { x: 1 }, '$\\tfrac{6 \\cdot 4}{2} = 12$'],
        ['Ahora partimos la base en trozos de 2 y de 4. Los dos triángulos comparten la altura.', { x: 5, d: 1 }],
        ['Con la misma altura, las áreas son proporcionales a las bases: 4 y 8.', {}, '$\\tfrac{4}{8} = \\tfrac{2}{4}$'],
      ], 'Misma base entre paralelas: equivalentes. Misma altura: áreas proporcionales a las bases.'),
      xpHaz('dibujo', 'La base mide 9. Mueve el punto hasta que el triángulo de la izquierda tenga el doble de área que el de la derecha.', { dib: parte, v: { d: 3 }, metas: { d: 6 }, alto: 204,
        manijas: [{ k: 'd', min: 1, max: 8, paso: 1, en: v => [44 + v.d * 28, 172], de: x => (x - 44) / 28 }],
        lee: v => `$\\tfrac{${v.d}}{${9 - v.d}}$`, dice: v => `A la izquierda ${v.d} de base y a la derecha ${9 - v.d}, con la misma altura.` }, 'Las áreas van como las bases: $6 : 3 = 2 : 1$.')],
    ['Las medianas',
      xpMira('dibujo', 'Una **mediana** siempre reparte el área por igual.', { dib: medi, v: { m1: 0, m3: 0, col: 0 }, alto: 200 }, [
        ['Una mediana une un vértice con el punto medio del lado opuesto.', { m1: 1 }],
        ['Los dos triángulos tienen bases congruentes y la misma altura: son equivalentes.', { col: 1 }, '$30 + 30 = 60$'],
        ['Trazamos las otras dos medianas. Las tres se cortan en un punto: el baricentro.', { m3: 1, col: 0 }],
        ['Quedan seis triángulos pequeños, y los seis son equivalentes.', { col: 2 }, '$60 \\div 6 = 10$'],
        ['Dos pegados forman un tercio del triángulo; tres, la mitad.', {}, '$10 + 10 = 20$'],
      ], 'Una mediana parte el triángulo en dos equivalentes; las tres medianas, en seis.'),
      xpHaz('fichas', 'Un triángulo tiene área 90. Pon el área de cada mitad que deja una mediana y la de cada uno de los seis triángulos de las tres medianas.', { slots: fila('cada mitad', 'cada uno de seis'), fichas: ['45', '15', '30', '18'], meta: ['45', '15'], alto: 96, pista: 'Una mediana parte en dos; las tres, en seis.' }, '$90 \\div 2 = 45$ y $90 \\div 6 = 15$.')],
    ['Semejantes y ángulo común',
      xpMira('dibujo', 'En figuras **semejantes** el área crece más rápido que los lados.', { dib: semj, v: { k: 1, cual: 0 }, alto: 200 }, [
        ['Este triángulo tiene área 1. Hagamos uno semejante con los lados al doble.', {}],
        ['En el grande caben cuatro copias del chico: lados por 2, área por 4.', { k: 2 }, '$2^2 = 4$'],
        ['Con los lados al triple caben nueve: la razón de las áreas es el cuadrado de la de los lados.', { k: 3 }, '$3^2 = 9$'],
        ['Otra relación: dos triángulos con un ángulo congruente, aquí el mismo ángulo.', { cual: 1 }],
        ['Sus áreas están en la razón de los productos de los lados que forman ese ángulo.', {}, '$\\tfrac{3 \\cdot 2}{6 \\cdot 5} = \\tfrac{1}{5}$'],
      ], 'Semejantes con razón $k$: áreas en razón $k^2$. Con un ángulo congruente: como los productos de sus lados.'),
      xpHaz('dibujo', 'El triángulo dorado tiene área 3. Agranda los lados hasta que el semejante tenga área 48.', { dib: (v, K) => copias(v, K, 44, 30, 176), v: { k: 1 }, metas: { k: 4 }, alto: 250,
        manijas: [{ k: 'k', min: 1, max: 5, paso: 1, et: 'los lados se multiplican por' }],
        lee: v => `$3 \\cdot ${v.k}^2 = ${3 * v.k * v.k}$`, dice: v => `Con los lados por ${v.k} caben ${v.k * v.k} ${v.k === 1 ? 'copia' : 'copias'} del dorado.` }, '$48 \\div 3 = 16 = 4^2$: los lados se multiplican por 4.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un plano amplía un lote triangular: cada lado se multiplica por 5. En el plano original el lote ocupa 6 cm². Pon la razón de las áreas y el área ampliada.', { slots: fila('razón de áreas', 'área ampliada'), fichas: ['25', '150', '5', '30', '10'], meta: ['25', '150'], alto: 96, pista: 'Las áreas crecen con el cuadrado de la razón de los lados.' }, '$5^2 = 25$ y $6 \\cdot 25 = 150$ cm².')],
  ], 'Base y altura deciden: paralelas y medianas dan equivalentes; la semejanza eleva la razón al cuadrado.');

  // ----------------------------------------------------------------------------------------------------- euc-areas-3
  const C3 = [170, 100];
  const cuacir = (v, K) => (v.cual < 0.5
    ? K.r(98, 28, 144, 144, 'fa', 0) + K.c(...C3, 72, 'fc') + K.t(170, 190, '6', 'ta') + K.f(v.rad, K.l(...C3, 242, 100, 'lf gr') + K.t(206, 92, '3', 'tf') + K.c(...C3, 3, 'fk'))
    : K.c(...C3, 72, 'fa') + K.p([45, 135, 225, 315].map(g => K.at(...C3, 72, g)), 'fc') + K.l(...K.at(...C3, 72, 225), ...K.at(...C3, 72, 45), 'lf d') + K.l(...K.at(...C3, 72, 135), ...K.at(...C3, 72, 315), 'lf d') + K.t(196, 86, '6', 'tf', 'start') + K.c(...C3, 3, 'fk'));
  // Cuadrado de lado 2 con un cuarto de círculo; triángulo, segmento y pétalo.
  const cuartos = (v, K) => {
    const x = 100, y = 30, s = 140, TL = `${x} ${y}`, BR = `${x + s} ${y + s}`;
    return K.r(x, y, s, s, 'fc', 0) + (v.dos < 0.5 ? K.sec(x, y + s, s, 0, 90, 'fa') : camino(`M${TL} A${s} ${s} 0 0 1 ${BR} A${s} ${s} 0 0 1 ${TL} Z`, 'fa') + K.l(x, y, x + s, y + s, 'lf d'))
      + K.f(v.dos < 0.5 ? v.tri : 0, K.p([[x, y + s], [x + s, y + s], [x, y]], 'fg')) + K.f(v.dos < 0.5 ? v.seg : 0, camino(`M${TL} A${s} ${s} 0 0 1 ${BR} Z`, 'fo')) + K.t(x + s / 2, y + s + 18, '2', 'ta');
  };
  // Rectángulo de 8 por 4 con una pieza que sobra y un hueco igual (cual 0); corona de radios 5 y 3 (cual 1).
  const mover = (v, K) => {
    if (v.cual > 0.5) return K.c(...C3, 80, 'fa') + K.c(...C3, 48, 'fc') + K.l(...C3, ...K.at(...C3, 80, 30), 'la') + K.t(...K.at(C3[0], C3[1] + 4, 92, 30), '5', 'ta') + K.l(...C3, ...K.at(...C3, 48, 150), 'lf') + K.t(...K.at(C3[0], C3[1] - 8, 26, 150), '3', 'tf') + K.c(...C3, 3, 'fk');
    const cx = 252 - 192 * v.mv, media = (x, cls) => camino(`M${XPK.n(x)} 52 A48 48 0 0 1 ${XPK.n(x)} 148 Z`, cls);
    return K.r(60, 52, 192, 96, 'fa', 0) + K.f(1 - v.mv, media(60, 'fc')) + media(cx, 'fg') + K.t(156, 168, '8', 'ta') + K.t(50, 46, '4', 'ta', 'end');
  };
  const anillo = (v, K) => K.c(170, 104, 80, 'fa') + K.c(170, 104, v.r * 16, 'fc') + K.l(170, 104, ...K.at(170, 104, 80, 120), 'la') + K.t(...K.at(170, 108, 92, 120), '5', 'ta') + K.l(170, 104, 170 + v.r * 16, 104, 'lf') + K.c(170, 104, 3, 'fk');

  xpLec('euc-areas-3', [
    ['Lo de afuera menos lo de adentro',
      xpMira('dibujo', 'Una región sombreada se arma **restando** áreas conocidas.', { dib: cuacir, v: { cual: 0, rad: 0 }, alto: 200 }, [
        ['Lo sombreado no tiene fórmula propia, pero es un cuadrado al que le quitaron un círculo.', {}],
        ['El cuadrado mide 6 de lado: su área es 36.', {}, '$6^2 = 36$'],
        ['El círculo inscrito toca los cuatro lados: su radio es la mitad del lado.', { rad: 1 }, '$\\pi \\cdot 3^2 = 9\\pi$'],
        ['Sombreada: lo de afuera menos lo de adentro. La respuesta se deja en función de π.', {}, '$36 - 9\\pi$'],
        ['Al revés, con el cuadrado inscrito en el círculo, sus diagonales son diámetros.', { cual: 1 }],
        ['Ese cuadrado es un rombo de diagonales 6 y 6: vale 18. Sombreada: círculo menos cuadrado.', {}, '$9\\pi - 18$'],
      ], 'Sombreada = lo de afuera menos lo de adentro, y se deja en función de $\\pi$.'),
      xpHaz('fichas', 'Un cuadrado de lado 2 tiene su círculo inscrito. Pon el área del círculo y la de la región sombreada, cuadrado menos círculo.', { slots: fila('círculo', 'sombreada'), fichas: ['π', '4 − π', '4π', '4 − 4π', '2π'], meta: ['π', '4 − π'], alto: 96, pista: 'El radio del círculo inscrito es medio lado.' }, 'Radio 1: el círculo vale $\\pi$ y lo sombreado, $4 - \\pi$.')],
    ['Cuartos de círculo',
      xpMira('dibujo', 'Con **cuartos de círculo** aparecen segmentos y pétalos.', { dib: cuartos, v: { tri: 0, seg: 0, dos: 0 }, alto: 200 }, [
        ['En un cuadrado de lado 2 trazamos un cuarto de círculo con centro en una esquina.', {}, '$\\tfrac14 \\cdot \\pi \\cdot 2^2 = \\pi$'],
        ['La diagonal separa un triángulo que vale la mitad del cuadrado.', { tri: 1 }, '$\\tfrac{2 \\cdot 2}{2} = 2$'],
        ['Entre el arco y la cuerda queda un segmento circular: sector menos triángulo.', { seg: 1 }, '$\\pi - 2$'],
        ['Con otro cuarto de círculo desde la esquina opuesta aparece un pétalo.', { dos: 1 }],
        ['El pétalo es simétrico respecto a la diagonal: son dos segmentos iguales.', {}, '$2(\\pi - 2) = 2\\pi - 4$'],
      ], 'Segmento = cuarto de círculo menos triángulo. Pétalo = dos segmentos.'),
      xpHaz('fichas', 'En un cuadrado de lado 10 se traza un cuarto de círculo de radio 10. Pon el cuarto de círculo, el triángulo y el segmento.', { slots: fila('cuarto', 'triángulo', 'segmento'), fichas: ['25π', '50', '25π − 50', '100π', '100', '50 − 25π'], meta: ['25π', '50', '25π − 50'], alto: 96, pista: 'El segmento es lo que queda entre el arco y la cuerda.' }, '$\\tfrac14 \\cdot 100\\pi = 25\\pi$, medio cuadrado es 50 y el segmento, $25\\pi - 50$.')],
    ['Mover piezas y coronas',
      xpMira('dibujo', 'A veces lo más corto es **mover una pieza**.', { dib: mover, v: { cual: 0, mv: 0 }, alto: 200 }, [
        ['A este rectángulo de 8 por 4 le falta medio círculo a un lado y le sobra uno igual al otro.', {}],
        ['Las dos piezas son congruentes: trasladamos la que sobra hasta el hueco.', { mv: 1 }],
        ['Queda el rectángulo completo. No hizo falta usar π.', {}, '$8 \\cdot 4 = 32$'],
        ['Una corona es lo que queda entre dos círculos con el mismo centro.', { cual: 1 }],
        ['Se restan las áreas, no los radios: con radios 5 y 3 queda 16π.', {}, '$25\\pi - 9\\pi = 16\\pi$'],
      ], 'Una pieza que sobra puede llenar un hueco congruente. En la corona se restan las áreas.'),
      xpHaz('dibujo', 'El círculo grande tiene radio 5. Ajusta el radio del hueco hasta que la corona mida $21\\pi$.', { dib: anillo, v: { r: 4 }, metas: { r: 2 }, alto: 204,
        manijas: [{ k: 'r', min: 1, max: 4, paso: 1, en: v => [170 + v.r * 16, 104], de: x => (x - 170) / 16 }],
        lee: v => `$25\\pi - ${v.r * v.r}\\pi = ${25 - v.r * v.r}\\pi$`, dice: v => `Hueco de radio ${v.r}: le quita ${v.r * v.r}π al círculo de 25π.` }, '$25\\pi - 21\\pi = 4\\pi$: el hueco tiene radio 2.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una ventana es un rectángulo de 4 m por 3 m con medio círculo encima, apoyado en el lado de 4 m. Pon cada área, en m².', { slots: fila('rectángulo', 'medio círculo', 'vidrio total'), fichas: ['12', '2π', '12 + 2π', '4π', '12 + 4π', '8π'], meta: ['12', '2π', '12 + 2π'], alto: 96, pista: 'El diámetro del medio círculo es el lado de 4 m.' }, 'Rectángulo: 12. Medio círculo de radio 2: $\\tfrac12 \\cdot 4\\pi = 2\\pi$. Total: $12 + 2\\pi$ m².')],
  ], 'Sumar, restar y mover piezas: lo de afuera menos lo de adentro, con la respuesta en función de $\\pi$.');
}
