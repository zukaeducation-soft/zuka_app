// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/euc-escena-1.js
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
;
//#archivo js/games/euc-escena-2.js
// Geometría Euclidiana · mundo 2 «euc-elementos»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Lección 1 (puntos, rectas y segmentos): nombra-figuras, orden-afirma, segmento-reparte, tramos-suma, mitad-segmento, rectas-por-puntos.
// Lección 2 (ángulos): bisectriz-traza, parte-angulo, clase-angulo, angulos-toca, mediatriz-pasa.
// Lección 3 (polígonos): poligonos-toca, nombre-poligono, poligono-cuenta, regular-arma, circulo-partes, lanza-diagonales.
(() => {
  const R = Math.round, gr = n => `${R(n)}°`;
  // n puntos repartidos en una ronda (el primero arriba).
  const ronda = (K, n, r = 78, c = [170, 92]) => Array.from({ length: n }, (_, i) => K.at(...c, r, 90 + i * 360 / n));

  // ------------------------------------------------------------------------------------ lección 1 · puntos, rectas y segmentos
  // Cada dibujo con su nombre.  params { filas: ['segmento' | 'rayo' | 'semirrecta' | 'recta' | 'rayos opuestos'], fichas }
  const FIG = {
    segmento: 'El segmento tiene dos extremos y no sigue más allá de ellos.',
    rayo: 'El rayo tiene un origen, que sí le pertenece, y sigue sin fin hacia un solo lado.',
    semirrecta: 'La semirrecta es el rayo sin su origen: mira el punto hueco.',
    recta: 'La recta no tiene extremos: sigue sin fin hacia los dos lados.',
    'rayos opuestos': 'Dos rayos opuestos salen del mismo origen hacia lados contrarios de una recta.',
  };
  const trazo = (K, t, y) => {
    const pt = (x, n) => K.c(x, y, 4.5, 'fk') + K.t(x, y - 12, n, 's');
    if (t === 'segmento') return K.l(34, y, 150, y, 'gr') + pt(34, 'A') + pt(150, 'B');
    if (t === 'rayo') return K.ar(34, y, 186, y, 'gr') + pt(34, 'A') + pt(130, 'B');
    if (t === 'semirrecta') return K.ar(39, y, 186, y, 'gr') + K.c(34, y, 5, 'fn') + K.t(34, y - 12, 'A', 's') + pt(130, 'B');
    if (t === 'recta') return K.ar(100, y, 186, y, 'gr') + K.ar(100, y, 14, y, 'gr') + pt(62, 'A') + pt(130, 'B');
    return K.ar(100, y, 186, y, 'gr') + K.ar(100, y, 14, y, 'gr') + pt(100, 'O') + pt(52, 'A') + pt(148, 'B');
  };
  XG.rotula('nombra-figuras', {
    slots: p => p.filas.map((_, i) => ({ x: 264, y: 34 + i * 50, w: 136, h: 38 })),
    fichas: p => p.fichas, metas: p => p.filas, texto: p => p.filas.join('; '), alto: p => 24 + p.filas.length * 50,
    fondo: (K, p) => p.filas.map((t, i) => trazo(K, t, 38 + i * 50)).join(''),
    aviso(q, p) { const i = p.filas.findIndex((m, k) => q[k][0] !== m); return FIG[p.filas[i]]; },
    bien: () => 'Los extremos, el origen y las flechas dicen cuál es cuál.',
  });

  XG.frases('orden-afirma');

  // A, B y C colineales con B entre A y C: se reparte AC.  params { ac, k } (BC = k · AB) o { ac, dif } (BC − AB = dif).  v { x = AB }
  const SX = (p, x) => 30 + x * 280 / p.ac;
  const reparte = p => (p.dif != null ? (p.ac - p.dif) / 2 : p.ac / (p.k + 1));
  XG.figura('segmento-reparte', {
    ini: p => ({ x: p.ac - 1 }),
    manijas: p => [{ k: 'x', min: 1, max: p.ac - 1, paso: 1, en: v => [SX(p, v.x), 92], de: x => (x - 30) * p.ac / 280 }],
    ok: (v, p) => (p.dif != null ? p.ac - 2 * v.x === p.dif : p.ac - v.x === p.k * v.x),
    sol: p => ({ x: reparte(p) }),
    texto: p => `$AB = ${reparte(p)}$ y $BC = ${p.ac - reparte(p)}$`,
    alto: () => 150, pie: 'Arrastra el punto B.',
    dib(v, K, p, f) {
      const y = 92, A = SX(p, 0), C = SX(p, p.ac), B = SX(p, v.x), x = R(v.x);
      let h = '';
      for (let i = 0; i <= p.ac; i++) h += K.l(SX(p, i), y - 4, SX(p, i), y + 4, 'lm');
      return h + K.l(A, y, B, y, 'la gr') + K.l(B, y, C, y, 'lg gr') + K.t((A + B) / 2, y - 14, x, 'ta') + K.t((B + C) / 2, y - 14, f > 0.5 ? p.ac - x : '?', 'tg')
        + K.c(A, y, 5, 'fk') + K.c(C, y, 5, 'fk') + K.t(A, y - 36, 'A') + K.t(B, y - 36, 'B') + K.t(C, y - 36, 'C') + K.cota(A, y + 28, C, y + 28, `AC = ${p.ac}`);
    },
    lee: (v, p) => `$${R(v.x)} + ${p.ac - R(v.x)} = ${p.ac}$`,
    aviso(v, p) {
      const b = p.ac - v.x;
      if (p.dif != null) return v.x - b === p.dif ? 'Al revés: el más largo debe ser BC.' : `AB = ${v.x} y BC = ${b}: se llevan ${Math.abs(b - v.x)}, no ${p.dif}.`;
      return v.x * p.k === p.ac ? `Partiste AC entre ${p.k}, pero son ${p.k + 1} partes: una de AB y ${p.k} de BC.` : v.x === p.k * b ? 'Al revés: el más largo debe ser BC.' : `AB = ${v.x} y BC = ${b}: BC no es ${p.k} veces AB.`;
    },
    bien: (v, p) => `AB + BC = AC: ${v.x} + ${p.ac - v.x} = ${p.ac}.`,
  });

  // Puntos colineales con sus tramos; se llenan las medidas pedidas.  params { tr: [3, null, 4], tot?, letras, et, metas, fichas, mira, trampas, ok }
  XG.cuenta('tramos-suma', 92, (K, p, f) => {
    const sabe = p.tr.reduce((a, b) => a + (b ?? 0), 0), L = p.tr.map(t => t ?? p.tot - sabe), tot = L.reduce((a, b) => a + b, 0), y = 36;
    const X = [30]; L.forEach(t => X.push(X.at(-1) + t * 280 / tot));
    return K.l(30, y, 310, y, 'gr') + X.map((x, i) => K.c(x, y, 5, 'fk') + K.t(x, y + 22, p.letras[i])).join('')
      + L.map((t, i) => K.t((X[i] + X[i + 1]) / 2, y - 12, p.tr[i] ?? (f > 0.5 ? t : '?'), p.tr[i] == null ? 'tg' : 'ta')).join('')
      + (p.tot ? K.cota(30, y + 32, 310, y + 32, `${p.letras[0]}${p.letras.at(-1)} = ${p.tot}`) : '');
  });

  // Recta numérica: el punto medio de AB, o el otro extremo si M es el punto medio.  params { a, b, min, max, modo?: 'extremo', ini? }  v { x }
  const NX = (p, x) => 30 + (x - p.min) * 280 / (p.max - p.min);
  const mitad = p => (p.modo === 'extremo' ? 2 * p.b - p.a : (p.a + p.b) / 2);
  const par = n => (n < 0 ? `(${n})` : `${n}`);
  XG.figura('mitad-segmento', {
    ini: p => ({ x: p.ini ?? p.min }),
    manijas: p => [{ k: 'x', min: p.min, max: p.max, paso: 1, en: v => [NX(p, v.x), 96], de: x => p.min + (x - 30) * (p.max - p.min) / 280 }],
    ok: (v, p) => v.x === mitad(p),
    sol: p => ({ x: mitad(p) }),
    texto: p => (p.modo === 'extremo' ? `$AM = MB = ${Math.abs(p.b - p.a)}$: B queda en $${mitad(p)}$` : `$\\tfrac{${p.a} + ${par(p.b)}}{2} = ${mitad(p)}$`),
    alto: () => 140,
    dib(v, K, p, f) {
      const y = 96, e = p.modo === 'extremo', x = R(v.x), cada = p.max - p.min > 16 ? 2 : 1, A = NX(p, p.a), F = NX(p, p.b), M = NX(p, v.x);
      let h = K.ar(170, y, 328, y, 'lm') + K.ar(170, y, 12, y, 'lm');
      for (let i = p.min; i <= p.max; i++) h += K.l(NX(p, i), y - 4, NX(p, i), y + 4, 'lm') + ((i - p.min) % cada ? '' : K.t(NX(p, i), y + 26, K.sig(i), 's tm'));
      const am = e ? Math.abs(p.b - p.a) : Math.abs(x - p.a), mb = e ? Math.abs(x - p.b) : Math.abs(p.b - x), ver = f > 0.5;
      const P1 = e ? F : M, P2 = e ? M : F;   // P1 = M y P2 = B, se mueva quien se mueva
      return h + K.l(A, y, P2, y, 'la gr') + K.c(A, y, 5, 'fk') + K.c(F, y, 5, 'fk') + K.t(A, y - 16, 'A') + K.t(F, y - 16, e ? 'M' : 'B') + K.t(M, y - 18, e ? 'B' : 'M', 'ta')
        + K.t((A + P1) / 2, y - 46, e || ver ? am : '?', 'tg') + K.t((P1 + P2) / 2, y - 46, ver ? mb : '?', 'tg') + K.f(f * 2 - 1, K.l(A, y - 38, P1, y - 38, 'lg') + K.l(P1, y - 34, P2, y - 34, 'lg d'));
    },
    lee(v, p) { const e = p.modo === 'extremo', x = R(v.x); return `$AM = ${e ? Math.abs(p.b - p.a) : Math.abs(x - p.a)}$ y $MB = ${e ? Math.abs(x - p.b) : Math.abs(p.b - x)}$`; },
    aviso(v, p) {
      if (p.modo === 'extremo') return 2 * v.x === p.a + p.b ? 'Ese es el punto medio de AM. Aquí M ya es el punto medio: B va al otro lado de M.' : `AM = ${Math.abs(p.b - p.a)} y MB = ${Math.abs(v.x - p.b)}: M no queda en la mitad.`;
      return 2 * v.x === Math.abs(p.b - p.a) ? 'Esa es la mitad del largo, pero contada desde el 0: cuéntala desde A.' : `AM = ${Math.abs(v.x - p.a)} y MB = ${Math.abs(p.b - v.x)}: no son congruentes.`;
    },
    bien: (v, p) => (p.modo === 'extremo' ? `AM = MB = ${Math.abs(p.b - p.a)}: M quedó en la mitad de AB.` : `AM = MB = ${Math.abs(p.b - p.a) / 2}: M parte a AB en dos segmentos congruentes.`),
  });

  // Cuántos puntos (sin tres colineales) determinan `total` rectas.  v { n }
  XG.figura('rectas-por-puntos', {
    ini: () => ({ n: 3 }), manijas: p => [{ k: 'n', min: 2, max: p.max, paso: 1, et: 'puntos' }],
    ok: (v, p) => v.n * (v.n - 1) / 2 === p.total, sol: p => ({ n: (1 + Math.sqrt(1 + 8 * p.total)) / 2 }),
    texto(p) { const n = (1 + Math.sqrt(1 + 8 * p.total)) / 2; return `$\\tfrac{${n} \\cdot ${n - 1}}{2} = ${p.total}$`; },
    alto: () => 246, pie: 'Mueve la perilla. Al comprobar se trazan todas las rectas.',
    dib(v, K, p, f) {
      const n = R(v.n), P = ronda(K, n), tot = n * (n - 1) / 2; let h = '', k = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++, k++) {
        const d = Math.hypot(P[j][0] - P[i][0], P[j][1] - P[i][1]), ux = (P[j][0] - P[i][0]) / d * 10, uy = (P[j][1] - P[i][1]) / d * 10;
        h += K.f(f * 1.6 - 0.6 * k / tot, K.l(P[i][0] - ux, P[i][1] - uy, P[j][0] + ux, P[j][1] + uy, 'lr'));
      }
      return h + P.map(q => K.c(...q, 4.5, 'fk')).join('') + K.t(8, 18, `${n} puntos`, 'tm', 'start') + K.f(f * 2 - 1, K.t(332, 18, `${tot} ${tot === 1 ? 'recta' : 'rectas'}`, 'ta', 'end'));
    },
    lee: v => { const n = R(v.n); return `$\\tfrac{${n} \\cdot ${n - 1}}{2} = ${n * (n - 1) / 2}$`; },
    aviso: (v, p) => (v.n * (v.n - 1) === p.total ? 'Contaste cada recta dos veces: la recta AB y la recta BA son la misma.' : v.n * (v.n - 1) / 2 > p.total ? 'Con esos puntos salen más rectas.' : 'Con esos puntos salen menos rectas.'),
    bien: v => `De cada punto salen ${v.n - 1} rectas, y cada una se comparte entre dos puntos.`,
  });

  // --------------------------------------------------------------------------------------------- lección 2 · ángulos y su medida
  // Un rayo OP interior al ángulo AOB lo parte en dos.  params { a, rot? }  v { x = ∠AOP }
  const OV = [170, 172];
  const giro = (p, x, y) => (((Math.atan2(OV[1] - y, x - OV[0]) * 180 / Math.PI - (p.rot || 0)) + 540) % 360) - 180;
  const dosPartes = (name, d) => XG.figura(name, {
    ini: () => ({ x: 10 }),
    manijas: p => [{ k: 'x', min: d.min, max: p.a - d.min, paso: d.paso, inv: true, en: v => XPK.at(...OV, 112, (p.rot || 0) + v.x), de: (x, y) => giro(p, x, y) }],
    ok: (v, p) => d.ok(v.x, p), sol: p => ({ x: d.sol(p) }), texto: p => d.texto(p), alto: () => 200, pie: 'Arrastra el rayo OP.',
    dib(v, K, p, f) {
      const r = p.rot || 0, A = K.at(...OV, 128, r), B = K.at(...OV, 128, r + p.a), P = K.at(...OV, 112, r + v.x), n = R(v.x);
      const pone = (g, s, d2 = 142, cls = 's') => K.t(...K.at(OV[0], OV[1] + 5, d2, g), s, cls);
      return K.ang(OV, A, P, 46, gr(n), 'fa', 'ta') + K.ang(OV, P, B, 36, f > 0.5 ? gr(p.a - n) : '?', 'fg', 'tg') + K.l(...OV, ...A) + K.l(...OV, ...B) + K.l(...OV, ...P, 'la gr')
        + K.c(...OV, 4, 'fk') + pone(r, 'A') + pone(r + p.a, 'B') + pone(r + v.x, 'P', 131, 's ta') + K.t(OV[0] - 4, OV[1] + 20, 'O', 's') + K.t(8, 18, `∠AOB = ${p.a}°`, 'tm', 'start');
    },
    lee: (v, p) => `$${R(v.x)}^\\circ + ${p.a - R(v.x)}^\\circ = ${p.a}^\\circ$`,
    aviso: (v, p) => d.aviso(v.x, p), bien: (v, p) => d.bien(v.x, p),
  });
  dosPartes('bisectriz-traza', {
    min: 6, paso: 2, ok: (x, p) => 2 * x === p.a, sol: p => p.a / 2,
    texto: p => `$${p.a}^\\circ \\div 2 = ${p.a / 2}^\\circ$`,
    aviso: (x, p) => `∠AOP mide ${x}° y ∠POB mide ${p.a - x}°: no son congruentes.`,
    bien: x => `Dos ángulos congruentes de ${x}°: OP es la bisectriz.`,
  });
  const parte = p => (p.dif != null ? (p.a + p.dif) / 2 : p.a * p.k / (p.k + 1));
  dosPartes('parte-angulo', {
    min: 5, paso: 5, ok: (x, p) => (p.dif != null ? 2 * x - p.a === p.dif : x === p.k * (p.a - x)), sol: parte,
    texto: p => `$${parte(p)}^\\circ + ${p.a - parte(p)}^\\circ = ${p.a}^\\circ$`,
    aviso(x, p) {
      const y = p.a - x;
      if (p.dif != null) return y - x === p.dif ? 'Al revés: el mayor debe ser ∠AOP.' : `∠AOP = ${x}° y ∠POB = ${y}°: se llevan ${Math.abs(x - y)}°, no ${p.dif}°.`;
      return x * p.k === y ? 'Al revés: el mayor debe ser ∠AOP.' : `∠AOP = ${x}° y ∠POB = ${y}°: uno no es ${p.k} veces el otro.`;
    },
    bien: (x, p) => `∠AOP + ∠POB = ∠AOB: ${x}° + ${p.a - x}° = ${p.a}°.`,
  });

  XG.renglones('clase-angulo', { w: 84, x: 290 });

  // Rayos desde un punto: se tocan los ángulos que guardan con el dorado la relación pedida.
  //   params { rayos: [grados, crecientes], de: índice del dorado, pide: 'ady' | 'par' | 'opv' | 'sup' | 'comp' | 'cong', ver?, falta, ok }
  const CT = [170, 112];
  const sect = p => p.rayos.map((a, i) => { const b = i + 1 < p.rayos.length ? p.rayos[i + 1] : p.rayos[0] + 360; return { a, b, m: b - a }; });
  const otros = p => p.rayos.map((_, i) => i).filter(i => i !== p.de);
  const vecino = (p, j) => (j + 1) % p.rayos.length === p.de || (p.de + 1) % p.rayos.length === j;
  const guarda = (p, j) => {
    const S = sect(p), d = S[p.de], s = S[j];
    if (p.pide === 'ady') return vecino(p, j);
    if (p.pide === 'par') return vecino(p, j) && d.m + s.m === 180;
    if (p.pide === 'opv') return s.m === d.m && (s.a - d.a + 360) % 360 === 180;
    if (p.pide === 'sup') return d.m + s.m === 180;
    if (p.pide === 'comp') return d.m + s.m === 90;
    return s.m === d.m;
  };
  const rotulo = (p, j) => (p.ver ? gr(sect(p)[j].m) : `${j + 1}`);
  const tocados = p => otros(p).map((j, i) => (guarda(p, j) ? i : -1)).filter(i => i >= 0);
  XG.marca('angulos-toca', {
    sitios: p => otros(p).map(j => { const s = sect(p)[j], q = XPK.at(...CT, 66, (s.a + s.b) / 2); return { x: R(q[0]), y: R(q[1]), w: 40, h: 40, red: true }; }),
    cara(K, p, i, on) { const j = otros(p)[i], s = sect(p)[j], q = K.at(...CT, 66, (s.a + s.b) / 2); return K.t(R(q[0]), R(q[1]) + 5, rotulo(p, j), on ? 's ta' : 's'); },
    fondo(K, p) {
      const d = sect(p)[p.de];
      return K.sec(...CT, 46, d.a, d.b, 'fg') + K.t(...K.at(CT[0], CT[1] + 5, 68, (d.a + d.b) / 2), gr(d.m), 'tg') + p.rayos.map(a => K.l(...CT, ...K.at(...CT, 100, a))).join('') + K.c(...CT, 4, 'fk');
    },
    alto: () => 226, sol: tocados, nombre: (p, i) => `ángulo ${rotulo(p, otros(p)[i])}`,
    aviso(on, p) {
      const O = otros(p), S = sect(p), d = S[p.de], i = on.findIndex((x, k) => x && !guarda(p, O[k]));
      if (i < 0) return p.falta;
      const s = S[O[i]], v = vecino(p, O[i]);
      return { ady: 'Ese no tiene un lado común con el dorado: no son adyacentes.',
        par: v ? `Son adyacentes, pero juntos miden ${d.m + s.m}°: sus otros lados no son rayos opuestos.` : 'Un par lineal comparte un lado, y ese no lo comparte con el dorado.',
        opv: s.m === d.m ? 'Mide lo mismo, pero sus lados no son los rayos opuestos a los del dorado.' : 'Sus lados no son los rayos opuestos a los del dorado.',
        sup: `Con el dorado suma ${d.m + s.m}°, no 180°.`, comp: `Con el dorado suma ${d.m + s.m}°, no 90°.` }[p.pide] || `Ese mide ${s.m}°, no ${d.m}°.`;
    },
    bien: p => p.ok, texto: p => `${p.ver ? 'de' : tocados(p).length > 1 ? 'los ángulos' : 'el ángulo'} ${tocados(p).map(i => rotulo(p, otros(p)[i])).join(' y ')}`, pie: 'Toca todos los que cumplen.',
  });

  // Mediatriz: una recta que debe pasar por el punto medio de AB y ser perpendicular.  params { a, b, max, ini? }  v { x, g }
  const MX = (p, x) => 60 + x * 220 / p.max, MY = 118;
  XG.figura('mediatriz-pasa', {
    ini: p => ({ x: p.ini ?? p.a + 1, g: 60 }),
    manijas: p => [{ k: 'x', min: 1, max: p.max - 1, paso: 1, en: v => [MX(p, v.x), MY], de: x => (x - 60) * p.max / 220 },
      { k: 'g', min: 45, max: 135, paso: 15, inv: true, r: 9, en: v => XPK.at(MX(p, v.x), MY, 62, v.g), de: (x, y, v) => (y > MY ? (x < MX(p, v.x) ? 180 : 0) : Math.atan2(MY - y, x - MX(p, v.x)) * 180 / Math.PI) }],
    ok: (v, p) => 2 * v.x === p.a + p.b && v.g === 90,
    sol: p => ({ x: (p.a + p.b) / 2, g: 90 }),
    texto: p => `pasa por el punto medio, a ${(p.b - p.a) / 2} de cada extremo, y forma $90^\\circ$ con el segmento`,
    alto: () => 190, pie: 'Arrastra el pie de la recta y su punta.',
    dib(v, K, p, f) {
      const A = MX(p, p.a), B = MX(p, p.b), M = MX(p, v.x), T = K.at(M, MY, 62, v.g), U = K.at(M, MY, 50, v.g + 180), x = R(v.x), ver = f > 0.5;
      let h = '';
      for (let i = p.a; i <= p.b; i++) h += K.l(MX(p, i), MY - 4, MX(p, i), MY + 4, 'lm');
      return h + K.ang([M, MY], [M + 50, MY], T, 20, gr(v.g), 'fa', 'ta') + K.l(A, MY, B, MY, 'gr') + K.l(...U, ...T, 'la') + K.c(A, MY, 5, 'fk') + K.c(B, MY, 5, 'fk') + K.t(A - 14, MY + 5, 'A') + K.t(B + 14, MY + 5, 'B')
        + K.t((A + M) / 2, MY + 26, ver ? Math.abs(x - p.a) : '?', 'tg') + K.t((M + B) / 2, MY + 26, ver ? Math.abs(p.b - x) : '?', 'tg')
        + K.f(f * 2 - 1, R(v.g) === 90 ? K.pl([[M + 9, MY], [M + 9, MY - 9], [M, MY - 9]], 'lo') : '');
    },
    lee: (v, p) => `$AM = ${Math.abs(R(v.x) - p.a)}$, $MB = ${Math.abs(p.b - R(v.x))}$ y el ángulo mide $${R(v.g)}^\\circ$`,
    aviso(v, p) {
      const m = 2 * v.x === p.a + p.b;
      return m ? 'Pasa por el punto medio, pero no forma ángulo recto con AB.' : v.g === 90 ? `Es perpendicular, pero no pasa por el punto medio: AM = ${Math.abs(v.x - p.a)} y MB = ${Math.abs(p.b - v.x)}.` : 'Ni pasa por el punto medio ni es perpendicular a AB.';
    },
    bien: (v, p) => `Perpendicular a AB y por su punto medio: AM = MB = ${(p.b - p.a) / 2}.`,
  });

  // ------------------------------------------------------------------------------------------------------ lección 3 · polígonos
  // Figuras en una rejilla de tres por fila; se tocan las que cumplen.
  //   params { figs: [{ p: [[x, y], …] en un cuadro de 0 a 10 (y hacia arriba), ab?: abierta, r?: radio de un círculo, si?, no? }], falta, ok }
  const celda = i => [62 + (i % 3) * 108, 54 + Math.floor(i / 3) * 104];
  const cumplen = p => p.figs.map((_, i) => i).filter(i => p.figs[i].si);
  XG.marca('poligonos-toca', {
    sitios: p => p.figs.map((_, i) => { const [x, y] = celda(i); return { x, y, w: 100, h: 96 }; }),
    cara(K, p, i) {
      const [cx, cy] = celda(i), g = p.figs[i], n = K.t(cx - 40, cy - 32, i + 1, 's tm');
      if (g.r) return n + K.c(cx, cy, g.r * 6.4, 'fn');
      const P = g.p.map(([x, y]) => [cx - 32 + x * 6.4, cy + 34 - y * 6.4]);
      return n + (g.ab ? K.pl(P) : K.p(P, 'fn'));
    },
    alto: p => Math.ceil(p.figs.length / 3) * 104 + 6, sol: cumplen, nombre: (p, i) => `figura ${i + 1}`,
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.figs[k].si); return i >= 0 ? p.figs[i].no : p.falta; },
    bien: p => p.ok, texto: p => `las figuras ${cumplen(p).map(i => i + 1).join(', ')}`, pie: 'Toca todas las que cumplen.',
  });

  XG.renglones('nombre-poligono', { w: 112, x: 276 });

  // Polígono de n lados: lados, diagonales por vértice y diagonales en total.  params { n, et, metas, fichas, mira, trampas, ok }
  const diags = n => { const l = []; for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) if (i || j < n - 1) l.push([i, j]); return l; };
  XG.cuenta('poligono-cuenta', 150, (K, p, f) => {
    const P = ronda(K, p.n, 64, [170, 76]), D = diags(p.n);
    return K.f(f * 2 - 1, D.filter(d => d[0]).map(([i, j]) => K.l(...P[i], ...P[j], 'lr')).join('')) + K.f(f * 2, D.filter(d => !d[0]).map(([i, j]) => K.l(...P[i], ...P[j], 'la')).join(''))
      + K.p(P, 'fn') + P.map((q, i) => K.c(...q, i ? 3.5 : 5.5, i ? 'fk' : 'fA')).join('');
  });

  // Un cuadrilátero de lados w y `lado` con ángulo g: regular solo si es equilátero y equiángulo.  params { lado, ini? }  v { w, g }
  const RA = [90, 172], RU = 16;
  XG.figura('regular-arma', {
    ini: p => ({ w: p.ini ?? p.lado + 3, g: 60 }),
    manijas: p => [{ k: 'w', min: 3, max: 10, paso: 1, en: v => [RA[0] + v.w * RU, RA[1]], de: x => (x - RA[0]) / RU },
      { k: 'g', min: 50, max: 130, paso: 10, inv: true, en: v => XPK.at(...RA, p.lado * RU, v.g), de: (x, y) => (y > RA[1] ? (x < RA[0] ? 180 : 0) : Math.atan2(RA[1] - y, x - RA[0]) * 180 / Math.PI) }],
    ok: (v, p) => v.w === p.lado && v.g === 90,
    sol: p => ({ w: p.lado, g: 90 }),
    texto: p => `cuatro lados de ${p.lado} y cuatro ángulos de $90^\\circ$: un cuadrado`,
    alto: () => 200, pie: 'Arrastra los dos vértices que brillan.',
    dib(v, K, p, f) {
      const B = [RA[0] + v.w * RU, RA[1]], D = K.at(...RA, p.lado * RU, v.g), C = [B[0] + D[0] - RA[0], D[1]], w = R(v.w), g = R(v.g), si = w === p.lado && g === 90;
      return K.p([RA, B, C, D], f > 0.5 && si ? 'fo' : 'fa') + K.ang(RA, B, D, 22, gr(g), 'fg', 'tg') + K.t((RA[0] + B[0]) / 2, RA[1] + 20, w, 'ta') + K.t((RA[0] + D[0]) / 2 - 14, (RA[1] + D[1]) / 2, p.lado, 'ta')
        + K.f(f * 2 - 1, K.t(8, 18, `lados: ${w}, ${p.lado}, ${w} y ${p.lado}`, 's tm', 'start') + K.t(8, 36, `ángulos: ${g}°, ${180 - g}°, ${g}° y ${180 - g}°`, 's tm', 'start'));
    },
    lee: (v, p) => `lados de ${R(v.w)} y ${p.lado}; ángulos de $${R(v.g)}^\\circ$ y $${180 - R(v.g)}^\\circ$`,
    aviso: (v, p) => (v.g === 90 ? 'Es equiángulo, un rectángulo, pero sus lados no son todos congruentes.' : v.w === p.lado ? 'Es equilátero, un rombo, pero sus ángulos no son todos congruentes.' : 'Ni sus lados ni sus ángulos son congruentes entre sí.'),
    bien: () => 'Equilátero y equiángulo a la vez: es regular. Es un cuadrado.',
  });

  // Elementos de la circunferencia, numerados en el dibujo.  params { partes: ['radio', 'cuerda', 'diámetro', 'arco', 'centro', 'tangente'], fichas }
  const CC = [108, 108], CR = 76, CP = g => XPK.at(...CC, CR, g);
  const PARTE = {
    radio: ['El radio une el centro con un punto de la circunferencia.', K => K.l(...CC, ...CP(110), 'la gr'), () => [78, 68]],
    cuerda: ['La cuerda une dos puntos de la circunferencia; esta no pasa por el centro.', K => K.l(...CP(240), ...CP(300), 'la gr'), () => [108, 160]],
    'diámetro': ['El diámetro es la cuerda que pasa por el centro.', K => K.l(...CP(200), ...CP(20), 'la gr'), () => [150, 108]],
    arco: ['El arco es un pedazo de la circunferencia misma, no un segmento.', K => K.arc(...CC, CR, 35, 85, 'lg gr'), () => XPK.at(...CC, CR + 15, 60)],
    centro: ['El centro es el punto que está a igual distancia de toda la circunferencia.', () => '', () => [112, 126]],
    tangente: ['La tangente es la recta que toca la circunferencia en un solo punto.', K => K.l(...K.at(...CP(160), 44, 70), ...K.at(...CP(160), 44, 250), 'lg gr'), () => [20, 140]],
  };
  XG.rotula('circulo-partes', {
    slots: p => p.partes.map((_, i) => ({ x: 282, y: 40 + i * 46, w: 96, h: 38 })),
    fichas: p => p.fichas, metas: p => p.partes, texto: p => p.partes.map((t, i) => `${i + 1}: ${t}`).join('; '), alto: p => Math.max(200, 22 + p.partes.length * 46),
    fondo: (K, p) => K.c(...CC, CR, 'fn') + p.partes.map(t => PARTE[t][1](K)).join('') + K.c(...CC, 3.5, 'fk') + (p.partes.includes('centro') ? '' : K.t(118, 126, 'O', 's'))
      + p.partes.map((t, i) => { const [x, y] = PARTE[t][2](); return K.c(x, y, 9, 'fc') + K.t(x, y + 4, i + 1, 's') + K.t(222, 45 + i * 46, i + 1, 'tm'); }).join(''),
    aviso(q, p) { const i = p.partes.findIndex((m, k) => q[k][0] !== m); return PARTE[p.partes[i]][0]; },
    bien: () => 'Cada elemento de la circunferencia quedó con su nombre.',
  });

  // En movimiento: se lanza una cantidad y la escena la traza.  tiros { q, r, c, e?, modo: 'diag' | 'vert' (con n) | 'lados' }
  XG.tiros('lanza-diagonales', {
    perilla: () => ({ et: 'Cantidad', min: 0, max: 40, cara: v => v, lee: v => `${v}` }),
    meta: t => t.r, alto: 186, ms: 1600,
    dib(t, v, K, p, f) {
      const c = [170, 100], u = Math.min(1, f * 1.25);
      if (t.modo === 'lados') {
        if (v == null) return K.arc(...c, 78, 0, 360, 'lm d') + K.t(170, 109, '?', 'B tm');
        const n = v < 3 ? v : 3 + R((v - 3) * u), P = ronda(K, Math.max(n, 1), 78, c);
        return (n >= 3 ? K.p(P, 'fa') : n === 2 ? K.l(...P[0], ...P[1]) : '') + P.map(q => K.c(...q, 3, 'fk')).join('') + K.t(8, 18, `${n} lados`, 'tm', 'start')
          + (n >= 3 ? K.f(f * 3 - 2, K.t(332, 18, `${n * (n - 3) / 2} diagonales`, v === t.r ? 'to' : 'tf', 'end')) : '');
      }
      const P = ronda(K, t.n, 78, c), ve = t.modo === 'vert', D = diags(t.n).filter(d => !ve || !d[0]), k = v == null ? 0 : R(Math.min(v, D.length) * u);
      return K.p(P, 'fn') + D.slice(0, k).map(([i, j]) => K.l(...P[i], ...P[j], 'la')).join('') + P.map((q, i) => K.c(...q, ve && !i ? 6 : 3.5, ve && !i ? 'fA' : 'fk')).join('')
        + (v == null ? '' : K.t(8, 22, R(v * u), 'b ta', 'start') + K.f(f * 3 - 2, K.t(332, 18, v === t.r ? 'justas' : v > t.r ? 'no hay tantas' : 'quedan sin trazar', v === t.r ? 'to' : 'tf', 'end')));
    },
    falla: (t, v) => t.e?.[v] || (t.modo === 'lados' ? (v > t.r ? 'Con tantos lados salen más diagonales.' : 'Con tan pocos lados no salen tantas diagonales.') : v > t.r ? 'Te pasaste: no hay tantas diagonales.' : 'Te faltaron diagonales por contar.'),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira hasta tu cuenta y suelta.',
  });
})();
;
//#archivo js/games/euc-escena-3.js
// Geometría Euclidiana · mundo 3 «euc-triangulo»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Triángulos con sus marcas (rayitas en los lados congruentes, arcos de color en los ángulos congruentes, esquina en el recto). La
// escena no dice el resultado mientras se responde: al comprobar (f → 1) cierra el triángulo, mide o nombra lo que se armó.
(() => {
  const rad = g => g * Math.PI / 180, R = Math.round, r1 = x => Math.round(x * 10) / 10;
  const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]), d2 = (P, Q) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2;
  const mid = (P, Q, t = 0.5) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const cen = T => [(T[0][0] + T[1][0] + T[2][0]) / 3, (T[0][1] + T[1][1] + T[2][1]) / 3];
  const fuera = (P, G, d) => { const L = dist(P, G) || 1; return [P[0] + (P[0] - G[0]) / L * d, P[1] + (P[1] - G[1]) / L * d]; };
  const rot = (K, P, G, t, cls = 's', d = 11) => { const [x, y] = fuera(P, G, d); return K.t(x, y + 4, t, cls); };
  // n rayitas que cruzan el segmento PQ por su mitad.
  const ray = (K, P, Q, n = 1, cls = '') => {
    const L = dist(P, Q) || 1, ux = (Q[0] - P[0]) / L, uy = (Q[1] - P[1]) / L, M = mid(P, Q); let h = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 4, x = M[0] + ux * o, y = M[1] + uy * o; h += K.l(x - uy * 5, y + ux * 5, x + uy * 5, y - ux * 5, cls); }
    return h;
  };
  // Esquina recta en V, entre VP y VQ.
  const esc = (K, V, P, Q, s = 8) => { const a = dist(V, P) || 1, b = dist(V, Q) || 1, u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s]; return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm'); };
  const raiz = n => (Number.isInteger(Math.sqrt(n)) ? `${Math.sqrt(n)}` : `√${n}`);
  // Puntos (con y hacia arriba) llevados a una caja de w × h centrada en (cx, cy).
  const encaja = (pts, cx, cy, w, h) => {
    const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), s = Math.min(w / ((x1 - x0) || 1), h / ((y1 - y0) || 1));
    return pts.map(([x, y]) => [cx + (x - (x0 + x1) / 2) * s, cy - (y - (y0 + y1) / 2) * s]);
  };
  // Un segmento largo por M con dirección d, recortado a una caja.
  const corta = (M, d, x0, y0, x1, y1) => {
    let a = -1e9, b = 1e9;
    [[M[0], d[0], x0, x1], [M[1], d[1], y0, y1]].forEach(([m, k, lo, hi]) => { if (Math.abs(k) < 1e-9) return; const t1 = (lo - m) / k, t2 = (hi - m) / k; a = Math.max(a, Math.min(t1, t2)); b = Math.min(b, Math.max(t1, t2)); });
    return [M[0] + d[0] * a, M[1] + d[1] * a, M[0] + d[0] * b, M[1] + d[1] * b];
  };

  // ----------------------------------------------------------------------------------------- los dos apellidos de un triángulo
  // Por lados (con las medidas o con sus cuadrados) y por ángulos (con los cuadrados de los lados o con los grados).
  const LAD = ([a, b, c]) => (a === b && b === c ? 'equilátero' : a === b || b === c || a === c ? 'isósceles' : 'escaleno');
  const ANG2 = q => { const [x, y, z] = [...q].sort((m, n) => m - n); return z === x + y ? 'rectángulo' : z > x + y ? 'obtusángulo' : 'acutángulo'; };
  const ANGG = g => (g.some(x => x === 90) ? 'rectángulo' : g.some(x => x > 90) ? 'obtusángulo' : 'acutángulo');
  const POR = { escaleno: 'tiene sus tres lados distintos', 'isósceles': 'tiene dos lados congruentes', 'equilátero': 'tiene sus tres lados congruentes', 'acutángulo': 'tiene sus tres ángulos agudos', 'rectángulo': 'tiene un ángulo recto', 'obtusángulo': 'tiene un ángulo obtuso' };
  const DELADO = ['escaleno', 'isósceles', 'equilátero'];

  // Seis triángulos con sus medidas: se tocan los del tipo pedido.  params { por: 'lados' | 'angulos', tris: [[a, b, c] | [A, B, C]], pide }
  const tipoT = (p, t) => (p.por === 'angulos' ? ANGG(t) : LAD(t));
  const ptsT = (p, t) => {
    if (p.por === 'angulos') { const [A, B, C] = t.map(rad), b = Math.sin(B) / Math.sin(C); return [[0, 0], [1, 0], [b * Math.cos(A), b * Math.sin(A)]]; }
    const [a, b, c] = t, x = (b * b + c * c - a * a) / (2 * c); return [[0, 0], [c, 0], [x, Math.sqrt(Math.max(0, b * b - x * x))]];
  };
  const SIT = i => ({ x: 58 + (i % 3) * 112, y: 52 + Math.floor(i / 3) * 100, w: 106, h: 94 });
  const solT = p => p.tris.map((_, i) => i).filter(i => tipoT(p, p.tris[i]) === p.pide);
  XG.marca('clasifica-triangulos', {
    sitios: p => p.tris.map((_, i) => SIT(i)), alto: p => Math.ceil(p.tris.length / 3) * 100 + 4, nombre: (p, i) => `triángulo ${i + 1}: ${p.tris[i].join(', ')}`,
    cara(K, p, i) {
      const s = SIT(i), t = p.tris[i], T = encaja(ptsT(p, t), s.x, s.y, 56, 38), G = cen(T);
      if (p.por === 'angulos') return K.p(T, 'fn') + T.map((V, k) => (t[k] === 90 ? esc(K, V, T[(k + 1) % 3], T[(k + 2) % 3], 6) : '') + rot(K, V, G, `${t[k]}°`, 's', 13)).join('');
      return K.p(T, 'fn') + rot(K, mid(T[1], T[2]), G, t[0], 's', 10) + rot(K, mid(T[2], T[0]), G, t[1], 's', 10) + rot(K, mid(T[0], T[1]), G, t[2], 's', 10);
    },
    sol: solT,
    aviso(on, p) { const i = on.findIndex((x, k) => x && tipoT(p, p.tris[k]) !== p.pide); if (i < 0) return `Falta alguno: busca cada triángulo que ${POR[p.pide]}.`; const t = tipoT(p, p.tris[i]); return `El de ${p.tris[i].join(', ')} ${POR[t]}: es ${t}, no ${p.pide}.`; },
    bien: p => `Cada uno de esos ${POR[p.pide]}: es ${p.pide}.`,
    texto: p => solT(p).map(i => p.tris[i].map(x => `${x}${p.por === 'angulos' ? '°' : ''}`).join(', ')).join('; '), pie: 'Toca todos los que cumplen. Otro toque los quita.',
  });

  // Un triángulo con sus marcas: su nombre por lados y su nombre por ángulos.  params { pts: [[x, y] × 3] enteros, fichas }
  const cuad = p => [d2(p.pts[1], p.pts[2]), d2(p.pts[2], p.pts[0]), d2(p.pts[0], p.pts[1])];
  const metasAp = p => [LAD(cuad(p)), ANG2(cuad(p))];
  XG.rotula('dos-apellidos', {
    slots: () => [{ x: 92, y: 172, w: 124, h: 38 }, { x: 248, y: 172, w: 124, h: 38 }], fichas: p => p.fichas, metas: metasAp, alto: () => 198,
    texto: p => metasAp(p).join(' y '),
    fondo(K, p) {
      const T = encaja(p.pts, 170, 66, 210, 92), q = cuad(p), S = [[T[1], T[2]], [T[2], T[0]], [T[0], T[1]]], tl = LAD(q);
      const n = k => (tl === 'equilátero' ? 1 : tl === 'escaleno' ? k + 1 : q.filter(x => x === q[k]).length === 2 ? 1 : 2);
      const mayor = q.indexOf(Math.max(...q)), ta = ANG2(q), V = T[mayor], W = S[mayor];
      return K.p(T, 'fn') + S.map(([P, Q], k) => ray(K, P, Q, n(k))).join('') + (ta === 'rectángulo' ? esc(K, V, W[0], W[1], 10) : ta === 'obtusángulo' ? K.ang(V, W[0], W[1], 16, '', 'ff') : '')
        + K.t(92, 144, 'por sus lados', 's tm') + K.t(248, 144, 'por sus ángulos', 's tm');
    },
    aviso(q, p) {
      const m = metasAp(p);
      if (q[0][0] !== m[0]) return DELADO.includes(q[0][0]) ? `Cuenta las rayitas: ${POR[m[0]]}.` : 'Por sus lados solo puede ser escaleno, isósceles o equilátero.';
      return DELADO.includes(q[1][0]) ? 'Por sus ángulos solo puede ser acutángulo, rectángulo u obtusángulo.' : `Mira el ángulo más abierto: ${POR[m[1]]}.`;
    },
    bien: p => `Es ${metasAp(p).join(' y ')}: un nombre por los lados y otro por los ángulos.`,
  });

  // Se arrastra el vértice C por la cuadrícula hasta que el triángulo tenga los tipos pedidos.  params { A, B (x de la base), pide: [tipos], sol: [x, y], ini: [x, y] }
  const GX = x => 26 + x * 24, GY = y => 196 - y * 24;
  const cuadV = (v, p) => [d2([p.B, 0], [v.x, v.y]), d2([v.x, v.y], [p.A, 0]), (p.B - p.A) ** 2];
  const tiposV = (v, p) => [LAD(cuadV(v, p)), ANG2(cuadV(v, p))];
  const NOCUMPLE = { 'isósceles': 'ningún par de lados mide lo mismo', escaleno: 'tiene dos lados congruentes', 'equilátero': 'sus lados no miden lo mismo', 'rectángulo': 'ningún ángulo es recto', 'obtusángulo': 'ningún ángulo pasa de 90°', 'acutángulo': 'tiene un ángulo que no es agudo' };
  XG.figura('vertice-tipo', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 1], max: [12, 7], paso: 1, en: v => [GX(v.x), GY(v.y)], de: (x, y) => [(x - 26) / 24, (196 - y) / 24] }],
    ok: (v, p) => p.pide.every(t => tiposV(v, p).includes(t)),
    sol: p => ({ x: p.sol[0], y: p.sol[1] }),
    texto: p => `$C$ en $(${p.sol[0] - p.A},\\ ${p.sol[1]})$ desde $A$: ${p.pide.join(' y ')}`,
    alto: () => 216, pie: 'Arrastra el vértice C por la cuadrícula.',
    dib(v, K, p, f) {
      const A = [GX(p.A), GY(0)], B = [GX(p.B), GY(0)], C = [GX(v.x), GY(v.y)], T = [A, B, C], G = cen(T), q = cuadV({ x: R(v.x), y: R(v.y) }, p), S = [[B, C], [C, A], [A, B]];
      let h = '';
      for (let x = 0; x <= 12; x++) for (let y = 0; y <= 7; y++) h += K.c(GX(x), GY(y), 1.3, 'fM');
      h += K.p(T, 'fn') + K.t(A[0], A[1] + 16, 'A', 's') + K.t(B[0], B[1] + 16, 'B', 's') + K.t(C[0], C[1] - 16, 'C', 's ta');
      const recto = [0, 1, 2].find(k => q[k] === q[(k + 1) % 3] + q[(k + 2) % 3]);
      return h + K.f(f, S.map(([P, Q], k) => rot(K, mid(P, Q), G, raiz(q[k]), 's ta', 12) + (q.filter(x => x === q[k]).length > 1 ? ray(K, P, Q, 1, 'la') : '')).join('') + (recto != null ? esc(K, T[recto], S[recto][0], S[recto][1], 9) : ''));
    },
    aviso(v, p) { const t = tiposV(v, p), falta = p.pide.find(x => !t.includes(x)); return `Quedó ${t.join(' y ')}: ${NOCUMPLE[falta]}.`; },
    bien: (v, p) => `Es ${tiposV(v, p).join(' y ')}: cumple lo pedido.`,
  });

  // --------------------------------------------------------------------------------------------- altura, mediana y bisectriz
  // Tres segmentos, uno desde cada vértice, con sus marcas: se nombra cada uno.  params { de: [desde A, desde B, desde C], fichas }
  const NS = [[150, 30], [62, 166], [286, 166]];
  const pieN = (k, tipo) => {
    const V = NS[k], P = NS[(k + 1) % 3], Q = NS[(k + 2) % 3];
    if (tipo === 'mediana') return mid(P, Q);
    if (tipo === 'bisectriz') return mid(P, Q, dist(V, P) / (dist(V, P) + dist(V, Q)));
    return mid(P, Q, ((V[0] - P[0]) * (Q[0] - P[0]) + (V[1] - P[1]) * (Q[1] - P[1])) / d2(P, Q));
  };
  const QUEES = { altura: 'Cae a escuadra sobre el lado opuesto: es una altura.', mediana: 'Llega al punto medio del lado opuesto: es una mediana.', bisectriz: 'Parte el ángulo en dos ángulos congruentes: es una bisectriz.' };
  const SLN = [{ x: 170, y: 196, w: 92, h: 34 }, { x: 290, y: 78, w: 92, h: 34 }, { x: 50, y: 78, w: 92, h: 34 }];
  XG.rotula('nombra-segmentos', {
    slots: () => SLN, fichas: p => p.fichas, metas: p => p.de, alto: () => 218,
    texto: p => p.de.map((t, k) => `desde ${'ABC'[k]}, la ${t}`).join('; '),
    fondo(K, p) {
      const G = cen(NS), C = ['la', 'lg', 'lf'], F = ['fa', 'fg', 'ff'];
      return K.p(NS, 'fn') + NS.map((V, k) => rot(K, V, G, 'ABC'[k], '', 13)).join('') + p.de.map((t, k) => {
        const V = NS[k], P = NS[(k + 1) % 3], Q = NS[(k + 2) % 3], D = pieN(k, t), s = SLN[k];
        return (t === 'bisectriz' ? K.ang(V, P, D, 26, '', F[k]) + K.ang(V, D, Q, 20, '', F[k]) : '') + K.l(...V, ...D, `${C[k]} gr`) + (t === 'altura' ? esc(K, D, V, Q, 8) : t === 'mediana' ? ray(K, P, D, 1, C[k]) + ray(K, D, Q, 1, C[k]) : '')
          + K.l(...D, s.x + (k === 1 ? -46 : k === 2 ? 46 : 0), s.y - (k ? 0 : 17), 'lm d');
      }).join('');
    },
    aviso(q, p) { const i = p.de.findIndex((m, k) => q[k][0] !== m); return q[i][0] === 'mediatriz' ? 'La mediatriz no tiene que salir de un vértice: es la perpendicular por el punto medio de un lado.' : `Desde ${'ABC'[i]}: mira su marca. ${QUEES[p.de[i]]}`; },
    bien: () => 'Altura: a escuadra. Mediana: al punto medio. Bisectriz: parte el ángulo.',
  });

  // El pie P corre por el lado BC hasta que AP sea el segmento pedido.  params { A: [x, alto], c (BC), pide, ini? }
  const PN = p => { const u = 252 / p.c, YB = 24 + p.A[1] * u; return { u, YB, A: [44 + p.A[0] * u, 24], B: [44, YB], C: [296, YB] }; };
  const pies = p => { const AB = Math.hypot(p.A[0], p.A[1]), AC = Math.hypot(p.c - p.A[0], p.A[1]); return { altura: p.A[0], mediana: p.c / 2, bisectriz: p.c * AB / (AB + AC) }; };
  const cual = (v, p) => Object.entries(pies(p)).find(([, x]) => Math.abs(x - v.t) < 1e-6)?.[0];
  const angsP = (v, p) => { const [a, h] = p.A, g = x => Math.atan(x / h) * 180 / Math.PI; return [g(a) + g(v.t - a), g(p.c - a) - g(v.t - a), Math.atan2(h, a - v.t) * 180 / Math.PI].map(R); };
  XG.figura('pie-notable', {
    ini: p => ({ t: p.ini ?? 3 }),
    manijas: p => [{ k: 't', min: 1, max: p.c - 1, paso: 1, en: v => [44 + v.t * PN(p).u, PN(p).YB], de: x => (x - 44) / PN(p).u }],
    ok: (v, p) => cual(v, p) === p.pide,
    sol: p => ({ t: R(pies(p)[p.pide] * 2) / 2 }),
    texto: p => `la ${p.pide} llega a $${r1(pies(p)[p.pide])}$ de $B$`,
    alto: p => PN(p).YB + 50, pie: 'Arrastra el pie P por el lado BC.',
    dib(v, K, p, f) {
      const g = PN(p), P = [44 + v.t * g.u, g.YB], q = cual({ t: r1(v.t) }, p), [x, y, z] = angsP(v, p);
      let h = K.p([g.A, g.B, g.C], 'fn');
      for (let k = 0; k <= p.c; k++) h += K.l(44 + k * g.u, g.YB, 44 + k * g.u, g.YB + (k % 5 ? 4 : 8), 'lm');
      return h + K.ang(g.A, g.B, P, 30, `${x}°`, 'fa', 's ta') + K.ang(g.A, P, g.C, 30, `${y}°`, 'fg', 's tg') + K.ang(P, g.C, g.A, 13, '', 'ff') + K.t(P[0] + (v.t > p.c - 5 ? -26 : 28), g.YB - 7, `${z}°`, 's tf')
        + K.l(...g.A, ...P, 'la gr') + K.t(g.A[0], 15, 'A', 's') + K.t(30, g.YB + 5, 'B', 's') + K.t(310, g.YB + 5, 'C', 's')
        + K.t((44 + P[0]) / 2, g.YB + 24, r1(v.t), 's') + K.t((P[0] + 296) / 2, g.YB + 24, r1(p.c - v.t), 's')
        + K.f(f, (q === 'altura' ? esc(K, P, g.C, g.A) : '') + (q === 'mediana' ? ray(K, g.B, P, 2, 'la') + ray(K, P, g.C, 2, 'la') : '') + K.t(170, g.YB + 44, q ? `AP es la ${q}.` : 'AP no es altura, mediana ni bisectriz.', q === p.pide ? 's to' : 's tf'));
    },
    lee: (v, p) => `$BP = ${r1(v.t)},\\ PC = ${r1(p.c - v.t)}$`,
    aviso(v, p) {
      const q = cual(v, p), [x, y, z] = angsP(v, p);
      if (q) return `Esa es la ${q}, y se pidió la ${p.pide}. ${QUEES[p.pide].replace(/: es una .*$/, '.')}`;
      return p.pide === 'mediana' ? `BP mide ${v.t} y PC mide ${p.c - v.t}: P no es el punto medio.` : p.pide === 'altura' ? `AP no cae a escuadra: el ángulo en P mide ${z}°.` : `Los dos ángulos en A quedaron de ${x}° y ${y}°: no son congruentes.`;
    },
    bien: (v, p) => QUEES[p.pide].replace('una', 'la'),
  });

  // Lados y ángulos de un triángulo que se tocan: el opuesto, el comprendido…  params { n: 'PQR', sol: [nombres], no: { nombre: aviso }, mira, falta, ok }
  const OC = [[170, 52], [72, 156], [268, 156]];
  const elsOC = p => { const n = p.n || 'ABC'; return [n[0], n[1], n[2], n[1] + n[2], n[0] + n[2], n[0] + n[1]]; };
  const sitOC = [{ x: 170, y: 28, w: 42, h: 42, red: true }, { x: 46, y: 172, w: 42, h: 42, red: true }, { x: 294, y: 172, w: 42, h: 42, red: true }, { x: 170, y: 172, w: 58, h: 32 }, { x: 240, y: 98, w: 58, h: 32 }, { x: 100, y: 98, w: 58, h: 32 }];
  XG.marca('opuesto-comprendido', {
    sitios: () => sitOC, alto: () => 200, nombre: (p, i) => `${i < 3 ? 'ángulo' : 'lado'} ${elsOC(p)[i]}`,
    cara: (K, p, i) => K.t(sitOC[i].x, sitOC[i].y + 5, elsOC(p)[i], i < 3 ? 'b' : 's'),
    fondo: K => K.ang(OC[0], OC[1], OC[2], 20, '', 'fa') + K.ang(OC[1], OC[2], OC[0], 20, '', 'fg') + K.ang(OC[2], OC[0], OC[1], 20, '', 'ff') + K.p(OC, 'fn'),
    sol: p => p.sol.map(x => elsOC(p).indexOf(x)),
    aviso(on, p) { const e = elsOC(p), i = on.findIndex((x, k) => x && !p.sol.includes(e[k])); return i < 0 ? p.falta : p.no?.[e[i]] || p.mira; },
    bien: p => p.ok, texto: p => p.sol.map(x => (x.length === 1 ? `∠${x}` : x)).join(' y '), pie: 'Toca lados (las fichas) o ángulos (los círculos).',
  });

  // ------------------------------------------------------------------------------------------------- congruencia y criterios
  // Dos triángulos congruentes con las mismas marcas: se pone la parte que corresponde.  params { corr: 'EFD', pide: ['∠A', 'AB', 'BC'], fichas, gira?, esp? }
  const T0 = [[-34, 18], [36, 18], [14, -34]];
  const copia = p => { const g = rad(p.gira ?? 150), c = Math.cos(g), s = Math.sin(g); return T0.map(([x, y]) => { const m = p.esp ? -x : x; return [252 + m * c - y * s, 84 + m * s + y * c]; }); };
  const marcado = (K, T, n) => { const G = cen(T); return K.ang(T[0], T[1], T[2], 14, '', 'fa') + K.ang(T[1], T[2], T[0], 14, '', 'fg') + K.ang(T[2], T[0], T[1], 14, '', 'ff') + K.p(T, 'fn') + ray(K, T[0], T[1], 1) + ray(K, T[1], T[2], 2) + ray(K, T[2], T[0], 3) + T.map((V, k) => rot(K, V, G, n[k], '', 14)).join(''); };
  const corrDe = (p, s) => (s[0] === '∠' ? `∠${p.corr['ABC'.indexOf(s[1])]}` : [...s].map(ch => p.corr['ABC'.indexOf(ch)]).sort().join(''));
  const metasPC = p => p.pide.map(s => corrDe(p, s));
  const SPC = [62, 170, 278];
  XG.rotula('partes-correspondientes', {
    slots: p => p.pide.map((_, i) => ({ x: SPC[i], y: 190, w: 84, h: 36 })), fichas: p => p.fichas, metas: metasPC, alto: () => 214,
    texto: p => p.pide.map((s, i) => `${s} ≅ ${metasPC(p)[i]}`).join('; '),
    fondo: (K, p) => marcado(K, T0.map(([x, y]) => [88 + x, 84 + y]), 'ABC') + marcado(K, copia(p), p.corr) + p.pide.map((s, i) => K.t(SPC[i], 162, `${s} ≅`, 's')).join(''),
    aviso(q, p) {
      const m = metasPC(p), i = m.findIndex((x, k) => q[k][0] !== x), s = p.pide[i];
      if (s[0] === '∠') return `El arco de ∠${s[1]} tiene un color: busca en el otro triángulo el ángulo con ese mismo color.`;
      const n = { C: 'una rayita', A: 'dos rayitas', B: 'tres rayitas' }['ABC'.replace(s[0], '').replace(s[1], '')];
      return `El lado ${s} lleva ${n}: su pareja es el lado con ${n} en el otro triángulo.`;
    },
    bien: p => `△ABC ≅ △${p.corr}: cada parte con la que ocupa su mismo lugar.`,
  });

  // Qué garantizan las marcas de un par.  S: lados marcados (0 = BC, 1 = CA, 2 = AB); A: ángulos marcados (0 = A, 1 = B, 2 = C); r: C es recto.
  function criterio(S, A, r) {
    const s = S.length, a = A.length;
    if (r) { const hip = S.includes(2), cat = S.filter(i => i !== 2).length; return cat === 2 ? 'C-C' : hip && cat ? 'H-C' : hip && a ? 'H-A' : cat && a ? 'C-A' : a >= 2 ? 'A-A-A' : 'ninguno'; }
    if (s === 3) return 'L-L-L';
    if (s === 2) { const k = [0, 1, 2].find(i => !S.includes(i)); return A.includes(k) ? 'L-A-L' : a >= 2 ? 'L-A-A' : a ? 'L-L-A' : 'ninguno'; }
    if (s === 1) return a >= 2 ? (A.includes(S[0]) && a < 3 ? 'L-A-A' : 'A-L-A') : 'ninguno';
    return a >= 3 ? 'A-A-A' : 'ninguno';
  }
  const crit = c => criterio(c.l || [], c.a || [], c.r), VALE = c => !['L-L-A', 'A-A-A', 'ninguno'].includes(c);
  const TIENE = { 'L-L-L': 'los tres lados', 'L-A-L': 'dos lados y el ángulo que forman', 'A-L-A': 'dos ángulos y el lado que los une', 'L-A-A': 'dos ángulos y un lado que no está entre ellos', 'C-C': 'los dos catetos', 'C-A': 'un cateto y un ángulo agudo', 'H-A': 'la hipotenusa y un ángulo agudo', 'H-C': 'la hipotenusa y un cateto',
    'L-L-A': 'dos lados y un ángulo que no está entre ellos: pueden salir dos triángulos distintos', 'A-A-A': 'solo ángulos: la misma forma, pero el tamaño puede cambiar', ninguno: 'muy pocas marcas: faltan datos' };
  const VT = r => (r ? [[-24, -20], [26, 18], [-24, 18]] : [[-28, 20], [28, 20], [10, -22]]);
  // Un par de triángulos (el segundo, en espejo) con las marcas del caso.
  function par(K, cx, cy, c, s = 1, dx = 38, nom = null) {
    const uno = (m, n) => {
      const V = VT(c.r).map(([x, y]) => [cx + m * dx + m * x * s * (c.r ? 1 : 1), cy + y * s]), G = cen(V), S = [[V[1], V[2]], [V[2], V[0]], [V[0], V[1]]];
      return (c.a || []).map((j, k) => K.ang(V[j], V[(j + 1) % 3], V[(j + 2) % 3], 12 * s, '', ['fa', 'fg', 'ff'][k])).join('') + (c.r ? esc(K, V[2], V[0], V[1], 7 * s) : '') + K.p(V, 'fn')
        + (c.l || []).map((i, k) => K.l(...S[i][0], ...S[i][1], 'gr') + ray(K, S[i][0], S[i][1], k + 1, 'gr')).join('') + (n ? V.map((P, k) => rot(K, P, G, n[k], '', 13)).join('') : '');
    };
    return uno(-1, nom?.[0]) + uno(1, nom?.[1]);
  }
  const SPM = i => ({ x: 88 + (i % 2) * 164, y: 54 + Math.floor(i / 2) * 106, w: 158, h: 100 });
  const solPM = p => p.casos.map((_, i) => i).filter(i => (p.cr ? crit(p.casos[i]) === p.cr : VALE(crit(p.casos[i]))));
  // Pares de triángulos con marcas: se tocan los que quedan congruentes (o los de un criterio).  params { casos: [{ l, a, r? }], cr? }
  const pares = nombre => XG.marca(nombre, {
    sitios: p => p.casos.map((_, i) => SPM(i)), alto: p => Math.ceil(p.casos.length / 2) * 106 + 4, nombre: (p, i) => `par ${i + 1}: ${TIENE[crit(p.casos[i])].split(':')[0]}`,
    cara: (K, p, i) => K.t(SPM(i).x - 68, SPM(i).y - 34, i + 1, 's tm') + par(K, SPM(i).x, SPM(i).y + 4, p.casos[i]),
    sol: solPM,
    aviso(on, p) {
      const i = on.findIndex((x, k) => x && !solPM(p).includes(k)); if (i < 0) return 'Falta algún par: revisa qué lados y qué ángulos están marcados en cada uno.';
      const c = crit(p.casos[i]); return VALE(c) ? `El par ${i + 1} sí es congruente, pero por ${c}, no por ${p.cr}.` : `El par ${i + 1} tiene ${TIENE[c]}.`;
    },
    bien: p => `En esos pares las marcas forman un criterio: ${[...new Set(solPM(p).map(i => crit(p.casos[i])))].join(', ')}.`,
    texto: p => solPM(p).map(i => `par ${i + 1} (${crit(p.casos[i])})`).join('; '), pie: 'Toca cada par que cumple. Otro toque lo quita.',
  });
  pares('pares-marcados'); pares('pares-rectangulos');

  // Tres pares con marcas: a cada uno, el nombre de su criterio.  params { casos: [{ l, a, r? }] × 3, fichas }
  const metasNC = p => p.casos.map(c => (VALE(crit(c)) ? crit(c) : 'ninguno'));
  XG.rotula('nombra-criterio', {
    slots: p => p.casos.map((_, i) => ({ x: 264, y: 40 + i * 66, w: 112, h: 38 })), fichas: p => p.fichas, metas: metasNC, alto: p => p.casos.length * 66 + 8,
    texto: p => metasNC(p).join('; '),
    fondo: (K, p) => p.casos.map((c, i) => K.t(12, 44 + i * 66, i + 1, 's tm') + par(K, 104, 42 + i * 66, c, 0.95, 42)).join(''),
    aviso(q, p) { const m = metasNC(p), i = m.findIndex((x, k) => q[k][0] !== x); return `En el par ${i + 1} hay ${TIENE[crit(p.casos[i])]}.`; },
    bien: () => 'Cada par se nombra por lo que tiene marcado, en su orden.',
  });

  // A un par le falta una marca para completar el criterio pedido: se toca cuál.  params { l, a, r?, cr }
  const LN = [['BC', 'EF'], ['AC', 'DF'], ['AB', 'DE']];
  const opsMF = p => [...[0, 1, 2].filter(i => !(p.l || []).includes(i)).map(i => ['l', i]), ...[0, 1, 2].filter(j => !(p.a || []).includes(j) && !(p.r && j === 2)).map(j => ['a', j])];
  const conMF = (p, o) => criterio(o[0] === 'l' ? [...(p.l || []), o[1]] : p.l || [], o[0] === 'a' ? [...(p.a || []), o[1]] : p.a || [], p.r);
  const txtMF = o => (o[0] === 'l' ? `${LN[o[1]][0]} ≅ ${LN[o[1]][1]}` : `∠${'ABC'[o[1]]} ≅ ∠${'DEF'[o[1]]}`);
  const sitMF = (p, k) => ({ x: 90 + (k % 2) * 160, y: 162 + Math.floor(k / 2) * 44, w: 150, h: 36 });
  const solMF = p => opsMF(p).map((_, k) => k).filter(k => conMF(p, opsMF(p)[k]) === p.cr);
  XG.marca('marca-que-falta', {
    sitios: p => opsMF(p).map((_, k) => sitMF(p, k)), alto: p => 144 + Math.ceil(opsMF(p).length / 2) * 44, nombre: (p, k) => txtMF(opsMF(p)[k]),
    cara: (K, p, k) => K.t(sitMF(p, k).x, sitMF(p, k).y + 5, txtMF(opsMF(p)[k]), 's'),
    fondo: (K, p) => par(K, 170, 68, p, 1.5, 72, ['ABC', 'DEF']),
    sol: solMF,
    aviso(on, p) {
      const k = on.findIndex((x, i) => x && !solMF(p).includes(i)); if (k < 0) return `Falta la marca que completa ${p.cr}.`;
      const c = conMF(p, opsMF(p)[k]); return VALE(c) ? `Con esa marca queda ${c}: también sirve, pero se pidió ${p.cr}.` : c === 'ninguno' ? 'Con esa marca todavía no se completa ningún criterio.' : `Con esa marca queda ${c}: ${TIENE[c].split(':')[0]}. No es un criterio.`;
    },
    bien: p => `Con esa marca hay ${TIENE[p.cr]}: ${p.cr}.`, texto: p => solMF(p).map(k => txtMF(opsMF(p)[k])).join('; '), pie: 'Toca la congruencia que hace falta.',
  });

  // L-A-L: se abre el ángulo en D y se da el largo de DF.  params { b (AC), c (AB), g (ángulo A), a (BC), ini? }  v { g, l }
  const U = 11, RA = [40, 140], RD = [200, 140];
  XG.figura('arma-lal', {
    ini: p => ({ g: p.ini?.[0] ?? 90, l: p.ini?.[1] ?? 2 }),
    manijas: () => [{ k: 'g', min: 20, max: 150, paso: 10, en: v => XPK.at(...RD, v.l * U, v.g), de: (x, y) => Math.atan2(RD[1] - y, x - RD[0]) * 180 / Math.PI }, { k: 'l', min: 2, max: 9, paso: 1, et: 'largo de DF' }],
    ok: (v, p) => v.g === p.g && v.l === p.b,
    sol: p => ({ g: p.g, l: p.b }),
    texto: p => `$\\angle D = ${p.g}^\\circ$ y $DF = ${p.b}$`,
    alto: () => 214, pie: 'Arrastra la punta F para abrir el ángulo; con la perilla, el largo de DF.',
    dib(v, K, p, f) {
      const B = [RA[0] + p.c * U, 140], C = K.at(...RA, p.b * U, p.g), E = [RD[0] + p.c * U, 140], F = K.at(...RD, v.l * U, v.g), G = cen([RA, B, C]), bien = Math.abs(v.g - p.g) < 0.01 && Math.abs(v.l - p.b) < 0.01;
      const ef = Math.sqrt(p.c ** 2 + v.l ** 2 - 2 * p.c * v.l * Math.cos(rad(v.g))), nF = fuera(F, mid(RD, E), 13), nL = fuera(mid(RD, F), E, 11), nE = fuera(mid(E, F), RD, 13);
      return K.ang(RA, B, C, 20, `${p.g}°`, 'fa', 's ta') + K.p([RA, B, C], 'fn') + ray(K, RA, B) + K.t((RA[0] + B[0]) / 2, 157, p.c, 's') + rot(K, mid(RA, C), B, p.b, 's', 11) + rot(K, mid(B, C), RA, p.a, 's', 11)
        + K.t(RA[0] - 10, 153, 'A', 's tm') + K.t(B[0] + 9, 153, 'B', 's tm') + rot(K, C, G, 'C', 's tm', 11)
        + K.ang(RD, E, F, 20, `${R(v.g)}°`, 'fg', 's tg') + K.l(...RD, ...E, 'gr') + ray(K, RD, E) + K.t((RD[0] + E[0]) / 2, 157, p.c, 's') + K.l(...RD, ...F, 'la gr') + K.t(nL[0], nL[1] + 4, r1(v.l), 's ta')
        + K.t(RD[0] - 10, 153, 'D', 's tm') + K.t(E[0] + 9, 153, 'E', 's tm') + K.t(nF[0], nF[1] + 4, 'F', 's tm')
        + K.f(f, K.l(...E, ...F, bien ? 'lo gr' : 'lf gr') + K.t(nE[0], nE[1] + 4, r1(ef), bien ? 's to' : 's tf'));
    },
    lee: v => `$\\angle D = ${R(v.g)}^\\circ,\\ DF = ${r1(v.l)}$`,
    aviso: (v, p) => (v.g === p.g && v.l === p.a ? 'Ese es el lado de enfrente del ángulo. L-A-L pide los dos lados que forman el ángulo: AB y AC.' : v.l === p.b ? `Los lados coinciden, pero el ángulo entre ellos quedó en ${v.g}° y no en ${p.g}°.` : v.g === p.g ? `El ángulo coincide, pero DF mide ${v.l} y debía medir lo mismo que AC.` : 'Ni el ángulo en D ni el lado DF coinciden con los de ABC.'),
    bien: (v, p) => `Dos lados y el ángulo comprendido: el tercer lado sale solo y mide ${p.a}.`,
  });

  // A-L-A: sobre el lado DE se abren los ángulos en D y en E.  params { A, B, C (grados de ABC), ini? }  v { a, b }
  const AD = [190, 185], AE = [300, 185];
  const TA = v => { const ta = Math.tan(rad(v.a)), tb = Math.tan(rad(v.b)), x = 110 * tb / (ta + tb); return [AD[0] + x, AD[1] - x * ta]; };
  XG.figura('abre-ala', {
    ini: p => ({ a: p.ini?.[0] ?? 45, b: p.ini?.[1] ?? 45 }),
    manijas: () => [{ k: 'a', min: 30, max: 70, paso: 5, r: 9, en: v => mid(AD, TA(v), 0.68), de: (x, y) => Math.atan2(AD[1] - y, x - AD[0]) * 180 / Math.PI },
      { k: 'b', min: 30, max: 70, paso: 5, r: 9, en: v => mid(AE, TA(v), 0.68), de: (x, y) => Math.atan2(AE[1] - y, AE[0] - x) * 180 / Math.PI }],
    ok: (v, p) => v.a === p.A && v.b === p.B,
    sol: p => ({ a: p.A, b: p.B }),
    texto: p => `$\\angle D = ${p.A}^\\circ$ y $\\angle E = ${p.B}^\\circ$`,
    alto: () => 214, pie: 'Arrastra los dos lados para abrir los ángulos en D y en E.',
    dib(v, K, p, f) {
      const Bp = [30, 150], Ap = [110, 150], ta = Math.tan(rad(p.A)), tb = Math.tan(rad(p.B)), x = 80 * ta / (ta + tb), Cp = [30 + x, 150 - x * tb], F = TA(v), bien = Math.abs(v.a - p.A) < 0.01 && Math.abs(v.b - p.B) < 0.01;
      return K.ang(Ap, Bp, Cp, 16, '', 'fa') + K.ang(Bp, Cp, Ap, 16, '', 'fg') + K.ang(Cp, Ap, Bp, 13, '', 'ff') + K.p([Ap, Bp, Cp], 'fn') + ray(K, Ap, Bp) + K.t(112, 168, `A ${p.A}°`, 's ta') + K.t(34, 168, `B ${p.B}°`, 's tg') + K.t(Cp[0], Cp[1] - 8, `C ${p.C}°`, 's tf')
        + K.ang(AD, AE, F, 18, '', 'fa') + K.ang(AE, F, AD, 18, '', 'fg') + K.l(...AD, ...AE, 'gr') + ray(K, AD, AE) + K.l(...AD, ...F, 'la') + K.l(...AE, ...F, 'lg') + K.t(186, 203, `D ${R(v.a)}°`, 's ta') + K.t(304, 203, `E ${R(v.b)}°`, 's tg')
        + K.f(f, K.p([AD, AE, F], bien ? 'fo' : 'fn') + K.t(F[0], Math.max(14, F[1] - 8), `F ${R(180 - v.a - v.b)}°`, bien ? 's to' : 's tf'));
    },
    lee: v => `$\\angle D = ${R(v.a)}^\\circ,\\ \\angle E = ${R(v.b)}^\\circ$`,
    aviso: (v, p) => (v.a === p.B && v.b === p.A && p.A !== p.B ? 'Quedaron cambiados: D corresponde a A y E corresponde a B.' : v.a === p.C || v.b === p.C ? 'Usaste el ángulo C, que no toca al lado AB. A-L-A pide los dos ángulos pegados al lado.' : `En D quedaron ${v.a}° y en E ${v.b}°: debían ser los de A y B.`),
    bien: () => 'Un lado y los dos ángulos pegados a él: los otros dos lados se cortan en un único punto.',
  });

  // Isósceles por sus ángulos: se gira el lado AC hasta que ∠C sea congruente con ∠B.  params { B, ini? }  v { c }
  const IB = [110, 190], IC = [230, 190];
  const IA = (v, p) => { const tb = Math.tan(rad(p.B)), tc = Math.tan(rad(v.c)), x = 120 * tc / (tb + tc); return [IB[0] + x, IB[1] - x * tb]; };
  const ladosI = (v, p) => { const s = Math.sin(rad(p.B + v.c)); return [12 * Math.sin(rad(v.c)) / s, 12 * Math.sin(rad(p.B)) / s].map(r1); };
  XG.figura('base-iguales', {
    ini: p => ({ c: p.ini ?? 30 }),
    manijas: p => [{ k: 'c', min: 30, max: 70, paso: 5, r: 9, en: v => mid(IC, IA(v, p), 0.68), de: (x, y) => Math.atan2(IC[1] - y, IC[0] - x) * 180 / Math.PI }],
    ok: (v, p) => v.c === p.B,
    sol: p => ({ c: p.B }),
    texto: p => `$\\angle C = \\angle B = ${p.B}^\\circ$`,
    alto: () => 216, pie: 'Arrastra el lado AC para abrir el ángulo C.',
    dib(v, K, p, f) {
      const A = IA(v, p), [ab, ac] = ladosI(v, p), eq = Math.abs(v.c - p.B) < 0.01;
      return K.ang(IB, IC, A, 22, `${p.B}°`, 'fa', 's ta') + K.ang(IC, A, IB, 22, `${R(v.c)}°`, 'fg', 's tg') + K.p([IB, IC, A], 'fn') + K.t(100, 206, 'B', 's tm') + K.t(240, 206, 'C', 's tm') + K.t(A[0], Math.max(14, A[1] - 8), 'A', 's tm') + K.t(170, 206, '12', 's')
        + K.f(f, rot(K, mid(IB, A), IC, ab, eq ? 's to' : 's tf', 16) + rot(K, mid(IC, A), IB, ac, eq ? 's to' : 's tf', 16) + (eq ? ray(K, IB, A, 1, 'lo') + ray(K, IC, A, 1, 'lo') : ''));
    },
    lee: (v, p) => `$\\angle B = ${p.B}^\\circ,\\ \\angle C = ${R(v.c)}^\\circ$`,
    aviso: (v, p) => (v.c > p.B ? `El ángulo C quedó mayor que B: por eso AB (${ladosI(v, p)[0]}) salió más largo que AC (${ladosI(v, p)[1]}).` : `El ángulo C quedó menor que B: por eso AB (${ladosI(v, p)[0]}) salió más corto que AC (${ladosI(v, p)[1]}).`),
    bien: () => 'Ángulos de la base congruentes: los lados opuestos a ellos también lo son.',
  });

  // Demostración en dos columnas: la figura arriba, cada afirmación con su razón.  params { fig, et, metas, fichas, mira, trampas?, ok }
  const FIG = {
    cometa(K) { const A = [60, 58], B = [150, 12], C = [280, 58], D = [150, 104]; return K.p([A, B, C, D], 'fn') + K.l(...A, ...C, 'la') + ray(K, A, B) + ray(K, A, D) + ray(K, C, B, 2) + ray(K, C, D, 2) + K.t(48, 63, 'A', 's') + K.t(150, 9, 'B', 's') + K.t(292, 63, 'C', 's') + K.t(150, 119, 'D', 's'); },
    cruce(K) { const A = [50, 16], B = [290, 100], C = [50, 100], D = [290, 16], M = [170, 58]; return K.ang(M, A, C, 18, '', 'fa') + K.ang(M, B, D, 18, '', 'fa') + K.l(...A, ...B) + K.l(...C, ...D) + K.l(...A, ...C, 'la') + K.l(...B, ...D, 'la') + ray(K, A, M) + ray(K, M, B) + ray(K, C, M, 2) + ray(K, M, D, 2) + K.t(38, 20, 'A', 's') + K.t(302, 104, 'B', 's') + K.t(38, 104, 'C', 's') + K.t(302, 20, 'D', 's') + K.t(170, 46, 'M', 's'); },
    bisectriz(K) { const A = [170, 10], B = [86, 104], C = [254, 104], D = [170, 104]; return K.ang(A, B, D, 26, '', 'fa') + K.ang(A, D, C, 20, '', 'fa') + K.p([A, B, C], 'fn') + K.l(...A, ...D, 'la') + ray(K, A, B) + ray(K, A, C) + K.t(170, 8, '', 's') + K.t(184, 16, 'A', 's') + K.t(74, 108, 'B', 's') + K.t(266, 108, 'C', 's') + K.t(170, 119, 'D', 's'); },
    altura(K) { const A = [170, 10], B = [86, 104], C = [254, 104], D = [170, 104]; return K.p([A, B, C], 'fn') + K.l(...A, ...D, 'la') + esc(K, D, A, C) + esc(K, D, A, B) + ray(K, A, B) + ray(K, A, C) + K.t(184, 16, 'A', 's') + K.t(74, 108, 'B', 's') + K.t(266, 108, 'C', 's') + K.t(170, 119, 'D', 's'); },
    equidista(K) { const O = [40, 100], g = 22, P = K.at(...O, 200, g), M = [P[0], 100], N = K.at(...O, 200 * Math.cos(rad(g)), 2 * g); return K.ang(O, M, P, 44, '', 'fa') + K.ang(O, P, N, 36, '', 'fa') + K.l(...O, 310, 100) + K.l(...O, ...K.at(...O, 270, 2 * g)) + K.l(...O, ...P, 'la') + K.l(...P, ...M, 'lf') + K.l(...P, ...N, 'lf') + esc(K, M, O, P) + esc(K, N, O, P) + K.t(28, 104, 'O', 's') + K.t(P[0] + 12, P[1] + 4, 'P', 's') + K.t(M[0], 116, 'M', 's') + K.t(N[0] - 6, N[1] - 8, 'N', 's'); },
    mediatriz(K) { const A = [70, 96], B = [270, 96], M = [170, 96], P = [170, 20]; return K.l(...A, ...B) + K.l(170, 8, 170, 108, 'lm d') + K.l(...P, ...A, 'la') + K.l(...P, ...B, 'la') + esc(K, M, B, P) + ray(K, A, M) + ray(K, M, B) + K.t(58, 100, 'A', 's') + K.t(282, 100, 'B', 's') + K.t(182, 24, 'P', 's') + K.t(170, 119, 'M', 's'); },
    hipotenusas(K) { const A = [60, 100], B = [280, 100], C = [130, 22], D = [210, 22]; return K.l(...A, ...B) + K.l(...A, ...D, 'la') + K.l(...B, ...C, 'la') + K.l(...A, ...C) + K.l(...B, ...D) + esc(K, C, A, B, 7) + esc(K, D, B, A, 7) + ray(K, A, C) + ray(K, B, D) + K.t(48, 104, 'A', 's') + K.t(292, 104, 'B', 's') + K.t(126, 16, 'C', 's') + K.t(214, 16, 'D', 's'); },
  };
  XG.renglones('razones-paso', { w: 170, x: 250, y0: 146, fondo: (K, p) => FIG[p.fig](K) });

  // ------------------------------------------------------------------------------------------------------- desigualdades
  // Un ángulo exterior y varias medidas: se tocan las que puede tener un interior no adyacente.  params { ext, ops: [grados] }
  const sitEX = (p, i) => ({ x: 170 + (i - (p.ops.length - 1) / 2) * 64, y: 178, w: 58, h: 40 });
  const solEX = p => p.ops.map((_, i) => i).filter(i => p.ops[i] < p.ext);
  XG.marca('exterior-cabe', {
    sitios: p => p.ops.map((_, i) => sitEX(p, i)), alto: () => 204, nombre: (p, i) => `${p.ops[i]} grados`,
    cara: (K, p, i) => K.t(sitEX(p, i).x, 184, `${p.ops[i]}°`, 'b'),
    fondo(K, p) {
      const B = [44, 128], C = [206, 128], A = K.at(...C, 104, p.ext), D = [322, 128];
      return K.ang(C, D, A, 24, `${p.ext}°`, 'fo', 's to') + K.ang(A, B, C, 18, '?', 'fa', 'ta') + K.p([A, B, C], 'fn') + K.l(...C, ...D, 'lm') + K.t(A[0] - 12, A[1] - 2, 'A', 's') + K.t(34, 142, 'B', 's') + K.t(206, 144, 'C', 's');
    },
    sol: solEX,
    aviso(on, p) { const i = on.findIndex((x, k) => x && p.ops[k] >= p.ext); return i < 0 ? 'Falta alguna: toda medida menor que el ángulo exterior puede ser.' : p.ops[i] === p.ext ? `${p.ops[i]}° no puede ser: el interior no adyacente es menor que el exterior, no igual.` : `${p.ops[i]}° no puede ser: pasaría del ángulo exterior, que mide ${p.ext}°.`; },
    bien: p => `El ángulo A es interior no adyacente: tiene que medir menos de ${p.ext}°.`,
    texto: p => solEX(p).map(i => `${p.ops[i]}°`).join(', '), pie: 'Toca todas las medidas posibles.',
  });

  // A mayor lado, mayor ángulo (y al revés): se ordenan los ángulos según los lados, o los lados según los ángulos. La figura no está a escala.
  //   params { l: [BC, CA, AB] }  o  { g: [A, B, C] };  fichas
  const OV = [[170, 62], [86, 160], [254, 160]];
  const rango = q => q.map(x => (x === Math.max(...q) ? 'mayor' : x === Math.min(...q) ? 'menor' : 'mediano'));
  const orden = (nombre, lados) => XG.rotula(nombre, {
    slots: () => (lados ? [{ x: 170, y: 188, w: 80, h: 34 }, { x: 292, y: 100, w: 80, h: 34 }, { x: 48, y: 100, w: 80, h: 34 }] : [{ x: 170, y: 24, w: 80, h: 34 }, { x: 46, y: 188, w: 80, h: 34 }, { x: 294, y: 188, w: 80, h: 34 }]),
    fichas: p => p.fichas, metas: p => rango(lados ? p.g : p.l), alto: () => 212,
    texto: p => rango(lados ? p.g : p.l).map((m, k) => `${lados ? ['BC', 'AC', 'AB'][k] : `∠${'ABC'[k]}`}: ${m}`).join('; '),
    fondo(K, p) {
      const G = cen(OV), S = [[OV[1], OV[2]], [OV[2], OV[0]], [OV[0], OV[1]]];
      return K.p(OV, 'fn') + (lados ? OV.map((V, k) => K.ang(V, OV[(k + 1) % 3], OV[(k + 2) % 3], 16, `${p.g[k]}°`, ['fa', 'fg', 'ff'][k], 's')).join('') + K.t(170, 52, 'A', 's tm') + K.t(74, 166, 'B', 's tm') + K.t(266, 166, 'C', 's tm')
        : S.map(([P, Q], k) => { const [x, y] = fuera(mid(P, Q), G, k ? 14 : 12); return K.t(x, y + 4, p.l[k], 's ta'); }).join('') + K.t(170, 80, 'A', 's tm') + K.t(104, 154, 'B', 's tm') + K.t(236, 154, 'C', 's tm'))
        + K.t(170, lados ? 14 : 206, 'la figura no está a escala', 's tm');
    },
    aviso(q, p) {
      const d = lados ? p.g : p.l, m = rango(d), i = m.findIndex((x, k) => q[k][0] !== x);
      if (q[i][0] === 'igual') return lados ? 'No hay dos ángulos congruentes, así que no hay dos lados congruentes.' : 'No hay dos lados congruentes, así que no hay dos ángulos congruentes.';
      return lados ? `El lado ${['BC', 'AC', 'AB'][i]} está frente al ángulo ${'ABC'[i]}, de ${d[i]}°: el ${m[i]} de los tres ángulos.` : `El ángulo ${'ABC'[i]} mira al lado ${['BC', 'AC', 'AB'][i]}, de ${d[i]}: el ${m[i]} de los tres lados.`;
    },
    bien: () => (lados ? 'A mayor ángulo se opone mayor lado.' : 'A mayor lado se opone mayor ángulo.'),
  });
  orden('angulos-por-lados', false); orden('lados-por-angulos', true);

  // Teorema de la bisagra: dos compases de patas iguales; el de la derecha se abre lo justo para ganarle (o perder) por un paso.
  //   params { a, b (patas), g (abertura del de la izquierda), menos?, ini? }  v { g }
  const O1 = [28, 166], O2 = [190, 166];
  const tercer = (p, g) => r1(Math.sqrt(p.a ** 2 + p.b ** 2 - 2 * p.a * p.b * Math.cos(rad(g))));
  const metaB = p => p.g + (p.menos ? -10 : 10);
  XG.figura('compas-bisagra', {
    ini: p => ({ g: p.ini ?? 20 }),
    manijas: p => [{ k: 'g', min: 20, max: 140, paso: 10, en: v => XPK.at(...O2, p.a * 10, v.g), de: (x, y) => Math.atan2(O2[1] - y, x - O2[0]) * 180 / Math.PI }],
    ok: (v, p) => v.g === metaB(p),
    sol: p => ({ g: metaB(p) }),
    texto: p => `$${metaB(p)}^\\circ$: el lado opuesto pasa de $${tercer(p, p.g)}$ a $${tercer(p, metaB(p))}$`,
    alto: () => 198, pie: 'Arrastra la punta del compás de la derecha.',
    dib(v, K, p, f) {
      const uno = (O, g, vivo) => {
        const Q = [O[0] + p.b * 10, O[1]], T = K.at(...O, p.a * 10, g), n = fuera(mid(Q, T), O, 13), lado = fuera(mid(O, T), Q, 10);
        return K.ang(O, Q, T, 22, `${R(g)}°`, vivo ? 'fg' : 'fa', vivo ? 's tg' : 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, vivo ? 'la gr' : 'gr') + K.l(...Q, ...T, 'lm d') + K.t((O[0] + Q[0]) / 2, O[1] + 17, p.b, 's') + K.t(lado[0], lado[1] + 4, p.a, 's')
          + K.f(f, K.l(...Q, ...T, vivo ? 'lf gr' : 'lo gr') + K.t(n[0], n[1] + 4, tercer(p, g), vivo ? 's tf' : 's to'));
      };
      return uno(O1, p.g, false) + uno(O2, v.g, true);
    },
    lee: (v, p) => `$${p.g}^\\circ \\text{ y } ${R(v.g)}^\\circ$`,
    aviso(v, p) {
      const mas = p.menos ? v.g < p.g : v.g > p.g;
      return v.g === p.g ? 'Con la misma abertura los triángulos son congruentes por L-A-L: las puntas quedan igual de separadas.' : !mas ? (p.menos ? 'Al abrir más, las puntas se alejan: quedaron más separadas, no más juntas.' : 'Al cerrar la bisagra las puntas se acercan: quedaron más juntas, no más separadas.') : `Sí quedan más ${p.menos ? 'juntas' : 'separadas'}, pero la abertura podía cambiar menos: va de 10° en 10°.`;
    },
    bien: (v, p) => `Mismas patas y ángulo ${p.menos ? 'menor' : 'mayor'}: el lado opuesto pasa de ${tercer(p, p.g)} a ${tercer(p, v.g)}.`,
  });

  // -------------------------------------------------------------------------------------------- mediatriz y bisectriz: equidistar
  // Un punto de la cuadrícula a igual distancia de A y de B, que no sea el punto medio.  params { A, B, ini, sol }
  const QX = x => 26 + x * 24, QY = y => 196 - y * 24;
  const esMedio = (v, p) => 2 * v.x === p.A[0] + p.B[0] && 2 * v.y === p.A[1] + p.B[1];
  XG.figura('punto-equidista', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [12, 7], paso: 1, en: v => [QX(v.x), QY(v.y)], de: (x, y) => [(x - 26) / 24, (196 - y) / 24] }],
    ok: (v, p) => d2([v.x, v.y], p.A) === d2([v.x, v.y], p.B) && !esMedio(v, p),
    sol: p => ({ x: p.sol[0], y: p.sol[1] }),
    texto: p => `$P$ en la mediatriz: $PA = PB = ${raiz(d2(p.sol, p.A)).replace('√', '\\sqrt{')}${Number.isInteger(Math.sqrt(d2(p.sol, p.A))) ? '' : '}'}$`,
    alto: () => 216, pie: 'Arrastra el punto P por la cuadrícula.',
    dib(v, K, p, f) {
      const A = [QX(p.A[0]), QY(p.A[1])], B = [QX(p.B[0]), QY(p.B[1])], P = [QX(v.x), QY(v.y)], M = mid(A, B), w = { x: R(v.x), y: R(v.y) }, a = d2([w.x, w.y], p.A), b = d2([w.x, w.y], p.B);
      let h = '';
      for (let x = 0; x <= 12; x++) for (let y = 0; y <= 7; y++) h += K.c(QX(x), QY(y), 1.3, 'fM');
      const na = fuera(mid(P, A), B, 12), nb = fuera(mid(P, B), A, 12);
      return h + K.l(...A, ...B, 'gr') + K.l(...P, ...A, 'la d') + K.l(...P, ...B, 'lg d') + K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + rot(K, A, B, 'A', '', 13) + rot(K, B, A, 'B', '', 13)
        + K.f(f, K.l(...corta(M, [B[1] - A[1], A[0] - B[0]], 8, 8, 332, 208), 'lo d') + ray(K, A, M, 1, 'lo') + ray(K, M, B, 1, 'lo') + (a || b ? K.t(na[0], na[1] + 4, raiz(a), 's ta') + K.t(nb[0], nb[1] + 4, raiz(b), 's tg') : ''));
    },
    aviso(v, p) { const a = d2([v.x, v.y], p.A), b = d2([v.x, v.y], p.B); return esMedio(v, p) ? 'Ese es el punto medio de AB: equidista, pero se pidió otro punto.' : `PA mide ${raiz(a)} y PB mide ${raiz(b)}: P no está en la mediatriz de AB.`; },
    bien: (v, p) => `PA = PB = ${raiz(d2([v.x, v.y], p.A))}: P está en la mediatriz de AB.`,
  });

  // Un rayo gira dentro de un ángulo: su punto P debe quedar a igual distancia de los dos lados.  params { g, ini? }  v { t }
  const EO = [36, 184];
  const distE = (v, p) => [13 * Math.sin(rad(v.t)), 13 * Math.sin(rad(p.g - v.t))].map(r1);
  XG.figura('rayo-equidista', {
    ini: p => ({ t: p.ini ?? 10 }),
    manijas: p => [{ k: 't', min: 5, max: p.g - 5, paso: 5, en: v => XPK.at(...EO, 130, v.t), de: (x, y) => Math.atan2(EO[1] - y, x - EO[0]) * 180 / Math.PI }],
    ok: (v, p) => v.t * 2 === p.g,
    sol: p => ({ t: p.g / 2 }),
    texto: p => `la bisectriz: $${p.g}^\\circ \\div 2 = ${p.g / 2}^\\circ$ a cada lado`,
    alto: () => 204, pie: 'Arrastra el punto P para girar el rayo.',
    dib(v, K, p, f) {
      const P = K.at(...EO, 130, v.t), M = [P[0], EO[1]], N = K.at(...EO, 130 * Math.cos(rad(p.g - v.t)), p.g), L1 = [316, EO[1]], L2 = K.at(...EO, 172, p.g), [d1, dd] = distE(v, p), eq = Math.abs(v.t * 2 - p.g) < 0.01;
      const n1 = fuera(mid(P, M), EO, 14), n2 = fuera(mid(P, N), EO, 14);
      return K.ang(EO, L1, P, 40, `${R(v.t)}°`, 'fa', 's ta') + K.ang(EO, P, L2, 30, `${R(p.g - v.t)}°`, 'fg', 's tg') + K.l(...EO, ...L1) + K.l(...EO, ...L2) + K.l(...EO, ...P, 'la gr') + K.l(...P, ...M, 'lm d') + K.l(...P, ...N, 'lm d') + esc(K, M, EO, P, 7) + esc(K, N, EO, P, 7)
        + K.f(f, K.l(...P, ...M, eq ? 'lo gr' : 'lf gr') + K.l(...P, ...N, eq ? 'lo gr' : 'lf gr') + K.t(n1[0], n1[1] + 4, d1, eq ? 's to' : 's tf') + K.t(n2[0], n2[1] + 4, dd, eq ? 's to' : 's tf'));
    },
    lee: (v, p) => `$${R(v.t)}^\\circ + ${R(p.g - v.t)}^\\circ = ${p.g}^\\circ$`,
    aviso(v, p) { const [a, b] = distE(v, p); return `P quedó a ${a} de un lado y a ${b} del otro: el rayo no parte el ángulo en dos congruentes.`; },
    bien: (v, p) => `El rayo es la bisectriz: P queda a ${distE(v, p)[0]} de cada lado.`,
  });
})();
;
//#archivo js/games/euc-escena-4.js
// Geometría Euclidiana · mundo 4 «Paralelas y Cuadriláteros» (spec 2026-11-26-curso-euclidiana): juegos con escena de
// perpendiculares y paralelas, ángulos entre paralelas, paralelogramos y trapecios, y rectas y puntos notables.
// Armazones en figura-kit.js, conteo-escena.js (XG.cuenta) y proposiciones-escena.js (XG.frases, XG.renglones).
(() => {
  const rad = g => g * Math.PI / 180, R = Math.round, gr = n => `${R(n)}°`;
  const num = x => `${R(x * 10) / 10}`, tx = x => (Math.abs(x - R(x)) < 1e-9 ? `= ${R(x)}` : `\\approx ${num(x)}`);
  const at = (x, y, r, g) => [x + r * Math.cos(rad(g)), y - r * Math.sin(rad(g))];
  const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], hip = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const mcd = (a, b) => (b ? mcd(b, a % b) : Math.abs(a));
  // Cuadrícula de 12 × 8 (24 px por cuadro, y hacia arriba).
  const U = 24, GP = (x, y) => [26 + x * U, 212 - y * U], PG = (x, y) => [(x - 26) / U, (212 - y) / U];
  const red = K => { let h = ''; for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 8), 'ls'); for (let j = 0; j <= 8; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls'); return h; };
  const libre = { k: ['x', 'y'], min: [0, 0], max: [12, 8], paso: 1, r: 10, en: v => GP(v.x, v.y), de: (x, y) => PG(x, y) };
  // Recta por Q con dirección d, recortada a la cuadrícula.
  const recta = (K, Q, d, cls) => {
    if (!d[0] && !d[1]) return '';
    let a = -1e9, b = 1e9;
    [[Q[0], d[0], 12], [Q[1], d[1], 8]].forEach(([q, k, m]) => { if (k) { const t1 = -q / k, t2 = (m - q) / k; a = Math.max(a, Math.min(t1, t2)); b = Math.min(b, Math.max(t1, t2)); } });
    return a < b ? K.l(...GP(Q[0] + a * d[0], Q[1] + a * d[1]), ...GP(Q[0] + b * d[0], Q[1] + b * d[1]), cls) : '';
  };
  // Marca de ángulo recto en V, entre los rayos a P y a Q (en píxeles).
  const escuadra = (K, V, P, Q, s = 9) => {
    const a = hip(V, P), b = hip(V, Q); if (a < 1 || b < 1) return '';
    const u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s];
    return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm');
  };
  const pend = d => { let [x, y] = d; if (x < 0 || (!x && y < 0)) { x = -x; y = -y; } const g = mcd(x, y) || 1; return !x ? 'es vertical' : !y ? 'es horizontal' : `${y > 0 ? 'sube' : 'baja'} ${Math.abs(y) / g} por cada ${x / g}`; };
  const rot = (K, P, t, dx = 10, dy = -8) => K.t(P[0] + dx, P[1] + dy, t, 's');

  // ============================================================================================ 1 · paralelas y perpendiculares
  // El pie del segmento que baja de P a la recta r: el más corto cae a escuadra.  params { o, d, n, P, t0 }  v { t }
  const L = (p, t) => [p.o[0] + t * p.d[0], p.o[1] + t * p.d[1]];
  const pieT = p => ((p.P[0] - p.o[0]) * p.d[0] + (p.P[1] - p.o[1]) * p.d[1]) / (p.d[0] ** 2 + p.d[1] ** 2);
  const largo = (p, t) => hip(p.P, L(p, t));
  XG.figura('pie-perpendicular', {
    ini: p => ({ t: p.t0 }),
    manijas: p => [{ k: 't', min: 0, max: p.n, paso: 1, en: v => GP(...L(p, v.t)), de(x, y) { const [a, b] = PG(x, y); return ((a - p.o[0]) * p.d[0] + (b - p.o[1]) * p.d[1]) / (p.d[0] ** 2 + p.d[1] ** 2); } }],
    ok: (v, p) => Math.abs(v.t - pieT(p)) < 1e-9,
    sol: p => ({ t: R(pieT(p)) }),
    texto: p => `el pie de la perpendicular: la distancia de P a r es $PF ${tx(largo(p, pieT(p)))}$`,
    alto: () => 232, pie: 'Arrastra el pie F por la recta.',
    dib(v, K, p, f) {
      const T = pieT(p), P = GP(...p.P), F = GP(...L(p, v.t)), B = GP(...L(p, T)), fin = GP(...L(p, p.n)), m = mid(P, F);
      let h = red(K) + K.l(...GP(...L(p, 0)), ...fin, 'gr') + K.t(fin[0] - 6, fin[1] - 10, 'r', 'tm');
      if (f) h += K.f(f, (Math.abs(v.t - T) > 0.01 ? K.l(...P, ...B, 'lo d') : '') + escuadra(K, B, P, GP(...L(p, T + (T < p.n ? 1 : -1)))))
        + K.f(f * 2 - 1, K.t(m[0] + 10, m[1] + 4, num(largo(p, v.t)), 's ta', 'start') + (Math.abs(v.t - T) > 0.01 ? K.t(...mid(P, B).map((z, i) => z + (i ? 4 : -10)), num(largo(p, T)), 's to', 'end') : ''));
      return h + K.l(...P, ...F, 'la gr') + K.c(...P, 5, 'fk') + rot(K, P, 'P') + rot(K, F, 'F', 8, 18);
    },
    lee: (v, p) => `$PF ${tx(largo(p, R(v.t)))}$`,
    aviso: (v, p) => `Ese segmento mide ${num(largo(p, v.t))}; el que cae a escuadra mide ${num(largo(p, pieT(p)))}: es el más corto.`,
    bien: (v, p) => `Cae a escuadra sobre r: mide ${num(largo(p, v.t))}, y cualquier otro segmento desde P es más largo.`,
  });

  // Por P, la paralela a r (o la perpendicular a t): se arrastra un segundo punto D.  params { A, B, P, Q?, ini }  v { x, y }
  const traza = (name, perp) => {
    const dir = p => [p.B[0] - p.A[0], p.B[1] - p.A[1]], va = (v, p) => [v.x - p.P[0], v.y - p.P[1]];
    const vale = (v, p) => { const d = dir(p), e = va(v, p); return !!(e[0] || e[1]) && (perp ? d[0] * e[0] + d[1] * e[1] : d[0] * e[1] - d[1] * e[0]) === 0; };
    const busca = p => { let m = null; for (let x = 0; x <= 12; x++) for (let y = 0; y <= 8; y++) { const v = { x, y }; if (vale(v, p) && !(x === p.ini[0] && y === p.ini[1]) && (!m || hip([x, y], p.P) <= hip([m.x, m.y], p.P) + 1e-9)) m = v; } return m; };
    const ang = (v, p) => { const d = dir(p), e = va(v, p); return R(Math.acos(Math.min(1, Math.abs(d[0] * e[0] + d[1] * e[1]) / (Math.hypot(...d) * Math.hypot(...e)))) * 180 / Math.PI); };
    XG.figura(name, {
      ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [libre], ok: vale, sol: busca,
      texto: p => (perp ? `la perpendicular a t por P ${pend([-dir(p)[1], dir(p)[0]])}` : `la paralela por P ${pend(dir(p))}, igual que r`),
      alto: () => 232, pie: 'Arrastra el punto D por la cuadrícula.',
      dib(v, K, p, f) {
        const d = dir(p), e = va(v, p), A = GP(...p.A), B = GP(...p.B), P = GP(...p.P), D = GP(v.x, v.y), cero = !e[0] && !e[1];
        let h = red(K) + recta(K, p.A, d, 'gr') + K.c(...A, 3.5, 'fk') + K.c(...B, 3.5, 'fk') + K.t(B[0] + 14, B[1] + 16, perp ? 't' : 'r', 'tm');
        if (perp && p.Q) h += recta(K, p.Q, [-d[1], d[0]], 'lg gr') + escuadra(K, GP(...p.Q), GP(p.Q[0] + d[0], p.Q[1] + d[1]), GP(p.Q[0] - d[1], p.Q[1] + d[0])) + K.t(GP(...p.Q)[0] - 12, GP(...p.Q)[1] - 30, 'r', 'tg');
        h += recta(K, p.P, e, 'la gr');
        if (f && !cero) h += perp
          ? K.f(f, (vale(v, p) ? escuadra(K, P, D, GP(p.P[0] + d[0], p.P[1] + d[1])) : '') + K.t(170, 14, `ángulo con t: ${ang(v, p)}°`, vale(v, p) ? 's to' : 's tf'))
          : K.f(f, K.pl([A, [B[0], A[1]], B], 'lg d') + K.pl([P, [D[0], P[1]], D], 'lf d') + K.t(170, 14, `r ${pend(d)} · la tuya ${pend(e)}`, vale(v, p) ? 's to' : 's tf'));
        return h + K.c(...P, 5, 'fk') + rot(K, P, 'P', -10);
      },
      aviso: (v, p) => (!va(v, p)[0] && !va(v, p)[1] ? 'Aleja el punto de P: con dos puntos queda trazada la recta.'
        : perp ? `Forma ${ang(v, p)}° con t, no 90°. Un cuarto de vuelta cambia el paso (a, b) por (−b, a).` : `Tu recta ${pend(va(v, p))} y r ${pend(dir(p))}: con otra inclinación, se cortan.`),
      bien: (v, p) => (!perp ? 'Misma inclinación: nunca se cortan. Por P no pasa ninguna otra paralela a r.' : p.Q ? 'Las dos son perpendiculares a t: por eso son paralelas entre sí.' : 'Cae a escuadra sobre t: por P solo pasa esa perpendicular.'),
    });
  };
  traza('traza-paralela', false); traza('traza-perpendicular', true);

  XG.frases('paralelas-seguro');
  XG.renglones('cuantas-rectas', { w: 100, x: 284 });
  // Se dan relaciones entre rectas y se deducen otras; al comprobar aparece el dibujo.  params { da, lin: [[x1, y1, x2, y2, nombre, cls?]], esc?: [[x, y]], et, metas… }
  XG.cuenta('relacion-rectas', 132, (K, p, f = 0) => K.f(1 - f, K.t(170, 20, 'Se sabe que:', 's tm') + p.da.map((t, i) => K.t(170, 46 + i * 24, t, 'b')).join(''))
    + K.f(f, p.lin.map(([a, b, c, d, n, cls]) => K.l(a, b, c, d, cls || 'gr') + K.t(c + (c > a ? 8 : 0), d + (d < b ? -4 : 14), n, 's ta')).join('') + (p.esc || []).map(([x, y]) => K.pl([[x + 8, y], [x + 8, y - 8], [x, y - 8]], 'lm')).join('')));

  // ============================================================================================ 2 · ángulos entre paralelas
  // Ocho ángulos numerados: 1-4 en el cruce de arriba y 5-8 en el de abajo (izquierda-derecha, arriba-abajo).
  const NP = { P: [104, 60], Q: [72, 128] };
  const tipoPar = (a, b) => {
    if (a > b) [a, b] = [b, a];
    const arr = n => n <= 4, izq = n => n % 2 === 1, int = n => [3, 4, 5, 6].includes(n);
    if (arr(a) === arr(b)) return a + b === (arr(a) ? 5 : 13) ? 'op. por el vértice' : 'adyacentes';
    if (b - a === 4) return 'correspondientes';
    if (int(a) && int(b)) return izq(a) === izq(b) ? 'colaterales' : 'alternos internos';
    if (!int(a) && !int(b)) return izq(a) === izq(b) ? 'colaterales ext.' : 'alternos externos';
    return 'ninguno';
  };
  const PISTA = { 'alternos internos': 'entre las paralelas y a lados distintos de la transversal: forman una Z.', correspondientes: 'en la misma esquina de cada cruce: forman una F.',
    'alternos externos': 'fuera de las paralelas y a lados distintos de la transversal.', colaterales: 'entre las paralelas y del mismo lado de la transversal: forman una C.', 'op. por el vértice': 'en el mismo cruce, uno frente al otro.' };
  XG.rotula('nombra-pares', {
    slots: p => p.pares.map((_, i) => ({ x: 252, y: 44 + i * 46, w: 164, h: 30 })), fichas: p => p.fichas, metas: p => p.pares.map(([a, b]) => tipoPar(a, b)),
    texto: p => p.pares.map(([a, b]) => `${a} y ${b}: ${tipoPar(a, b)}`).join('; '), alto: p => 22 + p.pares.length * 46,
    fondo(K, p) {
      const { P, Q } = NP, o = [[-24, -10], [22, -10], [-30, 22], [14, 22]], dx = (P[0] - Q[0]) / (Q[1] - P[1]);
      return K.l(8, P[1], 162, P[1]) + K.l(8, Q[1], 162, Q[1]) + K.l(P[0] + dx * 44, P[1] - 44, Q[0] - dx * 44, Q[1] + 44, 'la gr')
        + [P, Q].map((X, k) => o.map(([a, b], i) => K.t(X[0] + a, X[1] + b, k * 4 + i + 1, 's ta')).join('')).join('')
        + p.pares.map(([a, b], i) => K.t(252, 23 + i * 46, `∠${a} y ∠${b}`, 's tm')).join('');
    },
    aviso(q, p) { const i = p.pares.findIndex(([a, b], k) => q[k][0] !== tipoPar(a, b)), [a, b] = p.pares[i]; return `∠${a} y ∠${b} están ${PISTA[tipoPar(a, b)]}`; },
    bien: () => 'Cada pareja se nombra por su lugar: adentro o afuera, del mismo lado o a lados distintos.',
  });

  // Recíprocos: se gira la recta de abajo hasta que el par de ángulos obligue a que sean paralelas.  params { t, modo, rot?, b0 }  v { b }
  const epG = p => { const r = p.rot || 0, C = [165, 112]; return { r, P: at(...C, 48, p.t + r), Q: at(...C, -48, p.t + r) }; };
  const EPN = { alt: 'alternos internos', corr: 'correspondientes', col: 'colaterales' };
  XG.figura('endereza-paralela', {
    ini: p => ({ b: p.b0 }),
    manijas: p => { const { r, Q } = epG(p); return [{ k: 'b', min: -25, max: 25, paso: 5, en: v => at(...Q, 120, r + v.b), de: (x, y) => Math.atan2(Q[1] - y, x - Q[0]) * 180 / Math.PI - r }]; },
    ok: v => v.b === 0, sol: () => ({ b: 0 }),
    texto: p => (p.modo === 'col' ? `colaterales suplementarios: $${180 - p.t}^\\circ + ${p.t}^\\circ = 180^\\circ$` : `${EPN[p.modo]} congruentes: los dos miden $${p.t}^\\circ$`),
    alto: () => 236, pie: 'Arrastra la punta de la recta de abajo.',
    dib(v, K, p, f) {
      const { r, P, Q } = epG(p), T = p.t, e1 = g => at(...P, 125, r + g), e2 = g => at(...Q, 125, r + v.b + g), up = at(...P, 40, T + r), dn = at(...Q, -40, T + r);
      const arriba = p.modo === 'alt' ? K.ang(P, e1(180), Q, 24, gr(T), 'fa', 'ta') : p.modo === 'corr' ? K.ang(P, e1(0), up, 24, gr(T), 'fa', 'ta') : K.ang(P, e1(0), Q, 24, gr(180 - T), 'fa', 'ta');
      return arriba + K.ang(Q, e2(0), P, 24, gr(T - v.b), 'fg', 'tg') + K.l(...e1(180), ...e1(0)) + K.l(...e2(180), ...e2(0), 'la gr') + K.l(...up, ...dn)
        + K.t(e1(180)[0] + 8, e1(180)[1] - 8, 'ℓ₁', 's tm') + K.t(e2(180)[0] + 8, e2(180)[1] + 18, 'ℓ₂', 's tm')
        + K.f(f, K.t(170, 16, Math.abs(v.b) < 0.5 ? 'ℓ₁ ∥ ℓ₂' : `se cortan a la ${v.b > 0 ? 'derecha' : 'izquierda'}`, Math.abs(v.b) < 0.5 ? 'to' : 'tf'));
    },
    lee: (v, p) => (p.modo === 'col' ? `$${180 - p.t}^\\circ + ${R(p.t - v.b)}^\\circ = ${R(180 - v.b)}^\\circ$` : `$${p.t}^\\circ$ y $${R(p.t - v.b)}^\\circ$`),
    aviso: (v, p) => (p.modo === 'col' && p.t - v.b === 180 - p.t ? 'Los colaterales no tienen que ser congruentes: deben ser suplementarios.'
      : p.modo === 'col' ? `Los colaterales suman ${180 - v.b}°, no 180°: las rectas se cortan a la ${v.b > 0 ? 'derecha' : 'izquierda'}.` : `Los ${EPN[p.modo]} miden ${p.t}° y ${p.t - v.b}°: no son congruentes y las rectas se cortan.`),
    bien: (v, p) => (p.modo === 'col' ? 'Colaterales suplementarios: las rectas son paralelas.' : `Los ${EPN[p.modo]} son congruentes: las rectas son paralelas.`),
  });

  // ============================================================================================ 3 · paralelogramos y trapecios
  // Paralelogramo ABCD con la base AB fija: se arrastra C (D lo sigue) hasta que sea rombo, rectángulo o cuadrado.  params { A, B, ini, tipo }
  const pe = (v, p) => { const ab = [p.B[0] - p.A[0], p.B[1] - p.A[1]], bc = [v.x - p.B[0], v.y - p.B[1]]; return { ab, bc, D: [v.x - ab[0], v.y - ab[1]], cr: ab[0] * bc[1] - ab[1] * bc[0], dot: ab[0] * bc[0] + ab[1] * bc[1], l1: ab[0] ** 2 + ab[1] ** 2, l2: bc[0] ** 2 + bc[1] ** 2 }; };
  const peOk = (v, p) => { const g = pe(v, p); return !!g.cr && (p.tipo === 'rombo' ? g.l1 === g.l2 && g.dot !== 0 : p.tipo === 'rectangulo' ? g.dot === 0 : g.dot === 0 && g.l1 === g.l2); };
  const peR = p => { const ab = pe({ x: 0, y: 0 }, p).ab; return { min: [Math.max(0, ab[0]), Math.max(0, ab[1])], max: [12 + Math.min(0, ab[0]), 8 + Math.min(0, ab[1])] }; };
  XG.figura('paralelogramo-especial', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: p => [{ ...libre, ...peR(p) }],
    ok: peOk,
    sol(p) { const r = peR(p); let m = null; for (let x = r.min[0]; x <= r.max[0]; x++) for (let y = r.min[1]; y <= r.max[1]; y++) if (peOk({ x, y }, p) && (!m || hip([x, y], p.ini) < hip([m.x, m.y], p.ini))) m = { x, y }; return m; },
    texto(p) { const s = this.sol(p), g = pe(s, p); return p.tipo === 'rombo' ? `$BC = AB ${tx(Math.sqrt(g.l1))}$, con C en (${s.x}, ${s.y})` : `BC a escuadra sobre AB, con C en (${s.x}, ${s.y})`; },
    alto: () => 232, pie: 'Arrastra el vértice C: D lo sigue.',
    dib(v, K, p, f) {
      const g = pe(v, p), V = [p.A, p.B, [v.x, v.y], g.D].map(q => GP(...q)), c = mid(V[0], V[2]);
      const nom = V.map((q, i) => { const d = hip(q, c) || 1; return K.t(q[0] + (q[0] - c[0]) / d * 13, q[1] + (q[1] - c[1]) / d * 13 + 4, 'ABCD'[i], 's'); }).join('');
      return red(K) + K.p(V, 'fn') + K.pl([...V, V[0]], 'la gr') + nom
        + K.f(f, K.l(...V[0], ...V[2], 'lg d') + K.l(...V[1], ...V[3], 'lf d') + (g.cr && g.l1 === g.l2 ? escuadra(K, c, V[2], V[1], 7) : '')
          + K.t(170, 14, `diagonales: ${num(hip(p.A, [v.x, v.y]))} y ${num(hip(p.B, g.D))} · lados: ${num(Math.sqrt(g.l1))} y ${num(Math.sqrt(g.l2))}`, 's'));
    },
    lee: (v, p) => { const g = pe(v, p); return `$AB ${tx(Math.sqrt(g.l1))}$ y $BC ${tx(Math.sqrt(g.l2))}$`; },
    aviso(v, p) {
      const g = pe(v, p);
      if (!g.cr) return 'Los cuatro vértices quedaron en línea: así no hay cuadrilátero.';
      if (p.tipo === 'rombo') return g.l1 === g.l2 ? 'Es un cuadrado: tiene los lados congruentes, pero se pidió sin ángulos rectos.' : `AB mide ${num(Math.sqrt(g.l1))} y BC mide ${num(Math.sqrt(g.l2))}: en el rombo los cuatro lados son congruentes.`;
      return g.dot ? 'El ángulo en B no es recto: BC debe caer a escuadra sobre AB.' : 'Es un rectángulo, pero BC no mide lo mismo que AB.';
    },
    bien: (v, p) => (p.tipo === 'rombo' ? 'Cuatro lados congruentes: las diagonales se cortan a escuadra y bisecan los ángulos.' : p.tipo === 'rectangulo' ? 'Cuatro ángulos rectos: por eso las diagonales son congruentes.' : 'Rectángulo y rombo a la vez: es un cuadrado.'),
  });

  // Dos diagonales: se mueve el cruce M por AC y se desliza BD por él, hasta que se bisequen.  params { n, m, g, t0, s0 }  v { t, s }
  const dcG = (v, p) => { const u = 220 / p.n, M = [50 + v.t * u, 132]; return { u, M, A: [50, 132], C: [270, 132], B: at(...M, v.s * 18, p.g), D: at(...M, -(p.m - v.s) * 18, p.g) }; };
  XG.figura('diagonales-cruce', {
    ini: p => ({ t: p.t0, s: p.s0 }),
    manijas: p => [{ k: 't', min: 1, max: p.n - 1, paso: 1, r: 9, en: v => dcG(v, p).M, de: x => (x - 50) / (220 / p.n) },
      { k: 's', min: 1, max: p.m - 1, paso: 1, r: 9, en: v => dcG(v, p).B, de: (x, y, v) => { const M = dcG(v, p).M; return ((x - M[0]) * Math.cos(rad(p.g)) + (M[1] - y) * Math.sin(rad(p.g))) / 18; } }],
    ok: (v, p) => 2 * v.t === p.n && 2 * v.s === p.m, sol: p => ({ t: p.n / 2, s: p.m / 2 }),
    texto: p => `las diagonales se bisecan: $AM = MC = ${p.n / 2}$ y $BM = MD = ${p.m / 2}$`,
    alto: () => 252, pie: 'Mueve el cruce M y desliza la diagonal BD.',
    dib(v, K, p, f) {
      const { u, M, A, B, C, D } = dcG(v, p), bien = Math.abs(2 * v.t - p.n) < 0.01 && Math.abs(2 * v.s - p.m) < 0.01;
      let h = K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], f > 0.5 && bien ? 'lo gr' : 'lm') + K.l(...A, ...C, 'gr') + K.l(...B, ...D, 'la gr');
      for (let i = 0; i <= p.n; i++) h += K.l(50 + i * u, 128, 50 + i * u, 136, 'lm');
      for (let j = 0; j <= p.m; j++) h += K.c(...at(...D, j * 18, p.g), 2, 'fk');
      return h + K.t(A[0] - 10, A[1] + 5, 'A', 's') + K.t(C[0] + 10, C[1] + 5, 'C', 's') + K.t(B[0] + 14, B[1] - 6, 'B', 's') + K.t(D[0] - 12, D[1] + 14, 'D', 's')
        + K.f(f, K.t(170, 246, `AM ${R(v.t)} · MC ${R(p.n - v.t)} · BM ${R(v.s)} · MD ${R(p.m - v.s)}`, bien ? 's to' : 's tf'));
    },
    lee: (v, p) => `$AM = ${R(v.t)}$, $MC = ${R(p.n - v.t)}$, $BM = ${R(v.s)}$, $MD = ${R(p.m - v.s)}$`,
    aviso: (v, p) => (2 * v.t !== p.n ? 'El cruce no parte a AC por la mitad: en un paralelogramo las diagonales se bisecan.' : 'BD no quedó partida por la mitad: el cruce debe ser punto medio de las dos diagonales.'),
    bien: () => 'El cruce es punto medio de las dos diagonales: por eso ABCD es un paralelogramo.',
  });

  // Los otros tres ángulos de un paralelogramo.  params { a, fichas }
  const apM = p => [180 - p.a, p.a, 180 - p.a].map(gr);
  XG.rotula('angulos-paralelogramo', {
    slots: () => [{ x: 296, y: 200, w: 58, h: 34 }, { x: 294, y: 30, w: 58, h: 34 }, { x: 66, y: 30, w: 58, h: 34 }], fichas: p => p.fichas, metas: apM,
    texto: p => `el opuesto mide $${p.a}^\\circ$ y los consecutivos, $180^\\circ - ${p.a}^\\circ = ${180 - p.a}^\\circ$`, alto: () => 222,
    fondo(K, p) {
      const A = [64, 176], B = [236, 176], D = at(...A, 104, p.a), C = at(...B, 104, p.a);
      return K.p([A, B, C, D], 'fn') + K.ang(A, B, D, 30, gr(p.a), 'fa', 'ta') + K.ang(B, A, C, 22, '', 'fg') + K.ang(C, B, D, 22, '', 'ff') + K.ang(D, A, C, 22, '', 'fo') + K.pl([A, B, C, D, A], 'gr')
        + K.l(B[0] + 8, B[1] + 4, 268, 192, 'lg d') + K.l(C[0] + 2, C[1] - 8, 286, 48, 'lf d') + K.l(D[0] - 4, D[1] - 8, 78, 48, 'lo d')
        + K.t(A[0] - 12, A[1] + 6, 'A', 's') + K.t(B[0] + 4, B[1] + 20, 'B', 's') + K.t(C[0] + 14, C[1] + 6, 'C', 's') + K.t(D[0] - 14, D[1] + 8, 'D', 's');
    },
    aviso(q, p) { const a = gr(p.a); return q[1][0] !== a ? 'El ángulo opuesto al dato es congruente con él.' : q[0][0] === a || q[2][0] === a ? 'Dos consecutivos no son congruentes: son suplementarios.' : 'Cada consecutivo completa 180° con el dato.'; },
    bien: () => 'Opuestos congruentes y consecutivos suplementarios.',
  });

  // Trapecio isósceles: AB y D fijos, se arrastra C.  params { A, B, D, ini }
  const tiC = p => ({ x: p.A[0] + p.B[0] - p.D[0], y: p.D[1] });
  XG.figura('trapecio-isosceles', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [libre],
    ok: (v, p) => v.x === tiC(p).x && v.y === tiC(p).y, sol: tiC,
    texto: p => `C en (${tiC(p).x}, ${tiC(p).y}): $DC \\parallel AB$ y $BC = AD ${tx(hip(p.A, p.D))}$`,
    alto: () => 232, pie: 'Arrastra el vértice C.',
    dib(v, K, p, f) {
      const V = [p.A, p.B, [v.x, v.y], p.D].map(q => GP(...q));
      return red(K) + K.p(V, 'fn') + K.pl([...V, V[0]], 'la gr') + K.t(V[0][0] - 10, V[0][1] + 16, 'A', 's') + K.t(V[1][0] + 10, V[1][1] + 16, 'B', 's') + K.t(V[2][0] + 12, V[2][1] - 8, 'C', 's') + K.t(V[3][0] - 10, V[3][1] - 8, 'D', 's')
        + K.f(f, K.l(...V[0], ...V[2], 'lg d') + K.l(...V[1], ...V[3], 'lf d') + K.t(170, 14, `AD ${num(hip(p.A, p.D))} · BC ${num(hip(p.B, [v.x, v.y]))} · diagonales ${num(hip(p.A, [v.x, v.y]))} y ${num(hip(p.B, p.D))}`, 's'));
    },
    lee: (v, p) => `$AD ${tx(hip(p.A, p.D))}$ y $BC ${tx(hip(p.B, [R(v.x), R(v.y)]))}$`,
    aviso: (v, p) => (v.y !== p.D[1] ? 'DC no quedó paralela a AB: sin un par de lados paralelos no hay trapecio.'
      : v.x - p.D[0] === p.B[0] - p.A[0] ? 'AD y BC son congruentes, pero también paralelos: quedó un paralelogramo, no un trapecio.'
        : `AD mide ${num(hip(p.A, p.D))} y BC mide ${num(hip(p.B, [v.x, v.y]))}: en el isósceles los lados no paralelos son congruentes.`),
    bien: () => 'Lados no paralelos congruentes: también lo son los ángulos de cada base y las diagonales.',
  });

  XG.frases('siempre-paralelogramo');
  XG.renglones('que-cuadrilatero', { w: 124, x: 270 });

  // En movimiento: el marco articulado se abre con el ángulo que se le da (de 5 en 5).
  XG.tiros('abre-marco', {
    perilla: () => ({ et: 'Ángulo', min: 0, max: 35, cara: v => v * 5, lee: v => `${v * 5}°` }),
    meta: t => t.r / 5, alto: 176, ms: 1500,
    dib(t, v, K, p, f) {
      const A = [100, 150], B = [240, 150], a = v == null ? 90 : Math.max(2, v * 5 * Math.min(1, f * 1.5)), D = at(...A, 84, a), C = at(...B, 84, a);
      let h = K.l(20, 150, 320, 150, 'lm');
      if (v == null) return h + K.pl([A, D, C, B], 'lm d') + K.l(...A, ...B, 'gr') + K.t(...mid(A, D).map((z, i) => z + (i ? 0 : -14)), '?', 'ta');
      return h + K.p([A, B, C, D], 'fn') + K.sec(...A, 30, 0, a, 'fa') + K.pl([A, B, C, D, A], 'la gr')
        + K.f(f * 3 - 2, K.t(...at(A[0], A[1] + 5, 50, Math.max(14, Math.min(166, a / 2))), `${v * 5}°`, 'ta') + (v * 5 === t.r ? K.c(...D, 6, 'fo') + K.c(...C, 6, 'fo') : ''));
    },
    falla: (t, v) => (t.e?.[v * 5] || (v * 5 > t.r ? 'Abrió demasiado.' : 'Le faltó abrir.')),
    cuenta: t => `$${t.c} = ${t.r}^\\circ$`, pie: 'Estira el ángulo y suelta: el marco se abre.',
  });

  // ============================================================================================ 4 · rectas y puntos notables
  // Paralela media: M es punto medio de AC; N se desliza por CB.  params { c, n, s0, C? }  v { s }
  const pmG = (v, p) => { const A = [36, 190], B = [304, 190], C = p.C || [124, 26]; return { A, B, C, M: mid(A, C), N: [C[0] + (B[0] - C[0]) * v.s / p.n, C[1] + (B[1] - C[1]) * v.s / p.n] }; };
  XG.figura('paralela-media', {
    ini: p => ({ s: p.s0 }),
    manijas: p => [{ k: 's', min: 1, max: p.n - 1, paso: 1, en: v => pmG(v, p).N, de(x, y) { const { B, C } = pmG({ s: 0 }, p), d = [B[0] - C[0], B[1] - C[1]]; return p.n * ((x - C[0]) * d[0] + (y - C[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2); } }],
    ok: (v, p) => 2 * v.s === p.n, sol: p => ({ s: p.n / 2 }),
    texto: p => `N es el punto medio de CB: $MN \\parallel AB$ y $MN = ${p.c} \\div 2 = ${p.c / 2}$`,
    alto: () => 216, pie: 'Desliza N por el lado CB.',
    dib(v, K, p, f) {
      const { A, B, C, M, N } = pmG(v, p), bien = Math.abs(2 * v.s - p.n) < 0.01, q = mid(M, N);
      let h = K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'gr');
      for (let i = 1; i < p.n; i++) h += K.c(C[0] + (B[0] - C[0]) * i / p.n, C[1] + (B[1] - C[1]) * i / p.n, 2, 'fk');
      const pal = (P, Q) => { const m = mid(P, Q); return K.l(m[0] - 6, m[1] - 3, m[0] + 6, m[1] + 3, 'lg'); };
      return h + pal(A, M) + pal(M, C) + K.c(...M, 4, 'fk') + K.t(M[0] - 14, M[1] + 4, 'M', 's') + K.t(A[0] - 2, A[1] + 18, 'A', 's') + K.t(B[0] + 2, B[1] + 18, 'B', 's') + K.t(C[0], C[1] - 8, 'C', 's')
        + K.t(170, 208, `${p.c}`, 's tm') + K.l(...M, ...N, 'la gr') + K.t(N[0] + 16, N[1] + 4, 'N', 's')
        + K.f(f, K.t(q[0], q[1] - 8, bien ? `${p.c / 2}` : 'no es paralela', bien ? 's to' : 's tf'));
    },
    lee: (v, p) => `$CN = ${R(v.s)}$ y $NB = ${R(p.n - v.s)}$`,
    aviso: (v, p) => `N quedó más cerca de ${2 * v.s < p.n ? 'C' : 'B'}: MN se inclina. La paralela a AB por M pasa por el punto medio de CB.`,
    bien: (v, p) => `N es punto medio de CB: MN es paralela a AB y mide ${p.c / 2}, la mitad.`,
  });

  // Baricentro: G se desliza por la mediana AM, de medida n.  params { n, s0 }  v { s } (distancia desde el vértice)
  const BA = { A: [118, 22], B: [28, 204], C: [312, 204], M: [170, 204] };
  XG.figura('baricentro-desliza', {
    ini: p => ({ s: p.s0 }),
    manijas: p => [{ k: 's', min: 1, max: p.n - 1, paso: 1, r: 9, en: v => [BA.A[0] + 52 * v.s / p.n, BA.A[1] + 182 * v.s / p.n], de: (x, y) => p.n * ((x - BA.A[0]) * 52 + (y - BA.A[1]) * 182) / (52 * 52 + 182 * 182) }],
    ok: (v, p) => 3 * v.s === 2 * p.n, sol: p => ({ s: 2 * p.n / 3 }),
    texto: p => `$\\tfrac{2}{3} \\cdot ${p.n} = ${2 * p.n / 3}$ desde el vértice`,
    alto: () => 224, pie: 'Desliza G por la mediana.',
    dib(v, K, p, f) {
      const { A, B, C, M } = BA;
      let h = K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'gr') + K.l(...A, ...M, 'la gr');
      for (let i = 0; i <= p.n; i++) h += K.l(A[0] + 52 * i / p.n - 4, A[1] + 182 * i / p.n + 1, A[0] + 52 * i / p.n + 4, A[1] + 182 * i / p.n - 1, 'lm');
      return h + K.t(A[0] - 12, A[1] + 6, 'A', 's') + K.t(M[0], M[1] + 16, 'M', 's') + K.t(B[0], B[1] + 16, 'B', 's') + K.t(C[0], C[1] + 16, 'C', 's') + K.t(250, 60, `mediana AM: ${p.n}`, 's tm')
        + K.f(f, K.l(...B, ...mid(A, C), 'lg d') + K.l(...C, ...mid(A, B), 'lf d') + K.t(250, 82, `AG ${R(v.s)} · GM ${R(p.n - v.s)}`, 3 * R(v.s) === 2 * p.n ? 's to' : 's tf'));
    },
    lee: (v, p) => `$AG = ${R(v.s)}$ y $GM = ${R(p.n - v.s)}$`,
    aviso: (v, p) => (2 * v.s === p.n ? 'Ese es el punto medio de la mediana: el baricentro queda más cerca del lado.' : 3 * v.s === p.n ? 'Quedó a un tercio del vértice: los dos tercios se cuentan desde el vértice.'
      : `AG mide ${v.s} y GM mide ${p.n - v.s}: AG debe ser el doble de GM.`),
    bien: (v, p) => `AG = ${v.s} y GM = ${p.n - v.s}: el baricentro está a dos tercios del vértice.`,
  });

  // Un punto que equidista de los tres vértices (circuncentro) o de los tres lados (incentro).  params { V, tipo, ini }  v { x, y }
  const ceD = (v, p) => {
    if (p.tipo === 'vertices') return p.V.map(q => hip(q, [v.x, v.y]));
    const or = Math.sign((p.V[1][0] - p.V[0][0]) * (p.V[2][1] - p.V[0][1]) - (p.V[1][1] - p.V[0][1]) * (p.V[2][0] - p.V[0][0]));
    return p.V.map((a, i) => { const b = p.V[(i + 1) % 3]; return or * ((b[0] - a[0]) * (v.y - a[1]) - (b[1] - a[1]) * (v.x - a[0])) / hip(a, b); });
  };
  const ceOk = (v, p) => { const d = ceD(v, p); return d.every(x => x > 1e-9) && Math.abs(d[0] - d[1]) < 1e-9 && Math.abs(d[1] - d[2]) < 1e-9; };
  const ceS = p => { for (let x = 0; x <= 12; x++) for (let y = 0; y <= 8; y++) if (ceOk({ x, y }, p)) return { x, y }; return null; };
  XG.figura('centro-equidista', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [libre], ok: ceOk, sol: ceS,
    texto(p) { const s = ceS(p); return `el punto (${s.x}, ${s.y}): queda a $d ${tx(ceD(s, p)[0])}$ de ${p.tipo === 'vertices' ? 'cada vértice' : 'cada lado'}`; },
    alto: () => 232, pie: 'Arrastra el punto por la cuadrícula.',
    dib(v, K, p, f) {
      const V = p.V.map(q => GP(...q)), O = GP(v.x, v.y), d = ceD(v, p), bien = ceOk(v, p), c = mid(mid(V[0], V[1]), V[2]);
      let h = red(K) + K.p(V, 'fn') + K.pl([...V, V[0]], 'gr') + V.map((q, i) => { const r = hip(q, c) || 1; return K.t(q[0] + (q[0] - c[0]) / r * 13, q[1] + (q[1] - c[1]) / r * 13 + 4, 'ABC'[i], 's'); }).join('');
      if (!f) return h;
      const pies = p.tipo === 'vertices' ? V : p.V.map((a, i) => { const b = p.V[(i + 1) % 3], k = ((v.x - a[0]) * (b[0] - a[0]) + (v.y - a[1]) * (b[1] - a[1])) / hip(a, b) ** 2; return GP(a[0] + k * (b[0] - a[0]), a[1] + k * (b[1] - a[1])); });
      return h + K.f(f, pies.map((q, i) => K.l(...O, ...q, ['lg d', 'lf d', 'lo d'][i]) + K.t(...mid(O, q).map((z, j) => z + (j ? -4 : 6)), num(Math.abs(d[i])), 's', 'start')).join('')
        + K.arc(O[0], O[1], Math.abs(d[0]) * U * Math.min(1, f), 0, 360, bien ? 'lo gr' : 'lm d'));
    },
    aviso(v, p) {
      const d = ceD(v, p).map(x => num(Math.abs(x)));
      if (p.tipo === 'vertices') return `Está a ${d[0]} de A, a ${d[1]} de B y a ${d[2]} de C: el circuncentro equidista de los tres vértices.`;
      return ceD(v, p).some(x => x <= 1e-9) ? 'Quedó fuera o sobre el borde: el incentro siempre está dentro del triángulo.' : `Está a ${d[0]}, ${d[1]} y ${d[2]} de los lados: el incentro equidista de los tres.`;
    },
    bien: (v, p) => (p.tipo === 'vertices' ? `Está a ${num(ceD(v, p)[0])} de los tres vértices: es el circuncentro, y la circunferencia pasa por los tres.` : `Está a ${num(ceD(v, p)[0])} de los tres lados: es el incentro, centro de la circunferencia inscrita.`),
  });

  // 30°-60°-90°: se sube la punta de una hipotenusa de medida c hasta que el ángulo sea de 30°.  params { c, h0 }  v { h }
  const tsT = (v, p) => { const u = 190 / p.c; return [60 + u * Math.sqrt(Math.max(0, p.c * p.c - v.h * v.h)), 200 - u * v.h]; };
  const tsA = (v, p) => Math.asin(Math.min(1, v.h / p.c)) * 180 / Math.PI;
  XG.figura('treinta-sesenta', {
    ini: p => ({ h: p.h0 }),
    manijas: p => [{ k: 'h', min: 2, max: p.c - 2, paso: 1, en: v => tsT(v, p), de: (x, y) => (200 - y) / (190 / p.c) }],
    ok: (v, p) => 2 * v.h === p.c, sol: p => ({ h: p.c / 2 }),
    texto: p => `el cateto opuesto a $30^\\circ$ es la mitad de la hipotenusa: $${p.c} \\div 2 = ${p.c / 2}$`,
    alto: () => 216, pie: 'Sube o baja la punta.',
    dib(v, K, p, f) {
      const A = [60, 200], T = tsT(v, p), F = [T[0], 200], m = mid(A, T);
      return K.l(30, 200, 320, 200, 'lm') + K.p([A, F, T], 'fn') + K.ang(A, F, T, 32, f > 0.5 ? `${num(tsA(v, p))}°` : '?', 'fa', 'ta') + escuadra(K, F, A, T)
        + K.l(...A, ...T, 'la gr') + K.l(...T, ...F, 'lf gr') + K.t(m[0] - 12, m[1] - 8, `${p.c}`, 's ta', 'end') + K.t(T[0] + 12, (T[1] + 200) / 2 + 4, num(v.h), 's tf', 'start');
    },
    lee: (v, p) => `$\\tfrac{${R(v.h)}}{${p.c}}$ de la hipotenusa`,
    aviso: (v, p) => `Con el cateto en ${v.h}, el ángulo mide ${num(tsA(v, p))}°: ${2 * v.h > p.c ? 'más' : 'menos'} de 30°.`,
    bien: (v, p) => `El cateto opuesto mide ${v.h}, la mitad de la hipotenusa: el ángulo es de 30°.`,
  });

  // Tres mitades: mediana sobre la hipotenusa, paralela media y mediana del trapecio.  params { h, b, B, b2, et, metas, fichas, mira, ok }
  XG.cuenta('medios-miden', 142, (K, p) => {
    const R1 = [20, 118], X = [100, 118], Y = [20, 40], P = [125, 118], Q = [215, 118], T = [160, 40], Z = [[240, 118], [330, 118], [310, 48], [262, 48]];
    return K.p([R1, X, Y], 'fn') + K.pl([R1, X, Y, R1], 'gr') + K.pl([[30, 118], [30, 108], [20, 108]], 'lm') + K.l(...R1, ...mid(X, Y), 'la gr') + K.t(72, 72, `${p.h}`, 's', 'start')
      + K.p([P, Q, T], 'fn') + K.pl([P, Q, T, P], 'gr') + K.l(...mid(P, T), ...mid(Q, T), 'la gr') + K.t(170, 134, `${p.b}`, 's')
      + K.p(Z, 'fn') + K.pl([...Z, Z[0]], 'gr') + K.l(...mid(Z[0], Z[3]), ...mid(Z[1], Z[2]), 'la gr') + K.t(285, 134, `${p.B}`, 's') + K.t(286, 42, `${p.b2}`, 's');
  });
  XG.renglones('punto-de-que', { w: 120, x: 272 });

  // Mediana del trapecio: se estira la base mayor hasta que la mediana mida m.  params { b, m, B0 }  v { B }
  XG.figura('trapecio-base', {
    ini: p => ({ B: p.B0 }),
    manijas: p => [{ k: 'B', min: p.b + 1, max: 22, paso: 1, en: v => [50 + v.B * 12, 176], de: x => (x - 50) / 12 }],
    ok: (v, p) => v.B + p.b === 2 * p.m, sol: p => ({ B: 2 * p.m - p.b }),
    texto: p => `$2 \\cdot ${p.m} - ${p.b} = ${2 * p.m - p.b}$, porque $\\tfrac{${2 * p.m - p.b} + ${p.b}}{2} = ${p.m}$`,
    alto: () => 202, pie: 'Estira la base de abajo.',
    dib(v, K, p, f) {
      const TL = [92, 56], TR = [92 + p.b * 12, 56], BL = [50, 176], BR = [50 + v.B * 12, 176], a = mid(TL, BL), b = mid(TR, BR);
      return K.p([BL, BR, TR, TL], 'fn') + K.pl([BL, BR, TR, TL, BL], 'gr') + K.l(...a, ...b, 'la gr') + K.t((TL[0] + TR[0]) / 2, 46, `${p.b}`, 's') + K.t((BL[0] + BR[0]) / 2, 194, num(v.B), 's')
        + K.t((a[0] + b[0]) / 2, a[1] - 8, f > 0.5 ? num((v.B + p.b) / 2) : '?', 's ta');
    },
    lee: (v, p) => `$\\tfrac{${R(v.B)} + ${p.b}}{2}$`,
    aviso: (v, p) => (v.B === p.m ? 'Esa es la medida de la mediana, no la de la base.' : v.B === 2 * p.m ? 'Falta descontar la otra base: la mediana es la semisuma de las dos.' : `Con esa base la mediana mide ${num((v.B + p.b) / 2)}, no ${p.m}.`),
    bien: (v, p) => `(${v.B} + ${p.b}) ÷ 2 = ${p.m}: la mediana es la semisuma de las bases.`,
  });
})();
;
//#archivo js/games/euc-escena-5.js
// Geometría Euclidiana · mundo 5 «euc-circunferencia»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Una circunferencia con puntos que se arrastran por ella: cuerdas, tangentes, posiciones relativas y los ángulos que se miden con arcos
// (central, inscrito, semiinscrito, interior y exterior). Los ángulos van en grados, contra las agujas del reloj.
(() => {
  const R = Math.round, rad = g => g * Math.PI / 180, gr = n => `${R(n)}°`, n1 = x => String(R(x * 10) / 10);
  const at = (c, r, g) => [c[0] + r * Math.cos(rad(g)), c[1] - r * Math.sin(rad(g))];
  const gra = (c, x, y) => (Math.atan2(c[1] - y, x - c[0]) * 180 / Math.PI + 360) % 360;
  const vuelta = a => { const b = (a % 360 + 360) % 360; return b > 280 ? b - 360 : b; };   // lo que queda justo antes del inicio no salta al final
  const seg = (K, a, b, cls = '') => K.l(a[0], a[1], b[0], b[1], cls);
  const aro = (K, c, r, cls = '') => K.arc(c[0], c[1], r, 0, 360, cls);
  const arco = (K, c, r, a, b, cls = '') => K.arc(c[0], c[1], r, a, b, cls);
  const uni = (a, b) => { const m = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / m, (b[1] - a[1]) / m]; };
  const medio = (a, b, t = 0.5) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  // Punto con su letra, empujada hacia afuera del centro c.
  const pt = (K, q, t, c, d = 13) => { const u = uni(c, q); return K.c(q[0], q[1], 3.5, 'fk') + (t ? K.t(q[0] + u[0] * d, q[1] + u[1] * d + 4, t, 's') : ''); };
  const tx = (K, q, s, cls = '', a = 'middle') => K.t(q[0], q[1] + 4, s, cls, a);
  // Marca de ángulo recto en T, entre las direcciones hacia a y hacia b.
  const recto = (K, T, a, b, s = 8) => { const u = uni(T, a), w = uni(T, b); return K.pl([[T[0] + u[0] * s, T[1] + u[1] * s], [T[0] + (u[0] + w[0]) * s, T[1] + (u[1] + w[1]) * s], [T[0] + w[0] * s, T[1] + w[1] * s]], 'lm'); };
  const corta = (P, Q, U, V) => { const d = (Q[0] - P[0]) * (V[1] - U[1]) - (Q[1] - P[1]) * (V[0] - U[0]), t = ((U[0] - P[0]) * (V[1] - U[1]) - (U[1] - P[1]) * (V[0] - U[0])) / (d || 1e-9); return medio(P, Q, t); };
  const abre = (P, A, B) => { const d = Math.abs(Math.atan2(A[1] - P[1], A[0] - P[0]) - Math.atan2(B[1] - P[1], B[0] - P[0])) * 180 / Math.PI; return d > 180 ? 360 - d : d; };
  const primero = (q, p, metas) => metas.findIndex((m, k) => q[k][0] !== m);

  // ============================================================================ lección 1 · cuerdas, tangentes y posiciones
  // Los trazos de la circunferencia, numerados: a cada número su nombre.  params { pide: [claves], fichas }
  const NOM = { radio: 'radio', diametro: 'diámetro', cuerda: 'cuerda', secante: 'secante', tangente: 'tangente', arco: 'arco' };
  const QUE = { radio: 'El radio va del centro a un punto de la circunferencia.', diametro: 'El diámetro es la cuerda que pasa por el centro.', cuerda: 'La cuerda une dos puntos de la circunferencia y no pasa de ahí.',
    secante: 'La secante corta la circunferencia en dos puntos y sigue de largo.', tangente: 'La tangente toca la circunferencia en un solo punto.', arco: 'El arco es un trozo de la circunferencia misma.' };
  const NC = [104, 122], NR = 66, NT = { radio: [76, 148], diametro: [130, 110], cuerda: [136, 154], secante: [78, 58], tangente: [184, 62], arco: [36, 172] };
  const chapa = (K, x, y, n) => K.c(x, y, 9, 'fc') + K.t(x, y + 4, n, 's');
  XG.rotula('nombra-circunferencia', {
    slots: p => p.pide.map((_, i) => ({ x: 286, y: 30 + i * 44, w: 92, h: 38 })),
    fichas: p => p.fichas, metas: p => p.pide.map(k => NOM[k]),
    texto: p => p.pide.map((k, i) => `${i + 1}: ${NOM[k]}`).join('; '),
    alto: p => 30 + p.pide.length * 44 - 14,
    fondo(K, p) {
      const P = g => at(NC, NR, g), s1 = P(150), s2 = P(75), u = uni(s1, s2);
      return aro(K, NC, NR) + arco(K, NC, NR, 195, 240, 'lg gr') + seg(K, P(180), P(0), 'lf') + seg(K, NC, P(250), 'la') + seg(K, P(290), P(345), 'lo')
        + K.l(s1[0] - u[0] * 26, s1[1] - u[1] * 26, s2[0] + u[0] * 30, s2[1] + u[1] * 30) + K.l(NC[0] + NR, 44, NC[0] + NR, 204, 'lm')
        + K.c(NC[0], NC[1], 3.5, 'fk') + K.t(114, 138, 'O', 's tm') + [P(180), P(0), P(250), P(290), P(345), s1, s2].map(q => K.c(q[0], q[1], 2.5, 'fk')).join('')
        + p.pide.map((k, i) => chapa(K, NT[k][0], NT[k][1], i + 1) + chapa(K, 226, 30 + i * 44, i + 1)).join('');
    },
    aviso(q, p) { const m = p.pide.map(k => NOM[k]); return QUE[p.pide[primero(q, p, m)]]; },
    bien: () => 'Cada trazo tiene su nombre según cómo toca a la circunferencia.',
  });

  // Dos ángulos centrales seguidos y sus arcos: cada arco mide lo que su ángulo, y los arcos se suman.  params { a, b, et, ops, metas, fichas, mira, ok }
  XG.cuenta('arcos-suman', 172, (K, p, f) => {
    const C = [170, 90], r = 68, g = [10, 10 + p.a, 10 + p.a + p.b], A = at(C, r, g[0]), B = at(C, r, g[1]), D = at(C, r, g[2]);
    return aro(K, C, r) + K.sec(C[0], C[1], 28, g[0], g[1], 'fa') + K.sec(C[0], C[1], 28, g[1], g[2], 'fg') + tx(K, at(C, 44, (g[0] + g[1]) / 2), gr(p.a), 's ta') + tx(K, at(C, 44, (g[1] + g[2]) / 2), gr(p.b), 's tg')
      + K.f(f, arco(K, C, r, g[0], g[1], 'la gr') + arco(K, C, r, g[1], g[2], 'lg gr') + arco(K, C, r, g[2], g[0] + 360, 'lf gr'))
      + seg(K, C, A) + seg(K, C, B) + seg(K, C, D) + pt(K, A, 'A', C) + pt(K, B, 'B', C) + pt(K, D, 'C', C) + K.c(C[0], C[1], 3.5, 'fk') + K.t(C[0] - 4, C[1] + 17, 'O', 's tm');
  });

  // Una cuerda que baja: radio, media cuerda y distancia al centro forman un triángulo rectángulo.  params { r, cuerda }   v { d }
  const CC = [170, 100], CR = 78, mc = (p, d) => Math.sqrt(Math.max(0, p.r * p.r - d * d));
  XG.figura('cuerda-distancia', {
    ini: () => ({ d: 0 }),
    manijas: p => [{ k: 'd', min: 0, max: p.r - 1, paso: 1, en: v => [170, 100 + v.d * CR / p.r], de: (x, y) => (y - 100) * p.r / CR }],
    ok: (v, p) => 4 * (p.r * p.r - v.d * v.d) === p.cuerda * p.cuerda,
    sol: p => ({ d: Math.sqrt(p.r * p.r - p.cuerda * p.cuerda / 4) }),
    texto: p => `$\\sqrt{${p.r}^2 - ${p.cuerda / 2}^2} = ${Math.sqrt(p.r * p.r - p.cuerda * p.cuerda / 4)}$`,
    alto: () => 200, pie: 'Arrastra la cuerda: sube y baja.',
    dib(v, K, p, f) {
      const u = CR / p.r, y = 100 + v.d * u, h = mc(p, v.d) * u, E = [170 + h, y], m = medio(CC, E);
      return aro(K, CC, CR) + K.t(10, 20, f > 0.5 ? `cuerda: ${n1(2 * mc(p, v.d))}` : 'cuerda: ?', 'ta', 'start') + K.t(330, 20, `radio: ${p.r}`, 's tg', 'end')
        + seg(K, CC, E, 'lg') + K.t(m[0] + 8, m[1] - 6, p.r, 's tg', 'start')
        + (v.d > 0.2 ? K.l(170, 100, 170, y, 'lf d') + K.t(162, 100 + v.d * u / 2 + 4, n1(v.d), 's tf', 'end') + recto(K, [170, y], CC, E, 7) : '')
        + K.f(f, K.l(170 - h, y + 9, 170, y + 9, 'lo') + K.l(170, y + 9, 170 + h, y + 9, 'lo d')) + K.l(170 - h, y, 170 + h, y, 'la gr') + K.c(170, 100, 3.5, 'fk');
    },
    lee: (v, p) => { const c = 2 * mc(p, v.d); return `$2\\sqrt{${p.r}^2 - ${n1(v.d)}^2} ${Number.isInteger(c) ? '=' : '\\approx'} ${n1(c)}$`; },
    aviso(v, p) {
      const c = 2 * mc(p, v.d);
      return v.d === p.r - p.cuerda / 2 ? 'Restaste el radio y media cuerda, pero forman un triángulo rectángulo: va Pitágoras.' : v.d === p.cuerda / 2 ? 'Esa es media cuerda, no la distancia al centro.'
        : c > p.cuerda ? `La cuerda quedó de ${n1(c)}: está muy cerca del centro.` : `La cuerda quedó de ${n1(c)}: está muy lejos del centro.`;
    },
    bien: (v, p) => `Radio ${p.r}, media cuerda ${p.cuerda / 2} y distancia ${v.d}: un triángulo rectángulo.`,
  });

  // Dos aros: se arrastra el centro del pequeño (que no se ve) hasta donde quedarían tangentes.  params { R, r, pos: 'te' | 'ti' }   v { d }
  const AU = p => Math.min(16, 328 / (2 * p.R + 2 * p.r + 3), 78 / p.R), AX = p => 6 + p.R * AU(p), AY = 106;
  const posicion = (p, d) => (d > p.R + p.r ? 'exteriores' : d === p.R + p.r ? 'tangentes exteriores' : d > p.R - p.r ? 'secantes' : d === p.R - p.r ? 'tangentes interiores' : d > 0 ? 'interiores' : 'concéntricas');
  XG.figura('acerca-circulo', {
    ini: p => ({ d: p.R + p.r + 3 }),
    manijas: p => [{ k: 'd', min: 0, max: p.R + p.r + 3, paso: 1, en: v => [AX(p) + v.d * AU(p), AY], de: x => (x - AX(p)) / AU(p) }],
    ok: (v, p) => v.d === (p.pos === 'ti' ? p.R - p.r : p.R + p.r),
    sol: p => ({ d: p.pos === 'ti' ? p.R - p.r : p.R + p.r }),
    texto: p => (p.pos === 'ti' ? `$d = ${p.R} - ${p.r} = ${p.R - p.r}$` : `$d = ${p.R} + ${p.r} = ${p.R + p.r}$`),
    alto: () => 206, pie: 'Arrastra el centro del aro pequeño. El aro aparece al comprobar.',
    dib(v, K, p, f) {
      const u = AU(p), O = [AX(p), AY], Q = [O[0] + v.d * u, AY];
      return K.t(8, 16, `aro fijo: radio ${p.R}`, 's tm', 'start') + K.t(332, 16, `aro que mueves: radio ${p.r}`, 's ta', 'end') + aro(K, O, p.R * u) + K.f(f, aro(K, Q, p.r * u, 'la gr'))
        + seg(K, O, Q, 'lm d') + (v.d > 0.6 ? K.t((O[0] + Q[0]) / 2, AY - 8, n1(v.d), 's tf') : '') + K.c(O[0], O[1], 3.5, 'fk') + K.f(f * 2 - 1, K.t(170, 200, posicion(p, v.d), 'ta'));
    },
    lee: (v, p) => `$d = ${n1(v.d)}$; $\\;${p.R} + ${p.r} = ${p.R + p.r}$; $\\;${p.R} - ${p.r} = ${p.R - p.r}$`,
    aviso(v, p) {
      const ti = p.pos === 'ti';
      return v.d === (ti ? p.R + p.r : p.R - p.r) ? `Así se tocan por ${ti ? 'fuera' : 'dentro'}. Por ${ti ? 'dentro' : 'fuera'}, la distancia entre los centros es la ${ti ? 'resta' : 'suma'} de los radios.`
        : `Con los centros a ${v.d} quedan ${posicion(p, v.d)}. Se tocan por ${ti ? 'dentro' : 'fuera'} cuando la distancia es la ${ti ? 'resta' : 'suma'} de los radios.`;
    },
    bien: (v, p) => `Centros a ${v.d}: la ${p.pos === 'ti' ? 'resta' : 'suma'} de los radios. Se tocan en un solo punto.`,
  });

  // Según la distancia entre los centros, cómo quedan dos circunferencias.  params { et, metas, fichas, mira, trampas?, ok }
  XG.renglones('posicion-centros', { w: 132, x: 262 });

  // Desde un punto exterior: la tangente es perpendicular al radio, así que la distancia al centro es una hipotenusa.  params { r, t }   v { d }
  const TC = [76, 100], TR = 66;
  XG.figura('tangente-desde', {
    ini: p => ({ d: p.r + 1 }),
    manijas: p => [{ k: 'd', min: p.r + 1, max: 3 * p.r + 3, paso: 1, en: v => [76 + v.d * TR / p.r, 100], de: x => (x - 76) * p.r / TR }],
    ok: (v, p) => v.d * v.d === p.r * p.r + p.t * p.t,
    sol: p => ({ d: Math.sqrt(p.r * p.r + p.t * p.t) }),
    texto: p => `$\\sqrt{${p.r}^2 + ${p.t}^2} = ${Math.sqrt(p.r * p.r + p.t * p.t)}$`,
    alto: () => 200, pie: 'Arrastra el punto P: se aleja o se acerca.',
    dib(v, K, p, f) {
      const P = [76 + v.d * TR / p.r, 100], fi = Math.acos(Math.min(1, p.r / v.d)) * 180 / Math.PI, T = at(TC, TR, fi), T2 = at(TC, TR, -fi), m = medio(TC, T), n = medio(P, T);
      return aro(K, TC, TR) + seg(K, TC, P, 'lm d') + seg(K, P, T2, 'lm') + seg(K, TC, T, 'lg') + recto(K, T, TC, P) + seg(K, P, T, 'la gr')
        + K.t(m[0] - 7, m[1] + 2, p.r, 's tg', 'end') + K.t((76 + P[0]) / 2, 117, n1(v.d), 's tf') + K.t(n[0] + 6, n[1] - 8, f > 0.5 ? n1(Math.sqrt(Math.max(0, v.d * v.d - p.r * p.r))) : '?', 'ta', 'start')
        + pt(K, T, 'T', TC) + K.c(76, 100, 3.5, 'fk') + K.t(66, 96, 'O', 's tm') + K.t(Math.min(326, P[0] + 4), 84, 'P', 's');
    },
    lee: (v, p) => { const t = Math.sqrt(Math.max(0, v.d * v.d - p.r * p.r)); return `$\\sqrt{${n1(v.d)}^2 - ${p.r}^2} ${Number.isInteger(t) ? '=' : '\\approx'} ${n1(t)}$`; },
    aviso(v, p) {
      const t = Math.sqrt(v.d * v.d - p.r * p.r);
      return v.d === p.r + p.t ? 'Sumaste radio y tangente, pero forman un ángulo recto: la distancia al centro es la hipotenusa.' : v.d === p.t ? 'Esa es la medida de la tangente. La distancia al centro es la hipotenusa: más larga.'
        : `La tangente quedó de ${n1(t)}: ${t > p.t ? 'P está demasiado lejos' : 'P está demasiado cerca'}.`;
    },
    bien: (v, p) => `Radio ${p.r} y tangente ${p.t}, perpendiculares: la hipotenusa OP mide ${v.d}.`,
  });

  // Triángulo circunscrito: los dos segmentos tangentes que salen de cada vértice son congruentes.  params { x, y, z, et, metas, fichas, mira, ok }
  const TG = p => {
    const c = p.x + p.y, a = p.y + p.z, b = p.z + p.x, cx = (b * b + c * c - a * a) / (2 * c), cy = Math.sqrt(b * b - cx * cx), s = Math.min(290 / c, 112 / cy), x0 = 170 - c * s / 2, y0 = 142;
    const A = [x0, y0], B = [x0 + c * s, y0], C = [x0 + cx * s, y0 - cy * s], I = [(a * A[0] + b * B[0] + c * C[0]) / (a + b + c), (a * A[1] + b * B[1] + c * C[1]) / (a + b + c)];
    return { A, B, C, I, r: y0 - I[1], D: medio(A, B, p.x / c), E: medio(B, C, p.y / a), F: medio(A, C, p.x / b) };
  };
  XG.cuenta('tangentes-gemelas', 168, (K, p, f) => {
    const { A, B, C, I, r, D, E, F } = TG(p), dato = (P, Q, n) => { const m = medio(P, Q), u = uni(I, m); return K.t(m[0] + u[0] * 13, m[1] + u[1] * 13 + 4, n, 's ta'); };
    return K.p([A, B, C], 'fn') + aro(K, I, r, 'lm') + K.f(f, seg(K, A, D, 'la gr') + seg(K, A, F, 'la gr') + seg(K, B, D, 'lg gr') + seg(K, B, E, 'lg gr') + seg(K, C, E, 'lf gr') + seg(K, C, F, 'lf gr'))
      + dato(A, D, p.x) + dato(B, E, p.y) + dato(C, F, p.z) + pt(K, A, 'A', I) + pt(K, B, 'B', I) + pt(K, C, 'C', I) + pt(K, D, 'D', I) + pt(K, E, 'E', I) + pt(K, F, 'F', I);
  });

  // ============================================================================ lección 2 · ángulo central e inscrito
  // Se mueve B: se ve el central (lo que mide el arco) y hay que dejar el inscrito en lo pedido.  params { ang }   v { a }
  const IC = [170, 108], IR = 82, IA = 160, IP = 255;
  XG.figura('inscrito-mitad', {
    ini: () => ({ a: 60 }),
    manijas: () => [{ k: 'a', min: 20, max: 200, paso: 10, en: v => at(IC, IR, IA - v.a), de: (x, y) => vuelta(IA - gra(IC, x, y)) }],
    ok: (v, p) => v.a === 2 * p.ang,
    sol: p => ({ a: 2 * p.ang }),
    texto: p => `el arco mide $2 \\cdot ${p.ang}^\\circ = ${2 * p.ang}^\\circ$`,
    alto: () => 210, pie: 'Arrastra el punto B por la circunferencia.',
    dib(v, K, p, f) {
      const A = at(IC, IR, IA), B = at(IC, IR, IA - v.a), P = at(IC, IR, IP);
      return aro(K, IC, IR) + K.sec(IC[0], IC[1], 22, IA - v.a, IA, 'fg') + tx(K, at(IC, 38, IA - v.a / 2), gr(v.a), 's tg') + arco(K, IC, IR, IA - v.a, IA, 'lg gr') + seg(K, IC, A, 'lg') + seg(K, IC, B, 'lg')
        + K.ang(P, A, B, 26, f > 0.5 ? gr(v.a / 2) : '?', 'fa', 'ta') + seg(K, P, A, 'la gr') + seg(K, P, B, 'la gr') + pt(K, A, 'A', IC) + pt(K, P, 'P', IC) + K.c(IC[0], IC[1], 3.5, 'fk') + K.t(B[0] + uni(IC, B)[0] * 20, B[1] + uni(IC, B)[1] * 20 + 4, 'B', 's');
    },
    lee: v => `$${R(v.a)}^\\circ \\div 2 = ${n1(v.a / 2)}^\\circ$`,
    aviso: (v, p) => (v.a === p.ang ? 'Abriste el central igual a lo pedido, pero el inscrito es solo la mitad.' : v.a * 2 === p.ang ? 'Al revés: el arco es el doble del inscrito, no la mitad.' : `El inscrito quedó en ${v.a / 2}°: la mitad del arco de ${v.a}°.`),
    bien: v => `Arco de ${v.a}°, inscrito de ${v.a / 2}°: la mitad.`,
  });

  // Vértices desde los que se ve el arco AB con el mismo ángulo que el dorado.  params { A, B, P, pts: [{ g | c | d, si | no }], falta, ok }
  const MC = [170, 108], MR = 84, LET = 'QRSTUV';
  const donde = (p, i) => { const q = p.pts[i]; return q.c ? MC : q.d ? [MC[0] + q.d[0] * MR, MC[1] + q.d[1] * MR] : at(MC, MR, q.g); };
  XG.marca('mismo-arco', {
    sitios: p => p.pts.map((_, i) => { const [x, y] = donde(p, i); return { x: R(x), y: R(y), w: 38, h: 38, red: true }; }),
    cara(K, p, i, on) {
      const q = donde(p, i), u = p.pts[i].g == null ? [0.75, 0.75] : uni(MC, q);
      return (on ? seg(K, q, at(MC, MR, p.A), 'la') + seg(K, q, at(MC, MR, p.B), 'la') : '') + K.c(q[0], q[1], 4.5, on ? 'fA' : 'fk') + K.t(q[0] - u[0] * 12, q[1] - u[1] * 12 + 4, LET[i], 's');
    },
    fondo(K, p) {
      const A = at(MC, MR, p.A), B = at(MC, MR, p.B), P = at(MC, MR, p.P);
      return aro(K, MC, MR) + arco(K, MC, MR, p.A, p.B, 'lg gr') + K.ang(P, A, B, 24, '', 'fg') + seg(K, P, A, 'lg') + seg(K, P, B, 'lg') + pt(K, A, 'A', MC) + pt(K, B, 'B', MC) + pt(K, P, '', MC);
    },
    alto: () => 222, nombre: (p, i) => `vértice ${LET[i]}`,
    sol: p => p.pts.map((_, i) => i).filter(i => p.pts[i].si),
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.pts[k].si); return i >= 0 ? p.pts[i].no : p.falta; },
    bien: p => p.ok, texto: p => p.pts.map((q, i) => (q.si ? LET[i] : '')).filter(Boolean).join(' y '), pie: 'Toca cada vértice que cumple: se trazan sus lados.',
  });

  // Inscrito en una semicircunferencia: se mueve B hasta que el ángulo en P sea recto (AB tiene que ser un diámetro).  params { A, P }   v { b }
  const SC = [170, 106], SR = 80;
  const enP = (v, p) => R(abre(at(SC, SR, p.P), at(SC, SR, p.A), at(SC, SR, v.b)));
  XG.figura('semicirculo-recto', {
    ini: p => ({ b: p.A + 90 }),
    manijas: p => [{ k: 'b', min: p.A + 30, max: p.A + 210, paso: 15, en: v => at(SC, SR, v.b), de: (x, y) => { let g = gra(SC, x, y); while (g < p.A - 60) g += 360; return g; } }],
    ok: (v, p) => v.b === p.A + 180,
    sol: p => ({ b: p.A + 180 }),
    texto: () => 'AB debe ser un diámetro: el arco de $180^\\circ$ da un inscrito de $90^\\circ$',
    alto: () => 216, pie: 'Arrastra el punto B por la circunferencia.',
    dib(v, K, p, f) {
      const A = at(SC, SR, p.A), B = at(SC, SR, v.b), P = at(SC, SR, p.P), bien = Math.abs(v.b - p.A - 180) < 0.01;
      return aro(K, SC, SR) + seg(K, A, B, 'lg') + K.ang(P, A, B, 24, f > 0.5 ? gr(enP(v, p)) : '?', 'fa', 'ta') + K.f(bien ? f : 0, recto(K, P, A, B, 10)) + seg(K, P, A, 'la gr') + seg(K, P, B, 'la gr')
        + pt(K, A, 'A', SC) + pt(K, P, 'P', SC) + K.c(SC[0], SC[1], 3.5, 'fk') + K.t(SC[0], SC[1] + 17, 'O', 's tm') + K.t(B[0] + uni(SC, B)[0] * 20, B[1] + uni(SC, B)[1] * 20 + 4, 'B', 's');
    },
    lee: (v, p) => `$${2 * enP(v, p)}^\\circ \\div 2 = ${enP(v, p)}^\\circ$`,
    aviso: (v, p) => `Quedó en ${enP(v, p)}°: la cuerda AB no pasa por el centro, así que el arco no es media circunferencia.`,
    bien: () => 'AB es un diámetro: el arco mide 180° y el inscrito, su mitad, es recto.',
  });

  // Cuadrilátero inscrito: los opuestos son suplementarios.  params { arcos: [AB, BC, CD, DA], fichas }
  const QC = [112, 110], QR = 84;
  const qv = p => { const [ab, bc, cd] = p.arcos; return [140, 140 - ab, 140 - ab - bc, 140 - ab - bc - cd].map(g => at(QC, QR, g)); };
  const qa = p => { const [ab, bc, cd, da] = p.arcos; return [(bc + cd) / 2, (cd + da) / 2, (da + ab) / 2, (ab + bc) / 2]; };
  XG.rotula('cuadrilatero-inscrito', {
    slots: () => [{ x: 298, y: 78, w: 62, h: 38 }, { x: 298, y: 146, w: 62, h: 38 }],
    fichas: p => p.fichas, metas: p => [gr(qa(p)[2]), gr(qa(p)[3])],
    texto: p => { const a = qa(p); return `$\\angle C = 180^\\circ - ${a[0]}^\\circ = ${a[2]}^\\circ$ y $\\angle D = 180^\\circ - ${a[1]}^\\circ = ${a[3]}^\\circ$`; },
    alto: () => 220,
    fondo(K, p) {
      const [A, B, C, D] = qv(p), a = qa(p);
      return aro(K, QC, QR) + K.ang(A, D, B, 22, gr(a[0]), 'fa', 'ta') + K.ang(B, A, C, 22, gr(a[1]), 'fg', 'tg') + K.ang(C, B, D, 18, '', 'ff') + K.ang(D, C, A, 18, '', 'fo') + K.p([A, B, C, D], 'fn')
        + pt(K, A, 'A', QC) + pt(K, B, 'B', QC) + pt(K, C, 'C', QC) + pt(K, D, 'D', QC) + K.t(258, 83, '∠C', 'tf', 'end') + K.t(258, 151, '∠D', 'to', 'end');
    },
    aviso(q, p) {
      const a = qa(p);
      return q[0][0] === gr(a[0]) || q[1][0] === gr(a[1]) ? 'Los opuestos no son iguales: son suplementarios, suman 180°.' : q[0][0] === gr(a[3]) || q[1][0] === gr(a[2]) ? 'Van al revés: C está frente a A, y D frente a B.' : 'Un ángulo y su opuesto abarcan entre los dos toda la circunferencia: suman 180°.';
    },
    bien: () => 'En un cuadrilátero inscrito, los ángulos opuestos son suplementarios.',
  });

  // El mismo arco visto desde el centro, desde la circunferencia y desde el otro lado.  params { arco, et, metas, fichas, mira, trampas, ok }
  XG.cuenta('tres-miradas', 176, (K, p) => {
    const C = [170, 92], r = 74, A = at(C, r, 270 - p.arco / 2), B = at(C, r, 270 + p.arco / 2), P = at(C, r, 118), Q = at(C, r, 270);
    return K.t(8, 18, `arco AB: ${p.arco}°`, 's tg', 'start') + aro(K, C, r) + arco(K, C, r, 270 - p.arco / 2, 270 + p.arco / 2, 'lg gr') + K.sec(C[0], C[1], 18, 270 - p.arco / 2, 270 + p.arco / 2, 'fg') + K.ang(P, A, B, 22, '', 'fa') + K.ang(Q, A, B, 16, '', 'ff')
      + seg(K, C, A, 'lg') + seg(K, C, B, 'lg') + seg(K, P, A, 'la') + seg(K, P, B, 'la') + seg(K, Q, A, 'lf') + seg(K, Q, B, 'lf')
      + pt(K, A, 'A', C) + pt(K, B, 'B', C) + pt(K, P, 'P', C) + pt(K, Q, 'Q', C, 11) + K.c(C[0], C[1], 3.5, 'fk') + K.t(C[0], C[1] - 9, 'O', 's tm');
  });

  // Triángulo inscrito: cada ángulo es la mitad del arco de enfrente.  params { arcos: [AB, BC, CA], fichas }
  const TA = [116, 112], TQ = 76;
  const ta = p => [p.arcos[1] / 2, p.arcos[2] / 2, p.arcos[0] / 2];
  XG.rotula('triangulo-arcos', {
    slots: () => [0, 1, 2].map(i => ({ x: 298, y: 52 + i * 60, w: 62, h: 38 })),
    fichas: p => p.fichas, metas: p => ta(p).map(gr),
    texto: p => ta(p).map((x, i) => `$\\angle ${'ABC'[i]} = ${x}^\\circ$`).join(', '),
    alto: () => 224,
    fondo(K, p) {
      const [ab, bc, ca] = p.arcos, g = [215, 215 - ab, 215 - ab - bc], [A, B, C] = g.map(x => at(TA, TQ, x));
      return aro(K, TA, TQ) + K.ang(A, B, C, 18, '', 'fa') + K.ang(B, C, A, 18, '', 'fg') + K.ang(C, A, B, 18, '', 'ff') + K.p([A, B, C], 'fn')
        + tx(K, at(TA, TQ + 17, g[0] - ab / 2), gr(ab), 's tm') + tx(K, at(TA, TQ + 17, g[1] - bc / 2), gr(bc), 's tm') + tx(K, at(TA, TQ + 17, g[2] - ca / 2), gr(ca), 's tm')
        + pt(K, A, 'A', TA) + pt(K, B, 'B', TA) + pt(K, C, 'C', TA) + K.t(258, 57, '∠A', 'ta', 'end') + K.t(258, 117, '∠B', 'tg', 'end') + K.t(258, 177, '∠C', 'tf', 'end');
    },
    aviso(q, p) {
      const m = ta(p).map(gr), v = q.map(l => l[0]);
      return v.some(x => p.arcos.map(gr).includes(x)) ? 'Pusiste un arco entero: el ángulo inscrito mide la mitad.' : [...v].sort().join() === [...m].sort().join() ? 'Cada ángulo es la mitad del arco de enfrente, el que no toca su vértice.' : 'Cada ángulo inscrito mide la mitad del arco que abarca.';
    },
    bien: () => 'Cada ángulo del triángulo inscrito es la mitad del arco de enfrente.',
  });

  // Demostración afirmación–razón: el central es el doble del inscrito cuando un lado pasa por el centro.  params { et, metas, fichas, mira, ok }
  XG.renglones('razones-inscrito', { w: 156, x: 254, y0: 132, fondo(K) {
    const C = [170, 58], r = 44, P = at(C, r, 180), A = at(C, r, 0), B = at(C, r, 60);
    return aro(K, C, r) + K.ang(C, A, B, 16, '', 'fg') + K.ang(P, A, B, 20, '', 'fa') + seg(K, P, A) + seg(K, P, B, 'la') + seg(K, C, B, 'lg') + pt(K, P, 'P', C) + pt(K, A, 'A', C) + pt(K, B, 'B', C) + K.c(C[0], C[1], 3.5, 'fk') + K.t(C[0], C[1] + 17, 'O', 's tm');
  } });

  // ============================================================================ lección 3 · semiinscritos, interiores y exteriores
  // Según dónde está el vértice, la regla con los arcos.  params { et, metas, fichas, mira, ok }
  XG.renglones('donde-vertice', { w: 132, x: 262 });

  // Tangente y cuerda: se mueve B, se ve el arco y hay que dejar el semiinscrito en lo pedido.  params { ang }   v { a }
  const EC = [170, 100], ER = 76, EA = [170, 176];
  XG.figura('semiinscrito-abre', {
    ini: () => ({ a: 60 }),
    manijas: () => [{ k: 'a', min: 20, max: 200, paso: 10, en: v => at(EC, ER, 270 + v.a), de: (x, y) => vuelta(gra(EC, x, y) - 270) }],
    ok: (v, p) => v.a === 2 * p.ang,
    sol: p => ({ a: 2 * p.ang }),
    texto: p => `el arco mide $2 \\cdot ${p.ang}^\\circ = ${2 * p.ang}^\\circ$`,
    alto: () => 206, pie: 'Arrastra el punto B por la circunferencia.',
    dib(v, K, p, f) {
      const B = at(EC, ER, 270 + v.a);
      return aro(K, EC, ER) + K.l(24, 176, 316, 176) + arco(K, EC, ER, 270, 270 + v.a, 'lg gr') + tx(K, at(EC, ER + 17, 270 + v.a / 2), gr(v.a), 's tg')
        + K.ang(EA, [240, 176], B, 28, f > 0.5 ? gr(v.a / 2) : '?', 'fa', 'ta') + seg(K, EA, B, 'la gr') + K.c(170, 176, 3.5, 'fk') + K.t(156, 193, 'A', 's') + K.c(EC[0], EC[1], 3, 'fk') + K.t(B[0] - uni(EC, B)[0] * 18, B[1] - uni(EC, B)[1] * 18 + 4, 'B', 's');
    },
    lee: v => `$${R(v.a)}^\\circ \\div 2 = ${n1(v.a / 2)}^\\circ$`,
    aviso: (v, p) => (v.a === p.ang ? 'Dejaste el arco igual a lo pedido, pero el semiinscrito es solo la mitad del arco.' : v.a * 2 === p.ang ? 'Al revés: el arco es el doble del ángulo, no la mitad.' : `El semiinscrito quedó en ${v.a / 2}°: la mitad del arco de ${v.a}°.`),
    bien: v => `Arco de ${v.a}° entre la tangente y la cuerda: el ángulo mide ${v.a / 2}°.`,
  });

  // Dos cuerdas que se cortan: el ángulo interior es la semisuma de los arcos.  params { ab, ang }   v { cd }
  const XC = [170, 106], XR = 80;
  const cru = (p, cd) => { const A = at(XC, XR, 90 + p.ab / 2), B = at(XC, XR, 90 - p.ab / 2), C = at(XC, XR, 300), D = at(XC, XR, 300 - cd); return { A, B, C, D, X: corta(A, C, B, D) }; };
  XG.figura('cuerdas-cruzan', {
    ini: () => ({ cd: 40 }),
    manijas: () => [{ k: 'cd', min: 20, max: 160, paso: 10, en: v => at(XC, XR, 300 - v.cd), de: (x, y) => vuelta(300 - gra(XC, x, y)) }],
    ok: (v, p) => p.ab + v.cd === 2 * p.ang,
    sol: p => ({ cd: 2 * p.ang - p.ab }),
    texto: p => `$\\tfrac{${p.ab}^\\circ + ${2 * p.ang - p.ab}^\\circ}{2} = ${p.ang}^\\circ$`,
    alto: () => 214, pie: 'Arrastra el punto D por la circunferencia.',
    dib(v, K, p, f) {
      const { A, B, C, D, X } = cru(p, v.cd);
      return aro(K, XC, XR) + arco(K, XC, XR, 90 - p.ab / 2, 90 + p.ab / 2, 'lg gr') + arco(K, XC, XR, 300 - v.cd, 300, 'lf gr') + tx(K, at(XC, XR + 15, 90), gr(p.ab), 's tg') + tx(K, at(XC, XR + 17, 300 - v.cd / 2), gr(v.cd), 's tf')
        + K.ang(X, A, B, 20, '', 'fa') + K.t(10, 20, `ángulo: ${f > 0.5 ? gr((p.ab + v.cd) / 2) : '?'}`, 'ta', 'start') + seg(K, A, C, 'la') + seg(K, B, D, 'la') + pt(K, A, 'A', XC) + pt(K, B, 'B', XC) + pt(K, C, 'C', XC) + K.c(X[0], X[1], 3, 'fk') + K.t(D[0] - uni(XC, D)[0] * 18, D[1] - uni(XC, D)[1] * 18 + 4, 'D', 's');
    },
    lee: (v, p) => `$\\tfrac{${p.ab}^\\circ + ${R(v.cd)}^\\circ}{2} = ${n1((p.ab + v.cd) / 2)}^\\circ$`,
    aviso: (v, p) => (v.cd === 2 * p.ang ? 'Olvidaste el arco de arriba: el ángulo interior promedia los dos arcos.' : v.cd === p.ang ? 'El ángulo no es igual a uno de sus arcos: es el promedio de los dos.' : `El ángulo quedó en ${(p.ab + v.cd) / 2}°: la semisuma de ${p.ab}° y ${v.cd}°.`),
    bien: (v, p) => `Semisuma: ${p.ab}° más ${v.cd}°, entre 2, da ${(p.ab + v.cd) / 2}°.`,
  });

  // Dos secantes desde un punto exterior: semidiferencia de los arcos.  params { n, ang }   v { m }
  const PC = [100, 104], PR = 72, pmin = p => p.n + (p.n <= 40 ? 40 : 60);
  const sec2 = (c, r, m, n) => ({ N1: at(c, r, n / 2), N2: at(c, r, -n / 2), F1: at(c, r, 180 - m / 2), F2: at(c, r, 180 + m / 2), P: [c[0] + r * Math.cos(rad(n / 2)) + r * Math.sin(rad(n / 2)) / Math.tan(rad(Math.max(4, m - n) / 4)), c[1]] });
  XG.figura('secantes-abren', {
    ini: p => ({ m: pmin(p) }),
    manijas: p => [{ k: 'm', min: pmin(p), max: 240, paso: 10, en: v => at(PC, PR, 180 + v.m / 2), de: (x, y) => 2 * (gra(PC, x, y) - 180) }],
    ok: (v, p) => v.m - p.n === 2 * p.ang,
    sol: p => ({ m: 2 * p.ang + p.n }),
    texto: p => `$\\tfrac{${2 * p.ang + p.n}^\\circ - ${p.n}^\\circ}{2} = ${p.ang}^\\circ$`,
    alto: () => 208, pie: 'Arrastra el punto de abajo: las dos secantes se abren a la vez.',
    dib(v, K, p, f) {
      const { N1, N2, F1, F2, P } = sec2(PC, PR, v.m, p.n);
      return aro(K, PC, PR) + arco(K, PC, PR, 180 - v.m / 2, 180 + v.m / 2, 'lf gr') + arco(K, PC, PR, -p.n / 2, p.n / 2, 'lg gr') + tx(K, at(PC, PR - 22, 180), gr(v.m), 's tf') + tx(K, at(PC, PR - 18, 0), gr(p.n), 's tg')
        + K.ang(P, F1, F2, 30, '', 'fa') + seg(K, F1, P, 'la') + seg(K, F2, P, 'la') + [N1, N2, F1].map(q => K.c(q[0], q[1], 3, 'fk')).join('') + K.c(P[0], P[1], 3.5, 'fk') + K.t(Math.min(322, P[0] + 2), 84, f > 0.5 ? gr((v.m - p.n) / 2) : '?', 'ta') + K.t(Math.min(326, P[0] + 4), 124, 'P', 's');
    },
    lee: (v, p) => `$\\tfrac{${R(v.m)}^\\circ - ${p.n}^\\circ}{2} = ${n1((v.m - p.n) / 2)}^\\circ$`,
    aviso: (v, p) => (v.m + p.n === 2 * p.ang ? 'Promediaste los arcos: eso es para un vértice interior. Con el vértice afuera, los arcos se restan.' : v.m - p.n === p.ang ? 'Restaste los arcos, pero falta sacar la mitad.' : `El ángulo quedó en ${(v.m - p.n) / 2}°: la semidiferencia de ${v.m}° y ${p.n}°.`),
    bien: (v, p) => `Semidiferencia: ${v.m}° menos ${p.n}°, entre 2, da ${(v.m - p.n) / 2}°.`,
  });

  // Dos tangentes desde un punto exterior: el ángulo es la semidiferencia del arco mayor y el menor.  params { ang }   v { a }
  const GC = [92, 104], GR = 52;
  XG.figura('tangentes-abren', {
    ini: () => ({ a: 30 }),
    manijas: () => [{ k: 'a', min: 30, max: 130, paso: 10, en: v => [GC[0] + GR / Math.sin(rad(v.a / 2)), 104], de: x => (x - GC[0] <= GR ? 180 : 2 * Math.asin(GR / (x - GC[0])) * 180 / Math.PI) }],
    ok: (v, p) => v.a === p.ang,
    sol: p => ({ a: p.ang }),
    texto: p => `$\\tfrac{${180 + p.ang}^\\circ - ${180 - p.ang}^\\circ}{2} = ${p.ang}^\\circ$`,
    alto: () => 208, pie: 'Arrastra el punto P: se aleja o se acerca.',
    dib(v, K, p, f) {
      const h = 90 - v.a / 2, P = [GC[0] + GR / Math.sin(rad(v.a / 2)), 104], T1 = at(GC, GR, h), T2 = at(GC, GR, -h);
      return aro(K, GC, GR) + arco(K, GC, GR, -h, h, 'lg gr') + arco(K, GC, GR, h, 360 - h, 'lf gr') + K.t(GC[0] + GR - 20, 108, gr(180 - v.a), 's tg') + K.t(GC[0] - GR - 5, 108, gr(180 + v.a), 's tf', 'end')
        + seg(K, GC, T1, 'lm') + seg(K, GC, T2, 'lm') + recto(K, T1, GC, P, 7) + recto(K, T2, GC, P, 7) + K.ang(P, T1, T2, 26, '', 'fa') + seg(K, P, T1, 'la gr') + seg(K, P, T2, 'la gr')
        + K.c(T1[0], T1[1], 3, 'fk') + K.c(T2[0], T2[1], 3, 'fk') + K.c(GC[0], GC[1], 3, 'fk') + K.t(330, 20, `ángulo en P: ${f > 0.5 ? gr(v.a) : '?'}`, 'ta', 'end') + K.t(Math.min(326, P[0]), 128, 'P', 's');
    },
    lee: v => `$\\tfrac{${R(180 + v.a)}^\\circ - ${R(180 - v.a)}^\\circ}{2} = ${n1(v.a)}^\\circ$`,
    aviso: (v, p) => (180 - v.a === p.ang ? 'Dejaste el arco menor en lo pedido. El ángulo y el arco menor son suplementarios, no iguales.' : `El ángulo quedó en ${v.a}°: la mitad de ${180 + v.a}° menos ${180 - v.a}°.`),
    bien: v => `Semidiferencia: ${180 + v.a}° menos ${180 - v.a}°, entre 2, da ${v.a}°.`,
  });

  // Los mismos dos arcos, con el vértice adentro (cuerdas) y afuera (secantes).  params { m, n, et, metas, fichas, mira, trampas, ok }
  XG.cuenta('interior-o-exterior', 150, (K, p, f) => {
    const L = [78, 76], r = 50, D = [236, 76], s = 40, a = sec2(L, r, p.m, p.n), b = sec2(D, s, p.m, p.n), X = corta(a.F1, a.N2, a.F2, a.N1);
    const arcos = (c, q) => arco(K, c, q, 180 - p.m / 2, 180 + p.m / 2, 'lf gr') + arco(K, c, q, -p.n / 2, p.n / 2, 'lg gr');
    return aro(K, L, r) + arcos(L, r) + K.t(L[0] - r - 13, 80, gr(p.m), 's tf') + K.t(L[0] + r + 15, 80, gr(p.n), 's tg') + K.ang(X, a.F1, a.F2, 14, '', 'fa') + seg(K, a.F1, a.N2, 'la') + seg(K, a.F2, a.N1, 'la') + K.c(X[0], X[1], 3, 'fk')
      + aro(K, D, s) + arcos(D, s) + K.t(D[0] - s - 15, 80, gr(p.m), 's tf') + K.t(D[0] + s - 15, 80, gr(p.n), 's tg') + K.ang(b.P, b.F1, b.F2, 20, '', 'fa') + seg(K, b.F1, b.P, 'la') + seg(K, b.F2, b.P, 'la') + K.c(b.P[0], b.P[1], 3, 'fk')
      + K.f(f, K.t(L[0], 146, 'semisuma', 's ta') + K.t(D[0] + 20, 146, 'semidiferencia', 's ta'));
  });

  // En movimiento: un punto recorre la circunferencia y marca el arco que se le da (de 5 en 5, hasta la vuelta entera).
  XG.tiros('gira-arco', {
    perilla: () => ({ et: 'Arco', min: 0, max: 72, cara: v => v * 5, lee: v => `${v * 5}°` }),
    meta: t => t.r / 5, alto: 196, ms: 1600,
    dib(t, v, K, p, f) {
      const C = [170, 98], r = 76;
      let h = aro(K, C, r, 'lm');
      for (let g = 0; g < 360; g += 15) h += seg(K, at(C, g % 90 ? r - 5 : r - 10, g), at(C, r, g), 'lm');
      h += seg(K, C, at(C, r, 0), 'lm') + K.c(C[0], C[1], 3.5, 'fk');
      if (v == null) return h + K.c(C[0] + r, C[1], 6, 'fA');
      const a = v * 5 * Math.min(1, f * 1.25), q = at(C, r, a), fin = f * 5 - 4;
      return h + K.sec(C[0], C[1], 24, 0, a, 'fa') + arco(K, C, r, 0, a, 'la gr') + seg(K, C, q, 'la') + K.c(q[0], q[1], 6, 'fA') + K.f(fin, (v * 5 === t.r ? K.c(q[0], q[1], 11, 'fo') : '') + K.t(C[0], C[1] - 34, `${v * 5}°`, 'b ta'));
    },
    falla: (t, v) => (t.e?.[v * 5] || (v * 5 > t.r ? 'Se pasó: el arco es más corto.' : 'Le faltó: el arco es más largo.')),
    cuenta: t => `$${t.c} = ${t.r}^\\circ$`, pie: 'Estira el arco y suelta: el punto gira.',
  });
})();
;
//#archivo js/games/euc-escena-6.js
// Geometría Euclidiana · mundo 6 «euc-metricas»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Segmentos proporcionales, semejanza, relaciones métricas del triángulo rectángulo, potencia de un punto y polígonos regulares inscritos.
(() => {
  const R = Math.round, r1 = x => Math.round(x * 10) / 10, r2 = x => Math.round(x * 100) / 100, sg = x => XPK.sig(x);
  const cerca = (a, b) => Math.abs(a - b) < 1e-9;
  const raiz = q => { const s = Math.sqrt(q); return cerca(s, R(s)) ? `${R(s)}` : `≈ ${r1(s)}`; };
  const medio = (P, Q, t = 0.5) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const tope = (x, a, b) => Math.max(a, Math.min(b, x));
  const grados = (V, P, Q) => { const d = Math.abs(Math.atan2(P[1] - V[1], P[0] - V[0]) - Math.atan2(Q[1] - V[1], Q[0] - V[0])) * 180 / Math.PI; return d > 180 ? 360 - d : d; };
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const dir = g => [Math.cos(g * Math.PI / 180), -Math.sin(g * Math.PI / 180)];   // en pantalla: y hacia abajo

  // ------------------------------------------------------------------------------- euc-metricas-1 · segmentos proporcionales y Tales
  // De una proporción salen otras.  params { da, et, metas, fichas, mira, trampas?, ok }
  XG.renglones('proporcion-propiedades', { w: 100, x: 282, y0: 62, fondo: (K, p) => K.t(170, 24, p.da, 'b ta') });
  // Parejas de segmentos: se tocan las que forman proporción.
  XG.frases('forman-proporcion');

  // Media proporcional: a es a x como x es a b.  v { x }
  XG.figura('media-segmento', {
    ini: () => ({ x: 1 }),
    manijas: p => [{ k: 'x', min: 1, max: p.max, paso: 1, et: 'largo de x' }],
    ok: (v, p) => v.x * v.x === p.a * p.b,
    sol: p => ({ x: Math.sqrt(p.a * p.b) }),
    texto: p => `$x^2 = ${p.a} \\cdot ${p.b} = ${p.a * p.b}$, así que $x = ${Math.sqrt(p.a * p.b)}$`,
    alto: () => 198, pie: 'Arrastra el largo de x.',
    dib(v, K, p, f) {
      const u = 250 / Math.max(p.a, p.b, p.max), bien = v.x * v.x === p.a * p.b;
      const barra = (y, n, cls, et) => K.r(58, y, n * u, 22, cls, 4) + K.t(50, y + 16, et, '', 'end');
      return barra(12, p.a, 'fg', p.a) + barra(50, v.x, 'fa', 'x') + barra(88, p.b, 'ff', p.b)
        + K.f(f * 2 - 1, K.t(170, 136, `${p.a} ÷ ${sg(v.x)} = ${r2(p.a / v.x)}  y  ${sg(v.x)} ÷ ${p.b} = ${r2(v.x / p.b)}`, bien ? 's to' : 's tf'));
    },
    lee: (v, p) => `$\\tfrac{${p.a}}{${R(v.x)}} = ${r2(p.a / v.x)}$ y $\\tfrac{${R(v.x)}}{${p.b}} = ${r2(v.x / p.b)}$`,
    aviso: (v, p) => (2 * v.x === p.a + p.b ? 'Ese es el promedio. En la media proporcional se multiplica: x por x vale lo mismo que los extremos.'
      : v.x * v.x > p.a * p.b ? `Se pasó: ${v.x} por ${v.x} da ${v.x * v.x}, más que ${p.a} por ${p.b}.` : `Le falta: ${v.x} por ${v.x} da ${v.x * v.x}, menos que ${p.a} por ${p.b}.`),
    bien: (v, p) => `${p.a} es a ${v.x} como ${v.x} es a ${p.b}: x por x vale ${p.a * p.b}.`,
  });

  // Teorema fundamental: la paralela a un lado parte los otros dos en la misma razón.  v { e } = AE
  const TA = [150, 26], TB = [38, 184], TC = [302, 184];
  XG.figura('paralela-lado', {
    ini: p => ({ e: p.e0 ?? 1 }),
    manijas: p => [{ k: 'e', min: 1, max: p.ac - 1, paso: p.paso || 1, en: v => medio(TA, TC, v.e / p.ac),
      de: (x, y) => ((x - TA[0]) * (TC[0] - TA[0]) + (y - TA[1]) * (TC[1] - TA[1])) / ((TC[0] - TA[0]) ** 2 + (TC[1] - TA[1]) ** 2) * p.ac }],
    ok: (v, p) => cerca(v.e * (p.ad + p.db), p.ad * p.ac),
    sol: p => ({ e: p.ad * p.ac / (p.ad + p.db) }),
    texto: p => `$\\tfrac{${p.ad}}{${p.db}} = \\tfrac{AE}{EC}$ con $AE + EC = ${p.ac}$: $AE = ${r2(p.ad * p.ac / (p.ad + p.db))}$`,
    alto: () => 208, pie: 'Arrastra el punto E por el lado AC.',
    dib(v, K, p, f) {
      const t = p.ad / (p.ad + p.db), D = medio(TA, TB, t), E = medio(TA, TC, v.e / p.ac), G = medio(TA, TC, t), bien = cerca(v.e * (p.ad + p.db), p.ad * p.ac);
      const iz = (P, Q, s) => { const m = medio(P, Q); return K.t(m[0] - 9, m[1] + 4, s, 's', 'end'); }, de = (P, Q, s, cls) => { const m = medio(P, Q); return K.t(m[0] + 10, m[1] + 4, s, cls, 'start'); };
      return K.p([TA, TB, TC], 'fn') + K.f(f, K.l(...D, ...G, bien ? 'lo d' : 'lg d')) + K.l(...D, ...E, 'la gr') + K.c(...D, 4, 'fk')
        + iz(TA, D, p.ad) + iz(D, TB, p.db) + de(TA, E, sg(v.e), 's ta') + de(E, TC, f > 0.5 ? sg(p.ac - v.e) : '?', 's tg')
        + K.t(TA[0], 16, 'A', 's tm') + K.t(TB[0] - 12, 198, 'B', 's tm') + K.t(TC[0] + 12, 198, 'C', 's tm') + K.t(D[0] - 26, D[1] + 4, 'D', 's tm') + K.t(E[0] + 34, E[1] + 4, 'E', 's tm')
        + K.t(332, 16, `AC = ${p.ac}`, 's tm', 'end');
    },
    lee: (v, p) => `$\\tfrac{${p.ad}}{${p.db}} = ${r2(p.ad / p.db)}$ y $\\tfrac{${sg(v.e)}}{${sg(p.ac - v.e)}} = ${r2(v.e / (p.ac - v.e))}$`,
    aviso: (v, p) => (cerca(v.e * (p.ad + p.db), p.db * p.ac) ? 'Quedó al revés: el trozo de arriba, AE, es el que corresponde a AD.'
      : v.e === p.ad ? 'Copiaste la medida de AD. Los trozos no miden lo mismo: guardan la misma razón.'
        : v.e * p.db > p.ad * (p.ac - v.e) ? 'DE no quedó paralela a BC: E bajó de más.' : 'DE no quedó paralela a BC: a E le falta bajar.'),
    bien: () => 'AD es a DB como AE es a EC: la paralela parte los dos lados en la misma razón.',
  });

  // Teorema de la bisectriz: el pie D reparte BC como AB es a AC.  v { d } = BD
  const TRI = p => { const xa = (p.ab ** 2 - p.ac ** 2 + p.bc ** 2) / (2 * p.bc), ya = Math.sqrt(p.ab ** 2 - xa ** 2), u = Math.min(280 / p.bc, 136 / ya), x0 = 170 - p.bc * u / 2; return { u, B: [x0, 176], C: [x0 + p.bc * u, 176], A: [x0 + xa * u, 176 - ya * u] }; };
  XG.figura('bisectriz-corta', {
    ini: p => ({ d: p.d0 ?? 1 }),
    manijas: p => { const T = TRI(p); return [{ k: 'd', min: 1, max: p.bc - 1, paso: 0.5, en: v => [T.B[0] + v.d * T.u, 176], de: x => (x - T.B[0]) / T.u }]; },
    ok: (v, p) => cerca(v.d * (p.ab + p.ac), p.bc * p.ab),
    sol: p => ({ d: p.bc * p.ab / (p.ab + p.ac) }),
    texto: p => `$\\tfrac{BD}{DC} = \\tfrac{${p.ab}}{${p.ac}}$ con $BD + DC = ${p.bc}$: $BD = ${r2(p.bc * p.ab / (p.ab + p.ac))}$`,
    alto: () => 208, pie: 'Arrastra el punto D por el lado BC.',
    dib(v, K, p, f) {
      const { u, A, B, C } = TRI(p), D = [B[0] + v.d * u, 176], bien = cerca(v.d * (p.ab + p.ac), p.bc * p.ab), a1 = r1(grados(A, B, D)), a2 = bien ? a1 : r1(grados(A, D, C));
      const m1 = medio(A, B), m2 = medio(A, C);
      return K.f(f, K.ang(A, B, D, 30, '', 'fa') + K.ang(A, D, C, 30, '', 'fg')) + K.p([A, B, C], 'fn') + K.l(...A, ...D, 'la gr')
        + K.t(m1[0] - 9, m1[1], p.ab, 's', 'end') + K.t(m2[0] + 9, m2[1], p.ac, 's', 'start')
        + K.t((B[0] + D[0]) / 2, 196, sg(v.d), 's ta') + K.t((D[0] + C[0]) / 2, 196, sg(p.bc - v.d), 's tg')
        + K.t(A[0], A[1] - 8, 'A', 's tm') + K.t(B[0] - 10, 180, 'B', 's tm') + K.t(C[0] + 10, 180, 'C', 's tm')
        + K.f(f * 2 - 1, K.t(8, 16, `∠BAD = ${a1}°`, 's ta', 'start') + K.t(332, 16, `∠DAC = ${a2}°`, 's tg', 'end'));
    },
    lee: (v, p) => `$\\tfrac{BD}{DC} = \\tfrac{${sg(v.d)}}{${sg(p.bc - v.d)}} = ${r2(v.d / (p.bc - v.d))}$ y $\\tfrac{AB}{AC} = \\tfrac{${p.ab}}{${p.ac}} = ${r2(p.ab / p.ac)}$`,
    aviso: (v, p) => (2 * v.d === p.bc ? 'Ese es el punto medio: ahí llega la mediana. La bisectriz se carga hacia el lado más corto.'
      : cerca(v.d * (p.ab + p.ac), p.bc * p.ac) ? 'Quedó al revés: el trozo que toca a B es el que corresponde al lado AB.'
        : 'AD no parte el ángulo en dos iguales: compara BD con DC y AB con AC.'),
    bien: () => 'BD es a DC como AB es a AC: la bisectriz reparte el lado opuesto como los lados vecinos.',
  });

  // ---------------------------------------------------------------------------------------- euc-metricas-2 · semejanza de triángulos
  // Parejas de triángulos con algunos datos: qué criterio asegura que son semejantes.
  //   params { pares: [{ a: { l: [izq, der, base], g: [izq, der, arriba] }, b: {…} }], metas, fichas, mira, trampas?, ok }
  const FORMAS = [[0.3, 1], [0.62, 0.94], [0.44, 1]];
  const conDatos = (K, x, y, w, h, s, t) => {
    const A = [x, y], B = [x + w, y], C = [x + w * s[0], y - h * s[1]], l = t.l || [], g = t.g || [], mi = medio(A, C), md = medio(B, C);
    return (g[0] ? K.ang(A, B, C, 14, '', 'fa') + K.t(x + 27, y - 5, g[0], 's ta') : '') + (g[1] ? K.ang(B, A, C, 14, '', 'fg') + K.t(x + w - 26, y - 5, g[1], 's tg') : '')
      + (g[2] ? K.ang(C, A, B, 12, '', 'ff') + K.t(C[0] + 1, C[1] + 25, g[2], 's tf') : '') + K.p([A, B, C], 'fn')
      + (l[0] ? K.t(mi[0] - 5, mi[1] + 2, l[0], 's', 'end') : '') + (l[1] ? K.t(md[0] + 5, md[1] + 2, l[1], 's', 'start') : '') + (l[2] ? K.t(x + w / 2, y + 13, l[2], 's') : '');
  };
  XG.rotula('criterio-semejanza', {
    slots: p => p.pares.map((_, i) => ({ x: 286, y: 46 + i * 78, w: 92, h: 40 })),
    fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => p.pares.length * 78 + 10,
    fondo: (K, p) => p.pares.map((q, i) => conDatos(K, 26, 72 + i * 78, 74, 42, FORMAS[i % 3], q.a) + conDatos(K, 126, 72 + i * 78, 100, 57, FORMAS[i % 3], q.b)).join(''),
    aviso: avisa, bien: p => p.ok,
  });
  // Parejas que siempre son semejantes.
  XG.frases('siempre-semejantes');

  // En triángulos semejantes, alturas, medianas y perímetros guardan la razón de semejanza.
  const partes = p => [p.h0, p.m0, p.p0].map(x => String(r2(x * p.l1 / p.l0)));
  XG.rotula('semejantes-partes', {
    slots: () => [0, 1, 2].map(i => ({ x: 62 + i * 108, y: 214, w: 88, h: 38 })),
    fichas: p => p.fichas, metas: partes, alto: () => 238,
    texto: p => `todo se multiplica por $\\tfrac{${p.l1}}{${p.l0}}$: ${partes(p).join(', ')}`,
    fondo(K, p) {
      const k = p.l1 / p.l0, s = p.s || [0.36, 0.48], W = 150, w = W / k;
      const tri = (x, a, base, cls) => { const A = [x, 150], B = [x + a, 150], C = [x + a * s[0], 150 - a * s[1]], M = [x + a / 2, 150]; return K.p([A, B, C], cls) + K.l(C[0], C[1], C[0], 150, 'lg d') + K.l(...C, ...M, 'lf') + K.t(x + a / 2, 165, base, 's'); };
      return K.t(8, 18, `altura ${p.h0}`, 's tg', 'start') + K.t(8, 35, `mediana ${p.m0}`, 's tf', 'start') + K.t(8, 52, `perímetro ${p.p0}`, 's', 'start')
        + tri(20, w, p.l0, 'fn') + tri(172, W, p.l1, 'fa') + ['altura', 'mediana', 'perímetro'].map((t, i) => K.t(62 + i * 108, 188, t, 's tm')).join('');
    },
    aviso(q, p) {
      const m = partes(p), d = p.l1 - p.l0, i = m.findIndex((x, k) => q[k][0] !== x);
      return [p.h0, p.m0, p.p0].some((x, k) => q[k][0] === String(r2(x + d))) ? `Sumaste ${d}, la diferencia de las bases. En figuras semejantes todo se multiplica por la misma razón.`
        : q[2][0] === String(r2(p.p0 * (p.l1 / p.l0) ** 2)) ? 'El perímetro es un largo: crece por la razón, no por su cuadrado.'
          : `Mira la ${['altura', 'mediana', 'suma de los lados'][i]}: va en la misma razón que las bases, ${p.l1} a ${p.l0}.`;
    },
    bien: () => 'Alturas, medianas y perímetros guardan la razón de semejanza.',
  });

  // L-L-L: se arman los otros dos lados del triángulo grande hasta que tenga la forma del pequeño.  v { x, y }
  const apice = (c, x, y) => { const px = (x * x - y * y + c * c) / (2 * c), h2 = x * x - px * px; return [px, Math.sqrt(Math.max(0, h2)), h2 > 1e-9]; };
  const angulos = (c, x, y) => { const a = Math.acos(tope((x * x + c * c - y * y) / (2 * x * c), -1, 1)) * 180 / Math.PI, b = Math.acos(tope((y * y + c * c - x * x) / (2 * y * c), -1, 1)) * 180 / Math.PI; return [R(a), R(b), 180 - R(a) - R(b)]; };
  const semeja = (v, p) => cerca(v.x * p.t[2], p.t[0] * p.c1) && cerca(v.y * p.t[2], p.t[1] * p.c1);
  XG.figura('arma-semejante', {
    ini: p => ({ x: p.v[0], y: p.v[1] }),
    manijas: p => [{ k: 'x', min: p.min, max: p.max, paso: 0.5, et: 'lado izquierdo' }, { k: 'y', min: p.min, max: p.max, paso: 0.5, et: 'lado derecho' }],
    ok: semeja,
    sol: p => ({ x: p.t[0] * p.c1 / p.t[2], y: p.t[1] * p.c1 / p.t[2] }),
    texto: p => `la razón es $\\tfrac{${p.c1}}{${p.t[2]}}$: los lados miden $${r2(p.t[0] * p.c1 / p.t[2])}$ y $${r2(p.t[1] * p.c1 / p.t[2])}$`,
    alto: () => 262, pie: 'Mueve los dos lados del triángulo grande.',
    dib(v, K, p, f) {
      const [a0, b0, c0] = p.t, u = p.u || 13, y0 = 152, s = apice(c0, a0, b0), g = apice(p.c1, v.x, v.y), X = 152, bien = semeja(v, p);
      const A = [14, y0], B = [14 + c0 * u, y0], C = [14 + s[0] * u, y0 - s[1] * u], P = [X, y0], Q = [X + p.c1 * u, y0], T = [tope(X + g[0] * u, 12, 328), y0 - g[1] * u];
      const lado = (M, N, t, cls, a, dx) => { const m = medio(M, N); return K.t(m[0] + dx, m[1] + 2, t, cls, a); };
      return K.p([A, B, C], 'fn') + lado(A, C, a0, 's', 'end', -6) + lado(B, C, b0, 's', 'start', 6) + K.t(14 + c0 * u / 2, y0 + 14, c0, 's')
        + K.p([P, Q, T], g[2] ? 'fa' : 'ff') + lado(P, T, sg(v.x), 's ta', 'end', -6) + lado(Q, T, sg(v.y), 's ta', 'start', 6) + K.t(X + p.c1 * u / 2, y0 + 14, p.c1, 's')
        + K.f(f * 2 - 1, K.t(8, 14, `ángulos ${angulos(c0, a0, b0).join('°, ')}°`, 's tm', 'start') + K.t(332, 14, g[2] ? `ángulos ${angulos(p.c1, v.x, v.y).join('°, ')}°` : 'no cierra', bien ? 's to' : 's tf', 'end'));
    },
    lee: (v, p) => `$\\tfrac{${sg(v.x)}}{${p.t[0]}} = ${r2(v.x / p.t[0])}$, $\\tfrac{${sg(v.y)}}{${p.t[1]}} = ${r2(v.y / p.t[1])}$ y $\\tfrac{${p.c1}}{${p.t[2]}} = ${r2(p.c1 / p.t[2])}$`,
    aviso(v, p) {
      const [a0, b0, c0] = p.t, d = p.c1 - c0;
      return !apice(p.c1, v.x, v.y)[2] ? 'Con esos lados el triángulo ni siquiera cierra.'
        : v.x === a0 + d && v.y === b0 + d ? `Sumaste ${d} a cada lado y la forma cambió. Los lados homólogos se multiplican por la misma razón.`
          : cerca(v.x * c0, b0 * p.c1) && cerca(v.y * c0, a0 * p.c1) ? `Quedó volteado: el lado izquierdo es el homólogo del que mide ${a0}.`
            : 'Las tres razones entre lados homólogos deben ser iguales, y no lo son.';
    },
    bien: (v, p) => `Los tres lados crecieron por ${r2(p.c1 / p.t[2])}: lados proporcionales, ángulos iguales (L-L-L).`,
  });

  // ---------------------------------------------------------------------------- euc-metricas-3 · Pitágoras y el triángulo rectángulo
  // El vértice del ángulo recto recorre la semicircunferencia; la hipotenusa c queda partida en las proyecciones m y n.  v { m }
  //   modo h: la altura debe medir p.h (con la proyección menor a la izquierda); modo a: el cateto izquierdo debe medir p.a.
  const relacion = (nombre, modo) => {
    const U = p => 290 / p.c, Y0 = 172, X0 = 25, pie = (v, p) => [X0 + v.m * U(p), Y0], cima = (v, p) => [X0 + v.m * U(p), Y0 - Math.sqrt(v.m * (p.c - v.m)) * U(p)];
    const vale = (v, p) => (modo === 'h' ? v.m * (p.c - v.m) === p.h * p.h && 2 * v.m < p.c : p.c * v.m === p.a * p.a);
    const sol = p => { if (modo === 'a') return { m: p.a * p.a / p.c }; for (let m = 1; 2 * m < p.c; m++) if (m * (p.c - m) === p.h * p.h) return { m }; return { m: 0 }; };
    XG.figura(nombre, {
      ini: p => ({ m: p.m0 ?? R(p.c / 2) }),
      manijas: p => [{ k: 'm', min: 1, max: p.c - 1, paso: 1, en: v => cima(v, p), de: x => (x - X0) / U(p) }],
      ok: vale, sol,
      texto: p => (modo === 'h' ? `$h^2 = m \\cdot n$: $${p.h}^2 = ${sol(p).m} \\cdot ${p.c - sol(p).m}$` : `$a^2 = c \\cdot m$: $${p.a}^2 = ${p.c} \\cdot ${sol(p).m}$`),
      alto: () => 204, pie: 'Arrastra el vértice del ángulo recto.',
      dib(v, K, p, f) {
        const u = U(p), A = [X0, Y0], B = [X0 + p.c * u, Y0], H = pie(v, p), C = cima(v, p), n = p.c - v.m, ver = f > 0.5, bien = vale(v, p);
        return K.arc(X0 + p.c * u / 2, Y0, p.c * u / 2, 0, 180, 'lm d') + K.r(H[0], Y0 - 8, 8, 8, 'fn', 0) + K.p([A, B, C], 'fn')
          + K.l(...C, ...H, modo === 'h' ? 'lg gr' : 'lg d') + (modo === 'a' ? K.l(...A, ...C, 'la gr') : '')
          + K.l(A[0], Y0 + 7, H[0], Y0 + 7, 'la gr') + K.l(H[0], Y0 + 7, B[0], Y0 + 7, 'lf gr')
          + K.t((A[0] + H[0]) / 2, Y0 + 24, `m = ${v.m}`, 's ta') + K.t((H[0] + B[0]) / 2, Y0 + 24, `n = ${n}`, 's tf')
          + (modo === 'h' ? K.t(H[0] + 8, (C[1] + Y0) / 2 + 4, ver ? `h ${raiz(v.m * n).replace(/^(\d)/, '= $1')}` : 'h = ?', ver ? (bien ? 's to' : 's tf') : 's tg', 'start')
            : K.t(8, 14, ver ? `cateto a ${raiz(p.c * v.m).replace(/^(\d)/, '= $1')}` : 'cateto a = ?', ver ? (bien ? 's to' : 's tf') : 's ta', 'start'))
          + K.t(332, 14, `hipotenusa ${p.c}`, 's tm', 'end');
      },
      lee: (v, p) => (modo === 'h' ? `$h^2 = ${v.m} \\cdot ${p.c - v.m} = ${v.m * (p.c - v.m)}$` : `$a^2 = ${p.c} \\cdot ${v.m} = ${p.c * v.m}$`),
      aviso: (v, p) => (modo === 'h'
        ? (v.m * (p.c - v.m) === p.h * p.h ? 'La altura sí mide eso, pero la proyección menor tenía que quedar a la izquierda.' : `Con proyecciones ${v.m} y ${p.c - v.m}, el cuadrado de la altura es ${v.m * (p.c - v.m)}, no ${p.h * p.h}.`)
        : (v.m === p.a ? 'La proyección no mide lo mismo que el cateto: es su sombra sobre la hipotenusa, más corta.' : `Con proyección ${v.m}, el cuadrado del cateto es ${p.c} por ${v.m}, o sea ${p.c * v.m}, no ${p.a * p.a}.`)),
      bien: (v, p) => (modo === 'h' ? `${p.h} por ${p.h} es ${v.m} por ${p.c - v.m}: la altura es media proporcional entre las proyecciones.` : `${p.a} por ${p.a} es ${p.c} por ${v.m}: el cateto es media proporcional entre la hipotenusa y su proyección.`),
    });
  };
  relacion('altura-hipotenusa', 'h'); relacion('cateto-proyeccion', 'a');
  // Recíproco de Pitágoras y su generalización: con los tres lados se sabe qué triángulo es.
  XG.renglones('que-triangulo-es', { w: 112, x: 276 });

  // ------------------------------------------------------------------ euc-metricas-4 · potencia de un punto y polígonos regulares
  const circ3 = (A, B, C) => {
    const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])), a = A[0] ** 2 + A[1] ** 2, b = B[0] ** 2 + B[1] ** 2, c = C[0] ** 2 + C[1] ** 2;
    const x = (a * (B[1] - C[1]) + b * (C[1] - A[1]) + c * (A[1] - B[1])) / d, y = (a * (C[0] - B[0]) + b * (A[0] - C[0]) + c * (B[0] - A[0])) / d;
    return [x, y, Math.hypot(A[0] - x, A[1] - y)];
  };
  // Lleva al lienzo (340 × H) unos puntos y una circunferencia dados en unidades.
  const lona = (pts, O, H, pie = 0) => {
    const xs = [...pts.map(q => q[0]), O[0] - O[2], O[0] + O[2]], ys = [...pts.map(q => q[1]), O[1] - O[2], O[1] + O[2]];
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), ar = 38, ab = H - 14 - pie, u = Math.min(296 / (x1 - x0), (ab - ar) / (y1 - y0));
    return { u, L: Q => [170 + (Q[0] - (x0 + x1) / 2) * u, (ar + ab) / 2 + (Q[1] - (y0 + y1) / 2) * u] };
  };
  // Dos rectas por P y la circunferencia que pasa por A, B y C. Con P adentro son dos cuerdas; con P afuera (ext), dos secantes.
  const pot = (p, H, pie) => {
    const e = p.ext ? dir(-13) : [1, 0], g = p.ext ? dir(17) : dir(64), s = p.ext ? 1 : -1;
    const A = [e[0] * p.pa * s, e[1] * p.pa * s], B = [e[0] * p.pb, e[1] * p.pb], C = [g[0] * p.pc, g[1] * p.pc], dD = [g[0] * s, g[1] * s], O = circ3(A, B, C);
    const { u, L } = lona([[0, 0], A, B, C, [dD[0] * p.max, dD[1] * p.max]], O, H, pie);
    return { u, dD, A: L(A), B: L(B), C: L(C), P: L([0, 0]), O: L(O), r: O[2] * u, D: d => L([dD[0] * d, dD[1] * d]) };
  };
  const fuera = (Q, O, d = 13) => { const n = Math.hypot(Q[0] - O[0], Q[1] - O[1]) || 1; return [Q[0] + (Q[0] - O[0]) / n * d, Q[1] + (Q[1] - O[1]) / n * d + 4]; };
  const HP = 228;
  const potencia = (nombre, ext) => XG.figura(nombre, {
    ini: p => ({ d: p.d0 ?? 1 }),
    manijas(p) { const g = pot({ ...p, ext }, HP, 18); return [{ k: 'd', min: 1, max: p.max, paso: 1, en: v => g.D(v.d), de: (x, y) => ((x - g.P[0]) * g.dD[0] + (y - g.P[1]) * g.dD[1]) / g.u }]; },
    ok: (v, p) => p.pc * v.d === p.pa * p.pb,
    sol: p => ({ d: p.pa * p.pb / p.pc }),
    texto: p => `$${p.pa} \\cdot ${p.pb} = ${p.pc} \\cdot PD$: $PD = ${p.pa * p.pb / p.pc}$`,
    alto: () => HP, pie: 'Arrastra el punto D por su recta.',
    dib(v, K, p, f) {
      const g = pot({ ...p, ext }, HP, 18), D = g.D(v.d), M = g.D(p.max), bien = p.pc * v.d === p.pa * p.pb, lt = (Q, t) => K.t(...fuera(Q, g.O), t, 's tm');
      return K.f(f, K.arc(g.O[0], g.O[1], g.r, 0, 360, bien ? 'lo' : 'lg'))
        + K.l(...(ext ? g.P : g.A), ...g.B) + K.l(...(ext ? g.P : g.C), ...M, 'lm') + K.l(...g.P, ...g.C) + K.l(...g.P, ...D, 'la gr')
        + [g.A, g.B, g.C, g.P].map(Q => K.c(...Q, 3.5, 'fk')).join('') + lt(g.A, 'A') + lt(g.B, 'B') + lt(g.C, 'C') + K.t(g.P[0] + (ext ? 0 : 10), g.P[1] + (ext ? -9 : 16), 'P', 's tm')
        + K.t(tope(D[0] + g.dD[0] * 20, 12, 328), tope(D[1] + g.dD[1] * 20 + 4, 40, HP - 24), 'D', 's ta')
        + K.t(170, 14, `PA = ${p.pa} · PB = ${p.pb} · PC = ${p.pc} · PD = ${sg(v.d)}`, 's')
        + K.f(f * 2 - 1, K.t(ext ? 8 : 332, HP - 8, `${p.pa} · ${p.pb} = ${p.pa * p.pb}  y  ${p.pc} · ${sg(v.d)} = ${r2(p.pc * v.d)}`, bien ? 's to' : 's tf', ext ? 'start' : 'end'));
    },
    lee: (v, p) => `$${p.pa} \\cdot ${p.pb} = ${p.pa * p.pb}$ y $${p.pc} \\cdot ${sg(v.d)} = ${r2(p.pc * v.d)}$`,
    aviso: (v, p) => (ext && v.d <= p.pc ? 'D es el punto lejano de la secante: tiene que quedar más allá de C.'
      : ext && p.pc * (v.d - p.pc) === p.pa * (p.pb - p.pa) ? 'Usaste los trozos de adentro. Se multiplica la secante entera por su parte exterior, las dos desde P.'
        : v.d === p.pa + p.pb - p.pc ? 'Sumaste. Aquí se multiplica: los dos productos desde P son iguales.'
          : p.pc * v.d > p.pa * p.pb ? `D quedó fuera de la circunferencia: ${p.pc} por ${v.d} pasa de ${p.pa * p.pb}.` : `D quedó dentro de la circunferencia: ${p.pc} por ${v.d} no llega a ${p.pa * p.pb}.`),
    bien: (v, p) => (ext ? `${p.pa} por ${p.pb} es ${p.pc} por ${v.d}: cada secante entera por su parte exterior da lo mismo.` : `${p.pa} por ${p.pb} es ${p.pc} por ${v.d}: los trozos de una cuerda dan el mismo producto que los de la otra.`),
  });
  potencia('potencia-cuerdas', false); potencia('potencia-secantes', true);

  // Tangente y secante desde P: la circunferencia pasa por A y B y toca la otra recta en T.  v { t } = PT
  const tan = (p, H, pie) => {
    const e = dir(-12), g = dir(32), A = [e[0] * p.pa, e[1] * p.pa], B = [e[0] * p.pb, e[1] * p.pb], t = Math.sqrt(p.pa * p.pb), T = [g[0] * t, g[1] * t], n = [-g[1], g[0]];
    const s = -((T[0] - A[0]) ** 2 + (T[1] - A[1]) ** 2) / (2 * (n[0] * (T[0] - A[0]) + n[1] * (T[1] - A[1]))), O = [T[0] + n[0] * s, T[1] + n[1] * s, Math.abs(s)];
    const { u, L } = lona([[0, 0], A, B, [g[0] * p.max, g[1] * p.max]], O, H, pie);
    return { u, g, A: L(A), B: L(B), P: L([0, 0]), O: L(O), r: O[2] * u, T: x => L([g[0] * x, g[1] * x]), toca: L(T) };
  };
  XG.figura('tangente-media', {
    ini: p => ({ t: p.t0 ?? 1 }),
    manijas(p) { const g = tan(p, HP, 18); return [{ k: 't', min: 1, max: p.max, paso: 1, en: v => g.T(v.t), de: (x, y) => ((x - g.P[0]) * g.g[0] + (y - g.P[1]) * g.g[1]) / g.u }]; },
    ok: (v, p) => v.t * v.t === p.pa * p.pb,
    sol: p => ({ t: Math.sqrt(p.pa * p.pb) }),
    texto: p => `$PT^2 = ${p.pa} \\cdot ${p.pb} = ${p.pa * p.pb}$: $PT = ${Math.sqrt(p.pa * p.pb)}$`,
    alto: () => HP, pie: 'Arrastra el punto T por su recta.',
    dib(v, K, p, f) {
      const g = tan(p, HP, 18), T = g.T(v.t), bien = v.t * v.t === p.pa * p.pb;
      return K.f(f, K.arc(g.O[0], g.O[1], g.r, 0, 360, bien ? 'lo' : 'lg') + (bien ? '' : K.c(...g.toca, 5, 'fo')))
        + K.l(...g.P, ...g.B) + K.l(...g.P, ...g.T(p.max), 'lm') + K.l(...g.P, ...T, 'la gr')
        + [g.A, g.B, g.P].map(Q => K.c(...Q, 3.5, 'fk')).join('') + K.t(g.A[0], g.A[1] + 17, 'A', 's tm') + K.t(g.B[0], g.B[1] + 17, 'B', 's tm') + K.t(g.P[0], g.P[1] + 17, 'P', 's tm')
        + K.t(T[0] - 6, T[1] - 15, 'T', 's ta')
        + K.t(170, 14, `PA = ${p.pa} · PB = ${p.pb} · PT = ${sg(v.t)}`, 's')
        + K.f(f * 2 - 1, K.t(8, HP - 8, `${p.pa} · ${p.pb} = ${p.pa * p.pb}  y  ${sg(v.t)} · ${sg(v.t)} = ${r2(v.t * v.t)}`, bien ? 's to' : 's tf', 'start'));
    },
    lee: (v, p) => `$PT^2 = ${r2(v.t * v.t)}$ y $PA \\cdot PB = ${p.pa * p.pb}$`,
    aviso: (v, p) => (2 * v.t === p.pa + p.pb ? 'Ese es el promedio de PA y PB. La tangente es su media proporcional: PT por PT vale PA por PB.'
      : v.t * v.t > p.pa * p.pb ? `Se pasó del punto de tangencia: ${v.t} por ${v.t} da ${v.t * v.t}, más que ${p.pa * p.pb}.` : `No llegó al punto de tangencia: ${v.t} por ${v.t} da ${v.t * v.t}, menos que ${p.pa * p.pb}.`),
    bien: (v, p) => `${v.t} por ${v.t} es ${p.pa} por ${p.pb}: la tangente es media proporcional entre la secante y su parte exterior.`,
  });

  // Polígono regular inscrito: cuántos lados para el ángulo central o el lado pedidos.  v { n }   params { meta, ver: 'central' | 'lado', n0? }
  const LADO = { 3: 'r√3', 4: 'r√2', 6: 'r' }, cuerda = n => LADO[n] || `≈ ${r2(2 * Math.sin(Math.PI / n))} r`;
  XG.figura('inscribe-regular', {
    ini: p => ({ n: p.n0 ?? 5 }),
    manijas: () => [{ k: 'n', min: 3, max: 12, paso: 1, et: 'lados' }],
    ok: (v, p) => v.n === p.meta,
    sol: p => ({ n: p.meta }),
    texto: p => (p.ver === 'lado' ? `con ${p.meta} lados, el lado mide $${LADO[p.meta].replace('√', '\\sqrt')}$` : `$360^\\circ \\div ${p.meta} = ${r2(360 / p.meta)}^\\circ$`),
    alto: () => 248, pie: 'Arrastra el número de lados.',
    dib(v, K, p, f) {
      const n = R(v.n), O = [170, 104], P = Array.from({ length: n }, (_, i) => K.at(...O, 84, 90 - 180 / n + i * 360 / n)), ver = f > 0.5;
      return K.arc(...O, 84, 0, 360, 'lm') + K.ang(O, P[0], P[1], 24, ver ? `${r1(360 / n)}°` : '?', 'fa', 's ta') + K.p(P, 'fn') + K.l(...O, ...P[0], 'la') + K.l(...O, ...P[1], 'la') + K.l(...P[0], ...P[1], 'lg gr') + K.c(...O, 3.5, 'fk')
        + K.t(8, 16, `${n} lados`, 's tm', 'start') + K.t(332, 16, ver ? `lado ${LADO[n] ? `= ${LADO[n]}` : cuerda(n)}` : 'lado = ?', 's tg', 'end');
    },
    lee: v => `$360^\\circ \\div ${R(v.n)} ${Number.isInteger(360 / R(v.n)) ? '=' : '\\approx'} ${r1(360 / R(v.n))}^\\circ$`,
    aviso: (v, p) => (p.ver === 'lado' ? `Con ${v.n} lados, el lado mide ${cuerda(v.n)}: ${v.n > p.meta ? 'quedó más corto' : 'quedó más largo'} que lo pedido.`
      : `Con ${v.n} lados, el ángulo central mide ${r1(360 / v.n)}°: ${v.n > p.meta ? 'sobran' : 'faltan'} lados.`),
    bien: (v, p) => (p.ver !== 'lado' ? `La vuelta entera, 360°, repartida entre ${v.n} lados iguales.` : v.n === 6 ? 'Seis triángulos equiláteros: el lado del hexágono es el radio.' : v.n === 4 ? 'Dos radios perpendiculares: el lado del cuadrado es r√2.' : 'El lado del triángulo equilátero inscrito es r√3.'),
  });

  // Triángulo, cuadrado y hexágono en circunferencias iguales: el lado de cada uno.
  const tresLados = p => [`${p.r}√3`, `${p.r}√2`, `${p.r}`];
  XG.rotula('lados-inscritos', {
    slots: () => [0, 1, 2].map(i => ({ x: 60 + i * 110, y: 158, w: 84, h: 38 })),
    fichas: p => p.fichas, metas: tresLados, alto: () => 182,
    texto: p => `triángulo $${p.r}\\sqrt3$, cuadrado $${p.r}\\sqrt2$, hexágono $${p.r}$`,
    fondo: (K, p) => [3, 4, 6].map((n, i) => { const O = [60 + i * 110, 70], P = Array.from({ length: n }, (_, k) => K.at(...O, 46, 90 + k * 360 / n)); return K.arc(...O, 46, 0, 360, 'lm') + K.p(P, ['fa', 'fg', 'ff'][i]) + K.l(...O, ...P[0], 'lm d') + K.c(...O, 3, 'fk') + K.t(O[0] + 6, O[1] - 16, p.r, 's tm', 'start'); }).join('') + K.t(170, 14, `radio ${p.r} en las tres`, 's tm'),
    aviso(q, p) {
      const m = tresLados(p);
      return q[2][0] !== m[2] ? 'El hexágono se arma con seis triángulos equiláteros: su lado mide lo mismo que el radio.'
        : q[0][0] === m[1] && q[1][0] === m[0] ? 'Están cruzados: con menos lados, cada lado es más largo.'
          : q[1][0] !== m[1] ? 'El lado del cuadrado es la hipotenusa de dos radios perpendiculares.' : 'El lado del triángulo es la cuerda de un arco de 120°: la más larga de las tres.';
    },
    bien: () => 'Con menos lados, cada lado es más largo: r√3, r√2 y r.',
  });

  // Un polígono regular inscrito: ángulo central, lado y apotema.  params { n: 3 | 4 | 6, r (par), fichas }
  const medidas = p => [`${360 / p.n}°`, { 3: `${p.r}√3`, 4: `${p.r}√2`, 6: `${p.r}` }[p.n], { 3: `${p.r / 2}`, 4: `${p.r / 2}√2`, 6: `${p.r / 2}√3` }[p.n]];
  XG.rotula('apotema-lado', {
    slots: () => [0, 1, 2].map(i => ({ x: 278, y: 44 + i * 62, w: 92, h: 38 })),
    fichas: p => p.fichas, metas: medidas, alto: () => 204,
    texto: p => `ángulo central $${360 / p.n}^\\circ$, lado $${medidas(p)[1].replace('√', '\\sqrt')}$ y apotema $${medidas(p)[2].replace('√', '\\sqrt')}$`,
    fondo(K, p) {
      const O = [108, 104], P = Array.from({ length: p.n }, (_, k) => K.at(...O, 88, -90 - 180 / p.n + k * 360 / p.n)), M = medio(P[0], P[1]);
      return K.arc(...O, 88, 0, 360, 'lm') + K.ang(O, P[0], P[1], 20, '', 'fa') + K.p(P, 'fn') + K.l(...O, ...P[0], 'la') + K.l(...O, ...P[1], 'la') + K.l(...P[0], ...P[1], 'lg gr') + K.l(...O, ...M, 'lf d') + K.c(...O, 3.5, 'fk')
        + K.t(O[0] - 46, O[1] + 34, `r = ${p.r}`, 's ta') + ['ángulo central', 'lado', 'apotema'].map((t, i) => K.t(278, 20 + i * 62, t, ['s ta', 's tg', 's tf'][i])).join('');
    },
    aviso(q, p) {
      const m = medidas(p);
      return q[0][0] !== m[0] ? 'El ángulo central reparte la vuelta: 360° entre el número de lados.'
        : q[2][0] === `${p.r}` || q[2][0] === m[1] ? 'La apotema llega al punto medio del lado, no al vértice: es más corta que el radio.'
          : q[1][0] !== m[1] ? 'El lado es la cuerda entre dos vértices vecinos: mira el triángulo que forma con los dos radios.'
            : 'La apotema es un cateto: con medio lado y el radio forma un triángulo rectángulo.';
    },
    bien: () => 'Dos radios y un lado forman un triángulo isósceles; la apotema es su altura.',
  });

  // En movimiento: el punto sale de P por la recta y debe caer justo en la circunferencia.  tiro { q, pa, pb, pc, ext?, r, c, e? }
  XG.tiros('tiro-al-circulo', {
    perilla: () => ({ et: 'PD', min: 0, max: 24, cara: v => v, lee: v => `${v}` }),
    meta: t => t.r, alto: 190, ms: 1500,
    dib(t, v, K, p, f) {
      const g = pot({ ...t, max: t.pa * t.pb / t.pc }, 190), lt = (Q, s) => K.t(...fuera(Q, g.O), s, 's tm');
      let h = K.arc(g.O[0], g.O[1], g.r, 0, 360, '') + K.l(...(t.ext ? g.P : g.A), ...g.B) + K.l(...g.P, ...g.C) + K.l(...g.P, ...g.D(40), 'lm d')
        + [g.A, g.B, g.C, g.P].map(Q => K.c(...Q, 3.5, 'fk')).join('') + lt(g.A, 'A') + lt(g.B, 'B') + lt(g.C, 'C') + K.t(g.P[0] + (t.ext ? 0 : 10), g.P[1] + (t.ext ? -9 : 16), 'P', 's tm')
        + K.t(170, 14, `PA = ${t.pa} · PB = ${t.pb} · PC = ${t.pc}`, 's');
      if (v != null) {
        const Q = g.D(v * Math.min(1, f * 1.25));
        h += K.l(...g.P, ...Q, 'la gr') + K.c(...Q, 6, f >= 1 ? (v === t.r ? 'fo' : 'ff') : 'fA') + K.f(f * 3 - 2, K.t(Q[0] + 14, Q[1] - 8, v, 's ta'));
      }
      return h;
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Se pasó: cruzó la circunferencia y siguió de largo.' : 'Se quedó corto: no alcanzó la circunferencia.')),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira la distancia PD y suelta: el punto sale de P.',
  });
})();
;
//#archivo js/games/euc-escena-7.js
// Geometría Euclidiana · mundo 7 «euc-areas»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js,
// conteo-escena.js (XG.cuenta) y proposiciones-escena.js (XG.frases). Se dibujan con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(Math.round(x * 100) / 100), RAD = Math.PI / 180;
  const camino = (d, cls) => `<path class="xf ${cls}" d="${d}"/>`;

  // ---------------------------------------------------------------------------------------------- euc-areas-1 · áreas básicas
  // Fórmula de Herón: semiperímetro, las tres diferencias y el área.  params { t: [base, derecha, izquierda], et, metas, fichas, mira, trampas, ok }
  XG.cuenta('heron-raiz', 112, (K, p, f) => {
    const [a, b, c] = p.t, x = (a * a + c * c - b * b) / (2 * a), y = Math.sqrt(c * c - x * x), u = Math.min(190 / a, 76 / y), X0 = 170 - a * u / 2, Y0 = 92;
    const A = [X0, Y0], B = [X0 + a * u, Y0], C = [X0 + x * u, Y0 - y * u];
    return K.p([A, B, C], 'fa') + K.t((A[0] + B[0]) / 2, Y0 + 16, a, 'ta') + K.t((B[0] + C[0]) / 2 + 9, (B[1] + C[1]) / 2, b, 'ta', 'start') + K.t((A[0] + C[0]) / 2 - 9, (A[1] + C[1]) / 2, c, 'ta', 'end')
      + K.f(f, K.l(C[0], C[1], C[0], Y0, 'lf d') + K.t(C[0] + 6, Y0 - y * u * 0.3, `altura ${N(y)}`, 's tf', 'start'));
  });

  // Hexágono regular de lado l: semiperímetro, apotema y área.  params { l (par), fichas }
  const hexa = p => [`${3 * p.l}`, `${p.l / 2}√3`, `${3 * p.l * p.l / 2}√3`];
  XG.rotula('regular-apotema', {
    slots: () => [{ x: 284, y: 46, w: 92, h: 36 }, { x: 284, y: 112, w: 92, h: 36 }, { x: 284, y: 178, w: 92, h: 36 }],
    fichas: p => p.fichas, metas: hexa,
    texto: p => `semiperímetro $${3 * p.l}$, apotema $${p.l / 2}\\sqrt3$, área $${3 * p.l} \\cdot ${p.l / 2}\\sqrt3 = ${3 * p.l * p.l / 2}\\sqrt3$`,
    alto: () => 206,
    fondo(K, p, f) {
      const C = [76, 104], R = 62, V = Array.from({ length: 6 }, (_, i) => K.at(...C, R, 60 * i)), M = [C[0], C[1] + R * Math.sqrt(3) / 2];
      return K.p(V, 'fa') + K.f(f, V.map((q, i) => (i % 2 ? '' : K.p([C, q, V[(i + 1) % 6]], 'fg')) + K.l(...C, ...q, 'lm')).join('')) + K.l(...C, ...M, 'lf gr') + K.c(...C, 3, 'fk')
        + K.t(C[0], M[1] + 17, p.l, 'ta') + K.t(C[0] + 7, C[1] + 34, 'a', 's tf', 'start')
        + K.t(232, 43, 'semi-', 's', 'end') + K.t(232, 57, 'perímetro', 's', 'end') + K.t(232, 116, 'apotema', 's tf', 'end') + K.t(232, 182, 'área', 's ta', 'end');
    },
    aviso(q, p) {
      const m = hexa(p);
      return q[0][0] === `${6 * p.l}` ? 'Ese es el perímetro entero: la fórmula usa la mitad, el semiperímetro.'
        : q[1][0] !== m[1] ? 'La apotema es la altura de uno de los seis triángulos equiláteros: medio lado por √3.'
          : q[2][0] === `${3 * p.l * p.l}√3` ? 'Multiplicaste el perímetro entero por la apotema: va el semiperímetro.'
            : 'El hexágono son seis triángulos con la apotema por altura: semiperímetro por apotema.';
    },
    bien: () => 'Semiperímetro por apotema: seis triángulos de altura a.',
  });

  // Sector circular de área dada.  v { g }   params { r, area } (área en partes de π)
  const SC = [170, 108];
  XG.figura('sector-area', {
    ini: () => ({ g: 30 }),
    manijas: () => [{ k: 'g', min: 10, max: 350, paso: 10, en: v => XPK.at(...SC, 86, v.g), de: (x, y, v) => { const g = (Math.atan2(SC[1] - y, x - SC[0]) * 180 / Math.PI + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 350 : 10) : g; } }],
    ok: (v, p) => v.g * p.r * p.r === 360 * p.area,
    sol: p => ({ g: 360 * p.area / (p.r * p.r) }),
    texto: p => `$\\tfrac{${p.area}}{${p.r * p.r}} \\cdot 360^\\circ = ${360 * p.area / (p.r * p.r)}^\\circ$`,
    alto: () => 216, pie: 'Arrastra el punto por el borde para abrir el sector.',
    dib: (v, K, p, f) => K.c(...SC, 86, 'fc') + K.sec(...SC, 86, 0, v.g, 'fa') + K.l(...SC, 256, 108) + K.t(214, 126, `r = ${p.r}`, 's tm') + K.t(...K.at(SC[0], SC[1] + 4, 40, Math.max(16, v.g / 2)), `${Math.round(v.g)}°`, 'ta')
      + K.f(f, K.arc(...SC, 95, 0, Math.min(359, 360 * p.area / (p.r * p.r)) * f, 'lo gr') + K.t(8, 20, `círculo: ${p.r * p.r}π`, 's tm', 'start')),
    lee: (v, p) => `$\\tfrac{${Math.round(v.g)}}{360} \\cdot ${p.r * p.r}\\pi = ${N(Math.round(v.g) / 360 * p.r * p.r)}\\pi$`,
    aviso: (v, p) => (v.g * p.r === 180 * p.area ? `Con ese ángulo, ${p.area}π es lo que mide el arco. El área se compara con ${p.r * p.r}π, el círculo entero.` : v.g * p.r * p.r > 360 * p.area ? 'El sector quedó con más área de la pedida.' : 'El sector quedó con menos área de la pedida.'),
    bien: (v, p) => `${p.area} de las ${p.r * p.r} partes del círculo: esa misma parte de la vuelta.`,
  });

  // ---------------------------------------------------------------------------------- euc-areas-2 · relaciones entre áreas
  // El vértice se desliza: mismo triángulo en área, pero isósceles o rectángulo.  v { x, y }   params { a, b, c: [x, y], tipo: 'iso' | 'rect', de?: [x, y] }
  const U = 24, GP = (x, y) => [34 + x * U, 196 - y * U];
  const cumpleTipo = (v, p) => (p.tipo === 'iso' ? 2 * v.x === p.a + p.b : v.x === p.b);
  XG.figura('desliza-paralela', {
    ini: p => ({ x: p.de?.[0] ?? 11, y: p.de?.[1] ?? 2 }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 1], max: [12, 7], paso: [1, 1], en: v => GP(v.x, v.y), de: (x, y) => [(x - 34) / U, (196 - y) / U] }],
    ok: (v, p) => v.y === p.c[1] && cumpleTipo(v, p),
    sol: p => ({ x: p.tipo === 'iso' ? (p.a + p.b) / 2 : p.b, y: p.c[1] }),
    texto: p => `misma base ${p.b - p.a} y misma altura ${p.c[1]}: área $\\tfrac{${p.b - p.a} \\cdot ${p.c[1]}}{2} = ${(p.b - p.a) * p.c[1] / 2}$`,
    alto: () => 212, pie: 'Arrastra el vértice P por la cuadrícula.',
    dib(v, K, p, f) {
      let h = '';
      for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 7), 'ls');
      for (let j = 0; j <= 7; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls');
      const A = GP(p.a, 0), B = GP(p.b, 0), C = GP(...p.c), P = GP(v.x, v.y);
      return h + K.f(f, K.l(...GP(0, p.c[1]), ...GP(12, p.c[1]), 'lo d') + K.l(P[0], P[1], P[0], 196, 'lf d') + K.t(P[0] + 6, (P[1] + 196) / 2 + 4, N(v.y), 's tf', 'start'))
        + K.p([A, B, C], 'fg') + K.p([A, B, P], 'fa') + K.l(...A, ...B, 'gr') + K.t(A[0] - 2, 210, 'A', 's') + K.t(B[0] + 2, 210, 'B', 's') + K.t(P[0] + 10, P[1] - 8, 'P', 's ta', 'start');
    },
    lee: (v, p) => `$\\tfrac{${p.b - p.a} \\cdot ${N(v.y)}}{2} = ${N((p.b - p.a) * v.y / 2)} \\qquad \\text{dorado: } ${(p.b - p.a) * p.c[1] / 2}$`,
    aviso: (v, p) => (v.y > p.c[1] ? 'Subiste el vértice: con más altura sobre la misma base, el área creció.' : v.y < p.c[1] ? 'Bajaste el vértice: con menos altura sobre la misma base, el área se achicó.'
      : p.tipo === 'iso' ? 'El área ya es la misma. Falta que P quede a igual distancia de A y de B.' : 'El área ya es la misma. Falta el ángulo recto en B: P va justo encima de B.'),
    bien: () => 'Misma base y vértice sobre la misma paralela: misma altura, misma área.',
  });

  // Un punto sobre la base parte el triángulo en razón m : n.  v { d }   params { L, m, n, ap?, d0? }
  XG.figura('parte-base', {
    ini: p => ({ d: p.d0 ?? 1 }),
    manijas: p => [{ k: 'd', min: 1, max: p.L - 1, paso: 1, en: v => [30 + v.d * 280 / p.L, 180], de: x => (x - 30) * p.L / 280 }],
    ok: (v, p) => v.d * p.n === (p.L - v.d) * p.m,
    sol: p => ({ d: p.L * p.m / (p.m + p.n) }),
    texto: p => `la base se parte como las áreas: $\\tfrac{${p.m}}{${p.m + p.n}} \\cdot ${p.L} = ${p.L * p.m / (p.m + p.n)}$`,
    alto: () => 214, pie: 'Arrastra el punto D por la base.',
    dib(v, K, p, f) {
      const u = 280 / p.L, A = [30 + (p.ap ?? Math.round(p.L * 0.35)) * u, 36], B = [30, 180], C = [310, 180], D = [30 + v.d * u, 180];
      let h = K.p([A, B, D], 'fa') + K.p([A, D, C], 'fg');
      for (let i = 1; i < p.L; i++) h += K.l(30 + i * u, 176, 30 + i * u, 184, 'lm');
      return h + K.t(A[0], 26, 'A', 's') + K.t(22, 198, 'B', 's') + K.t(318, 198, 'C', 's') + K.t(D[0], 206, 'D', 's ta') + K.t((B[0] + D[0]) / 2, 198, N(v.d), 'ta') + K.t((D[0] + C[0]) / 2, 198, N(p.L - v.d), 'tg')
        + K.f(f, K.l(A[0], A[1], A[0], 180, 'lf d') + K.t(332, 24, `áreas como ${N(v.d)} : ${N(p.L - v.d)}`, 's tf', 'end'));
    },
    lee: (v, p) => `$\\tfrac{\\text{△}ABD}{\\text{△}ADC} = \\tfrac{${Math.round(v.d)}}{${p.L - Math.round(v.d)}}$`,
    aviso: (v, p) => (v.d * p.m === (p.L - v.d) * p.n && p.m !== p.n ? `Quedó al revés: el de la izquierda, △ABD, es el de ${p.m} ${p.m === 1 ? 'parte' : 'partes'}.`
      : v.d === p.m ? `Mediste ${p.m} de base, pero son ${p.m} de cada ${p.m + p.n} partes: la base tiene ${p.L}.`
        : v.d * p.n > (p.L - v.d) * p.m ? 'El triángulo de la izquierda quedó con demasiada base.' : 'El triángulo de la izquierda quedó con muy poca base.'),
    bien: () => 'Con la misma altura, las áreas se reparten como las bases.',
  });

  // Las tres medianas: mitad, sexto y tercio.  params { area (múltiplo de 6), fichas }
  const med = p => [`${p.area / 2}`, `${p.area / 6}`, `${p.area / 3}`];
  XG.rotula('mediana-seis', {
    slots: () => [{ x: 292, y: 50, w: 76, h: 36 }, { x: 292, y: 112, w: 76, h: 36 }, { x: 292, y: 174, w: 76, h: 36 }],
    fichas: p => p.fichas, metas: med,
    texto: p => `$${p.area} \\div 2 = ${p.area / 2}$, $${p.area} \\div 6 = ${p.area / 6}$ y $2 \\cdot ${p.area / 6} = ${p.area / 3}$`,
    alto: () => 214,
    fondo(K, p, f) {
      const A = [100, 24], B = [20, 180], C = [196, 180], M = [108, 180], Q = [148, 102], R = [60, 102], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
      const seis = [[B, G, M], [M, G, C], [C, G, Q], [Q, G, A], [A, G, R], [R, G, B]];
      return K.p([A, B, C], 'fc') + K.f(f, seis.map((t, i) => K.p(t, i % 2 ? 'fg' : 'fa')).join('')) + K.l(...A, ...M, 'la') + K.l(...B, ...Q, 'la') + K.l(...C, ...R, 'la') + K.c(...G, 3.5, 'fk')
        + K.t(100, 16, 'A', 's') + K.t(12, 194, 'B', 's') + K.t(204, 194, 'C', 's') + K.t(108, 196, 'M', 's ta') + K.t(G[0] + 9, G[1] - 6, 'G', 's', 'start') + K.t(108, 211, `△ABC = ${p.area}`, 's ta')
        + K.t(248, 54, '△ABM', 's', 'end') + K.t(248, 116, '△BGM', 's', 'end') + K.t(248, 178, '△BGC', 's', 'end');
    },
    aviso(q, p) {
      const m = med(p);
      return q[0][0] !== m[0] ? 'La mediana AM parte la base en dos trozos congruentes: △ABM es la mitad del triángulo.'
        : q[1][0] === m[2] ? 'Las tres medianas forman seis triángulos equivalentes, no tres.'
          : q[1][0] !== m[1] ? 'Las tres medianas parten el triángulo en seis partes equivalentes: divide entre 6.'
            : '△BGC está hecho de dos de los seis triangulitos: es la tercera parte.';
    },
    bien: () => 'Una mediana, dos mitades; las tres medianas, seis partes equivalentes.',
  });

  XG.frases('equivalentes-o-no');

  // Triángulos semejantes: razón de lados, razón de áreas y área del grande.  params { t: { a, b, s }, et, metas, fichas, mira, trampas, ok }
  XG.cuenta('semejantes-area', 104, (K, p) => {
    const { a, b, s } = p.t, W = 128, w = W * a / b, H = 66, h = H * a / b, y = 82;
    return K.p([[34, y], [34 + w, y], [34 + w * 0.3, y - h]], 'fg') + K.t(34 + w / 2, y + 15, a, 's tg') + K.t(34 + w + 8, y - h / 2, `área ${s}`, 's tg', 'start')
      + K.p([[186, y], [186 + W, y], [186 + W * 0.3, y - H]], 'fa') + K.t(186 + W / 2, y + 15, b, 's ta') + K.t(186 + W * 0.45, y - H * 0.28, 'área ?', 's ta');
  });

  // Triángulos con un ángulo común: razón de áreas = razón de los productos de los lados.  v { e }   params { c (AB), b (AC), d (AD), m, n }
  const AC = [26, 190], UA = 22, CO = Math.cos(50 * RAD), SI = Math.sin(50 * RAD), enAC = e => [AC[0] + e * UA * CO, AC[1] - e * UA * SI];
  XG.figura('angulo-compartido', {
    ini: p => ({ e: p.b }),
    manijas: p => [{ k: 'e', min: 1, max: p.b, paso: 1, en: v => enAC(v.e), de: (x, y) => ((x - AC[0]) * CO + (AC[1] - y) * SI) / UA }],
    ok: (v, p) => v.e * p.d * p.n === p.m * p.b * p.c,
    sol: p => ({ e: p.m * p.b * p.c / (p.n * p.d) }),
    texto: p => `$\\tfrac{${p.d} \\cdot ${p.m * p.b * p.c / (p.n * p.d)}}{${p.c} \\cdot ${p.b}} = \\tfrac{${p.m}}{${p.n}}$`,
    alto: () => 214, pie: 'Arrastra el punto E por el lado AC.',
    dib(v, K, p, f) {
      const B = [AC[0] + p.c * UA, 190], C = enAC(p.b), D = [AC[0] + p.d * UA, 190], E = enAC(v.e), mE = enAC(v.e / 2), mC = enAC((v.e + p.b) / 2);
      return K.p([AC, B, C], 'fg') + K.p([AC, D, E], 'fa') + K.t(16, 204, 'A', 's') + K.t(B[0] + 8, 204, 'B', 's') + K.t(C[0] - 4, C[1] - 8, 'C', 's') + K.t(D[0], 207, 'D', 's ta') + K.t(E[0] - 12, E[1] - 10, 'E', 's ta', 'end')
        + K.t((AC[0] + D[0]) / 2, 207, p.d, 'ta') + K.t((D[0] + B[0]) / 2, 207, p.c - p.d, 'tg') + K.t(mE[0] - 12, mE[1] + 2, N(v.e), 'ta', 'end') + (p.b - v.e > 0.6 ? K.t(mC[0] - 12, mC[1] + 2, N(p.b - v.e), 'tg', 'end') : '')
        + K.f(f, K.t(332, 22, `AD · AE = ${N(p.d * v.e)}`, 's ta', 'end') + K.t(332, 40, `AB · AC = ${p.c * p.b}`, 's tg', 'end'));
    },
    lee: (v, p) => `$\\tfrac{${p.d} \\cdot ${Math.round(v.e)}}{${p.c} \\cdot ${p.b}} = \\tfrac{${p.d * Math.round(v.e)}}{${p.c * p.b}}$`,
    aviso: (v, p) => (v.e * p.n === p.m * p.b ? `Solo partiste el lado AC. Cuenta también que AD es ${p.d} de ${p.c}: se comparan los productos de los dos lados.`
      : v.e * p.d * p.n > p.m * p.b * p.c ? 'El triángulo ADE quedó con más área de la pedida.' : 'El triángulo ADE quedó con menos área de la pedida.'),
    bien: () => 'Con un ángulo común, las áreas son como los productos de los lados que lo forman.',
  });

  // ------------------------------------------------------------------------------------------- euc-areas-3 · áreas sombreadas
  // Cuadrado y círculo, uno dentro del otro.  params { modo: 'inscrito' (círculo en cuadrado de lado l) | 'circunscrito' (cuadrado en círculo de radio r), fichas }
  const cyc = p => (p.modo === 'inscrito' ? [`${p.l * p.l}`, `${p.l * p.l / 4}π`, `${p.l * p.l} − ${p.l * p.l / 4}π`] : [`${p.r * p.r}π`, `${2 * p.r * p.r}`, `${p.r * p.r}π − ${2 * p.r * p.r}`]);
  XG.rotula('cuadrado-circulo', {
    slots: () => [{ x: 284, y: 46, w: 100, h: 36 }, { x: 284, y: 112, w: 100, h: 36 }, { x: 284, y: 178, w: 100, h: 36 }],
    fichas: p => p.fichas, metas: cyc,
    texto(p) { const m = cyc(p); return p.modo === 'inscrito' ? `cuadrado $${m[0]}$, círculo $${p.l * p.l / 4}\\pi$, sombreada $${p.l * p.l} - ${p.l * p.l / 4}\\pi$` : `círculo $${p.r * p.r}\\pi$, cuadrado $${m[1]}$, sombreada $${p.r * p.r}\\pi - ${m[1]}$`; },
    alto: () => 206,
    fondo(K, p, f) {
      const C = [84, 100], ins = p.modo === 'inscrito', et = ins ? ['cuadrado', 'círculo'] : ['círculo', 'cuadrado'];
      const fig = ins
        ? K.r(C[0] - 66, C[1] - 66, 132, 132, 'fa', 0) + K.c(...C, 66, 'fc') + K.t(C[0], C[1] + 84, p.l, 'ta') + K.f(f, K.l(...C, C[0] + 66, C[1], 'lf gr') + K.t(C[0] + 33, C[1] - 7, p.l / 2, 's tf') + K.c(...C, 3, 'fk'))
        : K.c(...C, 70, 'fa') + K.p([45, 135, 225, 315].map(g => K.at(...C, 70, g)), 'fc') + K.l(...C, C[0] + 70, C[1], 'la') + K.t(C[0] + 40, C[1] - 6, p.r, 's ta') + K.c(...C, 3, 'fk')
          + K.f(f, K.l(...K.at(...C, 70, 225), ...K.at(...C, 70, 45), 'lf d') + K.t(C[0] - 30, C[1] + 16, `diagonal ${2 * p.r}`, 's tf'));
      return fig + K.t(228, 50, et[0], 's', 'end') + K.t(228, 116, et[1], 's', 'end') + K.t(228, 182, 'sombreada', 's ta', 'end');
    },
    aviso(q, p) {
      const m = cyc(p);
      if (p.modo === 'inscrito') return q[1][0] === `${p.l * p.l}π` ? 'El radio del círculo inscrito es la mitad del lado, no el lado entero.' : q[1][0] === `${p.l}π` ? 'Ese es el borde del círculo; el área es el radio por el radio, por π.' : q[2][0] !== m[2] && q[0][0] === m[0] && q[1][0] === m[1] ? 'Se sombrea lo que queda del cuadrado: cuadrado menos círculo, en ese orden.' : 'El círculo toca los cuatro lados: su diámetro es el lado del cuadrado.';
      return q[1][0] === `${4 * p.r * p.r}` ? 'El lado del cuadrado no es el diámetro: lo que mide dos radios es su diagonal.' : q[1][0] === `${p.r * p.r}` ? 'Con r por r sale solo un cuarto del cuadrado: mira sus diagonales.' : q[2][0] !== m[2] && q[0][0] === m[0] && q[1][0] === m[1] ? 'Se sombrea lo que queda del círculo: círculo menos cuadrado, en ese orden.' : 'El cuadrado inscrito es un rombo cuyas diagonales son diámetros: semiproducto de las diagonales.';
    },
    bien: p => (p.modo === 'inscrito' ? 'Lo de afuera menos lo de adentro: cuadrado menos círculo.' : 'Lo de afuera menos lo de adentro: círculo menos cuadrado.'),
  });

  // Corona circular: se agranda el círculo de afuera.  v { R }   params { r, area } (área en partes de π)
  XG.figura('corona-borde', {
    ini: p => ({ R: p.r + 0.5 }),
    manijas: p => [{ k: 'R', min: p.r + 0.5, max: 8, paso: 0.5, en: v => [170 + v.R * 12, 106], de: (x, y) => Math.hypot(x - 170, y - 106) / 12 }],
    ok: (v, p) => v.R * v.R - p.r * p.r === p.area,
    sol: p => ({ R: Math.sqrt(p.area + p.r * p.r) }),
    texto: p => `$R^2 = ${p.area} + ${p.r * p.r} = ${p.area + p.r * p.r}$: $R = ${Math.sqrt(p.area + p.r * p.r)}$`,
    alto: () => 212, pie: 'Arrastra el borde de afuera.',
    dib: (v, K, p, f) => K.c(170, 106, v.R * 12, 'fa') + K.c(170, 106, p.r * 12, 'fc') + K.l(170, 106, ...K.at(170, 106, p.r * 12, 90), 'lg') + K.t(176, 106 - p.r * 6 + 4, p.r, 's tg', 'start') + K.c(170, 106, 2.5, 'fk') + K.t(8, 20, `R = ${N(v.R)}`, 'tf', 'start')
      + K.f(f, K.l(170, 106, 170 + v.R * 12, 106, 'lf') + K.t(332, 20, `${N(v.R * v.R)}π − ${p.r * p.r}π`, 's ta', 'end')),
    lee: (v, p) => `$${N(v.R * v.R)}\\pi - ${p.r * p.r}\\pi = ${N(v.R * v.R - p.r * p.r)}\\pi$`,
    aviso: (v, p) => ((v.R - p.r) ** 2 === p.area ? 'Restaste los radios y luego elevaste al cuadrado: se restan las áreas de los dos círculos.' : v.R * v.R - p.r * p.r > p.area ? 'La corona quedó con más área: el borde está muy afuera.' : 'La corona quedó con menos área: el borde está muy adentro.'),
    bien: () => 'Círculo grande menos círculo chico: se restan las áreas, no los radios.',
  });

  // Cuadrado sin cuatro cuartos de círculo en las esquinas: l² − kπ.  v { r }   params { l, k }
  XG.figura('esquinas-cuarto', {
    ini: () => ({ r: 0.5 }),
    manijas: p => [{ k: 'r', min: 0.5, max: p.l / 2, paso: 0.5, en: v => [90 + v.r * 160 / p.l, 18], de: x => (x - 90) * p.l / 160 }],
    ok: (v, p) => v.r * v.r === p.k,
    sol: p => ({ r: Math.sqrt(p.k) }),
    texto: p => `cuatro cuartos hacen un círculo: $r^2 = ${p.k}$, $r = ${Math.sqrt(p.k)}$`,
    alto: () => 200, pie: 'Arrastra el punto para abrir las cuatro esquinas.',
    dib(v, K, p, f) {
      const u = 160 / p.l, x = 90, y = 18, s = 160, r = v.r * u;
      return K.r(x, y, s, s, 'fa', 0) + K.sec(x, y, r, 270, 360, 'fc') + K.sec(x + s, y, r, 180, 270, 'fc') + K.sec(x + s, y + s, r, 90, 180, 'fc') + K.sec(x, y + s, r, 0, 90, 'fc')
        + K.t(x + s / 2, y + s + 17, p.l, 'ta') + K.t(8, 20, `r = ${N(v.r)}`, 'tf', 'start') + K.f(f, K.c(294, 104, Math.min(34, r * 0.6), 'fg') + K.t(294, 154, '4 cuartos', 's tg') + K.t(294, 168, `${N(v.r * v.r)}π`, 's tg'));
    },
    lee: (v, p) => `$${p.l * p.l} - \\pi \\cdot ${N(v.r)}^2 = ${p.l * p.l} - ${N(v.r * v.r)}\\pi$`,
    aviso: (v, p) => (4 * v.r * v.r === p.k ? 'Cada esquina es un cuarto de círculo: las cuatro juntas hacen un solo círculo, no cuatro.' : v.r * v.r > p.k ? 'Quitaste más círculo del pedido: el radio es muy grande.' : 'Quitaste menos círculo del pedido: el radio es muy chico.'),
    bien: () => 'Cuatro cuartos son un círculo entero: cuadrado menos círculo.',
  });

  // Pétalo entre dos cuartos de círculo en un cuadrado de lado l.  params { l (par), fichas }
  const pet = p => { const c = p.l * p.l / 4, t = p.l * p.l / 2; return [`${c}π`, `${t}`, `${c}π − ${t}`, `${2 * c}π − ${2 * t}`]; };
  XG.rotula('petalo-cuartos', {
    slots: () => [{ x: 290, y: 24, w: 88, h: 34 }, { x: 290, y: 74, w: 88, h: 34 }, { x: 290, y: 124, w: 88, h: 34 }, { x: 290, y: 174, w: 88, h: 34 }],
    fichas: p => p.fichas, metas: pet,
    texto(p) { const c = p.l * p.l / 4, t = p.l * p.l / 2; return `segmento $${c}\\pi - ${t}$; pétalo $2(${c}\\pi - ${t}) = ${2 * c}\\pi - ${2 * t}$`; },
    alto: () => 200,
    fondo(K, p, f) {
      const x = 14, y = 28, s = 140, TL = `${x} ${y}`, BR = `${x + s} ${y + s}`;
      return K.r(x, y, s, s, 'fc', 0) + camino(`M${TL} A${s} ${s} 0 0 1 ${BR} A${s} ${s} 0 0 1 ${TL} Z`, 'fa')
        + K.f(f, camino(`M${TL} A${s} ${s} 0 0 1 ${BR} Z`, 'fg') + K.p([[x, y], [x + s, y + s], [x, y + s]], 'fn d') + K.l(x, y, x + s, y + s, 'lf d'))
        + K.t(x + s / 2, y + s + 17, p.l, 'ta') + K.t(x + s / 2, 18, `radio de los arcos: ${p.l}`, 's tm')
        + K.t(240, 28, 'cuarto', 's', 'end') + K.t(240, 78, 'triángulo', 's', 'end') + K.t(240, 128, 'segmento', 's tg', 'end') + K.t(240, 178, 'pétalo', 's ta', 'end');
    },
    aviso(q, p) {
      const m = pet(p);
      return q[0][0] === `${p.l * p.l}π` ? 'Es un cuarto del círculo de radio igual al lado, no el círculo entero.'
        : q[1][0] === `${p.l * p.l}` ? 'El triángulo que corta la diagonal es la mitad del cuadrado.'
          : q[3][0] === m[2] ? 'Ese es un solo segmento: el pétalo tiene dos, uno a cada lado de la diagonal.'
            : 'El segmento es el cuarto de círculo menos el triángulo, y el pétalo son dos segmentos.';
    },
    bien: () => 'Sector menos triángulo da el segmento; dos segmentos, el pétalo.',
  });

  // En movimiento: se lanzan las partes de π de la figura.  tiro { q, f: { t: 'cc' | 'corona' | 'cuartos' | 'sector' | 'medio', … }, r, c, e }
  XG.tiros('pi-lanza', {
    perilla: () => ({ et: 'Partes de π', min: 0, max: 40, lee: v => `${v}π` }),
    meta: t => t.r, alto: 150, ms: 1900,
    dib(t, v, K, p, f) {
      const F = t.f, cx = 84, cy = 68, s = 108; let h = '';
      if (F.t === 'cc') h = K.r(cx - s / 2, cy - s / 2, s, s, 'fa', 0) + K.c(cx, cy, s / 2, 'fc') + K.t(cx, cy + s / 2 + 16, F.l, 's ta');
      else if (F.t === 'cuartos') h = K.r(cx - s / 2, cy - s / 2, s, s, 'fa', 0) + K.sec(cx - s / 2, cy - s / 2, s / 2, 270, 360, 'fc') + K.sec(cx + s / 2, cy - s / 2, s / 2, 180, 270, 'fc') + K.sec(cx + s / 2, cy + s / 2, s / 2, 90, 180, 'fc') + K.sec(cx - s / 2, cy + s / 2, s / 2, 0, 90, 'fc') + K.t(cx, cy + s / 2 + 16, F.l, 's ta');
      else if (F.t === 'corona') { const R0 = 56, r0 = R0 * F.r / F.R; h = K.c(cx, cy, R0, 'fa') + K.c(cx, cy, r0, 'fc') + K.l(cx, cy, cx + r0, cy, 'lf') + K.t(cx + r0 / 2, cy - 5, F.r, 's tf') + K.l(cx, cy, ...K.at(cx, cy, R0, 235), 'la') + K.t(...K.at(cx, cy + 4, R0 + 11, 235), F.R, 's ta') + K.c(cx, cy, 2.5, 'fk'); }
      else if (F.t === 'sector') h = K.c(cx, cy, 56, 'fc') + K.sec(cx, cy, 56, 0, F.g, 'fa') + K.t(cx + 28, cy + 15, `r = ${F.r}`, 's tm') + K.t(...K.at(cx, cy + 4, 30, F.g / 2), `${F.g}°`, 's ta');
      else h = K.r(cx - 64, cy - 32, 128, 64, 'fa', 0) + K.sec(cx, cy + 32, 64, 0, 180, 'fc') + K.t(cx, cy + 48, 2 * F.r, 's ta') + K.t(cx - 70, cy + 4, F.r, 's ta', 'end');
      const c = 15, X = 186, n = v == null ? 0 : Math.floor(v * f + 1e-9);
      for (let i = 0; i < 40; i++) h += K.c(X + (i % 10) * c, 108 - Math.floor(i / 10) * c, 5.5, i < n ? (f >= 1 && v !== t.r ? 'ff' : 'fA') : 'fc');
      return h + K.t(X + 67, 138, v == null ? 'partes de π' : `${n}π`, 's tm');
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Sobraron partes de π.' : 'Faltaron partes de π.')),
    cuenta: t => `$${t.c}$`, pie: 'Estira las partes de π justas y suelta.',
  });
})();
;
//#archivo js/games/euc-escena-8.js
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
;
//#archivo js/explora-euc-1.js
// Geometría Euclidiana · mundo 1 «euc-demostrar»: explicaciones Explora (spec 2026-11-26-curso-euclidiana). Los ejemplos no son los de los ejercicios.
{
  const k = v => Math.round(v.k);
  const izq = (K, l, y0, dy = 40) => l.map((t, i) => K.t(10, y0 + i * dy + 5, t, 's', 'start')).join('');
  const col = (n, y0, x, w, dy = 40) => Array.from({ length: n }, (_, i) => ({ x, y: y0 + i * dy, w, h: 34 }));
  const pol = (K, P, cx, cy, cls = 'fa') => K.p(P.map(([x, y]) => [cx + x, cy + y]), cls);
  const CUAD = [[-24, -24], [24, -24], [24, 24], [-24, 24]], ROMBO = [[-36, 0], [0, -22], [36, 0], [0, 22]], RECT = [[-38, -20], [38, -20], [38, 20], [-38, 20]];
  // Dos rectas que se cruzan: con medidas (num) o con nombres.
  const cruce = (v, K) => {
    const C = [170, 108], P = g => K.at(...C, 88, g), a = v.a, n = Math.round(a), med = v.num > 0.5;
    return K.ang(C, P(0), P(a), 40, med ? `${n}°` : '1', 'fa', 'ta') + K.ang(C, P(180), P(180 + a), 40, med ? `${n}°` : '3', 'fa', 'ta')
      + K.l(...P(0), ...P(180)) + K.l(...P(a), ...P(a + 180)) + K.c(...C, 4, 'fk') + K.t(332, 16, med ? 'medir: un caso' : 'razonar: todos los casos', 's tm', 'end');
  };
  // Los ladrillos: primitivos, definición, postulado, teorema y corolario.
  const ladrillos = (v, K) => {
    const q = k(v), T = ['términos primitivos', 'definición', 'postulado', 'teorema', 'corolario'][q];
    let h = K.t(170, 22, T, 'ta');
    if (q === 0) h += K.c(64, 104, 5, 'fk') + K.t(64, 150, 'punto', 's') + K.l(118, 128, 218, 80) + K.t(168, 150, 'recta', 's') + K.p([[236, 128], [264, 80], [326, 80], [298, 128]], 'fa') + K.t(282, 150, 'plano', 's');
    else if (q === 1) h += K.l(60, 104, 280, 104, 'gr') + K.c(60, 104, 4, 'fk') + K.c(280, 104, 4, 'fk') + K.c(170, 104, 5, 'fA') + K.l(115, 96, 115, 112, 'la') + K.l(225, 96, 225, 112, 'la') + K.t(60, 86, 'A') + K.t(170, 86, 'M', 'ta') + K.t(280, 86, 'B') + K.t(170, 150, 'punto medio: AM ≅ MB', 's');
    else if (q === 2) h += K.l(40, 140, 300, 66) + K.c(100, 123, 5, 'fA') + K.c(240, 83, 5, 'fA') + K.t(100, 108, 'P') + K.t(240, 68, 'Q') + K.t(170, 168, 'por P y Q, una sola recta', 's');
    else { const C = [170, 100], a = q === 3 ? 60 : 90, P = g => K.at(...C, 76, g);
      h += K.ang(C, P(0), P(a), 34, '', 'fa') + K.ang(C, P(180), P(180 + a), 34, '', 'fa') + (q === 4 ? K.ang(C, P(90), P(180), 34, '', 'fa') + K.ang(C, P(270), P(360), 34, '', 'fa') : '') + K.l(...P(0), ...P(180)) + K.l(...P(a), ...P(a + 180)) + K.c(...C, 4, 'fk')
        + K.t(170, 194, q === 3 ? 'opuestos por el vértice: congruentes' : 'si uno es recto, los cuatro lo son', 's'); }
    return h;
  };
  const minis = K => K.t(88, 16, '«plano»', 's') + K.p([[58, 54], [76, 26], [120, 26], [102, 54]], 'fa')
    + K.t(252, 16, 'ángulo recto: mide 90°', 's') + K.pl([[232, 26], [232, 54], [272, 54]]) + K.pl([[232, 46], [240, 46], [240, 54]], 'lm')
    + K.t(88, 116, 'por 2 puntos, 1 recta', 's') + K.l(48, 152, 128, 128) + K.c(64, 147, 4, 'fA') + K.c(112, 133, 4, 'fA')
    + K.t(252, 116, 'opuestos por el vértice', 's') + K.l(214, 140, 290, 140) + K.l(228, 156, 276, 124);
  const tabla = (K, filas, y0 = 36) => K.t(10, 16, 'afirmación', 's tm', 'start') + K.t(262, 16, 'razón', 's tm') + izq(K, filas, y0);
  // Una viga con dos soportes.
  const viga = (v, K) => {
    const X = u => 30 + u * 17.5;
    let h = K.l(30, 100, 310, 100, 'gr') + K.l(X(v.m), 100, X(v.m), 78, 'la') + K.l(X(v.n), 100, X(v.n), 122, 'lg');
    for (let u = 0; u <= 16; u++) h += K.l(X(u), 95, X(u), 105, 'lm');
    return h + K.c(30, 100, 4, 'fk') + K.c(310, 100, 4, 'fk') + K.t(18, 105, 'A') + K.t(323, 105, 'B') + K.t(170, 20, 'cada rayita es 1 m', 's tm');
  };

  xpLec('euc-demostrar-1', [
    ['Medir o demostrar',
      xpMira('dibujo', 'En geometría hay dos maneras de saber algo: **medirlo** o **demostrarlo**.', { dib: cruce, v: { a: 50, num: 1 }, alto: 204 }, [
        ['Dos rectas se cruzan. Mides los ángulos de enfrente: 50° y 50°. Iguales.', {}],
        ['Otro cruce: 72° y 72°. Otra vez iguales. Eso es geometría experimental: mirar y medir.', { a: 72 }],
        ['Pero hay infinitos cruces. Medir muchos no prueba que pase en todos.', { a: 120 }],
        ['La geometría deductiva no mide: razona. De unas pocas verdades saca todas las demás.', { num: 0 }],
        ['Lo que así se demuestra vale para todos los cruces a la vez.', { a: 95 }],
      ], 'Medir deja sospechar; demostrar asegura. La geometría deductiva razona una vez para todos los casos.'),
      xpHaz('fichas', 'Pon cada manera de trabajar en su caja: ¿es de la geometría experimental o de la deductiva?', {
        slots: [{ x: 88, y: 60, w: 164, h: 92, n: 2, et: 'experimental' }, { x: 252, y: 60, w: 164, h: 92, n: 2, et: 'deductiva' }], alto: 130,
        fichas: ['usar postulados', 'medir casos', 'usar teoremas', 'probar ejemplos'], meta: [['medir casos', 'probar ejemplos'], ['usar postulados', 'usar teoremas']], pista: 'Medir y probar casos es experimentar; razonar desde verdades aceptadas es deducir.' },
      'Experimental: medir y probar casos. Deductiva: razonar desde postulados y teoremas.')],
    ['Los ladrillos de la geometría',
      xpMira('dibujo', 'Para razonar hacen falta **ladrillos**: palabras claras y verdades de partida.', { dib: ladrillos, v: { k: 0 }, alto: 204 }, [
        ['Punto, recta y plano no se definen: son los términos primitivos. Todos sabemos qué son.', {}],
        ['Con ellos se escriben las definiciones. Punto medio: el que parte un segmento en dos congruentes.', { k: 1 }],
        ['Un postulado se acepta sin demostrar. Ejemplo: por dos puntos pasa una sola recta.', { k: 2 }],
        ['Un teorema sí se demuestra. Ejemplo: los ángulos opuestos por el vértice son congruentes.', { k: 3 }],
        ['Un corolario sale enseguida de un teorema: si un ángulo del cruce es recto, los cuatro lo son.', { k: 4 }],
      ], 'Primitivos y definiciones dan las palabras; los postulados se aceptan; teoremas y corolarios se demuestran.'),
      xpHaz('fichas', 'Ponle a cada ladrillo su nombre: término primitivo, definición, postulado o teorema.', {
        slots: [{ x: 88, y: 82, w: 112, h: 36 }, { x: 252, y: 82, w: 112, h: 36 }, { x: 88, y: 182, w: 112, h: 36 }, { x: 252, y: 182, w: 112, h: 36 }], alto: 206, fondo: minis,
        fichas: ['teorema', 'postulado', 'corolario', 'definición', 'primitivo'], meta: ['primitivo', 'definición', 'postulado', 'teorema'], pista: 'Uno no se define, otro explica una palabra, otro se acepta y otro se demuestra.' },
      'Plano: primitivo. Ángulo recto: definición. Dos puntos y una recta: postulado. Opuestos por el vértice: teorema.')],
    ['Hipótesis, tesis y razones',
      xpMira('fichas', 'Un teorema dice «si pasa esto, **entonces** pasa aquello». Míralo demostrado.', { slots: col(5, 34, 262, 140, 37), alto: 204, fichas: ['hipótesis', 'definición', 'hipótesis', 'sustitución', 'resta'],
        fondo: K => K.t(10, 16, 'afirmación', 's tm', 'start') + K.t(262, 16, 'razón', 's tm') + izq(K, ['1. ∠1 y ∠2 complementarios', '2. ∠1 + ∠2 = 90°', '3. ∠2 = 30°', '4. ∠1 + 30° = 90°', '5. ∠1 = 60°'], 34, 37) }, [
        ['Lo que va después del «si» es la hipótesis: lo que nos dan. Lo que sigue al «entonces» es la tesis.', {}],
        ['Cada afirmación lleva al lado su razón. La primera es un dato: su razón es «hipótesis».', { pon: { 0: 'hipótesis' } }],
        ['Complementarios quiere decir que suman 90°. Esa razón es una definición.', { pon: { 1: 'definición' } }],
        ['El otro dato, 30°, se mete en la suma. Eso se llama sustituir.', { pon: { 2: 'hipótesis', 3: 'sustitución' } }],
        ['Se resta 30° a los dos lados y aparece la tesis. Ahí termina la demostración.', { pon: { 4: 'resta' } }],
        ['Regla de oro: ninguna afirmación va sin razón, y «se ve en el dibujo» no es una razón.', {}],
      ], 'Hipótesis: lo que se da. Tesis: lo que se demuestra. Cada afirmación lleva su razón.'),
      xpHaz('fichas', '∠1 y ∠2 forman par lineal (vecinos sobre una recta: suman 180°) y ∠1 mide 110°. Pon la razón de cada paso.', { slots: col(4, 36, 262, 140), alto: 180,
        fondo: K => tabla(K, ['1. ∠1 + ∠2 = 180°', '2. ∠1 = 110°', '3. 110° + ∠2 = 180°', '4. ∠2 = 70°']),
        fichas: ['sustitución', 'tesis', 'par lineal', 'resta', 'se ve', 'hipótesis'], meta: ['par lineal', 'hipótesis', 'sustitución', 'resta'], pista: 'El 110° es un dato; meterlo en la suma es sustituir.' },
      'Par lineal, hipótesis, sustitución y resta: cuatro afirmaciones, cuatro razones.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una viga AB de 16 m lleva un soporte M en su punto medio y otro, N, en el punto medio de MB. Ubícalos.', { dib: viga, v: { m: 3, n: 6 }, metas: { m: 8, n: 12 }, alto: 180,
        manijas: [{ k: 'm', min: 1, max: 15, paso: 1, rot: () => 'M', en: v => [30 + v.m * 17.5, 62], de: x => (x - 30) / 17.5 }, { k: 'n', min: 1, max: 15, paso: 1, rot: () => 'N', en: v => [30 + v.n * 17.5, 138], de: x => (x - 30) / 17.5 }],
        lee: v => `$AM = ${v.m}$, $AN = ${v.n}$`, dice: () => 'M parte la viga en dos trozos iguales; N parte el trozo MB en dos.' },
      'M queda a 8 m de A. N parte a MB por la mitad: a 12 m de A y a 4 m de B.')],
  ], 'Medir no es demostrar; hay primitivos, definiciones, postulados y teoremas; y cada afirmación lleva su razón.');

  // ------------------------------------------------------------------------------------------------ lección 2
  const barras = (v, K) => {
    const q = k(v), bar = (y, n, w = 120, cls = 'fa') => K.r(90, y, w, 16, cls) + K.t(74, y + 13, n, 's', 'end');
    const T = ['propiedades de la igualdad', 'reflexiva', 'simétrica', 'transitiva', 'aditiva', 'sustitución'][q];
    const F = ['', 'AB = AB', 'AB = CD  ⇒  CD = AB', 'AB = CD y CD = EF  ⇒  AB = EF', 'AB = CD  ⇒  AB + 2 = CD + 2', 'AB + CD = 10 y CD = AB  ⇒  AB + AB = 10'][q];
    let h = K.t(170, 22, T, 'ta') + bar(50, 'AB');
    if (q >= 2) h += bar(86, 'CD');
    if (q === 3) h += bar(122, 'EF');
    if (q === 4) h += K.r(210, 50, 40, 16, 'fg') + K.r(210, 86, 40, 16, 'fg');
    return h + K.t(170, 180, F, q === 5 ? 's' : '');
  };
  const reglas = (v, K) => {
    const q = k(v);
    let h = K.t(170, 22, q === 4 ? 'cuadrado → rectángulo → 4 rectos' : 'si es cuadrado → tiene 4 rectos', 'ta');
    if (q >= 1 && q <= 3) h += pol(K, [CUAD, ROMBO, RECT][q - 1], 76, 100, q === 3 ? 'fg' : 'fa') + K.t(76, 156, ['es cuadrado', 'no tiene 4 rectos', 'tiene 4 rectos'][q - 1], 's') + K.ar(140, 100, 184, 100, q === 3 ? 'lf d' : 'la')
      + K.t(258, 105, ['tiene 4 rectos', 'no es cuadrado', '¿es cuadrado?'][q - 1], q === 3 ? 'tf' : '');
    if (q === 4) h += pol(K, CUAD, 170, 100) + K.t(170, 156, 'luego: cuadrado → 4 rectos', 's');
    return h + K.t(170, 190, ['', 'modus ponens', 'modus tollens', 'no vale: no se sabe', 'silogismo'][q], 'tm');
  };
  const recta4 = K => K.l(40, 30, 300, 30) + [['A', 60], ['B', 130], ['C', 210], ['D', 280]].map(([n, x]) => K.c(x, 30, 4, 'fk') + K.t(x, 18, n, 's')).join('') + K.l(95, 24, 95, 36, 'la') + K.l(245, 24, 245, 36, 'la');
  const absurdo = (v, K) => {
    const V = [110, 170], a = v.a, n = Math.round(a), P = g => K.at(...V, 120, g), mal = a > 90.5;
    return K.ang(V, P(0), P(a), 46, `${n}°`, mal ? 'ff' : 'fa', mal ? 'tf' : 'ta') + (mal ? '' : K.ang(V, P(a), P(90), 36, `${90 - n}°`, 'fg', 'tg'))
      + K.l(...V, 290, 170) + K.l(...V, 110, 30) + K.pl([[120, 170], [120, 160], [110, 160]], 'lm') + K.l(...V, ...P(a), 'la gr') + K.c(...V, 4, 'fk')
      + K.f(v.m, K.t(250, 60, 'más de 90°', 'tf')) + K.f(v.x, K.t(250, 86, '¡contradicción!', 'tf'));
  };
  const par = (v, K) => {
    const O = [170, 150], R = K.at(...O, 112, v.a), n = Math.round(v.a);
    return K.ang(O, [300, 150], R, 42, `${n}°`, 'fa', 'ta') + K.ang(O, R, [40, 150], 34, `${180 - n}°`, 'fg', 'tg') + K.l(40, 150, 300, 150) + K.l(...O, ...R, 'la gr') + K.c(...O, 4, 'fk');
  };
  const giro = { k: 'a', min: 15, max: 165, paso: 5, en: v => XPK.at(170, 150, 112, v.a), de: (x, y) => (y > 150 ? (x < 170 ? 180 : 0) : Math.atan2(150 - y, x - 170) * 180 / Math.PI) };

  xpLec('euc-demostrar-2', [
    ['Las razones de la igualdad',
      xpMira('dibujo', 'Para demostrar con medidas hay **razones que siempre valen**: las propiedades de la igualdad.', { dib: barras, v: { k: 0 }, alto: 196 }, [
        ['Cuando una demostración compara medidas, usa las propiedades de la igualdad. Son cinco.', {}],
        ['Reflexiva: toda medida es igual a sí misma. AB = AB.', { k: 1 }],
        ['Simétrica: si AB = CD, entonces CD = AB. Se puede leer al revés.', { k: 2 }],
        ['Transitiva: si AB = CD y CD = EF, entonces AB = EF. Se encadenan.', { k: 3 }],
        ['Aditiva: a dos medidas iguales les sumas lo mismo y siguen iguales.', { k: 4 }],
        ['Sustitución: una medida se puede cambiar por otra igual dentro de cualquier cuenta.', { k: 5 }],
      ], 'Reflexiva, simétrica, transitiva, aditiva y sustitución: razones que valen para cualquier medida.'),
      xpHaz('fichas', 'Ponle a cada paso la propiedad de la igualdad que lo justifica.', { slots: col(3, 28, 284, 104), alto: 130,
        fondo: K => izq(K, ['∠1 = ∠2 y ∠2 = ∠3: luego ∠1 = ∠3', 'AB = CD: luego AB + 2 = CD + 2', '∠5 = ∠5'], 28),
        fichas: ['aditiva', 'reflexiva', 'simétrica', 'transitiva'], meta: ['transitiva', 'aditiva', 'reflexiva'], pista: 'Mira qué pasó: se encadenó, se sumó lo mismo o se comparó consigo mismo.' },
      'Encadenar es transitiva; sumar lo mismo, aditiva; igual a sí mismo, reflexiva.')],
    ['Reglas para sacar conclusiones',
      xpMira('dibujo', 'Una **regla de inferencia** dice cuándo una conclusión sale segura.', { dib: reglas, v: { k: 0 }, alto: 200 }, [
        ['Partimos de una verdad con forma de «si p, entonces q».', {}],
        ['Modus ponens: se sabe que pasa p. Entonces, seguro, pasa q.', { k: 1 }],
        ['Modus tollens: se sabe que q no pasa. Entonces p tampoco puede pasar.', { k: 2 }],
        ['Ojo: si pasa q, no se sabe nada de p. Un rectángulo tiene 4 rectos y no es cuadrado.', { k: 3 }],
        ['Silogismo: si p da q, y q da r, entonces p da r. Las flechas se encadenan.', { k: 4 }],
      ], 'Ponens: de p sale q. Tollens: sin q no hay p. Silogismo: se encadena. De q no se saca p.'),
      xpHaz('fichas', 'Regla: «si dos ángulos son rectos, entonces son congruentes». Pon lo que se concluye en cada caso.', { slots: col(3, 52, 242, 188), alto: 152,
        fondo: K => K.t(170, 18, 'si son rectos → son congruentes', 's ta') + izq(K, ['∠1 y ∠2 son rectos:', '∠3 y ∠4 no congruentes:', '∠5 y ∠6 congruentes:'], 52),
        fichas: ['no se sabe', 'son rectos', 'son congruentes', 'no son rectos los dos'], meta: ['son congruentes', 'no son rectos los dos', 'no se sabe'], pista: 'Dos ángulos de 40° son congruentes y no son rectos.' },
      'Ponens da «son congruentes»; tollens, «no son rectos los dos»; del tercero no sale nada.')],
    ['Directa: de la hipótesis a la tesis',
      xpMira('fichas', 'La **demostración directa** camina de la hipótesis a la tesis, paso a paso.', { slots: col(4, 72, 262, 140, 37), alto: 204, fichas: ['hipótesis', 'reflexiva', 'aditiva', 'suma de segm.'],
        fondo: K => recta4(K) + K.t(262, 52, 'razón', 's tm') + izq(K, ['1. AB = CD', '2. BC = BC', '3. AB + BC = CD + BC', '4. AC = BD'], 72, 37) }, [
        ['Cuatro puntos en una recta, con AB = CD. Queremos demostrar que AC = BD.', {}],
        ['Se empieza por lo que nos dan. Primera línea: AB = CD, razón «hipótesis».', { pon: { 0: 'hipótesis' } }],
        ['El trozo BC es igual a sí mismo. Parece poco, pero es una razón: reflexiva.', { pon: { 1: 'reflexiva' } }],
        ['A los dos iguales se les suma el mismo trozo BC. Razón: aditiva.', { pon: { 2: 'aditiva' } }],
        ['AB + BC es AC, y CD + BC es BD: lo dice la suma de segmentos. Llegamos a la tesis.', { pon: { 3: 'suma de segm.' } }],
      ], 'Directa: se parte de la hipótesis y cada paso, con su razón, acerca a la tesis.'),
      xpHaz('fichas', 'Ordena esta demostración directa de arriba abajo: primero la hipótesis, al final la tesis.', { slots: [0, 1, 2].map(i => ({ x: 170, y: 24 + i * 44, w: 220, h: 34 })), alto: 136,
        fondo: K => K.ar(170, 42, 170, 50, 'la') + K.ar(170, 86, 170, 94, 'la'),
        fichas: ['∠AOC = 2 · ∠AOB', 'OB biseca al ∠AOC', '∠AOB = ∠BOC'], meta: ['OB biseca al ∠AOC', '∠AOB = ∠BOC', '∠AOC = 2 · ∠AOB'], pista: 'La bisectriz es el dato; de su definición salen dos ángulos iguales.' },
      'Dato, lo que dice la definición de bisectriz y, al final, la tesis.')],
    ['Indirecta: suponer lo contrario',
      xpMira('dibujo', 'Cuando el camino directo no sale, se usa la **demostración indirecta**.', { dib: absurdo, v: { a: 35, m: 0, x: 0 }, alto: 200 }, [
        ['Tesis: si dos ángulos son complementarios, ninguno de los dos es obtuso.', {}],
        ['Primer paso: suponer lo contrario de la tesis. Digamos que uno sí es obtuso.', { a: 115 }],
        ['Entonces él solo ya pasa de 90°, y con el otro suman todavía más.', { m: 1 }],
        ['Pero eran complementarios: suman 90° justos. Eso es una contradicción, un absurdo.', { x: 1 }],
        ['Lo supuesto no puede ser. Queda demostrada la tesis: es la reducción al absurdo.', { a: 35, m: 0, x: 0 }],
      ], 'Indirecta: se niega la tesis, se llega a una contradicción y por eso la tesis es cierta.'),
      xpHaz('fichas', 'M está entre A y B, y AB mide 10. Arma el absurdo que demuestra que AM mide menos de 10.', { slots: col(4, 28, 226, 212), alto: 172,
        fondo: K => izq(K, ['Supongo:', 'Entonces:', 'Pero:', 'Luego:'], 28),
        fichas: ['AM + MB = AB = 10', 'AM < 10', 'M no está entre A y B', 'AM ≥ 10', 'AM + MB > 10'], meta: ['AM ≥ 10', 'AM + MB > 10', 'AM + MB = AB = 10', 'AM < 10'], pista: 'Se niega la tesis, no el dato: empieza suponiendo que AM no es menor que 10.' },
      'Suponer AM ≥ 10 lleva a AM + MB > 10, que choca con AM + MB = 10.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos calles rectas se cruzan. La esquina del parque (a la derecha) abre 40° más que su vecina. Gira la calle hasta que se cumpla.', { dib: par, v: { a: 60 }, metas: { a: 110 }, alto: 190, manijas: [giro],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `La del parque mide ${v.a}° y su vecina ${180 - v.a}°: forman par lineal.` },
      'Par lineal y sustitución: $x + (x + 40^\\circ) = 180^\\circ$, así que miden 70° y 110°.')],
  ], 'Propiedades de la igualdad, reglas de inferencia, el camino directo y la reducción al absurdo.');

  // ------------------------------------------------------------------------------------------------ lección 3
  const anidados = (v, K) => {
    const q = k(v), T = ['', 'ser cuadrado basta: suficiente', 'sin ser rectángulo no hay cuadrado: necesaria', 'ser rectángulo no basta', 'si p, entonces q: p suficiente, q necesaria', 'si y solo si: necesaria y suficiente'][q];
    return K.c(170, 100, 86, 'fg') + K.c(140, 116, 44, 'fa') + K.t(170, 34, 'rectángulos', 's tg') + K.t(140, 92, 'cuadrados', 's ta') + pol(K, CUAD.map(([x, y]) => [x * 0.55, y * 0.55]), 140, 124, q === 1 || q === 2 ? 'fA' : 'fa')
      + (q >= 3 ? pol(K, RECT.map(([x, y]) => [x * 0.6, y * 0.6]), 216, 112, 'fg') : '') + K.t(170, 206, T, 's');
  };
  const FR = [['la frase', 'si es cuadrado, es rectángulo', 'V'], ['recíproco', 'si es rectángulo, es cuadrado', 'F'], ['contrario', 'si no es cuadrado, no es rectángulo', 'F'], ['contrarrecíproco', 'si no es rectángulo, no es cuadrado', 'V']];
  const parientes = (v, K) => FR.map(([n, t, b], i) => K.f(v.k - i + 1, K.t(10, 22 + i * 46, n, 's tm', 'start') + K.t(10, 40 + i * 46, t, '', 'start') + K.t(306, 38 + i * 46, b, b === 'V' ? 'b to' : 'b tf'))).join('')
    + K.f(v.k - 3, K.pl([[322, 30], [332, 30], [332, 172], [322, 172]], 'lo'));
  const TRI = [[[-34, 28], [34, 28], [0, -31]], [[-40, 28], [36, 28], [14, -26]], [[-44, 16], [44, 16], [0, -17]]];
  const triangulos = (v, K) => K.f(1 - v.k, K.t(170, 92, 'demostrar: razonar', 'tm') + K.t(170, 120, 'refutar: basta un caso', 'ta')) + K.f(v.k, K.t(170, 22, 'si es isósceles → es equilátero', 'ta')) + TRI.map((P, i) => K.f(v.k - i - 1, pol(K, P, 62 + i * 108, 100, ['fa', 'fg', 'ff'][i]) + K.t(62 + i * 108, 150, ['equilátero', 'escaleno', 'isósceles'][i], 's') + K.t(62 + i * 108, 168, ['la cumple', 'no aplica', 'la tumba'][i], 's tm'))).join('')
    + K.f(v.k - 4, K.t(278, 188, 'contraejemplo', 'tf'));
  const lotes = (v, K) => {
    const w = v.w * 16, h = v.h * 16;
    return K.r(10, 86, 96, 64, 'fg') + K.t(58, 123, '6 × 4', 's tg') + K.t(58, 170, 'perímetro 20', 's tm') + K.r(124, 150 - h, w, h, 'fa') + K.t(196, 170, `perímetro ${Math.round(2 * (v.w + v.h))}`, 's ta') + K.l(8, 150, 280, 150, 'lm');
  };

  xpLec('euc-demostrar-3', [
    ['Basta o hace falta',
      xpMira('dibujo', 'En «si p, entonces q», las dos partes **no juegan el mismo papel**.', { dib: anidados, v: { k: 0 }, alto: 214 }, [
        ['Míralo con figuras: todos los cuadrados viven dentro de los rectángulos.', {}],
        ['Con saber que es cuadrado ya basta para saber que es rectángulo: condición suficiente.', { k: 1 }],
        ['Para ser cuadrado hace falta ser rectángulo. Sin eso, imposible: condición necesaria.', { k: 2 }],
        ['Pero necesaria no quiere decir suficiente: este rectángulo largo no es cuadrado.', { k: 3 }],
        ['En «si p, entonces q»: p es suficiente para q, y q es necesaria para p.', { k: 4 }],
        ['Si la frase vale en los dos sentidos, la condición es necesaria y suficiente.', { k: 5 }],
      ], 'En «si p, entonces q», p es suficiente para q (basta) y q es necesaria para p (hace falta).'),
      xpHaz('fichas', 'En cada renglón, la primera condición ¿es suficiente, necesaria o las dos cosas para la segunda?', { slots: col(3, 28, 288, 96), alto: 130,
        fondo: K => izq(K, ['Ser equilátero, para ser isósceles', 'Tener tres lados, para ser equilátero', 'Tener tres lados, para ser triángulo'], 28),
        fichas: ['necesaria', 'ninguna', 'las dos', 'suficiente'], meta: ['suficiente', 'necesaria', 'las dos'], pista: 'Pregunta dos cosas: ¿con eso basta? ¿Sin eso se puede?' },
      'Ser equilátero basta; tener tres lados hace falta; y para ser triángulo es las dos cosas.')],
    ['Cuatro frases parientes',
      xpMira('dibujo', 'De cada condicional salen **tres parientes**. No todos dicen lo mismo.', { dib: parientes, v: { k: 0 }, alto: 190 }, [
        ['Partimos de una frase verdadera: si es cuadrado, entonces es rectángulo.', {}],
        ['Recíproco: se voltea. Si es rectángulo, es cuadrado. ¡Falso!', { k: 1 }],
        ['Contrario: se niegan las dos partes. Si no es cuadrado, no es rectángulo. También falso.', { k: 2 }],
        ['Contrarrecíproco: se voltea y se niega. Si no es rectángulo, no es cuadrado. Verdadero.', { k: 3 }],
        ['El contrarrecíproco siempre vale lo mismo que la frase original: son equivalentes.', { k: 4 }],
        ['Por eso, para demostrar un condicional se puede demostrar su contrarrecíproco.', { k: 5 }],
      ], 'El contrarrecíproco (voltear y negar) equivale a la frase; el recíproco y el contrario, no.'),
      xpHaz('fichas', 'Arma el contrarrecíproco de «si dos ángulos son complementarios, entonces los dos son agudos».', { slots: [{ x: 206, y: 60, w: 200, h: 36 }, { x: 206, y: 108, w: 200, h: 36 }], alto: 136,
        fondo: K => K.t(170, 20, '«si son complementarios, los dos son agudos»', 's ta') + K.t(48, 65, 'si', 's tm') + K.t(48, 113, 'entonces', 's tm'),
        fichas: ['son complementarios', 'no son agudos los dos', 'los dos son agudos', 'no son complementarios'], meta: ['no son agudos los dos', 'no son complementarios'], pista: 'Voltea las dos partes y niega las dos.' },
      'Voltear y negar: «si no son agudos los dos, entonces no son complementarios».')],
    ['Un solo caso tumba la frase',
      xpMira('dibujo', 'Para demostrar hace falta razonar. Para **refutar** basta un caso.', { dib: triangulos, v: { k: 0 }, alto: 200 }, [
        ['Demostrar que algo vale siempre pide una demostración. Tumbarlo es más barato.', {}],
        ['Frase: si un triángulo es isósceles, entonces es equilátero. ¿Será verdad?', { k: 1 }],
        ['Este equilátero la cumple. Pero un caso a favor no demuestra nada.', { k: 2 }],
        ['Este escaleno no es isósceles: la frase no habla de él. Ni la apoya ni la tumba.', { k: 3 }],
        ['Este sí es isósceles y no es equilátero. Cumple la hipótesis y falla la tesis.', { k: 4 }],
        ['Eso es un contraejemplo. Con uno solo, la frase queda refutada.', { k: 5 }],
      ], 'Un contraejemplo cumple la hipótesis y falla la tesis. Con uno basta para refutar.'),
      xpHaz('dibujo', 'Refuta: «si dos ángulos son suplementarios, uno es agudo y el otro obtuso». Gira el rayo hasta un contraejemplo.', { dib: par, v: { a: 60 }, metas: { a: 90 }, alto: 190, manijas: [giro],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => (v.a === 90 ? 'Dos rectos: suplementarios, y ninguno es agudo ni obtuso.' : `${v.a}° y ${180 - v.a}°: uno agudo y otro obtuso. Este caso cumple la frase.`) },
      'Dos ángulos rectos son suplementarios y ninguno es agudo ni obtuso: contraejemplo.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una vecina dice: «si dos lotes rectangulares tienen el mismo perímetro, tienen la misma área». El suyo mide 6 por 4. Arma un lote que la contradiga.', { dib: lotes, v: { w: 6, h: 4 }, cumple: v => v.w + v.h === 10 && v.w * v.h !== 24, sol: { w: 7, h: 3 }, alto: 190,
        manijas: [{ k: ['w', 'h'], min: [1, 1], max: [9, 7], paso: 1, en: v => [124 + v.w * 16, 150 - v.h * 16], de: (x, y) => [(x - 124) / 16, (150 - y) / 16] }],
        lee: v => `$${v.w} \\cdot ${v.h} = ${v.w * v.h}$`, dice: v => `Tu lote tiene perímetro ${2 * (v.w + v.h)}. El de la vecina: perímetro 20 y área 24.` },
      'Un lote de 7 por 3 tiene perímetro 20 y área 21, no 24: cumple la hipótesis y falla la tesis.')],
  ], 'Suficiente y necesaria, los parientes de un condicional, y el contraejemplo que refuta.');
}
;
//#archivo js/explora-euc-2.js
// Geometría Euclidiana · mundo 2 «euc-elementos»: explicaciones Explora (spec 2026-11-26-curso-euclidiana). Los ejemplos no son los de los ejercicios.
{
  const R = Math.round, gr = n => `${R(n)}°`, DEG = 180 / Math.PI;
  const ronda = (K, n, r, c) => Array.from({ length: n }, (_, i) => K.at(...c, r, 90 + i * 360 / n));
  const sobre = (O, x, y) => (y > O[1] ? (x < O[0] ? 180 : 0) : Math.atan2(O[1] - y, x - O[0]) * DEG);   // ángulo de un punto sobre el piso

  // ------------------------------------------------------------------------------------- euc-elementos-1 · puntos, rectas y segmentos
  const inc = (v, K) => {
    const A = [80, 140], B = [240, 100], C = [160, 120 - 62 * v.cy];
    let haz = ''; for (const g of [-50, -20, 14, 40, 75]) haz += K.l(...K.at(...A, 60, g + 180), ...K.at(...A, 60, g), 'lm');
    return K.f(v.pl, K.p([[20, 172], [250, 172], [322, 48], [92, 48]], 'fa')) + K.f(v.haz, haz) + K.f(v.r, K.l(16, 156, 320, 80, 'la gr'))
      + K.c(...A, 5, 'fk') + K.t(80, 164, 'A') + K.f(v.b, K.c(...B, 5, 'fk') + K.t(240, 124, 'B')) + K.f(v.c, K.c(...C, 5, 'fF') + K.t(C[0], C[1] - 10, 'C', 'tf'));
  };
  const GX = x => 40 + x * 24, GY = y => 180 - y * 24;
  const enLinea = v => 2 * (v.y - 2) === v.x - 2 && v.x !== 2 && v.x !== 6;
  const col = (v, K) => {
    let g = ''; for (let x = 0; x <= 12; x++) for (let y = 0; y <= 6; y++) g += K.c(GX(x), GY(y), 1.2, 'fM');
    return g + K.l(GX(0), GY(1), GX(12), GY(7), 'la') + K.c(GX(2), GY(2), 5, 'fk') + K.c(GX(6), GY(4), 5, 'fk') + K.t(GX(2) + 6, GY(2) + 20, 'A') + K.t(GX(6) + 6, GY(4) + 20, 'B') + K.t(GX(v.x), GY(v.y) - 16, 'C', 'ta');
  };
  const orden = (v, K) => {
    const y = 110, pt = (x, n) => K.c(x, y, 5, 'fk') + K.t(x, y - 14, n);
    return K.f(v.sp, K.r(20, 22, 300, 88, 'fa') + K.t(170, 62, 'un semiplano', 's ta') + K.t(170, 160, 'el otro semiplano', 's tm')) + K.l(20, y, 320, y, 'lm')
      + K.f(v.seg, K.l(90, y, 170, y, 'la gr')) + K.f(v.ray, K.ar(90, y, 318, y, 'la gr')) + K.f(v.opu, K.ar(170, y, 318, y, 'la gr') + K.ar(170, y, 22, y, 'lg gr'))
      + pt(90, 'A') + pt(170, 'B') + pt(250, 'C') + K.f(v.semi, K.c(90, y, 5.5, 'fc'));
  };
  const rayo = (v, K) => {
    const y = 100, X = x => 30 + x * 20;
    return K.ar(X(4), y, 326, y, 'la') + K.l(X(4), y, X(9), y, 'la gr') + K.c(X(4), y, 5, 'fk') + K.c(X(9), y, 5, 'fk') + K.t(X(4), y + 26, 'A') + K.t(X(9), y + 26, 'B') + K.t(X(v.x), y - 18, 'P', 'ta');
  };
  const mide = (v, K) => {
    const y = 110, A = 50, B = 146, C = 290, M = 170;
    return K.l(A, y, B, y, 'la gr') + K.t((A + B) / 2, y - 12, '4', 'ta') + K.c(A, y, 5, 'fk') + K.c(B, y, 5, 'fk') + K.t(A, y - 34, 'A') + K.t(B, y - 34, 'B')
      + K.f(v.c, K.l(B, y, C, y, 'lg gr') + K.t((B + C) / 2 + 16, y - 12, '6', 'tg') + K.c(C, y, 5, 'fk') + K.t(C, y - 34, 'C') + K.cota(A, y + 44, C, y + 44, 'AC = 10'))
      + K.f(v.m, K.c(M, y, 5, 'fF') + K.t(M, y + 24, 'M', 'tf'));
  };
  const regla = (v, K) => {
    const y = 110, X = x => 30 + x * 20; let h = K.l(20, y, 320, y, 'lm');
    for (let i = 0; i <= 14; i++) h += K.l(X(i), y - 4, X(i), y + 4, 'lm') + (i % 2 ? '' : K.t(X(i), y + 24, i, 's tm'));
    return h + K.l(X(2), y, X(12), y, 'la gr') + K.c(X(2), y, 5, 'fk') + K.c(X(12), y, 5, 'fk') + K.t(X(2), y - 16, 'A') + K.t(X(12), y - 16, 'B') + K.t(X(v.x), y - 20, 'M', 'ta');
  };
  const rectas = (v, K) => {
    const n = R(v.n), P = ronda(K, n, 78, [170, 100]); let h = '';
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) h += K.l(...P[i], ...P[j], i ? 'lr' : 'la');
    return K.f(v.f ?? 1, h) + P.map(q => K.c(...q, 4.5, 'fk')).join('') + K.t(8, 20, `${n} puntos`, 'tm', 'start') + K.f(v.f ?? 1, K.t(332, 20, `${n * (n - 1) / 2} rectas`, 'ta', 'end'));
  };
  const peaje = (v, K) => {
    const y = 110, X = x => 30 + x * 280 / 24, x = R(v.x);
    return K.l(X(0), y, X(v.x), y, 'la gr') + K.l(X(v.x), y, X(24), y, 'lg gr') + K.c(X(0), y, 6, 'fk') + K.c(X(24), y, 6, 'fk') + K.t(X(0), y + 28, 'A') + K.t(X(24), y + 28, 'C') + K.t(X(v.x), y - 20, 'P', 'ta')
      + K.t(X(v.x / 2), y - 44, `${x} km`, 's ta') + K.t(X(12 + v.x / 2), y - 44, `${24 - x} km`, 's tg') + K.cota(X(0), y + 44, X(24), y + 44, '24 km');
  };

  xpLec('euc-elementos-1', [
    ['Puntos que determinan',
      xpMira('dibujo', 'Todo empieza con tres ideas que no se definen: **punto**, **recta** y **plano**. Mira cómo se amarran.', { dib: inc, v: { haz: 0, b: 0, r: 0, c: 0, cy: 0, pl: 0 }, alto: 200 }, [
        ['Un punto solo marca un lugar. Lo nombramos con una letra mayúscula.', {}],
        ['Por un solo punto pasan muchísimas rectas: uno no alcanza para escoger.', { haz: 1 }],
        ['Con un segundo punto queda una sola: dos puntos diferentes determinan una recta.', { haz: 0, b: 1, r: 1 }],
        ['Si un tercer punto cae sobre esa recta, los tres son colineales.', { c: 1 }],
        ['Si queda por fuera, ninguna recta pasa por los tres: determinan un plano.', { cy: 1, pl: 1 }],
      ], 'Dos puntos diferentes determinan una recta; tres puntos no colineales determinan un plano.'),
      xpHaz('dibujo', 'Arrastra el punto C hasta que A, B y C sean **colineales**.', { dib: col, v: { x: 9, y: 2 }, cumple: enLinea, sol: { x: 10, y: 6 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [12, 6], paso: 1, en: v => [GX(v.x), GY(v.y)], de: (x, y) => [(x - 40) / 24, (180 - y) / 24] }],
        dice: v => (enLinea(v) ? 'C está en la recta AB: los tres son colineales.' : 'C no está en la recta que determinan A y B.') }, 'Colineales: los tres puntos están en una misma recta.')],
    ['Entre, segmento y rayo',
      xpMira('dibujo', 'Los puntos de una recta tienen **orden**. Con él se nombran sus pedazos.', { dib: orden, v: { seg: 0, ray: 0, semi: 0, opu: 0, sp: 0 }, alto: 190 }, [
        ['De tres puntos de una recta, uno y solo uno está entre los otros dos. Aquí es B.', {}],
        ['El segmento AB son A, B y los puntos que están entre ellos. Tiene dos extremos.', { seg: 1 }],
        ['El rayo AB arranca en A, pasa por B y sigue sin fin. A es su origen.', { seg: 0, ray: 1 }],
        ['Si al rayo le quitamos el origen queda una semirrecta: por eso el punto va hueco.', { semi: 1 }],
        ['Desde B salen dos rayos opuestos, BA y BC: juntos forman toda la recta.', { ray: 0, semi: 0, opu: 1 }],
        ['Y una recta parte al plano en dos semiplanos. Ella es el borde: no es de ninguno.', { opu: 0, sp: 1 }],
      ], 'Segmento: dos extremos. Rayo: un origen y sigue sin fin. Semirrecta: el rayo sin su origen.'),
      xpHaz('dibujo', 'Arrastra P a un lugar que esté en el **rayo AB** pero no en el **segmento AB**.', { dib: rayo, v: { x: 2 }, cumple: v => v.x > 9, sol: { x: 12 }, alto: 180,
        manijas: [{ k: 'x', min: 0, max: 14, paso: 1, en: v => [30 + v.x * 20, 100], de: x => (x - 30) / 20 }],
        dice: v => (v.x < 4 ? 'P quedó del otro lado de A: hasta ahí no llega el rayo AB.' : v.x <= 9 ? 'P está en el segmento AB, entre los extremos.' : 'P está en el rayo, más allá de B.') }, 'El rayo AB sigue más allá de B; el segmento AB termina en B.')],
    ['Medir, sumar y partir',
      xpMira('dibujo', 'A cada segmento le corresponde un número: su **medida**. Con ella se puede sumar y restar.', { dib: mide, v: { c: 0, m: 0 }, alto: 190 }, [
        ['Este segmento AB mide 4. Escribimos AB = 4.', {}],
        ['Si B está entre A y C, las medidas se suman: AB + BC = AC.', { c: 1 }, '$4 + 6 = 10$'],
        ['Y si conoces el total, un pedazo se halla restando.', {}, '$10 - 4 = 6$'],
        ['El punto medio M parte al segmento AC en dos segmentos congruentes.', { m: 1 }, '$AM = MC = 5$'],
        ['Congruentes quiere decir de igual medida. Iguales, que son el mismo segmento.', {}],
        ['Por eso AM y MC son congruentes, pero no iguales: son dos segmentos distintos.', {}, '$AM \\cong MC$'],
      ], 'Si B está entre A y C, AB + BC = AC. El punto medio deja dos segmentos congruentes.'),
      xpHaz('dibujo', 'A está en 2 y B en 12. Lleva M al **punto medio** del segmento AB.', { dib: regla, v: { x: 3 }, metas: { x: 7 }, alto: 180,
        manijas: [{ k: 'x', min: 0, max: 14, paso: 1, en: v => [30 + v.x * 20, 110], de: x => (x - 30) / 20 }],
        lee: v => `$AM = ${Math.abs(v.x - 2)}$, $MB = ${Math.abs(12 - v.x)}$`, dice: v => `AM mide ${Math.abs(v.x - 2)} y MB mide ${Math.abs(12 - v.x)}.` }, 'AB mide 10: el punto medio queda a 5 de cada extremo, en el 7.')],
    ['Contar rectas',
      xpMira('dibujo', 'Si dos puntos determinan una recta, ¿cuántas determinan **varios** puntos?', { dib: rectas, v: { n: 3, f: 1 }, alto: 200 }, [
        ['Con 3 puntos no colineales salen 3 rectas: una por cada pareja de puntos.', {}],
        ['Con 4 puntos, de cada uno salen 3 rectas: una hacia cada uno de los otros.', { n: 4 }],
        ['Pero 4 por 3 cuenta cada recta dos veces: la recta AB es la misma recta BA.', {}, '$\\tfrac{4 \\cdot 3}{2} = 6$'],
        ['Con 5 puntos pasa igual: 5 por 4, y la mitad.', { n: 5 }, '$\\tfrac{5 \\cdot 4}{2} = 10$'],
        ['En general: n puntos, sin tres colineales, determinan n(n − 1)/2 rectas.', {}, '$\\tfrac{n(n-1)}{2}$'],
      ], 'Con n puntos, sin tres colineales, se determinan $\\tfrac{n(n-1)}{2}$ rectas.'),
      xpHaz('dibujo', 'Mueve la perilla hasta que los puntos determinen **15 rectas**.', { dib: rectas, v: { n: 3, f: 1 }, metas: { n: 6 }, alto: 250, manijas: [{ k: 'n', min: 2, max: 9, paso: 1, et: 'puntos' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 1}}{2} = ${v.n * (v.n - 1) / 2}$`, dice: v => `Con ${v.n} puntos, de cada uno salen ${v.n - 1} rectas.` }, 'Seis puntos: $\\tfrac{6 \\cdot 5}{2} = 15$ rectas.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En una carretera recta, el peaje P está entre las ciudades A y C, separadas 24 km. De P a C hay el **triple** que de A a P. Ubica el peaje.', { dib: peaje, v: { x: 12 }, metas: { x: 6 }, alto: 180,
        manijas: [{ k: 'x', min: 1, max: 23, paso: 1, en: v => [30 + v.x * 280 / 24, 110], de: x => (x - 30) * 24 / 280 }],
        lee: v => `$${v.x} + ${24 - v.x} = 24$`, dice: v => `De A a P hay ${v.x} km y de P a C, ${24 - v.x} km.` }, 'Son cuatro partes iguales de 6 km: $AP = 6$ y $PC = 18$.')],
  ], 'Puntos que determinan rectas, el orden que da segmentos y rayos, y medidas que se suman, se restan y se parten.');

  // ------------------------------------------------------------------------------------------- euc-elementos-2 · ángulos y su medida
  const clase = a => (a < 90 ? 'agudo' : a === 90 ? 'recto' : a < 180 ? 'obtuso' : 'llano');
  const abre = (v, K) => {
    const O = [150, 160], B = K.at(...O, 130, v.a);
    return K.sec(...O, 40, 0, v.a, 'fa') + K.t(...K.at(O[0], O[1] + 5, 64, v.a / 2), gr(v.a), 'ta') + K.l(...O, 280, 160) + K.l(...O, ...B, 'la gr') + K.c(...O, 4, 'fk')
      + K.t(146, 182, 'O') + K.t(292, 165, 'A') + K.t(...K.at(150, 165, 146, v.a), 'B') + K.t(8, 22, clase(R(v.a)), 'tm', 'start');
  };
  const OV = [170, 170];
  const partes = (v, K) => {
    const A = K.at(...OV, 128, 0), B = K.at(...OV, 128, v.a), P = K.at(...OV, 118, v.x), pone = (g, s, d = 142) => K.t(...K.at(OV[0], OV[1] + 5, d, g), s, 's');
    return K.ang(OV, A, P, 46, gr(v.x), 'fa', 'ta') + K.ang(OV, P, B, 36, v.oc ? '?' : gr(v.a - v.x), 'fg', 'tg') + K.l(...OV, ...A) + K.l(...OV, ...B) + K.l(...OV, ...P, 'la gr') + K.c(...OV, 4, 'fk')
      + pone(0, 'A') + pone(v.a, 'B') + pone(v.x, 'P', 134) + K.t(166, 190, 'O', 's') + K.t(8, 20, `∠AOB = ${R(v.a)}°`, 'tm', 'start');
  };
  const lineal = (v, K) => {
    const O = [170, 150], T = K.at(...O, 115, v.a), D = [300, 150], I = [40, 150];
    return K.ang(O, D, T, 42, gr(v.a), 'fa', 'ta') + K.ang(O, T, I, 34, gr(180 - R(v.a)), 'fg', 'tg') + K.l(...I, ...D) + K.l(...O, ...T, 'la gr') + K.c(...O, 4, 'fk');
  };
  const esquina = (v, K) => {
    const V = [110, 170], T = K.at(...V, 135, v.a), D = [265, 170], U = [110, 20];
    return K.ang(V, D, T, 46, gr(v.a), 'fa', 'ta') + K.ang(V, T, U, 38, gr(90 - R(v.a)), 'fg', 'tg') + K.l(...V, ...D) + K.l(...V, ...U) + K.l(...V, ...T, 'la gr') + K.c(...V, 4, 'fk');
  };
  const cruce = (v, K) => {
    const C = [170, 100], P = g => K.at(...C, 92, g), A = P(12), B = P(12 + v.a), A2 = P(192), B2 = P(192 + v.a), n = R(v.a);
    return K.ang(C, A, B, 40, gr(n), 'fa', 'ta') + K.f(v.f2, K.ang(C, A2, B2, 40, gr(n), 'fa', 'ta') + K.ang(C, B, A2, 30, gr(180 - n), 'fg', 'tg')) + K.l(...A, ...A2) + K.l(...B, ...B2) + K.c(...C, 4, 'fk');
  };
  const parejas = (v, K) => (v.cual < 0.5 ? esquina(v, K) : v.cual < 1.5 ? lineal(v, K) : cruce(v, K));
  const perp = (v, K) => {
    const C = [170, 100], I = [70, 100], D = [270, 100], T = K.at(...C, 85, v.g), U = K.at(...C, 85, v.g + 180), g = R(v.g);
    return K.ang(C, D, T, 30, gr(g), 'fa', 'ta') + K.f(v.f4, K.ang(C, T, I, 26, gr(180 - g), 'fg', 'tg') + K.ang(C, I, U, 30, gr(g), 'fa', 'ta') + K.ang(C, U, D, 26, gr(180 - g), 'fg', 'tg'))
      + K.l(20 + 50 * v.seg, 100, 320 - 50 * v.seg, 100, 'gr') + K.l(...U, ...T, 'la gr') + K.c(...C, 4, 'fk')
      + K.f(v.seg, K.c(...I, 5, 'fk') + K.c(...D, 5, 'fk') + K.t(56, 105, 'A') + K.t(284, 105, 'B') + K.t(182, 122, 'M', 's')) + K.f(v.med, K.t(222, 26, 'mediatriz', 's ta'));
  };
  const corre = (v, K) => {
    const y = 120, X = x => 30 + x * 20, M = X(v.x); let h = '';
    for (let i = 3; i <= 11; i++) h += K.l(X(i), y - 4, X(i), y + 4, 'lm');
    return h + K.l(X(3), y, X(11), y, 'gr') + K.l(M, 36, M, 172, 'la') + K.pl([[M + 9, y], [M + 9, y - 9], [M, y - 9]], 'lo') + K.c(X(3), y, 5, 'fk') + K.c(X(11), y, 5, 'fk') + K.t(X(3) - 14, y + 5, 'A') + K.t(X(11) + 14, y + 5, 'B')
      + K.t(X(3), y + 26, '3', 's tm') + K.t(X(11), y + 26, '11', 's tm');
  };
  const lampara = (v, K) => {
    const O = [170, 160], T = K.at(...O, 120, v.a);
    return K.ang(O, [300, 160], T, 40, gr(v.a), 'fa', 'ta') + K.ang(O, T, [40, 160], 32, gr(180 - R(v.a)), 'fg', 'tg') + K.l(30, 160, 310, 160) + K.l(...O, ...T, 'la gr') + K.c(...O, 5, 'fk') + K.t(170, 184, 'mesa', 's tm');
  };

  xpLec('euc-elementos-2', [
    ['Ángulo y medida',
      xpMira('dibujo', 'Dos rayos que salen del mismo punto forman un **ángulo**. Su medida dice cuánto se abre.', { dib: abre, v: { a: 50 }, alto: 200 }, [
        ['El origen común, O, es el vértice. Los rayos OA y OB son los lados.', {}],
        ['Este mide 50°. Todo ángulo de menos de 90° es agudo.', {}],
        ['Con 90° justos es un ángulo recto, como la esquina de una hoja.', { a: 90 }],
        ['Entre 90° y 180° el ángulo es obtuso.', { a: 135 }],
        ['Y con 180° los dos lados quedan en línea: es un ángulo llano.', { a: 180 }],
      ], 'Agudo: menos de 90°. Recto: 90°. Obtuso: entre 90° y 180°. Llano: 180°.'),
      xpHaz('dibujo', 'Abre el ángulo hasta que sea **obtuso** y mida 40° más que un recto.', { dib: abre, v: { a: 60 }, metas: { a: 130 }, alto: 200,
        manijas: [{ k: 'a', min: 10, max: 170, paso: 5, en: v => XPK.at(150, 160, 112, v.a), de: (x, y) => sobre([150, 160], x, y) }],
        dice: v => `Mide ${v.a}°: es ${clase(v.a)}.` }, 'Un recto mide 90°: con 40° más son 130°, un ángulo obtuso.')],
    ['Sumar y partir ángulos',
      xpMira('dibujo', 'Un rayo que sale del vértice por el **interior** del ángulo lo parte en dos.', { dib: partes, v: { a: 100, x: 30, oc: 0 }, alto: 200 }, [
        ['P está en el interior del ángulo AOB. El rayo OP lo parte en dos ángulos.', {}],
        ['Las dos partes juntas dan el ángulo entero: es la adición de ángulos.', {}, '$30^\\circ + 70^\\circ = 100^\\circ$'],
        ['Si OP gira, una parte gana lo que la otra pierde. La suma no cambia.', { x: 65 }, '$65^\\circ + 35^\\circ = 100^\\circ$'],
        ['Cuando las dos partes son congruentes, OP es la bisectriz del ángulo.', { x: 50 }, '$50^\\circ = 50^\\circ$'],
        ['La bisectriz es única: solo un rayo deja dos ángulos congruentes.', {}],
      ], 'Si P es interior, ∠AOP + ∠POB = ∠AOB. La bisectriz parte al ángulo en dos congruentes.'),
      xpHaz('dibujo', 'El ángulo AOB mide 80°. Mueve el rayo OP hasta que el ángulo dorado, ∠POB, mida 25°.', { dib: partes, v: { a: 80, x: 20, oc: 1 }, metas: { x: 55 }, alto: 200,
        manijas: [{ k: 'x', min: 5, max: 75, paso: 5, en: v => XPK.at(170, 170, 118, v.x), de: (x, y) => sobre(OV, x, y) }],
        lee: v => `$${v.x}^\\circ + ? = 80^\\circ$`, dice: v => `∠AOP mide ${v.x}°; a ∠POB le queda el resto de 80°.` }, 'Al dorado le queda el resto: $80^\\circ - 25^\\circ = 55^\\circ$ para ∠AOP.')],
    ['Parejas de ángulos',
      xpMira('dibujo', 'Hay parejas de ángulos con **nombre propio**, según lo que suman o cómo están puestos.', { dib: parejas, v: { cual: 0, a: 35, f2: 0 }, alto: 200 }, [
        ['Dos ángulos que suman 90° son complementarios: juntos llenan un ángulo recto.', {}, '$35^\\circ + 55^\\circ = 90^\\circ$'],
        ['Dos que suman 180° son suplementarios. Estos, además, forman un par lineal.', { cual: 1, a: 70 }, '$70^\\circ + 110^\\circ = 180^\\circ$'],
        ['Par lineal: son adyacentes, con un lado común, y sus otros lados son rayos opuestos.', {}],
        ['Dos rectas que se cortan forman ángulos opuestos por el vértice.', { cual: 2, a: 65 }],
        ['Los dos son suplementos del mismo vecino: por eso son congruentes.', { f2: 1 }, '$180^\\circ - 115^\\circ = 65^\\circ$'],
      ], 'Complementarios: 90°. Suplementarios: 180°. Par lineal: adyacentes y suplementarios. Opuestos por el vértice: congruentes.'),
      xpHaz('dibujo', 'Gira el rayo hasta que los dos ángulos del par lineal sean **congruentes**.', { dib: lineal, v: { a: 40 }, metas: { a: 90 }, alto: 190,
        manijas: [{ k: 'a', min: 15, max: 165, paso: 5, en: v => XPK.at(170, 150, 115, v.a), de: (x, y) => sobre([170, 150], x, y) }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `Miden ${v.a}° y ${180 - v.a}°.` }, 'Si los dos ángulos de un par lineal son congruentes, cada uno es recto: mide 90°.')],
    ['Perpendiculares y mediatriz',
      xpMira('dibujo', 'Cuando dos rectas se cortan formando un ángulo recto se llaman **perpendiculares**.', { dib: perp, v: { g: 60, f4: 0, seg: 0, med: 0 }, alto: 200 }, [
        ['Dos rectas que se cortan forman cuatro ángulos. Aquí miden 60° y 120°.', { f4: 1 }],
        ['Si uno de ellos es recto, las rectas son perpendiculares.', { g: 90 }],
        ['Y entonces los cuatro son rectos: cada uno es par lineal u opuesto de otro.', {}],
        ['Ahora la recta horizontal es un segmento AB, y M es su punto medio.', { f4: 0, seg: 1 }],
        ['La perpendicular al segmento que pasa por su punto medio es la mediatriz.', { med: 1 }],
      ], 'Perpendiculares: se cortan en ángulo recto. Mediatriz: la perpendicular por el punto medio.'),
      xpHaz('dibujo', 'El segmento AB va del 3 al 11. Corre la perpendicular hasta que sea su **mediatriz**.', { dib: corre, v: { x: 4 }, metas: { x: 7 }, alto: 190,
        manijas: [{ k: 'x', min: 1, max: 13, paso: 1, en: v => [30 + v.x * 20, 60], de: x => (x - 30) / 20 }],
        lee: v => `$AM = ${Math.abs(v.x - 3)}$, $MB = ${Math.abs(11 - v.x)}$`, dice: v => `La perpendicular corta a ${Math.abs(v.x - 3)} de A y a ${Math.abs(11 - v.x)} de B.` }, 'La mediatriz pasa por el punto medio: a 4 de A y a 4 de B, en el 7.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'El brazo de una lámpara forma con la mesa un ángulo cuyo **suplemento** mide el cuádruple. Inclina el brazo hasta ahí.', { dib: lampara, v: { a: 60 }, metas: { a: 36 }, alto: 200,
        manijas: [{ k: 'a', min: 8, max: 88, paso: 4, en: v => XPK.at(170, 160, 120, v.a), de: (x, y) => sobre([170, 160], x, y) }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `El brazo forma ${v.a}° con la mesa; su suplemento mide ${180 - v.a}°.` }, 'Son cinco partes iguales en 180°: el ángulo mide 36° y su suplemento, 144°.')],
  ], 'Ángulos que se miden, se suman y se parten; parejas con nombre propio, y rectas que se cortan en ángulo recto.');

  // --------------------------------------------------------------------------------------------------- euc-elementos-3 · polígonos
  const NOM = { 3: 'triángulo', 4: 'cuadrado', 5: 'pentágono', 6: 'hexágono', 7: 'heptágono', 8: 'octágono', 9: 'eneágono', 10: 'decágono', 11: 'undecágono', 12: 'dodecágono' };
  const FORMAS = [[[50, 150], [110, 60], [170, 130], [240, 50], [290, 140]], [[60, 160], [170, 110], [280, 160], [250, 50], [170, 90], [90, 50]], [[170, 40], [270, 100], [230, 170], [110, 170], [70, 100]]];
  const quebrada = (v, K) => {
    const k = R(v.k), P = FORMAS[k];
    return K.f(v.rel, K.p(P, 'fa')) + (k ? K.p(P, 'fn') : K.pl(P)) + P.map(q => K.c(...q, 4, 'fk')).join('') + K.f(v.rc, K.l(20, 75, 320, 75, 'lf d'));
  };
  const convexo = P => {
    let s = 0;
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], c = P[(i + 2) % P.length], z = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
      if (!z || (s && Math.sign(z) !== s)) return false;
      s = Math.sign(z);
    }
    return true;
  };
  const cuad = v => [[70, 170], [270, 170], [250, 60], [v.x, v.y]];
  const mueveD = (v, K) => K.p(cuad(v), convexo(cuad(v)) ? 'fa' : 'ff') + cuad(v).slice(0, 3).map(q => K.c(...q, 4, 'fk')).join('') + K.t(v.x, v.y - 16, 'D', 'ta');
  const regular = (v, K) => { const n = R(v.n), P = ronda(K, n, 74, [170, 92]); return K.p(P, 'fa') + P.map(q => K.c(...q, 3.5, 'fk')).join('') + K.t(170, 192, NOM[n] || `${n} lados`, 'ta'); };
  const tres = K => [[60, 5], [170, 8], [280, 10]].map(([x, n]) => K.p(ronda(K, n, 44, [x, 70]), 'fa')).join('');
  const pares = n => { const l = []; for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) if (i || j < n - 1) l.push([i, j]); return l; };
  const diagonales = (v, K) => {
    const n = R(v.n), P = ronda(K, n, 78, [170, 100]), D = pares(n), tr = (l, cls) => l.map(([i, j]) => K.l(...P[i], ...P[j], cls)).join('');
    return K.f(v.t, tr(D.filter(d => d[0]), 'lg')) + K.f(v.a, tr(D.filter(d => !d[0]), 'la gr')) + K.p(P, 'fn') + P.map((q, i) => K.c(...q, i ? 4 : 6, i ? 'fk' : 'fA')).join('')
      + K.t(8, 20, `${n} lados`, 'tm', 'start') + K.f(v.t, K.t(332, 20, `${D.length} diagonales`, 'ta', 'end'));
  };
  const circulo = (v, K) => {
    const C = [170, 100], P = g => K.at(...C, 78, g);
    return K.f(v.in, K.c(...C, 78, 'fa')) + K.c(...C, 78, 'fn') + K.f(v.di, K.l(...P(180), ...P(0), 'lf gr') + K.t(124, 92, 'diámetro', 's tf')) + K.f(v.r, K.l(...C, ...P(60), 'la gr') + K.t(218, 66, 'radio', 's ta'))
      + K.f(v.cu, K.l(...P(230), ...P(310), 'lg gr') + K.t(170, 152, 'cuerda', 's tg')) + K.f(v.ar, K.arc(...C, 78, 100, 160, 'lo gr') + K.t(104, 28, 'arco', 's to')) + K.c(...C, 4, 'fk') + K.t(164, 120, 'O', 's');
  };
  const cuerda = (v, K) => {
    const C = [170, 100], A = K.at(...C, 78, 200), B = K.at(...C, 78, v.g);
    return K.c(...C, 78, 'fn') + K.l(...A, ...B, R(v.g) === 20 ? 'lo gr' : 'la gr') + K.c(...A, 5, 'fk') + K.c(...C, 4, 'fk') + K.t(A[0] - 14, A[1] + 10, 'A') + K.t(164, 122, 'O', 's') + K.t(...K.at(170, 105, 96, v.g), 'B', 'ta');
  };

  xpLec('euc-elementos-3', [
    ['Líneas quebradas y polígonos',
      xpMira('dibujo', 'Con segmentos puestos uno tras otro se arman líneas nuevas. Una de ellas encierra los **polígonos**.', { dib: quebrada, v: { k: 0, rc: 0, rel: 0 }, alto: 200 }, [
        ['Varios segmentos, uno tras otro, forman una línea quebrada. Esta es abierta.', {}],
        ['Si el último punto se une con el primero, la línea quebrada es cerrada.', { k: 1 }],
        ['Esta tiene una entrada: hay rectas que la cortan en cuatro puntos. No es convexa.', { rc: 1 }],
        ['Si ninguna recta la corta en más de dos puntos es convexa: una línea poligonal.', { k: 2 }],
        ['La porción de plano que limita es un polígono, con sus lados y sus vértices.', { rc: 0, rel: 1 }],
      ], 'Polígono: la porción de plano que limita una línea quebrada cerrada y convexa, la línea poligonal.'),
      xpHaz('dibujo', 'Este cuadrilátero tiene una entrada en D. Arrastra D hasta que sea **convexo**.', { dib: mueveD, v: { x: 180, y: 130 }, cumple: v => convexo(cuad(v)), sol: { x: 90, y: 60 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [40, 40], max: [300, 150], paso: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] }],
        dice: v => (convexo(cuad(v)) ? 'Ninguna recta lo corta en más de dos puntos: es convexo.' : 'Tiene una entrada: una recta puede cortarlo en cuatro puntos.') }, 'Convexo: ninguna recta corta a la línea en más de dos puntos.')],
    ['Nombres y polígonos regulares',
      xpMira('dibujo', 'Los polígonos se **nombran** por su número de lados, y algunos son más parejos que otros.', { dib: regular, v: { n: 5 }, alto: 200 }, [
        ['Con 3 lados, triángulo; con 4, cuadrilátero; con 5, pentágono.', {}],
        ['Con 6, hexágono; con 7, heptágono; con 8, octágono; con 10, decágono.', { n: 8 }],
        ['Si todos sus lados son congruentes es equilátero; si lo son sus ángulos, equiángulo.', {}],
        ['Regular es el que cumple las dos cosas a la vez, como este octágono.', {}],
        ['Un rombo es equilátero y un rectángulo es equiángulo; el cuadrado es las dos cosas.', { n: 4 }],
      ], 'Regular: equilátero y equiángulo a la vez.'),
      xpHaz('fichas', 'Pon a cada polígono su **nombre**, contando sus lados.', { slots: [{ x: 60, y: 150, w: 104, h: 38 }, { x: 170, y: 150, w: 104, h: 38 }, { x: 280, y: 150, w: 104, h: 38 }], fichas: ['octágono', 'decágono', 'pentágono', 'eneágono'], meta: ['pentágono', 'octágono', 'decágono'], alto: 176, fondo: K => tres(K) },
        'Penta, cinco; octa, ocho; deca, diez.')],
    ['Contar diagonales',
      xpMira('dibujo', 'Una **diagonal** une dos vértices que no son consecutivos. ¿Cuántas tiene un polígono?', { dib: diagonales, v: { n: 5, a: 0, t: 0 }, alto: 200 }, [
        ['Desde un vértice del pentágono salen 2 diagonales.', { a: 1 }],
        ['Siempre salen n − 3: no hay diagonal hacia él mismo ni hacia sus dos vecinos.', {}, '$5 - 3 = 2$'],
        ['De los 5 vértices saldrían 5 por 2, pero así cada diagonal se cuenta dos veces.', { t: 1 }, '$\\tfrac{5 \\cdot 2}{2} = 5$'],
        ['En el heptágono salen 4 de cada vértice, y en total son 14.', { n: 7 }, '$\\tfrac{7 \\cdot 4}{2} = 14$'],
        ['En general, un polígono de n lados tiene n(n − 3)/2 diagonales.', {}, '$\\tfrac{n(n-3)}{2}$'],
      ], 'De cada vértice salen n − 3 diagonales; en total son $\\tfrac{n(n-3)}{2}$.'),
      xpHaz('dibujo', 'Mueve la perilla hasta que el polígono tenga **20 diagonales**.', { dib: diagonales, v: { n: 4, a: 1, t: 1 }, metas: { n: 8 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 12, paso: 1, et: 'lados' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 3}}{2} = ${v.n * (v.n - 3) / 2}$`, dice: v => `Con ${v.n} lados, de cada vértice salen ${v.n - 3}.` }, 'Ocho lados: $\\tfrac{8 \\cdot 5}{2} = 20$ diagonales.')],
    ['Circunferencia y círculo',
      xpMira('dibujo', 'También hay líneas curvas. La más pareja de todas es la **circunferencia**.', { dib: circulo, v: { r: 0, cu: 0, di: 0, ar: 0, in: 0 }, alto: 200 }, [
        ['Los puntos del plano que están a igual distancia de un centro O forman una circunferencia.', {}],
        ['Esa distancia es el radio: va del centro a cualquier punto de la circunferencia.', { r: 1 }],
        ['Una cuerda es un segmento que une dos puntos de la circunferencia.', { cu: 1 }],
        ['La cuerda que pasa por el centro es un diámetro: mide dos radios.', { di: 1 }],
        ['Un arco es un pedazo de la circunferencia, entre dos de sus puntos.', { ar: 1 }],
        ['La circunferencia es solo la línea. Junto con su interior forma el círculo.', { in: 1 }],
      ], 'Circunferencia: la línea. Círculo: la línea con su interior. El diámetro mide dos radios.'),
      xpHaz('dibujo', 'Arrastra B por la circunferencia hasta que la cuerda AB sea un **diámetro**.', { dib: cuerda, v: { g: 110 }, metas: { g: 20 }, alto: 200,
        manijas: [{ k: 'g', min: -40, max: 160, paso: 10, en: v => XPK.at(170, 100, 78, v.g), de: (x, y) => Math.atan2(100 - y, x - 170) * DEG }],
        dice: v => (v.g === 20 ? 'La cuerda AB pasa por el centro: es un diámetro.' : 'La cuerda AB no pasa por el centro O.') }, 'El diámetro es la cuerda que pasa por el centro.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque es un polígono. Hay un sendero recto entre cada par de esquinas no vecinas: son **77** senderos. ¿Cuántas esquinas tiene?', { dib: diagonales, v: { n: 5, a: 1, t: 1 }, metas: { n: 14 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 16, paso: 1, et: 'esquinas' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 3}}{2} = ${v.n * (v.n - 3) / 2}$`, dice: v => `Con ${v.n} esquinas hay ${v.n * (v.n - 3) / 2} senderos.` }, 'Los senderos son las diagonales: $\\tfrac{14 \\cdot 11}{2} = 77$.')],
  ], 'Líneas poligonales que encierran polígonos, sus nombres, sus diagonales, y la circunferencia con sus elementos.');
}
;
//#archivo js/explora-euc-3.js
// Geometría Euclidiana · mundo 3 «euc-triangulo»: explicaciones Explora (spec 2026-11-26-curso-euclidiana). Escenas «dibujo» y «fichas».
// Los ejemplos no son los de los ejercicios. Aquí aún no se usa la suma de los ángulos de un triángulo.
{
  const rad = g => g * Math.PI / 180, R = Math.round, r1 = x => Math.round(x * 10) / 10;
  const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const mid = (P, Q, t = 0.5) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const cen = T => [(T[0][0] + T[1][0] + T[2][0]) / 3, (T[0][1] + T[1][1] + T[2][1]) / 3];
  const fuera = (P, G, d) => { const L = dist(P, G) || 1; return [P[0] + (P[0] - G[0]) / L * d, P[1] + (P[1] - G[1]) / L * d]; };
  const rot = (K, P, G, t, cls = 's', d = 11) => { const [x, y] = fuera(P, G, d); return K.t(x, y + 4, t, cls); };
  const ray = (K, P, Q, n = 1, cls = '') => {
    const L = dist(P, Q) || 1, ux = (Q[0] - P[0]) / L, uy = (Q[1] - P[1]) / L, M = mid(P, Q); let h = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 4, x = M[0] + ux * o, y = M[1] + uy * o; h += K.l(x - uy * 5, y + ux * 5, x + uy * 5, y - ux * 5, cls); }
    return h;
  };
  const esc = (K, V, P, Q, s = 8) => { const a = dist(V, P) || 1, b = dist(V, Q) || 1, u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s]; return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm'); };
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 0, w: 90, et: e }));
  const baja = (sl, y) => sl.map(s => ({ ...s, y }));

  // ============================================================================================ 1 · El triángulo y sus elementos
  // El vértice C se mueve: el triángulo cambia de nombre.
  const TA = [90, 175], TB = [250, 175];
  const nombres = v => {
    const C = [v.x, v.y], a = dist(TB, C), b = dist(C, TA), c = 160, ig = (p, q) => Math.abs(p - q) < 2, s = [a * a, b * b, c * c].sort((m, n) => m - n), r = s[2] - s[0] - s[1];
    return [ig(a, b) && ig(b, c) ? 'equilátero' : ig(a, b) || ig(b, c) || ig(a, c) ? 'isósceles' : 'escaleno', Math.abs(r) < 0.03 * s[2] ? 'rectángulo' : r > 0 ? 'obtusángulo' : 'acutángulo', [a, b, c]];
  };
  const tipo = (v, K) => {
    const C = [v.x, v.y], T = [TA, TB, C], [nl, na, l] = nombres(v), S = [[TB, C], [C, TA], [TA, TB]], ig = (p, q) => Math.abs(p - q) < 2;
    const rec = na === 'rectángulo' ? [0, 1, 2].reduce((m, k) => (l[k] > l[m] ? k : m), 0) : -1;
    return K.p(T, 'fa') + S.map(([P, Q], k) => (l.some((x, j) => j !== k && ig(x, l[k])) ? ray(K, P, Q, 1) : '')).join('') + (rec >= 0 ? esc(K, T[rec], S[rec][0], S[rec][1], 10) : '')
      + K.t(TA[0] - 6, 192, 'A', 's') + K.t(TB[0] + 6, 192, 'B', 's') + K.t(C[0], C[1] - 9, 'C', 's') + K.f(v.nom, K.t(170, 204, `${nl} y ${na}`, 'ta'));
  };
  // Un segmento desde A hasta el lado BC: según dónde caiga tiene nombre.
  const NA = [130, 30], NB = [50, 170], NC = [290, 170], BIS = 50 + 240 * dist(NA, NB) / (dist(NA, NB) + dist(NA, NC));
  const notable = (v, K) => {
    const P = [v.p, 170], q = Math.abs(v.p - 130) < 1.5 ? 'altura' : Math.abs(v.p - 170) < 1.5 ? 'mediana' : Math.abs(v.p - BIS) < 1.5 ? 'bisectriz' : '';
    return K.p([NA, NB, NC], 'fn') + (q === 'bisectriz' ? K.ang(NA, NB, P, 34, '', 'fa') + K.ang(NA, P, NC, 28, '', 'fa') : '') + K.l(...NA, ...P, 'la gr') + (q === 'altura' ? esc(K, P, NC, NA) : q === 'mediana' ? ray(K, NB, P, 2) + ray(K, P, NC, 2) : '')
      + K.t(130, 20, 'A', 's') + K.t(38, 176, 'B', 's') + K.t(302, 176, 'C', 's') + K.t(v.p, 188, 'P', 's ta') + (q ? K.t(330, 24, q, 'ta', 'end') : '')
      + K.f(v.med, K.l(170, 60, 170, 196, 'lg d') + esc(K, [170, 170], NC, [170, 60]) + K.t(178, 72, 'mediatriz', 's tg', 'start'));
  };
  // Opuesto y comprendido.
  const OA = [170, 34], OB = [70, 160], OC = [270, 160];
  const opu = (v, K) => {
    const q = R(v.k);
    return (q === 1 ? K.ang(OA, OB, OC, 26, '', 'fa') : q === 2 ? K.ang(OA, OB, OC, 26, '', 'fg') : q === 3 ? K.ang(OB, OC, OA, 24, '', 'ff') + K.ang(OC, OA, OB, 24, '', 'ff') : '') + K.p([OA, OB, OC], 'fn')
      + (q === 1 ? K.l(...OB, ...OC, 'la gr') : q === 2 ? K.l(...OA, ...OB, 'lg gr') + K.l(...OA, ...OC, 'lg gr') : q === 3 ? K.l(...OB, ...OC, 'lf gr') : '')
      + K.t(170, 24, 'A', 's') + K.t(58, 168, 'B', 's') + K.t(282, 168, 'C', 's') + K.t(170, 184, ['', 'BC es opuesto al ángulo A', 'A está comprendido entre AB y AC', 'BC está comprendido entre B y C'][q] || '', 's tm');
  };
  const pqr = K => { const P = [170, 14], Q = [96, 96], Rr = [244, 96]; return K.ang(P, Q, Rr, 16, '', 'fa') + K.ang(Q, Rr, P, 16, '', 'fg') + K.ang(Rr, P, Q, 16, '', 'ff') + K.p([P, Q, Rr], 'fn') + K.t(184, 18, 'P', 's') + K.t(84, 102, 'Q', 's') + K.t(256, 102, 'R', 's'); };
  // El parque: BC mide 18 m.
  const parque = (v, K) => {
    const A = [120, 34], F = [52 + v.m * 13, 170]; let h = K.p([A, [52, 170], [286, 170]], 'fo');
    for (let k = 0; k <= 18; k++) h += K.l(52 + k * 13, 170, 52 + k * 13, 175, 'lm');
    return h + K.l(...A, ...F, 'la gr') + K.t(120, 24, 'A', 's') + K.t(40, 176, 'B', 's') + K.t(298, 176, 'C', 's') + K.t(F[0], 192, 'F', 's ta');
  };

  xpLec('euc-triangulo-1', [
    ['Dos apellidos',
      xpMira('dibujo', 'Un triángulo se clasifica de **dos maneras**: por sus lados y por sus ángulos.', { dib: tipo, v: { x: 200, y: 70, nom: 0 }, alto: 212 }, [
        ['Un triángulo tiene tres vértices, tres lados y tres ángulos. Se nombra con sus vértices: triángulo ABC.', {}],
        ['Este tiene sus tres lados distintos: por sus lados es escaleno.', { nom: 1 }],
        ['Movemos C hasta que dos lados midan lo mismo. Las rayitas marcan lados congruentes: es isósceles.', { x: 170, y: 75 }],
        ['Con los tres lados congruentes es equilátero.', { y: 36.4 }],
        ['Por sus ángulos: con los tres agudos es acutángulo. Con uno recto, como ahora, es rectángulo.', { x: 90, y: 75 }],
        ['Y con un ángulo obtuso, más abierto que un recto, es obtusángulo.', { x: 50, y: 95 }],
      ], 'Por lados: escaleno, isósceles o equilátero. Por ángulos: acutángulo, rectángulo u obtusángulo.'),
      xpHaz('dibujo', 'Arrastra el vértice C hasta que el triángulo sea **rectángulo en B**.', { dib: tipo, v: { x: 150, y: 75, nom: 1 }, metas: { x: 250 }, alto: 212,
        manijas: [{ k: 'x', min: 50, max: 290, paso: 20, en: v => [v.x, 75], de: x => x }], dice: v => `Ahora es ${nombres(v)[0]} y ${nombres(v)[1]}.` }, 'El ángulo recto queda en B cuando C está justo encima de B.')],
    ['Altura, mediana y bisectriz',
      xpMira('dibujo', 'Desde un vértice salen tres segmentos con **nombre propio**.', { dib: notable, v: { p: 235, med: 0 }, alto: 204 }, [
        ['Desde A podemos trazar muchos segmentos hasta el lado opuesto. Tres de ellos tienen nombre propio.', {}],
        ['La altura cae a escuadra sobre el lado opuesto: forma con él un ángulo recto.', { p: 130 }],
        ['La mediana llega justo al punto medio del lado opuesto.', { p: 170 }],
        ['La bisectriz parte el ángulo del vértice en dos ángulos congruentes.', { p: BIS }],
        ['La mediatriz es otra cosa: la perpendicular por el punto medio de un lado. No tiene que pasar por A.', { p: 170, med: 1 }],
      ], 'Altura: perpendicular. Mediana: al punto medio. Bisectriz: parte el ángulo. Mediatriz: perpendicular por el medio.'),
      xpHaz('dibujo', 'Mueve el pie P hasta que AP sea la **altura** que sale de A.', { dib: notable, v: { p: 230, med: 0 }, metas: { p: 130 }, alto: 204,
        manijas: [{ k: 'p', min: 60, max: 280, paso: 10, en: v => [v.p, 170], de: x => x }], dice: v => `AP forma con el lado BC un ángulo de ${R(Math.atan2(140, 130 - v.p) * 180 / Math.PI)}°.` }, 'La altura es el segmento que cae a escuadra: forma 90° con el lado opuesto.')],
    ['Opuesto y comprendido',
      xpMira('dibujo', 'Dos palabras que usaremos todo el tiempo: **opuesto** y **comprendido**.', { dib: opu, v: { k: 0 }, alto: 196 }, [
        ['Dos palabras para ubicarse dentro de un triángulo: opuesto y comprendido.', {}],
        ['El lado opuesto a un ángulo es el que queda enfrente, sin tocarlo. Frente al ángulo A está BC.', { k: 1 }],
        ['Vale al revés: el ángulo opuesto al lado BC es A.', {}],
        ['El ángulo comprendido entre dos lados es el que ellos forman. Entre AB y AC está el ángulo A.', { k: 2 }],
        ['Y el lado comprendido entre dos ángulos es el que los une: entre B y C está el lado BC.', { k: 3 }],
      ], 'Opuesto: el que queda enfrente. Comprendido: el que queda entre los otros dos.'),
      xpHaz('fichas', 'En el triángulo PQR, pon el lado **opuesto** al ángulo R y el ángulo **comprendido** entre QP y QR.', { slots: baja(fila('opuesto a R', 'entre QP y QR'), 138), fichas: ['PQ', 'QR', 'PR', '∠Q', '∠P'], meta: ['PQ', '∠Q'], alto: 178, fondo: K => pqr(K), pista: 'El lado opuesto a R no toca a R. QP y QR se juntan en un vértice.' }, 'Frente a R está PQ; los lados QP y QR forman el ángulo Q.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque triangular tiene un sendero de A al lado BC, que mide 18 m. Mueve la fuente F para que el sendero AF sea la **mediana**.', { dib: parque, v: { m: 4 }, metas: { m: 9 }, alto: 204,
        manijas: [{ k: 'm', min: 1, max: 17, paso: 1, en: v => [52 + v.m * 13, 170], de: x => (x - 52) / 13 }], lee: v => `$BF = ${v.m},\\ FC = ${18 - v.m}$`, dice: v => `La fuente queda a ${v.m} m de B y a ${18 - v.m} m de C.` }, 'La mediana llega al punto medio: $18 \\div 2 = 9$ m de cada esquina.')],
  ], 'Un triángulo tiene dos nombres, tres segmentos notables por vértice, y lados y ángulos opuestos o comprendidos.');

  // ============================================================================================ 2 · Criterios L-A-L, A-L-A y L-L-L
  const T0 = [[-34, 18], [36, 18], [14, -34]];
  const pon = (cx, cy, g = 0) => { const c = Math.cos(rad(g)), s = Math.sin(rad(g)); return T0.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]); };
  const marcas = (K, T) => K.ang(T[0], T[1], T[2], 14, '', 'fa') + K.ang(T[1], T[2], T[0], 14, '', 'fg') + K.ang(T[2], T[0], T[1], 14, '', 'ff') + ray(K, T[0], T[1], 1) + ray(K, T[1], T[2], 2) + ray(K, T[2], T[0], 3);
  const letras = (K, T, n) => { const G = cen(T); return T.map((V, k) => rot(K, V, G, n[k], '', 14)).join(''); };
  const calca = (v, K) => {
    const T1 = pon(90, 100), T2 = pon(250, 100, v.rot);
    return K.f(v.mar, marcas(K, T1) + marcas(K, T2)) + K.p(T1, 'fn') + K.p(T2, 'fn') + letras(K, T1, 'ABC') + K.f(v.lab, letras(K, T2, 'DEF'));
  };
  const dosMarcados = K => { const T1 = pon(90, 62), T2 = pon(250, 62, 200); return marcas(K, T1) + marcas(K, T2) + K.p(T1, 'fn') + K.p(T2, 'fn') + letras(K, T1, 'ABC') + letras(K, T2, 'DEF'); };
  // Los tres criterios.
  const cri = (v, K) => {
    const q = R(v.m), O = [70, 165], Q = [230, 165], nom = K.f(v.t, K.t(330, 24, ['L-A-L', 'A-L-A', 'L-L-L'][q] || '', 'ta', 'end'));
    if (q === 0) { const T = K.at(...O, 110, v.g); return K.ang(O, Q, T, 30, `${R(v.g)}°`, 'fa', 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, 'gr') + ray(K, O, Q, 1) + ray(K, O, T, 2) + K.f(v.c, K.l(...Q, ...T, 'la d')) + K.c(...O, 5, 'fk') + nom; }
    const ta = Math.tan(rad(v.a)), tb = Math.tan(rad(v.b)), x = 160 * tb / (ta + tb), C = [O[0] + x, O[1] - x * ta];
    if (q === 1) return K.ang(O, Q, C, 28, '', 'fa') + K.ang(Q, C, O, 28, '', 'fg') + K.l(...O, ...Q, 'gr') + ray(K, O, Q, 1) + K.l(...O, ...mid(O, C, 1.15), 'la') + K.l(...Q, ...mid(Q, C, 1.15), 'lg') + K.c(...C, 4, 'fk') + nom;
    return K.p([O, Q, C], 'fn') + K.l(...O, ...Q, 'gr') + K.l(...Q, ...C, 'la gr') + K.l(...C, ...O, 'lg gr') + ray(K, O, Q, 1) + ray(K, Q, C, 2) + ray(K, C, O, 3) + nom;
  };
  const BO1 = [30, 165], BO2 = [190, 165];
  const dosB = (v, K) => {
    const uno = (O, g, vivo) => { const Q = [O[0] + 90, O[1]], T = K.at(...O, 60, g); return K.ang(O, Q, T, 22, `${R(g)}°`, vivo ? 'fg' : 'fa', vivo ? 's tg' : 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, vivo ? 'la gr' : 'gr') + K.l(...Q, ...T, vivo ? 'lm d' : '') + K.t(O[0] + 45, O[1] + 17, '9', 's') + rot(K, mid(O, T), Q, '6', 's', 10); };
    return uno(BO1, 50, false) + uno(BO2, v.g, true);
  };
  // Isósceles y el caso L-L-A.
  const isoS = (v, K) => {
    if (R(v.m) === 0) {
      const A = [170, 25], B = [90, 170], C = [250, 170], D = [170, 170];
      return K.f(v.t, K.p([A, B, D], 'fa') + K.p([A, D, C], 'fg')) + K.f(v.e, K.ang(B, C, A, 24, '', 'ff') + K.ang(C, A, B, 24, '', 'ff')) + K.p([A, B, C], 'fn') + ray(K, A, B) + ray(K, A, C)
        + K.f(v.b, K.l(...A, ...D, 'la gr') + K.ang(A, B, D, 34, '', 'fo') + K.ang(A, D, C, 28, '', 'fo') + K.t(170, 188, 'D', 's')) + K.t(170, 16, 'A', 's') + K.t(78, 176, 'B', 's') + K.t(262, 176, 'C', 's');
    }
    const A = [40, 170], B = [150, 70];
    return K.ang(A, [300, 170], B, 30, '', 'fa') + K.l(...A, 320, 170) + K.l(...A, ...B, 'gr') + ray(K, A, B) + K.l(...B, 225, 170, 'la gr') + K.f(v.s, K.arc(150, 70, 125, -53.13, -126.87, 'lm d') + K.l(...B, 75, 170, 'lf gr') + K.c(75, 170, 4, 'fF'))
      + K.c(225, 170, 4, 'fA') + K.t(28, 176, 'A', 's') + K.t(150, 60, 'B', 's') + K.f(v.s, K.t(236, 26, 'L-L-A: dos triángulos distintos', 's tm'));
  };
  const rod = (v, K) => {
    const A = [40, 170], B = [150, 70], C = [v.x, 170];
    return K.ang(A, [300, 170], B, 30, '', 'fa') + K.l(...A, 320, 170) + K.l(...A, ...B, 'gr') + K.l(...B, 225, 170, 'lm d') + K.l(...B, ...C, 'la gr') + K.t(28, 176, 'A', 's') + K.t(150, 60, 'B', 's') + K.t(v.x, 190, 'C', 's ta');
  };
  // El estanque: E corre por la recta BM, más allá de M.
  const EM = [170, 100], EA = [80, 50], EB = [80, 150], ED = [260, 150], EU = [(170 - 80) / dist(EM, EB), (100 - 150) / dist(EM, EB)], PASO = dist(EM, EB) / 10;
  const puntoE = v => [EM[0] + EU[0] * v.e * PASO, EM[1] + EU[1] * v.e * PASO];
  const estanque = (v, K) => {
    const E = puntoE(v);
    return K.c(80, 100, 30, 'fg') + K.l(...EA, ...ED) + K.l(...EB, ...E) + ray(K, EA, EM) + ray(K, EM, ED) + K.l(...EA, ...EB, 'lm d') + K.l(...ED, ...E, 'la d') + K.ang(EM, EA, EB, 16, '', 'fa') + K.ang(EM, ED, E, 16, '', 'fa')
      + K.t(68, 46, 'A', 's') + K.t(68, 164, 'B', 's') + K.t(272, 164, 'D', 's') + K.t(170, 122, 'M', 's') + K.t(E[0] + 12, E[1] + 2, 'E', 's ta');
  };

  xpLec('euc-triangulo-2', [
    ['Calcar y encajar',
      xpMira('dibujo', 'Dos triángulos son **congruentes** si uno encaja exactamente sobre el otro.', { dib: calca, v: { rot: 0, lab: 0, mar: 0 }, alto: 190 }, [
        ['Dos figuras son congruentes si al calcar una y moverla encaja exactamente sobre la otra.', {}],
        ['Giramos la copia. Sigue siendo congruente con el original: girar no cambia ninguna medida.', { rot: 140 }],
        ['Cada vértice tiene su pareja: A con D, B con E y C con F. Eso es una correspondencia.', { lab: 1 }],
        ['Las partes que se corresponden son congruentes: lado con lado y ángulo con ángulo.', { mar: 1 }],
        ['Por eso importa el orden al escribir: △ABC ≅ △DEF pone cada vértice frente a su pareja.', {}],
      ], 'En triángulos congruentes, las seis partes correspondientes son congruentes, y el orden de las letras dice cuáles.'),
      xpHaz('fichas', 'Los triángulos son congruentes y tienen las mismas marcas. Pon el ángulo que corresponde a C y el lado que corresponde a AC.', { slots: baja(fila('∠C ≅', 'AC ≅'), 152), fichas: ['∠F', '∠D', 'DF', 'DE', 'EF'], meta: ['∠F', 'DF'], alto: 192, fondo: K => dosMarcados(K), pista: 'Sigue el color del arco de C y las tres rayitas de AC.' }, 'C va con F y A con D: ∠C ≅ ∠F y AC ≅ DF.')],
    ['Tres datos bastan',
      xpMira('dibujo', 'No hay que comparar las seis partes: **tres bien escogidas** bastan.', { dib: cri, v: { m: 0, g: 50, c: 0, t: 0, a: 50, b: 65 }, alto: 190 }, [
        ['¿Hay que comprobar los seis pares de partes? No: con tres bien escogidos basta.', {}],
        ['Dos varillas y una bisagra con el ángulo fijo: el tercer lado solo puede ser uno.', { c: 1 }],
        ['Es L-A-L: dos lados y el ángulo comprendido entre ellos. Se acepta como postulado.', { t: 1 }],
        ['A-L-A: un lado y los dos ángulos pegados a él. Los dos rayos se cortan en un único punto.', { m: 1 }],
        ['L-L-L: los tres lados. Tres varillas arman un solo triángulo; por eso es tan rígido.', { m: 2 }],
      ], 'L-A-L, A-L-A y L-L-L: tres partes respectivamente congruentes que aseguran triángulos congruentes.'),
      xpHaz('dibujo', 'Los dos triángulos tienen lados de 6 y 9. Abre la bisagra de la derecha hasta que queden congruentes por L-A-L.', { dib: dosB, v: { g: 110 }, metas: { g: 50 }, alto: 196,
        manijas: [{ k: 'g', min: 20, max: 140, paso: 10, en: v => XPK.at(...BO2, 60, v.g), de: (x, y) => Math.atan2(BO2[1] - y, x - BO2[0]) * 180 / Math.PI }], dice: v => `La bisagra de la derecha está abierta ${v.g}°.` }, 'Mismos dos lados y mismo ángulo entre ellos, 50°: el tercer lado ya no puede cambiar.')],
    ['El isósceles y un intruso',
      xpMira('dibujo', 'Los criterios sirven para **demostrar**. Y hay uno falso: L-L-A.', { dib: isoS, v: { m: 0, b: 0, t: 0, e: 0, s: 0 }, alto: 204 }, [
        ['Un triángulo isósceles: AB y AC son congruentes. Trazamos la bisectriz AD del ángulo A.', { b: 1 }],
        ['Los dos triángulos que quedan son congruentes por L-A-L: un lado, el ángulo partido y AD, que es común.', { t: 1 }],
        ['Entonces los ángulos B y C, que se corresponden, son congruentes: los ángulos de la base.', { e: 1 }],
        ['Vale al revés: si dos ángulos de un triángulo son congruentes, sus lados opuestos también.', {}],
        ['Ojo con L-L-A: dos lados y un ángulo que no está entre ellos. La varilla puede caer en dos sitios.', { m: 1 }],
        ['Salen dos triángulos distintos con los mismos tres datos. L-L-A no es un criterio.', { s: 1 }],
      ], 'En un triángulo, a lados congruentes se oponen ángulos congruentes, y viceversa. L-L-A no asegura nada.'),
      xpHaz('dibujo', 'El lado AB y el ángulo A no cambian, y BC mide 12.5. Desliza C por el rayo hasta **otro** punto donde BC mida lo mismo.', { dib: rod, v: { x: 225 }, metas: { x: 75 }, alto: 200,
        manijas: [{ k: 'x', min: 60, max: 240, paso: 15, en: v => [v.x, 170], de: x => x }], dice: v => `BC mide ${r1(Math.hypot(v.x - 150, 100) / 10)}.` }, 'Mismo ángulo y mismos dos lados, pero otro triángulo: por eso L-L-A no es criterio.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Para medir un estanque AB, Lina va de A a M y sigue lo mismo hasta D. Desde B pasa por M: ubica E para que △AMB ≅ △DME por L-A-L.', { dib: estanque, v: { e: 4 }, metas: { e: 10 }, alto: 200,
        manijas: [{ k: 'e', min: 2, max: 14, paso: 1, en: v => puntoE(v), de: (x, y) => ((x - EM[0]) * EU[0] + (y - EM[1]) * EU[1]) / PASO }], dice: v => `ME mide ${v.e} pasos y BM mide 10 pasos.` }, 'Con ME = BM hay L-A-L (los ángulos en M son opuestos por el vértice), y DE mide lo mismo que AB.')],
  ], 'Congruentes: partes correspondientes congruentes. Bastan L-A-L, A-L-A o L-L-L; nunca L-L-A.');

  // ============================================================================================ 3 · Desigualdades en el triángulo
  const extT = (K, A, C, a, c, o = {}) => {
    const ta = Math.tan(rad(a)), tc = Math.tan(rad(c)), w = C[0] - A[0], x = w * tc / (ta + tc), B = [A[0] + x, A[1] - x * ta], D = [Math.min(326, C[0] + 100), C[1]];
    return K.ang(C, D, B, 26, o.ext ?? `${R(180 - c)}°`, 'fo', 's to') + K.ang(A, C, B, 24, o.a ?? `${R(a)}°`, 'fa', 's ta') + K.ang(B, A, C, 20, o.b ?? `${R(180 - a - c)}°`, 'fg', 's tg') + K.f(o.lej ?? 0, K.l(...A, ...B, 'la gr')) + K.p([A, B, C], 'fn') + K.l(...C, ...D, 'lm');
  };
  const ext = (v, K) => extT(K, [60, 170], [220, 170], v.a, v.c, { lej: v.lej });
  // A mayor lado, mayor ángulo.
  const LA = [60, 170], LB = [280, 170];
  const lam = (v, K) => {
    const C = [v.x, 60], T = [LA, LB, C], S = [[LB, C], [C, LA], [LA, LB]], l = S.map(([P, Q]) => dist(P, Q)), G = cen(T), may = l.indexOf(Math.max(...l)), men = l.indexOf(Math.min(...l));
    const g = k => { const [P, Q] = S[k], V = T[k]; return R(Math.acos(((P[0] - V[0]) * (Q[0] - V[0]) + (P[1] - V[1]) * (Q[1] - V[1])) / (dist(P, V) * dist(Q, V))) * 180 / Math.PI); };
    return K.f(v.hi, K.ang(T[may], ...S[may], 22, '', 'ff')) + K.f(v.lo, K.ang(T[men], ...S[men], 22, '', 'fg')) + K.p(T, 'fn') + K.f(v.hi, K.l(...S[may][0], ...S[may][1], 'lf gr')) + K.f(v.lo, K.l(...S[men][0], ...S[men][1], 'lg gr'))
      + S.map(([P, Q], k) => rot(K, mid(P, Q), G, R(l[k] / 20), 's', 12)).join('') + T.map((V, k) => rot(K, V, G, `${g(k)}°`, 's tm', 16)).join('');
  };
  const pqr2 = K => { const P = [80, 20], Q = [130, 100], Rr = [270, 100]; return K.p([P, Q, Rr], 'fn') + K.t(72, 16, 'P', 's') + K.t(122, 112, 'Q', 's') + K.t(282, 106, 'R', 's') + K.t(200, 116, '6', 's ta') + K.t(186, 52, '9', 's ta') + K.t(94, 68, '4', 's ta'); };
  // Varillas sobre una base de 10, y la bisagra.
  const vara = (v, K) => {
    if (R(v.m) === 1) { const O = [90, 160], Q = [250, 160], T = K.at(...O, 120, v.g); return K.ang(O, Q, T, 28, `${R(v.g)}°`, 'fa', 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, 'gr') + K.l(...Q, ...T, 'lf gr') + K.t(170, 178, '8', 's') + rot(K, mid(O, T), Q, '6', 's', 10) + rot(K, mid(Q, T), O, r1(dist(Q, T) / 20), 's tf', 12); }
    const X0 = 70, X1 = 270, Y = 150, a = v.a, b = v.b, cierra = a + b > 10.001 && Math.abs(a - b) < 9.999;
    let P, Q;
    if (cierra) { const x = (a * a - b * b + 100) / 20, y = Math.sqrt(Math.max(0, a * a - x * x)); P = Q = [X0 + x * 20, Y - y * 20]; } else { const s = a + b > 9.999 ? 0 : 12; P = K.at(X0, Y, a * 20, s); Q = K.at(X1, Y, b * 20, 180 - s); }
    return K.l(X0, Y, X1, Y, 'gr') + K.l(X0, Y, ...P, cierra ? 'la gr' : 'lf gr') + K.l(X1, Y, ...Q, cierra ? 'lg gr' : 'lf gr') + K.t(170, 168, '10', 's') + K.t(X0 - 14, Y - 8, R(a), 's ta') + K.t(X1 + 14, Y - 8, R(b), 's tg');
  };
  const pueblos = (v, K) => {
    const u = 16, A = [30, 150], C = [30 + v.n * u, 150], n = v.n, cierra = n > 5 && n < 17;
    const x = (121 - 36 + n * n) / (2 * n), B = cierra ? [30 + x * u, 150 - Math.sqrt(Math.max(0, 121 - x * x)) * u] : null;
    return K.l(...A, ...C, 'gr') + (B ? K.l(...A, ...B, 'la gr') + K.l(...B, ...C, 'lg gr') + K.t(B[0], B[1] - 9, 'B', 's') : K.l(...A, 30 + 11 * u, 150 - 10, 'lf gr') + K.l(...C, C[0] - 6 * u * (n >= 17 ? 1 : -1), 150 - 10, 'lf gr')) + K.t(22, 168, 'A', 's') + K.t(C[0], 168, 'C', 's ta');
  };

  xpLec('euc-triangulo-3', [
    ['El ángulo exterior',
      xpMira('dibujo', 'Primera desigualdad: el **ángulo exterior** les gana a los dos interiores lejanos.', { dib: ext, v: { a: 50, c: 60, lej: 0 }, alto: 200 }, [
        ['Si alargamos un lado del triángulo, aparece por fuera un ángulo exterior.', {}],
        ['Tiene un vecino pegado, el interior adyacente, y dos interiores lejanos: los no adyacentes.', { lej: 1 }],
        ['El exterior es mayor que cada uno de los dos lejanos: aquí 120° le gana a 50° y a 70°.', {}, '$120^\\circ > 70^\\circ > 50^\\circ$'],
        ['Si cambiamos el triángulo cambian las medidas, pero el exterior sigue ganando.', { a: 30, c: 40 }, '$140^\\circ > 110^\\circ > 30^\\circ$'],
        ['Por eso un triángulo no puede tener dos ángulos rectos, ni dos obtusos.', {}],
      ], 'Un ángulo exterior de un triángulo es mayor que cada uno de los interiores no adyacentes.'),
      xpHaz('fichas', 'El ángulo exterior mide 125°. Reparte las medidas: ¿cuáles podría tener el ángulo A, que no lo toca, y cuáles no?', { slots: [{ x: 90, y: 152, w: 150, h: 46, n: 2, et: 'A puede medir' }, { x: 250, y: 152, w: 150, h: 46, n: 2, et: 'A no puede medir' }], fichas: ['50°', '125°', '85°', '140°'], meta: [['50°', '85°'], ['125°', '140°']], alto: 196,
        fondo: K => extT(K, [70, 112], [200, 112], 45, 55, { a: '?', b: '' }), pista: 'Un interior no adyacente siempre es menor que el exterior.' }, 'A debe medir menos que el exterior: 50° y 85° pueden; 125° y 140°, no.')],
    ['A mayor lado, mayor ángulo',
      xpMira('dibujo', 'Segunda: en un triángulo, lados y ángulos **se ordenan igual**.', { dib: lam, v: { x: 120, hi: 0, lo: 0 }, alto: 200 }, [
        ['En este triángulo los tres lados son distintos. ¿Cómo quedan sus ángulos?', {}],
        ['El lado más largo tiene enfrente el ángulo más abierto.', { hi: 1 }],
        ['Y el lado más corto tiene enfrente el ángulo más cerrado.', { lo: 1 }],
        ['Si movemos el vértice cambian las medidas, pero la regla se mantiene.', { x: 230 }],
        ['Sirve en los dos sentidos. En un triángulo rectángulo, el lado mayor es la hipotenusa.', { x: 60 }],
      ], 'A mayor lado se opone mayor ángulo, y a mayor ángulo se opone mayor lado.'),
      xpHaz('fichas', 'En el triángulo PQR los lados miden 4, 6 y 9. Pon el ángulo **mayor** y el ángulo **menor**.', { slots: baja(fila('ángulo mayor', 'ángulo menor'), 158), fichas: ['∠P', '∠Q', '∠R'], meta: ['∠Q', '∠R'], alto: 198, fondo: K => pqr2(K), pista: 'Cada ángulo mira al lado que no lo toca.' }, 'Frente al lado de 9 (PR) está Q, el mayor; frente al de 4 (PQ) está R, el menor.')],
    ['¿Cierra? Y la bisagra',
      xpMira('dibujo', 'Tercera: tres segmentos **no siempre** cierran un triángulo.', { dib: vara, v: { m: 0, a: 7, b: 6, g: 40 }, alto: 200 }, [
        ['La base mide 10 y las varillas 7 y 6. ¿Alcanzan a tocarse?', {}],
        ['Juntas suman 13, más que 10: se tocan y cierran el triángulo.', {}, '$7 + 6 > 10$'],
        ['Con 4 y 5 suman 9: no llegan. No hay triángulo.', { a: 4, b: 5 }, '$4 + 5 < 10$'],
        ['Con 4 y 6 suman justo 10: quedan acostadas sobre la base. Tampoco hay triángulo.', { b: 6 }, '$4 + 6 = 10$'],
        ['La regla: cada lado debe ser menor que la suma de los otros dos.', { a: 7 }],
        ['Otra idea: dos varillas fijas, de 8 y 6, unidas por una bisagra abierta 40°.', { m: 1 }],
        ['Al abrirla más, el lado de enfrente crece. A mayor ángulo, mayor lado opuesto: es el teorema de la bisagra.', { g: 110 }],
      ], 'Cada lado es menor que la suma de los otros dos; y con dos lados fijos, a mayor ángulo, mayor tercer lado.'),
      xpHaz('dibujo', 'La base mide 10 y la varilla derecha 5. Con la izquierda en 3 no cierra: alárgala hasta el **menor** entero con el que sí cierra.', { dib: vara, v: { m: 0, a: 3, b: 5, g: 40 }, metas: { a: 6 }, alto: 232,
        manijas: [{ k: 'a', min: 1, max: 12, paso: 1, et: 'varilla izquierda' }], lee: v => `$${v.a} + 5 = ${v.a + 5}$`, dice: v => (v.a + 5 > 10 ? `${v.a} + 5 pasa de 10: cierra.` : v.a + 5 === 10 ? 'Suman justo 10: quedan acostadas.' : `${v.a} + 5 no llega a 10: no cierra.`) }, 'Con 5 apenas igualan a la base; con 6 ya la pasan: $6 + 5 > 10$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'De A a B hay 11 km en línea recta y de B a C, 6 km. Los tres pueblos no están en línea. Pon la **mayor** distancia entera posible de A a C.', { dib: pueblos, v: { n: 8 }, metas: { n: 16 }, alto: 232,
        manijas: [{ k: 'n', min: 1, max: 18, paso: 1, et: 'km de A a C' }], dice: v => (v.n > 5 && v.n < 17 ? `Con ${v.n} km el triángulo cierra.` : `Con ${v.n} km no hay triángulo.`) }, 'Debe ser menor que $11 + 6 = 17$: el mayor entero es 16.')],
  ], 'El exterior gana a los interiores lejanos; lados y ángulos se ordenan igual; cada lado es menor que la suma de los otros.');

  // ============================================================================================ 4 · L-A-A y triángulos rectángulos
  const VT = r => (r ? [[-24, -20], [26, 18], [-24, 18]] : [[-28, 20], [28, 20], [10, -22]]);
  const uno = (K, cx, cy, c, s, m) => {
    const V = VT(c.r).map(([x, y]) => [cx + m * x * s, cy + y * s]), S = [[V[1], V[2]], [V[2], V[0]], [V[0], V[1]]];
    return (c.a || []).map((j, k) => K.ang(V[j], V[(j + 1) % 3], V[(j + 2) % 3], 12 * s, '', ['fa', 'fg', 'ff'][k])).join('') + (c.r ? esc(K, V[2], V[0], V[1], 7 * s) : '') + K.p(V, 'fn') + (c.l || []).map((i, k) => K.l(...S[i][0], ...S[i][1], 'gr') + ray(K, S[i][0], S[i][1], k + 1, 'gr')).join('');
  };
  const LAA = [[{ l: [2], a: [0, 1] }, { l: [2], a: [0, 1] }, 1.5], [{ l: [0], a: [0, 1] }, { l: [0], a: [0, 1] }, 1.5], [{ l: [0], a: [0, 1] }, { l: [1], a: [0, 1] }, 1.5], [{ a: [0, 1, 2] }, { a: [0, 1, 2] }, 0.9]];
  const laa = (v, K) => { const q = R(v.m), [c1, c2, s2] = LAA[q] || LAA[0]; return uno(K, 96, 104, c1, 1.5, -1) + uno(K, 244, 104, c2, s2, 1) + K.t(170, 28, ['A-L-A', 'L-A-A', 'no vale: el lado no corresponde', 'A-A-A no es criterio'][q] || '', 'ta'); };
  const dosPares = K => uno(K, 52, 58, { l: [1], a: [0, 1] }, 0.95, -1) + uno(K, 124, 58, { l: [1], a: [0, 1] }, 0.95, 1) + uno(K, 222, 58, { a: [0, 1, 2] }, 1.05, -1) + uno(K, 294, 62, { a: [0, 1, 2] }, 0.7, 1) + K.l(170, 14, 170, 104, 'ls');
  const REC = [{ r: 1 }, { r: 1, l: [0, 1] }, { r: 1, l: [0], a: [1] }, { r: 1, l: [2], a: [0] }, { r: 1, l: [2, 0] }];
  const rect = (v, K) => { const q = R(v.m), c = REC[q] || REC[0]; return uno(K, 96, 108, c, 1.8, -1) + uno(K, 244, 108, c, 1.8, 1) + K.t(170, 28, ['', 'cateto y cateto', 'cateto y ángulo agudo', 'hipotenusa y ángulo agudo', 'hipotenusa y cateto'][q] || '', 'ta'); };
  const escaleras = (v, K) => {
    const u = 11, una = (x0, d, vivo) => { const F = [x0 + d * u, 170], T = [x0, 170 - Math.sqrt(Math.max(0, 169 - d * d)) * u]; return K.l(x0, 20, x0, 170) + K.l(x0, 170, x0 + 105, 170) + esc(K, [x0, 170], F, T) + K.l(...F, ...T, vivo ? 'la gr' : 'lg gr') + rot(K, mid(F, T), [x0, 170], '13', 's', 12) + K.t(x0 + d * u / 2, 187, r1(d), vivo ? 's ta' : 's tg'); };
    return una(60, 5, false) + una(220, v.d, true);
  };
  // Equidistar: la mediatriz y la bisectriz.
  const equi = (v, K) => {
    if (R(v.m) === 0) {
      const A = [70, 160], B = [270, 160], M = [170, 160], P = [170, 160 - v.h], d = R(dist(P, A) / 10);
      return K.f(v.t, K.p([P, M, A], 'fa') + K.p([P, M, B], 'fg')) + K.l(...A, ...B, 'gr') + K.l(170, 20, 170, 190, 'lm d') + esc(K, M, B, P) + ray(K, A, M) + ray(K, M, B) + K.l(...P, ...A, 'la') + K.l(...P, ...B, 'la') + K.c(...P, 4, 'fk')
        + K.t(58, 166, 'A', 's') + K.t(282, 166, 'B', 's') + K.t(182, 178, 'M', 's') + K.t(184, P[1] - 4, 'P', 's') + K.t(104, 152 - v.h / 2, d, 's ta') + K.t(236, 152 - v.h / 2, d, 's ta');
    }
    const O = [40, 176], P = K.at(...O, 110 + v.h, 30), M = [P[0], 176], N = K.at(...O, (110 + v.h) * Math.cos(rad(30)), 60), d = R((110 + v.h) / 20);
    return K.f(v.t, K.p([O, M, P], 'fa') + K.p([O, P, N], 'fg')) + K.l(...O, 320, 176) + K.l(...O, ...K.at(...O, 180, 60)) + K.l(...O, ...K.at(...O, 290, 30), 'lm d') + K.l(...P, ...M, 'la') + K.l(...P, ...N, 'la') + esc(K, M, O, P) + esc(K, N, O, P) + K.c(...P, 4, 'fk')
      + K.t(28, 182, 'O', 's') + K.t(P[0] + 12, P[1] - 4, 'P', 's') + K.t(P[0] + 12, (P[1] + 176) / 2 + 4, d, 's ta') + rot(K, mid(P, N), M, d, 's ta', 12);
  };
  const GO = [36, 184];
  const giraR = (v, K) => {
    const P = K.at(...GO, 130, v.t), M = [P[0], 184], N = K.at(...GO, 130 * Math.cos(rad(80 - v.t)), 80);
    return K.ang(GO, [300, 184], P, 40, `${R(v.t)}°`, 'fa', 's ta') + K.ang(GO, P, N, 30, `${R(80 - v.t)}°`, 'fg', 's tg') + K.l(...GO, 316, 184) + K.l(...GO, ...K.at(...GO, 170, 80)) + K.l(...GO, ...P, 'la gr') + K.l(...P, ...M, 'lf d') + K.l(...P, ...N, 'lf d') + esc(K, M, GO, P, 7) + esc(K, N, GO, P, 7) + K.t(P[0] + 12, P[1] - 2, 'P', 's');
  };
  const dG = v => [13 * Math.sin(rad(v.t)), 13 * Math.sin(rad(80 - v.t))].map(r1);
  const CA = [80, 165], CB = [240, 125];
  const parada = (v, K) => { const P = [v.x, 45]; return K.l(10, 45, 330, 45, 'gr') + K.l(...P, ...CA, 'la d') + K.l(...P, ...CB, 'lg d') + K.r(70, 155, 20, 20, 'fa') + K.r(230, 115, 20, 20, 'fg') + K.t(80, 192, 'A', 's') + K.t(240, 152, 'B', 's') + K.t(v.x, 34, 'P', 's ta'); };

  xpLec('euc-triangulo-4', [
    ['Un criterio más: L-A-A',
      xpMira('dibujo', 'Hay un cuarto criterio: **L-A-A**, lado, ángulo, ángulo.', { dib: laa, v: { m: 0 }, alto: 190 }, [
        ['Ya conocemos A-L-A: un lado y los dos ángulos pegados a él.', {}],
        ['¿Y si el lado marcado no está entre los dos ángulos? Eso es L-A-A: lado, ángulo y ángulo.', { m: 1 }],
        ['También asegura congruencia: dos ángulos y un lado opuesto a uno de ellos.', {}],
        ['Cuidado: el lado debe ser opuesto al mismo ángulo en los dos triángulos. Aquí no corresponde.', { m: 2 }],
        ['Y solo ángulos no basta: con A-A-A un triángulo puede ser la ampliación del otro.', { m: 3 }],
      ], 'L-A-A: dos ángulos y un lado opuesto a uno de ellos, en el mismo orden. A-A-A no es criterio.'),
      xpHaz('fichas', 'En cada par solo se sabe lo marcado. Pon el criterio que asegura la congruencia, o «ninguno».', { slots: [{ x: 88, y: 146, w: 92, et: 'par 1' }, { x: 258, y: 146, w: 92, et: 'par 2' }], fichas: ['L-A-A', 'A-L-A', 'ninguno', 'L-L-L'], meta: ['L-A-A', 'ninguno'], alto: 186, fondo: K => dosPares(K), pista: 'Mira si el lado marcado une los dos ángulos, y si hay algún lado.' }, 'Par 1: el lado queda fuera de los dos ángulos, L-A-A. Par 2: solo ángulos, ninguno.')],
    ['Con ángulo recto',
      xpMira('dibujo', 'Dos triángulos **rectángulos** ya comparten un dato: el ángulo recto.', { dib: rect, v: { m: 0 }, alto: 190 }, [
        ['Dos triángulos rectángulos ya tienen algo congruente: el ángulo recto. Solo faltan dos datos.', {}],
        ['Cateto y cateto: es L-A-L, con el ángulo recto en medio.', { m: 1 }],
        ['Cateto y un ángulo agudo: sale de A-L-A o de L-A-A.', { m: 2 }],
        ['Hipotenusa y un ángulo agudo: es L-A-A.', { m: 3 }],
        ['Hipotenusa y cateto: parece L-L-A, pero con ángulo recto sí funciona. Es el criterio H-C.', { m: 4 }],
      ], 'Triángulos rectángulos: cateto-cateto, cateto-ángulo, hipotenusa-ángulo e hipotenusa-cateto.'),
      xpHaz('dibujo', 'Las dos escaleras miden 13. La de la izquierda tiene el pie a 5 de la pared. Mueve el pie de la otra hasta que los triángulos sean congruentes por H-C.', { dib: escaleras, v: { d: 9 }, metas: { d: 5 }, alto: 200,
        manijas: [{ k: 'd', min: 2, max: 9, paso: 1, en: v => [220 + v.d * 11, 170], de: x => (x - 220) / 11 }], dice: v => `Hipotenusa 13 y cateto del piso ${v.d}.` }, 'Misma hipotenusa y mismo cateto: por H-C, las dos escaleras llegan a la misma altura.')],
    ['Equidistar',
      xpMira('dibujo', 'Dos consecuencias: la **mediatriz** y la **bisectriz** reparten distancias iguales.', { dib: equi, v: { m: 0, h: 90, t: 0 }, alto: 200 }, [
        ['La mediatriz de AB es la perpendicular por su punto medio M. Tomemos un punto P en ella.', {}],
        ['Los triángulos PMA y PMB son congruentes por cateto-cateto: PM es común y AM mide lo mismo que MB.', { t: 1 }],
        ['Entonces PA y PB miden lo mismo. Pasa con cualquier punto de la mediatriz.', { h: 40, t: 0 }],
        ['Ahora un ángulo y su bisectriz. Desde un punto P bajamos perpendiculares a los dos lados.', { m: 1, h: 90 }],
        ['Los dos triángulos son congruentes por hipotenusa-ángulo: P queda a igual distancia de los dos lados.', { t: 1 }],
      ], 'Todo punto de la mediatriz equidista de los extremos; todo punto de la bisectriz equidista de los lados.'),
      xpHaz('dibujo', 'El ángulo mide 80°. Gira el rayo hasta que P quede a la **misma distancia** de los dos lados.', { dib: giraR, v: { t: 15 }, metas: { t: 40 }, alto: 204,
        manijas: [{ k: 't', min: 10, max: 70, paso: 5, en: v => XPK.at(...GO, 130, v.t), de: (x, y) => Math.atan2(GO[1] - y, x - GO[0]) * 180 / Math.PI }], lee: v => `$${v.t}^\\circ + ${80 - v.t}^\\circ = 80^\\circ$`, dice: v => `P está a ${dG(v)[0]} de un lado y a ${dG(v)[1]} del otro.` }, 'P equidista de los lados cuando el rayo es la bisectriz: 40° a cada lado.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos casas, A y B, quedan al mismo lado de una carretera recta. Mueve la parada P por la carretera hasta que quede a igual distancia de las dos.', { dib: parada, v: { x: 230 }, metas: { x: 135 }, alto: 200,
        manijas: [{ k: 'x', min: 40, max: 300, paso: 5, en: v => [v.x, 45], de: x => x }], dice: v => `A la casa A hay ${r1(dist([v.x, 45], CA) / 10)} y a la casa B hay ${r1(dist([v.x, 45], CB) / 10)}.` }, 'La parada va donde la mediatriz del segmento AB corta la carretera: allí PA = PB.')],
  ], 'L-A-A y los criterios de triángulos rectángulos; mediatriz y bisectriz: puntos que equidistan.');
}
;
//#archivo js/explora-euc-4.js
// Geometría Euclidiana · mundo 4 «Paralelas y Cuadriláteros» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const rd = g => g * Math.PI / 180, R = Math.round, n1 = x => R(x * 10) / 10;
  const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], hip = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const esc = (K, V, P, Q, s = 9) => { const a = hip(V, P), b = hip(V, Q); if (a < 1 || b < 1) return ''; const u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s]; return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm'); };
  const marca = (K, P, Q, cls = 'lg') => { const m = mid(P, Q), d = hip(P, Q) || 1, u = [(Q[1] - P[1]) / d * 6, -(Q[0] - P[0]) / d * 6]; return K.l(m[0] - u[0], m[1] - u[1], m[0] + u[0], m[1] + u[1], cls); };

  // ------------------------------------------------------------------------------------------- 1 · paralelas y perpendiculares
  // Un punto P, una recta r y un camino de P a la recta.
  const perp = (v, K) => {
    const P = [170, 40], F = [170 + v.x, 170];
    return K.l(20, 170, 320, 170, 'gr') + K.t(312, 188, 'r', 'tm') + K.f(v.esc ?? 0, K.l(...P, 170, 170, 'lo d') + K.pl([[180, 170], [180, 160], [170, 160]], 'lm'))
      + K.l(...P, ...F, 'la gr') + K.c(...P, 5, 'fk') + K.t(186, 38, 'P', 's') + K.f(v.ver ?? 0, K.t((P[0] + F[0]) / 2 + 14, 112, `${n1(Math.hypot(v.x / 20, 6.5))}`, 's ta', 'start'));
  };
  // La recta r y otra que gira alrededor de P.
  const CR = [170, 160], PP = [150, 80];
  const pie = X => { const u = [Math.cos(rd(15)), -Math.sin(rd(15))], k = (X[0] - CR[0]) * u[0] + (X[1] - CR[1]) * u[1]; return [CR[0] + k * u[0], CR[1] + k * u[1]]; };
  const par = (v, K) => {
    const a = K.at(...CR, -140, 15), b = K.at(...CR, 140, 15), s1 = K.at(...PP, -120, v.a), s2 = K.at(...PP, 100, v.a), S = K.at(...PP, 80, v.a);
    return K.l(...a, ...b, 'gr') + K.t(b[0] + 4, b[1] - 10, 'r', 'tm') + K.l(...s1, ...s2, 'la gr') + K.c(...PP, 5, 'fk') + K.t(PP[0] - 6, PP[1] - 12, 'P', 's')
      + K.f(v.eq ?? 0, [PP, S].map(X => K.l(...X, ...pie(X), 'lf d') + K.t(X[0] + 8, (X[1] + pie(X)[1]) / 2 + 8, `${n1(hip(X, pie(X)) / 10)}`, 's tf', 'start')).join(''));
  };
  // Una recta t, su perpendicular a, otra recta b que gira y una tercera c.
  const BB = [210, 170];
  const tres = (v, K) => {
    const T = K.at(...BB, 125, v.b), D = K.at(...BB, -16, v.b);
    return K.l(20, 170, 320, 170, 'gr') + K.t(20, 188, 't', 'tm') + K.l(90, 186, 90, 40, 'la gr') + K.pl([[99, 170], [99, 161], [90, 161]], 'lm') + K.t(78, 50, 'a', 's ta')
      + K.ang(BB, [260, 170], T, 22, `${R(v.b)}°`, 'fg', 'tg') + K.l(...D, ...T, 'lg gr') + K.t(T[0] + 12, T[1] + 10, 'b', 's tg')
      + K.f(v.c ?? 0, K.l(290, 186, 290, 40, 'lf gr') + K.t(302, 50, 'c', 's tf')) + K.f(v.m ?? 0, K.t(150, 26, 'a ∥ b', 'to'));
  };
  const orilla = (v, K) => {
    const P = [60, 80], F = [280, 80 + v.y];
    return K.r(280, 14, 50, 180, 'fg') + K.l(280, 14, 280, 194, 'gr') + K.l(...P, ...F, 'la gr') + K.c(...P, 6, 'fk') + K.t(60, 64, 'bote', 's') + K.t(170, (80 + F[1]) / 2 - 10, `${n1(Math.hypot(11, v.y / 20))}`, 's ta');
  };

  xpLec('euc-cuadrilateros-1', [
    ['La perpendicular y la distancia',
      xpMira('dibujo', 'Primero: de un punto a una recta hay muchos caminos, pero uno solo es **el más corto**.', { dib: perp, v: { x: 100, esc: 0, ver: 0 }, alto: 200 }, [
        ['Un punto P y una recta r. De P a la recta se puede bajar por muchos caminos.', {}],
        ['Este llega inclinado: es un segmento oblicuo.', { ver: 1 }],
        ['Si corremos el pie, el camino se acorta.', { x: 40 }],
        ['El más corto cae a escuadra: es el segmento perpendicular. Por P solo pasa una perpendicular a r.', { x: 0, esc: 1 }],
        ['Su medida es la distancia de P a la recta. Cualquier oblicua mide más.', {}, '$6.5 < 6.8 < 8.2$'],
      ], 'Por un punto pasa una sola perpendicular a una recta, y es el camino más corto: la distancia.'),
      xpHaz('dibujo', 'Corre el pie del segmento hasta que mida lo menos posible.', { dib: perp, v: { x: -80, esc: 0, ver: 1 }, metas: { x: 0 }, alto: 200,
        manijas: [{ k: 'x', min: -120, max: 120, paso: 20, en: v => [170 + v.x, 170], de: x => x - 170 }],
        lee: v => `$${n1(Math.hypot(v.x / 20, 6.5))}$`, dice: v => `El segmento mide ${n1(Math.hypot(v.x / 20, 6.5))}. Busca el más corto.` }, 'El más corto es el perpendicular: mide 6.5, la distancia de P a la recta.')],
    ['Rectas paralelas',
      xpMira('dibujo', 'Segundo: rectas que **nunca se cortan**.', { dib: par, v: { a: 15, eq: 0 }, alto: 210 }, [
        ['Dos rectas de un plano que no se cortan, por más que se prolonguen, son paralelas.', {}],
        ['Giremos la recta que pasa por P. Así inclinada, termina cortando a r.', { a: 40 }],
        ['Al devolverla, el corte se aleja cada vez más.', { a: 22 }],
        ['Hasta que deja de cortarla: quedó paralela. Solo ocurre en esa posición.', { a: 15 }],
        ['Es el postulado de las paralelas: por un punto exterior a una recta pasa una sola paralela.', {}],
        ['Y dos paralelas guardan la misma distancia en todos sus puntos.', { eq: 1 }, '$8.2 = 8.2$'],
      ], 'Por un punto exterior a una recta pasa una sola paralela a ella, y las paralelas equidistan.'),
      xpHaz('dibujo', 'Gira la recta que pasa por P hasta que las dos distancias a r sean iguales.', { dib: par, v: { a: 35, eq: 1 }, metas: { a: 15 }, alto: 210,
        manijas: [{ k: 'a', min: -15, max: 45, paso: 5, en: v => XPK.at(...PP, 100, v.a), de: (x, y) => Math.atan2(PP[1] - y, x - PP[0]) * 180 / Math.PI }],
        lee: v => { const S = XPK.at(...PP, 80, v.a); return `$${n1(hip(PP, pie(PP)) / 10)}$ y $${n1(hip(S, pie(S)) / 10)}$`; }, dice: v => (v.a > 15 ? 'Las rectas se acercan hacia la izquierda: allá se cortan.' : 'Las rectas se acercan hacia la derecha: allá se cortan.') }, 'Con distancias iguales las rectas no se acercan: son paralelas.')],
    ['Perpendiculares y paralelas, juntas',
      xpMira('dibujo', 'Tercero: cómo **saber** que dos rectas son paralelas sin prolongarlas.', { dib: tres, v: { b: 70, c: 0, m: 0 }, alto: 200 }, [
        ['La recta a es perpendicular a t. Otra recta, b, cruza a t inclinada.', {}],
        ['Así, b y la recta a terminarían cortándose arriba.', { b: 78 }],
        ['Si b también es perpendicular a t, ya no se cortan.', { b: 90 }],
        ['Dos rectas perpendiculares a una misma recta son paralelas entre sí.', { m: 1 }],
        ['Y si una recta c es paralela a b, también es paralela a la recta a.', { c: 1 }],
        ['Además t, perpendicular a b, resulta perpendicular a su paralela c.', {}],
      ], 'Dos perpendiculares a una misma recta son paralelas; dos paralelas a una tercera, también.'),
      xpHaz('dibujo', 'El poste a está a escuadra con el piso. Endereza el poste b hasta que quede paralelo al poste a.', { dib: tres, v: { b: 65, c: 0, m: 0 }, metas: { b: 90 }, alto: 200,
        manijas: [{ k: 'b', min: 60, max: 120, paso: 5, en: v => XPK.at(...BB, 125, v.b), de: (x, y) => Math.atan2(BB[1] - y, x - BB[0]) * 180 / Math.PI }],
        lee: v => `$${v.b}^\\circ$`, dice: v => `El poste b forma ${v.b}° con el piso; el poste a, 90°.` }, 'Si los dos son perpendiculares al piso, son paralelos entre sí.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un bote quiere llegar a la orilla recta por el camino más corto. Lleva el punto de llegada a su lugar.', { dib: orilla, v: { y: 80 }, metas: { y: 0 }, alto: 208,
        manijas: [{ k: 'y', min: -60, max: 100, paso: 20, en: v => [280, 80 + v.y], de: (x, y) => y - 80 }],
        lee: v => `$${n1(Math.hypot(11, v.y / 20))}$`, dice: v => `Por ahí el bote recorre ${n1(Math.hypot(11, v.y / 20))}.` }, 'El camino más corto a la orilla es el perpendicular: 11, la distancia del bote a la orilla.')],
  ], 'Una sola perpendicular y una sola paralela por cada punto; la distancia se mide a escuadra.');

  // ------------------------------------------------------------------------------------------- 2 · ángulos entre paralelas y en polígonos
  const Y1 = 62, Y2 = 152;
  const cruces = (v, K) => {
    const t = Math.tan(rd(v.a)), X = y => 170 + (107 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], n = R(v.a), d = (W, s) => [W[0] + s * 100, W[1]], up = [X(Y1 - 40), Y1 - 40], dn = [X(Y2 + 40), Y2 + 40];
    return K.f(v.cor ?? 0, K.ang(P, d(P, 1), up, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.alt ?? 0, K.ang(P, d(P, -1), Q, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.ext ?? 0, K.ang(P, d(P, 1), up, 26, `${n}°`, 'ff', 'tf') + K.ang(Q, d(Q, -1), dn, 26, `${n}°`, 'ff', 'tf'))
      + K.f(v.col ?? 0, K.ang(P, d(P, 1), Q, 26, v.oc ? '?' : `${180 - n}°`, 'fg', 'tg') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.l(20, Y1, 320, Y1) + K.l(20, Y2, 320, Y2) + K.l(...up, ...dn, 'la gr');
  };
  // Recíprocos: la recta de abajo gira; ¿son paralelas?
  const TT = 70, XT = y => 170 + (105 - y) / Math.tan(rd(TT)), PT = [XT(60), 60], QT = [XT(150), 150];
  const gira = (v, K) => {
    const col = (v.col ?? 0) > 0.5, a = XPK.at(...QT, -130, v.b), b = XPK.at(...QT, 130, v.b);
    return (col ? K.ang(PT, [PT[0] + 100, 60], QT, 24, `${180 - TT}°`, 'fa', 'ta') : K.ang(PT, [PT[0] - 100, 60], QT, 24, `${TT}°`, 'fa', 'ta')) + K.ang(QT, b, PT, 24, `${R(TT - v.b)}°`, 'fg', 'tg')
      + K.l(30, 60, 310, 60) + K.l(...a, ...b, 'la gr') + K.l(XT(22), 22, XT(188), 188) + K.t(40, 50, 'ℓ₁', 's tm') + K.t(a[0] + 10, a[1] + 18, 'ℓ₂', 's tm') + K.f(v.par ?? 0, K.t(262, 110, 'ℓ₁ ∥ ℓ₂', 'to'));
  };
  const TX = v => { const A = [85, 170], B = [255, 170], ta = Math.tan(rd(v.a)), tb = Math.tan(rd(v.b)), x = 170 * tb / (ta + tb); return [A, B, [85 + x, 170 - x * ta]]; };
  const tri = (v, K) => {
    const [A, B, C] = TX(v), a = R(v.a), b = R(v.b), L = [C[0] - 110, C[1]], D = [C[0] + 110, C[1]];
    return K.ang(A, B, C, 32, `${a}°`, 'fa', 'ta') + K.ang(B, C, A, 32, `${b}°`, 'fg', 'tg') + K.ang(C, A, B, 26, `${180 - a - b}°`, 'ff', 'tf')
      + K.f(v.une ?? 0, K.l(Math.max(6, L[0]), L[1], Math.min(334, D[0]), D[1], 'lm d') + K.ang(C, L, A, 20, '', 'fa') + K.ang(C, B, D, 20, '', 'fg'))
      + K.f(v.ext ?? 0, K.l(B[0], B[1], 330, 170, 'lm') + K.ang(B, [330, 170], C, 24, `${180 - b}°`, 'fo', 'to')) + K.pl([A, B, C, A]);
  };
  const pol = (v, K) => {
    const n = R(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 100, 88, 90 + i * 360 / n));
    let h = '';
    for (let i = 1; i < n - 1; i++) h += K.p([P[0], P[i], P[i + 1]], ['fa', 'fg', 'ff', 'fo'][i % 4]);
    return h + K.p(P, 'fn') + K.t(46, 190, `${n} lados`, 'tm');
  };

  xpLec('euc-cuadrilateros-2', [
    ['Los pares de ángulos',
      xpMira('dibujo', 'Una recta que corta a otras dos forma ocho ángulos. Aprendamos a **nombrarlos por parejas**.', { dib: cruces, v: { a: 60, cor: 0, alt: 0, ext: 0, col: 0 }, alto: 210 }, [
        ['Dos rectas paralelas y una transversal. Entre las paralelas están los ángulos internos; fuera, los externos.', {}],
        ['Correspondientes: en la misma esquina de cada cruce. Entre paralelas son congruentes.', { cor: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Alternos internos: adentro y a lados distintos de la transversal. También congruentes.', { cor: 0, alt: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Alternos externos: afuera y a lados distintos. Congruentes otra vez.', { alt: 0, ext: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Colaterales interiores: adentro y del mismo lado. Esos no son congruentes: son suplementarios.', { ext: 0, col: 1 }, '$120^\\circ + 60^\\circ = 180^\\circ$'],
        ['Si la transversal se inclina cambian las medidas, no las relaciones.', { a: 75 }, '$105^\\circ + 75^\\circ = 180^\\circ$'],
      ], 'Entre paralelas: alternos y correspondientes, congruentes; colaterales, suplementarios.'),
      xpHaz('dibujo', 'Inclina la transversal hasta que el colateral oculto mida 130°.', { dib: cruces, v: { a: 80, cor: 0, alt: 0, ext: 0, col: 1, oc: 1 }, metas: { a: 50 }, alto: 210,
        manijas: [{ k: 'a', min: 40, max: 140, paso: 5, en: v => [170 + 85 / Math.tan(rd(v.a)), 22], de: x => Math.atan2(85, x - 170) * 180 / Math.PI }],
        lee: v => `$? + ${v.a}^\\circ = 180^\\circ$`, dice: v => `El de abajo mide ${v.a}°. El oculto es su colateral interior.` }, 'Los colaterales son suplementarios: $180^\\circ - 130^\\circ = 50^\\circ$.')],
    ['Al revés: probar que son paralelas',
      xpMira('dibujo', 'Hasta aquí sabíamos que eran paralelas. Ahora al revés: **los ángulos lo deciden**.', { dib: gira, v: { b: 12, col: 0, par: 0 }, alto: 210 }, [
        ['Dos rectas y una transversal. No sabemos si son paralelas.', {}],
        ['Medimos dos alternos internos: 70° y 58°. No son congruentes.', {}, '$70^\\circ \\ne 58^\\circ$'],
        ['Entonces las rectas se acercan de un lado: en algún punto se cortan.', {}],
        ['Si los alternos internos son congruentes, las rectas tienen que ser paralelas.', { b: 0, par: 1 }, '$70^\\circ = 70^\\circ$'],
        ['Con colaterales también se puede: si son suplementarios, las rectas son paralelas.', { col: 1 }, '$110^\\circ + 70^\\circ = 180^\\circ$'],
        ['Lo mismo con correspondientes o alternos externos congruentes: cada teorema tiene su recíproco.', {}],
      ], 'Alternos o correspondientes congruentes, o colaterales suplementarios: las rectas son paralelas.'),
      xpHaz('dibujo', 'Gira la recta de abajo hasta que los alternos internos sean congruentes.', { dib: gira, v: { b: 15, col: 0, par: 0 }, metas: { b: 0 }, alto: 210,
        manijas: [{ k: 'b', min: -20, max: 20, paso: 5, en: v => XPK.at(...QT, 120, v.b), de: (x, y) => Math.atan2(QT[1] - y, x - QT[0]) * 180 / Math.PI }],
        lee: v => `$70^\\circ$ y $${70 - v.b}^\\circ$`, dice: v => `Los alternos internos miden 70° y ${70 - v.b}°.` }, 'Con alternos internos congruentes, las dos rectas quedan paralelas.')],
    ['Triángulos y polígonos',
      xpMira('dibujo', 'Con las paralelas se demuestra cuánto suman los ángulos de un **triángulo** y de cualquier **polígono**.', { dib: (v, K) => (v.cual < 0.5 ? tri(v, K) : pol(v, K)), v: { cual: 0, a: 50, b: 60, une: 0, ext: 0, n: 5 }, alto: 200 }, [
        ['Por un vértice trazamos la paralela al lado opuesto.', { une: 1 }],
        ['Los ángulos de la base reaparecen arriba como alternos internos: los tres llenan un ángulo llano.', {}, '$50^\\circ + 70^\\circ + 60^\\circ = 180^\\circ$'],
        ['Al prolongar un lado nace un ángulo exterior: mide la suma de los dos interiores no adyacentes.', { une: 0, ext: 1 }, '$50^\\circ + 70^\\circ = 120^\\circ$'],
        ['Un polígono se parte en triángulos desde un vértice: salen dos menos que lados.', { cual: 1 }, '$3 \\cdot 180^\\circ = 540^\\circ$'],
        ['Por eso sus ángulos interiores suman (n − 2) veces 180°.', { n: 6 }, '$(6 - 2) \\cdot 180^\\circ = 720^\\circ$'],
        ['Y los exteriores, uno por vértice, suman siempre una vuelta completa.', {}, '$360^\\circ$'],
      ], 'Triángulo: 180°, y el exterior suma los dos no adyacentes. Polígono: $(n - 2) \\cdot 180^\\circ$; exteriores, 360°.'),
      xpHaz('dibujo', 'Arrastra el número de lados hasta que los ángulos interiores sumen 900°.', { dib: pol, v: { n: 4 }, metas: { n: 7 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 10, paso: 1 }],
        lee: v => `$${v.n - 2} \\cdot 180^\\circ = ${(v.n - 2) * 180}^\\circ$`, dice: v => `${v.n} lados: ${v.n - 2} ${v.n === 3 ? 'triángulo' : 'triángulos'}.` }, 'Cinco triángulos dan $5 \\cdot 180^\\circ = 900^\\circ$: el polígono tiene 7 lados.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos rieles y un travesaño: los ángulos marcados son colaterales interiores. Gira el riel de abajo hasta que los rieles queden paralelos.', { dib: gira, v: { b: -15, col: 1, par: 0 }, metas: { b: 0 }, alto: 210,
        manijas: [{ k: 'b', min: -20, max: 20, paso: 5, en: v => XPK.at(...QT, 120, v.b), de: (x, y) => Math.atan2(QT[1] - y, x - QT[0]) * 180 / Math.PI }],
        lee: v => `$110^\\circ + ${70 - v.b}^\\circ = ${180 - v.b}^\\circ$`, dice: v => `Los colaterales suman ${180 - v.b}°.` }, 'Colaterales suplementarios: $110^\\circ + 70^\\circ = 180^\\circ$, y los rieles son paralelos.')],
  ], 'Los ángulos nombran, miden y también prueban: dicen cuándo dos rectas son paralelas y cuánto suma un polígono.');

  // ------------------------------------------------------------------------------------------- 3 · paralelogramos y trapecios
  const A3 = [70, 170], B3 = [230, 170];
  const plg = (v, K) => {
    const D = K.at(...A3, 100, v.a), C = K.at(...B3, 100, v.a), a = R(v.a), c = mid(A3, C);
    return K.p([A3, B3, C, D], 'fn') + K.f(v.angs ?? 0, K.ang(A3, B3, D, 30, `${a}°`, 'fa', 'ta') + K.ang(B3, A3, C, 24, v.oc ? '?' : `${180 - a}°`, 'fg', 'tg') + (v.oc ? '' : K.ang(C, B3, D, 24, '', 'fa') + K.ang(D, A3, C, 20, '', 'fg')))
      + K.f(v.diag ?? 0, K.l(...A3, ...C, 'lf d') + K.l(...B3, ...D, 'lo d') + K.c(...c, 4, 'fk')) + K.pl([A3, B3, C, D, A3], 'gr')
      + K.f(v.lados ?? 0, marca(K, A3, B3) + marca(K, D, C) + marca(K, A3, D, 'lf') + marca(K, B3, C, 'lf'));
  };
  // Paralelogramo de base 120 y lado l, con sus diagonales.
  const A4 = [80, 176], B4 = [200, 176];
  const esp = (v, K) => {
    const D = K.at(...A4, v.l, v.a), C = K.at(...B4, v.l, v.a), c = mid(A4, C);
    return K.p([A4, B4, C, D], 'fn') + K.pl([A4, B4, C, D, A4], 'gr') + (Math.abs(v.a - 90) < 0.5 ? esc(K, A4, B4, D) : '')
      + K.f(v.diag ?? 0, K.l(...A4, ...C, 'la gr') + K.l(...B4, ...D, 'lf gr') + (Math.abs(v.l - 120) < 0.5 ? esc(K, c, C, B4, 7) : '') + K.t(170, 24, `diagonales: ${n1(hip(A4, C) / 20)} y ${n1(hip(B4, D) / 20)}`, 's'));
  };
  const trap = (v, K) => {
    const A = [50, 170], B = [290, 170], D = [50 + v.dx, 70], C = [50 + v.dx + v.w, 70];
    return K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], 'gr') + K.l(...A, ...B, 'la gr') + K.l(...D, ...C, 'la gr')
      + K.f(v.iso ?? 0, K.l(...A, ...C, 'lf d') + K.l(...B, ...D, 'lf d') + marca(K, A, D) + marca(K, B, C))
      + K.f(v.ver ?? 0, K.t(30, 110, `${n1(hip(A, D) / 20)}`, 's tg') + K.t(312, 110, `${n1(hip(B, C) / 20)}`, 's tg'));
  };

  xpLec('euc-cuadrilateros-3', [
    ['El paralelogramo',
      xpMira('dibujo', 'Un cuadrilátero con los lados opuestos **paralelos** trae varias propiedades de regalo.', { dib: plg, v: { a: 65, lados: 0, angs: 0, diag: 0 }, alto: 200 }, [
        ['Un cuadrilátero con sus dos pares de lados opuestos paralelos es un paralelogramo.', {}],
        ['Una diagonal lo parte en dos triángulos congruentes: por eso los lados opuestos son congruentes.', { lados: 1 }],
        ['Los ángulos opuestos también son congruentes, y dos consecutivos son suplementarios.', { angs: 1 }, '$65^\\circ + 115^\\circ = 180^\\circ$'],
        ['Las dos diagonales se cortan en el punto medio de ambas: se bisecan.', { diag: 1 }],
        ['Si se inclina, las medidas cambian, pero todas esas propiedades siguen.', { a: 105 }, '$105^\\circ + 75^\\circ = 180^\\circ$'],
      ], 'Paralelogramo: lados y ángulos opuestos congruentes, consecutivos suplementarios, diagonales que se bisecan.'),
      xpHaz('dibujo', 'Inclina el paralelogramo hasta que el ángulo oculto, consecutivo del que ves, mida 105°.', { dib: plg, v: { a: 60, lados: 0, angs: 1, diag: 0, oc: 1 }, metas: { a: 75 }, alto: 200,
        manijas: [{ k: 'a', min: 50, max: 120, paso: 5, en: v => XPK.at(...A3, 100, v.a), de: (x, y) => Math.atan2(A3[1] - y, x - A3[0]) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ? = 180^\\circ$`, dice: v => `El ángulo en A mide ${v.a}°; su consecutivo lo completa a 180°.` }, 'Consecutivos suplementarios: $180^\\circ - 105^\\circ = 75^\\circ$.')],
    ['Rectángulo, rombo y cuadrado',
      xpMira('dibujo', 'Tres paralelogramos especiales, y cada uno se reconoce por sus **diagonales**.', { dib: esp, v: { a: 65, l: 80, diag: 0 }, alto: 200 }, [
        ['Si un paralelogramo tiene un ángulo recto, los tiene todos: es un rectángulo.', { a: 90 }],
        ['En el rectángulo las diagonales son congruentes.', { diag: 1 }, '$7.2 = 7.2$'],
        ['Si en cambio los cuatro lados son congruentes, es un rombo.', { a: 60, l: 120 }],
        ['En el rombo las diagonales son perpendiculares y bisecan los ángulos.', {}],
        ['Con ángulos rectos y lados congruentes a la vez, es un cuadrado: sus diagonales cumplen todo.', { a: 90 }, '$8.5 = 8.5$'],
      ], 'Rectángulo: diagonales congruentes. Rombo: perpendiculares y bisectrices. Cuadrado: las dos cosas.'),
      xpHaz('dibujo', 'Endereza el paralelogramo hasta que sus dos diagonales midan lo mismo.', { dib: esp, v: { a: 60, l: 80, diag: 1 }, metas: { a: 90 }, alto: 200,
        manijas: [{ k: 'a', min: 50, max: 130, paso: 10, en: v => XPK.at(...A4, 80, v.a), de: (x, y) => Math.atan2(A4[1] - y, x - A4[0]) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ$`, dice: v => (v.a === 90 ? 'Diagonales congruentes.' : 'Una diagonal quedó más larga que la otra.') }, 'Un paralelogramo con diagonales congruentes es un rectángulo.')],
    ['Trapecios, y cómo reconocer un paralelogramo',
      xpMira('dibujo', 'Con un solo par de lados paralelos la figura es un **trapecio**.', { dib: trap, v: { dx: 20, w: 120, iso: 0, ver: 0 }, alto: 200 }, [
        ['Un trapecio tiene un solo par de lados paralelos: sus bases.', {}],
        ['Si los lados no paralelos son congruentes, el trapecio es isósceles.', { dx: 60, ver: 1 }, '$5.8 = 5.8$'],
        ['En el isósceles, los ángulos de cada base y las diagonales son congruentes.', { iso: 1 }],
        ['Si la base de arriba crece hasta igualar a la de abajo, los otros lados quedan paralelos.', { iso: 0, w: 240, dx: 40 }],
        ['Un par de lados opuestos paralelos y congruentes basta: ya es un paralelogramo.', {}],
        ['También basta con lados opuestos congruentes, ángulos opuestos congruentes o diagonales que se bisecan.', {}],
      ], 'Trapecio: un solo par de lados paralelos. Un par paralelo y congruente ya da un paralelogramo.'),
      xpHaz('dibujo', 'Corre la base de arriba hasta que el trapecio sea isósceles.', { dib: trap, v: { dx: 20, w: 120, iso: 0, ver: 1 }, metas: { dx: 60 }, alto: 200,
        manijas: [{ k: 'dx', min: 0, max: 120, paso: 10, en: v => [50 + v.dx, 70], de: x => x - 50 }],
        lee: v => `$${n1(Math.hypot(v.dx, 100) / 20)}$ y $${n1(Math.hypot(120 - v.dx, 100) / 20)}$`, dice: v => `Los lados no paralelos miden ${n1(Math.hypot(v.dx, 100) / 20)} y ${n1(Math.hypot(120 - v.dx, 100) / 20)}.` }, 'Lados no paralelos congruentes: el trapecio es isósceles.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una reja plegable forma un paralelogramo. Ábrela hasta que el ángulo oculto mida el doble del que ves.', { dib: plg, v: { a: 85, lados: 0, angs: 1, diag: 0, oc: 1 }, metas: { a: 60 }, alto: 200,
        manijas: [{ k: 'a', min: 50, max: 120, paso: 5, en: v => XPK.at(...A3, 100, v.a), de: (x, y) => Math.atan2(A3[1] - y, x - A3[0]) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `Mide ${v.a}° y su consecutivo ${180 - v.a}°.` }, 'Consecutivos suplementarios: $x + 2x = 180^\\circ$, así que miden 60° y 120°.')],
  ], 'El paralelogramo y sus casos especiales se reconocen por lados, ángulos y, sobre todo, diagonales.');

  // ------------------------------------------------------------------------------------------- 4 · rectas y puntos notables
  const media = (v, K) => {
    if (v.cual < 0.5) {
      const A = [40, 180], B = [300, 180], C = [120, 30], M = mid(A, C), N = mid(B, C);
      return K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'gr') + K.c(...M, 4, 'fk') + K.c(...N, 4, 'fk') + marca(K, A, M) + marca(K, M, C) + marca(K, B, N, 'lf') + marca(K, N, C, 'lf')
        + K.f(v.seg ?? 0, K.l(...M, ...N, 'la gr')) + K.f(v.len ?? 0, K.t(170, 196, '20', 's') + K.t(150, 96, '10', 's ta'));
    }
    const u = 260 / 14, A = [40, 180], B = [300, 180], D = [90, 60], C = [90 + v.b * u, 60], M = mid(A, D), N = mid(B, C);
    return K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], 'gr') + K.c(...M, 4, 'fk') + K.c(...N, 4, 'fk') + K.l(...M, ...N, 'la gr')
      + K.t(170, 196, '14', 's') + K.t((D[0] + C[0]) / 2, 50, `${R(v.b)}`, 's') + K.t((M[0] + N[0]) / 2, 110, v.oc ? '?' : `${n1((14 + v.b) / 2)}`, 's ta');
  };
  // Triángulo rectángulo de hipotenusa 12.
  const TP = v => [60 + 11 * Math.sqrt(Math.max(0, 144 - v.h * v.h)), 180 - 11 * v.h];
  const rect = (v, K) => {
    const A = [60, 180], T = TP(v), F = [T[0], 180], m = mid(A, T), g = Math.asin(Math.min(1, v.h / 12)) * 180 / Math.PI;
    return K.l(30, 180, 320, 180, 'lm') + K.f(v.eq ?? 0, K.pl([T, [2 * T[0] - 60, 180], F], 'lm d')) + K.f(v.circ ?? 0, K.arc(m[0], m[1], 66, 0, 360, 'lo d'))
      + K.p([A, F, T], 'fn') + K.ang(A, F, T, 30, `${n1(g)}°`, 'fa', 'ta') + esc(K, F, A, T) + K.l(...A, ...T, 'la gr') + K.l(...T, ...F, 'lf gr') + K.l(...A, ...F, 'gr')
      + K.f(v.med ?? 0, K.l(...F, ...m, 'lo gr') + K.c(...m, 4, 'fk')) + K.t(m[0] - 14, m[1] - 10, '12', 's ta', 'end') + K.t(T[0] + 12, (T[1] + 180) / 2 + 4, `${n1(v.h)}`, 's tf', 'start');
  };
  const TA = [50, 180], TB = [290, 180], TC = [130, 40];
  const NOT = (() => {
    const a = hip(TB, TC), b = hip(TA, TC), c = hip(TA, TB), y = (120 * 120 + 180 * 180 - 40 * 40 - 40 * 40) / 280, O = [170, y];
    return { G: [(TA[0] + TB[0] + TC[0]) / 3, (TA[1] + TB[1] + TC[1]) / 3], O, I: [(a * TA[0] + b * TB[0] + c * TC[0]) / (a + b + c), (a * TA[1] + b * TB[1] + c * TC[1]) / (a + b + c)], H: [TA[0] + TB[0] + TC[0] - 2 * O[0], TA[1] + TB[1] + TC[1] - 2 * O[1]] };
  })();
  const piel = (X, P, Q) => { const k = ((X[0] - P[0]) * (Q[0] - P[0]) + (X[1] - P[1]) * (Q[1] - P[1])) / hip(P, Q) ** 2; return [P[0] + k * (Q[0] - P[0]), P[1] + k * (Q[1] - P[1])]; };
  const notables = (v, K) => {
    const V = [TA, TB, TC], L = [[TB, TC], [TA, TC], [TA, TB]], es = k => (Math.abs(v.cual - k) < 0.5 ? 1 : 0), pt = (X, t) => K.c(...X, 5, 'fk') + K.t(X[0] + 14, X[1] - 8, t, 's ta');
    return K.p(V, 'fn') + K.pl([...V, TA], 'gr')
      + K.f(es(0), V.map((X, i) => K.l(...X, ...mid(...L[i]), 'la')).join('') + pt(NOT.G, 'G'))
      + K.f(es(1), L.map(([P, Q]) => K.l(...mid(P, Q), ...NOT.O, 'lg') + esc(K, mid(P, Q), P, NOT.O, 7)).join('') + V.map(X => K.l(...NOT.O, ...X, 'lg d')).join('') + pt(NOT.O, 'O'))
      + K.f(es(2), V.map(X => K.l(...X, ...NOT.I, 'lf')).join('') + K.arc(n1(NOT.I[0]), n1(NOT.I[1]), n1(180 - NOT.I[1]), 0, 360, 'lf d') + pt(NOT.I, 'I'))
      + K.f(es(3), V.map((X, i) => K.l(...X, ...piel(X, ...L[i]), 'lo') + esc(K, piel(X, ...L[i]), X, L[i][0], 7)).join('') + pt(NOT.H, 'H'));
  };
  const MB = [170, 180];
  const bari = (v, K) => {
    const G = [TC[0] + (MB[0] - TC[0]) * v.s / 9, TC[1] + (MB[1] - TC[1]) * v.s / 9];
    let h = K.p([TA, TB, TC], 'fn') + K.pl([TA, TB, TC, TA], 'gr') + K.l(...TC, ...MB, 'la gr');
    for (let i = 0; i <= 9; i++) h += K.l(TC[0] + 40 * i / 9 - 4, TC[1] + 140 * i / 9 + 1, TC[0] + 40 * i / 9 + 4, TC[1] + 140 * i / 9 - 1, 'lm');
    return h + K.t(TC[0] - 12, TC[1] + 2, 'C', 's') + K.t(170, 196, 'M', 's') + K.t(G[0] + 20, G[1] + 4, 'G', 's ta') + K.t(260, 60, 'mediana: 9', 's tm');
  };
  const U = 24, GP = (x, y) => [26 + x * U, 212 - y * U], CASAS = [[1, 1], [11, 1], [4, 8]];
  const pozo = (v, K) => {
    const V = CASAS.map(q => GP(...q)), O = GP(v.x, v.y);
    let h = '';
    for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 8), 'ls');
    for (let j = 0; j <= 8; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls');
    return h + K.p(V, 'fn') + K.pl([...V, V[0]], 'gr') + V.map((q, i) => K.l(...O, ...q, ['lg d', 'lf d', 'lo d'][i]) + K.c(...q, 5, 'fk')).join('');
  };
  const dz = v => CASAS.map(q => n1(Math.hypot(q[0] - v.x, q[1] - v.y)));

  xpLec('euc-cuadrilateros-4', [
    ['La paralela media',
      xpMira('dibujo', 'Unir **puntos medios** produce segmentos con medidas muy precisas.', { dib: media, v: { cual: 0, seg: 0, len: 0, b: 8, oc: 0 }, alto: 204 }, [
        ['Marcamos los puntos medios de dos lados de un triángulo.', {}],
        ['El segmento que los une es la paralela media: es paralela al tercer lado.', { seg: 1 }],
        ['Y mide exactamente la mitad de ese lado.', { len: 1 }, '$20 \\div 2 = 10$'],
        ['En un trapecio, la mediana une los puntos medios de los lados no paralelos.', { cual: 1 }],
        ['Es paralela a las bases y mide su semisuma: el promedio de las dos.', {}, '$\\tfrac{14 + 8}{2} = 11$'],
        ['Si la base menor se achica, la mediana se achica la mitad de eso.', { b: 4 }, '$\\tfrac{14 + 4}{2} = 9$'],
      ], 'Paralela media: paralela al tercer lado y mide la mitad. Mediana del trapecio: semisuma de las bases.'),
      xpHaz('dibujo', 'La base mayor mide 14. Cambia la base menor hasta que la mediana, oculta, mida 10.', { dib: media, v: { cual: 1, seg: 1, len: 0, b: 9, oc: 1 }, metas: { b: 6 }, alto: 250,
        manijas: [{ k: 'b', min: 2, max: 12, paso: 1, et: 'base menor' }],
        lee: v => `$\\tfrac{14 + ${v.b}}{2}$`, dice: v => `Las bases miden 14 y ${v.b}. La mediana es su promedio.` }, 'La semisuma debe dar 10: $\\tfrac{14 + 6}{2} = 10$.')],
    ['Dos mitades del triángulo rectángulo',
      xpMira('dibujo', 'El triángulo **rectángulo** esconde dos mitades.', { dib: rect, v: { h: 8, med: 0, circ: 0, eq: 0 }, alto: 200 }, [
        ['Un triángulo rectángulo de hipotenusa 12. Trazamos la mediana que llega a la hipotenusa.', { med: 1 }],
        ['Esa mediana mide la mitad de la hipotenusa.', {}, '$12 \\div 2 = 6$'],
        ['Por eso el punto medio de la hipotenusa equidista de los tres vértices.', { circ: 1 }],
        ['Ahora bajemos la punta hasta que el ángulo mida 30°.', { h: 6, circ: 0, med: 0 }],
        ['El triángulo quedó como la mitad de uno equilátero de lado 12.', { eq: 1 }],
        ['Por eso el cateto opuesto a 30° mide la mitad de la hipotenusa. Y el recíproco también vale.', {}, '$12 \\div 2 = 6$'],
      ], 'La mediana sobre la hipotenusa y el cateto opuesto a 30° miden la mitad de la hipotenusa.'),
      xpHaz('dibujo', 'La hipotenusa mide 12. Mueve la punta hasta que el ángulo marcado mida 30°.', { dib: rect, v: { h: 9, med: 0, circ: 0, eq: 0 }, metas: { h: 6 }, alto: 200,
        manijas: [{ k: 'h', min: 2, max: 10, paso: 1, en: v => TP(v), de: (x, y) => (180 - y) / 11 }],
        lee: v => `$\\tfrac{${v.h}}{12}$`, dice: v => `El cateto opuesto mide ${v.h} y la hipotenusa 12.` }, 'Con el cateto opuesto en 6, la mitad de 12, el ángulo mide 30°.')],
    ['Cuatro puntos notables',
      xpMira('dibujo', 'En todo triángulo hay cuatro ternas de rectas que **se cortan en un solo punto**.', { dib: notables, v: { cual: 0 }, alto: 200 }, [
        ['Las tres medianas se cortan en un punto: el baricentro.', {}],
        ['Queda a dos tercios de cada mediana, contando desde el vértice.', {}, '$AG = \\tfrac23 \\, AM$'],
        ['Las mediatrices de los lados se cortan en el circuncentro: equidista de los tres vértices.', { cual: 1 }],
        ['Las bisectrices de los ángulos se cortan en el incentro: equidista de los tres lados.', { cual: 2 }],
        ['Y las tres alturas se cortan en el ortocentro.', { cual: 3 }],
      ], 'Medianas: baricentro. Mediatrices: circuncentro. Bisectrices: incentro. Alturas: ortocentro.'),
      xpHaz('dibujo', 'La mediana CM mide 9. Desliza G por ella hasta el baricentro.', { dib: bari, v: { s: 3 }, metas: { s: 6 }, alto: 204,
        manijas: [{ k: 's', min: 1, max: 8, paso: 1, r: 9, en: v => [TC[0] + 40 * v.s / 9, TC[1] + 140 * v.s / 9], de: (x, y) => 9 * ((x - TC[0]) * 40 + (y - TC[1]) * 140) / (40 * 40 + 140 * 140) }],
        lee: v => `$CG = ${v.s}$, $GM = ${9 - v.s}$`, dice: v => `G está a ${v.s} del vértice y a ${9 - v.s} del lado.` }, 'Dos tercios de 9 desde el vértice: $CG = 6$ y $GM = 3$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Tres casas quieren un pozo a igual distancia de las tres. Arrastra el pozo a su lugar.', { dib: pozo, v: { x: 3, y: 3 }, metas: { x: 6, y: 3 }, alto: 232,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [12, 8], paso: 1, en: v => GP(v.x, v.y), de: (x, y) => [(x - 26) / U, (212 - y) / U] }],
        lee: v => `$${dz(v).join('$, $')}$`, dice: v => `El pozo queda a ${dz(v).join(', ')} de las casas.` }, 'Es el circuncentro: está en las mediatrices y equidista de los tres vértices.')],
  ], 'Puntos medios que dan mitades, y cuatro puntos notables: baricentro, circuncentro, incentro y ortocentro.');
}
;
//#archivo js/explora-euc-5.js
// Geometría Euclidiana · mundo 5 «euc-circunferencia»: explicaciones Explora (spec 2026-11-26-curso-euclidiana).
// Escena «dibujo». Los ejemplos no son los de los ejercicios (js/courses/euclidiana-circunferencia.js).
{
  const R = Math.round, rad = g => g * Math.PI / 180, gr = n => `${R(n)}°`, n1 = x => String(R(x * 10) / 10);
  const at = (c, r, g) => [c[0] + r * Math.cos(rad(g)), c[1] - r * Math.sin(rad(g))];
  const gra = (c, x, y) => (Math.atan2(c[1] - y, x - c[0]) * 180 / Math.PI + 360) % 360;
  const vuelta = a => { const b = (a % 360 + 360) % 360; return b > 280 ? b - 360 : b; };
  const seg = (K, a, b, cls = '') => K.l(a[0], a[1], b[0], b[1], cls);
  const aro = (K, c, r, cls = '') => K.arc(c[0], c[1], r, 0, 360, cls);
  const arco = (K, c, r, a, b, cls = '') => K.arc(c[0], c[1], r, a, b, cls);
  const uni = (a, b) => { const m = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / m, (b[1] - a[1]) / m]; };
  const medio = (a, b, t = 0.5) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const pt = (K, q, t, c, d = 13) => { const u = uni(c, q); return K.c(q[0], q[1], 3.5, 'fk') + (t ? K.t(q[0] + u[0] * d, q[1] + u[1] * d + 4, t, 's') : ''); };
  const tx = (K, q, s, cls = '', a = 'middle') => K.t(q[0], q[1] + 4, s, cls, a);
  const recto = (K, T, a, b, s = 8) => { const u = uni(T, a), w = uni(T, b); return K.pl([[T[0] + u[0] * s, T[1] + u[1] * s], [T[0] + (u[0] + w[0]) * s, T[1] + (u[1] + w[1]) * s], [T[0] + w[0] * s, T[1] + w[1] * s]], 'lm'); };
  const corta = (P, Q, U, V) => { const d = (Q[0] - P[0]) * (V[1] - U[1]) - (Q[1] - P[1]) * (V[0] - U[0]), t = ((U[0] - P[0]) * (V[1] - U[1]) - (U[1] - P[1]) * (V[0] - U[0])) / (d || 1e-9); return medio(P, Q, t); };

  // ------------------------------------------------------------------------------------------------ lección 1
  // Radio, cuerda que sube hasta ser diámetro, y arco con su ángulo central.  v { cu, h, ar, a, su }
  const C1 = [170, 106], R1 = 80;
  const partes = (v, K) => {
    const y = C1[1] - v.h * R1, w = Math.sqrt(Math.max(0, 1 - v.h * v.h)) * R1, A = at(C1, R1, 0), B = at(C1, R1, v.a), m = at(C1, 44, 200);
    return aro(K, C1, R1) + seg(K, C1, at(C1, R1, 200), 'lg') + K.t(m[0], m[1] + 17, 'radio', 's tg')
      + K.f(v.cu, K.l(170 - w, y, 170 + w, y, 'la gr') + K.t(170, y - 9, v.h < 0.03 ? 'diámetro' : 'cuerda', 's ta'))
      + K.f(v.ar, K.sec(C1[0], C1[1], 26, 0, v.a, 'fg') + arco(K, C1, R1, 0, v.a, 'lf gr') + seg(K, C1, A) + seg(K, C1, B) + tx(K, at(C1, 46, v.a / 2), gr(v.a), 's tg') + tx(K, at(C1, R1 + 9, Math.min(v.a / 2, 80)), `arco de ${R(v.a)}°`, 's tf', 'start') + pt(K, A, 'A', C1, 11) + K.c(B[0], B[1], 3.5, 'fk'))
      + K.f(v.su, seg(K, C1, at(C1, R1, 60), 'lm d') + K.c(...at(C1, R1, 60), 3, 'fk')) + K.c(C1[0], C1[1], 3.5, 'fk');
  };
  // Cuerda a distancia d del centro, con el triángulo rectángulo.  v { r, d, per, tri, tw, oc }
  const cuerda = (v, K) => {
    const u = 80 / v.r, y = 100 + v.d * u, hc = Math.sqrt(Math.max(0, v.r * v.r - v.d * v.d)), w = hc * u, E = [170 + w, y], m = medio([170, 100], E);
    return aro(K, [170, 100], 80) + K.t(10, 20, v.oc ? 'cuerda: ?' : `cuerda: ${n1(2 * hc)}`, 'ta', 'start') + K.t(330, 20, `radio: ${v.r}`, 's tg', 'end')
      + K.f(v.tw, K.l(170 - w, 200 - y, 170 + w, 200 - y, 'la gr') + K.l(170, 100, 170, 200 - y, 'lf d'))
      + K.f(v.per, (v.d > 0.2 ? K.l(170, 100, 170, y, 'lf d') + K.t(162, 100 + v.d * u / 2 + 4, n1(v.d), 's tf', 'end') + recto(K, [170, y], [170, 100], E, 7) : ''))
      + K.f(v.tri, seg(K, [170, 100], E, 'lg') + K.t(m[0] + 8, m[1] - 6, v.r, 's tg', 'start') + (v.oc ? '' : K.t(170 + w / 2, y + 16, n1(hc), 's ta')))
      + K.l(170 - w, y, 170 + w, y, 'la gr') + K.c(170, 100, 3.5, 'fk');
  };
  // Una recta que se acerca: exterior, tangente, secante; y las dos tangentes desde P.  v { y, rad, pt }
  const C3 = [120, 100], R3 = 56;
  const recta = (v, K) => {
    const Y = 100 + v.y * R3, T = [120, 156], P = [266, 156], d = uni(C3, P), q = [T[0] - C3[0], T[1] - C3[1]], k = q[0] * d[0] + q[1] * d[1], T2 = [C3[0] + 2 * k * d[0] - q[0], C3[1] + 2 * k * d[1] - q[1]];
    const w = Math.sqrt(Math.max(0, 1 - v.y * v.y)) * R3;
    return K.t(10, 20, v.y > 1.02 ? 'recta exterior' : v.y > 0.98 ? 'recta tangente' : 'recta secante', 'ta', 'start') + K.t(330, 20, `radio 4 · distancia ${n1(v.y * 4)}`, 's tm', 'end')
      + aro(K, C3, R3) + K.l(20, Y, 320, Y, 'la gr') + (v.y < 0.98 ? K.c(120 - w, Y, 3.5, 'fk') + K.c(120 + w, Y, 3.5, 'fk') : v.y < 1.02 ? K.c(120, Y, 3.5, 'fk') : '')
      + K.f(v.rad, seg(K, C3, [120, Y], 'lg') + recto(K, [120, Y], C3, [160, Y]))
      + K.f(v.pt, seg(K, P, T2, 'lf gr') + seg(K, P, T, 'lf gr') + seg(K, C3, T2, 'lg') + recto(K, T2, C3, P) + K.c(T2[0], T2[1], 3.5, 'fk') + K.c(P[0], P[1], 4, 'fk') + K.t(P[0] + 4, P[1] + 20, 'P', 's'))
      + K.c(C3[0], C3[1], 3.5, 'fk');
  };
  // Segmento tangente desde un punto a distancia d (radio 6).  v { d, oc }
  const C4 = [80, 100];
  const desde = (v, K) => {
    const P = [80 + v.d * 10, 100], fi = Math.acos(Math.min(1, 6 / v.d)) * 180 / Math.PI, T = at(C4, 60, fi), m = medio(C4, T), n = medio(P, T);
    return aro(K, C4, 60) + seg(K, C4, P, 'lm d') + seg(K, P, at(C4, 60, -fi), 'lm') + seg(K, C4, T, 'lg') + recto(K, T, C4, P) + seg(K, P, T, 'la gr')
      + K.t(m[0] - 7, m[1] + 2, '6', 's tg', 'end') + K.t((80 + P[0]) / 2, 117, n1(v.d), 's tf') + K.t(n[0] + 6, n[1] - 8, v.oc ? '?' : n1(Math.sqrt(Math.max(0, v.d * v.d - 36))), 'ta', 'start') + pt(K, T, 'T', C4) + K.c(80, 100, 3.5, 'fk') + K.t(P[0] + 4, 84, 'P', 's');
  };
  // Dos circunferencias con los centros a distancia d.  v { R, r, u, x0, d }
  const nombre = v => (v.d > v.R + v.r + 0.03 ? 'exteriores' : v.d > v.R + v.r - 0.03 ? 'tangentes exteriores' : v.d > v.R - v.r + 0.03 ? 'secantes' : v.d > v.R - v.r - 0.03 ? 'tangentes interiores' : v.d > 0.03 ? 'interiores' : 'concéntricas');
  const dos = (v, K) => {
    const O = [v.x0, 104], Q = [v.x0 + v.d * v.u, 104];
    return K.t(10, 20, nombre(v), 'ta', 'start') + K.t(330, 20, `radios ${v.R} y ${v.r} · centros a ${n1(v.d)}`, 's tm', 'end') + aro(K, O, v.R * v.u) + aro(K, Q, v.r * v.u, 'la gr') + seg(K, O, Q, 'lf d') + K.c(O[0], O[1], 3.5, 'fk') + K.c(Q[0], Q[1], 3.5, 'fk');
  };

  xpLec('euc-circunferencia-1', [
    ['Radio, cuerda y arco',
      xpMira('dibujo', 'Empecemos por los nombres: qué es un **radio**, una **cuerda** y un **arco**.', { dib: partes, v: { cu: 0, h: 0.6, ar: 0, a: 70, su: 0 }, alto: 204 }, [
        ['Los puntos que están a una misma distancia del centro forman la circunferencia. Esa distancia es el radio.', {}],
        ['Un segmento que une dos puntos de la circunferencia se llama cuerda.', { cu: 1 }],
        ['Cuanto más cerca del centro, más larga. La que pasa por el centro es la mayor: el diámetro.', { h: 0 }, '$d = 2r$'],
        ['El trozo de circunferencia entre dos puntos es un arco. Lo abre un ángulo con el vértice en el centro.', { cu: 0, ar: 1 }],
        ['El arco mide lo mismo que su ángulo central. Si el ángulo crece a 130°, el arco también.', { a: 130 }, '$130^\\circ$'],
        ['Dos arcos seguidos se suman, igual que sus ángulos: uno de 60° y otro de 70° hacen 130°.', { su: 1 }, '$60^\\circ + 70^\\circ = 130^\\circ$'],
      ], 'Una cuerda une dos puntos; la mayor es el diámetro. Un arco mide lo mismo que su ángulo central.'),
      xpHaz('dibujo', 'El primer arco mide 60°. Abre el ángulo central hasta que el arco completo, desde A, mida 150°.', { dib: partes, v: { cu: 0, h: 0.6, ar: 1, a: 90, su: 1 }, metas: { a: 150 }, alto: 204,
        manijas: [{ k: 'a', min: 70, max: 170, paso: 10, en: v => at(C1, R1, v.a), de: (x, y) => gra(C1, x, y) }],
        lee: v => `$60^\\circ + ${v.a - 60}^\\circ = ${v.a}^\\circ$`, dice: v => `El segundo arco mide ${v.a - 60}°. Con el primero, ${v.a}°.` }, 'Los arcos seguidos se suman: $60^\\circ + 90^\\circ = 150^\\circ$.')],
    ['La cuerda y el centro',
      xpMira('dibujo', 'Segunda idea: qué tiene que ver una **cuerda** con el **centro**.', { dib: cuerda, v: { r: 5, d: 3, per: 0, tri: 0, tw: 0, oc: 0 }, alto: 200 }, [
        ['Una cuerda en una circunferencia de radio 5. Tracemos desde el centro la perpendicular a la cuerda.', {}],
        ['La perpendicular cae justo en el punto medio: el radio perpendicular a una cuerda la biseca.', { per: 1 }],
        ['Con un radio hasta el extremo aparece un triángulo rectángulo: radio, media cuerda y distancia.', { tri: 1 }],
        ['Radio 5 y distancia 3: por Pitágoras la media cuerda mide 4, y la cuerda entera, 8.', {}, '$\\sqrt{5^2 - 3^2} = 4$'],
        ['Si la cuerda se aleja del centro, se acorta: a distancia 4, la mitad mide 3 y la cuerda 6.', { d: 4 }, '$\\sqrt{5^2 - 4^2} = 3$'],
        ['Y dos cuerdas congruentes quedan a la misma distancia del centro: equidistan.', { tw: 1 }],
      ], 'El radio perpendicular a una cuerda la biseca: radio, media cuerda y distancia forman un triángulo rectángulo.'),
      xpHaz('dibujo', 'El radio mide 10. Mueve la cuerda hasta que mida 12.', { dib: cuerda, v: { r: 10, d: 2, per: 1, tri: 1, tw: 0, oc: 1 }, metas: { d: 8 }, alto: 200,
        manijas: [{ k: 'd', min: 0, max: 9, paso: 1, en: v => [170, 100 + v.d * 8], de: (x, y) => (y - 100) / 8 }],
        lee: v => `$10^2 - ${v.d}^2 = ${100 - v.d * v.d}$`, dice: v => `A distancia ${v.d}, la media cuerda al cuadrado vale ${100 - v.d * v.d}.` }, 'Media cuerda 6 y radio 10: la distancia es $\\sqrt{10^2 - 6^2} = 8$.')],
    ['Rectas tangentes',
      xpMira('dibujo', 'Tercera idea: cómo puede quedar una **recta** frente a una circunferencia.', { dib: recta, v: { y: 1.4, rad: 0, pt: 0 }, alto: 200 }, [
        ['Una recta puede no tocar la circunferencia: es exterior. Está más lejos del centro que el radio.', {}],
        ['Si se acerca hasta tocarla en un solo punto es tangente: su distancia al centro es justo el radio.', { y: 1 }],
        ['El radio que llega al punto de tangencia es perpendicular a la tangente. Siempre.', { rad: 1 }],
        ['Más cerca todavía, la recta corta la circunferencia en dos puntos: es secante.', { y: 0.5, rad: 0 }],
        ['Volvamos a la tangente. Desde un punto exterior P se pueden trazar dos tangentes.', { y: 1, pt: 1 }],
        ['Los dos segmentos tangentes, de P a cada punto de tangencia, son congruentes.', { rad: 1 }],
      ], 'La tangente es perpendicular al radio en el punto de tangencia; dos tangentes desde un punto son congruentes.'),
      xpHaz('dibujo', 'El radio mide 6. Aleja o acerca P hasta que el segmento tangente PT mida 8.', { dib: desde, v: { d: 14, oc: 1 }, metas: { d: 10 }, alto: 200,
        manijas: [{ k: 'd', min: 7, max: 22, paso: 1, en: v => [80 + v.d * 10, 100], de: x => (x - 80) / 10 }],
        lee: v => `$${v.d}^2 - 6^2 = ${v.d * v.d - 36}$`, dice: v => `P está a ${v.d} del centro: la tangente al cuadrado vale ${v.d * v.d - 36}.` }, 'Radio y tangente son perpendiculares: $OP = \\sqrt{6^2 + 8^2} = 10$.')],
    ['Dos circunferencias',
      xpMira('dibujo', 'Cuarta idea: cómo pueden quedar **dos circunferencias**, una frente a otra.', { dib: dos, v: { R: 5, r: 3, u: 10, x0: 100, d: 10 }, alto: 200 }, [
        ['Dos circunferencias de radios 5 y 3. Con los centros a 10, ni se tocan: son exteriores.', {}],
        ['A distancia 8, que es la suma de los radios, se tocan por fuera en un punto: tangentes exteriores.', { d: 8 }, '$5 + 3 = 8$'],
        ['Entre la suma y la resta de los radios se cortan en dos puntos: son secantes.', { d: 5 }],
        ['A distancia 2, que es la resta de los radios, se tocan por dentro: tangentes interiores.', { d: 2 }, '$5 - 3 = 2$'],
        ['Más cerca, una queda dentro de la otra sin tocarla: son interiores.', { d: 1 }],
        ['Y cuando los centros coinciden, son concéntricas.', { d: 0 }],
      ], 'Tangentes exteriores: los centros distan la suma de los radios. Tangentes interiores: distan la resta.'),
      xpHaz('dibujo', 'Los radios miden 6 y 2. Arrastra el centro pequeño hasta que queden tangentes exteriores.', { dib: dos, v: { R: 6, r: 2, u: 12, x0: 90, d: 11 }, metas: { d: 8 }, alto: 200,
        manijas: [{ k: 'd', min: 0, max: 12, paso: 1, en: v => [90 + v.d * 12, 104], de: x => (x - 90) / 12 }],
        lee: v => `$d = ${v.d}$`, dice: v => `Con los centros a ${v.d} quedan ${nombre(v)}.` }, 'Se tocan por fuera cuando los centros distan la suma de los radios: $6 + 2 = 8$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un túnel de sección circular tiene radio 13 m. Su piso, plano, debe medir 24 m de ancho. Bájalo a la distancia del centro que lo logra.', { dib: cuerda, v: { r: 13, d: 2, per: 1, tri: 1, tw: 0, oc: 1 }, metas: { d: 5 }, alto: 200,
        manijas: [{ k: 'd', min: 0, max: 12, paso: 1, en: v => [170, 100 + v.d * 80 / 13], de: (x, y) => (y - 100) * 13 / 80 }],
        lee: v => `$13^2 - ${v.d}^2 = ${169 - v.d * v.d}$`, dice: v => `A ${v.d} m del centro, medio piso al cuadrado vale ${169 - v.d * v.d}.` }, 'Medio piso mide 12 m: la distancia al centro es $\\sqrt{13^2 - 12^2} = 5$ m.')],
  ], 'Cuerdas que el radio perpendicular biseca, tangentes perpendiculares al radio y circunferencias que se comparan por sus centros.');

  // ------------------------------------------------------------------------------------------------ lección 2
  // Arco AB con su central y un inscrito desde P.  v { a, p, ce, ins, oc }
  const C5 = [170, 108], R5 = 80;
  const inscrito = (v, K) => {
    const A = at(C5, R5, 160), B = at(C5, R5, 160 - v.a), P = at(C5, R5, v.p);
    return aro(K, C5, R5) + arco(K, C5, R5, 160 - v.a, 160, 'lg gr')
      + K.f(v.ce, K.sec(C5[0], C5[1], 22, 160 - v.a, 160, 'fg') + tx(K, at(C5, 38, 160 - v.a / 2), gr(v.a), 's tg') + seg(K, C5, A, 'lg') + seg(K, C5, B, 'lg'))
      + K.f(v.ins, K.ang(P, A, B, 26, v.oc ? '?' : gr(v.a / 2), 'fa', 'ta') + seg(K, P, A, 'la gr') + seg(K, P, B, 'la gr') + pt(K, P, 'P', C5))
      + pt(K, A, 'A', C5) + K.c(C5[0], C5[1], 3.5, 'fk') + K.t(B[0] + uni(C5, B)[0] * 20, B[1] + uni(C5, B)[1] * 20 + 4, 'B', 's');
  };
  // Cuadrilátero inscrito con D móvil.  v { d, fb, fd, ac, oc }
  const cuadri = (v, K) => {
    const A = at(C5, R5, 150), B = at(C5, R5, 40), C = at(C5, R5, 310), D = at(C5, R5, v.d);
    return aro(K, C5, R5) + K.f(v.fb, arco(K, C5, R5, 150, 310, 'la gr') + K.ang(B, A, C, 22, '80°', 'fa', 'ta')) + K.f(v.fd, arco(K, C5, R5, -50, 150, 'lg gr') + K.ang(D, C, A, 22, '100°', 'fg', 'tg'))
      + K.f(v.ac, K.ang(A, D, B, 20, v.oc ? '?' : gr((400 - v.d) / 2), 'ff', 'tf') + K.ang(C, B, D, 20, gr((v.d - 40) / 2), 'fo', 'to'))
      + K.p([A, B, C, D], 'fn') + pt(K, A, 'A', C5) + pt(K, B, 'B', C5) + pt(K, C, 'C', C5) + K.c(D[0], D[1], 3.5, 'fk') + K.t(D[0] + uni(C5, D)[0] * 20, D[1] + uni(C5, D)[1] * 20 + 4, 'D', 's');
  };
  const mueveB = { k: 'a', min: 20, max: 200, paso: 10, en: v => at(C5, R5, 160 - v.a), de: (x, y) => vuelta(160 - gra(C5, x, y)) };

  xpLec('euc-circunferencia-2', [
    ['Central e inscrito',
      xpMira('dibujo', 'Dos ángulos miran el mismo arco: uno desde el **centro** y otro desde la **circunferencia**.', { dib: inscrito, v: { a: 80, p: 255, ce: 1, ins: 0, oc: 0 }, alto: 212 }, [
        ['Un ángulo con el vértice en el centro es central. Mide exactamente lo que su arco: aquí, 80°.', {}],
        ['Si el vértice está sobre la circunferencia y los lados son cuerdas, el ángulo es inscrito.', { ins: 1 }],
        ['El inscrito mira el mismo arco, pero desde más lejos: abre la mitad. Mide 40°.', {}, '$80^\\circ \\div 2 = 40^\\circ$'],
        ['Si el arco crece a 120°, el central lo sigue y el inscrito vuelve a ser la mitad: 60°.', { a: 120 }, '$120^\\circ \\div 2 = 60^\\circ$'],
        ['Ahora se mueve el vértice. Mientras abarque el mismo arco, el inscrito no cambia.', { p: 320 }],
        ['En cualquier punto sigue midiendo 60°: los inscritos en el mismo arco son congruentes.', { p: 200 }],
      ], 'El central mide lo que su arco; el inscrito, la mitad. Inscritos que abarcan el mismo arco son congruentes.'),
      xpHaz('dibujo', 'Mueve B hasta que el ángulo inscrito, el de P, mida 35°.', { dib: inscrito, v: { a: 110, p: 255, ce: 1, ins: 1, oc: 1 }, metas: { a: 70 }, alto: 212, manijas: [mueveB],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El arco y el central miden ${v.a}°. El inscrito es la mitad.` }, 'El inscrito es la mitad del arco: para 35° hace falta un arco de 70°.')],
    ['La semicircunferencia',
      xpMira('dibujo', 'Un caso especial: cuando el arco es **media circunferencia**.', { dib: inscrito, v: { a: 100, p: 250, ce: 1, ins: 1, oc: 0 }, alto: 212 }, [
        ['Volvamos al inscrito: con un arco de 100°, mide 50°.', {}, '$100^\\circ \\div 2 = 50^\\circ$'],
        ['Abramos el arco hasta media circunferencia. La cuerda AB pasa por el centro: es un diámetro.', { a: 180 }],
        ['El inscrito es la mitad de 180°: un ángulo recto.', {}, '$180^\\circ \\div 2 = 90^\\circ$'],
        ['Y no importa dónde esté el vértice: todo ángulo inscrito en una semicircunferencia es recto.', { p: 300 }],
        ['Por eso un triángulo con un lado que es diámetro y el otro vértice en la circunferencia es rectángulo.', { p: 215 }],
      ], 'Todo ángulo inscrito en una semicircunferencia es recto: abarca 180° y mide la mitad.'),
      xpHaz('dibujo', 'Mueve B hasta que el ángulo en P sea recto.', { dib: inscrito, v: { a: 120, p: 255, ce: 0, ins: 1, oc: 1 }, metas: { a: 180 }, alto: 212, manijas: [mueveB],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El arco AB mide ${v.a}°. ${v.a === 180 ? 'AB es un diámetro.' : 'AB todavía no pasa por el centro.'}` }, 'Recto es la mitad de 180°: AB tiene que ser un diámetro.')],
    ['Cuadrilátero inscrito',
      xpMira('dibujo', 'Ahora cuatro puntos: un **cuadrilátero** con los vértices en la circunferencia.', { dib: cuadri, v: { d: 230, fb: 0, fd: 0, ac: 0, oc: 0 }, alto: 212 }, [
        ['Un cuadrilátero con sus cuatro vértices en la circunferencia está inscrito en ella.', {}],
        ['El ángulo en B es inscrito: abarca el arco ADC, de 160°, y mide 80°.', { fb: 1 }, '$160^\\circ \\div 2 = 80^\\circ$'],
        ['El de enfrente, en D, abarca el resto de la circunferencia: 200°. Mide 100°.', { fd: 1 }, '$200^\\circ \\div 2 = 100^\\circ$'],
        ['Los dos arcos completan los 360°, así que los dos ángulos suman 180°: son suplementarios.', {}, '$80^\\circ + 100^\\circ = 180^\\circ$'],
        ['Aunque D se mueva, sigue abarcando el mismo arco: la suma no cambia.', { d: 250 }],
        ['Con la otra pareja, A y C, pasa lo mismo: los opuestos siempre son suplementarios.', { ac: 1 }, '$75^\\circ + 105^\\circ = 180^\\circ$'],
      ], 'En un cuadrilátero inscrito, los ángulos opuestos son suplementarios: sus arcos completan la circunferencia.'),
      xpHaz('dibujo', 'Mueve D hasta que el ángulo en A, el que no se ve, mida 70°. Fíjate en su opuesto.', { dib: cuadri, v: { d: 220, fb: 0, fd: 0, ac: 1, oc: 1 }, metas: { d: 260 }, alto: 212,
        manijas: [{ k: 'd', min: 200, max: 280, paso: 10, en: v => at(C5, R5, v.d), de: (x, y) => gra(C5, x, y) }],
        lee: v => `$? + ${(v.d - 40) / 2}^\\circ = 180^\\circ$`, dice: v => `El ángulo en C mide ${(v.d - 40) / 2}°. El de A es su opuesto.` }, 'El opuesto debe medir $180^\\circ - 70^\\circ = 110^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una cámara en el borde de una plaza circular, en P, abarca 45°. Abre el arco del escenario AB hasta que quepa justo en la toma.', { dib: inscrito, v: { a: 40, p: 255, ce: 1, ins: 1, oc: 1 }, metas: { a: 90 }, alto: 212, manijas: [mueveB],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El escenario ocupa un arco de ${v.a}°. La cámara lo ve con la mitad.` }, 'La cámara es un ángulo inscrito: ve un arco del doble, $2 \\cdot 45^\\circ = 90^\\circ$.')],
  ], 'El central mide su arco y el inscrito, la mitad: recto en media circunferencia, y opuestos suplementarios en un cuadrilátero.');

  // ------------------------------------------------------------------------------------------------ lección 3
  // Tangente en A y cuerda AB.  v { a, ins, oc }
  const C6 = [170, 100], R6 = 76, A6 = [170, 176];
  const semi = (v, K) => {
    const B = at(C6, R6, 270 + v.a), Q = at(C6, R6, 150);
    return aro(K, C6, R6) + K.l(24, 176, 316, 176) + arco(K, C6, R6, 270, 270 + v.a, 'lg gr') + tx(K, at(C6, R6 + 17, 270 + v.a / 2), gr(v.a), 's tg')
      + K.f(v.ins, K.ang(Q, A6, B, 22, gr(v.a / 2), 'ff', 'tf') + seg(K, Q, A6, 'lf') + seg(K, Q, B, 'lf') + K.c(Q[0], Q[1], 3.5, 'fk'))
      + K.ang(A6, [240, 176], B, 28, v.oc ? '?' : gr(v.a / 2), 'fa', 'ta') + seg(K, A6, B, 'la gr') + K.c(170, 176, 3.5, 'fk') + K.t(156, 193, 'A', 's') + K.c(C6[0], C6[1], 3, 'fk') + K.t(B[0] - uni(C6, B)[0] * 18, B[1] - uni(C6, B)[1] * 18 + 4, 'B', 's');
  };
  // Dos cuerdas que se cortan.  v { ab, cd, oc }
  const C7 = [170, 106], R7 = 80;
  const cruce = (v, K) => {
    const A = at(C7, R7, 90 + v.ab / 2), B = at(C7, R7, 90 - v.ab / 2), C = at(C7, R7, 300), D = at(C7, R7, 300 - v.cd), X = corta(A, C, B, D);
    return aro(K, C7, R7) + arco(K, C7, R7, 90 - v.ab / 2, 90 + v.ab / 2, 'lg gr') + arco(K, C7, R7, 300 - v.cd, 300, 'lf gr') + tx(K, at(C7, R7 + 15, 90), gr(v.ab), 's tg') + tx(K, at(C7, R7 + 17, 300 - v.cd / 2), gr(v.cd), 's tf')
      + K.ang(X, A, B, 20, '', 'fa') + K.t(10, 20, `ángulo: ${v.oc ? '?' : gr((v.ab + v.cd) / 2)}`, 'ta', 'start') + seg(K, A, C, 'la') + seg(K, B, D, 'la') + pt(K, A, 'A', C7) + pt(K, B, 'B', C7) + pt(K, C, 'C', C7) + K.c(X[0], X[1], 3, 'fk') + K.t(D[0] - uni(C7, D)[0] * 18, D[1] - uni(C7, D)[1] * 18 + 4, 'D', 's');
  };
  // Vértice afuera: dos secantes (cual 0) o dos tangentes (cual 1).  v { cual, m, n, a, oc }
  const C8 = [100, 104], R8 = 72, C9 = [92, 104], R9 = 52;
  const afuera = (v, K) => {
    if (v.cual < 0.5) {
      const P = [C8[0] + R8 * Math.cos(rad(v.n / 2)) + R8 * Math.sin(rad(v.n / 2)) / Math.tan(rad(Math.max(4, v.m - v.n) / 4)), 104], F1 = at(C8, R8, 180 - v.m / 2), F2 = at(C8, R8, 180 + v.m / 2);
      return aro(K, C8, R8) + arco(K, C8, R8, 180 - v.m / 2, 180 + v.m / 2, 'lf gr') + arco(K, C8, R8, -v.n / 2, v.n / 2, 'lg gr') + tx(K, at(C8, R8 - 22, 180), gr(v.m), 's tf') + tx(K, at(C8, R8 - 18, 0), gr(v.n), 's tg')
        + K.ang(P, F1, F2, 30, '', 'fa') + seg(K, F1, P, 'la') + seg(K, F2, P, 'la') + K.c(F1[0], F1[1], 3, 'fk') + K.c(P[0], P[1], 3.5, 'fk') + K.t(Math.min(318, P[0] + 2), 84, v.oc ? '?' : gr((v.m - v.n) / 2), 'ta') + K.t(Math.min(322, P[0] + 4), 124, 'P', 's');
    }
    const h = 90 - v.a / 2, P = [C9[0] + R9 / Math.sin(rad(v.a / 2)), 104], T1 = at(C9, R9, h), T2 = at(C9, R9, -h);
    return aro(K, C9, R9) + arco(K, C9, R9, -h, h, 'lg gr') + arco(K, C9, R9, h, 360 - h, 'lf gr') + K.t(C9[0] + R9 - 20, 108, gr(180 - v.a), 's tg') + K.t(C9[0] - R9 - 5, 108, gr(180 + v.a), 's tf', 'end')
      + seg(K, C9, T1, 'lm') + seg(K, C9, T2, 'lm') + recto(K, T1, C9, P, 7) + recto(K, T2, C9, P, 7) + K.ang(P, T1, T2, 26, '', 'fa') + seg(K, P, T1, 'la gr') + seg(K, P, T2, 'la gr')
      + K.c(T1[0], T1[1], 3, 'fk') + K.c(T2[0], T2[1], 3, 'fk') + K.c(C9[0], C9[1], 3, 'fk') + K.t(330, 20, `ángulo en P: ${v.oc ? '?' : gr(v.a)}`, 'ta', 'end') + K.t(Math.min(322, P[0]), 128, 'P', 's');
  };

  xpLec('euc-circunferencia-3', [
    ['Semiinscrito: tangente y cuerda',
      xpMira('dibujo', 'Un ángulo nuevo: entre una **tangente** y una **cuerda** que sale del punto de tangencia.', { dib: semi, v: { a: 100, ins: 0, oc: 0 }, alto: 206 }, [
        ['Un lado es tangente y el otro una cuerda que sale del punto de tangencia: es un ángulo semiinscrito.', {}],
        ['Abarca el arco que queda dentro de él. Y mide la mitad de ese arco, igual que un inscrito.', {}, '$100^\\circ \\div 2 = 50^\\circ$'],
        ['De hecho, un inscrito que abarca ese mismo arco mide lo mismo: 50°.', { ins: 1 }],
        ['Si la cuerda pasa por el centro, el arco mide 180° y el ángulo es recto: tangente y radio.', { a: 180, ins: 0 }, '$180^\\circ \\div 2 = 90^\\circ$'],
        ['Con un arco pequeño, de 60°, la cuerda se acuesta sobre la tangente: 30°.', { a: 60 }, '$60^\\circ \\div 2 = 30^\\circ$'],
      ], 'El ángulo semiinscrito, entre una tangente y una cuerda, mide la mitad del arco que abarca.'),
      xpHaz('dibujo', 'Mueve B hasta que el ángulo semiinscrito mida 65°.', { dib: semi, v: { a: 60, ins: 0, oc: 1 }, metas: { a: 130 }, alto: 206,
        manijas: [{ k: 'a', min: 20, max: 200, paso: 10, en: v => at(C6, R6, 270 + v.a), de: (x, y) => vuelta(gra(C6, x, y) - 270) }],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El arco entre la tangente y la cuerda mide ${v.a}°.` }, 'La mitad del arco: para 65° hace falta un arco de 130°.')],
    ['Vértice adentro',
      xpMira('dibujo', 'Ahora el vértice se mete **dentro** del círculo: dos cuerdas que se cortan.', { dib: cruce, v: { ab: 60, cd: 100, oc: 0 }, alto: 214 }, [
        ['Dos cuerdas que se cortan dentro del círculo forman un ángulo interior. No es central ni inscrito.', {}],
        ['Abarca dos arcos: el que tiene enfrente y el que abarca su opuesto por el vértice.', {}],
        ['Mide la semisuma de esos dos arcos, es decir, su promedio.', {}, '$\\tfrac{60^\\circ + 100^\\circ}{2} = 80^\\circ$'],
        ['Si uno de los arcos crece, el ángulo crece la mitad de eso.', { cd: 140 }, '$\\tfrac{60^\\circ + 140^\\circ}{2} = 100^\\circ$'],
        ['Y si los dos arcos son iguales, el promedio es ese valor: las cuerdas se cortan en el centro.', { cd: 60 }, '$\\tfrac{60^\\circ + 60^\\circ}{2} = 60^\\circ$'],
      ], 'Un ángulo interior, formado por dos cuerdas que se cortan, mide la semisuma de los arcos que abarca.'),
      xpHaz('dibujo', 'El arco de arriba mide 60°. Mueve D hasta que el ángulo interior mida 75°.', { dib: cruce, v: { ab: 60, cd: 40, oc: 1 }, metas: { cd: 90 }, alto: 214,
        manijas: [{ k: 'cd', min: 20, max: 160, paso: 10, en: v => at(C7, R7, 300 - v.cd), de: (x, y) => vuelta(300 - gra(C7, x, y)) }],
        lee: v => `$\\tfrac{60^\\circ + ${v.cd}^\\circ}{2}$`, dice: v => `Los dos arcos suman ${60 + v.cd}°. El ángulo es la mitad de esa suma.` }, 'Los arcos deben sumar 150°: $150^\\circ - 60^\\circ = 90^\\circ$.')],
    ['Vértice afuera',
      xpMira('dibujo', 'Por último, el vértice sale **fuera** del círculo: secantes y tangentes.', { dib: afuera, v: { cual: 0, m: 140, n: 40, a: 60, oc: 0 }, alto: 208 }, [
        ['Dos secantes que salen de un punto exterior forman un ángulo exterior. Abarca un arco lejano y uno cercano.', {}],
        ['Mide la semidiferencia: la mitad de lo que el arco lejano le lleva al cercano.', {}, '$\\tfrac{140^\\circ - 40^\\circ}{2} = 50^\\circ$'],
        ['Si el arco lejano crece, el punto se acerca y el ángulo se abre.', { m: 200 }, '$\\tfrac{200^\\circ - 40^\\circ}{2} = 80^\\circ$'],
        ['Con dos tangentes pasa igual: los arcos son el mayor y el menor entre los puntos de tangencia.', { cual: 1 }],
        ['Aquí los arcos miden 240° y 120°: el ángulo entre las tangentes es de 60°.', {}, '$\\tfrac{240^\\circ - 120^\\circ}{2} = 60^\\circ$'],
        ['Si el punto se acerca, el ángulo se abre: con arcos de 270° y 90° es recto.', { a: 90 }, '$\\tfrac{270^\\circ - 90^\\circ}{2} = 90^\\circ$'],
      ], 'Un ángulo exterior (dos secantes, secante y tangente o dos tangentes) mide la semidiferencia de sus arcos.'),
      xpHaz('dibujo', 'El arco cercano mide 40°. Abre las secantes hasta que el ángulo en P mida 60°.', { dib: afuera, v: { cual: 0, m: 100, n: 40, a: 60, oc: 1 }, metas: { m: 160 }, alto: 208,
        manijas: [{ k: 'm', min: 80, max: 240, paso: 10, en: v => at(C8, R8, 180 + v.m / 2), de: (x, y) => 2 * (gra(C8, x, y) - 180) }],
        lee: v => `$\\tfrac{${v.m}^\\circ - 40^\\circ}{2}$`, dice: v => `El arco lejano le lleva ${v.m - 40}° al cercano. El ángulo es la mitad.` }, 'La resta debe ser 120°: el arco lejano mide $120^\\circ + 40^\\circ = 160^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Desde un mirador P, las dos visuales tangentes a un lago circular deben formar 40°. Aleja o acerca el mirador hasta lograrlo.', { dib: afuera, v: { cual: 1, m: 140, n: 40, a: 80, oc: 1 }, metas: { a: 40 }, alto: 208,
        manijas: [{ k: 'a', min: 30, max: 130, paso: 10, en: v => [C9[0] + R9 / Math.sin(rad(v.a / 2)), 104], de: x => (x - C9[0] <= R9 ? 180 : 2 * Math.asin(R9 / (x - C9[0])) * 180 / Math.PI) }],
        lee: v => `$\\tfrac{${180 + v.a}^\\circ - ${180 - v.a}^\\circ}{2}$`, dice: v => `Orilla a la vista: ${180 - v.a}°. Orilla oculta: ${180 + v.a}°.` }, 'Los arcos deben restar 80° y sumar 360°: miden 220° y 140°.')],
  ], 'Sobre la circunferencia, la mitad del arco; adentro, la semisuma de los arcos; afuera, la semidiferencia.');
}
;
//#archivo js/explora-euc-6.js
// Geometría Euclidiana · mundo 6 «euc-metricas»: explicaciones Explora (spec 2026-11-26-curso-euclidiana). Los ejemplos no son los de los ejercicios.
{
  const R = Math.round, r1 = x => Math.round(x * 10) / 10, r2 = x => Math.round(x * 100) / 100, S = x => XPK.sig(r1(x));
  const mid = (P, Q, t = 0.5) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const gra = (V, P, Q) => { const d = Math.abs(Math.atan2(P[1] - V[1], P[0] - V[0]) - Math.atan2(Q[1] - V[1], Q[0] - V[0])) * 180 / Math.PI; return d > 180 ? 360 - d : d; };
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const columna = (...et) => et.map((e, i) => ({ x: 276, y: 28 + i * 46, w: 110, et: e, ex: -164, ey: 5 }));

  // ------------------------------------------------------------------------------------------------ euc-metricas-1
  // Dos parejas de segmentos: a con b y c con d.
  const barras = (v, K) => {
    const u = 15, b = (y, n, cls) => K.r(64, y, n * u, 20, cls, 4) + K.t(54, y + 15, R(n), '', 'end');
    return b(16, v.a, 'fa') + b(44, v.b, 'fa') + K.f(v.p2, b(92, v.c, 'fg') + b(120, v.d, 'fg'));
  };
  // Triángulo con D en AB (fracción t) y E en AC (fracción s); o tres paralelas y dos transversales (cual = 1).
  const TA = [150, 24], TB = [44, 178], TC = [296, 178];
  const corte = (v, K) => {
    if (v.cual > 0.5) {
      const X1 = y => 60 + (y - 30) * 0.32, X2 = y => 300 - (y - 30) * 0.5, ys = [40, 88, 160], par = y => K.l(20, y, 320, y, 'la');
      return ys.map(par).join('') + K.l(X1(24), 24, X1(182), 182) + K.l(X2(24), 24, X2(182), 182)
        + K.t(X1(64) - 10, 68, '4', 'tg', 'end') + K.t(X1(124) - 10, 128, '6', 'tg', 'end') + K.t(X2(64) + 10, 68, '6', 'tf', 'start') + K.t(X2(124) + 10, 128, '9', 'tf', 'start');
    }
    const D = mid(TA, TB, v.t), E = mid(TA, TC, v.s), iz = (P, Q, x) => { const m = mid(P, Q); return K.t(m[0] - 9, m[1] + 4, S(x), 'tg', 'end'); }, de = (P, Q, x) => { const m = mid(P, Q); return K.t(m[0] + 9, m[1] + 4, S(x), 'tf', 'start'); };
    return K.p([TA, TB, TC], 'fn') + K.l(...D, ...E, 'la gr') + K.c(...D, 4, 'fk') + K.c(...E, 4, 'fk') + K.t(D[0] - 44, D[1] + 4, 'D', 's tm') + K.t(E[0] + 46, E[1] + 4, 'E', 's tm')
      + K.f(v.n, iz(TA, D, v.ab * v.t) + iz(D, TB, v.ab * (1 - v.t)) + de(TA, E, v.ac * v.s) + de(E, TC, v.ac * (1 - v.s)));
  };
  // Triángulo de lados ab, ac y bc con un segmento desde A hasta el punto D del lado opuesto (BD = d).
  const bis = (v, K) => {
    const xa = (v.ab ** 2 - v.ac ** 2 + v.bc ** 2) / (2 * v.bc), ya = Math.sqrt(v.ab ** 2 - xa ** 2), u = 17, x0 = 170 - v.bc * u / 2, B = [x0, 172], C = [x0 + v.bc * u, 172], A = [x0 + xa * u, 172 - ya * u], D = [x0 + v.d * u, 172];
    const m1 = mid(A, B), m2 = mid(A, C);
    return K.f(v.g, K.ang(A, B, D, 34, `${R(gra(A, B, D))}°`, 'fa', 's ta') + K.ang(A, D, C, 34, `${R(gra(A, D, C))}°`, 'fg', 's tg')) + K.p([A, B, C], 'fn') + K.l(...A, ...D, 'la gr')
      + K.t(m1[0] - 9, m1[1], R(v.ab), '', 'end') + K.t(m2[0] + 9, m2[1], R(v.ac), '', 'start') + K.t((B[0] + D[0]) / 2, 192, S(v.d), 'ta') + K.t((D[0] + C[0]) / 2, 192, S(v.bc - v.d), 'tg');
  };

  xpLec('euc-metricas-1', [
    ['Razones y proporciones',
      xpMira('dibujo', 'Empecemos por comparar segmentos: una **razón** es una división, y una **proporción**, dos razones iguales.', { dib: barras, v: { a: 6, b: 9, c: 10, d: 15, p2: 0 }, alto: 156 }, [
        ['Comparar dos segmentos es dividir sus medidas: 6 entre 9 da dos tercios. Esa es su razón.', {}, '$\\tfrac69 = \\tfrac23$'],
        ['Otro par, 10 y 15, tiene la misma razón. Dos razones iguales forman una proporción.', { p2: 1 }, '$\\tfrac69 = \\tfrac{10}{15}$'],
        ['En toda proporción los productos en cruz coinciden: extremos por un lado, medios por el otro.', {}, '$6 \\cdot 15 = 9 \\cdot 10$'],
        ['Si el 15 se cambia por 14, los productos ya no coinciden: se rompe la proporción.', { d: 14 }, '$6 \\cdot 14 \\ne 9 \\cdot 10$'],
        ['Cuando los dos medios son el mismo número, ese número es la media proporcional.', { a: 4, b: 6, c: 6, d: 9 }, '$\\tfrac46 = \\tfrac69$'],
      ], 'Proporción: dos razones iguales. Extremos por extremos da lo mismo que medios por medios.'),
      xpHaz('dibujo', 'Los segmentos de 8 y 12 forman proporción con el de 10 y otro más. Ajusta ese cuarto segmento.', { dib: barras, v: { a: 8, b: 12, c: 10, d: 11, p2: 1 }, metas: { d: 15 }, alto: 200,
        manijas: [{ k: 'd', min: 10, max: 18, paso: 1, et: 'cuarto segmento' }], lee: v => `$8 \\cdot ${v.d} = ${8 * v.d}$ y $12 \\cdot 10 = 120$`, dice: () => 'Busca que los productos en cruz coincidan.' }, 'Cuarta proporcional: $8 \\cdot x = 12 \\cdot 10$, así que $x = 15$.')],
    ['Paralelas que reparten',
      xpMira('dibujo', 'Segunda idea: una **paralela** a un lado de un triángulo reparte los otros dos en la misma razón.', { dib: corte, v: { t: 0.4, s: 0.4, ab: 10, ac: 15, n: 0, cual: 0 }, alto: 200 }, [
        ['Una recta paralela a la base corta los otros dos lados del triángulo en D y en E.', {}],
        ['D partió su lado en 4 y 6; E partió el suyo en 6 y 9. La razón es la misma.', { n: 1 }, '$\\tfrac46 = \\tfrac69$'],
        ['Si la paralela baja, los cuatro trozos cambian, pero las dos razones siguen iguales.', { t: 0.7, s: 0.7 }, '$\\tfrac73 = \\tfrac{10.5}{4.5}$'],
        ['Y al revés: si una recta parte los dos lados en la misma razón, es paralela al tercero.', {}],
        ['Con varias paralelas y dos transversales pasa lo mismo: es el teorema de Tales.', { cual: 1 }, '$\\tfrac46 = \\tfrac69$'],
      ], 'Una paralela a un lado divide los otros dos en segmentos proporcionales; varias paralelas, igual (Tales).'),
      xpHaz('dibujo', 'D parte su lado en 6 y 2, y el otro lado mide 12. Mueve E hasta que DE quede paralela a la base.', { dib: (v, K) => corte({ t: 0.75, s: v.e / 12, ab: 8, ac: 12, n: 1, cual: 0 }, K), v: { e: 4 }, metas: { e: 9 }, alto: 246,
        manijas: [{ k: 'e', min: 1, max: 11, paso: 1, et: 'trozo de arriba' }], lee: v => `$\\tfrac62 = 3$ y $\\tfrac{${v.e}}{${12 - v.e}} = ${r2(v.e / (12 - v.e))}$`, dice: () => 'Las dos razones deben ser iguales.' }, 'De 8 partes, 6 quedan arriba: $\\tfrac68 \\cdot 12 = 9$.')],
    ['La bisectriz reparte',
      xpMira('dibujo', 'Tercera idea: la **bisectriz** de un ángulo reparte el lado opuesto según los lados vecinos.', { dib: bis, v: { ab: 8, ac: 12, bc: 15, d: 7.5, g: 0 }, alto: 204 }, [
        ['Desde un vértice sale un segmento hasta el punto medio del lado opuesto: es la mediana.', {}],
        ['La mediana no parte el ángulo en dos iguales: un pedazo quedó más abierto que el otro.', { g: 1 }],
        ['Corremos el punto hacia el lado más corto hasta que los dos ángulos sean iguales: es la bisectriz.', { d: 6 }],
        ['El lado opuesto quedó partido en 6 y 9: la misma razón de los lados vecinos, 8 y 12.', {}, '$\\tfrac69 = \\tfrac{8}{12}$'],
        ['Siempre pasa: la bisectriz reparte el lado opuesto en la razón de los lados que forman el ángulo.', {}],
      ], 'La bisectriz divide el lado opuesto en la razón de los lados adyacentes.'),
      xpHaz('fichas', 'Los lados que forman un ángulo miden 10 y 15, y el lado opuesto, 20. Pon los dos trozos que deja la bisectriz.', { slots: fila('junto al de 10', 'junto al de 15'), fichas: ['8', '12', '10', '5', '15'], meta: ['8', '12'], alto: 96, pista: 'Son 25 partes: 10 para un trozo y 15 para el otro.' }, '$\\tfrac{10}{25} \\cdot 20 = 8$ y $\\tfrac{15}{25} \\cdot 20 = 12$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una cerca paralela al frente divide un lote triangular. Parte un costado en 30 m y 20 m; el otro costado mide 75 m. Pon sus dos tramos.', { slots: fila('con los 30 m', 'con los 20 m'), fichas: ['45', '30', '50', '25', '55'], meta: ['45', '30'], alto: 96, pista: 'El costado queda en 5 partes: 3 y 2.' }, '$\\tfrac35 \\cdot 75 = 45$ y $\\tfrac25 \\cdot 75 = 30$.')],
  ], 'Proporciones, paralelas que reparten en la misma razón y bisectrices que reparten como los lados vecinos.');

  // ------------------------------------------------------------------------------------------------ euc-metricas-2
  // Triángulo de lados 4, 5 y 6 y su copia por k.  m: 1 dos ángulos, 2 un ángulo entre dos lados, 3 los tres lados.
  const sem = (v, K) => {
    const u = 11, px = 2.25, h = 3.307, m = R(v.m || 0), t = (x0, k, cls) => {
      const A = [x0, 152], B = [x0 + 6 * u * k, 152], C = [x0 + px * u * k, 152 - h * u * k], gr = (i, c) => (m === 3 || (m === 2 && i < 2) ? `${c} gr` : c);
      const mi = mid(A, C), md = mid(B, C);
      return K.f(Math.max(v.ang, m === 1 || m === 2 ? 1 : 0), K.ang(A, B, C, 16, '', 'fg') + (m === 2 ? '' : K.ang(B, A, C, 16, '', 'ff')) + (v.ang > 0.5 && m === 0 ? K.ang(C, A, B, 12, '', 'fo') : ''))
        + K.p([A, B, C], cls) + (m >= 2 ? K.l(...A, ...C, gr(0, 'la')) + K.l(...A, ...B, gr(1, 'la')) + (m === 3 ? K.l(...B, ...C, 'la gr') : '') : '')
        + K.f(v.alt, K.l(C[0], C[1], C[0], 152, 'lf d'))
        + K.f(v.lab, K.t(mi[0] - 6, mi[1] + 2, S(4 * k), 's', 'end') + K.t(md[0] + 6, md[1] + 2, S(5 * k), 's', 'start') + K.t((A[0] + B[0]) / 2, 167, S(6 * k), 's'));
    };
    return t(18, 1, 'fn') + t(124, v.k, 'fa');
  };
  const SEM = { k: 2, lab: 0, ang: 0, alt: 0, m: 0 };
  // Sombras a la misma hora: un bastón y algo más alto.  u px por metro
  const sombra = (u, h0, s0, s, x1) => (v, K) => {
    const Y = 168, palo = (x, h, sm, cls) => K.l(x, Y, x, Y - h * u, `${cls} gr`) + K.l(x, Y + 5, x + sm * u, Y + 5, 'lm gr') + K.f(v.ray ?? 1, K.l(x, Y - h * u, x + sm * u, Y, 'lg d'));
    return K.l(10, Y, 330, Y, 'lm') + palo(30, h0, s0, 'lf') + palo(x1, v.h, s, 'la') + K.t(30 + s0 * u / 2, Y + 22, `${s0} m`, 's tm') + K.t(x1 + s * u / 2, Y + 22, `${s} m`, 's tm')
      + K.t(24, Y - h0 * u - 6, `${h0} m`, 's tf', 'start') + K.t(x1 + 8, Y - v.h * u - 6, v.ver === 0 ? '?' : `${S(v.h)} m`, 's ta', 'start');
  };

  xpLec('euc-metricas-2', [
    ['La misma forma',
      xpMira('dibujo', 'Empecemos por la idea: dos figuras son **semejantes** si tienen la misma forma, aunque cambie el tamaño.', { dib: sem, v: { ...SEM }, alto: 180 }, [
        ['Estos dos triángulos tienen la misma forma. Uno es una ampliación del otro.', {}],
        ['Cada lado del grande es el doble de su homólogo. Ese 2 es la razón de semejanza.', { lab: 1 }, '$\\tfrac84 = \\tfrac{10}{5} = \\tfrac{12}{6} = 2$'],
        ['Los ángulos no cambian al ampliar: los correspondientes son congruentes.', { ang: 1 }],
        ['Con razón 1.5 los lados miden 6, 7.5 y 9. Siguen siendo proporcionales a 4, 5 y 6.', { k: 1.5 }, '$\\tfrac64 = \\tfrac{7.5}{5} = \\tfrac96$'],
        ['Las alturas y los perímetros guardan esa misma razón: el perímetro pasa de 15 a 22.5.', { alt: 1 }, '$15 \\cdot 1.5 = 22.5$'],
      ], 'Semejantes: ángulos correspondientes congruentes y lados homólogos proporcionales.'),
      xpHaz('dibujo', 'El lado de 5 debe convertirse en uno de 12.5. Ajusta la razón de semejanza.', { dib: (v, K) => sem({ ...SEM, k: v.k, lab: 1 }, K), v: { k: 1 }, metas: { k: 2.5 }, alto: 222,
        manijas: [{ k: 'k', min: 1, max: 2.5, paso: 0.5, et: 'razón de semejanza' }], lee: v => `$5 \\cdot ${v.k} = ${5 * v.k}$`, dice: () => 'Mira en cuánto queda el lado homólogo del de 5.' }, 'La razón es $12.5 \\div 5 = 2.5$: todos los lados se multiplican por ella.')],
    ['Tres criterios',
      xpMira('dibujo', 'Segunda idea: para asegurar la semejanza de dos triángulos **no hay que medirlo todo**.', { dib: sem, v: { ...SEM, k: 1.5, lab: 1 }, alto: 180 }, [
        ['Para saber si dos triángulos son semejantes bastan tres datos bien escogidos.', {}],
        ['A-A: si dos ángulos de uno son congruentes con dos del otro, el tercero también coincide.', { m: 1 }],
        ['L-A-L: un ángulo congruente, y los dos lados que lo forman, proporcionales.', { m: 2 }, '$\\tfrac64 = \\tfrac96$'],
        ['L-L-L: los tres pares de lados homólogos en la misma razón, sin mirar ningún ángulo.', { m: 3 }, '$\\tfrac64 = \\tfrac{7.5}{5} = \\tfrac96$'],
        ['Cuidado: dos lados proporcionales y un ángulo que no está entre ellos no aseguran nada.', { m: 0 }],
      ], 'Criterios de semejanza: A-A, L-A-L (el ángulo entre los lados) y L-L-L.'),
      xpHaz('fichas', 'Pon el criterio que asegura la semejanza de cada pareja de triángulos.', { slots: columna('Ángulos de 30° y 80° en los dos', 'Lados 3, 4, 5 y lados 9, 12, 15', 'Lados 2 y 3 con 70°; 4 y 6 con 70°'), fichas: ['A-A', 'L-L-L', 'L-A-L', 'ninguno'], meta: ['A-A', 'L-L-L', 'L-A-L'], alto: 150, pista: 'Mira qué se conoce: solo ángulos, solo lados o dos lados y su ángulo.' }, 'Dos ángulos: A-A. Tres lados: L-L-L. Dos lados y el ángulo que forman: L-A-L.')],
    ['Medir sin subir',
      xpMira('dibujo', 'Tercera idea: la semejanza sirve para **medir lo que no se alcanza**.', { dib: sombra(22, 1, 2, 8, 120), v: { h: 2.5, ray: 0, ver: 0 }, alto: 200 }, [
        ['Un bastón de 1 m da una sombra de 2 m. A la misma hora, un árbol da 8 m de sombra.', {}],
        ['Los rayos del sol llegan paralelos: forman el mismo ángulo con el piso en los dos casos.', { ray: 1 }],
        ['Los dos triángulos tienen además un ángulo recto: son semejantes por A-A.', {}],
        ['La sombra del árbol es 4 veces la del bastón. Su altura también es 4 veces mayor.', { h: 4, ver: 1 }, '$8 \\div 2 = 4$'],
        ['El árbol mide 4 m, y nadie tuvo que subirse a medirlo.', {}, '$1 \\cdot 4 = 4$'],
      ], 'A la misma hora, alturas y sombras forman triángulos semejantes (A-A).'),
      xpHaz('dibujo', 'Una persona de 1.5 m da 2 m de sombra; una torre, 10 m de sombra. Sube la torre hasta su altura.', { dib: sombra(15, 1.5, 2, 10, 110), v: { h: 2 }, metas: { h: 7.5 }, alto: 250,
        manijas: [{ k: 'h', min: 2, max: 9, paso: 0.5, et: 'altura de la torre' }], lee: v => `$\\tfrac{${v.h}}{10} = ${r2(v.h / 10)}$ y $\\tfrac{1.5}{2} = 0.75$`, dice: () => 'Los dos rayos punteados deben quedar paralelos.' }, 'La sombra es 5 veces mayor: $1.5 \\cdot 5 = 7.5$ m.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En un plano, un lote triangular tiene lados de 6, 8 y 10 cm. En el terreno, el lado menor mide 45 m. Pon los otros dos lados y el perímetro reales.', { slots: fila('lado de 8', 'lado de 10', 'perímetro'), fichas: ['60', '75', '180', '47', '49', '24'], meta: ['60', '75', '180'], alto: 96, pista: 'Cada centímetro del plano son 7.5 m del terreno.' }, '$45 \\div 6 = 7.5$: $8 \\cdot 7.5 = 60$, $10 \\cdot 7.5 = 75$ y $24 \\cdot 7.5 = 180$.')],
  ], 'Semejantes: mismos ángulos y lados proporcionales. Se asegura con A-A, L-A-L o L-L-L.');

  // ------------------------------------------------------------------------------------------------ euc-metricas-3
  // Triángulo rectángulo con la hipotenusa c en el piso; el vértice recorre la semicircunferencia. m: proyección izquierda.
  const rect = (v, K) => {
    const u = 260 / v.c, X0 = 40, Y = 160, n = v.c - v.m, hh = Math.sqrt(Math.max(0, v.m * n)), A = [X0, Y], B = [X0 + v.c * u, Y], H = [X0 + v.m * u, Y], C = [H[0], Y - hh * u];
    return K.arc(X0 + v.c * u / 2, Y, v.c * u / 2, 0, 180, 'lm d') + K.f(v.sem ?? 0, K.p([A, H, C], 'fa') + K.p([H, B, C], 'fg')) + K.p([A, B, C], 'fn') + K.l(...C, ...H, 'lf gr') + K.f(v.cat ?? 0, K.l(...A, ...C, 'la gr'))
      + K.l(A[0], Y + 7, H[0], Y + 7, 'la gr') + K.l(H[0], Y + 7, B[0], Y + 7, 'lg gr') + K.t((A[0] + H[0]) / 2, Y + 25, S(v.m), 'ta') + K.t((H[0] + B[0]) / 2, Y + 25, S(n), 'tg')
      + K.t(H[0] + 8, (C[1] + Y) / 2 + 5, (v.ver ?? 0) > 0.5 ? `h = ${S(hh)}` : 'h', 'tf', 'start') + K.t(170, 16, v.t || '', 'ta');
  };
  // Los dos triángulos notables.
  const notable = (v, K) => {
    const ver = v.lab > 0.5;
    if (v.q < 0.5) { const A = [110, 170], s = 120; return K.r(A[0], A[1] - s, s, s, 'fn', 0) + K.p([A, [A[0] + s, A[1]], [A[0] + s, A[1] - s]], 'fa') + K.ang(A, [A[0] + s, A[1]], [A[0] + s, A[1] - s], 26, '45°', 'fg', 's') + K.t(A[0] + s / 2, 188, '1', 'ta') + K.t(A[0] + s + 12, A[1] - s / 2 + 5, '1', 'ta') + K.t(A[0] + s / 2 - 16, A[1] - s / 2 - 6, ver ? '√2' : '?', 'tf'); }
    const A = [90, 172], B = [250, 172], C = [170, 33.4], M = [170, 172];
    return K.p([A, B, C], 'fn') + K.p([A, M, C], 'fa') + K.l(...C, ...M, 'lf gr') + K.ang(A, M, C, 24, '60°', 'fg', 's') + K.ang(C, A, M, 30, '30°', 'ff', 's') + K.t(118, 100, '2', 'ta', 'end') + K.t(130, 192, ver ? '1' : '?', 'ta') + K.t(180, 110, ver ? '√3' : '?', 'tf', 'start');
  };

  xpLec('euc-metricas-3', [
    ['La altura sobre la hipotenusa',
      xpMira('dibujo', 'Empecemos por una altura especial: la que cae sobre la **hipotenusa** de un triángulo rectángulo.', { dib: rect, v: { c: 10, m: 2, sem: 0, cat: 0, ver: 0, t: '' }, alto: 196 }, [
        ['La altura que cae sobre la hipotenusa la parte en dos trozos: las proyecciones de los catetos.', {}],
        ['Se forman dos triángulos pequeños. Los dos son semejantes al grande: comparten sus ángulos.', { sem: 1 }],
        ['Al comparar los dos pequeños sale una proporción: 2 es a la altura como la altura es a 8.', {}, '$\\tfrac{2}{h} = \\tfrac{h}{8}$'],
        ['La altura por sí misma da 2 por 8: mide 4. Es media proporcional entre las proyecciones.', { ver: 1 }, '$h^2 = 2 \\cdot 8 = 16$'],
        ['Al comparar un pequeño con el grande: cada cateto al cuadrado es la hipotenusa por su proyección.', { cat: 1, sem: 0 }, '$a^2 = 10 \\cdot 2 = 20$'],
      ], 'Altura: $h^2 = m \\cdot n$. Cateto: $a^2 = c \\cdot m$, la hipotenusa por su proyección.'),
      xpHaz('dibujo', 'La hipotenusa mide 15. Mueve el pie de la altura hasta que la altura mida 6, con la proyección menor a la izquierda.', { dib: rect, v: { c: 15, m: 7 }, metas: { m: 3 }, alto: 240,
        manijas: [{ k: 'm', min: 1, max: 14, paso: 1, et: 'proyección de la izquierda' }], lee: v => `$${v.m} \\cdot ${15 - v.m} = ${v.m * (15 - v.m)}$`, dice: () => 'El producto de las dos proyecciones debe dar 36.' }, '$3 \\cdot 12 = 36 = 6^2$: las proyecciones miden 3 y 12.')],
    ['De ahí sale Pitágoras',
      xpMira('dibujo', 'Segunda idea: con esas relaciones se **demuestra** el teorema de Pitágoras.', { dib: rect, v: { c: 10, m: 2, sem: 0, cat: 0, ver: 0, t: '' }, alto: 196 }, [
        ['La misma hipotenusa de 10, partida por la altura en proyecciones de 2 y 8.', {}],
        ['Un cateto al cuadrado es la hipotenusa por su proyección: 10 por 2.', { t: 'a² = 10 · 2 = 20', cat: 1 }, '$a^2 = 20$'],
        ['El otro cateto al cuadrado es 10 por 8.', { t: 'b² = 10 · 8 = 80', cat: 0 }, '$b^2 = 80$'],
        ['Sumados dan 100: justo el cuadrado de la hipotenusa. Ese es el teorema de Pitágoras.', { t: '20 + 80 = 100' }, '$a^2 + b^2 = c^2$'],
        ['Y al revés: si tres lados cumplen esa suma, el triángulo tiene un ángulo recto.', { t: '' }, '$6^2 + 8^2 = 10^2$'],
        ['Si el cuadrado del lado mayor es menor que la suma, es acutángulo; si es mayor, obtusángulo.', {}],
      ], 'Pitágoras: $a^2 + b^2 = c^2$. Su recíproco sirve para saber si un triángulo es rectángulo.'),
      xpHaz('fichas', 'Clasifica cada triángulo según sus lados.', { slots: columna('Lados 6, 8 y 10', 'Lados 6, 8 y 9', 'Lados 6, 8 y 12'), fichas: ['rectángulo', 'acutángulo', 'obtusángulo', 'no cierra'], meta: ['rectángulo', 'acutángulo', 'obtusángulo'], alto: 150, pista: 'Compara el cuadrado del lado mayor con 100, que es 36 más 64.' }, 'Igual a la suma: rectángulo. Menor: acutángulo. Mayor: obtusángulo.')],
    ['Dos triángulos notables',
      xpMira('dibujo', 'Tercera idea: dos triángulos rectángulos aparecen tanto que conviene **conocerlos de memoria**.', { dib: notable, v: { q: 0, lab: 0 }, alto: 200 }, [
        ['Un cuadrado de lado 1, cortado por su diagonal, da dos triángulos de 45°, 45° y 90°.', {}],
        ['Por Pitágoras, la diagonal al cuadrado es 1 más 1: mide raíz de 2.', { lab: 1 }, '$d = \\sqrt2$'],
        ['Si el cateto es otro, todo se multiplica: con cateto 5, la hipotenusa mide 5 por raíz de 2.', {}, '$5\\sqrt2$'],
        ['Un triángulo equilátero de lado 2, cortado por su altura, da dos de 30°, 60° y 90°.', { q: 1, lab: 0 }],
        ['El cateto menor es la mitad del lado: 1. La altura, por Pitágoras, mide raíz de 3.', { lab: 1 }, '$\\sqrt{2^2 - 1^2} = \\sqrt3$'],
        ['Sus lados van siempre como 1, raíz de 3 y 2. El menor queda frente al ángulo de 30°.', {}],
      ], 'En el 45°-45°-90°: x, x y $x\\sqrt2$. En el 30°-60°-90°: x, $x\\sqrt3$ y 2x.'),
      xpHaz('fichas', 'En un triángulo de 30°, 60° y 90° la hipotenusa mide 10. Pon el cateto menor y el cateto mayor.', { slots: fila('frente a 30°', 'frente a 60°'), fichas: ['5', '5√3', '10√3', '5√2', '20'], meta: ['5', '5√3'], alto: 96, pista: 'El cateto menor es la mitad de la hipotenusa.' }, 'El menor es la mitad, 5; el mayor, $5\\sqrt3$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un tejado forma ángulo recto en la cumbrera. Un poste vertical baja de ella a la viga horizontal y la parte en 27 dm y 48 dm. Pon el poste y los dos faldones.', { slots: fila('poste', 'faldón corto', 'faldón largo'), fichas: ['36', '45', '60', '37.5', '75', '21'], meta: ['36', '45', '60'], alto: 96, pista: 'El poste es la altura sobre la hipotenusa: su cuadrado es 27 por 48.' }, '$27 \\cdot 48 = 36^2$; $75 \\cdot 27 = 45^2$ y $75 \\cdot 48 = 60^2$.')],
  ], 'Altura y catetos son medias proporcionales; de ahí salen Pitágoras, su recíproco y los triángulos notables.');

  // ------------------------------------------------------------------------------------------------ euc-metricas-4
  const rad = g => g * Math.PI / 180;
  // Circunferencia de radio 10 con P a 6 del centro: una cuerda horizontal y otra que gira (ángulo g).
  const cuerdas = (v, K) => {
    const u = 8, O = [170, 104], P = [O[0] + 6 * u, O[1]], c = Math.cos(rad(v.g)), s = Math.sin(rad(v.g)), q = Math.sqrt(36 * c * c + 64), t1 = -6 * c + q, t2 = 6 * c + q;
    const C = [P[0] + t1 * u * c, P[1] - t1 * u * s], D = [P[0] - t2 * u * c, P[1] + t2 * u * s], A = [O[0] - 10 * u, O[1]], B = [O[0] + 10 * u, O[1]];
    return K.arc(...O, 10 * u, 0, 360, 'lm') + K.l(...A, ...P, 'la gr') + K.l(...P, ...B, 'la gr') + K.l(...C, ...P, 'lg gr') + K.l(...P, ...D, 'lg gr') + K.c(...P, 4, 'fk') + K.t(P[0] + 10, P[1] + 17, 'P', 's tm')
      + K.f(v.ver, K.t(8, 18, '16 · 4 = 64', 'ta', 'start') + K.t(332, 18, `${S(t1)} · ${S(t2)} = 64`, 'tg', 'end'));
  };
  // P a 26 del centro de una circunferencia de radio 10: la secante por el centro y otra que se abre (ángulo g) hasta ser tangente.
  const afuera = (v, K) => {
    const u = 5.4, P = [26, 130], O = [P[0] + 26 * u, P[1]], c = Math.cos(rad(v.g)), s = Math.sin(rad(v.g)), q = Math.sqrt(Math.max(0, 676 * c * c - 576)), t1 = 26 * c - q, t2 = 26 * c + q, en = t => [P[0] + t * u * c, P[1] - t * u * s];
    return K.arc(...O, 10 * u, 0, 360, 'lm') + K.l(...P, O[0] + 10 * u, O[1], 'la') + K.c(O[0] - 10 * u, O[1], 4, 'fA') + K.c(O[0] + 10 * u, O[1], 4, 'fA')
      + K.l(...P, ...en(Math.max(t2, 30)), 'lg gr') + K.c(...en(t1), 4, 'fG') + K.c(...en(t2), 4, 'fG') + K.c(...P, 4, 'fk') + K.t(P[0], P[1] + 18, 'P', 's tm')
      + K.f(v.ver, K.t(8, 18, '16 · 36 = 576', 'ta', 'start') + K.t(332, 18, `${S(t1)} · ${S(t2)} = 576`, 'tg', 'end'));
  };
  // Polígono regular inscrito, con dos radios, el ángulo central y la apotema.
  const pol = (v, K) => {
    const n = R(v.n), O = [170, 104], P = Array.from({ length: n }, (_, i) => K.at(...O, 84, -90 - 180 / n + i * 360 / n)), M = mid(P[0], P[1]);
    return K.arc(...O, 84, 0, 360, 'lm') + K.ang(O, P[0], P[1], 22, (v.lab ?? 0) > 0.5 ? `${r1(360 / n)}°` : '', 'fa', 's ta') + K.p(P, 'fn') + K.l(...O, ...P[0], 'la') + K.l(...O, ...P[1], 'la') + K.l(...P[0], ...P[1], 'lg gr')
      + K.f(v.ap ?? 0, K.l(...O, ...M, 'lf gr')) + K.c(...O, 3.5, 'fk') + K.t(8, 18, `${n} lados`, 's tm', 'start');
  };

  xpLec('euc-metricas-4', [
    ['Cuerdas que se cortan',
      xpMira('dibujo', 'Empecemos con dos **cuerdas** que se cortan dentro de una circunferencia.', { dib: cuerdas, v: { g: 90, ver: 0 }, alto: 200 }, [
        ['Dos cuerdas se cortan en un punto P. Cada una queda partida en dos trozos.', {}],
        ['En la horizontal los trozos miden 16 y 4; en la otra, 8 y 8. Los dos productos dan 64.', { ver: 1 }, '$16 \\cdot 4 = 8 \\cdot 8$'],
        ['Giramos la segunda cuerda: ahora sus trozos miden 6.4 y 10. El producto sigue siendo 64.', { g: 72.54 }, '$6.4 \\cdot 10 = 64$'],
        ['Otra vez: 5 y 12.8. En todas las cuerdas que pasan por P el producto es el mismo.', { g: 49.46 }, '$5 \\cdot 12.8 = 64$'],
        ['La razón: al unir los extremos se forman dos triángulos semejantes, por A-A.', {}, '$PA \\cdot PB = PC \\cdot PD$'],
      ], 'Si dos cuerdas se cortan, el producto de los trozos de una es igual al de los trozos de la otra.'),
      xpHaz('fichas', 'Dos cuerdas se cortan en P. Una queda partida en 6 y 10; de la otra, un trozo mide 5. Pon el producto común y el otro trozo.', { slots: fila('producto', 'otro trozo'), fichas: ['60', '12', '11', '16', '50'], meta: ['60', '12'], alto: 96, pista: 'Multiplica los dos trozos de la cuerda que conoces completa.' }, '$6 \\cdot 10 = 60 = 5 \\cdot 12$.')],
    ['Desde afuera',
      xpMira('dibujo', 'Segunda idea: desde un punto **exterior** pasa lo mismo con secantes y tangentes.', { dib: afuera, v: { g: 0, ver: 0 }, alto: 200 }, [
        ['Ahora P está fuera. Una secante entra a la circunferencia por un punto y sale por otro.', {}],
        ['De P al punto cercano hay 16; de P al lejano, 36. Las dos se miden desde P.', { ver: 1 }, '$16 \\cdot 36 = 576$'],
        ['Otra secante desde P: 18 hasta el punto cercano y 32 hasta el lejano. También 576.', { g: 15.94 }, '$18 \\cdot 32 = 576$'],
        ['Ese producto no depende de la secante: se llama la potencia del punto P.', {}],
        ['Si la secante se abre hasta rozar la circunferencia, los dos puntos se juntan: es tangente.', { g: 22.62 }, '$24 \\cdot 24 = 576$'],
        ['Por eso el cuadrado del segmento tangente es la secante por su parte exterior.', {}, '$PT^2 = PA \\cdot PB$'],
      ], 'Potencia de P: $PA \\cdot PB$ es igual en toda secante, y vale $PT^2$ en la tangente.'),
      xpHaz('fichas', 'Una secante desde P mide 4 hasta el punto cercano y 25 hasta el lejano. Pon la potencia de P y el segmento tangente.', { slots: fila('potencia', 'tangente'), fichas: ['100', '10', '29', '14.5', '84', '21'], meta: ['100', '10'], alto: 96, pista: 'La potencia es el producto de las dos distancias medidas desde P.' }, '$4 \\cdot 25 = 100 = 10^2$.')],
    ['Polígonos regulares inscritos',
      xpMira('dibujo', 'Tercera idea: con el **radio** se conocen el lado y la apotema de un polígono regular inscrito.', { dib: pol, v: { n: 6, lab: 0, ap: 0 }, alto: 200 }, [
        ['Un polígono regular inscrito tiene sus vértices sobre la circunferencia, repartidos por igual.', {}],
        ['Desde el centro, cada lado se ve con el mismo ángulo: en el hexágono, 360° entre 6.', { lab: 1 }, '$360^\\circ \\div 6 = 60^\\circ$'],
        ['Dos radios y un lado forman un triángulo equilátero: el lado del hexágono es el radio.', {}, '$l_6 = r$'],
        ['En el cuadrado el ángulo central es recto: el lado es la hipotenusa de dos radios.', { n: 4 }, '$l_4 = r\\sqrt2$'],
        ['En el triángulo equilátero el ángulo central mide 120° y el lado, el radio por raíz de 3.', { n: 3 }, '$l_3 = r\\sqrt3$'],
        ['La apotema va del centro al punto medio de un lado: es más corta que el radio.', { ap: 1 }],
      ], 'Ángulo central: 360° entre n. Lados: $l_6 = r$, $l_4 = r\\sqrt2$ y $l_3 = r\\sqrt3$.'),
      xpHaz('dibujo', 'Ajusta el número de lados hasta que el ángulo central mida 45°.', { dib: (v, K) => pol({ n: v.n, lab: 1 }, K), v: { n: 3 }, metas: { n: 8 }, alto: 250,
        manijas: [{ k: 'n', min: 3, max: 12, paso: 1, et: 'lados' }], lee: v => `$360^\\circ \\div ${v.n} ${Number.isInteger(360 / v.n) ? '=' : '\\approx'} ${r1(360 / v.n)}^\\circ$`, dice: v => `Con ${v.n} lados, cada ángulo central mide ${r1(360 / v.n)}°.` }, '$360^\\circ \\div 45^\\circ = 8$ lados.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una fuente circular de radio 6 m tiene adentro una jardinera con forma de hexágono regular inscrito. Pon el lado, el perímetro y la apotema de la jardinera.', { slots: fila('lado', 'perímetro', 'apotema'), fichas: ['6', '36', '3√3', '6√3', '12', '3'], meta: ['6', '36', '3√3'], alto: 96, pista: 'Dos radios y un lado del hexágono forman un triángulo equilátero.' }, 'Lado 6, perímetro $6 \\cdot 6 = 36$ y apotema $3\\sqrt3$, la altura del triángulo equilátero.')],
  ], 'Por un punto, el producto de las distancias a la circunferencia es constante; con el radio se conoce cada polígono regular.');
}
;
//#archivo js/explora-euc-7.js
// Geometría Euclidiana · mundo 7 «euc-areas»: explicaciones Explora (spec 2026-11-26-curso-euclidiana), con las escenas «dibujo» y
// «fichas». Los ejemplos no son los de los ejercicios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const R = Math.round, N = x => String(Math.round(x * 100) / 100);
  const camino = (d, cls) => `<path class="xf ${cls}" d="${d}"/>`;

  // ----------------------------------------------------------------------------------------------------- euc-areas-1
  // Rectángulo de 5 por 3 que se inclina (s), con la pieza que se pasa de lado (m) y la diagonal (dg).
  const base = (v, K) => {
    const u = 30, x = 70, yb = 140, yt = 50, s = v.s * u, W = 5 * u; let g = '';
    for (let i = 1; i < 5; i++) g += K.l(x + i * u, yb, x + i * u, yt, 'lr');
    for (let j = 1; j < 3; j++) g += K.l(x, yb - j * u, x + W, yb - j * u, 'lr');
    return K.p([[x, yb], [x + W, yb], [x + W + s, yt], [x + s, yt]], 'fa') + K.f(1 - v.s * 3, g)
      + K.f(v.m, K.r(x, yt, W, yb - yt, 'fn d', 0) + K.p([[x + W, yb], [x + W + s, yt], [x + W, yt]], 'ff') + K.p([[x, yb], [x + s, yt], [x, yt]], 'fo'))
      + K.f(v.dg, K.p([[x, yb], [x + W, yb], [x + W + s, yt]], 'fg') + K.l(x, yb, x + W + s, yt, 'lf gr'))
      + K.t(x + W / 2, yb + 18, '5', 'ta') + K.l(x - 12, yb, x - 12, yt, 'lm d') + K.t(x - 20, (yb + yt) / 2 + 5, '3', 'ta', 'end');
  };
  const sube = (v, K) => K.p([[66, 180], [274, 180], [170, 180 - v.h * 18]], 'fa') + K.l(170, 180, 170, 180 - v.h * 18, 'lf d') + K.t(170, 198, '8', 'ta') + K.t(182, 180 - v.h * 9 + 5, R(v.h), 'tf', 'start');
  // Rombo en su caja (cual 0), trapecio con su copia (1) y triángulo de lados 5, 5 y 6 (2).
  const romtra = (v, K) => {
    if (v.cual < 0.5) return K.f(v.caja, K.r(82, 34, 176, 132, 'fn d', 0)) + K.p([[82, 100], [170, 34], [258, 100], [170, 166]], 'fa') + K.l(82, 100, 258, 100, 'lg') + K.l(170, 34, 170, 166, 'lf') + K.t(214, 94, '8', 'tg') + K.t(178, 140, '6', 'tf', 'start');
    if (v.cual < 1.5) return K.f(v.cp, K.p([[180, 150], [240, 150], [260, 70], [120, 70]], 'fg') + K.t(210, 168, '3', 'tg') + K.t(190, 62, '7', 'tg'))
      + K.p([[40, 150], [180, 150], [120, 70], [60, 70]], 'fa') + K.t(110, 168, '7', 'ta') + K.t(90, 62, '3', 'ta') + K.l(60, 70, 60, 150, 'lm d') + K.t(52, 115, '4', 'tm', 'end');
    return K.p([[80, 160], [260, 160], [170, 40]], 'fa') + K.t(170, 178, '6', 'ta') + K.t(112, 96, '5', 'ta', 'end') + K.t(228, 96, '5', 'ta', 'start') + K.t(170, 120, 'p = 8', 'tm');
  };
  // Polígono regular de n lados con su apotema; sector, segmento y corona.
  const polcir = (v, K) => {
    const C = [170, 100], Rr = 80, n = R(v.n);
    if (v.cor > 0.5) return K.c(...C, Rr, 'fa') + K.c(...C, 48, 'fc') + K.l(...C, ...K.at(...C, Rr, 30), 'la') + K.t(...K.at(C[0], C[1] + 4, Rr + 12, 30), 'R', 'ta') + K.l(...C, ...K.at(...C, 48, 150), 'lf') + K.t(...K.at(C[0], C[1] - 8, 26, 150), 'r', 'tf') + K.c(...C, 3, 'fk');
    const P = Array.from({ length: n }, (_, i) => K.at(...C, Rr, -90 - 180 / n + i * 360 / n));
    const fig = n >= 24 ? K.c(...C, Rr, 'fa') : K.p(P, 'fa');
    const a = Rr * Math.cos(Math.PI / n);
    return fig + K.f(v.tri, P.map(q => K.l(...C, ...q, 'lm')).join('') + K.p([C, P[0], P[1]], 'fg') + K.l(C[0], C[1], C[0], C[1] + a, 'lf gr') + K.t(C[0] + 8, C[1] + a / 2 + 5, 'a', 'tf', 'start'))
      + (v.sec > 1 ? K.sec(...C, Rr, 0, v.sec, 'fg') + K.t(...K.at(C[0], C[1] + 5, 46, v.sec / 2), `${R(v.sec)}°`, 'tg') : '')
      + K.f(v.seg, K.p([C, K.at(...C, Rr, 0), K.at(...C, Rr, v.sec)], 'fo')) + K.c(...C, 3, 'fk');
  };
  const SC = [170, 104];
  const sect = (v, K) => K.c(...SC, 84, 'fc') + K.sec(...SC, 84, 0, v.g, 'fa') + K.l(...SC, 254, 104) + K.t(214, 122, 'r = 6', 's tm') + K.t(...K.at(SC[0], SC[1] + 4, 40, Math.max(20, v.g / 2)), `${R(v.g)}°`, 'ta');

  xpLec('euc-areas-1', [
    ['De base por altura',
      xpMira('dibujo', 'Medir un área es **contar cuadrados**. De ahí salen todas las fórmulas.', { dib: base, v: { s: 0, m: 0, dg: 0 }, alto: 190 }, [
        ['Medir un área es contar cuántos cuadrados unidad caben. En este rectángulo caben 5 por 3.', {}, '$5 \\cdot 3 = 15$'],
        ['Inclinamos los lados: ahora es un paralelogramo, con la misma base y la misma altura.', { s: 2 }],
        ['El triángulo que sobra a un lado llena el hueco del otro: vale lo mismo que el rectángulo.', { m: 1 }, '$b \\cdot h = 15$'],
        ['Una diagonal parte el paralelogramo en dos triángulos congruentes.', { m: 0, dg: 1 }],
        ['Por eso el triángulo vale la mitad de base por altura.', {}, '$\\tfrac{5 \\cdot 3}{2} = 7.5$'],
      ], 'Rectángulo y paralelogramo: base por altura. Triángulo: la mitad. Figuras con igual área son equivalentes.'),
      xpHaz('dibujo', 'Sube el vértice hasta que el triángulo de base 8 tenga área 20.', { dib: sube, v: { h: 2 }, metas: { h: 5 }, alto: 210,
        manijas: [{ k: 'h', min: 1, max: 8, paso: 1, en: v => [170, 180 - v.h * 18], de: (x, y) => (180 - y) / 18 }],
        lee: v => `$\\tfrac{8 \\cdot ${v.h}}{2} = ${4 * v.h}$`, dice: v => `Base 8 y altura ${v.h}: la mitad de su producto.` }, 'La mitad de base por altura: $\\tfrac{8 \\cdot 5}{2} = 20$.')],
    ['Rombo, trapecio y Herón',
      xpMira('dibujo', 'Otras figuras se convierten en **mitades** de algo conocido.', { dib: romtra, v: { cual: 0, caja: 0, cp: 0 }, alto: 190 }, [
        ['Un rombo de diagonales 8 y 6 cabe justo en la caja que ellas forman.', { caja: 1 }],
        ['Ocupa la mitad de la caja: su área es el semiproducto de las diagonales.', {}, '$\\tfrac{8 \\cdot 6}{2} = 24$'],
        ['Ahora un trapecio de bases 7 y 3 y altura 4.', { cual: 1 }],
        ['Con una copia volteada se arma un paralelogramo de base 7 más 3.', { cp: 1 }],
        ['El trapecio es la mitad: semisuma de las bases por la altura.', {}, '$\\tfrac{(7 + 3) \\cdot 4}{2} = 20$'],
        ['Si de un triángulo solo se conocen los lados, la fórmula de Herón usa el semiperímetro p.', { cual: 2 }, '$\\sqrt{p(p-a)(p-b)(p-c)}$'],
        ['Con lados 5, 5 y 6, p vale 8 y el área sale 12.', {}, '$\\sqrt{8 \\cdot 3 \\cdot 3 \\cdot 2} = 12$'],
      ], 'Rombo: semiproducto de las diagonales. Trapecio: semisuma de las bases por la altura. Herón: con el semiperímetro.'),
      xpHaz('fichas', 'Un triángulo tiene lados 6, 8 y 10. Pon el semiperímetro, el producto que va bajo la raíz de Herón y el área.', { slots: fila('semiperímetro', 'bajo la raíz', 'área'), fichas: ['12', '576', '24', '48', '288', '14'], meta: ['12', '576', '24'], alto: 96, pista: 'El semiperímetro es la mitad de la suma de los lados.' }, '$p = 12$ y $\\sqrt{12 \\cdot 6 \\cdot 4 \\cdot 2} = \\sqrt{576} = 24$.')],
    ['Polígono regular y círculo',
      xpMira('dibujo', 'Del **polígono regular** al círculo solo hay un paso.', { dib: polcir, v: { n: 6, tri: 1, sec: 0, seg: 0, cor: 0 }, alto: 200 }, [
        ['Un polígono regular se parte en triángulos iguales desde el centro. Su altura es la apotema.', {}],
        ['Sumando los triángulos sale el semiperímetro por la apotema.', {}, '$A = p \\cdot a$'],
        ['Con más y más lados, el polígono se parece a un círculo y la apotema al radio.', { n: 24, tri: 0 }],
        ['El semiperímetro del círculo es π por r, así que su área es π por r por r.', {}, '$A = \\pi r^2$'],
        ['Un sector circular es una tajada: le toca la parte del área que su ángulo es de la vuelta.', { sec: 90 }, '$\\tfrac{90}{360} \\cdot \\pi r^2$'],
        ['Si al sector le quitas el triángulo de sus dos radios queda el segmento circular.', { seg: 1 }, '$\\text{sector} - \\text{triángulo}$'],
        ['Y una corona es un círculo grande menos uno chico con el mismo centro.', { cor: 1, sec: 0, seg: 0 }, '$\\pi R^2 - \\pi r^2$'],
      ], 'Polígono regular: semiperímetro por apotema. Círculo: $\\pi r^2$. Sector: su parte de la vuelta.'),
      xpHaz('dibujo', 'En un círculo de radio 6, abre el sector hasta que su área sea $15\\pi$.', { dib: sect, v: { g: 60 }, metas: { g: 150 }, alto: 204,
        manijas: [{ k: 'g', min: 30, max: 330, paso: 30, en: v => XPK.at(...SC, 84, v.g), de: (x, y) => (Math.atan2(SC[1] - y, x - SC[0]) * 180 / Math.PI + 360) % 360 }],
        lee: v => `$\\tfrac{${v.g}}{360} \\cdot 36\\pi = ${N(v.g / 10)}\\pi$`, dice: v => `El círculo entero vale 36π. Tu sector abre ${v.g}°.` }, '$15\\pi$ de $36\\pi$ son $\\tfrac{5}{12}$ del círculo: $\\tfrac{5}{12} \\cdot 360^\\circ = 150^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una pista de baile es un trapecio de bases 12 m y 8 m y altura 5 m, con una tarima circular de radio 2 m adentro. Pon cada área, en m².', { slots: fila('pista', 'tarima', 'queda libre'), fichas: ['50', '4π', '50 − 4π', '100', '2π', '100 − 4π'], meta: ['50', '4π', '50 − 4π'], alto: 96, pista: 'El trapecio usa la semisuma de las bases.' }, 'Trapecio: $\\tfrac{(12 + 8) \\cdot 5}{2} = 50$. Círculo: $4\\pi$. Libre: $50 - 4\\pi$ m².')],
  ], 'Todo sale de base por altura: mitades para triángulo, rombo y trapecio; apotema para los regulares; $\\pi r^2$ para el círculo.');

  // ----------------------------------------------------------------------------------------------------- euc-areas-2
  // Base fija de 6 y vértice que se desliza por la paralela; con d, la base partida en 2 y 4.
  const prl = (v, K) => {
    const A = [70, 170], B = [250, 170], P = [40 + v.x * 30, 50], D = [130, 170];
    return K.l(10, 50, 330, 50, 'lm d') + (v.d > 0.5 ? K.p([A, D, P], 'fa') + K.p([D, B, P], 'fg') + K.t(100, 188, '2', 'ta') + K.t(190, 188, '4', 'tg') : K.p([A, B, P], 'fa') + K.t(160, 188, '6', 'ta'))
      + K.l(P[0], 50, P[0], 170, 'lf d') + K.t(P[0] + 7, 114, '4', 'tf', 'start') + K.l(...A, ...B, 'gr');
  };
  const parte = (v, K) => {
    const A = [140, 40], B = [44, 172], C = [296, 172], D = [44 + v.d * 28, 172]; let h = K.p([A, B, D], 'fa') + K.p([A, D, C], 'fg');
    for (let i = 1; i < 9; i++) h += K.l(44 + i * 28, 168, 44 + i * 28, 176, 'lm');
    return h + K.t((B[0] + D[0]) / 2, 192, R(v.d), 'ta') + K.t((D[0] + C[0]) / 2, 192, 9 - R(v.d), 'tg');
  };
  const medi = (v, K) => {
    const A = [140, 26], B = [60, 176], C = [290, 176], M = [175, 176], Q = [215, 101], S = [100, 101], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    const seis = [[B, G, M], [M, G, C], [C, G, Q], [Q, G, A], [A, G, S], [S, G, B]], dos = Math.max(0, 1 - Math.abs(v.col - 1)), sx = Math.max(0, v.col - 1);
    return K.p([A, B, C], 'fc') + K.f(dos, K.p([A, B, M], 'fa') + K.p([A, M, C], 'fg')) + K.f(sx, seis.map((t, i) => K.p(t, i % 2 ? 'fg' : 'fa')).join(''))
      + K.f(v.m1, K.l(...A, ...M, 'la gr') + K.c(...M, 4, 'fk')) + K.f(v.m3, K.l(...B, ...Q, 'la') + K.l(...C, ...S, 'la') + K.c(...G, 4, 'fk')) + K.t(300, 30, 'área 60', 'tm', 'end');
  };
  // Triángulo semejante hecho de k² copias (cual 0); dos triángulos con un ángulo común (cual 1).
  const copias = (v, K, ux = 50, uy = 40, y0 = 170) => {
    const k = Math.max(1, R(v.k)), O = [40, y0], ex = [ux, 0], ey = [ux * 0.3, -uy], at = (i, j) => [O[0] + i * ex[0] + j * ey[0], O[1] + i * ex[1] + j * ey[1]];
    let h = K.p([at(0, 0), at(k, 0), at(0, k)], 'fa');
    for (let i = 1; i < k; i++) h += K.l(...at(i, 0), ...at(0, i), 'lr') + K.l(...at(i, 0), ...at(i, k - i), 'lr') + K.l(...at(0, i), ...at(k - i, i), 'lr');
    return h + K.p([at(0, 0), at(1, 0), at(0, 1)], 'fg') + K.t(332, 24, `lados por ${k}`, 'tm', 'end') + K.t(332, 46, `${k * k} ${k === 1 ? 'copia' : 'copias'}`, 'ta', 'end');
  };
  const semj = (v, K) => {
    if (v.cual < 0.5) return copias(v, K);
    const A = [40, 170], c = Math.cos(55 * Math.PI / 180), s = Math.sin(55 * Math.PI / 180), u = 34, en = e => [A[0] + e * u * c, A[1] - e * u * s], B = [A[0] + 6 * u, 170], D = [A[0] + 3 * u, 170], E = en(2), C = en(5), m1 = en(1), m2 = en(3.5);
    return K.p([A, B, C], 'fg') + K.p([A, D, E], 'fa') + K.t((A[0] + D[0]) / 2, 188, '3', 'ta') + K.t((D[0] + B[0]) / 2, 188, '3', 'tg') + K.t(m1[0] - 10, m1[1], '2', 'ta', 'end') + K.t(m2[0] - 10, m2[1], '3', 'tg', 'end');
  };

  xpLec('euc-areas-2', [
    ['Misma altura, misma base',
      xpMira('dibujo', 'Para comparar áreas de triángulos basta mirar **base y altura**.', { dib: prl, v: { x: 4, d: 0 }, alto: 200 }, [
        ['Este triángulo tiene la base abajo y el vértice arriba, sobre una paralela a la base.', {}],
        ['Deslizamos el vértice por la paralela: la forma cambia, la altura no.', { x: 9 }],
        ['Misma base y misma altura: todos estos triángulos son equivalentes.', { x: 1 }, '$\\tfrac{6 \\cdot 4}{2} = 12$'],
        ['Ahora partimos la base en trozos de 2 y de 4. Los dos triángulos comparten la altura.', { x: 5, d: 1 }],
        ['Con la misma altura, las áreas son proporcionales a las bases: 4 y 8.', {}, '$\\tfrac{4}{8} = \\tfrac{2}{4}$'],
      ], 'Misma base entre paralelas: equivalentes. Misma altura: áreas proporcionales a las bases.'),
      xpHaz('dibujo', 'La base mide 9. Mueve el punto hasta que el triángulo de la izquierda tenga el doble de área que el de la derecha.', { dib: parte, v: { d: 3 }, metas: { d: 6 }, alto: 204,
        manijas: [{ k: 'd', min: 1, max: 8, paso: 1, en: v => [44 + v.d * 28, 172], de: x => (x - 44) / 28 }],
        lee: v => `$\\tfrac{${v.d}}{${9 - v.d}}$`, dice: v => `A la izquierda ${v.d} de base y a la derecha ${9 - v.d}, con la misma altura.` }, 'Las áreas van como las bases: $6 : 3 = 2 : 1$.')],
    ['Las medianas',
      xpMira('dibujo', 'Una **mediana** siempre reparte el área por igual.', { dib: medi, v: { m1: 0, m3: 0, col: 0 }, alto: 200 }, [
        ['Una mediana une un vértice con el punto medio del lado opuesto.', { m1: 1 }],
        ['Los dos triángulos tienen bases congruentes y la misma altura: son equivalentes.', { col: 1 }, '$30 + 30 = 60$'],
        ['Trazamos las otras dos medianas. Las tres se cortan en un punto: el baricentro.', { m3: 1, col: 0 }],
        ['Quedan seis triángulos pequeños, y los seis son equivalentes.', { col: 2 }, '$60 \\div 6 = 10$'],
        ['Dos pegados forman un tercio del triángulo; tres, la mitad.', {}, '$10 + 10 = 20$'],
      ], 'Una mediana parte el triángulo en dos equivalentes; las tres medianas, en seis.'),
      xpHaz('fichas', 'Un triángulo tiene área 90. Pon el área de cada mitad que deja una mediana y la de cada uno de los seis triángulos de las tres medianas.', { slots: fila('cada mitad', 'cada uno de seis'), fichas: ['45', '15', '30', '18'], meta: ['45', '15'], alto: 96, pista: 'Una mediana parte en dos; las tres, en seis.' }, '$90 \\div 2 = 45$ y $90 \\div 6 = 15$.')],
    ['Semejantes y ángulo común',
      xpMira('dibujo', 'En figuras **semejantes** el área crece más rápido que los lados.', { dib: semj, v: { k: 1, cual: 0 }, alto: 200 }, [
        ['Este triángulo tiene área 1. Hagamos uno semejante con los lados al doble.', {}],
        ['En el grande caben cuatro copias del chico: lados por 2, área por 4.', { k: 2 }, '$2^2 = 4$'],
        ['Con los lados al triple caben nueve: la razón de las áreas es el cuadrado de la de los lados.', { k: 3 }, '$3^2 = 9$'],
        ['Otra relación: dos triángulos con un ángulo congruente, aquí el mismo ángulo.', { cual: 1 }],
        ['Sus áreas están en la razón de los productos de los lados que forman ese ángulo.', {}, '$\\tfrac{3 \\cdot 2}{6 \\cdot 5} = \\tfrac{1}{5}$'],
      ], 'Semejantes con razón $k$: áreas en razón $k^2$. Con un ángulo congruente: como los productos de sus lados.'),
      xpHaz('dibujo', 'El triángulo dorado tiene área 3. Agranda los lados hasta que el semejante tenga área 48.', { dib: (v, K) => copias(v, K, 44, 30, 176), v: { k: 1 }, metas: { k: 4 }, alto: 250,
        manijas: [{ k: 'k', min: 1, max: 5, paso: 1, et: 'los lados se multiplican por' }],
        lee: v => `$3 \\cdot ${v.k}^2 = ${3 * v.k * v.k}$`, dice: v => `Con los lados por ${v.k} caben ${v.k * v.k} ${v.k === 1 ? 'copia' : 'copias'} del dorado.` }, '$48 \\div 3 = 16 = 4^2$: los lados se multiplican por 4.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un plano amplía un lote triangular: cada lado se multiplica por 5. En el plano original el lote ocupa 6 cm². Pon la razón de las áreas y el área ampliada.', { slots: fila('razón de áreas', 'área ampliada'), fichas: ['25', '150', '5', '30', '10'], meta: ['25', '150'], alto: 96, pista: 'Las áreas crecen con el cuadrado de la razón de los lados.' }, '$5^2 = 25$ y $6 \\cdot 25 = 150$ cm².')],
  ], 'Base y altura deciden: paralelas y medianas dan equivalentes; la semejanza eleva la razón al cuadrado.');

  // ----------------------------------------------------------------------------------------------------- euc-areas-3
  const C3 = [170, 100];
  const cuacir = (v, K) => (v.cual < 0.5
    ? K.r(98, 28, 144, 144, 'fa', 0) + K.c(...C3, 72, 'fc') + K.t(170, 190, '6', 'ta') + K.f(v.rad, K.l(...C3, 242, 100, 'lf gr') + K.t(206, 92, '3', 'tf') + K.c(...C3, 3, 'fk'))
    : K.c(...C3, 72, 'fa') + K.p([45, 135, 225, 315].map(g => K.at(...C3, 72, g)), 'fc') + K.l(...K.at(...C3, 72, 225), ...K.at(...C3, 72, 45), 'lf d') + K.l(...K.at(...C3, 72, 135), ...K.at(...C3, 72, 315), 'lf d') + K.t(196, 86, '6', 'tf', 'start') + K.c(...C3, 3, 'fk'));
  // Cuadrado de lado 2 con un cuarto de círculo; triángulo, segmento y pétalo.
  const cuartos = (v, K) => {
    const x = 100, y = 30, s = 140, TL = `${x} ${y}`, BR = `${x + s} ${y + s}`;
    return K.r(x, y, s, s, 'fc', 0) + (v.dos < 0.5 ? K.sec(x, y + s, s, 0, 90, 'fa') : camino(`M${TL} A${s} ${s} 0 0 1 ${BR} A${s} ${s} 0 0 1 ${TL} Z`, 'fa') + K.l(x, y, x + s, y + s, 'lf d'))
      + K.f(v.dos < 0.5 ? v.tri : 0, K.p([[x, y + s], [x + s, y + s], [x, y]], 'fg')) + K.f(v.dos < 0.5 ? v.seg : 0, camino(`M${TL} A${s} ${s} 0 0 1 ${BR} Z`, 'fo')) + K.t(x + s / 2, y + s + 18, '2', 'ta');
  };
  // Rectángulo de 8 por 4 con una pieza que sobra y un hueco igual (cual 0); corona de radios 5 y 3 (cual 1).
  const mover = (v, K) => {
    if (v.cual > 0.5) return K.c(...C3, 80, 'fa') + K.c(...C3, 48, 'fc') + K.l(...C3, ...K.at(...C3, 80, 30), 'la') + K.t(...K.at(C3[0], C3[1] + 4, 92, 30), '5', 'ta') + K.l(...C3, ...K.at(...C3, 48, 150), 'lf') + K.t(...K.at(C3[0], C3[1] - 8, 26, 150), '3', 'tf') + K.c(...C3, 3, 'fk');
    const cx = 252 - 192 * v.mv, media = (x, cls) => camino(`M${XPK.n(x)} 52 A48 48 0 0 1 ${XPK.n(x)} 148 Z`, cls);
    return K.r(60, 52, 192, 96, 'fa', 0) + K.f(1 - v.mv, media(60, 'fc')) + media(cx, 'fg') + K.t(156, 168, '8', 'ta') + K.t(50, 46, '4', 'ta', 'end');
  };
  const anillo = (v, K) => K.c(170, 104, 80, 'fa') + K.c(170, 104, v.r * 16, 'fc') + K.l(170, 104, ...K.at(170, 104, 80, 120), 'la') + K.t(...K.at(170, 108, 92, 120), '5', 'ta') + K.l(170, 104, 170 + v.r * 16, 104, 'lf') + K.c(170, 104, 3, 'fk');

  xpLec('euc-areas-3', [
    ['Lo de afuera menos lo de adentro',
      xpMira('dibujo', 'Una región sombreada se arma **restando** áreas conocidas.', { dib: cuacir, v: { cual: 0, rad: 0 }, alto: 200 }, [
        ['Lo sombreado no tiene fórmula propia, pero es un cuadrado al que le quitaron un círculo.', {}],
        ['El cuadrado mide 6 de lado: su área es 36.', {}, '$6^2 = 36$'],
        ['El círculo inscrito toca los cuatro lados: su radio es la mitad del lado.', { rad: 1 }, '$\\pi \\cdot 3^2 = 9\\pi$'],
        ['Sombreada: lo de afuera menos lo de adentro. La respuesta se deja en función de π.', {}, '$36 - 9\\pi$'],
        ['Al revés, con el cuadrado inscrito en el círculo, sus diagonales son diámetros.', { cual: 1 }],
        ['Ese cuadrado es un rombo de diagonales 6 y 6: vale 18. Sombreada: círculo menos cuadrado.', {}, '$9\\pi - 18$'],
      ], 'Sombreada = lo de afuera menos lo de adentro, y se deja en función de $\\pi$.'),
      xpHaz('fichas', 'Un cuadrado de lado 2 tiene su círculo inscrito. Pon el área del círculo y la de la región sombreada, cuadrado menos círculo.', { slots: fila('círculo', 'sombreada'), fichas: ['π', '4 − π', '4π', '4 − 4π', '2π'], meta: ['π', '4 − π'], alto: 96, pista: 'El radio del círculo inscrito es medio lado.' }, 'Radio 1: el círculo vale $\\pi$ y lo sombreado, $4 - \\pi$.')],
    ['Cuartos de círculo',
      xpMira('dibujo', 'Con **cuartos de círculo** aparecen segmentos y pétalos.', { dib: cuartos, v: { tri: 0, seg: 0, dos: 0 }, alto: 200 }, [
        ['En un cuadrado de lado 2 trazamos un cuarto de círculo con centro en una esquina.', {}, '$\\tfrac14 \\cdot \\pi \\cdot 2^2 = \\pi$'],
        ['La diagonal separa un triángulo que vale la mitad del cuadrado.', { tri: 1 }, '$\\tfrac{2 \\cdot 2}{2} = 2$'],
        ['Entre el arco y la cuerda queda un segmento circular: sector menos triángulo.', { seg: 1 }, '$\\pi - 2$'],
        ['Con otro cuarto de círculo desde la esquina opuesta aparece un pétalo.', { dos: 1 }],
        ['El pétalo es simétrico respecto a la diagonal: son dos segmentos iguales.', {}, '$2(\\pi - 2) = 2\\pi - 4$'],
      ], 'Segmento = cuarto de círculo menos triángulo. Pétalo = dos segmentos.'),
      xpHaz('fichas', 'En un cuadrado de lado 10 se traza un cuarto de círculo de radio 10. Pon el cuarto de círculo, el triángulo y el segmento.', { slots: fila('cuarto', 'triángulo', 'segmento'), fichas: ['25π', '50', '25π − 50', '100π', '100', '50 − 25π'], meta: ['25π', '50', '25π − 50'], alto: 96, pista: 'El segmento es lo que queda entre el arco y la cuerda.' }, '$\\tfrac14 \\cdot 100\\pi = 25\\pi$, medio cuadrado es 50 y el segmento, $25\\pi - 50$.')],
    ['Mover piezas y coronas',
      xpMira('dibujo', 'A veces lo más corto es **mover una pieza**.', { dib: mover, v: { cual: 0, mv: 0 }, alto: 200 }, [
        ['A este rectángulo de 8 por 4 le falta medio círculo a un lado y le sobra uno igual al otro.', {}],
        ['Las dos piezas son congruentes: trasladamos la que sobra hasta el hueco.', { mv: 1 }],
        ['Queda el rectángulo completo. No hizo falta usar π.', {}, '$8 \\cdot 4 = 32$'],
        ['Una corona es lo que queda entre dos círculos con el mismo centro.', { cual: 1 }],
        ['Se restan las áreas, no los radios: con radios 5 y 3 queda 16π.', {}, '$25\\pi - 9\\pi = 16\\pi$'],
      ], 'Una pieza que sobra puede llenar un hueco congruente. En la corona se restan las áreas.'),
      xpHaz('dibujo', 'El círculo grande tiene radio 5. Ajusta el radio del hueco hasta que la corona mida $21\\pi$.', { dib: anillo, v: { r: 4 }, metas: { r: 2 }, alto: 204,
        manijas: [{ k: 'r', min: 1, max: 4, paso: 1, en: v => [170 + v.r * 16, 104], de: x => (x - 170) / 16 }],
        lee: v => `$25\\pi - ${v.r * v.r}\\pi = ${25 - v.r * v.r}\\pi$`, dice: v => `Hueco de radio ${v.r}: le quita ${v.r * v.r}π al círculo de 25π.` }, '$25\\pi - 21\\pi = 4\\pi$: el hueco tiene radio 2.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una ventana es un rectángulo de 4 m por 3 m con medio círculo encima, apoyado en el lado de 4 m. Pon cada área, en m².', { slots: fila('rectángulo', 'medio círculo', 'vidrio total'), fichas: ['12', '2π', '12 + 2π', '4π', '12 + 4π', '8π'], meta: ['12', '2π', '12 + 2π'], alto: 96, pista: 'El diámetro del medio círculo es el lado de 4 m.' }, 'Rectángulo: 12. Medio círculo de radio 2: $\\tfrac12 \\cdot 4\\pi = 2\\pi$. Total: $12 + 2\\pi$ m².')],
  ], 'Sumar, restar y mover piezas: lo de afuera menos lo de adentro, con la respuesta en función de $\\pi$.');
}
;
//#archivo js/explora-euc-8.js
// Geometría Euclidiana · mundo 8 «euc-construcciones»: explicaciones Explora (spec 2026-11-26-curso-euclidiana), escenas «dibujo» y «fichas».
// Regla y compás dibujados con las piezas XPK. Los ejemplos no son los de los ejercicios.
{
  const R1 = x => Math.round(x * 10) / 10, cerca = x => Math.floor(x + 0.5);
  const hacia = (C, P) => Math.atan2(C[1] - P[1], P[0] - C[0]) * 180 / Math.PI;
  // Cruce de dos circunferencias (el de un lado u otro de la línea de centros).
  const corte = (C1, r1, C2, r2, lado = 1) => { const d = Math.hypot(C2[0] - C1[0], C2[1] - C1[1]), a = (d * d + r1 * r1 - r2 * r2) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a)), ux = (C2[0] - C1[0]) / d, uy = (C2[1] - C1[1]) / d; return [C1[0] + a * ux - lado * h * uy, C1[1] + a * uy + lado * h * ux]; };
  const pt = (K, P, n, dx = 11, dy = -7, cls = 'fk') => K.c(...P, 4, cls) + K.t(P[0] + dx, P[1] + dy, n, 's');
  // Compás con la punta fija en (x, y) y la que dibuja a `ab` píxeles a la derecha.
  const compas = (K, x, y, ab, pata = 140) => { const hx = x + ab / 2, hy = y - Math.sqrt(Math.max(0, pata * pata - ab * ab / 4)); return K.l(x, y, hx, hy, 'lm gr') + K.l(hx, hy, x + ab, y, 'lm gr') + K.c(hx, hy, 5, 'fk'); };

  // ------------------------------------------------------------------------------------------ lección 1 · instrumentos
  const inst = (v, K) => {
    const cy = 95 + 80 * v.pos, cx = 40;
    return K.f(v.reg, K.r(30, 99, 150, 16, 'fc', 2)) + K.l(40, 95, 160, 95, 'gr') + pt(K, [40, 95], 'A', -12, -8) + pt(K, [160, 95], 'B', 12, -8) + K.l(20, 175, 320, 175) + pt(K, [40, 175], 'C', -12, 16)
      + K.arc(40, 95, 120, 0, -v.gi, 'la') + K.f(v.comp, compas(K, cx, cy, 120, 85))
      + K.f(v.mk, K.arc(40, 175, 120, 14, -14, 'la') + pt(K, [160, 175], 'E', 4, 17, 'fo'));
  };
  const lleva = (v, K) => K.l(40, 50, 208, 50, 'gr') + pt(K, [40, 50], 'A', -12, 5) + pt(K, [208, 50], 'B', 12, 5) + K.t(124, 40, '7', 'tm') + K.l(20, 160, 320, 160) + pt(K, [40, 160], 'C', -12, 16)
    + K.arc(40, 160, v.r * 24, 12, -12, 'la') + compas(K, 40, 160, v.r * 24) + K.t(40 + v.r * 12, 180, `CE = ${v.r}`, 's ta');

  // Mediatriz de AB = 12 (10 px por unidad), con arcos de radio r.
  const med = (v, K) => {
    const A = [110, 105], B = [230, 105], h = v.r > 6 ? Math.sqrt(v.r * v.r - 36) * 10 : 0, M = [170, 105 - h], Nn = [170, 105 + h], ver = h > 0 && v.ar > 0.9;
    return (v.meta ? [-1, 1].map(s => K.l(164, 105 + s * v.meta * 10 - 6, 176, 105 + s * v.meta * 10 + 6, 'lf') + K.l(164, 105 + s * v.meta * 10 + 6, 176, 105 + s * v.meta * 10 - 6, 'lf')).join('') : '')
      + K.arc(A[0], A[1], v.r * 10, 65 * v.ar, -65 * v.ar, 'lg') + K.arc(B[0], B[1], v.r * 10, 180 - 65 * v.ar, 180 + 65 * v.ar, 'lg')
      + (ver ? K.f(v.tri, K.pl([A, M, B, Nn, A], 'lf')) + K.f(v.ln, K.l(170, Math.max(8, M[1] - 14), 170, Math.min(202, Nn[1] + 14), 'la gr')) + K.c(...M, 4, 'fo') + K.c(...Nn, 4, 'fo') + K.t(186, M[1] + 12, 'M', 's') + K.t(186, Nn[1] - 4, 'N', 's') : '')
      + K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5);
  };
  const MED = { r: 4, ar: 0, ln: 0, tri: 0, meta: 0 };

  // Bisectriz (cual 0) y perpendicular por un punto exterior (cual 1).
  const bis = (v, K) => {
    if (cerca(v.cual) === 0) {
      const B = [50, 172], D = [140, 172], E = K.at(...B, 90, 64), c = [corte(D, 80, E, 80, 1), corte(D, 80, E, 80, -1)], F = Math.hypot(c[0][0] - B[0], c[0][1] - B[1]) > Math.hypot(c[1][0] - B[0], c[1][1] - B[1]) ? c[0] : c[1];
      return K.f(v.s4, K.p([B, D, F], 'fa') + K.p([B, F, E], 'fg')) + K.l(...B, 300, 172, 'gr') + K.l(...B, ...K.at(...B, 172, 64), 'gr') + K.t(40, 190, 'B', 's')
        + K.arc(B[0], B[1], 90, -8, -8 + 80 * v.s1, 'lm') + K.f(v.s1 * 3 - 2, K.c(...D, 4, 'fk') + K.t(D[0], D[1] + 17, 'D', 's') + K.c(...E, 4, 'fk') + K.t(E[0] - 12, E[1] - 4, 'E', 's'))
        + K.arc(D[0], D[1], 80, hacia(D, F) - 18 * v.s2, hacia(D, F) + 18 * v.s2, 'lf') + K.arc(E[0], E[1], 80, hacia(E, F) - 18 * v.s2, hacia(E, F) + 18 * v.s2, 'lf') + K.f(v.s2 * 3 - 2, K.c(...F, 4, 'fo') + K.t(F[0] + 12, F[1] + 16, 'F', 's'))
        + K.l(...B, B[0] + (F[0] - B[0]) * 1.45 * v.s3, B[1] + (F[1] - B[1]) * 1.45 * v.s3, 'la gr');
    }
    const P = [170, 40], R = [170 - Math.sqrt(4000), 130], S = [170 + Math.sqrt(4000), 130], M = [170, 130 + Math.sqrt(2400)];
    return K.l(20, 130, 320, 130, 'gr') + pt(K, P, 'P', 12, -2) + K.arc(P[0], P[1], 110, 270 - 44 * v.s1, 270 + 44 * v.s1, 'lm') + K.f(v.s1 * 3 - 2, K.c(...R, 4, 'fk') + K.t(R[0] - 6, R[1] - 9, 'R', 's') + K.c(...S, 4, 'fk') + K.t(S[0] + 6, S[1] - 9, 'S', 's'))
      + K.arc(R[0], R[1], 80, hacia(R, M) - 18 * v.s2, hacia(R, M) + 18 * v.s2, 'lf') + K.arc(S[0], S[1], 80, hacia(S, M) - 18 * v.s2, hacia(S, M) + 18 * v.s2, 'lf') + K.f(v.s2 * 3 - 2, K.c(...M, 4, 'fo') + K.t(M[0] + 13, M[1] + 5, 'M', 's'))
      + K.l(...P, P[0], P[1] + (M[1] + 12 - P[1]) * v.s3, 'la gr');
  };
  const parte = (v, K) => { const V = [60, 172], a = Math.round(v.a), D = K.at(...V, 190, 0), U = K.at(...V, 165, 70), R = K.at(...V, 150, v.a); return K.ang(V, D, R, 52, `${a}°`, 'fa', 'ta') + K.ang(V, R, U, 40, `${70 - a}°`, 'fg', 'tg') + K.l(...V, ...D, 'gr') + K.l(...V, ...U, 'gr') + K.l(...V, ...R, 'la'); };

  // Copiar un ángulo para trazar una paralela (cual 0) y repartir un segmento (cual 1).
  const cop = (v, K) => {
    if (cerca(v.cual) === 0) {
      const Q = [90, 160], P = [190, 60];
      return K.l(20, 160, 320, 160, 'gr') + K.t(312, 178, 'm', 's') + K.l(60, 190, 230, 20) + pt(K, Q, 'Q', -4, 18) + pt(K, P, 'P', -12, -4)
        + K.f(v.s1, K.ang(Q, [190, 160], P, 40, '', 'fa') + K.l(...K.at(...Q, 40, 0), ...K.at(...Q, 40, 45), 'lm d'))
        + K.f(v.s2, K.ang(P, [290, 60], K.at(...P, 60, 45), 40, '', 'fa') + K.l(...K.at(...P, 40, 0), ...K.at(...P, 40, 45), 'lm d'))
        + K.l(190 - 150 * v.s3, 60, 190 + 130 * v.s3, 60, 'la gr');
    }
    const A = [40, 160], B = [280, 160], m = j => K.at(...A, 56 * j, 35);
    let h = K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5) + K.f(v.t1, K.l(...A, ...m(3.5), 'lm') + [1, 2, 3].map(j => K.c(...m(j), 4, 'fA') + K.t(m(j)[0] - 9, m(j)[1] - 8, j, 's ta')).join(''));
    h += K.f(v.t2, K.l(...m(3), ...B, 'lg'));
    for (const j of [1, 2]) { const q = m(j), pie = [40 + 80 * j, 160]; h += K.l(...q, q[0] + (pie[0] - q[0]) * v.t3, q[1] + (pie[1] - q[1]) * v.t3, 'lg d') + K.f(v.t3 * 3 - 2, K.c(...pie, 4, 'fo')); }
    return h;
  };
  const COP = { cual: 0, s1: 0, s2: 0, s3: 0, t1: 0, t2: 0, t3: 0 };
  const div = (v, K) => {
    const A = [40, 160], B = [292, 160], m = j => K.at(...A, 56 * j, 35), Xp = [40 + v.x * 28, 160];
    return K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5) + K.t(166, 190, 'AB = 9', 'tm') + K.l(...A, ...m(3.5), 'lm') + [1, 2, 3].map(j => K.c(...m(j), 4, j === 2 ? 'fA' : 'fk') + K.t(m(j)[0] - 9, m(j)[1] - 8, j, j === 2 ? 's ta' : 's tm')).join('')
      + K.l(...m(3), ...B, 'lg') + K.l(...m(2), ...Xp, 'la');
  };
  // Un pozo sobre la carretera, a igual distancia de dos fincas (20 px por unidad).
  const pozo = (v, K) => {
    const A = [80, 70], B = [240, 110], P = [40 + v.x * 20, 170], da = Math.hypot(v.x - 2, 5), db = Math.hypot(v.x - 10, 3);
    return K.l(10, 170, 330, 170, 'gr') + K.t(318, 190, 'carretera', 's tm', 'end') + K.l(...A, ...P, 'lg') + K.l(...B, ...P, 'lf') + pt(K, A, 'A', -12, -6) + pt(K, B, 'B', 12, -6)
      + K.t((A[0] + P[0]) / 2 - 10, (A[1] + P[1]) / 2, R1(da), 's tg', 'end') + K.t((B[0] + P[0]) / 2 + 10, (B[1] + P[1]) / 2, R1(db), 's tf', 'start');
  };

  xpLec('euc-construcciones-1', [
    ['Regla y compás',
      xpMira('dibujo', 'Empecemos por las herramientas: una **regla sin marcas** y un **compás**. Nada más.', { dib: inst, v: { reg: 0, comp: 0, gi: 0, pos: 0, mk: 0 }, alto: 200 }, [
        ['La regla de las construcciones no tiene marcas: no mide, solo une dos puntos con una recta.', { reg: 1 }],
        ['El compás tiene una punta fija y otra que dibuja. Su abertura es la distancia entre ellas.', { reg: 0, comp: 1 }],
        ['Al girarlo, todos los puntos del arco quedan a la misma distancia del centro.', { gi: 35 }],
        ['Por eso el compás lleva distancias: abierto de A a B, pasa a otra recta sin cambiar la abertura.', { gi: 0, pos: 1 }],
        ['Con centro en C, el arco marca E. El segmento CE mide lo mismo que AB, sin haber medido.', { mk: 1 }, '$CE = AB$'],
      ], 'La regla une puntos; el compás traza arcos y lleva distancias. Con eso basta para construir.'),
      xpHaz('dibujo', 'El compás está apoyado en C. Ábrelo hasta que CE mida lo mismo que AB, que mide 7.', { dib: lleva, v: { r: 3 }, metas: { r: 7 }, alto: 200,
        manijas: [{ k: 'r', min: 2, max: 11, paso: 1, en: v => [40 + v.r * 24, 160], de: x => (x - 40) / 24 }],
        lee: v => `$CE = ${v.r}$`, dice: v => `El compás está abierto ${v.r} y AB mide 7.` }, 'Con la abertura de AB, el arco deja E a la misma distancia: $CE = AB = 7$.')],
    ['La mediatriz',
      xpMira('dibujo', 'Primera construcción: la **mediatriz** de un segmento, sin medirlo.', { dib: med, v: { ...MED }, alto: 210 }, [
        ['Queremos la mediatriz de AB: la perpendicular que pasa por su punto medio.', {}],
        ['AB mide 12. Con radio 4, los arcos trazados desde A y desde B ni se tocan.', { ar: 1 }, '$4 < 6$'],
        ['Con un radio mayor que la mitad de AB se cortan en dos puntos: M y N.', { r: 10 }, '$10 > 6$'],
        ['M está a 10 de A y a 10 de B, porque el radio es el mismo. Con N pasa igual.', { tri: 1 }, '$AM = BM \\qquad AN = BN$'],
        ['Los triángulos AMN y BMN tienen sus tres lados iguales: son congruentes por L-L-L.', {}],
        ['Por eso la recta MN corta a AB justo en la mitad y en ángulo recto: es la mediatriz.', { ln: 1 }],
      ], 'Dos arcos de igual radio, mayor que la mitad, se cortan en puntos que equidistan de A y B: su recta es la mediatriz.'),
      xpHaz('dibujo', 'AB mide 12. Abre el compás hasta que los dos arcos se corten en las marcas, a 8 del segmento.', { dib: med, v: { ...MED, r: 7, ar: 1, meta: 8 }, metas: { r: 10 }, alto: 210,
        manijas: [{ k: 'r', min: 3, max: 11, paso: 1, en: v => [110 + v.r * 10, 105], de: x => (x - 110) / 10 }],
        lee: v => (v.r > 6 ? `$\\sqrt{${v.r}^2 - 6^2} ${Number.isInteger(Math.sqrt(v.r * v.r - 36)) ? '=' : '\\approx'} ${R1(Math.sqrt(v.r * v.r - 36))}$` : `$${v.r} \\le 6$`),
        dice: v => (v.r > 6 ? `Con radio ${v.r} los arcos se cortan a ${R1(Math.sqrt(v.r * v.r - 36))} del segmento.` : `Con radio ${v.r} los arcos no se cortan en dos puntos.`) }, 'El radio es la hipotenusa de catetos 6 y 8: $\\sqrt{6^2 + 8^2} = 10$.')],
    ['Bisectriz y perpendicular',
      xpMira('dibujo', 'La misma idea sirve para partir un **ángulo** y para trazar una **perpendicular**.', { dib: bis, v: { cual: 0, s1: 0, s2: 0, s3: 0, s4: 0 }, alto: 200 }, [
        ['Para partir un ángulo en dos iguales, un arco con centro en el vértice B marca D y E.', { s1: 1 }, '$BD = BE$'],
        ['Desde D y desde E se trazan dos arcos con un mismo radio. Se cortan en F.', { s2: 1 }, '$DF = EF$'],
        ['Los triángulos BDF y BEF tienen tres pares de lados iguales: son congruentes por L-L-L.', { s4: 1 }],
        ['Entonces los dos ángulos en B son congruentes: el rayo BF es la bisectriz.', { s3: 1 }],
        ['Para bajar una perpendicular desde P, un arco con centro en P corta a la recta en R y S.', { cual: 1, s1: 1, s2: 0, s3: 0, s4: 0 }],
        ['Arcos iguales desde R y S se cortan en M. P y M equidistan de R y S: PM es la mediatriz.', { s2: 1, s3: 1 }],
      ], 'Bisectriz y perpendicular salen igual: puntos que equidistan y triángulos congruentes por L-L-L.'),
      xpHaz('dibujo', 'El ángulo mide 70°. Gira el rayo hasta que lo parta en dos ángulos congruentes.', { dib: parte, v: { a: 15 }, metas: { a: 35 }, alto: 200,
        manijas: [{ k: 'a', min: 5, max: 65, paso: 5, en: v => XPK.at(60, 172, 150, v.a), de: (x, y) => Math.atan2(172 - y, x - 60) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ${70 - v.a}^\\circ = 70^\\circ$`, dice: v => `Un lado quedó con ${v.a}° y el otro con ${70 - v.a}°.` }, 'La bisectriz deja dos ángulos congruentes: $70^\\circ \\div 2 = 35^\\circ$.')],
    ['Paralelas y partes iguales',
      xpMira('dibujo', 'Con el compás también se **copia un ángulo**, y con eso salen paralelas y partes iguales.', { dib: cop, v: { ...COP }, alto: 200 }, [
        ['Para copiar un ángulo, un arco con centro en su vértice Q corta los dos lados.', { s1: 1 }],
        ['El mismo arco se traza en P, y con el compás se lleva la abertura entre los dos cortes.', { s2: 1 }],
        ['Los ángulos en Q y en P son correspondientes y congruentes: la recta por P es paralela a m.', { s3: 1 }],
        ['Para partir AB en tres, se llevan tres marcas iguales sobre una semirrecta auxiliar.', { cual: 1, t1: 1 }],
        ['La última marca se une con B, y por las demás se trazan paralelas a esa recta.', { t2: 1, t3: 1 }],
        ['Paralelas que cortan partes iguales en una recta cortan partes iguales en la otra.', {}],
      ], 'Copiar un ángulo da una paralela; paralelas por marcas iguales reparten un segmento en partes iguales.'),
      xpHaz('dibujo', 'AB mide 9 y se parte en 3 con marcas iguales. Lleva X adonde cae la paralela que sale de la marca 2.', { dib: div, v: { x: 2 }, metas: { x: 6 }, alto: 200,
        manijas: [{ k: 'x', min: 1, max: 8, paso: 0.5, en: v => [40 + v.x * 28, 160], de: x => (x - 40) / 28 }],
        lee: v => `$AX = ${v.x}$`, dice: v => `X está a ${v.x} de A. La línea de la marca 2 debe quedar paralela a la que llega a B.` }, 'Cada parte mide $9 \\div 3 = 3$: la segunda paralela cae a 6 de A.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos fincas, A y B, quieren un pozo sobre la carretera que quede a la misma distancia de las dos. Mueve el pozo.', { dib: pozo, v: { x: 9 }, metas: { x: 5 }, alto: 200,
        manijas: [{ k: 'x', min: 0, max: 13, paso: 1, en: v => [40 + v.x * 20, 170], de: x => (x - 40) / 20 }],
        lee: v => `$PA \\approx ${R1(Math.hypot(v.x - 2, 5))} \\qquad PB \\approx ${R1(Math.hypot(v.x - 10, 3))}$`, dice: v => `El pozo está a ${R1(Math.hypot(v.x - 2, 5))} de A y a ${R1(Math.hypot(v.x - 10, 3))} de B.` },
      'El pozo va donde la mediatriz de AB corta la carretera: ahí equidista de las dos fincas.')],
  ], 'Con regla sin marcas y compás: mediatriz, bisectriz, perpendicular, paralela y partes iguales, todas con su porqué.');

  // ------------------------------------------------------------------------------------------ lección 2 · lugares geométricos
  const lug = (v, K) => {
    const c = cerca(v.cual);
    if (c === 0) { const O = [170, 100], P = K.at(...O, 70, v.g); return K.arc(O[0], O[1], 70, 0, v.g, 'la gr') + K.l(...O, ...P, 'lm') + pt(K, O, 'O', -12, 5) + K.c(...P, 5, 'fA'); }
    if (c === 1) { const A = [100, 120], B = [240, 120], P = [170, 120 - v.py]; return K.l(...A, ...B, 'gr') + K.l(170, 14, 170, 190, 'la gr') + K.l(...A, ...P, 'lg') + K.l(...B, ...P, 'lg') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5) + K.c(...P, 5, 'fA') + K.t(184, P[1] - 4, 'P', 's ta'); }
    if (c === 2) return K.l(20, 100, 320, 100, 'gr') + K.l(20, 55, 320, 55, 'la d') + K.l(20, 145, 320, 145, 'la d') + K.cota(60, 55, 60, 100, 'd') + K.cota(60, 100, 60, 145, 'd');
    if (c === 3) { const V = [50, 170], P = K.at(...V, 150, 25), H = K.at(...V, 150 * Math.cos(25 * Math.PI / 180), 50); return K.l(...V, 310, 170, 'gr') + K.l(...V, ...K.at(...V, 200, 50), 'gr') + K.l(...V, ...K.at(...V, 250, 25), 'la gr') + K.l(...P, P[0], 170, 'lg') + K.l(...P, ...H, 'lg') + K.c(...P, 5, 'fA'); }
    const O = [170, 122], A = K.at(...O, 80, 210), B = K.at(...O, 80, -30), P = K.at(...O, 80, 100), Q = K.at(...O, 80, 50);
    return K.arc(O[0], O[1], 80, -30, 210, 'la gr') + K.l(...A, ...B, 'gr') + K.ang(P, A, B, 22, '', 'fa') + K.ang(Q, A, B, 22, '', 'fa') + K.pl([A, P, B], 'lg') + K.pl([A, Q, B], 'lf') + pt(K, A, 'A', -12, 8) + pt(K, B, 'B', 12, 8);
  };
  // Cuadrícula de 0..12 por 0..8 (22 px).
  const GX = x => 38 + x * 22, GY = y => 186 - y * 22, G2 = { k: ['x', 'y'], min: [0, 0], max: [12, 8], paso: 1, en: v => [GX(v.x), GY(v.y)], de: (x, y) => [(x - 38) / 22, (186 - y) / 22] };
  const cuad = pts => (v, K) => {
    let h = '';
    for (let i = 0; i <= 12; i++) h += K.l(GX(i), GY(0), GX(i), GY(8), 'ls');
    for (let j = 0; j <= 8; j++) h += K.l(GX(0), GY(j), GX(12), GY(j), 'ls');
    const P = [GX(v.x), GY(v.y)], cl = ['lg', 'lf', 'lo'], tc = ['tg', 'tf', 'to'];
    Object.entries(pts).forEach(([n, A], i) => { const Q = [GX(A[0]), GY(A[1])], d = Math.hypot(v.x - A[0], v.y - A[1]); h += K.l(...Q, ...P, cl[i]) + (d > 1.4 ? K.t((Q[0] + P[0]) / 2 + 9, (Q[1] + P[1]) / 2 - 5, R1(d), `s ${tc[i]}`) : '') + K.c(...Q, 4, 'fk') + K.t(Q[0] - 10, Q[1] - 7, n, 's'); });
    return h + K.t(P[0] + 15, P[1] - 12, 'P', 'ta');
  };
  const dd = (v, A) => Math.hypot(v.x - A[0], v.y - A[1]), q2 = (v, A) => (v.x - A[0]) ** 2 + (v.y - A[1]) ** 2;

  // A 4 de A (circunferencia) y equidistante de A y B (mediatriz): 20 px por unidad.
  const cruza = (v, K) => {
    const A = [120, 108], B = [220, 108], r = v.rr * 20, h = r > 50 ? Math.sqrt(r * r - 2500) : 0;
    return K.l(...A, ...B, 'lm') + K.arc(A[0], A[1], r, 0, 360 * v.c1, 'lg gr') + K.f(v.md, K.l(170, 12, 170, 204, 'la gr')) + (h ? K.f(v.pts, K.c(170, 108 - h, 6, 'fo') + K.c(170, 108 + h, 6, 'fo')) : '') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5);
  };
  // Triángulo con base 10 (20 px por unidad): arcos de radios r1 y r2 (cual 0), L-A-L (1) y A-L-A (2).
  const arma = (v, K) => {
    const A = [70, 172], B = [270, 172], c = cerca(v.cual), base = K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5);
    if (c === 0) {
      const si = v.r1 + v.r2 > 10 && Math.abs(v.r1 - v.r2) < 10, C = si ? corte(A, v.r1 * 20, B, v.r2 * 20, -1) : A;
      return K.arc(A[0], A[1], v.r1 * 20, 0, 90 * v.a1, 'lg') + K.arc(B[0], B[1], v.r2 * 20, 180, 180 - 90 * v.a2, 'lf') + (si ? K.f(v.tri, K.pl([A, C, B], 'la') + K.c(...C, 5, 'fo') + K.t(C[0], C[1] - 10, 'C', 's')) : '') + base;
    }
    if (c === 1) { const C = K.at(...A, 120, 50); return K.ang(A, B, C, 34, '50°', 'fa', 'ta') + K.l(...A, ...K.at(...A, 165, 50), 'lm') + K.arc(A[0], A[1], 120, 38, 62, 'lg') + K.f(v.p, K.l(...C, ...B, 'la') + K.l(...A, ...C, 'la') + K.c(...C, 5, 'fo') + K.t(C[0] - 4, C[1] - 10, 'C', 's')) + base; }
    const t = Math.tan(50 * Math.PI / 180), s = Math.tan(60 * Math.PI / 180), x = 200 * s / (t + s), C = [70 + x, 172 - x * t];
    return K.ang(A, B, C, 34, '50°', 'fa', 'ta') + K.ang(B, A, C, 30, '60°', 'fg', 'tg') + K.l(...A, ...K.at(...A, 200, 50), 'lm') + K.l(...B, ...K.at(...B, 180, 120), 'lm') + K.pl([A, C, B], 'la') + K.c(...C, 5, 'fo') + K.t(C[0] + 14, C[1] + 2, 'C', 's') + base;
  };
  const ARM = { cual: 0, r1: 6, r2: 8, a1: 0, a2: 0, tri: 0, p: 0 };
  // Circuncentro (mediatrices) e incentro (bisectrices) del mismo triángulo.
  const cir = (v, K) => {
    const A = [90, 160], B = [250, 160], C = [190, 50], a = Math.hypot(B[0] - C[0], B[1] - C[1]), b = Math.hypot(A[0] - C[0], A[1] - C[1]), c = 160, s = a + b + c;
    const oy = (() => { const m = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], k = -(C[0] - B[0]) / (C[1] - B[1]); return m[1] + k * (170 - m[0]); })(), O = [170, oy], R = Math.hypot(O[0] - A[0], O[1] - A[1]);
    const I = [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s], r = 160 - I[1];
    const largo = (P, Q, k) => [P[0] + (Q[0] - P[0]) * k, P[1] + (Q[1] - P[1]) * k], med2 = (P, Q) => { const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; return K.l(...largo(O, m, 1.7), ...largo(m, O, 1.5), 'lf d'); };
    return K.p([A, B, C], 'fn') + K.f(v.m, K.l(170, 176, 170, oy - 30, 'lf d') + med2(B, C) + med2(A, C) + K.c(...O, 4, 'fF') + K.t(O[0] - 12, O[1] + 16, 'O', 's tf')) + K.arc(O[0], O[1], R, 90, 90 + 360 * v.cc, 'lf')
      + K.f(v.b, [A, B, C].map(P => K.l(...P, ...largo(P, I, 1.5), 'la d')).join('') + K.c(...I, 4, 'fA') + K.t(I[0] + 12, I[1] - 6, 'I', 's ta')) + K.arc(I[0], I[1], r, 90, 90 + 360 * v.ic, 'la')
      + pt(K, A, 'A', -12, 8) + pt(K, B, 'B', 12, 8) + pt(K, C, 'C', 0, -10);
  };
  const V1 = { A: [2, 0], B: [10, 0], C: [9, 7] };

  xpLec('euc-construcciones-2', [
    ['Lugares geométricos',
      xpMira('dibujo', 'Una palabra nueva: **lugar geométrico**. Es más sencilla de lo que suena.', { dib: lug, v: { cual: 0, g: 0, py: 0 }, alto: 210 }, [
        ['Un lugar geométrico es el conjunto de todos los puntos que cumplen una condición.', {}],
        ['Todos los puntos que están a una misma distancia de O forman una circunferencia.', { g: 360 }],
        ['Los puntos que equidistan de A y de B forman la mediatriz del segmento AB.', { cual: 1, py: 70 }, '$PA = PB$'],
        ['Los puntos a una distancia fija de una recta forman dos paralelas, una a cada lado.', { cual: 2 }],
        ['Los puntos que equidistan de los dos lados de un ángulo forman su bisectriz.', { cual: 3 }],
        ['Y los que ven un segmento AB bajo un mismo ángulo forman un arco: el arco capaz.', { cual: 4 }],
      ], 'Circunferencia, mediatriz, paralelas, bisectriz y arco capaz: cada condición dibuja su lugar geométrico.'),
      xpHaz('dibujo', 'Lleva P a un punto que esté a 5 de O, pero en diagonal: ni en la fila de O ni en su columna.', { dib: cuad({ O: [4, 2] }), v: { x: 6, y: 3 }, cumple: v => q2(v, [4, 2]) === 25 && v.x !== 4 && v.y !== 2, sol: { x: 7, y: 6 }, alto: 200, manijas: [G2],
        lee: v => `$OP ${q2(v, [4, 2]) === 25 ? '=' : '\\approx'} ${R1(dd(v, [4, 2]))}$`, dice: v => `P está a ${R1(dd(v, [4, 2]))} de O.` }, 'Los puntos a 5 de O están en una circunferencia: 3 a un lado y 4 al otro dan $\\sqrt{9 + 16} = 5$.')],
    ['Cruzar dos lugares',
      xpMira('dibujo', 'Ahora lo útil: un punto con **dos condiciones** está donde se cruzan dos lugares.', { dib: cruza, v: { rr: 4, c1: 0, md: 0, pts: 0 }, alto: 216 }, [
        ['Si un punto debe cumplir dos condiciones, se traza el lugar geométrico de cada una.', {}],
        ['Primera condición: estar a 4 de A. Es una circunferencia de centro A y radio 4.', { c1: 1 }],
        ['Segunda condición: equidistar de A y de B. Es la mediatriz del segmento AB.', { md: 1 }],
        ['Los puntos que cumplen las dos están donde los lugares se cortan. Aquí hay dos.', { pts: 1 }],
        ['Con un radio de 2, la circunferencia no alcanza la mediatriz: ningún punto cumple.', { rr: 2 }],
      ], 'Dos condiciones, dos lugares: los puntos buscados son sus cruces, y puede haber dos, uno o ninguno.'),
      xpHaz('dibujo', 'Lleva P a un punto que esté a 5 de A y también a 5 de B.', { dib: cuad({ A: [3, 3], B: [9, 3] }), v: { x: 5, y: 5 }, cumple: v => q2(v, [3, 3]) === 25 && q2(v, [9, 3]) === 25, sol: { x: 6, y: 7 }, alto: 200, manijas: [G2],
        lee: v => `$PA ${q2(v, [3, 3]) === 25 ? '=' : '\\approx'} ${R1(dd(v, [3, 3]))} \\qquad PB ${q2(v, [9, 3]) === 25 ? '=' : '\\approx'} ${R1(dd(v, [9, 3]))}$`, dice: v => `P está a ${R1(dd(v, [3, 3]))} de A y a ${R1(dd(v, [9, 3]))} de B.` },
      'P está en el cruce de dos circunferencias de radio 5: $\\sqrt{3^2 + 4^2} = 5$ hacia cada lado.')],
    ['Construir triángulos',
      xpMira('dibujo', 'Construir un triángulo es **cruzar lugares**: cada dato deja al tercer vértice en una línea.', { dib: arma, v: { ...ARM }, alto: 200 }, [
        ['Un triángulo de lados 10, 6 y 8: se traza la base de 10 y un arco de radio 6 desde A.', { a1: 1 }],
        ['Otro arco de radio 8 desde B. Donde se cortan los dos está el tercer vértice, C.', { a2: 1, tri: 1 }],
        ['Con lados 10, 3 y 5 los arcos no se alcanzan: 3 más 5 es menos que 10. No hay triángulo.', { r1: 3, r2: 5, tri: 0 }, '$3 + 5 < 10$'],
        ['Solo cierra si cada lado es menor que la suma de los otros dos.', { r1: 6, r2: 8, tri: 1 }, '$10 < 6 + 8$'],
        ['Con dos lados y el ángulo entre ellos: se copia el ángulo en A y el compás marca C en su lado.', { cual: 1, p: 1 }],
        ['Con un lado y sus dos ángulos: se copian en A y en B, y los dos rayos se cortan en C.', { cual: 2 }],
      ], 'L-L-L (si cierra), L-A-L y A-L-A: con esos datos la construcción da un solo triángulo.'),
      xpHaz('dibujo', 'La base mide 10 y un lado mide 4. Sube el otro lado hasta el **menor** entero con el que los arcos se cortan.', { dib: arma, v: { ...ARM, r1: 4, r2: 3, a1: 1, a2: 1, tri: 1 }, metas: { r2: 7 }, alto: 250,
        manijas: [{ k: 'r2', min: 3, max: 9, paso: 1, et: 'el otro lado' }],
        lee: v => `$4 + ${v.r2} ${4 + v.r2 > 10 ? '>' : 4 + v.r2 === 10 ? '=' : '<'} 10$`,
        dice: v => (v.r2 > 7 ? 'Los arcos se cortan, pero hay un entero menor que también sirve.' : v.r2 === 7 ? 'Los arcos se cortan: el triángulo cierra.' : v.r2 === 6 ? 'Los arcos apenas se tocan sobre la base: queda una línea.' : 'Los arcos no se alcanzan.') },
      'El otro lado debe pasar de $10 - 4 = 6$: el menor entero es 7.')],
    ['Dos circunferencias del triángulo',
      xpMira('dibujo', 'Con mediatrices y bisectrices aparecen las **dos circunferencias** de todo triángulo.', { dib: cir, v: { m: 0, cc: 0, b: 0, ic: 0 }, alto: 226 }, [
        ['Cada mediatriz reúne los puntos que equidistan de dos vértices.', { m: 1 }],
        ['Donde se cortan está el circuncentro O: equidista de A, de B y de C.', {}, '$OA = OB = OC$'],
        ['Con centro en O y radio hasta un vértice, la circunferencia pasa por los tres: la circunscrita.', { cc: 1 }],
        ['Cada bisectriz reúne los puntos que equidistan de dos lados.', { m: 0, cc: 0, b: 1 }],
        ['Donde se cortan está el incentro I: equidista de los tres lados.', {}],
        ['Con centro en I y esa distancia, la circunferencia toca los tres lados: la inscrita.', { ic: 1 }],
      ], 'Mediatrices: circuncentro y circunferencia circunscrita. Bisectrices: incentro y circunferencia inscrita.'),
      xpHaz('fichas', 'Pon qué rectas se trazan para hallar el centro de cada circunferencia.', { slots: [{ x: 92, y: 46, w: 124, et: 'pasa por los vértices' }, { x: 248, y: 46, w: 124, et: 'toca los tres lados' }],
        fichas: ['mediatrices', 'bisectrices', 'alturas', 'medianas'], meta: ['mediatrices', 'bisectrices'], alto: 96, pista: 'Los vértices son puntos y los lados son rectas: ¿qué lugar equidista de dos puntos, y cuál de dos rectas?' },
      'Mediatrices para la que pasa por los vértices; bisectrices para la que toca los lados.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Tres veredas, A, B y C, quieren un tanque de agua que quede a la misma distancia de las tres. Llévalo a su sitio.', { dib: cuad(V1), v: { x: 4, y: 5 }, cumple: v => q2(v, V1.A) === q2(v, V1.B) && q2(v, V1.B) === q2(v, V1.C), sol: { x: 6, y: 3 }, alto: 200, manijas: [G2],
        lee: v => `$PA \\approx ${R1(dd(v, V1.A))} \\qquad PB \\approx ${R1(dd(v, V1.B))} \\qquad PC \\approx ${R1(dd(v, V1.C))}$`, dice: v => `Está a ${R1(dd(v, V1.A))} de A, a ${R1(dd(v, V1.B))} de B y a ${R1(dd(v, V1.C))} de C.` },
      'El tanque va en el circuncentro: el cruce de las mediatrices, a 5 de cada vereda.')],
  ], 'Cada condición es un lugar geométrico; puntos, triángulos y circunferencias salen de cruzar lugares.');
}
