// Geometría Vectorial · juegos de la lección geo-8 «Determinante e inversa» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js: XG.figura (se arrastra), XG.rotula (fichas a su lugar) y XG.tiros (en movimiento). Se dibujan con XPK.
(() => {
  const N = x => String(x).replace('-', '−');
  const T = x => (x < 0 ? `(${N(x)})` : N(x));                       // número dentro de una cuenta en texto plano
  const TX = x => (x < 0 ? `(${x})` : String(x));                     // lo mismo, en TeX
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const menor = (A, i, j) => A.filter((_, r) => r !== i).map(f => f.filter((_, c) => c !== j));
  const cof = (A, i, j) => ((i + j) % 2 ? -1 : 1) * det2(menor(A, i, j));
  const det3 = A => A[0].reduce((s, x, j) => s + x * cof(A, 0, j), 0);
  const det = A => (A.length === 2 ? det2(A) : det3(A));
  const cambia = (A, b, j) => A.map((f, i) => f.map((x, c) => (c === j ? b[i] : x)));   // A con la columna j cambiada por b
  const por = (A, v) => A.map(f => f.reduce((s, x, k) => s + x * v[k], 0));
  const fila = f => `(${f.map(N).join(', ')})`;
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // Fracción a texto plano (−1/4) y a TeX (-\tfrac{1}{4}).
  const frac = x => { for (let d = 1; d <= 24; d++) { const n = Math.round(x * d); if (Math.abs(n - x * d) < 1e-9) return [n, d]; } return [x, 1]; };
  const FR = x => { const [n, d] = frac(x); return d === 1 ? N(n) : `${n < 0 ? '−' : ''}${Math.abs(n)}/${d}`; };
  const FX = x => { const [n, d] = frac(x); return d === 1 ? String(n) : `${n < 0 ? '-' : ''}\\tfrac{${Math.abs(n)}}{${d}}`; };
  const avisa = metas => (q, p) => { const ms = metas(p), i = ms.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  // Matriz con sus corchetes, centrada en (cx, cy); hi: columna resaltada.
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20, hi = -1) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? N(e) : e, j === hi ? `${cls} ta` : cls); }));
    return s;
  }
  // Ecuación a x + b y = c en texto plano.
  const ecu = (f, c, v = ['x', 'y']) => f.map((a, k) => [a, v[k]]).filter(([a]) => a !== 0).map(([a, n], k) => {
    const s = Math.abs(a) === 1 ? n : `${Math.abs(a)}${n}`;
    return k === 0 ? (a < 0 ? `−${s}` : s) : `${a < 0 ? ' − ' : ' + '}${s}`;
  }).join('') + ` = ${N(c)}`;

  // ------------------------------------------------------------ rectas-paralelas-k · sin solución única cuando det = 0
  // Sistema 2 × 2 con un parámetro k: A(k) = A0 + k·Ak. Se ven las dos rectas; al comprobar, det y lo que pasa con el sistema.
  //   v { k }   params { A0, Ak, b, min, max, ini, ok }
  const RO = [170, 110], RU = 22, RX = 7, RY = 4, RP = (x, y) => [RO[0] + x * RU, RO[1] - y * RU];
  const RA = (p, k) => p.A0.map((f, i) => f.map((x, j) => x + k * p.Ak[i][j]));
  const RK = p => { for (let k = p.min; k <= p.max; k++) if (det2(RA(p, k)) === 0) return k; return p.min; };
  function recta(K, a, b, c, cls) {   // a x + b y = c recortada a la ventana
    const q = [];
    if (b !== 0) for (const x of [-RX, RX]) { const y = (c - a * x) / b; if (Math.abs(y) <= RY + 1e-9) q.push([x, y]); }
    if (a !== 0) for (const y of [-RY, RY]) { const x = (c - b * y) / a; if (Math.abs(x) <= RX + 1e-9) q.push([x, y]); }
    let m = null, dm = -1;
    q.forEach(u => q.forEach(w => { const d = Math.hypot(u[0] - w[0], u[1] - w[1]); if (d > dm) { dm = d; m = [u, w]; } }));
    return m && dm > 0.01 ? K.l(...RP(...m[0]), ...RP(...m[1]), cls) : '';
  }
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  XG.figura('rectas-paralelas-k', {
    ini: p => ({ k: p.ini }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k' }],
    ok: (v, p) => det2(RA(p, v.k)) === 0, sol: p => ({ k: RK(p) }),
    texto: p => { const k = RK(p), A = RA(p, k); return `$k = ${k}$: $\\det A = ${A[0][0]} \\cdot ${TX(A[1][1])} - ${TX(A[0][1])} \\cdot ${TX(A[1][0])} = 0$`; },
    alto: () => 250, pie: 'Desliza k.',
    dib(v, K, p, f) {
      const A = RA(p, v.k), d = det2(A);
      let h = rej(K, RO, RU, -RX, RX, -RY, RY) + recta(K, A[0][0], A[0][1], p.b[0], 'la gr') + recta(K, A[1][0], A[1][1], p.b[1], 'lg gr');
      h += K.t(88, 14, ecu(A[0], p.b[0]), 's ta') + K.t(252, 14, ecu(A[1], p.b[1]), 's tg');
      if (f > 0) {
        let dice;
        if (d !== 0) {
          const x = (p.b[0] * A[1][1] - A[0][1] * p.b[1]) / d, y = (A[0][0] * p.b[1] - p.b[0] * A[1][0]) / d;
          if (Math.abs(x) <= RX && Math.abs(y) <= RY) h += K.f(f, K.c(...RP(x, y), 6, 'fo'));
          dice = 'se cortan: solución única';
        } else dice = A[0][0] * p.b[1] - A[1][0] * p.b[0] === 0 && A[0][1] * p.b[1] - A[1][1] * p.b[0] === 0 ? 'la misma recta: infinitas' : 'paralelas: ninguna solución';
        h += K.f(f, K.r(196, 156, 140, 40, 'fc', 8) + K.t(330, 172, `det A = ${N(d)}`, 's ta', 'end') + K.t(330, 190, dice, 's tm', 'end'));
      }
      return h;
    },
    lee: (v, p) => { const A = RA(p, v.k); return `$\\det A = ${A[0][0]} \\cdot ${TX(A[1][1])} - ${TX(A[0][1])} \\cdot ${TX(A[1][0])} = ${det2(A)}$`; },
    aviso(v, p) {
      const A = RA(p, v.k), d = det2(A);
      if (A[0][0] * A[1][1] + A[0][1] * A[1][0] === 0) return `Con k = ${N(v.k)} se anula a₁b₂ + a₂b₁, pero lo que decide es det A = a₁b₂ − a₂b₁ = ${N(d)}: las rectas todavía se cortan.`;
      return `Con k = ${N(v.k)}: det A = ${N(d)} ≠ 0. Las rectas se cortan en un solo punto: el sistema sí tiene solución única.`;
    },
    bien: p => p.ok || 'det A = 0: las rectas quedaron paralelas y el sistema ya no tiene solución única.',
  });

  // ------------------------------------------------------------ homogeneo-no-trivial · det = 0: hay más que la solución trivial
  // A x = 0 con det A = 0. Se arrastra un punto con coordenadas enteras; al comprobar aparecen las rectas y A·(x, y).
  //   v { x, y }   params { A, ok }
  const HO = [170, 104], HU = 20, HP = (x, y) => [HO[0] + x * HU, HO[1] - y * HU];
  const HS = p => { const g = gcd(p.A[0][1], p.A[0][0]) || 1; let x = -p.A[0][1] / g, y = p.A[0][0] / g; if (x < 0 || (x === 0 && y < 0)) { x = -x; y = -y; } return { x, y }; };
  XG.figura('homogeneo-no-trivial', {
    ini: () => ({ x: 0, y: 0 }),
    manijas: () => [{ k: ['x', 'y'], min: -4, max: 4, paso: 1, en: v => HP(v.x, v.y), de: (x, y) => [(x - HO[0]) / HU, (HO[1] - y) / HU] }],
    ok: (v, p) => (v.x !== 0 || v.y !== 0) && por(p.A, [v.x, v.y]).every(r => r === 0),
    sol: HS, texto: p => { const s = HS(p); return `$(x, y) = (${s.x}, ${s.y})$ o cualquier múltiplo distinto de cero`; },
    alto: () => 216, pie: 'Arrastra el punto: empieza en la solución trivial.',
    dib(v, K, p, f) {
      const r = por(p.A, [v.x, v.y]), es = (v.x || v.y) && r.every(z => z === 0);
      let h = rej(K, HO, HU, -4, 4, -4, 4);
      h += K.f(f, recta2(K, p.A[0], 'la gr') + recta2(K, p.A[1], 'lg d'));
      h += K.t(42, 30, 'A =', 's', 'middle') + mat(K, 42, 62, p.A, 's', 22, 20) + K.t(42, 108, 'A·x = 0', 's tm');
      h += K.t(298, 30, 'det A =', 's tm') + K.t(298, 50, N(det2(p.A)), 's ta');
      h += K.f(f, K.t(298, 150, 'A·(x, y) =', 's tm') + K.t(298, 170, fila(r), `s ${es ? 'to' : 'tf'}`));
      return h;
    },
    lee: (v, p) => `$A ${pm([[v.x], [v.y]])} = ${pm(por(p.A, [v.x, v.y]).map(z => [z]))}$`,
    aviso(v, p) {
      if (!v.x && !v.y) return 'Esa es la solución trivial, x = y = 0, que todo sistema homogéneo tiene. Busca otra.';
      const r = por(p.A, [v.x, v.y]);
      return `A·(${N(v.x)}, ${N(v.y)}) = ${fila(r)}: no da (0, 0). La primera ecuación pide ${ecu(p.A[0], 0)}.`;
    },
    bien: p => p.ok || 'det A = 0: además de (0, 0), toda una recta de puntos cumple A·x = 0.',
  });
  function recta2(K, [a, b], cls) {   // a x + b y = 0 en la rejilla de 4 × 4
    const L = 4.4, n = Math.hypot(a, b), d = [-b / n, a / n], t = Math.min(Math.abs(d[0]) > 1e-9 ? L / Math.abs(d[0]) : 99, Math.abs(d[1]) > 1e-9 ? L / Math.abs(d[1]) : 99);
    return K.l(...HP(-d[0] * t, -d[1] * t), ...HP(d[0] * t, d[1] * t), cls);
  }

  // ------------------------------------------------------------ caja-aplastada-k · columnas en un plano: det = 0
  // Tres columnas en el espacio; la tercera tiene una entrada k. Se ve la caja que forman; al comprobar, el volumen |det A|.
  //   v { k }   params { c1, c2, c3 (con 'k' en una entrada), min, max, ini, ok }
  const CO = [150, 172], CP = ([x, y, z]) => [CO[0] + 48 * y - 26 * x, CO[1] - 24 * z + 16 * x];
  const C3 = (p, k) => p.c3.map(x => (x === 'k' ? k : x));
  const CA = (p, k) => [0, 1, 2].map(i => [p.c1[i], p.c2[i], C3(p, k)[i]]);
  const CK = p => { for (let k = p.min; k <= p.max; k++) if (det3(CA(p, k)) === 0) return k; return p.min; };
  const sum = (...vs) => [0, 1, 2].map(i => vs.reduce((s, v) => s + v[i], 0));
  XG.figura('caja-aplastada-k', {
    ini: p => ({ k: p.ini }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k: la entrada que falta' }],
    ok: (v, p) => det3(CA(p, v.k)) === 0, sol: p => ({ k: CK(p) }),
    texto: p => `$k = ${CK(p)}$: $\\det ${pm(CA(p, CK(p)))} = 0$`, alto: () => 300, pie: 'Desliza k.',
    dib(v, K, p, f) {
      const c1 = p.c1, c2 = p.c2, c3 = C3(p, v.k), A = CA(p, v.k), d = det3(A), o = [0, 0, 0];
      const pl = [[-0.3, -0.3], [2.4, -0.3], [2.4, 1.6], [-0.3, 1.6]].map(([s, t]) => CP(sum(c1.map(x => x * s), c2.map(x => x * t))));
      let h = K.f(0.45, K.p(pl, 'fg')) + K.p([o, c1, sum(c1, c2), c2].map(CP), 'fa');
      const vs = [o, c1, c2, c3, sum(c1, c2), sum(c1, c3), sum(c2, c3), sum(c1, c2, c3)];
      [[0, 1], [0, 2], [1, 4], [2, 4], [3, 5], [3, 6], [5, 7], [6, 7], [1, 5], [2, 6], [4, 7]].forEach(([a, b]) => { h += K.l(...CP(vs[a]), ...CP(vs[b]), 'lm'); });
      h += K.ar(...CP(o), ...CP(c1), 'la gr') + K.ar(...CP(o), ...CP(c2), 'lg gr') + K.ar(...CP(o), ...CP(c3), 'lo gr');
      h += K.t(...CP(c1).map((q, i) => q + [-14, 16][i]), 'c₁', 's ta') + K.t(...CP(c2).map((q, i) => q + [14, 4][i]), 'c₂', 's tg') + K.t(...CP(c3).map((q, i) => q + [-16, -4][i]), 'c₃', 's');
      h += K.t(54, 22, 'A = [c₁ c₂ c₃]', 's tm') + mat(K, 54, 62, A, 's', 22, 20, 2);
      if (f > 0) {
        const n = [c1[1] * c2[2] - c1[2] * c2[1], c1[2] * c2[0] - c1[0] * c2[2], c1[0] * c2[1] - c1[1] * c2[0]];
        const t = n[2] ? -(n[0] * c3[0] + n[1] * c3[1] + n[2] * c3[2]) / n[2] : 0, q = [c3[0], c3[1], c3[2] + t];
        if (d !== 0 && n[2]) h += K.f(f, K.l(...CP(c3), ...CP(q), 'lf d') + K.c(...CP(q), 4, 'ff'));
        h += K.f(f, K.r(222, 12, 114, 52, 'fc', 8) + K.t(330, 32, `det A = ${N(d)}`, 's ta', 'end') + K.t(330, 52, d === 0 ? 'caja plana: volumen 0' : `volumen ${Math.abs(d)}`, 's tm', 'end'));
      }
      return h;
    },
    lee: (v, p) => `$\\det A = ${det3(CA(p, v.k))}$`,
    aviso(v, p) {
      const d = det3(CA(p, v.k));
      return `Con k = ${N(v.k)}, det A = ${N(d)} ≠ 0: la caja tiene volumen ${Math.abs(d)}. c₃ se sale del plano de c₁ y c₂, y A sí tiene inversa.`;
    },
    bien: p => p.ok || 'det A = 0: c₃ quedó en el plano de c₁ y c₂ y la caja se aplastó. A no tiene inversa.',
  });

  // ------------------------------------------------------------ area-inversa-reciproca · det A⁻¹ = 1 / det A
  // A agranda (y quizá voltea) el cuadrado de área 1. Se escoge el factor r de A⁻¹; al comprobar, A⁻¹ actúa sobre la figura de A.
  //   v { i }   params { A, ops: [factores], ini, ok }
  const AQ = (p, i) => p.ops[i], AS = p => p.ops.findIndex(r => Math.abs(r * det2(p.A) - 1) < 1e-9);
  XG.figura('area-inversa-reciproca', {
    ini: p => ({ i: p.ini }),
    manijas: p => [{ k: 'i', min: 0, max: p.ops.length - 1, paso: 1, et: 'r = det A⁻¹', rot: v => FR(p.ops[v.i]) }],
    ok: (v, p) => Math.abs(AQ(p, v.i) * det2(p.A) - 1) < 1e-9, sol: p => ({ i: AS(p) }),
    texto: p => `$\\det A^{-1} = \\dfrac{1}{\\det A} = \\dfrac{1}{${det2(p.A)}} = ${FX(1 / det2(p.A))}$`, alto: () => 236, pie: 'Desliza r.',
    dib(v, K, p, f) {
      const A = p.A, d = det2(A), r = AQ(p, v.i), ar = Math.abs(d * r), pos = d * r > 0, u = 14, O = [104, 150];
      const P = ([x, y]) => [O[0] + x * u, O[1] - y * u], c1 = [A[0][0], A[1][0]], c2 = [A[0][1], A[1][1]];
      let h = K.t(46, 18, 'área 1', 's tm') + K.p([[24, 150], [64, 150], [64, 110], [24, 110]], 'fa');
      h += K.ar(70, 130, 96, 130, 'lm') + K.t(83, 122, 'A', 's');
      h += K.p([[0, 0], c1, [c1[0] + c2[0], c1[1] + c2[1]], c2].map(P), 'fg');
      h += K.t(150, 18, `área ${Math.abs(d)}`, 's tm') + K.t(150, 172, d > 0 ? 'no la voltea' : 'la voltea', 's tm');
      h += K.ar(200, 130, 228, 130, 'lm') + K.t(214, 122, 'A⁻¹', 's');
      h += K.t(282, 18, `r = ${FR(r)}`, 's ta');
      if (f > 0) {
        const s = 22 * Math.sqrt(ar), cx = 282, cy = 108, ok = Math.abs(d * r - 1) < 1e-9;
        h += K.f(f, K.p([[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx + s / 2, cy - s / 2], [cx - s / 2, cy - s / 2]], ok ? 'fo' : 'ff')
          + K.t(282, 172, `área ${FR(ar)}, ${pos ? 'derecha' : 'volteada'}`, `s ${ok ? 'to' : 'tf'}`));
      }
      return h;
    },
    lee: (v, p) => { const d = det2(p.A), r = AQ(p, v.i); return `$\\det A \\cdot r = ${TX(d)} \\cdot ${r < 0 ? `\\left(${FX(r)}\\right)` : FX(r)} = ${FX(d * r)}$`; },
    aviso(v, p) {
      const d = det2(p.A), r = AQ(p, v.i);
      if (r === d) return 'Ese es det A otra vez: aplicar A de nuevo agranda más. La inversa deshace: det A · det A⁻¹ = det I = 1.';
      if (Math.abs(r * d + 1) < 1e-9) return `El tamaño vuelve a 1, pero la figura queda volteada: el recíproco de ${N(d)} conserva su signo, es ${FR(1 / d)}.`;
      if (Math.abs(r * d) > 1) return `Con r = ${FR(r)}, el área queda en ${FR(Math.abs(r * d))}: crece en vez de volver a 1.`;
      return `det A · r = ${FR(d * r)}, no 1: la figura no vuelve a ser el cuadrado de área 1.`;
    },
    bien: p => p.ok || 'det A · det A⁻¹ = 1: la figura volvió al cuadrado de área 1, sin voltear.',
  });

  // ------------------------------------------------------------ adjunta-transpuesta · adj A es la transpuesta de los cofactores
  // A es 3 × 3. Se pone det A y la fila 1 de adj A = (C₁₁, C₂₁, C₃₁); las filas 2 y 3 ya están.   params { A, extra, trampas?, ok }
  const JS = [{ x: 274, y: 46, w: 62, h: 36 }, ...[0, 1, 2].map(j => ({ x: 128 + j * 72, y: 128, w: 60, h: 34 }))];
  const adj = A => [0, 1, 2].map(i => [0, 1, 2].map(j => cof(A, j, i)));
  const JM = p => [N(det3(p.A)), ...adj(p.A)[0].map(N)];
  const JT = p => {
    const A = p.A, t = {};
    t[`0:${N(-det3(A))}`] = `Revisa el signo: det A = a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃ = ${N(det3(A))}.`;
    [1, 2].forEach(j => {
      t[`${j + 1}:${N(cof(A, 0, j))}`] = `Ese es C₁${'₂₃'[j - 1]}, un cofactor de la fila 1. adj A es la transpuesta: en la fila 1, columna ${j + 1} va C${'₂₃'[j - 1]}₁.`;
      if (j === 1) t[`2:${N(-cof(A, 1, 0))}`] = 'Ese es el menor sin su signo: C₂₁ está en una casilla − del tablero + − +, así que se le cambia el signo.';
    });
    return { ...t, ...p.trampas };
  };
  XG.rotula('adjunta-transpuesta', {
    slots: () => JS, metas: JM, fichas: p => [...JM(p), ...p.extra], alto: () => 214,
    texto: p => `$\\det A = ${det3(p.A)}$, $\\operatorname{adj} A = ${pm(adj(p.A))}$`,
    fondo(K, p, f) {
      const B = adj(p.A);
      let h = K.t(20, 54, 'A =', 's', 'start') + mat(K, 90, 50, p.A, 's', 24, 20) + K.t(238, 52, 'det A =', 's', 'end');
      h += K.t(52, 166, 'adj A =', 's', 'end') + K.pl([[96, 104], [90, 104], [90, 208], [96, 208]]) + K.pl([[310, 104], [316, 104], [316, 208], [310, 208]]);
      [1, 2].forEach(i => B[i].forEach((x, j) => { h += K.t(128 + j * 72, 128 + i * 32 + 5, N(x), 's'); }));
      return h + K.f(f, K.t(330, 86, `A · adj A = ${N(det3(p.A))} · I`, 's ta', 'end'));
    },
    aviso: (q, p) => { const ms = JM(p), i = ms.findIndex((m, k) => q[k][0] !== m); return JT(p)[`${i}:${q[i][0]}`] || [
      'det A = a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃: desarrolla por la fila 1, con los signos + − +.',
      'Arriba a la izquierda va C₁₁: tapa la fila 1 y la columna 1 de A; el signo es +.',
      'En la fila 1, columna 2 de adj A va C₂₁ (por la transpuesta): tapa la fila 2 y la columna 1, y pon el signo −.',
      'En la fila 1, columna 3 de adj A va C₃₁: tapa la fila 3 y la columna 1; el signo es +.'][i]; },
    bien: p => p.ok || 'La fila 1 de adj A son los cofactores de la columna 1: así A · adj A = det A · I.',
  });

  // ------------------------------------------------------------ cramer-cambia-columna · la columna de la incógnita se cambia por b
  // Sistema 2 × 2. Se arman A₁ (b en la columna 1) y A₂ (b en la columna 2); al comprobar, Cramer da x e y.
  //   params { A, b, et: [x, y], extra, ok }
  const KS = [[70, 112], [70, 156], [276, 112], [276, 156]].map(([x, y]) => ({ x, y, w: 52, h: 36 }));
  const KM = p => [p.b[0], p.b[1], p.b[0], p.b[1]].map(N);
  XG.rotula('cramer-cambia-columna', {
    slots: () => KS, metas: KM, fichas: p => [...KM(p), ...p.extra], alto: () => 214,
    texto: p => { const D = det2(p.A), a = det2(cambia(p.A, p.b, 0)), c = det2(cambia(p.A, p.b, 1)); return `$${p.et[0]} = \\dfrac{${a}}{${D}} = ${a / D}$, $${p.et[1]} = \\dfrac{${c}}{${D}} = ${c / D}$`; },
    fondo(K, p, f) {
      const A = p.A, D = det2(A), a = det2(cambia(A, p.b, 0)), c = det2(cambia(A, p.b, 1));
      let h = K.t(20, 40, 'A =', 's', 'start') + mat(K, 82, 36, A, 's') + K.t(132, 40, 'b =', 's', 'start') + mat(K, 172, 36, p.b.map(x => [x]), 's');
      h += K.t(92, 86, `A₁: b en la columna de ${p.et[0]}`, 's tm') + K.t(250, 86, `A₂: b en la columna de ${p.et[1]}`, 's tm');
      h += K.pl([[44, 94], [38, 94], [38, 174], [44, 174]]) + K.pl([[142, 94], [148, 94], [148, 174], [142, 174]]);
      h += K.pl([[200, 94], [194, 94], [194, 174], [200, 174]]) + K.pl([[298, 94], [304, 94], [304, 174], [298, 174]]);
      [0, 1].forEach(i => { h += K.t(122, 117 + i * 44, N(A[i][1]), 's') + K.t(222, 117 + i * 44, N(A[i][0]), 's'); });
      return h + K.f(f, K.t(330, 40, `det A = ${N(D)}`, 's ta', 'end')
        + K.t(92, 196, `${p.et[0]} = ${N(a)} / ${T(D)} = ${N(a / D)}`, 's ta') + K.t(250, 196, `${p.et[1]} = ${N(c)} / ${T(D)} = ${N(c / D)}`, 's ta'));
    },
    aviso(q, p) {
      const ms = KM(p), i = ms.findIndex((m, k) => q[k][0] !== m), c = q[i][0], col = i < 2 ? 1 : 2;
      if (c === N(p.b[1 - (i % 2)])) return `Los resultados van en orden: arriba el de la ecuación 1 (${N(p.b[0])}) y abajo el de la ecuación 2 (${N(p.b[1])}).`;
      if (p.A.flat().map(N).includes(c)) return `Ese ${c} es un coeficiente de A. En A${'₁₂'[col - 1]} la columna ${col} se cambia entera por los resultados b.`;
      return `En A${'₁₂'[col - 1]} la columna ${col} es la de los resultados: b = ${fila(p.b)}.`;
    },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------ cramer-tres-incognitas · cada incógnita, con su matriz
  // Sistema 3 × 3. Se ven det A y tres matrices con b en una columna (en desorden, con su det). Se fijan x, y, z.
  //   v { x, y, z }   params { A, b, orden: [columna de cada matriz mostrada], et, max, ok }
  const TV = ['x', 'y', 'z'];
  const TD = p => [0, 1, 2].map(j => det3(cambia(p.A, p.b, j)));
  const TS = p => { const D = det3(p.A), d = TD(p); return { x: d[0] / D, y: d[1] / D, z: d[2] / D }; };
  XG.figura('cramer-tres-incognitas', {
    ini: () => ({ x: 0, y: 0, z: 0 }),
    manijas: p => TV.map((k, i) => ({ k, min: 0, max: p.max, paso: 1, et: `${p.et[i]} (${k})` })),
    ok: (v, p) => por(p.A, [v.x, v.y, v.z]).every((r, i) => r === p.b[i]), sol: TS,
    texto: p => { const D = det3(p.A), d = TD(p); return TV.map((k, j) => `$${k} = \\tfrac{${d[j]}}{${D}} = ${d[j] / D}$`).join(', '); },
    alto: () => 300, pie: 'Desliza x, y, z.',
    dib(v, K, p, f) {
      const D = det3(p.A), d = TD(p), r = por(p.A, [v.x, v.y, v.z]), es = r.every((z, i) => z === p.b[i]);
      let h = K.t(14, 40, 'A =', 's', 'start') + mat(K, 74, 36, p.A, 's', 22, 15) + K.t(128, 40, 'b =', 's', 'start') + mat(K, 160, 36, p.b.map(x => [x]), 's', 24, 15);
      h += K.t(330, 30, `det A = ${N(D)}`, 's ta', 'end') + K.t(330, 50, 'P, Q, R: b en una columna', 's tm', 'end');
      p.orden.forEach((j, n) => {
        const cx = 60 + n * 110;
        h += K.t(cx, 82, ['P', 'Q', 'R'][n], 's tm') + mat(K, cx, 112, cambia(p.A, p.b, j), 's', 20, 14, j) + K.t(cx, 150, `det = ${N(d[j])}`, 's');
      });
      return h + K.f(f, K.r(212, 62, 124, 18, 'fc', 6) + K.t(330, 76, `A·(x, y, z) = ${fila(r)}`, `s ${es ? 'to' : 'tf'}`, 'end'));
    },
    lee: (v, p) => `$A ${pm([[v.x], [v.y], [v.z]])} = ${pm(por(p.A, [v.x, v.y, v.z]).map(z => [z]))}$`,
    aviso(v, p) {
      const D = det3(p.A), d = TD(p), s = TS(p), r = por(p.A, [v.x, v.y, v.z]);
      const i = TV.findIndex(k => v[k] !== s[k]), j = [0, 1, 2].find(c => c !== i && d[c] / D === v[TV[i]]);
      const m = ['P', 'Q', 'R'][p.orden.indexOf(i)];
      if (j != null) return `${TV[i]} quedó con el valor que da la matriz con b en la columna ${j + 1}. La de ${TV[i]} tiene b en la columna ${i + 1}: es ${m}.`;
      return `A·(x, y, z) = ${fila(r)}, no b = ${fila(p.b)}. ${TV[i]} = det ${m} / det A: ${m} tiene b en la columna ${i + 1}.`;
    },
    bien: p => p.ok || 'A·(x, y, z) = b: cada incógnita es el det de su matriz entre det A.',
  });

  // ------------------------------------------------------------ cramer-lanza-incognita · en movimiento: la incógnita por Cramer
  // Cada tiro: un sistema 2 × 2 y la incógnita pedida (i = 0 es x, 1 es y). Se fija el valor y la ficha vuela a la recta.
  //   params { tiros: [{ q, A, b, et: [nombre de x, de y], i, r, e? }] }
  const LX = v => 30 + v * 23.33;
  XG.tiros('cramer-lanza-incognita', {
    perilla: () => ({ et: 'Valor', min: 0, max: 12, cara: v => (v ? String(v) : ''), lee: v => `${v}` }), meta: t => t.r, alto: 186, ms: 1500,
    dib(t, v, K, p, f) {
      let h = K.t(20, 30, ecu(t.A[0], t.b[0]), 's', 'start') + K.t(20, 54, ecu(t.A[1], t.b[1]), 's', 'start')
        + K.r(214, 16, 112, 46, 'fc', 10) + K.t(270, 36, `¿${['x', 'y'][t.i]}?`, 'ta') + K.t(270, 54, t.et[t.i], 's tm');
      h += K.l(LX(0), 140, LX(12), 140, 'lm');
      for (let n = 0; n <= 12; n++) h += K.l(LX(n), 135, LX(n), 145, 'lm') + K.t(LX(n), 162, String(n), 's tm');
      if (v != null && v > 0) {
        const s = Math.min(1, f * 1.2), x = 270 + (LX(v) - 270) * s, y = 70 + (128 - 70) * s - 50 * Math.sin(Math.PI * s), bien = v === t.r;
        h += f >= 1 ? K.c(LX(v), 128, 12, bien ? 'fo' : 'ff') + K.t(LX(v), 132, String(v), 's') : K.c(x, y, 11, 'fa') + K.t(x, y + 4, String(v), 's');
      }
      return h;
    },
    falla(t, v) {
      if (t.e?.[v]) return t.e[v];
      const D = det2(t.A), o = det2(cambia(t.A, t.b, 1 - t.i)) / D;
      if (v === o) return `Ese es el valor de ${['y', 'x'][t.i]}: para ${['x', 'y'][t.i]} se cambia por b la columna ${t.i + 1}.`;
      return `${v > t.r ? 'Se pasa' : 'Se queda corto'}: ${['x', 'y'][t.i]} = det A${'₁₂'[t.i]} / det A, con b en la columna ${t.i + 1}.`;
    },
    cuenta: t => { const D = det2(t.A), a = det2(cambia(t.A, t.b, t.i)); return `$${['x', 'y'][t.i]} = \\dfrac{\\det A_${t.i + 1}}{\\det A} = \\dfrac{${a}}{${D}} = ${t.r}$`; },
    pie: 'Estira hasta el valor y suelta.',
  });
})();
