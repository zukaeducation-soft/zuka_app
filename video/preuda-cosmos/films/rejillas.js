// «Rejillas y caminos» · escenas de la lección pu-es-1. Motor en kit.js, preu.js y piezas.js; guion en rejillas.data.js.
// El robot y su camino en cian, los giros en ámbar, lo prohibido en rosa, lo pintado en violeta, el resultado en verde y lo que
// se hace ahora en lima.
const BOT = C.cyan, TURN = C.amber, BAD = C.mag, PAINT = C.violet, RES = C.green, NOW = C.lime;
const WH = 'rgba(225,232,255,.45)';
// Plano cuadriculado con origen O (px) y u px por unidad, de x0..x1 y y0..y1 unidades; devuelve P(x, y).
function plane(O, u, x0, x1, y0, y1) {
  stroke(WH, 1.5, () => { for (let x = x0; x <= x1; x++) { X.moveTo(O[0] + x * u, O[1] - y0 * u); X.lineTo(O[0] + x * u, O[1] - y1 * u); } for (let y = y0; y <= y1; y++) { X.moveTo(O[0] + x0 * u, O[1] - y * u); X.lineTo(O[0] + x1 * u, O[1] - y * u); } }, { g: 0 });
  stroke('rgba(225,232,255,.85)', 2.5, () => { X.moveTo(O[0] + x0 * u, O[1]); X.lineTo(O[0] + x1 * u, O[1]); X.moveTo(O[0], O[1] - y0 * u); X.lineTo(O[0], O[1] - y1 * u); }, { g: 4 });
  return (x, y) => [O[0] + x * u, O[1] - y * u];
}
// Estados del robot: [x, y, dirección 0 norte · 1 este · 2 sur · 3 oeste] tras cada orden.
function sim(seq) { let x = 0, y = 0, d = 0; const st = [[x, y, d]]; for (const c of seq) { if (c === 'A') { x += [0, 1, 0, -1][d]; y += [1, 0, -1, 0][d]; } else if (c === 'D') d = (d + 1) % 4; else if (c === 'I') d = (d + 3) % 4; st.push([x, y, d]); } return st; }
// Robot: triángulo que apunta en la dirección d (grados matemáticos: norte 90).
function robot(p, d, col = BOT, s = 26) { const a = 90 - d * 90; polyL([at(p, a, s), at(p, a + 140, s * .8), at(p, a - 140, s * .8)], col, { fill: .5, lw: 3 }); }
// Dibuja el camino del robot con la secuencia hasta k (0–1, por órdenes); devuelve el último estado.
function run(P, seq, k, col = BOT) {
  const st = sim(seq), n = seq.length, m = k * n; let last = st[0];
  stroke(col, 5, () => { X.moveTo(...P(0, 0)); for (let i = 1; i <= n; i++) { const kk = clamp(m - i + 1); if (kk <= 0) break; const a = st[i - 1], b = st[i]; X.lineTo(...mid(P(a[0], a[1]), P(b[0], b[1]), kk)); } }, { g: 14 });
  const i = Math.min(n, Math.floor(m + 1e-9)); last = st[i];
  const a = st[i], b = st[Math.min(n, i + 1)], kk = clamp(m - i), pos = mid(P(a[0], a[1]), P(b[0], b[1]), seq[i] === 'A' ? kk : 0);
  robot(pos, seq[i] === 'D' ? a[2] + kk : seq[i] === 'I' ? a[2] - kk : a[2], col);
  return last;
}
const S = {
  // 1 · El reto: el robot.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Un robot está en el punto (0, 0) de un plano cuadriculado,', 'mirando al norte. Con la orden A avanza una unidad hacia', 'donde mira; con D gira 90° a su derecha y con I gira 90° a', 'su izquierda, sin avanzar. Después de obedecer AADAIA,', 'el robot queda en el punto:'], opts: ['(1, 3)', '(3, 1)', '(1, 2)', '(−1, 3)'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      const P = plane([CX - 150, 1430], 120, -2, 3, 0, 4);
      robot(P(0, 0), 0); mono('(0, 0)', P(0, 0)[0] - 50, P(0, 0)[1] + 40, C.mute, { s: 22 });
      fade(A(t, 12, .5), () => { mono('N', P(0, 4)[0], P(0, 4)[1] - 14, NOW, { s: 26 }); });
      fade(A(t, 20.4, .5), () => [...'AADAIA'].forEach((c, i) => pill(720 + (i % 3) * 90, 1000 + Math.floor(i / 3) * 90, 70, 70, c === 'A' ? BOT : TURN, c, { s: 36, r: 12 })));
    });
  },
  // 2 · Coordenadas.
  plano(t) {
    stars(t, .3);
    const P = plane([300, 1150], 110, 0, 5, 0, 5);
    for (let i = 0; i <= 5; i++) { mono(String(i), P(i, 0)[0], 1190, C.mute, { s: 20 }); mono(String(i), 270, P(0, i)[1] + 8, C.mute, { s: 20, a: 'r' }); }
    fade(A(t, 9.2, .5), () => { stroke(BOT, 4, () => { X.moveTo(...P(0, 0)); X.lineTo(...P(2, 0)); }, { g: 12 }); stroke(TURN, 4, () => { X.moveTo(...P(2, 0)); X.lineTo(...P(2, 3)); }, { g: 12 }); ptL(P(2, 3), RES, '(2, 3)', 0, -26, { k: 'r', s: 32 }); });
    fade(A(t, 18.2, .5), () => ptL(P(3, 2), BAD, '(3, 2)', 50, 10, { k: 'r', s: 32 }));
  },
  // 3 · La derecha depende de hacia dónde mira.
  girar(t) {
    stars(t, .3);
    const O = [CX, 820];
    const d = t < 9.6 ? 0 : t < 19.6 ? 2 : Math.floor(seg(t, 20, 27) * 4.999) % 4;
    robot(O, d, BOT, 60);
    const right = (d + 1) % 4, ang = 90 - right * 90;
    arrow(...at(O, ang, 80), ...at(O, ang, 230), TURN, 1, 4, { h: 16 });
    mono('su derecha', ...at(O, ang, 280).map((v, i) => v + (i ? 10 : 0)), TURN, { s: 26 });
    mono(['mira al norte', 'mira al este', 'mira al sur', 'mira al oeste'][d], CX, 1150, BOT, { s: 30 });
    [['N', 90], ['E', 0], ['S', 270], ['O', 180]].forEach(([n, a]) => { const q = at(O, a, 330); mono(n, q[0], q[1] + 10, C.mute, { s: 26 }); });
  },
  // 4 · Seguir una secuencia con una tabla.
  seguir(t) {
    stars(t, .3);
    const seq = 'ADA', st = sim(seq), P = plane([240, 980], 110, 0, 2, 0, 2);
    run(P, seq, seg(t, 1, 8));
    const dir = ['norte', 'este', 'sur', 'oeste'];
    gridT(470, 560, 220, 70, ['inicio', ...seq.split('')], ['posición', 'mira al'], (i, j) => { const s = st[i]; if (t < 1 + i * 2.2) return null; return j ? [dir[s[2]], TURN, 'mono'] : [`(${s[0]}, ${s[1]})`, BOT]; }, { hw: 110, cs: 30, rs: 30 });
    fade(A(t, 18.2, .5), () => { mono('D, I: solo cambia la dirección', CX, 1120, TURN, { s: 26 }); mono('A: solo cambia la posición', CX, 1170, BOT, { s: 26 }); });
  },
  // 5 · Problema: volver al inicio.
  vuelve(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Con las mismas reglas, empezando en (0, 0) y mirando al', 'norte, la única secuencia con la que el robot termina en', 'el punto de partida es:'], opts: ['ADADADA', 'ADAIADA', 'AIAIADA', 'ADADAIA'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const P = plane([CX - 60, 1300], 120, -2, 2, -1, 2);
      run(P, 'ADADADA', seg(t, 10.4, 17), RES);
      fade(A(t, 20, .5), () => { ['ADAIADA', 'AIAIADA', 'ADADAIA'].forEach((s, i) => { const e = sim(s).at(-1); mono(`${s} → (${e[0]}, ${e[1]})`, CX, 1420 + i * 40, BAD, { s: 22 }); }); });
    });
  },
  // 6 · Problema: colorear sin vecinas.
  colorear(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una cuadrícula de 3 × 3 se quieren colorear algunas', 'casillas de modo que no haya dos casillas coloreadas que', 'compartan un lado. La mayor cantidad de casillas que se', 'pueden colorear es:'], opts: ['5', '4', '6', '3'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const u = 130, x0 = CX - 1.5 * u, y0 = 940, on = [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]];
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const lit = on.some(([a, b]) => a === i && b === j) && t > 10.6 + on.findIndex(([a, b]) => a === i && b === j) * .5; if (lit) { X.save(); X.fillStyle = hexA(PAINT, .5); X.fillRect(x0 + i * u + 4, y0 + j * u + 4, u - 8, u - 8); X.restore(); } stroke(WH, 2, () => X.rect(x0 + i * u, y0 + j * u, u, u), { g: 0 }); }
      fade(A(t, 20.4, .5), () => { X.save(); X.fillStyle = hexA(BAD, .5); X.fillRect(x0 + u + 4, y0 + 4, u - 8, u - 8); X.restore(); check(x0 + 1.5 * u, y0 + .5 * u, 22, false, A(t, 20.8, .5)); mono('una sexta toca a otra', CX, y0 + 3 * u + 50, BAD, { s: 24 }); });
    });
  },
  // 7 · El tablero de ajedrez.
  ajedrez(t) {
    stars(t, .3);
    const u = 150, x0 = CX - 1.5 * u, y0 = 560;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const dark = (i + j) % 2 === 0; X.save(); X.fillStyle = dark ? hexA(PAINT, .45 * A(t, 1, .6)) : 'rgba(225,232,255,.06)'; X.fillRect(x0 + i * u, y0 + j * u, u, u); X.restore(); stroke(WH, 2, () => X.rect(x0 + i * u, y0 + j * u, u, u), { g: 0 }); }
    fade(A(t, 2.6, .5), () => mono('5 oscuras · 4 claras', CX, y0 + 3 * u + 60, C.ink, { s: 28 }));
    fade(A(t, 9.2, .5), () => { const a = [x0 + .5 * u, y0 + .5 * u], b = [x0 + 1.5 * u, y0 + 1.5 * u]; segL(a, b, NOW, 1, 3, { dash: [8, 8] }); mono('solo se tocan por las puntas', CX, y0 + 3 * u + 110, NOW, { s: 24 }); });
    fade(A(t, 18.2, .5), () => mono('vecinas: siempre de distinto color', CX, y0 + 3 * u + 170, RES, { s: 26 }));
  },
  // 8 · Fichas de dominó en 2 × 4.
  domino(t) {
    stars(t, .3);
    const tilings = [['V', 'V', 'V', 'V'], ['V', 'V', 'H'], ['V', 'H', 'V'], ['H', 'V', 'V'], ['H', 'H']];
    const draw = (x, y, u, tl, col) => { let c = 0; for (const p of tl) { if (p === 'V') { stroke(col, 3, () => X.roundRect(x + c * u + 4, y + 4, u - 8, 2 * u - 8, 8), { g: 8 }); c += 1; } else { stroke(col, 3, () => X.roundRect(x + c * u + 4, y + 4, 2 * u - 8, u - 8, 8), { g: 8 }); stroke(col, 3, () => X.roundRect(x + c * u + 4, y + u + 4, 2 * u - 8, u - 8, 8), { g: 8 }); c += 2; } } stroke(WH, 1.5, () => X.rect(x, y, 4 * u, 2 * u), { g: 0 }); };
    tilings.forEach((tl, i) => fade(A(t, 1 + i * .8, .4), () => draw(110 + (i % 2) * 450, 520 + Math.floor(i / 2) * 200, 85, tl, [C.cyan, C.amber, C.violet, C.blue, C.green][i])));
    fade(A(t, 10, .5), () => mono('primera columna: una de pie (queda 2 × 3) o dos acostadas (queda 2 × 2)', CX, 1160, NOW, { s: 22, max: 960 }));
    fade(A(t, 20.2, .5), () => F([['1, 2, 3, ', 'r'], ['5', 'r', RES], ['   (2 + 3)', 'r', C.mute]], CX, 1280, 52));
  },
  // 9 · El robot resuelto.
  resolver(t) {
    stars(t, .3);
    const P = plane([CX - 150, 1300], 140, -2, 3, 0, 4), seq = 'AADAIA', k = t < 10 ? seg(t, 1, 6) * 2 / 6 : t < 20 ? 2 / 6 + seg(t, 10, 17) * 3 / 6 : 5 / 6 + seg(t, 20, 23) / 6;
    run(P, seq, k);
    [...seq].forEach((c, i) => { const on = k * 6 > i + .5; pill(240 + i * 120, 480, 90, 80, c === 'A' ? BOT : TURN, c, { s: 40, r: 12, fill: on ? .4 : .08 }); });
    const st = sim(seq); [[2, '(0, 2)'], [4, '(1, 2)'], [6, '(1, 3)']].forEach(([i, s], n) => { if (k * 6 >= i - .01) { const p = P(st[i][0], st[i][1]); mono(s, p[0] + 70, p[1] + 10, n === 2 ? RES : C.ink, { s: 26 }); } });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['(1, 3)', '(3, 1)', '(1, 2)', '(−1, 3)'], 0, '(0, 0) → (0, 2) → (1, 2) → (1, 3)', { fs: 36 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['(x, y)', 'r']], 'este y luego norte'], [[['derecha del robot', 'r']], 'girar con él'], [[['posición · dirección', 'r']], 'una tabla'], [[['tablero de ajedrez', 'r']], 'vecinas distintas']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [BOT, NOW, TURN]);
    });
  },
};
