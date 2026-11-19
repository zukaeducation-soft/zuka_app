// «Concluir de una tabla» · escenas de la lección pu-gr-3. Motor en kit.js, preu.js y piezas.js; guion en concluir.data.js.
// Los datos en cian, los totales en ámbar, lo que se cruza en lima, lo falso en magenta y lo comprobado en verde.
const DAT = C.cyan, TOT = C.amber, NOW = C.lime, RES = C.green, BAD = C.mag, PB = C.violet;
const LIB = [[120, 90, 150, 140, 500], [30, 45, 25, 50, 150], [50, 65, 75, 60, 250], [100, 100, 50, 50, 300], [300, 300, 300, 300, 1200]];
const GEN = ['Novela', 'Poesía', 'Ensayo', 'Infantil', 'Total'];
// Tabla de la librería; hl(i, j) da el color de una casilla.
function libro(x, y, hl = () => null, o = {}) {
  return gridT(x, y, o.cw || 150, o.ch || 70, GEN, ['T1', 'T2', 'T3', 'T4', 'Total'], (i, j) => [String(LIB[i][j]), hl(i, j) || (i === 4 || j === 4 ? TOT : null)], { hw: 190, hh: 50, cs: 32, rs: 28, k: o.k });
}
const LEE = [['Jóvenes', 10, 90, 100], ['Adultos', 40, 60, 100], ['Total', 50, 150, 200]];
function lee(x, y, hl = () => null, k = 1) {
  return gridT(x, y, 220, 100, LEE.map(r => r[0]), ['papel', 'celular', 'total'], (i, j) => [String(LEE[i][j + 1]), hl(i, j) || (i === 2 || j === 2 ? TOT : DAT)], { hw: 200, hh: 70, cs: 42, rs: 32, hs: 26, k });
}
const S = {
  // 1 · El reto: las ventas de la librería.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La tabla muestra los libros que vendió una librería en un año,', 'por género y por trimestre. La única afirmación falsa es:'], opts: ['El 40 % de los infantiles se vendió en T3 y T4', 'El 50 % de lo vendido en T3 fue novela', 'La poesía fue el 12.5 % de las ventas del año', 'En T4 se vendió más ensayo que infantil'], ok: 0, col1: true, os: 30 });
    fade(A(t, 9.6, .6), () => libro(70, 900));
  },
  // 2 · La tabla de doble entrada.
  doble(t) {
    stars(t, .3);
    lee(100, 520, (i, j) => t > 9.2 && i === 1 && j === 0 ? NOW : null);
    fade(A(t, 9.4, .5), () => { mono('fila: adultos', 210, 1060, NOW, { s: 24, a: 'l' }); mono('columna: papel', 610, 1060, NOW, { s: 24, a: 'l' }); });
    fade(A(t, 18.2, .5), () => { F([['10 + 90 = ', 'r'], ['100', 'r', TOT]], CX, 1170, 42); F([['10 + 40 = ', 'r'], ['50', 'r', TOT], ['  ·  50 + 150 = ', 'r'], ['200', 'r', TOT]], CX, 1250, 42); });
  },
  // 3 · Porcentaje de qué: el mismo 40.
  deque(t) {
    stars(t, .3);
    const ph = t < 9 ? 0 : t < 18 ? 1 : 2;
    lee(100, 520, (i, j) => (i === 1 && j === 0 ? NOW : ph === 0 && i === 1 && j === 2 ? PB : ph === 1 && i === 2 && j === 0 ? PB : ph === 2 && i === 2 && j === 2 ? PB : null));
    [['40 ÷ 100 = ', '40 %', 'de los adultos', .8], ['40 ÷ 50 = ', '80 %', 'de los que leen en papel', 9.2], ['40 ÷ 200 = ', '20 %', 'de todas las personas', 18.2]].forEach(([a, b, c, t0], i) => fade(A(t, t0, .5), () => { F([[a, 'r'], [b, 'r', i === ph ? NOW : C.mute]], 330, 1110 + i * 110, 44); mono(c, 560, 1100 + i * 110, i === ph ? PB : C.mute, { s: 24, a: 'l' }); }));
  },
  // 4 · Problema: tres planes de telefonía.
  planes(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Plan A: $20 000 más $100 por minuto. Plan B: $35 000 más', '$50 por minuto. Plan C: $60 000 con minutos ilimitados. Para', 'quien habla 250 minutos al mes, el plan más económico es:'], opts: ['El plan A', 'El plan B', 'El plan C', 'A o B, igual'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => [['A', '20 000 + 100 · 250 = ', '45 000', 10.2], ['B', '35 000 + 50 · 250 = ', '47 500', 11.4], ['C', '', '60 000', 12.6]].forEach(([p, a, v, t0], i) => fade(A(t, t0, .4), () => { pill(170, 1000 + i * 120, 90, 80, [DAT, TOT, PB][i], p, { s: 40, r: 16 }); F([[a, 'r'], [v, 'r', i === 0 && t > 20.4 ? RES : C.ink]], 250, 1014 + i * 120, 42, { a: 'l' }); })));
  },
  // 5 · Dónde se cruzan las rectas.
  cruce(t) {
    stars(t, .3);
    const X0 = 170, Y0 = 1180, sx = 820 / 700, sy = 560 / 100000, P = (m, c) => [X0 + m * sx, Y0 - c * sy];
    axes(X0, Y0, 840, 600, 'minutos', 'costo', 1);
    [[m => 20000 + 100 * m, DAT, 'A'], [m => 35000 + 50 * m, TOT, 'B'], [() => 60000, PB, 'C']].forEach(([f, c, L], i) => { curve(u => P(u * 700, Math.min(f(u * 700), 98000)), 0, 1, c, seg(t, 1 + i * .8, 3 + i * .8)); fade(A(t, 3 + i * .8, .4), () => mono(L, P(700, 0)[0] + 30, P(0, f(700))[1] + 10, c, { s: 30 })); });
    fade(A(t, 9.4, .5), () => [[300, 50000], [500, 60000]].forEach(([m, c]) => { dot(...P(m, c), 12, NOW, 18); stroke(hexA(NOW, .5), 2, () => { X.moveTo(...P(m, c)); X.lineTo(...P(m, 0)); }, { dash: [8, 6], g: 0 }); mono(String(m), P(m, 0)[0], Y0 + 40, NOW, { s: 24 }); }));
    fade(A(t, 18.4, .5), () => [['A', 0, 300, DAT], ['B', 300, 500, TOT], ['C', 500, 700, PB]].forEach(([L, a, b, c]) => { stroke(c, 8, () => { X.moveTo(P(a, 0)[0] + 6, Y0 + 80); X.lineTo(P(b, 0)[0] - 6, Y0 + 80); }, { g: 12 }); mono('conviene ' + L, (P(a, 0)[0] + P(b, 0)[0]) / 2, Y0 + 130, c, { s: 22 }); }));
  },
  // 6 · Problema: el torneo incompleto.
  torneo(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Ganar da 3 puntos, empatar 1 y perder 0. Tras 10 partidos,', 'los Búfalos ganaron 5 y perdieron 1, pero en la tabla no', 'aparecen sus empates ni sus puntos. Sus puntos son:'], opts: ['19', '16', '15', '20'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const R = [['Águilas', '10', '6', '2', '2', '20'], ['Búfalos', '10', '5', t > 12 ? '4' : '?', '1', t > 20.4 ? '19' : '?']];
      gridT(60, 960, 150, 90, R.map(r => r[0]), ['PJ', 'G', 'E', 'P', 'Puntos'], (i, j) => [R[i][j + 1], R[i][j + 1] === '?' ? BAD : i === 1 && j === 2 ? NOW : i === 1 && j === 4 ? RES : DAT], { hw: 210, hh: 60, cs: 38, rs: 30, hs: 24 });
      fade(A(t, 12, .5), () => F([['E = 10 − 5 − 1 = ', 'r'], ['4', 'r', NOW]], CX, 1290, 44));
      fade(A(t, 20.4, .5), () => F([['5 · 3 + 4 · 1 = ', 'r'], ['19', 'r', RES]], CX, 1380, 48));
    });
  },
  // 7 · Llenar los huecos: los Cóndores.
  huecos(t) {
    stars(t, .3);
    const G = t > 12 ? '5' : '?', P = t > 20 ? '2' : '?';
    gridT(60, 520, 150, 100, ['Cóndores'], ['PJ', 'G', 'E', 'P', 'Puntos'], (i, j) => [['10', G, '3', P, '18'][j], [DAT, G === '?' ? BAD : RES, DAT, P === '?' ? BAD : RES, DAT][j]], { hw: 210, hh: 60, cs: 44, rs: 32, hs: 24 });
    fade(A(t, 9.2, .5), () => { F([['3 · ', 'r'], ['G', 'i', NOW], [' + 3 · 1 = 18', 'r']], CX, 820, 50); fade(A(t, 11, .5), () => F([['3 · ', 'r'], ['G', 'i', NOW], [' = 15  →  ', 'r'], ['G', 'i', NOW], [' = 5', 'r', RES]], CX, 910, 50)); });
    fade(A(t, 18.2, .5), () => F([['P', 'i', NOW], [' = 10 − 5 − 3 = ', 'r'], ['2', 'r', RES]], CX, 1040, 50));
  },
  // 8 · Cómo cae una afirmación.
  caer(t) {
    stars(t, .3);
    fade(A(t, .8, .5), () => { ['todos', 'siempre', 'cada'].forEach((w, i) => pill(260 + i * 280, 560, 230, 90, BAD, w, { s: 38 })); mono('un solo caso en contra la tumba', CX, 680, BAD, { s: 26 }); });
    fade(A(t, 9.2, .5), () => { pill(280, 840, 330, 100, TOT, 'más de 25 %', { s: 36 }); jT('≠', CX, 852, C.ink, 56); pill(800, 840, 330, 100, DAT, 'exactamente 25 %', { s: 36 }); mono('300 de 1 200 es justo la cuarta parte', CX, 950, C.mute, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { ['fila', 'columna', 'toda la tabla'].forEach((w, i) => pill(240 + i * 300, 1130, 260, 90, NOW, w, { s: 34 })); mono('el porcentaje, siempre con su total', CX, 1250, NOW, { s: 26 }); });
  },
  // 9 · La librería resuelta.
  resolver(t) {
    stars(t, .3);
    const hl = (i, j) => (t < 10 && ((i === 0 && j === 2) || (i === 4 && j === 2) || (i === 1 && j === 4))) ? NOW : (t > 10 && t < 20 && (i === 2 || i === 3) && j === 3) ? NOW : (t > 20 && i === 3 && (j === 2 || j === 3 || j === 4)) ? BAD : null;
    libro(70, 460, hl);
    const rows = [['50 % de T3, novela', '150 ÷ 300 = 50 %', true, 1], ['poesía, 12.5 %', '150 ÷ 1 200 = 12.5 %', true, 2.4], ['T4: ensayo > infantil', '60 > 50', true, 10.4], ['40 % infantil en T3 y T4', '100 ÷ 300 ≈ 33.3 %', false, 20.4]];
    rows.forEach(([a, b, ok, t0], i) => fade(A(t, t0, .4), () => { const y = 1000 + i * 90; mono(a, 120, y, C.mute, { s: 24, a: 'l' }); mono(b, 640, y, ok ? RES : BAD, { s: 26, a: 'l' }); check(980, y - 8, 14, ok, A(t, t0 + .3, .5)); }));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['40 % infantil', '50 % novela', 'poesía 12.5 %', 'ensayo > infantil'], 0, [['infantil en T3 y T4: 100 ÷ 300 ≈ ', 'r'], ['33.3 %', 'r', BAD]], { s: 38 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['fila × columna', 'r']], 'leer la tabla'], [[['de qué total', 'r']], 'cada porcentaje'], [[['reglas = ecuaciones', 'r']], 'llenar huecos'], [[['un caso en contra', 'r']], 'tumbar una afirmación']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [DAT, NOW, TOT]);
    });
  },
};
