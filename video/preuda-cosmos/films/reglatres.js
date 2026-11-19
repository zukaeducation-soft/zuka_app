// «Regla de tres simple y compuesta» · escenas de la lección pu-pr-2. Motor en kit.js, preu.js y piezas.js; guion en
// reglatres.data.js. El trabajo hecho en cian, lo que falta en ámbar, lo inverso en violeta, el resultado en verde y la unidad
// en lima.
const DONE = C.cyan, LEFT = C.amber, INV = C.violet, RES = C.green, NOW = C.lime, BAD = C.mag;
// Cuadrícula de trabajo: filas (trabajadores) × columnas (días), celdas de u px desde (x, y); col(i, j) da el color o null.
function work(x, y, rows, cols, u, col, o = {}) {
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const c = col(i, j), xx = x + j * u, yy = y + i * u;
    if (c) { X.save(); X.fillStyle = hexA(c, .4); X.fillRect(xx + 2, yy + 2, u - 4, u - 4); X.restore(); stroke(c, 1.5, () => X.rect(xx + 2, yy + 2, u - 4, u - 4), { g: 6 }); }
    else stroke('rgba(160,180,240,.25)', 1, () => X.rect(xx + 2, yy + 2, u - 4, u - 4), { g: 0 });
  }
  if (o.rl) mono(o.rl, x - 16, y + rows * u / 2 + 8, C.mute, { s: 20, a: 'r' });
  if (o.cl) mono(o.cl, x + cols * u / 2, y + rows * u + 36, C.mute, { s: 20 });
}
const S = {
  // 1 · El reto: los obreros que se van.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Seis obreros, que trabajan todos al mismo ritmo, pueden', 'terminar una obra en 12 días. Después de 4 días de trabajo', 'se retiran 2 obreros y los demás continúan hasta terminar.', 'La cantidad total de días que duró la obra fue:'], opts: ['16', '14', '18', '20'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      const k = seg(t, 10, 13) * 4;
      work(180, 980, 6, 12, 60, (i, j) => (j < Math.floor(k) ? DONE : null), { rl: 'obreros', cl: 'días' });
      fade(A(t, 14, .5), () => { [4, 5].forEach(i => stroke(BAD, 3, () => { X.moveTo(150, 980 + i * 60 + 30); X.lineTo(180 + 4 * 60, 980 + i * 60 + 30); }, { g: 10 })); mono('se van 2', 180 + 4 * 60 + 90, 980 + 5 * 60 + 8, BAD, { s: 22, a: 'l' }); });
    });
  },
  // 2 · Directa: la receta.
  directa(t) {
    stars(t, .3);
    const row = (y, n, lab, c) => { for (let i = 0; i < n; i++) dot(130 + (i % 15) * 54, y + Math.floor(i / 15) * 54, 16, c, 10); mono(lab, 130, y - 40, c, { s: 22, a: 'l' }); };
    row(560, 12, '12 galletas', LEFT); bar(130, 680, 200, 60, DONE, 1); mono('200 g', 360, 720, DONE, { s: 24, a: 'l' });
    fade(A(t, 9.2, .5), () => { row(900, Math.round(lerp(12, 30, eio(seg(t, 9.6, 13)))), '30 galletas', LEFT); bar(130, 1080, 500, 60, DONE, eio(seg(t, 9.6, 13)) * 0.6 + .4); });
    fade(A(t, 13.4, .5), () => mono('500 g', 660, 1120, DONE, { s: 24, a: 'l' }));
    fade(A(t, 18.2, .5), () => F([['200 / 12 = ', 'r'], ['500 / 30', 'r', RES], ['   ·   × 2.5', 'r', NOW]], CX, 1300, 50));
  },
  // 3 · Inversa: los pintores.
  inversa(t) {
    stars(t, .3);
    work(150, 560, 3, 8, 70, () => INV, { rl: '3 pintores', cl: '8 días' });
    fade(A(t, 9.2, .5), () => work(150, 900, 4, Math.round(lerp(8, 6, eio(seg(t, 9.6, 12)))), 70, () => LEFT, { rl: '4 pintores', cl: t > 12 ? '6 días' : '' }));
    fade(A(t, 18.2, .5), () => F([['3 · 8 = ', 'r'], ['24', 'r', NOW], [' = 4 · 6', 'r']], CX, 1300, 58));
  },
  // 4 · Directa o inversa: qué pasa al duplicar.
  cual(t) {
    stars(t, .3);
    jT('Si una se duplica, la otra…', CX, 480, C.ink, 42);
    fade(A(t, 9.2, .5), () => { axes(150, 1050, 330, 330, 'kilos', 'precio', eo(seg(t, 9.4, 10.4))); curve(u => [150 + u * 320, 1050 - u * 320], 0, 1, DONE, eo(seg(t, 10.4, 12))); mono('directa: también se duplica', 320, 1130, DONE, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { axes(610, 1050, 330, 330, 'obreros', 'días', eo(seg(t, 18.4, 19.4))); curve(u => { const x = .15 + u * .85; return [610 + x * 320, 1050 - (.15 / x) * 320]; }, 0, 1, INV, eo(seg(t, 19.4, 21))); mono('inversa: se reduce a la mitad', 780, 1130, INV, { s: 22 }); });
  },
  // 5 · Problema: las ocho llaves.
  llaves(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Ocho llaves iguales llenan una piscina en 15 horas. El', 'tiempo que tardan 12 de esas llaves en llenar la misma', 'piscina es:'], opts: ['10 horas', '22.5 horas', '12 horas', '9 horas'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      work(200, 860, 8, 15, 40, () => INV, { rl: '8 llaves', cl: '15 h' });
      fade(A(t, 12, .5), () => mono('120 horas-llave', 820, 1040, NOW, { s: 24, a: 'l' }));
      fade(A(t, 20.2, .5), () => { work(200, 1150, 12, Math.round(lerp(15, 10, eio(seg(t, 20.4, 22)))), 26, () => LEFT, { rl: '12 llaves', cl: t > 22 ? '10 h' : '' }); F([['120 ÷ 12 = ', 'r'], ['10 h', 'r', RES]], 760, 1360, 46); });
    });
  },
  // 6 · Medir el trabajo en jornadas.
  jornadas(t) {
    stars(t, .3);
    const n = Math.floor(72 * seg(t, 1, 7));
    work(140, 560, 6, 12, 66, (i, j) => (j * 6 + i < n ? DONE : null), { rl: '6', cl: '12 días' });
    bigT(String(n), CX, 1080, DONE, 64); mono('jornadas', CX, 1130, C.mute, { s: 24 });
    fade(A(t, 18.2, .5), () => { F([['hecho', 'r', DONE], ['  +  ', 'r'], ['lo que falta', 'r', LEFT], ['  =  72', 'r']], CX, 1260, 46); mono('lo que falta se reparte entre los que quedan', CX, 1330, NOW, { s: 24 }); });
  },
  // 7 · Problema: la regla de tres compuesta.
  compuesta(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una fábrica, 4 máquinas iguales producen 600 piezas en', '5 horas. La cantidad de piezas que producen 6 de esas', 'máquinas en 8 horas es:'], opts: ['1 440', '1 200', '960', '1 800'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      stepsDown(t, 10, 1.2, [[[['600 piezas', 'r', C.ink]], '4 máquinas · 5 horas'], [[['600 ÷ 4 = 150', 'r']], 'una máquina en 5 horas'], [[['150 ÷ 5 = ', 'r'], ['30', 'r', NOW]], 'una máquina en una hora']], 880, 120, 44);
      fade(A(t, 20.2, .5), () => F([['30 · 6 · 8 = ', 'r'], ['1 440', 'r', RES]], CX, 1300, 56));
    });
  },
  // 8 · Pasar por la unidad.
  unidad(t) {
    stars(t, .3);
    const nodes = [['600', C.ink], ['150', C.ink], ['30', NOW], ['180', C.ink], ['1 440', RES]], ops = ['÷ 4', '÷ 5', '× 6', '× 8'];
    nodes.forEach(([v, c], i) => fade(A(t, i < 3 ? 1 + i * 1.6 : 9.4 + (i - 3) * 1.6, .5), () => { const y = 520 + i * 170; nodeC(CX, y, 62, c === C.ink ? DONE : c, v, { s: 34 }); if (i) { arrow(CX, y - 108, CX, y - 66, hexA(NOW, .7), 1, 2.5, { h: 10 }); mono(ops[i - 1], CX + 90, y - 80, i < 3 ? LEFT : INV, { s: 26, a: 'l' }); } }));
    fade(A(t, 4.4, .5), () => mono('la unidad: una máquina, una hora', CX - 330, 860, NOW, { s: 22 }));
    fade(A(t, 18.2, .5), () => mono('más máquinas y más horas: el número crece', CX, 1430, RES, { s: 26 }));
  },
  // 9 · Los obreros resueltos.
  resolver(t) {
    stars(t, .3);
    const u = 52, x = 150, y = 520;
    work(x, y, 6, 16, u, (i, j) => (j < 4 && t > 1.2 ? DONE : t > 10.4 && i < 4 && j >= 4 && j < 4 + Math.floor(12 * seg(t, 10.6, 15)) ? LEFT : null), { rl: 'obreros', cl: 'días' });
    F([['6 · 12 = ', 'r'], ['72', 'r', NOW], [' jornadas;  6 · 4 = ', 'r'], ['24', 'r', DONE]], CX, 940, 42);
    fade(A(t, 10.2, .5), () => F([['72 − 24 = ', 'r'], ['48', 'r', LEFT], ['  para 4 obreros', 'r']], CX, 1030, 42));
    fade(A(t, 20.2, .5), () => { F([['48 ÷ 4 = 12   ·   4 + 12 = ', 'r'], ['16 días', 'r', RES]], CX, 1130, 46); brc(x, x + 16 * u, y - 30, RES, 1, -1); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['16', '14', '18', '20'], 0, [['4 + 48 ÷ 4 = ', 'r'], ['16 días', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['a / b constante', 'r']], 'directa'], [[['a · b constante', 'r']], 'inversa'], [[['obreros · días', 'r']], 'jornadas de trabajo'], [[['pasar por la unidad', 'r']], 'compuesta']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [DONE, NOW, LEFT]);
    });
  },
};
