// Geometría Vectorial · explicación de geo-6 «La función determinante» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
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
  const ang = a => Math.atan2(a[1], a[0]) * 180 / Math.PI;
  const giro = (K, O, a, b, d) => { const a0 = ang(a); let b0 = ang(b); b0 = a0 + (((b0 - a0) % 360) + 540) % 360 - 180; return d ? K.arc(...O, 26, a0, b0, d > 0 ? 'lo gr' : 'lf gr') : ''; };

  // Capítulo 1: el paralelogramo de las columnas, su área con signo y el triángulo.  v { a, b, k }  (u = (4, 1) fijo, w = (a, b))
  const AU = [4, 1], AO = [120, 130], AS = 20;
  const area = (v, K) => {
    const q = k(v), w = [v.a, v.b], d = AU[0] * v.b - AU[1] * v.a;
    let h = rej(K, AO, AS, -4, 8, -3, 4);
    if (q === 5) h += K.p([[0, 0], AU, w].map(([x, y]) => [AO[0] + x * AS, AO[1] - y * AS]), 'fg');
    else h += para(K, AO, AS, AU, w, Math.abs(d) < 0.05 ? 'ff' : 'fa');
    if (q === 3) h += K.l(AO[0] - 4 * AS, AO[1] + AS, AO[0] + 8 * AS, AO[1] - 2 * AS, 'lf gr');
    h += K.ar(...AO, AO[0] + AU[0] * AS, AO[1] - AU[1] * AS, 'la gr') + K.ar(...AO, AO[0] + w[0] * AS, AO[1] - w[1] * AS, 'lg gr');
    if (q >= 1 && q <= 2) h += giro(K, AO, AU, w, d);
    h += K.t(AO[0] + AU[0] * AS + 4, AO[1] - AU[1] * AS + 16, 'u', 's ta', 'start') + K.t(AO[0] + w[0] * AS - 6, AO[1] - w[1] * AS - 6, 'w', 's tg', 'end');
    const pie = ['columnas u = (4, 1) y w', `det = 4·${r1(v.b)} − 1·${r1(v.a)} = ${r1(d)}`, `det = ${r1(d)}: w gira a la derecha`, 'w sobre la recta de u: det = 0', 'área = |ad − bc|', `triángulo: ½|det| = ${r1(Math.abs(d) / 2)}`][q];
    return h + K.t(332, 22, pie, 's tm', 'end');
  };
  // Capítulo 1, tu turno: det(u, w) = −4 con u = (1, 2).  v { a, b }
  const TU = [1, 2], TO = [170, 116], TS = 20;
  const turno1 = (v, K) => rej(K, TO, TS, -4, 4, -4, 4) + para(K, TO, TS, TU, [v.a, v.b], 'fa') + K.ar(...TO, TO[0] + TU[0] * TS, TO[1] - TU[1] * TS, 'la gr') + K.ar(...TO, TO[0] + v.a * TS, TO[1] - v.b * TS, 'lg gr')
    + K.t(TO[0] + TU[0] * TS + 6, TO[1] - TU[1] * TS, 'u', 's ta', 'start');

  // Capítulo 2: la caja de las tres columnas.  v { s, h, k }: tercera columna (s, s, h)
  const BO = [110, 140], BU = 18, BI = (x, y, z) => XPK.iso(BO, BU, x, y, z);
  const caja = (v, K) => {
    const q = k(v), a = [2, 0, 0], b = [0, 3, 0], w = [v.s, v.s, v.h], S = (...vs) => vs.reduce((s, p) => s.map((x, i) => x + p[i]), [0, 0, 0]), z = [0, 0, 0], V = p => BI(...p);
    const caras = [[z, a, S(a, b), b], [w, S(a, w), S(a, b, w), S(b, w)], [z, a, S(a, w), w], [b, S(a, b), S(a, b, w), S(b, w)], [z, b, S(b, w), w], [a, S(a, b), S(a, b, w), S(a, w)]];
    const d = 6 * v.h, cl = Math.abs(d) < 0.05 ? 'ff' : d < 0 ? 'fg' : 'fa';
    let h = caras.map(c => K.p(c.map(V), cl)).join('') + K.ar(...V(z), ...V(a), 'la gr') + K.ar(...V(z), ...V(b), 'la gr') + K.ar(...V(z), ...V(w), 'lg gr');
    h += K.t(262, 26, 'A =', 's', 'end') + mat(K, 300, 40, [[2, 0, r1(v.s)], [0, 3, r1(v.s)], [0, 0, r1(v.h)]], 's', 22, 18);
    const pie = ['aristas: las tres columnas', `base 2 · 3, altura ${r1(v.h)}: det = ${r1(d)}`, `inclinada: det = ${r1(d)}, igual`, `la arista baja: det = ${r1(d)}`, 'tres aristas en un plano: 0', 'det A = volumen con signo'][q];
    return h + K.t(332, 112, pie, 's tm', 'end');
  };

  // Capítulo 3: tablero de signos, menores, la columna con ceros y Sarrus.  v { k }
  const M3 = [[2, 0, 1], [3, -1, 4], [1, 0, 5]];
  const cofa = (v, K) => {
    const q = k(v), x0 = 60, y0 = 50, dx = 38, dy = 30;
    let h = '';
    if (q === 2) h += K.r(x0 - 18, y0 - 16, dx * 3 - 2, dy - 4, 'fg', 6) + K.r(x0 - 18, y0 - 16, 34, dy * 3 - 4, 'fg', 6);
    if (q >= 3 && q <= 4) h += K.r(x0 + dx - 18, y0 - 16, 34, dy * 3 - 4, 'fa', 6);
    if (q < 5) {
      h += K.pl([[x0 - 18, y0 - 18], [x0 - 24, y0 - 18], [x0 - 24, y0 + 2 * dy + 16], [x0 - 18, y0 + 2 * dy + 16]]) + K.pl([[x0 + 2 * dx + 18, y0 - 18], [x0 + 2 * dx + 24, y0 - 18], [x0 + 2 * dx + 24, y0 + 2 * dy + 16], [x0 + 2 * dx + 18, y0 + 2 * dy + 16]]);
      M3.forEach((r, i) => r.forEach((e, j) => { h += K.t(x0 + j * dx, y0 + i * dy + 5, q === 1 ? ((i + j) % 2 ? '−' : '+') : r1(e), q === 1 ? ((i + j) % 2 ? 'tf' : 'to') : ''); }));
    }
    if (q === 0) h += K.t(250, 80, 'una matriz 3 × 3', 's tm');
    if (q === 1) h += K.t(250, 80, 'signos en tablero', 's tm') + K.t(250, 100, 'de ajedrez', 's tm');
    if (q === 2) h += K.t(250, 70, 'tapar fila 1 y columna 1:', 's tm') + mat(K, 250, 104, [[-1, 4], [0, 5]], 's') + K.t(250, 140, 'M₁₁ = −5 − 0 = −5', 's ta');
    if (q === 3) h += K.t(250, 70, 'la columna 2 tiene dos ceros', 's tm') + K.t(250, 96, 'solo queda + (−1) · M₂₂', 's ta');
    if (q === 4) h += K.t(250, 70, 'M₂₂ = 2·5 − 1·1 = 9', 's') + K.t(250, 96, 'det = (−1) · 9 = −9', 'ta');
    if (q === 5) {
      const E = M3.map(f => [...f, f[0], f[1]]);
      E.forEach((r, i) => r.forEach((e, j) => { h += K.t(40 + j * 36, 50 + i * 28, r1(e), j > 2 ? 's tm' : 's'); }));
      for (let j = 0; j < 3; j++) h += K.l(32 + j * 36, 38, 116 + j * 36, 112, 'lo') + K.l(32 + j * 36, 118, 116 + j * 36, 40, 'lf d');
      h += K.t(264, 60, 'bajadas: −10 + 0 + 0', 's to') + K.t(264, 84, 'subidas: −1 + 0 + 0', 's tf') + K.t(264, 112, '−10 − (−1) = −9', 'ta');
    }
    return h;
  };

  // Capítulo 4: triangular, transpuesta y factor de escala.  v { k, t }
  const atajo = (v, K) => {
    const q = k(v);
    if (q <= 1) return K.t(110, 30, 'triangular', 's tm') + K.r(69, 43, 22, 22, 'fa', 5) + K.r(99, 69, 22, 22, 'fa', 5) + K.r(129, 95, 22, 22, 'fa', 5)
      + mat(K, 110, 80, [[3, 5, -2], [0, 2, 7], [0, 0, -1]], '', 30, 26)
      + (q === 1 ? K.t(260, 70, 'det = 3 · 2 · (−1)', 's') + K.t(260, 96, '= −6', 'ta') : K.t(260, 80, 'ceros bajo la diagonal', 's tm'));
    if (q === 2) return mat(K, 90, 80, [[1, 4], [2, 3]], '', 30, 26) + K.t(170, 86, '→', '') + mat(K, 250, 80, [[1, 2], [4, 3]], '', 30, 26)
      + K.t(90, 140, 'det = 3 − 8 = −5', 's') + K.t(250, 140, 'det Aᵀ = 3 − 8 = −5', 's ta');
    const O = [60, 170], u = 26, s = v.t, P = ([x, y]) => [O[0] + x * u, O[1] - y * u], T = ([x, y]) => [x + s * (2 * x + y - x), y + s * (x + 2 * y - y)];
    const fig = q === 3 ? [[0, 0], [1, 0], [1, 1], [0, 1]] : [[0, 0], [2, 0], [1, 2]];
    let h = rej(K, O, u, 0, 7, 0, 6) + K.pl([...fig, fig[0]].map(P), 'lm d') + K.p(fig.map(q => P(T(q))), 'fa');
    h += K.t(330, 24, 'T =', 's', 'end') + mat(K, 304, 54, [[2, 1], [1, 2]], 's');
    const pie = q === 3 ? (s > 0.5 ? 'el cuadrado de área 1 pasa a área 3' : 'el cuadrado de área 1') : q === 4 ? (s > 0.5 ? 'área 2 → área 2 · 3 = 6' : 'un triángulo de área 2') : 'área nueva = |det T| · área';
    return h + K.t(330, 100, `det T = 4 − 1 = 3`, 's ta', 'end') + K.t(330, 124, pie, 's tm', 'end');
  };
  // Capítulo 4, tu turno: T = [[k, 1], [1, 1]] lleva un triángulo de área 3 a área 12.  v { k }
  const turno4 = (v, K) => {
    const O = [110, 160], u = 10, M = [[v.k, 1], [1, 1]], fig = [[0, 0], [3, 0], [0, 2]], ap = ([x, y]) => [M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y], P = ([x, y]) => [O[0] + x * u, O[1] - y * u];
    return K.l(O[0] - 30, O[1], O[0] + 22 * u, O[1], 'lm') + K.l(O[0], O[1] + 4, O[0], O[1] - 12 * u, 'lm')
      + K.pl([...fig, fig[0]].map(P), 'lm d') + K.p(fig.map(q => P(ap(q))), 'fa')
      + K.t(330, 24, 'T =', 's', 'end') + mat(K, 304, 54, [[r1(v.k), 1], [1, 1]], 's') + K.t(330, 100, 'triángulo: 3 u²', 's tm', 'end');
  };

  // Problema: la vela del velero.  v { x, y }: punta de la vela
  const VO = [40, 196], VU = 26;
  const vela = (v, K) => {
    const P = ([x, y]) => [VO[0] + x * VU, VO[1] - y * VU];
    return rej(K, VO, VU, 0, 6, 0, 6) + K.p([[0, 0], [6, 1], [v.x, v.y]].map(P), 'fa') + K.c(...P([0, 0]), 4, 'fk') + K.c(...P([6, 1]), 4, 'fk')
      + K.t(P([6, 1])[0] + 8, P([6, 1])[1] + 4, '(6, 1)', 's tm', 'start') + K.t(332, 22, `punta (${v.x}, ${v.y})`, 's', 'end');
  };

  xpLec('geo-6', [
    ['Área con signo',
      xpMira('dibujo', 'El determinante de una matriz 2 × 2 es un **área**, y su signo dice hacia dónde gira el par de columnas.', { dib: area, v: { a: 1, b: 3, k: 0 }, alto: 220 }, [
        ['Las columnas de la matriz son dos flechas, u y w. Juntas forman un paralelogramo.', {}],
        ['Su área con signo es ad − bc, aquí 11. Es positiva porque w gira a la izquierda de u.', { k: 1 }, '$\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$'],
        ['Si w pasa al otro lado y gira a la derecha, como las agujas del reloj, el número sale negativo.', { a: 1, b: -2, k: 2 }],
        ['Si w cae sobre la recta de u, el paralelogramo se aplasta: el determinante vale 0.', { a: -4, b: -1, k: 3 }],
        ['El área de verdad es el valor absoluto, |ad − bc|; el signo solo cuenta el sentido del giro.', { a: 1, b: 3, k: 4 }],
        ['Un triángulo con una esquina en el origen mide la mitad. Un polígono se parte en esos triángulos y se suma.', { k: 5 }, '$\\text{área} = \\tfrac{1}{2}\\,|\\det(P, Q)|$'],
      ], 'El determinante 2 × 2 es el área con signo del paralelogramo de las columnas: + si giran a la izquierda, − a la derecha.'),
      xpHaz('dibujo', 'Con u = (1, 2), arrastra w hasta que det(u, w) = −4: área 4 y w girando a la derecha de u.', {
        dib: turno1, v: { a: 0, b: 3 }, cumple: v => TU[0] * v.b - TU[1] * v.a === -4, sol: { a: 2, b: 0 }, alto: 232,
        manijas: [{ k: ['a', 'b'], min: -4, max: 4, paso: 1, rot: () => 'w', en: v => [TO[0] + v.a * TS, TO[1] - v.b * TS], de: (x, y) => [(x - TO[0]) / TS, (TO[1] - y) / TS] }],
        lee: v => `$\\det(\\vec u, \\vec w) = 1 \\cdot ${v.b < 0 ? `(${v.b})` : v.b} - 2 \\cdot ${v.a < 0 ? `(${v.a})` : v.a} = ${v.b - 2 * v.a}$`, pista: 'Para que salga negativo, w debe quedar del lado de las agujas del reloj, a la derecha de u.' },
      'Con $\\vec w = (2, 0)$: $1 \\cdot 0 - 2 \\cdot 2 = -4$. También sirven $(3, 2)$ o $(1, -2)$.')],
    ['Volumen con signo',
      xpMira('dibujo', 'En 3 × 3 las tres columnas son las aristas de una **caja inclinada**, y el determinante es su volumen con signo.', { dib: caja, v: { s: 0, h: 2, k: 0 }, alto: 230 }, [
        ['Las tres columnas de la matriz salen de un mismo vértice: son las aristas de una caja.', {}],
        ['Si la caja es recta, el volumen es base por altura: 2 · 3 · 2 = 12. Ese es el determinante.', { k: 1 }],
        ['Si la tercera arista se inclina pero sigue a la misma altura, la caja se ladea y su volumen no cambia: 12.', { s: 1, k: 2 }],
        ['Si la arista apunta hacia abajo, el volumen se mide igual, pero el signo sale negativo: la terna quedó al revés.', { h: -1.5, k: 3 }],
        ['Si las tres aristas caen en un mismo plano, la caja se aplasta y el determinante vale 0.', { h: 0, k: 4 }],
        ['Así, det A es el volumen con signo de la caja que forman las columnas.', { h: 2, k: 5 }],
      ], 'El determinante 3 × 3 es el volumen con signo de la caja de las columnas; vale 0 si se aplasta.'),
      xpHaz('dibujo', 'La base de la caja mide 2 por 3. Desliza la altura h hasta que el determinante sea −15.', {
        dib: caja, v: { s: 1, h: 1, k: 5 }, metas: { h: -2.5 }, alto: 260,
        manijas: [{ k: 'h', min: -3, max: 3, paso: 0.5, et: 'h: altura de la tercera arista' }],
        lee: v => `$\\det A = 2 \\cdot 3 \\cdot ${v.h < 0 ? `(${v.h})` : v.h} = ${6 * v.h}$`, pista: 'El volumen es 2 · 3 · h. Si el resultado es negativo, la arista debe apuntar hacia abajo.' },
      'Con $h = -2.5$: $2 \\cdot 3 \\cdot (-2.5) = -15$. La caja mide 15 y su arista apunta hacia abajo.')],
    ['Cofactores y Sarrus',
      xpMira('dibujo', 'Para calcular un determinante 3 × 3 se parte en determinantes 2 × 2: los **cofactores**.', { dib: cofa, v: { k: 0 }, alto: 190 }, [
        ['Toma esta matriz 3 × 3. Su determinante se arma con determinantes más pequeños.', {}],
        ['Cada casilla tiene un signo, como un tablero de ajedrez: + en la esquina y luego alterna.', { k: 1 }],
        ['El menor de una casilla es el 2 × 2 que queda al tapar su fila y su columna.', { k: 2 }],
        ['Se elige una fila o columna y se suma signo · entrada · menor. Con ceros, hay menos cuentas.', { k: 3 }, '$\\det A = \\sum_j (-1)^{i+j} a_{ij} M_{ij}$'],
        ['Aquí la columna 2 tiene dos ceros: queda un solo término y det = −9.', { k: 4 }],
        ['Sarrus, solo en 3 × 3: copia dos columnas, suma las bajadas y resta las subidas. Da −9 también.', { k: 5 }],
      ], 'Cofactores: signo del tablero · entrada · menor, por la línea con más ceros. Sarrus: bajadas menos subidas.'),
      xpHaz('fichas', 'Pon el signo de cada casilla de una matriz 3 × 3 en el tablero de los cofactores.', {
        slots: [0, 1, 2].flatMap(i => [0, 1, 2].map(j => ({ x: 120 + j * 50, y: 26 + i * 44, w: 40, h: 36 }))), alto: 140, repite: true,
        fondo: K => K.pl([[96, 4], [88, 4], [88, 136], [96, 136]]) + K.pl([[244, 4], [252, 4], [252, 136], [244, 136]]),
        fichas: ['+', '−'], meta: ['+', '−', '+', '−', '+', '−', '+', '−', '+'], pista: 'La esquina de arriba a la izquierda lleva +, y cada paso a un lado o hacia abajo cambia el signo.' },
      'El signo de la casilla $(i, j)$ es $(-1)^{i+j}$: + en las esquinas y en el centro, − en las demás.')],
    ['Atajos y escalas',
      xpMira('dibujo', 'Hay matrices en las que el determinante sale casi sin hacer cuentas, y un uso para él: **escalar áreas**.', { dib: atajo, v: { k: 0, t: 0 }, alto: 200 }, [
        ['Una matriz triangular tiene ceros a un lado de la diagonal.', {}],
        ['Su determinante es el producto de la diagonal: al desarrollar por la columna 1 solo queda un término cada vez.', { k: 1 }],
        ['Si las filas pasan a columnas, el determinante no cambia: det Aᵀ = det A.', { k: 2 }, '$\\det A^T = \\det A$'],
        ['Una transformación T lleva el cuadrado de área 1 al paralelogramo de sus columnas, de área |det T|.', { k: 3, t: 1 }],
        ['Toda figura cambia igual: un triángulo de área 2 pasa a medir 2 · 3 = 6.', { k: 4, t: 1 }],
        ['Por eso |det T| es el factor de escala de las áreas.', { k: 5, t: 1 }, '$\\text{área nueva} = |\\det T| \\cdot \\text{área}$'],
      ], 'Triangular: producto de la diagonal. $\\det A^T = \\det A$. Una transformación multiplica las áreas por $|\\det T|$.'),
      xpHaz('dibujo', 'Un triángulo de 3 u² se transforma con T = [k 1; 1 1]. Desliza k hasta que la imagen mida 12 u².', {
        dib: turno4, v: { k: 1 }, metas: { k: 5 }, alto: 230,
        manijas: [{ k: 'k', min: -2, max: 6, paso: 1, et: 'k: arriba a la izquierda de T' }],
        lee: v => `$|\\det T| \\cdot 3 = |${v.k} - 1| \\cdot 3 = ${Math.abs(v.k - 1) * 3}$`, pista: 'El área nueva es |det T| · 3, con det T = k − 1. ¿Qué factor lleva 3 a 12?' },
      'Se necesita $|\\det T| = 4$, es decir $|k - 1| = 4$: $k = 5$ (el $-3$ no está en la perilla).')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una vela triangular tiene esquinas en (0, 0) y (6, 1), en metros. Arrastra la punta para que la vela mida 15 m², con área ½|det|.', {
        dib: vela, v: { x: 2, y: 2 }, cumple: v => Math.abs(6 * v.y - v.x) === 30, sol: { x: 0, y: 5 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, rot: () => 'P', en: v => [VO[0] + v.x * VU, VO[1] - v.y * VU], de: (x, y) => [(x - VO[0]) / VU, (VO[1] - y) / VU] }],
        lee: v => `$\\tfrac{1}{2}|\\det| = \\tfrac{1}{2}|6 \\cdot ${v.y} - 1 \\cdot ${v.x}| = ${Math.abs(6 * v.y - v.x) / 2}$`, pista: 'El área es ½|6y − x|: necesitas que 6y − x valga 30.' },
      'Con la punta en $(0, 5)$: $\\tfrac{1}{2}|6 \\cdot 5 - 1 \\cdot 0| = 15$ m². También sirve $(6, 6)$.')],
  ], 'El determinante mide áreas y volúmenes con signo; se calcula por cofactores o Sarrus y escala las áreas por $|\\det T|$.');
}
