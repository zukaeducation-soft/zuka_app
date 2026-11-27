// Geometría Euclidiana · mundo 2 «euc-elementos»: explicaciones Explora (spec 2026-11-26-curso-euclidiana). Los ejemplos no son los de los ejercicios.
{
  const R = Math.round, gr = n => `${R(n)}°`, DEG = 180 / Math.PI;
  const ronda = (K, n, r, c) => Array.from({ length: n }, (_, i) => K.at(...c, r, 90 + i * 360 / n));
  const sobre = (O, x, y) => (y > O[1] ? (x < O[0] ? 180 : 0) : Math.atan2(O[1] - y, x - O[0]) * DEG);   // ángulo de un punto sobre el piso

  // ------------------------------------------------------------------------------------- euc-elementos-1 · puntos, rectas y segmentos
  const inc = (v, K) => {
    const A = [80, 140], B = [240, 100], C = [160, 120 - 62 * v.cy];
    let haz = ''; for (const g of [-50, -20, 14, 40, 75]) haz += K.l(...K.at(...A, 60, g + 180), ...K.at(...A, 60, g), 'lm');
    return K.f(v.pl, K.p([[20, 172], [250, 172], [322, 48], [92, 48]], 'fa')) + K.f(v.haz, haz) + K.f(v.r, K.l(16, 156, 320, 80, 'la gr'))
      + K.c(...A, 5, 'fk') + K.t(80, 164, 'A') + K.f(v.b, K.c(...B, 5, 'fk') + K.t(240, 124, 'B')) + K.f(v.c, K.c(...C, 5, 'fF') + K.t(C[0], C[1] - 10, 'C', 'tf'));
  };
  const GX = x => 40 + x * 24, GY = y => 180 - y * 24;
  const enLinea = v => 2 * (v.y - 2) === v.x - 2 && v.x !== 2 && v.x !== 6;
  const col = (v, K) => {
    let g = ''; for (let x = 0; x <= 12; x++) for (let y = 0; y <= 6; y++) g += K.c(GX(x), GY(y), 1.2, 'fM');
    return g + K.l(GX(0), GY(1), GX(12), GY(7), 'la') + K.c(GX(2), GY(2), 5, 'fk') + K.c(GX(6), GY(4), 5, 'fk') + K.t(GX(2) + 6, GY(2) + 20, 'A') + K.t(GX(6) + 6, GY(4) + 20, 'B') + K.t(GX(v.x), GY(v.y) - 16, 'C', 'ta');
  };
  const orden = (v, K) => {
    const y = 110, pt = (x, n) => K.c(x, y, 5, 'fk') + K.t(x, y - 14, n);
    return K.f(v.sp, K.r(20, 22, 300, 88, 'fa') + K.t(170, 62, 'un semiplano', 's ta') + K.t(170, 160, 'el otro semiplano', 's tm')) + K.l(20, y, 320, y, 'lm')
      + K.f(v.seg, K.l(90, y, 170, y, 'la gr')) + K.f(v.ray, K.ar(90, y, 318, y, 'la gr')) + K.f(v.opu, K.ar(170, y, 318, y, 'la gr') + K.ar(170, y, 22, y, 'lg gr'))
      + pt(90, 'A') + pt(170, 'B') + pt(250, 'C') + K.f(v.semi, K.c(90, y, 5.5, 'fc'));
  };
  const rayo = (v, K) => {
    const y = 100, X = x => 30 + x * 20;
    return K.ar(X(4), y, 326, y, 'la') + K.l(X(4), y, X(9), y, 'la gr') + K.c(X(4), y, 5, 'fk') + K.c(X(9), y, 5, 'fk') + K.t(X(4), y + 26, 'A') + K.t(X(9), y + 26, 'B') + K.t(X(v.x), y - 18, 'P', 'ta');
  };
  const mide = (v, K) => {
    const y = 110, A = 50, B = 146, C = 290, M = 170;
    return K.l(A, y, B, y, 'la gr') + K.t((A + B) / 2, y - 12, '4', 'ta') + K.c(A, y, 5, 'fk') + K.c(B, y, 5, 'fk') + K.t(A, y - 34, 'A') + K.t(B, y - 34, 'B')
      + K.f(v.c, K.l(B, y, C, y, 'lg gr') + K.t((B + C) / 2 + 16, y - 12, '6', 'tg') + K.c(C, y, 5, 'fk') + K.t(C, y - 34, 'C') + K.cota(A, y + 44, C, y + 44, 'AC = 10'))
      + K.f(v.m, K.c(M, y, 5, 'fF') + K.t(M, y + 24, 'M', 'tf'));
  };
  const regla = (v, K) => {
    const y = 110, X = x => 30 + x * 20; let h = K.l(20, y, 320, y, 'lm');
    for (let i = 0; i <= 14; i++) h += K.l(X(i), y - 4, X(i), y + 4, 'lm') + (i % 2 ? '' : K.t(X(i), y + 24, i, 's tm'));
    return h + K.l(X(2), y, X(12), y, 'la gr') + K.c(X(2), y, 5, 'fk') + K.c(X(12), y, 5, 'fk') + K.t(X(2), y - 16, 'A') + K.t(X(12), y - 16, 'B') + K.t(X(v.x), y - 20, 'M', 'ta');
  };
  const rectas = (v, K) => {
    const n = R(v.n), P = ronda(K, n, 78, [170, 100]); let h = '';
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) h += K.l(...P[i], ...P[j], i ? 'lr' : 'la');
    return K.f(v.f ?? 1, h) + P.map(q => K.c(...q, 4.5, 'fk')).join('') + K.t(8, 20, `${n} puntos`, 'tm', 'start') + K.f(v.f ?? 1, K.t(332, 20, `${n * (n - 1) / 2} rectas`, 'ta', 'end'));
  };
  const peaje = (v, K) => {
    const y = 110, X = x => 30 + x * 280 / 24, x = R(v.x);
    return K.l(X(0), y, X(v.x), y, 'la gr') + K.l(X(v.x), y, X(24), y, 'lg gr') + K.c(X(0), y, 6, 'fk') + K.c(X(24), y, 6, 'fk') + K.t(X(0), y + 28, 'A') + K.t(X(24), y + 28, 'C') + K.t(X(v.x), y - 20, 'P', 'ta')
      + K.t(X(v.x / 2), y - 44, `${x} km`, 's ta') + K.t(X(12 + v.x / 2), y - 44, `${24 - x} km`, 's tg') + K.cota(X(0), y + 44, X(24), y + 44, '24 km');
  };

  xpLec('euc-elementos-1', [
    ['Puntos que determinan',
      xpMira('dibujo', 'Todo empieza con tres ideas que no se definen: **punto**, **recta** y **plano**. Mira cómo se amarran.', { dib: inc, v: { haz: 0, b: 0, r: 0, c: 0, cy: 0, pl: 0 }, alto: 200 }, [
        ['Un punto solo marca un lugar. Lo nombramos con una letra mayúscula.', {}],
        ['Por un solo punto pasan muchísimas rectas: uno no alcanza para escoger.', { haz: 1 }],
        ['Con un segundo punto queda una sola: dos puntos diferentes determinan una recta.', { haz: 0, b: 1, r: 1 }],
        ['Si un tercer punto cae sobre esa recta, los tres son colineales.', { c: 1 }],
        ['Si queda por fuera, ninguna recta pasa por los tres: determinan un plano.', { cy: 1, pl: 1 }],
      ], 'Dos puntos diferentes determinan una recta; tres puntos no colineales determinan un plano.'),
      xpHaz('dibujo', 'Arrastra el punto C hasta que A, B y C sean **colineales**.', { dib: col, v: { x: 9, y: 2 }, cumple: enLinea, sol: { x: 10, y: 6 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [12, 6], paso: 1, en: v => [GX(v.x), GY(v.y)], de: (x, y) => [(x - 40) / 24, (180 - y) / 24] }],
        dice: v => (enLinea(v) ? 'C está en la recta AB: los tres son colineales.' : 'C no está en la recta que determinan A y B.') }, 'Colineales: los tres puntos están en una misma recta.')],
    ['Entre, segmento y rayo',
      xpMira('dibujo', 'Los puntos de una recta tienen **orden**. Con él se nombran sus pedazos.', { dib: orden, v: { seg: 0, ray: 0, semi: 0, opu: 0, sp: 0 }, alto: 190 }, [
        ['De tres puntos de una recta, uno y solo uno está entre los otros dos. Aquí es B.', {}],
        ['El segmento AB son A, B y los puntos que están entre ellos. Tiene dos extremos.', { seg: 1 }],
        ['El rayo AB arranca en A, pasa por B y sigue sin fin. A es su origen.', { seg: 0, ray: 1 }],
        ['Si al rayo le quitamos el origen queda una semirrecta: por eso el punto va hueco.', { semi: 1 }],
        ['Desde B salen dos rayos opuestos, BA y BC: juntos forman toda la recta.', { ray: 0, semi: 0, opu: 1 }],
        ['Y una recta parte al plano en dos semiplanos. Ella es el borde: no es de ninguno.', { opu: 0, sp: 1 }],
      ], 'Segmento: dos extremos. Rayo: un origen y sigue sin fin. Semirrecta: el rayo sin su origen.'),
      xpHaz('dibujo', 'Arrastra P a un lugar que esté en el **rayo AB** pero no en el **segmento AB**.', { dib: rayo, v: { x: 2 }, cumple: v => v.x > 9, sol: { x: 12 }, alto: 180,
        manijas: [{ k: 'x', min: 0, max: 14, paso: 1, en: v => [30 + v.x * 20, 100], de: x => (x - 30) / 20 }],
        dice: v => (v.x < 4 ? 'P quedó del otro lado de A: hasta ahí no llega el rayo AB.' : v.x <= 9 ? 'P está en el segmento AB, entre los extremos.' : 'P está en el rayo, más allá de B.') }, 'El rayo AB sigue más allá de B; el segmento AB termina en B.')],
    ['Medir, sumar y partir',
      xpMira('dibujo', 'A cada segmento le corresponde un número: su **medida**. Con ella se puede sumar y restar.', { dib: mide, v: { c: 0, m: 0 }, alto: 190 }, [
        ['Este segmento AB mide 4. Escribimos AB = 4.', {}],
        ['Si B está entre A y C, las medidas se suman: AB + BC = AC.', { c: 1 }, '$4 + 6 = 10$'],
        ['Y si conoces el total, un pedazo se halla restando.', {}, '$10 - 4 = 6$'],
        ['El punto medio M parte al segmento AC en dos segmentos congruentes.', { m: 1 }, '$AM = MC = 5$'],
        ['Congruentes quiere decir de igual medida. Iguales, que son el mismo segmento.', {}],
        ['Por eso AM y MC son congruentes, pero no iguales: son dos segmentos distintos.', {}, '$AM \\cong MC$'],
      ], 'Si B está entre A y C, AB + BC = AC. El punto medio deja dos segmentos congruentes.'),
      xpHaz('dibujo', 'A está en 2 y B en 12. Lleva M al **punto medio** del segmento AB.', { dib: regla, v: { x: 3 }, metas: { x: 7 }, alto: 180,
        manijas: [{ k: 'x', min: 0, max: 14, paso: 1, en: v => [30 + v.x * 20, 110], de: x => (x - 30) / 20 }],
        lee: v => `$AM = ${Math.abs(v.x - 2)}$, $MB = ${Math.abs(12 - v.x)}$`, dice: v => `AM mide ${Math.abs(v.x - 2)} y MB mide ${Math.abs(12 - v.x)}.` }, 'AB mide 10: el punto medio queda a 5 de cada extremo, en el 7.')],
    ['Contar rectas',
      xpMira('dibujo', 'Si dos puntos determinan una recta, ¿cuántas determinan **varios** puntos?', { dib: rectas, v: { n: 3, f: 1 }, alto: 200 }, [
        ['Con 3 puntos no colineales salen 3 rectas: una por cada pareja de puntos.', {}],
        ['Con 4 puntos, de cada uno salen 3 rectas: una hacia cada uno de los otros.', { n: 4 }],
        ['Pero 4 por 3 cuenta cada recta dos veces: la recta AB es la misma recta BA.', {}, '$\\tfrac{4 \\cdot 3}{2} = 6$'],
        ['Con 5 puntos pasa igual: 5 por 4, y la mitad.', { n: 5 }, '$\\tfrac{5 \\cdot 4}{2} = 10$'],
        ['En general: n puntos, sin tres colineales, determinan n(n − 1)/2 rectas.', {}, '$\\tfrac{n(n-1)}{2}$'],
      ], 'Con n puntos, sin tres colineales, se determinan $\\tfrac{n(n-1)}{2}$ rectas.'),
      xpHaz('dibujo', 'Mueve la perilla hasta que los puntos determinen **15 rectas**.', { dib: rectas, v: { n: 3, f: 1 }, metas: { n: 6 }, alto: 250, manijas: [{ k: 'n', min: 2, max: 9, paso: 1, et: 'puntos' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 1}}{2} = ${v.n * (v.n - 1) / 2}$`, dice: v => `Con ${v.n} puntos, de cada uno salen ${v.n - 1} rectas.` }, 'Seis puntos: $\\tfrac{6 \\cdot 5}{2} = 15$ rectas.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En una carretera recta, el peaje P está entre las ciudades A y C, separadas 24 km. De P a C hay el **triple** que de A a P. Ubica el peaje.', { dib: peaje, v: { x: 12 }, metas: { x: 6 }, alto: 180,
        manijas: [{ k: 'x', min: 1, max: 23, paso: 1, en: v => [30 + v.x * 280 / 24, 110], de: x => (x - 30) * 24 / 280 }],
        lee: v => `$${v.x} + ${24 - v.x} = 24$`, dice: v => `De A a P hay ${v.x} km y de P a C, ${24 - v.x} km.` }, 'Son cuatro partes iguales de 6 km: $AP = 6$ y $PC = 18$.')],
  ], 'Puntos que determinan rectas, el orden que da segmentos y rayos, y medidas que se suman, se restan y se parten.');

  // ------------------------------------------------------------------------------------------- euc-elementos-2 · ángulos y su medida
  const clase = a => (a < 90 ? 'agudo' : a === 90 ? 'recto' : a < 180 ? 'obtuso' : 'llano');
  const abre = (v, K) => {
    const O = [150, 160], B = K.at(...O, 130, v.a);
    return K.sec(...O, 40, 0, v.a, 'fa') + K.t(...K.at(O[0], O[1] + 5, 64, v.a / 2), gr(v.a), 'ta') + K.l(...O, 280, 160) + K.l(...O, ...B, 'la gr') + K.c(...O, 4, 'fk')
      + K.t(146, 182, 'O') + K.t(292, 165, 'A') + K.t(...K.at(150, 165, 146, v.a), 'B') + K.t(8, 22, clase(R(v.a)), 'tm', 'start');
  };
  const OV = [170, 170];
  const partes = (v, K) => {
    const A = K.at(...OV, 128, 0), B = K.at(...OV, 128, v.a), P = K.at(...OV, 118, v.x), pone = (g, s, d = 142) => K.t(...K.at(OV[0], OV[1] + 5, d, g), s, 's');
    return K.ang(OV, A, P, 46, gr(v.x), 'fa', 'ta') + K.ang(OV, P, B, 36, v.oc ? '?' : gr(v.a - v.x), 'fg', 'tg') + K.l(...OV, ...A) + K.l(...OV, ...B) + K.l(...OV, ...P, 'la gr') + K.c(...OV, 4, 'fk')
      + pone(0, 'A') + pone(v.a, 'B') + pone(v.x, 'P', 134) + K.t(166, 190, 'O', 's') + K.t(8, 20, `∠AOB = ${R(v.a)}°`, 'tm', 'start');
  };
  const lineal = (v, K) => {
    const O = [170, 150], T = K.at(...O, 115, v.a), D = [300, 150], I = [40, 150];
    return K.ang(O, D, T, 42, gr(v.a), 'fa', 'ta') + K.ang(O, T, I, 34, gr(180 - R(v.a)), 'fg', 'tg') + K.l(...I, ...D) + K.l(...O, ...T, 'la gr') + K.c(...O, 4, 'fk');
  };
  const esquina = (v, K) => {
    const V = [110, 170], T = K.at(...V, 135, v.a), D = [265, 170], U = [110, 20];
    return K.ang(V, D, T, 46, gr(v.a), 'fa', 'ta') + K.ang(V, T, U, 38, gr(90 - R(v.a)), 'fg', 'tg') + K.l(...V, ...D) + K.l(...V, ...U) + K.l(...V, ...T, 'la gr') + K.c(...V, 4, 'fk');
  };
  const cruce = (v, K) => {
    const C = [170, 100], P = g => K.at(...C, 92, g), A = P(12), B = P(12 + v.a), A2 = P(192), B2 = P(192 + v.a), n = R(v.a);
    return K.ang(C, A, B, 40, gr(n), 'fa', 'ta') + K.f(v.f2, K.ang(C, A2, B2, 40, gr(n), 'fa', 'ta') + K.ang(C, B, A2, 30, gr(180 - n), 'fg', 'tg')) + K.l(...A, ...A2) + K.l(...B, ...B2) + K.c(...C, 4, 'fk');
  };
  const parejas = (v, K) => (v.cual < 0.5 ? esquina(v, K) : v.cual < 1.5 ? lineal(v, K) : cruce(v, K));
  const perp = (v, K) => {
    const C = [170, 100], I = [70, 100], D = [270, 100], T = K.at(...C, 85, v.g), U = K.at(...C, 85, v.g + 180), g = R(v.g);
    return K.ang(C, D, T, 30, gr(g), 'fa', 'ta') + K.f(v.f4, K.ang(C, T, I, 26, gr(180 - g), 'fg', 'tg') + K.ang(C, I, U, 30, gr(g), 'fa', 'ta') + K.ang(C, U, D, 26, gr(180 - g), 'fg', 'tg'))
      + K.l(20 + 50 * v.seg, 100, 320 - 50 * v.seg, 100, 'gr') + K.l(...U, ...T, 'la gr') + K.c(...C, 4, 'fk')
      + K.f(v.seg, K.c(...I, 5, 'fk') + K.c(...D, 5, 'fk') + K.t(56, 105, 'A') + K.t(284, 105, 'B') + K.t(182, 122, 'M', 's')) + K.f(v.med, K.t(222, 26, 'mediatriz', 's ta'));
  };
  const corre = (v, K) => {
    const y = 120, X = x => 30 + x * 20, M = X(v.x); let h = '';
    for (let i = 3; i <= 11; i++) h += K.l(X(i), y - 4, X(i), y + 4, 'lm');
    return h + K.l(X(3), y, X(11), y, 'gr') + K.l(M, 36, M, 172, 'la') + K.pl([[M + 9, y], [M + 9, y - 9], [M, y - 9]], 'lo') + K.c(X(3), y, 5, 'fk') + K.c(X(11), y, 5, 'fk') + K.t(X(3) - 14, y + 5, 'A') + K.t(X(11) + 14, y + 5, 'B')
      + K.t(X(3), y + 26, '3', 's tm') + K.t(X(11), y + 26, '11', 's tm');
  };
  const lampara = (v, K) => {
    const O = [170, 160], T = K.at(...O, 120, v.a);
    return K.ang(O, [300, 160], T, 40, gr(v.a), 'fa', 'ta') + K.ang(O, T, [40, 160], 32, gr(180 - R(v.a)), 'fg', 'tg') + K.l(30, 160, 310, 160) + K.l(...O, ...T, 'la gr') + K.c(...O, 5, 'fk') + K.t(170, 184, 'mesa', 's tm');
  };

  xpLec('euc-elementos-2', [
    ['Ángulo y medida',
      xpMira('dibujo', 'Dos rayos que salen del mismo punto forman un **ángulo**. Su medida dice cuánto se abre.', { dib: abre, v: { a: 50 }, alto: 200 }, [
        ['El origen común, O, es el vértice. Los rayos OA y OB son los lados.', {}],
        ['Este mide 50°. Todo ángulo de menos de 90° es agudo.', {}],
        ['Con 90° justos es un ángulo recto, como la esquina de una hoja.', { a: 90 }],
        ['Entre 90° y 180° el ángulo es obtuso.', { a: 135 }],
        ['Y con 180° los dos lados quedan en línea: es un ángulo llano.', { a: 180 }],
      ], 'Agudo: menos de 90°. Recto: 90°. Obtuso: entre 90° y 180°. Llano: 180°.'),
      xpHaz('dibujo', 'Abre el ángulo hasta que sea **obtuso** y mida 40° más que un recto.', { dib: abre, v: { a: 60 }, metas: { a: 130 }, alto: 200,
        manijas: [{ k: 'a', min: 10, max: 170, paso: 5, en: v => XPK.at(150, 160, 112, v.a), de: (x, y) => sobre([150, 160], x, y) }],
        dice: v => `Mide ${v.a}°: es ${clase(v.a)}.` }, 'Un recto mide 90°: con 40° más son 130°, un ángulo obtuso.')],
    ['Sumar y partir ángulos',
      xpMira('dibujo', 'Un rayo que sale del vértice por el **interior** del ángulo lo parte en dos.', { dib: partes, v: { a: 100, x: 30, oc: 0 }, alto: 200 }, [
        ['P está en el interior del ángulo AOB. El rayo OP lo parte en dos ángulos.', {}],
        ['Las dos partes juntas dan el ángulo entero: es la adición de ángulos.', {}, '$30^\\circ + 70^\\circ = 100^\\circ$'],
        ['Si OP gira, una parte gana lo que la otra pierde. La suma no cambia.', { x: 65 }, '$65^\\circ + 35^\\circ = 100^\\circ$'],
        ['Cuando las dos partes son congruentes, OP es la bisectriz del ángulo.', { x: 50 }, '$50^\\circ = 50^\\circ$'],
        ['La bisectriz es única: solo un rayo deja dos ángulos congruentes.', {}],
      ], 'Si P es interior, ∠AOP + ∠POB = ∠AOB. La bisectriz parte al ángulo en dos congruentes.'),
      xpHaz('dibujo', 'El ángulo AOB mide 80°. Mueve el rayo OP hasta que el ángulo dorado, ∠POB, mida 25°.', { dib: partes, v: { a: 80, x: 20, oc: 1 }, metas: { x: 55 }, alto: 200,
        manijas: [{ k: 'x', min: 5, max: 75, paso: 5, en: v => XPK.at(170, 170, 118, v.x), de: (x, y) => sobre(OV, x, y) }],
        lee: v => `$${v.x}^\\circ + ? = 80^\\circ$`, dice: v => `∠AOP mide ${v.x}°; a ∠POB le queda el resto de 80°.` }, 'Al dorado le queda el resto: $80^\\circ - 25^\\circ = 55^\\circ$ para ∠AOP.')],
    ['Parejas de ángulos',
      xpMira('dibujo', 'Hay parejas de ángulos con **nombre propio**, según lo que suman o cómo están puestos.', { dib: parejas, v: { cual: 0, a: 35, f2: 0 }, alto: 200 }, [
        ['Dos ángulos que suman 90° son complementarios: juntos llenan un ángulo recto.', {}, '$35^\\circ + 55^\\circ = 90^\\circ$'],
        ['Dos que suman 180° son suplementarios. Estos, además, forman un par lineal.', { cual: 1, a: 70 }, '$70^\\circ + 110^\\circ = 180^\\circ$'],
        ['Par lineal: son adyacentes, con un lado común, y sus otros lados son rayos opuestos.', {}],
        ['Dos rectas que se cortan forman ángulos opuestos por el vértice.', { cual: 2, a: 65 }],
        ['Los dos son suplementos del mismo vecino: por eso son congruentes.', { f2: 1 }, '$180^\\circ - 115^\\circ = 65^\\circ$'],
      ], 'Complementarios: 90°. Suplementarios: 180°. Par lineal: adyacentes y suplementarios. Opuestos por el vértice: congruentes.'),
      xpHaz('dibujo', 'Gira el rayo hasta que los dos ángulos del par lineal sean **congruentes**.', { dib: lineal, v: { a: 40 }, metas: { a: 90 }, alto: 190,
        manijas: [{ k: 'a', min: 15, max: 165, paso: 5, en: v => XPK.at(170, 150, 115, v.a), de: (x, y) => sobre([170, 150], x, y) }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `Miden ${v.a}° y ${180 - v.a}°.` }, 'Si los dos ángulos de un par lineal son congruentes, cada uno es recto: mide 90°.')],
    ['Perpendiculares y mediatriz',
      xpMira('dibujo', 'Cuando dos rectas se cortan formando un ángulo recto se llaman **perpendiculares**.', { dib: perp, v: { g: 60, f4: 0, seg: 0, med: 0 }, alto: 200 }, [
        ['Dos rectas que se cortan forman cuatro ángulos. Aquí miden 60° y 120°.', { f4: 1 }],
        ['Si uno de ellos es recto, las rectas son perpendiculares.', { g: 90 }],
        ['Y entonces los cuatro son rectos: cada uno es par lineal u opuesto de otro.', {}],
        ['Ahora la recta horizontal es un segmento AB, y M es su punto medio.', { f4: 0, seg: 1 }],
        ['La perpendicular al segmento que pasa por su punto medio es la mediatriz.', { med: 1 }],
      ], 'Perpendiculares: se cortan en ángulo recto. Mediatriz: la perpendicular por el punto medio.'),
      xpHaz('dibujo', 'El segmento AB va del 3 al 11. Corre la perpendicular hasta que sea su **mediatriz**.', { dib: corre, v: { x: 4 }, metas: { x: 7 }, alto: 190,
        manijas: [{ k: 'x', min: 1, max: 13, paso: 1, en: v => [30 + v.x * 20, 60], de: x => (x - 30) / 20 }],
        lee: v => `$AM = ${Math.abs(v.x - 3)}$, $MB = ${Math.abs(11 - v.x)}$`, dice: v => `La perpendicular corta a ${Math.abs(v.x - 3)} de A y a ${Math.abs(11 - v.x)} de B.` }, 'La mediatriz pasa por el punto medio: a 4 de A y a 4 de B, en el 7.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'El brazo de una lámpara forma con la mesa un ángulo cuyo **suplemento** mide el cuádruple. Inclina el brazo hasta ahí.', { dib: lampara, v: { a: 60 }, metas: { a: 36 }, alto: 200,
        manijas: [{ k: 'a', min: 8, max: 88, paso: 4, en: v => XPK.at(170, 160, 120, v.a), de: (x, y) => sobre([170, 160], x, y) }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `El brazo forma ${v.a}° con la mesa; su suplemento mide ${180 - v.a}°.` }, 'Son cinco partes iguales en 180°: el ángulo mide 36° y su suplemento, 144°.')],
  ], 'Ángulos que se miden, se suman y se parten; parejas con nombre propio, y rectas que se cortan en ángulo recto.');

  // --------------------------------------------------------------------------------------------------- euc-elementos-3 · polígonos
  const NOM = { 3: 'triángulo', 4: 'cuadrado', 5: 'pentágono', 6: 'hexágono', 7: 'heptágono', 8: 'octágono', 9: 'eneágono', 10: 'decágono', 11: 'undecágono', 12: 'dodecágono' };
  const FORMAS = [[[50, 150], [110, 60], [170, 130], [240, 50], [290, 140]], [[60, 160], [170, 110], [280, 160], [250, 50], [170, 90], [90, 50]], [[170, 40], [270, 100], [230, 170], [110, 170], [70, 100]]];
  const quebrada = (v, K) => {
    const k = R(v.k), P = FORMAS[k];
    return K.f(v.rel, K.p(P, 'fa')) + (k ? K.p(P, 'fn') : K.pl(P)) + P.map(q => K.c(...q, 4, 'fk')).join('') + K.f(v.rc, K.l(20, 75, 320, 75, 'lf d'));
  };
  const convexo = P => {
    let s = 0;
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], c = P[(i + 2) % P.length], z = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
      if (!z || (s && Math.sign(z) !== s)) return false;
      s = Math.sign(z);
    }
    return true;
  };
  const cuad = v => [[70, 170], [270, 170], [250, 60], [v.x, v.y]];
  const mueveD = (v, K) => K.p(cuad(v), convexo(cuad(v)) ? 'fa' : 'ff') + cuad(v).slice(0, 3).map(q => K.c(...q, 4, 'fk')).join('') + K.t(v.x, v.y - 16, 'D', 'ta');
  const regular = (v, K) => { const n = R(v.n), P = ronda(K, n, 74, [170, 92]); return K.p(P, 'fa') + P.map(q => K.c(...q, 3.5, 'fk')).join('') + K.t(170, 192, NOM[n] || `${n} lados`, 'ta'); };
  const tres = K => [[60, 5], [170, 8], [280, 10]].map(([x, n]) => K.p(ronda(K, n, 44, [x, 70]), 'fa')).join('');
  const pares = n => { const l = []; for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) if (i || j < n - 1) l.push([i, j]); return l; };
  const diagonales = (v, K) => {
    const n = R(v.n), P = ronda(K, n, 78, [170, 100]), D = pares(n), tr = (l, cls) => l.map(([i, j]) => K.l(...P[i], ...P[j], cls)).join('');
    return K.f(v.t, tr(D.filter(d => d[0]), 'lg')) + K.f(v.a, tr(D.filter(d => !d[0]), 'la gr')) + K.p(P, 'fn') + P.map((q, i) => K.c(...q, i ? 4 : 6, i ? 'fk' : 'fA')).join('')
      + K.t(8, 20, `${n} lados`, 'tm', 'start') + K.f(v.t, K.t(332, 20, `${D.length} diagonales`, 'ta', 'end'));
  };
  const circulo = (v, K) => {
    const C = [170, 100], P = g => K.at(...C, 78, g);
    return K.f(v.in, K.c(...C, 78, 'fa')) + K.c(...C, 78, 'fn') + K.f(v.di, K.l(...P(180), ...P(0), 'lf gr') + K.t(124, 92, 'diámetro', 's tf')) + K.f(v.r, K.l(...C, ...P(60), 'la gr') + K.t(218, 66, 'radio', 's ta'))
      + K.f(v.cu, K.l(...P(230), ...P(310), 'lg gr') + K.t(170, 152, 'cuerda', 's tg')) + K.f(v.ar, K.arc(...C, 78, 100, 160, 'lo gr') + K.t(104, 28, 'arco', 's to')) + K.c(...C, 4, 'fk') + K.t(164, 120, 'O', 's');
  };
  const cuerda = (v, K) => {
    const C = [170, 100], A = K.at(...C, 78, 200), B = K.at(...C, 78, v.g);
    return K.c(...C, 78, 'fn') + K.l(...A, ...B, R(v.g) === 20 ? 'lo gr' : 'la gr') + K.c(...A, 5, 'fk') + K.c(...C, 4, 'fk') + K.t(A[0] - 14, A[1] + 10, 'A') + K.t(164, 122, 'O', 's') + K.t(...K.at(170, 105, 96, v.g), 'B', 'ta');
  };

  xpLec('euc-elementos-3', [
    ['Líneas quebradas y polígonos',
      xpMira('dibujo', 'Con segmentos puestos uno tras otro se arman líneas nuevas. Una de ellas encierra los **polígonos**.', { dib: quebrada, v: { k: 0, rc: 0, rel: 0 }, alto: 200 }, [
        ['Varios segmentos, uno tras otro, forman una línea quebrada. Esta es abierta.', {}],
        ['Si el último punto se une con el primero, la línea quebrada es cerrada.', { k: 1 }],
        ['Esta tiene una entrada: hay rectas que la cortan en cuatro puntos. No es convexa.', { rc: 1 }],
        ['Si ninguna recta la corta en más de dos puntos es convexa: una línea poligonal.', { k: 2 }],
        ['La porción de plano que limita es un polígono, con sus lados y sus vértices.', { rc: 0, rel: 1 }],
      ], 'Polígono: la porción de plano que limita una línea quebrada cerrada y convexa, la línea poligonal.'),
      xpHaz('dibujo', 'Este cuadrilátero tiene una entrada en D. Arrastra D hasta que sea **convexo**.', { dib: mueveD, v: { x: 180, y: 130 }, cumple: v => convexo(cuad(v)), sol: { x: 90, y: 60 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [40, 40], max: [300, 150], paso: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] }],
        dice: v => (convexo(cuad(v)) ? 'Ninguna recta lo corta en más de dos puntos: es convexo.' : 'Tiene una entrada: una recta puede cortarlo en cuatro puntos.') }, 'Convexo: ninguna recta corta a la línea en más de dos puntos.')],
    ['Nombres y polígonos regulares',
      xpMira('dibujo', 'Los polígonos se **nombran** por su número de lados, y algunos son más parejos que otros.', { dib: regular, v: { n: 5 }, alto: 200 }, [
        ['Con 3 lados, triángulo; con 4, cuadrilátero; con 5, pentágono.', {}],
        ['Con 6, hexágono; con 7, heptágono; con 8, octágono; con 10, decágono.', { n: 8 }],
        ['Si todos sus lados son congruentes es equilátero; si lo son sus ángulos, equiángulo.', {}],
        ['Regular es el que cumple las dos cosas a la vez, como este octágono.', {}],
        ['Un rombo es equilátero y un rectángulo es equiángulo; el cuadrado es las dos cosas.', { n: 4 }],
      ], 'Regular: equilátero y equiángulo a la vez.'),
      xpHaz('fichas', 'Pon a cada polígono su **nombre**, contando sus lados.', { slots: [{ x: 60, y: 150, w: 104, h: 38 }, { x: 170, y: 150, w: 104, h: 38 }, { x: 280, y: 150, w: 104, h: 38 }], fichas: ['octágono', 'decágono', 'pentágono', 'eneágono'], meta: ['pentágono', 'octágono', 'decágono'], alto: 176, fondo: K => tres(K) },
        'Penta, cinco; octa, ocho; deca, diez.')],
    ['Contar diagonales',
      xpMira('dibujo', 'Una **diagonal** une dos vértices que no son consecutivos. ¿Cuántas tiene un polígono?', { dib: diagonales, v: { n: 5, a: 0, t: 0 }, alto: 200 }, [
        ['Desde un vértice del pentágono salen 2 diagonales.', { a: 1 }],
        ['Siempre salen n − 3: no hay diagonal hacia él mismo ni hacia sus dos vecinos.', {}, '$5 - 3 = 2$'],
        ['De los 5 vértices saldrían 5 por 2, pero así cada diagonal se cuenta dos veces.', { t: 1 }, '$\\tfrac{5 \\cdot 2}{2} = 5$'],
        ['En el heptágono salen 4 de cada vértice, y en total son 14.', { n: 7 }, '$\\tfrac{7 \\cdot 4}{2} = 14$'],
        ['En general, un polígono de n lados tiene n(n − 3)/2 diagonales.', {}, '$\\tfrac{n(n-3)}{2}$'],
      ], 'De cada vértice salen n − 3 diagonales; en total son $\\tfrac{n(n-3)}{2}$.'),
      xpHaz('dibujo', 'Mueve la perilla hasta que el polígono tenga **20 diagonales**.', { dib: diagonales, v: { n: 4, a: 1, t: 1 }, metas: { n: 8 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 12, paso: 1, et: 'lados' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 3}}{2} = ${v.n * (v.n - 3) / 2}$`, dice: v => `Con ${v.n} lados, de cada vértice salen ${v.n - 3}.` }, 'Ocho lados: $\\tfrac{8 \\cdot 5}{2} = 20$ diagonales.')],
    ['Circunferencia y círculo',
      xpMira('dibujo', 'También hay líneas curvas. La más pareja de todas es la **circunferencia**.', { dib: circulo, v: { r: 0, cu: 0, di: 0, ar: 0, in: 0 }, alto: 200 }, [
        ['Los puntos del plano que están a igual distancia de un centro O forman una circunferencia.', {}],
        ['Esa distancia es el radio: va del centro a cualquier punto de la circunferencia.', { r: 1 }],
        ['Una cuerda es un segmento que une dos puntos de la circunferencia.', { cu: 1 }],
        ['La cuerda que pasa por el centro es un diámetro: mide dos radios.', { di: 1 }],
        ['Un arco es un pedazo de la circunferencia, entre dos de sus puntos.', { ar: 1 }],
        ['La circunferencia es solo la línea. Junto con su interior forma el círculo.', { in: 1 }],
      ], 'Circunferencia: la línea. Círculo: la línea con su interior. El diámetro mide dos radios.'),
      xpHaz('dibujo', 'Arrastra B por la circunferencia hasta que la cuerda AB sea un **diámetro**.', { dib: cuerda, v: { g: 110 }, metas: { g: 20 }, alto: 200,
        manijas: [{ k: 'g', min: -40, max: 160, paso: 10, en: v => XPK.at(170, 100, 78, v.g), de: (x, y) => Math.atan2(100 - y, x - 170) * DEG }],
        dice: v => (v.g === 20 ? 'La cuerda AB pasa por el centro: es un diámetro.' : 'La cuerda AB no pasa por el centro O.') }, 'El diámetro es la cuerda que pasa por el centro.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque es un polígono. Hay un sendero recto entre cada par de esquinas no vecinas: son **77** senderos. ¿Cuántas esquinas tiene?', { dib: diagonales, v: { n: 5, a: 1, t: 1 }, metas: { n: 14 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 16, paso: 1, et: 'esquinas' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 3}}{2} = ${v.n * (v.n - 3) / 2}$`, dice: v => `Con ${v.n} esquinas hay ${v.n * (v.n - 3) / 2} senderos.` }, 'Los senderos son las diagonales: $\\tfrac{14 \\cdot 11}{2} = 77$.')],
  ], 'Líneas poligonales que encierran polígonos, sus nombres, sus diagonales, y la circunferencia con sus elementos.');
}
