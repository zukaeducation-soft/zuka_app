// Geometría Vectorial · explicación de geo-9 «Vectores libres y sus operaciones» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: un vector es una flecha que se traslada; sumar es encadenar, restar es ir de punta a punta, un escalar
// estira o voltea, y la ley del coseno mide la suma. Sin coordenadas (geo-11). Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const pl = (B, ox, oy, u) => ({ ...B, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const sum = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const rot = (K, A, B, s, cls, lado = 1) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    return K.t((A[0] + B[0]) / 2 + lado * dy / L * 13, (A[1] + B[1]) / 2 - lado * dx / L * 13 + 4, s, `s ${cls}`);
  };
  const fl = (K, A, B, cls, s, tc, lado) => K.ar(A[0], A[1], B[0], B[1], cls) + (s ? rot(K, A, B, s, tc, lado) : '');
  const sg = n => String(n).replace('-', '−');

  // 1 · una flecha con rumbo: magnitud, dirección, sentido, vector libre, opuesto y nulo
  const A1 = [96, 150], U1 = 22;
  const at = (c, m, g) => [c[0] + m * U1 * Math.cos(g * R), c[1] - m * U1 * Math.sin(g * R)];
  const rumbo = (v, K) => {
    const B = at(A1, 3 * v.m, 30);
    let h = K.l(A1[0], A1[1], A1[0] + 90, A1[1], 'lm d') + K.c(A1[0], A1[1], 4, 'fk') + K.t(A1[0] - 8, A1[1] + 14, 'A', 's', 'end');
    h += K.ar(A1[0], A1[1], B[0], B[1], 'la gr') + K.f(v.m, K.t(B[0] + 6, B[1] - 4, 'B', 's', 'start'));
    h += K.f(v.mag, rot(K, A1, B, '3', 'ta', 1)) + K.f(v.arc, K.arc(A1[0], A1[1], 30, 0, 30, 'la') + K.t(A1[0] + 46, A1[1] - 6, '30°', 's ta', 'start'));
    h += K.f(v.cp, [[[180, 70]], [[210, 200]], [[40, 60]]].map(([c]) => K.ar(c[0], c[1], ...at(c, 3, 30), 'lg gr')).join('') + K.t(250, 60, 'el mismo u', 's tg', 'start'));
    const Q = [312, 128];
    return h + K.f(v.op, K.ar(Q[0], Q[1], ...at(Q, 3, 210), 'lf gr') + K.t(Q[0] - 24, Q[1] + 48, '−u', 's tf'))
      + K.f(v.nul, K.c(300, 210, 5, 'fA') + K.t(290, 214, 'nulo', 's tm', 'end'));
  };
  const RH = { x: 170, y: 124, u: 24 };
  const pRh = v => [RH.x + v.m * RH.u * Math.cos(v.g * R), RH.y - v.m * RH.u * Math.sin(v.g * R)];
  const rueda = (v, K) => {
    let h = '';
    for (let k = 1; k <= 4; k++) h += K.arc(RH.x, RH.y, k * RH.u, 0, 360, 'ls');
    h += K.l(RH.x, RH.y, RH.x + 4 * RH.u + 8, RH.y, 'lm d') + K.t(RH.x + 4 * RH.u + 12, RH.y + 4, '0°', 's tm', 'start') + K.t(RH.x, RH.y - 4 * RH.u - 8, '90°', 's tm')
      + K.t(RH.x - 4 * RH.u - 10, RH.y + 4, '180°', 's tm', 'end') + K.t(RH.x, RH.y + 4 * RH.u + 18, '270°', 's tm');
    const T = pRh(v);
    return h + K.c(RH.x, RH.y, 4, 'fk') + K.ar(RH.x, RH.y, T[0], T[1], 'la gr') + K.t(8, 18, `${v.g}°, magnitud ${v.m}`, 's ta', 'start');
  };

  // 2 · sumar es encadenar
  const P2a = pl({ x0: 0, x1: 14, y0: 0, y1: 8 }, 16, 206, 22);
  const OU = [1, 1], UU = [4, 1], VV = [1, 3], VL = [9, 4];
  const sumar = (v, K) => {
    const O = P2(P2a, OU), Ut = P2(P2a, sum(OU, UU)), c = [VL[0] + (OU[0] + UU[0] - VL[0]) * v.tr, VL[1] + (OU[1] + UU[1] - VL[1]) * v.tr], Vc = P2(P2a, c), Vt = P2(P2a, sum(c, VV)), S = P2(P2a, sum(sum(OU, UU), VV));
    let h = pap(K, P2a) + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end');
    h += K.f(v.par, K.ar(O[0], O[1], ...P2(P2a, sum(OU, VV)), 'lf d') + K.ar(...P2(P2a, sum(OU, VV)), ...S, 'lg d'));
    h += fl(K, O, Ut, 'lg gr', 'u', 'tg', -1) + fl(K, Vc, Vt, 'lf gr', 'v', 'tf', -1);
    return h + K.f(v.s, fl(K, O, S, 'la gr', 'u + v', 'ta', 1));
  };
  const HA = { O: [2, 3], a: [3, -1], b: [2, 4], La: [9, 7], Lb: [11, 1] };
  const finH = sum(sum(HA.O, HA.a), HA.b);
  const hazSuma = (v, K) => {
    const O = P2(P2a, HA.O), F = P2(P2a, [v.x, v.y]);
    return pap(K, P2a) + fl(K, P2(P2a, HA.La), P2(P2a, sum(HA.La, HA.a)), 'lg gr', 'a', 'tg') + fl(K, P2(P2a, HA.Lb), P2(P2a, sum(HA.Lb, HA.b)), 'lf gr', 'b', 'tf')
      + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end') + (v.x !== HA.O[0] || v.y !== HA.O[1] ? K.ar(O[0], O[1], F[0], F[1], 'la gr d') : '');
  };

  // 3 · restar y estirar
  const P3 = pl({ x0: 0, x1: 14, y0: 0, y1: 8 }, 16, 206, 22);
  const O3 = [1, 3], U3 = [5, 1], V3 = [2, 4], W3 = [2, 1], C3 = [10, 4];
  const resta = (v, K) => {
    const O = P2(P3, O3), Ut = P2(P3, sum(O3, U3)), Vt = P2(P3, sum(O3, V3)), Mv = P2(P3, sum(sum(O3, U3), [-V3[0], -V3[1]]));
    let h = pap(K, P3) + K.c(O[0], O[1], 4, 'fk') + fl(K, O, Ut, 'lg gr', 'u', 'tg', -1) + fl(K, O, Vt, 'lf gr', 'v', 'tf', 1);
    h += K.f(v.op, fl(K, Ut, Mv, 'lf d', '−v', 'tf', 1) + K.ar(O[0], O[1], Mv[0], Mv[1], 'la d'));
    h += K.f(v.d, fl(K, Vt, Ut, 'la gr', 'u − v', 'ta', 1));
    const C = P2(P3, C3), E = P2(P3, [C3[0] + v.k * W3[0], C3[1] + v.k * W3[1]]), Wt = P2(P3, sum(C3, W3));
    return h + K.f(v.kw, K.c(C[0], C[1], 4, 'fk') + K.ar(C[0], C[1], Wt[0], Wt[1], 'lm gr') + (Math.abs(v.k) > 0.05 ? K.ar(C[0], C[1], E[0], E[1], 'lo gr') : '')
      + K.t(332, 18, `${sg(Math.round(v.k * 10) / 10)}·w`, 's to', 'end') + K.t(Wt[0] + 4, Wt[1] - 8, 'w', 's tm', 'start'));
  };
  const HR = { O: [3, 2], u: [4, 2], v: [1, 3] };
  const hazResta = (v, K) => {
    const O = P2(P3, HR.O), D = P2(P3, [v.x, v.y]);
    return pap(K, P3) + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 14, 'O', 's', 'end') + fl(K, O, P2(P3, sum(HR.O, HR.u)), 'lg gr', 'u', 'tg', -1) + fl(K, O, P2(P3, sum(HR.O, HR.v)), 'lf gr', 'v', 'tf', 1)
      + (v.x !== HR.O[0] || v.y !== HR.O[1] ? K.ar(O[0], O[1], D[0], D[1], 'la gr') + K.t(D[0] + 6, D[1] - 6, 'D', 's ta', 'start') : '');
  };

  // 4 · la medida de una suma: u de 4 y v de 3, con el ángulo θ entre ellos
  const O4 = [60, 178], S4 = 22;
  const medida = (v, K) => {
    const A = [O4[0] + 4 * S4, O4[1]], E = [A[0] + 3 * S4 * Math.cos(v.th * R), A[1] - 3 * S4 * Math.sin(v.th * R)], m = Math.sqrt(25 + 24 * Math.cos(v.th * R));
    let h = K.l(A[0], A[1], A[0] + 60, A[1], 'lm d') + fl(K, O4, A, 'lg gr', 'u: 4', 'tg', -1) + fl(K, A, E, 'lf gr', 'v: 3', 'tf', v.th > 90 ? -1 : 1);
    if (v.th > 1) h += K.arc(A[0], A[1], 18, 0, v.th, 'lf') + K.t(A[0] + 34, A[1] + 16, `θ = ${Math.round(v.th)}°`, 's tf', 'start');
    h += K.f(v.ang * (v.th > 1 && v.th < 179 ? 1 : 0), K.arc(A[0], A[1], 26, v.th, 180, 'la') + K.t(A[0] - 30, A[1] - 22, `${Math.round(180 - v.th)}°`, 's ta', 'end'));
    return h + (m > 0.05 ? K.ar(O4[0], O4[1], E[0], E[1], 'la gr') : '') + K.t(332, 18, `|u + v| = ${(Math.round(m * 100) / 100).toString()}`, 's ta', 'end');
  };
  const HM = { a: 7, b: 15, th: 120, s: 9.5, O: [100, 180] };
  const hazMedida = (v, K) => {
    const { a, b, th, s, O } = HM, A = [O[0] + a * s, O[1]], B = [O[0] + b * s * Math.cos(th * R), O[1] - b * s * Math.sin(th * R)], C = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]];
    return K.l(A[0], A[1], C[0], C[1], 'lm d') + K.l(B[0], B[1], C[0], C[1], 'lm d') + K.ang(O, A, B, 16, '120°', 'fn', 's tm')
      + fl(K, O, A, 'lg gr', '7', 'tg', -1) + fl(K, O, B, 'lf gr', '15', 'tf', 1) + K.ar(O[0], O[1], C[0], C[1], 'la gr') + K.t(C[0] + 8, C[1] - 4, '?', 'ta', 'start')
      + K.t(332, 18, `tu medida: ${v.r}`, 's ta', 'end');
  };

  // Problema: el avión y el viento cruzado
  const avion = (v, K) => {
    const O = [90, 200], N = [90, 80], E = [140, 80];
    return K.ar(O[0], O[1], N[0], N[1], 'lg gr') + rot(K, O, N, '120', 'tg', 1) + K.ar(N[0], N[1], E[0], E[1], 'lf gr') + K.t(115, 70, '50', 's tf')
      + K.pl([[90, 92], [102, 92], [102, 80]], 'lm') + K.ar(O[0], O[1], E[0], E[1], 'la gr d') + K.t(140, 150, '?', 'ta', 'start')
      + K.t(332, 40, 'propia: norte', 's tg', 'end') + K.t(332, 60, 'viento: este', 's tf', 'end') + K.t(332, 96, `${v.r} km/h`, 'ta', 'end');
  };

  xpLec('geo-9', [
    ['Una flecha con rumbo',
      xpMira('dibujo', 'Hay cantidades que no se dicen con un solo número: un desplazamiento necesita **cuánto** y **hacia dónde**.', { dib: rumbo, v: { m: 0, mag: 0, arc: 0, cp: 0, op: 0, nul: 0 }, alto: 236 }, [
        ['Un desplazamiento no es solo «cuánto»: importa hacia dónde. Se dibuja como una flecha de A a B.', { m: 1 }],
        ['Su magnitud es el largo de la flecha: aquí, 3 cuadros, que en el mapa son 3 km.', { mag: 1 }, '$\\|\\overrightarrow{AB}\\| = 3$'],
        ['Su dirección es el ángulo que gira desde la horizontal derecha, contra las agujas del reloj.', { arc: 1 }, '$\\operatorname{dir}(\\overrightarrow{AB}) = 30^{\\circ}$'],
        ['Ese ángulo va de 0° a menos de 360°. El sentido lo marca la punta: va de A hacia B.', {}],
        ['Con la misma magnitud y dirección, dos flechas son el mismo vector u, estén donde estén: un vector libre.', { cp: 1 }],
        ['El opuesto −u mide lo mismo y apunta al revés: 30° + 180° = 210°. El vector nulo no tiene largo.', { op: 1, nul: 1 }, '$\\operatorname{dir}(-\\vec u) = 210^{\\circ}$'],
      ], 'Un vector es una flecha con magnitud, dirección (de 0° a 360°, contra las agujas) y sentido; se puede trasladar.'),
      xpHaz('dibujo', 'Arrastra la punta para dibujar una flecha de magnitud **2** y dirección **300°**.', { dib: rueda, v: { g: 90, m: 3 }, metas: { g: 300, m: 2 }, alto: 248,
        manijas: [{ k: ['g', 'm'], min: [0, 1], max: [345, 4], paso: [15, 1], en: v => pRh(v),
          de: (x, y) => { let g = (Math.atan2(RH.y - y, x - RH.x) / R + 360) % 360; if (g > 352.5) g = 0; return [g, Math.hypot(x - RH.x, y - RH.y) / RH.u]; } }],
        lee: v => `$\\operatorname{dir} = ${v.g}^{\\circ}$, magnitud $${v.m}$`,
        dice: v => (v.g === 300 && v.m === 2 ? 'Justo: 300° es 60° antes de dar la vuelta, abajo a la derecha.' : v.g === 60 ? 'Ese es 60°: giraste con las agujas del reloj.' : v.g === 300 ? 'La dirección está bien; ahora el largo.' : 'Gira desde 0° contra las agujas hasta 300°.') },
        '300° queda a 60° de completar la vuelta: abajo y a la derecha.')],
    ['Sumar es encadenar',
      xpMira('dibujo', 'Primero un tramo y después otro: ¿a dónde se llega? **Sumar** vectores es encadenarlos.', { dib: sumar, v: { tr: 0, s: 0, par: 0 }, alto: 226 }, [
        ['Dos tramos: primero u y después v. La flecha v está suelta, pero se puede trasladar.', {}],
        ['Regla del triángulo: se pone la cola de v en la punta de u.', { tr: 1 }],
        ['La suma u + v va de la primera cola a la última punta: es el desplazamiento total.', { s: 1 }, '$\\vec u + \\vec v$'],
        ['Si primero va v y luego u, se llega al mismo punto: la suma es conmutativa.', { par: 1 }, '$\\vec u + \\vec v = \\vec v + \\vec u$'],
        ['Con las colas juntas, la suma es la diagonal del paralelogramo: la regla del paralelogramo.', {}],
        ['Con más tramos se encadenan todos, y agruparlos de otra forma no cambia el final: es asociativa.', {}, '$(\\vec u + \\vec v) + \\vec w = \\vec u + (\\vec v + \\vec w)$'],
        ['Sumar el nulo no cambia nada, y u más su opuesto vuelve a la salida.', {}, '$\\vec u + \\vec 0 = \\vec u, \\quad \\vec u + (-\\vec u) = \\vec 0$'],
      ], 'Para sumar, la cola del segundo en la punta del primero; la suma va de la primera cola a la última punta.'),
      xpHaz('dibujo', 'Arrastra el punto hasta donde llega $\\vec a + \\vec b$ saliendo de **O**.', { dib: hazSuma, v: { x: 2, y: 3 }, metas: { x: finH[0], y: finH[1] }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [14, 8], paso: 1, en: v => P2(P2a, [v.x, v.y]), de: (x, y) => [(x - 16) / 22, (206 - y) / 22] }],
        lee: v => `Tu flecha de $O$ al punto; $\\vec a + \\vec b$ ${v.x === finH[0] && v.y === finH[1] ? 'llega ahí' : 'llega a otro lado'}`,
        dice: v => (v.x === finH[0] && v.y === finH[1] ? 'Ahí termina: la cola de b va en la punta de a.' : 'Ese no es el final: traslada a desde O y luego b desde la punta de a.') },
        'Desde O se recorre a y desde su punta, b: la suma va de O a la última punta.')],
    ['Restar y estirar',
      xpMira('dibujo', 'Restar es sumar el opuesto, y multiplicar por un número estira, encoge o voltea la flecha.', { dib: resta, v: { op: 0, d: 0, kw: 0, k: 1 }, alto: 226 }, [
        ['Restar es sumar el opuesto: u − v = u + (−v). Se pone −v en la punta de u.', { op: 1 }, '$\\vec u - \\vec v = \\vec u + (-\\vec v)$'],
        ['Con las colas juntas, u − v va de la punta de v a la punta de u.', { d: 1 }],
        ['Se comprueba con la regla del triángulo: v más esa flecha llega a la punta de u.', {}, '$\\vec v + (\\vec u - \\vec v) = \\vec u$'],
        ['Un escalar estira: 2w mide el doble y conserva la dirección y el sentido.', { kw: 1, k: 2 }, '$\\|2\\vec w\\| = 2\\|\\vec w\\|$'],
        ['Con un número entre 0 y 1 se encoge: la mitad de w mide la mitad.', { k: 0.5 }],
        ['Con un número negativo se voltea: −w apunta al revés. Todas son paralelas a w.', { k: -1 }, '$k\\vec w \\parallel \\vec w$'],
      ], 'u − v va de la punta de v a la de u; k·u estira o encoge, y si k < 0 voltea: k·u es paralelo a u.'),
      xpHaz('dibujo', 'Arrastra **D** para que la flecha de **O** a **D** sea $\\vec u - \\vec v$.', { dib: hazResta, v: { x: 3, y: 2 }, metas: { x: 6, y: 1 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [14, 8], paso: 1, en: v => P2(P3, [v.x, v.y]), de: (x, y) => [(x - 16) / 22, (206 - y) / 22] }],
        lee: v => (v.x === 6 && v.y === 1 ? '$\\vec v + \\overrightarrow{OD} = \\vec u$' : 'La flecha de $O$ a $D$ todavía no es $\\vec u - \\vec v$'),
        dice: v => (v.x === 6 && v.y === 1 ? 'Sí: es la flecha de la punta de v a la de u, trasladada a O.' : v.x === 0 && v.y === 3 ? 'Esa es v − u: apunta al revés.' : 'Busca la flecha que va de la punta de v a la de u y trasládala a O.') },
        'u − v es la flecha de la punta de v a la punta de u; trasladada a O, termina en D.')],
    ['La medida de una suma',
      xpMira('dibujo', '¿Cuánto mide una suma? Depende del **ángulo** entre las flechas.', { dib: medida, v: { th: 90, ang: 0 }, alto: 226 }, [
        ['Si u y v forman ángulo recto, la suma es la hipotenusa: con 4 y 3, mide 5.', { th: 90 }, '$\\sqrt{4^2 + 3^2} = 5$'],
        ['Si el ángulo θ entre ellas se cierra, la suma se alarga. Con 60° mide más que 5.', { th: 60 }],
        ['En el triángulo de la regla, el ángulo entre los tramos no es θ: es su suplemento, 180° − θ.', { ang: 1 }, '$180^{\\circ} - 60^{\\circ} = 120^{\\circ}$'],
        ['La ley del coseno con ese ángulo da la fórmula de la suma, con un signo más.', {}, '$\\|\\vec u + \\vec v\\|^2 = 16 + 9 + 2 \\cdot 12 \\cos 60^{\\circ} = 37$'],
        ['Si apuntan igual, θ = 0°, las magnitudes se suman: 4 + 3 = 7.', { th: 0, ang: 0 }, '$16 + 9 + 24 = 49$'],
        ['Si apuntan al revés, θ = 180°, se restan: 4 − 3 = 1. La fórmula también lo dice.', { th: 180 }, '$16 + 9 - 24 = 1$'],
      ], 'Con θ entre u y v: |u + v|² = |u|² + |v|² + 2|u||v| cos θ, la ley del coseno con el ángulo 180° − θ.'),
      xpHaz('dibujo', 'Dos vectores de **7** y **15** forman un ángulo de **120°**. Ajusta la magnitud de su suma.', { dib: hazMedida, v: { r: 1 }, metas: { r: 13 }, alto: 248,
        manijas: [{ k: 'r', min: 1, max: 22, paso: 1, et: 'magnitud de la suma' }],
        lee: v => `$49 + 225 + 2 \\cdot 105 \\cos 120^{\\circ} = 169$; tu medida al cuadrado: $${v.r * v.r}$`,
        dice: v => (v.r === 13 ? 'Justo: 49 + 225 − 105 = 169, y su raíz es 13.' : v.r === 22 ? 'Esa es 7 + 15: solo si apuntaran igual.' : 'Calcula 7² + 15² + 2·7·15·cos 120° y saca la raíz.') },
        'cos 120° = −½, así que la suma mide √(49 + 225 − 105) = √169 = 13.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un avión vuela al norte a **120 km/h** respecto al aire y el viento sopla al este a **50 km/h**. Ajusta su rapidez respecto al suelo.', { dib: avion, v: { r: 0 }, metas: { r: 130 }, alto: 260,
        manijas: [{ k: 'r', min: 0, max: 200, paso: 10, et: 'rapidez respecto al suelo, km/h' }],
        lee: v => `$\\sqrt{120^2 + 50^2} = \\sqrt{16\\,900}$; tu valor: $${v.r}$`,
        dice: v => (v.r === 130 ? 'Justo: √(120² + 50²) = 130. El viento lo desvía un poco al este.' : v.r === 170 ? 'Esa es 120 + 50: solo si el viento soplara hacia el norte.' : 'El viento forma ángulo recto con el avión: busca la hipotenusa.') },
        'La velocidad respecto al suelo es la suma de flechas: √(120² + 50²) = 130 km/h.')],
  ], 'Un vector es una flecha libre: se suma encadenando, se resta de punta a punta y la ley del coseno mide la suma.');
}
