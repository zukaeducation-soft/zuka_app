// «Patrones cíclicos» · escenas de la lección pu-se-3. Motor en kit.js, preu.js y piezas.js; guion en ciclos.data.js.
// Cada letra del bloque con su color; los bloques completos en gris, lo que sobra en lima y el resultado en verde.
const NOW = C.lime, RES = C.green, BAD = C.mag;
const LC = { A: C.cyan, B: C.amber, C: C.violet, D: C.blue };
const BLK = 'ABBCCCD';
const DAYS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
// Fila de fichas de letras desde x0 (ancho w), que pueden ir apagadas.
const tiles = (x0, y, s, w, o = {}) => [...s].forEach((L, i) => pill(x0 + i * w, y, w - 8, w * 1.1, o.dim && o.dim(i) ? C.dim : LC[L] || C.cyan, L, { s: w * .5, r: 10, fill: o.dim && o.dim(i) ? .04 : .22 }));
// Rueda de un ciclo de n casillas con etiquetas; marca la casilla k.
function wheel(O, R, labs, k, col = NOW) { labs.forEach((s, i) => { const p = at(O, 90 - 360 / labs.length * i, R); nodeC(p[0], p[1], 44, i === k ? col : C.dim, s, { s: 26, fill: i === k ? .3 : .05 }); }); ring(O[0], O[1], R, 'rgba(160,180,240,.3)', 2); }
const S = {
  // 1 · El reto: ABBCCCD.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['El patrón ABBCCCDABBCCCDABBCCCD… se repite', 'indefinidamente. La letra que aparece en la posición', '150 es:'], opts: ['B', 'A', 'C', 'D'], ok: 0 });
    fade(A(t, 9.6, .6), () => { const s = (BLK + BLK).slice(0, 14); tiles(110, 980, s, 62); mono('…', 1000, 990, C.mute, { s: 40 }); fade(A(t, 12, .5), () => { pill(CX, 1160, 260, 90, NOW, 'posición 150', { s: 32 }); bigT('?', CX + 190, 1180, NOW, 56); }); });
  },
  // 2 · El bloque.
  bloque(t) {
    stars(t, .3);
    tiles(160, 640, BLK + BLK.slice(0, 3), 76, { dim: i => t > 9.2 && i >= 7 });
    fade(A(t, 1.6, .5), () => { stroke(NOW, 4, () => X.roundRect(118, 580, 7 * 76 + 4, 120, 18), { g: 14 }); mono('7 letras', 160 + 3 * 76, 760, NOW, { s: 28 }); });
    fade(A(t, 9.4, .5), () => mono('la 8.ª vuelve a ser A', 160 + 8 * 76, 760, C.cyan, { s: 22 }));
    fade(A(t, 18.2, .5), () => bigT('largo del bloque: 7', CX, 940, NOW, 52));
  },
  // 3 · El residuo.
  residuo(t) {
    stars(t, .3);
    F([['150 ÷ 7 = 21, sobran ', 'r'], ['3', 'r', NOW]], CX, 560, 60);
    fade(A(t, 9.4, .5), () => { for (let i = 0; i < 21; i++) { const x = 130 + (i % 7) * 120, y = 680 + Math.floor(i / 7) * 70; pill(x, y, 108, 54, C.dim, BLK, { s: 20, fill: .05 }); } mono('21 bloques completos: hasta la posición 147', CX, 920, C.mute, { s: 24 }); });
    fade(A(t, 20.2, .5), () => { tiles(380, 1040, 'ABB', 90); stroke(NOW, 4, () => X.roundRect(380 + 2 * 90 - 46, 980, 92, 120, 16), { g: 14 }); mono('148 · 149 · 150', 470, 1140, NOW, { s: 24 }); });
  },
  // 4 · Si sobra cero.
  cero(t) {
    stars(t, .3);
    F([['147 = 7 · 21 + ', 'r'], ['0', 'r', NOW]], CX, 560, 60);
    fade(A(t, 9.2, .5), () => { tiles(240, 760, BLK, 90); stroke(RES, 4, () => X.roundRect(240 + 6 * 90 - 46, 700, 92, 120, 16), { g: 14 }); mono('residuo 0 → la última', 240 + 6 * 90, 880, RES, { s: 24 }); });
    fade(A(t, 18.2, .5), () => mono('la posición 147 es una D', CX, 1000, C.ink, { s: 30 }));
  },
  // 5 · Los días de la semana.
  semana(t) {
    stars(t, .3);
    const k = t < 9 ? 2 : t < 18 ? 2 + Math.floor(seg(t, 9.6, 16) * 15) % 7 : 3;
    wheel([CX, 820], 260, DAYS, k);
    fade(A(t, 9.2, .5), () => mono(`el 15: mié  →  ${15 + Math.min(15, Math.floor(seg(t, 9.6, 16) * 15))}`, CX, 1170, C.ink, { s: 28 }));
    fade(A(t, 18.2, .5), () => { F([['15 = 2 · 7 + ', 'r'], ['1', 'r', NOW], ['  →  jueves', 'r', RES]], CX, 1250, 48); });
  },
  // 6 · Problema: de marzo a junio.
  fecha(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['El 1 de marzo de cierto año fue viernes. El 1 de junio de', 'ese mismo año fue:'], opts: ['Sábado', 'Viernes', 'Domingo', 'Lunes'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      [['marzo', 31, C.cyan], ['abril', 30, C.amber], ['mayo', 31, C.violet]].forEach(([m, d, c], i) => fade(A(t, 10.2 + i * .6, .4), () => { bar(140 + [0, 270, 530][i], 900, d * 8.4, 70, c, 1); mono(`${m}: ${d}`, 140 + [0, 270, 530][i] + d * 4.2, 950, C.ink, { s: 22 }); }));
      fade(A(t, 12.4, .5), () => F([['31 + 30 + 31 = ', 'r'], ['92', 'r', NOW], [' días', 'r']], CX, 1060, 44));
      fade(A(t, 20.4, .5), () => { F([['92 = 7 · 13 + ', 'r'], ['1', 'r', NOW], ['  →  viernes + 1 = ', 'r'], ['sábado', 'r', RES]], CX, 1170, 42); });
    });
  },
  // 7 · El horno de 100 horas.
  horas(t) {
    stars(t, .3);
    const d = Math.min(4, Math.floor(seg(t, 9.6, 14) * 4.999));
    wheel([CX, 800], 250, DAYS, d >= 4 ? 4 : d, d >= 4 ? RES : NOW);
    fade(A(t, 1, .5), () => mono('lunes, 8:00 a. m.', CX, 800, C.ink, { s: 28 }));
    fade(A(t, 9.2, .5), () => F([['100 = 4 · 24 + ', 'r'], ['4', 'r', NOW]], CX, 1130, 50));
    fade(A(t, 18.2, .5), () => { F([['viernes 8:00 + 4 h = ', 'r'], ['viernes 12:00 m.', 'r', RES]], CX, 1220, 44); });
  },
  // 8 · La última cifra de las potencias de 2.
  cifra(t) {
    stars(t, .3);
    [2, 4, 8, 16, 32, 64, 128, 256].forEach((v, i) => fade(A(t, .8 + i * .4, .3), () => { const x = 120 + i * 120, s = String(v); F([[s.slice(0, -1), 'r', C.mute], [s.slice(-1), 'r', [C.cyan, C.amber, C.violet, NOW][i % 4]]], x, 600, 40); mono(`2^${i + 1}`, x, 650, C.mute, { s: 18 }); }));
    fade(A(t, 10, .5), () => wheel([CX, 900], 150, ['2', '4', '8', '6'], -1));
    fade(A(t, 20.2, .5), () => { F([['99 = 4 · 24 + ', 'r'], ['3', 'r', NOW], ['  →  ', 'r'], ['8', 'r', RES]], CX, 1170, 50); wheel([CX, 900], 150, ['2', '4', '8', '6'], 2, RES); });
  },
  // 9 · La letra 150 resuelta.
  resolver(t) {
    stars(t, .3);
    F([['150 = 7 · 21 + ', 'r'], ['3', 'r', NOW]], CX, 560, 60);
    fade(A(t, 10, .5), () => { tiles(240, 760, BLK, 90, { dim: i => i > 2 }); ['1.ª', '2.ª', '3.ª'].forEach((s, i) => mono(s, 240 + i * 90, 860, NOW, { s: 22 })); });
    fade(A(t, 20.2, .5), () => { stroke(RES, 4, () => X.roundRect(240 + 2 * 90 - 46, 700, 92, 120, 16), { g: 16 }); F([['posición 150: ', 'r'], ['B', 'r', RES]], CX, 1000, 60); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['B', 'A', 'C', 'D'], 0, [['150 = 7 · 21 + 3  →  A, B, ', 'r'], ['B', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['largo del bloque', 'r']], 'primero'], [[['posición ÷ largo', 'r']], 'solo el residuo'], [[['residuo 0', 'r']], 'la última del bloque'], [[['7 días · 24 h', 'r']], 'ciclos de siempre']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [C.cyan, NOW, C.amber]);
    });
  },
};
