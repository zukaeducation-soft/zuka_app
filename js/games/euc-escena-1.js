// Geometría Euclidiana · mundo 1 «euc-demostrar»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Hipótesis y tesis sobre la figura, tablas afirmación–razón, reglas de inferencia con figuras y contraejemplos que se fabrican moviendo.
(() => {
  const idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const r1 = x => String(Math.round(x * 10) / 10);
  const raya = (K, x, y, n = 1, cls = 'la') => Array.from({ length: n }, (_, k) => { const d = (k - (n - 1) / 2) * 5; return K.l(x + d, y - 7, x + d, y + 7, cls); }).join('');

  // ------------------------------------------------------------------------------------------------ figuras de apoyo
  // Banda de 108 de alto: recta con puntos, rayos desde O, dos rectas que se cruzan o un par lineal.
  const FH = 108;
  function fig(K, g, y0 = 0) {
    if (g.t === 'recta') {
      const X = u => 34 + u * 272 / g.L, y = y0 + 58, x = g.pts.map(q => X(q[1]));
      return K.l(14, y, 326, y) + (g.ig || []).map(([i, j, n]) => raya(K, (x[i] + x[j]) / 2, y, n || 1)).join('')
        + (g.et || []).map(([i, j, s]) => K.t((x[i] + x[j]) / 2, y + 24, s, 's ta')).join('') + g.pts.map(([n], i) => K.c(x[i], y, 4, 'fk') + K.t(x[i], y - 14, n)).join('');
    }
    if (g.t === 'rayos') {
      const C = [170, y0 + 96], at = (r, a) => K.at(...C, r, a);
      return (g.ig || []).map(([i, j, cls]) => K.sec(...C, 38, g.r[i][1], g.r[j][1], cls || 'fa')).join('') + (g.rec ? K.l(60, C[1], 280, C[1]) : '')
        + (g.cu ? K.pl([at(13, g.r[g.cu[0]][1]), at(18.4, (g.r[g.cu[0]][1] + g.r[g.cu[1]][1]) / 2), at(13, g.r[g.cu[1]][1])], 'lm') : '')
        + g.r.map(([n, a]) => K.l(...C, ...at(80, a)) + K.t(at(92, a)[0], at(92, a)[1] + 5, n, 's')).join('') + K.c(...C, 4, 'fk');
    }
    if (g.t === 'cruce') {
      const C = [170, y0 + 56], a = g.a, at = (r, q) => K.at(...C, r, q), n = (q, s) => K.t(at(30, q)[0], at(30, q)[1] + 5, s, 's ta');
      return K.l(64, C[1], 276, C[1]) + K.l(...at(52, a), ...at(52, a + 180)) + K.c(...C, 3, 'fk') + n(a / 2, '1') + n((a + 180) / 2, '2') + n(180 + a / 2, '3') + n(180 + (a + 180) / 2, '4');
    }
    // par lineal
    const C = [170, y0 + 94], a = g.a, at = (r, q) => K.at(...C, r, q);
    return K.sec(...C, 30, 0, a, 'fa') + K.sec(...C, 24, a, 180, 'fg') + K.l(50, C[1], 290, C[1]) + K.l(...C, ...at(82, a), 'gr') + K.c(...C, 4, 'fk')
      + K.t(at(46, a / 2)[0], at(46, a / 2)[1] + 5, '1', 's ta') + K.t(at(40, (a + 180) / 2)[0], at(40, (a + 180) / 2)[1] + 5, '2', 's tg');
  }
  const cab = (K, p) => (p.fig ? fig(K, p.fig) : '') + (p.da || []).map((t, i) => K.t(170, (p.fig ? FH : 0) + 20 + i * 20, t, 's ta')).join('');
  const top = p => (p.fig ? FH : 0) + (p.da ? p.da.length * 20 + 10 : 0);

  // Polígonos pequeños con sus marcas: ángulos rectos (rec) y lados iguales (tk).
  const FORMAS = {
    cuadrado: { p: [[-0.72, 0.72], [0.72, 0.72], [0.72, -0.72], [-0.72, -0.72]], rec: [0, 1, 2, 3], tk: [0, 1, 2, 3] },
    rect: { p: [[-1.15, 0.6], [1.15, 0.6], [1.15, -0.6], [-1.15, -0.6]], rec: [0, 1, 2, 3] },
    rectAlto: { p: [[-0.5, 0.82], [0.5, 0.82], [0.5, -0.82], [-0.5, -0.82]], rec: [0, 1, 2, 3] },
    rombo: { p: [[-1.15, 0], [0, 0.66], [1.15, 0], [0, -0.66]], tk: [0, 1, 2, 3] },
    romboide: { p: [[-1.15, 0.6], [0.55, 0.6], [1.15, -0.6], [-0.55, -0.6]] },
    trapecio: { p: [[-1.15, 0.62], [1.15, 0.62], [0.5, -0.62], [-0.5, -0.62]] },
    trapRect: { p: [[-0.95, 0.62], [1.1, 0.62], [0.35, -0.62], [-0.95, -0.62]], rec: [0, 3] },
    equilatero: { p: [[-0.85, 0.62], [0.85, 0.62], [0, -0.85]], tk: [0, 1, 2] },
    isosceles: { p: [[-0.5, 0.75], [0.5, 0.75], [0, -0.85]], tk: [1, 2] },
    isoAncho: { p: [[-1.1, 0.55], [1.1, 0.55], [0, -0.55]], tk: [1, 2] },
    escaleno: { p: [[-1.05, 0.6], [0.95, 0.6], [0.4, -0.7]] },
    triRect: { p: [[-0.9, 0.62], [0.9, 0.62], [-0.9, -0.62]], rec: [0] },
    isoRect: { p: [[-0.72, 0.72], [0.72, 0.72], [-0.72, -0.72]], rec: [0], tk: [0, 2] },
  };
  function forma(K, nombre, cx, cy, s, cls = 'fa') {
    const F = FORMAS[nombre], P = F.p.map(([x, y]) => [cx + x * s, cy + y * s]), n = P.length, u = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; };
    let h = K.p(P, cls);
    for (const i of F.rec || []) { const a = u(P[i], P[(i + 1) % n]), b = u(P[i], P[(i + n - 1) % n]), V = P[i]; h += K.pl([[V[0] + a[0] * 7, V[1] + a[1] * 7], [V[0] + (a[0] + b[0]) * 7, V[1] + (a[1] + b[1]) * 7], [V[0] + b[0] * 7, V[1] + b[1] * 7]], 'lm'); }
    for (const i of F.tk || []) { const A = P[i], B = P[(i + 1) % n], d = u(A, B), m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]; h += K.l(m[0] - d[1] * 5, m[1] + d[0] * 5, m[0] + d[1] * 5, m[1] - d[0] * 5, 'lm'); }
    return h;
  }

  // ------------------------------------------------------------------------------------------------------ armazones
  // Tarjetas con frases bajo una figura: se tocan las que cumplen.  params { fig?, da?, casos: [{ t, si } | { t, no }], falta, ok }
  const tarjetas = (nombre, pie) => { const si = p => idx(p.casos.length, i => p.casos[i].si); XG.marca(nombre, {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: top(p) + 22 + i * 44, w: 330, h: 38 })), cara: (K, p, i) => K.t(170, top(p) + 27 + i * 44, p.casos[i].t, 's'), alto: p => top(p) + p.casos.length * 44 + 4, fondo: cab, sol: si,
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.casos[k].si); return i >= 0 ? p.casos[i].no : p.falta; }, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i].t).join('; '), pie,
  }); };
  // Tarjetas con una figura dibujada y su frase.  params { da?, cartas: [{ f, t?, si } | { f, t?, no }], falta, ok }
  const figuras = (nombre, cols, pie) => {
    const w = cols === 2 ? 158 : 100, h = cols === 2 ? 104 : 92, dx = cols === 2 ? 166 : 108, x = i => (cols === 2 ? 87 : 62) + (i % cols) * dx, y = (p, i) => top(p) + h / 2 + 4 + Math.floor(i / cols) * (h + 8), si = p => idx(p.cartas.length, i => p.cartas[i].si);
    XG.marca(nombre, {
      sitios: p => p.cartas.map((_, i) => ({ x: x(i), y: y(p, i), w, h })), alto: p => top(p) + Math.ceil(p.cartas.length / cols) * (h + 8) + 2, fondo: cab, sol: si, nombre: (p, i) => p.cartas[i].n || (p.cartas[i].t || p.cartas[i].f).replace('|', ' '),
      cara(K, p, i) { const c = p.cartas[i], ls = (c.t || '').split('|').filter(Boolean), cy = y(p, i) - (ls.length ? 8 + ls.length * 7 : 0); return forma(K, c.f, x(i), cy, cols === 2 ? 22 : 26) + ls.map((s, j) => K.t(x(i), y(p, i) + h / 2 - 8 - (ls.length - 1 - j) * 15, s, 's')).join(''); },
      aviso(on, p) { const i = on.findIndex((q, k) => q && !p.cartas[k].si); return i >= 0 ? p.cartas[i].no : p.falta; }, bien: p => p.ok, texto: p => p.texto, pie,
    });
  };
  // Renglones: a la izquierda lo que se lee (uno o dos renglones, con «|») y a la derecha el lugar de la ficha.
  //   params { fig?, da?, et, metas, fichas, mira, trampas?, ok }
  const rotulos = (nombre, w, x) => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x, y: top(p) + 26 + i * 48, w, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => top(p) + p.metas.length * 48 + 2,
    fondo: (K, p) => cab(K, p) + p.et.map((t, i) => { const ls = t.split('|'), y = top(p) + 31 + i * 48; return ls.map((s, j) => K.t(8, y + (j - (ls.length - 1) / 2) * 15, s, 's', 'start')).join(''); }).join(''), aviso: avisa, bien: p => p.ok,
  });
  // Cadena: de arriba abajo, cada afirmación sale de la anterior.  params { fig?, da?, metas, fichas, mira, trampas?, ok }
  const cadena = nombre => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x: 170, y: top(p) + 24 + i * 54, w: 246, h: 38 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' ⇒ '), alto: p => top(p) + p.metas.length * 54 - 6,
    fondo: (K, p) => cab(K, p) + p.metas.slice(1).map((_, i) => K.ar(170, top(p) + 45 + i * 54, 170, top(p) + 57 + i * 54, 'la')).join('') + K.t(8, top(p) + 29, 'si', 's tm', 'start') + K.t(332, top(p) + 29 + (p.metas.length - 1) * 54, 'fin', 's tm', 'end'), aviso: avisa, bien: p => p.ok,
  });

  // -------------------------------------------------------------------------- euc-demostrar-1 · hipótesis, tesis y razones
  tarjetas('toca-hipotesis', 'Toca todo lo que el enunciado da como hipótesis.');
  tarjetas('razon-vale', 'Toca todas las que sirven como razón.');
  // Cuatro puntos en una recta, o cuatro rayos desde O: se tocan las partes que la hipótesis declara congruentes.
  //   params { t: 'seg' | 'ang', n: 'ABCD', pos | g, si: [índices], no: { índice: aviso }, falta, ok, texto }
  const MD = p => {
    if (p.t === 'seg') { const L = p.pos[3], x = p.pos.map(u => 30 + u * 280 / L), m = (i, j) => (x[i] + x[j]) / 2; return { x, s: [...[0, 1, 2].map(k => ({ x: m(k, k + 1), y: 100, w: x[k + 1] - x[k] - 10, h: 34 })), { x: m(0, 2), y: 42, w: x[2] - x[0] - 10, h: 34 }, { x: m(1, 3), y: 158, w: x[3] - x[1] - 10, h: 34 }] }; }
    const at = (r, a) => XPK.at(170, 186, r, a), c = k => { const [x, y] = at(64, (p.g[k] + p.g[k + 1]) / 2); return { x, y, w: 40, h: 40, red: true }; }, l = (i, j) => { const [x, y] = at(134, (p.g[i] + p.g[j]) / 2); return { x, y, w: 62, h: 32 }; };
    return { s: [c(0), c(1), c(2), l(0, 2), l(1, 3)] };
  };
  XG.marca('marca-dato', {
    sitios: p => MD(p).s, alto: () => 204, sol: p => p.si, bien: p => p.ok, texto: p => p.texto, pie: 'Toca las partes que la hipótesis da como congruentes.',
    nombre: (p, i) => (p.t === 'seg' ? (i < 3 ? `segmento ${p.n[i]}${p.n[i + 1]}` : `segmento ${p.n[i - 3]}${p.n[i - 1]}`) : i < 3 ? `ángulo ${i + 1}` : `ángulo ${p.n[i - 3]}O${p.n[i - 1]}`),
    fondo(K, p) {
      if (p.t === 'seg') { const { x } = MD(p); return K.l(12, 100, 328, 100, 'lm') + [...p.n].map((n, i) => K.c(x[i], 100, 4, 'fk') + K.t(x[i], 76, n)).join(''); }
      return p.g.map((a, i) => K.l(170, 186, ...K.at(170, 186, 98, a)) + K.t(K.at(170, 186, 109, a)[0], K.at(170, 186, 109, a)[1] + 5, p.n[i], 's')).join('') + K.c(170, 186, 4, 'fk') + K.t(170, 201, 'O', 's');
    },
    cara(K, p, i, on) {
      const { s, x } = MD(p), z = s[i];
      if (p.t === 'seg') return i < 3 ? K.l(x[i] + 12, 100, x[i + 1] - 12, 100, on ? 'la gr' : 'gr') + (on ? raya(K, z.x, 100) : '') : K.t(z.x, z.y + 5, `todo ${p.n[i - 3]}${p.n[i - 1]}`, on ? 's ta' : 's');
      return i < 3 ? K.t(z.x, z.y + 5, String(i + 1), on ? 'ta' : '') : K.t(z.x, z.y + 5, `∠${p.n[i - 3]}O${p.n[i - 1]}`, on ? 's ta' : 's');
    },
    aviso(on, p) { const i = on.findIndex((q, k) => q && !p.si.includes(k)); return i >= 0 ? p.no[i] : p.falta; },
  });
  rotulos('clasifica-enunciado', 104, 282);
  rotulos('razon-de-paso', 164, 254);
  // Se arma la figura que describe la hipótesis: M y N sobre el segmento AB.  v { m, n }   params { L, m, n, mira: [M, N], ok }
  const XH = (p, u) => 30 + u * 280 / p.L;
  XG.figura('arma-hipotesis', {
    ini: () => ({ m: 2, n: 5 }),
    manijas: p => [{ k: 'm', min: 1, max: p.L - 1, paso: 1, rot: () => 'M', en: v => [XH(p, v.m), 62], de: x => (x - 30) * p.L / 280 }, { k: 'n', min: 1, max: p.L - 1, paso: 1, rot: () => 'N', en: v => [XH(p, v.n), 138], de: x => (x - 30) * p.L / 280 }],
    ok: (v, p) => v.m === p.m && v.n === p.n, sol: p => ({ m: p.m, n: p.n }), texto: p => `$AM = ${p.m}$ y $AN = ${p.n}$, con $AB = ${p.L}$`, alto: () => 182, pie: 'Arrastra M y N sobre el segmento.',
    dib(v, K, p, f) {
      let h = K.l(30, 100, 310, 100, 'gr') + K.l(XH(p, v.m), 100, XH(p, v.m), 78, 'la') + K.l(XH(p, v.n), 100, XH(p, v.n), 122, 'lg');
      for (let u = 0; u <= p.L; u++) h += K.l(XH(p, u), 95, XH(p, u), 105, 'lm');
      return h + K.c(30, 100, 4, 'fk') + K.c(310, 100, 4, 'fk') + K.t(18, 105, 'A') + K.t(323, 105, 'B')
        + K.f(f, K.t(170, 22, `AM = ${Math.round(v.m)}   MB = ${p.L - Math.round(v.m)}`, 's ta') + K.t(170, 174, `AN = ${Math.round(v.n)}   NB = ${p.L - Math.round(v.n)}`, 's tg'));
    },
    lee: (v, p) => `$AM = ${Math.round(v.m)}$, $AN = ${Math.round(v.n)}$, $AB = ${p.L}$`,
    aviso: (v, p) => (v.m !== p.m ? p.mira[0] : p.mira[1]), bien: (v, p) => p.ok,
  });
  // En movimiento: una cinta sale de un punto con el largo que se le da.  tiro { q, pts: [[letra, posición]], da: [[i, j, texto, nivel]], ig?, x: [i, j, nivel], r, c, e? }
  XG.tiros('cinta-deduce', {
    perilla: () => ({ et: 'Largo', min: 0, max: 40, cara: v => v, lee: v => `${v}` }), meta: t => t.r, alto: 150, ms: 1400,
    dib(t, v, K, p, f) {
      const L = t.pts.at(-1)[1], X = u => 24 + u * 292 / L, x = t.pts.map(q => X(q[1])), y = 58, [i, j, nv] = t.x;
      const rot = (a, b, s, n, cls) => (n ? K.cota(x[a], 88, x[b], 88, s, cls) : K.t((x[a] + x[b]) / 2, 77, s, cls));
      let h = K.l(10, y, 330, y) + K.l(x[i], y, x[j], y, 'la gr') + (t.ig || []).map(([a, b]) => raya(K, (x[a] + x[b]) / 2, y, 1, 'lg')).join('') + (t.da || []).map(([a, b, s, n]) => rot(a, b, s, n, 's')).join('') + rot(i, j, '?', nv, 'ta')
        + t.pts.map(([n], k) => K.c(x[k], y, 4, 'fk') + K.t(x[k], y - 13, n)).join('');
      if (v != null) { const x2 = x[i] + (X(t.pts[i][1] + v) - x[i]) * Math.min(1, f * 1.4), bien = v === t.r; h += K.r(x[i], 120, x2 - x[i], 12, f >= 1 ? (bien ? 'fo' : 'ff') : 'fa', 3) + K.f(f * 3 - 2, K.t(Math.max(20, Math.min(318, x2 + 14)), 144, String(v), 's ta')); }
      return h;
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'La cinta se pasó del punto: revisa la cuenta.' : 'La cinta quedó corta: revisa la cuenta.'), cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira la cinta hasta el largo y suelta.',
  });

  // ------------------------------------------------------------------- euc-demostrar-2 · demostración directa e indirecta
  rotulos('propiedad-igualdad', 104, 282);
  rotulos('afirmacion-de-paso', 168, 252);
  rotulos('regla-usada', 96, 288);
  rotulos('absurdo-pasos', 240, 216);
  figuras('conclusion-valida', 2, 'Toca todas las conclusiones que salen seguras.');
  cadena('cadena-flechas');

  // -------------------------------------------------------------------- euc-demostrar-3 · condicionales y contraejemplos
  rotulos('suficiente-necesaria', 104, 282);
  figuras('caza-contraejemplo', 3, 'Toca todas las figuras que tumban la frase.');
  // Marco de cuatro varillas: AB fijo de L unidades; se arrastra D (ángulo en A y largo de AD); C = B + D − A.  v { a, d }
  const MA = [110, 152], MU = 18, MD4 = v => XPK.at(...MA, v.d * MU, v.a);
  XG.figura('rombo-no-cuadrado', {
    ini: () => ({ a: 90, d: 3 }),
    manijas: () => [{ k: ['a', 'd'], min: [45, 2], max: [135, 7], paso: [15, 1], rot: () => 'D', en: v => MD4(v), de: (x, y) => [Math.atan2(MA[1] - y, x - MA[0]) * 180 / Math.PI, Math.hypot(x - MA[0], y - MA[1]) / MU] }],
    ok: (v, p) => v.d === p.L && v.a !== 90, sol: p => ({ a: 60, d: p.L }), texto: p => `los cuatro lados de ${p.L} y un ángulo que no sea recto, por ejemplo de $60^\\circ$`, alto: () => 178, pie: 'Arrastra el vértice D: cambia el largo de AD y el ángulo en A.',
    dib(v, K, p, f) {
      const B = [MA[0] + p.L * MU, MA[1]], D = MD4(v), C = [B[0] + D[0] - MA[0], D[1]], d = Math.round(v.d * 10) / 10, m = (P, Q, k) => [P[0] + (Q[0] - P[0]) * k, P[1] + (Q[1] - P[1]) * k];
      let h = K.p([MA, B, C, D], 'fa') + K.ang(MA, B, D, 20, `${Math.round(v.a)}°`, 'fg', 's tg');
      for (let u = 1; u < p.L; u++) h += K.c(...m(MA, B, u / p.L), 2.2, 'fk');
      for (let u = 1; u < d; u++) h += K.c(...m(MA, D, u / d), 2.2, 'fk') + K.c(...m(B, C, u / d), 2.2, 'fk');
      return h + K.t(MA[0] - 10, MA[1] + 16, 'A', 's') + K.t(B[0] + 10, B[1] + 16, 'B', 's') + K.t(C[0] + 12, C[1] - 4, 'C', 's')
        + K.f(f, K.t(m(MA, B, 0.5)[0], MA[1] + 17, `${p.L}`, 's ta') + K.t(m(D, C, 0.5)[0], D[1] - 7, `${p.L}`, 's ta') + K.t(m(B, C, 0.5)[0] + 14, m(B, C, 0.5)[1] + 5, `${d}`, 's ta'));
    },
    lee: (v, p) => `$AB = DC = ${p.L}$, $AD = BC = ${Math.round(v.d)}$, $\\angle A = ${Math.round(v.a)}^\\circ$`,
    aviso: (v, p) => (v.d !== p.L ? `AD mide ${v.d} y AB mide ${p.L}: los lados no son iguales. No cumple la hipótesis, así que no refuta.` : 'Ese es un cuadrado: cumple la hipótesis y también la conclusión. No refuta nada.'),
    bien: (v, p) => `Cuatro lados de ${p.L} y un ángulo de ${v.a}°: cumple la hipótesis y falla la conclusión.`,
  });
  // M se mueve por la cuadrícula; A y B a d cuadros del centro.  v { x, y }
  const EX = x => 170 + x * 26, EY = y => 110 - y * 26;
  XG.figura('equidista-fuera', {
    ini: () => ({ x: 2, y: 2 }),
    manijas: () => [{ k: ['x', 'y'], min: [-5, -2], max: [5, 3], paso: 1, rot: () => 'M', en: v => [EX(v.x), EY(v.y)], de: (x, y) => [(x - 170) / 26, (110 - y) / 26] }],
    ok: v => v.x === 0 && v.y !== 0, sol: () => ({ x: 0, y: 2 }), texto: () => 'M fuera del segmento AB, justo encima o debajo de su centro: $AM = MB$ y no es el punto medio', alto: () => 180, pie: 'Arrastra el punto M por la cuadrícula.',
    dib(v, K, p, f) {
      const A = [EX(-p.d), 110], B = [EX(p.d), 110], M = [EX(v.x), EY(v.y)], am = Math.hypot(v.x + p.d, v.y), mb = Math.hypot(v.x - p.d, v.y);
      let h = '';
      for (let x = -5; x <= 5; x++) for (let y = -2; y <= 3; y++) h += K.c(EX(x), EY(y), 1.6, 'fM');
      return h + K.l(...A, ...B, 'gr') + K.l(...A, ...M, 'la') + K.l(...B, ...M, 'la') + K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + K.t(A[0] - 12, 127, 'A', 's') + K.t(B[0] + 12, 127, 'B', 's')
        + K.f(f, K.t(8, 16, `AM = ${r1(am)}`, 's ta', 'start') + K.t(332, 16, `MB = ${r1(mb)}`, 's ta', 'end'));
    },
    lee: (v, p) => `$AM \\approx ${r1(Math.hypot(v.x + p.d, v.y))}$ y $MB \\approx ${r1(Math.hypot(v.x - p.d, v.y))}$`,
    aviso: (v, p) => (v.x === 0 ? 'Ese es el punto medio: cumple la hipótesis y también la conclusión. No refuta nada.' : `AM mide ${r1(Math.hypot(v.x + p.d, v.y))} y MB mide ${r1(Math.hypot(v.x - p.d, v.y))}: no son iguales. No cumple la hipótesis.`),
    bien: () => 'AM = MB, pero M no está en el segmento: cumple la hipótesis y falla la conclusión.',
  });
  // En movimiento: se abre un ángulo y la escena muestra a su complemento (base 90) o a su suplemento (base 180).  tiro { q, base, r, c, e? }
  XG.tiros('abanico-refuta', {
    perilla: t => ({ et: 'Ángulo', min: 0, max: t.base / 5 - 1, cara: v => v * 5, lee: v => `${v * 5}°` }), meta: t => t.r / 5, alto: 172, ms: 1500,
    dib(t, v, K, p, f) {
      const C = t.base === 90 ? [110, 150] : [170, 150], at = (r, a) => K.at(...C, r, a);
      let h = '';
      if (v != null) {
        const a = v * 5 * Math.min(1, f * 1.5), b = t.base - v * 5;
        h += K.sec(...C, 46, 0, a, 'fa') + K.sec(...C, 38, a, t.base, 'fg') + K.l(...C, ...at(118, a), 'la gr')
          + K.f(f * 3 - 2, K.t(at(66, v * 2.5)[0], at(66, v * 2.5)[1] + 5, `${v * 5}°`, 's ta') + K.t(at(60, v * 5 + b / 2)[0], at(60, v * 5 + b / 2)[1] + 5, `${b}°`, 's tg'));
      }
      return h + (t.base === 90 ? K.l(...C, C[0], 26) + K.l(...C, 250, 150) + K.pl([[C[0] + 10, 150], [C[0] + 10, 140], [C[0], 140]], 'lm') : K.l(40, 150, 300, 150)) + K.c(...C, 5, 'fk') + K.t(332, 18, t.base === 90 ? 'con su complemento' : 'con su suplemento', 's tm', 'end');
    },
    falla: (t, v) => t.e?.[v * 5] || 'Con ese ángulo la frase no queda refutada: o no cumple la hipótesis, o cumple también la conclusión.', cuenta: t => `$${t.c}$`, pie: 'Estira el ángulo y suelta.',
  });
})();
