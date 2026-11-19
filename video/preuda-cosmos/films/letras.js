// «Letras y figuras» · escenas de la lección pu-se-2. Motor en kit.js, preu.js y piezas.js; guion en letras.data.js.
// Las letras en cian, sus posiciones en ámbar, los saltos en violeta, lo nuevo de cada figura en lima y el resultado en verde.
const LET = C.cyan, POS = C.amber, JMP = C.violet, NOW = C.lime, RES = C.green;
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Tira del alfabeto (26 casillas) desde x0 con ancho de casilla w; resalta las posiciones de hl con su color.
function alpha(x0, y, w, hl = {}, o = {}) {
  [...ABC].forEach((L, i) => { const x = x0 + i * w, c = hl[i + 1]; if (c) { X.save(); X.fillStyle = hexA(c, .3); X.fillRect(x + 1, y - w * .9, w - 2, w * 1.25); X.restore(); } T(L, x + w / 2, y, { k: 'brand', s: w * .62, a: 'c', c: c ? C.ink : '#6f7aa3' }); if (o.nums || c) T(String(i + 1), x + w / 2, y + w * .7, { k: 'mono', s: w * .36, a: 'c', c: c || '#59618a' }); });
}
// Fila de cuadrados de palitos (n cuadrados, lado u) desde (x, y); lo nuevo en lima.
function sticks(x, y, n, u, k = 1) { for (let i = 0; i < n; i++) { const c = i === n - 1 && n > 1 ? NOW : LET; const segs = i ? [[1, 0, 1, 1], [0, 0, 1, 0], [0, 1, 1, 1]] : [[0, 0, 0, 1], [1, 0, 1, 1], [0, 0, 1, 0], [0, 1, 1, 1]]; segs.forEach(([a, b, c2, d]) => segL([x + (i + a) * u, y + b * u], [x + (i + c2) * u, y + d * u], c, k, 5)); } }
const S = {
  // 1 · El reto: A, C, F, J, O, …
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En la secuencia de letras A, C, F, J, O, … (se usa el', 'alfabeto de 26 letras, sin la ñ), la letra que sigue es:'], opts: ['U', 'T', 'S', 'V'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      [...'ACFJO'].forEach((L, i) => fade(A(t, 10 + i * .4, .4), () => pill(220 + i * 150, 980, 110, 110, LET, L, { s: 60, r: 18 })));
      fade(A(t, 12.4, .4), () => pill(220 + 5 * 150, 980, 110, 110, NOW, '?', { s: 60, r: 18, fill: .1 }));
      fade(A(t, 13.4, .5), () => mono('cada vez más separadas', CX, 1120, C.mute, { s: 24 }));
    });
  },
  // 2 · Cada letra, un número.
  numerar(t) {
    stars(t, .3);
    alpha(60, 640, 37, t > 18 ? { 5: POS, 10: POS, 15: POS, 20: POS } : {}, { nums: true });
    fade(A(t, 9.2, .5), () => { F([['A', 'r', LET], [' = 1   ', 'r'], ['B', 'r', LET], [' = 2   …   ', 'r'], ['Z', 'r', LET], [' = 26', 'r']], CX, 820, 46); mono('con números se ven los saltos', CX, 900, NOW, { s: 26 }); });
    fade(A(t, 18.4, .5), () => F([['E', 'r', POS], [' = 5 · ', 'r'], ['J', 'r', POS], [' = 10 · ', 'r'], ['O', 'r', POS], [' = 15 · ', 'r'], ['T', 'r', POS], [' = 20', 'r']], CX, 1020, 44));
  },
  // 3 · Saltos que crecen.
  saltos(t) {
    stars(t, .3);
    alpha(60, 620, 37, { 1: LET, 3: LET, 6: LET, 10: LET, 15: LET });
    const pos = [1, 3, 6, 10, 15], xs = p => 60 + (p - .5) * 37;
    fade(A(t, 9.2, .5), () => pos.slice(1).forEach((p, i) => { hop(xs(pos[i]), xs(p), 560, 40 + i * 12, JMP, eo(seg(t, 9.4 + i * .6, 10 + i * .6)), 3); fade(A(t, 10 + i * .6, .3), () => mono('+' + (i + 2), (xs(pos[i]) + xs(p)) / 2, 520 - i * 12, JMP, { s: 22 })); }));
    fade(A(t, 18.2, .5), () => { const y = 900; [1, 3, 6, 10, 15].forEach((n, k) => { for (let r = 0; r <= k; r++) for (let c = 0; c <= r; c++) if (r * (r + 1) / 2 + c < n) dot(140 + k * 190 + (c - r / 2) * 22, y + r * 22, 6, POS, 6); mono(String(n), 140 + k * 190, y + 140, POS, { s: 24 }); }); mono('números triangulares · sigue +6', CX, 1130, NOW, { s: 26 }); });
  },
  // 4 · Problema: número y letra.
  mezcla(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En la secuencia 3C, 6F, 9I, 12L, … (con el alfabeto de 26', 'letras, sin la ñ), el término que sigue es:'], opts: ['15O', '15N', '14O', '16P'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      alpha(60, 960, 37, { 3: POS, 6: POS, 9: POS, 12: POS, ...(t > 20 ? { 15: RES } : {}) });
      ['3C', '6F', '9I', '12L'].forEach((s, i) => fade(A(t, 10.4 + i * .5, .3), () => pill(230 + i * 160, 1140, 130, 80, POS, s, { s: 38 })));
      fade(A(t, 12.6, .5), () => mono('+3, +3, +3: y la letra en esa posición', CX, 1250, NOW, { s: 24 }));
      fade(A(t, 20.4, .5), () => pill(230 + 4 * 160, 1140, 130, 80, RES, '15O', { s: 38 }));
    });
  },
  // 5 · Figuras de palitos que crecen.
  figuras(t) {
    stars(t, .3);
    [1, 2, 3].forEach((n, i) => fade(A(t, .8 + i * 1.4, .5), () => { sticks(120 + [0, 170, 420][i], 640, n, 80, 1); mono(`${3 * n + 1} palitos`, 120 + [0, 170, 420][i] + n * 40, 780, C.ink, { s: 22 }); }));
    fade(A(t, 9.2, .5), () => mono('cada cuadrado nuevo: +3 (lima)', CX, 900, NOW, { s: 26 }));
    fade(A(t, 18.2, .5), () => F([['figura ', 'r'], ['n', 'i', NOW], [': 3', 'r'], ['n', 'i', NOW], [' + 1 palitos', 'r']], CX, 1040, 52));
  },
  // 6 · Problema: cien palitos.
  palitos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Con palitos iguales se arma una fila de cuadrados: la figura', '1 tiene un cuadrado, la 2 tiene dos, y así. Si se dispone de', '100 palitos, el número de la figura más grande que se puede', 'construir es:'], opts: ['33', '25', '32', '34'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      sticks(120, 920, 3, 70);
      fade(A(t, 10.4, .5), () => F([['3', 'r'], ['n', 'i', NOW], [' + 1 ≤ 100  →  3', 'r'], ['n', 'i', NOW], [' ≤ 99  →  ', 'r'], ['n', 'i', NOW], [' ≤ 33', 'r']], CX, 1120, 44));
      fade(A(t, 20.4, .5), () => { F([['3 · 33 + 1 = ', 'r'], ['100', 'r', RES], ['   ·   3 · 34 + 1 = 103', 'r', C.mute]], CX, 1220, 42); });
    });
  },
  // 7 · Marcos cuadrados.
  marcos(t) {
    stars(t, .3);
    [3, 4, 5].forEach((L, i) => fade(A(t, .8 + i * .8, .5), () => { const u = 34, x0 = 140 + [0, 150, 340][i], y0 = 560; for (let a = 0; a < L; a++) for (let b = 0; b < L; b++) { const edge = a === 0 || b === 0 || a === L - 1 || b === L - 1; if (edge) { X.save(); X.fillStyle = hexA(LET, .35); X.fillRect(x0 + a * u + 2, y0 + b * u + 2, u - 4, u - 4); X.restore(); } } mono(`figura ${i + 1}`, x0 + L * u / 2, y0 + L * u + 30, C.mute, { s: 20 }); }));
    fade(A(t, 9.2, .5), () => F([['lado ', 'r'], ['n', 'i', NOW], [' + 2, hueco ', 'r'], ['n', 'i', NOW]], CX, 880, 46));
    fade(A(t, 18.2, .5), () => { F([['(', 'r'], ['n', 'i', NOW], [' + 2)', 'r'], ['2', 'sp'], [' − ', 'r'], ['n', 'i', NOW], ['2', 'sp'], [' = 4', 'r'], ['n', 'i', NOW], [' + 4', 'r']], CX, 990, 50); F([['figura 15: 4 · 15 + 4 = ', 'r'], ['64', 'r', RES]], CX, 1080, 44); });
  },
  // 8 · Qué se agrega.
  contar(t) {
    stars(t, .3);
    sticks(200, 600, 2, 90); sticks(560, 600, 3, 90);
    fade(A(t, 2, .5), () => mono('la pieza nueva', 830, 580, NOW, { s: 22 }));
    fade(A(t, 9.2, .5), () => F([['siempre lo mismo → ', 'r'], ['a', 'i'], [' · ', 'r'], ['n', 'i', NOW], [' + ', 'r'], ['b', 'i']], CX, 880, 46));
    fade(A(t, 18.2, .5), () => F([['lo agregado crece → ', 'r'], ['n', 'i', NOW], ['2', 'sp', NOW]], CX, 980, 46));
  },
  // 9 · Las letras resueltas.
  resolver(t) {
    stars(t, .3);
    alpha(60, 640, 37, { 1: LET, 3: LET, 6: LET, 10: LET, 15: LET, ...(t > 20 ? { 21: RES } : {}) });
    const xs = p => 60 + (p - .5) * 37;
    fade(A(t, 1, .4), () => mono('O = 15 · último salto: +5', CX, 820, C.ink, { s: 26 }));
    fade(A(t, 10, .5), () => { hop(xs(15), xs(21), 580, 70, NOW, eo(seg(t, 10.2, 11.4)), 4); mono('+6', (xs(15) + xs(21)) / 2, 490, NOW, { s: 28 }); F([['15 + 6 = ', 'r'], ['21', 'r', RES]], CX, 920, 50); });
    fade(A(t, 20.2, .5), () => F([['la letra 21: ', 'r'], ['U', 'r', RES]], CX, 1030, 60));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['U', 'T', 'S', 'V'], 0, [['1, 3, 6, 10, 15, ', 'r'], ['21 → U', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['A = 1 … Z = 26', 'r']], 'letras a números'], [[['+2, +3, +4, …', 'r']], 'saltos que crecen'], [[['3', 'r'], ['n', 'i'], [' + 1', 'r']], 'cuadrados de palitos'], [[['4', 'r'], ['n', 'i'], [' + 4', 'r']], 'marcos']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [LET, NOW, POS]);
    });
  },
};
