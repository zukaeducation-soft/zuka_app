// «Promedio, mediana y moda» · escenas de la lección pu-gr-2. Motor en kit.js, preu.js y piezas.js; guion en promedios.data.js.
// Los datos en cian, lo que sobra en ámbar, lo que falta en violeta, lo que se mira ahora en lima y el resultado en verde.
const DAT = C.cyan, UP = C.amber, LOW = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
const NOTAS = [3, 3, 12, 9, 3], GOL = [4, 6, 5, 3, 2], CEL = [3, 4, 2, 5, 4, 7, 10];
// Torres de fichas (nivelar): alturas hs, nivel lv; k pasa lo que sobra a lo que falta.
function towers(cx, y0, hs, lv, k, s = 54) {
  const gap = 170, x0 = cx - (hs.length - 1) * gap / 2;
  hs.forEach((h, i) => {
    const x = x0 + i * gap;
    for (let j = 0; j < Math.max(h, lv); j++) {
      const y = y0 - (j + 1) * s, extra = j >= lv, miss = j >= h;
      if (extra) fade(1 - k, () => pill(x, y + s / 2, s - 6, s - 6, UP, null, { r: 8, fill: .3 }));
      else if (miss) { stroke(hexA(LOW, .6), 2, () => X.roundRect(x - s / 2 + 3, y + 3, s - 6, s - 6, 8), { g: 0, dash: [6, 5] }); fade(k, () => pill(x, y + s / 2, s - 6, s - 6, LOW, null, { r: 8, fill: .3 })); }
      else pill(x, y + s / 2, s - 6, s - 6, DAT, null, { r: 8, fill: .25 });
    }
    mono(String(h), x, y0 + 40, C.mute, { s: 26 });
  });
  return x0;
}
// Fila de fichas con datos que viajan de su lugar desordenado a su lugar ordenado (k).
function sortRow(cx, y, vals, k, hl = () => null, w = 120) {
  const ord = vals.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]), x0 = cx - (vals.length - 1) * w / 2;
  vals.forEach((v, i) => { const r = ord.findIndex(o => o[1] === i), x = lerp(x0 + i * w, x0 + r * w, eio(k)), yy = y - Math.sin(Math.PI * eio(k)) * (i % 2 ? 60 : -60); pill(x, yy, w - 20, 90, hl(r) || DAT, v, { s: 44, r: 16 }); });
  return r => x0 + r * w;
}
const S = {
  // 1 · El reto: las notas del grupo.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La gráfica muestra cuántos estudiantes de un grupo de 30', 'obtuvieron cada nota en una evaluación calificada de 1 a 5:', 'la nota 1, 3 estudiantes; la 2, 3; la 3, 12; la 4, 9 y la 5, 3.', 'La nota promedio del grupo en la evaluación fue:'], opts: ['3.2', '3.0', '3.5', '3.4'], ok: 0 });
    fade(A(t, 9.6, .6), () => { barsC(170, 1440, 820, 460, ['1', '2', '3', '4', '5'], NOTAS, 14, DAT, { k: seg(t, 10, 13), ticks: [3, 6, 9, 12], vals: t > 13 }); mono('nota', 580, 1520, C.mute, { s: 22 }); mono('estudiantes', 170, 940, C.mute, { s: 22, a: 'l' }); });
  },
  // 2 · El promedio nivela.
  nivelar(t) {
    stars(t, .3);
    const k = eio(seg(t, 10, 14)), y0 = 1100, x0 = towers(CX, y0, [6, 2, 9, 3], 5, k);
    fade(A(t, 9.2, .5), () => { stroke(NOW, 3, () => { X.moveTo(x0 - 110, y0 - 5 * 54); X.lineTo(x0 + 3 * 170 + 110, y0 - 5 * 54); }, { dash: [12, 8], g: 10 }); mono('5', x0 - 130, y0 - 5 * 54 + 8, NOW, { s: 30, a: 'r' }); });
    fade(A(t, 2, .5), () => { mono('sobra', 780, 520, UP, { s: 24 }); mono('falta', 300, 520, LOW, { s: 24 }); });
    fade(A(t, 18.2, .5), () => F([['(6 + 2 + 9 + 3) ÷ 4 = 20 ÷ 4 = ', 'r'], ['5', 'r', RES]], CX, 1290, 48));
  },
  // 3 · La tabla de frecuencias.
  tabla(t) {
    stars(t, .3);
    const rows = [['0 libros', '2', '0 · 2 = 0'], ['1 libro', '5', '1 · 5 = 5'], ['2 libros', '3', '2 · 3 = 6']];
    gridT(110, 480, 270, 110, rows.map(r => r[0]), ['personas', 'dato × veces'], (i, j) => j === 0 ? [rows[i][1], DAT] : t > 9.2 + i * .8 ? [rows[i][2], UP] : null, { hw: 300, hh: 70, cs: 38 });
    fade(A(t, 12, .5), () => F([['total: 0 + 5 + 6 = ', 'r'], ['11', 'r', UP], [' libros', 'r']], CX, 980, 46));
    fade(A(t, 18.2, .5), () => { F([['11 ÷ ', 'r'], ['10', 'r', DAT], [' = ', 'r'], ['1.1', 'r', RES]], CX, 1100, 56); mono('10 personas = 2 + 5 + 3', CX, 1180, DAT, { s: 24 }); });
  },
  // 4 · Problema: los goles del torneo.
  goles(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La tabla muestra cuántos goles anotó un equipo en cada uno de', 'los 20 partidos de un torneo: 0 goles en 4 partidos, 1 gol en 6,', '2 en 5, 3 en 3 y 4 en 2. El total de goles del torneo fue:'], opts: ['33', '30', '20', '36'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      gridT(60, 960, 160, 96, ['goles', 'partidos', 'producto'], ['0', '1', '2', '3', '4'], (i, j) => i === 0 ? [String(j), C.ink] : i === 1 ? [String(GOL[j]), DAT] : t > 10.6 + j * .7 ? [String(j * GOL[j]), j * GOL[j] ? UP : C.mute] : null, { hw: 200, hh: 10, cs: 38, hs: 1 });
      fade(A(t, 20.4, .5), () => F([['0 + 6 + 10 + 9 + 8 = ', 'r'], ['33', 'r', RES]], CX, 1400, 52));
    });
  },
  // 5 · La mediana.
  mediana(t) {
    stars(t, .3);
    const k = seg(t, 9.6, 12), six = t > 18;
    const px = sortRow(CX, 720, six ? [6, 2, 9, 4, 7, 11] : [6, 2, 9, 4, 7], six ? 1 : k, r => (six ? (r === 2 || r === 3) && t > 19 : r === 2 && t > 12.4) ? NOW : null, 140);
    fade(A(t, 12.6, .5), () => { if (!six) { mono('2 a la izquierda', px(.5), 850, C.mute, { s: 22 }); mono('2 a la derecha', px(3.5), 850, C.mute, { s: 22 }); F([['mediana = ', 'r'], ['6', 'r', RES]], CX, 980, 52); } });
    fade(A(t, 19.6, .5), () => F([['(6 + 7) ÷ 2 = ', 'r'], ['6.5', 'r', RES]], CX, 980, 52));
    fade(A(t, 1, .5), () => mono('primero, ordenar', CX, 560, NOW, { s: 28 }));
  },
  // 6 · La mediana de los goles: 20 partidos en fila.
  medgoles(t) {
    stars(t, .3);
    const vals = GOL.flatMap((n, g) => Array(n).fill(g)), w = 46, x0 = CX - 19 * w / 2, y = 760;
    vals.forEach((v, i) => fade(A(t, .8 + i * .12, .3), () => { const hl = (i === 9 || i === 10) && t > 10.2; pill(x0 + i * w, y, w - 6, 70, hl ? NOW : [C.mute, DAT, UP, LOW, C.violet][v], v, { s: 30, r: 10, fill: hl ? .35 : .18 }); }));
    fade(A(t, 4, .5), () => [1, 4, 10, 11, 15, 18, 20].forEach(p => mono(String(p), x0 + (p - 1) * w, y - 62, p === 10 || p === 11 ? NOW : C.mute, { s: 18 })));
    fade(A(t, 10.2, .5), () => { brc(x0 - 20, x0 + 9 * w + 20, y + 60, C.mute, A(t, 10.4, .6)); mono('10 datos', x0 + 4.5 * w, y + 120, C.mute, { s: 22 }); brc(x0 + 10 * w - 20, x0 + 19 * w + 20, y + 60, C.mute, A(t, 10.4, .6)); mono('10 datos', x0 + 14.5 * w, y + 120, C.mute, { s: 22 }); F([['4 ceros + 6 unos = ', 'r'], ['10', 'r', NOW], [' datos', 'r']], CX, 980, 42); });
    fade(A(t, 20.2, .5), () => F([['(1 + 2) ÷ 2 = ', 'r'], ['1.5', 'r', RES]], CX, 1110, 56));
  },
  // 7 · La moda y el dato extremo.
  moda(t) {
    stars(t, .3);
    fade(win(t, .6, 9.2), () => { barsC(200, 1050, 760, 400, ['36', '37', '38', '39', '40'], [2, 5, 8, 3, 1], 9, DAT, { vals: true, hl: i => t > 2.4 && i === 2 }); mono('tallas de zapato vendidas', CX, 560, C.mute, { s: 24 }); mono('moda: 38', CX, 1160, NOW, { s: 30 }); });
    fade(A(t, 9.4, .5), () => {
      const px = nline(120, 960, 900, 0, 36, { step: 2, s: 22, lab: v => v % 6 === 0 });
      [3, 4, 4, 5, 34].forEach((v, i) => dot(px(v), 860 - (v === 4 && i === 2 ? 34 : 0), 13, v === 34 ? BAD : DAT, 14));
      fade(A(t, 11, .5), () => { arrow(px(10), 760, px(10), 830, UP, 1, 3, { h: 10 }); mono('media 10', px(10), 740, UP, { s: 24 }); arrow(px(4), 680, px(4), 800, NOW, 1, 3, { h: 10 }); mono('mediana y moda 4', px(4) + 40, 660, NOW, { s: 24, a: 'l' }); });
      fade(A(t, 18.4, .5), () => { F([['3 + 4 + 4 + 5 + 34 = 50', 'r'], ['  →  50 ÷ 5 = 10', 'r', UP]], CX, 1080, 42); mono('el 34 jala la media; la mediana no se entera', CX, 1170, C.ink, { s: 24 }); });
    });
  },
  // 8 · Problema: las horas de celular.
  celular(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La gráfica muestra las horas que Sebastián usó el celular', 'cada día de una semana: 3, 4, 2, 5, 4, 7 y 10 horas de lunes', 'a domingo. La cantidad de días en que usó el celular más horas', 'que su promedio diario es:'], opts: ['2', '3', '1', '4'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const G = barsC(170, 1330, 820, 400, ['L', 'M', 'X', 'J', 'V', 'S', 'D'], CEL, 11, DAT, { vals: true, ticks: [2, 4, 6, 8, 10], hl: i => t > 12 && i >= 5 });
      fade(A(t, 11, .5), () => { stroke(UP, 3, () => { X.moveTo(170, G.y(5)); X.lineTo(990, G.y(5)); }, { dash: [12, 8], g: 10 }); mono('promedio 5', 990, G.y(5) - 16, UP, { s: 22, a: 'r' }); });
      fade(A(t, 20.4, .5), () => F([['2, 3, 4, ', 'r', C.mute], ['4', 'r', RES], [', 5, 7, 10', 'r', C.mute]], CX, 1460, 46));
    });
  },
  // 9 · Las notas resueltas.
  resolver(t) {
    stars(t, .3);
    barsC(170, 900, 820, 380, ['1', '2', '3', '4', '5'], NOTAS, 14, DAT, { vals: true });
    NOTAS.forEach((n, i) => fade(A(t, 1 + i * .7, .4), () => mono(`${i + 1} · ${n} = ${(i + 1) * n}`, 170 + (i + .5) * 164, 1000, UP, { s: 24 })));
    fade(A(t, 10.2, .5), () => F([['3 + 6 + 36 + 36 + 15 = ', 'r'], ['96', 'r', UP], [' puntos', 'r']], CX, 1120, 46));
    fade(A(t, 20.2, .5), () => { F([['96 ÷ ', 'r'], ['30', 'r', DAT], [' = ', 'r'], ['3.2', 'r', RES]], CX, 1240, 60); mono('(1 + 2 + 3 + 4 + 5) ÷ 5 = 3 no sirve', CX, 1330, BAD, { s: 24 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['3.2', '3.0', '3.5', '3.4'], 0, [['96 ÷ 30 = ', 'r'], ['3.2', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['suma ÷ cantidad', 'r']], 'promedio'], [[['el del medio, ordenado', 'r']], 'mediana'], [[['el que más se repite', 'r']], 'moda'], [[['dato × veces', 'r']], 'tabla de frecuencias']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [DAT, NOW, UP]);
    });
  },
};
