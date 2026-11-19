// «Claves de sustitución» · escenas de la lección pu-cd-1. Motor en kit.js, preu.js y piezas.js; guion en cifrados.data.js.
// Las letras en cian, los símbolos en ámbar, el desplazamiento en violeta, lo que se cruza en lima y el resultado en verde.
const LET = C.cyan, SYM = C.amber, SHIFT = C.violet, NOW = C.lime, RES = C.green;
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Símbolos dibujados: o círculo, q cuadrado, b punto, t triángulo, d rombo, s estrella.
function sym(k, x, y, r, col = SYM) {
  const pts = n => Array.from({ length: n }, (_, i) => at([x, y], 90 + 360 / n * i, r));
  if (k === 'o') ring(x, y, r * .8, col, 4);
  if (k === 'b') dot(x, y, r * .7, col, 16);
  if (k === 'q') stroke(col, 4, () => X.rect(x - r * .75, y - r * .75, r * 1.5, r * 1.5), { g: 12 });
  if (k === 't') polyL(pts(3).map(p => [p[0], p[1] + r * .2]), col, { lw: 4 });
  if (k === 'd') polyL(pts(4), col, { lw: 4 });
  if (k === 's') polyL(Array.from({ length: 10 }, (_, i) => at([x, y], 90 + 36 * i, i % 2 ? r * .45 : r)), col, { lw: 3.5 });
}
const WORDS = [['SOL', 'qot'], ['LUZ', 'sod'], ['SUR', 'dbt']];
const KEY = { L: 'o', S: 't', U: 'd', O: 'q', Z: 's', R: 'b' };
function wordRow(x, y, w, syms, o = {}) { mono(w, x, y + 12, LET, { s: 40, a: 'l' }); [...syms].forEach((k, i) => sym(k, x + 200 + i * 90, y, 30, o.hl && o.hl(k) ? NOW : SYM)); }
const S = {
  // 1 · El reto: SOL, LUZ y SUR.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['A cada letra de las palabras SOL, LUZ y SUR se le asignó', 'un símbolo distinto. Frente a cada palabra están sus tres', 'símbolos, pero no necesariamente en el orden de las letras.', 'El código de la palabra LOROS, en orden, es:'], opts: ['○ □ ● □ △', '○ □ ◇ □ △', '△ □ ● □ ○', '○ ● □ ● △'], ok: 0, os: 36 });
    fade(A(t, 9.6, .6), () => WORDS.forEach(([w, s], i) => fade(A(t, 10 + i * .6, .4), () => wordRow(300, 960 + i * 120, w, s))));
    fade(A(t, 20.4, .5), () => mono('LOROS = ? ? ? ? ?', CX, 1360, NOW, { s: 30 }));
  },
  // 2 · Una letra, un símbolo.
  sustitucion(t) {
    stars(t, .3);
    const key = [['A', 's'], ['M', 'o'], ['R', 'b'], ['O', 'q']];
    key.forEach(([L, k], i) => fade(A(t, .8 + i * .4, .4), () => { bigT(L, 260 + i * 190, 560, LET, 56); arrow(260 + i * 190, 590, 260 + i * 190, 640, C.mute, 1, 2, { h: 8 }); sym(k, 260 + i * 190, 690, 30); }));
    fade(A(t, 9.2, .5), () => { ['A', 'M', 'O', 'R'].forEach((L, i) => { bigT(L, 330 + i * 130, 860, LET, 48); sym(key.find(z => z[0] === L)[1], 330 + i * 130, 930, 26); }); ['R', 'A', 'M', 'O'].forEach((L, i) => { bigT(L, 330 + i * 130, 1040, LET, 48); sym(key.find(z => z[0] === L)[1], 330 + i * 130, 1110, 26); }); });
    fade(A(t, 18.2, .5), () => mono('la A siempre es la estrella, en cualquier palabra', CX, 1220, NOW, { s: 24 }));
  },
  // 3 · Correr tres lugares (el alfabeto como rueda).
  cesar(t) {
    stars(t, .3);
    const O = [CX, 840], R = 300, rot = 3 * eio(seg(t, 1.6, 3.6));
    [...ABC].forEach((L, i) => { const p = at(O, 90 - 360 / 26 * i, R + 60), q = at(O, 90 - 360 / 26 * (i - rot), R - 10); T(L, p[0], p[1] + 12, { k: 'brand', s: 30, a: 'c', c: LET }); T(L, q[0], q[1] + 12, { k: 'brand', s: 28, a: 'c', c: SHIFT }); });
    ring(O[0], O[1], R + 24, 'rgba(160,180,240,.3)', 2);
    fade(A(t, 4, .5), () => mono('afuera: original · adentro: cifrada (+3)', CX, 1280, C.mute, { s: 22 }));
    fade(A(t, 20.2, .5), () => F([['ZUKA', 'r', LET], ['  →  ', 'r'], ['CXND', 'r', SHIFT]], CX, 470, 56));
  },
  // 4 · Problema: descifrar OLEUR.
  descifrar(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Dos amigos cambian cada letra por la que está tres lugares', 'más adelante en el alfabeto de 26 letras, sin la ñ (después', 'de la Z se vuelve a empezar). Si se recibe el mensaje OLEUR,', 'la palabra original es:'], opts: ['LIBRO', 'LIBRA', 'ROHXU', 'LIMBO'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const cif = 'OLEUR', ori = 'LIBRO';
      [...cif].forEach((L, i) => fade(A(t, 10.2 + i * .5, .3), () => { const x = 230 + i * 155; pill(x, 980, 110, 100, SHIFT, L, { s: 52, r: 16 }); arrow(x, 1040, x, 1110, NOW, 1, 3, { h: 10 }); mono('−3', x + 40, 1080, NOW, { s: 20, a: 'l' }); if (t > 11 + i * .5) pill(x, 1170, 110, 100, i < 5 && t > 20.4 ? RES : LET, ori[i], { s: 52, r: 16 }); }));
    });
  },
  // 5 · Fila y columna.
  tabla(t) {
    stars(t, .3);
    const rows = ['ABCDE', 'FGHIJ', 'KLMNO', 'PQRST', 'UVXYZ'];
    const G = gridT(170, 500, 130, 100, ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], (i, j) => [rows[i][j], i === 1 && j === 2 && t > 9.2 ? NOW : i === 2 && j === 1 && t > 18.2 ? SHIFT : null], { hw: 90, hh: 60, rk: 'r', rs: 34, rc: C.mute, hs: 30, cs: 40 });
    fade(A(t, 9.4, .5), () => F([['H: fila ', 'r'], ['2', 'r', NOW], [', columna ', 'r'], ['3', 'r', NOW], ['  →  23', 'r']], CX, 1170, 46));
    fade(A(t, 18.4, .5), () => F([['32 → ', 'r'], ['L', 'r', SHIFT], ['  (no H)', 'r', C.mute]], CX, 1260, 46));
  },
  // 6 · Problema: el mensaje 33 11 43.
  mensaje(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Con esa tabla (la primera cifra es la fila y la segunda la', 'columna), el mensaje 33 11 43 corresponde a la palabra:'], opts: ['MAR', 'MAL', 'PAR', 'MAS'], ok: 0, rv: 22.6 });
    const rows = ['ABCDE', 'FGHIJ', 'KLMNO', 'PQRST', 'UVXYZ'], hits = [[2, 2, 10], [0, 0, 20.2], [3, 2, 21]];
    fade(A(t, 3, .5), () => gridT(170, 760, 130, 90, ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], (i, j) => { const h = hits.find(([a, b, t0]) => a === i && b === j && t > t0); return [rows[i][j], h ? RES : null]; }, { hw: 90, hh: 56, rk: 'r', rs: 30, rc: C.mute, hs: 28, cs: 36 }));
    fade(A(t, 21.4, .5), () => F([['33 11 43 → ', 'r'], ['MAR', 'r', RES]], CX, 1360, 52));
  },
  // 7 · Letras en dos palabras.
  comunes(t) {
    stars(t, .3);
    wordRow(260, 600, 'SOL', 'qot', { hl: k => t > 9.2 && k === 'o' }); wordRow(260, 740, 'LUZ', 'sod', { hl: k => t > 9.2 && k === 'o' });
    fade(A(t, 1.6, .5), () => { mono('la L está en las dos', 800, 680, NOW, { s: 24 }); });
    fade(A(t, 9.4, .5), () => mono('el único símbolo repetido: ○', CX, 900, NOW, { s: 28 }));
    fade(A(t, 18.2, .5), () => { bigT('L', 440, 1050, LET, 64); bigT('=', 540, 1050, C.ink, 56); sym('o', 640, 1032, 36, RES); });
  },
  // 8 · Un método.
  metodo(t) {
    stars(t, .3);
    [['1', 'Letras que están en dos palabras', 1], ['2', 'El símbolo común es el suyo', 9.2], ['3', 'Lo que sobra, para la letra que falta', 18.2]].forEach(([n, s, t0], i) => fade(A(t, t0, .6), () => {
      const y = 560 + i * 260; nodeC(170, y, 60, [NOW, SYM, RES][i], n, { s: 54 }); jT(s, 260, y + 14, C.ink, 38, { a: 'l', max: 760 });
      if (i) arrow(170, y - 190, 170, y - 70, hexA(NOW, .6), 1, 2.5, { h: 10 });
    }));
  },
  // 9 · LOROS resuelto.
  resolver(t) {
    stars(t, .3);
    WORDS.forEach(([w, s], i) => wordRow(160, 500 + i * 110, w, s));
    const order = [['L', 1], ['S', 2.4], ['U', 10.2], ['O', 12], ['Z', 13], ['R', 14]];
    order.forEach(([L, t0], i) => fade(A(t, t0, .4), () => { const x = 160 + (i % 3) * 270, y = 900 + Math.floor(i / 3) * 110; bigT(L, x, y + 16, LET, 48); bigT('=', x + 60, y + 16, C.ink, 40); sym(KEY[L], x + 130, y, 28, RES); }));
    fade(A(t, 20.2, .5), () => { mono('LOROS', 200, 1205, LET, { s: 44, a: 'l' }); [...'LOROS'].forEach((L, i) => sym(KEY[L], 470 + i * 100, 1190, 34, RES)); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['○ □ ● □ △', '○ □ ◇ □ △', '△ □ ● □ ○', '○ ● □ ● △'], 0, 'L ○ · O □ · R ● · S △', { s: 40, fs: 40 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['letra → símbolo', 'r']], 'siempre el mismo'], [[['+3 · −3', 'r']], 'cifrar y descifrar'], [[['fila, columna', 'r']], 'la tabla'], [[['símbolo común', 'r']], 'cruzar palabras']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [LET, NOW, SYM]);
    });
  },
};
