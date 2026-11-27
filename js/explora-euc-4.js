// Geometría Euclidiana · mundo 4 «Paralelas y Cuadriláteros» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const rd = g => g * Math.PI / 180, R = Math.round, n1 = x => R(x * 10) / 10;
  const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], hip = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const esc = (K, V, P, Q, s = 9) => { const a = hip(V, P), b = hip(V, Q); if (a < 1 || b < 1) return ''; const u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s]; return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm'); };
  const marca = (K, P, Q, cls = 'lg') => { const m = mid(P, Q), d = hip(P, Q) || 1, u = [(Q[1] - P[1]) / d * 6, -(Q[0] - P[0]) / d * 6]; return K.l(m[0] - u[0], m[1] - u[1], m[0] + u[0], m[1] + u[1], cls); };

  // ------------------------------------------------------------------------------------------- 1 · paralelas y perpendiculares
  // Un punto P, una recta r y un camino de P a la recta.
  const perp = (v, K) => {
    const P = [170, 40], F = [170 + v.x, 170];
    return K.l(20, 170, 320, 170, 'gr') + K.t(312, 188, 'r', 'tm') + K.f(v.esc ?? 0, K.l(...P, 170, 170, 'lo d') + K.pl([[180, 170], [180, 160], [170, 160]], 'lm'))
      + K.l(...P, ...F, 'la gr') + K.c(...P, 5, 'fk') + K.t(186, 38, 'P', 's') + K.f(v.ver ?? 0, K.t((P[0] + F[0]) / 2 + 14, 112, `${n1(Math.hypot(v.x / 20, 6.5))}`, 's ta', 'start'));
  };
  // La recta r y otra que gira alrededor de P.
  const CR = [170, 160], PP = [150, 80];
  const pie = X => { const u = [Math.cos(rd(15)), -Math.sin(rd(15))], k = (X[0] - CR[0]) * u[0] + (X[1] - CR[1]) * u[1]; return [CR[0] + k * u[0], CR[1] + k * u[1]]; };
  const par = (v, K) => {
    const a = K.at(...CR, -140, 15), b = K.at(...CR, 140, 15), s1 = K.at(...PP, -120, v.a), s2 = K.at(...PP, 100, v.a), S = K.at(...PP, 80, v.a);
    return K.l(...a, ...b, 'gr') + K.t(b[0] + 4, b[1] - 10, 'r', 'tm') + K.l(...s1, ...s2, 'la gr') + K.c(...PP, 5, 'fk') + K.t(PP[0] - 6, PP[1] - 12, 'P', 's')
      + K.f(v.eq ?? 0, [PP, S].map(X => K.l(...X, ...pie(X), 'lf d') + K.t(X[0] + 8, (X[1] + pie(X)[1]) / 2 + 8, `${n1(hip(X, pie(X)) / 10)}`, 's tf', 'start')).join(''));
  };
  // Una recta t, su perpendicular a, otra recta b que gira y una tercera c.
  const BB = [210, 170];
  const tres = (v, K) => {
    const T = K.at(...BB, 125, v.b), D = K.at(...BB, -16, v.b);
    return K.l(20, 170, 320, 170, 'gr') + K.t(20, 188, 't', 'tm') + K.l(90, 186, 90, 40, 'la gr') + K.pl([[99, 170], [99, 161], [90, 161]], 'lm') + K.t(78, 50, 'a', 's ta')
      + K.ang(BB, [260, 170], T, 22, `${R(v.b)}°`, 'fg', 'tg') + K.l(...D, ...T, 'lg gr') + K.t(T[0] + 12, T[1] + 10, 'b', 's tg')
      + K.f(v.c ?? 0, K.l(290, 186, 290, 40, 'lf gr') + K.t(302, 50, 'c', 's tf')) + K.f(v.m ?? 0, K.t(150, 26, 'a ∥ b', 'to'));
  };
  const orilla = (v, K) => {
    const P = [60, 80], F = [280, 80 + v.y];
    return K.r(280, 14, 50, 180, 'fg') + K.l(280, 14, 280, 194, 'gr') + K.l(...P, ...F, 'la gr') + K.c(...P, 6, 'fk') + K.t(60, 64, 'bote', 's') + K.t(170, (80 + F[1]) / 2 - 10, `${n1(Math.hypot(11, v.y / 20))}`, 's ta');
  };

  xpLec('euc-cuadrilateros-1', [
    ['La perpendicular y la distancia',
      xpMira('dibujo', 'Primero: de un punto a una recta hay muchos caminos, pero uno solo es **el más corto**.', { dib: perp, v: { x: 100, esc: 0, ver: 0 }, alto: 200 }, [
        ['Un punto P y una recta r. De P a la recta se puede bajar por muchos caminos.', {}],
        ['Este llega inclinado: es un segmento oblicuo.', { ver: 1 }],
        ['Si corremos el pie, el camino se acorta.', { x: 40 }],
        ['El más corto cae a escuadra: es el segmento perpendicular. Por P solo pasa una perpendicular a r.', { x: 0, esc: 1 }],
        ['Su medida es la distancia de P a la recta. Cualquier oblicua mide más.', {}, '$6.5 < 6.8 < 8.2$'],
      ], 'Por un punto pasa una sola perpendicular a una recta, y es el camino más corto: la distancia.'),
      xpHaz('dibujo', 'Corre el pie del segmento hasta que mida lo menos posible.', { dib: perp, v: { x: -80, esc: 0, ver: 1 }, metas: { x: 0 }, alto: 200,
        manijas: [{ k: 'x', min: -120, max: 120, paso: 20, en: v => [170 + v.x, 170], de: x => x - 170 }],
        lee: v => `$${n1(Math.hypot(v.x / 20, 6.5))}$`, dice: v => `El segmento mide ${n1(Math.hypot(v.x / 20, 6.5))}. Busca el más corto.` }, 'El más corto es el perpendicular: mide 6.5, la distancia de P a la recta.')],
    ['Rectas paralelas',
      xpMira('dibujo', 'Segundo: rectas que **nunca se cortan**.', { dib: par, v: { a: 15, eq: 0 }, alto: 210 }, [
        ['Dos rectas de un plano que no se cortan, por más que se prolonguen, son paralelas.', {}],
        ['Giremos la recta que pasa por P. Así inclinada, termina cortando a r.', { a: 40 }],
        ['Al devolverla, el corte se aleja cada vez más.', { a: 22 }],
        ['Hasta que deja de cortarla: quedó paralela. Solo ocurre en esa posición.', { a: 15 }],
        ['Es el postulado de las paralelas: por un punto exterior a una recta pasa una sola paralela.', {}],
        ['Y dos paralelas guardan la misma distancia en todos sus puntos.', { eq: 1 }, '$8.2 = 8.2$'],
      ], 'Por un punto exterior a una recta pasa una sola paralela a ella, y las paralelas equidistan.'),
      xpHaz('dibujo', 'Gira la recta que pasa por P hasta que las dos distancias a r sean iguales.', { dib: par, v: { a: 35, eq: 1 }, metas: { a: 15 }, alto: 210,
        manijas: [{ k: 'a', min: -15, max: 45, paso: 5, en: v => XPK.at(...PP, 100, v.a), de: (x, y) => Math.atan2(PP[1] - y, x - PP[0]) * 180 / Math.PI }],
        lee: v => { const S = XPK.at(...PP, 80, v.a); return `$${n1(hip(PP, pie(PP)) / 10)}$ y $${n1(hip(S, pie(S)) / 10)}$`; }, dice: v => (v.a > 15 ? 'Las rectas se acercan hacia la izquierda: allá se cortan.' : 'Las rectas se acercan hacia la derecha: allá se cortan.') }, 'Con distancias iguales las rectas no se acercan: son paralelas.')],
    ['Perpendiculares y paralelas, juntas',
      xpMira('dibujo', 'Tercero: cómo **saber** que dos rectas son paralelas sin prolongarlas.', { dib: tres, v: { b: 70, c: 0, m: 0 }, alto: 200 }, [
        ['La recta a es perpendicular a t. Otra recta, b, cruza a t inclinada.', {}],
        ['Así, b y la recta a terminarían cortándose arriba.', { b: 78 }],
        ['Si b también es perpendicular a t, ya no se cortan.', { b: 90 }],
        ['Dos rectas perpendiculares a una misma recta son paralelas entre sí.', { m: 1 }],
        ['Y si una recta c es paralela a b, también es paralela a la recta a.', { c: 1 }],
        ['Además t, perpendicular a b, resulta perpendicular a su paralela c.', {}],
      ], 'Dos perpendiculares a una misma recta son paralelas; dos paralelas a una tercera, también.'),
      xpHaz('dibujo', 'El poste a está a escuadra con el piso. Endereza el poste b hasta que quede paralelo al poste a.', { dib: tres, v: { b: 65, c: 0, m: 0 }, metas: { b: 90 }, alto: 200,
        manijas: [{ k: 'b', min: 60, max: 120, paso: 5, en: v => XPK.at(...BB, 125, v.b), de: (x, y) => Math.atan2(BB[1] - y, x - BB[0]) * 180 / Math.PI }],
        lee: v => `$${v.b}^\\circ$`, dice: v => `El poste b forma ${v.b}° con el piso; el poste a, 90°.` }, 'Si los dos son perpendiculares al piso, son paralelos entre sí.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un bote quiere llegar a la orilla recta por el camino más corto. Lleva el punto de llegada a su lugar.', { dib: orilla, v: { y: 80 }, metas: { y: 0 }, alto: 208,
        manijas: [{ k: 'y', min: -60, max: 100, paso: 20, en: v => [280, 80 + v.y], de: (x, y) => y - 80 }],
        lee: v => `$${n1(Math.hypot(11, v.y / 20))}$`, dice: v => `Por ahí el bote recorre ${n1(Math.hypot(11, v.y / 20))}.` }, 'El camino más corto a la orilla es el perpendicular: 11, la distancia del bote a la orilla.')],
  ], 'Una sola perpendicular y una sola paralela por cada punto; la distancia se mide a escuadra.');

  // ------------------------------------------------------------------------------------------- 2 · ángulos entre paralelas y en polígonos
  const Y1 = 62, Y2 = 152;
  const cruces = (v, K) => {
    const t = Math.tan(rd(v.a)), X = y => 170 + (107 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], n = R(v.a), d = (W, s) => [W[0] + s * 100, W[1]], up = [X(Y1 - 40), Y1 - 40], dn = [X(Y2 + 40), Y2 + 40];
    return K.f(v.cor ?? 0, K.ang(P, d(P, 1), up, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.alt ?? 0, K.ang(P, d(P, -1), Q, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.ext ?? 0, K.ang(P, d(P, 1), up, 26, `${n}°`, 'ff', 'tf') + K.ang(Q, d(Q, -1), dn, 26, `${n}°`, 'ff', 'tf'))
      + K.f(v.col ?? 0, K.ang(P, d(P, 1), Q, 26, v.oc ? '?' : `${180 - n}°`, 'fg', 'tg') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.l(20, Y1, 320, Y1) + K.l(20, Y2, 320, Y2) + K.l(...up, ...dn, 'la gr');
  };
  // Recíprocos: la recta de abajo gira; ¿son paralelas?
  const TT = 70, XT = y => 170 + (105 - y) / Math.tan(rd(TT)), PT = [XT(60), 60], QT = [XT(150), 150];
  const gira = (v, K) => {
    const col = (v.col ?? 0) > 0.5, a = XPK.at(...QT, -130, v.b), b = XPK.at(...QT, 130, v.b);
    return (col ? K.ang(PT, [PT[0] + 100, 60], QT, 24, `${180 - TT}°`, 'fa', 'ta') : K.ang(PT, [PT[0] - 100, 60], QT, 24, `${TT}°`, 'fa', 'ta')) + K.ang(QT, b, PT, 24, `${R(TT - v.b)}°`, 'fg', 'tg')
      + K.l(30, 60, 310, 60) + K.l(...a, ...b, 'la gr') + K.l(XT(22), 22, XT(188), 188) + K.t(40, 50, 'ℓ₁', 's tm') + K.t(a[0] + 10, a[1] + 18, 'ℓ₂', 's tm') + K.f(v.par ?? 0, K.t(262, 110, 'ℓ₁ ∥ ℓ₂', 'to'));
  };
  const TX = v => { const A = [85, 170], B = [255, 170], ta = Math.tan(rd(v.a)), tb = Math.tan(rd(v.b)), x = 170 * tb / (ta + tb); return [A, B, [85 + x, 170 - x * ta]]; };
  const tri = (v, K) => {
    const [A, B, C] = TX(v), a = R(v.a), b = R(v.b), L = [C[0] - 110, C[1]], D = [C[0] + 110, C[1]];
    return K.ang(A, B, C, 32, `${a}°`, 'fa', 'ta') + K.ang(B, C, A, 32, `${b}°`, 'fg', 'tg') + K.ang(C, A, B, 26, `${180 - a - b}°`, 'ff', 'tf')
      + K.f(v.une ?? 0, K.l(Math.max(6, L[0]), L[1], Math.min(334, D[0]), D[1], 'lm d') + K.ang(C, L, A, 20, '', 'fa') + K.ang(C, B, D, 20, '', 'fg'))
      + K.f(v.ext ?? 0, K.l(B[0], B[1], 330, 170, 'lm') + K.ang(B, [330, 170], C, 24, `${180 - b}°`, 'fo', 'to')) + K.pl([A, B, C, A]);
  };
  const pol = (v, K) => {
    const n = R(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 100, 88, 90 + i * 360 / n));
    let h = '';
    for (let i = 1; i < n - 1; i++) h += K.p([P[0], P[i], P[i + 1]], ['fa', 'fg', 'ff', 'fo'][i % 4]);
    return h + K.p(P, 'fn') + K.t(46, 190, `${n} lados`, 'tm');
  };

  xpLec('euc-cuadrilateros-2', [
    ['Los pares de ángulos',
      xpMira('dibujo', 'Una recta que corta a otras dos forma ocho ángulos. Aprendamos a **nombrarlos por parejas**.', { dib: cruces, v: { a: 60, cor: 0, alt: 0, ext: 0, col: 0 }, alto: 210 }, [
        ['Dos rectas paralelas y una transversal. Entre las paralelas están los ángulos internos; fuera, los externos.', {}],
        ['Correspondientes: en la misma esquina de cada cruce. Entre paralelas son congruentes.', { cor: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Alternos internos: adentro y a lados distintos de la transversal. También congruentes.', { cor: 0, alt: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Alternos externos: afuera y a lados distintos. Congruentes otra vez.', { alt: 0, ext: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Colaterales interiores: adentro y del mismo lado. Esos no son congruentes: son suplementarios.', { ext: 0, col: 1 }, '$120^\\circ + 60^\\circ = 180^\\circ$'],
        ['Si la transversal se inclina cambian las medidas, no las relaciones.', { a: 75 }, '$105^\\circ + 75^\\circ = 180^\\circ$'],
      ], 'Entre paralelas: alternos y correspondientes, congruentes; colaterales, suplementarios.'),
      xpHaz('dibujo', 'Inclina la transversal hasta que el colateral oculto mida 130°.', { dib: cruces, v: { a: 80, cor: 0, alt: 0, ext: 0, col: 1, oc: 1 }, metas: { a: 50 }, alto: 210,
        manijas: [{ k: 'a', min: 40, max: 140, paso: 5, en: v => [170 + 85 / Math.tan(rd(v.a)), 22], de: x => Math.atan2(85, x - 170) * 180 / Math.PI }],
        lee: v => `$? + ${v.a}^\\circ = 180^\\circ$`, dice: v => `El de abajo mide ${v.a}°. El oculto es su colateral interior.` }, 'Los colaterales son suplementarios: $180^\\circ - 130^\\circ = 50^\\circ$.')],
    ['Al revés: probar que son paralelas',
      xpMira('dibujo', 'Hasta aquí sabíamos que eran paralelas. Ahora al revés: **los ángulos lo deciden**.', { dib: gira, v: { b: 12, col: 0, par: 0 }, alto: 210 }, [
        ['Dos rectas y una transversal. No sabemos si son paralelas.', {}],
        ['Medimos dos alternos internos: 70° y 58°. No son congruentes.', {}, '$70^\\circ \\ne 58^\\circ$'],
        ['Entonces las rectas se acercan de un lado: en algún punto se cortan.', {}],
        ['Si los alternos internos son congruentes, las rectas tienen que ser paralelas.', { b: 0, par: 1 }, '$70^\\circ = 70^\\circ$'],
        ['Con colaterales también se puede: si son suplementarios, las rectas son paralelas.', { col: 1 }, '$110^\\circ + 70^\\circ = 180^\\circ$'],
        ['Lo mismo con correspondientes o alternos externos congruentes: cada teorema tiene su recíproco.', {}],
      ], 'Alternos o correspondientes congruentes, o colaterales suplementarios: las rectas son paralelas.'),
      xpHaz('dibujo', 'Gira la recta de abajo hasta que los alternos internos sean congruentes.', { dib: gira, v: { b: 15, col: 0, par: 0 }, metas: { b: 0 }, alto: 210,
        manijas: [{ k: 'b', min: -20, max: 20, paso: 5, en: v => XPK.at(...QT, 120, v.b), de: (x, y) => Math.atan2(QT[1] - y, x - QT[0]) * 180 / Math.PI }],
        lee: v => `$70^\\circ$ y $${70 - v.b}^\\circ$`, dice: v => `Los alternos internos miden 70° y ${70 - v.b}°.` }, 'Con alternos internos congruentes, las dos rectas quedan paralelas.')],
    ['Triángulos y polígonos',
      xpMira('dibujo', 'Con las paralelas se demuestra cuánto suman los ángulos de un **triángulo** y de cualquier **polígono**.', { dib: (v, K) => (v.cual < 0.5 ? tri(v, K) : pol(v, K)), v: { cual: 0, a: 50, b: 60, une: 0, ext: 0, n: 5 }, alto: 200 }, [
        ['Por un vértice trazamos la paralela al lado opuesto.', { une: 1 }],
        ['Los ángulos de la base reaparecen arriba como alternos internos: los tres llenan un ángulo llano.', {}, '$50^\\circ + 70^\\circ + 60^\\circ = 180^\\circ$'],
        ['Al prolongar un lado nace un ángulo exterior: mide la suma de los dos interiores no adyacentes.', { une: 0, ext: 1 }, '$50^\\circ + 70^\\circ = 120^\\circ$'],
        ['Un polígono se parte en triángulos desde un vértice: salen dos menos que lados.', { cual: 1 }, '$3 \\cdot 180^\\circ = 540^\\circ$'],
        ['Por eso sus ángulos interiores suman (n − 2) veces 180°.', { n: 6 }, '$(6 - 2) \\cdot 180^\\circ = 720^\\circ$'],
        ['Y los exteriores, uno por vértice, suman siempre una vuelta completa.', {}, '$360^\\circ$'],
      ], 'Triángulo: 180°, y el exterior suma los dos no adyacentes. Polígono: $(n - 2) \\cdot 180^\\circ$; exteriores, 360°.'),
      xpHaz('dibujo', 'Arrastra el número de lados hasta que los ángulos interiores sumen 900°.', { dib: pol, v: { n: 4 }, metas: { n: 7 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 10, paso: 1 }],
        lee: v => `$${v.n - 2} \\cdot 180^\\circ = ${(v.n - 2) * 180}^\\circ$`, dice: v => `${v.n} lados: ${v.n - 2} ${v.n === 3 ? 'triángulo' : 'triángulos'}.` }, 'Cinco triángulos dan $5 \\cdot 180^\\circ = 900^\\circ$: el polígono tiene 7 lados.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos rieles y un travesaño: los ángulos marcados son colaterales interiores. Gira el riel de abajo hasta que los rieles queden paralelos.', { dib: gira, v: { b: -15, col: 1, par: 0 }, metas: { b: 0 }, alto: 210,
        manijas: [{ k: 'b', min: -20, max: 20, paso: 5, en: v => XPK.at(...QT, 120, v.b), de: (x, y) => Math.atan2(QT[1] - y, x - QT[0]) * 180 / Math.PI }],
        lee: v => `$110^\\circ + ${70 - v.b}^\\circ = ${180 - v.b}^\\circ$`, dice: v => `Los colaterales suman ${180 - v.b}°.` }, 'Colaterales suplementarios: $110^\\circ + 70^\\circ = 180^\\circ$, y los rieles son paralelos.')],
  ], 'Los ángulos nombran, miden y también prueban: dicen cuándo dos rectas son paralelas y cuánto suma un polígono.');

  // ------------------------------------------------------------------------------------------- 3 · paralelogramos y trapecios
  const A3 = [70, 170], B3 = [230, 170];
  const plg = (v, K) => {
    const D = K.at(...A3, 100, v.a), C = K.at(...B3, 100, v.a), a = R(v.a), c = mid(A3, C);
    return K.p([A3, B3, C, D], 'fn') + K.f(v.angs ?? 0, K.ang(A3, B3, D, 30, `${a}°`, 'fa', 'ta') + K.ang(B3, A3, C, 24, v.oc ? '?' : `${180 - a}°`, 'fg', 'tg') + (v.oc ? '' : K.ang(C, B3, D, 24, '', 'fa') + K.ang(D, A3, C, 20, '', 'fg')))
      + K.f(v.diag ?? 0, K.l(...A3, ...C, 'lf d') + K.l(...B3, ...D, 'lo d') + K.c(...c, 4, 'fk')) + K.pl([A3, B3, C, D, A3], 'gr')
      + K.f(v.lados ?? 0, marca(K, A3, B3) + marca(K, D, C) + marca(K, A3, D, 'lf') + marca(K, B3, C, 'lf'));
  };
  // Paralelogramo de base 120 y lado l, con sus diagonales.
  const A4 = [80, 176], B4 = [200, 176];
  const esp = (v, K) => {
    const D = K.at(...A4, v.l, v.a), C = K.at(...B4, v.l, v.a), c = mid(A4, C);
    return K.p([A4, B4, C, D], 'fn') + K.pl([A4, B4, C, D, A4], 'gr') + (Math.abs(v.a - 90) < 0.5 ? esc(K, A4, B4, D) : '')
      + K.f(v.diag ?? 0, K.l(...A4, ...C, 'la gr') + K.l(...B4, ...D, 'lf gr') + (Math.abs(v.l - 120) < 0.5 ? esc(K, c, C, B4, 7) : '') + K.t(170, 24, `diagonales: ${n1(hip(A4, C) / 20)} y ${n1(hip(B4, D) / 20)}`, 's'));
  };
  const trap = (v, K) => {
    const A = [50, 170], B = [290, 170], D = [50 + v.dx, 70], C = [50 + v.dx + v.w, 70];
    return K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], 'gr') + K.l(...A, ...B, 'la gr') + K.l(...D, ...C, 'la gr')
      + K.f(v.iso ?? 0, K.l(...A, ...C, 'lf d') + K.l(...B, ...D, 'lf d') + marca(K, A, D) + marca(K, B, C))
      + K.f(v.ver ?? 0, K.t(30, 110, `${n1(hip(A, D) / 20)}`, 's tg') + K.t(312, 110, `${n1(hip(B, C) / 20)}`, 's tg'));
  };

  xpLec('euc-cuadrilateros-3', [
    ['El paralelogramo',
      xpMira('dibujo', 'Un cuadrilátero con los lados opuestos **paralelos** trae varias propiedades de regalo.', { dib: plg, v: { a: 65, lados: 0, angs: 0, diag: 0 }, alto: 200 }, [
        ['Un cuadrilátero con sus dos pares de lados opuestos paralelos es un paralelogramo.', {}],
        ['Una diagonal lo parte en dos triángulos congruentes: por eso los lados opuestos son congruentes.', { lados: 1 }],
        ['Los ángulos opuestos también son congruentes, y dos consecutivos son suplementarios.', { angs: 1 }, '$65^\\circ + 115^\\circ = 180^\\circ$'],
        ['Las dos diagonales se cortan en el punto medio de ambas: se bisecan.', { diag: 1 }],
        ['Si se inclina, las medidas cambian, pero todas esas propiedades siguen.', { a: 105 }, '$105^\\circ + 75^\\circ = 180^\\circ$'],
      ], 'Paralelogramo: lados y ángulos opuestos congruentes, consecutivos suplementarios, diagonales que se bisecan.'),
      xpHaz('dibujo', 'Inclina el paralelogramo hasta que el ángulo oculto, consecutivo del que ves, mida 105°.', { dib: plg, v: { a: 60, lados: 0, angs: 1, diag: 0, oc: 1 }, metas: { a: 75 }, alto: 200,
        manijas: [{ k: 'a', min: 50, max: 120, paso: 5, en: v => XPK.at(...A3, 100, v.a), de: (x, y) => Math.atan2(A3[1] - y, x - A3[0]) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ? = 180^\\circ$`, dice: v => `El ángulo en A mide ${v.a}°; su consecutivo lo completa a 180°.` }, 'Consecutivos suplementarios: $180^\\circ - 105^\\circ = 75^\\circ$.')],
    ['Rectángulo, rombo y cuadrado',
      xpMira('dibujo', 'Tres paralelogramos especiales, y cada uno se reconoce por sus **diagonales**.', { dib: esp, v: { a: 65, l: 80, diag: 0 }, alto: 200 }, [
        ['Si un paralelogramo tiene un ángulo recto, los tiene todos: es un rectángulo.', { a: 90 }],
        ['En el rectángulo las diagonales son congruentes.', { diag: 1 }, '$7.2 = 7.2$'],
        ['Si en cambio los cuatro lados son congruentes, es un rombo.', { a: 60, l: 120 }],
        ['En el rombo las diagonales son perpendiculares y bisecan los ángulos.', {}],
        ['Con ángulos rectos y lados congruentes a la vez, es un cuadrado: sus diagonales cumplen todo.', { a: 90 }, '$8.5 = 8.5$'],
      ], 'Rectángulo: diagonales congruentes. Rombo: perpendiculares y bisectrices. Cuadrado: las dos cosas.'),
      xpHaz('dibujo', 'Endereza el paralelogramo hasta que sus dos diagonales midan lo mismo.', { dib: esp, v: { a: 60, l: 80, diag: 1 }, metas: { a: 90 }, alto: 200,
        manijas: [{ k: 'a', min: 50, max: 130, paso: 10, en: v => XPK.at(...A4, 80, v.a), de: (x, y) => Math.atan2(A4[1] - y, x - A4[0]) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ$`, dice: v => (v.a === 90 ? 'Diagonales congruentes.' : 'Una diagonal quedó más larga que la otra.') }, 'Un paralelogramo con diagonales congruentes es un rectángulo.')],
    ['Trapecios, y cómo reconocer un paralelogramo',
      xpMira('dibujo', 'Con un solo par de lados paralelos la figura es un **trapecio**.', { dib: trap, v: { dx: 20, w: 120, iso: 0, ver: 0 }, alto: 200 }, [
        ['Un trapecio tiene un solo par de lados paralelos: sus bases.', {}],
        ['Si los lados no paralelos son congruentes, el trapecio es isósceles.', { dx: 60, ver: 1 }, '$5.8 = 5.8$'],
        ['En el isósceles, los ángulos de cada base y las diagonales son congruentes.', { iso: 1 }],
        ['Si la base de arriba crece hasta igualar a la de abajo, los otros lados quedan paralelos.', { iso: 0, w: 240, dx: 40 }],
        ['Un par de lados opuestos paralelos y congruentes basta: ya es un paralelogramo.', {}],
        ['También basta con lados opuestos congruentes, ángulos opuestos congruentes o diagonales que se bisecan.', {}],
      ], 'Trapecio: un solo par de lados paralelos. Un par paralelo y congruente ya da un paralelogramo.'),
      xpHaz('dibujo', 'Corre la base de arriba hasta que el trapecio sea isósceles.', { dib: trap, v: { dx: 20, w: 120, iso: 0, ver: 1 }, metas: { dx: 60 }, alto: 200,
        manijas: [{ k: 'dx', min: 0, max: 120, paso: 10, en: v => [50 + v.dx, 70], de: x => x - 50 }],
        lee: v => `$${n1(Math.hypot(v.dx, 100) / 20)}$ y $${n1(Math.hypot(120 - v.dx, 100) / 20)}$`, dice: v => `Los lados no paralelos miden ${n1(Math.hypot(v.dx, 100) / 20)} y ${n1(Math.hypot(120 - v.dx, 100) / 20)}.` }, 'Lados no paralelos congruentes: el trapecio es isósceles.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una reja plegable forma un paralelogramo. Ábrela hasta que el ángulo oculto mida el doble del que ves.', { dib: plg, v: { a: 85, lados: 0, angs: 1, diag: 0, oc: 1 }, metas: { a: 60 }, alto: 200,
        manijas: [{ k: 'a', min: 50, max: 120, paso: 5, en: v => XPK.at(...A3, 100, v.a), de: (x, y) => Math.atan2(A3[1] - y, x - A3[0]) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `Mide ${v.a}° y su consecutivo ${180 - v.a}°.` }, 'Consecutivos suplementarios: $x + 2x = 180^\\circ$, así que miden 60° y 120°.')],
  ], 'El paralelogramo y sus casos especiales se reconocen por lados, ángulos y, sobre todo, diagonales.');

  // ------------------------------------------------------------------------------------------- 4 · rectas y puntos notables
  const media = (v, K) => {
    if (v.cual < 0.5) {
      const A = [40, 180], B = [300, 180], C = [120, 30], M = mid(A, C), N = mid(B, C);
      return K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'gr') + K.c(...M, 4, 'fk') + K.c(...N, 4, 'fk') + marca(K, A, M) + marca(K, M, C) + marca(K, B, N, 'lf') + marca(K, N, C, 'lf')
        + K.f(v.seg ?? 0, K.l(...M, ...N, 'la gr')) + K.f(v.len ?? 0, K.t(170, 196, '20', 's') + K.t(150, 96, '10', 's ta'));
    }
    const u = 260 / 14, A = [40, 180], B = [300, 180], D = [90, 60], C = [90 + v.b * u, 60], M = mid(A, D), N = mid(B, C);
    return K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], 'gr') + K.c(...M, 4, 'fk') + K.c(...N, 4, 'fk') + K.l(...M, ...N, 'la gr')
      + K.t(170, 196, '14', 's') + K.t((D[0] + C[0]) / 2, 50, `${R(v.b)}`, 's') + K.t((M[0] + N[0]) / 2, 110, v.oc ? '?' : `${n1((14 + v.b) / 2)}`, 's ta');
  };
  // Triángulo rectángulo de hipotenusa 12.
  const TP = v => [60 + 11 * Math.sqrt(Math.max(0, 144 - v.h * v.h)), 180 - 11 * v.h];
  const rect = (v, K) => {
    const A = [60, 180], T = TP(v), F = [T[0], 180], m = mid(A, T), g = Math.asin(Math.min(1, v.h / 12)) * 180 / Math.PI;
    return K.l(30, 180, 320, 180, 'lm') + K.f(v.eq ?? 0, K.pl([T, [2 * T[0] - 60, 180], F], 'lm d')) + K.f(v.circ ?? 0, K.arc(m[0], m[1], 66, 0, 360, 'lo d'))
      + K.p([A, F, T], 'fn') + K.ang(A, F, T, 30, `${n1(g)}°`, 'fa', 'ta') + esc(K, F, A, T) + K.l(...A, ...T, 'la gr') + K.l(...T, ...F, 'lf gr') + K.l(...A, ...F, 'gr')
      + K.f(v.med ?? 0, K.l(...F, ...m, 'lo gr') + K.c(...m, 4, 'fk')) + K.t(m[0] - 14, m[1] - 10, '12', 's ta', 'end') + K.t(T[0] + 12, (T[1] + 180) / 2 + 4, `${n1(v.h)}`, 's tf', 'start');
  };
  const TA = [50, 180], TB = [290, 180], TC = [130, 40];
  const NOT = (() => {
    const a = hip(TB, TC), b = hip(TA, TC), c = hip(TA, TB), y = (120 * 120 + 180 * 180 - 40 * 40 - 40 * 40) / 280, O = [170, y];
    return { G: [(TA[0] + TB[0] + TC[0]) / 3, (TA[1] + TB[1] + TC[1]) / 3], O, I: [(a * TA[0] + b * TB[0] + c * TC[0]) / (a + b + c), (a * TA[1] + b * TB[1] + c * TC[1]) / (a + b + c)], H: [TA[0] + TB[0] + TC[0] - 2 * O[0], TA[1] + TB[1] + TC[1] - 2 * O[1]] };
  })();
  const piel = (X, P, Q) => { const k = ((X[0] - P[0]) * (Q[0] - P[0]) + (X[1] - P[1]) * (Q[1] - P[1])) / hip(P, Q) ** 2; return [P[0] + k * (Q[0] - P[0]), P[1] + k * (Q[1] - P[1])]; };
  const notables = (v, K) => {
    const V = [TA, TB, TC], L = [[TB, TC], [TA, TC], [TA, TB]], es = k => (Math.abs(v.cual - k) < 0.5 ? 1 : 0), pt = (X, t) => K.c(...X, 5, 'fk') + K.t(X[0] + 14, X[1] - 8, t, 's ta');
    return K.p(V, 'fn') + K.pl([...V, TA], 'gr')
      + K.f(es(0), V.map((X, i) => K.l(...X, ...mid(...L[i]), 'la')).join('') + pt(NOT.G, 'G'))
      + K.f(es(1), L.map(([P, Q]) => K.l(...mid(P, Q), ...NOT.O, 'lg') + esc(K, mid(P, Q), P, NOT.O, 7)).join('') + V.map(X => K.l(...NOT.O, ...X, 'lg d')).join('') + pt(NOT.O, 'O'))
      + K.f(es(2), V.map(X => K.l(...X, ...NOT.I, 'lf')).join('') + K.arc(n1(NOT.I[0]), n1(NOT.I[1]), n1(180 - NOT.I[1]), 0, 360, 'lf d') + pt(NOT.I, 'I'))
      + K.f(es(3), V.map((X, i) => K.l(...X, ...piel(X, ...L[i]), 'lo') + esc(K, piel(X, ...L[i]), X, L[i][0], 7)).join('') + pt(NOT.H, 'H'));
  };
  const MB = [170, 180];
  const bari = (v, K) => {
    const G = [TC[0] + (MB[0] - TC[0]) * v.s / 9, TC[1] + (MB[1] - TC[1]) * v.s / 9];
    let h = K.p([TA, TB, TC], 'fn') + K.pl([TA, TB, TC, TA], 'gr') + K.l(...TC, ...MB, 'la gr');
    for (let i = 0; i <= 9; i++) h += K.l(TC[0] + 40 * i / 9 - 4, TC[1] + 140 * i / 9 + 1, TC[0] + 40 * i / 9 + 4, TC[1] + 140 * i / 9 - 1, 'lm');
    return h + K.t(TC[0] - 12, TC[1] + 2, 'C', 's') + K.t(170, 196, 'M', 's') + K.t(G[0] + 20, G[1] + 4, 'G', 's ta') + K.t(260, 60, 'mediana: 9', 's tm');
  };
  const U = 24, GP = (x, y) => [26 + x * U, 212 - y * U], CASAS = [[1, 1], [11, 1], [4, 8]];
  const pozo = (v, K) => {
    const V = CASAS.map(q => GP(...q)), O = GP(v.x, v.y);
    let h = '';
    for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 8), 'ls');
    for (let j = 0; j <= 8; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls');
    return h + K.p(V, 'fn') + K.pl([...V, V[0]], 'gr') + V.map((q, i) => K.l(...O, ...q, ['lg d', 'lf d', 'lo d'][i]) + K.c(...q, 5, 'fk')).join('');
  };
  const dz = v => CASAS.map(q => n1(Math.hypot(q[0] - v.x, q[1] - v.y)));

  xpLec('euc-cuadrilateros-4', [
    ['La paralela media',
      xpMira('dibujo', 'Unir **puntos medios** produce segmentos con medidas muy precisas.', { dib: media, v: { cual: 0, seg: 0, len: 0, b: 8, oc: 0 }, alto: 204 }, [
        ['Marcamos los puntos medios de dos lados de un triángulo.', {}],
        ['El segmento que los une es la paralela media: es paralela al tercer lado.', { seg: 1 }],
        ['Y mide exactamente la mitad de ese lado.', { len: 1 }, '$20 \\div 2 = 10$'],
        ['En un trapecio, la mediana une los puntos medios de los lados no paralelos.', { cual: 1 }],
        ['Es paralela a las bases y mide su semisuma: el promedio de las dos.', {}, '$\\tfrac{14 + 8}{2} = 11$'],
        ['Si la base menor se achica, la mediana se achica la mitad de eso.', { b: 4 }, '$\\tfrac{14 + 4}{2} = 9$'],
      ], 'Paralela media: paralela al tercer lado y mide la mitad. Mediana del trapecio: semisuma de las bases.'),
      xpHaz('dibujo', 'La base mayor mide 14. Cambia la base menor hasta que la mediana, oculta, mida 10.', { dib: media, v: { cual: 1, seg: 1, len: 0, b: 9, oc: 1 }, metas: { b: 6 }, alto: 250,
        manijas: [{ k: 'b', min: 2, max: 12, paso: 1, et: 'base menor' }],
        lee: v => `$\\tfrac{14 + ${v.b}}{2}$`, dice: v => `Las bases miden 14 y ${v.b}. La mediana es su promedio.` }, 'La semisuma debe dar 10: $\\tfrac{14 + 6}{2} = 10$.')],
    ['Dos mitades del triángulo rectángulo',
      xpMira('dibujo', 'El triángulo **rectángulo** esconde dos mitades.', { dib: rect, v: { h: 8, med: 0, circ: 0, eq: 0 }, alto: 200 }, [
        ['Un triángulo rectángulo de hipotenusa 12. Trazamos la mediana que llega a la hipotenusa.', { med: 1 }],
        ['Esa mediana mide la mitad de la hipotenusa.', {}, '$12 \\div 2 = 6$'],
        ['Por eso el punto medio de la hipotenusa equidista de los tres vértices.', { circ: 1 }],
        ['Ahora bajemos la punta hasta que el ángulo mida 30°.', { h: 6, circ: 0, med: 0 }],
        ['El triángulo quedó como la mitad de uno equilátero de lado 12.', { eq: 1 }],
        ['Por eso el cateto opuesto a 30° mide la mitad de la hipotenusa. Y el recíproco también vale.', {}, '$12 \\div 2 = 6$'],
      ], 'La mediana sobre la hipotenusa y el cateto opuesto a 30° miden la mitad de la hipotenusa.'),
      xpHaz('dibujo', 'La hipotenusa mide 12. Mueve la punta hasta que el ángulo marcado mida 30°.', { dib: rect, v: { h: 9, med: 0, circ: 0, eq: 0 }, metas: { h: 6 }, alto: 200,
        manijas: [{ k: 'h', min: 2, max: 10, paso: 1, en: v => TP(v), de: (x, y) => (180 - y) / 11 }],
        lee: v => `$\\tfrac{${v.h}}{12}$`, dice: v => `El cateto opuesto mide ${v.h} y la hipotenusa 12.` }, 'Con el cateto opuesto en 6, la mitad de 12, el ángulo mide 30°.')],
    ['Cuatro puntos notables',
      xpMira('dibujo', 'En todo triángulo hay cuatro ternas de rectas que **se cortan en un solo punto**.', { dib: notables, v: { cual: 0 }, alto: 200 }, [
        ['Las tres medianas se cortan en un punto: el baricentro.', {}],
        ['Queda a dos tercios de cada mediana, contando desde el vértice.', {}, '$AG = \\tfrac23 \\, AM$'],
        ['Las mediatrices de los lados se cortan en el circuncentro: equidista de los tres vértices.', { cual: 1 }],
        ['Las bisectrices de los ángulos se cortan en el incentro: equidista de los tres lados.', { cual: 2 }],
        ['Y las tres alturas se cortan en el ortocentro.', { cual: 3 }],
      ], 'Medianas: baricentro. Mediatrices: circuncentro. Bisectrices: incentro. Alturas: ortocentro.'),
      xpHaz('dibujo', 'La mediana CM mide 9. Desliza G por ella hasta el baricentro.', { dib: bari, v: { s: 3 }, metas: { s: 6 }, alto: 204,
        manijas: [{ k: 's', min: 1, max: 8, paso: 1, r: 9, en: v => [TC[0] + 40 * v.s / 9, TC[1] + 140 * v.s / 9], de: (x, y) => 9 * ((x - TC[0]) * 40 + (y - TC[1]) * 140) / (40 * 40 + 140 * 140) }],
        lee: v => `$CG = ${v.s}$, $GM = ${9 - v.s}$`, dice: v => `G está a ${v.s} del vértice y a ${9 - v.s} del lado.` }, 'Dos tercios de 9 desde el vértice: $CG = 6$ y $GM = 3$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Tres casas quieren un pozo a igual distancia de las tres. Arrastra el pozo a su lugar.', { dib: pozo, v: { x: 3, y: 3 }, metas: { x: 6, y: 3 }, alto: 232,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [12, 8], paso: 1, en: v => GP(v.x, v.y), de: (x, y) => [(x - 26) / U, (212 - y) / U] }],
        lee: v => `$${dz(v).join('$, $')}$`, dice: v => `El pozo queda a ${dz(v).join(', ')} de las casas.` }, 'Es el circuncentro: está en las mediatrices y equidista de los tres vértices.')],
  ], 'Puntos medios que dan mitades, y cuatro puntos notables: baricentro, circuncentro, incentro y ortocentro.');
}
