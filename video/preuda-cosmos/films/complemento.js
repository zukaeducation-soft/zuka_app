// «Complemento e independencia» · escenas de la lección pu-pb-2. Motor en kit.js, preu.js y piezas.js; guion en complemento.data.js.
// Una opción (niño, cara) en cian, la otra (niña, sello) en ámbar, lo que no sirve en magenta, lo que sirve en lima y el resultado en verde.
const O1 = C.cyan, O2 = C.amber, BAD = C.mag, FAV = C.lime, RES = C.green, AZ = C.blue, VE = C.violet;
// Árbol de tres niveles con dos ramas; labs = [a, b]; ok(path) colorea las hojas.
function tree3(x0, y0, dx, dy, labs, ok, k = 1) {
  const leaves = [];
  const go = (x, y, lvl, path) => { if (lvl === 3) { leaves.push([x, y, path]); return; } [0, 1].forEach(b => { const yy = y + (b ? 1 : -1) * dy / 2 ** lvl, xx = x + dx; if (clamp(k * 3 - lvl) > 0) { segL([x + 20, y], [xx - 26, yy], 'rgba(200,210,240,.5)', clamp(k * 3 - lvl), 2.5, { g: 0 }); fade(clamp(k * 3 - lvl), () => nodeC(xx, yy, 22, b ? O2 : O1, labs[b], { s: 22, fill: .2 })); } go(xx, yy, lvl + 1, path + labs[b]); }); };
  dot(x0, y0, 8, C.ink, 8); go(x0, y0, 0, '');
  leaves.forEach(([x, y, p]) => fade(clamp(k * 3 - 2), () => { const g = ok ? ok(p) : null; mono(p, x + 50, y + 8, g === true ? FAV : g === false ? BAD : C.mute, { s: 22, a: 'l' }); }));
}
const S = {
  // 1 · El reto: tres hijos.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Una pareja tiene tres hijos. Si en cada nacimiento es igual de', 'probable que nazca niño o niña, la probabilidad de que entre los', 'tres haya por lo menos un niño y por lo menos una niña es:'], opts: ['3/4', '1/2', '7/8', '3/8'], ok: 0 });
    fade(A(t, 9.6, .6), () => [0, 1, 2].forEach(i => { pill(330 + i * 210, 1000, 150, 150, C.mute, '?', { s: 60, r: 75 }); mono(`${i + 1}.º`, 330 + i * 210, 1110, C.mute, { s: 22 }); }));
    fade(A(t, 11, .5), () => { mono('niño (H) o niña (M)', CX, 1200, C.ink, { s: 26 }); });
  },
  // 2 · El complemento.
  complemento(t) {
    stars(t, .3);
    F([['P(no ', 'r'], ['A', 'i', BAD], [') = 1 − P(', 'r'], ['A', 'i', BAD], [')', 'r']], CX, 560, 56);
    fade(A(t, 9.2, .5), () => { [1, 2, 3, 4, 5, 6].forEach((n, i) => pill(205 + i * 134, 720, 110, 110, n === 6 ? BAD : FAV, n, { s: 48, r: 18 })); F([['1 − 1/6 = ', 'r'], ['5/6', 'r', RES]], CX, 860, 50); });
    fade(A(t, 18.2, .5), () => { F([['P(al menos uno) = 1 − ', 'r'], ['P(ninguno)', 'r', BAD]], CX, 1000, 46); mono('ninguno es un solo caso', CX, 1080, C.mute, { s: 24 }); });
  },
  // 3 · El árbol de caminos.
  arbol(t) {
    stars(t, .3);
    tree3(170, 860, 210, 170, ['H', 'M'], null, t < 9 ? seg(t, .8, 4) * .67 : seg(t, 9.2, 11) * .33 + .67);
    fade(A(t, 9.8, .5), () => mono('8 caminos de 1/8', 860, 520, FAV, { s: 26 }));
    fade(A(t, 18.2, .5), () => { F([['camino: ½ · ½ · ½ = 1/8', 'r']], CX, 1270, 40); F([['varios caminos: se suman', 'r', FAV]], CX, 1340, 40); });
  },
  // 4 · Problema: al menos dos caras.
  caras(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Se lanza una moneda corriente tres veces. La probabilidad de', 'obtener cara por lo menos dos veces es:'], opts: ['1/2', '3/8', '1/4', '5/8'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      tree3(170, 1060, 210, 170, ['C', 'S'], t > 10.4 ? p => [...p].filter(c => c === 'C').length >= 2 : null, seg(t, 9.8, 10.6));
      fade(A(t, 20.4, .5), () => F([['4 / 8 = ', 'r'], ['1/2', 'r', RES]], CX, 1450, 50));
    });
  },
  // 5 · Problema: dos balotas del mismo color.
  balotas(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una bolsa hay 4 balotas rojas, 3 azules y 2 verdes. Si se', 'sacan al azar dos balotas al mismo tiempo, la probabilidad de', 'que las dos sean del mismo color es:'], opts: ['5/18', '1/3', '2/9', '13/36'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      [[4, BAD, 'rojas: 6 parejas'], [3, AZ, 'azules: 3'], [2, VE, 'verdes: 1']].forEach(([n, c, lab], r) => { for (let i = 0; i < n; i++) dot(200 + i * 70, 960 + r * 100, 24, c, 12); fade(A(t, 12 + r * .8, .4), () => mono(lab, 520, 968 + r * 100, c, { s: 24, a: 'l' })); });
      fade(A(t, 10.6, .5), () => F([['parejas: 9 · 8 ÷ 2 = ', 'r'], ['36', 'r', O1]], CX, 1300, 40));
      fade(A(t, 20.4, .5), () => F([['10 / 36 = ', 'r'], ['5/18', 'r', RES]], CX, 1390, 48));
    });
  },
  // 6 · Con o sin devolver.
  reposicion(t) {
    stars(t, .3);
    const bag = (x, y, r, n) => { for (let i = 0; i < n; i++) dot(x + (i % 5) * 46 - 92, y + Math.floor(i / 5) * 46, 16, i < r ? BAD : C.mute, 10); stroke('rgba(200,210,240,.5)', 2, () => X.roundRect(x - 130, y - 40, 260, 140, 20), { g: 0 }); };
    bag(300, 600, 4, 9); mono('4 rojas de 9', 300, 780, BAD, { s: 22 });
    fade(A(t, .8, .5), () => { F([['devolviendo: 4/9 · 4/9 = ', 'r'], ['16/81', 'r', O1]], CX, 880, 42); });
    fade(A(t, 9.2, .5), () => { bag(780, 600, 3, 8); mono('sin devolver: 3 de 8', 780, 780, O2, { s: 22 }); arrow(450, 640, 630, 640, O2, 1, 3, { h: 12 }); });
    fade(A(t, 18.2, .5), () => F([['sin devolver: 4/9 · 3/8 = ', 'r'], ['1/6', 'r', RES]], CX, 980, 42));
  },
  // 7 · La condición achica el total.
  condicion(t) {
    stars(t, .3);
    for (let i = 0; i < 60; i++) { const perro = i < 32, gato = i < 8 || (i >= 32 && i < 49), x = 150 + (i % 12) * 71, y = 560 + Math.floor(i / 12) * 70; fade(t > 9.2 && !perro ? .15 : 1, () => dot(x, y, 18, perro ? (gato && t > 18.2 ? FAV : O1) : O2, 10)); }
    fade(A(t, .8, .5), () => { mono('con perro: 32', 300, 950, O1, { s: 24 }); mono('sin perro', 800, 950, O2, { s: 24 }); });
    fade(A(t, 9.4, .5), () => mono('posibles: solo las 32 con perro', CX, 1020, O1, { s: 26 }));
    fade(A(t, 18.2, .5), () => { F([['8 / 32 = ', 'r'], ['1/4', 'r', RES]], CX, 1120, 52); mono('no 8/60', CX, 1200, BAD, { s: 26 }); });
  },
  // 8 · Sin memoria.
  memoria(t) {
    stars(t, .3);
    ['C', 'C', 'C', 'C', 'C', '?'].forEach((c, i) => pill(200 + i * 136, 620, 110, 110, i === 5 ? FAV : O1, c, { s: 48, r: 55 }));
    fade(A(t, 1.6, .5), () => mono('la sexta: P(cara) = 1/2', CX, 750, FAV, { s: 28 }));
    fade(A(t, 9.2, .5), () => mono('independientes: uno no cambia al otro', CX, 860, C.ink, { s: 26 }));
    fade(A(t, 18.2, .5), () => F([['P(6 y 6) = 1/6 · 1/6 = ', 'r'], ['1/36', 'r', RES]], CX, 990, 48));
  },
  // 9 · Los hijos resueltos.
  resolver(t) {
    stars(t, .3);
    tree3(170, 820, 210, 170, ['H', 'M'], t > 1 ? p => !(p === 'HHH' || p === 'MMM') : null, 1);
    fade(A(t, 10.2, .5), () => F([['P(todos iguales) = 2/8 = ', 'r'], ['1/4', 'r', BAD]], CX, 1240, 42));
    fade(A(t, 20.2, .5), () => F([['1 − 1/4 = ', 'r'], ['3/4', 'r', RES]], CX, 1330, 56));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['3/4', '1/2', '7/8', '3/8'], 0, [['1 − 2/8 = ', 'r'], ['3/4', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['1 − P(A)', 'r']], 'complemento'], [[['× por camino, + entre caminos', 'r']], 'el árbol'], [[['¿se devuelve?', 'r']], 'reposición'], [[['el total se achica', 'r']], 'condición']], 420, 170, 38);
      endCard(t, 19.6, D.TITLE, D.LINE, [O1, O2, FAV]);
    });
  },
};
