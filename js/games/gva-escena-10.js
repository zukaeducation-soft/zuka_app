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
