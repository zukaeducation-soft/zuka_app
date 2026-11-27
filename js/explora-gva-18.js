// Geometría Vectorial · explicación de geo-18 «Producto vectorial y geometría analítica» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const cr = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const su = (a, b) => a.map((x, i) => x - b[i]);
  const ad = (a, b) => a.map((x, i) => x + b[i]);
  const mu = (k, a) => a.map(x => k * x);
  const no = a => Math.hypot(...a);
  const sg = n => String(Math.round(n * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  // Perspectiva: x hacia el frente, y a la derecha, z hacia arriba.
  const vista = (o, U) => q => [o[0] + U * q[1] - 0.5 * U * q[0], o[1] + 0.45 * U * q[0] - U * q[2]];
  const ln = (K, A, B, cls) => K.l(A[0], A[1], B[0], B[1], cls);
  const fl = (K, A, B, cls) => K.ar(A[0], A[1], B[0], B[1], cls);
  const pt = (K, A, s, cls = 'fk', lado = 1) => K.c(A[0], A[1], 4, cls) + (s ? K.t(A[0] + 8 * lado, A[1] + 4, s, 's', lado > 0 ? 'start' : 'end') : '');
  const ejes = (K, S, L) => {
    const O = S([0, 0, 0]), X = S([L, 0, 0]), Y = S([0, L, 0]), Z = S([0, 0, L]);
    return fl(K, O, X, 'lm') + fl(K, O, Y, 'lm') + fl(K, O, Z, 'lm') + K.t(X[0] - 7, X[1] + 4, 'x', 's tm', 'end') + K.t(Y[0] + 7, Y[1] + 4, 'y', 's tm', 'start') + K.t(Z[0] + 7, Z[1] + 4, 'z', 's tm', 'start');
  };

  // Capítulo 1: el triángulo A(2, 0, 0), B(0, 2, 0), C(0, 0, 1): área y plano.  v { k }
  const S1 = vista([150, 140], 34), A1 = [2, 0, 0], B1 = [0, 2, 0], C1 = [0, 0, 1], N1 = cr(su(B1, A1), su(C1, A1));
  const triangulo = (v, K) => {
    const q = k(v), A = S1(A1), B = S1(B1), C = S1(C1), D = S1(ad(B1, su(C1, A1)));
    let h = ejes(K, S1, 3) + K.p([A, B, C], 'fa') + pt(K, A, 'A', 'fk', -1) + pt(K, B, 'B') + pt(K, C, 'C', 'fk', -1);
    if (q >= 1) h += fl(K, A, B, 'lf gr') + fl(K, A, C, 'lf gr');
    if (q >= 2) h += ln(K, B, D, 'lm d') + ln(K, C, D, 'lm d');
    if (q >= 3) { const G = mu(1 / 3, ad(ad(A1, B1), C1)), E = S1(ad(G, mu(1.6 / no(N1), N1))); h += fl(K, S1(G), E, 'la gr') + K.t(E[0] + 6, E[1], 'n', 's ta', 'start'); }
    return h + K.t(170, 16, ['un triángulo en el espacio: A, B y C', 'dos lados desde A: AB y AC', 'AB y AC arman un paralelogramo', 'AB × AC = (2, 2, 4): perpendicular a los dos', 'área = ½ · √24 = √6 ≈ 2.45', 'plano: x + y + 2z = 2'][Math.min(q, 5)], 's ta');
  };
  // Capítulo 1, tu turno: A(1, 0, 0), B(0, 2, 1), C(0, 0, 2); n = (4, 1, c).  v { c }
  const S1b = vista([110, 150], 30), A2 = [1, 0, 0], B2 = [0, 2, 1], C2 = [0, 0, 2];
  const normalC = (v, K) => {
    const A = S1b(A2), B = S1b(B2), C = S1b(C2), w = [4, 1, v.c], G = mu(1 / 3, ad(ad(A2, B2), C2)), E = S1b(ad(G, mu(1.8 / no(w), w)));
    return ejes(K, S1b, 3) + K.p([A, B, C], 'fa') + pt(K, A, 'A', 'fk', -1) + pt(K, B, 'B') + pt(K, C, 'C', 'fk', -1) + fl(K, S1b(G), E, 'la gr')
      + K.t(240, 40, 'AB = (−1, 2, 1)', 's', 'start') + K.t(240, 58, 'AC = (−1, 0, 2)', 's', 'start') + K.t(240, 82, `n = (4, 1, ${sg(v.c)})`, 's ta', 'start');
  };

  // Capítulo 2: el plano X = P + s·u + t·v y el corte de dos planos.  v { k }
  const S2 = vista([110, 150], 30), P2 = [0, 0, 2], U2 = [1, 0, 1], V2 = [0, 1, 0], X2 = (s, t) => ad(ad(P2, mu(s, U2)), mu(t, V2));
  const parametrica = (v, K) => {
    const q = k(v);
    if (q >= 4) {   // el piso z = 0 y la pared x + y = 4: se cortan en una recta
      const S = vista([150, 140], 26);
      let h = K.p([S([0, 0, 0]), S([4, 0, 0]), S([4, 6, 0]), S([0, 6, 0])], 'fn') + K.p([S([4, 0, 0]), S([0, 4, 0]), S([0, 4, 4]), S([4, 0, 4])], 'fa') + ejes(K, S, 5);
      if (q >= 5) h += ln(K, S([5, -1, 0]), S([-1, 5, 0]), 'lo gr') + fl(K, S([3, 1, 0]), S([2, 2, 0]), 'lo gr');
      return h + K.t(170, 16, q === 4 ? 'piso: z = 0; pared: x + y = 4' : 'n₁ × n₂ = (0, 0, 1) × (1, 1, 0) = (−1, 1, 0)', 's ta');
    }
    let h = ejes(K, S2, 4) + K.p([S2(X2(0, 0)), S2(X2(3, 0)), S2(X2(3, 4)), S2(X2(0, 4))], 'fa');
    for (let s = 0; s <= 3; s++) h += ln(K, S2(X2(s, 0)), S2(X2(s, 4)), 'lm');
    for (let t = 0; t <= 4; t++) h += ln(K, S2(X2(0, t)), S2(X2(3, t)), 'lm');
    h += pt(K, S2(P2), 'P', 'fk', -1);
    if (q >= 1) h += fl(K, S2(P2), S2(ad(P2, U2)), 'lg gr') + fl(K, S2(P2), S2(ad(P2, V2)), 'lg gr');
    if (q === 2) h += fl(K, S2(P2), S2(X2(2, 0)), 'lf gr') + fl(K, S2(X2(2, 0)), S2(X2(2, 1)), 'lf gr') + pt(K, S2(X2(2, 1)), '(2, 1, 4)', 'fA');
    if (q === 3) { const n = cr(U2, V2), G = X2(1.5, 2); h += fl(K, S2(G), S2(ad(G, mu(1.5 / no(n), n))), 'la gr'); }
    return h + K.t(170, 16, ['un plano: un punto P y dos direcciones', 'u = (1, 0, 1) y v = (0, 1, 0), no paralelas', 'P + 2u + 1v = (2, 1, 4)', 'su normal: u × v = (−1, 0, 1)'][q], 's ta');
  };
  // Capítulo 2, tu turno: llegar a (2, 3, 4) con s y t.  v { s, t }
  const planoST = (v, K) => {
    let h = ejes(K, S2, 4) + K.p([S2(X2(0, 0)), S2(X2(3, 0)), S2(X2(3, 4)), S2(X2(0, 4))], 'fa');
    for (let s = 0; s <= 3; s++) h += ln(K, S2(X2(s, 0)), S2(X2(s, 4)), 'lm');
    for (let t = 0; t <= 4; t++) h += ln(K, S2(X2(0, t)), S2(X2(3, t)), 'lm');
    const X = X2(v.s, v.t);
    return h + pt(K, S2(P2), 'P', 'fk', -1) + K.c(...S2(X), 6, 'fA') + K.t(240, 40, 'P = (0, 0, 2)', 's', 'start') + K.t(240, 58, 'u = (1, 0, 1)', 's tg', 'start')
      + K.t(240, 76, 'v = (0, 1, 0)', 's tg', 'start') + K.t(240, 100, `X = (${X.map(sg).join(', ')})`, 's ta', 'start');
  };

  // Capítulo 3: distancia a una recta, rectas que se cruzan, volumen y coplanares.  v { k }
  const S3 = vista([110, 150], 30), P3 = [1, 0, 1], D3 = [0, 3, 0], Q3 = [3, 1, 3];
  const distancias = (v, K) => {
    const q = k(v);
    if (q === 3) {   // dos rectas que se cruzan: la perpendicular común
      const S = vista([150, 150], 28);
      return ejes(K, S, 4) + ln(K, S([-1, 0, 0]), S([5, 0, 0]), 'lg gr') + ln(K, S([0, -1, 3]), S([0, 5, 3]), 'lf gr') + ln(K, S([0, 0, 0]), S([0, 0, 3]), 'lo gr d')
        + K.t(170, 16, 'd₁ × d₂ = (0, 0, 1): la separación es 3', 's ta');
    }
    if (q >= 4) {   // la caja y el tetraedro de O, (2, 0, 0), (0, 3, 0), (0, 0, 4)
      const S = vista([150, 150], 22), O = S([0, 0, 0]), a = S([2, 0, 0]), b = S([0, 3, 0]), c = S([0, 0, 4]);
      let h = ejes(K, S, 5);
      h += K.p([a, b, c], 'fa') + ln(K, O, a, 'la') + ln(K, O, b, 'la') + ln(K, O, c, 'la') + ln(K, a, b, 'la') + ln(K, b, c, 'la') + ln(K, c, a, 'la');
      if (q === 4) for (const [x, y, z] of [[2, 3, 0], [2, 0, 4], [0, 3, 4], [2, 3, 4]]) h += K.c(...S([x, y, z]), 2.5, 'fk');
      return h + K.t(170, 16, q === 4 ? 'caja de las tres aristas: 2 · 3 · 4 = 24' : 'tetraedro = 24 ÷ 6 = 4; si da 0, se aplasta', 's ta');
    }
    const P = S3(P3), Q = S3(Q3), E = S3(ad(P3, D3)), F = S3(ad(Q3, D3)), H = S3([1, 1, 1]);
    let h = ejes(K, S3, 4) + ln(K, S3(ad(P3, mu(-0.4, D3))), S3(ad(P3, mu(1.6, D3))), 'lg gr') + pt(K, P, 'P', 'fk', -1) + pt(K, Q, 'Q');
    if (q >= 1) h += K.p([P, E, F, Q], 'fa') + fl(K, P, E, 'lg gr') + fl(K, P, Q, 'lf gr');
    if (q >= 2) h += ln(K, Q, H, 'lo gr d');
    return h + K.t(170, 16, ['un punto Q y una recta P + t(0, 3, 0)', 'PQ y d arman un paralelogramo', 'altura = área ÷ base = 6√2 ÷ 3 = 2√2'][q], 's ta');
  };
  // Capítulo 3, tu turno: D(1, 3, h) en el plano de A(0, 0, 0), B(2, 0, 2), C(0, 2, 0).  v { h }
  const S3b = vista([130, 160], 28), A4 = [0, 0, 0], B4 = [2, 0, 2], C4 = [0, 2, 0];
  const coplanar = (v, K) => {
    const A = S3b(A4), B = S3b(B4), C = S3b(C4), D = S3b([1, 3, v.h]);
    return ejes(K, S3b, 4) + K.p([A, B, C], 'fa') + ln(K, A, D, 'lm d') + ln(K, B, D, 'lm d') + ln(K, C, D, 'lm d') + ln(K, S3b([1, 3, 0]), D, 'lm')
      + pt(K, A, 'A', 'fk', -1) + pt(K, B, 'B', 'fk', -1) + pt(K, C, 'C') + K.c(D[0], D[1], 6, 'fA') + K.t(D[0] + 10, D[1] - 4, 'D', 's', 'start')
      + K.t(250, 40, 'B = (2, 0, 2)', 's', 'start') + K.t(250, 58, 'C = (0, 2, 0)', 's', 'start') + K.t(250, 82, `D = (1, 3, ${sg(v.h)})`, 's ta', 'start');
  };

  // Problema: el dron y la línea eléctrica: P(0, 0, 6), d = (0, 3, 4), Q(4, 3, 5).  v { d }
  const S5 = vista([110, 150], 18), P5 = [0, 0, 6], D5 = [0, 3, 4], Q5 = [4, 3, 5];
  const pie5 = ad(P5, mu((3 * 3 + 4 * -1) / 25, D5)), DIR5 = mu(1 / no(su(pie5, Q5)), su(pie5, Q5));
  const dronLinea = (v, K) => {
    const Q = S5(Q5), E = S5(ad(Q5, mu(v.d, DIR5)));
    let h = ln(K, S5(ad(P5, mu(-1.2, D5))), S5(ad(P5, mu(1.4, D5))), 'lg gr') + pt(K, S5(P5), 'P(0, 0, 6)', 'fk', -1) + K.c(Q[0], Q[1], 6, 'fk') + K.t(Q[0] + 12, Q[1] + 4, 'dron (4, 3, 5)', 's', 'start');
    if (v.d) h += ln(K, Q, E, 'la gr') + K.c(E[0], E[1], 4, 'fA');
    return h + K.t(8, 16, 'línea: (0, 0, 6) + t(0, 3, 4), en metros', 's tm', 'start');
  };

  xpLec('geo-18', [
    ['Área y plano por tres puntos',
      xpMira('dibujo', 'Con dos lados de un triángulo, el producto vectorial da su **área** y su **plano**.', { dib: triangulo, v: { k: 0 }, alto: 200 }, [
        ['Tres puntos del espacio que no están en línea forman un triángulo.', {}],
        ['Desde A salen dos lados: AB = B − A y AC = C − A.', { k: 1 }],
        ['Esos dos lados arman un paralelogramo. El triángulo es justo la mitad.', { k: 2 }],
        ['AB × AC es perpendicular a los dos lados: atraviesa el triángulo. Es una normal del plano.', { k: 3 }, '$\\vec n = \\overrightarrow{AB} \\times \\overrightarrow{AC}$'],
        ['Su largo es el área del paralelogramo; la mitad es el área del triángulo.', { k: 4 }, '$\\text{área} = \\tfrac12\\|\\overrightarrow{AB} \\times \\overrightarrow{AC}\\|$'],
        ['Con la normal y el punto A sale la ecuación: n · X = n · A.', { k: 5 }, '$2x + 2y + 4z = 4$'],
      ], 'Área $= \\tfrac12\\|AB \\times AC\\|$; la normal del plano por $A$, $B$ y $C$ es $AB \\times AC$.'),
      xpHaz('dibujo', 'Con A(1, 0, 0), B(0, 2, 1) y C(0, 0, 2), la normal AB × AC es (4, 1, c). Ajusta c.', {
        dib: normalC, v: { c: 0 }, metas: { c: 2 }, alto: 220, manijas: [{ k: 'c', min: -5, max: 5, paso: 1, et: 'tercera componente c' }],
        lee: v => `$\\vec n = (4, 1, ${v.c})$`, pista: 'La tercera componente de AB × AC tapa la columna de z: (−1)·0 − 2·(−1).' },
      '$(-1, 2, 1) \\times (-1, 0, 2) = (4 - 0,\\ -1 + 2,\\ 0 + 2) = (4, 1, 2)$.')],
    ['El plano en paramétrica y el pliegue',
      xpMira('dibujo', 'Un plano también se **recorre**: un punto y dos direcciones. Y dos planos se cortan en una **recta**.', { dib: parametrica, v: { k: 0 }, alto: 210 }, [
        ['Un plano queda con un punto P y dos direcciones u y v que no sean paralelas.', {}],
        ['Cada punto del plano se alcanza con s pasos de u y t pasos de v.', { k: 1 }, '$X = P + s\\,\\vec u + t\\,\\vec v$'],
        ['Dos pasos de u y uno de v desde P llevan a (2, 1, 4).', { k: 2 }],
        ['La normal del plano es perpendicular a u y a v: u × v.', { k: 3 }],
        ['Ahora dos planos: el piso y una pared. Se cortan en una recta que está en los dos.', { k: 4 }],
        ['Esa recta es perpendicular a las dos normales: su dirección es n₁ × n₂.', { k: 5 }, '$\\vec d = \\vec n_1 \\times \\vec n_2$'],
      ], 'Un plano es $P + s\\vec u + t\\vec v$, de normal $\\vec u \\times \\vec v$; dos planos se cortan en la recta de director $n_1 \\times n_2$.'),
      xpHaz('dibujo', 'Con P = (0, 0, 2), u = (1, 0, 1) y v = (0, 1, 0), ajusta s y t para que X llegue a (2, 3, 4).', {
        dib: planoST, v: { s: 0, t: 0 }, metas: { s: 2, t: 3 }, alto: 250,
        manijas: [{ k: 's', min: 0, max: 3, paso: 1, et: 's: pasos de u' }, { k: 't', min: 0, max: 4, paso: 1, et: 't: pasos de v' }],
        lee: v => `$X = (${v.s}, ${v.t}, ${2 + v.s})$`, pista: 'La primera coordenada solo depende de s y la segunda solo de t.' },
      '$(0, 0, 2) + s(1, 0, 1) + t(0, 1, 0) = (s, t, 2 + s)$: con $s = 2$ y $t = 3$ da $(2, 3, 4)$.')],
    ['Distancias y volúmenes',
      xpMira('dibujo', 'Las **distancias** salen de alturas de paralelogramos, y los **volúmenes**, de cajas.', { dib: distancias, v: { k: 0 }, alto: 210 }, [
        ['¿Qué tan cerca pasa la recta de Q? Por la perpendicular, que es la más corta.', {}],
        ['PQ y el director d arman un paralelogramo de área ‖PQ × d‖ y base ‖d‖.', { k: 1 }],
        ['La distancia es su altura: el área dividida entre la base.', { k: 2 }, '$d = \\dfrac{\\|\\overrightarrow{PQ} \\times \\vec d\\|}{\\|\\vec d\\|}$'],
        ['Dos rectas que se cruzan: d₁ × d₂ apunta de una a otra, y se proyecta en él un vector entre ellas.', { k: 3 }, '$d = \\dfrac{|\\overrightarrow{P_1P_2} \\cdot (\\vec d_1 \\times \\vec d_2)|}{\\|\\vec d_1 \\times \\vec d_2\\|}$'],
        ['Tres aristas desde un vértice arman una caja; el triple producto es su volumen con signo.', { k: 4 }],
        ['El tetraedro ocupa la sexta parte. Si el triple producto vale 0, los cuatro puntos son coplanares.', { k: 5 }, '$V = \\tfrac16\\left|\\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD})\\right|$'],
      ], 'Distancia a una recta: $\\tfrac{\\|PQ \\times d\\|}{\\|d\\|}$; tetraedro: $\\tfrac16|\\text{triple}|$; si vale 0, coplanares.'),
      xpHaz('dibujo', 'Con A(0, 0, 0), B(2, 0, 2) y C(0, 2, 0), sube o baja D(1, 3, h) hasta que los cuatro puntos sean coplanares.', {
        dib: coplanar, v: { h: 4 }, metas: { h: 1 }, alto: 230, manijas: [{ k: 'h', min: 0, max: 5, paso: 1, et: 'altura h de D' }],
        lee: v => `$\\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD}) = ${4 * v.h - 4}$`, pista: 'AC × AD = (2h, 0, −2); haz el producto punto con AB = (2, 0, 2).' },
      '$AC \\times AD = (2h, 0, -2)$ y $AB \\cdot (2h, 0, -2) = 4h - 4$, que vale 0 con $h = 1$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un dron de inspección está en (4, 3, 5) y la línea eléctrica sigue (0, 0, 6) + t(0, 3, 4), en metros. Ajusta la distancia más corta del dron a la línea.', {
        dib: dronLinea, v: { d: 0 }, metas: { d: 5 }, alto: 220, manijas: [{ k: 'd', min: 0, max: 10, paso: 1, et: 'distancia en metros' }],
        lee: v => `$d = ${v.d}$ m`, pista: 'PQ = (4, 3, −1); calcula PQ × (0, 3, 4), su norma, y divide entre ‖d‖ = 5.' },
      '$\\overrightarrow{PQ} \\times \\vec d = (4, 3, -1) \\times (0, 3, 4) = (15, -16, 12)$, de norma 25, y $\\tfrac{25}{5} = 5$ m.')],
  ], 'El producto vectorial da áreas, normales de planos, rectas de corte, distancias y volúmenes en el espacio.');
}
