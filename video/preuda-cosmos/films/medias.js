// «Promedios» · escenas de la lección pu-ar-2. Motor en kit.js, preu.js y piezas.js; guion en medias.data.js.
// Un grupo en cian, el otro en ámbar, el promedio en violeta, lo que se mira ahora en lima y el resultado en verde.
const G1 = C.cyan, G2 = C.amber, AVG = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Balancín sobre una recta: apoyo en m, pesos [[valor, cantidad, color, rótulo]].
function seesaw(x0, x1, y, lo, hi, m, ws, o = {}) {
  const px = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
  stroke('rgba(225,232,255,.85)', 4, () => { X.moveTo(x0, y); X.lineTo(x1, y); }, { g: 6 });
  polyL([[px(m), y + 6], [px(m) - 30, y + 60], [px(m) + 30, y + 60]], AVG, { lw: 3, fill: .2 });
  mono(o.mlab || String(m), px(m), y + 100, AVG, { s: 26 });
  ws.forEach(([v, n, c, lab]) => { for (let j = 0; j < n; j++) pill(px(v), y - 26 - j * 40, 70, 34, c, null, { r: 8, fill: .35 }); mono(lab, px(v), y + 40, c, { s: 22 }); });
  return px;
}
const LIST = [3, 4, 7, 8, 10, 12, 13, 15];
const S = {
  // 1 · El reto: hombres y mujeres.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En una prueba calificada de 0 a 5, el promedio de todo un grupo', 'fue 3.9. El promedio de los hombres fue 3.5 y el de las mujeres', 'fue 4.1. De las afirmaciones sobre el grupo, la única verdadera es:'], opts: ['Las mujeres son el doble de los hombres', 'Los hombres son el doble de las mujeres', 'Hay tantos hombres como mujeres', 'Las mujeres son el triple de los hombres'], ok: 0, col1: true, os: 30 });
    fade(A(t, 9.6, .6), () => { const px = nline(140, 940, 1150, 3.3, 4.3, { step: .1, s: 22, lab: v => Math.abs(v * 10 - Math.round(v * 10)) < 1e-6 && Math.round(v * 10) % 2 === 1 }); dot(px(3.5), 1150, 16, G1, 16); mono('hombres 3.5', px(3.5), 1100, G1, { s: 22 }); dot(px(4.1), 1150, 16, G2, 16); mono('mujeres 4.1', px(4.1), 1100, G2, { s: 22 }); fade(A(t, 11, .5), () => { dot(px(3.9), 1150, 12, AVG, 16); mono('grupo 3.9', px(3.9), 1260, AVG, { s: 22 }); }); });
  },
  // 2 · Promedio por cantidad: Daniela.
  suma(t) {
    stars(t, .3);
    F([['promedio', 'r', AVG], [' × ', 'r'], ['cantidad', 'r', G1], [' = ', 'r'], ['suma', 'r', NOW]], CX, 560, 56);
    fade(A(t, 9.2, .5), () => { F([['5 · 3.8 = ', 'r'], ['19', 'r', G1]], 330, 720, 48); F([['6 · 4.0 = ', 'r'], ['24', 'r', G2]], 750, 720, 48); boxes(CX, 880, ['3.8', '3.8', '3.8', '3.8', '3.8', '?'], [G1, G1, G1, G1, G1, NOW], { w: 110, gap: 140, s: 34, op: ' ' }); });
    fade(A(t, 18.2, .5), () => F([['sexta: 24 − 19 = ', 'r'], ['5.0', 'r', RES]], CX, 1050, 54));
  },
  // 3 · Problema: el quinto amigo.
  amigo(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['El promedio de las edades de cuatro amigos es 25 años. Cuando', 'llega un quinto amigo, el promedio de las edades de los cinco', 'es 27 años. La edad del quinto amigo es:'], opts: ['35', '29', '27', '33'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      F([['antes: 4 · 25 = ', 'r'], ['100', 'r', G1]], CX, 1000, 48);
      fade(A(t, 11.4, .5), () => F([['después: 5 · 27 = ', 'r'], ['135', 'r', G2]], CX, 1100, 48));
      fade(A(t, 20.4, .5), () => F([['135 − 100 = ', 'r'], ['35 años', 'r', RES]], CX, 1230, 54));
    });
  },
  // 4 · Quitar datos.
  quitar(t) {
    stars(t, .3);
    for (let i = 0; i < 8; i++) { const out = i >= 6 && t > 9.2; pill(170 + i * 106, 640, 90, 90, out ? BAD : G1, null, { r: 14, fill: out ? .1 : .3 }); if (out) stroke(BAD, 4, () => { X.moveTo(170 + i * 106 - 40, 680); X.lineTo(170 + i * 106 + 40, 600); }, { g: 8 }); }
    F([['8 · 15 = ', 'r'], ['120', 'r', G1]], CX, 800, 48);
    fade(A(t, 9.2, .5), () => F([['2 · 9 = ', 'r'], ['18', 'r', BAD]], CX, 900, 48));
    fade(A(t, 18.2, .5), () => { F([['120 − 18 = 102', 'r']], CX, 1010, 48); F([['102 ÷ 6 = ', 'r'], ['17', 'r', RES]], CX, 1110, 56); });
  },
  // 5 · El promedio ponderado.
  ponderado(t) {
    stars(t, .3);
    const w = 160;
    [[80, 2, G1], [60, 3, G2]].reduce((x, [v, h, c]) => { for (let i = 0; i < h; i++) { pill(x + i * w + w / 2, 640, w - 10, 80, c, `${v} km/h`, { s: 28, r: 12 }); } return x + h * w; }, CX - 2.5 * w);
    mono('cada ficha: una hora', CX, 720, C.mute, { s: 22 });
    fade(A(t, 9.2, .5), () => { F([['2 · 80 + 3 · 60 = ', 'r'], ['340 km', 'r', NOW]], CX, 850, 48); mono('en 5 horas', CX, 920, C.mute, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { F([['340 ÷ 5 = ', 'r'], ['68 km/h', 'r', RES]], CX, 1050, 54); mono('no 70: hay más horas a 60', CX, 1130, BAD, { s: 24 }); });
  },
  // 6 · Ida y vuelta.
  idavuelta(t) {
    stars(t, .3);
    ptL([200, 680], G1, 'A', 0, -30); ptL([880, 680], G1, 'B', 0, -30); segL([200, 680], [880, 680], 'rgba(225,232,255,.6)', 1, 3);
    arrow(220, 640, 860, 640, G1, 1, 3, { h: 12 }); mono('ida: 60 km/h', CX, 610, G1, { s: 24 }); arrow(860, 730, 220, 730, G2, 1, 3, { h: 12 }); mono('vuelta: 40 km/h', CX, 780, G2, { s: 24 });
    fade(A(t, 9.2, .5), () => { mono('120 km', CX, 690, C.ink, { s: 22 }); F([['ida: 120 ÷ 60 = 2 h     vuelta: 120 ÷ 40 = 3 h', 'r']], CX, 900, 38); F([['240 km en 5 h', 'r', NOW]], CX, 980, 46); });
    fade(A(t, 18.2, .5), () => { F([['240 ÷ 5 = ', 'r'], ['48 km/h', 'r', RES]], CX, 1110, 54); F([['(60 + 40) ÷ 2 = 50', 'r', BAD], ['  ✗', 'r', BAD]], CX, 1200, 40); });
  },
  // 7 · Problema: tachar sin cambiar el promedio.
  tachar(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Sofía escribe 3, 4, 7, 8, 10, 12, 13, 15. Quiere tachar dos números', 'de modo que el promedio de los seis restantes sea igual al de', 'la lista original. Las maneras de escoger los dos números son:'], opts: ['2', '1', '3', '4'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const hit = v => t > 20.4 && (v === 3 || v === 15 || v === 8 || v === 10);
      LIST.forEach((v, i) => pill(150 + i * 112, 980, 96, 90, hit(v) ? (v === 3 || v === 15 ? NOW : G2) : G1, v, { s: 40, r: 14 }));
      fade(A(t, 10.4, .5), () => F([['72 ÷ 8 = ', 'r'], ['9', 'r', AVG]], CX, 1110, 46));
      fade(A(t, 12, .5), () => F([['6 · 9 = 54  →  tachados: 72 − 54 = ', 'r'], ['18', 'r', NOW]], CX, 1200, 42));
      fade(A(t, 20.4, .5), () => F([['3 + 15 = 18     8 + 10 = 18', 'r', RES]], CX, 1300, 44));
    });
  },
  // 8 · La balanza.
  balanza(t) {
    stars(t, .3);
    seesaw(140, 940, 820, 0, 10, 5, [[2, 3, G1, '2'], [8, 3, G2, '8']], { mlab: 'promedio 5' });
    fade(A(t, 9.2, .5), () => { mono('3 · (5 − 2) = 9', 330, 960, G1, { s: 24 }); mono('3 · (8 − 5) = 9', 750, 960, G2, { s: 24 }); });
    fade(A(t, 18.2, .5), () => seesaw(140, 940, 1210, 0, 10, 3.5, [[2, 3, G1, '2'], [8, 1, G2, '8']], { mlab: '3.5: más cerca del grupo grande' }));
  },
  // 9 · El grupo resuelto.
  resolver(t) {
    stars(t, .3);
    const px = seesaw(140, 940, 760, 3.3, 4.3, 3.9, t > 20 ? [[3.5, 1, G1, 'h'], [4.1, 2, G2, 'm']] : [[3.5, 1, G1, 'hombres'], [4.1, 1, G2, 'mujeres']], { mlab: '3.9' });
    fade(A(t, 1, .5), () => { brc(px(3.5), px(3.9), 830, G1, A(t, 1.2, .6)); mono('0.4', px(3.7), 890, G1, { s: 26 }); brc(px(3.9), px(4.1), 830, G2, A(t, 2, .6)); mono('0.2', px(4.0), 890, G2, { s: 26 }); });
    fade(A(t, 10.2, .5), () => F([['0.4 · ', 'r'], ['h', 'i', G1], [' = 0.2 · ', 'r'], ['m', 'i', G2], ['  →  ', 'r'], ['m', 'i', G2], [' = 2', 'r'], ['h', 'i', G1]], CX, 1000, 50));
    fade(A(t, 20.2, .5), () => F([['(10 · 3.5 + 20 · 4.1) ÷ 30 = ', 'r'], ['3.9', 'r', RES]], CX, 1110, 42));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['m = 2h', 'h = 2m', 'h = m', 'm = 3h'], 0, [['0.4 · h = 0.2 · m  →  ', 'r'], ['m = 2h', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['promedio × cantidad', 'r']], 'la suma'], [[['total ÷ tiempo total', 'r']], 'velocidad promedio'], [[['pesa por tamaño', 'r']], 'ponderado'], [[['equilibrio', 'r']], 'la balanza']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [G1, G2, AVG]);
    });
  },
};
