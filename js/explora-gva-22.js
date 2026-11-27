// Geometría Vectorial · explicación de geo-22 «La circunferencia y la parábola» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: las cónicas son cortes de un cono; la circunferencia se fija con tres condiciones; la parábola equidista de un
// foco y una directriz, y al trasladar los ejes al vértice su ecuación se simplifica. Los ejemplos no son los de los ejercicios.
{
  const R = Math.PI / 180;
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
  const ins = (P, q) => q[0] >= P.x0 - 1e-9 && q[0] <= P.x1 + 1e-9 && q[1] >= P.y0 - 1e-9 && q[1] <= P.y1 + 1e-9;
  const traza = (K, P, pts, cls) => {
    let h = '', run = [];
    const corta = () => { if (run.length > 1) h += K.pl(run, cls); run = []; };
    pts.forEach(q => { if (ins(P, q)) run.push(P2(P, q)); else corta(); });
    corta();
    return h;
  };
  // (x − h)² = 4p(y − k) si eje 'x'; (y − k)² = 4p(x − h) si eje 'y'.
  const parab = c => { const o = []; for (let i = 0; i <= 80; i++) { const t = -12 + 24 * i / 80; o.push(c.eje === 'x' ? [c.h + t, c.k + t * t / (4 * c.p)] : [c.h + t * t / (4 * c.p), c.k + t]); } return o; };
  const dot = (K, P, q, s, cls = 'fk', dx = 8, dy = -8, a = 'start') => { const [x, y] = P2(P, q); return K.c(x, y, 4.5, cls) + (s ? K.t(x + dx, y + dy, s, 's', a) : ''); };
  const k = v => Math.round(v.k);

  // 1 · el cono doble y el plano que lo corta.   v { g, s (plano visible), c (curva visible), m (plano por el vértice) }
  const TIPO = (g, gen) => (g === 0 ? 'circunferencia' : g < gen ? 'elipse' : g === gen ? 'parábola' : 'hipérbola');
  const V1 = [104, 104], H1 = 80, Q1 = [118, 140];
  const icono = (K, tipo, cls) => {
    const c = [276, 112], q = [];
    if (tipo === 'circunferencia') return K.arc(c[0], c[1], 28, 0, 360, cls);
    if (tipo === 'elipse') { for (let i = 0; i <= 48; i++) { const a = i / 48 * 2 * Math.PI; q.push([c[0] + 38 * Math.cos(a), c[1] - 20 * Math.sin(a)]); } return K.pl(q, cls); }
    if (tipo === 'parábola') { for (let i = 0; i <= 40; i++) { const t = -36 + 72 * i / 40; q.push([c[0] + t, c[1] + 34 - t * t / 18]); } return K.pl(q, cls); }
    if (tipo === 'rectas') return K.l(c[0] - 30, c[1] - 30, c[0] + 30, c[1] + 30, cls) + K.l(c[0] - 30, c[1] + 30, c[0] + 30, c[1] - 30, cls);
    const rama = s => { const z = []; for (let i = 0; i <= 30; i++) { const u = -1.4 + 2.8 * i / 30; z.push([c[0] + s * 12 * Math.cosh(u), c[1] - 20 * Math.sinh(u)]); } return K.pl(z, cls); };
    return rama(1) + rama(-1);
  };
  const aro = (K, cx, cy, rx, ry, cls) => { const q = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * 2 * Math.PI; q.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); } return K.pl(q, cls); };
  const cono = (w, K, gen = 45) => {
    const v = { g: Math.round(w.g), s: Math.round(w.s), c: Math.round(w.c), m: Math.round(w.m) };
    const dx = H1 / Math.tan(gen * R), Q = v.m ? V1 : Q1;
    let h = K.l(V1[0], 14, V1[0], 196, 'lm d');
    for (const s of [1, -1]) h += K.l(V1[0] - s * dx, V1[1] - H1, V1[0] + s * dx, V1[1] + H1, 'lg gr');
    h += aro(K, V1[0], V1[1] - H1, dx, 9, 'lg') + aro(K, V1[0], V1[1] + H1, dx, 9, 'lg') + K.c(...V1, 3.5, 'fk') + K.t(V1[0] - 10, V1[1] + 4, 'V', 's', 'end');
    h += K.arc(...V1, 20, 0, gen, 'lg') + K.t(V1[0] + 26, V1[1] - 6, `${gen}°`, 's tg', 'start');
    if (v.s) {
      const d = [Math.cos(v.g * R), -Math.sin(v.g * R)];
      let a = -200, b = 200;
      [[Q[0], d[0], 6, 230], [Q[1], d[1], 6, 194]].forEach(([q, dq, lo, hi]) => { if (Math.abs(dq) < 1e-9) return; let t1 = (lo - q) / dq, t2 = (hi - q) / dq; if (t1 > t2) [t1, t2] = [t2, t1]; a = Math.max(a, t1); b = Math.min(b, t2); });
      h += K.l(Q[0] + a * d[0], Q[1] + a * d[1], Q[0] + b * d[0], Q[1] + b * d[1], 'la gr') + K.t(Q[0] + 26, Q[1] + 18, `${v.g}°`, 's ta', 'start');
    }
    if (v.c) { const t = v.m ? 'rectas' : TIPO(v.g, gen); h += icono(K, t, 'lo gr') + K.t(276, 176, v.m ? 'dos rectas' : t, 's to'); }
    return h;
  };

  // 2 · la circunferencia de centro (1, 2) y radio 3.   v { k }
  const P2c = pl({ x0: -3, x1: 5, y0: -2, y1: 6 }, 40 + 3 * 22, 26 + 6 * 22, 22);
  const circulo = (v, K) => {
    const q = k(v), C = P2(P2c, [1, 2]);
    let h = pap(K, P2c) + K.arc(...C, 3 * P2c.u, 0, 360, 'la gr') + dot(K, P2c, [1, 2], 'C', 'fk', 8, 14);
    if (q >= 1) h += K.t(332, 18, '(x − 1)² + (y − 2)² = 9', 's ta', 'end');
    if (q >= 2) h += K.t(332, 36, 'x² + y² − 2x − 4y − 4 = 0', 's tm', 'end');
    if (q >= 3) h += [[4, 2], [-2, 2], [1, 5]].map(z => dot(K, P2c, z, '', 'fo')).join('');
    if (q >= 4) h += K.t(332, 214, 'tres puntos → D, E, F', 's to', 'end');
    if (q >= 5) h += K.l(P2c.X(-3), P2c.Y(-1), P2c.X(5), P2c.Y(-1), 'lf gr') + K.l(...C, P2c.X(1), P2c.Y(-1), 'lo d') + dot(K, P2c, [1, -1], '', 'fo') + K.t(P2c.X(1) + 6, P2c.Y(0.5), 'r = 3', 's to', 'start');
    return h;
  };
  // Tu turno: centro (2, 1) y tangente 3x + 4y = 0.   v { r }
  const P2b = pl({ x0: -2, x1: 6, y0: -3, y1: 5 }, 70 + 2 * 22, 26 + 5 * 22, 22);
  const hazTangente = (v, K) => {
    const C = P2(P2b, [2, 1]), ln = [];
    for (let i = 0; i <= 40; i++) { const t = -8 + 16 * i / 40; ln.push([4 * t / 5, -3 * t / 5]); }
    return pap(K, P2b) + traza(K, P2b, ln, 'lf gr') + K.arc(...C, v.r * P2b.u, 0, 360, 'la gr') + dot(K, P2b, [2, 1], 'C', 'fk', 8, 14)
      + K.t(8, 16, 'recta: 3x + 4y = 0', 's tf', 'start') + K.t(332, 16, `(x − 2)² + (y − 1)² = ${v.r * v.r}`, 's ta', 'end');
  };

  // 3 · la parábola de foco (0, 1) y directriz y = −1.   v { k }
  const P3 = pl({ x0: -5, x1: 5, y0: -2, y1: 6 }, 170, 40 + 6 * 22, 22);
  const C3 = { eje: 'x', h: 0, k: 0, p: 1 };
  const parabola = (v, K) => {
    const q = k(v), F = [0, 1];
    let h = pap(K, P3) + K.l(P3.X(-5), P3.Y(-1), P3.X(5), P3.Y(-1), 'lf gr') + K.t(P3.X(-5), P3.Y(-1) + 16, 'directriz y = −1', 's tf', 'start') + dot(K, P3, F, 'F', 'fk', 8, -6);
    if (q === 1 || q === 2) {
      const Pq = [2, 1], A = P2(P3, Pq);
      h += dot(K, P3, [0, 0], 'V', 'fA', -8, 16, 'end') + K.l(...A, ...P2(P3, F), 'lg') + K.l(...A, P3.X(2), P3.Y(-1), 'lg') + dot(K, P3, Pq, '', 'fo') + K.t(332, 18, 'PF = 2 = distancia a la recta', 's tm', 'end');
    }
    if (q >= 2) h += traza(K, P3, parab(C3), 'la gr') + (q === 2 ? K.t(332, 36, 'x² = 4y', 's ta', 'end') : '');
    if (q === 3) h += K.l(...P2(P3, [-2, 1]), ...P2(P3, [2, 1]), 'lo gr') + K.t(332, 18, 'lado recto: |4p| = 4', 's to', 'end');
    if (q === 4) h += traza(K, P3, parab({ eje: 'y', h: 0, k: 0, p: 1 }), 'lf gr d') + K.t(332, 18, 'y² = 4x abre a la derecha', 's tm', 'end');
    if (q >= 5) [-3, -1.6, 1.6, 3].forEach(x => { const H = P2(P3, [x, x * x / 4]); h += K.l(H[0], P3.Y(6), ...H, 'lg') + K.ar(...H, ...P2(P3, F), 'lo'); });
    return h;
  };
  // Tu turno: foco (3, 2) y directriz x = −1; el vértice.   v { x, y }
  const P3b = pl({ x0: -2, x1: 5, y0: -1, y1: 5 }, 70 + 2 * 26, 34 + 5 * 26, 26);
  const hazVertice = (v, K) => pap(K, P3b) + K.l(P3b.X(-1), P3b.Y(-1), P3b.X(-1), P3b.Y(5), 'lf gr') + K.t(8, 16, 'directriz x = −1', 's tf', 'start')
    + dot(K, P3b, [3, 2], 'F', 'fk', 8, -6) + K.t(332, 16, `V = ${pt([v.x, v.y])}`, 's ta', 'end');

  // 4 · traslación de ejes: x² + 4x − 4y + 8 = 0 es (x + 2)² = 4(y − 1).   v { k }
  const P4 = pl({ x0: -6, x1: 3, y0: -1, y1: 6 }, 40 + 6 * 24, 40 + 6 * 24, 24);
  const traslada = (v, K) => {
    const q = k(v), O = P2(P4, [-2, 1]);
    let h = pap(K, P4) + traza(K, P4, parab({ eje: 'x', h: -2, k: 1, p: 1 }), 'la gr');
    if (q >= 1) h += K.ar(O[0], O[1], P4.X(3), O[1], 'lo') + K.ar(O[0], O[1], O[0], P4.Y(6), 'lo') + K.c(...O, 4, 'fo') + K.t(O[0] - 8, O[1] + 16, 'O′', 's to', 'end') + K.t(P4.X(3) - 2, O[1] - 6, 'x′', 's to', 'end') + K.t(O[0] + 6, P4.Y(6) + 12, 'y′', 's to', 'start');
    if (q >= 2) h += K.t(332, 18, 'x² + 4x − 4y + 8 = 0', 's tm', 'end');
    if (q >= 4) h += K.t(332, 36, '(x + 2)² = 4(y − 1)', 's ta', 'end') + K.t(332, 54, 'x′² = 4y′', 's to', 'end');
    if (q >= 5) h += dot(K, P4, [-2, 2], 'F', 'fk', 8, -6) + K.l(P4.X(-6), P4.Y(0), P4.X(3), P4.Y(0), 'lf gr');
    return h;
  };
  // Tu turno: y² + 2y − 4x + 9 = 0; el nuevo origen en el vértice.   v { x, y }
  const P4b = pl({ x0: -2, x1: 6, y0: -4, y1: 3 }, 60 + 2 * 26, 34 + 3 * 26, 26);
  const hazOrigen = (v, K) => {
    const O = P2(P4b, [v.x, v.y]);
    return pap(K, P4b) + K.l(P4b.X(-2), O[1], P4b.X(6), O[1], 'lo d') + K.l(O[0], P4b.Y(-4), O[0], P4b.Y(3), 'lo d')
      + K.t(8, 16, 'y² + 2y − 4x + 9 = 0', 's ta', 'start') + K.t(332, 16, `O′ = ${pt([v.x, v.y])}`, 's tm', 'end');
  };

  // Problema: el reflector de un faro de carro, 24 cm de boca y 4 cm de fondo.   v { r }
  const VF = [170, 206], UF = 9;
  const faro = (v, K) => {
    const X = x => VF[0] + x * UF, Y = y => VF[1] - y * UF, z = [];
    for (let i = 0; i <= 40; i++) { const x = -12 + 24 * i / 40; z.push([X(x), Y(x * x / 36)]); }
    return K.pl(z, 'lm gr') + K.l(VF[0], VF[1], VF[0], Y(16), 'lm d') + K.t(8, 36, 'boca: 24 cm de ancho', 's tm', 'start') + K.l(X(-12), Y(4) - 6, X(-12), Y(4) + 6, 'lm') + K.l(X(12), Y(4) - 6, X(12), Y(4) + 6, 'lm') + K.l(X(12) + 10, Y(0), X(12) + 10, Y(4), 'lm') + K.t(X(12) + 16, Y(2) + 4, '4 cm', 's tm', 'start')
      + K.c(VF[0], Y(v.r), 5, 'fA') + K.t(8, 18, `bombilla a ${v.r} cm del fondo`, 's ta', 'start');
  };

  xpLec('geo-22', [
    ['Cortes de un cono',
      xpMira('dibujo', 'Las **cónicas** salen de cortar un cono doble con un plano. La inclinación del plano decide la curva.', { dib: cono, v: { g: 0, s: 0, c: 0, m: 0 }, alto: 200 }, [
        ['Un cono doble: dos conos unidos por el vértice V. Las rectas que lo forman son las generatrices.', {}],
        ['Un plano perpendicular al eje corta una circunferencia.', { g: 0, s: 1, c: 1 }],
        ['Si se inclina un poco, menos que la generatriz, atraviesa toda la hoja: sale una elipse, cerrada.', { g: 20, s: 1, c: 1 }],
        ['Paralelo a una generatriz, nunca vuelve a salir de la hoja: la curva queda abierta. Es una parábola.', { g: 45, s: 1, c: 1 }],
        ['Más inclinado que la generatriz, corta las dos hojas: dos ramas, una hipérbola.', { g: 75, s: 1, c: 1 }],
        ['Si el plano pasa por el vértice, el corte degenera: un punto o un par de rectas.', { g: 75, s: 1, c: 1, m: 1 }],
      ], 'Plano perpendicular al eje: circunferencia; poco inclinado: elipse; paralelo a la generatriz: parábola; más: hipérbola.'),
      xpHaz('dibujo', 'Este cono tiene las generatrices a $45^{\\circ}$. Inclina el plano para que el corte sea una **elipse**.', { dib: cono, v: { g: 0, s: 1, c: 0, m: 0 }, metas: { g: 30 }, cumple: v => v.g > 0 && v.g < 45, alto: 250,
        manijas: [{ k: 'g', min: 0, max: 90, paso: 15, et: 'inclinación del plano' }],
        lee: v => `Plano a $${v.g}^{\\circ}$`,
        dice: v => (v.g > 0 && v.g < 45 ? 'Elipse: menos inclinado que la generatriz, el corte se cierra.' : v.g === 0 ? 'Horizontal da una circunferencia: inclínalo un poco.' : v.g === 45 ? 'Paralelo a la generatriz: parábola. Un poco menos.' : 'Corta las dos hojas: hipérbola. Mucho menos.') },
      'La elipse sale con el plano entre la horizontal y la inclinación de la generatriz.')],
    ['La circunferencia, una cónica',
      xpMira('dibujo', 'La circunferencia es la cónica del corte perpendicular al eje. Veamos qué la determina.', { dib: circulo, v: { k: 0 }, alto: 226 }, [
        ['Centro C(1, 2) y radio 3: todos los puntos a distancia 3 de C.', {}],
        ['Su ecuación ordinaria muestra el centro y el radio.', { k: 1 }, '$(x - 1)^2 + (y - 2)^2 = 9$'],
        ['Desarrollada es la ecuación general: x² y y² con el mismo coeficiente y sin término xy.', { k: 2 }, '$x^2 + y^2 + Dx + Ey + F = 0$'],
        ['Tiene tres números libres, D, E y F: bastan tres condiciones, como tres puntos.', { k: 3 }],
        ['Cada punto reemplazado da una ecuación lineal en D, E, F: un sistema de tres ecuaciones.', { k: 4 }, '$(4, 2):\\ 4D + 2E + F = -20$'],
        ['Con el centro y una tangente: el radio es la distancia del centro a la recta.', { k: 5 }, '$y = -1:\\ r = 2 - (-1) = 3$'],
      ], 'Tres condiciones fijan la circunferencia: tres puntos, o el centro y una tangente.'),
      xpHaz('dibujo', 'Desliza el radio para que la circunferencia de centro $(2, 1)$ sea **tangente** a la recta $3x + 4y = 0$.', { dib: hazTangente, v: { r: 1 }, metas: { r: 2 }, alto: 250,
        manijas: [{ k: 'r', min: 1, max: 6, paso: 1, et: 'radio' }],
        lee: v => `$r = ${v.r}$`,
        dice: v => (v.r === 2 ? 'Tangente: |3·2 + 4·1|/5 = 10/5 = 2.' : v.r < 2 ? 'No llega a la recta: calcula la distancia del centro a ella.' : 'Corta la recta en dos puntos: el radio sobra.') },
      'Radio de la tangente: $\\dfrac{|3 \\cdot 2 + 4 \\cdot 1|}{\\sqrt{9 + 16}} = 2$.')],
    ['La parábola: foco y directriz',
      xpMira('dibujo', 'La **parábola** es el lugar de los puntos a la misma distancia de un punto, el foco, y de una recta, la directriz.', { dib: parabola, v: { k: 0 }, alto: 226 }, [
        ['Foco F(0, 1) y directriz y = −1. ¿Qué puntos están a la misma distancia de los dos?', {}],
        ['El vértice V(0, 0), en la mitad. Y (2, 1): está a 2 del foco y a 2 de la directriz.', { k: 1 }],
        ['Todos juntos forman la parábola. p = 1 es la distancia con signo del vértice al foco.', { k: 2 }, '$x^2 = 4py = 4y$'],
        ['El lado recto es la cuerda por el foco perpendicular al eje: de (−2, 1) a (2, 1). Mide |4p| = 4.', { k: 3 }],
        ['Si la y va al cuadrado, el eje es horizontal: abre a un lado.', { k: 4 }, '$(y - k)^2 = 4p\\,(x - h)$'],
        ['Propiedad reflectora: todo rayo paralelo al eje rebota en la parábola hacia el foco.', { k: 5 }],
      ], 'Parábola: igual distancia al foco y a la directriz. Vértice en la mitad, lado recto |4p|, reflejos al foco.'),
      xpHaz('dibujo', 'El foco es $F(3, 2)$ y la directriz, $x = -1$. Arrastra el **vértice** de la parábola.', { dib: hazVertice, v: { x: -2, y: 4 }, metas: { x: 1, y: 2 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [-2, -1], max: [5, 5], paso: 1, en: v => P2(P3b, [v.x, v.y]), de: (x, y) => [(x - P3b.ox) / P3b.u, (P3b.oy - y) / P3b.u] }],
        lee: v => `Vértice en $${pt([v.x, v.y]).replace(/−/g, '-')}$`,
        dice: v => (v.x === 1 && v.y === 2 ? 'Justo en la mitad: a 2 del foco y a 2 de la directriz.' : v.y !== 2 ? 'El vértice está en el eje: la recta por F perpendicular a la directriz.' : 'Está en el eje; busca la mitad entre el foco y la directriz.') },
      'Vértice $(1, 2)$, $p = 2$: $(y - 2)^2 = 8(x - 1)$.')],
    ['Trasladar los ejes',
      xpMira('dibujo', 'Mover los ejes no mueve la curva: solo cambia el nombre de sus puntos. Puesto en el vértice, la ecuación queda limpia.', { dib: traslada, v: { k: 0 }, alto: 226 }, [
        ['Esta parábola tiene el vértice lejos del origen.', {}],
        ['Ponemos un nuevo origen O′ en (h, k). Cada punto cumple x = x′ + h y y = y′ + k.', { k: 1 }, '$x = x\' - 2,\\ y = y\' + 1$'],
        ['Su ecuación general es x² + 4x − 4y + 8 = 0.', { k: 2 }],
        ['Se completa el cuadrado: a x² + 4x le falta 4, y se suma a los dos lados.', { k: 3 }, '$x^2 + 4x + 4 = 4y - 8 + 4$'],
        ['Queda (x + 2)² = 4(y − 1). Con O′ en el vértice (−2, 1), es x′² = 4y′.', { k: 4 }],
        ['Ahora se lee todo: 4p = 4, p = 1, foco (−2, 2), directriz y = 0.', { k: 5 }],
      ], 'Completar el cuadrado es trasladar los ejes al vértice: $(x - h)^2 = 4p\\,(y - k)$ es $x\'^2 = 4p\\,y\'$.'),
      xpHaz('dibujo', 'Arrastra el nuevo origen **O′** al vértice de $y^2 + 2y - 4x + 9 = 0$, para que quede $y\'^2 = 4x\'$.', { dib: hazOrigen, v: { x: 0, y: 0 }, metas: { x: 2, y: -1 }, alto: 226,
        manijas: [{ k: ['x', 'y'], min: [-2, -4], max: [6, 3], paso: 1, en: v => P2(P4b, [v.x, v.y]), de: (x, y) => [(x - P4b.ox) / P4b.u, (P4b.oy - y) / P4b.u] }],
        lee: v => `$O\' = ${pt([v.x, v.y]).replace(/−/g, '-')}$`,
        dice: v => (v.x === 2 && v.y === -1 ? 'Sí: (y + 1)² = 4x − 8 = 4(x − 2).' : v.x === -2 && v.y === 1 ? 'Los signos al revés: (y + 1)² dice k = −1.' : 'Completa el cuadrado en y y saca el 4 de los términos en x.') },
      '$y^2 + 2y + 1 = 4x - 9 + 1$: $(y + 1)^2 = 4(x - 2)$, vértice $(2, -1)$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'El reflector de un faro de carro es parabólico: **24 cm** de boca y **4 cm** de fondo. La luz sale paralela si la bombilla está en el foco. Súbela hasta ahí.', { dib: faro, v: { r: 2 }, metas: { r: 9 }, alto: 230,
        manijas: [{ k: 'r', min: 0, max: 15, paso: 1, en: v => [VF[0], VF[1] - v.r * UF], de: (x, y) => (VF[1] - y) / UF }],
        lee: v => `Bombilla a $${v.r}$ cm del fondo`,
        dice: v => (v.r === 9 ? 'En el foco: 144 = 16p da p = 9 cm. La luz sale paralela al eje.' : v.r === 4 ? 'Esa es la profundidad, no el foco: usa el borde (12, 4) en x² = 4py.' : 'Pon el borde (12, 4) en x² = 4py y despeja p.') },
      'El borde $(12, 4)$ cumple $x^2 = 4py$: $144 = 16p$, $p = 9$ cm.')],
  ], 'Las cónicas son cortes de un cono; la parábola equidista del foco y la directriz y refleja hacia el foco.');
}
