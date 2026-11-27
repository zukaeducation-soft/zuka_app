// Geometría Euclidiana · mundo 3 «euc-triangulo»: explicaciones Explora (spec 2026-11-26-curso-euclidiana). Escenas «dibujo» y «fichas».
// Los ejemplos no son los de los ejercicios. Aquí aún no se usa la suma de los ángulos de un triángulo.
{
  const rad = g => g * Math.PI / 180, R = Math.round, r1 = x => Math.round(x * 10) / 10;
  const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const mid = (P, Q, t = 0.5) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const cen = T => [(T[0][0] + T[1][0] + T[2][0]) / 3, (T[0][1] + T[1][1] + T[2][1]) / 3];
  const fuera = (P, G, d) => { const L = dist(P, G) || 1; return [P[0] + (P[0] - G[0]) / L * d, P[1] + (P[1] - G[1]) / L * d]; };
  const rot = (K, P, G, t, cls = 's', d = 11) => { const [x, y] = fuera(P, G, d); return K.t(x, y + 4, t, cls); };
  const ray = (K, P, Q, n = 1, cls = '') => {
    const L = dist(P, Q) || 1, ux = (Q[0] - P[0]) / L, uy = (Q[1] - P[1]) / L, M = mid(P, Q); let h = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 4, x = M[0] + ux * o, y = M[1] + uy * o; h += K.l(x - uy * 5, y + ux * 5, x + uy * 5, y - ux * 5, cls); }
    return h;
  };
  const esc = (K, V, P, Q, s = 8) => { const a = dist(V, P) || 1, b = dist(V, Q) || 1, u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s]; return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm'); };
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 0, w: 90, et: e }));
  const baja = (sl, y) => sl.map(s => ({ ...s, y }));

  // ============================================================================================ 1 · El triángulo y sus elementos
  // El vértice C se mueve: el triángulo cambia de nombre.
  const TA = [90, 175], TB = [250, 175];
  const nombres = v => {
    const C = [v.x, v.y], a = dist(TB, C), b = dist(C, TA), c = 160, ig = (p, q) => Math.abs(p - q) < 2, s = [a * a, b * b, c * c].sort((m, n) => m - n), r = s[2] - s[0] - s[1];
    return [ig(a, b) && ig(b, c) ? 'equilátero' : ig(a, b) || ig(b, c) || ig(a, c) ? 'isósceles' : 'escaleno', Math.abs(r) < 0.03 * s[2] ? 'rectángulo' : r > 0 ? 'obtusángulo' : 'acutángulo', [a, b, c]];
  };
  const tipo = (v, K) => {
    const C = [v.x, v.y], T = [TA, TB, C], [nl, na, l] = nombres(v), S = [[TB, C], [C, TA], [TA, TB]], ig = (p, q) => Math.abs(p - q) < 2;
    const rec = na === 'rectángulo' ? [0, 1, 2].reduce((m, k) => (l[k] > l[m] ? k : m), 0) : -1;
    return K.p(T, 'fa') + S.map(([P, Q], k) => (l.some((x, j) => j !== k && ig(x, l[k])) ? ray(K, P, Q, 1) : '')).join('') + (rec >= 0 ? esc(K, T[rec], S[rec][0], S[rec][1], 10) : '')
      + K.t(TA[0] - 6, 192, 'A', 's') + K.t(TB[0] + 6, 192, 'B', 's') + K.t(C[0], C[1] - 9, 'C', 's') + K.f(v.nom, K.t(170, 204, `${nl} y ${na}`, 'ta'));
  };
  // Un segmento desde A hasta el lado BC: según dónde caiga tiene nombre.
  const NA = [130, 30], NB = [50, 170], NC = [290, 170], BIS = 50 + 240 * dist(NA, NB) / (dist(NA, NB) + dist(NA, NC));
  const notable = (v, K) => {
    const P = [v.p, 170], q = Math.abs(v.p - 130) < 1.5 ? 'altura' : Math.abs(v.p - 170) < 1.5 ? 'mediana' : Math.abs(v.p - BIS) < 1.5 ? 'bisectriz' : '';
    return K.p([NA, NB, NC], 'fn') + (q === 'bisectriz' ? K.ang(NA, NB, P, 34, '', 'fa') + K.ang(NA, P, NC, 28, '', 'fa') : '') + K.l(...NA, ...P, 'la gr') + (q === 'altura' ? esc(K, P, NC, NA) : q === 'mediana' ? ray(K, NB, P, 2) + ray(K, P, NC, 2) : '')
      + K.t(130, 20, 'A', 's') + K.t(38, 176, 'B', 's') + K.t(302, 176, 'C', 's') + K.t(v.p, 188, 'P', 's ta') + (q ? K.t(330, 24, q, 'ta', 'end') : '')
      + K.f(v.med, K.l(170, 60, 170, 196, 'lg d') + esc(K, [170, 170], NC, [170, 60]) + K.t(178, 72, 'mediatriz', 's tg', 'start'));
  };
  // Opuesto y comprendido.
  const OA = [170, 34], OB = [70, 160], OC = [270, 160];
  const opu = (v, K) => {
    const q = R(v.k);
    return (q === 1 ? K.ang(OA, OB, OC, 26, '', 'fa') : q === 2 ? K.ang(OA, OB, OC, 26, '', 'fg') : q === 3 ? K.ang(OB, OC, OA, 24, '', 'ff') + K.ang(OC, OA, OB, 24, '', 'ff') : '') + K.p([OA, OB, OC], 'fn')
      + (q === 1 ? K.l(...OB, ...OC, 'la gr') : q === 2 ? K.l(...OA, ...OB, 'lg gr') + K.l(...OA, ...OC, 'lg gr') : q === 3 ? K.l(...OB, ...OC, 'lf gr') : '')
      + K.t(170, 24, 'A', 's') + K.t(58, 168, 'B', 's') + K.t(282, 168, 'C', 's') + K.t(170, 184, ['', 'BC es opuesto al ángulo A', 'A está comprendido entre AB y AC', 'BC está comprendido entre B y C'][q] || '', 's tm');
  };
  const pqr = K => { const P = [170, 14], Q = [96, 96], Rr = [244, 96]; return K.ang(P, Q, Rr, 16, '', 'fa') + K.ang(Q, Rr, P, 16, '', 'fg') + K.ang(Rr, P, Q, 16, '', 'ff') + K.p([P, Q, Rr], 'fn') + K.t(184, 18, 'P', 's') + K.t(84, 102, 'Q', 's') + K.t(256, 102, 'R', 's'); };
  // El parque: BC mide 18 m.
  const parque = (v, K) => {
    const A = [120, 34], F = [52 + v.m * 13, 170]; let h = K.p([A, [52, 170], [286, 170]], 'fo');
    for (let k = 0; k <= 18; k++) h += K.l(52 + k * 13, 170, 52 + k * 13, 175, 'lm');
    return h + K.l(...A, ...F, 'la gr') + K.t(120, 24, 'A', 's') + K.t(40, 176, 'B', 's') + K.t(298, 176, 'C', 's') + K.t(F[0], 192, 'F', 's ta');
  };

  xpLec('euc-triangulo-1', [
    ['Dos apellidos',
      xpMira('dibujo', 'Un triángulo se clasifica de **dos maneras**: por sus lados y por sus ángulos.', { dib: tipo, v: { x: 200, y: 70, nom: 0 }, alto: 212 }, [
        ['Un triángulo tiene tres vértices, tres lados y tres ángulos. Se nombra con sus vértices: triángulo ABC.', {}],
        ['Este tiene sus tres lados distintos: por sus lados es escaleno.', { nom: 1 }],
        ['Movemos C hasta que dos lados midan lo mismo. Las rayitas marcan lados congruentes: es isósceles.', { x: 170, y: 75 }],
        ['Con los tres lados congruentes es equilátero.', { y: 36.4 }],
        ['Por sus ángulos: con los tres agudos es acutángulo. Con uno recto, como ahora, es rectángulo.', { x: 90, y: 75 }],
        ['Y con un ángulo obtuso, más abierto que un recto, es obtusángulo.', { x: 50, y: 95 }],
      ], 'Por lados: escaleno, isósceles o equilátero. Por ángulos: acutángulo, rectángulo u obtusángulo.'),
      xpHaz('dibujo', 'Arrastra el vértice C hasta que el triángulo sea **rectángulo en B**.', { dib: tipo, v: { x: 150, y: 75, nom: 1 }, metas: { x: 250 }, alto: 212,
        manijas: [{ k: 'x', min: 50, max: 290, paso: 20, en: v => [v.x, 75], de: x => x }], dice: v => `Ahora es ${nombres(v)[0]} y ${nombres(v)[1]}.` }, 'El ángulo recto queda en B cuando C está justo encima de B.')],
    ['Altura, mediana y bisectriz',
      xpMira('dibujo', 'Desde un vértice salen tres segmentos con **nombre propio**.', { dib: notable, v: { p: 235, med: 0 }, alto: 204 }, [
        ['Desde A podemos trazar muchos segmentos hasta el lado opuesto. Tres de ellos tienen nombre propio.', {}],
        ['La altura cae a escuadra sobre el lado opuesto: forma con él un ángulo recto.', { p: 130 }],
        ['La mediana llega justo al punto medio del lado opuesto.', { p: 170 }],
        ['La bisectriz parte el ángulo del vértice en dos ángulos congruentes.', { p: BIS }],
        ['La mediatriz es otra cosa: la perpendicular por el punto medio de un lado. No tiene que pasar por A.', { p: 170, med: 1 }],
      ], 'Altura: perpendicular. Mediana: al punto medio. Bisectriz: parte el ángulo. Mediatriz: perpendicular por el medio.'),
      xpHaz('dibujo', 'Mueve el pie P hasta que AP sea la **altura** que sale de A.', { dib: notable, v: { p: 230, med: 0 }, metas: { p: 130 }, alto: 204,
        manijas: [{ k: 'p', min: 60, max: 280, paso: 10, en: v => [v.p, 170], de: x => x }], dice: v => `AP forma con el lado BC un ángulo de ${R(Math.atan2(140, 130 - v.p) * 180 / Math.PI)}°.` }, 'La altura es el segmento que cae a escuadra: forma 90° con el lado opuesto.')],
    ['Opuesto y comprendido',
      xpMira('dibujo', 'Dos palabras que usaremos todo el tiempo: **opuesto** y **comprendido**.', { dib: opu, v: { k: 0 }, alto: 196 }, [
        ['Dos palabras para ubicarse dentro de un triángulo: opuesto y comprendido.', {}],
        ['El lado opuesto a un ángulo es el que queda enfrente, sin tocarlo. Frente al ángulo A está BC.', { k: 1 }],
        ['Vale al revés: el ángulo opuesto al lado BC es A.', {}],
        ['El ángulo comprendido entre dos lados es el que ellos forman. Entre AB y AC está el ángulo A.', { k: 2 }],
        ['Y el lado comprendido entre dos ángulos es el que los une: entre B y C está el lado BC.', { k: 3 }],
      ], 'Opuesto: el que queda enfrente. Comprendido: el que queda entre los otros dos.'),
      xpHaz('fichas', 'En el triángulo PQR, pon el lado **opuesto** al ángulo R y el ángulo **comprendido** entre QP y QR.', { slots: baja(fila('opuesto a R', 'entre QP y QR'), 138), fichas: ['PQ', 'QR', 'PR', '∠Q', '∠P'], meta: ['PQ', '∠Q'], alto: 178, fondo: K => pqr(K), pista: 'El lado opuesto a R no toca a R. QP y QR se juntan en un vértice.' }, 'Frente a R está PQ; los lados QP y QR forman el ángulo Q.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque triangular tiene un sendero de A al lado BC, que mide 18 m. Mueve la fuente F para que el sendero AF sea la **mediana**.', { dib: parque, v: { m: 4 }, metas: { m: 9 }, alto: 204,
        manijas: [{ k: 'm', min: 1, max: 17, paso: 1, en: v => [52 + v.m * 13, 170], de: x => (x - 52) / 13 }], lee: v => `$BF = ${v.m},\\ FC = ${18 - v.m}$`, dice: v => `La fuente queda a ${v.m} m de B y a ${18 - v.m} m de C.` }, 'La mediana llega al punto medio: $18 \\div 2 = 9$ m de cada esquina.')],
  ], 'Un triángulo tiene dos nombres, tres segmentos notables por vértice, y lados y ángulos opuestos o comprendidos.');

  // ============================================================================================ 2 · Criterios L-A-L, A-L-A y L-L-L
  const T0 = [[-34, 18], [36, 18], [14, -34]];
  const pon = (cx, cy, g = 0) => { const c = Math.cos(rad(g)), s = Math.sin(rad(g)); return T0.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]); };
  const marcas = (K, T) => K.ang(T[0], T[1], T[2], 14, '', 'fa') + K.ang(T[1], T[2], T[0], 14, '', 'fg') + K.ang(T[2], T[0], T[1], 14, '', 'ff') + ray(K, T[0], T[1], 1) + ray(K, T[1], T[2], 2) + ray(K, T[2], T[0], 3);
  const letras = (K, T, n) => { const G = cen(T); return T.map((V, k) => rot(K, V, G, n[k], '', 14)).join(''); };
  const calca = (v, K) => {
    const T1 = pon(90, 100), T2 = pon(250, 100, v.rot);
    return K.f(v.mar, marcas(K, T1) + marcas(K, T2)) + K.p(T1, 'fn') + K.p(T2, 'fn') + letras(K, T1, 'ABC') + K.f(v.lab, letras(K, T2, 'DEF'));
  };
  const dosMarcados = K => { const T1 = pon(90, 62), T2 = pon(250, 62, 200); return marcas(K, T1) + marcas(K, T2) + K.p(T1, 'fn') + K.p(T2, 'fn') + letras(K, T1, 'ABC') + letras(K, T2, 'DEF'); };
  // Los tres criterios.
  const cri = (v, K) => {
    const q = R(v.m), O = [70, 165], Q = [230, 165], nom = K.f(v.t, K.t(330, 24, ['L-A-L', 'A-L-A', 'L-L-L'][q] || '', 'ta', 'end'));
    if (q === 0) { const T = K.at(...O, 110, v.g); return K.ang(O, Q, T, 30, `${R(v.g)}°`, 'fa', 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, 'gr') + ray(K, O, Q, 1) + ray(K, O, T, 2) + K.f(v.c, K.l(...Q, ...T, 'la d')) + K.c(...O, 5, 'fk') + nom; }
    const ta = Math.tan(rad(v.a)), tb = Math.tan(rad(v.b)), x = 160 * tb / (ta + tb), C = [O[0] + x, O[1] - x * ta];
    if (q === 1) return K.ang(O, Q, C, 28, '', 'fa') + K.ang(Q, C, O, 28, '', 'fg') + K.l(...O, ...Q, 'gr') + ray(K, O, Q, 1) + K.l(...O, ...mid(O, C, 1.15), 'la') + K.l(...Q, ...mid(Q, C, 1.15), 'lg') + K.c(...C, 4, 'fk') + nom;
    return K.p([O, Q, C], 'fn') + K.l(...O, ...Q, 'gr') + K.l(...Q, ...C, 'la gr') + K.l(...C, ...O, 'lg gr') + ray(K, O, Q, 1) + ray(K, Q, C, 2) + ray(K, C, O, 3) + nom;
  };
  const BO1 = [30, 165], BO2 = [190, 165];
  const dosB = (v, K) => {
    const uno = (O, g, vivo) => { const Q = [O[0] + 90, O[1]], T = K.at(...O, 60, g); return K.ang(O, Q, T, 22, `${R(g)}°`, vivo ? 'fg' : 'fa', vivo ? 's tg' : 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, vivo ? 'la gr' : 'gr') + K.l(...Q, ...T, vivo ? 'lm d' : '') + K.t(O[0] + 45, O[1] + 17, '9', 's') + rot(K, mid(O, T), Q, '6', 's', 10); };
    return uno(BO1, 50, false) + uno(BO2, v.g, true);
  };
  // Isósceles y el caso L-L-A.
  const isoS = (v, K) => {
    if (R(v.m) === 0) {
      const A = [170, 25], B = [90, 170], C = [250, 170], D = [170, 170];
      return K.f(v.t, K.p([A, B, D], 'fa') + K.p([A, D, C], 'fg')) + K.f(v.e, K.ang(B, C, A, 24, '', 'ff') + K.ang(C, A, B, 24, '', 'ff')) + K.p([A, B, C], 'fn') + ray(K, A, B) + ray(K, A, C)
        + K.f(v.b, K.l(...A, ...D, 'la gr') + K.ang(A, B, D, 34, '', 'fo') + K.ang(A, D, C, 28, '', 'fo') + K.t(170, 188, 'D', 's')) + K.t(170, 16, 'A', 's') + K.t(78, 176, 'B', 's') + K.t(262, 176, 'C', 's');
    }
    const A = [40, 170], B = [150, 70];
    return K.ang(A, [300, 170], B, 30, '', 'fa') + K.l(...A, 320, 170) + K.l(...A, ...B, 'gr') + ray(K, A, B) + K.l(...B, 225, 170, 'la gr') + K.f(v.s, K.arc(150, 70, 125, -53.13, -126.87, 'lm d') + K.l(...B, 75, 170, 'lf gr') + K.c(75, 170, 4, 'fF'))
      + K.c(225, 170, 4, 'fA') + K.t(28, 176, 'A', 's') + K.t(150, 60, 'B', 's') + K.f(v.s, K.t(236, 26, 'L-L-A: dos triángulos distintos', 's tm'));
  };
  const rod = (v, K) => {
    const A = [40, 170], B = [150, 70], C = [v.x, 170];
    return K.ang(A, [300, 170], B, 30, '', 'fa') + K.l(...A, 320, 170) + K.l(...A, ...B, 'gr') + K.l(...B, 225, 170, 'lm d') + K.l(...B, ...C, 'la gr') + K.t(28, 176, 'A', 's') + K.t(150, 60, 'B', 's') + K.t(v.x, 190, 'C', 's ta');
  };
  // El estanque: E corre por la recta BM, más allá de M.
  const EM = [170, 100], EA = [80, 50], EB = [80, 150], ED = [260, 150], EU = [(170 - 80) / dist(EM, EB), (100 - 150) / dist(EM, EB)], PASO = dist(EM, EB) / 10;
  const puntoE = v => [EM[0] + EU[0] * v.e * PASO, EM[1] + EU[1] * v.e * PASO];
  const estanque = (v, K) => {
    const E = puntoE(v);
    return K.c(80, 100, 30, 'fg') + K.l(...EA, ...ED) + K.l(...EB, ...E) + ray(K, EA, EM) + ray(K, EM, ED) + K.l(...EA, ...EB, 'lm d') + K.l(...ED, ...E, 'la d') + K.ang(EM, EA, EB, 16, '', 'fa') + K.ang(EM, ED, E, 16, '', 'fa')
      + K.t(68, 46, 'A', 's') + K.t(68, 164, 'B', 's') + K.t(272, 164, 'D', 's') + K.t(170, 122, 'M', 's') + K.t(E[0] + 12, E[1] + 2, 'E', 's ta');
  };

  xpLec('euc-triangulo-2', [
    ['Calcar y encajar',
      xpMira('dibujo', 'Dos triángulos son **congruentes** si uno encaja exactamente sobre el otro.', { dib: calca, v: { rot: 0, lab: 0, mar: 0 }, alto: 190 }, [
        ['Dos figuras son congruentes si al calcar una y moverla encaja exactamente sobre la otra.', {}],
        ['Giramos la copia. Sigue siendo congruente con el original: girar no cambia ninguna medida.', { rot: 140 }],
        ['Cada vértice tiene su pareja: A con D, B con E y C con F. Eso es una correspondencia.', { lab: 1 }],
        ['Las partes que se corresponden son congruentes: lado con lado y ángulo con ángulo.', { mar: 1 }],
        ['Por eso importa el orden al escribir: △ABC ≅ △DEF pone cada vértice frente a su pareja.', {}],
      ], 'En triángulos congruentes, las seis partes correspondientes son congruentes, y el orden de las letras dice cuáles.'),
      xpHaz('fichas', 'Los triángulos son congruentes y tienen las mismas marcas. Pon el ángulo que corresponde a C y el lado que corresponde a AC.', { slots: baja(fila('∠C ≅', 'AC ≅'), 152), fichas: ['∠F', '∠D', 'DF', 'DE', 'EF'], meta: ['∠F', 'DF'], alto: 192, fondo: K => dosMarcados(K), pista: 'Sigue el color del arco de C y las tres rayitas de AC.' }, 'C va con F y A con D: ∠C ≅ ∠F y AC ≅ DF.')],
    ['Tres datos bastan',
      xpMira('dibujo', 'No hay que comparar las seis partes: **tres bien escogidas** bastan.', { dib: cri, v: { m: 0, g: 50, c: 0, t: 0, a: 50, b: 65 }, alto: 190 }, [
        ['¿Hay que comprobar los seis pares de partes? No: con tres bien escogidos basta.', {}],
        ['Dos varillas y una bisagra con el ángulo fijo: el tercer lado solo puede ser uno.', { c: 1 }],
        ['Es L-A-L: dos lados y el ángulo comprendido entre ellos. Se acepta como postulado.', { t: 1 }],
        ['A-L-A: un lado y los dos ángulos pegados a él. Los dos rayos se cortan en un único punto.', { m: 1 }],
        ['L-L-L: los tres lados. Tres varillas arman un solo triángulo; por eso es tan rígido.', { m: 2 }],
      ], 'L-A-L, A-L-A y L-L-L: tres partes respectivamente congruentes que aseguran triángulos congruentes.'),
      xpHaz('dibujo', 'Los dos triángulos tienen lados de 6 y 9. Abre la bisagra de la derecha hasta que queden congruentes por L-A-L.', { dib: dosB, v: { g: 110 }, metas: { g: 50 }, alto: 196,
        manijas: [{ k: 'g', min: 20, max: 140, paso: 10, en: v => XPK.at(...BO2, 60, v.g), de: (x, y) => Math.atan2(BO2[1] - y, x - BO2[0]) * 180 / Math.PI }], dice: v => `La bisagra de la derecha está abierta ${v.g}°.` }, 'Mismos dos lados y mismo ángulo entre ellos, 50°: el tercer lado ya no puede cambiar.')],
    ['El isósceles y un intruso',
      xpMira('dibujo', 'Los criterios sirven para **demostrar**. Y hay uno falso: L-L-A.', { dib: isoS, v: { m: 0, b: 0, t: 0, e: 0, s: 0 }, alto: 204 }, [
        ['Un triángulo isósceles: AB y AC son congruentes. Trazamos la bisectriz AD del ángulo A.', { b: 1 }],
        ['Los dos triángulos que quedan son congruentes por L-A-L: un lado, el ángulo partido y AD, que es común.', { t: 1 }],
        ['Entonces los ángulos B y C, que se corresponden, son congruentes: los ángulos de la base.', { e: 1 }],
        ['Vale al revés: si dos ángulos de un triángulo son congruentes, sus lados opuestos también.', {}],
        ['Ojo con L-L-A: dos lados y un ángulo que no está entre ellos. La varilla puede caer en dos sitios.', { m: 1 }],
        ['Salen dos triángulos distintos con los mismos tres datos. L-L-A no es un criterio.', { s: 1 }],
      ], 'En un triángulo, a lados congruentes se oponen ángulos congruentes, y viceversa. L-L-A no asegura nada.'),
      xpHaz('dibujo', 'El lado AB y el ángulo A no cambian, y BC mide 12.5. Desliza C por el rayo hasta **otro** punto donde BC mida lo mismo.', { dib: rod, v: { x: 225 }, metas: { x: 75 }, alto: 200,
        manijas: [{ k: 'x', min: 60, max: 240, paso: 15, en: v => [v.x, 170], de: x => x }], dice: v => `BC mide ${r1(Math.hypot(v.x - 150, 100) / 10)}.` }, 'Mismo ángulo y mismos dos lados, pero otro triángulo: por eso L-L-A no es criterio.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Para medir un estanque AB, Lina va de A a M y sigue lo mismo hasta D. Desde B pasa por M: ubica E para que △AMB ≅ △DME por L-A-L.', { dib: estanque, v: { e: 4 }, metas: { e: 10 }, alto: 200,
        manijas: [{ k: 'e', min: 2, max: 14, paso: 1, en: v => puntoE(v), de: (x, y) => ((x - EM[0]) * EU[0] + (y - EM[1]) * EU[1]) / PASO }], dice: v => `ME mide ${v.e} pasos y BM mide 10 pasos.` }, 'Con ME = BM hay L-A-L (los ángulos en M son opuestos por el vértice), y DE mide lo mismo que AB.')],
  ], 'Congruentes: partes correspondientes congruentes. Bastan L-A-L, A-L-A o L-L-L; nunca L-L-A.');

  // ============================================================================================ 3 · Desigualdades en el triángulo
  const extT = (K, A, C, a, c, o = {}) => {
    const ta = Math.tan(rad(a)), tc = Math.tan(rad(c)), w = C[0] - A[0], x = w * tc / (ta + tc), B = [A[0] + x, A[1] - x * ta], D = [Math.min(326, C[0] + 100), C[1]];
    return K.ang(C, D, B, 26, o.ext ?? `${R(180 - c)}°`, 'fo', 's to') + K.ang(A, C, B, 24, o.a ?? `${R(a)}°`, 'fa', 's ta') + K.ang(B, A, C, 20, o.b ?? `${R(180 - a - c)}°`, 'fg', 's tg') + K.f(o.lej ?? 0, K.l(...A, ...B, 'la gr')) + K.p([A, B, C], 'fn') + K.l(...C, ...D, 'lm');
  };
  const ext = (v, K) => extT(K, [60, 170], [220, 170], v.a, v.c, { lej: v.lej });
  // A mayor lado, mayor ángulo.
  const LA = [60, 170], LB = [280, 170];
  const lam = (v, K) => {
    const C = [v.x, 60], T = [LA, LB, C], S = [[LB, C], [C, LA], [LA, LB]], l = S.map(([P, Q]) => dist(P, Q)), G = cen(T), may = l.indexOf(Math.max(...l)), men = l.indexOf(Math.min(...l));
    const g = k => { const [P, Q] = S[k], V = T[k]; return R(Math.acos(((P[0] - V[0]) * (Q[0] - V[0]) + (P[1] - V[1]) * (Q[1] - V[1])) / (dist(P, V) * dist(Q, V))) * 180 / Math.PI); };
    return K.f(v.hi, K.ang(T[may], ...S[may], 22, '', 'ff')) + K.f(v.lo, K.ang(T[men], ...S[men], 22, '', 'fg')) + K.p(T, 'fn') + K.f(v.hi, K.l(...S[may][0], ...S[may][1], 'lf gr')) + K.f(v.lo, K.l(...S[men][0], ...S[men][1], 'lg gr'))
      + S.map(([P, Q], k) => rot(K, mid(P, Q), G, R(l[k] / 20), 's', 12)).join('') + T.map((V, k) => rot(K, V, G, `${g(k)}°`, 's tm', 16)).join('');
  };
  const pqr2 = K => { const P = [80, 20], Q = [130, 100], Rr = [270, 100]; return K.p([P, Q, Rr], 'fn') + K.t(72, 16, 'P', 's') + K.t(122, 112, 'Q', 's') + K.t(282, 106, 'R', 's') + K.t(200, 116, '6', 's ta') + K.t(186, 52, '9', 's ta') + K.t(94, 68, '4', 's ta'); };
  // Varillas sobre una base de 10, y la bisagra.
  const vara = (v, K) => {
    if (R(v.m) === 1) { const O = [90, 160], Q = [250, 160], T = K.at(...O, 120, v.g); return K.ang(O, Q, T, 28, `${R(v.g)}°`, 'fa', 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, 'gr') + K.l(...Q, ...T, 'lf gr') + K.t(170, 178, '8', 's') + rot(K, mid(O, T), Q, '6', 's', 10) + rot(K, mid(Q, T), O, r1(dist(Q, T) / 20), 's tf', 12); }
    const X0 = 70, X1 = 270, Y = 150, a = v.a, b = v.b, cierra = a + b > 10.001 && Math.abs(a - b) < 9.999;
    let P, Q;
    if (cierra) { const x = (a * a - b * b + 100) / 20, y = Math.sqrt(Math.max(0, a * a - x * x)); P = Q = [X0 + x * 20, Y - y * 20]; } else { const s = a + b > 9.999 ? 0 : 12; P = K.at(X0, Y, a * 20, s); Q = K.at(X1, Y, b * 20, 180 - s); }
    return K.l(X0, Y, X1, Y, 'gr') + K.l(X0, Y, ...P, cierra ? 'la gr' : 'lf gr') + K.l(X1, Y, ...Q, cierra ? 'lg gr' : 'lf gr') + K.t(170, 168, '10', 's') + K.t(X0 - 14, Y - 8, R(a), 's ta') + K.t(X1 + 14, Y - 8, R(b), 's tg');
  };
  const pueblos = (v, K) => {
    const u = 16, A = [30, 150], C = [30 + v.n * u, 150], n = v.n, cierra = n > 5 && n < 17;
    const x = (121 - 36 + n * n) / (2 * n), B = cierra ? [30 + x * u, 150 - Math.sqrt(Math.max(0, 121 - x * x)) * u] : null;
    return K.l(...A, ...C, 'gr') + (B ? K.l(...A, ...B, 'la gr') + K.l(...B, ...C, 'lg gr') + K.t(B[0], B[1] - 9, 'B', 's') : K.l(...A, 30 + 11 * u, 150 - 10, 'lf gr') + K.l(...C, C[0] - 6 * u * (n >= 17 ? 1 : -1), 150 - 10, 'lf gr')) + K.t(22, 168, 'A', 's') + K.t(C[0], 168, 'C', 's ta');
  };

  xpLec('euc-triangulo-3', [
    ['El ángulo exterior',
      xpMira('dibujo', 'Primera desigualdad: el **ángulo exterior** les gana a los dos interiores lejanos.', { dib: ext, v: { a: 50, c: 60, lej: 0 }, alto: 200 }, [
        ['Si alargamos un lado del triángulo, aparece por fuera un ángulo exterior.', {}],
        ['Tiene un vecino pegado, el interior adyacente, y dos interiores lejanos: los no adyacentes.', { lej: 1 }],
        ['El exterior es mayor que cada uno de los dos lejanos: aquí 120° le gana a 50° y a 70°.', {}, '$120^\\circ > 70^\\circ > 50^\\circ$'],
        ['Si cambiamos el triángulo cambian las medidas, pero el exterior sigue ganando.', { a: 30, c: 40 }, '$140^\\circ > 110^\\circ > 30^\\circ$'],
        ['Por eso un triángulo no puede tener dos ángulos rectos, ni dos obtusos.', {}],
      ], 'Un ángulo exterior de un triángulo es mayor que cada uno de los interiores no adyacentes.'),
      xpHaz('fichas', 'El ángulo exterior mide 125°. Reparte las medidas: ¿cuáles podría tener el ángulo A, que no lo toca, y cuáles no?', { slots: [{ x: 90, y: 152, w: 150, h: 46, n: 2, et: 'A puede medir' }, { x: 250, y: 152, w: 150, h: 46, n: 2, et: 'A no puede medir' }], fichas: ['50°', '125°', '85°', '140°'], meta: [['50°', '85°'], ['125°', '140°']], alto: 196,
        fondo: K => extT(K, [70, 112], [200, 112], 45, 55, { a: '?', b: '' }), pista: 'Un interior no adyacente siempre es menor que el exterior.' }, 'A debe medir menos que el exterior: 50° y 85° pueden; 125° y 140°, no.')],
    ['A mayor lado, mayor ángulo',
      xpMira('dibujo', 'Segunda: en un triángulo, lados y ángulos **se ordenan igual**.', { dib: lam, v: { x: 120, hi: 0, lo: 0 }, alto: 200 }, [
        ['En este triángulo los tres lados son distintos. ¿Cómo quedan sus ángulos?', {}],
        ['El lado más largo tiene enfrente el ángulo más abierto.', { hi: 1 }],
        ['Y el lado más corto tiene enfrente el ángulo más cerrado.', { lo: 1 }],
        ['Si movemos el vértice cambian las medidas, pero la regla se mantiene.', { x: 230 }],
        ['Sirve en los dos sentidos. En un triángulo rectángulo, el lado mayor es la hipotenusa.', { x: 60 }],
      ], 'A mayor lado se opone mayor ángulo, y a mayor ángulo se opone mayor lado.'),
      xpHaz('fichas', 'En el triángulo PQR los lados miden 4, 6 y 9. Pon el ángulo **mayor** y el ángulo **menor**.', { slots: baja(fila('ángulo mayor', 'ángulo menor'), 158), fichas: ['∠P', '∠Q', '∠R'], meta: ['∠Q', '∠R'], alto: 198, fondo: K => pqr2(K), pista: 'Cada ángulo mira al lado que no lo toca.' }, 'Frente al lado de 9 (PR) está Q, el mayor; frente al de 4 (PQ) está R, el menor.')],
    ['¿Cierra? Y la bisagra',
      xpMira('dibujo', 'Tercera: tres segmentos **no siempre** cierran un triángulo.', { dib: vara, v: { m: 0, a: 7, b: 6, g: 40 }, alto: 200 }, [
        ['La base mide 10 y las varillas 7 y 6. ¿Alcanzan a tocarse?', {}],
        ['Juntas suman 13, más que 10: se tocan y cierran el triángulo.', {}, '$7 + 6 > 10$'],
        ['Con 4 y 5 suman 9: no llegan. No hay triángulo.', { a: 4, b: 5 }, '$4 + 5 < 10$'],
        ['Con 4 y 6 suman justo 10: quedan acostadas sobre la base. Tampoco hay triángulo.', { b: 6 }, '$4 + 6 = 10$'],
        ['La regla: cada lado debe ser menor que la suma de los otros dos.', { a: 7 }],
        ['Otra idea: dos varillas fijas, de 8 y 6, unidas por una bisagra abierta 40°.', { m: 1 }],
        ['Al abrirla más, el lado de enfrente crece. A mayor ángulo, mayor lado opuesto: es el teorema de la bisagra.', { g: 110 }],
      ], 'Cada lado es menor que la suma de los otros dos; y con dos lados fijos, a mayor ángulo, mayor tercer lado.'),
      xpHaz('dibujo', 'La base mide 10 y la varilla derecha 5. Con la izquierda en 3 no cierra: alárgala hasta el **menor** entero con el que sí cierra.', { dib: vara, v: { m: 0, a: 3, b: 5, g: 40 }, metas: { a: 6 }, alto: 232,
        manijas: [{ k: 'a', min: 1, max: 12, paso: 1, et: 'varilla izquierda' }], lee: v => `$${v.a} + 5 = ${v.a + 5}$`, dice: v => (v.a + 5 > 10 ? `${v.a} + 5 pasa de 10: cierra.` : v.a + 5 === 10 ? 'Suman justo 10: quedan acostadas.' : `${v.a} + 5 no llega a 10: no cierra.`) }, 'Con 5 apenas igualan a la base; con 6 ya la pasan: $6 + 5 > 10$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'De A a B hay 11 km en línea recta y de B a C, 6 km. Los tres pueblos no están en línea. Pon la **mayor** distancia entera posible de A a C.', { dib: pueblos, v: { n: 8 }, metas: { n: 16 }, alto: 232,
        manijas: [{ k: 'n', min: 1, max: 18, paso: 1, et: 'km de A a C' }], dice: v => (v.n > 5 && v.n < 17 ? `Con ${v.n} km el triángulo cierra.` : `Con ${v.n} km no hay triángulo.`) }, 'Debe ser menor que $11 + 6 = 17$: el mayor entero es 16.')],
  ], 'El exterior gana a los interiores lejanos; lados y ángulos se ordenan igual; cada lado es menor que la suma de los otros.');

  // ============================================================================================ 4 · L-A-A y triángulos rectángulos
  const VT = r => (r ? [[-24, -20], [26, 18], [-24, 18]] : [[-28, 20], [28, 20], [10, -22]]);
  const uno = (K, cx, cy, c, s, m) => {
    const V = VT(c.r).map(([x, y]) => [cx + m * x * s, cy + y * s]), S = [[V[1], V[2]], [V[2], V[0]], [V[0], V[1]]];
    return (c.a || []).map((j, k) => K.ang(V[j], V[(j + 1) % 3], V[(j + 2) % 3], 12 * s, '', ['fa', 'fg', 'ff'][k])).join('') + (c.r ? esc(K, V[2], V[0], V[1], 7 * s) : '') + K.p(V, 'fn') + (c.l || []).map((i, k) => K.l(...S[i][0], ...S[i][1], 'gr') + ray(K, S[i][0], S[i][1], k + 1, 'gr')).join('');
  };
  const LAA = [[{ l: [2], a: [0, 1] }, { l: [2], a: [0, 1] }, 1.5], [{ l: [0], a: [0, 1] }, { l: [0], a: [0, 1] }, 1.5], [{ l: [0], a: [0, 1] }, { l: [1], a: [0, 1] }, 1.5], [{ a: [0, 1, 2] }, { a: [0, 1, 2] }, 0.9]];
  const laa = (v, K) => { const q = R(v.m), [c1, c2, s2] = LAA[q] || LAA[0]; return uno(K, 96, 104, c1, 1.5, -1) + uno(K, 244, 104, c2, s2, 1) + K.t(170, 28, ['A-L-A', 'L-A-A', 'no vale: el lado no corresponde', 'A-A-A no es criterio'][q] || '', 'ta'); };
  const dosPares = K => uno(K, 52, 58, { l: [1], a: [0, 1] }, 0.95, -1) + uno(K, 124, 58, { l: [1], a: [0, 1] }, 0.95, 1) + uno(K, 222, 58, { a: [0, 1, 2] }, 1.05, -1) + uno(K, 294, 62, { a: [0, 1, 2] }, 0.7, 1) + K.l(170, 14, 170, 104, 'ls');
  const REC = [{ r: 1 }, { r: 1, l: [0, 1] }, { r: 1, l: [0], a: [1] }, { r: 1, l: [2], a: [0] }, { r: 1, l: [2, 0] }];
  const rect = (v, K) => { const q = R(v.m), c = REC[q] || REC[0]; return uno(K, 96, 108, c, 1.8, -1) + uno(K, 244, 108, c, 1.8, 1) + K.t(170, 28, ['', 'cateto y cateto', 'cateto y ángulo agudo', 'hipotenusa y ángulo agudo', 'hipotenusa y cateto'][q] || '', 'ta'); };
  const escaleras = (v, K) => {
    const u = 11, una = (x0, d, vivo) => { const F = [x0 + d * u, 170], T = [x0, 170 - Math.sqrt(Math.max(0, 169 - d * d)) * u]; return K.l(x0, 20, x0, 170) + K.l(x0, 170, x0 + 105, 170) + esc(K, [x0, 170], F, T) + K.l(...F, ...T, vivo ? 'la gr' : 'lg gr') + rot(K, mid(F, T), [x0, 170], '13', 's', 12) + K.t(x0 + d * u / 2, 187, r1(d), vivo ? 's ta' : 's tg'); };
    return una(60, 5, false) + una(220, v.d, true);
  };
  // Equidistar: la mediatriz y la bisectriz.
  const equi = (v, K) => {
    if (R(v.m) === 0) {
      const A = [70, 160], B = [270, 160], M = [170, 160], P = [170, 160 - v.h], d = R(dist(P, A) / 10);
      return K.f(v.t, K.p([P, M, A], 'fa') + K.p([P, M, B], 'fg')) + K.l(...A, ...B, 'gr') + K.l(170, 20, 170, 190, 'lm d') + esc(K, M, B, P) + ray(K, A, M) + ray(K, M, B) + K.l(...P, ...A, 'la') + K.l(...P, ...B, 'la') + K.c(...P, 4, 'fk')
        + K.t(58, 166, 'A', 's') + K.t(282, 166, 'B', 's') + K.t(182, 178, 'M', 's') + K.t(184, P[1] - 4, 'P', 's') + K.t(104, 152 - v.h / 2, d, 's ta') + K.t(236, 152 - v.h / 2, d, 's ta');
    }
    const O = [40, 176], P = K.at(...O, 110 + v.h, 30), M = [P[0], 176], N = K.at(...O, (110 + v.h) * Math.cos(rad(30)), 60), d = R((110 + v.h) / 20);
    return K.f(v.t, K.p([O, M, P], 'fa') + K.p([O, P, N], 'fg')) + K.l(...O, 320, 176) + K.l(...O, ...K.at(...O, 180, 60)) + K.l(...O, ...K.at(...O, 290, 30), 'lm d') + K.l(...P, ...M, 'la') + K.l(...P, ...N, 'la') + esc(K, M, O, P) + esc(K, N, O, P) + K.c(...P, 4, 'fk')
      + K.t(28, 182, 'O', 's') + K.t(P[0] + 12, P[1] - 4, 'P', 's') + K.t(P[0] + 12, (P[1] + 176) / 2 + 4, d, 's ta') + rot(K, mid(P, N), M, d, 's ta', 12);
  };
  const GO = [36, 184];
  const giraR = (v, K) => {
    const P = K.at(...GO, 130, v.t), M = [P[0], 184], N = K.at(...GO, 130 * Math.cos(rad(80 - v.t)), 80);
    return K.ang(GO, [300, 184], P, 40, `${R(v.t)}°`, 'fa', 's ta') + K.ang(GO, P, N, 30, `${R(80 - v.t)}°`, 'fg', 's tg') + K.l(...GO, 316, 184) + K.l(...GO, ...K.at(...GO, 170, 80)) + K.l(...GO, ...P, 'la gr') + K.l(...P, ...M, 'lf d') + K.l(...P, ...N, 'lf d') + esc(K, M, GO, P, 7) + esc(K, N, GO, P, 7) + K.t(P[0] + 12, P[1] - 2, 'P', 's');
  };
  const dG = v => [13 * Math.sin(rad(v.t)), 13 * Math.sin(rad(80 - v.t))].map(r1);
  const CA = [80, 165], CB = [240, 125];
  const parada = (v, K) => { const P = [v.x, 45]; return K.l(10, 45, 330, 45, 'gr') + K.l(...P, ...CA, 'la d') + K.l(...P, ...CB, 'lg d') + K.r(70, 155, 20, 20, 'fa') + K.r(230, 115, 20, 20, 'fg') + K.t(80, 192, 'A', 's') + K.t(240, 152, 'B', 's') + K.t(v.x, 34, 'P', 's ta'); };

  xpLec('euc-triangulo-4', [
    ['Un criterio más: L-A-A',
      xpMira('dibujo', 'Hay un cuarto criterio: **L-A-A**, lado, ángulo, ángulo.', { dib: laa, v: { m: 0 }, alto: 190 }, [
        ['Ya conocemos A-L-A: un lado y los dos ángulos pegados a él.', {}],
        ['¿Y si el lado marcado no está entre los dos ángulos? Eso es L-A-A: lado, ángulo y ángulo.', { m: 1 }],
        ['También asegura congruencia: dos ángulos y un lado opuesto a uno de ellos.', {}],
        ['Cuidado: el lado debe ser opuesto al mismo ángulo en los dos triángulos. Aquí no corresponde.', { m: 2 }],
        ['Y solo ángulos no basta: con A-A-A un triángulo puede ser la ampliación del otro.', { m: 3 }],
      ], 'L-A-A: dos ángulos y un lado opuesto a uno de ellos, en el mismo orden. A-A-A no es criterio.'),
      xpHaz('fichas', 'En cada par solo se sabe lo marcado. Pon el criterio que asegura la congruencia, o «ninguno».', { slots: [{ x: 88, y: 146, w: 92, et: 'par 1' }, { x: 258, y: 146, w: 92, et: 'par 2' }], fichas: ['L-A-A', 'A-L-A', 'ninguno', 'L-L-L'], meta: ['L-A-A', 'ninguno'], alto: 186, fondo: K => dosPares(K), pista: 'Mira si el lado marcado une los dos ángulos, y si hay algún lado.' }, 'Par 1: el lado queda fuera de los dos ángulos, L-A-A. Par 2: solo ángulos, ninguno.')],
    ['Con ángulo recto',
      xpMira('dibujo', 'Dos triángulos **rectángulos** ya comparten un dato: el ángulo recto.', { dib: rect, v: { m: 0 }, alto: 190 }, [
        ['Dos triángulos rectángulos ya tienen algo congruente: el ángulo recto. Solo faltan dos datos.', {}],
        ['Cateto y cateto: es L-A-L, con el ángulo recto en medio.', { m: 1 }],
        ['Cateto y un ángulo agudo: sale de A-L-A o de L-A-A.', { m: 2 }],
        ['Hipotenusa y un ángulo agudo: es L-A-A.', { m: 3 }],
        ['Hipotenusa y cateto: parece L-L-A, pero con ángulo recto sí funciona. Es el criterio H-C.', { m: 4 }],
      ], 'Triángulos rectángulos: cateto-cateto, cateto-ángulo, hipotenusa-ángulo e hipotenusa-cateto.'),
      xpHaz('dibujo', 'Las dos escaleras miden 13. La de la izquierda tiene el pie a 5 de la pared. Mueve el pie de la otra hasta que los triángulos sean congruentes por H-C.', { dib: escaleras, v: { d: 9 }, metas: { d: 5 }, alto: 200,
        manijas: [{ k: 'd', min: 2, max: 9, paso: 1, en: v => [220 + v.d * 11, 170], de: x => (x - 220) / 11 }], dice: v => `Hipotenusa 13 y cateto del piso ${v.d}.` }, 'Misma hipotenusa y mismo cateto: por H-C, las dos escaleras llegan a la misma altura.')],
    ['Equidistar',
      xpMira('dibujo', 'Dos consecuencias: la **mediatriz** y la **bisectriz** reparten distancias iguales.', { dib: equi, v: { m: 0, h: 90, t: 0 }, alto: 200 }, [
        ['La mediatriz de AB es la perpendicular por su punto medio M. Tomemos un punto P en ella.', {}],
        ['Los triángulos PMA y PMB son congruentes por cateto-cateto: PM es común y AM mide lo mismo que MB.', { t: 1 }],
        ['Entonces PA y PB miden lo mismo. Pasa con cualquier punto de la mediatriz.', { h: 40, t: 0 }],
        ['Ahora un ángulo y su bisectriz. Desde un punto P bajamos perpendiculares a los dos lados.', { m: 1, h: 90 }],
        ['Los dos triángulos son congruentes por hipotenusa-ángulo: P queda a igual distancia de los dos lados.', { t: 1 }],
      ], 'Todo punto de la mediatriz equidista de los extremos; todo punto de la bisectriz equidista de los lados.'),
      xpHaz('dibujo', 'El ángulo mide 80°. Gira el rayo hasta que P quede a la **misma distancia** de los dos lados.', { dib: giraR, v: { t: 15 }, metas: { t: 40 }, alto: 204,
        manijas: [{ k: 't', min: 10, max: 70, paso: 5, en: v => XPK.at(...GO, 130, v.t), de: (x, y) => Math.atan2(GO[1] - y, x - GO[0]) * 180 / Math.PI }], lee: v => `$${v.t}^\\circ + ${80 - v.t}^\\circ = 80^\\circ$`, dice: v => `P está a ${dG(v)[0]} de un lado y a ${dG(v)[1]} del otro.` }, 'P equidista de los lados cuando el rayo es la bisectriz: 40° a cada lado.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos casas, A y B, quedan al mismo lado de una carretera recta. Mueve la parada P por la carretera hasta que quede a igual distancia de las dos.', { dib: parada, v: { x: 230 }, metas: { x: 135 }, alto: 200,
        manijas: [{ k: 'x', min: 40, max: 300, paso: 5, en: v => [v.x, 45], de: x => x }], dice: v => `A la casa A hay ${r1(dist([v.x, 45], CA) / 10)} y a la casa B hay ${r1(dist([v.x, 45], CB) / 10)}.` }, 'La parada va donde la mediatriz del segmento AB corta la carretera: allí PA = PB.')],
  ], 'L-A-A y los criterios de triángulos rectángulos; mediatriz y bisectriz: puntos que equidistan.');
}
