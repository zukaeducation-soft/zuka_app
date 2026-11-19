// «Del texto a la ecuación» · escenas de la lección pu-ec-1. Motor en kit.js, preu.js y piezas.js; guion en traducir.data.js.
// La x en cian, lo conocido en ámbar, las palabras en violeta, lo que se mira ahora en lima y el resultado en verde.
const XX = C.cyan, KN = C.amber, WD = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Cinta de bloques: cada bloque es una x (o un trozo con rótulo).
function tape(x, y, n, w, col, lab, o = {}) { for (let i = 0; i < n; i++) pill(x + i * w + w / 2, y, w - 6, o.h || 70, col, lab, { s: o.s || 30, r: 10, fill: .3 }); return x + n * w; }
// Balanza: dos platillos con contenido escrito.
function scale(y, L, R, tilt = 0) {
  const a = tilt * .08, l = [CX - 300, y + Math.sin(a) * 300], r = [CX + 300, y - Math.sin(a) * 300];
  polyL([[CX, y], [CX - 40, y + 140], [CX + 40, y + 140]], C.mute, { lw: 3, fill: .1 });
  segL(l, r, 'rgba(225,232,255,.85)', 1, 4);
  [[l, L], [r, R]].forEach(([p, parts]) => { stroke('rgba(225,232,255,.6)', 3, () => { X.moveTo(p[0] - 150, p[1] + 20); X.lineTo(p[0] + 150, p[1] + 20); }, { g: 0 }); F(parts, p[0], p[1] - 20, 50); });
}
const S = {
  // 1 · El reto: tres generaciones.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La edad de un abuelo es el doble de la edad de su hijo, y la', 'edad de este es el triple de la edad de su propio hijo. Si las', 'edades de los tres suman 120 años, la edad del abuelo es:'], opts: ['72', '36', '60', '48'], ok: 0 });
    fade(A(t, 9.6, .6), () => [['nieto', 1], ['hijo', 3], ['abuelo', 6]].forEach(([n, k], i) => fade(A(t, 10 + i * .5, .4), () => { mono(n, 170, 1010 + i * 110, C.mute, { s: 24, a: 'l' }); tape(330, 1000 + i * 110, k, 100, i ? KN : XX, '?', { s: 26 }); })));
    fade(A(t, 12, .5), () => mono('× 3', 470, 1060, WD, { s: 22 }));
  },
  // 2 · Traducir con cuidado.
  traducir(t) {
    stars(t, .3);
    jT('«el doble de un número, aumentado en 3»', CX, 560, WD, 36, { max: 960 });
    F([['2', 'r'], ['x', 'i', XX], [' + 3', 'r', KN]], CX, 660, 60);
    fade(A(t, 9.2, .5), () => { jT('«el doble de un número aumentado en 3»', CX, 820, WD, 36, { max: 960 }); F([['2(', 'r'], ['x', 'i', XX], [' + 3', 'r', KN], [')', 'r']], CX, 920, 60); mono('con x = 5: 13 frente a 16', CX, 990, NOW, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { jT('«la mitad de un número»', 330, 1130, WD, 34); F([['x', 'i', XX], [' ÷ 2', 'r']], 780, 1140, 52); });
  },
  // 3 · Menos que, más que.
  menosque(t) {
    stars(t, .3);
    jT('«Ana tiene 4 menos que Beto»', CX, 560, WD, 40);
    F([['A', 'i', XX], [' = ', 'r'], ['B', 'i', KN], [' − 4', 'r']], CX, 680, 64);
    fade(A(t, 2, .5), () => { F([['A', 'i', BAD], [' = 4 − ', 'r', BAD], ['B', 'i', BAD], ['  ✗', 'r', BAD]], CX, 770, 40); });
    fade(A(t, 9.2, .5), () => { tape(200, 900, 10, 66, KN, null); mono('Beto', 150, 908, KN, { s: 24, a: 'r' }); tape(200, 1000, 6, 66, XX, null); mono('Ana', 150, 1008, XX, { s: 24, a: 'r' }); for (let i = 6; i < 10; i++) stroke(hexA(BAD, .7), 2, () => X.roundRect(200 + i * 66 + 3, 965, 60, 70, 10), { dash: [6, 5], g: 0 }); mono('− 4', 200 + 8 * 66, 1080, BAD, { s: 26 }); });
    fade(A(t,18.2, .5), () => F([['B = 10  →  A = 10 − 4 = ', 'r'], ['6', 'r', RES]], CX, 1200, 48));
  },
  // 4 · Escoger la x.
  incognita(t) {
    stars(t, .3);
    jT('lápiz = 1/3 del cuaderno; juntos: 8 000', CX, 560, WD, 38);
    fade(A(t, 9.2, .5), () => { mono('lápiz', 180, 708, XX, { s: 24, a: 'r' }); tape(220, 700, 1, 150, XX, 'x'); mono('cuaderno', 180, 818, KN, { s: 24, a: 'r' }); tape(220, 810, 3, 150, KN, 'x'); });
    fade(A(t, 18.2, .5), () => { F([['x', 'i', XX], [' + 3', 'r'], ['x', 'i', KN], [' = 8 000  →  ', 'r'], ['x', 'i', XX], [' = ', 'r'], ['2 000', 'r', RES]], CX, 980, 48); mono('cuaderno: 3 · 2 000 = 6 000', CX, 1060, RES, { s: 26 }); });
  },
  // 5 · Problema: el libro de Valentina.
  valentina(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Valentina leyó un libro así: el lunes, la quinta parte; el', 'martes, la cuarta parte de lo que le faltaba; el miércoles, 40', 'páginas, y le quedó por leer la tercera parte del libro. El libro', 'tiene:'], opts: ['150', '200', '120', '180'], ok: 0, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      const segs = [[3, KN, 'lun'], [3, WD, 'mar'], [4, NOW, '40'], [5, XX, '1/3']], w = 900 / 15; let x = 90;
      segs.forEach(([n, c, lab], i) => fade(A(t, 10.2 + i * .6, .4), () => { const x0 = 90 + segs.slice(0, i).reduce((a, s) => a + s[0], 0) * w; pill(x0 + n * w / 2, 1100, n * w - 6, 90, c, lab, { s: 28, r: 12, fill: .3 }); }));
      fade(A(t, 12.4, .5), () => F([['falta tras el martes: 4/5 · 3/4 = ', 'r'], ['3/5', 'r', NOW]], CX, 1240, 40));
      fade(A(t, 20.4, .5), () => F([['3/5 − 1/3 = 4/15 = 40  →  ', 'r'], ['150', 'r', RES]], CX, 1340, 42));
    });
  },
  // 6 · Despejar es equilibrar.
  despejar(t) {
    stars(t, .3);
    const ph = t < 9 ? 0 : t < 18 ? 1 : 2;
    const L = [[['4', 'r'], ['x', 'i', XX], [' + 5', 'r', KN]], [['3', 'r'], ['x', 'i', XX]], [['x', 'i', XX]]][ph];
    const R = [[['x', 'i', XX], [' + 17', 'r', KN]], [['12', 'r', KN]], [['4', 'r', RES]]][ph];
    scale(760, L, R);
    fade(A(t, 9.4, .5), () => { if (ph === 1) mono('− x y − 5 en los dos lados', CX, 1000, NOW, { s: 26 }); });
    fade(A(t, 18.4, .5), () => mono('÷ 3 en los dos lados', CX, 1000, NOW, { s: 26 }));
  },
  // 7 · Problema: el terreno.
  terreno(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['El perímetro de un terreno rectangular es 36 metros y su largo', 'es el doble de su ancho. El área del terreno, en metros', 'cuadrados, es:'], opts: ['72', '81', '36', '54'], ok: 0, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      const s = t > 20 ? 30 : 30, x0 = CX - 180, y0 = 960;
      polyL([[x0, y0], [x0 + 360, y0], [x0 + 360, y0 + 180], [x0, y0 + 180]], NOW, { fill: .1, lw: 3 });
      mono(t > 12 ? '2x = 12' : '2x', CX, y0 - 20, KN, { s: 26 }); mono(t > 12 ? 'x = 6' : 'x', x0 - 20, y0 + 98, XX, { s: 26, a: 'r' });
      fade(A(t, 10.6, .5), () => F([['2(', 'r'], ['x', 'i', XX], [' + 2', 'r'], ['x', 'i', XX], [') = 36  →  6', 'r'], ['x', 'i', XX], [' = 36', 'r']], CX, 1260, 42));
      fade(A(t, 20.4, .5), () => { mono('72 m²', CX, y0 + 102, RES, { s: 34 }); F([['6 · 12 = ', 'r'], ['72', 'r', RES]], CX, 1350, 48); });
    });
  },
  // 8 · Comprobar con el texto.
  comprobar(t) {
    stars(t, .3);
    [[[['150', 'r', XX]], 'el libro', .8], [[['− 30 → ', 'r'], ['120', 'r', XX]], 'lunes: 1/5 de 150', 3], [[['− 30 → ', 'r'], ['90', 'r', XX]], 'martes: 1/4 de 120', 9.2], [[['− 40 → ', 'r'], ['50', 'r', XX]], 'miércoles', 11.5], [[['50 = 150 ÷ 3  ✓', 'r', RES]], 'falta un tercio', 18.2]].forEach(([f, lab, t0], i) => fade(A(t, t0, .5), () => { const y = 540 + i * 140; F(f, 600, y, 50, { a: 'l' }); mono(lab, 540, y - 8, C.mute, { s: 24, a: 'r' }); }));
  },
  // 9 · Las edades resueltas.
  resolver(t) {
    stars(t, .3);
    [['nieto', 1, XX], ['hijo', 3, KN], ['abuelo', 6, WD]].forEach(([n, k, c], i) => { mono(n, 170, 568 + i * 110, c, { s: 24, a: 'l' }); tape(330, 560 + i * 110, k, 100, c, t > 20 ? '12' : 'x', { s: 28 }); });
    fade(A(t, 10.2, .5), () => F([['x', 'i', XX], [' + 3', 'r'], ['x', 'i', KN], [' + 6', 'r'], ['x', 'i', WD], [' = 10', 'r'], ['x', 'i'], [' = 120  →  ', 'r'], ['x', 'i'], [' = 12', 'r', NOW]], CX, 960, 46));
    fade(A(t, 20.2, .5), () => { F([['abuelo: 6 · 12 = ', 'r'], ['72', 'r', RES]], CX, 1080, 54); mono('12 + 36 + 72 = 120', CX, 1160, C.mute, { s: 26 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['72', '36', '60', '48'], 0, [['10x = 120  →  x = 12  →  6x = ', 'r'], ['72', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['palabra por palabra', 'r']], 'traducir'], [[['en lo más pequeño', 'r']], 'la x'], [[['igual a los dos lados', 'r']], 'despejar'], [[['con el texto', 'r']], 'comprobar']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [XX, KN, WD]);
    });
  },
};
