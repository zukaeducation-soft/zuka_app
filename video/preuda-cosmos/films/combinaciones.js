// «Combinaciones» · escenas de la lección pu-co-3. Motor en kit.js, preu.js y piezas.js; guion en combinaciones.data.js.
// Las mujeres en ámbar, los hombres en cian, los órdenes repetidos en rosa, los grupos en violeta, el resultado en verde y lo que
// se hace ahora en lima.
const WOM = C.amber, MEN = C.cyan, REP = C.mag, GRP = C.violet, RES = C.green, NOW = C.lime;
const comb = (n, r) => { let v = 1; for (let i = 0; i < r; i++) v = v * (n - i) / (i + 1); return Math.round(v); };
const CF = (n, r, c = GRP) => [['C(' + n + ', ' + r + ')', 'r', c]];
// Puntos en una circunferencia.
const circPts = (O, R, n, a0 = 90) => Array.from({ length: n }, (_, i) => at(O, a0 - 360 / n * i, R));
const S = {
  // 1 · El reto: el comité.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['De un grupo de 5 hombres y 4 mujeres se va a escoger un', 'comité de 3 personas en el que haya exactamente 2 mujeres.', 'La cantidad de comités distintos que se pueden formar es:'], opts: ['30', '24', '20', '60'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      for (let i = 0; i < 5; i++) fade(A(t, 10 + i * .2, .3), () => nodeC(180 + i * 110, 960, 42, MEN, 'H' + (i + 1), { s: 26 }));
      for (let i = 0; i < 4; i++) fade(A(t, 11 + i * .2, .3), () => nodeC(240 + i * 110, 1100, 42, WOM, 'M' + (i + 1), { s: 26 }));
      fade(A(t, 12.4, .5), () => { stroke(GRP, 3, () => X.roundRect(780, 900, 230, 260, 24), { g: 14 }); mono('comité', 895, 890, GRP, { s: 22 }); nodeC(840, 980, 34, WOM, 'M', { s: 24 }); nodeC(950, 980, 34, WOM, 'M', { s: 24 }); nodeC(895, 1080, 34, MEN, 'H', { s: 24 }); });
    });
  },
  // 2 · Sin orden: tres sabores de cinco.
  grupo(t) {
    stars(t, .3);
    const fl = ['fresa', 'mora', 'coco', 'limón', 'café'], cols = [C.mag, C.violet, '#e8eefc', C.green, C.amber];
    fl.forEach((n, i) => fade(A(t, .8 + i * .2, .3), () => { dot(170 + i * 185, 520, 30, cols[i], 16); mono(n, 170 + i * 185, 590, C.mute, { s: 20 }); }));
    fade(A(t, 2.4, .5), () => { const cup = (x, y) => { stroke('rgba(225,232,255,.8)', 3, () => { X.moveTo(x - 70, y); X.lineTo(x - 40, y + 110); X.lineTo(x + 40, y + 110); X.lineTo(x + 70, y); }, { g: 6 }); [0, 1, 3].forEach((c, i) => dot(x - 40 + i * 40, y - 20 - (i === 1 ? 26 : 0), 26, cols[c], 14)); }; cup(CX, 720); mono('fresa, mora y limón', CX, 900, C.ink, { s: 24 }); });
    fade(A(t, 10, .5), () => { const P = ['F M L', 'F L M', 'M F L', 'M L F', 'L F M', 'L M F']; P.forEach((s, i) => mono(s, 200 + (i % 3) * 340, 990 + Math.floor(i / 3) * 50, REP, { s: 26 })); mono('la misma copa, 3! = 6 veces', CX, 1120, REP, { s: 24 }); F([['5 · 4 · 3 = 60', 'r']], CX, 1200, 46); });
    fade(A(t, 20.2, .5), () => F([['60 ÷ 6 = ', 'r'], ['10', 'r', RES], [' copas', 'r']], CX, 1300, 56));
  },
  // 3 · La fórmula.
  formula(t) {
    stars(t, .3);
    F([['C(', 'r'], ['n', 'i', NOW], [', ', 'r'], ['r', 'i', GRP], [')', 'r']], CX, 560, 72);
    fade(A(t, 9.2, .5), () => { FR('n · (n − 1) · … (r factores)', 'r!', CX, 740, 46, C.ink); });
    fade(A(t, 18.2, .5), () => { F([...CF(5, 3), [' = 5 · 4 · 3 ÷ 3! = ', 'r'], ['10', 'r', RES]], CX, 1000, 46); F([...CF(7, 2), [' = 7 · 6 ÷ 2 = ', 'r'], ['21', 'r', RES]], CX, 1090, 46); });
  },
  // 4 · Escoger es dejar.
  dejar(t) {
    stars(t, .3);
    const d = [1, 2, 3, 4, 5, 6], pick = [0, 2, 4, 5];
    d.forEach((v, i) => fade(A(t, .8 + i * .15, .3), () => { const on = t > 10 && pick.includes(i), off = t > 20 && !pick.includes(i); pill(190 + i * 140, 560, 100, 100, off ? REP : on ? GRP : C.cyan, v, { s: 50, r: 16, fill: on || off ? .3 : .1 }); }));
    fade(A(t, 2.4, .5), () => mono('1356 · 2346 · 1245 …', CX, 720, C.ink, { s: 32 }));
    fade(A(t, 10.2, .5), () => { mono('{1, 3, 5, 6} → 1356, solo un orden creciente', CX, 820, GRP, { s: 26 }); });
    fade(A(t, 20.2, .5), () => { mono('se dejan fuera: 2 y 4', CX, 900, REP, { s: 26 }); F([...CF(6, 4), [' = ', 'r'], ...CF(6, 2, REP), [' = 6 · 5 ÷ 2 = ', 'r'], ['15', 'r', RES]], CX, 1020, 46); });
  },
  // 5 · Problema: triángulos en un círculo.
  triangulos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Sobre una circunferencia se marcan 6 puntos. La cantidad de', 'triángulos distintos que tienen sus tres vértices en esos', 'puntos es:'], opts: ['20', '18', '15', '120'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const O = [CX, 1080], P = circPts(O, 230, 6); ring(O[0], O[1], 230, 'rgba(225,232,255,.5)', 2);
      P.forEach((p, i) => ptL(p, C.ink, 'ABCDEF'[i], 0, -26, { s: 30 }));
      const tris = []; for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) for (let c = b + 1; c < 6; c++) tris.push([a, b, c]);
      const k = Math.min(20, Math.floor(seg(t, 11, 20) * 20 + 1e-9)), cur = tris[Math.max(0, k - 1)];
      if (k > 0) polyL(cur.map(i => P[i]), GRP, { fill: .25, lw: 3 });
      mono(`${k} / 20`, 920, 860, GRP, { s: 26 });
      fade(A(t, 20.4, .5), () => F([...CF(6, 3), [' = 6 · 5 · 4 ÷ 6 = ', 'r'], ['20', 'r', RES]], CX, 1430, 44));
    });
  },
  // 6 · Problema: los 45 saludos.
  saludos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Al comenzar una reunión, cada asistente saludó de mano', 'exactamente una vez a cada uno de los demás. Si en total', 'hubo 45 saludos, la cantidad de asistentes fue:'], opts: ['10', '9', '15', '12'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const O = [CX, 1060], P = circPts(O, 220, 10), k = Math.floor(45 * seg(t, 10.4, 19)); let c = 0;
      for (let a = 0; a < 10; a++) for (let b = a + 1; b < 10; b++) { if (c++ < k) segL(P[a], P[b], hexA(GRP, .55), 1, 1.5, { g: 0 }); }
      P.forEach(p => dot(p[0], p[1], 10, C.amber, 12));
      mono(`${k} saludos`, CX, 1340, GRP, { s: 26 });
      fade(A(t, 20.4, .5), () => F([['n · (n − 1) ÷ 2 = 45  →  10 · 9 = 90  →  ', 'r'], ['10', 'r', RES]], CX, 1440, 40, { max: 960 }));
    });
  },
  // 7 · Las diagonales de un decágono.
  diagonales(t) {
    stars(t, .3);
    const O = [CX, 820], P = circPts(O, 280, 10);
    polyL(P, NOW, { lw: 3 });
    fade(A(t, 1.4, .5), () => { let c = 0; for (let a = 0; a < 10; a++) for (let b = a + 1; b < 10; b++) { const side = b - a === 1 || (a === 0 && b === 9); if (!side && t > 9.2) { if (c++ < Math.floor(35 * seg(t, 9.4, 16))) segL(P[a], P[b], hexA(GRP, .6), 1, 1.5, { g: 0 }); } } });
    P.forEach(p => dot(p[0], p[1], 9, C.ink, 10));
    fade(A(t, 1.6, .5), () => F([...CF(10, 2), [' = 45 parejas', 'r']], CX, 1200, 44));
    fade(A(t, 9.4, .5), () => F([['45 − 10 lados = ', 'r'], ['35', 'r', RES], [' diagonales', 'r']], CX, 1280, 44));
    fade(A(t, 18.2, .5), () => mono('cada vértice: 7 diagonales · 10 · 7 ÷ 2 = 35', CX, 1360, NOW, { s: 24 }));
  },
  // 8 · Grupos mixtos.
  mixtos(t) {
    stars(t, .3);
    stroke(WOM, 3, () => X.roundRect(110, 520, 400, 300, 24), { g: 10 }); stroke(MEN, 3, () => X.roundRect(570, 520, 400, 300, 24), { g: 10 });
    for (let i = 0; i < 4; i++) nodeC(190 + (i % 2) * 120 + (i > 1 ? 60 : 0), 610 + Math.floor(i / 2) * 120, 40, WOM, 'M', { s: 26 });
    for (let i = 0; i < 5; i++) nodeC(650 + (i % 3) * 110, 610 + Math.floor(i / 3) * 120, 40, MEN, 'H', { s: 26 });
    fade(A(t, 9.2, .5), () => { F(CF(4, 2, WOM), 310, 900, 44); F(CF(5, 1, MEN), 770, 900, 44); });
    fade(A(t, 18.2, .5), () => { F([...CF(4, 2, WOM), [' · ', 'r'], ...CF(5, 1, MEN)], CX, 1050, 52); mono('una elección y luego la otra', CX, 1120, NOW, { s: 26 }); });
  },
  // 9 · El comité resuelto.
  resolver(t) {
    stars(t, .3);
    const pairs = [['M1', 'M2'], ['M1', 'M3'], ['M1', 'M4'], ['M2', 'M3'], ['M2', 'M4'], ['M3', 'M4']];
    pairs.forEach((p, i) => fade(A(t, 1 + i * .5, .4), () => pill(180 + (i % 3) * 300, 540 + Math.floor(i / 3) * 100, 240, 70, WOM, p.join(' · '), { s: 28, fill: .2 })));
    F([...CF(4, 2, WOM), [' = 4 · 3 ÷ 2 = ', 'r'], ['6', 'r', WOM]], CX, 790, 44);
    fade(A(t, 10.2, .5), () => { for (let i = 0; i < 5; i++) nodeC(270 + i * 135, 920, 40, MEN, 'H' + (i + 1), { s: 24 }); F([...CF(5, 1, MEN), [' = ', 'r'], ['5', 'r', MEN]], CX, 1040, 44); });
    fade(A(t, 20.2, .5), () => { F([['6 · 5 = ', 'r'], ['30', 'r', RES], [' comités', 'r']], CX, 1170, 60); mono('sin cargos: el orden no importa', CX, 1240, C.mute, { s: 24 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['30', '24', '20', '60'], 0, [...CF(4, 2), [' · ', 'r'], ...CF(5, 1), [' = ', 'r'], ['30', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['filas ÷ r!', 'r']], 'sin orden'], [[['C(n, r) = C(n, n − r)', 'r']], 'escoger es dejar'], [[['n(n − 1) ÷ 2', 'r']], 'parejas'], [[['C · C', 'r']], 'grupos mixtos']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [GRP, NOW, WOM]);
    });
  },
};
