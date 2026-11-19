// «Conteo por casos y complemento» · escenas de la lección pu-co-4. Motor en kit.js, preu.js y piezas.js; guion en casos.data.js.
// Múltiplos de 3 en cian, de 5 en ámbar, el cruce en violeta, lo que sobra en rosa, el resultado en verde y lo que se hace
// ahora en lima.
const M3 = C.cyan, M5 = C.amber, BOTH = C.violet, OUT = C.mag, RES = C.green, NOW = C.lime;
// Tablero del 1 al 100 (10 × 10) centrado en cx desde y0; col(n) da el color de cada número o null.
function board(cx, y0, cell, col, k = 1) {
  const x0 = cx - cell * 5;
  for (let n = 1; n <= 100; n++) {
    const i = (n - 1) % 10, j = Math.floor((n - 1) / 10), x = x0 + i * cell, y = y0 + j * cell, c = n <= 100 * k + 1e-9 ? col(n) : null;
    if (c) { X.save(); X.fillStyle = hexA(c, .35); X.fillRect(x + 2, y + 2, cell - 4, cell - 4); X.restore(); }
    else stroke('rgba(160,180,240,.22)', 1, () => X.rect(x + 2, y + 2, cell - 4, cell - 4), { g: 0 });
    T(String(n), x + cell / 2, y + cell * .64, { k: 'r', s: cell * .38, a: 'c', c: c ? C.ink : '#6f7aa3' });
  }
}
const m35 = n => (n % 15 === 0 ? BOTH : n % 3 === 0 ? M3 : n % 5 === 0 ? M5 : null);
const S = {
  // 1 · El reto: múltiplos de 3 o de 5.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La cantidad de números naturales del 1 al 100 que son', 'múltiplos de 3 o de 5 es:'], opts: ['47', '53', '41', '39'], ok: 0 });
    fade(A(t, 9.6, .6), () => board(CX, 760, 72, n => (t > 12 ? m35(n) : null)));
    fade(A(t, 12, .4), () => { mono('de 3', 240, 1520, M3, { s: 22 }); mono('de 5', 420, 1520, M5, { s: 22 }); mono('de los dos', 640, 1520, BOTH, { s: 22 }); });
  },
  // 2 · Contar por casos: cifras que suman 4.
  casos(t) {
    stars(t, .3);
    const rows = [['1', ['103', '112', '121', '130']], ['2', ['202', '211', '220']], ['3', ['301', '310']], ['4', ['400']]];
    rows.forEach(([h, list], r) => fade(A(t, 1 + r * 1.6, .5), () => { const y = 540 + r * 140; pill(170, y, 120, 80, NOW, h + '…', { s: 34 }); list.forEach((s, i) => fade(A(t, 1.6 + r * 1.6 + i * .3, .3), () => pill(330 + i * 170, y, 140, 74, C.cyan, s, { s: 34, fill: .15 }))); if (t > 10) mono(String(list.length), 1000, y + 10, RES, { s: 34 }); }));
    fade(A(t, 20.2, .5), () => F([['4 + 3 + 2 + 1 = ', 'r'], ['10', 'r', RES]], CX, 1200, 60));
  },
  // 3 · Casos que no se pisan.
  pisan(t) {
    stars(t, .3);
    const cols = [C.cyan, C.amber, C.violet, C.blue];
    [0, 1, 2, 3].forEach(i => fade(A(t, .8 + i * .4, .4), () => { stroke(cols[i], 3, () => X.roundRect(130 + i * 210, 560, 190, 300, 22), { g: 10 }); mono(`empieza en ${i + 1}`, 225 + i * 210, 540, cols[i], { s: 20 }); }));
    fade(A(t, 9.2, .5), () => { check(CX, 960, 26, true, A(t, 9.4, .6)); mono('ninguno se queda por fuera', CX, 1030, NOW, { s: 26 }); });
    fade(A(t, 18.2, .5), () => { F([['caso 1 + caso 2 + caso 3 + caso 4', 'r']], CX, 1160, 44); mono('ni dos veces ni ninguna', CX, 1230, RES, { s: 26 }); });
  },
  // 4 · Problema: Ana y Beto no juntos (complemento).
  complemento(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Ana, Beto, Carla y Diego se van a sentar en una fila de', 'cuatro sillas. La cantidad de maneras en que pueden', 'hacerlo, de modo que Ana y Beto no queden juntos, es:'], opts: ['12', '6', '18', '24'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const x = 140, w = 800, y = 960;
      bar(x, y, w, 100, C.cyan, eo(seg(t, 10, 11.4))); mono('todas: 4! = 24', x + w / 2, y + 60, C.ink, { s: 30 });
      fade(A(t, 12.6, .5), () => { bar(x, y + 150, w / 2, 100, OUT, 1); mono('juntos: 3! · 2 = 12', x + w / 4, y + 210, C.ink, { s: 26 }); });
      fade(A(t, 20.4, .5), () => { bar(x + w / 2, y + 150, w / 2, 100, RES, 1); mono('separados: 12', x + 3 * w / 4, y + 210, C.ink, { s: 26 }); F([['24 − 12 = ', 'r'], ['12', 'r', RES]], CX, y + 360, 50); });
    });
  },
  // 5 · «Al menos un 7».
  almenos(t) {
    stars(t, .3);
    const cell = 64, x0 = CX - cell * 5, y0 = 500;
    for (let n = 10; n < 100; n++) { const i = n % 10, j = Math.floor(n / 10) - 1, x = x0 + i * cell, y = y0 + j * cell, has7 = String(n).includes('7'), c = t > 9.4 ? (has7 ? NOW : OUT) : null;
      if (c && (has7 || t > 9.4)) { X.save(); X.fillStyle = hexA(c, has7 ? .45 : .14); X.fillRect(x + 2, y + 2, cell - 4, cell - 4); X.restore(); }
      T(String(n), x + cell / 2, y + cell * .64, { k: 'r', s: 22, a: 'c', c: has7 && t > 1.6 ? NOW : '#9aa3c0' }); }
    fade(A(t, 9.4, .5), () => F([['sin 7: 8 · 9 = ', 'r'], ['72', 'r', OUT]], CX, 1170, 46));
    fade(A(t, 18.2, .5), () => F([['90 − 72 = ', 'r'], ['18', 'r', RES], [' con algún 7', 'r']], CX, 1260, 50));
  },
  // 6 · Problema: los pares de tres cifras.
  pares(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Con los dígitos 1, 2, 3, 4 y 5, sin repetir ninguno, se', 'forman números de tres cifras. La cantidad de esos números', 'que son pares es:'], opts: ['24', '12', '30', '60'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      boxes(CX, 1020, [t > 20.4 ? 4 : null, t > 21 ? 3 : null, t > 10.6 ? 2 : null], [C.cyan, C.cyan, NOW], { labs: ['centenas', 'decenas', 'unidades: 2 o 4'] });
      fade(A(t, 11, .5), () => mono('primero la exigente', 700, 880, NOW, { s: 24 }));
      fade(A(t, 21.6, .5), () => F([['2 · 4 · 3 = ', 'r'], ['24', 'r', RES]], CX, 1270, 56));
    });
  },
  // 7 · Contar múltiplos dividiendo.
  multiplos(t) {
    stars(t, .3);
    board(CX, 460, 64, n => (n % 3 === 0 && t > 1 ? M3 : t > 18 && n % 5 === 0 ? M5 : null), 1);
    fade(A(t, 9.2, .5), () => F([['100 ÷ 3 = 33.3…  →  ', 'r'], ['33', 'r', M3]], CX, 1170, 46));
    fade(A(t, 18.4, .5), () => F([['100 ÷ 5 = ', 'r'], ['20', 'r', M5], ['   ·   100 ÷ 15 = 6.6…  →  ', 'r'], ['6', 'r', BOTH]], CX, 1250, 40));
  },
  // 8 · Los que se cuentan dos veces.
  doble(t) {
    stars(t, .3);
    const r = 220, A0 = [CX - 120, 800], B0 = [CX + 120, 800];
    [[A0, M3, 'A'], [B0, M5, 'B']].forEach(([p, c, n], i) => fade(A(t, .8 + i * .5, .4), () => { X.save(); X.fillStyle = hexA(c, .14); X.beginPath(); X.arc(p[0], p[1], r, 0, 7); X.fill(); X.restore(); ring(p[0], p[1], r, c, 3); bigT(n, p[0] + (i ? 120 : -120), p[1] - 150, c, 50, { k: 'i' }); }));
    fade(A(t, 2, .5), () => { X.save(); X.beginPath(); X.arc(A0[0], A0[1], r, 0, 7); X.clip(); X.beginPath(); X.arc(B0[0], B0[1], r, 0, 7); X.fillStyle = hexA(BOTH, .4); X.fill(); X.restore(); bigT('A ∩ B', CX, 812, BOTH, 34); });
    fade(A(t, 10, .5), () => { mono('el cruce: +1 al sumar A y +1 al sumar B = 2 veces', CX, 1080, OUT, { s: 24 }); });
    fade(A(t, 20.2, .5), () => F([['|A ∪ B| = |A| + |B| − ', 'r'], ['|A ∩ B|', 'r', BOTH]], CX, 1200, 50));
  },
  // 9 · Los múltiplos resueltos.
  resolver(t) {
    stars(t, .3);
    board(CX, 440, 64, n => { const c = m35(n); if (!c) return null; if (c === BOTH) return t > 10 ? BOTH : M3; return c; });
    F([['de 3: ', 'r'], ['33', 'r', M3], ['   de 5: ', 'r'], ['20', 'r', M5]], CX, 1150, 46);
    fade(A(t, 10.2, .5), () => F([['de 15: 15, 30, 45, 60, 75, 90 → ', 'r'], ['6', 'r', BOTH]], CX, 1230, 40));
    fade(A(t, 20.2, .5), () => F([['33 + 20 − 6 = ', 'r'], ['47', 'r', RES]], CX, 1320, 60));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['47', '53', '41', '39'], 0, [['33 + 20 − 6 = ', 'r'], ['47', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['caso + caso', 'r']], 'casos que no se pisan'], [[['total − malos', 'r']], 'complemento'], [[['n ÷ k', 'r']], 'contar múltiplos'], [[['A + B − A∩B', 'r']], 'inclusión y exclusión']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [M3, NOW, M5]);
    });
  },
};
