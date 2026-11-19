// «Desarrollos del cubo» · escenas de la lección pu-es-3. Motor en kit.js, preu.js y piezas.js; guion en desarrollos.data.js.
// Parejas opuestas con el mismo color (cian, ámbar, violeta), lo que no sirve en rosa, el resultado en verde y lo que se hace
// ahora en lima.
const P1 = C.cyan, P2 = C.amber, P3 = C.violet, BAD = C.mag, RES = C.green, NOW = C.lime;
const iso = (O, u) => (x, y, z) => [O[0] + (x - y) * u * .866, O[1] + (x + y) * u * .5 - z * u];
function face(pts, col, a) { X.save(); X.beginPath(); pts.forEach((p, i) => (i ? X.lineTo(...p) : X.moveTo(...p))); X.closePath(); X.fillStyle = '#0a0e22'; X.fill(); X.fillStyle = hexA(col, a); X.fill(); X.restore(); stroke('rgba(225,232,255,.7)', 2, () => { pts.forEach((p, i) => (i ? X.lineTo(...p) : X.moveTo(...p))); X.closePath(); }, { g: 4 }); }
// Dado isométrico en el nivel z con números en las tres caras visibles (arriba, izquierda, derecha); null = sin número.
function die(P, z, nums, col = C.cyan, o = {}) {
  const top = [P(0, 0, z + 1), P(1, 0, z + 1), P(1, 1, z + 1), P(0, 1, z + 1)], lf = [P(0, 1, z), P(1, 1, z), P(1, 1, z + 1), P(0, 1, z + 1)], rt = [P(1, 0, z), P(1, 1, z), P(1, 1, z + 1), P(1, 0, z + 1)];
  face(top, col, .3); face(lf, col, .18); face(rt, col, .1);
  const cen = q => [(q[0][0] + q[2][0]) / 2, (q[0][1] + q[2][1]) / 2];
  [[top, nums[0]], [lf, nums[1]], [rt, nums[2]]].forEach(([q, n], i) => { if (n == null) return; const c = cen(q); T(String(n), c[0], c[1] + 16, { k: 'r', s: 44, a: 'c', c: i || !o.hl ? C.ink : o.hl }); });
}
// Desarrollo: celdas [x, y] (y hacia abajo) de lado u desde (x0, y0), con etiquetas y colores.
function netD(x0, y0, u, cells, labs, cols, o = {}) { cells.forEach(([x, y], i) => fade(clamp((o.k ?? 1) * cells.length - i), () => { const c = cols ? cols[i] : C.cyan; X.save(); X.fillStyle = hexA(c, .2); X.fillRect(x0 + x * u + 3, y0 + y * u + 3, u - 6, u - 6); X.restore(); stroke(c, 2.5, () => X.rect(x0 + x * u + 3, y0 + y * u + 3, u - 6, u - 6), { g: 8 }); if (labs) T(String(labs[i]), x0 + (x + .5) * u, y0 + (y + .5) * u + 18, { k: 'r', s: u * .4, a: 'c', c: C.ink }); })); }
const NET = [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [2, 2]];   // 1 arriba del 2; fila 2, 3, 4, 5; 6 debajo del 4
const S = {
  // 1 · El reto: la torre de dados.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Tres dados corrientes, en los que las caras opuestas suman', '7, se apilan en una torre sobre una mesa. La cara de arriba', 'muestra un 4. La suma de las cinco caras que quedan ocultas', '(las que se tocan entre dados y la que toca la mesa) es:'], opts: ['17', '21', '14', '18'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      const P = iso([CX, 1320], 140);
      segL([CX - 380, 1320 + 140], [CX + 380, 1320 + 140], 'rgba(225,232,255,.5)', 1, 2, { g: 0 });
      die(P, 0, [null, 2, 6]); die(P, 1, [null, 5, 3]); die(P, 2, [4, 1, 2], C.cyan, { hl: NOW });
      fade(A(t, 12, .5), () => { [[2.5, '1 oculta'], [1.5, '2 ocultas'], [.5, '2 ocultas']].forEach(([z, s]) => mono(s, CX + 300, 1320 - z * 140 + 70, BAD, { s: 22, a: 'l' })); });
    });
  },
  // 2 · Caras opuestas de un dado.
  dado(t) {
    stars(t, .3);
    [[1, 6, P1], [2, 5, P2], [3, 4, P3]].forEach(([a, b, c], i) => fade(A(t, .8 + i * .8, .5), () => { const y = 560 + i * 150; pill(330, y, 110, 110, c, a, { s: 54, r: 18 }); pill(750, y, 110, 110, c, b, { s: 54, r: 18 }); mono('frente a frente', 540, y + 10, C.mute, { s: 22 }); mono('= 7', 880, y + 14, c, { s: 30, a: 'l' }); }));
    fade(A(t, 9.2, .5), () => F([['oculta = 7 − ', 'r'], ['visible', 'i', NOW]], CX, 1070, 52));
    fade(A(t, 18.2, .5), () => F([['1 + 2 + 3 + 4 + 5 + 6 = ', 'r'], ['21', 'r', RES]], CX, 1170, 50));
  },
  // 3 · El cubo desdoblado.
  desdoblar(t) {
    stars(t, .3);
    const cross = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
    netD(260, 540, 130, cross, null, [P1, P2, NOW, P2, P3, P1], { k: seg(t, 1, 5) });
    fade(A(t, 9.2, .5), () => mono('6 cuadrados unidos por sus lados', CX, 980, NOW, { s: 26 }));
    fade(A(t, 18.2, .5), () => { const others = [[[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]]]; others.forEach((c, i) => netD(110 + i * 300, 1060, 50, c, null, null)); mono('… once en total', CX, 1300, C.ink, { s: 28 }); });
  },
  // 4 · En línea recta: uno sí y uno no.
  linea(t) {
    stars(t, .3);
    fade(win(t, .6, 9.6), () => { netD(345, 600, 130, [[0, 0], [1, 0], [2, 0]], ['A', 'B', 'C'], [P1, NOW, P1]); arrow(410, 560, 410, 480, P1, 1, 3, { h: 12 }); arrow(670, 560, 670, 480, P1, 1, 3, { h: 12 }); mono('A y C: paredes enfrentadas', CX, 830, P1, { s: 26 }); });
    fade(A(t, 10, .5), () => { netD(280, 600, 130, [[0, 0], [1, 0], [2, 0], [3, 0]], ['1.º', '2.º', '3.º', '4.º'], [P1, P2, P1, P2]); mono('1.º con 3.º · 2.º con 4.º', CX, 830, NOW, { s: 28 }); });
    fade(A(t, 20.2, .5), () => { stroke(NOW, 3, () => { X.moveTo(345, 760); X.quadraticCurveTo(475, 860, 605, 760); }, { g: 10 }); mono('con uno en medio: opuestos', CX, 960, RES, { s: 28 }); });
  },
  // 5 · Los vecinos nunca son opuestos.
  vecinos(t) {
    stars(t, .3);
    const cross = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
    netD(260, 540, 130, cross, ['', '', 'X', '', '', ''], cross.map((c, i) => (i === 2 ? NOW : t > 9.2 && [0, 1, 3, 5].includes(i) ? BAD : t > 9.2 && i === 4 ? RES : C.dim)));
    fade(A(t, 9.4, .5), () => { mono('4 vecinas de X', 350, 1000, BAD, { s: 26 }); mono('1 opuesta', 780, 1000, RES, { s: 26 }); });
    fade(A(t, 18.2, .5), () => mono('primero se descartan las vecinas', CX, 1100, NOW, { s: 28 }));
  },
  // 6 · Problema: la opuesta del 1.
  problema(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En un desarrollo del cubo, las caras 2, 3, 4 y 5 forman', 'una fila; la cara 1 está pegada encima de la 2 y la cara 6', 'pegada debajo de la 4. La cara opuesta a la 1 es la:'], opts: ['6', '4', '5', '3'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const cols = t < 10.6 ? null : [P3, P1, P2, P1, P2, P3];
      netD(220, 900, 130, NET, [1, 2, 3, 4, 5, 6], cols || NET.map(() => C.dim));
      fade(A(t, 11.4, .5), () => mono('2 · 4 y 3 · 5', CX, 1340, NOW, { s: 26 }));
      fade(A(t, 20.4, .5), () => mono('quedan 1 y 6: tapa y fondo', CX, 1390, RES, { s: 26 }));
    });
  },
  // 7 · Los que no cierran.
  noarma(t) {
    stars(t, .3);
    fade(win(t, .6, 17.6), () => { netD(140, 560, 130, [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [2, 0]], null, [BAD, C.cyan, C.cyan, C.cyan, BAD, C.cyan]); check(CX, 920, 26, false, A(t, 2, .5)); mono('el 1.º y el 5.º caen en el mismo lugar', CX, 1000, BAD, { s: 24 }); });
    fade(win(t, 9, 17.6), () => { netD(345, 1090, 130, [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], null, [BAD, BAD, C.cyan, BAD, BAD, C.cyan]); check(CX, 1390, 26, false, A(t, 10, .5)); });
    fade(A(t, 18.2, .5), () => { netD(345, 600, 130, [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]], null, null); check(CX + 260, 900, 26, true, A(t, 19, .5)); mono('cada cara, en un lugar distinto', CX, 1190, RES, { s: 26 }); });
  },
  // 8 · Cada dado esconde una pareja que suma 7.
  pareja(t) {
    stars(t, .3);
    const P = iso([CX, 1050], 220);
    die(P, 0, [null, 3, 2]);
    fade(A(t, 1.2, .5), () => { mono('arriba: ?', CX + 260, 600, NOW, { s: 28, a: 'l' }); mono('abajo: ?', CX + 260, 1180, NOW, { s: 28, a: 'l' }); stroke(NOW, 3, () => { X.moveTo(CX + 250, 610); X.lineTo(CX + 250, 1150); }, { g: 10, dash: [8, 8] }); });
    fade(A(t, 9.4, .5), () => F([['arriba + abajo = ', 'r'], ['7', 'r', RES]], CX, 1340, 54));
    fade(A(t, 18.2, .5), () => mono('opuestas: suman 7 aunque no se vean', CX, 1420, C.ink, { s: 26 }));
  },
  // 9 · La torre resuelta.
  resolver(t) {
    stars(t, .3);
    const P = iso([CX - 160, 1260], 130);
    die(P, 0, [null, 2, 6]); die(P, 1, [null, 5, 3]); die(P, 2, [4, 1, 2], C.cyan, { hl: NOW });
    const lab = (z, s, c, t0) => fade(A(t, t0, .4), () => mono(s, CX + 160, 1260 - z * 130 + 70, c, { s: 26, a: 'l' }));
    lab(2.1, 'abajo del 4: 7 − 4 = 3', NOW, 1.2);
    lab(1.1, 'dado del medio: 7', P2, 10.4); lab(.1, 'dado de abajo: 7', P2, 12);
    fade(A(t, 20.2, .5), () => F([['3 + 7 + 7 = ', 'r'], ['17', 'r', RES]], CX, 520, 60));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['17', '21', '14', '18'], 0, [['(7 − 4) + 7 + 7 = ', 'r'], ['17', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['1–6 · 2–5 · 3–4', 'r']], 'el dado'], [[['uno sí, uno no', 'r']], 'en línea recta'], [[['vecinas ≠ opuestas', 'r']], 'se tocan'], [[['11 desarrollos', 'r']], 'del cubo']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [P1, NOW, P2]);
    });
  },
};
