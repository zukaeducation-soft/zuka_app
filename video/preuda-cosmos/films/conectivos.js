// «Conectivos y tablas de verdad» · escenas de la lección pu-lo-1. Motor en kit.js, preu.js y piezas.js; guion en conectivos.data.js.
// El «y» en cian, el «o» en ámbar, la negación en violeta, lo que se mira ahora en lima, lo verdadero en verde y lo falso en magenta.
const AND = C.cyan, OR = C.amber, NEG = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
const VF = v => (v ? ['V', RES] : ['F', BAD]);
// Dispositivo: caja con su letra.
function gate(x, y, L, col) { X.save(); X.fillStyle = hexA(col, .12); X.beginPath(); X.roundRect(x - 70, y - 55, 140, 110, 18); X.fill(); X.restore(); stroke(col, 3, () => X.roundRect(x - 70, y - 55, 140, 110, 18), { g: 12 }); bigT(L, x, y + 18, col, 52); }
function wire(pts, col = 'rgba(200,210,240,.7)') { stroke(col, 2.5, () => { X.moveTo(...pts[0]); pts.slice(1).forEach(p => X.lineTo(...p)); }, { g: 0 }); }
function bitP(x, y, v, col) { pill(x, y, 70, 70, col || (v === '?' ? C.mute : v === '1' ? RES : BAD), v, { s: 40, r: 14 }); }
// El circuito: x, y → Y; z → N; las dos salidas → O. b = { x, y, z, u, v, s } en texto ('0', '1' o '?').
function circuit(oy, b, lab = true) {
  const Y = [450, oy + 65], N = [450, oy + 330], O = [760, oy + 200];
  wire([[180, oy], [300, oy], [300, Y[1] - 28], [380, Y[1] - 28]]); wire([[180, oy + 130], [300, oy + 130], [300, Y[1] + 28], [380, Y[1] + 28]]);
  wire([[180, oy + 330], [380, oy + 330]]); wire([[520, Y[1]], [610, Y[1]], [610, O[1] - 28], [690, O[1] - 28]]); wire([[520, N[1]], [610, N[1]], [610, O[1] + 28], [690, O[1] + 28]]); wire([[830, O[1]], [915, O[1]]]);
  gate(...Y, 'Y', AND); gate(...N, 'N', NEG); gate(...O, 'O', OR);
  [['x', 0, b.x], ['y', 130, b.y], ['z', 330, b.z]].forEach(([n, dy, v]) => { T(n, 80, oy + dy + 14, { k: 'i', s: 40, a: 'c', c: C.ink }); bitP(150, oy + dy, v); });
  if (lab) { bitP(560, Y[1] - 70, b.u); bitP(560, N[1] - 70, b.v); }
  bitP(960, O[1], b.s, b.s === '0' ? NOW : null); mono('salida', 960, O[1] + 70, C.mute, { s: 20 });
}
// Interruptor de x0 a x1 en la altura y: cerrado (plano) o abierto (levantado).
function sw(x0, x1, y, on, col) { dot(x0, y, 7, col, 8); dot(x1, y, 7, col, 8); const e = on ? [x1, y] : at([x0, y], 32, x1 - x0); stroke(col, 4, () => { X.moveTo(x0, y); X.lineTo(...e); }, { g: 10 }); }
function bulb(x, y, on) { if (on) dot(x, y, 38, C.amber, 50); ring(x, y, 40, on ? C.amber : C.mute, 3); }
function serie(y, a, b) { wire([[160, y], [330, y]]); sw(330, 430, y, a, AND); wire([[430, y], [560, y]]); sw(560, 660, y, b, AND); wire([[660, y], [810, y]]); bulb(850, y, a && b); wire([[890, y], [940, y], [940, y + 130], [160, y + 130], [160, y]]); }
function paralelo(y, a, b) { wire([[160, y], [330, y], [330, y - 80], [430, y - 80]]); wire([[330, y], [330, y + 80], [430, y + 80]]); sw(430, 530, y - 80, a, OR); sw(430, 530, y + 80, b, OR); wire([[530, y - 80], [660, y - 80], [660, y + 80], [530, y + 80]]); wire([[660, y], [810, y]]); bulb(850, y, a || b); wire([[890, y], [940, y], [940, y + 190], [160, y + 190], [160, y]]); }
const S = {
  // 1 · El reto: el circuito de bits.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['El dispositivo Y da 1 solo si sus dos entradas son 1; el O da 1', 'si alguna de sus entradas es 1, y el N cambia el bit. En un', 'circuito, x y y entran a un Y, z entra a un N y las dos salidas', 'entran a un O. Si la salida del circuito es 0, se tiene', 'certeza de que:'], opts: ['z vale 1', 'x vale 0', 'y vale 0', 'x y y valen 0'], ok: 0 });
    fade(A(t, 10, .6), () => circuit(990, { x: '?', y: '?', z: '?', u: '?', v: '?', s: t > 20 ? '0' : '?' }, t > 10.6));
  },
  // 2 · Qué es una proposición.
  proposicion(t) {
    stars(t, .3);
    [['Medellín está en Antioquia', 'V', RES, .8], ['2 + 2 = 5', 'F', BAD, 9.2], ['¿Qué hora es?', '—', C.mute, 18.2], ['Cierra la puerta', '—', C.mute, 18.8]].forEach(([s, v, c, t0], i) => fade(A(t, t0, .5), () => { const y = 560 + i * 170; jT(s, 140, y + 14, C.ink, 42, { a: 'l', max: 640 }); pill(900, y, 120, 90, c, v, { s: 46, r: 18 }); }));
    fade(A(t, 19.6, .5), () => mono('sin valor de verdad: no son proposiciones', CX, 1250, C.mute, { s: 24 }));
  },
  // 3 · El «y».
  conj(t) {
    stars(t, .3);
    F([['p', 'i'], [' ∧ ', 'r', AND], ['q', 'i']], CX, 560, 80);
    const a = true, b = t < 12.5, on = t > 9;
    fade(A(t, 9.2, .5), () => { serie(860, on && a, on && b); mono('p', 380, 800, AND, { s: 26 }); mono('q', 610, 800, AND, { s: 26 }); });
    fade(A(t, 18.2, .5), () => F([['V', 'r', RES], [' ∧ ', 'r', AND], ['F', 'r', BAD], ['  =  ', 'r'], ['F', 'r', BAD]], CX, 1180, 56));
  },
  // 4 · El «o».
  disy(t) {
    stars(t, .3);
    F([['p', 'i'], [' ∨ ', 'r', OR], ['q', 'i']], CX, 560, 80);
    const ph = Math.floor(seg(t, 9.6, 17.6) * 4), st = [[true, false], [false, true], [true, true], [false, false]][Math.min(3, ph)];
    fade(A(t, 9.2, .5), () => { paralelo(880, t > 18 ? false : st[0], t > 18 ? false : st[1]); mono('p', 480, 770, OR, { s: 26 }); mono('q', 480, 1000, OR, { s: 26 }); });
    fade(A(t, 18.2, .5), () => F([['F', 'r', BAD], [' ∨ ', 'r', OR], ['F', 'r', BAD], ['  =  ', 'r'], ['F', 'r', BAD], ['   (el único caso)', 'r', C.mute]], CX, 1220, 48));
  },
  // 5 · La tabla de verdad.
  tabla(t) {
    stars(t, .3);
    const R = [[1, 1], [1, 0], [0, 1], [0, 0]];
    gridT(140, 520, 190, 100, ['', '', '', ''], ['p', 'q', 'p ∧ q', 'p ∨ q'], (i, j) => { const [p, q] = R[i]; if (j < 2) return VF([p, q][j]); if (j === 2 && t > 9.2 + i * .5) return [...VF(p && q), 'r']; if (j === 3 && t > 18.2 + i * .5) return [...VF(p || q), 'r']; return null; }, { hw: 40, hh: 70, cs: 46, hs: 30, hk: 'r', hc: C.ink });
    fade(A(t, 1.6, .5), () => mono('2 · 2 = 4 filas', CX, 1080, C.mute, { s: 26 }));
  },
  // 6 · La negación.
  neg(t) {
    stars(t, .3);
    F([['p', 'i'], [': ', 'r'], ['V', 'r', RES], ['     ¬', 'r', NEG], ['p', 'i'], [': ', 'r'], ['F', 'r', BAD]], CX, 600, 64);
    fade(A(t, 9.2, .5), () => { [['1', '0', 820], ['0', '1', 990]].forEach(([a, b, y]) => { bitP(260, y, a); wire([[300, y], [470, y]]); gate(540, y, 'N', NEG); wire([[610, y], [780, y]]); bitP(820, y, b); }); });
    fade(A(t, 18.2, .5), () => { [['Y', 'y', AND], ['O', 'o', OR], ['N', 'no', NEG]].forEach(([L, w, c], i) => { gate(260 + i * 280, 1200, L, c); mono('= ' + w, 260 + i * 280, 1300, c, { s: 28 }); }); mono('1 = verdadero · 0 = falso', CX, 1390, C.mute, { s: 24 }); });
  },
  // 7 · Problema: el objeto misterioso.
  objeto(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['De un objeto se tiene certeza de que: es negro o es rojo; si', 'es rojo, es un lapicero; si es un lapicero, es azul; si es', 'negro, es un marcador. Se puede concluir que el objeto es un:'], opts: ['Marcador negro', 'Lapicero rojo', 'Lapicero azul', 'Marcador azul'], ok: 0, rv: 22.6, os: 36 });
    fade(A(t, 10, .5), () => {
      const chain = (y, its, ok, t0) => its.forEach(([s, c], i) => fade(A(t, t0 + i * .6, .4), () => { pill(220 + i * 300, y, 230, 84, c, s, { s: 34 }); if (i) arrow(220 + (i - 1) * 300 + 120, y, 220 + i * 300 - 120, y, C.mute, 1, 2.5, { h: 10 }); if (i === its.length - 1) check(220 + i * 300 + 150, y, 18, ok, A(t, t0 + i * .6 + .5, .5)); }));
      chain(1000, [['rojo', BAD], ['lapicero', OR], ['azul', AND]], false, 10.2);
      fade(A(t, 13, .5), () => mono('rojo y azul a la vez: imposible', CX, 1080, BAD, { s: 24 }));
      chain(1220, [['negro', C.ink], ['marcador', RES]], true, 20.2);
    });
  },
  // 8 · Problema: solo una es cierta.
  tres(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Sobre un número se afirma: «es par», «es múltiplo de 3» y «es', 'mayor que 10». Si exactamente una de las tres afirmaciones', 'es verdadera, entonces el número puede ser:'], opts: ['9', '6', '12', '14'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const N = [6, 12, 14, 9], f = n => [n % 2 === 0, n % 3 === 0, n > 10];
      gridT(100, 960, 190, 82, N.map(String), ['par', 'múlt. de 3', '> 10', 'ciertas'], (i, j) => { const n = N[i], v = f(n), t0 = i < 3 ? 10.4 + i * .8 : 20.2; if (t < t0) return null; if (j < 3) return VF(v[j]); const c = v.filter(Boolean).length; return [String(c), c === 1 ? RES : BAD]; }, { hw: 120, hh: 50, cs: 36, rs: 36, rk: 'r' });
    });
  },
  // 9 · El circuito resuelto.
  resolver(t) {
    stars(t, .3);
    circuit(560, { x: '?', y: '?', z: t > 10.2 ? '1' : '?', u: t > 1.4 ? '0' : '?', v: t > 1.4 ? '0' : '?', s: '0' });
    fade(A(t, 1.6, .5), () => mono('un «o» da 0 solo con 0 y 0', CX, 1060, OR, { s: 26 }));
    fade(A(t, 10.4, .5), () => mono('el N dio 0: entró un 1 → z = 1, seguro', CX, 1130, RES, { s: 26 }));
    fade(A(t, 20.2, .5), () => { mono('el Y dio 0: x = 0 o y = 0 (o los dos)', CX, 1200, NOW, { s: 26 }); mono('no se sabe cuál', CX, 1250, C.mute, { s: 24 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['z vale 1', 'x vale 0', 'y vale 0', 'x y y valen 0'], 0, [['O = 0  →  N = 0  →  ', 'r'], ['z = 1', 'i', RES]], { s: 40 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['p ∧ q', 'r']], 'las dos verdaderas'], [[['p ∨ q', 'r']], 'falla solo con F y F'], [[['¬p', 'r']], 'invierte'], [[['2 · 2 = 4 filas', 'r']], 'tabla de verdad']], 420, 170, 44);
      endCard(t, 19.6, D.TITLE, D.LINE, [AND, OR, NEG]);
    });
  },
};
