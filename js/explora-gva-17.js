// Geometría Vectorial · explicación de geo-17 «Producto vectorial» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: u × v es la flecha perpendicular a los dos (mano derecha) cuyo tamaño es el área del paralelogramo; luego la
// cuenta con el determinante, las propiedades y el triple producto como volumen. Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 100) / 100);
  const tupla = a => `(${a.map(sg).join(', ')})`;
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const nor = a => Math.sqrt(dot(a, a));
  const suma = (...vs) => [0, 1, 2].map(i => vs.reduce((s, v) => s + v[i], 0));
  const por = (k, a) => a.map(x => x * k);
  const at = (o, r, g) => [o[0] + r * Math.cos(g * R), o[1] - r * Math.sin(g * R)];
  const k = v => Math.round(v.k);
  const ejes = (K, o, u, L = 4, Ln = 2) => {
    const I = (x, y, z) => K.iso(o, u, x, y, z);
    let h = '';
    [[[L, 0, 0], [-Ln, 0, 0], 'x'], [[0, L, 0], [0, -Ln, 0], 'y'], [[0, 0, L], [0, 0, -Ln], 'z']].forEach(([a, b, s]) => {
      const A = I(...a), B = I(...b);
      h += K.l(o[0], o[1], B[0], B[1], 'lm d') + K.ar(o[0], o[1], A[0], A[1], 'lm') + K.t(A[0] + (s === 'y' ? -8 : 8), A[1] + (s === 'z' ? -4 : 4), s, 's tm', s === 'y' ? 'end' : 'start');
    });
    return h;
  };
  const curva = (K, I, a, b, r, cls) => {
    const ua = por(1 / nor(a), a), ub = por(1 / nor(b), b), pts = [];
    for (let j = 0; j <= 12; j++) { const t = j / 12, q = suma(por(1 - t, ua), por(t, ub)); pts.push(I(...por(r / nor(q), q))); }
    return K.pl(pts.slice(0, -1), cls) + K.ar(...pts.at(-3), ...pts.at(-1), cls);
  };
  const caja = (K, I, a, b, w, cls) => {
    const z = [0, 0, 0];
    return [[z, a, suma(a, b), b], [w, suma(a, w), suma(a, b, w), suma(b, w)], [z, a, suma(a, w), w], [b, suma(a, b), suma(a, b, w), suma(b, w)], [z, b, suma(b, w), w], [a, suma(a, b), suma(a, b, w), suma(a, w)]]
      .map(c => K.p(c.map(q => I(...q)), cls)).join('');
  };
  const rueda = (K, C, r) => {
    let h = K.arc(...C, r, 0, 360, 'lm');
    [90, -30, 210].forEach((g, i) => {
      const b = g - 120;
      h += K.arc(...C, r, b + 16, g - 16, 'la') + K.ar(...at(C, r, b + 24), ...at(C, r, b + 16), 'la');
      const T = at(C, r, g); h += K.c(...T, 10, 'fn') + K.t(T[0], T[1] + 4, ['î', 'ĵ', 'k̂'][i], 's ta');
    });
    return h;
  };

  // 1 · u = (3, 0, 0) y v = (1, 3, 0) en el piso; u × v = (0, 0, 9) sube.   v { k }
  const O1 = [150, 140], U1 = 16, I1 = (...q) => XPK.iso(O1, U1, ...q);
  const u1 = [3, 0, 0], v1 = [1, 3, 0];
  const perp = (v, K) => {
    const q = k(v), U = I1(...u1), V = I1(...v1);
    let h = ejes(K, O1, U1, 4.5, 2);
    if (q >= 1) h += K.p([O1, U, I1(...suma(u1, v1)), V], 'fa');
    h += K.ar(...O1, ...U, 'lg gr') + K.ar(...O1, ...V, 'lf gr') + K.t(U[0] + 4, U[1] + 16, 'u', 's tg', 'start') + K.t(V[0] - 6, V[1] - 4, 'v', 's tf', 'end');
    if (q >= 2) { const W = I1(0, 0, 5); h += K.ar(...O1, ...W, 'la gr') + K.t(W[0] - 8, W[1] + 10, 'u × v', 's ta', 'end'); }
    if (q >= 3) h += curva(K, I1, u1, v1, 1.8, 'lo');
    if (q === 4) { const W = I1(0, 0, -5); h += K.ar(...O1, ...W, 'lf gr d') + K.t(W[0] + 8, W[1], 'v × u', 's tf', 'start'); }
    h += K.t(8, 18, `u = ${tupla(u1)}`, 's tg', 'start') + K.t(8, 36, `v = ${tupla(v1)}`, 's tf', 'start');
    if (q >= 2 && q < 5) h += K.t(8, 54, `u × v = ${tupla(cruz(u1, v1))}`, 's ta', 'start');
    if (q >= 5) h += rueda(K, [284, 64], 32) + K.t(284, 122, 'î × ĵ = k̂', 's tm') + K.t(284, 140, 'ĵ × k̂ = î', 's tm') + K.t(284, 158, 'k̂ × î = ĵ', 's tm');
    return h;
  };
  // Tu turno: ¿hacia dónde apunta î × k̂?   v { d }
  const DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], DL = ['+x', '−x', '+y', '−y', '+z', '−z'];
  const O1b = [170, 100], U1b = 26, I1b = (...q) => XPK.iso(O1b, U1b, ...q);
  const hazBase = (v, K) => {
    const A = I1b(1, 0, 0), B = I1b(0, 0, 1), W = I1b(...por(1.6, DIRS[v.d]));
    return ejes(K, O1b, U1b, 2.6, 1.8) + K.ar(...O1b, ...A, 'lg gr') + K.t(A[0] + 2, A[1] + 16, 'î', 's tg') + K.ar(...O1b, ...B, 'lf gr') + K.t(B[0] - 8, B[1], 'k̂', 's tf', 'end')
      + K.ar(...O1b, ...W, 'la gr') + K.t(8, 18, '¿î × k̂?', 's ta', 'start');
  };

  // 2 · el área: ‖u‖ = 3, ‖v‖ = 2, área 6 sen θ.   v { th, k }
  const O2 = [120, 170], S2 = 36;
  const area = (v, K) => {
    const q = k(v), U = [O2[0] + 3 * S2, O2[1]], V = at(O2, 2 * S2, v.th), W = [U[0] + V[0] - O2[0], U[1] + V[1] - O2[1]];
    let h = q >= 2 ? K.p([O2, U, V], 'fa') + K.p([U, W, V], 'fn') : K.p([O2, U, W, V], 'fa');
    h += K.ar(...O2, ...U, 'lg gr') + K.ar(...O2, ...V, 'lf gr') + K.t((O2[0] + U[0]) / 2, O2[1] + 18, '‖u‖ = 3', 's tg');
    if (v.th > 1) h += K.arc(...O2, 18, 0, v.th, 'lm') + K.t(...at(O2, 30, v.th / 2).map((z, i) => z + (i ? 4 : 0)), 'θ', 's tm');
    if (q >= 1 && v.th > 1) h += K.l(V[0], V[1], V[0], O2[1], 'lf d') + (q < 2 ? K.t(V[0] + 6, (V[1] + O2[1]) / 2, '2 sen θ', 's tf', 'start') : '');
    const A = 6 * Math.sin(v.th * R);
    h += K.t(8, 18, `θ = ${Math.round(v.th)}°`, 's tm', 'start') + K.t(332, 18, q >= 2 ? `triángulo = ${fm(A / 2)}` : `área = 3 · 2 · sen θ = ${fm(A)}`, 's ta', 'end');
    return h;
  };
  const hazArea = (v, K) => {
    const U = [O2[0] + 3 * S2, O2[1]], V = at(O2, 2 * S2, v.th), W = [U[0] + V[0] - O2[0], U[1] + V[1] - O2[1]];
    return K.p([O2, U, W, V], 'fa') + K.ar(...O2, ...U, 'lg gr') + K.ar(...O2, ...V, 'lf gr') + K.t(8, 18, 'meta: 3√3 ≈ 5.2', 's tm', 'start')
      + K.t(332, 18, `área = ${fm(6 * Math.sin(v.th * R))}`, 's ta', 'end');
  };

  // 3 · el determinante de u = (1, 3, −1) y v = (2, 0, 4): (12, −6, −6).   v { k }
  const det = (K, u, v, tapa = -1) => {
    const X = [44, 94, 144], Y = [62, 98, 134];
    let h = K.l(22, 44, 22, 150, 'lm gr') + K.l(166, 44, 166, 150, 'lm gr');
    if (tapa >= 0) h += K.r(X[tapa] - 20, 44, 40, 106, 'fn', 6);
    const op = j => (j === tapa ? 'tm' : '');
    ['î', 'ĵ', 'k̂'].forEach((s, j) => { h += K.t(X[j], Y[0], s, `ta ${op(j)}`); });
    u.forEach((x, j) => { h += K.t(X[j], Y[1], sg(x), j === tapa ? 'tm' : 'tg'); });
    v.forEach((x, j) => { h += K.t(X[j], Y[2], sg(x), j === tapa ? 'tm' : 'tf'); });
    return h;
  };
  const u3 = [1, 3, -1], v3 = [2, 0, 4];
  const cuenta = (v, K) => {
    const q = k(v);
    let h = det(K, u3, v3, q >= 1 && q <= 3 ? q - 1 : -1) + K.t(8, 22, 'u × v =', 's tm', 'start');
    const L = ['î: 3·4 − (−1)·0 = 12', 'ĵ: −(1·4 − (−1)·2) = −6', 'k̂: 1·0 − 3·2 = −6'];
    L.forEach((s, i) => { if (q > i) h += K.t(180, 62 + 36 * i, s, 's ta', 'start'); });
    if (q >= 4) h += K.t(8, 180, 'u · (u × v) = 12 − 18 + 6 = 0 ✓', 's to', 'start') + K.t(8, 198, 'v · (u × v) = 24 + 0 − 24 = 0 ✓', 's to', 'start');
    return h;
  };
  const slot3 = i => ({ x: 280, y: 50 + 48 * i, w: 70, h: 36 });

  // 4 · propiedades y la caja de u = (2, 0, 0), v = (1, 3, 0), w = (1, 1, 2): volumen 12.   v { k }
  const O4 = [130, 204], U4 = 24, I4 = (...q) => XPK.iso(O4, U4, ...q);
  const u4 = [2, 0, 0], v4 = [1, 3, 0], w4 = [1, 0, 2];
  const props = (v, K) => {
    const q = k(v);
    if (q <= 1) {
      let h = K.t(8, 26, 'v × u = −(u × v)', 's ta', 'start') + K.t(8, 50, 'u × u = 0', 's ta', 'start') + K.t(8, 74, 'u × (v + w) = u × v + u × w', 's ta', 'start') + K.t(8, 98, '(r u) × v = r (u × v)', 's ta', 'start');
      if (q === 1) h += K.t(8, 140, '(î × î) × ĵ = 0 × ĵ = 0', 's tf', 'start') + K.t(8, 164, 'î × (î × ĵ) = î × k̂ = −ĵ', 's tf', 'start') + K.t(8, 194, 'no es asociativo', 's tm', 'start') + rueda(K, [282, 150], 34);
      return h;
    }
    const w = q >= 5 ? [1, 0, 0.15] : w4;
    let h = caja(K, I4, u4, v4, w, q >= 5 ? 'ff' : 'fn');
    if (q >= 3) h += K.p([O4, I4(...u4), I4(...suma(u4, v4)), I4(...v4)], 'fa');
    h += K.ar(...O4, ...I4(...u4), 'la gr') + K.ar(...O4, ...I4(...v4), 'la gr') + K.ar(...O4, ...I4(...w), 'lg gr');
    if (q >= 3 && q < 5) { const N = I4(0, 0, 3), W = I4(...w4), B = I4(w4[0], w4[1], 0); h += K.ar(...O4, ...N, 'lo gr') + K.t(N[0] - 6, N[1], 'u × v', 's to', 'end') + K.l(...W, ...B, 'lf d'); }
    h += K.t(332, 18, `u = ${tupla(u4)}`, 's ta', 'end') + K.t(332, 36, `v = ${tupla(v4)}`, 's ta', 'end') + K.t(332, 54, q >= 5 ? 'w en el plano' : `w = ${tupla(w4)}`, 's tg', 'end');
    if (q >= 3 && q < 5) h += K.t(332, 76, 'base ‖u × v‖ = 6, altura 2', 's tm', 'end');
    if (q >= 4 && q < 5) h += K.t(332, 96, 'u · (v × w) = 12', 's to', 'end');
    if (q >= 5) h += K.t(332, 76, 'triple producto 0: coplanares', 's tf', 'end');
    return h;
  };
  // Tu turno: c que deja coplanares a (1, 1, 0), (0, 2, 1) y (2, c, 1).   v { c }
  const O4b = [170, 180], U4b = 18, I4b = (...q) => XPK.iso(O4b, U4b, ...q);
  const a4 = [1, 1, 0], b4 = [0, 2, 1], wc = c => [2, c, 1];
  const hazCop = (v, K) => {
    const d = dot(a4, cruz(b4, wc(v.c)));
    return caja(K, I4b, a4, b4, wc(v.c), d === 0 ? 'ff' : 'fa') + K.t(8, 18, `w = (2, ${v.c}, 1)`, 's tg', 'start') + K.t(332, 18, `u · (v × w) = ${sg(d)}`, 's ta', 'end');
  };

  // Problema: la vela A(1, 0, 1), B(3, 2, 1), C(1, 1, 3).   v { a }
  const O5 = [160, 186], U5 = 40, I5 = (...q) => XPK.iso(O5, U5, ...q);
  const A5 = [1, 0, 1], B5 = [3, 2, 1], C5 = [1, 1, 3];
  const vela = (v, K) => {
    const P = [A5, B5, C5].map(q => I5(...q));
    return ejes(K, O5, U5, 3.5, 0.6) + K.p(P, 'fa') + P.map((q, i) => K.c(...q, 4, 'fk') + K.t(q[0] + 8, q[1] + 4, ['A', 'B', 'C'][i], 's', 'start')).join('')
      + K.t(8, 18, 'A(1, 0, 1)  B(3, 2, 1)  C(1, 1, 3)', 's tm', 'start') + K.t(332, 40, `tu área: ${fm(v.a)} m²`, 's ta', 'end');
  };

  xpLec('geo-17', [
    ['Una flecha perpendicular a las dos',
      xpMira('dibujo', 'El **producto vectorial** de dos vectores del espacio no es un número: es otro vector.', { dib: perp, v: { k: 0 }, alto: 236 }, [
        ['Aquí u y v están en el piso. Dos vectores que no son paralelos abren un plano.', { k: 1 }],
        ['Hay una sola dirección perpendicular a ese plano. u × v es una flecha en esa dirección.', { k: 2 }, '$\\vec u \\times \\vec v \\perp \\vec u, \\quad \\vec u \\times \\vec v \\perp \\vec v$'],
        ['¿Arriba o abajo? Curva los dedos de la mano derecha de u hacia v: el pulgar marca u × v.', { k: 3 }],
        ['Si cambias el orden, los dedos giran al revés y el pulgar baja: v × u es la flecha opuesta.', { k: 4 }, '$\\vec v \\times \\vec u = -(\\vec u \\times \\vec v)$'],
        ['Con la base va en ciclo: î × ĵ = k̂. En contra del ciclo sale el menos.', { k: 5 }, '$\\hat\\imath \\times \\hat\\jmath = \\hat k, \\quad \\hat\\jmath \\times \\hat k = \\hat\\imath, \\quad \\hat k \\times \\hat\\imath = \\hat\\jmath$'],
      ], 'u × v es perpendicular a u y a v; su sentido lo da la mano derecha, de u hacia v. Cambiar el orden lo voltea.'),
      xpHaz('dibujo', '¿Hacia dónde apunta $\\hat\\imath \\times \\hat k$? Mueve la regla hasta la dirección correcta.', { dib: hazBase, v: { d: 4 }, metas: { d: 3 }, alto: 220,
        manijas: [{ k: 'd', min: 0, max: 5, paso: 1, et: 'dirección', rot: v => DL[v.d] }],
        dice: v => (v.d === 3 ? 'Sí: k̂ × î = ĵ, y al cambiar el orden, î × k̂ = −ĵ.' : v.d === 2 ? 'Ese es k̂ × î. Aquí el orden es î × k̂: en contra del ciclo.' : 'Tiene que ser perpendicular a î y a k̂: va por el eje y.') },
      '$\\hat\\imath \\times \\hat k = -(\\hat k \\times \\hat\\imath) = -\\hat\\jmath$.')],
    ['El tamaño es un área',
      xpMira('dibujo', 'El largo de u × v también dice algo: es el **área del paralelogramo** que forman u y v.', { dib: area, v: { th: 60, k: 0 }, alto: 214 }, [
        ['Aquí ‖u‖ = 3 y ‖v‖ = 2, con un ángulo θ entre ellos. Ellos dos arman un paralelogramo.', {}],
        ['Su base es ‖u‖ y su altura es ‖v‖ sen θ: el área es ‖u‖‖v‖ sen θ.', { k: 1 }, '$\\|\\vec u \\times \\vec v\\| = \\|\\vec u\\|\\,\\|\\vec v\\| \\sin\\theta$'],
        ['Si se abren a 90°, la altura es todo ‖v‖: el área es la máxima, 3 · 2 = 6.', { th: 90, k: 1 }],
        ['Si se cierran, el área se achica; si son paralelos, no encierran nada: u × v = 0.', { th: 0, k: 1 }, '$\\vec u \\parallel \\vec v \\iff \\vec u \\times \\vec v = \\vec 0$'],
        ['Un triángulo con esos dos lados es medio paralelogramo: su área es ½‖u × v‖.', { th: 60, k: 2 }, '$\\tfrac12 \\cdot 3 \\cdot 2 \\cdot \\sin 60^{\\circ} \\approx 2.6$'],
      ], '‖u × v‖ = ‖u‖‖v‖ sen θ es el área del paralelogramo de u y v; el triángulo es la mitad y los paralelos dan 0.'),
      xpHaz('dibujo', 'Con $\\|\\vec u\\| = 3$ y $\\|\\vec v\\| = 2$, abre $\\vec v$ hasta que el área sea $3\\sqrt 3$.', { dib: hazArea, v: { th: 90 }, sol: { th: 60 }, alto: 214,
        cumple: v => Math.abs(6 * Math.sin(v.th * R) - 3 * Math.sqrt(3)) < 1e-6,
        manijas: [{ k: 'th', min: 0, max: 180, paso: 15, en: v => at(O2, 2 * S2, v.th), de: (x, y) => { const g = Math.atan2(O2[1] - y, x - O2[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
        dice: v => (Math.abs(6 * Math.sin(v.th * R) - 3 * Math.sqrt(3)) < 1e-6 ? 'Justo: sen θ = √3/2, y también valdría el otro ángulo.' : 'Busca sen θ = 3√3/6 = √3/2.') },
      '$6\\sin\\theta = 3\\sqrt 3$ da $\\sin\\theta = \\tfrac{\\sqrt 3}{2}$: $\\theta = 60^{\\circ}$ o $120^{\\circ}$.')],
    ['La cuenta con el determinante',
      xpMira('dibujo', 'Con coordenadas, u × v sale de un **determinante** con î, ĵ, k̂ en la primera fila.', { dib: cuenta, v: { k: 0 }, alto: 210 }, [
        ['Arriba van î, ĵ, k̂; luego las coordenadas de u; luego las de v.', {}, '$\\vec u \\times \\vec v = \\begin{vmatrix} \\hat\\imath & \\hat\\jmath & \\hat k \\\\ 1 & 3 & -1 \\\\ 2 & 0 & 4 \\end{vmatrix}$'],
        ['Para î se tapa su columna y queda un 2 × 2: 3·4 − (−1)·0 = 12.', { k: 1 }],
        ['Para ĵ se tapa la segunda: 1·4 − (−1)·2 = 6, y esta va con menos: −6.', { k: 2 }],
        ['Para k̂, la tercera: 1·0 − 3·2 = −6. Así u × v = (12, −6, −6).', { k: 3 }],
        ['Se comprueba con el producto escalar: u × v es perpendicular a u y a v, así que los dos dan 0.', { k: 4 }, '$\\vec u \\cdot (\\vec u \\times \\vec v) = 0 = \\vec v \\cdot (\\vec u \\times \\vec v)$'],
      ], 'u × v = (u₂v₃ − u₃v₂, −(u₁v₃ − u₃v₁), u₁v₂ − u₂v₁): se tapa cada columna, el medio con −, y se comprueba con u · (u × v) = 0.'),
      xpHaz('fichas', 'Calcula $(2, 1, 0) \\times (0, 1, 3)$: arrastra cada componente a su lugar.', {
        slots: [0, 1, 2].map(slot3), alto: 190,
        fondo: K => det(K, [2, 1, 0], [0, 1, 3]) + ['î:', 'ĵ:', 'k̂:'].map((e, i) => K.t(slot3(i).x - 44, slot3(i).y + 5, e, 's', 'end')).join(''),
        fichas: ['3', '−6', '2', '6', '−2', '−3'], meta: ['3', '−6', '2'], pista: 'Tapa la columna de cada componente; la del medio va con el signo cambiado.' },
      '$(1 \\cdot 3 - 0 \\cdot 1,\\; -(2 \\cdot 3 - 0 \\cdot 0),\\; 2 \\cdot 1 - 1 \\cdot 0) = (3, -6, 2)$.')],
    ['Propiedades y el triple producto',
      xpMira('dibujo', 'El producto vectorial tiene sus reglas, y combinado con el producto escalar mide **volúmenes**.', { dib: props, v: { k: 0 }, alto: 230 }, [
        ['Cambiar el orden cambia el signo, u × u = 0, se distribuye sobre la suma y los números salen.', {}],
        ['Pero no es asociativo: el lugar del paréntesis cambia el resultado.', { k: 1 }, '$(\\hat\\imath \\times \\hat\\imath) \\times \\hat\\jmath \\ne \\hat\\imath \\times (\\hat\\imath \\times \\hat\\jmath)$'],
        ['Tres vectores u, v, w arman una caja inclinada, un paralelepípedo.', { k: 2 }],
        ['u × v sale de la base y mide su área; el producto escalar con w la multiplica por la altura.', { k: 3 }],
        ['Ese número es el triple producto, el determinante de las tres filas. Su valor absoluto es el volumen.', { k: 4 }, '$\\vec u \\cdot (\\vec v \\times \\vec w) = \\begin{vmatrix} 2 & 0 & 0 \\\\ 1 & 3 & 0 \\\\ 1 & 0 & 2 \\end{vmatrix} = 12$'],
        ['Si da 0, la caja se aplasta: los tres vectores están en un mismo plano, son coplanares.', { k: 5 }],
      ], 'v × u = −u × v, u × u = 0 y no es asociativo. |u · (v × w)| es el volumen de la caja; si es 0, son coplanares.'),
      xpHaz('dibujo', 'Desliza $c$ hasta que $(1, 1, 0)$, $(0, 2, 1)$ y $(2, c, 1)$ queden **coplanares**.', { dib: hazCop, v: { c: 1 }, metas: { c: 4 }, alto: 240,
        manijas: [{ k: 'c', min: 0, max: 6, paso: 1, et: 'c' }],
        dice: v => (v.c === 4 ? 'Coplanares: el triple producto, 4 − c, vale 0.' : 'Todavía hay volumen: el triple producto es 4 − c.') },
      'El determinante de las tres filas es $1(2 - c) - 1(0 - 2) = 4 - c$, que vale 0 si $c = 4$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'La vela triangular de un barco tiene sus esquinas en $A(1, 0, 1)$, $B(3, 2, 1)$ y $C(1, 1, 3)$, en metros. Desliza hasta su **área**.', { dib: vela, v: { a: 1 }, metas: { a: 3 }, alto: 236,
        manijas: [{ k: 'a', min: 0, max: 8, paso: 0.5, et: 'área de la vela, m²' }],
        dice: v => (v.a === 3 ? 'Sí: AB × AC = (4, −4, 2) mide 6, y la vela es la mitad.' : v.a === 6 ? 'Ese es el paralelogramo entero: la vela es un triángulo.' : 'Calcula AB × AC con el determinante y toma la mitad de su norma.') },
      '$(2, 2, 0) \\times (0, 1, 2) = (4, -4, 2)$, de norma 6: la vela mide la mitad, 3 m².')],
  ], 'u × v es perpendicular a los dos y mide el área de su paralelogramo; |u · (v × w)| es el volumen de la caja.');
}
