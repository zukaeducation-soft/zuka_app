// «Velocidad y trabajo conjunto» · escenas de la lección pu-pr-3. Motor en kit.js, preu.js y piezas.js; guion en
// velocidad.data.js. Un móvil o una llave en cian, el otro en ámbar, lo que resta en rosa, el agua en azul, el resultado en
// verde y lo que se hace ahora en lima.
const MA = C.cyan, MB = C.amber, OUT = C.mag, WAT = C.blue, RES = C.green, NOW = C.lime;
const WH = 'rgba(225,232,255,.85)';
// Tanque (caja) lleno hasta w (0–1), con su borde; caños que entran (cols) y uno que sale.
function tank(x, y, w, h, fill, o = {}) {
  X.save(); X.fillStyle = hexA(WAT, .35); X.shadowColor = WAT; X.shadowBlur = 12; X.fillRect(x, y + h * (1 - clamp(fill)), w, h * clamp(fill)); X.restore();
  stroke(WH, 3, () => { X.moveTo(x, y); X.lineTo(x, y + h); X.lineTo(x + w, y + h); X.lineTo(x + w, y); }, { g: 6 });
  (o.ins || []).forEach((c, i) => { const px = x + 40 + i * 90; stroke(c, 6, () => { X.moveTo(px - 50, y - 60); X.lineTo(px, y - 60); X.lineTo(px, y - 20); }, { g: 10 }); if (o.flow) stroke(hexA(WAT, .7), 3, () => { X.moveTo(px, y - 18); X.lineTo(px, y + h * (1 - clamp(fill))); }, { dash: [10, 8], g: 0 }); });
  if (o.out) { stroke(OUT, 6, () => { X.moveTo(x + w, y + h - 30); X.lineTo(x + w + 70, y + h - 30); X.lineTo(x + w + 70, y + h + 30); }, { g: 10 }); }
  for (let k = 1; k < (o.marks || 0); k++) { const yy = y + h * (1 - k / o.marks); stroke('rgba(160,180,240,.4)', 1.5, () => { X.moveTo(x, yy); X.lineTo(x + 30, yy); }, { g: 0 }); }
}
const train = (x, y, col, lab) => { pill(x, y, 120, 54, col, lab, { s: 24, fill: .25, r: 12 }); };
const S = {
  // 1 · El reto: dos llaves y un desagüe.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Un tanque tiene dos llaves y un desagüe. La primera llave', 'sola lo llena en 6 horas, la segunda sola en 3 horas y el', 'desagüe, estando el tanque lleno, lo vacía en 4 horas. Si', 'el tanque está vacío y se abren las dos llaves y el desagüe', 'al mismo tiempo, el tiempo que tarda en llenarse es:'], opts: ['4 horas', '2 horas', '5 horas', '3 horas'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      tank(330, 1080, 420, 320, .15 + .1 * Math.sin(t * .8), { ins: [MA, MB], out: t > 12, flow: true });
      fade(A(t, 10.4, .5), () => { mono('6 h', 250, 1010, MA, { s: 24 }); mono('3 h', 340, 1010, MB, { s: 24 }); });
      fade(A(t, 12.4, .5), () => mono('4 h', 840, 1460, OUT, { s: 24 }));
    });
  },
  // 2 · d = v · t.
  dvt(t) {
    stars(t, .3);
    const k = seg(t, 1, 6), x0 = 140, x1 = 940, y = 640;
    segL([x0, y], [x1, y], WH, 1, 3, { g: 4 }); for (let h = 0; h <= 3; h++) { const x = lerp(x0, x1, h / 3); segL([x, y - 12], [x, y + 12], WH, 1, 2, { g: 0 }); mono(`${h} h`, x, y + 50, C.mute, { s: 22 }); mono(`${80 * h} km`, x, y - 30, MA, { s: 22 }); }
    train(lerp(x0, x1, k), y - 80, MA, '80 km/h');
    fade(A(t, 9.2, .5), () => {
      const T0 = [CX, 860], s = 220; polyL([T0, [CX - s, 860 + s * 1.1], [CX + s, 860 + s * 1.1]], WH, { lw: 3 }); segL([CX - s * .55, 860 + s * .6], [CX + s * .55, 860 + s * .6], WH, 1, 2); segL([CX, 860 + s * .6], [CX, 860 + s * 1.1], WH, 1, 2);
      bigT('d', CX, 860 + s * .45, NOW, 56, { k: 'i' }); bigT('v', CX - s * .35, 860 + s * .98, MA, 50, { k: 'i' }); bigT('t', CX + s * .35, 860 + s * .98, MB, 50, { k: 'i' });
    });
    fade(A(t, 18.2, .5), () => mono('km/h con horas · m/s con segundos', CX, 1210, NOW, { s: 26 }));
  },
  // 3 · Problema: los trenes que se cruzan.
  encuentro(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Dos ciudades, M y N, están a 360 km por una misma vía.', 'A la misma hora sale un tren de M hacia N a 70 km/h y', 'otro de N hacia M a 50 km/h. La distancia de M al punto', 'donde se cruzan los trenes, en kilómetros, es:'], opts: ['210', '180', '150', '240'], ok: 0, rv: 22.6 });
    fade(A(t, 9.6, .5), () => {
      const x0 = 120, x1 = 960, y = 1130, px = km => lerp(x0, x1, km / 360), h = 3 * eio(seg(t, 10.6, 16));
      segL([x0, y], [x1, y], WH, 1, 4, { g: 4 }); ptL([x0, y], C.ink, 'M', 0, 50, { k: 'r' }); ptL([x1, y], C.ink, 'N', 0, 50, { k: 'r' });
      train(px(70 * h), y - 50, MA, '70'); train(px(360 - 50 * h), y - 110, MB, '50');
      for (let k = 1; k <= 3; k++) fade(A(t, 10.6 + k * 1.8, .3), () => { mono(`${k} h`, px(70 * k), y + 90, MA, { s: 20 }); mono(`${k} h`, px(360 - 50 * k), y + 120, MB, { s: 20 }); });
      fade(A(t, 16.2, .5), () => F([['120 km/h → 360 ÷ 120 = ', 'r'], ['3 h', 'r', NOW]], CX, 900, 44));
      fade(A(t, 20.4, .5), () => { brc(x0, px(210), y + 150, RES, 1); F([['70 · 3 = ', 'r'], ['210 km', 'r', RES]], px(105), y + 240, 42); });
    });
  },
  // 4 · El alcance.
  alcance(t) {
    stars(t, .3);
    const x0 = 120, x1 = 960, y = 760, px = km => lerp(x0, x1, km / 70), T = 3 * seg(t, 1, 15), cyc = 15 * T, moto = T > 2 ? 45 * (T - 2) : 0;
    segL([x0, y], [x1, y], WH, 1, 3, { g: 4 }); for (let km = 0; km <= 60; km += 15) mono(String(km), px(km), y + 46, C.mute, { s: 20 });
    train(px(Math.min(cyc, 45)), y - 60, MA, '15'); if (T > 2) train(px(Math.min(moto, 45)), y - 130, MB, '45');
    mono(`t = ${Math.min(3, T).toFixed(1)} h`, CX, 560, C.ink, { s: 28 });
    fade(A(t, 9.2, .5), () => { brc(px(0), px(30), y + 80, MA, 1); mono('ventaja: 30 km', px(15), y + 160, MA, { s: 22 }); F([['45 − 15 = ', 'r'], ['30 km/h', 'r', NOW]], CX, 1080, 46); });
    fade(A(t, 18.2, .5), () => F([['30 ÷ 30 = ', 'r'], ['1 hora', 'r', RES]], CX, 1180, 52));
  },
  // 5 · Problema: la velocidad promedio del bus.
  promedio(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un bus viaja de una ciudad a otra a una velocidad', 'constante de 60 km/h y regresa por la misma vía a', '40 km/h. La velocidad promedio del bus en todo el', 'recorrido, en km/h, es:'], opts: ['48', '50', '52', '45'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const u = 130;
      bar(160, 960, 2 * u, 70, MA, eo(seg(t, 10.4, 11.6))); mono('ida: 120 km a 60 → 2 h', 160, 940, MA, { s: 22, a: 'l' });
      bar(160, 1100, 3 * u, 70, MB, eo(seg(t, 12, 13.4))); mono('vuelta: 120 km a 40 → 3 h', 160, 1080, MB, { s: 22, a: 'l' });
      for (let h = 0; h <= 5; h++) mono(`${h}`, 160 + h * u, 1210, C.mute, { s: 20 });
      fade(A(t, 20.2, .5), () => F([['240 km ÷ 5 h = ', 'r'], ['48 km/h', 'r', RES]], CX, 1320, 50));
    });
  },
  // 6 · La rapidez de un trabajo.
  rapidez(t) {
    stars(t, .3);
    const h = Math.min(3, Math.floor(seg(t, 1, 7.5) * 3 + 1e-9) + (t > 7.5 ? 0 : 0));
    tank(200, 560, 260, 420, h / 3, { ins: [MB], marks: 3 }); mono('3 h', 330, 1040, MB, { s: 24 });
    for (let k = 1; k <= h; k++) mono(`${k} h → ${k}/3`, 520, 980 - k * 140 + 70, MB, { s: 24, a: 'l' });
    fade(A(t, 9.2, .5), () => { tank(700, 560, 260, 420, seg(t, 9.6, 15), { ins: [MA], marks: 6 }); mono('6 h: 1/6 por hora', 830, 1040, MA, { s: 22 }); });
    fade(A(t, 18.2, .5), () => F([['rapidez = 1 ÷ ', 'r'], ['tiempo', 'i', NOW]], CX, 1200, 52));
  },
  // 7 · Dos obreras.
  juntas(t) {
    stars(t, .3);
    const x = 140, w = 800, y = 640, d = Math.min(6, Math.floor(seg(t, 9.4, 17) * 6 + 1e-9));
    stroke(WH, 3, () => X.rect(x, y, w, 110), { g: 6 });
    for (let i = 0; i < d; i++) { X.save(); X.fillStyle = hexA(MA, .4); X.fillRect(x + i * w / 6, y + 2, w / 10, 106); X.fillStyle = hexA(MB, .4); X.fillRect(x + i * w / 6 + w / 10, y + 2, w / 15, 106); X.restore(); }
    for (let i = 1; i < 6; i++) stroke('rgba(225,232,255,.4)', 1.5, () => { X.moveTo(x + i * w / 6, y); X.lineTo(x + i * w / 6, y + 110); }, { g: 0 });
    mono('una obra', x, y - 20, C.mute, { s: 22, a: 'l' });
    fade(A(t, 1, .5), () => { mono('obrera A: 10 días · 1/10 por día', CX, 860, MA, { s: 24 }); mono('obrera B: 15 días · 1/15 por día', CX, 910, MB, { s: 24 }); });
    fade(A(t, 9.4, .5), () => F([['1/10 + 1/15 = 3/30 + 2/30 = ', 'r'], ['1/6', 'r', NOW]], CX, 1040, 44));
    bigT(`día ${d}`, CX, 580, C.ink, 36);
    fade(A(t, 18.2, .5), () => F([['juntas: ', 'r'], ['6 días', 'r', RES], ['  <  10', 'r']], CX, 1160, 50));
  },
  // 8 · El desagüe resta.
  desague(t) {
    stars(t, .3);
    tank(330, 620, 420, 360, .2 + .25 * seg(t, 9.4, 17), { ins: [MA], out: true, flow: true });
    fade(A(t, 1, .5), () => { mono('entra 1/2 por hora', 260, 520, MA, { s: 24 }); mono('sale 1/4 por hora', 820, 1060, OUT, { s: 24 }); });
    fade(A(t, 9.2, .5), () => F([['1/2', 'r', MA], [' − ', 'r'], ['1/4', 'r', OUT], [' = ', 'r'], ['1/4', 'r', RES], [' por hora', 'r']], CX, 1180, 50));
    fade(A(t, 18.2, .5), () => mono('si sale más de lo que entra, nunca se llena', CX, 1280, OUT, { s: 26 }));
  },
  // 9 · El tanque resuelto.
  resolver(t) {
    stars(t, .3);
    tank(330, 900, 420, 400, seg(t, 20.4, 26), { ins: [MA, MB], out: t > 10, flow: t > 20.4, marks: 4 });
    F([['1/6', 'r', MA], [' + ', 'r'], ['1/3', 'r', MB], [' = ', 'r'], ['1/2', 'r', NOW], [' por hora', 'r']], CX, 520, 48);
    fade(A(t, 10.2, .5), () => F([['1/2 − ', 'r'], ['1/4', 'r', OUT], [' = ', 'r'], ['1/4', 'r', RES], [' por hora', 'r']], CX, 620, 48));
    fade(A(t, 20.2, .5), () => { F([['4 · 1/4 = 1  →  ', 'r'], ['4 horas', 'r', RES]], CX, 720, 50); for (let k = 1; k <= Math.min(4, Math.floor(seg(t, 20.4, 26) * 4 + 1e-9)); k++) mono(`${k} h`, 800, 1300 - k * 100 + 60, RES, { s: 22, a: 'l' }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['4 horas', '2 horas', '5 horas', '3 horas'], 0, [['1/6 + 1/3 − 1/4 = ', 'r'], ['1/4', 'r', RES], [' → 4 horas', 'r']]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['d = v · t', 'r']], 'distancia'], [[['v₁ + v₂  ·  v₁ − v₂', 'r']], 'cruzarse · alcanzarse'], [[['total ÷ total', 'r']], 'velocidad promedio'], [[['1/t₁ + 1/t₂', 'r']], 'trabajo conjunto']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [MA, NOW, MB]);
    });
  },
};
