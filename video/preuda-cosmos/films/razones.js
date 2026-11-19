// «Razones, repartos y escalas» · escenas de la lección pu-pr-1. Motor en kit.js, preu.js y piezas.js; guion en razones.data.js.
// Una cantidad en cian, la otra en ámbar, una tercera en violeta, el valor de una parte en lima y el resultado en verde.
const QA = C.cyan, QB = C.amber, QC = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Fila de bloques de partes iguales (x, y arriba a la izquierda; cada parte de ancho pw): cols da el color de cada parte.
function parts(x, y, pw, h, cols, o = {}) { cols.forEach((c, i) => fade(clamp((o.k ?? 1) * cols.length - i), () => { X.save(); X.fillStyle = hexA(c, .3); X.fillRect(x + i * pw + 3, y + 3, pw - 6, h - 6); X.restore(); stroke(c, 2.5, () => X.rect(x + i * pw + 3, y + 3, pw - 6, h - 6), { g: 8 }); if (o.lab) T(o.lab(i), x + i * pw + pw / 2, y + h / 2 + 12, { k: 'r', s: o.s || 30, a: 'c', c: C.ink }); })); }
const rep = (n, c) => Array(n).fill(c);
const S = {
  // 1 · El reto: el salón 3 : 5 → 3 : 4.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En un salón de clase, la razón entre el número de hombres', 'y el número de mujeres es 3 : 5. Si llegan 6 hombres más,', 'la razón pasa a ser 3 : 4. La cantidad de mujeres que hay', 'en el salón es:'], opts: ['40', '24', '30', '20'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      parts(140, 950, 100, 100, [...rep(3, QA), ...rep(5, QB)], { k: seg(t, 10, 12) });
      fade(A(t, 12, .4), () => { mono('hombres', 290, 1100, QA, { s: 24 }); mono('mujeres', 690, 1100, QB, { s: 24 }); });
      fade(A(t, 13.4, .5), () => { pill(290, 1220, 220, 70, QA, '+ 6', { s: 36 }); arrow(410, 1220, 520, 1220, NOW, 1, 3, { h: 12 }); bigT('3 : 4', 640, 1236, NOW, 52); });
    });
  },
  // 2 · Qué es una razón: agua y harina.
  razon(t) {
    stars(t, .3);
    const row = (y, n, c) => { for (let i = 0; i < n; i++) cyl(160 + i * 95, y, 34, 70, c, { fill: .25, lw: 2, g: 6 }); };
    fade(A(t, .8, .5), () => { row(620, 2, QA); row(760, 3, QB); mono('agua', 120, 600, QA, { s: 22, a: 'r' }); mono('harina', 120, 740, QB, { s: 22, a: 'r' }); F([['2 : 3', 'r', NOW]], 820, 700, 64); });
    fade(A(t, 9.2, .5), () => { row(1000, 4, QA); row(1140, 6, QB); F([['4 : 6', 'r']], 880, 1060, 48); });
    fade(A(t, 12, .5), () => F([['2 : 3 = 4 : 6 = 6 : 9', 'r', RES]], CX, 1300, 52));
    fade(A(t, 18.2, .5), () => mono('cómo se reparte, no cuánto hay', CX, 1400, NOW, { s: 28 }));
  },
  // 3 · Partes iguales.
  partes(t) {
    stars(t, .3);
    parts(140, 560, 100, 100, [...rep(3, QA), ...rep(5, QB)], { k: seg(t, 1, 3), lab: i => (t > 9.4 ? 'k' : '') });
    fade(A(t, 3.4, .5), () => { brc(140, 440, 680, QA, 1); brc(440, 940, 680, QB, 1); mono('3 partes', 290, 760, QA, { s: 24 }); mono('5 partes', 690, 760, QB, { s: 24 }); });
    fade(A(t, 9.6, .5), () => F([['hombres = 3', 'r', QA], ['k', 'i', NOW], ['     mujeres = 5', 'r', QB], ['k', 'i', NOW]], CX, 900, 46));
    fade(A(t, 18.2, .5), () => { parts(140, 1000, 100, 100, [...rep(3, QA), ...rep(5, QB)], { lab: () => '4', s: 40 }); F([['3 · 4 = ', 'r'], ['12', 'r', QA], ['     5 · 4 = ', 'r'], ['20', 'r', QB]], CX, 1240, 46); });
  },
  // 4 · El reparto de 840 000 en 3 : 4.
  reparto(t) {
    stars(t, .3);
    bigT('840 000', CX, 480, C.ink, 70);
    parts(120, 600, 120, 110, [...rep(3, QA), ...rep(4, QB)], { k: seg(t, 1.6, 4), lab: () => (t > 9.4 ? '120 000' : ''), s: 20 });
    fade(A(t, 9.2, .5), () => F([['840 000 ÷ 7 = ', 'r'], ['120 000', 'r', NOW]], CX, 820, 50));
    fade(A(t, 18.2, .5), () => { brc(120, 480, 730, QA, 1); brc(480, 960, 730, QB, 1); F([['3 · 120 000 = ', 'r'], ['360 000', 'r', QA]], CX, 960, 44); F([['4 · 120 000 = ', 'r'], ['480 000', 'r', QB]], CX, 1040, 44); });
  },
  // 5 · Problema: la herencia 2 : 3 : 5.
  herencia(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Tres hermanos se reparten una herencia en la razón', '2 : 3 : 5. Si el que más recibe obtiene 18 millones de', 'pesos más que el que menos recibe, el valor total de la', 'herencia, en millones de pesos, es:'], opts: ['60', '54', '90', '36'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const pw = 80, x = 140;
      parts(x, 920, pw, 90, rep(2, QA), { lab: () => (t > 20 ? '6' : '') }); parts(x, 1040, pw, 90, rep(3, QC), { lab: () => (t > 20 ? '6' : '') }); parts(x, 1160, pw, 90, rep(5, QB), { lab: () => (t > 20 ? '6' : '') });
      mono('menor', x - 20, 975, QA, { s: 20, a: 'r' }); mono('mayor', x - 20, 1215, QB, { s: 20, a: 'r' });
      fade(A(t, 10.6, .5), () => { stroke(BAD, 3, () => X.rect(x + 2 * pw, 1160, 3 * pw, 90), { g: 14, dash: [8, 6] }); brc(x + 2 * pw, x + 5 * pw, 1260, BAD, 1); mono('3 partes = 18', x + 3.5 * pw, 1340, BAD, { s: 26 }); });
      fade(A(t, 20.4, .5), () => F([['18 ÷ 3 = 6   ·   10 · 6 = ', 'r'], ['60', 'r', RES]], CX, 1440, 46));
    });
  },
  // 6 · La escala de un mapa.
  escala(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En un mapa hecho a escala 1 : 50 000, la distancia entre', 'dos pueblos es de 6 cm. La distancia real entre los dos', 'pueblos, en kilómetros, es:'], opts: ['3', '30', '0.3', '12'], ok: 0, rv: 20 });
    fade(A(t, 8.6, .5), () => {
      const x0 = 210, u = 110; stroke('rgba(225,232,255,.8)', 3, () => { X.moveTo(x0, 1000); X.lineTo(x0 + 6 * u, 1000); }, { g: 4 });
      for (let i = 0; i <= 6; i++) { stroke('rgba(225,232,255,.8)', 2, () => { X.moveTo(x0 + i * u, 988); X.lineTo(x0 + i * u, 1012); }, { g: 0 }); mono(String(i), x0 + i * u, 1050, C.mute, { s: 20 }); }
      dot(x0, 1000, 12, QA); dot(x0 + 6 * u, 1000, 12, QB); mono('cm en el mapa', CX, 950, C.mute, { s: 22 });
      fade(A(t, 9.8, .5), () => F([['6 · 50 000 = ', 'r'], ['300 000 cm', 'r', NOW]], CX, 1160, 46));
      fade(A(t, 18.4, .5), () => F([['300 000 cm = 3 000 m = ', 'r'], ['3 km', 'r', RES]], CX, 1260, 46));
    });
  },
  // 7 · El producto cruzado.
  cruzado(t) {
    stars(t, .3);
    const y = 640;
    FR('4', '6', 400, y, 80, QA); bigT('=', CX, y + 30, C.ink, 70); FR('10', 'x', 680, y, 80, QB, { k: 'r' });
    fade(A(t, 9.2, .5), () => { stroke(NOW, 3, () => { X.moveTo(420, y - 60); X.lineTo(650, y + 80); }, { g: 12 }); stroke(NOW, 3, () => { X.moveTo(420, y + 80); X.lineTo(650, y - 60); }, { g: 12 }); F([['4 · ', 'r'], ['x', 'i', NOW], [' = 6 · 10 = 60', 'r']], CX, 900, 56); });
    fade(A(t, 18.2, .5), () => { F([['x', 'i', NOW], [' = 60 ÷ 4 = ', 'r'], ['15', 'r', RES]], CX, 1020, 56); mono('10 / 15 = 2 / 3 = 4 / 6', CX, 1100, C.mute, { s: 26 }); });
  },
  // 8 · Razones encadenadas.
  cadena(t) {
    stars(t, .3);
    F([['a : b = 2 : 3', 'r', QA]], 300, 500, 46); F([['b : c = 4 : 5', 'r', QB]], 780, 500, 46);
    fade(A(t, 2, .5), () => mono('b está en las dos', CX, 580, NOW, { s: 26 }));
    fade(A(t, 9.4, .5), () => {
      F([['a : b = 8 : ', 'r', QA], ['12', 'r', NOW]], 300, 720, 46); F([['b : c = ', 'r', QB], ['12', 'r', NOW], [' : 15', 'r', QB]], 780, 720, 46);
      mono('× 4', 300, 780, QA, { s: 22 }); mono('× 3', 780, 780, QB, { s: 22 });
      fade(A(t, 12, .5), () => F([['a : b : c = 8 : 12 : 15', 'r', C.ink]], CX, 900, 54));
    });
    fade(A(t, 20.2, .5), () => { F([['a / c = ', 'r'], ['8 / 15', 'r', RES]], CX, 1040, 56); mono('2/3 · 4/5 = 8/15', CX, 1110, C.mute, { s: 26 }); });
  },
  // 9 · El salón resuelto.
  resolver(t) {
    stars(t, .3);
    const pw = 90, x = 120;
    parts(x, 440, pw, 90, [...rep(3, QA), ...rep(5, QB)], { lab: () => (t > 10 ? '8' : 'k'), s: 30 });
    F([['(3', 'r'], ['k', 'i', NOW], [' + 6) / 5', 'r'], ['k', 'i', NOW], [' = 3 / 4', 'r']], CX, 640, 50);
    fade(A(t, 10, .5), () => { F([['12', 'r'], ['k', 'i', NOW], [' + 24 = 15', 'r'], ['k', 'i', NOW]], CX, 740, 50); F([['3', 'r'], ['k', 'i', NOW], [' = 24  →  ', 'r'], ['k', 'i', NOW], [' = 8', 'r', NOW]], CX, 830, 50); });
    fade(A(t, 20.2, .5), () => {
      F([['mujeres = 5 · 8 = ', 'r'], ['40', 'r', RES]], CX, 960, 56);
      parts(x, 1040, pw, 80, [...rep(3, QA), ...rep(4, QB)], { lab: i => (i < 3 ? '10' : '10'), s: 28 });
      mono('24 + 6 = 30 hombres · 40 mujeres = 3 : 4', CX, 1180, C.mute, { s: 24 });
    });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['40', '24', '30', '20'], 0, [['k = 8: mujeres 5k = ', 'r'], ['40', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['3 : 5 → 3', 'r'], ['k', 'i'], [' y 5', 'r'], ['k', 'i']], 'partes iguales'], [[['total ÷ partes', 'r']], 'valor de una parte'], [[['a/b = c/d → ad = bc', 'r']], 'proporción'], [[['1 : 50 000', 'r']], 'cuidar las unidades']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [QA, NOW, QB]);
    });
  },
};
