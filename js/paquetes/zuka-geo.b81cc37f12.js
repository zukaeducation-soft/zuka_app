// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/gva-escena-1.js
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
;
//#archivo js/games/gva-escena-2.js
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
;
//#archivo js/games/gva-escena-3.js
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
;
//#archivo js/games/gva-escena-4.js
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
;
//#archivo js/games/gva-escena-5.js
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
;
//#archivo js/games/gva-escena-6.js
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
;
//#archivo js/games/gva-escena-7.js
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
;
//#archivo js/games/gva-escena-8.js
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
;
//#archivo js/games/gva-escena-9.js
// Geometría Vectorial · juegos de la lección geo-9 «Vectores libres y sus operaciones» (spec 2026-11-27-curso-geometria-vectorial).
// Un vector es una flecha con magnitud, dirección y sentido que se puede trasladar; se suma encadenando cola con punta, se resta
// yendo de la punta de v a la de u y se estira con un escalar. Sin coordenadas (son de geo-11): la cuadrícula solo sirve de papel.
// Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const sg = n => String(n).replace('-', '−');
  const R = Math.PI / 180;
  // Papel cuadriculado: B = { x0, x1, y0, y1 } en cuadros; el cuadro (0, 0) cae en (ox, oy) y un cuadro mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const suma = (...vs) => vs.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);
  const por = (k, v) => [k * v[0], k * v[1]];
  const igual = (a, b) => a[0] === b[0] && a[1] === b[1];
  // Rótulo de la flecha de A a B (en píxeles), a un lado de su mitad.
  const rot = (K, A, B, s, cls, lado = 1, d = 13) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * d, (A[1] + B[1]) / 2 - lado * dx / L * d + 4, s, `s ${cls}`);
  };
  const flecha = (K, A, B, cls, s, tcls, lado) => K.ar(A[0], A[1], B[0], B[1], cls) + (s ? rot(K, A, B, s, tcls, lado) : '');
  const tramo = (K, A, B, f, cls) => (f > 0.01 ? K.ar(A[0], A[1], A[0] + (B[0] - A[0]) * Math.min(1, f), A[1] + (B[1] - A[1]) * Math.min(1, f), cls) : '');

  // ------------------------------------------------------------------ magnitud y dirección: la flecha con su rumbo
  // Desde A se arrastra la punta: gira de 15° en 15° y crece de cuadro en cuadro.  v { g, m }
  //   params { g, m, ini: { g, m }, uni, mira: { largo, horario, opuesto, otro }, ok }
  const RA = { x: 170, y: 132, u: 22 };
  const punta = v => [RA.x + v.m * RA.u * Math.cos(v.g * R), RA.y - v.m * RA.u * Math.sin(v.g * R)];
  XG.figura('rumbo-antihorario', {
    ini: p => ({ ...p.ini }),
    manijas: () => [{ k: ['g', 'm'], min: [0, 1], max: [345, 5], paso: [15, 1], en: v => punta(v),
      de: (x, y) => { let g = (Math.atan2(RA.y - y, x - RA.x) / R + 360) % 360; if (g > 352.5) g = 0; return [g, Math.hypot(x - RA.x, y - RA.y) / RA.u]; } }],
    ok: (v, p) => v.g === p.g && v.m === p.m,
    sol: p => ({ g: p.g, m: p.m }),
    texto: p => `magnitud ${p.m} ${p.uni} y dirección $${p.g}^{\\circ}$`,
    alto: () => 264, pie: 'Arrastra la punta: gira y se alarga.',
    dib(v, K, p, f) {
      let h = '';
      for (let k = 1; k <= 5; k++) h += K.arc(RA.x, RA.y, k * RA.u, 0, 360, 'ls');
      for (let g = 0; g < 360; g += 30) { const a = K.at(RA.x, RA.y, 5 * RA.u - 4, g), b = K.at(RA.x, RA.y, 5 * RA.u + 4, g); h += K.l(a[0], a[1], b[0], b[1], 'lm'); }
      const r5 = 5 * RA.u;
      h += K.t(RA.x + r5 + 8, RA.y + 4, '0°', 's tm', 'start') + K.t(RA.x, RA.y - r5 - 8, '90°', 's tm')
        + K.t(RA.x - r5 - 8, RA.y + 4, '180°', 's tm', 'end') + K.t(RA.x, RA.y + r5 + 18, '270°', 's tm');
      h += K.l(RA.x, RA.y, RA.x + 5 * RA.u, RA.y, 'lm d') + K.c(RA.x, RA.y, 4, 'fk') + K.t(RA.x - 8, RA.y + 16, 'A', 's', 'end');
      const T = punta(v), gOk = v.g === p.g, mOk = v.m === p.m;
      h += K.ar(RA.x, RA.y, T[0], T[1], 'la gr');
      return h + K.f(f, K.arc(RA.x, RA.y, 30, 0, v.g * Math.min(1, f * 1.4), gOk ? 'lo gr' : 'lf gr')
        + K.t(8, 18, `dirección: ${v.g}° ${gOk ? '✓' : '✗'}`, `s ${gOk ? 'to' : 'tf'}`, 'start')
        + K.t(332, 18, `magnitud: ${v.m} ${p.uni} ${mOk ? '✓' : '✗'}`, `s ${mOk ? 'to' : 'tf'}`, 'end'));
    },
    lee: v => `$\\operatorname{dir} = ${v.g}^{\\circ}$ y magnitud $${v.m}$`,
    aviso: (v, p) => (v.g === p.g ? p.mira.largo : v.g === (360 - p.g) % 360 ? p.mira.horario : v.g === (p.g + 180) % 360 ? p.mira.opuesto : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------------- igualdad: el mismo vector libre en otro sitio
  // Ocho flechas en cajas; se tocan las iguales a u (misma magnitud, dirección y sentido).
  //   params { u: [dx, dy] en cuadros, fl: [[dx, dy, corrida x, corrida y] × 8], por: [aviso de cada flecha distinta], falta, ok }
  const UF = 13, caja = i => ({ x: 46 + 82 * (i % 4), y: 106 + 76 * Math.floor(i / 4), w: 76, h: 68 });
  const dibFlecha = (K, c, d, o, cls) => { const q = [c[0] + o[0] * UF, c[1] - o[1] * UF], a = [q[0] - d[0] * UF / 2, q[1] + d[1] * UF / 2], b = [q[0] + d[0] * UF / 2, q[1] - d[1] * UF / 2]; return K.ar(a[0], a[1], b[0], b[1], cls); };
  const gemelas = p => p.fl.map((f, i) => (f[0] === p.u[0] && f[1] === p.u[1] ? i : -1)).filter(i => i >= 0);
  XG.marca('flechas-gemelas', {
    sitios: p => p.fl.map((_, i) => caja(i)),
    cara: (K, p, i, on) => { const c = caja(i), [dx, dy, ox = 0, oy = 0] = p.fl[i]; return K.t(c.x - c.w / 2 + 8, c.y - c.h / 2 + 15, i + 1, 's tm', 'start') + dibFlecha(K, [c.x, c.y], [dx, dy], [ox, oy], on ? 'la gr' : 'lg gr'); },
    fondo: (K, p) => K.t(14, 34, p.ref, 's tm', 'start') + dibFlecha(K, [282, 32], p.u, [0, 0], 'lf gr') + K.t(312, 38, 'u', 'tf', 'start'),
    alto: () => 222, nombre: (p, i) => `flecha ${i + 1}`, pie: 'Toca las flechas iguales a u.',
    sol: p => gemelas(p),
    aviso: (on, p) => { const s = gemelas(p), i = on.findIndex((o, k) => o && !s.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => `las flechas ${gemelas(p).map(i => i + 1).join(', ')}`,
  });

  // --------------------------------------------------------------- la regla del triángulo: tramos encadenados
  // Tres tramos sueltos en el papel; se arrastra la F a donde termina el recorrido que sale de O.  v { x, y }
  //   params { O, tr: [[dx, dy] × 3], en: [cola de cada tramo suelto], et, ini, mira: { reves, falta, otro }, ok }
  const PT = plano({ x0: 0, x1: 14, y0: 0, y1: 10 }, 16, 240, 22);
  const finTr = p => suma(p.O, ...p.tr);
  XG.figura('encadena-tramos', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [14, 10], paso: 1, rot: () => 'F', en: v => [PT.X(v.x), PT.Y(v.y)], de: (x, y) => [(x - PT.ox) / PT.u, (PT.oy - y) / PT.u] }],
    ok: (v, p) => igual([v.x, v.y], finTr(p)),
    sol: p => { const e = finTr(p); return { x: e[0], y: e[1] }; },
    texto: p => `F queda donde termina $\\vec ${p.et[0]} + \\vec ${p.et[1]} + \\vec ${p.et[2]}$ dibujado desde O`,
    alto: () => 252, pie: 'Arrastra la F hasta el final del recorrido.',
    dib(v, K, p, f) {
      let h = papel(K, PT);
      p.tr.forEach((t, i) => { const A = P2(PT, p.en[i]), B = P2(PT, suma(p.en[i], t)); h += flecha(K, A, B, 'lg gr', p.et[i], 'tg'); });
      const O = P2(PT, p.O), F = [PT.X(v.x), PT.Y(v.y)], ok = igual([v.x, v.y], finTr(p));
      h += K.c(O[0], O[1], 5, 'fk') + K.t(O[0] - 8, O[1] + 16, 'O', 's', 'end');
      if (v.x !== p.O[0] || v.y !== p.O[1]) h += K.ar(O[0], O[1], F[0], F[1], 'la gr d');
      if (f > 0) {   // la escena recorre los tramos, cola con punta
        let q = p.O;
        p.tr.forEach((t, i) => { const g = Math.max(0, Math.min(1, f * 3.2 - i)); h += tramo(K, P2(PT, q), P2(PT, suma(q, t)), g, 'lf gr'); q = suma(q, t); });
        const E = P2(PT, q);
        h += K.f(f * 3 - 2, K.c(E[0], E[1], 7, ok ? 'fo' : 'ff') + K.t(332, 16, ok ? 'F es el final: ✓' : 'el recorrido acaba en otro punto: ✗', `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => (igual([v.x, v.y], p.O) ? 'F sigue en O: no hay desplazamiento.' : `Tu flecha de O a F: $\\overrightarrow{OF}$; el recorrido es $\\vec ${p.et[0]} + \\vec ${p.et[1]} + \\vec ${p.et[2]}$`),
    aviso(v, p) {
      const F = [v.x, v.y];
      for (let i = 0; i < 3; i++) if (igual(F, suma(p.O, ...p.tr.map((t, k) => (k === i ? por(-1, t) : t))))) return p.mira.reves.replace('#', p.et[i]);
      for (let i = 0; i < 3; i++) if (igual(F, suma(p.O, ...p.tr.filter((_, k) => k !== i)))) return p.mira.falta.replace('#', p.et[i]);
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ el paralelogramo: suma, resta, opuesto y traslado
  // u y v salen de O; cuatro flechas numeradas del paralelogramo se nombran con fichas.
  //   params { metas: [nombre de las flechas 1–4], fichas, mira, trampas, ok }
  const PO = [56, 190], PA = [216, 166], PB = [126, 72], PC = [286, 48];
  const PREG = [[PO, PC], [PB, PA], [PC, PB], [PA, PC]], TAG = [0.3, 0.3, 0.5, 0.5];
  const slotP = i => ({ x: 46 + 82 * i, y: 248, w: 72, h: 36 });
  XG.rotula('diagonales-con-nombre', {
    slots: p => p.metas.map((_, i) => slotP(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 270,
    texto: p => p.metas.map((m, i) => `${i + 1}: $${m.replace(/−/g, '-').replace(/([uv])/g, '\\vec $1')}$`).join(', '),
    fondo(K, p, f) {
      let h = K.p([PO, PA, PC, PB], 'fn') + flecha(K, PO, PA, 'lg gr', 'u', 'tg', -1) + flecha(K, PO, PB, 'lf gr', 'v', 'tf', 1)
        + K.c(PO[0], PO[1], 4, 'fk') + K.t(PO[0] - 8, PO[1] + 14, 'O', 's', 'end');
      PREG.forEach(([A, B], i) => {
        const t = TAG[i], q = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
        h += K.ar(A[0], A[1], B[0], B[1], 'la gr') + K.c(q[0], q[1], 9, 'fc') + K.t(q[0], q[1] + 4, i + 1, 's ta');
        const s = slotP(i);
        h += K.c(s.x - s.w / 2 + 2, s.y - s.h / 2 - 4, 8, 'fc') + K.t(s.x - s.w / 2 + 2, s.y - s.h / 2, i + 1, 's ta');
      });
      return h + K.f(f, K.t(332, 18, 'colas juntas: u − v va de la punta de v a la de u', 's tm', 'end'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ----------------------------------------------------------------------- producto por escalar: estira, encoge o voltea
  // Se elige k con la regla; k·u se dibuja desde la cola de u. Al comprobar se traslada sobre w.  v { k }
  //   params { u, A: cola de u, w, B: cola de w, k, k0, mira: { signo, largo, nulo, otro }, ok }
  const PK = plano({ x0: 0, x1: 17, y0: 0, y1: 8 }, 17, 186, 18);
  XG.figura('factor-de-estiramiento', {
    ini: p => ({ k: p.k0 }),
    manijas: () => [{ k: 'k', min: -2, max: 2, paso: 0.5, et: 'k, el número que multiplica a u' }],
    ok: (v, p) => v.k === p.k,
    sol: p => ({ k: p.k }),
    texto: p => `$k = ${p.k}$: $\\vec w = ${p.k}\\,\\vec u$`,
    alto: () => 250,
    dib(v, K, p, f) {
      const A = P2(PK, p.A), U = P2(PK, suma(p.A, p.u)), B = P2(PK, p.B), W = P2(PK, suma(p.B, p.w)), kU = P2(PK, suma(p.A, por(v.k, p.u))), ok = v.k === p.k;
      let h = papel(K, PK) + flecha(K, B, W, 'lf gr', 'w', 'tf') + K.c(A[0], A[1], 4, 'fk');
      h += v.k ? K.ar(A[0], A[1], kU[0], kU[1], 'la gr') : K.c(A[0], A[1], 7, 'fA');
      h += flecha(K, A, U, 'lg gr', 'u', 'tg', -1) + K.t(8, 16, `${sg(v.k)}·u`, 's ta', 'start');
      if (f > 0) {   // k·u viaja hasta la cola de w
        const g = Math.min(1, f * 1.5), D = [p.B[0] - p.A[0], p.B[1] - p.A[1]], C = P2(PK, [p.A[0] + D[0] * g, p.A[1] + D[1] * g]), E = P2(PK, suma([p.A[0] + D[0] * g, p.A[1] + D[1] * g], por(v.k, p.u)));
        h += v.k ? K.ar(C[0], C[1], E[0], E[1], `${ok ? 'lo' : 'lf'} gr d`) : K.c(C[0], C[1], 6, 'ff');
        h += K.f(f * 3 - 2, K.t(332, 16, ok ? `${sg(v.k)}·u = w ✓` : `${sg(v.k)}·u ≠ w ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$${v.k}\\,\\vec u$`,
    aviso: (v, p) => (v.k === 0 ? p.mira.nulo : v.k === -p.k ? p.mira.signo : Math.sign(v.k) === Math.sign(p.k) ? p.mira.largo : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------------------- resta en contexto: corregir el viento
  // Se arrastra la punta de la velocidad propia P; propia + viento debe dar la flecha punteada del rumbo.  v { x, y }
  //   params { t: rumbo deseado, w: viento, ini, et: [rótulo del rumbo, del viento], mira: { suma, sin, otro }, ok }
  const PV = plano({ x0: -7, x1: 7, y0: -2, y1: 7 }, 170, 214, 20);
  const propia = p => [p.t[0] - p.w[0], p.t[1] - p.w[1]];
  XG.figura('corrige-el-viento', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-7, -2], max: [7, 7], paso: 1, rot: () => 'P', en: v => [PV.X(v.x), PV.Y(v.y)], de: (x, y) => [(x - PV.ox) / PV.u, (PV.oy - y) / PV.u] }],
    ok: (v, p) => igual([v.x, v.y], propia(p)),
    sol: p => { const q = propia(p); return { x: q[0], y: q[1] }; },
    texto: p => 'la velocidad propia es $\\vec t - \\vec w$: va de la punta del viento a la del rumbo',
    alto: () => 262, pie: 'Arrastra la punta P de la velocidad propia.',
    dib(v, K, p, f) {
      const O = P2(PV, [0, 0]), T = P2(PV, p.t), Pp = [PV.X(v.x), PV.Y(v.y)], ok = igual([v.x, v.y], propia(p));
      let h = papel(K, PV) + flecha(K, O, T, 'lm gr d', p.et[0], 'tm', -1);
      const L0 = [24, 32], L1 = [24 + p.w[0] * PV.u, 32 - p.w[1] * PV.u];
      h += K.t(14, 14, p.et[1], 's tg', 'start') + K.ar(L0[0], L0[1], L1[0], L1[1], 'lg gr');
      h += K.c(O[0], O[1], 4, 'fk') + (v.x || v.y ? K.ar(O[0], O[1], Pp[0], Pp[1], 'la gr') : '');
      if (f > 0) {   // el viento empuja desde la punta de la velocidad propia
        const E = P2(PV, suma([v.x, v.y], p.w));
        h += tramo(K, Pp, E, f * 1.5, 'lg gr d') + K.f(f * 3 - 2, K.c(E[0], E[1], 7, ok ? 'fo' : 'ff')
          + K.t(332, 14, ok ? 'propia + viento = rumbo ✓' : 'propia + viento se desvía ✗', `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => (v.x || v.y ? 'Tu velocidad propia $\\vec p$; con el viento queda $\\vec p + \\vec w$' : 'Sin velocidad propia el dron solo se deja llevar.'),
    aviso: (v, p) => { const q = [v.x, v.y]; return igual(q, suma(p.t, p.w)) ? p.mira.suma : igual(q, p.t) ? p.mira.sin : p.mira.otro; },
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------------- la magnitud de una suma con la ley del coseno
  // Dos vectores de magnitudes a y b forman el ángulo θ; se elige la magnitud de la diagonal. Al comprobar, un compás la mide.
  //   params { a, b, th, r, max, uni, et: [nombre de u, de v], mira: { mas, menos }, trampas: { valor: aviso }, ok }
  const geoC = p => { const s = Math.min(24, 250 / (p.a + p.b)), O = [36, 172], A = [O[0] + p.a * s, O[1]], B = [O[0] + p.b * s * Math.cos(p.th * R), O[1] - p.b * s * Math.sin(p.th * R)]; return { s, O, A, B, C: [A[0] + B[0] - O[0], A[1] + B[1] - O[1]] }; };
  XG.figura('diagonal-por-coseno', {
    ini: () => ({ r: 1 }),
    manijas: p => [{ k: 'r', min: 1, max: p.max, paso: 1, et: `magnitud de la suma, en ${p.uni}` }],
    ok: (v, p) => v.r === p.r,
    sol: p => ({ r: p.r }),
    texto: p => `$\\|\\vec u + \\vec v\\| = \\sqrt{${p.a}^2 + ${p.b}^2 + 2 \\cdot ${p.a} \\cdot ${p.b} \\cos ${p.th}^{\\circ}} = ${p.r}$ ${p.uni}`,
    alto: () => 246,
    dib(v, K, p, f) {
      const { s, O, A, B, C } = geoC(p), ok = v.r === p.r, L = Math.hypot(C[0] - O[0], C[1] - O[1]), d = [(C[0] - O[0]) / L, (C[1] - O[1]) / L];
      let h = K.l(A[0], A[1], C[0], C[1], 'lm d') + K.l(B[0], B[1], C[0], C[1], 'lm d') + K.ang(O, A, B, 22, '', 'fn') + K.t(...K.at(O[0], O[1], 36, p.th * 0.72), `${p.th}°`, 's tm')
        + flecha(K, O, A, 'lg gr', `${p.et[0]}: ${p.a}`, 'tg', -1) + K.ar(O[0], O[1], B[0], B[1], 'lf gr') + K.t(B[0] - 6, B[1] - 6, `${p.et[1]}: ${p.b}`, 's tf', 'end')
        + K.ar(O[0], O[1], C[0], C[1], 'la gr') + K.t(C[0] + 10, C[1] - 6, 'suma: ?', 's ta', 'start');
      if (f > 0) {   // el compás abre la medida elegida desde O
        const g = Math.min(1, f * 1.4), M = [O[0] + d[0] * v.r * s * g, O[1] + d[1] * v.r * s * g], a0 = Math.atan2(-d[1], d[0]) / R;
        h += K.arc(O[0], O[1], v.r * s * g, a0 - 14, a0 + 14, `${ok ? 'lo' : 'lf'} gr`) + K.c(M[0], M[1], 5, ok ? 'fo' : 'ff')
          + K.f(f * 3 - 2, K.t(332, 18, ok ? `${v.r} ${p.uni}: llega justo a la punta ✓` : `${v.r} ${p.uni}: ${v.r > p.r ? 'se pasa' : 'no llega'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$${p.a}^2 + ${p.b}^2 + 2 \\cdot ${p.a} \\cdot ${p.b} \\cos ${p.th}^{\\circ} = ${p.r * p.r}$; tu medida al cuadrado: $${v.r * v.r}$`,
    aviso: (v, p) => p.trampas?.[v.r] || (v.r > p.r ? p.mira.mas : p.mira.menos),
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------- en movimiento: la lancha y la corriente del río
  // Se fija la rapidez respecto a la orilla y al soltar la lancha navega una hora; la marca queda donde se dijo.
  //   tiro { q, b: [rapidez propia, ángulo], c: [rapidez de la corriente, ángulo], r, max, S: salida en px, et, cuenta, trampas }
  const SL = 18;
  const vel = ([m, g]) => [m * Math.cos(g * R), m * Math.sin(g * R)];
  XG.tiros('lancha-y-corriente', {
    perilla: t => ({ et: t.et, min: 0, max: t.max, cara: v => v, lee: v => `${v} km/h` }),
    meta: t => t.r, alto: 204, ms: 1700, pie: 'Fija la rapidez respecto a la orilla y suelta.',
    dib(t, v, K, p, f) {
      const S = t.S, B = vel(t.b), C = vel(t.c), Rr = suma(B, C), L = Math.hypot(...Rr), d = [Rr[0] / L, Rr[1] / L];
      const px = q => [S[0] + q[0] * SL, S[1] - q[1] * SL];
      let h = K.l(8, 24, 332, 24, 'lm gr') + K.l(8, 184, 332, 184, 'lm gr') + K.t(332, 18, 'orilla', 's tm', 'end') + K.t(332, 198, 'corriente →', 's tg', 'end');
      // La corriente va cola con punta tras la lancha; si van por la misma recta, un poco más abajo para que se vean las dos.
      const Bp = px(B), dy = Math.abs(B[0] * C[1] - B[1] * C[0]) < 1e-9 ? 10 : 0, C0 = [Bp[0], Bp[1] + dy], C1 = [C0[0] + C[0] * SL, C0[1] - C[1] * SL];
      h += K.ar(S[0], S[1], Bp[0], Bp[1], 'la gr') + rot(K, S, Bp, `${t.b[0]}`, 'ta', 1) + K.ar(C0[0], C0[1], C1[0], C1[1], 'lg gr')
        + rot(K, C0, C1, `${t.c[0]}`, 'tg', dy ? -1 : 1) + K.c(S[0], S[1], 6, 'fk');
      if (v == null) return h;
      const M = px(por(v, d)), ok = v === t.r, g = Math.min(1, f * 1.2), Q = px(por(t.r * g, d));
      h += K.l(M[0] - 7 * d[1], M[1] - 7 * d[0], M[0] + 7 * d[1], M[1] + 7 * d[0], 'lf gr') + K.l(S[0], S[1], Q[0], Q[1], 'lm d') + K.c(Q[0], Q[1], 7, f >= 1 ? (ok ? 'fo' : 'ff') : 'fA');
      return h + K.f(f * 3 - 2, K.t(14, 18, `en 1 hora: ${t.r} km`, `s ${ok ? 'to' : 'tf'}`, 'start'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} km/h la marca queda ${v > t.r ? 'más lejos' : 'antes'} de donde llega la lancha: suma las flechas, no solo los números.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-10.js
// Geometría Vectorial · juegos de la lección geo-10 «Vectores en la geometría euclidiana» (spec 2026-11-27-curso-geometria-vectorial).
// Teoremas de la geometría euclidiana con vectores libres: punto medio, punto que divide en una razón, diagonales que se bisecan,
// segmento de los puntos medios, baricentro, cuarto vértice, combinación de dos lados y colineales. Sin coordenadas (son de geo-11):
// la cuadrícula solo es papel. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  // Papel cuadriculado: B = { x0, x1, y0, y1 } en cuadros; el cuadro (0, 0) cae en (ox, oy) y un cuadro mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const suma = (...vs) => vs.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);
  const por = (k, v) => [k * v[0], k * v[1]];
  const igual = (a, b) => a[0] === b[0] && a[1] === b[1];
  const mcd = (a, b) => (b ? mcd(b, a % b) : Math.abs(a));
  const frac = (k, n) => { const g = mcd(k, n) || 1; return n / g === 1 ? `${k / g}` : `\\tfrac{${k / g}}{${n / g}}`; };
  // Rótulo de la flecha de A a B (en píxeles), a un lado de su mitad.
  const rot = (K, A, B, s, cls, lado = 1, d = 13) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * d, (A[1] + B[1]) / 2 - lado * dx / L * d + 4, s, `s ${cls}`);
  };
  const flecha = (K, A, B, cls, s, tcls, lado) => K.ar(A[0], A[1], B[0], B[1], cls) + (s ? rot(K, A, B, s, tcls, lado) : '');
  const tramo = (K, A, B, f, cls) => (f > 0.01 ? K.ar(A[0], A[1], A[0] + (B[0] - A[0]) * Math.min(1, f), A[1] + (B[1] - A[1]) * Math.min(1, f), cls) : '');
  const linea = (K, A, B, f, cls) => (f > 0.01 ? K.l(A[0], A[1], A[0] + (B[0] - A[0]) * Math.min(1, f), A[1] + (B[1] - A[1]) * Math.min(1, f), cls) : '');
  // Punto con su nombre (dx, dy: dónde va el nombre).
  const pto = (K, Q, s, dx = -9, dy = -8, cls = 'fk') => K.c(Q[0], Q[1], 4, cls) + K.t(Q[0] + dx, Q[1] + dy, s, 's', dx < 0 ? 'end' : 'start');
  const marcaOk = (K, f, ok, si, no) => K.f(f * 3 - 2, K.t(332, 16, ok ? si : no, `s ${ok ? 'to' : 'tf'}`, 'end'));
  // Manija de un punto en el papel P.
  const mano = (P, et) => ({ k: ['x', 'y'], min: [P.x0, P.y0], max: [P.x1, P.y1], paso: 1, rot: () => et, en: v => [P.X(v.x), P.Y(v.y)], de: (x, y) => [(x - P.ox) / P.u, (P.oy - y) / P.u] });
  const PG = plano({ x0: 0, x1: 14, y0: 0, y1: 9 }, 16, 226, 22);   // papel de 14 × 9 cuadros: y de 28 a 226

  // ----------------------------------------------------------------------------- el punto medio es el promedio
  // Las flechas a y b salen de O; se arrastra M hasta donde OM = ½(a + b). Al comprobar se dibuja a + b y se parte en dos.  v { x, y }
  //   params { O, A, B, ini, mira: { suma, extremo, origen, otro }, ok }
  const medio = p => [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2];
  XG.figura('punto-medio-promedio', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [mano(PG, 'M')],
    ok: (v, p) => igual([v.x, v.y], medio(p)),
    sol: p => { const m = medio(p); return { x: m[0], y: m[1] }; },
    texto: () => '$\\overrightarrow{OM} = \\tfrac12(\\vec a + \\vec b)$: M queda justo en la mitad de AB',
    alto: () => 246, pie: 'Arrastra la M.',
    dib(v, K, p, f) {
      const O = P2(PG, p.O), A = P2(PG, p.A), B = P2(PG, p.B), M = [PG.X(v.x), PG.Y(v.y)], S = P2(PG, suma(p.A, p.B, por(-1, p.O))), ok = igual([v.x, v.y], medio(p));
      let h = papel(K, PG) + K.l(A[0], A[1], B[0], B[1], 'lm gr') + flecha(K, O, A, 'lg gr', 'a', 'tg', 1) + flecha(K, O, B, 'lf gr', 'b', 'tf', -1);
      h += pto(K, O, 'O', -8, 16) + pto(K, A, 'A', -9, -6) + pto(K, B, 'B', 9, -6);
      if (!igual([v.x, v.y], p.O)) h += K.ar(O[0], O[1], M[0], M[1], 'la gr d');
      if (f > 0) {   // a + b es la diagonal del paralelogramo; su mitad cae en AB
        const H = [(O[0] + S[0]) / 2, (O[1] + S[1]) / 2];
        h += K.f(f * 2, K.l(A[0], A[1], S[0], S[1], 'lm d') + K.l(B[0], B[1], S[0], S[1], 'lm d'));
        const Q = [O[0] + (S[0] - O[0]) * 0.8, O[1] + (S[1] - O[1]) * 0.8], Ls = Math.hypot(S[0] - O[0], S[1] - O[1]) || 1;
        h += tramo(K, O, S, f * 1.6, 'lm gr') + K.f(f * 3 - 1.6, K.c(H[0], H[1], 7, ok ? 'fo' : 'ff') + K.t(Q[0] + (S[1] - O[1]) / Ls * 16, Q[1] - (S[0] - O[0]) / Ls * 16 + 4, 'a + b', 's tm'));
        h += marcaOk(K, f, ok, 'M es la mitad de a + b ✓', 'la mitad de a + b cae en otro punto ✗');
      }
      return h;
    },
    lee: (v, p) => (igual([v.x, v.y], medio(p)) ? '$\\overrightarrow{AM} = \\overrightarrow{MB}$: M parte AB en dos flechas iguales' : '$\\overrightarrow{AM} \\neq \\overrightarrow{MB}$: tu M no parte AB en dos flechas iguales'),
    aviso(v, p) {
      const q = [v.x, v.y];
      if (igual(q, suma(p.A, p.B, por(-1, p.O)))) return p.mira.suma;
      if (igual(q, p.A) || igual(q, p.B)) return p.mira.extremo;
      if (igual(q, p.O)) return p.mira.origen;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // -------------------------------------------------------------------------- el punto que divide en una razón
  // P se desliza por el segmento AB, marcado en n partes iguales; AP = (k/n)·AB.  v { k }
  //   params { n, k, k0, kf?, m, r, et: [nombre de A, de B], mira: { alreves, fraccion, extremo, otro }, ok }
  const RA = [34, 192], RB = [306, 72];
  const enR = (k, n) => [RA[0] + (RB[0] - RA[0]) * k / n, RA[1] + (RB[1] - RA[1]) * k / n];
  XG.figura('punto-en-razon-dada', {
    ini: p => ({ k: p.k0 }),
    manijas: p => [{ k: 'k', min: 0, max: p.n, paso: 1, rot: () => 'P', en: v => enR(v.k, p.n),
      de: (x, y) => { const dx = RB[0] - RA[0], dy = RB[1] - RA[1]; return ((x - RA[0]) * dx + (y - RA[1]) * dy) / (dx * dx + dy * dy) * p.n; } }],
    ok: (v, p) => v.k === p.k,
    sol: p => ({ k: p.k }),
    texto: p => `$\\overrightarrow{AP} = ${frac(p.k, p.n)}\\,\\overrightarrow{AB}$, porque $\\tfrac{${p.m}}{${p.m} + ${p.r}} = ${frac(p.k, p.n)}$`,
    alto: () => 230, pie: 'Desliza la P por el segmento.',
    dib(v, K, p, f) {
      const P = enR(v.k, p.n), ok = v.k === p.k, dx = RB[0] - RA[0], dy = RB[1] - RA[1], L = Math.hypot(dx, dy), nx = -dy / L * 6, ny = dx / L * 6;
      let h = K.l(RA[0], RA[1], RB[0], RB[1], 'lm gr');
      for (let i = 0; i <= p.n; i++) { const Q = enR(i, p.n); h += K.l(Q[0] - nx, Q[1] - ny, Q[0] + nx, Q[1] + ny, 'lm'); }
      h += pto(K, RA, 'A', -6, 20) + pto(K, RB, 'B', 6, -10) + K.t(RA[0] + 4, RA[1] + 32, p.et[0], 's tm', 'start') + K.t(RB[0] - 4, RB[1] - 24, p.et[1], 's tm', 'end');
      h += K.t(8, 18, `AP : PB = ${p.m} : ${p.r}`, 's ta', 'start');
      if (f > 0) {   // los dos pedazos, contados en partes iguales
        h += tramo(K, RA, P, f * 1.6, 'la gr') + tramo(K, P, RB, f * 1.6 - 0.4, 'lg gr');
        h += K.f(f * 2 - 0.8, rot(K, RA, P, `${v.k}`, 'ta', 1, 16) + rot(K, P, RB, `${p.n - v.k}`, 'tg', 1, 16));
        h += marcaOk(K, f, ok, `${v.k} : ${p.n - v.k} es ${p.m} : ${p.r} ✓`, `${v.k} : ${p.n - v.k} no es ${p.m} : ${p.r} ✗`);
      }
      return h;
    },
    lee: (v, p) => `$\\overrightarrow{AP} = ${frac(v.k, p.n)}\\,\\overrightarrow{AB}$`,
    aviso: (v, p) => (v.k === p.n - p.k ? p.mira.alreves : p.kf != null && v.k === p.kf ? p.mira.fraccion : v.k === 0 || v.k === p.n ? p.mira.extremo : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------- demostración: las diagonales de un paralelogramo se bisecan
  // Una demostración con huecos; cada renglón se completa con una ficha.
  //   params { filas: [texto de cada renglón], metas, fichas, mira, trampas, ok }
  const slotD = i => ({ x: 258, y: 112 + 42 * i, w: 148, h: 34 });
  const DA = [22, 80], DB = [132, 80], DC = [182, 22], DD = [72, 22], DX = [102, 51];
  XG.rotula('diagonales-se-bisecan', {
    slots: p => p.metas.map((_, i) => slotD(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 262,
    texto: p => p.metas.join('; '),
    fondo(K, p, f) {
      let h = K.p([DA, DB, DC, DD], 'fn') + K.pl([DA, DB, DC, DD, DA], 'lg gr') + K.l(DA[0], DA[1], DC[0], DC[1], 'lm d') + K.l(DB[0], DB[1], DD[0], DD[1], 'lm d');
      h += pto(K, DA, 'A', -6, 14) + pto(K, DB, 'B', 6, 14) + pto(K, DC, 'C', 8, 0) + pto(K, DD, 'D', -8, 0);
      h += K.t(332, 40, 'a, b, c, d: flechas', 's tm', 'end') + K.t(332, 58, 'de O a A, B, C, D', 's tm', 'end');
      p.filas.forEach((t, i) => { h += K.t(12, slotD(i).y + 5, t, 's', 'start'); });
      if (f > 0) {   // las cuatro mitades de las diagonales, marcadas iguales de dos en dos
        const tic = (P, Q, n) => { const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], L = Math.hypot(Q[0] - P[0], Q[1] - P[1]), ux = (Q[0] - P[0]) / L, uy = (Q[1] - P[1]) / L; let s = ''; for (let j = 0; j < n; j++) { const c = [m[0] + ux * (j - (n - 1) / 2) * 5, m[1] + uy * (j - (n - 1) / 2) * 5]; s += K.l(c[0] - uy * 5, c[1] + ux * 5, c[0] + uy * 5, c[1] - ux * 5, 'lo gr'); } return s; };
        h += K.f(f, tic(DA, DX, 1) + tic(DX, DC, 1) + tic(DB, DX, 2) + tic(DX, DD, 2) + K.c(DX[0], DX[1], 5, 'fo'));
      }
      return h;
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------- el travesaño: el segmento de los puntos medios mide la mitad
  // Se ve la pata AB con su punto medio M y la base BC trasladada; se arrastra N para que MN = ½ BC.
  // Al comprobar se arma el triángulo y N debe caer en la mitad de AC.  v { x, y }
  //   params { A, M, bc, L: cola de la flecha trasladada, ini, mira: { doble, reves, otro }, ok }
  const meta4 = p => suma(p.M, por(0.5, p.bc));
  XG.figura('travesano-mitad-base', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [mano(PG, 'N')],
    ok: (v, p) => igual([v.x, v.y], meta4(p)),
    sol: p => { const q = meta4(p); return { x: q[0], y: q[1] }; },
    texto: () => '$\\overrightarrow{MN} = \\tfrac12\\overrightarrow{BC}$: N cae en el punto medio de AC',
    alto: () => 246, pie: 'Arrastra la N, el otro extremo del travesaño.',
    dib(v, K, p, f) {
      const Bq = suma(por(2, p.M), por(-1, p.A)), Cq = suma(Bq, p.bc), A = P2(PG, p.A), M = P2(PG, p.M), B = P2(PG, Bq), C = P2(PG, Cq), N = [PG.X(v.x), PG.Y(v.y)];
      const L0 = P2(PG, p.L), L1 = P2(PG, suma(p.L, p.bc)), ok = igual([v.x, v.y], meta4(p));
      let h = papel(K, PG) + K.l(A[0], A[1], B[0], B[1], 'lg gr') + flecha(K, L0, L1, 'lf gr', 'BC', 'tf', -1);
      h += pto(K, A, 'A', 9, -4) + pto(K, M, 'M', -9, 4) + pto(K, B, 'B', -9, 14);
      if (!igual([v.x, v.y], p.M)) h += K.l(M[0], M[1], N[0], N[1], 'la gr');
      if (f > 0) {   // la base se lleva a B, se cierra el triángulo y se marca la mitad de AC
        h += tramo(K, B, C, f * 1.6, 'lf gr d') + linea(K, A, C, f * 1.6 - 0.6, 'lg gr');
        const H = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
        h += K.f(f * 3 - 1.6, K.c(H[0], H[1], 7, ok ? 'fo' : 'ff') + K.t(C[0] + 8, C[1] + 4, 'C', 's', 'start'));
        h += marcaOk(K, f, ok, 'N es la mitad de AC ✓', 'N no cae en la mitad de AC ✗');
      }
      return h;
    },
    lee: (v, p) => (igual([v.x, v.y], meta4(p)) ? '$\\overrightarrow{MN} = \\tfrac12\\overrightarrow{BC}$' : '$\\overrightarrow{MN} \\neq \\tfrac12\\overrightarrow{BC}$'),
    aviso(v, p) {
      const q = [v.x, v.y];
      if (igual(q, suma(p.M, p.bc))) return p.mira.doble;
      if (igual(q, suma(p.M, por(-0.5, p.bc)))) return p.mira.reves;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------- el baricentro: el promedio de los tres vértices
  // Se arrastra G; al comprobar se trazan las tres medianas y se marca dónde se cruzan.  v { x, y }
  //   params { O, A, B, C, ini, mira: { lado, vertice, otro }, ok }
  const bari = p => [(p.A[0] + p.B[0] + p.C[0]) / 3, (p.A[1] + p.B[1] + p.C[1]) / 3];
  XG.figura('baricentro-en-equilibrio', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [mano(PG, 'G')],
    ok: (v, p) => igual([v.x, v.y], bari(p)),
    sol: p => { const g = bari(p); return { x: g[0], y: g[1] }; },
    texto: () => '$\\overrightarrow{OG} = \\tfrac13(\\vec a + \\vec b + \\vec c)$: las tres medianas pasan por G',
    alto: () => 246, pie: 'Arrastra la G, el punto de apoyo.',
    dib(v, K, p, f) {
      const O = P2(PG, p.O), V = [p.A, p.B, p.C].map(q => P2(PG, q)), ok = igual([v.x, v.y], bari(p));
      let h = papel(K, PG) + K.p(V, 'fn') + K.pl([...V, V[0]], 'lg gr');
      V.forEach(Q => { h += K.ar(O[0], O[1], Q[0], Q[1], 'lm'); });
      h += pto(K, O, 'O', -8, 16) + pto(K, V[0], 'A', -9, 4) + pto(K, V[1], 'B', 9, 4) + pto(K, V[2], 'C', 0, -10);
      if (f > 0) {   // cada vértice con el punto medio del lado de enfrente
        V.forEach((Q, i) => { const R = V[(i + 1) % 3], S = V[(i + 2) % 3], Md = [(R[0] + S[0]) / 2, (R[1] + S[1]) / 2]; h += linea(K, Q, Md, f * 1.8 - i * 0.25, 'lo d') + K.f(f * 2 - 0.6, K.c(Md[0], Md[1], 3, 'fk')); });
        const T = P2(PG, bari(p));
        h += K.f(f * 3 - 1.6, K.c(T[0], T[1], 7, ok ? 'fo' : 'ff'));
        h += marcaOk(K, f, ok, 'G está en las tres medianas ✓', 'las medianas se cruzan en otro punto ✗');
      }
      return h;
    },
    lee: (v, p) => (igual([v.x, v.y], bari(p)) ? '$\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$' : '$\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} \\neq \\vec 0$'),
    aviso(v, p) {
      const q = por(2, [v.x, v.y]), V = [p.A, p.B, p.C];
      if (V.some(a => igual([v.x, v.y], a))) return p.mira.vertice;
      if ([[0, 1], [1, 2], [0, 2]].some(([i, j]) => igual(q, suma(V[i], V[j])))) return p.mira.lado;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------- el cuarto vértice de un paralelogramo
  // Están A, B y C; se arrastra D para cerrar el marco ABCD (en ese orden). Al comprobar se comparan AB y DC.  v { x, y }
  //   params { A, B, C, ini, mira: { abdc, acbd, otro }, ok }
  const cuarto = p => suma(p.A, p.C, por(-1, p.B));
  XG.figura('cuarto-vertice-marco', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [mano(PG, 'D')],
    ok: (v, p) => igual([v.x, v.y], cuarto(p)),
    sol: p => { const d = cuarto(p); return { x: d[0], y: d[1] }; },
    texto: () => '$\\vec d = \\vec a + \\vec c - \\vec b$: así $\\overrightarrow{AD} = \\overrightarrow{BC}$ y $\\overrightarrow{AB} = \\overrightarrow{DC}$',
    alto: () => 246, pie: 'Arrastra la D para cerrar el marco.',
    dib(v, K, p, f) {
      const A = P2(PG, p.A), B = P2(PG, p.B), C = P2(PG, p.C), D = [PG.X(v.x), PG.Y(v.y)], ok = igual([v.x, v.y], cuarto(p));
      let h = papel(K, PG) + K.pl([A, B, C], 'lg gr') + K.pl([C, D, A], 'la gr d');
      h += pto(K, A, 'A', -9, 4) + pto(K, B, 'B', 9, 14) + pto(K, C, 'C', 9, -4);
      if (f > 0) {   // AB trasladado desde D debe llegar a C, y BC desde A debe llegar a D
        const ab = [B[0] - A[0], B[1] - A[1]], bc = [C[0] - B[0], C[1] - B[1]];
        h += tramo(K, A, B, f * 1.6, 'lo gr') + tramo(K, D, [D[0] + ab[0], D[1] + ab[1]], f * 1.6 - 0.5, `${ok ? 'lo' : 'lf'} gr`);
        h += K.f(f * 2 - 1, K.ar(A[0], A[1], A[0] + bc[0], A[1] + bc[1], 'lm d') + K.t(D[0] - 12, D[1] - 8, 'D', 's', 'end'));
        h += marcaOk(K, f, ok, 'AB = DC: es un paralelogramo ✓', 'AB y DC no son el mismo vector ✗');
      }
      return h;
    },
    lee: (v, p) => (igual([v.x, v.y], cuarto(p)) ? '$\\overrightarrow{AB} = \\overrightarrow{DC}$' : '$\\overrightarrow{AB} \\neq \\overrightarrow{DC}$'),
    aviso(v, p) {
      const q = [v.x, v.y];
      if (igual(q, suma(p.B, p.C, por(-1, p.A)))) return p.mira.abdc;
      if (igual(q, suma(p.A, p.B, por(-1, p.C)))) return p.mira.acbd;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------- un vector como combinación de dos lados de la figura
  // En el paralelogramo ABCD, u = AB y v = AD. Se eligen r y s: r·u y s·v salen de A. Al comprobar se encadenan y se ve dónde llega
  // r·u + s·v; debe ser el punto X.  v { r, s }
  //   params { X: [r, s], et, mira: { cambia, r, s, otro }, ok }
  const CA = [52, 176], CU = [120, -14], CV = [50, -84];
  const enC = (r, s) => [CA[0] + r * CU[0] + s * CV[0], CA[1] + r * CU[1] + s * CV[1]];
  XG.figura('combina-dos-lados', {
    ini: () => ({ r: 0, s: 0 }),
    manijas: () => [{ k: 'r', min: 0, max: 1.5, paso: 0.5, et: 'r: veces u = AB' }, { k: 's', min: 0, max: 1.5, paso: 0.5, et: 's: veces v = AD' }],
    ok: (v, p) => v.r === p.X[0] && v.s === p.X[1],
    sol: p => ({ r: p.X[0], s: p.X[1] }),
    texto: p => `$\\overrightarrow{AX} = ${p.X[0]}\\,\\vec u + ${p.X[1]}\\,\\vec v$`,
    alto: () => 292,
    dib(v, K, p, f) {
      const B = enC(1, 0), C = enC(1, 1), D = enC(0, 1), X = enC(...p.X), ok = v.r === p.X[0] && v.s === p.X[1];
      let h = K.p([CA, B, C, D], 'fn') + K.pl([CA, B, C, D, CA], 'lm gr');
      h += pto(K, CA, 'A', -8, 14) + pto(K, B, 'B', 8, 14) + pto(K, C, 'C', 8, -4) + pto(K, D, 'D', -8, -4);
      h += K.c(X[0], X[1], 5, 'fk') + K.t(X[0] + 9, X[1] + 4, 'X', 's ta', 'start') + K.t(8, 16, p.et, 's tm', 'start');
      const R = enC(v.r, 0), S = enC(0, v.s), cf = x => ({ 0.5: '½', 1: '', 1.5: '1.5' }[x] ?? x);
      h += (v.r ? K.ar(CA[0], CA[1], R[0], R[1], 'lg gr') : '') + (v.s ? K.ar(CA[0], CA[1], S[0], S[1], 'lf gr') : '');
      h += K.f(1 - f * 2, (v.r ? rot(K, CA, R, `${cf(v.r)}u`, 'tg', 1) : '') + (v.s ? rot(K, CA, S, `${cf(v.s)}v`, 'tf', -1) : ''));
      if (f > 0) {   // s·v se pone en la punta de r·u: la suma llega a donde llega
        const E = enC(v.r, v.s);
        h += tramo(K, R, E, f * 1.6, 'lf gr d') + K.f(f * 2 - 0.8, K.ar(CA[0], CA[1], E[0], E[1], 'la gr')) + K.f(f * 3 - 1.6, K.c(E[0], E[1], 7, ok ? 'fo' : 'ff'));
        h += marcaOk(K, f, ok, 'r·u + s·v llega a X ✓', 'r·u + s·v llega a otro punto ✗');
      }
      return h;
    },
    lee: v => `$${v.r}\\,\\vec u + ${v.s}\\,\\vec v$`,
    aviso: (v, p) => (v.r === p.X[1] && v.s === p.X[0] ? p.mira.cambia : v.r === p.X[0] ? p.mira.s : v.s === p.X[1] ? p.mira.r : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------- en movimiento: el robot que avanza por la recta AB
  // El robot sale de A y da saltos iguales a AB. Se fija cuántos saltos y al soltar avanza; debe parar en C (AC = k·AB).
  //   tiro { q, k, max, oculta, cuenta, trampas }
  const TA = [30, 104], TS = 44, TD = [Math.cos(10 * Math.PI / 180), -Math.sin(10 * Math.PI / 180)];
  const enT = k => [TA[0] + k * TS * TD[0], TA[1] + k * TS * TD[1]];
  XG.tiros('robot-multiplo-recta', {
    perilla: t => ({ et: 'Saltos iguales a AB', min: 0, max: t.max, cara: v => v, lee: v => `${v} ${v === 1 ? 'salto' : 'saltos'}` }),
    meta: t => t.k, alto: 132, ms: 1700, pie: 'Fija los saltos y suelta.',
    dib(t, v, K, p, f) {
      const B = enT(1), C = enT(t.k), Z = enT(7.2);
      let h = K.l(TA[0], TA[1], Z[0], Z[1], 'lm d');
      for (let i = 0; i <= 7; i++) { const Q = enT(i); h += K.l(Q[0] + TD[1] * 4, Q[1] - TD[0] * 4, Q[0] - TD[1] * 4, Q[1] + TD[0] * 4, 'ls'); }
      h += flecha(K, TA, B, 'lg gr', 'AB', 'tg', 1) + pto(K, TA, 'A', -2, 22) + pto(K, B, 'B', 2, 22);
      const ve = !t.oculta || (v != null && f >= 1);
      if (ve) h += K.c(C[0], C[1], 6, 'fk') + K.t(C[0], C[1] + 22, 'C', 's');
      if (v == null) return h;
      const g = Math.min(1, f * 1.2), Q = enT(v * g), ok = v === t.k;
      for (let j = 1; j <= Math.floor(v * g); j++) { const a = enT(j - 1), b = enT(j); h += K.ar(a[0], a[1], b[0], b[1], 'la gr'); }
      h += K.r(Q[0] - 8, Q[1] - 20, 16, 12, f >= 1 ? (ok ? 'fo' : 'ff') : 'fa', 3) + K.l(Q[0], Q[1] - 8, Q[0], Q[1], 'la');
      return h + K.f(f * 3 - 2, K.t(332, 18, ok ? `AC = ${t.k}·AB ✓` : `${v}·AB ≠ AC ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} ${v === 1 ? 'salto' : 'saltos'} el robot ${v > t.k ? 'se pasa de C' : 'no llega a C'}: busca el número k con AC = k·AB.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-11.js
// Geometría Vectorial · juegos de la lección geo-11 «Vectores geométricos y vectores coordenados» (spec 2026-11-27-curso-geometria-vectorial).
// Con î y ĵ cada flecha del plano es un par (a, b) y un punto; el vector de P a Q es Q − P; su largo es √(a² + b²), su dirección un
// ángulo que se lee con tan θ = b/a cuidando el cuadrante, y su unitario u/‖u‖. En el espacio se añade k̂. Otra base no paralela da
// otras coordenadas al mismo punto. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) con las piezas XPK; sin lienzo ni
// colores propios. Las demostraciones euclidianas son de geo-10 y la recta, de geo-12.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const tn = n => (n < 0 ? `(${n})` : `${n}`);
  const r2 = x => Math.round(x * 100) / 100;
  const igual = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-9);
  const cl = (x, a, b) => Math.max(a, Math.min(b, x));
  // Papel cuadriculado: B = { x0, x1, y0, y1 }; el punto (0, 0) cae en (ox, oy) y una unidad mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  // Ejes con números cada `cada` unidades.
  const ejes = (K, P, cada = 2) => {
    let h = K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
    for (let x = Math.ceil(P.x0 / cada) * cada; x <= P.x1; x += cada) if (x) h += K.t(P.X(x), P.oy + 13, sg(x), 's tm');
    for (let y = Math.ceil(P.y0 / cada) * cada; y <= P.y1; y += cada) if (y) h += K.t(P.ox - 5, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h;
  };
  const tramo = (K, A, B, g, cls) => (g > 0.01 ? K.ar(A[0], A[1], A[0] + (B[0] - A[0]) * Math.min(1, g), A[1] + (B[1] - A[1]) * Math.min(1, g), cls) : '');
  // «2u − v» a partir de los coeficientes y los nombres.
  const comb = (k, et) => k.map((c, i) => {
    if (!c) return '';
    const m = Math.abs(c) === 1 ? '' : Math.abs(c);
    return `${i === 0 ? (c < 0 ? '−' : '') : c < 0 ? ' − ' : ' + '}${m}${et[i]}`;
  }).join('');
  // «2î − ĵ»
  const ij = (a, b) => comb([a, b], ['î', 'ĵ']) || '0';
  // Recorre a pasos una lista de flechas cola con punta desde S (en unidades), con la fracción f.
  const cadena = (K, P, S, pasos, f, cls) => {
    let h = '', q = S;
    pasos.forEach((d, i) => { const g = cl(f * (pasos.length + 1) - i, 0, 1), n = [q[0] + d[0], q[1] + d[1]]; h += tramo(K, P2(P, q), P2(P, n), g, cls); q = n; });
    return h;
  };
  const repite = (k, w) => Array.from({ length: Math.abs(k) }, () => [Math.sign(k) * w[0], Math.sign(k) * w[1]]);

  // ------------------------------------------------------------- descomposición canónica: la suma se hace por componentes
  // u y v llegan escritos con î y ĵ (sin flechas); se arrastra P a donde termina k₀u + k₁v desde O. Al comprobar, las flechas se
  // encadenan y caen en el mismo punto que la cuenta.  v { x, y }
  //   params { u, v, k: [k₀, k₁], et: ['u', 'v'], q: rótulo, trampas: { 'x,y': aviso }, otro, ok }
  const PO = plano({ x0: -3, x1: 8, y0: -6, y1: 3 }, 110, 104, 24);
  const combina = p => [p.k[0] * p.u[0] + p.k[1] * p.v[0], p.k[0] * p.u[1] + p.k[1] * p.v[1]];
  XG.figura('ordenes-en-i-y-j', {
    ini: () => ({ x: 0, y: 0 }),
    manijas: () => [{ k: ['x', 'y'], min: [PO.x0, PO.y0], max: [PO.x1, PO.y1], paso: 1, rot: () => 'P', en: v => P2(PO, [v.x, v.y]), de: (x, y) => [(x - PO.ox) / PO.u, (PO.oy - y) / PO.u] }],
    ok: (v, p) => igual([v.x, v.y], combina(p)),
    sol: p => { const w = combina(p); return { x: w[0], y: w[1] }; },
    texto: p => { const w = combina(p); return `$${comb(p.k, p.et.map(e => `\\vec ${e}`))} = (${w[0]}, ${w[1]})$`.replace(/−/g, '-'); },
    alto: () => 258, pie: 'Arrastra P a donde termina el recorrido.',
    dib(v, K, p, f) {
      const O = P2(PO, [0, 0]), Pp = P2(PO, [v.x, v.y]), w = combina(p), ok = igual([v.x, v.y], w);
      let h = papel(K, PO) + ejes(K, PO);
      h += K.ar(O[0], O[1], O[0] + PO.u, O[1], 'lg gr') + K.ar(O[0], O[1], O[0], O[1] - PO.u, 'lg gr')
        + K.t(O[0] + PO.u / 2, O[1] - 5, 'î', 's tg') + K.t(O[0] - 8, O[1] - PO.u / 2 + 4, 'ĵ', 's tg', 'end');
      h += K.t(8, 16, `${p.et[0]} = ${ij(...p.u)};  ${p.et[1]} = ${ij(...p.v)}`, 's ta', 'start');
      h += K.c(O[0], O[1], 4, 'fk') + (v.x || v.y ? K.ar(O[0], O[1], Pp[0], Pp[1], 'la gr') : '');
      if (f > 0) {   // las órdenes se ejecutan como flechas, cola con punta
        h += cadena(K, PO, [0, 0], [...repite(p.k[0], p.u), ...repite(p.k[1], p.v)], f, 'lf gr');
        const E = P2(PO, w);
        h += K.f(f * 3 - 2, K.c(E[0], E[1], 7, ok ? 'fo' : 'ff') + K.t(332, 16, `${comb(p.k, p.et)} = (${sg(w[0])}, ${sg(w[1])}) ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$P = (${v.x}, ${v.y}) = ${v.x}\\,\\hat\\imath ${v.y < 0 ? '-' : '+'} ${Math.abs(v.y)}\\,\\hat\\jmath$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------------- punta menos cola: el vector de P a Q desde O
  // La flecha va de P a Q; se arrastra la punta R del vector que sale de O y es el mismo vector libre. Al comprobar, PQ se traslada.
  //   params { P, Q, et: ['P', 'Q'], trampas: { 'x,y': aviso }, otro, ok }   v { x, y }
  const PT = plano({ x0: -6, x1: 6, y0: -4, y1: 5 }, 170, 150, 24);
  const resta = p => [p.Q[0] - p.P[0], p.Q[1] - p.P[1]];
  const rotPunto = (K, Q, s) => (Q[0] > 250 || Q[0] < PT.ox ?K.t(Q[0] - 8, Q[1] - 9, s, 's', 'end') : K.t(Q[0] + 8, Q[1] - 9, s, 's', 'start'));
  XG.figura('traslada-al-origen', {
    ini: () => ({ x: 0, y: 0 }),
    manijas: () => [{ k: ['x', 'y'], min: [PT.x0, PT.y0], max: [PT.x1, PT.y1], paso: 1, rot: () => 'R', en: v => P2(PT, [v.x, v.y]), de: (x, y) => [(x - PT.ox) / PT.u, (PT.oy - y) / PT.u] }],
    ok: (v, p) => igual([v.x, v.y], resta(p)),
    sol: p => { const d = resta(p); return { x: d[0], y: d[1] }; },
    texto: p => { const d = resta(p); return `$\\overrightarrow{${p.et[0]}${p.et[1]}} = ${p.et[1]} - ${p.et[0]} = (${d[0]}, ${d[1]})$`; },
    alto: () => 258, pie: 'Arrastra la punta R de la flecha que sale de O.',
    dib(v, K, p, f) {
      const O = P2(PT, [0, 0]), A = P2(PT, p.P), B = P2(PT, p.Q), Rr = P2(PT, [v.x, v.y]), d = resta(p), ok = igual([v.x, v.y], d);
      let h = papel(K, PT) + ejes(K, PT);
      h += K.ar(A[0], A[1], B[0], B[1], 'lg gr') + K.c(A[0], A[1], 4, 'fk') + K.c(B[0], B[1], 4, 'fk')
        + rotPunto(K, A, `${p.et[0]}(${sg(p.P[0])}, ${sg(p.P[1])})`) + rotPunto(K, B, `${p.et[1]}(${sg(p.Q[0])}, ${sg(p.Q[1])})`);
      h += K.c(O[0], O[1], 4, 'fk') + (v.x || v.y ? K.ar(O[0], O[1], Rr[0], Rr[1], 'la gr') : '');
      if (f > 0) {   // la flecha de P a Q viaja sin girar hasta que su cola cae en O
        const g = Math.min(1, f * 1.4), C = [p.P[0] * (1 - g), p.P[1] * (1 - g)], E = [C[0] + d[0], C[1] + d[1]], c0 = P2(PT, C), c1 = P2(PT, E);
        h += K.ar(c0[0], c0[1], c1[0], c1[1], `${ok ? 'lo' : 'lf'} gr d`)
          + K.f(f * 3 - 2, K.t(332, 16, `${p.et[1]} − ${p.et[0]} = (${sg(d[0])}, ${sg(d[1])}) ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$\\overrightarrow{OR} = (${v.x}, ${v.y})$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------- dirección: el ángulo con tan θ = b/a y el cuadrante
  // Llegan las componentes (sin flecha); se gira la aguja de 15° en 15°. Al comprobar aparece la flecha con su triángulo.
  //   params { a, b: textos, c: [a, b] numéricos, g, uni, que, trampas: { ángulo: aviso }, otro, ok }   v { g }
  const BC = { x: 170, y: 140, r: 92 };
  XG.figura('brujula-del-cuadrante', {
    ini: () => ({ g: 0 }),
    manijas: () => [{ k: 'g', min: 0, max: 345, paso: 15, en: v => XPK.at(BC.x, BC.y, BC.r, v.g),
      de: (x, y) => { let g = (Math.atan2(BC.y - y, x - BC.x) / R + 360) % 360; if (g > 352.5) g = 0; return g; } }],
    ok: (v, p) => v.g === p.g,
    sol: p => ({ g: p.g }),
    texto: p => `dirección $${p.g}^{\\circ}$`,
    alto: () => 264, pie: 'Gira la aguja hasta la dirección.',
    dib(v, K, p, f) {
      let h = K.arc(BC.x, BC.y, BC.r, 0, 360, 'lm') + K.l(BC.x - BC.r, BC.y, BC.x + BC.r, BC.y, 'ls') + K.l(BC.x, BC.y - BC.r, BC.x, BC.y + BC.r, 'ls');
      for (let g = 0; g < 360; g += 15) { const a = K.at(BC.x, BC.y, BC.r - (g % 90 ? 4 : 8), g), b = K.at(BC.x, BC.y, BC.r, g); h += K.l(a[0], a[1], b[0], b[1], 'lm'); }
      h += K.t(BC.x + BC.r + 7, BC.y + 4, '0°', 's tm', 'start') + K.t(BC.x, BC.y - BC.r - 7, '90°', 's tm')
        + K.t(BC.x - BC.r - 7, BC.y + 4, '180°', 's tm', 'end') + K.t(BC.x, BC.y + BC.r + 16, '270°', 's tm');
      ['I', 'II', 'III', 'IV'].forEach((q, i) => { const m = K.at(BC.x, BC.y, 62, 45 + 90 * i); h += K.t(m[0], m[1] + 4, q, 's tm'); });
      h += K.t(8, 16, `${p.que}: (${p.a}, ${p.b}) ${p.uni}`, 's ta', 'start');
      const T = K.at(BC.x, BC.y, BC.r, v.g), ok = v.g === p.g;
      h += K.arc(BC.x, BC.y, 22, 0, v.g, 'lm') + K.l(BC.x, BC.y, T[0], T[1], 'la gr') + K.c(BC.x, BC.y, 4, 'fk') + K.t(332, 16, `θ = ${v.g}°`, 's', 'end');
      if (f > 0) {   // la flecha de verdad, con sus componentes
        const s = 78 / Math.hypot(...p.c), E = [BC.x + p.c[0] * s * Math.min(1, f * 1.4), BC.y - p.c[1] * s * Math.min(1, f * 1.4)], C = [E[0], BC.y];
        h += K.l(BC.x, BC.y, C[0], C[1], 'lf d') + K.l(C[0], C[1], E[0], E[1], 'lf d') + K.ar(BC.x, BC.y, E[0], E[1], `${ok ? 'lo' : 'lf'} gr`)
          + K.f(f * 3 - 2, K.t(8, 34, `tan θ = (${p.b}) ÷ (${p.a})`, 's tm', 'start') + K.t(332, 34, ok ? 'justo ✓' : `era ${p.g}° ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$\\theta = ${v.g}^{\\circ}$`,
    aviso: (v, p) => p.trampas?.[v.g] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------------------------- el vector unitario: u dividido por su largo
  // Se arrastra un punto dentro del cuadrado [−1, 1]², de 0.1 en 0.1; vale el que tiene largo 1 y la dirección de u.  v { x, y }
  //   params { u, uni, que, ini, mira: { opuesto, cambia, otraDir, largo, otro }, ok }
  const UC = { x: 170, y: 134, r: 100 };
  const unit = p => { const n = Math.hypot(...p.u); return [r2(p.u[0] / n), r2(p.u[1] / n)]; };
  XG.figura('unitario-en-la-rueda', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-1, -1], max: [1, 1], paso: 0.1, en: v => [UC.x + v.x * UC.r, UC.y - v.y * UC.r], de: (x, y) => [(x - UC.x) / UC.r, (UC.y - y) / UC.r] }],
    ok: (v, p) => igual([v.x, v.y], unit(p)),
    sol: p => { const e = unit(p); return { x: e[0], y: e[1] }; },
    texto: p => { const e = unit(p), n = Math.hypot(...p.u); return `$\\hat u = \\tfrac{1}{${n}}(${p.u[0]}, ${p.u[1]}) = (${e[0]}, ${e[1]})$`; },
    alto: () => 250, pie: 'Arrastra el punto: su flecha sale del centro.',
    dib(v, K, p, f) {
      let h = '';
      for (let k = -5; k <= 5; k++) { const a = UC.x + k * UC.r / 5, b = UC.y - k * UC.r / 5; h += K.l(a, UC.y - UC.r, a, UC.y + UC.r, 'ls') + K.l(UC.x - UC.r, b, UC.x + UC.r, b, 'ls'); }
      h += K.arc(UC.x, UC.y, UC.r, 0, 360, 'lm') + K.l(UC.x - UC.r - 10, UC.y, UC.x + UC.r + 10, UC.y, 'lm') + K.l(UC.x, UC.y - UC.r - 10, UC.x, UC.y + UC.r + 10, 'lm');
      h += K.t(UC.x + UC.r + 14, UC.y + 4, '1', 's tm', 'start') + K.t(UC.x - UC.r - 14, UC.y + 4, '−1', 's tm', 'end')
        + K.t(UC.x + 6, UC.y - UC.r - 2, '1', 's tm', 'start') + K.t(UC.x + 6, UC.y + UC.r + 12, '−1', 's tm', 'start');
      h += K.t(8, 16, `${p.que}: u = (${sg(p.u[0])}, ${sg(p.u[1])}) ${p.uni}`, 's ta', 'start');
      const x = r2(v.x), y = r2(v.y), Q = [UC.x + x * UC.r, UC.y - y * UC.r], e = unit(p), ok = igual([x, y], e);
      h += (x || y ? K.ar(UC.x, UC.y, Q[0], Q[1], 'la gr') : '') + K.c(UC.x, UC.y, 4, 'fk') + K.t(8, 244, `(${sg(x)}, ${sg(y)})`, 's', 'start');
      if (f > 0) {   // la dirección de u, y donde corta al círculo de radio 1
        const g = Math.min(1, f * 1.4), n = Math.hypot(...p.u), D = [UC.x + p.u[0] / n * UC.r * 1.25 * g, UC.y - p.u[1] / n * UC.r * 1.25 * g], E = [UC.x + e[0] * UC.r, UC.y - e[1] * UC.r];
        h += K.l(UC.x, UC.y, D[0], D[1], 'lf d') + K.f(f * 3 - 2, K.c(E[0], E[1], 7, ok ? 'fo' : 'ff')
          + K.t(332, 244, `u ÷ ${n} = (${sg(e[0])}, ${sg(e[1])}) ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => { const x = r2(v.x), y = r2(v.y); return `$\\sqrt{${tn(x)}^2 + ${tn(y)}^2} = ${r2(Math.hypot(x, y))}$`; },
    aviso(v, p) {
      const x = r2(v.x), y = r2(v.y), n = Math.hypot(x, y), e = unit(p), cruz = Math.abs(x * p.u[1] - y * p.u[0]) < 1e-6, uno = Math.abs(n - 1) < 1e-6;
      if (cruz && n > 0 && x * p.u[0] + y * p.u[1] < 0) return uno ? p.mira.opuesto : p.mira.otro;
      if (uno && Math.abs(Math.abs(x) - Math.abs(e[1])) < 1e-6 && Math.abs(Math.abs(y) - Math.abs(e[0])) < 1e-6) return p.mira.cambia;
      if (uno) return p.mira.otraDir;
      if (cruz && n > 0) return p.mira.largo;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------- de magnitud y dirección a componentes: r cos θ y r sen θ
  // Dos flechas salen de O con su magnitud y su dirección; se arrastran sus componentes x e y a la tabla.
  //   params { fl: [[r, θ, nombre] × 2], uni, metas: [x₁, y₁, x₂, y₂], fichas, mira: [aviso por lugar], trampas: { 'i:ficha': aviso }, ok }
  const DO = [62, 128], DS = 11;
  const slotD = i => ({ x: 236 + 66 * (i % 2), y: 84 + 76 * Math.floor(i / 2), w: 58, h: 36 });
  XG.rotula('del-rumbo-a-componentes', {
    slots: p => p.metas.map((_, i) => slotD(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 222,
    texto: p => p.texto,
    fondo(K, p, f) {
      let h = K.l(14, DO[1], 186, DO[1], 'lm') + K.l(DO[0], 50, DO[0], 214, 'lm') + K.c(DO[0], DO[1], 4, 'fk') + K.t(DO[0] - 6, DO[1] + 14, 'O', 's', 'end');
      h += K.t(236, 52, 'x', 's tm') + K.t(302, 52, 'y', 's tm');
      p.fl.forEach(([r, g, n], i) => {
        const T = K.at(DO[0], DO[1], r * DS, g), N = K.at(DO[0], DO[1], r * DS + 13, g), s = slotD(2 * i);
        h += K.ar(DO[0], DO[1], T[0], T[1], 'la gr') + K.arc(DO[0], DO[1], 14 + 8 * i, 0, g, 'lm');
        h += K.t(8, 16 + 18 * i, `${n}: ${r} ${p.uni} con dirección ${g}°`, 's ta', 'start') + K.t(N[0], N[1] + 5, n, 's ta');
        h += K.t(s.x - s.w / 2 - 6, s.y + 5, `${n}`, 'ta', 'end');
        h += K.f(f, K.l(DO[0], DO[1], T[0], DO[1], 'lf d') + K.l(T[0], DO[1], T[0], T[1], 'lf d'));
      });
      return h + K.f(f, K.t(236 + 33, 210, 'x = r·cos θ,  y = r·sen θ', 's tm'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------------ coordenadas respecto a otra base no paralela
  // La rejilla inclinada es la de e₁ y e₂; se eligen a y b con dos reglas. Al comprobar, a·e₁ y luego b·e₂ se dibujan desde O.
  //   params { e1, e2, Q, a, b, ini: { a, b }, et, trampas: { 'a,b': aviso }, ok }   v { a, b }
  const PB = plano({ x0: -4, x1: 4, y0: -2, y1: 8 }, 102, 158, 18);
  // Tramo de la recta Pt + t·d que cae dentro del papel (en unidades), o null.
  const corta = (Pt, d, B) => {
    let t0 = -1e9, t1 = 1e9;
    for (const [p0, dd, lo, hi] of [[Pt[0], d[0], B.x0, B.x1], [Pt[1], d[1], B.y0, B.y1]]) {
      if (Math.abs(dd) < 1e-12) { if (p0 < lo || p0 > hi) return null; continue; }
      const a = (lo - p0) / dd, b = (hi - p0) / dd; t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
    }
    return t1 > t0 ? [[Pt[0] + t0 * d[0], Pt[1] + t0 * d[1]], [Pt[0] + t1 * d[0], Pt[1] + t1 * d[1]]] : null;
  };
  const llega = (v, p) => [v.a * p.e1[0] + v.b * p.e2[0], v.a * p.e1[1] + v.b * p.e2[1]];
  XG.figura('coordenadas-en-otra-base', {
    ini: p => ({ ...p.ini }),
    manijas: () => [{ k: 'a', min: -4, max: 4, paso: 1, et: 'a: las veces de e₁' }, { k: 'b', min: -4, max: 4, paso: 1, et: 'b: las veces de e₂' }],
    ok: (v, p) => v.a === p.a && v.b === p.b,
    sol: p => ({ a: p.a, b: p.b }),
    texto: p => `$Q = ${p.a}\\,${p.base?.[0] || '\\vec e_1'} ${p.b < 0 ? '-' : '+'} ${Math.abs(p.b)}\\,${p.base?.[1] || '\\vec e_2'}$: en esa base, $Q$ tiene coordenadas $(${p.a}, ${p.b})$`,
    alto: () => 300,
    dib(v, K, p, f) {
      let h = '';
      for (let t = -12; t <= 12; t++) for (const [Pt, d] of [[[t * p.e2[0], t * p.e2[1]], p.e1], [[t * p.e1[0], t * p.e1[1]], p.e2]]) {
        const s = corta(Pt, d, PB); if (s) { const A = P2(PB, s[0]), B = P2(PB, s[1]); h += K.l(A[0], A[1], B[0], B[1], 'ls'); }
      }
      h += ejes(K, PB);
      const O = P2(PB, [0, 0]), E1 = P2(PB, p.e1), E2 = P2(PB, p.e2), Q = P2(PB, p.Q);
      h += K.ar(O[0], O[1], E1[0], E1[1], 'la gr') + K.ar(O[0], O[1], E2[0], E2[1], 'la gr') + K.c(O[0], O[1], 4, 'fk')
        + K.t(E1[0] + 6, E1[1] + 4, 'e₁', 's ta', 'start') + K.t(E2[0] - 6, E2[1], 'e₂', 's ta', 'end')
        + K.c(Q[0], Q[1], 5, 'fk') + K.t(Q[0] + 9, Q[1] + 4, 'Q', 's', 'start');
      h += K.t(190, 30, `${p.et}`, 's tm', 'start') + K.t(190, 54, `e₁ = (${sg(p.e1[0])}, ${sg(p.e1[1])})`, 's ta', 'start')
        + K.t(190, 74, `e₂ = (${sg(p.e2[0])}, ${sg(p.e2[1])})`, 's ta', 'start') + K.t(190, 94, `Q = (${sg(p.Q[0])}, ${sg(p.Q[1])})`, 's', 'start')
        + K.t(190, 122, 'a·e₁ + b·e₂ = Q', 's tm', 'start');
      if (f > 0) {
        const w = llega(v, p), ok = v.a === p.a && v.b === p.b;
        h += cadena(K, PB, [0, 0], [...repite(v.a, p.e1), ...repite(v.b, p.e2)], f, 'lf gr');
        const E = P2(PB, w);
        h += K.f(f * 3 - 2, K.c(cl(E[0], 8, 332), cl(E[1], 8, 200), 6, ok ? 'fo' : 'ff') + K.t(190, 152, `${sg(v.a)}·e₁ + ${sg(v.b)}·e₂`, 's', 'start')
          + K.t(190, 172, `= (${sg(w[0])}, ${sg(w[1])}) ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'start'));
      }
      return h;
    },
    lee: (v, p) => { const w = llega(v, p); return `$${v.a}\\,\\vec e_1 ${v.b < 0 ? '-' : '+'} ${Math.abs(v.b)}\\,\\vec e_2 = (${w[0]}, ${w[1]})$`; },
    aviso(v, p) {
      const t = p.trampas?.[`${v.a},${v.b}`]; if (t) return t;
      const w = llega(v, p);
      if (w[0] === p.Q[0]) return `Con esos números llegas a (${sg(w[0])}, ${sg(w[1])}): la x ya coincide con la de Q, la y no. Plantea las dos ecuaciones a la vez.`;
      if (w[1] === p.Q[1]) return `Con esos números llegas a (${sg(w[0])}, ${sg(w[1])}): la y ya coincide con la de Q, la x no. Plantea las dos ecuaciones a la vez.`;
      return `Con esos números llegas a (${sg(w[0])}, ${sg(w[1])}), no a Q. Cuenta los pasos en la rejilla inclinada o iguala componente a componente.`;
    },
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------------------------------------- un punto del espacio, (x, y, z)
  // Piso con x hacia el frente, y hacia la derecha y z hacia arriba. Se arrastra la sombra por el piso y el dron hacia arriba.
  //   params { P: [x, y, z], uni, que, ini, mira: { cambia, signo, altura, otro }, ok }   v { x, y, z }
  const E3 = { ox: 165, oy: 165, u: 26 };
  const pr = (x, y, z) => [E3.ox + E3.u * y - 0.5 * E3.u * x, E3.oy + 0.45 * E3.u * x - E3.u * z];
  const octante = P => `x ${P[0] > 0 ? '>' : '<'} 0, y ${P[1] > 0 ? '>' : '<'} 0, z ${P[2] > 0 ? '>' : '<'} 0`;
  XG.figura('dron-en-el-espacio', {
    ini: p => ({ x: p.ini[0], y: p.ini[1], z: p.ini[2] }),
    manijas: () => [
      { k: ['x', 'y'], min: [-2, -3], max: [4, 4], paso: 1, en: v => pr(v.x, v.y, 0), de: (X, Y) => { const x = (Y - E3.oy) / (0.45 * E3.u); return [x, (X - E3.ox + 0.5 * E3.u * x) / E3.u]; } },
      { k: 'z', min: 1, max: 5, paso: 1, en: v => pr(v.x, v.y, v.z), de: (X, Y, v) => (E3.oy + 0.45 * E3.u * v.x - Y) / E3.u },
    ],
    ok: (v, p) => igual([v.x, v.y, v.z], p.P),
    sol: p => ({ x: p.P[0], y: p.P[1], z: p.P[2] }),
    texto: p => `$P = (${p.P.join(', ')})$: ${p.P.map((c, i) => `$${'xyz'[i]} ${c > 0 ? '\\gt' : '\\lt'} 0$`).join(', ')}`,
    alto: () => 236, pie: 'Arrastra la sombra por el piso y el dron hacia arriba.',
    dib(v, K, p, f) {
      let h = '';
      for (let x = -2; x <= 4; x++) { const a = pr(x, -3, 0), b = pr(x, 4, 0); h += K.l(a[0], a[1], b[0], b[1], 'ls'); }
      for (let y = -3; y <= 4; y++) { const a = pr(-2, y, 0), b = pr(4, y, 0); h += K.l(a[0], a[1], b[0], b[1], 'ls'); }
      const O = pr(0, 0, 0), X1 = pr(5, 0, 0), Y1 = pr(0, 5, 0), Z1 = pr(0, 0, 5.6);
      h += K.ar(O[0], O[1], X1[0], X1[1], 'lm') + K.ar(O[0], O[1], Y1[0], Y1[1], 'lm') + K.ar(O[0], O[1], Z1[0], Z1[1], 'lm')
        + K.t(X1[0] - 8, X1[1] + 6, 'x', 's tm', 'end') + K.t(Y1[0] + 8, Y1[1] + 4, 'y', 's tm', 'start') + K.t(Z1[0] + 8, Z1[1] + 4, 'z', 's tm', 'start');
      for (const k of [2, 4]) { const a = pr(k, 0, 0), b = pr(0, k, 0), c = pr(0, 0, k); h += K.t(a[0] - 8, a[1] + 4, k, 's tm', 'end') + K.t(b[0], b[1] + 14, k, 's tm') + K.t(c[0] - 6, c[1] + 4, k, 's tm', 'end'); }
      const S = pr(v.x, v.y, 0), D = pr(v.x, v.y, v.z), Sx = pr(v.x, 0, 0), Sy = pr(0, v.y, 0);
      h += K.l(S[0], S[1], Sx[0], Sx[1], 'lm d') + K.l(S[0], S[1], Sy[0], Sy[1], 'lm d') + K.l(S[0], S[1], D[0], D[1], 'la d') + K.c(O[0], O[1], 3, 'fk');
      h += K.t(8, 16, `${p.que}: P = (${p.P.map(sg).join(', ')}) ${p.uni}`, 's ta', 'start') + K.t(332, 230, `(${sg(v.x)}, ${sg(v.y)}, ${sg(v.z)})`, 's', 'end');
      if (f > 0) {   // el punto pedido aparece con sus tres caminos
        const ok = igual([v.x, v.y, v.z], p.P), T = pr(...p.P), Ts = pr(p.P[0], p.P[1], 0);
        h += K.f(f * 2, K.l(Ts[0], Ts[1], T[0], T[1], `${ok ? 'lo' : 'lf'} d`) + K.c(T[0], T[1], 8, ok ? 'fo' : 'ff'))
          + K.f(f * 3 - 2, K.t(8, 34, octante(p.P), 's tm', 'start') + K.t(332, 16, ok ? 'ahí está ✓' : 'era otro punto ✗', `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$(${v.x}, ${v.y}, ${v.z}) = ${v.x}\\,\\hat\\imath ${v.y < 0 ? '-' : '+'} ${Math.abs(v.y)}\\,\\hat\\jmath + ${v.z}\\,\\hat k$`,
    aviso(v, p) {
      const [x, y, z] = p.P;
      if (v.x === y && v.y === x && v.z === z) return p.mira.cambia;
      if (v.z === z && (v.x === -x || v.y === -y) && Math.abs(v.x) === Math.abs(x) && Math.abs(v.y) === Math.abs(y)) return p.mira.signo;
      if (v.x === x && v.y === y) return p.mira.altura;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------------------- en movimiento: el dron vuela la distancia fijada
  // Se fija la distancia de A a B y al soltar el dron vuela en línea recta esa distancia; debe frenar justo en B.
  //   tiro { q, A, B (dos o tres números), r, max, cuenta, trampas: { valor: aviso } }
  const pr3 = (q, u) => [u * q[1] - 0.5 * u * q[0], 0.45 * u * q[0] - u * q[2]];
  const escena = t => {
    const d3 = t.A.length === 3;
    if (!d3) {
      const dx = t.B[0] - t.A[0], dy = t.B[1] - t.A[1], s = Math.min(270 / Math.max(1, Math.abs(dx)), 140 / Math.max(1, Math.abs(dy)), 22), m = [(t.A[0] + t.B[0]) / 2, (t.A[1] + t.B[1]) / 2];
      const S = q => [170 + (q[0] - m[0]) * s, 116 - (q[1] - m[1]) * s];
      return { S, esq: [t.A, [t.B[0], t.A[1]], t.B] };
    }
    const esq = [t.A, [t.B[0], t.A[1], t.A[2]], [t.B[0], t.B[1], t.A[2]], t.B], z = esq.map(q => pr3(q, 1));
    const bx = [Math.min(...z.map(q => q[0])), Math.max(...z.map(q => q[0]))], by = [Math.min(...z.map(q => q[1])), Math.max(...z.map(q => q[1]))];
    const u = Math.min(22, 230 / Math.max(1, bx[1] - bx[0]), 134 / Math.max(1, by[1] - by[0])), m = [(bx[0] + bx[1]) / 2, (by[0] + by[1]) / 2];
    const S = q => { const w = pr3(q, 1); return [170 + (w[0] - m[0]) * u, 122 + (w[1] - m[1]) * u]; };
    return { S, esq };
  };
  const nombre = q => `(${q.map(sg).join(', ')})`;
  XG.tiros('vuela-la-distancia', {
    perilla: t => ({ et: 'Distancia de A a B', min: 0, max: t.max, cara: v => v, lee: v => `${v} km` }),
    meta: t => t.r, alto: 210, ms: 1700, pie: 'Fija la distancia y suelta: el dron vuela en línea recta.',
    dib(t, v, K, p, f) {
      const { S, esq } = escena(t), A = S(t.A), B = S(t.B);
      let h = K.pl(esq.map(S), 'ls d') + K.l(A[0], A[1], B[0], B[1], 'lm d') + K.c(A[0], A[1], 5, 'fk') + K.c(B[0], B[1], 6, 'fn');
      h += K.t(A[0] + (A[0] < B[0] ? -8 : 8), A[1] + 4, `A${nombre(t.A)}`, 's', A[0] < B[0] ? 'end' : 'start').replace(/x="(-?[\d.]+)"/, (m0, x) => `x="${cl(+x, 8, 332)}"`);
      h += K.t(B[0] + (A[0] < B[0] ? 8 : -8), B[1] + 4, `B${nombre(t.B)}`, 's', A[0] < B[0] ? 'start' : 'end').replace(/x="(-?[\d.]+)"/, (m0, x) => `x="${cl(+x, 8, 332)}"`);
      if (v == null) return h;
      const g = Math.min(1, f * 1.2), k = v / t.r * g, D = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k], ok = v === t.r;
      h += K.l(A[0], A[1], D[0], D[1], 'la gr') + K.c(D[0], D[1], 7, f >= 1 ? (ok ? 'fo' : 'ff') : 'fA');
      return h + K.f(f * 3 - 2, K.t(332, 16, ok ? `${v} km: frena justo en B ✓` : `${v} km: ${v > t.r ? 'se pasa de B' : 'no llega a B'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} km el dron ${v > t.r ? 'se pasa' : 'se queda antes'}: resta las coordenadas y usa Pitágoras con las componentes.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-12.js
// Geometría Vectorial · juegos de la lección geo-12 «La recta» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(x).replace('-', '−');
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // Fracción n/d reducida, en texto plano (−3/2) y en TeX (-\tfrac{3}{2}).
  const red = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
  const FR = (n, d = 1) => { const [a, b] = red(n, d); return b === 1 ? N(a) : `${a < 0 ? '−' : ''}${Math.abs(a)}/${b}`; };
  const FX = (n, d = 1) => { const [a, b] = red(n, d); return b === 1 ? String(a) : `${a < 0 ? '-' : ''}\\tfrac{${Math.abs(a)}}{${b}}`; };
  const pt = v => `(${v.map(N).join(', ')})`;
  const ptx = v => `(${v.join(', ')})`;
  const mas = (P, d, t) => P.map((x, i) => x + t * d[i]);
  // a + b·t en texto plano (6 − 2t) y en TeX (6 - 2t).
  const lin = (a, b, v = 't', tx = false) => {
    const m = tx ? '-' : '−', s = Math.abs(b) === 1 ? v : `${Math.abs(b)}${v}`;
    if (!b) return tx ? String(a) : N(a);
    if (!a) return b < 0 ? `${m}${s}` : s;
    return `${tx ? a : N(a)} ${b < 0 ? m : '+'} ${s}`;
  };
  // Rejilla del plano con el origen en O y u píxeles por unidad.
  const rej = (K, O, u, [x0, x1, y0, y1]) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  // Tramo de t que deja X = P + t·d dentro de la ventana [x0, x1, y0, y1].
  const ventana = (P, d, [x0, x1, y0, y1]) => {
    let lo = -1e9, hi = 1e9;
    [[x0, x1], [y0, y1]].forEach(([a, b], i) => {
      if (Math.abs(d[i]) < 1e-12) { if (P[i] < a || P[i] > b) { lo = 1; hi = 0; } return; }
      const t1 = (a - P[i]) / d[i], t2 = (b - P[i]) / d[i];
      lo = Math.max(lo, Math.min(t1, t2)); hi = Math.min(hi, Math.max(t1, t2));
    });
    return [lo, hi];
  };
  // Recta X = P + t·d recortada a la ventana.
  const recta = (K, Pp, P, d, win, cls) => { const [lo, hi] = ventana(P, d, win); return hi > lo ? K.l(...Pp(...mas(P, d, lo)), ...Pp(...mas(P, d, hi)), cls) : ''; };
  // Recta a x + b y = c recortada a la ventana.
  const general = (K, Pp, [a, b, c], win, cls) => {
    const P = b !== 0 ? [0, c / b] : [c / a, 0];
    return recta(K, Pp, P, [b, -a], win, cls);
  };

  // ------------------------------------------------------------ dron-por-dos-instantes · la recta por dos puntos, con t como tiempo
  // El dron está en A cuando t = 0 y en B cuando t = T. Se arrastra la punta de su velocidad v (lo que avanza en una unidad de tiempo).
  //   v { a, b }   params { A, B, T, min: [a, b], max: [a, b], ini: [a, b], uni, ok }
  const DO = [170, 110], DU = 22, DW = [-6, 6, -4, 4], DP = (x, y) => [DO[0] + x * DU, DO[1] - y * DU];
  const DS = p => ({ a: (p.B[0] - p.A[0]) / p.T, b: (p.B[1] - p.A[1]) / p.T });
  XG.figura('dron-por-dos-instantes', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => [{ k: ['a', 'b'], min: p.min, max: p.max, paso: 1, en: v => DP(p.A[0] + v.a, p.A[1] + v.b),
      de: (x, y) => [(x - DO[0]) / DU - p.A[0], (DO[1] - y) / DU - p.A[1]] }],
    ok: (v, p) => v.a * p.T === p.B[0] - p.A[0] && v.b * p.T === p.B[1] - p.A[1],
    sol: DS, texto: p => { const s = DS(p); return `$\\vec v = \\dfrac{B - A}{${p.T}} = (${s.a}, ${s.b})$, así que $X = ${ptx(p.A)} + t\\,(${s.a}, ${s.b})$`; },
    alto: () => 220, pie: 'Arrastra la punta de v: lo que avanza el dron en una hora.',
    dib(v, K, p, f) {
      const A = p.A, B = p.B, w = [v.a, v.b];
      let h = rej(K, DO, DU, DW);
      if (f > 0 && (v.a || v.b)) {
        h += K.f(f, recta(K, DP, A, w, DW, 'lm d'));
        for (let t = 1; t <= p.T; t++) {
          const X = mas(A, w, t), [x, y] = DP(...X);
          if (Math.abs(X[0]) <= 6 && Math.abs(X[1]) <= 4) h += K.f(f, K.c(x, y, 5, t === p.T ? (X[0] === B[0] && X[1] === B[1] ? 'fo' : 'ff') : 'fa') + K.t(x + 8, y + 16, `t = ${t}`, 's ta', 'start'));
        }
      }
      h += K.c(...DP(...A), 5, 'fg') + K.t(DP(...A)[0] - 6, DP(...A)[1] + 18, `A · t = 0`, 's tg', 'end');
      h += K.c(...DP(...B), 5, 'fg') + K.t(DP(...B)[0] + 8, DP(...B)[1] - 8, `B · t = ${p.T} h`, 's tg', 'start');
      h += K.ar(...DP(...A), ...DP(A[0] + v.a, A[1] + v.b), 'la gr');
      return h + K.t(14, 16, `v = ${pt(w)} ${p.uni} por hora`, 's ta', 'start');
    },
    lee: (v, p) => `$X(${p.T}) = A + ${p.T}\\vec v = ${ptx(mas(p.A, [v.a, v.b], p.T))}$`,
    aviso(v, p) {
      const D = [p.B[0] - p.A[0], p.B[1] - p.A[1]], X = mas(p.A, [v.a, v.b], p.T), cruz = v.a * D[1] - v.b * D[0], pr = v.a * D[0] + v.b * D[1];
      if (!v.a && !v.b) return 'Con v = (0, 0) el dron no se mueve: se queda siempre en A.';
      if (v.a === D[0] && v.b === D[1]) return `Con v = B − A el dron llega a B en 1 hora, no en ${p.T}: lo que avanza en una hora es (B − A)/${p.T}.`;
      if (!cruz && pr < 0) return 'Esa v apunta de B hacia A: el dron se aleja de B. La velocidad va de A hacia B.';
      if (!cruz) return `Va hacia B, pero a las ${p.T} h estaría en ${pt(X)}: ${pr > D[0] * D[0] + D[1] * D[1] ? 'se pasa' : 'no alcanza'}.`;
      return `A las ${p.T} h el dron estaría en A + ${p.T}v = ${pt(X)}, no en B: la flecha debe apuntar hacia B.`;
    },
    bien: p => p.ok || 'A + T·v = B: el dron llega a B justo a tiempo.',
  });

  // ------------------------------------------------------------ tramo-de-la-rampa · qué parte de la recta da cada intervalo de t
  // X = P + t·d. Se elige «desde» y «hasta» (−4 es −∞ y 4 es +∞); la escena pinta el tramo. Se marcan los puntos de `marcas`.
  //   v { a, b }   params { P, d, a, b, ini: [a, b], marcas: [[t, nombre]], win, ok }
  const TO = [140, 104], TU = 20, TP = (x, y) => [TO[0] + x * TU, TO[1] - y * TU];
  const INF = 4, Ta = a => (a === -INF ? '−∞' : N(a)), Tb = b => (b === INF ? '+∞' : N(b));
  const TI = (a, b, tx) => {
    const le = tx ? '\\le' : '≤', ge = tx ? '\\ge' : '≥', n = tx ? String : N;
    if (a === -INF && b === INF) return tx ? 't \\in \\mathbb{R}' : 't cualquiera';
    if (a === -INF) return `t ${le} ${n(b)}`;
    if (b === INF) return `t ${ge} ${n(a)}`;
    return `${n(a)} ${le} t ${le} ${n(b)}`;
  };
  XG.figura('tramo-de-la-rampa', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: 'a', min: -INF, max: 3, paso: 1, et: 'desde t =', rot: v => Ta(v.a) }, { k: 'b', min: -3, max: INF, paso: 1, et: 'hasta t =', rot: v => Tb(v.b) }],
    ok: (v, p) => v.a === p.a && v.b === p.b, sol: p => ({ a: p.a, b: p.b }),
    texto: p => `$${TI(p.a, p.b, true)}$`, alto: () => 262, pie: 'Desliza desde dónde y hasta dónde va t.',
    dib(v, K, p, f) {
      const W = p.win, [lo, hi] = ventana(p.P, p.d, W);
      let h = rej(K, TO, TU, W) + recta(K, TP, p.P, p.d, W, 'lm');
      if (v.a <= v.b) {
        const a = Math.max(v.a === -INF ? -99 : v.a, lo), b = Math.min(v.b === INF ? 99 : v.b, hi);
        if (b > a) {
          const A = TP(...mas(p.P, p.d, a)), B = TP(...mas(p.P, p.d, b));
          h += v.a === -INF ? K.ar(...B, ...A, 'la gr') : '';
          h += v.b === INF ? K.ar(...A, ...B, 'la gr') : '';
          if (v.a !== -INF && v.b !== INF) h += K.l(...A, ...B, 'la gr');
          if (v.a !== -INF) h += K.c(...A, 4, 'fa');
          if (v.b !== INF) h += K.c(...B, 4, 'fa');
        } else if (v.a === v.b) h += K.c(...TP(...mas(p.P, p.d, v.a)), 4, 'fa');
      }
      h += K.ar(...TP(...p.P), ...TP(...mas(p.P, p.d, 1)), 'lg gr') + K.c(...TP(...p.P), 4, 'fg') + K.t(TP(...p.P)[0] - 4, TP(...p.P)[1] + 16, 'P', 's tg', 'end');
      h += K.t(TP(...mas(p.P, p.d, 1))[0] + 4, TP(...mas(p.P, p.d, 1))[1] + 16, 'd', 's tg', 'start');
      p.marcas.forEach(([t, nom]) => { const [x, y] = TP(...mas(p.P, p.d, t)); h += K.c(x, y, 5, 'fk') + K.t(x - 6, y - 8, nom, 's', 'end'); });
      h += K.t(14, 18, `X = ${pt(p.P)} + t${pt(p.d)}`, 's tm', 'start') + K.t(14, 36, v.a > v.b ? 'ningún t' : TI(v.a, v.b), 's ta', 'start');
      if (f > 0) for (let t = Math.ceil(lo); t <= Math.floor(hi); t++) {
        if (t === 0 || t === 1) continue;
        const [x, y] = TP(...mas(p.P, p.d, t));
        h += K.f(f, K.c(x, y, 2.5, 'fn') + K.t(x + 6, y + 14, `t=${N(t)}`, 's tm', 'start'));
      }
      return h;
    },
    lee: v => (v.a > v.b ? 'Ningún $t$ cumple: el tramo está vacío.' : `$${TI(v.a, v.b, true)}$`),
    aviso(v, p) {
      const X = t => pt(mas(p.P, p.d, t));
      if (v.a > v.b) return `Con «desde ${Ta(v.a)}» y «hasta ${Tb(v.b)}» ningún t cumple: el tramo queda vacío.`;
      if ((v.a === -INF) !== (p.a === -INF) || (v.b === INF) !== (p.b === INF)) {
        if ((v.a === -INF && p.a !== -INF) || (v.b === INF && p.b !== INF)) return `Con ∞ el tramo no se acaba de ese lado: eso es un rayo. ${p.b === INF || p.a === -INF ? 'Mira cuál de los dos lados no tiene fin.' : 'Aquí los dos extremos tienen su t.'}`;
        return 'De ese lado el tramo no se detiene: t sigue sin fin, hasta ∞.';
      }
      if (v.a === 0 && v.b === 1) return 'De t = 0 a t = 1 se va de P a P + d. Aquí los extremos no son esos: busca el t de cada punto marcado.';
      if (v.a === -p.b && v.b === -p.a) return 'Ese tramo queda del otro lado de P: los t negativos van en contra de d.';
      const ex = [v.a === -INF ? 'sigue sin fin hacia atrás' : `con t = ${N(v.a)} estás en ${X(v.a)}`, v.b === INF ? 'sigue sin fin hacia adelante' : `con t = ${N(v.b)} estás en ${X(v.b)}`];
      return `El tramo ${ex[0]} y ${ex[1]}: busca qué t le toca a cada punto marcado.`;
    },
    bien: p => p.ok || 'Ese intervalo de t dibuja justo el tramo pedido.',
  });

  // ------------------------------------------------------------ inclinacion-del-director · ángulo de inclinación y pendiente
  // Se gira una recta que pasa por O; tiene que quedar con la dirección del director d. Al comprobar, d y m = d₂/d₁ = tan θ.
  //   v { g }   params { d, ini, et, ok }
  const IO = [170, 104];
  const IG = p => { let g = Math.atan2(p.d[1], p.d[0]) * 180 / Math.PI; g = ((g % 180) + 180) % 180; return Math.round(g); };
  const tg = g => Math.round(Math.tan(g * Math.PI / 180) * 100) / 100;
  const raya = (K, g, cls, L = 150) => { const c = Math.cos(g * Math.PI / 180), s = Math.sin(g * Math.PI / 180), t = Math.min(L, Math.abs(s) > 1e-9 ? 76 / Math.abs(s) : L, Math.abs(c) > 1e-9 ? 150 / Math.abs(c) : L); return K.l(IO[0] - c * t, IO[1] + s * t, IO[0] + c * t, IO[1] - s * t, cls); };
  XG.figura('inclinacion-del-director', {
    ini: p => ({ g: p.ini }),
    manijas: () => [{ k: 'g', min: 0, max: 165, paso: 15, et: 'θ, ángulo de inclinación', rot: v => `${v.g}°` }],
    ok: (v, p) => v.g === IG(p), sol: p => ({ g: IG(p) }),
    texto: p => { const g = IG(p); return g === 90 ? '$\\theta = 90^{\\circ}$: recta vertical, sin pendiente' : `$m = \\dfrac{d_2}{d_1} = ${FX(p.d[1], p.d[0])} = \\tan ${g}^{\\circ}$, así que $\\theta = ${g}^{\\circ}$`; },
    alto: () => 244, pie: 'Desliza θ para girar la recta.',
    dib(v, K, p, f) {
      let h = K.l(20, IO[1], 320, IO[1], 'lm') + K.l(IO[0], 14, IO[0], 194, 'lm') + K.t(318, IO[1] - 6, 'x', 's tm', 'end');
      h += raya(K, v.g, 'la gr') + K.arc(IO[0], IO[1], 30, 0, v.g, 'la') + K.t(...K.at(IO[0], IO[1] + 5, 46, Math.max(v.g / 2, 8)), 'θ', 's ta');
      h += K.c(...IO, 4, 'fg') + K.t(14, 20, `${p.et}: d = ${pt(p.d)}`, 's tg', 'start');
      if (f > 0) {
        const n = Math.hypot(...p.d), u = 56 / n, q = [IO[0] + p.d[0] * u, IO[1] - p.d[1] * u];
        h += K.f(f, raya(K, IG(p), 'lg d') + K.ar(...IO, ...q, 'lg gr') + K.t(q[0] + (p.d[0] < 0 ? -8 : 8), q[1] - 6, 'd', 's tg', p.d[0] < 0 ? 'end' : 'start'));
        h += K.f(f, K.r(196, 4, 140, 44, 'fc', 8) + K.t(330, 22, p.d[0] ? `m = d₂/d₁ = ${FR(p.d[1], p.d[0])}` : 'd₁ = 0: sin pendiente', 's ta', 'end')
          + K.t(330, 40, v.g === 90 ? 'θ = 90°: vertical' : `tan ${v.g}° ≈ ${N(tg(v.g))}`, 's tm', 'end'));
      }
      return h;
    },
    lee: v => (v.g === 90 ? '$\\theta = 90^{\\circ}$: recta vertical' : `$\\tan ${v.g}^{\\circ} \\approx ${tg(v.g)}$`),
    aviso(v, p) {
      const m = p.d[0] ? p.d[1] / p.d[0] : null;
      if (v.g === 90) return 'Vertical: así d₁ sería 0. Este director avanza en x, así que la recta tiene pendiente.';
      if (v.g === 0) return 'Horizontal: pendiente 0. Este director sube o baja, así que la recta está inclinada.';
      if (m != null && Math.abs(tg(v.g) + m) < 0.02) return `Esa recta tiene pendiente ${N(-m)}: el signo está al revés. Con m = ${FR(p.d[1], p.d[0])} la recta ${m < 0 ? 'baja' : 'sube'} hacia la derecha.`;
      if (m != null && Math.abs(tg(v.g) * m - 1) < 0.02) return `Con θ = ${v.g}°, tan θ ≈ ${N(tg(v.g))}: es d₁/d₂, al revés. La pendiente es lo que sube entre lo que avanza: d₂/d₁.`;
      return `Con θ = ${v.g}°, tan θ ≈ ${N(tg(v.g))}, pero el director pide m = d₂/d₁ = ${FR(p.d[1], p.d[0])}.`;
    },
    bien: p => p.ok || 'tan θ = d₂/d₁: la recta quedó con la dirección de d.',
  });

  // ------------------------------------------------------------ convierte-forma-recta · de la vectorial a las escalares
  // X = P + t·d. Se ponen la pendiente, el intercepto y la forma general a x + b y = c (a > 0, sin factor común).
  //   params { P, d, extra, trampas?, ok }
  const CS = [{ x: 196, y: 60, w: 66, h: 34 }, { x: 196, y: 118, w: 66, h: 34 }, { x: 40, y: 170, w: 50, h: 34 }, { x: 132, y: 170, w: 50, h: 34 }, { x: 232, y: 170, w: 56, h: 34 }];
  const CG = p => { let a = p.d[1], b = -p.d[0]; const g = gcd(a, b) || 1; a /= g; b /= g; if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; } return [a, b, a * p.P[0] + b * p.P[1]]; };
  const CM = p => { const [a, b, c] = CG(p); return [FR(p.d[1], p.d[0]), FR(p.P[1] * p.d[0] - p.d[1] * p.P[0], p.d[0]), N(a), N(b), N(c)]; };
  XG.rotula('convierte-forma-recta', {
    slots: () => CS, metas: CM, fichas: p => [...CM(p), ...p.extra], alto: () => 212,
    texto: p => { const [a, b, c] = CG(p); return `$m = ${FX(p.d[1], p.d[0])}$, $y = ${FX(p.d[1], p.d[0])}x + ${FX(p.P[1] * p.d[0] - p.d[1] * p.P[0], p.d[0])}$ y $${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}y = ${c}$`; },
    fondo(K, p, f) {
      const [a, b, c] = CG(p);
      let h = K.t(14, 24, `X = ${pt(p.P)} + t${pt(p.d)}`, 'ta', 'start');
      h += K.t(150, 65, 'pendiente: m =', 's', 'end') + K.t(14, 94, `despeja y en y − ${N(p.P[1])} = m(x − ${N(p.P[0])}):`, 's tm', 'start') + K.t(150, 123, 'y = mx +', 's', 'end');
      h += K.t(14, 148, 'general:', 's tm', 'start') + K.t(70, 175, 'x +', 's', 'start') + K.t(162, 175, 'y =', 's', 'start');
      return h + K.f(f, K.t(330, 64, `normal (${N(a)}, ${N(b)})`, 's ta', 'end') + K.t(330, 82, `⟂ d = ${pt(p.d)}`, 's tm', 'end')
        + K.t(330, 206, `en ${pt(p.P)}: ${N(a)}·${N(p.P[0])} + ${N(b)}·${N(p.P[1])} = ${N(c)}`, 's ta', 'end'));
    },
    aviso(q, p) {
      const ms = CM(p), i = ms.findIndex((m, k) => q[k][0] !== m);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        'La pendiente es lo que sube el director entre lo que avanza: m = d₂/d₁.',
        'Despeja y: el intercepto es y₀ − m·x₀, con el punto (x₀, y₀) de la recta.',
        'En la general a x + b y = c, el par (a, b) es un normal: (d₂, −d₁) o un múltiplo, aquí con a positivo y sin factor común.',
        'b acompaña a y: con el normal (d₂, −d₁), b = −d₁ (o el mismo múltiplo que usaste para a).',
        'c sale de poner el punto P en a x + b y: c = a·x₀ + b·y₀.'][i];
    },
    bien: p => p.ok || 'Las tres formas describen la misma recta: el punto P las cumple todas.',
  });

  // ------------------------------------------------------------ paralelas-en-otra-forma · paralelas aunque estén escritas distinto
  // Ocho rectas en formas distintas; se tocan las paralelas a la de referencia (director proporcional).
  //   params { ref, md: director de la referencia, rs: [{ t, d }] × 8, por: [aviso de cada una que no es paralela], falta, ok }
  const PC = i => ({ x: 88 + 164 * (i % 2), y: 62 + 42 * Math.floor(i / 2), w: 158, h: 34 });
  const PS = p => p.rs.map((r, i) => (r.d[0] * p.md[1] - r.d[1] * p.md[0] === 0 ? i : -1)).filter(i => i >= 0);
  XG.marca('paralelas-en-otra-forma', {
    sitios: p => p.rs.map((_, i) => PC(i)),
    cara: (K, p, i, on) => { const c = PC(i); return K.t(c.x, c.y + 5, p.rs[i].t, on ? 's ta' : 's'); },
    fondo: (K, p) => K.t(170, 24, `L: ${p.ref}`, 'ta'),
    alto: () => 222, nombre: (p, i) => p.rs[i].t, pie: 'Toca las rectas paralelas a L.',
    sol: PS,
    aviso: (on, p) => { const s = PS(p), i = on.findIndex((o, k) => o && !s.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => PS(p).map(i => p.rs[i].t).join('; '),
  });

  // ------------------------------------------------------------ muelle-perpendicular · perpendicular por un punto, con el normal
  // La costa es a x + b y = c. Desde el faro Q se arrastra la punta del director w del muelle, que debe ser perpendicular a la costa.
  //   v { a, b }   params { L: [a, b, c], Q, ini: [a, b], ok }
  const MO = [170, 100], MU = 20, MW = [-5, 5, -5, 4], MP = (x, y) => [MO[0] + x * MU, MO[1] - y * MU];
  const MS = p => { const [a, b] = p.L, g = gcd(a, b); return { a: a / g, b: b / g }; };
  XG.figura('muelle-perpendicular', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => [{ k: ['a', 'b'], min: -3, max: 3, paso: 1, en: v => MP(p.Q[0] + v.a, p.Q[1] + v.b), de: (x, y) => [(x - MO[0]) / MU - p.Q[0], (MO[1] - y) / MU - p.Q[1]] }],
    ok: (v, p) => (v.a !== 0 || v.b !== 0) && v.a * p.L[1] - v.b * p.L[0] === 0,
    sol: MS, texto: p => { const [a, b] = p.L; return `$\\vec w = (${a}, ${b})$, el normal de la costa (o un múltiplo): $m_1 m_2 = ${FX(-a, b)} \\cdot ${FX(b, a)} = -1$`; },
    alto: () => 214, pie: 'Arrastra la punta de w desde el faro.',
    dib(v, K, p, f) {
      const [a, b, c] = p.L, w = [v.a, v.b];
      let h = rej(K, MO, MU, MW) + general(K, MP, p.L, MW, 'lg gr') + K.t(330, 16, `costa: ${N(a)}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}y = ${N(c)}`, 's tg', 'end');
      if (v.a || v.b) h += recta(K, MP, p.Q, w, MW, 'la d');
      h += K.c(...MP(...p.Q), 5, 'fk') + K.t(MP(...p.Q)[0] - 8, MP(...p.Q)[1] + 18, 'faro', 's', 'end');
      h += K.ar(...MP(...p.Q), ...MP(p.Q[0] + v.a, p.Q[1] + v.b), 'la gr') + K.t(14, 16, `w = ${pt(w)}`, 's ta', 'start');
      if (f > 0) {
        const den = a * v.a + b * v.b;
        if (den !== 0) {
          const s = (c - a * p.Q[0] - b * p.Q[1]) / den, X = mas(p.Q, w, s), [x, y] = MP(...X), ok = v.a * b - v.b * a === 0;
          if (Math.abs(X[0]) <= 5 && X[1] >= -5 && X[1] <= 4) {
            h += K.f(f, K.c(x, y, 5, ok ? 'fo' : 'ff'));
            if (ok) { const n = Math.hypot(a, b), sg = Math.sign(a * p.Q[0] + b * p.Q[1] - c) || 1, e = [sg * a / n * 10, -sg * b / n * 10], g = [b / n * 10, a / n * 10]; h += K.f(f, K.pl([[x + e[0], y + e[1]], [x + e[0] + g[0], y + e[1] + g[1]], [x + g[0], y + g[1]]], 'lo')); }
          }
        }
        h += K.f(f, K.r(14, 176, 182, 32, 'fc', 8) + K.t(22, 196, b && v.a ? `m₁·m₂ = ${FR(-a, b)} · ${FR(v.b, v.a)} = ${FR(-a * v.b, b * v.a)}` : 'una de las dos es vertical', 's ta', 'start'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec w = (${v.a}, ${v.b})$`,
    aviso(v, p) {
      const [a, b] = p.L;
      if (!v.a && !v.b) return 'Con w = (0, 0) no hay dirección: arrastra la punta lejos del faro.';
      if (a * v.a + b * v.b === 0) return `Ese muelle corre paralelo a la costa: w es un director de la costa. El perpendicular sigue al normal (${N(a)}, ${N(b)}).`;
      if (!v.a) return 'Muelle vertical: solo sería perpendicular a una costa horizontal, y esta no lo es.';
      const m1 = -a / b, m2 = v.b / v.a;
      if (b && Math.abs(m2 + m1) < 1e-9) return `Solo cambiaste el signo de la pendiente de la costa (${FR(-a, b)}): también hay que invertirla, para que el producto dé −1.`;
      if (b && Math.abs(m2 * m1 - 1) < 1e-9) return `Solo invertiste la pendiente de la costa (${FR(-a, b)}): falta cambiarle el signo, para que el producto dé −1.`;
      return b ? `Pendientes ${FR(-a, b)} y ${FR(v.b, v.a)}: su producto es ${FR(-a * v.b, b * v.a)}, no −1.` : 'La costa es vertical: el muelle tendría que ser horizontal.';
    },
    bien: p => p.ok || 'w es paralelo al normal de la costa: el muelle llega a ella en ángulo recto.',
  });

  // ------------------------------------------------------------ rutas-aereas-cruzadas · en el espacio: se cortan o se cruzan
  // L₁: P₁ + t·d₁ y L₂: P₂ + s·d₂, con la altura de P₂ igual a k. Las sombras en el piso siempre se cortan; las rutas, solo con un k.
  //   v { k }   params { P1, d1, P2: [x, y, 'k'], d2, min, max, ini, ok }
  const RS = p => {   // t y s donde se cortan las sombras (componentes x, y)
    const [a, b] = [p.d1[0], -p.d2[0]], [c, d] = [p.d1[1], -p.d2[1]], e = p.P2[0] - p.P1[0], g = p.P2[1] - p.P1[1], D = a * d - b * c;
    return [(e * d - b * g) / D, (a * g - e * c) / D];
  };
  const RK = p => { const [t, s] = RS(p); return Math.round(p.P1[2] + t * p.d1[2] - s * p.d2[2]); };
  const R2 = (p, k) => [p.P2[0], p.P2[1], k];
  const RV = (x, y, z) => [x - 0.5 * y, 0.25 * x + 0.35 * y - z];   // x a la derecha, y hacia quien mira, z hacia arriba
  const RF = p => {   // proyección que cabe en el lienzo para todos los k
    const [t, s] = RS(p), pts = [];
    for (let k = p.min; k <= p.max; k++) [-2.5, 2.5].forEach(e => { pts.push(mas(p.P1, p.d1, t + e), mas(R2(p, k), p.d2, s + e)); });
    pts.forEach(q => pts.push([q[0], q[1], 0]));
    const V = pts.map(q => RV(...q)), x0 = Math.min(...V.map(q => q[0])), x1 = Math.max(...V.map(q => q[0])), y0 = Math.min(...V.map(q => q[1])), y1 = Math.max(...V.map(q => q[1]));
    const u = Math.min(300 / (x1 - x0), 150 / (y1 - y0)), ox = 170 - (x0 + x1) / 2 * u, oy = 52 - y0 * u;
    return q => { const [a, b] = RV(...q); return [ox + a * u, oy + b * u]; };
  };
  XG.figura('rutas-aereas-cruzadas', {
    ini: p => ({ k: p.ini }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k: altura de P₂' }],
    ok: (v, p) => v.k === RK(p), sol: p => ({ k: RK(p) }),
    texto: p => { const [t, s] = RS(p); return `$k = ${RK(p)}$: con $t = ${t}$ y $s = ${s}$ las dos rutas pasan por $${ptx(mas(p.P1, p.d1, t))}$`; },
    alto: () => 290, pie: 'Desliza k: sube o baja la ruta L₂.',
    dib(v, K, p, f) {
      const C = RF(p), [t, s] = RS(p), P2 = R2(p, v.k), seg = (P, d, c, cls) => K.l(...C(mas(P, d, c - 2.5)), ...C(mas(P, d, c + 2.5)), cls), piso = q => [q[0], q[1], 0];
      let h = K.l(...C(piso(mas(p.P1, p.d1, t - 2.5))), ...C(piso(mas(p.P1, p.d1, t + 2.5))), 'lm d') + K.l(...C(piso(mas(P2, p.d2, s - 2.5))), ...C(piso(mas(P2, p.d2, s + 2.5))), 'lm d');
      h += K.c(...C(piso(mas(p.P1, p.d1, t))), 3, 'fn') + seg(p.P1, p.d1, t, 'la gr') + seg(P2, p.d2, s, 'lg gr');
      h += K.t(...C(mas(p.P1, p.d1, t + 2.5)).map((q, i) => q + [6, 4][i]), 'L₁', 's ta', 'start') + K.t(...C(mas(P2, p.d2, s + 2.5)).map((q, i) => q + [6, 4][i]), 'L₂', 's tg', 'start');
      h += K.t(14, 18, `L₁: X = ${pt(p.P1)} + t${pt(p.d1)}`, 's ta', 'start') + K.t(14, 36, `L₂: X = ${pt(P2)} + s${pt(p.d2)}`, 's tg', 'start');
      if (f > 0) {
        const A = mas(p.P1, p.d1, t), B = mas(P2, p.d2, s), sh = C(piso(A)), corta = Math.abs(A[2] - B[2]) < 1e-9;
        h += K.f(f, K.l(...sh, ...C(A), 'lf d') + K.l(...sh, ...C(B), 'lf d') + K.c(...C(A), 4, corta ? 'fo' : 'fa') + K.c(...C(B), 4, corta ? 'fo' : 'fg'));
        h += K.f(f, K.t(170, 220, `z₁ = ${N(A[2])}, z₂ = ${N(B[2])}: ${corta ? `se cortan en ${pt(A)}` : 'se cruzan sin tocarse'}`, `s ${corta ? 'to' : 'ta'}`));
      }
      return h;
    },
    lee: (v, p) => { const [t, s] = RS(p); return `$z_1 = ${mas(p.P1, p.d1, t)[2]}$, $z_2 = ${mas(R2(p, v.k), p.d2, s)[2]}$`; },
    aviso(v, p) {
      const [t, s] = RS(p), A = mas(p.P1, p.d1, t), B = mas(R2(p, v.k), p.d2, s);
      return `Con k = ${N(v.k)}: las sombras se cortan con t = ${N(t)} y s = ${N(s)}, pero allí L₁ va a altura ${N(A[2])} y L₂ a ${N(B[2])}. Las rutas se cruzan sin tocarse.`;
    },
    bien: p => p.ok || 'Con ese k las dos rutas pasan por el mismo punto: se cortan.',
  });

  // ------------------------------------------------------------ instante-del-cruce · en movimiento: el t en que se llega a una línea
  // Cada tiro: X = P + t·d (plano o espacio) y una condición «coordenada eje = valor». Se fija t y el móvil avanza hasta X(t).
  //   params { tiros: [{ q, P, d, eje, valor, ver: [dos ejes que se dibujan], linea, r, e? }] }
  const EJ = ['x', 'y', 'z'];
  const IF = t => {   // ventana del tiro
    const pts = []; for (let k = 0; k <= 8; k++) pts.push(mas(t.P, t.d, k));
    const X = pts.map(q => q[t.ver[0]]), Y = pts.map(q => q[t.ver[1]]);
    (t.eje === t.ver[0] ? X : Y).push(t.valor);
    const x0 = Math.min(...X), x1 = Math.max(...X), y0 = Math.min(...Y), y1 = Math.max(...Y), u = Math.min(276 / (x1 - x0 || 1), 112 / (y1 - y0 || 1));
    const ox = 170 - (x0 + x1) / 2 * u, oy = 126 + (y0 + y1) / 2 * u;
    return { C: q => [ox + q[t.ver[0]] * u, oy - q[t.ver[1]] * u], x0, x1, y0, y1, ox, oy, u };
  };
  XG.tiros('instante-del-cruce', {
    perilla: () => ({ et: 't', min: 0, max: 8, cara: v => (v ? String(v) : ''), lee: v => `t = ${v}` }), meta: t => t.r, alto: 200, ms: 1600,
    dib(t, v, K, p, f) {
      const W = IF(t), C = W.C;
      let h = K.l(...C(t.P), ...C(mas(t.P, t.d, 8)), 'lm d');
      for (let k = 0; k <= 8; k++) h += K.c(...C(mas(t.P, t.d, k)), 2.5, 'fn');
      if (t.eje === t.ver[0]) { const x = W.ox + t.valor * W.u; h += K.l(x, 60, x, 192, 'lg gr') + K.t(x + 6, 72, t.linea, 's tg', 'start'); }
      else { const y = W.oy - t.valor * W.u; h += K.l(16, y, 324, y, 'lg gr') + K.t(324, y - 6, t.linea, 's tg', 'end'); }
      h += K.t(...C(t.P).map((q, i) => q + [8, -8][i]), 't = 0', 's tm', 'start');
      h += K.t(14, 20, t.P.length === 3 ? `vista de lado: ejes ${EJ[t.ver[0]]} y ${EJ[t.ver[1]]}` : 'el plano xy', 's tm', 'start');
      if (v != null && v > 0) {
        const s = Math.min(1, f * 1.15), X = mas(t.P, t.d, v * s), [x, y] = C(X), bien = v === t.r;
        h += f >= 1 ? K.c(x, y, 8, bien ? 'fo' : 'ff') + K.t(x, y - 14, pt(mas(t.P, t.d, v)), 's') : K.c(x, y, 7, 'fa');
      } else h += K.c(...C(t.P), 7, 'fa');
      return h;
    },
    falla(t, v) {
      if (t.e?.[v]) return t.e[v];
      const X = mas(t.P, t.d, v), q = X[t.eje], q0 = t.P[t.eje], pasa = (q - t.valor) * (q0 - t.valor) < 0;
      return `A t = ${v} está en ${pt(X)}: ${pasa ? 'ya pasó la línea' : 'todavía no llega'}. Iguala ${EJ[t.eje]} = ${N(t.valor)} y despeja t.`;
    },
    cuenta: t => `$${lin(t.P[t.eje], t.d[t.eje], 't', true)} = ${t.valor} \\Rightarrow t = ${t.r}$`,
    pie: 'Estira hasta el instante y suelta.',
  });
})();
;
//#archivo js/games/gva-escena-13.js
// Geometría Vectorial · juegos de la lección geo-13 «Lugares geométricos e intersecciones» (spec 2026-11-27-curso-geometria-vectorial).
// Un lugar geométrico es el conjunto de puntos que cumplen una condición: la mediatriz (igual distancia a A y a B), la circunferencia
// (‖X − C‖ = r), la circunferencia de diámetro AB, la bisectriz (igual distancia a dos rectas); y las intersecciones de lugares:
// recta con circunferencia (0, 1 o 2 puntos según el discriminante), dos circunferencias (la cuerda común) y el circuncentro.
// Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const sg = n => String(n).replace('-', '−');
  const pt = q => `(${sg(q[0])}, ${sg(q[1])})`;
  const ptx = q => `(${q[0]}, ${q[1]})`;
  const r1 = x => sg(Math.round(x * 10) / 10);
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const igual = (a, b) => a[0] === b[0] && a[1] === b[1];
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // Ecuación a x + b y = c simplificada; en texto plano (−) o en TeX.
  const ecu = (a, b, c, tex = false) => {
    let g = gcd(gcd(Math.abs(a), Math.abs(b)), Math.abs(c)) || 1;
    if (a < 0 || (a === 0 && b < 0)) g = -g;
    [a, b, c] = [a / g, b / g, c / g];
    const m = tex ? '-' : '−', s = [[a, 'x'], [b, 'y']].filter(([k]) => k !== 0).map(([k, n], i) => {
      const t = Math.abs(k) === 1 ? n : `${Math.abs(k)}${n}`;
      return i === 0 ? (k < 0 ? `${m}${t}` : t) : `${k < 0 ? ` ${m} ` : ' + '}${t}`;
    }).join('');
    return `${s} = ${tex ? c : sg(c)}`;
  };
  // (x − h)² en texto plano o en TeX.
  const cuad = (v, h, tex = false) => (h === 0 ? `${v}^2` : `(${v} ${h > 0 ? (tex ? '-' : '−') : '+'} ${Math.abs(h)})^2`);
  const cuadU = (v, h) => (h === 0 ? `${v}²` : `(${v} ${h > 0 ? '−' : '+'} ${Math.abs(h)})²`);
  // Papel con ejes: B = { x0, x1, y0, y1 } en unidades; el (0, 0) cae en (ox, oy) y una unidad mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P, ejes = true) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), ejes && x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), ejes && y === 0 ? 'lm' : 'ls');
    return h;
  };
  // La recta a x + b y = c recortada al papel.
  const recta = (K, P, a, b, c, cls) => {
    const q = [], e = 1e-9;
    if (b) for (const x of [P.x0, P.x1]) { const y = (c - a * x) / b; if (y >= P.y0 - e && y <= P.y1 + e) q.push([x, y]); }
    if (a) for (const y of [P.y0, P.y1]) { const x = (c - b * y) / a; if (x >= P.x0 - e && x <= P.x1 + e) q.push([x, y]); }
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    return K.l(...P2(P, q[0]), ...P2(P, q.at(-1)), cls);
  };
  const punto = (K, P, q, s, cls = 'fk', dx = 8, dy = -8, a = 'start') => { const [x, y] = P2(P, q); return K.c(x, y, 4.5, cls) + (s ? K.t(x + dx, y + dy, s, 's', a) : ''); };
  const manijaPunto = (P, ks, et) => ({ k: ks, min: [P.x0, P.y0], max: [P.x1, P.y1], paso: 1, rot: () => et,
    en: v => [P.X(v[ks[0]]), P.Y(v[ks[1]])], de: (x, y) => [(x - P.ox) / P.u, (P.oy - y) / P.u] });
  // Mediatriz de AB: 2(B − A)·X = ‖B‖² − ‖A‖², como a x + b y = c.
  const mediatriz = (A, B) => [2 * (B[0] - A[0]), 2 * (B[1] - A[1]), B[0] ** 2 + B[1] ** 2 - A[0] ** 2 - A[1] ** 2];

  // ------------------------------------------------------------------ la mediatriz como lugar: el pozo de los dos pueblos
  // Se arrastra el pozo P; debe quedar sobre la carretera y = c y a igual distancia de A y de B. Al comprobar aparecen los dos
  // compases (PA y PB) y la mediatriz entera.   v { x, y }
  //   params { A, B, c, ini, et: [nombre de A, de B], mira: { carretera, medio, mediatriz, otro }, ok }
  const PE = plano({ x0: 0, x1: 10, y0: 0, y1: 7 }, 50, 212, 24);
  const pozo = p => { const [a, b, c] = mediatriz(p.A, p.B); return [(c - b * p.c) / a, p.c]; };
  XG.figura('pozo-equidistante', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [manijaPunto(PE, ['x', 'y'], 'P')],
    ok: (v, p) => v.y === p.c && d2([v.x, v.y], p.A) === d2([v.x, v.y], p.B),
    sol: p => { const q = pozo(p); return { x: q[0], y: q[1] }; },
    texto: p => { const q = pozo(p); return `el punto $${ptx(q)}$: está sobre la vía y en la mediatriz $${ecu(...mediatriz(p.A, p.B), true)}$`; },
    alto: () => 236, pie: 'Arrastra el pozo P.',
    dib(v, K, p, f) {
      const P = [v.x, v.y], ok = v.y === p.c && d2(P, p.A) === d2(P, p.B), Pp = P2(PE, P), A = P2(PE, p.A), B = P2(PE, p.B);
      let h = papel(K, PE) + K.l(PE.X(PE.x0), PE.Y(p.c), PE.X(PE.x1), PE.Y(p.c), 'lm gr') + K.t(PE.X(PE.x1), PE.Y(p.c) + 18, 'carretera', 's tm', 'end');
      h += K.l(Pp[0], Pp[1], A[0], A[1], 'lm d') + K.l(Pp[0], Pp[1], B[0], B[1], 'lm d');
      h += punto(K, PE, p.A, `${p.et[0]} ${pt(p.A)}`) + punto(K, PE, p.B, `${p.et[1]} ${pt(p.B)}`);
      if (f > 0) {   // los dos compases se abren desde A y desde B hasta P, y aparece la mediatriz
        const g = Math.min(1, f * 1.5), ra = Math.sqrt(d2(P, p.A)) * PE.u, rb = Math.sqrt(d2(P, p.B)) * PE.u;
        const aa = Math.atan2(A[1] - Pp[1], Pp[0] - A[0]) * 180 / Math.PI, ab = Math.atan2(B[1] - Pp[1], Pp[0] - B[0]) * 180 / Math.PI;
        h += K.arc(A[0], A[1], ra, aa - 12 * g, aa + 12 * g, 'lg gr') + K.arc(B[0], B[1], rb, ab - 12 * g, ab + 12 * g, 'lf gr');
        h += K.f(f * 2 - 1, recta(K, PE, ...mediatriz(p.A, p.B), 'la d'));
        h += K.f(f * 3 - 2, K.t(332, 16, `PA² = ${d2(P, p.A)}, PB² = ${d2(P, p.B)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$PA^2 = ${d2([v.x, v.y], p.A)}$ y $PB^2 = ${d2([v.x, v.y], p.B)}$`,
    aviso(v, p) {
      const P = [v.x, v.y], eq = d2(P, p.A) === d2(P, p.B);
      if (v.y === p.c) return p.mira.carretera;
      if (eq) return igual([2 * v.x, 2 * v.y], [p.A[0] + p.B[0], p.A[1] + p.B[1]]) ? p.mira.medio : p.mira.mediatriz;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ la ecuación de la mediatriz, con fichas
  // A y B en el papel; se arrastran el punto medio, el vector B − A y la ecuación. Al comprobar se dibujan M, la flecha AB y la recta.
  //   params { A, B, fichas, metas: [M, B − A, ecuación], mira: [3], trampas, ok }
  const PM = plano({ x0: -3, x1: 6, y0: 0, y1: 7 }, 16 + 3 * 20, 200, 20);
  const slotM = i => ({ x: 268, y: 60 + 62 * i, w: 120, h: 36 });
  const ROT_M = ['punto medio M', 'el vector B − A', 'la mediatriz'];
  XG.rotula('mediatriz-en-fichas', {
    slots: p => p.metas.map((_, i) => slotM(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 216,
    texto: p => `$M = ${ptx([(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2])}$, $B - A = ${ptx([p.B[0] - p.A[0], p.B[1] - p.A[1]])}$ y la mediatriz $${ecu(...mediatriz(p.A, p.B), true)}$`,
    fondo(K, p, f) {
      const A = P2(PM, p.A), B = P2(PM, p.B), M = [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2], Mp = P2(PM, M);
      let h = papel(K, PM) + K.l(A[0], A[1], B[0], B[1], 'lm') + punto(K, PM, p.A, `A ${pt(p.A)}`, 'fk', 8, 16) + punto(K, PM, p.B, `B ${pt(p.B)}`, 'fk', -8, -8, 'end');
      ROT_M.forEach((s, i) => { const z = slotM(i); h += K.t(z.x - z.w / 2, z.y - z.h / 2 - 6, s, 's tm', 'start'); });
      if (f > 0) h += K.f(f * 2, K.ar(A[0], A[1], B[0], B[1], 'lg gr')) + K.f(f * 2 - 0.5, K.c(Mp[0], Mp[1], 5, 'fA'))
        + K.f(f * 2 - 1, recta(K, PM, ...mediatriz(p.A, p.B), 'la gr'));
      return h;
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------ la circunferencia escondida en x² + y² + Dx + Ey + F = 0
  // Se arrastra el centro C y se fija el radio con la regla; la circunferencia del estudiante se ve. Al comprobar aparece la de la
  // ecuación, completada en cuadrados.   v { x, y, r }
  //   params { D, E, F, ini: { x, y, r }, rmax, et, mira: { signo, mitad, radio, otro }, trampas: { r: aviso }, ok }
  const PC = plano({ x0: -4, x1: 9, y0: -7, y1: 3 }, 30 + 4 * 18, 36 + 3 * 18, 18);
  const centro = p => [-p.D / 2, -p.E / 2];
  const radio2 = p => p.D * p.D / 4 + p.E * p.E / 4 - p.F;
  const general = p => { const t = (k, s) => (k === 0 ? '' : ` ${k < 0 ? '−' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}${s}`); return `x² + y²${t(p.D, 'x')}${t(p.E, 'y')}${t(p.F, '')} = 0`; };
  XG.figura('centro-y-radio-escondidos', {
    ini: p => ({ ...p.ini }),
    manijas: p => [manijaPunto(PC, ['x', 'y'], 'C'), { k: 'r', min: 1, max: p.rmax, paso: 1, et: `radio r, en ${p.uni}` }],
    ok: (v, p) => igual([v.x, v.y], centro(p)) && v.r * v.r === radio2(p),
    sol: p => { const c = centro(p); return { x: c[0], y: c[1], r: Math.sqrt(radio2(p)) }; },
    texto: p => { const [h, k] = centro(p); return `$${cuad('x', h, true)} + ${cuad('y', k, true)} = ${radio2(p)}$: centro $${ptx([h, k])}$ y radio $${Math.sqrt(radio2(p))}$`; },
    alto: () => 274, pie: 'Arrastra el centro C y fija el radio.',
    dib(v, K, p, f) {
      const [h, k] = centro(p), C = P2(PC, [v.x, v.y]), ok = igual([v.x, v.y], [h, k]) && v.r * v.r === radio2(p);
      let s = papel(K, PC) + K.t(8, 18, p.et, 's', 'start') + K.t(332, 18, general(p), 's ta', 'end');
      s += K.arc(C[0], C[1], v.r * PC.u, 0, 360, 'la gr');
      if (f > 0) {   // la circunferencia de la ecuación se dibuja desde su centro
        const Q = P2(PC, [h, k]), R = Math.sqrt(radio2(p)) * PC.u;
        s += K.arc(Q[0], Q[1], R, 90, 90 + 360 * Math.min(1, f * 1.3), `${ok ? 'lo' : 'lf'} gr d`) + K.c(Q[0], Q[1], 4, ok ? 'fo' : 'ff');
        s += K.f(f * 3 - 2, K.t(332, 36, `${cuadU('x', h)} + ${cuadU('y', k)} = ${radio2(p)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return s;
    },
    lee: v => `Tu circunferencia: $${cuad('x', v.x, true)} + ${cuad('y', v.y, true)} = ${v.r * v.r}$`,
    aviso(v, p) {
      const [h, k] = centro(p);
      if (igual([v.x, v.y], [-h, -k])) return p.mira.signo;
      if (igual([v.x, v.y], [-p.D, -p.E])) return p.mira.mitad;
      if (igual([v.x, v.y], [h, k])) return p.trampas?.[v.r] || p.mira.radio;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ la circunferencia de diámetro AB: las bancas del borde
  // El sendero AB es un diámetro del parque redondo; se tocan las bancas que quedan justo en el borde.
  //   params { A, B, pts: [[x, y] × 8], por: [aviso de cada banca que no va], falta, ok }
  const PB = plano({ x0: 0, x1: 10, y0: 0, y1: 10 }, 64, 234, 21);
  const enBorde = (p, q) => 4 * d2(q, [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2]) === d2(p.A, p.B);
  const delBorde = p => p.pts.map((q, i) => (enBorde(p, q) ? i : -1)).filter(i => i >= 0);
  XG.marca('bancas-del-diametro', {
    sitios: p => p.pts.map(q => { const [x, y] = P2(PB, q); return { x, y, w: 24, h: 24, red: true }; }),
    cara: (K, p, i) => { const [x, y] = P2(PB, p.pts[i]); return K.t(x, y + 4, i + 1, 's'); },
    fondo: (K, p) => { const A = P2(PB, p.A), B = P2(PB, p.B); return papel(K, PB) + K.l(A[0], A[1], B[0], B[1], 'lm gr') + punto(K, PB, p.A, `A ${pt(p.A)}`, 'fk', 8, 16) + punto(K, PB, p.B, `B ${pt(p.B)}`, 'fk', -10, -6, 'end') + K.t(8, 16, 'sendero AB = diámetro', 's tm', 'start'); },
    alto: () => 246, nombre: (p, i) => `banca ${i + 1} en ${pt(p.pts[i])}`, pie: 'Toca las bancas que están en el borde del parque.',
    sol: p => delBorde(p),
    aviso: (on, p) => { const s = delBorde(p), i = on.findIndex((o, k) => o && !s.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => { const M = [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2]; return `las bancas ${delBorde(p).map(i => i + 1).join(', ')}: a distancia $${Math.sqrt(d2(p.A, p.B)) / 2}$ de $M = ${ptx(M)}$`; },
  });

  // ------------------------------------------------------------------ la bisectriz como lugar: la lámpara entre dos muros
  // El piso y un muro inclinado salen de la esquina O con dirección w; se arrastra la lámpara P. Debe estar a la misma distancia de los
  // dos muros y a la altura pedida. Al comprobar se ven las dos distancias y la bisectriz.   v { x, y }
  //   params { W: dirección del muro, h, ini, mira: { suma, altura, cerca, lejos, otro }, ok }
  const PL = plano({ x0: 0, x1: 13, y0: 0, y1: 8 }, 32, 206, 20);
  const LW = p => Math.hypot(p.W[0], p.W[1]);
  const aMuro = (p, q) => Math.abs(p.W[1] * q[0] - p.W[0] * q[1]) / LW(p);
  const lampara = p => [p.h * (LW(p) + p.W[0]) / p.W[1], p.h];
  const muroFin = p => { const k = Math.min(PL.x1 / p.W[0], PL.y1 / p.W[1]); return [p.W[0] * k, p.W[1] * k]; };
  const pie = (p, q) => { const L2 = LW(p) ** 2, t = (q[0] * p.W[0] + q[1] * p.W[1]) / L2; return [t * p.W[0], t * p.W[1]]; };
  XG.figura('lampara-bisectriz', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [manijaPunto(PL, ['x', 'y'], 'P')],
    ok: (v, p) => igual([v.x, v.y], lampara(p)),
    sol: p => { const q = lampara(p); return { x: q[0], y: q[1] }; },
    texto: p => { const q = lampara(p); return `la lámpara en $${ptx(q)}$: a $${p.h}$ del piso y a $${p.h}$ del muro, sobre la bisectriz`; },
    alto: () => 228, pie: 'Arrastra la lámpara P.',
    dib(v, K, p, f) {
      const O = P2(PL, [0, 0]), E = P2(PL, muroFin(p)), Q = [v.x, v.y], Qp = P2(PL, Q), ok = igual(Q, lampara(p));
      let h = papel(K, PL, false) + K.l(O[0], O[1], PL.X(PL.x1), O[1], 'lm gr') + K.l(O[0], O[1], E[0], E[1], 'lm gr');
      h += K.t(PL.X(PL.x1), O[1] + 16, 'piso', 's tm', 'end') + K.t(E[0] + 8, E[1] + 12, 'muro', 's tm', 'start') + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 16, 'O', 's', 'end');
      h += K.t(332, 16, `muro: dirección ${pt(p.W)}`, 's tm', 'end');
      if (f > 0) {   // las dos distancias bajan desde P y aparece la bisectriz
        const g = Math.min(1, f * 1.5), F1 = P2(PL, [v.x, 0]), F2 = P2(PL, pie(p, Q));
        const tr = (Z, c) => K.l(Qp[0], Qp[1], Qp[0] + (Z[0] - Qp[0]) * g, Qp[1] + (Z[1] - Qp[1]) * g, c);
        h += tr(F1, 'lg gr') + tr(F2, 'lf gr');
        const b = lampara(p), kb = Math.min(PL.x1 / b[0], PL.y1 / b[1]), Bf = P2(PL, [b[0] * kb, b[1] * kb]);
        h += K.f(f * 2 - 1, K.l(O[0], O[1], Bf[0], Bf[1], 'la d'));
        h += K.f(f * 3 - 2, K.t(332, 34, `al piso: ${r1(v.y)}, al muro: ${r1(aMuro(p, Q))} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `Distancia al piso: $${v.y}$; al muro: $${r1(aMuro(p, [v.x, v.y])).replace('−', '-')}$`,
    aviso(v, p) {
      const Q = [v.x, v.y], dm = aMuro(p, Q), eq = Math.abs(dm - v.y) < 1e-9 && p.W[1] * v.x - p.W[0] * v.y >= 0;
      if (v.x > 0 && p.W[1] * v.x === (1 + p.W[0]) * v.y) return p.mira.suma;
      if (eq) return p.mira.altura;
      if (v.y === p.h) return dm < p.h ? p.mira.cerca : p.mira.lejos;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ recta con circunferencia: el roce de la carretera
  // La circunferencia x² + y² = R2 y la recta y = m x + b; se desliza b. Al comprobar, el discriminante y los cortes.   v { b }
  //   params { R2, m: [numerador, denominador], b, bmax, ini, et, mira: { dos, nada }, ok }
  const PR = plano({ x0: -7, x1: 7, y0: -5, y1: 9 }, 72 + 7 * 14, 46 + 9 * 14, 14);
  const pend = p => p.m[0] / p.m[1];
  // (1 + m²) x² + 2 m b x + b² − R2 = 0
  const cortes = (p, b) => {
    const m = pend(p), A = 1 + m * m, B = 2 * m * b, C = b * b - p.R2, D = B * B - 4 * A * C;
    if (D < -1e-9) return { D, xs: [] };
    if (Math.abs(D) < 1e-9) return { D: 0, xs: [-B / (2 * A)] };
    return { D, xs: [(-B - Math.sqrt(D)) / (2 * A), (-B + Math.sqrt(D)) / (2 * A)] };
  };
  const recM = p => { const a = p.m[0] === 1 ? 'x' : `${p.m[0]}x`; return `y = ${p.m[1] === 1 ? a : `${a}/${p.m[1]}`} + b`; };
  XG.figura('recta-toca-circulo', {
    ini: p => ({ b: p.ini }),
    manijas: p => [{ k: 'b', min: 0, max: p.bmax, paso: 1, et: 'b, la altura donde la carretera corta el eje y' }],
    ok: (v, p) => cortes(p, v.b).xs.length === 1,
    sol: p => ({ b: p.b }),
    texto: p => { const c = cortes(p, p.b), x = c.xs[0]; return `$b = ${p.b}$: el discriminante es 0 y la carretera toca en un solo punto, $${ptx([x, pend(p) * x + p.b])}$`; },
    alto: () => 300,
    dib(v, K, p, f) {
      const O = P2(PR, [0, 0]), m = pend(p), c = cortes(p, v.b), n = c.xs.length;
      let h = papel(K, PR) + K.arc(O[0], O[1], Math.sqrt(p.R2) * PR.u, 0, 360, 'lg gr') + K.c(O[0], O[1], 3.5, 'fk');
      h += K.t(8, 16, p.et, 's tg', 'start') + K.t(332, 16, recM(p), 's ta', 'end');
      h += recta(K, PR, -p.m[0], p.m[1], p.m[1] * v.b, 'la gr');
      if (f > 0) {   // los cortes aparecen y se dice cuántos son
        h += c.xs.map(x => { const q = P2(PR, [x, m * x + v.b]); return K.c(q[0], q[1], 5 * Math.min(1, f * 1.6), n === 1 ? 'fo' : 'ff'); }).join('');
        h += K.f(f * 3 - 2, K.t(332, 34, `Δ ${c.D > 1e-9 ? '>' : c.D < -1e-9 ? '<' : '='} 0: ${n === 1 ? 'un punto, tangente ✓' : n ? 'dos puntos ✗' : 'ningún punto ✗'}`, `s ${n === 1 ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => { const c = cortes(p, v.b); return `Con $b = ${v.b}$ el discriminante ${c.D > 1e-9 ? 'es positivo: dos cortes' : c.D < -1e-9 ? 'es negativo: ningún corte' : 'es cero: un solo punto'}`; },
    aviso: (v, p) => (cortes(p, v.b).xs.length === 2 ? p.mira.dos : p.mira.nada),
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ dos circunferencias: la cuerda común de dos antenas
  // Se ve la cobertura de la antena 1; la antena 2 está marcada con su radio. Se arrastran P y Q a los dos puntos que están en los
  // dos bordes. Al comprobar aparecen el borde de la antena 2 y la cuerda común (la recta que sale al restar las ecuaciones).
  //   v { px, py, qx, qy }   params { C1, r1, C2, r2, ini: [[x, y], [x, y]], et: [antena 1, antena 2], uni, mira: { uno, igual, primera, otro }, ok }
  const PD = plano({ x0: -6, x1: 10, y0: -6, y1: 6 }, 34 + 6 * 17, 44 + 6 * 17, 17);
  const enC = (q, C, r) => d2(q, C) === r * r;
  const cruces = p => { const out = []; for (let x = PD.x0; x <= PD.x1; x++) for (let y = PD.y0; y <= PD.y1; y++) if (enC([x, y], p.C1, p.r1) && enC([x, y], p.C2, p.r2)) out.push([x, y]); return out; };
  const comun = p => [2 * (p.C2[0] - p.C1[0]), 2 * (p.C2[1] - p.C1[1]), p.C2[0] ** 2 + p.C2[1] ** 2 - p.C1[0] ** 2 - p.C1[1] ** 2 + p.r1 * p.r1 - p.r2 * p.r2];
  const bueno = (p, q) => enC(q, p.C1, p.r1) && enC(q, p.C2, p.r2);
  XG.figura('cuerda-de-dos-antenas', {
    ini: p => ({ px: p.ini[0][0], py: p.ini[0][1], qx: p.ini[1][0], qy: p.ini[1][1] }),
    manijas: () => [manijaPunto(PD, ['px', 'py'], 'P'), manijaPunto(PD, ['qx', 'qy'], 'Q')],
    ok: (v, p) => { const P = [v.px, v.py], Q = [v.qx, v.qy]; return !igual(P, Q) && bueno(p, P) && bueno(p, Q); },
    sol: p => { const [a, b] = cruces(p); return { px: a[0], py: a[1], qx: b[0], qy: b[1] }; },
    texto: p => { const [a, b] = cruces(p); return `los cruces son $${ptx(a)}$ y $${ptx(b)}$, sobre la cuerda común $${ecu(...comun(p), true)}$`; },
    alto: () => 272, pie: 'Arrastra P y Q a los puntos que están en los dos bordes.',
    dib(v, K, p, f) {
      const C1 = P2(PD, p.C1), C2 = P2(PD, p.C2), P = [v.px, v.py], Q = [v.qx, v.qy], ok = !igual(P, Q) && bueno(p, P) && bueno(p, Q);
      let h = papel(K, PD) + K.arc(C1[0], C1[1], p.r1 * PD.u, 0, 360, 'lg gr');
      h += K.c(C1[0], C1[1], 4.5, 'fk') + K.t(C1[0] - 6, C1[1] + 16, p.et[0], 's tg', 'end') + K.c(C2[0], C2[1], 4.5, 'fk') + K.t(C2[0] + 6, C2[1] + 16, p.et[1], 's tf', 'start');
      h += K.t(8, 14, `${p.et[0]}: centro ${pt(p.C1)}, radio ${p.r1}`, 's tg', 'start') + K.t(8, 31, `${p.et[1]}: centro ${pt(p.C2)}, radio ${p.r2}`, 's tf', 'start');
      if (f > 0) {   // el borde de la antena 2 se traza y aparece la cuerda común
        h += K.arc(C2[0], C2[1], p.r2 * PD.u, 90, 90 + 360 * Math.min(1, f * 1.3), 'lf gr');
        h += K.f(f * 2 - 1, recta(K, PD, ...comun(p), 'la d'));
        h += K.f(f * 3 - 2, K.t(332, PD.Y(PD.y0) + 16, `cuerda común: ${ecu(...comun(p))} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => { const P = [v.px, v.py], Q = [v.qx, v.qy]; return `$P$: distancias al cuadrado $${d2(P, p.C1)}$ y $${d2(P, p.C2)}$; $Q$: $${d2(Q, p.C1)}$ y $${d2(Q, p.C2)}$`; },
    aviso(v, p) {
      const P = [v.px, v.py], Q = [v.qx, v.qy];
      if (igual(P, Q)) return p.mira.igual;
      if (bueno(p, P) !== bueno(p, Q)) return p.mira.uno;
      if (enC(P, p.C1, p.r1) && enC(Q, p.C1, p.r1)) return p.mira.primera;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ en movimiento: el alcance de una antena
  // Se fija el radio y al soltar la señal se abre desde la antena; llega justo a las casas o se pasa.
  //   tiro { q, C: antena, casas: [[x, y, nombre]], r, max, sc: píxeles por unidad, eq?: texto, trampas, cuenta }
  const AC = [170, 112];
  XG.tiros('onda-de-antena', {
    perilla: t => ({ et: 'radio de la señal (km)', min: 0, max: t.max, cara: v => v, lee: v => `${v} km` }),
    meta: t => t.r, alto: 224, ms: 1700, pie: 'Fija el radio y suelta: la señal se abre.',
    dib(t, v, K, p, f) {
      const px = q => [AC[0] + (q[0] - t.C[0]) * t.sc, AC[1] - (q[1] - t.C[1]) * t.sc];
      let h = '';
      for (let k = 1; k <= 3; k++) h += K.arc(AC[0], AC[1], k * 34, 0, 360, 'ls');
      h += K.p([[AC[0], AC[1] - 12], [AC[0] - 7, AC[1] + 6], [AC[0] + 7, AC[1] + 6]], 'fk') + K.t(8, 214, `antena en ${pt(t.C)}`, 's tm', 'start');
      if (t.eq) h += K.t(8, 18, t.eq, 's ta', 'start');
      t.casas.forEach(([x, y, n]) => { const [a, b] = px([x, y]); h += K.r(a - 6, b - 6, 12, 12, 'fg', 2) + K.t(a + (a > AC[0] ? 10 : -10), b - 8, `${n} ${pt([x, y])}`, 's', a > AC[0] ? 'start' : 'end'); });
      if (v == null) return h;
      const ok = v === t.r, R = v * t.sc * Math.min(1, f * 1.2);
      h += K.arc(AC[0], AC[1], R, 0, 360, `${f >= 1 ? (ok ? 'lo' : 'lf') : 'la'} gr`);
      return h + K.f(f * 3 - 2, K.t(332, 214, ok ? `${v} km: llega justo ✓` : `${v} km: ${v > t.r ? 'se pasa' : 'no llega'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} km la señal ${v > t.r ? 'se pasa de' : 'no alcanza'} lo pedido: calcula la distancia con la raíz de la suma de cuadrados.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-14.js
// Geometría Vectorial · juegos de la lección geo-14 «Producto escalar» (spec 2026-11-27-curso-geometria-vectorial).
// El producto escalar mide cuánto se acompañan dos flechas: u · v = |u||v| cos θ = u₁v₁ + u₂v₂ + u₃v₃. Su signo dice si el ángulo es
// agudo, recto u obtuso; con él salen el ángulo entre dos vectores, los cosenos directores y el trabajo de una fuerza. La proyección
// es de geo-15 y las rectas y planos, de geo-16. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js
// (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 1000) / 1000);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const n2 = a => dot(a, a);
  const raiz = n => (Number.isInteger(Math.sqrt(n)) ? `${Math.sqrt(n)}` : `√${n}`);
  const rz = n => (Number.isInteger(Math.sqrt(n)) ? `${Math.sqrt(n)}` : `\\sqrt{${n}}`);
  const at = (x, y, r, g) => [x + r * Math.cos(g * R), y - r * Math.sin(g * R)];
  const tupla = a => `(${a.map(sg).join(', ')})`;
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const rot = (K, A, B, s, cls, lado = 1, d = 13) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * d, (A[1] + B[1]) / 2 - lado * dx / L * d + 4, s, `s ${cls}`);
  };
  // Ejes del espacio en isométrica, con su rótulo; las partes negativas, punteadas.
  const ejes = (K, o, u, L = 4, Ln = 2) => {
    const I = (x, y, z) => K.iso(o, u, x, y, z);
    let h = '';
    [[[L, 0, 0], [-Ln, 0, 0], 'x'], [[0, L, 0], [0, -Ln, 0], 'y'], [[0, 0, L], [0, 0, -Ln], 'z']].forEach(([a, b, s]) => {
      const A = I(...a), B = I(...b);
      h += K.l(o[0], o[1], B[0], B[1], 'lm d') + K.ar(o[0], o[1], A[0], A[1], 'lm') + K.t(A[0] + (s === 'y' ? -8 : 8), A[1] + (s === 'x' ? 4 : -4), s, 's tm', s === 'y' ? 'end' : 'start');
    });
    return h;
  };

  // --------------------------------------------------------------- las dos fórmulas: con el ángulo y con las coordenadas
  // u y v en el papel cuadriculado; se arrastran los dos productos de coordenadas, su suma y el ángulo.
  //   params { u, v, metas: [u₁v₁, u₂v₂, u · v, θ], fichas, mira: [aviso de cada lugar], trampas: { 'i:ficha': aviso }, ok }
  const PD = plano({ x0: 0, x1: 5, y0: 0, y1: 4 }, 22, 186, 30);
  const slotD = i => ({ x: 292, y: 36 + 46 * i, w: 76, h: 34 });
  const ETD = ['u₁v₁ =', 'u₂v₂ =', 'u · v =', 'θ ='];
  XG.rotula('punto-dos-formulas', {
    slots: p => p.metas.map((_, i) => slotD(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 212,
    texto: p => `$u_1v_1 = ${sg(p.metas[0])}$, $u_2v_2 = ${sg(p.metas[1])}$, $\\vec u \\cdot \\vec v = ${sg(p.metas[2])}$ y $\\theta = ${p.metas[3].replace('°', '^{\\circ}')}$`,
    fondo(K, p, f) {
      const O = [PD.X(0), PD.Y(0)], U = [PD.X(p.u[0]), PD.Y(p.u[1])], V = [PD.X(p.v[0]), PD.Y(p.v[1])];
      let h = papel(K, PD) + K.ar(O[0], O[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1] + 4, `u ${tupla(p.u)}`, 's tg', 'start')
        + K.ar(O[0], O[1], V[0], V[1], 'lf gr') + K.t(V[0] + 6, V[1] - 4, `v ${tupla(p.v)}`, 's tf', 'start') + K.c(O[0], O[1], 4, 'fk')
        + K.t(8, 18, `‖u‖ = ${raiz(n2(p.u))}   ‖v‖ = ${raiz(n2(p.v))}`, 's tm', 'start');
      ETD.forEach((e, i) => { const s = slotD(i); h += K.t(s.x - s.w / 2 - 6, s.y + 5, e, 's', 'end'); });
      return h + K.f(f, K.ang(O, U, V, 26, '', 'fa') + K.t(8, 40, `cos θ = ${dot(p.u, p.v)} / (${raiz(n2(p.u))} · ${raiz(n2(p.v))})`, 's ta', 'start'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ----------------------------------------------------------------------------------- el signo: agudo, recto u obtuso
  // Ocho parejas de vectores del espacio; se tocan las que forman ángulo obtuso (producto escalar negativo).
  //   params { pares: [[u, v] × 8], falta, ok }
  const cajaP = i => ({ x: 86 + 168 * (i % 2), y: 46 + 48 * Math.floor(i / 2), w: 160, h: 40 });
  const obtusas = p => p.pares.map(([u, v], i) => (dot(u, v) < 0 ? i : -1)).filter(i => i >= 0);
  const cuentaP = ([u, v]) => u.map((x, i) => `${sg(x)}·${v[i] < 0 ? `(${sg(v[i])})` : v[i]}`).join(' + ');
  XG.marca('punto-parejas-obtusas', {
    sitios: p => p.pares.map((_, i) => cajaP(i)),
    cara: (K, p, i, on) => { const c = cajaP(i), [u, v] = p.pares[i]; return K.t(c.x - c.w / 2 + 8, c.y - 6, i + 1, 's tm', 'start') + K.t(c.x + 6, c.y + 8, `${tupla(u)} · ${tupla(v)}`, `s ${on ? 'ta' : ''}`); },
    fondo: K => K.t(8, 16, 'Cada tarjeta es una pareja u · v', 's tm', 'start'),
    alto: () => 222, nombre: (p, i) => `pareja ${i + 1}`, pie: 'Toca las parejas con ángulo obtuso.',
    sol: p => obtusas(p),
    aviso(on, p) {
      const s = obtusas(p), i = on.findIndex((o, k) => o && !s.includes(k));
      if (i < 0) return p.falta;
      const d = dot(...p.pares[i]);
      return `La pareja ${i + 1} da ${cuentaP(p.pares[i])} = ${sg(d)}: ${d === 0 ? 'cero, así que forman ángulo recto, no obtuso.' : 'positivo, así que el ángulo es agudo.'}`;
    },
    bien: p => p.ok,
    texto: p => `las parejas ${obtusas(p).map(i => i + 1).join(', ')}: su producto escalar es negativo`,
  });

  // --------------------------------------------------------------------- perpendicular en el plano: el pasillo que cruza
  // Se arrastra la punta de w por la cuadrícula hasta que sea perpendicular a u y tenga el largo pedido.  v { x, y }
  //   params { u, n2: largo de w al cuadrado, ini, mira: { largo, gira, otro }, ok }
  const PP = plano({ x0: -5, x1: 5, y0: -4, y1: 4 }, 170, 116, 22);
  const okP = (v, p) => p.u[0] * v.x + p.u[1] * v.y === 0 && v.x * v.x + v.y * v.y === p.n2;
  XG.figura('punto-pasillo-recto', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-5, -4], max: [5, 4], paso: 1, rot: () => 'w', en: v => [PP.X(v.x), PP.Y(v.y)], de: (x, y) => [(x - PP.ox) / PP.u, (PP.oy - y) / PP.u] }],
    ok: okP,
    sol: p => ({ x: -p.u[1], y: p.u[0] }),
    texto: p => `$\\vec w = (${-p.u[1]}, ${p.u[0]})$ o $\\vec w = (${p.u[1]}, ${-p.u[0]})$: $\\vec u \\cdot \\vec w = 0$ y $\\|\\vec w\\|^2 = ${p.n2}$`,
    alto: () => 232, pie: 'Arrastra la punta de w.',
    dib(v, K, p, f) {
      const O = [PP.X(0), PP.Y(0)], U = [PP.X(p.u[0]), PP.Y(p.u[1])], W = [PP.X(v.x), PP.Y(v.y)], d = p.u[0] * v.x + p.u[1] * v.y, ok = okP(v, p);
      let h = papel(K, PP) + K.l(PP.X(-5), O[1], PP.X(5), O[1], 'lm') + K.l(O[0], PP.Y(-4), O[0], PP.Y(4), 'lm');
      h += K.ar(O[0], O[1], U[0], U[1], 'lg gr') + rot(K, O, U, 'u', 'tg', -1) + (v.x || v.y ? K.ar(O[0], O[1], W[0], W[1], 'la gr') : '') + K.c(O[0], O[1], 4, 'fk');
      if (f > 0) {   // el círculo del largo pedido y, si hay ángulo recto, su escuadra
        h += K.f(f, K.arc(O[0], O[1], Math.sqrt(p.n2) * PP.u * Math.min(1, f * 1.3), 0, 360, 'lm d'));
        if (d === 0 && (v.x || v.y)) {
          const a = [p.u[0], -p.u[1]], b = [v.x, -v.y], la = Math.hypot(...a), lb = Math.hypot(...b), e = 11;
          const A = [O[0] + a[0] / la * e, O[1] + a[1] / la * e], B = [O[0] + b[0] / lb * e, O[1] + b[1] / lb * e];
          h += K.f(f * 2 - 0.6, K.pl([A, [A[0] + B[0] - O[0], A[1] + B[1] - O[1]], B], 'lo gr'));
        }
        h += K.f(f * 3 - 2, K.t(332, 16, ok ? 'u · w = 0 y el largo justo ✓' : !v.x && !v.y ? 'sin vector ✗' : d === 0 ? 'recto, pero otro largo ✗' : `u · w = ${sg(d)} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec u \\cdot \\vec w = ${p.u[0]} \\cdot (${v.x}) + ${p.u[1]} \\cdot (${v.y}) = ${p.u[0] * v.x + p.u[1] * v.y}$, $\\|\\vec w\\|^2 = ${v.x * v.x + v.y * v.y}$`,
    aviso(v, p) {
      const d = p.u[0] * v.x + p.u[1] * v.y;
      if (!v.x && !v.y) return 'Con w = (0, 0) no hay pasillo: el vector cero no tiene dirección. Arrastra la punta de w fuera del origen.';
      if (d === 0) return p.mira.largo;
      if (v.x * v.x + v.y * v.y === p.n2) return p.mira.gira.replace('#', sg(d));
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------------------- el k que hace dos vectores ortogonales
  // Con la regla se elige k; las dos varillas del espacio cambian con k. Al comprobar se ve su producto escalar.  v { k }
  //   params { u, v: componentes (número o 'k'), k, k0, texto, trampas: { valor: aviso }, ok }
  const OK3 = [160, 104], UK = 12;
  const conK = (a, k) => a.map(c => (c === 'k' ? k : c));
  const dotK = (p, k) => dot(conK(p.u, k), conK(p.v, k));
  XG.figura('punto-k-ortogonal', {
    ini: p => ({ k: p.k0 }),
    manijas: () => [{ k: 'k', min: -4, max: 4, paso: 0.5, et: 'k, el número que falta' }],
    ok: (v, p) => Math.abs(dotK(p, v.k)) < 1e-9,
    sol: p => ({ k: p.k }),
    texto: p => p.texto,
    alto: () => 232,
    dib(v, K, p, f) {
      const I = q => K.iso(OK3, UK, ...q), u = conK(p.u, v.k), w = conK(p.v, v.k), U = I(u), W = I(w), d = dotK(p, v.k), ok = Math.abs(d) < 1e-9;
      let h = ejes(K, OK3, UK, 5, 3) + K.ar(OK3[0], OK3[1], U[0], U[1], 'lg gr') + K.ar(OK3[0], OK3[1], W[0], W[1], 'lf gr') + K.c(OK3[0], OK3[1], 4, 'fk');
      h += K.t(8, 18, `u = ${tupla(u)}`, 's tg', 'start') + K.t(8, 36, `v = ${tupla(w)}`, 's tf', 'start');
      return h + K.f(f, K.t(332, 18, `u · v = ${fm(d)}`, `s ${ok ? 'to' : 'tf'}`, 'end')
        + K.t(332, 36, ok ? 'perpendiculares ✓' : d > 0 ? 'ángulo agudo ✗' : 'ángulo obtuso ✗', `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    lee: (v, p) => `$\\vec u \\cdot \\vec v = ${fm(dotK(p, v.k)).replace('−', '-')}$ con $k = ${fm(v.k).replace('−', '-')}$`,
    aviso: (v, p) => { const d = dotK(p, v.k); return p.trampas?.[v.k] || `Con k = ${fm(v.k)} el producto da ${fm(d)}, ${d > 0 ? 'positivo' : 'negativo'}: no son perpendiculares. Plantea u · v = 0 y despeja k.`; },
    bien: (v, p) => p.ok,
  });

  // -------------------------------------------------------------------------------- el ángulo entre dos vectores del espacio
  // u y v se ven en isométrica (ahí los ángulos engañan); se abre el transportador al ángulo θ. Al comprobar, el plano de u y v
  // se pone de frente y se ve el ángulo de verdad.  v { g }
  //   params { u, v, th, ini, trampas: { grados: aviso }, mira: { poco, mucho }, ok }
  const OT = [86, 128], UT = 22, CT = [244, 162], RT = 76;
  XG.figura('punto-transportador-3d', {
    ini: p => ({ g: p.ini }),
    manijas: () => [{ k: 'g', min: 0, max: 180, paso: 15, rot: () => 'θ', en: v => at(CT[0], CT[1], RT, v.g),
      de: (x, y) => { const g = Math.atan2(CT[1] - y, x - CT[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
    ok: (v, p) => v.g === p.th,
    sol: p => ({ g: p.th }),
    texto: p => `$\\cos\\theta = \\tfrac{${dot(p.u, p.v)}}{${rz(n2(p.u))} \\cdot ${rz(n2(p.v))}}$, así que $\\theta = ${p.th}^{\\circ}$`,
    alto: () => 200, pie: 'Abre el transportador hasta el ángulo entre u y v.',
    dib(v, K, p, f) {
      const I = q => K.iso(OT, UT, ...q), U = I(p.u), V = I(p.v), ok = v.g === p.th;
      let h = ejes(K, OT, UT, 2.6, 1.6) + K.ar(OT[0], OT[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1] + 12, 'u', 's tg', 'start')
        + K.ar(OT[0], OT[1], V[0], V[1], 'lf gr') + K.t(V[0] + 6, V[1] + 12, 'v', 's tf', 'start') + K.c(OT[0], OT[1], 4, 'fk')
        + K.t(8, 18, `u = ${tupla(p.u)}`, 's tg', 'start') + K.t(8, 36, `v = ${tupla(p.v)}`, 's tf', 'start');
      h += K.arc(CT[0], CT[1], RT, 0, 180, 'lm') + K.l(CT[0] - RT - 6, CT[1], CT[0] + RT + 6, CT[1], 'lm');
      for (let g = 0; g <= 180; g += 30) { const a = K.at(CT[0], CT[1], RT - 5, g), b = K.at(CT[0], CT[1], RT + 3, g); h += K.l(a[0], a[1], b[0], b[1], 'lm'); }
      h += K.t(CT[0] + RT + 2, CT[1] + 16, '0°', 's tm') + K.t(CT[0], CT[1] - RT - 8, '90°', 's tm') + K.t(CT[0] - RT - 2, CT[1] + 16, '180°', 's tm');
      const T = K.at(CT[0], CT[1], RT, v.g);
      h += K.l(CT[0], CT[1], CT[0] + RT * 0.8, CT[1], 'lg gr') + K.l(CT[0], CT[1], T[0], T[1], 'la gr') + K.c(CT[0], CT[1], 3, 'fk');
      if (f > 0) {   // el plano de u y v, de frente: v cae en su ángulo de verdad
        const g = p.th * Math.min(1, f * 1.3), Q = K.at(CT[0], CT[1], RT * 0.8, g);
        h += K.arc(CT[0], CT[1], 22, 0, g, `${ok ? 'lo' : 'lf'}`) + K.ar(CT[0], CT[1], Q[0], Q[1], `${ok ? 'lo' : 'lf'} gr d`);
        h += K.f(f * 3 - 2, K.t(332, 18, ok ? `θ = ${p.th}° ✓` : `θ = ${p.th}°, no ${v.g}° ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec u \\cdot \\vec v = ${dot(p.u, p.v)}$, $\\|\\vec u\\|^2 = ${n2(p.u)}$, $\\|\\vec v\\|^2 = ${n2(p.v)}$; tu ángulo: $${v.g}^{\\circ}$`,
    aviso: (v, p) => p.trampas?.[v.g] || (v.g < p.th ? p.mira.poco : p.mira.mucho),
    bien: (v, p) => p.ok,
  });

  // -------------------------------------------------------------------------- ángulos directores: el vector y los tres ejes
  // u en isométrica con su caja; se arrastran su norma y sus tres cosenos directores.
  //   params { u, metas: [‖u‖, cos α, cos β, cos γ], fichas, mira, trampas, ok }
  const OC = [130, 150], UC = 15;
  const slotC = i => ({ x: 292, y: 40 + 44 * i, w: 70, h: 34 });
  const ETC = ['‖u‖ =', 'cos α =', 'cos β =', 'cos γ ='];
  XG.rotula('punto-cosenos-directores', {
    slots: p => p.metas.map((_, i) => slotC(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 204,
    texto: p => `$\\|\\vec u\\| = ${p.metas[0]}$, $\\cos\\alpha = ${p.metas[1].replace('−', '-')}$, $\\cos\\beta = ${p.metas[2]}$, $\\cos\\gamma = ${p.metas[3]}$`,
    fondo(K, p, f) {
      const I = q => K.iso(OC, UC, ...q), [a, b, c] = p.u, P = I(p.u), Pb = I([a, b, 0]);
      let h = ejes(K, OC, UC, 3.5, 3) + K.pl([I([a, 0, 0]), Pb, I([0, b, 0])], 'lm d') + K.l(Pb[0], Pb[1], P[0], P[1], 'lm d')
        + K.ar(OC[0], OC[1], P[0], P[1], 'la gr') + K.t(P[0] + 14, P[1] - 2, `u ${tupla(p.u)}`, 's ta', 'start') + K.c(OC[0], OC[1], 4, 'fk');
      ETC.forEach((e, i) => { const s = slotC(i); h += K.t(s.x - s.w / 2 - 6, s.y + 5, e, 's', 'end'); });
      const s2 = p.u.map(x => x * x);
      return h + K.f(f, K.t(8, 18, `cos²α + cos²β + cos²γ = (${s2.join(' + ')})/${n2(p.u)} = 1`, 's to', 'start'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // -------------------------------------------------------------------- un producto escalar en la vida: la nota ponderada
  // Barras de ancho = peso y alto = nota: el área total es pesos · notas. Se elige la nota que falta; al comprobar el agua se
  // nivela a la nota final.  v { x }
  //   params { w: pesos, n: notas (la última es la que falta), meta, x, x0, et: nombres, trampas: { valor: aviso }, mira: { mas, menos }, ok }
  const BX = 50, BW = 240, BY = 186, BH = 30;
  const finalN = (p, x) => dot(p.w, [...p.n.slice(0, -1), x]);
  XG.figura('punto-notas-y-pesos', {
    ini: p => ({ x: p.x0 }),
    manijas: () => [{ k: 'x', min: 0, max: 5, paso: 0.1, et: 'nota que falta' }],
    ok: (v, p) => Math.abs(finalN(p, v.x) - p.meta) < 1e-9,
    sol: p => ({ x: p.x }),
    texto: p => `$${p.w.map((w, i) => `${w} \\cdot ${i < p.n.length - 1 ? p.n[i] : p.x}`).join(' + ')} = ${p.meta}$: la nota que falta es $${p.x}$`,
    alto: () => 276,
    dib(v, K, p, f) {
      const ns = [...p.n.slice(0, -1), v.x], L = finalN(p, v.x), ok = Math.abs(L - p.meta) < 1e-9, g = Math.min(1, f * 1.3);
      let h = K.l(BX - 8, BY, BX + BW + 8, BY, 'lm gr'), x = BX;
      const yM = BY - p.meta * BH;
      p.w.forEach((w, i) => {
        const ww = w * BW, hh = (ns[i] + (L - ns[i]) * g) * BH;
        h += K.r(x + 1, BY - hh, ww - 2, hh, i === p.w.length - 1 ? 'fa' : 'fn', 2) + K.t(x + ww / 2, BY + 15, p.et[i], 's tm') + K.t(x + ww / 2, BY + 29, `${Math.round(w * 100)} %`, 's tm');
        if (f < 0.05) h += K.t(x + ww / 2, BY - hh - 6, fm(ns[i]), `s ${i === p.w.length - 1 ? 'ta' : 'tm'}`);
        x += ww;
      });
      h += K.l(BX - 8, yM, BX + BW + 8, yM, 'lm d') + K.t(BX + BW + 10, yM + 4, `meta ${p.meta}`, 's tm', 'start');
      h += K.t(8, 18, `pesos ${tupla(p.w)} · notas ${tupla([...p.n.slice(0, -1), 'x'])}`, 's tm', 'start');
      return h + K.f(f * 3 - 2, K.t(332, 40, `nota final: ${fm(L)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    lee: (v, p) => `$${p.w.map((w, i) => `${w} \\cdot ${i < p.n.length - 1 ? p.n[i] : v.x}`).join(' + ')} = ${fm(finalN(p, v.x))}$`,
    aviso: (v, p) => p.trampas?.[v.x] || (finalN(p, v.x) > p.meta ? p.mira.mas : p.mira.menos),
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------------------- en movimiento: el trabajo de la cuerda del trineo
  // Se fija el trabajo W = F·d = ‖F‖‖d‖cos θ y al soltar el trineo avanza; el medidor se llena hasta el trabajo de verdad.
  //   tiro { q, F, th, d, r, min, max, cuenta, trampas }
  const SY = 150, MX0 = 30, MX1 = 310, MY = 44, MPX = 40;
  XG.tiros('punto-trineo-trabajo', {
    perilla: t => ({ et: 'trabajo de la cuerda, en J', min: t.min, max: t.max, cara: v => sg(v), lee: v => `${sg(v)} J` }),
    meta: t => t.r, alto: 188, ms: 1800, pie: 'Fija el trabajo y suelta.',
    dib(t, v, K, p, f) {
      const g = v == null ? 0 : Math.min(1, f * 1.1), sx = 36 + t.d * MPX * g, top = SY - 22;
      const X = w => MX0 + (w - t.min) / (t.max - t.min) * (MX1 - MX0);
      let h = K.l(8, SY, 332, SY, 'lm gr') + K.r(sx, top, 46, 22, 'fn', 4) + K.l(sx - 4, SY - 2, sx + 50, SY - 2, 'lm');
      const C = [t.th > 90 ? sx : sx + 46, top + 11], T = K.at(C[0], C[1], 48, t.th);
      h += K.ar(C[0], C[1], T[0], T[1], 'la gr') + (t.th < 30 ? K.t(T[0] - 4, T[1] - 12, `F = ${t.F} N`, 's ta', 'end')
        : K.t(T[0] + (t.th > 90 ? -6 : 6), T[1] - 4, `F = ${t.F} N`, 's ta', t.th > 90 ? 'end' : 'start'));
      if (t.th > 0) h += K.arc(C[0], C[1], 20, 0, t.th, 'lm') + K.l(C[0], C[1], C[0] + 30, C[1], 'lm d') + K.t(...K.at(C[0], C[1], 32, t.th / 2).map((z, i) => z + (i ? 4 : 0)), `${t.th}°`, 's tm');
      h += K.ar(36, SY + 16, 36 + t.d * MPX, SY + 16, 'lg') + K.t(36 + t.d * MPX / 2, SY + 32, `avanza ${t.d} m`, 's tg');
      // El medidor del trabajo: de min a max, con el cero marcado.
      h += K.l(MX0, MY, MX1, MY, 'lm') + K.l(X(0), MY - 6, X(0), MY + 6, 'lm') + (t.min < 0 ? K.t(X(0), MY - 10, '0', 's tm') : '') + K.t(MX0, MY + 18, `${sg(t.min)} J`, 's tm', 'start') + K.t(MX1, MY + 18, `${t.max} J`, 's tm', 'end');
      if (v == null) return h;
      const ok = v === t.r;
      h += K.l(X(v), MY - 9, X(v), MY + 9, 'lf gr') + K.l(X(0), MY, X(0) + (X(t.r) - X(0)) * g, MY, `${t.r < 0 ? 'lf' : 'lo'} gr`);
      return h + K.f(f * 3 - 2, K.c(X(t.r), MY, 6, ok ? 'fo' : 'ff') + K.t(8, 18, `trabajo: ${sg(t.r)} J`, `s ${ok ? 'to' : 'tf'}`, 'start'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${sg(v)} J ${v > t.r ? 'te pasas' : 'te quedas corto'}: el trabajo es ‖F‖ · d · cos θ; solo cuenta la parte de la fuerza a lo largo del avance.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-15.js
// Geometría Vectorial · juegos de la lección geo-15 «Proyección ortogonal» (spec 2026-11-27-curso-geometria-vectorial).
// La proyección de u sobre v es la sombra de u sobre la recta de v cuando la luz cae perpendicular a esa recta. Su largo con signo es
// la componente escalar comp = u·v / ‖v‖ y el vector es proy = (u·v / ‖v‖²) v; lo que sobra, u − proy, es perpendicular a v. La
// proyección solo depende de la recta de v, no de su largo ni de su sentido. Proyectar un punto sobre una recta es hallar el punto
// más cercano (si la recta no pasa por el origen, se resta antes un punto de ella), también en el espacio. Las rectas y los planos
// con su vector normal y las distancias son de geo-16. Armazones de figura-kit.js (XG.figura, XG.tiros) y logica-kit.js (XG.marca),
// con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const r2 = x => Math.round(x * 100) / 100;
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const mas = (a, b) => a.map((x, i) => x + b[i]);
  const menos = (a, b) => a.map((x, i) => x - b[i]);
  const por = (k, a) => a.map(x => k * x);
  const igual = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-9);
  const unit = v => { const L = Math.hypot(...v) || 1; return v.map(x => x / L); };
  const proy = (u, v) => por(dot(u, v) / dot(v, v), v);
  const vec = q => `(${q.map(x => sg(r2(x))).join(', ')})`;
  const tv = q => `(${q.map(x => r2(x)).join(', ')})`;   // en TeX
  // Papel cuadriculado: B = { x0, x1, y0, y1 }; el punto (0, 0) cae en (ox, oy) y una unidad mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const ejes = (K, P, cada = 2) => {
    let h = K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
    for (let x = Math.ceil(P.x0 / cada) * cada; x <= P.x1; x += cada) if (x) h += K.t(P.X(x), P.oy + 13, sg(x), 's tm');
    for (let y = Math.ceil(P.y0 / cada) * cada; y <= P.y1; y += cada) if (y) h += K.t(P.ox - 5, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h;
  };
  // Recorta el segmento AB (en píxeles) al rectángulo [x0, x1] × [y0, y1].
  const corta = (A, B, x0, y0, x1, y1) => {
    let t0 = 0, t1 = 1;
    const dx = B[0] - A[0], dy = B[1] - A[1];
    for (const [p, q] of [[-dx, A[0] - x0], [dx, x1 - A[0]], [-dy, A[1] - y0], [dy, y1 - A[1]]]) {
      if (p === 0) { if (q < 0) return null; continue; }
      const r = q / p;
      if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; }
    }
    return [[A[0] + t0 * dx, A[1] + t0 * dy], [A[0] + t1 * dx, A[1] + t1 * dy]];
  };
  // La recta A + t·d entera, dentro del papel.
  const recta = (K, P, A, d, cls) => {
    const s = corta(P2(P, mas(A, por(-40, d))), P2(P, mas(A, por(40, d))), P.X(P.x0), P.Y(P.y1), P.X(P.x1), P.Y(P.y0));
    return s ? K.l(s[0][0], s[0][1], s[1][0], s[1][1], cls) : '';
  };
  // Marca de ángulo recto en F (píxeles): a va por la recta y b hacia el punto (direcciones de pantalla).
  const recto = (K, F, a, b, cls = 'lm', s = 8) => {
    const ua = unit(a), ub = unit(b);
    return K.pl([[F[0] + s * ua[0], F[1] + s * ua[1]], [F[0] + s * (ua[0] + ub[0]), F[1] + s * (ua[1] + ub[1])], [F[0] + s * ub[0], F[1] + s * ub[1]]], cls);
  };
  const rot = (K, A, B, s, cls, lado = 1, d = 12) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * d, (A[1] + B[1]) / 2 - lado * dx / L * d + 4, s, `s ${cls}`);
  };
  const tramo = (K, A, B, g, cls) => (g > 0.01 ? K.l(A[0], A[1], A[0] + (B[0] - A[0]) * Math.min(1, g), A[1] + (B[1] - A[1]) * Math.min(1, g), cls) : '');
  const veredicto = (K, f, ok, si, no, y = 16) => K.f(f * 3 - 2, K.t(332, y, ok ? `${si} ✓` : `${no} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));

  // ------------------------------------------------------------------- la luz perpendicular: la sombra que es proyección
  // Una antena u sale de O sobre una ladera (la recta de v). Se gira la lámpara; sus rayos paralelos dejan una sombra. Solo cuando
  // los rayos forman ángulo recto con la ladera la sombra es la proyección ortogonal.  v { g }: ángulo de la lámpara vista desde la punta
  //   params { lad, ag, al, g, g0, mira: { sol, otro }, ok }
  const L1 = { O: [110, 222], U: 22, RL: 78 };
  const pxL = q => [L1.O[0] + q[0] * L1.U, L1.O[1] - q[1] * L1.U];
  const dirg = g => [Math.cos(g * R), Math.sin(g * R)];
  const puntaA = p => por(p.al, dirg(p.ag));
  const lampara = (v, p) => { const T = pxL(puntaA(p)); return [T[0] + L1.RL * Math.cos(v.g * R), T[1] - L1.RL * Math.sin(v.g * R)]; };
  const cruz = (a, b) => a[0] * b[1] - a[1] * b[0];
  const sombraS = (g, p) => cruz(puntaA(p), dirg(g)) / cruz(dirg(p.lad), dirg(g));   // hasta dónde llega la sombra por la ladera
  const conLadera = (g, p) => { const a = (((g - p.lad) % 180) + 180) % 180; return Math.min(a, 180 - a); };
  XG.figura('luz-perpendicular-ladera', {
    ini: p => ({ g: p.g0 }),
    manijas: () => [{ k: 'g', min: 45, max: 165, paso: 15, en: (v, p) => lampara(v, p),
      de: (x, y, v, p) => { const T = pxL(puntaA(p)); let g = Math.atan2(T[1] - y, x - T[0]) / R; if (g < -90) g += 360; return g; } }],
    ok: (v, p) => v.g === p.g,
    sol: p => ({ g: p.g }),
    texto: p => `la lámpara a $${p.g}^{\\circ}$: sus rayos forman $90^{\\circ}$ con la ladera, que sube a $${p.lad}^{\\circ}$`,
    alto: () => 262, pie: 'Gira la lámpara alrededor de la punta de la antena.',
    dib(v, K, p, f) {
      const e = dirg(p.lad), O = L1.O, A0 = pxL(por(-2.5, e)), A1 = pxL(por(10.5, e)), T = pxL(puntaA(p)), Lp = lampara(v, p);
      let h = K.p([A0, A1, [A1[0], 262], [A0[0], 262]], 'fc') + K.l(A0[0], A0[1], A1[0], A1[1], 'lm gr') + K.t(A1[0] - 4, A1[1] - 10, 'ladera', 's tm', 'end');
      const s = sombraS(v.g, p), dentro = s > -2.5 && s < 10.5, S = pxL(por(s, e)), d = [-(Lp[0] - T[0]) / L1.RL, -(Lp[1] - T[1]) / L1.RL];
      // Tres rayos paralelos que bajan de la lámpara; el del centro pasa por la punta.
      [-16, 0, 16].forEach(o => {
        const A = [Lp[0] - d[1] * o, Lp[1] + d[0] * o], B = dentro && !o ? S : [A[0] + d[0] * 340, A[1] + d[1] * 340], c = corta(A, B, 0, 0, 340, 262);
        if (c) h += K.l(c[0][0], c[0][1], c[1][0], c[1][1], o ? 'ls d' : 'lm d');
      });
      if (dentro && Math.abs(s) > 0.05) h += K.l(O[0], O[1], S[0], S[1], 'lg gr') + K.c(S[0], S[1], 4, 'fk');
      h += K.c(Lp[0], Lp[1], 13, 'fn') + K.ar(O[0], O[1], T[0], T[1], 'la gr') + K.t(T[0] - 8, T[1] + 4, 'u', 's ta', 'end') + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 8, O[1] + 4, 'O', 's', 'end');
      h += K.t(8, 18, dentro ? 'la sombra de la antena' : 'la sombra se sale de la ladera', 's tm', 'start');
      if (f > 0) {
        const a = conLadera(v.g, p), ok = v.g === p.g, P = pxL(por(r2(p.al * Math.cos((p.ag - p.lad) * R)), e));
        h += K.f(f * 2, K.t(8, 36, `rayos y ladera: ${a}°`, `s ${ok ? 'to' : 'tf'}`, 'start'));
        if (ok) h += K.f(f * 2 - 1, recto(K, P, [-e[0], e[1]], [T[0] - P[0], T[1] - P[1]], 'lo') + rot(K, O, P, 'proy', 'to', -1, 14));
        h += veredicto(K, f, ok, 'sombra = proyección', 'esa sombra no es la proyección');
      }
      return h;
    },
    lee: (v, p) => `Los rayos forman $${conLadera(v.g, p)}^{\\circ}$ con la ladera`,
    aviso: (v, p) => (v.g === 90 ? p.mira.sol : `Tus rayos forman ${conLadera(v.g, p)}° con la ladera. ${p.mira.otro}`),
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------------- la componente escalar: el largo con signo de la sombra
  // Un canal recto con la dirección de v y una regla sobre él (cada marca, una unidad de largo). La fuerza u tira del bote; se arrastra
  // la marca a la componente de u a lo largo del canal: positiva si la sombra cae hacia donde apunta v, negativa si cae al revés.  v { k }
  //   params { u, v, k0, uni, trampas: { valor: aviso }, otro, ok }
  const C2 = plano({ x0: -7, x1: 6, y0: -4, y1: 5 }, 170, 120, 20);
  const enRegla = (k, p) => { const e = unit(p.v); return [C2.X(k * e[0]), C2.Y(k * e[1])]; };
  const comp = p => dot(p.u, p.v) / Math.hypot(...p.v);
  XG.figura('canal-componente-signo', {
    ini: p => ({ k: p.k0 }),
    manijas: () => [{ k: 'k', min: -6, max: 6, paso: 1, en: (v, p) => enRegla(v.k, p),
      de: (x, y, v, p) => { const e = unit(p.v); return ((x - C2.ox) * e[0] + (C2.oy - y) * e[1]) / C2.u; } }],
    ok: (v, p) => v.k === comp(p),
    sol: p => ({ k: comp(p) }),
    texto: p => `$\\operatorname{comp}_{\\vec v}\\vec u = \\tfrac{${dot(p.u, p.v)}}{${Math.hypot(...p.v)}} = ${comp(p)}$ ${p.uni}`,
    alto: () => 228, pie: 'Arrastra la marca por la regla del canal.',
    dib(v, K, p, f) {
      const e = unit(p.v), n = [-e[1] * 9, -e[0] * 9], O = [C2.ox, C2.oy];
      let h = papel(K, C2) + K.l(C2.X(C2.x0), C2.oy, C2.X(C2.x1), C2.oy, 'lm') + K.l(C2.ox, C2.Y(C2.y0), C2.ox, C2.Y(C2.y1), 'lm');
      const A = enRegla(-7, p), B = enRegla(7, p);
      h += K.p([[A[0] + n[0], A[1] + n[1]], [B[0] + n[0], B[1] + n[1]], [B[0] - n[0], B[1] - n[1]], [A[0] - n[0], A[1] - n[1]]], 'fc');
      for (let k = -6; k <= 6; k++) { const q = enRegla(k, p); h += K.l(q[0] - n[0] * 0.6, q[1] - n[1] * 0.6, q[0] + n[0] * 0.6, q[1] + n[1] * 0.6, 'lm'); if (k && k % 2 === 0) h += K.t(q[0] + n[0] * 1.9, q[1] + n[1] * 1.9 + 4, sg(k), 's tm'); }
      const V = P2(C2, p.v), U = P2(C2, p.u);
      h += K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 8, V[1] + 4, 'v', 's tg', 'start') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] - 4, U[1] - 8, 'u', 's tf', 'end');
      h += K.t(8, 18, `tu componente: ${sg(v.k)} ${p.uni}`, 's ta', 'start');
      if (f > 0) {   // la luz perpendicular al canal baja desde la punta de u
        const c = comp(p), F = enRegla(c, p), ok = v.k === c;
        h += tramo(K, U, F, f * 1.6, 'lm d') + K.f(f * 2 - 1, K.c(F[0], F[1], 6, ok ? 'fo' : 'ff') + recto(K, F, [e[0], -e[1]], [U[0] - F[0], U[1] - F[1]]))
          + K.f(f * 2 - 1, K.l(O[0], O[1], F[0], F[1], `${ok ? 'lo' : 'lf'} gr`));
        h += veredicto(K, f, ok, `comp = ${sg(c)}`, `la sombra mide ${sg(c)}`);
      }
      return h;
    },
    lee: (v, p) => `$\\vec u \\cdot \\vec v = ${dot(p.u, p.v)}$, $\\|\\vec v\\| = ${Math.hypot(...p.v)}$; tu marca: $${v.k}$`,
    aviso: (v, p) => p.trampas?.[v.k] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------------------- el vector proyección: la punta de la sombra
  // u y v salen del origen; la recta de v está dibujada. Se arrastra P hasta la punta de proy_v u.  v { x, y }
  //   params { u, v, ini, et: [rótulo de u, de v], trampas: { 'x,y': aviso }, otro, ok }
  const C3 = plano({ x0: -2, x1: 9, y0: -2, y1: 7 }, 78, 182, 24);
  XG.figura('sombra-sobre-la-recta', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-2, -2], max: [9, 7], paso: 1, rot: () => 'P', en: v => P2(C3, [v.x, v.y]), de: (x, y) => [(x - C3.ox) / C3.u, (C3.oy - y) / C3.u] }],
    ok: (v, p) => igual([v.x, v.y], proy(p.u, p.v)),
    sol: p => { const q = proy(p.u, p.v); return { x: q[0], y: q[1] }; },
    texto: p => `$\\operatorname{proy}_{\\vec v}\\vec u = \\tfrac{${dot(p.u, p.v)}}{${dot(p.v, p.v)}}\\,${tv(p.v)} = ${tv(proy(p.u, p.v))}$`,
    alto: () => 246, pie: 'Arrastra P hasta la punta de la sombra de u sobre la recta de v.',
    dib(v, K, p, f) {
      const O = [C3.ox, C3.oy], U = P2(C3, p.u), V = P2(C3, p.v), Pp = P2(C3, [v.x, v.y]);
      let h = papel(K, C3) + ejes(K, C3, 2) + recta(K, C3, [0, 0], p.v, 'lm d');
      h += K.ar(O[0], O[1], V[0], V[1], 'lg gr') + rot(K, O, V, p.et[1], 'tg', 1) + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + rot(K, O, U, p.et[0], 'tf', -1);
      if (v.x || v.y) h += K.ar(O[0], O[1], Pp[0], Pp[1], 'la gr');
      h += K.t(332, 236, `P = ${vec([v.x, v.y])}`, 's ta', 'end');
      if (f > 0) {
        const q = proy(p.u, p.v), F = P2(C3, q), ok = igual([v.x, v.y], q), e = unit(p.v);
        h += tramo(K, U, F, f * 1.6, 'lm d') + K.f(f * 2 - 1, K.c(F[0], F[1], 7, ok ? 'fo' : 'ff') + recto(K, F, [e[0], -e[1]], [U[0] - F[0], U[1] - F[1]]));
        h += veredicto(K, f, ok, 'P es la punta de la sombra', `la sombra llega a ${vec(q)}`);
      }
      return h;
    },
    lee: (v, p) => `Tu $P = (${v.x}, ${v.y})$; $\\tfrac{\\vec u \\cdot \\vec v}{\\|\\vec v\\|^2} = \\tfrac{${dot(p.u, p.v)}}{${dot(p.v, p.v)}}$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------------- descomposición: la parte del peso que aprieta la rampa
  // Una caja en una rampa de dirección v; su peso F sale de O. Se arrastra Q, la punta de la parte de F perpendicular a la rampa
  // (la que aprieta); al comprobar, F se parte en la sombra a lo largo de la rampa y esa parte, que cierran el paralelogramo.  v { x, y }
  //   params { F, v, ini, trampas: { 'x,y': aviso }, otro, ok }
  const C4 = plano({ x0: -4, x1: 5, y0: -6, y1: 3 }, 159, 82, 22);
  const aprieta = p => menos(p.F, proy(p.F, p.v));
  XG.figura('peso-que-aprieta-rampa', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-4, -6], max: [5, 3], paso: 1, rot: () => 'Q', en: v => P2(C4, [v.x, v.y]), de: (x, y) => [(x - C4.ox) / C4.u, (C4.oy - y) / C4.u] }],
    ok: (v, p) => igual([v.x, v.y], aprieta(p)),
    sol: p => { const q = aprieta(p); return { x: q[0], y: q[1] }; },
    texto: p => `$\\vec F - \\operatorname{proy}_{\\vec v}\\vec F = ${tv(p.F)} - ${tv(proy(p.F, p.v))} = ${tv(aprieta(p))}$`,
    alto: () => 240, pie: 'Arrastra Q, la punta de la parte que aprieta la rampa.',
    dib(v, K, p, f) {
      const O = [C4.ox, C4.oy], e = unit(p.v), Fp = P2(C4, p.F), Q = P2(C4, [v.x, v.y]);
      const A = P2(C4, por(-6, e)), B = P2(C4, por(7, e));
      let h = papel(K, C4) + K.p([A, B, [B[0], 240], [A[0], 240]], 'fc') + K.l(A[0], A[1], B[0], B[1], 'lm gr') + K.t(B[0] - 8, B[1] + 20, 'rampa', 's tm', 'end');
      const es = [e[0], -e[1]], nu = [es[1], -es[0]], caja = [[-13, 0], [13, 0], [13, 20], [-13, 20]].map(([a, b]) => [O[0] + a * es[0] + b * nu[0], O[1] + a * es[1] + b * nu[1]]);
      h += K.p(caja, 'fc') + K.ar(O[0], O[1], Fp[0], Fp[1], 'lf gr') + K.t(Fp[0] + 8, Fp[1] + 4, 'peso F', 's tf', 'start');
      const V = P2(C4, p.v); h += K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 2, V[1] - 10, 'v', 's tg');
      if (v.x || v.y) h += K.ar(O[0], O[1], Q[0], Q[1], 'la gr') + K.t(Q[0] + 10, Q[1] + 16, vec([v.x, v.y]), 's ta', 'start');
      if (f > 0) {   // F se parte en la sombra sobre la rampa y la parte perpendicular
        const pr = proy(p.F, p.v), Pp = P2(C4, pr), W = P2(C4, aprieta(p)), ok = igual([v.x, v.y], aprieta(p));
        h += K.f(f * 2, K.ar(O[0], O[1], Pp[0], Pp[1], 'lg gr d') + tramo(K, Pp, Fp, f * 2 - 0.6, 'lm d'));
        h += K.f(f * 2 - 1, K.ar(O[0], O[1], W[0], W[1], `${ok ? 'lo' : 'lf'} gr d`) + tramo(K, W, Fp, f * 2 - 1, 'lm d') + recto(K, O, [e[0], -e[1]], [W[0] - O[0], W[1] - O[1]]));
        h += veredicto(K, f, ok, 'aprieta en ángulo recto', `aprieta con ${vec(aprieta(p))}`);
      }
      return h;
    },
    lee: (v, p) => `Tu parte $${tv([v.x, v.y])}$; con $\\vec v$: $${tv([v.x, v.y])} \\cdot ${tv(p.v)} = ${dot([v.x, v.y], p.v)}$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------------- la proyección solo depende de la recta de v
  // Ocho flechas w en cajas; se tocan las que dan a u la misma sombra que v: las de la misma recta, de cualquier largo y sentido.
  //   params { u, v, fl: [[dx, dy] × 8], por: [aviso de cada flecha que no sirve], falta, ok }
  const UF = 11, cajaM = i => ({ x: 46 + 82 * (i % 4), y: 112 + 74 * Math.floor(i / 4), w: 76, h: 66 });
  const flechaM = (K, c, d, cls) => { const a = [c[0] - d[0] * UF / 2, c[1] + d[1] * UF / 2 + 6], b = [c[0] + d[0] * UF / 2, c[1] - d[1] * UF / 2 + 6]; return K.ar(a[0], a[1], b[0], b[1], cls); };
  const mismas = p => p.fl.map((w, i) => (igual(proy(p.u, w), proy(p.u, p.v)) ? i : -1)).filter(i => i >= 0);
  XG.marca('misma-recta-misma-sombra', {
    sitios: p => p.fl.map((_, i) => cajaM(i)),
    cara: (K, p, i, on) => { const c = cajaM(i); return K.t(c.x - c.w / 2 + 8, c.y - c.h / 2 + 14, `w${i + 1}`, 's tm', 'start') + flechaM(K, [c.x, c.y], p.fl[i], on ? 'la gr' : 'lg gr'); },
    fondo: (K, p) => K.t(14, 22, 'u', 'tf', 'start') + flechaM(K, [56, 30], p.u, 'lf gr') + K.t(140, 22, 'v', 'tg', 'start') + flechaM(K, [176, 30], p.v, 'lg gr')
      + K.t(332, 26, `proy de u sobre v = ${vec(proy(p.u, p.v))}`, 's tm', 'end'),
    alto: () => 222, nombre: (p, i) => `flecha w${i + 1}`, pie: 'Toca las flechas w sobre las que u da la misma sombra que sobre v.',
    sol: p => mismas(p),
    aviso: (on, p) => { const s = mismas(p), i = on.findIndex((o, k) => o && !s.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => `las flechas ${mismas(p).map(i => `w${i + 1}`).join(', ')}: todas están en la recta de v`,
  });

  // ------------------------------------------------------------- el punto más cercano de una recta que no pasa por el origen
  // Un camino recto A + t·d y una casa Q. Se arrastra el empalme E por el camino hasta el punto más cercano a la casa.  v { t }
  //   params { A, d, Q, t0, trampas: { t: aviso }, otro, ok }
  const C6 = plano({ x0: -6, x1: 7, y0: -1, y1: 7 }, 154, 170, 22);
  const pie6 = p => dot(menos(p.Q, p.A), p.d) / dot(p.d, p.d);
  const enCamino = (t, p) => mas(p.A, por(t, p.d));
  XG.figura('empalme-mas-corto-camino', {
    ini: p => ({ t: p.t0 }),
    manijas: p => [{ k: 't', min: p.tmin ?? -1, max: p.tmax ?? 4, paso: 0.5, rot: () => 'E', en: (v, q) => P2(C6, enCamino(v.t, q)),
      de: (x, y, v, q) => dot(menos([(x - C6.ox) / C6.u, (C6.oy - y) / C6.u], q.A), q.d) / dot(q.d, q.d) }],
    ok: (v, p) => v.t === pie6(p),
    sol: p => ({ t: pie6(p) }),
    texto: p => `$t = \\tfrac{(Q - A)\\cdot \\vec d}{\\|\\vec d\\|^2} = \\tfrac{${dot(menos(p.Q, p.A), p.d)}}{${dot(p.d, p.d)}} = ${pie6(p)}$: el empalme va en $${tv(enCamino(pie6(p), p))}$`,
    alto: () => 214, pie: 'Arrastra el empalme E por el camino.',
    dib(v, K, p, f) {
      const Q = P2(C6, p.Q), A = P2(C6, p.A), E = P2(C6, enCamino(v.t, p));
      let h = papel(K, C6) + ejes(K, C6, 2) + recta(K, C6, p.A, p.d, 'lm gr');
      h += K.c(A[0], A[1], 4, 'fk') + K.t(A[0] - 6, A[1] - 8, 'A', 's', 'end');
      h += K.r(Q[0] - 7, Q[1] - 6, 14, 12, 'fk', 2) + K.p([[Q[0] - 9, Q[1] - 6], [Q[0], Q[1] - 14], [Q[0] + 9, Q[1] - 6]], 'fk') + K.t(Q[0] + 12, Q[1] - 4, `casa Q${vec(p.Q)}`, 's', 'start');
      h += K.l(Q[0], Q[1], E[0], E[1], 'la gr d') + K.t(8, 206, `E = ${vec(enCamino(v.t, p))}`, 's ta', 'start');
      if (f > 0) {
        const t = pie6(p), Fp = P2(C6, enCamino(t, p)), ok = v.t === t, e = unit(p.d), dE = Math.hypot(...menos(p.Q, enCamino(v.t, p))), dF = Math.hypot(...menos(p.Q, enCamino(t, p)));
        h += K.f(f * 2, K.l(Q[0], Q[1], Fp[0], Fp[1], `${ok ? 'lo' : 'lf'} gr`) + K.c(Fp[0], Fp[1], 6, ok ? 'fo' : 'ff') + recto(K, Fp, [e[0], -e[1]], [Q[0] - Fp[0], Q[1] - Fp[1]]));
        h += K.f(f * 3 - 2, K.t(332, 206, `tu tubo: ${r2(dE)} · el más corto: ${r2(dF)}`, 's tm', 'end'));
        h += veredicto(K, f, ok, 'el tubo más corto', 'hay un tubo más corto');
      }
      return h;
    },
    lee: (v, p) => `Tu empalme $E = ${tv(enCamino(v.t, p))}$; $(Q - E)\\cdot \\vec d = ${r2(dot(menos(p.Q, enCamino(v.t, p)), p.d))}$`,
    aviso: (v, p) => p.trampas?.[v.t] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------------- en el espacio: la sombra sobre una viga
  // Una antena u y una viga con la dirección v salen del origen. Con la luz perpendicular a la viga, se arrastra S por la viga hasta
  // la sombra de la punta de la antena: S = t·v con t = u·v / ‖v‖².  v { t }
  //   params { u, v, t0, mira: { v1, otro }, ok }
  const E7 = { ox: 150, oy: 190, U: 20 };
  const pr7 = q => [E7.ox + E7.U * q[1] - 0.5 * E7.U * q[0], E7.oy + 0.45 * E7.U * q[0] - E7.U * q[2]];
  const t7 = p => dot(p.u, p.v) / dot(p.v, p.v);
  XG.figura('viga-sombra-espacio', {
    ini: p => ({ t: p.t0 }),
    manijas: () => [{ k: 't', min: -1, max: 3, paso: 0.5, rot: () => 'S', en: (v, p) => pr7(por(v.t, p.v)),
      de: (x, y, v, p) => { const a = pr7([0, 0, 0]), b = pr7(p.v), d = [b[0] - a[0], b[1] - a[1]]; return ((x - a[0]) * d[0] + (y - a[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]); } }],
    ok: (v, p) => v.t === t7(p),
    sol: p => ({ t: t7(p) }),
    texto: p => `$t = \\tfrac{${dot(p.u, p.v)}}{${dot(p.v, p.v)}} = ${t7(p)}$: la sombra es $${tv(por(t7(p), p.v))}$ y $\\vec u - ${tv(por(t7(p), p.v))} = ${tv(menos(p.u, por(t7(p), p.v)))}$ es perpendicular a la viga`,
    alto: () => 262, pie: 'Arrastra S por la viga hasta la sombra de la punta.',
    dib(v, K, p, f) {
      let h = '';
      for (let x = 0; x <= 4; x++) { const a = pr7([x, 0, 0]), b = pr7([x, 6, 0]); h += K.l(a[0], a[1], b[0], b[1], 'ls'); }
      for (let y = 0; y <= 6; y++) { const a = pr7([0, y, 0]), b = pr7([4, y, 0]); h += K.l(a[0], a[1], b[0], b[1], 'ls'); }
      const O = pr7([0, 0, 0]), X = pr7([5, 0, 0]), Y = pr7([0, 7, 0]), Z = pr7([0, 0, 6]);
      h += K.ar(O[0], O[1], X[0], X[1], 'lm') + K.ar(O[0], O[1], Y[0], Y[1], 'lm') + K.ar(O[0], O[1], Z[0], Z[1], 'lm')
        + K.t(X[0] - 8, X[1] + 4, 'x', 's tm', 'end') + K.t(Y[0] + 4, Y[1] + 16, 'y', 's tm', 'start') + K.t(Z[0] + 8, Z[1] + 4, 'z', 's tm', 'start');
      const V0 = pr7(por(-1.4, p.v)), V1 = pr7(por(3.4, p.v)), Vt = pr7(p.v), U = pr7(p.u), Us = pr7([p.u[0], p.u[1], 0]), S = pr7(por(v.t, p.v));
      h += K.l(V0[0], V0[1], V1[0], V1[1], 'lm gr') + K.t(V1[0] + 6, V1[1] + 4, 'viga', 's tm', 'start') + K.ar(O[0], O[1], Vt[0], Vt[1], 'lg gr') + rot(K, O, Vt, 'v', 'tg', -1, 12);
      h += K.l(U[0], U[1], Us[0], Us[1], 'ls d') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] - 8, U[1] - 4, `u${vec(p.u)}`, 's tf', 'end');
      h += K.l(U[0], U[1], S[0], S[1], 'la d') + K.t(8, 18, `S = ${sg(v.t)}·v = ${vec(por(v.t, p.v))}`, 's ta', 'start') + K.t(8, 36, `v = ${vec(p.v)}`, 's tg', 'start');
      if (f > 0) {
        const t = t7(p), F = pr7(por(t, p.v)), ok = v.t === t, q = menos(p.u, por(t, p.v));
        h += K.f(f * 2, K.l(U[0], U[1], F[0], F[1], `${ok ? 'lo' : 'lf'} gr`) + K.c(F[0], F[1], 6, ok ? 'fo' : 'ff'));
        h += K.f(f * 3 - 2, K.t(8, 54, `u − proy = ${vec(q)}; ·v = ${sg(dot(q, p.v))}`, 's tm', 'start'));
        h += veredicto(K, f, ok, 'ahí cae la sombra', 'la sombra cae en otro punto', 250);
      }
      return h;
    },
    lee: (v, p) => `Tu $S = ${v.t}\\,\\vec v$; $(\\vec u - S)\\cdot \\vec v = ${r2(dot(menos(p.u, por(v.t, p.v)), p.v))}$`,
    aviso: (v, p) => (v.t === 1 ? p.mira.v1 : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ en movimiento: el viento sobre la pista
  // Una pista con la dirección de despegue v y el viento u. Se fija cuánto viento va a lo largo de la pista, de frente o de
  // costado, y al soltar la sombra del viento se dibuja y la marca queda donde se dijo.
  //   tiro { q, v, u, que: 'largo' | 'frente' | 'cruzado', r, max, cuenta, trampas }
  const PC = [170, 118], SW = 11;
  const pxW = q => [PC[0] + q[0] * SW, PC[1] - q[1] * SW];
  const partes = t => { const pr = proy(t.u, t.v); return { pr, pe: menos(t.u, pr) }; };
  XG.tiros('viento-cruzado-pista', {
    perilla: t => ({ et: t.que === 'cruzado' ? 'Viento de costado' : t.que === 'frente' ? 'Viento de frente' : 'Viento a lo largo de la pista', min: 0, max: t.max, cara: v => v, lee: v => `${v} nudos` }),
    meta: t => t.r, alto: 230, ms: 1800, pie: 'Fija cuántos nudos y suelta: la sombra del viento se dibuja.',
    dib(t, v, K, p, f) {
      const e = unit(t.v), es = [e[0], -e[1]], ns = [-es[1], es[0]], L = 150, W = 14;
      const c = (a, b) => [PC[0] + es[0] * a + ns[0] * b, PC[1] + es[1] * a + ns[1] * b];
      let h = K.p([c(-L, -W), c(L, -W), c(L, W), c(-L, W)], 'fc') + K.l(...c(-L, 0), ...c(L, 0), 'lm d');
      h += K.ar(...c(46, W + 14), ...c(96, W + 14), 'lg gr') + K.t(...c(71, W + 32), 'despegue', 's tg');
      const U = pxW(t.u);
      h += K.ar(PC[0], PC[1], U[0], U[1], 'lf gr') + K.t(U[0] + (U[0] < PC[0] ? -6 : 6), U[1] + (U[1] < 30 ? 14 : -6), 'viento', 's tf', U[0] < PC[0] ? 'end' : 'start') + K.c(PC[0], PC[1], 5, 'fk');
      if (v == null) return h;
      const { pr, pe } = partes(t), g = Math.min(1, f * 1.2), ok = v === t.r;
      const dir = t.que === 'cruzado' ? unit(pe) : t.que === 'frente' ? por(-1, e) : e, real = t.que === 'cruzado' ? pe : pr;
      const M = pxW(por(v, dir)), md = [dir[1], dir[0]];
      h += K.l(M[0] - 7 * md[0], M[1] - 7 * md[1], M[0] + 7 * md[0], M[1] + 7 * md[1], 'lf gr');
      const Pp = pxW(pr), D = pxW(por(g, real));
      h += tramo(K, U, Pp, g * 1.3, 'lm d') + K.l(PC[0], PC[1], D[0], D[1], 'la gr');
      h += K.c(D[0], D[1], 7, f >= 1 ? (ok ? 'fo' : 'ff') : 'fA');
      return h + K.f(f * 3 - 2, K.t(8, 18, `${t.que === 'cruzado' ? 'de costado' : t.que === 'frente' ? 'de frente' : 'a lo largo'}: ${t.r} nudos`, `s ${ok ? 'to' : 'tf'}`, 'start'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} nudos la marca queda ${v > t.r ? 'más lejos' : 'antes'} de la sombra del viento: proyecta el viento sobre la pista.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-16.js
// Geometría Vectorial · juegos de la lección geo-16 «Producto escalar y geometría analítica» (spec 2026-11-27-curso-geometria-vectorial).
// El producto escalar describe rectas y planos: n · (X − P) = 0 es la recta (o el plano) perpendicular a n que pasa por P, y sus
// coeficientes son n. La distancia de un punto es la proyección sobre la normal; los ángulos entre rectas y planos salen de sus
// normales o directores, y el de una recta con un plano es el complemento del de la recta con la normal. Sin producto vectorial
// (geo-17 y geo-18). Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const tn = n => (n < 0 ? `(${n})` : `${n}`);
  const pz = n => (n < 0 ? `(${sg(n)})` : `${n}`);
  const punto = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const largo = a => Math.sqrt(punto(a, a));
  const cl = (x, a, b) => Math.max(a, Math.min(b, x));
  // «3x − 2y + z» a partir de los coeficientes (texto plano o TeX).
  const lado = (n, tx = false, vars = 'xyz') => n.map((c, i) => {
    if (!c) return '';
    const m = Math.abs(c) === 1 ? '' : Math.abs(c), signo = c < 0 ? (tx ? '-' : '−') : '+';
    return `${i === 0 || !n.slice(0, i).some(Boolean) ? (c < 0 ? (tx ? '-' : '−') : '') : ` ${signo} `}${m}${vars[i]}`;
  }).join('') || '0';
  const ecu = (n, c, tx = false) => `${lado(n, tx)} = ${tx ? c : sg(c)}`;
  // √m simplificada en TeX: 5, 2\sqrt{3}, \sqrt{6}.
  const raiz = m => { let k = 1; for (let j = Math.floor(Math.sqrt(m)); j > 1; j--) if (m % (j * j) === 0) { k = j; break; } const r = m / (k * k); return r === 1 ? `${k}` : `${k > 1 ? k : ''}\\sqrt{${r}}`; };
  const raizP = m => raiz(m).replace(/\\sqrt\{(\d+)\}/, '√$1');
  // Papel cuadriculado de la ventana W = [x0, x1, y0, y1] con el origen en (ox, oy) y u píxeles por unidad.
  const plano = (W, ox, oy, u) => ({ W, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u, P: q => [ox + q[0] * u, oy - q[1] * u] });
  const papel = (K, P) => {
    const [x0, x1, y0, y1] = P.W;
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(P.X(x), P.Y(y0), P.X(x), P.Y(y1), x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(P.X(x0), P.Y(y), P.X(x1), P.Y(y), y ? 'ls' : 'lm');
    return h;
  };
  // Recta a x + b y = c recortada a la ventana.
  const recta = (K, P, [a, b, c], cls) => {
    const [x0, x1, y0, y1] = P.W, q = [];
    if (b) [x0, x1].forEach(x => { const y = (c - a * x) / b; if (y >= y0 - 1e-9 && y <= y1 + 1e-9) q.push([x, y]); });
    if (a) [y0, y1].forEach(y => { const x = (c - b * y) / a; if (x >= x0 - 1e-9 && x <= x1 + 1e-9) q.push([x, y]); });
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    const A = P.P(q[0]), B = P.P(q[q.length - 1]);
    return K.l(A[0], A[1], B[0], B[1], cls);
  };
  // Escuadra (ángulo recto) en V entre las direcciones unitarias e1 y e2 (en píxeles).
  const escuadra = (K, V, e1, e2, s, cls) => K.pl([[V[0] + e1[0] * s, V[1] + e1[1] * s], [V[0] + (e1[0] + e2[0]) * s, V[1] + (e1[1] + e2[1]) * s], [V[0] + e2[0] * s, V[1] + e2[1] * s]], cls);
  const uni = (A, B) => { const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
  const sello = (K, ok, si, no) => K.t(332, 16, ok ? `${si} ✓` : `${no} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end');
  // Isométrica: x hacia el frente, y a la derecha, z arriba.
  const iso = (o, u) => (x, y, z) => [o[0] + u * y - 0.5 * u * x, o[1] + 0.45 * u * x - u * z];

  // ---------------------------------------------------------- la normal de una recta: n · (X − A) = 0 en el plano
  // La carretera pasa por A y B; se arrastra la punta del vector n que sale de A hasta que sea perpendicular a la carretera.
  //   v { a, b }   params { A, B, ini: [a, b], sol: [a, b], mira: { director, nulo, otro }, ok }
  const PN = plano([-3, 7, -3, 5], 122, 152, 24);
  const dirN = p => [p.B[0] - p.A[0], p.B[1] - p.A[1]];
  const normalOk = (v, p) => (v.a || v.b) && punto([v.a, v.b], dirN(p)) === 0;
  XG.figura('normal-de-la-carretera', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => [{ k: ['a', 'b'], min: [-3, -3], max: [3, 3], paso: 1, rot: () => 'n', en: v => PN.P([p.A[0] + v.a, p.A[1] + v.b]),
      de: (x, y) => [(x - PN.ox) / PN.u - p.A[0], (PN.oy - y) / PN.u - p.A[1]] }],
    ok: (v, p) => !!normalOk(v, p),
    sol: p => ({ a: p.sol[0], b: p.sol[1] }),
    texto: p => { const c = punto(p.sol, p.A); return `$\\vec n = (${p.sol.join(', ')})$ o un múltiplo: $${ecu(p.sol, c, true)}$`; },
    alto: () => 246, pie: 'Arrastra la punta de n, que sale de A.',
    dib(v, K, p, f) {
      const n = [v.a, v.b], d = dirN(p), c = punto(p.sol, p.A), A = PN.P(p.A), B = PN.P(p.B), T = PN.P([p.A[0] + v.a, p.A[1] + v.b]), ok = !!normalOk(v, p);
      let h = papel(K, PN) + recta(K, PN, [p.sol[0], p.sol[1], c], 'lg gr') + K.c(A[0], A[1], 5, 'fk') + K.c(B[0], B[1], 5, 'fk')
        + K.t(A[0] - 8, A[1] - 8, `A(${p.A.map(sg).join(', ')})`, 's', 'end') + K.t(B[0] + 8, B[1] + 16, `B(${p.B.map(sg).join(', ')})`, 's', 'start');
      if (v.a || v.b) h += K.ar(A[0], A[1], T[0], T[1], 'la gr');
      h += K.t(8, 16, `n = (${sg(v.a)}, ${sg(v.b)})`, 's ta', 'start');
      if (f > 0) {
        const e1 = uni(A, B), e2 = v.a || v.b ? uni(A, T) : e1, dot = punto(n, d);
        h += K.f(f * 2, ok ? escuadra(K, A, e1, e2, 11, 'lo') : (v.a || v.b ? K.arc(A[0], A[1], 18, Math.atan2(-e1[1], e1[0]) / R, Math.atan2(-e2[1], e2[0]) / R, 'lf') : ''))
          + K.f(f * 3 - 1, K.t(8, 34, `n · (B − A) = ${pz(v.a)}·${pz(d[0])} + ${pz(v.b)}·${pz(d[1])} = ${sg(dot)}`, `s ${ok ? 'to' : 'tf'}`, 'start'))
          + K.f(f * 3 - 2, sello(K, ok, ok ? ecu(n, punto(n, p.A)) : 'n ⊥ carretera', 'n no es perpendicular'));
      }
      return h;
    },
    lee: v => `$\\vec n = (${v.a}, ${v.b})$`,
    aviso: (v, p) => { const d = dirN(p); return !v.a && !v.b ? p.mira.nulo : v.a * d[1] - v.b * d[0] === 0 ? p.mira.director : p.mira.otro; },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- de la ecuación normal a la general, en el espacio
  // El techo pasa por P con normal n; se arman con fichas los cuatro números de a x + b y + c z = d.
  //   params { n, P, metas: [a, b, c, d], fichas, mira: [aviso de cada lugar], trampas: { 'i:ficha': aviso }, ok }
  const slotG = i => ({ x: 46 + 84 * i, y: 226, w: 52, h: 36 });
  XG.rotula('de-normal-a-general', {
    slots: p => p.metas.map((_, i) => slotG(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 256,
    texto: p => `$${ecu(p.n, punto(p.n, p.P), true)}$, porque $d = \\vec n \\cdot P = ${punto(p.n, p.P)}$`,
    fondo(K, p, f) {
      let h = K.p([[34, 160], [196, 160], [252, 96], [90, 96]], 'fn') + K.l(34, 160, 196, 160, 'lm') + K.l(196, 160, 252, 96, 'lm') + K.l(252, 96, 90, 96, 'lm') + K.l(90, 96, 34, 160, 'lm');
      const P = [143, 128], T = [143, 50];
      h += K.ar(P[0], P[1], T[0], T[1], 'la gr') + escuadra(K, P, [1, 0], [0, -1], 9, 'lm') + K.c(P[0], P[1], 4, 'fk')
        + K.t(P[0] - 8, P[1] + 18, `P(${p.P.map(sg).join(', ')})`, 's', 'end') + K.t(T[0] + 8, T[1] + 6, `n = (${p.n.map(sg).join(', ')})`, 's ta', 'start')
        + K.t(8, 18, 'techo: n · (X − P) = 0', 's tm', 'start') + K.t(332, 150, 'X(x, y, z)', 's tm', 'end');
      ['x +', 'y +', 'z ='].forEach((s, i) => { h += K.t((slotG(i).x + slotG(i + 1).x) / 2, 231, s, 's'); });
      h += K.t(8, 196, 'Ecuación general del techo:', 's tm', 'start');
      return h + K.f(f, K.t(332, 196, `d = n · P = ${p.n.map((c, i) => `${pz(c)}·${pz(p.P[i])}`).join(' + ')}`, 's tm', 'end'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ---------------------------------------------------------- distancia de un punto a una recta: el pie de la perpendicular
  // La casa está en Q y la carretera es a x + b y = c; se arrastra H por la carretera hasta el punto más cercano a la casa.
  //   v { t }: H = P0 + t·(b, −a)   params { abc, P0, Q, W, t0, tmin, tmax, paso, uni, mira: { vertical, horizontal, otro }, ok }
  const ventanaC = p => {
    const [x0, x1, y0, y1] = p.W, u = Math.min(28, 300 / (x1 - x0), 230 / (y1 - y0));
    return plano(p.W, 170 - (x0 + x1) / 2 * u, 34 + y1 * u, u);
  };
  const dirC = p => [p.abc[1], -p.abc[0]];
  const Hde = (p, t) => { const d = dirC(p); return [p.P0[0] + t * d[0], p.P0[1] + t * d[1]]; };
  const pieT = p => { const d = dirC(p); return punto([p.Q[0] - p.P0[0], p.Q[1] - p.P0[1]], d) / punto(d, d); };
  const distC = p => { const [a, b, c] = p.abc; return [Math.abs(a * p.Q[0] + b * p.Q[1] - c), a * a + b * b]; };
  const fracD = ([num, m], tx) => { const r = raiz(m); if (/sqrt/.test(r) && num % m === 0) { const k = num / m; return `${k === 1 ? '' : k}${tx ? `\\sqrt{${m}}` : `√${m}`}`; } if (/sqrt/.test(r)) return tx ? `\\tfrac{${num}}{${r}}` : `${num}/${raizP(m)}`; const v = num / +r; return Number.isInteger(v) ? `${v}` : tx ? `\\tfrac{${num}}{${r}}` : `${num}/${r}`; };
  const casa = (K, Q) => K.p([[Q[0] - 8, Q[1] + 7], [Q[0] + 8, Q[1] + 7], [Q[0] + 8, Q[1] - 3], [Q[0], Q[1] - 11], [Q[0] - 8, Q[1] - 3]], 'fk');
  XG.figura('casa-a-la-carretera', {
    ini: p => ({ t: p.t0 }),
    manijas: p => [{ k: 't', min: p.tmin, max: p.tmax, paso: p.paso, rot: () => 'H', en: v => ventanaC(p).P(Hde(p, v.t)),
      de: (x, y) => { const P = ventanaC(p), d = dirC(p), X = [(x - P.ox) / P.u - p.P0[0], (P.oy - y) / P.u - p.P0[1]]; return punto(X, d) / punto(d, d); } }],
    ok: (v, p) => Math.abs(v.t - pieT(p)) < 1e-9,
    sol: p => ({ t: pieT(p) }),
    texto: p => { const [a, b, c] = p.abc; return `pie $H = (${Hde(p, pieT(p)).join(', ')})$; distancia $\\tfrac{|${a} \\cdot ${tn(p.Q[0])} + ${b} \\cdot ${tn(p.Q[1])} - ${c}|}{\\sqrt{${a * a + b * b}}} = ${fracD(distC(p), true)}$ ${p.uni}`; },
    alto: p => { const P = ventanaC(p); return Math.round(P.Y(p.W[2]) + 14); },
    pie: 'Arrastra H por la carretera.',
    dib(v, K, p, f) {
      const P = ventanaC(p), Q = P.P(p.Q), H = P.P(Hde(p, v.t)), F = P.P(Hde(p, pieT(p))), ok = Math.abs(v.t - pieT(p)) < 1e-9;
      let h = papel(K, P) + recta(K, P, p.abc, 'lg gr') + casa(K, Q) + K.t(Q[0] + 12, Q[1] + 4, `Q(${p.Q.map(sg).join(', ')})`, 's', 'start')
        + K.l(Q[0], Q[1], H[0], H[1], 'la gr d') + K.t(8, 16, `carretera: ${ecu(p.abc.slice(0, 2), p.abc[2])}`, 's tg', 'start');
      if (f > 0) {
        const n = [p.abc[0], -p.abc[1]], L = Math.hypot(...n), e = [n[0] / L, n[1] / L], e2 = uni(F, P.P(Hde(p, pieT(p) + 1)));
        h += K.f(f * 2, K.l(Q[0], Q[1], F[0], F[1], 'lo gr') + escuadra(K, F, Math.sign(punto(e, [Q[0] - F[0], Q[1] - F[1]])) >= 0 ? e : [-e[0], -e[1]], e2, 9, 'lo') + K.c(F[0], F[1], 5, ok ? 'fo' : 'ff'))
          + K.f(f * 3 - 1, K.t(8, 34, `distancia = |${p.abc[0]}·${tn(p.Q[0])} + ${p.abc[1]}·${tn(p.Q[1])} − ${p.abc[2]}| / ${raizP(p.abc[0] ** 2 + p.abc[1] ** 2)} = ${fracD(distC(p))} ${p.uni}`, 's to', 'start'))
          + K.f(f * 3 - 2, sello(K, ok, 'H es el pie', 'H no es el más cercano'));
      }
      return h;
    },
    lee: (v, p) => { const H = Hde(p, v.t); return `$H = (${H.join(', ')})$`; },
    aviso: (v, p) => { const H = Hde(p, v.t); return Math.abs(H[0] - p.Q[0]) < 1e-9 ? p.mira.vertical : Math.abs(H[1] - p.Q[1]) < 1e-9 ? p.mira.horizontal : p.mira.otro; },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- ángulo entre dos rectas: el de sus normales, el agudo
  // Dos avenidas a₁x + b₁y = c₁ y a₂x + b₂y = c₂ se cruzan; se elige el ángulo entre ellas. Al comprobar se abre el transportador.
  //   v { g }   params { L1, L2, th, g0, W, mira: { obtuso, recto, otro }, ok }
  const PA = plano([-1, 7, -1, 5], 50, 206, 30);
  const corte = p => { const [a, b, c] = p.L1, [d, e, g] = p.L2, D = a * e - b * d; return [(c * e - b * g) / D, (a * g - c * d) / D]; };
  const angRectas = p => { const n1 = p.L1.slice(0, 2), n2 = p.L2.slice(0, 2); return Math.round(Math.acos(Math.abs(punto(n1, n2)) / (largo(n1) * largo(n2))) / R); };
  XG.figura('angulo-entre-avenidas', {
    ini: p => ({ g: p.g0 }),
    manijas: () => [{ k: 'g', min: 0, max: 180, paso: 15, et: 'ángulo entre las avenidas, en grados' }],
    ok: (v, p) => v.g === p.th,
    sol: p => ({ g: p.th }),
    texto: p => { const n1 = p.L1.slice(0, 2), n2 = p.L2.slice(0, 2); return `$\\cos\\theta = \\tfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|} = \\tfrac{${Math.abs(punto(n1, n2))}}{\\sqrt{${punto(n1, n1)}}\\sqrt{${punto(n2, n2)}}}$, así que $\\theta = ${p.th}^{\\circ}$`; },
    alto: () => 290,
    dib(v, K, p, f) {
      const C = PA.P(corte(p)), ok = v.g === p.th;
      let h = papel(K, PA) + recta(K, PA, p.L1, 'lg gr') + recta(K, PA, p.L2, 'lf gr') + K.c(C[0], C[1], 4, 'fk')
        + K.t(8, 16, `avenida 1: ${ecu(p.L1.slice(0, 2), p.L1[2])}`, 's tg', 'start') + K.t(332, 16, `avenida 2: ${ecu(p.L2.slice(0, 2), p.L2[2])}`, 's tf', 'end')
;
      if (f > 0) {   // el transportador abre el ángulo elegido sobre la avenida 1 y marca el verdadero
        const d1 = [p.L1[1], -p.L1[0]], d2 = [p.L2[1], -p.L2[0]], a1 = Math.atan2(d1[1], d1[0]) / R;
        let a2 = Math.atan2(d2[1], d2[0]) / R, dd = ((a2 - a1) % 180 + 180) % 180;
        if (dd > 90) dd -= 180;
        const g = Math.min(1, f * 1.4), s = dd >= 0 ? 1 : -1;
        h += K.arc(C[0], C[1], 34, a1, a1 + s * v.g * g, `${ok ? 'lo' : 'lf'} gr`) + K.f(f * 2 - 0.6, K.sec(C[0], C[1], 24, a1, a1 + dd, 'fo'))
          + K.f(f * 3 - 1, K.t(8, 34, `|n₁ · n₂| / (‖n₁‖‖n₂‖) = cos ${p.th}°`, 's to', 'start'))
          + K.f(f * 3 - 2, K.t(332, 34, ok ? `${v.g}°: es el ángulo ✓` : `${v.g}°: no es el ángulo ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$\\theta = ${v.g}^{\\circ}$`,
    aviso: (v, p) => (v.g === 180 - p.th ? p.mira.obtuso : v.g === 90 ? p.mira.recto : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- rectas perpendiculares y paralelas por sus normales
  // Ocho senderos escritos como ecuaciones; se tocan todos los perpendiculares al sendero principal.
  //   params { L: [a, b, c], et, fl: [ecuación de cada sendero], sol: [índices], por: [aviso de cada uno], falta, ok }
  const cajaV = i => ({ x: 88 + 164 * (i % 2), y: 66 + 42 * Math.floor(i / 2), w: 156, h: 34 });
  XG.marca('veredas-perpendiculares', {
    sitios: p => p.fl.map((_, i) => cajaV(i)),
    cara: (K, p, i, on) => { const c = cajaV(i); return K.t(c.x, c.y + 5, p.fl[i], on ? 'ta' : ''); },
    fondo: (K, p) => K.t(170, 26, `${p.et}: ${ecu(p.L.slice(0, 2), p.L[2])}`, 'tg'),
    alto: () => 230, nombre: (p, i) => `sendero ${p.fl[i]}`, pie: 'Toca los senderos perpendiculares.',
    sol: p => p.sol,
    aviso: (on, p) => { const i = on.findIndex((o, k) => o && !p.sol.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => p.sol.map(i => `$${p.fl[i].replace(/−/g, '-')}$`).join(', '),
  });

  // ---------------------------------------------------------- ángulo entre planos: planos perpendiculares o paralelos
  // Un coeficiente del segundo plano es k; se ajusta k para que los planos sean perpendiculares (n₁ · n₂ = 0) o paralelos (n₂ = λ n₁).
  //   v { k }   params { n1, c1, n2: [con 'k' en un lugar], c2, modo: 'perp' | 'par', k, k0, min, max, trampas: { k: aviso }, otro, ok }
  const nK = (p, k) => p.n2.map(x => (x === 'k' ? k : x));
  const cruz0 = (a, b) => a[1] * b[2] - a[2] * b[1] === 0 && a[2] * b[0] - a[0] * b[2] === 0 && a[0] * b[1] - a[1] * b[0] === 0;
  const cumpleB = (p, k) => (p.modo === 'perp' ? punto(p.n1, nK(p, k)) === 0 : cruz0(p.n1, nK(p, k)));
  const angB = (a, b) => Math.acos(cl(Math.abs(punto(a, b)) / (largo(a) * largo(b) || 1), 0, 1)) / R;
  const isoB = p => { const m = Math.max(6, ...p.n1.map(Math.abs), ...[p.min, p.max].flatMap(k => nK(p, k).map(Math.abs))); return iso([100, 144], Math.min(11, 66 / m)); };
  const eqK = (p, k) => lado(nK(p, k));
  XG.figura('bisagra-entre-planos', {
    ini: p => ({ k: p.k0 }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k, el coeficiente que falta' }],
    ok: (v, p) => cumpleB(p, v.k),
    sol: p => ({ k: p.k }),
    texto: p => (p.modo === 'perp' ? `$k = ${p.k}$: $\\vec n_1 \\cdot \\vec n_2 = ${punto(p.n1, nK(p, p.k))}$, los planos son perpendiculares`
      : `$k = ${p.k}$: $\\vec n_2 = ${punto(nK(p, p.k), p.n1) / punto(p.n1, p.n1)}\\,\\vec n_1$, los planos son paralelos`),
    alto: () => 270,
    dib(v, K, p, f) {
      const ISB = isoB(p), n2 = nK(p, v.k), O = ISB(0, 0, 0), ok = cumpleB(p, v.k);
      let h = '';
      [[6, 0, 0, 'x'], [0, 6, 0, 'y'], [0, 0, 6, 'z']].forEach(([x, y, z, s]) => { const E = ISB(x, y, z); h += K.ar(O[0], O[1], E[0], E[1], 'lm') + K.t(E[0] + (s === 'x' ? -8 : 6), E[1] + 4, s, 's tm', s === 'x' ? 'end' : 'start'); });
      const T1 = ISB(...p.n1), T2 = ISB(...n2);
      h += K.ar(O[0], O[1], T1[0], T1[1], 'lg gr') + K.t(T1[0] + 6, T1[1] - 4, 'n₁', 's tg', 'start');
      if (largo(n2) > 0) h += K.ar(O[0], O[1], T2[0], T2[1], 'la gr') + K.t(T2[0] + 6, T2[1] + 12, 'n₂', 's ta', 'start');
      h += K.t(332, 22, `Π₁: ${ecu(p.n1, p.c1)}`, 's tg', 'end') + K.t(332, 42, `Π₂: ${eqK(p, v.k)} = ${sg(p.c2)}`, 's ta', 'end') + K.t(332, 62, `k = ${sg(v.k)}`, 's ta', 'end');
      if (f > 0) {   // la bisagra se abre al ángulo entre los planos
        const th = largo(n2) ? angB(p.n1, n2) : 0, g = Math.min(1, f * 1.3), V = [262, 190], a = 180 - th * g;
        const A = K.at(V[0], V[1], 64, 180), B = K.at(V[0], V[1], 64, a);
        h += K.l(V[0], V[1], A[0], A[1], 'lg gr') + K.l(V[0], V[1], B[0], B[1], 'la gr') + K.c(V[0], V[1], 4, 'fk')
          + K.f(f * 2 - 0.5, th > 0.5 ? K.arc(V[0], V[1], 22, a, 180, ok ? 'lo' : 'lf') + K.t(V[0] - 30, V[1] - 30, `${Math.round(th)}°`, `s ${ok ? 'to' : 'tf'}`, 'end') : K.t(V[0] - 36, V[1] - 10, 'paralelos', `s ${ok ? 'to' : 'tf'}`, 'end'))
          + K.f(f * 3 - 1, K.t(332, 84, p.modo === 'perp' ? `n₁ · n₂ = ${sg(punto(p.n1, n2))}` : `n₂ ${cruz0(p.n1, n2) ? '=' : '≠'} λ n₁`, `s ${ok ? 'to' : 'tf'}`, 'end'))
          + K.f(f * 3 - 2, K.t(8, 16, ok ? (p.modo === 'perp' ? 'perpendiculares ✓' : 'paralelos ✓') : (p.modo === 'perp' ? 'no son perpendiculares ✗' : 'no son paralelos ✗'), `s ${ok ? 'to' : 'tf'}`, 'start'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec n_2 = (${nK(p, v.k).join(', ')})$`,
    aviso: (v, p) => p.trampas?.[v.k] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- ángulo entre una recta y un plano: el complemento
  // Una antena con director d se apoya en un techo de normal n; se elige el ángulo entre la antena y el techo (sen φ = |d·n| / ‖d‖‖n‖).
  //   v { g }   params { n, c, d, phi, g0, mira: { normal, otro }, ok }
  const BA = [110, 160];
  XG.figura('antena-sobre-el-techo', {
    ini: p => ({ g: p.g0 }),
    manijas: () => [{ k: 'g', min: 0, max: 90, paso: 15, et: 'ángulo entre la antena y el techo, en grados' }],
    ok: (v, p) => v.g === p.phi,
    sol: p => ({ g: p.phi }),
    texto: p => `$\\operatorname{sen}\\varphi = \\tfrac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\,\\|\\vec n\\|} = \\tfrac{${Math.abs(punto(p.d, p.n))}}{\\sqrt{${punto(p.d, p.d)}}\\sqrt{${punto(p.n, p.n)}}}$, así que $\\varphi = ${p.phi}^{\\circ}$`,
    alto: () => 270,
    dib(v, K, p, f) {
      const inc = 12, A = K.at(BA[0], BA[1], 100, 180 + inc), B = K.at(BA[0], BA[1], 210, inc), N = K.at(BA[0], BA[1], 90, 90 + inc), ok = v.g === p.phi;
      let h = K.p([[A[0], A[1]], [B[0], B[1]], [B[0], B[1] + 14], [A[0], A[1] + 14]], 'fn') + K.l(A[0], A[1], B[0], B[1], 'lg gr')
        + K.ar(BA[0], BA[1], N[0], N[1], 'lm d') + K.t(N[0] - 6, N[1] + 4, 'n', 's tm', 'end') + K.c(BA[0], BA[1], 4, 'fk');
      const T = K.at(BA[0], BA[1], 110, inc + v.g);
      h += K.l(BA[0], BA[1], T[0], T[1], 'la gr') + K.c(T[0], T[1], 4, 'fA');
      h += K.t(8, 16, `techo: ${ecu(p.n, p.c)}`, 's tg', 'start') + K.t(8, 34, `antena: d = (${p.d.map(sg).join(', ')})`, 's ta', 'start') + K.t(332, 16, `φ = ${v.g}°`, 's ta', 'end');
      if (f > 0) {   // la antena de verdad aparece con su ángulo con el techo y con la normal
        const g = Math.min(1, f * 1.4), V = K.at(BA[0], BA[1], 110, inc + p.phi * g);
        h += K.l(BA[0], BA[1], V[0], V[1], `${ok ? 'lo' : 'lf'} gr d`) + K.f(f * 2 - 0.5, K.arc(BA[0], BA[1], 30, inc, inc + p.phi, 'lo') + K.arc(BA[0], BA[1], 44, inc + p.phi, 90 + inc, 'lm')
          + K.t(...K.at(BA[0] + 4, BA[1] + 4, 52, inc + p.phi / 2 - 4), `${p.phi}°`, 's to', 'start') + K.t(...K.at(BA[0], BA[1], 60, inc + (90 + p.phi) / 2), `${90 - p.phi}°`, 's tm', 'middle'))
          + K.f(f * 3 - 1, K.t(332, 34, `sen φ = ${Math.abs(punto(p.d, p.n))}/(${raizP(punto(p.d, p.d))}·${raizP(punto(p.n, p.n))})`, 's to', 'end'))
          + K.f(f * 3 - 2, K.t(332, 52, ok ? `${v.g}°: así se apoya ✓` : `${v.g}°: no es el ángulo ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$\\varphi = ${v.g}^{\\circ}$`,
    aviso: (v, p) => (v.g === 90 - p.phi ? p.mira.normal : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- en movimiento: bajar por la normal hasta la recta o el plano
  // Se fija la distancia y al soltar la sonda baja por la normal esa distancia; debe tocar justo la recta o el plano.
  //   tiro { q, de: rótulo de salida, a: rótulo de llegada, r, max, cuenta, trampas: { valor: aviso } }
  const SY = 176, SX = 170;
  XG.tiros('baja-por-la-normal', {
    perilla: t => ({ et: 'Distancia por la normal', min: 0, max: t.max, cara: v => v, lee: v => `${v} unidades` }),
    meta: t => t.r, alto: 212, ms: 1700, pie: 'Fija la distancia y suelta: la sonda baja por la normal.',
    dib(t, v, K, p, f) {
      const s = 136 / t.max, top = SY - t.r * s;
      let h = K.p([[20, SY], [320, SY], [300, SY + 22], [40, SY + 22]], 'fn') + K.l(20, SY, 320, SY, 'lg gr') + K.t(326, SY + 16, t.a, 's tg', 'end');
      for (let k = 1; k <= t.max; k++) h += K.l(SX + 44, SY - k * s, SX + 50, SY - k * s, 'lm');
      h += K.l(SX + 47, SY, SX + 47, SY - t.max * s, 'lm') + K.t(SX + 54, SY - t.max * s + 4, t.max, 's tm', 'start');
      h += K.l(SX, top, SX, SY, 'lm d') + escuadra(K, [SX, SY], [1, 0], [0, -1], 9, 'lm') + K.c(SX, top, 6, 'fk') + K.t(SX - 10, top + 4, t.de, 's', 'end');
      if (v == null) return h;
      const g = Math.min(1, f * 1.2), y = top + v * s * g, ok = v === t.r;
      h += K.l(SX, top, SX, y, 'la gr') + K.c(SX, y, 7, f >= 1 ? (ok ? 'fo' : 'ff') : 'fA');
      return h + K.f(f * 3 - 2, K.t(8, 18, ok ? `${v}: toca justo ✓` : `${v}: ${v > t.r ? 'atraviesa' : 'no llega'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'start'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} la sonda ${v > t.r ? 'se pasa' : 'se queda antes'}: reemplaza el punto en la ecuación y divide entre la norma de la normal.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-17.js
// Geometría Vectorial · juegos de la lección geo-17 «Producto vectorial» (spec 2026-11-27-curso-geometria-vectorial).
// u × v es la flecha perpendicular a u y a v (regla de la mano derecha) que mide el área de su paralelogramo; se calcula con el
// determinante de î, ĵ, k̂, cambia de signo al cambiar el orden y da 0 con paralelos. El triple producto u · (v × w) es el volumen
// con signo de la caja inclinada. Las rectas y planos son de geo-18. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y
// logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 1000) / 1000);
  const tupla = a => `(${a.map(sg).join(', ')})`;
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const nor = a => Math.sqrt(dot(a, a));
  const suma = (...vs) => [0, 1, 2].map(i => vs.reduce((s, v) => s + v[i], 0));
  const por = (k, a) => a.map(x => x * k);
  const at = (o, r, g) => [o[0] + r * Math.cos(g * R), o[1] - r * Math.sin(g * R)];
  const ejes = (K, o, u, L = 4, Ln = 2) => {
    const I = (x, y, z) => K.iso(o, u, x, y, z);
    let h = '';
    [[[L, 0, 0], [-Ln, 0, 0], 'x'], [[0, L, 0], [0, -Ln, 0], 'y'], [[0, 0, L], [0, 0, -Ln], 'z']].forEach(([a, b, s]) => {
      const A = I(...a), B = I(...b);
      h += K.l(o[0], o[1], B[0], B[1], 'lm d') + K.ar(o[0], o[1], A[0], A[1], 'lm') + K.t(A[0] + (s === 'y' ? -8 : 8), A[1] + (s === 'z' ? -4 : 4), s, 's tm', s === 'y' ? 'end' : 'start');
    });
    return h;
  };
  // Curva de la mano derecha: de la dirección de a a la de b, a radio r (en unidades), con su punta de flecha.
  const curva = (K, I, a, b, r, cls) => {
    const ua = por(1 / nor(a), a), ub = por(1 / nor(b), b), pts = [];
    for (let k = 0; k <= 12; k++) { const t = k / 12, q = suma(por(1 - t, ua), por(t, ub)); pts.push(I(...por(r / nor(q), q))); }
    return K.pl(pts.slice(0, -1), cls) + K.ar(...pts.at(-3), ...pts.at(-1), cls);
  };

  // ------------------------------------------------------------ la regla de la mano derecha con vectores de la base
  // u y v van por los ejes; se eligen la dirección (seis sentidos de los ejes) y el tamaño de u × v.  v { d, m }
  //   params { u, v, d0, m0, opuesto, tamano: { m: aviso }, ok }
  const DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const DL = ['+x', '−x', '+y', '−y', '+z', '−z'];
  const BX = ['\\hat\\imath', '-\\hat\\imath', '\\hat\\jmath', '-\\hat\\jmath', '\\hat k', '-\\hat k'];
  const eje = a => a.findIndex(x => x !== 0);
  const solPD = p => { const c = cruz(p.u, p.v), m = nor(c); return { d: DIRS.findIndex(e => e.every((x, i) => x * m === c[i])), m }; };
  const OPD = [150, 100], UPD = 12;
  XG.figura('pvec-pulgar-derecho', {
    ini: p => ({ d: p.d0, m: p.m0 }),
    manijas: () => [{ k: 'd', min: 0, max: 5, paso: 1, et: 'dirección de u × v', rot: v => DL[v.d] }, { k: 'm', min: 0, max: 9, paso: 1, et: 'tamaño de u × v' }],
    ok: (v, p) => { const s = solPD(p); return v.d === s.d && v.m === s.m; },
    sol: solPD,
    texto: p => { const s = solPD(p), b = BX[s.d]; return `$\\vec u \\times \\vec v = ${b[0] === '-' ? '-' : ''}${s.m}${b.replace('-', '')}$`; },
    alto: () => 300, pie: 'Mueve las dos reglas.',
    dib(v, K, p, f) {
      const I = (...q) => K.iso(OPD, UPD, ...q), U = I(...p.u), V = I(...p.v), s = solPD(p), c = cruz(p.u, p.v), ok = v.d === s.d && v.m === s.m;
      let h = ejes(K, OPD, UPD, 7, 5) + K.ar(...OPD, ...U, 'lg gr') + K.ar(...OPD, ...V, 'lf gr') + K.c(...OPD, 3.5, 'fk');
      h += K.t(U[0] - 8, U[1] + 4, 'u', 's tg', 'end') + K.t(V[0] + 4, V[1] + 16, 'v', 's tf', 'start');
      h += K.t(8, 18, `u = ${tupla(p.u)}`, 's tg', 'start') + K.t(8, 36, `v = ${tupla(p.v)}`, 's tf', 'start');
      if (v.m > 0) { const W = I(...por(v.m, DIRS[v.d])); h += K.ar(...OPD, ...W, 'la gr') + K.t(W[0] + 8, W[1] - 4, 'tu flecha', 's ta', 'start'); }
      if (f > 0) {
        h += K.f(f, curva(K, I, p.u, p.v, 2.6, 'lo'));
        const T = I(...por(Math.min(1, f * 1.3), c));
        h += K.f(f * 2 - 0.6, K.ar(...OPD, ...T, 'lo gr d'));
        h += K.f(f * 3 - 2, K.t(332, 18, `u × v = ${tupla(c)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `Tu flecha: $${v.m}$ hacia ${DL[v.d]}; $\\|\\vec u\\|\\,\\|\\vec v\\| \\sin 90^{\\circ} = ${solPD(p).m}$`,
    aviso(v, p) {
      const s = solPD(p), a = Math.floor(v.d / 2);
      if (a === eje(p.u) || a === eje(p.v)) return 'u × v es perpendicular a u y a v a la vez: no puede ir por el eje de u ni por el de v.';
      if (v.d !== s.d) return p.opuesto;
      return p.tamano?.[v.m] || `El sentido es bueno, pero el tamaño es ‖u‖‖v‖ sen 90° = ${s.m}.`;
    },
    bien: (v, p) => p.ok,
  });

  // -------------------------------------------------------------- el tamaño es un área: ‖u × v‖ = ‖u‖‖v‖ sen θ
  // u queda quieto; se abre v (manija en el arco) hasta que el paralelogramo tenga el área pedida.  v { g }
  //   params { a, b, area, areaTx, areaPl, th, ini, trampas: { grados: aviso }, ok }
  const OA = [112, 178], SA = 28;
  const areaA = (p, g) => p.a * p.b * Math.sin(g * R);
  XG.figura('pvec-abre-paralelogramo', {
    ini: p => ({ g: p.ini }),
    manijas: p => [{ k: 'g', min: 0, max: 180, paso: 15, rot: () => 'v', en: v => at(OA, p.b * SA, v.g),
      de: (x, y) => { const g = Math.atan2(OA[1] - y, x - OA[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
    ok: (v, p) => Math.abs(areaA(p, v.g) - p.area) < 1e-6,
    sol: p => ({ g: p.th }),
    texto: p => `$${p.a} \\cdot ${p.b} \\sin\\theta = ${p.areaTx}$: $\\theta = ${p.th}^{\\circ}$ o $\\theta = ${180 - p.th}^{\\circ}$`,
    alto: () => 214, pie: 'Arrastra la punta de v.',
    dib(v, K, p, f) {
      const U = [OA[0] + p.a * SA, OA[1]], V = at(OA, p.b * SA, v.g), W = [U[0] + V[0] - OA[0], U[1] + V[1] - OA[1]], A = areaA(p, v.g), ok = Math.abs(A - p.area) < 1e-6;
      let h = K.p([OA, U, W, V], 'fa') + K.ar(...OA, ...U, 'lg gr') + K.ar(...OA, ...V, 'lf gr') + K.c(...OA, 3.5, 'fk');
      h += K.t((OA[0] + U[0]) / 2, OA[1] + 18, `‖u‖ = ${p.a}`, 's tg') + K.t(8, 36, `‖v‖ = ${p.b}`, 's tf', 'start');
      if (v.g > 0 && v.g < 180) h += K.arc(...OA, 18, 0, v.g, 'lm') + K.t(...at(OA, 30, v.g / 2).map((z, i) => z + (i ? 4 : 0)), 'θ', 's tm');
      h += K.t(8, 18, `lona: ${p.areaPl} m²`, 's tm', 'start');
      if (f > 0) {
        h += K.f(f, K.l(V[0], V[1], V[0], OA[1], 'lf d') + K.t(V[0] + 6, (V[1] + OA[1]) / 2, 'h', 's tf', 'start'));
        h += K.f(f * 3 - 2, K.t(332, 18, `área = ${p.a} · ${p.b} · sen ${v.g}° = ${fm(A)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$${p.a} \\cdot ${p.b} \\sin ${v.g}^{\\circ} = ${Math.round(areaA(p, v.g) * 1000) / 1000}$`,
    aviso(v, p) {
      const A = areaA(p, v.g);
      if (p.trampas?.[v.g]) return p.trampas[v.g];
      return A < p.area ? `El área da ${fm(A)}: falta. Acerca el ángulo a 90°, donde el área es la máxima.` : `El área da ${fm(A)}: sobra. Aleja el ángulo de 90°.`;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ la cuenta: el determinante con î, ĵ, k̂ arriba
  // Se arrastran las tres componentes de u × v; al comprobar, el producto escalar confirma que es perpendicular a los dos.
  //   params { u, v, metas, fichas, mira, trampas, ok }
  const slotT = i => ({ x: 290, y: 48 + 52 * i, w: 78, h: 38 });
  XG.rotula('pvec-tapa-columnas', {
    slots: p => p.metas.map((_, i) => slotT(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 206,
    texto: p => `$\\vec u \\times \\vec v = (${cruz(p.u, p.v).join(', ')})$`,
    fondo(K, p, f) {
      const X = [44, 94, 144], Y = [62, 98, 134];
      let h = K.l(22, 44, 22, 150, 'lm gr') + K.l(166, 44, 166, 150, 'lm gr') + K.t(8, 22, 'u × v =', 's tm', 'start');
      ['î', 'ĵ', 'k̂'].forEach((s, j) => { h += K.t(X[j], Y[0], s, 'ta'); });
      p.u.forEach((x, j) => { h += K.t(X[j], Y[1], sg(x), 'tg'); });
      p.v.forEach((x, j) => { h += K.t(X[j], Y[2], sg(x), 'tf'); });
      h += K.t(94, 170, 'el del medio lleva −', 's tm');
      ['en î:', 'en ĵ:', 'en k̂:'].forEach((e, i) => { const s = slotT(i); h += K.t(s.x - s.w / 2 - 8, s.y + 5, e, 's', 'end'); });
      return h + K.f(f, K.t(8, 196, `u · (u × v) = 0 y v · (u × v) = 0 ✓`, 's to', 'start'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ----------------------------------------------------------------------- la rueda î → ĵ → k̂ y los productos de la base
  //   params { et: [rótulo de cada lugar], metas, fichas, mira, trampas, ok }
  const slotR = i => ({ x: 290, y: 40 + 46 * i, w: 76, h: 36 });
  const CR = [86, 108], RR = 50;
  XG.rotula('pvec-rueda-ijk', {
    slots: p => p.metas.map((_, i) => slotR(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 210,
    texto: p => p.et.map((e, i) => `${e} = ${p.metas[i]}`).join(', '),
    fondo(K, p, f) {
      const G = [90, -30, 210];
      let h = K.arc(...CR, RR, 0, 360, 'lm');
      G.forEach((g, i) => {
        const b = g - 120;   // a favor del ciclo: de g a g − 120, en el sentido del reloj
        const P = at(CR, RR, b + 20), Q = at(CR, RR, b + 13);
        h += K.arc(...CR, RR, b + 13, g - 13, 'la gr') + K.ar(...P, ...Q, 'la gr');
        const T = at(CR, RR, g);
        h += K.c(...T, 13, 'fn') + K.t(T[0], T[1] + 5, ['î', 'ĵ', 'k̂'][i], 'ta');
      });
      h += K.t(CR[0], 192, 'a favor +, en contra −', 's tm');
      p.et.forEach((e, i) => { const s = slotR(i); h += K.t(s.x - s.w / 2 - 8, s.y + 5, `${e} =`, 's', 'end'); });
      return h + K.f(f, K.t(CR[0], CR[1] + 5, 'u × u = 0', 's to'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------------- paralelos dan cero: r × F = 0
  // Ocho fuerzas; se tocan las que no hacen girar la palanca r (las paralelas a r).
  //   params { r, fs: [F × 8], falta, ok }
  const cajaF = i => ({ x: 86 + 168 * (i % 2), y: 66 + 44 * Math.floor(i / 2), w: 160, h: 38 });
  const nulas = p => p.fs.map((F, i) => (cruz(p.r, F).every(x => x === 0) ? i : -1)).filter(i => i >= 0);
  XG.marca('pvec-paralelas-cero', {
    sitios: p => p.fs.map((_, i) => cajaF(i)),
    cara: (K, p, i, on) => { const c = cajaF(i); return K.t(c.x - c.w / 2 + 8, c.y - 6, i + 1, 's tm', 'start') + K.t(c.x + 6, c.y + 8, `F = ${tupla(p.fs[i])}`, `s ${on ? 'ta' : ''}`); },
    fondo: (K, p) => K.t(8, 18, `palanca r = ${tupla(p.r)}`, 's tg', 'start') + K.t(332, 18, 'no gira si r × F = 0', 's tm', 'end'),
    alto: () => 240, nombre: (p, i) => `fuerza ${i + 1}`, pie: 'Toca las fuerzas que no hacen girar la palanca.',
    sol: p => nulas(p),
    aviso(on, p) {
      const s = nulas(p), i = on.findIndex((o, k) => o && !s.includes(k));
      if (i < 0) return p.falta;
      return `La fuerza ${i + 1} da r × F = ${tupla(cruz(p.r, p.fs[i]))}, que no es 0: no es paralela a r y sí la hace girar.`;
    },
    bien: p => p.ok,
    texto: p => `las fuerzas ${nulas(p).map(i => i + 1).join(', ')}: son múltiplos de r`,
  });

  // ------------------------------------------------------------------- la torca de una llave: τ = r × F, su parte en z
  // Se arrastra la mano por la llave (r = (s, 0, 0)); la fuerza F es fija. Al comprobar se ve τ y lo que gira el tornillo.  v { s }
  //   params { F, meta, ini, trampas: { s: aviso }, ok }
  const OL = [60, 200], UL = 40;
  const IL = (...q) => XPK.iso(OL, UL, ...q);
  const tauL = (p, s) => cruz([s, 0, 0], p.F);
  XG.figura('pvec-llave-torca', {
    ini: p => ({ s: p.ini }),
    manijas: () => [{ k: 's', min: 0.05, max: 0.4, paso: 0.05, rot: () => 'r', en: v => IL(v.s * 10, 0, 0), de: x => (x - OL[0]) / (UL * 0.866 * 10) }],
    ok: (v, p) => Math.abs(tauL(p, v.s)[2] - p.meta) < 1e-9,
    sol: p => ({ s: Math.round(p.meta / p.F[1] * 1000) / 1000 }),
    texto: p => `$s = ${Math.round(p.meta / p.F[1] * 1000) / 1000}$ m: $\\tau_z = ${p.F[1]}s = ${p.meta}$ N·m`,
    alto: () => 240, pie: 'Arrastra la mano por la llave.',
    dib(v, K, p, f) {
      const T = tauL(p, v.s), ok = Math.abs(T[2] - p.meta) < 1e-9, M = IL(v.s * 10, 0, 0), E = IL(4.4, 0, 0);
      let h = K.l(...OL, OL[0], OL[1] - 34, 'lm gr d') + K.t(OL[0] - 6, OL[1] - 30, 'z', 's tm', 'end');
      h += K.l(...OL, ...E, 'lm gr') + K.p([[OL[0] - 9, OL[1]], [OL[0] - 5, OL[1] - 6], [OL[0] + 5, OL[1] - 6], [OL[0] + 9, OL[1]], [OL[0] + 5, OL[1] + 6], [OL[0] - 5, OL[1] + 6]], 'fk');
      for (let k = 1; k <= 4; k++) { const A = IL(k, 0, 0); h += K.l(A[0], A[1] - 4, A[0], A[1] + 4, 'lm') + (k > 1 ? K.t(A[0] + 6, A[1] + 20, `${k * 10} cm`, 's tm') : ''); }
      const Fs = por(1 / 25, p.F), Ft = K.iso(M, UL, ...Fs);
      h += K.ar(...M, ...Ft, 'la gr') + K.t(Ft[0] - 6, Ft[1] - 4, 'F', 's ta', 'end');
      h += K.t(8, 18, `F = ${tupla(p.F)} N`, 's ta', 'start') + K.t(8, 36, `r = (s, 0, 0) m`, 's tm', 'start') + K.t(8, 54, `meta: τz = ${p.meta} N·m`, 's tm', 'start');
      if (f > 0) {
        const g = Math.min(1, f * 1.3), Z = [OL[0], OL[1] - T[2] * 5 * g];
        h += K.f(f, K.ar(...OL, ...Z, `${ok ? 'lo' : 'lf'} gr`) + K.t(Z[0] - 6, Z[1], 'τz', `s ${ok ? 'to' : 'tf'}`, 'end'));
        h += K.f(f * 3 - 2, K.t(332, 18, `τ = r × F = ${tupla(T.map(x => Math.round(x * 1000) / 1000))}`, 's tm', 'end')
          + K.t(332, 36, `gira el tornillo: τz = ${fm(T[2])} N·m ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec r \\times \\vec F = (${tauL(p, v.s).map(x => Math.round(x * 1000) / 1000).join(', ')})$ con $s = ${v.s}$`,
    aviso(v, p) {
      const t = tauL(p, v.s)[2];
      return p.trampas?.[v.s] || `Con la mano en s = ${fm(v.s)} m, τz = ${p.F[1]} · ${fm(v.s)} = ${fm(t)} N·m: ${t < p.meta ? 'falta; aléjala del tornillo' : 'sobra; acércala al tornillo'}.`;
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- el triple producto: volumen de la caja que se inclina
  // La base (u y v) queda quieta; se arrastra la punta de w = (a, wy, h). Inclinar no cambia el volumen; la altura sí.  v { a, h }
  //   params { u, v, wy, meta, ini: [a, h], trampas: { 'a:h': aviso }, ok }
  const OC = [150, 214], UC = 22;
  const IC = (...q) => XPK.iso(OC, UC, ...q);
  const wC = (p, v) => [v.a, p.wy, v.h];
  const detC = (p, v) => dot(p.u, cruz(p.v, wC(p, v)));
  XG.figura('pvec-caja-inclinada', {
    ini: p => ({ a: p.ini[0], h: p.ini[1] }),
    manijas: p => [{ k: ['a', 'h'], min: [-2, 1], max: [2, 5], paso: 1, rot: () => 'w', en: v => IC(v.a, p.wy, v.h),
      de: (x, y) => { const a = (x - OC[0]) / (UC * 0.866) + p.wy; return [a, (OC[1] - y - (a + p.wy) * UC * 0.4) / UC]; } }],
    ok: (v, p) => Math.abs(Math.abs(detC(p, v)) - p.meta) < 1e-9,
    sol: p => { for (let h = 1; h <= 5; h++) if (Math.abs(detC(p, { a: 0, h })) === p.meta) return { a: 0, h }; return { a: 0, h: 1 }; },
    texto: p => { const b = nor(cruz(p.u, p.v)); return `altura $h = ${p.meta / b}$, con cualquier inclinación: $|\\vec u \\cdot (\\vec v \\times \\vec w)| = ${b} \\cdot ${p.meta / b} = ${p.meta}$`; },
    alto: () => 236, pie: 'Arrastra la esquina de arriba.',
    dib(v, K, p, f) {
      const a = p.u, b = p.v, w = wC(p, v), z = [0, 0, 0], d = detC(p, v), ok = Math.abs(Math.abs(d) - p.meta) < 1e-9;
      const caras = [[z, a, suma(a, b), b], [w, suma(a, w), suma(a, b, w), suma(b, w)], [z, a, suma(a, w), w], [b, suma(a, b), suma(a, b, w), suma(b, w)], [z, b, suma(b, w), w], [a, suma(a, b), suma(a, b, w), suma(a, w)]];
      let h = caras.map(c => K.p(c.map(q => IC(...q)), f >= 1 ? (ok ? 'fo' : 'ff') : 'fa')).join('');
      h += K.ar(...OC, ...IC(...a), 'la gr') + K.ar(...OC, ...IC(...b), 'la gr') + K.ar(...OC, ...IC(...w), 'lg gr');
      h += K.t(...IC(...suma(a, [0.2, 0, -0.6])), 'u', 's ta', 'start') + K.t(...IC(...suma(b, [-0.4, 0, -0.5])), 'v', 's ta', 'end');
      h += K.t(332, 18, `u = ${tupla(p.u)}`, 's ta', 'end') + K.t(332, 36, `v = ${tupla(p.v)}`, 's ta', 'end') + K.t(332, 54, `w = ${tupla(w)}`, 's tg', 'end') + K.t(332, 72, `meta: ${p.meta} cm³`, 's tm', 'end');
      if (f > 0) {
        const W = IC(...w), B = IC(w[0], w[1], 0);
        h += K.f(f, K.l(...W, ...B, 'lf d') + K.c(...B, 3, 'ff') + K.t(W[0] - 6, (W[1] + B[1]) / 2, 'h', 's tf', 'end'));
        h += K.f(f * 3 - 2, K.t(332, 94, `V = |u · (v × w)| = ${Math.abs(d)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec u \\cdot (\\vec v \\times \\vec w) = ${detC(p, v)}$ con $\\vec w = (${wC(p, v).join(', ')})$`,
    aviso(v, p) {
      const V = Math.abs(detC(p, v));
      return p.trampas?.[`${v.a}:${v.h}`] || `Con w = ${tupla(wC(p, v))} el volumen es ${V} cm³: ${V < p.meta ? 'falta' : 'sobra'}. Lo que cuenta es la altura de w sobre la base, no cuánto se inclina.`;
    },
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------- en movimiento: llenar una caja inclinada (o un prisma)
  // Se fijan los litros y al soltar se vierten: el líquido sube por la caja; si sobra, rebosa; si falta, no la llena.
  //   tiro { q, u, v, w, prisma, r, min, max, cuenta, trampas }
  const OT = [110, 200], UT = 20;
  const JX = 270, JY = 64, JW = 46, JH = 120;
  const solido = (K, t, ws, cls) => {
    const I = q => K.iso(OT, UT, ...q), z = [0, 0, 0], a = t.u, b = t.v, w = ws;
    const caras = t.prisma
      ? [[z, a, b], [w, suma(a, w), suma(b, w)], [z, a, suma(a, w), w], [a, b, suma(b, w), suma(a, w)], [b, z, w, suma(b, w)]]
      : [[z, a, suma(a, b), b], [w, suma(a, w), suma(a, b, w), suma(b, w)], [z, a, suma(a, w), w], [b, suma(a, b), suma(a, b, w), suma(b, w)], [z, b, suma(b, w), w], [a, suma(a, b), suma(a, b, w), suma(a, w)]];
    return caras.map(c => K.p(c.map(I), cls)).join('');
  };
  XG.tiros('pvec-llena-oblicua', {
    perilla: t => ({ et: 'litros que viertes', min: t.min, max: t.max, cara: v => sg(v), lee: v => `${v} L` }),
    meta: t => t.r, alto: 230, ms: 1800, pie: 'Fija los litros y suelta.',
    dib(t, v, K, p, f) {
      let h = solido(K, t, t.w, 'fn') + K.t(8, 18, t.prisma ? 'prisma de base triangular' : 'caja inclinada', 's tm', 'start');
      h += K.r(JX, JY, JW, JH, 'fn', 4) + K.t(JX + JW / 2, JY + JH + 18, 'jarra', 's tm');
      if (v == null) return h + K.t(JX + JW / 2, JY - 8, '0 L', 's tm');
      const g = Math.min(1, f * 1.1), s = Math.min(1, v / t.r) * g, ok = v === t.r, lv = v * (1 - g) / t.max * JH;
      h += K.r(JX + 2, JY + JH - lv, JW - 4, lv, 'fa', 2) + K.t(JX + JW / 2, JY - 8, `${v} L`, 's ta');
      if (s > 0.01) h += solido(K, t, por(s, t.w), 'fa');
      if (v > t.r && g > 0.9) { const T = K.iso(OT, UT, ...suma(t.u, t.w)); h += K.c(T[0] + 10, T[1] + 14, 4, 'fa') + K.c(T[0] + 14, T[1] + 30, 3, 'fa') + K.t(T[0] + 22, T[1] + 8, 'se rebosa', 's tf', 'start'); }
      return h + K.f(f * 3 - 2, K.t(332, 18, `le caben ${t.r} L ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} L ${v > t.r ? 'se rebosa' : 'no se llena'}: el volumen es el valor absoluto de u · (v × w)${t.prisma ? ', y el prisma es la mitad de la caja' : ''}.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-18.js
// Geometría Vectorial · juegos de la lección geo-18 «Producto vectorial y geometría analítica» (spec 2026-11-27-curso-geometria-vectorial).
// El producto vectorial hace geometría en el espacio: el área de un triángulo es ½‖AB × AC‖; la normal del plano por tres puntos es
// AB × AC; un plano también se escribe X = P + s·u + t·v; dos planos se cortan en la recta de director n₁ × n₂; el plano que contiene
// una recta y un punto tiene normal d × PQ; la distancia entre rectas que se cruzan es |P₁P₂ · (d₁ × d₂)| / ‖d₁ × d₂‖; cuatro puntos son
// coplanares si el triple producto vale 0, y el tetraedro encierra |triple| / 6; la distancia de un punto a una recta es ‖PQ × d‖ / ‖d‖.
// Armazones de figura-kit.js y logica-kit.js (XG.figura, XG.rotula, XG.marca, XG.tiros) con las piezas XPK; dibujo del espacio en
// perspectiva (x hacia el frente, y a la derecha, z hacia arriba). El producto vectorial en sí es de geo-17; la normal dada y la
// distancia de un punto a un plano, de geo-16.
(() => {
  const cr = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const su = (a, b) => a.map((x, i) => x - b[i]);
  const ad = (a, b) => a.map((x, i) => x + b[i]);
  const mu = (k, a) => a.map(x => k * x);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const no = a => Math.hypot(...a);
  const r2 = x => Math.round(x * 100) / 100;
  const sg = n => String(r2(n)).replace('-', '−');
  const vt = a => `(${a.map(sg).join(', ')})`;
  const tx = n => String(r2(n));
  const casi = x => (Math.abs(x - Math.round(x)) < 1e-9 ? sg(Math.round(x)) : `≈ ${sg(Math.round(x * 10) / 10)}`);
  const paralelo = (a, b) => no(cr(a, b)) < 1e-9;
  // Perspectiva: x hacia el frente (abajo a la izquierda), y a la derecha, z hacia arriba; en unidades.
  const pr0 = q => [q[1] - 0.5 * q[0], 0.45 * q[0] - q[2]];
  // Encuadra los puntos en la caja [x0, x1] × [y0, y1]: S(q) da el punto de la pantalla y u, el tamaño de una unidad vertical.
  const encuadra = (pts, [x0, x1, y0, y1], umax = 26) => {
    const z = pts.map(pr0), bx = [Math.min(...z.map(q => q[0])), Math.max(...z.map(q => q[0]))], by = [Math.min(...z.map(q => q[1])), Math.max(...z.map(q => q[1]))];
    const u = Math.min(umax, (x1 - x0) / Math.max(1e-6, bx[1] - bx[0]), (y1 - y0) / Math.max(1e-6, by[1] - by[0])), m = [(bx[0] + bx[1]) / 2, (by[0] + by[1]) / 2];
    return { u, S: q => { const w = pr0(q); return [(x0 + x1) / 2 + (w[0] - m[0]) * u, (y0 + y1) / 2 + (w[1] - m[1]) * u]; } };
  };
  // Piso cuadriculado z = 0 entre [a0, a1] × [b0, b1].
  const piso = (K, S, a0, a1, b0, b1) => {
    let h = '';
    for (let x = a0; x <= a1; x++) { const a = S([x, b0, 0]), b = S([x, b1, 0]); h += K.l(a[0], a[1], b[0], b[1], 'ls'); }
    for (let y = b0; y <= b1; y++) { const a = S([a0, y, 0]), b = S([a1, y, 0]); h += K.l(a[0], a[1], b[0], b[1], 'ls'); }
    return h;
  };
  const ejes = (K, S, L = 5) => {
    const O = S([0, 0, 0]), X = S([L, 0, 0]), Y = S([0, L, 0]), Z = S([0, 0, L]);
    return K.ar(O[0], O[1], X[0], X[1], 'lm') + K.ar(O[0], O[1], Y[0], Y[1], 'lm') + K.ar(O[0], O[1], Z[0], Z[1], 'lm')
      + K.t(X[0] - 7, X[1] + 4, 'x', 's tm', 'end') + K.t(Y[0] + 7, Y[1] + 4, 'y', 's tm', 'start') + K.t(Z[0] + 7, Z[1] + 4, 'z', 's tm', 'start');
  };
  const fl = (K, A, B, cls) => K.ar(A[0], A[1], B[0], B[1], cls);
  const ln = (K, A, B, cls) => K.l(A[0], A[1], B[0], B[1], cls);
  const pt = (K, A, s, cls = 'fk', lado = 1, dy = 4) => K.c(A[0], A[1], 4, cls) + (s ? K.t(A[0] + 8 * lado, A[1] + dy, s, 's', lado > 0 ? 'start' : 'end') : '');
  const marcaV = (ok, si, no2) => (ok ? `${si} ✓` : `${no2} ✗`);
  // Lado de la pantalla donde cabe un rótulo: a la izquierda si el punto está muy a la derecha.
  const lado = A => (A[0] > 200 ? -1 : 1);

  // ------------------------------------------------- altura-del-panel-triangular · área del triángulo: ½‖AB × AC‖
  // Un panel triangular se apoya en A y B, en el techo, y en la punta C de un mástil vertical; se arrastra C hacia arriba o abajo.
  //   v { h }   params { A, B, C: [x, y] (pie del mástil), S (área pedida), max, ini, uni, trampas: { h: aviso }, ok }
  const AT = (p, h) => cr(su(p.B, p.A), su([...p.C, h], p.A));
  const AREA = (p, h) => no(AT(p, h)) / 2;
  const AF = p => encuadra([[0, 0, 0], [0, 5, 0], [5, 0, 0], [5, 5, 0], p.A, p.B, [...p.C, 0], [...p.C, p.max], ad(p.B, su([...p.C, p.max], p.A))], [16, 198, 34, 244], 24);
  const AS = p => { for (let h = 0; h <= p.max; h++) if (Math.abs(AREA(p, h) - p.S) < 1e-9) return h; return null; };
  XG.figura('altura-del-panel-triangular', {
    ini: p => ({ h: p.ini }),
    manijas: p => { const F = AF(p), y0 = F.S([...p.C, 0])[1]; return [{ k: 'h', min: 0, max: p.max, paso: 1, rot: () => 'C', en: v => F.S([...p.C, v.h]), de: (x, y) => (y0 - y) / F.u }]; },
    ok: (v, p) => Math.abs(AREA(p, v.h) - p.S) < 1e-9,
    sol: p => ({ h: AS(p) }),
    texto: p => { const h = AS(p), n = AT(p, h); return `$h = ${h}$: $\\overrightarrow{AB} \\times \\overrightarrow{AC} = (${n.join(', ')})$ y $\\tfrac12 \\cdot ${tx(no(n))} = ${p.S}$`; },
    alto: () => 250, pie: 'Arrastra la punta C del mástil hacia arriba o hacia abajo.',
    dib(v, K, p, f) {
      const { S } = AF(p), A = S(p.A), B = S(p.B), C = S([...p.C, v.h]), C0 = S([...p.C, 0]);
      let h = piso(K, S, 0, 5, 0, 5) + ejes(K, S, 5.5);
      h += ln(K, C0, C, 'lm d') + K.p([A, B, C], 'fa') + ln(K, A, B, 'la') + ln(K, B, C, 'la') + ln(K, C, A, 'la');
      h += pt(K, A, 'A', 'fk', -1) + pt(K, B, 'B', 'fk', 1) + K.c(C0[0], C0[1], 3, 'fk');
      h += K.t(214, 40, `A${vt(p.A)}`, 's', 'start') + K.t(214, 58, `B${vt(p.B)}`, 's', 'start') + K.t(214, 76, `C(${sg(p.C[0])}, ${sg(p.C[1])}, h)`, 's', 'start')
        + K.t(214, 100, `h = ${v.h} ${p.uni}`, 's ta', 'start') + K.t(214, 122, `área pedida: ${p.S} ${p.uni}²`, 's tm', 'start');
      if (f > 0) {   // los dos lados desde A, el paralelogramo y su mitad
        const n = AT(p, v.h), a = AREA(p, v.h), ok = Math.abs(a - p.S) < 1e-9, D = S(ad(p.B, su([...p.C, v.h], p.A))), g = Math.min(1, f * 1.4);
        h += fl(K, A, [A[0] + (B[0] - A[0]) * g, A[1] + (B[1] - A[1]) * g], 'lf gr') + fl(K, A, [A[0] + (C[0] - A[0]) * g, A[1] + (C[1] - A[1]) * g], 'lf gr');
        h += K.f(f * 2 - 1, ln(K, B, D, 'lm d') + ln(K, C, D, 'lm d'))
          + K.f(f * 3 - 2, K.t(214, 148, 'AB × AC =', 's tm', 'start') + K.t(214, 166, vt(n), 's tm', 'start') + K.t(214, 186, `norma: ${casi(no(n))}`, 's tm', 'start')
            + K.t(214, 208, `área = ${casi(a)} ${p.uni}²`, `s ${ok ? 'to' : 'tf'}`, 'start') + K.t(214, 228, ok ? 'justo ✓' : 'no es ✗', `s ${ok ? 'to' : 'tf'}`, 'start'));
      }
      return h;
    },
    lee: (v, p) => `$C = (${p.C[0]}, ${p.C[1]}, ${v.h})$`,
    aviso(v, p) {
      const t = p.trampas?.[v.h]; if (t) return t;
      const a = AREA(p, v.h), n = no(AT(p, v.h));
      if (Math.abs(n - p.S) < 1e-9) return `Con h = ${v.h}, ‖AB × AC‖ da ${p.S}: ese es el área del paralelogramo. El triángulo es la mitad.`;
      return `Con h = ${v.h} el panel mide ½·${casi(n)} = ${casi(a)} ${p.uni}²: ${a < p.S ? 'le falta' : 'le sobra'}. Calcula AB × AC con C = (${sg(p.C[0])}, ${sg(p.C[1])}, h) y su norma.`;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------- normal-de-tres-postes · el plano por tres puntos: n = AB × AC
  // Tres postes sostienen una lona en A, B y C. Se ajustan las tres componentes de la flecha n, que sale del centro de la lona;
  // vale cualquier múltiplo no nulo de AB × AC.   v { a, b, c }   params { A, B, C, ini, uni, trampas: { 'a,b,c': aviso }, ok }
  const NN = p => cr(su(p.B, p.A), su(p.C, p.A));
  const NF = p => encuadra([[0, 0, 0], [0, 4, 0], [4, 0, 0], [4, 4, 0], p.A, p.B, p.C], [16, 206, 30, 156], 30);
  XG.figura('normal-de-tres-postes', {
    ini: p => ({ a: p.ini[0], b: p.ini[1], c: p.ini[2] }),
    manijas: () => [{ k: 'a', min: -4, max: 4, paso: 1, et: 'componente n₁' }, { k: 'b', min: -4, max: 4, paso: 1, et: 'componente n₂' }, { k: 'c', min: -4, max: 4, paso: 1, et: 'componente n₃' }],
    ok: (v, p) => (v.a || v.b || v.c) && paralelo([v.a, v.b, v.c], NN(p)),
    sol: p => { const n = NN(p); return { a: n[0], b: n[1], c: n[2] }; },
    texto: p => { const n = NN(p); return `$\\vec n = \\overrightarrow{AB} \\times \\overrightarrow{AC} = (${n.join(', ')})$ o un múltiplo; el plano es $${n[0]}x ${n[1] < 0 ? '-' : '+'} ${Math.abs(n[1])}y ${n[2] < 0 ? '-' : '+'} ${Math.abs(n[2])}z = ${dot(n, p.A)}$`; },
    alto: () => 300,
    dib(v, K, p, f) {
      const { S } = NF(p), A = S(p.A), B = S(p.B), C = S(p.C), w = [v.a, v.b, v.c], G = mu(1 / 3, ad(ad(p.A, p.B), p.C)), Gs = S(G);
      let h = piso(K, S, 0, 4, 0, 4);
      for (const q of [p.A, p.B, p.C]) h += ln(K, S([q[0], q[1], 0]), S(q), 'lm');
      h += K.p([A, B, C], 'fa') + ln(K, A, B, 'la') + ln(K, B, C, 'la') + ln(K, C, A, 'la') + pt(K, A, 'A', 'fk', lado(A)) + pt(K, B, 'B', 'fk', lado(B)) + pt(K, C, 'C', 'fk', lado(C));
      if (no(w) > 0) { const E = S(ad(G, mu(1.8 / no(w), w))); h += fl(K, Gs, E, 'la gr') + K.t(E[0] + 7, E[1] - 4, 'n', 's ta', 'start'); }
      h += K.c(Gs[0], Gs[1], 3, 'fk');
      h += K.t(216, 34, `A${vt(p.A)}`, 's', 'start') + K.t(216, 52, `B${vt(p.B)}`, 's', 'start') + K.t(216, 70, `C${vt(p.C)}`, 's', 'start') + K.t(216, 94, `n = ${vt(w)}`, 's ta', 'start');
      if (f > 0) {
        const AB = su(p.B, p.A), AC = su(p.C, p.A), x = dot(w, AB), y = dot(w, AC), ok = no(w) > 0 && x === 0 && y === 0;
        h += K.f(f, fl(K, A, B, 'lf gr') + fl(K, A, C, 'lf gr'))
          + K.f(f * 3 - 2, K.t(216, 118, `n · AB = ${sg(x)}`, `s ${x === 0 ? 'to' : 'tf'}`, 'start') + K.t(216, 136, `n · AC = ${sg(y)}`, `s ${y === 0 ? 'to' : 'tf'}`, 'start')
            + K.t(216, 154, ok ? 'normal ✓' : 'no es normal ✗', `s ${ok ? 'to' : 'tf'}`, 'start'));
      }
      return h;
    },
    lee: v => `$\\vec n = (${v.a}, ${v.b}, ${v.c})$`,
    aviso(v, p) {
      const w = [v.a, v.b, v.c], t = p.trampas?.[w.join()]; if (t) return t;
      if (!no(w)) return 'Con n = (0, 0, 0) no hay dirección: la normal no puede ser el vector cero.';
      const x = dot(w, su(p.B, p.A)), y = dot(w, su(p.C, p.A));
      if (x === 0) return `n es perpendicular a AB, pero n · AC = ${sg(y)}: no es perpendicular a AC. Calcula AB × AC.`;
      if (y === 0) return `n es perpendicular a AC, pero n · AB = ${sg(x)}: no es perpendicular a AB. Calcula AB × AC.`;
      return `n · AB = ${sg(x)} y n · AC = ${sg(y)}: n no es perpendicular al plano de A, B y C. La normal es AB × AC, con AB = B − A y AC = C − A.`;
    },
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------- baldosas-del-plano-inclinado · el plano paramétrico X = P + s·u + t·v
  // Las uniones de las baldosas de un techo van en las direcciones u y v desde la esquina P. Q no se ve: se dan sus coordenadas y se
  // arrastra X por los cruces de la rejilla hasta él.   v { s, t }   params { P, u, v, Q, s, t, ini, trampas: { 's,t': aviso }, ok }
  const BR = [-1, 3];
  const BX = (p, s, t) => ad(ad(p.P, mu(s, p.u)), mu(t, p.v));
  const BF = p => { const c = []; for (const s of BR) for (const t of BR) c.push(BX(p, s, t)); return encuadra(c, [16, 214, 26, 236], 26); };
  XG.figura('baldosas-del-plano-inclinado', {
    ini: p => ({ ...p.ini }),
    manijas: p => {
      const { S } = BF(p), O = S(p.P), a = su(S(ad(p.P, p.u)), O), b = su(S(ad(p.P, p.v)), O), det = a[0] * b[1] - a[1] * b[0];
      return [{ k: ['s', 't'], min: BR[0], max: BR[1], paso: 1, rot: () => 'X', en: v => S(BX(p, v.s, v.t)),
        de: (x, y) => { const dx = x - O[0], dy = y - O[1]; return [(dx * b[1] - dy * b[0]) / det, (a[0] * dy - a[1] * dx) / det]; } }];
    },
    ok: (v, p) => v.s === p.s && v.t === p.t,
    sol: p => ({ s: p.s, t: p.t }),
    texto: p => `$Q = P ${p.s < 0 ? '-' : '+'} ${Math.abs(p.s)}\\,\\vec u ${p.t < 0 ? '-' : '+'} ${Math.abs(p.t)}\\,\\vec v$: $s = ${p.s}$, $t = ${p.t}$`,
    alto: () => 250, pie: 'Arrastra X por los cruces de las uniones.',
    dib(v, K, p, f) {
      const { S } = BF(p), X = S(BX(p, v.s, v.t)), O = S(p.P);
      let h = K.p([S(BX(p, -1, -1)), S(BX(p, 3, -1)), S(BX(p, 3, 3)), S(BX(p, -1, 3))], 'fa');
      for (let k = BR[0]; k <= BR[1]; k++) h += ln(K, S(BX(p, k, BR[0])), S(BX(p, k, BR[1])), 'lm') + ln(K, S(BX(p, BR[0], k)), S(BX(p, BR[1], k)), 'lm');
      h += fl(K, O, S(ad(p.P, p.u)), 'lg gr') + fl(K, O, S(ad(p.P, p.v)), 'lg gr') + pt(K, O, 'P', 'fk', -1, 16);
      const U = S(ad(p.P, mu(0.6, p.u))), V = S(ad(p.P, mu(0.6, p.v)));
      h += K.t(U[0] + 8, U[1] + 4, 'u', 's tg', 'start') + K.t(V[0], V[1] - 8, 'v', 's tg');
      h += K.t(222, 34, 'X = P + s·u + t·v', 's tm', 'start') + K.t(222, 56, `P${vt(p.P)}`, 's', 'start') + K.t(222, 74, `u = ${vt(p.u)}`, 's tg', 'start')
        + K.t(222, 92, `v = ${vt(p.v)}`, 's tg', 'start') + K.t(222, 116, `clavo Q${vt(p.Q)}`, 's ta', 'start') + K.t(222, 140, `s = ${v.s}, t = ${v.t}`, 's', 'start');
      if (f > 0) {   // el camino de P: s veces u y luego t veces v; y el clavo
        const g = Math.min(1, f * 1.5), M = S(BX(p, v.s * g, 0)), E = S(BX(p, v.s, v.t * g)), Qs = S(p.Q), w = BX(p, v.s, v.t), ok = v.s === p.s && v.t === p.t;
        h += (v.s ? fl(K, O, M, 'lf gr') : '') + (v.t && g > 0.99 ? fl(K, S(BX(p, v.s, 0)), E, 'lf gr') : '')
          + K.f(f * 3 - 2, K.c(Qs[0], Qs[1], 7, ok ? 'fo' : 'ff') + K.t(222, 164, `X = ${vt(w)}`, 's tm', 'start') + K.t(222, 184, marcaV(ok, 'es el clavo', 'no es Q'), `s ${ok ? 'to' : 'tf'}`, 'start'));
      }
      return h;
    },
    lee: (v, p) => `$X = (${BX(p, v.s, v.t).join(', ')})$`,
    aviso(v, p) {
      const t = p.trampas?.[`${v.s},${v.t}`]; if (t) return t;
      const w = BX(p, v.s, v.t), bien = w.map((x, i) => x === p.Q[i]), n = bien.filter(Boolean).length;
      return `Con s = ${v.s} y t = ${v.t} llegas a ${vt(w)}${n ? `: coincide${n > 1 ? 'n' : ''} ${n} coordenada${n > 1 ? 's' : ''}, no las tres` : ', no a Q'}. Iguala P + s·u + t·v con Q componente a componente.`;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------ director-del-pliegue · la recta de corte de dos planos
  // Dos techos se cortan en la cumbrera. Se tocan todos los vectores que sirven de dirección de esa recta: los múltiplos de n₁ × n₂.
  //   params { e1, e2 (ecuaciones en texto), n1, n2, vs: [vector] × 6, por: [aviso de cada uno que no sirve], falta, ok }
  const DC = i => ({ x: 88 + 164 * (i % 2), y: 146 + 42 * Math.floor(i / 2), w: 156, h: 34 });
  const DS = p => { const d = cr(p.n1, p.n2); return p.vs.map((w, i) => (paralelo(w, d) ? i : -1)).filter(i => i >= 0); };
  XG.marca('director-del-pliegue', {
    sitios: p => p.vs.map((_, i) => DC(i)),
    cara: (K, p, i, on) => { const c = DC(i); return K.t(c.x, c.y + 5, vt(p.vs[i]), on ? 'ta' : ''); },
    fondo(K, p) {
      const R1 = [126, 74], R2 = [264, 60];
      return K.t(8, 16, `techo 1: ${p.e1}`, 's', 'start') + K.t(8, 34, `techo 2: ${p.e2}`, 's', 'start')
        + K.p([R1, R2, [304, 112], [166, 126]], 'fa') + K.p([R1, R2, [214, 104], [76, 118]], 'fn')
        + K.l(R1[0], R1[1], R2[0], R2[1], 'la gr') + K.t(R2[0] + 6, R2[1] - 6, 'cumbrera', 's ta', 'start');
    },
    alto: () => 250, nombre: (p, i) => vt(p.vs[i]), pie: 'Toca todos los vectores que sirven como dirección de la cumbrera.',
    sol: DS,
    aviso: (on, p) => { const s = DS(p), i = on.findIndex((o, k) => o && !s.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => `$\\vec n_1 \\times \\vec n_2 = (${cr(p.n1, p.n2).join(', ')})$ y sus múltiplos no nulos`,
  });

  // ----------------------------------------------------- plano-del-cable-y-poste · plano con una recta y un punto
  // Un cable recto L pasa por P con director d; la punta Q de un poste está fuera de él. Se arrastran PQ, la normal d × PQ y la
  // constante k del plano n · X = k que los contiene. Al comprobar aparece el plano.
  //   params { P, d, Q, et: [rótulos de los lugares], metas, fichas, mira: [aviso por lugar], trampas: { 'i:ficha': aviso }, texto, ok }
  const CL = i => ({ x: 270, y: 60 + 64 * i, w: 120, h: 36 });
  const cuadro = (K, p, i) => K.t(CL(i).x, CL(i).y - 24, p.et[i], 's tm');
  const CF = p => encuadra([[0, 0, 0], [0, 4, 0], [4, 0, 0], [4, 4, 0], ad(p.P, mu(-1.2, p.d)), ad(p.P, mu(1.6, p.d)), p.Q, [p.Q[0], p.Q[1], 0]], [16, 196, 50, 206], 22);
  XG.rotula('plano-del-cable-y-poste', {
    slots: p => p.metas.map((_, i) => CL(i)), fichas: p => p.fichas, metas: p => p.metas, alto: () => 216, texto: p => p.texto,
    fondo(K, p, f) {
      const { S } = CF(p), L0 = S(ad(p.P, mu(-1.2, p.d))), L1 = S(ad(p.P, mu(1.6, p.d))), P = S(p.P), Q = S(p.Q), Q0 = S([p.Q[0], p.Q[1], 0]), n = cr(p.d, su(p.Q, p.P));
      let h = piso(K, S, 0, 4, 0, 4);
      h += K.f(f, K.p([S(ad(p.P, mu(-1.2, p.d))), S(ad(p.P, mu(1.6, p.d))), S(ad(ad(p.P, mu(1.6, p.d)), su(p.Q, p.P))), S(ad(ad(p.P, mu(-1.2, p.d)), su(p.Q, p.P)))], 'fa'));
      h += ln(K, L0, L1, 'lg gr') + ln(K, Q0, Q, 'lm') + fl(K, P, S(ad(p.P, p.d)), 'lg gr') + pt(K, P, 'P', 'fk', -1, 16) + pt(K, Q, 'Q', 'fk', 1);
      h += K.t(8, 16, `cable L: X = ${vt(p.P)} + t${vt(p.d)}`, 's', 'start') + K.t(8, 34, `poste: Q${vt(p.Q)}`, 's', 'start');
      if (f > 0) h += K.f(f, fl(K, P, S(ad(p.P, mu(1.8 / no(n), n))), 'lo gr') + K.t(8, 210, `plano: ${p.plano}`, 's to', 'start'));
      return h + p.et.map((_, i) => cuadro(K, p, i)).join('');
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ----------------------------------------- cables-que-se-cruzan-sin-tocarse · distancia entre rectas que se cruzan
  // Dos cables rectos no paralelos y que no se cortan. Se arrastran n = d₁ × d₂, el producto P₁P₂ · n y la distancia |P₁P₂ · n| / ‖n‖.
  // Al comprobar aparece el tramo perpendicular común.   params { P1, d1, P2, d2, et, metas, fichas, mira, trampas, texto, ok }
  const KF = p => encuadra([ad(p.P1, mu(-1.3, p.d1)), ad(p.P1, mu(1.3, p.d1)), ad(p.P2, mu(-1.3, p.d2)), ad(p.P2, mu(1.3, p.d2))], [16, 196, 54, 194], 26);
  // Rótulo junto al extremo más alto de un tramo.
  const arriba = (K, A, B, s, cls) => { const T = A[1] < B[1] ? A : B; return K.t(T[0] + 6, T[1] + 4, s, cls, 'start'); };
  const cercanos = p => {
    const w = su(p.P1, p.P2), a = dot(p.d1, p.d1), b = dot(p.d1, p.d2), c = dot(p.d2, p.d2), d = dot(p.d1, w), e = dot(p.d2, w), den = a * c - b * b;
    return [ad(p.P1, mu((b * e - c * d) / den, p.d1)), ad(p.P2, mu((a * e - b * d) / den, p.d2))];
  };
  XG.rotula('cables-que-se-cruzan-sin-tocarse', {
    slots: p => p.metas.map((_, i) => CL(i)), fichas: p => p.fichas, metas: p => p.metas, alto: () => 216, texto: p => p.texto,
    fondo(K, p, f) {
      const { S } = KF(p), A0 = S(ad(p.P1, mu(-1.3, p.d1))), A1 = S(ad(p.P1, mu(1.3, p.d1))), B0 = S(ad(p.P2, mu(-1.3, p.d2))), B1 = S(ad(p.P2, mu(1.3, p.d2)));
      let h = ln(K, A0, A1, 'lg gr') + ln(K, B0, B1, 'lf gr') + pt(K, S(p.P1), 'P₁', 'fk', -1, 16) + pt(K, S(p.P2), 'P₂', 'fk', 1, 16)
        + arriba(K, A0, A1, 'L₁', 's tg') + arriba(K, B0, B1, 'L₂', 's tf');
      h += K.t(8, 16, `L₁: ${vt(p.P1)} + t${vt(p.d1)}`, 's tg', 'start') + K.t(8, 34, `L₂: ${vt(p.P2)} + s${vt(p.d2)}`, 's tf', 'start');
      if (f > 0) { const [C1, C2] = cercanos(p).map(S); h += K.f(f, ln(K, C1, C2, 'lo gr') + K.c(C1[0], C1[1], 4, 'fo') + K.c(C2[0], C2[1], 4, 'fo') + K.t(8, 210, `separación mínima: ${p.metas[2]}`, 's to', 'start')); }
      return h + p.et.map((_, i) => cuadro(K, p, i)).join('');
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ----------------------------------------- cuarta-pata-de-la-tarima · cuatro puntos coplanares y volumen del tetraedro
  // Tres postes fijos terminan en A, B y C; el cuarto, en D = (x, y, h), y se arrastra su punta. Con V = 0 se busca que los cuatro
  // queden en un plano (triple producto 0); con V > 0, que el tetraedro ABCD encierre V.
  //   v { h }   params { A, B, C, D: [x, y], V, max, ini, uni, que, trampas: { h: aviso }, ok }
  const TT = (p, h) => dot(cr(su(p.B, p.A), su(p.C, p.A)), su([...p.D, h], p.A));
  const TF = p => encuadra([[0, 0, 0], [0, 6, 0], [6, 0, 0], [6, 6, 0], p.A, p.B, p.C, [...p.D, 0], [...p.D, p.max]], [16, 206, 30, 242], 24);
  const TS = p => { for (let h = 0; h <= p.max; h++) if (Math.abs(Math.abs(TT(p, h)) / 6 - p.V) < 1e-9) return h; return null; };
  XG.figura('cuarta-pata-de-la-tarima', {
    ini: p => ({ h: p.ini }),
    manijas: p => { const F = TF(p), y0 = F.S([...p.D, 0])[1]; return [{ k: 'h', min: 0, max: p.max, paso: 1, rot: () => 'D', en: v => F.S([...p.D, v.h]), de: (x, y) => (y0 - y) / F.u }]; },
    ok: (v, p) => Math.abs(Math.abs(TT(p, v.h)) / 6 - p.V) < 1e-9,
    sol: p => ({ h: TS(p) }),
    texto: p => { const h = TS(p), t = TT(p, h); return p.V ? `$h = ${h}$: $\\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD}) = ${t}$ y $V = \\tfrac{${Math.abs(t)}}{6} = ${p.V}$` : `$h = ${h}$: $\\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD}) = 0$, los cuatro puntos son coplanares`; },
    alto: () => 252, pie: 'Arrastra la punta D del cuarto poste hacia arriba o hacia abajo.',
    dib(v, K, p, f) {
      const { S } = TF(p), A = S(p.A), B = S(p.B), C = S(p.C), D = S([...p.D, v.h]);
      let h = piso(K, S, 0, 6, 0, 6);
      for (const q of [p.A, p.B, p.C]) h += ln(K, S([q[0], q[1], 0]), S(q), 'lm');
      h += ln(K, S([...p.D, 0]), D, 'lm d') + K.p([A, B, C], 'fa') + ln(K, A, B, 'la') + ln(K, B, C, 'la') + ln(K, C, A, 'la');
      h += ln(K, A, D, 'lm d') + ln(K, B, D, 'lm d') + ln(K, C, D, 'lm d') + pt(K, A, 'A', 'fk', lado(A)) + pt(K, B, 'B', 'fk', lado(B)) + pt(K, C, 'C', 'fk', lado(C));
      h += K.t(216, 34, `A${vt(p.A)}`, 's', 'start') + K.t(216, 52, `B${vt(p.B)}`, 's', 'start') + K.t(216, 70, `C${vt(p.C)}`, 's', 'start')
        + K.t(216, 88, `D(${sg(p.D[0])}, ${sg(p.D[1])}, h)`, 's', 'start') + K.t(216, 110, `h = ${v.h} ${p.uni}`, 's ta', 'start')
        + K.t(216, 132, p.V ? `volumen: ${p.V} ${p.uni}³` : 'en el plano de A, B, C', 's tm', 'start');
      if (f > 0) {   // el triple producto y la altura que lo anula
        const t = TT(p, v.h), ok = Math.abs(Math.abs(t) / 6 - p.V) < 1e-9, h0 = TS(p), Z = S([...p.D, h0]);
        h += K.f(f, K.c(Z[0], Z[1], 7, ok ? 'fo' : 'ff'))
          + K.f(f * 3 - 2, K.t(216, 158, 'AB · (AC × AD)', 's tm', 'start') + K.t(216, 176, `= ${sg(t)}`, 's tm', 'start') + K.t(216, 198, p.V ? `V = ${casi(Math.abs(t) / 6)} ${p.uni}³` : (t ? 'no es 0: cojea' : 'vale 0: plana'), `s ${ok ? 'to' : 'tf'}`, 'start')
            + K.t(216, 218, ok ? 'justo ✓' : 'no es ✗', `s ${ok ? 'to' : 'tf'}`, 'start'));
      }
      return h;
    },
    lee: (v, p) => `$D = (${p.D[0]}, ${p.D[1]}, ${v.h})$`,
    aviso(v, p) {
      const t0 = p.trampas?.[v.h]; if (t0) return t0;
      const t = TT(p, v.h);
      if (p.V) {
        if (t === 0) return `Con h = ${v.h} el triple producto vale 0: D cae en el plano de A, B y C y el tetraedro se aplasta.`;
        if (Math.abs(Math.abs(t) - p.V) < 1e-9) return `Con h = ${v.h} el triple producto vale ${sg(t)}: ese es el volumen de la caja. El tetraedro es la sexta parte.`;
        return `Con h = ${v.h} el volumen es |${sg(t)}| / 6 = ${casi(Math.abs(t) / 6)} ${p.uni}³: ${Math.abs(t) / 6 < p.V ? 'le falta' : 'le sobra'}. Calcula AB · (AC × AD) con D = (${sg(p.D[0])}, ${sg(p.D[1])}, h).`;
      }
      return `Con h = ${v.h} el triple producto AB · (AC × AD) vale ${sg(t)}, no 0: D queda ${v.h > TS(p) ? 'por encima' : 'por debajo'} del plano de los otros tres y la tarima cojea.`;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------- cuerda-del-dron-al-cable · en movimiento: distancia de un punto a una recta
  // Un dron quieto en Q suelta una cuerda que baja en ángulo recto hacia un cable recto P + t·d. Se fija el largo y al soltar la
  // cuerda se estira: debe tocar el cable justo.   tiro { q, P, d, Q, r, max, cuenta, trampas: { valor: aviso } }
  const pie = t => ad(t.P, mu(dot(su(t.Q, t.P), t.d) / dot(t.d, t.d), t.d));
  const QF = t => { const F = pie(t), dir = mu(1 / no(su(F, t.Q)), su(F, t.Q)); return encuadra([ad(t.P, mu(-1.2, t.d)), ad(t.P, mu(1.6, t.d)), t.Q, F, ad(t.Q, mu(t.max * 0.6, dir))], [24, 316, 40, 198], 24); };
  XG.tiros('cuerda-del-dron-al-cable', {
    perilla: t => ({ et: 'Largo de la cuerda', min: 0, max: t.max, cara: v => v, lee: v => `${v} m` }),
    meta: t => t.r, alto: 210, ms: 1700, pie: 'Fija el largo y suelta: la cuerda baja en ángulo recto hacia el cable.',
    dib(t, v, K, p, f) {
      const F3 = pie(t), dir = mu(1 / no(su(F3, t.Q)), su(F3, t.Q)), { S } = QF(t), L0 = S(ad(t.P, mu(-1.2, t.d))), L1 = S(ad(t.P, mu(1.6, t.d))), Q = S(t.Q), P = S(t.P);
      let h = ln(K, L0, L1, 'lg gr') + pt(K, P, `P${vt(t.P)}`, 'fk', lado(P), 16) + K.l(Q[0] - 12, Q[1] - 6, Q[0] + 12, Q[1] - 6, 'lm') + K.c(Q[0], Q[1], 6, 'fk')
        + K.t(Q[0] + (Q[0] > 200 ? -14 : 14), Q[1] + 4, `dron Q${vt(t.Q)}`, 's', Q[0] > 200 ? 'end' : 'start');
      if (v == null) return h;
      const g = Math.min(1, f * 1.2), E = S(ad(t.Q, mu(v * g, dir))), ok = v === t.r;
      h += ln(K, Q, E, 'la gr') + K.c(E[0], E[1], 5, f >= 1 ? (ok ? 'fo' : 'ff') : 'fA');
      return h + K.f(f * 3 - 2, K.t(332, 16, ok ? `${v} m: toca el cable ✓` : `${v} m: ${v > t.r ? 'se pasa del cable' : 'no llega al cable'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} m la cuerda ${v > t.r ? 'se pasa del cable' : 'se queda corta'}: calcula ‖PQ × d‖ y divide entre ‖d‖.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-19.js
// Geometría Vectorial · juegos de la lección geo-19 «Fuerzas coplanarias y concurrentes» (spec 2026-11-27-curso-geometria-vectorial).
// La fuerza como vector: resultante gráfica y por componentes, magnitud y dirección, equilibrio (polígono cerrado y equilibrante),
// tensiones en dos cables, el peso en una rampa y una fuerza en el espacio. La cinemática es de geo-20; el trabajo y el momento, de
// geo-21. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const pt = v => `(${v.map(N).join(', ')})`;
  // Coseno y seno de un ángulo en grados; los de 0°, 30°, 37°, 45°, 53°, 60° y 90° quedan exactos (37° y 53° con el 3-4-5).
  const cs = g => {
    const r = g * Math.PI / 180, fix = x => { for (const k of [0, 0.5, 0.6, 0.8, 1]) if (Math.abs(Math.abs(x) - k) < 0.01) return Math.sign(x) * k; return x; };
    return [fix(Math.cos(r)), fix(Math.sin(r))];
  };
  const r2 = x => Math.round(x * 100) / 100;
  // Rejilla con el origen en O y u píxeles por unidad, en la ventana [x0, x1, y0, y1].
  const rej = (K, O, u, [x0, x1, y0, y1]) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const suma = fs => fs.reduce((s, f) => [s[0] + f[0], s[1] + f[1]], [0, 0]);

  // ------------------------------------------------------------ remolcadores-resultante · la resultante gráfica (paralelogramo)
  // Dos remolcadores tiran de una barcaza con F₁ y F₂ (cada cuadro vale u newtons). Se arrastra la punta de R.
  //   v { a, b }   params { F: [F₁, F₂], u, ini, ok }
  const RO = [60, 124], RU = 22, RW = [-2, 10, -4, 4], RP = (x, y) => [RO[0] + x * RU, RO[1] - y * RU];
  XG.figura('remolcadores-resultante', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: ['a', 'b'], min: [RW[0], RW[2]], max: [RW[1], RW[3]], paso: 1, en: v => RP(v.a, v.b), de: (x, y) => [(x - RO[0]) / RU, (RO[1] - y) / RU] }],
    ok: (v, p) => { const S = suma(p.F); return v.a === S[0] && v.b === S[1]; },
    sol: p => { const S = suma(p.F); return { a: S[0], b: S[1] }; },
    texto: p => { const S = suma(p.F), u = p.u; return `$\\vec R = \\vec F_1 + \\vec F_2 = (${S[0] * u}, ${S[1] * u})$ N, de magnitud $${Math.hypot(...S) * u}$ N`; },
    alto: () => 236, pie: 'Arrastra la punta de R desde la barcaza.',
    dib(v, K, p, f) {
      const [F1, F2] = p.F, S = suma(p.F), u = p.u;
      let h = rej(K, RO, RU, RW);
      if (f > 0) {
        h += K.f(f, K.l(...RP(...F1), ...RP(...S), 'lm d') + K.l(...RP(...F2), ...RP(...S), 'lm d') + K.c(...RP(...S), 5, 'fo'));
        h += K.f(f, K.t(330, 229, `R = ${pt([S[0] * u, S[1] * u])} N`, 's to', 'end'));
      }
      h += K.ar(...RO, ...RP(...F1), 'lg gr') + K.t(RP(...F1)[0] + 6, RP(...F1)[1] - 4, 'F₁', 's tg', 'start');
      h += K.ar(...RO, ...RP(...F2), 'lf gr') + K.t(RP(...F2)[0] + 6, RP(...F2)[1] + 12, 'F₂', 's tf', 'start');
      h += K.r(RO[0] - 14, RO[1] - 7, 28, 14, 'fk', 4) + K.ar(...RO, ...RP(v.a, v.b), 'la gr');
      h += K.t(14, 16, `F₁ = ${pt(F1.map(x => x * u))} N · F₂ = ${pt(F2.map(x => x * u))} N`, 's tm', 'start');
      return h + K.t(14, 229, `R = ${pt([v.a * u, v.b * u])} N`, 's ta', 'start');
    },
    lee: (v, p) => `$\\vec R = (${v.a * p.u}, ${v.b * p.u})$ N`,
    aviso(v, p) {
      const [F1, F2] = p.F, S = suma(p.F), es = q => v.a === q[0] && v.b === q[1];
      if (!v.a && !v.b) return 'Con R = 0 la barcaza no se movería: los dos remolcadores sí tiran.';
      if (es(F1) || es(F2)) return 'Esa es la fuerza de un solo remolcador: la resultante junta las dos.';
      if (es([F1[0] - F2[0], F1[1] - F2[1]]) || es([F2[0] - F1[0], F2[1] - F1[1]])) return 'Esa es una resta: la resultante es la suma, la diagonal del paralelogramo que forman F₁ y F₂.';
      if (v.a === S[0]) return `En x vas bien; en y, F₁ y F₂ aportan ${N(F1[1] * p.u)} y ${N(F2[1] * p.u)} N: súmalas con su signo.`;
      if (v.b === S[1]) return `En y vas bien; en x, F₁ y F₂ aportan ${N(F1[0] * p.u)} y ${N(F2[0] * p.u)} N: súmalas.`;
      return 'Pon F₂ a continuación de F₁ (punta con cola): la resultante va del origen hasta donde termina F₂.';
    },
    bien: p => p.ok || 'R es la diagonal del paralelogramo: la suma de las dos fuerzas.',
  });

  // ------------------------------------------------------------ trineo-por-componentes · F cos θ, F sen θ y la resultante
  // Dos cuerdas tiran de un trineo con fuerzas dadas por magnitud y ángulo; se ponen sus componentes y las de R.
  //   params { F: [[magnitud, ángulo], [magnitud, ángulo]], extra, trampas?, ok }
  const TS = [62, 106, 150].flatMap(y => [{ x: 232, y, w: 56, h: 32 }, { x: 298, y, w: 56, h: 32 }]);
  const TC = p => p.F.map(([m, g]) => cs(g).map(c => r2(m * c)));
  const TM = p => { const [a, b] = TC(p); return [...a, ...b, r2(a[0] + b[0]), r2(a[1] + b[1])].map(N); };
  const TO = [66, 112], TE = 0.75;
  XG.rotula('trineo-por-componentes', {
    slots: () => TS, metas: TM, fichas: p => [...TM(p), ...p.extra], alto: () => 176,
    texto: p => { const m = TM(p).map(s => s.replace('−', '-')); return `$\\vec F_1 = (${m[0]}, ${m[1]})$, $\\vec F_2 = (${m[2]}, ${m[3]})$ y $\\vec R = (${m[4]}, ${m[5]})$ N`; },
    fondo(K, p, f) {
      const [a, b] = TC(p), R = [a[0] + b[0], a[1] + b[1]], Q = q => [TO[0] + q[0] * TE, TO[1] - q[1] * TE];
      let h = K.l(14, TO[1], 168, TO[1], 'lm d') + K.r(TO[0] - 16, TO[1] - 8, 32, 16, 'fk', 4);
      p.F.forEach(([m, g], i) => {
        const q = Q(i ? b : a);
        h += K.ar(...TO, ...q, `${i ? 'lf' : 'lg'} gr`) + K.arc(...TO, 22 + i * 8, 0, g, i ? 'lf' : 'lg');
        h += K.t(q[0] + (i ? 4 : -2), q[1] + (i ? 14 : -6), `${m} N · ${N(g)}°`, `s ${i ? 'tf' : 'tg'}`, i ? 'start' : 'middle');
      });
      h += K.f(f, K.ar(...TO, ...Q(R), 'lo gr') + K.t(Q(R)[0] - 2, Q(R)[1] - 8, 'R', 's to', 'end'));
      h += K.t(232, 34, 'en x', 's tm') + K.t(298, 34, 'en y', 's tm');
      return h + ['F₁', 'F₂', 'R'].map((s, i) => K.t(196, 67 + 44 * i, s, i === 2 ? 'ta' : '', 'end')).join('');
    },
    aviso(q, p) {
      const ms = TM(p), i = ms.findIndex((m, k) => q[k][0] !== m);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        'La componente en x es la magnitud por el coseno del ángulo con el eje x.',
        'La componente en y es la magnitud por el seno del ángulo con el eje x.',
        'En x: magnitud por coseno. Si el ángulo es negativo, el coseno sigue siendo positivo.',
        'En y: magnitud por seno. Un ángulo por debajo del eje x da una componente negativa.',
        'Rx es la suma de las componentes en x, cada una con su signo.',
        'Ry es la suma de las componentes en y, cada una con su signo.'][i];
    },
    bien: p => p.ok || 'Las componentes se suman por separado: así sale la resultante.',
  });

  // ------------------------------------------------------------ globo-magnitud-rumbo · magnitud y dirección de la resultante
  // Fuerzas sobre un globo (en N); se desliza la magnitud de R y su ángulo con el eje x positivo, de una lista de ángulos.
  //   v { m, i }   params { F: [[x, y, nombre]], angs, max, ini: [m, i], ok }
  const GO = [190, 172], GE = 1.4;
  const GR = p => { const S = suma(p.F); return { M: Math.round(Math.hypot(...S)), G: Math.round(((Math.atan2(S[1], S[0]) * 180 / Math.PI) + 360) % 360), S }; };
  XG.figura('globo-magnitud-rumbo', {
    ini: p => ({ m: p.ini[0], i: p.ini[1] }),
    manijas: p => [{ k: 'm', min: 0, max: p.max, paso: 10, et: 'magnitud de R (N)', rot: v => `${v.m}` }, { k: 'i', min: 0, max: p.angs.length - 1, paso: 1, et: 'dirección θ', rot: v => `${p.angs[v.i]}°` }],
    ok: (v, p) => { const r = GR(p); return v.m === r.M && p.angs[v.i] === r.G; },
    sol: p => { const r = GR(p); return { m: r.M, i: p.angs.indexOf(r.G) }; },
    texto: p => { const r = GR(p); return `$|\\vec R| = \\sqrt{${r.S.map(x => (x < 0 ? `(${x})` : x) + '^2').join(' + ')}} = ${r.M}$ N y $\\theta = ${r.G}^{\\circ}$`; },
    alto: () => 290, pie: 'Desliza la magnitud y la dirección de R.',
    dib(v, K, p, f) {
      const g = p.angs[v.i], [c, s] = cs(g), r = GR(p), Q = q => [GO[0] + q[0] * GE, GO[1] - q[1] * GE];
      let h = K.l(30, GO[1], 330, GO[1], 'lm') + K.l(GO[0], 20, GO[0], 192, 'lm') + K.t(326, GO[1] - 6, 'x', 's tm', 'end');
      p.F.forEach(([x, y, nom], i) => { const q = Q([x, y]); h += K.ar(...GO, ...q, `${i ? 'lf' : 'lg'} gr`) + K.t(q[0] + (x < 0 ? -4 : 6), q[1] - 8, nom, `s ${i ? 'tf' : 'tg'}`, x < 0 ? 'end' : 'start'); });
      if (f > 0) {
        const T = Q(r.S);
        h += K.f(f, K.l(...Q([r.S[0], 0]), ...T, 'lo d') + K.l(...Q([0, r.S[1]]), ...T, 'lo d') + K.ar(...GO, ...T, 'lo'));
        h += K.f(f, K.t(14, 36, `|R| = √(${N(r.S[0])}² + ${N(r.S[1])}²) = ${r.M} N`, 's to', 'start') + K.t(14, 54, `θ = ${r.G}°`, 's to', 'start'));
      }
      h += K.c(...GO, 9, 'fk') + K.arc(...GO, 24, 0, g, 'la') + K.ar(...GO, GO[0] + v.m * GE * c, GO[1] - v.m * GE * s, 'la gr');
      return h + K.t(14, 18, `R: ${v.m} N a ${g}°`, 's ta', 'start');
    },
    lee: (v, p) => `$|\\vec R| = ${v.m}$ N, $\\theta = ${p.angs[v.i]}^{\\circ}$`,
    aviso(v, p) {
      const r = GR(p), g = p.angs[v.i], sum = p.F.reduce((a, q) => a + Math.hypot(q[0], q[1]), 0);
      if (v.m === sum && v.m !== r.M) return `Sumaste las magnitudes (${p.F.map(q => N(Math.hypot(q[0], q[1]))).join(' + ')}): las fuerzas se suman como vectores, con Pitágoras sobre las componentes.`;
      if (v.m !== r.M) return `La magnitud sale de las componentes de R, (${N(r.S[0])}, ${N(r.S[1])}): √(Rx² + Ry²).`;
      if (g === 180 - r.G || g === (r.G + 180) % 360 || g === 360 - r.G) return 'Ese ángulo es el del triángulo, pero R está en otro cuadrante: mira los signos de Rx y Ry.';
      if (Math.abs(cs(g)[0] * r.M - r.S[1]) < 0.5 || Math.abs(cs(90 - g)[0] * r.M + r.S[0]) < 0.5) return 'Cambiaste el cateto: tan θ = Ry / Rx, lo vertical entre lo horizontal.';
      return `Con ${g}° la flecha no apunta como R: θ se mide desde el eje x positivo, contra las agujas del reloj.`;
    },
    bien: p => p.ok || 'Magnitud con Pitágoras y dirección con tan θ = Ry/Rx, en su cuadrante.',
  });

  // ------------------------------------------------------------ nudo-equilibrante · el polígono de fuerzas se cierra
  // Tres cuerdas tiran de un nudo; sus fuerzas van punta con cola. Se arrastra la punta de la cuarta, E, que debe cerrar el polígono.
  //   v { a, b }   params { F: [F₁, F₂, F₃], u, ini, ok }
  const NO = [110, 150], NU = 20, NW = [-4, 8, -3, 6], NP = (x, y) => [NO[0] + x * NU, NO[1] - y * NU];
  XG.figura('nudo-equilibrante', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => { const S = suma(p.F); return [{ k: ['a', 'b'], min: [-5, -6], max: [5, 3], paso: 1, en: v => NP(S[0] + v.a, S[1] + v.b), de: (x, y) => [(x - NO[0]) / NU - S[0], (NO[1] - y) / NU - S[1]] }]; },
    ok: (v, p) => { const S = suma(p.F); return v.a === -S[0] && v.b === -S[1]; },
    sol: p => { const S = suma(p.F); return { a: -S[0], b: -S[1] }; },
    texto: p => { const S = suma(p.F), u = p.u; return `$\\vec E = -(\\vec F_1 + \\vec F_2 + \\vec F_3) = (${-S[0] * u}, ${-S[1] * u})$ N: el polígono se cierra`; },
    alto: () => 230, pie: 'Arrastra la punta de E hasta cerrar el polígono.',
    dib(v, K, p, f) {
      const S = suma(p.F), u = p.u;
      let h = rej(K, NO, NU, NW), q = [0, 0];
      p.F.forEach((F, i) => {
        const n = [q[0] + F[0], q[1] + F[1]], a = NP(...q), b = NP(...n);
        h += K.ar(...a, ...b, `${['lg', 'lf', 'lm'][i]} gr`) + K.t((a[0] + b[0]) / 2 + (i === 2 ? -10 : 6), (a[1] + b[1]) / 2 + (i === 2 ? 12 : -6), `F${'₁₂₃'[i]}`, `s ${['tg', 'tf', 'tm'][i]}`, i === 2 ? 'end' : 'start');
        q = n;
      });
      const T = [S[0] + v.a, S[1] + v.b];
      h += K.c(...NO, 6, 'fk') + K.t(NO[0] - 10, NO[1] + 18, 'nudo', 's', 'end') + K.ar(...NP(...S), ...NP(...T), 'la gr');
      if (f > 0) {
        const cierra = !T[0] && !T[1];
        h += K.f(f, cierra ? K.c(...NO, 9, 'fo') : K.ar(...NP(...T), ...NO, 'lo d'));
        h += K.f(f, K.t(330, 222, cierra ? 'ΣF = 0: se cierra' : `falta ${pt([-T[0] * u, -T[1] * u])} N`, `s ${cierra ? 'to' : 'ta'}`, 'end'));
      }
      return h + K.t(14, 16, `E = ${pt([v.a * u, v.b * u])} N`, 's ta', 'start') + K.t(330, 16, `cada cuadro: ${u} N`, 's tm', 'end');
    },
    lee: (v, p) => `$\\vec E = (${v.a * p.u}, ${v.b * p.u})$ N`,
    aviso(v, p) {
      const S = suma(p.F);
      if (v.a === S[0] && v.b === S[1]) return 'Esa es la resultante: duplica el tirón. La equilibrante es su opuesta, del mismo tamaño y sentido contrario.';
      if (!v.a && !v.b) return 'Sin E el polígono queda abierto: las tres cuerdas solas mueven el nudo.';
      if (v.a === -S[0] || v.b === -S[1]) return `Una de las dos componentes ya cierra; la otra no: E debe terminar justo en el nudo.`;
      return 'La punta de E tiene que caer en el nudo, donde empezó F₁: así la suma da cero.';
    },
    bien: p => p.ok || 'La equilibrante cierra el polígono: la suma de todas las fuerzas es cero.',
  });

  // ------------------------------------------------------------ semaforo-dos-cables · tensiones de dos cables (sistema 2×2)
  // Un peso W cuelga de dos cables que forman a₁ (izquierda) y a₂ (derecha) con la horizontal. Se deslizan T₁ y T₂.
  //   v { T1, T2 }   params { W, a: [a₁, a₂], max, ok }
  const SK = [170, 120], SE = 0.5;
  const ST = p => { const [c1, s1] = cs(p.a[0]), [c2, s2] = cs(p.a[1]), D = s1 * c2 + c1 * s2; return { T1: r2(p.W * c2 / D), T2: r2(p.W * c1 / D) }; };
  const SR = (v, p) => { const [c1, s1] = cs(p.a[0]), [c2, s2] = cs(p.a[1]); return [r2(v.T2 * c2 - v.T1 * c1), r2(v.T1 * s1 + v.T2 * s2 - p.W)]; };
  XG.figura('semaforo-dos-cables', {
    ini: () => ({ T1: 0, T2: 0 }),
    manijas: p => [{ k: 'T1', min: 0, max: p.max, paso: 10, et: 'T₁, cable izquierdo (N)', rot: v => `${v.T1}` }, { k: 'T2', min: 0, max: p.max, paso: 10, et: 'T₂, cable derecho (N)', rot: v => `${v.T2}` }],
    ok: (v, p) => { const s = ST(p); return v.T1 === s.T1 && v.T2 === s.T2; },
    sol: ST,
    texto: p => { const s = ST(p), [a1, a2] = p.a; return `$T_1\\cos ${a1}^{\\circ} = T_2\\cos ${a2}^{\\circ}$ y $T_1\\sin ${a1}^{\\circ} + T_2\\sin ${a2}^{\\circ} = ${p.W}$: $T_1 = ${s.T1}$ N, $T_2 = ${s.T2}$ N`; },
    alto: () => 290, pie: 'Desliza las dos tensiones.',
    dib(v, K, p, f) {
      const [a1, a2] = p.a, [c1, s1] = cs(a1), [c2, s2] = cs(a2), L = [SK[0] - 96 * c1 / s1, 24], R = [SK[0] + 96 * c2 / s2, 24];
      let h = K.l(L[0], 24, L[0], 184, 'lm gr') + K.l(R[0], 24, R[0], 184, 'lm gr') + K.l(...L, ...SK, 'lm') + K.l(...R, ...SK, 'lm');
      h += K.arc(...SK, 26, 180 - a1, 180, 'lg') + K.t(SK[0] - 38, SK[1] - 6, `${a1}°`, 's tg', 'end') + K.arc(...SK, 26, 0, a2, 'lf') + K.t(SK[0] + 38, SK[1] - 6, `${a2}°`, 's tf', 'start');
      h += K.r(SK[0] - 9, SK[1] + 4, 18, 34, 'fk', 4) + K.ar(SK[0], SK[1], SK[0], SK[1] + p.W * SE, 'lm gr') + K.t(SK[0] - 14, SK[1] + p.W * SE - 2, `W = ${p.W} N`, 's', 'end');
      h += K.ar(...SK, SK[0] - v.T1 * SE * c1, SK[1] - v.T1 * SE * s1, 'la gr') + K.ar(...SK, SK[0] + v.T2 * SE * c2, SK[1] - v.T2 * SE * s2, 'la gr');
      h += K.t(14, 16, `T₁ = ${v.T1} N · T₂ = ${v.T2} N`, 's ta', 'start');
      if (f > 0) {
        const [x, y] = SR(v, p), ok = !x && !y;
        h += K.f(f, K.r(196, 140, 140, 48, 'fc', 8) + K.t(330, 160, `ΣFx = ${N(x)} N`, `s ${x ? 'ta' : 'to'}`, 'end') + K.t(330, 180, `ΣFy = ${N(y)} N`, `s ${y ? 'ta' : 'to'}`, 'end'));
        if (!ok) h += K.f(f, K.ar(...SK, SK[0] + x * SE, SK[1] - y * SE, 'lo d'));
        else h += K.f(f, K.c(...SK, 6, 'fo'));
      }
      return h;
    },
    lee: (v, p) => { const [x, y] = SR(v, p); return `$\\sum F_x = ${x}$ N, $\\sum F_y = ${y}$ N`; },
    aviso(v, p) {
      const s = ST(p), [x, y] = SR(v, p);
      if (v.T1 === s.T2 && v.T2 === s.T1) return 'Intercambiaste las tensiones: el cable más empinado (más vertical) carga más del peso.';
      if (!x) return `Las horizontales se anulan, pero las verticales no sostienen el peso: ΣFy = ${N(y)} N.`;
      if (!y) return `Sostienen el peso, pero las horizontales no se anulan (ΣFx = ${N(x)} N): el nudo se correría de lado.`;
      return 'Hay dos condiciones: en x, T₁ cos a₁ = T₂ cos a₂; en y, T₁ sen a₁ + T₂ sen a₂ = W.';
    },
    bien: p => p.ok || 'Las dos ecuaciones se cumplen: el nudo queda en equilibrio.',
  });

  // ------------------------------------------------------------ caja-en-la-rampa · el peso en su parte a lo largo y su parte normal
  // Una caja de peso W en una rampa de ángulo θ. Se deslizan la componente a lo largo (W sen θ) y la normal (W cos θ).
  //   v { P, Q }   params { W, g, ok }
  const CB = [60, 186], CL = 220, CE = 1.5;
  const CS = p => { const [c, s] = cs(p.g); return { P: r2(p.W * s), Q: r2(p.W * c) }; };
  XG.figura('caja-en-la-rampa', {
    ini: () => ({ P: 0, Q: 0 }),
    manijas: p => [{ k: 'P', min: 0, max: p.W, paso: 5, et: 'a lo largo de la rampa (N)', rot: v => `${v.P}` }, { k: 'Q', min: 0, max: p.W, paso: 5, et: 'normal a la rampa (N)', rot: v => `${v.Q}` }],
    ok: (v, p) => { const s = CS(p); return v.P === s.P && v.Q === s.Q; },
    sol: CS,
    texto: p => { const s = CS(p); return `A lo largo: $W\\sin ${p.g}^{\\circ} = ${s.P}$ N; normal: $W\\cos ${p.g}^{\\circ} = ${s.Q}$ N`; },
    alto: () => 290, pie: 'Desliza las dos partes del peso.',
    dib(v, K, p, f) {
      const [c, s] = cs(p.g), H = CL * s / c, T = [CB[0] + CL, CB[1] - H];
      const M = [CB[0] + CL * 0.5, CB[1] - H * 0.5], o = [-s, -c], C = [M[0] + o[0] * 16, M[1] + o[1] * 16], a = [c, -s], n = [s, c];
      const box = [[-14, 0], [14, 0], [14, 28], [-14, 28]].map(([x, y]) => [M[0] + a[0] * x + o[0] * y, M[1] + a[1] * x + o[1] * y]);
      let h = K.p([CB, [T[0], CB[1]], T], 'fn') + K.l(...CB, ...T, 'lm gr') + K.arc(...CB, 34, 0, p.g, 'la') + K.t(CB[0] + 44, CB[1] - 6, `θ = ${p.g}°`, 's ta', 'start');
      h += K.p(box, 'fk') + K.ar(...C, C[0], C[1] + p.W * CE, 'lm gr') + K.t(C[0] + 8, C[1] + p.W * CE, `W = ${p.W} N`, 's', 'start');
      if (f > 0) {
        const A = [C[0] - a[0] * v.P * CE, C[1] - a[1] * v.P * CE], B = [A[0] + n[0] * v.Q * CE, A[1] + n[1] * v.Q * CE], cierra = Math.hypot(B[0] - C[0], B[1] - C[1] - p.W * CE) < 1;
        h += K.f(f, K.ar(...C, ...A, 'lg gr') + K.ar(...A, ...B, 'lf gr') + K.t(A[0] - 6, A[1] - 6, `${v.P} N`, 's tg', 'end') + K.t((A[0] + B[0]) / 2 + 8, (A[1] + B[1]) / 2 + 2, `${v.Q} N`, 's tf', 'start'));
        h += K.f(f, K.t(14, 36, cierra ? 'las dos partes rehacen W' : 'las partes no rehacen W', `s ${cierra ? 'to' : 'ta'}`, 'start'));
      }
      return h + K.t(14, 16, `a lo largo ${v.P} N · normal ${v.Q} N`, 's ta', 'start');
    },
    lee: v => `a lo largo $${v.P}$ N, normal $${v.Q}$ N`,
    aviso(v, p) {
      const s = CS(p);
      if (v.P === s.Q && v.Q === s.P) return 'Están al revés: la parte que baja por la rampa es W sen θ; la que aprieta contra ella, W cos θ.';
      if (v.P + v.Q === p.W) return 'Las dos partes no suman W como números: son catetos de un triángulo cuya hipotenusa es W.';
      if (v.P === s.P) return 'A lo largo vas bien; la normal es la parte del peso perpendicular a la rampa: W cos θ.';
      if (v.Q === s.Q) return 'La normal vas bien; la parte a lo largo es W sen θ.';
      return 'El ángulo entre W y la normal es el mismo θ de la rampa: a lo largo W sen θ y normal W cos θ.';
    },
    bien: p => p.ok || 'Las dos partes son los catetos y W la hipotenusa: rehacen el peso.',
  });

  // ------------------------------------------------------------ tension-cable-antena · una fuerza en el espacio por componentes
  // Un cable va de la punta A de un mástil (0, 0, h) al anclaje B (x, y, 0) con tensión T. Se ponen |AB|, T/|AB| y las componentes.
  //   params { h, B, T, extra, trampas?, ok }
  const AS = [{ x: 296, y: 36, w: 56, h: 32 }, { x: 296, y: 82, w: 56, h: 32 }, { x: 200, y: 150, w: 54, h: 32 }, { x: 258, y: 150, w: 54, h: 32 }, { x: 314, y: 150, w: 44, h: 32 }];
  const AV = p => [p.B[0], p.B[1], -p.h];
  const AM = p => { const d = AV(p), L = Math.round(Math.hypot(...d)), k = p.T / L; return [L, k, ...d.map(x => x * k)].map(N); };
  XG.rotula('tension-cable-antena', {
    slots: () => AS, metas: AM, fichas: p => [...AM(p), ...p.extra], alto: () => 180,
    texto: p => { const m = AM(p).map(s => s.replace('−', '-')); return `$|\\vec{AB}| = ${m[0]}$, $\\vec T = ${m[1]}\\,\\vec{AB} = (${m[2]}, ${m[3]}, ${m[4]})$ N`; },
    fondo(K, p, f) {
      const o = [70, 168], u = 96 / Math.max(p.h, 8), I = (x, y, z) => K.iso(o, u, x, y, z), d = AV(p), A = I(0, 0, p.h), B = I(p.B[0], p.B[1], 0);
      let h = K.l(...I(0, 0, 0), ...I(6, 0, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 6, 0), 'lm') + K.t(...I(6.4, 0, 0), 'x', 's tm', 'start') + K.t(...I(0, 6.6, 0), 'y', 's tm', 'end');
      h += K.l(...I(0, 0, 0), ...A, 'lm gr') + K.l(...A, ...B, 'lg') + K.l(...B, ...I(p.B[0], 0, 0), 'lr d') + K.l(...B, ...I(0, p.B[1], 0), 'lr d');
      h += K.c(...A, 4, 'fg') + K.t(A[0] - 8, A[1] + 4, `A(0, 0, ${p.h})`, 's tg', 'end') + K.c(...B, 4, 'fg') + (B[0] < 100 ? K.t(B[0] + 8, B[1] + 14, `B${pt([p.B[0], p.B[1], 0])}`, 's tg', 'start') : K.t(B[0] - 8, B[1] + 14, `B${pt([p.B[0], p.B[1], 0])}`, 's tg', 'end'));
      const k = p.T / Math.hypot(...d), q = I(...[0, 0, p.h].map((x, i) => x + d[i] * 0.55));
      h += K.f(f, K.ar(...A, ...q, 'lo gr') + K.t(q[0] + 6, q[1] - 4, `T = ${N(p.T)} N`, 's to', 'start') + K.t(14, 16, `T = ${N(k)}·AB`, 's to', 'start'));
      h += K.t(262, 41, '|AB| =', 's', 'end') + K.t(262, 87, 'T ÷ |AB| =', 's', 'end') + K.t(334, 120, 'T = (Tx, Ty, Tz), en N', 's tm', 'end');
      return h;
    },
    aviso(q, p) {
      const ms = AM(p), i = ms.findIndex((m, k) => q[k][0] !== m);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        'AB = B − A: resta las coordenadas y saca la raíz de la suma de sus cuadrados.',
        'La tensión va a lo largo del cable: es T veces el vector unitario, T·AB/|AB|.',
        'Tx = (T/|AB|) por la componente x de AB.',
        'Ty = (T/|AB|) por la componente y de AB, con su signo.',
        'Tz = (T/|AB|) por la componente z de AB: el cable tira de A hacia abajo.'][i];
    },
    bien: p => p.ok || 'La tensión es T por el vector unitario del cable.',
  });

  // ------------------------------------------------------------ suelta-en-equilibrio · en movimiento: ¿se queda quieto?
  // Cada tiro: fuerzas conocidas fs y una fuerza desconocida de magnitud v·u en las direcciones dirs. Al soltar, el cuerpo se mueve
  // en el sentido de la suma; si la suma es cero, se queda quieto.
  //   params { tiros: [{ q, esc: 'plano' | 'rampa' | 'colgada', fs: [[x, y, nombre]], dirs: [[x, y]], u, r, g?, c, e? }] }
  const QC = [170, 116], QS = t => 64 / Math.max(t.r * t.u, ...t.fs.map(f => Math.hypot(f[0], f[1])));
  const QR = (t, v) => { const S = suma(t.fs), D = suma(t.dirs), k = (v || 0) * t.u; return [r2(S[0] + D[0] * k), r2(S[1] + D[1] * k)]; };
  XG.tiros('suelta-en-equilibrio', {
    perilla: () => ({ et: 'F (N)', min: 0, max: 12, cara: v => (v ? String(v * 10) : ''), lee: v => `${v * 10} N` }), meta: t => t.r, alto: 200, ms: 1600,
    dib(t, v, K, p, f) {
      const R = v == null ? [0, 0] : QR(t, v), m = Math.hypot(...R), d = m < 1e-6 ? 0 : Math.min(70, 8 + m * 0.6) * Math.min(1, f * 1.2), o = m < 1e-6 ? [0, 0] : [R[0] / m * d, -R[1] / m * d];
      const C = [QC[0] + o[0], QC[1] + o[1]];
      let h = '';
      if (t.esc === 'rampa') {
        const [c, s] = cs(t.g), L = 170, a = [c, -s], o = [-s, -c], B = [QC[0] - o[0] * 14, QC[1] - o[1] * 14];
        h += K.l(B[0] - a[0] * L, B[1] - a[1] * L, B[0] + a[0] * L, B[1] + a[1] * L, 'lm gr') + K.t(24, 192, `${t.g}°`, 's tm', 'start');
        h += K.p([[-14, -14], [14, -14], [14, 14], [-14, 14]].map(([x, y]) => [C[0] + a[0] * x + o[0] * y, C[1] + a[1] * x + o[1] * y]), 'fk');
      } else if (t.esc === 'colgada') {
        h += K.l(10, 30, 330, 30, 'lm gr');
        t.dirs.forEach(([x, y]) => { const k = (QC[1] - 30) / y; h += K.l(...C, QC[0] + x * k, 30, 'lm'); });
        h += K.r(C[0] - 9, C[1], 18, 26, 'fk', 4);
      } else h += K.r(C[0] - 14, C[1] - 14, 28, 28, 'fk', 4);
      const QE = QS(t);
      t.fs.forEach(([x, y, nom]) => { const q = [C[0] + x * QE, C[1] - y * QE]; h += K.ar(...C, ...q, 'lg gr') + K.t(q[0] + (x < 0 ? -4 : 4), q[1] + (y < 0 ? 14 : -4), nom, 's tg', x < 0 ? 'end' : 'start'); });
      if (v) t.dirs.forEach(([x, y]) => { const k = v * t.u * QE; h += K.ar(...C, C[0] + x * k, C[1] - y * k, 'la gr'); });
      h += K.t(14, 18, v ? `F = ${v * t.u} N` : 'F = ?', 's ta', 'start');
      if (v != null && f >= 1) h += K.t(330, 18, m < 1e-6 ? 'quieto: ΣF = 0' : `se mueve: ΣF = ${pt(R)} N`, `s ${m < 1e-6 ? 'to' : 'ta'}`, 'end');
      return h;
    },
    falla(t, v) {
      if (t.e?.[v]) return t.e[v];
      const R = QR(t, v), D = suma(t.dirs), sobra = R[0] * D[0] + R[1] * D[1] > 0;
      return `Con ${v * t.u} N la suma da ${pt(R)} N: ${sobra ? 'sobra fuerza' : 'falta fuerza'} y el cuerpo se mueve.`;
    },
    cuenta: t => t.c,
    pie: 'Estira hasta la fuerza que lo deja quieto y suelta.',
  });
})();
;
//#archivo js/games/gva-escena-20.js
// Geometría Vectorial · juegos de la lección geo-20 «Cinemática» (spec 2026-11-27-curso-geometria-vectorial).
// La posición de un móvil es un vector r(t). El desplazamiento Δr = r₂ − r₁ solo mira dónde empezó y dónde terminó; la distancia
// recorrida suma el camino. La velocidad media es Δr / Δt y la rapidez, su norma. Con velocidad constante r(t) = r₀ + t·v: la recta
// paramétrica con t como tiempo. Velocidad relativa: lo que se ve desde tierra es la velocidad propia más la del medio (río, viento),
// y lo que ve B de A es v_A − v_B. Dos móviles se encuentran si r_A(t) = r_B(t) con el mismo t; la distancia mínima llega cuando
// la posición relativa es perpendicular a la velocidad relativa. Tiro parabólico: r(t) = r₀ + t·v₀ + ½t²·g, con g = (0, −10).
// Las fuerzas son de geo-19 y el trabajo y el momento, de geo-21. Armazones de figura-kit.js (XG.figura, XG.tiros) con las piezas
// XPK; sin lienzo ni colores propios.
(() => {
  const sg = n => String(n).replace('-', '−');
  const r2 = x => Math.round(x * 100) / 100;
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const mas = (a, b) => a.map((x, i) => x + b[i]);
  const menos = (a, b) => a.map((x, i) => x - b[i]);
  const por = (k, a) => a.map(x => k * x);
  const norma = a => Math.hypot(...a);
  const igual = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-9);
  const vec = q => `(${q.map(x => sg(r2(x))).join(', ')})`;
  const tv = q => `(${q.map(x => r2(x)).join(', ')})`;   // en TeX
  const raiz = x => (Number.isInteger(Math.sqrt(x)) ? sg(Math.sqrt(x)) : `√${x} ≈ ${r2(Math.sqrt(x))}`);
  // Papel cuadriculado: B = { x0, x1, y0, y1 }; el punto (0, 0) cae en (ox, oy) y una unidad mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const desde = (P, x, y) => [(x - P.ox) / P.u, (P.oy - y) / P.u];
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const ejes = (K, P, cada = 2) => {
    let h = K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
    for (let x = Math.ceil(P.x0 / cada) * cada; x <= P.x1; x += cada) if (x) h += K.t(P.X(x), P.oy + 13, sg(x), 's tm');
    for (let y = Math.ceil(P.y0 / cada) * cada; y <= P.y1; y += cada) if (y) h += K.t(P.ox - 5, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h;
  };
  // Rótulo al lado del segmento AB (píxeles), corrido d píxeles a la izquierda (lado = 1) o a la derecha (lado = −1).
  const rot = (K, A, B, s, cls, lado = 1, d = 12) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * d, (A[1] + B[1]) / 2 - lado * dx / L * d + 4, s, `s ${cls}`);
  };
  const tramo = (K, A, B, g, cls, flecha = false) => {
    if (g <= 0.01) return '';
    const Q = [A[0] + (B[0] - A[0]) * Math.min(1, g), A[1] + (B[1] - A[1]) * Math.min(1, g)];
    return flecha ? K.ar(A[0], A[1], Q[0], Q[1], cls) : K.l(A[0], A[1], Q[0], Q[1], cls);
  };
  const veredicto = (K, f, ok, si, no, y = 16) => K.f(f * 3 - 2, K.t(332, y, ok ? `${si} ✓` : `${no} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
  const dos = (k, s) => ({ k: ['x', 'y'], min: [k.x0, k.y0], max: [k.x1, k.y1], paso: s.paso || 1, rot: () => s.et, en: v => P2(k, [v.x, v.y]), de: (x, y) => desde(k, x, y) });

  // ---------------------------------------------------------------- desplazamiento frente a distancia recorrida
  // Un mensajero recorre una ruta de tramos rectos. Se arrastra la punta de la flecha Δr, dibujada desde el origen, hasta r₂ − r₁;
  // al comprobar la flecha se traslada al punto de salida y se comparan su largo y el camino.  v { x, y }
  //   params { ruta: [[x, y], …], ini, uni, trampas: { 'x,y': aviso }, otro, ok }
  const C1 = plano({ x0: -4, x1: 7, y0: -3, y1: 7 }, 138, 186, 22);
  const dr1 = p => menos(p.ruta.at(-1), p.ruta[0]);
  const largo = ruta => ruta.slice(1).reduce((s, q, i) => s + norma(menos(q, ruta[i])), 0);
  XG.figura('desplazamiento-contra-recorrido', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [dos(C1, { et: 'Δr' })],
    ok: (v, p) => igual([v.x, v.y], dr1(p)),
    sol: p => { const d = dr1(p); return { x: d[0], y: d[1] }; },
    texto: p => `$\\Delta\\vec r = \\vec r_2 - \\vec r_1 = ${tv(p.ruta.at(-1))} - ${tv(p.ruta[0])} = ${tv(dr1(p))}$, de largo $${r2(norma(dr1(p)))}$ ${p.uni}; el camino mide $${r2(largo(p.ruta))}$ ${p.uni}`,
    alto: () => 276, pie: 'Arrastra la punta de Δr, que sale del origen.',
    dib(v, K, p, f) {
      const O = [C1.ox, C1.oy], R = p.ruta.map(q => P2(C1, q)), A = R[0], B = R.at(-1), D = P2(C1, [v.x, v.y]);
      let h = papel(K, C1) + ejes(K, C1, 2) + K.pl(R, 'lm gr');
      R.slice(1, -1).forEach(q => { h += K.c(q[0], q[1], 3, 'fk'); });
      h += K.ar(O[0], O[1], A[0], A[1], 'lg') + rot(K, O, A, 'r₁', 'tg', 1) + K.ar(O[0], O[1], B[0], B[1], 'lg') + rot(K, O, B, 'r₂', 'tg', -1);
      h += K.c(A[0], A[1], 5, 'fG') + K.t(A[0] - 8, A[1] - 8, 'sale', 's tg', 'end') + K.c(B[0], B[1], 5, 'fG') + K.t(B[0] + 8, B[1] - 8, 'llega', 's tg', 'start');
      if (v.x || v.y) h += K.ar(O[0], O[1], D[0], D[1], 'la gr');
      h += K.t(8, 18, `Δr = ${vec([v.x, v.y])}`, 's ta', 'start');
      if (f > 0) {   // la flecha se traslada a la salida
        const d = dr1(p), ok = igual([v.x, v.y], d), T = P2(C1, mas(p.ruta[0], [v.x, v.y]));
        h += tramo(K, A, T, f * 1.5, `${ok ? 'lo' : 'lf'} gr`, true);
        h += K.f(f * 3 - 2, K.t(332, 270, `camino ${r2(largo(p.ruta))} ${p.uni} · ‖Δr‖ = ${r2(norma(d))} ${p.uni}`, 's tm', 'end'));
        h += veredicto(K, f, ok, 'de la salida a la llegada', 'esa flecha no va de la salida a la llegada');
      }
      return h;
    },
    lee: (v, p) => `Tu $\\Delta\\vec r = (${v.x}, ${v.y})$, de largo $${r2(norma([v.x, v.y]))}$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------- velocidad media y rapidez
  // Un dron pasa por A en el instante tA y por B en tB, por un camino curvo. Se arrastra la punta de la velocidad media, desde el
  // origen: Δr / Δt. Al comprobar se dibuja Δr de A a B y se lee la rapidez.  v { x, y }
  //   params { A, B, tA, tB, camino: [[x, y], …], ini, uni, trampas, otro, ok }
  const C2 = plano({ x0: -2, x1: 8, y0: -3, y1: 9 }, 110, 224, 20);
  const vm2 = p => por(1 / (p.tB - p.tA), menos(p.B, p.A));
  XG.figura('velocidad-media-tramo', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [dos(C2, { et: 'vₘ', paso: 0.5 })],
    ok: (v, p) => igual([v.x, v.y], vm2(p)),
    sol: p => { const q = vm2(p); return { x: q[0], y: q[1] }; },
    texto: p => `$\\vec v_m = \\tfrac{\\Delta\\vec r}{\\Delta t} = \\tfrac{${tv(menos(p.B, p.A))}}{${p.tB - p.tA}} = ${tv(vm2(p))}$ ${p.uni}; su norma, $\\|\\vec v_m\\| = ${r2(norma(vm2(p)))}$ ${p.uni}`,
    alto: () => 292, pie: 'Arrastra la punta de la velocidad media, que sale del origen.',
    dib(v, K, p, f) {
      const O = [C2.ox, C2.oy], A = P2(C2, p.A), B = P2(C2, p.B), W = P2(C2, [v.x, v.y]);
      let h = papel(K, C2) + ejes(K, C2, 2) + K.pl(p.camino.map(q => P2(C2, q)), 'lm d');
      h += K.c(A[0], A[1], 5, 'fG') + K.t(A[0] + 6, A[1] + 28, `A · ${p.tA} s`, 's tg', 'start') + K.c(B[0], B[1], 5, 'fG') + K.t(B[0] - 9, B[1] - 8, `B · ${p.tB} s`, 's tg', 'end');
      if (v.x || v.y) h += K.ar(O[0], O[1], W[0], W[1], 'la gr');
      h += K.t(8, 18, `vₘ = ${vec([v.x, v.y])}`, 's ta', 'start');
      if (f > 0) {
        const q = vm2(p), ok = igual([v.x, v.y], q), Q = P2(C2, q);
        h += tramo(K, A, B, f * 1.5, 'lg gr', true) + K.f(f * 2 - 1, rot(K, A, B, 'Δr', 'tg', -1, 12));
        h += K.f(f * 2 - 1, K.ar(O[0], O[1], Q[0], Q[1], `${ok ? 'lo' : 'lf'} gr d`));
        h += K.f(f * 3 - 2, K.t(8, 36, `Δt = ${p.tB - p.tA} s · ‖vₘ‖ = ${r2(norma(q))} ${p.uni}`, 's tm', 'start'));
        h += veredicto(K, f, ok, 'Δr entre Δt', 'esa no es Δr entre Δt');
      }
      return h;
    },
    lee: (v, p) => `Tu $\\vec v_m = (${v.x}, ${v.y})$; por ${p.tB - p.tA} s da $${tv(por(p.tB - p.tA, [v.x, v.y]))}$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------- movimiento uniforme: la recta con t como tiempo, hacia atrás
  // Un barco con velocidad constante v pasa junto a una boya F a la hora tF. Se arrastra el punto donde estaba a la hora 0:
  // r₀ = F − tF·v. Al comprobar se dibuja la recta r₀ + t·v con sus horas.  v { x, y }
  //   params { F, v, tF, ini, uni, trampas, otro, ok }
  const C3 = plano({ x0: -5, x1: 7, y0: -3, y1: 6 }, 148, 172, 22);
  const r03 = p => menos(p.F, por(p.tF, p.v));
  XG.figura('barco-hora-cero', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [dos(C3, { et: '0 h' })],
    ok: (v, p) => igual([v.x, v.y], r03(p)),
    sol: p => { const q = r03(p); return { x: q[0], y: q[1] }; },
    texto: p => `$\\vec r_0 = F - ${p.tF}\\,\\vec v = ${tv(p.F)} - ${p.tF}\\,${tv(p.v)} = ${tv(r03(p))}$`,
    alto: () => 250, pie: 'Arrastra el barco a donde estaba a la hora 0.',
    dib(v, K, p, f) {
      const F = P2(C3, p.F), V = P2(C3, mas(p.F, p.v)), B = P2(C3, [v.x, v.y]);
      let h = papel(K, C3) + ejes(K, C3, 2);
      h += K.p([[F[0], F[1] - 14], [F[0] + 10, F[1] - 9], [F[0], F[1] - 5]], 'fF') + K.l(F[0], F[1], F[0], F[1] - 14, 'lf') + K.c(F[0], F[1], 4, 'fk');
      h += K.t(F[0] + 14, F[1] - 12, `boya · ${p.tF} h`, 's tf', 'start') + K.ar(F[0], F[1], V[0], V[1], 'lg gr') + K.t(V[0] + 6, V[1] - 6, 'v (1 h)', 's tg', 'start');
      h += K.t(8, 18, `a la hora 0: ${vec([v.x, v.y])}`, 's ta', 'start') + K.t(8, 244, `v = ${vec(p.v)} ${p.uni}`, 's tg', 'start');
      if (f > 0) {   // la recta r₀ + t·v con sus horas
        const r0 = r03(p), ok = igual([v.x, v.y], r0), R0 = P2(C3, r0);
        h += tramo(K, R0, F, f * 1.5, 'la d');
        for (let t = 0; t <= p.tF; t++) { const q = P2(C3, mas(r0, por(t, p.v))); h += K.f(f * 3 - 1 - t / p.tF, K.c(q[0], q[1], 3.5, 'fk') + K.t(q[0] - 5, q[1] + 15, `${t} h`, 's tm', 'end')); }
        h += K.f(f * 2 - 1, K.c(R0[0], R0[1], 7, ok ? 'fo' : 'ff') + (ok ? '' : K.c(B[0], B[1], 5, 'ff')));
        h += veredicto(K, f, ok, `a las ${p.tF} h llega a la boya`, `desde ahí no llega a la boya a las ${p.tF} h`);
      }
      return h;
    },
    lee: (v, p) => `Desde $(${v.x}, ${v.y})$, a las ${p.tF} h estaría en $${tv(mas([v.x, v.y], por(p.tF, p.v)))}$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------- dos móviles que se encuentran: igualar las posiciones
  // A y B salen a la vez de A₀ y B₀ con velocidades constantes (flechas de un segundo). Se arrastra M al punto del encuentro:
  // A₀ + t·v_A = B₀ + t·v_B con el mismo t. Al comprobar los dos avanzan segundo a segundo.  v { x, y }
  //   params { A0, vA, B0, vB, ini, uni, nom: [A, B], trampas, otro, ok }
  const C6 = plano({ x0: -5, x1: 6, y0: -3, y1: 6 }, 158, 184, 24);
  const cita = p => { const t = (p.B0[0] - p.A0[0]) / (p.vA[0] - p.vB[0]); return { t, M: mas(p.A0, por(t, p.vA)) }; };
  XG.figura('cita-de-dos-moviles', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [dos(C6, { et: 'M' })],
    ok: (v, p) => igual([v.x, v.y], cita(p).M),
    sol: p => { const { M } = cita(p); return { x: M[0], y: M[1] }; },
    texto: p => { const { t, M } = cita(p); return `$${tv(p.A0)} + t\\,${tv(p.vA)} = ${tv(p.B0)} + t\\,${tv(p.vB)}$ da $t = ${t}$ s en las dos coordenadas: se encuentran en $${tv(M)}$`; },
    alto: () => 268, pie: 'Arrastra M al punto donde los dos coinciden.',
    dib(v, K, p, f) {
      const A = P2(C6, p.A0), B = P2(C6, p.B0), VA = P2(C6, mas(p.A0, p.vA)), VB = P2(C6, mas(p.B0, p.vB)), M = P2(C6, [v.x, v.y]);
      let h = papel(K, C6) + ejes(K, C6, 2);
      h += K.c(A[0], A[1], 6, 'fG') + K.t(A[0] - 9, A[1] + 4, p.nom[0], 's tg', 'end') + K.ar(A[0], A[1], VA[0], VA[1], 'lg gr') + rot(K, A, VA, 'v (1 s)', 'tg', -1, 12);
      h += K.c(B[0], B[1], 6, 'fF') + K.t(B[0] + 9, B[1] + 14, p.nom[1], 's tf', 'start') + K.ar(B[0], B[1], VB[0], VB[1], 'lf gr') + rot(K, B, VB, 'v (1 s)', 'tf', -1, 14);
      h += K.t(8, 18, `M = ${vec([v.x, v.y])}`, 's ta', 'start') + K.c(M[0], M[1], 3, 'fk');
      if (f > 0) {   // los dos avanzan con el reloj
        const { t, M: Mr } = cita(p), ok = igual([v.x, v.y], Mr), tt = Math.min(t, f * t * 1.25);
        const a = P2(C6, mas(p.A0, por(tt, p.vA))), b = P2(C6, mas(p.B0, por(tt, p.vB)));
        h += K.l(A[0], A[1], a[0], a[1], 'lg d') + K.l(B[0], B[1], b[0], b[1], 'lf d') + K.c(a[0], a[1], 6, 'fG') + K.c(b[0], b[1], 6, 'fF');
        h += K.t(8, 36, `t = ${r2(tt)} s`, 's tm', 'start');
        h += K.f(f * 3 - 2, K.c(P2(C6, Mr)[0], P2(C6, Mr)[1], 10, ok ? 'fo' : 'ff') + K.t(332, 262, `a los ${t} s, los dos en ${vec(Mr)}`, 's tm', 'end'));
        h += veredicto(K, f, ok, 'ahí coinciden', 'ahí no están a la vez');
      }
      return h;
    },
    lee: (v, p) => {
      const k = p.vA[0] && p.vB[0] ? 0 : 1, c = k ? v.y : v.x, tA = (c - p.A0[k]) / p.vA[k], tB = (c - p.B0[k]) / p.vB[k];
      return `Para llegar a $${k ? 'y' : 'x'} = ${c}$: ${p.nom[0]} tarda $${r2(tA)}$ s y ${p.nom[1]}, $${r2(tB)}$ s`;
    },
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------- velocidad relativa: hacia dónde apuntar la proa para ir derecho
  // Un bote (o un avión) de rapidez propia 5 en un medio que se mueve con c. Se gira la proa a uno de los puntos enteros de la
  // circunferencia de radio 5 (mitad de arriba). Lo que se ve desde tierra es proa + c; al comprobar el móvil viaja y llega.  v { k }
  //   params { c, esc, uni, ancho, medio: 'rio' | 'viento', k0, mira: { k: aviso }, otro, ok }
  const PTS = [[5, 0], [4, 3], [3, 4], [0, 5], [-3, 4], [-4, 3], [-5, 0]];
  const S4 = [170, 206], U4 = 18, LEJOS = 50;
  const pxS = q => [S4[0] + q[0] * U4, S4[1] - q[1] * U4];
  const proa = p => PTS.findIndex(w => w[0] + p.c[0] === 0 && w[1] + p.c[1] > 0);
  const gAng = q => Math.atan2(q[1], q[0]) * 180 / Math.PI;
  XG.figura('apunta-proa-corriente', {
    ini: p => ({ k: p.k0 }),
    manijas: () => [{ k: 'k', min: 0, max: PTS.length - 1, paso: 1, rot: () => '', en: v => pxS(PTS[v.k]),
      de: (x, y) => { let g = Math.atan2(S4[1] - y, x - S4[0]) * 180 / Math.PI; if (g < 0) g = g < -90 ? 180 : 0; return PTS.reduce((m, w, i) => (Math.abs(gAng(w) - g) < Math.abs(gAng(PTS[m]) - g) ? i : m), 0); } }],
    ok: (v, p) => v.k === proa(p),
    sol: p => ({ k: proa(p) }),
    texto: p => { const w = PTS[proa(p)], e = p.esc; return `la proa a $${tv(por(e, w))}$: con $${tv(por(e, p.c))}$ suma $${tv(por(e, mas(w, p.c)))}$, derecho al norte a $${e * (w[1] + p.c[1])}$ ${p.uni}`; },
    alto: () => 240, pie: 'Gira la proa: arrastra su punta por el círculo.',
    dib(v, K, p, f) {
      const w = PTS[v.k], e = p.esc, W = pxS(w), rio = p.medio === 'rio';
      let h = '';
      if (rio) {
        h += K.r(8, LEJOS, 324, S4[1] - LEJOS, 'fc', 0) + K.l(8, LEJOS, 332, LEJOS, 'lm gr') + K.l(8, S4[1], 332, S4[1], 'lm gr');
        h += K.t(14, LEJOS - 8, 'orilla de enfrente', 's tm', 'start') + K.t(14, S4[1] + 18, `orilla · el río mide ${p.ancho} m`, 's tm', 'start');
      } else {
        h += K.l(S4[0], S4[1], S4[0], LEJOS, 'lm d') + K.c(S4[0], LEJOS, 6, 'fk') + K.t(S4[0] + 10, LEJOS + 4, `destino, ${p.ancho} km al norte`, 's tm', 'start');
      }
      const sx = Math.max(0, -p.c[0] * U4);
      [[30, 76], [228, 112], [40, 156]].forEach(([x, y], i) => { const x1 = Math.min(x + sx, 320 - Math.max(0, p.c[0] * U4)); h += K.ar(x1, y, x1 + p.c[0] * U4, y - p.c[1] * U4, i ? 'lr' : 'lf'); });
      h += K.t(rio ? 30 : 30, 68, `${rio ? 'corriente' : 'viento'} ${vec(por(e, p.c))}`, 's tf', 'start');
      h += K.arc(S4[0], S4[1], 5 * U4, 0, 180, 'ls d');
      PTS.forEach(q => { const Q = pxS(q); h += K.c(Q[0], Q[1], 2.5, 'fM'); });
      h += K.ar(S4[0], S4[1], W[0], W[1], 'la gr') + K.t(W[0] + (w[0] >= 0 ? 10 : -10), W[1] - 10, `proa ${vec(por(e, w))}`, 's ta', w[0] >= 0 ? 'start' : 'end');
      h += K.p([[S4[0] - 9, S4[1] + 2], [S4[0] + 9, S4[1] + 2], [S4[0] + 5, S4[1] + 9], [S4[0] - 5, S4[1] + 9]], 'fk');
      if (f > 0) {   // la suma y el viaje
        const g = mas(w, p.c), ok = v.k === proa(p), G = pxS(g), cls = ok ? 'lo' : 'lf';
        h += K.f(f * 2, K.l(W[0], W[1], G[0], G[1], 'lm d') + K.ar(S4[0], S4[1], G[0], G[1], `${cls} gr`) + K.t(G[0] > 240 ? 330 : G[0] + (g[0] >= 0 ? 8 : -8), G[1] + 16, `tierra ${vec(por(e, g))}`, `s ${ok ? 'to' : 'tf'}`, G[0] > 240 || g[0] < 0 ? 'end' : 'start'));
        if (g[1] > 0) {
          const L = [S4[0] + (g[0] / g[1]) * (S4[1] - LEJOS), LEJOS], k = Math.min(1, Math.max(0, f * 1.6 - 0.6));
          const T = r2(p.ancho / (e * g[1])), deriva = r2(T * e * g[0]);
          h += tramo(K, S4, L, k, `${cls} d`);
          h += K.f(f * 3 - 2, K.t(8, 18, deriva ? `llega en ${T} ${rio ? 's' : 'h'}, ${sg(Math.abs(deriva))} ${rio ? 'm' : 'km'} ${deriva > 0 ? 'al este' : 'al oeste'}` : `llega derecho en ${T} ${rio ? 's' : 'h'}`, `s ${ok ? 'to' : 'tf'}`, 'start'));
        } else h += K.f(f * 3 - 2, K.t(8, 18, 'así no avanza hacia el norte', 's tf', 'start'));
        h += veredicto(K, f, ok, 'derecho', 'no va derecho', 36);
      }
      return h;
    },
    lee: (v, p) => `Proa $${tv(por(p.esc, PTS[v.k]))}$ más $${tv(por(p.esc, p.c))}$: $${tv(por(p.esc, mas(PTS[v.k], p.c)))}$`,
    aviso: (v, p) => p.mira?.[v.k] || p.otro,
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------------- velocidad relativa: la lluvia vista desde un carro
  // La lluvia cae con L respecto al suelo y el carro anda con C. Se arrastra la punta de la velocidad de la lluvia vista desde el
  // carro, L − C, desde una gota. Al comprobar se dibuja el triángulo L + (−C) y las gotas inclinadas en la ventana.  v { x, y }
  //   params { L, C, ini, uni, trampas, otro, ok }
  const C5 = plano({ x0: -8, x1: 8, y0: -10, y1: 2 }, 170, 50, 12);
  const rel5 = p => menos(p.L, p.C);
  XG.figura('lluvia-vista-carro', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [dos(C5, { et: '' })],
    ok: (v, p) => igual([v.x, v.y], rel5(p)),
    sol: p => { const q = rel5(p); return { x: q[0], y: q[1] }; },
    texto: p => `$\\vec v_{L/C} = \\vec v_L - \\vec v_C = ${tv(p.L)} - ${tv(p.C)} = ${tv(rel5(p))}$, rapidez $${r2(norma(rel5(p)))}$ ${p.uni}`,
    alto: () => 240, pie: 'Arrastra la punta de la velocidad de la lluvia vista desde el carro.',
    dib(v, K, p, f) {
      const O = [C5.ox, C5.oy], Lp = P2(C5, p.L), U = P2(C5, [v.x, v.y]);
      let h = papel(K, C5);
      [30, 52, 290, 312].forEach((x, i) => { h += K.l(x, 30 + i * 9, x, 70 + i * 9, 'lr') + K.l(x - 8, 110 + i * 7, x - 8, 150 + i * 7, 'lr'); });
      h += K.r(96, 192, 148, 26, 'fc', 8) + K.p([[124, 192], [140, 176], [196, 176], [214, 192]], 'fc') + K.c(124, 222, 8, 'fk') + K.c(216, 222, 8, 'fk');
      h += K.ar(250, 205, 250 + p.C[0] * 12, 205, 'lf gr') + K.t(254, 228, `carro ${vec(p.C)}`, 's tf', 'start');
      h += K.ar(O[0], O[1], Lp[0], Lp[1], 'lg gr') + K.t(Lp[0] + 6, Lp[1] - 10, 'lluvia (suelo)', 's tg', 'start') + K.c(O[0], O[1], 4, 'fk');
      if (v.x || v.y) h += K.ar(O[0], O[1], U[0], U[1], 'la gr');
      h += K.t(8, 18, `vista desde el carro: ${vec([v.x, v.y])}`, 's ta', 'start');
      if (f > 0) {   // L + (−C): el triángulo de la resta
        const q = rel5(p), ok = igual([v.x, v.y], q), Q = P2(C5, q);
        h += tramo(K, Lp, Q, f * 1.5, 'lf d', true) + K.f(f * 2 - 1, K.ar(O[0], O[1], Q[0], Q[1], `${ok ? 'lo' : 'lf'} gr`) + K.t(Q[0] - 6, Q[1] + 4, '−C', 's tf', 'end'));
        h += K.f(f * 3 - 2, K.t(8, 36, `rapidez vista: ${r2(norma(q))} ${p.uni}`, 's tm', 'start'));
        h += veredicto(K, f, ok, 'L − C', 'esa no es L − C', 54);
      }
      return h;
    },
    lee: (v, p) => `Tu flecha $(${v.x}, ${v.y})$ más la del carro da $${tv(mas([v.x, v.y], p.C))}$`,
    aviso: (v, p) => p.trampas?.[`${v.x},${v.y}`] || p.otro,
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------- la distancia mínima entre dos móviles con velocidad constante
  // A y B avanzan por sus rectas (marcas cada hora). Se arrastra A por la suya; B se mueve con el mismo reloj. Hay que dejar el
  // reloj en el instante en que están más cerca: cuando B − A es perpendicular a v_B − v_A.  v { t }
  //   params { A0, vA, B0, vB, t0, tmax, uni, trampas: { t: aviso }, ok }
  const C7 = plano({ x0: -8, x1: 6, y0: -6, y1: 4 }, 192, 124, 22);
  const tmin = p => { const d0 = menos(p.B0, p.A0), w = menos(p.vB, p.vA); return -dot(d0, w) / dot(w, w); };
  const enT = (q0, w, t) => mas(q0, por(t, w));
  const dist7 = (p, t) => norma(menos(enT(p.B0, p.vB, t), enT(p.A0, p.vA, t)));
  XG.figura('acercamiento-mas-cercano', {
    ini: p => ({ t: p.t0 }),
    manijas: p => [{ k: 't', min: 0, max: p.tmax, paso: 0.5, rot: () => 'A', en: (v, q) => P2(C7, enT(q.A0, q.vA, v.t)),
      de: (x, y, v, q) => dot(menos(desde(C7, x, y), q.A0), q.vA) / dot(q.vA, q.vA) }],
    ok: (v, p) => v.t === tmin(p),
    sol: p => ({ t: tmin(p) }),
    texto: p => { const d0 = menos(p.B0, p.A0), w = menos(p.vB, p.vA), t = tmin(p); return `$\\vec d(t) = ${tv(d0)} + t\\,${tv(w)}$ es perpendicular a $${tv(w)}$ cuando $t = \\tfrac{${-dot(d0, w)}}{${dot(w, w)}} = ${t}$ h: entonces están a $${r2(dist7(p, t))}$ ${p.uni}`; },
    alto: () => 266, pie: 'Arrastra A por su recta: B avanza con el mismo reloj.',
    dib(v, K, p, f) {
      let h = papel(K, C7) + ejes(K, C7, 2);
      [[p.A0, p.vA, 'lg', 'fG', 'tg', 'A'], [p.B0, p.vB, 'lf', 'fF', 'tf', 'B']].forEach(([q0, w, l, c, tc, n]) => {
        const S = P2(C7, q0), E = P2(C7, enT(q0, w, p.tmax));
        h += K.l(S[0], S[1], E[0], E[1], `${l} d`);
        for (let t = 0; t <= p.tmax; t++) { const q = P2(C7, enT(q0, w, t)); h += K.c(q[0], q[1], 2.5, 'fM'); }
        h += (S[0] < 80 ? K.t(S[0] + 8, S[1] + 16, `${n} · 0 h`, `s ${tc}`, 'start') : K.t(S[0] - 8, S[1] + 4, `${n} · 0 h`, `s ${tc}`, 'end'));
      });
      const A = P2(C7, enT(p.A0, p.vA, v.t)), B = P2(C7, enT(p.B0, p.vB, v.t));
      h += K.c(B[0], B[1], 7, 'fF') + K.t(B[0] + 10, B[1] + 14, 'B', 's tf', 'start') + K.t(8, 18, `reloj: ${sg(v.t)} h`, 's ta', 'start');
      if (f > 0) {
        const t = tmin(p), ok = v.t === t, a = P2(C7, enT(p.A0, p.vA, t)), b = P2(C7, enT(p.B0, p.vB, t));
        h += K.f(f * 2, K.l(A[0], A[1], B[0], B[1], `${ok ? 'lo' : 'lf'} gr`) + K.t(8, 36, `a las ${sg(v.t)} h: ${r2(dist7(p, v.t))} ${p.uni}`, `s ${ok ? 'to' : 'tf'}`, 'start'));
        if (!ok) h += K.f(f * 3 - 2, K.l(a[0], a[1], b[0], b[1], 'lo gr d') + K.c(a[0], a[1], 4, 'fo') + K.c(b[0], b[1], 4, 'fo'));
        h += K.f(f * 3 - 2, K.t(332, 36, `mínimo: ${raiz(r2(dist7(p, t) ** 2))} ${p.uni} a las ${t} h`, 's tm', 'end'));
        h += veredicto(K, f, ok, 'lo más cerca', 'en otro momento están más cerca');
      }
      return h;
    },
    lee: (v, p) => { const d = menos(enT(p.B0, p.vB, v.t), enT(p.A0, p.vA, v.t)), w = menos(p.vB, p.vA); return `A las ${v.t} h: $\\vec d = ${tv(d)}$ y $\\vec d \\cdot ${tv(w)} = ${r2(dot(d, w))}$`; },
    aviso: (v, p) => p.trampas?.[v.t] || (v.t < tmin(p) ? `A las ${v.t} h están a ${r2(dist7(p, v.t))} ${p.uni} y todavía se acercan: d(t)·(v_B − v_A) sigue negativo.`
      : `A las ${v.t} h están a ${r2(dist7(p, v.t))} ${p.uni} y ya se alejan: lo más cerca fue antes, cuando d(t) era perpendicular a v_B − v_A.`),
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------- en movimiento: el tiro parabólico como suma de tres flechas
  // r(t) = r₀ + t·v₀ + ½t²·g con g = (0, −10). Se fija cuánto pide cada tiro (alcance o altura máxima) y al soltar la pelota sale;
  // mientras vuela se ve la cadena r₀ → t·v₀ → ½t²·g que la ubica.  tiro { q, r0, v0, que: 'alcance' | 'altura', r, max, cuenta, trampas }
  const GY = 214, X0 = 48, SP = 8, g10 = [0, -10];
  const pxT = q => [X0 + q[0] * SP, GY - q[1] * SP];
  const enV = (t, s) => mas(mas(t.r0, por(s, t.v0)), por(s * s / 2, g10));
  const vuelo = t => (t.v0[1] + Math.sqrt(t.v0[1] * t.v0[1] + 20 * t.r0[1])) / 10;   // r0y + v0y·s − 5s² = 0
  XG.tiros('tiro-tres-flechas', {
    perilla: t => ({ et: t.que === 'altura' ? 'Altura máxima, en metros' : 'Alcance desde el pie, en metros', min: 0, max: t.max, cara: v => v, lee: v => `${v} m` }),
    meta: t => t.r, alto: 240, ms: 2200, pie: 'Fija los metros y suelta: la pelota sale.',
    dib(t, v, K, p, f) {
      let h = K.l(8, GY, 332, GY, 'lm gr');
      for (let m = 0; X0 + m * SP <= 330; m += 5) h += K.l(X0 + m * SP, GY, X0 + m * SP, GY + 5, 'lm') + (m % 10 ? '' : K.t(X0 + m * SP, GY + 18, `${m}`, 's tm'));
      if (t.r0[1] > 0) h += K.r(8, GY - t.r0[1] * SP, X0 - 8, t.r0[1] * SP, 'fc', 0) + K.t(12, GY - t.r0[1] * SP - 6, `${t.r0[1]} m`, 's tm', 'start');
      const S = pxT(t.r0);
      h += K.c(S[0], S[1], 4, 'fk') + K.ar(S[0], S[1], S[0] + t.v0[0] * 3, S[1] - t.v0[1] * 3, 'lg gr');
      h += K.t(332, 18, `v₀ = ${vec(t.v0)}`, 's tg', 'end') + K.t(332, 36, 'g = (0, −10)', 's tf', 'end');
      if (v == null) return h;
      if (t.que === 'altura') { const y = GY - v * SP; h += K.l(8, y, 332, y, 'la d') + K.t(330, y - 5, `${v} m`, 's ta', 'end'); }
      else { const x = X0 + v * SP; h += K.l(x, GY, x, GY - 26, 'la') + K.p([[x, GY - 26], [x + 12, GY - 21], [x, GY - 16]], 'fA'); }
      const T = vuelo(t), s = Math.min(1, f) * T, ok = v === t.r;
      const pts = []; for (let k = 0; k <= 30; k++) pts.push(pxT(enV(t, s * k / 30)));
      h += K.pl(pts, 'la d');
      const A = pxT(mas(t.r0, por(s, t.v0))), Bp = pxT(enV(t, s));
      const cabe = Math.min(1, Math.max(0, (26 - t.r0[1] - s * t.v0[1]) / 3));   // la cadena se ve mientras cabe en el cuadro
      h += K.f(cabe, K.ar(S[0], S[1], A[0], A[1], 'lg') + K.ar(A[0], A[1], Bp[0], Bp[1], 'lf'));
      h += K.c(Bp[0], Bp[1], 7, f >= 1 ? (ok ? 'fo' : 'ff') : 'fA') + K.t(8, 18, `t = ${r2(s)} s`, 's tm', 'start');
      const top = t.v0[1] / 10, Y = enV(t, top)[1], R = enV(t, T)[0];
      return h + K.f(f * 3 - 2, K.t(8, 36, t.que === 'altura' ? `sube hasta ${r2(Y)} m` : `cae a ${r2(R)} m`, `s ${ok ? 'to' : 'tf'}`, 'start'));
    },
    falla: (t, v) => t.trampas?.[v] || (t.que === 'altura'
      ? `Con ${v} m la raya queda ${v > t.r ? 'encima' : 'debajo'} de la cima: la altura sale de r₀ + t·v₀ + ½t²·g cuando la velocidad vertical se anula.`
      : `Con ${v} m la bandera queda ${v > t.r ? 'más lejos' : 'antes'} de donde cae: busca cuándo la altura vuelve a 0 y mira la x en ese instante.`),
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-21.js
// Geometría Vectorial · juegos de la lección geo-21 «Trabajo y momento de una fuerza» (spec 2026-11-27-curso-geometria-vectorial).
// Trabajo de una fuerza constante W = F · d (solo trabaja la parte de la fuerza a lo largo del camino; positivo, cero o negativo),
// trabajo de varias fuerzas = trabajo de la resultante, en el plano y en R³. Momento respecto a un punto M = r × F: fuerza por brazo
// de palanca, sentido de giro, momento cero si la línea de acción pasa por el punto, equilibrio de un balancín y el momento en R³.
// Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores.
(() => {
  const R = Math.PI / 180;
  const r3 = x => Math.round(x * 1000) / 1000;
  const sg = n => String(r3(n)).replace('-', '−');
  const tup = v => `(${v.map(sg).join(', ')})`;
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const sello = (K, ok, si, no, x = 332, y = 16, a = 'end') => K.t(x, y, ok ? `${si} ✓` : `${no} ✗`, `s ${ok ? 'to' : 'tf'}`, a);
  const escuadra = (K, V, e1, e2, s, cls) => K.pl([[V[0] + e1[0] * s, V[1] + e1[1] * s], [V[0] + (e1[0] + e2[0]) * s, V[1] + (e1[1] + e2[1]) * s], [V[0] + e2[0] * s, V[1] + e2[1] * s]], cls);
  const uni = (A, B) => { const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
  // Seno y coseno de un ángulo en grados, exactos en los notables.
  const sc = g => { const fix = x => { for (const k of [0, 0.5, 1]) if (Math.abs(Math.abs(x) - k) < 1e-9) return Math.sign(x) * k; return x; }; return [fix(Math.sin(g * R)), fix(Math.cos(g * R))]; };

  // ---------------------------------------------------------- trabajo-empuje-carrito · W = F · d: solo trabaja la parte horizontal
  // Un carrito avanza d metros por el piso; se arrastra la punta de la fuerza F (cada cuadro, u newtons) hasta que el trabajo sea W
  // y la fuerza vaya hacia abajo (se empuja desde la manija) o hacia arriba (se tira de una manija alta).
  //   v { a, b }   params { d, u, W, cond: 'abajo' | 'arriba', ini, sol, mira: { nulo, sentido, tamano }, ok }
  const HC = [176, 116], UC = 20;
  const trabC = (v, p) => v.a * p.u * p.d;
  const ladoC = (v, p) => (p.cond === 'abajo' ? v.b < 0 : v.b > 0);
  XG.figura('trabajo-empuje-carrito', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: ['a', 'b'], min: [-4, -4], max: [4, 4], paso: 1, rot: () => 'F', en: v => [HC[0] + v.a * UC, HC[1] - v.b * UC], de: (x, y) => [(x - HC[0]) / UC, (HC[1] - y) / UC] }],
    ok: (v, p) => trabC(v, p) === p.W && ladoC(v, p),
    sol: p => ({ a: p.sol[0], b: p.sol[1] }),
    texto: p => `$F_x = ${p.W / p.d}$ N, con $F_y ${p.cond === 'abajo' ? '< 0' : '> 0'}$; por ejemplo $\\vec F = (${p.sol[0] * p.u}, ${p.sol[1] * p.u})$ N: $W = ${p.sol[0] * p.u} \\cdot ${p.d} = ${p.W}$ J`,
    alto: () => 236, pie: 'Arrastra la punta de F, que sale de la manija.',
    dib(v, K, p, f) {
      const ok = trabC(v, p) === p.W && ladoC(v, p), T = [HC[0] + v.a * UC, HC[1] - v.b * UC], s = 270 / Math.max(6, p.d);
      let h = '';
      for (let i = -4; i <= 4; i++) h += K.l(HC[0] + i * UC, HC[1] - 4 * UC, HC[0] + i * UC, HC[1] + 4 * UC, 'ls') + K.l(HC[0] - 4 * UC, HC[1] + i * UC, HC[0] + 4 * UC, HC[1] + i * UC, 'ls');
      h += K.l(8, 200, 332, 200, 'lm gr');
      // el carrito: canasta, ruedas y manija
      h += K.p([[24, 124], [136, 124], [124, 176], [40, 176]], 'fn') + K.pl([[24, 124], [136, 124], [124, 176], [40, 176], [24, 124]], 'lm')
        + K.c(52, 190, 9, 'fk') + K.c(114, 190, 9, 'fk') + K.l(136, 124, HC[0], HC[1], 'lm gr') + K.c(HC[0], HC[1], 4, 'fk');
      h += K.ar(30, 216, 30 + p.d * s, 216, 'lg gr') + K.t(34 + p.d * s, 220, 'd', 's tg', 'start');
      if (v.a || v.b) h += K.ar(HC[0], HC[1], T[0], T[1], 'la gr');
      h += K.t(8, 16, `F = (${sg(v.a * p.u)}, ${sg(v.b * p.u)}) N`, 's ta', 'start') + K.t(8, 34, `d = (${p.d}, 0) m`, 's tg', 'start');
      if (f > 0 && (v.a || v.b)) {   // la sombra de F sobre el camino: la parte que trabaja, y la que no
        const S = [HC[0] + v.a * UC * Math.min(1, f * 1.4), HC[1]];
        h += K.l(T[0], T[1], HC[0] + v.a * UC, HC[1], 'lm d') + (v.a ? K.ar(HC[0], HC[1], S[0], S[1], 'lo gr') : '')
          + K.f(f * 2 - 0.6, K.t(HC[0] + v.a * UC + (v.a >= 0 ? 8 : -8), HC[1] + (v.b > 0 ? 16 : -8), v.b ? 'no trabaja' : '', 's tm', v.a >= 0 ? 'start' : 'end'))
          + K.f(f * 3 - 1, K.t(332, 34, `W = F · d = ${sg(v.a * p.u)} · ${p.d} = ${sg(trabC(v, p))} J`, `s ${ok ? 'to' : 'tf'}`, 'end'))
          + K.f(f * 3 - 2, sello(K, ok, `W = ${p.W} J`, trabC(v, p) === p.W ? 'la fuerza va al otro lado' : `W ≠ ${p.W} J`));
      } else if (f > 0) h += K.f(f * 3 - 2, sello(K, false, '', 'sin fuerza no hay trabajo'));
      return h;
    },
    lee: (v, p) => `$\\vec F = (${v.a * p.u}, ${v.b * p.u})$ N`,
    aviso(v, p) {
      const W = trabC(v, p);
      if (!v.a && !v.b) return p.mira.nulo;
      if (W === p.W) return p.mira.sentido;
      if (W < 0) return `Esa fuerza tira hacia atrás, contra el avance: el trabajo da ${sg(W)} J, negativo. La parte horizontal de F debe ir hacia adelante.`;
      if (v.b && Math.abs(Math.hypot(v.a, v.b) * p.u * p.d - p.W) < 1e-9) return p.mira.tamano;
      return `Con esa fuerza el trabajo es F · d = ${sg(v.a * p.u)} · ${p.d} = ${sg(W)} J: ${W < p.W ? 'falta' : 'sobra'}. Solo cuenta la parte de F a lo largo del avance.`;
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- trabajo-signo-de-cada-fuerza · positivo, cero o negativo
  // Una caja recorre d; sobre ella actúan ocho fuerzas. Se tocan todas las que hacen trabajo del signo pedido.
  //   params { d, fz: [[nombre, [Fx, Fy]]], signo: −1 | 1, falta, ok }
  const cajaS = i => ({ x: 88 + 164 * (i % 2), y: 92 + 40 * Math.floor(i / 2), w: 156, h: 34 });
  const signoS = (p, i) => Math.sign(dot(p.fz[i][1], p.d));
  XG.marca('trabajo-signo-de-cada-fuerza', {
    sitios: p => p.fz.map((_, i) => cajaS(i)),
    cara(K, p, i, on) {
      const c = cajaS(i), F = p.fz[i][1], L = Math.hypot(...F) || 1, e = [F[0] / L, -F[1] / L], X = c.x - 62;
      return K.ar(X - 9 * e[0], c.y - 9 * e[1], X + 9 * e[0], c.y + 9 * e[1], on ? 'la' : 'lm') + K.t(c.x - 46, c.y + 5, `${p.fz[i][0]} ${tup(F)}`, `s ${on ? 'ta' : ''}`, 'start');
    },
    fondo(K, p) {   // la rampa en la dirección de d, con la caja y la flecha del desplazamiento
      const L = Math.hypot(...p.d), e = [p.d[0] / L, -p.d[1] / L], n = [e[1], -e[0]], A = [16, 72], ex = 64 / Math.max(0.2, -e[1]), B = [A[0] + ex * e[0], A[1] + ex * e[1]];
      const Q = (s, h) => [A[0] + s * e[0] + h * n[0], A[1] + s * e[1] + h * n[1]];
      return K.p([A, B, [B[0], A[1]]], 'fn') + K.l(...A, ...B, 'lm gr') + K.p([Q(10, 0), Q(30, 0), Q(30, 14), Q(10, 14)], 'fk')
        + K.ar(...Q(14, 22), ...Q(ex - 30, 22), 'lg gr')
        + K.t(332, 22, `d = ${tup(p.d)} m`, 's tg', 'end') + K.t(332, 40, p.signo < 0 ? 'trabajo negativo: F · d < 0' : 'trabajo positivo: F · d > 0', 's tm', 'end') + K.t(332, 58, 'fuerzas en N', 's tm', 'end');
    },
    alto: () => 250, nombre: (p, i) => `${p.fz[i][0]}, fuerza ${tup(p.fz[i][1])}`, pie: 'Toca las fuerzas que piden.',
    sol: p => p.fz.map((_, i) => i).filter(i => signoS(p, i) === p.signo),
    aviso(on, p) {
      const i = on.findIndex((o, k) => o && signoS(p, k) !== p.signo);
      if (i < 0) return p.falta;
      const [n, F] = p.fz[i], W = dot(F, p.d), cuenta = `${sg(F[0])}·${sg(p.d[0])} + ${sg(F[1])}·${sg(p.d[1])} = ${sg(W)}`;
      return W === 0 ? `${n}: F · d = ${cuenta}. Es perpendicular al camino: no hace trabajo, ni positivo ni negativo.`
        : `${n}: F · d = ${cuenta}. ${W > 0 ? 'Tiene una parte a favor del avance: su trabajo es positivo.' : 'Tiene una parte en contra del avance: su trabajo es negativo.'}`;
    },
    bien: p => p.ok,
    texto: p => p.fz.filter((_, i) => signoS(p, i) === p.signo).map(([n, F]) => `${n}: $${sg(dot(F, p.d)).replace('−', '-')}$ J`).join(', '),
  });

  // ---------------------------------------------------------- trabajo-total-resultante · el trabajo total es el de la resultante (R³)
  // Una carga va de A a B; tres fuerzas constantes. Se arrastran los trabajos W₁, W₂, W₃ y el total.
  //   params { A, B, F: [[nombre, vector]] (tres), extra, trampas: { 'i:ficha': aviso }, mira: [aviso por lugar], ok }
  const dR = p => p.B.map((b, i) => b - p.A[i]);
  const resR = p => p.F.reduce((s, f) => s.map((x, i) => x + f[1][i]), [0, 0, 0]);
  const metasR = p => [...p.F.map(f => sg(dot(f[1], dR(p)))), sg(dot(resR(p), dR(p)))];
  const slotR = i => ({ x: 46 + 82 * i, y: 222, w: 60, h: 34 });
  XG.rotula('trabajo-total-resultante', {
    slots: () => [0, 1, 2, 3].map(slotR),
    fichas: p => [...metasR(p), ...p.extra], metas: p => metasR(p), alto: () => 250,
    texto: p => { const m = metasR(p).map(x => x.replace('−', '-')); return `$\\vec d = B - A = ${tup(dR(p)).replace(/−/g, '-')}$; $W_1 = ${m[0]}$, $W_2 = ${m[1]}$, $W_3 = ${m[2]}$ J; total $W = ${m[3]}$ J $= \\vec R \\cdot \\vec d$`; },
    fondo(K, p, f) {
      const O = [74, 168], u = 16, I = (x, y, z) => XPK.iso(O, u, x, y, z), A = I(...p.A), B = I(...p.B);
      let h = '';
      [[5, 0, 0, 'x'], [0, 5, 0, 'y'], [0, 0, 6, 'z']].forEach(([x, y, z, s]) => { const E = I(x, y, z); h += K.ar(O[0], O[1], E[0], E[1], 'lm') + K.t(E[0] + (s === 'y' ? -6 : 6), E[1] + (s === 'z' ? 0 : 12), s, 's tm', s === 'y' ? 'end' : 'start'); });
      h += K.l(A[0], A[1], I(p.A[0], p.A[1], 0)[0], I(p.A[0], p.A[1], 0)[1], 'lm d') + K.l(B[0], B[1], I(p.B[0], p.B[1], 0)[0], I(p.B[0], p.B[1], 0)[1], 'lm d');
      h += K.ar(A[0], A[1], B[0], B[1], 'lg gr') + K.r(A[0] - 7, A[1] - 7, 14, 14, 'fk', 2) + K.c(B[0], B[1], 4, 'fk')
        + K.t(A[0] - 10, A[1] + 4, 'A', 's', 'end') + K.t(B[0] + 8, B[1] - 4, 'B', 's', 'start');
      h += K.t(332, 18, `A${tup(p.A)} → B${tup(p.B)} m`, 's tg', 'end');
      p.F.forEach(([n, F], i) => { h += K.t(332, 40 + 18 * i, `F${'₁₂₃'[i]} ${n} = ${tup(F)} N`, 's ta', 'end'); });
      ['W₁', 'W₂', 'W₃', 'W total'].forEach((s, i) => { h += K.t(slotR(i).x, 196, `${s} (J)`, 's tm'); });
      return h + K.f(f, K.t(332, 112, `d = B − A = ${tup(dR(p))}`, 's to', 'end') + K.t(332, 130, `R = F₁ + F₂ + F₃ = ${tup(resR(p))}`, 's to', 'end')
        + K.t(332, 148, `R · d = ${sg(dot(resR(p), dR(p)))} J`, 's to', 'end'));
    },
    aviso: (q, p) => { const m = metasR(p), i = m.findIndex((x, k) => q[k][0] !== x); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ---------------------------------------------------------- trabajo-componente-del-riel · la parte de F a lo largo del camino
  // Una vagoneta sube por un riel de dirección û; la fuerza F es fija (cada cuadro, N newtons). Se arrastra S por el riel hasta la
  // punta de la componente de F a lo largo del riel (la sombra de F). Al comprobar, W = (F · û)·L.
  //   v { s }   params { F, u (entero, de norma entera), L, N, s0, mira: { x, y, otro }, ok }
  const OR = [56, 210], UR = 18;
  const eR = p => { const n = Math.hypot(...p.u); return [p.u[0] / n, -p.u[1] / n]; };
  const compR = p => dot(p.F, p.u) / Math.hypot(...p.u);
  XG.figura('trabajo-componente-del-riel', {
    ini: p => ({ s: p.s0 }),
    manijas: p => [{ k: 's', min: 0, max: 8, paso: 0.5, rot: () => 'S', en: v => { const e = eR(p); return [OR[0] + v.s * UR * e[0], OR[1] + v.s * UR * e[1]]; },
      de: (x, y) => { const e = eR(p); return ((x - OR[0]) * e[0] + (y - OR[1]) * e[1]) / UR; } }],
    ok: (v, p) => Math.abs(v.s - compR(p)) < 1e-9,
    sol: p => ({ s: compR(p) }),
    texto: p => `$\\vec F \\cdot \\hat u = \\tfrac{${p.F[0]} \\cdot ${p.u[0]} + ${p.F[1]} \\cdot ${p.u[1]}}{${Math.hypot(...p.u)}} = ${compR(p)}$ cuadros $= ${compR(p) * p.N}$ N; $W = ${compR(p) * p.N} \\cdot ${p.L} = ${compR(p) * p.N * p.L}$ J`,
    alto: () => 240, pie: 'Arrastra S por el riel.',
    dib(v, K, p, f) {
      const e = eR(p), P = (a, b) => [OR[0] + a * UR, OR[1] - b * UR], T = P(...p.F), S = [OR[0] + v.s * UR * e[0], OR[1] + v.s * UR * e[1]], c = compR(p), ok = Math.abs(v.s - c) < 1e-9;
      const C = [OR[0] + c * UR * e[0], OR[1] + c * UR * e[1]], fin = [OR[0] + 11 * UR * e[0], OR[1] + 11 * UR * e[1]];
      let h = '';
      for (let i = -1; i <= 8; i++) h += K.l(...P(i, 0), ...P(i, 8), 'ls');
      for (let j = 0; j <= 8; j++) h += K.l(...P(-1, j), ...P(8, j), 'ls');
      h += K.p([[OR[0] - 30 * e[0], OR[1] - 30 * e[1] + 6], [fin[0], fin[1] + 6], [fin[0], OR[1] + 20], [OR[0] - 30 * e[0], OR[1] + 20]], 'fn') + K.l(OR[0] - 30 * e[0], OR[1] - 30 * e[1], fin[0], fin[1], 'lg gr');
      // la vagoneta, apoyada en el riel
      const nrm = [e[1], -e[0]], q = (a, b) => [OR[0] + a * e[0] + b * nrm[0], OR[1] + a * e[1] + b * nrm[1]];
      h += K.p([q(-16, 2), q(16, 2), q(16, 18), q(-16, 18)], 'fk');
      h += K.ar(OR[0], OR[1], T[0], T[1], 'la gr') + K.t(T[0] + 8, T[1] + 4, 'F', 's ta', 'start');
      if (v.s > 0) h += K.l(OR[0], OR[1], S[0], S[1], 'lf gr');
      h += K.t(332, 18, `F = (${p.F.map(x => x * p.N).map(sg).join(', ')}) N`, 's ta', 'end') + K.t(332, 36, `riel: û = (${p.u.map(sg).join(', ')})/${Math.hypot(...p.u)}, avanza ${p.L} m`, 's tg', 'end')
        + K.t(332, 54, `cada cuadro: ${p.N} N`, 's tm', 'end');
      if (f > 0) {
        h += K.l(T[0], T[1], C[0], C[1], 'lo d') + escuadra(K, C, [-e[0], -e[1]], uni(C, T), 8, 'lo') + K.ar(OR[0], OR[1], ...[OR[0] + (C[0] - OR[0]) * Math.min(1, f * 1.4), OR[1] + (C[1] - OR[1]) * Math.min(1, f * 1.4)], 'lo gr')
          + K.f(f * 3 - 1, K.t(332, 76, `F · û = ${sg(c)} cuadros = ${sg(c * p.N)} N`, 's to', 'end') + K.t(332, 94, `W = ${sg(c * p.N)} · ${p.L} = ${sg(c * p.N * p.L)} J`, 's to', 'end'))
          + K.f(f * 3 - 2, sello(K, ok, 'S es la sombra de F', 'S no es la sombra', 8, 16, 'start'));
      }
      return h;
    },
    lee: v => `$S$ a $${v.s}$ cuadros por el riel`,
    aviso: (v, p) => (v.s === p.F[0] ? p.mira.x : v.s === p.F[1] ? p.mira.y : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- momento-angulo-del-empuje · M = r F sen θ = fuerza por brazo
  // Una puerta vista desde arriba gira en la bisagra O; la mano empuja la manija (a r metros) con F newtons. Se gira la dirección del
  // empuje hasta que el momento sea M, empujando a la vez hacia la bisagra (hacia: true) o alejándose de ella.
  //   v { g }   params { r, F, M, hacia, g0, mira: { lejos, linea, maximo, coseno }, ok }
  const OP = [40, 132], LP = 250;
  const solP = p => { const a = Math.round(Math.asin(p.M / (p.r * p.F)) / R); return p.hacia ? 180 - a : a; };
  const momP = (p, g) => p.r * p.F * sc(g)[0];
  XG.figura('momento-angulo-del-empuje', {
    ini: p => ({ g: p.g0 }),
    manijas: p => [{ k: 'g', min: 0, max: 180, paso: 15, rot: () => 'F', en: v => XPK.at(OP[0] + p.r * LP, OP[1], 70, v.g),
      de: (x, y) => { let a = Math.atan2(OP[1] - y, x - OP[0] - p.r * LP) / R; if (a < -90) a += 360; return a; } }],
    ok: (v, p) => v.g === solP(p),
    sol: p => ({ g: solP(p) }),
    texto: p => `$\\theta = ${solP(p)}^{\\circ}$: $M = ${p.r} \\cdot ${p.F} \\cdot \\operatorname{sen} ${solP(p)}^{\\circ} = ${p.M}$ N·m, con brazo de palanca $${r3(p.M / p.F)}$ m`,
    alto: () => 240, pie: 'Gira el empuje: arrastra la punta de F.',
    dib(v, K, p, f) {
      const H = [OP[0] + p.r * LP, OP[1]], T = K.at(H[0], H[1], 70, v.g), ok = v.g === solP(p), M = momP(p, v.g);
      let h = K.l(OP[0] - 14, OP[1] - 40, OP[0] - 14, OP[1] + 40, 'lm gr');
      for (let k = -3; k <= 3; k++) h += K.l(OP[0] - 14, OP[1] + 12 * k, OP[0] - 24, OP[1] + 12 * k + 8, 'lm');
      h += K.r(OP[0], OP[1] - 4, LP, 8, 'fn', 2) + K.c(OP[0], OP[1], 5, 'fk') + K.t(OP[0] + 2, OP[1] + 22, 'bisagra O', 's', 'start');
      h += K.c(H[0], H[1], 4, 'fk') + K.t(H[0], H[1] + 22, `manija, a ${p.r} m`, 's', 'middle');
      h += K.ar(H[0], H[1], T[0], T[1], 'la gr') + (v.g > 0 ? K.arc(H[0], H[1], 22, 0, v.g, 'lm') : '');
      h += K.t(8, 16, `empuje de ${p.F} N`, 's ta', 'start') + K.t(8, 34, `θ = ${v.g}° con la puerta`, 's tm', 'start');
      if (f > 0) {   // línea de acción, brazo de palanca y el giro
        const [sn, cs] = sc(v.g), e = [cs, -sn], dx = p.r * LP, Fo = [H[0] - dx * cs * e[0], H[1] - dx * cs * e[1]];
        // la línea de acción, recortada al lienzo
        const ts = [[e[0], H[0], 6, 334], [e[1], H[1], 6, 234]].map(([d, c, a, b]) => (Math.abs(d) < 1e-9 ? [-1e9, 1e9] : [(a - c) / d, (b - c) / d].sort((m, k) => m - k)));
        const t0 = Math.max(ts[0][0], ts[1][0]), t1 = Math.min(ts[0][1], ts[1][1]), g = Math.min(1, f * 1.4);
        h += K.l(H[0] + t0 * e[0], H[1] + t0 * e[1], H[0] + t1 * e[0], H[1] + t1 * e[1], 'lm d');
        if (Math.abs(sn) > 1e-9) {
          const mid = [(OP[0] + Fo[0]) / 2, (OP[1] + Fo[1]) / 2], up = Fo[1] < OP[1] - 20;
          h += K.f(f * 2 - 0.4, K.l(OP[0], OP[1], OP[0] + (Fo[0] - OP[0]) * g, OP[1] + (Fo[1] - OP[1]) * g, 'lo gr') + escuadra(K, Fo, uni(Fo, OP), e, 8, 'lo')
            + K.t(up ? mid[0] - 8 : mid[0], up ? mid[1] : Math.min(mid[1], OP[1]) - 12, `brazo ${sg(p.r * sn)} m`, 's to', up ? 'end' : 'middle'));
        }
        h += K.f(f * 3 - 1, K.arc(OP[0], OP[1], 30, 20, 20 + 120 * g * Math.sign(M), M ? 'la' : 'lm') + K.t(332, 34, `M = ${p.F} · ${sg(p.r * sn)} = ${sg(M)} N·m`, `s ${ok ? 'to' : 'tf'}`, 'end'))
          + K.f(f * 3 - 2, sello(K, ok, `M = ${p.M} N·m`, M === p.M ? 'empuja al otro lado' : `M ≠ ${p.M} N·m`));
      }
      return h;
    },
    lee: v => `$\\theta = ${v.g}^{\\circ}$`,
    aviso(v, p) {
      const M = momP(p, v.g), [, cs] = sc(v.g);
      if (v.g === 180 - solP(p)) return p.mira.lejos;
      if (v.g === 0 || v.g === 180) return p.mira.linea;
      if (v.g === 90) return p.mira.maximo;
      if (Math.abs(Math.abs(p.r * p.F * cs) - p.M) < 1e-6) return p.mira.coseno;
      return `Con ${v.g}° el momento es r·F·sen θ = ${p.r}·${p.F}·sen ${v.g}° ≈ ${sg(Math.round(M * 10) / 10)} N·m: ${M < p.M ? 'falta' : 'sobra'}.`;
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- momento-sentido-de-giro · horario, antihorario o sin giro
  // Una placa gira en el perno O; ocho fuerzas aplicadas en distintos puntos (cada cuadro, una unidad). Se tocan las que la hacen
  // girar en el sentido pedido: M = r₁F₂ − r₂F₁ (negativo, horario; positivo, antihorario; cero si la línea pasa por O).
  //   params { fz: [[P, F]], signo: −1 | 1, falta, ok }
  const OG = [170, 132], UG = 24;
  const pxG = q => [OG[0] + q[0] * UG, OG[1] - q[1] * UG];
  const momG = ([P, F]) => P[0] * F[1] - P[1] * F[0];
  const sitG = ([P, F]) => { const T = pxG([P[0] + F[0], P[1] + F[1]]), L = Math.hypot(...F); return { x: T[0] + 14 * F[0] / L, y: T[1] - 14 * F[1] / L, w: 24, h: 24, red: true }; };
  XG.marca('momento-sentido-de-giro', {
    sitios: p => p.fz.map(sitG),
    cara: (K, p, i, on) => { const t = sitG(p.fz[i]); return K.t(t.x, t.y + 5, `${i + 1}`, on ? 'ta' : 's'); },
    fondo(K, p) {
      let h = K.r(44, 30, 252, 206, 'fn', 14);
      for (let i = -5; i <= 5; i++) h += K.l(...pxG([i, -4]), ...pxG([i, 4]), 'ls');
      for (let j = -4; j <= 4; j++) h += K.l(...pxG([-5, j]), ...pxG([5, j]), 'ls');
      p.fz.forEach(([P, F]) => { const A = pxG(P), B = pxG([P[0] + F[0], P[1] + F[1]]); h += K.l(...OG, ...A, 'lm d') + K.c(...A, 3, 'fk') + K.ar(...A, ...B, 'la gr'); });
      return h + K.c(...OG, 6, 'fk') + K.t(OG[0] + 4, OG[1] + 20, 'O', 's', 'start') + K.t(8, 252, p.signo < 0 ? 'gira en sentido horario' : 'gira en sentido antihorario', 's tm', 'start');
    },
    alto: () => 256, nombre: (p, i) => `fuerza ${i + 1}`, pie: 'Toca las fuerzas que piden.',
    sol: p => p.fz.map((_, i) => i).filter(i => Math.sign(momG(p.fz[i])) === p.signo),
    aviso(on, p) {
      const i = on.findIndex((o, k) => o && Math.sign(momG(p.fz[k])) !== p.signo);
      if (i < 0) return p.falta;
      const [P, F] = p.fz[i], M = momG(p.fz[i]), c = `${sg(P[0])}·${sg(F[1])} − ${sg(P[1])}·${sg(F[0])} = ${sg(M)}`;
      return M === 0 ? `Fuerza ${i + 1}: M = ${c}. Su línea de acción pasa por O: empuja o tira del perno, pero no hace girar.`
        : `Fuerza ${i + 1}: M = ${c}. Hace girar en sentido ${M > 0 ? 'antihorario' : 'horario'}.`;
    },
    bien: p => p.ok,
    texto: p => p.fz.map((f, i) => [f, i]).filter(([f]) => Math.sign(momG(f)) === p.signo).map(([f, i]) => `${i + 1} ($M = ${sg(momG(f)).replace('−', '-')}$)`).join(', '),
  });

  // ---------------------------------------------------------- momento-balancin-equilibrio · los momentos se cancelan
  // Un balancín con apoyo en el centro; a la izquierda, pesos fijos; a la derecha, otros fijos y uno que se arrastra a la distancia x.
  // Mientras se responde la tabla queda quieta; al comprobar se inclina hacia el lado que gana.
  //   v { x }   params { izq: [[F, x]], der: [[F, x]], mov, x0, trampas: { x: aviso }, ok }
  const PB = [170, 172], SB = 50;
  const mIzq = p => p.izq.reduce((s, [F, x]) => s + F * x, 0);
  const mDer = (p, x) => p.der.reduce((s, [F, d]) => s + F * d, 0) + p.mov * x;
  const solB = p => (mIzq(p) - mDer(p, 0)) / p.mov;
  XG.figura('momento-balancin-equilibrio', {
    ini: p => ({ x: p.x0 }),
    manijas: p => [{ k: 'x', min: 0.25, max: 2.75, paso: 0.25, rot: () => `${p.mov}`, en: v => [PB[0] + v.x * SB, PB[1] - 34], de: x => (x - PB[0]) / SB }],
    ok: (v, p) => Math.abs(mDer(p, v.x) - mIzq(p)) < 1e-9,
    sol: p => ({ x: solB(p) }),
    texto: p => { const I = p.izq.map(([F, x]) => `${F} \\cdot ${x}`).join(' + '), D = [...p.der.map(([F, d]) => `${F} \\cdot ${d}`), `${p.mov} \\cdot ${solB(p)}`].join(' + '); return `$x = ${solB(p)}$ m: $${I} = ${D} = ${mIzq(p)}$ N·m`; },
    alto: () => 236, pie: 'Arrastra por la tabla el peso de la derecha.',
    dib(v, K, p, f) {
      const net = mIzq(p) - mDer(p, v.x), ok = Math.abs(net) < 1e-9, phi = f * Math.sign(net) * Math.min(9, Math.abs(net) / 40) * R;
      const en = s => [PB[0] + s * SB * Math.cos(phi), PB[1] - s * SB * Math.sin(phi)];
      const bloque = (s, F, cls) => { const B = en(s); return K.r(B[0] - 15, B[1] - 26, 30, 24, cls, 4) + K.t(B[0], B[1] - 31, `${F} N`, 's', 'middle'); };
      let h = K.p([[PB[0], PB[1]], [PB[0] - 18, PB[1] + 34], [PB[0] + 18, PB[1] + 34]], 'fk') + K.l(20, PB[1] + 34, 320, PB[1] + 34, 'lm');
      const A = en(-2.9), B = en(2.9);
      h += K.l(A[0], A[1], B[0], B[1], 'lg gr');
      for (let s = -2.5; s <= 2.5; s += 0.5) { if (!s) continue; const T = en(s); h += K.l(T[0], T[1] + 2, T[0], T[1] + 7, 'lm') + (Number.isInteger(s) ? K.t(T[0], T[1] + 20, `${Math.abs(s)} m`, 's tm') : ''); }
      p.izq.forEach(([F, x]) => { h += bloque(-x, F, 'fn'); });
      p.der.forEach(([F, x]) => { h += bloque(x, F, 'fn'); });
      h += bloque(v.x, p.mov, 'fa');
      h += K.t(8, 16, `izquierda: ${p.izq.map(([F, x]) => `${F} N a ${x} m`).join(', ')}`, 's tm', 'start');
      if (p.der.length) h += K.t(8, 34, `derecha: ${p.der.map(([F, x]) => `${F} N a ${x} m`).join(', ')}`, 's tm', 'start');
      h += K.t(332, p.der.length ? 52 : 34, `x = ${sg(v.x)} m`, 's ta', 'end');
      if (f > 0) h += K.f(f * 3 - 1, K.t(8, 222, `antihorario: ${sg(mIzq(p))} N·m`, 's to', 'start') + K.t(332, 222, `horario: ${sg(mDer(p, v.x))} N·m`, `s ${ok ? 'to' : 'tf'}`, 'end'))
        + K.f(f * 3 - 2, sello(K, ok, 'en equilibrio', net > 0 ? 'baja la izquierda' : 'baja la derecha', 332, 16 + (p.der.length ? 54 : 36)));
      return h;
    },
    lee: v => `$x = ${v.x}$ m`,
    aviso(v, p) {
      const D = mDer(p, v.x), I = mIzq(p);
      return p.trampas?.[v.x] || `Con x = ${sg(v.x)} m la derecha suma ${sg(D)} N·m y la izquierda ${sg(I)} N·m: ${D < I ? 'gana la izquierda; aleja el peso del apoyo' : 'gana la derecha; acércalo al apoyo'}.`;
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- en movimiento: momento-suelta-la-tuerca
  // Se fija el momento y al soltar la llave gira la tuerca; la aguja del medidor sube hasta el valor fijado y aparece el de verdad.
  //   tiro { q, r, max, u, cuenta, trampas: { valor: aviso } }
  const CT = [86, 128], GT = [250, 150];
  XG.tiros('momento-suelta-la-tuerca', {
    perilla: t => ({ et: `momento, en ${t.u || 'N·m'}`, min: 0, max: t.max, cara: v => v, lee: v => `${v} ${t.u || 'N·m'}` }),
    meta: t => t.r, alto: 206, ms: 1800, pie: 'Fija el momento y suelta: la llave gira la tuerca.',
    dib(t, v, K, p, f) {
      const w = v == null ? 0 : v / t.max, g = Math.min(1, f * 1.2), ang = 200 + 80 * w * g;
      let h = K.c(...CT, 54, 'fn') + K.c(...CT, 20, 'fk');
      for (let k = 0; k < 5; k++) { const Q = K.at(CT[0], CT[1], 36, 90 + 72 * k); h += K.c(Q[0], Q[1], 4, 'fk'); }
      const E = K.at(CT[0], CT[1], 74, ang), E2 = K.at(CT[0], CT[1], 74, ang + 180);
      h += K.l(...E2, ...E, 'lg gr') + K.c(...CT, 7, 'fA');
      // medidor: semicírculo de 0 a max
      h += K.arc(GT[0], GT[1], 62, 0, 180, 'lm gr');
      for (let k = 0; k <= t.max; k += 5) { const a = 180 - 180 * k / t.max, A = K.at(GT[0], GT[1], 62, a), B = K.at(GT[0], GT[1], 54, a); h += K.l(...A, ...B, 'lm') + (k % 10 === 0 ? K.t(...K.at(GT[0], GT[1], 76, a), `${k}`, 's tm') : ''); }
      h += K.t(GT[0], GT[1] + 22, t.u || 'N·m', 's tm');
      const N = K.at(GT[0], GT[1], 50, 180 - 180 * w * g);
      h += K.l(...GT, ...N, `${v == null ? 'lm' : 'la'} gr`) + K.c(...GT, 4, 'fk');
      if (v == null) return h;
      const ok = v === t.r, M = K.at(GT[0], GT[1], 62, 180 - 180 * t.r / t.max), M2 = K.at(GT[0], GT[1], 46, 180 - 180 * t.r / t.max);
      return h + K.f(f * 2 - 1, K.l(...M, ...M2, 'lo gr')) + K.f(f * 3 - 2, K.t(8, 18, ok ? `${v}: gira justo ✓` : `${v}: ${v > t.r ? 'te pasas' : 'no alcanza'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'start'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} ${v > t.r ? 'te pasas' : 'te quedas corto'}: el momento es la fuerza por el brazo de palanca, la distancia de la tuerca a la línea de la fuerza.`,
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-22.js
// Geometría Vectorial · juegos de la lección geo-22 «La circunferencia y la parábola» (spec 2026-11-27-curso-geometria-vectorial).
// Las cónicas son cortes de un cono; la circunferencia se fija con tres condiciones (tres puntos, o centro y tangente) y la parábola
// es el lugar de los puntos a igual distancia de un foco y una directriz, con vértice, p, lado recto |4p| y propiedad reflectora.
// La circunferencia como lugar (completar cuadrados, cuerdas, tangentes por discriminante) es de geo-13; elipse e hipérbola, de
// geo-23. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 1000) / 1000);
  const pt = q => `(${fm(q[0])}, ${fm(q[1])})`;
  // x − h escrito bien: «x − 2», «x + 2» o «x».
  const menos = (s, h) => (h === 0 ? s : `${s} ${h > 0 ? '−' : '+'} ${fm(Math.abs(h))}`);
  const menosT = (s, h) => (h === 0 ? s : `${s} ${h > 0 ? '-' : '+'} ${Math.abs(h)}`);
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const rej = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    return h;
  };
  const dentro = (P, q) => q[0] >= P.x0 - 1e-9 && q[0] <= P.x1 + 1e-9 && q[1] >= P.y0 - 1e-9 && q[1] <= P.y1 + 1e-9;
  // Polilínea con los tramos que caen dentro del cuadro.
  const traza = (K, P, pts, cls) => {
    let h = '', run = [];
    const corta = () => { if (run.length > 1) h += K.pl(run, cls); run = []; };
    pts.forEach(q => { if (dentro(P, q)) run.push(P2(P, q)); else corta(); });
    corta();
    return h;
  };
  // Parábola: eje 'x' es (x − h)² = 4p(y − k), eje 'y' es (y − k)² = 4p(x − h).
  const parab = (c, n = 80, L = 14) => {
    const out = [];
    for (let i = 0; i <= n; i++) { const t = -L + 2 * L * i / n; out.push(c.eje === 'x' ? [c.h + t, c.k + t * t / (4 * c.p)] : [c.h + t * t / (4 * c.p), c.k + t]); }
    return out;
  };
  const focoDe = c => (c.eje === 'x' ? [c.h, c.k + c.p] : [c.h + c.p, c.k]);
  const directriz = (K, P, c, cls) => (c.eje === 'x' ? K.l(P.X(P.x0), P.Y(c.k - c.p), P.X(P.x1), P.Y(c.k - c.p), cls) : K.l(P.X(c.h - c.p), P.Y(P.y0), P.X(c.h - c.p), P.Y(P.y1), cls));
  const dirTx = c => (c.eje === 'x' ? `y = ${fm(c.k - c.p)}` : `x = ${fm(c.h - c.p)}`);
  const ecuTx = c => (c.eje === 'x' ? `(${menos('x', c.h)})² = ${fm(4 * c.p)}(${menos('y', c.k)})` : `(${menos('y', c.k)})² = ${fm(4 * c.p)}(${menos('x', c.h)})`).replace(/\((x|y)\)²/, '$1²');
  const marcaOk = ok => (ok ? '✓' : '✗');
  const clsOk = ok => `s ${ok ? 'to' : 'tf'}`;
  // Segmento de la recta Q + t·d recortado al cuadro [x0, x1] × [y0, y1] (en píxeles).
  const recorta = (Q, d, L, B) => {
    let a = -L, b = L;
    for (const [q, dq, lo, hi] of [[Q[0], d[0], B[0], B[1]], [Q[1], d[1], B[2], B[3]]]) {
      if (Math.abs(dq) < 1e-9) { if (q < lo || q > hi) return null; continue; }
      let t1 = (lo - q) / dq, t2 = (hi - q) / dq; if (t1 > t2) [t1, t2] = [t2, t1];
      a = Math.max(a, t1); b = Math.min(b, t2);
    }
    return a < b ? [[Q[0] + a * d[0], Q[1] + a * d[1]], [Q[0] + b * d[0], Q[1] + b * d[1]]] : null;
  };

  // ------------------------------------------------------------------------- las cónicas son cortes de un cono doble
  // Se inclina el plano que corta el cono (de 15° en 15°); al comprobar sale la curva del corte.  v { g }
  //   params { gen (ángulo de la generatriz con la horizontal), meta ('circunferencia' | 'elipse' | 'parábola' | 'hipérbola'), ini, ok }
  const TIPO = (g, gen) => (g === 0 ? 'circunferencia' : g < gen ? 'elipse' : g === gen ? 'parábola' : 'hipérbola');
  const VC = [118, 112], HC = 94, QC = [136, 160], RM = 68;
  const icono = (K, tipo, cls) => {
    const c = [290, 108], pts = [];
    if (tipo === 'circunferencia') return K.arc(c[0], c[1], 28, 0, 360, cls);
    if (tipo === 'elipse') { for (let i = 0; i <= 48; i++) { const a = i / 48 * 2 * Math.PI; pts.push([c[0] + 38 * Math.cos(a), c[1] - 20 * Math.sin(a)]); } return K.pl(pts, cls); }
    if (tipo === 'parábola') { for (let i = 0; i <= 40; i++) { const t = -36 + 72 * i / 40; pts.push([c[0] + t, c[1] + 34 - t * t / 18]); } return K.pl(pts, cls); }
    const rama = s => { const q = []; for (let i = 0; i <= 30; i++) { const u = -1.4 + 2.8 * i / 30; q.push([c[0] + s * 12 * Math.cosh(u), c[1] - 20 * Math.sinh(u)]); } return K.pl(q, cls); };
    return rama(1) + rama(-1);
  };
  const aro = (K, cx, cy, rx, ry, cls) => { const q = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * 2 * Math.PI; q.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); } return K.pl(q, cls); };
  XG.figura('cono-cortado-por-plano', {
    ini: p => ({ g: p.ini }),
    manijas: () => [{ k: 'g', min: 0, max: 90, paso: 15, en: v => [QC[0] + RM * Math.cos(v.g * R), QC[1] - RM * Math.sin(v.g * R)],
      de: (x, y) => { const g = Math.atan2(QC[1] - y, x - QC[0]) / R; return g < -90 ? 90 : g < 0 ? 0 : g > 90 ? 90 : g; } }],
    ok: (v, p) => TIPO(v.g, p.gen) === p.meta,
    sol: p => ({ g: { circunferencia: 0, elipse: 15, 'parábola': p.gen, 'hipérbola': 90 }[p.meta] }),
    texto: p => (p.meta === 'parábola' ? `el plano paralelo a la generatriz, a $${p.gen}^{\\circ}$: el corte es una parábola` : `un plano que da una ${p.meta}`),
    alto: () => 226, pie: 'Arrastra el punto del plano para inclinarlo.',
    dib(v, K, p, f) {
      const dx = HC / Math.tan(p.gen * R), tipo = TIPO(v.g, p.gen), ok = tipo === p.meta;
      let h = K.l(VC[0], 8, VC[0], 218, 'lm d');
      for (const s of [1, -1]) h += K.l(VC[0] - s * dx, VC[1] - HC, VC[0] + s * dx, VC[1] + HC, 'lg gr');
      h += aro(K, VC[0], VC[1] - HC, dx, 10, 'lg') + aro(K, VC[0], VC[1] + HC, dx, 10, 'lg') + K.c(...VC, 3.5, 'fk');
      h += K.arc(...VC, 22, 0, p.gen, 'lg') + K.t(VC[0] + 30, VC[1] - 6, `${p.gen}°`, 's tg', 'start') + K.t(VC[0] - 10, VC[1] + 4, 'V', 's', 'end');
      h += K.t(8, 18, 'generatriz', 's tg', 'start');
      const S = recorta(QC, [Math.cos(v.g * R), -Math.sin(v.g * R)], 140, [6, 236, 6, 220]);
      if (S) h += K.l(...S[0], ...S[1], f >= 1 ? `${ok ? 'lo' : 'lf'} gr` : 'la gr');
      h += K.arc(...QC, 26, 0, v.g, 'lm') + K.t(QC[0] + 30, QC[1] + 16, `${v.g}°`, 's ta', 'start') + K.c(...QC, 3, 'fk');
      h += K.t(332, 18, 'el corte:', 's tm', 'end');
      if (f > 0) h += K.f(f, icono(K, tipo, `${ok ? 'lo' : 'lf'} gr`)) + K.f(f * 3 - 2, K.t(290, 178, `${tipo} ${marcaOk(ok)}`, clsOk(ok)));
      return h;
    },
    lee: (v, p) => `Plano a $${v.g}^{\\circ}$; generatriz a $${p.gen}^{\\circ}$: ${TIPO(v.g, p.gen)}`,
    aviso(v, p) {
      const t = TIPO(v.g, p.gen);
      if (t === 'circunferencia') return 'Con el plano horizontal, perpendicular al eje, el corte es una circunferencia.' + (p.meta === 'parábola' ? ' La parábola pide el plano paralelo a una generatriz.' : '');
      if (t === 'elipse') return 'Menos inclinado que la generatriz, el plano atraviesa toda una hoja del cono: el corte se cierra, es una elipse.';
      if (t === 'parábola') return 'Paralelo a la generatriz, el plano nunca vuelve a salir de esa hoja: el corte es una parábola, abierta.';
      return 'Más inclinado que la generatriz, el plano corta las dos hojas del cono: salen dos ramas, una hipérbola.';
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ circunferencia por tres puntos: D, E y F
  // Cada punto que se reemplaza en x² + y² + Dx + Ey + F = 0 da una ecuación; el sistema da D, E, F, y de ahí centro y radio.
  //   params { pts: [A, B, C], metas: [D, E, F, centro, radio], fichas, mira, trampas, ok }
  const PT = plano({ x0: -6, x1: 8, y0: -4, y1: 7 }, 64, 71, 9);
  const slotD = i => ({ x: 292, y: 30 + 44 * i, w: 76, h: 34 });
  const lin = ts => ts.filter(([c]) => c !== 0).map(([c, L], i) => {
    const a = Math.abs(c), s = a === 1 ? L : `${a}${L}`;
    return i === 0 ? (c < 0 ? `−${s}` : s) : `${c < 0 ? '−' : '+'} ${s}`;
  }).join(' ');
  const ecuD = q => `${lin([[q[0], 'D'], [q[1], 'E'], [1, 'F']])} = ${sg(-(q[0] * q[0] + q[1] * q[1]))}`;
  XG.rotula('circulo-tres-postes-def', {
    slots: p => p.metas.map((_, i) => slotD(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 236,
    texto: p => `$D = ${p.metas[0].replace('−', '-')},\\ E = ${p.metas[1].replace('−', '-')},\\ F = ${p.metas[2].replace('−', '-')}$: centro ${p.metas[3]} y radio ${p.metas[4]}`,
    fondo(K, p, f) {
      let h = rej(K, PT);
      p.pts.forEach((q, i) => { const Q = P2(PT, q); h += K.c(...Q, 3.5, 'fk') + K.t(Q[0] + 5, Q[1] - 5, 'ABC'[i], 's', 'start'); });
      h += K.t(8, 128, 'x² + y² + Dx + Ey + F = 0', 's ta', 'start');
      p.pts.forEach((q, i) => { h += K.t(8, 150 + 20 * i, `${'ABC'[i]}${pt(q)}: ${ecuD(q)}`, 's', 'start'); });
      ['D =', 'E =', 'F =', 'centro', 'radio'].forEach((e, i) => { const s = slotD(i); h += K.t(s.x - s.w / 2 - 6, s.y + 5, e, 's', 'end'); });
      if (f > 0) {
        const D = Number(p.metas[0].replace('−', '-')), E = Number(p.metas[1].replace('−', '-')), C = [-D / 2, -E / 2], r = Number(p.metas[4]);
        h += K.f(f, K.arc(...P2(PT, C), r * PT.u, 0, 360, 'lo gr') + K.c(...P2(PT, C), 3, 'fo'));
        h += K.f(f * 3 - 2, K.t(8, 220, `(${menos('x', C[0])})² + (${menos('y', C[1])})² = ${r * r} ✓`, 's to', 'start'));
      }
      return h;
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ---------------------------------------------------------------- centro y tangente: el radio es una distancia
  // Un aspersor en C riega un círculo que debe llegar justo a una cerca recta ax + by = c (escondida hasta comprobar).  v { r }
  //   params { C, a, b, c, ini, max, uni? (unidad del radio, m si falta), trampas: { r: aviso }, ok }
  const PA = plano({ x0: -6, x1: 5, y0: -3, y1: 7 }, 156, 182, 16);
  const distA = p => Math.abs(p.a * p.C[0] + p.b * p.C[1] - p.c) / Math.hypot(p.a, p.b);
  const rectaTx = p => `${lin([[p.a, 'x'], [p.b, 'y']])} = ${sg(p.c)}`;
  XG.figura('aspersor-tangente-cerca', {
    ini: p => ({ r: p.ini }),
    manijas: p => [{ k: 'r', min: 1, max: p.max || 6, paso: 0.5, et: `radio (${p.uni || 'm'})` }],
    ok: (v, p) => Math.abs(v.r - distA(p)) < 1e-9,
    sol: p => ({ r: distA(p) }),
    texto: p => `$r = \\dfrac{|${p.a} \\cdot (${p.C[0]}) + (${p.b}) \\cdot ${p.C[1]} - ${p.c}|}{\\sqrt{${p.a * p.a} + ${p.b * p.b}}} = ${fm(distA(p))}$`.replace(/\((\d+)\)/g, '$1'),
    alto: () => 280, pie: 'Desliza el radio.',
    dib(v, K, p, f) {
      const C = P2(PA, p.C), d = distA(p), ok = Math.abs(v.r - d) < 1e-9;
      let h = rej(K, PA) + K.arc(...C, v.r * PA.u, 0, 360, f >= 1 ? (ok ? 'lo gr' : 'lf gr') : 'la gr') + K.c(...C, 4, 'fk') + K.t(C[0] - 7, C[1] - 7, 'C', 's', 'end');
      h += K.t(332, 18, `(${menos('x', p.C[0])})² + (${menos('y', p.C[1])})² = ${fm(v.r * v.r)}`, 's ta', 'end') + K.t(332, 36, `recta: ${rectaTx(p)}`, 's tm', 'end');
      if (f > 0) {
        const n = Math.hypot(p.a, p.b), s = Math.sign(p.c - p.a * p.C[0] - p.b * p.C[1]) || 1, T = [p.C[0] + s * d * p.a / n, p.C[1] + s * d * p.b / n];
        const ln = [];
        for (let i = 0; i <= 60; i++) { const t = -12 + 24 * i / 60; ln.push([T[0] - t * p.b / n, T[1] + t * p.a / n]); }
        h += K.f(f, traza(K, PA, ln, 'lm gr') + K.l(...C, ...P2(PA, T), 'lo d') + K.c(...P2(PA, T), 3.5, 'fo'));
        h += K.f(f * 3 - 2, K.t(332, 54, `distancia de C a la recta: ${fm(d)} ${marcaOk(ok)}`, clsOk(ok), 'end'));
      }
      return h;
    },
    lee: (v, p) => `$(${menosT('x', p.C[0])})^2 + (${menosT('y', p.C[1])})^2 = ${v.r * v.r}$`,
    aviso(v, p) {
      const d = distA(p);
      return p.trampas?.[v.r] || `Con r = ${fm(v.r)} la circunferencia ${v.r < d ? 'no llega a la recta' : 'corta la recta'}: la tangente tiene por radio la distancia del centro a la recta.`;
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------------- la parábola: igual distancia al foco y a la directriz
  // Se arrastra P por una fila horizontal hasta que PF = d(P, directriz); al comprobar se ven las dos medidas y la parábola.  v { x }
  //   params { c: { eje: 'x', h, k, p }, fila, ini, min, max, lado?: 1 | −1 (solo vale el punto de ese lado del eje), trampas: { x: aviso }, ok }
  const PE = plano({ x0: -8, x1: 8, y0: -3, y1: 6 }, 170, 138, 18);
  const dF = (p, x) => Math.hypot(x - focoDe(p.c)[0], p.fila - focoDe(p.c)[1]);
  const dL = p => Math.abs(p.fila - (p.c.k - p.c.p));
  const igualE = (p, x) => Math.abs(dF(p, x) - dL(p)) < 1e-9, ladoE = (p, x) => !p.lado || Math.sign(x - p.c.h) === p.lado;
  const okE = (v, p) => igualE(p, v.x) && ladoE(p, v.x);
  XG.figura('equidista-foco-directriz', {
    ini: p => ({ x: p.ini }),
    manijas: p => [{ k: 'x', min: p.min ?? -8, max: p.max ?? 8, paso: 1, rot: () => 'P', en: v => P2(PE, [v.x, p.fila]), de: x => (x - PE.ox) / PE.u }],
    ok: okE,
    sol: p => { for (let x = p.max ?? 8; x >= (p.min ?? -8); x--) if (okE({ x }, p)) return { x }; return { x: 0 }; },
    texto: p => { const x = Math.sqrt(4 * p.c.p * (p.fila - p.c.k)); return `$x^2 = ${4 * p.c.p} \\cdot ${p.fila - p.c.k} = ${x * x}$: P en $(\\pm ${x}, ${p.fila})$, a ${fm(dL(p))} del foco y de la directriz`; },
    alto: () => 206, pie: 'Arrastra P por la fila.',
    dib(v, K, p, f) {
      const F = focoDe(p.c), Pq = [v.x, p.fila], ok = okE(v, p), yd = p.c.k - p.c.p;
      let h = rej(K, PE) + directriz(K, PE, p.c, 'lf gr') + K.t(PE.X(PE.x0) + 2, PE.Y(yd) + 14, 'directriz', 's tf', 'start');
      h += K.l(PE.X(PE.x0), PE.Y(p.fila), PE.X(PE.x1), PE.Y(p.fila), 'lm d') + K.c(...P2(PE, F), 4.5, 'fk') + K.t(PE.X(F[0]) + 7, PE.Y(F[1]) - 6, 'F', 's', 'start');
      h += K.l(...P2(PE, Pq), ...P2(PE, F), 'lg') + K.l(...P2(PE, Pq), PE.X(v.x), PE.Y(yd), 'lg');
      h += K.t(8, 16, `F${pt(F)}, directriz ${dirTx(p.c)}`, 's tm', 'start');
      if (f > 0) {
        h += K.f(f, traza(K, PE, parab(p.c), 'la gr'));
        h += K.f(f * 3 - 2, K.t(332, 16, `PF = ${fm(dF(p, v.x))}, a la directriz ${fm(dL(p))} ${marcaOk(ok)}`, clsOk(ok), 'end'));
      }
      return h;
    },
    lee: (v, p) => `$PF = \\sqrt{${fm((v.x - focoDe(p.c)[0]) ** 2)} + ${fm((p.fila - focoDe(p.c)[1]) ** 2)}} \\approx ${fm(dF(p, v.x))}$; a la directriz: $${fm(dL(p))}$`.replace(/−/g, '-'),
    aviso(v, p) {
      const a = dF(p, v.x), b = dL(p);
      if (igualE(p, v.x) && !ladoE(p, v.x)) return `Ese punto sí está a ${fm(b)} del foco y de la directriz, pero queda al otro lado del eje: se pide el de la ${p.lado > 0 ? 'derecha' : 'izquierda'}.`;
      return p.trampas?.[v.x] || (a < b ? `PF = ${fm(a)} es menor que ${fm(b)}: P está más cerca del foco. Aléjalo del eje.` : `PF = ${fm(a)} es mayor que ${fm(b)}: P está más cerca de la directriz. Acércalo al eje.`);
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- de la ecuación general a la ordinaria, completando el cuadrado
  // Se arrastra lo que se suma, el vértice, p, el foco y la directriz; al comprobar se dibuja la parábola.
  //   params { eq, paso, c, metas, fichas, mira, trampas, ok }
  const PC = plano({ x0: -1, x1: 7, y0: -1, y1: 7 }, 23, 131, 13);
  const slotC = i => ({ x: 282, y: 34 + 44 * i, w: 92, h: 34 });
  XG.rotula('parabola-completa-cuadrado', {
    slots: p => p.metas.map((_, i) => slotC(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 236,
    texto: p => `$${ecuTx(p.c).replace(/²/g, '^2').replace(/−/g, '-')}$: vértice ${p.metas[1]}, foco ${p.metas[3]}, directriz $${p.metas[4].replace('−', '-')}$`,
    fondo(K, p, f) {
      let h = K.t(8, 18, p.eq, 's ta', 'start') + rej(K, PC) + K.t(8, 168, p.paso, 's', 'start') + K.t(8, 190, 'lo que sumas va a los dos lados', 's tm', 'start');
      ['se suma', 'vértice', 'p', 'foco', 'directriz'].forEach((e, i) => { const s = slotC(i); h += K.t(s.x - s.w / 2 - 6, s.y + 5, e, 's', 'end'); });
      if (f > 0) {
        const F = focoDe(p.c);
        h += K.f(f, traza(K, PC, parab(p.c), 'lo gr') + directriz(K, PC, p.c, 'lf d') + K.c(...P2(PC, [p.c.h, p.c.k]), 3, 'fk') + K.c(...P2(PC, F), 3.5, 'fo'));
        h += K.f(f * 3 - 2, K.t(8, 214, `${ecuTx(p.c)} ✓`, 's to', 'start'));
      }
      return h;
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------- de la ecuación al foco: hacia dónde abre y cuánto
  // Se ve el vértice; se arrastra el foco a su sitio. Al comprobar se dibujan la parábola y la directriz.  v { x, y }
  //   params { c, ini: [x, y], trampas: { 'x:y': aviso }, ok }
  const PF = plano({ x0: -6, x1: 4, y0: -4, y1: 7 }, 130, 169, 15);
  XG.figura('foco-de-la-ecuacion', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-6, -4], max: [4, 7], paso: 1, rot: () => 'F', en: v => P2(PF, [v.x, v.y]), de: (x, y) => [(x - PF.ox) / PF.u, (PF.oy - y) / PF.u] }],
    ok: (v, p) => { const F = focoDe(p.c); return v.x === F[0] && v.y === F[1]; },
    sol: p => { const F = focoDe(p.c); return { x: F[0], y: F[1] }; },
    texto: p => `$4p = ${4 * p.c.p}$, $p = ${p.c.p}$: el foco es $${pt(focoDe(p.c)).replace(/−/g, '-')}$ y la directriz $${dirTx(p.c).replace(/−/g, '-')}$`,
    alto: () => 240, pie: 'Arrastra el foco.',
    dib(v, K, p, f) {
      const Vq = [p.c.h, p.c.k], Fq = focoDe(p.c), ok = v.x === Fq[0] && v.y === Fq[1];
      let h = rej(K, PF) + K.c(...P2(PF, Vq), 4.5, 'fk') + K.t(PF.X(Vq[0]) - 7, PF.Y(Vq[1]) + 15, 'V', 's', 'end');
      h += K.t(332, 18, ecuTx(p.c), 's ta', 'end') + K.t(332, 36, `tu foco: ${pt([v.x, v.y])}`, 's tm', 'end');
      if (f > 0) {
        h += K.f(f, traza(K, PF, parab(p.c), `${ok ? 'lo' : 'lf'} gr`) + directriz(K, PF, p.c, 'lm d') + K.c(...P2(PF, Fq), 4, 'fo'));
        h += K.f(f * 3 - 2, K.t(332, 54, `foco ${pt(Fq)}, directriz ${dirTx(p.c)} ${marcaOk(ok)}`, clsOk(ok), 'end'));
      }
      return h;
    },
    lee: (v, p) => `Tu foco: $${pt([v.x, v.y]).replace(/−/g, '-')}$; $4p = ${4 * p.c.p}$`,
    aviso(v, p) {
      const c = p.c, t = p.trampas?.[`${v.x}:${v.y}`];
      if (t) return t;
      const enEje = c.eje === 'x' ? v.x === c.h : v.y === c.k;
      if (!enEje) return `El foco está sobre el eje de la parábola, la recta ${c.eje === 'x' ? `x = ${fm(c.h)}` : `y = ${fm(c.k)}`} que pasa por el vértice: la variable al cuadrado es ${c.eje}, así que el eje es ${c.eje === 'x' ? 'vertical' : 'horizontal'}.`;
      const d = c.eje === 'x' ? v.y - c.k : v.x - c.h;
      if (Math.sign(d) !== Math.sign(c.p)) return `Abre hacia el lado del foco: 4p = ${4 * c.p} es ${c.p > 0 ? 'positivo' : 'negativo'}, así que el foco va hacia ${c.eje === 'x' ? (c.p > 0 ? 'arriba' : 'abajo') : (c.p > 0 ? 'la derecha' : 'la izquierda')} del vértice.`;
      return `El sentido es bueno, pero la distancia del vértice al foco es |p| = ${fm(Math.abs(c.p))}, la cuarta parte de |4p|; tu foco está a ${fm(Math.abs(d))}.`;
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------------------- propiedad reflectora: el receptor de la antena
  // Corte de una antena x² = 4py; se sube el receptor por el eje. Al comprobar llegan rayos paralelos y se reflejan al foco.  v { r }
  //   params { ancho, hondo, ini, max, trampas: { r: aviso }, ok }
  const VA = [170, 204], UA = 18;
  const pA = p => (p.ancho / 2) ** 2 / (4 * p.hondo);
  XG.figura('receptor-de-la-antena', {
    ini: p => ({ r: p.ini }),
    manijas: p => [{ k: 'r', min: 0, max: p.max || 8, paso: 0.5, rot: () => 'R', en: v => [VA[0], VA[1] - v.r * UA], de: (x, y) => (VA[1] - y) / UA }],
    ok: (v, p) => Math.abs(v.r - pA(p)) < 1e-9,
    sol: p => ({ r: pA(p) }),
    texto: p => `$x^2 = 4py$ pasa por el borde $(${p.ancho / 2}, ${p.hondo})$: $${(p.ancho / 2) ** 2} = ${4 * p.hondo}p$, $p = ${fm(pA(p))}$ dm`,
    alto: () => 226, pie: 'Sube o baja el receptor por el eje.',
    dib(v, K, p, f) {
      const a = p.ancho / 2, pp = pA(p), ok = Math.abs(v.r - pp) < 1e-9, X = x => VA[0] + x * UA, Y = y => VA[1] - y * UA, plato = [];
      for (let i = 0; i <= 40; i++) { const x = -a + 2 * a * i / 40; plato.push([X(x), Y(x * x / (4 * pp))]); }
      let h = K.pl(plato, 'lm gr') + K.l(VA[0], VA[1], VA[0], Y(p.max || 8) - 6, 'lm d');
      h += K.t(8, 36, `boca: ${p.ancho} dm de ancho`, 's tm', 'start') + K.l(X(-a), Y(p.hondo) - 6, X(-a), Y(p.hondo) + 6, 'lm') + K.l(X(a), Y(p.hondo) - 6, X(a), Y(p.hondo) + 6, 'lm') + K.l(X(a) + 10, Y(0), X(a) + 10, Y(p.hondo), 'lm') + K.t(X(a) + 16, Y(p.hondo / 2) + 4, `${p.hondo} dm`, 's tm', 'start');
      h += K.t(8, 18, `receptor: ${fm(v.r)} dm`, 's ta', 'start');
      if (f > 0) {
        const F = [VA[0], Y(pp)];
        [-0.85, -0.55, -0.25, 0.25, 0.55, 0.85].forEach((s, i) => {
          const x = s * a, H = [X(x), Y(x * x / (4 * pp))], g = Math.min(1, f * 1.6), g2 = Math.max(0, Math.min(1, f * 1.6 - 0.6));
          h += K.l(H[0], 60, H[0], 60 + (H[1] - 60) * g, 'lg');
          if (g2 > 0) h += K.l(...H, H[0] + (F[0] - H[0]) * g2, H[1] + (F[1] - H[1]) * g2, 'la');
        });
        h += K.f(f * 2 - 1, K.c(...F, 4, 'fo')) + K.f(f * 3 - 2, K.t(332, 18, `las ondas se juntan a ${fm(pp)} dm ${marcaOk(ok)}`, clsOk(ok), 'end'));
      }
      return h;
    },
    lee: (v, p) => `Receptor a $${v.r}$ dm del fondo; borde en $(${p.ancho / 2}, ${p.hondo})$`,
    aviso: (v, p) => p.trampas?.[v.r] || `Con el receptor a ${fm(v.r)} dm, las ondas reflejadas se juntan ${v.r < pA(p) ? 'más arriba' : 'más abajo'}: van todas al foco, a p del fondo. Halla p con el borde del plato.`,
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------------- en movimiento: el camión que pasa bajo el arco
  // El arco es x² = 4p(y − H) con p < 0 y el suelo en y = 0. Se fija la altura del camión (ancho 2x, centrado) y al soltar avanza
  // hacia el arco: si es más alto, choca; si es más bajo, pasa con espacio de sobra; justo, roza.
  //   tiro { q, H, p4 (= 4p), x, r, max, cuenta, trampas }
  XG.tiros('camion-bajo-el-arco', {
    perilla: t => ({ et: 'altura del camión (m)', min: 0, max: t.max || 12, cara: v => sg(v), lee: v => `${v} m` }),
    meta: t => t.r, alto: 230, ms: 1800, pie: 'Fija la altura y suelta.',
    dib(t, v, K, p, f) {
      const a = Math.sqrt(-t.p4 * t.H), u = Math.min(140 / a, 160 / t.H), O = [170, 206], X = x => O[0] + x * u, Y = y => O[1] - y * u, arco = [];
      for (let i = 0; i <= 50; i++) { const x = -a + 2 * a * i / 50; arco.push([X(x), Y(t.H + x * x / t.p4)]); }
      let h = K.l(8, O[1], 332, O[1], 'lm gr') + K.pl(arco, 'lm gr') + K.t(8, 18, t.et || `arco: x² = ${sg(t.p4)}(y − ${t.H})`, 's tm', 'start');
      if (v == null) return h;
      const g = Math.min(1, f * 1.25), s = 0.35 + 0.65 * g, ok = v === t.r, w = t.x * u * s, hh = v * u * s, top = O[1] - hh;
      const tope = v > t.r && g >= 1;
      h += K.r(O[0] - w, top, 2 * w, hh, tope ? 'ff' : 'fa', 3) + K.c(O[0] - w * 0.6, O[1] - 2, 5 * s, 'fk') + K.c(O[0] + w * 0.6, O[1] - 2, 5 * s, 'fk');
      h += K.t(332, 18, `camión: ${v} m`, 's ta', 'end');
      if (g >= 1) {
        const ya = Y(t.H + t.x * t.x / t.p4);
        if (v < t.r) h += K.l(X(t.x), top, X(t.x), ya, 'lm d') + K.t(X(t.x) + 6, (top + ya) / 2 + 4, 'sobra', 's tm', 'start');
        if (tope) h += K.c(X(t.x), ya, 5, 'ff') + K.c(X(-t.x), ya, 5, 'ff') + K.t(332, 36, 'choca con el arco', 's tf', 'end');
      }
      return h + K.f(f * 3 - 2, K.t(332, 54, `cabe hasta ${t.r} m ${marcaOk(ok)}`, clsOk(ok), 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || (v > t.r ? `Con ${v} m el camión choca: a ${t.x} m del centro el arco mide menos.` : `Con ${v} m pasa, pero sobra espacio: el arco, a ${t.x} m del centro, todavía es más alto.`),
    cuenta: t => t.cuenta,
  });
})();
;
//#archivo js/games/gva-escena-23.js
// Geometría Vectorial · juegos de la lección geo-23 «La elipse y la hipérbola» (spec 2026-11-27-curso-geometria-vectorial).
// La elipse como lugar d₁ + d₂ = 2a (la cuerda del jardinero), sus focos (c² = a² − b²) y su propiedad reflectora, su ecuación
// ordinaria y su ficha (e, lado recto); la hipérbola con su rectángulo auxiliar y sus asíntotas, sus focos (c² = a² + b², e > 1),
// el tipo de cónica por los signos de A y C, y la localización por diferencia de distancias. La circunferencia y la parábola son de
// geo-22. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const pt = q => `(${q.map(N).join(', ')})`;
  const r2 = x => Math.round(x * 100) / 100;
  const en = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  // Rejilla con el origen en O y u píxeles por unidad, en la ventana [x0, x1, y0, y1].
  const rej = (K, O, u, [x0, x1, y0, y1]) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  // Una curva por puntos, cortada a la caja [X0, X1, Y0, Y1] en píxeles (lo que sale de la caja no se dibuja).
  const corta = (K, pts, cls, [X0, X1, Y0, Y1]) => {
    let h = '', run = [];
    const va = () => { if (run.length > 1) h += K.pl(run, cls); run = []; };
    for (const q of pts) { if (q[0] >= X0 && q[0] <= X1 && q[1] >= Y0 && q[1] <= Y1) run.push(q); else va(); }
    va();
    return h;
  };
  // Elipse de centro (h, k) con semieje horizontal A y vertical B; hipérbola con rectángulo de semiancho A y semialto B,
  // que abre a los lados (d = 0) o hacia arriba y abajo (d = 1).
  const elipse = (Q, h, k, A, B) => Array.from({ length: 145 }, (_, i) => { const t = i / 144 * 2 * Math.PI; return Q(h + A * Math.cos(t), k + B * Math.sin(t)); });
  const ramas = (Q, h, k, A, B, d, S = 3) => [1, -1].map(sg => Array.from({ length: 121 }, (_, i) => {
    const s = -S + 2 * S * i / 120;
    return d ? Q(h + A * Math.sinh(s), k + sg * B * Math.cosh(s)) : Q(h + sg * A * Math.cosh(s), k + B * Math.sinh(s));
  }));
  const hiper = (K, Q, h, k, A, B, d, cls, caja) => ramas(Q, h, k, A, B, d).map(r => corta(K, r, cls, caja)).join('');
  // Recta por (x₁, y₁) y (x₂, y₂) en unidades, cortada a la caja.
  const recta = (K, Q, [x1, y1], [x2, y2], cls, caja) => corta(K, Array.from({ length: 81 }, (_, i) => Q(x1 + (x2 - x1) * i / 80, y1 + (y2 - y1) * i / 80)), cls, caja);
  // Rótulo con una placa detrás, para que se lea sobre la rejilla.
  const plato = (K, x, y, s, cls, a = 'start') => {
    const w = s.length * 5.6 + 10, x0 = a === 'start' ? x - 5 : a === 'end' ? x - w + 5 : x - w / 2;
    return K.r(x0, y - 13, w, 18, 'fc', 5) + K.t(x, y, s, cls, a);
  };
  // (x − h) escrito con su signo, en texto plano: x − 2, x + 3 o x.
  const menos = (s, h) => (h > 0 ? `${s} − ${h}` : h < 0 ? `${s} + ${-h}` : s);
  const cuad = (s, h) => (h ? `(${menos(s, h)})²` : `${s}²`);

  // ------------------------------------------------------------ cuerda-del-jardinero · la elipse es d₁ + d₂ = 2a
  // Una cuerda de largo L amarrada a dos estacas en (±c, 0); el lápiz la tensa. Se arrastra el lápiz al punto más alto.
  //   v { a, b }   params { c, L, ini: [x, y], ok }
  const JO = [170, 122], JU = 20, JQ = en(JO, JU), JW = [-7, 7, -4, 4], JC = [JO[0] - 7 * JU, JO[0] + 7 * JU, JO[1] - 4 * JU, JO[1] + 4 * JU];
  const JB = p => Math.sqrt((p.L / 2) ** 2 - p.c ** 2);
  const JD = (v, p) => [Math.hypot(v.a + p.c, v.b), Math.hypot(v.a - p.c, v.b)];
  XG.figura('cuerda-del-jardinero', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: ['a', 'b'], min: [-6, -4], max: [6, 4], paso: 1, en: v => JQ(v.a, v.b), de: (x, y) => [(x - JO[0]) / JU, (JO[1] - y) / JU] }],
    ok: (v, p) => v.a === 0 && v.b === JB(p),
    sol: p => ({ a: 0, b: JB(p) }),
    texto: p => { const b = JB(p); return `$d_1 + d_2 = 2\\sqrt{${p.c}^2 + ${b}^2} = ${p.L}$: el punto más alto es $(0, ${b})$, con $a = ${p.L / 2}$ y $b = ${b}$`; },
    alto: () => 240, pie: 'Arrastra el lápiz: la cuerda lo sigue.',
    dib(v, K, p, f) {
      const [d1, d2] = JD(v, p), s = d1 + d2, F1 = JQ(-p.c, 0), F2 = JQ(p.c, 0), L = JQ(v.a, v.b), on = Math.abs(s - p.L) < 1e-6;
      let h = rej(K, JO, JU, JW);
      if (f > 0) h += K.f(f, corta(K, elipse(JQ, 0, 0, p.L / 2, JB(p)), 'lo d', JC));
      h += K.pl([F1, L, F2], 'lg gr') + K.c(...F1, 5, 'fk') + K.c(...F2, 5, 'fk');
      h += K.t(F1[0], F1[1] + 18, 'F₁', 's tm') + K.t(F2[0], F2[1] + 18, 'F₂', 's tm');
      if (f > 0) {
        h += K.f(f, K.t((F1[0] + L[0]) / 2 - 6, (F1[1] + L[1]) / 2 - 6, `${N(d1)}`, 's tg', 'end') + K.t((F2[0] + L[0]) / 2 + 6, (F2[1] + L[1]) / 2 - 6, `${N(d2)}`, 's tg', 'start'));
        h += K.f(f, K.t(330, 230, `d₁ + d₂ = ${N(s)} m${on ? '' : s > p.L ? ': no alcanza' : ': floja'}`, `s ${on ? 'to' : 'ta'}`, 'end'));
      }
      return h + K.t(14, 18, `estacas a ${2 * p.c} m · cuerda de ${p.L} m`, 's tm', 'start') + K.t(14, 230, `lápiz en ${pt([v.a, v.b])}`, 's ta', 'start');
    },
    lee: (v, p) => { const [d1, d2] = JD(v, p); return `$d_1 + d_2 = ${N(d1)} + ${N(d2)} = ${N(d1 + d2)}$ m`; },
    aviso(v, p) {
      const [d1, d2] = JD(v, p), s = d1 + d2, a = p.L / 2;
      if (Math.abs(s - p.L) < 1e-6) return `Ese punto sí está en la curva: d₁ + d₂ = ${p.L}. Pero no es el más alto, que queda en medio de las estacas.`;
      if (v.a === 0 && v.b === a) return `${a} es la mitad de la cuerda, pero cada mitad va en diagonal desde una estaca: ${a}² = ${p.c}² + b².`;
      if (v.a === 0 && v.b === p.c) return `Con altura ${p.c} cada tramo mide √(${p.c}² + ${p.c}²) ≈ ${N(d1)} m: la cuerda no alcanza.`;
      if (v.a !== 0) return 'El punto más alto queda en el medio, sobre x = 0: allí los dos tramos de cuerda miden lo mismo.';
      return s > p.L ? `Ahí d₁ + d₂ = ${N(s)} m: la cuerda de ${p.L} m no alcanza. Acerca el lápiz al eje x.` : `Ahí d₁ + d₂ = ${N(s)} m: la cuerda queda floja. Aléjalo del eje x hasta tensarla.`;
    },
    bien: p => p.ok || 'La suma de las distancias a las estacas es el largo de la cuerda: eso es la elipse.',
  });

  // ------------------------------------------------------------ galeria-de-susurros · los focos y la propiedad reflectora
  // Una sala (o un reflector) con forma de elipse de semiejes a (largo) y b. Se arrastra al que emite sobre el eje largo; el otro
  // queda a la misma distancia del otro lado. Al comprobar, los rayos rebotan en la pared: si están en los focos, se juntan.
  //   v { x }   params { a, b, et: [emite, recibe], ok }
  const GU = p => Math.min(140 / p.a, 100 / p.b), GOr = p => [170, 34 + p.b * GU(p)];
  const GC = p => Math.sqrt(p.a ** 2 - p.b ** 2);
  // Rayo desde (x, 0) con ángulo t: punto de la pared y dirección reflejada (en unidades de la elipse).
  const rebote = (p, x, t) => {
    const c = Math.cos(t), s = Math.sin(t), A = c * c / p.a ** 2 + s * s / p.b ** 2, B = 2 * x * c / p.a ** 2, C = x * x / p.a ** 2 - 1;
    const k = (-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A), W = [x + k * c, k * s];
    let n = [W[0] / p.a ** 2, W[1] / p.b ** 2]; const m = Math.hypot(...n); n = [n[0] / m, n[1] / m];
    const dn = c * n[0] + s * n[1], r = [c - 2 * dn * n[0], s - 2 * dn * n[1]];
    const L = Math.abs(r[1]) > 1e-9 && r[1] * W[1] < 0 ? -W[1] / r[1] : p.a;
    return [W, [W[0] + r[0] * L, W[1] + r[1] * L]];
  };
  XG.figura('galeria-de-susurros', {
    ini: p => ({ x: p.ini ?? 1 }),
    manijas: p => { const O = GOr(p), u = GU(p); return [{ k: 'x', min: 0, max: p.a, paso: 1, en: v => [O[0] + v.x * u, O[1]], de: x => (x - O[0]) / u }]; },
    ok: (v, p) => v.x === GC(p),
    sol: p => ({ x: GC(p) }),
    texto: p => `$c = \\sqrt{a^2 - b^2} = \\sqrt{${p.a ** 2} - ${p.b ** 2}} = ${GC(p)}$: cada uno a ${GC(p)} del centro, en los focos`,
    alto: p => Math.round(2 * p.b * GU(p) + 68), pie: 'Arrastra al que emite por el eje largo.',
    dib(v, K, p, f) {
      const O = GOr(p), u = GU(p), Q = en(O, u), H = Math.round(2 * p.b * GU(p) + 68), et = p.et || ['habla', 'escucha'];
      let h = corta(K, elipse(Q, 0, 0, p.a, p.b), 'lm gr', [0, 340, 0, H]) + K.l(...Q(-p.a, 0), ...Q(p.a, 0), 'lr d');
      for (let i = -p.a + 1; i < p.a; i++) h += K.l(Q(i, 0)[0], O[1] - 3, Q(i, 0)[0], O[1] + 3, 'lm');
      if (f > 0) {
        const junta = v.x === GC(p), cls = junta ? 'lo' : 'la';
        for (let i = 0; i < 10; i++) {
          const t = (i + 0.5) / 10 * 2 * Math.PI;
          if (Math.abs(Math.sin(t)) < 0.2) continue;
          const [W, E] = rebote(p, v.x, t), S = [v.x, 0], g = Math.min(1, f * 2), g2 = Math.max(0, f * 2 - 1);
          h += K.l(...Q(...S), ...Q(S[0] + (W[0] - S[0]) * g, (W[1]) * g), cls);
          if (g2 > 0) h += K.l(...Q(...W), ...Q(W[0] + (E[0] - W[0]) * g2, W[1] + (E[1] - W[1]) * g2), cls);
        }
        if (f >= 1) h += K.t(330, H - 10, junta ? 'todo llega al otro foco' : 'los rebotes se dispersan', `s ${junta ? 'to' : 'ta'}`, 'end');
      }
      h += K.c(...Q(-v.x, 0), 7, 'fk') + K.t(Q(-v.x, 0)[0], O[1] - 14, et[1], 's tm') + K.t(Q(v.x, 0)[0], O[1] + 32, et[0], 's ta');
      return h + K.t(14, 18, `a ${v.x} del centro`, 's ta', 'start') + K.t(330, 18, `largo ${2 * p.a} · ancho ${2 * p.b}`, 's tm', 'end');
    },
    lee: v => `a $${v.x}$ del centro`,
    aviso(v, p) {
      if (v.x === p.b) return `${p.b} es el semieje menor. Los focos están a c del centro, con c² = a² − b².`;
      if (v.x === p.a) return 'Ahí están los vértices, pegados a la pared: los rebotes salen hacia todos lados.';
      if (v.x === 0) return 'En el centro los dos quedarían juntos: los focos están uno a cada lado, a c del centro.';
      return `A ${v.x} del centro los rebotes no se juntan en el otro. Calcula c con c² = ${p.a}² − ${p.b}².`;
    },
    bien: p => p.ok || 'Lo que sale de un foco rebota en la elipse y llega al otro foco.',
  });

  // ------------------------------------------------------------ elipse-centro-y-semiejes · de la ecuación ordinaria a la figura
  // Se arrastran el centro (h, k) y los extremos de los semiejes horizontal A y vertical B; la elipse se dibuja en vivo.
  //   v { h, k, A, B }   params { h, k, A, B, ini, ok }
  const EO = [170, 120], EU = 12, EQ = en(EO, EU), EW = [-13, 13, -9, 9], EC = [EO[0] - 13 * EU, EO[0] + 13 * EU, EO[1] - 9 * EU, EO[1] + 9 * EU];
  const eqE = (v, A, B) => `${cuad('x', v.h)}/${A * A} + ${cuad('y', v.k)}/${B * B} = 1`;
  XG.figura('elipse-centro-y-semiejes', {
    ini: p => ({ ...p.ini }),
    manijas: () => [
      { k: ['h', 'k'], min: [-5, -3], max: [5, 3], paso: 1, en: v => EQ(v.h, v.k), de: (x, y) => [(x - EO[0]) / EU, (EO[1] - y) / EU] },
      { k: 'A', min: 2, max: 7, paso: 1, en: v => EQ(v.h + v.A, v.k), de: (x, y, v) => (x - EO[0]) / EU - v.h },
      { k: 'B', min: 2, max: 6, paso: 1, en: v => EQ(v.h, v.k + v.B), de: (x, y, v) => (EO[1] - y) / EU - v.k }],
    ok: (v, p) => v.h === p.h && v.k === p.k && v.A === p.A && v.B === p.B,
    sol: p => ({ h: p.h, k: p.k, A: p.A, B: p.B }),
    texto: p => { const c = Math.sqrt(Math.abs(p.A ** 2 - p.B ** 2)); return `Centro $(${p.h}, ${p.k})$, semiejes $${p.A}$ en $x$ y $${p.B}$ en $y$; $c = ${N(c)}$`; },
    alto: () => 240, pie: 'Arrastra el centro y las puntas de los semiejes.',
    dib(v, K, p, f) {
      let h = rej(K, EO, EU, EW) + corta(K, elipse(EQ, v.h, v.k, v.A, v.B), 'la gr', EC);
      h += K.l(...EQ(v.h, v.k), ...EQ(v.h + v.A, v.k), 'lm d') + K.l(...EQ(v.h, v.k), ...EQ(v.h, v.k + v.B), 'lm d');
      if (f > 0 && v.A !== v.B) {
        const c = Math.sqrt(Math.abs(v.A ** 2 - v.B ** 2)), F = v.A > v.B ? [[v.h + c, v.k], [v.h - c, v.k]] : [[v.h, v.k + c], [v.h, v.k - c]];
        h += K.f(f, F.map(q => K.c(...EQ(...q), 4, 'fo')).join('') + plato(K, 330, 232, `focos ${F.map(pt).join(' y ')}`, 's to', 'end'));
      }
      if (f > 0) h += K.f(f, plato(K, 14, 40, eqE(v, v.A, v.B), `s ${this.ok(v, p) ? 'to' : 'ta'}`));
      return h + plato(K, 14, 18, `centro ${pt([v.h, v.k])} · semiejes ${v.A} y ${v.B}`, 's ta');
    },
    lee: v => `$\\dfrac{(x - (${v.h}))^2}{${v.A ** 2}} + \\dfrac{(y - (${v.k}))^2}{${v.B ** 2}} = 1$`,
    aviso(v, p) {
      const eq = eqE(p, p.A, p.B);
      if (v.A === p.B && v.B === p.A && p.A !== p.B) return `Están cambiados: en ${eq} el número bajo ${cuad('x', p.h)} es ${p.A ** 2}, así que el semieje horizontal es ${p.A}.`;
      if (v.h === -p.h && p.h && v.h !== p.h) return `Cuidado con el signo: ${menos('x', p.h)} es x − (${p.h}), así que h = ${p.h}.`;
      if (v.k === -p.k && p.k && v.k !== p.k) return `Cuidado con el signo: ${menos('y', p.k)} es y − (${p.k}), así que k = ${p.k}.`;
      if (v.h !== p.h || v.k !== p.k) return `El centro (h, k) se lee de (x − h) y (y − k) en ${eq}.`;
      if (v.A !== p.A) return `El semieje horizontal es la raíz del número bajo ${cuad('x', p.h)}: √${p.A ** 2}.`;
      return `El semieje vertical es la raíz del número bajo ${cuad('y', p.k)}: √${p.B ** 2}.`;
    },
    bien: p => p.ok || 'Centro y semiejes leídos de la ecuación: la elipse queda dibujada.',
  });

  // ------------------------------------------------------------ ficha-de-la-elipse · c, focos, excentricidad y lado recto
  // Una elipse de eje mayor horizontal (x − h)²/a² + (y − k)²/b² = 1. Se arrastran c, los dos focos (F₁ y F₂, en cualquier
  // orden), e y el lado recto.
  //   params { h, k, a, b, extra, trampas?, ok }
  const FS = [34, 80, 126, 172, 218].map(y => ({ x: 286, y, w: 84, h: 34 }));
  const FM = p => { const c = Math.sqrt(p.a ** 2 - p.b ** 2); return [N(c), pt([p.h + c, p.k]), pt([p.h - c, p.k]), N(c / p.a), N(2 * p.b ** 2 / p.a)]; };
  // Lugar por lugar; los focos (lugares 1 y 2) valen en cualquier orden, sin repetir.
  const FJ = (q, p) => {
    const m = FM(p), v = q.map(l => l?.[0]), foco = i => (v[i] === m[1] || v[i] === m[2]) && v[1] !== v[2];
    return m.map((x, i) => (i === 1 || i === 2 ? foco(i) : v[i] === x));
  };
  XG.rotula('ficha-de-la-elipse', {
    slots: () => FS, metas: FM, juzga: FJ, fichas: p => [...FM(p), ...p.extra], alto: () => 240,
    texto: p => { const m = FM(p).map(s => s.replace(/−/g, '-')); return `$c = ${m[0]}$, focos $${m[1]}$ y $${m[2]}$, $e = ${m[3]}$ y lado recto $${m[4]}$`; },
    fondo(K, p, f) {
      const u = 80 / p.a, C = [100, 128], Q = (x, y) => [C[0] + (x - p.h) * u, C[1] - (y - p.k) * u], c = Math.sqrt(p.a ** 2 - p.b ** 2), lr = p.b ** 2 / p.a;
      let h = K.l(14, C[1], 190, C[1], 'lr d') + K.l(C[0], 40, C[0], 216, 'lr d') + corta(K, elipse(Q, p.h, p.k, p.a, p.b), 'lg gr', [0, 200, 0, 240]);
      h += K.c(...C, 3, 'fk') + K.t(C[0] + 4, C[1] + 16, pt([p.h, p.k]), 's tm', 'start');
      h += K.t(14, 20, `${cuad('x', p.h)}/${p.a ** 2} + ${cuad('y', p.k)}/${p.b ** 2} = 1`, 's', 'start');
      h += K.f(f, [1, -1].map(s => K.c(...Q(p.h + s * c, p.k), 4, 'fo')).join('') + K.l(...Q(p.h + c, p.k - lr), ...Q(p.h + c, p.k + lr), 'lo gr'));
      return h + ['c =', 'F₁ =', 'F₂ =', 'e =', 'lado recto ='].map((s, i) => K.t(240, FS[i].y + 5, s, 's', 'end')).join('');
    },
    aviso(q, p) {
      const i = FJ(q, p).findIndex(b => !b);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        `En la elipse c² = a² − b² = ${p.a ** 2} − ${p.b ** 2}.`,
        'Los focos son (h ± c, k): desde el centro se camina c a cada lado, sobre el eje mayor.',
        'Los focos son (h ± c, k): desde el centro se camina c a cada lado, sobre el eje mayor.',
        'La excentricidad es e = c/a, un número entre 0 y 1 en la elipse.',
        `El lado recto mide 2b²/a = 2·${p.b ** 2}/${p.a}.`][i];
    },
    bien: p => p.ok || 'Con a y b sale c, y con c salen los focos y la excentricidad.',
  });

  // ------------------------------------------------------------ rectangulo-auxiliar-hiperbola · de la ecuación a la hipérbola
  // Se arrastran el centro y la esquina del rectángulo auxiliar (semiancho p, semialto q) y se elige hacia dónde abre;
  // las diagonales son las asíntotas y la hipérbola se dibuja en vivo.
  //   v { h, k, p, q, d }   params { h, k, p, q, d, ini, ok }
  const HO = [150, 118], HU = 14, HQ = en(HO, HU), HW = [-10, 12, -4, 8], HC = [HO[0] - 10 * HU, HO[0] + 12 * HU, HO[1] - 8 * HU, HO[1] + 4 * HU];
  const eqH = v => (v.d ? `${cuad('y', v.k)}/${v.q * v.q} − ${cuad('x', v.h)}/${v.p * v.p} = 1` : `${cuad('x', v.h)}/${v.p * v.p} − ${cuad('y', v.k)}/${v.q * v.q} = 1`);
  XG.figura('rectangulo-auxiliar-hiperbola', {
    ini: P => ({ ...P.ini }),
    manijas: () => [
      { k: ['h', 'k'], min: [-4, -3], max: [4, 3], paso: 1, en: v => HQ(v.h, v.k), de: (x, y) => [(x - HO[0]) / HU, (HO[1] - y) / HU] },
      { k: ['p', 'q'], min: [1, 1], max: [6, 5], paso: 1, en: v => HQ(v.h + v.p, v.k + v.q), de: (x, y, v) => [(x - HO[0]) / HU - v.h, (HO[1] - y) / HU - v.k] },
      { k: 'd', min: 0, max: 1, paso: 1, et: 'abre hacia', rot: v => (v.d ? '↕' : '↔') }],
    ok: (v, P) => v.h === P.h && v.k === P.k && v.p === P.p && v.q === P.q && v.d === P.d,
    sol: P => ({ h: P.h, k: P.k, p: P.p, q: P.q, d: P.d }),
    texto: P => `Centro $(${P.h}, ${P.k})$, rectángulo de $${2 * P.p} \\times ${2 * P.q}$, abre ${P.d ? 'hacia arriba y abajo' : 'a los lados'}; asíntotas de pendiente $\\pm\\tfrac{${P.q}}{${P.p}}$`,
    alto: () => 232, pie: 'Arrastra el centro y la esquina; elige hacia dónde abre.',
    dib(v, K, P, f) {
      let h = rej(K, HO, HU, HW);
      h += K.p([HQ(v.h - v.p, v.k - v.q), HQ(v.h + v.p, v.k - v.q), HQ(v.h + v.p, v.k + v.q), HQ(v.h - v.p, v.k + v.q)], 'fn') + K.l(...HQ(v.h - v.p, v.k - v.q), ...HQ(v.h + v.p, v.k - v.q), 'lm d');
      h += recta(K, HQ, [v.h - 12 * v.p, v.k - 12 * v.q], [v.h + 12 * v.p, v.k + 12 * v.q], 'lm', HC) + recta(K, HQ, [v.h - 12 * v.p, v.k + 12 * v.q], [v.h + 12 * v.p, v.k - 12 * v.q], 'lm', HC);
      h += hiper(K, HQ, v.h, v.k, v.p, v.q, v.d, 'la gr', HC);
      if (f > 0) {
        const c = Math.hypot(v.p, v.q), F = v.d ? [[v.h, v.k + c], [v.h, v.k - c]] : [[v.h + c, v.k], [v.h - c, v.k]];
        h += K.f(f, F.map(q => K.c(...HQ(...q), 4, 'fo')).join('') + plato(K, 14, 40, eqH(v), `s ${this.ok(v, P) ? 'to' : 'ta'}`));
      }
      return h + plato(K, 14, 18, `centro ${pt([v.h, v.k])} · rectángulo ${2 * v.p} × ${2 * v.q}`, 's ta');
    },
    lee: v => `asíntotas $y - (${v.k}) = \\pm\\tfrac{${v.q}}{${v.p}}(x - (${v.h}))$`,
    aviso(v, P) {
      const y = cuad('y', P.k), x = cuad('x', P.h);
      if (v.d !== P.d) return `El término positivo es el de ${P.d ? y : x}: la hipérbola abre ${P.d ? 'hacia arriba y hacia abajo' : 'hacia los lados'}.`;
      if (v.h === -P.h && P.h && v.h !== P.h) return `Cuidado con el signo: ${menos('x', P.h)} es x − (${P.h}), así que h = ${P.h}.`;
      if (v.k === -P.k && P.k && v.k !== P.k) return `Cuidado con el signo: ${menos('y', P.k)} es y − (${P.k}), así que k = ${P.k}.`;
      if (v.h !== P.h || v.k !== P.k) return 'El centro (h, k) se lee de (x − h) y (y − k).';
      if (v.p === P.q && v.q === P.p && P.p !== P.q) return `Están cambiados: bajo ${y} está ${P.q ** 2}, así que el semialto es ${P.q}; bajo ${x}, ${P.p ** 2}: el semiancho es ${P.p}.`;
      if (v.p === P.p ** 2 || v.q === P.q ** 2) return 'Bajo cada cuadrado está el semieje al cuadrado: el rectángulo va √ de cada denominador a cada lado del centro.';
      return `El rectángulo va ±√${P.p ** 2} en x y ±√${P.q ** 2} en y desde el centro; sus diagonales son las asíntotas.`;
    },
    bien: P => P.ok || 'El rectángulo auxiliar da las asíntotas, y la hipérbola se pega a ellas.',
  });

  // ------------------------------------------------------------ focos-de-la-hiperbola · c² = a² + b² y e = c/a > 1
  // La hipérbola x²/a² − y²/b² = 1 con su rectángulo. Se arrastra el foco derecho por el eje (el otro va igual) y se desliza e.
  //   v { c, i }   params { a, b, es: [valores de e], ini, ok }
  const ZO = [170, 92], ZU = 16, ZQ = en(ZO, ZU), ZW = [-9, 9, -3, 5], ZC = [ZO[0] - 9 * ZU, ZO[0] + 9 * ZU, ZO[1] - 5 * ZU, ZO[1] + 3 * ZU];
  const ZF = p => Math.hypot(p.a, p.b);
  XG.figura('focos-de-la-hiperbola', {
    ini: p => ({ ...p.ini }),
    manijas: p => [{ k: 'c', min: 0, max: 9, paso: 1, en: v => ZQ(v.c, 0), de: x => (x - ZO[0]) / ZU },
      { k: 'i', min: 0, max: p.es.length - 1, paso: 1, et: 'excentricidad e', rot: v => p.es[v.i] }],
    ok: (v, p) => v.c === ZF(p) && p.es[v.i] === N(ZF(p) / p.a),
    sol: p => ({ c: ZF(p), i: p.es.indexOf(N(ZF(p) / p.a)) }),
    texto: p => `$c = \\sqrt{a^2 + b^2} = \\sqrt{${p.a ** 2} + ${p.b ** 2}} = ${ZF(p)}$ y $e = \\tfrac{c}{a} = \\tfrac{${ZF(p)}}{${p.a}} = ${N(ZF(p) / p.a)}$`,
    alto: () => 204, pie: 'Arrastra el foco por el eje y desliza la excentricidad.',
    dib(v, K, p, f) {
      let h = rej(K, ZO, ZU, ZW) + K.l(...ZQ(-p.a, -p.b), ...ZQ(p.a, -p.b), 'lm d') + K.l(...ZQ(p.a, -p.b), ...ZQ(p.a, p.b), 'lm d') + K.l(...ZQ(p.a, p.b), ...ZQ(-p.a, p.b), 'lm d') + K.l(...ZQ(-p.a, p.b), ...ZQ(-p.a, -p.b), 'lm d');
      h += recta(K, ZQ, [-9, -9 * p.b / p.a], [9, 9 * p.b / p.a], 'lm', ZC) + recta(K, ZQ, [-9, 9 * p.b / p.a], [9, -9 * p.b / p.a], 'lm', ZC);
      h += hiper(K, ZQ, 0, 0, p.a, p.b, 0, 'lg gr', ZC) + K.c(...ZQ(p.a, 0), 3, 'fk') + K.c(...ZQ(-p.a, 0), 3, 'fk') + K.c(...ZQ(-v.c, 0), 6, 'fa');
      if (f > 0) {
        const P = [ZF(p), p.b ** 2 / p.a], d1 = Math.hypot(P[0] + v.c, P[1]), d2 = Math.hypot(P[0] - v.c, P[1]), dd = r2(Math.abs(d1 - d2)), bien = Math.abs(dd - 2 * p.a) < 1e-6;
        h += K.f(f, K.arc(...ZO, v.c * ZU, 0, 360, 'lo d') + K.c(...ZQ(...P), 4, 'fk') + K.l(...ZQ(...P), ...ZQ(-v.c, 0), 'lf') + K.l(...ZQ(...P), ...ZQ(v.c, 0), 'lf'));
        h += K.f(f, plato(K, 330, 40, `|d₁ − d₂| = ${N(dd)}${bien ? ` = 2a` : ` ≠ ${2 * p.a}`}`, `s ${bien ? 'to' : 'ta'}`, 'end'));
      }
      return h + plato(K, 14, 18, `c = ${v.c} · e = ${p.es[v.i]}`, 's ta') + plato(K, 330, 18, `a = ${p.a} · b = ${p.b}`, 's tm', 'end');
    },
    lee: (v, p) => `$c = ${v.c}$, $e = ${p.es[v.i]}$`,
    aviso(v, p) {
      const c = ZF(p), e = Number(p.es[v.i]);
      if (v.c !== c) {
        if (v.c === p.a) return 'Ahí está el vértice. En la hipérbola el foco queda más lejos del centro que el vértice: c > a.';
        if (v.c === p.b) return `${p.b} es el semieje conjugado b. Los focos cumplen c² = a² + b².`;
        if (v.c === p.a + p.b) return 'a + b no: a y b son catetos y c es la hipotenusa, c² = a² + b².';
        if (v.c === 0) return 'Los focos no están en el centro: están sobre el eje, más afuera que los vértices.';
        return `c² = a² + b² = ${p.a ** 2} + ${p.b ** 2}: el foco queda a la mitad de la diagonal del rectángulo.`;
      }
      if (e < 1) return 'En la hipérbola c > a, así que e = c/a es mayor que 1.';
      if (e === 1) return 'e = 1 es la parábola. Aquí e = c/a.';
      if (p.es[v.i] === N(c / p.b)) return 'Dividiste entre b: la excentricidad es c/a, con a el semieje que va hacia los focos.';
      return `El foco va bien; la excentricidad es c/a = ${c}/${p.a}.`;
    },
    bien: p => p.ok || 'En la hipérbola c² = a² + b² y e = c/a > 1.',
  });

  // ------------------------------------------------------------ conica-por-signos · Ax² + Cy² = R según los signos de A y C
  // Se deslizan A y C; la curva se dibuja en vivo (elipse, circunferencia, hipérbola, rectas paralelas o ningún punto).
  //   v { A, C }   params { A, C, R, ini, ok }
  const SO = [170, 92], SU = 14, SQ = en(SO, SU), SW = [-11, 11, -5, 5], SC = [SO[0] - 11 * SU, SO[0] + 11 * SU, SO[1] - 5 * SU, SO[1] + 5 * SU];
  const tipo = (A, C) => (A > 0 && C > 0 ? (A === C ? 'circunferencia' : 'elipse') : A * C < 0 ? 'hipérbola' : (A > 0 || C > 0) ? 'dos rectas paralelas' : 'ningún punto');
  const co = n => (n === 1 ? '' : n === -1 ? '−' : N(n));
  const ec = (A, C, R) => `${A ? `${co(A)}x²` : ''}${A && C ? (C > 0 ? ' + ' : ' − ') : C < 0 ? '−' : ''}${C ? `${co(Math.abs(C))}y²` : ''}${!A && !C ? '0' : ''} = ${R}`;
  const curvaS = (K, A, C, R, cls) => {
    const t = tipo(A, C);
    if (t === 'elipse' || t === 'circunferencia') return corta(K, elipse(SQ, 0, 0, Math.sqrt(R / A), Math.sqrt(R / C)), cls, SC);
    if (t === 'hipérbola') return A > 0 ? hiper(K, SQ, 0, 0, Math.sqrt(R / A), Math.sqrt(-R / C), 0, cls, SC) : hiper(K, SQ, 0, 0, Math.sqrt(-R / A), Math.sqrt(R / C), 1, cls, SC);
    if (t === 'dos rectas paralelas') {
      const m = Math.sqrt(R / (A || C));
      return [1, -1].map(s => (A ? recta(K, SQ, [s * m, -5.5], [s * m, 5.5], cls, SC) : recta(K, SQ, [-11.5, s * m], [11.5, s * m], cls, SC))).join('');
    }
    return '';
  };
  XG.figura('conica-por-signos', {
    ini: p => ({ ...(p.ini || { A: 2, C: 2 }) }),
    manijas: () => [{ k: 'A', min: -12, max: 12, paso: 1, et: 'A, el coeficiente de x²', rot: v => N(v.A) }, { k: 'C', min: -12, max: 12, paso: 1, et: 'C, el coeficiente de y²', rot: v => N(v.C) }],
    ok: (v, p) => v.A === p.A && v.C === p.C,
    sol: p => ({ A: p.A, C: p.C }),
    texto: p => `$${ec(p.A, p.C, p.R).replace(/−/g, '-').replace(/²/g, '^2')}$: ${tipo(p.A, p.C) === 'hipérbola' ? 'una hipérbola, porque A y C tienen signos distintos' : 'una elipse, porque A y C tienen el mismo signo'}`,
    alto: () => 270, pie: 'Desliza A y C: la curva cambia en vivo.',
    dib(v, K, p, f) {
      let h = rej(K, SO, SU, SW) + curvaS(K, v.A, v.C, p.R, 'la gr');
      if (tipo(v.A, v.C) === 'ningún punto') h += plato(K, SO[0], SO[1] - 30, 'ningún punto la cumple', 's ta', 'middle');
      if (f > 0) {
        const t = tipo(v.A, v.C), ok = this.ok(v, p);
        if (t === 'hipérbola') {
          const m = Math.sqrt(-v.A / v.C);
          h += K.f(f, recta(K, SQ, [-11, -11 * m], [11, 11 * m], 'lo d', SC) + recta(K, SQ, [-11, 11 * m], [11, -11 * m], 'lo d', SC));
        }
        if (v.A > 0) h += K.f(f, [1, -1].map(s => K.c(...SQ(s * Math.sqrt(p.R / v.A), 0), 4, 'fo')).join(''));
        if (v.C > 0) h += K.f(f, [1, -1].map(s => K.c(...SQ(0, s * Math.sqrt(p.R / v.C)), 4, 'fo')).join(''));
        h += K.f(f, plato(K, 330, 18, t, `s ${ok ? 'to' : 'ta'}`, 'end'));
      }
      return h + plato(K, 14, 18, ec(v.A, v.C, p.R), 's ta');
    },
    lee: (v, p) => `$${ec(v.A, v.C, p.R).replace(/−/g, '-').replace(/²/g, '^2')}$: ${tipo(v.A, v.C)}`,
    aviso(v, p) {
      const T = tipo(p.A, p.C), t = tipo(v.A, v.C);
      if (t === 'ningún punto') return `Con A y C negativos (o cero) el lado izquierdo nunca llega a ${p.R}: ningún punto la cumple.`;
      if (t === 'dos rectas paralelas') return 'Con un coeficiente en cero quedan dos rectas paralelas, un caso degenerado: hacen falta x² y y².';
      if (T === 'hipérbola') {
        const vert = p.C > 0, pos = vert ? p.C : p.A, vv = Math.sqrt(p.R / pos);
        if (t !== 'hipérbola') return 'Con A y C del mismo signo sale una elipse (una circunferencia si son iguales): la hipérbola pide signos distintos.';
        if ((v.C > 0) !== vert) return `Abre hacia el otro lado: el término positivo dice hacia dónde abre. Aquí debe ser el de ${vert ? 'y' : 'x'}.`;
        if ((vert ? v.C : v.A) !== pos) return `Los vértices quedan en ±√(${p.R}/${vert ? v.C : v.A}); para que estén en ±${N(vv)}, ese coeficiente debe ser ${p.R}/${N(vv * vv)}.`;
        return `Los vértices ya están bien; falta la pendiente de las asíntotas: el otro coeficiente es −${p.R} entre el otro semieje al cuadrado.`;
      }
      const sa = Math.sqrt(p.R / p.A), sc = Math.sqrt(p.R / p.C);
      if (t === 'hipérbola') return 'Con signos distintos sale una hipérbola: la elipse pide A y C del mismo signo.';
      if (t === 'circunferencia' && p.A !== p.C) return 'Con A = C sale una circunferencia: aquí los dos semiejes son distintos.';
      return `Para semiejes de ${N(sa)} en x y ${N(sc)} en y: A = ${p.R}/${N(sa * sa)} y C = ${p.R}/${N(sc * sc)}.`;
    },
    bien: p => p.ok || 'Signos iguales: elipse; signos distintos: hipérbola. El término positivo dice hacia dónde abre.',
  });

  // ------------------------------------------------------------ radar-de-dos-estaciones · en movimiento: d(A) − d(B) constante
  // Dos estaciones A y B en la costa, a D km. El barco sale de B hacia el norte; se fija cuánto navega y al soltar zarpa. Se
  // detiene bien si allí d(A) − d(B) = k: está en la rama de hipérbola de focos A y B.
  //   params { tiros: [{ q, D, k, max, e? }] }
  const RY = t => (t.D ** 2 - t.k ** 2) / (2 * t.k), RB = 196;
  const RG = (t, v) => { const u = Math.min(220 / t.D, 150 / t.max), A = [50, RB], B = [50 + t.D * u, RB]; return { u, A, B, S: [B[0], RB - (v || 0) * u] }; };
  XG.tiros('radar-de-dos-estaciones', {
    perilla: t => ({ et: 'navega (km)', min: 0, max: t.max, cara: v => (v ? String(v) : ''), lee: v => `${v} km` }), meta: RY, alto: 220, ms: 1600,
    dib(t, v, K, p, f) {
      const g = RG(t, v), y = (v || 0) * Math.min(1, f * 1.25), S = [g.B[0], RB - y * g.u];
      let h = K.l(10, RB, 330, RB, 'lm gr') + K.t(330, RB + 16, 'costa', 's tm', 'end') + K.l(g.B[0], RB, g.B[0], RB - t.max * g.u, 'lr d');
      h += K.r(g.A[0] - 8, RB - 8, 16, 16, 'fk', 3) + K.t(g.A[0], RB + 18, 'A', 's') + K.r(g.B[0] - 8, RB - 8, 16, 16, 'fk', 3) + K.t(g.B[0] - 14, RB + 18, 'B', 's');
      if (v != null && f >= 1) {
        const dA = Math.hypot(t.D, v), dd = r2(dA - v), ok = Math.abs(dd - t.k) < 1e-6, c = t.D / 2, a = t.k / 2, b = Math.sqrt(c * c - a * a), M = 50 + c * g.u;
        h += corta(K, Array.from({ length: 81 }, (_, i) => { const s = i / 80 * 4; return [M + a * Math.cosh(s) * g.u, RB - b * Math.sinh(s) * g.u]; }), 'lo d', [0, 340, 46, RB]);
        h += K.l(...g.A, ...S, 'lg') + K.l(...g.B, ...S, 'lf');
        h += K.t(330, 18, `d(A) − d(B) = ${N(dA)} − ${v} = ${N(dd)}`, `s ${ok ? 'to' : 'ta'}`, 'end');
      }
      h += K.p([[S[0], S[1] - 10], [S[0] + 7, S[1] + 6], [S[0] - 7, S[1] + 6]], 'fa');
      return h + K.t(14, 18, v ? `navega ${v} km` : 'navega ? km', 's ta', 'start') + K.t(14, 36, `A y B a ${t.D} km`, 's tm', 'start');
    },
    falla(t, v) {
      if (t.e?.[v]) return t.e[v];
      if (v === t.k) return `${t.k} km es la diferencia de distancias, no lo que navega: allí d(A) − d(B) = ${N(Math.hypot(t.D, v) - v)}.`;
      const dd = Math.hypot(t.D, v) - v;
      return dd > t.k ? `Con ${v} km, d(A) − d(B) = ${N(dd)} km, más que ${t.k}: todavía no llega. Sigue hacia el norte.` : `Con ${v} km, d(A) − d(B) = ${N(dd)} km, menos que ${t.k}: se pasó.`;
    },
    cuenta: t => { const y = RY(t), dA = Math.hypot(t.D, y); return `$d_A = \\sqrt{${t.D}^2 + ${y}^2} = ${dA}$ y $d_A - d_B = ${dA} - ${y} = ${t.k}$ km`; },
    pie: 'Estira hasta los kilómetros que navega y suelta.',
  });
})();
;
//#archivo js/explora-gva-1.js
// Geometría Vectorial · explicación de geo-1 «Sistemas 2×2 y 3×3 y su geometría» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: cada ecuación es una recta (o un plano) y resolver es hallar lo común. Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  // Plano cartesiano con su rejilla: B = { x0, x1, y0, y1 }, origen en (ox, oy), u píxeles por unidad.
  const pl = (B, ox, oy, u) => ({ ...B, X: x => ox + x * u, Y: y => oy - y * u });
  const rej = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    const yx = P.y0 < 0 ? P.Y(0) + 13 : P.Y(P.y0) + 13, xy = P.x0 < 0 ? P.X(0) - 5 : P.X(P.x0) - 5;
    for (let x = P.x0; x <= P.x1; x++) if (x && x % 2 === 0) h += K.t(P.X(x), yx, sg(x), 's tm');
    for (let y = P.y0; y <= P.y1; y++) if (y && y % 2 === 0) h += K.t(xy, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h;
  };
  // Recta ax + by = c recortada al cuadro del plano.
  const rec = (K, P, a, b, c, cls) => {
    const q = [], m = (x, y) => { if (x >= P.x0 - 1e-9 && x <= P.x1 + 1e-9 && y >= P.y0 - 1e-9 && y <= P.y1 + 1e-9) q.push([x, y]); };
    if (Math.abs(b) > 1e-9) { m(P.x0, (c - a * P.x0) / b); m(P.x1, (c - a * P.x1) / b); }
    if (Math.abs(a) > 1e-9) { m((c - b * P.y0) / a, P.y0); m((c - b * P.y1) / a, P.y1); }
    let s = null, d = 0;
    q.forEach(u => q.forEach(w => { const e = Math.hypot(u[0] - w[0], u[1] - w[1]); if (e > d + 1e-9) { d = e; s = [u, w]; } }));
    return s ? K.l(P.X(s[0][0]), P.Y(s[0][1]), P.X(s[1][0]), P.Y(s[1][1]), cls) : '';
  };

  // 1 · una ecuación, una recta
  const P1 = pl({ x0: 0, x1: 9, y0: 0, y1: 6 }, 30, 190, 26);
  const PTS = [[8, 0], [4, 2], [0, 4], [2, 3], [6, 1]];
  const una = (v, K) => rej(K, P1) + PTS.map(([x, y], k) => (k < v.n ? K.c(P1.X(x), P1.Y(y), 5, 'fA') : '')).join('')
    + K.f(v.r1, rec(K, P1, 1, 2, 8, 'la gr') + K.t(332, 16, 'x + 2y = 8', 's ta', 'end'))
    + K.f(v.r2, rec(K, P1, 1, -1, 2, 'lg gr') + K.t(332, 34, 'x − y = 2', 's tg', 'end'))
    + K.f(v.z, K.c(P1.X(4), P1.Y(2), 9, 'fo') + K.t(P1.X(4) + 12, P1.Y(2) + 20, '(4, 2)', 's to', 'start'));

  // 2 · tres casos: x + y = 4 contra otra recta
  const P2 = pl({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 124, 22);
  const OTRA = { uno: [1, -1, 0, 'x − y = 0', 'se cortan: una solución'], par: [2, 2, -2, '2x + 2y = −2', 'paralelas: ninguna solución'], misma: [2, 2, 8, '2x + 2y = 8', 'la misma recta: infinitas'] };
  const casos = (v, K) => { const o = OTRA[v.caso]; return rej(K, P2) + rec(K, P2, 1, 1, 4, 'la gr') + rec(K, P2, o[0], o[1], o[2], v.caso === 'misma' ? 'lf gr d' : 'lf gr')
    + K.t(8, 16, 'x + y = 4', 's ta', 'start') + K.t(332, 16, o[3], 's tf', 'end') + K.t(170, 228, o[4], 's tm') + (v.caso === 'uno' ? K.c(P2.X(2), P2.Y(2), 6, 'fo') : ''); };
  const P2b = pl({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 120, 22);

  // 3 · eliminar: E₂ + k·E₁ gira alrededor del cruce
  const elim = (v, K) => { const r = [2 + v.k, -1 + v.k, 1 + 5 * v.k]; return rej(K, P2) + rec(K, P2, 1, 1, 5, 'lg') + rec(K, P2, 2, -1, 1, 'la')
    + K.t(8, 16, 'E₁: x + y = 5', 's tg', 'start') + K.t(332, 16, 'E₂: 2x − y = 1', 's ta', 'end')
    + K.f(v.r, rec(K, P2, ...r, 'lf gr') + K.t(170, 228, v.k > 0.99 ? 'E₂ + E₁:  3x = 6' : 'E₂ + k·E₁', 's tf'))
    + K.c(P2.X(2), P2.Y(3), 5, 'fk') + K.f(v.y, K.t(P2.X(2) + 10, P2.Y(3) - 8, '(2, 3)', 's to', 'start')); };
  const elim2 = (v, K) => { const r = [1 + 2 * v.k, 3 + v.k, 5 + 5 * v.k]; return rej(K, P2b) + rec(K, P2b, 2, 1, 5, 'lg') + rec(K, P2b, 1, 3, 5, 'la')
    + (r[0] || r[1] ? rec(K, P2b, ...r, 'lf gr') : '') + K.c(P2b.X(2), P2b.Y(1), 5, 'fk')
    + K.t(8, 14, 'E₁: 2x + y = 5', 's tg', 'start') + K.t(332, 14, 'E₂: x + 3y = 5', 's ta', 'end'); };

  // 4 · tres incógnitas: un sistema escalonado y las posiciones de tres planos
  const FILAS = [['x + 2y − z = 2', 'x = 1'], ['y + z = 5', 'y = 2'], ['2z = 6', 'z = 3']];
  const esquina = (K, c) => { const [x, y] = c, q = (a, b) => [x + a, y + b]; return K.p([c, q(0, -32), q(-28, -20), q(-28, 12)], 'fa') + K.p([c, q(0, -32), q(28, -20), q(28, 12)], 'fg') + K.p([c, q(-28, 12), q(0, 24), q(28, 12)], 'ff') + K.c(x, y, 4, 'fk'); };
  const libro = (K, [x, y]) => [[-30, 8], [30, 8], [-6, 18]].map(([dx, dy], i) => K.p([[x, y - 28], [x, y + 18], [x + dx, y + 18 + dy], [x + dx, y - 28 + dy]], ['fa', 'fg', 'ff'][i])).join('') + K.l(x, y - 28, x, y + 18, 'lf gr');
  const tunel = (K, [x, y]) => { const F = [[x - 30, y + 18], [x + 22, y + 18], [x - 4, y - 24]], B = F.map(([a, b]) => [a + 12, b - 10]); return K.p(B, 'fn') + F.map((u, i) => K.p([u, F[(i + 1) % 3], B[(i + 1) % 3], B[i]], ['fa', 'fg', 'ff'][i])).join(''); };
  const tres = (v, K) => FILAS.map(([e, s], i) => K.t(30, 34 + i * 30, e, '', 'start') + K.f(v.n - (2 - i), K.t(250, 34 + i * 30, s, 'to', 'start'))).join('')
    + K.f(v.f, esquina(K, [62, 168]) + libro(K, [170, 168]) + tunel(K, [278, 168]) + K.t(62, 222, 'un punto', 's') + K.t(170, 222, 'una recta', 's') + K.t(278, 222, 'ninguno', 's'));

  // Problema: dos recibos, dos rectas, un punto
  const P5 = pl({ x0: 0, x1: 6, y0: 0, y1: 6 }, 40, 180, 24);
  const pan = (v, K) => { const a = 3 * v.p + 2 * v.j, b = v.p + 2 * v.j;
    return rej(K, P5) + rec(K, P5, 3, 2, 12, 'la') + rec(K, P5, 1, 2, 8, 'lg') + K.c(P5.X(v.p), P5.Y(v.j), 7, 'fA') + K.t(P5.X(6) + 4, P5.Y(0) - 5, 'pan', 's tm', 'start') + K.t(P5.X(0) + 6, P5.Y(6) + 4, 'jugo', 's tm', 'start')
      + K.t(332, 70, `3·${v.p} + 2·${v.j} = ${a}`, a === 12 ? 'to' : 'tf', 'end') + K.t(332, 90, 'debe dar 12', 's tm', 'end')
      + K.t(332, 126, `${v.p} + 2·${v.j} = ${b}`, b === 8 ? 'to' : 'tf', 'end') + K.t(332, 146, 'debe dar 8', 's tm', 'end'); };

  xpLec('geo-1', [
    ['Una ecuación, una recta',
      xpMira('dibujo', 'Una ecuación con dos incógnitas tiene **muchas** soluciones, y juntas dibujan algo.', { dib: una, v: { n: 0, r1: 0, r2: 0, z: 0 }, alto: 220 }, [
        ['La ecuación x + 2y = 8 la cumplen muchos pares. Por ejemplo (8, 0): ocho más cero da ocho.', { n: 1 }, '$8 + 2 \\cdot 0 = 8$'],
        ['También (4, 2), (0, 4), (2, 3) y (6, 1). Mira dónde caen en el plano.', { n: 5 }, '$4 + 2 \\cdot 2 = 8$'],
        ['Todos quedan en fila: las soluciones de una ecuación lineal forman una recta.', { r1: 1 }],
        ['Otra condición, x − y = 2, es otra recta del mismo plano.', { r2: 1 }, '$x - y = 2$'],
        ['Resolver el sistema es buscar el punto que está en las dos rectas: el cruce.', { z: 1 }, '$4 + 2 \\cdot 2 = 8 \\quad 4 - 2 = 2$'],
        ['Ese punto cumple las dos ecuaciones a la vez. Por eso es la solución del sistema.', {}],
      ], 'Una ecuación $ax + by = c$ es una recta; la solución de un sistema es el punto común de sus rectas.'),
      xpHaz('dibujo', 'Arrastra el punto hasta un lugar que cumpla $2x + y = 6$.', { dib: (v, K) => rej(K, P1) + K.t(332, 16, `2·${v.x} + ${v.y} = ${2 * v.x + v.y}`, 2 * v.x + v.y === 6 ? 'to' : 'ta', 'end'), v: { x: 5, y: 5 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [9, 6], paso: 1, en: v => [P1.X(v.x), P1.Y(v.y)], de: (x, y) => [(x - 30) / 26, (190 - y) / 26] }],
        cumple: v => 2 * v.x + v.y === 6, sol: { x: 2, y: 2 }, lee: v => `$2 \\cdot ${v.x} + ${v.y} = ${2 * v.x + v.y}$`,
        dice: v => (2 * v.x + v.y === 6 ? 'Cumple. Y no es el único: todos los puntos de esa recta cumplen.' : `Da ${2 * v.x + v.y}; tiene que dar 6.`) },
        'Cumplen $(0, 6)$, $(1, 4)$, $(2, 2)$ y $(3, 0)$: todos en la misma recta.')],
    ['Tres casos',
      xpMira('dibujo', 'Dos rectas del plano solo pueden hacer **tres** cosas.', { dib: casos, v: { caso: 'uno' }, alto: 236 }, [
        ['Pueden cortarse en un solo punto: el sistema tiene una solución.', { caso: 'uno' }, '$x + y = 4,\\; x - y = 0 \\;\\Rightarrow\\; (2, 2)$'],
        ['O tener la misma inclinación y no tocarse nunca: paralelas, ninguna solución.', { caso: 'par' }],
        ['O ser la misma recta escrita de otra forma: infinitas soluciones.', { caso: 'misma' }, '$2x + 2y = 8$ es $x + y = 4$'],
        ['¿Cómo saberlo sin dibujar? Divide coeficiente entre coeficiente.', { caso: 'par' }, '$\\tfrac{1}{2} = \\tfrac{1}{2} \\neq \\tfrac{4}{-2}$'],
        ['Si x e y no van en la misma proporción, se cruzan. Si van, decide el término de la derecha.', { caso: 'uno' }, '$\\tfrac{1}{1} \\neq \\tfrac{1}{-1}$'],
      ], 'Coeficientes no proporcionales: un punto. Proporcionales: paralelas, o la misma recta si también lo es el término.'),
      xpHaz('dibujo', 'La recta fija es $x - 2y = 2$. Elige $c$ para que $3x - 6y = c$ dé **infinitas** soluciones.', { dib: (v, K) => rej(K, P2b) + rec(K, P2b, 1, -2, 2, 'la gr') + rec(K, P2b, 3, -6, v.c, 'lf gr d')
        + K.t(8, 14, 'x − 2y = 2', 's ta', 'start') + K.t(332, 14, `3x − 6y = ${sg(v.c)}`, 's tf', 'end'), v: { c: 0 }, metas: { c: 6 }, alto: 262,
        manijas: [{ k: 'c', min: -6, max: 12, paso: 1, et: 'c, el término de la derecha' }],
        lee: v => `$3x - 6y = ${v.c}$ entre 3: $x - 2y = \\tfrac{${v.c}}{3}$`,
        dice: v => (v.c === 6 ? 'Las dos son la misma recta: infinitas soluciones.' : 'Paralelas y distintas: no hay solución.') },
        '$3x - 6y = 6$ es $x - 2y = 2$ multiplicada por 3: la misma recta.')],
    ['Eliminar una incógnita',
      xpMira('dibujo', 'Truco para no adivinar el cruce: **sumar** ecuaciones.', { dib: elim, v: { k: 0, r: 0, y: 0 }, alto: 236 }, [
        ['Dos ecuaciones, x + y = 5 y 2x − y = 1, se cruzan en un punto que aún no conocemos.', {}],
        ['Si un punto cumple las dos, también cumple su suma. Sumar da otra recta.', { r: 1 }],
        ['Al ir sumando, la recta nueva gira, pero siempre pasa por el mismo cruce.', { k: 1 }, '$(2x - y) + (x + y) = 1 + 5$'],
        ['La suma es 3x = 6: la y desapareció y la recta quedó vertical, en x = 2.', {}, '$3x = 6 \\;\\Rightarrow\\; x = 2$'],
        ['Con x = 2 en la primera, 2 + y = 5, así que y = 3. El cruce es (2, 3).', { y: 1 }, '$2 + y = 5 \\;\\Rightarrow\\; y = 3$'],
      ], 'Sumar a una ecuación un múltiplo de otra da una recta por el mismo punto; con el múltiplo justo se va una incógnita.'),
      xpHaz('dibujo', 'Con $2x + y = 5$ ($E_1$) y $x + 3y = 5$ ($E_2$), elige cuántas veces sumar $E_1$ a $E_2$ para que **desaparezca la y**.', { dib: elim2, v: { k: 1 }, metas: { k: -3 }, alto: 262,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k: veces que se suma E₁' }],
        lee: v => `$E_2 + (${v.k})E_1$: $${1 + 2 * v.k}x + ${3 + v.k}y = ${5 + 5 * v.k}$`,
        dice: v => (3 + v.k === 0 ? `Queda ${sg(1 + 2 * v.k)}x = ${sg(5 + 5 * v.k)}: la y desapareció.` : 'La y sigue ahí: su coeficiente todavía no es cero.') },
        '$k = -3$: $-5x = -10$, $x = 2$; y con $2 \\cdot 2 + y = 5$, $y = 1$.')],
    ['Tres incógnitas',
      xpMira('dibujo', 'Con x, y, z la idea es la misma, pero en el espacio.', { dib: tres, v: { n: 0, f: 0 }, alto: 236 }, [
        ['Con tres incógnitas, una ecuación como x + 2y − z = 2 ya no es una recta: es un plano.', {}],
        ['Este sistema es escalonado: cada renglón tiene una incógnita menos que el de arriba.', {}],
        ['Se empieza por abajo: 2z = 6, así que z = 3.', { n: 1 }, '$z = 3$'],
        ['Subiendo: el segundo da y = 2, y el primero, x = 1.', { n: 3 }, '$x = 2 - 4 + 3 = 1$'],
        ['La solución (1, 2, 3) es el único punto que está en los tres planos.', {}],
        ['Tres planos pueden cruzarse en un punto, compartir una recta, ser el mismo plano o no tener nada en común.', { f: 1 }],
      ], 'Una ecuación en x, y, z es un plano; un sistema escalonado se resuelve de abajo hacia arriba.'),
      xpHaz('fichas', 'Sistema escalonado: resuelve de abajo hacia arriba y arrastra cada valor junto a su incógnita.', {
        slots: [{ x: 268, y: 126, w: 70, h: 40 }, { x: 268, y: 78, w: 70, h: 40 }, { x: 268, y: 30, w: 70, h: 40 }],
        fichas: ['3', '2', '1', '5', '−1'], meta: ['3', '2', '1'], alto: 152,
        fondo: K => [['x − y + z = 2', 'x ='], ['2y + z = 7', 'y ='], ['z = 3', 'z =']].map(([e, s], i) => K.t(14, 35 + i * 48, e, '', 'start') + K.t(226, 35 + i * 48, s, 'ta', 'end')).join('') },
        '$z = 3$; $2y + 3 = 7$ da $y = 2$; $x - 2 + 3 = 2$ da $x = 1$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En una panadería, 3 panes y 2 jugos cuestan 12 mil, y 1 pan y 2 jugos, 8 mil. Ajusta los dos **precios** (en miles).', { dib: pan, v: { p: 5, j: 1 }, metas: { p: 2, j: 3 }, alto: 290,
        manijas: [{ k: 'p', min: 0, max: 6, paso: 1, et: 'pan' }, { k: 'j', min: 0, max: 6, paso: 1, et: 'jugo' }],
        lee: v => `$3 \\cdot ${v.p} + 2 \\cdot ${v.j} = ${3 * v.p + 2 * v.j}$ y $${v.p} + 2 \\cdot ${v.j} = ${v.p + 2 * v.j}$`,
        dice: v => { const a = 3 * v.p + 2 * v.j === 12, b = v.p + 2 * v.j === 8; return a && b ? 'Los dos recibos cuadran: es el punto común de las dos rectas.' : a ? 'El primer recibo cuadra; el segundo no.' : b ? 'El segundo recibo cuadra; el primero no.' : 'Ninguno de los dos recibos cuadra todavía.'; } },
        'Restando los recibos: $2p = 4$, $p = 2$ mil; y $2 + 2j = 8$, $j = 3$ mil.')],
  ], 'Cada ecuación es una recta o un plano; resolver es hallar lo común, y eliminar o sustituir es el camino para llegar.');
}
;
//#archivo js/explora-gva-2.js
// Geometría Vectorial · explicación de geo-2 «El conjunto Rⁿ y el álgebra matricial» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(Math.round(n)).replace('-', '−');
  const par = q => `(${q.map(sg).join(', ')})`;
  const k = v => Math.round(v.k);
  // Matriz con corchetes centrada en (cx, cy); cls(i, j) da la clase de cada entrada.
  const mat = (K, cx, cy, M, { dx = 26, dy = 22, cls = () => '' } = {}) => {
    const n = M[0].length, w = (n - 1) * dx + 24, h = (M.length - 1) * dy + 24, x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
    return K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]])
      + M.map((r, i) => r.map((v, j) => K.t(x0 + 12 + j * dx, y0 + 17 + i * dy, typeof v === 'number' ? sg(v) : v, cls(i, j))).join('')).join('');
  };
  const corch = (K, x0, x1, y0, y1) => K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]]);
  // Plano cuadriculado con origen O y u píxeles por unidad.
  const rej = (K, O, u, [x0, x1], [y0, y1]) => {
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(O[0] + x * u, O[1] - y0 * u, O[0] + x * u, O[1] - y1 * u, x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(O[0] + x0 * u, O[1] - y * u, O[0] + x1 * u, O[1] - y * u, y ? 'ls' : 'lm');
    return h;
  };
  const dentro = (x, y, H) => x > 14 && x < 326 && y > 14 && y < H - 4;

  // ---------------------------------------------------------------- capítulo 1: listas, suma y escalar
  const O1 = [160, 110], P1 = (X, Y) => [O1[0] + 20 * X, O1[1] - 20 * Y];
  const lista = (v, K) => {
    const A = [3 * v.e, 2 * v.e], B = [v.bx, v.by], a = P1(...A), c = [O1[0] + (a[0] - O1[0]) * v.cola, O1[1] + (a[1] - O1[1]) * v.cola], b = [c[0] + 20 * B[0], c[1] - 20 * B[1]];
    let p = rej(K, O1, 20, [-6, 7], [-4, 5]);
    if (v.pt > 0) p += K.f(v.pt, K.c(...a, 5, 'fA') + (dentro(a[0] + 8, a[1] - 10, 204) ? K.t(a[0] + (A[0] < 0 ? -10 : 8), a[1] - 10, par(A), 's ta', A[0] < 0 ? 'end' : 'start') : ''));
    if (v.fl > 0) p += K.f(v.fl, K.ar(...O1, ...a, 'la gr'));
    if (Math.hypot(...B) > 0.1) { const m = [(c[0] + b[0]) / 2 + 10, (c[1] + b[1]) / 2 + 4]; p += K.ar(...c, ...b, 'lg gr') + (dentro(...m, 204) ? K.t(...m, par(B), 's tg', 'start') : ''); }
    if (v.su > 0) { const s = P1(A[0] + B[0], A[1] + B[1]); p += K.f(v.su, K.ar(...O1, ...s, 'lo gr') + K.t(s[0] + 8, s[1] + 16, par([A[0] + B[0], A[1] + B[1]]), 's to', 'start')); }
    if (v.e !== 1 && v.fl > 0) p += K.t(332, 200, `${sg(v.e)}·(3, 2)`, 's ta', 'end');
    // R³: una caja con la esquina en (2, 1, 3).
    const o = [150, 168], I = (x, y, z) => K.iso(o, 26, x, y, z), q = I(2, 1, 3);
    const r3 = K.l(...I(0, 0, 0), ...I(4, 0, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 3, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 0, 5.4), 'lm')
      + K.t(...I(4.4, 0, 0), 'x', 's tm') + K.t(...I(0, 3.4, 0), 'y', 's tm') + K.t(I(0, 0, 5.6)[0], I(0, 0, 5.6)[1], 'z', 's tm')
      + K.pl([I(2, 0, 0), I(2, 1, 0), I(0, 1, 0)], 'lm d') + K.l(...I(2, 1, 0), ...q, 'lm d') + K.ar(...I(0, 0, 0), ...q, 'la gr') + K.c(...q, 5, 'fA') + K.t(q[0] + 10, q[1] - 6, '(2, 1, 3)', 's ta', 'start');
    return K.f(1 - v.r3, p) + K.f(v.r3, r3);
  };
  // Práctica: la punta de la flecha.
  const punta = (v, K) => {
    const u = P1(2, -1), w = P1(1, 2), t = P1(v.x, v.y);
    return rej(K, O1, 20, [-6, 7], [-4, 5]) + K.ar(...O1, ...u, 'lg') + K.t(u[0] + 8, u[1] + 14, '(2, −1)', 's tg', 'start') + K.ar(...O1, ...w, 'lf') + K.t(w[0] - 8, w[1] - 6, '(1, 2)', 's tf', 'end')
      + K.ar(...O1, ...t, 'la gr') + K.t(332, 18, `punta en ${par([v.x, v.y])}`, 's ta', 'end');
  };

  // ---------------------------------------------------------------- capítulo 2: combinaciones lineales
  const O2 = [160, 130], P2 = (X, Y) => [O2[0] + 18 * X, O2[1] - 18 * Y];
  const combina = (u, w, T) => (v, K) => {
    const A = [v.a * u[0], v.a * u[1]], B = [v.b * w[0], v.b * w[1]], S = [A[0] + B[0], A[1] + B[1]], a = P2(...A), c = [O2[0] + (a[0] - O2[0]) * v.cola, O2[1] + (a[1] - O2[1]) * v.cola];
    let h = rej(K, O2, 18, [-7, 8], [-3, 6]);
    if (T) { const t = P2(...T); h += K.r(t[0] - 7, t[1] - 7, 14, 14, 'fg', 2); }
    h += K.ar(...O2, ...P2(...u), 'lm') + K.ar(...O2, ...P2(...w), 'lm') + K.ar(...O2, ...a, 'la gr') + K.ar(...c, c[0] + 18 * B[0], c[1] - 18 * B[1], 'lf gr');
    if (v.su > 0) h += K.f(v.su, K.ar(...O2, ...P2(...S), 'lo gr') + K.c(...P2(...S), 4, 'fo'));
    h = `<svg x="0" y="0" width="340" height="196" viewBox="0 0 340 196">${h}</svg>`;
    return h + K.t(8, 16, `${sg(v.a)}·u = ${par(A)}`, 's ta', 'start') + K.t(332, 16, `${sg(v.b)}·v = ${par(B)}`, 's tf', 'end') + (v.su > 0 ? K.t(332, 188, `suma: ${par(S)}`, 's to', 'end') : '');
  };

  // ---------------------------------------------------------------- capítulo 3: matrices, filas y columnas
  const A3 = [[2, 1, 0], [1, 3, 4]], X3 = [1, 2, 1];
  const tabla = (v, K) => {
    const q = k(v), cx = 120, cy = 62, dx = 36, dy = 28, x0 = cx - (2 * dx + 24) / 2, y0 = cy - (dy + 24) / 2, cxj = j => x0 + 12 + j * dx, cyi = i => y0 + 12 + i * dy;
    const cls = (i, j) => (q === 1 && i === 1 && j === 2 ? 'ta' : q === 3 && i === 0 ? 'ta' : '');
    let h = mat(K, cx, cy, A3, { dx, dy, cls }) + K.t(cx, 18, 'A', 'ta');
    if (q === 0) h += K.t(250, 50, '2 filas', 's') + K.t(250, 72, '3 columnas', 's') + K.t(170, 128, 'una matriz 2 × 3: filas primero', 's tm');
    if (q === 1) h += K.r(x0 - 4, cyi(1) - 12, 2 * dx + 32, 24, 'fn') + K.r(cxj(2) - 14, y0 - 4, 28, dy + 32, 'fn') + K.c(cxj(2), cyi(1), 13, 'fn') + K.t(170, 128, 'fila 2, columna 3: a₂₃ = 4', 's ta');
    if (q >= 2) h += K.t(222, 67, '·') + mat(K, 250, 62, X3.map(n => [n]), { dy: 20, cls: () => 'tg' }) + K.t(250, 18, 'x', 'tg');
    if (q === 2) h += [0, 1, 2].map(j => K.r(cxj(j) - 13, y0 - 2, 26, dy + 28, 'fn')).join('') + K.t(170, 128, '1·(2, 1) + 2·(1, 3) + 1·(0, 4) = (4, 11)', 's') + K.t(170, 154, 'cada número de x pesa su columna', 's tm');
    if (q === 3) h += K.t(170, 128, 'fila 1: 2·1 + 1·2 + 0·1 = 4', 's ta') + K.t(170, 154, 'fila 2: 1·1 + 3·2 + 4·1 = 11', 's');
    if (q === 4) h += K.t(170, 128, '2x₁ + x₂ = 4', 's') + K.t(170, 150, 'x₁ + 3x₂ + 4x₃ = 11', 's') + K.t(170, 180, 'las dos juntas: A·x = b, con b = (4, 11)', 's ta');
    return h;
  };

  // ---------------------------------------------------------------- capítulo 4: el producto AB
  const A4 = [[1, 2], [3, 1]], B4 = [[2, 0, 1], [1, 1, 3]], AB4 = [[4, 2, 7], [7, 1, 6]];
  const producto = (v, K) => {
    const q = k(v), hiA = q === 1 ? 0 : q === 2 ? 1 : -1, hiB = q === 1 ? 0 : q === 2 ? 2 : -1;
    const ver = (i, j) => q >= 3 || (q >= 1 && i === 0 && j === 0) || (q >= 2 && i === 1 && j === 2);
    let h = K.t(60, 18, 'A: 2 × 2', 's tm') + K.t(165, 18, 'B: 2 × 3', 's tm') + K.t(280, 18, 'AB: 2 × 3', 's tm');
    h += mat(K, 60, 56, A4, { cls: i => (i === hiA ? 'ta' : '') }) + mat(K, 165, 56, B4, { cls: (i, j) => (j === hiB ? 'tf' : '') }) + K.t(222, 61, '=');
    h += mat(K, 280, 56, AB4.map((r, i) => r.map((x, j) => (ver(i, j) ? x : '·'))), { cls: (i, j) => ((q === 1 && !i && !j) || (q === 2 && i === 1 && j === 2) ? 'to' : '') });
    if (q === 1) h += K.t(170, 124, 'fila 1 por columna 1: 1·2 + 2·1 = 4', 's');
    if (q === 2) h += K.t(170, 124, 'fila 2 por columna 3: 3·1 + 1·3 = 6', 's');
    if (q === 3) h += K.t(170, 124, '(2 × 2)(2 × 3) = 2 × 3', 'ta') + K.t(170, 150, 'adentro iguales; afuera, el tamaño', 's tm');
    if (q === 4) h += K.t(170, 124, 'BA: (2 × 3)(2 × 2)', 'ta') + K.t(170, 150, '3 no es 2: BA no existe', 's tf');
    if (q === 5) h += K.t(120, 136, 'I =', '', 'end') + mat(K, 152, 132, [[1, 0], [0, 1]], { cls: (i, j) => (i === j ? 'to' : 'tm') }) + K.t(196, 136, 'A·I = I·A = A', 's ta', 'start');
    return h;
  };

  // ---------------------------------------------------------------- fondos de las prácticas con fichas
  const fondoBx = K => K.t(56, 56, 'B =', '', 'end') + mat(K, 90, 52, [[1, 2], [3, 0]]) + K.t(184, 56, 'x =', '', 'end') + mat(K, 210, 52, [[2], [1]])
    + K.t(130, 135, 'B·x =', '', 'end') + corch(K, 140, 200, 88, 172);
  const caja = (K, x, y, m, n, et) => {
    let h = K.r(x, y, n * 10, m * 10, 'fa', 2);
    for (let i = 1; i < m; i++) h += K.l(x, y + i * 10, x + n * 10, y + i * 10, 'lr');
    for (let j = 1; j < n; j++) h += K.l(x + j * 10, y, x + j * 10, y + m * 10, 'lr');
    return h + K.t(x + n * 5, y - 8, et, 's');
  };
  const fondoCD = K => caja(K, 50, 30, 3, 2, 'C: 3 × 2') + caja(K, 150, 40, 2, 5, 'D: 2 × 5') + K.t(60, 125, 'CD:', '', 'end') + K.t(60, 175, 'DC:', '', 'end');
  const fondoPan = K => K.t(130, 16, 'harina', 's tm') + K.t(166, 16, 'queso', 's tm') + K.t(8, 46, 'arepa', 's', 'start') + K.t(8, 70, 'empanada', 's', 'start')
    + mat(K, 148, 52, [[2, 1], [3, 0]], { dx: 36, dy: 24 }) + K.t(196, 57, '·') + mat(K, 226, 52, [[2], [5]], { dy: 24, cls: () => 'tg' }) + K.t(270, 46, 'precio', 's tm', 'start')
    + K.t(130, 140, 'costo =', '', 'end') + corch(K, 140, 200, 96, 180);

  xpLec('geo-2', [
    ['Listas de números',
      xpMira('dibujo', 'Un vector de $\\mathbb{R}^n$ es solo una **lista de n números**. Con dos números se dibuja en el plano.', { dib: lista, v: { pt: 0, fl: 0, e: 1, bx: 0, by: 0, cola: 0, su: 0, r3: 0 }, alto: 204 }, [
        ['La lista (3, 2) es un punto del plano: 3 a la derecha y 2 arriba. Las listas de dos forman R².', { pt: 1 }],
        ['La misma lista se dibuja como una flecha que sale del origen. Punto o flecha: es el mismo vector.', { fl: 1 }],
        ['(3, 2) + (1, −3) suma componente con componente: (4, −1). La segunda flecha sale de la punta de la primera.', { bx: 1, by: -3, cola: 1, su: 1 }],
        ['Un número estira: 2·(3, 2) = (6, 4). Cada componente se multiplica por 2 y la flecha no gira.', { bx: 0, by: 0, cola: 0, su: 0, e: 2 }],
        ['Por −1 la flecha da media vuelta: −(3, 2) = (−3, −2). Restar es sumar el opuesto.', { e: -1 }],
        ['Con tres números, (2, 1, 3), se llega a un punto del espacio: R³. Con n números, Rⁿ, aunque no se dibuje.', { r3: 1 }],
      ], 'Un vector de Rⁿ es una lista de n números; se suma y se estira componente a componente.'),
      xpHaz('dibujo', 'Arrastra la punta de la flecha hasta $(2, -1) + 2 \\cdot (1, 2)$.', { dib: punta, v: { x: -2, y: 1 }, metas: { x: 4, y: 3 }, alto: 204,
        manijas: [{ k: ['x', 'y'], min: [-6, -4], max: [7, 5], paso: 1, en: v => P1(v.x, v.y), de: (x, y) => [(x - O1[0]) / 20, (O1[1] - y) / 20] }],
        lee: v => `$${par([v.x, v.y]).replace(/−/g, '-')}$`, dice: () => 'Primero 2·(1, 2) = (2, 4); después súmale (2, −1) componente a componente.' },
      '$(2, -1) + (2, 4) = (2 + 2,\\; -1 + 4) = (4, 3)$.')],
    ['Combinar dos flechas',
      xpMira('dibujo', 'Con dos flechas y dos números se llega a muchos puntos: eso es una **combinación lineal**.', { dib: combina([3, 1], [1, 2]), v: { a: 1, b: 1, cola: 0, su: 0 }, alto: 196 }, [
        ['Dos flechas fijas: u = (3, 1) y v = (1, 2). ¿A qué puntos se llega usando solo esas dos direcciones?', {}],
        ['Cada una se estira: 1·u queda igual y 2·v se alarga al doble. Los números a y b dicen cuánto.', { b: 2 }],
        ['Ahora 2·v se pone en la punta de u, como dos tramos de un viaje.', { cola: 1 }],
        ['El viaje termina en 1·(3, 1) + 2·(1, 2) = (5, 5). Eso es una combinación lineal de u y v.', { su: 1 }],
        ['Por componentes es un sistema: 3a + b = 5, a + 2b = 5. Hallar a y b da el camino.', {}],
        ['Con a = −1 se recorre u hacia atrás: −1·(3, 1) + 2·(1, 2) = (−1, 3). Los negativos también valen.', { a: -1 }],
      ], 'a·u + b·v estira las dos flechas y las pone en fila; por componentes es un sistema en a y b.'),
      xpHaz('dibujo', 'Con $\\vec u = (1, 1)$ y $\\vec v = (-1, 2)$, mueve $a$ y $b$ hasta llegar al cuadro en $(-1, 5)$.', { dib: combina([1, 1], [-1, 2], [-1, 5]), v: { a: 0, b: 0, cola: 1, su: 1 }, metas: { a: 1, b: 2 }, alto: 290,
        manijas: [{ k: 'a', min: -3, max: 3, paso: 1, et: 'a' }, { k: 'b', min: -3, max: 3, paso: 1, et: 'b' }],
        lee: v => `$${v.a}\\,\\vec u + ${v.b < 0 ? `(${v.b})` : v.b}\\,\\vec v = (${v.a - v.b}, ${v.a + 2 * v.b})$`, dice: () => 'La primera componente da a − b = −1 y la segunda, a + 2b = 5.' },
      '$1 \\cdot (1, 1) + 2 \\cdot (-1, 2) = (-1, 5)$: combinar es estirar cada flecha y ponerlas en fila.')],
    ['Matrices: filas y columnas',
      xpMira('dibujo', 'Una **matriz** es una tabla de números. Multiplicada por un vector, combina sus columnas.', { dib: tabla, v: { k: 0 }, alto: 200 }, [
        ['Esta tabla tiene 2 filas y 3 columnas: es una matriz 2 × 3. Siempre se dicen primero las filas.', {}],
        ['Cada número tiene su dirección, fila y columna. En la fila 2, columna 3, está a₂₃ = 4.', { k: 1 }],
        ['Una matriz por un vector combina sus columnas: x = (1, 2, 1) dice cuánto tomar de cada una. Da (4, 11).', { k: 2 }],
        ['También por filas: cada fila por x, pareja por pareja, y se suma. La fila 1 da 4; la fila 2, 11.', { k: 3 }],
        ['Y al revés: dos ecuaciones con x₁, x₂ y x₃ caben en una sola, A·x = b. A guarda los coeficientes.', { k: 4 }],
      ], 'Una matriz m × n tiene m filas y n columnas; A·x combina sus columnas, y cada componente es una fila por x.'),
      xpHaz('fichas', 'Completa $B\\vec x$ con $\\vec x = (2, 1)$: dos veces la primera columna más una vez la segunda.', {
        slots: [{ x: 170, y: 110, w: 50, h: 36 }, { x: 170, y: 150, w: 50, h: 36 }], alto: 182, fondo: fondoBx,
        fichas: ['5', '4', '7', '6'], meta: ['4', '6'], pista: 'Las columnas de B son (1, 3) y (2, 0): toma la primera dos veces y súmale la segunda.' },
      '$2 \\cdot (1, 3) + 1 \\cdot (2, 0) = (4, 6)$: el vector dice cuánto de cada columna.')],
    ['El producto AB',
      xpMira('dibujo', 'Dos matrices se multiplican **fila por columna**, y solo si sus medidas encajan.', { dib: producto, v: { k: 0 }, alto: 170 }, [
        ['Para multiplicar A por B, cada fila de A se cruza con cada columna de B: así sale cada casilla de AB.', {}],
        ['Casilla (1, 1): la fila 1 de A por la columna 1 de B, pareja por pareja: 1·2 + 2·1 = 4.', { k: 1 }],
        ['Casilla (2, 3): la fila 2 por la columna 3: 3·1 + 1·3 = 6. Así se llenan las seis casillas.', { k: 2 }],
        ['Medidas: (2 × 2)(2 × 3) = 2 × 3. Las de adentro deben coincidir; las de afuera dan el tamaño.', { k: 3 }],
        ['BA sería (2 × 3)(2 × 2): 3 no es 2 y no existe. El orden importa: en general AB ≠ BA.', { k: 4 }],
        ['La identidad I tiene unos en la diagonal y ceros fuera. No cambia nada: A·I = I·A = A.', { k: 5 }],
      ], 'La casilla (i, j) de AB es la fila i de A por la columna j de B; (m × n)(n × p) = m × p.'),
      xpHaz('fichas', 'C es 3 × 2 y D es 2 × 5. ¿Qué tamaño tiene CD? ¿Y DC?', {
        slots: [{ x: 130, y: 120, w: 100, h: 38 }, { x: 130, y: 170, w: 100, h: 38 }], alto: 196, fondo: fondoCD,
        fichas: ['2 × 2', 'no existe', '5 × 3', '3 × 5'], meta: ['3 × 5', 'no existe'], pista: 'Escribe las medidas una junto a la otra: las de adentro deben coincidir y las de afuera dan el tamaño.' },
      'CD: $(3 \\times 2)(2 \\times 5) = 3 \\times 5$. DC: $(2 \\times 5)(3 \\times 2)$, y 5 no es 3: no existe.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una arepa lleva 2 de harina y 1 de queso; una empanada, 3 de harina y nada de queso. La harina vale 2 y el queso 5 (miles). Completa el costo de cada una.', {
        slots: [{ x: 170, y: 118, w: 50, h: 36 }, { x: 170, y: 158, w: 50, h: 36 }], alto: 190, fondo: fondoPan,
        fichas: ['7', '9', '15', '6', '11'], meta: ['9', '6'], pista: 'Cada costo es una fila de la tabla por los precios: harina por su precio más queso por el suyo.' },
      '$(2 \\cdot 2 + 1 \\cdot 5,\\; 3 \\cdot 2 + 0 \\cdot 5) = (9, 6)$: cada fila por los precios.')],
  ], 'Rⁿ son listas que se suman y se estiran; una matriz combina columnas, y AB se arma fila por columna si las medidas encajan.');
}
;
//#archivo js/explora-gva-3.js
// Geometría Vectorial · explicación de geo-3 «Transpuesta, sistemas m×n y tipos de solución» (spec
// 2026-11-27-curso-geometria-vectorial). Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  const R = Math.round;
  // Matriz con corchetes; txt(i, j, e) da el texto y cls(i, j) la clase. bar: columna tras la que va la raya.
  const mat = (K, x, y, M, o = {}) => {
    const cw = o.cw || 46, rh = o.rh || 34, w = M[0].length * cw + 8, h = M.length * rh;
    let s = K.pl([[x + 6, y], [x, y], [x, y + h], [x + 6, y + h]]) + K.pl([[x + w - 6, y], [x + w, y], [x + w, y + h], [x + w - 6, y + h]]);
    if (o.bar != null) s += K.l(x + 4 + cw * (o.bar + 1), y + 3, x + 4 + cw * (o.bar + 1), y + h - 3, 'lm');
    M.forEach((r, i) => r.forEach((e, j) => { s += K.t(x + 4 + cw * (j + 0.5), y + rh * (i + 0.5) + 5, typeof e === 'string' ? e : sg(e), o.cls ? o.cls(i, j) : ''); }));
    return s;
  };
  const cab = (K, x, cw, y, et) => et.map((t, j) => K.t(x + 4 + cw * (j + 0.5), y, t, 's tm')).join('');

  // --------------------------------------------------------------------------- 1. la transpuesta
  const A = [[3, 1, 7], [5, 0, 2]], S = [[2, 6, -1], [6, 5, 3], [-1, 3, 1]];
  const voltea = (v, K) => {
    const X = 113, Y = 40, u = 38;
    let h = K.f(v.d, K.l(X, Y, X + 3 * u, Y + 3 * u, 'lm d'));
    if (v.sym > 0.5) {
      h += mat(K, X - 4, Y, S, { cw: u, rh: u, cls: (i, j) => (i === j ? '' : i < j ? 'ta' : 'tg') });
      return h + K.t(170, 22, 'simétrica: Sᵀ = S', 'ta') + K.f(v.pr, K.t(170, 182, '(A + B)ᵀ = Aᵀ + Bᵀ      (AB)ᵀ = BᵀAᵀ', 's'));
    }
    const t = v.t, c = 3 + (2 - 3) * t, f = 2 + (3 - 2) * t;
    h += K.pl([[X + 6, Y], [X, Y], [X, Y + f * u], [X + 6, Y + f * u]]) + K.pl([[X + c * u - 6, Y], [X + c * u, Y], [X + c * u, Y + f * u], [X + c * u - 6, Y + f * u]]);
    A.forEach((r, i) => r.forEach((e, j) => {
      const x = X + u * ((j + 0.5) + ((i + 0.5) - (j + 0.5)) * t), y = Y + u * ((i + 0.5) + ((j + 0.5) - (i + 0.5)) * t);
      h += K.t(x, y + 5, sg(e), i ? 'tg' : 'ta');
    }));
    const tag = v.lab > 0.5 ? (t > 0.5 ? 'Aᵀ: 3 × 2' : 'A: 2 × 3, otra vez') : 'A: 2 × 3';
    return h + K.t(170, 22, tag, 'b') + K.f(v.lab, K.t(300, 120, '(i, j) → (j, i)', 's tm', 'end'));
  };
  // Simétrica con tres casillas por llenar.
  const SIM = [[2, 6, -1], ['', 5, 3], ['', '', 1]];
  const simFondo = K => K.l(90, 20, 258, 158, 'lm d') + mat(K, 86, 20, SIM, { cw: 56, rh: 46 });

  // --------------------------------------------------------------------------- 2. aumentada y operaciones
  const PASOS = [
    null,
    [[1, -1, 2, 5], [2, 1, 1, 7], [-1, 2, 3, 6]],
    [[1, -1, 2, 5], [0, 3, -3, -3], [-1, 2, 3, 6]],
    [[1, -1, 2, 5], [0, 3, -3, -3], [0, 1, 5, 11]],
    [[1, -1, 2, 5], [0, 1, 5, 11], [0, 3, -3, -3]],
    [[1, -1, 2, 5], [0, 1, 5, 11], [0, 1, -1, -1]],
  ];
  const OPS = ['', 'la matriz aumentada', 'F₂ → F₂ − 2F₁', 'F₃ → F₃ + F₁', 'F₂ ↔ F₃', 'F₃ → ⅓F₃'];
  const CAMBIA = [[], [], [1], [2], [1, 2], [2]];
  const aumentada = (v, K) => {
    const k = R(v.k);
    if (!k) return ['x − y + 2z = 5', '2x + y + z = 7', '−x + 2y + 3z = 6'].map((t, i) => K.t(170, 66 + i * 34, t)).join('') + K.t(170, 22, 'tres ecuaciones, tres incógnitas', 's tm');
    let h = K.t(170, 22, OPS[k], k > 1 ? 'ta' : 'tm');
    CAMBIA[k].forEach(i => { h += K.r(70, 44 + i * 34, 184, 34, 'fn', 4); });
    return h + mat(K, 66, 44, PASOS[k], { bar: 2 }) + cab(K, 66, 46, 38, ['x', 'y', 'z', 'c']);
  };
  // Tu turno: F₂ + k·F₁ deja un 0 debajo del 3.
  const anula = (v, K) => {
    const F1 = [3, -1, 4], F2 = [-6, 5, 1], N = F2.map((e, j) => e + v.k * F1[j]);
    return K.c(96, 47, 15, 'fn') + K.c(96, 81, 15, N[0] === 0 ? 'fo' : 'ff') + mat(K, 70, 30, [F1, N], { cw: 52, bar: 1 })
      + K.t(240, 52, 'F₁', 's tm', 'start') + K.t(240, 86, `F₂ ${v.k < 0 ? '−' : '+'} ${Math.abs(v.k)}·F₁`, 's ta', 'start');
  };

  // --------------------------------------------------------------------------- 3. escalera de pivotes
  const ESC = [[2, 4, -2, 6], [0, 3, 6, -3], [0, 0, 0, 0]], RED = [[1, 0, -5, 5], [0, 1, 2, -1], [0, 0, 0, 0]];
  const escalera = (v, K) => {
    const k = R(v.k), X = 66, Y = 34, cw = 50, rh = 34, M = k >= 3 ? RED : ESC, c = (i, j) => [X + 4 + cw * (j + 0.5), Y + rh * (i + 0.5)];
    let h = cab(K, X, cw, 26, ['x', 'y', 'z', 'c']);
    if (k >= 1) h += K.c(...c(0, 0), 15, 'fo') + K.c(...c(1, 1), 15, 'fo') + K.pl([[X + 4, Y + rh], [X + 4 + cw, Y + rh], [X + 4 + cw, Y + 2 * rh], [X + 4 + 3 * cw, Y + 2 * rh]], 'la d');
    if (k === 2) h += K.r(X + 4, Y + 2 * rh, 4 * cw, rh, 'fn', 4);
    if (k >= 4) h += K.r(X + 4 + 2 * cw + 4, Y + 2, cw - 8, 3 * rh - 4, 'fn', 6);
    h += mat(K, X, Y, M, { cw, rh, bar: 2 });
    const pie = ['', 'pivotes: 2 y 3', 'forma escalonada', 'forma escalonada reducida', 'z sin pivote: z = t, libre', 'x = 5 + 5t     y = −1 − 2t     z = t'][k];
    return h + K.t(170, 166, pie, k >= 4 ? 'ta' : 's tm');
  };
  const PL = [[2, -1, 3, 0, 1], [0, 0, 1, 4, 2], [0, 0, 0, 5, 5]], XC = [52, 114, 176, 238, 298];
  const plFondo = K => {
    let h = K.pl([[26, 22], [20, 22], [20, 106], [26, 106]]) + K.pl([[318, 22], [324, 22], [324, 106], [318, 106]]) + K.l(268, 25, 268, 103, 'lm');
    PL.forEach((r, i) => r.forEach((e, j) => { h += K.t(XC[j], 22 + 28 * (i + 0.5) + 5, sg(e)); }));
    return h + ['x₁', 'x₂', 'x₃', 'x₄'].map((t, j) => K.t(XC[j], 14, t, 's tm')).join('');
  };

  // --------------------------------------------------------------------------- 4. leer el tipo
  const TOP = [[1, 2, -1, 4], [0, 1, 3, 5]];
  const ULT = [[0, 0, 2, 6], [0, 0, 0, 4], [0, 0, 0, 0], [0, 0, 'k − 1', 'k + 2']];
  const DICE = [['2z = 6: z = 3, y luego y, x', 'solución única'], ['0 = 4: imposible', 'ninguna solución'], ['0 = 0: z queda libre, z = t', 'infinitas soluciones'], ['depende de k', '']];
  const tipo = (v, K) => {
    const c = R(v.c), X = 66, Y = 30, cw = 50, rh = 34;
    let h = K.r(X + 4, Y + 2 * rh, 4 * cw, rh, c === 1 ? 'ff' : c === 2 ? 'fn' : 'fo', 4);
    h += mat(K, X, Y, [...TOP, ULT[c]], { cw, rh, bar: 2 }) + cab(K, X, cw, 22, ['x', 'y', 'z', 'c']);
    const [a, b] = c === 3 && v.k > 0.5 ? ['k ≠ 1: única     k = 1: 0 = 3, ninguna', ''] : DICE[c];
    return h + K.t(170, 158, a, 's') + K.t(170, 180, b, 'ta');
  };
  const tipoK = (v, K) => {
    const X = 66, Y = 24, cw = 50, rh = 34, a = v.k + 3, b = v.k - 2;
    return K.r(X + 4, Y + 2 * rh, 4 * cw, rh, 'fn', 4) + mat(K, X, Y, [[1, -2, 1, 0], [0, 1, 4, 2], [0, 0, a, b]], { cw, rh, bar: 2 }) + cab(K, X, cw, 16, ['x', 'y', 'z', 'c']);
  };

  // --------------------------------------------------------------------------- 5. el problema: una mezcla con un parámetro
  const mezcla = (v, K) => {
    const x = [8 - 2 * v.t, 2 + v.t, v.t], cls = ['fa', 'fg', 'fo'];
    return x.map((n, i) => K.t(30, 46 + i * 36, `x${'₁₂₃'[i]}`, 's', 'end') + K.r(40, 32 + i * 36, Math.max(0, n) * 26, 22, cls[i], 4) + K.t(Math.max(0, n) * 26 + 48, 48 + i * 36, `${n} bolsas`, 's', 'start')).join('')
      + K.t(170, 18, `t = ${v.t}`, 's tm');
  };

  xpLec('geo-3', [
    ['Voltear una matriz',
      xpMira('dibujo', 'Primera idea: la **transpuesta** voltea la matriz sobre su diagonal.', { dib: voltea, v: { t: 0, d: 0, lab: 0, sym: 0, pr: 0 }, alto: 196 }, [
        ['Esta tabla A tiene 2 filas y 3 columnas: es de 2 × 3. Cada fila, una tienda; cada columna, un día.', {}],
        ['Transponer es voltearla sobre su diagonal, la línea que baja desde la esquina de arriba a la izquierda.', { d: 1 }],
        ['La fila 1 cae como columna 1; la fila 2, como columna 2. La entrada (i, j) pasa al lugar (j, i).', { t: 1 }],
        ['Así nace la transpuesta Aᵀ, de 3 × 2. Si se voltea otra vez, vuelve A: (Aᵀ)ᵀ = A.', { lab: 1 }],
        ['Hay matrices que no cambian al voltearlas: las simétricas, con Sᵀ = S. Cada número copia a su reflejo.', { t: 0, sym: 1 }],
        ['Dos reglas más: (A + B)ᵀ = Aᵀ + Bᵀ. Y al voltear un producto, el orden se invierte: (AB)ᵀ = BᵀAᵀ.', { pr: 1 }],
      ], 'La transpuesta cambia filas por columnas; una simétrica es igual a su transpuesta, y (AB)ᵀ = BᵀAᵀ.'),
      xpHaz('fichas', 'Completa la matriz para que sea **simétrica**: cada casilla vacía copia a su reflejo en la diagonal.', {
        slots: [{ x: 118, y: 89, w: 46, h: 38 }, { x: 118, y: 135, w: 46, h: 38 }, { x: 174, y: 135, w: 46, h: 38 }], alto: 166, fondo: simFondo,
        fichas: ['3', '−6', '6', '1', '−1'], meta: ['6', '−1', '3'], pista: 'La casilla (2, 1) copia a la (1, 2); la (3, 1), a la (1, 3); la (3, 2), a la (2, 3).' },
      'En una simétrica, la casilla (i, j) vale lo mismo que la (j, i).')],
    ['Filas que se operan',
      xpMira('dibujo', 'Segunda idea: un sistema se guarda en una **matriz aumentada** y se trabaja por filas.', { dib: aumentada, v: { k: 0 }, alto: 158 }, [
        ['Tres ecuaciones con tres incógnitas. Para resolverlas, solo importan los números.', {}],
        ['En la matriz aumentada va una fila por ecuación y, tras la raya, las constantes.', { k: 1 }],
        ['Primera operación: sumar a una fila k veces otra. F₂ − 2F₁ deja un 0 debajo del primer 1.', { k: 2 }],
        ['Lo mismo abajo con F₃ + F₁. Es sumar dos ecuaciones: las soluciones no cambian.', { k: 3 }],
        ['Segunda: intercambiar dos filas. Es solo escribir las ecuaciones en otro orden.', { k: 4 }],
        ['Tercera: multiplicar una fila por k ≠ 0, aquí por ⅓. Con k = 0 se perdería una ecuación.', { k: 5 }],
      ], 'Intercambiar filas, multiplicar una por k ≠ 0 y sumarle k veces otra no cambian las soluciones.'),
      xpHaz('dibujo', 'Mueve k para que **F₂ + k·F₁** deje un 0 debajo del 3.', { dib: anula, v: { k: 0 }, metas: { k: 2 }, alto: 170,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }], lee: v => `$-6 + ${v.k < 0 ? `(${v.k})` : v.k} \\cdot 3 = ${-6 + 3 * v.k}$` },
      'Para anular −6 con el 3 de arriba hacen falta 2 veces: $-6 + 2 \\cdot 3 = 0$.')],
    ['La escalera de pivotes',
      xpMira('dibujo', 'Tercera idea: con esas operaciones la matriz queda en **escalera**.', { dib: escalera, v: { k: 0 }, alto: 180 }, [
        ['El pivote de una fila es su primer número distinto de cero.', {}],
        ['Aquí los pivotes son el 2 y el 3. Cada uno va más a la derecha que el de arriba; debajo, ceros.', { k: 1 }],
        ['La fila de ceros va al fondo. Así se ve la forma escalonada.', { k: 2 }],
        ['En la reducida cada pivote se vuelve 1 y también hay ceros encima de él.', { k: 3 }],
        ['La columna de z no tiene pivote: z es libre. Puede valer cualquier número; se le llama t.', { k: 4 }],
        ['Las demás se despejan con t. Cada valor de t da una solución distinta.', { k: 5 }],
      ], 'Pivote: primer número distinto de cero de su fila. Columna con pivote se despeja; sin pivote, queda libre.'),
      xpHaz('fichas', 'Rotula cada columna de esta escalonada: ¿tiene **pivote** o su variable queda **libre**?', {
        slots: XC.slice(0, 4).map(x => ({ x, y: 136, w: 60, h: 34 })), alto: 160, fondo: plFondo,
        fichas: ['pivote', 'libre', 'pivote', 'libre', 'pivote'], meta: ['pivote', 'libre', 'pivote', 'pivote'], pista: 'Fila por fila, busca el primer número distinto de cero: esa columna tiene pivote.' },
      'Los pivotes son el 2, el 1 y el 5: x₂ es la única libre.')],
    ['Una, ninguna o infinitas',
      xpMira('dibujo', 'Cuarta idea: la escalonada dice **cuántas soluciones** hay.', { dib: tipo, v: { c: 0, k: 0 }, alto: 192 }, [
        ['Si la última fila dice 2z = 6, sale z = 3 y, subiendo, y y x. Un pivote por incógnita: única.', {}],
        ['Si queda 0 0 0 | 4, esa fila dice 0 = 4. Ningún número lo cumple: el sistema no tiene solución.', { c: 1 }],
        ['Si queda una fila de puros ceros, dice 0 = 0: siempre se cumple. Pero z se queda sin pivote.', { c: 2 }],
        ['Con z = t libre hay una solución por cada t: infinitas.', {}],
        ['Si un número k está en la última fila, el tipo depende de k.', { c: 3 }],
        ['Con k ≠ 1 hay pivote: única. Con k = 1 queda 0 = 3: ninguna. Aquí infinitas no sale nunca.', { k: 1 }],
      ], 'Fila 0 … 0 | c con c ≠ 0: ninguna. Columna sin pivote y nada imposible: infinitas. Un pivote por incógnita: única.'),
      xpHaz('dibujo', 'Mueve k hasta que el sistema **no tenga solución**.', { dib: tipoK, v: { k: 0 }, metas: { k: -3 }, alto: 176,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }], lee: v => `$k = ${v.k}$` },
      'Con $k = -3$ la última fila es $0 \\ 0 \\ 0 \\mid -5$: dice $0 = -5$, imposible.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una mezcla de tres alimentos tiene infinitas soluciones: $x_1 = 8 - 2t$, $x_2 = 2 + t$, $x_3 = t$ bolsas. Busca la que lleva igual número de bolsas de $x_1$ y de $x_2$.', {
        dib: mezcla, v: { t: 0 }, metas: { t: 2 }, alto: 186, manijas: [{ k: 't', min: 0, max: 4, paso: 1, et: 'parámetro t' }],
        lee: v => `$x_1 = ${8 - 2 * v.t}$, $x_2 = ${2 + v.t}$, $x_3 = ${v.t}$` },
      'Con $t = 2$: $x_1 = 4$, $x_2 = 4$ y $x_3 = 2$. El parámetro recorre todas las soluciones; la condición escoge una.')],
  ], 'Aᵀ voltea filas y columnas; las operaciones de fila escalonan sin cambiar soluciones, y los pivotes dicen el tipo.');
}
;
//#archivo js/explora-gva-4.js
// Geometría Vectorial · explicación de geo-4 «Matrices invertibles y matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const mul = (A, B) => A.map(f => B[0].map((_, j) => f.reduce((s, x, q) => s + x * B[q][j], 0)));
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
  const cuadro = (K, O, u) => K.pl([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]].map(([x, y]) => [O[0] + x * u, O[1] - y * u]), 'lm d');

  // Capítulo 1: A estira al doble a lo ancho y A⁻¹ encoge a la mitad.  v { a, k }
  const estira = (v, K) => {
    const O = [40, 160], u = 50, q = k(v);
    let h = rej(K, O, u, 0, 3, 0, 2) + cuadro(K, O, u) + para(K, O, u, [v.a, 0], [0, 1], q === 3 ? 'fo' : 'fa');
    h += K.t(214, 40, 'A =', 's', 'start') + mat(K, 276, 36, [[2, 0], [0, 1]], 's');
    if (q >= 2) h += K.t(214, 92, 'A⁻¹ =', 's', 'start') + mat(K, 280, 88, [['½', 0], [0, 1]], 's ta');
    return h + K.t(260, 150, ['el cuadrado', 'después de A', 'A y luego A⁻¹', 'A⁻¹A = I'][q], 's tm');
  };
  // Capítulo 1, tu turno: B deshace el corte A = [[1, 2], [0, 1]].  v { p, q, r, s }
  const CA = [[1, 2], [0, 1]], CO = [150, 120], CU = 22, CB = v => [[v.p, v.r], [v.q, v.s]];
  const corte = (v, K) => {
    const BA = mul(CB(v), CA);
    return rej(K, CO, CU, -3, 3, -3, 3) + cuadro(K, CO, CU) + para(K, CO, CU, [BA[0][0], BA[1][0]], [BA[0][1], BA[1][1]], 'fa')
      + K.ar(...CO, CO[0] + v.p * CU, CO[1] - v.q * CU, 'la gr') + K.ar(...CO, CO[0] + v.r * CU, CO[1] - v.s * CU, 'lg gr')
      + K.t(240, 30, 'A =', 's', 'start') + mat(K, 296, 26, CA, 's') + K.t(240, 92, 'B =', 's', 'start') + mat(K, 296, 88, CB(v), 's');
  };
  const DE = (x, y) => [(x - CO[0]) / CU, (CO[1] - y) / CU];

  // Capítulo 2: columnas, área ad − bc y el aplastamiento.  v { b, d, k }
  const area = (v, K) => {
    const O = [40, 180], u = 34, c1 = [2, 1], c2 = [v.b, v.d], q = k(v), dt = 2 * v.d - v.b;
    let h = rej(K, O, u, 0, 6, 0, 3) + para(K, O, u, c1, c2, Math.abs(dt) < 0.05 ? 'ff' : 'fa');
    if (q === 3 || (q === 2 && Math.abs(dt) < 0.05)) h += K.l(O[0], O[1], O[0] + 6 * u, O[1] - 3 * u, 'lf gr');
    h += K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr');
    h += K.t(20, 30, 'A =', 's', 'start') + mat(K, 76, 26, [[2, v.b], [1, v.d]], 's');
    if (q >= 1) h += K.t(328, 24, `ad − bc = ${r1(dt)}`, 's ta', 'end');
    if (q === 3) h += K.t(328, 44, 'área 0: sin inversa', 's tf', 'end');
    if (q === 4) h += K.t(328, 44, 'área ≠ 0: hay inversa', 's to', 'end');
    return h;
  };
  // Capítulo 2, tu turno: la b que anula ad − bc.  v { b }
  const anula = (v, K) => {
    const O = [40, 168], u = 18, c1 = [2, 3], c2 = [v.b, 6], dt = 12 - 3 * v.b;
    return rej(K, O, u, 0, 8, 0, 8) + para(K, O, u, c1, c2, dt === 0 ? 'ff' : 'fa') + K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr')
      + K.t(212, 40, 'A =', 's', 'start') + mat(K, 274, 36, [[2, v.b], [3, 6]], 's') + K.t(328, 88, `ad − bc = ${r1(dt)}`, 's ta', 'end');
  };
  const brackets = (K, x0, x1, y0, y1) => K.pl([[x0 + 8, y0], [x0, y0], [x0, y1], [x0 + 8, y1]]) + K.pl([[x1 - 8, y0], [x1, y0], [x1, y1], [x1 - 8, y1]]);

  // Capítulo 3: la elemental de R₃ → R₃ + 4R₁, lo que hace sobre A y su inversa.  v { k }
  const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], E3 = [[1, 0, 0], [0, 1, 0], [4, 0, 1]], A3 = [[1, 2, 1], [0, 1, 3], [-4, 0, 2]], F3 = [[1, 0, 0], [0, 1, 0], [-4, 0, 1]];
  const elemental = (v, K) => {
    const q = k(v);
    if (q === 0) return K.t(120, 88, 'I =', '', 'end') + mat(K, 170, 84, I3) + K.t(170, 160, 'no mueve nada', 's tm');
    if (q === 1) return K.t(60, 88, 'I =', 's', 'end') + mat(K, 104, 84, I3, 's') + K.ar(146, 84, 186, 84, 'lm') + K.t(166, 70, 'R₃ + 4R₁', 's ta') + K.t(234, 88, 'E =', 's', 'end') + mat(K, 280, 84, E3, 's ta');
    if (q === 2) return K.t(36, 88, 'E·', 's', 'start') + mat(K, 90, 84, A3, 's') + K.t(150, 88, '=', '') + mat(K, 210, 84, mul(E3, A3), 's ta') + K.t(170, 160, 'a la fila 3 de A se le sumó 4 veces la fila 1', 's tm');
    if (q === 3) return K.t(60, 88, 'E⁻¹ =', 's', 'end') + mat(K, 104, 84, F3, 's ta') + K.t(170, 160, 'R₃ → R₃ − 4R₁ deshace a E', 's tm') + K.t(240, 88, 'E⁻¹E = I', 's', 'start');
    if (q === 4) return [['Rᵢ ↔ Rⱼ', 'se repite: Rᵢ ↔ Rⱼ'], ['Rᵢ → kRᵢ', 'se divide: Rᵢ → (1/k)Rᵢ'], ['Rᵢ → Rᵢ + kRⱼ', 'se resta: Rᵢ → Rᵢ − kRⱼ']]
      .map(([a, b], i) => K.t(20, 60 + i * 44, a, 's', 'start') + K.ar(124, 56 + i * 44, 156, 56 + i * 44, 'lm') + K.t(166, 60 + i * 44, b, 's ta', 'start')).join('') + K.t(170, 24, 'operación y la que la deshace', 's tm');
    return K.t(170, 60, 'A → … → I con operaciones de fila', 's') + K.t(170, 96, 'Eₖ ⋯ E₂E₁A = I', 'ta') + K.t(170, 132, 'A⁻¹ = Eₖ ⋯ E₂E₁', 'ta') + K.t(170, 168, 'A es un producto de elementales', 's tm');
  };

  // Capítulo 4: medias y zapatos.  v { k }
  const capas = (v, K) => {
    const q = k(v), media = q === 1 || q === 2, zapato = q === 2;
    let h = K.r(130, 60, 80, 90, 'fc', 30) + K.t(170, 110, 'pie', 's tm');
    if (media || q === 3) h += K.r(120, 50, 100, 110, 'fa', 34) + K.t(170, 70, 'A: media', 's');
    if (zapato) h += K.r(108, 38, 124, 134, 'fg', 38) + K.t(170, 54, 'B: zapato', 's');
    const pie = ['sin nada', 'queda A', 'queda BA', 'B⁻¹ quitó el zapato', '(BA)⁻¹ = A⁻¹B⁻¹', '(Aᵀ)⁻¹ = (A⁻¹)ᵀ'][q];
    return h + K.t(170, 196, pie, q >= 4 ? 'ta' : 's tm');
  };

  // Problema: tortas y ponqués.  v { x, y }
  const PA = [[1, 1], [2, 3]], PO = [40, 196], PU = 26;
  const recetas = (v, K) => {
    let h = rej(K, PO, PU, 0, 6, 0, 6) + K.t(PO[0] + 6 * PU, PO[1] + 18, 'tortas', 's tm', 'end') + K.t(PO[0] - 8, PO[1] - 6 * PU - 10, 'ponqués', 's tm', 'start');
    h += K.l(PO[0] + v.x * PU, PO[1], PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d') + K.l(PO[0], PO[1] - v.y * PU, PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d');
    const az = v.x + v.y, ha = 2 * v.x + 3 * v.y;
    return h + K.t(246, 48, 'A⁻¹ =', 's', 'end') + mat(K, 286, 44, [[3, -1], [-2, 1]], 's') + K.t(222, 120, `azúcar: ${az} de 5`, `s ${az === 5 ? 'to' : 'tm'}`, 'start') + K.t(222, 142, `harina: ${ha} de 13`, `s ${ha === 13 ? 'to' : 'tm'}`, 'start');
  };

  xpLec('geo-4', [
    ['Deshacer lo que hace A',
      xpMira('dibujo', 'Una matriz **deshace** a otra cuando devuelve cada punto a su sitio.', { dib: estira, v: { a: 1, k: 0 }, alto: 200 }, [
        ['Una matriz mueve el plano. Mira el cuadrado de lado 1: cada matriz lo lleva a otra figura.', {}],
        ['Esta A estira todo al doble a lo ancho: el cuadrado se vuelve un rectángulo de 2 por 1.', { a: 2, k: 1 }],
        ['Para deshacerla hay que encoger a la mitad a lo ancho. Esa matriz es la inversa de A: A⁻¹.', { a: 1, k: 2 }],
        ['Hacer A y luego A⁻¹ deja todo como estaba: A⁻¹A = I, la identidad, que no mueve nada.', { k: 3 }],
        ['Es como dividir: 2 · ½ = 1. A⁻¹ hace el papel de ½ y la identidad, el del 1.', {}],
        ['La inversa deshace por los dos lados: AA⁻¹ = I y también A⁻¹A = I.', {}, '$AA^{-1} = A^{-1}A = I$'],
      ], 'A⁻¹ deshace lo que hace A: $AA^{-1} = A^{-1}A = I$, como $2 \\cdot \\tfrac{1}{2} = 1$.'),
      xpHaz('dibujo', 'A inclina el cuadrado: 2 a la derecha por cada paso arriba. Arrastra las columnas de B hasta que la figura vuelva a ser el cuadrado punteado.', {
        dib: corte, v: { p: 0, q: 1, r: -1, s: 0 }, metas: { p: 1, q: 0, r: -2, s: 1 }, alto: 200,
        manijas: [{ k: ['p', 'q'], min: -3, max: 3, paso: 1, rot: () => 'b₁', en: v => [CO[0] + v.p * CU, CO[1] - v.q * CU], de: DE }, { k: ['r', 's'], min: -3, max: 3, paso: 1, rot: () => 'b₂', en: v => [CO[0] + v.r * CU, CO[1] - v.s * CU], de: DE }],
        lee: v => `$BA = ${pm(mul(CB(v), CA))}$`, pista: 'A empuja hacia la derecha 2 por cada paso hacia arriba: B debe empujar 2 hacia la izquierda.' },
      'El corte que empuja 2 a la derecha se deshace empujando 2 a la izquierda.')],
    ['El número ad − bc',
      xpMira('dibujo', 'Hay matrices que **no** se pueden deshacer. Un número lo dice.', { dib: area, v: { b: 1, d: 2, k: 0 }, alto: 200 }, [
        ['Las columnas de A son las flechas a donde van los lados del cuadrado: aquí (2, 1) y (1, 2).', {}],
        ['Su área es |ad − bc| = 4 − 1 = 3: A agranda las áreas 3 veces.', { k: 1 }],
        ['Ahora la segunda columna gira hasta (4, 2), que es el doble de la primera.', { b: 4, d: 2, k: 2 }],
        ['El paralelogramo se aplasta en una recta: ad − bc = 4 − 4 = 0.', { k: 3 }],
        ['Todo el plano cae en esa recta y muchos puntos van al mismo sitio. Eso no se puede deshacer: no hay inversa.', {}],
        ['Si no es cero, hay inversa: se cambian a y d, b y c cambian de signo, y se divide.', { b: 1, d: 2, k: 4 }, '$A^{-1} = \\tfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$'],
      ], 'Si $ad - bc = 0$ el plano se aplasta y no hay inversa; si no, se intercambian a y d, b y c cambian de signo y se divide.'),
      xpHaz('dibujo', 'Desliza b hasta que A no tenga inversa: que las dos columnas queden en la misma recta.', {
        dib: anula, v: { b: 0 }, metas: { b: 4 }, alto: 230, manijas: [{ k: 'b', min: -2, max: 7, paso: 1, et: 'b' }],
        lee: v => `$ad - bc = 2 \\cdot 6 - ${v.b < 0 ? `(${v.b})` : v.b} \\cdot 3 = ${12 - 3 * v.b}$`, pista: 'La segunda columna debe ser un múltiplo de (2, 3): mira su segunda entrada, 6.' },
      'Con $b = 4$: $2 \\cdot 6 - 4 \\cdot 3 = 0$ y la columna $(4, 6)$ es el doble de $(2, 3)$.'),
      xpHaz('fichas', 'Arma la inversa de A = [3 5; 1 2]. Aquí ad − bc = 6 − 5 = 1, así que no hay que dividir.', {
        slots: [{ x: 196, y: 50, w: 50, h: 36 }, { x: 262, y: 50, w: 50, h: 36 }, { x: 196, y: 96, w: 50, h: 36 }, { x: 262, y: 96, w: 50, h: 36 }], alto: 124,
        fondo: K => K.t(20, 44, 'A =', 's', 'start') + mat(K, 76, 40, [[3, 5], [1, 2]], 's') + K.t(160, 79, 'A⁻¹ =', 's', 'end') + brackets(K, 164, 294, 26, 120),
        fichas: ['−5', '3', '5', '2', '−1', '1'], meta: ['2', '−5', '−1', '3'], pista: 'La diagonal se intercambia: el 3 y el 2 cambian de lugar; el 5 y el 1 solo cambian de signo.' },
      'Inversa de $\\begin{pmatrix} 3 & 5 \\\\ 1 & 2 \\end{pmatrix}$: $\\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix}$, porque $ad - bc = 1$.')],
    ['Matrices elementales',
      xpMira('dibujo', 'Las operaciones de fila también son matrices: las **elementales**.', { dib: elemental, v: { k: 0 }, alto: 190 }, [
        ['Una matriz elemental es la identidad después de una sola operación de fila.', {}],
        ['Si en I le sumas a la fila 3 cuatro veces la fila 1, sale esta matriz E.', { k: 1 }],
        ['Multiplicar E·A le hace a A esa misma operación: E es la operación escrita como matriz.', { k: 2 }],
        ['Para deshacerla, se resta cuatro veces la fila 1. Esa es E⁻¹, y también es elemental.', { k: 3 }],
        ['Cada operación tiene su contraria: el intercambio se repite, multiplicar se divide y sumar se resta.', { k: 4 }],
        ['Si A llega a I con operaciones de fila, A tiene inversa: es un producto de elementales.', { k: 5 }],
      ], 'E es I con una operación de fila; $EA$ hace esa operación sobre A y $E^{-1}$ es la operación contraria.'),
      xpHaz('fichas', 'Pon al lado de cada operación de fila la que la deshace.', {
        slots: [0, 1, 2].map(i => ({ x: 238, y: 26 + i * 46, w: 150, h: 36 })), alto: 140,
        fondo: K => ['R₁ ↔ R₃', 'R₂ → 6R₂', 'R₂ → R₂ − 2R₃'].map((t, i) => K.t(16, 31 + i * 46, t, 's', 'start') + K.ar(124, 26 + i * 46, 154, 26 + i * 46, 'lm')).join(''),
        fichas: ['R₂ → 6R₂', 'R₂ → R₂ + 2R₃', 'R₁ ↔ R₃', 'R₂ → −6R₂', 'R₂ → ⅙R₂'], meta: ['R₁ ↔ R₃', 'R₂ → ⅙R₂', 'R₂ → R₂ + 2R₃'], pista: 'Repetir un intercambio lo deshace; multiplicar por 6 se deshace dividiendo; restar se deshace sumando.' },
      'Intercambio: se repite. Multiplicar por 6: dividir entre 6. Restar $2R_3$: sumarlo.')],
    ['Deshacer en orden contrario',
      xpMira('dibujo', 'Cuando se aplican dos matrices, ¿en qué orden se deshacen?', { dib: capas, v: { k: 0 }, alto: 210 }, [
        ['Ponerse medias y zapatos es aplicar dos matrices: primero A, la media.', { k: 1 }],
        ['Después B, el zapato. Lo que queda puesto es BA: la matriz de la derecha actúa primero.', { k: 2 }],
        ['Para quitarlos, primero sale el zapato con B⁻¹, y después la media con A⁻¹.', { k: 3 }],
        ['Por eso (BA)⁻¹ = A⁻¹B⁻¹: las inversas van en el orden contrario.', { k: 4 }, '$(BA)^{-1} = A^{-1}B^{-1}$'],
        ['Con la transpuesta pasa algo parecido: la inversa de Aᵀ es la transpuesta de A⁻¹.', { k: 5 }, '$(A^T)^{-1} = (A^{-1})^T$'],
      ], 'Se deshace en orden contrario: $(AB)^{-1} = B^{-1}A^{-1}$; y $(A^T)^{-1} = (A^{-1})^T$.'),
      xpHaz('fichas', 'Un dato x pasa por C, luego por D y luego por F: y = FDCx. Pon las inversas que recuperan x.', {
        slots: [{ x: 132, y: 56, w: 52, h: 38 }, { x: 192, y: 56, w: 52, h: 38 }, { x: 252, y: 56, w: 52, h: 38 }], alto: 100,
        fondo: K => K.t(96, 61, 'x =', '', 'end') + K.t(286, 61, 'y', '', 'start') + K.t(170, 18, 'y = F · D · C · x', 's tm'),
        fichas: ['F⁻¹', 'C⁻¹', 'F', 'D⁻¹', 'C'], meta: ['C⁻¹', 'D⁻¹', 'F⁻¹'], pista: 'F fue la última en actuar: su inversa es la primera en quitarse, pegada a y.' },
      '$x = C^{-1}D^{-1}F^{-1}y$: la última capa, F, se quita primero.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una torta usa 1 taza de azúcar y 2 de harina; un ponqué, 1 y 3. Se gastaron 5 tazas de azúcar y 13 de harina. Usa A⁻¹ y marca cuántos de cada uno.', {
        dib: recetas, v: { x: 0, y: 0 }, metas: { x: 2, y: 3 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, en: v => [PO[0] + v.x * PU, PO[1] - v.y * PU], de: (x, y) => [(x - PO[0]) / PU, (PO[1] - y) / PU] }],
        lee: v => `$A ${pm([[v.x], [v.y]])} = ${pm([[v.x + v.y], [2 * v.x + 3 * v.y]])}$`, pista: 'Multiplica A⁻¹ por (5, 13): fila por columna. La primera fila da las tortas.' },
      '$A^{-1}\\vec b = (3 \\cdot 5 - 13,\\ -2 \\cdot 5 + 13) = (2, 3)$: 2 tortas y 3 ponqués.')],
  ], 'Una matriz se deshace con su inversa si $ad - bc \\neq 0$; las elementales son operaciones de fila; todo se deshace al revés.');
}
;
//#archivo js/explora-gva-5.js
// Geometría Vectorial · explicación de geo-5 «Gauss-Jordan para la inversa» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
  const conK = q => (q < 0 ? `− ${r1(-q)}` : `+ ${r1(q)}`);
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  // Matriz con corchetes centrada en (cx, cy); bar: columna tras la que va la raya; cls: clase o función (i, j) → clase.
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20, bar = null) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    if (bar != null) s += K.l(x0 + dx * (bar + 1), y0, x0 + dx * (bar + 1), y0 + h, 'lm');
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, typeof cls === 'function' ? cls(i, j) : cls); }));
    return s;
  }

  // Capítulo 1: [A | I] → [I | A⁻¹] con A = [[1, 2], [3, 5]].  v { k }
  const PASOS1 = [
    ['', [[1, 2, 1, 0], [3, 5, 0, 1]], ['A', 'I']],
    ['R₂ → R₂ − 3R₁', [[1, 2, 1, 0], [0, -1, -3, 1]], ['', '']],
    ['R₂ → −R₂', [[1, 2, 1, 0], [0, 1, 3, -1]], ['', '']],
    ['R₁ → R₁ − 2R₂', [[1, 0, -5, 2], [0, 1, 3, -1]], ['I', '']],
    ['', [[1, 0, -5, 2], [0, 1, 3, -1]], ['I', 'A⁻¹']],
  ];
  const ampliada = (v, K) => {
    const q = k(v), [op, M, et] = PASOS1[Math.min(q, 4)];
    let h = (op ? K.t(170, 26, op, 's ta') : '') + mat(K, 170, 70, M, (i, j) => (q >= 4 && j >= 2 ? 'ta' : ''), 40, 28, 1);
    h += K.t(130, 120, et[0], 's tm') + K.t(210, 120, et[1], `s ${q >= 4 ? 'ta' : 'tm'}`);
    if (q >= 5) h += K.t(170, 160, 'A · A⁻¹ = I', 'ta') + K.t(170, 184, 'fila 1 por columna 1: 1·(−5) + 2·3 = 1', 's tm');
    return h;
  };
  // Capítulo 1, tu turno: R₂ → R₂ + k·R₁ en [[2, 1 | 1, 0], [6, 4 | 0, 1]].  v { k }
  const primerCero = (v, K) => {
    const M = [[2, 1, 1, 0], [6 + 2 * v.k, 4 + v.k, v.k, 1]];
    return K.c(110, 84, 13, M[1][0] === 0 ? 'fo' : 'fn') + mat(K, 170, 70, M, '', 40, 28, 1) + K.t(170, 118, `R₂ → R₂ ${conK(v.k)}·R₁`, 's ta');
  };

  // Capítulo 2: las operaciones son elementales y su producto es A⁻¹.  v { k }
  const ES = [['E₁: R₂ − 3R₁', [[1, 0], [-3, 1]]], ['E₂: −R₂', [[1, 0], [0, -1]]], ['E₃: R₁ − 2R₂', [[1, -2], [0, 1]]]];
  const porque = (v, K) => {
    const q = k(v);
    if (q === 0) return mat(K, 90, 70, ES[0][1]) + K.t(46, 74, 'E₁ =', 's', 'end') + K.t(236, 74, 'es I con R₂ → R₂ − 3R₁', 's ta') + K.t(170, 140, 'E₁·A le hace a A esa operación', 's tm');
    if (q <= 2) {
      let h = ES.map(([t, M], i) => K.t(60 + i * 110, 24, t, 's tm') + mat(K, 60 + i * 110, 62, M, 's')).join('');
      h += K.t(170, 124, 'E₃ E₂ E₁ A = I', 'ta');
      if (q === 2) h += K.t(170, 158, 'entonces E₃ E₂ E₁ = A⁻¹', 'ta');
      return h;
    }
    if (q === 3) return K.t(170, 50, '[ A | I ]', '') + K.ar(170, 60, 170, 80, 'lm') + K.t(170, 100, '[ E₃E₂E₁·A | E₃E₂E₁·I ]', 's') + K.ar(170, 110, 170, 130, 'lm') + K.t(170, 152, '[ I | A⁻¹ ]', 'ta');
    return K.t(250, 34, 'e₁', 's ta') + K.t(290, 34, 'e₂', 's ta') + mat(K, 210, 70, [[1, 2, 1, 0], [3, 5, 0, 1]], (i, j) => (j >= 2 ? 'ta' : ''), 40, 28, 1)
      + K.t(170, 130, 'A·x = e₁ y A·x = e₂, a la vez', 's') + K.t(170, 154, 'sus soluciones son las columnas de A⁻¹', 's tm');
  };

  // Capítulo 3: una fila de ceros a la izquierda.  v { k }
  const FILAS3 = [[[1, 2, 3], [2, 5, 7], [1, 3, 4]], [[1, 2, 3], [0, 1, 1], [0, 1, 1]], [[1, 2, 3], [0, 1, 1], [0, 0, 0]]];
  const sinInversa = (v, K) => {
    const q = k(v), M = FILAS3[q >= 4 ? 0 : Math.min(q, 2)];
    let h = '';
    if (q === 2 || q === 3 || q === 5) h += K.r(56, 96, 108, 26, 'ff', 8);
    h += mat(K, 110, 80, q === 5 ? FILAS3[2] : M, '', 34, 28);
    const lado = ['¿tiene inversa?', 'R₂ − 2R₁, R₃ − R₁', 'R₃ − R₂', 'la columna 3 no tiene pivote', 'fila 3 = fila 2 − fila 1', 'fila de ceros: sin inversa'][q];
    h += K.t(254, 84, lado, `s ${q === 5 ? 'tf' : 'ta'}`);
    if (q === 3) h += K.t(254, 106, 'la izquierda no llega a I', 's tm');
    if (q === 4) h += K.t(254, 106, 'no trae nada nuevo', 's tm');
    return h;
  };
  // Capítulo 3, tu turno: A = [[1, 1, 2], [1, 2, 3], [2, 1, c]].  v { c }
  const buscaC = (v, K) => {
    const R = [[1, 1, 2], [0, 1, 1], [0, 0, v.c - 3]], z = v.c === 3;
    return K.t(30, 74, 'A =', 's', 'end') + mat(K, 80, 70, [[1, 1, 2], [1, 2, 3], [2, 1, v.c]], (i, j) => (i === 2 && j === 2 ? 'ta' : ''), 28, 26)
      + K.ar(132, 70, 166, 70, 'lm') + mat(K, 252, 70, R, (i) => (i === 2 ? 'ta' : ''), 28, 26)
      + K.t(170, 136, z ? 'fila de ceros: sin inversa' : 'pivote ≠ 0: hay inversa', `s ${z ? 'tf' : 'tm'}`);
  };

  // Capítulo 4: x = A⁻¹ b.  v { k }
  const IV = [[0, 1, -1], [-2, 2, -1], [1, -1, 1]];
  const resuelve = (v, K) => {
    const q = k(v);
    if (q === 0) return ['x₁ + x₃ = 3', 'x₁ + x₂ + 2x₃ = 7', 'x₂ + 2x₃ = 6'].map((t, i) => K.t(30, 54 + i * 28, t, '', 'start')).join('') + K.t(270, 82, 'A·x = b', 'ta');
    if (q === 1) return K.t(170, 70, 'A⁻¹A·x = A⁻¹b', '') + K.t(170, 110, 'x = A⁻¹b', 'ta') + K.t(170, 146, 'porque A⁻¹A = I', 's tm');
    let h = K.t(62, 84, 'A⁻¹ =', 's', 'end') + mat(K, 112, 80, IV, (i) => (q === 3 && i === 0 ? 'ta' : ''), 30, 24) + K.t(204, 84, 'b =', 's', 'end') + mat(K, 230, 80, [[3], [7], [6]], 's', 30, 24);
    if (q === 3) h += K.t(170, 160, 'x₁ = 0·3 + 1·7 − 1·6 = 1', 's ta');
    if (q === 4) h += K.t(170, 156, 'x = (1, 2, 2)', 'ta') + K.t(170, 180, 'comprueba: A·(1, 2, 2) = (3, 7, 6)', 's tm');
    if (q === 5) h += K.t(170, 160, 'otro b: la misma A⁻¹, sin reducir otra vez', 's tm');
    return h;
  };
  // Capítulo 4, tu turno: x₃ con b = (4, 9, 8).  v { z }
  const terceraX = (v, K) => K.t(62, 68, 'A⁻¹ =', 's', 'end') + mat(K, 112, 64, IV, (i) => (i === 2 ? 'ta' : ''), 30, 22) + K.t(204, 68, 'b =', 's', 'end') + mat(K, 230, 64, [[4], [9], [8]], 's', 30, 22)
    + K.t(170, 132, `x₃ = ${r1(v.z)}`, 'ta');

  // Problema: panes P, Q y R.  v { x, y, z }
  const PI = [[3, -2, 1], [-2, 2, -1], [1, -1, 1]];
  const panes = (v, K) => {
    const g = [v.x + v.y, v.x + 2 * v.y + v.z, v.y + 2 * v.z], b = [5, 9, 7], n = ['harina', 'leche', 'mantequilla'];
    return K.t(32, 64, 'A⁻¹ =', 's', 'end') + mat(K, 78, 60, PI, 's', 28, 22) + K.t(148, 64, 'b =', 's', 'end') + mat(K, 170, 60, b.map(x => [x]), 's', 26, 22)
      + g.map((x, i) => K.t(208, 42 + i * 22, `${n[i]}: ${r1(x)} de ${b[i]}`, `s ${x === b[i] ? 'to' : 'tm'}`, 'start')).join('')
      + K.t(170, 132, `tandas: P = ${r1(v.x)}, Q = ${r1(v.y)}, R = ${r1(v.z)}`, 's ta');
  };

  xpLec('geo-5', [
    ['La identidad al lado',
      xpMira('dibujo', 'La inversa se halla poniendo la **identidad al lado** y reduciendo.', { dib: ampliada, v: { k: 0 }, alto: 200 }, [
        ['Se escribe A y, a su derecha, la identidad: [A | I]. Una raya separa los dos bloques.', {}],
        ['Cada operación va en la fila entera. R₂ − 3R₁ deja un cero bajo el pivote y cambia también la derecha.', { k: 1 }],
        ['Ahora el pivote de la fila 2 vale −1. Se multiplica esa fila por −1 para que valga 1.', { k: 2 }],
        ['Falta el cero encima del pivote: R₁ − 2R₂. La izquierda ya es la identidad.', { k: 3 }],
        ['Lo que quedó a la derecha es la inversa: [A | I] se volvió [I | A⁻¹].', { k: 4 }, '$[A \\mid I] \\to [I \\mid A^{-1}]$'],
        ['Se comprueba multiplicando: A·A⁻¹ debe dar la identidad. Si no la da, hubo un error de cuentas.', { k: 5 }],
      ], 'Se reduce $[A \\mid I]$ con operaciones en la fila entera; cuando la izquierda es $I$, la derecha es $A^{-1}$.'),
      xpHaz('dibujo', 'Elige k en R₂ → R₂ + k·R₁ para dejar un cero debajo del pivote 2. Mira cómo cambia también el bloque derecho.', {
        dib: primerCero, v: { k: 0 }, metas: { k: -3 }, alto: 180, manijas: [{ k: 'k', min: -5, max: 5, paso: 1, et: 'k' }],
        lee: v => `$6 + 2 \\cdot ${v.k < 0 ? `(${v.k})` : v.k} = ${6 + 2 * v.k}$`, pista: 'Cuántas veces cabe el 2 en el 6, y con qué signo, para que 6 + 2k dé 0.' },
      'Con $k = -3$: $6 + 2k = 0$, y a la derecha la fila 2 queda $(-3, 1)$.')],
    ['Por qué funciona',
      xpMira('dibujo', 'Cada operación de fila es una **matriz**: eso explica el truco.', { dib: porque, v: { k: 0 }, alto: 190 }, [
        ['Cada operación de fila es una matriz elemental E: hacer la operación es multiplicar por E a la izquierda.', {}],
        ['Las tres operaciones de antes son E₁, E₂ y E₃. Juntas llevan A hasta I: E₃E₂E₁A = I.', { k: 1 }],
        ['Si ese producto deshace a A, entonces es su inversa: E₃E₂E₁ = A⁻¹.', { k: 2 }, '$E_3E_2E_1 = A^{-1}$'],
        ['A la derecha empezó I. Las mismas operaciones la volvieron E₃E₂E₁·I, que es A⁻¹.', { k: 3 }],
        ['Otra mirada: la columna j de A⁻¹ resuelve A·x = eⱼ. La raya junta los sistemas y se resuelven a la vez.', { k: 4 }],
      ], 'Las operaciones son elementales: su producto lleva A a I, así que es $A^{-1}$, y es lo que queda a la derecha.'),
      xpHaz('fichas', 'Tres operaciones F₁, F₂ y F₃, en ese orden, llevaron B hasta I. Arma B⁻¹ como producto de ellas.', {
        slots: [{ x: 150, y: 56, w: 52, h: 38 }, { x: 210, y: 56, w: 52, h: 38 }, { x: 270, y: 56, w: 52, h: 38 }], alto: 100,
        fondo: K => K.t(114, 61, 'B⁻¹ =', '', 'end') + K.t(170, 20, 'primero F₁, luego F₂ y al final F₃', 's tm'),
        fichas: ['F₁', 'F₂', 'F₃', 'B'], meta: ['F₃', 'F₂', 'F₁'], pista: 'Cada operación nueva multiplica por la izquierda: la primera queda pegada a B, a la derecha.' },
      '$B^{-1} = F_3F_2F_1$: la primera operación queda a la derecha.')],
    ['Cuando no hay inversa',
      xpMira('dibujo', 'A veces la izquierda **no** llega a I. Hay una señal clara.', { dib: sinInversa, v: { k: 0 }, alto: 190 }, [
        ['Se reduce esta A como siempre: lo que importa es la izquierda.', {}],
        ['R₂ − 2R₁ y R₃ − R₁ dejan ceros debajo del primer pivote.', { k: 1 }],
        ['R₃ − R₂ hace el cero de la columna 2, pero se lleva toda la fila: queda (0, 0, 0).', { k: 2 }],
        ['La columna 3 se quedó sin pivote. Ninguna operación de fila vuelve a crear ahí un 1: no se llega a I.', { k: 3 }],
        ['La razón: la fila 3 era la fila 2 menos la fila 1. No traía información nueva.', { k: 4 }],
        ['Regla: si a la izquierda aparece una fila de ceros, se para. A no tiene inversa.', { k: 5 }],
      ], 'Si al reducir aparece una fila de ceros en el bloque izquierdo, no se llega a $I$: A no tiene inversa.'),
      xpHaz('dibujo', 'Desliza c hasta que, al escalonar, la última fila de la izquierda quede de ceros.', {
        dib: buscaC, v: { c: 0 }, metas: { c: 3 }, alto: 200, manijas: [{ k: 'c', min: -2, max: 7, paso: 1, et: 'c' }],
        lee: v => `$\\text{última fila: } (0,\\ 0,\\ ${v.c - 3})$`, pista: 'La última entrada queda c − 3: busca el c que la anula.' },
      'Con $c = 3$ la fila 3 queda $(0, 0, 0)$ y A no tiene inversa.')],
    ['Resolver con la inversa',
      xpMira('dibujo', 'Con la inversa, un sistema se resuelve **multiplicando**.', { dib: resuelve, v: { k: 0 }, alto: 200 }, [
        ['Un sistema de tres ecuaciones es A·x = b: A guarda los números, x las incógnitas y b los resultados.', {}],
        ['Si A tiene inversa, se multiplica por A⁻¹ a los dos lados. Como A⁻¹A = I, queda x = A⁻¹b.', { k: 1 }, '$\\vec x = A^{-1}\\vec b$'],
        ['Esta es la inversa de esa A, hallada con Gauss-Jordan, y b es la columna de resultados.', { k: 2 }],
        ['Cada fila de A⁻¹ por b da una incógnita: la fila 1 da x₁ = 1.', { k: 3 }],
        ['Las tres filas dan x = (1, 2, 2). Se comprueba metiéndolo en el sistema.', { k: 4 }],
        ['Si cambia b, no hay que reducir otra vez: la misma A⁻¹ sirve para cualquier b.', { k: 5 }],
      ], 'Si A es invertible, $A\\vec x = \\vec b$ tiene la solución $\\vec x = A^{-1}\\vec b$, para cualquier $\\vec b$.'),
      xpHaz('dibujo', 'Con la misma A⁻¹ y un nuevo b = (4, 9, 8), desliza x₃ hasta su valor.', {
        dib: terceraX, v: { z: 0 }, metas: { z: 3 }, alto: 190, manijas: [{ k: 'z', min: 0, max: 8, paso: 1, et: 'x₃' }],
        lee: v => `$x_3 = ${v.z}$`, pista: 'Usa la fila 3 de A⁻¹: 1·4 − 1·9 + 1·8.' },
      '$x_3 = 4 - 9 + 8 = 3$: la fila 3 de $A^{-1}$ por $\\vec b$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una panadería hace panes P, Q y R con harina, leche y mantequilla. Se gastaron 5, 9 y 7 unidades. Con A⁻¹ a la vista, ajusta las tandas de cada pan.', {
        dib: panes, v: { x: 0, y: 0, z: 0 }, metas: { x: 4, y: 1, z: 3 }, alto: 300,
        manijas: [{ k: 'x', min: 0, max: 6, paso: 1, et: 'tandas de P' }, { k: 'y', min: 0, max: 6, paso: 1, et: 'tandas de Q' }, { k: 'z', min: 0, max: 6, paso: 1, et: 'tandas de R' }],
        lee: v => `$A ${pm([[v.x], [v.y], [v.z]])} = ${pm([[v.x + v.y], [v.x + 2 * v.y + v.z], [v.y + 2 * v.z]])}$`, pista: 'Multiplica A⁻¹ por (5, 9, 7), fila por columna: la fila 1 da las tandas de P.' },
      '$A^{-1}\\vec b = (15 - 18 + 7,\\ -10 + 18 - 7,\\ 5 - 9 + 7) = (4, 1, 3)$: 4 tandas de P, 1 de Q y 3 de R.')],
  ], 'Se reduce $[A \\mid I]$ hasta $[I \\mid A^{-1}]$; una fila de ceros dice que no hay inversa; con ella, $\\vec x = A^{-1}\\vec b$.');
}
;
//#archivo js/explora-gva-6.js
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
;
//#archivo js/explora-gva-7.js
// Geometría Vectorial · explicación de geo-7 «El determinante con matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.q || 0);
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, cls); }));
    return s;
  }
  // Plano con sus enteros: O origen, u píxeles por unidad, de x0 a x1 y de y0 a y1.
  const plano = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  const rej = (K, P, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(...P(i, y0), ...P(i, y1), i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(...P(x0, j), ...P(x1, j), j ? 'lr' : 'lm');
    return h;
  };
  const para = (K, P, a, b, cls) => K.p([[0, 0], a, [a[0] + b[0], a[1] + b[1]], b].map(q => P(...q)), cls);
  const flechas = (K, P, a, b) => K.ar(...P(0, 0), ...P(...a), 'la gr') + K.ar(...P(0, 0), ...P(...b), 'lg gr')
    + K.t(...P(a[0] + 0.2, a[1] + 0.45), 'fila 1', 's ta', 'start') + K.t(...P(b[0] + 0.2, b[1] + 0.45), 'fila 2', 's tg', 'start');

  // Capítulo 1: la fila 2 de A = [[3, 1], [1, 2]] resbala con R₂ → R₂ + kR₁.  v { k, q }
  const CA = [[3, 1], [1, 2]], CP = plano([56, 176], 17);
  const cizalla = (v, K) => {
    const a = CA[0], b = [CA[1][0] + v.k * a[0], CA[1][1] + v.k * a[1]], kk = Math.round(v.k);
    let h = rej(K, CP, -2, 10, 0, 8) + K.l(...CP(1 - 1.3 * 3, 2 - 1.3), ...CP(1 + 2.4 * 3, 2 + 2.4), 'lm d');
    h += para(K, CP, a, b, 'fa') + flechas(K, CP, a, b);
    h += K.t(292, 36, 'A =', 's') + mat(K, 292, 66, [a, b].map(f => f.map(Math.round)), 's') + K.t(292, 118, kk ? `R₂ ${kk > 0 ? '+' : '−'} ${Math.abs(kk) === 1 ? '' : Math.abs(kk)}R₁` : 'sin cambios', 's ta');
    if (k(v) >= 1) h += K.t(292, 146, 'área = 5', 's to');
    if (k(v) >= 2) h += K.t(292, 166, 'det no cambia', 's tm');
    return h;
  };
  // Capítulo 1, tu turno: A = [[1, 2], [3, 1]]; R₂ → R₂ + kR₁ hasta dejar la fila 2 en el eje.  v { k }
  const TA = [[1, 2], [3, 1]], TP = plano([116, 100], 12);
  const triangula = (v, K) => {
    const a = TA[0], b = [TA[1][0] + v.k * a[0], TA[1][1] + v.k * a[1]];
    return rej(K, TP, -1, 6, -7, 5) + para(K, TP, a, b, 'fa') + flechas(K, TP, a, b)
      + K.t(290, 36, 'A =', 's') + mat(K, 290, 66, TA, 's') + K.t(290, 112, `R₂ ${v.k < 0 ? '−' : '+'} ${Math.abs(Math.round(v.k))}·R₁`, 's ta') + mat(K, 290, 146, [a, b].map(f => f.map(Math.round)), 's');
  };

  // Capítulo 2: estirar la fila 1 de A = [[2, 0], [1, 2]] por k y, al final, intercambiar las filas.  v { k, s }
  const EA = [[2, 0], [1, 2]], EP = plano([100, 112], 15);
  const estira = (v, K) => {
    const a = [v.k * EA[0][0], v.k * EA[0][1]], b = EA[1], f1 = v.s ? b : a, f2 = v.s ? a : b, d = f1[0] * f2[1] - f1[1] * f2[0];
    let h = rej(K, EP, -3, 7, -2, 4) + para(K, EP, f1, f2, d < 0 ? 'fg' : 'fa') + flechas(K, EP, f1, f2);
    const g1 = Math.atan2(f1[1], f1[0]) * 180 / Math.PI, g2 = Math.atan2(f2[1], f2[0]) * 180 / Math.PI;
    let b2 = g2; while (b2 - g1 > 180) b2 -= 360; while (b2 - g1 < -180) b2 += 360;
    h += K.arc(...EP(0, 0), 20, g1, b2, 'lf gr');
    h += K.t(292, 36, 'A =', 's') + mat(K, 292, 66, [f1, f2].map(f => f.map(Math.round)), 's') + K.t(292, 116, `det = ${r1(Math.round(d))}`, d < 0 ? 's tf' : 's to');
    return h + K.t(292, 138, d < 0 ? 'giro horario' : 'giro antihorario', 's tm') + K.t(170, 196, v.s ? 'filas intercambiadas' : `fila 1 por ${r1(Math.round(v.k))}`, 's tm');
  };

  // Capítulo 3: C = [[0, 2, 1], [1, 1, 2], [3, 1, 4]] a triangular, con la cuenta del factor.  v { q }
  const PASOS = [
    [[[0, 2, 1], [1, 1, 2], [3, 1, 4]], '', '1'],
    [[[1, 1, 2], [0, 2, 1], [3, 1, 4]], 'R₁ ↔ R₂', '−1'],
    [[[1, 1, 2], [0, 2, 1], [0, -2, -2]], 'R₃ − 3R₁', '−1'],
    [[[1, 1, 2], [0, 2, 1], [0, 0, -1]], 'R₃ + R₂', '−1'],
  ];
  const cuenta = (v, K) => {
    const q = k(v), [M, op, fac] = PASOS[Math.min(q, 3)];
    let h = K.t(20, 24, q ? 'después de' : 'C =', 's tm', 'start') + (op ? K.t(20, 44, op, 's ta', 'start') : '') + mat(K, 150, 84, M, 's', 30, 24);
    if (q >= 3) h += [0, 1, 2].map(i => K.c(150 + 30 * (i - 1), 84 + 24 * (i - 1), 13, 'fn')).join('') + mat(K, 150, 84, M, 's ta', 30, 24);
    h += K.r(232, 44, 92, 80, 'fn', 8) + K.t(278, 66, 'factor', 's tm') + K.t(278, 98, fac, 'ta');
    if (q >= 4) h += K.t(170, 162, 'diagonal: 1 · 2 · (−1) = −2', 's');
    if (q >= 5) h += K.t(170, 186, 'det C = −2 ÷ (−1) = 2', 's to');
    return h;
  };

  // Capítulo 4: elementales, productos, kA y filas proporcionales.  v { q, k }
  const grupo = (v, K) => {
    const q = k(v);
    if (q === 0) return K.t(170, 40, 'una operación de fila = una elemental E', 's tm') + K.t(170, 92, 'det(EA) = det E · det A', 'ta') + K.t(170, 136, 'det E = −1, k o 1', 's');
    if (q === 1) return [['B', '×(−2)', 80], ['A', '×3', 190]].map(([n, d, x]) => K.r(x - 30, 60, 60, 70, 'fn', 8) + K.t(x, 52, n, 's') + K.t(x, 100, d, 's ta')).join('')
      + K.ar(20, 95, 46, 95, 'lm') + K.ar(114, 95, 156, 95, 'lm') + K.ar(224, 95, 266, 95, 'lm') + K.t(300, 100, '−6', 'ta') + K.t(170, 170, 'det(AB) = det A · det B', 's');
    if (q === 2) {
      const a = Math.max(1, Math.round(v.k)), u = Math.min(22, 70 / a);
      return K.caja([110, 176], u, a, a, a, 'fa', true) + K.t(268, 70, `k = ${a}`, 'ta') + K.t(268, 100, `${a}·${a}·${a} = ${a ** 3}`, 's') + K.t(268, 124, 'cubitos', 's tm');
    }
    return K.t(20, 36, 'filas 1 y 3 proporcionales', 's tm', 'start') + mat(K, 90, 96, [[1, 2, 0], [4, 1, 5], [3, 6, 0]], 's', 30, 26)
      + K.ar(170, 96, 206, 96, 'lm') + K.t(188, 84, 'R₃ − 3R₁', 's ta') + mat(K, 264, 96, [[1, 2, 0], [4, 1, 5], [0, 0, 0]], 's', 30, 26) + K.t(264, 170, 'fila de ceros: det = 0', 's to');
  };
  // Capítulo 4, tu turno: 2 × 2 con det A = 3; det(kA) = 48.  v { k }
  const cuadros = (v, K) => {
    const a = Math.max(1, Math.round(v.k)), u = Math.min(26, 150 / a);
    let h = '';
    for (let i = 0; i < a; i++) for (let j = 0; j < a; j++) h += K.r(30 + i * u, 20 + j * u, u - 2, u - 2, 'fa', 2);
    return h + K.t(270, 40, 'A: 2 × 2', 's') + K.t(270, 62, 'det A = 3', 's') + K.t(270, 96, `k = ${a}`, 'ta') + K.t(270, 124, `${a}² = ${a * a} cuadritos`, 's tm');
  };

  // Problema: un logo pasa por tres transformaciones.  v { a }
  const logo = (v, K) => {
    const ms = [['cizalla', '×1'], ['espejo', '×(−1)'], ['ancho ×3', '×3']];
    let h = K.r(14, 70, 40, 40, 'fa', 4) + K.t(34, 126, 'área 5', 's tm');
    ms.forEach(([n, d], i) => { const x = 96 + i * 80; h += K.ar(x - 36, 90, x - 28, 90, 'lm') + K.r(x - 26, 60, 52, 60, 'fn', 8) + K.t(x, 52, n, 's tm') + K.t(x, 96, d, 's ta'); });
    return h + K.ar(300, 90, 310, 90, 'lm') + K.t(326, 96, '?', 'ta', 'end') + K.t(170, 168, `área final con signo: ${r1(Math.round(v.a))}`, 's');
  };

  xpLec('geo-7', [
    ['Sumar un múltiplo: una cizalla',
      xpMira('dibujo', 'Las filas de una matriz dibujan una figura; su **área** es el determinante.', { dib: cizalla, v: { k: 0, q: 0 }, alto: 200 }, [
        ['Las filas de una matriz 2 × 2 son dos flechas. El paralelogramo que forman tiene área |det A|.', {}],
        ['Aquí det A = 3 · 2 − 1 · 1 = 5: el paralelogramo de las filas mide 5.', { q: 1 }],
        ['Sumarle a la fila 2 la fila 1 la hace resbalar por la recta punteada, paralela a la fila 1.', { k: 1 }],
        ['Es una cizalla, como empujar un mazo de cartas: la base y la altura no cambian, ni el área.', { k: 2 }],
        ['Hacia el otro lado pasa lo mismo: con R₂ − R₁ el área sigue en 5.', { k: -1 }],
        ['Por eso sumar a una fila un múltiplo de otra no cambia el determinante.', { k: -1, q: 2 }, '$R_i \\to R_i + kR_j$: $\\det$ no cambia'],
      ], 'Sumar a una fila un múltiplo de otra hace resbalar la figura sin cambiar su área: el determinante no cambia.'),
      xpHaz('dibujo', 'Desliza k en R₂ → R₂ + k·R₁ hasta que la fila 2 quede sobre el eje vertical: así la matriz queda triangular.', {
        dib: triangula, v: { k: 0 }, metas: { k: -3 }, alto: 250, manijas: [{ k: 'k', min: -4, max: 1, paso: 1, et: 'k' }],
        lee: v => `$\\det = 1 \\cdot ${1 + 2 * v.k < 0 ? `(${1 + 2 * v.k})` : 1 + 2 * v.k} - 2 \\cdot ${3 + v.k < 0 ? `(${3 + v.k})` : 3 + v.k} = -5$`, pista: 'La primera entrada de la fila 2 es 3 + k · 1: ¿con qué k se vuelve 0?' },
      'Con $k = -3$ la fila 2 es $(0, -5)$: la triangular $\\begin{pmatrix} 1 & 2 \\\\ 0 & -5 \\end{pmatrix}$ conserva $\\det = -5$.')],
    ['Estirar y voltear',
      xpMira('dibujo', 'Multiplicar una fila o intercambiar dos sí cambia el determinante.', { dib: estira, v: { k: 1, s: 0 }, alto: 210 }, [
        ['Esta A tiene det = 4. De la fila 1 a la fila 2 se gira en sentido antihorario.', {}],
        ['Multiplicar la fila 1 por 2 estira la figura al doble en esa dirección: el área y el det se duplican.', { k: 2 }],
        ['Con k = 3 el área se triplica. Multiplicar una fila por k multiplica el determinante por k.', { k: 3 }],
        ['Con k = −1 la flecha da media vuelta: misma área, pero el giro se invierte.', { k: -1 }],
        ['El signo del determinante dice la orientación: antihorario es +, horario es −.', {}],
        ['Intercambiar las filas también invierte el giro: el determinante solo cambia de signo.', { k: 1, s: 1 }, '$R_i \\leftrightarrow R_j$: $\\det \\to -\\det$'],
      ], 'Multiplicar una fila por k multiplica el determinante por k; intercambiar dos filas le cambia el signo.'),
      xpHaz('fichas', 'Pon al lado de cada operación de fila lo que le hace al determinante.', {
        slots: [0, 1, 2].map(i => ({ x: 252, y: 26 + i * 46, w: 110, h: 36 })), alto: 140,
        fondo: K => ['R₁ ↔ R₃', 'R₂ → 7R₂', 'R₃ → R₃ + 5R₁'].map((t, i) => K.t(16, 31 + i * 46, t, 's', 'start') + K.ar(140, 26 + i * 46, 180, 26 + i * 46, 'lm')).join(''),
        fichas: ['× 5', '× (−1)', '× 7', '× 1', '× (−7)'], meta: ['× (−1)', '× 7', '× 1'], pista: 'Intercambiar voltea, multiplicar una fila estira, y sumar un múltiplo de otra fila es una cizalla.' },
      'Intercambio: $\\times(-1)$. Fila por 7: $\\times 7$. Sumar $5R_1$: $\\times 1$, no cambia.')],
    ['Triangular llevando la cuenta',
      xpMira('dibujo', 'Con esas reglas, un determinante grande se calcula **triangulando**.', { dib: cuenta, v: { q: 0 }, alto: 200 }, [
        ['Se lleva la matriz a triangular con operaciones de fila y se anota el factor de cada una.', {}],
        ['Arriba a la izquierda hay un 0: se intercambian R₁ y R₂. El factor queda en −1.', { q: 1 }],
        ['R₃ − 3R₁ limpia la primera columna. Sumar un múltiplo no cambia nada: el factor sigue en −1.', { q: 2 }],
        ['R₃ + R₂ deja otro cero. Ya es triangular: ceros debajo de la diagonal.', { q: 3 }],
        ['El determinante de una triangular es el producto de su diagonal: 1 · 2 · (−1) = −2.', { q: 4 }],
        ['Ese −2 es det C por el factor −1. Se deshace el factor: det C = 2.', { q: 5 }, '$\\det C = \\dfrac{\\det U}{\\text{factor}} = \\dfrac{-2}{-1} = 2$'],
      ], 'Se triangula anotando los factores; el det de la triangular es el producto de la diagonal, y se divide entre los factores.'),
      xpHaz('fichas', 'Una matriz D llegó a la triangular U con R₁ ↔ R₃ y luego R₂ → R₂ − 4R₁. Pon det U y det D.', {
        slots: [{ x: 262, y: 44, w: 70, h: 36 }, { x: 262, y: 96, w: 70, h: 36 }], alto: 130,
        fondo: K => K.t(20, 24, 'U =', 's', 'start') + mat(K, 90, 70, [[1, 3, 0], [0, 2, 1], [0, 0, 5]], 's', 28, 24) + K.t(220, 49, 'det U', 's', 'end') + K.t(220, 101, 'det D', 's', 'end'),
        fichas: ['10', '−10', '40', '−40', '1'], meta: ['10', '−10'], pista: 'Multiplica la diagonal de U. El intercambio cambió el signo; restar 4R₁ no cambió nada.' },
      '$\\det U = 1 \\cdot 2 \\cdot 5 = 10$ y $\\det U = (-1)\\det D$, así que $\\det D = -10$.')],
    ['Productos y múltiplos',
      xpMira('dibujo', 'Las mismas reglas dan las propiedades de los **productos**.', { dib: grupo, v: { q: 0, k: 1 }, alto: 200 }, [
        ['Una operación de fila es multiplicar por una elemental E, y det(EA) = det E · det A.', {}],
        ['Igual con dos matrices: aplicar B y luego A multiplica el área por det B y luego por det A.', { q: 1 }, '$\\det(AB) = \\det A \\cdot \\det B$'],
        ['Multiplicar toda la matriz por k es multiplicar cada una de sus filas por k.', { q: 2, k: 1 }],
        ['En 3 × 3 son tres filas: det(2A) = 2³ det A. El cubo de lado 2 tiene 8 cubitos.', { k: 2 }],
        ['En general, det(kA) = kⁿ det A, con n el tamaño de A.', { k: 3 }, '$\\det(kA) = k^n \\det A$'],
        ['Si dos filas son proporcionales, restar una deja una fila de ceros: el determinante es 0.', { q: 3 }],
      ], '$\\det(AB) = \\det A \\det B$, $\\det(kA) = k^n \\det A$, y filas iguales o proporcionales dan $\\det = 0$.'),
      xpHaz('dibujo', 'A es de 2 × 2 y det A = 3. Desliza k hasta que det(kA) = 48.', {
        dib: cuadros, v: { k: 1 }, metas: { k: 4 }, alto: 230, manijas: [{ k: 'k', min: 1, max: 6, paso: 1, et: 'k' }],
        lee: v => `$\\det(${v.k}A) = ${v.k}^2 \\cdot 3 = ${3 * v.k * v.k}$`, pista: 'En 2 × 2 son dos filas: det(kA) = k² · 3. ¿Qué k² da 16?' },
      'En $2 \\times 2$, $\\det(kA) = k^2 \\det A$: $3k^2 = 48$ da $k^2 = 16$ y $k = 4$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un logo de área 5 pasa por una cizalla (det 1), un espejo (det −1) y un estiramiento al triple a lo ancho (det 3). Desliza el área con signo con que termina.', {
        dib: logo, v: { a: 0 }, metas: { a: -15 }, alto: 230, manijas: [{ k: 'a', min: -20, max: 20, paso: 1, et: 'área final' }],
        lee: v => `$\\text{área} = ${v.a < 0 ? `(${v.a})` : v.a}$`, pista: 'Cada transformación multiplica el área con signo por su determinante: 5 · 1 · (−1) · 3.' },
      'El área con signo es $5 \\cdot 1 \\cdot (-1) \\cdot 3 = -15$: el logo mide 15 y quedó volteado por el espejo.')],
  ], 'Cizalla: el det no cambia; estirar una fila lo multiplica; intercambiar le cambia el signo. Se triangula y se lleva la cuenta.');
}
;
//#archivo js/explora-gva-8.js
// Geometría Vectorial · explicación de geo-8 «Determinante e inversa» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20, hi = -1) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, j === hi ? `${cls} ta` : cls); }));
    return s;
  }
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const para = (K, O, u, c1, c2, cls) => K.p([[0, 0], c1, [c1[0] + c2[0], c1[1] + c2[1]], c2].map(([x, y]) => [O[0] + x * u, O[1] - y * u]), cls);
  const corchetes = (K, x0, x1, y0, y1) => K.pl([[x0 + 8, y0], [x0, y0], [x0, y1], [x0 + 8, y1]]) + K.pl([[x1 - 8, y0], [x1, y0], [x1, y1], [x1 - 8, y1]]);

  // Capítulo 1: el paralelogramo de las columnas se aplasta cuando det = 0, y las frases que dicen lo mismo.  v { b, k }
  const aplasta = (v, K) => {
    const O = [30, 188], u = 30, c1 = [3, 1], c2 = [v.b, 2], q = k(v), d = 3 * 2 - v.b * 1;
    let h = rej(K, O, u, 0, 10, 0, 3) + para(K, O, u, c1, c2, Math.abs(d) < 0.05 ? 'ff' : 'fa');
    h += K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr');
    h += K.t(20, 22, 'A =', 's', 'start') + mat(K, 74, 18, [[3, r1(v.b)], [1, 2]], 's', 26, 16);
    if (q >= 1) h += K.t(330, 22, `det A = ${r1(d)}`, 's ta', 'end');
    if (q === 2) h += K.t(330, 42, 'área ≠ 0: hay inversa', 's to', 'end');
    if (q >= 3) h += K.t(330, 42, 'área 0: sin inversa', 's tf', 'end');
    if (q === 4) h += K.t(330, 62, 'Ax = b: o ninguna o infinitas', 's tm', 'end');
    if (q === 5) h += K.t(330, 62, 'Ax = 0 tiene más soluciones', 's tm', 'end');
    return h;
  };
  // Capítulo 1, tu turno: el k que aplasta A = [k 5; 2 2].  v { k }
  const anula = (v, K) => {
    const O = [40, 176], u = 16, c1 = [v.k, 2], c2 = [5, 2], d = 2 * v.k - 10;
    return rej(K, O, u, -2, 10, 0, 4) + para(K, O, u, c1, c2, d === 0 ? 'ff' : 'fa') + K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr')
      + K.t(20, 30, 'A =', 's', 'start') + mat(K, 74, 26, [[v.k, 5], [2, 2]], 's') + K.t(330, 30, `det A = ${r1(d)}`, 's ta', 'end');
  };

  // Capítulo 2: A triplica áreas y A⁻¹ las divide entre 3.  v { k }
  const areas = (v, K) => {
    const q = k(v), s = [30, 30 * Math.sqrt(3), 30, 30][Math.min(q, 3)];
    let h = K.p([[60, 150], [90, 150], [90, 120], [60, 120]], 'fa') + K.t(75, 170, 'área 1', 's tm');
    if (q >= 1) h += K.ar(104, 135, 140, 135, 'lm') + K.t(122, 126, 'A', 's') + K.p([[150, 150], [150 + 30 * 3, 150], [150 + 30 * 3, 120], [150, 120]], 'fg') + K.t(195, 170, 'área 3', 's tm');
    if (q >= 2) h += K.ar(250, 135, 282, 135, 'lm') + K.t(266, 126, 'A⁻¹', 's') + K.p([[290, 150], [290 + s, 150], [290 + s, 120], [290, 120]], 'fo') + K.t(305, 170, 'área 1', 's to');
    if (q >= 3) h += K.t(170, 50, 'det A · det A⁻¹ = det I = 1', 'ta');
    if (q >= 4) h += K.t(170, 82, 'det A⁻¹ = 1 / det A', 's');
    if (q >= 5) h += K.t(170, 104, 'si det A = −2, det A⁻¹ = −½: también voltea', 's tm');
    return h;
  };

  // Capítulo 3: cofactores, tablero de signos, transpuesta y A⁻¹ = adj A / det A, con A = [3 1; 5 2].  v { k }
  const AJ = [[3, 1], [5, 2]];
  const adjunta = (v, K) => {
    const q = k(v);
    let h = K.t(20, 40, 'A =', 's', 'start') + mat(K, 76, 36, AJ, 's');
    if (q >= 1) h += K.t(170, 22, 'signos', 's tm') + mat(K, 170, 50, [['+', '−'], ['−', '+']], 's ta');
    if (q >= 2) h += K.t(270, 22, 'cofactores', 's tm') + mat(K, 270, 50, [[2, -5], [-1, 3]], 's');
    if (q >= 3) h += K.t(80, 102, 'adj A = transpuesta', 's tm') + mat(K, 80, 132, [[2, -1], [-5, 3]], 's ta');
    if (q >= 4) h += K.t(250, 136, 'A · adj A = (det A) I', 's');
    if (q >= 5) h += K.t(250, 166, 'A⁻¹ = adj A / det A', 's ta') + K.t(250, 186, 'aquí det A = 1', 's tm');
    return h;
  };

  // Capítulo 4: Cramer con x + 2y = 8, 3x − y = 3.  v { k }
  const CA = [[1, 2], [3, -1]], CB = [8, 3];
  const cramer = (v, K) => {
    const q = k(v);
    let h = K.t(20, 30, 'x + 2y = 8', 's', 'start') + K.t(20, 52, '3x − y = 3', 's', 'start');
    if (q >= 1) h += K.t(220, 22, 'A', 's tm') + mat(K, 220, 50, CA, 's') + K.t(330, 54, 'det = −7', 's ta', 'end');
    if (q >= 2) h += K.t(80, 98, 'A₁: b en la columna 1', 's tm') + mat(K, 80, 128, [[8, 2], [3, -1]], 's', 26, 20, 0);
    if (q >= 3) h += K.t(80, 172, 'det = −14 → x = 2', 's ta');
    if (q >= 4) h += K.t(250, 98, 'A₂: b en la columna 2', 's tm') + mat(K, 250, 128, [[1, 8], [3, 3]], 's', 26, 20, 1) + K.t(250, 172, 'det = −21 → y = 3', 's ta');
    if (q >= 5) h += K.t(170, 196, 'en 3 × 3 igual: x, y, z con A₁, A₂, A₃', 's tm');
    return h;
  };

  // Problema: dos jugos.  v { x, y }
  const PA = [[2, 1], [1, 3]], PO = [40, 196], PU = 26;
  const jugos = (v, K) => {
    let h = rej(K, PO, PU, 0, 6, 0, 6) + K.t(PO[0] + 6 * PU, PO[1] + 18, 'grande (miles)', 's tm', 'end') + K.t(PO[0] - 8, PO[1] - 6 * PU - 12, 'pequeño (miles)', 's tm', 'start');
    h += K.l(PO[0] + v.x * PU, PO[1], PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d') + K.l(PO[0], PO[1] - v.y * PU, PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d');
    const a = 2 * v.x + v.y, b = v.x + 3 * v.y;
    return h + K.t(330, 40, 'det A = 5', 's ta', 'end') + K.t(330, 60, 'det A₁ = 20, det A₂ = 15', 's tm', 'end')
      + K.t(226, 120, `Ana: ${a} de 11`, `s ${a === 11 ? 'to' : 'tm'}`, 'start') + K.t(226, 142, `Beto: ${b} de 13`, `s ${b === 13 ? 'to' : 'tm'}`, 'start');
  };

  xpLec('geo-8', [
    ['Invertible si y solo si det A ≠ 0',
      xpMira('dibujo', 'Una matriz tiene inversa justo cuando su **determinante** no es cero.', { dib: aplasta, v: { b: 1, k: 0 }, alto: 200 }, [
        ['Las columnas de A forman un paralelogramo. Su área con signo es det A.', {}],
        ['Aquí det A = 3 · 2 − 1 · 1 = 5: A agranda las áreas 5 veces.', { k: 1 }],
        ['Mientras el área no sea cero, A se puede deshacer: tiene inversa.', { k: 2 }],
        ['Si la segunda columna gira hasta (6, 2), queda en la recta de la primera y det A = 0.', { b: 6, k: 3 }],
        ['Entonces A x = b ya no tiene solución única: o no hay ninguna o hay infinitas.', { k: 4 }],
        ['Y A x = 0 tiene soluciones además de x = 0. Todas estas frases dicen lo mismo.', { k: 5 }, '$A^{-1} \\text{ existe} \\iff \\det A \\neq 0$'],
      ], 'A es invertible si y solo si $\\det A \\neq 0$: solución única, solo la trivial en $A\\vec x = \\vec 0$ y columnas que no se aplastan.'),
      xpHaz('dibujo', 'Desliza k hasta que A = [k 5; 2 2] no tenga inversa: que las dos columnas queden en la misma recta.', {
        dib: anula, v: { k: 1 }, metas: { k: 5 }, alto: 230, manijas: [{ k: 'k', min: -2, max: 9, paso: 1, et: 'k' }],
        lee: v => `$\\det A = ${v.k < 0 ? `(${v.k})` : v.k} \\cdot 2 - 5 \\cdot 2 = ${2 * v.k - 10}$`, pista: 'Escribe det A = 2k − 10 y busca el k que lo vuelve cero.' },
      'Con $k = 5$: $\\det A = 10 - 10 = 0$ y las dos columnas son iguales.')],
    ['El determinante de la inversa',
      xpMira('dibujo', 'Si A agranda las áreas, su inversa las tiene que **encoger** lo mismo.', { dib: areas, v: { k: 0 }, alto: 200 }, [
        ['Empieza con un cuadrado de área 1.', {}],
        ['Una A con det A = 3 lo vuelve una figura de área 3.', { k: 1 }],
        ['A⁻¹ deshace a A: devuelve la figura al área 1. Así que divide las áreas entre 3.', { k: 2 }],
        ['Hacer A y luego A⁻¹ es la identidad, que no cambia áreas: los determinantes se multiplican y dan 1.', { k: 3 }],
        ['Por eso el determinante de la inversa es el recíproco del de A.', { k: 4 }, '$\\det A^{-1} = \\dfrac{1}{\\det A}$'],
        ['El signo se conserva: si A voltea la figura, A⁻¹ también, para dejarla derecha.', { k: 5 }],
      ], 'Como $\\det A \\cdot \\det A^{-1} = \\det I = 1$, el determinante de la inversa es $\\tfrac{1}{\\det A}$, con el mismo signo.'),
      xpHaz('fichas', 'Pon al lado de cada det A el determinante de su inversa.', {
        slots: [0, 1, 2].map(i => ({ x: 250, y: 26 + i * 46, w: 70, h: 36 })), alto: 140,
        fondo: K => ['det A = 5', 'det A = −2', 'det A = ½'].map((t, i) => K.t(20, 31 + i * 46, t, 's', 'start') + K.ar(130, 26 + i * 46, 196, 26 + i * 46, 'lm') + K.t(163, 18 + i * 46, 'det A⁻¹', 's tm')).join(''),
        fichas: ['⅕', '−½', '2', '−5', '½', '−2'], meta: ['⅕', '−½', '2'], pista: 'El recíproco de un número da 1 al multiplicarlo por él, y conserva el signo.' },
      '$\\tfrac{1}{5}$, $-\\tfrac{1}{2}$ y $2$: cada uno por su det A da 1.')],
    ['La adjunta',
      xpMira('dibujo', 'Hay una fórmula para la inversa: la **adjunta** dividida entre el determinante.', { dib: adjunta, v: { k: 0 }, alto: 200 }, [
        ['En A = [3 1; 5 2], tapa la fila y la columna de una entrada: lo que queda es su menor.', {}],
        ['Cada menor lleva el signo de su casilla, como en un tablero: + − arriba y − + abajo.', { k: 1 }],
        ['Menor con su signo es el cofactor. Aquí los cofactores son 2, −5, −1 y 3.', { k: 2 }],
        ['La adjunta es la matriz de cofactores transpuesta: las filas pasan a ser columnas.', { k: 3 }],
        ['Al multiplicar A por su adjunta sale det A en la diagonal y ceros fuera.', { k: 4 }],
        ['Por eso A⁻¹ = adj A dividida entre det A. En 3 × 3 es igual, con menores 2 × 2.', { k: 5 }, '$A^{-1} = \\dfrac{1}{\\det A}\\operatorname{adj} A$'],
      ], 'La adjunta es la transpuesta de los cofactores (signos + − +) y $A^{-1} = \\tfrac{1}{\\det A}\\operatorname{adj} A$.'),
      xpHaz('fichas', 'Arma la adjunta de A = [2 5; 1 4]. Sus cofactores son C₁₁ = 4, C₁₂ = −1, C₂₁ = −5 y C₂₂ = 2.', {
        slots: [{ x: 214, y: 46, w: 50, h: 36 }, { x: 278, y: 46, w: 50, h: 36 }, { x: 214, y: 92, w: 50, h: 36 }, { x: 278, y: 92, w: 50, h: 36 }], alto: 124,
        fondo: K => K.t(20, 72, 'A =', 's', 'start') + mat(K, 76, 68, [[2, 5], [1, 4]], 's') + K.t(176, 75, 'adj A =', 's', 'end') + corchetes(K, 182, 310, 24, 114),
        fichas: ['4', '−5', '−1', '2', '5', '1'], meta: ['4', '−5', '−1', '2'], pista: 'Transponer: C₁₂ baja a la fila 2 y C₂₁ sube a la fila 1.' },
      '$\\operatorname{adj} A = \\begin{pmatrix} 4 & -5 \\\\ -1 & 2 \\end{pmatrix}$; con $\\det A = 3$, $A^{-1} = \\tfrac{1}{3}\\operatorname{adj} A$.')],
    ['La regla de Cramer',
      xpMira('dibujo', 'Con determinantes también se resuelve un sistema, incógnita por incógnita.', { dib: cramer, v: { k: 0 }, alto: 210 }, [
        ['Un sistema de dos ecuaciones: x + 2y = 8 y 3x − y = 3.', {}],
        ['Su matriz de coeficientes tiene det A = −1 − 6 = −7, que no es cero: hay una sola solución.', { k: 1 }],
        ['Para x, la columna de x se cambia por los resultados 8 y 3. Esa es A₁.', { k: 2 }],
        ['x es det A₁ entre det A: −14 entre −7, que da 2.', { k: 3 }],
        ['Para y se cambia la segunda columna: det A₂ = −21, y y = −21 / −7 = 3.', { k: 4 }, '$x_i = \\dfrac{\\det A_i}{\\det A}$'],
        ['Con tres incógnitas es igual: cada una con su columna cambiada, entre det A.', { k: 5 }],
      ], 'Regla de Cramer: si $\\det A \\neq 0$, $x_i = \\tfrac{\\det A_i}{\\det A}$, con $A_i$ = A con la columna i cambiada por $\\vec b$.'),
      xpHaz('fichas', 'Para 2x + y = 7 y x + 3y = 11, arma A₂: la matriz de Cramer de y.', {
        slots: [{ x: 214, y: 46, w: 50, h: 36 }, { x: 278, y: 46, w: 50, h: 36 }, { x: 214, y: 92, w: 50, h: 36 }, { x: 278, y: 92, w: 50, h: 36 }], alto: 124,
        fondo: K => K.t(20, 60, '2x + y = 7', 's', 'start') + K.t(20, 86, 'x + 3y = 11', 's', 'start') + K.t(176, 75, 'A₂ =', 's', 'end') + corchetes(K, 182, 310, 24, 114),
        fichas: ['2', '7', '1', '11', '3'], meta: ['2', '7', '1', '11'], pista: 'La columna de x se queda igual; la de y se cambia por los resultados 7 y 11.' },
      '$A_2 = \\begin{pmatrix} 2 & 7 \\\\ 1 & 11 \\end{pmatrix}$: $\\det A_2 = 15$, $\\det A = 5$ y $y = 3$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Ana pagó 11 mil por 2 jugos grandes y 1 pequeño; Beto, 13 mil por 1 grande y 3 pequeños. Con los determinantes de Cramer, marca el precio de cada jugo.', {
        dib: jugos, v: { x: 0, y: 0 }, metas: { x: 4, y: 3 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, en: v => [PO[0] + v.x * PU, PO[1] - v.y * PU], de: (x, y) => [(x - PO[0]) / PU, (PO[1] - y) / PU] }],
        lee: v => `$A ${pm([[v.x], [v.y]])} = ${pm([[2 * v.x + v.y], [v.x + 3 * v.y]])}$`, pista: 'El grande es det A₁ / det A y el pequeño, det A₂ / det A.' },
      'Grande: $\\tfrac{20}{5} = 4$ mil; pequeño: $\\tfrac{15}{5} = 3$ mil. Ana: $8 + 3 = 11$; Beto: $4 + 9 = 13$.')],
  ], 'Inversa si y solo si $\\det A \\neq 0$; $\\det A^{-1} = \\tfrac{1}{\\det A}$, la adjunta da $A^{-1}$ y Cramer resuelve con determinantes.');
}
;
//#archivo js/explora-gva-9.js
// Geometría Vectorial · explicación de geo-9 «Vectores libres y sus operaciones» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: un vector es una flecha que se traslada; sumar es encadenar, restar es ir de punta a punta, un escalar
// estira o voltea, y la ley del coseno mide la suma. Sin coordenadas (geo-11). Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const pl = (B, ox, oy, u) => ({ ...B, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const sum = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const rot = (K, A, B, s, cls, lado = 1) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * 13, (A[1] + B[1]) / 2 - lado * dx / L * 13 + 4, s, `s ${cls}`);
  };
  const fl = (K, A, B, cls, s, tc, lado) => K.ar(A[0], A[1], B[0], B[1], cls) + (s ? rot(K, A, B, s, tc, lado) : '');
  const sg = n => String(n).replace('-', '−');

  // 1 · una flecha con rumbo: magnitud, dirección, sentido, vector libre, opuesto y nulo
  const A1 = [96, 150], U1 = 22;
  const at = (c, m, g) => [c[0] + m * U1 * Math.cos(g * R), c[1] - m * U1 * Math.sin(g * R)];
  const rumbo = (v, K) => {
    const B = at(A1, 3 * v.m, 30);
    let h = K.l(A1[0], A1[1], A1[0] + 90, A1[1], 'lm d') + K.c(A1[0], A1[1], 4, 'fk') + K.t(A1[0] - 8, A1[1] + 14, 'A', 's', 'end');
    h += K.ar(A1[0], A1[1], B[0], B[1], 'la gr') + K.f(v.m, K.t(B[0] + 6, B[1] - 4, 'B', 's', 'start'));
    h += K.f(v.mag, rot(K, A1, B, '3', 'ta', 1)) + K.f(v.arc, K.arc(A1[0], A1[1], 30, 0, 30, 'la') + K.t(A1[0] + 46, A1[1] - 6, '30°', 's ta', 'start'));
    h += K.f(v.cp, [[[180, 70]], [[210, 200]], [[40, 60]]].map(([c]) => K.ar(c[0], c[1], ...at(c, 3, 30), 'lg gr')).join('') + K.t(250, 60, 'el mismo u', 's tg', 'start'));
    const Q = [312, 128];
    return h + K.f(v.op, K.ar(Q[0], Q[1], ...at(Q, 3, 210), 'lf gr') + K.t(Q[0] - 24, Q[1] + 48, '−u', 's tf'))
      + K.f(v.nul, K.c(300, 210, 5, 'fA') + K.t(290, 214, 'nulo', 's tm', 'end'));
  };
  const RH = { x: 170, y: 124, u: 24 };
  const pRh = v => [RH.x + v.m * RH.u * Math.cos(v.g * R), RH.y - v.m * RH.u * Math.sin(v.g * R)];
  const rueda = (v, K) => {
    let h = '';
    for (let k = 1; k <= 4; k++) h += K.arc(RH.x, RH.y, k * RH.u, 0, 360, 'ls');
    h += K.l(RH.x, RH.y, RH.x + 4 * RH.u + 8, RH.y, 'lm d') + K.t(RH.x + 4 * RH.u + 12, RH.y + 4, '0°', 's tm', 'start') + K.t(RH.x, RH.y - 4 * RH.u - 8, '90°', 's tm')
      + K.t(RH.x - 4 * RH.u - 10, RH.y + 4, '180°', 's tm', 'end') + K.t(RH.x, RH.y + 4 * RH.u + 18, '270°', 's tm');
    const T = pRh(v);
    return h + K.c(RH.x, RH.y, 4, 'fk') + K.ar(RH.x, RH.y, T[0], T[1], 'la gr') + K.t(8, 18, `${v.g}°, magnitud ${v.m}`, 's ta', 'start');
  };

  // 2 · sumar es encadenar
  const P2a = pl({ x0: 0, x1: 14, y0: 0, y1: 8 }, 16, 206, 22);
  const OU = [1, 1], UU = [4, 1], VV = [1, 3], VL = [9, 4];
  const sumar = (v, K) => {
    const O = P2(P2a, OU), Ut = P2(P2a, sum(OU, UU)), c = [VL[0] + (OU[0] + UU[0] - VL[0]) * v.tr, VL[1] + (OU[1] + UU[1] - VL[1]) * v.tr], Vc = P2(P2a, c), Vt = P2(P2a, sum(c, VV)), S = P2(P2a, sum(sum(OU, UU), VV));
    let h = pap(K, P2a) + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end');
    h += K.f(v.par, K.ar(O[0], O[1], ...P2(P2a, sum(OU, VV)), 'lf d') + K.ar(...P2(P2a, sum(OU, VV)), ...S, 'lg d'));
    h += fl(K, O, Ut, 'lg gr', 'u', 'tg', -1) + fl(K, Vc, Vt, 'lf gr', 'v', 'tf', -1);
    return h + K.f(v.s, fl(K, O, S, 'la gr', 'u + v', 'ta', 1));
  };
  const HA = { O: [2, 3], a: [3, -1], b: [2, 4], La: [9, 7], Lb: [11, 1] };
  const finH = sum(sum(HA.O, HA.a), HA.b);
  const hazSuma = (v, K) => {
    const O = P2(P2a, HA.O), F = P2(P2a, [v.x, v.y]);
    return pap(K, P2a) + fl(K, P2(P2a, HA.La), P2(P2a, sum(HA.La, HA.a)), 'lg gr', 'a', 'tg') + fl(K, P2(P2a, HA.Lb), P2(P2a, sum(HA.Lb, HA.b)), 'lf gr', 'b', 'tf')
      + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end') + (v.x !== HA.O[0] || v.y !== HA.O[1] ? K.ar(O[0], O[1], F[0], F[1], 'la gr d') : '');
  };

  // 3 · restar y estirar
  const P3 = pl({ x0: 0, x1: 14, y0: 0, y1: 8 }, 16, 206, 22);
  const O3 = [1, 3], U3 = [5, 1], V3 = [2, 4], W3 = [2, 1], C3 = [10, 4];
  const resta = (v, K) => {
    const O = P2(P3, O3), Ut = P2(P3, sum(O3, U3)), Vt = P2(P3, sum(O3, V3)), Mv = P2(P3, sum(sum(O3, U3), [-V3[0], -V3[1]]));
    let h = pap(K, P3) + K.c(O[0], O[1], 4, 'fk') + fl(K, O, Ut, 'lg gr', 'u', 'tg', -1) + fl(K, O, Vt, 'lf gr', 'v', 'tf', 1);
    h += K.f(v.op, fl(K, Ut, Mv, 'lf d', '−v', 'tf', 1) + K.ar(O[0], O[1], Mv[0], Mv[1], 'la d'));
    h += K.f(v.d, fl(K, Vt, Ut, 'la gr', 'u − v', 'ta', 1));
    const C = P2(P3, C3), E = P2(P3, [C3[0] + v.k * W3[0], C3[1] + v.k * W3[1]]), Wt = P2(P3, sum(C3, W3));
    return h + K.f(v.kw, K.c(C[0], C[1], 4, 'fk') + K.ar(C[0], C[1], Wt[0], Wt[1], 'lm gr') + (Math.abs(v.k) > 0.05 ? K.ar(C[0], C[1], E[0], E[1], 'lo gr') : '')
      + K.t(332, 18, `${sg(Math.round(v.k * 10) / 10)}·w`, 's to', 'end') + K.t(Wt[0] + 4, Wt[1] - 8, 'w', 's tm', 'start'));
  };
  const HR = { O: [3, 2], u: [4, 2], v: [1, 3] };
  const hazResta = (v, K) => {
    const O = P2(P3, HR.O), D = P2(P3, [v.x, v.y]);
    return pap(K, P3) + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end') + fl(K, O, P2(P3, sum(HR.O, HR.u)), 'lg gr', 'u', 'tg', -1) + fl(K, O, P2(P3, sum(HR.O, HR.v)), 'lf gr', 'v', 'tf', 1)
      + (v.x !== HR.O[0] || v.y !== HR.O[1] ? K.ar(O[0], O[1], D[0], D[1], 'la gr') + K.t(D[0] + 6, D[1] - 6, 'D', 's ta', 'start') : '');
  };

  // 4 · la medida de una suma: u de 4 y v de 3, con el ángulo θ entre ellos
  const O4 = [60, 178], S4 = 22;
  const medida = (v, K) => {
    const A = [O4[0] + 4 * S4, O4[1]], E = [A[0] + 3 * S4 * Math.cos(v.th * R), A[1] - 3 * S4 * Math.sin(v.th * R)], m = Math.sqrt(25 + 24 * Math.cos(v.th * R));
    let h = K.l(A[0], A[1], A[0] + 60, A[1], 'lm d') + fl(K, O4, A, 'lg gr', 'u: 4', 'tg', -1) + fl(K, A, E, 'lf gr', 'v: 3', 'tf', v.th > 90 ? -1 : 1);
    if (v.th > 1) h += K.arc(A[0], A[1], 18, 0, v.th, 'lf') + K.t(A[0] + 34, A[1] + 16, `θ = ${Math.round(v.th)}°`, 's tf', 'start');
    h += K.f(v.ang * (v.th > 1 && v.th < 179 ? 1 : 0), K.arc(A[0], A[1], 26, v.th, 180, 'la') + K.t(A[0] - 30, A[1] - 22, `${Math.round(180 - v.th)}°`, 's ta', 'end'));
    return h + (m > 0.05 ? K.ar(O4[0], O4[1], E[0], E[1], 'la gr') : '') + K.t(332, 18, `|u + v| = ${(Math.round(m * 100) / 100).toString()}`, 's ta', 'end');
  };
  const HM = { a: 7, b: 15, th: 120, s: 9.5, O: [100, 180] };
  const hazMedida = (v, K) => {
    const { a, b, th, s, O } = HM, A = [O[0] + a * s, O[1]], B = [O[0] + b * s * Math.cos(th * R), O[1] - b * s * Math.sin(th * R)], C = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]];
    return K.l(A[0], A[1], C[0], C[1], 'lm d') + K.l(B[0], B[1], C[0], C[1], 'lm d') + K.ang(O, A, B, 16, '120°', 'fn', 's tm')
      + fl(K, O, A, 'lg gr', '7', 'tg', -1) + fl(K, O, B, 'lf gr', '15', 'tf', 1) + K.ar(O[0], O[1], C[0], C[1], 'la gr') + K.t(C[0] + 8, C[1] - 4, '?', 'ta', 'start')
      + K.t(332, 18, `tu medida: ${v.r}`, 's ta', 'end');
  };

  // Problema: el avión y el viento cruzado
  const avion = (v, K) => {
    const O = [90, 200], N = [90, 80], E = [140, 80];
    return K.ar(O[0], O[1], N[0], N[1], 'lg gr') + rot(K, O, N, '120', 'tg', 1) + K.ar(N[0], N[1], E[0], E[1], 'lf gr') + K.t(115, 70, '50', 's tf')
      + K.pl([[90, 92], [102, 92], [102, 80]], 'lm') + K.ar(O[0], O[1], E[0], E[1], 'la gr d') + K.t(140, 150, '?', 'ta', 'start')
      + K.t(332, 40, 'propia: norte', 's tg', 'end') + K.t(332, 60, 'viento: este', 's tf', 'end') + K.t(332, 96, `${v.r} km/h`, 'ta', 'end');
  };

  xpLec('geo-9', [
    ['Una flecha con rumbo',
      xpMira('dibujo', 'Hay cantidades que no se dicen con un solo número: un desplazamiento necesita **cuánto** y **hacia dónde**.', { dib: rumbo, v: { m: 0, mag: 0, arc: 0, cp: 0, op: 0, nul: 0 }, alto: 236 }, [
        ['Un desplazamiento no es solo «cuánto»: importa hacia dónde. Se dibuja como una flecha de A a B.', { m: 1 }],
        ['Su magnitud es el largo de la flecha: aquí, 3 cuadros, que en el mapa son 3 km.', { mag: 1 }, '$\\|\\overrightarrow{AB}\\| = 3$'],
        ['Su dirección es el ángulo que gira desde la horizontal derecha, contra las agujas del reloj.', { arc: 1 }, '$\\operatorname{dir}(\\overrightarrow{AB}) = 30^{\\circ}$'],
        ['Ese ángulo va de 0° a menos de 360°. El sentido lo marca la punta: va de A hacia B.', {}],
        ['Con la misma magnitud y dirección, dos flechas son el mismo vector u, estén donde estén: un vector libre.', { cp: 1 }],
        ['El opuesto −u mide lo mismo y apunta al revés: 30° + 180° = 210°. El vector nulo no tiene largo.', { op: 1, nul: 1 }, '$\\operatorname{dir}(-\\vec u) = 210^{\\circ}$'],
      ], 'Un vector es una flecha con magnitud, dirección (de 0° a 360°, contra las agujas) y sentido; se puede trasladar.'),
      xpHaz('dibujo', 'Arrastra la punta para dibujar una flecha de magnitud **2** y dirección **300°**.', { dib: rueda, v: { g: 90, m: 3 }, metas: { g: 300, m: 2 }, alto: 248,
        manijas: [{ k: ['g', 'm'], min: [0, 1], max: [345, 4], paso: [15, 1], en: v => pRh(v),
          de: (x, y) => { let g = (Math.atan2(RH.y - y, x - RH.x) / R + 360) % 360; if (g > 352.5) g = 0; return [g, Math.hypot(x - RH.x, y - RH.y) / RH.u]; } }],
        lee: v => `$\\operatorname{dir} = ${v.g}^{\\circ}$, magnitud $${v.m}$`,
        dice: v => (v.g === 300 && v.m === 2 ? 'Justo: 300° es 60° antes de dar la vuelta, abajo a la derecha.' : v.g === 60 ? 'Ese es 60°: giraste con las agujas del reloj.' : v.g === 300 ? 'La dirección está bien; ahora el largo.' : 'Gira desde 0° contra las agujas hasta 300°.') },
        '300° queda a 60° de completar la vuelta: abajo y a la derecha.')],
    ['Sumar es encadenar',
      xpMira('dibujo', 'Primero un tramo y después otro: ¿a dónde se llega? **Sumar** vectores es encadenarlos.', { dib: sumar, v: { tr: 0, s: 0, par: 0 }, alto: 226 }, [
        ['Dos tramos: primero u y después v. La flecha v está suelta, pero se puede trasladar.', {}],
        ['Regla del triángulo: se pone la cola de v en la punta de u.', { tr: 1 }],
        ['La suma u + v va de la primera cola a la última punta: es el desplazamiento total.', { s: 1 }, '$\\vec u + \\vec v$'],
        ['Si primero va v y luego u, se llega al mismo punto: la suma es conmutativa.', { par: 1 }, '$\\vec u + \\vec v = \\vec v + \\vec u$'],
        ['Con las colas juntas, la suma es la diagonal del paralelogramo: la regla del paralelogramo.', {}],
        ['Con más tramos se encadenan todos, y agruparlos de otra forma no cambia el final: es asociativa.', {}, '$(\\vec u + \\vec v) + \\vec w = \\vec u + (\\vec v + \\vec w)$'],
        ['Sumar el nulo no cambia nada, y u más su opuesto vuelve a la salida.', {}, '$\\vec u + \\vec 0 = \\vec u, \\quad \\vec u + (-\\vec u) = \\vec 0$'],
      ], 'Para sumar, la cola del segundo en la punta del primero; la suma va de la primera cola a la última punta.'),
      xpHaz('dibujo', 'Arrastra el punto hasta donde llega $\\vec a + \\vec b$ saliendo de **O**.', { dib: hazSuma, v: { x: 2, y: 3 }, metas: { x: finH[0], y: finH[1] }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [14, 8], paso: 1, en: v => P2(P2a, [v.x, v.y]), de: (x, y) => [(x - 16) / 22, (206 - y) / 22] }],
        lee: v => `Tu flecha de $O$ al punto; $\\vec a + \\vec b$ ${v.x === finH[0] && v.y === finH[1] ? 'llega ahí' : 'llega a otro lado'}`,
        dice: v => (v.x === finH[0] && v.y === finH[1] ? 'Ahí termina: la cola de b va en la punta de a.' : 'Ese no es el final: traslada a desde O y luego b desde la punta de a.') },
        'Desde O se recorre a y desde su punta, b: la suma va de O a la última punta.')],
    ['Restar y estirar',
      xpMira('dibujo', 'Restar es sumar el opuesto, y multiplicar por un número estira, encoge o voltea la flecha.', { dib: resta, v: { op: 0, d: 0, kw: 0, k: 1 }, alto: 226 }, [
        ['Restar es sumar el opuesto: u − v = u + (−v). Se pone −v en la punta de u.', { op: 1 }, '$\\vec u - \\vec v = \\vec u + (-\\vec v)$'],
        ['Con las colas juntas, u − v va de la punta de v a la punta de u.', { d: 1 }],
        ['Se comprueba con la regla del triángulo: v más esa flecha llega a la punta de u.', {}, '$\\vec v + (\\vec u - \\vec v) = \\vec u$'],
        ['Un escalar estira: 2w mide el doble y conserva la dirección y el sentido.', { kw: 1, k: 2 }, '$\\|2\\vec w\\| = 2\\|\\vec w\\|$'],
        ['Con un número entre 0 y 1 se encoge: la mitad de w mide la mitad.', { k: 0.5 }],
        ['Con un número negativo se voltea: −w apunta al revés. Todas son paralelas a w.', { k: -1 }, '$k\\vec w \\parallel \\vec w$'],
      ], 'u − v va de la punta de v a la de u; k·u estira o encoge, y si k < 0 voltea: k·u es paralelo a u.'),
      xpHaz('dibujo', 'Arrastra **D** para que la flecha de **O** a **D** sea $\\vec u - \\vec v$.', { dib: hazResta, v: { x: 3, y: 2 }, metas: { x: 6, y: 1 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [14, 8], paso: 1, en: v => P2(P3, [v.x, v.y]), de: (x, y) => [(x - 16) / 22, (206 - y) / 22] }],
        lee: v => (v.x === 6 && v.y === 1 ? '$\\vec v + \\overrightarrow{OD} = \\vec u$' : 'La flecha de $O$ a $D$ todavía no es $\\vec u - \\vec v$'),
        dice: v => (v.x === 6 && v.y === 1 ? 'Sí: es la flecha de la punta de v a la de u, trasladada a O.' : v.x === 0 && v.y === 3 ? 'Esa es v − u: apunta al revés.' : 'Busca la flecha que va de la punta de v a la de u y trasládala a O.') },
        'u − v es la flecha de la punta de v a la punta de u; trasladada a O, termina en D.')],
    ['La medida de una suma',
      xpMira('dibujo', '¿Cuánto mide una suma? Depende del **ángulo** entre las flechas.', { dib: medida, v: { th: 90, ang: 0 }, alto: 226 }, [
        ['Si u y v forman ángulo recto, la suma es la hipotenusa: con 4 y 3, mide 5.', { th: 90 }, '$\\sqrt{4^2 + 3^2} = 5$'],
        ['Si el ángulo θ entre ellas se cierra, la suma se alarga. Con 60° mide más que 5.', { th: 60 }],
        ['En el triángulo de la regla, el ángulo entre los tramos no es θ: es su suplemento, 180° − θ.', { ang: 1 }, '$180^{\\circ} - 60^{\\circ} = 120^{\\circ}$'],
        ['La ley del coseno con ese ángulo da la fórmula de la suma, con un signo más.', {}, '$\\|\\vec u + \\vec v\\|^2 = 16 + 9 + 2 \\cdot 12 \\cos 60^{\\circ} = 37$'],
        ['Si apuntan igual, θ = 0°, las magnitudes se suman: 4 + 3 = 7.', { th: 0, ang: 0 }, '$16 + 9 + 24 = 49$'],
        ['Si apuntan al revés, θ = 180°, se restan: 4 − 3 = 1. La fórmula también lo dice.', { th: 180 }, '$16 + 9 - 24 = 1$'],
      ], 'Con θ entre u y v: |u + v|² = |u|² + |v|² + 2|u||v| cos θ, la ley del coseno con el ángulo 180° − θ.'),
      xpHaz('dibujo', 'Dos vectores de **7** y **15** forman un ángulo de **120°**. Ajusta la magnitud de su suma.', { dib: hazMedida, v: { r: 1 }, metas: { r: 13 }, alto: 248,
        manijas: [{ k: 'r', min: 1, max: 22, paso: 1, et: 'magnitud de la suma' }],
        lee: v => `$49 + 225 + 2 \\cdot 105 \\cos 120^{\\circ} = 169$; tu medida al cuadrado: $${v.r * v.r}$`,
        dice: v => (v.r === 13 ? 'Justo: 49 + 225 − 105 = 169, y su raíz es 13.' : v.r === 22 ? 'Esa es 7 + 15: solo si apuntaran igual.' : 'Calcula 7² + 15² + 2·7·15·cos 120° y saca la raíz.') },
        'cos 120° = −½, así que la suma mide √(49 + 225 − 105) = √169 = 13.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un avión vuela al norte a **120 km/h** respecto al aire y el viento sopla al este a **50 km/h**. Ajusta su rapidez respecto al suelo.', { dib: avion, v: { r: 0 }, metas: { r: 130 }, alto: 260,
        manijas: [{ k: 'r', min: 0, max: 200, paso: 10, et: 'rapidez respecto al suelo, km/h' }],
        lee: v => `$\\sqrt{120^2 + 50^2} = \\sqrt{16\\,900}$; tu valor: $${v.r}$`,
        dice: v => (v.r === 130 ? 'Justo: √(120² + 50²) = 130. El viento lo desvía un poco al este.' : v.r === 170 ? 'Esa es 120 + 50: solo si el viento soplara hacia el norte.' : 'El viento forma ángulo recto con el avión: busca la hipotenusa.') },
        'La velocidad respecto al suelo es la suma de flechas: √(120² + 50²) = 130 km/h.')],
  ], 'Un vector es una flecha libre: se suma encadenando, se resta de punta a punta y la ley del coseno mide la suma.');
}
;
//#archivo js/explora-gva-10.js
// Geometría Vectorial · explicación de geo-10 «Vectores en la geometría euclidiana» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios. Sin coordenadas: la cuadrícula solo es papel.
{
  const k = v => Math.round(v.k || 0);
  const plano = (ox, oy, u) => ({ X: x => ox + x * u, Y: y => oy - y * u, P: q => [ox + q[0] * u, oy - q[1] * u], u, ox, oy });
  const papel = (K, P, nx, ny) => {
    let h = '';
    for (let x = 0; x <= nx; x++) h += K.l(P.X(x), P.Y(0), P.X(x), P.Y(ny), 'ls');
    for (let y = 0; y <= ny; y++) h += K.l(P.X(0), P.Y(y), P.X(nx), P.Y(y), 'ls');
    return h;
  };
  const pto = (K, Q, s, dx = -9, dy = -8) => K.c(Q[0], Q[1], 4, 'fk') + K.t(Q[0] + dx, Q[1] + dy, s, 's', dx < 0 ? 'end' : 'start');
  const mid = (A, B) => [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const mano = (P, nx, ny, et) => ({ k: ['x', 'y'], min: [0, 0], max: [nx, ny], paso: 1, rot: () => et, en: v => P.P([v.x, v.y]), de: (x, y) => [(x - P.ox) / P.u, (P.oy - y) / P.u] });

  // Capítulo 1: el punto medio es el promedio.  v { k, o }  (o = 1: el origen se mueve)
  const P1 = plano(20, 196, 20), A1 = [2, 6], B1 = [10, 2];
  const medio = (v, K) => {
    const q = k(v), O = P1.P(v.o ? [13, 7] : [1, 1]), A = P1.P(A1), B = P1.P(B1), M = mid(A, B), S = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]];
    let h = papel(K, P1, 15, 8) + K.l(A[0], A[1], B[0], B[1], 'lm gr');
    if (q === 3) h += K.p([O, A, S, B], 'fn') + K.ar(O[0], O[1], S[0], S[1], 'lm gr d');
    h += K.ar(O[0], O[1], A[0], A[1], 'lg gr') + K.ar(O[0], O[1], B[0], B[1], 'lf gr');
    h += K.t((O[0] + A[0]) / 2 - 10, (O[1] + A[1]) / 2, 'a', 's tg', 'end') + K.t((O[0] + B[0]) / 2 + 4, (O[1] + B[1]) / 2 + 16, 'b', 's tf', 'start');
    if (q === 1) h += K.ar(A[0], A[1], B[0], B[1], 'la gr') + K.t(332, 22, 'de A a B: b − a', 's ta', 'end');
    if (q === 2) h += K.ar(A[0], A[1], M[0], M[1], 'la gr') + K.t(332, 22, 'a + ½(b − a)', 's ta', 'end');
    if (q >= 2) h += K.ar(O[0], O[1], M[0], M[1], 'la gr d') + K.c(M[0], M[1], 6, 'fo') + K.t(M[0] + 8, M[1] - 8, 'M', 's ta', 'start');
    if (q === 3) h += K.t(332, 22, 'M = mitad de a + b', 's ta', 'end');
    if (q === 4) h += K.t(332, 22, 'otro origen, el mismo M', 's ta', 'end');
    if (q === 5) h += K.t(332, 22, 'm = ½(a + b)', 's ta', 'end');
    return h + pto(K, O, 'O', -8, 16) + pto(K, A, 'A', -9, -6) + pto(K, B, 'B', 9, -6);
  };
  // Capítulo 1, tu turno: punto medio de A = (3, 1) y B = (11, 7) con el origen en (0, 4).
  const T1A = [3, 1], T1B = [11, 7], T1O = [0, 4];
  const turno1 = (v, K) => {
    const O = P1.P(T1O), A = P1.P(T1A), B = P1.P(T1B), M = P1.P([v.x, v.y]);
    return papel(K, P1, 15, 8) + K.l(A[0], A[1], B[0], B[1], 'lm gr') + K.ar(O[0], O[1], A[0], A[1], 'lg gr') + K.ar(O[0], O[1], B[0], B[1], 'lf gr')
      + K.ar(O[0], O[1], M[0], M[1], 'la gr d') + pto(K, O, 'O', -6, 16) + pto(K, A, 'A', 9, 14) + pto(K, B, 'B', 9, -4);
  };

  // Capítulo 2: dividir en una razón.  v { k, t }: t en octavos
  const RA = [30, 120], RB = [310, 50];
  const enR = t => [RA[0] + (RB[0] - RA[0]) * t, RA[1] + (RB[1] - RA[1]) * t];
  const razon = (v, K) => {
    const q = k(v), t = v.t / 8, P = enR(t);
    let h = K.l(RA[0], RA[1], RB[0], RB[1], 'lm gr');
    if (q >= 2) for (let i = 0; i <= 4; i++) { const Q = enR(i / 4); h += K.l(Q[0], Q[1] - 7, Q[0], Q[1] + 7, 'lm'); }
    h += K.ar(RA[0], RA[1], P[0], P[1], 'la gr') + K.c(P[0], P[1], 6, 'fo') + K.t(P[0], P[1] - 14, 'P', 's ta');
    const pie = ['AP = t · AB, con t entre 0 y 1', `t = ${v.t === 4 ? '½: el punto medio' : '¼: más cerca de A'}`, 'AP : PB = 3 : 1 → 4 partes, AP toma 3', '3 : 1 no es t = 3: t = 3/4', 'p = ¼a + ¾b'][q];
    return h + pto(K, RA, 'A', -2, 22) + pto(K, RB, 'B', 2, 22) + K.t(332, 160, pie, 's tm', 'end');
  };
  // Capítulo 2, tu turno: una cinta de 12 cm cortada con AP : PB = 1 : 2.  v { c } en cm
  const turno2 = (v, K) => {
    const P = enR(v.c / 12);
    let h = K.l(RA[0], RA[1], RB[0], RB[1], 'lm gr');
    for (let i = 0; i <= 12; i++) { const Q = enR(i / 12); h += K.l(Q[0], Q[1] - 5, Q[0], Q[1] + 5, 'lm'); }
    return h + K.ar(RA[0], RA[1], P[0], P[1], 'la gr') + K.c(P[0], P[1], 6, 'fo') + pto(K, RA, 'A', -2, 22) + pto(K, RB, 'B', 2, 22) + K.t(332, 22, `AP = ${v.c} cm de 12`, 's tm', 'end');
  };

  // Capítulo 3: demostrar con flechas.  v { k }: 0–3 el triángulo, 4–5 el paralelogramo
  const TA = [70, 30], TB = [30, 170], TC = [250, 150];
  const demo = (v, K) => {
    const q = k(v);
    if (q >= 4) {
      const A = [40, 170], B = [220, 170], C = [300, 40], D = [120, 40], X = mid(A, C);
      let h = K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], 'lg gr') + K.ar(D[0], D[1], C[0], C[1], 'la gr') + K.ar(A[0], A[1], B[0], B[1], 'la gr');
      if (q === 5) h += K.l(A[0], A[1], C[0], C[1], 'lm d') + K.l(B[0], B[1], D[0], D[1], 'lm d') + K.c(X[0], X[1], 6, 'fo');
      return h + pto(K, A, 'A', -6, 16) + pto(K, B, 'B', 6, 16) + pto(K, C, 'C', 8, 0) + pto(K, D, 'D', -8, 0)
        + K.t(332, 18, q === 4 ? 'AB = DC: b − a = c − d' : 'a + c = b + d', 's ta', 'end');
    }
    const M = mid(TA, TB), N = mid(TA, TC);
    let h = K.p([TA, TB, TC], 'fn') + K.pl([TA, TB, TC, TA], 'lg gr');
    if (q >= 1) h += K.c(M[0], M[1], 5, 'fo') + K.c(N[0], N[1], 5, 'fo') + K.t(M[0] - 8, M[1] + 4, 'M', 's', 'end') + K.t(N[0] + 8, N[1] - 6, 'N', 's', 'start');
    if (q >= 2) h += K.ar(M[0], M[1], N[0], N[1], 'la gr');
    if (q === 3) h += K.ar(TB[0], TB[1], TC[0], TC[1], 'lf gr');
    const pie = ['M y N, puntos medios', 'AM = ½AB, AN = ½AC', 'MN = ½AC − ½AB', 'MN = ½BC'][q];
    return h + pto(K, TA, 'A', 8, -2) + pto(K, TB, 'B', -8, 14) + pto(K, TC, 'C', 8, 14) + K.t(332, 22, pie, 's ta', 'end');
  };

  // Capítulo 4: baricentro, colineales y el cuarto vértice.  v { k }
  const bar = (v, K) => {
    const q = k(v);
    if (q === 3) {
      const A = [40, 150], u = [60, -24], B = [A[0] + u[0], A[1] + u[1]], C = [A[0] + 4 * u[0], A[1] + 4 * u[1]], F = [200, 150];
      return K.l(20, 158, 320, 38, 'lm d') + K.ar(A[0], A[1], B[0], B[1], 'lg gr') + K.ar(A[0], A[1], C[0], C[1], 'la gr d') + pto(K, A, 'A', -2, 22) + pto(K, B, 'B', 2, 22) + pto(K, C, 'C', 2, 22)
        + K.c(F[0], F[1], 4, 'ff') + K.t(F[0] + 8, F[1] + 4, 'F', 's', 'start') + K.t(332, 170, 'AC = 4·AB: en la recta; F no', 's tm', 'end');
    }
    if (q === 4) {
      const A = [40, 160], B = [200, 150], C = [290, 50], D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
      return K.pl([A, B, C], 'lg gr') + K.ar(B[0], B[1], C[0], C[1], 'lf gr') + K.ar(A[0], A[1], D[0], D[1], 'lf gr d') + K.c(D[0], D[1], 6, 'fo')
        + pto(K, A, 'A', -6, 14) + pto(K, B, 'B', 6, 16) + pto(K, C, 'C', 8, 0) + K.t(D[0] - 8, D[1], 'D', 's ta', 'end') + K.t(332, 22, 'AD = BC: d = a + c − b', 's ta', 'end');
    }
    const A = [30, 160], B = [250, 170], C = [150, 30], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    let h = K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'lg gr');
    const Ma = mid(B, C), Mb = mid(A, C), Mc = mid(A, B);
    h += K.l(A[0], A[1], Ma[0], Ma[1], 'lo d') + K.c(Ma[0], Ma[1], 3, 'fk');
    if (q >= 1) h += K.l(B[0], B[1], Mb[0], Mb[1], 'lo d') + K.l(C[0], C[1], Mc[0], Mc[1], 'lo d') + K.c(G[0], G[1], 6, 'fo') + K.t(G[0] + 9, G[1] + 14, 'G', 's ta', 'start');
    if (q === 2) { const T = [A[0] + (Ma[0] - A[0]) * 2 / 3, A[1] + (Ma[1] - A[1]) * 2 / 3]; h += K.l(A[0], A[1], T[0], T[1], 'la gr') + K.t(332, 22, 'AG = ⅔ de la mediana', 's ta', 'end'); }
    const pie = ['la mediana desde A', 'g = ⅓(a + b + c)', ''][q];
    return h + pto(K, A, 'A', -8, 4) + pto(K, B, 'B', 8, 4) + pto(K, C, 'C', 8, -4) + (pie ? K.t(332, 22, pie, 's ta', 'end') : '');
  };
  // Capítulo 4, tu turno: el baricentro de A = (1, 1), B = (10, 1), C = (4, 7).
  const P4 = plano(20, 196, 20), V4 = [[1, 1], [10, 1], [4, 7]];
  const turno4 = (v, K) => {
    const V = V4.map(P4.P), G = P4.P([v.x, v.y]);
    return papel(K, P4, 15, 8) + K.p(V, 'fn') + K.pl([...V, V[0]], 'lg gr') + pto(K, V[0], 'A', -8, 4) + pto(K, V[1], 'B', 8, 4) + pto(K, V[2], 'C', 0, -10) + K.c(G[0], G[1], 5, 'fk');
  };

  // Problema: la fuente del jardín en el cruce de las diagonales.
  const PJ = plano(20, 196, 20), J = [[1, 1], [9, 2], [13, 7], [5, 6]];
  const jardin = (v, K) => {
    const V = J.map(PJ.P), F = PJ.P([v.x, v.y]);
    return papel(K, PJ, 15, 8) + K.p(V, 'fn') + K.pl([...V, V[0]], 'lg gr') + ['A', 'B', 'C', 'D'].map((s, i) => pto(K, V[i], s, i === 1 || i === 2 ? 9 : -9, i < 2 ? 14 : -4)).join('') + K.c(F[0], F[1], 5, 'fk');
  };

  xpLec('geo-10', [
    ['El punto medio',
      xpMira('dibujo', 'Con un **origen** O cada punto se dice con una flecha. Así los teoremas de la geometría se vuelven cuentas con flechas.', { dib: medio, v: { k: 0, o: 0 }, alto: 210 }, [
        ['Pon un origen O donde quieras. La flecha a va de O a A, y la flecha b, de O a B.', {}],
        ['La flecha de A a B es b − a: sumada a la flecha a, llega a b.',{ k: 1 }, '$\\overrightarrow{AB} = \\vec b - \\vec a$'],
        ['Para llegar al punto medio: ve hasta A y recorre la mitad de AB. Eso es a + ½(b − a).', { k: 2 }],
        ['Eso es ½(a + b): media diagonal del paralelogramo de a y b. El punto medio es el promedio.',{ k: 3 }, '$\\vec m = \\tfrac12(\\vec a + \\vec b)$'],
        ['Si cambias el origen, las flechas cambian pero M sigue en el mismo sitio: la cuenta no depende de dónde pusiste O.', { k: 4, o: 1 }],
        ['Por eso se dice que es una prueba sin coordenadas: solo se usan flechas, sumas y mitades.', { k: 5, o: 0 }],
      ], 'Con un origen, el punto medio de AB es el promedio de las flechas: $\\vec m = \\tfrac12(\\vec a + \\vec b)$.'),
      xpHaz('dibujo', 'Las flechas salen de O hacia A y B. Arrastra M hasta el punto medio de AB, donde OM = ½(a + b).', {
        dib: turno1, v: { x: 2, y: 7 }, cumple: v => v.x === 7 && v.y === 4, sol: { x: 7, y: 4 }, alto: 210,
        manijas: [mano(P1, 15, 8, 'M')],
        lee: v => (v.x === 7 && v.y === 4 ? '$\\overrightarrow{AM} = \\overrightarrow{MB}$' : 'Todavía $\\overrightarrow{AM} \\neq \\overrightarrow{MB}$'), pista: 'El punto medio está sobre AB, a la misma distancia de A y de B: busca la mitad de cada recorrido.' },
      'El punto medio de $AB$ es la mitad de $\\vec a + \\vec b$: cae sobre el segmento, a igual distancia de los extremos.')],
    ['Dividir en una razón',
      xpMira('dibujo', 'Un punto del segmento AB se dice con un solo número t: qué parte de la flecha AB hay que recorrer desde A.', { dib: razon, v: { k: 0, t: 3 }, alto: 180 }, [
        ['Cada punto P de AB cumple AP = t·AB, con t de 0 (en A) a 1 (en B).', {},'$\\overrightarrow{AP} = t\\,\\overrightarrow{AB}$'],
        ['Con t = ½ es el punto medio; con t = ¼ queda a un cuarto del camino, más cerca de A.', { k: 1, t: 2 }],
        ['Si AP : PB = 3 : 1, hay 3 + 1 = 4 partes iguales y AP toma 3.',{ k: 2, t: 6 }, '$t = \\tfrac{m}{m + n}$'],
        ['Ojo: 3 : 1 no es t = 3. La razón compara los pedazos; t compara AP con todo AB.',{ k: 3, t: 6 }],
        ['Con un origen, p = (1 − t)a + t·b: pesa más el extremo más cercano a P.',{ k: 4, t: 6 }, '$\\vec p = (1 - t)\\,\\vec a + t\\,\\vec b$'],
      ], 'Si $AP : PB = m : n$, entonces $\\overrightarrow{AP} = \\tfrac{m}{m+n}\\overrightarrow{AB}$.'),
      xpHaz('dibujo', 'Una cinta de 12 cm se corta en P con AP : PB = 1 : 2. Desliza el corte hasta ese punto.', {
        dib: turno2, v: { c: 9 }, metas: { c: 4 }, alto: 200,
        manijas: [{ k: 'c', min: 0, max: 12, paso: 1, et: 'AP en cm' }],
        lee: v => `$\\overrightarrow{AP} = \\tfrac{${v.c}}{12}\\,\\overrightarrow{AB}$`, pista: '1 : 2 da 1 + 2 = 3 partes iguales; AP es una de ellas.' },
      'La cinta queda en 3 partes de 4 cm: $AP = 4$ cm y $t = \\tfrac13$.')],
    ['Demostrar con flechas',
      xpMira('dibujo', 'Dos teoremas de la geometría salen en una línea si se escriben con flechas.', { dib: demo, v: { k: 0 }, alto: 190 }, [
        ['Teorema: el segmento que une los puntos medios de dos lados de un triángulo es paralelo al tercero y mide la mitad.', {}],
        ['M es el punto medio de AB y N el de AC, así que AM = ½AB y AN = ½AC.', { k: 1 }],
        ['MN es la flecha de A a N menos la de A a M: ½AC − ½AB.',{ k: 2 }, '$\\overrightarrow{MN} = \\overrightarrow{AN} - \\overrightarrow{AM}$'],
        ['Eso es ½(AC − AB) = ½BC. MN es un múltiplo de BC: son paralelos, y MN mide la mitad.', { k: 3 }, '$\\overrightarrow{MN} = \\tfrac12\\overrightarrow{BC}$'],
        ['En un paralelogramo ABCD, AB = DC como flechas. Con el origen: b − a = c − d.', { k: 4 }],
        ['Se reordena: a + c = b + d. Mitad y mitad: las dos diagonales tienen el mismo punto medio.',{ k: 5 }, '$\\tfrac12(\\vec a + \\vec c) = \\tfrac12(\\vec b + \\vec d)$'],
      ], 'Con flechas: $\\overrightarrow{MN} = \\tfrac12\\overrightarrow{BC}$ y $\\vec a + \\vec c = \\vec b + \\vec d$.'),
      xpHaz('fichas', 'En el triángulo, M y N son los puntos medios de AB y AC. Completa: MN = ½AC − ½AB, que es…', {
        slots: [{ x: 250, y: 60, w: 100, h: 40 }], alto: 120,
        fondo: K => K.p([[40, 20], [20, 100], [160, 90]], 'fn') + K.pl([[40, 20], [20, 100], [160, 90], [40, 20]], 'lg gr') + K.ar(30, 60, 100, 55, 'la gr') + K.t(190, 66, 'MN =', 's', 'start'),
        fichas: ['½BC', 'BC', '½CB', '½(AB + AC)'], meta: ['½BC'], pista: 'Saca ½ de factor común: queda ½(AC − AB). ¿Qué flecha es AC − AB?' },
      '$\\overrightarrow{MN} = \\tfrac12(\\overrightarrow{AC} - \\overrightarrow{AB}) = \\tfrac12\\overrightarrow{BC}$.')],
    ['Baricentro y alineados',
      xpMira('dibujo', 'Tres vértices tienen su **promedio**, el baricentro; y tres puntos en fila tienen flechas que son múltiplos.', { dib: bar, v: { k: 0 }, alto: 190 }, [
        ['Una mediana va de un vértice al punto medio del lado de enfrente. Un triángulo tiene tres.', {}],
        ['El baricentro G es el promedio de los vértices. Una placa triangular se equilibra en ese punto.',{ k: 1 }, '$\\vec g = \\tfrac13(\\vec a + \\vec b + \\vec c)$'],
        ['Sobre cada mediana, G queda a dos tercios del vértice y a un tercio del punto medio.', { k: 2 }],
        ['A, B y C están en una recta si AC = k·AB para algún número k.',{ k: 3 }, '$\\overrightarrow{AC} = k\\,\\overrightarrow{AB}$'],
        ['Si A, B, C son vértices seguidos del paralelogramo ABCD, el cuarto cumple AD = BC.',{ k: 4 }, '$\\vec d = \\vec a + \\vec c - \\vec b$'],
      ], 'Baricentro $\\tfrac13(\\vec a + \\vec b + \\vec c)$; alineados si $\\overrightarrow{AC} = k\\overrightarrow{AB}$.'),
      xpHaz('dibujo', 'Arrastra G al baricentro del triángulo ABC: el punto donde se cortarían sus tres medianas.', {
        dib: turno4, v: { x: 12, y: 7 }, cumple: v => v.x === 5 && v.y === 3, sol: { x: 5, y: 3 }, alto: 210,
        manijas: [mano(P4, 15, 8, 'G')],
        lee: v => (v.x === 5 && v.y === 3 ? 'G es el promedio de A, B y C' : 'Todavía no es el promedio de los tres vértices'), pista: 'Busca el punto medio de un lado y recorre dos tercios de la mediana desde el vértice de enfrente.' },
      'El promedio de los vértices cae a dos tercios de cada mediana: ahí la placa se equilibra.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un jardín tiene forma de paralelogramo ABCD. La fuente va donde se cortan las diagonales. Arrastra F hasta ese punto.', {
        dib: jardin, v: { x: 12, y: 2 }, cumple: v => v.x === 7 && v.y === 4, sol: { x: 7, y: 4 }, alto: 210,
        manijas: [mano(PJ, 15, 8, 'F')],
        lee: v => (v.x === 7 && v.y === 4 ? 'F es el punto medio de AC y de BD' : 'F todavía no es el punto medio de las diagonales'), pista: 'Las diagonales se cortan en su punto medio: busca la mitad de AC, que es la misma de BD.' },
      'Como $\\vec a + \\vec c = \\vec b + \\vec d$, el punto medio de $AC$ es el de $BD$: la fuente va en $\\tfrac12(\\vec a + \\vec c)$.')],
  ], 'Con flechas desde un origen: punto medio $\\tfrac12(\\vec a + \\vec b)$ y baricentro $\\tfrac13(\\vec a + \\vec b + \\vec c)$.');
}
;
//#archivo js/explora-gva-11.js
// Geometría Vectorial · explicación de geo-11 «Vectores geométricos y vectores coordenados» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(Math.round(n * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h + K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
  };
  const fl = (K, P, a, b, cls) => { const A = P2(P, a), B = P2(P, b); return K.ar(A[0], A[1], B[0], B[1], cls); };
  const dot = (K, P, q, s, cls = 'fk', lado = 1) => { const Q = P2(P, q); return K.c(Q[0], Q[1], 4, cls) + (s ? K.t(Q[0] + 9 * lado, Q[1] + 4, s, 's', lado > 0 ? 'start' : 'end') : ''); };
  // Tramo de la recta Pt + t·d dentro del papel P (en unidades), o null.
  const corta = (Pt, d, P) => {
    let t0 = -1e9, t1 = 1e9;
    for (const [p0, dd, lo, hi] of [[Pt[0], d[0], P.x0, P.x1], [Pt[1], d[1], P.y0, P.y1]]) {
      if (Math.abs(dd) < 1e-12) { if (p0 < lo || p0 > hi) return null; continue; }
      const a = (lo - p0) / dd, b = (hi - p0) / dd; t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
    }
    return t1 > t0 ? [[Pt[0] + t0 * d[0], Pt[1] + t0 * d[1]], [Pt[0] + t1 * d[0], Pt[1] + t1 * d[1]]] : null;
  };
  // Proyección del espacio: x hacia el frente, y a la derecha, z hacia arriba.
  const pr = (o, U, x, y, z) => [o[0] + U * y - 0.5 * U * x, o[1] + 0.45 * U * x - U * z];

  // Capítulo 1: î, ĵ, w = 3î + 2ĵ y AB = B − A.  v { k }
  const C1 = plano({ x0: -3, x1: 5, y0: -2, y1: 4 }, 144, 134, 26);
  const canonica = (v, K) => {
    const q = k(v), O = P2(C1, [0, 0]);
    let h = papel(K, C1) + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end');
    if (q <= 3) h += fl(K, C1, [0, 0], [1, 0], 'lg gr') + fl(K, C1, [0, 0], [0, 1], 'lg gr') + K.t(O[0] + 13, O[1] + 16, 'î', 's tg') + K.t(O[0] - 8, O[1] - 10, 'ĵ', 's tg', 'end');
    if (q === 0) return h + K.t(170, 16, 'î y ĵ: largo 1, perpendiculares', 's ta');
    if (q <= 3) {
      for (let i = 1; i < 3; i++) h += fl(K, C1, [i, 0], [i + 1, 0], 'lg');
      for (let j = 0; j < 2; j++) h += fl(K, C1, [3, j], [3, j + 1], 'lg');
      h += fl(K, C1, [0, 0], [3, 2], 'la gr');
      if (q === 3) h += dot(K, C1, [3, 2], '(3, 2)', 'fA');
      return h + K.t(170, 16, ['', 'w = 3î + 2ĵ', 'w = aî + bĵ, con a = 3 y b = 2', 'vector, par y punto: (3, 2)'][q], 's ta');
    }
    h += dot(K, C1, [-2, 1], 'A', 'fk', -1) + dot(K, C1, [1, 3], 'B') + fl(K, C1, [-2, 1], [1, 1], 'lm d') + fl(K, C1, [1, 1], [1, 3], 'lm d') + fl(K, C1, [-2, 1], [1, 3], 'lf gr');
    return h + K.t(170, 16, q === 4 ? 'de A a B: 3 a la derecha y 2 arriba' : 'B − A = (1 − (−2), 3 − 1) = (3, 2)', 's ta');
  };
  // Capítulo 1, tu turno: A = (2, −1) y AB = (−4, 3).  v { x, y }
  const ponB = (v, K) => {
    let h = papel(K, C1) + dot(K, C1, [2, -1], 'A') + (v.x !== 2 || v.y !== -1 ? fl(K, C1, [2, -1], [v.x, v.y], 'la gr') : '');
    return h + K.t(170, 16, 'A = (2, −1); se busca B con AB = (−4, 3)', 's tm');
  };

  // Capítulo 2: u = (−1, √3): largo 2, dirección 120°, unitario.  v { k }
  const RO = [200, 150], RS = 50, U2 = [-1, Math.sqrt(3)];
  const rumbo = (v, K) => {
    const q = k(v), T = [RO[0] + U2[0] * RS, RO[1] - U2[1] * RS], C = [T[0], RO[1]];
    let h = K.l(40, RO[1], 320, RO[1], 'lm') + K.l(RO[0], 30, RO[0], 205, 'lm') + K.c(RO[0], RO[1], 4, 'fk');
    h += K.l(RO[0], RO[1], C[0], C[1], 'lf d') + K.l(C[0], C[1], T[0], T[1], 'lf d') + K.ar(RO[0], RO[1], T[0], T[1], 'la gr')
      + K.t((RO[0] + C[0]) / 2, RO[1] + 16, '1', 's tf') + K.t(C[0] - 8, (C[1] + T[1]) / 2 + 4, '√3', 's tf', 'end') + K.t(T[0] - 6, T[1] - 6, 'u', 's ta', 'end');
    if (q >= 1) h += K.t((RO[0] + T[0]) / 2 + 12, (RO[1] + T[1]) / 2, '2', 's ta', 'start');
    if (q >= 2) h += K.arc(RO[0], RO[1], 22, 0, 120, 'la') + K.t(RO[0] + 22, RO[1] - 26, 'θ', 's ta', 'start');
    if (q === 3) { const E = K.at(RO[0], RO[1], 50, -60); h += K.ar(RO[0], RO[1], E[0], E[1], 'lm d') + K.t(E[0] + 6, E[1], '−60°', 's tm', 'start'); }
    if (q >= 4) { const E = [RO[0] + U2[0] * RS / 2, RO[1] - U2[1] * RS / 2]; h += K.arc(RO[0], RO[1], RS / 2, 0, 360, 'lm') + K.c(E[0], E[1], 5, 'fo'); }
    return h + K.t(170, 16, ['u = (−1, √3)', '‖u‖ = √(1 + 3) = 2', 'tan θ = √3 ÷ (−1) = −√3', 'la calculadora: −60°; u está en el II: 120°', 'û = u ÷ 2 = (−1/2, √3/2)'][Math.min(q, 4)], 's ta');
  };
  // Capítulo 2, tu turno: la dirección de (2, −2).  v { g }
  const AG = [170, 110], AR = 80;
  const aguja = (v, K) => {
    let h = K.arc(AG[0], AG[1], AR, 0, 360, 'lm') + K.l(AG[0] - AR, AG[1], AG[0] + AR, AG[1], 'ls') + K.l(AG[0], AG[1] - AR, AG[0], AG[1] + AR, 'ls');
    h += K.t(AG[0] + AR + 6, AG[1] + 4, '0°', 's tm', 'start') + K.t(AG[0] - AR - 6, AG[1] + 4, '180°', 's tm', 'end');
    const T = K.at(AG[0], AG[1], AR, v.g);
    return h + K.arc(AG[0], AG[1], 20, 0, v.g, 'lm') + K.l(AG[0], AG[1], T[0], T[1], 'la gr') + K.c(AG[0], AG[1], 4, 'fk') + K.t(8, 16, 'v = (2, −2)', 's ta', 'start') + K.t(332, 16, `θ = ${v.g}°`, 's', 'end');
  };

  // Capítulo 3: de magnitud y dirección a componentes; la suma por componentes.  v { k }
  const C3 = plano({ x0: -1, x1: 5, y0: -2, y1: 4 }, 118, 134, 26);
  const polar = (v, K) => {
    const q = k(v);
    if (q <= 2) {
      const O = [210, 80], T = K.at(O[0], O[1], 80, 210), C = [T[0], O[1]];
      let h = K.l(60, O[1], 320, O[1], 'lm') + K.l(O[0], 30, O[0], 190, 'lm') + K.c(O[0], O[1], 4, 'fk') + K.ar(O[0], O[1], T[0], T[1], 'la gr') + K.arc(O[0], O[1], 20, 0, 210, 'lm')
        + K.t(O[0] + 24, O[1] - 18, '210°', 's tm', 'start') + K.t(T[0] - 6, T[1] + 14, '10 km', 's ta', 'end');
      if (q >= 1) h += K.l(O[0], O[1], C[0], C[1], 'lf d') + K.l(C[0], C[1], T[0], T[1], 'lf d') + K.t((O[0] + C[0]) / 2, O[1] - 8, '10·cos 210°', 's tf') + K.t(C[0] - 8, (C[1] + T[1]) / 2 + 4, '10·sen 210°', 's tf', 'end');
      return h + K.t(170, 16, ['un avión: 10 km con dirección 210°', 'x = r·cos θ, y = r·sen θ', '(−5√3, −5): al oeste y al sur'][q], 's ta') + (q === 2 ? K.t(170, 160, 'cos 210° = −√3/2, sen 210° = −1/2', 's tm') : '');
    }
    let h = papel(K, C3) + K.c(C3.ox, C3.oy, 4, 'fk') + fl(K, C3, [0, 0], [1, 2], 'lg gr') + K.t(C3.X(0.5) - 6, C3.Y(1), 'u', 's tg', 'end');
    if (q === 3 || q === 4) {
      h += fl(K, C3, [0, 0], [3, -1], 'lf gr') + K.t(C3.X(1.5), C3.Y(-0.5) + 14, 'v', 's tf');
      if (q === 4) h += fl(K, C3, [1, 2], [4, 1], 'lf gr d') + fl(K, C3, [0, 0], [4, 1], 'la gr');
      return h + dot(K, C3, [4, 1], '(4, 1)', 'fA') + K.t(170, 16, q === 3 ? '(1, 2) + (3, −1) = (4, 1)' : 'cola de v en la punta de u: llega a (4, 1)', 's ta');
    }
    return h + fl(K, C3, [0, 0], [2, 4], 'la gr d') + dot(K, C3, [2, 4], '2u = (2, 4)', 'fA') + K.t(170, 16, 'el doble de cada componente: el doble de largo', 's ta');
  };
  // Capítulo 3, tu turno: p + 3q con p = (−2, 1) y q = (1, −1).  v { x, y }
  const C3b = plano({ x0: -3, x1: 5, y0: -3, y1: 3 }, 144, 108, 26);
  const ponSuma = (v, K) => {
    let h = papel(K, C3b) + K.c(C3b.ox, C3b.oy, 4, 'fk') + fl(K, C3b, [0, 0], [-2, 1], 'lg gr') + fl(K, C3b, [0, 0], [1, -1], 'lf gr')
      + K.t(C3b.X(-1) - 4, C3b.Y(0.5) - 6, 'p', 's tg', 'end') + K.t(C3b.X(0.5) + 6, C3b.Y(-0.5) + 12, 'q', 's tf', 'start');
    if (v.x || v.y) h += fl(K, C3b, [0, 0], [v.x, v.y], 'la gr');
    return h + K.t(170, 16, 'p = (−2, 1), q = (1, −1): ¿dónde termina p + 3q?', 's tm');
  };

  // Capítulo 4: el espacio (k̂, octantes, distancia) y otra base del plano.  v { k }
  const E4 = [120, 150], U4 = 24, B4 = plano({ x0: -2, x1: 5, y0: -1, y1: 4 }, 126, 150, 26);
  const espacio = (v, K) => {
    const q = k(v);
    if (q >= 4) {
      let h = '';
      for (let t = -8; t <= 8; t++) for (const [Pt, d] of [[[-t, t], [2, 1]], [[2 * t, t], [-1, 1]]]) {
        const s = corta(Pt, d, B4); if (s) { const A = P2(B4, s[0]), B = P2(B4, s[1]); h += K.l(A[0], A[1], B[0], B[1], 'ls'); }
      }
      h +=K.l(B4.X(-2), B4.oy, B4.X(5), B4.oy, 'lm') + K.l(B4.ox, B4.Y(-1), B4.ox, B4.Y(4), 'lm') + K.c(B4.ox, B4.oy, 4, 'fk');
      h += fl(K, B4, [0, 0], [2, 1], 'lg gr') + fl(K, B4, [2, 1], [4, 2], 'lg gr') + fl(K, B4, [4, 2], [3, 3], 'lf gr') + dot(K, B4, [3, 3], 'Q = (3, 3)', 'fA');
      return h + K.t(170, 16, q === 4 ? 'e₁ = (2, 1), e₂ = (−1, 1): Q = 2e₁ + 1e₂' : 'en esa base Q es (2, 1); con î y ĵ, (3, 3)', 's ta');
    }
    const Pp = (x, y, z) => pr(E4, U4, x, y, z), O = Pp(0, 0, 0), X1 = Pp(4, 0, 0), Y1 = Pp(0, 5, 0), Z1 = Pp(0, 0, 5);
    let h = K.ar(O[0], O[1], X1[0], X1[1], 'lm') + K.ar(O[0], O[1], Y1[0], Y1[1], 'lm') + K.ar(O[0], O[1], Z1[0], Z1[1], 'lm')
      + K.t(X1[0] - 8, X1[1], 'x', 's tm', 'end') + K.t(Y1[0] + 6, Y1[1] + 4, 'y', 's tm', 'start') + K.t(Z1[0] + 8, Z1[1] + 4, 'z', 's tm', 'start');
    if (q === 0) {
      const a = Pp(1, 0, 0), b = Pp(0, 1, 0), c = Pp(0, 0, 1);
      return h + K.ar(O[0], O[1], a[0], a[1], 'lg gr') + K.ar(O[0], O[1], b[0], b[1], 'lg gr') + K.ar(O[0], O[1], c[0], c[1], 'la gr')
        + K.t(c[0] - 8, c[1], 'k̂', 's ta', 'end') + K.t(170, 16, 'î, ĵ y ahora k̂: tres flechas de largo 1', 's ta');
    }
    const S = Pp(2, 3, 0), T = Pp(2, 3, 4), Sx = Pp(2, 0, 0), Sy = Pp(0, 3, 0);
    h += K.l(S[0], S[1], Sx[0], Sx[1], 'lm d') + K.l(S[0], S[1], Sy[0], Sy[1], 'lm d') + K.l(S[0], S[1], T[0], T[1], 'lm d') + K.c(T[0], T[1], 5, 'fA') + K.t(T[0] + 8, T[1] - 4, '(2, 3, 4)', 's', 'start');
    if (q === 3) h += K.l(O[0], O[1], S[0], S[1], 'lf gr') + K.ar(O[0], O[1], T[0], T[1], 'la gr');
    return h + K.t(170, 16, ['', '2î + 3ĵ + 4k̂: 2 en x, 3 en y, sube 4', 'tres planos: ocho octantes; aquí todo +', '√(2² + 3² + 4²) = √29'][q], 's ta');
  };
  // Capítulo 4, tu turno: Q = (5, 4) en la base e₁ = (1, 2), e₂ = (1, −1).  v { a, b }
  const B4b = plano({ x0: -2, x1: 6, y0: -2, y1: 6 }, 132, 116, 16);
  const otraBase = (v, K) => {
    let h = papel(K, B4b) + K.c(B4b.ox, B4b.oy, 3, 'fk') + fl(K, B4b, [0, 0], [1, 2], 'lg gr') + fl(K, B4b, [0, 0], [1, -1], 'lg gr') + dot(K, B4b, [5, 4], 'Q', 'fk');
    const A = [v.a, 2 * v.a], E = [v.a + v.b, 2 * v.a - v.b];
    if (v.a) h += fl(K, B4b, [0, 0], A, 'la gr');
    if (v.b) h += fl(K, B4b, A, E, 'lf gr');
    return h + K.t(240, 40, 'e₁ = (1, 2)', 's ta', 'start') + K.t(240, 60, 'e₂ = (1, −1)', 's ta', 'start') + K.t(240, 80, 'Q = (5, 4)', 's', 'start')
      + K.t(240, 110, `llega a (${sg(E[0])}, ${sg(E[1])})`, 's tm', 'start');
  };

  // Problema: el dron de rescate, de (2, 1, 0) a (3, 5, 8).  v { d }
  const E5 = [140, 170], U5 = 16, BA = [2, 1, 0], RF = [3, 5, 8];
  const rescate = (v, K) => {
    const Pp = q => pr(E5, U5, ...q), A = Pp(BA), B = Pp(RF);
    let h = K.pl([A, Pp([3, 1, 0]), Pp([3, 5, 0]), B], 'ls d') + K.l(A[0], A[1], B[0], B[1], 'lm d') + K.c(A[0], A[1], 5, 'fk') + K.c(B[0], B[1], 6, 'fn')
      + K.t(A[0] - 10, A[1] + 4, 'base (2, 1, 0)', 's', 'end') + K.t(B[0] + 10, B[1] + 4, 'refugio (3, 5, 8)', 's', 'start');
    const t = Math.min(v.d / 9, 1.3), D = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
    return h + (v.d ? K.l(A[0], A[1], D[0], D[1], 'la gr') + K.c(D[0], D[1], 6, 'fA') : '') + K.t(8, 16, 'en km', 's tm', 'start');
  };

  xpLec('geo-11', [
    ['Dos flechas para todo',
      xpMira('dibujo', 'Con dos flechas de largo 1 se **escribe** cualquier otra.', { dib: canonica, v: { k: 0 }, alto: 200 }, [
        ['Se eligen î, una unidad a la derecha, y ĵ, una unidad hacia arriba. Son perpendiculares y miden 1.', {}],
        ['Tres pasos de î y luego dos de ĵ: la flecha w que sale de O es 3î + 2ĵ.', { k: 1 }],
        ['Cada flecha que sale de O se escribe así de una sola forma. a y b son sus componentes.', { k: 2 }, '$\\vec w = a\\,\\hat\\imath + b\\,\\hat\\jmath$'],
        ['La punta de w cae en el punto (3, 2). Vector, par y punto: tres nombres para lo mismo.', { k: 3 }],
        ['Esta flecha va de A a B, no sale de O. Pero avanza 3 y sube 2: es otra vez (3, 2).', { k: 4 }],
        ['Por eso el vector de A a B es punta menos cola: cada coordenada de B menos la de A.', { k: 5 }, '$\\overrightarrow{AB} = B - A$'],
      ], 'Con $\\hat\\imath$ y $\\hat\\jmath$, cada vector es un par $(a, b)$ y un punto; el de A a B es $B - A$.'),
      xpHaz('dibujo', 'A está en (2, −1). Arrastra B para que el vector de A a B sea (−4, 3).', {
        dib: ponB, v: { x: 2, y: -1 }, metas: { x: -2, y: 2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-3, -2], max: [5, 4], paso: 1, en: v => P2(C1, [v.x, v.y]), de: (x, y) => [(x - C1.ox) / C1.u, (C1.oy - y) / C1.u] }],
        lee: v => `$B - A = (${v.x} - 2,\\ ${v.y} + 1) = (${v.x - 2}, ${v.y + 1})$`, pista: 'B = A + (−4, 3): desde A, 4 a la izquierda y 3 hacia arriba.' },
      '$B = A + (-4, 3) = (-2, 2)$, porque $B - A = (-2 - 2,\\ 2 + 1) = (-4, 3)$.')],
    ['Largo, rumbo y unitario',
      xpMira('dibujo', 'Dentro de cada vector hay un **triángulo rectángulo**.', { dib: rumbo, v: { k: 0 }, alto: 212 }, [
        ['El vector u = (−1, √3) esconde un triángulo: 1 hacia la izquierda y √3 hacia arriba.', {}],
        ['Su largo es la hipotenusa del triángulo: la raíz de la suma de los cuadrados. Aquí da 2.', { k: 1 }, '$\\|(a, b)\\| = \\sqrt{a^2 + b^2}$'],
        ['La dirección es el ángulo θ desde 0°, contra las agujas del reloj. Cumple tan θ = b/a.', { k: 2 }],
        ['La calculadora da −60°, que apunta abajo a la derecha. Pero u está en el segundo cuadrante: 120°.', { k: 3 }],
        ['Al dividir u entre su largo queda una flecha de largo 1 con el mismo rumbo: el unitario.', { k: 4 }, '$\\hat u = \\tfrac{\\vec u}{\\|\\vec u\\|} = \\left(-\\tfrac12, \\tfrac{\\sqrt3}{2}\\right)$'],
      ], 'Largo $\\sqrt{a^2 + b^2}$; dirección con $\\tan\\theta = \\tfrac{b}{a}$ y los signos; unitario $\\tfrac{\\vec u}{\\|\\vec u\\|}$.'),
      xpHaz('dibujo', 'Gira la aguja hasta la dirección de v = (2, −2). Fíjate primero en el cuadrante.', {
        dib: aguja, v: { g: 0 }, metas: { g: 315 }, alto: 200,
        manijas: [{ k: 'g', min: 0, max: 345, paso: 15, en: v => XPK.at(AG[0], AG[1], AR, v.g), de: (x, y) => { let g = (Math.atan2(AG[1] - y, x - AG[0]) * 180 / Math.PI + 360) % 360; if (g > 352.5) g = 0; return g; } }],
        lee: v => `$\\theta = ${v.g}^{\\circ}$`, pista: 'x positiva e y negativa: cuarto cuadrante. El ángulo de referencia tiene tangente 1.' },
      '$\\tan\\theta = -1$ con $x > 0$, $y < 0$: cuarto cuadrante, $\\theta = 360^{\\circ} - 45^{\\circ} = 315^{\\circ}$.')],
    ['Del rumbo a las componentes',
      xpMira('dibujo', 'Con magnitud y dirección se sacan las **componentes**; y se opera con ellas.', { dib: polar, v: { k: 0 }, alto: 200 }, [
        ['Un avión vuela 10 km con dirección 210°. ¿Cuánto avanzó en x y cuánto en y?', {}],
        ['Las sombras sobre los ejes miden r·cos θ y r·sen θ.', { k: 1 }, '$\\vec u = (r\\cos\\theta,\\ r\\operatorname{sen}\\theta)$'],
        ['cos 210° = −√3/2 y sen 210° = −1/2: el avión fue (−5√3, −5). Los signos dicen oeste y sur.', { k: 2 }],
        ['Sumar es sumar componente a componente: (1, 2) + (3, −1) = (4, 1).', { k: 3 }],
        ['Y coincide con las flechas: la cola de v en la punta de u llega al mismo punto (4, 1).', { k: 4 }],
        ['Con un número pasa igual: 2·(1, 2) = (2, 4) es la flecha estirada al doble.', { k: 5 }, '$c\\,(a, b) = (ca, cb)$'],
      ], 'Con magnitud $r$ y dirección $\\theta$, $\\vec u = (r\\cos\\theta, r\\operatorname{sen}\\theta)$; sumar y escalar va por componentes.'),
      xpHaz('dibujo', 'Con p = (−2, 1) y q = (1, −1), arrastra P a donde termina p + 3q desde O.', {
        dib: ponSuma, v: { x: 0, y: 0 }, metas: { x: 1, y: -2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-3, -3], max: [5, 3], paso: 1, en: v => P2(C3b, [v.x, v.y]), de: (x, y) => [(x - C3b.ox) / C3b.u, (C3b.oy - y) / C3b.u] }],
        lee: v => `$P = (${v.x}, ${v.y})$`, pista: 'Primero 3q = (3, −3); luego suma cada componente con la de p.' },
      '$\\vec p + 3\\vec q = (-2 + 3,\\ 1 - 3) = (1, -2)$.')],
    ['El espacio y otras bases',
      xpMira('dibujo', 'En el espacio hace falta una **tercera** flecha; y en el plano sirven otras dos.', { dib: espacio, v: { k: 0 }, alto: 210 }, [
        ['En el espacio se añade k̂, hacia arriba. Un punto lleva tres números: (x, y, z).', {}],
        ['Para llegar a (2, 3, 4) se avanza en x, luego en y, y al final se sube.', { k: 1 }],
        ['Los tres planos de coordenadas parten el espacio en ocho octantes, según los signos de x, y, z.', { k: 2 }],
        ['La distancia es Pitágoras dos veces: la diagonal del piso y luego con la altura.', { k: 3 }, '$\\|(a, b, c)\\| = \\sqrt{a^2 + b^2 + c^2}$'],
        ['En el plano, dos flechas e₁ y e₂ no paralelas también sirven: Q es 2e₁ + 1e₂.', { k: 4 }],
        ['En esa base sus coordenadas son (2, 1). Las coordenadas cambian con la base; el punto, no.', { k: 5 }],
      ], 'En el espacio, $(a, b, c) = a\\hat\\imath + b\\hat\\jmath + c\\hat k$; dos vectores no paralelos son otra base del plano.'),
      xpHaz('dibujo', 'Con e₁ = (1, 2) y e₂ = (1, −1), ajusta a y b para que a·e₁ + b·e₂ llegue a Q = (5, 4).', {
        dib: otraBase, v: { a: 0, b: 0 }, metas: { a: 3, b: 2 }, alto: 250,
        manijas: [{ k: 'a', min: -4, max: 4, paso: 1, et: 'a' }, { k: 'b', min: -4, max: 4, paso: 1, et: 'b' }],
        lee: v => `$${v.a}\\,\\vec e_1 + ${v.b < 0 ? `(${v.b})` : v.b}\\,\\vec e_2 = (${v.a + v.b}, ${2 * v.a - v.b})$`, pista: 'Iguala: a + b = 5 con las x y 2a − b = 4 con las y. Suma las dos ecuaciones.' },
      '$a + b = 5$ y $2a - b = 4$ dan $3a = 9$: $a = 3$, $b = 2$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un dron de rescate sale de la base (2, 1, 0) hacia un refugio en (3, 5, 8), en km. Ajusta la distancia que debe volar en línea recta para llegar justo.', {
        dib: rescate, v: { d: 0 }, metas: { d: 9 }, alto: 250, manijas: [{ k: 'd', min: 0, max: 15, paso: 1, et: 'distancia en km' }],
        lee: v => `$d = ${v.d}$ km`, pista: 'Resta refugio menos base y saca la raíz de la suma de los tres cuadrados.' },
      'El desplazamiento es $(1, 4, 8)$ y $\\sqrt{1 + 16 + 64} = \\sqrt{81} = 9$ km.')],
  ], 'Cada vector es un par o una terna: $Q - P$, largo, dirección con su cuadrante, unitario y componentes; otra base, otras coordenadas.');
}
;
//#archivo js/explora-gva-12.js
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
;
//#archivo js/explora-gva-13.js
// Geometría Vectorial · explicación de geo-13 «Lugares geométricos e intersecciones» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: un lugar es una condición; la mediatriz y la circunferencia salen de distancias, y los cruces de lugares se
// resuelven con sistemas, cuadráticas y restas de ecuaciones. Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  const pt = q => `(${sg(q[0])}, ${sg(q[1])})`;
  const pl = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    return h;
  };
  const rec = (K, P, a, b, c, cls) => {
    const q = [], e = 1e-9;
    if (b) for (const x of [P.x0, P.x1]) { const y = (c - a * x) / b; if (y >= P.y0 - e && y <= P.y1 + e) q.push([x, y]); }
    if (a) for (const y of [P.y0, P.y1]) { const x = (c - b * y) / a; if (x >= P.x0 - e && x <= P.x1 + e) q.push([x, y]); }
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    return K.l(...P2(P, q[0]), ...P2(P, q.at(-1)), cls);
  };
  const dot = (K, P, q, s, cls = 'fk', dx = 8, dy = -8, a = 'start') => { const [x, y] = P2(P, q); return K.c(x, y, 4.5, cls) + (s ? K.t(x + dx, y + dy, s, 's', a) : ''); };
  const circ = (K, P, C, r, cls) => { const [x, y] = P2(P, C); return K.arc(x, y, r * P.u, 0, 360, cls); };
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const k = v => Math.round(v.k);

  // 1 · la mediatriz de A(1, 1) y B(5, 3): 2x + y = 8.   v { k }
  const P1 = pl({ x0: 0, x1: 8, y0: 0, y1: 7 }, 40, 196, 24);
  const A1 = [1, 1], B1 = [5, 3], M1 = [3, 2];
  const media = (v, K) => {
    const q = k(v), A = P2(P1, A1), B = P2(P1, B1);
    let h = pap(K, P1) + K.l(A[0], A[1], B[0], B[1], 'lm') + dot(K, P1, A1, 'A', 'fk', 8, 16) + dot(K, P1, B1, 'B');
    if (q >= 1) h += dot(K, P1, M1, 'M', 'fA', -8, -8, 'end');
    if (q >= 2) for (const X of [[4, 0], [2, 4]]) { const Xp = P2(P1, X); h += K.l(Xp[0], Xp[1], A[0], A[1], 'lg d') + K.l(Xp[0], Xp[1], B[0], B[1], 'lf d') + K.c(Xp[0], Xp[1], 4.5, 'fo'); }
    if (q >= 3) h += rec(K, P1, 2, 1, 8, 'la gr');
    if (q >= 4) h += K.t(332, 18, 'PA² = PB²', 's ta', 'end');
    if (q >= 5) h += K.t(332, 38, '2x + y = 8', 's ta', 'end') + K.t(332, 58, 'B − A = (4, 2)', 's tm', 'end');
    return h;
  };
  // Tu turno: A(0, 2), B(4, 0); el punto de la mediatriz con x = 3.   v { x, y }
  const P1b = pl({ x0: 0, x1: 6, y0: 0, y1: 5 }, 60, 186, 28);
  const A1b = [0, 2], B1b = [4, 0];
  const hazMedia = (v, K) => {
    const X = [v.x, v.y], Xp = P2(P1b, X), A = P2(P1b, A1b), B = P2(P1b, B1b);
    return pap(K, P1b) + K.l(P1b.X(3), P1b.Y(0), P1b.X(3), P1b.Y(5), 'lm d') + K.t(P1b.X(3) + 6, P1b.Y(5) + 12, 'x = 3', 's tm', 'start')
      + K.l(Xp[0], Xp[1], A[0], A[1], 'lg d') + K.l(Xp[0], Xp[1], B[0], B[1], 'lf d') + dot(K, P1b, A1b, 'A', 'fk', -8, -8, 'end') + dot(K, P1b, B1b, 'B', 'fk', 8, 16)
      + K.t(332, 18, `PA² = ${d2(X, A1b)}`, 's tg', 'end') + K.t(332, 36, `PB² = ${d2(X, B1b)}`, 's tf', 'end');
  };

  // 2 · la circunferencia de centro (3, 2) y radio 5, desarrollada y con diámetro.   v { k }
  const P2c = pl({ x0: -3, x1: 9, y0: -3, y1: 7 }, 40 + 3 * 16, 50 + 7 * 16, 16);
  const C2 = [3, 2];
  const circulo = (v, K) => {
    const q = k(v), C = P2(P2c, C2);
    let h = pap(K, P2c) + dot(K, P2c, C2, 'C', 'fk', 8, 16);
    const X = [6, 6], Xp = P2(P2c, X);
    if (q <= 1) h += K.l(C[0], C[1], Xp[0], Xp[1], 'lg gr') + K.c(Xp[0], Xp[1], 4.5, 'fo') + K.t(Xp[0] + 8, Xp[1] - 6, 'X', 's', 'start') + K.t((C[0] + Xp[0]) / 2 + 10, (C[1] + Xp[1]) / 2 + 12, '5', 's tg', 'start');
    if (q >= 1) h += circ(K, P2c, C2, 5, 'la gr');
    if (q >= 2) h += K.t(8, 16, '(x − 3)² + (y − 2)² = 25', 's ta', 'start');
    if (q >= 3) h += K.t(8, 34, 'x² + y² − 6x − 4y − 12 = 0', 's tm', 'start');
    if (q >= 5) {
      const A = [0, -2], B = [6, 6], Ap = P2(P2c, A), Bp = P2(P2c, B), Z = P2(P2c, [-1, 5]);
      h += K.l(Ap[0], Ap[1], Bp[0], Bp[1], 'lf gr') + dot(K, P2c, A, 'A', 'fF', 8, 12) + dot(K, P2c, B, 'B', 'fF')
        + K.l(Z[0], Z[1], Ap[0], Ap[1], 'lm') + K.l(Z[0], Z[1], Bp[0], Bp[1], 'lm') + K.c(Z[0], Z[1], 4, 'fo') + K.t(Z[0] - 8, Z[1] - 6, '90°', 's to', 'end');
    }
    return h;
  };
  // Tu turno: el centro de x² + y² + 2x − 8y + 8 = 0.   v { x, y }
  const P2b = pl({ x0: -5, x1: 4, y0: 0, y1: 8 }, 70 + 5 * 22, 210, 22);
  const hazCentro = (v, K) => {
    const C = P2(P2b, [v.x, v.y]);
    return pap(K, P2b) + K.arc(C[0], C[1], 3 * P2b.u, 0, 360, 'la') + K.t(8, 16, 'x² + y² + 2x − 8y + 8 = 0', 's ta', 'start') + K.t(332, 16, `centro ${pt([v.x, v.y])}`, 's tm', 'end');
  };

  // 3 · cruces: dos rectas, recta y circunferencia (x² + y² = 8 con x + y = b) y dos circunferencias.   v { k, b }
  const P3 = pl({ x0: -4, x1: 7, y0: -4, y1: 7 }, 88 + 4 * 15, 42 + 7 * 15, 15);
  const cruce = (v, K) => {
    const q = k(v), O = P2(P3, [0, 0]);
    let h = pap(K, P3);
    if (q === 1) h += rec(K, P3, 1, -1, 0, 'lg gr') + rec(K, P3, 1, 1, 2, 'lf gr') + dot(K, P3, [1, 1], '(1, 1)', 'fo') + K.t(332, 18, 'x − y = 0 y x + y = 2', 's tm', 'end');
    if (q >= 2) {
      h += K.arc(O[0], O[1], Math.sqrt(8) * P3.u, 0, 360, 'lg gr');
      if (q <= 4) {
        h += rec(K, P3, 1, 1, v.b, 'la gr');
        const D = 64 - 4 * v.b * v.b, xs = D > 1e-9 ? [(v.b - Math.sqrt(D) / 2) / 2, (v.b + Math.sqrt(D) / 2) / 2] : Math.abs(D) < 1e-9 ? [v.b / 2] : [];
        h += xs.map(x => dot(K, P3, [x, v.b - x], '', xs.length === 1 ? 'fo' : 'fF')).join('');
        h += K.t(332, 18, `x + y = ${Math.round(v.b)}: Δ ${D > 1e-9 ? '> 0' : D < -1e-9 ? '< 0' : '= 0'}`, 's ta', 'end') + K.t(332, 36, ['', '', 'dos cortes', 'tangente', 'ningún corte'][q], 's tm', 'end');
      }
    }
    if (q >= 5) h += circ(K, P3, [4, 0], Math.sqrt(8), 'lf gr') + rec(K, P3, 1, 0, 2, 'la d') + dot(K, P3, [2, 2], '', 'fo') + dot(K, P3, [2, -2], '', 'fo') + K.t(332, 18, 'restando: x = 2', 's ta', 'end');
    return h;
  };
  // Tu turno: y = x + b tangente a x² + y² = 18.   v { b }
  const P3b = pl({ x0: -7, x1: 7, y0: -5, y1: 10 }, 79 + 7 * 13, 30 + 10 * 13, 13);
  const hazToca = (v, K) => {
    const O = P2(P3b, [0, 0]);
    return pap(K, P3b) + K.arc(O[0], O[1], Math.sqrt(18) * P3b.u, 0, 360, 'lg gr') + rec(K, P3b, -1, 1, v.b, 'la gr')
      + K.t(8, 16, 'x² + y² = 18', 's tg', 'start') + K.t(332, 16, `y = x + ${v.b}`, 's ta', 'end');
  };

  // 4 · bisectriz, circuncentro y regiones.   v { k }
  const P4 = pl({ x0: -1, x1: 9, y0: -1, y1: 6 }, 60 + 20, 48 + 6 * 20, 20);
  const otros = (v, K) => {
    const q = k(v), O = P2(P4, [0, 0]);
    let h = pap(K, P4);
    if (q <= 2) {
      const L = P2(P4, [8, 6]), F = P2(P4, [9, 0]);
      h += K.l(O[0], O[1], F[0], F[1], 'lm gr') + K.l(O[0], O[1], L[0], L[1], 'lm gr') + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 16, 'O', 's', 'end');
      const Q = [6, 2], Qp = P2(P4, Q), Fq = P2(P4, [6, 0]), Lq = P2(P4, [Q[0] * 16 / 25 + Q[1] * 12 / 25, Q[0] * 12 / 25 + Q[1] * 9 / 25]);
      h += K.l(Qp[0], Qp[1], Fq[0], Fq[1], 'lg') + K.l(Qp[0], Qp[1], Lq[0], Lq[1], 'lf') + K.c(Qp[0], Qp[1], 4.5, 'fo');
      if (q >= 1) h += rec(K, P4, 1, -3, 0, 'la gr') + K.t(332, 18, '(1, 0) + (4/5, 3/5) ∥ (3, 1)', 's ta', 'end');
      if (q >= 2) h += rec(K, P4, 3, -5, 0, 'lf d') + K.t(332, 36, '(1, 0) + (4, 3) = (5, 3): no', 's tf', 'end');
    } else if (q <= 4) {
      const T = [[0, 0], [6, 0], [4, 4]];
      h += K.p(T.map(t => P2(P4, t)), 'fn') + T.map((t, i) => dot(K, P4, t, 'ABC'[i], 'fk', i === 2 ? 8 : -6, i === 2 ? -6 : 16, i === 2 ? 'start' : 'end')).join('');
      h += rec(K, P4, 1, 0, 3, 'lg') + rec(K, P4, 1, 1, 4, 'lf');
      if (q >= 4) h += dot(K, P4, [3, 1], 'O', 'fA', 8, 14) + circ(K, P4, [3, 1], Math.sqrt(10), 'la gr') + K.t(332, 18, 'x = 3 y x + y = 4: O(3, 1)', 's ta', 'end');
    } else {
      const C = P2(P4, [4, 2]);
      h += K.sec(C[0], C[1], 3 * P4.u, 45, 225, 'fa') + K.arc(C[0], C[1], 3 * P4.u, 0, 360, 'la') + rec(K, P4, 1, -1, 2, 'lf');
      h += K.t(332, 18, '(x − 4)² + (y − 2)² ≤ 9', 's ta', 'end') + K.t(332, 36, 'y ≥ x − 2', 's tf', 'end');
    }
    return h;
  };
  // Tu turno: el circuncentro de A(0, 2), B(6, 2) y C(2, 6).   v { x, y }
  const P4b = pl({ x0: 0, x1: 7, y0: 0, y1: 7 }, 70, 208, 26);
  const T4 = [[0, 2], [6, 2], [2, 6]];
  const hazCirc = (v, K) => {
    const X = [v.x, v.y];
    let h = pap(K, P4b) + K.p(T4.map(t => P2(P4b, t)), 'fn') + T4.map((t, i) => dot(K, P4b, t, 'ABC'[i], 'fk', i === 1 ? 8 : -8, i === 2 ? -6 : 16, i === 1 ? 'start' : 'end')).join('');
    h += T4.map((t, i) => K.t(332, 18 + 18 * i, `${'ABC'[i]}: ${d2(X, t)}`, 's tm', 'end')).join('');
    return h + K.t(250, 18, 'distancias²', 's tm', 'end');
  };

  // Problema: el barco por y = 7 − x entra a la luz del faro x² + y² ≤ 25.   v { x }
  const PF = pl({ x0: -1, x1: 8, y0: -1, y1: 8 }, 60 + 22, 26 + 8 * 22, 22);
  const faro = (v, K) => {
    const O = P2(PF, [0, 0]);
    let h = pap(K, PF) + K.sec(O[0], O[1], 5 * PF.u, 0, 90, 'fa') + K.arc(O[0], O[1], 5 * PF.u, 0, 90, 'la') + K.p([[O[0], O[1] - 10], [O[0] - 6, O[1] + 5], [O[0] + 6, O[1] + 5]], 'fk');
    h += rec(K, PF, 1, 1, 7, 'lm gr d') + K.t(8, 16, 'luz: x² + y² ≤ 25', 's ta', 'start') + K.t(332, 16, 'ruta: y = 7 − x', 's tm', 'end');
    return h + K.t(332, 244, `el barco en ${pt([v.x, 7 - v.x])}: ${v.x * v.x + (7 - v.x) ** 2}`, 's tm', 'end');
  };

  xpLec('geo-13', [
    ['Lo que equidista: la mediatriz',
      xpMira('dibujo', 'Un **lugar geométrico** es el conjunto de todos los puntos que cumplen una condición.', { dib: media, v: { k: 0 }, alto: 214 }, [
        ['Hoy la condición es estar a la misma distancia de A y de B. ¿Qué puntos la cumplen?', {}],
        ['El punto medio M de AB la cumple: está justo a la mitad del camino.', { k: 1 }, '$M = \\left(\\tfrac{1 + 5}{2}, \\tfrac{1 + 3}{2}\\right) = (3, 2)$'],
        ['Pero no es el único: (4, 0) y (2, 4) también están a la misma distancia de A y de B.', { k: 2 }],
        ['Todos juntos forman una recta: la mediatriz. Pasa por M y es perpendicular a AB.', { k: 3 }],
        ['Su ecuación sale de igualar las distancias al cuadrado: los x² y los y² se cancelan.', { k: 4 }, '$(x - 1)^2 + (y - 1)^2 = (x - 5)^2 + (y - 3)^2 \\Rightarrow 8x + 4y = 32$'],
        ['Simplificada queda 2x + y = 8. Sus coeficientes van en la dirección de B − A.', { k: 5 }, '$2x + y = 8$'],
      ], 'Mediatriz de AB: los X con $\\|X - A\\| = \\|X - B\\|$, una recta por el punto medio.'),
      xpHaz('dibujo', 'Con A(0, 2) y B(4, 0), arrastra P a un punto de la recta $x = 3$ que esté a la misma distancia de A y de B.', { dib: hazMedia, v: { x: 1, y: 4 }, metas: { x: 3, y: 3 }, alto: 214,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [6, 5], paso: 1, en: v => P2(P1b, [v.x, v.y]), de: (x, y) => [(x - P1b.ox) / P1b.u, (P1b.oy - y) / P1b.u] }],
        lee: v => `$PA^2 = ${d2([v.x, v.y], A1b)}$ y $PB^2 = ${d2([v.x, v.y], B1b)}$`,
        dice: v => (v.x === 3 && v.y === 3 ? 'Justo: 9 + 1 = 10 y 1 + 9 = 10.' : v.x !== 3 ? 'Primero llévalo a la recta x = 3.' : 'Está en la recta; ahora iguala las dos distancias.') },
      'En $x = 3$: $9 + (y - 2)^2 = 1 + y^2$ da $4y = 12$ y $y = 3$.')],
    ['La circunferencia',
      xpMira('dibujo', 'Otra condición: estar a una distancia fija de un **centro**.', { dib: circulo, v: { k: 0 }, alto: 226 }, [
        ['Los puntos a distancia 5 de C forman una circunferencia: C es el centro y 5 el radio.', {}, '$\\|X - C\\| = 5$'],
        ['Con coordenadas, la distancia es Pitágoras: la diferencia en x y la diferencia en y.', { k: 1 }],
        ['Elevando al cuadrado sale su ecuación: así se ven el centro y el radio.', { k: 2 }, '$(x - 3)^2 + (y - 2)^2 = 25$'],
        ['Si se desarrolla, quedan escondidos: x² + y² − 6x − 4y − 12 = 0.', { k: 3 }],
        ['Para volver a verlos se completan cuadrados: a x² − 6x le falta 9 y a y² − 4y le falta 4.', { k: 4 }, '$x^2 - 6x + 9 + y^2 - 4y + 4 = 12 + 9 + 4$'],
        ['Con diámetro AB: centro en su punto medio, radio la mitad de AB. Desde el borde, AB se ve en ángulo recto.', { k: 5 }, '$A(0, -2),\\ B(6, 6):\\ M = (3, 2),\\ r = 5$'],
      ], 'Circunferencia: $(x - h)^2 + (y - k)^2 = r^2$. Si viene desarrollada, se completan cuadrados.'),
      xpHaz('dibujo', 'La ecuación $x^2 + y^2 + 2x - 8y + 8 = 0$ esconde una circunferencia de radio 3. Arrastra su centro.', { dib: hazCentro, v: { x: 2, y: 2 }, metas: { x: -1, y: 4 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [-5, 0], max: [4, 8], paso: 1, en: v => P2(P2b, [v.x, v.y]), de: (x, y) => [(x - P2b.ox) / P2b.u, (P2b.oy - y) / P2b.u] }],
        lee: v => `Centro en $${pt([v.x, v.y]).replace(/−/g, '-')}$`,
        dice: v => (v.x === -1 && v.y === 4 ? 'Sí: (x + 1)² + (y − 4)² = 1 + 16 − 8 = 9.' : v.x === 1 && v.y === -4 ? 'Los signos al revés: +2x viene de (x + 1)².' : 'Completa cuadrados: la mitad de cada coeficiente, con el signo cambiado.') },
      '$(x + 1)^2 + (y - 4)^2 = 9$: centro $(-1, 4)$ y radio 3.')],
    ['Donde se cruzan',
      xpMira('dibujo', 'Donde dos lugares se cortan, el punto cumple **las dos** condiciones a la vez.', { dib: cruce, v: { k: 0, b: 2 }, alto: 216 }, [
        ['Cortar dos lugares es resolver sus dos ecuaciones juntas.', {}],
        ['Dos rectas: un sistema 2 × 2. Estas dos se cortan en (1, 1).', { k: 1 }],
        ['Recta y circunferencia: al reemplazar y = 2 − x en la circunferencia sale una cuadrática. Dos raíces: dos cortes.', { k: 2, b: 2 }],
        ['Si la recta sube a x + y = 4, el discriminante da cero: un solo punto. La recta es tangente.', { k: 3, b: 4 }, '$2x^2 - 8x + 8 = 0$'],
        ['Más arriba, x + y = 6, el discriminante es negativo: la recta pasa por fuera.', { k: 4, b: 6 }],
        ['Dos circunferencias: al restar sus ecuaciones se van los cuadrados y queda una recta, la de la cuerda común.', { k: 5 }, '$8x - 16 = 0 \\Rightarrow x = 2$'],
      ], 'Cruzar lugares es resolver sus ecuaciones juntas; el discriminante dice si hay 2, 1 o 0 cortes.'),
      xpHaz('dibujo', 'Desliza b hasta que la recta $y = x + b$ toque la circunferencia $x^2 + y^2 = 18$ en **un solo punto**, por arriba.', { dib: hazToca, v: { b: 0 }, metas: { b: 6 }, alto: 274,
        manijas: [{ k: 'b', min: 0, max: 10, paso: 1, et: 'b' }],
        lee: v => `$2x^2 + ${2 * v.b}x + ${v.b * v.b - 18} = 0$: discriminante $${144 - 4 * v.b * v.b}$`.replace('+ -', '- '),
        dice: v => (v.b === 6 ? 'Tangente: 144 − 4·36 = 0, y toca en (−3, 3).' : v.b < 6 ? 'Todavía corta en dos puntos: el discriminante es positivo.' : 'Ya pasa por fuera: el discriminante es negativo.') },
      'Con $y = x + b$: $2x^2 + 2bx + b^2 - 18 = 0$, con discriminante $144 - 4b^2$, que es 0 si $b = 6$.')],
    ['Bisectriz, circuncentro y regiones',
      xpMira('dibujo', 'Tres lugares más: la **bisectriz**, el **circuncentro** y las **regiones**.', { dib: otros, v: { k: 0 }, alto: 200 }, [
        ['La bisectriz de un ángulo es el lugar de los puntos a la misma distancia de sus dos lados.', {}],
        ['Su dirección: la suma de los vectores unitarios de los lados. Aquí (1, 0) + (4/5, 3/5), que va como (3, 1).', { k: 1 }],
        ['Ojo: sumar (1, 0) + (4, 3) sin volverlos unitarios da otra recta, que no parte el ángulo en dos.', { k: 2 }],
        ['El circuncentro equidista de A, B y C: está en dos mediatrices a la vez.', { k: 3 }],
        ['Dos mediatrices se cortan en O. La circunferencia de centro O pasa por los tres puntos.', { k: 4 }, '$OA^2 = OB^2 = OC^2 = 10$'],
        ['Con desigualdades se describen regiones: ≤ en la circunferencia da el disco, y una recta lo parte.', { k: 5 }, '$(x - 4)^2 + (y - 2)^2 \\le 9,\\ y \\ge x - 2$'],
      ], 'Bisectriz: suma de unitarios. Circuncentro: cruce de mediatrices. Desigualdades: regiones.'),
      xpHaz('dibujo', 'Arrastra O al punto que está a la **misma distancia** de A(0, 2), B(6, 2) y C(2, 6).', { dib: hazCirc, v: { x: 1, y: 1 }, metas: { x: 3, y: 3 }, alto: 230,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [7, 7], paso: 1, en: v => P2(P4b, [v.x, v.y]), de: (x, y) => [(x - P4b.ox) / P4b.u, (P4b.oy - y) / P4b.u] }],
        lee: v => `Distancias al cuadrado: $${T4.map(t => d2([v.x, v.y], t)).join(',\\ ')}$`,
        dice: v => (v.x === 3 && v.y === 3 ? 'Justo: las tres distancias al cuadrado valen 10.' : v.x === 3 ? 'Estás en la mediatriz de AB; falta la de AC.' : 'Busca la mediatriz de AB (vertical) y la de AC, y crúzalas.') },
      'La mediatriz de AB es $x = 3$ y la de AC es $x + 2y = 9$: se cortan en $(3, 3)$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un faro en el origen ilumina hasta 5 km: $x^2 + y^2 \\le 25$. Un barco viene del oeste por la ruta $y = 7 - x$. Arrastra el barco al punto donde **entra** a la luz.', { dib: faro, v: { x: 0 }, metas: { x: 3 }, alto: 252,
        manijas: [{ k: 'x', min: -1, max: 8, paso: 1, en: v => P2(PF, [v.x, 7 - v.x]), de: x => (x - PF.ox) / PF.u }],
        lee: v => `$x^2 + (7 - x)^2 = ${v.x * v.x + (7 - v.x) ** 2}$`,
        dice: v => (v.x === 3 ? 'Ahí entra: 9 + 16 = 25. Sale en (4, 3).' : v.x === 4 ? 'Por (4, 3) el barco sale de la luz; viene del oeste, de x pequeños.' : 'Reemplaza y = 7 − x en x² + y² = 25 y resuelve la cuadrática.') },
      '$x^2 + (7 - x)^2 = 25$ da $x^2 - 7x + 12 = 0$, con $x = 3$ o $x = 4$: entra en $(3, 4)$ y sale en $(4, 3)$.')],
  ], 'Un lugar es una condición; sus cruces salen de sistemas, cuadráticas y restas de ecuaciones.');
}
;
//#archivo js/explora-gva-14.js
// Geometría Vectorial · explicación de geo-14 «Producto escalar» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: el producto escalar mide cuánto empuja una flecha en la dirección de otra (la sombra por la norma); luego la
// cuenta con coordenadas y por qué coincide (ley del coseno), el signo y la perpendicularidad, las propiedades, el ángulo y los
// cosenos directores. Sin proyección (geo-15). Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 100) / 100);
  const pl = (B, ox, oy, u) => ({ ...B, X: x => ox + x * u, Y: y => oy - y * u });
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const tu = a => `(${a.map(sg).join(', ')})`;
  const ejes = (K, o, u, L = 4) => {
    let h = '';
    [[[L, 0, 0], 'x'], [[0, L, 0], 'y'], [[0, 0, L], 'z']].forEach(([a, s]) => { const A = K.iso(o, u, ...a); h += K.ar(o[0], o[1], A[0], A[1], 'lm') + K.t(A[0] + (s === 'y' ? -8 : 8), A[1] + 4, s, 's tm', s === 'y' ? 'end' : 'start'); });
    return h;
  };

  // 1 · cuánto se acompañan: la sombra de v sobre la recta de u, por la norma de u
  const O1 = [150, 126];
  const sombra = (v, K) => {
    const s = v.s, U = [O1[0] + v.a * s, O1[1]], V = K.at(O1[0], O1[1], v.b * s, v.th), F = [O1[0] + v.b * s * Math.cos(v.th * R), O1[1]], d = v.a * v.b * Math.cos(v.th * R);
    let h = K.l(16, O1[1], 324, O1[1], 'lm') + K.ar(O1[0], O1[1], U[0], U[1], 'lg gr') + K.t(U[0] + 4, U[1] + 16, `u: ${v.a}`, 's tg', 'end')
      + K.ar(O1[0], O1[1], V[0], V[1], 'lf gr') + K.t(V[0] + 6, V[1] - 6, `v: ${v.b}`, 's tf', 'start') + K.c(O1[0], O1[1], 4, 'fk');
    if (v.th > 1) h += K.arc(O1[0], O1[1], 22, 0, v.th, 'la') + K.t(...K.at(O1[0], O1[1], 36, v.th / 2).map((z, i) => z + (i ? 5 : 0)), `${Math.round(v.th)}°`, 's ta');
    h += K.f(v.sombra, K.l(V[0], V[1], F[0], F[1], 'lm d') + (Math.abs(F[0] - O1[0]) > 2 ? K.l(O1[0], O1[1] + 1, F[0], O1[1] + 1, 'lo gr') : ''));
    const X = w => 40 + (w + v.a * v.b) / (2 * v.a * v.b) * 260, Y = 178;
    return h + K.f(v.val, K.l(40, Y, 300, Y, 'lm') + K.l(X(0), Y - 5, X(0), Y + 5, 'lm') + K.t(40, Y + 16, sg(-v.a * v.b), 's tm') + K.t(300, Y + 16, `${v.a * v.b}`, 's tm')
      + K.c(X(d), Y, 6, d < -1e-9 ? 'ff' : 'fo') + K.t(332, 18, `u · v = ${fm(d)}`, 's ta', 'end'));
  };
  const OH = [170, 168];
  const hazSombra = (v, K) => {
    const s = 26, U = [OH[0] + 2 * s, OH[1]], V = K.at(OH[0], OH[1], 5 * s, v.th);
    let h = K.l(16, OH[1], 324, OH[1], 'lm') + K.ar(OH[0], OH[1], U[0], U[1], 'lg gr') + K.t(U[0], U[1] + 16, 'u: 2', 's tg') + K.ar(OH[0], OH[1], V[0], V[1], 'lf gr') + K.c(OH[0], OH[1], 4, 'fk');
    if (v.th > 1) h += K.arc(OH[0], OH[1], 20, 0, v.th, 'la');
    return h + K.t(8, 18, `θ = ${v.th}°, v: 5`, 's ta', 'start');
  };

  // 2 · la cuenta con coordenadas y por qué coincide: la ley del coseno en el triángulo de u, v y u − v
  const P2 = pl({ x0: 0, x1: 6, y0: 0, y1: 4 }, 30, 176, 34);
  const coord = (v, K) => {
    const O = [P2.X(0), P2.Y(0)], U = [P2.X(4), P2.Y(1)], V = [P2.X(1), P2.Y(3)];
    let h = pap(K, P2) + K.ar(O[0], O[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1] + 4, 'u (4, 1)', 's tg', 'start') + K.ar(O[0], O[1], V[0], V[1], 'lf gr') + K.t(V[0] + 6, V[1] - 4, 'v (1, 3)', 's tf', 'start') + K.c(O[0], O[1], 4, 'fk');
    h += K.f(v.tri, K.ar(V[0], V[1], U[0], U[1], 'la gr d') + K.t((U[0] + V[0]) / 2 + 10, (U[1] + V[1]) / 2 - 6, 'u − v', 's ta', 'start') + K.ang(O, U, V, 22, 'θ', 'fa', 's ta'));
    return h;
  };
  const coordHaz = (v, K) => {
    const a = [2, -1, 3], b = [1, 4, 2];
    let h = K.t(170, 36, `u = ${tu(a)}    v = ${tu(b)}`, 'ta');
    a.forEach((x, i) => { const cx = 70 + 100 * i; h += K.r(cx - 40, 62, 80, 40, 'fn', 8) + K.t(cx, 87, `${x < 0 ? `(${sg(x)})` : x} · ${sg(b[i])}`, 's'); if (i) h += K.t(cx - 50, 87, '+', 'tm'); });
    return h + K.t(170, 136, `tu suma: ${sg(v.d)}`, 'ta');
  };

  // 3 · perpendiculares y propiedades
  const P3 = pl({ x0: -3, x1: 6, y0: -3, y1: 4 }, 112, 116, 24);
  const perp = (v, K) => {
    const O = [P3.X(0), P3.Y(0)], at = q => [P3.X(q[0]), P3.Y(q[1])], U = at([2, 1]), W = at([-1, 2]);
    let h = pap(K, P3) + K.ar(O[0], O[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1] + 4, '(2, 1)', 's tg', 'start') + K.c(O[0], O[1], 4, 'fk');
    h += K.f(v.perp, K.ar(O[0], O[1], W[0], W[1], 'lf gr') + K.t(W[0] - 6, W[1] - 4, '(−1, 2)', 's tf', 'end')
      + K.pl([[O[0] + 9, O[1] - 4.5], [O[0] + 4.5, O[1] - 13.5], [O[0] - 4.5, O[1] - 9]], 'lo'));
    const A = at([2, 4]), B = at([6, -3]);
    return h + K.f(v.k, K.ar(O[0], O[1], A[0], A[1], 'la gr') + K.t(A[0] + 6, A[1] + 4, '(k, 4), k = 2', 's ta', 'start') + K.ar(O[0], O[1], B[0], B[1], 'lm gr') + K.t(B[0] + 6, B[1] - 6, '(6, −3)', 's tm', 'start'));
  };
  const OK = [170, 112];
  const perpHaz = (v, K) => {
    const a = [1, v.k, 3], b = [v.k, 2, -4], A = K.iso(OK, 11, ...a), B = K.iso(OK, 11, ...b);
    return ejes(K, OK, 11, 5) + K.ar(OK[0], OK[1], A[0], A[1], 'lg gr') + K.ar(OK[0], OK[1], B[0], B[1], 'lf gr') + K.c(OK[0], OK[1], 4, 'fk')
      + K.t(8, 18, `u = ${tu(a)}`, 's tg', 'start') + K.t(8, 36, `v = ${tu(b)}`, 's tf', 'start');
  };

  // 4 · el ángulo entre dos vectores y los ángulos directores
  const O4 = [150, 164], U4 = 26;
  const angulo = (v, K) => {
    const I = q => K.iso(O4, U4, ...q);
    let h = ejes(K, O4, U4, 4.6) + K.c(O4[0], O4[1], 4, 'fk');
    if (!v.dir) {
      const U = I([3, 0, 4]), V = I([0, 0, 2]);
      h += K.ar(O4[0], O4[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1], 'u (3, 0, 4)', 's tg', 'start') + K.ar(O4[0], O4[1], V[0], V[1], 'lf gr') + K.t(V[0] - 10, V[1] + 14, 'v (0, 0, 2)', 's tf', 'end');
    } else {
      const P = I([1, 2, 2]), Pb = I([1, 2, 0]);
      h += K.pl([I([1, 0, 0]), Pb, I([0, 2, 0])], 'lm d') + K.l(Pb[0], Pb[1], P[0], P[1], 'lm d') + K.ar(O4[0], O4[1], P[0], P[1], 'la gr') + K.t(P[0] - 8, P[1] + 2, 'u (1, 2, 2)', 's ta', 'end');
    }
    return h + K.f(v.ejes, K.t(332, 18, 'α con x, β con y, γ con z', 's tm', 'end'));
  };
  const CD = [170, 150], RD = 84;
  const anguloHaz = (v, K) => {
    let h = K.arc(CD[0], CD[1], RD, 0, 180, 'lm') + K.l(CD[0] - RD - 6, CD[1], CD[0] + RD + 6, CD[1], 'lm') + K.t(CD[0] + RD + 4, CD[1] + 16, '0°', 's tm') + K.t(CD[0] - RD - 4, CD[1] + 16, '180°', 's tm') + K.t(CD[0], CD[1] - RD - 8, '90°', 's tm');
    const T = K.at(CD[0], CD[1], RD, v.g);
    h += K.l(CD[0], CD[1], CD[0] + RD * 0.8, CD[1], 'lg gr') + K.t(CD[0] + RD * 0.8, CD[1] - 8, 'eje z', 's tg', 'end') + K.l(CD[0], CD[1], T[0], T[1], 'la gr') + K.c(CD[0], CD[1], 3, 'fk');
    return h + K.t(8, 18, 'u = (1, 0, −1)', 's ta', 'start') + K.t(332, 18, `γ = ${v.g}°`, 's ta', 'end');
  };

  // Problema: la cuenta de una compra es un producto escalar
  const compra = (v, K) => {
    const c = [3, 2, 4], pr = [5, 1, 2], et = ['cuadernos', 'lápices', 'borradores'];
    let h = K.t(8, 18, 'cantidades (3, 2, 4) · precios (5, 1, 2)', 's tm', 'start');
    c.forEach((n, i) => { const cx = 62 + 108 * i; h += K.r(cx - 46, 40, 92, 70, 'fn', 8) + K.t(cx, 62, et[i], 's tm') + K.t(cx, 88, `${n} × ${pr[i]} mil`, 's ta'); });
    return h + K.t(170, 150, `total: ${v.t} mil pesos`, 'ta');
  };

  xpLec('geo-14', [
    ['Cuánto se acompañan dos flechas',
      xpMira('dibujo', 'Un carro avanza por un riel y una cuerda tira de él en diagonal. ¿Cuánto de ese tirón sirve para **avanzar**?', { dib: sombra, v: { a: 4, b: 3, s: 30, th: 30, sombra: 0, val: 0 }, alto: 204 }, [
        ['El riel va en la dirección de u y la cuerda tira según v, con un ángulo θ entre ellas.', {}],
        ['Lo que sirve para avanzar es la sombra de v sobre la recta de u: mide ‖v‖ cos θ.', { sombra: 1 }, '$\\|\\vec v\\|\\cos\\theta$'],
        ['El producto escalar multiplica esa sombra por ‖u‖. El resultado es un número, no una flecha.', { th: 60, val: 1 }, '$\\vec u \\cdot \\vec v = \\|\\vec u\\|\\,\\|\\vec v\\|\\cos\\theta = 4 \\cdot 3 \\cdot \\tfrac12 = 6$'],
        ['A 90° la sombra desaparece y el producto vale 0: dos flechas perpendiculares no se ayudan.', { th: 90 }, '$4 \\cdot 3 \\cos 90^{\\circ} = 0$'],
        ['Pasado 90° la sombra cae hacia atrás y el producto es negativo: el ángulo es obtuso.', { th: 135 }, '$4 \\cdot 3 \\cos 135^{\\circ} \\approx -8.49$'],
        ['Lo más grande es con θ = 0°, y lo más negativo con 180°. Nunca pasa de ‖u‖‖v‖.', { th: 0 }, '$|\\vec u \\cdot \\vec v| \\le \\|\\vec u\\|\\,\\|\\vec v\\|$'],
      ], 'u · v = ‖u‖‖v‖ cos θ: positivo si el ángulo es agudo, 0 si es recto y negativo si es obtuso.'),
      xpHaz('dibujo', 'Si $\\|\\vec u\\| = 2$ y $\\|\\vec v\\| = 5$, gira $\\vec v$ hasta que $\\vec u \\cdot \\vec v = -5$.', { dib: hazSombra, v: { th: 30 }, metas: { th: 120 }, alto: 200,
        manijas: [{ k: 'th', min: 0, max: 180, paso: 15, en: v => [OH[0] + 130 * Math.cos(v.th * R), OH[1] - 130 * Math.sin(v.th * R)],
          de: (x, y) => { const g = Math.atan2(OH[1] - y, x - OH[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
        lee: v => `$\\vec u \\cdot \\vec v = 2 \\cdot 5 \\cos ${v.th}^{\\circ} = ${fm(10 * Math.cos(v.th * R)).replace('−', '-')}$`,
        dice: v => (v.th === 120 ? 'Justo: 10 · cos 120° = 10 · (−½) = −5.' : v.th === 60 ? 'Con 60° da +5: el producto negativo pide un ángulo obtuso.' : 'Busca el ángulo con 10 · cos θ = −5, o sea cos θ = −½.') },
        'Con cos θ = −½ el ángulo es 120°: obtuso, porque el producto es negativo.')],
    ['La cuenta con coordenadas',
      xpMira('dibujo', 'Con coordenadas el producto escalar es una cuenta rápida. Y da **lo mismo** que la fórmula del ángulo.', { dib: coord, v: { tri: 0 }, alto: 200 }, [
        ['Primera coordenada por primera, segunda por segunda, y se suman.', {}, '$(4, 1) \\cdot (1, 3) = 4 \\cdot 1 + 1 \\cdot 3 = 7$'],
        ['¿Por qué coincide con ‖u‖‖v‖ cos θ? Mira el triángulo que forman u, v y u − v.', { tri: 1 }],
        ['La ley del coseno en ese triángulo dice cuánto mide el lado u − v.', {}, '$\\|\\vec u - \\vec v\\|^2 = \\|\\vec u\\|^2 + \\|\\vec v\\|^2 - 2\\|\\vec u\\|\\|\\vec v\\|\\cos\\theta$'],
        ['Con coordenadas ese lado mide (4 − 1)² + (1 − 3)² = 13, y ‖u‖² + ‖v‖² = 17 + 10.', {}, '$13 = 27 - 2\\|\\vec u\\|\\|\\vec v\\|\\cos\\theta$'],
        ['Despejando, ‖u‖‖v‖ cos θ = 7: la misma suma de productos. Al desarrollar siempre pasa.', {}, '$\\|\\vec u\\|\\|\\vec v\\|\\cos\\theta = u_1v_1 + u_2v_2$'],
        ['En el espacio se suma también el producto de las terceras coordenadas.', {}, '$(1, 2, 3) \\cdot (4, 0, -1) = 4 + 0 - 3 = 1$'],
      ], 'En R³: u · v = u₁v₁ + u₂v₂ + u₃v₃; la ley del coseno muestra que es lo mismo que ‖u‖‖v‖ cos θ.'),
      xpHaz('dibujo', 'Calcula $\\vec u \\cdot \\vec v$ para $\\vec u = (2, -1, 3)$ y $\\vec v = (1, 4, 2)$ y fija el resultado en la regla.', { dib: coordHaz, v: { d: 0 }, metas: { d: 4 }, alto: 210,
        manijas: [{ k: 'd', min: -10, max: 12, paso: 1, et: 'u · v' }],
        lee: v => `Tu valor: $${v.d}$`,
        dice: v => (v.d === 4 ? 'Justo: 2 − 4 + 6 = 4.' : v.d === 12 ? 'Ojo con el signo: (−1) · 4 = −4, no +4.' : 'Multiplica cada pareja de coordenadas y suma los tres productos.') },
        'Se emparejan coordenadas: 2 · 1 + (−1) · 4 + 3 · 2 = 4.')],
    ['Perpendiculares y propiedades',
      xpMira('dibujo', 'Un producto escalar **cero** es una señal: las flechas forman ángulo recto. Y la cuenta tiene reglas parecidas a las de multiplicar.', { dib: perp, v: { perp: 0, k: 0 }, alto: 210 }, [
        ['Si u · v = 0 y ninguno es el vector nulo, cos θ = 0: forman ángulo recto. Se dicen ortogonales.', {}, '$\\vec u \\perp \\vec v \\iff \\vec u \\cdot \\vec v = 0$'],
        ['En el plano, (a, b) es perpendicular a (−b, a): se cambian de lugar y a una se le cambia el signo.', { perp: 1 }, '$(2, 1) \\cdot (-1, 2) = -2 + 2 = 0$'],
        ['Con una incógnita: (k, 4) y (6, −3) son perpendiculares si 6k − 12 = 0, o sea k = 2.', { k: 1 }, '$6k - 12 = 0 \\Rightarrow k = 2$'],
        ['Un vector por sí mismo da su norma al cuadrado: el ángulo es 0° y cos 0° = 1.', {}, '$(2, 1) \\cdot (2, 1) = 5 = \\|(2, 1)\\|^2$'],
        ['El orden no importa, se reparte sobre la suma y un número sale afuera, como al multiplicar.', {}, '$\\vec u \\cdot (\\vec v + \\vec w) = \\vec u \\cdot \\vec v + \\vec u \\cdot \\vec w, \\quad (r\\vec u) \\cdot \\vec v = r(\\vec u \\cdot \\vec v)$'],
        ['Con esas reglas, una norma al cuadrado se desarrolla como un binomio.', {}, '$\\|\\vec u + \\vec v\\|^2 = \\|\\vec u\\|^2 + 2\\,\\vec u \\cdot \\vec v + \\|\\vec v\\|^2$'],
      ], 'u ⊥ v si y solo si u · v = 0; además u · u = ‖u‖², y el producto es conmutativo y distributivo.'),
      xpHaz('dibujo', 'Elige $k$ para que $\\vec u = (1, k, 3)$ y $\\vec v = (k, 2, -4)$ sean **perpendiculares**.', { dib: perpHaz, v: { k: 0 }, metas: { k: 4 }, alto: 230,
        manijas: [{ k: 'k', min: -6, max: 6, paso: 1, et: 'k' }],
        lee: v => `$\\vec u \\cdot \\vec v = ${v.k} + 2 \\cdot (${v.k}) - 12 = ${3 * v.k - 12}$`,
        dice: v => (v.k === 4 ? 'Justo: 4 + 8 − 12 = 0.' : v.k === -4 ? 'Con −4 da −24: el −12 pasa al otro lado como +12.' : 'Plantea k + 2k − 12 = 0 y despeja k.') },
        'k · 1 + 2 · k + 3 · (−4) = 3k − 12 = 0, así que k = 4.')],
    ['Ángulos y cosenos directores',
      xpMira('dibujo', 'Si se conocen las coordenadas, el **ángulo** entre dos vectores sale de juntar las dos fórmulas.', { dib: angulo, v: { dir: 0, ejes: 0 }, alto: 220 }, [
        ['Igualando las dos fórmulas se despeja el coseno del ángulo.', {}, '$\\cos\\theta = \\tfrac{\\vec u \\cdot \\vec v}{\\|\\vec u\\|\\,\\|\\vec v\\|}$'],
        ['Por ejemplo, para u = (3, 0, 4) y v = (0, 0, 2) el coseno da 0.8.', {}, '$\\cos\\theta = \\tfrac{8}{5 \\cdot 2} = 0.8, \\quad \\theta \\approx 36.9^{\\circ}$'],
        ['Los ángulos de un vector con los ejes x, y, z se llaman ángulos directores: α, β y γ.', { dir: 1, ejes: 1 }],
        ['Con el eje x se usa (1, 0, 0), que tiene norma 1: el producto deja solo la primera coordenada.', {}, '$\\cos\\alpha = \\tfrac{u_1}{\\|\\vec u\\|}, \\ \\cos\\beta = \\tfrac{u_2}{\\|\\vec u\\|}, \\ \\cos\\gamma = \\tfrac{u_3}{\\|\\vec u\\|}$'],
        ['Para u = (1, 2, 2), de norma 3, los cosenos directores son 1/3, 2/3 y 2/3.', {}, '$\\cos\\alpha = \\tfrac13, \\ \\cos\\beta = \\tfrac23, \\ \\cos\\gamma = \\tfrac23$'],
        ['Sus cuadrados siempre suman 1: son las coordenadas del vector unitario en la dirección de u.', {}, '$\\tfrac19 + \\tfrac49 + \\tfrac49 = 1$'],
      ], 'cos θ = u · v / (‖u‖‖v‖); los cosenos directores son u₁, u₂, u₃ divididos por ‖u‖, y sus cuadrados suman 1.'),
      xpHaz('dibujo', 'El vector $\\vec u = (1, 0, -1)$ forma con el eje $z$ el ángulo $\\gamma$. Abre el transportador hasta $\\gamma$.', { dib: anguloHaz, v: { g: 30 }, metas: { g: 135 }, alto: 200,
        manijas: [{ k: 'g', min: 0, max: 180, paso: 15, en: v => [CD[0] + RD * Math.cos(v.g * R), CD[1] - RD * Math.sin(v.g * R)],
          de: (x, y) => { const g = Math.atan2(CD[1] - y, x - CD[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
        lee: v => `$\\cos\\gamma = \\tfrac{-1}{\\sqrt 2}$; tu ángulo: $${v.g}^{\\circ}$`,
        dice: v => (v.g === 135 ? 'Justo: cos γ = −1/√2, un ángulo obtuso de 135°.' : v.g === 45 ? 'Ese tiene coseno +1/√2; la coordenada en z es negativa.' : 'cos γ = u₃/‖u‖ = −1/√2: busca ese ángulo.') },
        'cos γ = −1/√2: γ = 135°. La coordenada en z es negativa, así que el ángulo con el eje z es obtuso.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Compras **3** cuadernos, **2** lápices y **4** borradores a **5**, **1** y **2** mil pesos. El total es cantidades · precios. Fíjalo.', { dib: compra, v: { t: 0 }, metas: { t: 25 }, alto: 210,
        manijas: [{ k: 't', min: 0, max: 40, paso: 1, et: 'total, en miles de pesos' }],
        lee: v => `$(3, 2, 4) \\cdot (5, 1, 2) = 15 + 2 + 8$; tu total: $${v.t}$`,
        dice: v => (v.t === 25 ? 'Justo: 15 + 2 + 8 = 25 mil pesos.' : v.t === 17 ? 'Sumaste cantidades y precios: se multiplica cada cantidad por su precio.' : 'Multiplica cada cantidad por su precio y suma.') },
        'La cuenta de una compra es un producto escalar: (3, 2, 4) · (5, 1, 2) = 25 mil pesos.')],
  ], 'El producto escalar dice cuánto se acompañan dos vectores: con él salen ángulos, perpendiculares y cosenos directores.');
}
;
//#archivo js/explora-gva-15.js
// Geometría Vectorial · explicación de geo-15 «Proyección ortogonal» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: la proyección es la sombra bajo una luz perpendicular a la recta de v; luego su largo con signo (componente
// escalar) y la flecha (u·v / ‖v‖²)·v, que no depende del largo ni del sentido de v; la parte perpendicular que sobra; y el punto más
// cercano de una recta, por el origen o por otro punto. Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const r2 = x => Math.round(x * 100) / 100;
  const pl = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h + K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
  };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const unit = v => { const L = Math.hypot(...v) || 1; return v.map(x => x / L); };
  // La recta A + t·d dentro del papel (se recorre a pasos y se queda con lo que cae adentro).
  const recta = (K, P, A, d, cls) => {
    const den = [];
    for (let t = -30; t <= 30; t += 0.05) { const q = [A[0] + t * d[0], A[1] + t * d[1]]; if (q[0] >= P.x0 && q[0] <= P.x1 && q[1] >= P.y0 && q[1] <= P.y1) den.push(q); }
    return den.length > 1 ? K.l(...P2(P, den[0]), ...P2(P, den.at(-1)), cls) : '';
  };
  const recto = (K, F, a, b, cls = 'lm', s = 8) => {
    const ua = unit(a), ub = unit(b);
    return K.pl([[F[0] + s * ua[0], F[1] + s * ua[1]], [F[0] + s * (ua[0] + ub[0]), F[1] + s * (ua[1] + ub[1])], [F[0] + s * ub[0], F[1] + s * ub[1]]], cls);
  };
  const rot = (K, A, B, s, cls, lado = 1) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * 12, (A[1] + B[1]) / 2 - lado * dx / L * 12 + 4, s, `s ${cls}`);
  };

  // 1 · la sombra bajo una luz perpendicular: v horizontal, u de largo 5 con el ángulo θ
  const O1 = [170, 190], U1 = 24;
  const sombra = (v, K) => {
    const T = [O1[0] + 5 * U1 * Math.cos(v.th * R), O1[1] - 5 * U1 * Math.sin(v.th * R)], c = 5 * Math.cos(v.th * R), F = [O1[0] + c * U1, O1[1]];
    let h = K.l(14, O1[1], 326, O1[1], 'lm gr') + K.ar(O1[0], O1[1], O1[0] + 4 * U1, O1[1], 'lg gr') + K.t(O1[0] + 4 * U1, O1[1] + 18, 'v', 's tg');
    h += K.f(v.luz, [-60, -30, 0, 30, 60].filter(o => T[0] + o > 6 && T[0] + o < 334).map(o => K.l(T[0] + o, 28, T[0] + o, O1[1], 'ls d')).join('') + K.t(332, 18, 'luz ⟂ a la recta de v', 's tm', 'end'));
    h += K.ar(O1[0], O1[1], T[0], T[1], 'lf gr') + K.t(T[0] + 8, T[1] - 4, 'u', 's tf', 'start') + K.c(O1[0], O1[1], 4, 'fk');
    if (Math.abs(c) > 0.05) h += K.f(v.som, K.l(T[0], T[1], F[0], F[1], 'lm d') + K.l(O1[0], O1[1] + 1, F[0], F[1] + 1, 'la gr') + recto(K, F, [c > 0 ? -1 : 1, 0], [0, -1]));
    h += K.f(v.pr * (Math.abs(c) > 0.05 ? 1 : 0), K.t((O1[0] + F[0]) / 2, O1[1] + 18, 'proy', 's ta'));
    return h + K.f(v.cm, K.t(8, 18, `θ = ${Math.round(v.th)}°, comp = 5 cos θ = ${sg(r2(c))}`, 's ta', 'start'));
  };
  const hazSombra = (v, K) => {
    const T = [O1[0] - 3 * U1, O1[1] - 4 * U1];
    let h = K.l(14, O1[1], 326, O1[1], 'lm gr') + K.ar(O1[0], O1[1], O1[0] + 2 * U1, O1[1], 'lg gr') + K.t(O1[0] + 2 * U1, O1[1] + 18, 'v', 's tg');
    for (let k = -6; k <= 6; k++) h += K.l(O1[0] + k * U1, O1[1] - 4, O1[0] + k * U1, O1[1] + 4, 'lm') + (k % 2 ? '' : K.t(O1[0] + k * U1, O1[1] + 32, sg(k), 's tm'));
    return h + K.ar(O1[0], O1[1], T[0], T[1], 'lf gr') + K.t(T[0] - 8, T[1], 'u', 's tf', 'end') + K.c(O1[0], O1[1], 4, 'fk') + K.t(8, 18, `tu sombra llega a ${sg(v.x)}`, 's ta', 'start');
  };

  // 2 · la cuenta de la sombra: u = (1, 5) sobre k·(2, 2)
  const P2a = pl({ x0: -3, x1: 6, y0: -3, y1: 6 }, 137, 150, 22);
  const cuenta = (v, K) => {
    const O = [P2a.ox, P2a.oy], U = P2(P2a, [1, 5]), V = P2(P2a, [2 * v.k, 2 * v.k]), F = P2(P2a, [3, 3]);
    let h = pap(K, P2a) + recta(K, P2a, [0, 0], [1, 1], 'lm d') + K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 10, V[1] + 14, `${v.k === 1 ? '' : sg(r2(v.k))}v`, 's tg', 'start');
    h += K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] - 6, U[1] - 4, 'u', 's tf', 'end');
    if (v.k > 0) h += K.ang(O, U, V, 18, 'θ', 'fn', 's tm');
    h += K.f(v.som, K.l(U[0], U[1], F[0], F[1], 'lm d') + recto(K, F, [-1, 1], [U[0] - F[0], U[1] - F[1]]));
    return h + K.f(v.pr, K.ar(O[0], O[1], F[0], F[1], 'la gr') + K.t(F[0] + 12, F[1] + 2, 'proy', 's ta', 'start'));
  };
  const P2b = pl({ x0: -2, x1: 7, y0: -4, y1: 3 }, 104, 92, 24);
  const hazCuenta = (v, K) => {
    const O = [P2b.ox, P2b.oy], U = P2(P2b, [5, 1]), V = P2(P2b, [1, -1]), C = P2(P2b, [v.c, -v.c]);
    let h = pap(K, P2b) + recta(K, P2b, [0, 0], [1, -1], 'lm d') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] + 8, U[1] - 4, 'u = (5, 1)', 's tf', 'start');
    if (Math.abs(v.c) > 0.05) h += K.ar(O[0], O[1], C[0], C[1], 'la gr') + K.l(U[0], U[1], C[0], C[1], 'ls d');
    return h + K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 8, V[1] + 4, 'v', 's tg', 'start') + K.t(332, 18, `${sg(v.c)}·v = (${sg(v.c)}, ${sg(-v.c)})`, 's ta', 'end');
  };

  // 3 · paralela más perpendicular: u = (7, 1) sobre v = (3, 4)
  const P3 = pl({ x0: -1, x1: 8, y0: -4, y1: 5 }, 80, 124, 20);
  const partes = (v, K) => {
    const O = [P3.ox, P3.oy], U = P2(P3, [7, 1]), V = P2(P3, [3, 4]), Q = P2(P3, [4, -3]);
    let h = pap(K, P3) + recta(K, P3, [0, 0], [3, 4], 'lm d') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] + 6, U[1] + 16, 'u', 's tf', 'start');
    h += K.f(1 - v.p, K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] - 8, V[1] - 4, 'v', 's tg', 'end'));
    h += K.f(v.p, K.ar(O[0], O[1], V[0], V[1], 'la gr') + K.t(V[0] - 8, V[1] - 4, 'p', 's ta', 'end'));
    h += K.f(v.q, K.ar(V[0], V[1], U[0], U[1], 'lo gr d') + K.ar(O[0], O[1], Q[0], Q[1], 'lo gr') + K.t(Q[0] + 8, Q[1] + 4, 'q', 's to', 'start'));
    h += K.f(v.rec, recto(K, O, [V[0] - O[0], V[1] - O[1]], [Q[0] - O[0], Q[1] - O[1]], 'lo'));
    return h + K.f(v.cierra, K.l(Q[0], Q[1], U[0], U[1], 'ls d') + K.t(332, 18, 'p + q = u', 's ta', 'end'));
  };
  const P3b = pl({ x0: -3, x1: 4, y0: -3, y1: 3 }, 140, 110, 26);
  const hazPartes = (v, K) => {
    const O = [P3b.ox, P3b.oy], U = P2(P3b, [3, -1]), V = P2(P3b, [1, 1]), Q = P2(P3b, [v.x, v.y]);
    let h = pap(K, P3b) + recta(K, P3b, [0, 0], [1, 1], 'lm d') + K.ar(O[0], O[1], U[0], U[1], 'lf gr') + K.t(U[0] + 8, U[1] + 4, 'u', 's tf', 'start');
    h += K.ar(O[0], O[1], V[0], V[1], 'lg gr') + K.t(V[0] + 8, V[1] - 4, 'v', 's tg', 'start');
    return h + (v.x || v.y ? K.ar(O[0], O[1], Q[0], Q[1], 'la gr') : '') + K.t(332, 18, `q = (${sg(v.x)}, ${sg(v.y)})`, 's ta', 'end');
  };

  // 4 · el punto más cercano: recta por el origen con d = (3, 4) y Q = (−1, 7); luego la recta por A = (4, −3)
  const P4 = pl({ x0: -3, x1: 8, y0: -4, y1: 8 }, 130, 154, 16);
  const cerca = (v, K) => {
    const A = v.mueve ? [4, -3] : [0, 0], Fq = v.mueve ? [7, 1] : [3, 4], Q = P2(P4, [-1, 7]), F = P2(P4, Fq), Ap = P2(P4, A), G = P2(P4, [A[0] + 1.6 * 3, A[1] + 1.6 * 4]);
    let h = pap(K, P4) + recta(K, P4, A, [3, 4], 'lm gr') + K.c(Ap[0], Ap[1], 4, 'fk') + K.t(Ap[0] + 8, Ap[1] + 4, v.mueve ? 'A' : 'O', 's', 'start');
    h += K.c(Q[0], Q[1], 5, 'fk') + K.t(Q[0] + 8, Q[1] + 4, 'Q', 's', 'start');
    h += K.f(v.pie, K.l(Q[0], Q[1], F[0], F[1], 'la gr') + K.c(F[0], F[1], 5, 'fo') + recto(K, F, [3, -4], [Q[0] - F[0], Q[1] - F[1]]));
    return h + K.f(v.otro, K.l(Q[0], Q[1], G[0], G[1], 'lf d') + K.c(G[0], G[1], 4, 'ff') + K.t(8, 18, 'otro punto: más lejos', 's tf', 'start'));
  };
  const P4b = pl({ x0: -5, x1: 4, y0: -2, y1: 7 }, 180, 160, 20);
  const hazCerca = (v, K) => {
    const Q = P2(P4b, [-1, 4]), A = P2(P4b, [-4, -1]), E = P2(P4b, [-4 + v.t, -1 + v.t]);
    return pap(K, P4b) + recta(K, P4b, [-4, -1], [1, 1], 'lm gr') + K.c(A[0], A[1], 4, 'fk') + K.t(A[0] + 8, A[1] + 12, 'A', 's', 'start')
      + K.c(Q[0], Q[1], 5, 'fk') + K.t(Q[0] - 8, Q[1] - 6, 'Q', 's', 'end') + K.l(Q[0], Q[1], E[0], E[1], 'la d')
      + K.t(332, 18, `E = (${sg(-4 + v.t)}, ${sg(-1 + v.t)})`, 's ta', 'end');
  };

  // Problema: la caja en la rampa de 30°
  const rampa = (v, K) => {
    const A = [40, 210], B = [300, 210], C = [300, 210 - 260 * Math.tan(30 * R)], M = [170, 210 - 130 * Math.tan(30 * R)], e = [Math.cos(30 * R), -Math.sin(30 * R)], nn = [e[1], -e[0]];
    const caja = [[-16, 0], [16, 0], [16, 26], [-16, 26]].map(([a, b]) => [M[0] + a * e[0] + b * nn[0], M[1] + a * e[1] + b * nn[1]]);
    let h = K.p([A, B, C], 'fc') + K.l(A[0], A[1], C[0], C[1], 'lm gr') + K.ang(A, B, C, 26, '30°', 'fn', 's tm');
    const c = [M[0] + 13 * nn[0], M[1] + 13 * nn[1]];
    h += K.p(caja, 'fk') + K.ar(c[0], c[1], c[0], c[1] + 96, 'lf gr') + K.t(c[0] + 8, c[1] + 92, 'peso 50 N', 's tf', 'start');
    h += K.ar(c[0], c[1], c[0] - 70 * e[0], c[1] - 70 * e[1], 'lg gr d') + K.t(c[0] - 76 * e[0] - 6, c[1] - 76 * e[1] - 6, 'rampa abajo', 's tg', 'end');
    return h + K.t(332, 18, `a lo largo: ${v.r} N`, 's ta', 'end');
  };

  xpLec('geo-15', [
    ['La sombra bajo una luz perpendicular',
      xpMira('dibujo', 'Si la luz cae **perpendicular** a la recta de $\\vec v$, la sombra de $\\vec u$ sobre esa recta es su **proyección ortogonal**.', { dib: sombra, v: { th: 55, luz: 0, som: 0, pr: 0, cm: 0 }, alto: 230 }, [
        ['Una flecha u y la recta de v. Imagina una luz que cae perpendicular a esa recta.', { luz: 1 }],
        ['La punta de u deja una sombra en el pie de la perpendicular. Esa sombra es la proyección de u sobre v.', { som: 1, pr: 1 }, '$\\operatorname{proy}_{\\vec v}\\vec u$'],
        ['Su largo con signo es la componente escalar: en el triángulo rectángulo, ‖u‖ cos θ.', { cm: 1 }, '$\\operatorname{comp}_{\\vec v}\\vec u = \\|\\vec u\\|\\cos\\theta$'],
        ['Si el ángulo es obtuso, la sombra cae al revés de v y la componente es negativa.', { th: 125 }, '$\\cos 125^{\\circ} < 0$'],
        ['Si u es perpendicular a v, no hay sombra: la proyección es el vector nulo.', { th: 90 }, '$\\operatorname{proy}_{\\vec v}\\vec u = \\vec 0$'],
        ['Si u ya está sobre la recta de v, su sombra es u misma.', { th: 0 }],
      ], 'La proyección de u sobre v es su sombra bajo una luz perpendicular a la recta de v; su largo con signo es ‖u‖ cos θ.'),
      xpHaz('dibujo', 'Arrastra la marca hasta donde llega la **sombra** de $\\vec u$ sobre la recta de $\\vec v$.', { dib: hazSombra, v: { x: 2 }, metas: { x: -3 }, alto: 230,
        manijas: [{ k: 'x', min: -6, max: 6, paso: 1, en: v => [O1[0] + v.x * U1, O1[1]], de: x => (x - O1[0]) / U1 }],
        lee: v => `Tu sombra llega a $${v.x}$`,
        dice: v => (v.x === -3 ? 'Justo: la sombra cae del lado contrario a v, en −3.' : v.x === 3 ? 'Ese es el largo, pero u apunta hacia la izquierda: la sombra cae al revés de v.'
          : v.x === 5 ? 'Ese es el largo de u, no el de su sombra.' : 'Baja derecho desde la punta de u, en ángulo recto con la recta.') },
        'La sombra de u cae en −3: componente negativa, porque el ángulo con v es obtuso.')],
    ['La cuenta de la sombra',
      xpMira('dibujo', 'El producto escalar ya trae escondida la sombra: de ahí salen la **componente** y la **proyección**.', { dib: cuenta, v: { k: 1, som: 0, pr: 0 }, alto: 232 }, [
        ['u forma un ángulo θ con v. La sombra de u mide ‖u‖ cos θ.', { som: 1 }, '$\\operatorname{comp}_{\\vec v}\\vec u = \\|\\vec u\\|\\cos\\theta$'],
        ['Como u·v = ‖u‖‖v‖ cos θ, basta dividir el producto escalar entre ‖v‖.', {}, '$\\operatorname{comp}_{\\vec v}\\vec u = \\dfrac{\\vec u \\cdot \\vec v}{\\|\\vec v\\|} = \\dfrac{12}{\\sqrt 8}$'],
        ['Para tener la flecha, ese largo va en la dirección de v: se multiplica por v/‖v‖.', { pr: 1 }, '$\\operatorname{proy}_{\\vec v}\\vec u = \\dfrac{\\vec u \\cdot \\vec v}{\\|\\vec v\\|^2}\\,\\vec v = \\tfrac{12}{8}\\,(2, 2) = (3, 3)$'],
        ['Si v mide el doble, u·v se duplica y ‖v‖² se cuadruplica: la sombra no cambia.', { k: 2 }, '$\\tfrac{24}{32}\\,(4, 4) = (3, 3)$'],
        ['Si v apunta al revés, la componente cambia de signo, pero la flecha sombra es la misma.', { k: -1 }, '$\\tfrac{-12}{8}\\,(-2, -2) = (3, 3)$'],
        ['Solo importa la recta de v: su largo y su sentido se cancelan en la cuenta.', { k: 1 }],
      ], 'comp = u·v / ‖v‖ (con signo) y proy = (u·v / ‖v‖²)·v, que no cambia si v se estira o se voltea.'),
      xpHaz('dibujo', 'Con $\\vec u = (5, 1)$ y $\\vec v = (1, -1)$, elige el número que multiplica a $\\vec v$ en $\\operatorname{proy}_{\\vec v}\\vec u$.', { dib: hazCuenta, v: { c: 0 }, metas: { c: 2 }, alto: 200,
        manijas: [{ k: 'c', min: -3, max: 3, paso: 0.5, et: 'el número que multiplica a v' }],
        lee: v => `$\\tfrac{\\vec u \\cdot \\vec v}{\\|\\vec v\\|^2} = \\tfrac{4}{2}$; tu número: $${v.c}$`,
        dice: v => (v.c === 2 ? 'Justo: u·v = 4 y ‖v‖² = 2, así que la sombra es 2v = (2, −2).' : v.c === -2 ? 'El signo: u·v es positivo, la sombra apunta como v.' : 'Calcula u·v y divídelo entre ‖v‖², sin raíz.') },
        'u·v = 5 − 1 = 4 y ‖v‖² = 2: la proyección es 2v = (2, −2).')],
    ['Paralela más perpendicular',
      xpMira('dibujo', 'Lo que la sombra no recoge forma **ángulo recto** con $\\vec v$: así toda flecha se parte en dos.', { dib: partes, v: { p: 0, q: 0, rec: 0, cierra: 0 }, alto: 222 }, [
        ['Toda flecha u se puede partir en una parte sobre la recta de v y otra en ángulo recto con ella.', {}],
        ['La parte paralela es la sombra: p = proy de u sobre v.', { p: 1 }, '$\\vec p = \\tfrac{25}{25}\\,(3, 4) = (3, 4)$'],
        ['La otra es lo que sobra: q = u − p.', { q: 1 }, '$\\vec q = (7, 1) - (3, 4) = (4, -3)$'],
        ['q es perpendicular a v: su producto escalar con v da 0.', { rec: 1 }, '$(4, -3)\\cdot(3, 4) = 12 - 12 = 0$'],
        ['Juntas cierran un rectángulo: p + q = u. Y solo hay una manera de partir u así.', { cierra: 1 }, '$\\vec u = \\vec p + \\vec q$'],
        ['En una rampa el peso se parte igual: una parte lo hace resbalar y la otra lo aprieta.', {}],
      ], 'u = proy + (u − proy): la primera parte va sobre la recta de v y la segunda es perpendicular a v.'),
      xpHaz('dibujo', 'Con $\\vec u = (3, -1)$ y $\\vec v = (1, 1)$, arrastra la punta de la parte $\\vec q$ **perpendicular** a $\\vec v$.', { dib: hazPartes, v: { x: 0, y: 1 }, metas: { x: 2, y: -2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-3, -3], max: [4, 3], paso: 1, en: v => P2(P3b, [v.x, v.y]), de: (x, y) => [(x - P3b.ox) / P3b.u, (P3b.oy - y) / P3b.u] }],
        lee: v => `$\\vec q \\cdot \\vec v = ${v.x + v.y}$`,
        dice: v => (v.x === 2 && v.y === -2 ? 'Justo: la sombra es (1, 1) y lo que sobra, (2, −2), cumple (2, −2)·(1, 1) = 0.' : v.x === 1 && v.y === 1 ? 'Esa es la parte paralela; falta la perpendicular.'
          : v.x === -2 && v.y === 2 ? 'Apunta al revés: eso es p − u, no u − p.' : 'Primero la sombra sobre v; luego réstala de u.') },
        'La sombra es (2/2)·(1, 1) = (1, 1) y lo que sobra es (3, −1) − (1, 1) = (2, −2).')],
    ['El punto más cercano',
      xpMira('dibujo', '¿Qué punto de una recta queda más **cerca** de un punto de afuera? El pie de la perpendicular: otra vez una sombra.', { dib: cerca, v: { pie: 0, otro: 0, mueve: 0 }, alto: 236 }, [
        ['Una recta que pasa por el origen con dirección d = (3, 4), y un punto Q afuera.', {}],
        ['El punto más cercano es el pie de la perpendicular desde Q.', { pie: 1 }],
        ['Si la recta pasa por el origen, ese pie es la proyección de Q sobre d.', {}, '$\\tfrac{(-1, 7)\\cdot(3, 4)}{25}\\,(3, 4) = (3, 4)$'],
        ['Otro punto de la recta queda más lejos: es la hipotenusa de un triángulo rectángulo.', { otro: 1 }],
        ['Si la recta pasa por A, se pone el origen en A: se proyecta Q − A y se le suma A.', { mueve: 1, otro: 0 }, '$t = \\dfrac{(Q - A)\\cdot \\vec d}{\\|\\vec d\\|^2} = \\tfrac{25}{25} = 1$'],
        ['En el espacio es la misma cuenta, con tres coordenadas en cada producto.', {}, '$A + t\\,\\vec d = (7, 1)$'],
      ], 'El punto de A + t·d más cercano a Q tiene t = (Q − A)·d / ‖d‖²; si la recta pasa por el origen, es proy de Q.'),
      xpHaz('dibujo', 'La recta pasa por $A = (-4, -1)$ con dirección $\\vec d = (1, 1)$. Arrastra **E** al punto más cercano a $Q = (-1, 4)$.', { dib: hazCerca, v: { t: 1 }, metas: { t: 4 }, alto: 210,
        manijas: [{ k: 't', min: 0, max: 7, paso: 0.5, en: v => P2(P4b, [-4 + v.t, -1 + v.t]), de: (x, y) => (((x - P4b.ox) / P4b.u + 4) + ((P4b.oy - y) / P4b.u + 1)) / 2 }],
        lee: v => `$(Q - E)\\cdot \\vec d = ${r2(dot([-1 - (-4 + v.t), 4 - (-1 + v.t)], [1, 1]))}$`,
        dice: v => (v.t === 4 ? 'Justo: (Q − A)·d = 8 y ‖d‖² = 2, así que t = 4 y E = (0, 3).' : v.t === 1.5 ? 'Proyectaste Q sin restar A: pon antes el origen en A.' : 'Busca el pie de la perpendicular que baja desde Q.') },
        'Q − A = (3, 5), (3, 5)·(1, 1) = 8 y ‖d‖² = 2: t = 4, así que E = (0, 3).')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una caja de **50 N** está en una rampa que sube **30°**. ¿Cuántos newtons de su peso van **a lo largo** de la rampa, rampa abajo?', { dib: rampa, v: { r: 0 }, metas: { r: 25 }, alto: 240,
        manijas: [{ k: 'r', min: 0, max: 60, paso: 5, et: 'parte del peso a lo largo de la rampa, N' }],
        lee: v => `$50 \\cos 60^{\\circ} = 25$; tu valor: $${v.r}$`,
        dice: v => (v.r === 25 ? 'Justo: el peso y la rampa abajo forman 60°, y 50·cos 60° = 25 N.' : v.r === 50 ? 'Ese es todo el peso; solo una parte va por la rampa.' : 'El peso apunta abajo y la rampa baja a 30°: entre ellos hay 60°.') },
        'La componente del peso a lo largo de la rampa es 50·cos 60° = 25 N; la que aprieta, 50·cos 30° ≈ 43 N.')],
  ], 'La proyección es la sombra bajo una luz perpendicular: (u·v / ‖v‖²)·v; lo que sobra es perpendicular y da el punto más cercano.');
}
;
//#archivo js/explora-gva-16.js
// Geometría Vectorial · explicación de geo-16 «Producto escalar y geometría analítica» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: la normal mira la recta de frente y n · (X − P) = 0 la describe; la distancia es la sombra sobre la normal; los
// ángulos entre rectas y planos son los de sus normales, y el de una recta con un plano, su complemento. Los ejemplos no son los de
// los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const pl = (W, ox, oy, u) => ({ W, ox, oy, u, P: q => [ox + q[0] * u, oy - q[1] * u] });
  const pap = (K, P) => {
    const [x0, x1, y0, y1] = P.W;
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(...P.P([x, y0]), ...P.P([x, y1]), x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(...P.P([x0, y]), ...P.P([x1, y]), y ? 'ls' : 'lm');
    return h;
  };
  // Recta a x + b y = c recortada a la ventana.
  const rec = (K, P, a, b, c, cls) => {
    const [x0, x1, y0, y1] = P.W, q = [];
    if (b) [x0, x1].forEach(x => { const y = (c - a * x) / b; if (y >= y0 - 1e-9 && y <= y1 + 1e-9) q.push([x, y]); });
    if (a) [y0, y1].forEach(y => { const x = (c - b * y) / a; if (x >= x0 - 1e-9 && x <= x1 + 1e-9) q.push([x, y]); });
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    return K.l(...P.P(q[0]), ...P.P(q.at(-1)), cls);
  };
  const esq = (K, V, e1, e2, s, cls) => K.pl([[V[0] + e1[0] * s, V[1] + e1[1] * s], [V[0] + (e1[0] + e2[0]) * s, V[1] + (e1[1] + e2[1]) * s], [V[0] + e2[0] * s, V[1] + e2[1] * s]], cls);
  const uni = (A, B) => { const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };

  // 1 · la normal dice la recta: P(1, 2), n = (2, 1), recta 2x + y = 4
  const P1 = pl([-1, 6, -1, 5], 60, 160, 26);
  const normal = (v, K) => {
    const P = P1.P([1, 2]), N = P1.P([3, 3]), X = P1.P([1 + v.s, 2 - 2 * v.s]);
    let h = pap(K, P1) + K.f(v.linea, rec(K, P1, 2, 1, 4, 'lg gr')) + K.c(P[0], P[1], 4, 'fk') + K.t(P[0] - 8, P[1] + 4, 'P', 's', 'end');
    h += K.f(v.n, K.ar(P[0], P[1], N[0], N[1], 'la gr') + K.t(N[0] + 6, N[1] - 4, 'n', 's ta', 'start'));
    if (v.x > 0.01 && Math.abs(v.s) > 0.05) h += K.f(v.x, K.ar(P[0], P[1], X[0], X[1], 'lf gr') + K.c(X[0], X[1], 4, 'fA') + K.t(X[0] + 8, X[1] + 4, 'X', 's tf', 'start'));
    if (Math.abs(v.s) > 0.05) h += K.f(v.ang, esq(K, P, uni(P, N), uni(P, X), 9, 'lo'));
    return h + K.f(v.eq, K.t(332, 40, 'n · (X − P) = 0', 's tm', 'end') + K.t(332, 62, '2(x − 1) + (y − 2) = 0', 's tm', 'end') + K.t(332, 84, '2x + y = 4', 's ta', 'end'))
      + K.f(v.lee, K.t(332, 120, 'ax + by = c', 's tg', 'end') + K.t(332, 142, '↓', 's tg', 'end') + K.t(332, 164, 'n = (a, b)', 's tg', 'end'));
  };
  const P1h = pl([-3, 4, -2, 5], 106, 150, 24), C1 = [0, 1], D1 = [2, 4];
  const hazNormal = (v, K) => {
    const C = P1h.P(C1), D = P1h.P(D1), T = P1h.P([C1[0] + v.a, C1[1] + v.b]);
    return pap(K, P1h) + rec(K, P1h, 3, -2, -2, 'lg gr') + K.c(C[0], C[1], 4, 'fk') + K.c(D[0], D[1], 4, 'fk') + K.t(C[0] - 8, C[1] + 16, 'C(0, 1)', 's', 'end')
      + K.t(D[0] + 8, D[1] + 4, 'D(2, 4)', 's', 'start') + (v.a || v.b ? K.ar(C[0], C[1], T[0], T[1], 'la gr') : '') + K.t(332, 18, `n = (${sg(v.a)}, ${sg(v.b)})`, 's ta', 'end');
  };

  // 2 · la distancia es la sombra sobre la normal: Q(4, 5) y la recta 2x + y = 4
  const P2 = pl([-1, 6, -1, 6], 58, 178, 24);
  const sombra = (v, K) => {
    const P = P2.P([1, 2]), Q = P2.P([4, 5]), F = P2.P([0.4, 3.2]), N = P2.P([3, 3]), S = P2.P([1 + 3.6, 2 + 1.8]), O = P2.P([2, 0]);
    let h = pap(K, P2) + rec(K, P2, 2, 1, 4, 'lg gr') + K.c(P[0], P[1], 4, 'fk') + K.t(P[0] - 8, P[1] + 14, 'P', 's', 'end');
    h += K.f(v.q, K.c(Q[0], Q[1], 5, 'fA') + K.t(Q[0] + 8, Q[1] + 4, 'Q', 's ta', 'start'));
    h += K.f(v.pie, K.l(Q[0], Q[1], F[0], F[1], 'lo gr') + esq(K, F, uni(F, Q), uni(F, P2.P([1, 2])), 8, 'lo'));
    h += K.f(v.qp, K.ar(P[0], P[1], Q[0], Q[1], 'lf gr') + K.ar(P[0], P[1], N[0], N[1], 'la gr') + K.t(N[0] + 6, N[1] + 12, 'n', 's ta', 'start'));
    h += K.f(v.pr, K.l(Q[0], Q[1], S[0], S[1], 'lm d') + K.l(P[0], P[1], S[0], S[1], 'lo gr'));
    return h + K.f(v.otro, K.c(O[0], O[1], 4, 'fk') + K.ar(O[0], O[1], Q[0], Q[1], 'lf d') + K.t(O[0] + 8, O[1] + 16, 'otro P', 's tf', 'start'))
      + K.t(332, 18, 'recta: 2x + y = 4', 's tg', 'end');
  };
  const P2h = pl([-3, 6, -2, 6], 106, 184, 22);
  const hazDist = (v, K) => {
    const Q = P2h.P([4, 5]);
    return pap(K, P2h) + rec(K, P2h, 4, 3, 1, 'lg gr') + K.c(Q[0], Q[1], 5, 'fA') + K.t(Q[0] + 8, Q[1] + 4, 'Q(4, 5)', 's ta', 'start')
      + K.t(8, 18, 'recta: 4x + 3y = 1', 's tg', 'start') + K.t(332, 18, `tu distancia: ${v.r}`, 's ta', 'end');
  };

  // 3 · ángulos entre rectas: el de sus normales
  const C3 = [150, 116];
  const cruce = (v, K) => {
    const t = v.t, n1 = K.at(C3[0], C3[1], 46, 90), n2 = K.at(C3[0], C3[1], 46, 90 + t);
    const L = (g, off, cls) => { const o = K.at(C3[0], C3[1], off, g + 90), a = K.at(o[0], o[1], 120, g), b = K.at(o[0], o[1], 120, g + 180); return K.l(a[0], a[1], b[0], b[1], cls); };
    let h = L(0, 0, 'lg gr') + L(t, v.par ? 28 : 0, 'lf gr') + K.c(C3[0], C3[1], 4, 'fk');
    h += K.ar(C3[0], C3[1], n1[0], n1[1], 'lg') + K.t(n1[0] + 6, n1[1], 'n₁', 's tg', 'start');
    if (!v.par) h += K.ar(C3[0], C3[1], n2[0], n2[1], 'lf') + K.t(n2[0] - 6, n2[1] - 4, 'n₂', 's tf', 'end');
    if (t > 1 && !v.par) {
      h += K.f(v.an, K.arc(C3[0], C3[1], 28, 90, 90 + t, 'la') + K.t(...K.at(C3[0], C3[1], 40, 90 + t / 2), `${Math.round(t)}°`, 's ta'));
      h += K.f(v.al, K.arc(C3[0], C3[1], 60, 0, t, 'lo') + K.t(...K.at(C3[0], C3[1], 74, t / 2), `${Math.round(t)}°`, 's to'));
      if (t > 90) h += K.f(v.ag, K.arc(C3[0], C3[1], 60, t, 180, 'la gr') + K.t(...K.at(C3[0], C3[1], 76, (t + 180) / 2), `${Math.round(180 - t)}°`, 's ta'));
    }
    return h;
  };
  const P3h = pl([-3, 4, -3, 3], 106, 112, 24);
  const hazCruce = (v, K) => pap(K, P3h) + rec(K, P3h, 4, -2, 1, 'lg gr') + rec(K, P3h, 1, v.k, 3, 'la gr')
    + K.t(332, 18, '4x − 2y = 1', 's tg', 'end') + K.t(332, 38, `x ${v.k ? `${v.k < 0 ? '−' : '+'} ${Math.abs(v.k) === 1 ? '' : Math.abs(v.k)}y ` : ''}= 3`, 's ta', 'end');

  // 4 · el plano en el espacio
  const PT = [[40, 186], [200, 186], [262, 124], [102, 124]], PP = [150, 156];
  const losa = (K, d, cls) => K.p(PT.map(q => [q[0], q[1] - d]), cls) + K.pl([...PT, PT[0]].map(q => [q[0], q[1] - d]), 'lm');
  const plano = (v, K) => {
    let h = K.f(v.pl, losa(K, 0, 'fn')) + K.c(PP[0], PP[1], 4, 'fk') + K.t(PP[0] - 8, PP[1] + 16, 'P', 's', 'end');
    h += K.f(v.n * (1 - v.rec), K.ar(PP[0], PP[1], PP[0], PP[1] - 70, 'la gr') + esq(K, PP, [1, 0], [0, -1], 8, 'lm') + K.t(PP[0] + 8, PP[1] - 64, 'n', 's ta', 'start'));
    h += K.f(v.eq, K.t(8, 18, 'n = (1, 2, 2), P(2, 1, 1)', 's tm', 'start') + K.t(8, 38, 'x + 2y + 2z = 6', 's ta', 'start'));
    const Q = [222, 54], F = [222, 144];
    h += K.f(v.q, K.c(Q[0], Q[1], 5, 'fA') + K.t(Q[0] + 8, Q[1] + 4, 'Q', 's ta', 'start') + K.l(Q[0], Q[1], F[0], F[1], 'lo gr') + K.t(Q[0] + 8, (Q[1] + F[1]) / 2, '5', 's to', 'start'));
    h += K.f(v.par, losa(K, 76, 'fn') + K.l(70, 110, 70, 186, 'lo gr d') + K.t(64, 150, '3', 's to', 'end') + K.t(332, 60, 'x + 2y + 2z = 15', 's tm', 'end'));
    if (v.inc > 0.01) {
      const A = [150, 156], B = K.at(A[0], A[1], 110, 60), Cc = K.at(A[0], A[1], 110, 240);
      h += K.f(v.inc, K.l(Cc[0], Cc[1], B[0], B[1], 'lf gr') + K.ar(A[0], A[1], ...K.at(A[0], A[1], 60, 150), 'lf') + K.t(...K.at(A[0], A[1], 70, 152), 'n₂', 's tf', 'end')
        + K.arc(A[0], A[1], 26, 90, 150, 'la') + K.t(...K.at(A[0], A[1], 40, 120), 'θ', 's ta'));
    }
    if (v.rec > 0.01) {
      const B = K.at(PP[0], PP[1], 110, 50);
      h += K.f(v.rec, K.l(PP[0], PP[1], B[0], B[1], 'lf gr') + K.t(B[0] + 6, B[1], 'd', 's tf', 'start') + K.l(PP[0], PP[1], PP[0], PP[1] - 70, 'lm d')
        + K.arc(PP[0], PP[1], 34, 0, 50, 'lo') + K.t(PP[0] + 52, PP[1] - 14, 'φ', 's to', 'start') + K.arc(PP[0], PP[1], 50, 50, 90, 'lm') + K.t(PP[0] - 8, PP[1] - 50, '90° − φ', 's tm', 'end'));
    }
    return h;
  };
  const hazRecta = (v, K) => {
    const B = [110, 170], A = K.at(B[0], B[1], 100, 180), E = K.at(B[0], B[1], 210, 0), T = K.at(B[0], B[1], 110, v.g), N = K.at(B[0], B[1], 80, 90);
    return K.p([A, E, [E[0], E[1] + 14], [A[0], A[1] + 14]], 'fn') + K.l(A[0], A[1], E[0], E[1], 'lg gr') + K.ar(B[0], B[1], N[0], N[1], 'lm d') + K.t(N[0] - 6, N[1] + 4, 'n', 's tm', 'end')
      + K.l(B[0], B[1], T[0], T[1], 'la gr') + K.c(B[0], B[1], 4, 'fk') + K.t(8, 18, 'plano: x − y = 1', 's tg', 'start') + K.t(8, 38, 'recta: d = (2, −1, 2)', 's ta', 'start') + K.t(332, 18, `φ = ${v.g}°`, 's ta', 'end');
  };

  // Problema: la lámpara y el techo inclinado
  const lampara = (v, K) => {
    const A = [30, 200], B = [300, 110], L = [180, 40], ang = Math.atan2(A[1] - B[1], B[0] - A[0]);
    const t = ((L[0] - A[0]) * Math.cos(ang) - (L[1] - A[1]) * Math.sin(ang)), F = [A[0] + t * Math.cos(ang), A[1] - t * Math.sin(ang)];
    const V = [L[0], A[1] - (L[0] - A[0]) * Math.tan(ang)];
    return K.p([A, B, [B[0], B[1] + 14], [A[0], A[1] + 14]], 'fn') + K.l(A[0], A[1], B[0], B[1], 'lg gr') + K.c(L[0], L[1], 6, 'fA') + K.t(L[0] + 10, L[1] + 4, 'L(1, 1, 9)', 's ta', 'start')
      + K.l(L[0], L[1], V[0], V[1], 'lm d') + K.l(L[0], L[1], F[0], F[1], 'la d') + K.t(8, 18, 'techo: 2x + 2y + z = 4', 's tg', 'start')
      + K.t(332, 18, `tu distancia: ${v.r} m`, 's ta', 'end');
  };

  xpLec('geo-16', [
    ['La normal dice la recta',
      xpMira('dibujo', 'Una recta del plano se puede describir con **una flecha** que la mira de frente: su **normal**.', { dib: normal, v: { n: 0, x: 0, s: 1, ang: 0, linea: 0, eq: 0, lee: 0 }, alto: 226 }, [
        ['Una recta también se describe con una flecha que la mira de frente: la normal n. Aquí sale del punto P.', { n: 1 }],
        ['Toma un punto X de la recta. La flecha de P a X va a lo largo de la recta.', { x: 1 }],
        ['Esa flecha forma ángulo recto con n, así que su producto escalar con n es cero.', { ang: 1 }, '$\\vec n \\cdot (X - P) = 0$'],
        ['Si X recorre la recta, la cuenta sigue en cero; fuera de ella, no. La ecuación atrapa la recta.', { s: -1.2, linea: 1 }],
        ['Al abrir el producto sale la ecuación de siempre de la recta.', { eq: 1 }, '$2(x - 1) + (y - 2) = 0 \\iff 2x + y = 4$'],
        ['Y al revés: en una ecuación ax + by = c, la normal se lee en los coeficientes.', { lee: 1 },'$\\vec n = (a, b), \\quad c = \\vec n \\cdot P$'],
      ], 'Los X con n · (X − P) = 0 forman la recta por P perpendicular a n; en ax + by = c, la normal es (a, b).'),
      xpHaz('dibujo', 'La recta pasa por **C** y **D**. Arrastra la punta de $\\vec n$ para que sea **normal** a la recta.', { dib: hazNormal, v: { a: 2, b: 3 }, alto: 226,
        cumple: v => (v.a || v.b) && 2 * v.a + 3 * v.b === 0, sol: { a: 3, b: -2 },
        manijas: [{ k: ['a', 'b'], min: [-3, -3], max: [3, 3], paso: 1, en: v => P1h.P([C1[0] + v.a, C1[1] + v.b]), de: (x, y) => [(x - 106) / 24 - C1[0], (150 - y) / 24 - C1[1]] }],
        lee: v => `$\\vec n \\cdot (2, 3) = ${2 * v.a + 3 * v.b}$`,
        dice: v => ((v.a || v.b) && 2 * v.a + 3 * v.b === 0 ? 'Sí: n · (D − C) = 0. La recta es 3x − 2y = −2.' : v.a * 3 === v.b * 2 ? 'Esa va a lo largo de la recta: es un director.' : 'Busca un n con n · (2, 3) = 0.') },
        'D − C = (2, 3) va por la recta; una normal es (3, −2), y la recta es 3x − 2y = −2.')],
    ['La distancia es una sombra',
      xpMira('dibujo', '¿A qué distancia está un punto de una recta? La respuesta está en la **normal**.', { dib: sombra, v: { q: 0, pie: 0, qp: 0, pr: 0, otro: 0 }, alto: 226 }, [
        ['Lejos de la recta está Q. ¿Cuánto mide el camino más corto de Q a la recta?', { q: 1 }],
        ['El más corto llega en ángulo recto, así que va en la dirección de la normal n.', { pie: 1 }],
        ['Desde P, la flecha Q − P va inclinada. Su sombra sobre la normal mide justo ese camino.', { qp: 1, pr: 1 }, '$\\operatorname{dist} = \\tfrac{|\\vec n \\cdot (Q - P)|}{\\|\\vec n\\|}$'],
        ['Aquí n · (Q − P) = 2·3 + 1·3 = 9 y ‖n‖ = √5: la distancia es 9/√5, unos 4.02.', {}, '$\\tfrac{9}{\\sqrt 5} \\approx 4.02$'],
        ['Como n · (Q − P) = n · Q − c, no hace falta P: basta reemplazar Q en la ecuación.', {}, '$\\operatorname{dist} = \\tfrac{|ax_0 + by_0 - c|}{\\sqrt{a^2 + b^2}}$'],
        ['Con otro punto de la recta la sombra mide lo mismo: la distancia no depende de cuál se use.', { otro: 1 }],
      ], 'La distancia de Q a ax + by = c es la sombra de Q − P sobre la normal: |ax₀ + by₀ − c| / √(a² + b²).'),
      xpHaz('dibujo', 'Ajusta la distancia del punto $Q(4, 5)$ a la recta $4x + 3y = 1$.', { dib: hazDist, v: { r: 0 }, metas: { r: 6 }, alto: 250,
        manijas: [{ k: 'r', min: 0, max: 10, paso: 1, et: 'distancia de Q a la recta' }],
        lee: v => `$\\tfrac{|16 + 15 - 1|}{\\sqrt{16 + 9}} = 6$; tu valor: $${v.r}$`,
        dice: v => (v.r === 6 ? 'Justo: |16 + 15 − 1| / 5 = 30 / 5 = 6.' : 'Reemplaza Q en 4x + 3y − 1 y divide entre ‖(4, 3)‖ = 5.') },
        'Se reemplaza Q en la ecuación y se divide entre la norma de la normal: 30 / 5 = 6.')],
    ['Ángulos entre rectas',
      xpMira('dibujo', 'Cuando dos rectas se cruzan, sus **normales** se cruzan con el mismo ángulo.', { dib: cruce, v: { t: 60, an: 0, al: 0, ag: 0, par: 0 }, alto: 236 }, [
        ['Dos rectas que se cortan, cada una con su normal. ¿Qué ángulo forman?', {}],
        ['Si una recta gira, su normal gira lo mismo. Por eso el ángulo entre las rectas es el de sus normales.', { an: 1, al: 1 }],
        ['Con el producto escalar: con normales (1, 2) y (3, −1), cos θ = 1 / (√5·√10), unos 82°.', { t: 82 }, '$\\cos\\theta = \\tfrac{\\vec n_1 \\cdot \\vec n_2}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|}$'],
        ['Si sale obtuso, el ángulo de las rectas es el otro, el agudo: por eso se usa el valor absoluto.', { t: 130, ag: 1 }, '$\\cos\\theta = \\tfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|}$'],
        ['Si n₁ · n₂ = 0, las normales forman ángulo recto, y las rectas también: son perpendiculares.', { t: 90, ag: 0 }, '$\\vec n_1 \\cdot \\vec n_2 = 0$'],
        ['Si una normal es múltiplo de la otra, las rectas no se cruzan (o son la misma): son paralelas.', { t: 0, par: 1 }, '$\\vec n_2 = \\lambda\\,\\vec n_1$'],
      ], 'El ángulo entre dos rectas es el de sus normales, el agudo; perpendiculares si n₁ · n₂ = 0, paralelas si son múltiplos.'),
      xpHaz('dibujo', 'Ajusta $k$ para que la recta $x + ky = 3$ sea **perpendicular** a $4x - 2y = 1$.', { dib: hazCruce, v: { k: 0 }, metas: { k: 2 }, alto: 236,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }],
        lee: v => `$(4, -2) \\cdot (1, ${v.k}) = ${4 - 2 * v.k}$`,
        dice: v => (v.k === 2 ? 'Sí: (4, −2) · (1, 2) = 4 − 4 = 0.' : v.k === -0.5 ? 'Así serían paralelas.' : 'El producto de las normales (4, −2) y (1, k) debe dar 0.') },
        '(4, −2) · (1, k) = 4 − 2k = 0 da k = 2.')],
    ['El plano en el espacio',
      xpMira('dibujo', 'En el espacio la misma ecuación ya no da una recta: da un **plano**.', { dib: plano, v: { pl: 0, n: 0, eq: 0, q: 0, par: 0, inc: 0, rec: 0 }, alto: 226 }, [
        ['En el espacio, la misma ecuación ya no da una recta: da el plano que n mira de frente.', { pl: 1, n: 1 }],
        ['Con n = (1, 2, 2) y P(2, 1, 1) se abre igual; los coeficientes son la normal.', { eq: 1 }, '$x + 2y + 2z = 6, \\quad d = \\vec n \\cdot P$'],
        ['La distancia de Q(3, 4, 5) al plano también es la sombra sobre la normal.', { q: 1 }, '$\\tfrac{|ax_0 + by_0 + cz_0 - d|}{\\|\\vec n\\|} = \\tfrac{|3 + 8 + 10 - 6|}{3} = 5$'],
        ['El plano x + 2y + 2z = 15 tiene la misma normal: es paralelo al primero.', { q: 0, par: 1 }, '$\\tfrac{|d_2 - d_1|}{\\|\\vec n\\|} = \\tfrac{|15 - 6|}{3} = 3$'],
        ['Dos planos que se cortan forman el ángulo de sus normales: perpendiculares si n₁ · n₂ = 0.', { par: 0, inc: 1, eq: 0 }, '$\\cos\\theta = \\tfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|}$'],
        ['Una recta y un plano forman el complemento del ángulo de la recta con la normal: por eso va el seno.', { inc: 0, rec: 1 }, '$\\operatorname{sen}\\varphi = \\tfrac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\,\\|\\vec n\\|}$'],
      ], 'El plano es n · (X − P) = 0, o ax + by + cz = d; distancias y ángulos salen de su normal, y con una recta se usa el seno.'),
      xpHaz('dibujo', 'Elige el ángulo entre la recta de director $\\vec d = (2, -1, 2)$ y el plano $x - y = 1$.', { dib: hazRecta, v: { g: 0 }, metas: { g: 45 }, alto: 246,
        manijas: [{ k: 'g', min: 0, max: 90, paso: 15, et: 'ángulo con el plano, en grados' }],
        lee: () => '$\\operatorname{sen}\\varphi = \\tfrac{|2 + 1 + 0|}{3\\sqrt 2} = \\tfrac{\\sqrt 2}{2}$',
        dice: v => (v.g === 45 ? 'Justo: sen φ = 3 / (3√2) = √2/2, así que φ = 45°.' : 'Calcula |d · n| / (‖d‖‖n‖) con n = (1, −1, 0): es el seno de φ.') },
        'd · n = 3, ‖d‖ = 3 y ‖n‖ = √2: sen φ = √2/2, φ = 45°.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una lámpara cuelga en $L(1, 1, 9)$ sobre un techo inclinado $2x + 2y + z = 4$ (en metros). Ajusta la distancia **más corta** de la lámpara al techo.', { dib: lampara, v: { r: 0 }, metas: { r: 3 }, alto: 260,
        manijas: [{ k: 'r', min: 0, max: 12, paso: 1, et: 'distancia más corta, en metros' }],
        lee: v => `$\\tfrac{|2 + 2 + 9 - 4|}{\\sqrt{4 + 4 + 1}}$; tu valor: $${v.r}$`,
        dice: v => (v.r === 3 ? 'Justo: |2 + 2 + 9 − 4| / 3 = 9 / 3 = 3 m.' : v.r === 9 ? 'Esa es la altura en vertical sobre el techo: el camino más corto va por la normal y se divide entre ‖n‖ = 3.' : 'Reemplaza L en 2x + 2y + z − 4 y divide entre ‖(2, 2, 1)‖.') },
        'El camino más corto va por la normal: |2 + 2 + 9 − 4| / 3 = 3 m, menos que los 9 m en vertical.')],
  ], 'Con la normal se escribe la recta o el plano, se mide la distancia como una sombra y se comparan los ángulos.');
}
;
//#archivo js/explora-gva-17.js
// Geometría Vectorial · explicación de geo-17 «Producto vectorial» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: u × v es la flecha perpendicular a los dos (mano derecha) cuyo tamaño es el área del paralelogramo; luego la
// cuenta con el determinante, las propiedades y el triple producto como volumen. Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 100) / 100);
  const tupla = a => `(${a.map(sg).join(', ')})`;
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const nor = a => Math.sqrt(dot(a, a));
  const suma = (...vs) => [0, 1, 2].map(i => vs.reduce((s, v) => s + v[i], 0));
  const por = (k, a) => a.map(x => x * k);
  const at = (o, r, g) => [o[0] + r * Math.cos(g * R), o[1] - r * Math.sin(g * R)];
  const k = v => Math.round(v.k);
  const ejes = (K, o, u, L = 4, Ln = 2) => {
    const I = (x, y, z) => K.iso(o, u, x, y, z);
    let h = '';
    [[[L, 0, 0], [-Ln, 0, 0], 'x'], [[0, L, 0], [0, -Ln, 0], 'y'], [[0, 0, L], [0, 0, -Ln], 'z']].forEach(([a, b, s]) => {
      const A = I(...a), B = I(...b);
      h += K.l(o[0], o[1], B[0], B[1], 'lm d') + K.ar(o[0], o[1], A[0], A[1], 'lm') + K.t(A[0] + (s === 'y' ? -8 : 8), A[1] + (s === 'z' ? -4 : 4), s, 's tm', s === 'y' ? 'end' : 'start');
    });
    return h;
  };
  const curva = (K, I, a, b, r, cls) => {
    const ua = por(1 / nor(a), a), ub = por(1 / nor(b), b), pts = [];
    for (let j = 0; j <= 12; j++) { const t = j / 12, q = suma(por(1 - t, ua), por(t, ub)); pts.push(I(...por(r / nor(q), q))); }
    return K.pl(pts.slice(0, -1), cls) + K.ar(...pts.at(-3), ...pts.at(-1), cls);
  };
  const caja = (K, I, a, b, w, cls) => {
    const z = [0, 0, 0];
    return [[z, a, suma(a, b), b], [w, suma(a, w), suma(a, b, w), suma(b, w)], [z, a, suma(a, w), w], [b, suma(a, b), suma(a, b, w), suma(b, w)], [z, b, suma(b, w), w], [a, suma(a, b), suma(a, b, w), suma(a, w)]]
      .map(c => K.p(c.map(q => I(...q)), cls)).join('');
  };
  const rueda = (K, C, r) => {
    let h = K.arc(...C, r, 0, 360, 'lm');
    [90, -30, 210].forEach((g, i) => {
      const b = g - 120;
      h += K.arc(...C, r, b + 16, g - 16, 'la') + K.ar(...at(C, r, b + 24), ...at(C, r, b + 16), 'la');
      const T = at(C, r, g); h += K.c(...T, 10, 'fn') + K.t(T[0], T[1] + 4, ['î', 'ĵ', 'k̂'][i], 's ta');
    });
    return h;
  };

  // 1 · u = (3, 0, 0) y v = (1, 3, 0) en el piso; u × v = (0, 0, 9) sube.   v { k }
  const O1 = [150, 140], U1 = 16, I1 = (...q) => XPK.iso(O1, U1, ...q);
  const u1 = [3, 0, 0], v1 = [1, 3, 0];
  const perp = (v, K) => {
    const q = k(v), U = I1(...u1), V = I1(...v1);
    let h = ejes(K, O1, U1, 4.5, 2);
    if (q >= 1) h += K.p([O1, U, I1(...suma(u1, v1)), V], 'fa');
    h += K.ar(...O1, ...U, 'lg gr') + K.ar(...O1, ...V, 'lf gr') + K.t(U[0] + 4, U[1] + 16, 'u', 's tg', 'start') + K.t(V[0] - 6, V[1] - 4, 'v', 's tf', 'end');
    if (q >= 2) { const W = I1(0, 0, 5); h += K.ar(...O1, ...W, 'la gr') + K.t(W[0] - 8, W[1] + 10, 'u × v', 's ta', 'end'); }
    if (q >= 3) h += curva(K, I1, u1, v1, 1.8, 'lo');
    if (q === 4) { const W = I1(0, 0, -5); h += K.ar(...O1, ...W, 'lf gr d') + K.t(W[0] + 8, W[1], 'v × u', 's tf', 'start'); }
    h += K.t(8, 18, `u = ${tupla(u1)}`, 's tg', 'start') + K.t(8, 36, `v = ${tupla(v1)}`, 's tf', 'start');
    if (q >= 2 && q < 5) h += K.t(8, 54, `u × v = ${tupla(cruz(u1, v1))}`, 's ta', 'start');
    if (q >= 5) h += rueda(K, [284, 64], 32) + K.t(284, 122, 'î × ĵ = k̂', 's tm') + K.t(284, 140, 'ĵ × k̂ = î', 's tm') + K.t(284, 158, 'k̂ × î = ĵ', 's tm');
    return h;
  };
  // Tu turno: ¿hacia dónde apunta î × k̂?   v { d }
  const DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], DL = ['+x', '−x', '+y', '−y', '+z', '−z'];
  const O1b = [170, 100], U1b = 26, I1b = (...q) => XPK.iso(O1b, U1b, ...q);
  const hazBase = (v, K) => {
    const A = I1b(1, 0, 0), B = I1b(0, 0, 1), W = I1b(...por(1.6, DIRS[v.d]));
    return ejes(K, O1b, U1b, 2.6, 1.8) + K.ar(...O1b, ...A, 'lg gr') + K.t(A[0] + 2, A[1] + 16, 'î', 's tg') + K.ar(...O1b, ...B, 'lf gr') + K.t(B[0] - 8, B[1], 'k̂', 's tf', 'end')
      + K.ar(...O1b, ...W, 'la gr') + K.t(8, 18, '¿î × k̂?', 's ta', 'start');
  };

  // 2 · el área: ‖u‖ = 3, ‖v‖ = 2, área 6 sen θ.   v { th, k }
  const O2 = [120, 170], S2 = 36;
  const area = (v, K) => {
    const q = k(v), U = [O2[0] + 3 * S2, O2[1]], V = at(O2, 2 * S2, v.th), W = [U[0] + V[0] - O2[0], U[1] + V[1] - O2[1]];
    let h = q >= 2 ? K.p([O2, U, V], 'fa') + K.p([U, W, V], 'fn') : K.p([O2, U, W, V], 'fa');
    h += K.ar(...O2, ...U, 'lg gr') + K.ar(...O2, ...V, 'lf gr') + K.t((O2[0] + U[0]) / 2, O2[1] + 18, '‖u‖ = 3', 's tg');
    if (v.th > 1) h += K.arc(...O2, 18, 0, v.th, 'lm') + K.t(...at(O2, 30, v.th / 2).map((z, i) => z + (i ? 4 : 0)), 'θ', 's tm');
    if (q >= 1 && v.th > 1) h += K.l(V[0], V[1], V[0], O2[1], 'lf d') + (q < 2 ? K.t(V[0] + 6, (V[1] + O2[1]) / 2, '2 sen θ', 's tf', 'start') : '');
    const A = 6 * Math.sin(v.th * R);
    h += K.t(8, 18, `θ = ${Math.round(v.th)}°`, 's tm', 'start') + K.t(332, 18, q >= 2 ? `triángulo = ${fm(A / 2)}` : `área = 3 · 2 · sen θ = ${fm(A)}`, 's ta', 'end');
    return h;
  };
  const hazArea = (v, K) => {
    const U = [O2[0] + 3 * S2, O2[1]], V = at(O2, 2 * S2, v.th), W = [U[0] + V[0] - O2[0], U[1] + V[1] - O2[1]];
    return K.p([O2, U, W, V], 'fa') + K.ar(...O2, ...U, 'lg gr') + K.ar(...O2, ...V, 'lf gr') + K.t(8, 18, 'meta: 3√3 ≈ 5.2', 's tm', 'start')
      + K.t(332, 18, `área = ${fm(6 * Math.sin(v.th * R))}`, 's ta', 'end');
  };

  // 3 · el determinante de u = (1, 3, −1) y v = (2, 0, 4): (12, −6, −6).   v { k }
  const det = (K, u, v, tapa = -1) => {
    const X = [44, 94, 144], Y = [62, 98, 134];
    let h = K.l(22, 44, 22, 150, 'lm gr') + K.l(166, 44, 166, 150, 'lm gr');
    if (tapa >= 0) h += K.r(X[tapa] - 20, 44, 40, 106, 'fn', 6);
    const op = j => (j === tapa ? 'tm' : '');
    ['î', 'ĵ', 'k̂'].forEach((s, j) => { h += K.t(X[j], Y[0], s, `ta ${op(j)}`); });
    u.forEach((x, j) => { h += K.t(X[j], Y[1], sg(x), j === tapa ? 'tm' : 'tg'); });
    v.forEach((x, j) => { h += K.t(X[j], Y[2], sg(x), j === tapa ? 'tm' : 'tf'); });
    return h;
  };
  const u3 = [1, 3, -1], v3 = [2, 0, 4];
  const cuenta = (v, K) => {
    const q = k(v);
    let h = det(K, u3, v3, q >= 1 && q <= 3 ? q - 1 : -1) + K.t(8, 22, 'u × v =', 's tm', 'start');
    const L = ['î: 3·4 − (−1)·0 = 12', 'ĵ: −(1·4 − (−1)·2) = −6', 'k̂: 1·0 − 3·2 = −6'];
    L.forEach((s, i) => { if (q > i) h += K.t(180, 62 + 36 * i, s, 's ta', 'start'); });
    if (q >= 4) h += K.t(8, 180, 'u · (u × v) = 12 − 18 + 6 = 0 ✓', 's to', 'start') + K.t(8, 198, 'v · (u × v) = 24 + 0 − 24 = 0 ✓', 's to', 'start');
    return h;
  };
  const slot3 = i => ({ x: 280, y: 50 + 48 * i, w: 70, h: 36 });

  // 4 · propiedades y la caja de u = (2, 0, 0), v = (1, 3, 0), w = (1, 1, 2): volumen 12.   v { k }
  const O4 = [130, 204], U4 = 24, I4 = (...q) => XPK.iso(O4, U4, ...q);
  const u4 = [2, 0, 0], v4 = [1, 3, 0], w4 = [1, 0, 2];
  const props = (v, K) => {
    const q = k(v);
    if (q <= 1) {
      let h = K.t(8, 26, 'v × u = −(u × v)', 's ta', 'start') + K.t(8, 50, 'u × u = 0', 's ta', 'start') + K.t(8, 74, 'u × (v + w) = u × v + u × w', 's ta', 'start') + K.t(8, 98, '(r u) × v = r (u × v)', 's ta', 'start');
      if (q === 1) h += K.t(8, 140, '(î × î) × ĵ = 0 × ĵ = 0', 's tf', 'start') + K.t(8, 164, 'î × (î × ĵ) = î × k̂ = −ĵ', 's tf', 'start') + K.t(8, 194, 'no es asociativo', 's tm', 'start') + rueda(K, [282, 150], 34);
      return h;
    }
    const w = q >= 5 ? [1, 0, 0.15] : w4;
    let h = caja(K, I4, u4, v4, w, q >= 5 ? 'ff' : 'fn');
    if (q >= 3) h += K.p([O4, I4(...u4), I4(...suma(u4, v4)), I4(...v4)], 'fa');
    h += K.ar(...O4, ...I4(...u4), 'la gr') + K.ar(...O4, ...I4(...v4), 'la gr') + K.ar(...O4, ...I4(...w), 'lg gr');
    if (q >= 3 && q < 5) { const N = I4(0, 0, 3), W = I4(...w4), B = I4(w4[0], w4[1], 0); h += K.ar(...O4, ...N, 'lo gr') + K.t(N[0] - 6, N[1], 'u × v', 's to', 'end') + K.l(...W, ...B, 'lf d'); }
    h += K.t(332, 18, `u = ${tupla(u4)}`, 's ta', 'end') + K.t(332, 36, `v = ${tupla(v4)}`, 's ta', 'end') + K.t(332, 54, q >= 5 ? 'w en el plano' : `w = ${tupla(w4)}`, 's tg', 'end');
    if (q >= 3 && q < 5) h += K.t(332, 76, 'base ‖u × v‖ = 6, altura 2', 's tm', 'end');
    if (q >= 4 && q < 5) h += K.t(332, 96, 'u · (v × w) = 12', 's to', 'end');
    if (q >= 5) h += K.t(332, 76, 'triple producto 0: coplanares', 's tf', 'end');
    return h;
  };
  // Tu turno: c que deja coplanares a (1, 1, 0), (0, 2, 1) y (2, c, 1).   v { c }
  const O4b = [170, 180], U4b = 18, I4b = (...q) => XPK.iso(O4b, U4b, ...q);
  const a4 = [1, 1, 0], b4 = [0, 2, 1], wc = c => [2, c, 1];
  const hazCop = (v, K) => {
    const d = dot(a4, cruz(b4, wc(v.c)));
    return caja(K, I4b, a4, b4, wc(v.c), d === 0 ? 'ff' : 'fa') + K.t(8, 18, `w = (2, ${v.c}, 1)`, 's tg', 'start') + K.t(332, 18, `u · (v × w) = ${sg(d)}`, 's ta', 'end');
  };

  // Problema: la vela A(1, 0, 1), B(3, 2, 1), C(1, 1, 3).   v { a }
  const O5 = [160, 186], U5 = 40, I5 = (...q) => XPK.iso(O5, U5, ...q);
  const A5 = [1, 0, 1], B5 = [3, 2, 1], C5 = [1, 1, 3];
  const vela = (v, K) => {
    const P = [A5, B5, C5].map(q => I5(...q));
    return ejes(K, O5, U5, 3.5, 0.6) + K.p(P, 'fa') + P.map((q, i) => K.c(...q, 4, 'fk') + K.t(q[0] + 8, q[1] + 4, ['A', 'B', 'C'][i], 's', 'start')).join('')
      + K.t(8, 18, 'A(1, 0, 1)  B(3, 2, 1)  C(1, 1, 3)', 's tm', 'start') + K.t(332, 40, `tu área: ${fm(v.a)} m²`, 's ta', 'end');
  };

  xpLec('geo-17', [
    ['Una flecha perpendicular a las dos',
      xpMira('dibujo', 'El **producto vectorial** de dos vectores del espacio no es un número: es otro vector.', { dib: perp, v: { k: 0 }, alto: 236 }, [
        ['Aquí u y v están en el piso. Dos vectores que no son paralelos abren un plano.', { k: 1 }],
        ['Hay una sola dirección perpendicular a ese plano. u × v es una flecha en esa dirección.', { k: 2 }, '$\\vec u \\times \\vec v \\perp \\vec u, \\quad \\vec u \\times \\vec v \\perp \\vec v$'],
        ['¿Arriba o abajo? Curva los dedos de la mano derecha de u hacia v: el pulgar marca u × v.', { k: 3 }],
        ['Si cambias el orden, los dedos giran al revés y el pulgar baja: v × u es la flecha opuesta.', { k: 4 }, '$\\vec v \\times \\vec u = -(\\vec u \\times \\vec v)$'],
        ['Con la base va en ciclo: î × ĵ = k̂. En contra del ciclo sale el menos.', { k: 5 }, '$\\hat\\imath \\times \\hat\\jmath = \\hat k, \\quad \\hat\\jmath \\times \\hat k = \\hat\\imath, \\quad \\hat k \\times \\hat\\imath = \\hat\\jmath$'],
      ], 'u × v es perpendicular a u y a v; su sentido lo da la mano derecha, de u hacia v. Cambiar el orden lo voltea.'),
      xpHaz('dibujo', '¿Hacia dónde apunta $\\hat\\imath \\times \\hat k$? Mueve la regla hasta la dirección correcta.', { dib: hazBase, v: { d: 4 }, metas: { d: 3 }, alto: 220,
        manijas: [{ k: 'd', min: 0, max: 5, paso: 1, et: 'dirección', rot: v => DL[v.d] }],
        dice: v => (v.d === 3 ? 'Sí: k̂ × î = ĵ, y al cambiar el orden, î × k̂ = −ĵ.' : v.d === 2 ? 'Ese es k̂ × î. Aquí el orden es î × k̂: en contra del ciclo.' : 'Tiene que ser perpendicular a î y a k̂: va por el eje y.') },
      '$\\hat\\imath \\times \\hat k = -(\\hat k \\times \\hat\\imath) = -\\hat\\jmath$.')],
    ['El tamaño es un área',
      xpMira('dibujo', 'El largo de u × v también dice algo: es el **área del paralelogramo** que forman u y v.', { dib: area, v: { th: 60, k: 0 }, alto: 214 }, [
        ['Aquí ‖u‖ = 3 y ‖v‖ = 2, con un ángulo θ entre ellos. Ellos dos arman un paralelogramo.', {}],
        ['Su base es ‖u‖ y su altura es ‖v‖ sen θ: el área es ‖u‖‖v‖ sen θ.', { k: 1 }, '$\\|\\vec u \\times \\vec v\\| = \\|\\vec u\\|\\,\\|\\vec v\\| \\sin\\theta$'],
        ['Si se abren a 90°, la altura es todo ‖v‖: el área es la máxima, 3 · 2 = 6.', { th: 90, k: 1 }],
        ['Si se cierran, el área se achica; si son paralelos, no encierran nada: u × v = 0.', { th: 0, k: 1 }, '$\\vec u \\parallel \\vec v \\iff \\vec u \\times \\vec v = \\vec 0$'],
        ['Un triángulo con esos dos lados es medio paralelogramo: su área es ½‖u × v‖.', { th: 60, k: 2 }, '$\\tfrac12 \\cdot 3 \\cdot 2 \\cdot \\sin 60^{\\circ} \\approx 2.6$'],
      ], '‖u × v‖ = ‖u‖‖v‖ sen θ es el área del paralelogramo de u y v; el triángulo es la mitad y los paralelos dan 0.'),
      xpHaz('dibujo', 'Con $\\|\\vec u\\| = 3$ y $\\|\\vec v\\| = 2$, abre $\\vec v$ hasta que el área sea $3\\sqrt 3$.', { dib: hazArea, v: { th: 90 }, sol: { th: 60 }, alto: 214,
        cumple: v => Math.abs(6 * Math.sin(v.th * R) - 3 * Math.sqrt(3)) < 1e-6,
        manijas: [{ k: 'th', min: 0, max: 180, paso: 15, en: v => at(O2, 2 * S2, v.th), de: (x, y) => { const g = Math.atan2(O2[1] - y, x - O2[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
        dice: v => (Math.abs(6 * Math.sin(v.th * R) - 3 * Math.sqrt(3)) < 1e-6 ? 'Justo: sen θ = √3/2, y también valdría el otro ángulo.' : 'Busca sen θ = 3√3/6 = √3/2.') },
      '$6\\sin\\theta = 3\\sqrt 3$ da $\\sin\\theta = \\tfrac{\\sqrt 3}{2}$: $\\theta = 60^{\\circ}$ o $120^{\\circ}$.')],
    ['La cuenta con el determinante',
      xpMira('dibujo', 'Con coordenadas, u × v sale de un **determinante** con î, ĵ, k̂ en la primera fila.', { dib: cuenta, v: { k: 0 }, alto: 210 }, [
        ['Arriba van î, ĵ, k̂; luego las coordenadas de u; luego las de v.', {}, '$\\vec u \\times \\vec v = \\begin{vmatrix} \\hat\\imath & \\hat\\jmath & \\hat k \\\\ 1 & 3 & -1 \\\\ 2 & 0 & 4 \\end{vmatrix}$'],
        ['Para î se tapa su columna y queda un 2 × 2: 3·4 − (−1)·0 = 12.', { k: 1 }],
        ['Para ĵ se tapa la segunda: 1·4 − (−1)·2 = 6, y esta va con menos: −6.', { k: 2 }],
        ['Para k̂, la tercera: 1·0 − 3·2 = −6. Así u × v = (12, −6, −6).', { k: 3 }],
        ['Se comprueba con el producto escalar: u × v es perpendicular a u y a v, así que los dos dan 0.', { k: 4 }, '$\\vec u \\cdot (\\vec u \\times \\vec v) = 0 = \\vec v \\cdot (\\vec u \\times \\vec v)$'],
      ], 'u × v = (u₂v₃ − u₃v₂, −(u₁v₃ − u₃v₁), u₁v₂ − u₂v₁): se tapa cada columna, el medio con −, y se comprueba con u · (u × v) = 0.'),
      xpHaz('fichas', 'Calcula $(2, 1, 0) \\times (0, 1, 3)$: arrastra cada componente a su lugar.', {
        slots: [0, 1, 2].map(slot3), alto: 190,
        fondo: K => det(K, [2, 1, 0], [0, 1, 3]) + ['î:', 'ĵ:', 'k̂:'].map((e, i) => K.t(slot3(i).x - 44, slot3(i).y + 5, e, 's', 'end')).join(''),
        fichas: ['3', '−6', '2', '6', '−2', '−3'], meta: ['3', '−6', '2'], pista: 'Tapa la columna de cada componente; la del medio va con el signo cambiado.' },
      '$(1 \\cdot 3 - 0 \\cdot 1,\\; -(2 \\cdot 3 - 0 \\cdot 0),\\; 2 \\cdot 1 - 1 \\cdot 0) = (3, -6, 2)$.')],
    ['Propiedades y el triple producto',
      xpMira('dibujo', 'El producto vectorial tiene sus reglas, y combinado con el producto escalar mide **volúmenes**.', { dib: props, v: { k: 0 }, alto: 230 }, [
        ['Cambiar el orden cambia el signo, u × u = 0, se distribuye sobre la suma y los números salen.', {}],
        ['Pero no es asociativo: el lugar del paréntesis cambia el resultado.', { k: 1 }, '$(\\hat\\imath \\times \\hat\\imath) \\times \\hat\\jmath \\ne \\hat\\imath \\times (\\hat\\imath \\times \\hat\\jmath)$'],
        ['Tres vectores u, v, w arman una caja inclinada, un paralelepípedo.', { k: 2 }],
        ['u × v sale de la base y mide su área; el producto escalar con w la multiplica por la altura.', { k: 3 }],
        ['Ese número es el triple producto, el determinante de las tres filas. Su valor absoluto es el volumen.', { k: 4 }, '$\\vec u \\cdot (\\vec v \\times \\vec w) = \\begin{vmatrix} 2 & 0 & 0 \\\\ 1 & 3 & 0 \\\\ 1 & 0 & 2 \\end{vmatrix} = 12$'],
        ['Si da 0, la caja se aplasta: los tres vectores están en un mismo plano, son coplanares.', { k: 5 }],
      ], 'v × u = −u × v, u × u = 0 y no es asociativo. |u · (v × w)| es el volumen de la caja; si es 0, son coplanares.'),
      xpHaz('dibujo', 'Desliza $c$ hasta que $(1, 1, 0)$, $(0, 2, 1)$ y $(2, c, 1)$ queden **coplanares**.', { dib: hazCop, v: { c: 1 }, metas: { c: 4 }, alto: 240,
        manijas: [{ k: 'c', min: 0, max: 6, paso: 1, et: 'c' }],
        dice: v => (v.c === 4 ? 'Coplanares: el triple producto, 4 − c, vale 0.' : 'Todavía hay volumen: el triple producto es 4 − c.') },
      'El determinante de las tres filas es $1(2 - c) - 1(0 - 2) = 4 - c$, que vale 0 si $c = 4$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'La vela triangular de un barco tiene sus esquinas en $A(1, 0, 1)$, $B(3, 2, 1)$ y $C(1, 1, 3)$, en metros. Desliza hasta su **área**.', { dib: vela, v: { a: 1 }, metas: { a: 3 }, alto: 236,
        manijas: [{ k: 'a', min: 0, max: 8, paso: 0.5, et: 'área de la vela, m²' }],
        dice: v => (v.a === 3 ? 'Sí: AB × AC = (4, −4, 2) mide 6, y la vela es la mitad.' : v.a === 6 ? 'Ese es el paralelogramo entero: la vela es un triángulo.' : 'Calcula AB × AC con el determinante y toma la mitad de su norma.') },
      '$(2, 2, 0) \\times (0, 1, 2) = (4, -4, 2)$, de norma 6: la vela mide la mitad, 3 m².')],
  ], 'u × v es perpendicular a los dos y mide el área de su paralelogramo; |u · (v × w)| es el volumen de la caja.');
}
;
//#archivo js/explora-gva-18.js
// Geometría Vectorial · explicación de geo-18 «Producto vectorial y geometría analítica» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const cr = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const su = (a, b) => a.map((x, i) => x - b[i]);
  const ad = (a, b) => a.map((x, i) => x + b[i]);
  const mu = (k, a) => a.map(x => k * x);
  const no = a => Math.hypot(...a);
  const sg = n => String(Math.round(n * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  // Perspectiva: x hacia el frente, y a la derecha, z hacia arriba.
  const vista = (o, U) => q => [o[0] + U * q[1] - 0.5 * U * q[0], o[1] + 0.45 * U * q[0] - U * q[2]];
  const ln = (K, A, B, cls) => K.l(A[0], A[1], B[0], B[1], cls);
  const fl = (K, A, B, cls) => K.ar(A[0], A[1], B[0], B[1], cls);
  const pt = (K, A, s, cls = 'fk', lado = 1) => K.c(A[0], A[1], 4, cls) + (s ? K.t(A[0] + 8 * lado, A[1] + 4, s, 's', lado > 0 ? 'start' : 'end') : '');
  const ejes = (K, S, L) => {
    const O = S([0, 0, 0]), X = S([L, 0, 0]), Y = S([0, L, 0]), Z = S([0, 0, L]);
    return fl(K, O, X, 'lm') + fl(K, O, Y, 'lm') + fl(K, O, Z, 'lm') + K.t(X[0] - 7, X[1] + 4, 'x', 's tm', 'end') + K.t(Y[0] + 7, Y[1] + 4, 'y', 's tm', 'start') + K.t(Z[0] + 7, Z[1] + 4, 'z', 's tm', 'start');
  };

  // Capítulo 1: el triángulo A(2, 0, 0), B(0, 2, 0), C(0, 0, 1): área y plano.  v { k }
  const S1 = vista([150, 140], 34), A1 = [2, 0, 0], B1 = [0, 2, 0], C1 = [0, 0, 1], N1 = cr(su(B1, A1), su(C1, A1));
  const triangulo = (v, K) => {
    const q = k(v), A = S1(A1), B = S1(B1), C = S1(C1), D = S1(ad(B1, su(C1, A1)));
    let h = ejes(K, S1, 3) + K.p([A, B, C], 'fa') + pt(K, A, 'A', 'fk', -1) + pt(K, B, 'B') + pt(K, C, 'C', 'fk', -1);
    if (q >= 1) h += fl(K, A, B, 'lf gr') + fl(K, A, C, 'lf gr');
    if (q >= 2) h += ln(K, B, D, 'lm d') + ln(K, C, D, 'lm d');
    if (q >= 3) { const G = mu(1 / 3, ad(ad(A1, B1), C1)), E = S1(ad(G, mu(1.6 / no(N1), N1))); h += fl(K, S1(G), E, 'la gr') + K.t(E[0] + 6, E[1], 'n', 's ta', 'start'); }
    return h + K.t(170, 16, ['un triángulo en el espacio: A, B y C', 'dos lados desde A: AB y AC', 'AB y AC arman un paralelogramo', 'AB × AC = (2, 2, 4): perpendicular a los dos', 'área = ½ · √24 = √6 ≈ 2.45', 'plano: x + y + 2z = 2'][Math.min(q, 5)], 's ta');
  };
  // Capítulo 1, tu turno: A(1, 0, 0), B(0, 2, 1), C(0, 0, 2); n = (4, 1, c).  v { c }
  const S1b = vista([110, 150], 30), A2 = [1, 0, 0], B2 = [0, 2, 1], C2 = [0, 0, 2];
  const normalC = (v, K) => {
    const A = S1b(A2), B = S1b(B2), C = S1b(C2), w = [4, 1, v.c], G = mu(1 / 3, ad(ad(A2, B2), C2)), E = S1b(ad(G, mu(1.8 / no(w), w)));
    return ejes(K, S1b, 3) + K.p([A, B, C], 'fa') + pt(K, A, 'A', 'fk', -1) + pt(K, B, 'B') + pt(K, C, 'C', 'fk', -1) + fl(K, S1b(G), E, 'la gr')
      + K.t(240, 40, 'AB = (−1, 2, 1)', 's', 'start') + K.t(240, 58, 'AC = (−1, 0, 2)', 's', 'start') + K.t(240, 82, `n = (4, 1, ${sg(v.c)})`, 's ta', 'start');
  };

  // Capítulo 2: el plano X = P + s·u + t·v y el corte de dos planos.  v { k }
  const S2 = vista([110, 150], 30), P2 = [0, 0, 2], U2 = [1, 0, 1], V2 = [0, 1, 0], X2 = (s, t) => ad(ad(P2, mu(s, U2)), mu(t, V2));
  const parametrica = (v, K) => {
    const q = k(v);
    if (q >= 4) {   // el piso z = 0 y la pared x + y = 4: se cortan en una recta
      const S = vista([150, 140], 26);
      let h = K.p([S([0, 0, 0]), S([4, 0, 0]), S([4, 6, 0]), S([0, 6, 0])], 'fn') + K.p([S([4, 0, 0]), S([0, 4, 0]), S([0, 4, 4]), S([4, 0, 4])], 'fa') + ejes(K, S, 5);
      if (q >= 5) h += ln(K, S([5, -1, 0]), S([-1, 5, 0]), 'lo gr') + fl(K, S([3, 1, 0]), S([2, 2, 0]), 'lo gr');
      return h + K.t(170, 16, q === 4 ? 'piso: z = 0; pared: x + y = 4' : 'n₁ × n₂ = (0, 0, 1) × (1, 1, 0) = (−1, 1, 0)', 's ta');
    }
    let h = ejes(K, S2, 4) + K.p([S2(X2(0, 0)), S2(X2(3, 0)), S2(X2(3, 4)), S2(X2(0, 4))], 'fa');
    for (let s = 0; s <= 3; s++) h += ln(K, S2(X2(s, 0)), S2(X2(s, 4)), 'lm');
    for (let t = 0; t <= 4; t++) h += ln(K, S2(X2(0, t)), S2(X2(3, t)), 'lm');
    h += pt(K, S2(P2), 'P', 'fk', -1);
    if (q >= 1) h += fl(K, S2(P2), S2(ad(P2, U2)), 'lg gr') + fl(K, S2(P2), S2(ad(P2, V2)), 'lg gr');
    if (q === 2) h += fl(K, S2(P2), S2(X2(2, 0)), 'lf gr') + fl(K, S2(X2(2, 0)), S2(X2(2, 1)), 'lf gr') + pt(K, S2(X2(2, 1)), '(2, 1, 4)', 'fA');
    if (q === 3) { const n = cr(U2, V2), G = X2(1.5, 2); h += fl(K, S2(G), S2(ad(G, mu(1.5 / no(n), n))), 'la gr'); }
    return h + K.t(170, 16, ['un plano: un punto P y dos direcciones', 'u = (1, 0, 1) y v = (0, 1, 0), no paralelas', 'P + 2u + 1v = (2, 1, 4)', 'su normal: u × v = (−1, 0, 1)'][q], 's ta');
  };
  // Capítulo 2, tu turno: llegar a (2, 3, 4) con s y t.  v { s, t }
  const planoST = (v, K) => {
    let h = ejes(K, S2, 4) + K.p([S2(X2(0, 0)), S2(X2(3, 0)), S2(X2(3, 4)), S2(X2(0, 4))], 'fa');
    for (let s = 0; s <= 3; s++) h += ln(K, S2(X2(s, 0)), S2(X2(s, 4)), 'lm');
    for (let t = 0; t <= 4; t++) h += ln(K, S2(X2(0, t)), S2(X2(3, t)), 'lm');
    const X = X2(v.s, v.t);
    return h + pt(K, S2(P2), 'P', 'fk', -1) + K.c(...S2(X), 6, 'fA') + K.t(240, 40, 'P = (0, 0, 2)', 's', 'start') + K.t(240, 58, 'u = (1, 0, 1)', 's tg', 'start')
      + K.t(240, 76, 'v = (0, 1, 0)', 's tg', 'start') + K.t(240, 100, `X = (${X.map(sg).join(', ')})`, 's ta', 'start');
  };

  // Capítulo 3: distancia a una recta, rectas que se cruzan, volumen y coplanares.  v { k }
  const S3 = vista([110, 150], 30), P3 = [1, 0, 1], D3 = [0, 3, 0], Q3 = [3, 1, 3];
  const distancias = (v, K) => {
    const q = k(v);
    if (q === 3) {   // dos rectas que se cruzan: la perpendicular común
      const S = vista([150, 150], 28);
      return ejes(K, S, 4) + ln(K, S([-1, 0, 0]), S([5, 0, 0]), 'lg gr') + ln(K, S([0, -1, 3]), S([0, 5, 3]), 'lf gr') + ln(K, S([0, 0, 0]), S([0, 0, 3]), 'lo gr d')
        + K.t(170, 16, 'd₁ × d₂ = (0, 0, 1): la separación es 3', 's ta');
    }
    if (q >= 4) {   // la caja y el tetraedro de O, (2, 0, 0), (0, 3, 0), (0, 0, 4)
      const S = vista([150, 150], 22), O = S([0, 0, 0]), a = S([2, 0, 0]), b = S([0, 3, 0]), c = S([0, 0, 4]);
      let h = ejes(K, S, 5);
      h += K.p([a, b, c], 'fa') + ln(K, O, a, 'la') + ln(K, O, b, 'la') + ln(K, O, c, 'la') + ln(K, a, b, 'la') + ln(K, b, c, 'la') + ln(K, c, a, 'la');
      if (q === 4) for (const [x, y, z] of [[2, 3, 0], [2, 0, 4], [0, 3, 4], [2, 3, 4]]) h += K.c(...S([x, y, z]), 2.5, 'fk');
      return h + K.t(170, 16, q === 4 ? 'caja de las tres aristas: 2 · 3 · 4 = 24' : 'tetraedro = 24 ÷ 6 = 4; si da 0, se aplasta', 's ta');
    }
    const P = S3(P3), Q = S3(Q3), E = S3(ad(P3, D3)), F = S3(ad(Q3, D3)), H = S3([1, 1, 1]);
    let h = ejes(K, S3, 4) + ln(K, S3(ad(P3, mu(-0.4, D3))), S3(ad(P3, mu(1.6, D3))), 'lg gr') + pt(K, P, 'P', 'fk', -1) + pt(K, Q, 'Q');
    if (q >= 1) h += K.p([P, E, F, Q], 'fa') + fl(K, P, E, 'lg gr') + fl(K, P, Q, 'lf gr');
    if (q >= 2) h += ln(K, Q, H, 'lo gr d');
    return h + K.t(170, 16, ['un punto Q y una recta P + t(0, 3, 0)', 'PQ y d arman un paralelogramo', 'altura = área ÷ base = 6√2 ÷ 3 = 2√2'][q], 's ta');
  };
  // Capítulo 3, tu turno: D(1, 3, h) en el plano de A(0, 0, 0), B(2, 0, 2), C(0, 2, 0).  v { h }
  const S3b = vista([130, 160], 28), A4 = [0, 0, 0], B4 = [2, 0, 2], C4 = [0, 2, 0];
  const coplanar = (v, K) => {
    const A = S3b(A4), B = S3b(B4), C = S3b(C4), D = S3b([1, 3, v.h]);
    return ejes(K, S3b, 4) + K.p([A, B, C], 'fa') + ln(K, A, D, 'lm d') + ln(K, B, D, 'lm d') + ln(K, C, D, 'lm d') + ln(K, S3b([1, 3, 0]), D, 'lm')
      + pt(K, A, 'A', 'fk', -1) + pt(K, B, 'B', 'fk', -1) + pt(K, C, 'C') + K.c(D[0], D[1], 6, 'fA') + K.t(D[0] + 10, D[1] - 4, 'D', 's', 'start')
      + K.t(250, 40, 'B = (2, 0, 2)', 's', 'start') + K.t(250, 58, 'C = (0, 2, 0)', 's', 'start') + K.t(250, 82, `D = (1, 3, ${sg(v.h)})`, 's ta', 'start');
  };

  // Problema: el dron y la línea eléctrica: P(0, 0, 6), d = (0, 3, 4), Q(4, 3, 5).  v { d }
  const S5 = vista([110, 150], 18), P5 = [0, 0, 6], D5 = [0, 3, 4], Q5 = [4, 3, 5];
  const pie5 = ad(P5, mu((3 * 3 + 4 * -1) / 25, D5)), DIR5 = mu(1 / no(su(pie5, Q5)), su(pie5, Q5));
  const dronLinea = (v, K) => {
    const Q = S5(Q5), E = S5(ad(Q5, mu(v.d, DIR5)));
    let h = ln(K, S5(ad(P5, mu(-1.2, D5))), S5(ad(P5, mu(1.4, D5))), 'lg gr') + pt(K, S5(P5), 'P(0, 0, 6)', 'fk', -1) + K.c(Q[0], Q[1], 6, 'fk') + K.t(Q[0] + 12, Q[1] + 4, 'dron (4, 3, 5)', 's', 'start');
    if (v.d) h += ln(K, Q, E, 'la gr') + K.c(E[0], E[1], 4, 'fA');
    return h + K.t(8, 16, 'línea: (0, 0, 6) + t(0, 3, 4), en metros', 's tm', 'start');
  };

  xpLec('geo-18', [
    ['Área y plano por tres puntos',
      xpMira('dibujo', 'Con dos lados de un triángulo, el producto vectorial da su **área** y su **plano**.', { dib: triangulo, v: { k: 0 }, alto: 200 }, [
        ['Tres puntos del espacio que no están en línea forman un triángulo.', {}],
        ['Desde A salen dos lados: AB = B − A y AC = C − A.', { k: 1 }],
        ['Esos dos lados arman un paralelogramo. El triángulo es justo la mitad.', { k: 2 }],
        ['AB × AC es perpendicular a los dos lados: atraviesa el triángulo. Es una normal del plano.', { k: 3 }, '$\\vec n = \\overrightarrow{AB} \\times \\overrightarrow{AC}$'],
        ['Su largo es el área del paralelogramo; la mitad es el área del triángulo.', { k: 4 }, '$\\text{área} = \\tfrac12\\|\\overrightarrow{AB} \\times \\overrightarrow{AC}\\|$'],
        ['Con la normal y el punto A sale la ecuación: n · X = n · A.', { k: 5 }, '$2x + 2y + 4z = 4$'],
      ], 'Área $= \\tfrac12\\|AB \\times AC\\|$; la normal del plano por $A$, $B$ y $C$ es $AB \\times AC$.'),
      xpHaz('dibujo', 'Con A(1, 0, 0), B(0, 2, 1) y C(0, 0, 2), la normal AB × AC es (4, 1, c). Ajusta c.', {
        dib: normalC, v: { c: 0 }, metas: { c: 2 }, alto: 220, manijas: [{ k: 'c', min: -5, max: 5, paso: 1, et: 'tercera componente c' }],
        lee: v => `$\\vec n = (4, 1, ${v.c})$`, pista: 'La tercera componente de AB × AC tapa la columna de z: (−1)·0 − 2·(−1).' },
      '$(-1, 2, 1) \\times (-1, 0, 2) = (4 - 0,\\ -1 + 2,\\ 0 + 2) = (4, 1, 2)$.')],
    ['El plano en paramétrica y el pliegue',
      xpMira('dibujo', 'Un plano también se **recorre**: un punto y dos direcciones. Y dos planos se cortan en una **recta**.', { dib: parametrica, v: { k: 0 }, alto: 210 }, [
        ['Un plano queda con un punto P y dos direcciones u y v que no sean paralelas.', {}],
        ['Cada punto del plano se alcanza con s pasos de u y t pasos de v.', { k: 1 }, '$X = P + s\\,\\vec u + t\\,\\vec v$'],
        ['Dos pasos de u y uno de v desde P llevan a (2, 1, 4).', { k: 2 }],
        ['La normal del plano es perpendicular a u y a v: u × v.', { k: 3 }],
        ['Ahora dos planos: el piso y una pared. Se cortan en una recta que está en los dos.', { k: 4 }],
        ['Esa recta es perpendicular a las dos normales: su dirección es n₁ × n₂.', { k: 5 }, '$\\vec d = \\vec n_1 \\times \\vec n_2$'],
      ], 'Un plano es $P + s\\vec u + t\\vec v$, de normal $\\vec u \\times \\vec v$; dos planos se cortan en la recta de director $n_1 \\times n_2$.'),
      xpHaz('dibujo', 'Con P = (0, 0, 2), u = (1, 0, 1) y v = (0, 1, 0), ajusta s y t para que X llegue a (2, 3, 4).', {
        dib: planoST, v: { s: 0, t: 0 }, metas: { s: 2, t: 3 }, alto: 250,
        manijas: [{ k: 's', min: 0, max: 3, paso: 1, et: 's: pasos de u' }, { k: 't', min: 0, max: 4, paso: 1, et: 't: pasos de v' }],
        lee: v => `$X = (${v.s}, ${v.t}, ${2 + v.s})$`, pista: 'La primera coordenada solo depende de s y la segunda solo de t.' },
      '$(0, 0, 2) + s(1, 0, 1) + t(0, 1, 0) = (s, t, 2 + s)$: con $s = 2$ y $t = 3$ da $(2, 3, 4)$.')],
    ['Distancias y volúmenes',
      xpMira('dibujo', 'Las **distancias** salen de alturas de paralelogramos, y los **volúmenes**, de cajas.', { dib: distancias, v: { k: 0 }, alto: 210 }, [
        ['¿Qué tan cerca pasa la recta de Q? Por la perpendicular, que es la más corta.', {}],
        ['PQ y el director d arman un paralelogramo de área ‖PQ × d‖ y base ‖d‖.', { k: 1 }],
        ['La distancia es su altura: el área dividida entre la base.', { k: 2 }, '$d = \\dfrac{\\|\\overrightarrow{PQ} \\times \\vec d\\|}{\\|\\vec d\\|}$'],
        ['Dos rectas que se cruzan: d₁ × d₂ apunta de una a otra, y se proyecta en él un vector entre ellas.', { k: 3 }, '$d = \\dfrac{|\\overrightarrow{P_1P_2} \\cdot (\\vec d_1 \\times \\vec d_2)|}{\\|\\vec d_1 \\times \\vec d_2\\|}$'],
        ['Tres aristas desde un vértice arman una caja; el triple producto es su volumen con signo.', { k: 4 }],
        ['El tetraedro ocupa la sexta parte. Si el triple producto vale 0, los cuatro puntos son coplanares.', { k: 5 }, '$V = \\tfrac16\\left|\\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD})\\right|$'],
      ], 'Distancia a una recta: $\\tfrac{\\|PQ \\times d\\|}{\\|d\\|}$; tetraedro: $\\tfrac16|\\text{triple}|$; si vale 0, coplanares.'),
      xpHaz('dibujo', 'Con A(0, 0, 0), B(2, 0, 2) y C(0, 2, 0), sube o baja D(1, 3, h) hasta que los cuatro puntos sean coplanares.', {
        dib: coplanar, v: { h: 4 }, metas: { h: 1 }, alto: 230, manijas: [{ k: 'h', min: 0, max: 5, paso: 1, et: 'altura h de D' }],
        lee: v => `$\\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD}) = ${4 * v.h - 4}$`, pista: 'AC × AD = (2h, 0, −2); haz el producto punto con AB = (2, 0, 2).' },
      '$AC \\times AD = (2h, 0, -2)$ y $AB \\cdot (2h, 0, -2) = 4h - 4$, que vale 0 con $h = 1$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un dron de inspección está en (4, 3, 5) y la línea eléctrica sigue (0, 0, 6) + t(0, 3, 4), en metros. Ajusta la distancia más corta del dron a la línea.', {
        dib: dronLinea, v: { d: 0 }, metas: { d: 5 }, alto: 220, manijas: [{ k: 'd', min: 0, max: 10, paso: 1, et: 'distancia en metros' }],
        lee: v => `$d = ${v.d}$ m`, pista: 'PQ = (4, 3, −1); calcula PQ × (0, 3, 4), su norma, y divide entre ‖d‖ = 5.' },
      '$\\overrightarrow{PQ} \\times \\vec d = (4, 3, -1) \\times (0, 3, 4) = (15, -16, 12)$, de norma 25, y $\\tfrac{25}{5} = 5$ m.')],
  ], 'El producto vectorial da áreas, normales de planos, rectas de corte, distancias y volúmenes en el espacio.');
}
;
//#archivo js/explora-gva-19.js
// Geometría Vectorial · explicación de geo-19 «Fuerzas coplanarias y concurrentes» (spec 2026-11-27-curso-geometria-vectorial).
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
  const rad = g => g * Math.PI / 180;

  // Capítulo 1: una fuerza de 10 N a 53°, con sus componentes (6, 8).  v { k }
  const O1 = [60, 176], U1 = 16, Q1 = en(O1, U1);
  const fuerza = (v, K) => {
    const q = k(v), T = Q1(6, 8);
    let h = rej(K, O1, U1, 0, 7, 0, 9) + K.r(O1[0] - 12, O1[1] - 12, 24, 24, 'fk', 4) + K.ar(...O1, ...T, 'la gr') + K.t(T[0] + 6, T[1], 'F = 10 N', 's ta', 'start');
    if (q >= 1) h += K.arc(...O1, 30, 0, 53, 'la') + K.t(O1[0] + 40, O1[1] - 14, 'θ = 53°', 's ta', 'start');
    if (q >= 2) h += K.l(...O1, ...Q1(6, 0), 'lg gr') + K.l(...Q1(6, 0), ...T, 'lf gr d') + K.t(Q1(3, 0)[0], O1[1] + 16, 'Fx = 6 N', 's tg') + K.t(Q1(6, 4)[0] + 6, Q1(6, 4)[1], 'Fy = 8 N', 's tf', 'start');
    if (q >= 3) h += K.t(334, 110, 'F = F(cos θ, sen θ)', 's', 'end') + K.t(334, 128, '= 10(0.6, 0.8) = (6, 8)', 's tm', 'end');
    if (q >= 4) h += K.c(...O1, 4, 'fo') + K.t(334, 150, 'aplicada en la caja', 's to', 'end');
    return h;
  };
  // Capítulo 1, tu turno: 10 N a 37°.  v { a, b }
  const turno1 = (v, K) => rej(K, O1, U1, 0, 10, 0, 10) + K.r(O1[0] - 12, O1[1] - 12, 24, 24, 'fk', 4) + K.arc(...O1, 30, 0, 37, 'lg') + K.t(O1[0] + 40, O1[1] - 8, '37°', 's tg', 'start')
    + K.ar(...O1, ...Q1(v.a, v.b), 'la gr') + K.t(334, 20, `F = ${pt([v.a, v.b])} N`, 's ta', 'end') + K.t(334, 38, `|F| = ${N(Math.hypot(v.a, v.b))} N`, 's tm', 'end');

  // Capítulo 2: F₁ = (7, 1), F₂ = (−3, 2), R = (4, 3).  v { k }
  const O2 = [120, 160], U2 = 20, Q2 = en(O2, U2), F1 = [7, 1], F2 = [-3, 2], R2 = [4, 3];
  const resultante = (v, K) => {
    const q = k(v);
    let h = rej(K, O2, U2, -5, 10, -1, 6);
    h += K.ar(...O2, ...Q2(...F1), 'lg gr') + K.t(Q2(...F1)[0] - 4, Q2(...F1)[1] + 16, 'F₁', 's tg', 'end');
    h += K.ar(...O2, ...Q2(...F2), 'lf gr') + K.t(Q2(...F2)[0] - 6, Q2(...F2)[1], 'F₂', 's tf', 'end');
    if (q === 1) h += K.l(...Q2(...F1), ...Q2(...R2), 'lm d') + K.l(...Q2(...F2), ...Q2(...R2), 'lm d');
    if (q === 2) h += K.ar(...Q2(...F1), ...Q2(...R2), 'lf d');
    if (q >= 1) h += K.ar(...O2, ...Q2(...R2), 'la gr') + K.t(Q2(...R2)[0] + 6, Q2(...R2)[1] - 4, 'R', 's ta', 'start');
    const dice = ['concurrentes: un mismo punto', 'diagonal del paralelogramo', 'punta con cola', 'R = (7 − 3, 1 + 2) = (4, 3)', '|R| = √(4² + 3²) = 5 · tan θ = 3/4', '√50 + √13 ≈ 10.7, no 5'][q];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  const fondo2 = K => K.t(14, 24, 'F₁ = (5, 2) N y F₂ = (1, 6) N', 'ta', 'start') + K.t(72, 69, 'Rx =', 's', 'end') + K.t(182, 69, 'Ry =', 's', 'end') + K.t(292, 69, '|R| =', 's', 'end') + K.t(14, 104, 'cada R en newtons', 's tm', 'start');

  // Capítulo 3: tres fuerzas en equilibrio, F₁ = (4, 0), F₂ = (−1, 3), F₃ = (−3, −3).  v { k }
  const O3 = [130, 144], U3 = 22, Q3 = en(O3, U3), G = [[4, 0], [-1, 3], [-3, -3]];
  const equilibrio = (v, K) => {
    const q = k(v);
    let h = rej(K, O3, U3, -4, 8, -2, 5), p = [0, 0];
    if (q === 0) G.forEach((F, i) => { h += K.ar(...O3, ...Q3(...F), `${['lg', 'lf', 'lm'][i]} gr`); });
    else G.forEach((F, i) => {
      const n = [p[0] + F[0], p[1] + F[1]];
      if (q >= 3 && i === 2) h += K.ar(...Q3(...p), ...Q3(...n), 'la gr d') + K.t(Q3(1.5, 1.5)[0] - 10, Q3(1.5, 1.5)[1], 'E = −R', 's ta', 'end');
      else h += K.ar(...Q3(...p), ...Q3(...n), `${['lg', 'lf', 'lm'][i]} gr`);
      p = n;
    });
    if (q >= 3) h += K.ar(...O3, ...Q3(3, 3), 'lo') + K.t(Q3(3, 3)[0] + 6, Q3(3, 3)[1] - 4, 'R = (3, 3)', 's to', 'start');
    h += K.c(...O3, 5, 'fk');
    const dice = ['tres fuerzas sobre un aro', 'punta con cola: vuelve al inicio', 'ΣFx = 4 − 1 − 3 = 0 · ΣFy = 0', 'sin F₃, sobra R = (3, 3)', 'la equilibrante es −R = (−3, −3)'][Math.min(q, 4)];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  // Capítulo 3, tu turno: equilibrante de (4, 1) y (−1, 2).  v { a, b }
  const O4 = [150, 120], U4 = 20, Q4 = en(O4, U4);
  const turno3 = (v, K) => {
    let h = rej(K, O4, U4, -6, 8, -4, 4) + K.ar(...O4, ...Q4(4, 1), 'lg gr') + K.ar(...Q4(4, 1), ...Q4(3, 3), 'lf gr');
    return h + K.c(...O4, 5, 'fk') + K.ar(...Q4(3, 3), ...Q4(3 + v.a, 3 + v.b), 'la gr') + K.t(14, 20, `E = ${pt([v.a, v.b])} N`, 's ta', 'start');
  };

  // Capítulo 4: un letrero colgado, una rampa y un cable en el espacio.  v { k }
  const aplicaciones = (v, K) => {
    const q = k(v);
    let h = '';
    if (q <= 2) {
      const P = [200, 120], c = 0.6, s = 0.8, A = [P[0] + 90 * c / s * 0 + 70, P[1] - 70 * s / c];
      h += K.l(40, 20, 40, 190, 'lm gr') + K.l(40, P[1], ...P, 'lm') + K.l(...P, A[0], A[1], 'lm') + K.l(A[0] - 20, A[1], A[0] + 30, A[1], 'lm gr');
      h += K.r(P[0] - 22, P[1] + 4, 44, 26, 'fk', 4) + K.ar(...P, P[0], P[1] + 60, 'lm gr') + K.t(P[0] + 26, P[1] + 56, '40 N', 's', 'start');
      h += K.arc(...P, 22, 0, 53, 'la') + K.t(P[0] + 30, P[1] - 4, '53°', 's ta', 'start');
      if (q >= 1) h += K.ar(...P, P[0] + 50 * c, P[1] - 50 * s, 'la gr') + K.ar(...P, P[0] - 30, P[1], 'lg gr') + K.t(14, 20, 'en x: T cos 53° = H', 's', 'start') + K.t(14, 38, 'en y: T sen 53° = 40', 's', 'start');
      if (q >= 2) h += K.t(14, 58, 'T = 40 / 0.8 = 50 N · H = 30 N', 's ta', 'start');
    } else if (q === 3) {
      const B = [40, 180], c = Math.cos(rad(30)), s = Math.sin(rad(30)), T = [B[0] + 260 * c, B[1] - 260 * s], M = [B[0] + 130 * c, B[1] - 130 * s];
      h += K.p([B, [T[0], B[1]], T], 'fn') + K.l(...B, ...T, 'lm gr') + K.arc(...B, 34, 0, 30, 'la') + K.t(B[0] + 42, B[1] - 6, '30°', 's ta', 'start');
      const C = [M[0] - s * 14, M[1] - c * 14];
      h += K.c(...C, 12, 'fk') + K.ar(...C, C[0], C[1] + 60, 'lm gr') + K.t(C[0] + 8, C[1] + 62, '20 N', 's', 'start');
      h += K.ar(...C, C[0] - 30 * c, C[1] + 30 * s, 'lg gr') + K.t(14, 20, 'a lo largo: 20 sen 30° = 10 N', 's tg', 'start') + K.t(14, 38, 'contra la rampa: 20 cos 30° ≈ 17.3 N', 's tf', 'start');
    } else {
      const o = [110, 176], u = 16, I = (x, y, z) => K.iso(o, u, x, y, z), A = I(0, 0, 6), B = I(2, 3, 0);
      h += K.l(...I(0, 0, 0), ...I(4, 0, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 5, 0), 'lm') + K.l(...I(0, 0, 0), ...A, 'lm gr') + K.l(...A, ...B, 'lg');
      h += K.c(...A, 4, 'fg') + K.t(A[0] + 8, A[1], 'A(0, 0, 6)', 's tg', 'start') + K.c(...B, 4, 'fg') + K.t(B[0] - 6, B[1] - 10, 'B(2, 3, 0)', 's tg', 'end');
      h += K.t(334, 20, 'AB = (2, 3, −6), |AB| = 7', 's', 'end');
      if (q >= 5) h += K.t(334, 40, 'T = 70 · AB / 7 = (20, 30, −60) N', 's ta', 'end');
    }
    return h;
  };
  // Capítulo 4, tu turno: inclinar la rampa hasta que la normal de 60 N sea 30 N.  v { g }
  const rampa = (v, K) => {
    const B = [40, 150], c = Math.cos(rad(v.g)), s = Math.sin(rad(v.g)), L = Math.min(260, 120 / Math.max(s, 0.01)), T = [B[0] + L * c, B[1] - L * s], M = [B[0] + L * 0.5 * c, B[1] - L * 0.5 * s];
    const C = [M[0] - s * 14, M[1] - c * 14];
    let h = K.l(20, B[1], 320, B[1], 'lm') + K.l(...B, ...T, 'lm gr') + K.arc(...B, 30, 0, v.g, 'la') + K.t(B[0] + 4, B[1] + 18, `θ = ${v.g}°`, 's ta', 'start');
    return h + K.c(...C, 12, 'fk') + K.ar(...C, C[0], C[1] + 40, 'lm gr') + K.t(C[0] + 16, C[1] + 6, '60 N', 's', 'start');
  };

  // Problema: maceta de 25 N con una cuerda horizontal y un cable a 30°.  v { T }
  const maceta = (v, K) => {
    const P = [220, 116], c = Math.cos(rad(30)), s = 0.5, A = [P[0] + 92 * c / s * 0.6, P[1] - 92 * 0.6];
    let h = K.l(30, 50, 30, 170, 'lm gr') + K.l(30, P[1], ...P, 'lm') + K.l(...P, ...A, 'lm') + K.l(A[0] - 30, A[1], 336, A[1], 'lm gr');
    h += K.arc(...P, 24, 0, 30, 'la') + K.t(P[0] + 30, P[1] + 4, '30°', 's ta', 'start');
    h += K.r(P[0] - 14, P[1] + 4, 28, 24, 'fk', 6) + K.ar(...P, P[0], P[1] + 50, 'lm gr') + K.t(P[0] + 18, P[1] + 46, '25 N', 's', 'start');
    h += K.ar(...P, P[0] + v.T * 1.1 * c, P[1] - v.T * 1.1 * s, 'la gr') + K.t(44, 20, `T = ${v.T} N`, 's ta', 'start');
    return h + K.t(44, 38, `parte vertical: T sen 30° = ${N(v.T / 2)} N`, 's tm', 'start');
  };

  xpLec('geo-19', [
    ['La fuerza es un vector',
      xpMira('dibujo', 'Una fuerza no es solo un número: tiene **tamaño**, **dirección** y un **punto** donde actúa. Por eso es una flecha, y se escribe por componentes.', { dib: fuerza, v: { k: 0 }, alto: 200 }, [
        ['Una fuerza se mide en newtons. Esta empuja la caja con 10 N: la flecha mide 10.', {}],
        ['Su dirección se da con el ángulo θ desde el eje x positivo: aquí, 53°.', { k: 1 }],
        ['Bajando una perpendicular sale un triángulo: la sombra en x y la altura en y son sus componentes.', { k: 2 }],
        ['Con el triángulo: Fx = F cos θ y Fy = F sen θ. Con 53°, el triángulo es el 6-8-10.', { k: 3 }, '$\\vec F = F(\\cos\\theta, \\sin\\theta)$'],
        ['El punto de aplicación importa: la misma flecha sobre otro cuerpo hace otra cosa.', { k: 4 }],
      ], 'Una fuerza es un vector: $\\vec F = F(\\cos\\theta, \\sin\\theta)$, con magnitud en newtons y punto de aplicación.'),
      xpHaz('dibujo', 'Una cuerda tira de la caja con 10 N a 37° sobre la horizontal. Arrastra la punta de la fuerza a sus componentes (cada cuadro es 1 N).', {
        dib: turno1, v: { a: 2, b: 2 }, metas: { a: 8, b: 6 }, alto: 200,
        manijas: [{ k: ['a', 'b'], min: 0, max: 10, paso: 1, en: v => Q1(v.a, v.b), de: (x, y) => [(x - O1[0]) / U1, (O1[1] - y) / U1] }],
        lee: v => `$\\vec F = (${v.a}, ${v.b})$ N`, pista: 'Con 37° el triángulo es el 3-4-5 agrandado: cos 37° = 0.8 y sen 37° = 0.6.' },
      '$\\vec F = 10(\\cos 37^{\\circ}, \\sin 37^{\\circ}) = (8, 6)$ N.')],
    ['La resultante',
      xpMira('dibujo', 'Si varias fuerzas actúan en un mismo punto, todas juntas hacen lo mismo que **una sola**: la resultante, su suma vectorial.', { dib: resultante, v: { k: 0 }, alto: 200 }, [
        ['Fuerzas concurrentes actúan en un mismo punto; coplanarias, en un mismo plano. Aquí F₁ y F₂ son las dos cosas.', {}],
        ['Gráficamente, la resultante es la diagonal del paralelogramo que forman F₁ y F₂.', { k: 1 }],
        ['O, igual, se pone F₂ a continuación de F₁, punta con cola: R va del inicio al final.', { k: 2 }],
        ['Por componentes es más fácil: se suman las x por un lado y las y por otro.', { k: 3 }, '$R_x = \\sum F_x,\\ R_y = \\sum F_y$'],
        ['La magnitud sale con Pitágoras y la dirección con la tangente, mirando el cuadrante.', { k: 4 }, '$|\\vec R| = \\sqrt{R_x^2 + R_y^2},\\ \\tan\\theta = \\dfrac{R_y}{R_x}$'],
        ['Cuidado: las magnitudes no se suman como números. Las flechas se compensan en parte.', { k: 5 }],
      ], 'La resultante es la suma vectorial: $R_x = \\sum F_x$, $R_y = \\sum F_y$, y su magnitud con Pitágoras.'),
      xpHaz('fichas', 'Halla la resultante de F₁ = (5, 2) N y F₂ = (1, 6) N y su magnitud.', {
        slots: [104, 214, 316].map(x => ({ x, y: 64, w: 44, h: 34 })), alto: 116, fondo: fondo2,
        fichas: ['6', '8', '10', '14', '4'], meta: ['6', '8', '10'], pista: 'Suma por separado las x y las y. Para la magnitud, Pitágoras con esos dos números.' },
      '$\\vec R = (6, 8)$ N y $|\\vec R| = \\sqrt{36 + 64} = 10$ N, no $\\sqrt{29} + \\sqrt{37}$.')],
    ['Equilibrio',
      xpMira('dibujo', 'Un cuerpo queda **quieto** (o sigue igual) cuando las fuerzas se anulan: puestas punta con cola, vuelven al punto de partida.', { dib: equilibrio, v: { k: 0 }, alto: 200 }, [
        ['Tres cuerdas tiran de un aro con F₁ = (4, 0), F₂ = (−1, 3) y F₃ = (−3, −3).', {}],
        ['Puestas punta con cola, la última termina donde empezó la primera: el polígono se cierra.', { k: 1 }],
        ['Eso es el equilibrio: la suma da el vector cero, o sea, cero en x y cero en y.', { k: 2 }, '$\\sum \\vec F = \\vec 0 \\iff \\sum F_x = 0,\\ \\sum F_y = 0$'],
        ['Sin F₃, las otras dos dejan una resultante R = (3, 3): el aro se movería.', { k: 3 }],
        ['La fuerza que lo devuelve al equilibrio es la equilibrante: −R, igual tamaño y sentido contrario.', { k: 4 }, '$\\vec E = -\\vec R$'],
      ], 'Equilibrio: $\\sum \\vec F = \\vec 0$, el polígono de fuerzas se cierra. La equilibrante es $-\\vec R$.'),
      xpHaz('dibujo', 'Dos cuerdas tiran de una argolla con (4, 1) N y (−1, 2) N. Arrastra la punta de E para que la argolla quede en equilibrio.', {
        dib: turno3, v: { a: 1, b: 0 }, metas: { a: -3, b: -3 }, alto: 210,
        manijas: [{ k: ['a', 'b'], min: [-6, -6], max: [4, 2], paso: 1, en: v => Q4(3 + v.a, 3 + v.b), de: (x, y) => [(x - O4[0]) / U4 - 3, (O4[1] - y) / U4 - 3] }],
        lee: v => `$\\vec E = (${v.a}, ${v.b})$ N`, pista: 'La punta de E tiene que caer en la argolla, donde empieza la primera flecha.' },
      'La resultante es $(3, 3)$ N, así que $\\vec E = (-3, -3)$ N.')],
    ['Cuerdas, rampas y el espacio',
      xpMira('dibujo', 'Con las componentes el equilibrio se vuelve **ecuaciones**: sirve para cuerdas, rampas y cables en el espacio.', { dib: aplicaciones, v: { k: 0 }, alto: 200 }, [
        ['Un letrero de 40 N cuelga de una cuerda horizontal y de un cable a 53°.', {}],
        ['Una ecuación por eje: lo horizontal se anula y lo vertical sostiene el peso.', { k: 1 }],
        ['Con sen 53° = 0.8 sale T = 50 N, y la cuerda horizontal tira con 30 N.', { k: 2 }],
        ['En una rampa, el peso se parte: W sen θ a lo largo y W cos θ contra la rampa.', { k: 3 }],
        ['En el espacio, la tensión de un cable va de A hacia B: T por el vector unitario del cable.', { k: 4 }, '$\\vec T = T\\,\\dfrac{\\vec{AB}}{|\\vec{AB}|}$'],
        ['Con T = 70 N y |AB| = 7, cada componente de AB se multiplica por 10.', { k: 5 }],
      ], 'Rampa: $W\\sin\\theta$ a lo largo y $W\\cos\\theta$ normal. Cable: $\\vec T = T\\,\\vec{AB}/|\\vec{AB}|$.'),
      xpHaz('dibujo', 'Una caja de 60 N está en una rampa. Desliza el ángulo hasta que la parte del peso que aprieta contra la rampa sea de 30 N.', {
        dib: rampa, v: { g: 10 }, metas: { g: 60 }, alto: 230, manijas: [{ k: 'g', min: 0, max: 80, paso: 10, et: 'ángulo de la rampa' }],
        lee: v => `$60\\cos ${v.g}^{\\circ} \\approx ${N(60 * Math.cos(rad(v.g)))}$ N`, pista: 'La parte normal es W cos θ: busca el ángulo cuyo coseno es un medio.' },
      '$60\\cos\\theta = 30$ da $\\cos\\theta = \\tfrac{1}{2}$, $\\theta = 60^{\\circ}$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una maceta de 25 N cuelga de una cuerda horizontal y de un cable a 30° sobre la horizontal. Desliza la tensión del cable hasta que la sostenga.', {
        dib: maceta, v: { T: 10 }, metas: { T: 50 }, alto: 230, manijas: [{ k: 'T', min: 0, max: 100, paso: 5, et: 'T del cable (N)' }],
        lee: v => `$T\\sin 30^{\\circ} = ${N(v.T / 2)}$ N`, pista: 'Solo el cable tiene parte vertical: T sen 30° tiene que igualar el peso.' },
      '$T\\sin 30^{\\circ} = 25$ da $T = 50$ N; la cuerda horizontal tira con $50\\cos 30^{\\circ} \\approx 43.3$ N.')],
  ], 'Las fuerzas se suman como vectores; en equilibrio la suma es cero, y eso da una ecuación por cada eje.');
}
;
//#archivo js/explora-gva-20.js
// Geometría Vectorial · explicación de geo-20 «Cinemática» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: la posición es una flecha; el desplazamiento solo mira la salida y la llegada, y el camino puede ser más largo;
// la velocidad media reparte Δr en el tiempo. Con velocidad constante la posición recorre una recta con reloj; dos móviles se
// encuentran si coinciden con el mismo t, y si no, están más cerca en el pie de la perpendicular. Lo que se ve desde tierra es la
// velocidad propia más la del medio, y desde un carro se resta la del carro. El tiro parabólico suma tres flechas. Los ejemplos no
// son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  const r2 = x => Math.round(x * 100) / 100;
  const pl = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h + K.l(P.X(P.x0), P.oy, P.X(P.x1), P.oy, 'lm') + K.l(P.ox, P.Y(P.y0), P.ox, P.Y(P.y1), 'lm');
  };
  const rot = (K, A, B, s, cls, lado = 1) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * 12, (A[1] + B[1]) / 2 - lado * dx / L * 12 + 4, s, `s ${cls}`);
  };
  const vec = q => `(${q.map(x => sg(r2(x))).join(', ')})`;

  // 1 · el gato: 4 m al norte y 3 m al este, en 5 s
  const P1 = pl({ x0: -5, x1: 4, y0: -3, y1: 5 }, 180, 140, 22);
  const gato = (v, K) => {
    const O = [P1.ox, P1.oy], S = P2(P1, [-3, -1]), M = P2(P1, [-3, 3]), E = P2(P1, [0, 3]);
    let h = pap(K, P1) + K.c(O[0], O[1], 3, 'fk') + K.t(O[0] + 6, O[1] + 14, 'O', 's tm', 'start');
    h += K.f(v.pos, K.ar(O[0], O[1], S[0], S[1], 'lg') + rot(K, O, S, 'r₁', 'tg', 1));
    h += K.f(v.camino, K.pl([S, M, E], 'lm gr') + K.t(M[0] - 8, (S[1] + M[1]) / 2, '4 m', 's tm', 'end') + K.t((M[0] + E[0]) / 2, M[1] - 8, '3 m', 's tm') + K.ar(O[0], O[1], E[0], E[1], 'lg') + rot(K, O, E, 'r₂', 'tg', -1));
    h += K.f(v.dr, K.ar(S[0], S[1], E[0], E[1], 'la gr') + rot(K, S, E, 'Δr', 'ta', -1));
    h += K.f(v.largo, K.t(332, 18, '‖Δr‖ = 5 m · camino 7 m', 's ta', 'end'));
    h += K.f(v.vm, K.t(8, 18, 'en 5 s: vₘ = (0.6, 0.8) m/s', 's ta', 'start'));
    h += K.f(v.vuelta, K.l(E[0], E[1] + 3, S[0] + 3, S[1], 'lf d') + K.t(332, 218, 'si vuelve: Δr = (0, 0)', 's tf', 'end'));
    return h + K.c(S[0], S[1], 5, 'fG') + K.f(v.camino, K.c(E[0], E[1], 5, 'fG'));
  };
  const P1b = pl({ x0: -5, x1: 3, y0: -3, y1: 4 }, 200, 124, 24);
  const hazDesp = (v, K) => {
    const O = [P1b.ox, P1b.oy], A = P2(P1b, [1, -2]), B = P2(P1b, [-3, 1]), D = P2(P1b, [v.x, v.y]);
    let h = pap(K, P1b) + K.ar(O[0], O[1], A[0], A[1], 'lg') + K.t(A[0] + 8, A[1] + 4, 'r₁ = (1, −2)', 's tg', 'start') + K.ar(O[0], O[1], B[0], B[1], 'lg') + K.t(B[0] - 8, B[1] - 6, 'r₂ = (−3, 1)', 's tg', 'end');
    if (v.x || v.y) h += K.ar(O[0], O[1], D[0], D[1], 'la gr');
    return h + K.t(8, 18, `Δr = ${vec([v.x, v.y])}`, 's ta', 'start');
  };

  // 2 · la recta con reloj: A = (−4, −2) + t(2, 1) y B = (2, −4) + t(−1, 2); luego B sale un segundo tarde
  const P2a = pl({ x0: -5, x1: 5, y0: -5, y1: 4 }, 170, 112, 20);
  const enA = t => [-4 + 2 * t, -2 + t], enB = (t, tarde) => { const s = Math.max(0, t - tarde); return [2 - s, -4 + 2 * s]; };
  const reloj = (v, K) => {
    const tarde = v.tarde > 0.5 ? 1 : 0, A = P2(P2a, enA(v.t)), A0 = P2(P2a, enA(0)), A4 = P2(P2a, enA(4.4));
    let h = pap(K, P2a) + K.l(A0[0], A0[1], A4[0], A4[1], 'lg d');
    for (let t = 0; t <= 4; t++) { const q = P2(P2a, enA(t)); h += K.f(v.marcas, K.c(q[0], q[1], 2.5, 'fM') + K.t(q[0] + 2, q[1] + 15, `${t} s`, 's tm')); }
    h += K.c(A[0], A[1], 6, 'fG') + K.t(A[0] - 9, A[1] - 7, 'A', 's tg', 'end') + K.t(8, 18, `t = ${r2(v.t)} s · A = ${vec(enA(v.t))}`, 's ta', 'start');
    if (v.B > 0.01) {
      const B0 = P2(P2a, enB(0, 0)), B4 = P2(P2a, enB(4.2, 0)), B = P2(P2a, enB(v.t, tarde));
      h += K.f(v.B, K.l(B0[0], B0[1], B4[0], B4[1], 'lf d') + K.c(B[0], B[1], 6, 'fF') + K.t(B[0] + 9, B[1] + 4, 'B', 's tf', 'start'));
    }
    h += K.f(v.tarde, K.t(332, 218, 'B sale 1 s tarde', 's tf', 'end'));
    if (v.rel > 0.01) { const B = P2(P2a, enB(v.t, 1)); h += K.f(v.rel, K.l(A[0], A[1], B[0], B[1], 'lo gr') + K.t(332, 36, 'lo más cerca: d ⟂ v_B − v_A', 's to', 'end')); }
    return h;
  };
  const P2b = pl({ x0: -4, x1: 5, y0: -5, y1: 4 }, 136, 112, 22);
  const hazReloj = (v, K) => {
    const S = P2(P2b, [-3, 2]), V = P2(P2b, [-1, 0]), Q = P2(P2b, [v.x, v.y]);
    return pap(K, P2b) + K.c(S[0], S[1], 5, 'fG') + K.t(S[0] - 8, S[1] - 8, 'r₀', 's tg', 'end') + K.ar(S[0], S[1], V[0], V[1], 'lg gr') + K.t(V[0] + 8, V[1] - 6, 'v (1 s)', 's tg', 'start')
      + K.c(Q[0], Q[1], 4, 'fk') + K.t(8, 18, `a los 2.5 s: ${vec([v.x, v.y])}`, 's ta', 'start');
  };

  // 3 · el río de 30 m que corre a (4, 0), con un bote de 5 m/s; al final, la lluvia vista desde un carro
  const RB = [110, 190], LJ = 40, UV = 14;
  const rio = (v, K) => {
    const m = Math.round(v.modo);
    if (m === 4) {   // la lluvia (0, −12) vista desde un carro (5, 0)
      const O = [150, 40], L = [O[0], O[1] + 12 * 12], R = [O[0] - 5 * 12, O[1] + 12 * 12];
      let h = '';
      [40, 70, 260, 290].forEach((x, i) => { h += K.l(x, 30 + 8 * i, x, 90 + 8 * i, 'lr'); });
      h += K.ar(O[0], O[1], L[0], L[1], 'lg gr') + K.t(L[0] + 8, L[1], 'suelo (0, −12)', 's tg', 'start') + K.l(L[0], L[1], R[0], R[1], 'lf d') + K.t((L[0] + R[0]) / 2, L[1] + 16, '− carro (5, 0)', 's tf');
      h += K.ar(O[0], O[1], R[0], R[1], 'la gr') + K.t(R[0] - 8, (O[1] + R[1]) / 2, 'desde el carro', 's ta', 'end') + K.c(O[0], O[1], 4, 'fk');
      return h + K.t(8, 18, '(0, −12) − (5, 0) = (−5, −12): 13 m/s', 's ta', 'start');
    }
    const w = m === 2 || m === 3 ? [-4, 3] : [0, 5], g = [w[0] + 4, w[1]], W = [RB[0] + w[0] * UV, RB[1] - w[1] * UV], G = [RB[0] + g[0] * UV, RB[1] - g[1] * UV];
    let h = K.r(8, LJ, 324, RB[1] - LJ, 'fc', 0) + K.l(8, LJ, 332, LJ, 'lm gr') + K.l(8, RB[1], 332, RB[1], 'lm gr') + K.t(14, RB[1] + 18, 'el río mide 30 m', 's tm', 'start');
    [[220, 70], [240, 120], [200, 165]].forEach(([x, y]) => { h += K.ar(x, y, x + 4 * UV, y, 'lr'); });
    h += K.t(254, 62, 'corriente (4, 0)', 's tf', 'middle') + K.ar(RB[0], RB[1], W[0], W[1], 'la gr') + K.t(W[0] + (w[0] < 0 ? 0 : 8), W[1] - 10, `proa ${vec(w)}`, 's ta', w[0] < 0 ? 'middle' : 'start');
    if (m >= 1) {
      const L = [RB[0] + g[0] / g[1] * (RB[1] - LJ), LJ];
      h += K.l(W[0], W[1], G[0], G[1], 'lm d') + K.ar(RB[0], RB[1], G[0], G[1], 'lo gr') + K.t(G[0] + 8, G[1] + 14, `tierra ${vec(g)}`, 's to', 'start');
      h += K.l(RB[0], RB[1], L[0], L[1], 'lo d') + K.c(L[0], L[1], 5, 'fo');
      h += K.t(8, 18, m === 1 ? 'cruza en 6 s y baja 24 m' : 'cruza derecho', 's to', 'start');
    }
    h += K.f(v.tiempo, K.t(332, 18, 'tarda 30 / 3 = 10 s', 's ta', 'end'));
    h += K.f(m === 3 ? 1 : 0, K.t(332, 36, 'avión: aire + viento = tierra', 's tm', 'end'));
    return h + K.p([[RB[0] - 9, RB[1] + 2], [RB[0] + 9, RB[1] + 2], [RB[0] + 5, RB[1] + 9], [RB[0] - 5, RB[1] + 9]], 'fk');
  };
  // Tu turno: un río de 40 m que corre a (2, 0); el bote apunta derecho a (0, 4). ¿Dónde llega?
  const hazDeriva = (v, K) => {
    const s = 6, x0 = 50, near = 160, far = 40, L = [x0 + v.d * s, far];
    let h = K.r(8, far, 324, near - far, 'fc', 0) + K.l(8, far, 332, far, 'lm gr') + K.l(8, near, 332, near, 'lm gr') + K.t(332, near + 16, 'el río mide 40 m', 's tm', 'end');
    for (let d = 0; d <= 40; d += 10) h += K.l(x0 + d * s, far - 4, x0 + d * s, far + 4, 'lm') + K.t(x0 + d * s, far - 8, `${d}`, 's tm');
    h += K.ar(240, 100, 268, 100, 'lr') + K.t(254, 92, 'corriente (2, 0)', 's tf') + K.ar(x0, near, x0, near - 4 * 12, 'la gr') + K.t(x0 + 8, near - 30, 'proa (0, 4)', 's ta', 'start');
    return h + K.c(x0, near, 5, 'fk') + K.c(L[0], L[1], 5, 'fA') + K.t(332, 18, `llega ${v.d} m río abajo`, 's ta', 'end');
  };

  // 4 · el tiro con v₀ = (6, 15): escalas distintas en x y en y (la suma de flechas no cambia)
  const GT = 214, XT = 50, SX = 12, SY = 4;
  const pT = q => [XT + q[0] * SX, GT - q[1] * SY];
  const en4 = t => [6 * t, 15 * t - 5 * t * t];
  const tiro = (v, K) => {
    let h = K.l(8, GT, 332, GT, 'lm gr');
    for (let m = 0; m <= 20; m += 5) h += K.l(XT + m * SX, GT, XT + m * SX, GT + 5, 'lm') + K.t(XT + m * SX, GT + 16, `${m} m`, 's tm');
    const t = v.t, pts = [];
    for (let k = 0; k <= 30; k++) pts.push(pT(en4(t * k / 30)));
    const O = pT([0, 0]), A = pT([6 * t, 15 * t]), B = pT(en4(t));
    const g = Math.min(1, v.g), Bv = [A[0] + (B[0] - A[0]) * g, A[1] + (B[1] - A[1]) * g];
    h += K.f(g, K.pl(pts, 'la d')) + K.f(v.sin, K.ar(O[0], O[1], A[0], A[1], 'lg gr') + K.t(A[0] - 8, A[1] - 4, 't·v₀', 's tg', 'end'));
    h += K.f(v.g, K.ar(A[0], A[1], B[0], B[1], 'lf gr') + K.t(A[0] + 8, (A[1] + B[1]) / 2, '½t²·g', 's tf', 'start'));
    h += K.c(Bv[0], Bv[1], 6, 'fA') + K.t(8, 18, `t = ${r2(t)} s · r = ${vec(g > 0.99 ? en4(t) : [6 * t, 15 * t - 5 * t * t * g])}`, 's ta', 'start');
    h += K.f(v.top, K.l(8, pT([0, 11.25])[1], 332, pT([0, 11.25])[1], 'lo d') + K.t(330, pT([0, 11.25])[1] - 5, 'cima: 11.25 m', 's to', 'end'));
    return h;
  };
  const G2 = 190;   // suelo de las escenas con regla abajo
  const hazTiro = (v, K) => {
    let h = K.l(8, G2, 332, G2, 'lm gr');
    for (let m = 0; m <= 14; m += 2) h += K.l(XT + m * 18, G2, XT + m * 18, G2 + 5, 'lm') + K.t(XT + m * 18, G2 + 16, `${m}`, 's tm');
    const F = XT + v.x * 18;
    return h + K.c(XT, G2, 4, 'fk') + K.ar(XT, G2, XT + 7 * 6, G2 - 5 * 6, 'lg gr') + K.t(XT + 48, G2 - 34, 'v₀ = (7, 5)', 's tg', 'start')
      + K.l(F, G2, F, G2 - 26, 'la') + K.p([[F, G2 - 26], [F + 12, G2 - 21], [F, G2 - 16]], 'fA') + K.t(332, 18, `bandera a ${v.x} m`, 's ta', 'end');
  };

  // Problema: la manguera con v₀ = (10, 10) m/s y la pared a 10 m
  const manguera = (v, K) => {
    const s = 12, x0 = 60, W = x0 + 10 * s, H = G2 - v.h * s;
    let h = K.l(8, G2, 332, G2, 'lm gr') + K.r(W, 30, 16, G2 - 30, 'fc', 0) + K.t(W + 22, 44, 'pared a 10 m', 's tm', 'start');
    for (let y = 0; y <= 15; y += 5) h += K.l(W - 4, G2 - y * s, W, G2 - y * s, 'lm') + K.t(W - 7, G2 - y * s + 4, `${y}`, 's tm', 'end');
    h += K.c(x0, G2, 5, 'fk') + K.ar(x0, G2, x0 + 40, G2 - 40, 'lg gr') + K.t(x0 + 46, G2 - 42, 'v₀ = (10, 10)', 's tg', 'start');
    return h + K.l(W - 14, H, W + 16, H, 'la gr') + K.c(W, H, 5, 'fA') + K.t(8, 18, `pega a ${v.h} m`, 's ta', 'start');
  };

  xpLec('geo-20', [
    ['Dónde está y cuánto se movió',
      xpMira('dibujo', 'La **posición** es una flecha desde el origen. El **desplazamiento** solo mira la salida y la llegada; el camino puede ser más largo.', { dib: gato, v: { pos: 0, camino: 0, dr: 0, largo: 0, vm: 0, vuelta: 0 }, alto: 226 }, [
        ['La posición es la flecha r del origen al móvil. Si el móvil se mueve, la punta se corre.', { pos: 1 }],
        ['Un gato camina 4 m al norte y luego 3 m al este: recorre 4 + 3 = 7 m.', { camino: 1 }],
        ['El desplazamiento solo mira la salida y la llegada: es la flecha r₂ − r₁.', { dr: 1 }, '$\\Delta\\vec r = \\vec r_2 - \\vec r_1 = (0, 3) - (-3, -1) = (3, 4)$'],
        ['Su largo es 5 m, menos que los 7 m del camino: la recta es el atajo.', { largo: 1 }, '$\\|\\Delta\\vec r\\| = 5 \\le 7$'],
        ['Si tardó 5 s, la velocidad media reparte Δr entre el tiempo y apunta como Δr.', { vm: 1 }, '$\\vec v_m = \\dfrac{\\Delta\\vec r}{\\Delta t} = \\tfrac15\\,(3, 4) = (0.6, 0.8)$ m/s'],
        ['Si el gato vuelve a donde salió, Δr y la velocidad media son nulos, aunque caminó 14 m.', { vuelta: 1 }],
      ], 'Δr = r₂ − r₁ solo depende de la salida y la llegada; la distancia recorrida suma el camino. La velocidad media es Δr / Δt.'),
      xpHaz('dibujo', 'Un ciclista sale de $\\vec r_1 = (1, -2)$ y llega a $\\vec r_2 = (-3, 1)$. Arrastra la punta de $\\Delta\\vec r$, dibujada desde el origen.', { dib: hazDesp, v: { x: 0, y: 2 }, metas: { x: -4, y: 3 }, alto: 206,
        manijas: [{ k: ['x', 'y'], min: [-5, -3], max: [3, 4], paso: 1, en: v => P2(P1b, [v.x, v.y]), de: (x, y) => [(x - P1b.ox) / P1b.u, (P1b.oy - y) / P1b.u] }],
        lee: v => `Tu $\\Delta\\vec r = (${v.x}, ${v.y})$`,
        dice: v => (v.x === -4 && v.y === 3 ? 'Justo: (−3, 1) − (1, −2) = (−4, 3), de largo 5.' : v.x === 4 && v.y === -3 ? 'Restaste al revés: va de la llegada a la salida.'
          : v.x === -2 && v.y === -1 ? 'Sumaste las posiciones; el desplazamiento es una resta.' : 'Resta coordenada a coordenada: llegada menos salida.') },
        'Δr = (−3, 1) − (1, −2) = (−4, 3): mide 5, sea cual sea el camino.')],
    ['Velocidad constante: una recta con reloj',
      xpMira('dibujo', 'Con velocidad constante la posición recorre una **recta**, y el tiempo hace de parámetro. Dos móviles se encuentran si coinciden con el **mismo** t.', { dib: reloj, v: { t: 0, marcas: 0, B: 0, tarde: 0, rel: 0 }, alto: 226 }, [
        ['Con velocidad constante, cada segundo se suma la misma flecha v: las marcas quedan parejas.', { marcas: 1, t: 1 }],
        ['A los t segundos, r = r₀ + t·v: una recta cuyo parámetro es el tiempo.', { t: 3 }, '$\\vec r(3) = (-4, -2) + 3\\,(2, 1) = (2, 1)$'],
        ['Otro móvil B sale a la vez. ¿Se encuentran? Se igualan las posiciones con el mismo t.', { B: 1, t: 1 }, '$-4 + 2t = 2 - t \\;\\Rightarrow\\; t = 2$'],
        ['A los 2 s los dos están en (0, 0), y la otra coordenada da el mismo t.', { t: 2 }, '$-2 + t = -4 + 2t \\;\\Rightarrow\\; t = 2$'],
        ['Si B saliera un segundo tarde, llegaría al cruce cuando A ya pasó: cortarse no basta.', { tarde: 1, t: 2 }],
        ['¿Cuándo están más cerca? B − A recorre una recta: lo más cerca es el pie de la perpendicular.', { rel: 1, t: 2.5 }, '$\\vec d(t)\\cdot(\\vec v_B - \\vec v_A) = 0 \\;\\Rightarrow\\; t = 2.5$ s'],
      ], 'r(t) = r₀ + t·v es una recta con reloj; dos móviles se encuentran si r_A(t) = r_B(t) con el mismo t.'),
      xpHaz('dibujo', 'Un patinador parte de $\\vec r_0 = (-3, 2)$ con $\\vec v = (2, -2)$ m/s. Arrastra el punto a su posición a los **2.5 s**.', { dib: hazReloj, v: { x: 0, y: 0 }, metas: { x: 2, y: -3 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [-4, -5], max: [5, 4], paso: 1, en: v => P2(P2b, [v.x, v.y]), de: (x, y) => [(x - P2b.ox) / P2b.u, (P2b.oy - y) / P2b.u] }],
        lee: v => `Tu punto: $(${v.x}, ${v.y})$`,
        dice: v => (v.x === 2 && v.y === -3 ? 'Justo: (−3, 2) + 2.5·(2, −2) = (2, −3).' : v.x === 1 && v.y === -2 ? 'Ahí está a los 2 s; falta medio segundo.'
          : v.x === -1 && v.y === 0 ? 'Ese es r₀ + v, al primer segundo.' : 'Suma a r₀ la flecha v multiplicada por 2.5.') },
        'r(2.5) = (−3, 2) + 2.5·(2, −2) = (−3 + 5, 2 − 5) = (2, −3).')],
    ['Velocidad relativa: el medio también se mueve',
      xpMira('dibujo', 'Desde la orilla se ve la velocidad del bote **más** la del agua. Desde un carro, a todo se le **resta** la velocidad del carro.', { dib: rio, v: { modo: 0, tiempo: 0 }, alto: 226 }, [
        ['Un bote va a 5 m/s respecto al agua; el río de 30 m corre a 4 m/s.', { modo: 0 }],
        ['Si apunta derecho, ve (4, 5) desde la orilla: cruza en 6 s y el río lo baja 24 m.', { modo: 1 }, '$\\vec v_{\\text{tierra}} = \\vec v_{\\text{propia}} + \\vec v_{\\text{río}} = (0, 5) + (4, 0)$'],
        ['Para llegar enfrente, gira la proa río arriba hasta que la suma no tenga parte este.', { modo: 2 }, '$(-4, 3) + (4, 0) = (0, 3)$'],
        ['Cruza derecho pero más lento: el tiempo lo decide la parte que apunta a la otra orilla.', { tiempo: 1 }, '$t = \\tfrac{30}{3} = 10$ s'],
        ['Con un avión es igual: velocidad respecto al aire más viento da la velocidad respecto a tierra.', { modo: 3, tiempo: 0 }],
        ['Lo que ve B de A es v_A − v_B: desde un carro, la lluvia vertical se ve inclinada.', { modo: 4 }, '$\\vec v_{L/C} = \\vec v_L - \\vec v_C = (0, -12) - (5, 0) = (-5, -12)$'],
      ], 'Desde tierra: velocidad propia + velocidad del medio. Lo que ve B de A: v_A − v_B.'),
      xpHaz('dibujo', 'Un bote apunta derecho a $(0, 4)$ m/s en un río de **40 m** que corre a $(2, 0)$ m/s. Arrastra la marca a donde **llega**, en metros río abajo.', { dib: hazDeriva, v: { d: 0 }, metas: { d: 20 }, alto: 226,
        manijas: [{ k: 'd', min: 0, max: 40, paso: 5, et: 'metros río abajo' }],
        lee: v => `Tarda $40 / 4 = 10$ s; tu marca: $${v.d}$ m`,
        dice: v => (v.d === 20 ? 'Justo: cruza en 40 / 4 = 10 s y el agua lo baja 2 · 10 = 20 m.' : v.d === 40 ? 'Ese es el ancho del río; lo que lo baja es la corriente durante el cruce.'
          : v.d === 10 ? 'Ese es el tiempo, 10 s; el río lo baja 2 m cada segundo.' : 'Primero el tiempo de cruce con la parte que apunta a la orilla; luego multiplica por la corriente.') },
        'Cruza en 40 / 4 = 10 s, y en ese tiempo la corriente lo baja 2 · 10 = 20 m.')],
    ['El tiro parabólico: tres flechas',
      xpMira('dibujo', 'Con la gravedad la posición es la **suma de tres flechas**: dónde salió, lo que avanzaría derecho y lo que la gravedad la baja.', { dib: tiro, v: { t: 2, sin: 0, g: 0, top: 0 }, alto: 232 }, [
        ['Sin gravedad, la pelota lanzada con v₀ = (6, 15) seguiría la recta r₀ + t·v₀.', { sin: 1 }],
        ['La gravedad suma otra flecha, siempre hacia abajo, que crece con el cuadrado del tiempo.', { g: 1 }, '$\\tfrac12 t^2\\,\\vec g = (0, -5t^2)$ con $\\vec g = (0, -10)$'],
        ['La posición es la suma de las tres flechas: a los 2 s va en (12, 10).', {}, '$\\vec r(t) = \\vec r_0 + t\\,\\vec v_0 + \\tfrac12 t^2\\,\\vec g$'],
        ['En x no hay aceleración: avanza 6 m cada segundo. En y sube, se frena y cae.', { t: 1 }],
        ['Cae cuando la altura vuelve a 0: 15t − 5t² = 0 da t = 3 s, a 18 m.', { t: 3 }, '$5t\\,(3 - t) = 0$, $x = 6 \\cdot 3 = 18$'],
        ['Lo más alto llega cuando la velocidad vertical 15 − 10t se anula, a los 1.5 s.', { t: 1.5, top: 1 }, '$y(1.5) = 22.5 - 11.25 = 11.25$ m'],
      ], 'r(t) = r₀ + t·v₀ + ½t²·g: la parte horizontal avanza parejo y la vertical es 15t − 5t².'),
      xpHaz('dibujo', 'Una pelota sale del suelo con $\\vec v_0 = (7, 5)$ m/s y $\\vec g = (0, -10)$. Arrastra la bandera a donde **cae**.', { dib: hazTiro, v: { x: 0 }, metas: { x: 7 }, alto: 262,
        manijas: [{ k: 'x', min: 0, max: 14, paso: 1, et: 'metros desde la salida' }],
        lee: v => `Tu bandera: $${v.x}$ m`,
        dice: v => (v.x === 7 ? 'Justo: 5t − 5t² = 0 da t = 1 s, y en 1 s avanza 7 m.' : v.x === 14 ? 'Contaste 2 s de vuelo: con ½t²·g, la altura vuelve a 0 en 1 s.'
          : 'Busca cuándo la altura 5t − 5t² vuelve a 0 y mira cuánto avanzó en x.') },
        'La altura 5t − 5t² vuelve a 0 a t = 1 s; en ese segundo avanza 7 m.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una manguera en el piso lanza agua con $\\vec v_0 = (10, 10)$ m/s hacia una pared que está a **10 m**. Con $\\vec g = (0, -10)$, ¿a qué **altura** pega el chorro en la pared?', { dib: manguera, v: { h: 0 }, metas: { h: 5 }, alto: 262,
        manijas: [{ k: 'h', min: 0, max: 15, paso: 1, et: 'altura en la pared, m' }],
        lee: v => `Llega a la pared a $t = 1$ s; tu altura: $${v.h}$ m`,
        dice: v => (v.h === 5 ? 'Justo: llega a x = 10 al segundo, y en ese segundo y = 10 − 5 = 5 m.' : v.h === 10 ? 'Así sería sin gravedad; en 1 s la gravedad lo baja ½·10·1² = 5 m.'
          : 'Primero el tiempo para llegar a x = 10; luego la altura 10t − 5t² en ese instante.') },
        'En x avanza 10 m cada segundo: llega a la pared a t = 1 s, cuando y = 10 · 1 − 5 · 1² = 5 m.')],
  ], 'La posición es una flecha r(t): con velocidad constante recorre una recta, desde tierra se suma el medio y la gravedad añade ½t²·g.');
}
;
//#archivo js/explora-gva-21.js
// Geometría Vectorial · explicación de geo-21 «Trabajo y momento de una fuerza» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: de la fuerza solo trabaja la parte que va por el camino (W = F · d, con su signo); varias fuerzas trabajan lo
// que trabaja su resultante, también en el espacio; el momento es fuerza por brazo de palanca (M = r × F), con su sentido de giro,
// y un balancín queda quieto cuando los momentos se cancelan. Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(Math.round(n * 100) / 100).replace('-', '−');
  const sen = g => Math.sin(g * Math.PI / 180), cos = g => Math.cos(g * Math.PI / 180);
  const r0 = x => (Math.abs(x) < 1e-9 ? 0 : x);

  // 1 · solo trabaja lo que va por el camino: una maleta que se jala con 50 N y avanza 4 m
  const H1 = [96, 132], L1 = 90;
  const maleta = (v, K) => {
    const T = K.at(H1[0], H1[1], L1, v.g), S = [H1[0] + L1 * cos(v.g), H1[1]], W = r0(50 * 4 * cos(v.g));
    let h = K.l(8, 196, 332, 196, 'lm gr') + K.r(34, 140, 56, 46, 'fk', 6) + K.c(44, 190, 5, 'fk') + K.c(80, 190, 5, 'fk') + K.l(84, 142, H1[0], H1[1], 'lm gr');
    h += K.f(v.d, K.ar(30, 206, 300, 206, 'lg gr') + K.t(30, 222, 'd = 4 m', 's tg', 'start'));
    h += K.f(v.F, K.ar(H1[0], H1[1], T[0], T[1], 'la gr') + K.t(T[0] + 6, T[1] - 4, 'F = 50 N', 's ta', 'start') + (v.g > 1 ? K.arc(H1[0], H1[1], 26, 0, v.g, 'lm') + K.t(...K.at(H1[0], H1[1], 40, v.g / 2), `${Math.round(v.g)}°`, 's tm') : ''));
    h += K.f(v.sombra, K.l(T[0], T[1], S[0], S[1], 'lm d') + (Math.abs(S[0] - H1[0]) > 2 ? K.ar(H1[0], H1[1], S[0], S[1], 'lo gr') : '') + K.t(Math.max(H1[0], S[0]) + 8, H1[1] + 18, 'la parte que trabaja', 's to', 'start'));
    return h + K.f(v.cuenta, K.t(332, 18, `W = 50 · 4 · cos ${Math.round(v.g)}° = ${sg(W)} J`, `s ${W < 0 ? 'tf' : 'ta'}`, 'end'));
  };
  const hazMaleta = (v, K) => {
    const H = [96, 132], T = [H[0] + 12 * 6, H[1] - 9 * 6];
    return K.l(8, 196, 332, 196, 'lm gr') + K.r(34, 140, 56, 46, 'fk', 6) + K.c(44, 190, 5, 'fk') + K.c(80, 190, 5, 'fk') + K.l(84, 142, H[0], H[1], 'lm gr')
      + K.ar(H[0], H[1], T[0], T[1], 'la gr') + K.t(T[0] + 6, T[1], 'F = (12, 9) N', 's ta', 'start') + K.ar(30, 206, 300, 206, 'lg gr') + K.t(30, 222, 'd = (5, 0) m', 's tg', 'start')
      + K.t(332, 18, `tu trabajo: ${v.w} J`, 's ta', 'end');
  };

  // 2 · varias fuerzas y el espacio: una caja que avanza 5 m, y un objeto que va de A a B en R³
  const C2 = [110, 132], E2 = 1.2;
  const fz2 = [['tirón', [30, 40], 'la'], ['roce', [-20, 0], 'lf'], ['peso', [0, -60], 'lm'], ['piso', [0, 20], 'lg']];
  const varias = (v, K) => {
    const I = (x, y, z) => XPK.iso([150, 200], 22, x, y, z);
    let h = '';
    if (v.esp < 0.99) {
      let c = K.l(8, 150, 332, 150, 'lm gr') + K.r(C2[0] - 18, C2[1] - 18, 36, 36, 'fn', 4) + K.ar(30, 170, 300, 170, 'lg gr') + K.t(30, 186, 'd = (5, 0) m', 's tg', 'start');
      fz2.forEach(([n, F, cl], i) => { const T = [C2[0] + F[0] * E2, C2[1] - F[1] * E2]; c += K.f(v.fz, K.ar(...C2, ...T, `${cl} gr`) + K.t(T[0] + (F[0] < 0 ? -6 : 6), T[1] + (F[1] < 0 ? 14 : -4), n, 's', F[0] < 0 ? 'end' : 'start'));
        c += K.f(v.w, K.t(332, 18 + 18 * i, `${n}: ${sg(F[0])} · 5 = ${sg(F[0] * 5)} J`, 's tm', 'end')); });
      c += K.f(v.tot, K.t(332, 94, 'total: 150 − 100 + 0 + 0 = 50 J', 's ta', 'end'));
      c += K.f(v.res, K.ar(C2[0], C2[1] + 8, C2[0] + 10 * E2 * 2, C2[1] + 8, 'lo gr') + K.t(C2[0] + 36, C2[1] + 12, 'R = (10, 0)', 's to', 'start') + K.t(332, 112, 'R · d = 10 · 5 = 50 J', 's to', 'end'));
      h += K.f(1 - v.esp, c);
    }
    if (v.esp > 0.01) {
      const O = I(0, 0, 0), A = I(1, 0, 0), B = I(5, 0, 2);
      let e = '';
      [[6, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 4, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); e += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
      e += K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + K.t(A[0] - 8, A[1] + 14, 'A(1, 0, 0)', 's', 'end') + K.t(B[0] + 8, B[1] - 6, 'B(5, 0, 2)', 's', 'start') + K.ar(...A, ...B, 'lg gr');
      e += K.t(8, 18, 'd = B − A = (4, 0, 2) m', 's tg', 'start') + K.f(v.cuenta, K.t(8, 38, 'F = (2, 3, 1) N', 's ta', 'start') + K.t(8, 58, 'W = 2·4 + 3·0 + 1·2 = 10 J', 's ta', 'start'));
      h += K.f(v.esp, e);
    }
    return h;
  };
  const hazDron = (v, K) => {
    const I = (x, y, z) => XPK.iso([150, 214], 20, x, y, z), O = I(0, 0, 0), A = I(0, 1, 2), B = I(3, 1, 6);
    let h = '';
    [[5, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 7, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); h += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
    return h + K.c(...A, 4, 'fk') + K.c(...B, 5, 'fA') + K.l(...A, ...B, 'lg gr d') + K.t(A[0] - 8, A[1] + 4, 'A', 's', 'end') + K.t(B[0] + 8, B[1] + 4, 'B', 's', 'start')
      + K.t(8, 18, 'A(0, 1, 2) → B(3, 1, 6) m', 's tg', 'start') + K.t(8, 36, 'F = (2, 5, 4) N', 's ta', 'start') + K.t(332, 18, `tu trabajo: ${v.w} J`, 's ta', 'end');
  };

  // 3 · el momento: fuerza por brazo de palanca, en una llave vista desde arriba (40 N)
  const O3 = [60, 140], U3 = 600;
  const llave = (v, K) => {
    const H = [O3[0] + v.r * U3, O3[1]], T = K.at(H[0], H[1], 64, v.g), e = [cos(v.g), -sen(v.g)], dx = v.r * U3, Fo = [H[0] - dx * cos(v.g) * e[0], H[1] - dx * cos(v.g) * e[1]];
    const brazo = r0(v.r * sen(v.g)), M = r0(40 * brazo);
    let h = K.p([[O3[0] - 14, O3[1]], [O3[0] - 7, O3[1] - 12], [O3[0] + 7, O3[1] - 12], [O3[0] + 14, O3[1]], [O3[0] + 7, O3[1] + 12], [O3[0] - 7, O3[1] + 12]], 'fk')
      + K.r(O3[0] + 14, O3[1] - 5, 250, 10, 'fn', 4) + K.c(...O3, 3, 'fA') + K.t(O3[0], O3[1] + 30, 'tuerca', 's');
    h += K.c(...H, 4, 'fk') + K.ar(...H, ...T, 'la gr') + K.t(T[0] + 6, T[1] - 4, 'F = 40 N', 's ta', 'start') + K.t(H[0], H[1] + 24, `r = ${sg(v.r)} m`, 's tm');
    if (v.g > 1 && v.g < 179) h += K.arc(...H, 20, 0, v.g, 'lm');
    const ts = [[e[0], H[0], 6, 334], [e[1], H[1], 6, 220]].map(([d, c, a, b]) => (Math.abs(d) < 1e-9 ? [-1e9, 1e9] : [(a - c) / d, (b - c) / d].sort((m, k) => m - k))), t0 = Math.max(ts[0][0], ts[1][0]), t1 = Math.min(ts[0][1], ts[1][1]);
    h += K.f(v.linea, K.l(H[0] + t0 * e[0], H[1] + t0 * e[1], H[0] + t1 * e[0], H[1] + t1 * e[1], 'lm d'));
    if (brazo > 0.001) h += K.f(v.brazo, K.l(...O3, ...Fo, 'lo gr') + K.t((O3[0] + Fo[0]) / 2 + 6, (O3[1] + Fo[1]) / 2 - 4, `brazo ${sg(brazo)} m`, 's to', 'start'));
    h += K.f(v.giro, (M ? K.arc(...O3, 32, 30, 150, 'la') + K.t(O3[0] - 16, O3[1] + 48, 'gira antihorario', 's ta', 'start') : ''));
    return h + K.t(332, 18, `M = 40 · ${sg(brazo)} = ${sg(M)} N·m`, 's ta', 'end');
  };
  const hazLlave = (v, K) => {
    const H = [270, 150], T = K.at(H[0], H[1], 64, 150);
    return K.p([[46, 150], [53, 138], [67, 138], [74, 150], [67, 162], [53, 162]], 'fk') + K.r(74, 145, 210, 10, 'fn', 4) + K.c(...H, 4, 'fk')
      + K.ar(...H, ...T, 'la gr') + K.arc(...H, 22, 150, 180, 'lm') + K.t(H[0] - 34, H[1] - 14, '30°', 's tm', 'end') + K.t(H[0], H[1] + 24, '0.5 m', 's tm')
      + K.t(T[0] - 6, T[1] - 4, 'F = 60 N', 's ta', 'end') + K.t(332, 18, `tu momento: ${v.m} N·m`, 's ta', 'end');
  };

  // 4 · equilibrio de giro (balancín) y el momento en el espacio
  const P4 = [170, 160], S4 = 42;
  const balanza = (v, K) => {
    let h = '';
    if (v.esp < 0.99) {
      const net = 200 * 3 - 400 * v.x, phi = v.tilt * Math.sign(net) * 7 * Math.PI / 180, en = s => [P4[0] + s * S4 * Math.cos(phi), P4[1] - s * S4 * Math.sin(phi)];
      const blo = (s, F) => { const B = en(s); return K.r(B[0] - 13, B[1] - 24, 26, 22, 'fn', 4) + K.t(B[0], B[1] - 29, `${F} N`, 's'); };
      let c = K.p([[P4[0], P4[1]], [P4[0] - 16, P4[1] + 30], [P4[0] + 16, P4[1] + 30]], 'fk') + K.l(20, P4[1] + 30, 320, P4[1] + 30, 'lm') + K.l(...en(-3.4), ...en(3.4), 'lg gr');
      c += blo(-3, 200) + K.f(v.der, blo(v.x, 400));
      c += K.f(v.der, K.t(8, 18, 'izquierda: 200 · 3 = 600 N·m', 's tm', 'start') + K.t(8, 36, `derecha: 400 · ${sg(v.x)} = ${sg(400 * v.x)} N·m`, 's tm', 'start'));
      h += K.f(1 - v.esp, c);
    }
    if (v.esp > 0.01) {
      const I = (x, y, z) => XPK.iso([110, 196], 26, x, y, z), O = I(0, 0, 0), Rr = I(2, 0, 0), F = [Rr[0], Rr[1] - 0];
      let e = '';
      [[3, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 4, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); e += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
      const T = XPK.iso(Rr, 26 / 2, 0, 3, 4);
      e += K.ar(...O, ...Rr, 'lg gr') + K.t(Rr[0] + 4, Rr[1] + 16, 'r = (2, 0, 0)', 's tg', 'start') + K.ar(...F, ...T, 'la gr') + K.t(T[0] + 6, T[1], 'F = (0, 3, 4)', 's ta', 'start');
      const Mv = I(0, -8 / 4, 6 / 4);
      e += K.f(v.M, K.ar(...O, ...Mv, 'lo gr') + K.t(Mv[0] - 6, Mv[1] - 4, 'M = (0, −8, 6)', 's to', 'end'));
      h += K.f(v.esp, e);
    }
    return h;
  };
  const hazEje = (v, K) => {
    const I = (x, y, z) => XPK.iso([120, 200], 24, x, y, z), O = I(0, 0, 0), Rr = I(0, 1, 0), T = XPK.iso(Rr, 24 / 4, 5, 0, 12);
    let h = '';
    [[3, 0, 0, 'x'], [0, 4, 0, 'y'], [0, 0, 4, 'z']].forEach(([x, y, z, s]) => { const Q = I(x, y, z); h += K.ar(...O, ...Q, 'lm') + K.t(Q[0] + 6, Q[1] + 4, s, 's tm', 'start'); });
    return h + K.ar(...O, ...Rr, 'lg gr') + K.ar(...Rr, ...T, 'la gr') + K.t(8, 18, 'r = (0, 1, 0) m', 's tg', 'start') + K.t(8, 36, 'F = (5, 0, 12) N', 's ta', 'start')
      + K.t(332, 18, `tu ‖M‖: ${v.m} N·m`, 's ta', 'end');
  };

  // Problema: el carrito por la rampa
  const rampa = (v, K) => {
    const A = [30, 200], B = [30 + 12 * 22, 200 - 5 * 22];
    return K.p([A, B, [B[0], A[1]]], 'fn') + K.l(...A, ...B, 'lg gr') + K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + K.t(A[0], A[1] + 18, 'A(0, 0)', 's', 'start') + K.t(B[0], B[1] - 10, 'B(12, 5) m', 's', 'end')
      + K.r(120, 140, 30, 20, 'fk', 4) + K.ar(100, 152, 150, 152, 'la gr') + K.t(98, 148, 'F', 's ta', 'end') + K.ar(135, 162, 135, 196, 'lm gr') + K.t(140, 190, 'peso', 's tm', 'start')
      + K.t(8, 18, 'empuje F = (60, 0) N', 's ta', 'start') + K.t(8, 36, 'peso P = (0, −40) N', 's tm', 'start') + K.t(332, 18, `tu trabajo total: ${v.w} J`, 's ta', 'end');
  };

  xpLec('geo-21', [
    ['Solo trabaja lo que va por el camino',
      xpMira('dibujo', 'Empujar no siempre es **trabajar**: el trabajo mide cuánto de la fuerza va en la dirección del movimiento.', { dib: maleta, v: { F: 0, d: 0, sombra: 0, cuenta: 0, g: 60 }, alto: 226 }, [
        ['Jalas una maleta con una fuerza inclinada y la maleta avanza por el piso. ¿Cuánto de tu fuerza la mueve?', { F: 1, d: 1 }],
        ['Solo la parte de la fuerza a lo largo del camino. La parte que tira hacia arriba no la hace avanzar.', { sombra: 1 }],
        ['Esa parte por la distancia recorrida es el trabajo: el producto escalar de la fuerza y el desplazamiento.', { cuenta: 1 }, '$W = \\vec F \\cdot \\vec d = \\|\\vec F\\|\\,\\|\\vec d\\|\\cos\\theta$'],
        ['Con 50 N a 60° y 4 m de avance, la parte útil es 25 N: el trabajo es 100 J.', {}, '$W = 50 \\cdot 4 \\cdot \\cos 60^{\\circ} = 100$ J'],
        ['Si la fuerza es perpendicular al camino, como al cargar una bolsa caminando, no hay parte útil: W = 0.', { g: 90 }, '$\\theta = 90^{\\circ} \\Rightarrow W = 0$'],
        ['Si tiene una parte en contra, como cuando frenas la maleta en una bajada, el trabajo es negativo.', { g: 120 }, '$\\theta > 90^{\\circ} \\Rightarrow W < 0$'],
      ], 'W = F · d: solo trabaja la parte de la fuerza a lo largo del camino; a favor es positivo, perpendicular cero, en contra negativo.'),
      xpHaz('dibujo', 'Una maleta avanza $\\vec d = (5, 0)$ m y la jalas con $\\vec F = (12, 9)$ N. Ajusta el **trabajo** que haces.', { dib: hazMaleta, v: { w: 0 }, metas: { w: 60 }, alto: 226,
        manijas: [{ k: 'w', min: 0, max: 150, paso: 5, et: 'trabajo, en J' }],
        lee: v => `$\\vec F \\cdot \\vec d = 12 \\cdot 5 + 9 \\cdot 0$; tu valor: $${v.w}$ J`,
        dice: v => (v.w === 60 ? 'Justo: 12 · 5 + 9 · 0 = 60 J; los 9 N verticales no trabajan.' : v.w === 75 ? 'Usaste toda la fuerza, ‖F‖ = 15 N: solo trabajan los 12 N horizontales.' : 'Multiplica componente a componente: F · d = 12·5 + 9·0.') },
        'Solo trabaja la componente horizontal: 12 · 5 = 60 J.')],
    ['Varias fuerzas, y en el espacio',
      xpMira('dibujo', 'Casi siempre actúan **varias fuerzas** a la vez. Cada una trabaja por su cuenta, y el total se suma con signos.', { dib: varias, v: { fz: 0, w: 0, tot: 0, res: 0, esp: 0, cuenta: 0 }, alto: 226 }, [
        ['Sobre una caja que avanza 5 m actúan a la vez un tirón, el roce, el peso y el piso.', { fz: 1 }],
        ['Cada una hace su trabajo: el tirón 150 J, el roce −100 J; el peso y el piso, 0, por ser perpendiculares.', { w: 1 }, '$W_i = \\vec F_i \\cdot \\vec d$'],
        ['El trabajo total es la suma, con sus signos: 150 − 100 + 0 + 0 = 50 J.', { tot: 1 }],
        ['Con la resultante sale lo mismo: R = (10, 0) y R · d = 50 J.', { res: 1 }, '$W = \\vec R \\cdot \\vec d, \\quad \\vec R = \\vec F_1 + \\vec F_2 + \\dots$'],
        ['En el espacio es igual: si un objeto va de A a B, su desplazamiento es d = B − A.', { esp: 1 }, '$\\vec d = B - A$'],
        ['Con F = (2, 3, 1) N y d = (4, 0, 2) m, W = 10 J.', { cuenta: 1 }, '$W = F_1d_1 + F_2d_2 + F_3d_3$'],
      ], 'El trabajo de varias fuerzas es la suma de sus trabajos, igual al de la resultante; entre dos puntos, d = B − A, también en R³.'),
      xpHaz('dibujo', 'Un dron lleva un paquete de $A(0, 1, 2)$ a $B(3, 1, 6)$ m y su motor empuja con $\\vec F = (2, 5, 4)$ N. Ajusta el **trabajo** del motor.', { dib: hazDron, v: { w: 0 }, metas: { w: 22 }, alto: 236,
        manijas: [{ k: 'w', min: 0, max: 40, paso: 1, et: 'trabajo, en J' }],
        lee: v => `$\\vec d = B - A$; tu valor: $${v.w}$ J`,
        dice: v => (v.w === 22 ? 'Justo: d = (3, 0, 4) y F · d = 6 + 0 + 16 = 22 J.' : v.w === 35 ? 'Multiplicaste por B y no por el desplazamiento d = B − A.' : 'Primero d = B − A; luego el producto escalar con F.') },
        'd = (3, 0, 4) y W = 2·3 + 5·0 + 4·4 = 22 J.')],
    ['El momento: fuerza por brazo',
      xpMira('dibujo', 'Una fuerza también puede hacer **girar**. Lo que mide ese giro es el **momento** de la fuerza.', { dib: llave, v: { r: 0.2, g: 90, linea: 0, brazo: 0, giro: 0 }, alto: 226 }, [
        ['Para aflojar una tuerca no importa solo cuánta fuerza haces, sino dónde y en qué dirección empujas.', {}],
        ['Empujando perpendicular a la llave, más lejos se gira más fácil: el momento es la fuerza por la distancia.', { r: 0.3 }, '$M = \\|\\vec r\\|\\,\\|\\vec F\\|$'],
        ['Si empujas inclinado, lo que cuenta es la distancia de la tuerca a la línea de la fuerza: el brazo de palanca.', { g: 150, linea: 1, brazo: 1 }, '$\\text{brazo} = \\|\\vec r\\|\\operatorname{sen}\\theta$'],
        ['Por eso el momento es un producto vectorial, con r de la tuerca al punto donde empujas.', {}, '$\\vec M = \\vec r \\times \\vec F, \\quad \\|\\vec M\\| = \\|\\vec r\\|\\,\\|\\vec F\\|\\operatorname{sen}\\theta$'],
        ['En el plano, el signo del momento dice el sentido: positivo si gira antihorario, negativo si gira horario.', { giro: 1 }, '$M = r_1F_2 - r_2F_1$'],
        ['Si empujas a lo largo de la llave, la fuerza pasa por la tuerca: el brazo es cero.', { g: 180, giro: 0 }, '$\\theta = 0^{\\circ} \\text{ o } 180^{\\circ} \\Rightarrow \\vec M = \\vec 0$'],
      ], 'M = r × F: la fuerza por el brazo de palanca, r sen θ; su signo da el sentido y es cero si la fuerza pasa por el punto.'),
      xpHaz('dibujo', 'Empujas una llave con **60 N** a **0.5 m** de la tuerca, formando **30°** con la llave. Ajusta el **momento**.', { dib: hazLlave, v: { m: 0 }, metas: { m: 15 }, alto: 226,
        manijas: [{ k: 'm', min: 0, max: 30, paso: 1, et: 'momento, en N·m' }],
        lee: v => `$M = 0.5 \\cdot 60 \\cdot \\operatorname{sen} 30^{\\circ}$; tu valor: $${v.m}$ N·m`,
        dice: v => (v.m === 15 ? 'Justo: el brazo es 0.5 · sen 30° = 0.25 m y M = 60 · 0.25 = 15 N·m.' : v.m === 30 ? 'Así sería empujando perpendicular a la llave: falta el seno de 30°.' : 'Multiplica la fuerza por el brazo de palanca, 0.5 · sen 30°.') },
        'El brazo es 0.5 · sen 30° = 0.25 m: M = 60 · 0.25 = 15 N·m.')],
    ['Equilibrio de giro y momento en el espacio',
      xpMira('dibujo', 'Cuando dos momentos tiran en sentidos contrarios, gana el más grande; si son iguales, **nada gira**.', { dib: balanza, v: { der: 0, x: 1, tilt: 0, esp: 0, M: 0 }, alto: 226 }, [
        ['Un balancín gira alrededor de su apoyo. Cada peso lo hace girar con un momento: peso por distancia al apoyo.', {}],
        ['Izquierda: 200 N a 3 m, 600 N·m. Derecha: 400 N a 1 m, 400 N·m. Gana la izquierda.', { der: 1, tilt: 1 }],
        ['Si el de 400 N se corre a 1.5 m, los momentos se cancelan y el balancín queda quieto.', { x: 1.5, tilt: 0 }, '$200 \\cdot 3 = 400 \\cdot 1.5$'],
        ['Esa es la condición de equilibrio de giro: la suma de los momentos respecto al apoyo es cero.', {}, '$\\sum \\vec M = \\vec 0$'],
        ['En el espacio el momento es un vector. Se calcula con el determinante, con r y F en las filas.', { esp: 1 }, '$\\vec r \\times \\vec F = \\begin{vmatrix} \\vec i & \\vec j & \\vec k \\\\ r_1 & r_2 & r_3 \\\\ F_1 & F_2 & F_3 \\end{vmatrix}$'],
        ['Con r = (2, 0, 0) y F = (0, 3, 4), M = (0, −8, 6), por el eje de giro.', { M: 1 }, '$\\|\\vec M\\| = \\sqrt{0 + 64 + 36} = 10$'],
      ], 'Hay equilibrio de giro cuando los momentos se cancelan; en el espacio el momento es el vector r × F, por el eje de giro.'),
      xpHaz('dibujo', 'Una mano empuja con $\\vec F = (5, 0, 12)$ N en $\\vec r = (0, 1, 0)$ m desde el eje. Ajusta el tamaño del momento, $\\|\\vec r \\times \\vec F\\|$.', { dib: hazEje, v: { m: 0 }, metas: { m: 13 }, alto: 226,
        manijas: [{ k: 'm', min: 0, max: 30, paso: 1, et: 'tamaño del momento, en N·m' }],
        lee: v => `$\\vec r \\times \\vec F = (12, 0, -5)$; tu valor: $${v.m}$ N·m`,
        dice: v => (v.m === 13 ? 'Justo: r × F = (12, 0, −5) y su norma es √(144 + 25) = 13.' : v.m === 17 ? 'Sumaste las componentes: la norma es la raíz de la suma de sus cuadrados.' : 'Calcula r × F con el determinante y luego su norma.') },
        'r × F = (1·12 − 0·0, 0·5 − 0·12, 0·0 − 1·5) = (12, 0, −5), de norma 13 N·m.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Subes un carrito por una rampa de $A(0, 0)$ a $B(12, 5)$ m con un empuje horizontal $\\vec F = (60, 0)$ N; su peso es $\\vec P = (0, -40)$ N. Ajusta el **trabajo total** de las dos.', { dib: rampa, v: { w: 0 }, metas: { w: 520 }, alto: 226,
        manijas: [{ k: 'w', min: 0, max: 1000, paso: 40, et: 'trabajo total, en J' }],
        lee: v => `$\\vec d = (12, 5)$; tu valor: $${v.w}$ J`,
        dice: v => (v.w === 520 ? 'Justo: 60 · 12 − 40 · 5 = 720 − 200 = 520 J.' : v.w === 920 ? 'Sumaste sin signos: el peso trabaja en contra porque el carrito sube.' : v.w === 720 ? 'Ese es solo el trabajo del empuje; falta el del peso, que es negativo.' : 'Calcula F · d y P · d con d = B − A = (12, 5) y súmalos con signo.') },
        'W = F · d + P · d = 720 − 200 = 520 J: el empuje trabaja a favor y el peso en contra.')],
  ], 'El trabajo es F · d y solo lo hace la parte de la fuerza a lo largo del camino; el momento es r × F, la fuerza por su brazo de palanca.');
}
;
//#archivo js/explora-gva-22.js
// Geometría Vectorial · explicación de geo-22 «La circunferencia y la parábola» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: las cónicas son cortes de un cono; la circunferencia se fija con tres condiciones; la parábola equidista de un
// foco y una directriz, y al trasladar los ejes al vértice su ecuación se simplifica. Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const pt = q => `(${sg(q[0])}, ${sg(q[1])})`;
  const pl = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    return h;
  };
  const ins = (P, q) => q[0] >= P.x0 - 1e-9 && q[0] <= P.x1 + 1e-9 && q[1] >= P.y0 - 1e-9 && q[1] <= P.y1 + 1e-9;
  const traza = (K, P, pts, cls) => {
    let h = '', run = [];
    const corta = () => { if (run.length > 1) h += K.pl(run, cls); run = []; };
    pts.forEach(q => { if (ins(P, q)) run.push(P2(P, q)); else corta(); });
    corta();
    return h;
  };
  // (x − h)² = 4p(y − k) si eje 'x'; (y − k)² = 4p(x − h) si eje 'y'.
  const parab = c => { const o = []; for (let i = 0; i <= 80; i++) { const t = -12 + 24 * i / 80; o.push(c.eje === 'x' ? [c.h + t, c.k + t * t / (4 * c.p)] : [c.h + t * t / (4 * c.p), c.k + t]); } return o; };
  const dot = (K, P, q, s, cls = 'fk', dx = 8, dy = -8, a = 'start') => { const [x, y] = P2(P, q); return K.c(x, y, 4.5, cls) + (s ? K.t(x + dx, y + dy, s, 's', a) : ''); };
  const k = v => Math.round(v.k);

  // 1 · el cono doble y el plano que lo corta.   v { g, s (plano visible), c (curva visible), m (plano por el vértice) }
  const TIPO = (g, gen) => (g === 0 ? 'circunferencia' : g < gen ? 'elipse' : g === gen ? 'parábola' : 'hipérbola');
  const V1 = [104, 104], H1 = 80, Q1 = [118, 140];
  const icono = (K, tipo, cls) => {
    const c = [276, 112], q = [];
    if (tipo === 'circunferencia') return K.arc(c[0], c[1], 28, 0, 360, cls);
    if (tipo === 'elipse') { for (let i = 0; i <= 48; i++) { const a = i / 48 * 2 * Math.PI; q.push([c[0] + 38 * Math.cos(a), c[1] - 20 * Math.sin(a)]); } return K.pl(q, cls); }
    if (tipo === 'parábola') { for (let i = 0; i <= 40; i++) { const t = -36 + 72 * i / 40; q.push([c[0] + t, c[1] + 34 - t * t / 18]); } return K.pl(q, cls); }
    if (tipo === 'rectas') return K.l(c[0] - 30, c[1] - 30, c[0] + 30, c[1] + 30, cls) + K.l(c[0] - 30, c[1] + 30, c[0] + 30, c[1] - 30, cls);
    const rama = s => { const z = []; for (let i = 0; i <= 30; i++) { const u = -1.4 + 2.8 * i / 30; z.push([c[0] + s * 12 * Math.cosh(u), c[1] - 20 * Math.sinh(u)]); } return K.pl(z, cls); };
    return rama(1) + rama(-1);
  };
  const aro = (K, cx, cy, rx, ry, cls) => { const q = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * 2 * Math.PI; q.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); } return K.pl(q, cls); };
  const cono = (w, K, gen = 45) => {
    const v = { g: Math.round(w.g), s: Math.round(w.s), c: Math.round(w.c), m: Math.round(w.m) };
    const dx = H1 / Math.tan(gen * R), Q = v.m ? V1 : Q1;
    let h = K.l(V1[0], 14, V1[0], 196, 'lm d');
    for (const s of [1, -1]) h += K.l(V1[0] - s * dx, V1[1] - H1, V1[0] + s * dx, V1[1] + H1, 'lg gr');
    h += aro(K, V1[0], V1[1] - H1, dx, 9, 'lg') + aro(K, V1[0], V1[1] + H1, dx, 9, 'lg') + K.c(...V1, 3.5, 'fk') + K.t(V1[0] - 10, V1[1] + 4, 'V', 's', 'end');
    h += K.arc(...V1, 20, 0, gen, 'lg') + K.t(V1[0] + 26, V1[1] - 6, `${gen}°`, 's tg', 'start');
    if (v.s) {
      const d = [Math.cos(v.g * R), -Math.sin(v.g * R)];
      let a = -200, b = 200;
      [[Q[0], d[0], 6, 230], [Q[1], d[1], 6, 194]].forEach(([q, dq, lo, hi]) => { if (Math.abs(dq) < 1e-9) return; let t1 = (lo - q) / dq, t2 = (hi - q) / dq; if (t1 > t2) [t1, t2] = [t2, t1]; a = Math.max(a, t1); b = Math.min(b, t2); });
      h += K.l(Q[0] + a * d[0], Q[1] + a * d[1], Q[0] + b * d[0], Q[1] + b * d[1], 'la gr') + K.t(Q[0] + 26, Q[1] + 18, `${v.g}°`, 's ta', 'start');
    }
    if (v.c) { const t = v.m ? 'rectas' : TIPO(v.g, gen); h += icono(K, t, 'lo gr') + K.t(276, 176, v.m ? 'dos rectas' : t, 's to'); }
    return h;
  };

  // 2 · la circunferencia de centro (1, 2) y radio 3.   v { k }
  const P2c = pl({ x0: -3, x1: 5, y0: -2, y1: 6 }, 40 + 3 * 22, 26 + 6 * 22, 22);
  const circulo = (v, K) => {
    const q = k(v), C = P2(P2c, [1, 2]);
    let h = pap(K, P2c) + K.arc(...C, 3 * P2c.u, 0, 360, 'la gr') + dot(K, P2c, [1, 2], 'C', 'fk', 8, 14);
    if (q >= 1) h += K.t(332, 18, '(x − 1)² + (y − 2)² = 9', 's ta', 'end');
    if (q >= 2) h += K.t(332, 36, 'x² + y² − 2x − 4y − 4 = 0', 's tm', 'end');
    if (q >= 3) h += [[4, 2], [-2, 2], [1, 5]].map(z => dot(K, P2c, z, '', 'fo')).join('');
    if (q >= 4) h += K.t(332, 214, 'tres puntos → D, E, F', 's to', 'end');
    if (q >= 5) h += K.l(P2c.X(-3), P2c.Y(-1), P2c.X(5), P2c.Y(-1), 'lf gr') + K.l(...C, P2c.X(1), P2c.Y(-1), 'lo d') + dot(K, P2c, [1, -1], '', 'fo') + K.t(P2c.X(1) + 6, P2c.Y(0.5), 'r = 3', 's to', 'start');
    return h;
  };
  // Tu turno: centro (2, 1) y tangente 3x + 4y = 0.   v { r }
  const P2b = pl({ x0: -2, x1: 6, y0: -3, y1: 5 }, 70 + 2 * 22, 26 + 5 * 22, 22);
  const hazTangente = (v, K) => {
    const C = P2(P2b, [2, 1]), ln = [];
    for (let i = 0; i <= 40; i++) { const t = -8 + 16 * i / 40; ln.push([4 * t / 5, -3 * t / 5]); }
    return pap(K, P2b) + traza(K, P2b, ln, 'lf gr') + K.arc(...C, v.r * P2b.u, 0, 360, 'la gr') + dot(K, P2b, [2, 1], 'C', 'fk', 8, 14)
      + K.t(8, 16, 'recta: 3x + 4y = 0', 's tf', 'start') + K.t(332, 16, `(x − 2)² + (y − 1)² = ${v.r * v.r}`, 's ta', 'end');
  };

  // 3 · la parábola de foco (0, 1) y directriz y = −1.   v { k }
  const P3 = pl({ x0: -5, x1: 5, y0: -2, y1: 6 }, 170, 40 + 6 * 22, 22);
  const C3 = { eje: 'x', h: 0, k: 0, p: 1 };
  const parabola = (v, K) => {
    const q = k(v), F = [0, 1];
    let h = pap(K, P3) + K.l(P3.X(-5), P3.Y(-1), P3.X(5), P3.Y(-1), 'lf gr') + K.t(P3.X(-5), P3.Y(-1) + 16, 'directriz y = −1', 's tf', 'start') + dot(K, P3, F, 'F', 'fk', 8, -6);
    if (q === 1 || q === 2) {
      const Pq = [2, 1], A = P2(P3, Pq);
      h += dot(K, P3, [0, 0], 'V', 'fA', -8, 16, 'end') + K.l(...A, ...P2(P3, F), 'lg') + K.l(...A, P3.X(2), P3.Y(-1), 'lg') + dot(K, P3, Pq, '', 'fo') + K.t(332, 18, 'PF = 2 = distancia a la recta', 's tm', 'end');
    }
    if (q >= 2) h += traza(K, P3, parab(C3), 'la gr') + (q === 2 ? K.t(332, 36, 'x² = 4y', 's ta', 'end') : '');
    if (q === 3) h += K.l(...P2(P3, [-2, 1]), ...P2(P3, [2, 1]), 'lo gr') + K.t(332, 18, 'lado recto: |4p| = 4', 's to', 'end');
    if (q === 4) h += traza(K, P3, parab({ eje: 'y', h: 0, k: 0, p: 1 }), 'lf gr d') + K.t(332, 18, 'y² = 4x abre a la derecha', 's tm', 'end');
    if (q >= 5) [-3, -1.6, 1.6, 3].forEach(x => { const H = P2(P3, [x, x * x / 4]); h += K.l(H[0], P3.Y(6), ...H, 'lg') + K.ar(...H, ...P2(P3, F), 'lo'); });
    return h;
  };
  // Tu turno: foco (3, 2) y directriz x = −1; el vértice.   v { x, y }
  const P3b = pl({ x0: -2, x1: 5, y0: -1, y1: 5 }, 70 + 2 * 26, 34 + 5 * 26, 26);
  const hazVertice = (v, K) => pap(K, P3b) + K.l(P3b.X(-1), P3b.Y(-1), P3b.X(-1), P3b.Y(5), 'lf gr') + K.t(8, 16, 'directriz x = −1', 's tf', 'start')
    + dot(K, P3b, [3, 2], 'F', 'fk', 8, -6) + K.t(332, 16, `V = ${pt([v.x, v.y])}`, 's ta', 'end');

  // 4 · traslación de ejes: x² + 4x − 4y + 8 = 0 es (x + 2)² = 4(y − 1).   v { k }
  const P4 = pl({ x0: -6, x1: 3, y0: -1, y1: 6 }, 40 + 6 * 24, 40 + 6 * 24, 24);
  const traslada = (v, K) => {
    const q = k(v), O = P2(P4, [-2, 1]);
    let h = pap(K, P4) + traza(K, P4, parab({ eje: 'x', h: -2, k: 1, p: 1 }), 'la gr');
    if (q >= 1) h += K.ar(O[0], O[1], P4.X(3), O[1], 'lo') + K.ar(O[0], O[1], O[0], P4.Y(6), 'lo') + K.c(...O, 4, 'fo') + K.t(O[0] - 8, O[1] + 16, 'O′', 's to', 'end') + K.t(P4.X(3) - 2, O[1] - 6, 'x′', 's to', 'end') + K.t(O[0] + 6, P4.Y(6) + 12, 'y′', 's to', 'start');
    if (q >= 2) h += K.t(332, 18, 'x² + 4x − 4y + 8 = 0', 's tm', 'end');
    if (q >= 4) h += K.t(332, 36, '(x + 2)² = 4(y − 1)', 's ta', 'end') + K.t(332, 54, 'x′² = 4y′', 's to', 'end');
    if (q >= 5) h += dot(K, P4, [-2, 2], 'F', 'fk', 8, -6) + K.l(P4.X(-6), P4.Y(0), P4.X(3), P4.Y(0), 'lf gr');
    return h;
  };
  // Tu turno: y² + 2y − 4x + 9 = 0; el nuevo origen en el vértice.   v { x, y }
  const P4b = pl({ x0: -2, x1: 6, y0: -4, y1: 3 }, 60 + 2 * 26, 34 + 3 * 26, 26);
  const hazOrigen = (v, K) => {
    const O = P2(P4b, [v.x, v.y]);
    return pap(K, P4b) + K.l(P4b.X(-2), O[1], P4b.X(6), O[1], 'lo d') + K.l(O[0], P4b.Y(-4), O[0], P4b.Y(3), 'lo d')
      + K.t(8, 16, 'y² + 2y − 4x + 9 = 0', 's ta', 'start') + K.t(332, 16, `O′ = ${pt([v.x, v.y])}`, 's tm', 'end');
  };

  // Problema: el reflector de un faro de carro, 24 cm de boca y 4 cm de fondo.   v { r }
  const VF = [170, 206], UF = 9;
  const faro = (v, K) => {
    const X = x => VF[0] + x * UF, Y = y => VF[1] - y * UF, z = [];
    for (let i = 0; i <= 40; i++) { const x = -12 + 24 * i / 40; z.push([X(x), Y(x * x / 36)]); }
    return K.pl(z, 'lm gr') + K.l(VF[0], VF[1], VF[0], Y(16), 'lm d') + K.t(8, 36, 'boca: 24 cm de ancho', 's tm', 'start') + K.l(X(-12), Y(4) - 6, X(-12), Y(4) + 6, 'lm') + K.l(X(12), Y(4) - 6, X(12), Y(4) + 6, 'lm') + K.l(X(12) + 10, Y(0), X(12) + 10, Y(4), 'lm') + K.t(X(12) + 16, Y(2) + 4, '4 cm', 's tm', 'start')
      + K.c(VF[0], Y(v.r), 5, 'fA') + K.t(8, 18, `bombilla a ${v.r} cm del fondo`, 's ta', 'start');
  };

  xpLec('geo-22', [
    ['Cortes de un cono',
      xpMira('dibujo', 'Las **cónicas** salen de cortar un cono doble con un plano. La inclinación del plano decide la curva.', { dib: cono, v: { g: 0, s: 0, c: 0, m: 0 }, alto: 200 }, [
        ['Un cono doble: dos conos unidos por el vértice V. Las rectas que lo forman son las generatrices.', {}],
        ['Un plano perpendicular al eje corta una circunferencia.', { g: 0, s: 1, c: 1 }],
        ['Si se inclina un poco, menos que la generatriz, atraviesa toda la hoja: sale una elipse, cerrada.', { g: 20, s: 1, c: 1 }],
        ['Paralelo a una generatriz, nunca vuelve a salir de la hoja: la curva queda abierta. Es una parábola.', { g: 45, s: 1, c: 1 }],
        ['Más inclinado que la generatriz, corta las dos hojas: dos ramas, una hipérbola.', { g: 75, s: 1, c: 1 }],
        ['Si el plano pasa por el vértice, el corte degenera: un punto o un par de rectas.', { g: 75, s: 1, c: 1, m: 1 }],
      ], 'Plano perpendicular al eje: circunferencia; poco inclinado: elipse; paralelo a la generatriz: parábola; más: hipérbola.'),
      xpHaz('dibujo', 'Este cono tiene las generatrices a $45^{\\circ}$. Inclina el plano para que el corte sea una **elipse**.', { dib: cono, v: { g: 0, s: 1, c: 0, m: 0 }, metas: { g: 30 }, cumple: v => v.g > 0 && v.g < 45, alto: 250,
        manijas: [{ k: 'g', min: 0, max: 90, paso: 15, et: 'inclinación del plano' }],
        lee: v => `Plano a $${v.g}^{\\circ}$`,
        dice: v => (v.g > 0 && v.g < 45 ? 'Elipse: menos inclinado que la generatriz, el corte se cierra.' : v.g === 0 ? 'Horizontal da una circunferencia: inclínalo un poco.' : v.g === 45 ? 'Paralelo a la generatriz: parábola. Un poco menos.' : 'Corta las dos hojas: hipérbola. Mucho menos.') },
      'La elipse sale con el plano entre la horizontal y la inclinación de la generatriz.')],
    ['La circunferencia, una cónica',
      xpMira('dibujo', 'La circunferencia es la cónica del corte perpendicular al eje. Veamos qué la determina.', { dib: circulo, v: { k: 0 }, alto: 226 }, [
        ['Centro C(1, 2) y radio 3: todos los puntos a distancia 3 de C.', {}],
        ['Su ecuación ordinaria muestra el centro y el radio.', { k: 1 }, '$(x - 1)^2 + (y - 2)^2 = 9$'],
        ['Desarrollada es la ecuación general: x² y y² con el mismo coeficiente y sin término xy.', { k: 2 }, '$x^2 + y^2 + Dx + Ey + F = 0$'],
        ['Tiene tres números libres, D, E y F: bastan tres condiciones, como tres puntos.', { k: 3 }],
        ['Cada punto reemplazado da una ecuación lineal en D, E, F: un sistema de tres ecuaciones.', { k: 4 }, '$(4, 2):\\ 4D + 2E + F = -20$'],
        ['Con el centro y una tangente: el radio es la distancia del centro a la recta.', { k: 5 }, '$y = -1:\\ r = 2 - (-1) = 3$'],
      ], 'Tres condiciones fijan la circunferencia: tres puntos, o el centro y una tangente.'),
      xpHaz('dibujo', 'Desliza el radio para que la circunferencia de centro $(2, 1)$ sea **tangente** a la recta $3x + 4y = 0$.', { dib: hazTangente, v: { r: 1 }, metas: { r: 2 }, alto: 250,
        manijas: [{ k: 'r', min: 1, max: 6, paso: 1, et: 'radio' }],
        lee: v => `$r = ${v.r}$`,
        dice: v => (v.r === 2 ? 'Tangente: |3·2 + 4·1|/5 = 10/5 = 2.' : v.r < 2 ? 'No llega a la recta: calcula la distancia del centro a ella.' : 'Corta la recta en dos puntos: el radio sobra.') },
      'Radio de la tangente: $\\dfrac{|3 \\cdot 2 + 4 \\cdot 1|}{\\sqrt{9 + 16}} = 2$.')],
    ['La parábola: foco y directriz',
      xpMira('dibujo', 'La **parábola** es el lugar de los puntos a la misma distancia de un punto, el foco, y de una recta, la directriz.', { dib: parabola, v: { k: 0 }, alto: 226 }, [
        ['Foco F(0, 1) y directriz y = −1. ¿Qué puntos están a la misma distancia de los dos?', {}],
        ['El vértice V(0, 0), en la mitad. Y (2, 1): está a 2 del foco y a 2 de la directriz.', { k: 1 }],
        ['Todos juntos forman la parábola. p = 1 es la distancia con signo del vértice al foco.', { k: 2 }, '$x^2 = 4py = 4y$'],
        ['El lado recto es la cuerda por el foco perpendicular al eje: de (−2, 1) a (2, 1). Mide |4p| = 4.', { k: 3 }],
        ['Si la y va al cuadrado, el eje es horizontal: abre a un lado.', { k: 4 }, '$(y - k)^2 = 4p\\,(x - h)$'],
        ['Propiedad reflectora: todo rayo paralelo al eje rebota en la parábola hacia el foco.', { k: 5 }],
      ], 'Parábola: igual distancia al foco y a la directriz. Vértice en la mitad, lado recto |4p|, reflejos al foco.'),
      xpHaz('dibujo', 'El foco es $F(3, 2)$ y la directriz, $x = -1$. Arrastra el **vértice** de la parábola.', { dib: hazVertice, v: { x: -2, y: 4 }, metas: { x: 1, y: 2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-2, -1], max: [5, 5], paso: 1, en: v => P2(P3b, [v.x, v.y]), de: (x, y) => [(x - P3b.ox) / P3b.u, (P3b.oy - y) / P3b.u] }],
        lee: v => `Vértice en $${pt([v.x, v.y]).replace(/−/g, '-')}$`,
        dice: v => (v.x === 1 && v.y === 2 ? 'Justo en la mitad: a 2 del foco y a 2 de la directriz.' : v.y !== 2 ? 'El vértice está en el eje: la recta por F perpendicular a la directriz.' : 'Está en el eje; busca la mitad entre el foco y la directriz.') },
      'Vértice $(1, 2)$, $p = 2$: $(y - 2)^2 = 8(x - 1)$.')],
    ['Trasladar los ejes',
      xpMira('dibujo', 'Mover los ejes no mueve la curva: solo cambia el nombre de sus puntos. Puesto en el vértice, la ecuación queda limpia.', { dib: traslada, v: { k: 0 }, alto: 226 }, [
        ['Esta parábola tiene el vértice lejos del origen.', {}],
        ['Ponemos un nuevo origen O′ en (h, k). Cada punto cumple x = x′ + h y y = y′ + k.', { k: 1 }, '$x = x\' - 2,\\ y = y\' + 1$'],
        ['Su ecuación general es x² + 4x − 4y + 8 = 0.', { k: 2 }],
        ['Se completa el cuadrado: a x² + 4x le falta 4, y se suma a los dos lados.', { k: 3 }, '$x^2 + 4x + 4 = 4y - 8 + 4$'],
        ['Queda (x + 2)² = 4(y − 1). Con O′ en el vértice (−2, 1), es x′² = 4y′.', { k: 4 }],
        ['Ahora se lee todo: 4p = 4, p = 1, foco (−2, 2), directriz y = 0.', { k: 5 }],
      ], 'Completar el cuadrado es trasladar los ejes al vértice: $(x - h)^2 = 4p\\,(y - k)$ es $x\'^2 = 4p\\,y\'$.'),
      xpHaz('dibujo', 'Arrastra el nuevo origen **O′** al vértice de $y^2 + 2y - 4x + 9 = 0$, para que quede $y\'^2 = 4x\'$.', { dib: hazOrigen, v: { x: 0, y: 0 }, metas: { x: 2, y: -1 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [-2, -4], max: [6, 3], paso: 1, en: v => P2(P4b, [v.x, v.y]), de: (x, y) => [(x - P4b.ox) / P4b.u, (P4b.oy - y) / P4b.u] }],
        lee: v => `$O\' = ${pt([v.x, v.y]).replace(/−/g, '-')}$`,
        dice: v => (v.x === 2 && v.y === -1 ? 'Sí: (y + 1)² = 4x − 8 = 4(x − 2).' : v.x === -2 && v.y === 1 ? 'Los signos al revés: (y + 1)² dice k = −1.' : 'Completa el cuadrado en y y saca el 4 de los términos en x.') },
      '$y^2 + 2y + 1 = 4x - 9 + 1$: $(y + 1)^2 = 4(x - 2)$, vértice $(2, -1)$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'El reflector de un faro de carro es parabólico: **24 cm** de boca y **4 cm** de fondo. La luz sale paralela si la bombilla está en el foco. Súbela hasta ahí.', { dib: faro, v: { r: 2 }, metas: { r: 9 }, alto: 230,
        manijas: [{ k: 'r', min: 0, max: 15, paso: 1, en: v => [VF[0], VF[1] - v.r * UF], de: (x, y) => (VF[1] - y) / UF }],
        lee: v => `Bombilla a $${v.r}$ cm del fondo`,
        dice: v => (v.r === 9 ? 'En el foco: 144 = 16p da p = 9 cm. La luz sale paralela al eje.' : v.r === 4 ? 'Esa es la profundidad, no el foco: usa el borde (12, 4) en x² = 4py.' : 'Pon el borde (12, 4) en x² = 4py y despeja p.') },
      'El borde $(12, 4)$ cumple $x^2 = 4py$: $144 = 16p$, $p = 9$ cm.')],
  ], 'Las cónicas son cortes de un cono; la parábola equidista del foco y la directriz y refleja hacia el foco.');
}
;
//#archivo js/explora-gva-23.js
// Geometría Vectorial · explicación de geo-23 «La elipse y la hipérbola» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  const pt = q => `(${q.map(N).join(', ')})`;
  const en = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const corta = (K, pts, cls, [X0, X1, Y0, Y1]) => {
    let h = '', run = [];
    const va = () => { if (run.length > 1) h += K.pl(run, cls); run = []; };
    for (const q of pts) { if (q[0] >= X0 && q[0] <= X1 && q[1] >= Y0 && q[1] <= Y1) run.push(q); else va(); }
    va();
    return h;
  };
  const recta = (K, Q, [x1, y1], [x2, y2], cls, caja) => corta(K, Array.from({ length: 81 }, (_, i) => Q(x1 + (x2 - x1) * i / 80, y1 + (y2 - y1) * i / 80)), cls, caja);
  const elipse = (Q, h, kk, A, B, t1 = 2 * Math.PI) => Array.from({ length: 121 }, (_, i) => { const t = i / 120 * t1; return Q(h + A * Math.cos(t), kk + B * Math.sin(t)); });
  const rama = (Q, h, kk, A, B, d, sg) => Array.from({ length: 101 }, (_, i) => {
    const s = -3 + 6 * i / 100;
    return d ? Q(h + A * Math.sinh(s), kk + sg * B * Math.cosh(s)) : Q(h + sg * A * Math.cosh(s), kk + B * Math.sinh(s));
  });

  // Capítulo 1: estacas en (±8, 0) y cuerda de 20: a = 10, b = 6, c = 8. El lápiz en (5, 3√3): 14 + 6 = 20.  v { k }
  const O1 = [170, 112], U1 = 13, Q1 = en(O1, U1), C1 = [0, 340, 0, 210], P1 = [5, 3 * Math.sqrt(3)];
  const cuerda = (v, K) => {
    const q = k(v), F1 = Q1(-8, 0), F2 = Q1(8, 0);
    let h = K.l(...Q1(-12, 0), ...Q1(12, 0), 'lr d');
    if (q >= 1) h += corta(K, elipse(Q1, 0, 0, 10, 6), 'la gr', C1);
    if (q <= 2) h += K.pl([F1, Q1(...P1), F2], 'lg gr') + K.c(...Q1(...P1), 4, 'fa');
    if (q === 2) h += K.t(Q1(-1.5, 2.6)[0], Q1(-1.5, 2.6)[1] - 8, '14', 's tg', 'end') + K.t(Q1(6.5, 2.6)[0] + 6, Q1(6.5, 2.6)[1], '6', 's tg', 'start');
    if (q === 3) h += K.c(...Q1(10, 0), 4, 'fo') + K.c(...Q1(-10, 0), 4, 'fo') + K.cota(Q1(-10, 0)[0], 188, Q1(10, 0)[0], 188, '2a = 20');
    if (q === 4) h += K.pl([F1, Q1(0, 6), F2], 'lg') + K.l(...Q1(0, 0), ...Q1(0, 6), 'lf') + K.t(Q1(4, 3)[0] + 8, Q1(4, 3)[1] - 4, 'a = 10', 's tg', 'start') + K.t(Q1(0, 3)[0] - 6, Q1(0, 3)[1], 'b = 6', 's tf', 'end') + K.t(Q1(4, 0)[0], O1[1] + 16, 'c = 8', 's');
    if (q >= 5) {
      for (const t of [0.6, 1.3, 2.2, 4.1, 5.2]) {
        const W = [10 * Math.cos(t), 6 * Math.sin(t)];
        h += K.l(...F1, ...Q1(...W), 'lo') + K.l(...Q1(...W), ...F2, 'lo');
      }
    }
    h += K.c(...F1, 5, 'fk') + K.c(...F2, 5, 'fk') + K.t(F1[0], F1[1] + 18, 'F₁', 's tm') + K.t(F2[0], F2[1] + 18, 'F₂', 's tm');
    const dice = ['una cuerda de 20 y dos estacas', 'el lápiz tenso traza la curva', 'd₁ + d₂ = 14 + 6 = 20', 'en los vértices: 2a = 20', 'a² = b² + c²: 100 = 36 + 64', 'de un foco al otro · e = 8/10 = 0.8'][Math.min(q, 5)];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  // Capítulo 1, tu turno: estacas en (±15, 0), cuerda de 34: b = 8.  v { b }
  const O1b = [170, 112], U1b = 9, Q1b = en(O1b, U1b);
  const turno1 = (v, K) => {
    const T = Q1b(0, v.b), d = Math.hypot(15, v.b);
    let h = K.l(...Q1b(-18, 0), ...Q1b(18, 0), 'lr d') + corta(K, elipse(Q1b, 0, 0, 17, v.b), 'la gr', [0, 340, 0, 200]);
    h += K.pl([Q1b(-15, 0), T, Q1b(15, 0)], 'lg gr') + K.c(...Q1b(-15, 0), 5, 'fk') + K.c(...Q1b(15, 0), 5, 'fk') + K.c(...T, 4, 'fa');
    return h + K.t(14, 20, `cada tramo: √(15² + ${v.b}²) = ${N(d)}`, 's ta', 'start') + K.t(330, 20, `cuerda: ${N(2 * d)}`, 's tm', 'end');
  };

  // Capítulo 2: (x − 2)²/3 + (y − 1)²/4 = 1: vertical, a = 2, b = √3, c = 1, e = 1/2, lado recto 3.  v { k }
  const O2 = [110, 140], U2 = 30, Q2 = en(O2, U2), C2 = [20, 320, 50, 200], B3 = Math.sqrt(3);
  const ecuacion = (v, K) => {
    const q = k(v);
    let h = rej(K, O2, U2, -3, 7, -2, 3);
    const [cx, cy, A, B] = q === 0 ? [0, 0, 2, B3] : q === 1 ? [2, 1, 2, B3] : [2, 1, B3, 2];
    h += corta(K, elipse(Q2, cx, cy, A, B), 'la gr', C2) + K.c(...Q2(cx, cy), 4, 'fk');
    h += K.l(...Q2(cx, cy), ...Q2(cx + A, cy), 'lg') + K.l(...Q2(cx, cy), ...Q2(cx, cy + B), 'lf');
    if (q >= 3) h += K.c(...Q2(2, 2), 4, 'fo') + K.c(...Q2(2, 0), 4, 'fo') + K.t(Q2(2, 2)[0] + 8, Q2(2, 2)[1] + 4, '(2, 2)', 's to', 'start') + K.t(Q2(2, 0)[0] + 8, Q2(2, 0)[1] + 4, '(2, 0)', 's to', 'start');
    if (q >= 5) h += K.l(...Q2(0.5, 2), ...Q2(3.5, 2), 'lo gr');
    const dice = ['x²/4 + y²/3 = 1 · a = 2 en x', 'centro (2, 1): (x − 2)² y (y − 1)²', '(x − 2)²/3 + (y − 1)²/4 = 1 · eje mayor vertical', 'c² = 4 − 3 = 1 · focos (2, 1 ± 1)', 'e = c/a = 1/2', 'lado recto = 2b²/a = 2·3/2 = 3'][Math.min(q, 5)];
    return h + K.t(14, 24, dice, 's ta', 'start');
  };
  const fondo2 = K => K.t(14, 24, '(x + 2)²/16 + y²/7 = 1', 'ta', 'start') + K.t(62, 69, 'c =', 's', 'end') + K.t(172, 69, 'e =', 's', 'end') + K.t(272, 69, 'LR =', 's', 'end') + K.t(14, 106, 'LR es el lado recto, 2b²/a', 's tm', 'start');

  // Capítulo 3: x²/64 − y²/36 = 1: a = 8, b = 6, c = 10; P = (10, 4.5) con 20.5 − 4.5 = 16.  v { k }
  const O3 = [170, 108], U3 = 9, Q3 = en(O3, U3), C3 = [10, 330, 30, 200];
  const hiperbola = (v, K) => {
    const q = k(v), P = [10, 4.5];
    let h = K.l(...Q3(-17, 0), ...Q3(17, 0), 'lr d');
    if (q >= 3) h += K.p([Q3(-8, -6), Q3(8, -6), Q3(8, 6), Q3(-8, 6)], 'fn') + K.l(...Q3(-8, -6), ...Q3(8, -6), 'lm d') + K.l(...Q3(-8, 6), ...Q3(8, 6), 'lm d');
    if (q >= 4) h += recta(K, Q3, [-17, -12.75], [17, 12.75], 'lm', C3) + recta(K, Q3, [-17, 12.75], [17, -12.75], 'lm', C3);
    if (q >= 1) h += corta(K, rama(Q3, 0, 0, 8, 6, 0, 1), 'la gr', C3);
    if (q >= 2) h += corta(K, rama(Q3, 0, 0, 8, 6, 0, -1), 'la gr', C3);
    if (q <= 2) h += K.l(...Q3(-10, 0), ...Q3(...P), 'lg') + K.l(...Q3(10, 0), ...Q3(...P), 'lf') + K.c(...Q3(...P), 4, 'fa') + K.t(Q3(0, 2.5)[0], Q3(0, 2.5)[1] - 6, '20.5', 's tg') + K.t(Q3(10, 2)[0] + 6, Q3(10, 2)[1], '4.5', 's tf', 'start');
    if (q >= 3) h += K.c(...Q3(8, 0), 3, 'fk') + K.c(...Q3(-8, 0), 3, 'fk');
    h += K.c(...Q3(-10, 0), 5, 'fo') + K.c(...Q3(10, 0), 5, 'fo') + K.t(Q3(-10, 0)[0], O3[1] + 18, 'F₁', 's tm') + K.t(Q3(10, 0)[0], O3[1] + 18, 'F₂', 's tm');
    const dice = ['focos a 20 · P a 20.5 de uno y 4.5 del otro', 'la diferencia: 20.5 − 4.5 = 16 = 2a', 'dos ramas: |d₁ − d₂| = 16', 'rectángulo 16 × 12 · c² = 64 + 36 = 100', 'asíntotas: y = ±(6/8)x', 'e = c/a = 10/8 = 1.25'][Math.min(q, 5)];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  // Capítulo 3, tu turno: vértices (±4, 0); se desliza b hasta que las asíntotas sean y = ±x/2.  v { b }
  const O3b = [170, 96], U3b = 14, Q3b = en(O3b, U3b), C3b = [10, 330, 30, 170];
  const turno3 = (v, K) => {
    let h = K.l(...Q3b(-11, 0), ...Q3b(11, 0), 'lr d') + K.p([Q3b(-4, -v.b), Q3b(4, -v.b), Q3b(4, v.b), Q3b(-4, v.b)], 'fn');
    h += recta(K, Q3b, [-11, -11 * v.b / 4], [11, 11 * v.b / 4], 'lm', C3b) + recta(K, Q3b, [-11, 11 * v.b / 4], [11, -11 * v.b / 4], 'lm', C3b);
    h += corta(K, rama(Q3b, 0, 0, 4, v.b, 0, 1), 'la gr', C3b) + corta(K, rama(Q3b, 0, 0, 4, v.b, 0, -1), 'la gr', C3b);
    return h + K.c(...Q3b(4, 0), 4, 'fk') + K.c(...Q3b(-4, 0), 4, 'fk') + K.t(14, 20, `asíntotas: y = ±(${v.b}/4)x`, 's ta', 'start');
  };

  // Capítulo 4: x² + 4y² − 6x + 8y + 9 = 0 → (x − 3)²/4 + (y + 1)² = 1.  v { k }
  const O4 = [190, 150], U4 = 22, Q4 = en(O4, U4);
  const general = (v, K) => {
    const q = k(v);
    const lin = ['x² + 4y² − 6x + 8y + 9 = 0', '(x² − 6x) + 4(y² + 2y) = −9', '(x − 3)² − 9 + 4(y + 1)² − 4 = −9', '(x − 3)²/4 + (y + 1)²/1 = 1'];
    let h = '';
    lin.slice(0, Math.min(q, 3) + 1).forEach((s, i) => { h += K.t(14, 20 + 20 * i, s, `s ${i === Math.min(q, 3) ? 'ta' : 'tm'}`, 'start'); });
    if (q >= 3) {
      h += rej(K, O4, U4, 0, 6, -3, 1) + corta(K, elipse(Q4, 3, -1, 2, 1), 'la gr', [180, 330, 110, 224]) + K.c(...Q4(3, -1), 4, 'fk');
      h += K.t(14, 110, 'centro (3, −1)', 's', 'start') + K.t(14, 128, 'a = 2, b = 1', 's', 'start');
    }
    if (q === 4) h += K.t(14, 156, 'A·C > 0: elipse', 's tg', 'start') + K.t(14, 174, 'A = C: circunferencia', 's tg', 'start') + K.t(14, 192, 'A·C < 0: hipérbola', 's tf', 'start');
    if (q >= 5) h += K.t(14, 156, 'si queda = 0: un punto', 's to', 'start') + K.t(14, 174, 'si queda < 0: nada', 's to', 'start') + K.t(14, 192, 'hipérbola = 0: dos rectas', 's to', 'start');
    return h;
  };
  const fondo4 = K => ['2x² + 5y² − 10 = 0', '3x² − y² + 6x = 0', 'x² + 4y² − 2x + 1 = 0'].map((s, i) => K.t(14, 35 + 42 * i, s, 's', 'start')).join('');

  // Problema: arco semielíptico de 50 m de luz y 10 m de altura; a 10 m de un extremo (x = 15) la altura es 8.  v { h }
  const O5 = [170, 146], U5 = 6, Q5 = en(O5, U5);
  const puente = (v, K) => {
    let h = K.l(10, O5[1], 330, O5[1], 'lm gr') + corta(K, elipse(Q5, 0, 0, 25, 10, Math.PI), 'lg gr', [0, 340, 0, 220]);
    h += K.l(...Q5(0, 0), ...Q5(0, 10), 'lr d') + K.t(Q5(0, 10)[0] + 6, Q5(0, 10)[1] - 6, '10 m', 's tm', 'start') + K.t(Q5(-25, 0)[0], O5[1] + 18, 'luz de 50 m', 's tm', 'start');
    h += K.r(Q5(15, 0)[0] - 3, Q5(15, v.h)[1], 6, v.h * U5, 'fa', 2) + K.t(Q5(15, 0)[0], O5[1] + 18, 'a 10 m del extremo', 's tm');
    return h + K.t(14, 20, `poste de ${v.h} m`, 's ta', 'start') + K.t(14, 38, `15²/25² + ${v.h}²/10² = ${N(225 / 625 + v.h * v.h / 100)}`, 's tm', 'start');
  };

  xpLec('geo-23', [
    ['La cuerda y las dos estacas',
      xpMira('dibujo', 'Amarra una cuerda a dos estacas y tensa con un lápiz: al dar la vuelta dibujas una **elipse**. Las estacas son los **focos**.', { dib: cuerda, v: { k: 0 }, alto: 210 }, [
        ['Dos estacas a 16 pasos y una cuerda de 20 amarrada a ellas. El lápiz la mantiene tensa.', {}],
        ['Al mover el lápiz sin aflojar la cuerda, la punta dibuja una curva cerrada: la elipse.', { k: 1 }],
        ['En cualquier punto, la distancia a un foco más la distancia al otro da el largo de la cuerda.', { k: 2 }, '$d(P, F_1) + d(P, F_2) = 2a$'],
        ['En los vértices se ve: el eje mayor mide lo mismo que la cuerda, 2a = 20, así que a = 10.', { k: 3 }],
        ['En el punto más alto cada mitad mide a; con la distancia c al foco y la altura b sale un triángulo.', { k: 4 }, '$a^2 = b^2 + c^2$'],
        ['Lo que sale de un foco rebota y llega al otro. Y e = c/a dice qué tan aplastada es.', { k: 5 }, '$e = \\tfrac{c}{a},\\ 0 < e < 1$'],
      ], 'La elipse es el lugar donde $d_1 + d_2 = 2a$; sus focos cumplen $c^2 = a^2 - b^2$ y $e = c/a < 1$.'),
      xpHaz('dibujo', 'Ahora las estacas están a 15 pasos del centro y la cuerda mide 34. Desliza la altura b del punto más alto hasta que la cuerda quede justa.', {
        dib: turno1, v: { b: 3 }, metas: { b: 8 }, alto: 200, manijas: [{ k: 'b', min: 1, max: 12, paso: 1, et: 'altura b del punto más alto' }],
        lee: v => `$2\\sqrt{15^2 + ${v.b}^2} = ${N(2 * Math.hypot(15, v.b))}$`, pista: 'Cada mitad de la cuerda mide 17 y es la hipotenusa de un triángulo con un cateto de 15.' },
      '$b = \\sqrt{17^2 - 15^2} = 8$: cada tramo mide $\\sqrt{225 + 64} = 17$.')],
    ['La ecuación de la elipse',
      xpMira('dibujo', 'Con el centro y los semiejes se escribe la **ecuación ordinaria**. El denominador mayor dice hacia dónde se estira.', { dib: ecuacion, v: { k: 0 }, alto: 210 }, [
        ['Con centro en el origen: el semieje a va bajo x² y el semieje b bajo y².', {}, '$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$'],
        ['Si el centro se mueve a (h, k), x se cambia por x − h y y por y − k.', { k: 1 }, '$\\dfrac{(x - h)^2}{a^2} + \\dfrac{(y - k)^2}{b^2} = 1$'],
        ['Si el denominador mayor está bajo y, el eje mayor es vertical: a² va con y.', { k: 2 }],
        ['Los focos van sobre el eje mayor, a c del centro: c² = a² − b² = 4 − 3 = 1.', { k: 3 }],
        ['La excentricidad es c/a = 1/2. Cuanto más cerca de 0, más redonda.', { k: 4 }],
        ['La cuerda por un foco, perpendicular al eje mayor, es el lado recto: mide 2b²/a.', { k: 5 }, '$LR = \\dfrac{2b^2}{a}$'],
      ], 'Ecuación ordinaria con centro $(h, k)$; el denominador mayor es $a^2$ y marca el eje de los focos.'),
      xpHaz('fichas', 'Para la elipse (x + 2)²/16 + y²/7 = 1, halla c, la excentricidad y el lado recto.', {
        slots: [100, 210, 306].map(x => ({ x, y: 64, w: 52, h: 34 })), alto: 116, fondo: fondo2,
        fichas: ['3', '0.75', '3.5', '√23', '9', '1.33'], meta: ['3', '0.75', '3.5'], pista: 'a² = 16 y b² = 7. En la elipse c² = a² − b², y la excentricidad y el lado recto se dividen entre a.' },
      '$c = \\sqrt{16 - 7} = 3$, $e = \\tfrac{3}{4} = 0.75$ y $LR = \\tfrac{2 \\cdot 7}{4} = 3.5$.')],
    ['La hipérbola: la diferencia',
      xpMira('dibujo', 'Si en vez de sumar las distancias a los focos las **restas**, y la diferencia no cambia, sale una **hipérbola**.', { dib: hiperbola, v: { k: 0 }, alto: 210 }, [
        ['Focos a 10 del centro. Este punto P está a 20.5 de uno y a 4.5 del otro.', {}],
        ['La diferencia es 16, y es la misma para todos los puntos de la curva: 2a = 16.', { k: 1 }, '$|d(P, F_1) - d(P, F_2)| = 2a$'],
        ['Los puntos más cerca del otro foco forman otra rama. Así se ubica un barco con dos señales.', { k: 2 }],
        ['Los vértices están en ±a. Con b se arma el rectángulo auxiliar, y ahora c es el más largo.', { k: 3 }, '$c^2 = a^2 + b^2$'],
        ['Las diagonales del rectángulo son las asíntotas: la curva se les pega sin tocarlas.', { k: 4 }, '$y - k = \\pm\\tfrac{b}{a}(x - h)$'],
        ['La excentricidad pasa de 1. Si el término positivo es el de y, abre arriba y abajo.', { k: 5 }, '$\\dfrac{(y - k)^2}{a^2} - \\dfrac{(x - h)^2}{b^2} = 1$'],
      ], 'Hipérbola: $|d_1 - d_2| = 2a$, $c^2 = a^2 + b^2$, $e > 1$ y asíntotas por las diagonales del rectángulo.'),
      xpHaz('dibujo', 'Una hipérbola tiene vértices en (±4, 0). Desliza b hasta que sus asíntotas sean y = ±x/2.', {
        dib: turno3, v: { b: 5 }, metas: { b: 2 }, alto: 200, manijas: [{ k: 'b', min: 1, max: 6, paso: 1, et: 'semieje b' }],
        lee: v => `$\\tfrac{x^2}{16} - \\tfrac{y^2}{${v.b * v.b}} = 1$`, pista: 'La pendiente de las asíntotas es b/a, con a = 4: busca el b que da un medio.' },
      '$\\tfrac{b}{4} = \\tfrac{1}{2}$ da $b = 2$: es $\\tfrac{x^2}{16} - \\tfrac{y^2}{4} = 1$.')],
    ['De la ecuación general a la cónica',
      xpMira('dibujo', 'Muchas veces la ecuación llega **desarrollada**. Completando cuadrados vuelve a la forma ordinaria, y los signos de A y C ya avisan qué es.', { dib: general, v: { k: 0 }, alto: 224 }, [
        ['Una ecuación general: A = 1 acompaña a x² y C = 4 a y².', {}, '$Ax^2 + Cy^2 + Dx + Ey + F = 0$'],
        ['Se juntan las x y las y, y se saca el factor de cada cuadrado.', { k: 1 }],
        ['Se completan los cuadrados: lo que se suma dentro se compensa afuera.', { k: 2 }],
        ['Al dividir entre lo que queda a la derecha sale la forma ordinaria: una elipse.', { k: 3 }],
        ['Basta mirar los signos: A y C iguales en signo dan elipse; distintos, hipérbola.', { k: 4 }],
        ['Si al final queda cero o algo negativo, la cónica se degenera: un punto, nada o dos rectas.', { k: 5 }],
      ], 'Se completan cuadrados. A y C del mismo signo: elipse; de signos distintos: hipérbola. Hay casos degenerados.'),
      xpHaz('fichas', 'Arrastra a cada ecuación lo que representa.', {
        slots: [35, 77, 119].map(y => ({ x: 270, y, w: 110, h: 34 })), alto: 140, fondo: fondo4,
        fichas: ['elipse', 'hipérbola', 'punto', 'parábola', 'ningún punto'], meta: ['elipse', 'hipérbola', 'punto'], pista: 'Mira los signos de x² y y², y en la tercera completa cuadrados para ver qué queda al otro lado.' },
      '$2x^2 + 5y^2 = 10$ es una elipse; $3(x + 1)^2 - y^2 = 3$, una hipérbola; $(x - 1)^2 + 4y^2 = 0$, solo el punto $(1, 0)$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un puente tiene un arco de media elipse: 50 m de luz y 10 m de alto en el centro. Desliza el poste que va a 10 m de un extremo hasta que toque el arco.', {
        dib: puente, v: { h: 3 }, metas: { h: 8 }, alto: 230, manijas: [{ k: 'h', min: 0, max: 10, paso: 1, et: 'altura del poste (m)' }],
        lee: v => `$\\tfrac{15^2}{25^2} + \\tfrac{${v.h}^2}{10^2} = ${N(0.36 + v.h * v.h / 100)}$`, pista: 'Con centro en el medio, a = 25 y b = 10; a 10 m del extremo, x = 15. El punto debe cumplir la ecuación igual a 1.' },
      '$\\tfrac{15^2}{625} + \\tfrac{y^2}{100} = 1$ da $y^2 = 100(1 - 0.36) = 64$: el poste mide 8 m.')],
  ], 'La elipse suma distancias a los focos y la hipérbola las resta; los signos de A y C dicen cuál es.');
}
