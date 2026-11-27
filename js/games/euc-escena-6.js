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
