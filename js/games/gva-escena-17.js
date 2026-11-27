// Geometría Vectorial · juegos de la lección geo-17 «Producto vectorial» (spec 2026-11-27-curso-geometria-vectorial).
// u × v es la flecha perpendicular a u y a v (regla de la mano derecha) que mide el área de su paralelogramo; se calcula con el
// determinante de î, ĵ, k̂, cambia de signo al cambiar el orden y da 0 con paralelos. El triple producto u · (v × w) es el volumen
// con signo de la caja inclinada. Las rectas y planos son de geo-18. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y
// logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 1000) / 1000);
  const tupla = a => `(${a.map(sg).join(', ')})`;
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const nor = a => Math.sqrt(dot(a, a));
  const suma = (...vs) => [0, 1, 2].map(i => vs.reduce((s, v) => s + v[i], 0));
  const por = (k, a) => a.map(x => x * k);
  const at = (o, r, g) => [o[0] + r * Math.cos(g * R), o[1] - r * Math.sin(g * R)];
  const ejes = (K, o, u, L = 4, Ln = 2) => {
    const I = (x, y, z) => K.iso(o, u, x, y, z);
    let h = '';
    [[[L, 0, 0], [-Ln, 0, 0], 'x'], [[0, L, 0], [0, -Ln, 0], 'y'], [[0, 0, L], [0, 0, -Ln], 'z']].forEach(([a, b, s]) => {
      const A = I(...a), B = I(...b);
      h += K.l(o[0], o[1], B[0], B[1], 'lm d') + K.ar(o[0], o[1], A[0], A[1], 'lm') + K.t(A[0] + (s === 'y' ? -8 : 8), A[1] + (s === 'z' ? -4 : 4), s, 's tm', s === 'y' ? 'end' : 'start');
    });
    return h;
  };
  // Curva de la mano derecha: de la dirección de a a la de b, a radio r (en unidades), con su punta de flecha.
  const curva = (K, I, a, b, r, cls) => {
    const ua = por(1 / nor(a), a), ub = por(1 / nor(b), b), pts = [];
    for (let k = 0; k <= 12; k++) { const t = k / 12, q = suma(por(1 - t, ua), por(t, ub)); pts.push(I(...por(r / nor(q), q))); }
    return K.pl(pts.slice(0, -1), cls) + K.ar(...pts.at(-3), ...pts.at(-1), cls);
  };

  // ------------------------------------------------------------ la regla de la mano derecha con vectores de la base
  // u y v van por los ejes; se eligen la dirección (seis sentidos de los ejes) y el tamaño de u × v.  v { d, m }
  //   params { u, v, d0, m0, opuesto, tamano: { m: aviso }, ok }
  const DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const DL = ['+x', '−x', '+y', '−y', '+z', '−z'];
  const BX = ['\\hat\\imath', '-\\hat\\imath', '\\hat\\jmath', '-\\hat\\jmath', '\\hat k', '-\\hat k'];
  const eje = a => a.findIndex(x => x !== 0);
  const solPD = p => { const c = cruz(p.u, p.v), m = nor(c); return { d: DIRS.findIndex(e => e.every((x, i) => x * m === c[i])), m }; };
  const OPD = [150, 100], UPD = 12;
  XG.figura('pvec-pulgar-derecho', {
    ini: p => ({ d: p.d0, m: p.m0 }),
    manijas: () => [{ k: 'd', min: 0, max: 5, paso: 1, et: 'dirección de u × v', rot: v => DL[v.d] }, { k: 'm', min: 0, max: 9, paso: 1, et: 'tamaño de u × v' }],
    ok: (v, p) => { const s = solPD(p); return v.d === s.d && v.m === s.m; },
    sol: solPD,
    texto: p => { const s = solPD(p), b = BX[s.d]; return `$\\vec u \\times \\vec v = ${b[0] === '-' ? '-' : ''}${s.m}${b.replace('-', '')}$`; },
    alto: () => 300, pie: 'Mueve las dos reglas.',
    dib(v, K, p, f) {
      const I = (...q) => K.iso(OPD, UPD, ...q), U = I(...p.u), V = I(...p.v), s = solPD(p), c = cruz(p.u, p.v), ok = v.d === s.d && v.m === s.m;
      let h = ejes(K, OPD, UPD, 7, 5) + K.ar(...OPD, ...U, 'lg gr') + K.ar(...OPD, ...V, 'lf gr') + K.c(...OPD, 3.5, 'fk');
      h += K.t(U[0] - 8, U[1] + 4, 'u', 's tg', 'end') + K.t(V[0] + 4, V[1] + 16, 'v', 's tf', 'start');
      h += K.t(8, 18, `u = ${tupla(p.u)}`, 's tg', 'start') + K.t(8, 36, `v = ${tupla(p.v)}`, 's tf', 'start');
      if (v.m > 0) { const W = I(...por(v.m, DIRS[v.d])); h += K.ar(...OPD, ...W, 'la gr') + K.t(W[0] + 8, W[1] - 4, 'tu flecha', 's ta', 'start'); }
      if (f > 0) {
        h += K.f(f, curva(K, I, p.u, p.v, 2.6, 'lo'));
        const T = I(...por(Math.min(1, f * 1.3), c));
        h += K.f(f * 2 - 0.6, K.ar(...OPD, ...T, 'lo gr d'));
        h += K.f(f * 3 - 2, K.t(332, 18, `u × v = ${tupla(c)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `Tu flecha: $${v.m}$ hacia ${DL[v.d]}; $\\|\\vec u\\|\\,\\|\\vec v\\| \\sin 90^{\\circ} = ${solPD(p).m}$`,
    aviso(v, p) {
      const s = solPD(p), a = Math.floor(v.d / 2);
      if (a === eje(p.u) || a === eje(p.v)) return 'u × v es perpendicular a u y a v a la vez: no puede ir por el eje de u ni por el de v.';
      if (v.d !== s.d) return p.opuesto;
      return p.tamano?.[v.m] || `El sentido es bueno, pero el tamaño es ‖u‖‖v‖ sen 90° = ${s.m}.`;
    },
    bien: (v, p) => p.ok,
  });

  // -------------------------------------------------------------- el tamaño es un área: ‖u × v‖ = ‖u‖‖v‖ sen θ
  // u queda quieto; se abre v (manija en el arco) hasta que el paralelogramo tenga el área pedida.  v { g }
  //   params { a, b, area, areaTx, areaPl, th, ini, trampas: { grados: aviso }, ok }
  const OA = [112, 178], SA = 28;
  const areaA = (p, g) => p.a * p.b * Math.sin(g * R);
  XG.figura('pvec-abre-paralelogramo', {
    ini: p => ({ g: p.ini }),
    manijas: p => [{ k: 'g', min: 0, max: 180, paso: 15, rot: () => 'v', en: v => at(OA, p.b * SA, v.g),
      de: (x, y) => { const g = Math.atan2(OA[1] - y, x - OA[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
    ok: (v, p) => Math.abs(areaA(p, v.g) - p.area) < 1e-6,
    sol: p => ({ g: p.th }),
    texto: p => `$${p.a} \\cdot ${p.b} \\sin\\theta = ${p.areaTx}$: $\\theta = ${p.th}^{\\circ}$ o $\\theta = ${180 - p.th}^{\\circ}$`,
    alto: () => 214, pie: 'Arrastra la punta de v.',
    dib(v, K, p, f) {
      const U = [OA[0] + p.a * SA, OA[1]], V = at(OA, p.b * SA, v.g), W = [U[0] + V[0] - OA[0], U[1] + V[1] - OA[1]], A = areaA(p, v.g), ok = Math.abs(A - p.area) < 1e-6;
      let h = K.p([OA, U, W, V], 'fa') + K.ar(...OA, ...U, 'lg gr') + K.ar(...OA, ...V, 'lf gr') + K.c(...OA, 3.5, 'fk');
      h += K.t((OA[0] + U[0]) / 2, OA[1] + 18, `‖u‖ = ${p.a}`, 's tg') + K.t(8, 36, `‖v‖ = ${p.b}`, 's tf', 'start');
      if (v.g > 0 && v.g < 180) h += K.arc(...OA, 18, 0, v.g, 'lm') + K.t(...at(OA, 30, v.g / 2).map((z, i) => z + (i ? 4 : 0)), 'θ', 's tm');
      h += K.t(8, 18, `lona: ${p.areaPl} m²`, 's tm', 'start');
      if (f > 0) {
        h += K.f(f, K.l(V[0], V[1], V[0], OA[1], 'lf d') + K.t(V[0] + 6, (V[1] + OA[1]) / 2, 'h', 's tf', 'start'));
        h += K.f(f * 3 - 2, K.t(332, 18, `área = ${p.a} · ${p.b} · sen ${v.g}° = ${fm(A)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$${p.a} \\cdot ${p.b} \\sin ${v.g}^{\\circ} = ${Math.round(areaA(p, v.g) * 1000) / 1000}$`,
    aviso(v, p) {
      const A = areaA(p, v.g);
      if (p.trampas?.[v.g]) return p.trampas[v.g];
      return A < p.area ? `El área da ${fm(A)}: falta. Acerca el ángulo a 90°, donde el área es la máxima.` : `El área da ${fm(A)}: sobra. Aleja el ángulo de 90°.`;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ la cuenta: el determinante con î, ĵ, k̂ arriba
  // Se arrastran las tres componentes de u × v; al comprobar, el producto escalar confirma que es perpendicular a los dos.
  //   params { u, v, metas, fichas, mira, trampas, ok }
  const slotT = i => ({ x: 290, y: 48 + 52 * i, w: 78, h: 38 });
  XG.rotula('pvec-tapa-columnas', {
    slots: p => p.metas.map((_, i) => slotT(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 206,
    texto: p => `$\\vec u \\times \\vec v = (${cruz(p.u, p.v).join(', ')})$`,
    fondo(K, p, f) {
      const X = [44, 94, 144], Y = [62, 98, 134];
      let h = K.l(22, 44, 22, 150, 'lm gr') + K.l(166, 44, 166, 150, 'lm gr') + K.t(8, 22, 'u × v =', 's tm', 'start');
      ['î', 'ĵ', 'k̂'].forEach((s, j) => { h += K.t(X[j], Y[0], s, 'ta'); });
      p.u.forEach((x, j) => { h += K.t(X[j], Y[1], sg(x), 'tg'); });
      p.v.forEach((x, j) => { h += K.t(X[j], Y[2], sg(x), 'tf'); });
      h += K.t(94, 170, 'el del medio lleva −', 's tm');
      ['en î:', 'en ĵ:', 'en k̂:'].forEach((e, i) => { const s = slotT(i); h += K.t(s.x - s.w / 2 - 8, s.y + 5, e, 's', 'end'); });
      return h + K.f(f, K.t(8, 196, `u · (u × v) = 0 y v · (u × v) = 0 ✓`, 's to', 'start'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ----------------------------------------------------------------------- la rueda î → ĵ → k̂ y los productos de la base
  //   params { et: [rótulo de cada lugar], metas, fichas, mira, trampas, ok }
  const slotR = i => ({ x: 290, y: 40 + 46 * i, w: 76, h: 36 });
  const CR = [86, 108], RR = 50;
  XG.rotula('pvec-rueda-ijk', {
    slots: p => p.metas.map((_, i) => slotR(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 210,
    texto: p => p.et.map((e, i) => `${e} = ${p.metas[i]}`).join(', '),
    fondo(K, p, f) {
      const G = [90, -30, 210];
      let h = K.arc(...CR, RR, 0, 360, 'lm');
      G.forEach((g, i) => {
        const b = g - 120;   // a favor del ciclo: de g a g − 120, en el sentido del reloj
        const P = at(CR, RR, b + 20), Q = at(CR, RR, b + 13);
        h += K.arc(...CR, RR, b + 13, g - 13, 'la gr') + K.ar(...P, ...Q, 'la gr');
        const T = at(CR, RR, g);
        h += K.c(...T, 13, 'fn') + K.t(T[0], T[1] + 5, ['î', 'ĵ', 'k̂'][i], 'ta');
      });
      h += K.t(CR[0], 192, 'a favor +, en contra −', 's tm');
      p.et.forEach((e, i) => { const s = slotR(i); h += K.t(s.x - s.w / 2 - 8, s.y + 5, `${e} =`, 's', 'end'); });
      return h + K.f(f, K.t(CR[0], CR[1] + 5, 'u × u = 0', 's to'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------------- paralelos dan cero: r × F = 0
  // Ocho fuerzas; se tocan las que no hacen girar la palanca r (las paralelas a r).
  //   params { r, fs: [F × 8], falta, ok }
  const cajaF = i => ({ x: 86 + 168 * (i % 2), y: 66 + 44 * Math.floor(i / 2), w: 160, h: 38 });
  const nulas = p => p.fs.map((F, i) => (cruz(p.r, F).every(x => x === 0) ? i : -1)).filter(i => i >= 0);
  XG.marca('pvec-paralelas-cero', {
    sitios: p => p.fs.map((_, i) => cajaF(i)),
    cara: (K, p, i, on) => { const c = cajaF(i); return K.t(c.x - c.w / 2 + 8, c.y - 6, i + 1, 's tm', 'start') + K.t(c.x + 6, c.y + 8, `F = ${tupla(p.fs[i])}`, `s ${on ? 'ta' : ''}`); },
    fondo: (K, p) => K.t(8, 18, `palanca r = ${tupla(p.r)}`, 's tg', 'start') + K.t(332, 18, 'no gira si r × F = 0', 's tm', 'end'),
    alto: () => 240, nombre: (p, i) => `fuerza ${i + 1}`, pie: 'Toca las fuerzas que no hacen girar la palanca.',
    sol: p => nulas(p),
    aviso(on, p) {
      const s = nulas(p), i = on.findIndex((o, k) => o && !s.includes(k));
      if (i < 0) return p.falta;
      return `La fuerza ${i + 1} da r × F = ${tupla(cruz(p.r, p.fs[i]))}, que no es 0: no es paralela a r y sí la hace girar.`;
    },
    bien: p => p.ok,
    texto: p => `las fuerzas ${nulas(p).map(i => i + 1).join(', ')}: son múltiplos de r`,
  });

  // ------------------------------------------------------------------- la torca de una llave: τ = r × F, su parte en z
  // Se arrastra la mano por la llave (r = (s, 0, 0)); la fuerza F es fija. Al comprobar se ve τ y lo que gira el tornillo.  v { s }
  //   params { F, meta, ini, trampas: { s: aviso }, ok }
  const OL = [60, 200], UL = 40;
  const IL = (...q) => XPK.iso(OL, UL, ...q);
  const tauL = (p, s) => cruz([s, 0, 0], p.F);
  XG.figura('pvec-llave-torca', {
    ini: p => ({ s: p.ini }),
    manijas: () => [{ k: 's', min: 0.05, max: 0.4, paso: 0.05, rot: () => 'r', en: v => IL(v.s * 10, 0, 0), de: x => (x - OL[0]) / (UL * 0.866 * 10) }],
    ok: (v, p) => Math.abs(tauL(p, v.s)[2] - p.meta) < 1e-9,
    sol: p => ({ s: Math.round(p.meta / p.F[1] * 1000) / 1000 }),
    texto: p => `$s = ${Math.round(p.meta / p.F[1] * 1000) / 1000}$ m: $\\tau_z = ${p.F[1]}s = ${p.meta}$ N·m`,
    alto: () => 240, pie: 'Arrastra la mano por la llave.',
    dib(v, K, p, f) {
      const T = tauL(p, v.s), ok = Math.abs(T[2] - p.meta) < 1e-9, M = IL(v.s * 10, 0, 0), E = IL(4.4, 0, 0);
      let h = K.l(...OL, OL[0], OL[1] - 34, 'lm gr d') + K.t(OL[0] - 6, OL[1] - 30, 'z', 's tm', 'end');
      h += K.l(...OL, ...E, 'lm gr') + K.p([[OL[0] - 9, OL[1]], [OL[0] - 5, OL[1] - 6], [OL[0] + 5, OL[1] - 6], [OL[0] + 9, OL[1]], [OL[0] + 5, OL[1] + 6], [OL[0] - 5, OL[1] + 6]], 'fk');
      for (let k = 1; k <= 4; k++) { const A = IL(k, 0, 0); h += K.l(A[0], A[1] - 4, A[0], A[1] + 4, 'lm') + (k > 1 ? K.t(A[0] + 6, A[1] + 20, `${k * 10} cm`, 's tm') : ''); }
      const Fs = por(1 / 25, p.F), Ft = K.iso(M, UL, ...Fs);
      h += K.ar(...M, ...Ft, 'la gr') + K.t(Ft[0] - 6, Ft[1] - 4, 'F', 's ta', 'end');
      h += K.t(8, 18, `F = ${tupla(p.F)} N`, 's ta', 'start') + K.t(8, 36, `r = (s, 0, 0) m`, 's tm', 'start') + K.t(8, 54, `meta: τz = ${p.meta} N·m`, 's tm', 'start');
      if (f > 0) {
        const g = Math.min(1, f * 1.3), Z = [OL[0], OL[1] - T[2] * 5 * g];
        h += K.f(f, K.ar(...OL, ...Z, `${ok ? 'lo' : 'lf'} gr`) + K.t(Z[0] - 6, Z[1], 'τz', `s ${ok ? 'to' : 'tf'}`, 'end'));
        h += K.f(f * 3 - 2, K.t(332, 18, `τ = r × F = ${tupla(T.map(x => Math.round(x * 1000) / 1000))}`, 's tm', 'end')
          + K.t(332, 36, `gira el tornillo: τz = ${fm(T[2])} N·m ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec r \\times \\vec F = (${tauL(p, v.s).map(x => Math.round(x * 1000) / 1000).join(', ')})$ con $s = ${v.s}$`,
    aviso(v, p) {
      const t = tauL(p, v.s)[2];
      return p.trampas?.[v.s] || `Con la mano en s = ${fm(v.s)} m, τz = ${p.F[1]} · ${fm(v.s)} = ${fm(t)} N·m: ${t < p.meta ? 'falta; aléjala del tornillo' : 'sobra; acércala al tornillo'}.`;
    },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- el triple producto: volumen de la caja que se inclina
  // La base (u y v) queda quieta; se arrastra la punta de w = (a, wy, h). Inclinar no cambia el volumen; la altura sí.  v { a, h }
  //   params { u, v, wy, meta, ini: [a, h], trampas: { 'a:h': aviso }, ok }
  const OC = [150, 214], UC = 22;
  const IC = (...q) => XPK.iso(OC, UC, ...q);
  const wC = (p, v) => [v.a, p.wy, v.h];
  const detC = (p, v) => dot(p.u, cruz(p.v, wC(p, v)));
  XG.figura('pvec-caja-inclinada', {
    ini: p => ({ a: p.ini[0], h: p.ini[1] }),
    manijas: p => [{ k: ['a', 'h'], min: [-2, 1], max: [2, 5], paso: 1, rot: () => 'w', en: v => IC(v.a, p.wy, v.h),
      de: (x, y) => { const a = (x - OC[0]) / (UC * 0.866) + p.wy; return [a, (OC[1] - y - (a + p.wy) * UC * 0.4) / UC]; } }],
    ok: (v, p) => Math.abs(Math.abs(detC(p, v)) - p.meta) < 1e-9,
    sol: p => { for (let h = 1; h <= 5; h++) if (Math.abs(detC(p, { a: 0, h })) === p.meta) return { a: 0, h }; return { a: 0, h: 1 }; },
    texto: p => { const b = nor(cruz(p.u, p.v)); return `altura $h = ${p.meta / b}$, con cualquier inclinación: $|\\vec u \\cdot (\\vec v \\times \\vec w)| = ${b} \\cdot ${p.meta / b} = ${p.meta}$`; },
    alto: () => 236, pie: 'Arrastra la esquina de arriba.',
    dib(v, K, p, f) {
      const a = p.u, b = p.v, w = wC(p, v), z = [0, 0, 0], d = detC(p, v), ok = Math.abs(Math.abs(d) - p.meta) < 1e-9;
      const caras = [[z, a, suma(a, b), b], [w, suma(a, w), suma(a, b, w), suma(b, w)], [z, a, suma(a, w), w], [b, suma(a, b), suma(a, b, w), suma(b, w)], [z, b, suma(b, w), w], [a, suma(a, b), suma(a, b, w), suma(a, w)]];
      let h = caras.map(c => K.p(c.map(q => IC(...q)), f >= 1 ? (ok ? 'fo' : 'ff') : 'fa')).join('');
      h += K.ar(...OC, ...IC(...a), 'la gr') + K.ar(...OC, ...IC(...b), 'la gr') + K.ar(...OC, ...IC(...w), 'lg gr');
      h += K.t(...IC(...suma(a, [0.2, 0, -0.6])), 'u', 's ta', 'start') + K.t(...IC(...suma(b, [-0.4, 0, -0.5])), 'v', 's ta', 'end');
      h += K.t(332, 18, `u = ${tupla(p.u)}`, 's ta', 'end') + K.t(332, 36, `v = ${tupla(p.v)}`, 's ta', 'end') + K.t(332, 54, `w = ${tupla(w)}`, 's tg', 'end') + K.t(332, 72, `meta: ${p.meta} cm³`, 's tm', 'end');
      if (f > 0) {
        const W = IC(...w), B = IC(w[0], w[1], 0);
        h += K.f(f, K.l(...W, ...B, 'lf d') + K.c(...B, 3, 'ff') + K.t(W[0] - 6, (W[1] + B[1]) / 2, 'h', 's tf', 'end'));
        h += K.f(f * 3 - 2, K.t(332, 94, `V = |u · (v × w)| = ${Math.abs(d)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec u \\cdot (\\vec v \\times \\vec w) = ${detC(p, v)}$ con $\\vec w = (${wC(p, v).join(', ')})$`,
    aviso(v, p) {
      const V = Math.abs(detC(p, v));
      return p.trampas?.[`${v.a}:${v.h}`] || `Con w = ${tupla(wC(p, v))} el volumen es ${V} cm³: ${V < p.meta ? 'falta' : 'sobra'}. Lo que cuenta es la altura de w sobre la base, no cuánto se inclina.`;
    },
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------- en movimiento: llenar una caja inclinada (o un prisma)
  // Se fijan los litros y al soltar se vierten: el líquido sube por la caja; si sobra, rebosa; si falta, no la llena.
  //   tiro { q, u, v, w, prisma, r, min, max, cuenta, trampas }
  const OT = [110, 200], UT = 20;
  const JX = 270, JY = 64, JW = 46, JH = 120;
  const solido = (K, t, ws, cls) => {
    const I = q => K.iso(OT, UT, ...q), z = [0, 0, 0], a = t.u, b = t.v, w = ws;
    const caras = t.prisma
      ? [[z, a, b], [w, suma(a, w), suma(b, w)], [z, a, suma(a, w), w], [a, b, suma(b, w), suma(a, w)], [b, z, w, suma(b, w)]]
      : [[z, a, suma(a, b), b], [w, suma(a, w), suma(a, b, w), suma(b, w)], [z, a, suma(a, w), w], [b, suma(a, b), suma(a, b, w), suma(b, w)], [z, b, suma(b, w), w], [a, suma(a, b), suma(a, b, w), suma(a, w)]];
    return caras.map(c => K.p(c.map(I), cls)).join('');
  };
  XG.tiros('pvec-llena-oblicua', {
    perilla: t => ({ et: 'litros que viertes', min: t.min, max: t.max, cara: v => sg(v), lee: v => `${v} L` }),
    meta: t => t.r, alto: 230, ms: 1800, pie: 'Fija los litros y suelta.',
    dib(t, v, K, p, f) {
      let h = solido(K, t, t.w, 'fn') + K.t(8, 18, t.prisma ? 'prisma de base triangular' : 'caja inclinada', 's tm', 'start');
      h += K.r(JX, JY, JW, JH, 'fn', 4) + K.t(JX + JW / 2, JY + JH + 18, 'jarra', 's tm');
      if (v == null) return h + K.t(JX + JW / 2, JY - 8, '0 L', 's tm');
      const g = Math.min(1, f * 1.1), s = Math.min(1, v / t.r) * g, ok = v === t.r, lv = v * (1 - g) / t.max * JH;
      h += K.r(JX + 2, JY + JH - lv, JW - 4, lv, 'fa', 2) + K.t(JX + JW / 2, JY - 8, `${v} L`, 's ta');
      if (s > 0.01) h += solido(K, t, por(s, t.w), 'fa');
      if (v > t.r && g > 0.9) { const T = K.iso(OT, UT, ...suma(t.u, t.w)); h += K.c(T[0] + 10, T[1] + 14, 4, 'fa') + K.c(T[0] + 14, T[1] + 30, 3, 'fa') + K.t(T[0] + 22, T[1] + 8, 'se rebosa', 's tf', 'start'); }
      return h + K.f(f * 3 - 2, K.t(332, 18, `le caben ${t.r} L ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} L ${v > t.r ? 'se rebosa' : 'no se llena'}: el volumen es el valor absoluto de u · (v × w)${t.prisma ? ', y el prisma es la mitad de la caja' : ''}.`,
    cuenta: t => t.cuenta,
  });
})();
