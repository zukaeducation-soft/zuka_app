// Geometría Euclidiana · mundo 8 «euc-construcciones»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Regla y compás dibujados en SVG: el compás se abre, los arcos se trazan al comprobar y los puntos se llevan al cruce de dos lugares.
(() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−'), N1 = x => String(Math.round(x * 10) / 10);
  const d2 = (P, Q) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2, dist = (P, Q) => Math.sqrt(d2(P, Q));
  const corta = (id, alto, s) => `<defs><clipPath id="zk8${id}"><rect x="0" y="0" width="340" height="${alto}"/></clipPath></defs><g clip-path="url(#zk8${id})">${s}</g>`;
  const seg = (K, x1, y1, x2, y2, cls) => (Math.hypot(x2 - x1, y2 - y1) < 0.5 ? '' : K.l(x1, y1, x2, y2, cls));   // sin trazo, sin punto
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const grados = (u, w) => Math.acos(Math.max(-1, Math.min(1, (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))))) * 180 / Math.PI;

  // ------------------------------------------------------------------------------------------ cuadrícula de 0..14 por 0..10
  const U = 22, GX = 16, GY = 230, GH = 240, X = x => GX + x * U, Y = y => GY - y * U, PX = P => [X(P[0]), Y(P[1])];
  const rejilla = K => { let h = ''; for (let i = 0; i <= 14; i++) h += K.l(X(i), Y(0), X(i), Y(10), 'ls'); for (let j = 0; j <= 10; j++) h += K.l(X(0), Y(j), X(14), Y(j), 'ls'); return h; };
  const M2 = { k: ['x', 'y'], min: [0, 0], max: [14, 10], paso: 1, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - GX) / U, (GY - y) / U] };
  const punto = (K, P, n, cls = 'fk') => K.c(...PX(P), 4, cls) + K.t(X(P[0]) + (P[0] > 12 ? -10 : 10), Y(P[1]) + (P[1] > 8 ? 16 : -7), n, 's');
  const busca = (ok, ini) => { for (let x = 0; x <= 14; x++) for (let y = 0; y <= 10; y++) if (ok([x, y]) && !(x === ini[0] && y === ini[1])) return { x, y }; return { x: ini[0], y: ini[1] }; };

  // Un punto que cumple dos condiciones está en el cruce de dos lugares geométricos.  v { x, y }
  //   params { pts: { A: [x, y]… }, recta?: y, conds: [['d', 'A', 5, dada?] | ['r', 3] | ['eq', 'A', 'B']], ini: [x, y], circ?: 'A', txt, ok }
  const cumple = (c, P, p) => (c[0] === 'd' ? d2(P, p.pts[c[1]]) === c[2] ** 2 : c[0] === 'r' ? Math.abs(P[1] - p.recta) === c[1] : d2(P, p.pts[c[1]]) === d2(P, p.pts[c[2]]));
  const falta = (c, P, p) => (c[0] === 'd' ? `está a ${N(dist(P, p.pts[c[1]]))} de ${c[1]}, no a ${c[2]}` : c[0] === 'r' ? `está a ${Math.abs(P[1] - p.recta)} de la recta, no a ${c[1]}`
    : `está a ${N(dist(P, p.pts[c[1]]))} de ${c[1]} y a ${N(dist(P, p.pts[c[2]]))} de ${c[2]}: no equidista`);
  const lugar = nombre => XG.figura(nombre, {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [M2],
    ok: (v, p) => p.conds.every(c => cumple(c, [v.x, v.y], p)),
    sol: p => busca(P => p.conds.every(c => cumple(c, P, p)), p.ini),
    texto: p => p.txt,
    alto: () => GH, pie: 'Arrastra el punto P por la cuadrícula.',
    dib(v, K, p, f) {
      const P = [v.x, v.y], Q = PX(P);
      let h = rejilla(K), s = '';
      if (p.recta != null) h += K.l(X(0) - 8, Y(p.recta), X(14) + 8, Y(p.recta), 'gr') + K.t(X(14) - 4, Y(p.recta) + 16, 'r', 's');
      for (const c of p.conds) {
        if (c[0] === 'd') { const A = PX(p.pts[c[1]]); s += K.arc(A[0], A[1], c[2] * U, 0, 360 * (c[3] ? 1 : f), c[3] ? 'la' : 'lg d') + K.f(f * 2 - 1, K.l(...A, ...Q, 'lm')); }
        else if (c[0] === 'r') { for (const yy of [p.recta + c[1], p.recta - c[1]]) if (yy >= 0 && yy <= 10) s += seg(K, X(0), Y(yy), X(0) + 14 * U * f, Y(yy), 'lf d'); s += K.f(f * 2 - 1, K.l(Q[0], Q[1], Q[0], Y(p.recta), 'lm')); }
        else { const A = PX(p.pts[c[1]]), B = PX(p.pts[c[2]]), m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], L = Math.hypot(B[0] - A[0], B[1] - A[1]), u = [-(B[1] - A[1]) / L, (B[0] - A[0]) / L], t = 380 * f;
          s += seg(K, m[0] - u[0] * t, m[1] - u[1] * t, m[0] + u[0] * t, m[1] + u[1] * t, 'lo d') + K.f(f * 2 - 1, K.l(...A, ...Q, 'lm') + K.l(...B, ...Q, 'lm')); }
      }
      if (p.circ) s += K.arc(Q[0], Q[1], dist(P, p.pts[p.circ]) * U, 0, 360 * f, 'la');
      return corta('lug', GH, h + s) + Object.entries(p.pts).map(([n, A]) => punto(K, A, n)).join('') + K.t(Q[0] + (v.x > 12 ? -16 : 16), Q[1] + (v.y > 8 ? 22 : -12), 'P', 'ta');
    },
    lee: (v, p) => `$${p.conds.map(c => (c[0] === 'd' ? `P${c[1]} = ${N(dist([v.x, v.y], p.pts[c[1]]))}` : c[0] === 'r' ? `\\text{a la recta: } ${Math.abs(v.y - p.recta)}` : `P${c[1]} = ${N(dist([v.x, v.y], p.pts[c[1]]))},\\ P${c[2]} = ${N(dist([v.x, v.y], p.pts[c[2]]))}`)).join(' \\qquad ')}$`,
    aviso(v, p) { const P = [v.x, v.y], mal = p.conds.filter(c => !cumple(c, P, p)); return `${mal.length < p.conds.length ? 'Cumple una condición, pero ' : 'P '}${falta(mal[0], P, p)}.`; },
    bien: (v, p) => p.ok,
  });
  lugar('lugar-distancias'); lugar('lugar-equidista'); lugar('centro-tres-puntos');

  // Bisectriz: con centro en D y en E y el mismo radio, los arcos se cortan en F.  params { B, d: [dx, dy] (radio entero), ini }
  const BZ = p => { const R = Math.hypot(...p.d), D = [p.B[0] + R, p.B[1]], E = [p.B[0] + p.d[0], p.B[1] + p.d[1]]; return { R, D, E, F: [D[0] + p.d[0], D[1] + p.d[1]], g: Math.atan2(p.d[1], p.d[0]) * 180 / Math.PI }; };
  XG.figura('bisectriz-cruce', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [M2],
    ok(v, p) { const { R, D, E } = BZ(p), P = [v.x, v.y]; return d2(P, D) === R * R && d2(P, E) === R * R && !(v.x === p.B[0] && v.y === p.B[1]); },
    sol: p => ({ x: BZ(p).F[0], y: BZ(p).F[1] }),
    texto: p => `$F$ queda a $${BZ(p).R}$ de $D$ y de $E$: los triángulos $BDF$ y $BEF$ son congruentes (L-L-L)`,
    alto: () => GH, pie: 'Arrastra F hasta donde se cortan los dos arcos.',
    dib(v, K, p, f) {
      const { R, D, E, F, g } = BZ(p), B = p.B, t = Math.min((14 - B[0]) / p.d[0], (10 - B[1]) / p.d[1]), b = PX(B), dd = PX(D), e = PX(E), q = PX([v.x, v.y]), enB = v.x === B[0] && v.y === B[1];
      let s = rejilla(K) + K.l(...b, X(14), b[1], 'gr') + K.l(...b, ...PX([B[0] + p.d[0] * t, B[1] + p.d[1] * t]), 'gr') + K.arc(b[0], b[1], R * U, -6, g + 6, 'lm');
      s += K.arc(dd[0], dd[1], R * U, g - 26 * f, g + 26 * f, 'lg d') + K.arc(e[0], e[1], R * U, -26 * f, 26 * f, 'lg d');
      if (!enB && f > 0) {
        const w = [v.x - B[0], v.y - B[1]], k = 16 / Math.hypot(...w), a1 = grados([1, 0], w), a2 = grados(w, p.d);
        s += K.f(f, K.ang(b, dd, q, 34, f > 0.5 ? `${N1(a1)}°` : '', 'fa', 'ta') + K.ang(b, q, e, 46, f > 0.5 ? `${N1(a2)}°` : '', 'fg', 'tg') + K.l(...b, ...PX([B[0] + w[0] * k, B[1] + w[1] * k]), 'la'));
      }
      return corta('bis', GH, s) + K.f(f * 3 - 2, K.c(...PX(F), 5, 'fo')) + punto(K, B, 'B') + K.c(...dd, 4, 'fk') + K.t(dd[0], dd[1] + 17, 'D', 's') + K.c(...e, 4, 'fk') + K.t(e[0] - 11, e[1] - 6, 'E', 's') + K.t(q[0] + (v.x > 12 ? -16 : 16), q[1] + (v.y > 8 ? 22 : -12), 'F', 'ta');
    },
    lee(v, p) { const B = p.B, w = [v.x - B[0], v.y - B[1]]; return w[0] || w[1] ? `$\\angle DBF = ${N1(grados([1, 0], w))}^\\circ \\qquad \\angle FBE = ${N1(grados(w, p.d))}^\\circ$` : ''; },
    aviso(v, p) {
      const { R, D, E } = BZ(p), P = [v.x, v.y], a = d2(P, D) === R * R, b = d2(P, E) === R * R;
      return a && b ? 'Ese cruce es el mismo vértice B: los arcos se cortan en otro punto más.' : a ? `Está a ${R} de D, pero a ${N(dist(P, E))} de E: falta el arco de E.` : b ? `Está a ${R} de E, pero a ${N(dist(P, D))} de D: falta el arco de D.` : `Está a ${N(dist(P, D))} de D y a ${N(dist(P, E))} de E: debe quedar a ${R} de los dos.`;
    },
    bien: () => 'BD = BE y DF = EF, con BF común: dos triángulos congruentes por L-L-L.',
  });

  // Circunferencia inscrita: el centro equidista de los tres lados.  params { Q: [x, y] (ángulo recto), a, b, ini }
  const IN = (v, p) => { const dx = v.x - p.Q[0], dy = v.y - p.Q[1], c = Math.hypot(p.a, p.b), k = p.a * p.b - p.b * dx - p.a * dy; return { dx, dy, c, k, d3: k / c, dentro: dx > 0 && dy > 0 && k > 0 }; };
  XG.figura('centro-inscrita', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [M2],
    ok(v, p) { const q = IN(v, p); return q.dentro && q.dx === q.dy && q.c * q.dx === q.k; },
    sol(p) { const r = p.a * p.b / (p.a + p.b + Math.hypot(p.a, p.b)); return { x: p.Q[0] + r, y: p.Q[1] + r }; },
    texto(p) { const r = p.a * p.b / (p.a + p.b + Math.hypot(p.a, p.b)); return `el incentro: a $${r}$ de cada uno de los tres lados`; },
    alto: () => GH, pie: 'Arrastra el punto I dentro del triángulo.',
    dib(v, K, p, f) {
      const q = IN(v, p), Q = p.Q, T = [Q, [Q[0] + p.a, Q[1]], [Q[0], Q[1] + p.b]].map(PX), I = PX([v.x, v.y]);
      let s = rejilla(K) + K.p(T, 'fn') + K.pl([...T, T[0]], 'gr');
      if (q.dentro) {
        const H = PX([v.x + q.d3 * p.b / q.c, v.y + q.d3 * p.a / q.c]), r = Math.min(q.dx, q.dy, q.d3), ver = f > 0.5;
        s += K.l(...I, I[0], Y(Q[1]), 'lm d') + K.l(...I, X(Q[0]), I[1], 'lm d') + K.l(...I, ...H, 'lm d') + K.arc(I[0], I[1], r * U, 90, 90 + 360 * f, r === q.d3 && q.dx === q.dy ? 'lo' : 'lf')
          + (ver ? K.t(I[0] + 5, (I[1] + Y(Q[1])) / 2 + 5, N(q.dy), 's tf', 'start') + K.t((I[0] + X(Q[0])) / 2, I[1] - 5, N(q.dx), 's tf') + K.t((I[0] + H[0]) / 2 + 9, (I[1] + H[1]) / 2 + 12, N(q.d3), 's tf') : '');
      }
      return corta('ins', GH, s) + K.t(I[0] + 15, I[1] - 13, 'I', 'ta') + K.t((T[0][0] + T[1][0]) / 2, T[0][1] + 16, p.a, 's tm') + K.t(T[0][0] - 10, (T[0][1] + T[2][1]) / 2, p.b, 's tm') + K.f(f, K.t((T[1][0] + T[2][0]) / 2 + 12, (T[1][1] + T[2][1]) / 2 - 6, q.c, 's tm'));
    },
    lee(v, p) { const q = IN(v, p); return q.dentro ? `$\\text{a los lados: } ${N(q.dy)},\\ ${N(q.dx)} \\text{ y } ${N(q.d3)}$` : ''; },
    aviso(v, p) { const q = IN(v, p); return !q.dentro ? 'Quedó fuera del triángulo o sobre un lado: el centro de la inscrita va adentro.' : q.dx === q.dy ? `Está a ${q.dx} de los dos catetos, pero a ${N(q.d3)} de la hipotenusa.` : `Está a ${N(q.dy)}, ${N(q.dx)} y ${N(q.d3)} de los lados: debe quedar a lo mismo de los tres.`; },
    bien: v => 'Equidista de los tres lados: ahí se cortan las bisectrices, en el incentro.',
  });

  // Triángulo con tres lados: C va al cruce del arco de centro A y el de centro B.  params { A, ab, ac, bc, ini }   (cuadrícula 0..14 por 1..12)
  const TU = 20, TX = x => 30 + x * TU, TY = y => 262 - y * TU;
  const TS = p => { for (let y = 1; y <= 12; y++) for (let x = 0; x <= 14; x++) if (d2([x, y], [p.A, 0]) === p.ac ** 2 && d2([x, y], [p.A + p.ab, 0]) === p.bc ** 2) return { x, y }; return { x: p.ini[0], y: p.ini[1] }; };
  XG.figura('triangulo-tres-lados', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 1], max: [14, 12], paso: 1, en: v => [TX(v.x), TY(v.y)], de: (x, y) => [(x - 30) / TU, (262 - y) / TU] }],
    ok: (v, p) => d2([v.x, v.y], [p.A, 0]) === p.ac ** 2 && d2([v.x, v.y], [p.A + p.ab, 0]) === p.bc ** 2,
    sol: TS,
    texto(p) { const s = TS(p); return `$C$ queda ${s.x - p.A} a la derecha de $A$ y ${s.y} arriba: a $${p.ac}$ de $A$ y a $${p.bc}$ de $B$`; },
    alto: () => 280, pie: 'Arrastra el vértice C por la cuadrícula.',
    dib(v, K, p, f) {
      const A = [TX(p.A), 262], B = [TX(p.A + p.ab), 262], C = [TX(v.x), TY(v.y)], S = TS(p), gA = Math.atan2(S.y, S.x - p.A) * 180 / Math.PI, gB = Math.atan2(S.y, S.x - p.A - p.ab) * 180 / Math.PI, ver = f > 0.5;
      let s = '';
      for (let i = 0; i <= 14; i++) s += K.l(TX(i), TY(0), TX(i), TY(12), 'ls');
      for (let j = 0; j <= 12; j++) s += K.l(TX(0), TY(j), TX(14), TY(j), 'ls');
      s += K.arc(A[0], A[1], p.ac * TU, gA - 14 * f, gA + 14 * f, 'lg d') + K.arc(B[0], B[1], p.bc * TU, gB - 14 * f, gB + 14 * f, 'lf d') + K.pl([A, C, B], 'la') + K.l(...A, ...B, 'gr');
      return corta('tri', 280, s) + K.f(f * 3 - 2, K.c(TX(S.x), TY(S.y), 5, 'fo')) + K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + K.t(A[0] - 12, A[1] + 5, 'A', 's') + K.t(B[0] + 12, B[1] + 5, 'B', 's') + K.t((A[0] + B[0]) / 2, 277, p.ab, 's tm')
        + K.t(C[0] + (v.x > 12 ? -16 : 16), C[1] + (v.y > 10 ? 20 : -10), 'C', 'ta') + K.t((A[0] + C[0]) / 2 - 12, (A[1] + C[1]) / 2, ver ? N(dist([v.x, v.y], [p.A, 0])) : '?', 's tg', 'end') + K.t((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2, ver ? N(dist([v.x, v.y], [p.A + p.ab, 0])) : '?', 's tf', 'start');
    },
    lee: (v, p) => `$AC = ${N(dist([v.x, v.y], [p.A, 0]))} \\qquad BC = ${N(dist([v.x, v.y], [p.A + p.ab, 0]))}$`,
    aviso(v, p) {
      const a = d2([v.x, v.y], [p.A, 0]), b = d2([v.x, v.y], [p.A + p.ab, 0]);
      return a === p.bc ** 2 && b === p.ac ** 2 ? `Quedaron al revés: AC mide ${p.bc} y BC mide ${p.ac}.` : a === p.ac ** 2 ? `AC sí mide ${p.ac}, pero BC mide ${N(Math.sqrt(b))}: falta el arco de centro B.` : b === p.bc ** 2 ? `BC sí mide ${p.bc}, pero AC mide ${N(Math.sqrt(a))}: falta el arco de centro A.` : `AC mide ${N(Math.sqrt(a))} y BC mide ${N(Math.sqrt(b))}: C va en el cruce de los dos arcos.`;
    },
    bien: (v, p) => `C está a ${p.ac} de A y a ${p.bc} de B: el cruce de los dos arcos.`,
  });

  // ------------------------------------------------------------------------------------------------- el compás se abre
  // Mediatriz: dos arcos del mismo radio desde A y B deben cortarse a la altura pedida.  params { L (par), h }   v { r }
  const cmA = p => 170 - p.L * 10, CY = 128;
  XG.figura('compas-mediatriz', {
    ini: () => ({ r: 2 }),
    manijas: p => [{ k: 'r', min: 1, max: 11, paso: 1, rot: v => `${Math.round(v.r)}`, en: v => [cmA(p) + v.r * 20, CY], de: x => (x - cmA(p)) / 20 }],
    ok: (v, p) => v.r * v.r === (p.L / 2) ** 2 + p.h ** 2,
    sol: p => ({ r: Math.hypot(p.L / 2, p.h) }),
    texto: p => `$\\sqrt{${p.L / 2}^2 + ${p.h}^2} = ${Math.hypot(p.L / 2, p.h)}$`,
    alto: () => 256, pie: 'Arrastra la punta del compás para abrirlo.',
    dib(v, K, p, f) {
      const ax = cmA(p), bx = ax + p.L * 20, r = v.r, px = ax + r * 20, hx = (ax + px) / 2, hy = CY - Math.sqrt(118 * 118 - 100 * r * r), hh = 4 * r * r > p.L * p.L ? Math.sqrt(r * r - p.L * p.L / 4) : 0, bien = r * r === (p.L / 2) ** 2 + p.h ** 2;
      const cruz = (y, n) => K.l(164, y - 6, 176, y + 6, 'lf') + K.l(164, y + 6, 176, y - 6, 'lf') + K.t(152, y + 5, n, 's tf');
      let s = K.l(170, CY - p.h * 20, 170, CY + p.h * 20, 'lm d') + cruz(CY - p.h * 20, 'M') + cruz(CY + p.h * 20, 'N') + K.t(180, CY - p.h * 10 + 4, p.h, 's tm', 'start') + K.t(180, CY + p.h * 10 + 4, p.h, 's tm', 'start');
      s += K.arc(ax, CY, r * 20, 80 * f, -80 * f, 'la') + K.arc(bx, CY, r * 20, 180 - 80 * f, 180 + 80 * f, 'la');
      if (hh) s += K.f(f * 4 - 3, K.c(170, CY - hh * 20, 5, bien ? 'fo' : 'ff') + K.c(170, CY + hh * 20, 5, bien ? 'fo' : 'ff'));
      else if (2 * r === p.L) s += K.f(f * 4 - 3, K.c(170, CY, 5, 'ff'));
      return corta('med', 256, s) + K.l(ax, CY, bx, CY, 'gr') + K.c(ax, CY, 4, 'fk') + K.c(bx, CY, 4, 'fk') + K.t(ax - 2, CY + 20, 'A', 's') + K.t(bx + 2, CY + 20, 'B', 's') + K.t(8, 18, `AB = ${p.L}`, 'tm', 'start')
        + K.l(ax, CY, hx, hy, 'lm gr') + K.l(hx, hy, px, CY, 'lm gr') + K.c(hx, hy, 5, 'fk');
    },
    lee(v, p) { const m = p.L / 2, q = v.r * v.r - m * m; return q > 0 ? `$\\sqrt{${v.r}^2 - ${m}^2} ${Number.isInteger(Math.sqrt(q)) ? '=' : '\\approx'} ${N(Math.sqrt(q))}$` : `$${v.r} ${q ? '<' : '='} ${m}$`; },
    aviso(v, p) {
      const m = p.L / 2, r = v.r;
      return r < m ? `Con radio ${r} los arcos no se alcanzan: la mitad de AB es ${m}.` : r === m ? 'Los arcos apenas se tocan en el punto medio: con un solo punto no sale la recta.' : r === p.h ? `El radio no es la altura: es la hipotenusa del triángulo de catetos ${m} y ${p.h}.` : r === m + p.h ? `Sumaste ${m} y ${p.h}: el radio va en diagonal, es una hipotenusa.` : r * r > m * m + p.h * p.h ? `Se cortan más lejos del segmento: a ${N(Math.sqrt(r * r - m * m))}.` : `Se cortan más cerca del segmento: a ${N(Math.sqrt(r * r - m * m))}.`;
    },
    bien: (v, p) => `Catetos ${p.L / 2} y ${p.h}: el radio es la hipotenusa, ${v.r}. M y N equidistan de A y B.`,
  });

  // ¿Con qué radios NO se cortan los arcos en dos puntos?  params { L (par), radios }
  XG.marca('radios-sin-cruce', {
    sitios: p => p.radios.map((_, i) => ({ x: 170 + (i - (p.radios.length - 1) / 2) * 64, y: 118, w: 56, h: 56 })),
    cara: (K, p, i) => { const x = 170 + (i - (p.radios.length - 1) / 2) * 64; return K.t(x, 108, 'radio', 's tm') + K.t(x, 134, p.radios[i], 'b'); },
    alto: () => 152, nombre: (p, i) => `radio ${p.radios[i]}`,
    fondo(K, p) { const u = Math.min(20, 270 / p.L), a = 170 - p.L * u / 2, b = 170 + p.L * u / 2; return K.l(a, 36, b, 36, 'gr') + K.c(a, 36, 4, 'fk') + K.c(b, 36, 4, 'fk') + K.t(a, 22, 'A', 's') + K.t(b, 22, 'B', 's') + K.l(170, 30, 170, 42, 'lm') + K.t(170, 62, `AB = ${p.L}`, 'tm'); },
    sol: p => p.radios.map((_, i) => i).filter(i => 2 * p.radios[i] <= p.L),
    aviso(on, p) {
      const m = p.L / 2, i = on.findIndex((x, k) => x && p.radios[k] > m);
      if (i >= 0) return `Con radio ${p.radios[i]} sí sirve: pasa de ${m}, la mitad de AB, y los arcos se cortan en dos puntos.`;
      return on.some((x, k) => !x && p.radios[k] === m) ? `Con radio ${m} los arcos solo se tocan en el punto medio: un punto no basta para trazar la recta.` : `Falta alguno: un radio menor que ${m} no deja que los arcos se alcancen.`;
    },
    bien: p => `Sirven los radios mayores que ${p.L / 2}, la mitad de AB: los demás no dan dos cruces.`,
    texto: p => `no sirven ${p.radios.filter(r => 2 * r <= p.L).join(', ')}: no pasan de $${p.L / 2}$, la mitad de $AB$`, pie: 'Toca los radios que no sirven.',
  });

  // Por qué funciona: la razón de cada paso.  params { et, metas, fichas, mira, trampas?, ok }
  XG.renglones('razon-del-paso', { w: 124, x: 270, y0: 156, fondo(K) {
    const A = [100, 70], B = [240, 70], M = [170, 18], Nn = [170, 122];
    return K.arc(A[0], A[1], 87.2, 24, 48, 'lm') + K.arc(B[0], B[1], 87.2, 132, 156, 'lm') + K.arc(A[0], A[1], 87.2, -24, -48, 'lm') + K.arc(B[0], B[1], 87.2, 204, 228, 'lm')
      + K.pl([A, M, B, Nn, A], 'lg') + K.l(...M, ...Nn, 'la') + K.l(...A, ...B, 'gr') + [[A, 'A', -12, 5], [B, 'B', 12, 5], [M, 'M', 14, 2], [Nn, 'N', 14, 8]].map(([P, n, dx, dy]) => K.c(...P, 4, 'fk') + K.t(P[0] + dx, P[1] + dy, n, 's')).join('');
  } });

  // Los pasos de una construcción, en orden; al comprobar, la construcción se traza sola.  params { fig, metas, fichas, mira, trampas?, ok }
  const corte = (C1, r1, C2, r2, lado) => { const d = Math.hypot(C2[0] - C1[0], C2[1] - C1[1]), a = (d * d + r1 * r1 - r2 * r2) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a)), ux = (C2[0] - C1[0]) / d, uy = (C2[1] - C1[1]) / d; return [C1[0] + a * ux - lado * h * uy, C1[1] + a * uy + lado * h * ux]; };
  const hacia = (C, P) => Math.atan2(C[1] - P[1], P[0] - C[0]) * 180 / Math.PI;
  const tramo = (f, k, n) => Math.max(0, Math.min(1, f * n - k));
  const FIG = {
    bisectriz(K, f) {
      const B = [16, 152], D = [76, 152], E = K.at(...B, 60, 50), F = corte(D, 52, E, 52, 1), g = hacia(B, F), t = k => tramo(f, k, 4);
      return K.l(...B, 146, 152, 'gr') + K.l(...B, ...K.at(...B, 132, 50), 'gr') + K.t(10, 170, 'B', 's')
        + K.arc(B[0], B[1], 60, -8, -8 + 66 * t(0), 'lg') + K.f(t(0) * 3 - 2, K.t(D[0], D[1] + 17, 'D', 's') + K.t(E[0] - 11, E[1] - 5, 'E', 's'))
        + K.arc(D[0], D[1], 52, hacia(D, F) - 18 * t(1), hacia(D, F) + 18 * t(1), 'lf') + K.arc(E[0], E[1], 52, hacia(E, F) - 18 * t(1), hacia(E, F) + 18 * t(1), 'lf')
        + K.f(t(2), K.c(...F, 4, 'fo') + K.t(F[0] + 12, F[1] + 14, 'F', 's')) + seg(K, ...B, ...K.at(...B, 136 * t(3), g), 'la gr');
    },
    circun(K, f) {
      const A = [30, 142], B = [124, 142], C = [96, 48], t = k => tramo(f, k, 4);
      const mb = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], L = Math.hypot(C[0] - B[0], C[1] - B[1]), u = [-(C[1] - B[1]) / L, (C[0] - B[0]) / L];
      const O = [77, mb[1] + (77 - mb[0]) / u[0] * u[1]], rad = Math.hypot(O[0] - A[0], O[1] - A[1]), ini = [mb[0] + u[0] * 34, mb[1] + u[1] * 34];
      return K.p([A, B, C], 'fn') + [[A, 'A', -10, 14], [B, 'B', 10, 14], [C, 'C', 10, -6]].map(([P, n, dx, dy]) => K.c(...P, 4, 'fk') + K.t(P[0] + dx, P[1] + dy, n, 's')).join('')
        + seg(K, 77, 168, 77, 168 - 132 * t(0), 'lf d') + seg(K, ...ini, ini[0] - u[0] * 86 * t(0), ini[1] - u[1] * 86 * t(0), 'lf d')
        + K.f(t(1), K.c(...O, 4, 'fo') + K.t(O[0] - 12, O[1] + 4, 'O', 's')) + seg(K, ...O, O[0] + (A[0] - O[0]) * t(2), O[1] + (A[1] - O[1]) * t(2), 'lm gr') + K.arc(O[0], O[1], rad, hacia(O, A), hacia(O, A) - 360 * t(3), 'la');
    },
    perp(K, f) {
      const P = [78, 46], R = [78 - Math.sqrt(84 * 84 - 72 * 72), 118], S = [78 + Math.sqrt(84 * 84 - 72 * 72), 118], M = corte(R, 68, S, 68, 1), t = k => tramo(f, k, 4);
      return K.l(6, 118, 150, 118, 'gr') + K.c(...P, 4, 'fk') + K.t(P[0] + 12, P[1] - 4, 'P', 's')
        + K.arc(P[0], P[1], 84, 270 - 44 * t(0), 270 + 44 * t(0), 'lg') + K.f(t(0) * 3 - 2, K.t(R[0] - 4, R[1] - 8, 'R', 's') + K.t(S[0] + 4, S[1] - 8, 'S', 's'))
        + K.arc(R[0], R[1], 68, hacia(R, M) - 16 * t(1), hacia(R, M) + 16 * t(1), 'lf') + K.arc(S[0], S[1], 68, hacia(S, M) - 16 * t(1), hacia(S, M) + 16 * t(1), 'lf')
        + K.f(t(2), K.c(...M, 4, 'fo') + K.t(M[0] + 12, M[1] + 5, 'M', 's')) + seg(K, ...P, P[0], P[1] + (M[1] + 12 - P[1]) * t(3), 'la gr');
    },
  };
  XG.rotula('pasos-construccion', {
    slots: p => p.metas.map((_, i) => ({ x: 254, y: 28 + i * 44, w: 164, h: 38 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' → '), alto: () => 192,
    fondo: (K, p, f) => FIG[p.fig](K, f) + p.metas.map((_, i) => K.t(160, 33 + i * 44, `${i + 1}.º`, 's tm')).join(''), aviso: avisa, bien: p => p.ok,
  });

  // Dividir un segmento en partes iguales: marcas iguales en una semirrecta auxiliar y paralelas.  params { L, n, k }   v { x }
  const DT = p => { const ax = 170 - p.L * 11, s = Math.min(34, 168 / p.n); return { ax, bx: ax + p.L * 22, m: j => [ax + j * s * 0.79, 176 - j * s * 0.61] }; };
  XG.figura('divide-tales', {
    ini: () => ({ x: 1 }),
    manijas: p => [{ k: 'x', min: 0.5, max: p.L - 0.5, paso: 0.5, rot: v => N1(v.x), en: v => [DT(p).ax + v.x * 22, 176], de: x => (x - DT(p).ax) / 22 }],
    ok: (v, p) => v.x * p.n === p.k * p.L,
    sol: p => ({ x: p.k * p.L / p.n }),
    texto: p => `$\\tfrac{${p.k}}{${p.n}} \\cdot ${p.L} = ${N(p.k * p.L / p.n)}$`,
    alto: () => 204, pie: 'Arrastra el punto X sobre el segmento AB.',
    dib(v, K, p, f) {
      const { ax, bx, m } = DT(p), fin = m(p.n + 0.6);
      let s = K.l(ax, 176, ...fin, 'lm') + K.l(...m(p.n), bx, 176, 'lg') + K.l(ax, 176, bx, 176, 'gr') + K.t(ax - 12, 181, 'A', 's') + K.t(bx + 12, 181, 'B', 's') + K.t(332, 18, `AB = ${p.L}`, 'tm', 'end');
      for (let j = 1; j <= p.n; j++) {
        const q = m(j), pie = [ax + j * p.L / p.n * 22, 176];
        s += K.c(...q, 3.5, j === p.k ? 'fA' : 'fk') + K.t(q[0] - 9, q[1] - 7, j, j === p.k ? 's ta' : 's tm');
        if (j < p.n) s += seg(K, ...q, q[0] + (pie[0] - q[0]) * f, q[1] + (pie[1] - q[1]) * f, j === p.k ? 'lo gr' : 'lg d') + K.f(f * 3 - 2, K.c(...pie, 3.5, j === p.k ? 'fo' : 'fk'));
      }
      return s;
    },
    lee: (v, p) => `$AX = ${N(v.x)} \\qquad \\tfrac{${p.k}}{${p.n}} \\text{ de } ${p.L} = ${N(p.k * p.L / p.n)}$`,
    aviso: (v, p) => (v.x === p.k && p.L !== p.n ? `La marca ${p.k} no cae a ${p.k} de A: cada parte de AB mide ${N(p.L / p.n)}, no 1.` : v.x * p.n === p.L && p.k > 1 ? `Esa es una sola parte: la marca ${p.k} deja ${p.k} partes.` : v.x * p.n > p.k * p.L ? `Se pasó de la paralela que sale de la marca ${p.k}.` : `No llega a la paralela que sale de la marca ${p.k}.`),
    bien: (v, p) => `Las paralelas parten AB en ${p.n} partes iguales de ${N(p.L / p.n)} cada una.`,
  });

  // -------------------------------------------------------------------------------------------------- en movimiento
  // El compás traza desde A y desde B dos arcos con el radio que se le da.  tiro { q, L, h?, r, c, e? }
  XG.tiros('lanza-compas', {
    perilla: () => ({ et: 'Radio', min: 0, max: 15, cara: v => v, lee: v => `radio ${v}` }),
    meta: t => t.r, alto: 180, ms: 1500,
    dib(t, v, K, p, f) {
      const ax = 170 - 4 * t.L, bx = 170 + 4 * t.L, y = 152;
      let h = K.l(ax, y, bx, y, 'gr') + K.c(ax, y, 4, 'fk') + K.c(bx, y, 4, 'fk') + K.t(ax - 10, y + 18, 'A', 's') + K.t(bx + 10, y + 18, 'B', 's') + K.t(170, y + 20, `AB = ${t.L}`, 's tm');
      if (t.h) h += K.l(152, y - t.h * 8, 188, y - t.h * 8, 'lf d') + K.t(194, y - t.h * 8 + 4, `a ${t.h}`, 's tf', 'start');
      if (v != null && v > 0) {
        const R = v * 8, a = 100 * Math.min(1, f * 1.4), q = v * v - t.L * t.L / 4;
        h += K.arc(ax, y, R, 0, a, 'la') + K.arc(bx, y, R, 180, 180 - a, 'la');
        if (q > 0) h += K.f(f * 4 - 3, (v === t.r ? K.l(170, y, 170, y - Math.sqrt(q) * 8, 'lo d') : '') + K.c(170, y - Math.sqrt(q) * 8, 5, v === t.r ? 'fo' : 'ff'));
        else if (q === 0) h += K.f(f * 4 - 3, K.c(170, y, 5, 'ff'));
      }
      return h;
    },
    falla: (t, v) => t.e?.[v] || (2 * v < t.L ? 'Los arcos no se alcanzan: el radio no llega a la mitad de AB.' : 2 * v === t.L ? 'Los arcos apenas se tocan en el punto medio: no hay dos cruces.' : v > t.r ? (t.h ? 'Se cruzan más lejos del segmento de lo pedido.' : 'Sirve, pero hay un radio entero menor que también corta.') : 'Se cruzan más cerca del segmento de lo pedido.'),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira el radio y suelta: el compás traza los dos arcos.',
  });

  // ¿Cuántos puntos cumplen las dos condiciones?  tiro { q, k: 'cp', a, R, d, r, c } (a R de A y a d de la recta; A está a `a` de ella)
  //   o { q, k: 'cc', D, r1, r2, r, c } (a r1 de A y a r2 de B, con AB = D)
  const cruces = t => {
    if (t.k === 'cc') { const x = (t.D * t.D + t.r1 * t.r1 - t.r2 * t.r2) / (2 * t.D), q = t.r1 * t.r1 - x * x; return q < 0 ? [] : q === 0 ? [[x, 0]] : [[x, Math.sqrt(q)], [x, -Math.sqrt(q)]]; }
    return [t.d, -t.d].flatMap(s => { const q = t.R * t.R - (s - t.a) ** 2; return q < 0 ? [] : q === 0 ? [[0, s]] : [[Math.sqrt(q), s], [-Math.sqrt(q), s]]; });
  };
  XG.tiros('cuenta-cruces', {
    perilla: () => ({ et: 'Puntos', min: 0, max: 4, cara: v => v, lee: v => `${v} ${v === 1 ? 'punto' : 'puntos'}` }),
    meta: t => cruces(t).length, alto: 200, ms: 1700,
    dib(t, v, K, p, f) {
      const u = 9, g = v == null ? 0 : Math.min(1, f * 1.4), pts = cruces(t), n = pts.length;
      let h = '', P = [];
      if (t.k === 'cc') {
        const A = [170 - t.D * u / 2, 100], B = [170 + t.D * u / 2, 100];
        h += K.l(...A, ...B, 'lm') + K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + K.t(A[0], A[1] + 19, 'A', 's') + K.t(B[0], B[1] + 19, 'B', 's') + K.t(170, 94, t.D, 's tm')
          + K.arc(A[0], A[1], t.r1 * u, 0, 360 * g, 'lg') + K.arc(B[0], B[1], t.r2 * u, 180, 180 + 360 * g, 'lf') + K.t(8, 16, `a ${t.r1} de A`, 's tg', 'start') + K.t(332, 16, `a ${t.r2} de B`, 's tf', 'end');
        P = pts.map(([x, y]) => [A[0] + x * u, 100 - y * u]);
      } else {
        const yr = 122, A = [170, yr - t.a * u];
        h += K.l(10, yr, 330, yr, 'gr') + K.t(326, yr + 15, 'r', 's', 'end') + K.c(...A, 4, 'fk') + K.t(A[0] + 11, A[1] - 6, 'A', 's') + K.l(A[0], A[1], A[0], yr, 'lm d') + K.t(A[0] - 7, (A[1] + yr) / 2 + 4, t.a, 's tm', 'end')
          + K.arc(A[0], A[1], t.R * u, 90, 90 + 360 * g, 'lg') + K.l(10, yr - t.d * u, 10 + 320 * g, yr - t.d * u, 'lf d') + K.l(10, yr + t.d * u, 10 + 320 * g, yr + t.d * u, 'lf d') + K.t(8, 16, `a ${t.R} de A`, 's tg', 'start') + K.t(332, 16, `a ${t.d} de r`, 's tf', 'end');
        P = pts.map(([x, s]) => [170 + x * u, yr - s * u]);
      }
      if (v != null) h += K.f(f * 4 - 3, P.map(q => K.c(...q, 5, v === n ? 'fo' : 'ff')).join('') + K.t(170, 194, `${n} ${n === 1 ? 'cruce' : 'cruces'}`, v === n ? 'to' : 'tf'));
      return h;
    },
    falla: (t, v) => t.e?.[v] || (v > cruces(t).length ? 'Hay menos cruces: alguna de las líneas no se alcanza o apenas se toca.' : 'Hay más cruces: cada par de líneas puede cortarse hasta en dos puntos.'),
    cuenta: t => `$${t.c}$`, pie: 'Estira hasta el número de puntos y suelta: se trazan los lugares.',
  });

  // Datos que determinan (o no) un solo triángulo.
  XG.frases('datos-determinan');
})();
