// Geometría Vectorial · explicación de geo-1 «Sistemas 2×2 y 3×3 y su geometría» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: cada ecuación es una recta (o un plano) y resolver es hallar lo común. Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  // Plano cartesiano con su rejilla: B = { x0, x1, y0, y1 }, origen en (ox, oy), u píxeles por unidad.
  const pl = (B, ox, oy, u) => ({ ...B, X: x => ox + x * u, Y: y => oy - y * u });
  const rej = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    const yx = P.y0 < 0 ? P.Y(0) + 13 : P.Y(P.y0) + 13, xy = P.x0 < 0 ? P.X(0) - 5 : P.X(P.x0) - 5;
    for (let x = P.x0; x <= P.x1; x++) if (x && x % 2 === 0) h += K.t(P.X(x), yx, sg(x), 's tm');
    for (let y = P.y0; y <= P.y1; y++) if (y && y % 2 === 0) h += K.t(xy, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h;
  };
  // Recta ax + by = c recortada al cuadro del plano.
  const rec = (K, P, a, b, c, cls) => {
    const q = [], m = (x, y) => { if (x >= P.x0 - 1e-9 && x <= P.x1 + 1e-9 && y >= P.y0 - 1e-9 && y <= P.y1 + 1e-9) q.push([x, y]); };
    if (Math.abs(b) > 1e-9) { m(P.x0, (c - a * P.x0) / b); m(P.x1, (c - a * P.x1) / b); }
    if (Math.abs(a) > 1e-9) { m((c - b * P.y0) / a, P.y0); m((c - b * P.y1) / a, P.y1); }
    let s = null, d = 0;
    q.forEach(u => q.forEach(w => { const e = Math.hypot(u[0] - w[0], u[1] - w[1]); if (e > d + 1e-9) { d = e; s = [u, w]; } }));
    return s ? K.l(P.X(s[0][0]), P.Y(s[0][1]), P.X(s[1][0]), P.Y(s[1][1]), cls) : '';
  };

  // 1 · una ecuación, una recta
  const P1 = pl({ x0: 0, x1: 9, y0: 0, y1: 6 }, 30, 190, 26);
  const PTS = [[8, 0], [4, 2], [0, 4], [2, 3], [6, 1]];
  const una = (v, K) => rej(K, P1) + PTS.map(([x, y], k) => (k < v.n ? K.c(P1.X(x), P1.Y(y), 5, 'fA') : '')).join('')
    + K.f(v.r1, rec(K, P1, 1, 2, 8, 'la gr') + K.t(332, 16, 'x + 2y = 8', 's ta', 'end'))
    + K.f(v.r2, rec(K, P1, 1, -1, 2, 'lg gr') + K.t(332, 34, 'x − y = 2', 's tg', 'end'))
    + K.f(v.z, K.c(P1.X(4), P1.Y(2), 9, 'fo') + K.t(P1.X(4) + 12, P1.Y(2) + 20, '(4, 2)', 's to', 'start'));

  // 2 · tres casos: x + y = 4 contra otra recta
  const P2 = pl({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 124, 22);
  const OTRA = { uno: [1, -1, 0, 'x − y = 0', 'se cortan: una solución'], par: [2, 2, -2, '2x + 2y = −2', 'paralelas: ninguna solución'], misma: [2, 2, 8, '2x + 2y = 8', 'la misma recta: infinitas'] };
  const casos = (v, K) => { const o = OTRA[v.caso]; return rej(K, P2) + rec(K, P2, 1, 1, 4, 'la gr') + rec(K, P2, o[0], o[1], o[2], v.caso === 'misma' ? 'lf gr d' : 'lf gr')
    + K.t(8, 16, 'x + y = 4', 's ta', 'start') + K.t(332, 16, o[3], 's tf', 'end') + K.t(170, 228, o[4], 's tm') + (v.caso === 'uno' ? K.c(P2.X(2), P2.Y(2), 6, 'fo') : ''); };
  const P2b = pl({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 120, 22);

  // 3 · eliminar: E₂ + k·E₁ gira alrededor del cruce
  const elim = (v, K) => { const r = [2 + v.k, -1 + v.k, 1 + 5 * v.k]; return rej(K, P2) + rec(K, P2, 1, 1, 5, 'lg') + rec(K, P2, 2, -1, 1, 'la')
    + K.t(8, 16, 'E₁: x + y = 5', 's tg', 'start') + K.t(332, 16, 'E₂: 2x − y = 1', 's ta', 'end')
    + K.f(v.r, rec(K, P2, ...r, 'lf gr') + K.t(170, 228, v.k > 0.99 ? 'E₂ + E₁:  3x = 6' : 'E₂ + k·E₁', 's tf'))
    + K.c(P2.X(2), P2.Y(3), 5, 'fk') + K.f(v.y, K.t(P2.X(2) + 10, P2.Y(3) - 8, '(2, 3)', 's to', 'start')); };
  const elim2 = (v, K) => { const r = [1 + 2 * v.k, 3 + v.k, 5 + 5 * v.k]; return rej(K, P2b) + rec(K, P2b, 2, 1, 5, 'lg') + rec(K, P2b, 1, 3, 5, 'la')
    + (r[0] || r[1] ? rec(K, P2b, ...r, 'lf gr') : '') + K.c(P2b.X(2), P2b.Y(1), 5, 'fk')
    + K.t(8, 14, 'E₁: 2x + y = 5', 's tg', 'start') + K.t(332, 14, 'E₂: x + 3y = 5', 's ta', 'end'); };

  // 4 · tres incógnitas: un sistema escalonado y las posiciones de tres planos
  const FILAS = [['x + 2y − z = 2', 'x = 1'], ['y + z = 5', 'y = 2'], ['2z = 6', 'z = 3']];
  const esquina = (K, c) => { const [x, y] = c, q = (a, b) => [x + a, y + b]; return K.p([c, q(0, -32), q(-28, -20), q(-28, 12)], 'fa') + K.p([c, q(0, -32), q(28, -20), q(28, 12)], 'fg') + K.p([c, q(-28, 12), q(0, 24), q(28, 12)], 'ff') + K.c(x, y, 4, 'fk'); };
  const libro = (K, [x, y]) => [[-30, 8], [30, 8], [-6, 18]].map(([dx, dy], i) => K.p([[x, y - 28], [x, y + 18], [x + dx, y + 18 + dy], [x + dx, y - 28 + dy]], ['fa', 'fg', 'ff'][i])).join('') + K.l(x, y - 28, x, y + 18, 'lf gr');
  const tunel = (K, [x, y]) => { const F = [[x - 30, y + 18], [x + 22, y + 18], [x - 4, y - 24]], B = F.map(([a, b]) => [a + 12, b - 10]); return K.p(B, 'fn') + F.map((u, i) => K.p([u, F[(i + 1) % 3], B[(i + 1) % 3], B[i]], ['fa', 'fg', 'ff'][i])).join(''); };
  const tres = (v, K) => FILAS.map(([e, s], i) => K.t(30, 34 + i * 30, e, '', 'start') + K.f(v.n - (2 - i), K.t(250, 34 + i * 30, s, 'to', 'start'))).join('')
    + K.f(v.f, esquina(K, [62, 168]) + libro(K, [170, 168]) + tunel(K, [278, 168]) + K.t(62, 222, 'un punto', 's') + K.t(170, 222, 'una recta', 's') + K.t(278, 222, 'ninguno', 's'));

  // Problema: dos recibos, dos rectas, un punto
  const P5 = pl({ x0: 0, x1: 6, y0: 0, y1: 6 }, 40, 180, 24);
  const pan = (v, K) => { const a = 3 * v.p + 2 * v.j, b = v.p + 2 * v.j;
    return rej(K, P5) + rec(K, P5, 3, 2, 12, 'la') + rec(K, P5, 1, 2, 8, 'lg') + K.c(P5.X(v.p), P5.Y(v.j), 7, 'fA') + K.t(P5.X(6) + 4, P5.Y(0) - 5, 'pan', 's tm', 'start') + K.t(P5.X(0) + 6, P5.Y(6) + 4, 'jugo', 's tm', 'start')
      + K.t(332, 70, `3·${v.p} + 2·${v.j} = ${a}`, a === 12 ? 'to' : 'tf', 'end') + K.t(332, 90, 'debe dar 12', 's tm', 'end')
      + K.t(332, 126, `${v.p} + 2·${v.j} = ${b}`, b === 8 ? 'to' : 'tf', 'end') + K.t(332, 146, 'debe dar 8', 's tm', 'end'); };

  xpLec('geo-1', [
    ['Una ecuación, una recta',
      xpMira('dibujo', 'Una ecuación con dos incógnitas tiene **muchas** soluciones, y juntas dibujan algo.', { dib: una, v: { n: 0, r1: 0, r2: 0, z: 0 }, alto: 220 }, [
        ['La ecuación x + 2y = 8 la cumplen muchos pares. Por ejemplo (8, 0): ocho más cero da ocho.', { n: 1 }, '$8 + 2 \\cdot 0 = 8$'],
        ['También (4, 2), (0, 4), (2, 3) y (6, 1). Mira dónde caen en el plano.', { n: 5 }, '$4 + 2 \\cdot 2 = 8$'],
        ['Todos quedan en fila: las soluciones de una ecuación lineal forman una recta.', { r1: 1 }],
        ['Otra condición, x − y = 2, es otra recta del mismo plano.', { r2: 1 }, '$x - y = 2$'],
        ['Resolver el sistema es buscar el punto que está en las dos rectas: el cruce.', { z: 1 }, '$4 + 2 \\cdot 2 = 8 \\quad 4 - 2 = 2$'],
        ['Ese punto cumple las dos ecuaciones a la vez. Por eso es la solución del sistema.', {}],
      ], 'Una ecuación $ax + by = c$ es una recta; la solución de un sistema es el punto común de sus rectas.'),
      xpHaz('dibujo', 'Arrastra el punto hasta un lugar que cumpla $2x + y = 6$.', { dib: (v, K) => rej(K, P1) + K.t(332, 16, `2·${v.x} + ${v.y} = ${2 * v.x + v.y}`, 2 * v.x + v.y === 6 ? 'to' : 'ta', 'end'), v: { x: 5, y: 5 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [9, 6], paso: 1, en: v => [P1.X(v.x), P1.Y(v.y)], de: (x, y) => [(x - 30) / 26, (190 - y) / 26] }],
        cumple: v => 2 * v.x + v.y === 6, sol: { x: 2, y: 2 }, lee: v => `$2 \\cdot ${v.x} + ${v.y} = ${2 * v.x + v.y}$`,
        dice: v => (2 * v.x + v.y === 6 ? 'Cumple. Y no es el único: todos los puntos de esa recta cumplen.' : `Da ${2 * v.x + v.y}; tiene que dar 6.`) },
        'Cumplen $(0, 6)$, $(1, 4)$, $(2, 2)$ y $(3, 0)$: todos en la misma recta.')],
    ['Tres casos',
      xpMira('dibujo', 'Dos rectas del plano solo pueden hacer **tres** cosas.', { dib: casos, v: { caso: 'uno' }, alto: 236 }, [
        ['Pueden cortarse en un solo punto: el sistema tiene una solución.', { caso: 'uno' }, '$x + y = 4,\\; x - y = 0 \\;\\Rightarrow\\; (2, 2)$'],
        ['O tener la misma inclinación y no tocarse nunca: paralelas, ninguna solución.', { caso: 'par' }],
        ['O ser la misma recta escrita de otra forma: infinitas soluciones.', { caso: 'misma' }, '$2x + 2y = 8$ es $x + y = 4$'],
        ['¿Cómo saberlo sin dibujar? Divide coeficiente entre coeficiente.', { caso: 'par' }, '$\\tfrac{1}{2} = \\tfrac{1}{2} \\neq \\tfrac{4}{-2}$'],
        ['Si x e y no van en la misma proporción, se cruzan. Si van, decide el término de la derecha.', { caso: 'uno' }, '$\\tfrac{1}{1} \\neq \\tfrac{1}{-1}$'],
      ], 'Coeficientes no proporcionales: un punto. Proporcionales: paralelas, o la misma recta si también lo es el término.'),
      xpHaz('dibujo', 'La recta fija es $x - 2y = 2$. Elige $c$ para que $3x - 6y = c$ dé **infinitas** soluciones.', { dib: (v, K) => rej(K, P2b) + rec(K, P2b, 1, -2, 2, 'la gr') + rec(K, P2b, 3, -6, v.c, 'lf gr d')
        + K.t(8, 14, 'x − 2y = 2', 's ta', 'start') + K.t(332, 14, `3x − 6y = ${sg(v.c)}`, 's tf', 'end'), v: { c: 0 }, metas: { c: 6 }, alto: 262,
        manijas: [{ k: 'c', min: -6, max: 12, paso: 1, et: 'c, el término de la derecha' }],
        lee: v => `$3x - 6y = ${v.c}$ entre 3: $x - 2y = \\tfrac{${v.c}}{3}$`,
        dice: v => (v.c === 6 ? 'Las dos son la misma recta: infinitas soluciones.' : 'Paralelas y distintas: no hay solución.') },
        '$3x - 6y = 6$ es $x - 2y = 2$ multiplicada por 3: la misma recta.')],
    ['Eliminar una incógnita',
      xpMira('dibujo', 'Truco para no adivinar el cruce: **sumar** ecuaciones.', { dib: elim, v: { k: 0, r: 0, y: 0 }, alto: 236 }, [
        ['Dos ecuaciones, x + y = 5 y 2x − y = 1, se cruzan en un punto que aún no conocemos.', {}],
        ['Si un punto cumple las dos, también cumple su suma. Sumar da otra recta.', { r: 1 }],
        ['Al ir sumando, la recta nueva gira, pero siempre pasa por el mismo cruce.', { k: 1 }, '$(2x - y) + (x + y) = 1 + 5$'],
        ['La suma es 3x = 6: la y desapareció y la recta quedó vertical, en x = 2.', {}, '$3x = 6 \\;\\Rightarrow\\; x = 2$'],
        ['Con x = 2 en la primera, 2 + y = 5, así que y = 3. El cruce es (2, 3).', { y: 1 }, '$2 + y = 5 \\;\\Rightarrow\\; y = 3$'],
      ], 'Sumar a una ecuación un múltiplo de otra da una recta por el mismo punto; con el múltiplo justo se va una incógnita.'),
      xpHaz('dibujo', 'Con $2x + y = 5$ ($E_1$) y $x + 3y = 5$ ($E_2$), elige cuántas veces sumar $E_1$ a $E_2$ para que **desaparezca la y**.', { dib: elim2, v: { k: 1 }, metas: { k: -3 }, alto: 262,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k: veces que se suma E₁' }],
        lee: v => `$E_2 + (${v.k})E_1$: $${1 + 2 * v.k}x + ${3 + v.k}y = ${5 + 5 * v.k}$`,
        dice: v => (3 + v.k === 0 ? `Queda ${sg(1 + 2 * v.k)}x = ${sg(5 + 5 * v.k)}: la y desapareció.` : 'La y sigue ahí: su coeficiente todavía no es cero.') },
        '$k = -3$: $-5x = -10$, $x = 2$; y con $2 \\cdot 2 + y = 5$, $y = 1$.')],
    ['Tres incógnitas',
      xpMira('dibujo', 'Con x, y, z la idea es la misma, pero en el espacio.', { dib: tres, v: { n: 0, f: 0 }, alto: 236 }, [
        ['Con tres incógnitas, una ecuación como x + 2y − z = 2 ya no es una recta: es un plano.', {}],
        ['Este sistema es escalonado: cada renglón tiene una incógnita menos que el de arriba.', {}],
        ['Se empieza por abajo: 2z = 6, así que z = 3.', { n: 1 }, '$z = 3$'],
        ['Subiendo: el segundo da y = 2, y el primero, x = 1.', { n: 3 }, '$x = 2 - 4 + 3 = 1$'],
        ['La solución (1, 2, 3) es el único punto que está en los tres planos.', {}],
        ['Tres planos pueden cruzarse en un punto, compartir una recta, ser el mismo plano o no tener nada en común.', { f: 1 }],
      ], 'Una ecuación en x, y, z es un plano; un sistema escalonado se resuelve de abajo hacia arriba.'),
      xpHaz('fichas', 'Sistema escalonado: resuelve de abajo hacia arriba y arrastra cada valor junto a su incógnita.', {
        slots: [{ x: 268, y: 126, w: 70, h: 40 }, { x: 268, y: 78, w: 70, h: 40 }, { x: 268, y: 30, w: 70, h: 40 }],
        fichas: ['3', '2', '1', '5', '−1'], meta: ['3', '2', '1'], alto: 152,
        fondo: K => [['x − y + z = 2', 'x ='], ['2y + z = 7', 'y ='], ['z = 3', 'z =']].map(([e, s], i) => K.t(14, 35 + i * 48, e, '', 'start') + K.t(226, 35 + i * 48, s, 'ta', 'end')).join('') },
        '$z = 3$; $2y + 3 = 7$ da $y = 2$; $x - 2 + 3 = 2$ da $x = 1$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En una panadería, 3 panes y 2 jugos cuestan 12 mil, y 1 pan y 2 jugos, 8 mil. Ajusta los dos **precios** (en miles).', { dib: pan, v: { p: 5, j: 1 }, metas: { p: 2, j: 3 }, alto: 290,
        manijas: [{ k: 'p', min: 0, max: 6, paso: 1, et: 'pan' }, { k: 'j', min: 0, max: 6, paso: 1, et: 'jugo' }],
        lee: v => `$3 \\cdot ${v.p} + 2 \\cdot ${v.j} = ${3 * v.p + 2 * v.j}$ y $${v.p} + 2 \\cdot ${v.j} = ${v.p + 2 * v.j}$`,
        dice: v => { const a = 3 * v.p + 2 * v.j === 12, b = v.p + 2 * v.j === 8; return a && b ? 'Los dos recibos cuadran: es el punto común de las dos rectas.' : a ? 'El primer recibo cuadra; el segundo no.' : b ? 'El segundo recibo cuadra; el primero no.' : 'Ninguno de los dos recibos cuadra todavía.'; } },
        'Restando los recibos: $2p = 4$, $p = 2$ mil; y $2 + 2j = 8$, $j = 3$ mil.')],
  ], 'Cada ecuación es una recta o un plano; resolver es hallar lo común, y eliminar o sustituir es el camino para llegar.');
}
