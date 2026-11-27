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
