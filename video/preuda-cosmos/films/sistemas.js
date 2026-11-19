// «Sistemas y desigualdades» · escenas de la lección pu-ec-3. Motor en kit.js, preu.js y piezas.js; guion en sistemas.data.js.
// Los cubos y la x en cian, las esferas y la y en ámbar, las pirámides en violeta, lo que se mira ahora en lima y el resultado en verde.
const XC = C.cyan, YC = C.amber, PC = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Formas pequeñas para la balanza.
function shape(k, x, y, s = 30) {
  if (k === 'c') { X.save(); X.fillStyle = hexA(XC, .25); X.fillRect(x - s, y - 2 * s, 2 * s, 2 * s); X.restore(); stroke(XC, 3, () => X.rect(x - s, y - 2 * s, 2 * s, 2 * s), { g: 10 }); }
  if (k === 'e') { X.save(); X.fillStyle = hexA(YC, .25); X.beginPath(); X.arc(x, y - s, s, 0, 7); X.fill(); X.restore(); ring(x, y - s, s, YC, 3); }
  if (k === 'p') polyL([[x, y - 2 * s], [x - s, y], [x + s, y]], PC, { lw: 3, fill: .25 });
}
// Balanza en equilibrio con dos listas de formas.
function balance(cx, y, L, R, o = {}) {
  const w = o.w || 380; polyL([[cx, y], [cx - 30, y + 90], [cx + 30, y + 90]], C.mute, { lw: 3, fill: .1 });
  segL([cx - w, y], [cx + w, y], 'rgba(225,232,255,.85)', 1, 4);
  [[cx - w / 2, L], [cx + w / 2, R]].forEach(([x, items]) => items.forEach((k, i) => shape(k, x + (i - (items.length - 1) / 2) * 74, y - 6, 30)));
}
const S = {
  // 1 · El reto: la balanza de formas.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En una balanza, todos los objetos de una misma forma pesan lo', 'mismo. 2 cubos pesan lo mismo que 3 esferas, y 1 esfera y 1', 'pirámide, juntas, pesan lo mismo que 1 cubo. Las pirámides que', 'pesan lo mismo que 1 cubo son:'], opts: ['3', '2', '4', '6'], ok: 0 });
    fade(A(t, 9.6, .6), () => balance(CX, 1080, ['c', 'c'], ['e', 'e', 'e']));
    fade(A(t, 10.4, .5), () => balance(CX, 1330, ['e', 'p'], ['c']));
  },
  // 2 · Dos incógnitas, dos pistas.
  dos(t) {
    stars(t, .3);
    F([['x', 'i', XC], [' + ', 'r'], ['y', 'i', YC], [' = 12', 'r']], CX, 560, 60);
    fade(win(t, .8, 9.2), () => [['1', '11'], ['5', '7'], ['7', '5'], ['9', '3']].forEach(([a, b], i) => mono(`x = ${a}, y = ${b}`, 200 + (i % 2) * 460, 680 + Math.floor(i / 2) * 60, C.mute, { s: 26, a: 'l' })));
    fade(A(t, 9.2, .5), () => { F([['x', 'i', XC], [' − ', 'r'], ['y', 'i', YC], [' = 2', 'r']], CX, 660, 60); stroke('rgba(225,232,255,.7)', 3, () => { X.moveTo(CX - 220, 700); X.lineTo(CX + 220, 700); }, { g: 0 }); F([['2', 'r'], ['x', 'i', XC], [' = 14', 'r']], CX, 770, 60); mono('+ (y se cancela)', CX + 320, 640, NOW, { s: 22 }); });
    fade(A(t, 18.2, .5), () => F([['x', 'i', XC], [' = 7     ', 'r', RES], ['y', 'i', YC], [' = 5', 'r', RES]], CX, 900, 60));
  },
  // 3 · Sustituir.
  sustituir(t) {
    stars(t, .3);
    F([['y', 'i', YC], [' = 2', 'r'], ['x', 'i', XC], ['        ', 'r'], ['x', 'i', XC], [' + ', 'r'], ['y', 'i', YC], [' = 18', 'r']], CX, 560, 56);
    fade(A(t, 9.2, .5), () => { F([['x', 'i', XC], [' + ', 'r'], ['2x', 'i', YC], [' = 18  →  3', 'r'], ['x', 'i', XC], [' = 18  →  ', 'r'], ['x', 'i', XC], [' = 6', 'r', NOW]], CX, 690, 50); });
    fade(A(t, 18.2, .5), () => { F([['y', 'i', YC], [' = 2 · 6 = ', 'r'], ['12', 'r', RES]], CX, 820, 54); mono('6 + 12 = 18 ✓', CX, 900, RES, { s: 26 }); });
  },
  // 4 · Problema: las entradas del teatro.
  entradas(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En un teatro, la entrada de adulto cuesta $12 000 y la de niño', '$7 000. Si se vendieron 50 entradas y se recaudaron $450 000,', 'la cantidad de entradas de adulto que se vendieron es:'], opts: ['20', '30', '25', '15'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      F([['a', 'i', XC], [' + ', 'r'], ['n', 'i', YC], [' = 50', 'r']], CX, 990, 48); F([['12 000', 'r'], ['a', 'i', XC], [' + 7 000', 'r'], ['n', 'i', YC], [' = 450 000', 'r']], CX, 1070, 44);
      fade(A(t, 20.4, .5), () => { mono('todos niños: 50 · 7 000 = 350 000', CX, 1170, C.mute, { s: 24 }); F([['faltan 100 000 ÷ 5 000 = ', 'r'], ['20 adultos', 'r', RES]], CX, 1250, 44); });
    });
  },
  // 5 · Dos rectas que se cruzan.
  recta(t) {
    stars(t, .3);
    const X0 = 200, Y0 = 1200, u = 52, P = (x, y) => [X0 + x * u, Y0 - y * u];
    axes(X0, Y0, 14 * u, 13 * u, 'x', 'y', 1);
    curve(k => P(k * 12, 12 - k * 12), 0, 1, XC, seg(t, 1, 3)); fade(A(t, 3, .4), () => mono('x + y = 12', ...P(1.4, 12.2), XC, { s: 24 }));
    fade(A(t, 9.2, .5), () => { curve(k => P(2 + k * 11, k * 11), 0, 1, YC, seg(t, 9.4, 11.4)); mono('x − y = 2', ...P(12.5, 9.8), YC, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { dot(...P(7, 5), 14, RES, 20); mono('(7, 5)', P(7, 5)[0] + 70, P(7, 5)[1] - 20, RES, { s: 28 }); });
  },
  // 6 · El signo se voltea.
  voltea(t) {
    stars(t, .3);
    F([['4 − 2', 'r'], ['x', 'i', XC], [' > −6', 'r']], CX, 560, 60);
    fade(A(t, 9.2, .5), () => { F([['−2', 'r', BAD], ['x', 'i', XC], [' > −10', 'r']], CX, 670, 60); mono('÷ (−2): > se vuelve <', CX, 740, BAD, { s: 26 }); });
    fade(A(t, 18.2, .5), () => {
      F([['x', 'i', XC], [' < 5', 'r', RES]], CX, 850, 64);
      const px = nline(140, 940, 1030, -6, 6, { s: 26 });
      dot(px(3), 1030, 12, YC, 12); dot(px(5), 1030, 12, YC, 12); mono('3 < 5', (px(3) + px(5)) / 2, 980, YC, { s: 22 }); dot(px(-3), 1030, 12, PC, 12); dot(px(-5), 1030, 12, PC, 12); mono('−3 > −5', (px(-3) + px(-5)) / 2, 980, PC, { s: 22 });
    });
  },
  // 7 · Problema: cuántos enteros.
  enteros(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La cantidad de números enteros positivos x que cumplen la', 'desigualdad 3x − 7 < 20 es:'], opts: ['8', '9', '7', '10'], ok: 0, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      F([['3', 'r'], ['x', 'i', XC], [' < 27  →  ', 'r'], ['x', 'i', XC], [' < 9', 'r', NOW]], CX, 900, 52);
      const px = nline(140, 940, 1100, 0, 10, { s: 28 });
      ring(px(9), 1100, 12, BAD, 3); mono('no entra', px(9), 1050, BAD, { s: 22 });
      fade(A(t, 20.4, .5), () => { for (let v = 1; v <= 8; v++) dot(px(v), 1100, 12, RES, 14); F([['1, 2, …, 8: ', 'r'], ['8 enteros', 'r', RES]], CX, 1250, 46); });
    });
  },
  // 8 · Dos desigualdades a la vez.
  doble(t) {
    stars(t, .3);
    F([['−1 < 2', 'r'], ['x', 'i', XC], [' + 3 ≤ 9', 'r']], CX, 560, 60);
    fade(A(t, 9.2, .5), () => { F([['−4 < 2', 'r'], ['x', 'i', XC], [' ≤ 6', 'r']], CX, 660, 54); F([['−2 < ', 'r'], ['x', 'i', XC], [' ≤ 3', 'r', NOW]], CX, 750, 54); mono('− 3 y ÷ 2 en las tres partes', CX, 820, C.mute, { s: 24 }); });
    const px = nline(140, 940, 980, -4, 5, { s: 28 });
    fade(A(t, 12, .5), () => { ring(px(-2), 980, 12, BAD, 3); dot(px(3), 980, 12, NOW, 14); stroke(hexA(NOW, .7), 6, () => { X.moveTo(px(-2) + 14, 980); X.lineTo(px(3), 980); }, { g: 8 }); });
    fade(A(t, 18.2, .5), () => { for (let v = -1; v <= 3; v++) dot(px(v), 980, 12, RES, 16); F([['−1, 0, 1, 2, 3: ', 'r'], ['5 enteros', 'r', RES]], CX, 1130, 46); });
  },
  // 9 · La balanza resuelta.
  resolver(t) {
    stars(t, .3);
    balance(CX, 700, ['e', 'e', 'p', 'p'], ['c', 'c'], { w: 420 }); mono('la segunda balanza, doble', CX, 830, C.mute, { s: 22 });
    fade(A(t, 10.2, .5), () => { balance(CX, 1000, ['e', 'e', 'p', 'p'], ['e', 'e', 'e'], { w: 420 }); mono('2 cubos = 3 esferas', CX, 1130, C.mute, { s: 22 }); F([['2 pirámides = 1 esfera', 'r', NOW]], CX, 1200, 42); });
    fade(A(t, 20.2, .5), () => F([['1 cubo = 1 esfera + 1 pirámide = ', 'r'], ['3 pirámides', 'r', RES]], CX, 1300, 40));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['3', '2', '4', '6'], 0, [['esfera = 2 pirámides  →  cubo = ', 'r'], ['3 pirámides', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['sumar o sustituir', 'r']], 'dos pistas'], [[['el cruce de dos rectas', 'r']], 'la solución'], [[['× o ÷ negativo', 'r']], 'el signo se voltea'], [[['< o ≤', 'r']], 'el borde entra o no']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [XC, YC, PC]);
    });
  },
};
