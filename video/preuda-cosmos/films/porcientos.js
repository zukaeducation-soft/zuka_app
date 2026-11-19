// «Porcentajes» · escenas de la lección pu-pr-4. Motor en kit.js, preu.js y piezas.js; guion en porcientos.data.js.
// El total en cian, la parte en ámbar, una parte de la parte en violeta, lo que se gasta en rosa, el resultado en verde y el
// uno por ciento en lima.
const TOT = C.cyan, PART = C.amber, SUB = C.violet, GONE = C.mag, RES = C.green, NOW = C.lime;
const WH = 'rgba(225,232,255,.85)';
// Barra del 100 % (x, y, ancho w) con tramos [desde %, hasta %, color, rótulo].
function pbar(x, y, w, h, segs, o = {}) {
  stroke(WH, 2.5, () => X.rect(x, y, w, h), { g: 6 });
  segs.forEach(([a, b, c, lab], i) => fade(clamp((o.k ?? 1) * segs.length - i), () => { X.save(); X.fillStyle = hexA(c, .4); X.shadowColor = c; X.shadowBlur = 10; X.fillRect(x + w * a / 100 + 2, y + 2, w * (b - a) / 100 - 4, h - 4); X.restore(); if (lab) T(lab, x + w * (a + b) / 200, y + h / 2 + 10, { k: 'r', s: o.s || 28, a: 'c', c: C.ink, max: w * (b - a) / 100 - 8 }); }));
  if (o.ticks) for (let p = 0; p <= 100; p += o.ticks) mono(p + ' %', x + w * p / 100, y + h + 34, C.mute, { s: 18 });
}
const S = {
  // 1 · El reto: la elección.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En una elección votó el 60 % de las personas habilitadas.', 'El candidato ganador obtuvo el 55 % de los votos, que', 'fueron 6 600. La cantidad de personas habilitadas para', 'votar era:'], opts: ['20 000', '12 000', '18 150', '11 000'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      pbar(140, 960, 800, 90, [[0, 60, TOT, 'votaron 60 %']], { k: seg(t, 10, 11) }); mono('habilitados', 140, 940, C.mute, { s: 22, a: 'l' });
      fade(A(t, 12, .5), () => { pbar(140, 1150, 480, 90, [[0, 55, PART, '55 %']], {}); mono('de los que votaron', 140, 1130, C.mute, { s: 22, a: 'l' }); mono('6 600 votos', 140 + 480 * .275, 1290, PART, { s: 26 }); });
    });
  },
  // 2 · Tres preguntas.
  tres(t) {
    stars(t, .3);
    const q = (y, t0, parts, tag) => fade(A(t, t0, .5), () => { F(parts, CX, y, 48); mono(tag, CX, y + 50, C.mute, { s: 22 }); });
    q(560, 1, [['30 % de 250 = 0.3 · 250 = ', 'r'], ['75', 'r', RES]], 'total → parte');
    q(800, 10, [['18 de 24 = 18 ÷ 24 = ', 'r'], ['75 %', 'r', RES]], 'parte y total → porcentaje');
    q(1040, 20, [['30 % → 45   ·   100 % → ', 'r'], ['150', 'r', RES]], 'parte → total');
  },
  // 3 · Qué porcentaje es 18 de 24.
  parte(t) {
    stars(t, .3);
    for (let i = 0; i < 24; i++) { const x = 190 + (i % 8) * 90, y = 520 + Math.floor(i / 8) * 90, on = i < 18 && t > 1.2 + i * .08; X.save(); X.fillStyle = hexA(on ? PART : TOT, on ? .45 : .12); X.fillRect(x, y, 80, 80); X.restore(); stroke(on ? PART : 'rgba(160,180,240,.4)', 2, () => X.rect(x, y, 80, 80), { g: on ? 8 : 0 }); }
    fade(A(t, 9.2, .5), () => F([['18/24 = 3/4 = ', 'r'], ['0.75', 'r', PART]], CX, 900, 54));
    fade(A(t, 18.2, .5), () => { F([['0.75 · 100 = ', 'r'], ['75 %', 'r', RES]], CX, 1000, 56); mono('parte ÷ total · 100', CX, 1070, NOW, { s: 26 }); });
  },
  // 4 · Hallar el total al revés: el tanque del carro.
  reves(t) {
    stars(t, .3);
    pbar(140, 600, 800, 100, [[0, 35, GONE, 'gastado 35 %'], [35, 100, TOT, t > 9.6 ? '65 % = 26 L' : 'quedan 26 L']], { k: seg(t, 1, 2.4), ticks: 25 });
    fade(A(t, 9.4, .5), () => { stroke(NOW, 4, () => X.roundRect(140 + 800 * .35, 590, 800 * .65, 120, 14), { g: 14 }); mono('lo que queda, no lo gastado', CX, 820, NOW, { s: 26 }); });
    fade(A(t, 20.2, .5), () => stepsDown(t, 20.2, 1.2, [[[['65 % = 26 L', 'r']]], [[['1 % = 26 ÷ 65 = ', 'r'], ['0.4 L', 'r', NOW]]], [[['100 % = ', 'r'], ['40 L', 'r', RES]]]], 960, 120, 48));
  },
  // 5 · Problema: el tanque del 40 % al 65 %.
  tanque(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Un tanque está lleno hasta el 40 % de su capacidad.', 'Después de agregarle 30 litros, queda lleno hasta el 65 %.', 'La capacidad del tanque, en litros, es:'], opts: ['120', '75', '100', '150'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const x = 380, y = 860, w = 320, h = 520, lvl = lerp(.4, .65, eio(seg(t, 10.4, 13)));
      X.save(); X.fillStyle = hexA(TOT, .35); X.fillRect(x, y + h * (1 - .4), w, h * .4); X.fillStyle = hexA(PART, .45); X.fillRect(x, y + h * (1 - lvl), w, h * (lvl - .4)); X.restore();
      stroke(WH, 3, () => { X.moveTo(x, y); X.lineTo(x, y + h); X.lineTo(x + w, y + h); X.lineTo(x + w, y); }, { g: 6 });
      [40, 65].forEach(p => { const yy = y + h * (1 - p / 100); stroke(hexA(NOW, .6), 2, () => { X.moveTo(x - 20, yy); X.lineTo(x + w + 20, yy); }, { dash: [8, 6], g: 0 }); mono(p + ' %', x - 30, yy + 8, NOW, { s: 22, a: 'r' }); });
      fade(A(t, 13.4, .5), () => mono('+30 L = 25 %', x + w + 40, y + h * (1 - .525) + 8, PART, { s: 26, a: 'l' }));
      fade(A(t, 20.4, .5), () => F([['25 % = 30 L  →  100 % = ', 'r'], ['120 L', 'r', RES]], CX, 1460, 46));
    });
  },
  // 6 · Un porcentaje de un porcentaje.
  deun(t) {
    stars(t, .3);
    grid100(CX, 780, 52, [[10, SUB], [30, PART]], seg(t, 1, 4));
    fade(A(t, 1, .5), () => mono('el 40 % (ámbar y violeta)', CX, 480, PART, { s: 24 }));
    fade(A(t, 9.2, .5), () => F([['0.25 · 0.40 = ', 'r'], ['0.10', 'r', SUB]], CX, 1130, 54));
    fade(A(t, 18.2, .5), () => { F([['= ', 'r'], ['10 %', 'r', RES], [' del total', 'r']], CX, 1220, 50); mono('25 + 40 = 65 no significa nada aquí', CX, 1290, GONE, { s: 24 }); });
  },
  // 7 · Problema: el grupo en bicicleta.
  grupo(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En un grupo, el 40 % de las personas son mujeres. El 25 %', 'de las mujeres y el 10 % de los hombres llegan en', 'bicicleta. El porcentaje del grupo que llega en bicicleta es:'], opts: ['16 %', '35 %', '17.5 %', '14 %'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      for (let i = 0; i < 100; i++) { const r = Math.floor(i / 20), c = i % 20, x = 160 + c * 40, y = 860 + r * 50, wom = c < 8, bike = wom ? c < 8 && r * 8 + c < 10 : (r * 12 + (c - 8)) < 6;
        const on = t > 11 && bike; dot(x, y, on ? 13 : 9, on ? RES : wom ? PART : TOT, on ? 16 : 4); }
      fade(A(t, 10.2, .4), () => { mono('40 mujeres', 160 + 3.5 * 40, 1150, PART, { s: 22 }); mono('60 hombres', 160 + 13.5 * 40, 1150, TOT, { s: 22 }); });
      fade(A(t, 12, .5), () => F([['25 % de 40 = ', 'r'], ['10', 'r', RES], ['   10 % de 60 = ', 'r'], ['6', 'r', RES]], CX, 1250, 40));
      fade(A(t, 20.4, .5), () => F([['16 de 100 = ', 'r'], ['16 %', 'r', RES]], CX, 1350, 50));
    });
  },
  // 8 · Puntos porcentuales.
  puntos(t) {
    stars(t, .3);
    const v = lerp(40, 50, eio(seg(t, 1.4, 4)));
    pbar(140, 560, 800, 90, [[0, v, TOT, `${Math.round(v)} %`]], { ticks: 10 });
    fade(A(t, 4.2, .5), () => { stroke(NOW, 3, () => X.rect(140 + 320, 552, 80, 106), { g: 12 }); mono('+10 puntos', 140 + 360, 720, NOW, { s: 26 }); });
    fade(A(t, 9.2, .5), () => { bar(140, 820, 320, 70, TOT, 1); bar(460, 820, 80, 70, PART, 1); mono('antes: 40', 300, 810, TOT, { s: 22 }); mono('+10', 500, 810, PART, { s: 22 }); F([['10 ÷ 40 = ', 'r'], ['25 %', 'r', PART], [' de crecimiento', 'r']], CX, 1000, 46); });
    fade(A(t, 18.2, .5), () => { mono('resta: puntos porcentuales', CX, 1120, NOW, { s: 26 }); mono('resta ÷ lo de antes: porcentaje de cambio', CX, 1170, PART, { s: 26 }); });
  },
  // 9 · La elección resuelta.
  resolver(t) {
    stars(t, .3);
    pbar(140, 560, 800, 90, [[0, 60, TOT, '60 %: votaron']], { ticks: 20 });
    pbar(140, 760, 480, 80, [[0, 55, PART, '55 % = 6 600']], {});
    F([['6 600 ÷ 0.55 = ', 'r'], ['12 000', 'r', TOT], [' votaron', 'r']], CX, 960, 46);
    fade(A(t, 10.2, .5), () => { stroke(NOW, 3, () => { X.moveTo(140 + 480, 840); X.lineTo(140 + 480, 900); }, { g: 8 }); F([['12 000 = 60 % de los habilitados', 'r']], CX, 1060, 42); });
    fade(A(t, 20.2, .5), () => { F([['12 000 ÷ 0.6 = ', 'r'], ['20 000', 'r', RES]], CX, 1170, 56); mono('0.6 · 0.55 = 0.33 → 6 600 ÷ 0.33 = 20 000', CX, 1240, C.mute, { s: 24 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['20 000', '12 000', '18 150', '11 000'], 0, [['6 600 ÷ 0.55 ÷ 0.6 = ', 'r'], ['20 000', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['p % de N', 'r']], 'la parte'], [[['A ÷ B · 100', 'r']], 'qué porcentaje es'], [[['parte ÷ p %', 'r']], 'el total al revés'], [[['0.25 · 0.40', 'r']], 'porcentaje de porcentaje']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [TOT, NOW, PART]);
    });
  },
};
