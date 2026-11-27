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
