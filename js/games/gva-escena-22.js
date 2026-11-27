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
