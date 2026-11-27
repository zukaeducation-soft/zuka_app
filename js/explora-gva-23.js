// Geometría Vectorial · explicación de geo-23 «La elipse y la hipérbola» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const k = v => Math.round(v.k);
  const pt = q => `(${q.map(N).join(', ')})`;
  const en = (O, u) => (x, y) => [O[0] + x * u, O[1] - y * u];
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const corta = (K, pts, cls, [X0, X1, Y0, Y1]) => {
    let h = '', run = [];
    const va = () => { if (run.length > 1) h += K.pl(run, cls); run = []; };
    for (const q of pts) { if (q[0] >= X0 && q[0] <= X1 && q[1] >= Y0 && q[1] <= Y1) run.push(q); else va(); }
    va();
    return h;
  };
  const recta = (K, Q, [x1, y1], [x2, y2], cls, caja) => corta(K, Array.from({ length: 81 }, (_, i) => Q(x1 + (x2 - x1) * i / 80, y1 + (y2 - y1) * i / 80)), cls, caja);
  const elipse = (Q, h, kk, A, B, t1 = 2 * Math.PI) => Array.from({ length: 121 }, (_, i) => { const t = i / 120 * t1; return Q(h + A * Math.cos(t), kk + B * Math.sin(t)); });
  const rama = (Q, h, kk, A, B, d, sg) => Array.from({ length: 101 }, (_, i) => {
    const s = -3 + 6 * i / 100;
    return d ? Q(h + A * Math.sinh(s), kk + sg * B * Math.cosh(s)) : Q(h + sg * A * Math.cosh(s), kk + B * Math.sinh(s));
  });

  // Capítulo 1: estacas en (±8, 0) y cuerda de 20: a = 10, b = 6, c = 8. El lápiz en (5, 3√3): 14 + 6 = 20.  v { k }
  const O1 = [170, 112], U1 = 13, Q1 = en(O1, U1), C1 = [0, 340, 0, 210], P1 = [5, 3 * Math.sqrt(3)];
  const cuerda = (v, K) => {
    const q = k(v), F1 = Q1(-8, 0), F2 = Q1(8, 0);
    let h = K.l(...Q1(-12, 0), ...Q1(12, 0), 'lr d');
    if (q >= 1) h += corta(K, elipse(Q1, 0, 0, 10, 6), 'la gr', C1);
    if (q <= 2) h += K.pl([F1, Q1(...P1), F2], 'lg gr') + K.c(...Q1(...P1), 4, 'fa');
    if (q === 2) h += K.t(Q1(-1.5, 2.6)[0], Q1(-1.5, 2.6)[1] - 8, '14', 's tg', 'end') + K.t(Q1(6.5, 2.6)[0] + 6, Q1(6.5, 2.6)[1], '6', 's tg', 'start');
    if (q === 3) h += K.c(...Q1(10, 0), 4, 'fo') + K.c(...Q1(-10, 0), 4, 'fo') + K.cota(Q1(-10, 0)[0], 188, Q1(10, 0)[0], 188, '2a = 20');
    if (q === 4) h += K.pl([F1, Q1(0, 6), F2], 'lg') + K.l(...Q1(0, 0), ...Q1(0, 6), 'lf') + K.t(Q1(4, 3)[0] + 8, Q1(4, 3)[1] - 4, 'a = 10', 's tg', 'start') + K.t(Q1(0, 3)[0] - 6, Q1(0, 3)[1], 'b = 6', 's tf', 'end') + K.t(Q1(4, 0)[0], O1[1] + 16, 'c = 8', 's');
    if (q >= 5) {
      for (const t of [0.6, 1.3, 2.2, 4.1, 5.2]) {
        const W = [10 * Math.cos(t), 6 * Math.sin(t)];
        h += K.l(...F1, ...Q1(...W), 'lo') + K.l(...Q1(...W), ...F2, 'lo');
      }
    }
    h += K.c(...F1, 5, 'fk') + K.c(...F2, 5, 'fk') + K.t(F1[0], F1[1] + 18, 'F₁', 's tm') + K.t(F2[0], F2[1] + 18, 'F₂', 's tm');
    const dice = ['una cuerda de 20 y dos estacas', 'el lápiz tenso traza la curva', 'd₁ + d₂ = 14 + 6 = 20', 'en los vértices: 2a = 20', 'a² = b² + c²: 100 = 36 + 64', 'de un foco al otro · e = 8/10 = 0.8'][Math.min(q, 5)];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  // Capítulo 1, tu turno: estacas en (±15, 0), cuerda de 34: b = 8.  v { b }
  const O1b = [170, 112], U1b = 9, Q1b = en(O1b, U1b);
  const turno1 = (v, K) => {
    const T = Q1b(0, v.b), d = Math.hypot(15, v.b);
    let h = K.l(...Q1b(-18, 0), ...Q1b(18, 0), 'lr d') + corta(K, elipse(Q1b, 0, 0, 17, v.b), 'la gr', [0, 340, 0, 200]);
    h += K.pl([Q1b(-15, 0), T, Q1b(15, 0)], 'lg gr') + K.c(...Q1b(-15, 0), 5, 'fk') + K.c(...Q1b(15, 0), 5, 'fk') + K.c(...T, 4, 'fa');
    return h + K.t(14, 20, `cada tramo: √(15² + ${v.b}²) = ${N(d)}`, 's ta', 'start') + K.t(330, 20, `cuerda: ${N(2 * d)}`, 's tm', 'end');
  };

  // Capítulo 2: (x − 2)²/3 + (y − 1)²/4 = 1: vertical, a = 2, b = √3, c = 1, e = 1/2, lado recto 3.  v { k }
  const O2 = [110, 140], U2 = 30, Q2 = en(O2, U2), C2 = [20, 320, 50, 200], B3 = Math.sqrt(3);
  const ecuacion = (v, K) => {
    const q = k(v);
    let h = rej(K, O2, U2, -3, 7, -2, 3);
    const [cx, cy, A, B] = q === 0 ? [0, 0, 2, B3] : q === 1 ? [2, 1, 2, B3] : [2, 1, B3, 2];
    h += corta(K, elipse(Q2, cx, cy, A, B), 'la gr', C2) + K.c(...Q2(cx, cy), 4, 'fk');
    h += K.l(...Q2(cx, cy), ...Q2(cx + A, cy), 'lg') + K.l(...Q2(cx, cy), ...Q2(cx, cy + B), 'lf');
    if (q >= 3) h += K.c(...Q2(2, 2), 4, 'fo') + K.c(...Q2(2, 0), 4, 'fo') + K.t(Q2(2, 2)[0] + 8, Q2(2, 2)[1] + 4, '(2, 2)', 's to', 'start') + K.t(Q2(2, 0)[0] + 8, Q2(2, 0)[1] + 4, '(2, 0)', 's to', 'start');
    if (q >= 5) h += K.l(...Q2(0.5, 2), ...Q2(3.5, 2), 'lo gr');
    const dice = ['x²/4 + y²/3 = 1 · a = 2 en x', 'centro (2, 1): (x − 2)² y (y − 1)²', '(x − 2)²/3 + (y − 1)²/4 = 1 · eje mayor vertical', 'c² = 4 − 3 = 1 · focos (2, 1 ± 1)', 'e = c/a = 1/2', 'lado recto = 2b²/a = 2·3/2 = 3'][Math.min(q, 5)];
    return h + K.t(14, 24, dice, 's ta', 'start');
  };
  const fondo2 = K => K.t(14, 24, '(x + 2)²/16 + y²/7 = 1', 'ta', 'start') + K.t(62, 69, 'c =', 's', 'end') + K.t(172, 69, 'e =', 's', 'end') + K.t(272, 69, 'LR =', 's', 'end') + K.t(14, 106, 'LR es el lado recto, 2b²/a', 's tm', 'start');

  // Capítulo 3: x²/64 − y²/36 = 1: a = 8, b = 6, c = 10; P = (10, 4.5) con 20.5 − 4.5 = 16.  v { k }
  const O3 = [170, 108], U3 = 9, Q3 = en(O3, U3), C3 = [10, 330, 30, 200];
  const hiperbola = (v, K) => {
    const q = k(v), P = [10, 4.5];
    let h = K.l(...Q3(-17, 0), ...Q3(17, 0), 'lr d');
    if (q >= 3) h += K.p([Q3(-8, -6), Q3(8, -6), Q3(8, 6), Q3(-8, 6)], 'fn') + K.l(...Q3(-8, -6), ...Q3(8, -6), 'lm d') + K.l(...Q3(-8, 6), ...Q3(8, 6), 'lm d');
    if (q >= 4) h += recta(K, Q3, [-17, -12.75], [17, 12.75], 'lm', C3) + recta(K, Q3, [-17, 12.75], [17, -12.75], 'lm', C3);
    if (q >= 1) h += corta(K, rama(Q3, 0, 0, 8, 6, 0, 1), 'la gr', C3);
    if (q >= 2) h += corta(K, rama(Q3, 0, 0, 8, 6, 0, -1), 'la gr', C3);
    if (q <= 2) h += K.l(...Q3(-10, 0), ...Q3(...P), 'lg') + K.l(...Q3(10, 0), ...Q3(...P), 'lf') + K.c(...Q3(...P), 4, 'fa') + K.t(Q3(0, 2.5)[0], Q3(0, 2.5)[1] - 6, '20.5', 's tg') + K.t(Q3(10, 2)[0] + 6, Q3(10, 2)[1], '4.5', 's tf', 'start');
    if (q >= 3) h += K.c(...Q3(8, 0), 3, 'fk') + K.c(...Q3(-8, 0), 3, 'fk');
    h += K.c(...Q3(-10, 0), 5, 'fo') + K.c(...Q3(10, 0), 5, 'fo') + K.t(Q3(-10, 0)[0], O3[1] + 18, 'F₁', 's tm') + K.t(Q3(10, 0)[0], O3[1] + 18, 'F₂', 's tm');
    const dice = ['focos a 20 · P a 20.5 de uno y 4.5 del otro', 'la diferencia: 20.5 − 4.5 = 16 = 2a', 'dos ramas: |d₁ − d₂| = 16', 'rectángulo 16 × 12 · c² = 64 + 36 = 100', 'asíntotas: y = ±(6/8)x', 'e = c/a = 10/8 = 1.25'][Math.min(q, 5)];
    return h + K.t(14, 20, dice, 's ta', 'start');
  };
  // Capítulo 3, tu turno: vértices (±4, 0); se desliza b hasta que las asíntotas sean y = ±x/2.  v { b }
  const O3b = [170, 96], U3b = 14, Q3b = en(O3b, U3b), C3b = [10, 330, 30, 170];
  const turno3 = (v, K) => {
    let h = K.l(...Q3b(-11, 0), ...Q3b(11, 0), 'lr d') + K.p([Q3b(-4, -v.b), Q3b(4, -v.b), Q3b(4, v.b), Q3b(-4, v.b)], 'fn');
    h += recta(K, Q3b, [-11, -11 * v.b / 4], [11, 11 * v.b / 4], 'lm', C3b) + recta(K, Q3b, [-11, 11 * v.b / 4], [11, -11 * v.b / 4], 'lm', C3b);
    h += corta(K, rama(Q3b, 0, 0, 4, v.b, 0, 1), 'la gr', C3b) + corta(K, rama(Q3b, 0, 0, 4, v.b, 0, -1), 'la gr', C3b);
    return h + K.c(...Q3b(4, 0), 4, 'fk') + K.c(...Q3b(-4, 0), 4, 'fk') + K.t(14, 20, `asíntotas: y = ±(${v.b}/4)x`, 's ta', 'start');
  };

  // Capítulo 4: x² + 4y² − 6x + 8y + 9 = 0 → (x − 3)²/4 + (y + 1)² = 1.  v { k }
  const O4 = [190, 150], U4 = 22, Q4 = en(O4, U4);
  const general = (v, K) => {
    const q = k(v);
    const lin = ['x² + 4y² − 6x + 8y + 9 = 0', '(x² − 6x) + 4(y² + 2y) = −9', '(x − 3)² − 9 + 4(y + 1)² − 4 = −9', '(x − 3)²/4 + (y + 1)²/1 = 1'];
    let h = '';
    lin.slice(0, Math.min(q, 3) + 1).forEach((s, i) => { h += K.t(14, 20 + 20 * i, s, `s ${i === Math.min(q, 3) ? 'ta' : 'tm'}`, 'start'); });
    if (q >= 3) {
      h += rej(K, O4, U4, 0, 6, -3, 1) + corta(K, elipse(Q4, 3, -1, 2, 1), 'la gr', [180, 330, 110, 224]) + K.c(...Q4(3, -1), 4, 'fk');
      h += K.t(14, 110, 'centro (3, −1)', 's', 'start') + K.t(14, 128, 'a = 2, b = 1', 's', 'start');
    }
    if (q === 4) h += K.t(14, 156, 'A·C > 0: elipse', 's tg', 'start') + K.t(14, 174, 'A = C: circunferencia', 's tg', 'start') + K.t(14, 192, 'A·C < 0: hipérbola', 's tf', 'start');
    if (q >= 5) h += K.t(14, 156, 'si queda = 0: un punto', 's to', 'start') + K.t(14, 174, 'si queda < 0: nada', 's to', 'start') + K.t(14, 192, 'hipérbola = 0: dos rectas', 's to', 'start');
    return h;
  };
  const fondo4 = K => ['2x² + 5y² − 10 = 0', '3x² − y² + 6x = 0', 'x² + 4y² − 2x + 1 = 0'].map((s, i) => K.t(14, 35 + 42 * i, s, 's', 'start')).join('');

  // Problema: arco semielíptico de 50 m de luz y 10 m de altura; a 10 m de un extremo (x = 15) la altura es 8.  v { h }
  const O5 = [170, 146], U5 = 6, Q5 = en(O5, U5);
  const puente = (v, K) => {
    let h = K.l(10, O5[1], 330, O5[1], 'lm gr') + corta(K, elipse(Q5, 0, 0, 25, 10, Math.PI), 'lg gr', [0, 340, 0, 220]);
    h += K.l(...Q5(0, 0), ...Q5(0, 10), 'lr d') + K.t(Q5(0, 10)[0] + 6, Q5(0, 10)[1] - 6, '10 m', 's tm', 'start') + K.t(Q5(-25, 0)[0], O5[1] + 18, 'luz de 50 m', 's tm', 'start');
    h += K.r(Q5(15, 0)[0] - 3, Q5(15, v.h)[1], 6, v.h * U5, 'fa', 2) + K.t(Q5(15, 0)[0], O5[1] + 18, 'a 10 m del extremo', 's tm');
    return h + K.t(14, 20, `poste de ${v.h} m`, 's ta', 'start') + K.t(14, 38, `15²/25² + ${v.h}²/10² = ${N(225 / 625 + v.h * v.h / 100)}`, 's tm', 'start');
  };

  xpLec('geo-23', [
    ['La cuerda y las dos estacas',
      xpMira('dibujo', 'Amarra una cuerda a dos estacas y tensa con un lápiz: al dar la vuelta dibujas una **elipse**. Las estacas son los **focos**.', { dib: cuerda, v: { k: 0 }, alto: 210 }, [
        ['Dos estacas a 16 pasos y una cuerda de 20 amarrada a ellas. El lápiz la mantiene tensa.', {}],
        ['Al mover el lápiz sin aflojar la cuerda, la punta dibuja una curva cerrada: la elipse.', { k: 1 }],
        ['En cualquier punto, la distancia a un foco más la distancia al otro da el largo de la cuerda.', { k: 2 }, '$d(P, F_1) + d(P, F_2) = 2a$'],
        ['En los vértices se ve: el eje mayor mide lo mismo que la cuerda, 2a = 20, así que a = 10.', { k: 3 }],
        ['En el punto más alto cada mitad mide a; con la distancia c al foco y la altura b sale un triángulo.', { k: 4 }, '$a^2 = b^2 + c^2$'],
        ['Lo que sale de un foco rebota y llega al otro. Y e = c/a dice qué tan aplastada es.', { k: 5 }, '$e = \\tfrac{c}{a},\\ 0 < e < 1$'],
      ], 'La elipse es el lugar donde $d_1 + d_2 = 2a$; sus focos cumplen $c^2 = a^2 - b^2$ y $e = c/a < 1$.'),
      xpHaz('dibujo', 'Ahora las estacas están a 15 pasos del centro y la cuerda mide 34. Desliza la altura b del punto más alto hasta que la cuerda quede justa.', {
        dib: turno1, v: { b: 3 }, metas: { b: 8 }, alto: 200, manijas: [{ k: 'b', min: 1, max: 12, paso: 1, et: 'altura b del punto más alto' }],
        lee: v => `$2\\sqrt{15^2 + ${v.b}^2} = ${N(2 * Math.hypot(15, v.b))}$`, pista: 'Cada mitad de la cuerda mide 17 y es la hipotenusa de un triángulo con un cateto de 15.' },
      '$b = \\sqrt{17^2 - 15^2} = 8$: cada tramo mide $\\sqrt{225 + 64} = 17$.')],
    ['La ecuación de la elipse',
      xpMira('dibujo', 'Con el centro y los semiejes se escribe la **ecuación ordinaria**. El denominador mayor dice hacia dónde se estira.', { dib: ecuacion, v: { k: 0 }, alto: 210 }, [
        ['Con centro en el origen: el semieje a va bajo x² y el semieje b bajo y².', {}, '$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$'],
        ['Si el centro se mueve a (h, k), x se cambia por x − h y y por y − k.', { k: 1 }, '$\\dfrac{(x - h)^2}{a^2} + \\dfrac{(y - k)^2}{b^2} = 1$'],
        ['Si el denominador mayor está bajo y, el eje mayor es vertical: a² va con y.', { k: 2 }],
        ['Los focos van sobre el eje mayor, a c del centro: c² = a² − b² = 4 − 3 = 1.', { k: 3 }],
        ['La excentricidad es c/a = 1/2. Cuanto más cerca de 0, más redonda.', { k: 4 }],
        ['La cuerda por un foco, perpendicular al eje mayor, es el lado recto: mide 2b²/a.', { k: 5 }, '$LR = \\dfrac{2b^2}{a}$'],
      ], 'Ecuación ordinaria con centro $(h, k)$; el denominador mayor es $a^2$ y marca el eje de los focos.'),
      xpHaz('fichas', 'Para la elipse (x + 2)²/16 + y²/7 = 1, halla c, la excentricidad y el lado recto.', {
        slots: [100, 210, 306].map(x => ({ x, y: 64, w: 52, h: 34 })), alto: 116, fondo: fondo2,
        fichas: ['3', '0.75', '3.5', '√23', '9', '1.33'], meta: ['3', '0.75', '3.5'], pista: 'a² = 16 y b² = 7. En la elipse c² = a² − b², y la excentricidad y el lado recto se dividen entre a.' },
      '$c = \\sqrt{16 - 7} = 3$, $e = \\tfrac{3}{4} = 0.75$ y $LR = \\tfrac{2 \\cdot 7}{4} = 3.5$.')],
    ['La hipérbola: la diferencia',
      xpMira('dibujo', 'Si en vez de sumar las distancias a los focos las **restas**, y la diferencia no cambia, sale una **hipérbola**.', { dib: hiperbola, v: { k: 0 }, alto: 210 }, [
        ['Focos a 10 del centro. Este punto P está a 20.5 de uno y a 4.5 del otro.', {}],
        ['La diferencia es 16, y es la misma para todos los puntos de la curva: 2a = 16.', { k: 1 }, '$|d(P, F_1) - d(P, F_2)| = 2a$'],
        ['Los puntos más cerca del otro foco forman otra rama. Así se ubica un barco con dos señales.', { k: 2 }],
        ['Los vértices están en ±a. Con b se arma el rectángulo auxiliar, y ahora c es el más largo.', { k: 3 }, '$c^2 = a^2 + b^2$'],
        ['Las diagonales del rectángulo son las asíntotas: la curva se les pega sin tocarlas.', { k: 4 }, '$y - k = \\pm\\tfrac{b}{a}(x - h)$'],
        ['La excentricidad pasa de 1. Si el término positivo es el de y, abre arriba y abajo.', { k: 5 }, '$\\dfrac{(y - k)^2}{a^2} - \\dfrac{(x - h)^2}{b^2} = 1$'],
      ], 'Hipérbola: $|d_1 - d_2| = 2a$, $c^2 = a^2 + b^2$, $e > 1$ y asíntotas por las diagonales del rectángulo.'),
      xpHaz('dibujo', 'Una hipérbola tiene vértices en (±4, 0). Desliza b hasta que sus asíntotas sean y = ±x/2.', {
        dib: turno3, v: { b: 5 }, metas: { b: 2 }, alto: 200, manijas: [{ k: 'b', min: 1, max: 6, paso: 1, et: 'semieje b' }],
        lee: v => `$\\tfrac{x^2}{16} - \\tfrac{y^2}{${v.b * v.b}} = 1$`, pista: 'La pendiente de las asíntotas es b/a, con a = 4: busca el b que da un medio.' },
      '$\\tfrac{b}{4} = \\tfrac{1}{2}$ da $b = 2$: es $\\tfrac{x^2}{16} - \\tfrac{y^2}{4} = 1$.')],
    ['De la ecuación general a la cónica',
      xpMira('dibujo', 'Muchas veces la ecuación llega **desarrollada**. Completando cuadrados vuelve a la forma ordinaria, y los signos de A y C ya avisan qué es.', { dib: general, v: { k: 0 }, alto: 224 }, [
        ['Una ecuación general: A = 1 acompaña a x² y C = 4 a y².', {}, '$Ax^2 + Cy^2 + Dx + Ey + F = 0$'],
        ['Se juntan las x y las y, y se saca el factor de cada cuadrado.', { k: 1 }],
        ['Se completan los cuadrados: lo que se suma dentro se compensa afuera.', { k: 2 }],
        ['Al dividir entre lo que queda a la derecha sale la forma ordinaria: una elipse.', { k: 3 }],
        ['Basta mirar los signos: A y C iguales en signo dan elipse; distintos, hipérbola.', { k: 4 }],
        ['Si al final queda cero o algo negativo, la cónica se degenera: un punto, nada o dos rectas.', { k: 5 }],
      ], 'Se completan cuadrados. A y C del mismo signo: elipse; de signos distintos: hipérbola. Hay casos degenerados.'),
      xpHaz('fichas', 'Arrastra a cada ecuación lo que representa.', {
        slots: [35, 77, 119].map(y => ({ x: 270, y, w: 110, h: 34 })), alto: 140, fondo: fondo4,
        fichas: ['elipse', 'hipérbola', 'punto', 'parábola', 'ningún punto'], meta: ['elipse', 'hipérbola', 'punto'], pista: 'Mira los signos de x² y y², y en la tercera completa cuadrados para ver qué queda al otro lado.' },
      '$2x^2 + 5y^2 = 10$ es una elipse; $3(x + 1)^2 - y^2 = 3$, una hipérbola; $(x - 1)^2 + 4y^2 = 0$, solo el punto $(1, 0)$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un puente tiene un arco de media elipse: 50 m de luz y 10 m de alto en el centro. Desliza el poste que va a 10 m de un extremo hasta que toque el arco.', {
        dib: puente, v: { h: 3 }, metas: { h: 8 }, alto: 230, manijas: [{ k: 'h', min: 0, max: 10, paso: 1, et: 'altura del poste (m)' }],
        lee: v => `$\\tfrac{15^2}{25^2} + \\tfrac{${v.h}^2}{10^2} = ${N(0.36 + v.h * v.h / 100)}$`, pista: 'Con centro en el medio, a = 25 y b = 10; a 10 m del extremo, x = 15. El punto debe cumplir la ecuación igual a 1.' },
      '$\\tfrac{15^2}{625} + \\tfrac{y^2}{100} = 1$ da $y^2 = 100(1 - 0.36) = 64$: el poste mide 8 m.')],
  ], 'La elipse suma distancias a los focos y la hipérbola las resta; los signos de A y C dicen cuál es.');
}
