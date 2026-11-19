// «Criptoaritmética» · escenas de la lección pu-ar-3. Motor en kit.js, preu.js y piezas.js; guion en cifras.data.js.
// La cifra A en cian, la B en ámbar, el valor posicional en violeta, lo que se mira ahora en lima y el resultado en verde.
const A_ = C.cyan, B_ = C.amber, POS = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Casillas de cifras con su valor posicional debajo.
function digits(cx, y, ds, cols, o = {}) {
  const w = o.w || 140, x0 = cx - (ds.length - 1) * w / 2;
  ds.forEach((d, i) => { pill(x0 + i * w, y, w - 20, w - 10, cols[i], d, { s: (w - 10) * .55, r: 18 }); if (o.labs) mono(o.labs[i], x0 + i * w, y + w / 2 + 34, POS, { s: 22 }); });
}
const S = {
  // 1 · El reto: la edad al revés.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La edad de un padre es un número de dos cifras; al invertir el', 'orden de esas cifras se obtiene la edad de su hijo. Si el padre', 'es 27 años mayor que el hijo y las dos cifras suman 9, la edad', 'del padre es:'], opts: ['63', '72', '54', '81'], ok: 0 });
    fade(A(t, 9.6, .6), () => { mono('padre', 330, 960, C.mute, { s: 24 }); digits(330, 1060, ['A', 'B'], [A_, B_]); mono('hijo', 750, 960, C.mute, { s: 24 }); digits(750, 1060, ['B', 'A'], [B_, A_]); });
    fade(A(t, 10.4, .5), () => { F([['AB − BA = 27', 'r']], CX, 1250, 46); F([['A + B = 9', 'r']], CX, 1330, 46); });
  },
  // 2 · Cada cifra vale su lugar.
  valor(t) {
    stars(t, .3);
    digits(CX, 600, ['4', '7'], [A_, B_], { labs: ['40', '7'] });
    fade(A(t, 9.2, .5), () => F([['AB', 'i'], [' = 10', 'r', POS], ['A', 'i', A_], [' + ', 'r'], ['B', 'i', B_]], CX, 850, 60));
    fade(A(t, 18.2, .5), () => { digits(CX, 1030, ['A', 'B', 'C'], [A_, B_, C.violet], { w: 130, labs: ['× 100', '× 10', '× 1'] }); F([['ABC', 'i'], [' = 100', 'r', POS], ['A', 'i', A_], [' + 10', 'r', POS], ['B', 'i', B_], [' + ', 'r'], ['C', 'i', C.violet]], CX, 1230, 50); });
  },
  // 3 · Invertir las cifras.
  invertir(t) {
    stars(t, .3);
    F([['AB − BA', 'i'], [' = 9', 'r'], ['A', 'i', A_], [' − 9', 'r'], ['B', 'i', B_], [' = ', 'r'], ['9(A − B)', 'r', NOW]], CX, 580, 50);
    fade(A(t, 9.2, .5), () => F([['AB + BA', 'i'], [' = 11', 'r'], ['A', 'i', A_], [' + 11', 'r'], ['B', 'i', B_], [' = ', 'r'], ['11(A + B)', 'r', NOW]], CX, 700, 50));
    fade(A(t, 18.2, .5), () => { F([['52 − 25 = 27 = ', 'r'], ['9 · 3', 'r', RES]], CX, 860, 50); F([['52 + 25 = 77 = ', 'r'], ['11 · 7', 'r', RES]], CX, 960, 50); });
  },
  // 4 · Problema: la suma 165.
  suma165(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un número de dos cifras AB y el número BA, que resulta de', 'invertir sus cifras, suman 165. La cantidad de números AB', 'que cumplen esta condición es:'], opts: ['4', '3', '5', '6'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      F([['11(A + B) = 165  →  A + B = ', 'r'], ['15', 'r', NOW]], CX, 1000, 48);
      [['69', 20.2], ['78', 20.6], ['87', 21], ['96', 21.4]].forEach(([n, t0], i) => fade(A(t, t0, .4), () => digits(210 + i * 220, 1160, [n[0], n[1]], [A_, B_], { w: 90 })));
    });
  },
  // 5 · Cuatro veces sus cifras.
  cuatro(t) {
    stars(t, .3);
    F([['10', 'r', POS], ['A', 'i', A_], [' + ', 'r'], ['B', 'i', B_], [' = 4(', 'r'], ['A', 'i', A_], [' + ', 'r'], ['B', 'i', B_], [')', 'r']], CX, 580, 56);
    fade(A(t, 9.2, .5), () => { F([['6', 'r'], ['A', 'i', A_], [' = 3', 'r'], ['B', 'i', B_], ['  →  ', 'r'], ['B', 'i', B_], [' = 2', 'r'], ['A', 'i', A_]], CX, 700, 56); });
    fade(A(t, 18.2, .5), () => { ['12', '24', '36', '48'].forEach((n, i) => digits(210 + i * 220, 880, [n[0], n[1]], [A_, B_], { w: 90 })); F([['A = 5  →  B = 10', 'r', BAD], ['  ✗', 'r', BAD]], CX, 1030, 42); });
  },
  // 6 · Letras que esconden cifras.
  letras(t) {
    stars(t, .3);
    const v = t > 18;
    digits(CX + 70, 560, v ? ['8', '9'] : ['A', 'B'], [A_, B_], { w: 120 });
    T('+', CX - 170, 690, { k: 'r', s: 60, a: 'c', c: C.ink }); digits(CX + 130, 680, [v ? '9' : 'B'], [B_], { w: 120 });
    stroke('rgba(225,232,255,.8)', 3, () => { X.moveTo(CX - 200, 760); X.lineTo(CX + 220, 760); }, { g: 0 });
    digits(CX + 70, 830, v ? ['9', '8'] : ['B', 'A'], [B_, A_], { w: 120 });
    fade(A(t, 9.2, .5), () => { F([['10', 'r', POS], ['A', 'i', A_], [' + 2', 'r'], ['B', 'i', B_], [' = 10', 'r', POS], ['B', 'i', B_], [' + ', 'r'], ['A', 'i', A_], ['  →  9', 'r'], ['A', 'i', A_], [' = 8', 'r'], ['B', 'i', B_]], CX, 1010, 46); });
    fade(A(t, 18.2, .5), () => F([['89 + 9 = ', 'r'], ['98', 'r', RES]], CX, 1120, 56));
  },
  // 7 · Problema: el mayor de tres cifras.
  mayor(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['El mayor número de tres cifras tal que el producto de sus', 'dígitos es 24 y la suma de sus dígitos es 9 es:'], opts: ['432', '423', '621', '441'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      gridT(140, 880, 230, 84, ['1, 3, 8', '2, 2, 6', '1, 4, 6', '2, 3, 4'], ['producto', 'suma'], (i, j) => { if (t < 10.4 + i * .8) return null; const s = [12, 10, 11, 9][i]; return j ? [String(s), s === 9 ? RES : BAD] : ['24', C.ink]; }, { hw: 240, hh: 56, cs: 38, rs: 34, rk: 'r' });
      fade(A(t, 20.4, .5), () => digits(CX, 1390, ['4', '3', '2'], [RES, RES, RES], { w: 120 }));
    });
  },
  // 8 · Cuántas cifras tiene.
  cuantas(t) {
    stars(t, .3);
    F([['2', 'r', A_], ['10', 'sp', A_], [' · ', 'r'], ['5', 'r', B_], ['7', 'sp', B_]], CX, 560, 70);
    fade(A(t, 9.2, .5), () => { for (let i = 0; i < 10; i++) { const pair = i < 7; pill(150 + i * 86, 720, 70, 60, A_, '2', { s: 30, r: 12, fill: pair ? .35 : .15 }); if (i < 7) pill(150 + i * 86, 800, 70, 60, B_, '5', { s: 30, r: 12 }); } mono('7 parejas 2 · 5 = 10', 450, 880, NOW, { s: 24 }); mono('sobran 3', 150 + 8 * 86, 880, A_, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { F([['2', 'r', A_], ['3', 'sp', A_], [' · 10', 'r'], ['7', 'sp'], [' = 80 000 000', 'r']], CX, 1020, 54); mono('8 cifras', CX, 1110, RES, { s: 32 }); });
  },
  // 9 · La edad resuelta.
  resolver(t) {
    stars(t, .3);
    F([['9(A − B) = 27  →  A − B = ', 'r'], ['3', 'r', NOW]], CX, 560, 52);
    fade(A(t, 10.2, .5), () => { F([['A + B = 9', 'r']], 330, 690, 48); F([['A − B = 3', 'r']], 750, 690, 48); F([['A = ', 'r'], ['6', 'r', A_], ['   B = ', 'r'], ['3', 'r', B_]], CX, 800, 52); });
    fade(A(t, 20.2, .5), () => { mono('padre', 330, 920, C.mute, { s: 24 }); digits(330, 1010, ['6', '3'], [A_, B_]); mono('hijo', 750, 920, C.mute, { s: 24 }); digits(750, 1010, ['3', '6'], [B_, A_]); F([['63 − 36 = 27', 'r', RES]], CX, 1180, 50); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['63', '72', '54', '81'], 0, [['63 − 36 = 27   y   6 + 3 = ', 'r'], ['9', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['AB = 10A + B', 'r']], 'valor posicional'], [[['9(A − B)', 'r']], 'AB − BA'], [[['11(A + B)', 'r']], 'AB + BA'], [[['2 · 5 = 10', 'r']], 'contar cifras']], 420, 170, 44);
      endCard(t, 19.6, D.TITLE, D.LINE, [A_, B_, POS]);
    });
  },
};
