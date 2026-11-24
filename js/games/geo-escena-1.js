// Ejercicios de «Ángulos y paralelas» (pu-ge-1) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const gr = n => `${Math.round(n)}°`, rad = g => g * Math.PI / 180;

  // Un rayo parte la media vuelta: un ángulo debe ser k veces el otro.  v { a }
  const O = [170, 160];
  XG.figura('vecinos-razon', {
    ini: () => ({ a: 90 }),
    manijas: () => [{ k: 'a', min: 12, max: 168, paso: 3, inv: true, en: v => XPK.at(...O, 120, v.a), de: (x, y) => (y > O[1] ? (x < O[0] ? 180 : 0) : Math.atan2(O[1] - y, x - O[0]) * 180 / Math.PI) }],
    ok: (v, p) => v.a === p.k * (180 - v.a),
    sol: p => ({ a: 180 * p.k / (p.k + 1) }),
    texto: p => `$${p.k + 1}x = 180^\\circ$: miden $${180 / (p.k + 1)}^\\circ$ y $${180 * p.k / (p.k + 1)}^\\circ$`,
    alto: () => 190,
    dib(v, K, p, f) {
      const R = K.at(...O, 120, v.a), D = [305, O[1]], I = [35, O[1]], o = 180 - v.a, M = K.at(O[0], O[1] + 5, 54, v.a + o / 2);
      let cortes = '';
      for (let g = o, n = 1; f && g * n < v.a - 0.5 && n < 9; n++) cortes += K.l(...O, ...K.at(...O, 70, v.a - g * n), 'lg d');
      return K.ang(O, D, R, 44, gr(v.a), 'fa', 'ta') + K.ang(O, R, I, 36, '', 'fg') + K.f(f, cortes) + K.t(...M, f > 0.5 ? gr(o) : '?', 'tg') + K.l(...I, ...D) + K.l(...O, ...R, 'la gr') + K.c(...O, 4, 'fk');
    },
    lee: v => `$${Math.round(v.a)}^\\circ + ${180 - Math.round(v.a)}^\\circ = 180^\\circ$`,
    aviso: (v, p) => (v.a === 180 - 180 / p.k ? `Son ${p.k + 1} partes: ${p.k} de uno y una del otro.` : v.a > p.k * (180 - v.a) ? `Es más de ${p.k} veces el dorado.` : `No llega a ${p.k} veces el dorado.`),
    bien: (v, p) => `Son ${p.k + 1} partes iguales: ${p.k} de un lado y una del otro.`,
  });

  // Complementario, suplementario y opuesto por el vértice del mismo ángulo.
  XG.rotula('tres-parientes', {
    slots: () => [{ x: 130, y: 42, w: 58, h: 38 }, { x: 130, y: 112, w: 58, h: 38 }, { x: 130, y: 182, w: 58, h: 38 }],
    fichas: p => p.fichas, metas: p => [90 - p.a, 180 - p.a, p.a].map(gr),
    texto: p => `complementario $${90 - p.a}^\\circ$, suplementario $${180 - p.a}^\\circ$, opuesto $${p.a}^\\circ$`,
    alto: () => 214,
    fondo(K, p) {
      const a = p.a, e = (y, t) => K.t(6, y + 5, t, 's', 'start'), V = [215, 70], W = [246, 138], C = [246, 188], P = (c, r, g) => K.at(...c, r, g), dato = c => K.t(...P([c[0], c[1] + 5], 58, a / 2), gr(a), 's ta');
      return e(42, 'complementario') + e(112, 'suplementario') + e(182, 'opuesto')
        + K.ang(V, P(V, 50, 0), P(V, 50, a), 36, '', 'fa') + K.ang(V, P(V, 50, a), P(V, 50, 90), 24, '', 'fg') + K.l(...V, ...P(V, 100, 0)) + K.l(...V, ...P(V, 58, 90)) + K.l(...V, ...P(V, 80, a), 'la') + dato(V)
        + K.ang(W, P(W, 50, 0), P(W, 50, a), 36, '', 'fa') + K.ang(W, P(W, 50, a), P(W, 50, 180), 20, '', 'fg') + K.l(176, W[1], 330, W[1]) + K.l(...W, ...P(W, 74, a), 'la') + dato(W)
        + K.ang(C, P(C, 50, 0), P(C, 50, a), 34, '', 'fa') + K.ang(C, P(C, 50, 180), P(C, 50, 180 + a), 34, '', 'fg') + K.l(176, C[1], 330, C[1]) + K.l(...P(C, 56, a), ...P(C, 52, 180 + a), 'la') + dato(C);
    },
    aviso(q, p) { return q[0][0] === gr(180 - p.a) ? 'Complementarios: juntos hacen la esquina recta, 90°.' : q[2][0] !== gr(p.a) ? 'Los opuestos por el vértice abren lo mismo.' : 'Mira qué completan: una esquina recta o media vuelta.'; },
    bien: () => 'Uno completa 90°, otro 180° y el opuesto es igual.',
  });

  // Dos paralelas y una transversal: con un ángulo se conocen los demás.
  const metasCruce = p => [p.a, p.a, 180 - p.a, p.a].map(gr);
  XG.rotula('cruce-ocho', {
    slots: () => [{ x: 288, y: 28, w: 58, h: 36 }, { x: 60, y: 94, w: 58, h: 36 }, { x: 270, y: 94, w: 58, h: 36 }, { x: 52, y: 192, w: 58, h: 36 }],
    fichas: p => p.fichas, metas: metasCruce,
    texto: p => `los iguales miden $${p.a}^\\circ$ y el conjugado, $${180 - p.a}^\\circ$`,
    alto: () => 218,
    fondo(K, p) {
      const t = Math.tan(rad(p.a)), Y1 = 62, Y2 = 160, X = y => 168 + (110 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], up = [X(14), 14], dn = [X(208), 208], d = (W, s) => [W[0] + 100 * s, W[1]];
      return K.ang(Q, d(Q, 1), P, 28, gr(p.a), 'fa', 'ta') + K.ang(P, d(P, 1), up, 24, '', 'fg') + K.ang(P, d(P, -1), Q, 24, '', 'ff') + K.ang(P, d(P, 1), Q, 18, '', 'fo') + K.ang(Q, d(Q, -1), dn, 24, '', 'fg')
        + K.l(10, Y1, 330, Y1) + K.l(10, Y2, 330, Y2) + K.l(...up, ...dn, 'la gr')
        + K.l(258, 36, P[0] + 22, 50, 'lg d') + K.l(90, 90, P[0] - 22, 72, 'lf d') + K.l(240, 90, P[0] + 18, 72, 'lo d') + K.l(82, 188, Q[0] - 20, 172, 'lg d');
    },
    aviso(q, p) { const m = metasCruce(p); return q[2][0] === m[0] ? 'Los dos de adentro y del mismo lado no son iguales: suman 180°.' : q[1][0] !== m[1] ? 'Los alternos internos forman una Z y son iguales.' : q[3][0] !== m[3] ? 'Los opuestos por el vértice son iguales.' : 'Los de la misma esquina, en cada cruce, son iguales.'; },
    bien: () => 'Solo hay dos medidas: las iguales y la que completa 180°.',
  });

  // Conjugados internos: el de arriba mide `dif` más que el de abajo.  v { a }
  const Y1 = 64, Y2 = 156;
  XG.figura('conjugados-justos', {
    ini: () => ({ a: 90 }),
    manijas: () => [{ k: 'a', min: 40, max: 140, paso: 5, inv: true, en: v => [170 + 86 / Math.tan(rad(v.a)), 24], de: x => Math.atan2(86, x - 170) * 180 / Math.PI }],
    ok: (v, p) => 180 - v.a === v.a + p.dif,
    sol: p => ({ a: (180 - p.dif) / 2 }),
    texto: p => `$x + (x + ${p.dif}) = 180$: miden $${(180 - p.dif) / 2}^\\circ$ y $${(180 + p.dif) / 2}^\\circ$`,
    alto: () => 206, pie: 'Arrastra la punta de la transversal.',
    dib(v, K, p, f) {
      const t = Math.tan(rad(v.a)), X = y => 170 + (110 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], d = W => [W[0] + 100, W[1]];
      return K.ang(P, d(P), Q, 24, f > 0.5 ? gr(180 - v.a) : '?', 'fg', 'tg') + K.ang(Q, d(Q), P, 24, gr(v.a), 'fa', 'ta') + K.l(14, Y1, 326, Y1) + K.l(14, Y2, 326, Y2) + K.l(X(24), 24, X(198), 198, 'la gr');
    },
    lee: v => `$${Math.round(v.a)}^\\circ + ${180 - Math.round(v.a)}^\\circ = 180^\\circ$`,
    aviso: (v, p) => (v.a === (180 + p.dif) / 2 ? 'Al revés: el mayor debe ser el dorado.' : `El dorado mide ${180 - v.a}° y el de abajo ${v.a}°: no se llevan ${p.dif}°.`),
    bien: (v, p) => `${180 - v.a}° es ${p.dif}° más que ${v.a}°, y juntos dan 180°.`,
  });

  // Los dos ángulos de la base: iguales, y que arriba quede el pedido.  v { a, b }
  const T = v => { const ta = Math.tan(rad(v.a)), tb = Math.tan(rad(v.b)), x = 190 * tb / (ta + tb); return [[75, 178], [265, 178], [75 + x, 178 - x * ta]]; };
  const medio = (P, Q) => [P[0] + (Q[0] - P[0]) * 0.68, P[1] + (Q[1] - P[1]) * 0.68];
  XG.figura('tercer-angulo', {
    ini: () => ({ a: 34, b: 44 }),
    manijas: () => [{ k: 'a', min: 30, max: 58, paso: 2, r: 9, en: v => medio(T(v)[0], T(v)[2]), de: (x, y) => Math.atan2(178 - y, x - 75) * 180 / Math.PI },
      { k: 'b', min: 30, max: 58, paso: 2, r: 9, en: v => medio(T(v)[1], T(v)[2]), de: (x, y) => Math.atan2(178 - y, 265 - x) * 180 / Math.PI }],
    ok: (v, p) => v.a === v.b && 180 - v.a - v.b === p.top,
    sol: p => ({ a: (180 - p.top) / 2, b: (180 - p.top) / 2 }),
    texto: p => `$180^\\circ - ${p.top}^\\circ = ${180 - p.top}^\\circ$, y la mitad es $${(180 - p.top) / 2}^\\circ$`,
    alto: () => 200, pie: 'Arrastra los dos lados para abrir los ángulos de abajo.',
    dib(v, K, p, f) {
      const [A, B, C] = T(v);
      return K.ang(A, B, C, 34, gr(v.a), 'fa', 'ta') + K.ang(B, C, A, 34, gr(v.b), 'fg', 'tg') + K.ang(C, A, B, 20, f > 0.5 ? gr(180 - v.a - v.b) : '?', 'ff', 'tf') + K.pl([A, B, C, A]);
    },
    lee: v => `$${Math.round(v.a)}^\\circ + ${Math.round(v.b)}^\\circ + ${Math.round(180 - v.a - v.b)}^\\circ = 180^\\circ$`,
    aviso: (v, p) => (180 - v.a - v.b === p.top ? 'Arriba quedó bien, pero los de abajo debían ser iguales.' : v.a !== v.b ? 'Los de abajo deben ser iguales, y los tres suman 180°.' : `Arriba quedaron ${180 - v.a - v.b}°, no ${p.top}°.`),
    bien: () => 'Lo que falta para 180° se reparte por igual entre los dos de abajo.',
  });

  // Ángulo exterior: se corre el vértice B por el piso; se lee el ángulo de arriba.  v { c }
  const AC = 108, A0 = [60, 172];
  const EX = (v, p) => [A0[0] + AC * Math.sin(rad(v.c)) / Math.sin(rad(180 - p.a - v.c)), 172];
  XG.figura('exterior-alcanza', {
    ini: () => ({ c: 30 }),
    manijas: p => [{ k: 'c', min: 20, max: 75, paso: 5, en: v => EX(v, p), de(x) { let m = 20, e = 1e9; for (let c = 20; c <= 75; c += 5) { const q = Math.abs(EX({ c }, p)[0] - x); if (q < e) { e = q; m = c; } } return m; } }],
    ok: (v, p) => v.c + p.a === p.ext,
    sol: p => ({ c: p.ext - p.a }),
    texto: p => `$${p.ext}^\\circ - ${p.a}^\\circ = ${p.ext - p.a}^\\circ$`,
    alto: () => 205, pie: 'Arrastra el vértice de la derecha por el piso.',
    dib(v, K, p, f) {
      const C = K.at(...A0, AC, p.a), B = EX(v, p);
      return K.ang(A0, B, C, 30, gr(p.a), 'fa', 'ta') + K.ang(C, A0, B, 26, gr(v.c), 'ff', 'tf') + K.ang(B, [B[0] + 60, 172], C, 24, f > 0.5 ? gr(p.a + v.c) : '?', 'fo', 'to') + K.l(A0[0], 172, Math.min(334, B[0] + 90), 172, 'lm') + K.pl([A0, B, C, A0]);
    },
    lee: (v, p) => `$${p.a}^\\circ + ${Math.round(v.c)}^\\circ = ${Math.round(p.a + v.c)}^\\circ$`,
    aviso: (v, p) => (v.c === 180 - p.ext ? 'Ese es el vecino del exterior, el de adentro.' : `El exterior quedó en ${p.a + v.c}°.`),
    bien: () => 'El exterior reúne los dos ángulos lejanos.',
  });

  // Polígono regular: cuántos lados para que cada ángulo mida lo pedido.  v { n }
  XG.figura('poligono-regular', {
    ini: () => ({ n: 4 }),
    manijas: () => [{ k: 'n', min: 3, max: 20, paso: 1, et: 'lados' }],
    ok: (v, p) => (v.n - 2) * 180 === p.ang * v.n,
    sol: p => ({ n: 360 / (180 - p.ang) }),
    texto(p) { const n = 360 / (180 - p.ang); return `$(${n} - 2) \\cdot 180^\\circ \\div ${n} = ${p.ang}^\\circ$`; },
    alto: () => 246, pie: 'Arrastra el número de lados.',
    dib(v, K, p, f) {
      const n = Math.round(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 92, 80, 90 + i * 360 / n));
      let h = '';
      for (let i = 1; i < n - 1; i++) h += K.f(f * (n - 2) - i + 1, K.p([P[0], P[i], P[i + 1]], ['fa', 'fg', 'ff', 'fo'][i % 4]));
      return h + K.p(P, 'fn') + K.t(8, 18, `${n} lados`, 'tm', 'start') + K.f(f * 2 - 1, K.t(332, 18, `${n - 2} ${n === 3 ? 'triángulo' : 'triángulos'}`, 'ta', 'end'));
    },
    lee: v => { const n = Math.round(v.n), a = (n - 2) * 180 / n; return `$${(n - 2) * 180}^\\circ \\div ${n} ${Number.isInteger(a) ? '=' : '\\approx'} ${Math.round(a * 10) / 10}^\\circ$`; },
    aviso: (v, p) => ((v.n - 2) * 180 < p.ang * v.n ? 'Cada ángulo quedó más cerrado: con más lados se abren.' : 'Cada ángulo quedó más abierto: tiene demasiados lados.'),
    bien: v => `${v.n - 2} triángulos, repartidos entre ${v.n} ángulos iguales.`,
  });

  // En movimiento: el rayo del faro sale con el ángulo que se le da (de 5 en 5).
  XG.tiros('lanza-angulo', {
    perilla: () => ({ et: 'Ángulo', min: 0, max: 36, cara: v => v * 5, lee: v => `${v * 5}°` }),
    meta: t => t.r / 5, alto: 178, ms: 1500,
    dib(t, v, K, p, f) {
      const C = [170, 156];
      let h = K.arc(...C, 128, 0, 180, 'lm');
      for (let g = 0; g <= 180; g += 15) h += K.l(...K.at(...C, g % 45 ? 124 : 119, g), ...K.at(...C, 128, g), 'lm');
      h += K.l(24, 156, 316, 156);
      if (v != null) {
        const a = v * 5 * Math.min(1, f * 1.5), u = Math.max(0, f * 3 - 2);
        h += K.sec(...C, 34, 0, a, 'fa') + K.l(...C, ...K.at(...C, 40 + 88 * u, a), 'la gr') + K.f(f * 3 - 2, (v * 5 === t.r ? K.c(...K.at(...C, 138, t.r), 6, 'fo') : '') + K.t(...K.at(170, 161, 60, Math.max(16, Math.min(164, v * 2.5))), `${v * 5}°`, 'ta'));
      }
      return h + K.c(...C, 6, 'fk');
    },
    falla: (t, v) => (t.e?.[v * 5] || (v * 5 > t.r ? 'Abrió demasiado.' : 'Le faltó abrir.')),
    cuenta: t => `$${t.c} = ${t.r}^\\circ$`, pie: 'Estira el ángulo y suelta: sale el rayo.',
  });
})();
