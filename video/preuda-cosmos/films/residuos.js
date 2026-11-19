// «Paridad, residuos y última cifra» · escenas de la lección pu-nu-3. Motor en kit.js, preu.js y piezas.js; guion en residuos.data.js.
// Las unidades en cian, el ciclo en ámbar, el residuo en violeta, lo que se mira ahora en lima y el resultado en verde.
const U_ = C.cyan, CY = C.amber, RS = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Rueda de un ciclo: valores en círculo; hl(i) resalta.
function wheel(cx, cy, R, vals, hl = () => false, col = CY) {
  ring(cx, cy, R, hexA(col, .4), 2);
  vals.forEach((v, i) => { const p = at([cx, cy], 90 - 360 / vals.length * i, R); const h = hl(i); nodeC(p[0], p[1], 46, h ? NOW : col, v, { s: 40, fill: h ? .35 : .14 }); });
}
const S = {
  // 1 · El reto: una suma de potencias.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: [[['La cifra de las unidades del resultado de 3', 'j'], ['1', 'sp'], [' + 3', 'j'], ['2', 'sp'], [' + 3', 'j'], ['3', 'sp'], [' + … + 3', 'j'], ['8', 'sp'], [' es:', 'j']]], opts: ['0', '3', '9', '1'], ok: 0 });
    fade(A(t, 9.6, .6), () => { [1, 2, 3, 4, 5, 6, 7, 8].forEach((n, i) => fade(A(t, 10 + i * .3, .3), () => F([['3', 'r', U_], [String(n), 'sp', U_]], 170 + i * 105, 900, 50))); });
    fade(A(t, 12.8, .5), () => mono('solo la última cifra', CX, 1000, NOW, { s: 26 }));
  },
  // 2 · El ciclo de las unidades.
  ciclo(t) {
    stars(t, .3);
    ['3', '9', '27', '81', '243', '729'].forEach((v, i) => fade(A(t, .8 + i * .5, .3), () => { const x = 150 + i * 156; T(v.slice(0, -1), x - 10, 600, { k: 'r', s: 44, a: 'r', c: C.mute }); T(v.slice(-1), x - 10, 600, { k: 'r', s: 44, a: 'l', c: U_ }); }));
    fade(A(t, 9.2, .5), () => wheel(CX, 900, 180, ['3', '9', '7', '1'], i => t > 18.2 && i === 3));
    fade(A(t, 9.6, .5), () => mono('× 3', CX + 220, 760, CY, { s: 24 }));
    fade(A(t, 18.4, .5), () => mono('ciclo de 4', CX, 1160, NOW, { s: 28 }));
  },
  // 3 · El residuo da el lugar.
  lugar(t) {
    stars(t, .3);
    F([['3', 'r', U_], ['10', 'sp', U_], [': unidad', 'r']], CX, 560, 56);
    wheel(CX, 860, 170, ['3', '9', '7', '1'], i => t > 18.2 && i === 1);
    fade(A(t, 9.2, .5), () => F([['10 = 4 · 2 + ', 'r'], ['2', 'r', RS]], CX, 1150, 52));
    fade(A(t, 18.2, .5), () => { F([['3', 'r'], ['10', 'sp'], [' termina en ', 'r'], ['9', 'r', RES]], CX, 1240, 50); mono('residuo 0 → el último (1)', CX, 1310, C.mute, { s: 24 }); });
  },
  // 4 · Problema: la unidad de 7²⁰²⁵.
  siete(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: [[['La cifra de las unidades del número 7', 'j'], ['2025', 'sp'], [' es:', 'j']]], opts: ['7', '9', '3', '1'], ok: 0, rv: 22.6 });
    fade(A(t, 2.6, .5), () => wheel(CX, 900, 170, ['7', '9', '3', '1'], i => t > 20.4 && i === 0, U_));
    fade(A(t, 10, .5), () => F([['2025 = 4 · 506 + ', 'r'], ['1', 'r', RS]], CX, 1200, 50));
    fade(A(t, 20.4, .5), () => F([['7', 'r'], ['2025', 'sp'], [' termina en ', 'r'], ['7', 'r', RES]], CX, 1290, 50));
  },
  // 5 · Problema: el tablero circular.
  tablero(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un tablero circular tiene 8 casillas numeradas del 0 al 7. Una', 'ficha roja sale de la casilla 0 y en cada turno avanza 3', 'casillas. Después de 10 turnos, la ficha está en la casilla:'], opts: ['6', '2', '4', '3'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const O = [CX, 1080], R = 200, turn = Math.min(10, Math.floor(seg(t, 10.4, 19.4) * 10)), pos = (3 * turn) % 8;
      for (let i = 0; i < 8; i++) { const p = at(O, 90 - 45 * i, R); nodeC(p[0], p[1], 38, i === pos ? (t > 20.4 ? RES : BAD) : C.mute, i, { s: 32, fill: i === pos ? .4 : .1 }); }
      mono(`turno ${turn}: avanzó ${3 * turn}`, CX, O[1] + 10, C.ink, { s: 24 });
      fade(A(t, 20.4, .5), () => F([['30 = 3 · 8 + ', 'r'], ['6', 'r', RES]], CX, 1370, 48));
    });
  },
  // 6 · Par e impar.
  paridad(t) {
    stars(t, .3);
    gridT(220, 520, 200, 90, ['par', 'impar'], ['par', 'impar'], (i, j) => [(i + j) % 2 ? 'impar' : 'par', (i + j) % 2 ? BAD : U_, 'j'], { hw: 140, hh: 56, cs: 34, rs: 30, hs: 26, hk: 'j' });
    mono('+', 290, 560, C.mute, { s: 30 });
    fade(A(t, 9.2, .5), () => { for (let i = 0; i < 5; i++) pill(230 + i * 155, 860, 120, 80, i < 4 ? CY : BAD, 'impar', { s: 24, r: 14 }); mono('4 impares: par', 460, 950, CY, { s: 24 }); mono('+ 1 impar: impar', 850, 950, BAD, { s: 24 }); });
    fade(A(t, 18.2, .5), () => F([['5 impares ≠ 50', 'r', BAD], ['   (50 es par)', 'r', C.mute]], CX, 1080, 48));
  },
  // 7 · Los residuos se suman.
  suma(t) {
    stars(t, .3);
    F([['47 = 5 · 9 + ', 'r'], ['2', 'r', RS]], 330, 600, 48); F([['38 = 5 · 7 + ', 'r'], ['3', 'r', RS]], 750, 600, 48);
    fade(A(t, 9.2, .5), () => F([['2 + 3 = 5  →  residuo ', 'r'], ['0', 'r', NOW]], CX, 740, 52));
    fade(A(t, 18.2, .5), () => F([['47 + 38 = 85 = 5 · 17', 'r'], ['  ✓', 'r', RES]], CX, 870, 52));
  },
  // 8 · La última cifra de un producto.
  producto(t) {
    stars(t, .3);
    F([['1 23', 'r', C.mute], ['7', 'r', U_], [' · 4 56', 'r', C.mute], ['9', 'r', U_]], CX, 600, 70);
    fade(A(t, 9.2, .5), () => F([['7 · 9 = 6', 'r'], ['3', 'r', NOW]], CX, 760, 60));
    fade(A(t, 18.2, .5), () => { F([['termina en ', 'r'], ['3', 'r', RES]], CX, 900, 56); mono('1 237 · 4 569 = 5 651 853', CX, 990, C.mute, { s: 26 }); });
  },
  // 9 · La suma resuelta.
  resolver(t) {
    stars(t, .3);
    ['3', '9', '7', '1', '3', '9', '7', '1'].forEach((v, i) => fade(A(t, .8 + i * .3, .3), () => { pill(170 + i * 105, 620, 86, 86, i < 4 ? CY : U_, v, { s: 40, r: 14 }); }));
    fade(A(t, 3.4, .5), () => { brc(130, 130 + 4 * 105 - 20, 690, CY, 1); brc(130 + 4 * 105, 130 + 8 * 105 - 20, 690, U_, 1); mono('ciclo', 130 + 200, 750, CY, { s: 22 }); mono('ciclo', 130 + 620, 750, U_, { s: 22 }); });
    fade(A(t, 10.2, .5), () => F([['3 + 9 + 7 + 1 = 20     20 + 20 = ', 'r'], ['40', 'r', NOW]], CX, 880, 48));
    fade(A(t, 20.2, .5), () => F([['termina en ', 'r'], ['0', 'r', RES]], CX, 1000, 60));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['0', '3', '9', '1'], 0, [['2 ciclos · 20 = 40  →  ', 'r'], ['0', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['3, 9, 7, 1', 'r']], 'ciclos de unidades'], [[['n ÷ 4', 'r']], 'el residuo da el lugar'], [[['impar + impar = par', 'r']], 'paridad'], [[['solo las unidades', 'r']], 'sumas y productos']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [U_, CY, RS]);
    });
  },
};
