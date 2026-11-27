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
