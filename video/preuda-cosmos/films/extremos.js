// «Máximos y mínimos» · escenas de la lección pu-ar-4. Motor en kit.js, preu.js y piezas.js; guion en extremos.data.js.
// Los colores de las medias y las bolas son los suyos; lo que se mira ahora en lima, lo que sobra en magenta y el resultado en verde.
const NEG = '#8b93b8', AZ = C.cyan, GR = C.violet, ROJ = C.mag, VER = C.green, NOW = C.lime, RES = C.green, BAD = C.mag, AM = C.amber;
// Fila de fichas sacadas: cols[i] es el color de la ficha i; aparecen desde t0 cada dt.
function draws(cx, y, cols, t, t0, dt, o = {}) {
  const s = o.s || 64, x0 = cx - (cols.length - 1) * s / 2;
  cols.forEach((c, i) => fade(A(t, t0 + i * dt, .3), () => { dot(x0 + i * s, y, s * .36, c, 14); if (o.hl && o.hl(i)) ring(x0 + i * s, y, s * .48, NOW, 3); }));
  return i => x0 + i * s;
}
const MES = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const S = {
  // 1 · El reto: el cajón oscuro.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En un cajón oscuro hay 10 medias negras, 8 azules y 6 grises,', 'todas sueltas. La menor cantidad de medias que se deben sacar,', 'sin mirar, para tener la certeza de obtener por lo menos tres', 'medias del mismo color es:'], opts: ['7', '3', '9', '6'], ok: 0 });
    fade(A(t, 9.6, .6), () => { [[10, NEG, 'negras'], [8, AZ, 'azules'], [6, GR, 'grises']].forEach(([n, c, lab], r) => { for (let i = 0; i < n; i++) dot(200 + i * 62, 1000 + r * 110, 20, c, 10); mono(lab, 880, 1008 + r * 110, c, { s: 24, a: 'l' }); }); });
  },
  // 2 · Pensar en la peor suerte.
  peor(t) {
    stars(t, .3);
    mono('certeza = pasa siempre, aun con la peor suerte', CX, 540, C.ink, { s: 26 });
    const n = t < 9 ? 0 : Math.min(13, Math.floor(seg(t, 9.4, 18.6) * 13) + 1);
    MES.forEach((m, i) => { const x = 150 + i * 71; stroke('rgba(160,180,240,.5)', 2, () => X.roundRect(x - 30, 640, 60, 260, 10), { g: 0 }); mono(m, x, 940, C.mute, { s: 22 }); if (i < n && i < 12) dot(x, 860, 20, AZ, 12); });
    if (n === 13) { dot(150 + 4 * 71, 800, 20, BAD, 18); mono('13.ª', 150 + 4 * 71, 740, BAD, { s: 22 }); }
    fade(A(t, 18.2, .5), () => F([['12 + 1 = ', 'r'], ['13', 'r', RES]], CX, 1080, 56));
  },
  // 3 · Tres en el mismo mes.
  tres(t) {
    stars(t, .3);
    const two = t > 2;
    MES.forEach((m, i) => { const x = 150 + i * 71; stroke('rgba(160,180,240,.5)', 2, () => X.roundRect(x - 30, 600, 60, 300, 10), { g: 0 }); mono(m, x, 940, C.mute, { s: 22 }); if (two) { dot(x, 860, 18, AZ, 10); dot(x, 815, 18, AZ, 10); } });
    fade(A(t, 9.2, .5), () => F([['2 · 12 = ', 'r'], ['24', 'r', AZ], [' sin trío', 'r']], CX, 1060, 50));
    fade(A(t, 18.2, .5), () => { dot(150 + 7 * 71, 770, 18, BAD, 18); F([['24 + 1 = ', 'r'], ['25', 'r', RES]], CX, 1160, 56); mono('peor caso + 1', CX, 1240, NOW, { s: 26 }); });
  },
  // 4 · Problema: una de cada color.
  urna(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una urna hay 12 bolas rojas, 9 verdes y 7 azules. La menor', 'cantidad de bolas que se deben sacar, sin mirar, para tener la', 'certeza de obtener por lo menos una bola de cada color es:'], opts: ['22', '3', '20', '17'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const cols = [...Array(12).fill(ROJ), ...Array(9).fill(VER), AZ];
      cols.forEach((c, i) => fade(A(t, 10.2 + i * .35, .25), () => dot(150 + (i % 11) * 78, 980 + Math.floor(i / 11) * 90, 24, c, 12)));
      fade(A(t, 20.4, .5), () => { ring(150 + 10 * 78, 1070, 34, NOW, 3); F([['12 + 9 + 1 = ', 'r'], ['22', 'r', RES]], CX, 1290, 54); });
    });
  },
  // 5 · Problema: el más grande posible.
  reparto(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La suma de cinco números enteros positivos, todos distintos,', 'es 30. El mayor valor que puede tomar el más grande de esos', 'cinco números es:'], opts: ['20', '26', '15', '18'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const v = [1, 2, 3, 4, 20];
      v.forEach((n, i) => fade(A(t, 10.2 + i * .5, .4), () => { if (i < 4 || t > 20.4) { const h = n * 16; bar(220 + i * 160, 1340 - h, 100, h, i < 4 ? AZ : RES, 1, { fill: .3 }); mono(String(n), 270 + i * 160, 1380, i < 4 ? AZ : RES, { s: 30 }); } }));
      fade(A(t, 12.4, .5), () => mono('1 + 2 + 3 + 4 = 10: lo mínimo', CX, 930, AZ, { s: 24 }));
      fade(A(t, 20.4, .5), () => F([['30 − 10 = ', 'r'], ['20', 'r', RES]], CX - 120, 1010, 46));
    });
  },
  // 6 · El mayor producto.
  producto(t) {
    stars(t, .3);
    F([['a', 'i'], [' + ', 'r'], ['b', 'i'], [' = 21', 'r']], CX, 540, 60);
    fade(A(t, 9.2, .5), () => barsC(170, 1150, 820, 420, ['1 · 20', '5 · 16', '8 · 13', '10 · 11'], [20, 80, 104, 110], 120, AZ, { vals: true, k: seg(t, 9.4, 15), hl: i => t > 18 && i === 3 }));
    fade(A(t, 18.2, .5), () => mono('lo más parejo: el mayor producto', CX, 1300, NOW, { s: 26 }));
  },
  // 7 · El ingrediente que limita.
  pintura(t) {
    stars(t, .3);
    const tandas = t < 9 ? 0 : Math.min(3, Math.floor(seg(t, 9.4, 14) * 3) + 1);
    [[12, AZ, 'azul: 12 L', 3], [15, AM, 'amarilla: 15 L', 5]].forEach(([n, c, lab, per], r) => { const y = 620 + r * 170; mono(lab, 140, y + 8, c, { s: 24, a: 'l' }); for (let i = 0; i < n; i++) pill(400 + i * 40, y, 32, 60, c, null, { r: 6, fill: i < tandas * per ? .1 : .4 }); });
    fade(A(t, 9.2, .5), () => { mono(`${tandas} tanda${tandas === 1 ? '' : 's'} de 3 + 5`, CX, 930, NOW, { s: 26 }); });
    fade(A(t, 11.6, .5), () => mono('la amarilla se acaba en 3 tandas; sobran 3 L de azul', CX, 990, BAD, { s: 22 }));
    fade(A(t, 18.2, .5), () => F([['9 + 15 = ', 'r'], ['24 L', 'r', RES]], CX, 1120, 56));
  },
  // 8 · Sin casillas vecinas.
  tablero(t) {
    stars(t, .3);
    const on = [0, 2, 4, 6, 8], six = t > 18;
    for (let i = 0; i < 9; i++) { const x = CX - 190 + (i % 3) * 190, y = 780 + Math.floor(i / 3) * 190; const c = on.includes(i) && t > 9.2 ? RES : six && i === 1 ? BAD : null; if (c) pill(x, y, 170, 170, c, null, { r: 14, fill: .35 }); else stroke('rgba(160,180,240,.5)', 2, () => X.roundRect(x - 85, y - 85, 170, 170, 14), { g: 0 }); }
    fade(A(t, 18.4, .5), () => mono('una sexta siempre queda vecina de otra', CX, 1300, BAD, { s: 24 }));
  },
  // 9 · El cajón resuelto.
  resolver(t) {
    stars(t, .3);
    draws(CX, 700, [NEG, NEG, AZ, AZ, GR, GR], t, .8, .5, { s: 120 });
    fade(A(t, 10.2, .5), () => { mono('6 medias: todavía no hay tres iguales', CX, 820, C.mute, { s: 24 }); dot(CX, 940, 40, NEG, 18); ring(CX, 940, 54, NOW, 3); mono('la 7.ª: tercera de algún color', CX, 1030, NOW, { s: 24 }); });
    fade(A(t, 20.2, .5), () => F([['2 · 3 + 1 = ', 'r'], ['7', 'r', RES]], CX, 1170, 60));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['7', '3', '9', '6'], 0, [['peor caso 2 · 3 = 6;  6 + 1 = ', 'r'], ['7', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['peor caso + 1', 'r']], 'certeza'], [[['los demás al mínimo', 'r']], 'un máximo'], [[['lo más parejo', 'r']], 'mayor producto'], [[['lo que se acaba primero', 'r']], 'manda']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [AZ, AM, GR]);
    });
  },
};
