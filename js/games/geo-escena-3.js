// Ejercicios de «Semejanza y escala» (pu-ge-3) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100), miles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  const igualA = x => (Math.abs(x - Math.round(x * 100) / 100) < 1e-9 ? '=' : '\\approx');
  const cara = (K, X, Y, W, H) => `<ellipse class="xf fg" cx="${K.n(X + W / 2)}" cy="${K.n(Y + H / 2)}" rx="${K.n(W * 0.24)}" ry="${K.n(H * 0.34)}"/>`;

  // Ampliar una foto hasta un alto dado sin deformarla.  v { w, h }
  XG.figura('foto-fiel', {
    ini: p => ({ w: p.w0, h: p.h0 }),
    manijas: () => [{ k: ['w', 'h'], min: [2, 2], max: [16, 12], paso: [0.5, 0.5], en: v => [112 + v.w * 13, 188 - v.h * 13], de: (x, y) => [(x - 112) / 13, (188 - y) / 13] }],
    ok: (v, p) => v.h === p.h && v.w * p.h0 === p.w0 * v.h,
    sol: p => ({ w: p.w0 * p.h / p.h0, h: p.h }),
    texto: p => `$${p.h} \\div ${p.h0} = ${p.h / p.h0}$ y $${p.w0} \\cdot ${p.h / p.h0} = ${p.w0 * p.h / p.h0}$`,
    alto: () => 214, pie: 'Arrastra la esquina de la foto.',
    dib(v, K, p, f) {
      const u = 13, x = 112, y = 188, w = v.w * u, h = v.h * u, e = p.w0 / p.h0 * p.h * u * f;
      return K.r(10, y - p.h0 * u, p.w0 * u, p.h0 * u, 'fc') + cara(K, 10, y - p.h0 * u, p.w0 * u, p.h0 * u) + K.t(10 + p.w0 * u / 2, y + 17, p.w0, 'tm') + K.t(92, y - p.h0 * u / 2 + 5, p.h0, 'tm', 'start')
        + K.r(x, y - h, w, h, 'fa') + K.f(f, cara(K, x, y - h, w, h) + K.l(x, y, x + e, y - p.h * u * f, 'lg d')) + K.t(x + w / 2, y + 17, N(v.w), 'ta') + K.t(x + 10, y - h + 18, N(v.h), 'tf', 'start');
    },
    lee: (v, p) => `$\\tfrac{${N(v.w)}}{${p.w0}} ${igualA(v.w / p.w0)} ${N(v.w / p.w0)} \\qquad \\tfrac{${N(v.h)}}{${p.h0}} ${igualA(v.h / p.h0)} ${N(v.h / p.h0)}$`,
    aviso: (v, p) => (v.h !== p.h ? `El alto debía ser ${p.h}.` : v.w - p.w0 === v.h - p.h0 ? 'Le sumaste lo mismo a los dos lados, y eso deforma: se multiplica.' : 'Se deformó: los dos lados deben crecer las mismas veces.'),
    bien: (v, p) => `Los dos lados crecieron ${N(p.h / p.h0)} veces.`,
  });

  // Altura de un poste por su sombra: el rayo, paralelo al de la vara, sale al comprobar.  v { h }
  XG.figura('sombra-poste', {
    ini: p => ({ h: p.h0 }),
    manijas: () => [{ k: 'h', min: 1, max: 10, paso: 0.5, en: v => [124, 188 - v.h * 16], de: (x, y) => (188 - y) / 16 }],
    ok: (v, p) => v.h * p.s0 === p.s * p.h0,
    sol: p => ({ h: p.s * p.h0 / p.s0 }),
    texto: p => `$\\tfrac{${p.h0}}{${p.s0}} = \\tfrac{h}{${p.s}}$: $h = ${p.s * p.h0 / p.s0}$`,
    alto: () => 214, pie: 'Arrastra la punta del poste.',
    dib(v, K, p, f) {
      const u = 16, y = 188, x1 = 34, x2 = 124, s = v.h * p.s0 / p.h0;
      return K.l(8, y, 332, y, 'lm') + K.l(x1, y, x1, y - p.h0 * u, 'gr la') + K.l(x1, y + 4, x1 + p.s0 * u, y + 4, 'gr lm') + K.l(x1, y - p.h0 * u, x1 + p.s0 * u, y, 'lg d') + K.t(x1 - 6, y - p.h0 * u / 2 + 5, N(p.h0), 'ta', 'end') + K.t(x1 + p.s0 * u / 2, y + 20, N(p.s0), 'tm')
        + K.l(x2, y, x2, y - v.h * u, 'gr lf') + K.l(x2, y + 4, x2 + p.s * u, y + 4, 'gr lm') + K.t(x2 - 14, y - v.h * u / 2 + 5, N(v.h), 'tf', 'end') + K.t(x2 + p.s * u / 2, y + 20, p.s, 'tm')
        + (f ? K.l(x2, y - v.h * u, x2 + s * u * f, y - v.h * u * (1 - f), 'lg gr') : '');
    },
    lee: (v, p) => `$\\tfrac{${N(p.h0)}}{${N(p.s0)}} = ${N(p.h0 / p.s0)} \\qquad \\tfrac{${N(v.h)}}{${p.s}} = ${N(v.h / p.s)}$`,
    aviso: (v, p) => (v.h === p.h0 + p.s - p.s0 ? 'Sumaste lo mismo; las sombras crecen multiplicando.' : v.h * p.s0 > p.s * p.h0 ? 'Su sombra sería más larga.' : 'Su sombra sería más corta.'),
    bien: () => 'El rayo cae en la punta de la sombra: son triángulos semejantes.',
  });

  // Tales: dos transversales y tres paralelas; la tercera paralela aparece al comprobar.  v { x }
  const TC = (p, x) => { const k = 40 / p.c; return [190 + (x + p.c) * k * 0.9, 34 + (x + p.c) * k]; };
  XG.figura('tales-corte', {
    ini: () => ({ x: 4 }),
    manijas: p => [{ k: 'x', min: 1, max: 17, paso: 1, en: v => TC(p, v.x), de: (x, y) => ((y - 74) / 40 * p.c + (x - TC(p, 0)[0]) / 36 * p.c) / 2 }],
    ok: (v, p) => v.x * p.a === p.b * p.c,
    sol: p => ({ x: p.b * p.c / p.a }),
    texto: p => `$\\tfrac{${p.a}}{${p.b}} = \\tfrac{${p.c}}{x}$: $x = ${p.b * p.c / p.a}$`,
    alto: () => 226, pie: 'Arrastra el punto a lo largo de la recta de la derecha.',
    dib(v, K, p, f) {
      const y1 = 34, y2 = 74, y3 = 74 + 40 * p.b / p.a, X1 = y => 108 - (y - 34) * 0.3, Q1 = [TC(p, -p.c)[0], y1], Q2 = TC(p, 0), Q3 = TC(p, v.x);
      return K.l(X1(16), 16, X1(212), 212, 'la') + K.l(...TC(p, -p.c * 1.4), ...TC(p, 18.4), 'lm') + K.l(20, y1, 320, y1) + K.l(20, y2, 320, y2) + K.t(X1(54) - 10, 59, p.a, 'ta', 'end') + K.t(X1(118) - 10, 122, p.b, 'ta', 'end') + K.t((Q1[0] + Q2[0]) / 2 + 14, 58, p.c, 'tf', 'start') + K.t((Q2[0] + Q3[0]) / 2 + 20, (Q2[1] + Q3[1]) / 2 - 2, N(v.x), 'tf', 'start') + K.l(...Q1, ...Q3, 'lf gr')
        + K.f(f, K.c(X1(y3), y3, 5, 'fk') + K.l(X1(y3) - 40 * f, y3, X1(y3) + (320 - X1(y3)) * f, y3, 'lo gr') + K.c(...Q3, 5, 'fF'));
    },
    lee: (v, p) => `$\\tfrac{${p.b}}{${p.a}} ${igualA(p.b / p.a)} ${N(p.b / p.a)} \\qquad \\tfrac{${Math.round(v.x)}}{${p.c}} ${igualA(Math.round(v.x) / p.c)} ${N(Math.round(v.x) / p.c)}$`,
    aviso: (v, p) => (v.x === p.c + p.b - p.a ? 'Sumaste la diferencia; los segmentos guardan la misma razón.' : v.x === p.b ? 'Los dos lados no miden igual: esta recta es más inclinada.' : v.x * p.a > p.b * p.c ? 'Se pasa de la tercera paralela.' : 'No llega a la tercera paralela.'),
    bien: () => 'Las paralelas cortan segmentos proporcionales.',
  });

  // Escala de un mapa: cuántos kilómetros reales.  v { km }
  XG.figura('escala-mapa', {
    ini: () => ({ km: 0.25 }),
    manijas: () => [{ k: 'km', min: 0.25, max: 6, paso: 0.25, en: v => [34 + v.km * 45, 132], de: x => (x - 34) / 45 }],
    ok: (v, p) => v.km * 100000 === p.cm * p.den,
    sol: p => ({ km: p.cm * p.den / 100000 }),
    texto: p => `$${p.cm} \\cdot ${miles(p.den)} = ${miles(p.cm * p.den)}$ cm, que son ${p.cm * p.den / 100000} km`,
    alto: () => 184, pie: 'Arrastra el final del camino real.',
    dib(v, K, p, f) {
      let h = K.t(170, 20, `mapa 1 : ${miles(p.den).replace(/\\,/g, ' ')}`, 'tm') + K.l(80, 62, 260, 62, 'lg gr') + K.c(80, 62, 5, 'fG') + K.c(260, 62, 5, 'fG') + K.t(170, 50, `${p.cm} cm`, 's tg');
      for (let i = 0; i <= p.cm; i++) h += K.l(80 + i * 180 / p.cm, 62, 80 + i * 180 / p.cm, 70, 'lm');
      h += K.l(34, 132, 304, 132, 'lm');
      for (let i = 0; i <= 6; i++) h += K.l(34 + i * 45, 132, 34 + i * 45, 142, 'lm') + K.t(34 + i * 45, 160, i, 's tm');
      const x = 34 + p.cm * p.den / 100000 * 45;
      return h + K.t(170, 178, 'kilómetros reales', 's tm') + K.l(34, 132, 34 + v.km * 45, 132, 'la gr') + K.t(Math.max(60, 34 + v.km * 45), 112, `${N(v.km)} km`, 'ta') + K.f(f, K.l(80, 70, 34, 124, 'lg d') + K.l(260, 70, 260 + (x - 260) * f, 70 + 54 * f, 'lg d') + K.c(x, 132, 5, 'fo'));
    },
    lee: (v, p) => `$${p.cm} \\cdot ${miles(p.den)} \\text{ cm} = ${miles(p.cm * p.den)} \\text{ cm}$`,
    aviso: (v, p) => (v.km === p.cm ? 'Un centímetro del mapa no es un kilómetro.' : v.km * 100000 > p.cm * p.den ? 'Es más de lo que dice la escala. Un kilómetro son 100 000 cm.' : 'Es menos de lo que dice la escala. Un kilómetro son 100 000 cm.'),
    bien: (v, p) => `Son ${p.cm * p.den / 100} metros reales.`,
  });

  // De cuánto creció el área sale cuánto creció el lado.  v { k }
  XG.figura('papel-factor', {
    ini: () => ({ k: 1 }),
    manijas: () => [{ k: 'k', min: 1, max: 36, paso: 1, et: 'el lado se multiplica por' }],
    ok: (v, p) => v.k ** 2 === p.veces,
    sol: p => ({ k: Math.sqrt(p.veces) }),
    texto: p => `$k^2 = ${p.veces}$: $k = ${Math.sqrt(p.veces)}$`,
    alto: () => 236, pie: 'Arrastra el factor del lado.',
    dib(v, K, p, f) {
      const k = Math.max(1, Math.round(v.k)), S = 150, u = S / k, X = 150, Y = 12, n = Math.round(f * k);
      let h = K.r(50, 80, 26, 26, 'fg', 2) + K.t(63, 124, 'antes', 's tm') + K.r(X, Y, S, S, 'fc', 2);
      if (!f) return h + K.t(X + S / 2, Y + S / 2 + 8, '?', 'B tm');
      h += K.r(X, Y, u, u, 'fg', 0);
      for (let i = 1; i <= n && i < k; i++) h += K.l(X + i * u, Y, X + i * u, Y + S, 'lr') + K.l(X, Y + i * u, X + S, Y + i * u, 'lr');
      return h + K.f(f * 2 - 1, K.t(X - 12, Y + 24, k * k, 'b ta', 'end') + K.t(X - 12, Y + 42, 'veces', 's tm', 'end'));
    },
    lee: v => `$${Math.round(v.k)}^2 = ${Math.round(v.k) ** 2}$`,
    aviso: (v, p) => (v.k === p.veces ? `${p.veces} es lo que creció el área, no el lado.` : v.k === p.veces / 2 ? 'No es la mitad: el área crece a lo ancho y a lo alto.' : v.k ** 2 > p.veces ? `Con ese factor el área crece ${v.k ** 2} veces.` : `Con ese factor el área solo crece ${v.k ** 2} veces.`),
    bien: v => `${v.k} filas de ${v.k}: el área crece con el cuadrado.`,
  });

  // Maqueta: arista, cara y volumen crecen distinto.
  const crece = p => [1, 2, 3].map(e => `× ${p.k ** e}`);
  XG.rotula('tres-crecimientos', {
    slots: () => [{ x: 290, y: 36, w: 76, h: 36 }, { x: 290, y: 92, w: 76, h: 36 }, { x: 290, y: 148, w: 76, h: 36 }],
    fichas: p => p.fichas, metas: crece,
    texto: p => `$${p.k}$, $${p.k}^2 = ${p.k ** 2}$ y $${p.k}^3 = ${p.k ** 3}$`,
    alto: () => 190,
    fondo: (K, p) => K.caja([28, 176], 11, 1, 1, 1, 'fg') + K.caja([100, 178], 11, p.k, p.k, p.k, 'fa') + K.t(86, 24, `arista × ${p.k}`, 's tm') + ['cinta del borde', 'pintura', 'arena'].map((t, i) => K.t(246, 40 + 56 * i, t, 's', 'end')).join(''),
    aviso(q, p) { const m = crece(p); return q[1][0] === m[0] || q[2][0] === m[0] ? 'La pintura cubre área y la arena llena volumen: crecen más que el largo.' : q[1][0] === `× ${2 * p.k}` ? 'El factor no se duplica: se multiplica por sí mismo.' : 'Largo por k; área por k dos veces; volumen por k tres veces.'; },
    bien: () => 'Largo, área y volumen: k, k² y k³.',
  });

  // Copia semejante con el área partida por `div`.  v { w, h }
  XG.figura('achica-area', {
    ini: p => ({ w: p.w, h: p.h }),
    manijas: p => [{ k: ['w', 'h'], min: [1, 1], max: [p.w, p.h], paso: [0.5, 0.5], en: v => [80 + v.w * 22, 170 - v.h * 22], de: (x, y) => [(x - 80) / 22, (170 - y) / 22] }],
    ok: (v, p) => v.w * p.h === v.h * p.w && v.w * v.h * p.div === p.w * p.h,
    sol: p => ({ w: p.w / Math.sqrt(p.div), h: p.h / Math.sqrt(p.div) }),
    texto: p => `lados por $\\tfrac{1}{${Math.sqrt(p.div)}}$: ${p.w / Math.sqrt(p.div)} por ${p.h / Math.sqrt(p.div)}`,
    alto: () => 200, pie: 'Arrastra la esquina de la copia.',
    dib(v, K, p, f) {
      const u = 22, x = 80, y = 170;
      let h = K.r(x, y - p.h * u, p.w * u, p.h * u, 'fc d');
      if (f) for (let i = 0; i < Math.floor(p.w / v.w + 1e-9); i++) for (let j = 0; j < Math.floor(p.h / v.h + 1e-9); j++) if (i + j) h += K.f(f, K.r(x + i * v.w * u, y - (j + 1) * v.h * u, v.w * u, v.h * u, 'fg'));
      return h + K.r(x, y - v.h * u, v.w * u, v.h * u, 'fa') + K.t(x + v.w * u / 2, y - v.h * u - 8, N(v.w), 'ta') + K.t(x + v.w * u + 10, y - v.h * u / 2 + 5, N(v.h), 'ta', 'start') + K.t(x + p.w * u / 2, y + 18, p.w, 'tm') + K.t(x - 10, y - p.h * u / 2 + 5, p.h, 'tm', 'end') + K.f(f, K.l(x, y, x + p.w * u * f, y - p.h * u * f, 'lf d'));
    },
    lee: (v, p) => `$${N(v.w)} \\cdot ${N(v.h)} = ${N(v.w * v.h)} \\qquad ${p.w} \\cdot ${p.h} = ${p.w * p.h}$`,
    aviso: (v, p) => (v.w * p.h !== v.h * p.w ? 'Cambió la forma: los dos lados deben achicarse las mismas veces.' : v.w * p.div === p.w ? `Dividiste cada lado entre ${p.div}: el área quedó mucho más chica.` : `La forma es la misma, pero el área no es la parte pedida.`),
    bien: (v, p) => `Caben ${p.div} copias: cada lado se partió entre ${Math.sqrt(p.div)}.`,
  });

  // En movimiento: un dron avanza por la regla lo que se le diga.
  XG.tiros('lanza-escala', {
    perilla: () => ({ et: 'Avance', min: 0, max: 30, lee: v => `${v}` }),
    meta: t => t.r, alto: 130, ms: 1600,
    dib(t, v, K, p, f) {
      const X = n => 24 + n * 292 / 30, y = 100, n = v == null ? 0 : v * f;
      let h = K.l(14, y, 326, y);
      for (let i = 0; i <= 30; i++) h += K.l(X(i), y - (i % 5 ? 3 : 6), X(i), y + (i % 5 ? 3 : 6), 'lm') + (i % 5 ? '' : K.t(X(i), y + 22, i, 's tm'));
      return h + (v == null ? '' : K.l(X(0), y - 10, X(n), y - 10, 'la gr') + K.f(f * 4 - 3, K.l(X(t.r), y - 34, X(t.r), y, v === t.r ? 'lo gr' : 'lf gr') + K.t(X(t.r), y - 42, t.r, v === t.r ? 'to' : 'tf')))
        + (yy => K.c(X(n), yy, 8, 'fA') + K.l(X(n) - 15, yy - 8, X(n) + 15, yy - 8, 'gr'))(y - 18 - 44 * Math.sin(Math.PI * f));
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Se pasó de largo.' : 'Se quedó corto.')),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira el avance y suelta: sale el dron.',
  });
})();
