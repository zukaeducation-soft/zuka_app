// «Deducir la regla» · escenas de la lección pu-cd-2. Motor en kit.js, preu.js y piezas.js; guion en reglas.data.js.
// Los datos en cian, la regla en ámbar, el residuo en violeta, lo que se busca en lima y el resultado en verde.
const DAT = C.cyan, RULE = C.amber, MOD = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Código de dígitos en casillas (uno puede ser «_»); el último, de control, en violeta.
function code(cx, y, ds, o = {}) { const w = o.w || 110, x0 = cx - (ds.length - 1) * w / 2; ds.forEach((d, i) => pill(x0 + i * w, y, w - 14, w, i === ds.length - 1 ? MOD : d === '_' ? NOW : DAT, d === '_' ? '?' : d, { s: w * .5, r: 14, fill: .2 })); return i => x0 + i * w; }
// Máquina: caja con su letra y su operación.
function machine(x, y, L, op, col, k = 1) { fade(k, () => { stroke(col, 3, () => X.roundRect(x - 80, y - 60, 160, 120, 18), { g: 12 }); bigT(L, x, y + 2, col, 52); mono(op, x, y + 44, C.mute, { s: 20 }); }); }
// Símbolos de la numeración antigua.
function glyph(k, x, y, r, col) { if (k === 'o') ring(x, y, r * .7, col, 3.5); if (k === 't') polyL([at([x, y + r * .2], 90, r), at([x, y + r * .2], 210, r), at([x, y + r * .2], 330, r)], col, { lw: 3.5 }); if (k === 'q') stroke(col, 3.5, () => X.rect(x - r * .7, y - r * .7, r * 1.4, r * 1.4), { g: 10 }); if (k === 's') polyL(Array.from({ length: 10 }, (_, i) => at([x, y], 90 + 36 * i, i % 2 ? r * .45 : r)), col, { lw: 3 }); }
const GV = { o: 1, t: 5, q: 25, s: 125 };
const S = {
  // 1 · El reto: el dígito borrado.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En una bodega cada producto tiene un código de cinco', 'dígitos; el quinto es de control: es el residuo de dividir', 'entre 7 la suma de los cuatro primeros. En una etiqueta se', 'borró el segundo dígito y se lee 5 _ 2 8 4. El borrado es:'], opts: ['3', '4', '0', '6'], ok: 0 });
    fade(A(t, 9.6, .6), () => { code(CX, 1000, ['5', '_', '2', '8', '4']); fade(A(t, 11, .5), () => { mono('control', CX + 2 * 110, 1090, MOD, { s: 22 }); mono('(5 + ? + 2 + 8) ÷ 7 → residuo 4', CX, 1180, RULE, { s: 26 }); }); });
  },
  // 2 · Leer la regla y comprobarla con el ejemplo.
  leer(t) {
    stars(t, .3);
    jT('«el quinto es el residuo de (suma de los cuatro primeros) ÷ 7»', CX, 520, RULE, 32, { max: 960 });
    fade(A(t, 9.2, .5), () => { code(CX, 720, ['2', '5', '1', '3', '4']); F([['2 + 5 + 1 + 3 = ', 'r'], ['11', 'r', DAT]], CX, 880, 50); });
    fade(A(t, 18.2, .5), () => { F([['11 = 7 · 1 + ', 'r'], ['4', 'r', MOD]], CX, 980, 50); check(CX + 230, 965, 20, true, A(t, 18.8, .5)); mono('coincide con el ejemplo', CX, 1050, RES, { s: 24 }); });
  },
  // 3 · Aplicar la regla.
  aplicar(t) {
    stars(t, .3);
    code(CX, 620, ['3', '4', '6', '2', t > 18 ? '1' : '?']);
    fade(A(t, 9.2, .5), () => { F([['3 + 4 + 6 + 2 = ', 'r'], ['15', 'r', DAT]], CX, 800, 52); F([['15 = 7 · 2 + ', 'r'], ['1', 'r', MOD]], CX, 890, 52); });
    fade(A(t, 18.2, .5), () => mono('código: 3 4 6 2 1', CX, 1000, RES, { s: 30 }));
  },
  // 4 · Problema: tres máquinas.
  maquinas(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La máquina A duplica el número que recibe, la B le resta 3', 'y la C lo eleva al cuadrado. Si el número 5 pasa primero', 'por la máquina A, luego por la B y finalmente por la C, el', 'número que sale es:'], opts: ['49', '44', '47', '94'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const xs = [270, 540, 810], seqA = [['A', '× 2', RULE], ['B', '− 3', MOD], ['C', '( )²', DAT]], vals = ['5', '10', '7', '49'];
      seqA.forEach(([L, op, c], i) => machine(xs[i], 1020, L, op, c, A(t, 10 + i * .3, .4)));
      vals.forEach((v, i) => fade(A(t, 10.6 + i * 1.1, .4), () => bigT(v, 135 + i * 270, 1180, i === 3 ? RES : C.ink, 46)));
      fade(A(t, 20.4, .5), () => { const seqB = [['C', '( )²', DAT], ['A', '× 2', RULE], ['B', '− 3', MOD]]; seqB.forEach(([L, op, c], i) => machine(xs[i], 1330, L, op, c, 1)); ['5', '25', '50', '47'].forEach((v, i) => bigT(v, 135 + i * 270, 1470, i === 3 ? BAD : C.ink, 40)); });
    });
  },
  // 5 · Deshacer en orden inverso.
  deshacer(t) {
    stars(t, .3);
    const xs = [270, 540, 810];
    [['C', '( )²', DAT], ['A', '× 2', RULE], ['B', '− 3', MOD]].forEach(([L, op, c], i) => machine(xs[i], 620, L, op, c, 1));
    bigT('?', 135, 780, NOW, 50); bigT('47', 945, 780, C.ink, 46);
    fade(A(t, 9.2, .5), () => { [['+ 3', '50', 810, 9.4], ['÷ 2', '25', 540, 11], ['√', '5', 270, 12.6]].forEach(([op, v, x, t0]) => fade(A(t, t0, .4), () => { arrow(x + 120, 900, x - 120, 900, NOW, 1, 3, { h: 12 }); mono(op, x, 880, NOW, { s: 24 }); bigT(v, x - 135, 960, x === 270 ? RES : C.ink, 44); })); });
    fade(A(t, 18.2, .5), () => mono('de atrás hacia adelante, cada paso al revés', CX, 1100, C.ink, { s: 26 }));
  },
  // 6 · Problema: una numeración antigua.
  simbolos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un antiguo sistema de numeración usa cuatro símbolos:', '○ = 1, △ = 5, □ = 25 y ★ = 125. El valor de un número es la', 'suma de los valores de sus símbolos. El número representado', 'por ★ □ □ △ △ △ △ ○ ○ es:'], opts: ['197', '192', '177', '222'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const seq = 'sqqttttoo'.split(''); seq.forEach((k, i) => glyph(k, 150 + i * 98, 1000, 32, [DAT, RULE, MOD, NOW][['s', 'q', 't', 'o'].indexOf(k)]));
      fade(A(t, 10.6, .5), () => [['125', 150], ['50', 150 + 1.5 * 98], ['20', 150 + 4.5 * 98], ['2', 150 + 7.5 * 98]].forEach(([v, x]) => mono(v, x, 1090, C.ink, { s: 28 })));
      fade(A(t, 20.4, .5), () => F([['125 + 50 + 20 + 2 = ', 'r'], ['197', 'r', RES]], CX, 1220, 52));
    });
  },
  // 7 · Con pocos símbolos: 318.
  pocos(t) {
    stars(t, .3);
    bigT('318', CX, 560, C.ink, 80);
    const steps = [['s', 2, 250, 9.4], ['q', 2, 50, 11], ['t', 3, 15, 12.6], ['o', 3, 3, 14.2]];
    steps.forEach(([k, n, v, t0], i) => fade(A(t, t0, .4), () => { const y = 700 + i * 120; for (let j = 0; j < n; j++) glyph(k, 200 + j * 90, y, 32, [DAT, RULE, MOD, NOW][i]); mono(`${n} × ${GV[k]} = ${v}`, 640, y + 10, C.ink, { s: 28, a: 'l' }); }));
    fade(A(t, 18.2, .5), () => F([['2 + 2 + 3 + 3 = ', 'r'], ['10', 'r', RES], [' símbolos', 'r']], CX, 1260, 50));
  },
  // 8 · Tres luces.
  luces(t) {
    stars(t, .3);
    const COL = ['#ff5a6a', C.amber, C.green], val = s => s.reduce((a, c, i) => a + c * [9, 3, 1][i], 0);
    const lights = t < 17.6 ? [2, 0, 1] : [2, 2, 2];
    [0, 1, 2].forEach(i => { const x = 300 + i * 240; dot(x, 640, 60, COL[lights[i]], 30); mono(['× 9', '× 3', '× 1'][i], x, 760, RULE, { s: 28 }); mono(['rojo 0', 'amarillo 1', 'verde 2'][lights[i]], x, 810, C.mute, { s: 22 }); });
    fade(A(t, 9.2, .5), () => F([[`${lights[0]} · 9 + ${lights[1]} · 3 + ${lights[2]} · 1 = `, 'r'], [String(val(lights)), 'r', RES]], CX, 960, 50));
  },
  // 9 · El dígito resuelto.
  resolver(t) {
    stars(t, .3);
    code(CX, 560, ['5', t > 20 ? '3' : '_', '2', '8', '4']);
    F([['5 + ', 'r'], ['x', 'i', NOW], [' + 2 + 8 = 15 + ', 'r'], ['x', 'i', NOW]], CX, 740, 50);
    fade(A(t, 10.2, .5), () => { [[18, true], [25, false]].forEach(([v, ok], i) => { F([[`15 + x = ${v}`, 'r', ok ? RES : C.mute], [`  →  x = ${v - 15}`, 'r', ok ? RES : BAD]], CX, 860 + i * 80, 44); }); mono('18 y 25 dejan residuo 4 al dividir entre 7', CX, 1040, MOD, { s: 22 }); });
    fade(A(t, 20.2, .5), () => mono('10 no es un dígito: el borrado es 3', CX, 1120, RES, { s: 28 }));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['3', '4', '0', '6'], 0, [['5 + 3 + 2 + 8 = 18 = 7 · 2 + ', 'r'], ['4', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['comprobar con el ejemplo', 'r']], 'leer la regla'], [[['paso a paso', 'r']], 'aplicarla'], [[['al revés y en orden inverso', 'r']], 'deshacer'], [[['primero lo grande', 'r']], 'pocos símbolos']], 420, 170, 38);
      endCard(t, 19.6, D.TITLE, D.LINE, [DAT, NOW, RULE]);
    });
  },
};
