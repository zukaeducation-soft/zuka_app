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
