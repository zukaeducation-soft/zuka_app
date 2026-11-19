// «Anidados y ecuaciones» · escenas de la lección pu-op-2. Motor en kit.js, preu.js y piezas.js; guion en anidados.data.js.
// Lo de adentro en cian, lo de afuera en ámbar, la regla en violeta, lo que se mira ahora en lima y el resultado en verde.
const IN = C.cyan, OUT = C.amber, RULE = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Cajas anidadas: una caja grande con otra adentro.
function nest(cx, y, w1, w2, h, k2 = 1) {
  stroke(OUT, 3, () => X.roundRect(cx - w1 / 2, y - h / 2, w1, h, 20), { g: 12 });
  fade(k2, () => { X.save(); X.fillStyle = hexA(IN, .12); X.beginPath(); X.roundRect(cx - w2 / 2, y - h / 2 + 22, w2, h - 44, 16); X.fill(); X.restore(); stroke(IN, 3, () => X.roundRect(cx - w2 / 2, y - h / 2 + 22, w2, h - 44, 16), { g: 12 }); });
}
// Dos operaciones de adentro (izquierda y derecha) dentro de una de afuera.
function nest2(cx, y, h) {
  stroke(OUT, 3, () => X.roundRect(cx - 440, y - h / 2, 880, h, 20), { g: 12 });
  [-1, 1].forEach(sg => { const x = cx + sg * 230; X.save(); X.fillStyle = hexA(IN, .12); X.beginPath(); X.roundRect(x - 160, y - h / 2 + 22, 320, h - 44, 16); X.fill(); X.restore(); stroke(IN, 3, () => X.roundRect(x - 160, y - h / 2 + 22, 320, h - 44, 16), { g: 12 }); });
}
// Fila de pasos con flechas: valores y rótulos debajo.
function chain(y, vals, labs, t, t0, dt, last = RES) {
  const n = vals.length, gap = Math.min(220, 880 / (n - 1)), x0 = CX - (n - 1) * gap / 2;
  vals.forEach((v, i) => fade(A(t, t0 + i * dt, .4), () => { const x = x0 + i * gap; pill(x, y, 130, 96, i === n - 1 ? last : i ? NOW : IN, v, { s: 44, r: 18 }); if (i) { arrow(x - gap + 70, y, x - 70, y, C.mute, 1, 2.5, { h: 10 }); if (labs[i - 1]) mono(labs[i - 1], x - gap / 2, y - 66, C.mute, { s: 20 }); } }));
}
const S = {
  // 1 · El reto: una operación con dos casos.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: [[['En los reales se define a ⊗ b = a', 'j'], ['2', 'sp'], [' − ab si a ≥ b, y', 'j']], [['a ⊗ b = b', 'j'], ['2', 'sp'], [' − ab si a < b. El valor de (3 ⊗ 5) ⊗ (4 ⊗ 2) es:', 'j']]], opts: ['20', '16', '36', '180'], ok: 0 });
    fade(A(t, 9.6, .6), () => { pill(330, 960, 380, 90, RULE, 'si a ≥ b:  a² − ab', { s: 34 }); pill(750, 960, 380, 90, RULE, 'si a < b:  b² − ab', { s: 34 }); });
    fade(A(t, 10.4, .5), () => { nest2(CX, 1200, 200); F([['3 ⊗ 5', 'r', IN]], CX - 230, 1216, 44); F([['⊗', 'r', OUT]], CX, 1216, 48); F([['4 ⊗ 2', 'r', IN]], CX + 230, 1216, 44); });
  },
  // 2 · De adentro hacia afuera.
  adentro(t) {
    stars(t, .3);
    F([['⟨', 'r', RULE], ['n', 'i'], ['⟩', 'r', RULE], [' = ', 'r'], ['n', 'i'], ['2', 'sp'], [' − ', 'r'], ['n', 'i']], CX, 560, 60);
    nest(CX, 800, 520, 300, 220, 1); F([['⟨', 'r', OUT], ['⟨', 'r', IN], ['3', 'r'], ['⟩', 'r', IN], ['⟩', 'r', OUT]], CX, 824, 80);
    fade(A(t, 9.2, .5), () => F([['⟨3⟩ = 9 − 3 = ', 'r', IN], ['6', 'r', NOW]], CX, 1010, 52));
    fade(A(t, 18.2, .5), () => F([['⟨6⟩ = 36 − 6 = ', 'r', OUT], ['30', 'r', RES]], CX, 1110, 52));
  },
  // 3 · Problema: un cociente anidado.
  cociente(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Para dos números reales distintos a y b se define', 'a ∗ b = (a + b) ÷ (a − b). El valor de (5 ∗ 3) ∗ 2 es:'], opts: ['3', '4', '2', '6'], ok: 0, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      FR('a + b', 'a − b', 420, 1000, 48, C.ink); F([['a ∗ b = ', 'r']], 260, 1016, 48);
      fade(A(t, 10.6, .5), () => { F([['5 ∗ 3 = ', 'r', IN]], 230, 1196, 46); FR('8', '2', 380, 1180, 46, IN); F([[' = ', 'r'], ['4', 'r', NOW]], 470, 1196, 46); });
      fade(A(t, 20.4, .5), () => { F([['4 ∗ 2 = ', 'r', OUT]], 680, 1196, 46); FR('6', '2', 830, 1180, 46, OUT); F([[' = ', 'r'], ['3', 'r', RES]], 920, 1196, 46); });
    });
  },
  // 4 · La misma regla tres veces.
  tresveces(t) {
    stars(t, .3);
    pill(330, 560, 380, 90, RULE, 'par: n ÷ 2', { s: 36 }); pill(750, 560, 380, 90, RULE, 'impar: n + 3', { s: 36 });
    fade(A(t, 9.2, .5), () => chain(820, ['11', '14', '7', '10'], ['impar: +3', 'par: ÷ 2', 'impar: +3'], t, 9.4, 1.4));
    fade(A(t, 18.2, .5), () => F([['f(f(f(11))) = ', 'r'], ['10', 'r', RES]], CX, 1000, 56));
  },
  // 5 · La regla que se usa a sí misma.
  escalera(t) {
    stars(t, .3);
    F([['f', 'i'], ['(1) = 2     ', 'r'], ['f', 'i'], ['(', 'r'], ['n', 'i'], [' + 1) = 2 · ', 'r'], ['f', 'i'], ['(', 'r'], ['n', 'i'], [') − 1', 'r']], CX, 540, 48);
    const V = [2, 3, 5, 9, 17];
    V.forEach((v, i) => fade(A(t, 9.2 + i * 1.2, .4), () => { const x = 200 + i * 175, y = 1150 - i * 110; stroke(i === 4 ? RES : IN, 4, () => { X.moveTo(x - 80, y + 50); X.lineTo(x + 80, y + 50); }, { g: 12 }); bigT(String(v), x, y + 20, i === 4 ? RES : C.ink, 52); mono(`f(${i + 1})`, x, y + 90, C.mute, { s: 22 }); if (i) mono(`2 · ${V[i - 1]} − 1`, x - 90, y + 130, NOW, { s: 18 }); }));
  },
  // 6 · Problema: la x dentro del operador.
  ecuacion(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En los números reales se define la operación a ▽ b = ab − a − b.', 'El valor de x para el cual x ▽ 3 = 9 es:'], opts: ['6', '4', '3', '12'], ok: 0, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      F([['x', 'i', IN], [' ▽ ', 'r', RULE], ['3', 'r', OUT], [' = ', 'r'], ['x', 'i', IN], [' · ', 'r'], ['3', 'r', OUT], [' − ', 'r'], ['x', 'i', IN], [' − ', 'r'], ['3', 'r', OUT], [' = 9', 'r']], CX, 1000, 50);
      fade(A(t, 20.4, .5), () => { F([['2', 'r'], ['x', 'i', IN], [' − 3 = 9  →  2', 'r'], ['x', 'i', IN], [' = 12  →  ', 'r'], ['x', 'i', IN], [' = ', 'r'], ['6', 'r', RES]], CX, 1120, 46); });
    });
  },
  // 7 · Comprobar siempre.
  comprobar(t) {
    stars(t, .3);
    F([['6 ▽ 3 = 18 − 6 − 3 = 9', 'r'], ['  ✓', 'r', RES]], CX, 560, 52);
    fade(A(t, 9.2, .5), () => { F([['a', 'i'], [' ⊕ ', 'r', RULE], ['b', 'i'], [' = ', 'r'], ['a', 'i'], [' + ', 'r'], ['b', 'i'], [' − ', 'r'], ['ab', 'i']], CX, 740, 50); F([['x', 'i', IN], [' + 2 − 2', 'r'], ['x', 'i', IN], [' = −5', 'r']], CX, 840, 50); });
    fade(A(t, 18.2, .5), () => { F([['−', 'r'], ['x', 'i', IN], [' = −7  →  ', 'r'], ['x', 'i', IN], [' = ', 'r'], ['7', 'r', RES]], CX, 960, 50); F([['7 + 2 − 14 = −5', 'r'], ['  ✓', 'r', RES]], CX, 1060, 48); });
  },
  // 8 · La x a los dos lados.
  doslados(t) {
    stars(t, .3);
    F([['a', 'i'], [' ∘ ', 'r', RULE], ['b', 'i'], [' = 2', 'r'], ['a', 'i'], [' + ', 'r'], ['b', 'i']], CX, 540, 56);
    F([['x', 'i', IN], [' ∘ 1', 'r'], ['  =  ', 'r'], ['3 ∘ ', 'r'], ['x', 'i', OUT]], CX, 660, 56);
    fade(A(t, 9.2, .5), () => { F([['2', 'r'], ['x', 'i', IN], [' + 1', 'r']], 330, 800, 52); F([['=', 'r']], CX, 800, 52); F([['6 + ', 'r'], ['x', 'i', OUT]], 750, 800, 52); mono('x por a', 330, 870, IN, { s: 22 }); mono('x por b', 750, 870, OUT, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { F([['x', 'i'], [' = ', 'r'], ['5', 'r', RES]], CX, 1000, 60); F([['5 ∘ 1 = 11     3 ∘ 5 = 11', 'r'], ['  ✓', 'r', RES]], CX, 1100, 44); });
  },
  // 9 · Los dos casos, resueltos.
  resolver(t) {
    stars(t, .3);
    nest2(CX, 560, 170); F([['3 ⊗ 5', 'r', IN]], CX - 230, 576, 44); F([['⊗', 'r', OUT]], CX, 576, 48); F([['4 ⊗ 2', 'r', IN]], CX + 230, 576, 44);
    fade(A(t, 1, .5), () => { mono('3 < 5: segundo caso', 300, 730, C.mute, { s: 22 }); F([['5', 'r'], ['2', 'sp'], [' − 15 = ', 'r'], ['10', 'r', NOW]], 300, 810, 44); });
    fade(A(t, 10.2, .5), () => { mono('4 ≥ 2: primer caso', 780, 730, C.mute, { s: 22 }); F([['4', 'r'], ['2', 'sp'], [' − 8 = ', 'r'], ['8', 'r', NOW]], 780, 810, 44); });
    fade(A(t, 20.2, .5), () => { mono('10 ≥ 8: primer caso', CX, 940, C.mute, { s: 22 }); F([['10 ⊗ 8 = 10', 'r'], ['2', 'sp'], [' − 80 = 100 − 80 = ', 'r'], ['20', 'r', RES]], CX, 1030, 48); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['20', '16', '36', '180'], 0, [['10 ⊗ 8 = 100 − 80 = ', 'r'], ['20', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['de adentro hacia afuera', 'r']], 'anidados'], [[['el caso, en cada paso', 'r']], 'reglas por casos'], [[['peldaño a peldaño', 'r']], 'reglas que se usan a sí mismas'], [[['reemplazar, despejar, comprobar', 'r']], 'ecuaciones']], 420, 170, 38);
      endCard(t, 19.6, D.TITLE, D.LINE, [IN, OUT, RULE]);
    });
  },
};
