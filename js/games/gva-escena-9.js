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
