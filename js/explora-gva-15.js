// Geometría Vectorial · explicación de geo-15 «Proyección ortogonal» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: la proyección es la sombra bajo una luz perpendicular a la recta de v; luego su largo con signo (componente
// escalar) y la flecha (u·v / ‖v‖²)·v, que no depende del largo ni del sentido de v; la parte perpendicular que sobra; y el punto más
// cercano de una recta, por el origen o por otro punto. Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
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
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const unit = v => { const L = Math.hypot(...v) || 1; return v.map(x => x / L); };
  // La recta A + t·d dentro del papel (se recorre a pasos y se queda con lo que cae adentro).
  const recta = (K, P, A, d, cls) => {
    const den = [];
    for (let t = -30; t <= 30; t += 0.05) { const q = [A[0] + t * d[0], A[1] + t * d[1]]; if (q[0] >= P.x0 && q[0] <= P.x1 && q[1] >= P.y0 && q[1] <= P.y1) den.push(q); }
    return den.length > 1 ? K.l(...P2(P, den[0]), ...P2(P, den.at(-1)), cls) : '';
  };
  const recto = (K, F, a, b, cls = 'lm', s = 8) => {
    const ua = unit(a), ub = unit(b);
    return K.pl([[F[0] + s * ua[0], F[1] + s * ua[1]], [F[0] + s * (ua[0] + ub[0]), F[1] + s * (ua[1] + ub[1])], [F[0] + s * ub[0], F[1] + s * ub[1]]], cls);
  };
  const rot = (K, A, B, s, cls, lado = 1) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * 12, (A[1] + B[1]) / 2 - lado * dx / L * 12 + 4, s, `s ${cls}`);
  };

  // 1 · la sombra bajo una luz perpendicular: v horizontal, u de largo 5 con el ángulo θ
  const O1 = [170, 190], U1 = 24;
  const sombra = (v, K) => {
    const T = [O1[0] + 5 * U1 * Math.cos(v.th * R), O1[1] - 5 * U1 * Math.sin(v.th * R)], c = 5 * Math.cos(v.th * R), F = [O1[0] + c * U1, O1[1]];
    let h = K.l(14, O1[1], 326, O1[1], 'lm gr') + K.ar(O1[0], O1[1], O1[0] + 4 * U1, O1[1], 'lg gr') + K.t(O1[0] + 4 * U1, O1[1] + 18, 'v', 's tg');
    h += K.f(v.luz, [-60, -30, 0, 30, 60].filter(o => T[0] + o > 6 && T[0] + o < 334).map(o => K.l(T[0] + o, 28, T[0] + o, O1[1], 'ls d')).join('') + K.t(332, 18, 'luz ⟂ a la recta de v', 's tm', 'end'));
    h += K.ar(O1[0], O1[1], T[0], T[1], 'lf gr') + K.t(T[0] + 8, T[1] - 4, 'u', 's tf', 'start') + K.c(O1[0], O1[1], 4, 'fk');
    if (Math.abs(c) > 0.05) h += K.f(v.som, K.l(T[0], T[1], F[0], F[1], 'lm d') + K.l(O1[0], O1[1] + 1, F[0], F[1] + 1, 'la gr') + recto(K, F, [c > 0 ? -1 : 1, 0], [0, -1]));
    h += K.f(v.pr * (Math.abs(c) > 0.05 ? 1 : 0), K.t((O1[0] + F[0]) / 2, O1[1] + 18, 'proy', 's ta'));
    return h + K.f(v.cm, K.t(8, 18, `θ = ${Math.round(v.th)}°, comp = 5 cos θ = ${sg(r2(c))}`, 's ta', 'start'));
  };
  const hazSombra = (v, K) => {
    const T = [O1[0] - 3 * U1, O1[1] - 4 * U1];
    let h = K.l(14, O1[1], 326, O1[1], 'lm gr') + K.ar(O1[0], O1[1], O1[0] + 2 * U1, O1[1], 'lg gr') + K.t(O1[0] + 2 * U1, O1[1] + 18, 'v', 's tg');
    for (let k = -6; k <= 6; k++) h += K.l(O1[0] + k * U1, O1[1] - 4, O1[0] + k * U1, O1[1] + 4, 'lm') + (k % 2 ? '' : K.t(O1[0] + k * U1, O1[1] + 32, sg(k), 's tm'));
    return h + K.ar(O1[0], O1[1], T[0], T[1], 'lf gr') + K.t(T[0] - 8, T[1], 'u', 's tf', 'end') + K.c(O1[0], O1[1], 4, 'fk') + K.t(8, 18, `tu sombra llega a ${sg(v.x)}`, 's ta', 'start');
  };

  // 2 · la cuenta de la sombra: u = (1, 5) sobre k·(2, 2)
  const P2a = pl({ x0: -3, x1: 6, y0: -3, y1: 6 }, 137, 150, 22);
  const cuenta = (v, K) => {
    const O = [P2a.ox, P2a.oy], U = P2(P2a, [1, 5]), V = P2(P2a, [2 * v.k, 2 * v.k]), F = P2(P2a, [3, 3]);
    let h = pap(K, P2a) + recta(K, P2a, [0, 0], [1, 1], 'lm d') + K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 10, V[1] + 14, `${v.k === 1 ? '' : sg(r2(v.k))}v`, 's tg', 'start');
    h += K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] - 6, U[1] - 4, 'u', 's tf', 'end');
    if (v.k > 0) h += K.ang(O, U, V, 18, 'θ', 'fn', 's tm');
    h += K.f(v.som, K.l(U[0], U[1], F[0], F[1], 'lm d') + recto(K, F, [-1, 1], [U[0] - F[0], U[1] - F[1]]));
    return h + K.f(v.pr, K.ar(O[0], O[1], F[0], F[1], 'la gr') + K.t(F[0] + 12, F[1] + 2, 'proy', 's ta', 'start'));
  };
  const P2b = pl({ x0: -2, x1: 7, y0: -4, y1: 3 }, 104, 92, 24);
  const hazCuenta = (v, K) => {
    const O = [P2b.ox, P2b.oy], U = P2(P2b, [5, 1]), V = P2(P2b, [1, -1]), C = P2(P2b, [v.c, -v.c]);
    let h = pap(K, P2b) + recta(K, P2b, [0, 0], [1, -1], 'lm d') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] + 8, U[1] - 4, 'u = (5, 1)', 's tf', 'start');
    if (Math.abs(v.c) > 0.05) h += K.ar(O[0], O[1], C[0], C[1], 'la gr') + K.l(U[0], U[1], C[0], C[1], 'ls d');
    return h + K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 8, V[1] + 4, 'v', 's tg', 'start') + K.t(332, 18, `${sg(v.c)}·v = (${sg(v.c)}, ${sg(-v.c)})`, 's ta', 'end');
  };

  // 3 · paralela más perpendicular: u = (7, 1) sobre v = (3, 4)
  const P3 = pl({ x0: -1, x1: 8, y0: -4, y1: 5 }, 80, 124, 20);
  const partes = (v, K) => {
    const O = [P3.ox, P3.oy], U = P2(P3, [7, 1]), V = P2(P3, [3, 4]), Q = P2(P3, [4, -3]);
    let h = pap(K, P3) + recta(K, P3, [0, 0], [3, 4], 'lm d') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] + 6, U[1] + 16, 'u', 's tf', 'start');
    h += K.f(1 - v.p, K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] - 8, V[1] - 4, 'v', 's tg', 'end'));
    h += K.f(v.p, K.ar(O[0], O[1], V[0], V[1], 'la gr') + K.t(V[0] - 8, V[1] - 4, 'p', 's ta', 'end'));
    h += K.f(v.q, K.ar(V[0], V[1], U[0], U[1], 'lo gr d') + K.ar(O[0], O[1], Q[0], Q[1], 'lo gr') + K.t(Q[0] + 8, Q[1] + 4, 'q', 's to', 'start'));
    h += K.f(v.rec, recto(K, O, [V[0] - O[0], V[1] - O[1]], [Q[0] - O[0], Q[1] - O[1]], 'lo'));
    return h + K.f(v.cierra, K.l(Q[0], Q[1], U[0], U[1], 'ls d') + K.t(332, 18, 'p + q = u', 's ta', 'end'));
  };
  const P3b = pl({ x0: -3, x1: 4, y0: -3, y1: 3 }, 140, 110, 26);
  const hazPartes = (v, K) => {
    const O = [P3b.ox, P3b.oy], U = P2(P3b, [3, -1]), V = P2(P3b, [1, 1]), Q = P2(P3b, [v.x, v.y]);
    let h = pap(K, P3b) + recta(K, P3b, [0, 0], [1, 1], 'lm d') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] + 8, U[1] + 4, 'u', 's tf', 'start');
    h += K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 8, V[1] - 4, 'v', 's tg', 'start');
    return h + (v.x || v.y ? K.ar(O[0], O[1], Q[0], Q[1], 'la gr') : '') + K.t(332, 18, `q = (${sg(v.x)}, ${sg(v.y)})`, 's ta', 'end');
  };

  // 4 · el punto más cercano: recta por el origen con d = (3, 4) y Q = (−1, 7); luego la recta por A = (4, −3)
  const P4 = pl({ x0: -3, x1: 8, y0: -4, y1: 8 }, 130, 154, 16);
  const cerca = (v, K) => {
    const A = v.mueve ? [4, -3] : [0, 0], Fq = v.mueve ? [7, 1] : [3, 4], Q = P2(P4, [-1, 7]), F = P2(P4, Fq), Ap = P2(P4, A), G = P2(P4, [A[0] + 1.6 * 3, A[1] + 1.6 * 4]);
    let h = pap(K, P4) + recta(K, P4, A, [3, 4], 'lm gr') + K.c(Ap[0], Ap[1], 4, 'fk') + K.t(Ap[0] + 8, Ap[1] + 4, v.mueve ? 'A' : 'O', 's', 'start');
    h += K.c(Q[0], Q[1], 5, 'fk') + K.t(Q[0] + 8, Q[1] + 4, 'Q', 's', 'start');
    h += K.f(v.pie, K.l(Q[0], Q[1], F[0], F[1], 'la gr') + K.c(F[0], F[1], 5, 'fo') + recto(K, F, [3, -4], [Q[0] - F[0], Q[1] - F[1]]));
    return h + K.f(v.otro, K.l(Q[0], Q[1], G[0], G[1], 'lf d') + K.c(G[0], G[1], 4, 'ff') + K.t(8, 18, 'otro punto: más lejos', 's tf', 'start'));
  };
  const P4b = pl({ x0: -5, x1: 4, y0: -2, y1: 7 }, 180, 160, 20);
  const hazCerca = (v, K) => {
    const Q = P2(P4b, [-1, 4]), A = P2(P4b, [-4, -1]), E = P2(P4b, [-4 + v.t, -1 + v.t]);
    return pap(K, P4b) + recta(K, P4b, [-4, -1], [1, 1], 'lm gr') + K.c(A[0], A[1], 4, 'fk') + K.t(A[0] + 8, A[1] + 12, 'A', 's', 'start')
      + K.c(Q[0], Q[1], 5, 'fk') + K.t(Q[0] - 8, Q[1] - 6, 'Q', 's', 'end') + K.l(Q[0], Q[1], E[0], E[1], 'la d')
      + K.t(332, 18, `E = (${sg(-4 + v.t)}, ${sg(-1 + v.t)})`, 's ta', 'end');
  };

  // Problema: la caja en la rampa de 30°
  const rampa = (v, K) => {
    const A = [40, 210], B = [300, 210], C = [300, 210 - 260 * Math.tan(30 * R)], M = [170, 210 - 130 * Math.tan(30 * R)], e = [Math.cos(30 * R), -Math.sin(30 * R)], nn = [e[1], -e[0]];
    const caja = [[-16, 0], [16, 0], [16, 26], [-16, 26]].map(([a, b]) => [M[0] + a * e[0] + b * nn[0], M[1] + a * e[1] + b * nn[1]]);
    let h = K.p([A, B, C], 'fc') + K.l(A[0], A[1], C[0], C[1], 'lm gr') + K.ang(A, B, C, 26, '30°', 'fn', 's tm');
    const c = [M[0] + 13 * nn[0], M[1] + 13 * nn[1]];
    h += K.p(caja, 'fk') + K.ar(c[0], c[1], c[0], c[1] + 96, 'lf gr') + K.t(c[0] + 8, c[1] + 92, 'peso 50 N', 's tf', 'start');
    h += K.ar(c[0], c[1], c[0] - 70 * e[0], c[1] - 70 * e[1], 'lg gr d') + K.t(c[0] - 76 * e[0] - 6, c[1] - 76 * e[1] - 6, 'rampa abajo', 's tg', 'end');
    return h + K.t(332, 18, `a lo largo: ${v.r} N`, 's ta', 'end');
  };

  xpLec('geo-15', [
    ['La sombra bajo una luz perpendicular',
      xpMira('dibujo', 'Si la luz cae **perpendicular** a la recta de $\\vec v$, la sombra de $\\vec u$ sobre esa recta es su **proyección ortogonal**.', { dib: sombra, v: { th: 55, luz: 0, som: 0, pr: 0, cm: 0 }, alto: 230 }, [
        ['Una flecha u y la recta de v. Imagina una luz que cae perpendicular a esa recta.', { luz: 1 }],
        ['La punta de u deja una sombra en el pie de la perpendicular. Esa sombra es la proyección de u sobre v.', { som: 1, pr: 1 }, '$\\operatorname{proy}_{\\vec v}\\vec u$'],
        ['Su largo con signo es la componente escalar: en el triángulo rectángulo, ‖u‖ cos θ.', { cm: 1 }, '$\\operatorname{comp}_{\\vec v}\\vec u = \\|\\vec u\\|\\cos\\theta$'],
        ['Si el ángulo es obtuso, la sombra cae al revés de v y la componente es negativa.', { th: 125 }, '$\\cos 125^{\\circ} < 0$'],
        ['Si u es perpendicular a v, no hay sombra: la proyección es el vector nulo.', { th: 90 }, '$\\operatorname{proy}_{\\vec v}\\vec u = \\vec 0$'],
        ['Si u ya está sobre la recta de v, su sombra es u misma.', { th: 0 }],
      ], 'La proyección de u sobre v es su sombra bajo una luz perpendicular a la recta de v; su largo con signo es ‖u‖ cos θ.'),
      xpHaz('dibujo', 'Arrastra la marca hasta donde llega la **sombra** de $\\vec u$ sobre la recta de $\\vec v$.', { dib: hazSombra, v: { x: 2 }, metas: { x: -3 }, alto: 230,
        manijas: [{ k: 'x', min: -6, max: 6, paso: 1, en: v => [O1[0] + v.x * U1, O1[1]], de: x => (x - O1[0]) / U1 }],
        lee: v => `Tu sombra llega a $${v.x}$`,
        dice: v => (v.x === -3 ? 'Justo: la sombra cae del lado contrario a v, en −3.' : v.x === 3 ? 'Ese es el largo, pero u apunta hacia la izquierda: la sombra cae al revés de v.'
          : v.x === 5 ? 'Ese es el largo de u, no el de su sombra.' : 'Baja derecho desde la punta de u, en ángulo recto con la recta.') },
        'La sombra de u cae en −3: componente negativa, porque el ángulo con v es obtuso.')],
    ['La cuenta de la sombra',
      xpMira('dibujo', 'El producto escalar ya trae escondida la sombra: de ahí salen la **componente** y la **proyección**.', { dib: cuenta, v: { k: 1, som: 0, pr: 0 }, alto: 232 }, [
        ['u forma un ángulo θ con v. La sombra de u mide ‖u‖ cos θ.', { som: 1 }, '$\\operatorname{comp}_{\\vec v}\\vec u = \\|\\vec u\\|\\cos\\theta$'],
        ['Como u·v = ‖u‖‖v‖ cos θ, basta dividir el producto escalar entre ‖v‖.', {}, '$\\operatorname{comp}_{\\vec v}\\vec u = \\dfrac{\\vec u \\cdot \\vec v}{\\|\\vec v\\|} = \\dfrac{12}{\\sqrt 8}$'],
        ['Para tener la flecha, ese largo va en la dirección de v: se multiplica por v/‖v‖.', { pr: 1 }, '$\\operatorname{proy}_{\\vec v}\\vec u = \\dfrac{\\vec u \\cdot \\vec v}{\\|\\vec v\\|^2}\\,\\vec v = \\tfrac{12}{8}\\,(2, 2) = (3, 3)$'],
        ['Si v mide el doble, u·v se duplica y ‖v‖² se cuadruplica: la sombra no cambia.', { k: 2 }, '$\\tfrac{24}{32}\\,(4, 4) = (3, 3)$'],
        ['Si v apunta al revés, la componente cambia de signo, pero la flecha sombra es la misma.', { k: -1 }, '$\\tfrac{-12}{8}\\,(-2, -2) = (3, 3)$'],
        ['Solo importa la recta de v: su largo y su sentido se cancelan en la cuenta.', { k: 1 }],
      ], 'comp = u·v / ‖v‖ (con signo) y proy = (u·v / ‖v‖²)·v, que no cambia si v se estira o se voltea.'),
      xpHaz('dibujo', 'Con $\\vec u = (5, 1)$ y $\\vec v = (1, -1)$, elige el número que multiplica a $\\vec v$ en $\\operatorname{proy}_{\\vec v}\\vec u$.', { dib: hazCuenta, v: { c: 0 }, metas: { c: 2 }, alto: 200,
        manijas: [{ k: 'c', min: -3, max: 3, paso: 0.5, et: 'el número que multiplica a v' }],
        lee: v => `$\\tfrac{\\vec u \\cdot \\vec v}{\\|\\vec v\\|^2} = \\tfrac{4}{2}$; tu número: $${v.c}$`,
        dice: v => (v.c === 2 ? 'Justo: u·v = 4 y ‖v‖² = 2, así que la sombra es 2v = (2, −2).' : v.c === -2 ? 'El signo: u·v es positivo, la sombra apunta como v.' : 'Calcula u·v y divídelo entre ‖v‖², sin raíz.') },
        'u·v = 5 − 1 = 4 y ‖v‖² = 2: la proyección es 2v = (2, −2).')],
    ['Paralela más perpendicular',
      xpMira('dibujo', 'Lo que la sombra no recoge forma **ángulo recto** con $\\vec v$: así toda flecha se parte en dos.', { dib: partes, v: { p: 0, q: 0, rec: 0, cierra: 0 }, alto: 222 }, [
        ['Toda flecha u se puede partir en una parte sobre la recta de v y otra en ángulo recto con ella.', {}],
        ['La parte paralela es la sombra: p = proy de u sobre v.', { p: 1 }, '$\\vec p = \\tfrac{25}{25}\\,(3, 4) = (3, 4)$'],
        ['La otra es lo que sobra: q = u − p.', { q: 1 }, '$\\vec q = (7, 1) - (3, 4) = (4, -3)$'],
        ['q es perpendicular a v: su producto escalar con v da 0.', { rec: 1 }, '$(4, -3)\\cdot(3, 4) = 12 - 12 = 0$'],
        ['Juntas cierran un rectángulo: p + q = u. Y solo hay una manera de partir u así.', { cierra: 1 }, '$\\vec u = \\vec p + \\vec q$'],
        ['En una rampa el peso se parte igual: una parte lo hace resbalar y la otra lo aprieta.', {}],
      ], 'u = proy + (u − proy): la primera parte va sobre la recta de v y la segunda es perpendicular a v.'),
      xpHaz('dibujo', 'Con $\\vec u = (3, -1)$ y $\\vec v = (1, 1)$, arrastra la punta de la parte $\\vec q$ **perpendicular** a $\\vec v$.', { dib: hazPartes, v: { x: 0, y: 1 }, metas: { x: 2, y: -2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-3, -3], max: [4, 3], paso: 1, en: v => P2(P3b, [v.x, v.y]), de: (x, y) => [(x - P3b.ox) / P3b.u, (P3b.oy - y) / P3b.u] }],
        lee: v => `$\\vec q \\cdot \\vec v = ${v.x + v.y}$`,
        dice: v => (v.x === 2 && v.y === -2 ? 'Justo: la sombra es (1, 1) y lo que sobra, (2, −2), cumple (2, −2)·(1, 1) = 0.' : v.x === 1 && v.y === 1 ? 'Esa es la parte paralela; falta la perpendicular.'
          : v.x === -2 && v.y === 2 ? 'Apunta al revés: eso es p − u, no u − p.' : 'Primero la sombra sobre v; luego réstala de u.') },
        'La sombra es (2/2)·(1, 1) = (1, 1) y lo que sobra es (3, −1) − (1, 1) = (2, −2).')],
    ['El punto más cercano',
      xpMira('dibujo', '¿Qué punto de una recta queda más **cerca** de un punto de afuera? El pie de la perpendicular: otra vez una sombra.', { dib: cerca, v: { pie: 0, otro: 0, mueve: 0 }, alto: 236 }, [
        ['Una recta que pasa por el origen con dirección d = (3, 4), y un punto Q afuera.', {}],
        ['El punto más cercano es el pie de la perpendicular desde Q.', { pie: 1 }],
        ['Si la recta pasa por el origen, ese pie es la proyección de Q sobre d.', {}, '$\\tfrac{(-1, 7)\\cdot(3, 4)}{25}\\,(3, 4) = (3, 4)$'],
        ['Otro punto de la recta queda más lejos: es la hipotenusa de un triángulo rectángulo.', { otro: 1 }],
        ['Si la recta pasa por A, se pone el origen en A: se proyecta Q − A y se le suma A.', { mueve: 1, otro: 0 }, '$t = \\dfrac{(Q - A)\\cdot \\vec d}{\\|\\vec d\\|^2} = \\tfrac{25}{25} = 1$'],
        ['En el espacio es la misma cuenta, con tres coordenadas en cada producto.', {}, '$A + t\\,\\vec d = (7, 1)$'],
      ], 'El punto de A + t·d más cercano a Q tiene t = (Q − A)·d / ‖d‖²; si la recta pasa por el origen, es proy de Q.'),
      xpHaz('dibujo', 'La recta pasa por $A = (-4, -1)$ con dirección $\\vec d = (1, 1)$. Arrastra **E** al punto más cercano a $Q = (-1, 4)$.', { dib: hazCerca, v: { t: 1 }, metas: { t: 4 }, alto: 210,
        manijas: [{ k: 't', min: 0, max: 7, paso: 0.5, en: v => P2(P4b, [-4 + v.t, -1 + v.t]), de: (x, y) => (((x - P4b.ox) / P4b.u + 4) + ((P4b.oy - y) / P4b.u + 1)) / 2 }],
        lee: v => `$(Q - E)\\cdot \\vec d = ${r2(dot([-1 - (-4 + v.t), 4 - (-1 + v.t)], [1, 1]))}$`,
        dice: v => (v.t === 4 ? 'Justo: (Q − A)·d = 8 y ‖d‖² = 2, así que t = 4 y E = (0, 3).' : v.t === 1.5 ? 'Proyectaste Q sin restar A: pon antes el origen en A.' : 'Busca el pie de la perpendicular que baja desde Q.') },
        'Q − A = (3, 5), (3, 5)·(1, 1) = 8 y ‖d‖² = 2: t = 4, así que E = (0, 3).')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una caja de **50 N** está en una rampa que sube **30°**. ¿Cuántos newtons de su peso van **a lo largo** de la rampa, rampa abajo?', { dib: rampa, v: { r: 0 }, metas: { r: 25 }, alto: 240,
        manijas: [{ k: 'r', min: 0, max: 60, paso: 5, et: 'parte del peso a lo largo de la rampa, N' }],
        lee: v => `$50 \\cos 60^{\\circ} = 25$; tu valor: $${v.r}$`,
        dice: v => (v.r === 25 ? 'Justo: el peso y la rampa abajo forman 60°, y 50·cos 60° = 25 N.' : v.r === 50 ? 'Ese es todo el peso; solo una parte va por la rampa.' : 'El peso apunta abajo y la rampa baja a 30°: entre ellos hay 60°.') },
        'La componente del peso a lo largo de la rampa es 50·cos 60° = 25 N; la que aprieta, 50·cos 30° ≈ 43 N.')],
  ], 'La proyección es la sombra bajo una luz perpendicular: (u·v / ‖v‖²)·v; lo que sobra es perpendicular y da el punto más cercano.');
}
