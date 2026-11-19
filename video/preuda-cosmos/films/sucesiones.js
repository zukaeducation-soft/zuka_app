// «Sucesiones numéricas» · escenas de la lección pu-se-1. Motor en kit.js, preu.js y piezas.js; guion en sucesiones.data.js.
// Los términos en cian, las diferencias en ámbar, las segundas diferencias en violeta, el resultado en verde y lo que se hace
// ahora en lima.
const TERM = C.cyan, DIF = C.amber, DIF2 = C.violet, RES = C.green, NOW = C.lime;
// Fila de números centrada en cx (separación gap) que aparecen desde t0; devuelve x(i).
function nums(t, vals, cx, y, gap, col, t0 = 0, dt = .35, s = 54) { const x0 = cx - (vals.length - 1) * gap / 2; vals.forEach((v, i) => fade(A(t, t0 + i * dt, .35), () => bigT(String(v), x0 + i * gap, y, col, s))); return i => x0 + i * gap; }
// Diferencias entre términos (fila debajo, en los puntos medios) con sus «uves».
function diffs(t, vals, cx, y, gap, col, t0, s = 44) {
  const d = vals.slice(1).map((v, i) => v - vals[i]), x0 = cx - (vals.length - 1) * gap / 2;
  d.forEach((v, i) => fade(A(t, t0 + i * .4, .35), () => { const x = x0 + (i + .5) * gap; stroke(hexA(col, .6), 2, () => { X.moveTo(x - gap / 2 + 14, y - 74); X.lineTo(x, y - 40); X.lineTo(x + gap / 2 - 14, y - 74); }, { g: 4 }); bigT((v > 0 ? '+' : '') + v, x, y, col, s); }));
  return d;
}
const S = {
  // 1 · El reto: 5, 8, 13, 20, 29, …
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Los primeros términos de una sucesión son 5, 8, 13, 20, 29, …', 'Si se continúa con la misma regla de formación, el término', 'que ocupa la posición 12 es:'], opts: ['148', '144', '125', '173'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      nums(t, [5, 8, 13, 20, 29], CX - 120, 980, 140, TERM, 10);
      fade(A(t, 12, .4), () => { bigT('…', 820, 980, C.mute, 54); bigT('?', 920, 980, NOW, 64); mono('posición 12', 920, 1040, NOW, { s: 22 }); });
      [1, 2, 3, 4, 5].forEach(i => mono(String(i), CX - 120 + (i - 3) * 140, 1040, C.mute, { s: 20 }));
    });
  },
  // 2 · Las diferencias.
  diferencias(t) {
    stars(t, .3);
    nums(t, [5, 8, 13, 20, 29], CX, 600, 170, TERM, .8);
    diffs(t, [5, 8, 13, 20, 29], CX, 760, 170, DIF, 2.4);
    fade(A(t, 9.4, .5), () => mono('3, 5, 7, 9: no son iguales', CX, 880, DIF, { s: 28 }));
    fade(A(t, 18.2, .5), () => { nums(t, [4, 7, 10, 13], CX, 1040, 170, C.mute, 18.2, .2, 44); diffs(t, [4, 7, 10, 13], CX, 1180, 170, C.mute, 18.8, 36); mono('iguales: aritmética', CX, 1280, NOW, { s: 26 }); });
  },
  // 3 · Segundas diferencias.
  segundas(t) {
    stars(t, .3);
    nums(t, [5, 8, 13, 20, 29], CX, 560, 170, TERM, 0, 0);
    diffs(t, [5, 8, 13, 20, 29], CX, 720, 170, DIF, 0);
    fade(A(t, .8, .5), () => diffs(t, [3, 5, 7, 9], CX, 880, 170, DIF2, 1));
    fade(A(t, 9.2, .5), () => mono('siempre 2', CX, 990, DIF2, { s: 30 }));
    fade(A(t, 18.2, .5), () => F([['segunda diferencia constante  →  ', 'r'], ['n', 'i', NOW], ['2', 'sp', NOW]], CX, 1130, 46));
  },
  // 4 · Problema: la progresión aritmética.
  aritmetica(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una progresión aritmética, el tercer término es 11 y el', 'séptimo término es 27. El término que ocupa la posición', '20 es:'], opts: ['79', '83', '75', '80'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const px = nline(110, 980, 1000, 0, 21, { step: 1, lab: v => [3, 7, 20].includes(v), s: 24 });
      [[3, '11', TERM], [7, '27', TERM]].forEach(([n, v, c]) => { dot(px(n), 1000, 12, c); bigT(v, px(n), 940, c, 40); });
      fade(A(t, 10.4, .5), () => { for (let i = 0; i < 4; i++) hop(px(3 + i), px(4 + i), 990, 50, DIF, eo(seg(t, 10.6 + i * .5, 11.2 + i * .5)), 3); mono('4 saltos = 16 → cada uno vale 4', CX, 1110, DIF, { s: 24 }); });
      fade(A(t, 20.2, .5), () => { dot(px(20), 1000, 12, RES); F([['11 + 17 · 4 = ', 'r'], ['79', 'r', RES]], CX, 1220, 52); });
    });
  },
  // 5 · Comparar con los cuadrados.
  cuadrados(t) {
    stars(t, .3);
    nums(t, [5, 8, 13, 20, 29], CX, 560, 170, TERM, 0, 0);
    nums(t, [1, 4, 9, 16, 25], CX, 720, 170, DIF2, .8);
    fade(A(t, 1, .4), () => { mono('n²', 100, 712, DIF2, { s: 26 }); mono('término', 110, 552, TERM, { s: 22 }); });
    fade(A(t, 9.2, .5), () => { const x0 = CX - 2 * 170; for (let i = 0; i < 5; i++) mono('+4', x0 + i * 170, 640, NOW, { s: 26 }); });
    fade(A(t, 18.2, .5), () => F([['término ', 'r'], ['n', 'i', NOW], [' = ', 'r'], ['n', 'i', NOW], ['2', 'sp', NOW], [' + 4', 'r']], CX, 900, 60));
  },
  // 6 · Problema: dos reglas turnándose.
  alterna(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Los primeros términos de una sucesión son 3, 6, 5, 10, 9,', '18, 17, … Si se continúa con la misma regla de formación,', 'el término que ocupa la posición 10 es:'], opts: ['66', '65', '34', '33'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const vals = [3, 6, 5, 10, 9, 18, 17, 34, 33, 66], show = t < 20 ? 7 : 7 + Math.min(3, Math.floor(seg(t, 20.2, 23) * 3.999));
      vals.slice(0, show).forEach((v, i) => { const x = 110 + i * 96, y = 1000 + (i % 2 ? -50 : 50) * 0; bigT(String(v), x, 1000, i >= 7 ? RES : TERM, 40); mono(String(i + 1), x, 1050, C.mute, { s: 18 }); if (i) { mono(i % 2 ? '×2' : '−1', x - 48, 940, i % 2 ? DIF : DIF2, { s: 22 }); } });
      fade(A(t, 20.6, .5), () => mono('término 10: 66', CX, 1160, RES, { s: 30 }));
    });
  },
  // 7 · Las que se duplican.
  dobles(t) {
    stars(t, .3);
    nums(t, [1, 3, 7, 15, 31], CX, 560, 170, TERM, .8);
    diffs(t, [1, 3, 7, 15, 31], CX, 720, 170, DIF, 2);
    fade(A(t, 9.2, .5), () => { nums(t, ['2−1', '4−1', '8−1', '16−1', '32−1'], CX, 880, 170, DIF2, 9.4, .3, 40); });
    fade(A(t, 18.2, .5), () => { F([['término ', 'r'], ['n', 'i', NOW], [' = 2', 'r'], ['n', 'spi', NOW], [' − 1', 'r']], CX, 1040, 56); F([['10.º: 1 024 − 1 = ', 'r'], ['1 023', 'r', RES]], CX, 1130, 44); });
  },
  // 8 · Un método.
  metodo(t) {
    stars(t, .3);
    [['1', 'Diferencias iguales: aritmética', 1], ['2', 'Segundas diferencias o cocientes', 9.2], ['3', 'Sube y baja: dos reglas turnándose', 18.2]].forEach(([n, s, t0], i) => fade(A(t, t0, .6), () => {
      const y = 560 + i * 260; nodeC(170, y, 60, [DIF, DIF2, NOW][i], n, { s: 54 }); jT(s, 260, y + 14, C.ink, 38, { a: 'l', max: 760 });
      if (i) arrow(170, y - 190, 170, y - 70, hexA(NOW, .6), 1, 2.5, { h: 10 });
    }));
  },
  // 9 · La sucesión resuelta.
  resolver(t) {
    stars(t, .3);
    F([['término ', 'r'], ['n', 'i', NOW], [' = ', 'r'], ['n', 'i', NOW], ['2', 'sp', NOW], [' + 4', 'r']], CX, 520, 56);
    [[1, 5], [2, 8], [3, 13], [4, 20], [5, 29]].forEach(([n, v], i) => fade(A(t, 1 + i * .5, .3), () => { mono(`${n}² + 4 = ${v}`, CX, 620 + i * 50, TERM, { s: 26 }); check(CX + 190, 612 + i * 50, 10, true, A(t, 1.3 + i * .5, .4)); }));
    fade(A(t, 10.2, .5), () => F([['12', 'r'], ['2', 'sp'], [' + 4 = 144 + 4', 'r']], CX, 1000, 56));
    fade(A(t, 20.2, .5), () => F([['= ', 'r'], ['148', 'r', RES]], CX, 1100, 70));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['148', '144', '125', '173'], 0, [['12', 'r'], ['2', 'sp'], [' + 4 = ', 'r'], ['148', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['+d constante', 'r']], 'aritmética'], [[['2.ª diferencia fija', 'r']], 'cuadrados'], [[['2', 'r'], ['n', 'spi'], [' − 1', 'r']], 'se duplican'], [[['× 2, − 1', 'r']], 'reglas turnadas']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [TERM, NOW, DIF]);
    });
  },
};
