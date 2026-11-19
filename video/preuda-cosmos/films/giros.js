// «Giros, espejos y dobleces» · escenas de la lección pu-es-4. Motor en kit.js, preu.js y piezas.js; guion en giros.data.js.
// Lo real en cian, el reflejo en violeta, el espejo en lima, los giros en ámbar, el resultado en verde y lo imposible en rosa.
const REAL = C.cyan, MIR = C.violet, NOW = C.lime, TURN = C.amber, RES = C.green, BAD = C.mag;
const WH = 'rgba(225,232,255,.85)';
// Reloj de agujas centrado en O con radio R marcando h:m; flip = visto en un espejo vertical.
function clock(O, R, h, m, col, flip = false, o = {}) {
  ring(O[0], O[1], R, WH, 3);
  for (let k = 0; k < 12; k++) { const a = 90 - 30 * k; segL(at(O, a, R - (k % 3 ? 14 : 26)), at(O, a, R), WH, 1, k % 3 ? 2 : 4, { g: 0 }); if (o.nums && k % 3 === 0) { const q = at(O, flip ? 90 + 30 * k : 90 - 30 * k, R - 52); T(String(k || 12), q[0], q[1] + 12, { k: 'r', s: 30, a: 'c', c: C.mute }); } }
  const sgn = flip ? -1 : 1, ah = 90 - sgn * 30 * (h % 12 + m / 60), am = 90 - sgn * 6 * m;
  segL(O, at(O, ah, R * .5), col, 1, 8); segL(O, at(O, am, R * .78), col, 1, 4); dot(O[0], O[1], 8, col, 12);
}
// Figura en L hecha de casillas [x, y] (y hacia abajo), girada ang grados y reflejada si flip, centrada en c.
function shape(c, cells, u, col, ang = 0, flip = false) {
  const r = ang * DEG;
  cells.forEach(([x, y]) => { const px = (flip ? -1 : 1) * (x - .5), py = y - 1; const pts = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([dx, dy]) => { const X0 = (px + (flip ? -dx : dx)) * u, Y0 = (py + dy) * u; return [c[0] + X0 * Math.cos(r) - Y0 * Math.sin(r), c[1] + X0 * Math.sin(r) + Y0 * Math.cos(r)]; }); polyL(pts, col, { fill: .3, lw: 2.5 }); });
}
const LCELLS = [[0, 0], [0, 1], [0, 2], [1, 2]];
const S = {
  // 1 · El reto: el reloj en el espejo.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Un reloj de agujas sin números se ve en un espejo y parece', 'marcar las 8:25. La hora que marca en realidad es:'], opts: ['3:35', '4:35', '3:25', '8:35'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      clock([300, 1080], 190, 8, 25, MIR); mono('lo que se ve en el espejo', 300, 1320, MIR, { s: 22 });
      segL([CX + 20, 860], [CX + 20, 1300], NOW, eo(seg(t, 10.4, 11.4)), 4);
      fade(A(t, 12, .5), () => { ring(800, 1080, 190, hexA(REAL, .5), 3, 1, { dash: [8, 8] }); bigT('?', 800, 1110, REAL, 90); mono('la hora real', 800, 1320, REAL, { s: 22 }); });
    });
  },
  // 2 · El espejo.
  espejo(t) {
    stars(t, .3);
    const mx = CX;
    segL([mx, 480], [mx, 1240], NOW, eo(seg(t, .8, 2)), 4);
    fade(A(t, 1.6, .5), () => { const p = [mx - 260, 700], q = [mx + 260, 700]; dot(...p, 12, REAL); fade(A(t, 2.6, .5), () => { dot(...q, 12, MIR); segL(p, q, hexA(C.mute, .6), 1, 2, { dash: [8, 8], g: 0 }); mono('260', mx - 130, 680, C.mute, { s: 22 }); mono('260', mx + 130, 680, C.mute, { s: 22 }); }); });
    fade(A(t, 10, .5), () => { bigT('b', mx - 220, 960, REAL, 120, { k: 'i' }); bigT('d', mx + 220, 960, MIR, 120, { k: 'i' }); mono('izquierda ↔ derecha', CX, 1050, NOW, { s: 24 }); });
    fade(A(t, 20, .5), () => { arrow(mx - 360, 1160, mx - 120, 1160, REAL, 1, 5, { h: 18 }); arrow(mx + 360, 1160, mx + 120, 1160, MIR, 1, 5, { h: 18 }); });
  },
  // 3 · Letras simétricas.
  eje(t) {
    stars(t, .3);
    const row = (y, s, col, t0, axis) => fade(A(t, t0, .5), () => [...s].forEach((L, i) => { const x = CX + (i - (s.length - 1) / 2) * 100; T(L, x, y, { k: 'brand', s: 84, a: 'c', c: col }); if (axis === 'v' || axis === 'b') stroke(hexA(NOW, .7), 2, () => { X.moveTo(x, y - 80); X.lineTo(x, y + 14); }, { dash: [6, 6], g: 0 }); if (axis === 'h' || axis === 'b') stroke(hexA(TURN, .7), 2, () => { X.moveTo(x - 44, y - 31); X.lineTo(x + 44, y - 31); }, { dash: [6, 6], g: 0 }); }));
    row(620, 'AHMTUVWXY', REAL, .8, 'v'); row(860, 'BCDEK', MIR, 9.2, 'h'); row(1100, 'HIOX', RES, 18.2, 'b');
  },
  // 4 · Girar.
  giro(t) {
    stars(t, .3);
    const ang = 90 * eio(seg(t, 1.5, 3.5)) + 90 * eio(seg(t, 9.6, 11.6)) + 180 * eio(seg(t, 18.6, 21.6));
    shape([CX, 800], LCELLS, 110, TURN, ang);
    ring(CX, 800, 300, hexA(TURN, .3), 2);
    mono(`${Math.round(ang) % 360 || (ang > 1 ? 360 : 0)}°`, CX, 1180, TURN, { s: 34 });
  },
  // 5 · Girar no es reflejar.
  manos(t) {
    stars(t, .3);
    shape([320, 760], LCELLS, 100, REAL, t < 10 ? 0 : 360 * seg(t, 10.4, 17)); segL([CX, 520], [CX, 1000], NOW, 1, 3); shape([760, 760], LCELLS, 100, MIR, 0, true);
    mono('L', 320, 1060, REAL, { s: 28 }); mono('reflejo', 760, 1060, MIR, { s: 24 });
    fade(A(t, 10, .5), () => { check(320, 1120, 22, false, A(t, 17.4, .5)); mono('ningún giro la vuelve J', 320, 1180, BAD, { s: 22 }); });
    fade(A(t, 20.2, .5), () => mono('izquierda y derecha: iguales, no superponibles', CX, 1280, C.ink, { s: 24 }));
  },
  // 6 · Relojes en el espejo.
  relojes(t) {
    stars(t, .3);
    clock([300, 760], 200, 2, 10, REAL, false, { nums: true }); clock([780, 760], 200, 2, 10, MIR, true, { nums: true });
    segL([CX, 520], [CX, 1000], NOW, 1, 3);
    mono('real', 300, 1010, REAL, { s: 24 }); mono('espejo', 780, 1010, MIR, { s: 24 });
    fade(A(t, 20, .5), () => { F([['2:10', 'r', REAL], [' + ', 'r'], ['9:50', 'r', MIR], [' = 12:00', 'r', RES]], CX, 1160, 54); mono('lo que el espejo muestra de 2:10 se lee 9:50', CX, 1230, C.mute, { s: 22 }); });
  },
  // 7 · Cada doblez duplica las capas.
  doblar(t) {
    stars(t, .3);
    const n = Math.min(4, Math.floor(seg(t, 1, 17) * 4.999)), layers = 2 ** n;
    const w = 640 / 2 ** Math.min(n, 3);
    for (let i = 0; i < Math.min(layers, 16); i++) { X.save(); X.fillStyle = hexA(REAL, .12); X.fillRect(220 + i * 3, 560 + i * 6, w, 360); X.restore(); stroke(REAL, 2, () => X.rect(220 + i * 3, 560 + i * 6, w, 360), { g: 4 }); }
    bigT(`${layers} capas`, 820, 760, TURN, 48);
    mono(`${n} dobleces`, 820, 820, C.mute, { s: 24 });
    fade(A(t, 18.2, .5), () => { dot(220 + w / 2, 740, 16, BAD, 20); mono('un agujero → uno por capa', CX, 1120, NOW, { s: 26 }); });
  },
  // 8 · Problema: la tira doblada cuatro veces.
  tira(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Una tira de papel se dobla por la mitad cuatro veces', 'seguidas y se le hace un agujero que atraviesa todas las', 'capas. Al desdoblarla, la cantidad de agujeros es:'], opts: ['16', '8', '4', '32'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      boxes(CX, 960, [2, 2, 2, 2], [TURN, TURN, TURN, TURN], { k: seg(t, 10.4, 13), labs: ['1.º', '2.º', '3.º', '4.º'], gap: 170, w: 110, s: 54 });
      fade(A(t, 20.4, .5), () => { const x0 = 120, w = 840; stroke(REAL, 3, () => X.rect(x0, 1180, w, 90), { g: 8 }); for (let i = 0; i < 16; i++) { if (i) stroke(hexA(REAL, .3), 1, () => { X.moveTo(x0 + i * w / 16, 1180); X.lineTo(x0 + i * w / 16, 1270); }, { dash: [4, 4], g: 0 }); dot(x0 + (i + .5) * w / 16, 1225, 9, BAD, 12); } mono('16 agujeros', CX, 1330, RES, { s: 28 }); });
    });
  },
  // 9 · El reloj resuelto.
  resolver(t) {
    stars(t, .3);
    clock([300, 760], 200, 8, 25, MIR); mono('espejo: 8:25', 300, 1010, MIR, { s: 24 });
    segL([CX, 520], [CX, 1000], NOW, 1, 3);
    fade(A(t, 10, .5), () => { clock([780, 760], 200, 3, 35, REAL); mono('real: 3:35', 780, 1010, REAL, { s: 24 }); F([['11:60 − 8:25 = ', 'r'], ['3:35', 'r', RES]], CX, 1150, 54); });
    fade(A(t, 20.2, .5), () => F([['3:35 + 8:25 = 11:60 = ', 'r'], ['12:00', 'r', RES]], CX, 1250, 46));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['3:35', '4:35', '3:25', '8:35'], 0, [['12:00 − 8:25 = ', 'r'], ['3:35', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['misma distancia', 'r']], 'el espejo'], [[['90° · 180° · 360°', 'r']], 'los giros'], [[['real + espejo = 12', 'r']], 'el reloj'], [[['2, 4, 8, 16', 'r']], 'los dobleces']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [REAL, NOW, MIR]);
    });
  },
};
