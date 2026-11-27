// Geometría Vectorial · juegos de la lección geo-2 «El conjunto Rⁿ y el álgebra matricial» (spec 2026-11-27-curso-geometria-vectorial).
// Flechas de R² que se suman y se estiran, combinaciones lineales con dos perillas, matriz por vector como combinación de columnas,
// dimensiones que encajan como dominó, el producto fila por columna, AB ≠ BA y un sistema escrito como A·x = b. Armazones de figura-kit.js.
(() => {
  const sg = n => String(n).replace('-', '−');
  const par = q => `(${q.map(sg).join(', ')})`, parT = q => `(${q.join(', ')})`;   // parT: dentro de TeX
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const mul = (A, B) => A.map(r => B[0].map((_, j) => dot(r, B.map(f => f[j]))));
  const col = (A, j) => A.map(r => r[j]);
  // Matriz con corchetes centrada en (cx, cy). M: filas de números o textos; cls(i, j) da la clase de cada entrada.
  function mat(K, cx, cy, M, { dx = 26, dy = 22, cls = () => '', marco = '' } = {}) {
    const n = M[0].length, w = (n - 1) * dx + 24, h = (M.length - 1) * dy + 24, x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
    let s = K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]], marco) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]], marco);
    M.forEach((r, i) => r.forEach((v, j) => { s += K.t(x0 + 12 + j * dx, y0 + 12 + i * dy + 5, typeof v === 'number' ? sg(v) : v, cls(i, j)); }));
    return s;
  }
  // Corchetes sueltos (para encerrar casilleros).
  const corchetes = (K, x0, x1, y0, y1) => K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]]);
  // Plano cuadriculado: origen O (píxeles), u píxeles por unidad, de x0 a x1 y de y0 a y1 (unidades).
  function plano(K, O, u, [x0, x1], [y0, y1]) {
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(O[0] + x * u, O[1] - y0 * u, O[0] + x * u, O[1] - y1 * u, x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(O[0] + x0 * u, O[1] - y * u, O[0] + x1 * u, O[1] - y * u, y ? 'ls' : 'lm');
    return h;
  }
  // Rótulo junto a la punta de una flecha, empujado hacia afuera y dentro del lienzo.
  const rot = (K, P, Q, s, cls = 's', alto = 300) => {
    const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]) || 1, x = Q[0] + (Q[0] - P[0]) / d * 14, y = Q[1] + (Q[1] - P[1]) / d * 14 + 4;
    return K.t(Math.max(14, Math.min(326, x)), Math.max(12, Math.min(alto - 4, y)), s, cls);
  };
  // Término a·u con su signo, para escribir combinaciones: coef(2, 'u', true) → '2\vec u'.
  const coef = (a, n, primero) => { const s = a < 0 ? '-' : primero ? '' : '+', m = Math.abs(a); return `${primero ? s : ` ${s} `}${m === 1 ? '' : m}\\vec ${n}`; };
  // Ecuación lineal en texto plano: lin([2, -1], ['a', 'b'], 4) → '2a − b = 4'.
  const lin = (c, xs, b) => c.map((k, i) => [k, xs[i]]).filter(([k]) => k).map(([k, x], i) => `${k < 0 ? (i ? ' − ' : '−') : i ? ' + ' : ''}${Math.abs(k) === 1 ? '' : Math.abs(k)}${x}`).join('') + ` = ${sg(b)}`;

  // ------------------------------------------------------------------------------- suma y producto por escalar
  // Se arrastra la punta de w = a·u + b·v en una cuadrícula de −6 a 6 y de −4 a 5.   params { u, v, a, b, ini, nu?, nv? }
  const PX = (X, Y) => [170 + 24 * X, 132 - 24 * Y];
  const comb = (p, a = p.a, b = p.b) => [a * p.u[0] + b * p.v[0], a * p.u[1] + b * p.v[1]];
  const expr = p => `${coef(p.a, p.nu || 'u', true)}${coef(p.b, p.nv || 'v')}`;
  XG.figura('suma-a-flechas', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-6, -4], max: [6, 5], paso: 1, en: v => PX(v.x, v.y), de: (x, y) => [(x - 170) / 24, (132 - y) / 24] }],
    ok: (v, p) => { const w = comb(p); return v.x === w[0] && v.y === w[1]; },
    sol: p => { const w = comb(p); return { x: w[0], y: w[1] }; },
    texto: p => `$\\vec w = ${expr(p)} = ${parT(comb(p))}$`,
    alto: () => 240, pie: 'Arrastra la punta de la flecha w.',
    dib(v, K, p, f) {
      const O = PX(0, 0), U = PX(...p.u), V = PX(...p.v), W = PX(v.x, v.y), nu = p.nu || 'u', nv = p.nv || 'v';
      let h = plano(K, O, 24, [-6, 6], [-4, 5]);
      h += K.ar(...O, ...U, 'lg gr') + rot(K, O, U, nu, 'tg', 240) + K.ar(...O, ...V, 'lf gr') + rot(K, O, V, nv, 'tf', 240);
      if (f > 0) {   // el camino de la cuenta: a·u y luego b·v, cola con punta
        const A = PX(...comb(p, p.a, 0)), S = PX(...comb(p)), g = Math.min(1, f * 1.6), k = Math.max(0, f * 1.6 - 0.6);
        h += K.f(g, K.ar(...O, O[0] + (A[0] - O[0]) * g, O[1] + (A[1] - O[1]) * g, 'lg d')) + K.f(k, K.ar(...A, A[0] + (S[0] - A[0]) * k, A[1] + (S[1] - A[1]) * k, 'lf d'))
          + K.f(k, K.c(...S, 6, 'fo') + K.t(S[0], S[1] - 12, par(comb(p)), 's to'));
      }
      return h + K.ar(...O, ...W, 'la gr') + K.c(...W, 3, 'fA') + K.t(332, 18, `w = ${par([v.x, v.y])}`, 's ta', 'end');
    },
    lee: v => `$\\vec w = ${parT([v.x, v.y])}$`,
    aviso(v, p) {
      const w = comb(p), eq = q => q[0] === v.x && q[1] === v.y, nu = p.nu || 'u', nv = p.nv || 'v';
      if (eq(comb(p, p.a, -p.b))) return `El signo de ${nv} quedó al revés: la cuenta ${p.b < 0 ? 'resta' : 'suma'} ${nv}.`;
      if (Math.abs(p.a) !== 1 && eq(comb(p, Math.sign(p.a), p.b))) return `Usaste ${nu} una sola vez: el ${sg(p.a)} la estira, ${sg(p.a)}·${nu} = ${par(comb(p, p.a, 0))}.`;
      if (Math.abs(p.b) !== 1 && eq(comb(p, p.a, Math.sign(p.b)))) return `Falta estirar ${nv}: ${sg(p.b)}·${nv} = ${par(comb(p, 0, p.b))}.`;
      if (eq([w[1], w[0]])) return 'Cambiaste las componentes: la primera va a la derecha y la segunda hacia arriba.';
      return `Tu punta está en ${par([v.x, v.y])}. Haz ${sg(p.a)}·${nu} = ${par(comb(p, p.a, 0))} y luego súmale ${sg(p.b)}·${nv} = ${par(comb(p, 0, p.b))}, componente a componente.`;
    },
    bien: (v, p) => `${par(comb(p, p.a, 0))} + ${par(comb(p, 0, p.b))} = ${par(comb(p))}: cada componente se opera por separado.`,
  });

  // --------------------------------------------------------------------------------- combinación lineal
  // Dos perillas a y b estiran u y v (cada una desde el origen); al comprobar, b·v se pone en la punta de a·u.
  //   params { u, v, T, ini: [a, b] }   La solución se busca entre −3 y 3 (u y v no son paralelas: es una sola).
  const PC = (X, Y) => [170 + 20 * X, 132 - 20 * Y];
  const busca = p => { for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) { const s = comb(p, a, b); if (s[0] === p.T[0] && s[1] === p.T[1]) return { a, b }; } return null; };
  XG.figura('rieles-combinacion', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: 'a', min: -3, max: 3, paso: 1, et: 'a: cuántas veces u' }, { k: 'b', min: -3, max: 3, paso: 1, et: 'b: cuántas veces v' }],
    ok: (v, p) => { const s = comb(p, v.a, v.b); return s[0] === p.T[0] && s[1] === p.T[1]; },
    sol: busca,
    texto: p => { const s = busca(p); return `$a = ${s.a}$ y $b = ${s.b}$: $${s.a}\\,\\vec u + ${s.b < 0 ? `(${s.b})` : s.b}\\,\\vec v = ${parT(p.T)}$`; },
    alto: () => 300, pie: 'Mueve las dos perillas: cada una estira su flecha.',
    dib(v, K, p, f) {
      const O = PC(0, 0), A = PC(...comb(p, v.a, 0)), B = PC(...comb(p, 0, v.b)), T = PC(...p.T), S = PC(...comb(p, v.a, v.b));
      let h = plano(K, O, 20, [-7, 7], [-3, 6]) + K.r(T[0] - 8, T[1] - 8, 16, 16, 'fg', 2) + K.t(T[0], T[1] - 13, 'caja', 's tg');
      h += K.ar(...O, ...PC(...p.u), 'lm') + K.ar(...O, ...PC(...p.v), 'lm');
      const g = Math.min(1, f * 1.5), C = [O[0] + (A[0] - O[0]) * g, O[1] + (A[1] - O[1]) * g];   // b·v se traslada a la punta de a·u
      h += K.ar(...O, ...A, 'la gr') + K.ar(...C, C[0] + B[0] - O[0], C[1] + B[1] - O[1], 'lf gr');
      if (f > 0.6) h += K.f((f - 0.6) / 0.4, K.ar(...O, ...S, 'lo gr') + K.c(...S, 5, 'fo'));
      h = `<svg x="0" y="0" width="340" height="200" viewBox="0 0 340 200">${h}</svg>`;
      return h + K.t(8, 18, `a·u = ${par(comb(p, v.a, 0))}`, 's ta', 'start') + K.t(332, 18, `b·v = ${par(comb(p, 0, v.b))}`, 's tf', 'end');
    },
    lee: (v, p) => `$${v.a}\\,\\vec u + ${v.b < 0 ? `(${v.b})` : v.b}\\,\\vec v = ${parT(comb(p, v.a, v.b))}$`,
    aviso(v, p) {
      const s = busca(p), r = comb(p, v.a, v.b), eqs = `${lin([p.u[0], p.v[0]], ['a', 'b'], p.T[0])} y ${lin([p.u[1], p.v[1]], ['a', 'b'], p.T[1])}`;
      if (v.a === s.b && v.b === s.a) return 'Cambiaste los números: a es cuántas veces u y b cuántas veces v.';
      if (v.a === -s.a && v.b === -s.b) return `Llegas al punto opuesto, ${par(r)}: los dos signos quedaron al revés.`;
      return `Llegas a ${par(r)}, no a ${par(p.T)}. Por componentes: ${eqs}.`;
    },
    bien: (v, p) => { const s = busca(p); return `${s.a}·u + ${sg(s.b)}·v = ${par(p.T)}: la caja es una combinación lineal de u y v.`; },
  });

  // ------------------------------------------------------------------------- matriz por vector: columnas
  // A·x = x₁·(columna 1) + x₂·(columna 2): se ponen los pesos y el resultado.   params { A (2×2), x, filas, cols, extra }
  const ax = p => p.A.map(r => dot(r, p.x));
  const axT = p => [0, 1].map(k => p.x[0] * p.A[0][k] + p.x[1] * p.A[1][k]);   // filas tomadas como columnas
  XG.rotula('columnas-del-pedido', {
    slots: () => [{ x: 70, y: 150, w: 40, h: 36 }, { x: 162, y: 150, w: 40, h: 36 }, { x: 274, y: 128, w: 54, h: 34 }, { x: 274, y: 170, w: 54, h: 34 }],
    metas: p => [...p.x, ...ax(p)].map(sg), fichas: p => [...[...p.x, ...ax(p)].map(sg), ...p.extra], alto: () => 214,
    texto: p => `$A\\vec x = ${p.x[0]}\\,(${col(p.A, 0).join(', ')}) + ${p.x[1]}\\,(${col(p.A, 1).join(', ')}) = ${par(ax(p))}$`,
    fondo(K, p, f) {
      let h = p.cols.map((c, j) => K.t(92 + j * 40, 18, c, 's tm')).join('') + p.filas.map((r, i) => K.t(8, 51 + i * 24, r, 's', 'start')).join('');
      h += mat(K, 112, 58, p.A, { dx: 40, dy: 24 }) + K.t(222, 63, 'pedido x =', 's', 'end') + mat(K, 248, 58, p.x.map(n => [n]), { dy: 24 });
      h += K.t(8, 155, 'A·x =', '', 'start') + mat(K, 108, 150, col(p.A, 0).map(n => [n]), { dy: 22, cls: () => 'tm' }) + K.t(134, 155, '+')
        + mat(K, 200, 150, col(p.A, 1).map(n => [n]), { dy: 22, cls: () => 'tm' }) + K.t(226, 155, '=') + corchetes(K, 242, 306, 108, 190);
      return h + K.f(f, K.t(170, 208, `= (${p.x[0]}·${p.A[0][0]} + ${p.x[1]}·${p.A[0][1]}, ${p.x[0]}·${p.A[1][0]} + ${p.x[1]}·${p.A[1][1]})`, 's ta'));
    },
    aviso(q, p) {
      const m = [...p.x, ...ax(p)].map(sg), i = m.findIndex((x, k) => q[k][0] !== x), y = q[i][0];
      if (i < 2) return `Cada número del pedido pesa su columna: la columna de ${p.cols[i]} va multiplicada por ${p.x[i]}.`;
      const k = i - 2;
      if (y === sg(axT(p)[k])) return `Tomaste las filas como columnas: la columna de ${p.cols[0]} es (${col(p.A, 0).join(', ')}), de arriba abajo.`;
      return `En ${p.filas[k]}: ${p.x[0]}·${p.A[k][0]} + ${p.x[1]}·${p.A[k][1]}. Suma lo que aporta cada columna en ese renglón.`;
    },
    bien: p => `${p.x[0]} veces la primera columna más ${p.x[1]} veces la segunda: ${par(ax(p))}.`,
  });

  // ------------------------------------------------------------------------------ dimensiones como dominó
  // Tres matrices que se encajan: las medidas de adentro deben coincidir.   params { piezas: [[nombre, m, n]], orden, extra }
  const pieza = q => `${q[0]}: ${q[1]}×${q[2]}`;
  const tam = p => { const o = p.orden.map(i => p.piezas[i]); return `${o[0][1]}×${o[2][2]}`; };
  XG.rotula('domino-dimensiones', {
    slots: () => [44, 118, 192, 288].map(x => ({ x, y: 156, w: 66, h: 40 })),
    metas: p => [...p.orden.map(i => pieza(p.piezas[i])), tam(p)], fichas: p => [...p.piezas.map(pieza), tam(p), ...p.extra], alto: () => 206,
    texto: p => `$${p.orden.map(i => p.piezas[i][0]).join('')}$: $${p.orden.map(i => `(${p.piezas[i][1]} \\times ${p.piezas[i][2]})`).join('')} = ${tam(p).replace('×', ' \\times ')}$`,
    fondo(K, p, f) {
      let h = '';
      p.piezas.forEach(([n, m, c], k) => {   // cada matriz como un rectángulo de m × c casillas
        const cx = 60 + k * 110, z = 9, x0 = cx - c * z / 2, y0 = 74 - m * z / 2;
        h += K.r(x0, y0, c * z, m * z, 'fa', 2);
        for (let i = 1; i < m; i++) h += K.l(x0, y0 + i * z, x0 + c * z, y0 + i * z, 'lr');
        for (let j = 1; j < c; j++) h += K.l(x0 + j * z, y0, x0 + j * z, y0 + m * z, 'lr');
        h += K.t(cx, 26, `${n}: ${m} × ${c}`, 's');
      });
      h += K.t(81, 161, '·') + K.t(155, 161, '·') + K.t(240, 161, '=');
      const o = p.orden.map(i => p.piezas[i]);
      return h + K.f(f, K.t(170, 200, `adentro: ${o[0][2]} con ${o[1][1]} y ${o[1][2]} con ${o[2][1]}; afuera: ${o[0][1]} × ${o[2][2]}`, 's to'));
    },
    aviso(q, p) {
      const P = Object.fromEntries(p.piezas.map(z => [pieza(z), z])), y = q.map(l => l[0]);
      if (y.slice(0, 3).some(t => !P[t])) return 'En los tres primeros lugares van las matrices; el tamaño del producto va después del igual.';
      for (let k = 0; k < 2; k++) { const a = P[y[k]], b = P[y[k + 1]]; if (a[2] !== b[1]) return `Entre ${a[0]} y ${b[0]}: ${a[2]} columnas contra ${b[1]} filas. Las medidas de adentro deben ser iguales.`; }
      const a = P[y[0]], c = P[y[2]];
      return `El tamaño sale de las medidas de afuera: las filas de ${a[0]} (${a[1]}) y las columnas de ${c[0]} (${c[2]}).`;
    },
    bien: p => `Cada pieza tiene tantas columnas como filas la siguiente; el producto mide ${tam(p).replace('×', ' × ')}.`,
  });

  // ------------------------------------------------------------------------------- producto fila por columna
  // PQ con su historia: filas de P (personas), columnas de Q (tiendas).   params { P, Q, fp, mid, cq, extra }
  XG.rotula('fila-por-columna', {
    slots: () => [[200, 148], [264, 148], [200, 190], [264, 190]].map(([x, y]) => ({ x, y, w: 56, h: 34 })),
    metas: p => mul(p.P, p.Q).flat().map(sg), fichas: p => [...mul(p.P, p.Q).flat().map(sg), ...p.extra], alto: () => 220,
    texto: p => `$PQ = \\begin{pmatrix} ${mul(p.P, p.Q).map(r => r.join(' & ')).join(' \\\\ ')} \\end{pmatrix}$`,
    fondo(K, p, f) {
      let h = p.mid.map((t, j) => K.t(66 + j * 36, 20, t, 's tm')).join('') + p.fp.map((t, i) => K.t(8, 51 + i * 24, t, 's', 'start')).join('') + mat(K, 84, 58, p.P, { dx: 36, dy: 24 }) + K.t(28, 96, 'P', 's ta');
      h += K.t(150, 63, '·') + p.cq.map((t, j) => K.t(220 + j * 40, 20, t, 's tm')).join('') + p.mid.map((t, i) => K.t(203, 51 + i * 24, t, 's tm', 'end')).join('') + mat(K, 240, 58, p.Q, { dx: 40, dy: 24 }) + K.t(312, 96, 'Q', 's ta');
      h += K.t(8, 174, 'PQ =', '', 'start') + p.cq.map((t, j) => K.t(200 + j * 64, 124, t, 's tm')).join('') + p.fp.map((t, i) => K.t(160, 153 + i * 42, t, 's', 'end')).join('') + corchetes(K, 166, 298, 128, 210);
      if (f > 0) { const r = mul(p.P, p.Q); h += K.f(f, K.t(332, 112, `${p.fp[0]}, ${p.cq[0]}: ${p.P[0][0]}·${p.Q[0][0]} + ${p.P[0][1]}·${p.Q[1][0]} = ${r[0][0]}`, 's to', 'end')); }
      return h;
    },
    aviso(q, p) {
      const r = mul(p.P, p.Q).flat().map(sg), QP = mul(p.Q, p.P).flat().map(sg), i = r.findIndex((x, k) => q[k][0] !== x), y = q[i][0], a = Math.floor(i / 2), b = i % 2;
      const otra = r.findIndex((x, k) => k !== i && x === y);
      if (otra >= 0) return `${y} es la casilla de ${p.fp[Math.floor(otra / 2)]} en ${p.cq[otra % 2]}. La de ${p.fp[a]} en ${p.cq[b]} usa la fila de ${p.fp[a]} en P y la columna de ${p.cq[b]} en Q.`;
      if (y === sg(p.P[a][b] * p.Q[a][b])) return 'Multiplicaste casilla por casilla. El producto de matrices es fila por columna: pareja por pareja y se suma.';
      if (y === QP[i]) return `Hiciste el producto al revés, QP. La casilla de ${p.fp[a]} en ${p.cq[b]} es la fila de ${p.fp[a]} en P por la columna de ${p.cq[b]} en Q.`;
      return `${p.fp[a]} en ${p.cq[b]}: ${p.P[a][0]}·${p.Q[0][b]} + ${p.P[a][1]}·${p.Q[1][b]}. Pareja por pareja, y se suma.`;
    },
    bien: () => 'Cada casilla es una fila de P por una columna de Q: pareja por pareja, y se suma.',
  });

  // ------------------------------------------------------------------------------------- AB ≠ BA
  // B tiene una entrada k (null en los datos): se busca el único k con AB = BA.   params { A, B, min, max, ini }
  const conK = (p, k) => p.B.map(r => r.map(x => (x === null ? k : x)));
  const iguales = (p, k) => { const B = conK(p, k); return JSON.stringify(mul(p.A, B)) === JSON.stringify(mul(B, p.A)); };
  const kSol = p => { for (let k = p.min; k <= p.max; k++) if (iguales(p, k)) return k; return null; };
  XG.figura('conmutan-o-no', {
    ini: p => ({ k: p.ini }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k' }],
    ok: (v, p) => iguales(p, v.k), sol: p => ({ k: kSol(p) }),
    texto: p => `$k = ${kSol(p)}$: $AB = BA$`,
    alto: () => 236, pie: 'Mueve k. Los productos se calculan al comprobar.',
    dib(v, K, p, f) {
      const B = conK(p, v.k), AB = mul(p.A, B), BA = mul(B, p.A), q = (M, N) => M.map((r, i) => r.map((x, j) => (f > 0 ? x : '?')));
      const c = (M, N) => (i, j) => (f <= 0 ? 'tm' : M[i][j] === N[i][j] ? 'to' : 'tf');
      let h = K.t(36, 52, 'A =', '', 'end') + mat(K, 74, 48, p.A, { dx: 28 }) + K.t(198, 52, 'B =', '', 'end') + mat(K, 236, 48, B.map(r => r.map(sg)), { dx: 28, cls: (i, j) => (p.B[i][j] === null ? 'ta' : '') });
      h += K.t(36, 134, 'AB =', '', 'end') + K.f(f > 0 ? f : 1, mat(K, 82, 130, q(AB), { dx: 30, cls: c(AB, BA) })) + K.t(198, 134, 'BA =', '', 'end') + K.f(f > 0 ? f : 1, mat(K, 244, 130, q(BA), { dx: 30, cls: c(BA, AB) }));
      if (f > 0) h += K.f(f, K.t(170, 182, iguales(p, v.k) ? 'AB = BA: estas dos sí conmutan' : 'AB ≠ BA', iguales(p, v.k) ? 's to' : 's tf'));
      return h;
    },
    lee: (v, p) => `$k = ${v.k}$: $${iguales(p, v.k) ? 'AB = BA' : 'AB \\neq BA'}$`,
    aviso(v, p) {
      const B = conK(p, v.k), AB = mul(p.A, B), BA = mul(B, p.A);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (AB[i][j] !== BA[i][j]) return `Con k = ${sg(v.k)}, la casilla (${i + 1}, ${j + 1}) de AB es ${sg(AB[i][j])} y la de BA es ${sg(BA[i][j])}. Iguala esas dos con k como letra.`;
      return 'Revisa las cuatro casillas de los dos productos.';
    },
    bien: (v, p) => `Con k = ${kSol(p)} los dos órdenes dan la misma matriz. Es la excepción: en general AB ≠ BA.`,
  });

  // ------------------------------------------------------------------------------------- un sistema es A·x = b
  // Se pasan las ecuaciones a la forma A·x = b.   params { A (2×2), b, x (una solución, para comprobar), extra }
  const eqT = (r, b) => lin(r, ['x₁', 'x₂'], b);
  XG.rotula('escribe-ax-b', {
    slots: () => [[70, 118], [126, 118], [70, 160], [126, 160]].map(([x, y]) => ({ x, y, w: 46, h: 34 })).concat([118, 160].map(y => ({ x: 270, y, w: 58, h: 34 }))),
    metas: p => [...p.A.flat(), ...p.b].map(sg), fichas: p => [...[...p.A.flat(), ...p.b].map(sg), ...p.extra], alto: () => 214,
    texto: p => `$A = \\begin{pmatrix} ${p.A.map(r => r.join(' & ')).join(' \\\\ ')} \\end{pmatrix}$ y $\\vec b = (${p.b.join(', ')})$`,
    fondo(K, p, f) {
      let h = p.A.map((r, i) => K.t(170, 26 + i * 26, eqT(r, p.b[i]))).join('');
      h += corchetes(K, 42, 154, 96, 182) + mat(K, 190, 139, [['x₁'], ['x₂']], { dy: 42 }) + K.t(222, 144, '=') + corchetes(K, 236, 304, 96, 182) + K.t(26, 144, 'A', 's ta');
      return h + K.f(f, K.t(170, 206, `con x = (${p.x.join(', ')}): A·x = ${par(p.A.map(r => dot(r, p.x)))}`, 's to'));
    },
    aviso(q, p) {
      const m = [...p.A.flat(), ...p.b], i = m.findIndex((x, k) => q[k][0] !== sg(x)), y = q[i][0], r = i < 4 ? Math.floor(i / 2) : i - 4;
      if (y === sg(-m[i])) return 'Fíjate en el signo: si el término va restando, su número es negativo.';
      if (m[i] === 1 && y === '0') return 'Una incógnita sin número delante lleva un 1, no un 0.';
      if (i >= 4) return `b son los números a la derecha del igual: el de la ecuación ${r + 1}, con su signo.`;
      return `La fila ${r + 1} de A son los números delante de x₁ y x₂ en la ecuación ${r + 1}, en ese orden.`;
    },
    bien: () => 'Cada fila de A es una ecuación; x guarda las incógnitas y b lo que está a la derecha.',
  });

  // --------------------------------------------------------------------------- en movimiento: fila por columna
  // Se fija el total y al soltar las parejas se juntan, se multiplican y llenan la barra.
  //   params { max, tiros: [{ q, n: [nombres], fila, col, u, e: { valor: aviso } }] }
  XG.tiros('lanza-producto', {
    alto: 200,
    perilla: (t, p) => ({ et: 'total', min: 0, max: p.max, cara: v => v, lee: v => `${v} ${t.u}` }),
    meta: t => dot(t.fila, t.col),
    dib(t, v, K, p, f) {
      const n = t.fila.length, X = i => 170 + (i - (n - 1) / 2) * 96, B = x => 30 + 280 * x / p.max, m = dot(t.fila, t.col), baja = Math.min(1, f * 2.2);
      let h = '';
      t.fila.forEach((a, i) => {
        const y = 37 + 52 * (1 - baja);   // la columna sube hasta su pareja
        h += K.t(X(i), 16, t.n[i], 's tm') + K.r(X(i) - 30, 24, 28, 26, 'fa', 6) + K.t(X(i) - 16, 42, sg(a), 'ta');
        h += K.r(X(i) + 2, y - 13, 28, 26, 'fg', 6) + K.t(X(i) + 16, y + 5, sg(t.col[i]), 'tg');
        if (f > 0) h += K.f(Math.max(0, Math.min(1, f * 3 - 0.9 - i * 0.25)), K.t(X(i), 126, `${a}·${t.col[i]} = ${a * t.col[i]}`, 's'));
      });
      h += K.l(30, 162, 310, 162, 'lm');
      for (let k = 0; k <= p.max; k += 5) h += K.l(B(k), 158, B(k), 166, 'lm') + K.t(B(k), 182, k, 's tm');
      if (f > 0.45) { const llena = m * Math.min(1, (f - 0.45) / 0.45); h += K.r(30, 154, B(llena) - 30, 16, f >= 1 && v !== m ? 'fg' : 'fo', 3); if (f >= 1) h += K.t(B(m), 148, m, 's to'); }
      if (v != null) h += K.l(B(v), 150, B(v), 174, f >= 1 && v !== m ? 'lf gr' : 'la gr') + K.t(B(v), 196, v, 's ta');
      return h;
    },
    falla(t, v) {
      const m = dot(t.fila, t.col);
      return t.e?.[v] || (v < m ? `Te quedaste en ${v}: faltan parejas. Multiplica cada número por el suyo y suma las tres.` : `Te pasaste: ${v}. Multiplica cada pareja una sola vez y suma.`);
    },
    cuenta: t => `$${t.fila.map((a, i) => `${a} \\cdot ${t.col[i]}`).join(' + ')} = ${dot(t.fila, t.col)}$`,
    pie: 'Estira hasta el total y suelta.',
  });
})();
