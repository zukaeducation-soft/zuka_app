// Ejercicios de «Áreas sombreadas y cuadrícula» (pu-ge-5) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100);
  // Lámina con un hueco cuadrado.  v { s }
  XG.figura('marco-hueco', {
    ini: () => ({ s: 2 }),
    manijas: p => [{ k: 's', min: 1, max: Math.min(p.w, p.h), paso: 1, en: v => [170 + v.s * 10.5, 100 - v.s * 10.5], de: (x, y) => (x - 170 + 100 - y) / 21 }],
    ok: (v, p) => p.w * p.h - v.s ** 2 === p.area,
    sol: p => ({ s: Math.sqrt(p.w * p.h - p.area) }),
    texto: p => `$${p.w * p.h} - ${p.area} = ${p.w * p.h - p.area}$: lado $${Math.sqrt(p.w * p.h - p.area)}$`,
    alto: () => 214, pie: 'Arrastra la esquina del hueco.',
    dib(v, K, p, f) {
      const u = 21, x = 170 - p.w * u / 2, y = 100 - p.h * u / 2, s = v.s * u;
      let g = '';
      for (let i = 1; i < p.w; i++) g += K.l(x + i * u, y, x + i * u, y + p.h * u, 'lr');
      for (let j = 1; j < p.h; j++) g += K.l(x, y + j * u, x + p.w * u, y + j * u, 'lr');
      return K.r(x, y, p.w * u, p.h * u, 'fa') + K.f(f, g) + K.r(170 - s / 2, 100 - s / 2, s, s, 'fc') + K.t(170, 105, N(v.s), 'tf') + K.t(170, y + p.h * u + 18, p.w, 'ta') + K.t(x - 9, 105, p.h, 'ta', 'end');
    },
    lee: (v, p) => `$${p.w * p.h} - ${Math.round(v.s) ** 2} = ${p.w * p.h - Math.round(v.s) ** 2}$`,
    aviso: (v, p) => (p.w * p.h - v.s ** 2 > p.area ? 'Queda demasiada lámina: el hueco es muy chico.' : 'Queda muy poca lámina: el hueco es muy grande.'),
    bien: () => 'Lo sombreado es la grande menos el hueco.',
  });

  // Anillo.  v { r }
  XG.figura('anillo-justo', {
    ini: () => ({ r: 1 }),
    manijas: p => [{ k: 'r', min: 1, max: p.R - 1, paso: 1, en: v => [170 + v.r * 13, 106], de: (x, y) => Math.hypot(x - 170, y - 106) / 13 }],
    ok: (v, p) => p.R ** 2 - v.r ** 2 === p.area,
    sol: p => ({ r: Math.sqrt(p.R ** 2 - p.area) }),
    texto: p => `$${p.R ** 2}\\pi - ${p.area}\\pi = ${p.R ** 2 - p.area}\\pi$: radio $${Math.sqrt(p.R ** 2 - p.area)}$`,
    alto: () => 212, pie: 'Arrastra el borde del hueco.',
    dib: (v, K, p, f) => K.c(170, 106, p.R * 13, 'fa') + K.c(170, 106, v.r * 13, 'fc') + K.l(170, 106, ...K.at(170, 106, p.R * 13, 140), 'la') + K.t(...K.at(170, 111, p.R * 13 + 14, 140), p.R, 'ta') + K.l(170, 106, 170 + v.r * 13, 106, 'lf') + K.t(170 + v.r * 5, 126, N(v.r), 'tf') + K.f(f, K.c(170, 106, Math.sqrt(p.R ** 2 - p.area) * 13, 'fn d')),
    lee: (v, p) => `$${p.R ** 2}\\pi - ${Math.round(v.r) ** 2}\\pi = ${p.R ** 2 - Math.round(v.r) ** 2}\\pi$`,
    aviso: (v, p) => (p.R ** 2 - v.r ** 2 > p.area ? 'El anillo quedó con más área: el hueco es muy chico.' : 'El anillo quedó con menos área: el hueco es muy grande.'),
    bien: () => 'Se restan las áreas de los círculos, no los radios.',
  });

  // Triángulo con la base vertical sobre la cuadrícula.  v { x, y }
  const G = 26, GP = (x, y) => [34 + x * G, 200 - y * G];
  const malla = (K, w, h) => { let s = ''; for (let i = 0; i <= w; i++) s += K.l(...GP(i, 0), ...GP(i, h), 'ls'); for (let j = 0; j <= h; j++) s += K.l(...GP(0, j), ...GP(w, j), 'ls'); return s; };
  XG.figura('vertice-lejos', {
    ini: () => ({ x: 4, y: 3 }),
    manijas: () => [{ k: ['x', 'y'], min: [2, 0], max: [11, 7], paso: [1, 1], en: v => GP(v.x, v.y), de: (x, y) => [(x - 34) / G, (200 - y) / G] }],
    ok: (v, p) => p.base * (v.x - 1) === 2 * p.area,
    sol: p => ({ x: 1 + 2 * p.area / p.base, y: 3 }),
    texto: p => `$\\tfrac{${p.base} \\cdot ${2 * p.area / p.base}}{2} = ${p.area}$`,
    alto: () => 212, pie: 'Arrastra el vértice libre por la cuadrícula.',
    dib: (v, K, p, f) => malla(K, 11, 7) + K.p([GP(1, 0), GP(1, p.base), GP(v.x, v.y)], 'fa') + K.l(...GP(1, 0), ...GP(1, p.base), 'lg gr') + K.f(f, K.l(...GP(1, v.y), ...GP(1 + (v.x - 1) * f, v.y), 'lf d') + K.t(...GP((1 + v.x) / 2, v.y + (v.y > 5 ? -0.8 : 0.3)), N(v.x - 1), 'tf')),
    lee: (v, p) => `$\\tfrac{${p.base} \\cdot ${Math.round(v.x) - 1}}{2} = ${N(p.base * (Math.round(v.x) - 1) / 2)}$`,
    aviso: (v, p) => (p.base * (v.x - 1) === p.area ? 'Eso es base por altura; el triángulo vale la mitad.' : v.x * p.base === 2 * p.area ? 'La altura se cuenta desde la base, no desde el borde.' : p.base * (v.x - 1) > 2 * p.area ? 'Quedó más grande.' : 'Quedó más chico.'),
    bien: () => 'Solo cuenta cuánto se aleja el vértice de la base.',
  });

  // Triángulo torcido: caja menos las tres esquinas.
  const ESQ = p => [p.w * p.ya / 2, (p.w - p.xc) * p.h / 2, (p.h - p.ya) * p.xc / 2];
  const caja = p => { const e = ESQ(p); return [...e, p.w * p.h - e[0] - e[1] - e[2]].map(String); };
  XG.rotula('caja-torcida', {
    slots: () => [{ x: 298, y: 24, w: 64, h: 34 }, { x: 298, y: 74, w: 64, h: 34 }, { x: 298, y: 124, w: 64, h: 34 }, { x: 298, y: 174, w: 64, h: 34 }],
    fichas: p => p.fichas, metas: caja,
    texto(p) { const m = caja(p); return `$${p.w * p.h} - ${m[0]} - ${m[1]} - ${m[2]} = ${m[3]}$`; },
    alto: () => 200,
    fondo(K, p, f) {
      const u = 26, Q = (x, y) => [18 + x * u, 180 - y * u], A = [0, p.ya], B = [p.w, 0], C = [p.xc, p.h], t = (P, cls) => K.p(P.map(q => Q(...q)), cls);
      let s = '';
      for (let i = 0; i <= p.w; i++) s += K.l(...Q(i, 0), ...Q(i, p.h), 'ls');
      for (let j = 0; j <= p.h; j++) s += K.l(...Q(0, j), ...Q(p.w, j), 'ls');
      return s + K.f(0.45 + 0.55 * f, t([[0, 0], B, A], 'fg') + t([B, [p.w, p.h], C], 'ff') + t([C, [0, p.h], A], 'fo')) + t([A, B, C], 'fa') + K.t(...Q(1, 0.3), 'a', 'tg') + K.t(...Q(p.w - 1, p.h - 1.6), 'b', 'tf') + K.t(...Q(0.8, p.h - 1), 'c', 'to') + K.t(...Q(3.1, 2.6), 'T', 'ta') + ['a', 'b', 'c', 'T'].map((l, i) => K.t(252, 29 + 50 * i, l, ['tg', 'tf', 'to', 'ta'][i])).join('');
    },
    aviso(q, p) { const m = caja(p); return m.slice(0, 3).some((x, i) => q[i][0] === String(2 * x) && !m.includes(q[i][0])) ? 'Cada esquina es medio rectángulo: parte entre dos.' : q[3][0] !== m[3] && m.slice(0, 3).every((x, i) => q[i][0] === x) ? 'A la caja entera quítale las tres esquinas.' : 'Cuenta los catetos de cada esquina en la cuadrícula.'; },
    bien: () => 'La caja menos las tres esquinas.',
  });

  // Casa: rectángulo con techo triangular, área total pedida.  v { x, y }
  XG.figura('techo-justo', {
    ini: p => ({ x: 5, y: p.h + 1 }),
    manijas: p => [{ k: ['x', 'y'], min: [0, p.h + 0.5], max: [11, 7], paso: [1, 0.5], en: v => GP(v.x, v.y), de: (x, y) => [(x - 34) / G, (200 - y) / G] }],
    ok: (v, p) => p.w * p.h + p.w * (v.y - p.h) / 2 === p.area,
    sol: p => ({ x: 5, y: p.h + 2 * (p.area - p.w * p.h) / p.w }),
    texto: p => `$${p.w * p.h} + \\tfrac{${p.w} \\cdot ${2 * (p.area - p.w * p.h) / p.w}}{2} = ${p.area}$`,
    alto: () => 212, pie: 'Arrastra la punta del techo.',
    dib: (v, K, p, f) => malla(K, 11, 7) + K.p([GP(2, 0), GP(2 + p.w, 0), GP(2 + p.w, p.h), GP(2, p.h)], 'fg') + K.p([GP(2, p.h), GP(2 + p.w, p.h), GP(v.x, v.y)], 'fa') + K.f(f, K.l(...GP(v.x, p.h), ...GP(v.x, p.h + (v.y - p.h) * f), 'lf d') + K.t(...GP(2 + p.w / 2, p.h / 2 - 0.2), p.w * p.h, 'tg') + K.t(...GP((2 + 2 + p.w + v.x) / 3 - 0.4, p.h + (v.y - p.h) * 0.2), N(p.w * (v.y - p.h) / 2), 'ta')),
    lee: (v, p) => `$${p.w * p.h} + ${N(p.w * (v.y - p.h) / 2)} = ${N(p.w * p.h + p.w * (v.y - p.h) / 2)}$`,
    aviso: (v, p) => (p.w * (v.y - p.h) === p.area - p.w * p.h ? 'El techo es un triángulo: vale la mitad de base por altura.' : p.w * p.h + p.w * (v.y - p.h) / 2 > p.area ? 'Sobra área.' : 'Falta área.'),
    bien: () => 'El rectángulo más la mitad de base por altura del techo.',
  });

  // Bandera con una onda que falta a un lado y sobra al otro: qué rectángulo de la misma altura vale lo mismo.  v { w }
  XG.figura('bandera-onda', {
    ini: () => ({ w: 5 }),
    manijas: () => [{ k: 'w', min: 2, max: 18, paso: 1, en: v => [50 + v.w * 13, 168], de: x => (x - 50) / 13 }],
    ok: (v, p) => v.w === p.w,
    sol: p => ({ w: p.w }),
    texto: p => `la onda que sobra llena la que falta: $${p.w} \\cdot ${p.h} = ${p.w * p.h}$`,
    alto: () => 220, pie: 'Arrastra el lado derecho del rectángulo.',
    dib(v, K, p, f) {
      const u = 13, x = 50, y = 8, W = p.w * u, H = p.h * u, r = H / 2, d = W * (1 - f);
      return `<path class="xf fa" d="M${x} ${y} H${x + W} V${y + H} H${x} A${r} ${r} 0 0 0 ${x} ${y} Z"/><path class="xf fg" d="M${K.n(x + d)} ${y} a${r} ${r} 0 0 1 0 ${H} Z"/>` + K.cota(x, y + H + 8, x + W, y + H + 8, p.w) + K.t(x - 10, y + r + 5, p.h, 's tm', 'end')
        + K.r(x, 132, v.w * u, H, 'fc') + K.t(x + Math.max(26, v.w * u / 2 - 6), 132 + H / 2 + 5, `${N(v.w)} × ${p.h}`, 'tm');
    },
    lee: (v, p) => `$${N(v.w)} \\cdot ${p.h} = ${N(v.w * p.h)} \\qquad ${p.w} \\cdot ${p.h} = ${p.w * p.h}$`,
    aviso: (v, p) => (v.w === p.w + p.h / 2 ? 'Contaste la onda que sobra, pero del otro lado falta una igual.' : v.w === p.w - p.h / 2 ? 'Quitaste la onda que falta, pero del otro lado sobra una igual.' : v.w > p.w ? 'Tu rectángulo es más grande.' : 'Tu rectángulo es más chico.'),
    bien: () => 'La pieza que sobra llena el hueco: es un rectángulo.',
  });

  // Andén alrededor de un jardín: qué ancho da el área pedida.  v { a }
  const anden = (a, p) => (p.w + 2 * a) * (p.h + 2 * a) - p.w * p.h;
  const anchoDe = p => { for (let a = 0.5; a <= 4; a += 0.5) if (anden(a, p) === p.area) return { a }; return null; };
  XG.figura('anden-ancho', {
    ini: () => ({ a: 0.5 }),
    manijas: p => [{ k: 'a', min: 0.5, max: 4, paso: 0.5, en: v => [170 + (p.w / 2 + v.a) * 14, 100 - (p.h / 2 + v.a) * 14], de: (x, y) => ((x - 170) / 14 - p.w / 2 + (100 - y) / 14 - p.h / 2) / 2 }],
    ok: (v, p) => anden(v.a, p) === p.area,
    sol: anchoDe,
    texto(p) { const { a } = anchoDe(p); return `$${p.w + 2 * a} \\cdot ${p.h + 2 * a} - ${p.w} \\cdot ${p.h} = ${p.area}$`; },
    alto: () => 206, pie: 'Arrastra la esquina del andén.',
    dib(v, K, p, f) {
      const u = 14, w = (p.w + 2 * v.a) * u, h = (p.h + 2 * v.a) * u;
      return K.r(170 - w / 2, 100 - h / 2, w, h, 'fg') + K.r(170 - p.w * u / 2, 100 - p.h * u / 2, p.w * u, p.h * u, 'fa') + K.t(170, 105, `${p.w} × ${p.h}`, 'ta') + K.t(6, 18, `ancho: ${N(v.a)}`, 'tg', 'start') + K.f(f, K.t(170, 100 + h / 2 + 16, N(p.w + 2 * v.a), 's tg') + K.t(170 + w / 2 + 8, 105, N(p.h + 2 * v.a), 's tg', 'start'));
    },
    lee: (v, p) => `$${N(p.w + 2 * v.a)} \\cdot ${N(p.h + 2 * v.a)} - ${p.w * p.h} = ${N(anden(v.a, p))}$`,
    aviso: (v, p) => ((p.w + v.a) * (p.h + v.a) - p.w * p.h === p.area ? 'El andén crece a los dos lados: suma el ancho dos veces.' : anden(v.a, p) > p.area ? 'El andén quedó muy ancho.' : 'El andén quedó muy angosto.'),
    bien: (v, p) => `El rectángulo de afuera mide ${p.w + 2 * v.a} por ${p.h + 2 * v.a}.`,
  });

  // En movimiento: se lanza pintura, un cuadro por cuadro sombreado. tiro.f = { w, h, hueco, esq, tri }
  XG.tiros('llena-lanza', {
    perilla: () => ({ et: 'Pintura', min: 0, max: 40, lee: v => `${v} cuadros` }),
    meta: t => t.r, alto: 150, ms: 1900,
    dib(t, v, K, p, f) {
      const F = t.f, u = 13, x = 12, y = 122, W = F.w * u, H = F.h * u;
      let h = F.tri ? K.p([[x, y], [x + W, y], [x + W / 2, y - H]], 'fa') : K.r(x, y - H, W, H, 'fa', 0);
      if (F.hueco) h += K.r(x + (W - F.hueco[0] * u) / 2, F.tri ? y - F.hueco[1] * u : y - (H + F.hueco[1] * u) / 2, F.hueco[0] * u, F.hueco[1] * u, 'fc', 0) + K.t(x + W / 2, (F.tri ? y - F.hueco[1] * u / 2 : y - H / 2) + 5, F.hueco.join('×'), 's tm');
      if (F.esq) h += K.p([[x, y], [x + F.esq * u, y], [x, y - H]], 'fc') + K.p([[x + W, y - H], [x + W - F.esq * u, y - H], [x + W, y]], 'fc') + K.t(x + F.esq * u / 2, y + 16, F.esq, 's tm') + K.t(x + W / 2, y - H - 6, F.w, 's ta');
      else h += K.t(x + W / 2, y + 16, F.w, 's ta');
      h += F.tri ? K.l(x + W + 8, y, x + W + 8, y - H, 'lm') + K.t(x + W + 14, y - H / 2 + 5, F.h, 's ta', 'start') : K.t(x + W + 6, y - H / 2 + 5, F.h, 's ta', 'start');
      const c = 15, X = 180, n = v == null ? 0 : Math.floor(v * f + 1e-9);
      for (let i = 0; i < 40; i++) h += K.r(X + (i % 10) * c, 106 - Math.floor(i / 10) * c, c - 2, c - 2, i < n ? (f >= 1 && v !== t.r ? 'ff' : 'fA') : 'fc', 3);
      return h;
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Sobró pintura.' : 'Faltó pintura.')),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira la pintura justa para lo sombreado y suelta.',
  });
})();
