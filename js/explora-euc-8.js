// Geometría Euclidiana · mundo 8 «euc-construcciones»: explicaciones Explora (spec 2026-11-26-curso-euclidiana), escenas «dibujo» y «fichas».
// Regla y compás dibujados con las piezas XPK. Los ejemplos no son los de los ejercicios.
{
  const R1 = x => Math.round(x * 10) / 10, cerca = x => Math.floor(x + 0.5);
  const hacia = (C, P) => Math.atan2(C[1] - P[1], P[0] - C[0]) * 180 / Math.PI;
  // Cruce de dos circunferencias (el de un lado u otro de la línea de centros).
  const corte = (C1, r1, C2, r2, lado = 1) => { const d = Math.hypot(C2[0] - C1[0], C2[1] - C1[1]), a = (d * d + r1 * r1 - r2 * r2) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a)), ux = (C2[0] - C1[0]) / d, uy = (C2[1] - C1[1]) / d; return [C1[0] + a * ux - lado * h * uy, C1[1] + a * uy + lado * h * ux]; };
  const pt = (K, P, n, dx = 11, dy = -7, cls = 'fk') => K.c(...P, 4, cls) + K.t(P[0] + dx, P[1] + dy, n, 's');
  // Compás con la punta fija en (x, y) y la que dibuja a `ab` píxeles a la derecha.
  const compas = (K, x, y, ab, pata = 140) => { const hx = x + ab / 2, hy = y - Math.sqrt(Math.max(0, pata * pata - ab * ab / 4)); return K.l(x, y, hx, hy, 'lm gr') + K.l(hx, hy, x + ab, y, 'lm gr') + K.c(hx, hy, 5, 'fk'); };

  // ------------------------------------------------------------------------------------------ lección 1 · instrumentos
  const inst = (v, K) => {
    const cy = 95 + 80 * v.pos, cx = 40;
    return K.f(v.reg, K.r(30, 99, 150, 16, 'fc', 2)) + K.l(40, 95, 160, 95, 'gr') + pt(K, [40, 95], 'A', -12, -8) + pt(K, [160, 95], 'B', 12, -8) + K.l(20, 175, 320, 175) + pt(K, [40, 175], 'C', -12, 16)
      + K.arc(40, 95, 120, 0, -v.gi, 'la') + K.f(v.comp, compas(K, cx, cy, 120, 85))
      + K.f(v.mk, K.arc(40, 175, 120, 14, -14, 'la') + pt(K, [160, 175], 'E', 4, 17, 'fo'));
  };
  const lleva = (v, K) => K.l(40, 50, 208, 50, 'gr') + pt(K, [40, 50], 'A', -12, 5) + pt(K, [208, 50], 'B', 12, 5) + K.t(124, 40, '7', 'tm') + K.l(20, 160, 320, 160) + pt(K, [40, 160], 'C', -12, 16)
    + K.arc(40, 160, v.r * 24, 12, -12, 'la') + compas(K, 40, 160, v.r * 24) + K.t(40 + v.r * 12, 180, `CE = ${v.r}`, 's ta');

  // Mediatriz de AB = 12 (10 px por unidad), con arcos de radio r.
  const med = (v, K) => {
    const A = [110, 105], B = [230, 105], h = v.r > 6 ? Math.sqrt(v.r * v.r - 36) * 10 : 0, M = [170, 105 - h], Nn = [170, 105 + h], ver = h > 0 && v.ar > 0.9;
    return (v.meta ? [-1, 1].map(s => K.l(164, 105 + s * v.meta * 10 - 6, 176, 105 + s * v.meta * 10 + 6, 'lf') + K.l(164, 105 + s * v.meta * 10 + 6, 176, 105 + s * v.meta * 10 - 6, 'lf')).join('') : '')
      + K.arc(A[0], A[1], v.r * 10, 65 * v.ar, -65 * v.ar, 'lg') + K.arc(B[0], B[1], v.r * 10, 180 - 65 * v.ar, 180 + 65 * v.ar, 'lg')
      + (ver ? K.f(v.tri, K.pl([A, M, B, Nn, A], 'lf')) + K.f(v.ln, K.l(170, Math.max(8, M[1] - 14), 170, Math.min(202, Nn[1] + 14), 'la gr')) + K.c(...M, 4, 'fo') + K.c(...Nn, 4, 'fo') + K.t(186, M[1] + 12, 'M', 's') + K.t(186, Nn[1] - 4, 'N', 's') : '')
      + K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5);
  };
  const MED = { r: 4, ar: 0, ln: 0, tri: 0, meta: 0 };

  // Bisectriz (cual 0) y perpendicular por un punto exterior (cual 1).
  const bis = (v, K) => {
    if (cerca(v.cual) === 0) {
      const B = [50, 172], D = [140, 172], E = K.at(...B, 90, 64), c = [corte(D, 80, E, 80, 1), corte(D, 80, E, 80, -1)], F = Math.hypot(c[0][0] - B[0], c[0][1] - B[1]) > Math.hypot(c[1][0] - B[0], c[1][1] - B[1]) ? c[0] : c[1];
      return K.f(v.s4, K.p([B, D, F], 'fa') + K.p([B, F, E], 'fg')) + K.l(...B, 300, 172, 'gr') + K.l(...B, ...K.at(...B, 172, 64), 'gr') + K.t(40, 190, 'B', 's')
        + K.arc(B[0], B[1], 90, -8, -8 + 80 * v.s1, 'lm') + K.f(v.s1 * 3 - 2, K.c(...D, 4, 'fk') + K.t(D[0], D[1] + 17, 'D', 's') + K.c(...E, 4, 'fk') + K.t(E[0] - 12, E[1] - 4, 'E', 's'))
        + K.arc(D[0], D[1], 80, hacia(D, F) - 18 * v.s2, hacia(D, F) + 18 * v.s2, 'lf') + K.arc(E[0], E[1], 80, hacia(E, F) - 18 * v.s2, hacia(E, F) + 18 * v.s2, 'lf') + K.f(v.s2 * 3 - 2, K.c(...F, 4, 'fo') + K.t(F[0] + 12, F[1] + 16, 'F', 's'))
        + K.l(...B, B[0] + (F[0] - B[0]) * 1.45 * v.s3, B[1] + (F[1] - B[1]) * 1.45 * v.s3, 'la gr');
    }
    const P = [170, 40], R = [170 - Math.sqrt(4000), 130], S = [170 + Math.sqrt(4000), 130], M = [170, 130 + Math.sqrt(2400)];
    return K.l(20, 130, 320, 130, 'gr') + pt(K, P, 'P', 12, -2) + K.arc(P[0], P[1], 110, 270 - 44 * v.s1, 270 + 44 * v.s1, 'lm') + K.f(v.s1 * 3 - 2, K.c(...R, 4, 'fk') + K.t(R[0] - 6, R[1] - 9, 'R', 's') + K.c(...S, 4, 'fk') + K.t(S[0] + 6, S[1] - 9, 'S', 's'))
      + K.arc(R[0], R[1], 80, hacia(R, M) - 18 * v.s2, hacia(R, M) + 18 * v.s2, 'lf') + K.arc(S[0], S[1], 80, hacia(S, M) - 18 * v.s2, hacia(S, M) + 18 * v.s2, 'lf') + K.f(v.s2 * 3 - 2, K.c(...M, 4, 'fo') + K.t(M[0] + 13, M[1] + 5, 'M', 's'))
      + K.l(...P, P[0], P[1] + (M[1] + 12 - P[1]) * v.s3, 'la gr');
  };
  const parte = (v, K) => { const V = [60, 172], a = Math.round(v.a), D = K.at(...V, 190, 0), U = K.at(...V, 165, 70), R = K.at(...V, 150, v.a); return K.ang(V, D, R, 52, `${a}°`, 'fa', 'ta') + K.ang(V, R, U, 40, `${70 - a}°`, 'fg', 'tg') + K.l(...V, ...D, 'gr') + K.l(...V, ...U, 'gr') + K.l(...V, ...R, 'la'); };

  // Copiar un ángulo para trazar una paralela (cual 0) y repartir un segmento (cual 1).
  const cop = (v, K) => {
    if (cerca(v.cual) === 0) {
      const Q = [90, 160], P = [190, 60];
      return K.l(20, 160, 320, 160, 'gr') + K.t(312, 178, 'm', 's') + K.l(60, 190, 230, 20) + pt(K, Q, 'Q', -4, 18) + pt(K, P, 'P', -12, -4)
        + K.f(v.s1, K.ang(Q, [190, 160], P, 40, '', 'fa') + K.l(...K.at(...Q, 40, 0), ...K.at(...Q, 40, 45), 'lm d'))
        + K.f(v.s2, K.ang(P, [290, 60], K.at(...P, 60, 45), 40, '', 'fa') + K.l(...K.at(...P, 40, 0), ...K.at(...P, 40, 45), 'lm d'))
        + K.l(190 - 150 * v.s3, 60, 190 + 130 * v.s3, 60, 'la gr');
    }
    const A = [40, 160], B = [280, 160], m = j => K.at(...A, 56 * j, 35);
    let h = K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5) + K.f(v.t1, K.l(...A, ...m(3.5), 'lm') + [1, 2, 3].map(j => K.c(...m(j), 4, 'fA') + K.t(m(j)[0] - 9, m(j)[1] - 8, j, 's ta')).join(''));
    h += K.f(v.t2, K.l(...m(3), ...B, 'lg'));
    for (const j of [1, 2]) { const q = m(j), pie = [40 + 80 * j, 160]; h += K.l(...q, q[0] + (pie[0] - q[0]) * v.t3, q[1] + (pie[1] - q[1]) * v.t3, 'lg d') + K.f(v.t3 * 3 - 2, K.c(...pie, 4, 'fo')); }
    return h;
  };
  const COP = { cual: 0, s1: 0, s2: 0, s3: 0, t1: 0, t2: 0, t3: 0 };
  const div = (v, K) => {
    const A = [40, 160], B = [292, 160], m = j => K.at(...A, 56 * j, 35), Xp = [40 + v.x * 28, 160];
    return K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5) + K.t(166, 190, 'AB = 9', 'tm') + K.l(...A, ...m(3.5), 'lm') + [1, 2, 3].map(j => K.c(...m(j), 4, j === 2 ? 'fA' : 'fk') + K.t(m(j)[0] - 9, m(j)[1] - 8, j, j === 2 ? 's ta' : 's tm')).join('')
      + K.l(...m(3), ...B, 'lg') + K.l(...m(2), ...Xp, 'la');
  };
  // Un pozo sobre la carretera, a igual distancia de dos fincas (20 px por unidad).
  const pozo = (v, K) => {
    const A = [80, 70], B = [240, 110], P = [40 + v.x * 20, 170], da = Math.hypot(v.x - 2, 5), db = Math.hypot(v.x - 10, 3);
    return K.l(10, 170, 330, 170, 'gr') + K.t(318, 190, 'carretera', 's tm', 'end') + K.l(...A, ...P, 'lg') + K.l(...B, ...P, 'lf') + pt(K, A, 'A', -12, -6) + pt(K, B, 'B', 12, -6)
      + K.t((A[0] + P[0]) / 2 - 10, (A[1] + P[1]) / 2, R1(da), 's tg', 'end') + K.t((B[0] + P[0]) / 2 + 10, (B[1] + P[1]) / 2, R1(db), 's tf', 'start');
  };

  xpLec('euc-construcciones-1', [
    ['Regla y compás',
      xpMira('dibujo', 'Empecemos por las herramientas: una **regla sin marcas** y un **compás**. Nada más.', { dib: inst, v: { reg: 0, comp: 0, gi: 0, pos: 0, mk: 0 }, alto: 200 }, [
        ['La regla de las construcciones no tiene marcas: no mide, solo une dos puntos con una recta.', { reg: 1 }],
        ['El compás tiene una punta fija y otra que dibuja. Su abertura es la distancia entre ellas.', { reg: 0, comp: 1 }],
        ['Al girarlo, todos los puntos del arco quedan a la misma distancia del centro.', { gi: 35 }],
        ['Por eso el compás lleva distancias: abierto de A a B, pasa a otra recta sin cambiar la abertura.', { gi: 0, pos: 1 }],
        ['Con centro en C, el arco marca E. El segmento CE mide lo mismo que AB, sin haber medido.', { mk: 1 }, '$CE = AB$'],
      ], 'La regla une puntos; el compás traza arcos y lleva distancias. Con eso basta para construir.'),
      xpHaz('dibujo', 'El compás está apoyado en C. Ábrelo hasta que CE mida lo mismo que AB, que mide 7.', { dib: lleva, v: { r: 3 }, metas: { r: 7 }, alto: 200,
        manijas: [{ k: 'r', min: 2, max: 11, paso: 1, en: v => [40 + v.r * 24, 160], de: x => (x - 40) / 24 }],
        lee: v => `$CE = ${v.r}$`, dice: v => `El compás está abierto ${v.r} y AB mide 7.` }, 'Con la abertura de AB, el arco deja E a la misma distancia: $CE = AB = 7$.')],
    ['La mediatriz',
      xpMira('dibujo', 'Primera construcción: la **mediatriz** de un segmento, sin medirlo.', { dib: med, v: { ...MED }, alto: 210 }, [
        ['Queremos la mediatriz de AB: la perpendicular que pasa por su punto medio.', {}],
        ['AB mide 12. Con radio 4, los arcos trazados desde A y desde B ni se tocan.', { ar: 1 }, '$4 < 6$'],
        ['Con un radio mayor que la mitad de AB se cortan en dos puntos: M y N.', { r: 10 }, '$10 > 6$'],
        ['M está a 10 de A y a 10 de B, porque el radio es el mismo. Con N pasa igual.', { tri: 1 }, '$AM = BM \\qquad AN = BN$'],
        ['Los triángulos AMN y BMN tienen sus tres lados iguales: son congruentes por L-L-L.', {}],
        ['Por eso la recta MN corta a AB justo en la mitad y en ángulo recto: es la mediatriz.', { ln: 1 }],
      ], 'Dos arcos de igual radio, mayor que la mitad, se cortan en puntos que equidistan de A y B: su recta es la mediatriz.'),
      xpHaz('dibujo', 'AB mide 12. Abre el compás hasta que los dos arcos se corten en las marcas, a 8 del segmento.', { dib: med, v: { ...MED, r: 7, ar: 1, meta: 8 }, metas: { r: 10 }, alto: 210,
        manijas: [{ k: 'r', min: 3, max: 11, paso: 1, en: v => [110 + v.r * 10, 105], de: x => (x - 110) / 10 }],
        lee: v => (v.r > 6 ? `$\\sqrt{${v.r}^2 - 6^2} ${Number.isInteger(Math.sqrt(v.r * v.r - 36)) ? '=' : '\\approx'} ${R1(Math.sqrt(v.r * v.r - 36))}$` : `$${v.r} \\le 6$`),
        dice: v => (v.r > 6 ? `Con radio ${v.r} los arcos se cortan a ${R1(Math.sqrt(v.r * v.r - 36))} del segmento.` : `Con radio ${v.r} los arcos no se cortan en dos puntos.`) }, 'El radio es la hipotenusa de catetos 6 y 8: $\\sqrt{6^2 + 8^2} = 10$.')],
    ['Bisectriz y perpendicular',
      xpMira('dibujo', 'La misma idea sirve para partir un **ángulo** y para trazar una **perpendicular**.', { dib: bis, v: { cual: 0, s1: 0, s2: 0, s3: 0, s4: 0 }, alto: 200 }, [
        ['Para partir un ángulo en dos iguales, un arco con centro en el vértice B marca D y E.', { s1: 1 }, '$BD = BE$'],
        ['Desde D y desde E se trazan dos arcos con un mismo radio. Se cortan en F.', { s2: 1 }, '$DF = EF$'],
        ['Los triángulos BDF y BEF tienen tres pares de lados iguales: son congruentes por L-L-L.', { s4: 1 }],
        ['Entonces los dos ángulos en B son congruentes: el rayo BF es la bisectriz.', { s3: 1 }],
        ['Para bajar una perpendicular desde P, un arco con centro en P corta a la recta en R y S.', { cual: 1, s1: 1, s2: 0, s3: 0, s4: 0 }],
        ['Arcos iguales desde R y S se cortan en M. P y M equidistan de R y S: PM es la mediatriz.', { s2: 1, s3: 1 }],
      ], 'Bisectriz y perpendicular salen igual: puntos que equidistan y triángulos congruentes por L-L-L.'),
      xpHaz('dibujo', 'El ángulo mide 70°. Gira el rayo hasta que lo parta en dos ángulos congruentes.', { dib: parte, v: { a: 15 }, metas: { a: 35 }, alto: 200,
        manijas: [{ k: 'a', min: 5, max: 65, paso: 5, en: v => XPK.at(60, 172, 150, v.a), de: (x, y) => Math.atan2(172 - y, x - 60) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ${70 - v.a}^\\circ = 70^\\circ$`, dice: v => `Un lado quedó con ${v.a}° y el otro con ${70 - v.a}°.` }, 'La bisectriz deja dos ángulos congruentes: $70^\\circ \\div 2 = 35^\\circ$.')],
    ['Paralelas y partes iguales',
      xpMira('dibujo', 'Con el compás también se **copia un ángulo**, y con eso salen paralelas y partes iguales.', { dib: cop, v: { ...COP }, alto: 200 }, [
        ['Para copiar un ángulo, un arco con centro en su vértice Q corta los dos lados.', { s1: 1 }],
        ['El mismo arco se traza en P, y con el compás se lleva la abertura entre los dos cortes.', { s2: 1 }],
        ['Los ángulos en Q y en P son correspondientes y congruentes: la recta por P es paralela a m.', { s3: 1 }],
        ['Para partir AB en tres, se llevan tres marcas iguales sobre una semirrecta auxiliar.', { cual: 1, t1: 1 }],
        ['La última marca se une con B, y por las demás se trazan paralelas a esa recta.', { t2: 1, t3: 1 }],
        ['Paralelas que cortan partes iguales en una recta cortan partes iguales en la otra.', {}],
      ], 'Copiar un ángulo da una paralela; paralelas por marcas iguales reparten un segmento en partes iguales.'),
      xpHaz('dibujo', 'AB mide 9 y se parte en 3 con marcas iguales. Lleva X adonde cae la paralela que sale de la marca 2.', { dib: div, v: { x: 2 }, metas: { x: 6 }, alto: 200,
        manijas: [{ k: 'x', min: 1, max: 8, paso: 0.5, en: v => [40 + v.x * 28, 160], de: x => (x - 40) / 28 }],
        lee: v => `$AX = ${v.x}$`, dice: v => `X está a ${v.x} de A. La línea de la marca 2 debe quedar paralela a la que llega a B.` }, 'Cada parte mide $9 \\div 3 = 3$: la segunda paralela cae a 6 de A.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos fincas, A y B, quieren un pozo sobre la carretera que quede a la misma distancia de las dos. Mueve el pozo.', { dib: pozo, v: { x: 9 }, metas: { x: 5 }, alto: 200,
        manijas: [{ k: 'x', min: 0, max: 13, paso: 1, en: v => [40 + v.x * 20, 170], de: x => (x - 40) / 20 }],
        lee: v => `$PA \\approx ${R1(Math.hypot(v.x - 2, 5))} \\qquad PB \\approx ${R1(Math.hypot(v.x - 10, 3))}$`, dice: v => `El pozo está a ${R1(Math.hypot(v.x - 2, 5))} de A y a ${R1(Math.hypot(v.x - 10, 3))} de B.` },
      'El pozo va donde la mediatriz de AB corta la carretera: ahí equidista de las dos fincas.')],
  ], 'Con regla sin marcas y compás: mediatriz, bisectriz, perpendicular, paralela y partes iguales, todas con su porqué.');

  // ------------------------------------------------------------------------------------------ lección 2 · lugares geométricos
  const lug = (v, K) => {
    const c = cerca(v.cual);
    if (c === 0) { const O = [170, 100], P = K.at(...O, 70, v.g); return K.arc(O[0], O[1], 70, 0, v.g, 'la gr') + K.l(...O, ...P, 'lm') + pt(K, O, 'O', -12, 5) + K.c(...P, 5, 'fA'); }
    if (c === 1) { const A = [100, 120], B = [240, 120], P = [170, 120 - v.py]; return K.l(...A, ...B, 'gr') + K.l(170, 14, 170, 190, 'la gr') + K.l(...A, ...P, 'lg') + K.l(...B, ...P, 'lg') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5) + K.c(...P, 5, 'fA') + K.t(184, P[1] - 4, 'P', 's ta'); }
    if (c === 2) return K.l(20, 100, 320, 100, 'gr') + K.l(20, 55, 320, 55, 'la d') + K.l(20, 145, 320, 145, 'la d') + K.cota(60, 55, 60, 100, 'd') + K.cota(60, 100, 60, 145, 'd');
    if (c === 3) { const V = [50, 170], P = K.at(...V, 150, 25), H = K.at(...V, 150 * Math.cos(25 * Math.PI / 180), 50); return K.l(...V, 310, 170, 'gr') + K.l(...V, ...K.at(...V, 200, 50), 'gr') + K.l(...V, ...K.at(...V, 250, 25), 'la gr') + K.l(...P, P[0], 170, 'lg') + K.l(...P, ...H, 'lg') + K.c(...P, 5, 'fA'); }
    const O = [170, 122], A = K.at(...O, 80, 210), B = K.at(...O, 80, -30), P = K.at(...O, 80, 100), Q = K.at(...O, 80, 50);
    return K.arc(O[0], O[1], 80, -30, 210, 'la gr') + K.l(...A, ...B, 'gr') + K.ang(P, A, B, 22, '', 'fa') + K.ang(Q, A, B, 22, '', 'fa') + K.pl([A, P, B], 'lg') + K.pl([A, Q, B], 'lf') + pt(K, A, 'A', -12, 8) + pt(K, B, 'B', 12, 8);
  };
  // Cuadrícula de 0..12 por 0..8 (22 px).
  const GX = x => 38 + x * 22, GY = y => 186 - y * 22, G2 = { k: ['x', 'y'], min: [0, 0], max: [12, 8], paso: 1, en: v => [GX(v.x), GY(v.y)], de: (x, y) => [(x - 38) / 22, (186 - y) / 22] };
  const cuad = pts => (v, K) => {
    let h = '';
    for (let i = 0; i <= 12; i++) h += K.l(GX(i), GY(0), GX(i), GY(8), 'ls');
    for (let j = 0; j <= 8; j++) h += K.l(GX(0), GY(j), GX(12), GY(j), 'ls');
    const P = [GX(v.x), GY(v.y)], cl = ['lg', 'lf', 'lo'], tc = ['tg', 'tf', 'to'];
    Object.entries(pts).forEach(([n, A], i) => { const Q = [GX(A[0]), GY(A[1])], d = Math.hypot(v.x - A[0], v.y - A[1]); h += K.l(...Q, ...P, cl[i]) + (d > 1.4 ? K.t((Q[0] + P[0]) / 2 + 9, (Q[1] + P[1]) / 2 - 5, R1(d), `s ${tc[i]}`) : '') + K.c(...Q, 4, 'fk') + K.t(Q[0] - 10, Q[1] - 7, n, 's'); });
    return h + K.t(P[0] + 15, P[1] - 12, 'P', 'ta');
  };
  const dd = (v, A) => Math.hypot(v.x - A[0], v.y - A[1]), q2 = (v, A) => (v.x - A[0]) ** 2 + (v.y - A[1]) ** 2;

  // A 4 de A (circunferencia) y equidistante de A y B (mediatriz): 20 px por unidad.
  const cruza = (v, K) => {
    const A = [120, 108], B = [220, 108], r = v.rr * 20, h = r > 50 ? Math.sqrt(r * r - 2500) : 0;
    return K.l(...A, ...B, 'lm') + K.arc(A[0], A[1], r, 0, 360 * v.c1, 'lg gr') + K.f(v.md, K.l(170, 12, 170, 204, 'la gr')) + (h ? K.f(v.pts, K.c(170, 108 - h, 6, 'fo') + K.c(170, 108 + h, 6, 'fo')) : '') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5);
  };
  // Triángulo con base 10 (20 px por unidad): arcos de radios r1 y r2 (cual 0), L-A-L (1) y A-L-A (2).
  const arma = (v, K) => {
    const A = [70, 172], B = [270, 172], c = cerca(v.cual), base = K.l(...A, ...B, 'gr') + pt(K, A, 'A', -12, 5) + pt(K, B, 'B', 12, 5);
    if (c === 0) {
      const si = v.r1 + v.r2 > 10 && Math.abs(v.r1 - v.r2) < 10, C = si ? corte(A, v.r1 * 20, B, v.r2 * 20, -1) : A;
      return K.arc(A[0], A[1], v.r1 * 20, 0, 90 * v.a1, 'lg') + K.arc(B[0], B[1], v.r2 * 20, 180, 180 - 90 * v.a2, 'lf') + (si ? K.f(v.tri, K.pl([A, C, B], 'la') + K.c(...C, 5, 'fo') + K.t(C[0], C[1] - 10, 'C', 's')) : '') + base;
    }
    if (c === 1) { const C = K.at(...A, 120, 50); return K.ang(A, B, C, 34, '50°', 'fa', 'ta') + K.l(...A, ...K.at(...A, 165, 50), 'lm') + K.arc(A[0], A[1], 120, 38, 62, 'lg') + K.f(v.p, K.l(...C, ...B, 'la') + K.l(...A, ...C, 'la') + K.c(...C, 5, 'fo') + K.t(C[0] - 4, C[1] - 10, 'C', 's')) + base; }
    const t = Math.tan(50 * Math.PI / 180), s = Math.tan(60 * Math.PI / 180), x = 200 * s / (t + s), C = [70 + x, 172 - x * t];
    return K.ang(A, B, C, 34, '50°', 'fa', 'ta') + K.ang(B, A, C, 30, '60°', 'fg', 'tg') + K.l(...A, ...K.at(...A, 200, 50), 'lm') + K.l(...B, ...K.at(...B, 180, 120), 'lm') + K.pl([A, C, B], 'la') + K.c(...C, 5, 'fo') + K.t(C[0] + 14, C[1] + 2, 'C', 's') + base;
  };
  const ARM = { cual: 0, r1: 6, r2: 8, a1: 0, a2: 0, tri: 0, p: 0 };
  // Circuncentro (mediatrices) e incentro (bisectrices) del mismo triángulo.
  const cir = (v, K) => {
    const A = [90, 160], B = [250, 160], C = [190, 50], a = Math.hypot(B[0] - C[0], B[1] - C[1]), b = Math.hypot(A[0] - C[0], A[1] - C[1]), c = 160, s = a + b + c;
    const oy = (() => { const m = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], k = -(C[0] - B[0]) / (C[1] - B[1]); return m[1] + k * (170 - m[0]); })(), O = [170, oy], R = Math.hypot(O[0] - A[0], O[1] - A[1]);
    const I = [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s], r = 160 - I[1];
    const largo = (P, Q, k) => [P[0] + (Q[0] - P[0]) * k, P[1] + (Q[1] - P[1]) * k], med2 = (P, Q) => { const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; return K.l(...largo(O, m, 1.7), ...largo(m, O, 1.5), 'lf d'); };
    return K.p([A, B, C], 'fn') + K.f(v.m, K.l(170, 176, 170, oy - 30, 'lf d') + med2(B, C) + med2(A, C) + K.c(...O, 4, 'fF') + K.t(O[0] - 12, O[1] + 16, 'O', 's tf')) + K.arc(O[0], O[1], R, 90, 90 + 360 * v.cc, 'lf')
      + K.f(v.b, [A, B, C].map(P => K.l(...P, ...largo(P, I, 1.5), 'la d')).join('') + K.c(...I, 4, 'fA') + K.t(I[0] + 12, I[1] - 6, 'I', 's ta')) + K.arc(I[0], I[1], r, 90, 90 + 360 * v.ic, 'la')
      + pt(K, A, 'A', -12, 8) + pt(K, B, 'B', 12, 8) + pt(K, C, 'C', 0, -10);
  };
  const V1 = { A: [2, 0], B: [10, 0], C: [9, 7] };

  xpLec('euc-construcciones-2', [
    ['Lugares geométricos',
      xpMira('dibujo', 'Una palabra nueva: **lugar geométrico**. Es más sencilla de lo que suena.', { dib: lug, v: { cual: 0, g: 0, py: 0 }, alto: 210 }, [
        ['Un lugar geométrico es el conjunto de todos los puntos que cumplen una condición.', {}],
        ['Todos los puntos que están a una misma distancia de O forman una circunferencia.', { g: 360 }],
        ['Los puntos que equidistan de A y de B forman la mediatriz del segmento AB.', { cual: 1, py: 70 }, '$PA = PB$'],
        ['Los puntos a una distancia fija de una recta forman dos paralelas, una a cada lado.', { cual: 2 }],
        ['Los puntos que equidistan de los dos lados de un ángulo forman su bisectriz.', { cual: 3 }],
        ['Y los que ven un segmento AB bajo un mismo ángulo forman un arco: el arco capaz.', { cual: 4 }],
      ], 'Circunferencia, mediatriz, paralelas, bisectriz y arco capaz: cada condición dibuja su lugar geométrico.'),
      xpHaz('dibujo', 'Lleva P a un punto que esté a 5 de O, pero en diagonal: ni en la fila de O ni en su columna.', { dib: cuad({ O: [4, 2] }), v: { x: 6, y: 3 }, cumple: v => q2(v, [4, 2]) === 25 && v.x !== 4 && v.y !== 2, sol: { x: 7, y: 6 }, alto: 200, manijas: [G2],
        lee: v => `$OP ${q2(v, [4, 2]) === 25 ? '=' : '\\approx'} ${R1(dd(v, [4, 2]))}$`, dice: v => `P está a ${R1(dd(v, [4, 2]))} de O.` }, 'Los puntos a 5 de O están en una circunferencia: 3 a un lado y 4 al otro dan $\\sqrt{9 + 16} = 5$.')],
    ['Cruzar dos lugares',
      xpMira('dibujo', 'Ahora lo útil: un punto con **dos condiciones** está donde se cruzan dos lugares.', { dib: cruza, v: { rr: 4, c1: 0, md: 0, pts: 0 }, alto: 216 }, [
        ['Si un punto debe cumplir dos condiciones, se traza el lugar geométrico de cada una.', {}],
        ['Primera condición: estar a 4 de A. Es una circunferencia de centro A y radio 4.', { c1: 1 }],
        ['Segunda condición: equidistar de A y de B. Es la mediatriz del segmento AB.', { md: 1 }],
        ['Los puntos que cumplen las dos están donde los lugares se cortan. Aquí hay dos.', { pts: 1 }],
        ['Con un radio de 2, la circunferencia no alcanza la mediatriz: ningún punto cumple.', { rr: 2 }],
      ], 'Dos condiciones, dos lugares: los puntos buscados son sus cruces, y puede haber dos, uno o ninguno.'),
      xpHaz('dibujo', 'Lleva P a un punto que esté a 5 de A y también a 5 de B.', { dib: cuad({ A: [3, 3], B: [9, 3] }), v: { x: 5, y: 5 }, cumple: v => q2(v, [3, 3]) === 25 && q2(v, [9, 3]) === 25, sol: { x: 6, y: 7 }, alto: 200, manijas: [G2],
        lee: v => `$PA ${q2(v, [3, 3]) === 25 ? '=' : '\\approx'} ${R1(dd(v, [3, 3]))} \\qquad PB ${q2(v, [9, 3]) === 25 ? '=' : '\\approx'} ${R1(dd(v, [9, 3]))}$`, dice: v => `P está a ${R1(dd(v, [3, 3]))} de A y a ${R1(dd(v, [9, 3]))} de B.` },
      'P está en el cruce de dos circunferencias de radio 5: $\\sqrt{3^2 + 4^2} = 5$ hacia cada lado.')],
    ['Construir triángulos',
      xpMira('dibujo', 'Construir un triángulo es **cruzar lugares**: cada dato deja al tercer vértice en una línea.', { dib: arma, v: { ...ARM }, alto: 200 }, [
        ['Un triángulo de lados 10, 6 y 8: se traza la base de 10 y un arco de radio 6 desde A.', { a1: 1 }],
        ['Otro arco de radio 8 desde B. Donde se cortan los dos está el tercer vértice, C.', { a2: 1, tri: 1 }],
        ['Con lados 10, 3 y 5 los arcos no se alcanzan: 3 más 5 es menos que 10. No hay triángulo.', { r1: 3, r2: 5, tri: 0 }, '$3 + 5 < 10$'],
        ['Solo cierra si cada lado es menor que la suma de los otros dos.', { r1: 6, r2: 8, tri: 1 }, '$10 < 6 + 8$'],
        ['Con dos lados y el ángulo entre ellos: se copia el ángulo en A y el compás marca C en su lado.', { cual: 1, p: 1 }],
        ['Con un lado y sus dos ángulos: se copian en A y en B, y los dos rayos se cortan en C.', { cual: 2 }],
      ], 'L-L-L (si cierra), L-A-L y A-L-A: con esos datos la construcción da un solo triángulo.'),
      xpHaz('dibujo', 'La base mide 10 y un lado mide 4. Sube el otro lado hasta el **menor** entero con el que los arcos se cortan.', { dib: arma, v: { ...ARM, r1: 4, r2: 3, a1: 1, a2: 1, tri: 1 }, metas: { r2: 7 }, alto: 250,
        manijas: [{ k: 'r2', min: 3, max: 9, paso: 1, et: 'el otro lado' }],
        lee: v => `$4 + ${v.r2} ${4 + v.r2 > 10 ? '>' : 4 + v.r2 === 10 ? '=' : '<'} 10$`,
        dice: v => (v.r2 > 7 ? 'Los arcos se cortan, pero hay un entero menor que también sirve.' : v.r2 === 7 ? 'Los arcos se cortan: el triángulo cierra.' : v.r2 === 6 ? 'Los arcos apenas se tocan sobre la base: queda una línea.' : 'Los arcos no se alcanzan.') },
      'El otro lado debe pasar de $10 - 4 = 6$: el menor entero es 7.')],
    ['Dos circunferencias del triángulo',
      xpMira('dibujo', 'Con mediatrices y bisectrices aparecen las **dos circunferencias** de todo triángulo.', { dib: cir, v: { m: 0, cc: 0, b: 0, ic: 0 }, alto: 226 }, [
        ['Cada mediatriz reúne los puntos que equidistan de dos vértices.', { m: 1 }],
        ['Donde se cortan está el circuncentro O: equidista de A, de B y de C.', {}, '$OA = OB = OC$'],
        ['Con centro en O y radio hasta un vértice, la circunferencia pasa por los tres: la circunscrita.', { cc: 1 }],
        ['Cada bisectriz reúne los puntos que equidistan de dos lados.', { m: 0, cc: 0, b: 1 }],
        ['Donde se cortan está el incentro I: equidista de los tres lados.', {}],
        ['Con centro en I y esa distancia, la circunferencia toca los tres lados: la inscrita.', { ic: 1 }],
      ], 'Mediatrices: circuncentro y circunferencia circunscrita. Bisectrices: incentro y circunferencia inscrita.'),
      xpHaz('fichas', 'Pon qué rectas se trazan para hallar el centro de cada circunferencia.', { slots: [{ x: 92, y: 46, w: 124, et: 'pasa por los vértices' }, { x: 248, y: 46, w: 124, et: 'toca los tres lados' }],
        fichas: ['mediatrices', 'bisectrices', 'alturas', 'medianas'], meta: ['mediatrices', 'bisectrices'], alto: 96, pista: 'Los vértices son puntos y los lados son rectas: ¿qué lugar equidista de dos puntos, y cuál de dos rectas?' },
      'Mediatrices para la que pasa por los vértices; bisectrices para la que toca los lados.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Tres veredas, A, B y C, quieren un tanque de agua que quede a la misma distancia de las tres. Llévalo a su sitio.', { dib: cuad(V1), v: { x: 4, y: 5 }, cumple: v => q2(v, V1.A) === q2(v, V1.B) && q2(v, V1.B) === q2(v, V1.C), sol: { x: 6, y: 3 }, alto: 200, manijas: [G2],
        lee: v => `$PA \\approx ${R1(dd(v, V1.A))} \\qquad PB \\approx ${R1(dd(v, V1.B))} \\qquad PC \\approx ${R1(dd(v, V1.C))}$`, dice: v => `Está a ${R1(dd(v, V1.A))} de A, a ${R1(dd(v, V1.B))} de B y a ${R1(dd(v, V1.C))} de C.` },
      'El tanque va en el circuncentro: el cruce de las mediatrices, a 5 de cada vereda.')],
  ], 'Cada condición es un lugar geométrico; puntos, triángulos y circunferencias salen de cruzar lugares.');
}
