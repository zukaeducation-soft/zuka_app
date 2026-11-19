// «Aumentos, descuentos e IVA» · escenas de la lección pu-pr-5. Motor en kit.js, preu.js y piezas.js; guion en aumentos.data.js.
// El valor de antes en cian, lo que sube en violeta, lo que baja en rosa, la trampa en ámbar, el resultado en verde y el
// factor en lima.
const OLD = C.cyan, UP = C.violet, DOWN = C.mag, TRAP = C.amber, RES = C.green, NOW = C.lime;
// Etiqueta de precio centrada en (x, y).
function ptag(x, y, txt, col, w = 300) {
  stroke(col, 3, () => { X.moveTo(x - w / 2, y - 46); X.lineTo(x + w / 2 - 40, y - 46); X.lineTo(x + w / 2, y); X.lineTo(x + w / 2 - 40, y + 46); X.lineTo(x - w / 2, y + 46); X.closePath(); }, { g: 14 });
  ring(x + w / 2 - 42, y, 7, col, 2.5); bigT(txt, x - 16, y + 16, C.ink, 42, { max: w - 70 });
}
// Flecha con su factor entre dos etiquetas.
const step = (x1, x2, y, lab, col, k = 1) => { arrow(x1, y, x2, y, col, k, 4, { h: 14 }); if (k > .9) mono(lab, (x1 + x2) / 2, y - 24, col, { s: 26 }); };
const S = {
  // 1 · El reto: el salario de Rosa.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Después de un aumento del 8 %, el salario de Rosa quedó en', '$1 620 000. El salario de Rosa antes del aumento era:'], opts: ['1 500 000', '1 490 400', '1 540 000', '1 512 000'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      ptag(260, 1000, '?', OLD); step(430, 600, 1000, '+ 8 %', UP, eo(seg(t, 10.4, 11.6))); fade(A(t, 11.6, .4), () => ptag(800, 1000, '1 620 000', UP));
      fade(A(t, 13, .5), () => mono('el 8 % es del salario viejo', CX, 1130, NOW, { s: 26 }));
      fade(A(t, 20.4, .5), () => mono('dos opciones a menos de 10 000 de distancia', CX, 1220, TRAP, { s: 24 }));
    });
  },
  // 2 · Cada cambio es un factor.
  factor(t) {
    stars(t, .3);
    const x = 140, w = 760;
    fade(A(t, .8, .5), () => { bar(x, 560, w, 80, OLD, 1); mono('100 %', x + w / 2, 610, C.ink, { s: 26 }); });
    fade(A(t, 2, .5), () => { bar(x, 700, w, 80, OLD, 1); bar(x + w, 700, w * .08, 80, UP, eo(seg(t, 2.4, 3.4))); mono('108 %  →  × 1.08', CX, 840, UP, { s: 28 }); });
    fade(A(t, 9.2, .5), () => { bar(x, 920, w * .92, 80, OLD, 1); stroke(DOWN, 2.5, () => X.rect(x + w * .92, 920, w * .08, 80), { dash: [8, 6] }); mono('92 %  →  × 0.92', CX, 1060, DOWN, { s: 28 }); });
    fade(A(t, 18.2, .5), () => F([['factor = 1 ± ', 'r'], ['cambio', 'i', NOW]], CX, 1230, 52));
  },
  // 3 · Volver atrás: dividir, no restar.
  reves(t) {
    stars(t, .3);
    ptag(260, 600, '1 500 000', OLD); step(430, 600, 600, '× 1.08', UP); ptag(800, 600, '1 620 000', UP);
    fade(A(t, 1.6, .5), () => { arrow(600, 720, 430, 720, RES, eo(seg(t, 1.6, 2.8)), 4, { h: 14 }); mono('÷ 1.08', 515, 770, RES, { s: 26 }); });
    fade(A(t, 10, .5), () => { F([['8 % de 1 620 000 = ', 'r'], ['129 600', 'r', TRAP]], CX, 920, 42); F([['8 % de 1 500 000 = ', 'r'], ['120 000', 'r', OLD]], CX, 990, 42); });
    fade(A(t, 20.2, .5), () => { F([['1 620 000 − 129 600 = ', 'r'], ['1 490 400', 'r', TRAP]], CX, 1110, 42); check(900, 1100, 18, false, A(t, 20.6, .5)); mono('restar el 8 % del nuevo: la trampa', CX, 1170, TRAP, { s: 24 }); });
  },
  // 4 · El IVA.
  iva(t) {
    stars(t, .3);
    ptag(260, 620, '500 000', OLD); step(430, 600, 620, '× 1.19', UP, eo(seg(t, 1.6, 2.8))); fade(A(t, 2.8, .4), () => ptag(800, 620, '595 000', UP));
    fade(A(t, 3.4, .5), () => mono('precio + 19 % de IVA', 800, 720, UP, { s: 22 }));
    fade(A(t, 10, .5), () => { arrow(600, 820, 430, 820, RES, eo(seg(t, 10.4, 11.6)), 4, { h: 14 }); mono('÷ 1.19', 515, 870, RES, { s: 26 }); });
    fade(A(t, 20.2, .5), () => { F([['595 000 ÷ 1.19 = ', 'r'], ['500 000', 'r', RES]], CX, 1020, 46); F([['IVA: 595 000 − 500 000 = ', 'r'], ['95 000', 'r', UP]], CX, 1100, 42); });
  },
  // 5 · Problema: sube 20 % y baja 20 %.
  subebaja(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['El precio de un artículo aumentó un 20 % y, un mes', 'después, el nuevo precio disminuyó un 20 %. Con respecto', 'al precio inicial, el precio final:'], opts: ['Disminuyó un 4 %', 'Quedó igual', 'Aumentó un 4 %', 'Disminuyó un 2 %'], ok: 0, rv: 22.6, os: 34 });
    fade(A(t, 9.8, .5), () => {
      const x = 160, u = 5;
      bar(x, 900, 100 * u, 70, OLD, 1); mono('100', x + 250, 945, C.ink, { s: 26 });
      fade(A(t, 10.6, .5), () => { bar(x, 1010, 120 * u, 70, UP, eo(seg(t, 10.6, 11.8))); mono('120', x + 300, 1055, C.ink, { s: 26 }); });
      fade(A(t, 12.6, .5), () => { bar(x, 1120, 96 * u, 70, DOWN, eo(seg(t, 12.6, 13.8))); mono('96', x + 240, 1165, C.ink, { s: 26 }); mono('− 20 % de 120 = − 24', x + 96 * u + 20, 1165, DOWN, { s: 22, a: 'l' }); });
      fade(A(t, 20.4, .5), () => F([['1.2 · 0.8 = ', 'r'], ['0.96', 'r', RES], ['  →  − 4 %', 'r', RES]], CX, 1300, 50));
    });
  },
  // 6 · Dos aumentos seguidos.
  sucesivos(t) {
    stars(t, .3);
    const x = 140, u = 5.6;
    bar(x, 560, 100 * u, 70, OLD, 1); mono('100', x + 280, 605, C.ink, { s: 26 });
    fade(A(t, 1.6, .5), () => { bar(x, 670, 110 * u, 70, UP, eo(seg(t, 1.6, 2.6))); mono('110  (+10)', x + 110 * u + 20, 715, UP, { s: 24, a: 'l' }); });
    fade(A(t, 9.2, .5), () => { bar(x, 780, 132 * u, 70, UP, eo(seg(t, 9.4, 10.6))); mono('132  (+22: 20 % de 110)', x + 132 * u - 10, 760, UP, { s: 22, a: 'r' }); });
    fade(A(t, 10.6, .5), () => F([['1.1 · 1.2 = ', 'r'], ['1.32', 'r', NOW]], CX, 980, 54));
    fade(A(t, 18.2, .5), () => F([['aumento total: ', 'r'], ['32 %', 'r', RES], ['  (no 30 %)', 'r', TRAP]], CX, 1080, 48));
  },
  // 7 · Problema: la ganancia del comerciante.
  ganancia(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un comerciante compra un artículo en $80 000 y le fija un', 'precio de venta con el que ganaría el 25 % sobre el costo.', 'Si a un cliente le hace un descuento del 10 % sobre ese', 'precio, su ganancia, como porcentaje del costo, es:'], opts: ['12.5 %', '15 %', '10 %', '22.5 %'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      ptag(220, 1000, '80 000', OLD, 260); step(360, 450, 1000, '× 1.25', UP, eo(seg(t, 10.2, 11))); fade(A(t, 11, .4), () => ptag(590, 1000, '100 000', UP, 260));
      fade(A(t, 12.4, .4), () => { step(730, 800, 1000, '× 0.9', DOWN, 1); ptag(930, 1000, '90 000', DOWN, 240); });
      fade(A(t, 20.4, .5), () => { F([['90 000 − 80 000 = 10 000  ·  10 000 ÷ 80 000 = ', 'r'], ['12.5 %', 'r', RES]], CX, 1180, 36, { max: 960 }); mono('no 25 − 10 = 15: las bases son distintas', CX, 1250, TRAP, { s: 24 }); });
    });
  },
  // 8 · Interés compuesto.
  compuesto(t) {
    stars(t, .3);
    const vals = [1000000, 1100000, 1210000, 1331000];
    vals.forEach((v, i) => fade(A(t, i ? 9.2 + (i - 1) * 1.6 : .8, .5), () => { const h = v / 1331000 * 520, x = 200 + i * 220; bar(x, 1100 - h, 140, h, i ? UP : OLD, 1, { fill: .25 }); mono(num(v), x + 70, 1150, C.ink, { s: 20 }); mono(`año ${i}`, x + 70, 1100 - h - 20, C.mute, { s: 20 }); if (i) mono('× 1.1', x - 40, 1100 - h + 40, NOW, { s: 20 }); }));
    fade(A(t, 18.2, .5), () => F([['1.1', 'r'], ['3', 'sp'], [' = ', 'r'], ['1.331', 'r', RES], ['   ·   no 1.3', 'r', TRAP]], CX, 1260, 50));
  },
  // 9 · El salario resuelto.
  resolver(t) {
    stars(t, .3);
    ptag(260, 600, '?', OLD); step(430, 600, 600, '× 1.08', UP); ptag(800, 600, '1 620 000', UP);
    fade(A(t, 10, .5), () => { arrow(600, 720, 430, 720, RES, eo(seg(t, 10.2, 11.2)), 4, { h: 14 }); mono('÷ 1.08', 515, 770, RES, { s: 26 }); F([['1 620 000 ÷ 1.08 = ', 'r'], ['1 500 000', 'r', RES]], CX, 900, 48); });
    fade(A(t, 20.2, .5), () => { F([['8 % de 1 500 000 = 120 000', 'r', OLD]], CX, 1010, 42); F([['1 500 000 + 120 000 = 1 620 000', 'r']], CX, 1080, 42); check(CX + 380, 1068, 18, true, A(t, 21.4, .6)); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['1 500 000', '1 490 400', '1 540 000', '1 512 000'], 0, [['1 620 000 ÷ 1.08 = ', 'r'], ['1 500 000', 'r', RES]], { s: 44 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['± p %  →  × (1 ± p)', 'r']], 'un factor'], [[['÷ factor', 'r']], 'volver al de antes'], [[['1.2 · 0.8 = 0.96', 'r']], 'se multiplican'], [[['× 1.19', 'r']], 'IVA del 19 %']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [OLD, NOW, UP]);
    });
  },
};
