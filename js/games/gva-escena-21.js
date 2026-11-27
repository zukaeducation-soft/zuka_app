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
