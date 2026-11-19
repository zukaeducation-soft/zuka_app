// «Contar figuras y caminos» · escenas de la lección pu-co-5. Motor en kit.js, preu.js y piezas.js; guion en caminos.data.js.
// Los caminos en cian, lo que llega desde abajo en ámbar, lo prohibido en rosa, las figuras en violeta, el resultado en verde y
// lo que se hace ahora en lima.
const PATH = C.cyan, UPC = C.amber, BAD = C.mag, FIG = C.violet, RES = C.green, NOW = C.lime;
const WH = 'rgba(225,232,255,.7)';
// Calles: cuadrícula de nx × ny cuadras de u px, esquina de abajo a la izquierda en (x0, y0); devuelve P(i, j).
function streets(x0, y0, nx, ny, u) { stroke(WH, 2.5, () => { for (let i = 0; i <= nx; i++) { X.moveTo(x0 + i * u, y0); X.lineTo(x0 + i * u, y0 - ny * u); } for (let j = 0; j <= ny; j++) { X.moveTo(x0, y0 - j * u); X.lineTo(x0 + nx * u, y0 - j * u); } }, { g: 4 }); return (i, j) => [x0 + i * u, y0 - j * u]; }
// Caminos a cada cruce (con cruces cerrados en block).
function counts(nx, ny, block = []) { const v = []; for (let i = 0; i <= nx; i++) { v[i] = []; for (let j = 0; j <= ny; j++) { if (block.some(([a, b]) => a === i && b === j)) v[i][j] = 0; else v[i][j] = i === 0 && j === 0 ? 1 : (i ? v[i - 1][j] : 0) + (j ? v[i][j - 1] : 0); } } return v; }
// Números en los cruces, en orden de i + j, hasta k (0–1).
function sums(P, v, nx, ny, k, col = NOW) { for (let i = 0; i <= nx; i++) for (let j = 0; j <= ny; j++) { if ((i + j) / (nx + ny) > k + 1e-9) continue; const p = P(i, j); X.save(); X.fillStyle = 'rgba(8,12,30,.9)'; X.beginPath(); X.arc(p[0], p[1], 26, 0, 7); X.fill(); X.restore(); ring(p[0], p[1], 26, v[i][j] ? col : BAD, 2); T(String(v[i][j]), p[0], p[1] + 10, { k: 'r', s: 28, a: 'c', c: v[i][j] ? C.ink : BAD }); } }
// Un camino: lista de pasos 'D' / 'N' desde (0, 0).
function walk(P, s, col, k = 1) { let i = 0, j = 0; const pts = [P(0, 0)]; for (const c of s) { if (c === 'D') i++; else j++; pts.push(P(i, j)); } const n = pts.length - 1, m = k * n; stroke(col, 6, () => { X.moveTo(...pts[0]); for (let q = 1; q <= n; q++) { const kk = clamp(m - q + 1); if (kk <= 0) break; X.lineTo(...mid(pts[q - 1], pts[q], kk)); } }, { g: 14 }); }
const S = {
  // 1 · El reto: el mensajero.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Un mensajero va del punto P al punto Q de una cuadrícula', 'de 3 × 3 cuadras, siempre hacia la derecha o hacia arriba,', 'pero no puede pasar por el cruce R (una cuadra a la derecha', 'y una hacia arriba de P). La cantidad de caminos es:'], opts: ['8', '12', '20', '14'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      const P = streets(330, 1440, 3, 3, 140);
      ptL(P(0, 0), C.ink, 'P', -30, 40); ptL(P(3, 3), C.ink, 'Q', 30, -16);
      fade(A(t, 10.4, .5), () => walk(P, 'DNDNDN'.split(''), PATH, seg(t, 10.6, 13)));
      fade(A(t, 13, .5), () => { const r = P(1, 1); dot(r[0], r[1], 16, BAD, 20); check(r[0], r[1], 22, false, 1); mono('R', r[0] + 36, r[1] + 40, BAD, { s: 30 }); });
    });
  },
  // 2 · Sumar en cada cruce.
  sumar(t) {
    stars(t, .3);
    const P = streets(260, 1100, 3, 2, 180), v = counts(3, 2);
    ptL(P(0, 0), C.ink, 'P', -40, 40); ptL(P(3, 2), C.ink, 'Q', 40, -20);
    fade(win(t, .8, 9.6), () => { const p = P(2, 1); arrow(P(1, 1)[0] + 30, p[1], p[0] - 30, p[1], PATH, 1, 4, { h: 12 }); arrow(p[0], P(2, 0)[1] - 30, p[0], p[1] + 30, UPC, 1, 4, { h: 12 }); });
    sums(P, v, 3, 2, t < 10 ? -1 : seg(t, 10.2, 19));
    fade(A(t, 20.2, .5), () => { const q = P(3, 2); ring(q[0], q[1], 40, RES, 4); F([['3 × 2: ', 'r'], ['10', 'r', RES], [' caminos', 'r']], CX, 1300, 52); });
  },
  // 3 · Caminos como palabras.
  palabras(t) {
    stars(t, .3);
    const P = streets(300, 980, 3, 2, 160), words = ['DDDNN', 'DNDND', 'NNDDD', 'DDNDN'], w = words[Math.min(3, Math.floor(t / 4.5))];
    walk(P, w.split(''), PATH, ((t % 4.5) / 3.5));
    [...w].forEach((c, i) => pill(300 + i * 110, 1140, 90, 90, c === 'D' ? PATH : UPC, c, { s: 44, r: 14, fill: .25 }));
    fade(A(t, 9.2, .5), () => mono('escoger los 2 lugares de las N entre 5', CX, 1270, UPC, { s: 26 }));
    fade(A(t, 18.2, .5), () => F([['C(5, 2) = 5 · 4 ÷ 2 = ', 'r'], ['10', 'r', RES]], CX, 1380, 52));
  },
  // 4 · Problema: los cuadrados de una cuadrícula de 3 × 3.
  cuadrados(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La cantidad total de cuadrados, de cualquier tamaño, que', 'se pueden contar en una cuadrícula de 3 × 3 es:'], opts: ['14', '9', '10', '13'], ok: 0, rv: 22.6 });
    const u = 150, x0 = CX - 1.5 * u, y0 = 780;
    stroke(WH, 2.5, () => { for (let i = 0; i <= 3; i++) { X.moveTo(x0 + i * u, y0); X.lineTo(x0 + i * u, y0 + 3 * u); X.moveTo(x0, y0 + i * u); X.lineTo(x0 + 3 * u, y0 + i * u); } }, { g: 4 });
    const show = (s, list, col, t0, dt) => list.forEach(([i, j], n) => fade(win(t, t0 + n * dt, t0 + n * dt + dt + .2, .15), () => stroke(col, 6, () => X.rect(x0 + i * u + 6, y0 + j * u + 6, s * u - 12, s * u - 12), { g: 18 })));
    if (t > 10 && t < 13.6) show(1, Array.from({ length: 9 }, (_, n) => [n % 3, Math.floor(n / 3)]), PATH, 10, .4);
    if (t > 13.6 && t < 17.4) show(2, [[0, 0], [1, 0], [0, 1], [1, 1]], UPC, 13.6, .9);
    if (t > 17.4 && t < 19.6) show(3, [[0, 0]], FIG, 17.4, 2);
    fade(A(t, 12, .4), () => mono('9 de lado 1', 200, 1310, PATH, { s: 24 })); fade(A(t, 15, .4), () => mono('4 de lado 2', CX, 1310, UPC, { s: 24 })); fade(A(t, 18, .4), () => mono('1 de lado 3', 880, 1310, FIG, { s: 24 }));
    fade(A(t, 20.4, .5), () => F([['9 + 4 + 1 = ', 'r'], ['14', 'r', RES]], CX, 1420, 56));
  },
  // 5 · Los rectángulos: escoger bordes.
  rectangulos(t) {
    stars(t, .3);
    const u = 170, x0 = CX - 1.5 * u, y0 = 560;
    stroke(WH, 2.5, () => { for (let i = 0; i <= 3; i++) { X.moveTo(x0 + i * u, y0); X.lineTo(x0 + i * u, y0 + 2 * u); } for (let j = 0; j <= 2; j++) { X.moveTo(x0, y0 + j * u); X.lineTo(x0 + 3 * u, y0 + j * u); } }, { g: 4 });
    const rs = [[0, 0, 2, 1], [1, 0, 3, 2], [0, 1, 1, 2], [0, 0, 3, 2]], r = rs[Math.floor(t / 3) % 4];
    fade(A(t, 1, .4), () => X.save() || (X.fillStyle = hexA(FIG, .25), X.fillRect(x0 + r[0] * u, y0 + r[1] * u, (r[2] - r[0]) * u, (r[3] - r[1]) * u), X.restore()));
    fade(A(t, 9.2, .5), () => { stroke(UPC, 5, () => { X.moveTo(x0 - 30, y0 + r[1] * u); X.lineTo(x0 + 3 * u + 30, y0 + r[1] * u); X.moveTo(x0 - 30, y0 + r[3] * u); X.lineTo(x0 + 3 * u + 30, y0 + r[3] * u); }, { g: 14 }); stroke(PATH, 5, () => { X.moveTo(x0 + r[0] * u, y0 - 30); X.lineTo(x0 + r[0] * u, y0 + 2 * u + 30); X.moveTo(x0 + r[2] * u, y0 - 30); X.lineTo(x0 + r[2] * u, y0 + 2 * u + 30); }, { g: 14 }); mono('3 horizontales · 4 verticales', CX, 1010, C.ink, { s: 26 }); });
    fade(A(t, 18.2, .5), () => F([['C(3, 2) · C(4, 2) = 3 · 6 = ', 'r'], ['18', 'r', RES]], CX, 1130, 50));
  },
  // 6 · Triángulos desde un vértice.
  triangulos(t) {
    stars(t, .3);
    const T0 = [440, 520], base = [[160, 1000], [380, 1000], [600, 1000], [800, 1000], [940, 1000]];
    polyL([base[0], base[4], T0], WH, { lw: 3 }); base.slice(1, 4).forEach(b => segL(T0, b, WH, 1, 2.5, { g: 0 }));
    fade(A(t, 1.4, .5), () => base.forEach((b, i) => { const q = mid(T0, b, .2); mono(String(i + 1), q[0] + (i - 2) * 12, q[1] + 10, NOW, { s: 24 }); }));
    const pairs = []; for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) pairs.push([a, b]);
    const k = Math.min(10, Math.floor(seg(t, 9.4, 17.4) * 10 + 1e-9));
    if (k > 0) { const [a, b] = pairs[k - 1]; polyL([T0, base[a], base[b]], FIG, { fill: .3, lw: 3 }); mono(`líneas ${a + 1} y ${b + 1}`, CX, 1080, FIG, { s: 26 }); mono(`${k} / 10`, 940, 600, FIG, { s: 26 }); }
    fade(A(t, 18.2, .5), () => F([['C(5, 2) = ', 'r'], ['10', 'r', RES], [' triángulos', 'r']], CX, 1200, 52));
  },
  // 7 · La escalera de 1 o 2 peldaños.
  escalera(t) {
    stars(t, .3);
    const x0 = 160, y0 = 1080, w = 120, h = 80;
    stroke(WH, 3, () => { X.moveTo(x0, y0); for (let i = 0; i < 5; i++) { X.lineTo(x0 + i * w, y0 - (i + 1) * h); X.lineTo(x0 + (i + 1) * w, y0 - (i + 1) * h); } }, { g: 6 });
    const ways = [1, 2, 3, 5, 8];
    ways.forEach((v, i) => fade(A(t, i < 2 ? 1 + i : 10 + (i - 2) * 2, .5), () => { const x = x0 + (i + .5) * w, y = y0 - (i + 1) * h - 30; nodeC(x, y, 26, i === 4 ? RES : NOW, v, { s: 28 }); }));
    fade(A(t, 10, .5), () => { const p5 = [x0 + 4.5 * w, y0 - 5 * h - 30]; arrow(x0 + 3.5 * w, y0 - 4 * h - 60, p5[0] - 20, p5[1] - 30, PATH, 1, 3, { h: 12 }); arrow(x0 + 2.5 * w, y0 - 3 * h - 60, p5[0] - 30, p5[1] - 20, UPC, 1, 3, { h: 12 }); });
    fade(A(t, 20.2, .5), () => F([['1, 2, 3, 5, ', 'r'], ['8', 'r', RES], ['  (3 + 5 = 8)', 'r', C.mute]], CX, 1240, 52));
  },
  // 8 · Pasar por un punto.
  porpunto(t) {
    stars(t, .3);
    const P = streets(330, 1180, 3, 3, 140), r = P(1, 1);
    ptL(P(0, 0), C.ink, 'P', -30, 40); ptL(P(3, 3), C.ink, 'Q', 30, -16); dot(r[0], r[1], 14, UPC, 18); mono('R', r[0] + 36, r[1] + 40, UPC, { s: 28 });
    fade(A(t, 1, .5), () => { walk(P, ['D', 'N'], PATH, seg(t, 1, 2.5)); });
    fade(A(t, 3, .5), () => { const off = (i, j) => [r[0] + i * 140, r[1] - j * 140]; stroke(UPC, 6, () => { X.moveTo(...r); X.lineTo(...off(1, 0)); X.lineTo(...off(1, 1)); X.lineTo(...off(2, 1)); X.lineTo(...off(2, 2)); }, { g: 14 }); });
    fade(A(t, 9.2, .5), () => F([['(P → R) · (R → Q)', 'r']], CX, 1290, 48));
    fade(A(t, 18.2, .5), () => F([['evitan R = todos − ', 'r'], ['pasan por R', 'r', BAD]], CX, 1380, 46));
  },
  // 9 · El mensajero resuelto.
  resolver(t) {
    stars(t, .3);
    const P = streets(330, 1180, 3, 3, 140);
    ptL(P(0, 0), C.ink, 'P', -30, 40); ptL(P(3, 3), C.ink, 'Q', 30, -16);
    F([['todos: C(6, 3) = ', 'r'], ['20', 'r', PATH]], CX, 480, 46);
    fade(A(t, 10.2, .5), () => F([['por R: 2 · 6 = ', 'r'], ['12', 'r', BAD]], CX, 560, 46));
    fade(A(t, 20.2, .5), () => { sums(P, counts(3, 3, [[1, 1]]), 3, 3, seg(t, 20.4, 25)); F([['20 − 12 = ', 'r'], ['8', 'r', RES]], CX, 640, 52); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['8', '12', '20', '14'], 0, [['C(6, 3) − 2 · 6 = 20 − 12 = ', 'r'], ['8', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['izquierda + abajo', 'r']], 'caminos por cruce'], [[['C(5, 2)', 'r']], 'caminos como palabras'], [[['9 + 4 + 1', 'r']], 'cuadrados por tamaño'], [[['C(3,2) · C(4,2)', 'r']], 'rectángulos por bordes']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [PATH, NOW, UPC]);
    });
  },
};
