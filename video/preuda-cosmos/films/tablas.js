// «Tablas de doble entrada» · escenas de la lección pu-or-3. Motor en kit.js, preu.js y piezas.js; guion en tablas.data.js.
// ✓ en verde, ✗ en rosa, la casilla que se mira en lima y las pistas que unen en ámbar.
const NOW = C.lime, RES = C.green, BAD = C.mag, LINK = C.amber;
// Marcas que aparecen con el tiempo: [segundo, fila, columna, '✓' | '✗'].
const marks = (list, t) => (i, j) => { let m = null; for (const [t0, a, b, s] of list) if (t >= t0 && a === i && b === j) m = s; return m ? [m, m === '✓' ? RES : BAD] : null; };
const hl = (G, i, j, cw, ch, col = NOW, k = 1) => fade(k, () => stroke(col, 4, () => X.roundRect(G.cx(j) - cw / 2 + 4, G.cy(i) - ch / 2 + 4, cw - 8, ch - 8, 10), { g: 14 }));
const PETS = [[1.4, 0, 1, '✗'], [9.4, 1, 0, '✗'], [10.6, 1, 1, '✗'], [12.6, 1, 2, '✓']];
const PETS2 = [...PETS.map(([, a, b, s]) => [0, a, b, s]), [9.4, 0, 2, '✗'], [9.9, 2, 2, '✗'], [12, 0, 0, '✓'], [13.6, 2, 0, '✗'], [18.6, 2, 1, '✓']];
const pets = (t, list, o = {}) => gridT(150, o.y || 520, 220, 120, ['Pía', 'Quique', 'Rosa'], ['chocolate', 'agua', 'limonada'], marks(list, t), { hw: 180, rs: 36, hs: 26, cs: 50 });
const S = {
  // 1 · El reto: Laura, Mónica y Natalia.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Laura, Mónica y Natalia son, no necesariamente en ese orden,', 'médica, abogada e ingeniera, y cada una vive en una ciudad', 'distinta: Bogotá, Cali y Medellín. La abogada vive en Cali;', 'Mónica vive en Bogotá; Natalia no vive en Cali, y la', 'ingeniera no vive en Bogotá. Con certeza, Natalia es:'], opts: ['Ingeniera, en Medellín', 'Médica, en Medellín', 'Abogada, en Medellín', 'Ingeniera, en Cali'], ok: 0, os: 34 });
    fade(A(t, 9.6, .6), () => {
      [['Laura', C.amber], ['Mónica', C.cyan], ['Natalia', C.violet]].forEach(([n, c], i) => fade(A(t, 10 + i * .4, .4), () => pill(240 + i * 300, 1000, 220, 70, c, n, { s: 32, fill: .2 })));
      fade(A(t, 12, .5), () => { ['médica', 'abogada', 'ingeniera'].forEach((s, i) => pill(240 + i * 300, 1130, 200, 56, C.dim, s, { s: 26, fill: .05 })); ['Bogotá', 'Cali', 'Medellín'].forEach((s, i) => pill(240 + i * 300, 1230, 200, 56, C.dim, s, { s: 26, fill: .05 })); });
      fade(A(t, 20.4, .5), () => mono('nueve casillas por tabla: mejor en papel', CX, 1360, NOW, { s: 26 }));
    });
  },
  // 2 · La tabla.
  tabla(t) {
    stars(t, .3);
    const G = pets(t, []);
    fade(A(t, 9.2, .5), () => { hl(G, 0, 1, 220, 120); mono('Pía toma agua: sí o no', CX, 1000, NOW, { s: 28 }); });
    fade(A(t, 18.2, .5), () => { pill(360, 1120, 200, 80, RES, '✓  sí', { s: 36 }); pill(720, 1120, 200, 80, BAD, '✗  no', { s: 36 }); });
  },
  // 3 · Las pistas negativas.
  negativas(t) {
    stars(t, .3);
    const G = pets(t, PETS);
    fade(win(t, .8, 8.6), () => hl(G, 0, 1, 220, 120, BAD));
    fade(win(t, 9.2, 13), () => { hl(G, 1, 0, 220, 120, BAD); hl(G, 1, 1, 220, 120, BAD); });
    fade(A(t, 12.6, .4), () => hl(G, 1, 2, 220, 120, RES));
    jT(t < 9 ? '«Pía no toma agua»' : '«Quique no toma chocolate ni agua»', CX, 1040, C.ink, 40);
    fade(A(t, 18.2, .5), () => mono('cada «no» tacha una casilla', CX, 1120, NOW, { s: 26 }));
  },
  // 4 · Un solo ✓ por fila y por columna.
  unico(t) {
    stars(t, .3);
    const G = pets(t, PETS2);
    fade(win(t, .8, 13), () => stroke(NOW, 3, () => X.roundRect(G.cx(2) - 106, G.cy(0) - 56, 212, 352, 14), { g: 12 }));
    fade(win(t, 11.4, 17.4), () => hl(G, 0, 0, 220, 120, RES));
    fade(A(t, 18.4, .4), () => hl(G, 2, 1, 220, 120, RES));
    fade(A(t, 19.6, .5), () => mono('Pía: chocolate · Quique: limonada · Rosa: agua', CX, 1060, RES, { s: 28 }));
  },
  // 5 · Pistas que unen dos tablas.
  enlace(t) {
    stars(t, .3);
    const rows = ['Laura', 'Mónica', 'Natalia'];
    gridT(30, 520, 120, 100, rows, ['médica', 'abogada', 'ingen.'], () => null, { hw: 140, rs: 26, hs: 20 });
    gridT(560, 520, 130, 100, rows.map(() => ''), ['Bogotá', 'Cali', 'Medellín'], () => null, { hw: 20, hs: 20 });
    fade(A(t, 10, .5), () => {
      jT('«La abogada vive en Cali»', CX, 1000, C.ink, 40);
      stroke(LINK, 4, () => { X.moveTo(350, 540); X.quadraticCurveTo(560, 400, 775, 540); }, { g: 14 });
      mono('abogada', 330, 450, LINK, { s: 22 }); mono('Cali', 790, 450, LINK, { s: 22 });
    });
    fade(A(t, 20, .5), () => { mono('se sabe quién vive en Cali', CX, 1100, NOW, { s: 26 }); arrow(CX, 1120, CX, 1180, NOW, 1, 3, { h: 10 }); mono('entonces se sabe quién es la abogada', CX, 1230, NOW, { s: 26 }); });
  },
  // 6 · Problema: las cuatro cajas.
  cajas(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Cuatro cajas, una roja, una azul, una verde y una negra,', 'pesan 3, 5, 8 y 12 kilogramos, no necesariamente en ese', 'orden. La roja pesa más que la azul; la verde y la azul', 'pesan juntas lo mismo que la negra, y la verde no es la', 'más liviana. Los pesos de la roja y de la verde son:'], opts: ['12 y 5', '12 y 3', '8 y 5', '5 y 3'], ok: 0, rv: 22.6 });
    const list = [[11.6, 3, 2, '✓'], [12.4, 1, 0, '✓'], [12.4, 2, 1, '✓'], [20.4, 2, 0, '✗'], [21, 1, 1, '✗'], [21.6, 0, 3, '✓']];
    fade(A(t, 9.8, .5), () => {
      const cols = ['#ff5a6a', C.blue, C.green, '#9aa3c0'];
      gridT(110, 900, 170, 96, ['roja', 'azul', 'verde', 'negra'], ['3', '5', '8', '12'], (i, j) => { if (i === 1 && j <= 1 && t >= 12.4 && t < 20.4) return ['?', LINK]; if (i === 2 && j <= 1 && t >= 12.4 && t < 20.4) return ['?', LINK]; return marks(list, t)(i, j); }, { hw: 180, rs: 32, hs: 30, cs: 44 });
      ['roja', 'azul', 'verde', 'negra'].forEach((n, i) => dot(120, 900 + 77 + i * 96, 10, cols[i], 12));
      fade(A(t, 10.6, .5), () => F([['verde + azul = negra:  ', 'r'], ['3 + 5 = 8', 'r', LINK]], CX, 1430, 42));
    });
  },
  // 7 · Pistas con cuentas: probar las parejas.
  cuentas(t) {
    stars(t, .3);
    const pairs = [[3, 5], [3, 8], [3, 12], [5, 8], [5, 12], [8, 12]];
    pairs.forEach(([a, b], i) => fade(A(t, 1 + i * .6, .4), () => {
      const s = a + b, ok = [3, 5, 8, 12].includes(s), x = 300 + (i % 2) * 480, y = 520 + Math.floor(i / 2) * 150;
      pill(x, y, 380, 100, ok && t > 9 ? RES : C.dim, `${a} + ${b} = ${s}`, { s: 44, fill: ok && t > 9 ? .2 : .05 });
      if (t > 9.4) check(x + 220, y, 18, ok, A(t, 9.4 + i * .3, .5));
    }));
    fade(A(t, 18.2, .5), () => { mono('solo 8 está en la lista: la negra pesa 8', CX, 1060, RES, { s: 28 }); mono('la cuenta se vuelve un ✓ en la tabla', CX, 1120, NOW, { s: 26 }); });
  },
  // 8 · El método.
  pasos(t) {
    stars(t, .3);
    [['1', 'Armar una tabla por tipo de dato', 1], ['2', 'Pistas directas y negativas', 9.2], ['3', 'Propagar: cada ✓ tacha fila y columna', 18.2]].forEach(([n, s, t0], i) => fade(A(t, t0, .6), () => {
      const y = 560 + i * 260; nodeC(170, y, 60, [NOW, C.cyan, C.amber][i], n, { s: 54 }); jT(s, 260, y + 14, C.ink, 38, { a: 'l', max: 760 });
      if (i) arrow(170, y - 190, 170, y - 70, hexA(NOW, .6), 1, 2.5, { h: 10 });
    }));
  },
  // 9 · Las tres resueltas.
  resolver(t) {
    stars(t, .3);
    const rows = ['Laura', 'Mónica', 'Natalia'];
    const city = [[1, 1, 0, '✓'], [1.6, 0, 0, '✗'], [1.6, 2, 0, '✗'], [3.6, 2, 1, '✗'], [4.6, 2, 2, '✓'], [5.6, 0, 1, '✓']];
    const prof = [[11, 0, 1, '✓'], [20.4, 1, 2, '✗'], [21.4, 1, 0, '✓'], [22.4, 2, 2, '✓']];
    gridT(110, 440, 200, 96, rows, ['Bogotá', 'Cali', 'Medellín'], marks(city, t), { hw: 180, rs: 32, hs: 24, cs: 44 });
    fade(A(t, 9.6, .5), () => {
      gridT(110, 860, 200, 96, rows, ['médica', 'abogada', 'ingeniera'], marks(prof, t), { hw: 180, rs: 32, hs: 24, cs: 44 });
      stroke(LINK, 3, () => { X.moveTo(590, 640); X.quadraticCurveTo(700, 800, 590, 1000); }, { g: 10 }); mono('Cali = abogada', 800, 820, LINK, { s: 22 });
    });
    fade(A(t, 24, .5), () => mono('Natalia: ingeniera y Medellín', CX, 1330, RES, { s: 30 }));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['Ingeniera, Medellín', 'Médica, Medellín', 'Abogada, Medellín', 'Ingeniera, Cali'], 0, 'Mónica: Bogotá · Laura: Cali y abogada · Natalia: ingeniera', { s: 30, fs: 32 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['filas × columnas', 'r']], 'la tabla'], [[['un ✓ por fila', 'r']], 'y por columna'], [[['«no» → ✗', 'r']], 'tachar'], [[['pista que une', 'r']], 'dos tablas']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [RES, NOW, LINK]);
    });
  },
};
