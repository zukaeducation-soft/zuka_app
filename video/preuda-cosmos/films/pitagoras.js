// «Triángulos y Pitágoras» · escenas de la lección pu-ge-2. Motor en kit.js, preu.js y piezas.js; guion en pitagoras.data.js.
// Cateto corto en ámbar, cateto largo en cian, hipotenusa en violeta, el resultado en verde y lo que se hace ahora en lima.
const LA = C.amber, LB = C.cyan, HY = C.violet, RES = C.green, NOW = C.lime, BAD = C.mag;
const sq2 = s => [String(s), 'sp'];
const WH = 'rgba(225,232,255,.9)';
// Pared, piso y escalera: la base a b metros de la pared (escala u px por metro); devuelve pie y punta.
function ladder(wx, fy, u, b, L, col, o = {}) {
  const foot = [wx - b * u, fy], top = [wx, fy - Math.sqrt(Math.max(0, L * L - b * b)) * u];
  if (!o.noWall) { stroke(WH, 3, () => { X.moveTo(wx, fy - 15.5 * u); X.lineTo(wx, fy); X.lineTo(wx - 15 * u, fy); }, { g: 4 }); }
  segL(foot, top, col, 1, o.lw || 7, { dash: o.dash });
  if (!o.dash) for (let i = 1; i < 9; i++) { const p = mid(foot, top, i / 9), n = angOf(foot, top) + 90; segL(at(p, n, -14), at(p, n, 14), hexA(col, .7), 1, 2, { g: 0 }); }
  return { foot, top };
}
const S = {
  // 1 · El reto: la escalera que resbala.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Una escalera de 13 metros de largo está apoyada en una', 'pared vertical, con su base a 5 metros de la pared. Si la', 'base se aleja 7 metros más de la pared, el extremo', 'superior de la escalera desciende:'], opts: ['7 metros', '5 metros', '6 metros', '12 metros'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      const u = 36, wx = 900, fy = 1440, b = 5 + 7 * eio(seg(t, 12, 15));
      if (t > 12) ladder(wx, fy, u, 5, 13, C.dim, { dash: [10, 10], noWall: true });
      const L = ladder(wx, fy, u, b, 13, LB);
      fade(A(t, 10.4, .4), () => { mono('13 m', (L.foot[0] + L.top[0]) / 2 - 50, (L.foot[1] + L.top[1]) / 2, HY, { s: 26 }); mono(b.toFixed(0) + ' m', (L.foot[0] + wx) / 2, fy + 40, LA, { s: 24 }); });
      fade(A(t, 15.4, .5), () => { const y0 = fy - 12 * u, y1 = L.top[1]; arrow(wx + 40, y0, wx + 40, y1, BAD, 1, 3, { h: 12 }); mono('?', wx + 80, (y0 + y1) / 2 + 8, BAD, { s: 40 }); });
    });
  },
  // 2 · Cuadrados sobre los lados: 25 + 144 = 169.
  cuadrados(t) {
    stars(t, .3);
    const u = 21, R = [420, 960], Pa = [R[0], R[1] - 5 * u], Qb = [R[0] + 12 * u, R[1]];
    const n = [5 * u, -12 * u].map(v => v / 13); // normal hacia afuera de la hipotenusa (unidad × u)
    const sqA = [R, Pa, [Pa[0] - 5 * u, Pa[1]], [R[0] - 5 * u, R[1]]], sqB = [R, Qb, [Qb[0], Qb[1] + 12 * u], [R[0], R[1] + 12 * u]];
    const off = [n[0] * 13, n[1] * 13], sqC = [Pa, Qb, [Qb[0] + off[0], Qb[1] + off[1]], [Pa[0] + off[0], Pa[1] + off[1]]];
    polyL([R, Pa, Qb], WH, { k: eo(seg(t, .8, 2.2)), fill: .08 });
    fade(A(t, 2.2, .4), () => { rightA(R, 0, 18, NOW); mono('5', R[0] + 26, R[1] - 2.5 * u + 8, LA, { s: 26, a: 'l' }); mono('12', R[0] + 6 * u, R[1] - 16, LB, { s: 26 }); mono('13', R[0] + 6 * u - 20, R[1] - 3 * u - 26, HY, { s: 26 }); });
    fade(A(t, 3.4, .5), () => { polyL(sqA, LA, { fill: .2, k: eo(seg(t, 3.4, 4.6)) }); polyL(sqB, LB, { fill: .2, k: eo(seg(t, 4.2, 5.4)) }); polyL(sqC, HY, { fill: .2, k: eo(seg(t, 5, 6.2)) }); });
    const cen = q => [(q[0][0] + q[2][0]) / 2, (q[0][1] + q[2][1]) / 2];
    fade(A(t, 10.2, .5), () => { const a = cen(sqA), b = cen(sqB), c = cen(sqC); bigT('25', a[0], a[1] + 14, LA, 40); bigT('144', b[0], b[1] + 18, LB, 56); bigT('169', c[0], c[1] + 18, HY, 56); });
    fade(A(t, 12.6, .5), () => F([['25', 'r', LA], [' + ', 'r'], ['144', 'r', LB], [' = ', 'r'], ['169', 'r', HY]], CX, 1360, 60));
    fade(A(t, 20.2, .5), () => F([['c', 'i', HY], sq2(2), [' = ', 'r'], ['a', 'i', LA], sq2(2), [' + ', 'r'], ['b', 'i', LB], sq2(2)], CX, 1460, 70));
  },
  // 3 · La bisagra: agudo, recto, obtuso.
  tipos(t) {
    stars(t, .3);
    const u = 40, R = [280, 1080], th = t < 8.6 ? lerp(60, 120, eio(seg(t, 1, 8))) : t < 17.6 ? lerp(120, 90, eio(seg(t, 9, 11))) : lerp(90, 65, eio(seg(t, 18, 19.6))) + 50 * eio(seg(t, 21.4, 24.4));
    const P = at(R, th, 5 * u), Q = at(R, 0, 12 * u), c2 = 25 + 144 - 120 * Math.cos(th * DEG);
    segL(R, Q, LB, 1, 5); segL(R, P, LA, 1, 5); segL(P, Q, HY, 1, 4);
    dot(...R, 9, NOW, 14);
    if (Math.abs(th - 90) < .5) rightA(R, 0, 22, RES); else arcA(R, 50, 0, th, NOW, 1, { lab: Math.round(th) + '°', lr: 90, s: 28 });
    mono('5', ...mid(R, P).map((v, i) => v + (i ? 0 : -30)), LA, { s: 28 }); mono('12', mid(R, Q)[0], R[1] + 44, LB, { s: 28 });
    const col = Math.abs(c2 - 169) < 1 ? RES : c2 < 169 ? LB : BAD, word = Math.abs(c2 - 169) < 1 ? 'recto' : c2 < 169 ? 'agudo' : 'obtuso';
    F([['c', 'i', HY], sq2(2), [' = ' + Math.round(c2), 'r', col]], CX, 560, 72);
    bigT(word, CX, 660, col, 46);
    fade(A(t, 18.4, .5), () => { F([['c', 'i'], sq2(2), [' < 169: agudo', 'r', LB]], CX, 1260, 40); F([['c', 'i'], sq2(2), [' = 169: recto', 'r', RES]], CX, 1330, 40); F([['c', 'i'], sq2(2), [' > 169: obtuso', 'r', BAD]], CX, 1400, 40); });
  },
  // 4 · Ternas y sus múltiplos; la trampa de sumar catetos.
  ternas(t) {
    stars(t, .3);
    fade(win(t, .6, 17.6), () => {
      [['3 · 4 · 5', LA], ['5 · 12 · 13', LB], ['8 · 15 · 17', HY]].forEach(([s, c], i) => fade(A(t, 1 + i * .8, .5), () => pill(CX, 470 + i * 130, 460, 96, c, s, { s: 44 })));
      fade(A(t, 9.2, .5), () => {
        [['× 2', '6 · 8 · 10'], ['× 3', '9 · 12 · 15'], ['× 4', '12 · 16 · 20']].forEach(([m, s], i) => fade(A(t, 9.4 + i * .9, .5), () => { mono(m, 260, 900 + i * 110, NOW, { s: 30 }); pill(600, 890 + i * 110, 420, 84, LA, s, { s: 40, fill: .08 }); }));
      });
    });
    fade(A(t, 18, .5), () => {
      const a = [300, 1050], b = [780, 1050], c = [300, 850];
      segL(c, a, LA, 1, 5); segL(a, b, LB, 1, 5); segL(c, b, HY, eo(seg(t, 18.6, 19.6)), 5);
      mono('5', 260, 960, LA, { s: 30 }); mono('12', 540, 1100, LB, { s: 30 }); mono('13', 570, 920, HY, { s: 30 });
      fade(A(t, 20.4, .5), () => { F([['5 + 12 = 17', 'r', BAD], ['  ≠  ', 'r'], ['13', 'r', HY]], CX, 1260, 52); mono('la línea recta es más corta que la esquina', CX, 1330, C.mute); });
    });
  },
  // 5 · Problema: lados de 5 y 9; ¿cuántos enteros para el tercero?
  desigualdad(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Dos lados de un triángulo miden 5 cm y 9 cm. Si el', 'tercer lado mide un número entero de centímetros, la', 'cantidad de valores posibles para esa medida es:'], opts: ['9', '8', '10', '13'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const u = 44, Ap = [330, 1080], Bp = [330 + 9 * u, 1080], phi = t < 10.4 ? 60 : 180 - 180 * eio(seg(t, 10.4, 16.4)) + 120 * eio(seg(t, 17, 19)), P = at(Ap, Math.min(180, Math.max(0, phi)), 5 * u), c = dist(P, Bp) / u;
      segL(Ap, Bp, LB, 1, 5); segL(Ap, P, LA, 1, 5); segL(P, Bp, HY, 1, 4); dot(...Ap, 8, NOW);
      mono('9', (Ap[0] + Bp[0]) / 2, Ap[1] + 44, LB, { s: 28 }); bigT(c.toFixed(1), 900, 900, HY, 44); mono('tercer lado', 900, 940, C.mute, { s: 20 });
      const flat = c < 4.05 || c > 13.95; if (flat && t > 10.4 && t < 19) mono('se aplasta: no hay triángulo', CX, 1160, BAD, { s: 26 });
      fade(A(t, 20, .5), () => {
        const px = nline(110, 970, 1300, 0, 15, { s: 24, k: 1 });
        for (let v = 5; v <= 13; v++) fade(A(t, 20.4 + (v - 5) * .25, .3), () => dot(px(v), 1300, 11, RES, 16));
        [4, 14].forEach(v => { ring(px(v), 1300, 11, BAD, 3); });
        fade(A(t, 23, .5), () => F([['4 < ', 'r'], ['x', 'i', HY], [' < 14', 'r'], ['  →  9 valores', 'r', RES]], CX, 1430, 44));
      });
    });
  },
  // 6 · Problema: el rombo de diagonales 10 y 24.
  rombo(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Las diagonales de un rombo miden 10 cm y 24 cm.', 'El perímetro del rombo, en centímetros, es:'], opts: ['52', '68', '48', '34'], ok: 0, rv: 23 });
    const O = [CX, 1090], u = 24, L = [O[0] - 12 * u, O[1]], Rr = [O[0] + 12 * u, O[1]], Tp = [O[0], O[1] - 5 * u * 1.6], Bt = [O[0], O[1] + 5 * u * 1.6];
    // escala vertical 1.6 para que se vea mejor: el dibujo no está a escala exacta en el corto (se aclara con los números)
    fade(A(t, 3, .5), () => {
      polyL([L, Tp, Rr, Bt], WH, { fill: .06 });
      fade(A(t, 4.4, .5), () => { segL(L, Rr, LB, eo(seg(t, 4.4, 5.4)), 3, { dash: [10, 8] }); segL(Tp, Bt, LA, eo(seg(t, 5, 6)), 3, { dash: [10, 8] }); mono('24', O[0] + 150, O[1] - 14, LB, { s: 26 }); mono('10', O[0] + 30, Tp[1] + 50, LA, { s: 26, a: 'l' }); });
      fade(A(t, 10.4, .5), () => { polyL([O, Rr, Tp], HY, { fill: .22, lw: 3 }); rightA(O, 0, 18, NOW); mono('12', O[0] + 6 * u, O[1] + 40, LB, { s: 28 }); mono('5', O[0] - 26, O[1] - 50, LA, { s: 28 }); });
      fade(A(t, 20.2, .5), () => { mono('13', (Rr[0] + Tp[0]) / 2 + 34, (Rr[1] + Tp[1]) / 2 - 18, HY, { s: 32 }); [[L, Tp], [Tp, Rr], [Rr, Bt], [Bt, L]].forEach(([p, q], i) => fade(A(t, 20.8 + i * .4, .3), () => segL(p, q, RES, 1, 5))); });
      fade(A(t, 22.6, .5), () => F([['4 · 13 = ', 'r'], ['52', 'r', RES]], CX, 1400, 56));
    });
  },
  // 7 · El triángulo de 45°.
  cuarenta(t) {
    stars(t, .3);
    const x0 = 290, y0 = 480, s = 380, Q = [[x0, y0 + s], [x0 + s, y0 + s], [x0 + s, y0], [x0, y0]];
    polyL(Q, WH, { k: eo(seg(t, .8, 2.2)) });
    segL(Q[0], Q[2], HY, eo(seg(t, 2.4, 3.6)), 4);
    fade(A(t, 3.8, .5), () => { polyL([Q[0], Q[1], Q[2]], LB, { fill: .18, lw: 2 }); arcA(Q[0], 70, 0, 45, NOW, 1, { lab: '45°', lr: 110, s: 28 }); arcA(Q[2], 70, 225, 270, NOW, 1, { lab: '45°', lr: 110, s: 28 }); rightA(Q[1], 90, 22, RES); });
    fade(A(t, 9.2, .5), () => { bigT('x', x0 + s / 2, y0 + s + 56, LA, 44, { k: 'i' }); bigT('x', x0 + s + 40, y0 + s / 2 + 14, LA, 44, { k: 'i' }); F([['x', 'i', HY], ['√2', 'r', HY]], x0 + s / 2 - 50, y0 + s / 2 - 10, 44); });
    fade(A(t, 11, .5), () => F([['x', 'i'], sq2(2), [' + ', 'r'], ['x', 'i'], sq2(2), [' = 2', 'r'], ['x', 'i'], sq2(2), ['  →  ', 'r'], ['x', 'i', HY], ['√2', 'r', HY]], CX, 1100, 52));
    fade(A(t, 18.2, .5), () => { F([['lado 7  →  diagonal ', 'r'], ['7√2 ≈ 9.9', 'r', RES]], CX, 1240, 50); mono('√2 ≈ 1.41', CX, 1310, C.mute, { s: 26 }); });
  },
  // 8 · El triángulo de 30° y 60°.
  treinta(t) {
    stars(t, .3);
    const s = 440, B0 = [CX - s / 2, 940], C0 = [CX + s / 2, 940], A0 = [CX, 940 - s * Math.sqrt(3) / 2], M = [CX, 940];
    polyL([B0, C0, A0], WH, { k: eo(seg(t, .8, 2.2)) });
    fade(A(t, 2.2, .4), () => { [B0, C0].forEach((p, i) => arcA(p, 60, i ? 120 : 0, i ? 180 : 60, LB, 1, { lab: '60°', lr: 95, s: 26 })); });
    segL(A0, M, NOW, eo(seg(t, 3.4, 4.6)), 4, { dash: [10, 8] });
    fade(A(t, 4.8, .5), () => { polyL([A0, M, C0], HY, { fill: .2, lw: 3 }); rightA(M, 0, 20, RES); arcA(A0, 70, 270, 300, LA, 1, { lab: '30°', lr: 110, s: 26 }); });
    fade(A(t, 9.2, .5), () => { F([['2', 'r', HY], ['x', 'i', HY]], (A0[0] + C0[0]) / 2 + 60, (A0[1] + C0[1]) / 2, 42); F([['x', 'i', LA]], (M[0] + C0[0]) / 2, M[1] + 52, 42); F([['x', 'i', LB], ['√3', 'r', LB]], M[0] - 60, (A0[1] + M[1]) / 2, 42); });
    fade(A(t, 11.2, .5), () => F([['(2', 'r'], ['x', 'i'], [')', 'r'], sq2(2), [' − ', 'r'], ['x', 'i'], sq2(2), [' = 3', 'r'], ['x', 'i'], sq2(2), ['  →  ', 'r'], ['x', 'i', LB], ['√3', 'r', LB]], CX, 1120, 50));
    fade(A(t, 18.2, .5), () => { F([['lado 8  →  altura ', 'r'], ['4√3 ≈ 6.9', 'r', RES]], CX, 1250, 50); mono('√3 ≈ 1.73', CX, 1320, C.mute, { s: 26 }); });
  },
  // 9 · La escalera resuelta.
  resolver(t) {
    stars(t, .3);
    const u = 44, wx = 920, fy = 1360;
    fade(win(t, .6, 9.8), () => {
      const L = ladder(wx, fy, u, 5, 13, LB);
      mono('5', (L.foot[0] + wx) / 2, fy + 44, LA, { s: 28 }); mono('12', wx + 40, fy - 6 * u, HY, { s: 28, a: 'l' });
      F([['5', 'r', LA], sq2(2), [' + ', 'r'], ['12', 'r', HY], sq2(2), [' = 25 + 144 = 169 = ', 'r'], ['13', 'r', LB], sq2(2)], CX, 520, 46, { max: 940 });
    });
    fade(A(t, 10, .5), () => {
      ladder(wx, fy, u, 5, 13, C.dim, { dash: [10, 10], noWall: true });
      const L = ladder(wx, fy, u, 12, 13, LB);
      mono('12', (L.foot[0] + wx) / 2, fy + 44, LA, { s: 28 }); mono('5', wx + 40, fy - 2.5 * u, RES, { s: 28, a: 'l' });
      F([['13', 'r', LB], sq2(2), [' − ', 'r'], ['12', 'r', LA], sq2(2), [' = 169 − 144 = 25', 'r']], CX, 520, 46);
      fade(A(t, 12.6, .5), () => F([['altura = √25 = ', 'r'], ['5', 'r', RES]], CX, 610, 46));
      fade(A(t, 20.2, .5), () => { arrow(wx + 110, fy - 12 * u, wx + 110, fy - 5 * u, BAD, eo(seg(t, 20.2, 21.4)), 4, { h: 14 }); F([['12 − 5 = ', 'r'], ['7 m', 'r', RES]], CX, 720, 56); });
    });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['7 metros', '5 metros', '6 metros', '12 metros'], 0, [['de 12 m a 5 m: baja ', 'r'], ['7 m', 'r', RES]], { s: 44 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['c', 'i'], sq2(2), [' = ', 'r'], ['a', 'i'], sq2(2), [' + ', 'r'], ['b', 'i'], sq2(2)], 'con ángulo recto'], [[['3-4-5 · 5-12-13', 'r']], 'ternas y múltiplos'], [[['|a − b| < c < a + b', 'r']], 'para que cierre'], [[['x√2 · x√3', 'r']], '45° · 30° y 60°']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [LA, NOW, LB]);
    });
  },
};
