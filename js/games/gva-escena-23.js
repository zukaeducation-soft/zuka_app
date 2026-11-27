// Geometría Vectorial · juegos de la lección geo-23 «La elipse y la hipérbola» (spec 2026-11-27-curso-geometria-vectorial).
// La elipse como lugar d₁ + d₂ = 2a (la cuerda del jardinero), sus focos (c² = a² − b²) y su propiedad reflectora, su ecuación
// ordinaria y su ficha (e, lado recto); la hipérbola con su rectángulo auxiliar y sus asíntotas, sus focos (c² = a² + b², e > 1),
// el tipo de cónica por los signos de A y C, y la localización por diferencia de distancias. La circunferencia y la parábola son de
// geo-22. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const pt = q => `(${q.map(N).join(', ')})`;
  const r2 = x => Math.round(x * 100) / 100;
  const en = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  // Rejilla con el origen en O y u píxeles por unidad, en la ventana [x0, x1, y0, y1].
  const rej = (K, O, u, [x0, x1, y0, y1]) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  // Una curva por puntos, cortada a la caja [X0, X1, Y0, Y1] en píxeles (lo que sale de la caja no se dibuja).
  const corta = (K, pts, cls, [X0, X1, Y0, Y1]) => {
    let h = '', run = [];
    const va = () => { if (run.length > 1) h += K.pl(run, cls); run = []; };
    for (const q of pts) { if (q[0] >= X0 && q[0] <= X1 && q[1] >= Y0 && q[1] <= Y1) run.push(q); else va(); }
    va();
    return h;
  };
  // Elipse de centro (h, k) con semieje horizontal A y vertical B; hipérbola con rectángulo de semiancho A y semialto B,
  // que abre a los lados (d = 0) o hacia arriba y abajo (d = 1).
  const elipse = (Q, h, k, A, B) => Array.from({ length: 145 }, (_, i) => { const t = i / 144 * 2 * Math.PI; return Q(h + A * Math.cos(t), k + B * Math.sin(t)); });
  const ramas = (Q, h, k, A, B, d, S = 3) => [1, -1].map(sg => Array.from({ length: 121 }, (_, i) => {
    const s = -S + 2 * S * i / 120;
    return d ? Q(h + A * Math.sinh(s), k + sg * B * Math.cosh(s)) : Q(h + sg * A * Math.cosh(s), k + B * Math.sinh(s));
  }));
  const hiper = (K, Q, h, k, A, B, d, cls, caja) => ramas(Q, h, k, A, B, d).map(r => corta(K, r, cls, caja)).join('');
  // Recta por (x₁, y₁) y (x₂, y₂) en unidades, cortada a la caja.
  const recta = (K, Q, [x1, y1], [x2, y2], cls, caja) => corta(K, Array.from({ length: 81 }, (_, i) => Q(x1 + (x2 - x1) * i / 80, y1 + (y2 - y1) * i / 80)), cls, caja);
  // Rótulo con una placa detrás, para que se lea sobre la rejilla.
  const plato = (K, x, y, s, cls, a = 'start') => {
    const w = s.length * 5.6 + 10, x0 = a === 'start' ? x - 5 : a === 'end' ? x - w + 5 : x - w / 2;
    return K.r(x0, y - 13, w, 18, 'fc', 5) + K.t(x, y, s, cls, a);
  };
  // (x − h) escrito con su signo, en texto plano: x − 2, x + 3 o x.
  const menos = (s, h) => (h > 0 ? `${s} − ${h}` : h < 0 ? `${s} + ${-h}` : s);
  const cuad = (s, h) => (h ? `(${menos(s, h)})²` : `${s}²`);

  // ------------------------------------------------------------ cuerda-del-jardinero · la elipse es d₁ + d₂ = 2a
  // Una cuerda de largo L amarrada a dos estacas en (±c, 0); el lápiz la tensa. Se arrastra el lápiz al punto más alto.
  //   v { a, b }   params { c, L, ini: [x, y], ok }
  const JO = [170, 122], JU = 20, JQ = en(JO, JU), JW = [-7, 7, -4, 4], JC = [JO[0] - 7 * JU, JO[0] + 7 * JU, JO[1] - 4 * JU, JO[1] + 4 * JU];
  const JB = p => Math.sqrt((p.L / 2) ** 2 - p.c ** 2);
  const JD = (v, p) => [Math.hypot(v.a + p.c, v.b), Math.hypot(v.a - p.c, v.b)];
  XG.figura('cuerda-del-jardinero', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: ['a', 'b'], min: [-6, -4], max: [6, 4], paso: 1, en: v => JQ(v.a, v.b), de: (x, y) => [(x - JO[0]) / JU, (JO[1] - y) / JU] }],
    ok: (v, p) => v.a === 0 && v.b === JB(p),
    sol: p => ({ a: 0, b: JB(p) }),
    texto: p => { const b = JB(p); return `$d_1 + d_2 = 2\\sqrt{${p.c}^2 + ${b}^2} = ${p.L}$: el punto más alto es $(0, ${b})$, con $a = ${p.L / 2}$ y $b = ${b}$`; },
    alto: () => 240, pie: 'Arrastra el lápiz: la cuerda lo sigue.',
    dib(v, K, p, f) {
      const [d1, d2] = JD(v, p), s = d1 + d2, F1 = JQ(-p.c, 0), F2 = JQ(p.c, 0), L = JQ(v.a, v.b), on = Math.abs(s - p.L) < 1e-6;
      let h = rej(K, JO, JU, JW);
      if (f > 0) h += K.f(f, corta(K, elipse(JQ, 0, 0, p.L / 2, JB(p)), 'lo d', JC));
      h += K.pl([F1, L, F2], 'lg gr') + K.c(...F1, 5, 'fk') + K.c(...F2, 5, 'fk');
      h += K.t(F1[0], F1[1] + 18, 'F₁', 's tm') + K.t(F2[0], F2[1] + 18, 'F₂', 's tm');
      if (f > 0) {
        h += K.f(f, K.t((F1[0] + L[0]) / 2 - 6, (F1[1] + L[1]) / 2 - 6, `${N(d1)}`, 's tg', 'end') + K.t((F2[0] + L[0]) / 2 + 6, (F2[1] + L[1]) / 2 - 6, `${N(d2)}`, 's tg', 'start'));
        h += K.f(f, K.t(330, 230, `d₁ + d₂ = ${N(s)} m${on ? '' : s > p.L ? ': no alcanza' : ': floja'}`, `s ${on ? 'to' : 'ta'}`, 'end'));
      }
      return h + K.t(14, 18, `estacas a ${2 * p.c} m · cuerda de ${p.L} m`, 's tm', 'start') + K.t(14, 230, `lápiz en ${pt([v.a, v.b])}`, 's ta', 'start');
    },
    lee: (v, p) => { const [d1, d2] = JD(v, p); return `$d_1 + d_2 = ${N(d1)} + ${N(d2)} = ${N(d1 + d2)}$ m`; },
    aviso(v, p) {
      const [d1, d2] = JD(v, p), s = d1 + d2, a = p.L / 2;
      if (Math.abs(s - p.L) < 1e-6) return `Ese punto sí está en la curva: d₁ + d₂ = ${p.L}. Pero no es el más alto, que queda en medio de las estacas.`;
      if (v.a === 0 && v.b === a) return `${a} es la mitad de la cuerda, pero cada mitad va en diagonal desde una estaca: ${a}² = ${p.c}² + b².`;
      if (v.a === 0 && v.b === p.c) return `Con altura ${p.c} cada tramo mide √(${p.c}² + ${p.c}²) ≈ ${N(d1)} m: la cuerda no alcanza.`;
      if (v.a !== 0) return 'El punto más alto queda en el medio, sobre x = 0: allí los dos tramos de cuerda miden lo mismo.';
      return s > p.L ? `Ahí d₁ + d₂ = ${N(s)} m: la cuerda de ${p.L} m no alcanza. Acerca el lápiz al eje x.` : `Ahí d₁ + d₂ = ${N(s)} m: la cuerda queda floja. Aléjalo del eje x hasta tensarla.`;
    },
    bien: p => p.ok || 'La suma de las distancias a las estacas es el largo de la cuerda: eso es la elipse.',
  });

  // ------------------------------------------------------------ galeria-de-susurros · los focos y la propiedad reflectora
  // Una sala (o un reflector) con forma de elipse de semiejes a (largo) y b. Se arrastra al que emite sobre el eje largo; el otro
  // queda a la misma distancia del otro lado. Al comprobar, los rayos rebotan en la pared: si están en los focos, se juntan.
  //   v { x }   params { a, b, et: [emite, recibe], ok }
  const GU = p => Math.min(140 / p.a, 100 / p.b), GOr = p => [170, 34 + p.b * GU(p)];
  const GC = p => Math.sqrt(p.a ** 2 - p.b ** 2);
  // Rayo desde (x, 0) con ángulo t: punto de la pared y dirección reflejada (en unidades de la elipse).
  const rebote = (p, x, t) => {
    const c = Math.cos(t), s = Math.sin(t), A = c * c / p.a ** 2 + s * s / p.b ** 2, B = 2 * x * c / p.a ** 2, C = x * x / p.a ** 2 - 1;
    const k = (-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A), W = [x + k * c, k * s];
    let n = [W[0] / p.a ** 2, W[1] / p.b ** 2]; const m = Math.hypot(...n); n = [n[0] / m, n[1] / m];
    const dn = c * n[0] + s * n[1], r = [c - 2 * dn * n[0], s - 2 * dn * n[1]];
    const L = Math.abs(r[1]) > 1e-9 && r[1] * W[1] < 0 ? -W[1] / r[1] : p.a;
    return [W, [W[0] + r[0] * L, W[1] + r[1] * L]];
  };
  XG.figura('galeria-de-susurros', {
    ini: p => ({ x: p.ini ?? 1 }),
    manijas: p => { const O = GOr(p), u = GU(p); return [{ k: 'x', min: 0, max: p.a, paso: 1, en: v => [O[0] + v.x * u, O[1]], de: x => (x - O[0]) / u }]; },
    ok: (v, p) => v.x === GC(p),
    sol: p => ({ x: GC(p) }),
    texto: p => `$c = \\sqrt{a^2 - b^2} = \\sqrt{${p.a ** 2} - ${p.b ** 2}} = ${GC(p)}$: cada uno a ${GC(p)} del centro, en los focos`,
    alto: p => Math.round(2 * p.b * GU(p) + 68), pie: 'Arrastra al que emite por el eje largo.',
    dib(v, K, p, f) {
      const O = GOr(p), u = GU(p), Q = en(O, u), H = Math.round(2 * p.b * GU(p) + 68), et = p.et || ['habla', 'escucha'];
      let h = corta(K, elipse(Q, 0, 0, p.a, p.b), 'lm gr', [0, 340, 0, H]) + K.l(...Q(-p.a, 0), ...Q(p.a, 0), 'lr d');
      for (let i = -p.a + 1; i < p.a; i++) h += K.l(Q(i, 0)[0], O[1] - 3, Q(i, 0)[0], O[1] + 3, 'lm');
      if (f > 0) {
        const junta = v.x === GC(p), cls = junta ? 'lo' : 'la';
        for (let i = 0; i < 10; i++) {
          const t = (i + 0.5) / 10 * 2 * Math.PI;
          if (Math.abs(Math.sin(t)) < 0.2) continue;
          const [W, E] = rebote(p, v.x, t), S = [v.x, 0], g = Math.min(1, f * 2), g2 = Math.max(0, f * 2 - 1);
          h += K.l(...Q(...S), ...Q(S[0] + (W[0] - S[0]) * g, (W[1]) * g), cls);
          if (g2 > 0) h += K.l(...Q(...W), ...Q(W[0] + (E[0] - W[0]) * g2, W[1] + (E[1] - W[1]) * g2), cls);
        }
        if (f >= 1) h += K.t(330, H - 10, junta ? 'todo llega al otro foco' : 'los rebotes se dispersan', `s ${junta ? 'to' : 'ta'}`, 'end');
      }
      h += K.c(...Q(-v.x, 0), 7, 'fk') + K.t(Q(-v.x, 0)[0], O[1] - 14, et[1], 's tm') + K.t(Q(v.x, 0)[0], O[1] + 32, et[0], 's ta');
      return h + K.t(14, 18, `a ${v.x} del centro`, 's ta', 'start') + K.t(330, 18, `largo ${2 * p.a} · ancho ${2 * p.b}`, 's tm', 'end');
    },
    lee: v => `a $${v.x}$ del centro`,
    aviso(v, p) {
      if (v.x === p.b) return `${p.b} es el semieje menor. Los focos están a c del centro, con c² = a² − b².`;
      if (v.x === p.a) return 'Ahí están los vértices, pegados a la pared: los rebotes salen hacia todos lados.';
      if (v.x === 0) return 'En el centro los dos quedarían juntos: los focos están uno a cada lado, a c del centro.';
      return `A ${v.x} del centro los rebotes no se juntan en el otro. Calcula c con c² = ${p.a}² − ${p.b}².`;
    },
    bien: p => p.ok || 'Lo que sale de un foco rebota en la elipse y llega al otro foco.',
  });

  // ------------------------------------------------------------ elipse-centro-y-semiejes · de la ecuación ordinaria a la figura
  // Se arrastran el centro (h, k) y los extremos de los semiejes horizontal A y vertical B; la elipse se dibuja en vivo.
  //   v { h, k, A, B }   params { h, k, A, B, ini, ok }
  const EO = [170, 120], EU = 12, EQ = en(EO, EU), EW = [-13, 13, -9, 9], EC = [EO[0] - 13 * EU, EO[0] + 13 * EU, EO[1] - 9 * EU, EO[1] + 9 * EU];
  const eqE = (v, A, B) => `${cuad('x', v.h)}/${A * A} + ${cuad('y', v.k)}/${B * B} = 1`;
  XG.figura('elipse-centro-y-semiejes', {
    ini: p => ({ ...p.ini }),
    manijas: () => [
      { k: ['h', 'k'], min: [-5, -3], max: [5, 3], paso: 1, en: v => EQ(v.h, v.k), de: (x, y) => [(x - EO[0]) / EU, (EO[1] - y) / EU] },
      { k: 'A', min: 2, max: 7, paso: 1, en: v => EQ(v.h + v.A, v.k), de: (x, y, v) => (x - EO[0]) / EU - v.h },
      { k: 'B', min: 2, max: 6, paso: 1, en: v => EQ(v.h, v.k + v.B), de: (x, y, v) => (EO[1] - y) / EU - v.k }],
    ok: (v, p) => v.h === p.h && v.k === p.k && v.A === p.A && v.B === p.B,
    sol: p => ({ h: p.h, k: p.k, A: p.A, B: p.B }),
    texto: p => { const c = Math.sqrt(Math.abs(p.A ** 2 - p.B ** 2)); return `Centro $(${p.h}, ${p.k})$, semiejes $${p.A}$ en $x$ y $${p.B}$ en $y$; $c = ${N(c)}$`; },
    alto: () => 240, pie: 'Arrastra el centro y las puntas de los semiejes.',
    dib(v, K, p, f) {
      let h = rej(K, EO, EU, EW) + corta(K, elipse(EQ, v.h, v.k, v.A, v.B), 'la gr', EC);
      h += K.l(...EQ(v.h, v.k), ...EQ(v.h + v.A, v.k), 'lm d') + K.l(...EQ(v.h, v.k), ...EQ(v.h, v.k + v.B), 'lm d');
      if (f > 0 && v.A !== v.B) {
        const c = Math.sqrt(Math.abs(v.A ** 2 - v.B ** 2)), F = v.A > v.B ? [[v.h + c, v.k], [v.h - c, v.k]] : [[v.h, v.k + c], [v.h, v.k - c]];
        h += K.f(f, F.map(q => K.c(...EQ(...q), 4, 'fo')).join('') + plato(K, 330, 232, `focos ${F.map(pt).join(' y ')}`, 's to', 'end'));
      }
      if (f > 0) h += K.f(f, plato(K, 14, 40, eqE(v, v.A, v.B), `s ${this.ok(v, p) ? 'to' : 'ta'}`));
      return h + plato(K, 14, 18, `centro ${pt([v.h, v.k])} · semiejes ${v.A} y ${v.B}`, 's ta');
    },
    lee: v => `$\\dfrac{(x - (${v.h}))^2}{${v.A ** 2}} + \\dfrac{(y - (${v.k}))^2}{${v.B ** 2}} = 1$`,
    aviso(v, p) {
      const eq = eqE(p, p.A, p.B);
      if (v.A === p.B && v.B === p.A && p.A !== p.B) return `Están cambiados: en ${eq} el número bajo ${cuad('x', p.h)} es ${p.A ** 2}, así que el semieje horizontal es ${p.A}.`;
      if (v.h === -p.h && p.h && v.h !== p.h) return `Cuidado con el signo: ${menos('x', p.h)} es x − (${p.h}), así que h = ${p.h}.`;
      if (v.k === -p.k && p.k && v.k !== p.k) return `Cuidado con el signo: ${menos('y', p.k)} es y − (${p.k}), así que k = ${p.k}.`;
      if (v.h !== p.h || v.k !== p.k) return `El centro (h, k) se lee de (x − h) y (y − k) en ${eq}.`;
      if (v.A !== p.A) return `El semieje horizontal es la raíz del número bajo ${cuad('x', p.h)}: √${p.A ** 2}.`;
      return `El semieje vertical es la raíz del número bajo ${cuad('y', p.k)}: √${p.B ** 2}.`;
    },
    bien: p => p.ok || 'Centro y semiejes leídos de la ecuación: la elipse queda dibujada.',
  });

  // ------------------------------------------------------------ ficha-de-la-elipse · c, focos, excentricidad y lado recto
  // Una elipse de eje mayor horizontal (x − h)²/a² + (y − k)²/b² = 1. Se arrastran c, los dos focos (F₁ y F₂, en cualquier
  // orden), e y el lado recto.
  //   params { h, k, a, b, extra, trampas?, ok }
  const FS = [34, 80, 126, 172, 218].map(y => ({ x: 286, y, w: 84, h: 34 }));
  const FM = p => { const c = Math.sqrt(p.a ** 2 - p.b ** 2); return [N(c), pt([p.h + c, p.k]), pt([p.h - c, p.k]), N(c / p.a), N(2 * p.b ** 2 / p.a)]; };
  // Lugar por lugar; los focos (lugares 1 y 2) valen en cualquier orden, sin repetir.
  const FJ = (q, p) => {
    const m = FM(p), v = q.map(l => l?.[0]), foco = i => (v[i] === m[1] || v[i] === m[2]) && v[1] !== v[2];
    return m.map((x, i) => (i === 1 || i === 2 ? foco(i) : v[i] === x));
  };
  XG.rotula('ficha-de-la-elipse', {
    slots: () => FS, metas: FM, juzga: FJ, fichas: p => [...FM(p), ...p.extra], alto: () => 240,
    texto: p => { const m = FM(p).map(s => s.replace(/−/g, '-')); return `$c = ${m[0]}$, focos $${m[1]}$ y $${m[2]}$, $e = ${m[3]}$ y lado recto $${m[4]}$`; },
    fondo(K, p, f) {
      const u = 80 / p.a, C = [100, 128], Q = (x, y) => [C[0] + (x - p.h) * u, C[1] - (y - p.k) * u], c = Math.sqrt(p.a ** 2 - p.b ** 2), lr = p.b ** 2 / p.a;
      let h = K.l(14, C[1], 190, C[1], 'lr d') + K.l(C[0], 40, C[0], 216, 'lr d') + corta(K, elipse(Q, p.h, p.k, p.a, p.b), 'lg gr', [0, 200, 0, 240]);
      h += K.c(...C, 3, 'fk') + K.t(C[0] + 4, C[1] + 16, pt([p.h, p.k]), 's tm', 'start');
      h += K.t(14, 20, `${cuad('x', p.h)}/${p.a ** 2} + ${cuad('y', p.k)}/${p.b ** 2} = 1`, 's', 'start');
      h += K.f(f, [1, -1].map(s => K.c(...Q(p.h + s * c, p.k), 4, 'fo')).join('') + K.l(...Q(p.h + c, p.k - lr), ...Q(p.h + c, p.k + lr), 'lo gr'));
      return h + ['c =', 'F₁ =', 'F₂ =', 'e =', 'lado recto ='].map((s, i) => K.t(240, FS[i].y + 5, s, 's', 'end')).join('');
    },
    aviso(q, p) {
      const i = FJ(q, p).findIndex(b => !b);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        `En la elipse c² = a² − b² = ${p.a ** 2} − ${p.b ** 2}.`,
        'Los focos son (h ± c, k): desde el centro se camina c a cada lado, sobre el eje mayor.',
        'Los focos son (h ± c, k): desde el centro se camina c a cada lado, sobre el eje mayor.',
        'La excentricidad es e = c/a, un número entre 0 y 1 en la elipse.',
        `El lado recto mide 2b²/a = 2·${p.b ** 2}/${p.a}.`][i];
    },
    bien: p => p.ok || 'Con a y b sale c, y con c salen los focos y la excentricidad.',
  });

  // ------------------------------------------------------------ rectangulo-auxiliar-hiperbola · de la ecuación a la hipérbola
  // Se arrastran el centro y la esquina del rectángulo auxiliar (semiancho p, semialto q) y se elige hacia dónde abre;
  // las diagonales son las asíntotas y la hipérbola se dibuja en vivo.
  //   v { h, k, p, q, d }   params { h, k, p, q, d, ini, ok }
  const HO = [150, 118], HU = 14, HQ = en(HO, HU), HW = [-10, 12, -4, 8], HC = [HO[0] - 10 * HU, HO[0] + 12 * HU, HO[1] - 8 * HU, HO[1] + 4 * HU];
  const eqH = v => (v.d ? `${cuad('y', v.k)}/${v.q * v.q} − ${cuad('x', v.h)}/${v.p * v.p} = 1` : `${cuad('x', v.h)}/${v.p * v.p} − ${cuad('y', v.k)}/${v.q * v.q} = 1`);
  XG.figura('rectangulo-auxiliar-hiperbola', {
    ini: P => ({ ...P.ini }),
    manijas: () => [
      { k: ['h', 'k'], min: [-4, -3], max: [4, 3], paso: 1, en: v => HQ(v.h, v.k), de: (x, y) => [(x - HO[0]) / HU, (HO[1] - y) / HU] },
      { k: ['p', 'q'], min: [1, 1], max: [6, 5], paso: 1, en: v => HQ(v.h + v.p, v.k + v.q), de: (x, y, v) => [(x - HO[0]) / HU - v.h, (HO[1] - y) / HU - v.k] },
      { k: 'd', min: 0, max: 1, paso: 1, et: 'abre hacia', rot: v => (v.d ? '↕' : '↔') }],
    ok: (v, P) => v.h === P.h && v.k === P.k && v.p === P.p && v.q === P.q && v.d === P.d,
    sol: P => ({ h: P.h, k: P.k, p: P.p, q: P.q, d: P.d }),
    texto: P => `Centro $(${P.h}, ${P.k})$, rectángulo de $${2 * P.p} \\times ${2 * P.q}$, abre ${P.d ? 'hacia arriba y abajo' : 'a los lados'}; asíntotas de pendiente $\\pm\\tfrac{${P.q}}{${P.p}}$`,
    alto: () => 232, pie: 'Arrastra el centro y la esquina; elige hacia dónde abre.',
    dib(v, K, P, f) {
      let h = rej(K, HO, HU, HW);
      h += K.p([HQ(v.h - v.p, v.k - v.q), HQ(v.h + v.p, v.k - v.q), HQ(v.h + v.p, v.k + v.q), HQ(v.h - v.p, v.k + v.q)], 'fn') + K.l(...HQ(v.h - v.p, v.k - v.q), ...HQ(v.h + v.p, v.k - v.q), 'lm d');
      h += recta(K, HQ, [v.h - 12 * v.p, v.k - 12 * v.q], [v.h + 12 * v.p, v.k + 12 * v.q], 'lm', HC) + recta(K, HQ, [v.h - 12 * v.p, v.k + 12 * v.q], [v.h + 12 * v.p, v.k - 12 * v.q], 'lm', HC);
      h += hiper(K, HQ, v.h, v.k, v.p, v.q, v.d, 'la gr', HC);
      if (f > 0) {
        const c = Math.hypot(v.p, v.q), F = v.d ? [[v.h, v.k + c], [v.h, v.k - c]] : [[v.h + c, v.k], [v.h - c, v.k]];
        h += K.f(f, F.map(q => K.c(...HQ(...q), 4, 'fo')).join('') + plato(K, 14, 40, eqH(v), `s ${this.ok(v, P) ? 'to' : 'ta'}`));
      }
      return h + plato(K, 14, 18, `centro ${pt([v.h, v.k])} · rectángulo ${2 * v.p} × ${2 * v.q}`, 's ta');
    },
    lee: v => `asíntotas $y - (${v.k}) = \\pm\\tfrac{${v.q}}{${v.p}}(x - (${v.h}))$`,
    aviso(v, P) {
      const y = cuad('y', P.k), x = cuad('x', P.h);
      if (v.d !== P.d) return `El término positivo es el de ${P.d ? y : x}: la hipérbola abre ${P.d ? 'hacia arriba y hacia abajo' : 'hacia los lados'}.`;
      if (v.h === -P.h && P.h && v.h !== P.h) return `Cuidado con el signo: ${menos('x', P.h)} es x − (${P.h}), así que h = ${P.h}.`;
      if (v.k === -P.k && P.k && v.k !== P.k) return `Cuidado con el signo: ${menos('y', P.k)} es y − (${P.k}), así que k = ${P.k}.`;
      if (v.h !== P.h || v.k !== P.k) return 'El centro (h, k) se lee de (x − h) y (y − k).';
      if (v.p === P.q && v.q === P.p && P.p !== P.q) return `Están cambiados: bajo ${y} está ${P.q ** 2}, así que el semialto es ${P.q}; bajo ${x}, ${P.p ** 2}: el semiancho es ${P.p}.`;
      if (v.p === P.p ** 2 || v.q === P.q ** 2) return 'Bajo cada cuadrado está el semieje al cuadrado: el rectángulo va √ de cada denominador a cada lado del centro.';
      return `El rectángulo va ±√${P.p ** 2} en x y ±√${P.q ** 2} en y desde el centro; sus diagonales son las asíntotas.`;
    },
    bien: P => P.ok || 'El rectángulo auxiliar da las asíntotas, y la hipérbola se pega a ellas.',
  });

  // ------------------------------------------------------------ focos-de-la-hiperbola · c² = a² + b² y e = c/a > 1
  // La hipérbola x²/a² − y²/b² = 1 con su rectángulo. Se arrastra el foco derecho por el eje (el otro va igual) y se desliza e.
  //   v { c, i }   params { a, b, es: [valores de e], ini, ok }
  const ZO = [170, 92], ZU = 16, ZQ = en(ZO, ZU), ZW = [-9, 9, -3, 5], ZC = [ZO[0] - 9 * ZU, ZO[0] + 9 * ZU, ZO[1] - 5 * ZU, ZO[1] + 3 * ZU];
  const ZF = p => Math.hypot(p.a, p.b);
  XG.figura('focos-de-la-hiperbola', {
    ini: p => ({ ...p.ini }),
    manijas: p => [{ k: 'c', min: 0, max: 9, paso: 1, en: v => ZQ(v.c, 0), de: x => (x - ZO[0]) / ZU },
      { k: 'i', min: 0, max: p.es.length - 1, paso: 1, et: 'excentricidad e', rot: v => p.es[v.i] }],
    ok: (v, p) => v.c === ZF(p) && p.es[v.i] === N(ZF(p) / p.a),
    sol: p => ({ c: ZF(p), i: p.es.indexOf(N(ZF(p) / p.a)) }),
    texto: p => `$c = \\sqrt{a^2 + b^2} = \\sqrt{${p.a ** 2} + ${p.b ** 2}} = ${ZF(p)}$ y $e = \\tfrac{c}{a} = \\tfrac{${ZF(p)}}{${p.a}} = ${N(ZF(p) / p.a)}$`,
    alto: () => 204, pie: 'Arrastra el foco por el eje y desliza la excentricidad.',
    dib(v, K, p, f) {
      let h = rej(K, ZO, ZU, ZW) + K.l(...ZQ(-p.a, -p.b), ...ZQ(p.a, -p.b), 'lm d') + K.l(...ZQ(p.a, -p.b), ...ZQ(p.a, p.b), 'lm d') + K.l(...ZQ(p.a, p.b), ...ZQ(-p.a, p.b), 'lm d') + K.l(...ZQ(-p.a, p.b), ...ZQ(-p.a, -p.b), 'lm d');
      h += recta(K, ZQ, [-9, -9 * p.b / p.a], [9, 9 * p.b / p.a], 'lm', ZC) + recta(K, ZQ, [-9, 9 * p.b / p.a], [9, -9 * p.b / p.a], 'lm', ZC);
      h += hiper(K, ZQ, 0, 0, p.a, p.b, 0, 'lg gr', ZC) + K.c(...ZQ(p.a, 0), 3, 'fk') + K.c(...ZQ(-p.a, 0), 3, 'fk') + K.c(...ZQ(-v.c, 0), 6, 'fa');
      if (f > 0) {
        const P = [ZF(p), p.b ** 2 / p.a], d1 = Math.hypot(P[0] + v.c, P[1]), d2 = Math.hypot(P[0] - v.c, P[1]), dd = r2(Math.abs(d1 - d2)), bien = Math.abs(dd - 2 * p.a) < 1e-6;
        h += K.f(f, K.arc(...ZO, v.c * ZU, 0, 360, 'lo d') + K.c(...ZQ(...P), 4, 'fk') + K.l(...ZQ(...P), ...ZQ(-v.c, 0), 'lf') + K.l(...ZQ(...P), ...ZQ(v.c, 0), 'lf'));
        h += K.f(f, plato(K, 330, 40, `|d₁ − d₂| = ${N(dd)}${bien ? ` = 2a` : ` ≠ ${2 * p.a}`}`, `s ${bien ? 'to' : 'ta'}`, 'end'));
      }
      return h + plato(K, 14, 18, `c = ${v.c} · e = ${p.es[v.i]}`, 's ta') + plato(K, 330, 18, `a = ${p.a} · b = ${p.b}`, 's tm', 'end');
    },
    lee: (v, p) => `$c = ${v.c}$, $e = ${p.es[v.i]}$`,
    aviso(v, p) {
      const c = ZF(p), e = Number(p.es[v.i]);
      if (v.c !== c) {
        if (v.c === p.a) return 'Ahí está el vértice. En la hipérbola el foco queda más lejos del centro que el vértice: c > a.';
        if (v.c === p.b) return `${p.b} es el semieje conjugado b. Los focos cumplen c² = a² + b².`;
        if (v.c === p.a + p.b) return 'a + b no: a y b son catetos y c es la hipotenusa, c² = a² + b².';
        if (v.c === 0) return 'Los focos no están en el centro: están sobre el eje, más afuera que los vértices.';
        return `c² = a² + b² = ${p.a ** 2} + ${p.b ** 2}: el foco queda a la mitad de la diagonal del rectángulo.`;
      }
      if (e < 1) return 'En la hipérbola c > a, así que e = c/a es mayor que 1.';
      if (e === 1) return 'e = 1 es la parábola. Aquí e = c/a.';
      if (p.es[v.i] === N(c / p.b)) return 'Dividiste entre b: la excentricidad es c/a, con a el semieje que va hacia los focos.';
      return `El foco va bien; la excentricidad es c/a = ${c}/${p.a}.`;
    },
    bien: p => p.ok || 'En la hipérbola c² = a² + b² y e = c/a > 1.',
  });

  // ------------------------------------------------------------ conica-por-signos · Ax² + Cy² = R según los signos de A y C
  // Se deslizan A y C; la curva se dibuja en vivo (elipse, circunferencia, hipérbola, rectas paralelas o ningún punto).
  //   v { A, C }   params { A, C, R, ini, ok }
  const SO = [170, 92], SU = 14, SQ = en(SO, SU), SW = [-11, 11, -5, 5], SC = [SO[0] - 11 * SU, SO[0] + 11 * SU, SO[1] - 5 * SU, SO[1] + 5 * SU];
  const tipo = (A, C) => (A > 0 && C > 0 ? (A === C ? 'circunferencia' : 'elipse') : A * C < 0 ? 'hipérbola' : (A > 0 || C > 0) ? 'dos rectas paralelas' : 'ningún punto');
  const co = n => (n === 1 ? '' : n === -1 ? '−' : N(n));
  const ec = (A, C, R) => `${A ? `${co(A)}x²` : ''}${A && C ? (C > 0 ? ' + ' : ' − ') : C < 0 ? '−' : ''}${C ? `${co(Math.abs(C))}y²` : ''}${!A && !C ? '0' : ''} = ${R}`;
  const curvaS = (K, A, C, R, cls) => {
    const t = tipo(A, C);
    if (t === 'elipse' || t === 'circunferencia') return corta(K, elipse(SQ, 0, 0, Math.sqrt(R / A), Math.sqrt(R / C)), cls, SC);
    if (t === 'hipérbola') return A > 0 ? hiper(K, SQ, 0, 0, Math.sqrt(R / A), Math.sqrt(-R / C), 0, cls, SC) : hiper(K, SQ, 0, 0, Math.sqrt(-R / A), Math.sqrt(R / C), 1, cls, SC);
    if (t === 'dos rectas paralelas') {
      const m = Math.sqrt(R / (A || C));
      return [1, -1].map(s => (A ? recta(K, SQ, [s * m, -5.5], [s * m, 5.5], cls, SC) : recta(K, SQ, [-11.5, s * m], [11.5, s * m], cls, SC))).join('');
    }
    return '';
  };
  XG.figura('conica-por-signos', {
    ini: p => ({ ...(p.ini || { A: 2, C: 2 }) }),
    manijas: () => [{ k: 'A', min: -12, max: 12, paso: 1, et: 'A, el coeficiente de x²', rot: v => N(v.A) }, { k: 'C', min: -12, max: 12, paso: 1, et: 'C, el coeficiente de y²', rot: v => N(v.C) }],
    ok: (v, p) => v.A === p.A && v.C === p.C,
    sol: p => ({ A: p.A, C: p.C }),
    texto: p => `$${ec(p.A, p.C, p.R).replace(/−/g, '-').replace(/²/g, '^2')}$: ${tipo(p.A, p.C) === 'hipérbola' ? 'una hipérbola, porque A y C tienen signos distintos' : 'una elipse, porque A y C tienen el mismo signo'}`,
    alto: () => 270, pie: 'Desliza A y C: la curva cambia en vivo.',
    dib(v, K, p, f) {
      let h = rej(K, SO, SU, SW) + curvaS(K, v.A, v.C, p.R, 'la gr');
      if (tipo(v.A, v.C) === 'ningún punto') h += plato(K, SO[0], SO[1] - 30, 'ningún punto la cumple', 's ta', 'middle');
      if (f > 0) {
        const t = tipo(v.A, v.C), ok = this.ok(v, p);
        if (t === 'hipérbola') {
          const m = Math.sqrt(-v.A / v.C);
          h += K.f(f, recta(K, SQ, [-11, -11 * m], [11, 11 * m], 'lo d', SC) + recta(K, SQ, [-11, 11 * m], [11, -11 * m], 'lo d', SC));
        }
        if (v.A > 0) h += K.f(f, [1, -1].map(s => K.c(...SQ(s * Math.sqrt(p.R / v.A), 0), 4, 'fo')).join(''));
        if (v.C > 0) h += K.f(f, [1, -1].map(s => K.c(...SQ(0, s * Math.sqrt(p.R / v.C)), 4, 'fo')).join(''));
        h += K.f(f, plato(K, 330, 18, t, `s ${ok ? 'to' : 'ta'}`, 'end'));
      }
      return h + plato(K, 14, 18, ec(v.A, v.C, p.R), 's ta');
    },
    lee: (v, p) => `$${ec(v.A, v.C, p.R).replace(/−/g, '-').replace(/²/g, '^2')}$: ${tipo(v.A, v.C)}`,
    aviso(v, p) {
      const T = tipo(p.A, p.C), t = tipo(v.A, v.C);
      if (t === 'ningún punto') return `Con A y C negativos (o cero) el lado izquierdo nunca llega a ${p.R}: ningún punto la cumple.`;
      if (t === 'dos rectas paralelas') return 'Con un coeficiente en cero quedan dos rectas paralelas, un caso degenerado: hacen falta x² y y².';
      if (T === 'hipérbola') {
        const vert = p.C > 0, pos = vert ? p.C : p.A, vv = Math.sqrt(p.R / pos);
        if (t !== 'hipérbola') return 'Con A y C del mismo signo sale una elipse (una circunferencia si son iguales): la hipérbola pide signos distintos.';
        if ((v.C > 0) !== vert) return `Abre hacia el otro lado: el término positivo dice hacia dónde abre. Aquí debe ser el de ${vert ? 'y' : 'x'}.`;
        if ((vert ? v.C : v.A) !== pos) return `Los vértices quedan en ±√(${p.R}/${vert ? v.C : v.A}); para que estén en ±${N(vv)}, ese coeficiente debe ser ${p.R}/${N(vv * vv)}.`;
        return `Los vértices ya están bien; falta la pendiente de las asíntotas: el otro coeficiente es −${p.R} entre el otro semieje al cuadrado.`;
      }
      const sa = Math.sqrt(p.R / p.A), sc = Math.sqrt(p.R / p.C);
      if (t === 'hipérbola') return 'Con signos distintos sale una hipérbola: la elipse pide A y C del mismo signo.';
      if (t === 'circunferencia' && p.A !== p.C) return 'Con A = C sale una circunferencia: aquí los dos semiejes son distintos.';
      return `Para semiejes de ${N(sa)} en x y ${N(sc)} en y: A = ${p.R}/${N(sa * sa)} y C = ${p.R}/${N(sc * sc)}.`;
    },
    bien: p => p.ok || 'Signos iguales: elipse; signos distintos: hipérbola. El término positivo dice hacia dónde abre.',
  });

  // ------------------------------------------------------------ radar-de-dos-estaciones · en movimiento: d(A) − d(B) constante
  // Dos estaciones A y B en la costa, a D km. El barco sale de B hacia el norte; se fija cuánto navega y al soltar zarpa. Se
  // detiene bien si allí d(A) − d(B) = k: está en la rama de hipérbola de focos A y B.
  //   params { tiros: [{ q, D, k, max, e? }] }
  const RY = t => (t.D ** 2 - t.k ** 2) / (2 * t.k), RB = 196;
  const RG = (t, v) => { const u = Math.min(220 / t.D, 150 / t.max), A = [50, RB], B = [50 + t.D * u, RB]; return { u, A, B, S: [B[0], RB - (v || 0) * u] }; };
  XG.tiros('radar-de-dos-estaciones', {
    perilla: t => ({ et: 'navega (km)', min: 0, max: t.max, cara: v => (v ? String(v) : ''), lee: v => `${v} km` }), meta: RY, alto: 220, ms: 1600,
    dib(t, v, K, p, f) {
      const g = RG(t, v), y = (v || 0) * Math.min(1, f * 1.25), S = [g.B[0], RB - y * g.u];
      let h = K.l(10, RB, 330, RB, 'lm gr') + K.t(330, RB + 16, 'costa', 's tm', 'end') + K.l(g.B[0], RB, g.B[0], RB - t.max * g.u, 'lr d');
      h += K.r(g.A[0] - 8, RB - 8, 16, 16, 'fk', 3) + K.t(g.A[0], RB + 18, 'A', 's') + K.r(g.B[0] - 8, RB - 8, 16, 16, 'fk', 3) + K.t(g.B[0] - 14, RB + 18, 'B', 's');
      if (v != null && f >= 1) {
        const dA = Math.hypot(t.D, v), dd = r2(dA - v), ok = Math.abs(dd - t.k) < 1e-6, c = t.D / 2, a = t.k / 2, b = Math.sqrt(c * c - a * a), M = 50 + c * g.u;
        h += corta(K, Array.from({ length: 81 }, (_, i) => { const s = i / 80 * 4; return [M + a * Math.cosh(s) * g.u, RB - b * Math.sinh(s) * g.u]; }), 'lo d', [0, 340, 46, RB]);
        h += K.l(...g.A, ...S, 'lg') + K.l(...g.B, ...S, 'lf');
        h += K.t(330, 18, `d(A) − d(B) = ${N(dA)} − ${v} = ${N(dd)}`, `s ${ok ? 'to' : 'ta'}`, 'end');
      }
      h += K.p([[S[0], S[1] - 10], [S[0] + 7, S[1] + 6], [S[0] - 7, S[1] + 6]], 'fa');
      return h + K.t(14, 18, v ? `navega ${v} km` : 'navega ? km', 's ta', 'start') + K.t(14, 36, `A y B a ${t.D} km`, 's tm', 'start');
    },
    falla(t, v) {
      if (t.e?.[v]) return t.e[v];
      if (v === t.k) return `${t.k} km es la diferencia de distancias, no lo que navega: allí d(A) − d(B) = ${N(Math.hypot(t.D, v) - v)}.`;
      const dd = Math.hypot(t.D, v) - v;
      return dd > t.k ? `Con ${v} km, d(A) − d(B) = ${N(dd)} km, más que ${t.k}: todavía no llega. Sigue hacia el norte.` : `Con ${v} km, d(A) − d(B) = ${N(dd)} km, menos que ${t.k}: se pasó.`;
    },
    cuenta: t => { const y = RY(t), dA = Math.hypot(t.D, y); return `$d_A = \\sqrt{${t.D}^2 + ${y}^2} = ${dA}$ y $d_A - d_B = ${dA} - ${y} = ${t.k}$ km`; },
    pie: 'Estira hasta los kilómetros que navega y suelta.',
  });
})();
