// «El condicional» · escenas de la lección pu-lo-3. Motor en kit.js, preu.js y piezas.js; guion en condicional.data.js.
// La condición en cian, lo prometido en ámbar, la negación en violeta, lo que se mira ahora en lima, lo que se cumple en verde y lo que falla en magenta.
const P_ = C.cyan, Q_ = C.amber, NEG = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Tarjeta con una cara a la vista.
function card(x, y, s, col, o = {}) {
  X.save(); X.fillStyle = hexA(col, o.fill ?? .12); X.beginPath(); X.roundRect(x - 75, y - 105, 150, 210, 18); X.fill(); X.restore();
  stroke(col, o.hl ? 5 : 3, () => X.roundRect(x - 75, y - 105, 150, 210, 18), { g: o.hl ? 22 : 10 });
  bigT(s, x, y + 30, o.c || C.ink, 90);
}
const CARDS = [['A', P_], ['K', C.mute], ['4', Q_], ['7', BAD]];
const S = {
  // 1 · El reto: las cuatro tarjetas.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Cada tarjeta tiene una letra por un lado y un número por el', 'otro. Se ven: A, K, 4 y 7. Alguien afirma: «si una tarjeta', 'tiene una vocal por un lado, tiene un número par por el otro».', 'Para comprobarlo, las únicas tarjetas que hay que voltear son:'], opts: ['A y 7', 'A y 4', 'A, 4 y 7', 'K y 7'], ok: 0 });
    fade(A(t, 9.6, .6), () => CARDS.forEach(([s], i) => fade(A(t, 10 + i * .3, .4), () => card(195 + i * 230, 1100, s, '#c8d2f0'))));
    fade(A(t, 12, .5), () => F([['vocal', 'r', P_], ['  →  ', 'r'], ['par', 'r', Q_]], CX, 1300, 52));
  },
  // 2 · Una promesa: los cuatro casos.
  promesa(t) {
    stars(t, .3);
    F([['llueve', 'r', P_], ['  →  ', 'r'], ['llevo paraguas', 'r', Q_]], CX, 540, 52);
    fade(A(t, 2, .5), () => { mono('p: la condición', 330, 610, P_, { s: 22 }); mono('q: lo prometido', 760, 610, Q_, { s: 22 }); });
    const R = [[1, 1], [1, 0], [0, 1], [0, 0]];
    fade(A(t, 9.2, .5), () => gridT(150, 680, 230, 96, ['', '', '', ''], ['llueve', 'paraguas', 'promesa'], (i, j) => { const [p, q] = R[i]; if (j === 0) return [p ? 'sí' : 'no', P_, 'j']; if (j === 1) return [q ? 'sí' : 'no', Q_, 'j']; if (t < 10 + i * .6) return null; const ok = !(p && !q); return [ok ? 'se cumple' : 'se rompe', ok ? RES : BAD, 'j']; }, { hw: 40, hh: 60, cs: 34, hs: 24 }));
    fade(A(t, 18.2, .5), () => mono('sin lluvia, nadie puede reclamar', CX, 1210, C.mute, { s: 26 }));
  },
  // 3 · Problema: el equivalente de Camila.
  camila(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['La afirmación «si Camila estudia, entonces aprueba el', 'curso» es lógicamente equivalente a:'], opts: ['Si Camila no aprueba, entonces no estudió', 'Si Camila aprueba, entonces estudió', 'Si Camila no estudia, entonces no aprueba', 'Camila estudia y aprueba el curso'], ok: 0, col1: true, os: 30, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      F([['p', 'i', P_], [' → ', 'r'], ['q', 'i', Q_]], 300, 1000, 56); arrow(420, 985, 600, 985, NOW, 1, 3, { h: 12 }); F([['¬q', 'i', NEG], [' → ', 'r'], ['¬p', 'i', NEG]], 780, 1000, 56);
      fade(A(t, 11, .5), () => mono('se niegan las dos y se invierten', CX, 1080, NEG, { s: 24 }));
      fade(A(t, 20.4, .5), () => { mono('recíproco  q → p : no equivale', CX, 1170, C.mute, { s: 24 }); mono('contrario  ¬p → ¬q : no equivale', CX, 1220, C.mute, { s: 24 }); });
    });
  },
  // 4 · El recíproco engaña: Medellín y Antioquia.
  reciproco(t) {
    stars(t, .3);
    const O = [CX, 820];
    X.save(); X.fillStyle = hexA(Q_, .08); X.beginPath(); X.ellipse(O[0], O[1], 380, 260, 0, 0, 7); X.fill(); X.restore(); stroke(Q_, 3, () => X.ellipse(O[0], O[1], 380, 260, 0, 0, 7), { g: 10 }); mono('antioqueños', O[0], O[1] - 200, Q_, { s: 26 });
    X.save(); X.fillStyle = hexA(P_, .14); X.beginPath(); X.arc(O[0] - 120, O[1] + 20, 120, 0, 7); X.fill(); X.restore(); ring(O[0] - 120, O[1] + 20, 120, P_, 3); mono('de Medellín', O[0] - 120, O[1] + 28, P_, { s: 24 });
    fade(A(t, 9.2, .5), () => { dot(O[0] + 200, O[1] + 40, 14, NOW, 18); mono('Envigado', O[0] + 200, O[1] + 90, NOW, { s: 22 }); F([['antioqueño', 'r', Q_], [' → ', 'r'], ['de Medellín', 'r', P_], ['  ✗', 'r', BAD]], CX, 1180, 44); });
    fade(A(t, 18.2, .5), () => F([['no de Medellín', 'r', NEG], [' → ', 'r'], ['no antioqueño', 'r', NEG], ['  ✗', 'r', BAD]], CX, 1270, 44));
  },
  // 5 · Problema: el banco en festivo.
  festivo(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Se sabe que «si hoy es festivo, entonces el banco no abre»', 'y que «hoy el banco abrió». Se puede concluir que:'], opts: ['Hoy no es festivo', 'Hoy es festivo', 'Mañana es festivo', 'No se puede concluir nada'], ok: 0, col1: true, os: 32, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      F([['festivo', 'r', P_], ['  →  ', 'r'], ['no abre', 'r', Q_]], CX, 1000, 48);
      fade(A(t, 10.8, .5), () => { F([['abrió', 'r', BAD]], 760, 1090, 44); arrow(760, 1050, 760, 1020, BAD, 1, 3, { h: 10 }); mono('lo prometido no pasó', 760, 1140, BAD, { s: 22 }); });
      fade(A(t, 20.4, .5), () => { F([['no es festivo', 'r', RES]], 300, 1090, 44); arrow(300, 1050, 300, 1020, RES, 1, 3, { h: 10 }); mono('modus tollens', CX, 1240, NOW, { s: 26 }); });
    });
  },
  // 6 · Lo que no se concluye.
  nosabe(t) {
    stars(t, .3);
    F([['festivo', 'r', P_], ['  →  ', 'r'], ['no abre', 'r', Q_]], CX, 560, 48);
    fade(A(t, .8, .5), () => { F([['no abrió', 'r', Q_], ['  ⇒  ', 'r'], ['¿festivo?', 'r', C.mute]], CX, 700, 46); });
    fade(A(t, 9.2, .5), () => [['domingo', 0], ['festivo', 1], ['daño', 2]].forEach(([s, i]) => { pill(250 + i * 290, 880, 230, 90, i === 1 ? P_ : C.mute, s, { s: 34 }); arrow(250 + i * 290, 935, CX + (i - 1) * 60, 1010, C.mute, 1, 2, { h: 8 }); }));
    fade(A(t, 10, .5), () => pill(CX, 1060, 300, 90, Q_, 'no abre', { s: 34 }));
    fade(A(t, 18.2, .5), () => { mono('pasa q  →  no se sabe p', CX, 1200, BAD, { s: 26 }); mono('no pasa p  →  no se sabe q', CX, 1250, BAD, { s: 26 }); });
  },
  // 7 · El «o» es un condicional.
  oequiv(t) {
    stars(t, .3);
    F([['estudio', 'r', P_], ['  o  ', 'r', NOW], ['repruebo', 'r', Q_]], CX, 560, 56);
    fade(A(t, .8, .5), () => [['sí', 'no', 1], ['no', 'sí', 1], ['sí', 'sí', 1], ['no', 'no', 0]].forEach(([a, b, ok], i) => { const x = 210 + i * 220; pill(x, 700, 180, 70, P_, 'estudio: ' + a, { s: 22 }); pill(x, 790, 180, 70, Q_, 'repruebo: ' + b, { s: 22 }); check(x, 870, 16, !!ok, A(t, 1.6 + i * .4, .5)); }));
    fade(A(t, 9.2, .5), () => F([['no estudio', 'r', NEG], ['  →  ', 'r'], ['repruebo', 'r', Q_]], CX, 1000, 52));
    fade(A(t, 18.2, .5), () => { F([['p', 'i'], [' ∨ ', 'r', NOW], ['q', 'i'], ['   ≡   ', 'r'], ['¬p', 'i', NEG], [' → ', 'r'], ['q', 'i']], CX, 1130, 52); F([['p', 'i'], [' → ', 'r'], ['q', 'i'], ['   ≡   ', 'r'], ['¬p', 'i', NEG], [' ∨ ', 'r', NOW], ['q', 'i']], CX, 1230, 52); });
  },
  // 8 · Negar un condicional.
  negar(t) {
    stars(t, .3);
    F([['llueve', 'r', P_], ['  →  ', 'r'], ['no voy al parque', 'r', Q_]], CX, 560, 50);
    fade(A(t, 9.2, .5), () => { pill(330, 740, 300, 100, P_, 'llueve', { s: 38 }); jT('y', CX, 754, C.ink, 44); pill(750, 740, 380, 100, BAD, 'voy al parque', { s: 38 }); mono('el único caso en que falla', CX, 850, BAD, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { F([['¬(', 'r', NEG], ['p', 'i'], [' → ', 'r'], ['q', 'i'], [')', 'r', NEG], ['  =  ', 'r'], ['p', 'i'], [' ∧ ', 'r', NOW], ['¬q', 'i', NEG]], CX, 1010, 60); mono('la negación de un «si» es un «y»', CX, 1100, NOW, { s: 26 }); });
  },
  // 9 · Las tarjetas resueltas.
  resolver(t) {
    stars(t, .3);
    F([['vocal', 'r', P_], ['  →  ', 'r'], ['par', 'r', Q_], ['     falla: vocal e impar', 'r', BAD]], CX, 520, 40);
    const st = [t > 1 ? 1 : 0, t > 10.4 ? -1 : 0, t > 12 ? -1 : 0, t > 20.4 ? 1 : 0];
    CARDS.forEach(([s], i) => { const x = 195 + i * 230, v = st[i]; card(x, 800, s, v === 1 ? NOW : v === -1 ? C.dim : '#c8d2f0', { hl: v === 1, c: v === -1 ? C.dim : C.ink }); mono(v === 1 ? 'voltear' : v === -1 ? 'no hace falta' : '', x, 960, v === 1 ? NOW : C.mute, { s: 22 }); });
    fade(A(t, 1.6, .5), () => mono('A: atrás, ¿impar?', 195, 1030, P_, { s: 20 }));
    fade(A(t, 12.6, .5), () => mono('4 par → vocal: es el recíproco', 655, 1030, C.mute, { s: 20 }));
    fade(A(t, 20.8, .5), () => mono('7: atrás, ¿vocal?', 885, 1090, BAD, { s: 20 }));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['A y 7', 'A y 4', 'A, 4 y 7', 'K y 7'], 0, 'solo la vocal y el impar pueden romper la regla', { fs: 38 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['p y no q', 'r']], 'único caso en que falla'], [[['¬q → ¬p', 'r']], 'el equivalente'], [[['no pasa q: no pasó p', 'r']], 'modus tollens'], [[['p ∧ ¬q', 'r']], 'su negación']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [P_, Q_, NEG]);
    });
  },
};
