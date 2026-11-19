// «Fracciones de lo que queda» · escenas de la lección pu-ar-1. Motor en kit.js, preu.js y piezas.js; guion en queda.data.js.
// Lo gastado en ámbar o violeta, lo que queda en cian, lo que se mira ahora en lima y el resultado en verde.
const G1 = C.amber, G2 = C.violet, LEFT = C.cyan, NOW = C.lime, RES = C.green, BAD = C.mag;
// Barra de n cuadros: col(i) da el color de cada cuadro (o null, vacío).
function cells(cx, y, n, col, s = 70, o = {}) {
  const x0 = cx - n * s / 2;
  for (let i = 0; i < n; i++) { const c = col(i); if (c) pill(x0 + i * s + s / 2, y, s - 8, o.h || s - 8, c, null, { r: 8, fill: .35 }); else stroke('rgba(160,180,240,.4)', 2, () => X.roundRect(x0 + i * s + 4, y - (o.h || s - 8) / 2, s - 8, o.h || s - 8, 8), { g: 0, dash: [6, 5] }); }
  return i => x0 + i * s + s / 2;
}
// Barra continua por tramos: segs = [[fracción, color, rótulo]].
function strip(x, y, w, h, segs, k = 1) {
  let a = 0;
  segs.forEach(([f, c, lab], i) => { const kk = clamp(k * segs.length - i); if (kk <= 0) { a += f; return; } fade(kk, () => { pill(x + (a + f / 2) * w, y, f * w - 6, h, c, null, { r: 10, fill: .3 }); if (lab) T(lab, x + (a + f / 2) * w, y + 12, { k: 'r', s: 30, a: 'c', c: C.ink, max: f * w - 10 }); }); a += f; });
}
const S = {
  // 1 · El reto: el testamento.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En su testamento, un señor dejó la mitad de sus ahorros a su', 'esposa, la tercera parte de lo restante a su hijo mayor y lo que', 'quedaba, en partes iguales, a sus dos hijas. Si cada hija', 'recibió 6 millones de pesos, el total, en millones, era:'], opts: ['36', '24', '18', '72'], ok: 0 });
    fade(A(t, 9.6, .6), () => strip(90, 1100, 900, 110, [[1 / 2, G1, 'esposa'], [1 / 6, G2, 'hijo'], [1 / 6, LEFT, 'hija'], [1 / 6, LEFT, 'hija']], seg(t, 10, 14)));
    fade(A(t, 14.6, .5), () => { mono('1/2', 90 + 225, 1220, G1, { s: 24 }); mono('1/3 de lo restante', 90 + 450 + 75, 1220, G2, { s: 22 }); mono('6 millones cada una', 90 + 750, 1265, LEFT, { s: 22 }); });
  },
  // 2 · Fracción de qué.
  deque(t) {
    stars(t, .3);
    cells(CX, 640, 12, i => (i < 4 ? (t > 2 ? G1 : LEFT) : i < 8 && t > 10.4 ? G2 : LEFT));
    fade(A(t, 2, .5), () => mono('1/3 de 12 = 4', 280, 760, G1, { s: 26 }));
    fade(A(t, 9.2, .5), () => { mono('1/2 de lo que queda (8) = 4', 700, 760, G2, { s: 26 }); brc(CX - 140, CX + 420, 580, LEFT, A(t, 9.4, .6), -1); });
    fade(A(t, 12, .5), () => { mono('1/2 de 12 = 6', CX, 900, BAD, { s: 26 }); check(CX + 140, 892, 14, false, A(t, 12.4, .5)); });
    fade(A(t, 18.2, .5), () => { pill(330, 1060, 380, 90, G1, 'del total', { s: 34 }); pill(750, 1060, 380, 90, G2, 'de lo que queda', { s: 34 }); });
  },
  // 3 · Lo que queda se multiplica.
  multiplicar(t) {
    stars(t, .3);
    strip(140, 620, 800, 100, [[1 / 3, G1, 'gasta 1/3'], [2 / 3, LEFT, 'queda 2/3']]);
    fade(A(t, 9.2, .5), () => strip(140 + 800 / 3, 780, 800 * 2 / 3, 100, [[1 / 2, G2, 'gasta 1/2'], [1 / 2, LEFT, 'queda 1/2']]));
    fade(A(t, 11, .5), () => { FR(2, 3, 380, 950, 50, LEFT); F([['·', 'r']], 460, 966, 50); FR(1, 2, 530, 950, 50, LEFT); F([['=', 'r']], 610, 966, 50); FR(1, 3, 690, 950, 50, RES); });
    fade(A(t, 18.2, .5), () => { cells(CX, 1130, 12, i => (i >= 8 ? RES : null), 60); mono('4 de 12 = 1/3', CX, 1230, RES, { s: 26 }); });
  },
  // 4 · Problema: la pieza de tela.
  tela(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un comerciante vendió las dos quintas partes de una pieza de', 'tela y después la tercera parte de lo que le quedaba. Si al final', 'le sobraron 24 metros, la longitud inicial, en metros, era:'], opts: ['60', '40', '72', '90'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      cells(CX, 1000, 15, i => (i < 6 ? G1 : i < 9 ? (t > 10.6 ? G2 : C.mute) : t > 12 ? LEFT : C.mute), 60);
      fade(A(t, 12, .5), () => { F([['3/5 · 2/3 = ', 'r'], ['2/5', 'r', LEFT]], CX, 1130, 46); });
      fade(A(t, 20.4, .5), () => { F([['2/5 = 24  →  1/5 = 12  →  ', 'r'], ['60 m', 'r', RES]], CX, 1240, 46); });
    });
  },
  // 5 · Hacia atrás: Julián.
  atras(t) {
    stars(t, .3);
    strip(140, 600, 800, 100, [[1 / 3, G1, 'libro'], [1 / 6, G2, 'almuerzo'], [1 / 2, LEFT, 'le queda']], seg(t, .8, 3));
    fade(A(t, 9.2, .5), () => { FR(2, 3, 380, 780, 50, LEFT); F([['·', 'r']], 460, 796, 50); FR(3, 4, 530, 780, 50, LEFT); F([['=', 'r']], 610, 796, 50); FR(1, 2, 690, 780, 50, NOW); mono('= 30 000', 850, 796, NOW, { s: 30 }); });
    fade(A(t, 18.2, .5), () => { F([['30 000 ÷ ', 'r'], ['1/2', 'r', NOW], [' = ', 'r'], ['60 000', 'r', RES]], CX, 960, 52); mono('hacia atrás: se divide entre lo que queda', CX, 1050, C.mute, { s: 24 }); });
  },
  // 6 · Problema: la biblioteca.
  biblioteca(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una biblioteca, el 25 % de los libros está en inglés y el resto', 'en español. De los libros en español, el 30 % son novelas. Si hay', '420 libros en español que no son novelas, los de inglés son:'], opts: ['200', '180', '600', '140'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      strip(90, 1000, 900, 100, [[.25, G1, 'inglés'], [.75, LEFT, 'español']]);
      strip(90 + 225, 1140, 675, 100, [[.3, G2, 'novelas'], [.7, NOW, '420']]);
      fade(A(t, 10.6, .5), () => F([['420 ÷ 0.7 = ', 'r'], ['600', 'r', LEFT], [' en español', 'r']], CX, 1290, 42));
      fade(A(t, 20.4, .5), () => F([['600 ÷ 0.75 = 800  →  inglés: ', 'r'], ['200', 'r', RES]], CX, 1380, 42));
    });
  },
  // 7 · El error de restar.
  error(t) {
    stars(t, .3);
    F([['1 − 1/3 − 1/4 = ', 'r'], ['5/12', 'r', BAD], ['   ✗', 'r', BAD]], CX, 580, 54);
    fade(A(t, 9.2, .5), () => { F([['2/3 · 3/4 = ', 'r'], ['1/2', 'r', RES], ['   ✓', 'r', RES]], CX, 700, 54); strip(140, 860, 800, 90, [[1 / 3, G1, '1/3'], [1 / 6, G2, '1/4 de 2/3'], [1 / 2, LEFT, '1/2']]); fade(A(t, 10, .5), () => strip(140, 990, 800, 90, [[1 / 3, G1, '1/3'], [1 / 4, BAD, '1/4 del total'], [5 / 12, C.mute, '5/12']])); });
    fade(A(t, 18.2, .5), () => mono('restar solo con el mismo total; si no, multiplicar lo que queda', CX, 1130, NOW, { s: 24 }));
  },
  // 8 · Comprobar hacia adelante.
  comprobar(t) {
    stars(t, .3);
    [[[['60 m', 'r', LEFT]], 'la pieza', .8], [[['60 − 24 = ', 'r'], ['36', 'r', LEFT]], 'vende 2/5 de 60 = 24', 3], [[['36 − 12 = ', 'r'], ['24', 'r', LEFT]], 'vende 1/3 de 36 = 12', 9.2], [[['24 m  ✓', 'r', RES]], 'lo que decía el enunciado', 18.2]].forEach(([f, lab, t0], i) => fade(A(t, t0, .5), () => { const y = 560 + i * 170; F(f, CX, y, 60); mono(lab, CX, y + 56, C.mute, { s: 24 }); }));
  },
  // 9 · El testamento resuelto.
  resolver(t) {
    stars(t, .3);
    strip(90, 600, 900, 110, [[1 / 2, G1, 'esposa 1/2'], [1 / 6, G2, 'hijo 1/6'], [1 / 6, LEFT, t > 10 ? '6 M' : '?'], [1 / 6, LEFT, t > 10 ? '6 M' : '?']]);
    fade(A(t, 1, .5), () => F([['1/3 de 1/2 = ', 'r'], ['1/6', 'r', G2], ['   queda ', 'r'], ['1/3', 'r', LEFT]], CX, 790, 46));
    fade(A(t, 10.2, .5), () => F([['cada hija: 1/2 de 1/3 = ', 'r'], ['1/6', 'r', NOW], [' = 6 millones', 'r']], CX, 900, 44));
    fade(A(t, 20.2, .5), () => { F([['6 · 6 = ', 'r'], ['36 millones', 'r', RES]], CX, 1030, 56); mono('18 + 6 + 6 + 6 = 36', CX, 1120, C.mute, { s: 26 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['36', '24', '18', '72'], 0, [['1/6 del total = 6  →  ', 'r'], ['36', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['¿de qué total?', 'r']], 'cada fracción'], [[['2/3 · 3/4', 'r']], 'lo que queda se multiplica'], [[['÷ lo que queda', 'r']], 'hacia atrás'], [[['paso a paso', 'r']], 'comprobar adelante']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [LEFT, G1, G2]);
    });
  },
};
