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
