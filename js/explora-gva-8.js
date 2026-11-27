// Geometría Vectorial · explicación de geo-8 «Determinante e inversa» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20, hi = -1) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, j === hi ? `${cls} ta` : cls); }));
    return s;
  }
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const para = (K, O, u, c1, c2, cls) => K.p([[0, 0], c1, [c1[0] + c2[0], c1[1] + c2[1]], c2].map(([x, y]) => [O[0] + x * u, O[1] - y * u]), cls);
  const corchetes = (K, x0, x1, y0, y1) => K.pl([[x0 + 8, y0], [x0, y0], [x0, y1], [x0 + 8, y1]]) + K.pl([[x1 - 8, y0], [x1, y0], [x1, y1], [x1 - 8, y1]]);

  // Capítulo 1: el paralelogramo de las columnas se aplasta cuando det = 0, y las frases que dicen lo mismo.  v { b, k }
  const aplasta = (v, K) => {
    const O = [30, 188], u = 30, c1 = [3, 1], c2 = [v.b, 2], q = k(v), d = 3 * 2 - v.b * 1;
    let h = rej(K, O, u, 0, 10, 0, 3) + para(K, O, u, c1, c2, Math.abs(d) < 0.05 ? 'ff' : 'fa');
    h += K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr');
    h += K.t(20, 22, 'A =', 's', 'start') + mat(K, 74, 18, [[3, r1(v.b)], [1, 2]], 's', 26, 16);
    if (q >= 1) h += K.t(330, 22, `det A = ${r1(d)}`, 's ta', 'end');
    if (q === 2) h += K.t(330, 42, 'área ≠ 0: hay inversa', 's to', 'end');
    if (q >= 3) h += K.t(330, 42, 'área 0: sin inversa', 's tf', 'end');
    if (q === 4) h += K.t(330, 62, 'Ax = b: o ninguna o infinitas', 's tm', 'end');
    if (q === 5) h += K.t(330, 62, 'Ax = 0 tiene más soluciones', 's tm', 'end');
    return h;
  };
  // Capítulo 1, tu turno: el k que aplasta A = [k 5; 2 2].  v { k }
  const anula = (v, K) => {
    const O = [40, 176], u = 16, c1 = [v.k, 2], c2 = [5, 2], d = 2 * v.k - 10;
    return rej(K, O, u, -2, 10, 0, 4) + para(K, O, u, c1, c2, d === 0 ? 'ff' : 'fa') + K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr')
      + K.t(20, 30, 'A =', 's', 'start') + mat(K, 74, 26, [[v.k, 5], [2, 2]], 's') + K.t(330, 30, `det A = ${r1(d)}`, 's ta', 'end');
  };

  // Capítulo 2: A triplica áreas y A⁻¹ las divide entre 3.  v { k }
  const areas = (v, K) => {
    const q = k(v), s = [30, 30 * Math.sqrt(3), 30, 30][Math.min(q, 3)];
    let h = K.p([[60, 150], [90, 150], [90, 120], [60, 120]], 'fa') + K.t(75, 170, 'área 1', 's tm');
    if (q >= 1) h += K.ar(104, 135, 140, 135, 'lm') + K.t(122, 126, 'A', 's') + K.p([[150, 150], [150 + 30 * 3, 150], [150 + 30 * 3, 120], [150, 120]], 'fg') + K.t(195, 170, 'área 3', 's tm');
    if (q >= 2) h += K.ar(250, 135, 282, 135, 'lm') + K.t(266, 126, 'A⁻¹', 's') + K.p([[290, 150], [290 + s, 150], [290 + s, 120], [290, 120]], 'fo') + K.t(305, 170, 'área 1', 's to');
    if (q >= 3) h += K.t(170, 50, 'det A · det A⁻¹ = det I = 1', 'ta');
    if (q >= 4) h += K.t(170, 82, 'det A⁻¹ = 1 / det A', 's');
    if (q >= 5) h += K.t(170, 104, 'si det A = −2, det A⁻¹ = −½: también voltea', 's tm');
    return h;
  };

  // Capítulo 3: cofactores, tablero de signos, transpuesta y A⁻¹ = adj A / det A, con A = [3 1; 5 2].  v { k }
  const AJ = [[3, 1], [5, 2]];
  const adjunta = (v, K) => {
    const q = k(v);
    let h = K.t(20, 40, 'A =', 's', 'start') + mat(K, 76, 36, AJ, 's');
    if (q >= 1) h += K.t(170, 22, 'signos', 's tm') + mat(K, 170, 50, [['+', '−'], ['−', '+']], 's ta');
    if (q >= 2) h += K.t(270, 22, 'cofactores', 's tm') + mat(K, 270, 50, [[2, -5], [-1, 3]], 's');
    if (q >= 3) h += K.t(80, 102, 'adj A = transpuesta', 's tm') + mat(K, 80, 132, [[2, -1], [-5, 3]], 's ta');
    if (q >= 4) h += K.t(250, 136, 'A · adj A = (det A) I', 's');
    if (q >= 5) h += K.t(250, 166, 'A⁻¹ = adj A / det A', 's ta') + K.t(250, 186, 'aquí det A = 1', 's tm');
    return h;
  };

  // Capítulo 4: Cramer con x + 2y = 8, 3x − y = 3.  v { k }
  const CA = [[1, 2], [3, -1]], CB = [8, 3];
  const cramer = (v, K) => {
    const q = k(v);
    let h = K.t(20, 30, 'x + 2y = 8', 's', 'start') + K.t(20, 52, '3x − y = 3', 's', 'start');
    if (q >= 1) h += K.t(220, 22, 'A', 's tm') + mat(K, 220, 50, CA, 's') + K.t(330, 54, 'det = −7', 's ta', 'end');
    if (q >= 2) h += K.t(80, 98, 'A₁: b en la columna 1', 's tm') + mat(K, 80, 128, [[8, 2], [3, -1]], 's', 26, 20, 0);
    if (q >= 3) h += K.t(80, 172, 'det = −14 → x = 2', 's ta');
    if (q >= 4) h += K.t(250, 98, 'A₂: b en la columna 2', 's tm') + mat(K, 250, 128, [[1, 8], [3, 3]], 's', 26, 20, 1) + K.t(250, 172, 'det = −21 → y = 3', 's ta');
    if (q >= 5) h += K.t(170, 196, 'en 3 × 3 igual: x, y, z con A₁, A₂, A₃', 's tm');
    return h;
  };

  // Problema: dos jugos.  v { x, y }
  const PA = [[2, 1], [1, 3]], PO = [40, 196], PU = 26;
  const jugos = (v, K) => {
    let h = rej(K, PO, PU, 0, 6, 0, 6) + K.t(PO[0] + 6 * PU, PO[1] + 18, 'grande (miles)', 's tm', 'end') + K.t(PO[0] - 8, PO[1] - 6 * PU - 12, 'pequeño (miles)', 's tm', 'start');
    h += K.l(PO[0] + v.x * PU, PO[1], PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d') + K.l(PO[0], PO[1] - v.y * PU, PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d');
    const a = 2 * v.x + v.y, b = v.x + 3 * v.y;
    return h + K.t(330, 40, 'det A = 5', 's ta', 'end') + K.t(330, 60, 'det A₁ = 20, det A₂ = 15', 's tm', 'end')
      + K.t(226, 120, `Ana: ${a} de 11`, `s ${a === 11 ? 'to' : 'tm'}`, 'start') + K.t(226, 142, `Beto: ${b} de 13`, `s ${b === 13 ? 'to' : 'tm'}`, 'start');
  };

  xpLec('geo-8', [
    ['Invertible si y solo si det A ≠ 0',
      xpMira('dibujo', 'Una matriz tiene inversa justo cuando su **determinante** no es cero.', { dib: aplasta, v: { b: 1, k: 0 }, alto: 200 }, [
        ['Las columnas de A forman un paralelogramo. Su área con signo es det A.', {}],
        ['Aquí det A = 3 · 2 − 1 · 1 = 5: A agranda las áreas 5 veces.', { k: 1 }],
        ['Mientras el área no sea cero, A se puede deshacer: tiene inversa.', { k: 2 }],
        ['Si la segunda columna gira hasta (6, 2), queda en la recta de la primera y det A = 0.', { b: 6, k: 3 }],
        ['Entonces A x = b ya no tiene solución única: o no hay ninguna o hay infinitas.', { k: 4 }],
        ['Y A x = 0 tiene soluciones además de x = 0. Todas estas frases dicen lo mismo.', { k: 5 }, '$A^{-1} \\text{ existe} \\iff \\det A \\neq 0$'],
      ], 'A es invertible si y solo si $\\det A \\neq 0$: solución única, solo la trivial en $A\\vec x = \\vec 0$ y columnas que no se aplastan.'),
      xpHaz('dibujo', 'Desliza k hasta que A = [k 5; 2 2] no tenga inversa: que las dos columnas queden en la misma recta.', {
        dib: anula, v: { k: 1 }, metas: { k: 5 }, alto: 230, manijas: [{ k: 'k', min: -2, max: 9, paso: 1, et: 'k' }],
        lee: v => `$\\det A = ${v.k < 0 ? `(${v.k})` : v.k} \\cdot 2 - 5 \\cdot 2 = ${2 * v.k - 10}$`, pista: 'Escribe det A = 2k − 10 y busca el k que lo vuelve cero.' },
      'Con $k = 5$: $\\det A = 10 - 10 = 0$ y las dos columnas son iguales.')],
    ['El determinante de la inversa',
      xpMira('dibujo', 'Si A agranda las áreas, su inversa las tiene que **encoger** lo mismo.', { dib: areas, v: { k: 0 }, alto: 200 }, [
        ['Empieza con un cuadrado de área 1.', {}],
        ['Una A con det A = 3 lo vuelve una figura de área 3.', { k: 1 }],
        ['A⁻¹ deshace a A: devuelve la figura al área 1. Así que divide las áreas entre 3.', { k: 2 }],
        ['Hacer A y luego A⁻¹ es la identidad, que no cambia áreas: los determinantes se multiplican y dan 1.', { k: 3 }],
        ['Por eso el determinante de la inversa es el recíproco del de A.', { k: 4 }, '$\\det A^{-1} = \\dfrac{1}{\\det A}$'],
        ['El signo se conserva: si A voltea la figura, A⁻¹ también, para dejarla derecha.', { k: 5 }],
      ], 'Como $\\det A \\cdot \\det A^{-1} = \\det I = 1$, el determinante de la inversa es $\\tfrac{1}{\\det A}$, con el mismo signo.'),
      xpHaz('fichas', 'Pon al lado de cada det A el determinante de su inversa.', {
        slots: [0, 1, 2].map(i => ({ x: 250, y: 26 + i * 46, w: 70, h: 36 })), alto: 140,
        fondo: K => ['det A = 5', 'det A = −2', 'det A = ½'].map((t, i) => K.t(20, 31 + i * 46, t, 's', 'start') + K.ar(130, 26 + i * 46, 196, 26 + i * 46, 'lm') + K.t(163, 18 + i * 46, 'det A⁻¹', 's tm')).join(''),
        fichas: ['⅕', '−½', '2', '−5', '½', '−2'], meta: ['⅕', '−½', '2'], pista: 'El recíproco de un número da 1 al multiplicarlo por él, y conserva el signo.' },
      '$\\tfrac{1}{5}$, $-\\tfrac{1}{2}$ y $2$: cada uno por su det A da 1.')],
    ['La adjunta',
      xpMira('dibujo', 'Hay una fórmula para la inversa: la **adjunta** dividida entre el determinante.', { dib: adjunta, v: { k: 0 }, alto: 200 }, [
        ['En A = [3 1; 5 2], tapa la fila y la columna de una entrada: lo que queda es su menor.', {}],
        ['Cada menor lleva el signo de su casilla, como en un tablero: + − arriba y − + abajo.', { k: 1 }],
        ['Menor con su signo es el cofactor. Aquí los cofactores son 2, −5, −1 y 3.', { k: 2 }],
        ['La adjunta es la matriz de cofactores transpuesta: las filas pasan a ser columnas.', { k: 3 }],
        ['Al multiplicar A por su adjunta sale det A en la diagonal y ceros fuera.', { k: 4 }],
        ['Por eso A⁻¹ = adj A dividida entre det A. En 3 × 3 es igual, con menores 2 × 2.', { k: 5 }, '$A^{-1} = \\dfrac{1}{\\det A}\\operatorname{adj} A$'],
      ], 'La adjunta es la transpuesta de los cofactores (signos + − +) y $A^{-1} = \\tfrac{1}{\\det A}\\operatorname{adj} A$.'),
      xpHaz('fichas', 'Arma la adjunta de A = [2 5; 1 4]. Sus cofactores son C₁₁ = 4, C₁₂ = −1, C₂₁ = −5 y C₂₂ = 2.', {
        slots: [{ x: 214, y: 46, w: 50, h: 36 }, { x: 278, y: 46, w: 50, h: 36 }, { x: 214, y: 92, w: 50, h: 36 }, { x: 278, y: 92, w: 50, h: 36 }], alto: 124,
        fondo: K => K.t(20, 72, 'A =', 's', 'start') + mat(K, 76, 68, [[2, 5], [1, 4]], 's') + K.t(176, 75, 'adj A =', 's', 'end') + corchetes(K, 182, 310, 24, 114),
        fichas: ['4', '−5', '−1', '2', '5', '1'], meta: ['4', '−5', '−1', '2'], pista: 'Transponer: C₁₂ baja a la fila 2 y C₂₁ sube a la fila 1.' },
      '$\\operatorname{adj} A = \\begin{pmatrix} 4 & -5 \\\\ -1 & 2 \\end{pmatrix}$; con $\\det A = 3$, $A^{-1} = \\tfrac{1}{3}\\operatorname{adj} A$.')],
    ['La regla de Cramer',
      xpMira('dibujo', 'Con determinantes también se resuelve un sistema, incógnita por incógnita.', { dib: cramer, v: { k: 0 }, alto: 210 }, [
        ['Un sistema de dos ecuaciones: x + 2y = 8 y 3x − y = 3.', {}],
        ['Su matriz de coeficientes tiene det A = −1 − 6 = −7, que no es cero: hay una sola solución.', { k: 1 }],
        ['Para x, la columna de x se cambia por los resultados 8 y 3. Esa es A₁.', { k: 2 }],
        ['x es det A₁ entre det A: −14 entre −7, que da 2.', { k: 3 }],
        ['Para y se cambia la segunda columna: det A₂ = −21, y y = −21 / −7 = 3.', { k: 4 }, '$x_i = \\dfrac{\\det A_i}{\\det A}$'],
        ['Con tres incógnitas es igual: cada una con su columna cambiada, entre det A.', { k: 5 }],
      ], 'Regla de Cramer: si $\\det A \\neq 0$, $x_i = \\tfrac{\\det A_i}{\\det A}$, con $A_i$ = A con la columna i cambiada por $\\vec b$.'),
      xpHaz('fichas', 'Para 2x + y = 7 y x + 3y = 11, arma A₂: la matriz de Cramer de y.', {
        slots: [{ x: 214, y: 46, w: 50, h: 36 }, { x: 278, y: 46, w: 50, h: 36 }, { x: 214, y: 92, w: 50, h: 36 }, { x: 278, y: 92, w: 50, h: 36 }], alto: 124,
        fondo: K => K.t(20, 60, '2x + y = 7', 's', 'start') + K.t(20, 86, 'x + 3y = 11', 's', 'start') + K.t(176, 75, 'A₂ =', 's', 'end') + corchetes(K, 182, 310, 24, 114),
        fichas: ['2', '7', '1', '11', '3'], meta: ['2', '7', '1', '11'], pista: 'La columna de x se queda igual; la de y se cambia por los resultados 7 y 11.' },
      '$A_2 = \\begin{pmatrix} 2 & 7 \\\\ 1 & 11 \\end{pmatrix}$: $\\det A_2 = 15$, $\\det A = 5$ y $y = 3$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Ana pagó 11 mil por 2 jugos grandes y 1 pequeño; Beto, 13 mil por 1 grande y 3 pequeños. Con los determinantes de Cramer, marca el precio de cada jugo.', {
        dib: jugos, v: { x: 0, y: 0 }, metas: { x: 4, y: 3 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, en: v => [PO[0] + v.x * PU, PO[1] - v.y * PU], de: (x, y) => [(x - PO[0]) / PU, (PO[1] - y) / PU] }],
        lee: v => `$A ${pm([[v.x], [v.y]])} = ${pm([[2 * v.x + v.y], [v.x + 3 * v.y]])}$`, pista: 'El grande es det A₁ / det A y el pequeño, det A₂ / det A.' },
      'Grande: $\\tfrac{20}{5} = 4$ mil; pequeño: $\\tfrac{15}{5} = 3$ mil. Ana: $8 + 3 = 11$; Beto: $4 + 9 = 13$.')],
  ], 'Inversa si y solo si $\\det A \\neq 0$; $\\det A^{-1} = \\tfrac{1}{\\det A}$, la adjunta da $A^{-1}$ y Cramer resuelve con determinantes.');
}
