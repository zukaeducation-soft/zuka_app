// «MCM y MCD» · escenas de la lección pu-nu-2. Motor en kit.js, preu.js y piezas.js; guion en mcm.data.js.
// El primer ritmo en cian, el segundo en ámbar, el tercero en violeta, lo común en lima y el resultado en verde.
const R1 = C.cyan, R2 = C.amber, R3 = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Recta de tiempo con marcas cada `step` desde `from` para un ritmo.
function beats(x0, x1, y, lo, hi, step, from, col, k = 1, o = {}) {
  const px = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
  for (let v = from; v <= hi + 1e-9; v += step) { if (px(v) > lerp(x0, x1, k)) break; const both = o.both && o.both(v); dot(px(v), y, both ? 12 : 8, both ? NOW : col, both ? 16 : 8); if (o.lab) mono(o.lab(v), px(v), y + 38, both ? NOW : C.mute, { s: 18 }); }
  return px;
}
const S = {
  // 1 · El reto: tres luces.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Tres luces intermitentes se encienden cada 12, 18 y 30 segundos.', 'Si las tres se encienden a la vez en este momento, las veces que', 'volverán a encenderse al mismo tiempo en los próximos 30', 'minutos son:'], opts: ['10', '5', '6', '12'], ok: 0 });
    fade(A(t, 9.6, .6), () => [[12, R1], [18, R2], [30, R3]].forEach(([s, c], i) => { const y = 980 + i * 110; mono(`${s} s`, 140, y + 8, c, { s: 24, a: 'r' }); stroke('rgba(200,210,240,.35)', 2, () => { X.moveTo(170, y); X.lineTo(980, y); }, { g: 0 }); beats(170, 980, y, 0, 200, s, 0, c, seg(t, 10, 15)); }));
  },
  // 2 · Cuándo coinciden.
  coincidir(t) {
    stars(t, .3);
    const both = v => t > 9.2 && v % 12 === 0;
    [[4, R1, 640], [6, R2, 780]].forEach(([s, c, y]) => { mono(`cada ${s}`, 140, y + 8, c, { s: 24, a: 'r' }); stroke('rgba(200,210,240,.35)', 2, () => { X.moveTo(170, y); X.lineTo(980, y); }, { g: 0 }); beats(170, 980, y, 0, 40, s, s, c, seg(t, .8, 5), { both, lab: v => String(v) }); });
    fade(A(t, 9.4, .5), () => F([['mcm(4, 6) = ', 'r'], ['12', 'r', NOW]], CX, 950, 54));
    fade(A(t, 18.2, .5), () => mono('12, 24, 36… coinciden cada 12', CX, 1040, NOW, { s: 26 }));
  },
  // 3 · Con los factores.
  factores(t) {
    stars(t, .3);
    F([['8 = ', 'r'], ['2', 'r', R1], ['3', 'sp', R1]], 330, 580, 56); F([['12 = ', 'r'], ['2', 'r', R1], ['2', 'sp', R1], [' · ', 'r'], ['3', 'r', R2]], 750, 580, 56);
    fade(A(t, 9.2, .5), () => { F([['mcm = ', 'r'], ['2', 'r', R1], ['3', 'sp', R1], [' · ', 'r'], ['3', 'r', R2], [' = ', 'r'], ['24', 'r', NOW]], CX, 740, 56); mono('cada primo, con su mayor exponente', CX, 810, C.mute, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { F([['mcd = ', 'r'], ['2', 'r', R1], ['2', 'sp', R1], [' = ', 'r'], ['4', 'r', RES]], CX, 960, 56); mono('solo los comunes, con el menor exponente', CX, 1030, C.mute, { s: 24 }); });
  },
  // 4 · Problema: los buses de dos rutas.
  buses(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['De una terminal salen buses de dos rutas. Los de la ruta 1', 'salen cada 12 minutos desde las 6:00 a. m. y los de la ruta 2,', 'cada 20 minutos desde las 6:20 a. m. La primera hora en que', 'sale un bus de cada ruta al mismo tiempo es:'], opts: ['7:00', '6:40', '7:20', '8:00'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const lab = v => `${6 + Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`, both = v => t > 20.4 && v === 60;
      [[12, 0, R1, 1050, 'ruta 1'], [20, 20, R2, 1200, 'ruta 2']].forEach(([s, f, c, y, n]) => { mono(n, 140, y + 8, c, { s: 22, a: 'r' }); stroke('rgba(200,210,240,.35)', 2, () => { X.moveTo(170, y); X.lineTo(980, y); }, { g: 0 }); beats(170, 980, y, 0, 75, s, f, c, seg(t, 10.2, 18), { both, lab }); });
      fade(A(t, 20.4, .5), () => F([['primera vez juntos: ', 'r'], ['7:00', 'r', RES]], CX, 1350, 46));
    });
  },
  // 5 · Partir en pedazos iguales.
  partir(t) {
    stars(t, .3);
    const u = 22, piece = t > 18.2 ? 12 : t > 9 ? 6 : 0;
    [[24, R1, 620], [36, R2, 760]].forEach(([L, c, y]) => { pill(150 + L * u / 2, y, L * u, 60, c, null, { r: 8, fill: .2 }); mono(`${L} cm`, 140, y + 8, c, { s: 22, a: 'r' }); if (piece) for (let k = piece; k < L; k += piece) stroke(NOW, 3, () => { X.moveTo(150 + k * u, y - 40); X.lineTo(150 + k * u, y + 40); }, { g: 10 }); });
    fade(A(t, 9.2, .5), () => mono('divisores comunes: 1, 2, 3, 4, 6, 12', CX, 880, C.mute, { s: 26 }));
    fade(A(t, 18.2, .5), () => { F([['mcd(24, 36) = ', 'r'], ['12 cm', 'r', RES]], CX, 990, 52); mono('2 trozos de una, 3 de la otra', CX, 1070, NOW, { s: 24 }); });
  },
  // 6 · Problema: el piso del salón.
  baldosas(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['El piso rectangular de un salón mide 360 cm de largo y 270 cm', 'de ancho. Se quiere cubrir con baldosas cuadradas iguales, del', 'mayor tamaño posible, sin cortar ninguna. Las baldosas son:'], opts: ['12', '9', '16', '108'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const s = 2, x0 = CX - 360, y0 = 920, W = 360 * s, H = 270 * s;
      stroke('rgba(225,232,255,.85)', 3, () => X.rect(x0, y0, W, H), { g: 6 }); mono('360', CX, y0 - 16, C.mute, { s: 24 }); mono('270', x0 - 30, y0 + H / 2, C.mute, { s: 24, a: 'r' });
      fade(A(t, 10.6, .5), () => { for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const k = i + 4 * j; fade(A(t, 11 + k * .25, .3), () => pill(x0 + (i + .5) * 90 * s, y0 + (j + .5) * 90 * s, 90 * s - 10, 90 * s - 10, t > 20.4 ? RES : R1, t > 20.4 ? k + 1 : null, { r: 8, fill: .2, s: 34 })); } });
      fade(A(t, 12, .5), () => mono('lado: mcd = 90', CX, y0 + H + 40, NOW, { s: 24 }));
    });
  },
  // 7 · MCM o MCD.
  cual(t) {
    stars(t, .3);
    fade(A(t, .8, .5), () => { pill(330, 600, 380, 110, R1, 'MCM', { s: 50 }); ['coincidir', 'encontrarse', 'volver a pasar'].forEach((w, i) => mono(w, 330, 700 + i * 44, C.ink, { s: 24 })); });
    fade(A(t, 9.2, .5), () => { pill(750, 600, 380, 110, R2, 'MCD', { s: 50 }); ['partir', 'repartir', 'el mayor tamaño'].forEach((w, i) => mono(w, 750, 700 + i * 44, C.ink, { s: 24 })); });
    fade(A(t, 18.2, .5), () => F([['mcd ≤ ', 'r', R2], ['números', 'r'], [' ≤ mcm', 'r', R1]], CX, 1000, 50));
  },
  // 8 · Sobran tres.
  residuo(t) {
    stars(t, .3);
    [4, 5, 6].forEach((d, i) => pill(250 + i * 290, 600, 220, 90, [R1, R2, R3][i], `÷ ${d}: sobra 3`, { s: 28 }));
    fade(A(t, 9.2, .5), () => { F([['n', 'i'], [' − 3', 'r'], [' es múltiplo de 4, 5 y 6', 'r']], CX, 760, 44); });
    fade(A(t, 18.2, .5), () => { F([['mcm(4, 5, 6) = ', 'r'], ['60', 'r', NOW]], CX, 880, 50); F([['60 + 3 = ', 'r'], ['63', 'r', RES]], CX, 970, 56); });
  },
  // 9 · Las luces resueltas.
  resolver(t) {
    stars(t, .3);
    F([['12 = 2', 'r'], ['2', 'sp'], [' · 3     18 = 2 · 3', 'r'], ['2', 'sp'], ['     30 = 2 · 3 · 5', 'r']], CX, 560, 42);
    fade(A(t, 10.2, .5), () => { F([['mcm = ', 'r'], ['2', 'r', R1], ['2', 'sp', R1], [' · ', 'r'], ['3', 'r', R2], ['2', 'sp', R2], [' · ', 'r'], ['5', 'r', R3], [' = ', 'r'], ['180 s', 'r', NOW]], CX, 690, 52); mono('= 3 minutos', CX, 760, NOW, { s: 28 }); });
    fade(A(t, 20.2, .5), () => { const px = v => 170 + v / 30 * 810; stroke('rgba(225,232,255,.7)', 3, () => { X.moveTo(170, 920); X.lineTo(980, 920); }, { g: 0 }); for (let m = 3; m <= 30; m += 3) { dot(px(m), 920, 12, RES, 14); mono(String(m), px(m), 965, C.mute, { s: 20 }); } F([['30 ÷ 3 = ', 'r'], ['10', 'r', RES], [' veces', 'r']], CX, 1080, 52); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['10', '5', '6', '12'], 0, [['mcm = 180 s = 3 min  →  30 ÷ 3 = ', 'r'], ['10', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['mayor exponente', 'r']], 'mcm: coincidir'], [[['primos comunes, menor', 'r']], 'mcd: partir'], [[['listar si no empiezan juntos', 'r']], 'ritmos desfasados'], [[['mcm + residuo', 'r']], 'sobra lo mismo']], 420, 170, 38);
      endCard(t, 19.6, D.TITLE, D.LINE, [R1, R2, R3]);
    });
  },
};
