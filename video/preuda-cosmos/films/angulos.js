// «Ángulos y paralelas» · escenas de la lección pu-ge-1. Motor en kit.js, preu.js y piezas.js; guion en angulos.data.js.
// Lo dado en ámbar, lo que se deduce en cian, un tercer ángulo en violeta, el resultado en verde y lo que se hace ahora en lima.
const GIV = C.amber, DED = C.cyan, THR = C.violet, RES = C.green, NOW = C.lime;
const deg = v => v + '°';
// La cadena del reto: A en (ax, ay), lados iguales de largo s; rayo de abajo (A, C, E) y rayo de 17° (B, D).
function chain(ax, ay, s) {
  const c17 = Math.cos(17 * DEG), A0 = [ax, ay];
  const B = at(A0, 17, s), Cc = at(A0, 0, 2 * s * c17), Dd = at(A0, 17, s + 2 * s * Math.cos(34 * DEG)), E = at(A0, 0, 2 * s * c17 + 2 * s * Math.cos(51 * DEG));
  return { A: A0, B, C: Cc, D: Dd, E };
}
function drawChain(P, k, o = {}) {
  const dim = 'rgba(160,180,240,.45)';
  segL(P.A, at(P.A, 0, dist(P.A, P.E) + 60), dim, k, 2, { g: 0 }); segL(P.A, at(P.A, 17, dist(P.A, P.D) + 90), dim, k, 2, { g: 0 });
  [[P.A, P.B], [P.B, P.C], [P.C, P.D], [P.D, P.E]].forEach(([p, q], i) => { segL(p, q, DED, clamp(k * 4 - i)); ticks(p, q, 1, DED, clamp(k * 4 - i - .5)); });
  if (k >= 1) { ptL(P.A, C.ink, 'A', -24, 10); ptL(P.B, C.ink, 'B', -6, -26); ptL(P.C, C.ink, 'C', 0, 52); ptL(P.D, C.ink, 'D', -6, -26); ptL(P.E, C.ink, 'E', 10, 52); }
}
const S = {
  // 1 · El reto: la cadena de isósceles.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Se construyen tres triángulos isósceles, ABC, BCD', 'y CDE, con AB = BC = CD = DE. Si el ángulo', 'BAC mide 17°, el ángulo DEC mide:'], opts: ['34°', '78°', '85°', '51°'], ok: 3 });
    fade(A(t, 9.6, .6), () => {
      const P = chain(130, 1290, 250); drawChain(P, eo(seg(t, 10, 13)));
      fade(A(t, 13.4, .5), () => { arcA(P.A, 70, 0, 17, GIV, eo(seg(t, 13.4, 14.4)), { lab: '17°', lr: 120, s: 30 }); });
      fade(A(t, 15.5, .5), () => { arcV(P.E, P.D, P.A, 60, NOW, eo(seg(t, 15.5, 16.5)), { lab: '?', lr: 100, s: 40 }); });
    });
    fade(A(t, 20.4, .6), () => { mono('lados iguales: la misma rayita', CX, 1430, C.mute, { s: 24 }); });
  },
  // 2 · El ángulo es un giro; suplementarios; opuestos por el vértice.
  vuelta(t) {
    stars(t, .3);
    const P = [CX, 760];
    fade(win(t, .8, 9.6), () => {
      const a = 360 * eio(seg(t, 1.4, 5.4));
      arcA(P, 120, 0, Math.max(.01, a), NOW, 1, { fill: .12 });
      segL(P, at(P, 0, 300), 'rgba(225,232,255,.8)', 1, 3, { g: 4 }); segL(P, at(P, a, 300), GIV, 1, 4);
      dot(...P, 8, C.ink);
      [[90, '90°'], [180, '180°'], [270, '270°'], [340, '360°']].forEach(([d, s], i) => fade(A(t, 5.8 + i * .5, .4), () => { const q = at(P, d, i === 3 ? 240 : 200); bigT(s, q[0], q[1] + 14, i === 3 ? RES : DED, 40); }));
      fade(A(t, 6, .5), () => bigT(Math.round(a) + '°', CX, 1180, GIV, 64));
    });
    fade(win(t, 10, 19.6), () => {
      const Q = [CX, 900];
      segL([140, 900], [940, 900], 'rgba(225,232,255,.85)', eo(seg(t, 10.2, 11)), 3, { g: 4 }); segL(Q, at(Q, 40, 330), GIV, eo(seg(t, 11, 12)), 4);
      arcA(Q, 90, 0, 40, GIV, eo(seg(t, 12, 13)), { lab: '40°', lr: 150, fill: .15 });
      arcA(Q, 70, 40, 180, DED, eo(seg(t, 13.6, 15)), { lab: '140°', lr: 130, fill: .12 });
      fade(A(t, 15.4, .5), () => F([['40°', 'r', GIV], [' + ', 'r'], ['140°', 'r', DED], [' = ', 'r'], ['180°', 'r', RES]], CX, 1200, 62));
    });
    fade(A(t, 20, .6), () => {
      const h = 22 + 14 * eio(seg(t, 21, 25)) - 8 * eio(seg(t, 25.5, 28)), Q = [CX, 820], L = 330;
      segL(at(Q, h + 180, L), at(Q, h, L), 'rgba(225,232,255,.9)', 1, 4); segL(at(Q, 180 - h, L), at(Q, -h, L), 'rgba(225,232,255,.9)', 1, 4);
      dot(...Q, 9, NOW);
      arcA(Q, 80, -h, h, DED, 1, { lab: deg(Math.round(2 * h)), lr: 140, fill: .16 }); arcA(Q, 80, 180 - h, 180 + h, DED, 1, { lab: deg(Math.round(2 * h)), lr: 140, fill: .16 });
      arcA(Q, 60, h, 180 - h, GIV, 1, { lab: deg(180 - Math.round(2 * h)), lr: 110, fill: .12 }); arcA(Q, 60, 180 + h, 360 - h, GIV, 1, { lab: deg(180 - Math.round(2 * h)), lr: 110, fill: .12 });
      fade(A(t, 22, .5), () => mono('opuestos: iguales · vecinos: suman 180°', CX, 1250, NOW, { s: 26 }));
    });
  },
  // 3 · Paralelas cortadas por una transversal.
  paralelas(t) {
    stars(t, .3);
    const y1 = 620, y2 = 920, P1 = [610, y1], P2 = [610 - (y2 - y1) / Math.tan(55 * DEG), y2];
    const k0 = eo(seg(t, 1, 3)), wh = 'rgba(225,232,255,.85)';
    segL([120, y1], [960, y1], wh, k0, 3, { g: 4 }); segL([120, y2], [960, y2], wh, k0, 3, { g: 4 });
    fade(A(t, 2.6, .4), () => [y1, y2].forEach(y => stroke(wh, 3, () => { X.moveTo(880, y - 12); X.lineTo(898, y); X.lineTo(880, y + 12); }, { g: 4 })));
    segL(at(P2, 235, 170), at(P1, 55, 190), NOW, eo(seg(t, 3.4, 5.4)), 4);
    fade(A(t, 5.6, .5), () => { dot(...P1, 7, C.ink); dot(...P2, 7, C.ink); mono('misma inclinación en los dos cruces', CX, 1080, C.mute); });
    fade(win(t, 10, 19.6, .4), () => {
      arcA(P1, 70, 0, 55, GIV, eo(seg(t, 10.4, 11.4)), { lab: '55°', lr: 115, fill: .16 }); arcA(P2, 70, 0, 55, GIV, eo(seg(t, 10.8, 11.8)), { lab: '55°', lr: 115, fill: .16 });
      fade(A(t, 12, .4), () => mono('F · correspondientes', 820, 760, GIV, { s: 26 }));
      fade(A(t, 14.4, .5), () => { arcA(P1, 70, 180, 235, DED, eo(seg(t, 14.4, 15.4)), { lab: '55°', lr: 115, fill: .16 }); mono('Z · alternos internos', 260, 780, DED, { s: 26 }); });
    });
    fade(A(t, 20, .5), () => {
      arcA(P2, 70, 0, 55, GIV, 1, { lab: '55°', lr: 115, fill: .16 }); arcA(P1, 60, 235, 360, THR, eo(seg(t, 20.4, 21.8)), { lab: '125°', lr: 115, fill: .14 });
      fade(A(t, 22, .5), () => F([['55°', 'r', GIV], [' + ', 'r'], ['125°', 'r', THR], [' = ', 'r'], ['180°', 'r', RES]], CX, 1180, 60));
      fade(A(t, 23.2, .5), () => mono('entre las paralelas y del mismo lado', CX, 1250, C.mute));
    });
  },
  // 4 · Las tres esquinas forman media vuelta.
  triangulo(t) {
    stars(t, .3);
    const A0 = [240, 860], B0 = [840, 860], C0 = at(A0, 50, 600 * Math.sin(60 * DEG) / Math.sin(70 * DEG)), Q = [CX, 1230];
    polyL([A0, B0, C0], 'rgba(225,232,255,.9)', { k: eo(seg(t, .8, 2.4)), fill: .06 });
    const corners = [[A0, 0, 50, GIV, 0], [C0, 230, 300, THR, 50], [B0, 120, 180, DED, 120]];
    corners.forEach(([p, d0, d1, col, e0], i) => {
      const m = eio(seg(t, 4.5 + i * 1.2, 6.5 + i * 1.2)), pos = mid(p, Q, m), s0 = i === 1 ? lerp(230, 410, m) : d0;
      if (t > 2.4) fade(A(t, 2.6 + i * .4, .4), () => { wedge(p, 70, d0, d1, col, .2 * (1 - m)); if (m > 0) wedge(pos, 90, s0, s0 + (d1 - d0), col); });
    });
    fade(A(t, 3, .5), () => { const g = [[A0, 50, 25], [B0, 60, 150], [C0, 70, 265]]; g.forEach(([p, v, d]) => { const q = at(p, d, 110); bigT(deg(v), q[0], q[1] + 12, C.ink, 34); }); });
    fade(A(t, 10.4, .5), () => {
      segL([Q[0] - 220, Q[1]], [Q[0] + 220, Q[1]], RES, eo(seg(t, 10.4, 11.4)), 4);
      arcA(Q, 130, 0, 180, RES, eo(seg(t, 11.4, 13)), { lab: '180°', lr: 170, s: 42 });
    });
    fade(A(t, 20.2, .6), () => F([['50°', 'r', GIV], [' + ', 'r'], ['60°', 'r', DED], [' + ', 'r'], ['70°', 'r', THR], [' = ', 'r'], ['180°', 'r', RES]], CX, 1430, 52));
  },
  // 5 · El ángulo exterior y el isósceles.
  exterior(t) {
    stars(t, .3);
    fade(win(t, .6, 17.6), () => {
      const A0 = [200, 900], B0 = [760, 900], C0 = at(A0, 50, 560 * Math.sin(60 * DEG) / Math.sin(70 * DEG));
      polyL([A0, B0, C0], 'rgba(225,232,255,.9)', { fill: .06 });
      segL(C0, at(C0, 50, 230), NOW, eo(seg(t, 1, 2.4)), 3, { dash: [10, 8] });
      arcA(A0, 70, 0, 50, GIV, 1, { lab: '50°', lr: 110, fill: .16 }); arcA(B0, 70, 120, 180, DED, 1, { lab: '60°', lr: 110, fill: .16 });
      arcA(C0, 60, 230, 300, THR, 1, { lab: '70°', lr: 100, fill: .12 });
      fade(A(t, 3, .5), () => arcA(C0, 80, -60, 50, NOW, eo(seg(t, 3, 4.4)), { lab: '?', lr: 130, fill: .14, s: 40 }));
      fade(A(t, 9.4, .5), () => {
        F([['70°', 'r', THR], [' + exterior = 180°', 'r']], CX, 1160, 46);
        fade(A(t, 11.4, .5), () => F([['50°', 'r', GIV], [' + ', 'r'], ['60°', 'r', DED], [' + ', 'r'], ['70°', 'r', THR], [' = 180°', 'r']], CX, 1240, 46));
        fade(A(t, 13.4, .5), () => F([['exterior = ', 'r'], ['50°', 'r', GIV], [' + ', 'r'], ['60°', 'r', DED], [' = ', 'r'], ['110°', 'r', RES]], CX, 1330, 50));
      });
    });
    fade(A(t, 18, .5), () => {
      const L = [190, 1000], R = [890, 1000], Ap = [CX, 1000 - 350 * Math.tan(17 * DEG)];
      polyL([L, R, Ap], 'rgba(225,232,255,.9)', { fill: .06 }); ticks(L, Ap, 1, DED); ticks(Ap, R, 1, DED);
      arcA(L, 110, 0, 17, GIV, 1, { lab: '17°', lr: 160, s: 30 }); arcA(R, 110, 163, 180, GIV, 1, { lab: '17°', lr: 160, s: 30 });
      segL(Ap, at(Ap, 17, 260), NOW, eo(seg(t, 18.8, 19.8)), 3, { dash: [10, 8] });
      fade(A(t, 20, .5), () => arcA(Ap, 90, -17, 17, RES, eo(seg(t, 20, 21)), { lab: '34°', lr: 140, fill: .16 }));
      fade(A(t, 21.5, .5), () => F([['17°', 'r', GIV], [' + ', 'r'], ['17°', 'r', GIV], [' = ', 'r'], ['34°', 'r', RES]], CX, 1230, 56));
    });
  },
  // 6 · Polígonos: (n − 2) · 180° y la vuelta de los exteriores.
  poligono(t) {
    stars(t, .3);
    const O = [CX, 720], R = 250, V = Array.from({ length: 5 }, (_, i) => at(O, 90 + 72 * i, R)), cols = [GIV, DED, THR];
    polyL(V, 'rgba(225,232,255,.9)', { k: eo(seg(t, .8, 2.4)) });
    fade(win(t, 2.4, 19.6), () => {
      [[0, 1, 2], [0, 2, 3], [0, 3, 4]].forEach((tr, i) => fade(A(t, 3 + i * 1.2, .5), () => polyL(tr.map(j => V[j]), cols[i], { fill: .22, lw: 2 })));
      fade(A(t, 6.6, .5), () => mono('3 triángulos', CX, 1060, C.ink, { s: 30 }));
      fade(A(t, 10.4, .5), () => {
        F([['(', 'r'], ['n', 'i', NOW], [' − 2) · 180°', 'r']], CX, 1140, 60);
        fade(A(t, 12.4, .5), () => F([['pentágono: 3 · 180° = ', 'r'], ['540°', 'r', RES]], CX, 1240, 42));
        fade(A(t, 14.4, .5), () => F([['hexágono: 4 · 180° = ', 'r'], ['720°', 'r', RES]], CX, 1320, 42));
      });
    });
    fade(A(t, 20, .5), () => {
      polyL(V, 'rgba(225,232,255,.9)', {});
      V.forEach((p, i) => { const q = V[(i + 1) % 5], dir = angOf(V[(i + 4) % 5], p), kk = eo(seg(t, 20.6 + i * .9, 21.4 + i * .9)); segL(p, at(p, dir, 110), hexA(NOW, .6), kk, 2, { dash: [8, 6] }); arcA(p, 60, dir, dir + 72, NOW, kk, { fill: .2 }); });
      const tot = 72 * Math.round(5 * clamp(seg(t, 20.6, 25.4) * 1.0001));
      ring(CX, 1230, 70, RES, 4, clamp(seg(t, 20.6, 25.4)));
      bigT(deg(tot), CX, 1250, RES, 44);
      fade(A(t, 25.6, .5), () => mono('5 · 72° = 360°', CX, 1360, C.ink, { s: 28 }));
    });
  },
  // 7 · Problema: polígono regular con ángulos de 150°.
  examen(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En un polígono regular, cada ángulo interior mide', '150°. La cantidad de lados del polígono es:'], opts: ['12', '10', '15', '8'], ok: 0, rv: 22.5 });
    fade(win(t, 9.8, 19.8), () => {
      const P = [CX, 1150], a = at(P, 180, 300), b = at(P, 30, 300);
      segL(a, P, 'rgba(225,232,255,.9)', 1, 4); segL(P, b, 'rgba(225,232,255,.9)', eo(seg(t, 10, 11)), 4);
      segL(P, at(P, 0, 260), NOW, eo(seg(t, 11.4, 12.4)), 3, { dash: [10, 8] });
      arcA(P, 70, 30, 180, GIV, eo(seg(t, 11, 12)), { lab: '150°', lr: 120, fill: .14 });
      arcA(P, 110, 0, 30, NOW, eo(seg(t, 12.6, 13.4)), { lab: '30°', lr: 160, fill: .2 });
      fade(A(t, 14, .5), () => F([['180° − 150° = ', 'r'], ['30°', 'r', NOW]], CX, 1360, 50));
    });
    fade(A(t, 20.2, .5), () => {
      const O = [CX, 1080], R = 210, V = Array.from({ length: 12 }, (_, i) => at(O, 90 + 30 * i, R)), kk = seg(t, 20.4, 24.4);
      polyL(V, DED, { k: kk, fill: .08 });
      V.forEach((p, i) => fade(A(t, 20.4 + i * .33, .3), () => dot(p[0], p[1], 6, NOW, 12)));
      bigT(String(Math.min(12, Math.floor(kk * 12 + 1e-9))), CX, 1100, NOW, 64);
      fade(A(t, 24.6, .5), () => F([['360° ÷ 30° = ', 'r'], ['12', 'r', RES]], CX, 1400, 52));
    });
  },
  // 8 · Problema: el reloj a las 3:30.
  reloj(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['El menor ángulo que forman las manecillas de un', 'reloj cuando marca las 3:30 mide:'], opts: ['75°', '90°', '60°', '105°'], ok: 0, rv: 23 });
    const O = [CX, 1090], R = 240;
    fade(A(t, 3, .6), () => {
      ring(O[0], O[1], R, 'rgba(225,232,255,.85)', 3);
      for (let h = 1; h <= 12; h++) { const p = at(O, 90 - 30 * h, R - 40); T(String(h), p[0], p[1] + 12, { k: 'r', s: 32, a: 'c', c: '#b9c3e6' }); const q = at(O, 90 - 30 * h, R); segL(at(O, 90 - 30 * h, R - 14), q, 'rgba(225,232,255,.7)', 1, 2, { g: 0 }); }
      const mins = 30 * eio(seg(t, 13.5, 17.5)) + (t < 13.5 ? 30 * (1 - eio(seg(t, 10, 12))) : 0);
      const hourA = 90 - (90 + mins * .5), minA = 90 - mins * 6;
      fade(A(t, 10, .5), () => { arcA(O, R - 70, 60, 90, DED, eo(seg(t, 10.4, 11.4)), { fill: .2, lab: '30°', lr: R - 110, s: 26 }); });
      segL(O, at(O, hourA, 130), GIV, 1, 7); segL(O, at(O, minA, 190), C.ink, 1, 4);
      dot(...O, 9, NOW);
      fade(A(t, 17.6, .5), () => mono('horario: 90° + 15° = 105°', CX, 1400, GIV, { s: 24 }));
      fade(A(t, 20.4, .5), () => arcA(O, 90, -90, -15, NOW, eo(seg(t, 20.4, 21.6)), { lab: '75°', lr: 140, fill: .22, s: 40 }));
      fade(A(t, 22, .5), () => mono('minutero 180° · 180° − 105° = 75°', CX, 1440, NOW, { s: 24 }));
    });
  },
  // 9 · La cadena resuelta paso a paso.
  resolver(t) {
    stars(t, .3);
    const P = chain(110, 1230, 270); drawChain(P, 1);
    arcA(P.A, 70, 0, 17, GIV, 1, { lab: '17°', lr: 115, s: 28 });
    const step = (t0, fn) => fade(A(t, t0, .5), fn);
    step(1.2, () => arcV(P.C, P.B, P.A, 64, GIV, eo(seg(t, 1.2, 2)), { lab: '17°', lr: 100, s: 28 }));
    step(3.4, () => arcV(P.B, P.C, P.D, 70, DED, eo(seg(t, 3.4, 4.4)), { lab: '34°', lr: 105, s: 28 }));
    step(10.2, () => arcV(P.D, P.B, P.C, 60, DED, eo(seg(t, 10.2, 11)), { lab: '34°', lr: 95, s: 28 }));
    step(12.6, () => arcV(P.C, P.D, P.E, 60, THR, eo(seg(t, 12.6, 13.6)), { lab: '51°', lr: 95, s: 28 }));
    step(20.4, () => arcV(P.E, P.D, P.C, 70, RES, eo(seg(t, 20.4, 21.4)), { lab: '51°', lr: 110, s: 34 }));
    const rows = [[1.2, [['ABC: en C también 17°', 'r', GIV]]], [3.6, [['exterior en B: 17° + 17° = ', 'r'], ['34°', 'r', DED]]], [10.4, [['BCD: en D también 34°', 'r', DED]]], [12.8, [['exterior en C: 17° + 34° = ', 'r'], ['51°', 'r', THR]]], [20.6, [['CDE: en E también ', 'r'], ['51°', 'r', RES]]]];
    rows.forEach(([t0, p], i) => fade(A(t, t0, .5), () => F(p, CX, 420 + i * 86, 42, { max: 920 })));
  },
  // 10 · Cierre: la opción D, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['34°', '78°', '85°', '51°'], 3, [['17° → 34° → 51°: ', 'r'], ['51°', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['40° + 140° = 180°', 'r']], 'vecinos en una recta'], [[['A + B + C = 180°', 'r']], 'cualquier triángulo'], [[['exterior = A + B', 'r']], 'los dos lejanos'], [[['(n − 2) · 180°', 'r']], 'polígono de n lados']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [GIV, NOW, DED]);
    });
  },
};
