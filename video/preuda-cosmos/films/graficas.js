// «Leer gráficas» · escenas de la lección pu-gr-1. Motor en kit.js, preu.js y piezas.js; guion en graficas.data.js.
// Las barras en cian, las subidas en ámbar, los sectores con sus colores, lo que se mira ahora en lima y el resultado en verde.
const BAR = C.cyan, UP = C.amber, NOW = C.lime, RES = C.green, BAD = C.mag;
const RAIN = [40, 50, 90, 120, 80, 40], MON = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const COF = [30, 45, 36, 45, 60], YRS = ['2019', '2020', '2021', '2022', '2023'];
const S = {
  // 1 · El reto: la lluvia del semestre.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La gráfica muestra la lluvia, en milímetros, que cayó en un', 'municipio de enero a junio: 40, 50, 90, 120, 80 y 40 mm.', 'El mes con el mayor aumento porcentual de lluvia con', 'respecto al mes anterior fue:'], opts: ['Marzo', 'Febrero', 'Abril', 'Mayo'], ok: 0 });
    fade(A(t, 9.6, .6), () => barsC(170, 1420, 820, 460, MON, RAIN, 130, BAR, { k: seg(t, 10, 13), ticks: [20, 40, 60, 80, 100, 120], vals: t > 13 }));
  },
  // 2 · Leer los ejes.
  ejes(t) {
    stars(t, .3);
    const G = barsC(170, 1150, 820, 560, MON, RAIN, 130, BAR, { ticks: [20, 40, 60, 80, 100, 120], hl: i => t > 18 && i === 2 });
    fade(A(t, 1, .5), () => { mono('meses', 580, 1230, NOW, { s: 24 }); mono('mm', 120, 560, NOW, { s: 24 }); });
    fade(A(t, 9.2, .5), () => { for (let v = 20; v <= 120; v += 20) stroke(hexA(NOW, .5), 1.5, () => { X.moveTo(170, G.y(v)); X.lineTo(990, G.y(v)); }, { g: 0 }); mono('cada raya: 20 mm', 800, 560, NOW, { s: 22 }); });
    fade(A(t, 18.4, .5), () => { stroke(NOW, 2.5, () => { X.moveTo(G.x(2), G.y(90)); X.lineTo(170, G.y(90)); }, { dash: [8, 6], g: 8 }); mono('90', 140, G.y(90) + 8, NOW, { s: 24, a: 'r' }); });
  },
  // 3 · Cuánto sube: absoluto y porcentual.
  absoluto(t) {
    stars(t, .3);
    const G = barsC(170, 1000, 820, 420, MON.slice(0, 4), RAIN.slice(0, 4), 130, BAR, { vals: true });
    [[1, '+10'], [2, '+40'], [3, '+30']].forEach(([i, s], n) => fade(A(t, 1 + n * .6, .4), () => { const y1 = G.y(RAIN[i - 1]), y2 = G.y(RAIN[i]); X.save(); X.fillStyle = hexA(UP, .4); X.fillRect(G.x(i) - 52, y2, 104, y1 - y2); X.restore(); mono(s, G.x(i) + 80, (y1 + y2) / 2 + 8, UP, { s: 24 }); }));
    fade(A(t, 9.2, .5), () => F([['% = ', 'r'], ['subida', 'i', UP], [' ÷ ', 'r'], ['valor de antes', 'i', BAR]], CX, 1120, 46));
    fade(A(t, 18.2, .5), () => { F([['abril: 30 ÷ 90', 'r']], 320, 1230, 40); F([['marzo: 40 ÷ 50', 'r', NOW]], 760, 1230, 40); });
  },
  // 4 · Problema: la cooperativa de café.
  cafe(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Una cooperativa produjo 30, 45, 36, 45 y 60 toneladas de café', 'en los años 2019 a 2023. El año en el que la producción tuvo', 'el mayor aumento porcentual con respecto al año anterior fue:'], opts: ['2020', '2022', '2023', '2021'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      barsC(170, 1300, 820, 400, YRS, COF, 70, C.amber, { vals: true, hl: i => t > 20.4 && i === 1 });
      [[1, '+50 %', 10.6], [3, '+25 %', 12], [4, '+33 %', 20.2]].forEach(([i, s, t0]) => fade(A(t, t0, .4), () => mono(s, 170 + (i + .5) * 164, 840, i === 1 ? RES : UP, { s: 24 })));
      fade(A(t, 12.6, .4), () => mono('2021 baja', 170 + 2.5 * 164, 840, BAD, { s: 20 }));
    });
  },
  // 5 · El diagrama circular.
  circular(t) {
    stars(t, .3);
    pieC([CX, 800], 260, [[90, NOW, '90°'], [270, BAR, '']], seg(t, 1, 3));
    fade(A(t, 1, .5), () => mono('360° = el total', CX, 1110, C.ink, { s: 28 }));
    fade(A(t, 9.2, .5), () => F([['90 / 360 = ', 'r'], ['1/4', 'r', NOW]], CX, 1200, 52));
    fade(A(t, 18.2, .5), () => F([['cantidad = ', 'r'], ['ángulo / 360', 'i', NOW], [' · total', 'r']], CX, 1300, 46));
  },
  // 6 · Problema: el deporte favorito.
  deporte(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['A 180 estudiantes se les preguntó su deporte favorito. En el', 'diagrama circular, fútbol ocupa 150°, baloncesto 90°,', 'natación 72° y otros 48°. Prefieren el baloncesto:'], opts: ['45', '90', '60', '36'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      pieC([CX, 1060], 240, [[150, BAR, 'fútbol'], [90, NOW, 'baloncesto'], [72, UP, 'natación'], [48, C.violet, 'otros']], seg(t, 10, 12), { hl: 1, s: 24 });
      fade(A(t, 20.4, .5), () => F([['90/360 · 180 = 180/4 = ', 'r'], ['45', 'r', RES]], CX, 1380, 46));
    });
  },
  // 7 · Gráficas de líneas.
  lineas(t) {
    stars(t, .3);
    const pts = [[0, 10], [1, 30], [2, 30], [3, 70], [4, 60]], X0 = 180, Y0 = 1100, sx = 190, sy = 6;
    axes(X0, Y0, 820, 520, 'hora', 'km', 1);
    curve(u => { const x = u * 4, i = Math.min(3, Math.floor(x)), f = x - i; return [X0 + x * sx, Y0 - lerp(pts[i][1], pts[i + 1][1], f) * sy]; }, 0, 1, BAR, seg(t, 1, 5));
    fade(A(t, 9.2, .5), () => { segL([X0 + 2 * sx, Y0 - 30 * sy], [X0 + 3 * sx, Y0 - 70 * sy], NOW, 1, 6); mono('más empinada: más rápido', X0 + 2.5 * sx, Y0 - 80 * sy, NOW, { s: 22 }); segL([X0 + sx, Y0 - 30 * sy], [X0 + 2 * sx, Y0 - 30 * sy], UP, 1, 6); mono('plana: quieto', X0 + 1.5 * sx, Y0 - 36 * sy, UP, { s: 22 }); });
    fade(A(t, 18.2, .5), () => mono('tramos del mismo ancho: compara la inclinación', CX, 1200, C.ink, { s: 24 }));
  },
  // 8 · Tres cuidados.
  cuidado(t) {
    stars(t, .3);
    fade(win(t, .6, 9.4), () => { const G = barsC(300, 1000, 480, 380, ['A', 'B'], [6, 10], 10, [BAR, BAD]); bigT('96', G.x(0), G.y(6) - 16, C.ink, 32); bigT('100', G.x(1), G.y(10) - 16, C.ink, 32); mono('90', 285, 1008, BAD, { s: 22, a: 'r' }); mono('el eje empieza en 90: parece casi el doble', CX, 1100, BAD, { s: 24 }); });
    fade(win(t, 9.4, 18), () => { F([['absoluto: ', 'r'], ['resta', 'i', UP]], CX, 700, 50); F([['porcentual: ', 'r'], ['resta ÷ antes', 'i', NOW]], CX, 800, 50); });
    fade(A(t, 18.2, .5), () => { ['del total', 'del grupo', 'del valor anterior'].forEach((s, i) => pill(CX, 640 + i * 130, 460, 90, [BAR, UP, NOW][i], s, { s: 34 })); mono('porcentaje de qué', CX, 540, C.ink, { s: 28 }); });
  },
  // 9 · La lluvia resuelta.
  resolver(t) {
    stars(t, .3);
    const G = barsC(170, 900, 820, 380, MON, RAIN, 130, BAR, { vals: true, hl: i => t > 20 && i === 2 });
    const rows = [['Feb', '10 / 40 = 25 %', 1], ['Mar', '40 / 50 = 80 %', 2.4], ['Abr', '30 / 90 ≈ 33 %', 10.4], ['May', 'baja', 12], ['Jun', 'baja', 12.8]];
    rows.forEach(([m, s, t0], i) => fade(A(t, t0, .4), () => { mono(m, 260, 1000 + i * 60, C.mute, { s: 24, a: 'l' }); mono(s, 400, 1000 + i * 60, i === 1 && t > 20 ? RES : s === 'baja' ? BAD : UP, { s: 26, a: 'l' }); }));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['Marzo', 'Febrero', 'Abril', 'Mayo'], 0, [['marzo: 40 ÷ 50 = ', 'r'], ['80 %', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['ejes y escala', 'r']], 'primero'], [[['subida ÷ antes', 'r']], 'aumento porcentual'], [[['ángulo / 360', 'r']], 'diagrama circular'], [[['inclinación', 'r']], 'gráfica de líneas']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [BAR, NOW, UP]);
    });
  },
};
