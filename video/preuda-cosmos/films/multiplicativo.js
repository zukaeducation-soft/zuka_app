// «Principio multiplicativo y árboles» · escenas de la lección pu-co-1. Motor en kit.js, preu.js y piezas.js; guion en
// multiplicativo.data.js. Cada nivel de decisión con su color; el resultado en verde y lo que se hace ahora en lima.
const L1 = C.cyan, L2 = C.amber, L3 = C.violet, RES = C.green, NOW = C.lime, BAD = C.mag;
const FLAG = ['#ff5a6a', '#5b8cff', '#ffc247', '#5ef2a6'];
// Bandera de tres franjas (colores por índice de FLAG) en (x, y), ancho w.
function flag(x, y, w, cs, o = {}) { const h = w * .2; cs.forEach((c, i) => { if (c == null) { stroke('rgba(160,180,240,.4)', 1.5, () => X.rect(x, y + i * h, w, h), { dash: [6, 6], g: 0 }); return; } X.save(); X.fillStyle = hexA(FLAG[c], o.a ?? .6); X.fillRect(x, y + i * h, w, h); X.restore(); }); stroke('rgba(225,232,255,.8)', 2, () => X.rect(x, y, w, h * 3), { g: 4 }); segL([x, y], [x, y + h * 3 + 60], 'rgba(225,232,255,.6)', 1, 3, { g: 0 }); }
const S = {
  // 1 · El reto: la bandera de tres franjas.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Se va a diseñar una bandera de tres franjas horizontales.', 'Para pintarlas se dispone de cuatro colores y la única', 'condición es que dos franjas vecinas no tengan el mismo', 'color. La cantidad de banderas distintas es:'], opts: ['36', '24', '64', '48'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      FLAG.forEach((c, i) => dot(330 + i * 140, 930, 26, c, 18));
      [[0, 1, 0], [2, 3, 1], [1, 0, 2]].forEach((cs, i) => fade(A(t, 10.6 + i * .8, .5), () => flag(130 + i * 230, 1040, 190, cs)));
      fade(A(t, 13.6, .5), () => { flag(820, 1040, 150, [0, 0, 1]); check(895, 1220, 20, false, A(t, 14, .5)); });
    });
  },
  // 2 · El árbol de las pintas.
  arbol(t) {
    stars(t, .3);
    treeD(160, 820, 600, 320, [2, 3], seg(t, 1, 12), [L1, L2], (l, i) => (l === 0 ? ['camisa 1', 'camisa 2'][i] : ['jean', 'sudadera', 'pantalón'][i % 3]));
    fade(A(t, 18.2, .5), () => F([['2 · 3 = ', 'r'], ['6', 'r', RES], [' pintas', 'r']], CX, 1260, 60));
  },
  // 3 · El principio multiplicativo: el menú.
  regla(t) {
    stars(t, .3);
    treeD(120, 820, 640, 300, [3, 4, 2], seg(t, 1, 14), [L1, L2, L3]);
    fade(A(t, 1, .5), () => { mono('entradas', 420, 470, L1, { s: 22 }); mono('platos', 720, 470, L2, { s: 22 }); mono('postres', 1000, 470, L3, { s: 22, a: 'r' }); });
    fade(A(t, 9.2, .5), () => boxes(CX, 1270, [3, 4, 2], [L1, L2, L3], { labs: ['entradas', 'platos', 'postres'] }));
    fade(A(t, 18.2, .5), () => F([['3 · 4 · 2 = ', 'r'], ['24', 'r', RES], [' menús', 'r']], CX, 1440, 52));
  },
  // 4 · Problema: el código de letras y dígitos.
  casillas(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un código se forma con tres letras seguidas de dos dígitos.', 'Las letras se escogen entre A, B y C, y pueden repetirse;', 'los dígitos deben ser impares y distintos entre sí. La', 'cantidad de códigos distintos que se pueden formar es:'], opts: ['540', '675', '120', '270'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      boxes(CX, 1030, [3, 3, 3, 5, 4], [L1, L1, L1, L2, L2], { k: seg(t, 10.4, 14), labs: ['letra', 'letra', 'letra', 'impar', 'impar ≠'], gap: 180, w: 110, s: 52 });
      fade(A(t, 20.4, .5), () => F([['27 · 20 = ', 'r'], ['540', 'r', RES]], CX, 1300, 56));
    });
  },
  // 5 · Problema: la clave de Camilo.
  clave(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Camilo quiere crear una clave de 4 cifras usando solo los', 'dígitos 1, 2 y 3, de modo que nunca queden dos dígitos', 'iguales uno junto al otro. La cantidad de claves es:'], opts: ['24', '18', '81', '36'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      boxes(CX, 1000, [3, 2, 2, 2], [L1, L2, L2, L2], { k: seg(t, 10.4, 14), labs: ['cualquiera', 'no repite', 'no repite', 'no repite'] });
      fade(A(t, 14, .5), () => { ['1213', '3231', '2121'].forEach((s, i) => mono(s, 300 + i * 240, 1200, NOW, { s: 32 })); mono('1123', 300 + 3 * 240 - 20, 1200, BAD, { s: 32 }); });
      fade(A(t, 20.4, .5), () => F([['3 · 2 · 2 · 2 = ', 'r'], ['24', 'r', RES], ['   ·   3', 'r'], ['4', 'sp'], [' = 81 sin condición', 'r', C.mute]], CX, 1340, 44));
    });
  },
  // 6 · Primero la restricción.
  restriccion(t) {
    stars(t, .3);
    boxes(CX, 680, [t > 9.2 ? 8 : null, t > 10.4 ? 9 : null, t > 11.2 ? 9 : null], [NOW, L1, L1], { labs: ['centenas', 'decenas', 'unidades'] });
    fade(A(t, 1.4, .5), () => mono('sin el 5 · la primera, sin el 0', CX, 520, NOW, { s: 26 }));
    fade(A(t, 9.4, .5), () => { const digits = '0123456789'; [...digits].forEach((d, i) => { const x = 210 + i * 70, bad = d === '0' || d === '5'; bigT(d, x, 930, bad ? C.dim : NOW, 44); if (bad) check(x, 915, 18, false, 1); }); mono('primera cifra: 8 opciones', CX, 990, NOW, { s: 24 }); });
    fade(A(t, 18.2, .5), () => F([['8 · 9 · 9 = ', 'r'], ['648', 'r', RES]], CX, 1150, 60));
  },
  // 7 · Los capicúas de cuatro cifras.
  capicua(t) {
    stars(t, .3);
    ['3443', '5005', '7117'].forEach((s, i) => fade(A(t, 1 + i * .6, .4), () => bigT(s, 260 + i * 280, 560, C.ink, 56)));
    fade(A(t, 9.2, .5), () => {
      const x = boxes(CX, 800, ['a', 'b', 'b', 'a'], [L1, L2, L2, L1], { op: ' ' });
      stroke(hexA(L1, .7), 2.5, () => { X.moveTo(x(0), 730); X.quadraticCurveTo(CX, 620, x(3), 730); }, { g: 8 }); stroke(hexA(L2, .7), 2.5, () => { X.moveTo(x(1), 730); X.quadraticCurveTo(CX, 680, x(2), 730); }, { g: 8 });
      mono('se copian', CX, 640, C.mute, { s: 22 });
    });
    fade(A(t, 18.2, .5), () => { F([['a', 'i', L1], [': 9 (no 0)   ·   ', 'r'], ['b', 'i', L2], [': 10', 'r']], CX, 990, 46); F([['9 · 10 = ', 'r'], ['90', 'r', RES]], CX, 1090, 60); });
  },
  // 8 · «Y» multiplica, «o» suma.
  yo(t) {
    stars(t, .3);
    const A0 = [170, 780], B0 = [540, 780], C0 = [910, 780];
    [A0, B0, C0].forEach((p, i) => nodeC(p[0], p[1], 46, C.ink, 'ABC'[i], { s: 40 }));
    [-60, 0, 60].forEach((d, i) => fade(A(t, 1 + i * .3, .3), () => stroke(L1, 3, () => { X.moveTo(A0[0] + 46, A0[1]); X.quadraticCurveTo(355, A0[1] + d * 1.6, B0[0] - 46, B0[1]); })));
    [-40, 40].forEach((d, i) => fade(A(t, 2.4 + i * .3, .3), () => stroke(L2, 3, () => { X.moveTo(B0[0] + 46, B0[1]); X.quadraticCurveTo(725, B0[1] + d * 1.8, C0[0] - 46, C0[1]); })));
    fade(A(t, 3.4, .5), () => F([['3 · 2 = 6', 'r']], CX, 1020, 50));
    fade(A(t, 9.2, .5), () => [-1, 1].forEach((s, i) => stroke(L3, 3, () => { X.moveTo(A0[0], A0[1] + s * 46); X.quadraticCurveTo(CX, A0[1] + s * 290, C0[0], C0[1] + s * 46); })));
    fade(A(t, 10.4, .5), () => mono('2 directos', CX, 520, L3, { s: 24 }));
    fade(A(t, 18.2, .5), () => { F([['6 + 2 = ', 'r'], ['8', 'r', RES]], CX, 1130, 56); mono('y: ×   ·   o: +', CX, 1200, NOW, { s: 28 }); });
  },
  // 9 · La bandera resuelta.
  resolver(t) {
    stars(t, .3);
    boxes(CX, 560, [4, t > 9.6 ? 3 : null, t > 10.6 ? 3 : null], [L1, L2, L3], { labs: ['arriba', 'medio', 'abajo'] });
    const cs = [[0, null, null], [0, 1, null], [0, 1, 0]][t < 10 ? 0 : t < 20 ? 1 : 2];
    flag(220, 760, 240, cs);
    fade(A(t, 10.4, .5), () => mono('el medio evita el de arriba', 740, 830, L2, { s: 22 }));
    fade(A(t, 11.2, .5), () => mono('abajo evita el del medio', 740, 880, L3, { s: 22 }));
    fade(A(t, 20.4, .5), () => { mono('arriba y abajo pueden coincidir', CX, 1060, NOW, { s: 24 }); F([['4 · 3 · 3 = ', 'r'], ['36', 'r', RES]], CX, 1180, 64); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['36', '24', '64', '48'], 0, [['4 · 3 · 3 = ', 'r'], ['36', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['2 · 3 = 6', 'r']], 'el árbol'], [[['casilla por decisión', 'r']], 'se multiplican'], [[['primero lo exigente', 'r']], 'restricciones'], [[['y: ×  ·  o: +', 'r']], 'pasos o caminos']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [L1, NOW, L2]);
    });
  },
};
