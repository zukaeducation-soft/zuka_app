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
