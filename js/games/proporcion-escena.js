// Ejercicios de «Proporcionalidad y porcentajes» (pu-pr-1 a pu-pr-5) con las escenas de la explicación: vasos, barras, rectángulos de
// trabajo, vías y dobles reglas. Armazones en js/games/figura-kit.js y js/games/logica-kit.js (spec 2026-11-24-ejercicios-explora).
(() => {
  const N = x => String(Math.round(x * 100) / 100), R = Math.round, eq = x => (Math.abs(x - R(x * 100) / 100) < 1e-9 ? '=' : '\\approx');
  const miles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,'), mil = n => miles(n).replace(/\\,/g, ' ');
  const C = ['fa', 'fg', 'ff'], T = ['ta', 'tg', 'tf'];
  // Manija que se arrastra de lado: valor = (x − x0) / u.
  const lado = (k, min, max, paso, x0, u, y, mas = {}) => ({ k, min, max, paso, en: v => [x0 + v[k] * u, y], de: x => (x - x0) / u, ...mas });

  // ------------------------------------------------------------------------------------------- pu-pr-1 · razones y escalas
  const vasos = (K, n, x, y, cls, col = 12) => Array.from({ length: n }, (_, i) => { const X = x + (i % col) * 22, Y = y + Math.floor(i / col) * 26; return K.p([[X, Y], [X + 17, Y], [X + 14, Y + 20], [X + 3, Y + 20]], cls); }).join('');
  // Dos cantidades en la razón p : q y con un total dado.  v { a, b }
  XG.figura('mezcla-total', {
    ini: p => ({ a: p.p, b: p.q }),
    manijas: p => [{ k: 'a', min: 1, max: 24, paso: 1, et: p.ea }, { k: 'b', min: 1, max: 24, paso: 1, et: p.eb }],
    ok: (v, p) => v.a * p.q === v.b * p.p && v.a + v.b === p.total,
    sol: p => ({ a: p.p * p.total / (p.p + p.q), b: p.q * p.total / (p.p + p.q) }),
    texto: p => `$${p.total} \\div ${p.p + p.q} = ${p.total / (p.p + p.q)}$: ${p.p * p.total / (p.p + p.q)} y ${p.q * p.total / (p.p + p.q)}`,
    alto: () => 232, pie: 'Mueve las dos perillas.',
    dib: (v, K, p, f) => vasos(K, R(v.a), 46, 12, 'fa') + vasos(K, R(v.b), 46, 70, 'fg') + K.t(24, 34, R(v.a), 'ta') + K.t(24, 92, R(v.b), 'tg') + K.f(f, K.t(334, 130, `total: ${R(v.a + v.b)}`, 's tm', 'end')),
    lee: (v, p) => `$${R(v.a)} \\cdot ${p.q} = ${R(v.a) * p.q} \\qquad ${R(v.b)} \\cdot ${p.p} = ${R(v.b) * p.p}$`,
    aviso: (v, p) => (v.a * p.q === v.b * p.p ? `La razón está bien, pero son ${v.a + v.b} en total.` : v.a + v.b === p.total ? 'El total está bien, pero no guarda la razón.' : 'No guarda la razón: los productos en cruz no coinciden.'),
    bien: (v, p) => `Son ${p.total / (p.p + p.q)} grupos de ${p.p} y ${p.q}.`,
  });

  const suena = (p, i) => p.jarras[i][0] * p.modelo[1] === p.jarras[i][1] * p.modelo[0];
  XG.marca('mismo-sabor', {
    sitios: p => p.jarras.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 128 + Math.floor(i / 3) * 84, w: 100, h: 78 })),
    cara: (K, p, i) => { const x = 62 + (i % 3) * 108, y = 128 + Math.floor(i / 3) * 84; return K.t(x, y - 6, p.jarras[i][0], 'b ta') + K.t(x, y + 24, p.jarras[i][1], 'b tg') + K.l(x - 16, y + 4, x + 16, y + 4, 'lm'); },
    fondo: (K, p) => K.t(170, 18, 'modelo', 's tm') + K.t(150, 48, `${p.modelo[0]} de jugo`, 'ta', 'end') + K.t(190, 48, `${p.modelo[1]} de agua`, 'tg', 'start') + K.t(170, 72, 'arriba, jugo; abajo, agua', 's tm'), alto: () => 254,
    sol: p => p.jarras.map((_, i) => i).filter(i => suena(p, i)),
    aviso: (on, p) => (on.some((x, i) => x && !suena(p, i) && p.jarras[i][0] - p.modelo[0] === p.jarras[i][1] - p.modelo[1]) ? 'En una sumaste (o restaste) lo mismo a los dos: cambia el sabor.' : on.some((x, i) => x && !suena(p, i)) ? 'En una de esas los productos en cruz no coinciden.' : 'Falta otra: multiplica o divide los dos por lo mismo.'),
    bien: () => 'Los dos se multiplicaron o dividieron por lo mismo.', texto: p => p.jarras.filter((_, i) => suena(p, i)).map(j => j.join(' : ')).join(', '), pie: 'Toca todas las que saben igual.',
  });

  // Barra con dos cortes.  v { a, b }
  const partes = p => p.r.reduce((x, y) => x + y, 0);
  XG.figura('corta-reparto', {
    ini: p => ({ a: 3 * p.paso, b: p.total - 3 * p.paso }),
    manijas: p => [lado('a', p.paso, p.total - 2 * p.paso, p.paso, 20, 300 / p.total, 72, { limita: v => v.a < v.b }), lado('b', 2 * p.paso, p.total - p.paso, p.paso, 20, 300 / p.total, 72, { limita: v => v.a < v.b })],
    ok: (v, p) => { const u = p.total / partes(p); return v.a === p.r[0] * u && v.b === (p.r[0] + p.r[1]) * u; },
    sol: p => { const u = p.total / partes(p); return { a: p.r[0] * u, b: (p.r[0] + p.r[1]) * u }; },
    texto: p => `$${p.total} \\div ${partes(p)} = ${p.total / partes(p)}$: ${p.r.map(x => x * p.total / partes(p)).join(', ')}`,
    alto: () => 150, pie: 'Arrastra los dos cortes.',
    dib(v, K, p, f) {
      const X = k => 20 + k * 300 / p.total, q = [0, v.a, v.b, p.total], n = partes(p);
      return [0, 1, 2].map(i => K.r(X(q[i]), 50, X(q[i + 1]) - X(q[i]), 44, C[i]) + K.t((X(q[i]) + X(q[i + 1])) / 2, 118 + (i === 1 ? 18 : 0), N(q[i + 1] - q[i]), T[i])).join('') + K.t(170, 28, `${p.total} ${p.que}`, 'tm') + K.f(f, Array.from({ length: n - 1 }, (_, i) => K.l(20 + (i + 1) * 300 / n, 44, 20 + (i + 1) * 300 / n, 100, 'lo d')).join(''));
    },
    lee: (v, p) => `$${p.total} \\div ${partes(p)} = ${p.total / partes(p)}$`,
    aviso: (v, p) => (v.a === p.total / 3 && v.b === 2 * v.a ? 'No se reparte por igual: cada uno recibe según sus partes.' : `No les tocan ${p.r.join(', ')} partes: cuenta las rayas de cada pedazo.`),
    bien: (v, p) => `Son ${partes(p)} partes iguales de ${p.total / partes(p)}.`,
  });

  // Se conoce lo de uno solo; se hallan los demás y el total.
  const una = p => p.sabe / p.r[p.k], otros = p => p.r.map((_, i) => i).filter(i => i !== p.k);
  const metasUna = p => [...otros(p).map(i => p.r[i] * una(p)), partes(p) * una(p)].map(String);
  XG.rotula('una-parte', {
    slots: () => [0, 1, 2].map(i => ({ x: 62 + i * 108, y: 128, w: 92, h: 38 })), fichas: p => p.fichas, metas: metasUna,
    texto: p => `una parte vale $${p.sabe} \\div ${p.r[p.k]} = ${una(p)}$: ${metasUna(p).join(', ')}`, alto: () => 168,
    fondo(K, p, f) {
      const n = partes(p), w = 300 / n; let h = '', c = 0;
      p.r.forEach((g, i) => { for (let j = 0; j < g; j++, c++) h += K.r(20 + c * w + 1, 40, w - 2, 34, C[i]) + K.f(f, K.t(20 + (c + 0.5) * w, 62, una(p), 's')); h += K.t(20 + (c - g / 2) * w, 30, p.nom[i], `s ${T[i]}`); });
      return h + otros(p).map((i, k) => K.t(62 + k * 108, 164, p.nom[i], 's tm')).join('') + K.t(278, 164, 'en total', 's tm') + K.t(170, 94, `${p.nom[p.k]}: ${p.sabe}`, T[p.k]);
    },
    aviso(q, p) { const m = metasUna(p); return q[2][0] === String(una(p)) ? 'El total son todas las partes, no una.' : q[0][0] !== m[0] && q[1][0] !== m[1] ? 'Halla primero cuánto vale una sola parte.' : 'Multiplica lo que vale una parte por las que tiene cada uno.'; },
    bien: p => `Cada parte vale ${una(p)}.`,
  });

  // Escala: distancia real (escala-real) o medida en el plano (escala-plano).
  const mapa = (K, p, cm, txt) => K.r(14, 12, 312, 62, 'fc') + K.t(24, 30, `1 : ${mil(p.den)}`, 's tm', 'start') + K.l(30, 56, 30 + cm * 34, 56, 'lf gr') + K.c(30, 56, 4, 'fF') + K.c(30 + cm * 34, 56, 4, 'fF') + K.t(316, 30, txt, 'tf', 'end');
  XG.figura('escala-real', {
    ini: () => ({ km: 0.2 }), manijas: () => [lado('km', 0.2, 4.2, 0.2, 34, 64, 118)],
    ok: (v, p) => R(v.km * 100000) === p.cm * p.den, sol: p => ({ km: p.cm * p.den / 100000 }),
    texto: p => `$${p.cm} \\cdot ${miles(p.den)} = ${miles(p.cm * p.den)}$ cm $= ${p.cm * p.den / 100000}$ km`, alto: () => 166, pie: 'Arrastra el final de la distancia real.',
    dib(v, K, p, f) { const x = k => 34 + k * 64; return mapa(K, p, p.cm, `${p.cm} cm`) + K.l(x(0), 118, x(4.2), 118, 'lm') + [0, 1, 2, 3, 4].map(k => K.l(x(k), 118, x(k), 127, 'lm') + K.t(x(k), 143, k, 's tm')).join('') + K.t(170, 160, 'kilómetros', 's tm') + K.l(x(0), 118, x(v.km), 118, 'la gr') + K.t(Math.max(60, x(v.km)), 100, `${N(v.km)} km`, 'ta') + K.f(f, K.c(x(p.cm * p.den / 100000), 118, 5, 'fo') + Array.from({ length: p.cm }, (_, i) => K.l(x((i + 1) * p.den / 100000), 110, x((i + 1) * p.den / 100000), 126, 'lg')).join('')); },
    lee: (v, p) => `$1 \\text{ cm} \\to ${miles(p.den)} \\text{ cm} = ${p.den / 100} \\text{ m}$`,
    aviso: (v, p) => (R(v.km * 100000) > p.cm * p.den ? `Cada centímetro son ${p.den / 100} m; te pasaste.` : `Cada centímetro son ${p.den / 100} m; falta.`), bien: (v, p) => `${p.cm} veces ${p.den / 100} m.`,
  });
  XG.figura('escala-plano', {
    ini: () => ({ cm: 1 }), manijas: () => [lado('cm', 0.5, 8, 0.5, 30, 34, 56)],
    ok: (v, p) => v.cm * p.den === p.km * 100000, sol: p => ({ cm: p.km * 100000 / p.den }),
    texto: p => `$${p.km} \\text{ km} = ${miles(p.km * 100000)}$ cm, y $${miles(p.km * 100000)} \\div ${miles(p.den)} = ${p.km * 100000 / p.den}$`, alto: () => 150, pie: 'Arrastra el punto del mapa.',
    dib: (v, K, p, f) => mapa(K, p, v.cm, `${N(v.cm)} cm`) + K.l(30, 116, 310, 116, 'la gr') + K.c(30, 116, 5, 'fA') + K.c(310, 116, 5, 'fA') + K.t(170, 106, `${p.km} km de verdad`, 'ta') + K.f(f, K.t(170, 142, `tu medida serían ${N(v.cm * p.den / 100000)} km`, 's tm')),
    lee: (v, p) => `$${N(v.cm)} \\cdot ${miles(p.den)} \\text{ cm} = ${N(v.cm * p.den / 100000)} \\text{ km}$`,
    aviso: (v, p) => (v.cm * p.den > p.km * 100000 ? 'En el mapa quedó muy lejos.' : 'En el mapa quedó muy cerca.'), bien: (v, p) => `Cada centímetro son ${N(p.den / 100000)} km.`,
  });

  // Se agrega solo de un lado hasta lograr la razón p : q.  v { n }
  XG.figura('arregla-razon', {
    ini: () => ({ n: 0 }), manijas: () => [{ k: 'n', min: 0, max: 12, paso: 1, et: 'vasos de jugo que se agregan' }],
    ok: (v, p) => (p.a + v.n) * p.q === p.b * p.p, sol: p => ({ n: p.b * p.p / p.q - p.a }),
    texto: p => `$\\tfrac{${p.p}}{${p.q}} = \\tfrac{${p.b * p.p / p.q}}{${p.b}}$: se agregan $${p.b * p.p / p.q - p.a}$`, alto: () => 210, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => vasos(K, p.a + R(v.n), 46, 12, 'fa', 9) + vasos(K, p.b, 46, 92, 'fg', 9) + K.t(24, 34, p.a + R(v.n), 'ta') + K.t(24, 112, p.b, 'tg') + K.t(334, 34, 'jugo', 's ta', 'end') + K.t(334, 112, 'agua', 's tg', 'end'),
    lee: (v, p) => `$${p.a + R(v.n)} \\cdot ${p.q} = ${(p.a + R(v.n)) * p.q} \\qquad ${p.b} \\cdot ${p.p} = ${p.b * p.p}$`,
    aviso: (v, p) => ((p.a + v.n) * p.q > p.b * p.p ? 'Quedó con demasiado jugo.' : 'Todavía le falta jugo.'), bien: (v, p) => `${p.a + v.n} y ${p.b} es lo mismo que ${p.p} y ${p.q}.`,
  });

  // En movimiento: el balde se llena con lo que se le dé y debe llegar a la raya.
  const balde = (nombre, o) => XG.tiros(nombre, {
    perilla: () => ({ et: o.et, min: 0, max: o.max, cara: o.k ? v => v * o.k : undefined, lee: v => `${v * (o.k || 1)}${o.u || ''}` }), meta: t => t.r / (o.k || 1), alto: 138, ms: 1600,
    dib(t, v, K, p, f) {
      const m = t.r / (o.k || 1), k = v == null ? 0 : (v === m ? 1 : v < m ? 0.7 : 1.2) * f, H = 78, y = 124, n = Math.min(1.16, k);
      return K.p([[112, y - 96], [228, y - 96], [214, y], [126, y]], 'fn') + (n > 0.01 ? K.p([[126, y], [214, y], [214 + 14 * n * H / 96, y - H * n], [126 - 14 * n * H / 96, y - H * n]], k > 1.001 ? 'ff' : 'fa') : '') + K.l(106, y - H, 234, y - H, f >= 1 && v === m ? 'lo gr' : 'lg d gr') + (v == null ? '' : K.t(170, y - 30, `${v * (o.k || 1)}${o.u || ''}`, 'b')) + (k > 1.1 ? K.f(Math.min(1, (k - 1.1) * 10), K.c(100, y - 70, 5, 'fF') + K.c(240, y - 62, 5, 'fF') + K.c(94, y - 40, 4, 'fF')) : '');
    },
    falla: (t, v) => t.e?.[v * (o.k || 1)] || (v * (o.k || 1) > t.r ? 'Se pasó de la raya.' : 'No llegó a la raya.'), cuenta: t => `$${t.c} = ${t.r}$${t.u || ''}`, pie: 'Estira la cantidad justa y suelta.',
  });
  balde('sirve-partes', { et: 'Cantidad', max: 40 });
  balde('lanza-regla', { et: 'Cantidad', max: 40 });
  balde('tiro-porciento', { et: 'Cantidad', max: 40 });
  balde('tiro-precio', { et: 'Precio', max: 24, k: 5 });

  // ------------------------------------------------------------------------------------------------ pu-pr-2 · regla de tres
  // Directa: se estira la segunda barra.  params { x1, y1, x2, ex, ey, max, paso }   v { y }
  XG.figura('precio-unidad', {
    ini: p => ({ y: p.y1 }), manijas: p => [lado('y', p.paso, p.max, p.paso, 24, 280 / p.max, 148)],
    ok: (v, p) => v.y * p.x1 === p.y1 * p.x2, sol: p => ({ y: p.y1 * p.x2 / p.x1 }),
    texto: p => `$${p.y1} \\div ${p.x1} = ${p.y1 / p.x1}$ y $${p.x2} \\cdot ${p.y1 / p.x1} = ${p.y1 * p.x2 / p.x1}$`, alto: () => 180, pie: 'Arrastra el final de la barra.',
    dib(v, K, p, f) {
      const u = 280 / p.max; let h = K.t(24, 24, `${p.x1} ${p.ex}`, 's tm', 'start') + K.r(24, 32, p.y1 * u, 30, 'fg') + K.t(34 + p.y1 * u, 53, p.y1, 'tg', 'start') + K.t(24, 122, `${p.x2} ${p.ex}`, 's tm', 'start') + K.r(24, 132, v.y * u, 32, 'fa') + K.t(24 + v.y * u / 2, 153, N(v.y), 'ta');
      if (f) { for (let i = 1; i < p.x1; i++) h += K.l(24 + i * p.y1 / p.x1 * u, 32, 24 + i * p.y1 / p.x1 * u, 62, 'lr'); h += K.f(f, Array.from({ length: p.x2 }, (_, i) => K.l(24 + (i + 1) * p.y1 / p.x1 * u, 126, 24 + (i + 1) * p.y1 / p.x1 * u, 170, 'lo d')).join('')); }
      return h;
    },
    lee: (v, p) => `$${p.y1} \\div ${p.x1} = ${N(p.y1 / p.x1)} \\qquad ${N(v.y)} \\div ${p.x2} ${eq(v.y / p.x2)} ${N(v.y / p.x2)}$`,
    aviso: (v, p) => (v.y === p.y1 + p.x2 - p.x1 ? 'Sumaste la diferencia; lo que no cambia es el valor de uno.' : v.y * p.x1 > p.y1 * p.x2 ? 'Cada uno saldría más caro que antes.' : 'Cada uno saldría más barato que antes.'), bien: (v, p) => `Cada uno vale ${N(p.y1 / p.x1)}.`,
  });

  // Inversa: rectángulo de trabajo con un lado dado.  params { a1, b1, a2, ea, eb, max }   v { b }
  const ejes = K => K.l(64, 182, 330, 182, 'lm') + K.l(64, 182, 64, 12, 'lm');
  XG.figura('rectangulo-trabajo', {
    ini: () => ({ b: 2 }), manijas: p => [{ k: 'b', min: 1, max: p.max, paso: 1, en: v => [64 + p.a2 * 11, 182 - v.b * 160 / p.max], de: (x, y) => (182 - y) * p.max / 160 }],
    ok: (v, p) => v.b * p.a2 === p.a1 * p.b1, sol: p => ({ b: p.a1 * p.b1 / p.a2 }),
    texto: p => `$${p.a1} \\cdot ${p.b1} = ${p.a1 * p.b1}$ y $${p.a1 * p.b1} \\div ${p.a2} = ${p.a1 * p.b1 / p.a2}$`, alto: () => 206, pie: 'Arrastra el borde de arriba del rectángulo.',
    dib(v, K, p, f) { const uy = 160 / p.max; return ejes(K) + K.f(0.4 + 0.6 * f, K.r(64, 182 - p.b1 * uy, p.a1 * 22, p.b1 * uy, 'fn d') + K.t(70 + p.a1 * 22, 190 - p.b1 * uy, `${p.a1} × ${p.b1}`, 's tm', 'start')) + K.r(64, 182 - v.b * uy, p.a2 * 22, v.b * uy, 'fa') + K.t(64 + p.a2 * 11, 200, `${p.a2} ${p.ea}`, 'ta') + K.t(56, 186 - v.b * uy / 2, N(v.b), 'tg', 'end') + K.t(56, 202 - v.b * uy / 2, p.eb, 's tm', 'end'); },
    lee: (v, p) => `$${p.a1} \\cdot ${p.b1} = ${p.a1 * p.b1} \\qquad ${p.a2} \\cdot ${R(v.b)} = ${p.a2 * R(v.b)}$`,
    aviso: (v, p) => (v.b * p.a1 === p.b1 * p.a2 ? `Dividiste como si fuera directa: con menos ${p.ea} no puede tardar menos.` : v.b * p.a2 > p.a1 * p.b1 ? 'Sobra trabajo: el producto quedó más grande.' : 'Falta trabajo: el producto quedó más chico.'), bien: (v, p) => `Las dos cuentas dan ${p.a1 * p.b1}.`,
  });

  XG.marca('crece-o-baja', {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 24 + i * 44, w: 320, h: 38 })), cara: (K, p, i) => K.t(170, 29 + i * 44, p.casos[i].t, 's'), alto: p => p.casos.length * 44 + 6,
    sol: p => p.casos.map((_, i) => i).filter(i => p.casos[i].inv),
    aviso: (on, p) => (on.some((x, i) => x && !p.casos[i].inv) ? 'En una de esas, si una se duplica la otra también: es directa.' : 'Falta otra en la que una sube y la otra baja.'),
    bien: () => 'En esas, al duplicar una, la otra queda a la mitad.', texto: p => p.casos.filter(c => c.inv).map(c => c.t).join('; '), pie: 'Toca todas las inversas.',
  });

  // Compuesta: filas = horas, columnas = quienes trabajan.  params { a1, b1, c1, a?, b?, c, ea }; se mueve lo que falta.  v { n }
  const compuesta = (nombre, horas) => XG.figura(nombre, {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: horas ? 'horas' : p.ea }],
    ok: (v, p) => v.n * p.fijo * p.c1 === p.c * p.a1 * p.b1, sol: p => ({ n: p.c * p.a1 * p.b1 / (p.c1 * p.fijo) }),
    texto: p => `$${p.c1} \\div (${p.a1} \\cdot ${p.b1}) = ${p.c1 / (p.a1 * p.b1)}$ y $${p.c} \\div (${p.fijo} \\cdot ${p.c1 / (p.a1 * p.b1)}) = ${p.c * p.a1 * p.b1 / (p.c1 * p.fijo)}$`,
    alto: () => 236, pie: 'Cada cuadro es uno trabajando una hora. Mueve la perilla.',
    dib(v, K, p, f) {
      const n = R(v.n), a = horas ? p.fijo : n, b = horas ? n : p.fijo, u = 16, val = p.c1 / (p.a1 * p.b1);
      const cuadros = (x, y, a, b, w, cls, t) => Array.from({ length: a * b }, (_, i) => K.r(x + (i % a) * w + 1, y + Math.floor(i / a) * w + 1, w - 2, w - 2, cls, 2) + (t ? K.f(f, K.t(x + (i % a + 0.5) * w, y + (Math.floor(i / a) + 0.5) * w + 4, val, 's')) : '')).join('');
      return K.t(60, 18, `${p.c1} ${p.que}`, 's tg') + cuadros(60 - p.a1 * 8, 28, p.a1, p.b1, 16, 'fg') + K.t(60, 46 + p.b1 * 16, `${p.a1} ${p.ea}`, 's tm') + K.t(60, 62 + p.b1 * 16, `${p.b1} h`, 's tm') + K.t(226, 18, `${a} ${p.ea}, ${b} h`, 's ta') + cuadros(226 - a * u / 2, 28, a, b, u, 'fa', true);
    },
    lee: (v, p) => `$${p.fijo} \\cdot ${R(v.n)} \\cdot ${p.c1 / (p.a1 * p.b1)} = ${p.fijo * R(v.n) * p.c1 / (p.a1 * p.b1)}$`,
    aviso: (v, p) => (v.n * p.fijo * p.c1 > p.c * p.a1 * p.b1 ? `Harían más de ${p.c}.` : `Harían menos de ${p.c}.`), bien: (v, p) => `Cada cuadro hace ${p.c1 / (p.a1 * p.b1)}.`,
  });
  compuesta('cuadros-trabajo', true); compuesta('maquinas-justas', false);

  // Tabla directa con tres huecos.  params { k, x: [..], huecos: [['y', i] | ['x', i]] }
  const metasT = p => p.huecos.map(([f, i]) => N(f === 'y' ? p.x[i] * p.k : p.x[i]));
  XG.rotula('tabla-directa', {
    slots: p => p.huecos.map(([f, i]) => ({ x: 112 + i * (208 / p.x.length) + 104 / p.x.length, y: f === 'x' ? 44 : 112, w: 46, h: 38 })), fichas: p => p.fichas, metas: metasT,
    texto: p => `cada uno vale $${p.k}$: ${metasT(p).join(', ')}`, alto: () => 148,
    fondo: (K, p) => { const w = 208 / p.x.length, hay = (f, i) => p.huecos.some(h => h[0] === f && h[1] === i); return K.t(100, 49, p.ex, 's', 'end') + K.t(100, 117, p.ey, 's', 'end') + p.x.map((x, i) => K.r(112 + i * w + 2, 18, w - 4, 52, 'fc', 6) + K.r(112 + i * w + 2, 86, w - 4, 52, 'fc', 6) + (hay('x', i) ? '' : K.t(112 + (i + 0.5) * w, 49, x, 'ta')) + (hay('y', i) ? '' : K.t(112 + (i + 0.5) * w, 117, N(x * p.k), 'tg'))).join(''); },
    aviso: (q, p) => (q.some((l, i) => { const [f, j] = p.huecos[i], d = p.x.findIndex((_, k) => !p.huecos.some(h => h[1] === k)); return f === 'y' && l[0] === N(p.x[d] * p.k + p.x[j] - p.x[d]); }) ? 'Sumaste lo mismo arriba y abajo; el cociente es lo que no cambia.' : 'Halla cuánto vale uno con la columna completa: ese cociente sirve para todas.'),
    bien: p => `En todas las columnas, abajo entre arriba da ${N(p.k)}.`,
  });

  // Cambian las personas a mitad de camino.  params { g, d, pasan, llegan }   v { x } de medio en medio
  const queda = p => p.g * (p.d - p.pasan) / (p.g + p.llegan);
  XG.figura('raciones-dias', {
    ini: () => ({ x: 1 }), manijas: p => [{ k: 'x', min: 0.5, max: p.d, paso: 0.5, en: v => [40 + (p.pasan + v.x) * 20, 92], de: x => (x - 40) / 20 - p.pasan }],
    ok: (v, p) => v.x === queda(p), sol: p => ({ x: queda(p) }),
    texto: p => `quedan $${p.g} \\cdot ${p.d - p.pasan} = ${p.g * (p.d - p.pasan)}$ raciones y $${p.g * (p.d - p.pasan)} \\div ${p.g + p.llegan} = ${queda(p)}$ días`, alto: () => 186, pie: 'Arrastra hasta cuándo alcanza la comida.',
    dib(v, K, p, f) {
      const h = n => n * 4.6, y = 158; return K.l(30, y, 330, y, 'lm') + K.r(40, y - h(p.g), p.pasan * 20, h(p.g), 'fg', 0) + K.t(40 + p.pasan * 10, y - h(p.g) - 7, p.g, 'tg') + K.f(0.35 + 0.65 * f, K.r(40 + p.pasan * 20, y - h(p.g), (p.d - p.pasan) * 20, h(p.g), 'fn d', 0)) + K.r(40 + p.pasan * 20, y - h(p.g + p.llegan), v.x * 20, h(p.g + p.llegan), 'fa', 0) + K.t(40 + p.pasan * 20 + v.x * 10, y - h(p.g + p.llegan) - 7, p.g + p.llegan, 'ta') + K.t(40 + p.pasan * 10, y + 18, `${p.pasan} días`, 's tm') + K.t(40 + p.pasan * 20 + Math.max(26, v.x * 10), y + 18, `${N(v.x)} ${v.x === 1 ? 'día' : 'días'} más`, 's ta');
    },
    lee: (v, p) => `$${p.g + p.llegan} \\cdot ${N(v.x)} = ${N((p.g + p.llegan) * v.x)} \\qquad ${p.g} \\cdot ${p.d - p.pasan} = ${p.g * (p.d - p.pasan)}$`,
    aviso: (v, p) => (v.x === p.d - p.pasan ? 'Eso duraría si no llegara nadie.' : v.x === p.g * p.d / (p.g + p.llegan) ? 'Ya se gastaron los primeros días: descuéntalos.' : v.x > queda(p) ? 'Se gastaría más comida de la que queda.' : 'Sobraría comida.'), bien: () => 'Las raciones que quedaban, repartidas entre más personas.',
  });

  // --------------------------------------------------------------------------------------- pu-pr-3 · velocidad y trabajo
  const carro = (K, x, y, cls) => K.r(x - 15, y - 13, 30, 10, cls, 4) + K.r(x - 8, y - 20, 16, 9, cls, 3) + K.c(x - 8, y - 2, 4, 'fk') + K.c(x + 8, y - 2, 4, 'fk');
  const cx = (p, k) => Math.max(10, Math.min(330, 24 + k / p.D * 292));
  const via = (K, p) => K.l(14, 104, 326, 104, 'lm');
  const reloj = (nombre, d) => XG.figura(nombre, {
    ini: () => ({ t: 0 }), manijas: p => [{ k: 't', min: 0, max: p.max, paso: 0.5, et: 'horas', rot: v => N(v.t) }], alto: () => 186, ms: 2000, pie: 'Mueve el reloj. Al comprobar salen los carros.', ...d,
  });
  reloj('reloj-encuentro', {
    ok: (v, p) => v.t * (p.va + p.vb) === p.D, sol: p => ({ t: p.D / (p.va + p.vb) }), texto: p => `$${p.D} \\div (${p.va} + ${p.vb}) = ${p.D / (p.va + p.vb)}$ h`,
    dib(v, K, p, f) { const a = p.va * v.t * f, b = p.D - p.vb * v.t * f; return via(K, p) + carro(K, cx(p, a), 100, 'fa') + carro(K, cx(p, b), 100, 'fg') + K.t(24, 62, `${p.va} km/h`, 's ta', 'start') + K.t(316, 62, `${p.vb} km/h`, 's tg', 'end') + K.cota(24, 110, 316, 110, `${p.D} km`) + (f ? K.l(24, 34, cx(p, a), 34, 'la gr') + K.l(316, 42, cx(p, b), 42, 'lg gr') : ''); },
    lee: (v, p) => `$${p.va} \\cdot ${N(v.t)} + ${p.vb} \\cdot ${N(v.t)} = ${N((p.va + p.vb) * v.t)}$`, aviso: (v, p) => (v.t * (p.va + p.vb) > p.D ? 'Ya se cruzaron y siguieron de largo.' : v.t * p.va === p.D ? 'El otro también avanza.' : 'Todavía no se encuentran.'), bien: p => 'Cada hora se acercan lo que avanzan los dos.',
  });
  const caza = { ok: (v, p) => v.t * (p.vb - p.va) === p.vent, sol: p => ({ t: p.vent / (p.vb - p.va) }),
    dib(v, K, p, f) { const a = p.vent + p.va * v.t * f, b = p.vb * v.t * f; return via(K, p) + carro(K, cx(p, a), 100, 'fg') + carro(K, cx(p, b), 100, 'fa') + K.t(24, 30, `el de atrás: ${p.vb} km/h`, 's ta', 'start') + K.t(24, 48, `el de adelante: ${p.va} km/h`, 's tg', 'start') + (f ? K.l(24, 116, cx(p, b), 116, 'la gr') + K.l(24, 124, cx(p, a), 124, 'lg gr') : p.horas ? '' : K.cota(24, 110, cx(p, p.vent), 110, `${p.vent} km`)); },
    lee: (v, p) => `$\\text{ventaja: } ${p.vent} - ${p.vb - p.va} \\cdot ${N(v.t)} = ${N(p.vent - (p.vb - p.va) * v.t)}$`, bien: (v, p) => `Cada hora descuenta ${p.vb - p.va} km.` };
  reloj('reloj-caza', { ...caza, texto: p => `$${p.vent} \\div (${p.vb} - ${p.va}) = ${p.vent / (p.vb - p.va)}$ h`, aviso: (v, p) => (v.t * (p.vb - p.va) > p.vent ? 'Ya lo alcanzó y lo pasó.' : 'Aún no lo alcanza: cada hora solo descuenta la diferencia.') });
  reloj('sale-despues', { ...caza, texto: p => `ventaja $${p.va} \\cdot ${p.horas} = ${p.vent}$ km, y $${p.vent} \\div ${p.vb - p.va} = ${p.vent / (p.vb - p.va)}$ h`, aviso: (v, p) => (v.t === p.horas ? 'Esas son las horas de ventaja, no las de la persecución.' : v.t === p.vent / (p.vb - p.va) + p.horas ? 'Cuenta desde que sale el segundo.' : v.t * (p.vb - p.va) > p.vent ? 'Ya lo alcanzó y lo pasó.' : 'Aún no lo alcanza.') });

  // Velocidad media de dos tramos iguales.  v { v }
  XG.figura('media-viaje', {
    ini: p => ({ v: p.v1 }), manijas: p => [lado('v', p.v1, p.v2, 2.5, 24 - p.v1 * 292 / (p.v2 - p.v1), 292 / (p.v2 - p.v1), 132)],
    ok: (v, p) => v.v === 2 * p.d / (p.d / p.v1 + p.d / p.v2), sol: p => ({ v: 2 * p.d / (p.d / p.v1 + p.d / p.v2) }),
    texto: p => `$\\tfrac{${2 * p.d}}{${p.d / p.v1} + ${p.d / p.v2}} = ${2 * p.d / (p.d / p.v1 + p.d / p.v2)}$ km/h`, alto: () => 172, pie: 'Arrastra la velocidad media de todo el viaje.',
    dib(v, K, p, f) { const x = q => 24 + (q - p.v1) * 292 / (p.v2 - p.v1), t1 = p.d / p.v1, t2 = p.d / p.v2, u = 270 / (t1 + t2); return K.t(24, 20, `${p.d} km a ${p.v1} km/h`, 's ta', 'start') + K.t(316, 20, `${p.d} km a ${p.v2} km/h`, 's tg', 'end') + (f ? K.r(34, 34, t1 * u * Math.min(1, f * 2), 26, 'fa') + K.r(34 + t1 * u, 34, t2 * u * Math.max(0, f * 2 - 1), 26, 'fg') + K.f(f * 2 - 1, K.t(34 + t1 * u / 2, 52, `${t1} h`, 'ta') + K.t(34 + (t1 + t2 / 2) * u, 52, `${t2} h`, 'tg')) : K.r(34, 34, 135, 26, 'fa') + K.r(169, 34, 135, 26, 'fg') + K.t(169, 78, 'dos tramos de igual distancia', 's tm')) + K.l(24, 132, 316, 132, 'lm') + K.t(24, 160, p.v1, 's tm') + K.t(316, 160, p.v2, 's tm') + K.t(Math.max(44, Math.min(292, x(v.v))), 110, `${N(v.v)} km/h`, 'b') + K.f(f, K.c(x(2 * p.d / (t1 + t2)), 132, 6, 'fo')); },
    lee: (v, p) => `$${2 * p.d} \\text{ km en } ${p.d / p.v1 + p.d / p.v2} \\text{ h}$`, aviso: (v, p) => (v.v === (p.v1 + p.v2) / 2 ? 'Promediaste las velocidades, pero va más horas despacio.' : v.v > 2 * p.d / (p.d / p.v1 + p.d / p.v2) ? 'Es menos: pasa más tiempo yendo despacio.' : 'Es más: revisa las horas de cada tramo.'), bien: () => 'Toda la distancia entre todo el tiempo.',
  });

  // Tanque con dos llaves.
  const tanque = (K, a, b, f) => { const H = 128, y = 150, t = Math.min(1, a + b), A = a / (a + b || 1) * t; return K.r(112, y - H * A * f, 116, H * A * f, 'fa', 0) + K.r(112, y - H * t * f, 116, H * (t - A) * f, 'fg', 0) + K.r(112, y - H, 116, H, 'fn', 3) + (a + b > 1.001 && f >= 1 ? [106, 234].map(x => K.l(x, y - H + 6, x, y - H + 60, 'lf gr')).join('') : ''); };
  XG.figura('juntos-llenan', {
    ini: () => ({ t: 1 }), manijas: p => [{ k: 't', min: 1, max: p.max, paso: 1, et: 'horas' }],
    ok: (v, p) => v.t * (p.A + p.B) === p.A * p.B, sol: p => ({ t: p.A * p.B / (p.A + p.B) }), texto: p => `$\\tfrac{1}{${p.A}} + \\tfrac{1}{${p.B}} = \\tfrac{1}{${p.A * p.B / (p.A + p.B)}}$: $${p.A * p.B / (p.A + p.B)}$ h`,
    alto: () => 222, ms: 1900, pie: 'Mueve el reloj. Al comprobar se abren las dos llaves.',
    dib: (v, K, p, f) => tanque(K, v.t / p.A, v.t / p.B, f) + K.t(100, 50, `sola: ${p.A} h`, 's ta', 'end') + K.t(242, 50, `sola: ${p.B} h`, 's tg', 'start'),
    lee: (v, p) => `$\\tfrac{${R(v.t)}}{${p.A}} + \\tfrac{${R(v.t)}}{${p.B}} = \\tfrac{${R(v.t) * (p.A + p.B)}}{${p.A * p.B}}$`, aviso: (v, p) => (v.t === (p.A + p.B) / 2 ? 'El promedio no sirve: juntas tardan menos que la más rápida sola.' : v.t >= Math.min(p.A, p.B) ? 'Se riega: juntas tardan menos que la más rápida sola.' : v.t * (p.A + p.B) > p.A * p.B ? 'Se riega: ya estaba lleno.' : 'No alcanza a llenarse.'), bien: () => 'Se suma lo que cada una llena por hora.',
  });
  const sola = p => p.A * p.j / (p.A - p.j);
  XG.figura('segunda-llave', {
    ini: () => ({ B: 1 }), manijas: p => [{ k: 'B', min: 1, max: p.max, paso: 1, et: 'horas de la segunda, sola' }],
    ok: (v, p) => v.B === sola(p), sol: p => ({ B: sola(p) }), texto: p => `$\\tfrac{1}{${p.j}} - \\tfrac{1}{${p.A}} = \\tfrac{1}{${sola(p)}}$: $${sola(p)}$ h`,
    alto: () => 222, ms: 1900, pie: 'Mueve las horas de la segunda llave.',
    dib: (v, K, p, f) => tanque(K, p.j / p.A, p.j / v.B, f) + K.t(100, 50, `sola: ${p.A} h`, 's ta', 'end') + K.t(242, 50, 'sola: ?', 's tg', 'start') + K.t(170, 14, `juntas: ${p.j} h`, 's'),
    lee: (v, p) => `$\\tfrac{${p.j}}{${p.A}} + \\tfrac{${p.j}}{${R(v.B)}} ${eq(p.j / p.A + p.j / R(v.B))} ${N(p.j / p.A + p.j / R(v.B))} \\text{ tanques}$`, aviso: (v, p) => (v.B === p.A - p.j ? 'No se restan las horas: se resta lo que llenan por hora.' : v.B > sola(p) ? `Con las dos, en ${p.j} horas no se llenaría.` : `Con las dos, antes de ${p.j} horas ya se regaría.`), bien: p => 'Lo que llenan juntas en una hora, menos lo que llena la primera.',
  });

  // Distancia, velocidad o tiempo: el dato que falta de tres viajes.  params { viajes: [{ d, v, t, falta }] }
  const metasV = p => p.viajes.map(x => N(x[x.falta]));
  XG.rotula('tres-viajes', {
    slots: p => p.viajes.map((x, i) => ({ x: { d: 128, v: 210, t: 292 }[x.falta], y: 52 + i * 50, w: 66, h: 38 })), fichas: p => p.fichas, metas: metasV,
    texto: p => p.viajes.map(x => `$${x.v} \\cdot ${x.t} = ${x.d}$`).join(', '), alto: () => 182,
    fondo: (K, p) => K.t(128, 20, 'km', 's tm') + K.t(210, 20, 'km/h', 's tm') + K.t(292, 20, 'horas', 's tm') + p.viajes.map((x, i) => K.t(80, 57 + i * 50, x.n, 's', 'end') + [['d', 128], ['v', 210], ['t', 292]].filter(([k]) => k !== x.falta).map(([k, X]) => K.t(X, 57 + i * 50, N(x[k]))).join('')).join(''),
    aviso: (q, p) => { const i = p.viajes.findIndex((x, k) => q[k][0] !== N(x[x.falta])), x = p.viajes[i]; return x.falta === 'd' ? 'La distancia es velocidad por tiempo.' : x.falta === 't' ? 'El tiempo es distancia entre velocidad.' : 'La velocidad es distancia entre tiempo.'; }, bien: () => 'En los tres, velocidad por tiempo da la distancia.',
  });

  // En movimiento: el bus anda las horas que se le den y debe parar en la bandera.
  XG.tiros('lanza-viaje', {
    perilla: () => ({ et: 'Horas', min: 0, max: 20, lee: v => `${v} h` }), meta: t => t.r, alto: 112, ms: 1800,
    dib(t, v, K, p, f) { const xm = 250, x = v == null ? 40 : 40 + (xm - 40) * (v === t.r ? 1 : v < t.r ? 0.7 : 1.3) * f; return K.l(10, 90, 330, 90) + K.l(xm, 90, xm, 34, 'lo gr') + K.p([[xm, 34], [xm + 22, 42], [xm, 50]], 'fo') + (v == null ? '' : K.l(40, 96, x, 96, 'la gr') + K.t(40, 22, `${v} h`, 'b', 'start')) + carro(K, x, 88, f >= 1 && v !== t.r ? 'ff' : 'fA'); },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Se pasó de la bandera.' : 'No alcanzó a llegar.'), cuenta: t => `$${t.c} = ${t.r}$ h`, pie: 'Estira las horas y suelta.',
  });

  // ------------------------------------------------------------------------------------------------ pu-pr-4 · porcentajes
  const regla = (K, L, p, q, cls) => K.r(25, 52, L, 40, 'fc') + K.r(25, 52, p / 100 * L, 40, cls || 'fa') + Array.from({ length: 11 }, (_, k) => K.l(25 + k * L / 10, 92, 25 + k * L / 10, k % 5 ? 97 : 102, 'lm')).join('');
  XG.figura('parte-barra', {
    ini: () => ({ q: 0 }), manijas: p => [lado('q', 0, p.total, p.paso, 25, 290 / p.total, 72)],
    ok: (v, p) => v.q * 100 === p.pct * p.total, sol: p => ({ q: p.pct * p.total / 100 }), texto: p => `$${p.pct / 100} \\cdot ${p.total} = ${p.pct * p.total / 100}$`, alto: () => 138, pie: 'Arrastra el borde de la parte.',
    dib: (v, K, p, f) => regla(K, 290, v.q / p.total * 100) + K.t(25, 40, '0', 's tm') + K.t(315, 40, p.total, 's tm') + (v.q > p.total * 0.08 && v.q < p.total * 0.9 ? K.t(25 + v.q / p.total * 290, 40, N(v.q), 'tg') : K.t(170, 22, N(v.q), 'tg')) + K.t(25, 120, '0 %', 's tm') + K.t(308, 120, '100 %', 's tm') + K.f(f, K.l(25 + p.pct * 2.9, 46, 25 + p.pct * 2.9, 104, 'lo gr') + K.t(25 + p.pct * 2.9, 122, `${p.pct} %`, 'to')),
    lee: (v, p) => `$\\tfrac{${R(v.q)}}{${p.total}} ${eq(v.q / p.total * 100)} ${N(R(v.q) / p.total * 100)}\\,\\%$`, aviso: (v, p) => (v.q === p.pct ? `${p.pct} es el porcentaje, no la cantidad.` : v.q * 100 > p.pct * p.total ? `Es más del ${p.pct} %.` : `Es menos del ${p.pct} %.`), bien: (v, p) => `El 10 % son ${N(p.total / 10)}: se arma con esas piezas.`,
  });
  XG.figura('porcentaje-barra', {
    ini: () => ({ p: 0 }), manijas: () => [lado('p', 0, 100, 5, 25, 2.9, 72)],
    ok: (v, p) => v.p * p.total === 100 * p.parte, sol: p => ({ p: 100 * p.parte / p.total }), texto: p => `$\\tfrac{${p.parte}}{${p.total}} \\cdot 100 = ${100 * p.parte / p.total}\\,\\%$`, alto: () => 138, pie: 'Arrastra hasta el porcentaje.',
    dib: (v, K, p, f) => regla(K, 290, v.p) + K.t(170, 22, `${p.parte} de ${p.total}`, 'tg') + K.t(25, 120, '0 %', 's tm') + K.t(308, 120, '100 %', 's tm') + (v.p > 10 && v.p < 86 ? K.t(25 + v.p * 2.9, 120, `${N(v.p)} %`, 'ta') : K.t(170, 120, `${N(v.p)} %`, 'ta')) + K.f(f, K.l(25 + p.parte / p.total * 290, 44, 25 + p.parte / p.total * 290, 100, 'lo gr') + K.t(25 + p.parte / p.total * 290, 40, p.parte, 'to')),
    lee: (v, p) => `$${N(v.p)}\\,\\% \\text{ de } ${p.total} = ${N(v.p * p.total / 100)}$`, aviso: (v, p) => (v.p === p.parte ? `${p.parte} es la cantidad; compárala con el total.` : v.p === 100 - 100 * p.parte / p.total ? 'Ese es el porcentaje de los que faltan.' : v.p * p.total > 100 * p.parte ? 'Ese porcentaje es más que la parte.' : 'Ese porcentaje es menos que la parte.'), bien: () => 'La parte arriba, el total abajo, por 100.',
  });
  XG.figura('total-barra', {
    ini: p => ({ T: p.max - 20 }), manijas: p => [lado('T', p.min, p.max, 5, 25, 290 / p.max, 72)],
    ok: (v, p) => v.T * p.pct === 100 * p.parte, sol: p => ({ T: 100 * p.parte / p.pct }), texto: p => `$${p.parte} \\div ${p.pct / 100} = ${100 * p.parte / p.pct}$`, alto: () => 138, pie: 'Arrastra el final de la barra: es el total.',
    dib(v, K, p, f) { const u = 290 / p.max, L = v.T * u; return K.r(25, 52, L, 40, 'fc') + K.r(25, 52, p.parte * u, 40, 'fg') + K.t(25 + p.parte * u / 2, 77, p.parte, 'tg') + K.t(25 + L, 40, N(v.T), 'ta') + K.f(f, K.l(25 + L * p.pct / 100, 46, 25 + L * p.pct / 100, 104, 'lo gr') + K.t(25 + L * p.pct / 100, 122, `${p.pct} % del tuyo`, 's to')); },
    lee: (v, p) => `$${p.pct}\\,\\% \\text{ de } ${N(v.T)} = ${N(v.T * p.pct / 100)}$`, aviso: (v, p) => (Math.abs(v.T - p.parte * p.pct / 100) < 2.6 ? `Le sacaste el ${p.pct} % a la parte, y ella ya es ese ${p.pct} %.` : v.T < p.parte ? 'El total no puede ser menor que la parte.' : Math.abs(v.T - p.parte * (1 + (100 - p.pct) / 100)) < 2.6 ? 'Le sumaste el porcentaje que falta a la parte; ese porcentaje es del total.' : v.T * p.pct > 100 * p.parte ? 'Ese total es muy grande.' : 'Ese total es muy chico.'), bien: (v, p) => `El ${p.pct} % de ${v.T} es ${p.parte}.`,
  });

  // Piezas de un total: se tocan las que arman un porcentaje.  params { total, pct, piezas }
  const armaP = (on, p) => p.piezas.reduce((s, x, i) => s + (on[i] ? x : 0), 0);
  const solP = p => { const n = p.piezas.length; for (let m = 1; m < 2 ** n; m++) { const on = p.piezas.map((_, i) => !!(m >> i & 1)); if (armaP(on, p) * 100 === p.pct * p.total) return on.map((x, i) => (x ? i : -1)).filter(i => i >= 0); } return null; };
  XG.marca('piezas-diez', {
    sitios: p => p.piezas.map((_, i) => ({ x: 50 + (i % 4) * 80, y: 78 + Math.floor(i / 4) * 54, w: 70, h: 44 })), cara: (K, p, i) => K.t(50 + (i % 4) * 80, 84 + Math.floor(i / 4) * 54, p.piezas[i], 'b'),
    fondo: (K, p) => K.r(25, 22, 290, 16, 'fc') + K.t(170, 16, `total: ${p.total}`, 's tm'), alto: () => 160, vale: (on, p) => armaP(on, p) * 100 === p.pct * p.total, sol: solP,
    aviso: (on, p) => (armaP(on, p) === p.pct ? `Juntan ${p.pct}, pero se pide el ${p.pct} % de ${p.total}.` : `Juntan ${armaP(on, p)}: ${armaP(on, p) * 100 > p.pct * p.total ? 'se pasa' : 'no alcanza'}. El 10 % son ${p.total / 10}.`),
    bien: p => `Juntan ${p.pct * p.total / 100}.`, texto: p => `${solP(p).map(i => p.piezas[i]).join(' + ')} $= ${p.pct * p.total / 100}$`, pie: 'Toca las piezas que lo arman.',
  });

  const metasD = p => { const a = p.total * p.p1 / 100, b = a * p.p2 / 100; return [N(a), N(b), `${N(b * 100 / p.total)} %`]; };
  XG.rotula('parte-de-la-parte', {
    slots: () => [0, 1, 2].map(i => ({ x: 62 + i * 108, y: 96, w: 96, h: 38 })), fichas: p => p.fichas, metas: metasD, texto: p => metasD(p).join(', '), alto: () => 142,
    fondo: (K, p, f) => K.r(25, 18, 290, 34, 'fc') + K.f(f, K.r(25, 18, 290 * p.p1 / 100, 34, 'fa') + K.r(25, 18, 290 * p.p1 * p.p2 / 10000, 34, 'fg')) + K.t(318, 66, `${p.total}`, 's tm', 'end') + p.et.map((t, i) => K.t(62 + i * 108, 134, t, 's tm')).join(''),
    aviso(q, p) { const m = metasD(p); return q[1][0] === N(p.total * p.p2 / 100) ? `El ${p.p2} % se toma de los ${m[0]}, no del total.` : q[2][0] === `${p.p1 + p.p2} %` ? 'Esos porcentajes no se suman: tienen totales distintos.' : 'Cada porcentaje se toma de su propio grupo.'; }, bien: () => 'El segundo porcentaje se toma de la primera parte.',
  });

  XG.marca('compara-porciento', {
    sitios: p => p.grupos.map((_, i) => ({ x: 90 + (i % 2) * 160, y: 34 + Math.floor(i / 2) * 60, w: 148, h: 50 })), cara: (K, p, i) => K.t(90 + (i % 2) * 160, 40 + Math.floor(i / 2) * 60, `${p.grupos[i][0]} de ${p.grupos[i][1]}`), alto: () => 190,
    sol: p => p.grupos.map((_, i) => i).filter(i => p.grupos[i][0] * 100 > p.mas * p.grupos[i][1]),
    aviso: (on, p) => (on.some((x, i) => x && p.grupos[i][0] * 100 <= p.mas * p.grupos[i][1]) ? `Uno de esos no pasa del ${p.mas} %: más gente no es más porcentaje.` : `Falta un grupo que pasa del ${p.mas} %.`),
    bien: p => p.grupos.filter(g => g[0] * 100 > p.mas * g[1]).map(g => `${g[0]} de ${g[1]} es ${N(g[0] / g[1] * 100)} %`).join('; ') + '.', texto: p => p.grupos.filter(g => g[0] * 100 > p.mas * g[1]).map(g => `${g[0]} de ${g[1]}`).join(', '), pie: 'Toca todos los grupos que pasan.',
  });

  // Se agrega agua hasta que el jugo sea el pct % de la mezcla.  v { w }
  XG.figura('mezcla-agua', {
    ini: () => ({ w: 0 }), manijas: p => [{ k: 'w', min: 0, max: p.max, paso: 10, en: v => [170, 168 - (p.jugo + v.w) * 140 / (p.jugo + p.max)], de: (x, y) => (168 - y) * (p.jugo + p.max) / 140 - p.jugo }],
    ok: (v, p) => p.jugo * 100 === p.pct * (p.jugo + v.w), sol: p => ({ w: p.jugo * 100 / p.pct - p.jugo }), texto: p => `mezcla $${p.jugo} \\div ${p.pct / 100} = ${p.jugo * 100 / p.pct}$; agua $${p.jugo * 100 / p.pct} - ${p.jugo} = ${p.jugo * 100 / p.pct - p.jugo}$`, alto: () => 188, pie: 'Arrastra el nivel de arriba para echar agua.',
    dib(v, K, p, f) { const u = 140 / (p.jugo + p.max); return K.r(120, 168 - p.jugo * u, 100, p.jugo * u, 'fg', 0) + K.r(120, 168 - (p.jugo + v.w) * u, 100, v.w * u, 'fa', 0) + K.r(120, 20, 100, 148, 'fn', 4) + K.t(110, 172 - p.jugo * u / 2, `jugo: ${p.jugo}`, 'tg', 'end') + (v.w > 12 ? K.t(230, 172 - (p.jugo + v.w / 2) * u, `agua: ${N(v.w)}`, 'ta', 'start') : '') + K.f(f, K.t(8, 22, `${N(p.jugo * 100 / (p.jugo + v.w))} %`, 'b tg', 'start')); },
    lee: (v, p) => `$\\tfrac{${p.jugo}}{${p.jugo + R(v.w)}} ${eq(p.jugo * 100 / (p.jugo + R(v.w)))} ${N(p.jugo * 100 / (p.jugo + R(v.w)))}\\,\\%$`, aviso: (v, p) => (v.w === p.jugo * 100 / p.pct ? 'Ese es el total de la mezcla: el jugo también cuenta.' : p.jugo * 100 > p.pct * (p.jugo + v.w) ? 'Quedó muy concentrado: falta agua.' : 'Quedó muy aguado.'), bien: (v, p) => `${p.jugo} de ${p.jugo + v.w} es el ${p.pct} %.`,
  });

  // --------------------------------------------------------------------------------- pu-pr-5 · aumentos, descuentos e IVA
  const bar = (K, y, x, u, cls, tcls, et, dentro = true) => K.t(20, y - 6, et, 's tm', 'start') + K.r(20, y, x * u, 30, cls) + (dentro && x * u > 46 ? K.t(20 + x * u / 2, y + 20, N(x), tcls) : K.t(20 + x * u + 18, y + 20, N(x), tcls, 'start'));
  const fac = c => 1 + c / 100, dice = c => `${c < 0 ? 'baja' : 'sube'} ${Math.abs(c)} %`;
  XG.figura('precio-nuevo', {
    ini: p => ({ b: p.a }), manijas: p => [lado('b', p.paso, p.max, p.paso, 20, 290 / p.max, 111)],
    ok: (v, p) => Math.abs(v.b - p.a * fac(p.c)) < 1e-6, sol: p => ({ b: p.a * fac(p.c) }), texto: p => `$${p.a} \\cdot ${N(fac(p.c))} = ${N(p.a * fac(p.c))}$`, alto: () => 140, pie: 'Arrastra el final de la barra.',
    dib: (v, K, p, f) => bar(K, 30, p.a, 290 / p.max, 'fg', 'tg', 'antes') + bar(K, 96, v.b, 290 / p.max, 'fa', 'ta', dice(p.c)) + K.f(f, K.l(20 + p.a * fac(p.c) * 290 / p.max, 88, 20 + p.a * fac(p.c) * 290 / p.max, 134, 'lo gr')),
    lee: (v, p) => `$${N(v.b)} \\div ${p.a} = ${N(v.b / p.a)} \\qquad \\text{factor: } ${N(fac(p.c))}$`, aviso: (v, p) => (v.b === p.a + p.c ? `Sumaste ${Math.abs(p.c)}, pero el ${Math.abs(p.c)} % de ${p.a} es ${N(p.a * Math.abs(p.c) / 100)}.` : v.b === p.a * Math.abs(p.c) / 100 ? 'Ese es solo el cambio.' : v.b > p.a * fac(p.c) ? 'Quedó muy caro.' : 'Quedó muy barato.'), bien: (v, p) => `Es multiplicar por ${N(fac(p.c))}.`,
  });
  XG.rotula('factor-cada', {
    slots: p => p.cambios.map((_, i) => ({ x: 270, y: 32 + i * 52, w: 88, h: 38 })), fichas: p => p.fichas, metas: p => p.cambios.map(c => `× ${N(fac(c))}`), texto: p => p.cambios.map(c => `${dice(c)}: $${N(fac(c))}$`).join(', '), alto: p => p.cambios.length * 52 + 10,
    fondo: (K, p, f) => p.cambios.map((c, i) => K.t(20, 37 + i * 52, dice(c), '', 'start') + K.r(118, 22 + i * 52, 50, 20, 'fc') + K.f(f, K.r(118, 22 + i * 52, 50 * fac(c), 20, 'fa'))).join(''),
    aviso: (q, p) => (p.cambios.some((c, i) => q[i][0] === `× ${N(Math.abs(c) / 100)}`) ? 'Ese número es solo el cambio: falta lo que ya había, el 1.' : 'El factor es 1 más o menos el porcentaje entre 100.'), bien: () => '1 más lo que sube, o 1 menos lo que baja.',
  });
  const dos = p => p.a * fac(p.c[0]) * fac(p.c[1]);
  XG.figura('dos-cambios', {
    ini: p => ({ b: p.a }), manijas: p => [lado('b', p.paso, p.max, p.paso, 20, 290 / p.max, 111)], ok: (v, p) => Math.abs(v.b - dos(p)) < 1e-6, sol: p => ({ b: dos(p) }),
    texto: p => `$${p.a} \\cdot ${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(dos(p))}$`, alto: () => 208, ms: 1900, pie: 'Arrastra el final de la segunda barra.',
    dib(v, K, p, f) { const u = 290 / p.max, m = p.a * fac(p.c[0]); return bar(K, 30, p.a, u, 'fg', 'tg', 'al comienzo') + bar(K, 96, v.b, u, 'fa', 'ta', `${dice(p.c[0])} y luego ${dice(p.c[1])}`) + K.f(f * 2, bar(K, 164, f < 0.5 ? p.a + (m - p.a) * f * 2 : m + (dos(p) - m) * (f * 2 - 1), u, 'ff', 'tf', f < 0.5 ? dice(p.c[0]) : dice(p.c[1]))); },
    lee: (v, p) => `$${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(fac(p.c[0]) * fac(p.c[1]))}$`, aviso: (v, p) => (v.b === p.a * (1 + (p.c[0] + p.c[1]) / 100) ? 'Sumaste los porcentajes; el segundo se toma del valor nuevo.' : v.b > dos(p) ? 'Queda en menos.' : 'Queda en más.'), bien: () => 'El segundo cambio se toma del valor nuevo.',
  });
  const unico = p => R((fac(p.c[0]) * fac(p.c[1]) - 1) * 100);
  XG.figura('cambio-unico', {
    ini: () => ({ x: 0 }), manijas: () => [{ k: 'x', min: -60, max: 60, paso: 5, et: 'un solo cambio (%)' }], ok: (v, p) => v.x === unico(p), sol: p => ({ x: unico(p) }),
    texto: p => `$${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(1 + unico(p) / 100)}$: ${dice(unico(p))}`, alto: () => 208, pie: 'Mueve la perilla: a la izquierda baja, a la derecha sube.',
    dib(v, K, p, f) { const u = 1.8; return bar(K, 24, 100, u, 'fg', 'tg', 'al comienzo') + (f ? bar(K, 84, 100 * (1 + v.x / 100 * f), u, 'fa', 'ta', `tu cambio: ${dice(R(v.x))}`) + K.f(f, K.l(20 + (100 + unico(p)) * u, 16, 20 + (100 + unico(p)) * u, 122, 'lo gr')) : K.r(20, 84, 180, 30, 'fc') + K.t(110, 104, '?', 'tm')); },
    lee: (v, p) => `$${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(1 + unico(p) / 100)} \\qquad \\text{tu factor: } ${N(1 + v.x / 100)}$`, aviso: (v, p) => (v.x === p.c[0] + p.c[1] ? 'Los porcentajes no se suman: se multiplican los factores.' : v.x > unico(p) ? 'Queda más abajo.' : 'Queda más arriba.'), bien: () => 'Un solo factor: el producto de los dos.',
  });
  const atras = (nombre, d) => XG.figura(nombre, {
    ini: p => ({ a: p.min }), manijas: p => [lado('a', p.min, p.max, p.paso, 20, 285 / p.max, 45)], ok: (v, p) => Math.abs(v.a * fac(p.c) - p.q) < 1e-6, sol: p => ({ a: R(p.q / fac(p.c) * 100) / 100 }), texto: p => `$${p.q} \\div ${N(fac(p.c))} = ${N(p.q / fac(p.c))}$`, alto: () => 196, pie: 'Arrastra la barra de arriba.',
    dib: (v, K, p, f) => bar(K, 30, v.a, 285 / p.max, 'fa', 'ta', d.antes) + bar(K, 96, p.q, 285 / p.max, 'fg', 'tg', d.despues(p)) + K.f(f, bar(K, 156, v.a * fac(p.c) * Math.max(0.02, f), 285 / p.max, 'ff', 'tf', `el tuyo, ${dice(p.c)}`) + K.l(20 + p.q * 285 / p.max, 90, 20 + p.q * 285 / p.max, 192, 'lo d')),
    lee: (v, p) => `$${N(v.a)} \\cdot ${N(fac(p.c))} = ${N(v.a * fac(p.c))}$`, aviso: (v, p) => (Math.abs(v.a - p.q * (1 - p.c / 100)) <= p.paso / 2 ? d.error : v.a * fac(p.c) > p.q ? 'Antes valía menos.' : 'Antes valía más.'), bien: (v, p) => `Para devolverse se divide entre ${N(fac(p.c))}.`,
  });
  atras('vuelta-atras', { antes: 'antes', despues: p => `quedó, después de bajar ${-p.c} %`, error: 'Le subiste el mismo porcentaje; ese porcentaje era del precio de antes.' });
  atras('sin-iva', { antes: 'sin IVA', despues: p => `con IVA del ${p.c} %`, error: 'Le quitaste el mismo porcentaje; el IVA se calculó sobre el precio sin IVA.' });

  const acaba = c => c.reduce((x, k) => x * fac(k), 100);
  XG.marca('mismo-final', {
    sitios: p => p.caminos.map((_, i) => ({ x: 170, y: 26 + i * 46, w: 300, h: 40 })), cara: (K, p, i) => K.t(170, 31 + i * 46, p.caminos[i].map(dice).join(' y luego ')), alto: p => p.caminos.length * 46 + 6,
    sol: p => p.caminos.map((_, i) => i).filter(i => Math.abs(acaba(p.caminos[i]) - p.meta) < 1e-6),
    aviso: (on, p) => (on.some((x, i) => x && Math.abs(acaba(p.caminos[i]) - p.meta) > 1e-6) ? 'Uno de esos no termina ahí: multiplica los factores.' : 'Falta un camino que termina en el mismo precio.'),
    bien: p => `Esos terminan en ${p.meta}.`, texto: p => p.caminos.filter(c => Math.abs(acaba(c) - p.meta) < 1e-6).map(c => c.map(dice).join(' y luego ')).join('; '), pie: 'Toca todos los que terminan ahí.',
  });
})();
