// Geometría Vectorial · juegos de la lección geo-7 «El determinante con matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js: XG.figura (se arrastra), XG.rotula (fichas a su lugar) y XG.tiros (en movimiento). Se dibujan con XPK.
(() => {
  const N = x => String(x).replace('-', '−');
  const T = x => (x < 0 ? `(${N(x)})` : N(x));                       // número dentro de una cuenta en texto plano
  const TX = x => (x < 0 ? `(${x})` : String(x));                     // lo mismo, en TeX
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const det3 = M => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const avisa = metas => (q, p) => { const ms = metas(p), i = ms.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const suyas = p => p.metas;
  // Matriz con sus corchetes, centrada en (cx, cy); dx y dy: espacio por columna y por fila.
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? N(e) : e, cls); }));
    return s;
  }
  // Encuadre: pone los puntos (en unidades) dentro del rectángulo [x0, x1] × [y0, y1] con la misma escala en x y en y.
  function encuadra(pts, x0, x1, y0, y1, umax) {
    const xs = [0, ...pts.map(q => q[0])], ys = [0, ...pts.map(q => q[1])];
    const a = Math.floor(Math.min(...xs)), b = Math.ceil(Math.max(...xs)), c = Math.floor(Math.min(...ys)), d = Math.ceil(Math.max(...ys));
    const u = Math.min(umax, (x1 - x0) / ((b - a) || 1), (y1 - y0) / ((d - c) || 1));
    const O = [x0 + ((x1 - x0) - (b - a) * u) / 2 - a * u, y0 + ((y1 - y0) - (d - c) * u) / 2 + d * u];
    return { u, O, a, b, c, d, P: (x, y) => [O[0] + x * u, O[1] - y * u] };
  }
  const rejilla = (K, E) => {
    let h = '';
    for (let i = E.a; i <= E.b; i++) h += K.l(...E.P(i, E.c), ...E.P(i, E.d), i ? 'lr' : 'lm');
    for (let j = E.c; j <= E.d; j++) h += K.l(...E.P(E.a, j), ...E.P(E.b, j), j ? 'lr' : 'lm');
    return h;
  };
  const para = (K, E, r1, r2, cls) => K.p([[0, 0], r1, [r1[0] + r2[0], r1[1] + r2[1]], r2].map(q => E.P(...q)), cls);
  const giro = d => (d > 0 ? 'de la fila 1 a la 2: antihorario, det > 0' : d < 0 ? 'de la fila 1 a la 2: horario, det < 0' : 'sin área: det = 0');

  // ------------------------------------------------------- cizalla-sin-area · R₂ → R₂ + kR₁ desliza la fila 2 sin cambiar el área
  // Las filas de A son flechas; con k la fila 2 resbala paralela a la fila 1. Meta: que la fila 2 caiga sobre el eje vertical
  // (su primera entrada en 0), y la matriz queda triangular con el mismo determinante.   v { k }   params { A, min, max, ok }
  const CR = (A, k) => [A[1][0] + k * A[0][0], A[1][1] + k * A[0][1]];
  const CE = p => {
    const pts = [p.A[0]];
    for (let k = p.min; k <= p.max; k++) { const r = CR(p.A, k); pts.push(r, [r[0] + p.A[0][0], r[1] + p.A[0][1]]); }
    return encuadra(pts, 14, 226, 26, 206, 20);
  };
  const CK = p => -p.A[1][0] / p.A[0][0];
  XG.figura('cizalla-sin-area', {
    ini: () => ({ k: 0 }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k en R₂ → R₂ + k·R₁' }],
    ok: (v, p) => CR(p.A, v.k)[0] === 0, sol: p => ({ k: CK(p) }),
    texto: p => { const k = CK(p), r = CR(p.A, k); return `$k = ${k}$: $${pm([p.A[0], r])}$, $\\det = ${p.A[0][0]} \\cdot ${TX(r[1])} = ${det2(p.A)}$`; },
    alto: () => 270, pie: 'Desliza k: la fila 2 resbala paralela a la fila 1.',
    dib(v, K, p, f) {
      const E = CE(p), r1 = p.A[0], r0 = p.A[1], r2 = CR(p.A, v.k), d = det2(p.A), es = r2[0] === 0;
      const q = (i, s) => [r0[0] + s * r1[0], r0[1] + s * r1[1]];
      let h = rejilla(K, E) + K.l(...E.P(...q(0, p.min - 0.4)), ...E.P(...q(0, p.max + 0.4)), 'lm d');
      h += para(K, E, r1, r0, 'fn') + para(K, E, r1, r2, f >= 1 ? (es ? 'fo' : 'ff') : 'fa');
      h += K.ar(...E.O, ...E.P(...r1), 'la gr') + K.ar(...E.O, ...E.P(...r2), 'lg gr') + K.l(...E.O, ...E.P(...r0), 'lm d');
      h += K.t(...E.P(r1[0] + 0.2, r1[1] + 0.5), 'fila 1', 's ta', 'start') + K.t(...E.P(r2[0] + 0.2, r2[1] + 0.5), 'fila 2', 's tg', 'start');
      h += K.t(286, 36, 'A =', 's') + mat(K, 286, 66, p.A, 's') + K.t(286, 120, `R₂ + ${T(v.k)}·R₁`, 's ta');
      h += K.f(f, mat(K, 286, 154, [r1, r2], 's ta') + K.t(286, 196, `det = ${N(d)} siempre`, 's to') + K.t(286, 214, 'el área no cambió', 's tm'));
      return h;
    },
    lee: (v, p) => { const r = CR(p.A, v.k); return `$R_2 + ${TX(v.k)}R_1 = (${r[0]}, ${r[1]})$, $\\det = ${det2(p.A)}$`; },
    aviso(v, p) {
      const r = CR(p.A, v.k), k = CK(p);
      if (v.k === -k) return `Con k = ${N(v.k)} la primera entrada de la fila 2 crece a ${N(r[0])}: hay que restar, no sumar. El área sigue igual, pero A no queda triangular.`;
      return `Con k = ${N(v.k)} la fila 2 es (${N(r[0])}, ${N(r[1])}): su primera entrada no es 0. El área es la misma, pero falta que la fila 2 quede sobre el eje vertical.`;
    },
    bien: p => p.ok || 'La fila 2 quedó sobre el eje: A es triangular y el área, el determinante, no cambió.',
  });

  // --------------------------------------------------- estira-fila-area · R₁ → kR₁ multiplica el área por k; si k < 0, la voltea
  // La fila 1 se estira por k. Meta: el determinante pedido (con su signo).   v { k }   params { A, meta, min, max, ok }
  const SR = (A, k) => [k * A[0][0], k * A[0][1]];
  const SE = p => {
    const pts = [p.A[1]];
    for (const k of [p.min, p.max]) { const r = SR(p.A, k); pts.push(r, [r[0] + p.A[1][0], r[1] + p.A[1][1]]); }
    return encuadra(pts, 14, 226, 26, 206, 18);
  };
  XG.figura('estira-fila-area', {
    ini: () => ({ k: 1 }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k en R₁ → k·R₁' }],
    ok: (v, p) => v.k * det2(p.A) === p.meta, sol: p => ({ k: p.meta / det2(p.A) }),
    texto: p => `$k = ${p.meta / det2(p.A)}$: $\\det = ${TX(p.meta / det2(p.A))} \\cdot ${TX(det2(p.A))} = ${p.meta}$`,
    alto: () => 270, pie: 'Desliza k: la fila 1 se estira, se encoge o se voltea.',
    dib(v, K, p, f) {
      const E = SE(p), r1 = SR(p.A, v.k), r2 = p.A[1], d = v.k * det2(p.A), es = d === p.meta;
      let h = rejilla(K, E) + para(K, E, p.A[0], r2, 'fn');
      h += para(K, E, r1, r2, f >= 1 ? (es ? 'fo' : 'ff') : 'fa');
      h += K.ar(...E.O, ...E.P(...r1), 'la gr') + K.ar(...E.O, ...E.P(...r2), 'lg gr');
      h += K.t(...E.P(r1[0] + 0.2, r1[1] + 0.5), 'fila 1', 's ta', 'start') + K.t(...E.P(r2[0] + 0.2, r2[1] + 0.5), 'fila 2', 's tg', 'start');
      h += K.t(286, 36, 'A =', 's') + mat(K, 286, 66, p.A, 's') + K.t(286, 112, `det A = ${N(det2(p.A))}`, 's') + K.t(286, 132, `meta: ${N(p.meta)}`, 's ta');
      h += K.f(f, K.t(286, 158, `${T(v.k)} · ${T(det2(p.A))} = ${N(d)}`, `s ${es ? 'to' : 'tf'}`) + K.t(232, 216, giro(d), 's tm', 'end'));
      return h;
    },
    lee: (v, p) => `$\\det = ${TX(v.k)} \\cdot ${TX(det2(p.A))} = ${v.k * det2(p.A)}$`,
    aviso(v, p) {
      const d = v.k * det2(p.A);
      if (d === -p.meta) return `Con k = ${N(v.k)} el área es la pedida, pero el signo no: el determinante es ${N(d)}. La figura tiene que voltearse, así que k cambia de signo.`;
      if (v.k === 0) return 'Con k = 0 la fila 1 se vuelve cero: la figura se aplasta y el determinante vale 0.';
      return `Con k = ${N(v.k)} el determinante es ${T(v.k)}·${T(det2(p.A))} = ${N(d)}, no ${N(p.meta)}. Multiplicar una fila por k multiplica el determinante por k.`;
    },
    bien: p => p.ok || 'El área se multiplicó por |k| y, con k negativo, la figura se volteó: el determinante es el pedido.',
  });

  // ------------------------------------------------------------------- rastro-determinante · la cuenta del factor, paso a paso
  // Se parte de det A y cada operación de fila deja el determinante nuevo.   params { d0, ops, metas, extra, mira, trampas?, ok }
  const RS = p => p.ops.map((_, i) => ({ x: 280, y: 54 + i * 40, w: 84, h: 32 }));
  XG.rotula('rastro-determinante', {
    slots: RS, metas: suyas, fichas: p => [...p.metas, ...p.extra], alto: p => 90 + p.ops.length * 40,
    texto: p => `$\\det A = ${p.d0}$ y después: ${p.metas.map(m => `$${m.replace('−', '-')}$`).join(', ')}`,
    fondo: (K, p, f) => K.t(170, 22, `det A = ${N(p.d0)}`, 's ta') + p.ops.map((o, i) => K.t(20, 59 + i * 40, o, 's', 'start') + K.ar(150, 54 + i * 40, 196, 54 + i * 40, 'lm') + K.t(206, 59 + i * 40, 'det =', 's tm', 'start')).join('')
      + K.f(f, K.t(170, 62 + p.ops.length * 40, 'intercambiar: ·(−1) · fila por k: ·k', 's tm') + K.t(170, 82 + p.ops.length * 40, 'sumar un múltiplo de otra fila: igual', 's tm')),
    aviso: avisa(suyas), bien: p => p.ok,
  });

  // ------------------------------------------------------------- det-elementales · el determinante de cada matriz elemental
  // Tres elementales 3 × 3: se pone su determinante y, al final, el de E₁E₂E₃A.   params { E: [tres 3×3], d0, metas, extra, mira, trampas?, ok }
  const DS = [60, 170, 280].map(x => ({ x, y: 112, w: 66, h: 34 })).concat([{ x: 280, y: 166, w: 76, h: 34 }]);
  XG.rotula('det-elementales', {
    slots: () => DS, metas: suyas, fichas: p => [...p.metas, ...p.extra], alto: () => 214,
    texto: p => `$\\det E_1 = ${p.metas[0].replace('−', '-')}$, $\\det E_2 = ${p.metas[1].replace('−', '-')}$, $\\det E_3 = ${p.metas[2].replace('−', '-')}$; $\\det(E_1E_2E_3A) = ${p.metas[3].replace('−', '-')}$`,
    fondo: (K, p, f) => p.E.map((E, i) => K.t(60 + 110 * i, 16, `E${'₁₂₃'[i]}`, 's tm') + mat(K, 60 + 110 * i, 52, E, 's', 20, 17)).join('')
      + K.t(16, 171, `det(E₁E₂E₃A), si det A = ${N(p.d0)}:`, 's', 'start')
      + K.f(f, K.t(170, 206, 'det(EA) = det E · det A, una elemental a la vez', 's ta')),
    aviso: avisa(suyas), bien: p => p.ok,
  });

  // ------------------------------------------------------------ diagonal-y-factor · triangular y llevar la cuenta del factor
  // A pasa a U (triangular) con dos operaciones. Se ponen el factor de cada una, el producto de la diagonal de U y det A.
  //   params { A, ops: [op1, op2], M (matriz intermedia), U, metas: [f1, f2, producto, det], extra, mira[4], trampas?, ok }
  const YS = [{ x: 95, y: 104, w: 56, h: 32 }, { x: 205, y: 104, w: 56, h: 32 }, { x: 284, y: 150, w: 64, h: 32 }, { x: 284, y: 192, w: 64, h: 32 }];
  XG.rotula('diagonal-y-factor', {
    slots: () => YS, metas: suyas, fichas: p => [...p.metas, ...p.extra], alto: () => 230,
    texto: p => `factores $${p.metas[0].replace('−', '-')}$ y $${p.metas[1].replace('−', '-')}$; diagonal de U: $${p.U.map((f, i) => TX(f[i])).join(' \\cdot ')} = ${p.metas[2].replace('−', '-')}$; $\\det A = ${p.metas[3].replace('−', '-')}$`,
    fondo: (K, p, f) => K.t(40, 14, 'A', 's tm') + mat(K, 40, 50, p.A, 's', 20, 17) + mat(K, 150, 50, p.M, 's', 20, 17) + K.t(260, 14, 'U', 's tm') + mat(K, 260, 50, p.U, 's ta', 20, 17)
      + K.ar(72, 50, 118, 50, 'lm') + K.ar(182, 50, 228, 50, 'lm') + K.t(95, 16, p.ops[0], 's') + K.t(205, 16, p.ops[1], 's')
      + K.t(14, 109, 'factor', 's tm', 'start')
      + K.t(16, 155, 'producto de la diagonal de U', 's', 'start') + K.t(16, 197, 'det A', 's', 'start')
      + K.f(f, K.t(16, 222, 'det A · (factores) = det U', 's ta', 'start')),
    aviso: avisa(suyas), bien: p => p.ok,
  });

  // ------------------------------------------------------------- filas-gemelas · filas proporcionales dan determinante 0
  // A 3 × 3 con la entrada t en la fila 3. Barras de la fila 1 y de la fila 3, columna por columna. Meta: det A = 0.
  //   v { t }   params { A (con la entrada [2][2] libre), min, max, ok }   det(A) es lineal en t con un solo cero.
  const GA = (A, t) => [A[0], A[1], [A[2][0], A[2][1], t]];
  const GT = p => { const a = det3(GA(p.A, 0)), b = det3(GA(p.A, 1)) - a; return -a / b; };
  XG.figura('filas-gemelas', {
    ini: p => ({ t: p.ini ?? 0 }),
    manijas: p => [{ k: 't', min: p.min, max: p.max, paso: 1, et: 't: abajo a la derecha de A' }],
    ok: (v, p) => det3(GA(p.A, v.t)) === 0, sol: p => ({ t: GT(p) }),
    texto: p => { const t = GT(p), r = p.A[2][0] / p.A[0][0]; return `$t = ${t}$: la fila 3 es $${r}$ veces la fila 1 y $\\det A = 0$`; },
    alto: () => 292, pie: 'Desliza t y mira las barras de las filas 1 y 3.',
    dib(v, K, p, f) {
      const M = GA(p.A, v.t), r = p.A[2][0] / p.A[0][0], d = det3(M), Y = 112, s = 11;
      let h = K.l(16, Y, 234, Y, 'lm');
      for (let j = 0; j < 3; j++) {
        const x = 46 + j * 74, a = M[0][j], b = M[2][j];
        h += K.r(x - 18, Math.min(Y, Y - a * s), 16, Math.abs(a * s), 'fa') + K.r(x + 2, Math.min(Y, Y - b * s), 16, Math.abs(b * s), 'fg');
        h += K.t(x, 216, `col. ${j + 1}`, 's tm');
        if (f > 0) h += K.f(f, K.pl([[x + 2, Y], [x + 2, Y - r * a * s], [x + 18, Y - r * a * s], [x + 18, Y]], 'lf d') + K.t(x + 10, 234, `${N(r)}·${T(a)}`, 's tm'));
      }
      h += K.t(20, 20, '▮ fila 1', 's ta', 'start') + K.t(110, 20, '▮ fila 3', 's tg', 'start');
      h += K.t(290, 36, 'A =', 's') + mat(K, 290, 74, M, 's', 22, 20);
      h += K.f(f, K.t(290, 134, `det A = ${N(d)}`, `s ${d === 0 ? 'to' : 'tf'}`) + K.t(290, 154, d === 0 ? 'filas gemelas' : 'no son gemelas', 's tm'));
      return h;
    },
    lee: (v, p) => `$\\det A = ${det3(GA(p.A, v.t))}$`,
    aviso(v, p) {
      const r = p.A[2][0] / p.A[0][0], d = det3(GA(p.A, v.t));
      if (v.t === -r * p.A[0][2]) return `Con t = ${N(v.t)} la última barra cambió de signo: la fila 3 tiene que ser ${N(r)} veces la fila 1 en todas sus entradas, también en el signo.`;
      return `Con t = ${N(v.t)} la fila 3 no es múltiplo de la fila 1: en las dos primeras columnas la razón es ${N(r)}, en la última no. Por eso det A = ${N(d)}.`;
    },
    bien: p => p.ok || 'La fila 3 es un múltiplo de la fila 1: restándola, queda una fila de ceros y el determinante es 0.',
  });

  // ---------------------------------------------------------- escala-todo-volumen · det(kA) = kⁿ det A: cada fila suma un factor
  // Una pieza de volumen |det A| se escala por k en las tres direcciones (kA, 3 × 3). Meta: det(kA) dado.
  //   v { k }   params { d0, meta, min, max, ok }
  const VK = p => Math.round(Math.cbrt(p.meta / p.d0));
  XG.figura('escala-todo-volumen', {
    ini: () => ({ k: 1 }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k en kA' }],
    ok: (v, p) => v.k ** 3 * p.d0 === p.meta, sol: p => ({ k: VK(p) }),
    texto: p => `$k = ${VK(p)}$: $\\det(k${p.nom || 'A'}) = ${TX(VK(p))}^3 \\cdot ${TX(p.d0)} = ${p.meta}$`,   // nom: nombre de la matriz
    alto: () => 280, pie: 'Desliza k: multiplicar la matriz por k multiplica por k cada una de sus tres filas.',
    dib(v, K, p, f) {
      const a = Math.abs(v.k), d = v.k ** 3 * p.d0, es = d === p.meta, u = a ? Math.min(20, 96 / a) : 0, o = [110, 210];
      let h = K.l(14, 214, 230, 214, 'lm');
      h += a ? K.caja(o, u, a, a, a, f >= 1 ? (es ? 'fo' : 'ff') : (v.k < 0 ? 'fg' : 'fa'), a <= 8) : K.t(110, 150, 'aplastada', 's tm');
      h += K.t(286, 34, `A: 3 × 3`, 's') + K.t(286, 54, `det A = ${N(p.d0)}`, 's') + K.t(286, 80, `meta: ${N(p.meta)}`, 's ta') + K.t(286, 112, `k = ${N(v.k)}`, 's ta');
      if (v.k < 0) h += K.t(286, 132, 'volteada', 's tm');
      h += K.f(f, K.t(286, 160, `${T(v.k)}³ · ${T(p.d0)}`, 's') + K.t(286, 180, `= ${N(d)}`, `s ${es ? 'to' : 'tf'}`));
      return h;
    },
    lee: (v, p) => `$\\det(${v.k}A) = ${TX(v.k)}^3 \\cdot ${TX(p.d0)} = ${v.k ** 3 * p.d0}$`,
    aviso(v, p) {
      const d = v.k ** 3 * p.d0;
      if (v.k * p.d0 === p.meta) return `Con k = ${N(v.k)} multiplicaste el determinante por k una sola vez; kA multiplica las tres filas: ${T(v.k)}³·${T(p.d0)} = ${N(d)}.`;
      if (v.k * v.k * p.d0 === p.meta) return `Con k = ${N(v.k)} saldría la meta si A fuera 2 × 2; en 3 × 3 el factor es k³: ${T(v.k)}³·${T(p.d0)} = ${N(d)}.`;
      if (d === -p.meta) return `Con k = ${N(v.k)} el tamaño es el pedido, pero el signo no: det = ${N(d)}. Con k negativo, k³ también es negativo.`;
      if (v.k === 0) return 'Con k = 0 todas las filas se vuelven cero y el determinante es 0.';
      return `Con k = ${N(v.k)}: det(kA) = ${T(v.k)}³·${T(p.d0)} = ${N(d)}, no ${N(p.meta)}.`;
    },
    bien: p => p.ok || 'Cada una de las tres filas aporta un factor k: det(kA) = k³ det A.',
  });

  // ---------------------------------------------------------------- maquinas-en-serie · en movimiento: det(AB) = det A · det B
  // Un cuadrado de área 1 pasa por las máquinas en orden; cada una multiplica su área con signo por su determinante. Se fija el
  // valor que falta y al soltar el cuadrado recorre las máquinas y cae en la meta.
  //   params { tiros: [{ q, pide, maq: [[nombre, det o null]], fin (det final o null), r, k (cuenta TeX), e? }] }
  const MIN = -25, lado = x => Math.min(44, 8 + 7 * Math.sqrt(Math.abs(x)));
  const marco = (K, x, y, w, h, cls) => K.pl([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], cls);
  const cuadro = (K, x, y, area, cls) => {
    const s = lado(area);
    if (!area) return K.l(x - 12, y, x + 12, y, 'lf gr');
    return (/^l/.test(cls) ? marco(K, x - s / 2, y - s / 2, s, s, cls) : K.r(x - s / 2, y - s / 2, s, s, cls, 2)) + (area < 0 ? K.l(x - s / 2, y + s / 2, x + s / 2, y - s / 2, 'lm') : '');
  };
  const MXs = n => Array.from({ length: n }, (_, i) => (n > 1 ? 80 + i * 160 / (n - 1) : 160));
  XG.tiros('maquinas-en-serie', {
    perilla: t => ({ et: t.pide, min: MIN, max: 24, cara: v => (v === MIN ? '' : N(v)), lee: v => (v === MIN ? 'sin valor' : `${t.pide} = ${N(v)}`) }), meta: t => t.r, alto: 182, ms: 1700,
    dib(t, v, K, p, f) {
      const val = x => (x == null ? (v == null || v === MIN ? null : v) : x);
      const ms = t.maq.map(m => [m[0], val(m[1])]), y = 112;
      let h = K.l(14, y + 30, 326, y + 30, 'lm');
      t.maq.forEach((m, i) => { const x = MXs(t.maq.length)[i]; h += K.r(x - 26, y - 34, 52, 68, 'fn', 8) + K.t(x, y - 42, m[0], 's') + K.t(x, y + 50, m[1] == null ? 'det = ?' : `det = ${N(m[1])}`, 's tm'); });
      h += K.r(286, y - 30, 40, 60, 'fc', 6) + K.t(306, y - 38, 'meta', 's tm') + K.t(306, y + 50, t.fin == null ? '?' : N(t.fin), 's ta');
      h += K.t(30, 34, 'área con signo: 1', 's tm', 'start');
      const meta = t.fin ?? val(null);
      if (f >= 1 && meta != null) h += cuadro(K, 306, y, meta, 'lf d');
      if (v == null || v === MIN) return h + cuadro(K, 30, y, 1, 'fa');
      // Recorrido: el cuadrado va de una máquina a la siguiente y cambia de área al pasar por cada una.
      const xs = [30, ...MXs(t.maq.length), 306], n = xs.length - 1;
      const s = Math.min(1, f) * n, i = Math.min(n - 1, Math.floor(s)), w = s - i;
      const areas = [1]; ms.forEach(m => areas.push(areas.at(-1) * m[1]));
      const ar = areas[Math.min(i + (w > 0.5 ? 1 : 0), areas.length - 1)], x = xs[i] + (xs[i + 1] - xs[i]) * w, hy = y - 20 * Math.sin(Math.PI * w);
      const fin = areas.at(-1), bien = fin === meta;
      return h + (f >= 1 ? cuadro(K, 306, y, fin, bien ? 'fo' : 'ff') + K.t(306, 30, `llegó ${N(fin)}`, `s ${bien ? 'to' : 'tf'}`) : cuadro(K, x, hy, ar, ar < 0 ? 'fg' : 'fa'));
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? `Se pasa: con ${N(v)} el área con signo no da la meta. Los determinantes se multiplican, en orden, uno por máquina.` : `Se queda corto: con ${N(v)} el área con signo no da la meta. Los determinantes se multiplican, uno por máquina.`),
    cuenta: t => `$${t.k}$`, pie: 'Estira hasta el valor y suelta.',
  });
})();
