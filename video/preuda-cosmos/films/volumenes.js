// «Volúmenes y superficies» · escenas de la lección pu-ge-6. Motor en kit.js, preu.js y piezas.js; guion en
// volumenes.data.js. Los sólidos en cian, lo que se compara en ámbar, el agua en azul, lo que se recorta en rosa, el
// resultado en verde y lo que se hace ahora en lima.
const SOL = C.cyan, CMP = C.amber, WAT = C.blue, CUT = C.mag, RES = C.green, NOW = C.lime, THR = C.violet;
const WH = 'rgba(225,232,255,.9)';
const sp2 = (s, c) => [String(s), 'sp', c];
// Rejilla sobre la cara de arriba de una caja (esquina de abajo a la izquierda del frente en x, y; w, h, d como prism).
function topGrid(x, y, w, h, d, nx, nz, col) {
  const dx = d * .7, dy = -d * .5, yT = y - h;
  stroke(hexA(col, .7), 1.4, () => { for (let i = 1; i < nx; i++) { const a = x + w * i / nx; X.moveTo(a, yT); X.lineTo(a + dx, yT + dy); } for (let j = 1; j < nz; j++) { const f = j / nz; X.moveTo(x + dx * f, yT + dy * f); X.lineTo(x + w + dx * f, yT + dy * f); } }, { g: 0 });
}
const S = {
  // 1 · El reto: la vela que se funde en conos.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Una vela de cera con forma de cilindro, de radio 3 cm y', 'altura 8 cm, se derrite por completo para fabricar velas', 'pequeñas con forma de cono, de radio 1 cm y altura 2 cm.', 'Si no se pierde cera, la cantidad de velas pequeñas es:'], opts: ['108', '72', '36', '144'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      cyl(300, 1430, 150, 400, SOL, { fill: .14 });
      mono('r = 3', 300, 1500, SOL, { s: 24 }); mono('h = 8', 120, 1240, SOL, { s: 24 });
      fade(A(t, 10.6, .5), () => { for (let i = 0; i < 9; i++) fade(A(t, 11 + i * .25, .3), () => cone(620 + (i % 3) * 140, 1180 + Math.floor(i / 3) * 130, 50, 100, CMP, { fill: .2, lw: 2, g: 6 })); });
      fade(A(t, 14.4, .5), () => { mono('r = 1 · h = 2', 760, 1490, CMP, { s: 24 }); bigT('× ?', 760, 1000, NOW, 52); });
    });
  },
  // 2 · Base por altura: capas de cubitos.
  capas(t) {
    stars(t, .3);
    const u = 80, x = 300, y = 1250, n = Math.min(5, Math.floor(seg(t, 9.4, 13) * 5 + 1e-9) + (t > 1.6 ? 1 : 0));
    for (let i = 0; i < n; i++) { prism(x, y - i * u, 4 * u, u, 3 * u, i ? SOL : CMP, { fill: .14, lw: 2.5, g: 8 }); }
    if (n) topGrid(x, y - (n - 1) * u, 4 * u, u, 3 * u, 4, 3, n > 1 ? SOL : CMP);
    fade(A(t, 2.4, .5), () => { mono('4', x + 2 * u, y + 40, C.ink, { s: 26 }); mono('3', x + 4 * u + 110, y - 30, C.ink, { s: 26 }); F([['base: 4 · 3 = ', 'r'], ['12', 'r', CMP]], CX, 560, 48); });
    fade(A(t, 9.2, .5), () => { F([['12 · ', 'r'], [String(n), 'r', NOW], [' = ' + 12 * n, 'r', RES]], CX, 650, 48); });
    fade(A(t, 18.2, .5), () => F([['V = ', 'r'], ['A', 'i', CMP], ['base', 'sb', CMP], [' · ', 'r'], ['h', 'i', NOW]], CX, 1430, 64));
  },
  // 3 · El cilindro: una pila de monedas.
  cilindro(t) {
    stars(t, .3);
    const cx = CX, cy = 1180, r = 200, h = 300 * eio(seg(t, 1, 6));
    cyl(cx, cy, r, Math.max(2, h), SOL, { fill: .12 });
    for (let yy = 30; yy < h; yy += 30) stroke(hexA(SOL, .45), 1.4, () => X.ellipse(cx, cy - yy, r, r * .3, 0, 0, Math.PI), { g: 0 });
    fade(A(t, 2, .4), () => { segL([cx, cy - h], [cx + r, cy - h], NOW, 1, 3); mono('r', cx + r / 2, cy - h - 16, NOW, { s: 28 }); });
    fade(A(t, 9.2, .5), () => F([['V = π · ', 'r'], ['r', 'i', NOW], sp2(2, NOW), [' · ', 'r'], ['h', 'i', CMP]], CX, 600, 64));
    fade(A(t, 18.2, .5), () => F([['r = 4, h = 3:  π · 16 · 3 = ', 'r'], ['48π', 'r', RES]], CX, 1400, 48));
  },
  // 4 · El cono es un tercio del cilindro.
  tercio(t) {
    stars(t, .3);
    const r = 150, h = 380, yb = 1200, k3 = seg(t, 9.4, 17) * 3, i = Math.min(3, Math.floor(k3 + 1e-9)), ph = i >= 3 ? 0 : k3 - i;
    const coneW = t < 9.4 ? 1 : i >= 3 ? 0 : ph < .5 ? 1 - ph * 2 : i === 2 ? 0 : (ph - .5) * 2, cylW = Math.min(3, i + clamp(ph * 2)) / 3, pour = Math.min(3, i + (ph >= .5 ? 1 : 0));
    cone(300, yb, r, h, CMP, { fill: .08 });
    if (coneW > 0) cone(300, yb, r, h, WAT, { fill: .35 * coneW, lw: 0.01, g: 0 });
    cyl(760, yb, r, h, SOL, { water: t < 9.4 ? 0 : cylW, wc: WAT });
    fade(A(t, 2, .4), () => { mono('misma base', 530, yb + 60, C.mute, { s: 22 }); stroke(hexA(NOW, .6), 2, () => { X.moveTo(120, yb - h); X.lineTo(960, yb - h); }, { dash: [8, 8], g: 0 }); mono('misma altura', 530, yb - h - 16, NOW, { s: 22 }); });
    fade(A(t, 9.6, .4), () => bigT(pour + ' / 3', 760, 640, WAT, 52));
    fade(A(t, 18.2, .5), () => F([['V = ⅓ · π · ', 'r'], ['r', 'i'], sp2(2), [' · ', 'r'], ['h', 'i']], CX, 1420, 60));
  },
  // 5 · La esfera ocupa dos tercios del cilindro que la envuelve.
  esfera(t) {
    stars(t, .3);
    const R = 220, cx = CX, cy = 1000;
    cyl(cx, cy + R, R, 2 * R, SOL, { fill: .05 });
    fade(A(t, 1.6, .5), () => { X.save(); X.beginPath(); X.arc(cx, cy, R, 0, 7); X.fillStyle = hexA(CMP, .22); X.shadowColor = CMP; X.shadowBlur = 16; X.fill(); X.restore(); ring(cx, cy, R, CMP, 3, eo(seg(t, 1.6, 3))); stroke(hexA(CMP, .6), 2, () => X.ellipse(cx, cy, R, R * .3, 0, 0, Math.PI), { g: 0 }); });
    fade(A(t, 9.2, .5), () => { bigT('⅔', cx + R + 90, cy + 20, CMP, 72); mono('del cilindro', cx + R + 90, cy + 70, C.mute, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { F([['V = ⁴⁄₃ · π · ', 'r'], ['r', 'i', NOW], sp2(3, NOW)], CX, 560, 62); F([['r = 6:  ⁴⁄₃ · π · 216 = ', 'r'], ['288π', 'r', RES]], CX, 1400, 46); });
  },
  // 6 · Problema: la caja de cartón.
  caja(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['De una lámina rectangular de cartón de 20 cm por 14 cm', 'se recorta, en cada esquina, un cuadrado de 3 cm de lado,', 'y luego se doblan los bordes hacia arriba para formar una', 'caja sin tapa. El volumen de la caja, en cm³, es:'], opts: ['336', '840', '561', '462'], ok: 0, rv: 22.6 });
    const u = 22, x0 = CX - 10 * u, y0 = 880;
    fade(win(t, 3, 10.4), () => {
      X.save(); X.fillStyle = hexA(SOL, .12); X.fillRect(x0, y0, 20 * u, 14 * u); X.restore(); stroke(WH, 3, () => X.rect(x0, y0, 20 * u, 14 * u), { g: 6 });
      [[0, 0], [17, 0], [0, 11], [17, 11]].forEach(([i, j], n) => fade(A(t, 4 + n * .4, .3), () => { X.save(); X.fillStyle = hexA(CUT, .4); X.fillRect(x0 + i * u, y0 + j * u, 3 * u, 3 * u); X.restore(); stroke(CUT, 2.5, () => X.rect(x0 + i * u, y0 + j * u, 3 * u, 3 * u)); }));
      mono('20', CX, y0 - 16, C.ink, { s: 24 }); mono('14', x0 - 30, y0 + 7 * u, C.ink, { s: 24 }); mono('3', x0 + 1.5 * u, y0 + 3 * u + 30, CUT, { s: 22 });
      stroke(hexA(NOW, .6), 2, () => X.rect(x0 + 3 * u, y0 + 3 * u, 14 * u, 8 * u), { dash: [8, 6], g: 0 });
    });
    fade(A(t, 10.4, .5), () => {
      const bx = CX - 7 * u * 1.2 - 40, by = 1360, k = eio(seg(t, 10.6, 12.6));
      prism(bx, by, 14 * u * 1.2, 3 * u * 1.2 * k + 1, 8 * u * 1.2, SOL, { fill: .16 });
      fade(A(t, 12.6, .4), () => { mono('14', bx + 7 * u * 1.2, by + 40, C.ink, { s: 24 }); mono('3', bx - 26, by - 30, NOW, { s: 24 }); mono('8', bx + 14 * u * 1.2 + 80, by - 40, C.ink, { s: 24 }); });
      fade(A(t, 13.2, .4), () => F([['20 − 6 = 14   ·   14 − 6 = 8', 'r']], CX, 950, 42));
      fade(A(t, 20.2, .5), () => F([['14 · 8 · 3 = ', 'r'], ['336', 'r', RES]], CX, 1040, 58));
    });
  },
  // 7 · La superficie de un cubo: seis caras.
  superficie(t) {
    stars(t, .3);
    const u = 120, x0 = CX - 2 * u, y0 = 480, faces = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
    fade(win(t, .6, 17.6), () => {
      faces.forEach(([i, j], n) => fade(A(t, 1 + n * .4, .4), () => { X.save(); X.fillStyle = hexA([SOL, CMP, THR][n % 3], .22); X.fillRect(x0 + i * u + 3, y0 + j * u + 3, u - 6, u - 6); X.restore(); stroke([SOL, CMP, THR][n % 3], 2.5, () => X.rect(x0 + i * u + 3, y0 + j * u + 3, u - 6, u - 6)); if (t > 9.4) bigT('25', x0 + (i + .5) * u, y0 + (j + .5) * u + 14, C.ink, 36); }));
      fade(A(t, 9.2, .5), () => { F([['150 ÷ 6 = 25', 'r'], ['   →   arista ', 'r'], ['5', 'r', NOW]], CX, 1010, 48); });
    });
    fade(A(t, 18, .5), () => { prism(CX - 160, 1140, 240, 240, 240, SOL, { fill: .16 }); mono('5', CX - 40, 1180, NOW, { s: 26 }); F([['5 · 5 · 5 = ', 'r'], ['125', 'r', RES]], CX, 1320, 56); mono('cm² para envolver · cm³ para llenar', CX, 1390, C.mute, { s: 24 }); });
  },
  // 8 · La piedra que sube el agua.
  piedra(t) {
    stars(t, .3);
    const r = 220, H = 440, cx = CX, cy = 1250, drop = eio(seg(t, 3, 6.5)), w = .5 + .1 * eio(seg(t, 6, 8.5));
    cyl(cx, cy, r, H, SOL, { water: w, wc: WAT });
    const sy = lerp(cy - H - 120, cy - 70, drop);
    X.save(); X.beginPath(); X.ellipse(cx - 30, sy, 70, 46, .3, 0, 7); X.fillStyle = hexA(CMP, .5); X.shadowColor = CMP; X.shadowBlur = 12; X.fill(); X.restore();
    fade(A(t, 9.2, .5), () => { const y1 = cy - H * .5, y2 = cy - H * .6; stroke(NOW, 3, () => { X.moveTo(cx + r + 40, y1); X.lineTo(cx + r + 40, y2); }); mono('+2 cm', cx + r + 50, (y1 + y2) / 2 + 8, NOW, { s: 24, a: 'l' }); });
    fade(A(t, 2, .4), () => mono('r = 10', cx, cy + 100, C.ink, { s: 24 }));
    fade(A(t, 18.2, .5), () => F([['π · 10', 'r'], sp2(2), [' · 2 = ', 'r'], ['200π', 'r', RES], [' cm³', 'r']], CX, 640, 56));
  },
  // 9 · La vela resuelta.
  resolver(t) {
    stars(t, .3);
    cyl(250, 1000, 130, 340, SOL, { fill: .14 });
    F([['π · 3', 'r'], sp2(2), [' · 8 = ', 'r'], ['72π', 'r', SOL]], 640, 820, 52);
    fade(A(t, 10, .5), () => { cone(250, 1240, 44, 90, CMP, { fill: .25 }); F([['⅓ · π · 1', 'r'], sp2(2), [' · 2 = ', 'r'], ['2π/3', 'r', CMP]], 640, 1210, 50); });
    fade(A(t, 20.2, .5), () => {
      F([['72π ÷ (2π/3) = 72 · 3/2 = ', 'r'], ['108', 'r', RES]], CX, 560, 50);
      for (let i = 0; i < 108; i++) fade(A(t, 21 + i * .03, .2), () => dot(470 + (i % 18) * 30, 1360 + Math.floor(i / 18) * 26, 6, CMP, 8));
    });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['108', '72', '36', '144'], 0, [['72π ÷ (2π/3) = ', 'r'], ['108', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['A', 'i'], ['base', 'sb'], [' · ', 'r'], ['h', 'i']], 'prisma y cilindro'], [[['⅓ · ', 'r'], ['A', 'i'], ['base', 'sb'], [' · ', 'r'], ['h', 'i']], 'cono y pirámide'], [[['⁴⁄₃ · π · ', 'r'], ['r', 'i'], sp2(3)], 'esfera'], [[['6', 'r'], ['a', 'i'], sp2(2)], 'superficie del cubo']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [SOL, NOW, CMP]);
    });
  },
};
