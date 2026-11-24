// Ejercicios de «Volúmenes y superficies» (pu-ge-6) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100), miles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  const eli = (K, x, y, rx, cls) => `<ellipse class="xf ${cls}" cx="${x}" cy="${K.n(y)}" rx="${rx}" ry="${K.n(rx * 0.28)}"/>`;
  const cil = (K, x, y, r, h, f, cls = 'fa') => {
    const ya = y - h * f;
    return (f > 0.01 ? `<path class="xf ${cls}" d="M${x - r} ${K.n(ya)} V${y} A${r} ${K.n(r * 0.28)} 0 0 0 ${x + r} ${y} V${K.n(ya)}"/>` + eli(K, x, ya, r, cls) : '') + `<path class="xl" d="M${x - r} ${K.n(y - h)} V${y} A${r} ${K.n(r * 0.28)} 0 0 0 ${x + r} ${y} V${K.n(y - h)}"/>` + eli(K, x, y - h, r, 'fn');
  };
  const cono = (K, x, y, r, h, cls) => `<path class="xf ${cls}" d="M${x - r} ${y} A${r} ${K.n(r * 0.28)} 0 0 0 ${x + r} ${y} L${x} ${K.n(y - h)} Z"/><path class="xl lm d" d="M${x - r} ${y} A${r} ${K.n(r * 0.28)} 0 0 1 ${x + r} ${y}"/>`;

  // Capas de cubitos hasta un volumen.  v { c }
  XG.figura('capas-caja', {
    ini: () => ({ c: 1 }),
    manijas: () => [{ k: 'c', min: 0, max: 9, paso: 1, et: 'capas' }],
    ok: (v, p) => p.a * p.b * v.c === p.vol,
    sol: p => ({ c: p.vol / (p.a * p.b) }),
    texto: p => `$${p.vol} \\div (${p.a} \\cdot ${p.b}) = ${p.vol / (p.a * p.b)}$`,
    alto: () => 264, pie: 'Arrastra el número de capas.',
    dib: (v, K, p, f) => K.caja([170, 190], 13, p.a, p.b, Math.round(v.c), 'fa') + K.t(196, 200, p.a, 'tm', 'start') + K.t(144, 200, p.b, 'tm', 'end') + K.f(f, K.t(8, 20, `${p.a * p.b} por capa`, 'ta', 'start')),
    lee: (v, p) => `$${p.a} \\cdot ${p.b} \\cdot ${Math.round(v.c)} = ${p.a * p.b * Math.round(v.c)}$`,
    aviso: (v, p) => (p.a * p.b * v.c > p.vol ? 'Sobran cubitos.' : 'Faltan cubitos.'),
    bien: (v, p) => `${v.c} capas de ${p.a * p.b}.`,
  });

  // Cilindro de volumen dado.  v { h }
  XG.figura('cilindro-altura', {
    ini: () => ({ h: 2 }),
    manijas: () => [{ k: 'h', min: 1, max: 12, paso: 1, en: v => [170, 190 - v.h * 13], de: (x, y) => (190 - y) / 13 }],
    ok: (v, p) => p.r ** 2 * v.h === p.vol,
    sol: p => ({ h: p.vol / p.r ** 2 }),
    texto: p => `$\\pi \\cdot ${p.r}^2 \\cdot ${p.vol / p.r ** 2} = ${p.vol}\\pi$`,
    alto: () => 216, pie: 'Arrastra la tapa del cilindro.',
    dib: (v, K, p, f) => cil(K, 170, 190, 56, v.h * 13, f) + K.l(170, 190 - v.h * 13, 226, 190 - v.h * 13, 'lf') + K.t(236, 194 - v.h * 13, `r = ${p.r}`, 'tf', 'start') + K.t(104, 194 - v.h * 6.5, N(v.h), 'ta', 'end'),
    lee: (v, p) => `$\\pi \\cdot ${p.r}^2 \\cdot ${Math.round(v.h)} = ${p.r ** 2 * Math.round(v.h)}\\pi$`,
    aviso: (v, p) => (2 * p.r * v.h === p.vol ? 'La base es πr², no 2πr.' : p.r ** 2 * v.h > p.vol ? 'Cabe más de lo pedido.' : 'Cabe menos de lo pedido.'),
    bien: () => 'Área de la base por la altura.',
  });

  // Conos llenos que se vacían en un cilindro de igual base y altura.  v { n } nivel
  XG.figura('cono-agua', {
    ini: () => ({ n: 0 }),
    manijas: p => [{ k: 'n', min: 0, max: p.h, paso: 1, en: v => [304, 196 - v.n * 10], de: (x, y) => (196 - y) / 10 }],
    ok: (v, p) => 3 * v.n === p.conos * p.h,
    sol: p => ({ n: p.conos * p.h / 3 }),
    texto: p => `$\\tfrac{${p.conos}}{3} \\cdot ${p.h} = ${p.conos * p.h / 3}$`,
    alto: () => 222, pie: 'Arrastra la marca del nivel.',
    dib(v, K, p, f) {
      let h = '';
      for (let i = 0; i < p.conos; i++) h += K.f(1.15 - f, cono(K, 42 + i * 80, 196, 36, p.h * 10, 'fg'));
      const y = 196 - v.n * 10;
      return h + K.t(84, 24, `altura ${p.h}`, 's tm') + cil(K, 232, 196, 36, p.h * 10, p.conos / 3 * f) + K.l(196, y, 304, y, 'lf gr') + K.t(188, y + 5, N(v.n), 'tf', 'end');
    },
    lee: (v, p) => `$\\tfrac{${p.conos}}{3} \\cdot ${p.h} = ${p.conos * p.h / 3}$`,
    aviso: (v, p) => (2 * v.n === p.conos * p.h ? 'Un cono no es la mitad del cilindro: es la tercera parte.' : 3 * v.n > p.conos * p.h ? 'El agua queda más abajo.' : 'El agua queda más arriba.'),
    bien: (v, p) => `Cada cono llena un tercio: ${p.conos === 2 ? 'dos conos, dos tercios' : 'uno solo, un tercio'}.`,
  });

  // Pirámide de base cuadrada.  v { h }
  XG.figura('piramide-altura', {
    ini: () => ({ h: 3 }),
    manijas: () => [{ k: 'h', min: 1, max: 11, paso: 1, en: v => [170, 167 - v.h * 12], de: (x, y) => (167 - y) / 12 }],
    ok: (v, p) => p.a ** 2 * v.h === 3 * p.vol,
    sol: p => ({ h: 3 * p.vol / p.a ** 2 }),
    texto: p => `$\\tfrac13 \\cdot ${p.a ** 2} \\cdot ${3 * p.vol / p.a ** 2} = ${p.vol}$`,
    alto: () => 222, pie: 'Arrastra la punta de la pirámide.',
    dib(v, K, p, f) {
      const o = [170, 194], a = p.a, u = 66 / a, I = (x, y) => K.iso(o, u, x, y, 0), alza = q => [q[0], q[1] - v.h * 12], T = [170, 167 - v.h * 12];
      return K.p([I(0, 0), I(a, 0), I(a, a), I(0, a)], 'fc') + K.l(...I(a / 2, a / 2), ...T, 'lf d') + K.p([I(0, 0), I(a, 0), T], 'fa') + K.p([I(0, 0), I(0, a), T], 'fg') + K.f(f, K.p([I(0, 0), I(a, 0), I(a, a), I(0, a)].map(alza), 'fn d') + [I(0, 0), I(a, 0), I(0, a)].map(q => K.l(...q, ...alza(q), 'lm d')).join('')) + K.t(206, 208, a, 'tm', 'start') + K.t(134, 208, a, 'tm', 'end') + K.l(252, 167, 252, T[1], 'lf') + K.t(260, (167 + T[1]) / 2 + 5, N(v.h), 'tf', 'start');
    },
    lee: (v, p) => `$\\tfrac13 \\cdot ${p.a ** 2} \\cdot ${Math.round(v.h)} = ${N(p.a ** 2 * Math.round(v.h) / 3)}$`,
    aviso: (v, p) => (p.a ** 2 * v.h === p.vol ? 'Eso vale el prisma; la pirámide es la tercera parte.' : p.a ** 2 * v.h > 3 * p.vol ? 'Cabe más de lo pedido.' : 'Cabe menos de lo pedido.'),
    bien: () => 'Un tercio de base por altura.',
  });

  // Caras de una caja y su superficie total.
  const caras = p => [p.a * p.b, p.a * p.h, p.b * p.h, 2 * (p.a * p.b + p.a * p.h + p.b * p.h)].map(String);
  XG.rotula('caras-caja', {
    slots: () => [{ x: 290, y: 28, w: 78, h: 34 }, { x: 290, y: 76, w: 78, h: 34 }, { x: 290, y: 124, w: 78, h: 34 }, { x: 290, y: 172, w: 78, h: 34 }],
    fichas: p => p.fichas, metas: caras,
    texto: p => `$2 \\cdot (${caras(p).slice(0, 3).join(' + ')}) = ${caras(p)[3]}$`,
    alto: () => 200,
    fondo(K, p) {
      const o = [68, 160], I = (x, y, z) => K.iso(o, 16, x, y, z), { a, b, h } = p, mas = (q, x, y) => [q[0] + x, q[1] + y];
      return K.p([I(0, 0, 0), I(a, 0, 0), I(a, 0, h), I(0, 0, h)], 'fg') + K.p([I(0, 0, 0), I(0, b, 0), I(0, b, h), I(0, 0, h)], 'ff') + K.p([I(0, 0, h), I(a, 0, h), I(a, b, h), I(0, b, h)], 'fa') + K.t(...mas(I(a / 2, 0, 0), 6, 18), a, 'tm') + K.t(...mas(I(0, b / 2, 0), -10, 14), b, 'tm') + K.t(...mas(I(a, 0, h / 2), 8, 6), h, 'tm', 'start')
        + [['tapa', 'ta'], ['frente', 'tg'], ['costado', 'tf'], ['toda la piel', '']].map(([t, k], i) => K.t(244, 33 + 48 * i, t, `s ${k}`, 'end')).join('');
    },
    aviso(q, p) { const m = caras(p); return q[3][0] === String(m[3] / 2) ? 'Hay dos caras de cada una: falta la mitad de la piel.' : q[3][0] !== m[3] ? 'Cada cara se repite al otro lado. Suma las seis.' : 'Mira qué dos medidas tiene cada cara.'; },
    bien: () => 'Seis caras, en tres parejas iguales.',
  });

  // Cubo con la superficie dada.  v { a }
  XG.figura('cubo-arista', {
    ini: () => ({ a: 1 }),
    manijas: () => [{ k: 'a', min: 1, max: 9, paso: 1, en: v => [170, 200 - v.a * 11], de: (x, y) => (200 - y) / 11 }],
    ok: (v, p) => 6 * v.a ** 2 === p.sup,
    sol: p => ({ a: Math.sqrt(p.sup / 6) }),
    texto: p => `$${p.sup} \\div 6 = ${p.sup / 6}$ y $\\sqrt{${p.sup / 6}} = ${Math.sqrt(p.sup / 6)}$`,
    alto: () => 222, pie: 'Arrastra la esquina para cambiar la arista.',
    dib: (v, K, p, f) => K.caja([170, 200], 11, v.a, v.a, v.a, 'fa', false) + K.t(170 + v.a * 9.6 + 8, 202 - v.a * 9, N(v.a), 'ta', 'start') + K.f(f, K.t(8, 20, `cada cara: ${N(v.a * v.a)}`, 'ta', 'start') + K.t(332, 20, '6 caras', 'tm', 'end')),
    lee: v => `$6 \\cdot ${Math.round(v.a)}^2 = ${6 * Math.round(v.a) ** 2}$`,
    aviso: (v, p) => (6 * v.a === p.sup ? 'Eso es el área de una cara: falta hallar su lado.' : 6 * v.a ** 2 > p.sup ? 'La piel quedó más grande.' : 'La piel quedó más chica.'),
    bien: () => 'Seis caras cuadradas iguales.',
  });

  // Litros a metros cúbicos y nivel del agua.  v { h }
  XG.figura('litros-nivel', {
    ini: () => ({ h: 0.25 }),
    manijas: () => [{ k: 'h', min: 0.25, max: 4, paso: 0.25, et: 'altura del agua (m)', rot: v => N(v.h) }],
    ok: (v, p) => p.a * p.b * v.h * 1000 === p.litros,
    sol: p => ({ h: p.litros / 1000 / (p.a * p.b) }),
    texto: p => `$${miles(p.litros)}$ litros son $${p.litros / 1000}$ m³, y $${p.litros / 1000} \\div ${p.a * p.b} = ${p.litros / 1000 / (p.a * p.b)}$ m`,
    alto: () => 262, pie: 'Arrastra la altura del agua.',
    dib(v, K, p, f) {
      const o = [160, 180], u = 28, I = (x, y, z) => K.iso(o, u, x, y, z), z = 4, q = p.litros / 1000 / (p.a * p.b), mas = (w, x, y) => [w[0] + x, w[1] + y];
      return K.caja(o, u, p.a, p.b, v.h, 'fa', false) + K.pl([I(0, 0, 0), I(0, 0, z), I(p.a, 0, z), I(p.a, p.b, z), I(0, p.b, z), I(0, 0, z)], 'lm') + K.l(...I(p.a, 0, 0), ...I(p.a, 0, z), 'lm') + K.l(...I(0, p.b, 0), ...I(0, p.b, z), 'lm') + K.t(...mas(I(p.a / 2, 0, 0), 14, 18), `${p.a} m`, 'tm') + K.t(...mas(I(0, p.b / 2, 0), -16, 18), `${p.b} m`, 'tm') + K.f(f, K.pl([I(0, p.b, q), I(0, 0, q), I(p.a, 0, q)], 'lo gr'));
    },
    lee: (v, p) => `$${p.a} \\cdot ${p.b} \\cdot ${N(v.h)} = ${N(p.a * p.b * v.h)} \\text{ m}^3 = ${miles(Math.round(p.a * p.b * v.h * 1000))} \\text{ litros}$`,
    aviso: (v, p) => (p.a * p.b * v.h * 1000 > p.litros ? 'Con ese nivel hay más litros.' : 'Con ese nivel hay menos litros.'),
    bien: () => 'Cada metro cúbico son 1 000 litros.',
  });

  // En movimiento: se bombea agua (en π) para llenar justo un recipiente. tiro: { q, t: 'cil' | 'cono' | 'esf', rad, h, cilindro, r, c, e }
  XG.tiros('llena-tanque', {
    perilla: () => ({ et: 'Agua', min: 0, max: 40, lee: v => `${v}π` }),
    meta: t => t.r, alto: 182, ms: 1800,
    dib(t, v, K, p, f) {
      const x = 90, y = 158, k = v == null ? 0 : v / t.r * f, n = Math.min(1, k), s = 1 - Math.cbrt(1 - n);
      let h;
      if (t.t === 'cil') h = cil(K, x, y, 46, 104, n) + K.t(x - 54, y - 50, t.h, 'ta', 'end') + K.t(x, y - 126, `r = ${t.rad}`, 's tf');
      else if (t.t === 'cono') h = cono(K, x, y, 52, 106, 'fc') + (n > 0.01 ? `<path class="xf fa" d="M${x - 52} ${y} A52 14.6 0 0 0 ${x + 52} ${y} L${K.n(x + 52 * (1 - s))} ${K.n(y - 106 * s)} H${K.n(x - 52 * (1 - s))} Z"/>` : '') + K.l(x, y, x, y - 106, 'lm d') + K.t(x - 46, y - 60, t.h, 'ta', 'end') + K.t(x, y - 118, `r = ${t.rad}`, 's tf');
      else h = cil(K, x, y, 50, 100, 0) + K.c(x, y - 50, 49, 'fc') + (n > 0.01 ? K.c(x, y - 50, 49 * Math.cbrt(n), 'fa') : '') + K.t(x, y - 124, `cilindro: ${t.cilindro}π`, 's tf');
      const X = 262, H = 116, q = v == null ? 0 : v * (1 - f) / 40;
      h += K.r(X - 26, y - H, 52, H, 'fc') + K.r(X - 26, y - H * q, 52, H * q, 'fg') + K.t(X, y - H - 8, v == null ? 'bomba' : `${v}π`, 's tg');
      if (v != null && f > 0.02 && f < 0.98) h += K.l(X - 26, y - 12, x + 62, y - 12, 'lg d gr');
      if (k > 1.001) h += K.f((k - 1) * 6, [-1, 1].map(g => K.l(x + g * 58, y - 92, x + g * 66, y - 60, 'lf gr') + K.c(x + g * 68, y - 48, 4, 'fF')).join(''));
      return h;
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Se derramó.' : 'No se llenó.')),
    cuenta: t => `$${t.c} = ${t.r}\\pi$`, pie: 'Estira el agua justa y suelta la bomba.',
  });
})();
