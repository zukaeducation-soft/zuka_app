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
