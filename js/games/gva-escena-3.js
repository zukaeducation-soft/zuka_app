// Geometría Vectorial · juegos de la lección geo-3 «Transpuesta, sistemas m×n y tipos de solución» (spec
// 2026-11-27-curso-geometria-vectorial). Armazones de js/games/figura-kit.js (figura, rotula, tiros); se dibujan con las piezas XPK.
(() => {
  const sg = n => String(n).replace('-', '−');
  const SUB = '₀₁₂₃₄₅₆₇₈₉', sub = n => String(n).split('').map(d => SUB[+d]).join('');
  const tx = n => String(n);   // número para TeX
  // Matriz con corchetes. x, y: esquina de arriba a la izquierda. o = { cw, rh, bar (columna tras la que va la raya), txt(i, j, e), cls(i, j) }
  const cx = (x, cw, j) => x + 4 + cw * (j + 0.5), cy = (y, rh, i) => y + rh * (i + 0.5);
  function mat(K, x, y, M, o = {}) {
    const cw = o.cw || 30, rh = o.rh || 26, n = M[0].length, w = n * cw + 8, h = M.length * rh, dy = o.s ? 4 : 5;
    let s = K.pl([[x + 6, y], [x, y], [x, y + h], [x + 6, y + h]]) + K.pl([[x + w - 6, y], [x + w, y], [x + w, y + h], [x + w - 6, y + h]]);
    if (o.bar != null) s += K.l(x + 4 + cw * (o.bar + 1), y + 3, x + 4 + cw * (o.bar + 1), y + h - 3, 'lm');
    M.forEach((row, i) => row.forEach((e, j) => {
      const t = o.txt ? o.txt(i, j, e) : sg(e);
      if (t !== '') s += K.t(cx(x, cw, j), cy(y, rh, i) + dy, t, `${o.s ? 's ' : ''}${o.cls ? o.cls(i, j) : ''}`.trim());
    }));
    return s;
  }
  const caja = (K, x, y, w, h, cls = 'la') => K.pl([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], cls);
  const pmat = M => `\\begin{pmatrix} ${M.map(r => r.map(tx).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;

  // ------------------------------------------------------------------------------------------------ transpuesta
  // Se llenan las casillas de Aᵀ (3 × 2) con las entradas de A (2 × 3).  params { A, extra }
  const metasT = p => [0, 1, 2].flatMap(r => [0, 1].map(c => sg(p.A[c][r])));
  XG.rotula('filas-a-columnas', {
    slots: () => [0, 1, 2].flatMap(r => [0, 1].map(c => ({ x: 238 + c * 54, y: 56 + r * 46, w: 46, h: 38 }))),
    fichas: p => [...p.A.flat().map(sg), ...p.extra], metas: metasT, alto: () => 198,
    texto: p => `$A^T = ${pmat([0, 1, 2].map(r => [p.A[0][r], p.A[1][r]]))}$`,
    fondo(K, p, f) {
      const X = 24, Y = 78, CW = 34, RH = 28;
      let h = K.t(80, 52, 'A', 'b') + K.t(265, 22, 'Aᵀ', 'b')
        + mat(K, X, Y, p.A, { cw: CW, rh: RH, cls: i => (i ? 'tg' : 'ta') })
        + ['d1', 'd2', 'd3'].map((t, j) => K.t(cx(X, CW, j), Y - 8, t, 's tm')).join('')
        + K.t(18, cy(Y, RH, 0) + 4, 'T1', 's ta', 'end') + K.t(18, cy(Y, RH, 1) + 4, 'T2', 's tg', 'end')
        + K.ar(144, 106, 184, 106, 'lm')
        + K.pl([[216, 34], [210, 34], [210, 170], [216, 170]]) + K.pl([[314, 34], [320, 34], [320, 170], [314, 170]])
        + ['d1', 'd2', 'd3'].map((t, r) => K.t(204, 60 + r * 46, t, 's tm', 'end')).join('')
        + K.t(238, 190, 'T1', 's ta') + K.t(292, 190, 'T2', 's tg');
      h += K.f(f, caja(K, X + 2, Y + 1, 3 * CW + 4, RH - 2, 'la') + caja(K, 213, 35, 50, 134, 'la') + caja(K, X + 2, Y + RH + 1, 3 * CW + 4, RH - 2, 'lg') + caja(K, 267, 35, 50, 134, 'lg'));
      return h;
    },
    aviso(q, p) {
      const v = q.map(l => l[0]), m = metasT(p);
      if (v.join() === p.A.flat().map(sg).join()) return 'Leíste A de corrido y la cortaste de a dos. Transponer no es eso: la fila 1 de A baja entera como columna 1.';
      const i = m.findIndex((x, k) => v[k] !== x), r = Math.floor(i / 2), c = i % 2;
      if (r < 2 && v[i] === sg(p.A[r][c])) return `En el lugar (${r + 1}, ${c + 1}) de Aᵀ va la entrada (${c + 1}, ${r + 1}) de A, no la (${r + 1}, ${c + 1}): fila y columna se cruzan.`;
      return `El lugar (${r + 1}, ${c + 1}) de Aᵀ sale de la fila ${c + 1} y la columna ${r + 1} de A.`;
    },
    bien: () => 'Cada fila de A bajó entera como una columna de Aᵀ: lo que estaba en (i, j) quedó en (j, i).',
  });

  // Matriz simétrica: se completan dos casillas para que Aᵀ = A.  v { a, b }  params { M (con dos null), et, ini }
  const huecos = p => p.M.flatMap((r, i) => r.map((e, j) => (e == null ? [i, j] : null))).filter(Boolean);
  const pide = p => huecos(p).map(([i, j]) => p.M[j][i]);
  const val = (v, p, i, j) => { const k = huecos(p).findIndex(([a, b]) => a === i && b === j); return k < 0 ? p.M[i][j] : v[['a', 'b'][k]]; };
  const lug = ([i, j]) => `(${i + 1}, ${j + 1})`;
  XG.figura('simetrica-espejo', {
    ini: p => ({ a: p.ini ?? 0, b: p.ini ?? 0 }),
    manijas: p => huecos(p).map((h, k) => ({ k: ['a', 'b'][k], min: 0, max: 9, paso: 1, et: `casilla ${lug(h)}` })),
    ok: (v, p) => v.a === pide(p)[0] && v.b === pide(p)[1],
    sol: p => ({ a: pide(p)[0], b: pide(p)[1] }),
    texto: p => huecos(p).map(([i, j], k) => `$a_{${i + 1}${j + 1}} = a_{${j + 1}${i + 1}} = ${pide(p)[k]}$`).join(' y '),
    alto: () => 250, pie: 'Mueve las dos perillas de abajo.',
    dib(v, K, p, f) {
      const X = 76, Y = 24, CW = 62, RH = 38, H = huecos(p);
      let h = '';
      if (f) for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
        const igual = val(v, p, i, j) === val(v, p, j, i), cls = igual ? 'fo' : 'ff';
        h += K.f(f, K.c(cx(X, CW, j), cy(Y, RH, i), 15, cls) + K.c(cx(X, CW, i), cy(Y, RH, j), 15, cls));
      }
      h += K.l(X + 4, Y, X + 4 + 3 * CW, Y + 3 * RH, 'lm d');
      H.forEach(([i, j]) => { h += K.r(cx(X, CW, j) - 20, cy(Y, RH, i) - 15, 40, 30, 'fn', 8); });
      h += mat(K, X, Y, p.M.map((r, i) => r.map((e, j) => val(v, p, i, j))), { cw: CW, rh: RH, cls: (i, j) => (H.some(([a, b]) => a === i && b === j) ? 'ta' : '') });
      h += [0, 1, 2].map(j => K.t(cx(X, CW, j), Y - 8, `${p.et}${j + 1}`, 's tm')).join('') + [0, 1, 2].map(i => K.t(X - 8, cy(Y, RH, i) + 4, `${p.et}${i + 1}`, 's tm', 'end')).join('');
      const todo = [0, 1, 2].every(i => [0, 1, 2].every(j => val(v, p, i, j) === val(v, p, j, i)));
      return h + K.f(f * 2 - 1, K.t(334, 80, todo ? 'Aᵀ = A' : 'Aᵀ ≠ A', todo ? 'tg' : 'tf', 'end'));
    },
    lee: (v, p) => huecos(p).map(([i, j], k) => `$a_{${i + 1}${j + 1}} = ${v[['a', 'b'][k]]}$`).join(', '),
    aviso(v, p) {
      const [x, y] = pide(p), H = huecos(p), bA = v.a === x, bB = v.b === y;
      if (!bA && !bB && v.a === y && v.b === x && x !== y) return 'Cruzaste los espejos: cada casilla copia a la del otro lado de la diagonal, con fila y columna cambiadas.';
      if (bA) return `La casilla ${lug(H[1])} todavía no se refleja: su pareja está en ${lug([H[1][1], H[1][0]])}.`;
      if (bB) return `La casilla ${lug(H[0])} todavía no se refleja: su pareja está en ${lug([H[0][1], H[0][0]])}.`;
      return 'Ninguna se refleja aún: la casilla (i, j) debe valer lo mismo que la (j, i).';
    },
    bien: () => 'Cada número es igual a su reflejo en la diagonal: la matriz es simétrica, Aᵀ = A.',
  });

  // Tallas: A es m×n y B es n×r; qué tamaño tiene cada matriz, o si no existe.  params { m, n, r }
  const talla = (a, b) => `${a}×${b}`;
  const metasTalla = p => [talla(p.n, p.m), talla(p.r, p.n), talla(p.r, p.m), talla(p.r, p.m), 'no existe'];
  XG.rotula('tallas-transpuesta', {
    slots: () => [0, 1, 2, 3, 4].map(i => ({ x: 268, y: 28 + i * 46, w: 96, h: 36 })),
    fichas: p => [...metasTalla(p), talla(p.m, p.r), talla(p.m, p.n)], metas: metasTalla, alto: () => 240,
    texto: p => `$A^T$: $${p.n} \\times ${p.m}$; $B^T$: $${p.r} \\times ${p.n}$; $(AB)^T = B^T A^T$: $${p.r} \\times ${p.m}$; $A^T B^T$ no existe`,
    fondo(K, p, f) {
      const u = 11, bloque = (x, y, a, b, cls) => { let h = ''; for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) h += K.r(x + j * u, y + i * u, u - 2, u - 2, cls, 2); return h; };
      let h = bloque(20, 26, p.m, p.n, 'fa') + K.t(20, 26 + p.m * u + 16, `A: ${p.m} × ${p.n}`, 's', 'start')
        + bloque(20, 110, p.n, p.r, 'fg') + K.t(20, 110 + p.n * u + 16, `B: ${p.n} × ${p.r}`, 's', 'start');
      h += ['Aᵀ', 'Bᵀ', '(AB)ᵀ', 'Bᵀ · Aᵀ', 'Aᵀ · Bᵀ'].map((t, i) => K.t(208, 33 + i * 46, t, '', 'end')).join('');
      h += K.f(f, K.t(150, 217, `${p.m} ≠ ${p.r}`, 's tf', 'end') + K.t(150, 171, `= (AB)ᵀ`, 's tg', 'end'));
      return h;
    },
    aviso(q, p) {
      const v = q.map(l => l[0]), m = metasTalla(p), i = m.findIndex((x, k) => v[k] !== x);
      if (i === 0) return v[0] === talla(p.m, p.n) ? 'Esa es la talla de A: al transponer, filas y columnas cambian de papel.' : 'Aᵀ tiene tantas filas como columnas tenía A.';
      if (i === 1) return v[1] === talla(p.n, p.r) ? 'Esa es la talla de B: al transponer, se voltea.' : 'Bᵀ tiene tantas filas como columnas tenía B.';
      if (i === 2) return v[2] === talla(p.m, p.r) ? `AB es ${p.m} × ${p.r}; su transpuesta se voltea: ${p.r} × ${p.m}.` : 'Primero AB: filas de A por columnas de B. Luego se voltea.';
      if (i === 3) return `Bᵀ es ${p.r} × ${p.n} y Aᵀ es ${p.n} × ${p.m}: los del medio coinciden y el producto queda ${p.r} × ${p.m}.`;
      return `Aᵀ es ${p.n} × ${p.m} y Bᵀ es ${p.r} × ${p.n}: los del medio (${p.m} y ${p.r}) no coinciden, así que ese producto no existe.`;
    },
    bien: () => '(AB)ᵀ = BᵀAᵀ: al voltear el producto se invierte el orden, y así las tallas encajan.',
  });

  // ------------------------------------------------------------------------------------------------ operaciones de fila
  // Una cadena M₀ → M₁ → M₂ → M₃: se nombra la operación de cada paso.  params { Ms, ops, extra, mira, trampas }
  XG.rotula('nombra-operacion', {
    slots: () => [0, 1, 2].map(i => ({ x: 250, y: 68 + i * 74, w: 164, h: 34 })),
    fichas: p => [...p.ops, ...p.extra], metas: p => p.ops, alto: () => 282,
    texto: p => p.ops.join('; '),
    fondo(K, p, f) {
      const CW = 26, RH = 15;
      let h = '';
      p.Ms.forEach((M, k) => {
        const y = 8 + k * 74;
        if (k && f) M.forEach((row, i) => { if (row.join() !== p.Ms[k - 1][i].join()) h += K.f(f, K.r(22, y + i * RH, 4 * CW + 4, RH, 'fn', 3)); });
        h += mat(K, 18, y, M, { cw: CW, rh: RH, bar: 2, s: true });
        if (k < 3) h += K.ar(74, y + 49, 74, y + 70, 'lm') + K.l(90, y + 60, 166, y + 60, 'lm d');
      });
      return h;
    },
    aviso(q, p) { const i = p.ops.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: () => 'Cada paso es una de las tres operaciones: intercambiar filas, multiplicar una por k ≠ 0 o sumarle k veces otra.',
  });

  // Anular la primera columna bajo el pivote con F₂ + k₂·F₁ y F₃ + k₃·F₁.  v { a, b }  params { F }
  const kNeed = (p, i) => -p.F[i][0] / p.F[0][0];
  const filaK = (p, i, k) => p.F[i].map((e, j) => e + k * p.F[0][j]);
  const conK = k => (k < 0 ? `− ${-k}` : `+ ${k}`);
  XG.figura('anula-bajo-pivote', {
    ini: () => ({ a: 0, b: 0 }),
    manijas: () => [{ k: 'a', min: -4, max: 4, paso: 1, et: 'k₂, para F₂ + k₂·F₁' }, { k: 'b', min: -4, max: 4, paso: 1, et: 'k₃, para F₃ + k₃·F₁' }],
    ok: (v, p) => v.a === kNeed(p, 1) && v.b === kNeed(p, 2),
    sol: p => ({ a: kNeed(p, 1), b: kNeed(p, 2) }),
    texto: p => `$k_2 = ${kNeed(p, 1)}$ y $k_3 = ${kNeed(p, 2)}$: $F_2 ${conK(kNeed(p, 1)).replace('−', '-')} F_1$ y $F_3 ${conK(kNeed(p, 2)).replace('−', '-')} F_1$`,
    alto: () => 232, pie: 'Mueve k₂ y k₃. Al comprobar se hacen las cuentas.',
    dib(v, K, p, f) {
      const X = 34, Y = 18, CW = 40, RH = 32, M = [p.F[0], f > 0.5 ? filaK(p, 1, v.a) : p.F[1], f > 0.5 ? filaK(p, 2, v.b) : p.F[2]];
      let h = K.c(cx(X, CW, 0), cy(Y, RH, 0), 14, 'fn');
      if (f > 0.5) [1, 2].forEach(i => { h += K.f(f * 2 - 1, K.c(cx(X, CW, 0), cy(Y, RH, i), 14, M[i][0] === 0 ? 'fo' : 'ff')); });
      h += mat(K, X, Y, M, { cw: CW, rh: RH, bar: 2 });
      h += K.t(218, cy(Y, RH, 0) + 4, 'F₁ (pivote ' + sg(p.F[0][0]) + ')', 's tm', 'start');
      h += K.t(218, cy(Y, RH, 1) + 4, `F₂ ${conK(v.a)}·F₁`, 's ta', 'start') + K.t(218, cy(Y, RH, 2) + 4, `F₃ ${conK(v.b)}·F₁`, 's ta', 'start');
      return h;
    },
    lee: v => `$F_2 \\to F_2 ${conK(v.a).replace('−', '-')} F_1$, $F_3 \\to F_3 ${conK(v.b).replace('−', '-')} F_1$`,
    aviso(v, p) {
      const e2 = filaK(p, 1, v.a)[0], e3 = filaK(p, 2, v.b)[0];
      if ((e2 && v.a && v.a === -kNeed(p, 1)) || (!e2 && e3 && v.b && v.b === -kNeed(p, 2))) return 'Con ese signo el número de abajo crece en vez de anularse: usa el k contrario.';
      if (e2) return `En F₂ la primera entrada queda en ${sg(e2)}, no en 0.`;
      return `F₂ quedó bien; en F₃ la primera entrada queda en ${sg(e3)}, no en 0.`;
    },
    bien: (v, p) => `Debajo del pivote ${sg(p.F[0][0])} solo quedan ceros: la primera columna ya está en escalera.`,
  });

  // ------------------------------------------------------------------------------------------------ pivotes y tipo
  // Se rotula cada columna de una escalonada (pivote o libre) y el tipo de solución.  params { M (última columna: constantes), extra }
  const nv = p => p.M[0].length - 1;
  const pivs = p => p.M.map(r => r.slice(0, nv(p)).findIndex(e => e !== 0)).filter(j => j >= 0);
  const tipoDe = p => (p.M.some(r => r.slice(0, nv(p)).every(e => e === 0) && r[nv(p)] !== 0) ? 'ninguna' : pivs(p).length === nv(p) ? 'única' : 'infinitas');
  const metasPL = p => [...Array.from({ length: nv(p) }, (_, j) => (pivs(p).includes(j) ? 'pivote' : 'libre')), tipoDe(p)];
  const XS5 = [52, 114, 176, 238, 298];
  XG.rotula('pivote-o-libre', {
    slots: p => [...Array.from({ length: nv(p) }, (_, j) => ({ x: XS5[j], y: 152, w: 60, h: 34 })), { x: 262, y: 206, w: 104, h: 34 }],
    fichas: p => [...metasPL(p), ...p.extra], metas: metasPL, alto: () => 230,
    texto(p) {
      const n = j => `x_${j + 1}`, l = Array.from({ length: nv(p) }, (_, j) => j).filter(j => !pivs(p).includes(j));
      return `pivotes en $${pivs(p).map(n).join(', ')}$; libres: $${l.map(n).join(', ')}$; ${{ 'única': 'solución única', infinitas: 'infinitas soluciones', ninguna: 'ninguna solución' }[tipoDe(p)]}`;
    },
    fondo(K, p, f) {
      const Y = 34, RH = 28;
      let h = '';
      p.M.forEach((r, i) => { const j = r.slice(0, nv(p)).findIndex(e => e !== 0); if (j >= 0) h += K.f(f, K.c(XS5[j], Y + RH * (i + 0.5), 13, 'fo')); });
      h += K.pl([[26, Y], [20, Y], [20, Y + 3 * RH], [26, Y + 3 * RH]]) + K.pl([[318, Y], [324, Y], [324, Y + 3 * RH], [318, Y + 3 * RH]]) + K.l(268, Y + 3, 268, Y + 3 * RH - 3, 'lm');
      p.M.forEach((r, i) => r.forEach((e, j) => { h += K.t(XS5[j], Y + RH * (i + 0.5) + 5, sg(e)); }));
      h += Array.from({ length: nv(p) }, (_, j) => K.t(XS5[j], Y - 8, `x${sub(j + 1)}`, 's tm')).join('');
      return h + K.t(200, 211, 'soluciones:', 's', 'end');
    },
    aviso(q, p) {
      const v = q.map(l => l[0]), m = metasPL(p), i = m.findIndex((x, k) => v[k] !== x), N = nv(p);
      if (i < N) {
        if (m[i] === 'pivote') return `La columna de x${sub(i + 1)} sí tiene pivote: ahí está el primer número distinto de cero de una fila.`;
        return p.M.some(r => r[i] !== 0) ? `El número de la columna x${sub(i + 1)} no es pivote: en su fila hay antes otro distinto de cero. Esa variable queda libre.` : `En la columna de x${sub(i + 1)} no empieza ninguna fila: esa variable queda libre.`;
      }
      if (m[i] === 'ninguna') return 'Hay una fila 0 … 0 | c con c ≠ 0: dice 0 = c, imposible. No hay solución, aunque haya columnas libres.';
      if (m[i] === 'infinitas') return v[i] === 'única' ? 'Hay columnas sin pivote: esas variables quedan libres y dan infinitas soluciones.' : 'Las filas de ceros dicen 0 = 0, que siempre se cumple: no hay nada imposible.';
      return 'Cada incógnita tiene su pivote y nada es imposible: la solución es una sola.';
    },
    bien: p => (tipoDe(p) === 'ninguna' ? 'La fila 0 … 0 | c con c ≠ 0 manda: sin solución. Las columnas igual se leen como pivote o libre.' : 'Cada columna con pivote se despeja; cada una sin pivote queda libre como parámetro.'),
  });

  // Red de tráfico con una calle libre: x₄ = t y las demás dependen de t. Menor t con todas ≥ 0.  v { t }  params { e: [A, B, C, D] }
  const flujos = (p, t) => { const a = t + p.e[0], b = a + p.e[1], c = b + p.e[2]; return [a, b, c, t]; };
  const tMin = p => Math.max(0, ...flujos(p, 0).map(x => -x));
  const ND = [[84, 44], [256, 44], [256, 150], [84, 150]];
  XG.figura('red-de-flujo', {
    ini: () => ({ t: 0 }),
    manijas: () => [{ k: 't', min: 0, max: 60, paso: 5, et: 'carros por hora en x₄ = t' }],
    ok: (v, p) => v.t === tMin(p),
    sol: p => ({ t: tMin(p) }),
    texto: p => { const x = flujos(p, tMin(p)); return `$t = ${tMin(p)}$: $x_1 = ${x[0]}$, $x_2 = ${x[1]}$, $x_3 = ${x[2]}$, $x_4 = ${x[3]}$`; },
    alto: () => 250, pie: 'Arrastra t por la regla de abajo.',
    dib(v, K, p, f) {
      const x = flujos(p, v.t), lab = [[170, 30], [270, 102], [170, 176], [70, 102]], an = ['middle', 'start', 'middle', 'end'];
      let h = '';
      [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, b], k) => {
        const [x1, y1] = ND[a], [x2, y2] = ND[b], dx = Math.sign(x2 - x1) * 18, dy = Math.sign(y2 - y1) * 18, neg = f > 0.5 && x[k] < 0;
        h += K.ar(x1 + dx, y1 + dy, x2 - dx, y2 - dy, `${k === 3 ? 'la' : neg ? 'lf' : 'lg'} gr`);
        const t = k === 3 ? `x₄ = ${v.t}` : f > 0.5 ? `x${sub(k + 1)} = ${sg(x[k])}` : `x${sub(k + 1)} = ?`;
        h += K.t(lab[k][0], lab[k][1] + 4, t, `s ${k === 3 ? 'ta' : neg ? 'tf' : ''}`.trim(), an[k]);
      });
      // Entradas y salidas de afuera.
      const O = [[26, 14], [314, 14], [314, 186], [26, 186]];
      p.e.forEach((e, k) => {
        const N = ND[k], u = [N[0] - O[k][0], N[1] - O[k][1]], d = Math.hypot(...u), w = [u[0] / d * 18, u[1] / d * 18];
        h += e > 0 ? K.ar(...O[k], N[0] - w[0], N[1] - w[1], 'lm') : K.ar(N[0] - w[0], N[1] - w[1], ...O[k], 'lm');
        h += K.t(O[k][0] + (k === 0 || k === 3 ? 22 : -22), O[k][1] + (k < 2 ? 4 : 2), `${Math.abs(e)}`, 's tm', k === 0 || k === 3 ? 'start' : 'end');
      });
      ND.forEach(([a, b], k) => { h += K.c(a, b, 14, 'fn') + K.t(a, b + 5, 'ABCD'[k], 's'); });
      return h;
    },
    lee: (v, p) => { const x = flujos(p, v.t); return `$x_1 = ${x[0]}$, $x_2 = ${x[1]}$, $x_3 = ${x[2]}$, $x_4 = ${x[3]}$`; },
    aviso(v, p) {
      const x = flujos(p, v.t), k = x.findIndex(z => z < 0);
      if (k >= 0) return `Con t = ${v.t}, la calle x${sub(k + 1)} lleva ${sg(x[k])}: los carros irían en contra.`;
      return `Con t = ${v.t} todas van en su sentido, pero se puede con menos: busca el menor t.`;
    },
    bien: (v, p) => `Con t = ${tMin(p)} la calle más justa queda en 0 y ninguna va en contra.`,
  });

  // ------------------------------------------------------------------------------------------------ en movimiento
  // Se fija k y al soltar la bola cae en la caja del tipo de solución que da la última fila [0 0 a(k) | b(k)].
  //   tiros [{ q, a: [c2, c1, c0], b: [d1, d0], sa, sb, pide, r, c }]
  const ev = (t, k) => [t.a[0] * k * k + t.a[1] * k + t.a[2], t.b[0] * k + t.b[1]];
  const tipoK = (t, k) => { const [a, b] = ev(t, k); return a !== 0 ? 'única' : b === 0 ? 'infinitas' : 'ninguna'; };
  const CAJAS = ['única', 'ninguna', 'infinitas'], BX = [66, 170, 274];
  XG.tiros('cae-en-tipo', {
    perilla: () => ({ et: 'k', min: 0, max: 10, cara: v => v - 5, lee: v => `k = ${sg(v - 5)}` }),
    meta: t => t.r + 5, alto: 214, ms: 1500,
    dib(t, v, K, p, f) {
      const k = v == null ? null : v - 5, num = k != null && f > 0.2, [a, b] = k == null ? [0, 0] : ev(t, k);
      let h = K.t(170, 18, 'última fila de la escalonada', 's tm');
      h += K.pl([[82, 30], [76, 30], [76, 62], [82, 62]]) + K.pl([[258, 30], [264, 30], [264, 62], [258, 62]]) + K.l(214, 33, 214, 59, 'lm');
      h += K.t(104, 51, '0') + K.t(140, 51, '0') + K.t(182, 51, num ? sg(a) : t.sa, num ? 'ta' : '') + K.t(240, 51, num ? sg(b) : t.sb, num ? 'ta' : '');
      CAJAS.forEach((c, i) => {
        h += K.r(BX[i] - 44, 150, 88, 40, 'fn', 8) + K.t(BX[i], 206, c, 's');
        if (c === t.pide) h += caja(K, BX[i] - 46, 148, 92, 44, 'la');
      });
      if (k == null) return h + K.c(170, 96, 9, 'fk');
      const ty = tipoK(t, k), i = CAJAS.indexOf(ty), u = Math.min(1, f * 1.25), bx = 170 + (BX[i] - 170) * u, by = 96 + (168 - 96) * u * u;
      h += K.f(f * 2 - 0.4, K.t(170, 86, a !== 0 ? `${sg(a)}·x₃ = ${sg(b)}` : `0 = ${sg(b)}`, 's'));
      if (f >= 1) h += K.r(BX[i] - 44, 150, 88, 40, ty === t.pide ? 'fo' : 'ff', 8) + K.t(BX[i], 206, CAJAS[i], 's');
      return h + K.c(bx, by, 9, 'fA');
    },
    falla(t, v) {
      const k = v - 5, [a, b] = ev(t, k), ty = tipoK(t, k);
      const por = { 'única': 'hay pivote y la solución es única', ninguna: 'dice 0 = algo distinto de 0: sin solución', infinitas: 'dice 0 = 0 y una variable queda libre' }[ty];
      return t.e?.[k] || `Con k = ${sg(k)} la fila queda 0 0 ${sg(a)} | ${sg(b)}: ${por}.`;
    },
    cuenta: t => `$k = ${t.r}$: ${t.c}`, pie: 'Estira hasta tu k y suelta: la bola cae donde dice la última fila.',
  });
})();
