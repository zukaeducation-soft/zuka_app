// Geometría Vectorial · explicación de geo-12 «La recta» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  const pt = q => `(${q.map(N).join(', ')})`;
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const en = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  const mas = (P, d, t) => P.map((x, i) => x + t * d[i]);
  // Recta P + t·d entre t0 y t1.
  const tramo = (K, Q, P, d, t0, t1, cls) => K.l(...Q(...mas(P, d, t0)), ...Q(...mas(P, d, t1)), cls);

  // Capítulo 1: X = P + t d con P = (−3, −1), d = (2, 1).  v { k }
  const O1 = [148, 112], U1 = 20, Q1 = en(O1, U1), P1 = [-3, -1], D1 = [2, 1];
  const vectorial = (v, K) => {
    const q = k(v);
    let h = rej(K, O1, U1, -5, 7, -3, 4) + K.c(...Q1(...P1), 5, 'fg') + K.t(Q1(...P1)[0] - 6, Q1(...P1)[1] + 16, 'P', 's tg', 'end');
    h += K.ar(...Q1(...P1), ...Q1(...mas(P1, D1, 1)), 'lg gr') + K.t(Q1(...mas(P1, D1, 1))[0], Q1(...mas(P1, D1, 1))[1] + 18, 'd', 's tg');
    if (q >= 1) [1, 2].forEach(t => { const [x, y] = Q1(...mas(P1, D1, t)); h += K.c(x, y, 4, 'fa') + K.t(x - 4, y - 8, `t = ${t}`, 's ta', 'end'); });
    if (q >= 2) { h += tramo(K, Q1, P1, D1, -1, 4, 'la gr'); const [x, y] = Q1(...mas(P1, D1, -1)); h += K.c(x, y, 4, 'fa') + K.t(x + 6, y + 16, 't = −1', 's ta', 'start'); }
    if (q >= 3) h += K.t(14, 20, 'X = P + t d', 'ta', 'start');
    if (q >= 4) h += K.t(14, 40, 'x = −3 + 2t,  y = −1 + t', 's', 'start');
    if (q >= 5) h += K.t(14, 58, 't: horas · d: velocidad', 's tm', 'start');
    return h;
  };
  // Capítulo 1, tu turno: la lancha llega a la boya (5, 3).  v { t }
  const lancha = (v, K) => {
    const X = mas(P1, D1, v.t), [x, y] = Q1(...X);
    return rej(K, O1, U1, -5, 7, -3, 4) + tramo(K, Q1, P1, D1, -1, 4.5, 'lm d') + K.c(...Q1(5, 3), 6, 'fk') + K.t(Q1(5, 3)[0] - 8, Q1(5, 3)[1] - 8, 'boya', 's', 'end')
      + K.c(...Q1(...P1), 4, 'fg') + K.c(x, y, 7, 'fa') + K.t(14, 20, `t = ${N(v.t)} h: ${pt(X)}`, 's ta', 'start');
  };

  // Capítulo 2: A = (−3, 1), B = (1, −1): segmento, rayos y punto medio.  v { k }
  const O2 = [170, 100], U2 = 20, Q2 = en(O2, U2), A2 = [-3, 1], D2 = [4, -2];
  const dosPuntos = (v, K) => {
    const q = k(v);
    let h = rej(K, O2, U2, -7, 7, -4, 4);
    if (q === 1) h += tramo(K, Q2, A2, D2, -1, 2, 'lm');
    if (q === 2) h += tramo(K, Q2, A2, D2, 0, 1, 'la gr');
    if (q === 3) h += K.ar(...Q2(...A2), ...Q2(...mas(A2, D2, 2.2)), 'la gr');
    if (q === 4) h += K.ar(...Q2(...A2), ...Q2(...mas(A2, D2, -1)), 'la gr');
    if (q === 5) h += tramo(K, Q2, A2, D2, 0, 1, 'lm') + tramo(K, Q2, A2, D2, 0, 0.5, 'la gr') + K.c(...Q2(...mas(A2, D2, 0.5)), 5, 'fo') + K.t(Q2(...mas(A2, D2, 0.5))[0] + 4, Q2(...mas(A2, D2, 0.5))[1] - 10, 'medio, t = ½', 's to', 'start');
    if (q === 0) h += K.ar(...Q2(...A2), ...Q2(...mas(A2, D2, 1)), 'lg gr') + K.t(Q2(...mas(A2, D2, 0.5))[0] - 8, Q2(...mas(A2, D2, 0.5))[1] + 18, 'd = B − A', 's tg', 'end');
    h += K.c(...Q2(...A2), 5, 'fg') + K.t(Q2(...A2)[0] - 6, Q2(...A2)[1] + 18, q >= 1 ? 'A · t = 0' : 'A', 's tg', 'end');
    h += K.c(...Q2(...mas(A2, D2, 1)), 5, 'fg') + K.t(Q2(...mas(A2, D2, 1))[0] + 6, Q2(...mas(A2, D2, 1))[1] - 8, q >= 1 ? 'B · t = 1' : 'B', 's tg', 'start');
    const dice = ['', 'X = A + t(B − A)', '0 ≤ t ≤ 1: segmento', 't ≥ 0: rayo', 't ≤ 0: el rayo opuesto', 'A + ½(B − A)'][q];
    return h + (dice ? K.t(14, 20, dice, 's ta', 'start') : '');
  };
  // Capítulo 2, tu turno: tres piezas de una misma recta.
  const piezas = K => [0, 1, 2].map(i => {
    const y = 30 + i * 46, A = 110, B = 170;
    const fig = [K.l(A, y, B, y, 'la gr'), K.ar(A, y, 222, y, 'la gr'), K.ar(A, y, 20, y, 'la gr')][i];
    return K.l(14, y, 226, y, 'lm d') + fig + K.c(A, y, 4, 'fg') + K.c(B, y, 4, 'fg') + K.t(A, y - 8, 'A', 's tg') + K.t(B, y - 8, 'B', 's tg');
  }).join('');

  // Capítulo 3: d = (2, 1) por (2, 3): θ, pendiente, punto-pendiente, intercepto, general y normal.  v { k }
  const O3 = [110, 150], U3 = 18, Q3 = en(O3, U3), P3 = [2, 3], D3 = [2, 1];
  const escalares = (v, K) => {
    const q = k(v), g = Math.atan2(1, 2) * 180 / Math.PI, cruce = Q3(-4, 0);
    let h = rej(K, O3, U3, -5, 6, -1, 7) + tramo(K, Q3, P3, D3, -3.5, 2, 'la gr');
    h += K.arc(...cruce, 26, 0, g, 'la') + K.t(cruce[0] + 34, cruce[1] - 4, 'θ', 's ta', 'start');
    if (q >= 1) h += K.ar(...Q3(...P3), ...Q3(...mas(P3, D3, 1)), 'lg gr') + K.t(Q3(4, 4)[0] + 2, Q3(4, 4)[1] + 18, 'd = (2, 1)', 's tg', 'start') + K.t(334, 20, 'm = 1/2 = tan θ', 's ta', 'end');
    if (q >= 2) h += K.c(...Q3(...P3), 5, 'fg') + K.t(334, 42, 'y − 3 = ½(x − 2)', 's', 'end');
    if (q >= 3) h += K.c(...Q3(0, 2), 5, 'fo') + K.t(Q3(0, 2)[0] + 6, Q3(0, 2)[1] + 16, 'b = 2', 's to', 'start') + K.t(334, 62, 'y = ½x + 2', 's', 'end');
    if (q >= 4) h += K.t(334, 82, 'x − 2y = −4', 's ta', 'end');
    if (q >= 5) h += K.ar(...Q3(...P3), ...Q3(3, 1), 'lo gr') + K.t(Q3(3, 1)[0] + 6, Q3(3, 1)[1] + 4, 'n = (1, −2)', 's to', 'start');
    return h;
  };

  // Capítulo 4: paralelas, perpendiculares y el espacio.  v { k }
  const O4 = [90, 110], U4 = 18, Q4 = en(O4, U4);
  const I4 = ([x, y, z]) => [170 + (x - y) * 26, 150 - (x + y) * 12 - z * 24];
  const relaciones = (v, K) => {
    const q = k(v);
    let h = '';
    if (q <= 3) {
      h += rej(K, O4, U4, -4, 4, -4, 4) + tramo(K, Q4, [-3, -2], [2, 1], -0.5, 3.5, 'la gr');
      h += K.ar(...Q4(-3, -2), ...Q4(-1, -1), 'la') + K.t(Q4(-1, -1)[0] + 4, Q4(-1, -1)[1] + 16, '(2, 1)', 's ta', 'start');
      if (q === 0) h += tramo(K, Q4, [-3, 0], [2, 1], -0.5, 3.5, 'lg gr') + K.ar(...Q4(-3, 0), ...Q4(1, 2), 'lg') + K.t(Q4(1, 2)[0] - 4, Q4(1, 2)[1] - 8, '(4, 2)', 's tg', 'end');
      if (q >= 1) h += tramo(K, Q4, [0, 0], [-1, 2], -2, 2, 'lg gr') + K.ar(...Q4(0, 0), ...Q4(-1, 2), 'lg') + K.t(Q4(-1, 2)[0] - 4, Q4(-1, 2)[1] - 4, '(−1, 2)', 's tg', 'end');
      const dice = ['paralelas: (4, 2) = 2·(2, 1)', 'girar: (d₁, d₂) → (−d₂, d₁)', 'm₁·m₂ = ½ · (−2) = −1', 'normales: (1, −2) ⟂ (2, 1)'][q];
      h += K.t(334, 30, dice, 's ta', 'end');
      if (q === 3) h += K.t(334, 50, 'en ángulo recto', 's tm', 'end');
    } else {
      [[[0, 0, 0], [4, 0, 0]], [[0, 0, 0], [0, 4, 0]], [[0, 0, 0], [0, 0, 4]]].forEach(([a, b], i) => { h += K.ar(...I4(a), ...I4(b), 'lm') + K.t(...I4(b).map((z, j) => z + [[6, 4], [-6, 4], [0, -6]][i][j]), 'xyz'[i], 's tm', ['start', 'end', 'middle'][i]); });
      h += K.l(...I4([3, -1, 0]), ...I4([-1, 3, 4]), 'la gr') + K.t(14, 172, 'x = x₀ + d₁t, y = y₀ + d₂t, z = z₀ + d₃t', 's', 'start');
      if (q >= 5) h += K.l(...I4([4, 1, 3]), ...I4([0, -1, 1]), 'lg gr') + K.t(14, 190, 'se cortan · paralelas · se cruzan', 's ta', 'start');
    }
    return h;
  };
  // Capítulo 4, tu turno: perpendicular a y = x/2 + 1 por Q = (1, 1).  v { a, b }
  const O5 = [170, 112], U5 = 20, Q5 = en(O5, U5);
  const perpendicular = (v, K) => {
    let h = rej(K, O5, U5, -6, 6, -4, 4) + tramo(K, Q5, [-6, -2], [2, 1], 0, 6, 'lg gr') + K.t(330, 20, 'y = x/2 + 1', 's tg', 'end');
    if (v.a || v.b) h += tramo(K, Q5, [1, 1], [v.a, v.b], -1.5, 1.5, 'la d');
    return h + K.c(...Q5(1, 1), 5, 'fk') + K.ar(...Q5(1, 1), ...Q5(1 + v.a, 1 + v.b), 'la gr') + K.t(14, 20, `w = ${pt([v.a, v.b])}`, 's ta', 'start');
  };
  // Capítulo 4, tu turno: tres parejas de rectas del espacio.
  const PARES = [['L₁: (0, 0, 0) + t(1, 2, 1)', 'L₂: (3, 6, 1) + s(−2, −4, −2)'], ['L₁: (1, 0, 0) + t(0, 1, 1)', 'L₂: (0, 1, 1) + s(1, 0, 0)'], ['L₁: (0, 0, 0) + t(1, 0, 0)', 'L₂: (0, 1, 1) + s(0, 1, 0)']];
  const pares = K => PARES.map(([a, b], i) => K.t(14, 24 + i * 54, a, 's', 'start') + K.t(14, 42 + i * 54, b, 's', 'start')).join('');

  // Problema: el velero que cruza el canal x = 1.  v { t }
  const O6 = [170, 106], U6 = 20, Q6 = en(O6, U6), A6 = [-3, 2], V6 = [2, -1];
  const velero = (v, K) => {
    const X = mas(A6, V6, v.t), [x, y] = Q6(...X);
    let h = rej(K, O6, U6, -5, 6, -4, 4) + K.l(...Q6(1, -4), ...Q6(1, 4), 'lg gr') + K.t(Q6(1, 4)[0] + 6, Q6(1, 4)[1] + 12, 'canal x = 1', 's tg', 'start');
    h += tramo(K, Q6, A6, V6, -1, 4, 'lm d') + K.c(...Q6(...A6), 5, 'fg') + K.t(Q6(...A6)[0] - 6, Q6(...A6)[1] - 8, 'A · 0 h', 's tg', 'end');
    h += K.c(...Q6(3, -1), 5, 'fg') + K.t(Q6(3, -1)[0] + 6, Q6(3, -1)[1] + 16, 'B · 3 h', 's tg', 'start');
    return h + K.c(x, y, 7, 'fa') + K.t(14, 18, `t = ${N(v.t)} h: ${pt(X)}`, 's ta', 'start');
  };

  xpLec('geo-12', [
    ['Un punto y una dirección',
      xpMira('dibujo', 'Una recta queda fija con **un punto** y **una dirección**: desde el punto se camina tantas veces como se quiera en esa dirección.', { dib: vectorial, v: { k: 0 }, alto: 206 }, [
        ['Para fijar una recta basta un punto P y una dirección: el vector director d.', {}],
        ['Se camina t veces d desde P: t = 1 lleva a P + d y t = 2, al doble.', { k: 1 }],
        ['Con t negativo se camina hacia atrás. Todos los valores de t juntos dibujan la recta entera.', { k: 2 }],
        ['Esa es la ecuación vectorial: X = P + t d. Cada número t da un punto de la recta.', { k: 3 }, '$X = P + t\\,\\vec d,\\ t \\in \\mathbb{R}$'],
        ['Separando las componentes salen las paramétricas: x = −3 + 2t y y = −1 + t.', { k: 4 }],
        ['Si t es el tiempo, d es la velocidad: lo que se avanza en cada unidad de tiempo.', { k: 5 }],
      ], 'Una recta es $X = P + t\\vec d$: un punto, un director y un número t que recorre todos los reales.'),
      xpHaz('dibujo', 'Una lancha sigue X = (−3, −1) + t(2, 1), con t en horas. Desliza t hasta que llegue a la boya (5, 3).', {
        dib: lancha, v: { t: 0 }, metas: { t: 4 }, alto: 250, manijas: [{ k: 't', min: -2, max: 6, paso: 1, et: 't (horas)' }],
        lee: v => `$X(${v.t}) = (${-3 + 2 * v.t}, ${-1 + v.t})$`, pista: 'Cada hora la lancha avanza 2 en x y 1 en y. ¿Cuántas horas le faltan para pasar de x = −3 a x = 5?' },
      'Con $t = 4$: $(-3 + 8, -1 + 4) = (5, 3)$, la boya.')],
    ['Segmentos, rayos y dos puntos',
      xpMira('dibujo', 'Con **dos puntos** también se fija una recta, y el intervalo de t decide qué **parte** de ella se dibuja.', { dib: dosPuntos, v: { k: 0 }, alto: 196 }, [
        ['Por dos puntos A y B pasa una sola recta. Su director puede ser d = B − A.', {}],
        ['Así X = A + t(B − A): t = 0 da el punto A y t = 1 da B.', { k: 1 }, '$X = A + t\\,(B - A)$'],
        ['Si t va solo de 0 a 1, se dibuja el segmento AB, y nada más.', { k: 2 }],
        ['Con t ≥ 0 sale un rayo: empieza en A, pasa por B y no se detiene.', { k: 3 }],
        ['Con t ≤ 0 sale el rayo opuesto: empieza en A y va hacia el otro lado.', { k: 4 }],
        ['Con t = ½ se llega justo a la mitad: el punto medio es A + ½(B − A).', { k: 5 }],
      ], 'Por dos puntos, $\\vec d = B - A$; con $0 \\le t \\le 1$ sale el segmento y con $t \\ge 0$, un rayo.'),
      xpHaz('fichas', 'Las tres piezas son de X = A + t(B − A). Pon al lado de cada una el intervalo de t que la dibuja.', {
        slots: [0, 1, 2].map(i => ({ x: 284, y: 30 + i * 46, w: 96, h: 34 })), alto: 140, fondo: piezas,
        fichas: ['0 ≤ t ≤ 1', 't ≥ 0', 't ≤ 0', '−1 ≤ t ≤ 1', 't ≥ 1'], meta: ['0 ≤ t ≤ 1', 't ≥ 0', 't ≤ 0'], pista: 'En A, t = 0; en B, t = 1. Mira hasta dónde llega cada pieza y si se detiene.' },
      'Segmento: $0 \\le t \\le 1$; el rayo de A por B: $t \\ge 0$; el rayo opuesto: $t \\le 0$.')],
    ['Pendiente y ecuaciones escalares',
      xpMira('dibujo', 'En el plano, la recta también se escribe **sin t**: con su pendiente o con una ecuación $ax + by = c$.', { dib: escalares, v: { k: 0 }, alto: 200 }, [
        ['El ángulo de inclinación θ se mide desde el eje x positivo, contra las agujas del reloj, entre 0° y 180°.', {}],
        ['Pendiente: lo que sube el director entre lo que avanza, m = d₂/d₁. Con d = (2, 1), m = ½.', { k: 1 }, '$m = \\dfrac{d_2}{d_1} = \\tan\\theta$'],
        ['Con el punto (2, 3) sale la forma punto-pendiente: y − 3 = ½(x − 2).', { k: 2 }],
        ['Despejando y queda y = ½x + 2. El 2 es el intercepto: donde la recta corta el eje y.', { k: 3 }],
        ['Multiplicando por 2 y ordenando queda x − 2y = −4: la forma general ax + by = c.', { k: 4 }],
        ['El par (a, b) = (1, −2) es perpendicular a la recta: es su vector normal.', { k: 5 }],
      ], '$m = d_2/d_1 = \\tan\\theta$; formas punto-pendiente, pendiente-intercepto y general $ax + by = c$, de normal $(a, b)$.'),
      xpHaz('fichas', 'Pasa y = 3x − 5 a la forma general ax + by = c, con a positivo.', {
        slots: [60, 160, 262].map(x => ({ x, y: 64, w: 54, h: 34 })), alto: 100,
        fondo: K => K.t(170, 22, 'y = 3x − 5', 'ta') + K.t(92, 69, 'x +', 's', 'start') + K.t(192, 69, 'y =', 's', 'start'),
        fichas: ['3', '−1', '5', '1', '−5', '−3'], meta: ['3', '−1', '5'], pista: 'Pasa 3x al lado izquierdo y el −5 al derecho; luego cambia todos los signos si a quedó negativo.' },
      '$3x - y = 5$: su normal es $(3, -1)$, perpendicular al director $(1, 3)$.')],
    ['Paralelas, perpendiculares y el espacio',
      xpMira('dibujo', 'Los directores dicen cómo están **dos rectas**, en el plano y en el espacio.', { dib: relaciones, v: { k: 0 }, alto: 196 }, [
        ['Dos rectas son paralelas si sus directores son paralelos: uno es múltiplo del otro y tienen igual pendiente.', {}],
        ['Al girar un director (d₁, d₂) un cuarto de vuelta queda (−d₂, d₁): esa es la dirección perpendicular.', { k: 1 }],
        ['Las pendientes d₂/d₁ y −d₁/d₂ multiplicadas dan −1. Por eso dos perpendiculares cumplen m₁m₂ = −1.', { k: 2 }, '$m_1 m_2 = -1$'],
        ['En la general lo dicen los normales: proporcionales si son paralelas, en ángulo recto si son perpendiculares.', { k: 3 }],
        ['En el espacio la recta es igual, con tres paramétricas. Despejando t en cada una salen las simétricas.', { k: 4 }, '$\\dfrac{x - x_0}{d_1} = \\dfrac{y - y_0}{d_2} = \\dfrac{z - z_0}{d_3}$'],
        ['Dos rectas del espacio se cortan, son paralelas o se cruzan: ni se tocan ni son paralelas.', { k: 5 }],
      ], 'Paralelas: directores proporcionales. Perpendiculares: $m_1 m_2 = -1$. En el espacio pueden, además, cruzarse.'),
      xpHaz('dibujo', 'Por Q = (1, 1) traza la perpendicular a y = x/2 + 1: arrastra la punta de su director w.', {
        dib: perpendicular, v: { a: 2, b: 0 }, cumple: v => (v.a !== 0 || v.b !== 0) && v.b === -2 * v.a, sol: { a: 1, b: -2 }, alto: 200,
        manijas: [{ k: ['a', 'b'], min: -3, max: 3, paso: 1, en: v => Q5(1 + v.a, 1 + v.b), de: (x, y) => [(x - O5[0]) / U5 - 1, (O5[1] - y) / U5 - 1] }],
        lee: v => (v.a ? `$m_w = ${N(v.b / v.a)}$` : '$\\vec w$ vertical'), pista: 'La recta dada tiene director (2, 1). Gíralo un cuarto de vuelta: (−d₂, d₁).' },
      '$\\vec w = (1, -2)$ o $(-1, 2)$: pendiente $-2$, y $\\tfrac{1}{2} \\cdot (-2) = -1$.'),
      xpHaz('fichas', 'Di cómo está cada pareja de rectas del espacio.', {
        slots: [0, 1, 2].map(i => ({ x: 284, y: 28 + i * 54, w: 96, h: 34 })), alto: 166, fondo: pares,
        fichas: ['paralelas', 'se cortan', 'se cruzan', 'la misma'], meta: ['paralelas', 'se cortan', 'se cruzan'], pista: 'Compara los directores. Si no son paralelos, iguala las coordenadas y mira si hay t y s que cumplan las tres.' },
      '1: directores proporcionales, sin punto común. 2: con $t = s = 1$ ambas dan $(1, 1, 1)$. 3: $t = 0$, $s = -1$ y la z no coincide.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un velero va en línea recta y a velocidad constante: pasa por A a las 0 h y por B a las 3 h. Desliza t hasta el instante en que cruza el canal x = 1.', {
        dib: velero, v: { t: 0 }, metas: { t: 2 }, alto: 250, manijas: [{ k: 't', min: 0, max: 6, paso: 0.5, et: 't (horas)' }],
        lee: v => `$X(${v.t}) = (${N(-3 + 2 * v.t)}, ${N(2 - v.t)})$`, pista: 'Primero la velocidad: (B − A) entre 3 horas. Luego iguala la x de X(t) a 1.' },
      'Velocidad $\\tfrac{B - A}{3} = (2, -1)$; $-3 + 2t = 1$ da $t = 2$, en el punto $(1, 0)$.')],
  ], 'La recta es $X = P + t\\vec d$; su pendiente, su normal y sus directores dicen todo: tramos, formas, paralelas y perpendiculares.');
}
