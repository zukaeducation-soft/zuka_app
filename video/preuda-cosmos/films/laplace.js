// «Espacio muestral y Laplace» · escenas de la lección pu-pb-1. Motor en kit.js, preu.js y piezas.js; guion en laplace.data.js.
// Los casos posibles en cian, los favorables en lima, lo que no cuenta en violeta y el resultado en verde.
const POS = C.cyan, FAV = C.lime, NO = C.violet, RES = C.green, BAD = C.mag, AM = C.amber;
// Cara de dado con puntos.
function die(x, y, n, s = 70, col = POS) {
  stroke(col, 3, () => X.roundRect(x - s / 2, y - s / 2, s, s, 12), { g: 8 });
  const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
  P[n].forEach(([a, b]) => dot(x + a * s * .26, y + b * s * .26, s * .07, col, 6));
}
const S = {
  // 1 · El reto: números con 1, 2, 3 y 4.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Se escriben todos los números de dos cifras que se pueden formar', 'con los dígitos 1, 2, 3 y 4 (se pueden repetir dígitos). Si se', 'escoge uno al azar, la probabilidad de que sea múltiplo de 3 es:'], opts: ['5/16', '1/4', '3/8', '1/3'], ok: 0 });
    fade(A(t, 9.6, .6), () => ['1', '2', '3', '4'].forEach((d, i) => pill(270 + i * 180, 960, 130, 110, POS, d, { s: 56, r: 18 })));
    fade(A(t, 10.6, .5), () => { mono('decenas', 380, 1120, C.mute, { s: 22 }); mono('unidades', 700, 1120, C.mute, { s: 22 }); boxes(CX, 1220, ['?', '?'], [POS, POS], { w: 120, gap: 180, s: 54, op: ' ' }); });
  },
  // 2 · Favorables sobre posibles.
  laplace(t) {
    stars(t, .3);
    [1, 2, 3, 4, 5, 6].forEach((n, i) => die(205 + i * 134, 620, n, 100, t > 9.2 && n % 3 === 0 ? FAV : POS));
    mono('6 posibles', CX, 720, POS, { s: 26 });
    fade(A(t, 9.2, .5), () => mono('2 favorables: el 3 y el 6', CX, 780, FAV, { s: 26 }));
    fade(A(t, 18.2, .5), () => { F([['P = ', 'r'], ['2', 'r', FAV], [' / ', 'r'], ['6', 'r', POS], [' = ', 'r'], ['1/3', 'r', RES]], CX, 920, 60); mono('favorables ÷ posibles', CX, 1000, C.mute, { s: 26 }); });
  },
  // 3 · El espacio muestral: dos monedas.
  espacio(t) {
    stars(t, .3);
    ['CC', 'CS', 'SC', 'SS'].forEach((r, i) => { const fav = t > 18.2 && (r === 'CS' || r === 'SC'); const x = 210 + i * 220; ring(x - 32, 640, 30, fav ? FAV : POS, 3); ring(x + 32, 640, 30, fav ? FAV : POS, 3); T(r[0], x - 32, 652, { k: 'r', s: 34, a: 'c', c: C.ink }); T(r[1], x + 32, 652, { k: 'r', s: 34, a: 'c', c: C.ink }); });
    fade(A(t, 9.2, .5), () => { mono('1.ª  2.ª', 430, 710, C.mute, { s: 20 }); mono('1.ª  2.ª', 650, 710, C.mute, { s: 20 }); mono('CS ≠ SC', CX, 780, AM, { s: 28 }); });
    fade(A(t, 18.2, .5), () => { F([['P(una cara y un sello) = 2/4 = ', 'r'], ['1/2', 'r', RES]], CX, 920, 46); F([['1/3', 'r', BAD], ['  ✗  si se olvida el orden', 'r', C.mute]], CX, 1010, 36); });
  },
  // 4 · Problema: un primo al azar.
  primos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Se escoge al azar un número entero del 1 al 30. La probabilidad', 'de que el número escogido sea primo es:'], opts: ['1/3', '3/10', '11/30', '2/5'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const P = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
      for (let n = 1; n <= 30; n++) { const x = 150 + ((n - 1) % 10) * 87, y = 820 + Math.floor((n - 1) / 10) * 90; const f = P.has(n) && t > 10.6; T(String(n), x, y, { k: 'r', s: 34, a: 'c', c: f ? FAV : C.mute, g: f ? 10 : 0 }); }
      fade(A(t, 20.4, .5), () => F([['10 / 30 = ', 'r'], ['1/3', 'r', RES]], CX, 1150, 54));
    });
  },
  // 5 · Problema: entre los zurdos.
  club(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En un club deportivo hay 50 socios; 10 son zurdos, y de ellos 6', 'son hombres. Si se escoge al azar uno de los socios zurdos, la', 'probabilidad de que sea mujer es:'], opts: ['2/5', '1/5', '2/25', '3/5'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      for (let i = 0; i < 50; i++) { const z = i < 10, x = 150 + (i % 10) * 87, y = 860 + Math.floor(i / 10) * 70; fade(z || t < 10.4 ? 1 : .2, () => dot(x, y, 18, z ? (i < 6 ? POS : t > 20.4 ? FAV : AM) : NO, 10)); }
      fade(A(t, 10.6, .5), () => { mono('hombres', 150 + 2.5 * 87, 820, POS, { s: 20 }); mono('mujeres', 150 + 7.5 * 87, 820, AM, { s: 20 }); });
      fade(A(t, 10.6, .5), () => mono('posibles: solo los 10 zurdos', CX, 1240, POS, { s: 24 }));
      fade(A(t, 20.4, .5), () => F([['4 / 10 = ', 'r'], ['2/5', 'r', RES]], CX, 1330, 50));
    });
  },
  // 6 · Igual de probables.
  igual(t) {
    stars(t, .3);
    const cnt = s => 6 - Math.abs(7 - s);
    for (let s = 2; s <= 12; s++) { const x = 140 + (s - 2) * 80, h = cnt(s) * 60 * (t > 9.2 ? 1 : 0); if (h) bar(x - 30, 1000 - h, 60, h, s === 7 ? FAV : s === 2 ? AM : POS, 1, { fill: .3 }); mono(String(s), x, 1040, C.mute, { s: 22 }); if (t > 9.2) mono(String(cnt(s)), x, 980 - h, C.ink, { s: 20 }); }
    fade(A(t, .8, .5), () => mono('11 sumas posibles', CX, 580, C.ink, { s: 28 }));
    fade(A(t, 18.2, .5), () => { F([['P(7) = 6/36', 'r', FAV], ['      P(2) = 1/36', 'r', AM]], CX, 1140, 44); mono('se cuentan los 36 pares', CX, 1220, FAV, { s: 26 }); });
  },
  // 7 · Entre 0 y 1.
  extremos(t) {
    stars(t, .3);
    const px = nline(140, 940, 760, 0, 1, { step: .25, s: 28, lab: v => v === 0 || v === 1 || v === .5 });
    fade(A(t, .8, .5), () => { dot(px(0), 760, 16, BAD, 16); mono('imposible: sacar 7', px(0) + 10, 700, BAD, { s: 22, a: 'l' }); });
    fade(A(t, 9.2, .5), () => { dot(px(1), 760, 16, RES, 16); mono('seguro: sacar menos de 7', px(1) - 10, 700, RES, { s: 22, a: 'r' }); });
    fade(A(t, 18.2, .5), () => { stroke(hexA(FAV, .7), 8, () => { X.moveTo(px(0), 840); X.lineTo(px(1), 840); }, { g: 10 }); mono('toda probabilidad vive aquí', CX, 900, FAV, { s: 26 }); F([['5/4', 'r', BAD], ['  →  error', 'r', C.mute]], CX, 1010, 44); });
  },
  // 8 · Dos fichas a la vez.
  fichas(t) {
    stars(t, .3);
    const pairs = []; for (let a = 1; a <= 5; a++) for (let b = a + 1; b <= 5; b++) pairs.push([a, b]);
    pairs.forEach(([a, b], i) => fade(A(t, .8 + i * .3, .3), () => { const f = t > 9.2 && (a + b) % 2 === 0, x = 180 + (i % 5) * 180, y = 640 + Math.floor(i / 5) * 140; pill(x, y, 150, 96, f ? FAV : POS, `${a} · ${b}`, { s: 34, r: 16, fill: f ? .3 : .12 }); }));
    fade(A(t, 4, .5), () => mono('10 parejas, sin orden', CX, 880, C.mute, { s: 24 }));
    fade(A(t, 18.2, .5), () => F([['4 / 10 = ', 'r'], ['2/5', 'r', RES]], CX, 990, 56));
  },
  // 9 · Los números resueltos.
  resolver(t) {
    stars(t, .3);
    gridT(200, 520, 160, 96, ['1', '2', '3', '4'], ['1', '2', '3', '4'], (i, j) => { const n = 10 * (i + 1) + (j + 1), f = n % 3 === 0 && t > 10.2; return [String(n), f ? FAV : C.ink]; }, { hw: 100, hh: 60, cs: 40, rs: 32, rk: 'r', hk: 'r', hs: 32, rc: POS, hc: POS });
    fade(A(t, 1, .5), () => mono('4 · 4 = 16 posibles', CX + 120, 1000, POS, { s: 26 }));
    fade(A(t, 20.2, .5), () => F([['P = ', 'r'], ['5', 'r', FAV], [' / ', 'r'], ['16', 'r', POS]], CX + 120, 1110, 60));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['5/16', '1/4', '3/8', '1/3'], 0, [['12, 21, 24, 42, 33 de 16  →  ', 'r'], ['5/16', 'r', RES]], { fs: 40 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['favorables ÷ posibles', 'r']], 'Laplace'], [[['igual de probables', 'r']], 'la condición'], [[['con orden si importa', 'r']], 'espacio muestral'], [[['0 ≤ P ≤ 1', 'r']], 'comprobar']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [POS, FAV, NO]);
    });
  },
};
