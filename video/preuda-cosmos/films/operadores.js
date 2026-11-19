// «Operaciones nuevas» · escenas de la lección pu-op-1. Motor en kit.js, preu.js y piezas.js; guion en operadores.data.js.
// Lo que entra por a en cian, lo que entra por b en ámbar, la regla en violeta, lo que se mira ahora en lima y el resultado en verde.
const A_ = C.cyan, B_ = C.amber, RULE = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Máquina: dos entradas (a, b), la regla en la caja y la salida.
function machine(y, a, b, rule, out, t, t0) {
  pill(250, y - 70, 120, 90, A_, a, { s: 44, r: 16 }); pill(250, y + 70, 120, 90, B_, b, { s: 44, r: 16 });
  arrow(320, y - 70, 400, y - 20, A_, 1, 3, { h: 10 }); arrow(320, y + 70, 400, y + 20, B_, 1, 3, { h: 10 });
  X.save(); X.fillStyle = hexA(RULE, .12); X.beginPath(); X.roundRect(410, y - 90, 300, 180, 22); X.fill(); X.restore(); stroke(RULE, 3, () => X.roundRect(410, y - 90, 300, 180, 22), { g: 14 });
  F(rule, 560, y + 16, 40);
  fade(A(t, t0, .5), () => { arrow(720, y, 800, y, RES, 1, 3, { h: 12 }); pill(880, y, 140, 100, RES, out, { s: 48, r: 18 }); });
}
const TAB = [['b', 'c', 'a'], ['c', 'a', 'b'], ['a', 'b', 'c']];
const S = {
  // 1 · El reto: una resta de potencias.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: [[['Para enteros positivos a y b se define a # b = a', 'j'], ['b', 'spi'], [' − b', 'j'], ['a', 'spi'], ['.', 'j']], 'Por ejemplo, 2 # 3 = 8 − 9 = −1. El valor de 3 # 2 más el', 'valor de 4 # 2 es:'], opts: ['1', '0', '2', '−1'], ok: 0 });
    fade(A(t, 9.6, .6), () => F([['a', 'i', A_], [' # ', 'r', RULE], ['b', 'i', B_], [' = ', 'r'], ['a', 'i', A_], ['b', 'spi', B_], [' − ', 'r'], ['b', 'i', B_], ['a', 'spi', A_]], CX, 1000, 70));
    fade(A(t, 10.4, .5), () => F([['2 # 3 = 2', 'r'], ['3', 'sp'], [' − 3', 'r'], ['2', 'sp'], [' = 8 − 9 = −1', 'r']], CX, 1120, 48));
    fade(A(t, 20.2, .5), () => F([['3 # 2 + 4 # 2 = ', 'r'], ['?', 'r', NOW]], CX, 1240, 52));
  },
  // 2 · La regla es una máquina.
  maquina(t) {
    stars(t, .3);
    F([['a', 'i', A_], [' ∗ ', 'r', RULE], ['b', 'i', B_], [' = ', 'r'], ['a', 'i', A_], [' · ', 'r'], ['b', 'i', B_], [' + ', 'r'], ['a', 'i', A_]], CX, 560, 64);
    fade(A(t, 9.2, .5), () => machine(860, '4', '3', [['4 · 3 + 4', 'r']], '16', t, 18.2));
    fade(A(t, 18.4, .5), () => mono('el 1.º por a, el 2.º por b', CX, 1060, C.mute, { s: 24 }));
  },
  // 3 · Paréntesis al reemplazar.
  parentesis(t) {
    stars(t, .3);
    F([['(−2)', 'r', A_], [' ∗ ', 'r', RULE], ['3', 'r', B_], [' = ', 'r'], ['(−2)', 'r', A_], [' · ', 'r'], ['3', 'r', B_], [' + ', 'r'], ['(−2)', 'r', A_]], CX, 580, 56);
    fade(A(t, 9.2, .5), () => { F([['= −6 − 2 = ', 'r'], ['−8', 'r', RES]], CX, 690, 56); mono('sin paréntesis: −2 · 3 + −2  (confuso)', CX, 770, BAD, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { F([['a = −3:   ', 'r', C.mute], ['(−3)', 'r', A_], ['2', 'sp'], [' = ', 'r'], ['9', 'r', RES]], CX, 940, 56); F([['−3', 'r', BAD], ['2', 'sp', BAD], [' = −9', 'r', BAD], ['   ✗', 'r', BAD]], CX, 1050, 48); });
  },
  // 4 · El orden importa.
  orden(t) {
    stars(t, .3);
    machine(640, '4', '3', [['4 · 3 + 4', 'r']], '16', t, 0);
    fade(A(t, 1.4, .5), () => machine(960, '3', '4', [['3 · 4 + 3', 'r']], '15', t, 1.6));
    fade(A(t, 9.2, .5), () => F([['4 ∗ 3 ≠ 3 ∗ 4', 'r', BAD]], CX, 1180, 52));
    fade(A(t, 18.2, .5), () => { F([['a', 'i', A_], [' + ', 'r'], ['b', 'i', B_], ['  =  ', 'r'], ['b', 'i', B_], [' + ', 'r'], ['a', 'i', A_]], CX, 1300, 46); mono('regla simétrica: el orden no importa', CX, 1370, RES, { s: 24 }); });
  },
  // 5 · Problema: la operación en tabla.
  tabla(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En el conjunto {a, b, c} se define la operación ∘ con la tabla:', 'x ∘ y está en la fila de x y la columna de y. El resultado de', '(a ∘ b) ∘ (b ∘ b) es:'], opts: ['a', 'b', 'c', 'No está definido'], ok: 0, rv: 22.6 });
    fade(A(t, 2.6, .5), () => {
      const hit = (i, j) => (t > 10.2 && i === 0 && j === 1) || (t > 12 && i === 1 && j === 1) || (t > 20.4 && i === 2 && j === 0);
      gridT(220, 920, 150, 100, ['a', 'b', 'c'], ['a', 'b', 'c'], (i, j) => [TAB[i][j], hit(i, j) ? NOW : C.ink, 'i'], { hw: 120, hh: 70, cs: 44, rs: 40, rk: 'i', hk: 'i', hs: 36, hc: B_, rc: A_ });
      fade(A(t, 10.4, .5), () => F([['a ∘ b = ', 'r'], ['c', 'i', NOW], ['    b ∘ b = ', 'r'], ['a', 'i', NOW]], CX, 1380, 44));
      fade(A(t, 20.4, .5), () => F([['c ∘ a = ', 'r'], ['a', 'i', RES]], CX, 1470, 52));
    });
  },
  // 6 · Una regla por casos.
  casos(t) {
    stars(t, .3);
    F([['a', 'i', A_], [' ⋄ ', 'r', RULE], ['b', 'i', B_], [' = mayor − menor', 'r']], CX, 560, 56);
    fade(A(t, 2, .5), () => { pill(330, 690, 360, 84, RULE, 'si a > b: a − b', { s: 32 }); pill(750, 690, 360, 84, RULE, 'si no: b − a', { s: 32 }); });
    fade(A(t, 9.2, .5), () => { const px = nline(170, 910, 900, 0, 8, { s: 28 }); dot(px(2), 900, 13, B_, 14); dot(px(7), 900, 13, A_, 14); brc(px(2), px(7), 860, NOW, A(t, 9.6, .6), -1); mono('5', (px(2) + px(7)) / 2, 815, NOW, { s: 30 }); F([['7 ⋄ 2 = 7 − 2 = 5     2 ⋄ 7 = 7 − 2 = 5', 'r']], CX, 1030, 40); });
    fade(A(t, 18.2, .5), () => mono('1.º el caso, 2.º la fórmula', CX, 1140, NOW, { s: 28 }));
  },
  // 7 · Problema: la parte entera.
  piso(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Para un número real x se define ⌊x⌋ como el mayor entero', 'que es menor o igual que x. Por ejemplo, ⌊2.7⌋ = 2. El valor', 'de ⌊7/2⌋ + ⌊−7/2⌋ es:'], opts: ['−1', '0', '1', '−7'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const px = nline(120, 960, 1080, -5, 5, { s: 28 });
      fade(A(t, 10.2, .5), () => { dot(px(3.5), 1080, 13, A_, 14); mono('3.5', px(3.5), 990, A_, { s: 24 }); arrow(px(3.5), 1040, px(3) + 6, 1040, NOW, 1, 3, { h: 10 }); mono('piso: 3', px(3), 1210, NOW, { s: 26 }); });
      fade(A(t, 12.4, .5), () => { dot(px(-3.5), 1080, 13, B_, 14); mono('−3.5', px(-3.5), 990, B_, { s: 24 }); arrow(px(-3.5), 1040, px(-4) + 6, 1040, BAD, 1, 3, { h: 10 }); mono('piso: −4', px(-4), 1210, BAD, { s: 26 }); });
      fade(A(t, 20.4, .5), () => F([['3 + (−4) = ', 'r'], ['−1', 'r', RES]], CX, 1300, 52));
    });
  },
  // 8 · El neutro.
  neutro(t) {
    stars(t, .3);
    F([['a', 'i', A_], [' ▲ ', 'r', RULE], ['b', 'i', B_], [' = ', 'r'], ['a', 'i', A_], [' + ', 'r'], ['b', 'i', B_], [' + 5', 'r']], CX, 560, 60);
    fade(A(t, 9.2, .5), () => { F([['a', 'i', A_], [' ▲ ', 'r', RULE], ['e', 'i', NOW], [' = ', 'r'], ['a', 'i', A_]], CX, 720, 56); F([['a', 'i', A_], [' + ', 'r'], ['e', 'i', NOW], [' + 5 = ', 'r'], ['a', 'i', A_]], CX, 820, 56); });
    fade(A(t, 18.2, .5), () => { F([['e', 'i', NOW], [' = ', 'r'], ['−5', 'r', RES]], CX, 960, 64); F([['8 ▲ (−5) = 8 − 5 + 5 = 8', 'r']], CX, 1070, 44); });
  },
  // 9 · La resta resuelta.
  resolver(t) {
    stars(t, .3);
    F([['a', 'i', A_], [' # ', 'r', RULE], ['b', 'i', B_], [' = ', 'r'], ['a', 'i', A_], ['b', 'spi', B_], [' − ', 'r'], ['b', 'i', B_], ['a', 'spi', A_]], CX, 520, 56);
    fade(A(t, 1, .5), () => F([['3 # 2 = ', 'r'], ['3', 'r', A_], ['2', 'sp', B_], [' − ', 'r'], ['2', 'r', B_], ['3', 'sp', A_], [' = 9 − 8 = ', 'r'], ['1', 'r', RES]], CX, 680, 50));
    fade(A(t, 10.2, .5), () => F([['4 # 2 = ', 'r'], ['4', 'r', A_], ['2', 'sp', B_], [' − ', 'r'], ['2', 'r', B_], ['4', 'sp', A_], [' = 16 − 16 = ', 'r'], ['0', 'r', RES]], CX, 800, 50));
    fade(A(t, 20.2, .5), () => { F([['1 + 0 = ', 'r'], ['1', 'r', RES]], CX, 950, 64); mono('2 # 3 = −1, pero 3 # 2 = 1: el orden importa', CX, 1050, C.mute, { s: 24 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['1', '0', '2', '−1'], 0, [['(9 − 8) + (16 − 16) = ', 'r'], ['1', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['1.º por a, 2.º por b', 'r']], 'reemplazar'], [[['(−3)² = 9', 'r']], 'con paréntesis'], [[['fila, columna', 'r']], 'la tabla'], [[['primero el caso', 'r']], 'reglas por casos']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [A_, B_, RULE]);
    });
  },
};
