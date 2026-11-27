// Geometría Vectorial · juegos de la lección geo-1 «Sistemas 2×2 y 3×3 y su geometría» (spec 2026-11-27-curso-geometria-vectorial).
// Una ecuación lineal es una recta (con tres incógnitas, un plano) y resolver el sistema es hallar el punto común. Armazones de
// figura-kit.js (XG.figura, XG.rotula, XG.tiros) con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const sg = n => String(n).replace('-', '−');
  const r1 = x => Math.round(x * 10) / 10;
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  // Ecuación con sus coeficientes: eq([4, 3], 24) → «4x + 3y = 24» (texto de la escena); con tex, «4x + 3y = 24» para KaTeX.
  const eq = (cs, c, vs = 'xyz', tex = false) => {
    const m = tex ? '-' : '−';
    let s = '';
    cs.forEach((a, i) => {
      if (!a) return;
      const t = `${Math.abs(a) === 1 ? '' : Math.abs(a)}${vs[i]}`;
      s += s ? `${a < 0 ? ` ${m} ` : ' + '}${t}` : `${a < 0 ? m : ''}${t}`;
    });
    return `${s || '0'} = ${tex ? c : sg(c)}`;
  };
  const eqT = (cs, c, vs) => eq(cs, c, vs, true);
  // Plano cartesiano: B = { x0, x1, y0, y1 } en unidades; el origen cae en (ox, oy) y una unidad mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  function rejilla(K, P) {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    const yx = P.y0 < 0 ? P.Y(0) + 13 : P.Y(P.y0) + 13, xy = P.x0 < 0 ? P.X(0) - 5 : P.X(P.x0) - 5;
    for (let x = P.x0; x <= P.x1; x++) if (x && x % 2 === 0) h += K.t(P.X(x), yx, sg(x), 's tm');
    for (let y = P.y0; y <= P.y1; y++) if (y && y % 2 === 0) h += K.t(xy, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h + K.t(P.X(P.x1) + 4, P.Y(0) - 5, 'x', 's tm', 'start') + K.t(P.X(0) + 6, P.Y(P.y1) + 4, 'y', 's tm', 'start');
  }
  // Trozo de la recta ax + by = c que cabe en el cuadro del plano (en unidades), o null.
  function trozo(a, b, c, P) {
    const q = [], mete = (x, y) => { if (x >= P.x0 - 1e-9 && x <= P.x1 + 1e-9 && y >= P.y0 - 1e-9 && y <= P.y1 + 1e-9) q.push([x, y]); };
    if (Math.abs(b) > 1e-12) { mete(P.x0, (c - a * P.x0) / b); mete(P.x1, (c - a * P.x1) / b); }
    if (Math.abs(a) > 1e-12) { mete((c - b * P.y0) / a, P.y0); mete((c - b * P.y1) / a, P.y1); }
    let mejor = null, d = 0;
    q.forEach(u => q.forEach(w => { const e = Math.hypot(u[0] - w[0], u[1] - w[1]); if (e > d + 1e-9) { d = e; mejor = [u, w]; } }));
    return mejor;
  }
  const recta = (K, P, a, b, c, cls) => { const s = trozo(a, b, c, P); return s ? K.l(P.X(s[0][0]), P.Y(s[0][1]), P.X(s[1][0]), P.Y(s[1][1]), cls) : ''; };
  // Cruce de a1x + b1y = c1 con a2x + b2y = c2: [x, y], o null si son paralelas o la misma.
  const cruce = ([a, b, c], [d, e, f]) => { const D = a * e - b * d; return D ? [(c * e - b * f) / D, (a * f - c * d) / D] : null; };

  // ------------------------------------------------------------------- una ecuación es una recta: sus cortes con los ejes
  // Se arrastra un punto por cada eje hasta donde la recta ax + by = c los corta.  v { px, py }
  //   params { a, b, c, mira: [aviso del corte en x, aviso del corte en y], trampa (cortes al revés), ok }
  const PQ = plano({ x0: 0, x1: 10, y0: 0, y1: 8 }, 34, 232, 26);
  XG.figura('corta-ejes', {
    ini: () => ({ px: 1, py: 1 }),
    manijas: () => [
      { k: 'px', min: 0, max: 10, paso: 1, rot: () => 'x', en: v => [PQ.X(v.px), PQ.Y(0)], de: x => (x - PQ.ox) / PQ.u },
      { k: 'py', min: 0, max: 8, paso: 1, rot: () => 'y', en: v => [PQ.X(0), PQ.Y(v.py)], de: (x, y) => (PQ.oy - y) / PQ.u }],
    ok: (v, p) => v.px === p.c / p.a && v.py === p.c / p.b,
    sol: p => ({ px: p.c / p.a, py: p.c / p.b }),
    texto: p => `$(${p.c / p.a}, 0)$ y $(0, ${p.c / p.b})$`,
    alto: () => 250, pie: 'Arrastra la x por su eje y la y por el suyo.',
    dib(v, K, p, f) {
      let h = rejilla(K, PQ) + K.t(332, 16, eq([p.a, p.b], p.c), 'ta', 'end');
      if (v.px > 0.05 && v.py > 0.05) h += K.l(PQ.X(v.px), PQ.Y(0), PQ.X(0), PQ.Y(v.py), 'lm d');
      const X = p.c / p.a, Y = p.c / p.b, va = p.a * Math.round(v.px), vb = p.b * Math.round(v.py);
      return h + K.f(f, recta(K, PQ, p.a, p.b, p.c, 'la gr')
        + K.t(332, 36, `${p.a}·${Math.round(v.px)} + ${p.b}·0 = ${va} ${va === p.c ? '✓' : '✗'}`, `s ${va === p.c ? 'to' : 'tf'}`, 'end')
        + K.t(332, 54, `${p.a}·0 + ${p.b}·${Math.round(v.py)} = ${vb} ${vb === p.c ? '✓' : '✗'}`, `s ${vb === p.c ? 'to' : 'tf'}`, 'end')
        + K.c(PQ.X(X), PQ.Y(0), 5, 'fA') + K.c(PQ.X(0), PQ.Y(Y), 5, 'fA'));
    },
    lee: (v, p) => `$${p.a} \\cdot ${v.px} + ${p.b} \\cdot 0 = ${p.a * v.px}$ y $${p.a} \\cdot 0 + ${p.b} \\cdot ${v.py} = ${p.b * v.py}$`,
    aviso: (v, p) => (v.px === p.c / p.b && v.py === p.c / p.a ? p.trampa : v.px !== p.c / p.a ? p.mira[0] : p.mira[1]),
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------- tres casos: se gira la segunda recta alrededor de un punto
  // La recta fija L y otra que pasa por A y por B (B se arrastra). caso 'paralela' (A fuera de L: ninguna solución) o
  // 'misma' (A sobre L: infinitas).  v { bx, by }   params { L: [a, b, c], A: [x, y], B0, B, caso, mira, pega, ok }
  const PF = plano({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 126, 24);
  const dos = (v, p) => { const dx = v.bx - p.A[0], dy = v.by - p.A[1]; if (!dx && !dy) return null; const g = gcd(dx, dy), s = dy < 0 || (!dy && dx > 0) ? -1 : 1, a = s * dy / g, b = -s * dx / g; return [a, b, a * p.A[0] + b * p.A[1]]; };
  XG.figura('gira-segunda-recta', {
    ini: p => ({ bx: p.B0[0], by: p.B0[1] }),
    manijas: () => [{ k: ['bx', 'by'], min: [-6, -4], max: [6, 4], paso: 1, rot: () => 'B', en: v => [PF.X(v.bx), PF.Y(v.by)], de: (x, y) => [(x - PF.ox) / PF.u, (PF.oy - y) / PF.u] }],
    ok: (v, p) => { const r = dos(v, p); return !!r && p.L[0] * r[1] - p.L[1] * r[0] === 0; },
    sol: p => ({ bx: p.B[0], by: p.B[1] }),
    texto: p => { const r = dos({ bx: p.B[0], by: p.B[1] }, p); return `$${eqT(r.slice(0, 2), r[2])}$, que pasa por $(${p.B.join(', ')})$`; },
    alto: () => 244, pie: 'Arrastra B: la segunda recta gira alrededor de A.',
    dib(v, K, p, f) {
      const r = dos(v, p), [a, b, c] = p.L;
      let h = rejilla(K, PF) + recta(K, PF, a, b, c, 'lg gr') + K.t(8, 16, `fija: ${eq([a, b], c)}`, 's tg', 'start');
      if (r) h += recta(K, PF, r[0], r[1], r[2], 'la gr');
      h += K.c(PF.X(p.A[0]), PF.Y(p.A[1]), 5, 'fk') + K.t(PF.X(p.A[0]) + 9, PF.Y(p.A[1]) - 7, 'A', 's', 'start');
      if (!r) return h;
      const z = cruce(p.L, r), misma = !z && a * r[2] === c * r[0] && b * r[2] === c * r[1];
      const dice = z ? `se cortan en (${sg(r1(z[0]))}, ${sg(r1(z[1]))}): una solución` : misma ? 'la misma recta: infinitas soluciones' : 'paralelas: ninguna solución';
      return h + K.f(f, K.t(332, 16, `tuya: ${eq([r[0], r[1]], r[2])}`, 's ta', 'end') + K.t(170, 238, dice, `s ${p.caso === (misma ? 'misma' : z ? 'punto' : 'paralela') ? 'to' : 'tf'}`)
        + (z && Math.abs(z[0]) <= 6 && Math.abs(z[1]) <= 4 ? K.c(PF.X(z[0]), PF.Y(z[1]), 6, 'fF') : ''));
    },
    lee: (v, p) => { const r = dos(v, p); return r ? `Tu recta: $${eqT(r.slice(0, 2), r[2])}$; la fija: $${eqT(p.L.slice(0, 2), p.L[2])}$` : 'A y B coinciden: no queda recta.'; },
    aviso: (v, p) => (dos(v, p) ? p.mira : p.pega),
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------------------------------- el punto común: la solución
  // Dos condiciones de contexto dibujadas como rectas; se arrastra el punto hasta el que cumple las dos.  v { x, y }
  //   params { E: [[a, b, c], [a, b, c]], et: [nombre de cada recta], sol: [x, y], ini, mira: [solo la 1, solo la 2, ninguna], ok }
  const PC = plano({ x0: 0, x1: 10, y0: 0, y1: 8 }, 34, 250, 26);
  const cumple = (E, x, y) => E.map(([a, b, c]) => a * x + b * y === c);
  XG.figura('cruce-de-rectas', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [10, 8], paso: 1, en: v => [PC.X(v.x), PC.Y(v.y)], de: (x, y) => [(x - PC.ox) / PC.u, (PC.oy - y) / PC.u] }],
    ok: (v, p) => v.x === p.sol[0] && v.y === p.sol[1],
    sol: p => ({ x: p.sol[0], y: p.sol[1] }),
    texto: p => `$(${p.sol.join(', ')})$`,
    alto: () => 268, pie: 'Arrastra el punto que brilla.',
    dib(v, K, p, f) {
      const [E1, E2] = p.E, x = Math.round(v.x), y = Math.round(v.y), [c1, c2] = cumple(p.E, x, y);
      let h = rejilla(K, PC) + recta(K, PC, ...E1, 'la gr') + recta(K, PC, ...E2, 'lg gr')
        + K.t(8, 16, `${p.et[0]}: ${eq(E1.slice(0, 2), E1[2])}`, 's ta', 'start') + K.t(8, 34, `${p.et[1]}: ${eq(E2.slice(0, 2), E2[2])}`, 's tg', 'start');
      const va = E1[0] * x + E1[1] * y, vb = E2[0] * x + E2[1] * y;
      return h + K.f(f, K.t(332, 16, `${va} ${c1 ? '✓' : '✗'}`, `s ${c1 ? 'to' : 'tf'}`, 'end') + K.t(332, 34, `${vb} ${c2 ? '✓' : '✗'}`, `s ${c2 ? 'to' : 'tf'}`, 'end')
        + K.c(PC.X(p.sol[0]), PC.Y(p.sol[1]), 7, 'fo'));
    },
    lee: (v, p) => p.E.map(([a, b, c]) => `$${a} \\cdot ${v.x} + ${b} \\cdot ${v.y} = ${a * v.x + b * v.y}$`).join(' y '),
    aviso: (v, p) => { const [c1, c2] = cumple(p.E, v.x, v.y); return c1 ? p.mira[0] : c2 ? p.mira[1] : p.mira[2]; },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------- los casos por la proporción de los coeficientes
  // Tres sistemas en renglones; a cada uno se le arrastra cuántas soluciones tiene. Al comprobar salen las razones.
  //   params { sis: [[[a, b, c], [a, b, c]] × 3], metas, fichas, mira, trampas, ok }
  const yS = i => 38 + i * 70;
  const razon = ([a, b, c], [d, e, f]) => {
    const ab = a * e === b * d, ac = a * f === c * d;
    return `${sg(a)}/${sg(d)} ${ab ? '=' : '≠'} ${sg(b)}/${sg(e)}${ab ? ` ${ac ? '=' : '≠'} ${sg(c)}/${sg(f)}` : ''}`;
  };
  XG.rotula('coeficientes-proporcion', {
    slots: p => p.sis.map((_, i) => ({ x: 272, y: yS(i), w: 112, h: 40 })),
    fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 218,
    fondo: (K, p, f) => p.sis.map(([e1, e2], i) => K.t(8, yS(i) - 6, eq(e1.slice(0, 2), e1[2]), '', 'start') + K.t(8, yS(i) + 14, eq(e2.slice(0, 2), e2[2]), '', 'start')
      + K.f(f, K.t(8, yS(i) + 32, razon(e1, e2), 's tm', 'start')) + (i ? K.l(8, yS(i) - 32, 332, yS(i) - 32, 'ls') : '')).join(''),
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ---------------------------------------------------------------------- eliminación: un múltiplo que borra una incógnita
  // Se elige k con la regla: la ecuación nueva E[t] + k·E[s] es otra recta que gira alrededor del punto común.  v { k }
  //   params { E: [[a, b, c], [a, b, c]], s: la que se multiplica, elim: 'x' | 'y', P: [x, y], k0, mira, trampa, ok }
  const PM = plano({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 126, 22);
  const nueva = (p, k) => { const A = p.E[1 - p.s], B = p.E[p.s]; return A.map((a, i) => a + k * B[i]); };
  const kSol = p => { const i = p.elim === 'x' ? 0 : 1; return -p.E[1 - p.s][i] / p.E[p.s][i]; };
  const nom = p => [`E${p.s === 0 ? '₂' : '₁'}`, `E${p.s === 0 ? '₁' : '₂'}`];
  XG.figura('multiplo-elimina', {
    ini: p => ({ k: p.k0 }),
    manijas: p => [{ k: 'k', min: -5, max: 5, paso: 1, et: `k: cuántas veces ${nom(p)[1]} se suma a ${nom(p)[0]}` }],
    ok: (v, p) => nueva(p, v.k)[p.elim === 'x' ? 0 : 1] === 0,
    sol: p => ({ k: kSol(p) }),
    texto: p => { const r = nueva(p, kSol(p)); return `$k = ${kSol(p)}$: $${eqT(r.slice(0, 2), r[2])}$`; },
    alto: () => 270,
    dib(v, K, p, f) {
      const [E1, E2] = p.E, k = Math.round(v.k * 1000) / 1000, r = nueva(p, k), [n0, n1] = nom(p);
      let h = rejilla(K, PM) + recta(K, PM, ...E1, 'lg') + recta(K, PM, ...E2, 'la')
        + K.t(8, 16, `E₁: ${eq(E1.slice(0, 2), E1[2])}`, 's tg', 'start') + K.t(332, 16, `E₂: ${eq(E2.slice(0, 2), E2[2])}`, 's ta', 'end');
      if (Math.abs(r[0]) > 1e-9 || Math.abs(r[1]) > 1e-9) h += recta(K, PM, ...r, 'lf gr');
      h += K.c(PM.X(p.P[0]), PM.Y(p.P[1]), 5, 'fk');
      const kr = Math.round(v.k), rr = nueva(p, kr), i = p.elim === 'x' ? 0 : 1, bien = rr[i] === 0;
      return h + K.f(f, K.r(70, 30, 200, 26, 'fc', 6) + K.t(170, 48, `${n0} + ${sg(kr)}·${n1}:  ${eq(rr.slice(0, 2), rr[2])}`, `s ${bien ? 'to' : 'tf'}`));
    },
    lee: (v, p) => { const r = nueva(p, v.k), [n0, n1] = nom(p); return `$${n0} + (${v.k}) \\cdot ${n1}$: $${eqT(r.slice(0, 2), r[2])}$`; },
    aviso: (v, p) => { const r = nueva(p, v.k), i = p.elim === 'x' ? 0 : 1; return r[1 - i] === 0 ? p.trampa : `${p.mira} Con k = ${sg(v.k)}, a la ${p.elim} le queda ${sg(r[i])}.`; },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------------- sustitución hacia atrás en un escalonado 3×3
  // Renglones de un sistema escalonado; el valor que despeja cada renglón se arrastra a su lado, de abajo hacia arriba.
  //   params { E: [[a, b, c, d] × 3], metas: [z, y, x], fichas, subs: [cuenta de cada renglón], mira, trampas, ok }
  const yE = i => 42 + i * 62, VAR = ['x', 'y', 'z'];
  XG.rotula('escalon-regresivo', {
    slots: p => [2, 1, 0].map(i => ({ x: 270, y: yE(i), w: 84, h: 40 })),
    fichas: p => p.fichas, metas: p => p.metas, texto: p => `$z = ${p.metas[0]}$, $y = ${p.metas[1]}$, $x = ${p.metas[2]}$`.replace(/−/g, '-'), alto: () => 202,
    fondo: (K, p, f) => p.E.map((e, i) => K.t(8, yE(i) + 5, eq(e.slice(0, 3), e[3]), '', 'start') + K.t(222, yE(i) + 5, `${VAR[i]} =`, 'ta', 'end')
      + K.f(f, K.t(8, yE(i) + 25, p.subs[i], 's tm', 'start'))).join('') + K.t(8, 14, 'se resuelve de abajo hacia arriba', 's tm', 'start')
      + K.f(f, K.ar(328, yE(2) + 10, 328, yE(0) - 10, 'lm')),
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------------- tres planos: el tercero vale d
  // Vista de canto: los planos ax + by + az = d se ven como rectas en el corte (S = x + z, y). Los dos primeros comparten
  // una recta, que de canto es un punto. Se elige d con la regla; al comprobar entra el tercer plano.  v { d }
  //   params { pl: [[a, b, d], [a, b, d]], t3: [a, b], d, d0, pt: [x, y, z] en la recta común, mira, ok }
  const PV = { x0: -2, x1: 10, y0: -2, y1: 6, X: s => 82 + s * 22, Y: t => 172 - t * 22 };
  const pla = ([a, b], d, vs = 'xyz') => eq([a, b, a], d, vs);
  XG.figura('tercer-plano', {
    ini: p => ({ d: p.d0 }),
    manijas: () => [{ k: 'd', min: 0, max: 16, paso: 1, et: 'd, el término del tercer plano' }],
    ok: (v, p) => v.d === p.d,
    sol: p => ({ d: p.d }),
    texto: p => `$d = ${p.d}$: $${pla(p.t3, p.d).replace(/−/g, '-')}$`,
    alto: () => 270,
    dib(v, K, p, f) {
      const d = Math.round(v.d), [A, B] = p.pl, C = [...p.t3, d], z = cruce(A, B);
      let h = K.t(8, 16, pla(A, A[2]), 's tg', 'start') + K.t(170, 16, pla(B, B[2]), 's ta') + K.t(332, 16, pla(p.t3, d), 's tf', 'end')
        + K.t(170, 34, 'vista de canto: cada plano se ve como una recta', 's tm')
        + recta(K, PV, ...A, 'lg gr') + recta(K, PV, ...B, 'la gr') + K.c(PV.X(z[0]), PV.Y(z[1]), 5, 'fk') + K.t(PV.X(z[0]) + 10, PV.Y(z[1]) + 4, 'recta común', 's', 'start');
      const pa = cruce(A, C), pb = cruce(B, C), ok = d === p.d;
      return h + K.f(f, recta(K, PV, ...C, 'lf gr')
        + (!ok && pa && pb ? K.p([[PV.X(z[0]), PV.Y(z[1])], [PV.X(pa[0]), PV.Y(pa[1])], [PV.X(pb[0]), PV.Y(pb[1])]], 'ff') : '')
        + K.t(170, 232, ok ? 'los tres planos comparten la recta: infinitas soluciones' : 'forman un túnel: ningún punto está en los tres', `s ${ok ? 'to' : 'tf'}`));
    },
    lee: (v, p) => { const [x, y, z] = p.pt, [a, b] = p.t3; return `En $(${x}, ${y}, ${z})$: $${a} \\cdot ${x} + ${b} \\cdot ${y} + ${a} \\cdot ${z} = ${a * x + b * y + a * z}$; tu $d = ${v.d}$`; },
    aviso: (v, p) => `${p.mira} Con d = ${v.d} el tercer plano no pasa por la recta común.`,
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------- en movimiento: repartos con dos condiciones
  // Hay n objetos de dos clases (precios p1 y p2) y el total es T. Se fija cuántos son de la primera clase y al soltar se
  // llenan las barras de cantidad y de dinero.  tiro { q, n, p1, p2, T, r, u1, u2, din, et }
  const W = 300, X0 = 20;
  XG.tiros('lanza-reparto', {
    perilla: t => ({ et: t.et, min: 0, max: t.n, cara: v => v, lee: v => `${v} ${t.u1}` }),
    meta: t => t.r, alto: 170, ms: 1500, pie: 'Fija cuántos son de la primera clase y suelta.',
    dib(t, v, K, p, f) {
      const M = Math.max(t.p1, t.p2) * t.n, xT = X0 + t.T / M * W;
      let h = K.t(X0, 26, `cantidad: ${t.n}`, 's tm', 'start') + K.r(X0, 34, W, 22, 'fc', 4)
        + K.t(X0, 96, 'dinero', 's tm', 'start') + K.r(X0, 104, W, 22, 'fc', 4) + K.l(xT, 96, xT, 134, 'lo gr') + K.t(Math.min(318, Math.max(36, xT)), 150, `${t.T} ${t.din}`, 's to');
      if (v == null) return h;
      const g = Math.min(1, f * 1.6), w1 = v / t.n * W, tot = t.p1 * v + t.p2 * (t.n - v), bien = v === t.r;
      h += K.r(X0, 34, w1, 22, 'fa', 4) + K.r(X0 + w1, 34, W - w1, 22, 'fg', 4)
        + K.t(X0 + 4, 74, `${v} ${t.u1}`, 's ta', 'start') + K.t(X0 + W - 4, 74, `${t.n - v} ${t.u2}`, 's tg', 'end');
      const wa = t.p1 * v / M * W * g, wb = t.p2 * (t.n - v) / M * W * Math.max(0, Math.min(1, f * 1.6 - 0.6));
      h += K.r(X0, 104, wa, 22, f >= 1 ? (bien ? 'fo' : 'ff') : 'fa', 4) + K.r(X0 + t.p1 * v / M * W, 104, wb, 22, f >= 1 ? (bien ? 'fo' : 'ff') : 'fg', 4);
      return h + K.f(f * 3 - 2, K.t(332, 96, `${tot} ${t.din}`, `s ${bien ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => { const tot = t.p1 * v + t.p2 * (t.n - v); return tot > t.T ? `Con ${v} ${t.u1} se juntan ${tot} ${t.din}: se pasa de ${t.T}.` : `Con ${v} ${t.u1} se juntan ${tot} ${t.din}: faltan ${t.T - tot}.`; },
    cuenta: t => `$${t.p1}x + ${t.p2}(${t.n} - x) = ${t.T} \\;\\Rightarrow\\; x = ${t.r}$`,
  });
})();
