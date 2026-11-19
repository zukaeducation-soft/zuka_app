// «Semejanza y escala» · escenas de la lección pu-ge-3. Motor en kit.js, preu.js y piezas.js; guion en semejanza.data.js.
// La figura original en cian, la ampliada en ámbar, la razón k en lima, lo deformado en rosa y el resultado en verde.
const ORI = C.cyan, BIG = C.amber, NOW = C.lime, BAD = C.mag, RES = C.green, THR = C.violet;
const WH = 'rgba(225,232,255,.9)';
const sp2 = (s, c) => [String(s), 'sp', c];
// Casa (pentágono) con esquina de abajo a la izquierda en (x, y), escala sx × sy (unidad u).
const house = (x, y, sx, sy, u = 60) => [[x, y], [x + 2 * u * sx, y], [x + 2 * u * sx, y - 1.4 * u * sy], [x + u * sx, y - 2.3 * u * sy], [x, y - 1.4 * u * sy]];
// Vaso cónico: boca en (cx, cy) de radio r, punta abajo a h; agua hasta la fracción w de la altura.
function glass(cx, cy, r, h, w, o = {}) {
  if (w > 0) cone(cx, cy + h * (1 - w), r * w, h * w, o.wc || C.cyan, { down: true, fill: .38, lw: 2 });
  cone(cx, cy, r, h, WH, { down: true, lw: 3, g: 6 });
}
const S = {
  // 1 · El reto: el vaso cónico a media altura.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Un vaso con forma de cono, con la punta hacia abajo, se', 'llena de agua hasta la mitad de su altura. La fracción del', 'volumen total del vaso que ocupa el agua es:'], opts: [[['1/8', 'r']], [['1/2', 'r']], [['1/4', 'r']], [['1/3', 'r']]], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      const cx = CX, cy = 960, r = 230, h = 440;
      glass(cx, cy, r, h, .5 * eio(seg(t, 10.4, 13)));
      fade(A(t, 13.4, .5), () => { stroke(NOW, 2, () => { X.moveTo(cx + r + 40, cy); X.lineTo(cx + r + 40, cy + h); }, { g: 6 }); dot(cx + r + 40, cy + h / 2, 7, NOW); mono('h', cx + r + 70, cy + h / 4 + 8, NOW, { s: 26 }); mono('h/2', cx + r + 86, cy + 3 * h / 4 + 8, NOW, { s: 26 }); });
      fade(A(t, 20.4, .5), () => { F([['¿', 'r', C.dim]].slice(1).concat([['1/2', 'r', BAD]]), cx - 300, cy + h / 2, 52); stroke(BAD, 3, () => { X.moveTo(cx - 350, cy + h / 2 - 16); X.lineTo(cx - 250, cy + h / 2 - 16); }, { g: 8 }); mono('la intuición', cx - 300, cy + h / 2 + 50, C.mute, { s: 22 }); });
    });
  },
  // 2 · Misma forma, otro tamaño; estirar deforma.
  forma(t) {
    stars(t, .3);
    const k = 1 + eio(seg(t, 1.6, 4));
    polyL(house(140, 760, 1, 1), ORI, { fill: .14 });
    polyL(house(430, 760, k, k), BIG, { fill: .12 });
    fade(A(t, 4.4, .5), () => { mono('× 1', 200, 820, ORI, { s: 26 }); F([['× ', 'r'], ['k', 'i', NOW], [' = 2', 'r']], 550, 830, 40); });
    fade(A(t, 9.2, .5), () => {
      const sx = 1 + 1.3 * eio(seg(t, 9.6, 11.6));
      polyL(house(140, 1260, sx, 1), BAD, { fill: .12 });
      fade(A(t, 12, .5), () => { mono('solo el ancho × 2.3', 360, 1320, BAD, { s: 26 }); check(820, 1150, 26, false, A(t, 12.4, .6)); });
    });
    fade(A(t, 18.2, .5), () => {
      const a = house(140, 760, 1, 1), b = house(430, 760, 2, 2);
      arcV(a[3], a[4], a[2], 34, NOW, 1); arcV(b[3], b[4], b[2], 50, NOW, 1); arcV(a[0], a[1], a[4], 26, NOW, 1); arcV(b[0], b[1], b[4], 36, NOW, 1);
      mono('mismos ángulos', 700, 360, NOW, { s: 26 });
    });
  },
  // 3 · Corte paralelo: Tales.
  tales(t) {
    stars(t, .3);
    const A0 = [300, 460], u = 70, dB = 0, B0 = at(A0, -62, 9 * u), C0 = at(A0, -28, 6 * u * 1.6);
    const D0 = mid(A0, B0, 4 / 6 * 2 / 3 * 1.5 / 1.5 * 1), E0 = mid(A0, C0, 2 / 3);
    const Bk = mid(A0, B0, 2 / 3);
    polyL([A0, B0, C0], WH, { k: eo(seg(t, .8, 2.2)), fill: .05 });
    segL(Bk, E0, NOW, eo(seg(t, 2.6, 4)), 4);
    fade(A(t, 4.2, .5), () => { mono('paralela a la base', (Bk[0] + E0[0]) / 2 + 160, (Bk[1] + E0[1]) / 2, NOW, { s: 22 }); });
    fade(A(t, 10, .5), () => { polyL([A0, Bk, E0], ORI, { fill: .22, lw: 3 }); polyL([A0, B0, C0], BIG, { fill: .06, lw: 3 }); arcA(A0, 60, -62, -28, NOW, 1, { fill: .2 }); });
    const side = (p, q, v, col, d) => { const m = mid(p, q), o = at(m, angOf(p, q) + d, 34); mono(v, o[0], o[1] + 10, col, { s: 30 }); };
    fade(A(t, 12, .5), () => { side(A0, Bk, '4', ORI, -90); side(A0, E0, '6', ORI, 90); side(Bk, B0, '+2 → 6', BIG, -90); side(E0, C0, '+3 → 9', BIG, 90); });
    fade(A(t, 20.2, .5), () => F([['6', 'r', BIG], [' / ', 'r'], ['4', 'r', ORI], [' = ', 'r'], ['9', 'r', BIG], [' / ', 'r'], ['6', 'r', ORI], [' = ', 'r'], ['1.5', 'r', NOW]], CX, 1340, 60));
  },
  // 4 · Problema: el poste y el edificio.
  sombras(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['A cierta hora del día, un poste vertical de 3 metros', 'proyecta una sombra de 4 metros. A la misma hora, un', 'edificio cercano proyecta una sombra de 28 metros. La', 'altura del edificio, en metros, es:'], opts: ['21', '27', '24', '37'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const g = 1400, u = 20, px = 160, ex = 420;
      segL([110, g], [1000, g], WH, 1, 3, { g: 4 });
      segL([px, g], [px, g - 3 * u], ORI, 1, 6); segL([px, g], [px + 4 * u, g], hexA(ORI, .6), 1, 8);
      fade(A(t, 10.4, .5), () => { prism(ex, g, 50, 21 * u, 30, BIG, { fill: .1 }); segL([ex + 50, g], [ex + 50 + 28 * u, g], hexA(BIG, .5), eo(seg(t, 10.4, 11.6)), 8); });
      fade(A(t, 12, .5), () => { segL([px, g - 3 * u], [px + 4 * u, g], NOW, 1, 2.5, { dash: [8, 6] }); segL([ex + 50, g - 21 * u], [ex + 50 + 28 * u, g], NOW, eo(seg(t, 12, 13.4)), 2.5, { dash: [8, 6] }); mono('rayos paralelos', 800, 1000, NOW, { s: 22 }); });
      mono('3', px - 26, g - 30, ORI, { s: 26 }); mono('4', px + 2 * u, g + 40, ORI, { s: 26 });
      mono('28', ex + 50 + 14 * u, g + 40, BIG, { s: 26 });
      fade(A(t, 20.2, .5), () => { mono('?', ex - 30, g - 10.5 * u, BIG, { s: 36 }); F([['28 ÷ 4 = ', 'r'], ['7', 'r', NOW], ['  →  7 · 3 = ', 'r'], ['21 m', 'r', RES]], CX, 880, 48); });
    });
  },
  // 5 · Las áreas crecen con k².
  area(t) {
    stars(t, .3);
    const u = 90, y = 1120;
    const grid = (x, n, col, kk) => { for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const a = clamp(kk * n * n - (i * n + j)); if (a > 0) fade(a, () => { X.save(); X.fillStyle = hexA(col, .3); X.fillRect(x + j * u + 3, y - (i + 1) * u + 3, u - 6, u - 6); X.restore(); stroke(col, 2, () => X.rect(x + j * u + 3, y - (i + 1) * u + 3, u - 6, u - 6), { g: 6 }); }); } };
    grid(100, 1, ORI, A(t, 1, .5)); mono('1', 145, y + 44, ORI, { s: 26 });
    fade(A(t, 2, .4), () => { grid(260, 2, BIG, seg(t, 2.4, 6)); mono('lado × 2 → área × 4', 350, y + 44, BIG, { s: 22 }); });
    fade(A(t, 9.2, .4), () => { grid(530, 3, THR, seg(t, 9.6, 14)); mono('lado × 3 → área × 9', 665, y + 44, THR, { s: 22 }); });
    fade(A(t, 18.2, .5), () => F([['longitud × ', 'r'], ['k', 'i', NOW], ['  →  área × ', 'r'], ['k', 'i', NOW], sp2(2, NOW)], CX, 1320, 58));
  },
  // 6 · Problema: el lado crece 30 %.
  lado30(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Si el lado de un cuadrado aumenta en un 30 %,', 'entonces su área aumenta en:'], opts: ['69 %', '60 %', '30 %', '90 %'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const u = 36, x = 300, y = 1300, g = eio(seg(t, 11, 13.4)), n = 10 + 3 * g;
      X.save(); X.fillStyle = hexA(ORI, .22); X.fillRect(x, y - 10 * u, 10 * u, 10 * u); X.restore();
      fade(g, () => { X.save(); X.fillStyle = hexA(BIG, .3); X.fillRect(x + 10 * u, y - 10 * u, 3 * u, 10 * u); X.fillRect(x, y - 13 * u, 10 * u, 3 * u); X.fillStyle = hexA(BAD, .4); X.fillRect(x + 10 * u, y - 13 * u, 3 * u, 3 * u); X.restore(); });
      stroke('rgba(160,180,240,.25)', 1, () => { for (let i = 0; i <= n; i++) { X.moveTo(x + i * u, y); X.lineTo(x + i * u, y - n * u); X.moveTo(x, y - i * u); X.lineTo(x + n * u, y - i * u); } }, { g: 0 });
      stroke(WH, 3, () => X.rect(x, y - n * u, n * u, n * u), { g: 6 });
      bigT('100', x + 5 * u, y - 5 * u + 18, ORI, 52);
      mono(n.toFixed(0) === '13' ? '13' : n.toFixed(1), x + n * u / 2, y + 40, NOW, { s: 26 });
      fade(A(t, 14, .5), () => { bigT('30', x + 11.5 * u, y - 5 * u + 14, BIG, 36); bigT('30', x + 5 * u, y - 11.5 * u + 14, BIG, 36); bigT('9', x + 11.5 * u, y - 11.5 * u + 14, BAD, 34); });
      fade(A(t, 20.4, .5), () => F([['30 + 30 + 9 = ', 'r'], ['69', 'r', RES], ['   ·   1.3', 'r'], sp2(2), [' = 1.69', 'r', RES]], CX, 1430, 46));
    });
  },
  // 7 · Los volúmenes crecen con k³.
  volumen(t) {
    stars(t, .3);
    const cubeAt = (x, y, n, s, col, kk) => { let c = 0; for (let z = 0; z < n; z++) for (let i = n - 1; i >= 0; i--) for (let j = 0; j < n; j++) { const a = clamp(kk * n * n * n - c++); if (a > 0) fade(a, () => prism(x + j * s + i * s * .7 * .5, y - z * s - i * s * .5 * .5, s, s, s * .5, col, { fill: .14, lw: 1.6, g: 6 })); } };
    cubeAt(110, 860, 1, 80, ORI, A(t, 1, .5)); mono('1', 160, 920, ORI, { s: 26 });
    fade(A(t, 2, .4), () => { cubeAt(330, 860, 2, 80, BIG, seg(t, 2.4, 6)); mono('arista × 2 → 8', 430, 920, BIG, { s: 22 }); });
    fade(A(t, 9.2, .4), () => { cubeAt(330, 1280, 3, 80, THR, seg(t, 9.6, 15)); mono('arista × 3 → 27', 460, 1340, THR, { s: 22 }); });
    fade(A(t, 18.2, .5), () => F([['volumen × ', 'r'], ['k', 'i', NOW], sp2(3, NOW)], 860, 1180, 50));
  },
  // 8 · La tabla de k, k² y k³.
  tabla(t) {
    stars(t, .3);
    const rows = ['ampliar  k = 2', 'reducir  k = 1/2'], cols = ['longitud', 'área', 'volumen'];
    const vals = [['× 2', '× 4', '× 8'], ['× 1/2', '× 1/4', '× 1/8']];
    gridT(70, 520, 220, 120, rows, cols, (i, j) => (t > (i ? 9.4 : 1.4) + j * 1.2 ? [vals[i][j], [ORI, BIG, THR][j]] : null), { hw: 280, rs: 28, cs: 42 });
    fade(A(t, 18.4, .5), () => { stepsDown(t, 18.4, 1.4, [[[['1) hallar ', 'r'], ['k', 'i', NOW], [' con dos longitudes', 'r']]], [[['2) elevar: ', 'r'], ['k', 'i', NOW], [' · ', 'r'], ['k', 'i', NOW], sp2(2, NOW), [' · ', 'r'], ['k', 'i', NOW], sp2(3, NOW)]]], 1000, 120, 44); });
  },
  // 9 · El vaso resuelto.
  resolver(t) {
    stars(t, .3);
    const cx = CX, cy = 600, r = 300, h = 560;
    glass(cx, cy, r, h, .5);
    fade(A(t, 1.2, .5), () => { cone(cx, cy + h / 2, r / 2, h / 2, NOW, { down: true, lw: 3, dash: [10, 8] }); mono('agua: otro cono', cx + 260, cy + h / 2 + 120, NOW, { s: 24 }); });
    fade(A(t, 10, .5), () => {
      segL([cx, cy], [cx + r, cy], BIG, 1, 3); mono('R', cx + r / 2, cy - 18, BIG, { s: 28 });
      segL([cx, cy + h / 2], [cx + r / 2, cy + h / 2], ORI, eo(seg(t, 10.4, 11.4)), 3); mono('R/2', cx + r / 4 + 10, cy + h / 2 - 16, ORI, { s: 26 });
      F([['k', 'i', NOW], [' = 1/2', 'r', NOW]], 240, cy + h / 2 + 10, 50);
    });
    fade(A(t, 20.2, .5), () => {
      F([['(1/2)', 'r'], sp2(3), [' = ', 'r'], ['1/8', 'r', RES]], CX, 1340, 64);
      mono('la parte ancha, arriba, es casi todo el vaso', CX, 1420, C.mute, { s: 24 });
    });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, [[['1/8', 'r']], [['1/2', 'r']], [['1/4', 'r']], [['1/3', 'r']]], 0, [['(1/2)', 'r'], sp2(3), [' = ', 'r'], ['1/8', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['longitud × ', 'r'], ['k', 'i']], 'semejanza'], [[['área × ', 'r'], ['k', 'i'], sp2(2)], 'dos medidas'], [[['volumen × ', 'r'], ['k', 'i'], sp2(3)], 'tres medidas'], [[['3/4 = h/28', 'r']], 'sombras a la misma hora']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [ORI, NOW, BIG]);
    });
  },
};
