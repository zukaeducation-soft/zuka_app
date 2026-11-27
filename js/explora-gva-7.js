// Geometría Vectorial · explicación de geo-7 «El determinante con matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.q || 0);
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, cls); }));
    return s;
  }
  // Plano con sus enteros: O origen, u píxeles por unidad, de x0 a x1 y de y0 a y1.
  const plano = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  const rej = (K, P, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(...P(i, y0), ...P(i, y1), i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(...P(x0, j), ...P(x1, j), j ? 'lr' : 'lm');
    return h;
  };
  const para = (K, P, a, b, cls) => K.p([[0, 0], a, [a[0] + b[0], a[1] + b[1]], b].map(q => P(...q)), cls);
  const flechas = (K, P, a, b) => K.ar(...P(0, 0), ...P(...a), 'la gr') + K.ar(...P(0, 0), ...P(...b), 'lg gr')
    + K.t(...P(a[0] + 0.2, a[1] + 0.45), 'fila 1', 's ta', 'start') + K.t(...P(b[0] + 0.2, b[1] + 0.45), 'fila 2', 's tg', 'start');

  // Capítulo 1: la fila 2 de A = [[3, 1], [1, 2]] resbala con R₂ → R₂ + kR₁.  v { k, q }
  const CA = [[3, 1], [1, 2]], CP = plano([56, 176], 17);
  const cizalla = (v, K) => {
    const a = CA[0], b = [CA[1][0] + v.k * a[0], CA[1][1] + v.k * a[1]], kk = Math.round(v.k);
    let h = rej(K, CP, -2, 10, 0, 8) + K.l(...CP(1 - 1.3 * 3, 2 - 1.3), ...CP(1 + 2.4 * 3, 2 + 2.4), 'lm d');
    h += para(K, CP, a, b, 'fa') + flechas(K, CP, a, b);
    h += K.t(292, 36, 'A =', 's') + mat(K, 292, 66, [a, b].map(f => f.map(Math.round)), 's') + K.t(292, 118, kk ? `R₂ ${kk > 0 ? '+' : '−'} ${Math.abs(kk) === 1 ? '' : Math.abs(kk)}R₁` : 'sin cambios', 's ta');
    if (k(v) >= 1) h += K.t(292, 146, 'área = 5', 's to');
    if (k(v) >= 2) h += K.t(292, 166, 'det no cambia', 's tm');
    return h;
  };
  // Capítulo 1, tu turno: A = [[1, 2], [3, 1]]; R₂ → R₂ + kR₁ hasta dejar la fila 2 en el eje.  v { k }
  const TA = [[1, 2], [3, 1]], TP = plano([116, 100], 12);
  const triangula = (v, K) => {
    const a = TA[0], b = [TA[1][0] + v.k * a[0], TA[1][1] + v.k * a[1]];
    return rej(K, TP, -1, 6, -7, 5) + para(K, TP, a, b, 'fa') + flechas(K, TP, a, b)
      + K.t(290, 36, 'A =', 's') + mat(K, 290, 66, TA, 's') + K.t(290, 112, `R₂ ${v.k < 0 ? '−' : '+'} ${Math.abs(Math.round(v.k))}·R₁`, 's ta') + mat(K, 290, 146, [a, b].map(f => f.map(Math.round)), 's');
  };

  // Capítulo 2: estirar la fila 1 de A = [[2, 0], [1, 2]] por k y, al final, intercambiar las filas.  v { k, s }
  const EA = [[2, 0], [1, 2]], EP = plano([100, 112], 15);
  const estira = (v, K) => {
    const a = [v.k * EA[0][0], v.k * EA[0][1]], b = EA[1], f1 = v.s ? b : a, f2 = v.s ? a : b, d = f1[0] * f2[1] - f1[1] * f2[0];
    let h = rej(K, EP, -3, 7, -2, 4) + para(K, EP, f1, f2, d < 0 ? 'fg' : 'fa') + flechas(K, EP, f1, f2);
    const g1 = Math.atan2(f1[1], f1[0]) * 180 / Math.PI, g2 = Math.atan2(f2[1], f2[0]) * 180 / Math.PI;
    let b2 = g2; while (b2 - g1 > 180) b2 -= 360; while (b2 - g1 < -180) b2 += 360;
    h += K.arc(...EP(0, 0), 20, g1, b2, 'lf gr');
    h += K.t(292, 36, 'A =', 's') + mat(K, 292, 66, [f1, f2].map(f => f.map(Math.round)), 's') + K.t(292, 116, `det = ${r1(Math.round(d))}`, d < 0 ? 's tf' : 's to');
    return h + K.t(292, 138, d < 0 ? 'giro horario' : 'giro antihorario', 's tm') + K.t(170, 196, v.s ? 'filas intercambiadas' : `fila 1 por ${r1(Math.round(v.k))}`, 's tm');
  };

  // Capítulo 3: C = [[0, 2, 1], [1, 1, 2], [3, 1, 4]] a triangular, con la cuenta del factor.  v { q }
  const PASOS = [
    [[[0, 2, 1], [1, 1, 2], [3, 1, 4]], '', '1'],
    [[[1, 1, 2], [0, 2, 1], [3, 1, 4]], 'R₁ ↔ R₂', '−1'],
    [[[1, 1, 2], [0, 2, 1], [0, -2, -2]], 'R₃ − 3R₁', '−1'],
    [[[1, 1, 2], [0, 2, 1], [0, 0, -1]], 'R₃ + R₂', '−1'],
  ];
  const cuenta = (v, K) => {
    const q = k(v), [M, op, fac] = PASOS[Math.min(q, 3)];
    let h = K.t(20, 24, q ? 'después de' : 'C =', 's tm', 'start') + (op ? K.t(20, 44, op, 's ta', 'start') : '') + mat(K, 150, 84, M, 's', 30, 24);
    if (q >= 3) h += [0, 1, 2].map(i => K.c(150 + 30 * (i - 1), 84 + 24 * (i - 1), 13, 'fn')).join('') + mat(K, 150, 84, M, 's ta', 30, 24);
    h += K.r(232, 44, 92, 80, 'fn', 8) + K.t(278, 66, 'factor', 's tm') + K.t(278, 98, fac, 'ta');
    if (q >= 4) h += K.t(170, 162, 'diagonal: 1 · 2 · (−1) = −2', 's');
    if (q >= 5) h += K.t(170, 186, 'det C = −2 ÷ (−1) = 2', 's to');
    return h;
  };

  // Capítulo 4: elementales, productos, kA y filas proporcionales.  v { q, k }
  const grupo = (v, K) => {
    const q = k(v);
    if (q === 0) return K.t(170, 40, 'una operación de fila = una elemental E', 's tm') + K.t(170, 92, 'det(EA) = det E · det A', 'ta') + K.t(170, 136, 'det E = −1, k o 1', 's');
    if (q === 1) return [['B', '×(−2)', 80], ['A', '×3', 190]].map(([n, d, x]) => K.r(x - 30, 60, 60, 70, 'fn', 8) + K.t(x, 52, n, 's') + K.t(x, 100, d, 's ta')).join('')
      + K.ar(20, 95, 46, 95, 'lm') + K.ar(114, 95, 156, 95, 'lm') + K.ar(224, 95, 266, 95, 'lm') + K.t(300, 100, '−6', 'ta') + K.t(170, 170, 'det(AB) = det A · det B', 's');
    if (q === 2) {
      const a = Math.max(1, Math.round(v.k)), u = Math.min(22, 70 / a);
      return K.caja([110, 176], u, a, a, a, 'fa', true) + K.t(268, 70, `k = ${a}`, 'ta') + K.t(268, 100, `${a}·${a}·${a} = ${a ** 3}`, 's') + K.t(268, 124, 'cubitos', 's tm');
    }
    return K.t(20, 36, 'filas 1 y 3 proporcionales', 's tm', 'start') + mat(K, 90, 96, [[1, 2, 0], [4, 1, 5], [3, 6, 0]], 's', 30, 26)
      + K.ar(170, 96, 206, 96, 'lm') + K.t(188, 84, 'R₃ − 3R₁', 's ta') + mat(K, 264, 96, [[1, 2, 0], [4, 1, 5], [0, 0, 0]], 's', 30, 26) + K.t(264, 170, 'fila de ceros: det = 0', 's to');
  };
  // Capítulo 4, tu turno: 2 × 2 con det A = 3; det(kA) = 48.  v { k }
  const cuadros = (v, K) => {
    const a = Math.max(1, Math.round(v.k)), u = Math.min(26, 150 / a);
    let h = '';
    for (let i = 0; i < a; i++) for (let j = 0; j < a; j++) h += K.r(30 + i * u, 20 + j * u, u - 2, u - 2, 'fa', 2);
    return h + K.t(270, 40, 'A: 2 × 2', 's') + K.t(270, 62, 'det A = 3', 's') + K.t(270, 96, `k = ${a}`, 'ta') + K.t(270, 124, `${a}² = ${a * a} cuadritos`, 's tm');
  };

  // Problema: un logo pasa por tres transformaciones.  v { a }
  const logo = (v, K) => {
    const ms = [['cizalla', '×1'], ['espejo', '×(−1)'], ['ancho ×3', '×3']];
    let h = K.r(14, 70, 40, 40, 'fa', 4) + K.t(34, 126, 'área 5', 's tm');
    ms.forEach(([n, d], i) => { const x = 96 + i * 80; h += K.ar(x - 36, 90, x - 28, 90, 'lm') + K.r(x - 26, 60, 52, 60, 'fn', 8) + K.t(x, 52, n, 's tm') + K.t(x, 96, d, 's ta'); });
    return h + K.ar(300, 90, 310, 90, 'lm') + K.t(326, 96, '?', 'ta', 'end') + K.t(170, 168, `área final con signo: ${r1(Math.round(v.a))}`, 's');
  };

  xpLec('geo-7', [
    ['Sumar un múltiplo: una cizalla',
      xpMira('dibujo', 'Las filas de una matriz dibujan una figura; su **área** es el determinante.', { dib: cizalla, v: { k: 0, q: 0 }, alto: 200 }, [
        ['Las filas de una matriz 2 × 2 son dos flechas. El paralelogramo que forman tiene área |det A|.', {}],
        ['Aquí det A = 3 · 2 − 1 · 1 = 5: el paralelogramo de las filas mide 5.', { q: 1 }],
        ['Sumarle a la fila 2 la fila 1 la hace resbalar por la recta punteada, paralela a la fila 1.', { k: 1 }],
        ['Es una cizalla, como empujar un mazo de cartas: la base y la altura no cambian, ni el área.', { k: 2 }],
        ['Hacia el otro lado pasa lo mismo: con R₂ − R₁ el área sigue en 5.', { k: -1 }],
        ['Por eso sumar a una fila un múltiplo de otra no cambia el determinante.', { k: -1, q: 2 }, '$R_i \\to R_i + kR_j$: $\\det$ no cambia'],
      ], 'Sumar a una fila un múltiplo de otra hace resbalar la figura sin cambiar su área: el determinante no cambia.'),
      xpHaz('dibujo', 'Desliza k en R₂ → R₂ + k·R₁ hasta que la fila 2 quede sobre el eje vertical: así la matriz queda triangular.', {
        dib: triangula, v: { k: 0 }, metas: { k: -3 }, alto: 250, manijas: [{ k: 'k', min: -4, max: 1, paso: 1, et: 'k' }],
        lee: v => `$\\det = 1 \\cdot ${1 + 2 * v.k < 0 ? `(${1 + 2 * v.k})` : 1 + 2 * v.k} - 2 \\cdot ${3 + v.k < 0 ? `(${3 + v.k})` : 3 + v.k} = -5$`, pista: 'La primera entrada de la fila 2 es 3 + k · 1: ¿con qué k se vuelve 0?' },
      'Con $k = -3$ la fila 2 es $(0, -5)$: la triangular $\\begin{pmatrix} 1 & 2 \\\\ 0 & -5 \\end{pmatrix}$ conserva $\\det = -5$.')],
    ['Estirar y voltear',
      xpMira('dibujo', 'Multiplicar una fila o intercambiar dos sí cambia el determinante.', { dib: estira, v: { k: 1, s: 0 }, alto: 210 }, [
        ['Esta A tiene det = 4. De la fila 1 a la fila 2 se gira en sentido antihorario.', {}],
        ['Multiplicar la fila 1 por 2 estira la figura al doble en esa dirección: el área y el det se duplican.', { k: 2 }],
        ['Con k = 3 el área se triplica. Multiplicar una fila por k multiplica el determinante por k.', { k: 3 }],
        ['Con k = −1 la flecha da media vuelta: misma área, pero el giro se invierte.', { k: -1 }],
        ['El signo del determinante dice la orientación: antihorario es +, horario es −.', {}],
        ['Intercambiar las filas también invierte el giro: el determinante solo cambia de signo.', { k: 1, s: 1 }, '$R_i \\leftrightarrow R_j$: $\\det \\to -\\det$'],
      ], 'Multiplicar una fila por k multiplica el determinante por k; intercambiar dos filas le cambia el signo.'),
      xpHaz('fichas', 'Pon al lado de cada operación de fila lo que le hace al determinante.', {
        slots: [0, 1, 2].map(i => ({ x: 252, y: 26 + i * 46, w: 110, h: 36 })), alto: 140,
        fondo: K => ['R₁ ↔ R₃', 'R₂ → 7R₂', 'R₃ → R₃ + 5R₁'].map((t, i) => K.t(16, 31 + i * 46, t, 's', 'start') + K.ar(140, 26 + i * 46, 180, 26 + i * 46, 'lm')).join(''),
        fichas: ['× 5', '× (−1)', '× 7', '× 1', '× (−7)'], meta: ['× (−1)', '× 7', '× 1'], pista: 'Intercambiar voltea, multiplicar una fila estira, y sumar un múltiplo de otra fila es una cizalla.' },
      'Intercambio: $\\times(-1)$. Fila por 7: $\\times 7$. Sumar $5R_1$: $\\times 1$, no cambia.')],
    ['Triangular llevando la cuenta',
      xpMira('dibujo', 'Con esas reglas, un determinante grande se calcula **triangulando**.', { dib: cuenta, v: { q: 0 }, alto: 200 }, [
        ['Se lleva la matriz a triangular con operaciones de fila y se anota el factor de cada una.', {}],
        ['Arriba a la izquierda hay un 0: se intercambian R₁ y R₂. El factor queda en −1.', { q: 1 }],
        ['R₃ − 3R₁ limpia la primera columna. Sumar un múltiplo no cambia nada: el factor sigue en −1.', { q: 2 }],
        ['R₃ + R₂ deja otro cero. Ya es triangular: ceros debajo de la diagonal.', { q: 3 }],
        ['El determinante de una triangular es el producto de su diagonal: 1 · 2 · (−1) = −2.', { q: 4 }],
        ['Ese −2 es det C por el factor −1. Se deshace el factor: det C = 2.', { q: 5 }, '$\\det C = \\dfrac{\\det U}{\\text{factor}} = \\dfrac{-2}{-1} = 2$'],
      ], 'Se triangula anotando los factores; el det de la triangular es el producto de la diagonal, y se divide entre los factores.'),
      xpHaz('fichas', 'Una matriz D llegó a la triangular U con R₁ ↔ R₃ y luego R₂ → R₂ − 4R₁. Pon det U y det D.', {
        slots: [{ x: 262, y: 44, w: 70, h: 36 }, { x: 262, y: 96, w: 70, h: 36 }], alto: 130,
        fondo: K => K.t(20, 24, 'U =', 's', 'start') + mat(K, 90, 70, [[1, 3, 0], [0, 2, 1], [0, 0, 5]], 's', 28, 24) + K.t(220, 49, 'det U', 's', 'end') + K.t(220, 101, 'det D', 's', 'end'),
        fichas: ['10', '−10', '40', '−40', '1'], meta: ['10', '−10'], pista: 'Multiplica la diagonal de U. El intercambio cambió el signo; restar 4R₁ no cambió nada.' },
      '$\\det U = 1 \\cdot 2 \\cdot 5 = 10$ y $\\det U = (-1)\\det D$, así que $\\det D = -10$.')],
    ['Productos y múltiplos',
      xpMira('dibujo', 'Las mismas reglas dan las propiedades de los **productos**.', { dib: grupo, v: { q: 0, k: 1 }, alto: 200 }, [
        ['Una operación de fila es multiplicar por una elemental E, y det(EA) = det E · det A.', {}],
        ['Igual con dos matrices: aplicar B y luego A multiplica el área por det B y luego por det A.', { q: 1 }, '$\\det(AB) = \\det A \\cdot \\det B$'],
        ['Multiplicar toda la matriz por k es multiplicar cada una de sus filas por k.', { q: 2, k: 1 }],
        ['En 3 × 3 son tres filas: det(2A) = 2³ det A. El cubo de lado 2 tiene 8 cubitos.', { k: 2 }],
        ['En general, det(kA) = kⁿ det A, con n el tamaño de A.', { k: 3 }, '$\\det(kA) = k^n \\det A$'],
        ['Si dos filas son proporcionales, restar una deja una fila de ceros: el determinante es 0.', { q: 3 }],
      ], '$\\det(AB) = \\det A \\det B$, $\\det(kA) = k^n \\det A$, y filas iguales o proporcionales dan $\\det = 0$.'),
      xpHaz('dibujo', 'A es de 2 × 2 y det A = 3. Desliza k hasta que det(kA) = 48.', {
        dib: cuadros, v: { k: 1 }, metas: { k: 4 }, alto: 230, manijas: [{ k: 'k', min: 1, max: 6, paso: 1, et: 'k' }],
        lee: v => `$\\det(${v.k}A) = ${v.k}^2 \\cdot 3 = ${3 * v.k * v.k}$`, pista: 'En 2 × 2 son dos filas: det(kA) = k² · 3. ¿Qué k² da 16?' },
      'En $2 \\times 2$, $\\det(kA) = k^2 \\det A$: $3k^2 = 48$ da $k^2 = 16$ y $k = 4$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un logo de área 5 pasa por una cizalla (det 1), un espejo (det −1) y un estiramiento al triple a lo ancho (det 3). Desliza el área con signo con que termina.', {
        dib: logo, v: { a: 0 }, metas: { a: -15 }, alto: 230, manijas: [{ k: 'a', min: -20, max: 20, paso: 1, et: 'área final' }],
        lee: v => `$\\text{área} = ${v.a < 0 ? `(${v.a})` : v.a}$`, pista: 'Cada transformación multiplica el área con signo por su determinante: 5 · 1 · (−1) · 3.' },
      'El área con signo es $5 \\cdot 1 \\cdot (-1) \\cdot 3 = -15$: el logo mide 15 y quedó volteado por el espejo.')],
  ], 'Cizalla: el det no cambia; estirar una fila lo multiplica; intercambiar le cambia el signo. Se triangula y se lleva la cuenta.');
}
