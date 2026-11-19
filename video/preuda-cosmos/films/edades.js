// «Edades, mezclas y monedas» · escenas de la lección pu-ec-2. Motor en kit.js, preu.js y piezas.js; guion en edades.data.js.
// El menor (hijo, primera mezcla) en cian, el mayor en ámbar, lo que no cambia en violeta, lo que se mira ahora en lima y el resultado en verde.
const P1 = C.cyan, P2 = C.amber, KEEP = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Vaso con una parte «sustancia» (abajo, en violeta) y el resto agua.
function glass(cx, y, w, h, frac, lab, o = {}) {
  stroke('rgba(225,232,255,.8)', 3, () => { X.moveTo(cx - w / 2, y - h); X.lineTo(cx - w / 2, y); X.lineTo(cx + w / 2, y); X.lineTo(cx + w / 2, y - h); }, { g: 6 });
  const fill = o.fill ?? 1; X.save(); X.fillStyle = hexA(C.blue, .22); X.fillRect(cx - w / 2 + 4, y - h * fill, w - 8, h * fill - 4); X.fillStyle = hexA(KEEP, .55); X.fillRect(cx - w / 2 + 4, y - h * fill * frac - 4, w - 8, h * fill * frac); X.restore();
  if (lab) mono(lab, cx, y + 40, o.c || C.ink, { s: 24 });
}
const S = {
  // 1 · El reto: el padre y el hijo.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Hace 4 años la edad de un padre era el triple de la edad de su', 'hijo, y dentro de 8 años será el doble. La suma de las edades', 'actuales del padre y del hijo es:'], opts: ['56', '48', '52', '64'], ok: 0 });
    fade(A(t, 9.6, .6), () => gridT(110, 920, 250, 100, ['hijo', 'padre'], ['hace 4', 'hoy', 'dentro de 8'], (i, j) => [(i ? ['3(h − 4)', 'p', '2(h + 8)'] : ['h − 4', 'h', 'h + 8'])[j], i ? P2 : P1, 'i'], { hw: 140, hh: 64, cs: 36, rs: 30, hs: 24 }));
  },
  // 2 · La tabla del tiempo.
  tabla(t) {
    stars(t, .3);
    gridT(110, 520, 250, 100, ['Sara', 'mamá'], ['antes', 'hoy', 'en 5 años'], (i, j) => { if (j === 1 && t > 9.2) return [String([10, 38][i]), i ? P2 : P1]; if (j === 2 && t > 10.6) return [String([15, 43][i]), i ? P2 : P1]; if (j === 0 && t > 18.2) return [String([3, 31][i]), i ? P2 : P1]; return null; }, { hw: 140, hh: 64, cs: 42, rs: 30, hs: 24 });
    fade(A(t, 18.2, .5), () => { [0, 1, 2].forEach(j => mono('28', 110 + 140 + 125 + j * 250, 860, KEEP, { s: 32 })); mono('diferencia: siempre 28', CX, 940, KEEP, { s: 28 }); });
  },
  // 3 · El año de Marta.
  marta(t) {
    stars(t, .3);
    const px = nline(140, 940, 760, 1980, 2035, { step: 5, s: 24, lab: v => v % 10 === 0 || v === 1985 });
    fade(A(t, 1, .5), () => { dot(px(2000), 760, 14, P1, 14); mono('2000: x', px(2000), 700, P1, { s: 24 }); dot(px(2030), 760, 14, P2, 14); mono('2030: 3x', px(2030), 700, P2, { s: 24 }); hop(px(2000), px(2030), 760, 80, NOW, A(t, 1.6, 1)); mono('+ 30', (px(2000) + px(2030)) / 2, 640, NOW, { s: 24 }); });
    fade(A(t, 9.2, .5), () => F([['x', 'i', P1], [' + 30 = 3', 'r'], ['x', 'i', P1], ['  →  2', 'r'], ['x', 'i', P1], [' = 30  →  ', 'r'], ['x', 'i', P1], [' = 15', 'r', NOW]], CX, 920, 46));
    fade(A(t, 18.2, .5), () => { dot(px(1985), 760, 14, RES, 18); mono('nació', px(1985), 700, RES, { s: 24 }); F([['2000 − 15 = ', 'r'], ['1985', 'r', RES]], CX, 1030, 50); });
  },
  // 4 · Problema: dos soluciones salinas.
  sal(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Se mezclan 200 gramos de una solución que tiene 10 % de sal', 'con 300 gramos de otra solución que tiene 20 % de sal. El', 'porcentaje de sal de la mezcla es:'], opts: ['16 %', '15 %', '30 %', '18 %'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      glass(220, 1250, 160, 200, .1, '200 g · 10 %', { c: P1 }); T('+', 380, 1170, { k: 'r', s: 56, a: 'c', c: C.ink }); glass(540, 1250, 160, 300, .2, '300 g · 20 %', { c: P2 }); T('=', 700, 1170, { k: 'r', s: 56, a: 'c', c: C.ink }); glass(880, 1250, 180, 500 * .7, .16, '500 g', { c: NOW });
      fade(A(t, 10.6, .5), () => { mono('20 g', 220, 1215, C.ink, { s: 24 }); mono('60 g', 540, 1205, C.ink, { s: 24 }); mono('80 g', 880, 1205, C.ink, { s: 24 }); });
      fade(A(t, 20.4, .5), () => F([['80 ÷ 500 = ', 'r'], ['16 %', 'r', RES]], CX, 1400, 50));
    });
  },
  // 5 · La mezcla es un promedio.
  ponderado(t) {
    stars(t, .3);
    const px = nline(140, 940, 820, 8, 22, { step: 2, s: 26 });
    dot(px(10), 820, 16, P1, 14); mono('10 %', px(10), 760, P1, { s: 24 }); dot(px(20), 820, 16, P2, 14); mono('20 %', px(20), 760, P2, { s: 24 });
    fade(A(t, 1.4, .5), () => { dot(px(16), 820, 14, RES, 18); mono('16 %', px(16), 760, RES, { s: 26 }); stroke(hexA(C.mute, .6), 2, () => { X.moveTo(px(15), 790); X.lineTo(px(15), 850); }, { dash: [6, 5], g: 0 }); mono('medio: 15', px(15), 900, C.mute, { s: 22 }); });
    fade(A(t, 9.2, .5), () => { for (let i = 0; i < 2; i++) pill(px(10), 1000 + i * 50, 80, 40, P1, null, { r: 8 }); for (let i = 0; i < 3; i++) pill(px(20), 1000 + i * 50, 80, 40, P2, null, { r: 8 }); mono('200 g', px(10), 1180, P1, { s: 22 }); mono('300 g', px(20), 1180, P2, { s: 22 }); });
    fade(A(t, 18.2, .5), () => F([['(2 · 10 + 3 · 20) ÷ 5 = ', 'r'], ['16', 'r', RES]], CX, 1290, 46));
  },
  // 6 · Problema: agua al alcohol.
  alcohol(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Se tienen 40 litros de una mezcla de agua y alcohol que', 'contiene 25 % de alcohol. Los litros de agua que se le deben', 'agregar para que la mezcla quede con 20 % de alcohol son:'], opts: ['10', '5', '8', '12'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      glass(300, 1300, 200, 320, .25, '40 L · 25 %', { c: P1 }); arrow(440, 1150, 600, 1150, NOW, 1, 3, { h: 12 }); mono('+ agua', 520, 1120, NOW, { s: 24 });
      fade(A(t, 11, .5), () => { mono('10 L de alcohol', 300, 1395, KEEP, { s: 22 }); glass(780, 1300, 200, 400, .2, '? · 20 %', { c: P2 }); });
      fade(A(t, 20.4, .5), () => { F([['10 = 20 % de ', 'r'], ['50', 'r', NOW], ['  →  50 − 40 = ', 'r'], ['10 L', 'r', RES]], CX, 1470, 42); });
    });
  },
  // 7 · Lo que se conserva.
  conserva(t) {
    stars(t, .3);
    glass(330, 1000, 220, 400, .04, '50 kg · 4 %', { c: P1 });
    fade(A(t, 9.2, .5), () => { glass(750, 1000, 220, 320, .05, '40 kg · 5 %', { c: P2 }); mono('2 kg de sal', 330, 1090, KEEP, { s: 22 }); mono('2 kg de sal', 750, 1090, KEEP, { s: 22 }); arrow(470, 760, 630, 760, BAD, 1, 3, { h: 12 }); mono('se evapora', 550, 730, BAD, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { F([['50 − 40 = ', 'r'], ['10 kg', 'r', RES]], CX, 1200, 52); mono('lo que no cambia: la sal', CX, 1280, KEEP, { s: 26 }); });
  },
  // 8 · Las monedas.
  monedas(t) {
    stars(t, .3);
    for (let i = 0; i < 20; i++) { const c = t > 18.2 ? (i < 10 ? P2 : P1) : C.mute, x = 160 + (i % 10) * 84, y = 600 + Math.floor(i / 10) * 90; ring(x, y, 32, c, 3); if (t > 18.2) mono(i < 10 ? '500' : '200', x, y + 8, c, { s: 18 }); }
    fade(A(t, 2, .5), () => mono('20 monedas: 7 000 pesos', CX, 800, C.ink, { s: 26 }));
    fade(A(t, 9.2, .5), () => F([['500', 'r', P2], ['k', 'i', NOW], [' + 200(20 − ', 'r', P1], ['k', 'i', NOW], [')', 'r', P1], [' = 7 000', 'r']], CX, 920, 48));
    fade(A(t, 18.2, .5), () => F([['300', 'r'], ['k', 'i', NOW], [' = 3 000  →  ', 'r'], ['k', 'i', NOW], [' = 10', 'r', RES]], CX, 1030, 48));
  },
  // 9 · Las edades resueltas.
  resolver(t) {
    stars(t, .3);
    gridT(110, 520, 250, 100, ['hijo', 'padre'], ['hace 4', 'hoy', 'dentro de 8'], (i, j) => { const H = t > 20 ? 16 : null; const v = [['h − 4', 'h', 'h + 8'], ['3(h − 4)', '?', '2(h + 8)']][i][j]; if (H) return [String([[12, 16, 24], [36, 40, 48]][i][j]), i ? P2 : P1]; return [v, i ? P2 : P1, 'i']; }, { hw: 140, hh: 64, cs: 34, rs: 30, hs: 24 });
    fade(A(t, 1, .5), () => F([['diferencia hace 4: 3(h − 4) − (h − 4) = 2(h − 4)', 'r']], CX, 860, 34));
    fade(A(t, 10.2, .5), () => F([['diferencia dentro de 8: 2(h + 8) − (h + 8) = h + 8', 'r']], CX, 930, 34));
    fade(A(t, 20.2, .5), () => { F([['2(h − 4) = h + 8  →  h = ', 'r'], ['16', 'r', NOW]], CX, 1040, 44); F([['16 + 40 = ', 'r'], ['56', 'r', RES]], CX, 1140, 56); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['56', '48', '52', '64'], 0, [['hijo 16, padre 40  →  ', 'r'], ['56', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['la diferencia', 'r']], 'edades: no cambia'], [[['se suma lo que hay', 'r']], 'mezclas'], [[['agua o sal', 'r']], 'lo que se conserva'], [[['cantidad × valor', 'r']], 'monedas']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [P1, P2, KEEP]);
    });
  },
};
