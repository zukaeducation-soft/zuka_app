// Geometría Vectorial · juegos de la lección geo-6 «La función determinante» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js: XG.figura (se arrastra), XG.rotula (fichas a su lugar) y XG.tiros (en movimiento). Se dibujan con XPK.
(() => {
  const N = x => String(x).replace('-', '−');
  const T = x => (x < 0 ? `(${N(x)})` : N(x));                       // número dentro de una cuenta en texto plano
  const TX = x => (x < 0 ? `(${x})` : String(x));                     // lo mismo, en TeX
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const menor = (A, i, j) => A.filter((_, r) => r !== i).map(f => f.filter((_, c) => c !== j));
  const det3 = A => A[0].reduce((s, a, j) => s + (j % 2 ? -1 : 1) * a * det2(menor(A, 0, j)), 0);
  const signo = (i, j) => ((i + j) % 2 ? '−' : '+');
  const avisa = metas => (q, p) => { const ms = metas(p), i = ms.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
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

  // ------------------------------------------------- area-signo-columnas · det(u, w): área del paralelogramo y sentido del giro
  // u fijo; se arrastra la punta de w. Al comprobar: el área con signo y hacia dónde gira w respecto a u.
  //   v { a, b }: w = (a, b)   params { u, meta, ini: [a, b], ok }
  const SO = [128, 132], SU = 20, SP = (x, y) => [SO[0] + x * SU, SO[1] - y * SU];
  const SD = (v, p) => p.u[0] * v.b - p.u[1] * v.a;
  XG.figura('area-signo-columnas', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: ['a', 'b'], min: -4, max: 4, paso: 1, rot: () => 'w', en: v => SP(v.a, v.b), de: (x, y) => [(x - SO[0]) / SU, (SO[1] - y) / SU] }],
    ok: (v, p) => SD(v, p) === p.meta,
    sol(p) { for (let b = -4; b <= 4; b++) for (let a = -4; a <= 4; a++) if (SD({ a, b }, p) === p.meta && !(a === p.ini[0] && b === p.ini[1])) return { a, b }; return null; },
    texto: p => `$\\det(\\vec u, \\vec w) = u_1w_2 - u_2w_1 = ${p.meta}$`, alto: () => 250, pie: 'Arrastra la punta de w.',
    dib(v, K, p, f) {
      const d = SD(v, p), u = p.u, P4 = [[0, 0], u, [u[0] + v.a, u[1] + v.b], [v.a, v.b]].map(q => SP(...q)), bien = d === p.meta;
      let h = rejilla(K, SO, SU, -4, 4, -4, 4) + K.p(P4, f >= 1 ? (bien ? 'fo' : 'ff') : 'fa');
      h += K.ar(...SO, ...SP(...u), 'la gr') + K.ar(...SO, ...SP(v.a, v.b), 'lg gr') + K.t(...SP(u[0] + 0.3, u[1] - 0.6), 'u', 'ta', 'start');
      h += K.t(296, 30, 'det [u w]', 's tm') + mat(K, 296, 60, [[u[0], 'w₁'], [u[1], 'w₂']], 's');
      if (f > 0) {
        const g = a => Math.atan2(a[1], a[0]) * 180 / Math.PI, a0 = g(u);
        let b0 = g([v.a, v.b]); b0 = a0 + (((b0 - a0) % 360) + 540) % 360 - 180;
        h += K.f(f, (d ? K.arc(...SO, 30, a0, b0, d > 0 ? 'lo gr' : 'lf gr') : '') + K.t(296, 116, `= ${N(d)}`, `${bien ? 'to' : 'tf'}`)
          + K.t(296, 140, d > 0 ? 'w gira a la izquierda' : d < 0 ? 'w gira a la derecha' : 'w sobre la recta de u', 's tm')
          + K.t(296, 158, d > 0 ? 'de u: signo +' : d < 0 ? 'de u: signo −' : 'área 0', 's tm') + K.t(296, 186, `área ${Math.abs(d)}`, 's tm'));
      }
      return h;
    },
    lee: (v, p) => `$\\det(\\vec u, \\vec w) = ${p.u[0]} \\cdot ${TX(v.b)} - ${TX(p.u[1])} \\cdot ${TX(v.a)} = ${SD(v, p)}$`,
    aviso(v, p) {
      const d = SD(v, p), m = p.meta;
      if (d === 0) return 'w quedó sobre la recta de u: el paralelogramo se aplasta y el determinante vale 0.';
      if (d === -m) return `El área sí mide ${Math.abs(m)}, pero w quedó girando hacia el lado contrario: el signo salió ${d > 0 ? '+' : '−'}. Pásalo al otro lado de u.`;
      if (Math.sign(d) !== Math.sign(m)) return `w gira a la ${d > 0 ? 'izquierda' : 'derecha'} de u, y eso da un determinante ${d > 0 ? 'positivo' : 'negativo'}: se pide ${m > 0 ? 'positivo' : 'negativo'}.`;
      return `El giro va bien, pero el área es ${Math.abs(d)}, no ${Math.abs(m)}: ${Math.abs(d) < Math.abs(m) ? 'falta' : 'sobra'} altura sobre la recta de u.`;
    },
    bien: p => p.ok || 'El área con signo da justo lo pedido: tamaño y sentido del giro.',
  });

  // ---------------------------------------------- caja-tres-columnas · det de 3 × 3: volumen con signo del paralelepípedo
  // Las columnas de A son las aristas de una caja inclinada; c (fila 3 de la tercera columna) va en un deslizador.
  //   v { c }   params { A (con null en la casilla de c), min, max, ini, meta, ok }
  const CO = [104, 166], CU = 14, CI = (x, y, z) => XPK.iso(CO, CU, x, y, z);
  const CA = (p, c) => p.A.map(f => f.map(x => (x == null ? c : x)));
  const CS = p => { for (let c = p.min; c <= p.max; c++) if (det3(CA(p, c)) === p.meta) return c; return null; };
  XG.figura('caja-tres-columnas', {
    ini: p => ({ c: p.ini }),
    manijas: p => [{ k: 'c', min: p.min, max: p.max, paso: 1, et: 'c: fila 3 de la tercera columna' }],
    ok: (v, p) => det3(CA(p, v.c)) === p.meta, sol: p => ({ c: CS(p) }),
    texto: p => `$c = ${CS(p)}$: $\\det A = ${p.meta}$`, alto: () => 268, pie: 'Desliza c.',
    dib(v, K, p, f) {
      const A = CA(p, v.c), col = j => [A[0][j], A[1][j], A[2][j]], [a, b, w] = [0, 1, 2].map(col), d = det3(A), bien = d === p.meta;
      const S = (...vs) => vs.reduce((s, q) => s.map((x, i) => x + q[i]), [0, 0, 0]), V = q => CI(...q), z = [0, 0, 0];
      const caras = [[z, a, S(a, b), b], [w, S(a, w), S(a, b, w), S(b, w)], [z, a, S(a, w), w], [b, S(a, b), S(a, b, w), S(b, w)], [z, b, S(b, w), w], [a, S(a, b), S(a, b, w), S(a, w)]];
      const cl = f >= 1 ? (d === 0 ? 'ff' : bien ? 'fo' : 'ff') : 'fa';
      let h = caras.map(c => K.p(c.map(V), cl)).join('');
      h += K.ar(...V(z), ...V(a), 'la gr') + K.ar(...V(z), ...V(b), 'la gr') + K.ar(...V(z), ...V(w), 'lg gr');
      h += K.t(...V(S(a, [0.3, 0, -0.5])), 'a₁', 's ta', 'start') + K.t(...V(S(b, [-0.6, 0, -0.4])), 'a₂', 's ta', 'end') + K.t(...V(S(w, [0.4, 0, 0.3])), 'a₃', 's tg', 'start');
      h += K.t(262, 26, 'A = [a₁ a₂ a₃]', 's tm') + mat(K, 262, 62, A.map(f => f.map(N)), 's');
      return h + K.f(f, K.t(262, 120, `det A = ${N(d)}`, bien ? 'to' : 'tf') + K.t(262, 142, d === 0 ? 'caja aplastada: volumen 0' : `volumen ${Math.abs(d)}`, 's tm')
        + K.t(262, 160, d > 0 ? 'orientación positiva' : d < 0 ? 'orientación al revés' : 'tres aristas en un plano', 's tm'));
    },
    lee: (v, p) => { const A = CA(p, v.c), t = [0, 1, 2].map(j => `${j === 1 ? '-' : '+'} ${TX(A[0][j])} \\cdot ${TX(det2(menor(A, 0, j)))}`).join(' ').replace(/^\+ /, ''); return `$\\det A = ${t} = ${det3(A)}$`; },
    aviso(v, p) {
      const d = det3(CA(p, v.c));
      if (d === 0) return `Con c = ${N(v.c)} las tres aristas quedan en un mismo plano: la caja se aplasta y det A = 0.`;
      if (d === -p.meta) return `El volumen sí mide ${Math.abs(d)}, pero el signo salió al revés: det A = ${N(d)}. Busca la c que da ${N(p.meta)}.`;
      return `Con c = ${N(v.c)}, desarrollando por la primera fila, det A = ${N(d)}, no ${N(p.meta)}.`;
    },
    bien: p => p.ok || 'El volumen con signo de la caja es justo el pedido.',
  });

  // ----------------------------------------------------- fila-mas-ceros · se desarrolla por la línea que borra más términos
  // Un deslizador recorre filas y columnas; al comprobar, la escena desarrolla por la línea elegida y tacha los ceros.
  //   v { k: 0–2 filas, 3–5 columnas }   params { A, ok }
  const LIN = ['fila 1', 'fila 2', 'fila 3', 'columna 1', 'columna 2', 'columna 3'];
  const celdas = k => [0, 1, 2].map(n => (k < 3 ? [k, n] : [n, k - 3]));
  const ceros = (A, k) => celdas(k).filter(([i, j]) => A[i][j] === 0).length;
  const LM = p => { let m = 0; for (let k = 1; k < 6; k++) if (ceros(p.A, k) > ceros(p.A, m)) m = k; return m; };
  XG.figura('fila-mas-ceros', {
    ini: () => ({ k: 0 }),
    manijas: () => [{ k: 'k', min: 0, max: 5, paso: 1, rot: v => (v.k < 3 ? `F${v.k + 1}` : `C${v.k - 2}`), et: 'filas 1 a 3, columnas 1 a 3' }],
    ok: (v, p) => v.k === LM(p), sol: p => ({ k: LM(p) }),
    texto: p => `por la ${LIN[LM(p)]}: $\\det A = ${det3(p.A)}$`, alto: () => 262, pie: 'Desliza hasta la fila o columna que convenga.',
    dib(v, K, p, f) {
      const x0 = 50, y0 = 40, dx = 40, dy = 34, cs = celdas(v.k);
      let h = K.t(110, 22, 'A', 's tm');
      if (v.k < 3) h += K.r(x0 - 18, y0 + v.k * dy - 16, dx * 3 - 4, dy - 6, 'fa', 8); else h += K.r(x0 + (v.k - 3) * dx - 18, y0 - 16, 36, dy * 3 - 6, 'fa', 8);
      h += K.pl([[x0 - 18, y0 - 20], [x0 - 24, y0 - 20], [x0 - 24, y0 + 2 * dy + 18], [x0 - 18, y0 + 2 * dy + 18]]) + K.pl([[x0 + 2 * dx + 18, y0 - 20], [x0 + 2 * dx + 24, y0 - 20], [x0 + 2 * dx + 24, y0 + 2 * dy + 18], [x0 + 2 * dx + 18, y0 + 2 * dy + 18]]);
      p.A.forEach((r, i) => r.forEach((e, j) => { h += K.t(x0 + j * dx, y0 + i * dy + 5, N(e)); h += K.t(x0 + j * dx + 13, y0 + i * dy - 7, signo(i, j), 's tm'); }));
      const lin = cs.map(([i, j]) => [i, j, p.A[i][j]]);
      if (f > 0) {
        let y = 50;
        h += K.f(f, K.t(196, 30, `por la ${LIN[v.k]}:`, 's tm', 'start'));
        lin.forEach(([i, j, e]) => {
          const tx = `${signo(i, j)} ${T(e)} · M${'₁₂₃'[i]}${'₁₂₃'[j]}`;
          h += K.f(f, K.t(196, y + 22, tx, e === 0 ? 's tm' : 's', 'start') + (e === 0 ? K.l(194, y + 18, 300, y + 18, 'lf') : '')); y += 26;
        });
        const n = lin.filter(l => l[2] !== 0).length;
        h += K.f(f, K.t(196, 156, `${n} ${n === 1 ? 'menor' : 'menores'} por calcular`, v.k === LM(p) ? 's to' : 's tf', 'start') + K.t(196, 178, `det A = ${N(det3(p.A))}`, 's', 'start'));
      }
      return h;
    },
    lee: (v, p) => `$\\text{${LIN[v.k]}: } ${ceros(p.A, v.k)} \\text{ ceros, } ${3 - ceros(p.A, v.k)} \\text{ menores}$`,
    aviso(v, p) {
      const c = ceros(p.A, v.k), m = LM(p);
      return `La ${LIN[v.k]} tiene ${c === 0 ? 'ningún cero' : c === 1 ? 'un cero' : `${c} ceros`}: quedan ${3 - c} menores por calcular. La ${LIN[m]} tiene ${ceros(p.A, m)} y deja menos cuentas.`;
    },
    bien: p => p.ok || 'Esa línea tiene más ceros: cada cero borra un término del desarrollo.',
  });

  // --------------------------------------------------------- cofactor-tablero · signo del tablero y menor de cada casilla
  // Se desarrolla por una fila o columna: para cada casilla, su signo (+ − + en tablero de ajedrez) y su menor.
  //   params { A, lin: 0–2 filas, 3–5 columnas, extra, trampas?, ok }
  const KS = [0, 1, 2].flatMap(n => [{ x: 20 + n * 108, y: 168, w: 28, h: 34 }, { x: 92 + n * 108, y: 168, w: 42, h: 34 }]);
  const KM = p => celdas(p.lin).flatMap(([i, j]) => [signo(i, j), N(det2(menor(p.A, i, j)))]);
  XG.rotula('cofactor-tablero', {
    slots: () => KS, metas: KM, fichas: p => [...KM(p), ...p.extra], alto: () => 226,
    texto: p => `$\\det A = ${celdas(p.lin).map(([i, j], n) => `${n || signo(i, j) === '−' ? signo(i, j).replace('−', '-') : ''} ${TX(p.A[i][j])} \\cdot ${TX(det2(menor(p.A, i, j)))}`).join(' ')} = ${det3(p.A)}$`,
    fondo(K, p, f) {
      const cs = celdas(p.lin), x0 = 120, y0 = 30, dx = 34, dy = 26;
      let h = K.t(60, 62, 'A =', '', 'end');
      if (p.lin < 3) h += K.r(x0 - 16, y0 + p.lin * dy - 14, dx * 3 - 2, dy - 4, 'fa', 7); else h += K.r(x0 + (p.lin - 3) * dx - 16, y0 - 14, 32, dy * 3 - 4, 'fa', 7);
      h += K.pl([[x0 - 16, y0 - 16], [x0 - 22, y0 - 16], [x0 - 22, y0 + 2 * dy + 14], [x0 - 16, y0 + 2 * dy + 14]]) + K.pl([[x0 + 2 * dx + 16, y0 - 16], [x0 + 2 * dx + 22, y0 - 16], [x0 + 2 * dx + 22, y0 + 2 * dy + 14], [x0 + 2 * dx + 16, y0 + 2 * dy + 14]]);
      p.A.forEach((r, i) => r.forEach((e, j) => { h += K.t(x0 + j * dx, y0 + i * dy + 5, N(e), 's'); }));
      h += K.t(282, 46, `por la ${LIN[p.lin]}`, 's tm') + K.t(282, 66, 'signo · entrada · menor', 's tm');
      h += K.t(14, 128, 'det A =', 's', 'start');
      cs.forEach(([i, j], n) => { h += K.t(53 + n * 108, 173, `${T(p.A[i][j])}·`, 's'); });
      const tr = cs.map(([i, j]) => (signo(i, j) === '+' ? 1 : -1) * p.A[i][j] * det2(menor(p.A, i, j)));
      return h + K.f(f, K.t(170, 216, `= ${tr.map((x, n) => (n ? (x < 0 ? ` − ${-x}` : ` + ${x}`) : N(x))).join('')} = ${N(det3(p.A))}`, 's ta'));
    },
    aviso(q, p) {
      const ms = KM(p), i = ms.findIndex((m, k) => q[k][0] !== m), y = q[i][0], [r, c] = celdas(p.lin)[i >> 1], M = menor(p.A, r, c);
      if (p.trampas?.[`${i}:${y}`]) return p.trampas[`${i}:${y}`];
      if (i % 2 === 0) return `La casilla (${r + 1}, ${c + 1}) lleva signo ${signo(r, c)}: el tablero empieza con + arriba a la izquierda y alterna.`;
      if (y === N(M[0][0] * M[1][1] + M[0][1] * M[1][0])) return `Ese menor sumó los dos productos: un determinante 2 × 2 es ad − bc.`;
      if (/^[+−]$/.test(y)) return `En ese lugar va el menor de la casilla (${r + 1}, ${c + 1}), un número, no un signo.`;
      return `Tapa la fila ${r + 1} y la columna ${c + 1}: el menor de esa casilla es el determinante 2 × 2 que queda.`;
    },
    bien: p => p.ok,
  });

  // ----------------------------------------------------------- sarrus-seis-diagonales · regla de Sarrus para el 3 × 3
  // Se copian las dos primeras columnas a la derecha. Abajo, los productos de las bajadas (suman); arriba, los de las subidas (restan).
  //   params { A, extra, ok }
  const SX = j => 78 + j * 46, SY = i => 82 + i * 28;
  const SAS = [2, 3, 4].map(j => ({ x: SX(j), y: 184, w: 44, h: 32 })).concat([2, 3, 4].map(j => ({ x: SX(j), y: 28, w: 44, h: 32 })));
  const ext = A => A.map(f => [...f, f[0], f[1]]);
  const baja = (A, j) => ext(A)[0][j] * ext(A)[1][j + 1] * ext(A)[2][j + 2], sube = (A, j) => ext(A)[2][j] * ext(A)[1][j + 1] * ext(A)[0][j + 2];
  const SM = p => [0, 1, 2].map(j => N(baja(p.A, j))).concat([0, 1, 2].map(j => N(sube(p.A, j))));
  XG.rotula('sarrus-seis-diagonales', {
    slots: () => SAS, metas: SM, fichas: p => [...SM(p), ...p.extra], alto: () => 232,
    texto: p => `$\\det A = (${[0, 1, 2].map(j => baja(p.A, j)).join(' + ')}) - (${[0, 1, 2].map(j => sube(p.A, j)).join(' + ')}) = ${det3(p.A)}$`.replace(/\+ -/g, '- '),
    fondo(K, p, f) {
      const E = ext(p.A);
      let h = K.r(SX(3) - 20, SY(0) - 16, 88, 82, 'fc', 8);
      for (let j = 0; j < 3; j++) h += K.l(SX(j) - 8, SY(0) - 8, SX(j + 2) + 4, SY(2) + 16, 'lm d') + K.l(SX(j) - 8, SY(2) + 4, SX(j + 2) + 4, SY(0) - 16, 'lr d');
      E.forEach((r, i) => r.forEach((e, j) => { h += K.t(SX(j), SY(i) + 5, N(e), j > 2 ? 's tm' : 's'); }));
      h += K.pl([[SX(0) - 16, SY(0) - 16], [SX(0) - 22, SY(0) - 16], [SX(0) - 22, SY(2) + 12], [SX(0) - 16, SY(2) + 12]]) + K.pl([[SX(2) + 16, SY(0) - 16], [SX(2) + 22, SY(0) - 16], [SX(2) + 22, SY(2) + 12], [SX(2) + 16, SY(2) + 12]]);
      h += K.t(SX(0) + 4, 190, 'bajadas: +', 's to', 'middle') + K.t(SX(0) + 4, 34, 'subidas: −', 's tf', 'middle') + K.t(SX(3) + 23, 158, 'copia', 's tm');
      const B = [0, 1, 2].reduce((s, j) => s + baja(p.A, j), 0), S = [0, 1, 2].reduce((s, j) => s + sube(p.A, j), 0);
      return h + K.f(f, K.t(170, 226, `det A = ${N(B)} − ${T(S)} = ${N(det3(p.A))}`, 's ta'));
    },
    aviso(q, p) {
      const ms = SM(p), i = ms.findIndex((m, k) => q[k][0] !== m), y = q[i][0], j = i % 3, b = i < 3;
      if (ms.includes(y)) return `${y} es el producto de otra diagonal: sigue la ${b ? 'bajada' : 'subida'} que termina en este lugar.`;
      if (y === N(-Number(ms[i].replace('−', '-')))) return 'El producto va con su propio signo; el menos de las subidas se pone al final, al restar.';
      return `Esta ${b ? 'bajada' : 'subida'} empieza en la ${b ? 'fila 1' : 'fila 3'}, columna ${j + 1}, y pasa en diagonal por las tres filas: multiplica esas tres entradas.`;
    },
    bien: p => p.ok,
  });

  // -------------------------------------------------- diagonal-de-triangular · el determinante de una triangular es su diagonal
  // Matriz triangular con c en la diagonal; la escena dibuja la caja recta que tiene el mismo volumen.
  //   v { c }   params { A (null en c), min, max, ini, meta, ok }
  const DO = [110, 196], DU = 15;
  const DA = (p, c) => p.A.map(f => f.map(x => (x == null ? c : x)));
  const DS = p => { for (let c = p.min; c <= p.max; c++) if (det3(DA(p, c)) === p.meta) return c; return null; };
  XG.figura('diagonal-de-triangular', {
    ini: p => ({ c: p.ini }),
    manijas: p => [{ k: 'c', min: p.min, max: p.max, paso: 1, et: 'c: abajo a la derecha de A' }],
    ok: (v, p) => det3(DA(p, v.c)) === p.meta, sol: p => ({ c: DS(p) }),
    texto: p => `$c = ${DS(p)}$: $\\det A = ${DA(p, DS(p)).map((f, i) => TX(f[i])).join(' \\cdot ')} = ${p.meta}$`, alto: () => 262, pie: 'Desliza c.',
    dib(v, K, p, f) {
      const A = DA(p, v.c), dg = A.map((r, i) => r[i]), d = det3(A), bien = d === p.meta;
      let h = K.t(250, 22, 'A =', 's', 'end') + K.r(252, 32, 24, 18, 'fa', 5) + K.r(278, 52, 24, 18, 'fa', 5) + K.r(304, 72, 24, 18, 'fa', 5)
        + mat(K, 290, 61, A.map(r => r.map(N)), 's', 26, 20);
      if (v.c) h += K.caja(DO, DU, Math.abs(dg[0]), Math.abs(dg[1]), Math.abs(dg[2]), f >= 1 ? (bien ? 'fo' : 'ff') : 'fa');
      else h += K.caja(DO, DU, Math.abs(dg[0]), Math.abs(dg[1]), 0, 'ff');
      const [ea, eb, ec] = dg.map(Math.abs), I = (x, y, z) => K.iso(DO, DU, x, y, z);
      h += K.t(...I(ea / 2 + 0.3, 0, -0.9), `|${N(dg[0])}|`, 's tm', 'start') + K.t(...I(0, eb / 2 + 0.3, -0.9), `|${N(dg[1])}|`, 's tm', 'end') + K.t(I(0, eb, ec / 2)[0] - 8, I(0, eb, ec / 2)[1] + 4, `|${N(dg[2])}|`, 's tm', 'end');
      return h + K.t(250, 130, 'lados: la diagonal', 's tm') + K.f(f, K.t(250, 156, `det A = ${dg.map(T).join('·')}`, 's', 'middle') + K.t(250, 178, `= ${N(d)}`, bien ? 'to' : 'tf'));
    },
    lee: (v, p) => { const A = DA(p, v.c); return `$\\det A = ${A.map((f, i) => TX(f[i])).join(' \\cdot ')} = ${det3(A)}$`; },
    aviso(v, p) {
      const d = det3(DA(p, v.c));
      if (d === 0) return 'Con un cero en la diagonal el producto da 0: la caja queda aplastada.';
      if (d === -p.meta) return `El tamaño está bien, pero el signo no: el producto da ${N(d)}. Mira cuántos números negativos quedan en la diagonal.`;
      return `Con c = ${N(v.c)} el producto de la diagonal es ${N(d)}, no ${N(p.meta)}. Las entradas de fuera de la diagonal no cuentan.`;
    },
    bien: p => p.ok || 'El producto de la diagonal da justo el determinante pedido.',
  });

  // ------------------------------------------- lote-por-coordenadas · área de un polígono: ½ de la suma de det(Pᵢ, Pᵢ₊₁)
  // Tres esquinas fijas y la cuarta se arrastra; al comprobar, la escena parte el lote en triángulos desde el origen.
  //   v { x, y }   params { P: [tres esquinas, en orden contrario a las agujas], meta, ini, u: unidad, ok }
  const LO = [36, 206], LU = 26, LP = (x, y) => [LO[0] + x * LU, LO[1] - y * LU];
  const LV = (v, p) => [...p.P, [v.x, v.y]];
  const LD = (v, p) => { const Q = LV(v, p); return Q.reduce((s, a, i) => s + a[0] * Q[(i + 1) % 4][1] - a[1] * Q[(i + 1) % 4][0], 0); };
  const LS = p => { for (let y = 0; y <= 7; y++) for (let x = 0; x <= 8; x++) if (LD({ x, y }, p) === 2 * p.meta && !(x === p.ini[0] && y === p.ini[1])) return { x, y }; return null; };
  XG.figura('lote-por-coordenadas', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: 0, max: [8, 7], paso: 1, rot: () => 'D', en: v => LP(v.x, v.y), de: (x, y) => [(x - LO[0]) / LU, (LO[1] - y) / LU] }],
    ok: (v, p) => LD(v, p) === 2 * p.meta, sol: LS,
    texto: p => { const s = LS(p); return `$D = (${s.x}, ${s.y})$: $\\tfrac{1}{2}(${LV(s, p).map((a, i, Q) => a[0] * Q[(i + 1) % 4][1] - a[1] * Q[(i + 1) % 4][0]).join(' + ')}) = ${p.meta}$`.replace(/\+ -/g, '- '); },
    alto: () => 228, pie: 'Arrastra la esquina D.',
    dib(v, K, p, f) {
      const Q = LV(v, p), d = LD(v, p), bien = d === 2 * p.meta, ds = Q.map((a, i) => a[0] * Q[(i + 1) % 4][1] - a[1] * Q[(i + 1) % 4][0]);
      let h = rejilla(K, LO, LU, 0, 8, 0, 7) + K.p(Q.map(q => LP(...q)), f >= 1 ? (bien ? 'fo' : 'ff') : 'fa');
      ['A', 'B', 'C'].forEach((n, i) => { h += K.c(...LP(...p.P[i]), 4, 'fk') + K.t(LP(...p.P[i])[0] + 8, LP(...p.P[i])[1] - 6, `${n} (${p.P[i].join(', ')})`, 's tm', 'start'); });
      if (f > 0) Q.forEach((a, i) => { const b = Q[(i + 1) % 4]; if (ds[i]) h += K.f(f * 0.8, K.l(...LO, ...LP(...a), 'lm d')); h += K.f(f, K.t(...LP((a[0] + b[0]) / 3, (a[1] + b[1]) / 3), ds[i] ? N(ds[i]) : '', 's ta')); });
      h += K.t(332, 20, `D = (${v.x}, ${v.y})`, 's', 'end');
      return h + K.f(f, K.t(332, 40, `½(${ds.map(N).join(' + ')})`.replace(/\+ −/g, '− '), 's tm', 'end') + K.t(332, 60, `= ${N(d / 2)}`, bien ? 'to' : 'tf', 'end'));
    },
    lee: (v, p) => { const Q = LV(v, p); return `$\\text{área} = \\tfrac{1}{2}(${Q.map((a, i) => `\\det(${['A', 'B', 'C', 'D'][i]}, ${['B', 'C', 'D', 'A'][i]})`).join(' + ')}) = ${LD(v, p) / 2}$`; },
    aviso(v, p) {
      const a = LD(v, p) / 2;
      if (2 * a === p.meta) return `La suma de los determinantes da ${p.meta}, pero el área es la mitad de esa suma: ${N(a)}.`;
      if (a <= 0) return `Con D = (${v.x}, ${v.y}) la suma da ${N(a)}: el lote se cruza o da la vuelta al revés. Recorre A, B, C, D sin cruzar.`;
      return `Con D = (${v.x}, ${v.y}), ½ de la suma de det(Pᵢ, Pᵢ₊₁) da ${N(a)}, no ${p.meta}. ${a < p.meta ? 'Falta' : 'Sobra'} área.`;
    },
    bien: p => p.ok || 'La mitad de la suma de los determinantes da justo el área pedida.',
  });

  // ---------------------------------------------------- sello-escala-area · en movimiento: el área se multiplica por |det T|
  // Cada tiro: un diseño de área conocida y una matriz T. Se fija el área de la imagen y al soltar la figura se transforma.
  //   params { tiros: [{ q, M (2 × 2), fig: [[x, y], …], area (del diseño), r, k (cuenta TeX), e? }] }
  const ap = (M, [x, y]) => [M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y];
  XG.tiros('sello-escala-area', {
    perilla: () => ({ et: 'Área de la imagen', min: 0, max: 40, cara: v => (v ? String(v) : ''), lee: v => (v ? `${v} u²` : 'sin área') }), meta: t => t.r, alto: 186, ms: 1600,
    dib(t, v, K, p, f) {
      const im = t.fig.map(q => ap(t.M, q)), todo = [...t.fig, ...im, [0, 0]];
      const xs = todo.map(q => q[0]), ys = todo.map(q => q[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      const u = Math.min(190 / (x1 - x0 || 1), 150 / (y1 - y0 || 1), 26), O = [140 - x0 * u + (190 - (x1 - x0) * u) / 2, 172 + y0 * u - (150 - (y1 - y0) * u) / 2], P = ([x, y]) => [O[0] + x * u, O[1] - y * u];
      let h = K.t(14, 28, 'T =', 's', 'start') + mat(K, 70, 24, t.M, 's') + K.t(14, 66, `diseño: ${t.area} u²`, 's tm', 'start');
      h += K.l(O[0] - 6, O[1], O[0] + 6, O[1], 'lm') + K.l(O[0], O[1] - 6, O[0], O[1] + 6, 'lm');
      const s = v == null ? 0 : Math.min(1, f * 1.15), fig = t.fig.map((q, i) => [q[0] + (im[i][0] - q[0]) * s, q[1] + (im[i][1] - q[1]) * s]);
      h += K.p(t.fig.map(P), 'fn') + K.pl([...t.fig, t.fig[0]].map(P), 'lm d');
      if (v != null && v > 0) {
        const bien = v === t.r;
        h += K.p(fig.map(P), f >= 1 ? (bien ? 'fo' : 'ff') : 'fa') + K.r(14, 88, 106, 30, 'fc', 8) + K.t(67, 108, `dices: ${v} u²`, 's');
        if (f >= 1) h += K.t(67, 140, `mide ${t.r} u²`, bien ? 's to' : 's tf');
      } else h += K.p(t.fig.map(P), 'fa');
      return h;
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Te pasaste: el área del diseño se multiplica por |det T|, ni más ni menos.' : 'Te quedaste corto: el área del diseño se multiplica por |det T|.'),
    cuenta: t => `$${t.k}$`, pie: 'Estira hasta el área y suelta.',
  });
})();
