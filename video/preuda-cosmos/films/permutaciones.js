// «Permutaciones» · escenas de la lección pu-co-2. Motor en kit.js, preu.js y piezas.js; guion en permutaciones.data.js.
// Cada pieza con su color; el bloque amarrado en lima, lo repetido en violeta y el resultado en verde.
const NOW = C.lime, RES = C.green, BAD = C.mag, REP = C.violet;
const LC = { L: C.cyan, I: C.amber, B: C.blue, R: C.violet, O: C.amber, P: C.cyan, A: C.mag };
const tile = (x, y, L, o = {}) => pill(x, y, o.w || 90, o.h || 90, o.c || LC[L] || C.cyan, L, { s: o.s || 48, r: 14, fill: .22 });
const S = {
  // 1 · El reto: las letras de LIBRO.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La cantidad de maneras distintas de ordenar las cinco', 'letras de la palabra LIBRO, de modo que las dos vocales', 'queden juntas, es:'], opts: ['48', '24', '120', '96'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      [...'LIBRO'].forEach((L, i) => tile(260 + i * 140, 960 + 18 * Math.sin(t * 1.2 + i), L));
      fade(A(t, 12, .5), () => { ['BIORL', 'ROILB', 'LBROI'].forEach((s, r) => [...s].forEach((L, i) => tile(330 + i * 105, 1120 + r * 100, L, { w: 76, h: 76, s: 38 }))); [0, 1, 2].forEach(r => { const s = ['BIORL', 'ROILB', 'LBROI'][r], i = Math.min(s.indexOf('I'), s.indexOf('O')); stroke(NOW, 3, () => X.roundRect(330 + i * 105 - 46, 1120 + r * 100 - 46, 197, 92, 16), { g: 12 }); }); });
    });
  },
  // 2 · Ordenar tres libros.
  ordenar(t) {
    stars(t, .3);
    const perms = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA'], cols = { A: C.cyan, B: C.amber, C: C.violet };
    boxes(CX, 560, [3, t > 9.2 ? 2 : null, t > 10.4 ? 1 : null], [C.cyan, C.amber, C.violet], { labs: ['1.º', '2.º', '3.º'] });
    fade(A(t, 2, .5), () => perms.forEach((p, r) => fade(A(t, 2 + r * .9, .4), () => [...p].forEach((L, i) => pill(330 + i * 90 + (r % 2) * 330, 790 + Math.floor(r / 2) * 120, 74, 96, cols[L], L, { s: 40, r: 8, fill: .25 })))));
    fade(A(t, 18.2, .5), () => F([['3 · 2 · 1 = ', 'r'], ['6', 'r', RES]], CX, 1220, 60));
  },
  // 3 · El factorial.
  factorial(t) {
    stars(t, .3);
    F([['n', 'i', NOW], ['! = ', 'r'], ['n', 'i', NOW], [' · (', 'r'], ['n', 'i', NOW], [' − 1) · … · 2 · 1', 'r']], CX, 540, 54);
    [[1, 1], [2, 2], [3, 6], [4, 24], [5, 120], [6, 720]].forEach(([n, v], i) => fade(A(t, 9.2 + i * .6, .4), () => { const y = 680 + i * 76; mono(`${n}!`, 320, y, NOW, { s: 30, a: 'r' }); bar(350, y - 26, Math.max(6, Math.log10(v + 1) * 180), 34, C.cyan, 1); mono(num(v), 350 + Math.log10(v + 1) * 180 + 20, y, C.ink, { s: 28, a: 'l' }); }));
    fade(A(t, 18.2, .5), () => F([['10! = ', 'r'], ['3 628 800', 'r', RES]], CX, 1240, 56));
  },
  // 4 · El podio: ordenar 3 de 8.
  podio(t) {
    stars(t, .3);
    for (let i = 0; i < 8; i++) fade(A(t, .8 + i * .15, .3), () => nodeC(150 + i * 112, 520, 40, C.cyan, String(i + 1), { s: 30 }));
    const P = [[CX, 760, 220, 'oro', C.amber], [CX - 240, 820, 160, 'plata', '#c0c8e0'], [CX + 240, 860, 120, 'bronce', '#d08a5a']];
    P.forEach(([x, y, h, n, c], i) => fade(A(t, 2 + i * .5, .4), () => { bar(x - 100, y, 200, h, c, 1, { fill: .2 }); mono(n, x, y + h / 2 + 8, c, { s: 24 }); }));
    fade(A(t, 9.2, .5), () => boxes(CX, 1160, [8, 7, 6], [C.amber, '#c0c8e0', '#d08a5a'], { labs: ['oro', 'plata', 'bronce'] }));
    fade(A(t, 11, .5), () => F([['8 · 7 · 6 = ', 'r'], ['336', 'r', RES]], CX, 1360, 56));
  },
  // 5 · Problema: tres cargos.
  cargos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['De un grupo de 6 personas se va a escoger un presidente,', 'un secretario y un tesorero, y ninguna persona puede ocupar', 'dos cargos. La cantidad de maneras de hacer la elección es:'], opts: ['120', '20', '216', '18'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const rows = [['Ana', 'Beto', 'Ciro'], ['Ciro', 'Beto', 'Ana']];
      rows.forEach((r, j) => fade(A(t, 10.4 + j * 1.4, .4), () => r.forEach((n, i) => pill(300 + i * 240, 900 + j * 110, 200, 70, [C.amber, C.cyan, C.violet][i], n, { s: 28, fill: .2 }))));
      ['presidente', 'secretario', 'tesorero'].forEach((n, i) => mono(n, 300 + i * 240, 840, C.mute, { s: 20 }));
      fade(A(t, 13.4, .5), () => mono('dos elecciones distintas', CX, 1130, NOW, { s: 24 }));
      fade(A(t, 20.4, .5), () => { boxes(CX, 1270, [6, 5, 4], [C.amber, C.cyan, C.violet], { w: 100, s: 50 }); F([['= ', 'r'], ['120', 'r', RES]], 860, 1290, 50); });
    });
  },
  // 6 · Amarrar un bloque.
  bloque(t) {
    stars(t, .3);
    const ppl = ['Ana', 'Beto', 'Ciro', 'Dora'], cols = [C.amber, C.amber, C.cyan, C.violet];
    ppl.forEach((n, i) => pill(240 + i * 200, 600, 170, 70, cols[i], n, { s: 28, fill: .2 }));
    fade(A(t, 2.4, .5), () => { stroke(NOW, 4, () => X.roundRect(140, 550, 400, 100, 22), { g: 14 }); mono('juntos: un bloque', 340, 700, NOW, { s: 22 }); });
    fade(A(t, 9.2, .5), () => { boxes(CX, 880, [3, 2, 1], [NOW, C.cyan, C.violet], { labs: ['', '', ''] }); F([['3! = ', 'r'], ['6', 'r', NOW]], CX, 1040, 48); });
    fade(A(t, 18.2, .5), () => { pill(360, 1180, 300, 70, C.amber, 'Ana · Beto', { s: 28 }); pill(720, 1180, 300, 70, C.amber, 'Beto · Ana', { s: 28 }); F([['6 · 2 = ', 'r'], ['12', 'r', RES]], CX, 1340, 56); });
  },
  // 7 · Letras repetidas: PAPA.
  repetidas(t) {
    stars(t, .3);
    [...'PAPA'].forEach((L, i) => tile(330 + i * 140, 540, L));
    fade(A(t, 1.6, .5), () => { mono('P₁ A₁ P₂ A₂: 4! = 24', CX, 680, C.mute, { s: 26 }); });
    fade(A(t, 9.2, .5), () => { mono('P₁ A P₂ A  =  P₂ A P₁ A', CX, 780, REP, { s: 28 }); mono('cada palabra se cuenta 2 · 2 = 4 veces', CX, 840, REP, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { ['PAPA', 'PAAP', 'PPAA', 'APAP', 'APPA', 'AAPP'].forEach((s, i) => fade(A(t, 18.4 + i * .3, .3), () => [...s].forEach((L, j) => tile(170 + (i % 3) * 300 + j * 62, 990 + Math.floor(i / 3) * 110, L, { w: 54, h: 70, s: 32 })))); F([['24 ÷ (2! · 2!) = ', 'r'], ['6', 'r', RES]], CX, 1290, 50); });
  },
  // 8 · Cuándo importa el orden.
  importa(t) {
    stars(t, .3);
    fade(A(t, .8, .5), () => { jT('clave · fila · cargos', 300, 560, C.ink, 36); mono('123 ≠ 321', 300, 640, NOW, { s: 30 }); mono('importa el orden', 300, 700, NOW, { s: 22 }); });
    fade(A(t, 9.2, .5), () => { jT('comité · equipo · grupo', 780, 560, C.ink, 36); mono('{Ana, Beto} = {Beto, Ana}', 780, 640, C.amber, { s: 26 }); mono('no importa', 780, 700, C.amber, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { pill(300, 900, 380, 90, NOW, 'permutaciones', { s: 36 }); pill(780, 900, 380, 90, C.amber, 'combinaciones', { s: 36 }); });
  },
  // 9 · LIBRO resuelto.
  resolver(t) {
    stars(t, .3);
    const pieces = [['L', C.cyan], ['IO', NOW], ['B', C.blue], ['R', C.violet]];
    pieces.forEach(([s, c], i) => pill(240 + i * 200, 580, s.length > 1 ? 170 : 110, 100, c, s, { s: 50, r: 16, fill: .22 }));
    fade(A(t, 2, .4), () => mono('4 piezas', CX, 700, C.mute, { s: 24 }));
    fade(A(t, 10.2, .5), () => { boxes(CX, 870, [4, 3, 2, 1], [C.cyan, C.cyan, C.cyan, C.cyan], { w: 100, gap: 150, s: 50 }); F([['4! = ', 'r'], ['24', 'r', NOW]], CX, 1030, 50); });
    fade(A(t, 20.2, .5), () => { pill(380, 1170, 180, 80, NOW, 'I O', { s: 36 }); pill(700, 1170, 180, 80, NOW, 'O I', { s: 36 }); F([['24 · 2 = ', 'r'], ['48', 'r', RES]], CX, 1330, 60); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['48', '24', '120', '96'], 0, [['4! · 2 = ', 'r'], ['48', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['n!', 'r']], 'ordenar n'], [[['8 · 7 · 6', 'r']], 'ordenar 3 de 8'], [[['bloque · 2!', 'r']], 'juntos'], [[['4! ÷ (2! · 2!)', 'r']], 'letras repetidas']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [C.cyan, NOW, C.amber]);
    });
  },
};
