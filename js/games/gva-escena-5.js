// Geometría Vectorial · juegos de la lección geo-5 «Gauss-Jordan para la inversa» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js: XG.figura (se arrastra), XG.rotula (fichas a su lugar) y XG.tiros (en movimiento). Se dibujan con XPK.
(() => {
  const N = x => String(x).replace('-', '−');
  const TX = x => (x < 0 ? `(${x})` : String(x));                     // número dentro de una cuenta en TeX
  // Número con fracción corta: 3.5 → 7/2, −1.5 → −3/2.
  const F = x => {
    if (Math.abs(x - Math.round(x)) < 1e-9) return N(Math.round(x));
    for (let d = 2; d <= 12; d++) if (Math.abs(x * d - Math.round(x * d)) < 1e-9) return `${x < 0 ? '−' : ''}${Math.abs(Math.round(x * d))}/${d}`;
    return N(Math.round(x * 100) / 100);
  };
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const mul = (A, B) => A.map(f => B[0].map((_, j) => f.reduce((s, x, k) => s + x * B[k][j], 0)));
  const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const inv2 = A => { const d = det2(A); return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]]; };
  const det3 = A => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  const inv3 = A => {
    const d = det3(A), co = (i, j) => { const m = A.filter((_, r) => r !== i).map(r => r.filter((_, k) => k !== j)); return ((i + j) % 2 ? -1 : 1) * (m[0][0] * m[1][1] - m[0][1] * m[1][0]); };
    return [0, 1, 2].map(i => [0, 1, 2].map(j => Math.round(co(j, i) / d * 1e9) / 1e9));
  };
  const avisa = metas => (q, p) => { const ms = metas(p), i = ms.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const conK = k => (k < 0 ? `− ${N(-k)}` : `+ ${k}`);
  const conKT = k => `${k < 0 ? '-' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}`;
  // Matriz con corchetes centrada en (cx, cy); dx y dy: espacio por columna y por fila; bar: columna tras la que va la raya de [A | I];
  // cls: clase de todas las entradas o función (i, j) → clase.
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20, bar = null) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    if (bar != null) s += K.l(x0 + dx * (bar + 1), y0, x0 + dx * (bar + 1), y0 + h, 'lm');
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? F(e) : e, typeof cls === 'function' ? cls(i, j) : cls); }));
    return s;
  }
  const amp = (A, R) => A.map((f, i) => [...f, ...R[i]]);
  const ident = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));

  // ---------------------------------------------------------------- gj-fila-entera · la operación va en toda la fila de [A | I]
  // Se llena la fila 2 nueva de [A | I] tras R₂ → R₂ + k·R₁: también cambia el bloque derecho.   params { A, k, op, extra, mira[4], trampas?, ok }
  const FE = p => [p.A[1][0] + p.k * p.A[0][0], p.A[1][1] + p.k * p.A[0][1], p.k, 1].map(F);
  const FES = [70, 126, 214, 270].map(x => ({ x, y: 146, w: 48, h: 36 }));
  XG.rotula('gj-fila-entera', {
    slots: () => FES, metas: FE, fichas: p => [...FE(p), ...p.extra], alto: () => 212,
    texto: p => `fila 2 nueva: $(${FE(p).slice(0, 2).join(',\\ ').replace(/−/g, '-')} \\mid ${FE(p).slice(2).join(',\\ ').replace(/−/g, '-')})$`,
    fondo: (K, p, f) => K.t(104, 50, '[A | I] =', '', 'end') + mat(K, 196, 46, amp(p.A, ident(2)), '', 30, 22, 1)
      + K.t(170, 100, p.op, 's ta') + K.t(16, 116, 'fila 2 nueva', 's tm', 'start')
      + K.pl([[50, 126], [44, 126], [44, 166], [50, 166]]) + K.pl([[290, 126], [296, 126], [296, 166], [290, 166]]) + K.l(170, 128, 170, 164, 'lm')
      + K.t(98, 186, 'bloque de A', 's tm') + K.t(242, 186, 'bloque de I', 's tm')
      + K.f(f, K.t(170, 206, 'la derecha guarda la operación hecha', 's ta')),
    aviso: avisa(FE), bien: p => p.ok,
  });

  // --------------------------------------------------------------- gj-ceros-encima · la parte «Jordan»: ceros encima del pivote
  // [L | R] ya escalonada con unos en la diagonal. Se eligen a y b en R₁ + a·R₃ y R₂ + b·R₃.   v { a, b }   params { L, R, ok }
  const CE = (p, i, k) => p.L[i].map((x, j) => x + k * p.L[2][j]).concat(p.R[i].map((x, j) => x + k * p.R[2][j]));
  XG.figura('gj-ceros-encima', {
    ini: () => ({ a: 0, b: 0 }),
    manijas: () => [{ k: 'a', min: -4, max: 4, paso: 1, et: 'a, para R₁ + a·R₃' }, { k: 'b', min: -4, max: 4, paso: 1, et: 'b, para R₂ + b·R₃' }],
    ok: (v, p) => v.a === -p.L[0][2] && v.b === -p.L[1][2],
    sol: p => ({ a: -p.L[0][2], b: -p.L[1][2] }),
    texto: p => `$a = ${-p.L[0][2]}$ y $b = ${-p.L[1][2]}$: $R_1 \\to R_1 ${conKT(-p.L[0][2])}R_3$ y $R_2 \\to R_2 ${conKT(-p.L[1][2])}R_3$`,
    alto: () => 250, pie: 'Mueve a y b. Al comprobar se hacen las operaciones en toda la fila.',
    dib(v, K, p, f) {
      const nuevo = f > 0.5, M = [nuevo ? CE(p, 0, v.a) : amp(p.L, p.R)[0], nuevo ? CE(p, 1, v.b) : amp(p.L, p.R)[1], amp(p.L, p.R)[2]];
      const X0 = 50, DX = 40, Y0 = 26, DY = 30, at = (i, j) => [X0 + DX * (j + 0.5), Y0 + DY * (i + 0.5)];
      let h = K.c(...at(2, 2), 13, 'fn');
      if (nuevo) [0, 1].forEach(i => { h += K.f(f * 2 - 1, K.c(...at(i, 2), 13, M[i][2] === 0 ? 'fo' : 'ff')); });
      h += mat(K, 170, Y0 + 45, M, '', DX, DY, 2);
      h += ['R₁', 'R₂', 'R₃'].map((r, i) => K.t(24, at(i, 0)[1] + 5, r, 's tm', 'start')).join('');
      h += K.t(92, 140, `R₁ → R₁ ${conK(v.a)}·R₃`, 's ta') + K.t(252, 140, `R₂ → R₂ ${conK(v.b)}·R₃`, 's ta');
      return h;
    },
    lee: v => `$R_1 \\to R_1 ${conKT(v.a)}R_3$, $R_2 \\to R_2 ${conKT(v.b)}R_3$`,
    aviso(v, p) {
      const e1 = p.L[0][2] + v.a, e2 = p.L[1][2] + v.b;
      if ((e1 && v.a && v.a === p.L[0][2]) || (!e1 && e2 && v.b && v.b === p.L[1][2])) return 'Con ese signo el número encima del pivote crece en vez de anularse: usa el contrario.';
      if (e1) return `En la fila 1, encima del pivote, queda ${N(e1)}, no 0.`;
      return `La fila 1 quedó bien; en la fila 2, encima del pivote, queda ${N(e2)}, no 0.`;
    },
    bien: p => p.ok || 'Encima del pivote solo quedan ceros, y las mismas operaciones cambiaron el bloque derecho.',
  });

  // --------------------------------------------------------- gj-ruta-identidad · el orden de las operaciones que llevan A a I
  // params { A, pasos: [[operación, matriz [· | ·] después (2×4)]] (tres), extra, mira[3], trampas?, ok }
  const RM = p => p.pasos.map(x => x[0]);
  const RS = [0, 1, 2].map(i => ({ x: 96, y: 96 + i * 50, w: 160, h: 38 }));
  XG.rotula('gj-ruta-identidad', {
    slots: () => RS, metas: RM, fichas: p => [...RM(p), ...p.extra], alto: () => 230,
    texto: p => `${RM(p).join('; ')}: queda $A^{-1} = ${pm(p.pasos.at(-1)[1].map(f => f.slice(2).map(e => String(e).replace('−', '-'))))}$`,
    fondo(K, p, f) {
      let h = K.t(112, 40, '[A | I] =', '', 'end') + mat(K, 200, 36, amp(p.A, ident(2)), '', 30, 20, 1);
      h += RS.map((s, i) => K.t(6, s.y + 5, String(i + 1), 's tm', 'start')).join('');
      h += K.f(f, RS.map((s, i) => K.ar(180, s.y, 204, s.y, 'lm') + mat(K, 266, s.y, p.pasos[i][1], 's ta', 26, 18, 1)).join(''));
      return h;
    },
    aviso: avisa(RM), bien: p => p.ok,
  });

  // ---------------------------------------------------------- gj-columna-inversa · la columna j de A⁻¹ resuelve A·x = eⱼ
  // Se arrastra la punta de la flecha x; al comprobar, la escena calcula A·x y lo compara con eⱼ.   v { x, y }   params { A, j, ok }
  const KO = [96, 124], KU = 12, KP = (x, y) => [KO[0] + x * KU, KO[1] - y * KU];
  const KS = p => { const I = inv2(p.A); return { x: I[0][p.j], y: I[1][p.j] }; };
  const KA = (v, p) => [p.A[0][0] * v.x + p.A[0][1] * v.y, p.A[1][0] * v.x + p.A[1][1] * v.y];
  const KE = p => (p.j ? [0, 1] : [1, 0]);
  const SUBJ = ['₁', '₂'];
  XG.figura('gj-columna-inversa', {
    ini: () => ({ x: 0, y: 0 }),
    manijas: () => [{ k: ['x', 'y'], min: -5, max: 5, paso: 1, rot: () => 'x', en: v => KP(v.x, v.y), de: (x, y) => [(x - KO[0]) / KU, (KO[1] - y) / KU] }],
    ok: (v, p) => { const r = KA(v, p), e = KE(p); return r[0] === e[0] && r[1] === e[1]; },
    sol: KS,
    texto: p => { const s = KS(p); return `columna ${p.j + 1} de $A^{-1}$: $(${s.x}, ${s.y})$, porque $A ${pm([[s.x], [s.y]])} = ${pm(KE(p).map(x => [x]))}$`; },
    alto: () => 214, pie: 'Arrastra la punta de la flecha x.',
    dib(v, K, p, f) {
      const r = KA(v, p), e = KE(p), es = r[0] === e[0] && r[1] === e[1];
      let h = '';
      for (let i = -5; i <= 5; i++) h += K.l(...KP(i, -5), ...KP(i, 5), i ? 'lr' : 'lm') + K.l(...KP(-5, i), ...KP(5, i), i ? 'lr' : 'lm');
      h += K.c(...KP(...e), 5, 'fn') + K.t(KP(...e)[0] + 8, KP(...e)[1] - 6, `e${SUBJ[p.j]}`, 's tm', 'start');
      h += K.ar(...KO, ...KP(v.x, v.y), 'la gr');
      if (f > 0 && Math.abs(r[0]) <= 5 && Math.abs(r[1]) <= 5) h += K.f(f, K.ar(...KO, ...KP(...r), `${es ? 'lo' : 'lf'} gr d`));
      const col = [[p.j ? '·' : v.x, p.j ? v.x : '·'], [p.j ? '·' : v.y, p.j ? v.y : '·']];
      h += K.t(232, 38, 'A =', 's', 'end') + mat(K, 272, 34, p.A, 's') + K.t(232, 94, 'A⁻¹ =', 's', 'end') + mat(K, 272, 90, col, (i, j) => (j === p.j ? 's ta' : 's tm'));
      h += K.f(f, K.t(250, 150, 'A·x =', 's tm') + K.t(250, 170, `(${N(r[0])}, ${N(r[1])})`, `s ${es ? 'to' : 'tf'}`) + K.t(250, 192, `debe dar e${SUBJ[p.j]} = (${e.join(', ')})`, 's tm'));
      return h;
    },
    lee: (v, p) => `$A ${pm([[v.x], [v.y]])} = ${pm(KA(v, p).map(x => [x]))}$`,
    aviso(v, p) {
      const I = inv2(p.A), o = 1 - p.j, r = KA(v, p), e = KE(p);
      if (v.x === I[0][o] && v.y === I[1][o]) return `Esa es la columna ${o + 1} de A⁻¹: cumple A·x = e${SUBJ[o]}. La columna ${p.j + 1} debe dar e${SUBJ[p.j]}.`;
      if (v.x === I[p.j][0] && v.y === I[p.j][1]) return `Esa es la fila ${p.j + 1} de A⁻¹, no la columna: A·x da (${N(r[0])}, ${N(r[1])}).`;
      return `A·x = (${N(r[0])}, ${N(r[1])}), no (${e.join(', ')}). La columna ${p.j + 1} de A⁻¹ es la x que A lleva a e${SUBJ[p.j]}.`;
    },
    bien: p => p.ok || 'A lleva la flecha justo a eⱼ: esa flecha es la columna de A⁻¹.',
  });

  // ------------------------------------------------------ gj-producto-elementales · A⁻¹ es el producto de las elementales
  // Las operaciones E₁, …, Eₙ (en ese orden) llevan A a I. Se arma A⁻¹ = Eₙ ⋯ E₁.   params { A, ops: [n textos], inv, extra, mira[n], trampas?, ok }
  const SUBE = '₁₂₃₄₅';
  const PM = p => p.ops.map((_, i) => `E${SUBE[p.ops.length - 1 - i]}`);
  const PS = p => p.ops.map((_, i) => ({ x: 108 + i * 56, y: 150, w: 50, h: 38 }));
  XG.rotula('gj-producto-elementales', {
    slots: PS, metas: PM, fichas: p => [...PM(p), ...p.extra], alto: () => 232,
    texto: p => `$A^{-1} = ${PM(p).map(e => `E_${SUBE.indexOf(e[1]) + 1}`).join('')} = ${pm(p.inv.map(f => f.map(x => String(x).replace('−', '-'))))}$`,
    fondo(K, p, f) {
      let h = K.t(20, 22, 'en este orden llevan A hasta I:', 's tm', 'start');
      h += p.ops.map((o, i) => K.t(20, 44 + i * 20, `E${SUBE[i]}: ${o}`, 's', 'start')).join('');
      h += K.t(240, 62, 'A =', 's', 'end') + mat(K, 280, 58, p.A, 's');
      h += K.t(78, 155, 'A⁻¹ =', '', 'end');
      h += K.f(f, K.t(150, 210, '= ', '', 'end') + mat(K, 194, 206, p.inv, 's ta', 30, 18) + K.t(236, 210, 'y A⁻¹A = I', 's ta', 'start'));
      return h;
    },
    aviso: avisa(PM), bien: p => p.ok,
  });

  // ---------------------------------------------------------- gj-fila-de-ceros · una fila de ceros a la izquierda: sin inversa
  // A 3 × 3 con c abajo a la derecha (null en los datos). Al comprobar se escalona y se ve la última fila.   v { c }   params { A, min, max, ini, ok }
  const esc = (A, c) => {
    const M = A.map(f => f.map(x => (x == null ? c : x)));
    const r2 = M[1].map((x, j) => x - M[1][0] / M[0][0] * M[0][j]), r3 = M[2].map((x, j) => x - M[2][0] / M[0][0] * M[0][j]);
    return [M[0], r2, r3.map((x, j) => x - r3[1] / r2[1] * r2[j])];
  };
  const CZ = p => -esc(p.A, 0)[2][2];
  XG.figura('gj-fila-de-ceros', {
    ini: p => ({ c: p.ini }),
    manijas: p => [{ k: 'c', min: p.min, max: p.max, paso: 1, et: 'c: abajo a la derecha de A' }],
    ok: (v, p) => Math.abs(esc(p.A, v.c)[2][2]) < 1e-9, sol: p => ({ c: CZ(p) }),
    texto: p => `$c = ${CZ(p)}$: al escalonar, la última fila de la izquierda queda $(0,\\ 0,\\ 0)$`,
    alto: () => 236, pie: 'Desliza c.',
    dib(v, K, p, f) {
      const R = esc(p.A, v.c), z = Math.abs(R[2][2]) < 1e-9, M = p.A.map(r => r.map(x => (x == null ? v.c : x)));
      let h = K.t(30, 74, 'A =', '', 'end') + mat(K, 82, 70, M, (i, j) => (i === 2 && j === 2 ? 'ta' : ''), 28, 26);
      h += K.ar(132, 70, 166, 70, 'lm') + K.t(149, 56, 'escalona', 's tm');
      h += K.f(f, K.c(286, 96, 13, z ? 'ff' : 'fo') + mat(K, 258, 70, R, (i, j) => (i === 2 ? 'ta' : ''), 28, 26)
        + K.t(170, 160, z ? 'fila de ceros: A no llega a I' : 'pivote ≠ 0: se sigue hasta I', `s ${z ? 'tf' : 'to'}`));
      return h;
    },
    lee: (v, p) => { const R = esc(p.A, v.c)[2]; return `$\\text{última fila: } (${R.map(x => Math.round(x)).join(',\\ ')})$`; },
    aviso(v, p) {
      const u = Math.round(esc(p.A, v.c)[2][2]), s = CZ(p);
      return `${s && v.c === -s ? 'Ojo con el signo. ' : ''}Con c = ${N(v.c)}, al escalonar la última fila queda (0, 0, ${N(u)}): no es de ceros, ese pivote se vuelve 1 y A sí llega a I.`;
    },
    bien: p => p.ok || 'La última fila de la izquierda quedó en ceros: no hay pivote ahí y A no tiene inversa.',
  });

  // -------------------------------------------------------- gj-comprueba-identidad · B es la inversa si A·B = I
  // A 3 × 3 y su inversa con una entrada t por ajustar (pos). Al comprobar aparece A·B.   v { t }   params { A, pos: [i, j], min, max, ok }
  const BT = (p, t) => inv3(p.A).map((f, i) => f.map((x, j) => (i === p.pos[0] && j === p.pos[1] ? t : x)));
  const TS = p => inv3(p.A)[p.pos[0]][p.pos[1]];
  XG.figura('gj-comprueba-identidad', {
    ini: () => ({ t: 0 }),
    manijas: p => [{ k: 't', min: p.min, max: p.max, paso: 1, et: 'la entrada t de B' }],
    ok: (v, p) => v.t === TS(p), sol: p => ({ t: TS(p) }),
    texto: p => `$t = ${TS(p)}$: $B = ${pm(BT(p, TS(p)))}$ y $AB = I$`,
    alto: () => 250, pie: 'Desliza t.',
    dib(v, K, p, f) {
      const B = BT(p, v.t), P = mul(p.A, B), I = ident(3);
      let h = K.t(36, 54, 'A =', 's', 'end') + mat(K, 82, 50, p.A, 's', 28, 22);
      h += K.t(188, 54, 'B =', 's', 'end') + mat(K, 236, 50, B.map((r, i) => r.map((x, j) => (i === p.pos[0] && j === p.pos[1] ? (v.t ? N(v.t) : '0') : x))), (i, j) => (i === p.pos[0] && j === p.pos[1] ? 's ta' : 's'), 28, 22);
      h += K.f(f, K.t(176, 144, 'A·B =', 's', 'end') + mat(K, 226, 140, P, (i, j) => `s ${P[i][j] === I[i][j] ? 'to' : 'tf'}`, 28, 22));
      return h;
    },
    lee: (v, p) => { const P = mul(p.A, BT(p, v.t)), j = p.pos[1]; return `$AB$: columna ${j + 1} $= (${P.map(r => r[j]).join(',\\ ')})$`; },
    aviso(v, p) {
      const P = mul(p.A, BT(p, v.t)), j = p.pos[1], s = TS(p), e = [0, 1, 2].map(i => (i === j ? 1 : 0));
      return `${s && v.t === -s ? 'Ojo con el signo. ' : ''}Con t = ${N(v.t)}, la columna ${j + 1} de A·B queda (${P.map(r => N(r[j])).join(', ')}), no (${e.join(', ')}): B todavía no es la inversa.`;
    },
    bien: p => p.ok || 'A·B = I: B es la inversa de A.',
  });

  // ------------------------------------------------- gj-dosifica-mezclas · en movimiento: x = A⁻¹ b, una componente por tiro
  // Cada tiro: un pedido b; se fija cuántas bolsas de la mezcla pedida y al soltar caen en su saco.
  //   params { Ainv, et: [3 nombres de mezclas], tiros: [{ q, b, i, r, k (cuenta TeX), e? }] }
  const SX = [70, 170, 270];
  XG.tiros('gj-dosifica-mezclas', {
    perilla: () => ({ et: 'Bolsas', min: 0, max: 12, cara: v => String(v), lee: v => (v === 1 ? '1 bolsa' : `${v} bolsas`) }), meta: t => t.r, alto: 200, ms: 1500,
    dib(t, v, K, p, f) {
      let h = K.t(30, 44, 'A⁻¹ =', 's', 'end') + mat(K, 74, 40, p.Ainv, 's', 26, 18) + K.t(140, 44, 'b =', 's', 'end') + mat(K, 164, 40, t.b.map(x => [x]), 's', 26, 18)
        + K.r(206, 20, 120, 38, 'fn', 10) + K.t(266, 44, `bolsas de ${p.et[t.i]}`, 's ta');
      SX.forEach((x, i) => {
        h += K.r(x - 38, 92, 76, 74, i === t.i ? 'fa' : 'fn', 12) + K.t(x, 186, p.et[i], `s ${i === t.i ? 'ta' : 'tm'}`);
        if (i === t.i) h += K.pl([[x - 38, 92], [x - 38, 166], [x + 38, 166], [x + 38, 92]], 'la gr');
      });
      if (v != null && v > 0) {
        const x0 = SX[t.i] - 32;
        for (let k = 0; k < v; k++) {
          const ty = 154 - Math.floor(k / 4) * 12, tx = x0 + (k % 4) * 16, s = Math.max(0, Math.min(1, (f - k / v * 0.6) / 0.4));
          if (s > 0) h += K.r(tx, 74 + (ty - 74) * s, 14, 9, 'fg', 2);
        }
        if (f >= 1) h += K.t(SX[t.i], 112, String(v), `${v === t.r ? 'to' : 'tf'}`);
      }
      return h;
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Son demasiadas bolsas: revisa la fila de A⁻¹ que multiplicaste por b.' : 'Faltan bolsas: revisa la fila de A⁻¹ que multiplicaste por b.'),
    cuenta: t => `$${t.k}$`, pie: 'Estira hasta el número de bolsas y suelta.',
  });
})();
