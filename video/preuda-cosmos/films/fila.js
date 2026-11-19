// «Orden en línea» · escenas de la lección pu-or-1. Motor en kit.js, preu.js y piezas.js; guion en fila.data.js.
// Cada persona tiene su color; lo prohibido en rosa, lo seguro en verde y lo que se hace ahora en lima.
const NOW = C.lime, RES = C.green, BAD = C.mag;
const PC = { A: C.amber, B: C.cyan, C: C.violet, D: C.blue, E: C.mag, F: C.green };
const sx = (i, n = 5, gap = 180) => CX + (i - (n - 1) / 2) * gap;
// Fila de n sillas en y (con su número debajo); devuelve x(i).
function seats(y, n = 5, gap = 180, w = 140, o = {}) { for (let i = 0; i < n; i++) slotB(sx(i, n, gap), y, w, 100, o.nums === false ? null : i + 1, { col: o.col }); return i => sx(i, n, gap); }
// Ficha de una persona (inicial con el color de esa persona).
const who = (x, y, L, o = {}) => pill(x, y, o.w || 110, o.h || 80, o.c || PC[L] || C.ink, o.label || L, { s: o.s || 40, fill: .2 });
const xmark = (x, y, k = 1) => check(x, y, 22, false, k);
const S = {
  // 1 · El reto: cinco sillas.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Ana, Beto, Carla, Diego y Elsa se sientan en cinco sillas', 'numeradas de 1 a 5, de izquierda a derecha. Ana no está en', 'un extremo; Beto está justo a la derecha de Carla; Diego', 'está en una silla de número menor que la de Elsa, y Elsa', 'no está junto a Ana. Con certeza:'], opts: ['Elsa ocupa la silla 5', 'Ana ocupa la silla 3', 'Carla ocupa la silla 1', 'Diego ocupa la silla 4'], ok: 0, os: 34 });
    fade(A(t, 9.6, .6), () => {
      seats(1250);
      'ABCDE'.split('').forEach((L, i) => fade(A(t, 10 + i * .3, .4), () => { const x = sx([2, 4, 0, 3, 1][i]), y = 1060 + 14 * Math.sin(t * 1.6 + i); who(x, y, L); T('?', x + 62, y - 30, { k: 'r', s: 30, c: C.mute }); }));
    });
  },
  // 2 · Las pistas en dibujo.
  simbolos(t) {
    stars(t, .3);
    fade(win(t, .6, 9.6), () => {
      jT('«Beto está justo a la derecha de Carla»', CX, 480, C.ink, 38);
      const x = seats(780), p = Math.floor(clamp(seg(t, 3, 8.6)) * 3.999);
      who(x(p), 780, 'C'); who(x(p + 1), 780, 'B');
      stroke(NOW, 3, () => X.roundRect(x(p) - 76, 724, 180 + 152, 112, 20), { g: 12 });
      mono('bloque: se mueven juntos', CX, 980, NOW, { s: 26 });
    });
    fade(win(t, 10, 19.6), () => {
      jT('«Diego está en una silla de número menor que Elsa»', CX, 480, C.ink, 36);
      const x = seats(780), e = 1 + Math.floor(clamp(seg(t, 12, 18.6)) * 3.999);
      who(x(0), 780, 'D'); who(x(e), 780, 'E');
      arrow(x(0) + 70, 700, x(e) - 70, 700, NOW, 1, 3, { h: 12 });
      mono('más adelante, con o sin gente en medio', CX, 980, NOW, { s: 26 });
    });
    fade(A(t, 20, .5), () => {
      jT('«Ana no está en un extremo» · «Elsa no está junto a Ana»', CX, 480, C.ink, 32, { max: 940 });
      const x = seats(780);
      xmark(x(0), 780, A(t, 21, .5)); xmark(x(4), 780, A(t, 21.4, .5)); mono('Ana', x(0), 860, BAD, { s: 22 }); mono('Ana', x(4), 860, BAD, { s: 22 });
      fade(A(t, 23, .5), () => { const y = 1100; seats(y); who(sx(2), y, 'A'); xmark(sx(1), y, A(t, 23.4, .5)); xmark(sx(3), y, A(t, 23.8, .5)); mono('Elsa no puede ir aquí', CX, y + 110, BAD, { s: 22 }); });
    });
  },
  // 3 · Problema: las estaturas.
  alturas(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Carlos es más alto que Diana y más bajo que Esteban.', 'Fabio es más alto que Carlos y más bajo que Esteban.', 'De los cuatro, el segundo más alto es:'], opts: ['Fabio', 'Carlos', 'Esteban', 'Diana'], ok: 0, rv: 21.4 });
    const people = [['Diana', 'D', 200], ['Carlos', 'C', 280], ['Fabio', 'F', 360], ['Esteban', 'E', 440]], y = 1440;
    const order = t < 14 ? [1, 0, 3, 2] : [0, 1, 2, 3];
    people.forEach(([n, L, h], i) => fade(A(t, 10 + i * .6, .5), () => {
      const slot = order[i], x = lerp(sx([1, 0, 3, 2][i], 4, 220), sx(i, 4, 220), eio(seg(t, 14, 16)));
      bar(x - 60, y - h, 120, h, PC[L], 1, { fill: .25 }); mono(n, x, y + 40, PC[L], { s: 24 });
      if (t > 20 && i === 2) { stroke(RES, 4, () => X.roundRect(x - 76, y - h - 16, 152, h + 76, 18), { g: 16 }); mono('2.º', x, y - h - 30, RES, { s: 28 }); }
    }));
    fade(A(t, 16.2, .5), () => mono('Diana < Carlos < Fabio < Esteban', CX, 940, NOW, { s: 28 }));
  },
  // 4 · El bloque cabe en cuatro lugares.
  bloque(t) {
    stars(t, .3);
    const x = seats(760), p = Math.min(3, Math.floor(seg(t, 1.2, 8) * 4));
    who(x(p), 760, 'C'); who(x(p + 1), 760, 'B');
    [0, 1, 2, 3].forEach(i => fade(A(t, 1.2 + i * 1.7, .3), () => { stroke(i === p ? NOW : C.dim, 3, () => { X.moveTo(x(i) - 50, 880 + i * 54); X.lineTo(x(i + 1) + 50, 880 + i * 54); }, { g: i === p ? 10 : 0 }); mono(`${i + 1}-${i + 2}`, x(i + 1) + 110, 888 + i * 54, i === p ? NOW : C.mute, { s: 22 }); }));
    fade(A(t, 9.2, .5), () => mono('pocos casos: se empieza por aquí', CX, 1150, NOW, { s: 28 }));
    fade(A(t, 18.2, .5), () => { [0, 1, 2, 3].forEach(i => check(x(4) + 260, 880 + i * 54, 14, i % 2 === 0, A(t, 18.6 + i * .5, .5))); mono('cada caso contra las demás pistas', CX, 1250, C.mute, { s: 24 }); });
  },
  // 5 · Problema: la carrera de cinco.
  carrera(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Andrés, Bruno, Camilo, Daniel y Esteban corrieron una', 'carrera sin empates. Andrés llegó dos puestos antes que', 'Bruno; Camilo, justo después de Daniel, y Esteban no', 'fue ni primero ni último. Con certeza:'], opts: ['Esteban, justo antes que Bruno', 'Andrés llegó de primero', 'Camilo llegó de último', 'Daniel llegó antes que Andrés'], ok: 0, rv: 23, os: 30 });
    const rows = [[0, 'AEBDC', true], [1, 'XAXBX', false], [2, 'DCAEB', true]];
    fade(A(t, 9.8, .5), () => rows.forEach(([a, s, ok], r) => fade(A(t, 10 + r * 1.6, .5), () => {
      const y = 920 + r * 150;
      for (let i = 0; i < 5; i++) { slotB(sx(i, 5, 150), y, 116, 90, r === 0 ? i + 1 : null); const L = s[i]; if (L !== 'X' && (ok || L === 'A' || L === 'B')) who(sx(i, 5, 150), y, L, { w: 90, h: 70, s: 34 }); }
      check(sx(4, 5, 150) + 130, y, 18, ok, A(t, 11.4 + r * 1.6, .5));
      if (!ok) mono('libres 1, 3, 5: no caben D y C juntos', CX, y + 72, BAD, { s: 22 });
    })));
    fade(A(t, 20.4, .5), () => [0, 2].forEach((r, j) => { const y = 920 + r * 150, s = rows[r][1], e = s.indexOf('E'); stroke(RES, 3, () => X.roundRect(sx(e, 5, 150) - 62, y - 50, 274, 100, 18), { g: 12 }); }));
  },
  // 6 · Certeza o posibilidad.
  certeza(t) {
    stars(t, .3);
    ['AEBDC', 'DCAEB'].forEach((s, r) => fade(A(t, .8 + r * .6, .5), () => { const y = 480 + r * 130; mono(`orden ${r + 1}`, 120, y + 8, C.mute, { s: 22, a: 'l' }); for (let i = 0; i < 5; i++) who(sx(i, 5, 130) + 60, y, s[i], { w: 90, h: 70, s: 34 }); }));
    const st = [['E justo antes que B', '✓', '✓'], ['A llegó de primero', '✓', '✗'], ['C llegó de último', '✓', '✗'], ['D llegó antes que A', '✗', '✓']];
    gridT(70, 760, 170, 86, st.map(r => r[0]), ['orden 1', 'orden 2', 'veredicto'], (i, j) => {
      if (t < 2 + i * .8) return null; if (j < 2) return [st[i][j + 1], st[i][j + 1] === '✓' ? RES : BAD];
      if (t < 9.2) return null; const all = st[i][1] === '✓' && st[i][2] === '✓'; return [all ? 'seguro' : 'posible', all ? RES : C.amber, 'mono'];
    }, { hw: 420, rs: 28, cs: 36 });
    fade(A(t, 18.4, .5), () => stroke(C.amber, 3, () => X.roundRect(80, 760 + 66 + 86, 920, 86, 14), { g: 10 }));
  },
  // 7 · Orden vertical: un edificio.
  pisos(t) {
    stars(t, .3);
    const x0 = 400, w = 280, h = 120, y0 = 1300;
    for (let i = 0; i < 5; i++) { stroke('rgba(160,180,240,.5)', 2, () => X.rect(x0, y0 - (i + 1) * h, w, h), { g: 0 }); mono(String(i + 1), x0 - 40, y0 - i * h - h / 2 + 8, C.mute, { s: 24 }); }
    const p = Math.min(3, Math.floor(seg(t, 9.4, 16) * 4));
    fade(A(t, 2, .5), () => mono('piso 5 arriba · piso 1 abajo', CX, 580, NOW, { s: 26 }));
    fade(A(t, 9.2, .5), () => { who(x0 + w / 2, y0 - p * h - h / 2, 'V', { c: PC.B, label: 'Vélez', w: 200, s: 30 }); who(x0 + w / 2, y0 - (p + 1) * h - h / 2, 'R', { c: PC.C, label: 'Ríos', w: 200, s: 30 }); mono('Ríos, justo', 850, 740, PC.C, { s: 22 }); mono('encima de Vélez', 850, 772, PC.C, { s: 22 }); });
    fade(A(t, 18.2, .5), () => mono('dibujar · fijar lo firme · probar', CX, 1420, NOW, { s: 28 }));
  },
  // 8 · El método en tres pasos.
  probar(t) {
    stars(t, .3);
    [['1', 'Dibujar las casillas y las pistas', 1], ['2', 'Fijar lo más firme: bloques y prohibidos', 9.2], ['3', 'Listar los casos y revisar cada opción', 18.2]].forEach(([n, s, t0], i) => fade(A(t, t0, .6), () => {
      const y = 560 + i * 260; nodeC(170, y, 60, [NOW, C.cyan, C.amber][i], n, { s: 54 }); jT(s, 260, y + 14, C.ink, 40, { a: 'l', max: 760 });
      if (i) arrow(170, y - 190, 170, y - 70, hexA(NOW, .6), 1, 2.5, { h: 10 });
    }));
  },
  // 9 · Las sillas resueltas.
  resolver(t) {
    stars(t, .3);
    const cases = [['CBADE', true], ['?CBA?', false, 'Elsa junto a Ana'], ['DACBE', true], ['?A?CB', false, 'Elsa junto a Ana']];
    cases.forEach(([s, ok, why], r) => fade(A(t, 1 + r * 1.8, .5), () => {
      const y = 460 + r * 150; mono(`bloque ${r + 1}-${r + 2}`, 130, y + 8, C.mute, { s: 20, a: 'l' });
      for (let i = 0; i < 5; i++) { slotB(sx(i, 5, 130) + 90, y, 100, 84, null); if (s[i] !== '?') who(sx(i, 5, 130) + 90, y, s[i], { w: 84, h: 64, s: 30 }); }
      if (t > 10) { check(980, y, 16, ok, A(t, 10 + r * .6, .5)); if (!ok) mono(why, sx(2, 5, 130) + 90, y + 66, BAD, { s: 20 }); }
    }));
    fade(A(t, 20.2, .5), () => { const x = sx(4, 5, 130) + 90; stroke(RES, 4, () => X.roundRect(x - 56, 400, 112, 420, 20), { g: 16 }); mono('silla 5: Elsa en los dos', x - 120, 1120, RES, { s: 28 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['Elsa, silla 5', 'Ana, silla 3', 'Carla, silla 1', 'Diego, silla 4'], 0, 'C B A D E  ·  D A C B E: Elsa siempre en la 5', { s: 36, fs: 36 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['justo a la derecha', 'r']], 'bloque'], [[['a la derecha', 'r']], 'más adelante'], [[['seguro', 'r']], 'en todos los casos'], [[['posible', 'r']], 'en algún caso']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [PC.A, NOW, PC.B]);
    });
  },
};
