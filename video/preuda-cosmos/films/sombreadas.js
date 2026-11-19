// «Áreas sombreadas y cuadrícula» · escenas de la lección pu-ge-5. Motor en kit.js, preu.js y piezas.js; guion en
// sombreadas.data.js. Lo sombreado en cian, las piezas que se suman en ámbar, lo que se resta en rosa, las curvas en violeta,
// el resultado en verde y lo que se hace ahora en lima.
const SH = C.cyan, ADD = C.amber, SUB = C.mag, CUR = C.violet, RES = C.green, NOW = C.lime;
const WH = 'rgba(225,232,255,.9)';
// Cuadrícula de nx × ny cuadritos de u px con la esquina de abajo a la izquierda en (x0, y0); devuelve P(i, j).
function gridG(x0, y0, nx, ny, u, a = .28) {
  stroke(`rgba(160,180,240,${a})`, 1.2, () => { for (let i = 0; i <= nx; i++) { X.moveTo(x0 + i * u, y0); X.lineTo(x0 + i * u, y0 - ny * u); } for (let j = 0; j <= ny; j++) { X.moveTo(x0, y0 - j * u); X.lineTo(x0 + nx * u, y0 - j * u); } }, { g: 0 });
  return (i, j) => [x0 + i * u, y0 - j * u];
}
// El cuadrado del reto (esquina de arriba a la izquierda x0, y0, lado s) menos los cuatro cuartos de radio s/2.
function star(x0, y0, s, a = .45, col = SH) {
  const r = s / 2, cs = [[x0, y0, 0], [x0 + s, y0, Math.PI / 2], [x0 + s, y0 + s, Math.PI], [x0, y0 + s, Math.PI * 1.5]];
  X.save(); X.beginPath(); X.rect(x0, y0, s, s);
  for (const [x, y, a0] of cs) { X.moveTo(x, y); X.arc(x, y, r, a0, a0 + Math.PI / 2); X.closePath(); }
  X.fillStyle = hexA(col, a); X.shadowColor = col; X.shadowBlur = 10; X.fill('evenodd'); X.restore();
  stroke(WH, 3, () => X.rect(x0, y0, s, s), { g: 6 });
  for (const [x, y, a0] of cs) stroke(CUR, 3, () => X.arc(x, y, r, a0, a0 + Math.PI / 2));
}
const fillPoly = (pts, col, a) => polyL(pts, col, { fill: a, lw: 2.5 });
const S = {
  // 1 · El reto: cuatro cuartos de círculo en un cuadrado de lado 8.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En un cuadrado de 8 cm de lado se trazan cuatro', 'cuartos de círculo de 4 cm de radio, con centro en cada', 'uno de los vértices. El área de la región sombreada,', 'en cm², es:'], opts: [[['64 − 16π', 'r']], [['64 − 4π', 'r']], [['16π − 32', 'r']], [['64 − 8π', 'r']]], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      star(CX - 224, 880, 448, .45 * A(t, 11, .8));
      fade(A(t, 12, .5), () => { segL([CX - 224, 880], [CX - 224 + 224, 880], NOW, 1, 3); mono('r = 4', CX - 112, 860, NOW, { s: 24 }); mono('8', CX + 260, 1110, C.ink, { s: 28 }); });
    });
  },
  // 2 · Sumar piezas o restar lo que falta.
  piezas(t) {
    stars(t, .3);
    const u = 60, P = gridG(270, 1150, 9, 7, u, .2);
    const L = [P(0, 0), P(9, 0), P(9, 3), P(4, 3), P(4, 7), P(0, 7)];
    fade(win(t, .6, 9.4), () => { fillPoly([P(0, 0), P(9, 0), P(9, 3), P(0, 3)], SH, .3); fillPoly([P(0, 3), P(4, 3), P(4, 7), P(0, 7)], ADD, .3); fade(A(t, 2.4, .4), () => { bigT('27', ...P(4.5, 1.2), SH, 44); bigT('16', ...P(2, 4.7), ADD, 44); }); });
    fade(A(t, 9.2, .5), () => { polyL([P(0, 0), P(9, 0), P(9, 7), P(0, 7)], WH, { lw: 3, fill: .1, fc: SH }); polyL([P(4, 3), P(9, 3), P(9, 7), P(4, 7)], SUB, { lw: 3, dash: [10, 8], fill: .2 }); bigT('63', ...P(2, 1.4), SH, 44); bigT('− 20', ...P(6.5, 4.7), SUB, 44); });
    polyL(L, WH, { lw: 4 });
    fade(A(t, 3, .5), () => F([['9 · 3 + 4 · 4 = 27 + 16 = ', 'r'], ['43', 'r', RES]], CX, 560, 48));
    fade(A(t, 11, .5), () => F([['9 · 7 − 5 · 4 = 63 − 20 = ', 'r'], ['43', 'r', RES]], CX, 640, 48));
    fade(A(t, 18.4, .5), () => mono('dos caminos, el mismo resultado', CX, 1280, NOW, { s: 28 }));
  },
  // 3 · Un octágono: el cuadrado menos sus esquinas.
  resta(t) {
    stars(t, .3);
    const u = 80, P = gridG(300, 1160, 6, 6, u, .2);
    const oct = [P(2, 0), P(4, 0), P(6, 2), P(6, 4), P(4, 6), P(2, 6), P(0, 4), P(0, 2)];
    polyL([P(0, 0), P(6, 0), P(6, 6), P(0, 6)], WH, { lw: 3, k: eo(seg(t, .8, 2)) });
    fade(A(t, 2.6, .5), () => fillPoly(oct, SH, .3));
    const corners = [[P(0, 0), P(2, 0), P(0, 2)], [P(6, 0), P(6, 2), P(4, 0)], [P(6, 6), P(4, 6), P(6, 4)], [P(0, 6), P(0, 4), P(2, 6)]];
    corners.forEach((c, i) => fade(A(t, 9.4 + i * .5, .4), () => { const o = [[-1, 1], [1, 1], [1, -1], [-1, -1]][i], m = 30 * eo(seg(t, 11.4, 12.6)); fillPoly(c.map(p => [p[0] + o[0] * m, p[1] + o[1] * m]), SUB, .35); }));
    fade(A(t, 10, .4), () => { mono('2', ...P(1, -0.45), SUB, { s: 26 }); mono('2', ...P(-0.4, 1.1), SUB, { s: 26 }); });
    fade(A(t, 18.2, .5), () => F([['36 − 4 · 2 = ', 'r'], ['28', 'r', RES]], CX, 1340, 60));
  },
  // 4 · El rectángulo que encierra al triángulo torcido.
  caja(t) {
    stars(t, .3);
    const u = 80, P = gridG(300, 1160, 6, 5, u);
    const tri = [P(0, 0), P(6, 2), P(2, 5)];
    fillPoly(tri, SH, .32);
    fade(A(t, 10, .5), () => {
      polyL([P(0, 0), P(6, 0), P(6, 5), P(0, 5)], NOW, { lw: 3, k: eo(seg(t, 10, 11.6)) });
      [[[P(0, 0), P(6, 0), P(6, 2)], '6', P(4.3, .6)], [[P(6, 2), P(6, 5), P(2, 5)], '6', P(5, 4.1)], [[P(2, 5), P(0, 5), P(0, 0)], '5', P(.6, 3.7)]].forEach(([q, v, c], i) => fade(A(t, 12 + i * 1.2, .4), () => { fillPoly(q, SUB, .25); bigT(v, c[0], c[1] + 12, SUB, 36); }));
    });
    fade(A(t, 20.2, .5), () => F([['30 − 6 − 6 − 5 = ', 'r'], ['13', 'r', RES]], CX, 1340, 60));
  },
  // 5 · Problema: el pentágono de la cuadrícula.
  examen(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En la cuadrícula, cada cuadrito tiene 1 unidad de lado.', 'El área de la región sombreada, en unidades', 'cuadradas, es:'], opts: ['21', '19', '23', '24'], ok: 0, rv: 22.6 });
    fade(A(t, 2.4, .5), () => {
      const u = 70, P = gridG(330, 1400, 6, 5, u);
      fillPoly([P(0, 0), P(4, 0), P(6, 3), P(2, 5), P(0, 3)], SH, .32);
      fade(A(t, 10, .5), () => {
        polyL([P(0, 0), P(6, 0), P(6, 5), P(0, 5)], NOW, { lw: 3, k: eo(seg(t, 10, 11.6)) });
        [[[P(4, 0), P(6, 0), P(6, 3)], '3', P(5.3, .9)], [[P(6, 3), P(6, 5), P(2, 5)], '4', P(5, 4.3)], [[P(2, 5), P(0, 5), P(0, 3)], '2', P(.65, 4.35)]].forEach(([q, v, c], i) => fade(A(t, 12 + i * 1.2, .4), () => { fillPoly(q, SUB, .25); bigT(v, c[0], c[1] + 12, SUB, 32); }));
      });
      fade(A(t, 20.2, .5), () => F([['30 − 3 − 4 − 2 = ', 'r'], ['21', 'r', RES]], CX, 1480, 50));
    });
  },
  // 6 · Mover una pieza no cambia el área.
  mover(t) {
    stars(t, .3);
    const x0 = 300, yb = 1100, W = 480, Hh = 320, yt = yb - Hh, ym = yb - Hh / 2, R = 110, m = eio(seg(t, 9.6, 13));
    X.save(); X.beginPath(); X.moveTo(x0, yb); X.lineTo(x0 + W, yb); X.lineTo(x0 + W, yt); X.lineTo(x0, yt); X.lineTo(x0, ym - R); X.arc(x0, ym, R, -Math.PI / 2, Math.PI / 2); X.closePath(); X.fillStyle = hexA(SH, .3); X.fill(); X.restore();
    stroke(WH, 3, () => { X.moveTo(x0, ym + R); X.lineTo(x0, yb); X.lineTo(x0 + W, yb); X.lineTo(x0 + W, ym + R); X.moveTo(x0 + W, ym - R); X.lineTo(x0 + W, yt); X.lineTo(x0, yt); X.lineTo(x0, ym - R); });
    stroke(hexA(C.mute, .6), 2, () => X.arc(x0, ym, R, -Math.PI / 2, Math.PI / 2), { dash: [8, 6], g: 0 });
    const bx = x0 + W - m * W;
    X.save(); X.beginPath(); X.moveTo(bx, ym - R); X.arc(bx, ym, R, -Math.PI / 2, Math.PI / 2); X.closePath(); X.fillStyle = hexA(ADD, .45); X.shadowColor = ADD; X.shadowBlur = 12; X.fill(); X.restore();
    stroke(ADD, 3, () => X.arc(bx, ym, R, -Math.PI / 2, Math.PI / 2));
    if (m < 1) segL([x0 + W, ym - R], [x0 + W, ym + R], hexA(C.mute, .6), 1, 2, { dash: [8, 6], g: 0 });
    fade(A(t, 18.2, .5), () => { stroke(RES, 4, () => X.rect(x0, yt, W, Hh), { g: 14 }); mono('6', x0 + W / 2, yb + 44, C.ink, { s: 28 }); mono('4', x0 - 30, yt + 40, C.ink, { s: 28 }); F([['6 · 4 = ', 'r'], ['24', 'r', RES]], CX, 1300, 60); });
  },
  // 7 · Cuatro cuartos forman un círculo.
  cuartos(t) {
    stars(t, .3);
    const s = 440, x0 = CX - s / 2, y0 = 520, r = 150, O = [CX, y0 + s / 2], m = eio(seg(t, 9.4, 12.6));
    fade(1 - m, () => stroke(hexA(WH, .5), 2, () => X.rect(x0, y0, s, s), { g: 0 }));
    [[x0, y0, 0], [x0 + s, y0, Math.PI / 2], [x0 + s, y0 + s, Math.PI], [x0, y0 + s, Math.PI * 1.5]].forEach(([x, y, a0], i) => fade(A(t, 1 + i * .5, .4), () => {
      const p = mid([x, y], O, m), col = [SH, ADD, CUR, NOW][i];
      X.save(); X.beginPath(); X.moveTo(...p); X.arc(p[0], p[1], r, a0, a0 + Math.PI / 2); X.closePath(); X.fillStyle = hexA(col, .4); X.shadowColor = col; X.shadowBlur = 12; X.fill(); X.restore();
      stroke(col, 3, () => { X.moveTo(...p); X.arc(p[0], p[1], r, a0, a0 + Math.PI / 2); X.closePath(); });
    }));
    fade(A(t, 13, .5), () => mono('4 · 90° = 360°', CX, 1080, NOW, { s: 28 }));
    fade(A(t, 18.2, .5), () => F([['4 · ¼ = 1 círculo  →  π · ', 'r'], ['r', 'i', CUR], ['2', 'sp', CUR]], CX, 1220, 54));
  },
  // 8 · Estimar con π: un círculo dentro de un cuadrado de lado 4.
  estimar(t) {
    stars(t, .3);
    const s = 380, x0 = CX - s / 2, y0 = 520, r = s / 2;
    X.save(); X.beginPath(); X.rect(x0, y0, s, s); X.moveTo(CX + r, y0 + r); X.arc(CX, y0 + r, r, 0, Math.PI * 2); X.fillStyle = hexA(SH, .4 * A(t, 2, .6)); X.fill('evenodd'); X.restore();
    stroke(WH, 3, () => X.rect(x0, y0, s, s), { g: 6 }); stroke(CUR, 3, () => X.arc(CX, y0 + r, r, 0, 7));
    mono('4', CX, y0 + s + 44, C.ink, { s: 28 }); fade(A(t, 2.4, .4), () => { segL([CX, y0 + r], [CX + r, y0 + r], NOW, 1, 3); mono('r = 2', CX + r / 2, y0 + r - 16, NOW, { s: 24 }); });
    fade(A(t, 9.2, .5), () => { F([['16 − 4π ≈ 16 − 12.57 = ', 'r'], ['3.43', 'r', RES]], CX, 1080, 50); mono('π ≈ 3.14', CX, 1140, C.mute); });
    fade(A(t, 18.2, .5), () => { mono('si una opción da negativo, se descarta', CX, 1250, SUB, { s: 26 }); mono('si da más que el cuadrado entero, también', CX, 1300, SUB, { s: 26 }); });
  },
  // 9 · El reto resuelto: los cuartos forman un círculo de radio 4.
  resolver(t) {
    stars(t, .3);
    const s = 480, x0 = CX - s / 2, y0 = 420, r = s / 2, O = [CX, y0 + r], m = eio(seg(t, 2, 6)) * (1 - eio(seg(t, 10, 12)));
    star(x0, y0, s, .4 * (1 - m * .8));
    [[x0, y0, 0], [x0 + s, y0, Math.PI / 2], [x0 + s, y0 + s, Math.PI], [x0, y0 + s, Math.PI * 1.5]].forEach(([x, y, a0]) => fade(m, () => {
      const p = mid([x, y], O, m); X.save(); X.beginPath(); X.moveTo(...p); X.arc(p[0], p[1], r, a0, a0 + Math.PI / 2); X.closePath(); X.fillStyle = hexA(CUR, .3); X.fill(); X.restore();
    }));
    fade(A(t, 6, .5), () => F([['4 cuartos de radio 4 = ', 'r'], ['16π', 'r', CUR]], CX, 1060, 48));
    fade(A(t, 10.2, .5), () => F([['cuadrado: 8 · 8 = 64', 'r']], CX, 1140, 48));
    fade(A(t, 20.2, .5), () => { gridG(x0, y0 + s, 8, 8, s / 8, .35); F([['64 − 16π ≈ 64 − 50.3 = ', 'r'], ['13.7', 'r', RES]], CX, 1240, 48); mono('unos 14 cuadritos de 64', CX, 1300, C.mute); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, [[['64 − 16π', 'r']], [['64 − 4π', 'r']], [['16π − 32', 'r']], [['64 − 8π', 'r']]], 0, [['cuadrado − círculo = ', 'r'], ['64 − 16π', 'r', RES]], { s: 46 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['grande − falta', 'r']], 'restar'], [[['pieza + pieza', 'r']], 'sumar'], [[['rectángulo − esquinas', 'r']], 'en la cuadrícula'], [[['4 cuartos = 1 círculo', 'r']], 'juntar curvas']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [SH, NOW, CUR]);
    });
  },
};
