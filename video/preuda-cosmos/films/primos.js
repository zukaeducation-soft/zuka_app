// «Primos y divisibilidad» · escenas de la lección pu-nu-1. Motor en kit.js, preu.js y piezas.js; guion en primos.data.js.
// El primo 2 en cian, el 3 en ámbar, el 5 en violeta, lo que se mira ahora en lima y el resultado en verde.
const P2 = C.cyan, P3 = C.amber, P5 = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
const PC = { 2: P2, 3: P3, 5: P5, 7: C.blue, 11: C.mag, 13: C.blue };
// Árbol de factores: nodos [[x, y, texto, primo]], aristas [[i, j]]; k hace aparecer.
function tree(nodes, edges, k = 1) {
  edges.forEach(([i, j], n) => segL([nodes[i][0], nodes[i][1] + 40], [nodes[j][0], nodes[j][1] - 40], 'rgba(200,210,240,.6)', clamp(k * edges.length - n), 3, { g: 0 }));
  nodes.forEach(([x, y, s, pr], n) => { if (n && clamp(k * nodes.length - n) <= 0) return; if (pr) nodeC(x, y, 42, PC[s] || NOW, s, { s: 40 }); else bigT(s, x, y + 16, C.ink, 48); });
}
const DIV72 = [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72];
const S = {
  // 1 · El reto: los divisores de 72.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La cantidad de divisores positivos que tiene el número 72 es:'], opts: ['12', '10', '6', '8'], ok: 0 });
    fade(A(t, 9.6, .6), () => { bigT('72', CX, 840, C.ink, 110); });
    fade(A(t, 10.4, .5), () => DIV72.slice(0, 6).forEach((d, i) => fade(A(t, 10.6 + i * .5, .3), () => pill(170 + i * 150, 1000, 120, 80, C.mute, d, { s: 36, r: 14 }))));
    fade(A(t, 14, .5), () => mono('…', CX, 1110, C.mute, { s: 40 }));
  },
  // 2 · Qué es un primo.
  primo(t) {
    stars(t, .3);
    pill(330, 600, 300, 110, RES, '7', { s: 60 }); mono('divisores: 1 y 7', 330, 700, RES, { s: 24 });
    fade(A(t, 9.2, .5), () => { pill(750, 600, 300, 110, BAD, '9', { s: 60 }); mono('divisores: 1, 3 y 9', 750, 700, BAD, { s: 24 }); mono('compuesto', 750, 740, BAD, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { pill(330, 900, 300, 110, C.mute, '1', { s: 60 }); mono('un solo divisor: no es primo', 330, 1000, C.mute, { s: 22 }); pill(750, 900, 300, 110, P2, '2', { s: 60 }); mono('el único primo par', 750, 1000, P2, { s: 22 }); });
  },
  // 3 · El árbol de factores.
  arbol(t) {
    stars(t, .3);
    const N = [[CX, 560, '90'], [CX - 200, 740, '9'], [CX + 200, 740, '10'], [CX - 300, 920, '3', 1], [CX - 100, 920, '3', 1], [CX + 100, 920, '2', 1], [CX + 300, 920, '5', 1]];
    tree(N, [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]], t < 9 ? seg(t, .8, 3) * 3 / 7 : seg(t, 9.2, 12) * .58 + .42);
    fade(A(t, 18.2, .5), () => F([['90 = ', 'r'], ['2', 'r', P2], [' · ', 'r'], ['3', 'r', P3], ['2', 'sp', P3], [' · ', 'r'], ['5', 'r', P5]], CX, 1130, 64));
  },
  // 4 · Contar sin listar.
  contar(t) {
    stars(t, .3);
    F([['18 = ', 'r'], ['2', 'r', P2], [' · ', 'r'], ['3', 'r', P3], ['2', 'sp', P3]], CX, 560, 60);
    const D2 = ['2⁰', '2¹'], D3 = ['3⁰', '3¹', '3²'];
    fade(A(t, 2, .5), () => gridT(230, 640, 180, 90, D2, D3, (i, j) => (t > 18.2 ? [String(2 ** i * 3 ** j), RES] : t > 9.2 ? ['·', C.mute] : null), { hw: 110, hh: 60, cs: 42, rs: 34, rk: 'r', rc: P2, hk: 'r', hs: 34, hc: P3 }));
    fade(A(t, 9.4, .5), () => F([['(1 + 1) · (2 + 1) = ', 'r'], ['6', 'r', NOW]], CX, 980, 50));
    fade(A(t, 18.2, .5), () => mono('exponente + 1, y se multiplica', CX, 1070, NOW, { s: 26 }));
  },
  // 5 · Los criterios.
  criterios(t) {
    stars(t, .3);
    [['2', 'termina en par', P2], ['5', 'termina en 0 o 5', P5], ['10', 'termina en 0', C.mute]].forEach(([d, s, c], i) => fade(A(t, .8 + i * .5, .4), () => { pill(200, 560 + i * 100, 120, 76, c, d, { s: 36, r: 14 }); mono(s, 300, 568 + i * 100, C.ink, { s: 26, a: 'l' }); }));
    fade(A(t, 9.2, .5), () => { pill(200, 900, 120, 76, P3, '3 · 9', { s: 30, r: 14 }); F([['4 851: 4 + 8 + 5 + 1 = ', 'r'], ['18', 'r', NOW]], 640, 914, 40); });
    fade(A(t, 18.2, .5), () => { pill(200, 1020, 120, 76, NOW, '4', { s: 36, r: 14 }); F([['73', 'r', C.mute], ['16', 'r', NOW], ['  →  16 = 4 · 4', 'r']], 640, 1034, 40); });
  },
  // 6 · Problema: sin divisor común con 60.
  coprimos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La cantidad de números enteros del 1 al 60 que no tienen ningún', 'divisor común con 60, aparte del 1, es:'], opts: ['16', '20', '15', '24'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      for (let n = 1; n <= 60; n++) { const x = 150 + ((n - 1) % 10) * 87, y = 820 + Math.floor((n - 1) / 10) * 70; const m2 = n % 2 === 0, m3 = n % 3 === 0, m5 = n % 5 === 0; const out = (t > 11 && m2) || (t > 13 && m3) || (t > 15 && m5); const c = out ? C.dim : t > 20.4 ? RES : C.ink; T(String(n), x, y, { k: 'r', s: 30, a: 'c', c }); }
      fade(A(t, 20.4, .5), () => F([['60 · ½ · ⅔ · ⅘ = ', 'r'], ['16', 'r', RES]], CX, 1300, 46));
    });
  },
  // 7 · Hasta la raíz.
  raiz(t) {
    stars(t, .3);
    bigT('119', CX, 620, C.ink, 110);
    fade(A(t, 9.2, .5), () => { mono('√119 ≈ 10.9', CX, 720, NOW, { s: 28 }); [[2, false, 10], [3, false, 11], [5, false, 12], [7, true, 13]].forEach(([p, ok, t0], i) => fade(A(t, t0, .4), () => { pill(210 + i * 220, 850, 140, 90, ok ? RES : C.mute, p, { s: 44 }); check(210 + i * 220, 940, 16, ok, A(t, t0 + .3, .5)); })); });
    fade(A(t, 18.2, .5), () => F([['119 = ', 'r'], ['7', 'r', RES], [' · 17', 'r'], ['   compuesto', 'r', BAD]], CX, 1100, 54));
  },
  // 8 · Problema: los primos de 2 310.
  dosmil(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La cantidad de divisores primos distintos que tiene el número', '2 310 es:'], opts: ['5', '4', '6', '3'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const N = [[CX - 200, 840, '2 310'], [CX - 380, 990, '2', 1], [CX - 20, 990, '1 155'], [CX - 180, 1140, '3', 1], [CX + 140, 1140, '385'], [CX, 1290, '5', 1], [CX + 280, 1290, '77'], [CX + 160, 1440, '7', 1], [CX + 400, 1440, '11', 1]];
      tree(N, [[0, 1], [0, 2], [2, 3], [2, 4], [4, 5], [4, 6], [6, 7], [6, 8]], seg(t, 10.2, 21));
      fade(A(t, 21.4, .5), () => mono('2 · 3 · 5 · 7 · 11: cinco', 260, 1300, RES, { s: 24 }));
    });
  },
  // 9 · Los divisores resueltos.
  resolver(t) {
    stars(t, .3);
    F([['72 = 8 · 9 = ', 'r'], ['2', 'r', P2], ['3', 'sp', P2], [' · ', 'r'], ['3', 'r', P3], ['2', 'sp', P3]], CX, 540, 58);
    fade(A(t, 10.2, .5), () => gridT(150, 620, 180, 80, ['2⁰', '2¹', '2²', '2³'], ['3⁰', '3¹', '3²'], (i, j) => (t > 20.2 ? [String(2 ** i * 3 ** j), RES] : null), { hw: 110, hh: 56, cs: 40, rs: 34, rk: 'r', rc: P2, hk: 'r', hs: 34, hc: P3 }));
    fade(A(t, 11.4, .5), () => F([['4 · 3 = ', 'r'], ['12', 'r', NOW]], CX, 1070, 54));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['12', '10', '6', '8'], 0, [['2³ · 3²  →  (3 + 1)(2 + 1) = ', 'r'], ['12', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['dos divisores', 'r']], 'primo'], [[['el árbol', 'r']], 'factorizar'], [[['(a + 1)(b + 1)', 'r']], 'contar divisores'], [[['hasta la raíz', 'r']], 'probar si es primo']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [P2, P3, P5]);
    });
  },
};
