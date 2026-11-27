// Geometría Vectorial · explicación de geo-2 «El conjunto Rⁿ y el álgebra matricial» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(Math.round(n)).replace('-', '−');
  const par = q => `(${q.map(sg).join(', ')})`;
  const k = v => Math.round(v.k);
  // Matriz con corchetes centrada en (cx, cy); cls(i, j) da la clase de cada entrada.
  const mat = (K, cx, cy, M, { dx = 26, dy = 22, cls = () => '' } = {}) => {
    const n = M[0].length, w = (n - 1) * dx + 24, h = (M.length - 1) * dy + 24, x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
    return K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]])
      + M.map((r, i) => r.map((v, j) => K.t(x0 + 12 + j * dx, y0 + 17 + i * dy, typeof v === 'number' ? sg(v) : v, cls(i, j))).join('')).join('');
  };
  const corch = (K, x0, x1, y0, y1) => K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]]);
  // Plano cuadriculado con origen O y u píxeles por unidad.
  const rej = (K, O, u, [x0, x1], [y0, y1]) => {
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(O[0] + x * u, O[1] - y0 * u, O[0] + x * u, O[1] - y1 * u, x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(O[0] + x0 * u, O[1] - y * u, O[0] + x1 * u, O[1] - y * u, y ? 'ls' : 'lm');
    return h;
  };
  const dentro = (x, y, H) => x > 14 && x < 326 && y > 14 && y < H - 4;

  // ---------------------------------------------------------------- capítulo 1: listas, suma y escalar
  const O1 = [160, 110], P1 = (X, Y) => [O1[0] + 20 * X, O1[1] - 20 * Y];
  const lista = (v, K) => {
    const A = [3 * v.e, 2 * v.e], B = [v.bx, v.by], a = P1(...A), c = [O1[0] + (a[0] - O1[0]) * v.cola, O1[1] + (a[1] - O1[1]) * v.cola], b = [c[0] + 20 * B[0], c[1] - 20 * B[1]];
    let p = rej(K, O1, 20, [-6, 7], [-4, 5]);
    if (v.pt > 0) p += K.f(v.pt, K.c(...a, 5, 'fA') + (dentro(a[0] + 8, a[1] - 10, 204) ? K.t(a[0] + (A[0] < 0 ? -10 : 8), a[1] - 10, par(A), 's ta', A[0] < 0 ? 'end' : 'start') : ''));
    if (v.fl > 0) p += K.f(v.fl, K.ar(...O1, ...a, 'la gr'));
    if (Math.hypot(...B) > 0.1) { const m = [(c[0] + b[0]) / 2 + 10, (c[1] + b[1]) / 2 + 4]; p += K.ar(...c, ...b, 'lg gr') + (dentro(...m, 204) ? K.t(...m, par(B), 's tg', 'start') : ''); }
    if (v.su > 0) { const s = P1(A[0] + B[0], A[1] + B[1]); p += K.f(v.su, K.ar(...O1, ...s, 'lo gr') + K.t(s[0] + 8, s[1] + 16, par([A[0] + B[0], A[1] + B[1]]), 's to', 'start')); }
    if (v.e !== 1 && v.fl > 0) p += K.t(332, 200, `${sg(v.e)}·(3, 2)`, 's ta', 'end');
    // R³: una caja con la esquina en (2, 1, 3).
    const o = [150, 168], I = (x, y, z) => K.iso(o, 26, x, y, z), q = I(2, 1, 3);
    const r3 = K.l(...I(0, 0, 0), ...I(4, 0, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 3, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 0, 5.4), 'lm')
      + K.t(...I(4.4, 0, 0), 'x', 's tm') + K.t(...I(0, 3.4, 0), 'y', 's tm') + K.t(I(0, 0, 5.6)[0], I(0, 0, 5.6)[1], 'z', 's tm')
      + K.pl([I(2, 0, 0), I(2, 1, 0), I(0, 1, 0)], 'lm d') + K.l(...I(2, 1, 0), ...q, 'lm d') + K.ar(...I(0, 0, 0), ...q, 'la gr') + K.c(...q, 5, 'fA') + K.t(q[0] + 10, q[1] - 6, '(2, 1, 3)', 's ta', 'start');
    return K.f(1 - v.r3, p) + K.f(v.r3, r3);
  };
  // Práctica: la punta de la flecha.
  const punta = (v, K) => {
    const u = P1(2, -1), w = P1(1, 2), t = P1(v.x, v.y);
    return rej(K, O1, 20, [-6, 7], [-4, 5]) + K.ar(...O1, ...u, 'lg') + K.t(u[0] + 8, u[1] + 14, '(2, −1)', 's tg', 'start') + K.ar(...O1, ...w, 'lf') + K.t(w[0] - 8, w[1] - 6, '(1, 2)', 's tf', 'end')
      + K.ar(...O1, ...t, 'la gr') + K.t(332, 18, `punta en ${par([v.x, v.y])}`, 's ta', 'end');
  };

  // ---------------------------------------------------------------- capítulo 2: combinaciones lineales
  const O2 = [160, 130], P2 = (X, Y) => [O2[0] + 18 * X, O2[1] - 18 * Y];
  const combina = (u, w, T) => (v, K) => {
    const A = [v.a * u[0], v.a * u[1]], B = [v.b * w[0], v.b * w[1]], S = [A[0] + B[0], A[1] + B[1]], a = P2(...A), c = [O2[0] + (a[0] - O2[0]) * v.cola, O2[1] + (a[1] - O2[1]) * v.cola];
    let h = rej(K, O2, 18, [-7, 8], [-3, 6]);
    if (T) { const t = P2(...T); h += K.r(t[0] - 7, t[1] - 7, 14, 14, 'fg', 2); }
    h += K.ar(...O2, ...P2(...u), 'lm') + K.ar(...O2, ...P2(...w), 'lm') + K.ar(...O2, ...a, 'la gr') + K.ar(...c, c[0] + 18 * B[0], c[1] - 18 * B[1], 'lf gr');
    if (v.su > 0) h += K.f(v.su, K.ar(...O2, ...P2(...S), 'lo gr') + K.c(...P2(...S), 4, 'fo'));
    h = `<svg x="0" y="0" width="340" height="196" viewBox="0 0 340 196">${h}</svg>`;
    return h + K.t(8, 16, `${sg(v.a)}·u = ${par(A)}`, 's ta', 'start') + K.t(332, 16, `${sg(v.b)}·v = ${par(B)}`, 's tf', 'end') + (v.su > 0 ? K.t(332, 188, `suma: ${par(S)}`, 's to', 'end') : '');
  };

  // ---------------------------------------------------------------- capítulo 3: matrices, filas y columnas
  const A3 = [[2, 1, 0], [1, 3, 4]], X3 = [1, 2, 1];
  const tabla = (v, K) => {
    const q = k(v), cx = 120, cy = 62, dx = 36, dy = 28, x0 = cx - (2 * dx + 24) / 2, y0 = cy - (dy + 24) / 2, cxj = j => x0 + 12 + j * dx, cyi = i => y0 + 12 + i * dy;
    const cls = (i, j) => (q === 1 && i === 1 && j === 2 ? 'ta' : q === 3 && i === 0 ? 'ta' : '');
    let h = mat(K, cx, cy, A3, { dx, dy, cls }) + K.t(cx, 18, 'A', 'ta');
    if (q === 0) h += K.t(250, 50, '2 filas', 's') + K.t(250, 72, '3 columnas', 's') + K.t(170, 128, 'una matriz 2 × 3: filas primero', 's tm');
    if (q === 1) h += K.r(x0 - 4, cyi(1) - 12, 2 * dx + 32, 24, 'fn') + K.r(cxj(2) - 14, y0 - 4, 28, dy + 32, 'fn') + K.c(cxj(2), cyi(1), 13, 'fn') + K.t(170, 128, 'fila 2, columna 3: a₂₃ = 4', 's ta');
    if (q >= 2) h += K.t(222, 67, '·') + mat(K, 250, 62, X3.map(n => [n]), { dy: 20, cls: () => 'tg' }) + K.t(250, 18, 'x', 'tg');
    if (q === 2) h += [0, 1, 2].map(j => K.r(cxj(j) - 13, y0 - 2, 26, dy + 28, 'fn')).join('') + K.t(170, 128, '1·(2, 1) + 2·(1, 3) + 1·(0, 4) = (4, 11)', 's') + K.t(170, 154, 'cada número de x pesa su columna', 's tm');
    if (q === 3) h += K.t(170, 128, 'fila 1: 2·1 + 1·2 + 0·1 = 4', 's ta') + K.t(170, 154, 'fila 2: 1·1 + 3·2 + 4·1 = 11', 's');
    if (q === 4) h += K.t(170, 128, '2x₁ + x₂ = 4', 's') + K.t(170, 150, 'x₁ + 3x₂ + 4x₃ = 11', 's') + K.t(170, 180, 'las dos juntas: A·x = b, con b = (4, 11)', 's ta');
    return h;
  };

  // ---------------------------------------------------------------- capítulo 4: el producto AB
  const A4 = [[1, 2], [3, 1]], B4 = [[2, 0, 1], [1, 1, 3]], AB4 = [[4, 2, 7], [7, 1, 6]];
  const producto = (v, K) => {
    const q = k(v), hiA = q === 1 ? 0 : q === 2 ? 1 : -1, hiB = q === 1 ? 0 : q === 2 ? 2 : -1;
    const ver = (i, j) => q >= 3 || (q >= 1 && i === 0 && j === 0) || (q >= 2 && i === 1 && j === 2);
    let h = K.t(60, 18, 'A: 2 × 2', 's tm') + K.t(165, 18, 'B: 2 × 3', 's tm') + K.t(280, 18, 'AB: 2 × 3', 's tm');
    h += mat(K, 60, 56, A4, { cls: i => (i === hiA ? 'ta' : '') }) + mat(K, 165, 56, B4, { cls: (i, j) => (j === hiB ? 'tf' : '') }) + K.t(222, 61, '=');
    h += mat(K, 280, 56, AB4.map((r, i) => r.map((x, j) => (ver(i, j) ? x : '·'))), { cls: (i, j) => ((q === 1 && !i && !j) || (q === 2 && i === 1 && j === 2) ? 'to' : '') });
    if (q === 1) h += K.t(170, 124, 'fila 1 por columna 1: 1·2 + 2·1 = 4', 's');
    if (q === 2) h += K.t(170, 124, 'fila 2 por columna 3: 3·1 + 1·3 = 6', 's');
    if (q === 3) h += K.t(170, 124, '(2 × 2)(2 × 3) = 2 × 3', 'ta') + K.t(170, 150, 'adentro iguales; afuera, el tamaño', 's tm');
    if (q === 4) h += K.t(170, 124, 'BA: (2 × 3)(2 × 2)', 'ta') + K.t(170, 150, '3 no es 2: BA no existe', 's tf');
    if (q === 5) h += K.t(120, 136, 'I =', '', 'end') + mat(K, 152, 132, [[1, 0], [0, 1]], { cls: (i, j) => (i === j ? 'to' : 'tm') }) + K.t(196, 136, 'A·I = I·A = A', 's ta', 'start');
    return h;
  };

  // ---------------------------------------------------------------- fondos de las prácticas con fichas
  const fondoBx = K => K.t(56, 56, 'B =', '', 'end') + mat(K, 90, 52, [[1, 2], [3, 0]]) + K.t(184, 56, 'x =', '', 'end') + mat(K, 210, 52, [[2], [1]])
    + K.t(130, 135, 'B·x =', '', 'end') + corch(K, 140, 200, 88, 172);
  const caja = (K, x, y, m, n, et) => {
    let h = K.r(x, y, n * 10, m * 10, 'fa', 2);
    for (let i = 1; i < m; i++) h += K.l(x, y + i * 10, x + n * 10, y + i * 10, 'lr');
    for (let j = 1; j < n; j++) h += K.l(x + j * 10, y, x + j * 10, y + m * 10, 'lr');
    return h + K.t(x + n * 5, y - 8, et, 's');
  };
  const fondoCD = K => caja(K, 50, 30, 3, 2, 'C: 3 × 2') + caja(K, 150, 40, 2, 5, 'D: 2 × 5') + K.t(60, 125, 'CD:', '', 'end') + K.t(60, 175, 'DC:', '', 'end');
  const fondoPan = K => K.t(130, 16, 'harina', 's tm') + K.t(166, 16, 'queso', 's tm') + K.t(8, 46, 'arepa', 's', 'start') + K.t(8, 70, 'empanada', 's', 'start')
    + mat(K, 148, 52, [[2, 1], [3, 0]], { dx: 36, dy: 24 }) + K.t(196, 57, '·') + mat(K, 226, 52, [[2], [5]], { dy: 24, cls: () => 'tg' }) + K.t(270, 46, 'precio', 's tm', 'start')
    + K.t(130, 140, 'costo =', '', 'end') + corch(K, 140, 200, 96, 180);

  xpLec('geo-2', [
    ['Listas de números',
      xpMira('dibujo', 'Un vector de $\\mathbb{R}^n$ es solo una **lista de n números**. Con dos números se dibuja en el plano.', { dib: lista, v: { pt: 0, fl: 0, e: 1, bx: 0, by: 0, cola: 0, su: 0, r3: 0 }, alto: 204 }, [
        ['La lista (3, 2) es un punto del plano: 3 a la derecha y 2 arriba. Las listas de dos forman R².', { pt: 1 }],
        ['La misma lista se dibuja como una flecha que sale del origen. Punto o flecha: es el mismo vector.', { fl: 1 }],
        ['(3, 2) + (1, −3) suma componente con componente: (4, −1). La segunda flecha sale de la punta de la primera.', { bx: 1, by: -3, cola: 1, su: 1 }],
        ['Un número estira: 2·(3, 2) = (6, 4). Cada componente se multiplica por 2 y la flecha no gira.', { bx: 0, by: 0, cola: 0, su: 0, e: 2 }],
        ['Por −1 la flecha da media vuelta: −(3, 2) = (−3, −2). Restar es sumar el opuesto.', { e: -1 }],
        ['Con tres números, (2, 1, 3), se llega a un punto del espacio: R³. Con n números, Rⁿ, aunque no se dibuje.', { r3: 1 }],
      ], 'Un vector de Rⁿ es una lista de n números; se suma y se estira componente a componente.'),
      xpHaz('dibujo', 'Arrastra la punta de la flecha hasta $(2, -1) + 2 \\cdot (1, 2)$.', { dib: punta, v: { x: -2, y: 1 }, metas: { x: 4, y: 3 }, alto: 204,
        manijas: [{ k: ['x', 'y'], min: [-6, -4], max: [7, 5], paso: 1, en: v => P1(v.x, v.y), de: (x, y) => [(x - O1[0]) / 20, (O1[1] - y) / 20] }],
        lee: v => `$${par([v.x, v.y]).replace(/−/g, '-')}$`, dice: () => 'Primero 2·(1, 2) = (2, 4); después súmale (2, −1) componente a componente.' },
      '$(2, -1) + (2, 4) = (2 + 2,\\; -1 + 4) = (4, 3)$.')],
    ['Combinar dos flechas',
      xpMira('dibujo', 'Con dos flechas y dos números se llega a muchos puntos: eso es una **combinación lineal**.', { dib: combina([3, 1], [1, 2]), v: { a: 1, b: 1, cola: 0, su: 0 }, alto: 196 }, [
        ['Dos flechas fijas: u = (3, 1) y v = (1, 2). ¿A qué puntos se llega usando solo esas dos direcciones?', {}],
        ['Cada una se estira: 1·u queda igual y 2·v se alarga al doble. Los números a y b dicen cuánto.', { b: 2 }],
        ['Ahora 2·v se pone en la punta de u, como dos tramos de un viaje.', { cola: 1 }],
        ['El viaje termina en 1·(3, 1) + 2·(1, 2) = (5, 5). Eso es una combinación lineal de u y v.', { su: 1 }],
        ['Por componentes es un sistema: 3a + b = 5, a + 2b = 5. Hallar a y b da el camino.', {}],
        ['Con a = −1 se recorre u hacia atrás: −1·(3, 1) + 2·(1, 2) = (−1, 3). Los negativos también valen.', { a: -1 }],
      ], 'a·u + b·v estira las dos flechas y las pone en fila; por componentes es un sistema en a y b.'),
      xpHaz('dibujo', 'Con $\\vec u = (1, 1)$ y $\\vec v = (-1, 2)$, mueve $a$ y $b$ hasta llegar al cuadro en $(-1, 5)$.', { dib: combina([1, 1], [-1, 2], [-1, 5]), v: { a: 0, b: 0, cola: 1, su: 1 }, metas: { a: 1, b: 2 }, alto: 290,
        manijas: [{ k: 'a', min: -3, max: 3, paso: 1, et: 'a' }, { k: 'b', min: -3, max: 3, paso: 1, et: 'b' }],
        lee: v => `$${v.a}\\,\\vec u + ${v.b < 0 ? `(${v.b})` : v.b}\\,\\vec v = (${v.a - v.b}, ${v.a + 2 * v.b})$`, dice: () => 'La primera componente da a − b = −1 y la segunda, a + 2b = 5.' },
      '$1 \\cdot (1, 1) + 2 \\cdot (-1, 2) = (-1, 5)$: combinar es estirar cada flecha y ponerlas en fila.')],
    ['Matrices: filas y columnas',
      xpMira('dibujo', 'Una **matriz** es una tabla de números. Multiplicada por un vector, combina sus columnas.', { dib: tabla, v: { k: 0 }, alto: 200 }, [
        ['Esta tabla tiene 2 filas y 3 columnas: es una matriz 2 × 3. Siempre se dicen primero las filas.', {}],
        ['Cada número tiene su dirección, fila y columna. En la fila 2, columna 3, está a₂₃ = 4.', { k: 1 }],
        ['Una matriz por un vector combina sus columnas: x = (1, 2, 1) dice cuánto tomar de cada una. Da (4, 11).', { k: 2 }],
        ['También por filas: cada fila por x, pareja por pareja, y se suma. La fila 1 da 4; la fila 2, 11.', { k: 3 }],
        ['Y al revés: dos ecuaciones con x₁, x₂ y x₃ caben en una sola, A·x = b. A guarda los coeficientes.', { k: 4 }],
      ], 'Una matriz m × n tiene m filas y n columnas; A·x combina sus columnas, y cada componente es una fila por x.'),
      xpHaz('fichas', 'Completa $B\\vec x$ con $\\vec x = (2, 1)$: dos veces la primera columna más una vez la segunda.', {
        slots: [{ x: 170, y: 110, w: 50, h: 36 }, { x: 170, y: 150, w: 50, h: 36 }], alto: 182, fondo: fondoBx,
        fichas: ['5', '4', '7', '6'], meta: ['4', '6'], pista: 'Las columnas de B son (1, 3) y (2, 0): toma la primera dos veces y súmale la segunda.' },
      '$2 \\cdot (1, 3) + 1 \\cdot (2, 0) = (4, 6)$: el vector dice cuánto de cada columna.')],
    ['El producto AB',
      xpMira('dibujo', 'Dos matrices se multiplican **fila por columna**, y solo si sus medidas encajan.', { dib: producto, v: { k: 0 }, alto: 170 }, [
        ['Para multiplicar A por B, cada fila de A se cruza con cada columna de B: así sale cada casilla de AB.', {}],
        ['Casilla (1, 1): la fila 1 de A por la columna 1 de B, pareja por pareja: 1·2 + 2·1 = 4.', { k: 1 }],
        ['Casilla (2, 3): la fila 2 por la columna 3: 3·1 + 1·3 = 6. Así se llenan las seis casillas.', { k: 2 }],
        ['Medidas: (2 × 2)(2 × 3) = 2 × 3. Las de adentro deben coincidir; las de afuera dan el tamaño.', { k: 3 }],
        ['BA sería (2 × 3)(2 × 2): 3 no es 2 y no existe. El orden importa: en general AB ≠ BA.', { k: 4 }],
        ['La identidad I tiene unos en la diagonal y ceros fuera. No cambia nada: A·I = I·A = A.', { k: 5 }],
      ], 'La casilla (i, j) de AB es la fila i de A por la columna j de B; (m × n)(n × p) = m × p.'),
      xpHaz('fichas', 'C es 3 × 2 y D es 2 × 5. ¿Qué tamaño tiene CD? ¿Y DC?', {
        slots: [{ x: 130, y: 120, w: 100, h: 38 }, { x: 130, y: 170, w: 100, h: 38 }], alto: 196, fondo: fondoCD,
        fichas: ['2 × 2', 'no existe', '5 × 3', '3 × 5'], meta: ['3 × 5', 'no existe'], pista: 'Escribe las medidas una junto a la otra: las de adentro deben coincidir y las de afuera dan el tamaño.' },
      'CD: $(3 \\times 2)(2 \\times 5) = 3 \\times 5$. DC: $(2 \\times 5)(3 \\times 2)$, y 5 no es 3: no existe.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una arepa lleva 2 de harina y 1 de queso; una empanada, 3 de harina y nada de queso. La harina vale 2 y el queso 5 (miles). Completa el costo de cada una.', {
        slots: [{ x: 170, y: 118, w: 50, h: 36 }, { x: 170, y: 158, w: 50, h: 36 }], alto: 190, fondo: fondoPan,
        fichas: ['7', '9', '15', '6', '11'], meta: ['9', '6'], pista: 'Cada costo es una fila de la tabla por los precios: harina por su precio más queso por el suyo.' },
      '$(2 \\cdot 2 + 1 \\cdot 5,\\; 3 \\cdot 2 + 0 \\cdot 5) = (9, 6)$: cada fila por los precios.')],
  ], 'Rⁿ son listas que se suman y se estiran; una matriz combina columnas, y AB se arma fila por columna si las medidas encajan.');
}
