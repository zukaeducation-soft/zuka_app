// Geometría Vectorial · explicación de geo-4 «Matrices invertibles y matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const mul = (A, B) => A.map(f => B[0].map((_, j) => f.reduce((s, x, q) => s + x * B[q][j], 0)));
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, cls); }));
    return s;
  }
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const para = (K, O, u, c1, c2, cls) => K.p([[0, 0], c1, [c1[0] + c2[0], c1[1] + c2[1]], c2].map(([x, y]) => [O[0] + x * u, O[1] - y * u]), cls);
  const cuadro = (K, O, u) => K.pl([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]].map(([x, y]) => [O[0] + x * u, O[1] - y * u]), 'lm d');

  // Capítulo 1: A estira al doble a lo ancho y A⁻¹ encoge a la mitad.  v { a, k }
  const estira = (v, K) => {
    const O = [40, 160], u = 50, q = k(v);
    let h = rej(K, O, u, 0, 3, 0, 2) + cuadro(K, O, u) + para(K, O, u, [v.a, 0], [0, 1], q === 3 ? 'fo' : 'fa');
    h += K.t(214, 40, 'A =', 's', 'start') + mat(K, 276, 36, [[2, 0], [0, 1]], 's');
    if (q >= 2) h += K.t(214, 92, 'A⁻¹ =', 's', 'start') + mat(K, 280, 88, [['½', 0], [0, 1]], 's ta');
    return h + K.t(260, 150, ['el cuadrado', 'después de A', 'A y luego A⁻¹', 'A⁻¹A = I'][q], 's tm');
  };
  // Capítulo 1, tu turno: B deshace el corte A = [[1, 2], [0, 1]].  v { p, q, r, s }
  const CA = [[1, 2], [0, 1]], CO = [150, 120], CU = 22, CB = v => [[v.p, v.r], [v.q, v.s]];
  const corte = (v, K) => {
    const BA = mul(CB(v), CA);
    return rej(K, CO, CU, -3, 3, -3, 3) + cuadro(K, CO, CU) + para(K, CO, CU, [BA[0][0], BA[1][0]], [BA[0][1], BA[1][1]], 'fa')
      + K.ar(...CO, CO[0] + v.p * CU, CO[1] - v.q * CU, 'la gr') + K.ar(...CO, CO[0] + v.r * CU, CO[1] - v.s * CU, 'lg gr')
      + K.t(240, 30, 'A =', 's', 'start') + mat(K, 296, 26, CA, 's') + K.t(240, 92, 'B =', 's', 'start') + mat(K, 296, 88, CB(v), 's');
  };
  const DE = (x, y) => [(x - CO[0]) / CU, (CO[1] - y) / CU];

  // Capítulo 2: columnas, área ad − bc y el aplastamiento.  v { b, d, k }
  const area = (v, K) => {
    const O = [40, 180], u = 34, c1 = [2, 1], c2 = [v.b, v.d], q = k(v), dt = 2 * v.d - v.b;
    let h = rej(K, O, u, 0, 6, 0, 3) + para(K, O, u, c1, c2, Math.abs(dt) < 0.05 ? 'ff' : 'fa');
    if (q === 3 || (q === 2 && Math.abs(dt) < 0.05)) h += K.l(O[0], O[1], O[0] + 6 * u, O[1] - 3 * u, 'lf gr');
    h += K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr');
    h += K.t(20, 30, 'A =', 's', 'start') + mat(K, 76, 26, [[2, v.b], [1, v.d]], 's');
    if (q >= 1) h += K.t(328, 24, `ad − bc = ${r1(dt)}`, 's ta', 'end');
    if (q === 3) h += K.t(328, 44, 'área 0: sin inversa', 's tf', 'end');
    if (q === 4) h += K.t(328, 44, 'área ≠ 0: hay inversa', 's to', 'end');
    return h;
  };
  // Capítulo 2, tu turno: la b que anula ad − bc.  v { b }
  const anula = (v, K) => {
    const O = [40, 168], u = 18, c1 = [2, 3], c2 = [v.b, 6], dt = 12 - 3 * v.b;
    return rej(K, O, u, 0, 8, 0, 8) + para(K, O, u, c1, c2, dt === 0 ? 'ff' : 'fa') + K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr')
      + K.t(212, 40, 'A =', 's', 'start') + mat(K, 274, 36, [[2, v.b], [3, 6]], 's') + K.t(328, 88, `ad − bc = ${r1(dt)}`, 's ta', 'end');
  };
  const brackets = (K, x0, x1, y0, y1) => K.pl([[x0 + 8, y0], [x0, y0], [x0, y1], [x0 + 8, y1]]) + K.pl([[x1 - 8, y0], [x1, y0], [x1, y1], [x1 - 8, y1]]);

  // Capítulo 3: la elemental de R₃ → R₃ + 4R₁, lo que hace sobre A y su inversa.  v { k }
  const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], E3 = [[1, 0, 0], [0, 1, 0], [4, 0, 1]], A3 = [[1, 2, 1], [0, 1, 3], [-4, 0, 2]], F3 = [[1, 0, 0], [0, 1, 0], [-4, 0, 1]];
  const elemental = (v, K) => {
    const q = k(v);
    if (q === 0) return K.t(120, 88, 'I =', '', 'end') + mat(K, 170, 84, I3) + K.t(170, 160, 'no mueve nada', 's tm');
    if (q === 1) return K.t(60, 88, 'I =', 's', 'end') + mat(K, 104, 84, I3, 's') + K.ar(146, 84, 186, 84, 'lm') + K.t(166, 70, 'R₃ + 4R₁', 's ta') + K.t(234, 88, 'E =', 's', 'end') + mat(K, 280, 84, E3, 's ta');
    if (q === 2) return K.t(36, 88, 'E·', 's', 'start') + mat(K, 90, 84, A3, 's') + K.t(150, 88, '=', '') + mat(K, 210, 84, mul(E3, A3), 's ta') + K.t(170, 160, 'a la fila 3 de A se le sumó 4 veces la fila 1', 's tm');
    if (q === 3) return K.t(60, 88, 'E⁻¹ =', 's', 'end') + mat(K, 104, 84, F3, 's ta') + K.t(170, 160, 'R₃ → R₃ − 4R₁ deshace a E', 's tm') + K.t(240, 88, 'E⁻¹E = I', 's', 'start');
    if (q === 4) return [['Rᵢ ↔ Rⱼ', 'se repite: Rᵢ ↔ Rⱼ'], ['Rᵢ → kRᵢ', 'se divide: Rᵢ → (1/k)Rᵢ'], ['Rᵢ → Rᵢ + kRⱼ', 'se resta: Rᵢ → Rᵢ − kRⱼ']]
      .map(([a, b], i) => K.t(20, 60 + i * 44, a, 's', 'start') + K.ar(124, 56 + i * 44, 156, 56 + i * 44, 'lm') + K.t(166, 60 + i * 44, b, 's ta', 'start')).join('') + K.t(170, 24, 'operación y la que la deshace', 's tm');
    return K.t(170, 60, 'A → … → I con operaciones de fila', 's') + K.t(170, 96, 'Eₖ ⋯ E₂E₁A = I', 'ta') + K.t(170, 132, 'A⁻¹ = Eₖ ⋯ E₂E₁', 'ta') + K.t(170, 168, 'A es un producto de elementales', 's tm');
  };

  // Capítulo 4: medias y zapatos.  v { k }
  const capas = (v, K) => {
    const q = k(v), media = q === 1 || q === 2, zapato = q === 2;
    let h = K.r(130, 60, 80, 90, 'fc', 30) + K.t(170, 110, 'pie', 's tm');
    if (media || q === 3) h += K.r(120, 50, 100, 110, 'fa', 34) + K.t(170, 70, 'A: media', 's');
    if (zapato) h += K.r(108, 38, 124, 134, 'fg', 38) + K.t(170, 54, 'B: zapato', 's');
    const pie = ['sin nada', 'queda A', 'queda BA', 'B⁻¹ quitó el zapato', '(BA)⁻¹ = A⁻¹B⁻¹', '(Aᵀ)⁻¹ = (A⁻¹)ᵀ'][q];
    return h + K.t(170, 196, pie, q >= 4 ? 'ta' : 's tm');
  };

  // Problema: tortas y ponqués.  v { x, y }
  const PA = [[1, 1], [2, 3]], PO = [40, 196], PU = 26;
  const recetas = (v, K) => {
    let h = rej(K, PO, PU, 0, 6, 0, 6) + K.t(PO[0] + 6 * PU, PO[1] + 18, 'tortas', 's tm', 'end') + K.t(PO[0] - 8, PO[1] - 6 * PU - 10, 'ponqués', 's tm', 'start');
    h += K.l(PO[0] + v.x * PU, PO[1], PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d') + K.l(PO[0], PO[1] - v.y * PU, PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d');
    const az = v.x + v.y, ha = 2 * v.x + 3 * v.y;
    return h + K.t(246, 48, 'A⁻¹ =', 's', 'end') + mat(K, 286, 44, [[3, -1], [-2, 1]], 's') + K.t(222, 120, `azúcar: ${az} de 5`, `s ${az === 5 ? 'to' : 'tm'}`, 'start') + K.t(222, 142, `harina: ${ha} de 13`, `s ${ha === 13 ? 'to' : 'tm'}`, 'start');
  };

  xpLec('geo-4', [
    ['Deshacer lo que hace A',
      xpMira('dibujo', 'Una matriz **deshace** a otra cuando devuelve cada punto a su sitio.', { dib: estira, v: { a: 1, k: 0 }, alto: 200 }, [
        ['Una matriz mueve el plano. Mira el cuadrado de lado 1: cada matriz lo lleva a otra figura.', {}],
        ['Esta A estira todo al doble a lo ancho: el cuadrado se vuelve un rectángulo de 2 por 1.', { a: 2, k: 1 }],
        ['Para deshacerla hay que encoger a la mitad a lo ancho. Esa matriz es la inversa de A: A⁻¹.', { a: 1, k: 2 }],
        ['Hacer A y luego A⁻¹ deja todo como estaba: A⁻¹A = I, la identidad, que no mueve nada.', { k: 3 }],
        ['Es como dividir: 2 · ½ = 1. A⁻¹ hace el papel de ½ y la identidad, el del 1.', {}],
        ['La inversa deshace por los dos lados: AA⁻¹ = I y también A⁻¹A = I.', {}, '$AA^{-1} = A^{-1}A = I$'],
      ], 'A⁻¹ deshace lo que hace A: $AA^{-1} = A^{-1}A = I$, como $2 \\cdot \\tfrac{1}{2} = 1$.'),
      xpHaz('dibujo', 'A inclina el cuadrado: 2 a la derecha por cada paso arriba. Arrastra las columnas de B hasta que la figura vuelva a ser el cuadrado punteado.', {
        dib: corte, v: { p: 0, q: 1, r: -1, s: 0 }, metas: { p: 1, q: 0, r: -2, s: 1 }, alto: 200,
        manijas: [{ k: ['p', 'q'], min: -3, max: 3, paso: 1, rot: () => 'b₁', en: v => [CO[0] + v.p * CU, CO[1] - v.q * CU], de: DE }, { k: ['r', 's'], min: -3, max: 3, paso: 1, rot: () => 'b₂', en: v => [CO[0] + v.r * CU, CO[1] - v.s * CU], de: DE }],
        lee: v => `$BA = ${pm(mul(CB(v), CA))}$`, pista: 'A empuja hacia la derecha 2 por cada paso hacia arriba: B debe empujar 2 hacia la izquierda.' },
      'El corte que empuja 2 a la derecha se deshace empujando 2 a la izquierda.')],
    ['El número ad − bc',
      xpMira('dibujo', 'Hay matrices que **no** se pueden deshacer. Un número lo dice.', { dib: area, v: { b: 1, d: 2, k: 0 }, alto: 200 }, [
        ['Las columnas de A son las flechas a donde van los lados del cuadrado: aquí (2, 1) y (1, 2).', {}],
        ['Su área es |ad − bc| = 4 − 1 = 3: A agranda las áreas 3 veces.', { k: 1 }],
        ['Ahora la segunda columna gira hasta (4, 2), que es el doble de la primera.', { b: 4, d: 2, k: 2 }],
        ['El paralelogramo se aplasta en una recta: ad − bc = 4 − 4 = 0.', { k: 3 }],
        ['Todo el plano cae en esa recta y muchos puntos van al mismo sitio. Eso no se puede deshacer: no hay inversa.', {}],
        ['Si no es cero, hay inversa: se cambian a y d, b y c cambian de signo, y se divide.', { b: 1, d: 2, k: 4 }, '$A^{-1} = \\tfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$'],
      ], 'Si $ad - bc = 0$ el plano se aplasta y no hay inversa; si no, se intercambian a y d, b y c cambian de signo y se divide.'),
      xpHaz('dibujo', 'Desliza b hasta que A no tenga inversa: que las dos columnas queden en la misma recta.', {
        dib: anula, v: { b: 0 }, metas: { b: 4 }, alto: 230, manijas: [{ k: 'b', min: -2, max: 7, paso: 1, et: 'b' }],
        lee: v => `$ad - bc = 2 \\cdot 6 - ${v.b < 0 ? `(${v.b})` : v.b} \\cdot 3 = ${12 - 3 * v.b}$`, pista: 'La segunda columna debe ser un múltiplo de (2, 3): mira su segunda entrada, 6.' },
      'Con $b = 4$: $2 \\cdot 6 - 4 \\cdot 3 = 0$ y la columna $(4, 6)$ es el doble de $(2, 3)$.'),
      xpHaz('fichas', 'Arma la inversa de A = [3 5; 1 2]. Aquí ad − bc = 6 − 5 = 1, así que no hay que dividir.', {
        slots: [{ x: 196, y: 50, w: 50, h: 36 }, { x: 262, y: 50, w: 50, h: 36 }, { x: 196, y: 96, w: 50, h: 36 }, { x: 262, y: 96, w: 50, h: 36 }], alto: 124,
        fondo: K => K.t(20, 44, 'A =', 's', 'start') + mat(K, 76, 40, [[3, 5], [1, 2]], 's') + K.t(160, 79, 'A⁻¹ =', 's', 'end') + brackets(K, 164, 294, 26, 120),
        fichas: ['−5', '3', '5', '2', '−1', '1'], meta: ['2', '−5', '−1', '3'], pista: 'La diagonal se intercambia: el 3 y el 2 cambian de lugar; el 5 y el 1 solo cambian de signo.' },
      'Inversa de $\\begin{pmatrix} 3 & 5 \\\\ 1 & 2 \\end{pmatrix}$: $\\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix}$, porque $ad - bc = 1$.')],
    ['Matrices elementales',
      xpMira('dibujo', 'Las operaciones de fila también son matrices: las **elementales**.', { dib: elemental, v: { k: 0 }, alto: 190 }, [
        ['Una matriz elemental es la identidad después de una sola operación de fila.', {}],
        ['Si en I le sumas a la fila 3 cuatro veces la fila 1, sale esta matriz E.', { k: 1 }],
        ['Multiplicar E·A le hace a A esa misma operación: E es la operación escrita como matriz.', { k: 2 }],
        ['Para deshacerla, se resta cuatro veces la fila 1. Esa es E⁻¹, y también es elemental.', { k: 3 }],
        ['Cada operación tiene su contraria: el intercambio se repite, multiplicar se divide y sumar se resta.', { k: 4 }],
        ['Si A llega a I con operaciones de fila, A tiene inversa: es un producto de elementales.', { k: 5 }],
      ], 'E es I con una operación de fila; $EA$ hace esa operación sobre A y $E^{-1}$ es la operación contraria.'),
      xpHaz('fichas', 'Pon al lado de cada operación de fila la que la deshace.', {
        slots: [0, 1, 2].map(i => ({ x: 238, y: 26 + i * 46, w: 150, h: 36 })), alto: 140,
        fondo: K => ['R₁ ↔ R₃', 'R₂ → 6R₂', 'R₂ → R₂ − 2R₃'].map((t, i) => K.t(16, 31 + i * 46, t, 's', 'start') + K.ar(124, 26 + i * 46, 154, 26 + i * 46, 'lm')).join(''),
        fichas: ['R₂ → 6R₂', 'R₂ → R₂ + 2R₃', 'R₁ ↔ R₃', 'R₂ → −6R₂', 'R₂ → ⅙R₂'], meta: ['R₁ ↔ R₃', 'R₂ → ⅙R₂', 'R₂ → R₂ + 2R₃'], pista: 'Repetir un intercambio lo deshace; multiplicar por 6 se deshace dividiendo; restar se deshace sumando.' },
      'Intercambio: se repite. Multiplicar por 6: dividir entre 6. Restar $2R_3$: sumarlo.')],
    ['Deshacer en orden contrario',
      xpMira('dibujo', 'Cuando se aplican dos matrices, ¿en qué orden se deshacen?', { dib: capas, v: { k: 0 }, alto: 210 }, [
        ['Ponerse medias y zapatos es aplicar dos matrices: primero A, la media.', { k: 1 }],
        ['Después B, el zapato. Lo que queda puesto es BA: la matriz de la derecha actúa primero.', { k: 2 }],
        ['Para quitarlos, primero sale el zapato con B⁻¹, y después la media con A⁻¹.', { k: 3 }],
        ['Por eso (BA)⁻¹ = A⁻¹B⁻¹: las inversas van en el orden contrario.', { k: 4 }, '$(BA)^{-1} = A^{-1}B^{-1}$'],
        ['Con la transpuesta pasa algo parecido: la inversa de Aᵀ es la transpuesta de A⁻¹.', { k: 5 }, '$(A^T)^{-1} = (A^{-1})^T$'],
      ], 'Se deshace en orden contrario: $(AB)^{-1} = B^{-1}A^{-1}$; y $(A^T)^{-1} = (A^{-1})^T$.'),
      xpHaz('fichas', 'Un dato x pasa por C, luego por D y luego por F: y = FDCx. Pon las inversas que recuperan x.', {
        slots: [{ x: 132, y: 56, w: 52, h: 38 }, { x: 192, y: 56, w: 52, h: 38 }, { x: 252, y: 56, w: 52, h: 38 }], alto: 100,
        fondo: K => K.t(96, 61, 'x =', '', 'end') + K.t(286, 61, 'y', '', 'start') + K.t(170, 18, 'y = F · D · C · x', 's tm'),
        fichas: ['F⁻¹', 'C⁻¹', 'F', 'D⁻¹', 'C'], meta: ['C⁻¹', 'D⁻¹', 'F⁻¹'], pista: 'F fue la última en actuar: su inversa es la primera en quitarse, pegada a y.' },
      '$x = C^{-1}D^{-1}F^{-1}y$: la última capa, F, se quita primero.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una torta usa 1 taza de azúcar y 2 de harina; un ponqué, 1 y 3. Se gastaron 5 tazas de azúcar y 13 de harina. Usa A⁻¹ y marca cuántos de cada uno.', {
        dib: recetas, v: { x: 0, y: 0 }, metas: { x: 2, y: 3 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, en: v => [PO[0] + v.x * PU, PO[1] - v.y * PU], de: (x, y) => [(x - PO[0]) / PU, (PO[1] - y) / PU] }],
        lee: v => `$A ${pm([[v.x], [v.y]])} = ${pm([[v.x + v.y], [2 * v.x + 3 * v.y]])}$`, pista: 'Multiplica A⁻¹ por (5, 13): fila por columna. La primera fila da las tortas.' },
      '$A^{-1}\\vec b = (3 \\cdot 5 - 13,\\ -2 \\cdot 5 + 13) = (2, 3)$: 2 tortas y 3 ponqués.')],
  ], 'Una matriz se deshace con su inversa si $ad - bc \\neq 0$; las elementales son operaciones de fila; todo se deshace al revés.');
}
