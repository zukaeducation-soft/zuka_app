// Geometría Vectorial · explicación de geo-13 «Lugares geométricos e intersecciones» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: un lugar es una condición; la mediatriz y la circunferencia salen de distancias, y los cruces de lugares se
// resuelven con sistemas, cuadráticas y restas de ecuaciones. Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  const pt = q => `(${sg(q[0])}, ${sg(q[1])})`;
  const pl = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const pap = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    return h;
  };
  const rec = (K, P, a, b, c, cls) => {
    const q = [], e = 1e-9;
    if (b) for (const x of [P.x0, P.x1]) { const y = (c - a * x) / b; if (y >= P.y0 - e && y <= P.y1 + e) q.push([x, y]); }
    if (a) for (const y of [P.y0, P.y1]) { const x = (c - b * y) / a; if (x >= P.x0 - e && x <= P.x1 + e) q.push([x, y]); }
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    return K.l(...P2(P, q[0]), ...P2(P, q.at(-1)), cls);
  };
  const dot = (K, P, q, s, cls = 'fk', dx = 8, dy = -8, a = 'start') => { const [x, y] = P2(P, q); return K.c(x, y, 4.5, cls) + (s ? K.t(x + dx, y + dy, s, 's', a) : ''); };
  const circ = (K, P, C, r, cls) => { const [x, y] = P2(P, C); return K.arc(x, y, r * P.u, 0, 360, cls); };
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const k = v => Math.round(v.k);

  // 1 · la mediatriz de A(1, 1) y B(5, 3): 2x + y = 8.   v { k }
  const P1 = pl({ x0: 0, x1: 8, y0: 0, y1: 7 }, 40, 196, 24);
  const A1 = [1, 1], B1 = [5, 3], M1 = [3, 2];
  const media = (v, K) => {
    const q = k(v), A = P2(P1, A1), B = P2(P1, B1);
    let h = pap(K, P1) + K.l(A[0], A[1], B[0], B[1], 'lm') + dot(K, P1, A1, 'A', 'fk', 8, 16) + dot(K, P1, B1, 'B');
    if (q >= 1) h += dot(K, P1, M1, 'M', 'fA', -8, -8, 'end');
    if (q >= 2) for (const X of [[4, 0], [2, 4]]) { const Xp = P2(P1, X); h += K.l(Xp[0], Xp[1], A[0], A[1], 'lg d') + K.l(Xp[0], Xp[1], B[0], B[1], 'lf d') + K.c(Xp[0], Xp[1], 4.5, 'fo'); }
    if (q >= 3) h += rec(K, P1, 2, 1, 8, 'la gr');
    if (q >= 4) h += K.t(332, 18, 'PA² = PB²', 's ta', 'end');
    if (q >= 5) h += K.t(332, 38, '2x + y = 8', 's ta', 'end') + K.t(332, 58, 'B − A = (4, 2)', 's tm', 'end');
    return h;
  };
  // Tu turno: A(0, 2), B(4, 0); el punto de la mediatriz con x = 3.   v { x, y }
  const P1b = pl({ x0: 0, x1: 6, y0: 0, y1: 5 }, 60, 186, 28);
  const A1b = [0, 2], B1b = [4, 0];
  const hazMedia = (v, K) => {
    const X = [v.x, v.y], Xp = P2(P1b, X), A = P2(P1b, A1b), B = P2(P1b, B1b);
    return pap(K, P1b) + K.l(P1b.X(3), P1b.Y(0), P1b.X(3), P1b.Y(5), 'lm d') + K.t(P1b.X(3) + 6, P1b.Y(5) + 12, 'x = 3', 's tm', 'start')
      + K.l(Xp[0], Xp[1], A[0], A[1], 'lg d') + K.l(Xp[0], Xp[1], B[0], B[1], 'lf d') + dot(K, P1b, A1b, 'A', 'fk', -8, -8, 'end') + dot(K, P1b, B1b, 'B', 'fk', 8, 16)
      + K.t(332, 18, `PA² = ${d2(X, A1b)}`, 's tg', 'end') + K.t(332, 36, `PB² = ${d2(X, B1b)}`, 's tf', 'end');
  };

  // 2 · la circunferencia de centro (3, 2) y radio 5, desarrollada y con diámetro.   v { k }
  const P2c = pl({ x0: -3, x1: 9, y0: -3, y1: 7 }, 40 + 3 * 16, 50 + 7 * 16, 16);
  const C2 = [3, 2];
  const circulo = (v, K) => {
    const q = k(v), C = P2(P2c, C2);
    let h = pap(K, P2c) + dot(K, P2c, C2, 'C', 'fk', 8, 16);
    const X = [6, 6], Xp = P2(P2c, X);
    if (q <= 1) h += K.l(C[0], C[1], Xp[0], Xp[1], 'lg gr') + K.c(Xp[0], Xp[1], 4.5, 'fo') + K.t(Xp[0] + 8, Xp[1] - 6, 'X', 's', 'start') + K.t((C[0] + Xp[0]) / 2 + 10, (C[1] + Xp[1]) / 2 + 12, '5', 's tg', 'start');
    if (q >= 1) h += circ(K, P2c, C2, 5, 'la gr');
    if (q >= 2) h += K.t(8, 16, '(x − 3)² + (y − 2)² = 25', 's ta', 'start');
    if (q >= 3) h += K.t(8, 34, 'x² + y² − 6x − 4y − 12 = 0', 's tm', 'start');
    if (q >= 5) {
      const A = [0, -2], B = [6, 6], Ap = P2(P2c, A), Bp = P2(P2c, B), Z = P2(P2c, [-1, 5]);
      h += K.l(Ap[0], Ap[1], Bp[0], Bp[1], 'lf gr') + dot(K, P2c, A, 'A', 'fF', 8, 12) + dot(K, P2c, B, 'B', 'fF')
        + K.l(Z[0], Z[1], Ap[0], Ap[1], 'lm') + K.l(Z[0], Z[1], Bp[0], Bp[1], 'lm') + K.c(Z[0], Z[1], 4, 'fo') + K.t(Z[0] - 8, Z[1] - 6, '90°', 's to', 'end');
    }
    return h;
  };
  // Tu turno: el centro de x² + y² + 2x − 8y + 8 = 0.   v { x, y }
  const P2b = pl({ x0: -5, x1: 4, y0: 0, y1: 8 }, 70 + 5 * 22, 210, 22);
  const hazCentro = (v, K) => {
    const C = P2(P2b, [v.x, v.y]);
    return pap(K, P2b) + K.arc(C[0], C[1], 3 * P2b.u, 0, 360, 'la') + K.t(8, 16, 'x² + y² + 2x − 8y + 8 = 0', 's ta', 'start') + K.t(332, 16, `centro ${pt([v.x, v.y])}`, 's tm', 'end');
  };

  // 3 · cruces: dos rectas, recta y circunferencia (x² + y² = 8 con x + y = b) y dos circunferencias.   v { k, b }
  const P3 = pl({ x0: -4, x1: 7, y0: -4, y1: 7 }, 88 + 4 * 15, 42 + 7 * 15, 15);
  const cruce = (v, K) => {
    const q = k(v), O = P2(P3, [0, 0]);
    let h = pap(K, P3);
    if (q === 1) h += rec(K, P3, 1, -1, 0, 'lg gr') + rec(K, P3, 1, 1, 2, 'lf gr') + dot(K, P3, [1, 1], '(1, 1)', 'fo') + K.t(332, 18, 'x − y = 0 y x + y = 2', 's tm', 'end');
    if (q >= 2) {
      h += K.arc(O[0], O[1], Math.sqrt(8) * P3.u, 0, 360, 'lg gr');
      if (q <= 4) {
        h += rec(K, P3, 1, 1, v.b, 'la gr');
        const D = 64 - 4 * v.b * v.b, xs = D > 1e-9 ? [(v.b - Math.sqrt(D) / 2) / 2, (v.b + Math.sqrt(D) / 2) / 2] : Math.abs(D) < 1e-9 ? [v.b / 2] : [];
        h += xs.map(x => dot(K, P3, [x, v.b - x], '', xs.length === 1 ? 'fo' : 'fF')).join('');
        h += K.t(332, 18, `x + y = ${Math.round(v.b)}: Δ ${D > 1e-9 ? '> 0' : D < -1e-9 ? '< 0' : '= 0'}`, 's ta', 'end') + K.t(332, 36, ['', '', 'dos cortes', 'tangente', 'ningún corte'][q], 's tm', 'end');
      }
    }
    if (q >= 5) h += circ(K, P3, [4, 0], Math.sqrt(8), 'lf gr') + rec(K, P3, 1, 0, 2, 'la d') + dot(K, P3, [2, 2], '', 'fo') + dot(K, P3, [2, -2], '', 'fo') + K.t(332, 18, 'restando: x = 2', 's ta', 'end');
    return h;
  };
  // Tu turno: y = x + b tangente a x² + y² = 18.   v { b }
  const P3b = pl({ x0: -7, x1: 7, y0: -5, y1: 10 }, 79 + 7 * 13, 30 + 10 * 13, 13);
  const hazToca = (v, K) => {
    const O = P2(P3b, [0, 0]);
    return pap(K, P3b) + K.arc(O[0], O[1], Math.sqrt(18) * P3b.u, 0, 360, 'lg gr') + rec(K, P3b, -1, 1, v.b, 'la gr')
      + K.t(8, 16, 'x² + y² = 18', 's tg', 'start') + K.t(332, 16, `y = x + ${v.b}`, 's ta', 'end');
  };

  // 4 · bisectriz, circuncentro y regiones.   v { k }
  const P4 = pl({ x0: -1, x1: 9, y0: -1, y1: 6 }, 60 + 20, 48 + 6 * 20, 20);
  const otros = (v, K) => {
    const q = k(v), O = P2(P4, [0, 0]);
    let h = pap(K, P4);
    if (q <= 2) {
      const L = P2(P4, [8, 6]), F = P2(P4, [9, 0]);
      h += K.l(O[0], O[1], F[0], F[1], 'lm gr') + K.l(O[0], O[1], L[0], L[1], 'lm gr') + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 16, 'O', 's', 'end');
      const Q = [6, 2], Qp = P2(P4, Q), Fq = P2(P4, [6, 0]), Lq = P2(P4, [Q[0] * 16 / 25 + Q[1] * 12 / 25, Q[0] * 12 / 25 + Q[1] * 9 / 25]);
      h += K.l(Qp[0], Qp[1], Fq[0], Fq[1], 'lg') + K.l(Qp[0], Qp[1], Lq[0], Lq[1], 'lf') + K.c(Qp[0], Qp[1], 4.5, 'fo');
      if (q >= 1) h += rec(K, P4, 1, -3, 0, 'la gr') + K.t(332, 18, '(1, 0) + (4/5, 3/5) ∥ (3, 1)', 's ta', 'end');
      if (q >= 2) h += rec(K, P4, 3, -5, 0, 'lf d') + K.t(332, 36, '(1, 0) + (4, 3) = (5, 3): no', 's tf', 'end');
    } else if (q <= 4) {
      const T = [[0, 0], [6, 0], [4, 4]];
      h += K.p(T.map(t => P2(P4, t)), 'fn') + T.map((t, i) => dot(K, P4, t, 'ABC'[i], 'fk', i === 2 ? 8 : -6, i === 2 ? -6 : 16, i === 2 ? 'start' : 'end')).join('');
      h += rec(K, P4, 1, 0, 3, 'lg') + rec(K, P4, 1, 1, 4, 'lf');
      if (q >= 4) h += dot(K, P4, [3, 1], 'O', 'fA', 8, 14) + circ(K, P4, [3, 1], Math.sqrt(10), 'la gr') + K.t(332, 18, 'x = 3 y x + y = 4: O(3, 1)', 's ta', 'end');
    } else {
      const C = P2(P4, [4, 2]);
      h += K.sec(C[0], C[1], 3 * P4.u, 45, 225, 'fa') + K.arc(C[0], C[1], 3 * P4.u, 0, 360, 'la') + rec(K, P4, 1, -1, 2, 'lf');
      h += K.t(332, 18, '(x − 4)² + (y − 2)² ≤ 9', 's ta', 'end') + K.t(332, 36, 'y ≥ x − 2', 's tf', 'end');
    }
    return h;
  };
  // Tu turno: el circuncentro de A(0, 2), B(6, 2) y C(2, 6).   v { x, y }
  const P4b = pl({ x0: 0, x1: 7, y0: 0, y1: 7 }, 70, 208, 26);
  const T4 = [[0, 2], [6, 2], [2, 6]];
  const hazCirc = (v, K) => {
    const X = [v.x, v.y];
    let h = pap(K, P4b) + K.p(T4.map(t => P2(P4b, t)), 'fn') + T4.map((t, i) => dot(K, P4b, t, 'ABC'[i], 'fk', i === 1 ? 8 : -8, i === 2 ? -6 : 16, i === 1 ? 'start' : 'end')).join('');
    h += T4.map((t, i) => K.t(332, 18 + 18 * i, `${'ABC'[i]}: ${d2(X, t)}`, 's tm', 'end')).join('');
    return h + K.t(250, 18, 'distancias²', 's tm', 'end');
  };

  // Problema: el barco por y = 7 − x entra a la luz del faro x² + y² ≤ 25.   v { x }
  const PF = pl({ x0: -1, x1: 8, y0: -1, y1: 8 }, 60 + 22, 26 + 8 * 22, 22);
  const faro = (v, K) => {
    const O = P2(PF, [0, 0]);
    let h = pap(K, PF) + K.sec(O[0], O[1], 5 * PF.u, 0, 90, 'fa') + K.arc(O[0], O[1], 5 * PF.u, 0, 90, 'la') + K.p([[O[0], O[1] - 10], [O[0] - 6, O[1] + 5], [O[0] + 6, O[1] + 5]], 'fk');
    h += rec(K, PF, 1, 1, 7, 'lm gr d') + K.t(8, 16, 'luz: x² + y² ≤ 25', 's ta', 'start') + K.t(332, 16, 'ruta: y = 7 − x', 's tm', 'end');
    return h + K.t(332, 244, `el barco en ${pt([v.x, 7 - v.x])}: ${v.x * v.x + (7 - v.x) ** 2}`, 's tm', 'end');
  };

  xpLec('geo-13', [
    ['Lo que equidista: la mediatriz',
      xpMira('dibujo', 'Un **lugar geométrico** es el conjunto de todos los puntos que cumplen una condición.', { dib: media, v: { k: 0 }, alto: 214 }, [
        ['Hoy la condición es estar a la misma distancia de A y de B. ¿Qué puntos la cumplen?', {}],
        ['El punto medio M de AB la cumple: está justo a la mitad del camino.', { k: 1 }, '$M = \\left(\\tfrac{1 + 5}{2}, \\tfrac{1 + 3}{2}\\right) = (3, 2)$'],
        ['Pero no es el único: (4, 0) y (2, 4) también están a la misma distancia de A y de B.', { k: 2 }],
        ['Todos juntos forman una recta: la mediatriz. Pasa por M y es perpendicular a AB.', { k: 3 }],
        ['Su ecuación sale de igualar las distancias al cuadrado: los x² y los y² se cancelan.', { k: 4 }, '$(x - 1)^2 + (y - 1)^2 = (x - 5)^2 + (y - 3)^2 \\Rightarrow 8x + 4y = 32$'],
        ['Simplificada queda 2x + y = 8. Sus coeficientes van en la dirección de B − A.', { k: 5 }, '$2x + y = 8$'],
      ], 'Mediatriz de AB: los X con $\\|X - A\\| = \\|X - B\\|$, una recta por el punto medio.'),
      xpHaz('dibujo', 'Con A(0, 2) y B(4, 0), arrastra P a un punto de la recta $x = 3$ que esté a la misma distancia de A y de B.', { dib: hazMedia, v: { x: 1, y: 4 }, metas: { x: 3, y: 3 }, alto: 214,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [6, 5], paso: 1, en: v => P2(P1b, [v.x, v.y]), de: (x, y) => [(x - P1b.ox) / P1b.u, (P1b.oy - y) / P1b.u] }],
        lee: v => `$PA^2 = ${d2([v.x, v.y], A1b)}$ y $PB^2 = ${d2([v.x, v.y], B1b)}$`,
        dice: v => (v.x === 3 && v.y === 3 ? 'Justo: 9 + 1 = 10 y 1 + 9 = 10.' : v.x !== 3 ? 'Primero llévalo a la recta x = 3.' : 'Está en la recta; ahora iguala las dos distancias.') },
      'En $x = 3$: $9 + (y - 2)^2 = 1 + y^2$ da $4y = 12$ y $y = 3$.')],
    ['La circunferencia',
      xpMira('dibujo', 'Otra condición: estar a una distancia fija de un **centro**.', { dib: circulo, v: { k: 0 }, alto: 226 }, [
        ['Los puntos a distancia 5 de C forman una circunferencia: C es el centro y 5 el radio.', {}, '$\\|X - C\\| = 5$'],
        ['Con coordenadas, la distancia es Pitágoras: la diferencia en x y la diferencia en y.', { k: 1 }],
        ['Elevando al cuadrado sale su ecuación: así se ven el centro y el radio.', { k: 2 }, '$(x - 3)^2 + (y - 2)^2 = 25$'],
        ['Si se desarrolla, quedan escondidos: x² + y² − 6x − 4y − 12 = 0.', { k: 3 }],
        ['Para volver a verlos se completan cuadrados: a x² − 6x le falta 9 y a y² − 4y le falta 4.', { k: 4 }, '$x^2 - 6x + 9 + y^2 - 4y + 4 = 12 + 9 + 4$'],
        ['Con diámetro AB: centro en su punto medio, radio la mitad de AB. Desde el borde, AB se ve en ángulo recto.', { k: 5 }, '$A(0, -2),\\ B(6, 6):\\ M = (3, 2),\\ r = 5$'],
      ], 'Circunferencia: $(x - h)^2 + (y - k)^2 = r^2$. Si viene desarrollada, se completan cuadrados.'),
      xpHaz('dibujo', 'La ecuación $x^2 + y^2 + 2x - 8y + 8 = 0$ esconde una circunferencia de radio 3. Arrastra su centro.', { dib: hazCentro, v: { x: 2, y: 2 }, metas: { x: -1, y: 4 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [-5, 0], max: [4, 8], paso: 1, en: v => P2(P2b, [v.x, v.y]), de: (x, y) => [(x - P2b.ox) / P2b.u, (P2b.oy - y) / P2b.u] }],
        lee: v => `Centro en $${pt([v.x, v.y]).replace(/−/g, '-')}$`,
        dice: v => (v.x === -1 && v.y === 4 ? 'Sí: (x + 1)² + (y − 4)² = 1 + 16 − 8 = 9.' : v.x === 1 && v.y === -4 ? 'Los signos al revés: +2x viene de (x + 1)².' : 'Completa cuadrados: la mitad de cada coeficiente, con el signo cambiado.') },
      '$(x + 1)^2 + (y - 4)^2 = 9$: centro $(-1, 4)$ y radio 3.')],
    ['Donde se cruzan',
      xpMira('dibujo', 'Donde dos lugares se cortan, el punto cumple **las dos** condiciones a la vez.', { dib: cruce, v: { k: 0, b: 2 }, alto: 216 }, [
        ['Cortar dos lugares es resolver sus dos ecuaciones juntas.', {}],
        ['Dos rectas: un sistema 2 × 2. Estas dos se cortan en (1, 1).', { k: 1 }],
        ['Recta y circunferencia: al reemplazar y = 2 − x en la circunferencia sale una cuadrática. Dos raíces: dos cortes.', { k: 2, b: 2 }],
        ['Si la recta sube a x + y = 4, el discriminante da cero: un solo punto. La recta es tangente.', { k: 3, b: 4 }, '$2x^2 - 8x + 8 = 0$'],
        ['Más arriba, x + y = 6, el discriminante es negativo: la recta pasa por fuera.', { k: 4, b: 6 }],
        ['Dos circunferencias: al restar sus ecuaciones se van los cuadrados y queda una recta, la de la cuerda común.', { k: 5 }, '$8x - 16 = 0 \\Rightarrow x = 2$'],
      ], 'Cruzar lugares es resolver sus ecuaciones juntas; el discriminante dice si hay 2, 1 o 0 cortes.'),
      xpHaz('dibujo', 'Desliza b hasta que la recta $y = x + b$ toque la circunferencia $x^2 + y^2 = 18$ en **un solo punto**, por arriba.', { dib: hazToca, v: { b: 0 }, metas: { b: 6 }, alto: 274,
        manijas: [{ k: 'b', min: 0, max: 10, paso: 1, et: 'b' }],
        lee: v => `$2x^2 + ${2 * v.b}x + ${v.b * v.b - 18} = 0$: discriminante $${144 - 4 * v.b * v.b}$`.replace('+ -', '- '),
        dice: v => (v.b === 6 ? 'Tangente: 144 − 4·36 = 0, y toca en (−3, 3).' : v.b < 6 ? 'Todavía corta en dos puntos: el discriminante es positivo.' : 'Ya pasa por fuera: el discriminante es negativo.') },
      'Con $y = x + b$: $2x^2 + 2bx + b^2 - 18 = 0$, con discriminante $144 - 4b^2$, que es 0 si $b = 6$.')],
    ['Bisectriz, circuncentro y regiones',
      xpMira('dibujo', 'Tres lugares más: la **bisectriz**, el **circuncentro** y las **regiones**.', { dib: otros, v: { k: 0 }, alto: 200 }, [
        ['La bisectriz de un ángulo es el lugar de los puntos a la misma distancia de sus dos lados.', {}],
        ['Su dirección: la suma de los vectores unitarios de los lados. Aquí (1, 0) + (4/5, 3/5), que va como (3, 1).', { k: 1 }],
        ['Ojo: sumar (1, 0) + (4, 3) sin volverlos unitarios da otra recta, que no parte el ángulo en dos.', { k: 2 }],
        ['El circuncentro equidista de A, B y C: está en dos mediatrices a la vez.', { k: 3 }],
        ['Dos mediatrices se cortan en O. La circunferencia de centro O pasa por los tres puntos.', { k: 4 }, '$OA^2 = OB^2 = OC^2 = 10$'],
        ['Con desigualdades se describen regiones: ≤ en la circunferencia da el disco, y una recta lo parte.', { k: 5 }, '$(x - 4)^2 + (y - 2)^2 \\le 9,\\ y \\ge x - 2$'],
      ], 'Bisectriz: suma de unitarios. Circuncentro: cruce de mediatrices. Desigualdades: regiones.'),
      xpHaz('dibujo', 'Arrastra O al punto que está a la **misma distancia** de A(0, 2), B(6, 2) y C(2, 6).', { dib: hazCirc, v: { x: 1, y: 1 }, metas: { x: 3, y: 3 }, alto: 230,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [7, 7], paso: 1, en: v => P2(P4b, [v.x, v.y]), de: (x, y) => [(x - P4b.ox) / P4b.u, (P4b.oy - y) / P4b.u] }],
        lee: v => `Distancias al cuadrado: $${T4.map(t => d2([v.x, v.y], t)).join(',\\ ')}$`,
        dice: v => (v.x === 3 && v.y === 3 ? 'Justo: las tres distancias al cuadrado valen 10.' : v.x === 3 ? 'Estás en la mediatriz de AB; falta la de AC.' : 'Busca la mediatriz de AB (vertical) y la de AC, y crúzalas.') },
      'La mediatriz de AB es $x = 3$ y la de AC es $x + 2y = 9$: se cortan en $(3, 3)$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un faro en el origen ilumina hasta 5 km: $x^2 + y^2 \\le 25$. Un barco viene del oeste por la ruta $y = 7 - x$. Arrastra el barco al punto donde **entra** a la luz.', { dib: faro, v: { x: 0 }, metas: { x: 3 }, alto: 252,
        manijas: [{ k: 'x', min: -1, max: 8, paso: 1, en: v => P2(PF, [v.x, 7 - v.x]), de: x => (x - PF.ox) / PF.u }],
        lee: v => `$x^2 + (7 - x)^2 = ${v.x * v.x + (7 - v.x) ** 2}$`,
        dice: v => (v.x === 3 ? 'Ahí entra: 9 + 16 = 25. Sale en (4, 3).' : v.x === 4 ? 'Por (4, 3) el barco sale de la luz; viene del oeste, de x pequeños.' : 'Reemplaza y = 7 − x en x² + y² = 25 y resuelve la cuadrática.') },
      '$x^2 + (7 - x)^2 = 25$ da $x^2 - 7x + 12 = 0$, con $x = 3$ o $x = 4$: entra en $(3, 4)$ y sale en $(4, 3)$.')],
  ], 'Un lugar es una condición; sus cruces salen de sistemas, cuadráticas y restas de ecuaciones.');
}
