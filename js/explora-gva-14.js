// Geometría Vectorial · explicación de geo-14 «Producto escalar» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: el producto escalar mide cuánto empuja una flecha en la dirección de otra (la sombra por la norma); luego la
// cuenta con coordenadas y por qué coincide (ley del coseno), el signo y la perpendicularidad, las propiedades, el ángulo y los
// cosenos directores. Sin proyección (geo-15). Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const fm = n => sg(Math.round(n * 100) / 100);
  const pl = (B, ox, oy, u) => ({ ...B, X: x => ox + x * u, Y: y => oy - y * u });
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), 'ls');
    return h;
  };
  const tu = a => `(${a.map(sg).join(', ')})`;
  const ejes = (K, o, u, L = 4) => {
    let h = '';
    [[[L, 0, 0], 'x'], [[0, L, 0], 'y'], [[0, 0, L], 'z']].forEach(([a, s]) => { const A = K.iso(o, u, ...a); h += K.ar(o[0], o[1], A[0], A[1], 'lm') + K.t(A[0] + (s === 'y' ? -8 : 8), A[1] + 4, s, 's tm', s === 'y' ? 'end' : 'start'); });
    return h;
  };

  // 1 · cuánto se acompañan: la sombra de v sobre la recta de u, por la norma de u
  const O1 = [150, 126];
  const sombra = (v, K) => {
    const s = v.s, U = [O1[0] + v.a * s, O1[1]], V = K.at(O1[0], O1[1], v.b * s, v.th), F = [O1[0] + v.b * s * Math.cos(v.th * R), O1[1]], d = v.a * v.b * Math.cos(v.th * R);
    let h = K.l(16, O1[1], 324, O1[1], 'lm') + K.ar(O1[0], O1[1], U[0], U[1], 'lg gr') + K.t(U[0] + 4, U[1] + 16, `u: ${v.a}`, 's tg', 'end')
      + K.ar(O1[0], O1[1], V[0], V[1], 'lf gr') + K.t(V[0] + 6, V[1] - 6, `v: ${v.b}`, 's tf', 'start') + K.c(O1[0], O1[1], 4, 'fk');
    if (v.th > 1) h += K.arc(O1[0], O1[1], 22, 0, v.th, 'la') + K.t(...K.at(O1[0], O1[1], 36, v.th / 2).map((z, i) => z + (i ? 5 : 0)), `${Math.round(v.th)}°`, 's ta');
    h += K.f(v.sombra, K.l(V[0], V[1], F[0], F[1], 'lm d') + (Math.abs(F[0] - O1[0]) > 2 ? K.l(O1[0], O1[1] + 1, F[0], O1[1] + 1, 'lo gr') : ''));
    const X = w => 40 + (w + v.a * v.b) / (2 * v.a * v.b) * 260, Y = 178;
    return h + K.f(v.val, K.l(40, Y, 300, Y, 'lm') + K.l(X(0), Y - 5, X(0), Y + 5, 'lm') + K.t(40, Y + 16, sg(-v.a * v.b), 's tm') + K.t(300, Y + 16, `${v.a * v.b}`, 's tm')
      + K.c(X(d), Y, 6, d < -1e-9 ? 'ff' : 'fo') + K.t(332, 18, `u · v = ${fm(d)}`, 's ta', 'end'));
  };
  const OH = [170, 168];
  const hazSombra = (v, K) => {
    const s = 26, U = [OH[0] + 2 * s, OH[1]], V = K.at(OH[0], OH[1], 5 * s, v.th);
    let h = K.l(16, OH[1], 324, OH[1], 'lm') + K.ar(OH[0], OH[1], U[0], U[1], 'lg gr') + K.t(U[0], U[1] + 16, 'u: 2', 's tg') + K.ar(OH[0], OH[1], V[0], V[1], 'lf gr') + K.c(OH[0], OH[1], 4, 'fk');
    if (v.th > 1) h += K.arc(OH[0], OH[1], 20, 0, v.th, 'la');
    return h + K.t(8, 18, `θ = ${v.th}°, v: 5`, 's ta', 'start');
  };

  // 2 · la cuenta con coordenadas y por qué coincide: la ley del coseno en el triángulo de u, v y u − v
  const P2 = pl({ x0: 0, x1: 6, y0: 0, y1: 4 }, 30, 176, 34);
  const coord = (v, K) => {
    const O = [P2.X(0), P2.Y(0)], U = [P2.X(4), P2.Y(1)], V = [P2.X(1), P2.Y(3)];
    let h = pap(K, P2) + K.ar(O[0], O[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1] + 4, 'u (4, 1)', 's tg', 'start') + K.ar(O[0], O[1], V[0], V[1], 'lf gr') + K.t(V[0] + 6, V[1] - 4, 'v (1, 3)', 's tf', 'start') + K.c(O[0], O[1], 4, 'fk');
    h += K.f(v.tri, K.ar(V[0], V[1], U[0], U[1], 'la gr d') + K.t((U[0] + V[0]) / 2 + 10, (U[1] + V[1]) / 2 - 6, 'u − v', 's ta', 'start') + K.ang(O, U, V, 22, 'θ', 'fa', 's ta'));
    return h;
  };
  const coordHaz = (v, K) => {
    const a = [2, -1, 3], b = [1, 4, 2];
    let h = K.t(170, 36, `u = ${tu(a)}    v = ${tu(b)}`, 'ta');
    a.forEach((x, i) => { const cx = 70 + 100 * i; h += K.r(cx - 40, 62, 80, 40, 'fn', 8) + K.t(cx, 87, `${x < 0 ? `(${sg(x)})` : x} · ${sg(b[i])}`, 's'); if (i) h += K.t(cx - 50, 87, '+', 'tm'); });
    return h + K.t(170, 136, `tu suma: ${sg(v.d)}`, 'ta');
  };

  // 3 · perpendiculares y propiedades
  const P3 = pl({ x0: -3, x1: 6, y0: -3, y1: 4 }, 112, 116, 24);
  const perp = (v, K) => {
    const O = [P3.X(0), P3.Y(0)], at = q => [P3.X(q[0]), P3.Y(q[1])], U = at([2, 1]), W = at([-1, 2]);
    let h = pap(K, P3) + K.ar(O[0], O[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1] + 4, '(2, 1)', 's tg', 'start') + K.c(O[0], O[1], 4, 'fk');
    h += K.f(v.perp, K.ar(O[0], O[1], W[0], W[1], 'lf gr') + K.t(W[0] - 6, W[1] - 4, '(−1, 2)', 's tf', 'end')
      + K.pl([[O[0] + 9, O[1] - 4.5], [O[0] + 4.5, O[1] - 13.5], [O[0] - 4.5, O[1] - 9]], 'lo'));
    const A = at([2, 4]), B = at([6, -3]);
    return h + K.f(v.k, K.ar(O[0], O[1], A[0], A[1], 'la gr') + K.t(A[0] + 6, A[1] + 4, '(k, 4), k = 2', 's ta', 'start') + K.ar(O[0], O[1], B[0], B[1], 'lm gr') + K.t(B[0] + 6, B[1] - 6, '(6, −3)', 's tm', 'start'));
  };
  const OK = [170, 112];
  const perpHaz = (v, K) => {
    const a = [1, v.k, 3], b = [v.k, 2, -4], A = K.iso(OK, 11, ...a), B = K.iso(OK, 11, ...b);
    return ejes(K, OK, 11, 5) + K.ar(OK[0], OK[1], A[0], A[1], 'lg gr') + K.ar(OK[0], OK[1], B[0], B[1], 'lf gr') + K.c(OK[0], OK[1], 4, 'fk')
      + K.t(8, 18, `u = ${tu(a)}`, 's tg', 'start') + K.t(8, 36, `v = ${tu(b)}`, 's tf', 'start');
  };

  // 4 · el ángulo entre dos vectores y los ángulos directores
  const O4 = [150, 164], U4 = 26;
  const angulo = (v, K) => {
    const I = q => K.iso(O4, U4, ...q);
    let h = ejes(K, O4, U4, 4.6) + K.c(O4[0], O4[1], 4, 'fk');
    if (!v.dir) {
      const U = I([3, 0, 4]), V = I([0, 0, 2]);
      h += K.ar(O4[0], O4[1], U[0], U[1], 'lg gr') + K.t(U[0] + 6, U[1], 'u (3, 0, 4)', 's tg', 'start') + K.ar(O4[0], O4[1], V[0], V[1], 'lf gr') + K.t(V[0] - 10, V[1] + 14, 'v (0, 0, 2)', 's tf', 'end');
    } else {
      const P = I([1, 2, 2]), Pb = I([1, 2, 0]);
      h += K.pl([I([1, 0, 0]), Pb, I([0, 2, 0])], 'lm d') + K.l(Pb[0], Pb[1], P[0], P[1], 'lm d') + K.ar(O4[0], O4[1], P[0], P[1], 'la gr') + K.t(P[0] - 8, P[1] + 2, 'u (1, 2, 2)', 's ta', 'end');
    }
    return h + K.f(v.ejes, K.t(332, 18, 'α con x, β con y, γ con z', 's tm', 'end'));
  };
  const CD = [170, 150], RD = 84;
  const anguloHaz = (v, K) => {
    let h = K.arc(CD[0], CD[1], RD, 0, 180, 'lm') + K.l(CD[0] - RD - 6, CD[1], CD[0] + RD + 6, CD[1], 'lm') + K.t(CD[0] + RD + 4, CD[1] + 16, '0°', 's tm') + K.t(CD[0] - RD - 4, CD[1] + 16, '180°', 's tm') + K.t(CD[0], CD[1] - RD - 8, '90°', 's tm');
    const T = K.at(CD[0], CD[1], RD, v.g);
    h += K.l(CD[0], CD[1], CD[0] + RD * 0.8, CD[1], 'lg gr') + K.t(CD[0] + RD * 0.8, CD[1] - 8, 'eje z', 's tg', 'end') + K.l(CD[0], CD[1], T[0], T[1], 'la gr') + K.c(CD[0], CD[1], 3, 'fk');
    return h + K.t(8, 18, 'u = (1, 0, −1)', 's ta', 'start') + K.t(332, 18, `γ = ${v.g}°`, 's ta', 'end');
  };

  // Problema: la cuenta de una compra es un producto escalar
  const compra = (v, K) => {
    const c = [3, 2, 4], pr = [5, 1, 2], et = ['cuadernos', 'lápices', 'borradores'];
    let h = K.t(8, 18, 'cantidades (3, 2, 4) · precios (5, 1, 2)', 's tm', 'start');
    c.forEach((n, i) => { const cx = 62 + 108 * i; h += K.r(cx - 46, 40, 92, 70, 'fn', 8) + K.t(cx, 62, et[i], 's tm') + K.t(cx, 88, `${n} × ${pr[i]} mil`, 's ta'); });
    return h + K.t(170, 150, `total: ${v.t} mil pesos`, 'ta');
  };

  xpLec('geo-14', [
    ['Cuánto se acompañan dos flechas',
      xpMira('dibujo', 'Un carro avanza por un riel y una cuerda tira de él en diagonal. ¿Cuánto de ese tirón sirve para **avanzar**?', { dib: sombra, v: { a: 4, b: 3, s: 30, th: 30, sombra: 0, val: 0 }, alto: 204 }, [
        ['El riel va en la dirección de u y la cuerda tira según v, con un ángulo θ entre ellas.', {}],
        ['Lo que sirve para avanzar es la sombra de v sobre la recta de u: mide ‖v‖ cos θ.', { sombra: 1 }, '$\\|\\vec v\\|\\cos\\theta$'],
        ['El producto escalar multiplica esa sombra por ‖u‖. El resultado es un número, no una flecha.', { th: 60, val: 1 }, '$\\vec u \\cdot \\vec v = \\|\\vec u\\|\\,\\|\\vec v\\|\\cos\\theta = 4 \\cdot 3 \\cdot \\tfrac12 = 6$'],
        ['A 90° la sombra desaparece y el producto vale 0: dos flechas perpendiculares no se ayudan.', { th: 90 }, '$4 \\cdot 3 \\cos 90^{\\circ} = 0$'],
        ['Pasado 90° la sombra cae hacia atrás y el producto es negativo: el ángulo es obtuso.', { th: 135 }, '$4 \\cdot 3 \\cos 135^{\\circ} \\approx -8.49$'],
        ['Lo más grande es con θ = 0°, y lo más negativo con 180°. Nunca pasa de ‖u‖‖v‖.', { th: 0 }, '$|\\vec u \\cdot \\vec v| \\le \\|\\vec u\\|\\,\\|\\vec v\\|$'],
      ], 'u · v = ‖u‖‖v‖ cos θ: positivo si el ángulo es agudo, 0 si es recto y negativo si es obtuso.'),
      xpHaz('dibujo', 'Si $\\|\\vec u\\| = 2$ y $\\|\\vec v\\| = 5$, gira $\\vec v$ hasta que $\\vec u \\cdot \\vec v = -5$.', { dib: hazSombra, v: { th: 30 }, metas: { th: 120 }, alto: 200,
        manijas: [{ k: 'th', min: 0, max: 180, paso: 15, en: v => [OH[0] + 130 * Math.cos(v.th * R), OH[1] - 130 * Math.sin(v.th * R)],
          de: (x, y) => { const g = Math.atan2(OH[1] - y, x - OH[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
        lee: v => `$\\vec u \\cdot \\vec v = 2 \\cdot 5 \\cos ${v.th}^{\\circ} = ${fm(10 * Math.cos(v.th * R)).replace('−', '-')}$`,
        dice: v => (v.th === 120 ? 'Justo: 10 · cos 120° = 10 · (−½) = −5.' : v.th === 60 ? 'Con 60° da +5: el producto negativo pide un ángulo obtuso.' : 'Busca el ángulo con 10 · cos θ = −5, o sea cos θ = −½.') },
        'Con cos θ = −½ el ángulo es 120°: obtuso, porque el producto es negativo.')],
    ['La cuenta con coordenadas',
      xpMira('dibujo', 'Con coordenadas el producto escalar es una cuenta rápida. Y da **lo mismo** que la fórmula del ángulo.', { dib: coord, v: { tri: 0 }, alto: 200 }, [
        ['Primera coordenada por primera, segunda por segunda, y se suman.', {}, '$(4, 1) \\cdot (1, 3) = 4 \\cdot 1 + 1 \\cdot 3 = 7$'],
        ['¿Por qué coincide con ‖u‖‖v‖ cos θ? Mira el triángulo que forman u, v y u − v.', { tri: 1 }],
        ['La ley del coseno en ese triángulo dice cuánto mide el lado u − v.', {}, '$\\|\\vec u - \\vec v\\|^2 = \\|\\vec u\\|^2 + \\|\\vec v\\|^2 - 2\\|\\vec u\\|\\|\\vec v\\|\\cos\\theta$'],
        ['Con coordenadas ese lado mide (4 − 1)² + (1 − 3)² = 13, y ‖u‖² + ‖v‖² = 17 + 10.', {}, '$13 = 27 - 2\\|\\vec u\\|\\|\\vec v\\|\\cos\\theta$'],
        ['Despejando, ‖u‖‖v‖ cos θ = 7: la misma suma de productos. Al desarrollar siempre pasa.', {}, '$\\|\\vec u\\|\\|\\vec v\\|\\cos\\theta = u_1v_1 + u_2v_2$'],
        ['En el espacio se suma también el producto de las terceras coordenadas.', {}, '$(1, 2, 3) \\cdot (4, 0, -1) = 4 + 0 - 3 = 1$'],
      ], 'En R³: u · v = u₁v₁ + u₂v₂ + u₃v₃; la ley del coseno muestra que es lo mismo que ‖u‖‖v‖ cos θ.'),
      xpHaz('dibujo', 'Calcula $\\vec u \\cdot \\vec v$ para $\\vec u = (2, -1, 3)$ y $\\vec v = (1, 4, 2)$ y fija el resultado en la regla.', { dib: coordHaz, v: { d: 0 }, metas: { d: 4 }, alto: 210,
        manijas: [{ k: 'd', min: -10, max: 12, paso: 1, et: 'u · v' }],
        lee: v => `Tu valor: $${v.d}$`,
        dice: v => (v.d === 4 ? 'Justo: 2 − 4 + 6 = 4.' : v.d === 12 ? 'Ojo con el signo: (−1) · 4 = −4, no +4.' : 'Multiplica cada pareja de coordenadas y suma los tres productos.') },
        'Se emparejan coordenadas: 2 · 1 + (−1) · 4 + 3 · 2 = 4.')],
    ['Perpendiculares y propiedades',
      xpMira('dibujo', 'Un producto escalar **cero** es una señal: las flechas forman ángulo recto. Y la cuenta tiene reglas parecidas a las de multiplicar.', { dib: perp, v: { perp: 0, k: 0 }, alto: 210 }, [
        ['Si u · v = 0 y ninguno es el vector nulo, cos θ = 0: forman ángulo recto. Se dicen ortogonales.', {}, '$\\vec u \\perp \\vec v \\iff \\vec u \\cdot \\vec v = 0$'],
        ['En el plano, (a, b) es perpendicular a (−b, a): se cambian de lugar y a una se le cambia el signo.', { perp: 1 }, '$(2, 1) \\cdot (-1, 2) = -2 + 2 = 0$'],
        ['Con una incógnita: (k, 4) y (6, −3) son perpendiculares si 6k − 12 = 0, o sea k = 2.', { k: 1 }, '$6k - 12 = 0 \\Rightarrow k = 2$'],
        ['Un vector por sí mismo da su norma al cuadrado: el ángulo es 0° y cos 0° = 1.', {}, '$(2, 1) \\cdot (2, 1) = 5 = \\|(2, 1)\\|^2$'],
        ['El orden no importa, se reparte sobre la suma y un número sale afuera, como al multiplicar.', {}, '$\\vec u \\cdot (\\vec v + \\vec w) = \\vec u \\cdot \\vec v + \\vec u \\cdot \\vec w, \\quad (r\\vec u) \\cdot \\vec v = r(\\vec u \\cdot \\vec v)$'],
        ['Con esas reglas, una norma al cuadrado se desarrolla como un binomio.', {}, '$\\|\\vec u + \\vec v\\|^2 = \\|\\vec u\\|^2 + 2\\,\\vec u \\cdot \\vec v + \\|\\vec v\\|^2$'],
      ], 'u ⊥ v si y solo si u · v = 0; además u · u = ‖u‖², y el producto es conmutativo y distributivo.'),
      xpHaz('dibujo', 'Elige $k$ para que $\\vec u = (1, k, 3)$ y $\\vec v = (k, 2, -4)$ sean **perpendiculares**.', { dib: perpHaz, v: { k: 0 }, metas: { k: 4 }, alto: 230,
        manijas: [{ k: 'k', min: -6, max: 6, paso: 1, et: 'k' }],
        lee: v => `$\\vec u \\cdot \\vec v = ${v.k} + 2 \\cdot (${v.k}) - 12 = ${3 * v.k - 12}$`,
        dice: v => (v.k === 4 ? 'Justo: 4 + 8 − 12 = 0.' : v.k === -4 ? 'Con −4 da −24: el −12 pasa al otro lado como +12.' : 'Plantea k + 2k − 12 = 0 y despeja k.') },
        'k · 1 + 2 · k + 3 · (−4) = 3k − 12 = 0, así que k = 4.')],
    ['Ángulos y cosenos directores',
      xpMira('dibujo', 'Si se conocen las coordenadas, el **ángulo** entre dos vectores sale de juntar las dos fórmulas.', { dib: angulo, v: { dir: 0, ejes: 0 }, alto: 220 }, [
        ['Igualando las dos fórmulas se despeja el coseno del ángulo.', {}, '$\\cos\\theta = \\tfrac{\\vec u \\cdot \\vec v}{\\|\\vec u\\|\\,\\|\\vec v\\|}$'],
        ['Por ejemplo, para u = (3, 0, 4) y v = (0, 0, 2) el coseno da 0.8.', {}, '$\\cos\\theta = \\tfrac{8}{5 \\cdot 2} = 0.8, \\quad \\theta \\approx 36.9^{\\circ}$'],
        ['Los ángulos de un vector con los ejes x, y, z se llaman ángulos directores: α, β y γ.', { dir: 1, ejes: 1 }],
        ['Con el eje x se usa (1, 0, 0), que tiene norma 1: el producto deja solo la primera coordenada.', {}, '$\\cos\\alpha = \\tfrac{u_1}{\\|\\vec u\\|}, \\ \\cos\\beta = \\tfrac{u_2}{\\|\\vec u\\|}, \\ \\cos\\gamma = \\tfrac{u_3}{\\|\\vec u\\|}$'],
        ['Para u = (1, 2, 2), de norma 3, los cosenos directores son 1/3, 2/3 y 2/3.', {}, '$\\cos\\alpha = \\tfrac13, \\ \\cos\\beta = \\tfrac23, \\ \\cos\\gamma = \\tfrac23$'],
        ['Sus cuadrados siempre suman 1: son las coordenadas del vector unitario en la dirección de u.', {}, '$\\tfrac19 + \\tfrac49 + \\tfrac49 = 1$'],
      ], 'cos θ = u · v / (‖u‖‖v‖); los cosenos directores son u₁, u₂, u₃ divididos por ‖u‖, y sus cuadrados suman 1.'),
      xpHaz('dibujo', 'El vector $\\vec u = (1, 0, -1)$ forma con el eje $z$ el ángulo $\\gamma$. Abre el transportador hasta $\\gamma$.', { dib: anguloHaz, v: { g: 30 }, metas: { g: 135 }, alto: 200,
        manijas: [{ k: 'g', min: 0, max: 180, paso: 15, en: v => [CD[0] + RD * Math.cos(v.g * R), CD[1] - RD * Math.sin(v.g * R)],
          de: (x, y) => { const g = Math.atan2(CD[1] - y, x - CD[0]) / R; return g < -90 ? 180 : g < 0 ? 0 : g; } }],
        lee: v => `$\\cos\\gamma = \\tfrac{-1}{\\sqrt 2}$; tu ángulo: $${v.g}^{\\circ}$`,
        dice: v => (v.g === 135 ? 'Justo: cos γ = −1/√2, un ángulo obtuso de 135°.' : v.g === 45 ? 'Ese tiene coseno +1/√2; la coordenada en z es negativa.' : 'cos γ = u₃/‖u‖ = −1/√2: busca ese ángulo.') },
        'cos γ = −1/√2: γ = 135°. La coordenada en z es negativa, así que el ángulo con el eje z es obtuso.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Compras **3** cuadernos, **2** lápices y **4** borradores a **5**, **1** y **2** mil pesos. El total es cantidades · precios. Fíjalo.', { dib: compra, v: { t: 0 }, metas: { t: 25 }, alto: 210,
        manijas: [{ k: 't', min: 0, max: 40, paso: 1, et: 'total, en miles de pesos' }],
        lee: v => `$(3, 2, 4) \\cdot (5, 1, 2) = 15 + 2 + 8$; tu total: $${v.t}$`,
        dice: v => (v.t === 25 ? 'Justo: 15 + 2 + 8 = 25 mil pesos.' : v.t === 17 ? 'Sumaste cantidades y precios: se multiplica cada cantidad por su precio.' : 'Multiplica cada cantidad por su precio y suma.') },
        'La cuenta de una compra es un producto escalar: (3, 2, 4) · (5, 1, 2) = 25 mil pesos.')],
  ], 'El producto escalar dice cuánto se acompañan dos vectores: con él salen ángulos, perpendiculares y cosenos directores.');
}
