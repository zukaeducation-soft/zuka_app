// «Condiciones: tiene que, podría, no puede» · escenas de la lección pu-or-4. Motor en kit.js, preu.js y piezas.js; guion en
// condiciones.data.js. Cada libro con su color; lo prohibido en rosa, lo seguro en verde y lo que se hace ahora en lima.
const NOW = C.lime, RES = C.green, BAD = C.mag;
const BK = { A: C.amber, B: C.cyan, C: C.violet, D: C.violet, E: C.mag, F: C.green };
const book = (x, y, L, o = {}) => { const c = o.c || BK[L]; X.save(); X.fillStyle = hexA(c, .25); X.fillRect(x - 26, y - 70, 52, 70); X.restore(); stroke(c, 2.5, () => X.rect(x - 26, y - 70, 52, 70), { g: 10 }); T(L, x, y - 24, { k: 'r', s: 34, a: 'c', c: C.ink }); };
// Tres estantes en columnas (x0, ancho w), con su número; el piso de cada uno en y.
function shelves(x0, y, w, asg, o = {}) {
  for (let k = 0; k < 3; k++) {
    const x = x0 + k * (w + 30); stroke('rgba(225,232,255,.8)', 4, () => { X.moveTo(x, y); X.lineTo(x + w, y); }, { g: 6 });
    if (o.nums !== false) T(String(k + 1), x + w / 2, y + 40, { k: 'mono', s: 22, a: 'c', c: C.mute });
    (asg[k + 1] || []).forEach((L, i, arr) => book(x + w / 2 + (i - (arr.length - 1) / 2) * 60, y - 4, L));
  }
}
const SIX = [['ACD', 'BF', 'E'], ['ACD', 'F', 'BE'], ['BCD', 'AF', 'E'], ['CD', 'AF', 'BE'], ['BCD', 'F', 'AE'], ['CD', 'BF', 'AE']];
const S = {
  // 1 · El reto: los libros de la biblioteca.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Una bibliotecaria ubica seis libros, A, B, C, D, E y F,', 'en tres estantes numerados de 1 a 3, con uno a tres libros', 'por estante. A y B no quedan en el mismo estante; C y D', 'sí; E queda en un estante de número mayor que el de F.', 'Si C queda en el estante 1 y F en el 2, con certeza:'], opts: ['E queda en el estante 3', 'A queda en el estante 1', 'En el estante 2 hay dos libros', 'B y E quedan en el mismo estante'], ok: 0, col1: true });
    fade(A(t, 10, .6), () => {
      shelves(120, 1360, 260, { 1: ['C', 'D'], 2: ['F'] });
      'ABE'.split('').forEach((L, i) => fade(A(t, 10.6 + i * .4, .4), () => book(400 + i * 140, 1210 + 12 * Math.sin(t * 1.4 + i), L)));
      fade(A(t, 20.4, .5), () => mono('A, B y E: dónde van', CX, 1460, NOW, { s: 26 }));
    });
  },
  // 2 · Leer un «si…».
  si(t) {
    stars(t, .3);
    jT('«Si A participa, B no»', CX, 470, C.ink, 46);
    const G = gridT(150, 580, 260, 140, ['A está', 'A no está'], ['B está', 'B no está'], (i, j) => {
      if (t < 10) return null; if (i === 0 && j === 0) return ['✗', BAD]; if (t < 20 && i === 1) return null; return ['✓', RES];
    }, { hw: 220, rs: 34, hs: 28, cs: 56 });
    fade(win(t, .8, 9.6), () => stroke(NOW, 4, () => X.roundRect(G.cx(0) - 126, G.cy(0) - 66, 512, 132, 14), { g: 14 }));
    fade(A(t, 12, .5), () => mono('el único caso prohibido: los dos', CX, 1060, BAD, { s: 26 }));
    fade(A(t, 20, .5), () => { stroke(NOW, 4, () => X.roundRect(G.cx(0) - 126, G.cy(1) - 66, 512, 132, 14), { g: 14 }); mono('si A no está, la regla no dice nada', CX, 1130, NOW, { s: 26 }); });
  },
  // 3 · Tiene que, podría, no puede.
  tres(t) {
    stars(t, .3);
    const rows = [['tiene que', '✓✓✓✓', RES], ['podría', '✓✗✗✓', C.amber], ['no puede', '✗✗✗✗', BAD]];
    gridT(80, 520, 150, 110, rows.map(r => r[0]), ['caso 1', 'caso 2', 'caso 3', 'caso 4'], (i, j) => {
      const t0 = i === 0 ? 10 : i === 1 ? 13 : 20; if (t < t0 + j * .3) return null; const m = rows[i][1][j]; return [m, m === '✓' ? RES : BAD];
    }, { hw: 280, rs: 34, hs: 22, cs: 48 });
    fade(A(t, 1, .5), () => mono('los casos que cumplen todas las reglas', CX, 470, NOW, { s: 26 }));
    rows.forEach(([n, , c], i) => fade(A(t, [11, 15, 21][i], .5), () => mono(['en todos', 'en al menos uno', 'en ninguno'][i], CX, 1060 + i * 60, c, { s: 30 })));
  },
  // 4 · Juntos, separados y «mayor que».
  juntos(t) {
    stars(t, .3);
    fade(win(t, .6, 9.2), () => { shelves(120, 900, 260, { 1: ['C', 'D'] }); stroke(NOW, 3, () => X.roundRect(170, 790, 160, 120, 14), { g: 12 }); mono('un paquete', 250, 980, NOW, { s: 24 }); });
    fade(win(t, 9.2, 17.6), () => { shelves(120, 900, 260, { 1: ['A'], 3: ['B'] }); mono('A y B: estantes distintos', CX, 1000, NOW, { s: 26 }); });
    fade(A(t, 18, .5), () => {
      shelves(120, 900, 260, {});
      [[0, 'E', 'E no'], [2, 'F', 'F no']].forEach(([k, L, s], i) => fade(A(t, 18.4 + i * .8, .4), () => { const x = 120 + k * 290 + 130; book(x, 896, L, { c: C.dim }); check(x, 790, 20, false, A(t, 18.8 + i * .8, .5)); mono(s, x, 980, BAD, { s: 22 }); }));
      fade(A(t, 20.6, .5), () => mono('E mayor que F: los extremos se tachan', CX, 1080, NOW, { s: 26 }));
    });
  },
  // 5 · Problema: la carrera de cuatro.
  carrera(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Pablo, Juan, Carlos y Luis corrieron una carrera sin', 'empates. Pablo llegó antes que Juan, Carlos antes que', 'Juan y Luis antes que Pablo. Con certeza:'], opts: ['Si Carlos llegó después de Pablo, Carlos fue tercero', 'Si Carlos no llegó de primero, Carlos fue tercero', 'Luis llegó de primero', 'Carlos llegó antes que Pablo'], ok: 0, rv: 23, col1: true });
    const orders = ['LPCJ', 'LCPJ', 'CLPJ'], col = { L: C.amber, P: C.cyan, C: C.violet, J: C.blue };
    fade(A(t, 10, .5), () => orders.forEach((s, r) => fade(A(t, 10.4 + r * .8, .4), () => {
      const y = 1180 + r * 100; mono(`orden ${r + 1}`, 140, y + 8, C.mute, { s: 22, a: 'l' });
      [...s].forEach((L, i) => pill(380 + i * 150, y, 120, 66, col[L], { L: 'Luis', P: 'Pablo', C: 'Carlos', J: 'Juan' }[L], { s: 24, fill: .2 }));
      if (t > 20.4) { const ok = r === 0; fade(ok ? 1 : .35, () => { if (ok) stroke(RES, 4, () => X.roundRect(380 + 2 * 150 - 70, y - 42, 140, 84, 22), { g: 16 }); }); }
    })));
  },
  // 6 · Problema: el equipo de cuatro.
  equipo(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un entrenador escoge 4 jugadores entre A, B, C, D, E y F.', 'A y B no pueden estar los dos; si C está, D también, y', 'de E y F exactamente uno debe estar. Con certeza:'], opts: ['C y D están en el equipo', 'A está en el equipo', 'E está en el equipo', 'B y F están en el equipo'], ok: 0, rv: 22.6, col1: true });
    const cols = { A: C.amber, B: C.amber, C: C.violet, D: C.violet, E: C.cyan, F: C.cyan };
    fade(A(t, 9.8, .5), () => {
      [['A o B', C.amber, '1'], ['E o F', C.cyan, '1'], ['C y D', C.violet, '2']].forEach(([s, c, n], i) => fade(A(t, 10 + i * 1.6, .4), () => { pill(220 + i * 320, 1170, 240, 80, c, s, { s: 32, fill: .2 }); mono(n === '2' ? 'los 2 que faltan' : 'a lo sumo 1 · exactamente 1'.split(' · ')[i], 220 + i * 320, 1250, c, { s: 20 }); }));
      fade(A(t, 20.2, .5), () => ['ACDE', 'ACDF', 'BCDE', 'BCDF'].forEach((s, r) => [...s].forEach((L, i) => pill(330 + r * 140, 1340 + i * 46, 56, 40, cols[L], L, { s: 24, fill: .2 }))));
    });
  },
  // 7 · «Si además…»: un dato que recorta la lista.
  hipotesis(t) {
    stars(t, .3);
    const n = t < 18.4 ? 30 : Math.round(lerp(30, 6, eio(seg(t, 18.4, 21))));
    for (let i = 0; i < 30; i++) { const on = i < n, x = 230 + (i % 10) * 70, y = 620 + Math.floor(i / 10) * 70; if (on) dot(x, y, 14, i < 6 && t > 21 ? RES : C.cyan, 12); else ring(x, y, 14, C.dim, 2); }
    mono(`${n} acomodos`, CX, 880, C.ink, { s: 30 });
    fade(A(t, 1, .5), () => mono('con las reglas de base', CX, 520, C.mute, { s: 24 }));
    fade(A(t, 9.2, .5), () => { pill(CX, 1000, 620, 80, NOW, 'si además C en el 1 y F en el 2', { s: 30, fill: .1 }); mono('vale solo para esa pregunta', CX, 1080, NOW, { s: 24 }); });
    fade(A(t, 21.4, .5), () => mono('menos casos, más certezas', CX, 1160, RES, { s: 28 }));
  },
  // 8 · Listar con orden.
  lista(t) {
    stars(t, .3);
    const asg = t < 9 ? { 1: ['C', 'D'], 2: ['F'] } : t < 18 ? { 1: ['C', 'D'], 2: ['F'], 3: ['E'] } : { 1: ['C', 'D'], 2: ['F', 'A'], 3: ['E', 'B'] };
    shelves(120, 960, 260, asg);
    fade(A(t, 9.4, .5), () => mono('E > F = 2  →  E en el 3', CX, 1080, NOW, { s: 28 }));
    fade(A(t, 18.4, .5), () => mono('A y B, separados; máximo 3 por estante', CX, 1140, C.ink, { s: 26 }));
  },
  // 9 · Los libros resueltos: seis acomodos.
  resolver(t) {
    stars(t, .3);
    SIX.forEach((row, r) => fade(A(t, 1 + r * .9, .4), () => {
      const y = 520 + r * 140; mono(String(r + 1), 110, y - 26, C.mute, { s: 22 });
      row.forEach((s, k) => { const x0 = 170 + k * 280; stroke('rgba(225,232,255,.6)', 3, () => { X.moveTo(x0, y); X.lineTo(x0 + 240, y); }, { g: 0 }); [...s].forEach((L, i, a) => book(x0 + 120 + (i - (a.length - 1) / 2) * 60, y - 4, L)); });
    }));
    fade(A(t, 10.6, .5), () => mono('estante 2: uno o dos libros · A y B cambian', CX, 400, C.amber, { s: 24 }));
    fade(A(t, 20.2, .5), () => { stroke(RES, 4, () => X.roundRect(170 + 2 * 280 - 10, 420, 260, 830, 20), { g: 16 }); mono('E, siempre en el 3', 170 + 2 * 280 + 120, 1300, RES, { s: 28 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['E en el estante 3', 'A en el estante 1', 'Estante 2: dos libros', 'B y E juntos'], 0, 'En los seis acomodos posibles, E queda en el estante 3', { s: 28, fs: 34 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['si A, no B', 'r']], 'solo prohíbe A y B'], [[['tiene que', 'r']], 'en todos los casos'], [[['podría', 'r']], 'en alguno'], [[['no puede', 'r']], 'en ninguno']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [RES, NOW, C.amber]);
    });
  },
};
