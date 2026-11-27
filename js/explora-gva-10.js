// Geometría Vectorial · explicación de geo-10 «Vectores en la geometría euclidiana» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios. Sin coordenadas: la cuadrícula solo es papel.
{
  const k = v => Math.round(v.k || 0);
  const plano = (ox, oy, u) => ({ X: x => ox + x * u, Y: y => oy - y * u, P: q => [ox + q[0] * u, oy - q[1] * u], u, ox, oy });
  const papel = (K, P, nx, ny) => {
    let h = '';
    for (let x = 0; x <= nx; x++) h += K.l(P.X(x), P.Y(0), P.X(x), P.Y(ny), 'ls');
    for (let y = 0; y <= ny; y++) h += K.l(P.X(0), P.Y(y), P.X(nx), P.Y(y), 'ls');
    return h;
  };
  const pto = (K, Q, s, dx = -9, dy = -8) => K.c(Q[0], Q[1], 4, 'fk') + K.t(Q[0] + dx, Q[1] + dy, s, 's', dx < 0 ? 'end' : 'start');
  const mid = (A, B) => [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const mano = (P, nx, ny, et) => ({ k: ['x', 'y'], min: [0, 0], max: [nx, ny], paso: 1, rot: () => et, en: v => P.P([v.x, v.y]), de: (x, y) => [(x - P.ox) / P.u, (P.oy - y) / P.u] });

  // Capítulo 1: el punto medio es el promedio.  v { k, o }  (o = 1: el origen se mueve)
  const P1 = plano(20, 196, 20), A1 = [2, 6], B1 = [10, 2];
  const medio = (v, K) => {
    const q = k(v), O = P1.P(v.o ? [13, 7] : [1, 1]), A = P1.P(A1), B = P1.P(B1), M = mid(A, B), S = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]];
    let h = papel(K, P1, 15, 8) + K.l(A[0], A[1], B[0], B[1], 'lm gr');
    if (q === 3) h += K.p([O, A, S, B], 'fn') + K.ar(O[0], O[1], S[0], S[1], 'lm gr d');
    h += K.ar(O[0], O[1], A[0], A[1], 'lg gr') + K.ar(O[0], O[1], B[0], B[1], 'lf gr');
    h += K.t((O[0] + A[0]) / 2 - 10, (O[1] + A[1]) / 2, 'a', 's tg', 'end') + K.t((O[0] + B[0]) / 2 + 4, (O[1] + B[1]) / 2 + 16, 'b', 's tf', 'start');
    if (q === 1) h += K.ar(A[0], A[1], B[0], B[1], 'la gr') + K.t(332, 22, 'de A a B: b − a', 's ta', 'end');
    if (q === 2) h += K.ar(A[0], A[1], M[0], M[1], 'la gr') + K.t(332, 22, 'a + ½(b − a)', 's ta', 'end');
    if (q >= 2) h += K.ar(O[0], O[1], M[0], M[1], 'la gr d') + K.c(M[0], M[1], 6, 'fo') + K.t(M[0] + 8, M[1] - 8, 'M', 's ta', 'start');
    if (q === 3) h += K.t(332, 22, 'M = mitad de a + b', 's ta', 'end');
    if (q === 4) h += K.t(332, 22, 'otro origen, el mismo M', 's ta', 'end');
    if (q === 5) h += K.t(332, 22, 'm = ½(a + b)', 's ta', 'end');
    return h + pto(K, O, 'O', -8, 16) + pto(K, A, 'A', -9, -6) + pto(K, B, 'B', 9, -6);
  };
  // Capítulo 1, tu turno: punto medio de A = (3, 1) y B = (11, 7) con el origen en (0, 4).
  const T1A = [3, 1], T1B = [11, 7], T1O = [0, 4];
  const turno1 = (v, K) => {
    const O = P1.P(T1O), A = P1.P(T1A), B = P1.P(T1B), M = P1.P([v.x, v.y]);
    return papel(K, P1, 15, 8) + K.l(A[0], A[1], B[0], B[1], 'lm gr') + K.ar(O[0], O[1], A[0], A[1], 'lg gr') + K.ar(O[0], O[1], B[0], B[1], 'lf gr')
      + K.ar(O[0], O[1], M[0], M[1], 'la gr d') + pto(K, O, 'O', -6, 16) + pto(K, A, 'A', 9, 14) + pto(K, B, 'B', 9, -4);
  };

  // Capítulo 2: dividir en una razón.  v { k, t }: t en octavos
  const RA = [30, 120], RB = [310, 50];
  const enR = t => [RA[0] + (RB[0] - RA[0]) * t, RA[1] + (RB[1] - RA[1]) * t];
  const razon = (v, K) => {
    const q = k(v), t = v.t / 8, P = enR(t);
    let h = K.l(RA[0], RA[1], RB[0], RB[1], 'lm gr');
    if (q >= 2) for (let i = 0; i <= 4; i++) { const Q = enR(i / 4); h += K.l(Q[0], Q[1] - 7, Q[0], Q[1] + 7, 'lm'); }
    h += K.ar(RA[0], RA[1], P[0], P[1], 'la gr') + K.c(P[0], P[1], 6, 'fo') + K.t(P[0], P[1] - 14, 'P', 's ta');
    const pie = ['AP = t · AB, con t entre 0 y 1', `t = ${v.t === 4 ? '½: el punto medio' : '¼: más cerca de A'}`, 'AP : PB = 3 : 1 → 4 partes, AP toma 3', '3 : 1 no es t = 3: t = 3/4', 'p = ¼a + ¾b'][q];
    return h + pto(K, RA, 'A', -2, 22) + pto(K, RB, 'B', 2, 22) + K.t(332, 160, pie, 's tm', 'end');
  };
  // Capítulo 2, tu turno: una cinta de 12 cm cortada con AP : PB = 1 : 2.  v { c } en cm
  const turno2 = (v, K) => {
    const P = enR(v.c / 12);
    let h = K.l(RA[0], RA[1], RB[0], RB[1], 'lm gr');
    for (let i = 0; i <= 12; i++) { const Q = enR(i / 12); h += K.l(Q[0], Q[1] - 5, Q[0], Q[1] + 5, 'lm'); }
    return h + K.ar(RA[0], RA[1], P[0], P[1], 'la gr') + K.c(P[0], P[1], 6, 'fo') + pto(K, RA, 'A', -2, 22) + pto(K, RB, 'B', 2, 22) + K.t(332, 22, `AP = ${v.c} cm de 12`, 's tm', 'end');
  };

  // Capítulo 3: demostrar con flechas.  v { k }: 0–3 el triángulo, 4–5 el paralelogramo
  const TA = [70, 30], TB = [30, 170], TC = [250, 150];
  const demo = (v, K) => {
    const q = k(v);
    if (q >= 4) {
      const A = [40, 170], B = [220, 170], C = [300, 40], D = [120, 40], X = mid(A, C);
      let h = K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], 'lg gr') + K.ar(D[0], D[1], C[0], C[1], 'la gr') + K.ar(A[0], A[1], B[0], B[1], 'la gr');
      if (q === 5) h += K.l(A[0], A[1], C[0], C[1], 'lm d') + K.l(B[0], B[1], D[0], D[1], 'lm d') + K.c(X[0], X[1], 6, 'fo');
      return h + pto(K, A, 'A', -6, 16) + pto(K, B, 'B', 6, 16) + pto(K, C, 'C', 8, 0) + pto(K, D, 'D', -8, 0)
        + K.t(332, 18, q === 4 ? 'AB = DC: b − a = c − d' : 'a + c = b + d', 's ta', 'end');
    }
    const M = mid(TA, TB), N = mid(TA, TC);
    let h = K.p([TA, TB, TC], 'fn') + K.pl([TA, TB, TC, TA], 'lg gr');
    if (q >= 1) h += K.c(M[0], M[1], 5, 'fo') + K.c(N[0], N[1], 5, 'fo') + K.t(M[0] - 8, M[1] + 4, 'M', 's', 'end') + K.t(N[0] + 8, N[1] - 6, 'N', 's', 'start');
    if (q >= 2) h += K.ar(M[0], M[1], N[0], N[1], 'la gr');
    if (q === 3) h += K.ar(TB[0], TB[1], TC[0], TC[1], 'lf gr');
    const pie = ['M y N, puntos medios', 'AM = ½AB, AN = ½AC', 'MN = ½AC − ½AB', 'MN = ½BC'][q];
    return h + pto(K, TA, 'A', 8, -2) + pto(K, TB, 'B', -8, 14) + pto(K, TC, 'C', 8, 14) + K.t(332, 22, pie, 's ta', 'end');
  };

  // Capítulo 4: baricentro, colineales y el cuarto vértice.  v { k }
  const bar = (v, K) => {
    const q = k(v);
    if (q === 3) {
      const A = [40, 150], u = [60, -24], B = [A[0] + u[0], A[1] + u[1]], C = [A[0] + 4 * u[0], A[1] + 4 * u[1]], F = [200, 150];
      return K.l(20, 158, 320, 38, 'lm d') + K.ar(A[0], A[1], B[0], B[1], 'lg gr') + K.ar(A[0], A[1], C[0], C[1], 'la gr d') + pto(K, A, 'A', -2, 22) + pto(K, B, 'B', 2, 22) + pto(K, C, 'C', 2, 22)
        + K.c(F[0], F[1], 4, 'ff') + K.t(F[0] + 8, F[1] + 4, 'F', 's', 'start') + K.t(332, 170, 'AC = 4·AB: en la recta; F no', 's tm', 'end');
    }
    if (q === 4) {
      const A = [40, 160], B = [200, 150], C = [290, 50], D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
      return K.pl([A, B, C], 'lg gr') + K.ar(B[0], B[1], C[0], C[1], 'lf gr') + K.ar(A[0], A[1], D[0], D[1], 'lf gr d') + K.c(D[0], D[1], 6, 'fo')
        + pto(K, A, 'A', -6, 14) + pto(K, B, 'B', 6, 16) + pto(K, C, 'C', 8, 0) + K.t(D[0] - 8, D[1], 'D', 's ta', 'end') + K.t(332, 22, 'AD = BC: d = a + c − b', 's ta', 'end');
    }
    const A = [30, 160], B = [250, 170], C = [150, 30], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    let h = K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'lg gr');
    const Ma = mid(B, C), Mb = mid(A, C), Mc = mid(A, B);
    h += K.l(A[0], A[1], Ma[0], Ma[1], 'lo d') + K.c(Ma[0], Ma[1], 3, 'fk');
    if (q >= 1) h += K.l(B[0], B[1], Mb[0], Mb[1], 'lo d') + K.l(C[0], C[1], Mc[0], Mc[1], 'lo d') + K.c(G[0], G[1], 6, 'fo') + K.t(G[0] + 9, G[1] + 14, 'G', 's ta', 'start');
    if (q === 2) { const T = [A[0] + (Ma[0] - A[0]) * 2 / 3, A[1] + (Ma[1] - A[1]) * 2 / 3]; h += K.l(A[0], A[1], T[0], T[1], 'la gr') + K.t(332, 22, 'AG = ⅔ de la mediana', 's ta', 'end'); }
    const pie = ['la mediana desde A', 'g = ⅓(a + b + c)', ''][q];
    return h + pto(K, A, 'A', -8, 4) + pto(K, B, 'B', 8, 4) + pto(K, C, 'C', 8, -4) + (pie ? K.t(332, 22, pie, 's ta', 'end') : '');
  };
  // Capítulo 4, tu turno: el baricentro de A = (1, 1), B = (10, 1), C = (4, 7).
  const P4 = plano(20, 196, 20), V4 = [[1, 1], [10, 1], [4, 7]];
  const turno4 = (v, K) => {
    const V = V4.map(P4.P), G = P4.P([v.x, v.y]);
    return papel(K, P4, 15, 8) + K.p(V, 'fn') + K.pl([...V, V[0]], 'lg gr') + pto(K, V[0], 'A', -8, 4) + pto(K, V[1], 'B', 8, 4) + pto(K, V[2], 'C', 0, -10) + K.c(G[0], G[1], 5, 'fk');
  };

  // Problema: la fuente del jardín en el cruce de las diagonales.
  const PJ = plano(20, 196, 20), J = [[1, 1], [9, 2], [13, 7], [5, 6]];
  const jardin = (v, K) => {
    const V = J.map(PJ.P), F = PJ.P([v.x, v.y]);
    return papel(K, PJ, 15, 8) + K.p(V, 'fn') + K.pl([...V, V[0]], 'lg gr') + ['A', 'B', 'C', 'D'].map((s, i) => pto(K, V[i], s, i === 1 || i === 2 ? 9 : -9, i < 2 ? 14 : -4)).join('') + K.c(F[0], F[1], 5, 'fk');
  };

  xpLec('geo-10', [
    ['El punto medio',
      xpMira('dibujo', 'Con un **origen** O cada punto se dice con una flecha. Así los teoremas de la geometría se vuelven cuentas con flechas.', { dib: medio, v: { k: 0, o: 0 }, alto: 210 }, [
        ['Pon un origen O donde quieras. La flecha a va de O a A, y la flecha b, de O a B.', {}],
        ['La flecha de A a B es b − a: sumada a la flecha a, llega a b.',{ k: 1 }, '$\\overrightarrow{AB} = \\vec b - \\vec a$'],
        ['Para llegar al punto medio: ve hasta A y recorre la mitad de AB. Eso es a + ½(b − a).', { k: 2 }],
        ['Eso es ½(a + b): media diagonal del paralelogramo de a y b. El punto medio es el promedio.',{ k: 3 }, '$\\vec m = \\tfrac12(\\vec a + \\vec b)$'],
        ['Si cambias el origen, las flechas cambian pero M sigue en el mismo sitio: la cuenta no depende de dónde pusiste O.', { k: 4, o: 1 }],
        ['Por eso se dice que es una prueba sin coordenadas: solo se usan flechas, sumas y mitades.', { k: 5, o: 0 }],
      ], 'Con un origen, el punto medio de AB es el promedio de las flechas: $\\vec m = \\tfrac12(\\vec a + \\vec b)$.'),
      xpHaz('dibujo', 'Las flechas salen de O hacia A y B. Arrastra M hasta el punto medio de AB, donde OM = ½(a + b).', {
        dib: turno1, v: { x: 2, y: 7 }, cumple: v => v.x === 7 && v.y === 4, sol: { x: 7, y: 4 }, alto: 210,
        manijas: [mano(P1, 15, 8, 'M')],
        lee: v => (v.x === 7 && v.y === 4 ? '$\\overrightarrow{AM} = \\overrightarrow{MB}$' : 'Todavía $\\overrightarrow{AM} \\neq \\overrightarrow{MB}$'), pista: 'El punto medio está sobre AB, a la misma distancia de A y de B: busca la mitad de cada recorrido.' },
      'El punto medio de $AB$ es la mitad de $\\vec a + \\vec b$: cae sobre el segmento, a igual distancia de los extremos.')],
    ['Dividir en una razón',
      xpMira('dibujo', 'Un punto del segmento AB se dice con un solo número t: qué parte de la flecha AB hay que recorrer desde A.', { dib: razon, v: { k: 0, t: 3 }, alto: 180 }, [
        ['Cada punto P de AB cumple AP = t·AB, con t de 0 (en A) a 1 (en B).', {},'$\\overrightarrow{AP} = t\\,\\overrightarrow{AB}$'],
        ['Con t = ½ es el punto medio; con t = ¼ queda a un cuarto del camino, más cerca de A.', { k: 1, t: 2 }],
        ['Si AP : PB = 3 : 1, hay 3 + 1 = 4 partes iguales y AP toma 3.',{ k: 2, t: 6 }, '$t = \\tfrac{m}{m + n}$'],
        ['Ojo: 3 : 1 no es t = 3. La razón compara los pedazos; t compara AP con todo AB.',{ k: 3, t: 6 }],
        ['Con un origen, p = (1 − t)a + t·b: pesa más el extremo más cercano a P.',{ k: 4, t: 6 }, '$\\vec p = (1 - t)\\,\\vec a + t\\,\\vec b$'],
      ], 'Si $AP : PB = m : n$, entonces $\\overrightarrow{AP} = \\tfrac{m}{m+n}\\overrightarrow{AB}$.'),
      xpHaz('dibujo', 'Una cinta de 12 cm se corta en P con AP : PB = 1 : 2. Desliza el corte hasta ese punto.', {
        dib: turno2, v: { c: 9 }, metas: { c: 4 }, alto: 200,
        manijas: [{ k: 'c', min: 0, max: 12, paso: 1, et: 'AP en cm' }],
        lee: v => `$\\overrightarrow{AP} = \\tfrac{${v.c}}{12}\\,\\overrightarrow{AB}$`, pista: '1 : 2 da 1 + 2 = 3 partes iguales; AP es una de ellas.' },
      'La cinta queda en 3 partes de 4 cm: $AP = 4$ cm y $t = \\tfrac13$.')],
    ['Demostrar con flechas',
      xpMira('dibujo', 'Dos teoremas de la geometría salen en una línea si se escriben con flechas.', { dib: demo, v: { k: 0 }, alto: 190 }, [
        ['Teorema: el segmento que une los puntos medios de dos lados de un triángulo es paralelo al tercero y mide la mitad.', {}],
        ['M es el punto medio de AB y N el de AC, así que AM = ½AB y AN = ½AC.', { k: 1 }],
        ['MN es la flecha de A a N menos la de A a M: ½AC − ½AB.',{ k: 2 }, '$\\overrightarrow{MN} = \\overrightarrow{AN} - \\overrightarrow{AM}$'],
        ['Eso es ½(AC − AB) = ½BC. MN es un múltiplo de BC: son paralelos, y MN mide la mitad.', { k: 3 }, '$\\overrightarrow{MN} = \\tfrac12\\overrightarrow{BC}$'],
        ['En un paralelogramo ABCD, AB = DC como flechas. Con el origen: b − a = c − d.', { k: 4 }],
        ['Se reordena: a + c = b + d. Mitad y mitad: las dos diagonales tienen el mismo punto medio.',{ k: 5 }, '$\\tfrac12(\\vec a + \\vec c) = \\tfrac12(\\vec b + \\vec d)$'],
      ], 'Con flechas: $\\overrightarrow{MN} = \\tfrac12\\overrightarrow{BC}$ y $\\vec a + \\vec c = \\vec b + \\vec d$.'),
      xpHaz('fichas', 'En el triángulo, M y N son los puntos medios de AB y AC. Completa: MN = ½AC − ½AB, que es…', {
        slots: [{ x: 250, y: 60, w: 100, h: 40 }], alto: 120,
        fondo: K => K.p([[40, 20], [20, 100], [160, 90]], 'fn') + K.pl([[40, 20], [20, 100], [160, 90], [40, 20]], 'lg gr') + K.ar(30, 60, 100, 55, 'la gr') + K.t(190, 66, 'MN =', 's', 'start'),
        fichas: ['½BC', 'BC', '½CB', '½(AB + AC)'], meta: ['½BC'], pista: 'Saca ½ de factor común: queda ½(AC − AB). ¿Qué flecha es AC − AB?' },
      '$\\overrightarrow{MN} = \\tfrac12(\\overrightarrow{AC} - \\overrightarrow{AB}) = \\tfrac12\\overrightarrow{BC}$.')],
    ['Baricentro y alineados',
      xpMira('dibujo', 'Tres vértices tienen su **promedio**, el baricentro; y tres puntos en fila tienen flechas que son múltiplos.', { dib: bar, v: { k: 0 }, alto: 190 }, [
        ['Una mediana va de un vértice al punto medio del lado de enfrente. Un triángulo tiene tres.', {}],
        ['El baricentro G es el promedio de los vértices. Una placa triangular se equilibra en ese punto.',{ k: 1 }, '$\\vec g = \\tfrac13(\\vec a + \\vec b + \\vec c)$'],
        ['Sobre cada mediana, G queda a dos tercios del vértice y a un tercio del punto medio.', { k: 2 }],
        ['A, B y C están en una recta si AC = k·AB para algún número k.',{ k: 3 }, '$\\overrightarrow{AC} = k\\,\\overrightarrow{AB}$'],
        ['Si A, B, C son vértices seguidos del paralelogramo ABCD, el cuarto cumple AD = BC.',{ k: 4 }, '$\\vec d = \\vec a + \\vec c - \\vec b$'],
      ], 'Baricentro $\\tfrac13(\\vec a + \\vec b + \\vec c)$; alineados si $\\overrightarrow{AC} = k\\overrightarrow{AB}$.'),
      xpHaz('dibujo', 'Arrastra G al baricentro del triángulo ABC: el punto donde se cortarían sus tres medianas.', {
        dib: turno4, v: { x: 12, y: 7 }, cumple: v => v.x === 5 && v.y === 3, sol: { x: 5, y: 3 }, alto: 210,
        manijas: [mano(P4, 15, 8, 'G')],
        lee: v => (v.x === 5 && v.y === 3 ? 'G es el promedio de A, B y C' : 'Todavía no es el promedio de los tres vértices'), pista: 'Busca el punto medio de un lado y recorre dos tercios de la mediana desde el vértice de enfrente.' },
      'El promedio de los vértices cae a dos tercios de cada mediana: ahí la placa se equilibra.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un jardín tiene forma de paralelogramo ABCD. La fuente va donde se cortan las diagonales. Arrastra F hasta ese punto.', {
        dib: jardin, v: { x: 12, y: 2 }, cumple: v => v.x === 7 && v.y === 4, sol: { x: 7, y: 4 }, alto: 210,
        manijas: [mano(PJ, 15, 8, 'F')],
        lee: v => (v.x === 7 && v.y === 4 ? 'F es el punto medio de AC y de BD' : 'F todavía no es el punto medio de las diagonales'), pista: 'Las diagonales se cortan en su punto medio: busca la mitad de AC, que es la misma de BD.' },
      'Como $\\vec a + \\vec c = \\vec b + \\vec d$, el punto medio de $AC$ es el de $BD$: la fuente va en $\\tfrac12(\\vec a + \\vec c)$.')],
  ], 'Con flechas desde un origen: punto medio $\\tfrac12(\\vec a + \\vec b)$ y baricentro $\\tfrac13(\\vec a + \\vec b + \\vec c)$.');
}
