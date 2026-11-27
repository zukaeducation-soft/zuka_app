// Geometría Vectorial · explicación de geo-16 «Producto escalar y geometría analítica» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: la normal mira la recta de frente y n · (X − P) = 0 la describe; la distancia es la sombra sobre la normal; los
// ángulos entre rectas y planos son los de sus normales, y el de una recta con un plano, su complemento. Los ejemplos no son los de
// los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const pl = (W, ox, oy, u) => ({ W, ox, oy, u, P: q => [ox + q[0] * u, oy - q[1] * u] });
  const pap = (K, P) => {
    const [x0, x1, y0, y1] = P.W;
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(...P.P([x, y0]), ...P.P([x, y1]), x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(...P.P([x0, y]), ...P.P([x1, y]), y ? 'ls' : 'lm');
    return h;
  };
  // Recta a x + b y = c recortada a la ventana.
  const rec = (K, P, a, b, c, cls) => {
    const [x0, x1, y0, y1] = P.W, q = [];
    if (b) [x0, x1].forEach(x => { const y = (c - a * x) / b; if (y >= y0 - 1e-9 && y <= y1 + 1e-9) q.push([x, y]); });
    if (a) [y0, y1].forEach(y => { const x = (c - b * y) / a; if (x >= x0 - 1e-9 && x <= x1 + 1e-9) q.push([x, y]); });
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    return K.l(...P.P(q[0]), ...P.P(q.at(-1)), cls);
  };
  const esq = (K, V, e1, e2, s, cls) => K.pl([[V[0] + e1[0] * s, V[1] + e1[1] * s], [V[0] + (e1[0] + e2[0]) * s, V[1] + (e1[1] + e2[1]) * s], [V[0] + e2[0] * s, V[1] + e2[1] * s]], cls);
  const uni = (A, B) => { const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };

  // 1 · la normal dice la recta: P(1, 2), n = (2, 1), recta 2x + y = 4
  const P1 = pl([-1, 6, -1, 5], 60, 160, 26);
  const normal = (v, K) => {
    const P = P1.P([1, 2]), N = P1.P([3, 3]), X = P1.P([1 + v.s, 2 - 2 * v.s]);
    let h = pap(K, P1) + K.f(v.linea, rec(K, P1, 2, 1, 4, 'lg gr')) + K.c(P[0], P[1], 4, 'fk') + K.t(P[0] - 8, P[1] + 4, 'P', 's', 'end');
    h += K.f(v.n, K.ar(P[0], P[1], N[0], N[1], 'la gr') + K.t(N[0] + 6, N[1] - 4, 'n', 's ta', 'start'));
    if (v.x > 0.01 && Math.abs(v.s) > 0.05) h += K.f(v.x, K.ar(P[0], P[1], X[0], X[1], 'lf gr') + K.c(X[0], X[1], 4, 'fA') + K.t(X[0] + 8, X[1] + 4, 'X', 's tf', 'start'));
    if (Math.abs(v.s) > 0.05) h += K.f(v.ang, esq(K, P, uni(P, N), uni(P, X), 9, 'lo'));
    return h + K.f(v.eq, K.t(332, 40, 'n · (X − P) = 0', 's tm', 'end') + K.t(332, 62, '2(x − 1) + (y − 2) = 0', 's tm', 'end') + K.t(332, 84, '2x + y = 4', 's ta', 'end'))
      + K.f(v.lee, K.t(332, 120, 'ax + by = c', 's tg', 'end') + K.t(332, 142, '↓', 's tg', 'end') + K.t(332, 164, 'n = (a, b)', 's tg', 'end'));
  };
  const P1h = pl([-3, 4, -2, 5], 106, 150, 24), C1 = [0, 1], D1 = [2, 4];
  const hazNormal = (v, K) => {
    const C = P1h.P(C1), D = P1h.P(D1), T = P1h.P([C1[0] + v.a, C1[1] + v.b]);
    return pap(K, P1h) + rec(K, P1h, 3, -2, -2, 'lg gr') + K.c(C[0], C[1], 4, 'fk') + K.c(D[0], D[1], 4, 'fk') + K.t(C[0] - 8, C[1] + 16, 'C(0, 1)', 's', 'end')
      + K.t(D[0] + 8, D[1] + 4, 'D(2, 4)', 's', 'start') + (v.a || v.b ? K.ar(C[0], C[1], T[0], T[1], 'la gr') : '') + K.t(332, 18, `n = (${sg(v.a)}, ${sg(v.b)})`, 's ta', 'end');
  };

  // 2 · la distancia es la sombra sobre la normal: Q(4, 5) y la recta 2x + y = 4
  const P2 = pl([-1, 6, -1, 6], 58, 178, 24);
  const sombra = (v, K) => {
    const P = P2.P([1, 2]), Q = P2.P([4, 5]), F = P2.P([0.4, 3.2]), N = P2.P([3, 3]), S = P2.P([1 + 3.6, 2 + 1.8]), O = P2.P([2, 0]);
    let h = pap(K, P2) + rec(K, P2, 2, 1, 4, 'lg gr') + K.c(P[0], P[1], 4, 'fk') + K.t(P[0] - 8, P[1] + 14, 'P', 's', 'end');
    h += K.f(v.q, K.c(Q[0], Q[1], 5, 'fA') + K.t(Q[0] + 8, Q[1] + 4, 'Q', 's ta', 'start'));
    h += K.f(v.pie, K.l(Q[0], Q[1], F[0], F[1], 'lo gr') + esq(K, F, uni(F, Q), uni(F, P2.P([1, 2])), 8, 'lo'));
    h += K.f(v.qp, K.ar(P[0], P[1], Q[0], Q[1], 'lf gr') + K.ar(P[0], P[1], N[0], N[1], 'la gr') + K.t(N[0] + 6, N[1] + 12, 'n', 's ta', 'start'));
    h += K.f(v.pr, K.l(Q[0], Q[1], S[0], S[1], 'lm d') + K.l(P[0], P[1], S[0], S[1], 'lo gr'));
    return h + K.f(v.otro, K.c(O[0], O[1], 4, 'fk') + K.ar(O[0], O[1], Q[0], Q[1], 'lf d') + K.t(O[0] + 8, O[1] + 16, 'otro P', 's tf', 'start'))
      + K.t(332, 18, 'recta: 2x + y = 4', 's tg', 'end');
  };
  const P2h = pl([-3, 6, -2, 6], 106, 184, 22);
  const hazDist = (v, K) => {
    const Q = P2h.P([4, 5]);
    return pap(K, P2h) + rec(K, P2h, 4, 3, 1, 'lg gr') + K.c(Q[0], Q[1], 5, 'fA') + K.t(Q[0] + 8, Q[1] + 4, 'Q(4, 5)', 's ta', 'start')
      + K.t(8, 18, 'recta: 4x + 3y = 1', 's tg', 'start') + K.t(332, 18, `tu distancia: ${v.r}`, 's ta', 'end');
  };

  // 3 · ángulos entre rectas: el de sus normales
  const C3 = [150, 116];
  const cruce = (v, K) => {
    const t = v.t, n1 = K.at(C3[0], C3[1], 46, 90), n2 = K.at(C3[0], C3[1], 46, 90 + t);
    const L = (g, off, cls) => { const o = K.at(C3[0], C3[1], off, g + 90), a = K.at(o[0], o[1], 120, g), b = K.at(o[0], o[1], 120, g + 180); return K.l(a[0], a[1], b[0], b[1], cls); };
    let h = L(0, 0, 'lg gr') + L(t, v.par ? 28 : 0, 'lf gr') + K.c(C3[0], C3[1], 4, 'fk');
    h += K.ar(C3[0], C3[1], n1[0], n1[1], 'lg') + K.t(n1[0] + 6, n1[1], 'n₁', 's tg', 'start');
    if (!v.par) h += K.ar(C3[0], C3[1], n2[0], n2[1], 'lf') + K.t(n2[0] - 6, n2[1] - 4, 'n₂', 's tf', 'end');
    if (t > 1 && !v.par) {
      h += K.f(v.an, K.arc(C3[0], C3[1], 28, 90, 90 + t, 'la') + K.t(...K.at(C3[0], C3[1], 40, 90 + t / 2), `${Math.round(t)}°`, 's ta'));
      h += K.f(v.al, K.arc(C3[0], C3[1], 60, 0, t, 'lo') + K.t(...K.at(C3[0], C3[1], 74, t / 2), `${Math.round(t)}°`, 's to'));
      if (t > 90) h += K.f(v.ag, K.arc(C3[0], C3[1], 60, t, 180, 'la gr') + K.t(...K.at(C3[0], C3[1], 76, (t + 180) / 2), `${Math.round(180 - t)}°`, 's ta'));
    }
    return h;
  };
  const P3h = pl([-3, 4, -3, 3], 106, 112, 24);
  const hazCruce = (v, K) => pap(K, P3h) + rec(K, P3h, 4, -2, 1, 'lg gr') + rec(K, P3h, 1, v.k, 3, 'la gr')
    + K.t(332, 18, '4x − 2y = 1', 's tg', 'end') + K.t(332, 38, `x ${v.k ? `${v.k < 0 ? '−' : '+'} ${Math.abs(v.k) === 1 ? '' : Math.abs(v.k)}y ` : ''}= 3`, 's ta', 'end');

  // 4 · el plano en el espacio
  const PT = [[40, 186], [200, 186], [262, 124], [102, 124]], PP = [150, 156];
  const losa = (K, d, cls) => K.p(PT.map(q => [q[0], q[1] - d]), cls) + K.pl([...PT, PT[0]].map(q => [q[0], q[1] - d]), 'lm');
  const plano = (v, K) => {
    let h = K.f(v.pl, losa(K, 0, 'fn')) + K.c(PP[0], PP[1], 4, 'fk') + K.t(PP[0] - 8, PP[1] + 16, 'P', 's', 'end');
    h += K.f(v.n * (1 - v.rec), K.ar(PP[0], PP[1], PP[0], PP[1] - 70, 'la gr') + esq(K, PP, [1, 0], [0, -1], 8, 'lm') + K.t(PP[0] + 8, PP[1] - 64, 'n', 's ta', 'start'));
    h += K.f(v.eq, K.t(8, 18, 'n = (1, 2, 2), P(2, 1, 1)', 's tm', 'start') + K.t(8, 38, 'x + 2y + 2z = 6', 's ta', 'start'));
    const Q = [222, 54], F = [222, 144];
    h += K.f(v.q, K.c(Q[0], Q[1], 5, 'fA') + K.t(Q[0] + 8, Q[1] + 4, 'Q', 's ta', 'start') + K.l(Q[0], Q[1], F[0], F[1], 'lo gr') + K.t(Q[0] + 8, (Q[1] + F[1]) / 2, '5', 's to', 'start'));
    h += K.f(v.par, losa(K, 76, 'fn') + K.l(70, 110, 70, 186, 'lo gr d') + K.t(64, 150, '3', 's to', 'end') + K.t(332, 60, 'x + 2y + 2z = 15', 's tm', 'end'));
    if (v.inc > 0.01) {
      const A = [150, 156], B = K.at(A[0], A[1], 110, 60), Cc = K.at(A[0], A[1], 110, 240);
      h += K.f(v.inc, K.l(Cc[0], Cc[1], B[0], B[1], 'lf gr') + K.ar(A[0], A[1], ...K.at(A[0], A[1], 60, 150), 'lf') + K.t(...K.at(A[0], A[1], 70, 152), 'n₂', 's tf', 'end')
        + K.arc(A[0], A[1], 26, 90, 150, 'la') + K.t(...K.at(A[0], A[1], 40, 120), 'θ', 's ta'));
    }
    if (v.rec > 0.01) {
      const B = K.at(PP[0], PP[1], 110, 50);
      h += K.f(v.rec, K.l(PP[0], PP[1], B[0], B[1], 'lf gr') + K.t(B[0] + 6, B[1], 'd', 's tf', 'start') + K.l(PP[0], PP[1], PP[0], PP[1] - 70, 'lm d')
        + K.arc(PP[0], PP[1], 34, 0, 50, 'lo') + K.t(PP[0] + 52, PP[1] - 14, 'φ', 's to', 'start') + K.arc(PP[0], PP[1], 50, 50, 90, 'lm') + K.t(PP[0] - 8, PP[1] - 50, '90° − φ', 's tm', 'end'));
    }
    return h;
  };
  const hazRecta = (v, K) => {
    const B = [110, 170], A = K.at(B[0], B[1], 100, 180), E = K.at(B[0], B[1], 210, 0), T = K.at(B[0], B[1], 110, v.g), N = K.at(B[0], B[1], 80, 90);
    return K.p([A, E, [E[0], E[1] + 14], [A[0], A[1] + 14]], 'fn') + K.l(A[0], A[1], E[0], E[1], 'lg gr') + K.ar(B[0], B[1], N[0], N[1], 'lm d') + K.t(N[0] - 6, N[1] + 4, 'n', 's tm', 'end')
      + K.l(B[0], B[1], T[0], T[1], 'la gr') + K.c(B[0], B[1], 4, 'fk') + K.t(8, 18, 'plano: x − y = 1', 's tg', 'start') + K.t(8, 38, 'recta: d = (2, −1, 2)', 's ta', 'start') + K.t(332, 18, `φ = ${v.g}°`, 's ta', 'end');
  };

  // Problema: la lámpara y el techo inclinado
  const lampara = (v, K) => {
    const A = [30, 200], B = [300, 110], L = [180, 40], ang = Math.atan2(A[1] - B[1], B[0] - A[0]);
    const t = ((L[0] - A[0]) * Math.cos(ang) - (L[1] - A[1]) * Math.sin(ang)), F = [A[0] + t * Math.cos(ang), A[1] - t * Math.sin(ang)];
    const V = [L[0], A[1] - (L[0] - A[0]) * Math.tan(ang)];
    return K.p([A, B, [B[0], B[1] + 14], [A[0], A[1] + 14]], 'fn') + K.l(A[0], A[1], B[0], B[1], 'lg gr') + K.c(L[0], L[1], 6, 'fA') + K.t(L[0] + 10, L[1] + 4, 'L(1, 1, 9)', 's ta', 'start')
      + K.l(L[0], L[1], V[0], V[1], 'lm d') + K.l(L[0], L[1], F[0], F[1], 'la d') + K.t(8, 18, 'techo: 2x + 2y + z = 4', 's tg', 'start')
      + K.t(332, 18, `tu distancia: ${v.r} m`, 's ta', 'end');
  };

  xpLec('geo-16', [
    ['La normal dice la recta',
      xpMira('dibujo', 'Una recta del plano se puede describir con **una flecha** que la mira de frente: su **normal**.', { dib: normal, v: { n: 0, x: 0, s: 1, ang: 0, linea: 0, eq: 0, lee: 0 }, alto: 226 }, [
        ['Una recta también se describe con una flecha que la mira de frente: la normal n. Aquí sale del punto P.', { n: 1 }],
        ['Toma un punto X de la recta. La flecha de P a X va a lo largo de la recta.', { x: 1 }],
        ['Esa flecha forma ángulo recto con n, así que su producto escalar con n es cero.', { ang: 1 }, '$\\vec n \\cdot (X - P) = 0$'],
        ['Si X recorre la recta, la cuenta sigue en cero; fuera de ella, no. La ecuación atrapa la recta.', { s: -1.2, linea: 1 }],
        ['Al abrir el producto sale la ecuación de siempre de la recta.', { eq: 1 }, '$2(x - 1) + (y - 2) = 0 \\iff 2x + y = 4$'],
        ['Y al revés: en una ecuación ax + by = c, la normal se lee en los coeficientes.', { lee: 1 },'$\\vec n = (a, b), \\quad c = \\vec n \\cdot P$'],
      ], 'Los X con n · (X − P) = 0 forman la recta por P perpendicular a n; en ax + by = c, la normal es (a, b).'),
      xpHaz('dibujo', 'La recta pasa por **C** y **D**. Arrastra la punta de $\\vec n$ para que sea **normal** a la recta.', { dib: hazNormal, v: { a: 2, b: 3 }, alto: 226,
        cumple: v => (v.a || v.b) && 2 * v.a + 3 * v.b === 0, sol: { a: 3, b: -2 },
        manijas: [{ k: ['a', 'b'], min: [-3, -3], max: [3, 3], paso: 1, en: v => P1h.P([C1[0] + v.a, C1[1] + v.b]), de: (x, y) => [(x - 106) / 24 - C1[0], (150 - y) / 24 - C1[1]] }],
        lee: v => `$\\vec n \\cdot (2, 3) = ${2 * v.a + 3 * v.b}$`,
        dice: v => ((v.a || v.b) && 2 * v.a + 3 * v.b === 0 ? 'Sí: n · (D − C) = 0. La recta es 3x − 2y = −2.' : v.a * 3 === v.b * 2 ? 'Esa va a lo largo de la recta: es un director.' : 'Busca un n con n · (2, 3) = 0.') },
        'D − C = (2, 3) va por la recta; una normal es (3, −2), y la recta es 3x − 2y = −2.')],
    ['La distancia es una sombra',
      xpMira('dibujo', '¿A qué distancia está un punto de una recta? La respuesta está en la **normal**.', { dib: sombra, v: { q: 0, pie: 0, qp: 0, pr: 0, otro: 0 }, alto: 226 }, [
        ['Lejos de la recta está Q. ¿Cuánto mide el camino más corto de Q a la recta?', { q: 1 }],
        ['El más corto llega en ángulo recto, así que va en la dirección de la normal n.', { pie: 1 }],
        ['Desde P, la flecha Q − P va inclinada. Su sombra sobre la normal mide justo ese camino.', { qp: 1, pr: 1 }, '$\\operatorname{dist} = \\tfrac{|\\vec n \\cdot (Q - P)|}{\\|\\vec n\\|}$'],
        ['Aquí n · (Q − P) = 2·3 + 1·3 = 9 y ‖n‖ = √5: la distancia es 9/√5, unos 4.02.', {}, '$\\tfrac{9}{\\sqrt 5} \\approx 4.02$'],
        ['Como n · (Q − P) = n · Q − c, no hace falta P: basta reemplazar Q en la ecuación.', {}, '$\\operatorname{dist} = \\tfrac{|ax_0 + by_0 - c|}{\\sqrt{a^2 + b^2}}$'],
        ['Con otro punto de la recta la sombra mide lo mismo: la distancia no depende de cuál se use.', { otro: 1 }],
      ], 'La distancia de Q a ax + by = c es la sombra de Q − P sobre la normal: |ax₀ + by₀ − c| / √(a² + b²).'),
      xpHaz('dibujo', 'Ajusta la distancia del punto $Q(4, 5)$ a la recta $4x + 3y = 1$.', { dib: hazDist, v: { r: 0 }, metas: { r: 6 }, alto: 250,
        manijas: [{ k: 'r', min: 0, max: 10, paso: 1, et: 'distancia de Q a la recta' }],
        lee: v => `$\\tfrac{|16 + 15 - 1|}{\\sqrt{16 + 9}} = 6$; tu valor: $${v.r}$`,
        dice: v => (v.r === 6 ? 'Justo: |16 + 15 − 1| / 5 = 30 / 5 = 6.' : 'Reemplaza Q en 4x + 3y − 1 y divide entre ‖(4, 3)‖ = 5.') },
        'Se reemplaza Q en la ecuación y se divide entre la norma de la normal: 30 / 5 = 6.')],
    ['Ángulos entre rectas',
      xpMira('dibujo', 'Cuando dos rectas se cruzan, sus **normales** se cruzan con el mismo ángulo.', { dib: cruce, v: { t: 60, an: 0, al: 0, ag: 0, par: 0 }, alto: 236 }, [
        ['Dos rectas que se cortan, cada una con su normal. ¿Qué ángulo forman?', {}],
        ['Si una recta gira, su normal gira lo mismo. Por eso el ángulo entre las rectas es el de sus normales.', { an: 1, al: 1 }],
        ['Con el producto escalar: con normales (1, 2) y (3, −1), cos θ = 1 / (√5·√10), unos 82°.', { t: 82 }, '$\\cos\\theta = \\tfrac{\\vec n_1 \\cdot \\vec n_2}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|}$'],
        ['Si sale obtuso, el ángulo de las rectas es el otro, el agudo: por eso se usa el valor absoluto.', { t: 130, ag: 1 }, '$\\cos\\theta = \\tfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|}$'],
        ['Si n₁ · n₂ = 0, las normales forman ángulo recto, y las rectas también: son perpendiculares.', { t: 90, ag: 0 }, '$\\vec n_1 \\cdot \\vec n_2 = 0$'],
        ['Si una normal es múltiplo de la otra, las rectas no se cruzan (o son la misma): son paralelas.', { t: 0, par: 1 }, '$\\vec n_2 = \\lambda\\,\\vec n_1$'],
      ], 'El ángulo entre dos rectas es el de sus normales, el agudo; perpendiculares si n₁ · n₂ = 0, paralelas si son múltiplos.'),
      xpHaz('dibujo', 'Ajusta $k$ para que la recta $x + ky = 3$ sea **perpendicular** a $4x - 2y = 1$.', { dib: hazCruce, v: { k: 0 }, metas: { k: 2 }, alto: 236,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }],
        lee: v => `$(4, -2) \\cdot (1, ${v.k}) = ${4 - 2 * v.k}$`,
        dice: v => (v.k === 2 ? 'Sí: (4, −2) · (1, 2) = 4 − 4 = 0.' : v.k === -0.5 ? 'Así serían paralelas.' : 'El producto de las normales (4, −2) y (1, k) debe dar 0.') },
        '(4, −2) · (1, k) = 4 − 2k = 0 da k = 2.')],
    ['El plano en el espacio',
      xpMira('dibujo', 'En el espacio la misma ecuación ya no da una recta: da un **plano**.', { dib: plano, v: { pl: 0, n: 0, eq: 0, q: 0, par: 0, inc: 0, rec: 0 }, alto: 226 }, [
        ['En el espacio, la misma ecuación ya no da una recta: da el plano que n mira de frente.', { pl: 1, n: 1 }],
        ['Con n = (1, 2, 2) y P(2, 1, 1) se abre igual; los coeficientes son la normal.', { eq: 1 }, '$x + 2y + 2z = 6, \\quad d = \\vec n \\cdot P$'],
        ['La distancia de Q(3, 4, 5) al plano también es la sombra sobre la normal.', { q: 1 }, '$\\tfrac{|ax_0 + by_0 + cz_0 - d|}{\\|\\vec n\\|} = \\tfrac{|3 + 8 + 10 - 6|}{3} = 5$'],
        ['El plano x + 2y + 2z = 15 tiene la misma normal: es paralelo al primero.', { q: 0, par: 1 }, '$\\tfrac{|d_2 - d_1|}{\\|\\vec n\\|} = \\tfrac{|15 - 6|}{3} = 3$'],
        ['Dos planos que se cortan forman el ángulo de sus normales: perpendiculares si n₁ · n₂ = 0.', { par: 0, inc: 1, eq: 0 }, '$\\cos\\theta = \\tfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|}$'],
        ['Una recta y un plano forman el complemento del ángulo de la recta con la normal: por eso va el seno.', { inc: 0, rec: 1 }, '$\\operatorname{sen}\\varphi = \\tfrac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\,\\|\\vec n\\|}$'],
      ], 'El plano es n · (X − P) = 0, o ax + by + cz = d; distancias y ángulos salen de su normal, y con una recta se usa el seno.'),
      xpHaz('dibujo', 'Elige el ángulo entre la recta de director $\\vec d = (2, -1, 2)$ y el plano $x - y = 1$.', { dib: hazRecta, v: { g: 0 }, metas: { g: 45 }, alto: 246,
        manijas: [{ k: 'g', min: 0, max: 90, paso: 15, et: 'ángulo con el plano, en grados' }],
        lee: () => '$\\operatorname{sen}\\varphi = \\tfrac{|2 + 1 + 0|}{3\\sqrt 2} = \\tfrac{\\sqrt 2}{2}$',
        dice: v => (v.g === 45 ? 'Justo: sen φ = 3 / (3√2) = √2/2, así que φ = 45°.' : 'Calcula |d · n| / (‖d‖‖n‖) con n = (1, −1, 0): es el seno de φ.') },
        'd · n = 3, ‖d‖ = 3 y ‖n‖ = √2: sen φ = √2/2, φ = 45°.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una lámpara cuelga en $L(1, 1, 9)$ sobre un techo inclinado $2x + 2y + z = 4$ (en metros). Ajusta la distancia **más corta** de la lámpara al techo.', { dib: lampara, v: { r: 0 }, metas: { r: 3 }, alto: 260,
        manijas: [{ k: 'r', min: 0, max: 12, paso: 1, et: 'distancia más corta, en metros' }],
        lee: v => `$\\tfrac{|2 + 2 + 9 - 4|}{\\sqrt{4 + 4 + 1}}$; tu valor: $${v.r}$`,
        dice: v => (v.r === 3 ? 'Justo: |2 + 2 + 9 − 4| / 3 = 9 / 3 = 3 m.' : v.r === 9 ? 'Esa es la altura en vertical sobre el techo: el camino más corto va por la normal y se divide entre ‖n‖ = 3.' : 'Reemplaza L en 2x + 2y + z − 4 y divide entre ‖(2, 2, 1)‖.') },
        'El camino más corto va por la normal: |2 + 2 + 9 − 4| / 3 = 3 m, menos que los 9 m en vertical.')],
  ], 'Con la normal se escribe la recta o el plano, se mide la distancia como una sombra y se comparan los ángulos.');
}
