// «Negación y De Morgan» · escenas de la lección pu-lo-2. Motor en kit.js, preu.js y piezas.js; guion en negacion.data.js.
// La frase en cian, la negación en violeta, el «y» y el «o» en ámbar, lo que se mira ahora en lima, lo cierto en verde y lo falso en magenta.
const FR_ = C.cyan, NEG = C.violet, CON = C.amber, NOW = C.lime, RES = C.green, BAD = C.mag;
// Salón con estudiantes: g[i] = usa gafas.
function room(x, y, g, o = {}) {
  const w = 200, h = 170; X.save(); X.fillStyle = hexA(o.col || FR_, .08); X.beginPath(); X.roundRect(x - w / 2, y - h / 2, w, h, 18); X.fill(); X.restore();
  stroke(o.col || FR_, o.hl ? 4 : 2.5, () => X.roundRect(x - w / 2, y - h / 2, w, h, 18), { g: o.hl ? 18 : 8 });
  g.forEach((v, i) => { const px = x - 60 + (i % 3) * 60, py = y - 30 + Math.floor(i / 3) * 64; dot(px, py, 14, v ? NOW : 'rgba(200,210,240,.55)', v ? 14 : 0); if (v) { ring(px - 9, py - 4, 7, '#0a0e22', 2.5); ring(px + 9, py - 4, 7, '#0a0e22', 2.5); } });
  if (o.lab) mono(o.lab, x, y + h / 2 + 34, o.labc || C.mute, { s: 20 });
}
const ROOMS = [[1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0]];
const S = {
  // 1 · El reto: los salones y las gafas.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['La negación de la frase «en todos los salones hay algún', 'estudiante que usa gafas» es:'], opts: ['En algún salón ningún estudiante usa gafas', 'En ningún salón hay estudiantes que usen gafas', 'En algún salón todos los estudiantes usan gafas', 'En todos los salones hay alguno que no usa gafas'], ok: 0, col1: true, os: 30 });
    fade(A(t, 9.6, .6), () => [0, 1, 3].forEach((r, i) => fade(A(t, 10 + i * .4, .4), () => room(250 + i * 290, 1080, ROOMS[r], { lab: 'salón ' + (i + 1) }))));
    fade(A(t, 20.2, .5), () => mono('todos · algún: las dos palabras que mandan', CX, 1290, NOW, { s: 26 }));
  },
  // 2 · Negar no es lo opuesto.
  opuesto(t) {
    stars(t, .3);
    jT('«El café está caliente»', CX, 560, FR_, 48);
    const x0 = 140, w = 800, y = 820, Z = [['frío', 0, .33, C.cyan], ['tibio', .33, .66, C.amber], ['caliente', .66, 1, BAD]];
    Z.forEach(([n, a, b, c]) => { X.save(); X.fillStyle = hexA(c, .22); X.fillRect(x0 + a * w, y - 40, (b - a) * w, 80); X.restore(); mono(n, x0 + (a + b) / 2 * w, y + 80, c, { s: 26 }); });
    stroke('rgba(225,232,255,.6)', 2, () => X.rect(x0, y - 40, w, 80), { g: 0 });
    fade(A(t, 9.2, .5), () => { stroke(NEG, 5, () => X.roundRect(x0 - 6, y - 52, w * .66 + 6, 104, 14), { g: 16 }); jT('«no está caliente» = frío o tibio', CX, 1020, NEG, 38); });
    fade(A(t, 18.2, .5), () => { stroke(BAD, 3, () => X.roundRect(x0 - 2, y - 46, w * .33, 92, 12), { dash: [10, 6], g: 8 }); jT('«está frío» deja por fuera el tibio', CX, 1110, BAD, 36); });
  },
  // 3 · Problema: alto y rubio.
  juan(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La negación de la frase «Juan es alto y es rubio» es:'], opts: ['Juan no es alto o no es rubio', 'Juan no es alto y no es rubio', 'Juan es alto o es rubio', 'Juan es alto y no es rubio'], ok: 0, col1: true, os: 32, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      gridT(170, 900, 300, 120, ['alto', 'no alto'], ['rubio', 'no rubio'], (i, j) => i === 0 && j === 0 ? ['la frase', FR_, 'j'] : t > 11 ? ['niega', t > 20.4 ? RES : NEG, 'j'] : null, { hw: 200, hh: 60, cs: 34, rs: 32, hs: 26 });
      fade(A(t, 12, .5), () => mono('tres casillas de cuatro: basta que falle una parte', CX, 1260, NEG, { s: 24 }));
    });
  },
  // 4 · Las leyes de De Morgan.
  morgan(t) {
    stars(t, .3);
    F([['¬(', 'r', NEG], ['p', 'i'], [' ∧ ', 'r', CON], ['q', 'i'], [')', 'r', NEG], ['  =  ', 'r'], ['¬', 'r', NEG], ['p', 'i'], [' ∨ ', 'r', CON], ['¬', 'r', NEG], ['q', 'i']], CX, 600, 66);
    fade(A(t, 9.2, .5), () => F([['¬(', 'r', NEG], ['p', 'i'], [' ∨ ', 'r', CON], ['q', 'i'], [')', 'r', NEG], ['  =  ', 'r'], ['¬', 'r', NEG], ['p', 'i'], [' ∧ ', 'r', CON], ['¬', 'r', NEG], ['q', 'i']], CX, 760, 66));
    fade(A(t, 2, .5), () => mono('el «y» se vuelve «o»', CX, 660, CON, { s: 24 }));
    fade(A(t, 10.6, .5), () => mono('el «o» se vuelve «y»', CX, 820, CON, { s: 24 }));
    fade(A(t, 18.2, .5), () => { pill(CX, 960, 620, 90, FR_, 'voy a cine o a teatro', { s: 34 }); arrow(CX, 1010, CX, 1080, NEG, 1, 3, { h: 12 }); pill(CX, 1140, 780, 90, NEG, 'no voy a cine y no voy a teatro', { s: 34 }); });
  },
  // 5 · Problema: no todos los pájaros.
  pajaros(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La afirmación «no todos los pájaros vuelan» equivale a:'], opts: ['Algún pájaro no vuela', 'Ningún pájaro vuela', 'Todos los pájaros no vuelan', 'Algún pájaro vuela'], ok: 0, col1: true, os: 32, rv: 22.6 });
    fade(A(t, 10, .5), () => [['colibrí', 1], ['loro', 1], ['águila', 1], ['pingüino', 0]].forEach(([n, v], i) => fade(A(t, 10.2 + i * .5, .4), () => { const x = 180 + i * 240; pill(x, 1000, 210, 90, v ? FR_ : (t > 11.8 ? BAD : FR_), n, { s: 32 }); mono(v ? 'vuela' : 'no vuela', x, 1090, v ? C.mute : BAD, { s: 22 }); })));
    fade(A(t, 12.6, .5), () => mono('con uno basta para tumbar el «todos»', CX, 1190, NOW, { s: 26 }));
  },
  // 6 · Alguno y ninguno.
  alguno(t) {
    stars(t, .3);
    jT('«Algún estudiante llegó tarde»', CX, 560, FR_, 44);
    const late = t < 9 ? 3 : -1;
    for (let i = 0; i < 6; i++) { const x = 230 + i * 124; dot(x, 760, 30, i === late ? BAD : 'rgba(200,210,240,.6)', i === late ? 20 : 0); mono(i === late ? 'tarde' : 'a tiempo', x, 830, i === late ? BAD : C.mute, { s: 18 }); }
    fade(A(t, 1.6, .5), () => { if (t < 9) mono('uno solo: ya es cierta', CX, 920, BAD, { s: 26 }); });
    fade(A(t, 9.4, .5), () => mono('falsa: ni uno llegó tarde', CX, 920, NEG, { s: 26 }));
    fade(A(t, 18.2, .5), () => { jT('«Ningún estudiante llegó tarde»', CX, 1060, NEG, 44); F([['todos  ↔  alguno no', 'r', CON], ['     ', 'r'], ['alguno  ↔  ninguno', 'r', CON]], CX, 1180, 40); });
  },
  // 7 · El cuadro de las negaciones.
  cuadro(t) {
    stars(t, .3);
    const P = { a: [260, 620], b: [820, 620], c: [260, 1100], d: [820, 1100] };
    [['a', 'todos'], ['b', 'ninguno'], ['c', 'alguno'], ['d', 'alguno no']].forEach(([k, s]) => pill(...P[k], 260, 90, FR_, s, { s: 36 }));
    fade(A(t, .8, .5), () => { segL([P.a[0] + 70, P.a[1] + 60], [P.d[0] - 70, P.d[1] - 60], NOW, A(t, 1, 1), 4); mono('negación', 420, 820, NOW, { s: 22 }); });
    fade(A(t, 9.2, .5), () => { segL([P.b[0] - 70, P.b[1] + 60], [P.c[0] + 70, P.c[1] - 60], NOW, A(t, 9.4, 1), 4); mono('negación', 660, 820, NOW, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { stroke(BAD, 3, () => { X.moveTo(P.a[0] + 140, P.a[1]); X.lineTo(P.b[0] - 140, P.b[1]); }, { dash: [10, 8], g: 8 }); mono('no son negaciones', CX, P.a[1] - 70, BAD, { s: 24 }); mono('«unos sí y otros no»: las dos fallan', CX, 1260, BAD, { s: 24 }); });
  },
  // 8 · Frases anidadas.
  anidado(t) {
    stars(t, .3);
    pill(330, 600, 400, 100, FR_, 'cada estudiante', { s: 36 }); pill(760, 600, 400, 100, CON, 'por lo menos 4', { s: 36 });
    fade(A(t, 9.2, .5), () => { arrow(330, 660, 330, 760, NEG, 1, 3, { h: 12 }); fade(A(t, 10.6, .4), () => arrow(760, 660, 760, 760, NEG, 1, 3, { h: 12 })); pill(330, 820, 400, 100, NEG, 'algún estudiante', { s: 36 }); fade(A(t, 10.6, .4), () => pill(760, 820, 400, 100, NEG, 'menos de 4', { s: 36 })); mono('1.º afuera', 330, 720, C.mute, { s: 20 }); });
    const px = nline(170, 910, 1060, 0, 8, { s: 28 });
    X.save(); X.fillStyle = hexA(t > 10.6 ? NEG : CON, .3); const a = t > 10.6 ? 0 : 4, b = t > 10.6 ? 3.7 : 8; X.fillRect(px(a), 1035, px(b) - px(a), 50); X.restore();
    fade(A(t, 18.2, .5), () => jT('«Algún estudiante entregó menos de cuatro tareas»', CX, 1240, NEG, 36, { max: 960 }));
  },
  // 9 · Las gafas, resueltas.
  resolver(t) {
    stars(t, .3);
    pill(330, 560, 420, 96, FR_, 'en todos los salones', { s: 32 }); pill(770, 560, 400, 96, CON, 'hay alguno con gafas', { s: 30 });
    fade(A(t, 1, .5), () => { arrow(330, 616, 330, 690, NEG, 1, 3, { h: 12 }); pill(330, 750, 420, 96, NEG, 'en algún salón', { s: 32 }); });
    fade(A(t, 10.2, .5), () => { arrow(770, 616, 770, 690, NEG, 1, 3, { h: 12 }); pill(770, 750, 400, 96, NEG, 'ninguno usa gafas', { s: 30 }); });
    fade(A(t, 20.2, .5), () => ROOMS.forEach((g, i) => room(160 + i * 253, 1030, g, { col: i === 2 ? RES : FR_, hl: i === 2, lab: i === 2 ? 'este basta' : '', labc: RES })));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['algún · ninguno', 'ningún salón', 'algún · todos', 'todos · alguno no'], 0, 'todos → algún · algún → ninguno', { s: 30, fs: 40 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['¬(p ∧ q) = ¬p ∨ ¬q', 'r']], 'De Morgan'], [[['¬(p ∨ q) = ¬p ∧ ¬q', 'r']], 'De Morgan'], [[['todos → alguno no', 'r']], 'negar todos'], [[['alguno → ninguno', 'r']], 'negar alguno']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [FR_, NEG, CON]);
    });
  },
};
