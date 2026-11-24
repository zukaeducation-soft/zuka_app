// Ejercicios de «Perímetros, áreas y círculos» (pu-ge-4) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100), PI = x => `${N(x) === '1' ? '' : N(x)}\\pi`;

  // Triángulo con la misma área que un rectángulo.  v { h }
  XG.figura('misma-area', {
    ini: () => ({ h: 3 }),
    manijas: p => [{ k: 'h', min: 1, max: 14, paso: 1, en: v => [190 + p.b * 5.5, 186 - v.h * 11], de: (x, y) => (186 - y) / 11 }],
    ok: (v, p) => p.b * v.h === 2 * p.w * p.H,
    sol: p => ({ h: 2 * p.w * p.H / p.b }),
    texto: p => `$\\tfrac{${p.b} \\cdot ${2 * p.w * p.H / p.b}}{2} = ${p.w * p.H}$`,
    alto: () => 214, pie: 'Arrastra el vértice de arriba.',
    dib(v, K, p, f) {
      const u = 11, y = 186, x = 190, h = v.h * u, b = p.b * u;
      return K.r(24, y - p.H * u, p.w * u, p.H * u, 'fg') + K.t(24 + p.w * u / 2, y + 17, p.w, 'tg') + K.t(18, y - p.H * u / 2 + 5, p.H, 'tg', 'end') + K.f(f, K.r(x, y - h, b, h, 'fn d')) + K.p([[x, y], [x + b, y], [x + b / 2, y - h]], 'fa') + K.l(x + b / 2, y, x + b / 2, y - h, 'lf d') + K.t(x + b / 2, y + 17, p.b, 'ta') + K.t(x + b / 2 + 8, y - h * 0.3, N(v.h), 'tf', 'start')
        + K.f(f * 2 - 1, K.t(24 + p.w * u / 2, y - p.H * u / 2 + 5, p.w * p.H, 'tg'));
    },
    lee: (v, p) => `$\\tfrac{${p.b} \\cdot ${Math.round(v.h)}}{2} = ${N(p.b * Math.round(v.h) / 2)}$`,
    aviso: (v, p) => (p.b * v.h === p.w * p.H ? 'Así la caja punteada vale lo mismo, y el triángulo es la mitad.' : p.b * v.h > 2 * p.w * p.H ? 'El triángulo quedó más grande.' : 'El triángulo quedó más chico.'),
    bien: () => 'El triángulo es la mitad de base por altura.',
  });

  // Marco articulado: los lados no cambian, la altura sí.  v { s } = cuánto se corre el lado de arriba
  const altoMarco = (v, p) => Math.sqrt(p.l ** 2 - v.s ** 2);
  XG.figura('inclina-marco', {
    ini: () => ({ s: 0 }),
    manijas: p => [{ k: 's', min: 0, max: p.l - 1, paso: 1, en: v => [34 + v.s * 14, 188 - altoMarco(v, p) * 14], de: x => (x - 34) / 14 }],
    ok: (v, p) => p.b * altoMarco(v, p) === p.area,
    sol: p => ({ s: Math.sqrt(p.l ** 2 - (p.area / p.b) ** 2) }),
    texto: p => `altura $${p.area} \\div ${p.b} = ${p.area / p.b}$, y $\\sqrt{${p.l}^2 - ${p.area / p.b}^2} = ${Math.sqrt(p.l ** 2 - (p.area / p.b) ** 2)}$`,
    alto: () => 214, pie: 'Arrastra la esquina de arriba para inclinar el marco.',
    dib(v, K, p, f) {
      const u = 14, x = 34, y = 188, H = altoMarco(v, p) * u, s = v.s * u, b = p.b * u;
      return K.p([[x, y], [x + b, y], [x + b + s, y - H], [x + s, y - H]], 'fa') + K.t(x + b / 2 + 10, y + 18, p.b, 'ta') + K.t(x + b + s / 2 + 12, y - H / 2 + 12, p.l, 'tm', 'start') + (v.s > 0.3 ? K.l(x, y - H, x + s, y - H, 'lf d') + K.l(x, y, x, y - H, 'lm d') + K.t(x + s / 2, y - H - 8, N(v.s), 's tf') : '')
        + K.f(f, K.l(x + s, y, x + s, y - H, 'lf d') + K.t(x + s + 8, y - H / 2 + 5, N(H / u), 'tf', 'start'));
    },
    lee: (v, p) => { const h = altoMarco(v, p); return `$${p.b} \\cdot ${N(h)} ${Number.isInteger(h) ? '=' : '\\approx'} ${N(p.b * h)}$`; },
    aviso: (v, p) => (p.b * altoMarco(v, p) > p.area ? 'El área quedó más grande: hay que acostarlo más.' : 'El área quedó más chica: está muy acostado.'),
    bien: () => 'Los lados son los mismos, pero el área depende de la altura.',
  });

  // Rectángulo con la misma altura y la misma área que un trapecio.  v { w }
  XG.figura('trapecio-gemelo', {
    ini: () => ({ w: 4 }),
    manijas: () => [{ k: 'w', min: 2, max: 18, paso: 1, en: v => [40 + v.w * 15, 168], de: x => (x - 40) / 15 }],
    ok: (v, p) => 2 * v.w === p.B + p.b,
    sol: p => ({ w: (p.B + p.b) / 2 }),
    texto: p => `$\\tfrac{${p.B} + ${p.b}}{2} = ${(p.B + p.b) / 2}$`,
    alto: () => 212, pie: 'Arrastra el lado derecho del rectángulo.',
    dib(v, K, p, f) {
      const u = 15, x = 40, y = 106, H = 62, o = 25, B = p.B * u, b = p.b * u, w = v.w * u;
      return K.p([[x, y], [x + B, y], [x + o + b, y - H], [x + o, y - H]], 'fg') + K.t(x + B / 2, y + 17, p.B, 'tg') + K.t(x + o + b / 2, y - H - 7, p.b, 'tg') + K.r(x, 137, w, H, 'fa') + K.t(x + w / 2, 174, N(v.w), 'ta') + K.f(f, K.r(x + o / 2 * f, 137 - (137 - (y - H)) * f, w, H, 'fn d'));
    },
    lee: (v, p) => `$\\tfrac{${p.B} + ${p.b}}{2} = ${N((p.B + p.b) / 2)} \\qquad \\text{tu base: } ${Math.round(v.w)}$`,
    aviso: (v, p) => (v.w === p.B + p.b ? 'Esa es la base del trapecio con su copia: falta la mitad.' : v.w * 2 > p.B + p.b ? 'Al rectángulo le sobra.' : 'Al rectángulo le falta.'),
    bien: () => 'El promedio de las bases: lo que sobra abajo llena lo que falta arriba.',
  });

  // Círculo de área dada.  v { r }
  XG.figura('radio-area', {
    ini: () => ({ r: 2 }),
    manijas: () => [{ k: 'r', min: 1, max: 18, paso: 1, en: v => [170 + v.r * 6, 114], de: (x, y) => Math.hypot(x - 170, y - 114) / 6 }],
    ok: (v, p) => v.r ** 2 === p.area,
    sol: p => ({ r: Math.sqrt(p.area) }),
    texto: p => `$r^2 = ${p.area}$: $r = ${Math.sqrt(p.area)}$`,
    alto: () => 228, pie: 'Arrastra el borde del círculo.',
    dib: (v, K, p, f) => K.c(170, 114, v.r * 6, 'fa') + K.l(170, 114, 170 + v.r * 6, 114, 'lf') + K.c(170, 114, 3, 'fk') + K.t(8, 20, `r = ${N(v.r)}`, 'tf', 'start') + K.f(f, K.c(170, 114, Math.sqrt(p.area) * 6, 'fn d') + K.t(332, 20, `r² = ${N(v.r * v.r)}`, 'ta', 'end')),
    lee: v => `$\\pi \\cdot ${Math.round(v.r)}^2 = ${Math.round(v.r) ** 2}\\pi$`,
    aviso: (v, p) => (2 * v.r === p.area ? `Con ese radio, ${p.area}π es el borde; el área es mucho más.` : v.r ** 2 > p.area ? 'Ocupa más de lo pedido.' : 'Ocupa menos de lo pedido.'),
    bien: () => 'El radio por el radio, por π.',
  });

  // Arco de longitud dada.  v { g }
  XG.figura('arco-justo', {
    ini: () => ({ g: 30 }),
    manijas: () => [{ k: 'g', min: 10, max: 350, paso: 10, en: v => XPK.at(170, 108, 86, v.g), de: (x, y, v) => { const g = (Math.atan2(108 - y, x - 170) * 180 / Math.PI + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 350 : 10) : g; } }],
    ok: (v, p) => v.g * p.r === 180 * p.arco,
    sol: p => ({ g: 180 * p.arco / p.r }),
    texto: p => `$\\tfrac{${p.arco}}{${2 * p.r}} \\cdot 360^\\circ = ${180 * p.arco / p.r}^\\circ$`,
    alto: () => 216, pie: 'Arrastra el punto por el borde.',
    dib: (v, K, p, f) => K.c(170, 108, 86, 'fc') + K.sec(170, 108, 86, 0, v.g, 'fa') + K.arc(170, 108, 86, 0, v.g, 'lf gr') + K.l(170, 108, 256, 108) + K.t(212, 126, `r = ${p.r}`, 's tm') + K.t(...K.at(170, 112, 38, Math.max(16, v.g / 2)), `${Math.round(v.g)}°`, 'ta') + K.f(f, K.arc(170, 108, 95, 0, Math.min(359, 180 * p.arco / p.r) * f, 'lo gr')),
    lee: (v, p) => `$\\tfrac{${Math.round(v.g)}}{360} \\cdot ${2 * p.r}\\pi = ${PI(Math.round(v.g) / 180 * p.r)}$`,
    aviso: (v, p) => (v.g === 360 * p.arco / p.r ? `Comparaste con ${p.r}π, que es medio borde; el entero es ${2 * p.r}π.` : v.g * p.r > 180 * p.arco ? 'El arco quedó más largo.' : 'El arco quedó más corto.'),
    bien: (v, p) => `${p.arco} de ${2 * p.r} partes del borde: esa misma parte de la vuelta.`,
  });

  // Borde de un rectángulo con medio círculo encima.
  const borde = p => [`${p.w / 2}π`, `${p.w + 2 * p.h}`, `${p.w + 2 * p.h} + ${p.w / 2}π`];
  XG.rotula('borde-mixto', {
    slots: () => [{ x: 278, y: 46, w: 92, h: 36 }, { x: 278, y: 112, w: 92, h: 36 }, { x: 278, y: 178, w: 92, h: 36 }],
    fichas: p => p.fichas, metas: borde,
    texto: p => `curva $${p.w / 2}\\pi$, rectos $${p.h} + ${p.w} + ${p.h} = ${p.w + 2 * p.h}$, en total $${p.w + 2 * p.h} + ${p.w / 2}\\pi$`,
    alto: () => 206,
    fondo: (K, p, f) => K.r(50, 78, 84, 100, 'fa', 0) + K.sec(92, 78, 42, 0, 180, 'fg') + K.l(51, 78, 133, 78, 'lm d') + K.f(f, K.arc(92, 78, 42, 0, 180 * f, 'lg gr') + K.pl([[50, 78], [50, 178], [134, 178], [134, 78]], 'la gr')) + K.t(92, 197, p.w, 'tm') + K.t(42, 132, p.h, 'tm', 'end') + K.t(222, 50, 'curva', 's tg', 'end') + K.t(222, 116, 'rectos', 's ta', 'end') + K.t(222, 182, 'borde', 's', 'end'),
    aviso(q, p) { return q[0][0] === `${p.w}π` ? 'Esa es la vuelta completa: solo hay medio círculo.' : q[1][0] === `${2 * p.w + 2 * p.h}` ? 'El lado que toca el medio círculo quedó adentro: no es borde.' : 'Sigue el borde con el dedo y suma solo lo que recorres.'; },
    bien: () => 'Solo cuenta lo que se recorre por fuera.',
  });

  // Rombo de área dada con una diagonal fija.  v { D }
  XG.figura('rombo-diagonales', {
    ini: () => ({ D: 4 }),
    manijas: () => [{ k: 'D', min: 2, max: 14, paso: 1, en: v => [170, 112 - v.D * 7], de: (x, y) => (112 - y) / 7 }],
    ok: (v, p) => v.D * p.d === 2 * p.area,
    sol: p => ({ D: 2 * p.area / p.d }),
    texto: p => `$\\tfrac{${p.d} \\cdot ${2 * p.area / p.d}}{2} = ${p.area}$`,
    alto: () => 226, pie: 'Arrastra la punta de arriba.',
    dib(v, K, p, f) {
      const a = p.d * 7, b = v.D * 7, C = [170, 112];
      return K.f(f, K.r(C[0] - a, C[1] - b, 2 * a, 2 * b, 'fn d', 0)) + K.p([[C[0] - a, C[1]], [C[0], C[1] - b], [C[0] + a, C[1]], [C[0], C[1] + b]], 'fa') + K.l(C[0] - a, C[1], C[0] + a, C[1], 'lg') + K.l(C[0], C[1] - b, C[0], C[1] + b, 'lf') + K.t(C[0] + a + 8, C[1] + 5, p.d, 'tg', 'start') + K.t(C[0] + 8, C[1] + b * 0.55, N(v.D), 'tf', 'start');
    },
    lee: (v, p) => `$\\tfrac{${p.d} \\cdot ${Math.round(v.D)}}{2} = ${N(p.d * Math.round(v.D) / 2)}$`,
    aviso: (v, p) => (v.D * p.d === p.area ? 'Eso vale la caja que lo rodea; el rombo es la mitad.' : v.D * p.d > 2 * p.area ? 'Quedó más grande.' : 'Quedó más chico.'),
    bien: () => 'El rombo ocupa la mitad de la caja de sus diagonales.',
  });

  // En movimiento: la rueda da las vueltas que se le pidan y debe parar en la meta. tiro: { q, d (dato), m (meta), r, c, e }
  XG.tiros('rueda-lanza', {
    perilla: () => ({ et: 'Vueltas', min: 0, max: 12, lee: v => `${v} ${v === 1 ? 'vuelta' : 'vueltas'}` }),
    meta: t => t.r, alto: 130, ms: 1900,
    dib(t, v, K, p, f) {
      const y = 106, r = 24, x0 = 44, xm = 276, x = Math.min(380, x0 + (xm - x0) * (v == null ? 0 : v / t.r * f));
      let h = K.l(10, y, 330, y) + K.l(xm, y, xm, y - 62, 'lo gr') + K.p([[xm, y - 62], [xm + 22, y - 54], [xm, y - 46]], 'fo') + K.t(xm, y + 18, t.m, 's to') + K.t(10, 20, t.d, 's tm', 'start');
      if (v != null) { h += K.l(x0, y, x, y, 'la gr'); for (let i = 1; i <= v * f + 1e-9; i++) h += K.l(x0 + (xm - x0) * i / t.r, y - 5, x0 + (xm - x0) * i / t.r, y + 5, 'lg gr'); }
      return h + K.c(x, y - r, r, 'fa') + K.l(x, y - r, ...K.at(x, y - r, r, -90 - 360 * (v || 0) * f), 'lf gr') + K.c(x, y - r, 3, 'fk');
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Se pasó de la bandera.' : 'No alcanzó a llegar.')),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira las vueltas y suelta: la rueda sale.',
  });
})();
