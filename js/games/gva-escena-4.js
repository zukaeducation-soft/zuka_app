// Geometría Vectorial · juegos de la lección geo-4 «Matrices invertibles y matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js: XG.figura (se arrastra), XG.rotula (fichas a su lugar) y XG.tiros (en movimiento). Se dibujan con XPK.
(() => {
  const N = x => String(x).replace('-', '−');
  const T = x => (x < 0 ? `(${N(x)})` : N(x));                       // número dentro de una cuenta en texto plano
  const TX = x => (x < 0 ? `(${x})` : String(x));                     // lo mismo, en TeX
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const mul = (A, B) => A.map(f => B[0].map((_, j) => f.reduce((s, x, k) => s + x * B[k][j], 0)));
  const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const adj2 = A => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
  const inv2 = A => { const d = det2(A); return adj2(A).map(f => f.map(x => x / d)); };
  const fila = f => `(${f.map(N).join(', ')})`;
  const avisa = metas => (q, p) => { const ms = metas(p), i = ms.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const suyas = p => p.metas;
  // Matriz con sus corchetes, centrada en (cx, cy); dx y dy: espacio por columna y por fila.
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? N(e) : e, cls); }));
    return s;
  }
  // Rejilla de enteros alrededor del origen O, con u píxeles por unidad.
  const rejilla = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };

  // --------------------------------------------------- deshaz-transformacion · B deshace a A cuando B·A devuelve el cuadrado
  // A deforma el cuadrado de lado 1. Se arrastran las columnas de B; al comprobar, B se aplica a la figura deformada.
  //   v { p, q, r, s }: B = [[p, r], [q, s]]   params { A (det ±1), ok }
  const DO = [170, 130], DU = 24, DP = (x, y) => [DO[0] + x * DU, DO[1] - y * DU];
  const DB = v => [[v.p, v.r], [v.q, v.s]];
  const DE = (x, y) => [(x - DO[0]) / DU, (DO[1] - y) / DU];
  XG.figura('deshaz-transformacion', {
    ini: () => ({ p: 1, q: 0, r: 0, s: 1 }),
    manijas: () => [
      { k: ['p', 'q'], min: -3, max: 3, paso: 1, rot: () => 'b₁', en: v => DP(v.p, v.q), de: DE },
      { k: ['r', 's'], min: -3, max: 3, paso: 1, rot: () => 'b₂', en: v => DP(v.r, v.s), de: DE },
    ],
    ok: (v, p) => mul(DB(v), p.A).every((f, i) => f.every((x, j) => x === (i === j ? 1 : 0))),
    sol: p => { const I = inv2(p.A); return { p: I[0][0], q: I[1][0], r: I[0][1], s: I[1][1] }; },
    texto: p => `$A^{-1} = ${pm(inv2(p.A))}$`, alto: () => 260, pie: 'Arrastra las puntas b₁ y b₂: son las columnas de B.',
    dib(v, K, p, f) {
      const B = DB(v), A = p.A, BA = mul(B, A), es = BA.every((r, i) => r.every((x, j) => x === (i === j ? 1 : 0)));
      const esq = [[0, 0], [1, 0], [1, 1], [0, 1]], im = (M, [x, y]) => [M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y];
      const fig = esq.map(c => { const a = im(A, c), b = im(BA, c), t = Math.min(1, f); return DP(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t); });
      return rejilla(K, DO, DU, -3, 3, -3, 3) + K.pl([...esq, [0, 0]].map(c => DP(...c)), 'lm d')
        + K.p(fig, f >= 1 ? (es ? 'fo' : 'ff') : 'fa')
        + K.ar(...DO, ...DP(v.p, v.q), 'la gr') + K.ar(...DO, ...DP(v.r, v.s), 'lg gr')
        + K.t(16, 30, 'B =', 's', 'start') + mat(K, 70, 26, B, 's') + K.t(236, 30, 'A =', 's', 'start') + mat(K, 290, 26, A, 's')
        + K.t(170, 252, f > 0 ? 'la figura de A, después de aplicarle B' : 'la figura que dejó A', 's tm');
    },
    lee: (v, p) => `$BA = ${pm(mul(DB(v), p.A))}$`,
    aviso(v, p) {
      const B = DB(v), BA = mul(B, p.A), a = adj2(p.A);
      if (B.every((f, i) => f.every((x, j) => x === p.A[i][j]))) return 'Volviste a aplicar A: la figura se deforma más, no vuelve al cuadrado.';
      if (B.every((f, i) => f.every((x, j) => x === Math.abs(a[i][j]) * Math.sign(det2(p.A))))) return 'Intercambiaste a y d, pero faltó cambiarles el signo a b y a c.';
      const k = BA.findIndex((f, i) => f.some((x, j) => x !== (i === j ? 1 : 0)));
      const c = [BA[0][0], BA[1][0]], d = [BA[0][1], BA[1][1]];
      return BA[0][0] !== 1 || BA[1][0] !== 0 ? `B·A manda el lado de abajo a ${fila(c)}; para volver al cuadrado debe quedar en (1, 0).` : k >= 0 ? `B·A manda el lado de la izquierda a ${fila(d)}; debe quedar en (0, 1).` : 'Revisa las dos columnas de B.';
    },
    bien: p => p.ok || 'B·A = I: la figura volvió a ser el cuadrado. B es la inversa de A.',
  });

  // --------------------------------------------------- aplasta-paralelogramo · ad − bc = 0: las columnas quedan paralelas
  // A = [[a, b], [c, d]] con c en un deslizador. Se ven las columnas; al comprobar, el paralelogramo y su número ad − bc.
  //   v { c }   params { a, b, d, min, max, ini, ok }
  const AO = [112, 150], AU = 18, AP = (x, y) => [AO[0] + x * AU, AO[1] - y * AU];
  XG.figura('aplasta-paralelogramo', {
    ini: p => ({ c: p.ini }),
    manijas: p => [{ k: 'c', min: p.min, max: p.max, paso: 1, et: 'c: abajo a la izquierda de A' }],
    ok: (v, p) => p.a * p.d - p.b * v.c === 0, sol: p => ({ c: p.a * p.d / p.b }),
    texto: p => `$c = ${p.a * p.d / p.b}$: $ad - bc = ${p.a} \\cdot ${p.d} - ${p.b} \\cdot ${p.a * p.d / p.b} = 0$`, alto: () => 290, pie: 'Desliza c.',
    dib(v, K, p, f) {
      const c1 = [p.a, v.c], c2 = [p.b, p.d], dt = p.a * p.d - p.b * v.c, P4 = [[0, 0], c1, [c1[0] + c2[0], c1[1] + c2[1]], c2].map(q => AP(...q));
      let h = rejilla(K, AO, AU, -1, 8, -4, 6) + K.f(f, K.p(P4, dt === 0 ? 'ff' : 'fa'));
      if (f > 0 && dt === 0) h += K.f(f, K.l(...AP(-c1[0] * 0.4, -c1[1] * 0.4), ...P4[2], 'lf gr'));
      h += K.ar(...AO, ...AP(...c1), 'la gr') + K.ar(...AO, ...AP(...c2), 'lg gr') + K.t(...AP(c1[0] + 0.3, c1[1] + 0.5), 'col. 1', 's ta', 'start') + K.t(...AP(c2[0] + 0.3, c2[1] - 0.9), 'col. 2', 's tg', 'start');
      h += K.t(262, 30, 'A =', 's', 'end') + mat(K, 298, 26, [[p.a, p.b], [v.c, p.d]], 's');
      return h + K.f(f, K.t(328, 76, `ad − bc = ${dt}`.replace('-', '−'), 's ta', 'end') + K.t(328, 96, dt === 0 ? 'se aplasta: sin inversa' : 'área ≠ 0: hay inversa', 's tm', 'end'));
    },
    lee: (v, p) => `$ad - bc = ${p.a} \\cdot ${p.d} - ${p.b} \\cdot ${TX(v.c)} = ${p.a * p.d - p.b * v.c}$`,
    aviso(v, p) {
      const dt = p.a * p.d - p.b * v.c;
      if (p.a * p.d + p.b * v.c === 0) return `Con c = ${N(v.c)} se anula ad + bc, pero el número que decide es ad − bc = ${N(dt)}: todavía hay inversa.`;
      return `Con c = ${N(v.c)}: ad − bc = ${p.a}·${p.d} − ${p.b}·${T(v.c)} = ${N(dt)}, no es 0. Las columnas no son paralelas y A sí tiene inversa.`;
    },
    bien: p => p.ok || 'ad − bc = 0: las dos columnas quedaron en la misma recta y el plano se aplasta. A no tiene inversa.',
  });

  // ---------------------------------------------------------- formula-inversa · intercambiar, cambiar signos y dividir
  // Se arma A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]] con fichas.   params { A, extra, mira[5], trampas?, ok }
  const FS = [{ x: 122, y: 122, w: 56, h: 38 }, { x: 204, y: 98, w: 52, h: 38 }, { x: 266, y: 98, w: 52, h: 38 }, { x: 204, y: 146, w: 52, h: 38 }, { x: 266, y: 146, w: 52, h: 38 }];
  const FM = p => { const d = det2(p.A), a = adj2(p.A); return [d === 1 ? '1' : d === -1 ? '−1' : `${d < 0 ? '−' : ''}1/${Math.abs(d)}`, ...a.flat().map(N)]; };
  XG.rotula('formula-inversa', {
    slots: () => FS, metas: FM, fichas: p => [...FM(p), ...p.extra], alto: () => 214,
    texto: p => `$A^{-1} = \\tfrac{1}{${det2(p.A)}} ${pm(adj2(p.A))}$`,
    fondo: (K, p, f) => K.t(150, 40, 'A =', '', 'end') + mat(K, 194, 36, p.A) + K.t(84, 127, 'A⁻¹ =', '', 'end') + K.t(161, 127, '·', 'b')
      + K.pl([[176, 74], [170, 74], [170, 170], [176, 170]]) + K.pl([[294, 74], [300, 74], [300, 170], [294, 170]])
      + K.f(f, K.t(170, 204, 'A · A⁻¹ = I: comprueba multiplicando', 's ta')),
    aviso: avisa(FM), bien: p => p.ok,
  });

  // ------------------------------------------------------------- combos-inversa · A x = b se resuelve con x = A⁻¹ b
  // Plano de cantidades (x, y); se arrastra el punto. Al comprobar, la escena multiplica A por el punto y lo compara con b.
  //   v { x, y }   params { A, b, et: [nombre de x, nombre de y], u: [unidad de la fila 1, de la fila 2], ok }
  const CO = [40, 222], CU = 24, CP = (x, y) => [CO[0] + x * CU, CO[1] - y * CU];
  const CS = p => { const I = inv2(p.A); return { x: I[0][0] * p.b[0] + I[0][1] * p.b[1], y: I[1][0] * p.b[0] + I[1][1] * p.b[1] }; };
  const CA = (v, p) => [p.A[0][0] * v.x + p.A[0][1] * v.y, p.A[1][0] * v.x + p.A[1][1] * v.y];
  XG.figura('combos-inversa', {
    ini: () => ({ x: 0, y: 0 }),
    manijas: () => [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, en: v => CP(v.x, v.y), de: (x, y) => [(x - CO[0]) / CU, (CO[1] - y) / CU] }],
    ok: (v, p) => { const r = CA(v, p); return r[0] === p.b[0] && r[1] === p.b[1]; },
    sol: CS,
    texto: p => { const I = inv2(p.A), s = CS(p); return `$\\vec x = A^{-1}\\vec b = ${pm(I)} ${pm(p.b.map(x => [x]))} = ${pm([[s.x], [s.y]])}$`; },
    alto: () => 250, pie: 'Arrastra el punto hasta las cantidades.',
    dib(v, K, p, f) {
      const r = CA(v, p), es = r[0] === p.b[0] && r[1] === p.b[1];
      let h = rejilla(K, CO, CU, 0, 6, 0, 6) + K.t(CO[0] + 6 * CU + 8, CO[1] + 4, p.et[0], 's tm', 'start') + K.t(CO[0] - 8, CO[1] - 6 * CU - 10, p.et[1], 's tm', 'start');
      for (let i = 1; i <= 6; i++) h += K.t(CO[0] + i * CU, CO[1] + 16, String(i), 's tm') + K.t(CO[0] - 10, CO[1] - i * CU + 4, String(i), 's tm');
      h += K.l(...CP(v.x, 0), ...CP(v.x, v.y), 'la d') + K.l(...CP(0, v.y), ...CP(v.x, v.y), 'la d');
      h += K.t(262, 48, 'A⁻¹ =', 's', 'end') + mat(K, 298, 44, inv2(p.A), 's') + K.t(262, 104, 'b =', 's', 'end') + mat(K, 285, 100, p.b.map(x => [x]), 's');
      h += K.f(f, K.t(205, 160, 'A · (x, y) =', 's tm', 'start') + K.t(205, 182, `${r[0]} ${p.u[0]}`, `s ${es ? 'to' : 'tf'}`, 'start') + K.t(205, 202, `${r[1]} ${p.u[1]}`, `s ${es ? 'to' : 'tf'}`, 'start'));
      return h;
    },
    lee: (v, p) => { const r = CA(v, p); return `$A ${pm([[v.x], [v.y]])} = ${pm(r.map(x => [x]))}$`; },
    aviso(v, p) {
      const r = CA(v, p), s = CS(p);
      if (v.x === s.y && v.y === s.x) return 'Tienes los números al revés: la primera fila de A⁻¹·b es la cantidad del eje horizontal.';
      return `Con ${v.x} y ${v.y} salen ${r[0]} ${p.u[0]} y ${r[1]} ${p.u[1]}, no ${p.b[0]} y ${p.b[1]}. Multiplica A⁻¹ por b: fila por columna.`;
    },
    bien: p => p.ok || 'A·x = b: las cantidades dan justo lo pedido.',
  });

  // ----------------------------------------------------------- filas-elemental · la identidad con una operación de fila
  // Se arma E fila por fila; al comprobar aparece E·A, que hace la operación sobre A.   params { op, E, A, extra, mira[3], trampas?, ok }
  const ES = [0, 1, 2].map(i => ({ x: 96, y: 68 + i * 44, w: 112, h: 36 }));
  XG.rotula('filas-elemental', {
    slots: () => ES, metas: p => p.E.map(fila), fichas: p => [...p.E.map(fila), ...p.extra], alto: () => 214,
    texto: p => `$E = ${pm(p.E)}$`,
    fondo: (K, p, f) => K.t(170, 22, `En I se hace ${p.op}`, 's ta') + K.t(26, 117, 'E =', '', 'end')
      + K.pl([[38, 46], [32, 46], [32, 178], [38, 178]]) + K.pl([[154, 46], [160, 46], [160, 178], [154, 178]])
      + K.t(196, 68, 'A =', 's', 'start') + mat(K, 284, 64, p.A, 's', 24, 18)
      + K.f(f, K.t(196, 150, 'E·A =', 's ta', 'start') + mat(K, 284, 146, mul(p.E, p.A), 's ta', 24, 18) + K.t(250, 204, `A con ${p.op}`, 's tm')),
    aviso: avisa(p => p.E.map(fila)), bien: p => p.ok,
  });

  // ----------------------------------------------------------------- deshaz-fila · la inversa de cada matriz elemental
  // A la derecha de cada E se pone la operación que la deshace.   params { E: [tres 2×2], metas, extra, mira[3], trampas?, ok }
  const HS = [0, 1, 2].map(i => ({ x: 236, y: 42 + i * 60, w: 172, h: 38 }));
  XG.rotula('deshaz-fila', {
    slots: () => HS, metas: p => p.metas, fichas: p => [...p.metas, ...p.extra], alto: () => 212,
    texto: p => p.metas.join('; '),
    fondo: (K, p, f) => p.E.map((E, i) => K.t(22, 47 + i * 60, `E${'₁₂₃'[i]}`, 's tm', 'start') + mat(K, 82, 42 + i * 60, E, 's') + K.ar(114, 42 + i * 60, 144, 42 + i * 60, 'lm')).join('')
      + K.f(f, K.t(170, 204, 'deshacer cada una da E⁻¹·E = I', 's ta')),
    aviso: avisa(suyas), bien: p => p.ok,
  });

  // ------------------------------------------------------------------- quita-capas · se deshace en el orden contrario
  // El mensaje m pasa por capas (la primera, adentro). Se ponen las inversas que lo recuperan: m = [ ] [ ] c.
  //   params { capas: [primera, segunda], metas, extra, mira[2], trampas?, ok }
  const QS = [{ x: 150, y: 168, w: 74, h: 38 }, { x: 234, y: 168, w: 74, h: 38 }];
  XG.rotula('quita-capas', {
    slots: () => QS, metas: p => p.metas, fichas: p => [...p.metas, ...p.extra], alto: () => 200,
    texto: p => `m = ${p.metas.join(' ')} c`,
    fondo(K, p, f) {
      const g = Math.max(0, 1 - f * 2), h1 = Math.max(0, 1 - Math.max(0, f * 2 - 1));
      return K.f(g, K.r(70, 14, 200, 92, 'fg', 12) + K.t(84, 32, p.capas[1], 's', 'start') + K.t(256, 32, 'se puso de última', 's tm', 'end'))
        + K.f(h1, K.r(110, 42, 120, 52, 'fa', 10) + K.t(122, 60, p.capas[0], 's', 'start') + K.t(222, 60, 'primera', 's tm', 'end'))
        + K.t(170, 82, 'm', 'b') + K.t(170, 128, `c = ${p.capas[1]} · ${p.capas[0]} · m`, 's')
        + K.t(104, 173, 'm =', '', 'end') + K.t(282, 173, 'c', '', 'start');
    },
    aviso: avisa(suyas), bien: p => p.ok,
  });

  // ------------------------------------------------------------ descifra-pares · en movimiento: m = A⁻¹ c, letra por letra
  // Cada tiro: un par cifrado c = A·m; se fija la letra pedida y al soltar la ficha vuela al alfabeto.
  //   params { A, tiros: [{ q, c: [c₁, c₂], i: 0 | 1, r, k (cuenta TeX), e? }] }
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', LX = n => 26 + ((n - 1) % 13) * 24, LY = n => (n <= 13 ? 118 : 156);
  XG.tiros('descifra-pares', {
    perilla: () => ({ et: 'Letra', min: 0, max: 26, cara: v => (v ? ABC[v - 1] : ''), lee: v => (v ? `${ABC[v - 1]} = ${v}` : "sin letra") }), meta: t => t.r, alto: 182, ms: 1500,
    dib(t, v, K, p, f) {
      let h = K.t(14, 34, 'A =', 's', 'start') + mat(K, 70, 30, p.A, 's') + K.t(132, 34, 'c =', 's', 'start') + mat(K, 172, 30, t.c.map(x => [x]), 's')
        + K.r(220, 12, 104, 38, 'fc', 10) + K.t(272, 36, `letra ${t.i + 1} del par`, 's ta');
      for (let n = 1; n <= 26; n++) h += K.t(LX(n), LY(n), ABC[n - 1], 's tm') + K.t(LX(n), LY(n) + 14, String(n), 's tm');
      if (v != null && v > 0) {
        const s = Math.min(1, f * 1.2), x = 272 + (LX(v) - 272) * s, y = 50 + (LY(v) - 56 - 50) * s - 46 * Math.sin(Math.PI * s), bien = v === t.r;
        h += (f >= 1 ? K.c(LX(v), LY(v) - 4, 13, bien ? 'fo' : 'ff') + K.t(LX(v), LY(v), ABC[v - 1], 's') : K.c(x, y, 11, 'fa') + K.t(x, y + 4, ABC[v - 1], 's'));
      }
      return h;
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Esa letra se pasa: revisa la fila de A⁻¹ que multiplicaste por c.' : 'Esa letra se queda corta: revisa la fila de A⁻¹ que multiplicaste por c.'),
    cuenta: t => `$${t.k}$`, pie: 'Estira hasta la letra y suelta.',
  });
})();
